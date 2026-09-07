/**
 * The durable Hero Books cockpit.  This module is deliberately local and
 * deterministic: AlgoQuest is the only caller allowed to commit this state.
 * Product companions receive a projection or return a receipt, never a state
 * mutation capability.
 */

/** Public contract name agreed by the Hero Books programme. */
export const HERO_BOOK_PANEL_SCHEMA = 'HeroBookPanelState.v1' as const;
/** Kept only for durable local-state migration from the pre-contract build. */
export const LEGACY_HERO_BOOK_PANEL_SCHEMA = 'securedme.education.hero-book-panel-state.v1' as const;
export const HERO_BOOK_PANEL_STORAGE_KEY = 'securedme.education.algoquest.hero-book-panel-state.v1';
export const HERO_BOOK_STAGES = ['Mission', 'Build', 'Check', 'Colab', 'Return', 'Reflect'] as const;
export type HeroBookStage = typeof HERO_BOOK_STAGES[number];
export type CapabilityStatus = 'available' | 'planned' | 'disabled' | 'forbidden';
export type InventoryKind = 'tool' | 'equipment' | 'symbolic-weapon';

export interface HeroBookCapability {
  id: string;
  title: string;
  summary: string;
  status: CapabilityStatus;
  specialist: 'algorithm-builder' | 'visual-algorithm' | 'qbit';
}

export interface HeroBookDeck {
  hero_book_id: string;
  version: 'v1';
  title: string;
  capabilities: HeroBookCapability[];
}

export interface HeroBookInventoryItem {
  item_id: string;
  label: string;
  kind: InventoryKind;
  provenance: string;
  state: 'equipped' | 'locked' | 'consumed' | 'available';
  description: string;
}

export interface DecisionRecord {
  decision_id: string;
  prompt_id: string;
  choices: string[];
  chosen: string;
  justification: string;
  consequence: string;
  evidence_ref?: string;
  created_at: string;
}

export interface DieReceipt {
  receipt_id: string;
  seed: string;
  counter: number;
  sides: number;
  result: number;
  deterministic: true;
}

export interface MissionJournalEntry {
  stage: HeroBookStage;
  note: string;
  receipt_ref?: string;
  evidence_ref?: string;
  created_at: string;
}

export interface HeroBookPanelStateV1 {
  schema: typeof HERO_BOOK_PANEL_SCHEMA;
  revision: number;
  canonical_state_owner: 'algoquest';
  hero_book_id: string;
  adaptation_id: string;
  hero: { role: string; narrative_level: number; preferences: string[] };
  audience_id: string;
  locale: string;
  mission: { mission_id: string; prompt_id: string; title: string; stage: HeroBookStage };
  talents: string[];
  inventory: HeroBookInventoryItem[];
  deterministic_die: { seed: string; counter: number; last_receipt: DieReceipt | null };
  decisions: DecisionRecord[];
  story_points: number;
  learning_evidence: { evidence_refs: string[]; proof_refs: string[] };
  knowledge_tokens: string[];
  milestones: string[];
  receipts: string[];
  specialist: { active: string | null; return_channel: 'qbit-plan-handoff' };
  journal: MissionJournalEntry[];
  updated_at: string;
}

const capability = (id: string, title: string, summary: string, status: CapabilityStatus, specialist: HeroBookCapability['specialist']): HeroBookCapability => ({ id, title, summary, status, specialist });

const deck = (hero_book_id: string, title: string, rows: Array<[string, string, string, CapabilityStatus, HeroBookCapability['specialist']]>): HeroBookDeck => ({
  hero_book_id, version: 'v1', title, capabilities: rows.map(([id, name, summary, status, specialist]) => capability(id, name, summary, status, specialist)),
});

/** Exactly ten honest cards per world.  Planned cards remain visible but cannot be invoked. */
export const HERO_BOOK_DECKS: HeroBookDeck[] = [
  deck('mage-two-horizons', 'Mage: sky and models', [
    ['sky-observation', 'Sky observation', 'Describe an observable sky condition.', 'available', 'qbit'],
    ['force-vector', 'Force vector', 'Construct a bounded force vector.', 'available', 'algorithm-builder'],
    ['trajectory', 'Trajectory', 'Compare a deterministic trajectory.', 'available', 'algorithm-builder'],
    ['model-comparison', 'Model comparison', 'Change one variable and compare.', 'available', 'algorithm-builder'],
    ['model-limit', 'Model limit', 'State what a model cannot establish.', 'available', 'algorithm-builder'],
    ['curved-grid', 'Curved-grid analogy', 'Explore a clearly labelled analogy.', 'planned', 'visual-algorithm'],
    ['four-forces', 'Four forces', 'Use cautious classifications.', 'planned', 'qbit'],
    ['orbit-map', 'Orbit map', 'Inspect a future visual map.', 'planned', 'visual-algorithm'],
    ['live-physics', 'Live physics claim', 'Not a supported teaching claim.', 'forbidden', 'qbit'],
    ['hidden-telemetry', 'Hidden telemetry', 'No covert learner signal collection.', 'forbidden', 'qbit'],
  ]),
  deck('ronin-six-provinces', 'Ronin: routes and decisions', [
    ['route-map', 'Route map', 'Map nodes and safe routes.', 'available', 'visual-algorithm'], ['condition-card', 'Condition card', 'State a visible branch.', 'available', 'algorithm-builder'], ['cost-table', 'Cost table', 'Compare declared costs.', 'available', 'algorithm-builder'], ['path-explanation', 'Path explanation', 'Explain a chosen route.', 'available', 'qbit'], ['risk-ledger', 'Risk ledger', 'Record a non-violent consequence.', 'available', 'qbit'], ['route-search', 'Route search', 'Future route-search exercise.', 'planned', 'visual-algorithm'], ['tradeoff-map', 'Trade-off map', 'Future visual comparison.', 'planned', 'visual-algorithm'], ['strategy-reflection', 'Strategy reflection', 'Future reflection scaffold.', 'planned', 'qbit'], ['real-weapon-use', 'Real weapon use', 'No instruction or simulation of real weapons.', 'forbidden', 'qbit'], ['covert-tracking', 'Covert tracking', 'No learner surveillance.', 'forbidden', 'qbit'],
  ]),
  deck('crown-of-tides', 'Crown of Tides: probability and ciphers', [
    ['resource-ledger', 'Resource ledger', 'Track bounded fictional resources.', 'available', 'algorithm-builder'], ['chance-table', 'Chance table', 'Compare declared probabilities.', 'available', 'algorithm-builder'], ['simple-cipher', 'Simple cipher', 'Explore a classroom cipher.', 'available', 'visual-algorithm'], ['risk-choice', 'Risk choice', 'Record a decision rationale.', 'available', 'qbit'], ['navigation-grid', 'Navigation grid', 'Use a non-operational map.', 'available', 'visual-algorithm'], ['bayes-intuition', 'Bayes intuition', 'Future probability scaffold.', 'planned', 'qbit'], ['resource-model', 'Resource model', 'Future model card.', 'planned', 'visual-algorithm'], ['cipher-history', 'Cipher history', 'Future sourced history card.', 'planned', 'qbit'], ['real-navigation', 'Real navigation guidance', 'Not navigation advice.', 'forbidden', 'qbit'], ['secret-handling', 'Secret handling', 'No real secret material.', 'forbidden', 'qbit'],
  ]),
  deck('alchemist-oak-gate', 'Alchemist: pipelines and boundaries', [
    ['pipeline', 'Pipeline', 'Order a pure transformation.', 'available', 'algorithm-builder'], ['data-purification', 'Data purification', 'Clean a synthetic data sample.', 'available', 'algorithm-builder'], ['pure-function', 'Pure function', 'Compare input and output.', 'available', 'algorithm-builder'], ['claim-boundary', 'Claim boundary', 'Separate symbol, history, and fact.', 'available', 'qbit'], ['provenance', 'Provenance', 'Keep a source reference visible.', 'available', 'qbit'], ['pipeline-visualizer', 'Pipeline visualizer', 'Future visual pipeline.', 'planned', 'visual-algorithm'], ['transformation-library', 'Transformation library', 'Future deck expansion.', 'planned', 'algorithm-builder'], ['historical-review', 'Historical review', 'Future reviewed source card.', 'planned', 'qbit'], ['medical-alchemy', 'Medical alchemy claim', 'No medical claim or advice.', 'forbidden', 'qbit'], ['hidden-data', 'Hidden data import', 'No unreviewed personal-data import.', 'forbidden', 'qbit'],
  ]),
  deck('neuron-without-brain', 'Neuron: evidence and analogy', [
    ['brownian-model', 'Brownian model', 'Observe a bounded random walk.', 'available', 'algorithm-builder'], ['light-evidence', 'Light evidence', 'Inspect an evidence card.', 'available', 'qbit'], ['frame-comparison', 'Frame comparison', 'Compare declared reference frames.', 'available', 'visual-algorithm'], ['analogy-limit', 'Analogy limit', 'State where an analogy stops.', 'available', 'qbit'], ['observation-log', 'Observation log', 'Keep a synthetic observation log.', 'available', 'algorithm-builder'], ['photoelectric-demo', 'Photoelectric demo', 'Future reviewed illustration.', 'planned', 'visual-algorithm'], ['relativity-map', 'Relativity map', 'Future analogy map.', 'planned', 'visual-algorithm'], ['evidence-synthesis', 'Evidence synthesis', 'Future reflection support.', 'planned', 'qbit'], ['brain-diagnosis', 'Brain diagnosis', 'No diagnostic interpretation.', 'forbidden', 'qbit'], ['biometric-inference', 'Biometric inference', 'No sensitive inference.', 'forbidden', 'qbit'],
  ]),
  deck('algorithm-citadel', 'Citadel: structures and debugging', [
    ['condition', 'Condition', 'Build a visible condition.', 'available', 'algorithm-builder'], ['loop', 'Loop', 'Repair a bounded loop.', 'available', 'algorithm-builder'], ['function', 'Function', 'Describe a pure function.', 'available', 'algorithm-builder'], ['structure', 'Structure', 'Inspect a safe data structure.', 'available', 'visual-algorithm'], ['debugging', 'Debugging', 'Explain a correction.', 'available', 'algorithm-builder'], ['complexity', 'Complexity', 'Future complexity comparison.', 'planned', 'visual-algorithm'], ['test-generator', 'Test generator', 'Future deterministic tests.', 'planned', 'algorithm-builder'], ['refactor-review', 'Refactor review', 'Future companion reflection.', 'planned', 'qbit'], ['malware-automation', 'Malware automation', 'No unsafe automation.', 'forbidden', 'qbit'], ['credential-processing', 'Credential processing', 'No credential material.', 'forbidden', 'qbit'],
  ]),
];

function stableNumber(value: string): number { let hash = 2166136261; for (const char of value) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); } return hash >>> 0; }
function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }
function nowIso(): string { return new Date().toISOString(); }

export function createHeroBookPanelState(partial: Partial<HeroBookPanelStateV1> = {}): HeroBookPanelStateV1 {
  const stamp = nowIso();
  return {
    schema: HERO_BOOK_PANEL_SCHEMA, revision: 1, canonical_state_owner: 'algoquest', hero_book_id: 'mage-two-horizons', adaptation_id: 'mage-two-horizons.primary-5-6.fr-CA.1',
    hero: { role: 'apprenti-des-deux-horizons', narrative_level: 1, preferences: [] }, audience_id: 'primary-5-6', locale: 'fr-CA',
    mission: { mission_id: 'entry.mage-two-horizons.primary-5-6.fr-CA.1', prompt_id: 'mage-p01-sky-door', title: 'La porte du ciel', stage: 'Mission' },
    talents: ['observation'], inventory: [{ item_id: 'paper-sky-map', label: 'Carte du ciel', kind: 'tool', provenance: 'hero-book:mage', state: 'equipped', description: 'A paper map for a fictional sky.' }],
    deterministic_die: { seed: 'seed:mage:first-proof', counter: 0, last_receipt: null }, decisions: [], story_points: 0,
    learning_evidence: { evidence_refs: [], proof_refs: [] }, knowledge_tokens: [], milestones: [], receipts: [], specialist: { active: null, return_channel: 'qbit-plan-handoff' },
    journal: [{ stage: 'Mission', note: 'Cockpit created by AlgoQuest.', created_at: stamp }], updated_at: stamp, ...clone(partial),
  };
}

/** Migrates only recognized historical shapes; malformed state falls back safely. */
export function migrateHeroBookPanelState(value: unknown): HeroBookPanelStateV1 {
  if (!value || typeof value !== 'object') return createHeroBookPanelState();
  const source = value as Record<string, unknown>;
  if ((source.schema === HERO_BOOK_PANEL_SCHEMA || source.schema === LEGACY_HERO_BOOK_PANEL_SCHEMA) && source.canonical_state_owner === 'algoquest') {
    return createHeroBookPanelState({ ...(source as Partial<HeroBookPanelStateV1>), schema: HERO_BOOK_PANEL_SCHEMA });
  }
  return createHeroBookPanelState({
    hero_book_id: typeof source.hero_book_id === 'string' ? source.hero_book_id : undefined,
    adaptation_id: typeof source.adaptation_id === 'string' ? source.adaptation_id : undefined,
    story_points: typeof source.story_points === 'number' ? source.story_points : undefined,
  });
}

export function isStaleHeroBookRevision(state: HeroBookPanelStateV1, expectedRevision: number): boolean { return state.revision !== expectedRevision; }

/** Throws on a stale update; this is the conflict boundary for every cockpit mutation. */
export function commitHeroBookPanelState(state: HeroBookPanelStateV1, expectedRevision: number, patch: Partial<HeroBookPanelStateV1>): HeroBookPanelStateV1 {
  if (isStaleHeroBookRevision(state, expectedRevision)) throw new Error('STALE_HERO_BOOK_REVISION');
  const next = createHeroBookPanelState({ ...state, ...clone(patch), revision: state.revision + 1, updated_at: nowIso() });
  if (next.canonical_state_owner !== 'algoquest') throw new Error('ALGOQUEST_CANONICAL_AUTHORITY_REQUIRED');
  return next;
}

export function rollHeroBookDie(state: HeroBookPanelStateV1, expectedRevision: number, sides = 6): { state: HeroBookPanelStateV1; receipt: DieReceipt } {
  if (!Number.isInteger(sides) || sides < 2 || sides > 100) throw new Error('INVALID_DIE_SIDES');
  const counter = state.deterministic_die.counter + 1;
  const result = (stableNumber(`${state.deterministic_die.seed}:${counter}`) % sides) + 1;
  const receipt: DieReceipt = { receipt_id: `die-${stableNumber(`${state.deterministic_die.seed}:${counter}:${sides}`).toString(16)}`, seed: state.deterministic_die.seed, counter, sides, result, deterministic: true };
  const next = commitHeroBookPanelState(state, expectedRevision, {
    deterministic_die: { ...state.deterministic_die, counter, last_receipt: receipt }, receipts: [...state.receipts, receipt.receipt_id],
    journal: [...state.journal, { stage: state.mission.stage, note: `Deterministic die rolled ${result}/${sides}.`, receipt_ref: receipt.receipt_id, created_at: nowIso() }],
  });
  return { state: next, receipt };
}

export function recordHeroBookDecision(state: HeroBookPanelStateV1, expectedRevision: number, decision: Omit<DecisionRecord, 'decision_id' | 'created_at'>): HeroBookPanelStateV1 {
  if (!decision.choices.includes(decision.chosen) || !decision.justification.trim()) throw new Error('INVALID_HERO_BOOK_DECISION');
  const entry: DecisionRecord = { ...decision, decision_id: `decision-${stableNumber(`${decision.prompt_id}:${decision.chosen}:${state.revision}`).toString(16)}`, created_at: nowIso() };
  return commitHeroBookPanelState(state, expectedRevision, { decisions: [...state.decisions, entry], story_points: state.story_points + 1, journal: [...state.journal, { stage: state.mission.stage, note: `Decision recorded: ${entry.chosen}.`, evidence_ref: entry.evidence_ref, created_at: entry.created_at }] });
}

export function appendMissionJournal(state: HeroBookPanelStateV1, expectedRevision: number, stage: HeroBookStage, note: string, receipt_ref?: string): HeroBookPanelStateV1 {
  if (!HERO_BOOK_STAGES.includes(stage) || !note.trim()) throw new Error('INVALID_MISSION_JOURNAL_ENTRY');
  return commitHeroBookPanelState(state, expectedRevision, { mission: { ...state.mission, stage }, journal: [...state.journal, { stage, note, receipt_ref, created_at: nowIso() }] });
}

export function persistHeroBookPanelState(state: HeroBookPanelStateV1, storage: Storage | null = typeof window === 'undefined' ? null : window.localStorage): HeroBookPanelStateV1 { storage?.setItem(HERO_BOOK_PANEL_STORAGE_KEY, JSON.stringify(state)); return state; }
export function readHeroBookPanelState(storage: Storage | null = typeof window === 'undefined' ? null : window.localStorage): HeroBookPanelStateV1 { try { return migrateHeroBookPanelState(JSON.parse(storage?.getItem(HERO_BOOK_PANEL_STORAGE_KEY) || 'null')); } catch { return createHeroBookPanelState(); } }

/** Deliberately omits any write capability and raw learner data from specialist handoffs. */
export function heroBookCompanionProjection(state: HeroBookPanelStateV1) {
  return { schema: 'securedme.education.hero-book-companion-context.v1', revision: state.revision, canonical_state_owner: state.canonical_state_owner, hero_book_id: state.hero_book_id, adaptation_id: state.adaptation_id, hero: state.hero, audience_id: state.audience_id, locale: state.locale, mission: state.mission, talents: state.talents, inventory: state.inventory, deterministic_die: state.deterministic_die, decisions: state.decisions, specialist: state.specialist, qbit_return_channel: state.specialist.return_channel, raw_secret_stored: false };
}
