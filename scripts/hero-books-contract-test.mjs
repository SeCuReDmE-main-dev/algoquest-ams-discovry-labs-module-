import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  assignNextPrompt,
  audienceProfiles,
  ADVENTURE_RUN_STORAGE_KEY,
  buildColabRoundTripReceipt,
  buildColabNotebookDocument,
  buildOrganizationAggregateProjection,
  buildStudentProjection,
  buildTeacherProjection,
  availablePromptNodes,
  builderWebAuthBrokerContract,
  buildBuilderWebAuthBrokerReceipt,
  buildFirstProofReceipt,
  consumePrompt,
  createBuilderWebAuthBrokerEnvelope,
  createDataDeletionReceipt,
  clearLocalPrivacyReceipts,
  createAdventureRun,
  advanceAdventureRuntime,
  advanceStoredAdventureRuntime,
  createAdventureRuntime,
  createEntryMissionState,
  createDeclaredPreference,
  createEphemeralObservationRequest,
  createKnowledgeTokenTransfer,
  createInitialLearningEvidence,
  createInitialQuestState,
  advanceEntryMissionState,
  decideHierarchicalAccess,
  DECLARED_PREFERENCE_STORAGE_KEY,
  ENTRY_MISSION_STORAGE_KEY,
  evaluateBadgeAdmission,
  heroWorldRegistry,
  mageTwoHorizonsPrimaryFr,
  mageColabNotebookManifest,
  mageEntryMissionManifest,
  mageMissionEnvelope,
  manifestDigest,
  persistAdventureRuntime,
  persistEntryMissionState,
  processEphemeralObservation,
  persistPrivacyReceipt,
  PRIVACY_RECEIPT_STORAGE_KEY,
  readAdventureRuntime,
  readDeclaredPreference,
  readEntryMissionState,
  readPrivacyReceipts,
  persistDeclaredPreference,
  revokeKnowledgeTokenTransfer,
  replayAdventureRuntime,
  renderAsciiScene,
  isColabRoundTripReceipt,
  sha256Digest,
  tenebrisPolicy,
  validateBuilderWebAuthBrokerEnvelope,
} from '../services/heroBooks.js';

function installLocalStorageMock() {
  const store = new Map();
  globalThis.window = {
    localStorage: {
      getItem(key) {
        return store.has(key) ? store.get(key) : null;
      },
      setItem(key, value) {
        store.set(key, String(value));
      },
      removeItem(key) {
        store.delete(key);
      },
      clear() {
        store.clear();
      },
    },
  };
  return store;
}

const run = createAdventureRun();
let state = createInitialQuestState(run);
const learningEvidence = createInitialLearningEvidence(run);

assert.equal(audienceProfiles.length, 6, 'six audience profiles must be registered');
for (const profile of audienceProfiles) {
  assert.equal(profile.provenance.publication_status, 'pre-alpha', `profile ${profile.audience_id} must be pre-alpha`);
  assert.ok(Array.isArray(profile.provenance.reviewed_by), `profile ${profile.audience_id} must have reviewed_by array`);
}

assert.equal(heroWorldRegistry.length, 6, 'six Hero Book worlds must be registered');
for (const world of heroWorldRegistry) {
  assert.equal(world.provenance.publication_status, 'pre-alpha', `world ${world.hero_book_id} must be pre-alpha`);
  assert.ok(Array.isArray(world.provenance.reviewed_by), `world ${world.hero_book_id} must have reviewed_by array`);
  assert.ok(Array.isArray(world.certified_locales), `world ${world.hero_book_id} must declare certified locales`);
}

assert.equal(mageTwoHorizonsPrimaryFr.prompt_nodes.length, 12, 'first proof uses twelve real prompts');
assert.equal(mageEntryMissionManifest.success_is_time_based, false, 'fifteen minutes is not a pass/fail rule');
assert.equal(mageMissionEnvelope.canonical_state_owner, 'algoquest', 'AlgoQuest owns canonical state');
assert.equal(mageMissionEnvelope.artifact_owner, 'algorithm-builder-or-colab', 'Builder or Colab owns artifacts only');
assert.equal(tenebrisPolicy.default_status, 'disabled', 'Tenebris observations stay disabled by default');
assert.equal(tenebrisPolicy.mastery_authority, false, 'Tenebris cannot assign mastery');
assert.equal(builderWebAuthBrokerContract.live_channel_available, false, 'Builder WebAuth broker is contract-only until live proof exists');
assert.equal(builderWebAuthBrokerContract.manual_receipt_required, true, 'manual Builder receipt remains required while broker is absent');
assert.equal(builderWebAuthBrokerContract.authority.can_award_mastery, false, 'Builder WebAuth broker cannot award mastery');
assert.equal(builderWebAuthBrokerContract.authority.can_award_token, false, 'Builder WebAuth broker cannot award tokens');

const brokerEnvelope = await createBuilderWebAuthBrokerEnvelope();
assert.equal(validateBuilderWebAuthBrokerEnvelope(brokerEnvelope).valid, true, 'closed Builder broker envelope should validate');
const brokerReceipt = await buildBuilderWebAuthBrokerReceipt(brokerEnvelope);
assert.equal(brokerReceipt.status, 'blocked-live-broker-absent', 'closed Builder broker must not claim live transport proof');
assert.equal(brokerReceipt.mastery_authority, false, 'closed Builder broker receipt cannot carry mastery authority');
assert.equal(brokerReceipt.token_authority, false, 'closed Builder broker receipt cannot carry token authority');
assert.equal(brokerReceipt.unlock_authority, false, 'closed Builder broker receipt cannot unlock milestones');
const rejectedBrokerEnvelope = await createBuilderWebAuthBrokerEnvelope({
  payload_schema: 'securedme.education.algoquest.hidden-master-profile.v1',
  payload: { contains_provider_secret: true, sensitive_marker: 'api-key' },
});
const rejectedBrokerReceipt = await buildBuilderWebAuthBrokerReceipt(rejectedBrokerEnvelope);
assert.equal(rejectedBrokerReceipt.status, 'rejected', 'forbidden Builder broker payload must be rejected');
assert.ok(rejectedBrokerReceipt.validation_errors.includes('payload-schema-not-allowed'), 'broker should reject unknown payload schemas');
assert.ok(rejectedBrokerReceipt.validation_errors.includes('forbidden-marker-detected'), 'broker should detect forbidden payload markers');

const entryState = createEntryMissionState();
assert.equal(entryState.state, 'ready', 'entry mission starts ready');
const guidedEntryState = advanceEntryMissionState(entryState, { state: 'guided', assistance_level: 'hint' });
assert.equal(guidedEntryState.assistance_level, 'hint', 'help is explicit and recorded without raw text');
const localStore = installLocalStorageMock();
assert.equal(persistEntryMissionState(guidedEntryState), true, 'entry mission state should persist locally');
const resumedEntryState = readEntryMissionState();
assert.equal(resumedEntryState.state, 'guided', 'entry mission state should resume exact state');
assert.equal(resumedEntryState.assistance_level, 'hint', 'entry mission should resume explicit assistance level');
assert.equal(resumedEntryState.resumed_count, 1, 'entry mission resume should record one local resume without raw text');
localStore.set(ENTRY_MISSION_STORAGE_KEY, JSON.stringify({ ...guidedEntryState, raw_secret_stored: true }));
const fallbackEntryState = readEntryMissionState(entryState);
assert.equal(fallbackEntryState.state, 'ready', 'corrupted entry state should fall back closed');
localStore.clear();
localStore.clear();

const preference = createDeclaredPreference({ language: 'fr', theme: 'day', access_profile: 'autism-calm' });
assert.equal(preference.language, 'fr', 'declared preference holds custom language');
assert.equal(preference.access_profile, 'autism-calm', 'declared preference holds custom access profile');
assert.equal(persistDeclaredPreference(preference), true, 'declared preference persists correctly');
const resumedPref = readDeclaredPreference();
assert.equal(resumedPref.theme, 'day', 'declared preference resumes correctly');
localStore.set(DECLARED_PREFERENCE_STORAGE_KEY, JSON.stringify({ ...preference, raw_secret_stored: true }));
const fallbackPref = readDeclaredPreference();
assert.equal(fallbackPref.language, 'en', 'corrupted declared preference falls back safely');
localStore.clear();

const firstAscii = renderAsciiScene(mageTwoHorizonsPrimaryFr.prompt_nodes[0]);
assert.ok(firstAscii.art.every((line) => line.length <= firstAscii.width), 'ASCII scene must stay within bounded width');
assert.ok(firstAscii.linear_equivalent.includes(mageTwoHorizonsPrimaryFr.prompt_nodes[0].title), 'ASCII scene needs a linear equivalent');

assert.equal(mageColabNotebookManifest.contains_identity, false, 'Colab manifest cannot contain identity');
assert.equal(mageColabNotebookManifest.contains_secret, false, 'Colab manifest cannot contain secrets');
assert.equal(mageColabNotebookManifest.contains_canonical_state, false, 'Colab manifest cannot contain canonical state');
const generatedNotebook = buildColabNotebookDocument();
const notebookPath = new URL('../notebooks/mage-two-horizons-primary-5-6-fr-CA.ipynb', import.meta.url);
const storedNotebook = JSON.parse(fs.readFileSync(notebookPath, 'utf8'));
assert.deepEqual(storedNotebook, generatedNotebook, 'versioned notebook must match generated contract document');
const publicNotebookPath = new URL('../public/notebooks/mage-two-horizons-primary-5-6-fr-CA.ipynb', import.meta.url);
const publicNotebook = JSON.parse(fs.readFileSync(publicNotebookPath, 'utf8'));
assert.deepEqual(publicNotebook, generatedNotebook, 'public notebook must match generated contract document');
const notebookText = JSON.stringify(storedNotebook).toLowerCase();
for (const forbidden of ['student_email', 'student_name', 'api_key', 'oauth_token', 'password', 'quest_state', 'learning_evidence']) {
  assert.equal(notebookText.includes(forbidden), false, `notebook must not contain ${forbidden}`);
}
const secretScanFiles = [
  '../services/heroBooks.js',
  '../docs/hero-books-pre-alpha.md',
  '../docs/hero-books-traceability-matrix.md',
  '../docs/HERO_BOOKS_145_ACTION_STATE.json',
  '../notebooks/mage-two-horizons-primary-5-6-fr-CA.ipynb',
  '../public/notebooks/mage-two-horizons-primary-5-6-fr-CA.ipynb',
];
for (const relativePath of secretScanFiles) {
  const fileText = fs.readFileSync(new URL(relativePath, import.meta.url), 'utf8').toLowerCase();
  for (const forbidden of ['api_key:', 'oauth_token:', 'bearer ', 'student_email', 'student_name', 'raw_audio', 'raw transcript']) {
    assert.equal(fileText.includes(forbidden), false, `${relativePath} must not contain ${forbidden}`);
  }
}

const digestOne = await manifestDigest(mageTwoHorizonsPrimaryFr);
const digestTwo = await manifestDigest(JSON.parse(JSON.stringify(mageTwoHorizonsPrimaryFr)));
assert.equal(digestOne, digestTwo, 'manifest digest must be reproducible');

const firstAssignment = await assignNextPrompt(mageTwoHorizonsPrimaryFr, run, state);
assert.equal(firstAssignment.status, 'assigned');

const firstReceipt = await consumePrompt(mageTwoHorizonsPrimaryFr, run, state, firstAssignment.prompt_id);
assert.equal(firstReceipt.status, 'consumed');
state = firstReceipt.next_state;

const replayReceipt = await consumePrompt(mageTwoHorizonsPrimaryFr, run, state, firstAssignment.prompt_id);
assert.equal(replayReceipt.status, 'replayed', 'a prompt can only be consumed once per AdventureRun');
assert.equal(replayReceipt.after_digest, replayReceipt.before_digest, 'replay cannot mutate state');

const blockedReceipt = await consumePrompt(mageTwoHorizonsPrimaryFr, run, state, 'mage-p09-first-token');
assert.equal(blockedReceipt.status, 'rejected', 'milestone prompt requires prior proof prompts');
assert.equal(blockedReceipt.reason, 'missing-prerequisite');

let runtime = createAdventureRuntime();
for (let step = 0; step < 5; step += 1) {
  runtime = await advanceAdventureRuntime(runtime);
}
assert.equal(runtime.quest_state.consumed_prompt_ids.length, 5, 'runtime can advance five prompts');
assert.equal(runtime.learning_evidence.knowledge_token_ids.length, 0, 'runtime story progress does not mutate evidence tokens');
assert.equal(persistAdventureRuntime(runtime), true, 'adventure runtime should persist locally');
const resumedRuntime = readAdventureRuntime();
assert.deepEqual(resumedRuntime.quest_state.consumed_prompt_ids, runtime.quest_state.consumed_prompt_ids, 'adventure runtime should resume consumed prompt path');
assert.deepEqual(resumedRuntime.receipts.map((receipt) => receipt.prompt_id), runtime.receipts.map((receipt) => receipt.prompt_id), 'adventure runtime should resume receipts');
localStore.set(ADVENTURE_RUN_STORAGE_KEY, JSON.stringify({ ...runtime, raw_secret_stored: true }));
const fallbackRuntime = readAdventureRuntime(createAdventureRuntime({ seed: 'fallback-seed' }));
assert.equal(fallbackRuntime.run.seed, 'fallback-seed', 'corrupted runtime should fall back closed');
localStore.clear();
const sharedRuntime = createAdventureRuntime({ seed: 'multi-tab-lock' });
assert.equal(persistAdventureRuntime(sharedRuntime), true, 'shared adventure runtime should persist');
const tabOneRuntime = readAdventureRuntime();
const tabTwoRuntime = readAdventureRuntime();
const tabOneAdvance = await advanceStoredAdventureRuntime({ expected_state_version: tabOneRuntime.state_version });
assert.equal(tabOneAdvance.status, 'advanced', 'fresh tab should advance stored runtime');
const tabTwoAdvance = await advanceStoredAdventureRuntime({ expected_state_version: tabTwoRuntime.state_version });
assert.equal(tabTwoAdvance.status, 'conflict', 'stale tab should receive explicit version conflict');
assert.equal(tabTwoAdvance.reason, 'stale-runtime-version', 'stale tab conflict must be explicit');
localStore.clear();
const replayReport = await replayAdventureRuntime(runtime);
assert.equal(replayReport.status, 'matched', 'runtime replay must match original state');
assert.deepEqual(replayReport.replayed_prompt_ids, replayReport.consumed_prompt_ids, 'runtime replay prompt ids must match');

for (const promptId of ['mage-p02-first-vector', 'mage-p03-build-force', 'mage-p04-run-path', 'mage-p05-change-one-thing', 'mage-p07-newton-limit', 'mage-p09-first-token']) {
  const receipt = await consumePrompt(mageTwoHorizonsPrimaryFr, run, state, promptId);
  assert.equal(receipt.status, 'consumed', `${promptId} should be consumable in the canonical path`);
  state = receipt.next_state;
}

assert.ok(state.story_points > 0, 'story points may move the adventure');
assert.equal(learningEvidence.knowledge_token_ids.length, 0, 'story points do not mutate LearningEvidence');

const artifactReceipt = {
  schema: 'securedme.education.algorithm-builder.algorithm-artifact-receipt.v1',
  receipt_id: 'algorithm-artifact:test',
  source_app: 'algorithm-builder',
  target_app: 'algoquest',
  mission_id: mageTwoHorizonsPrimaryFr.adaptation_id,
  graph: { nodes: [{ id: 'force-1', type: 'force-block' }], edges: [] },
  tests: [{ test_id: 'graph-has-node', status: 'passed' }],
  artifact_digest: await sha256Digest({ nodes: ['force-1'] }),
  contract_version: 'v1',
  raw_secret_stored: false,
};

const colabReceipt = await buildColabRoundTripReceipt({
  artifact_digest: artifactReceipt.artifact_digest,
  model_limit_written: true,
});
assert.equal(colabReceipt.contains_identity, false, 'Colab receipt cannot contain identity');
assert.equal(colabReceipt.tests.every((test) => test.status === 'passed'), true, 'Colab round trip fixture should pass');
assert.equal(isColabRoundTripReceipt(colabReceipt), true, 'valid Colab receipt should be admitted');
assert.equal(isColabRoundTripReceipt({ ...colabReceipt, contains_secret: true }), false, 'secret-bearing Colab receipt must be rejected');
assert.equal(isColabRoundTripReceipt({ ...colabReceipt, mission_id: 'other-mission' }), false, 'foreign mission Colab receipt must be rejected');

const proof = await buildFirstProofReceipt({
  run,
  quest_state: state,
  learning_evidence: learningEvidence,
  artifact_receipt: artifactReceipt,
});
assert.equal(proof.status, 'completed', 'first proof requires artifact, model limit and milestone');
assert.equal(proof.mastery_decision, 'first-proof-admitted');

const updatedEvidence = evaluateBadgeAdmission(learningEvidence, proof);
assert.ok(updatedEvidence.knowledge_token_ids.includes('token:first-proof'), 'evidence should admit badge from proof');
assert.equal(updatedEvidence.latest_mastery_decision, 'first-proof-admitted', 'evidence should update latest mastery');

const incompleteProof = { ...proof, mastery_decision: 'not-admitted' };
const rejectedEvidence = evaluateBadgeAdmission(learningEvidence, incompleteProof);
assert.equal(rejectedEvidence.knowledge_token_ids.includes('token:first-proof'), false, 'evidence should reject badge if proof not admitted');

const observationRequest = createEphemeralObservationRequest();
const observationResult = processEphemeralObservation(observationRequest);
assert.equal(observationResult.status, 'abstain', 'disabled Tenebris observation must abstain');
assert.equal(observationResult.mastery_authority, false, 'ephemeral observation cannot assign mastery');
assert.equal(observationResult.purge_receipt.contains_vot_metrics, false, 'AlgoQuest must not keep V.O.T metrics');

const studentProjection = buildStudentProjection({
  run,
  quest_state: state,
  learning_evidence: learningEvidence,
  entry_state: guidedEntryState,
});
assert.equal(studentProjection.contains_identity, false, 'student projection cannot expose identity');
assert.equal(studentProjection.contains_raw_answer, false, 'student projection cannot expose raw answers');

const unassignedTeacherProjection = buildTeacherProjection({
  teacher_ref: 'teacher:redacted',
  assigned_run_ids: [],
  student_projection: studentProjection,
});
assert.equal(unassignedTeacherProjection.visible_status, 'not-assigned', 'teacher cannot see unassigned student run');
assert.equal(unassignedTeacherProjection.run_id, null, 'unassigned teacher projection must not leak run id');

const assignedTeacherProjection = buildTeacherProjection({
  teacher_ref: 'teacher:redacted',
  assigned_run_ids: [studentProjection.run_id],
  student_projection: studentProjection,
});
assert.equal(assignedTeacherProjection.visible_status, 'assigned-summary', 'assigned teacher can see summary only');
assert.equal(assignedTeacherProjection.contains_teacher_private_activity, false, 'teacher projection cannot leak professor-player private activity');

const smallAggregate = buildOrganizationAggregateProjection({ cohort_size: 9, completed_count: 8, blocked_count: 1 });
assert.equal(smallAggregate.status, 'suppressed-small-cohort', 'organization aggregate under k=10 must be suppressed');
assert.equal(smallAggregate.completed_count, null, 'small aggregate must not expose counts');
const admittedAggregate = buildOrganizationAggregateProjection({ cohort_size: 10, completed_count: 8, blocked_count: 2 });
assert.equal(admittedAggregate.status, 'aggregate-admitted', 'organization aggregate at k=10 can be admitted');
assert.equal(admittedAggregate.contains_individual_teacher, false, 'organization aggregate cannot expose individual teacher');

const rejectedTransfer = createKnowledgeTokenTransfer({ token_id: 'token:first-proof', from_run_id: run.run_id });
assert.equal(rejectedTransfer.status, 'transfer-rejected', 'token transfer requires consent and expiration');
const admittedTransfer = createKnowledgeTokenTransfer({
  token_id: 'token:first-proof',
  from_run_id: run.run_id,
  consent_scope: 'tool',
  expires_at: '2026-08-04T00:00:00.000Z',
});
assert.equal(admittedTransfer.status, 'transfer-admitted', 'token transfer with consent and expiration is admitted');
const revokedTransfer = revokeKnowledgeTokenTransfer(admittedTransfer, { reason: 'learner-request' });
assert.equal(revokedTransfer.status, 'revoked', 'admitted token transfer can be revoked');
assert.equal(revokedTransfer.contains_raw_answer, false, 'token revocation cannot contain raw answers');
const rejectedRevocation = revokeKnowledgeTokenTransfer({ schema: 'wrong' });
assert.equal(rejectedRevocation.status, 'revocation-rejected', 'invalid transfer revocation is rejected');

const deletionReceipt = createDataDeletionReceipt({ run_id: run.run_id, scope: 'local-run', requested_by: 'learner' });
assert.equal(deletionReceipt.status, 'deletion-recorded', 'local run deletion request should be recorded');
assert.equal(deletionReceipt.retained_trace, 'bounded-deletion-receipt-only', 'deletion keeps only bounded trace');
assert.equal(deletionReceipt.never_stored_categories.includes('vot-metrics'), true, 'deletion receipt records V.O.T metrics as never stored');
assert.equal(deletionReceipt.contains_identity, false, 'deletion receipt cannot contain identity');
const rejectedDeletion = createDataDeletionReceipt({ run_id: run.run_id, scope: 'raw-audio', requested_by: 'principal' });
assert.equal(rejectedDeletion.status, 'deletion-rejected', 'unsupported deletion scope/requester is rejected');

const deniedTeacherActivity = decideHierarchicalAccess({
  requester_role: 'organization-admin',
  target_kind: 'teacher-private-activity',
  cohort_size: 100,
});
assert.equal(deniedTeacherActivity.status, 'denied', 'organization admin cannot inspect teacher private activity');
const deniedSmallAggregate = decideHierarchicalAccess({
  requester_role: 'organization-admin',
  target_kind: 'organization-aggregate',
  cohort_size: 9,
});
assert.equal(deniedSmallAggregate.status, 'denied', 'organization aggregate under k=10 is denied');
const allowedAggregate = decideHierarchicalAccess({
  requester_role: 'organization-admin',
  target_kind: 'organization-aggregate',
  cohort_size: 10,
});
assert.equal(allowedAggregate.status, 'allowed', 'organization aggregate at k=10 can be allowed');
const allowedAssignedSummary = decideHierarchicalAccess({
  requester_role: 'teacher',
  target_kind: 'assigned-student-summary',
  explicitly_assigned: true,
});
assert.equal(allowedAssignedSummary.status, 'allowed', 'assigned teacher can see minimum necessary summary');
const deniedRawAnswer = decideHierarchicalAccess({
  requester_role: 'teacher',
  target_kind: 'raw-answer',
  explicitly_assigned: true,
});
assert.equal(deniedRawAnswer.status, 'denied', 'raw answers are denied even for assigned teachers');
assert.equal(persistPrivacyReceipt(revokedTransfer), true, 'revocation receipt should persist locally');
assert.equal(persistPrivacyReceipt(deletionReceipt), true, 'deletion receipt should persist locally');
localStore.set(PRIVACY_RECEIPT_STORAGE_KEY, JSON.stringify([
  { ...revokedTransfer, contains_audio: true },
  deletionReceipt,
  allowedAggregate,
]));
const safePrivacyReceipts = readPrivacyReceipts();
assert.equal(safePrivacyReceipts.length, 2, 'privacy receipt reader filters unsafe records');
assert.equal(safePrivacyReceipts.some((receipt) => receipt.contains_audio), false, 'privacy receipt storage cannot return audio-bearing records');
localStore.clear();
for (let index = 0; index < 30; index += 1) {
  assert.equal(persistPrivacyReceipt({ ...deletionReceipt, deleted_at: `2026-08-03T00:00:${String(index).padStart(2, '0')}.000Z` }), true);
}
assert.equal(readPrivacyReceipts().length, 25, 'privacy receipt storage is bounded to 25 records');
const clearReceipts = clearLocalPrivacyReceipts({ requested_by: 'learner' });
assert.equal(clearReceipts.status, 'deletion-recorded', 'privacy receipt cache can be cleared with a bounded receipt');
assert.equal(readPrivacyReceipts().length, 0, 'privacy receipt cache is empty after clear');
localStore.clear();

const sequences = [];
for (let index = 0; index < 100; index += 1) {
  const replayRun = createAdventureRun({ seed: 'seed:mage:first-proof' });
  let replayState = createInitialQuestState(replayRun);
  const replaySequence = [];
  while (availablePromptNodes(mageTwoHorizonsPrimaryFr, replayState).length) {
    const assignment = await assignNextPrompt(mageTwoHorizonsPrimaryFr, replayRun, replayState);
    if (assignment.status !== 'assigned') {
      break;
    }
    const receipt = await consumePrompt(mageTwoHorizonsPrimaryFr, replayRun, replayState, assignment.prompt_id);
    if (receipt.status !== 'consumed') {
      break;
    }
    replaySequence.push(assignment.prompt_id);
    replayState = receipt.next_state;
    if (replaySequence.includes('mage-p12-finale')) {
      break;
    }
  }
  sequences.push(replaySequence.join('>'));
}
assert.equal(new Set(sequences).size, 1, 'same seed and state must replay the same prompt sequence');

console.log('algoquest hero-books contract test passed');
