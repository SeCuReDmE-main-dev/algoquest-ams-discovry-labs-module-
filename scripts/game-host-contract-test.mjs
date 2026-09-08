import assert from 'node:assert/strict';
import { createGameRun } from '../services/gameEngine.js';
import { createActiveRunStore, createGameHost, createMemoryGameStorage } from '../services/gameHost.js';

const initialState = createGameRun({ runId: 'game:host-test', now: '2026-09-08T12:00:00.000Z' });
const storage = createMemoryGameStorage();
const hostA = createGameHost({ initialState, storage, channel: null });
const hostB = createGameHost({ initialState, storage, channel: null });
await Promise.all([hostA.initialize(), hostB.initialize()]);

const hint = await hostA.dispatch('REQUEST_HINT', {}, 'command:shared-hint');
assert.equal(hint.ok, true);
const duplicate = await hostA.dispatch('REQUEST_HINT', {}, 'command:shared-hint');
assert.equal(duplicate.ok, true);
assert.equal(duplicate.duplicate, true);
assert.equal(hostA.getState().assistance.hints_used, 1);

const stale = await hostB.dispatch('CHOOSE_INTENT', { choice: 'near-horizon' }, 'command:stale-host');
assert.equal(stale.ok, true, 'host refreshes the authoritative transaction before issuing its command');
assert.equal(hostB.getState().branch_id, 'near-horizon');
const restoredRecord = await storage.load(initialState.run_id);
assert.equal(restoredRecord.state.assistance.hints_used, 1);
assert.equal(restoredRecord.state.branch_id, 'near-horizon');

const projection = hostB.getProjection();
assert.equal(projection.connection, 'connected');
assert.equal(projection.mission.progress, 0);
assert.equal(projection.contains_identity, false);

const persistedState = createGameRun({ runId: 'game:persisted-native', now: '2026-09-08T12:00:00.000Z' });
const persistedStorage = createMemoryGameStorage([{ schema: 'securedme.education.algoquest.game-record.v1', run_id: persistedState.run_id, state: persistedState, events: persistedState.journal }]);
const preferenceValues = new Map([['securedme.education.algoquest.active-game-run.v1', persistedState.run_id]]);
const activeRunStore = createActiveRunStore({
  native: true,
  preferences: {
    async get({ key }) { return { value: preferenceValues.get(key) || null }; },
    async set({ key, value }) { preferenceValues.set(key, value); },
  },
});
const nativeHost = createGameHost({
  initialState: createGameRun({ runId: 'game:temporary-bootstrap', now: '2026-09-08T12:00:00.000Z' }),
  storage: persistedStorage,
  activeRunStore,
  channel: null,
});
const [restoredA, restoredB] = await Promise.all([nativeHost.initialize(), nativeHost.initialize()]);
assert.equal(restoredA.run_id, persistedState.run_id, 'native Preferences selects the durable active run before hydration');
assert.deepEqual(restoredB, restoredA, 'concurrent initialization shares one durable bootstrap');
const replacement = createGameRun({ runId: 'game:replacement-native', now: '2026-09-08T12:00:00.000Z' });
await nativeHost.replaceRun(replacement);
assert.equal(preferenceValues.get('securedme.education.algoquest.active-game-run.v1'), replacement.run_id, 'a new adventure updates the small native preference');

const incompatibleState = { ...createGameRun({ runId: 'game:future-save' }), schema: 'securedme.education.algoquest.game-run-state.v999' };
const incompatibleStorage = createMemoryGameStorage([{ schema: 'securedme.education.algoquest.game-record.v1', run_id: incompatibleState.run_id, state: incompatibleState, events: [] }]);
const incompatibleHost = createGameHost({ initialState: createGameRun({ runId: incompatibleState.run_id }), storage: incompatibleStorage, channel: null });
await assert.rejects(incompatibleHost.initialize(), /GAME_SAVE_INCOMPATIBLE:game:future-save/, 'an incompatible save must stop for a versioned migration');
assert.equal((await incompatibleStorage.load(incompatibleState.run_id)).state.schema, incompatibleState.schema, 'an incompatible save must remain untouched');

console.log('Game host contract: transactional refresh, deduplication, native hydration, durable projection and explicit incompatible-save refusal passed.');
