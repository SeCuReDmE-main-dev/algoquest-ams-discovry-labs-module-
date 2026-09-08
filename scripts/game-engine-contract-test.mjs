import assert from 'node:assert/strict';
import {
  GAME_RUN_SCHEMA,
  applyGameCommand,
  buildMagePath,
  createGameCommand,
  createGameRun,
  projectHeroSheet,
  validatePromptBank,
} from '../services/gameEngine.js';
import { mageTwoHorizonsPrimaryFr } from '../services/heroBooks.js';

assert.equal(validatePromptBank(mageTwoHorizonsPrimaryFr).valid, true, 'the declared bank must match the 40 authored prompts');
const path = buildMagePath();
assert.equal(path.length, 20);
assert.equal(new Set(path).size, 20);
const selected = new Set(path);
for (const prompt of mageTwoHorizonsPrimaryFr.prompt_nodes.filter((node) => selected.has(node.prompt_id))) {
  assert.equal(prompt.prerequisites.every((id) => selected.has(id)), true, `${prompt.prompt_id} keeps every prerequisite in the run`);
}
assert.equal(mageTwoHorizonsPrimaryFr.prompt_nodes.filter((node) => node.mandatory).every((node) => selected.has(node.prompt_id)), true);
const impossibleManifest = structuredClone(mageTwoHorizonsPrimaryFr);
const validUnselectedPrerequisite = impossibleManifest.prompt_nodes.find((node) => !selected.has(node.prompt_id)).prompt_id;
impossibleManifest.prompt_nodes.find((node) => node.prompt_id === 'mage-p10-help-request').prerequisites = [validUnselectedPrerequisite];
assert.throws(() => buildMagePath(impossibleManifest), /MAGE_PATH_MISSING_PREREQUISITE/, 'authors receive an explicit error when the fixed path omits a prerequisite');
assert.notEqual(createGameRun({ seed: 'same-seed' }).run_id, createGameRun({ seed: 'same-seed' }).run_id, 'run identity is independent from deterministic content selection');

let state = createGameRun({ runId: 'game:test-mage', now: '2026-09-08T12:00:00.000Z' });
assert.equal(state.schema, GAME_RUN_SCHEMA);
assert.equal(state.active_prompt_id, path[0]);

function dispatch(type, payload = {}, id = `test:${type}:${state.revision}`) {
  const command = createGameCommand(state, type, payload, id);
  const result = applyGameCommand(state, command, { now: `2026-09-08T12:00:${String(state.revision).padStart(2, '0')}.000Z` });
  assert.equal(result.ok, true, result.error);
  state = result.state;
  return { command, result };
}

const activeBeforeHint = state.active_prompt_id;
dispatch('REQUEST_HINT', {}, 'test:hint');
assert.equal(state.active_prompt_id, activeBeforeHint, 'a hint keeps the assigned activity');
assert.equal(state.completed_prompt_ids.length, 0);

const rejected = applyGameCommand(state, createGameCommand(state, 'UPDATE_FORCE', { x: 200, y: 0, duration: 4 }, 'test:bad-force'));
assert.equal(rejected.ok, false);
assert.equal(rejected.state.active_prompt_id, activeBeforeHint, 'a correction keeps the assigned activity');
assert.equal(rejected.state.revision, state.revision);

const completion = dispatch('COMPLETE_ACTIVITY', {}, 'test:complete-first');
const duplicate = applyGameCommand(state, { ...completion.command, expected_revision: completion.command.expected_revision });
assert.equal(duplicate.ok, true);
assert.equal(duplicate.duplicate, true);
assert.equal(duplicate.state.story_points, state.story_points, 'a duplicate command cannot grant the reward twice');

// Reach the declared-choice activity and prove that it cannot be skipped.
assert.equal(state.active_prompt_id, 'mage-p02-first-vector');
const missingIntent = applyGameCommand(state, createGameCommand(state, 'COMPLETE_ACTIVITY', {}, 'test:missing-intent'));
assert.equal(missingIntent.ok, false);
dispatch('CHOOSE_INTENT', { choice: 'far-horizon' });
dispatch('COMPLETE_ACTIVITY');
assert.equal(state.active_prompt_id, 'mage-p13-character-sheet');
dispatch('COMPLETE_ACTIVITY');
assert.equal(state.active_prompt_id, 'mage-p03-build-force');
dispatch('UPDATE_FORCE', { x: 2, y: 3, duration: 6 });
dispatch('RUN_SIMULATION');
dispatch('COMPLETE_ACTIVITY');
assert.equal(state.active_prompt_id, 'mage-p04-run-path');
dispatch('RUN_SIMULATION');
dispatch('COMPLETE_ACTIVITY');
assert.equal(state.pending_upgrade, true);
assert.equal(state.active_index, 4, 'the next prompt waits until the player chooses an upgrade');
dispatch('CHOOSE_UPGRADE', { upgrade_id: 'focus-lens' });
assert.deepEqual(state.upgrades, ['focus-lens']);
assert.equal(state.inventory.some((item) => item.id === 'focus-lens'), true);

const projection = projectHeroSheet(state);
assert.equal(projection.run_id, state.run_id);
assert.equal(projection.mission.progress, 5);
assert.equal(projection.upgrades[0], 'focus-lens');
assert.equal(projection.raw_secret_stored, false);

const wrongRunReceipt = applyGameCommand(state, createGameCommand(state, 'ADMIT_EXTERNAL_EVIDENCE', { receipt: { run_id: 'other', prompt_assignment_id: state.active_prompt_id, authenticated: true, receipt_digest: 'sha256:a' } }));
assert.equal(wrongRunReceipt.ok, false);
assert.equal(wrongRunReceipt.error, 'receipt-run-mismatch');
const wrongPromptReceipt = applyGameCommand(state, createGameCommand(state, 'ADMIT_EXTERNAL_EVIDENCE', { receipt: { run_id: state.run_id, prompt_assignment_id: 'another-prompt', authenticated: true, receipt_digest: 'sha256:a' } }, 'test:wrong-prompt-receipt'));
assert.equal(wrongPromptReceipt.error, 'receipt-prompt-mismatch');
const unauthenticatedReceipt = applyGameCommand(state, createGameCommand(state, 'ADMIT_EXTERNAL_EVIDENCE', { receipt: { run_id: state.run_id, prompt_assignment_id: state.active_prompt_id, authenticated: false, receipt_digest: 'sha256:a' } }, 'test:unauthenticated-receipt'));
assert.equal(unauthenticatedReceipt.error, 'receipt-not-authenticated');

while (state.status === 'playing') {
  const prompt = mageTwoHorizonsPrimaryFr.prompt_nodes.find((candidate) => candidate.prompt_id === state.active_prompt_id);
  if (prompt.evidence_kind === 'transfer' && !state.comparison) {
    dispatch('UPDATE_FORCE', { x: state.force.x + 1, y: state.force.y, duration: state.force.duration });
    dispatch('RUN_SIMULATION');
    dispatch('COMPARE_SIMULATIONS');
  }
  if (prompt.evidence_kind === 'model-limit' && !state.choices.some((choice) => choice.kind === 'reflection' && choice.prompt_id === prompt.prompt_id)) {
    dispatch('RECORD_REFLECTION', { text: 'Ce modèle compare des trajectoires, mais il ne prouve pas le mouvement du ciel réel.' });
  }
  const beforePoints = state.story_points;
  const completed = dispatch('COMPLETE_ACTIVITY');
  assert(state.story_points > beforePoints);
  const repeated = applyGameCommand(state, { ...completed.command, expected_revision: completed.command.expected_revision });
  assert.equal(repeated.duplicate, true);
  assert.equal(repeated.state.story_points, state.story_points);
}
assert.equal(state.completed_prompt_ids.length, 20);
assert.equal(new Set(state.completed_prompt_ids).size, 20);
assert.equal(state.status, 'completed');
assert.equal(state.evidence.knowledge_tokens.length, 0, 'local play completion cannot invent an authenticated knowledge token');

console.log('Game engine contract: 40-bank, fixed 20-path, preserved retries, idempotence, simulation, branch, upgrade and projection passed.');
