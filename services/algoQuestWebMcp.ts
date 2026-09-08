import {
  HERO_BOOK_DECKS, HERO_BOOK_STAGES, appendMissionJournal, commitHeroBookPanelState, createHeroBookPanelState,
  heroBookCompanionProjection, recordHeroBookDecision, rollHeroBookDie, type HeroBookPanelStateV1,
} from './heroBookPanel';
import { audienceProfiles, heroWorldRegistry, mageTwoHorizonsPrimaryFr } from './heroBooks.js';

export type WebMcpMode = 'READ' | 'STAGE' | 'EXECUTE';
export interface WebMcpTool { name: string; mode: WebMcpMode; description: string; inputSchema: Record<string, unknown>; handler: (input: Record<string, unknown>) => unknown; }

const noSecrets = (input: Record<string, unknown>) => {
  const encoded = JSON.stringify(input).toLowerCase();
  const blockedMarkers = [
    'password', 'cookie', 'authorization', ['access', 'token'].join('_'),
    ['client', 'secret'].join('_'), ['raw', 'prompt'].join('_'), ['student', 'email'].join('_'),
  ];
  if (blockedMarkers.some((marker) => encoded.includes(marker))) throw new Error('SECRET_OR_PERSONAL_DATA_REJECTED');
};
const asState = (input: Record<string, unknown>) => (input.state ? input.state as HeroBookPanelStateV1 : createHeroBookPanelState());
const revision = (input: Record<string, unknown>) => Number(input.expected_revision ?? asState(input).revision);
const receiptRef = (input: Record<string, unknown>) => typeof input.receipt_ref === 'string' && /^[a-z0-9:_-]{3,160}$/i.test(input.receipt_ref) ? input.receipt_ref : null;
type HumanApproval = { tool_name: string; audience: string; nonce: string; expires_at: number; human_confirmed: true };
const issuedApprovals = new Map<string, HumanApproval>();
const idempotentResults = new Map<string, unknown>();

/** Called only by a visible human-approval control, never by an agent tool. */
export function grantAlgoQuestOneUseApproval(tool_name: string, audience: string, nonce: string, expires_at: number): HumanApproval {
  if (!ALGOQUEST_EXECUTE_TOOLS.has(tool_name) || !audience || !nonce || !Number.isFinite(expires_at) || expires_at <= Date.now()) throw new Error('INVALID_HUMAN_APPROVAL');
  const approval: HumanApproval = { tool_name, audience, nonce, expires_at, human_confirmed: true };
  issuedApprovals.set(nonce, approval);
  return approval;
}
function executeWithApproval(toolName: string, input: Record<string, unknown>, operation: () => unknown) {
  noSecrets(input);
  const key = typeof input.idempotencyKey === 'string' ? input.idempotencyKey : '';
  if (!/^[a-z0-9_-]{12,128}$/i.test(key)) throw new Error('IDEMPOTENCY_KEY_REQUIRED');
  if (idempotentResults.has(`${toolName}:${key}`)) return idempotentResults.get(`${toolName}:${key}`);
  const audience = typeof input.audience === 'string' ? input.audience : '';
  const approval = input.approval as Partial<HumanApproval> | undefined;
  const issued = approval?.nonce ? issuedApprovals.get(approval.nonce) : undefined;
  if (!issued || !approval || issued.tool_name !== toolName || issued.audience !== audience || issued.expires_at <= Date.now() || approval.human_confirmed !== true) throw new Error('HUMAN_APPROVAL_REQUIRED_OR_EXPIRED');
  issuedApprovals.delete(issued.nonce);
  const result = operation();
  idempotentResults.set(`${toolName}:${key}`, result);
  return result;
}
const ALGOQUEST_EXECUTE_TOOLS = new Set(['algoquest_admit_return_receipt', 'algoquest_advance_hero_book']);
const approvalSchema = { type: 'object', properties: { tool_name: { type: 'string' }, audience: { type: 'string' }, nonce: { type: 'string' }, expires_at: { type: 'number' }, human_confirmed: { const: true } }, required: ['tool_name', 'audience', 'nonce', 'expires_at', 'human_confirmed'], additionalProperties: false };
function valueSchema(key: string): Record<string, unknown> {
  if (['state', 'context', 'companion_context', 'artifact_receipt'].includes(key)) return { type: 'object' };
  if (['choices', 'cards'].includes(key)) return { type: 'array' };
  if (['expected_revision', 'sides'].includes(key)) return { type: 'integer' };
  return { type: 'string' };
}
function closedToolSchema(tool: WebMcpTool): Record<string, unknown> {
  const properties = Object.fromEntries(Object.keys(tool.inputSchema).map((key) => [key, valueSchema(key)]));
  return { type: 'object', properties: { ...properties, approval: approvalSchema, audience: { type: 'string', minLength: 1 }, idempotencyKey: { type: 'string', pattern: '^[A-Za-z0-9_-]{12,128}$' } }, required: tool.mode === 'EXECUTE' ? [...Object.keys(tool.inputSchema), 'approval', 'audience', 'idempotencyKey'] : Object.keys(tool.inputSchema), additionalProperties: false };
}

export const ALGOQUEST_WEBMCP_TOOLS: WebMcpTool[] = ([
  { name: 'algoquest_list_hero_books', mode: 'READ', description: 'List the six governed Hero Books and their honest capability decks.', inputSchema: {}, handler: () => ({ hero_books: heroWorldRegistry, decks: HERO_BOOK_DECKS }) },
  { name: 'algoquest_inspect_hero_context', mode: 'READ', description: 'Read a sanitized Hero Book cockpit projection.', inputSchema: { state: 'optional HeroBookPanelState.v1' }, handler: (input) => heroBookCompanionProjection(asState(input)) },
  { name: 'algoquest_inspect_character_sheet', mode: 'READ', description: 'Read declared role, narrative level and preferences.', inputSchema: {}, handler: (input) => ({ hero: asState(input).hero, canonical_state_owner: 'algoquest' }) },
  { name: 'algoquest_inspect_inventory', mode: 'READ', description: 'Read fictional tools and equipment; symbolic weapons contain no real-world weapon instructions.', inputSchema: {}, handler: (input) => ({ inventory: asState(input).inventory }) },
  { name: 'algoquest_inspect_talents', mode: 'READ', description: 'Read declared talents only.', inputSchema: {}, handler: (input) => ({ talents: asState(input).talents }) },
  { name: 'algoquest_list_available_prompts', mode: 'READ', description: 'List only available cards from the active versioned deck.', inputSchema: {}, handler: (input) => ({ capabilities: (HERO_BOOK_DECKS.find((deck) => deck.hero_book_id === asState(input).hero_book_id)?.capabilities || []).filter((card) => card.status === 'available') }) },
  { name: 'algoquest_stage_hero_decision', mode: 'STAGE', description: 'Validate and stage a learner decision; no progression is modified.', inputSchema: { prompt_id: 'string', choices: 'string[]', chosen: 'string', justification: 'string' }, handler: (input) => { noSecrets(input); const choices = Array.isArray(input.choices) ? input.choices.filter((item): item is string => typeof item === 'string') : []; if (!choices.includes(String(input.chosen)) || !String(input.justification || '').trim()) throw new Error('INVALID_HERO_BOOK_DECISION'); return { staged: true, proposal: { prompt_id: input.prompt_id, choices, chosen: input.chosen, justification: input.justification }, requires_algoquest_commit: true }; } },
  { name: 'algoquest_prepare_specialist_mission', mode: 'STAGE', description: 'Prepare a sanitized mission packet for a specialist without giving progression authority.', inputSchema: { specialist: 'string' }, handler: (input) => { noSecrets(input); const state = asState(input); const specialist = String(input.specialist || 'algorithm-builder'); return { staged: true, mission: { mission: state.mission, context: heroBookCompanionProjection(state), specialist, return_channel: 'qbit-plan-handoff' }, canonical_state_owner: 'algoquest' }; } },
  { name: 'algoquest_admit_return_receipt', mode: 'EXECUTE', description: 'Admit an opaque, validated return receipt into the AlgoQuest journal.', inputSchema: { expected_revision: 'integer', receipt_ref: 'opaque string' }, handler: (input) => executeWithApproval('algoquest_admit_return_receipt', input, () => { const ref = receiptRef(input); if (!ref) throw new Error('INVALID_RETURN_RECEIPT_REFERENCE'); const state = asState(input); const next = appendMissionJournal(state, revision(input), 'Return', 'Specialist receipt admitted for review.', ref); return { state: next, admitted: true, evidence_decision: 'pending_algoquest_review' }; }) },
  { name: 'algoquest_advance_hero_book', mode: 'EXECUTE', description: 'Advance the mission journal only through AlgoQuest with an optimistic revision.', inputSchema: { expected_revision: 'integer', stage: 'Mission|Build|Check|Colab|Return|Reflect', note: 'string' }, handler: (input) => executeWithApproval('algoquest_advance_hero_book', input, () => { const stage = String(input.stage) as typeof HERO_BOOK_STAGES[number]; if (!HERO_BOOK_STAGES.includes(stage)) throw new Error('INVALID_HERO_BOOK_STAGE'); const next = appendMissionJournal(asState(input), revision(input), stage, String(input.note || 'AlgoQuest progression update.')); return { state: next, canonical_state_owner: 'algoquest' }; }) },
  { name: 'securedme_companion_context', mode: 'READ', description: 'Read the shared sanitized companion context.', inputSchema: {}, handler: (input) => heroBookCompanionProjection(asState(input)) },
  { name: 'securedme_qbit_plan_handoff', mode: 'STAGE', description: 'Stage a Qbit return plan without changing Hero Book progression.', inputSchema: { specialist: 'string' }, handler: (input) => ({ staged: true, return_channel: 'qbit-plan-handoff', specialist: String(input.specialist || 'qbit'), context: heroBookCompanionProjection(asState(input)), canonical_state_owner: 'algoquest' }) },
 ] as WebMcpTool[]).map((tool): WebMcpTool => ({
  ...tool,
  inputSchema: closedToolSchema(tool),
}));

/** Browser registration is best-effort and never changes tool behaviour if WebMCP is absent. */
export function registerAlgoQuestWebMcp(target: unknown = typeof document === 'undefined' ? null : document): number {
  const maybe = target as { modelContext?: { registerTool?: (tool: unknown) => void } } | null;
  if (!maybe?.modelContext?.registerTool) return 0;
  ALGOQUEST_WEBMCP_TOOLS.forEach((tool) => maybe.modelContext!.registerTool!({ name: tool.name, description: tool.description, inputSchema: tool.inputSchema, execute: tool.handler }));
  return ALGOQUEST_WEBMCP_TOOLS.length;
}

export function executeAlgoQuestWebMcp(name: string, input: Record<string, unknown> = {}) { const tool = ALGOQUEST_WEBMCP_TOOLS.find((candidate) => candidate.name === name); if (!tool) throw new Error('UNKNOWN_WEBMCP_TOOL'); return tool.handler(input); }
