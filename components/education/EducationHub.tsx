import React, { useEffect, useMemo, useState } from 'react';
import algoQuestTinyMark from '../../assets/brand-selected/algoquest-tiny-mark.png';
import {
  installSequence,
  qbitStudentIntervention,
  qbitTeacherIntervention,
  suiteAppsToConnect,
  teacherPlanningEvent,
  vadValidatedAlgorithmEvent,
} from '../../data/educationFixtures';
import {
  buildStudentMetricsFromLearningEvent,
  buildInstallMetricsFromSequence,
  buildTeacherMetricsFromLearningEvent,
  buildTeacherPlanningFromLearningEvent,
  persistInstallSequence,
  readInstallSequenceFromStorage,
  readLatestGuardianPointer,
  readLatestVadLearningEvent,
} from '../../services/educationInterop';
import {
  buildSession,
  expectedSurfaceForRole,
  getConsentScope,
  renderQbitBadge,
  renderQbitNudge,
  renderQbitPlanner,
  validateGatewayContext,
} from '../../services/qbitCompanion';
import {
  EducationMetricsEnvelope,
  EducationSurface,
  ConsentScope,
  GatewayInstallSequence,
  GatewayRole,
  GuardianArtifactPointer,
  QbitIntervention,
  StudentLearningEvent,
  TeacherPlanningEvent,
} from '../../types';

interface EducationHubProps {
  surface: EducationSurface;
  onNavigateSurface: (surface: EducationSurface) => void;
  onOpenLearningLab: () => void;
}

const routeLabel: Record<EducationSurface, string> = {
  student: '/student',
  teacher: '/teacher',
};

const Icon: React.FC<{ path: string; className?: string }> = ({ path, className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const StatusPill: React.FC<{ label: string; tone?: 'green' | 'blue' | 'amber' | 'slate' }> = ({ label, tone = 'slate' }) => {
  const tones = {
    green: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    blue: 'border-sky-200 bg-sky-50 text-sky-800',
    amber: 'border-amber-200 bg-amber-50 text-amber-800',
    slate: 'border-slate-200 bg-white text-slate-700',
  };
  return <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{label}</span>;
};

const audienceCopy = (role: GatewayRole) =>
  role === 'student_minor'
    ? { label: 'Beginner-safe student workflow', tone: 'blue' as const }
    : role === 'student_adult'
      ? { label: 'Adult learner workflow', tone: 'slate' as const }
      : { label: 'Teacher planning workflow', tone: 'green' as const };

const offerCopy = (status: GatewayInstallSequence['doctor_status']): string =>
  status === 'passed' ? 'Doctor checks passed' : 'Doctor checks failed';

const sequenceCopy = (status: GatewayInstallSequence['algoquest_offer_status']): string => {
  if (status === 'enable_for_this_tool') {
    return 'Enable only for the selected tool';
  }
  if (status === 'enable_for_suite') {
    return 'Enable for the full suite after secure onboarding';
  }
  return 'Offer skipped for now';
};

const ConsentScopeBadge: React.FC<{ scope: ConsentScope }> = ({ scope }) => (
  <StatusPill label={`consent: ${scope}`} tone={scope === 'none' ? 'amber' : 'blue'} />
);

const suiteToolStatus = (
  toolSlug: string,
  requestedToolSlug: string,
  consentScope: ConsentScope,
  selectedToolStatus: GatewayInstallSequence['selected_tool_status'],
): 'all' | 'selected' | 'locked' => {
  if (consentScope === 'suite') {
    return 'all';
  }
  if (toolSlug !== requestedToolSlug) {
    return 'locked';
  }
  return selectedToolStatus === 'installed' ? 'selected' : 'locked';
};

const SuiteConnectionQueue: React.FC<{
  tools: string[];
  requestedTool: string;
  consentScope: ConsentScope;
  selectedToolStatus: GatewayInstallSequence['selected_tool_status'];
}> = ({ tools, requestedTool, consentScope, selectedToolStatus }) => {
  return (
    <div className="mt-3 space-y-2">
      {tools.map((tool) => {
        const status = suiteToolStatus(tool, requestedTool, consentScope, selectedToolStatus);
        const isSelected = tool === requestedTool;

        const classes =
          status === 'all'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
            : status === 'selected'
              ? 'border-sky-200 bg-sky-50 text-sky-900'
              : isSelected
                ? 'border-amber-200 bg-amber-50 text-amber-900'
                : 'border-slate-200 bg-white text-slate-500';

        const label = status === 'all' ? 'suite' : isSelected ? selectedToolStatus : 'waiting';

        return (
          <div
            key={tool}
            className={`rounded-md border px-2 py-1 text-xs font-semibold ${classes}`}
          >
            <div className="flex items-center justify-between">
              <span>{tool}</span>
              <span className="uppercase tracking-wide">{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const roleLabel = (role: GatewayRole): string =>
  role === 'student_minor' ? 'Minor learner profile' : role === 'student_adult' ? 'Adult learner profile' : 'Teacher profile';

const roleDescription = (role: GatewayRole): string => {
  if (role === 'student_minor') {
    return 'Beginner-safe flow, step-by-step defaults, no advanced planning assumptions.';
  }
  if (role === 'student_adult') {
    return 'Adult learner flow with full content depth and independent pacing.';
  }
  return 'Teacher-first view focused on aggregate planning signals.';
};

const QbitPanel: React.FC<{
  intervention: QbitIntervention;
  enabled: boolean;
  reducedMotion: boolean;
  onEnable: () => void;
  onSkip: () => void;
}> = ({ intervention, enabled, reducedMotion, onEnable, onSkip }) => (
  <aside className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
    <div className="flex items-center gap-3">
      <img src={algoQuestTinyMark} alt="AlgoQuest Qbit mark" className="h-12 w-12 rounded-md object-contain" />
      <div>
        <p className="text-sm font-bold text-slate-900">{enabled ? renderQbitBadge(intervention) : 'Qbit quiet'}</p>
        <p className="text-xs text-slate-500">{reducedMotion ? 'Reduced motion on' : 'Motion restrained'}</p>
      </div>
    </div>
    <p className="mt-3 text-sm leading-6 text-slate-700">
      {enabled ? renderQbitNudge(intervention) : 'The companion stays silent and records no extra interaction beyond the Gateway choice.'}
    </p>
    <p className="mt-2 text-xs font-semibold text-slate-500">Plan ref: {enabled ? renderQbitPlanner(intervention) : 'disabled-by-user'}</p>
    <div className="mt-4 grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={onEnable}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <Icon path="M5 12l4 4L19 6" />
        Enable
      </button>
      <button
        type="button"
        onClick={onSkip}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        <Icon path="M18 6L6 18M6 6l12 12" />
        Skip
      </button>
    </div>
  </aside>
);

const SurfaceGuard: React.FC<{ errors: string[]; surface: EducationSurface; children: React.ReactNode }> = ({ errors, surface, children }) => {
  if (!errors.length) {
    return <>{children}</>;
  }
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-6">
      <h2 className="text-xl font-black text-slate-900">Gateway blocked {routeLabel[surface]}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
        This surface requires a matching WebAuth fingerprint and Gateway role. AlgoQuest does not switch roles locally.
      </p>
      <ul className="mt-4 space-y-2 text-sm font-semibold text-amber-900">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </section>
  );
};

const StudentSurface: React.FC<{
  learningEvent: StudentLearningEvent;
  guardianPointer: GuardianArtifactPointer | null;
  metrics: EducationMetricsEnvelope[];
  installMetrics: EducationMetricsEnvelope[];
  qbitEnabled: boolean;
  reducedMotion: boolean;
  onEnableQbit: () => void;
  onSkipQbit: () => void;
}> = ({ learningEvent, guardianPointer, metrics, installMetrics, qbitEnabled, reducedMotion, onEnableQbit, onSkipQbit }) => (
  <div className="grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-950">Validated Algorithm</h2>
          <p className="mt-1 text-sm text-slate-600">Visual Algorithm Designer artifact promoted into AlgoQuest.</p>
        </div>
        <StatusPill label={`score ${learningEvent.score} / threshold ${learningEvent.threshold}`} tone="green" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Skill area</p>
          <p className="mt-2 text-lg font-black text-slate-900">{learningEvent.skill_area.replace(/_/g, ' ')}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Attempts</p>
          <p className="mt-2 text-lg font-black text-slate-900">{learningEvent.attempt_count}</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Risk flags</p>
          <p className="mt-2 text-lg font-black text-amber-950">{learningEvent.risk_flags.length ? learningEvent.risk_flags.join(' + ') : 'none'}</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-sky-100 bg-sky-50 p-4">
        <p className="text-sm font-bold text-sky-950">Next step</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{learningEvent.next_step_hint}</p>
        <p className="mt-2 break-all text-xs font-semibold text-slate-500">Artifact: {learningEvent.artifact_ref}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">
            <Icon path="M4 12h16M12 4l8 8-8 8" />
            Open Challenge
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300">
            <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            {guardianPointer ? 'Guardian pointer ready' : 'Ask Guardian'}
          </button>
        </div>
      </div>
    </section>

    <div className="space-y-5">
      <QbitPanel
        intervention={qbitStudentIntervention}
        enabled={qbitEnabled}
        reducedMotion={reducedMotion}
        onEnable={onEnableQbit}
        onSkip={onSkipQbit}
      />
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-black text-slate-900">Student metric store</h3>
        <div className="mt-3 space-y-3">
          {metrics.map((metric) => (
            <div key={metric.metric_id} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">{metric.event_type}</span>
              <span className="text-sm font-black text-slate-900">{metric.count}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-black text-slate-900">Install metric store</h3>
        <div className="mt-3 space-y-3">
          {installMetrics.map((metric) => (
            <div key={metric.metric_id} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">{metric.event_type}</span>
              <span className="text-sm font-black text-slate-900">{metric.count}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const TeacherSurface: React.FC<{
  planningEvent: TeacherPlanningEvent;
  metrics: EducationMetricsEnvelope[];
  installMetrics: EducationMetricsEnvelope[];
  requestedTool: string;
  consentScope: ConsentScope;
  selectedToolStatus: GatewayInstallSequence['selected_tool_status'];
  qbitEnabled: boolean;
  reducedMotion: boolean;
  onEnableQbit: () => void;
  onSkipQbit: () => void;
}> = ({
  planningEvent,
  metrics,
  installMetrics,
  requestedTool,
  consentScope,
  selectedToolStatus,
  qbitEnabled,
  reducedMotion,
  onEnableQbit,
  onSkipQbit,
}) => (
  <div className="grid gap-5 xl:grid-cols-[1.35fr_0.8fr]">
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-950">Planning Console</h2>
          <p className="mt-1 text-sm text-slate-600">Aggregate classroom signal only. No raw student record is shown.</p>
        </div>
        <StatusPill label={planningEvent.redaction_status} tone="green" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Aggregate need</p>
          <p className="mt-2 text-base font-black text-slate-900">{planningEvent.aggregate_need.replace(/_/g, ' ')}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Aggregation</p>
          <p className="mt-2 text-base font-black text-slate-900">{planningEvent.aggregation_count}+ learners</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Recommendation</p>
          <p className="mt-2 text-base font-black text-amber-950">{planningEvent.tool_recommendation}</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-[1fr_auto] border-b border-slate-200 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
          <span>Teacher metric</span>
          <span>Value</span>
        </div>
        {metrics.map((metric) => (
          <div key={metric.metric_id} className="grid grid-cols-[1fr_auto] items-center border-b border-slate-100 px-4 py-3 last:border-b-0">
            <span className="text-sm font-semibold text-slate-700">{metric.event_type.replace(/_/g, ' ')}</span>
            <span className="text-sm font-black text-slate-900">{metric.count}</span>
          </div>
        ))}
      </div>
      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm mt-4">
        <h3 className="text-sm font-black text-slate-900">Install metric store</h3>
        <div className="mt-3 space-y-3">
          {installMetrics.map((metric) => (
            <div key={metric.metric_id} className="grid grid-cols-[1fr_auto] items-center rounded-md bg-white px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">{metric.event_type}</span>
              <span className="text-sm font-black text-slate-900">{metric.count}</span>
            </div>
          ))}
        </div>
      </section>
    </section>

    <div className="space-y-5">
      <QbitPanel
        intervention={qbitTeacherIntervention}
        enabled={qbitEnabled}
        reducedMotion={reducedMotion}
        onEnable={onEnableQbit}
        onSkip={onSkipQbit}
      />
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-black text-slate-900">11 app connection queue</h3>
        <SuiteConnectionQueue
          tools={suiteAppsToConnect}
          requestedTool={requestedTool}
          consentScope={consentScope}
          selectedToolStatus={selectedToolStatus}
        />
      </section>
    </div>
  </div>
);

const EducationHub: React.FC<EducationHubProps> = ({ surface, onNavigateSurface, onOpenLearningLab }) => {
  const [activeInstallSequence, setActiveInstallSequence] = useState<GatewayInstallSequence>(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedTool = params.get('tool');
    const storedSequence = readInstallSequenceFromStorage(installSequence);

    if (requestedTool && suiteAppsToConnect.includes(requestedTool) && storedSequence.requested_tool_slug !== requestedTool) {
      return {
        ...storedSequence,
        requested_tool_slug: requestedTool,
      };
    }

    return storedSequence;
  });
  const [qbitEnabled, setQbitEnabled] = useState<boolean>(getConsentScope(activeInstallSequence) !== 'none');
  const [reducedMotion, setReducedMotion] = useState<boolean>(true);
  const [sessionRole, setSessionRole] = useState<GatewayRole>(() => {
    const searchRole = new URLSearchParams(window.location.search).get('role') as GatewayRole | null;
    if (searchRole === 'student_adult' || searchRole === 'student_minor' || searchRole === 'teacher') {
      if (surface === 'teacher') {
        return 'teacher';
      }
      if (searchRole === 'teacher') {
        return 'student_minor';
      }
      return searchRole;
    }
    return surface === 'teacher' ? 'teacher' : 'student_minor';
  });
  const learningEvent = useMemo(() => readLatestVadLearningEvent(vadValidatedAlgorithmEvent), []);
  const guardianPointer = useMemo(() => readLatestGuardianPointer(), []);
  const planningEvent = useMemo(
    () => (learningEvent === vadValidatedAlgorithmEvent ? teacherPlanningEvent : buildTeacherPlanningFromLearningEvent(learningEvent)),
    [learningEvent],
  );
  const studentMetricRows = useMemo(() => buildStudentMetricsFromLearningEvent(learningEvent), [learningEvent]);
  const teacherMetricRows = useMemo(() => buildTeacherMetricsFromLearningEvent(learningEvent), [learningEvent]);
  const installMetricRows = useMemo(() => buildInstallMetricsFromSequence(activeInstallSequence), [activeInstallSequence]);
  useEffect(() => {
    persistInstallSequence(activeInstallSequence);
  }, [activeInstallSequence]);

  const session = useMemo(() => buildSession(surface === 'teacher' ? 'teacher' : sessionRole, surface), [surface, sessionRole]);

  const guardErrors = validateGatewayContext(session, surface);
  const expectedSurface = expectedSurfaceForRole(session.role);
  const audience = audienceCopy(session.role);
  const consentScope = getConsentScope(activeInstallSequence);

  const installScopeTitle = sequenceCopy(activeInstallSequence.algoquest_offer_status);

  const setRequestedTool = (nextTool: string) => {
    if (!suiteAppsToConnect.includes(nextTool) || activeInstallSequence.requested_tool_slug === nextTool) {
      return;
    }

    const nextSelectedStatus: GatewayInstallSequence['selected_tool_status'] =
      activeInstallSequence.algoquest_offer_status === 'enable_for_suite'
        ? 'installed'
        : activeInstallSequence.algoquest_offer_status === 'skip_for_now'
          ? 'blocked'
          : 'pending';

    const nextState: GatewayInstallSequence = {
      ...activeInstallSequence,
      requested_tool_slug: nextTool,
      selected_tool_status: nextSelectedStatus,
    };
    persistInstallSequence(nextState);
    setActiveInstallSequence(nextState);
    const params = new URLSearchParams(window.location.search);
    params.set('tool', nextTool);
    const basePath = window.location.pathname;
    window.history.replaceState({}, '', `${basePath}${params.toString() ? `?${params}` : ''}`);
  };

  const applyOffer = (nextOffer: GatewayInstallSequence['algoquest_offer_status']) => {
    const nextState: GatewayInstallSequence = {
      ...activeInstallSequence,
      algoquest_offer_status: nextOffer,
      selected_tool_status: nextOffer === 'skip_for_now' ? 'blocked' : 'installed',
    };
    const nextScope = getConsentScope(nextState);
    persistInstallSequence(nextState);
    setActiveInstallSequence(nextState);
    setQbitEnabled(nextScope !== 'none');
  };

  const setRole = (nextRole: GatewayRole) => {
    if (surface !== 'teacher' && (nextRole === 'student_minor' || nextRole === 'student_adult')) {
      setSessionRole(nextRole);
      const sequenceByRole = {
        ...activeInstallSequence,
        role: nextRole,
      };
      persistInstallSequence(sequenceByRole);
      setActiveInstallSequence(sequenceByRole);
      const params = new URLSearchParams(window.location.search);
      params.set('role', nextRole);
      const query = params.toString();
      window.history.replaceState({}, '', `/${surface}${query ? `?${query}` : ''}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white p-5 lg:w-72 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-center gap-3">
              <img src={algoQuestTinyMark} alt="" className="h-9 w-9 rounded-md object-contain" />
              <div>
                <p className="text-2xl font-black text-slate-950">AlgoQuest</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Qbit Education Hub</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <StatusPill label="Gateway WebAuth verified" tone="green" />
            <StatusPill label={`role ${session.role}`} tone="blue" />
            <StatusPill label={`expected /${expectedSurface}`} tone="slate" />
            <StatusPill label={audience.label} tone={audience.tone} />
            <ConsentScopeBadge scope={consentScope} />
            {surface === 'student' && (
              <p className="px-2 text-xs font-semibold leading-5 text-slate-600">
                {roleDescription(sessionRole)}
              </p>
            )}
          </div>

          <nav className="mt-8 space-y-2" aria-label="Education surfaces">
            {(['student', 'teacher'] as EducationSurface[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onNavigateSurface(item)}
                aria-current={surface === item ? 'page' : undefined}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                  surface === item ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item === 'student' ? 'Student Surface' : 'Teacher Surface'}</span>
                <Icon path="M9 18l6-6-6-6" />
              </button>
            ))}
            <button
              type="button"
              onClick={onOpenLearningLab}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <span>Learning Lab</span>
              <Icon path="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
            </button>
          </nav>

          {surface === 'student' && (
            <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Learner profile</p>
              <div className="mt-3 grid gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student_minor')}
                  className={`rounded-md border px-3 py-2 text-left text-sm font-semibold ${
                    sessionRole === 'student_minor' ? 'bg-slate-950 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {roleLabel('student_minor')}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('student_adult')}
                  className={`rounded-md border px-3 py-2 text-left text-sm font-semibold ${
                    sessionRole === 'student_adult' ? 'bg-slate-950 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {roleLabel('student_adult')}
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Install order</p>
            <ol className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
              {installSequence.install_order.map((step) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  {step.replace(/_/g, ' ')}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Target app selection</p>
            <div className="mt-3 grid grid-cols-1 gap-2">
              {suiteAppsToConnect.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => setRequestedTool(tool)}
                  className={`rounded-md border px-3 py-2 text-left text-xs font-semibold ${
                    activeInstallSequence.requested_tool_slug === tool
                      ? 'border-sky-300 bg-sky-50 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Gateway contract snapshot</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start justify-between gap-2">
                <span>Doctor check</span>
                <span className="font-semibold">{offerCopy(activeInstallSequence.doctor_status)}</span>
              </li>
              <li className="flex items-start justify-between gap-2">
                <span>AlgoQuest offer</span>
                <span className="font-semibold">{installScopeTitle}</span>
              </li>
              <li className="flex items-start justify-between gap-2">
                <span>Target tool</span>
                <span className="font-semibold">{activeInstallSequence.requested_tool_slug}</span>
              </li>
              <li className="flex items-start justify-between gap-2">
                <span>Selection state</span>
                <span className="font-semibold">{activeInstallSequence.selected_tool_status}</span>
              </li>
              <li className="flex items-start justify-between gap-2">
                <span>Choice record</span>
                <span className="font-semibold">{activeInstallSequence.dry_run ? 'dry-run only' : 'persisted'}</span>
              </li>
            </ul>
            <div className="mt-3 grid gap-2">
              <button
                type="button"
                onClick={() => applyOffer('enable_for_this_tool')}
                className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900 hover:bg-emerald-100"
              >
                Enable for this tool
              </button>
              <button
                type="button"
                onClick={() => applyOffer('enable_for_suite')}
                className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-900 hover:bg-sky-100"
              >
                Enable for suite
              </button>
              <button
                type="button"
                onClick={() => applyOffer('skip_for_now')}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Skip for now
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-950">{surface === 'student' ? 'Student Algorithm Path' : 'Teacher Planning Surface'}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {surface === 'student'
                  ? session.role === 'student_adult'
                    ? 'A safe but non-restrictive transition from a validated Visual Algorithm Designer artifact to your next study action.'
                    : 'A structured path from a validated Visual Algorithm Designer artifact to your next AlgoQuest action.'
                  : 'A redacted planning surface built from aggregate learning events and contract-safe metrics.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill label={routeLabel[surface]} tone="blue" />
              <StatusPill label="raw secrets blocked" tone="green" />
              <StatusPill label={qbitEnabled ? 'Qbit active' : 'Qbit skipped'} tone={qbitEnabled ? 'blue' : 'amber'} />
              <button
                type="button"
                onClick={() => setReducedMotion((value) => !value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                {reducedMotion ? 'Reduced motion on' : 'Reduced motion off'}
              </button>
            </div>
          </header>

          <SurfaceGuard errors={guardErrors} surface={surface}>
            {surface === 'student' ? (
              <StudentSurface
                learningEvent={learningEvent}
                guardianPointer={guardianPointer}
                metrics={studentMetricRows}
                installMetrics={installMetricRows}
                qbitEnabled={qbitEnabled}
                reducedMotion={reducedMotion}
                onEnableQbit={() => setQbitEnabled(true)}
                onSkipQbit={() => setQbitEnabled(false)}
              />
            ) : (
              <TeacherSurface
                planningEvent={planningEvent}
                metrics={teacherMetricRows}
                installMetrics={installMetricRows}
                requestedTool={activeInstallSequence.requested_tool_slug}
                consentScope={consentScope}
                selectedToolStatus={activeInstallSequence.selected_tool_status}
                qbitEnabled={qbitEnabled}
                reducedMotion={reducedMotion}
                onEnableQbit={() => setQbitEnabled(true)}
                onSkipQbit={() => setQbitEnabled(false)}
              />
            )}
          </SurfaceGuard>
        </main>
      </div>
    </div>
  );
};

export default EducationHub;
