import assert from 'node:assert/strict';
import { createGameRun } from '../services/gameEngine.js';
import { createGameHost, createMemoryGameStorage } from '../services/gameHost.js';
import { createNativeGameStorage } from '../services/nativeGameStorage.js';

function createFakeFilesystem() {
  const files = new Map();
  return {
    async mkdir() {},
    async writeFile({ path, data }) { files.set(path, data); },
    async readFile({ path }) {
      if (!files.has(path)) throw new Error('missing-file');
      return { data: files.get(path) };
    },
    async readdir({ path }) {
      const prefix = `${path}/`;
      const names = new Set();
      for (const key of files.keys()) if (key.startsWith(prefix)) names.add(key.slice(prefix.length).split('/')[0]);
      if (!names.size) throw new Error('missing-directory');
      return { files: [...names].map((name) => ({ name })) };
    },
  };
}

const initialState = createGameRun({ runId: 'game:host-parity', seed: 'same-seed', now: '2026-09-08T12:00:00.000Z' });
const webHost = createGameHost({ initialState, storage: createMemoryGameStorage(), channel: null, now: '2026-09-08T12:00:01.000Z' });
const mobileHost = createGameHost({ initialState, storage: createNativeGameStorage(createFakeFilesystem(), 'LIBRARY'), channel: null, now: '2026-09-08T12:00:01.000Z' });
await Promise.all([webHost.initialize(), mobileHost.initialize()]);

const sequence = [
  ['REQUEST_HINT', {}],
  ['CHOOSE_INTENT', { choice: 'far-horizon' }],
  ['COMPLETE_ACTIVITY', {}],
  ['COMPLETE_ACTIVITY', {}],
  ['COMPLETE_ACTIVITY', {}],
  ['UPDATE_FORCE', { x: 4, y: 3, duration: 6 }],
  ['RUN_SIMULATION', {}],
  ['COMPLETE_ACTIVITY', {}],
];

for (const [index, [type, payload]] of sequence.entries()) {
  const commandId = `parity-command-${index + 1}`;
  const [webResult, mobileResult] = await Promise.all([
    webHost.dispatch(type, payload, commandId),
    mobileHost.dispatch(type, payload, commandId),
  ]);
  assert.equal(webResult.ok, true, `web ${type}`);
  assert.equal(mobileResult.ok, true, `mobile ${type}`);
  assert.deepEqual(mobileResult.state, webResult.state, `${type} must yield the same canonical state in web and mobile hosts`);
  assert.deepEqual(mobileResult.projection, webResult.projection, `${type} must yield the same Hero Sheet projection in web and mobile hosts`);
}

console.log('Game host parity: the same commands yield identical canonical state and Hero Sheet projection in web and native storage hosts.');
