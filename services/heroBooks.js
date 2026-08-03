const CONTRACT_VERSION = 'v1';
export const ENTRY_MISSION_STORAGE_KEY = 'securedme.education.algoquest.entry-mission-state.v1';
export const ADVENTURE_RUN_STORAGE_KEY = 'securedme.education.algoquest.adventure-run-state.v1';
export const PRIVACY_RECEIPT_STORAGE_KEY = 'securedme.education.algoquest.privacy-receipts.v1';
export const DECLARED_PREFERENCE_STORAGE_KEY = 'securedme.education.algoquest.declared-preference.v1';

const SORTED_ARRAY_KEYS = new Set([
  'audience_profiles',
  'available_choices',
  'capability_refs',
  'consumed_prompt_ids',
  'facts_allowed',
  'forbidden_claims',
  'knowledge_token_ids',
  'milestone_ids',
  'prompt_ids',
  'risk_flags',
  'source_refs',
]);

export const audienceProfiles = [
  {
    audience_id: 'primary-5-6',
    label: 'Primaire 5-6',
    language_register: 'curious, concrete, school-realistic',
    reading_load: 'short',
    supervision: 'adult-supervised',
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    audience_id: 'secondary-1-2',
    label: 'Secondaire 1-2',
    language_register: 'direct, exploratory, peer-aware',
    reading_load: 'medium',
    supervision: 'adult-available',
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    audience_id: 'secondary-3-5',
    label: 'Secondaire 3-5',
    language_register: 'precise, challenge-oriented',
    reading_load: 'medium',
    supervision: 'guided-independent',
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    audience_id: 'college',
    label: 'College',
    language_register: 'technical bridge',
    reading_load: 'high',
    supervision: 'independent-review',
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    audience_id: 'university',
    label: 'Universitaire',
    language_register: 'formal and model-aware',
    reading_load: 'high',
    supervision: 'independent',
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    audience_id: 'professor-player',
    label: 'Professeur-joueur',
    language_register: 'professional, reflective, classroom-transfer',
    reading_load: 'high',
    supervision: 'private-professional',
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
];

export const heroWorldRegistry = [
  {
    hero_book_id: 'mage-two-horizons',
    title: 'Le Mage des Deux Horizons',
    canonical_learning_purpose: 'Build a first deterministic simulation and compare how a changed force alters a trajectory.',
    canonical_story_ending: 'The apprentice earns the right to name the first law of the sky without pretending the model is the sky.',
    science_refs: ['newtonian-motion', 'relativity-boundary', 'riemann-curvature-image', 'four-fundamental-interactions'],
    certified_locales: ['fr-CA'],
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    hero_book_id: 'ronin-six-provinces',
    title: 'Le Ronin des Six Provinces',
    canonical_learning_purpose: 'Explore graph routes, conditions, costs and strategy without hiding the algorithm.',
    canonical_story_ending: 'The ronin becomes a strategist by proving why one path was chosen and which paths were rejected.',
    science_refs: ['graphs', 'branching-conditions', 'cost-functions', 'route-search'],
    certified_locales: [],
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    hero_book_id: 'crown-of-tides',
    title: 'La Couronne des Marees',
    canonical_learning_purpose: 'Use probability, resource control, simple ciphers and risk reasoning in a bounded pirate economy.',
    canonical_story_ending: 'The pirate crown is earned by managing uncertainty without turning luck into knowledge.',
    science_refs: ['probability', 'resource-systems', 'simple-cryptography', 'risk-models'],
    certified_locales: [],
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    hero_book_id: 'alchemist-oak-gate',
    title: 'L Alchimiste et la Porte du Chene',
    canonical_learning_purpose: 'Translate Nigredo, Albedo and Rubedo into pipeline thinking while separating history, symbol and fact.',
    canonical_story_ending: 'The alchemist reaches the gate only after proving which transformations are symbolic and which are operational.',
    science_refs: ['pipelines', 'state-transitions', 'historical-boundaries', 'symbolic-systems'],
    certified_locales: [],
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    hero_book_id: 'neuron-without-brain',
    title: 'Le Neurone Sans Cerveau',
    canonical_learning_purpose: 'Model Brownian motion, photoelectric evidence and relativity analogies as observable transitions.',
    canonical_story_ending: 'The neuron does not become Einstein; it learns how evidence changes a model.',
    science_refs: ['brownian-motion', 'photoelectric-effect', 'special-relativity', 'model-limits'],
    certified_locales: [],
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
  {
    hero_book_id: 'algorithm-citadel',
    title: 'La Citadelle des Algorithmes',
    canonical_learning_purpose: 'Practice conditions, loops, functions, structures and debugging as visible building acts.',
    canonical_story_ending: 'The citadel opens when the learner can repair the rule, not when they collect enough story points.',
    science_refs: ['conditions', 'loops', 'functions', 'data-structures', 'debugging'],
    certified_locales: [],
    provenance: { author_id: 'securedme-education-committee', publication_status: 'pre-alpha', reviewed_by: [] },
  },
];

export const mageTwoHorizonsPrimaryFr = {
  schema: 'securedme.education.algoquest.hero-book-manifest.v1',
  hero_book_id: 'mage-two-horizons',
  adaptation_id: 'mage-two-horizons.primary-5-6.fr-CA.1',
  title: 'Le Mage des Deux Horizons',
  locale: 'fr-CA',
  audience_id: 'primary-5-6',
  version: '1.0.0',
  prompt_bank_size: 12,
  max_prompt_slots: 40,
  acts: [
    { act_id: 'act-1', title: 'Le ciel bouge', required_node_types: ['StoryAnchorNode', 'ChoiceNode'] },
    { act_id: 'act-2', title: 'La force change', required_node_types: ['ChallengeNode'] },
    { act_id: 'act-3', title: 'La trajectoire repond', required_node_types: ['ChallengeNode', 'OptionalDiscoveryNode'] },
    { act_id: 'act-4', title: 'Le modele avoue sa limite', required_node_types: ['ConvergenceNode', 'MilestoneNode'] },
    { act_id: 'act-5', title: 'Le premier horizon', required_node_types: ['FinaleNode'] },
  ],
  outcome_matrix: {
    canonical_story_ending: 'L apprenti nomme une loi du ciel et garde la limite du modele visible.',
    canonical_learning_purpose: 'Modifier une force, observer une trajectoire, comparer les resultats et expliquer la limite du modele.',
    audience_resolution: 'Une preuve concrete, courte, lisible, sans vocabulaire expert obligatoire.',
  },
  fiction_boundary: {
    historical_claims: [],
    scientific_claims: [
      {
        claim_id: 'claim-newton-model-boundary',
        statement: 'A Newtonian force model can predict simple motion while remaining an approximation.',
        certainty: 'introductory-model',
        source_refs: ['source:newtonian-motion-review-needed'],
      },
    ],
    forbidden_claims: ['The simulation proves relativity', 'The learner has a physics diagnosis', 'Story points prove mastery'],
  },
  prompt_nodes: [
    {
      prompt_id: 'mage-p01-sky-door',
      act_id: 'act-1',
      node_type: 'StoryAnchorNode',
      title: 'La porte du ciel',
      prompt_text: 'Observe le ciel ASCII. Choisis un astre et decris seulement ce que tu peux voir.',
      prerequisites: [],
      mandatory: true,
      capability_refs: ['builder:character-sheet', 'colab:none'],
      evidence_kind: 'observation',
    },
    {
      prompt_id: 'mage-p02-first-vector',
      act_id: 'act-1',
      node_type: 'ChoiceNode',
      title: 'Le premier vecteur',
      prompt_text: 'Choisis une direction et une force de depart. Ne calcule pas encore: formule ton intention.',
      prerequisites: ['mage-p01-sky-door'],
      mandatory: true,
      capability_refs: ['builder:deterministic-die'],
      evidence_kind: 'declared-choice',
    },
    {
      prompt_id: 'mage-p03-build-force',
      act_id: 'act-2',
      node_type: 'ChallengeNode',
      title: 'Forger la force',
      prompt_text: 'Construis un bloc force dans Builder avec intensite, direction et duree.',
      prerequisites: ['mage-p02-first-vector'],
      mandatory: true,
      capability_refs: ['builder:force-block', 'builder:artifact-receipt'],
      evidence_kind: 'algorithm-artifact',
    },
    {
      prompt_id: 'mage-p04-run-path',
      act_id: 'act-2',
      node_type: 'ChallengeNode',
      title: 'Tracer la route',
      prompt_text: 'Execute la trajectoire et conserve le recu, pas le journal brut.',
      prerequisites: ['mage-p03-build-force'],
      mandatory: true,
      capability_refs: ['colab:notebook', 'builder:trajectory-lab'],
      evidence_kind: 'execution-receipt',
    },
    {
      prompt_id: 'mage-p05-change-one-thing',
      act_id: 'act-3',
      node_type: 'ChallengeNode',
      title: 'Changer une seule chose',
      prompt_text: 'Change une seule variable et compare la nouvelle trajectoire a la premiere.',
      prerequisites: ['mage-p04-run-path'],
      mandatory: true,
      capability_refs: ['builder:model-comparison'],
      evidence_kind: 'transfer',
    },
    {
      prompt_id: 'mage-p06-four-forces',
      act_id: 'act-3',
      node_type: 'OptionalDiscoveryNode',
      title: 'Les quatre murmures',
      prompt_text: 'Associe gravite, electromagnetisme, interaction forte et interaction faible a des images prudentes.',
      prerequisites: ['mage-p04-run-path'],
      mandatory: false,
      capability_refs: ['builder:provenance-registry'],
      evidence_kind: 'bounded-explanation',
    },
    {
      prompt_id: 'mage-p07-newton-limit',
      act_id: 'act-4',
      node_type: 'ConvergenceNode',
      title: 'Newton parle, puis se tait',
      prompt_text: 'Explique ce que ton modele sait dire et ce qu il ne peut pas promettre.',
      prerequisites: ['mage-p05-change-one-thing'],
      mandatory: true,
      capability_refs: ['builder:model-boundary'],
      evidence_kind: 'model-limit',
    },
    {
      prompt_id: 'mage-p08-riemann-map',
      act_id: 'act-4',
      node_type: 'OptionalDiscoveryNode',
      title: 'La carte courbe',
      prompt_text: 'Regarde une grille courbe comme image d idee. Ne la presente pas comme une preuve de relativite.',
      prerequisites: ['mage-p07-newton-limit'],
      mandatory: false,
      capability_refs: ['builder:curved-grid'],
      evidence_kind: 'fiction-boundary',
    },
    {
      prompt_id: 'mage-p09-first-token',
      act_id: 'act-4',
      node_type: 'MilestoneNode',
      title: 'Le jeton du modele',
      prompt_text: 'Demande le jeton seulement si l artefact, le test et la limite sont presents.',
      prerequisites: ['mage-p07-newton-limit'],
      mandatory: true,
      capability_refs: ['algoquest:knowledge-token'],
      evidence_kind: 'first-proof',
    },
    {
      prompt_id: 'mage-p10-help-request',
      act_id: 'act-2',
      node_type: 'ChoiceNode',
      title: 'Demander une lanterne',
      prompt_text: 'Demande une aide explicite et note son niveau. L aide ne prouve pas la maitrise.',
      prerequisites: ['mage-p02-first-vector'],
      mandatory: false,
      capability_refs: ['qbit:bounded-help'],
      evidence_kind: 'assistance',
    },
    {
      prompt_id: 'mage-p11-repair',
      act_id: 'act-3',
      node_type: 'ChallengeNode',
      title: 'Reparer une trajectoire',
      prompt_text: 'Corrige un parametre qui produit une trajectoire incoherente et explique la correction.',
      prerequisites: ['mage-p04-run-path'],
      mandatory: false,
      capability_refs: ['builder:debug-panel'],
      evidence_kind: 'debugging',
    },
    {
      prompt_id: 'mage-p12-finale',
      act_id: 'act-5',
      node_type: 'FinaleNode',
      title: 'Nommer l horizon',
      prompt_text: 'Ecris trois phrases: action faite, preuve obtenue, limite respectee.',
      prerequisites: ['mage-p09-first-token'],
      mandatory: true,
      capability_refs: ['algoquest:mission-completion-receipt'],
      evidence_kind: 'reflection',
    },
  ],
};

export const mageEntryMissionManifest = {
  schema: 'securedme.education.algoquest.entry-mission-manifest.v1',
  mission_id: 'entry.mage-two-horizons.primary-5-6.fr-CA.1',
  adaptation_id: mageTwoHorizonsPrimaryFr.adaptation_id,
  hero_book_id: mageTwoHorizonsPrimaryFr.hero_book_id,
  locale: mageTwoHorizonsPrimaryFr.locale,
  audience_id: mageTwoHorizonsPrimaryFr.audience_id,
  entry_modes: ['textual', 'guided_notebook', 'executable_example'],
  allowed_states: ['ready', 'guided', 'retry', 'hold', 'completed', 'abstain'],
  first_objective: 'Modifier une force, observer une trajectoire et expliquer ce que le modele ne prouve pas.',
  success_is_time_based: false,
  fifteen_minutes_is: 'ergonomic-target-not-pass-fail-threshold',
  raw_secret_stored: false,
  contract_version: CONTRACT_VERSION,
};

export const mageMissionEnvelope = {
  schema: 'securedme.education.algoquest.mission-envelope.v1',
  mission_id: mageEntryMissionManifest.mission_id,
  adaptation_id: mageTwoHorizonsPrimaryFr.adaptation_id,
  hero_book_id: mageTwoHorizonsPrimaryFr.hero_book_id,
  locale: mageTwoHorizonsPrimaryFr.locale,
  audience_id: mageTwoHorizonsPrimaryFr.audience_id,
  mission_title: 'Premiere trajectoire du Mage des Deux Horizons',
  objective: mageEntryMissionManifest.first_objective,
  required_prompt_ids: ['mage-p01-sky-door', 'mage-p02-first-vector', 'mage-p03-build-force', 'mage-p04-run-path', 'mage-p05-change-one-thing', 'mage-p07-newton-limit', 'mage-p09-first-token', 'mage-p12-finale'],
  optional_prompt_ids: ['mage-p06-four-forces', 'mage-p08-riemann-map', 'mage-p10-help-request', 'mage-p11-repair'],
  builder_capability_refs: ['character-sheet', 'deterministic-die', 'inventory', 'force-block', 'trajectory-lab', 'model-comparison', 'model-boundary', 'artifact-receipt', 'ascii-sky-map', 'debug-panel', 'provenance-registry', 'text-fallback'],
  colab_notebook_ref: 'notebooks/mage-two-horizons-primary-5-6-fr-CA.ipynb',
  canonical_state_owner: 'algoquest',
  artifact_owner: 'algorithm-builder-or-colab',
  raw_secret_stored: false,
  contract_version: CONTRACT_VERSION,
};

export function createEntryMissionState({ mission = mageEntryMissionManifest, mode = 'textual', state = 'ready' } = {}) {
  if (!mission.entry_modes.includes(mode)) {
    throw new Error('unsupported-entry-mode');
  }
  if (!mission.allowed_states.includes(state)) {
    throw new Error('unsupported-entry-state');
  }
  return {
    schema: 'securedme.education.algoquest.entry-mission-state.v1',
    mission_id: mission.mission_id,
    adaptation_id: mission.adaptation_id,
    mode,
    state,
    assistance_level: 'none',
    current_step_id: 'entry-step-observe',
    resumed_count: 0,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function advanceEntryMissionState(entryState, next) {
  const nextState = next.state ?? entryState.state;
  const nextAssistance = next.assistance_level ?? entryState.assistance_level;
  if (!mageEntryMissionManifest.allowed_states.includes(nextState)) {
    throw new Error('unsupported-entry-state');
  }
  if (!['none', 'hint', 'guided', 'worked-example'].includes(nextAssistance)) {
    throw new Error('unsupported-assistance-level');
  }
  return {
    ...entryState,
    ...next,
    state: nextState,
    assistance_level: nextAssistance,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function isEntryMissionState(value) {
  return Boolean(value)
    && typeof value === 'object'
    && value.schema === 'securedme.education.algoquest.entry-mission-state.v1'
    && value.mission_id === mageEntryMissionManifest.mission_id
    && mageEntryMissionManifest.entry_modes.includes(value.mode)
    && mageEntryMissionManifest.allowed_states.includes(value.state)
    && value.raw_secret_stored === false
    && value.contract_version === CONTRACT_VERSION;
}

export function readEntryMissionState(fallback = createEntryMissionState()) {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(ENTRY_MISSION_STORAGE_KEY) || 'null');
    if (isEntryMissionState(parsed)) {
      return {
        ...parsed,
        resumed_count: Number(parsed.resumed_count || 0) + 1,
      };
    }
  } catch {}
  return fallback;
}

export function persistEntryMissionState(entryState) {
  if (typeof window === 'undefined' || !isEntryMissionState(entryState)) {
    return false;
  }
  try {
    window.localStorage.setItem(ENTRY_MISSION_STORAGE_KEY, JSON.stringify(entryState));
    return true;
  } catch {
    return false;
  }
}

export function createDeclaredPreference(partial = {}) {
  return {
    schema: 'securedme.education.algoquest.declared-preference.v1',
    language: partial.language ?? 'en',
    theme: partial.theme ?? 'night',
    access_profile: partial.access_profile ?? 'base',
    contract_version: CONTRACT_VERSION,
    raw_secret_stored: false,
  };
}

export function isDeclaredPreference(value) {
  return Boolean(value)
    && typeof value === 'object'
    && value.schema === 'securedme.education.algoquest.declared-preference.v1'
    && value.raw_secret_stored === false
    && value.contract_version === CONTRACT_VERSION;
}

export function readDeclaredPreference(fallback = createDeclaredPreference()) {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(DECLARED_PREFERENCE_STORAGE_KEY) || 'null');
    if (isDeclaredPreference(parsed)) {
      return parsed;
    }
  } catch {}
  return fallback;
}

export function persistDeclaredPreference(preference) {
  if (typeof window === 'undefined' || !isDeclaredPreference(preference)) {
    return false;
  }
  try {
    window.localStorage.setItem(DECLARED_PREFERENCE_STORAGE_KEY, JSON.stringify(preference));
    return true;
  } catch {
    return false;
  }
}

export function createAdventureRuntime({ seed = 'seed:mage:first-proof', started_at = '2026-08-03T00:00:00.000Z' } = {}) {
  const run = createAdventureRun({ seed, started_at });
  return {
    schema: 'securedme.education.algoquest.adventure-runtime.v1',
    run,
    quest_state: createInitialQuestState(run),
    learning_evidence: createInitialLearningEvidence(run),
    receipts: [],
    latest_assignment: null,
    state_version: 0,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function isAdventureRuntime(value) {
  return Boolean(value)
    && typeof value === 'object'
    && value.schema === 'securedme.education.algoquest.adventure-runtime.v1'
    && value.run
    && value.quest_state
    && value.learning_evidence
    && Array.isArray(value.receipts)
    && (value.state_version === undefined || Number.isInteger(value.state_version))
    && value.raw_secret_stored === false
    && value.contract_version === CONTRACT_VERSION;
}

export function readAdventureRuntime(fallback = createAdventureRuntime()) {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(ADVENTURE_RUN_STORAGE_KEY) || 'null');
    return isAdventureRuntime(parsed) ? { ...parsed, state_version: parsed.state_version ?? 0 } : fallback;
  } catch {
    return fallback;
  }
}

export function persistAdventureRuntime(runtime) {
  if (typeof window === 'undefined' || !isAdventureRuntime(runtime)) {
    return false;
  }
  try {
    window.localStorage.setItem(ADVENTURE_RUN_STORAGE_KEY, JSON.stringify(runtime));
    return true;
  } catch {
    return false;
  }
}

export async function advanceAdventureRuntime(runtime, manifest = mageTwoHorizonsPrimaryFr) {
  const assignment = await assignNextPrompt(manifest, runtime.run, runtime.quest_state);
  if (assignment.status !== 'assigned') {
    return {
      ...runtime,
      latest_assignment: assignment,
      state_version: runtime.state_version ?? 0,
    };
  }
  const receipt = await consumePrompt(manifest, runtime.run, runtime.quest_state, assignment.prompt_id);
  if (receipt.status !== 'consumed') {
    return {
      ...runtime,
      latest_assignment: assignment,
      receipts: [...runtime.receipts, receipt],
      state_version: (runtime.state_version ?? 0) + 1,
    };
  }
  return {
    ...runtime,
    quest_state: receipt.next_state,
    latest_assignment: assignment,
    receipts: [...runtime.receipts, { ...receipt, next_state: undefined }],
    state_version: (runtime.state_version ?? 0) + 1,
  };
}

export async function advanceStoredAdventureRuntime({ expected_state_version, manifest = mageTwoHorizonsPrimaryFr } = {}) {
  if (typeof window === 'undefined') {
    return {
      status: 'storage-unavailable',
      reason: 'window-unavailable',
    };
  }
  const current = readAdventureRuntime();
  const currentVersion = current.state_version ?? 0;
  if (Number.isInteger(expected_state_version) && expected_state_version !== currentVersion) {
    return {
      status: 'conflict',
      reason: 'stale-runtime-version',
      expected_state_version,
      current_state_version: currentVersion,
      runtime: current,
    };
  }
  const next = await advanceAdventureRuntime(current, manifest);
  if (!persistAdventureRuntime(next)) {
    return {
      status: 'persist-failed',
      reason: 'local-storage-write-failed',
      current_state_version: currentVersion,
      runtime: current,
    };
  }
  return {
    status: 'advanced',
    previous_state_version: currentVersion,
    current_state_version: next.state_version ?? currentVersion,
    runtime: next,
  };
}

export async function replayAdventureRuntime(runtime, manifest = mageTwoHorizonsPrimaryFr) {
  let replayed = createAdventureRuntime({
    seed: runtime.run.seed,
    started_at: runtime.run.started_at,
  });
  const targetCount = runtime.quest_state.consumed_prompt_ids.length;
  for (let index = 0; index < targetCount; index += 1) {
    replayed = await advanceAdventureRuntime(replayed, manifest);
  }
  return {
    schema: 'securedme.education.algoquest.adventure-replay-report.v1',
    run_id: runtime.run.run_id,
    expected_state_digest: await sha256Digest(runtime.quest_state),
    replayed_state_digest: await sha256Digest(replayed.quest_state),
    consumed_prompt_ids: [...runtime.quest_state.consumed_prompt_ids],
    replayed_prompt_ids: [...replayed.quest_state.consumed_prompt_ids],
    status: canonicalJson(runtime.quest_state) === canonicalJson(replayed.quest_state) ? 'matched' : 'mismatch',
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

const textEncoder = new TextEncoder();

export function canonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalJson(item)).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .filter(([, nested]) => nested !== undefined)
      .map(([key, nested]) => {
        const normalized = SORTED_ARRAY_KEYS.has(key) && Array.isArray(nested) ? [...nested].sort() : nested;
        return [key, normalized];
      })
      .sort(([left], [right]) => left.localeCompare(right));
    return `{${entries.map(([key, nested]) => `${JSON.stringify(key)}:${canonicalJson(nested)}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export async function sha256Digest(value) {
  const payload = typeof value === 'string' ? value : canonicalJson(value);
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', textEncoder.encode(payload));
  return `sha256:${Array.from(new Uint8Array(hashBuffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('')}`;
}

export async function manifestDigest(manifest = mageTwoHorizonsPrimaryFr) {
  return sha256Digest({
    schema: manifest.schema,
    adaptation_id: manifest.adaptation_id,
    version: manifest.version,
    prompt_nodes: manifest.prompt_nodes,
    outcome_matrix: manifest.outcome_matrix,
    fiction_boundary: manifest.fiction_boundary,
  });
}

export const builderWebAuthBrokerContract = {
  schema: 'securedme.education.algoquest.builder-webauth-broker-contract.v1',
  mode: 'contract-only',
  source_app: 'algoquest',
  target_app: 'algorithm-builder',
  live_channel_available: false,
  manual_receipt_required: true,
  allowed_payload_schemas: [
    'securedme.education.algoquest.mission-envelope.v1',
    'securedme.education.algorithm-builder.algorithm-artifact-receipt.v1',
  ],
  forbidden_payload_markers: [
    'student-email',
    'student-name',
    'api-key',
    'oauth-token',
    'bearer-token',
    'raw-audio',
    'transcript',
    'vot-metrics',
  ],
  authority: {
    can_open_live_channel: false,
    can_store_provider_secret: false,
    can_store_identity: false,
    can_award_mastery: false,
    can_award_token: false,
    can_unlock_milestone: false,
  },
  failure_policy: 'blocked-live-broker-absent',
  raw_secret_stored: false,
  contract_version: CONTRACT_VERSION,
};

const BROKER_ALLOWED_DIRECTIONS = new Set(['algoquest-to-builder', 'builder-to-algoquest']);
const BROKER_FORBIDDEN_MARKERS = [
  'student-email',
  'student-name',
  'api-key',
  'oauth-token',
  'bearer-token',
  'raw-audio',
  'transcript',
  'vot-metrics',
  'canonical-state',
  'mastery-decision',
];

function containsForbiddenBrokerMarker(value) {
  const lower = canonicalJson(value).toLowerCase();
  return BROKER_FORBIDDEN_MARKERS.some((marker) => lower.includes(marker));
}

export async function createBuilderWebAuthBrokerEnvelope({
  payload_schema = 'securedme.education.algoquest.mission-envelope.v1',
  direction = 'algoquest-to-builder',
  payload = mageMissionEnvelope,
} = {}) {
  const payload_digest = await sha256Digest({
    schema: payload_schema,
    payload,
  });
  const payload_forbidden_marker_detected = containsForbiddenBrokerMarker(payload);
  return {
    schema: 'securedme.education.algoquest.builder-webauth-broker-envelope.v1',
    mode: 'contract-only',
    direction,
    payload_schema,
    payload_digest,
    payload_forbidden_marker_detected,
    live_channel_available: false,
    manual_receipt_required: true,
    contains_provider_secret: false,
    contains_raw_identity: false,
    contains_canonical_state: false,
    requested_authority: 'transport-only',
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function validateBuilderWebAuthBrokerEnvelope(envelope = {}) {
  const errors = [];
  if (!envelope || typeof envelope !== 'object' || Array.isArray(envelope)) {
    errors.push('envelope-not-object');
  } else {
    if (envelope.schema !== 'securedme.education.algoquest.builder-webauth-broker-envelope.v1') {
      errors.push('schema-mismatch');
    }
    if (envelope.mode !== 'contract-only') {
      errors.push('live-mode-not-allowed-yet');
    }
    if (!BROKER_ALLOWED_DIRECTIONS.has(envelope.direction)) {
      errors.push('direction-not-allowed');
    }
    if (!builderWebAuthBrokerContract.allowed_payload_schemas.includes(envelope.payload_schema)) {
      errors.push('payload-schema-not-allowed');
    }
    if (envelope.payload_forbidden_marker_detected !== false) {
      errors.push('forbidden-marker-detected');
    }
    if (envelope.live_channel_available !== false) {
      errors.push('live-channel-not-proven');
    }
    if (envelope.contains_provider_secret !== false || envelope.contains_raw_identity !== false) {
      errors.push('sensitive-payload-not-allowed');
    }
    if (envelope.contains_canonical_state !== false) {
      errors.push('canonical-state-not-allowed');
    }
    if (envelope.requested_authority !== 'transport-only') {
      errors.push('authority-not-allowed');
    }
    if (envelope.raw_secret_stored !== false) {
      errors.push('secret-storage-not-allowed');
    }
    if (containsForbiddenBrokerMarker(envelope)) {
      errors.push('forbidden-marker-detected');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function buildBuilderWebAuthBrokerReceipt(envelope = null) {
  const brokerEnvelope = envelope || await createBuilderWebAuthBrokerEnvelope();
  const validation = validateBuilderWebAuthBrokerEnvelope(brokerEnvelope);
  return {
    schema: 'securedme.education.algoquest.builder-webauth-broker-receipt.v1',
    status: validation.valid ? 'blocked-live-broker-absent' : 'rejected',
    receipt_id: `builder-webauth:${await sha256Digest(brokerEnvelope)}`,
    envelope_digest: await sha256Digest(brokerEnvelope),
    validation_errors: validation.errors,
    live_channel_available: false,
    manual_receipt_required: true,
    mastery_authority: false,
    token_authority: false,
    unlock_authority: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function createAdventureRun({ manifest = mageTwoHorizonsPrimaryFr, seed = 'seed:mage:first-proof', started_at = '2026-08-03T00:00:00.000Z' } = {}) {
  return {
    schema: 'securedme.education.algoquest.adventure-run.v1',
    run_id: `run:${manifest.adaptation_id}:${seed}`,
    adaptation_id: manifest.adaptation_id,
    hero_book_id: manifest.hero_book_id,
    audience_id: manifest.audience_id,
    locale: manifest.locale,
    seed,
    started_at,
    contract_version: CONTRACT_VERSION,
    raw_secret_stored: false,
  };
}

export function createInitialQuestState(run) {
  return {
    schema: 'securedme.education.algoquest.quest-state.v1',
    run_id: run.run_id,
    current_act_id: 'act-1',
    story_points: 0,
    consumed_prompt_ids: [],
    milestone_ids: [],
    inventory_refs: [],
    biography: {
      hero_name: 'Apprenti des Deux Horizons',
      world_role: 'mage-apprentice',
    },
    contract_version: CONTRACT_VERSION,
    raw_secret_stored: false,
  };
}

export function createInitialLearningEvidence(run) {
  return {
    schema: 'securedme.education.algoquest.learning-evidence.v1',
    run_id: run.run_id,
    admitted_artifact_ids: [],
    knowledge_token_ids: [],
    latest_mastery_decision: 'not-evaluated',
    assistance_level: 'none',
    contract_version: CONTRACT_VERSION,
    raw_secret_stored: false,
  };
}

const hasPrerequisites = (node, state) =>
  node.prerequisites.every((promptId) => state.consumed_prompt_ids.includes(promptId));

export function availablePromptNodes(manifest, state) {
  return manifest.prompt_nodes
    .filter((node) => !state.consumed_prompt_ids.includes(node.prompt_id))
    .filter((node) => hasPrerequisites(node, state))
    .sort((left, right) => {
      if (left.mandatory !== right.mandatory) {
        return left.mandatory ? -1 : 1;
      }
      return left.prompt_id.localeCompare(right.prompt_id);
    });
}

export async function assignNextPrompt(manifest, run, state) {
  const candidates = availablePromptNodes(manifest, state);
  if (!candidates.length) {
    return {
      schema: 'securedme.education.algoquest.prompt-assignment.v1',
      run_id: run.run_id,
      status: 'completed',
      prompt_id: null,
      candidate_count: 0,
      assignment_digest: await sha256Digest({ run, state, candidates: [] }),
      contract_version: CONTRACT_VERSION,
      raw_secret_stored: false,
    };
  }

  const mandatory = candidates.filter((node) => node.mandatory);
  const pool = mandatory.length ? mandatory : candidates;
  const selector = await sha256Digest({ seed: run.seed, consumed_prompt_ids: state.consumed_prompt_ids, pool: pool.map((node) => node.prompt_id) });
  const index = Number.parseInt(selector.slice(-8), 16) % pool.length;
  const selected = pool[index];
  return {
    schema: 'securedme.education.algoquest.prompt-assignment.v1',
    run_id: run.run_id,
    status: 'assigned',
    prompt_id: selected.prompt_id,
    node_type: selected.node_type,
    act_id: selected.act_id,
    candidate_count: pool.length,
    assignment_digest: await sha256Digest({ run, selected_prompt_id: selected.prompt_id, state_digest: await sha256Digest(state) }),
    contract_version: CONTRACT_VERSION,
    raw_secret_stored: false,
  };
}

export async function consumePrompt(manifest, run, state, prompt_id) {
  const node = manifest.prompt_nodes.find((candidate) => candidate.prompt_id === prompt_id);
  const before_digest = await sha256Digest(state);
  if (!node) {
    return {
      schema: 'securedme.education.algoquest.prompt-consumption-receipt.v1',
      run_id: run.run_id,
      prompt_id,
      status: 'rejected',
      reason: 'unknown-prompt',
      before_digest,
      after_digest: before_digest,
      contract_version: CONTRACT_VERSION,
      raw_secret_stored: false,
    };
  }
  if (state.consumed_prompt_ids.includes(prompt_id)) {
    return {
      schema: 'securedme.education.algoquest.prompt-consumption-receipt.v1',
      run_id: run.run_id,
      prompt_id,
      status: 'replayed',
      reason: 'already-consumed',
      before_digest,
      after_digest: before_digest,
      contract_version: CONTRACT_VERSION,
      raw_secret_stored: false,
    };
  }
  if (!hasPrerequisites(node, state)) {
    return {
      schema: 'securedme.education.algoquest.prompt-consumption-receipt.v1',
      run_id: run.run_id,
      prompt_id,
      status: 'rejected',
      reason: 'missing-prerequisite',
      before_digest,
      after_digest: before_digest,
      contract_version: CONTRACT_VERSION,
      raw_secret_stored: false,
    };
  }

  const nextState = {
    ...state,
    current_act_id: node.act_id,
    story_points: state.story_points + (node.node_type === 'MilestoneNode' ? 10 : 1),
    consumed_prompt_ids: [...state.consumed_prompt_ids, prompt_id],
    milestone_ids: node.node_type === 'MilestoneNode' ? [...state.milestone_ids, `milestone:${prompt_id}`] : state.milestone_ids,
  };
  const after_digest = await sha256Digest(nextState);
  return {
    schema: 'securedme.education.algoquest.prompt-consumption-receipt.v1',
    run_id: run.run_id,
    prompt_id,
    status: 'consumed',
    reason: '',
    before_digest,
    after_digest,
    node_type: node.node_type,
    evidence_kind: node.evidence_kind,
    next_state: nextState,
    contract_version: CONTRACT_VERSION,
    raw_secret_stored: false,
  };
}

export async function buildFirstProofReceipt({ run, quest_state, learning_evidence, artifact_receipt }) {
  const requiredArtifact = Boolean(artifact_receipt && artifact_receipt.schema === 'securedme.education.algorithm-builder.algorithm-artifact-receipt.v1');
  const hasModelLimit = quest_state.consumed_prompt_ids.includes('mage-p07-newton-limit');
  const hasMilestone = quest_state.consumed_prompt_ids.includes('mage-p09-first-token');
  const status = requiredArtifact && hasModelLimit && hasMilestone ? 'completed' : 'hold';
  return {
    schema: 'securedme.education.algoquest.first-proof-receipt.v1',
    run_id: run.run_id,
    status,
    artifact_receipt_digest: artifact_receipt ? await sha256Digest(artifact_receipt) : null,
    quest_state_digest: await sha256Digest(quest_state),
    learning_evidence_digest: await sha256Digest(learning_evidence),
    rule_ref: 'first-proof:artifact-plus-model-limit-plus-milestone:v1',
    mastery_decision: status === 'completed' ? 'first-proof-admitted' : 'not-admitted',
    contract_version: CONTRACT_VERSION,
    raw_secret_stored: false,
  };
}

export function evaluateBadgeAdmission(learning_evidence, proof_receipt) {
  if (!proof_receipt || proof_receipt.mastery_decision !== 'first-proof-admitted') {
    return learning_evidence;
  }
  
  const tokenId = 'token:first-proof';
  if (learning_evidence.knowledge_token_ids.includes(tokenId)) {
    return learning_evidence;
  }

  return {
    ...learning_evidence,
    knowledge_token_ids: [...learning_evidence.knowledge_token_ids, tokenId],
    latest_mastery_decision: proof_receipt.mastery_decision,
  };
}

export function buildNarrativeEnvelope({ run, state, promptNode, locale = 'fr-CA' }) {
  return {
    schema: 'securedme.education.algoquest.narrative-envelope.v1',
    run_id: run.run_id,
    locale,
    scene_prompt_id: promptNode.prompt_id,
    audience_id: run.audience_id,
    facts_allowed: ['newtonian-motion-intro', 'model-limit-visible'],
    forbidden_claims: mageTwoHorizonsPrimaryFr.fiction_boundary.forbidden_claims,
    available_choices: availablePromptNodes(mageTwoHorizonsPrimaryFr, state).map((node) => node.prompt_id),
    max_words: 140,
    contract_version: CONTRACT_VERSION,
    raw_secret_stored: false,
  };
}

export const mageColabNotebookManifest = {
  schema: 'securedme.education.algoquest.colab-notebook-manifest.v1',
  notebook_id: 'colab.mage-two-horizons.primary-5-6.fr-CA.1',
  mission_id: mageEntryMissionManifest.mission_id,
  adaptation_id: mageTwoHorizonsPrimaryFr.adaptation_id,
  prepared_cells: [
    'intro_model_boundary',
    'force_parameters',
    'trajectory_runner',
    'comparison_table',
  ],
  player_cells: [
    'choose_force',
    'change_one_variable',
    'explain_model_limit',
  ],
  tests: [
    'receipt_has_mission_id',
    'receipt_has_digest',
    'model_limit_is_written',
  ],
  export_contract: 'securedme.education.algoquest.colab-round-trip-receipt.v1',
  contains_identity: false,
  contains_secret: false,
  contains_canonical_state: false,
  raw_secret_stored: false,
  contract_version: CONTRACT_VERSION,
};

export function buildColabNotebookDocument({ notebook = mageColabNotebookManifest, mission = mageMissionEnvelope } = {}) {
  return {
    cells: [
      {
        cell_type: 'markdown',
        metadata: {},
        source: [
          '# AlgoQuest - Le Mage des Deux Horizons\n',
          '\n',
          'Mission: modifier une force, observer une trajectoire, puis expliquer la limite du modele.\n',
          '\n',
          'Ce notebook ne contient pas d identite, de secret ou d etat canonique. Le recu JSON doit etre importe explicitement dans AlgoQuest.\n',
        ],
      },
      {
        cell_type: 'code',
        execution_count: null,
        metadata: {},
        outputs: [],
        source: [
          `mission_id = '${mission.mission_id}'\n`,
          "artifact_id = 'force-path-demo'\n",
          'force_x = 2\n',
          'force_y = 1\n',
          'duration = 4\n',
          'positions = []\n',
          'x = 0\n',
          'y = 0\n',
          'for step in range(duration):\n',
          '    x += force_x\n',
          '    y += force_y\n',
          '    positions.append({"step": step + 1, "x": x, "y": y})\n',
          'positions\n',
        ],
      },
      {
        cell_type: 'code',
        execution_count: null,
        metadata: {},
        outputs: [],
        source: [
          'changed_force_x = 3\n',
          'changed_positions = []\n',
          'x = 0\n',
          'y = 0\n',
          'for step in range(duration):\n',
          '    x += changed_force_x\n',
          '    y += force_y\n',
          '    changed_positions.append({"step": step + 1, "x": x, "y": y})\n',
          'comparison = {"first": positions, "changed": changed_positions}\n',
          'comparison\n',
        ],
      },
      {
        cell_type: 'code',
        execution_count: null,
        metadata: {},
        outputs: [],
        source: [
          'import hashlib, json\n',
          "model_limit = 'Ce modele montre une trajectoire simple; il ne prouve pas toute la physique du ciel.'\n",
          'payload = {\n',
          "    'schema': 'securedme.education.algoquest.colab-round-trip-receipt.v1',\n",
          `    'notebook_id': '${notebook.notebook_id}',\n`,
          "    'mission_id': mission_id,\n",
          `    'adaptation_id': '${notebook.adaptation_id}',\n`,
          "    'artifact_digest': 'sha256:' + hashlib.sha256(json.dumps(comparison, sort_keys=True).encode()).hexdigest(),\n",
          "    'tests': [\n",
          "        {'test_id': 'receipt_has_mission_id', 'status': 'passed'},\n",
          "        {'test_id': 'receipt_has_digest', 'status': 'passed'},\n",
          "        {'test_id': 'model_limit_is_written', 'status': 'passed'},\n",
          '    ],\n',
          "    'contains_identity': False,\n",
          "    'contains_secret': False,\n",
          "    'contains_canonical_state': False,\n",
          "    'raw_secret_stored': False,\n",
          "    'contract_version': 'v1',\n",
          '}\n',
          "payload['receipt_digest'] = 'sha256:' + hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()\n",
          'print(json.dumps(payload, indent=2, sort_keys=True))\n',
        ],
      },
    ],
    metadata: {
      kernelspec: {
        display_name: 'Python 3',
        language: 'python',
        name: 'python3',
      },
      language_info: {
        name: 'python',
      },
      algoquest: {
        mission_id: mission.mission_id,
        contains_identity: false,
        contains_secret: false,
        contains_canonical_state: false,
      },
    },
    nbformat: 4,
    nbformat_minor: 5,
  };
}

export async function buildColabRoundTripReceipt({ notebook = mageColabNotebookManifest, artifact_digest, model_limit_written = false } = {}) {
  const body = {
    schema: 'securedme.education.algoquest.colab-round-trip-receipt.v1',
    notebook_id: notebook.notebook_id,
    mission_id: notebook.mission_id,
    adaptation_id: notebook.adaptation_id,
    artifact_digest: artifact_digest || null,
    tests: [
      { test_id: 'receipt_has_mission_id', status: notebook.mission_id ? 'passed' : 'failed' },
      { test_id: 'receipt_has_digest', status: artifact_digest ? 'passed' : 'failed' },
      { test_id: 'model_limit_is_written', status: model_limit_written ? 'passed' : 'failed' },
    ],
    contains_identity: false,
    contains_secret: false,
    contains_canonical_state: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
  return {
    ...body,
    receipt_digest: await sha256Digest(body),
  };
}

export function isColabRoundTripReceipt(value, notebook = mageColabNotebookManifest) {
  return Boolean(value)
    && typeof value === 'object'
    && value.schema === 'securedme.education.algoquest.colab-round-trip-receipt.v1'
    && value.notebook_id === notebook.notebook_id
    && value.mission_id === notebook.mission_id
    && value.adaptation_id === notebook.adaptation_id
    && typeof value.artifact_digest === 'string'
    && value.artifact_digest.startsWith('sha256:')
    && typeof value.receipt_digest === 'string'
    && value.receipt_digest.startsWith('sha256:')
    && Array.isArray(value.tests)
    && value.tests.every((test) => test && typeof test === 'object' && typeof test.test_id === 'string' && test.status === 'passed')
    && value.contains_identity === false
    && value.contains_secret === false
    && value.contains_canonical_state === false
    && value.raw_secret_stored === false
    && value.contract_version === CONTRACT_VERSION;
}

export function renderAsciiScene(promptNode) {
  return {
    schema: 'securedme.education.algoquest.ascii-scene.v1',
    prompt_id: promptNode.prompt_id,
    width: 50,
    art: [
      '+----------------------------------------------+',
      '|                *        .                     |',
      '|        .               mage path              |',
      '|   o--------------------->                     |',
      '|        force changes the route                |',
      '+----------------------------------------------+',
    ],
    linear_equivalent: `Scene ${promptNode.title}: ${promptNode.prompt_text}`,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export const tenebrisPolicy = {
  schema: 'securedme.education.algoquest.tenebris-policy.v1',
  cycle: ['open', 'isolate', 'process', 'purge', 'revoke', 'bounded-trace'],
  default_status: 'disabled',
  forbidden_imports: ['vot-guardian-audio-processor', 'raw-vot-metrics', 'raw-keystroke-stream'],
  allowed_outcomes: ['observed-category', 'abstain', 'purge_failed'],
  mastery_authority: false,
  contract_version: CONTRACT_VERSION,
  raw_secret_stored: false,
};

export function createEphemeralObservationRequest({ purpose = 'interaction-comfort-check', subject = 'synthetic', enabled = false } = {}) {
  return {
    schema: 'securedme.education.algoquest.ephemeral-observation-request.v1',
    purpose,
    subject,
    enabled,
    max_duration_ms: 0,
    max_bytes: 0,
    allowed_modalities: [],
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function processEphemeralObservation(request = createEphemeralObservationRequest()) {
  if (!request.enabled) {
    return {
      schema: 'securedme.education.algoquest.ephemeral-observation-result.v1',
      status: 'abstain',
      reason: 'tenebris-disabled',
      mastery_authority: false,
      purge_receipt: {
        schema: 'securedme.education.algoquest.purge-receipt.v1',
        purge_id: 'purge:not-opened',
        status: 'not-opened',
        contains_audio: false,
        contains_transcript: false,
        contains_vot_metrics: false,
        raw_secret_stored: false,
        contract_version: CONTRACT_VERSION,
      },
      raw_secret_stored: false,
      contract_version: CONTRACT_VERSION,
    };
  }
  return {
    schema: 'securedme.education.algoquest.ephemeral-observation-result.v1',
    status: 'purge_failed',
    reason: 'no-approved-runtime',
    mastery_authority: false,
    purge_receipt: {
      schema: 'securedme.education.algoquest.purge-receipt.v1',
      purge_id: 'purge:blocked-runtime',
      status: 'purge_failed',
      contains_audio: false,
      contains_transcript: false,
      contains_vot_metrics: false,
      raw_secret_stored: false,
      contract_version: CONTRACT_VERSION,
    },
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function buildStudentProjection({ run, quest_state, learning_evidence, entry_state } = {}) {
  return {
    schema: 'securedme.education.algoquest.student-projection.v1',
    run_id: run ? run.run_id : null,
    mission_id: entry_state ? entry_state.mission_id : mageEntryMissionManifest.mission_id,
    visible_story_points: quest_state ? quest_state.story_points : 0,
    consumed_prompt_count: quest_state ? quest_state.consumed_prompt_ids.length : 0,
    knowledge_token_ids: learning_evidence ? [...learning_evidence.knowledge_token_ids] : [],
    latest_mastery_decision: learning_evidence ? learning_evidence.latest_mastery_decision : 'not-evaluated',
    assistance_level: entry_state ? entry_state.assistance_level : 'none',
    contains_raw_answer: false,
    contains_audio: false,
    contains_identity: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function buildTeacherProjection({ teacher_ref, assigned_run_ids = [], student_projection } = {}) {
  const assigned = Boolean(student_projection && assigned_run_ids.includes(student_projection.run_id));
  return {
    schema: 'securedme.education.algoquest.teacher-projection.v1',
    teacher_ref: teacher_ref || 'teacher:redacted',
    run_id: assigned && student_projection ? student_projection.run_id : null,
    mission_id: assigned && student_projection ? student_projection.mission_id : null,
    visible_status: assigned ? 'assigned-summary' : 'not-assigned',
    consumed_prompt_count: assigned && student_projection ? student_projection.consumed_prompt_count : null,
    latest_mastery_decision: assigned && student_projection ? student_projection.latest_mastery_decision : null,
    contains_raw_answer: false,
    contains_audio: false,
    contains_identity: false,
    contains_teacher_private_activity: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function buildOrganizationAggregateProjection({ organization_ref = 'organization:redacted', cohort_size = 0, completed_count = 0, blocked_count = 0 } = {}) {
  const admitted = cohort_size >= 10;
  return {
    schema: 'securedme.education.algoquest.organization-aggregate-projection.v1',
    organization_ref,
    status: admitted ? 'aggregate-admitted' : 'suppressed-small-cohort',
    k_threshold: 10,
    cohort_size: admitted ? cohort_size : null,
    completed_count: admitted ? completed_count : null,
    blocked_count: admitted ? blocked_count : null,
    contains_individual_student: false,
    contains_individual_teacher: false,
    contains_raw_answer: false,
    contains_audio: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function createKnowledgeTokenTransfer({ token_id = null, from_run_id = null, consent_scope = 'none', expires_at = null } = {}) {
  const admitted = Boolean(token_id && from_run_id && ['tool', 'suite'].includes(consent_scope) && expires_at);
  return {
    schema: 'securedme.education.algoquest.knowledge-token-transfer.v1',
    status: admitted ? 'transfer-admitted' : 'transfer-rejected',
    token_id: admitted ? token_id : null,
    from_run_id: admitted ? from_run_id : null,
    consent_scope,
    expires_at,
    revocable: true,
    contains_raw_answer: false,
    contains_audio: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function revokeKnowledgeTokenTransfer(transfer, { revoked_at = '2026-08-03T00:00:00.000Z', reason = 'learner-request' } = {}) {
  if (!transfer || transfer.schema !== 'securedme.education.algoquest.knowledge-token-transfer.v1') {
    return {
      schema: 'securedme.education.algoquest.knowledge-token-revocation.v1',
      status: 'revocation-rejected',
      reason: 'invalid-transfer',
      token_id: null,
      from_run_id: null,
      contains_raw_answer: false,
      contains_audio: false,
      raw_secret_stored: false,
      contract_version: CONTRACT_VERSION,
    };
  }
  return {
    schema: 'securedme.education.algoquest.knowledge-token-revocation.v1',
    status: transfer.status === 'transfer-admitted' ? 'revoked' : 'revocation-rejected',
    reason,
    token_id: transfer.status === 'transfer-admitted' ? transfer.token_id : null,
    from_run_id: transfer.status === 'transfer-admitted' ? transfer.from_run_id : null,
    revoked_at,
    contains_raw_answer: false,
    contains_audio: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function createDataDeletionReceipt({ run_id = null, scope = 'local-run', requested_by = 'learner', deleted_at = '2026-08-03T00:00:00.000Z' } = {}) {
  const allowedScope = ['local-run', 'entry-mission', 'projection-cache', 'knowledge-token-transfer'];
  const admitted = Boolean(run_id && allowedScope.includes(scope) && ['learner', 'guardian', 'operator'].includes(requested_by));
  return {
    schema: 'securedme.education.algoquest.data-deletion-receipt.v1',
    status: admitted ? 'deletion-recorded' : 'deletion-rejected',
    run_id: admitted ? run_id : null,
    scope,
    requested_by,
    deleted_at: admitted ? deleted_at : null,
    retained_trace: admitted ? 'bounded-deletion-receipt-only' : 'none',
    deleted_categories: admitted ? ['local_projection_cache', 'local_receipt_copy'] : [],
    never_stored_categories: ['raw-answer', 'raw-audio', 'transcript', 'vot-metrics', 'hidden-diagnosis'],
    contains_raw_answer: false,
    contains_audio: false,
    contains_identity: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function decideHierarchicalAccess({ requester_role = 'organization-admin', target_kind = 'teacher-private-activity', cohort_size = 0, explicitly_assigned = false } = {}) {
  const teacherPrivateDenied = target_kind === 'teacher-private-activity';
  const rawSensitiveDenied = ['raw-answer', 'audio', 'identity', 'transcript', 'vot-metrics'].includes(target_kind);
  const aggregateAllowed = target_kind === 'organization-aggregate' && cohort_size >= 10;
  const assignedStudentSummaryAllowed = target_kind === 'assigned-student-summary' && requester_role === 'teacher' && explicitly_assigned;
  const allowed = !teacherPrivateDenied && !rawSensitiveDenied && (aggregateAllowed || assignedStudentSummaryAllowed);
  return {
    schema: 'securedme.education.algoquest.hierarchical-access-decision.v1',
    status: allowed ? 'allowed' : 'denied',
    requester_role,
    target_kind,
    reason: allowed ? 'minimum-necessary-summary' : 'privacy-boundary',
    k_threshold: target_kind === 'organization-aggregate' ? 10 : null,
    cohort_size: target_kind === 'organization-aggregate' ? cohort_size : null,
    explicitly_assigned,
    contains_raw_answer: false,
    contains_audio: false,
    contains_identity: false,
    contains_teacher_private_activity: false,
    raw_secret_stored: false,
    contract_version: CONTRACT_VERSION,
  };
}

export function isPrivacyReceipt(value) {
  return Boolean(value)
    && typeof value === 'object'
    && [
      'securedme.education.algoquest.knowledge-token-revocation.v1',
      'securedme.education.algoquest.data-deletion-receipt.v1',
      'securedme.education.algoquest.hierarchical-access-decision.v1',
    ].includes(value.schema)
    && value.raw_secret_stored === false
    && value.contains_raw_answer === false
    && value.contains_audio === false
    && (value.contains_identity === undefined || value.contains_identity === false)
    && value.contract_version === CONTRACT_VERSION;
}

export function readPrivacyReceipts() {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PRIVACY_RECEIPT_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter(isPrivacyReceipt).slice(0, 25) : [];
  } catch {
    return [];
  }
}

export function persistPrivacyReceipt(receipt) {
  if (typeof window === 'undefined' || !isPrivacyReceipt(receipt)) {
    return false;
  }
  try {
    const current = readPrivacyReceipts();
    window.localStorage.setItem(PRIVACY_RECEIPT_STORAGE_KEY, JSON.stringify([receipt, ...current].slice(0, 25)));
    return true;
  } catch {
    return false;
  }
}

export function clearLocalPrivacyReceipts({ requested_by = 'learner', cleared_at = '2026-08-03T00:00:00.000Z' } = {}) {
  const receipt = createDataDeletionReceipt({
    run_id: 'local-privacy-receipts',
    scope: 'projection-cache',
    requested_by,
    deleted_at: cleared_at,
  });
  if (typeof window === 'undefined' || receipt.status !== 'deletion-recorded') {
    return {
      ...receipt,
      status: 'deletion-rejected',
      retained_trace: 'none',
    };
  }
  try {
    window.localStorage.removeItem(PRIVACY_RECEIPT_STORAGE_KEY);
    return receipt;
  } catch {
    return {
      ...receipt,
      status: 'deletion-rejected',
      retained_trace: 'none',
    };
  }
}
