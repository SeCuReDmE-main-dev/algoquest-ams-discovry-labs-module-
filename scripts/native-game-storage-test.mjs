import assert from 'node:assert/strict';
import { createNativeGameStorage } from '../services/nativeGameStorage.js';

function createFakeFilesystem() {
  const files = new Map();
  let failSuffix = null;
  return {
    failOnce(suffix) { failSuffix = suffix; },
    corrupt(suffix, value = '{corrupted') {
      const path = [...files.keys()].find((candidate) => candidate.endsWith(suffix));
      if (!path) throw new Error(`cannot-corrupt-missing:${suffix}`);
      files.set(path, value);
    },
    async mkdir() {},
    async writeFile({ path, data }) {
      if (failSuffix && path.endsWith(failSuffix)) {
        failSuffix = null;
        throw new Error('simulated-interruption');
      }
      files.set(path, data);
    },
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

function record(revision, rewards = revision - 1) {
  return {
    schema: 'securedme.education.algoquest.game-record.v1',
    run_id: 'native-run',
    state: { schema: 'securedme.education.algoquest.game-run-state.v1', run_id: 'native-run', revision, rewards, completed_prompt_ids: Array.from({ length: rewards }, (_, index) => `p-${index}`) },
    events: Array.from({ length: rewards }, (_, index) => ({ id: `e-${index}` })),
  };
}

const api = createFakeFilesystem();
const storage = createNativeGameStorage(api, 'LIBRARY');
assert.equal((await storage.commit('native-run', 1, record(1, 0))).ok, true);

for (const failedFile of ['state.json', 'events.json', 'commit.json']) {
  api.failOnce(failedFile);
  await assert.rejects(storage.commit('native-run', 1, record(2, 1)), /simulated-interruption/);
  const restored = await storage.load('native-run');
  assert.equal(restored.state.revision, 1, `interruption during ${failedFile} falls back to the previous committed generation`);
}

for (const corruptedFile of ['generation-2/state.json', 'generation-2/events.json', 'generation-2/commit.json']) {
  const corruptApi = createFakeFilesystem();
  const corruptStorage = createNativeGameStorage(corruptApi, 'LIBRARY');
  await corruptStorage.commit('native-run', 1, record(1, 0));
  await corruptStorage.commit('native-run', 1, record(2, 1));
  corruptApi.corrupt(corruptedFile);
  const restored = await corruptStorage.load('native-run');
  assert.equal(restored.state.revision, 1, `corrupted ${corruptedFile} falls back to the previous verified generation`);
}

const incompatibleApi = createFakeFilesystem();
const incompatibleStorage = createNativeGameStorage(incompatibleApi, 'LIBRARY');
const futureRecord = record(1, 0);
futureRecord.state.schema = 'securedme.education.algoquest.game-run-state.v999';
await assert.rejects(incompatibleStorage.commit('native-run', 1, futureRecord), /GAME_SAVE_INCOMPATIBLE:native-run/);
await assert.rejects(incompatibleStorage.load('native-run'), /GAME_SAVE_INCOMPATIBLE:native-run/, 'a verified future schema must be preserved for migration instead of skipped as corruption');

let previousRevision = 1;
for (let cycle = 1; cycle <= 100; cycle += 1) {
  const nextRevision = previousRevision + 1;
  const result = await storage.commit('native-run', previousRevision, record(nextRevision, cycle));
  assert.equal(result.ok, true);
  const restored = await storage.load('native-run');
  assert.equal(restored.state.revision, nextRevision);
  assert.equal(restored.state.rewards, cycle, 'recovery never doubles a reward');
  assert.equal(new Set(restored.state.completed_prompt_ids).size, cycle, 'recovery never repeats a consumed prompt');
  previousRevision = nextRevision;
}

console.log('Native game storage: interruptions, corruption, incompatible schema refusal and 100 save/restart cycles passed.');
