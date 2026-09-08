import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

const ROOT = 'algoquest/game-runs';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function runFolder(runId) {
  return `${ROOT}/${encodeURIComponent(runId)}`;
}

async function digest(text) {
  const bytes = new TextEncoder().encode(text);
  const value = await crypto.subtle.digest('SHA-256', bytes);
  return `sha256:${Array.from(new Uint8Array(value)).map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;
}

async function readText(api, directory, path) {
  const result = await api.readFile({ path, directory, encoding: Encoding.UTF8 });
  if (typeof result.data !== 'string') throw new Error('native-save-not-text');
  return result.data;
}

async function generationNames(api, directory, runId) {
  try {
    const result = await api.readdir({ path: runFolder(runId), directory });
    return result.files.map((entry) => entry.name).filter((name) => /^generation-\d+$/.test(name)).sort((left, right) => Number(right.slice(11)) - Number(left.slice(11)));
  } catch {
    return [];
  }
}

async function readGeneration(api, directory, runId, name) {
  try {
    const folder = `${runFolder(runId)}/${name}`;
    const marker = JSON.parse(await readText(api, directory, `${folder}/commit.json`));
    const stateJson = await readText(api, directory, `${folder}/state.json`);
    const eventsJson = await readText(api, directory, `${folder}/events.json`);
    if (marker.schema !== 'securedme.education.algoquest.native-save-commit.v1') return null;
    if (marker.state_digest !== await digest(stateJson) || marker.events_digest !== await digest(eventsJson)) return null;
    const state = JSON.parse(stateJson);
    const events = JSON.parse(eventsJson);
    if (state.schema !== 'securedme.education.algoquest.game-run-state.v1') throw new Error(`GAME_SAVE_INCOMPATIBLE:${runId}`);
    if (state.run_id !== runId || state.revision !== marker.revision || !Array.isArray(events)) return null;
    return { schema: 'securedme.education.algoquest.game-record.v1', run_id: runId, state, events, updated_at: marker.committed_at };
  } catch (error) {
    if (String(error?.message || '').startsWith('GAME_SAVE_INCOMPATIBLE:')) throw error;
    return null;
  }
}

export function createNativeGameStorage(api = Filesystem, directory = Directory.Library) {
  return {
    async load(runId) {
      for (const name of await generationNames(api, directory, runId)) {
        const record = await readGeneration(api, directory, runId, name);
        if (record) return clone(record);
      }
      return null;
    },
    async commit(runId, expectedRevision, nextRecord) {
      const current = await this.load(runId);
      if (current && current.state.revision !== expectedRevision) return { ok: false, conflict: true, record: current };
      const revision = nextRecord.state.revision;
      const folder = `${runFolder(runId)}/generation-${revision}`;
      const stateJson = JSON.stringify(nextRecord.state);
      const eventsJson = JSON.stringify(nextRecord.events);
      await api.mkdir({ path: folder, directory, recursive: true });
      await api.writeFile({ path: `${folder}/state.json`, directory, encoding: Encoding.UTF8, data: stateJson, recursive: true });
      await api.writeFile({ path: `${folder}/events.json`, directory, encoding: Encoding.UTF8, data: eventsJson, recursive: true });
      const rereadState = await readText(api, directory, `${folder}/state.json`);
      const rereadEvents = await readText(api, directory, `${folder}/events.json`);
      const marker = {
        schema: 'securedme.education.algoquest.native-save-commit.v1',
        run_id: runId,
        revision,
        state_digest: await digest(rereadState),
        events_digest: await digest(rereadEvents),
        committed_at: new Date().toISOString(),
      };
      await api.writeFile({ path: `${folder}/commit.json`, directory, encoding: Encoding.UTF8, data: JSON.stringify(marker), recursive: true });
      const verified = await readGeneration(api, directory, runId, `generation-${revision}`);
      if (!verified) throw new Error('native-save-verification-failed');
      return { ok: true, record: verified };
    },
    async list() { return []; },
  };
}
