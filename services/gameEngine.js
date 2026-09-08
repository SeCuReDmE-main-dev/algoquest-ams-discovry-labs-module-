import { mageTwoHorizonsPrimaryFr } from './heroBooks.js';

export const GAME_RUN_SCHEMA = 'securedme.education.algoquest.game-run-state.v1';
export const GAME_COMMAND_SCHEMA = 'securedme.education.algoquest.game-command.v1';
export const GAME_EVENT_SCHEMA = 'securedme.education.algoquest.game-event.v1';
export const HERO_SHEET_PROJECTION_SCHEMA = 'securedme.education.algoquest.hero-sheet-projection.v1';

const MAGE_OPTIONAL_SLOTS = Object.freeze([
  'mage-p10-help-request',
  'mage-p20-gravity-isolated',
  'mage-p22-calculation-fix',
  'mage-p26-steep-angle',
  'mage-p31-edge-glitch',
]);

export const MAGE_UPGRADES = Object.freeze([
  { id: 'focus-lens', label: 'Lentille de focalisation', description: 'Rend les comparaisons de trajectoires plus lisibles.', capability: 'comparison-focus' },
  { id: 'steady-hand', label: 'Main stable', description: 'Ajoute une charge de reprise sans pénalité.', capability: 'calm-retry' },
]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function stableNumber(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRunId() {
  if (globalThis.crypto?.randomUUID) return `game:${globalThis.crypto.randomUUID()}`;
  return `game:${Date.now().toString(36)}:${Math.random().toString(36).slice(2)}`;
}

function promptMap(manifest) {
  return new Map(manifest.prompt_nodes.map((prompt) => [prompt.prompt_id, prompt]));
}

export function validatePromptBank(manifest = mageTwoHorizonsPrimaryFr) {
  const errors = [];
  const prompts = promptMap(manifest);
  if (manifest.prompt_nodes.length !== 40) errors.push('prompt-bank-must-contain-40');
  if (Number(manifest.prompt_bank_size) !== manifest.prompt_nodes.length) errors.push('declared-bank-size-mismatch');
  for (const prompt of manifest.prompt_nodes) {
    for (const dependency of prompt.prerequisites || []) {
      if (!prompts.has(dependency)) errors.push(`unknown-prerequisite:${prompt.prompt_id}:${dependency}`);
    }
  }
  return { valid: errors.length === 0, errors };
}

export function buildMagePath(manifest = mageTwoHorizonsPrimaryFr) {
  const validation = validatePromptBank(manifest);
  if (!validation.valid) throw new Error(`INVALID_PROMPT_BANK:${validation.errors.join(',')}`);
  const mandatory = manifest.prompt_nodes.filter((prompt) => prompt.mandatory).map((prompt) => prompt.prompt_id);
  if (mandatory.length !== 15) throw new Error(`MAGE_PATH_REQUIRES_15_MANDATORY:${mandatory.length}`);
  const selected = new Set([...mandatory, ...MAGE_OPTIONAL_SLOTS]);
  if (selected.size !== 20) throw new Error('MAGE_PATH_REQUIRES_20_UNIQUE_PROMPTS');
  const prompts = promptMap(manifest);
  for (const promptId of selected) {
    const prompt = prompts.get(promptId);
    if (!prompt) throw new Error(`MAGE_PATH_UNKNOWN_PROMPT:${promptId}`);
    for (const dependency of prompt.prerequisites || []) {
      if (!selected.has(dependency)) throw new Error(`MAGE_PATH_MISSING_PREREQUISITE:${promptId}:${dependency}`);
    }
  }

  const authoredIndex = new Map(manifest.prompt_nodes.map((prompt, index) => [prompt.prompt_id, index]));
  const remaining = manifest.prompt_nodes.filter((prompt) => selected.has(prompt.prompt_id));
  const ordered = [];
  while (remaining.length) {
    const ready = remaining
      .filter((prompt) => (prompt.prerequisites || []).every((dependency) => ordered.includes(dependency)))
      .sort((left, right) => Number(left.act_id.replace('act-', '')) - Number(right.act_id.replace('act-', '')) || authoredIndex.get(left.prompt_id) - authoredIndex.get(right.prompt_id));
    if (!ready.length) throw new Error('MAGE_PATH_DEPENDENCY_CYCLE');
    const next = ready[0];
    ordered.push(next.prompt_id);
    remaining.splice(remaining.findIndex((prompt) => prompt.prompt_id === next.prompt_id), 1);
  }
  return ordered;
}

function initialResources() {
  return { insight: 0, resolve: 3, retry_charges: 0 };
}

function initialInventory() {
  return [{ id: 'paper-sky-map', label: 'Carte du ciel', state: 'equipped', description: 'Une carte artisanale des deux horizons.' }];
}

export function createGameRun(options = {}) {
  const manifest = options.manifest || mageTwoHorizonsPrimaryFr;
  const assignedPromptIds = buildMagePath(manifest);
  const runId = options.runId || createRunId();
  const seed = options.seed || 'seed:mage:first-proof';
  const firstPrompt = manifest.prompt_nodes.find((prompt) => prompt.prompt_id === assignedPromptIds[0]);
  return {
    schema: GAME_RUN_SCHEMA,
    revision: 1,
    run_id: runId,
    seed,
    content_version: manifest.version,
    hero_book_id: manifest.hero_book_id,
    adaptation_id: manifest.adaptation_id,
    audience_id: manifest.audience_id,
    locale: manifest.locale,
    canonical_state_owner: 'algoquest',
    status: 'playing',
    assigned_prompt_ids: assignedPromptIds,
    active_index: 0,
    active_prompt_id: firstPrompt.prompt_id,
    activity_status: 'assigned',
    completed_prompt_ids: [],
    branch_id: null,
    choices: [],
    resources: initialResources(),
    inventory: initialInventory(),
    talents: ['observation'],
    upgrades: [],
    pending_upgrade: false,
    force: { x: 2, y: 3, duration: 6 },
    simulations: [],
    comparison: null,
    assistance: { level: 'none', hints_used: 0, last_hint: null },
    evidence: { local_refs: [], authenticated_refs: [], knowledge_tokens: [] },
    story_points: 0,
    journal: [{ id: 'event:created', type: 'RUN_CREATED', prompt_id: firstPrompt.prompt_id, at: options.now || new Date().toISOString() }],
    processed_commands: {},
    last_error: null,
  };
}

function commandResult(state, command, events, duplicate = false) {
  return { ok: true, duplicate, state: clone(state), events: clone(events), request_id: command.command_id };
}

function reject(state, command, error, recoverable = true) {
  return { ok: false, duplicate: false, state: clone(state), events: [], request_id: command?.command_id || null, error, recoverable };
}

function appendEvent(state, type, payload, now) {
  const event = {
    schema: GAME_EVENT_SCHEMA,
    event_id: `event:${state.run_id}:${state.revision + 1}:${type.toLowerCase()}`,
    run_id: state.run_id,
    revision: state.revision + 1,
    type,
    prompt_id: state.active_prompt_id,
    payload: clone(payload || {}),
    at: now,
  };
  state.revision += 1;
  state.journal.push(event);
  return event;
}

function deterministicTrajectory(force, seed, attempt) {
  const jitter = ((stableNumber(`${seed}:${attempt}`) % 5) - 2) / 20;
  const points = [];
  for (let time = 0; time <= force.duration; time += 1) {
    points.push({
      t: time,
      x: Number((force.x * time).toFixed(3)),
      y: Number((force.y * time - (0.45 + jitter) * time * time).toFixed(3)),
    });
  }
  return points;
}

function activityRequirementsSatisfied(state, prompt) {
  if (!prompt) return { valid: false, reason: 'active-prompt-missing' };
  switch (prompt.evidence_kind) {
    case 'declared-choice':
      return state.branch_id ? { valid: true } : { valid: false, reason: 'choose-an-intention-first' };
    case 'algorithm-artifact':
    case 'execution-receipt':
      return state.simulations.length ? { valid: true } : { valid: false, reason: 'run-a-simulation-first' };
    case 'transfer':
      return state.comparison ? { valid: true } : { valid: false, reason: 'compare-two-simulations-first' };
    case 'model-limit':
      return state.choices.some((choice) => choice.kind === 'reflection' && choice.prompt_id === state.active_prompt_id)
        ? { valid: true }
        : { valid: false, reason: 'record-the-model-limit-first' };
    default:
      return { valid: true };
  }
}

function validateExternalEvidence(receipt, state) {
  if (!receipt || typeof receipt !== 'object') return 'receipt-missing';
  if (receipt.run_id !== state.run_id) return 'receipt-run-mismatch';
  if (receipt.prompt_assignment_id !== state.active_prompt_id) return 'receipt-prompt-mismatch';
  if (receipt.authenticated !== true) return 'receipt-not-authenticated';
  if (typeof receipt.receipt_digest !== 'string' || !receipt.receipt_digest.startsWith('sha256:')) return 'receipt-digest-missing';
  return null;
}

export function applyGameCommand(currentState, command, options = {}) {
  const manifest = options.manifest || mageTwoHorizonsPrimaryFr;
  if (!currentState || currentState.schema !== GAME_RUN_SCHEMA) return reject(currentState, command, 'invalid-game-state', false);
  if (!command || command.schema !== GAME_COMMAND_SCHEMA || !command.command_id || !command.type) return reject(currentState, command, 'invalid-command', false);
  if (command.run_id !== currentState.run_id) return reject(currentState, command, 'run-mismatch', false);
  const previous = currentState.processed_commands[command.command_id];
  if (previous) return { ...clone(previous), duplicate: true, state: clone(currentState) };
  if (command.expected_revision !== currentState.revision) return reject(currentState, command, 'stale-revision');
  if (currentState.status !== 'playing' && command.type !== 'REQUEST_SNAPSHOT') return reject(currentState, command, 'run-not-playing');

  const state = clone(currentState);
  const events = [];
  const now = options.now || new Date().toISOString();
  const payload = command.payload || {};
  const prompts = promptMap(manifest);
  const prompt = prompts.get(state.active_prompt_id);

  try {
    switch (command.type) {
      case 'REQUEST_SNAPSHOT':
        return commandResult(state, command, []);
      case 'CHOOSE_INTENT': {
        if (!['near-horizon', 'far-horizon'].includes(payload.choice)) throw new Error('invalid-intention');
        state.branch_id = payload.choice;
        state.choices.push({ kind: 'intent', prompt_id: state.active_prompt_id, value: payload.choice, at: now });
        events.push(appendEvent(state, 'INTENT_CHOSEN', { choice: payload.choice }, now));
        break;
      }
      case 'UPDATE_FORCE': {
        const force = { x: Number(payload.x), y: Number(payload.y), duration: Number(payload.duration) };
        if (![force.x, force.y, force.duration].every(Number.isFinite) || force.duration < 2 || force.duration > 20 || Math.abs(force.x) > 20 || Math.abs(force.y) > 20) throw new Error('invalid-force');
        state.force = force;
        state.activity_status = 'action-taken';
        events.push(appendEvent(state, 'FORCE_UPDATED', force, now));
        break;
      }
      case 'RUN_SIMULATION': {
        const attempt = state.simulations.length + 1;
        const simulation = {
          id: `simulation:${state.run_id}:${attempt}`,
          force: clone(state.force),
          points: deterministicTrajectory(state.force, state.seed, attempt),
          local_only: true,
        };
        state.simulations.push(simulation);
        state.activity_status = 'result-ready';
        state.evidence.local_refs.push(simulation.id);
        events.push(appendEvent(state, 'SIMULATION_COMPLETED', { simulation_id: simulation.id, force: simulation.force }, now));
        break;
      }
      case 'COMPARE_SIMULATIONS': {
        if (state.simulations.length < 2) throw new Error('two-simulations-required');
        const baseline = state.simulations[state.simulations.length - 2];
        const changed = state.simulations[state.simulations.length - 1];
        state.comparison = {
          baseline_id: baseline.id,
          changed_id: changed.id,
          final_delta: {
            x: Number((changed.points.at(-1).x - baseline.points.at(-1).x).toFixed(3)),
            y: Number((changed.points.at(-1).y - baseline.points.at(-1).y).toFixed(3)),
          },
        };
        state.activity_status = 'result-ready';
        events.push(appendEvent(state, 'SIMULATIONS_COMPARED', state.comparison, now));
        break;
      }
      case 'RECORD_REFLECTION': {
        const text = String(payload.text || '').trim();
        if (text.length < 12 || text.length > 600) throw new Error('reflection-length-invalid');
        state.choices.push({ kind: 'reflection', prompt_id: state.active_prompt_id, value: text, at: now });
        state.activity_status = 'action-taken';
        events.push(appendEvent(state, 'REFLECTION_RECORDED', { length: text.length }, now));
        break;
      }
      case 'REQUEST_HINT': {
        const hints = [
          'Observe une seule différence à la fois; ton activité reste la même.',
          'Essaie une deuxième trajectoire en changeant seulement la force horizontale.',
          'Décris ce que le modèle montre, puis ce qu’il ne peut pas prouver.',
        ];
        const hint = hints[Math.min(state.assistance.hints_used, hints.length - 1)];
        state.assistance = { level: 'hint', hints_used: state.assistance.hints_used + 1, last_hint: hint };
        events.push(appendEvent(state, 'HINT_REQUESTED', { hint, prompt_preserved: state.active_prompt_id }, now));
        break;
      }
      case 'ADMIT_EXTERNAL_EVIDENCE': {
        const evidenceError = validateExternalEvidence(payload.receipt, state);
        if (evidenceError) throw new Error(evidenceError);
        if (!state.evidence.authenticated_refs.includes(payload.receipt.receipt_digest)) state.evidence.authenticated_refs.push(payload.receipt.receipt_digest);
        events.push(appendEvent(state, 'EXTERNAL_EVIDENCE_ADMITTED', { receipt_digest: payload.receipt.receipt_digest }, now));
        break;
      }
      case 'COMPLETE_ACTIVITY': {
        if (state.pending_upgrade) throw new Error('choose-upgrade-before-continuing');
        const requirement = activityRequirementsSatisfied(state, prompt);
        if (!requirement.valid) throw new Error(requirement.reason);
        if (state.completed_prompt_ids.includes(state.active_prompt_id)) throw new Error('activity-already-completed');
        state.completed_prompt_ids.push(state.active_prompt_id);
        state.story_points += prompt?.node_type === 'MilestoneNode' ? 3 : 1;
        state.resources.insight += 1;
        events.push(appendEvent(state, 'ACTIVITY_COMPLETED', { prompt_id: state.active_prompt_id, story_points: state.story_points }, now));
        if (state.completed_prompt_ids.length === 5 && state.upgrades.length === 0) {
          state.pending_upgrade = true;
          state.activity_status = 'upgrade-choice';
          events.push(appendEvent(state, 'UPGRADE_OFFERED', { options: MAGE_UPGRADES.map((upgrade) => upgrade.id) }, now));
        } else if (state.completed_prompt_ids.length === state.assigned_prompt_ids.length) {
          state.status = 'completed';
          state.activity_status = 'completed';
          events.push(appendEvent(state, 'RUN_COMPLETED', { completed: state.completed_prompt_ids.length }, now));
        } else {
          state.active_index += 1;
          state.active_prompt_id = state.assigned_prompt_ids[state.active_index];
          state.activity_status = 'assigned';
          state.assistance = { level: 'none', hints_used: 0, last_hint: null };
          events.push(appendEvent(state, 'ACTIVITY_ASSIGNED', { prompt_id: state.active_prompt_id }, now));
        }
        break;
      }
      case 'CHOOSE_UPGRADE': {
        if (!state.pending_upgrade) throw new Error('no-upgrade-pending');
        const upgrade = MAGE_UPGRADES.find((candidate) => candidate.id === payload.upgrade_id);
        if (!upgrade) throw new Error('unknown-upgrade');
        if (!state.upgrades.includes(upgrade.id)) state.upgrades.push(upgrade.id);
        if (!state.talents.includes(upgrade.capability)) state.talents.push(upgrade.capability);
        if (upgrade.id === 'steady-hand') state.resources.retry_charges += 1;
        if (upgrade.id === 'focus-lens') state.inventory.push({ id: 'focus-lens', label: upgrade.label, state: 'equipped', description: upgrade.description });
        state.pending_upgrade = false;
        state.active_index += 1;
        state.active_prompt_id = state.assigned_prompt_ids[state.active_index];
        state.activity_status = 'assigned';
        events.push(appendEvent(state, 'UPGRADE_CHOSEN', { upgrade_id: upgrade.id, next_prompt_id: state.active_prompt_id }, now));
        break;
      }
      default:
        throw new Error('unknown-command');
    }
  } catch (error) {
    return reject(currentState, command, error instanceof Error ? error.message : 'command-failed');
  }

  const result = commandResult(state, command, events);
  state.processed_commands[command.command_id] = { ok: true, duplicate: false, events: clone(events), request_id: command.command_id };
  result.state = clone(state);
  return result;
}

export function createGameCommand(state, type, payload = {}, commandId) {
  return {
    schema: GAME_COMMAND_SCHEMA,
    command_id: commandId || `command:${state.run_id}:${state.revision}:${type.toLowerCase()}`,
    run_id: state.run_id,
    expected_revision: state.revision,
    type,
    payload: clone(payload),
  };
}

export function projectHeroSheet(state, manifest = mageTwoHorizonsPrimaryFr) {
  const prompt = manifest.prompt_nodes.find((candidate) => candidate.prompt_id === state.active_prompt_id);
  return {
    schema: HERO_SHEET_PROJECTION_SCHEMA,
    revision: state.revision,
    run_id: state.run_id,
    canonical_state_owner: 'algoquest',
    connection: 'connected',
    hero: { role: 'Mage des Deux Horizons', level: 1 + state.upgrades.length, branch: state.branch_id },
    mission: {
      title: prompt?.title || 'Aventure terminée',
      objective: prompt?.prompt_text || 'Le premier horizon est atteint.',
      status: state.activity_status,
      progress: state.completed_prompt_ids.length,
      total: state.assigned_prompt_ids.length,
    },
    resources: clone(state.resources),
    inventory: clone(state.inventory),
    talents: clone(state.talents),
    upgrades: clone(state.upgrades),
    pending_upgrade: state.pending_upgrade,
    upgrade_options: state.pending_upgrade ? clone(MAGE_UPGRADES) : [],
    force: clone(state.force),
    simulations: clone(state.simulations.slice(-2)),
    comparison: clone(state.comparison),
    assistance: clone(state.assistance),
    story_points: state.story_points,
    evidence: {
      local_count: state.evidence.local_refs.length,
      authenticated_count: state.evidence.authenticated_refs.length,
      knowledge_tokens: clone(state.evidence.knowledge_tokens),
    },
    actions: ['CHOOSE_INTENT', 'UPDATE_FORCE', 'RUN_SIMULATION', 'COMPARE_SIMULATIONS', 'RECORD_REFLECTION', 'REQUEST_HINT', 'COMPLETE_ACTIVITY', 'CHOOSE_UPGRADE'],
    recent_events: clone(state.journal.slice(-8)),
    raw_secret_stored: false,
    contains_identity: false,
  };
}

export function replayGameRun(initialState, commands, options = {}) {
  let state = clone(initialState);
  const results = [];
  for (const command of commands) {
    const normalized = { ...clone(command), expected_revision: state.revision };
    const result = applyGameCommand(state, normalized, options);
    results.push(result);
    if (!result.ok) return { ok: false, state, results, error: result.error };
    state = result.state;
  }
  return { ok: true, state, results };
}
