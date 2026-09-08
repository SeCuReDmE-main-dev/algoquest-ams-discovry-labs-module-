import { GAME_RUN_SCHEMA, applyGameCommand, createGameCommand, createGameRun, projectHeroSheet } from './gameEngine.js';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { createNativeGameStorage } from './nativeGameStorage.js';

export const GAME_DATABASE_NAME = 'securedme-algoquest-game-v1';
export const GAME_STORE_NAME = 'runs';
export const ACTIVE_GAME_KEY = 'securedme.education.algoquest.active-game-run.v1';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createMemoryGameStorage(initialRecords = []) {
  const records = new Map(initialRecords.map((record) => [record.run_id, clone(record)]));
  return {
    async load(runId) { return clone(records.get(runId) || null); },
    async commit(runId, expectedRevision, nextRecord) {
      const current = records.get(runId);
      if (current && current.state.revision !== expectedRevision) return { ok: false, conflict: true, record: clone(current) };
      records.set(runId, clone(nextRecord));
      return { ok: true, record: clone(nextRecord) };
    },
    async list() { return [...records.values()].map(clone); },
  };
}

function requestValue(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('indexeddb-request-failed'));
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error || new Error('indexeddb-transaction-aborted'));
    transaction.onerror = () => reject(transaction.error || new Error('indexeddb-transaction-failed'));
  });
}

export function createIndexedDbGameStorage(indexedDb = globalThis.indexedDB) {
  if (!indexedDb) return null;
  let databasePromise;
  const open = () => {
    if (!databasePromise) {
      databasePromise = new Promise((resolve, reject) => {
        const request = indexedDb.open(GAME_DATABASE_NAME, 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains(GAME_STORE_NAME)) request.result.createObjectStore(GAME_STORE_NAME, { keyPath: 'run_id' });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('indexeddb-open-failed'));
      });
    }
    return databasePromise;
  };
  return {
    async load(runId) {
      const database = await open();
      const transaction = database.transaction(GAME_STORE_NAME, 'readonly');
      const result = await requestValue(transaction.objectStore(GAME_STORE_NAME).get(runId));
      await transactionDone(transaction);
      return result ? clone(result) : null;
    },
    async commit(runId, expectedRevision, nextRecord) {
      const database = await open();
      const transaction = database.transaction(GAME_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(GAME_STORE_NAME);
      const current = await requestValue(store.get(runId));
      if (current && current.state.revision !== expectedRevision) {
        transaction.abort();
        try { await transactionDone(transaction); } catch { /* expected abort */ }
        return { ok: false, conflict: true, record: clone(current) };
      }
      store.put(clone(nextRecord));
      await transactionDone(transaction);
      return { ok: true, record: clone(nextRecord) };
    },
    async list() {
      const database = await open();
      const transaction = database.transaction(GAME_STORE_NAME, 'readonly');
      const result = await requestValue(transaction.objectStore(GAME_STORE_NAME).getAll());
      await transactionDone(transaction);
      return result.map(clone);
    },
  };
}

function recordForState(state) {
  return {
    schema: 'securedme.education.algoquest.game-record.v1',
    run_id: state.run_id,
    state: clone(state),
    events: clone(state.journal),
    updated_at: new Date().toISOString(),
  };
}

function compatibleRecord(record, runId) {
  return record?.schema === 'securedme.education.algoquest.game-record.v1'
    && record.run_id === runId
    && record.state?.schema === GAME_RUN_SCHEMA
    && record.state.run_id === runId
    && Number.isInteger(record.state.revision)
    && Array.isArray(record.events);
}

function requireCompatibleRecord(record, runId) {
  if (record && !compatibleRecord(record, runId)) throw new Error(`GAME_SAVE_INCOMPATIBLE:${runId}`);
  return record;
}

export function createActiveRunStore({ native = false, preferences = Preferences, local = globalThis.localStorage } = {}) {
  if (native) {
    return {
      async get() { return (await preferences.get({ key: ACTIVE_GAME_KEY })).value || null; },
      async set(runId) { await preferences.set({ key: ACTIVE_GAME_KEY, value: runId }); },
    };
  }
  return {
    async get() {
      try { return local?.getItem(ACTIVE_GAME_KEY) || null; } catch { return null; }
    },
    async set(runId) {
      try { local?.setItem(ACTIVE_GAME_KEY, runId); } catch { /* storage is optional */ }
    },
  };
}

export function createGameHost(options = {}) {
  const storage = options.storage || createIndexedDbGameStorage(options.indexedDb) || createMemoryGameStorage();
  let state = clone(options.initialState || createGameRun(options));
  let ready = false;
  let initialRunResolved = false;
  let initializationPromise = null;
  let queue = Promise.resolve();
  const listeners = new Set();
  const channel = options.channel === undefined
    ? (typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('securedme-algoquest-game-v1') : null)
    : options.channel;

  const notify = () => listeners.forEach((listener) => listener(clone(state)));
  const acceptRecord = (record) => {
    if (record?.state?.run_id === state.run_id && record.state.revision >= state.revision) {
      state = clone(record.state);
      notify();
    }
  };
  if (channel) channel.onmessage = (event) => acceptRecord(event.data);

  const initialize = () => {
    if (ready) return Promise.resolve(clone(state));
    if (!initializationPromise) initializationPromise = (async () => {
      if (!initialRunResolved && options.activeRunStore) {
        const savedRunId = await options.activeRunStore.get();
        if (savedRunId && savedRunId !== state.run_id) state = createGameRun({ ...options, runId: savedRunId });
        initialRunResolved = true;
      }
      const restored = requireCompatibleRecord(await storage.load(state.run_id), state.run_id);
      if (restored) {
        state = clone(restored.state);
      } else {
        const result = await storage.commit(state.run_id, state.revision, recordForState(state));
        if (!result.ok && result.record) state = clone(result.record.state);
      }
      await options.activeRunStore?.set(state.run_id);
      ready = true;
      notify();
      return clone(state);
    })().finally(() => { initializationPromise = null; });
    return initializationPromise;
  };

  const dispatchOnce = async (type, payload = {}, commandId) => {
    if (!ready) await initialize();
    const currentRecord = requireCompatibleRecord(await storage.load(state.run_id), state.run_id);
    if (currentRecord && currentRecord.state.revision > state.revision) state = clone(currentRecord.state);
    const before = clone(state);
    const command = createGameCommand(before, type, payload, commandId);
    const result = applyGameCommand(before, command, options);
    if (!result.ok) {
      if (result.error === 'stale-revision' && currentRecord) state = clone(currentRecord.state);
      notify();
      return { ...result, projection: projectHeroSheet(state) };
    }
    if (result.duplicate) return { ...result, projection: projectHeroSheet(state) };
    const committed = await storage.commit(state.run_id, before.revision, recordForState(result.state));
    if (!committed.ok) {
      state = clone(committed.record.state);
      notify();
      return { ok: false, error: 'stale-revision', recoverable: true, state: clone(state), projection: projectHeroSheet(state), events: [] };
    }
    state = clone(result.state);
    channel?.postMessage(recordForState(state));
    notify();
    return { ...result, state: clone(state), projection: projectHeroSheet(state) };
  };

  return {
    initialize,
    isReady: () => ready,
    getState: () => clone(state),
    getProjection: () => projectHeroSheet(state),
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    dispatch(type, payload = {}, commandId) {
      const operation = queue.then(() => dispatchOnce(type, payload, commandId));
      queue = operation.catch(() => undefined);
      return operation;
    },
    async replaceRun(nextState = createGameRun()) {
      state = clone(nextState);
      ready = false;
      initialRunResolved = true;
      await options.activeRunStore?.set(state.run_id);
      return initialize();
    },
    close() { channel?.close(); listeners.clear(); },
  };
}

let singleton;
export function getBrowserGameHost() {
  if (!singleton) {
    const native = Capacitor.isNativePlatform();
    let runId;
    if (!native) {
      try { runId = globalThis.localStorage?.getItem(ACTIVE_GAME_KEY) || undefined; } catch { runId = undefined; }
    }
    const initialState = createGameRun({ runId });
    const storage = native ? createNativeGameStorage() : undefined;
    const activeRunStore = createActiveRunStore({ native });
    singleton = createGameHost({ initialState, storage, activeRunStore });
  }
  return singleton;
}
