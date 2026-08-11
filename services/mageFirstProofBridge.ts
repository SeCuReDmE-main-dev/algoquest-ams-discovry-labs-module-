import { createMageMissionEnvelopeV2, createLearnerProfileV1, persistColabExecutionReceiptV2, readAdventureRuntime, readLearnerProfileV1, validateColabExecutionReceiptV2 } from './heroBooks';
import { persistBuilderArtifactReceiptV2, validateAlgorithmArtifactReceiptV2 } from './educationInterop';
import { AlgorithmArtifactReceiptV2 } from '../types';

const PAGE_SOURCE = 'securedme-algoquest-page';
const EXTENSION_SOURCE = 'securedme-arcane-forge-extension';
const ARTIFACT_STORAGE_KEY = 'securedme.education.algoquest.algorithm-artifact.outbox.v2';

function latestArtifactDigest(): string | null {
  try {
    const records = JSON.parse(window.localStorage.getItem(ARTIFACT_STORAGE_KEY) || '[]');
    return Array.isArray(records) && typeof records[0]?.artifact_digest === 'string' ? records[0].artifact_digest : null;
  } catch (_error) {
    return null;
  }
}

export function installMageFirstProofBridge(): () => void {
  let currentMission: Record<string, unknown> | null = null;

  const publishMission = async () => {
    const runtime = readAdventureRuntime();
    const profile = readLearnerProfileV1(createLearnerProfileV1());
    const createMission = createMageMissionEnvelopeV2 as unknown as (options: { run_id?: string; profile?: unknown }) => Promise<Record<string, unknown>>;
    currentMission = await createMission({ run_id: runtime.run?.run_id || runtime.run_id, profile });
    window.postMessage({ source: PAGE_SOURCE, type: 'MAGE_MISSION_AVAILABLE', mission: currentMission, profile }, window.location.origin);
  };

  const onMessage = async (event: MessageEvent) => {
    if (event.source !== window || !event.data || event.data.source !== EXTENSION_SOURCE) return;
    if (event.data.type === 'EXTENSION_BRIDGE_READY') {
      await publishMission();
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
      const artifactDigest = latestArtifactDigest();
      const validation = await validateColabExecutionReceiptV2(event.data.receipt, { mission: currentMission, artifact_digest: artifactDigest });
      if (!validation.valid) {
        window.dispatchEvent(new CustomEvent('securedme:colab-receipt-rejected', { detail: { errors: validation.errors, work_preserved: true } }));
        return;
      }
      persistColabExecutionReceiptV2(event.data.receipt);
      window.dispatchEvent(new CustomEvent('securedme:colab-receipt-admitted', { detail: { receipt: event.data.receipt, mastery_authority: false } }));
    }
  };

  window.addEventListener('message', onMessage);
  publishMission().catch(() => undefined);
  return () => window.removeEventListener('message', onMessage);
}
