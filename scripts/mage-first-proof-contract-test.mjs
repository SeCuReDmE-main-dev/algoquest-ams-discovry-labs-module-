import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  createLearnerProfileV1,
  createMageMissionEnvelopeV2,
  mageMissionEnvelope,
  validateColabExecutionReceiptV2,
  validateMageMissionEnvelopeV2,
} from '../services/heroBooks.js';

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

function digest(value) {
  return `sha256:${createHash('sha256').update(canonical(value)).digest('hex')}`;
}

const profile = createLearnerProfileV1({ language: 'fr-CA', motion_preference: 'reduced' });
assert.equal(profile.inferred_traits, false);
assert.equal(profile.raw_identity_stored, false);
assert.equal(profile.reversible_preferences, true);

const mission = await createMageMissionEnvelopeV2({ run_id: 'mage-run-algoquest-contract', profile });
assert.equal(validateMageMissionEnvelopeV2(mission).valid, true);
assert.equal(mission.canonical_state_owner, 'algoquest');
assert.equal(mission.contains_canonical_state, false);
assert.equal(mission.allowed_capabilities.length, 8);
assert.equal(validateMageMissionEnvelopeV2({ ...mission, expires_at: new Date(Date.now() - 1).toISOString() }).errors.includes('mission-expired'), true);
assert.equal(mageMissionEnvelope.contract_version, 'v1', 'the established v1 mission remains available');

const receiptBody = {
  schema: 'securedme.education.colab.execution-receipt.v2', receipt_id: 'colab-execution:test:1', provider: 'google-colab',
  run_id: mission.run_id, mission_id: mission.mission_id, adaptation_id: mission.adaptation_id,
  prompt_assignment_id: mission.prompt_assignment_id, artifact_digest: 'sha256:bound-artifact', generated_code_digest: 'sha256:code',
  attempt_id: 'attempt-1', execution_result: { trajectory_changed: true },
  model_limit_response: 'This model compares trajectories but cannot prove physical outcomes.',
  tests: [{ test_id: 'trajectory_changes', status: 'passed' }], executed_at: new Date().toISOString(), admitted_at: new Date().toISOString(),
  contains_identity: false, contains_secret: false, contains_canonical_state: false, hidden_telemetry_stored: false, raw_secret_stored: false,
  contract_version: 'v2',
};
const receipt = {
  ...receiptBody,
  receipt_digest: digest(receiptBody),
  server_attestation: { alg: 'HS256', key_ref: 'broker-receipt-key', signature: `hmac-sha256:${'a'.repeat(64)}` },
};
assert.equal((await validateColabExecutionReceiptV2(receipt, { mission, artifact_digest: receipt.artifact_digest })).valid, true);
const tampered = { ...receipt, execution_result: { trajectory_changed: false } };
assert.equal((await validateColabExecutionReceiptV2(tampered, { mission, artifact_digest: receipt.artifact_digest })).errors.includes('receipt-digest-mismatch'), true);
assert.equal((await validateColabExecutionReceiptV2(receipt, { mission, artifact_digest: 'sha256:wrong' })).errors.includes('artifact-binding-mismatch'), true);
assert.equal((await validateColabExecutionReceiptV2({ ...receipt, contains_identity: true }, { mission, artifact_digest: receipt.artifact_digest })).errors.includes('unsafe-execution-receipt'), true);

console.log('Mage first-proof AlgoQuest contracts: v1 compatibility, authority, digest, binding, expiration, and privacy passed.');
