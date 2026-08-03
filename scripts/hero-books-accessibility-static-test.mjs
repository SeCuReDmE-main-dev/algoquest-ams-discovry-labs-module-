import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mageTwoHorizonsPrimaryFr, renderAsciiScene } from '../services/heroBooks.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appSource = fs.readFileSync(path.join(repoRoot, 'App.tsx'), 'utf8');
const educationCss = fs.readFileSync(path.join(repoRoot, 'docs', 'stylesheets', 'securedme-education.css'), 'utf8');
const accessibilityCss = fs.readFileSync(path.join(repoRoot, 'docs', 'stylesheets', 'securedme-accessibility.css'), 'utf8');

const heroBooksSection = appSource.slice(
  appSource.indexOf('<section id="hero-books"'),
  appSource.indexOf('<section id="contracts"'),
);

assert.ok(heroBooksSection.includes('<section id="hero-books"'), 'Hero Books section must exist');
assert.ok(heroBooksSection.includes('Mission envelope export'), 'Hero Books section must expose mission envelope export');
assert.ok(heroBooksSection.includes('Builder receipt import'), 'Hero Books section must expose Builder receipt import');
assert.ok(heroBooksSection.includes('Colab notebook round trip'), 'Hero Books section must expose Colab receipt import');
assert.ok(heroBooksSection.includes('Privacy & Permissions Ledger'), 'Hero Books section must expose privacy projections');

for (const label of [
  'Mission envelope JSON export for Algorithm Builder',
  'Builder artifact receipt JSON import',
  'Colab round trip receipt JSON import',
  'Privacy & Permissions JSON output',
]) {
  assert.ok(heroBooksSection.includes(`aria-label="${label}"`), `Missing textarea aria-label: ${label}`);
}

for (const buttonText of [
  'Ready',
  'Ask Hint',
  'Mark First Action',
  'Abstain',
  'Validate Receipt',
  'Validate Colab Receipt',
  'Next Prompt',
  'Replay',
  'Reset',
  'Revoke Data Access (Issue Receipt)',
  'Request Data Deletion (Issue Receipt)',
  'Clear Local Privacy Vault',
]) {
  const buttonIndex = heroBooksSection.indexOf(`>${buttonText}</button>`);
  assert.notEqual(buttonIndex, -1, `Missing Hero Books button: ${buttonText}`);
  const buttonStart = heroBooksSection.lastIndexOf('<button', buttonIndex);
  const buttonMarkup = heroBooksSection.slice(buttonStart, buttonIndex);
  assert.ok(buttonMarkup.includes('type="button"'), `${buttonText} must be an explicit button`);
  assert.ok(buttonMarkup.includes('focus:'), `${buttonText} must expose visible focus styling`);
}

const firstAsciiScene = renderAsciiScene(mageTwoHorizonsPrimaryFr.prompt_nodes[0]);
assert.equal(firstAsciiScene.art.every((line) => line.length <= firstAsciiScene.width), true, 'ASCII lines must respect bounded width');
assert.ok(firstAsciiScene.linear_equivalent.includes(mageTwoHorizonsPrimaryFr.prompt_nodes[0].prompt_text), 'ASCII scene needs a linear equivalent with prompt text');

assert.ok(appSource.includes('sr-only') && appSource.includes('aria-live="polite"'), 'App must retain screen-reader live status');
assert.ok(`${educationCss}\n${accessibilityCss}`.includes('prefers-reduced-motion'), 'Documentation CSS must keep reduced-motion contract');
assert.ok(heroBooksSection.includes('local receipts:'), 'Privacy receipt count must be visible');
assert.ok(heroBooksSection.includes('organization admin to teacher private activity'), 'Hierarchy guard must be visible');

console.log('algoquest hero-books accessibility static test passed');
