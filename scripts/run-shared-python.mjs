import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const suiteRoot = path.resolve(repoRoot, '..');
const candidates = process.platform === 'win32'
  ? [path.join(suiteRoot, '.venv', 'Scripts', 'python.exe')]
  : [path.join(suiteRoot, '.venv', 'bin', 'python'), 'python3'];
const executable = candidates.find((candidate) => candidate === 'python3' || fs.existsSync(candidate));
if (!executable) {
  console.error(`Shared Python environment was not found under ${suiteRoot}.`);
  process.exit(1);
}
const result = spawnSync(executable, process.argv.slice(2), { cwd: repoRoot, stdio: 'inherit', env: process.env });
if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
