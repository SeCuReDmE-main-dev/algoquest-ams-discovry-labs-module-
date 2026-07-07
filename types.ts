
export enum SectionId {
  Home = 'home',
  ProblemTypes = 'problem-types',
  BuildAlgo = 'build-algo',
  Performance = 'performance',
  Paradigms = 'paradigms',
  Innovation = 'innovation',
}

export type EducationSurface = 'student' | 'teacher';

export type GatewayRole = 'student_minor' | 'student_adult' | 'teacher';

export type ConsentScope = 'none' | 'tool' | 'suite';

export type QbitState = 'badge' | 'nudge' | 'planner' | 'quiet' | 'disabled';

export interface EducationSessionRole {
  schema: 'securedme.education.session-role.v1';
  session_id: string;
  fingerprint_ref: string;
  role: GatewayRole;
  age_band: string;
  surface: EducationSurface;
  consent_scope: ConsentScope;
  allowed_tools: string[];
  expires_at: string;
  contract_version: 'v1';
  raw_secret_stored: false;
}

export interface StudentLearningEvent {
  schema: 'securedme.education.student-learning-event.v1';
  event_id: string;
  app_slug: string;
  artifact_ref: string;
  skill_area: string;
  difficulty_band: string;
  score: number;
  threshold: number;
  attempt_count: number;
  blocked_reason: string;
  next_step_hint: string;
  qbit_help_accepted: boolean;
  risk_flags: string[];
  created_at: string;
  contract_version: 'v1';
  raw_secret_stored: false;
}

export interface GuardianArtifactPointer {
  schema: 'securedme.education.artifact-pointer.v1';
  pointer_id: string;
  source_app: string;
  target_app: 'vot-guardian';
  artifact_ref: string;
  risk_flags: string[];
  consent_required: true;
  consent_scope: 'tool' | 'suite';
  created_at: string;
  contract_version: 'v1';
  raw_payload_embedded: false;
  raw_secret_stored: false;
}

export interface TeacherPlanningEvent {
  schema: 'securedme.education.teacher-planning-event.v1';
  event_id: string;
  app_slug: string;
  classroom_scope: string;
  aggregate_need: string;
  rubric_ref: string;
  activity_ref: string;
  risk_flags: string[];
  tool_recommendation: string;
  intervention_plan_ref: string;
  aggregation_count: number;
  redaction_status: 'redacted';
  created_at: string;
  contract_version: 'v1';
  raw_secret_stored: false;
}

export interface EducationMetricsEnvelope {
  schema: 'securedme.education.metrics-envelope.v1';
  metric_id: string;
  surface: EducationSurface | 'install';
  metric_store: EducationSurface | 'install';
  app_slug: string;
  event_type: string;
  count: number;
  latency_ms: number;
  contract_version: 'v1';
  redaction_status: 'redacted' | 'aggregate' | 'none';
  dimensions: Record<string, string | number | boolean>;
  created_at: string;
  raw_secret_stored: false;
}

export interface QbitIntervention {
  schema: 'securedme.education.qbit-intervention.v1';
  intervention_id: string;
  surface: EducationSurface;
  trigger_reason: string;
  severity: 'info' | 'help' | 'warning' | 'blocked';
  message_key: string;
  suggested_tool: string;
  requires_consent: boolean;
  requires_teacher: boolean;
  action_plan_ref: string;
  state: QbitState;
  created_at: string;
  contract_version: 'v1';
  raw_secret_stored: false;
}

export interface GatewayInstallSequence {
  schema: 'securedme.education.gateway-install-sequence.v1';
  install_id: string;
  requested_tool_slug: string;
  doctor_status: 'passed' | 'failed';
  algoquest_offer_status: 'enable_for_this_tool' | 'enable_for_suite' | 'skip_for_now';
  selected_tool_status: 'pending' | 'blocked' | 'installed';
  fingerprint_ref: string;
  role: GatewayRole;
  created_at: string;
  contract_version: 'v1';
  install_order: ['gateway_doctor', 'algoquest_companion_offer', 'selected_tool'];
  stored_material: 'choice_scope_only';
  raw_secret_stored: false;
  dry_run: true;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface ProblemTypeQuestion {
  id: number;
  questionText: string;
  options: QuizOption[];
  explanation?: string; // Optional explanation for after submission
}

export interface AlgorithmStepType {
  id: string;
  text: string;
}

export interface BarData {
  value: number;
  id: string; // For key prop
  state?: 'default' | 'comparing' | 'swapped' | 'sorted' | 'pivot';
}

export interface GreedyNode {
  id: string;
  label: string;
  x: number;
  y: number;
  isEndpoint?: boolean; // S or E
}

export interface GreedyEdge {
  from: string;
  to: string;
  cost: number;
  id: string;
}

export interface GreedyGraph {
  nodes: GreedyNode[];
  edges: GreedyEdge[];
}
    
