import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readinessTimeoutMs = Number.parseInt(process.env.HERO_BOOKS_BROWSER_TIMEOUT_MS || '30000', 10);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}
    await wait(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

const server = spawn(
  process.execPath,
  [path.join(repoRoot, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {
    cwd: repoRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  },
);

let serverOutput = '';
server.stdout.on('data', (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk.toString();
});

let browser;
try {
  await waitForServer(baseUrl);
  browser = await chromium.launch();
  for (const profile of [
    { name: 'desktop', viewport: { width: 1366, height: 900 } },
    { name: 'tablet', viewport: { width: 820, height: 1180 } },
    { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true },
    { name: 'chromebook-class-simulated', viewport: { width: 1366, height: 768 }, cpuThrottle: 4 },
  ]) {
    const page = await browser.newPage({
      viewport: profile.viewport,
      isMobile: Boolean(profile.isMobile),
    });
    let cdpSession = null;
    if (profile.cpuThrottle) {
      cdpSession = await page.context().newCDPSession(page);
      await cdpSession.send('Emulation.setCPUThrottlingRate', { rate: profile.cpuThrottle });
    }
    await runHeroBooksFlow(page, profile.name, { performanceBudget: Boolean(profile.cpuThrottle) });
    if (cdpSession) {
      await cdpSession.send('Emulation.setCPUThrottlingRate', { rate: 1 });
      await cdpSession.detach();
    }
    await page.close();
  }

  await browser.close();
  browser = null;
  console.log('algoquest hero-books browser test passed');
} catch (error) {
  if (browser) {
    await browser.close();
  }
  console.error(serverOutput);
  throw error;
} finally {
  server.kill();
}

async function waitForHeroBooksReady(page, profileName) {
  const heroBooks = page.locator('#hero-books');
  await heroBooks.waitFor({ state: 'attached', timeout: readinessTimeoutMs });
  await heroBooks.waitFor({ state: 'visible', timeout: readinessTimeoutMs });
  for (const readyText of [
    'Hero Books proof line',
    'Mission envelope export',
    'Builder receipt import',
    'Colab notebook round trip',
    'Privacy & Permissions Ledger',
  ]) {
    await heroBooks.getByText(readyText, { exact: false }).first().waitFor({ state: 'visible', timeout: readinessTimeoutMs });
  }
  assert.ok(await heroBooks.getByLabel('Mission envelope JSON export for Algorithm Builder').isVisible({ timeout: readinessTimeoutMs }), `${profileName} Hero Books section should finish hydrating`);
}

async function expectVisibleText(page, text, timeout = readinessTimeoutMs) {
  await page.getByText(text, { exact: false }).first().waitFor({ state: 'visible', timeout });
}

async function runHeroBooksFlow(page, profileName, { performanceBudget = false } = {}) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const startedAt = Date.now();
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: readinessTimeoutMs });
  await waitForHeroBooksReady(page, profileName);
  const loadElapsedMs = Date.now() - startedAt;

  await expectVisibleText(page, 'Hero Books proof line');
  await expectVisibleText(page, 'Mission envelope export');
  await expectVisibleText(page, 'Builder receipt import');
  await expectVisibleText(page, 'Colab notebook round trip');
  await expectVisibleText(page, 'Privacy & Permissions Ledger');

  for (const label of [
    'Mission envelope JSON export for Algorithm Builder',
    'Builder artifact receipt JSON import',
    'Colab round trip receipt JSON import',
    'Privacy & Permissions JSON output',
  ]) {
    await page.getByLabel(label).waitFor({ state: 'visible' });
  }

  const heroBooksSnapshot = await page.locator('#hero-books').ariaSnapshot();
  for (const accessibleName of [
    'A first governed adventure path, not an alpha dependency.',
    'Mission envelope export',
    'Builder receipt import',
    'Colab notebook round trip',
    'Privacy & Permissions Ledger',
    'Mode Notebook',
    'Retry',
    'Hold',
    'Next Prompt',
    'Revoke Data Access (Issue Receipt)',
  ]) {
    assert.ok(heroBooksSnapshot.includes(accessibleName), `${profileName} ARIA snapshot should include ${accessibleName}`);
  }

  const missionEnvelopeText = await page.getByLabel('Mission envelope JSON export for Algorithm Builder').inputValue();
  const missionEnvelope = JSON.parse(missionEnvelopeText);
  assert.equal(missionEnvelope.schema, 'securedme.education.algoquest.mission-envelope.v1', `${profileName} mission envelope schema`);
  assert.equal(missionEnvelope.canonical_state_owner, 'algoquest', `${profileName} mission owner`);

  const interactionStartedAt = Date.now();
  await page.getByRole('button', { name: 'Ask Hint' }).click();
  await expectVisibleText(page, 'Entry state: guided');

  await page.getByRole('button', { name: 'Mode Notebook' }).click();
  await expectVisibleText(page, 'mode: guided_notebook');

  await page.getByRole('button', { name: 'Mode Example' }).click();
  await expectVisibleText(page, 'mode: executable_example');

  await page.getByRole('button', { name: 'Retry' }).click();
  await expectVisibleText(page, 'Entry state: retry');

  await page.getByRole('button', { name: 'Hold' }).click();
  await expectVisibleText(page, 'Entry state: hold');

  await page.getByRole('button', { name: 'Next Prompt' }).click();
  await expectVisibleText(page, 'Consumed prompts');

  const asciiText = await page.locator('#hero-books pre').first().innerText();
  assert.ok(asciiText.includes('mage path'), `${profileName} ASCII scene should be visible`);
  assert.ok(asciiText.split('\n').every((line) => line.length <= 80), `${profileName} ASCII scene should stay browser-readable`);
  await expectVisibleText(page, 'Linear ASCII equivalent');

  await page.getByRole('button', { name: 'Revoke Data Access (Issue Receipt)' }).click();
  await expectVisibleText(page, 'knowledge-token-revocation.v1');
  await expectVisibleText(page, 'local receipts: 1');

  await page.getByRole('button', { name: 'Request Data Deletion (Issue Receipt)' }).click();
  await expectVisibleText(page, 'data-deletion-receipt.v1');
  await expectVisibleText(page, 'local receipts: 2');

  await page.getByRole('button', { name: 'Clear Local Privacy Vault' }).click();
  await expectVisibleText(page, 'local receipts: 0');

  const focusableNames = ['Mode Text', 'Mode Notebook', 'Mode Example', 'Ready', 'Ask Hint', 'Retry', 'Hold', 'Mark First Action', 'Validate Receipt', 'Validate Colab Receipt', 'Next Prompt'];
  for (const name of focusableNames) {
    const locator = page.getByRole('button', { name });
    await locator.focus();
    const focusedName = await page.evaluate(() => document.activeElement?.textContent?.trim());
    assert.equal(focusedName, name, `${profileName} ${name} should be focusable`);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 4, `${profileName} should not have significant horizontal page overflow`);

  if (performanceBudget) {
    const interactionElapsedMs = Date.now() - interactionStartedAt;
    const domNodeCount = await page.evaluate(() => document.querySelectorAll('*').length);
    const jsBytes = totalDistBytes((file) => file.endsWith('.js'));
    assert.ok(loadElapsedMs <= 15000, `${profileName} should load under local throttled budget, got ${loadElapsedMs}ms`);
    assert.ok(interactionElapsedMs <= 12000, `${profileName} should complete Hero Books interactions under local throttled budget, got ${interactionElapsedMs}ms`);
    assert.ok(domNodeCount <= 1800, `${profileName} DOM should stay bounded, got ${domNodeCount}`);
    assert.ok(jsBytes <= 450000, `${profileName} JS bundle should stay under 450KB, got ${jsBytes}`);
  }
}

function totalDistBytes(predicate) {
  const dist = path.join(repoRoot, 'dist');
  let total = 0;
  for (const entry of walk(dist)) {
    if (predicate(entry)) {
      total += fs.statSync(entry).size;
    }
  }
  return total;
}

function walk(root, results = []) {
  if (!fs.existsSync(root)) {
    return results;
  }
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, results);
    } else {
      results.push(fullPath);
    }
  }
  return results;
}
