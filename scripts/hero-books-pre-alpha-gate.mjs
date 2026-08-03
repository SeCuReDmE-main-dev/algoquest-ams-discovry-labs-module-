import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  advanceAdventureRuntime,
  buildColabRoundTripReceipt,
  buildFirstProofReceipt,
  buildOrganizationAggregateProjection,
  createAdventureRuntime,
  createEphemeralObservationRequest,
  createInitialLearningEvidence,
  processEphemeralObservation,
  replayAdventureRuntime,
  sha256Digest,
} from '../services/heroBooks.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function runScenario(seed, steps = 8) {
  let runtime = createAdventureRuntime({ seed, started_at: '2026-08-03T00:00:00.000Z' });
  for (let index = 0; index < steps; index += 1) {
    runtime = await advanceAdventureRuntime(runtime);
  }
  const replay = await replayAdventureRuntime(runtime);
  assert.equal(replay.status, 'matched', `replay should match for ${seed}`);
  return {
    seed,
    run_id: runtime.run.run_id,
    consumed_prompt_ids: runtime.quest_state.consumed_prompt_ids,
    story_points: runtime.quest_state.story_points,
    learning_token_count: runtime.learning_evidence.knowledge_token_ids.length,
    replay_digest: replay.replayed_state_digest,
  };
}

async function simulateRuns(count) {
  const results = [];
  for (let index = 0; index < count; index += 1) {
    results.push(await runScenario(`pre-alpha-sim:${count}:${index}`));
  }
  const runIds = new Set(results.map((result) => result.run_id));
  assert.equal(runIds.size, count, `${count} runs should have unique run ids`);
  assert.equal(results.every((result) => result.learning_token_count === 0), true, 'story progress must not mint learning tokens');
  return results;
}

async function simulateFailures() {
  const runtime = await runScenario('failure-simulation', 4);
  const noBuilderProof = await buildFirstProofReceipt({
    run: { run_id: runtime.run_id },
    quest_state: { consumed_prompt_ids: runtime.consumed_prompt_ids },
    learning_evidence: createInitialLearningEvidence({ run_id: runtime.run_id }),
    artifact_receipt: null,
  });
  assert.equal(noBuilderProof.status, 'hold', 'missing Builder receipt must hold first proof');

  const badColabReceipt = await buildColabRoundTripReceipt({
    artifact_digest: null,
    model_limit_written: false,
  });
  assert.equal(badColabReceipt.tests.some((test) => test.status === 'failed'), true, 'bad Colab run should fail receipt tests');

  const tenebrisDisabled = processEphemeralObservation(createEphemeralObservationRequest());
  assert.equal(tenebrisDisabled.status, 'abstain', 'disabled Tenebris must abstain');
  assert.equal(tenebrisDisabled.mastery_authority, false, 'Tenebris failure cannot assign mastery');

  const smallAggregate = buildOrganizationAggregateProjection({ cohort_size: 1, completed_count: 1, blocked_count: 0 });
  assert.equal(smallAggregate.status, 'suppressed-small-cohort', 'small organization aggregate must be suppressed');
}

function walkFiles(root, predicate, results = []) {
  if (!fs.existsSync(root)) {
    return results;
  }
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'site'].includes(entry.name)) {
        walkFiles(fullPath, predicate, results);
      }
    } else if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

function scanForbiddenData() {
  const files = [
    ...walkFiles(path.join(repoRoot, 'docs'), (file) => /\.(md|json|ya?ml)$/i.test(file)),
    ...walkFiles(path.join(repoRoot, 'notebooks'), (file) => /\.ipynb$/i.test(file)),
    ...walkFiles(path.join(repoRoot, 'public', 'notebooks'), (file) => /\.ipynb$/i.test(file)),
    ...walkFiles(path.join(repoRoot, 'dist'), (file) => /\.(js|html|json|css)$/i.test(file)),
  ];
  const forbiddenPatterns = [
    /api[_-]?key\s*[:=]/i,
    /oauth[_-]?token\s*[:=]/i,
    /bearer\s+[a-z0-9._~+/=-]{12,}/i,
    /student_email/i,
    /student_name/i,
    /raw_audio/i,
    /raw transcript/i,
    /mfcc/i,
    /jitter/i,
    /shimmer/i,
  ];
  const hits = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(text)) {
        hits.push({ file, pattern: String(pattern) });
      }
    }
  }
  assert.deepEqual(hits, [], `forbidden data markers found: ${JSON.stringify(hits, null, 2)}`);
  return files.length;
}

const one = await simulateRuns(1);
const twentyFive = await simulateRuns(25);
const hundred = await simulateRuns(100);
await simulateFailures();
const scannedFiles = scanForbiddenData();

const gateReport = {
  schema: 'securedme.education.algoquest.hero-books-pre-alpha-gate-report.v1',
  status: 'passed',
  simulated_runs: {
    one: one.length,
    twenty_five: twentyFive.length,
    hundred: hundred.length,
  },
  scanned_files: scannedFiles,
  report_digest: await sha256Digest({
    one: one.map((result) => result.replay_digest),
    twentyFive: twentyFive.map((result) => result.replay_digest),
    hundred: hundred.map((result) => result.replay_digest),
    scannedFiles,
  }),
  alpha_ready: false,
  alpha_blockers: [
    'live Builder-WebAuth broker absent',
    'live Colab file/API round-trip absent',
    'no real user, teacher, school or minor approval',
  ],
  raw_secret_stored: false,
};

console.log(JSON.stringify(gateReport, null, 2));
