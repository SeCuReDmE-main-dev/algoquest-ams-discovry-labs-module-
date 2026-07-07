import React, { useMemo, useState } from 'react';
import qbitGuide from '../../assets/qbit/qbit-stencil-guide.png';
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
  buildTeacherMetricsFromLearningEvent,
  buildTeacherPlanningFromLearningEvent,
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

const QbitPanel: React.FC<{
  intervention: QbitIntervention;
  enabled: boolean;
  reducedMotion: boolean;
  onEnable: () => void;
  onSkip: () => void;
}> = ({ intervention, enabled, reducedMotion, onEnable, onSkip }) => (
  <aside className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
    <div className="flex items-center gap-3">
      <img src={qbitGuide} alt="Qbit companion" className="h-14 w-14 rounded-md object-contain" />
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
  qbitEnabled: boolean;
  reducedMotion: boolean;
  onEnableQbit: () => void;
  onSkipQbit: () => void;
}> = ({ learningEvent, guardianPointer, metrics, qbitEnabled, reducedMotion, onEnableQbit, onSkipQbit }) => (
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
    </div>
  </div>
);

const TeacherSurface: React.FC<{
  planningEvent: TeacherPlanningEvent;
  metrics: EducationMetricsEnvelope[];
  qbitEnabled: boolean;
  reducedMotion: boolean;
  onEnableQbit: () => void;
  onSkipQbit: () => void;
}> = ({ planningEvent, metrics, qbitEnabled, reducedMotion, onEnableQbit, onSkipQbit }) => (
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
        <div className="mt-3 grid grid-cols-2 gap-2">
          {suiteAppsToConnect.map((slug) => (
            <span key={slug} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
              {slug}
            </span>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const EducationHub: React.FC<EducationHubProps> = ({ surface, onNavigateSurface, onOpenLearningLab }) => {
  const [qbitEnabled, setQbitEnabled] = useState<boolean>(getConsentScope(installSequence) !== 'none');
  const [reducedMotion, setReducedMotion] = useState<boolean>(true);
  const learningEvent = useMemo(() => readLatestVadLearningEvent(vadValidatedAlgorithmEvent), []);
  const guardianPointer = useMemo(() => readLatestGuardianPointer(), []);
  const planningEvent = useMemo(
    () => (learningEvent === vadValidatedAlgorithmEvent ? teacherPlanningEvent : buildTeacherPlanningFromLearningEvent(learningEvent)),
    [learningEvent],
  );
  const studentMetricRows = useMemo(() => buildStudentMetricsFromLearningEvent(learningEvent), [learningEvent]);
  const teacherMetricRows = useMemo(() => buildTeacherMetricsFromLearningEvent(learningEvent), [learningEvent]);

  const session = useMemo(() => {
    const searchRole = new URLSearchParams(window.location.search).get('role') as GatewayRole | null;
    const role = searchRole || (surface === 'teacher' ? 'teacher' : 'student_minor');
    return buildSession(role, surface);
  }, [surface]);

  const guardErrors = validateGatewayContext(session, surface);
  const expectedSurface = expectedSurfaceForRole(session.role);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white p-5 lg:w-72 lg:border-b-0 lg:border-r">
          <div>
            <p className="text-2xl font-black text-slate-950">AlgoQuest</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Qbit Education Hub</p>
          </div>

          <div className="mt-6 space-y-2">
            <StatusPill label="Gateway WebAuth verified" tone="green" />
            <StatusPill label={`role ${session.role}`} tone="blue" />
            <StatusPill label={`expected /${expectedSurface}`} tone="slate" />
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
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-950">{surface === 'student' ? 'Student Algorithm Path' : 'Teacher Planning Surface'}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {surface === 'student'
                  ? 'A beginner-safe path from a validated algorithm artifact to the next AlgoQuest action.'
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
                qbitEnabled={qbitEnabled}
                reducedMotion={reducedMotion}
                onEnableQbit={() => setQbitEnabled(true)}
                onSkipQbit={() => setQbitEnabled(false)}
              />
            ) : (
              <TeacherSurface
                planningEvent={planningEvent}
                metrics={teacherMetricRows}
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
