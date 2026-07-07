import {
  buildInstallSequence,
  emitLearningEvent,
  emitMetricsEnvelope,
  emitTeacherEvent,
  requestQbitPlan,
} from '../services/qbitCompanion';
import { EducationMetricsEnvelope, QbitIntervention, StudentLearningEvent, TeacherPlanningEvent } from '../types';

export const vadValidatedAlgorithmEvent: StudentLearningEvent = emitLearningEvent({
  app_slug: 'visual-algorithm',
  artifact_ref: 'vad:validated-algorithm:artifact-pointer',
  skill_area: 'algorithm_design',
  difficulty_band: 'grade5-sec2',
  score: 93,
  threshold: 93,
  attempt_count: 2,
  blocked_reason: '',
  next_step_hint: 'Turn this validated design into an AlgoQuest challenge, then request a privacy review before sharing.',
  qbit_help_accepted: true,
  risk_flags: ['privacy', 'secret'],
});

export const teacherPlanningEvent: TeacherPlanningEvent = emitTeacherEvent({
  app_slug: 'algoquest',
  classroom_scope: 'classroom-redacted',
  aggregate_need: 'extend_high_score_artifact',
  rubric_ref: 'rubric:algorithm-design',
  activity_ref: 'activity:validated-algorithm-lab',
  risk_flags: ['privacy', 'secret'],
  tool_recommendation: 'vot-guardian',
  intervention_plan_ref: 'redacted-plan-pending',
  aggregation_count: 3,
});

export const studentMetrics: EducationMetricsEnvelope[] = [
  emitMetricsEnvelope({
    surface: 'student',
    metric_store: 'student',
    app_slug: 'visual-algorithm',
    event_type: 'validated_algorithm_score',
    count: 1,
    latency_ms: 42,
    redaction_status: 'none',
    dimensions: { score: 93, threshold: 93, attempt_count: 2 },
  }),
  emitMetricsEnvelope({
    surface: 'student',
    metric_store: 'student',
    app_slug: 'algoquest',
    event_type: 'qbit_help_accepted',
    count: 1,
    latency_ms: 26,
    redaction_status: 'none',
    dimensions: { next_step_completed: false },
  }),
];

export const teacherMetrics: EducationMetricsEnvelope[] = [
  emitMetricsEnvelope({
    surface: 'teacher',
    metric_store: 'teacher',
    app_slug: 'algoquest',
    event_type: 'aggregate_blockers',
    count: 3,
    latency_ms: 34,
    redaction_status: 'aggregate',
    dimensions: { aggregate_blockers: 1, activity_completion_rate: 67, rubric_gap: 1 },
  }),
  emitMetricsEnvelope({
    surface: 'teacher',
    metric_store: 'teacher',
    app_slug: 'algoquest',
    event_type: 'tool_recommendation_count',
    count: 1,
    latency_ms: 31,
    redaction_status: 'aggregate',
    dimensions: { intervention_plan_created: false, classroom_risk_flag: true },
  }),
];

export const installSequence = buildInstallSequence('visual-algorithm', 'student_minor', 'enable_for_suite');

export const qbitStudentIntervention: QbitIntervention = requestQbitPlan(
  'student',
  'validated_algorithm_promoted',
  'vot-guardian',
  'suite',
);

export const qbitTeacherIntervention: QbitIntervention = requestQbitPlan(
  'teacher',
  'classroom_planning_gap',
  'algoquest',
  'tool',
);

export const suiteAppsToConnect = [
  'visual-algorithm',
  'vot-guardian',
  'algorithm-builder',
  'fnpqnn',
  'gateway',
  'ffed-qlc',
  'quanthor',
  'synthia',
  'scholarium',
  'market-guardian',
  'tesla-workbench',
];
