import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';

const root = new URL('..', import.meta.url);
const manifest = JSON.parse(fs.readFileSync(new URL('./vendor/hero-sheet-manifest.json', root), 'utf8'));
const archive = fs.readFileSync(new URL(`./vendor/${manifest.file}`, root));
const packageJson = JSON.parse(fs.readFileSync(new URL('./package.json', root), 'utf8'));
assert.equal(manifest.schema, 'securedme.education.local-package-lock.v1');
assert.equal(createHash('sha256').update(archive).digest('hex'), manifest.sha256);
assert.equal(packageJson.dependencies[manifest.name], `file:vendor/${manifest.file}`);
assert.equal(manifest.version, '1.0.2');
console.log('Hero Sheet package: versioned archive, manifest digest and dependency binding passed.');
