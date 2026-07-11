import {
  EducationMetricsEnvelope,
  GatewayInstallSequence,
  GuardianArtifactPointer,
  StudentLearningEvent,
  TeacherPlanningEvent,
} from '../types';
import {
  emitMetricsEnvelope,
  emitTeacherEvent,
  getConsentScope,
  hasSecretLikeField,
} from './qbitCompanion';

export const ALGOQUEST_OUTBOX_STORAGE_KEY = 'securedme.education.algoquest.outbox.v1';
export const GUARDIAN_OUTBOX_STORAGE_KEY = 'securedme.education.vot-guardian.outbox.v1';
export const INSTALL_SEQUENCE_STORAGE_KEY = 'securedme.education.algoquest.install-sequence.v1';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

function readStorageArray(key: string): unknown[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const readStorageObject = (key: string): Record<string, unknown> | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || 'null');
    return isRecord(parsed) ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function isStudentLearningEvent(value: unknown): value is StudentLearningEvent {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.schema === 'securedme.education.student-learning-event.v1' &&
    value.app_slug === 'visual-algorithm' &&
    typeof value.artifact_ref === 'string' &&
    value.artifact_ref.startsWith('vad:validated-algorithm:') &&
    typeof value.score === 'number' &&
    typeof value.threshold === 'number' &&
    value.score >= value.threshold &&
    value.raw_secret_stored === false &&
    !hasSecretLikeField(value)
  );
}

export function isGuardianArtifactPointer(value: unknown): value is GuardianArtifactPointer {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.schema === 'securedme.education.artifact-pointer.v1' &&
    value.target_app === 'vot-guardian' &&
    typeof value.artifact_ref === 'string' &&
    value.artifact_ref.startsWith('vad:validated-algorithm:') &&
    value.consent_required === true &&
    value.raw_payload_embedded === false &&
    value.raw_secret_stored === false &&
    !hasSecretLikeField(value)
  );
}

export function isGatewayInstallSequence(value: unknown): value is GatewayInstallSequence {
  if (!isRecord(value)) {
    return false;
  }
  return (
    value.schema === 'securedme.education.gateway-install-sequence.v1' &&
    typeof value.install_id === 'string' &&
    typeof value.requested_tool_slug === 'string' &&
    (value.doctor_status === 'passed' || value.doctor_status === 'failed') &&
    ['enable_for_this_tool', 'enable_for_suite', 'skip_for_now'].includes(value.algoquest_offer_status) &&
    ['pending', 'blocked', 'installed'].includes(value.selected_tool_status) &&
    typeof value.fingerprint_ref === 'string' &&
    ['student_minor', 'student_adult', 'teacher'].includes(value.role) &&
    typeof value.created_at === 'string' &&
    value.contract_version === 'v1' &&
    value.raw_secret_stored === false &&
    !hasSecretLikeField(value)
  );
}

export function readLatestVadLearningEvent(fallback: StudentLearningEvent): StudentLearningEvent {
  return readStorageArray(ALGOQUEST_OUTBOX_STORAGE_KEY).find(isStudentLearningEvent) ?? fallback;
}

export function readLatestGuardianPointer(): GuardianArtifactPointer | null {
  return readStorageArray(GUARDIAN_OUTBOX_STORAGE_KEY).find(isGuardianArtifactPointer) ?? null;
}

export function readInstallSequenceFromStorage(fallback: GatewayInstallSequence): GatewayInstallSequence {
  const stored = readStorageObject(INSTALL_SEQUENCE_STORAGE_KEY);
  return stored && isGatewayInstallSequence(stored) ? stored : fallback;
}

export function persistInstallSequence(sequence: GatewayInstallSequence): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (!isGatewayInstallSequence(sequence) || hasSecretLikeField(sequence)) {
    return;
  }
  try {
    window.localStorage.setItem(INSTALL_SEQUENCE_STORAGE_KEY, JSON.stringify(sequence));
  } catch {}
}

export function buildTeacherPlanningFromLearningEvent(event: StudentLearningEvent): TeacherPlanningEvent {
  return emitTeacherEvent({
    app_slug: 'algoquest',
    classroom_scope: 'classroom-redacted',
    aggregate_need: event.risk_flags.length ? 'review_high_score_artifact' : 'extend_high_score_artifact',
    rubric_ref: 'rubric:algorithm-design',
    activity_ref: event.artifact_ref.replace('vad:validated-algorithm:', 'activity:validated-algorithm:'),
    risk_flags: event.risk_flags,
    tool_recommendation: event.risk_flags.some((flag) => ['privacy', 'secret', 'security'].includes(flag))
      ? 'vot-guardian'
      : 'algoquest',
    intervention_plan_ref: 'guardian-plan:pointer-only',
    aggregation_count: 3,
  });
}

export function buildStudentMetricsFromLearningEvent(event: StudentLearningEvent): EducationMetricsEnvelope[] {
  return [
    emitMetricsEnvelope({
      surface: 'student',
      metric_store: 'student',
      app_slug: event.app_slug,
      event_type: 'validated_algorithm_score',
      count: 1,
      latency_ms: 42,
      redaction_status: 'none',
      dimensions: { score: event.score, threshold: event.threshold, attempt_count: event.attempt_count },
    }),
    emitMetricsEnvelope({
      surface: 'student',
      metric_store: 'student',
      app_slug: 'algoquest',
      event_type: 'qbit_help_available',
      count: event.risk_flags.length ? 1 : 0,
      latency_ms: 26,
      redaction_status: 'none',
      dimensions: { next_step_completed: false },
    }),
  ];
}

export function buildTeacherMetricsFromLearningEvent(event: StudentLearningEvent): EducationMetricsEnvelope[] {
  return [
    emitMetricsEnvelope({
      surface: 'teacher',
      metric_store: 'teacher',
      app_slug: 'algoquest',
      event_type: 'aggregate_blockers',
      count: event.risk_flags.length ? 3 : 0,
      latency_ms: 34,
      redaction_status: 'aggregate',
      dimensions: { aggregate_blockers: event.risk_flags.length, activity_completion_rate: 67, rubric_gap: 1 },
    }),
    emitMetricsEnvelope({
      surface: 'teacher',
      metric_store: 'teacher',
      app_slug: 'algoquest',
      event_type: 'tool_recommendation_count',
      count: event.risk_flags.some((flag) => ['privacy', 'secret', 'security'].includes(flag)) ? 1 : 0,
      latency_ms: 31,
      redaction_status: 'aggregate',
      dimensions: { intervention_plan_created: false, classroom_risk_flag: event.risk_flags.length > 0 },
    }),
  ];
}

export function buildInstallMetricsFromSequence(sequence: GatewayInstallSequence): EducationMetricsEnvelope[] {
  const consentScope = getConsentScope(sequence);
  const surface = sequence.role === 'teacher' ? 'teacher' : 'student';
  return [
    emitMetricsEnvelope({
      surface,
      metric_store: 'install',
      app_slug: 'algoquest',
      event_type: 'gateway_install_offer',
      count: 1,
      latency_ms: 15,
      redaction_status: 'redacted',
      dimensions: {
        requested_tool_slug: sequence.requested_tool_slug,
        offer_status: sequence.algoquest_offer_status,
        selected_tool_status: sequence.selected_tool_status,
      },
    }),
    emitMetricsEnvelope({
      surface,
      metric_store: 'install',
      app_slug: 'algoquest',
      event_type: 'gateway_consent_scope',
      count: consentScope === 'none' ? 0 : 1,
      latency_ms: 14,
      redaction_status: 'redacted',
      dimensions: { consent_scope: consentScope },
    }),
  ];
}
