import {
  ConsentScope,
  EducationMetricsEnvelope,
  EducationSessionRole,
  EducationSurface,
  GatewayInstallSequence,
  GatewayRole,
  QbitIntervention,
  StudentLearningEvent,
  TeacherPlanningEvent,
} from '../types';

const now = () => new Date().toISOString();

const forbiddenKeys = new Set([
  '.env',
  'api_key',
  'browser_session',
  'client_secret',
  'cookie',
  'oauth_token',
  'password',
  'raw_chat_log',
  'raw_prompt',
  'roster',
  'secret',
  'session_cookie',
  'student_email',
  'student_id',
  'student_name',
  'token',
]);

const allowedRawProofKeys = new Set(['raw_secret_stored', 'raw_payload_embedded', 'raw_values_printed']);

const stableId = (prefix: string, seed: string): string => {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index);
    hash |= 0;
  }
  return `${prefix}-${Math.abs(hash).toString(16).padStart(8, '0')}`;
};

export const expectedSurfaceForRole = (role: GatewayRole): EducationSurface =>
  role === 'teacher' ? 'teacher' : 'student';

export const getConsentScope = (sequence?: GatewayInstallSequence): ConsentScope => {
  if (!sequence || sequence.algoquest_offer_status === 'skip_for_now') {
    return 'none';
  }
  return sequence.algoquest_offer_status === 'enable_for_suite' ? 'suite' : 'tool';
};

export const hasSecretLikeField = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some(hasSecretLikeField);
  }
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).some(([key, nested]) => {
      const normalized = key.toLowerCase();
      if (allowedRawProofKeys.has(normalized)) {
        return false;
      }
      return forbiddenKeys.has(normalized) || normalized.startsWith('raw_') || hasSecretLikeField(nested);
    });
  }
  if (typeof value === 'string') {
    return /((api[_-]?key|access[_-]?token|refresh[_-]?token|oauth[_-]?token|oauth|token|cookie|password|client[_-]?secret)\s*[:=])|bearer\s+[a-z0-9._~+/=-]{12,}/i.test(value);
  }
  return false;
};

export const validateGatewayContext = (session: EducationSessionRole, surface: EducationSurface): string[] => {
  const errors: string[] = [];
  if (session.schema !== 'securedme.education.session-role.v1') {
    errors.push('invalid-session-schema');
  }
  if (!session.fingerprint_ref) {
    errors.push('missing-fingerprint');
  }
  if (expectedSurfaceForRole(session.role) !== surface || session.surface !== surface) {
    errors.push('role-surface-mismatch');
  }
  if (new Date(session.expires_at).getTime() <= Date.now()) {
    errors.push('session-expired');
  }
  if (session.raw_secret_stored !== false || hasSecretLikeField(session)) {
    errors.push('secret-like-session');
  }
  return errors;
};

export const buildSession = (role: GatewayRole, surface: EducationSurface): EducationSessionRole => ({
  schema: 'securedme.education.session-role.v1',
  session_id: stableId('session', `${role}:${surface}`),
  fingerprint_ref: 'fingerprint-redacted',
  role,
  age_band: role === 'student_minor' ? 'grade5-sec2' : 'adult-or-staff',
  surface,
  consent_scope: 'tool',
  allowed_tools: ['algoquest'],
  expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  contract_version: 'v1',
  raw_secret_stored: false,
});

export const buildInstallSequence = (
  requestedToolSlug: string,
  role: GatewayRole,
  offerStatus: GatewayInstallSequence['algoquest_offer_status'] = 'enable_for_this_tool',
): GatewayInstallSequence => ({
  schema: 'securedme.education.gateway-install-sequence.v1',
  install_id: stableId('install', `${requestedToolSlug}:${role}:${offerStatus}`),
  requested_tool_slug: requestedToolSlug,
  doctor_status: 'passed',
  algoquest_offer_status: offerStatus,
  selected_tool_status: 'pending',
  fingerprint_ref: 'fingerprint-redacted',
  role,
  created_at: now(),
  contract_version: 'v1',
  install_order: ['gateway_doctor', 'algoquest_companion_offer', 'selected_tool'],
  stored_material: 'choice_scope_only',
  raw_secret_stored: false,
  dry_run: true,
});

export const emitLearningEvent = (event: Omit<StudentLearningEvent, 'schema' | 'event_id' | 'created_at' | 'contract_version' | 'raw_secret_stored'>): StudentLearningEvent => ({
  schema: 'securedme.education.student-learning-event.v1',
  event_id: stableId('student-event', `${event.app_slug}:${event.artifact_ref}:${event.score}`),
  ...event,
  created_at: now(),
  contract_version: 'v1',
  raw_secret_stored: false,
});

export const emitTeacherEvent = (event: Omit<TeacherPlanningEvent, 'schema' | 'event_id' | 'created_at' | 'contract_version' | 'raw_secret_stored' | 'redaction_status'>): TeacherPlanningEvent => ({
  schema: 'securedme.education.teacher-planning-event.v1',
  event_id: stableId('teacher-event', `${event.app_slug}:${event.classroom_scope}:${event.activity_ref}`),
  ...event,
  redaction_status: 'redacted',
  created_at: now(),
  contract_version: 'v1',
  raw_secret_stored: false,
});

export const emitMetricsEnvelope = (metric: Omit<EducationMetricsEnvelope, 'schema' | 'metric_id' | 'created_at' | 'contract_version' | 'raw_secret_stored'>): EducationMetricsEnvelope => ({
  schema: 'securedme.education.metrics-envelope.v1',
  metric_id: stableId('metric', `${metric.surface}:${metric.metric_store}:${metric.app_slug}:${metric.event_type}`),
  ...metric,
  created_at: now(),
  contract_version: 'v1',
  raw_secret_stored: false,
});

export const requestQbitPlan = (
  surface: EducationSurface,
  triggerReason: string,
  suggestedTool: string,
  consentScope: ConsentScope,
): QbitIntervention => ({
  schema: 'securedme.education.qbit-intervention.v1',
  intervention_id: stableId('qbit', `${surface}:${triggerReason}:${suggestedTool}`),
  surface,
  trigger_reason: triggerReason,
  severity: suggestedTool === 'vot-guardian' ? 'warning' : 'help',
  message_key: suggestedTool === 'vot-guardian' ? 'qbit.vad.guardian_plan' : 'qbit.algoquest.next_challenge',
  suggested_tool: suggestedTool,
  requires_consent: suggestedTool !== 'algoquest',
  requires_teacher: surface === 'teacher',
  action_plan_ref: suggestedTool === 'vot-guardian' ? 'guardian-plan:pointer-only' : 'algoquest-plan:next-challenge',
  state: consentScope === 'none' ? 'quiet' : 'nudge',
  created_at: now(),
  contract_version: 'v1',
  raw_secret_stored: false,
});

export const renderQbitBadge = (intervention: QbitIntervention): string =>
  intervention.state === 'disabled' ? 'Qbit disabled' : `Qbit: ${intervention.message_key}`;

export const renderQbitNudge = (intervention: QbitIntervention): string =>
  intervention.requires_consent ? 'Consent required before opening another Education tool.' : 'Ready inside AlgoQuest.';

export const renderQbitPlanner = (intervention: QbitIntervention): string =>
  `${intervention.suggested_tool}:${intervention.action_plan_ref}`;
