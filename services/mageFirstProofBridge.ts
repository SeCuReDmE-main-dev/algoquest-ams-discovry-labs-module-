import { createMageMissionEnvelopeV2, createLearnerProfileV1, persistColabExecutionReceiptV2, readLearnerProfileV1, validateColabExecutionReceiptV2 } from './heroBooks';
import { persistBuilderArtifactReceiptV2, validateAlgorithmArtifactReceiptV2 } from './educationInterop';
import { getBrowserGameHost } from './gameHost.js';
import { AlgorithmArtifactReceiptV2 } from '../types';

const PAGE_SOURCE = 'securedme-algoquest-page';
const EXTENSION_SOURCE = 'securedme-arcane-forge-extension';
const ARTIFACT_STORAGE_KEY = 'securedme.education.algoquest.algorithm-artifact.outbox.v2';

function latestArtifactDigest(runId: string): string | null {
  try {
    const records = JSON.parse(window.localStorage.getItem(ARTIFACT_STORAGE_KEY) || '[]');
    const record = Array.isArray(records) ? records.find((candidate) => candidate?.run_id === runId) : null;
    return typeof record?.artifact_digest === 'string' ? record.artifact_digest : null;
  } catch {
    return null;
  }
}

export function installMageFirstProofBridge(): () => void {
  const host = getBrowserGameHost();
  let currentMission: Record<string, unknown> | null = null;

  const publishSnapshot = () => {
    window.postMessage({ source: PAGE_SOURCE, type: 'GAME_STATE_SNAPSHOT', projection: host.getProjection() }, window.location.origin);
  };

  const publishMission = async () => {
    const game = host.getState();
    const profile = readLearnerProfileV1(createLearnerProfileV1());
    const createMission = createMageMissionEnvelopeV2 as unknown as (options: { run_id?: string; profile?: unknown }) => Promise<Record<string, unknown>>;
    currentMission = await createMission({ run_id: game.run_id, profile });
    window.postMessage({ source: PAGE_SOURCE, type: 'MAGE_MISSION_AVAILABLE', mission: currentMission, profile }, window.location.origin);
    publishSnapshot();
  };

  const onMessage = async (event: MessageEvent) => {
    if (event.source !== window || event.origin !== window.location.origin || !event.data || event.data.source !== EXTENSION_SOURCE) return;
    if (event.data.type === 'EXTENSION_BRIDGE_READY' || event.data.type === 'REQUEST_GAME_SNAPSHOT') {
      await publishMission();
      return;
    }
    if (event.data.type === 'GAME_COMMAND') {
      const requestId = event.data.command?.command_id;
      const result = requestId
        ? await host.dispatch(event.data.command.type, event.data.command.payload || {}, requestId)
        : { ok: false, error: 'command-id-missing' };
      window.postMessage({ source: PAGE_SOURCE, type: 'GAME_COMMAND_RESULT', request_id: requestId, result }, window.location.origin);
      return;
    }
    if (event.data.type === 'ARTIFACT_RECEIPT_AVAILABLE') {
      if (!currentMission) await publishMission();
      const validation = await validateAlgorithmArtifactReceiptV2(event.data.receipt, currentMission as { run_id: string; mission_id: string; prompt_assignment_id: string });
      if (!validation.valid) {
        window.dispatchEvent(new CustomEvent('securedme:artifact-receipt-rejected', { detail: { errors: validation.errors, work_preserved: true } }));
        return;
      }
      persistBuilderArtifactReceiptV2(event.data.receipt as AlgorithmArtifactReceiptV2);
      window.dispatchEvent(new CustomEvent('securedme:artifact-receipt-admitted', { detail: { receipt: event.data.receipt, progression_authority: 'algoquest' } }));
      return;
    }
    if (event.data.type === 'COLAB_RECEIPT_AVAILABLE') {
      if (!currentMission) await publishMission();
      const runId = String(currentMission?.run_id || '');
      const artifactDigest = latestArtifactDigest(runId);
      const validation = await validateColabExecutionReceiptV2(event.data.receipt, { mission: currentMission, artifact_digest: artifactDigest });
      if (!validation.valid || event.data.broker_authenticated !== true) {
        const errors = validation.valid ? ['broker-authentication-missing'] : validation.errors;
        window.dispatchEvent(new CustomEvent('securedme:colab-receipt-rejected', { detail: { errors, work_preserved: true } }));
        return;
      }
      persistColabExecutionReceiptV2(event.data.receipt);
      window.dispatchEvent(new CustomEvent('securedme:colab-receipt-admitted', { detail: { receipt: event.data.receipt, mastery_authority: false } }));
    }
  };

  const unsubscribe = host.subscribe(() => {
    publishSnapshot();
    publishMission().catch(() => undefined);
  });
  window.addEventListener('message', onMessage);
  host.initialize().then(publishMission).catch(() => undefined);
  return () => { unsubscribe(); window.removeEventListener('message', onMessage); };
}
