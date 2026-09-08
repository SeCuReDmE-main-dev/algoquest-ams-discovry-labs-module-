import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const suiteRoot = path.resolve(repoRoot, '..');
const builderRoot = path.resolve(process.env.ALGORITHM_BUILDER_REPO || path.join(suiteRoot, 'algorithm-builder-app'));
const extensionRoot = path.join(builderRoot, 'dist', 'extension');
const port = Number.parseInt(process.env.ALGOQUEST_EXTENSION_TEST_PORT || '4175', 10);
const baseUrl = `http://127.0.0.1:${port}`;
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'algoquest-extension-'));

for (const required of ['manifest.json', 'serviceWorker.js', 'contentBridge.js', 'sidepanel.html', 'sidepanel.js']) {
  assert.ok(fs.existsSync(path.join(extensionRoot, required)), `Build Algorithm Builder first: missing ${required}`);
}

const server = spawn(process.execPath, [path.join(repoRoot, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: repoRoot,
  stdio: ['ignore', 'pipe', 'pipe'],
  windowsHide: true,
});
let serverOutput = '';
server.stdout.on('data', (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on('data', (chunk) => { serverOutput += chunk.toString(); });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitForServer() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(baseUrl)).ok) return;
    } catch {}
    await wait(300);
  }
  throw new Error(`Timed out waiting for ${baseUrl}`);
}

let context;
try {
  await waitForServer();
  context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 390, height: 844 },
    args: [
      '--headless=new',
      `--disable-extensions-except=${extensionRoot}`,
      `--load-extension=${extensionRoot}`,
    ],
  });
  const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker');
  const extensionId = new URL(worker.url()).host;

  let board = context.pages()[0] || await context.newPage();
  await board.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await board.locator('#hero-books').waitFor({ state: 'visible', timeout: 30000 });

  const panel = await context.newPage();
  await panel.setViewportSize({ width: 390, height: 844 });
  await panel.goto(`chrome-extension://${extensionId}/sidepanel.html`, { waitUntil: 'domcontentloaded' });
  await panel.getByRole('heading', { name: 'Grimoire & Forge' }).waitFor({ state: 'visible', timeout: 30000 });
  await panel.getByText('Liée', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });

  await panel.getByRole('button', { name: 'L’horizon lointain' }).click();
  await board.getByText('Voie · far-horizon', { exact: false }).waitFor({ state: 'visible' });

  const forgeTab = panel.getByRole('tab', { name: 'Atelier' });
  await forgeTab.focus();
  assert.equal(await forgeTab.evaluate((element) => document.activeElement === element), true, 'The narrow extension tabs must be keyboard focusable');
  await forgeTab.press('Enter');
  const draft = panel.getByLabel('Changed horizontal force');
  await draft.fill('7');
  assert.equal(await draft.inputValue(), '7');

  await board.close();
  await panel.getByText('Hors ligne', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });
  assert.equal(await draft.inputValue(), '7', 'The Builder draft must survive an AlgoQuest tab closing');
  assert.ok(await panel.getByText('La fiche a conservé la dernière vue connue.', { exact: false }).isVisible(), 'The last Hero Sheet must remain readable offline');

  board = await context.newPage();
  await board.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await board.locator('#hero-books').waitFor({ state: 'visible', timeout: 30000 });
  await panel.getByText('Liée', { exact: true }).waitFor({ state: 'visible', timeout: 30000 });
  assert.equal(await draft.inputValue(), '7', 'The Builder draft must survive tab reconnection');

  const overflow = await panel.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 4, `The 390px side panel must not overflow horizontally (got ${overflow}px)`);
  await panel.getByRole('tab', { name: 'Mission' }).click();
  const seal = panel.getByRole('button', { name: 'Sceller cette étape' });
  await seal.focus();
  assert.equal(await seal.evaluate((element) => document.activeElement === element), true, 'A game action must be keyboard focusable after reconnect');

  console.log('AlgoQuest + real MV3 side panel: command, close, offline sheet, reconnect, draft, focus and narrow layout passed.');
} catch (error) {
  console.error(serverOutput);
  throw error;
} finally {
  if (context) await context.close();
  server.kill();
  fs.rmSync(userDataDir, { recursive: true, force: true });
}
