import assert from 'node:assert/strict';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = 4174;
const url = `http://127.0.0.1:${port}/play`;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'ignore', windowsHide: true });

async function ready() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await wait(250);
  }
  throw new Error('game preview did not start');
}

let browser;
try {
  await ready();
  browser = await chromium.launch();
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    const page = await browser.newPage({ viewport, hasTouch: viewport.width < 500, isMobile: viewport.width < 500 });
    const externalRequests = [];
    page.on('request', (request) => {
      const requested = new URL(request.url());
      if (!['127.0.0.1', 'localhost'].includes(requested.hostname)) externalRequests.push(request.url());
    });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const game = page.getByTestId('immersive-game');
    await game.waitFor({ state: 'visible' });
    assert.equal(await page.locator('.aq-utility-dock').isVisible(), false, 'utility dock must not cover the game hand');
    assert.equal(await page.getByRole('button', { name: 'Approcher l’horizon' }).isVisible(), true, 'first decision must be immediately playable');
    await page.getByRole('button', { name: 'Approcher l’horizon' }).click();
    await page.getByRole('button', { name: /Déployer/ }).click();
    await page.getByRole('img', { name: 'Trajectoire calculée' }).waitFor({ state: 'visible' });
    const runId = await game.getAttribute('data-run-id');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByText('Horizon proche', { exact: false }).first().waitFor({ state: 'visible' });
    assert.equal(await page.getByTestId('immersive-game').getAttribute('data-run-id'), runId, 'reload must resume the same run');
    await page.getByRole('button', { name: 'Ouvrir la fiche du héros' }).click();
    await page.getByRole('heading', { name: 'Grimoire du Mage' }).waitFor({ state: 'visible' });
    await page.getByRole('tab', { name: 'Atelier' }).click();
    await page.getByLabel('Force X').fill('4');
    await page.getByRole('button', { name: 'Équiper la force' }).click();
    await page.getByRole('button', { name: 'Retour au combat' }).click();
    await page.getByRole('button', { name: /Déployer/ }).click();
    await page.getByRole('img', { name: 'Trajectoire calculée' }).waitFor({ state: 'visible' });
    const dimensions = await page.evaluate(() => ({ height: innerHeight, scrollHeight: document.documentElement.scrollHeight }));
    assert.ok(dimensions.scrollHeight <= dimensions.height + 1, `game viewport must not create page scroll: ${JSON.stringify(dimensions)}`);
    assert.deepEqual(externalRequests, [], 'immersive game must load without external CDN requests');
    await page.close();
  }
  console.log('Immersive game shell: mobile/desktop actions, hero sheet, local resume and offline assets passed.');
} finally {
  if (browser) await browser.close();
  server.kill();
}
