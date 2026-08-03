import React, { useState, useEffect } from 'react';
import { AlgorithmArtifactReceipt, EducationSurface, SectionId } from './types';
import EducationHub from './components/education/EducationHub';
import HomeSection from './components/sections/HomeSection';
import ProblemTypesSection from './components/sections/ProblemTypesSection';
import BuildAlgoSection from './components/sections/BuildAlgoSection';
import PerformanceSection from './components/sections/PerformanceSection';
import ParadigmsSection from './components/sections/ParadigmsSection';
import InnovationSection from './components/sections/InnovationSection';
import NavButton from './components/ui/NavButton';
import { isAlgorithmArtifactReceipt, readLatestBuilderArtifactReceipt } from './services/educationInterop';
import {
  advanceEntryMissionState,
  audienceProfiles,
  buildOrganizationAggregateProjection,
  buildStudentProjection,
  buildTeacherProjection,
  clearLocalPrivacyReceipts,
  createDataDeletionReceipt,
  createAdventureRun,
  advanceAdventureRuntime,
  createInitialLearningEvidence,
  createInitialQuestState,
  createAdventureRuntime,
  createKnowledgeTokenTransfer,
  decideHierarchicalAccess,
  heroWorldRegistry,
  persistAdventureRuntime,
  persistPrivacyReceipt,
  mageEntryMissionManifest,
  mageMissionEnvelope,
  mageColabNotebookManifest,
  mageTwoHorizonsPrimaryFr,
  persistEntryMissionState,
  readAdventureRuntime,
  readEntryMissionState,
  readPrivacyReceipts,
  revokeKnowledgeTokenTransfer,
  replayAdventureRuntime,
  renderAsciiScene,
  isColabRoundTripReceipt,
  tenebrisPolicy,
} from './services/heroBooks.js';
import landingDark from './assets/landing/landing-dark.png';
import landingLight from './assets/landing/landing-light.png';
import logoIconDark from './assets/landing/logo-icon-dark.png';
import wordmarkDark from './assets/landing/wordmark-dark.png';

const SECTION_ORDER: SectionId[] = [
  SectionId.Home,
  SectionId.ProblemTypes,
  SectionId.BuildAlgo,
  SectionId.Performance,
  SectionId.Paradigms,
  SectionId.Innovation,
];

const SECTION_COPY: Record<SectionId, { title: string; description: string }> = {
  [SectionId.Home]: { title: 'Welcome', description: 'Get oriented and choose your first module.' },
  [SectionId.ProblemTypes]: { title: 'Problem Types Quiz', description: 'Identify whether each prompt is Search, Sort, or Optimization.' },
  [SectionId.BuildAlgo]: { title: 'Build an Algorithm', description: 'Order steps into a correct and efficient solution.' },
  [SectionId.Performance]: { title: 'Linear Search Performance', description: 'See how scanning compares against target position.' },
  [SectionId.Paradigms]: { title: 'Greedy Paradigms', description: 'Choose a local optimum and observe path behavior.' },
  [SectionId.Innovation]: { title: 'Future of Algorithms', description: 'Explore high-level school-safe extensions.' },
};

const SUITE_TARGETS = [
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

const LAB_MODULES = [
  ['01', 'Welcome', 'Get oriented and choose the first supervised learning path.'],
  ['02', 'Problem Types', 'Classify search, sort, optimization, and decision prompts.'],
  ['03', 'Build Algorithm', 'Order steps into a correct beginner-safe solution.'],
  ['04', 'Linear Search', 'Watch target position change scan cost and step count.'],
  ['05', 'Greedy Paradigms', 'Test local choices against path-level consequences.'],
  ['06', 'Future Algorithms', 'Explore school-safe extensions without production claims.'],
];

const HERO_BOOK_PROOF = {
  firstWorld: heroWorldRegistry[0],
  firstManifest: mageTwoHorizonsPrimaryFr,
  audienceCount: audienceProfiles.length,
  tenebrisDefault: tenebrisPolicy.default_status,
};

type UtilityTheme = 'night' | 'day';
type UtilityLanguage = 'en' | 'fr' | 'es';
type UtilityAccess = 'base' | 'autism-calm' | 'adhd-sprint' | 'deep-work';

const LANGUAGE_ORDER: UtilityLanguage[] = ['en', 'fr', 'es'];
const LANGUAGE_LABELS: Record<UtilityLanguage, string> = {
  en: 'Language: EN',
  fr: 'Langue: FR',
  es: 'Idioma: ES',
};

const ACCESS_ORDER: UtilityAccess[] = ['base', 'autism-calm', 'adhd-sprint', 'deep-work'];
const ACCESS_LABELS: Record<UtilityAccess, string> = {
  base: 'Access',
  'autism-calm': 'Autism Calm',
  'adhd-sprint': 'ADHD Sprint',
  'deep-work': 'Deep Work',
};

const UtilityDock: React.FC = () => {
  const [language, setLanguage] = useState<UtilityLanguage>(() => {
    const saved = window.localStorage.getItem('securedme.algoquest.language') as UtilityLanguage | null;
    return saved && LANGUAGE_ORDER.includes(saved) ? saved : 'en';
  });
  const [theme, setTheme] = useState<UtilityTheme>(() => {
    return window.localStorage.getItem('securedme.algoquest.theme') === 'day' ? 'day' : 'night';
  });
  const [access, setAccess] = useState<UtilityAccess>(() => {
    const saved = window.localStorage.getItem('securedme.algoquest.access') as UtilityAccess | null;
    return saved && ACCESS_ORDER.includes(saved) ? saved : 'base';
  });

  useEffect(() => {
    window.localStorage.setItem('securedme.algoquest.language', language);
    document.documentElement.lang = language;
    document.documentElement.dataset.lang = language;
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem('securedme.algoquest.theme', theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === 'day' ? 'light' : 'dark';
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('securedme.algoquest.access', access);
    document.documentElement.dataset.access = access;
  }, [access]);

  const nextLanguage = () => {
    const currentIndex = LANGUAGE_ORDER.indexOf(language);
    setLanguage(LANGUAGE_ORDER[(currentIndex + 1) % LANGUAGE_ORDER.length]);
  };

  const nextAccess = () => {
    const currentIndex = ACCESS_ORDER.indexOf(access);
    setAccess(ACCESS_ORDER[(currentIndex + 1) % ACCESS_ORDER.length]);
  };

  return (
    <aside className="fixed bottom-4 right-4 z-[80] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2" aria-label="SecuredMe utility controls">
      <button
        type="button"
        onClick={nextLanguage}
        className="rounded-full border border-amber-200/70 bg-slate-950/90 px-4 py-2 text-xs font-black text-white shadow-lg shadow-slate-950/40 backdrop-blur hover:border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
        aria-pressed={language !== 'en'}
      >
        {LANGUAGE_LABELS[language]}
      </button>
      <button
        type="button"
        onClick={() => setTheme((current) => (current === 'night' ? 'day' : 'night'))}
        className="rounded-full border border-amber-200/70 bg-slate-950/90 px-4 py-2 text-xs font-black text-white shadow-lg shadow-slate-950/40 backdrop-blur hover:border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
        aria-pressed={theme === 'night'}
      >
        Theme: {theme === 'night' ? 'Night' : 'Day'}
      </button>
      <button
        type="button"
        onClick={nextAccess}
        className="rounded-full border border-amber-200/70 bg-slate-950/90 px-4 py-2 text-xs font-black text-white shadow-lg shadow-slate-950/40 backdrop-blur hover:border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
      >
        {ACCESS_LABELS[access]}
      </button>
      <a
        href="https://securedme.ca/pay/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-cyan-300 bg-gradient-to-r from-sky-500 to-violet-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-blue-950/50 hover:from-sky-400 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
      >
        Support SecuredMe
      </a>
    </aside>
  );
};

const LandingPage: React.FC<{
  onNavigateSurface: (surface: EducationSurface) => void;
  onOpenLearningLab: () => void;
}> = ({ onNavigateSurface, onOpenLearningLab }) => {
  const sourceUrl = 'https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-';
  const [entryState, setEntryState] = useState(() => readEntryMissionState());
  const [builderReceipt, setBuilderReceipt] = useState<AlgorithmArtifactReceipt | null>(() => readLatestBuilderArtifactReceipt());
  const [receiptImport, setReceiptImport] = useState('');
  const [receiptImportStatus, setReceiptImportStatus] = useState('No imported Builder receipt yet.');
  const [colabReceiptImport, setColabReceiptImport] = useState('');
  const [colabReceiptStatus, setColabReceiptStatus] = useState('No imported Colab receipt yet.');
  const [adventureRuntime, setAdventureRuntime] = useState(() => readAdventureRuntime());
  const [replayStatus, setReplayStatus] = useState('Replay not run yet.');
  const [privacyReceipt, setPrivacyReceipt] = useState('No privacy receipt generated yet.');
  const [privacyReceiptCount, setPrivacyReceiptCount] = useState(() => readPrivacyReceipts().length);
  const demoRun = createAdventureRun({ seed: 'ui-demo-privacy' });
  const demoStudentProjection = buildStudentProjection({
    run: demoRun,
    quest_state: createInitialQuestState(demoRun),
    learning_evidence: createInitialLearningEvidence(demoRun),
    entry_state: entryState,
  });
  const demoTeacherProjection = (buildTeacherProjection as any)({
    assigned_run_ids: [demoStudentProjection.run_id],
    student_projection: demoStudentProjection,
  });
  const demoOrganizationAggregate = buildOrganizationAggregateProjection({ cohort_size: 10, completed_count: 8, blocked_count: 2 });
  const demoHierarchyAccess = decideHierarchicalAccess({
    requester_role: 'organization-admin',
    target_kind: 'teacher-private-activity',
    cohort_size: 100,
  });

  useEffect(() => {
    persistEntryMissionState(entryState);
  }, [entryState]);

  useEffect(() => {
    persistAdventureRuntime(adventureRuntime);
  }, [adventureRuntime]);

  const routeSurface = (event: React.MouseEvent<HTMLAnchorElement>, surface: EducationSurface) => {
    event.preventDefault();
    onNavigateSurface(surface);
  };

  const routeLab = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onOpenLearningLab();
  };

  const updateEntry = (
    state: 'ready' | 'guided' | 'retry' | 'hold' | 'completed' | 'abstain',
    assistance_level: 'none' | 'hint' | 'guided' | 'worked-example' = entryState.assistance_level,
    mode: 'textual' | 'guided_notebook' | 'executable_example' = entryState.mode
  ) => {
    setEntryState(advanceEntryMissionState(entryState, { state, assistance_level, mode }));
  };

  const importBuilderReceipt = () => {
    try {
      const parsed = JSON.parse(receiptImport);
      if (!isAlgorithmArtifactReceipt(parsed)) {
        setReceiptImportStatus('Receipt rejected: invalid contract, secret-like field, or missing digest.');
        return;
      }
      setBuilderReceipt(parsed);
      setReceiptImportStatus(`Receipt admitted locally: ${parsed.receipt_id}`);
    } catch {
      setReceiptImportStatus('Receipt rejected: JSON could not be parsed.');
    }
  };

  const importColabReceipt = () => {
    try {
      const parsed = JSON.parse(colabReceiptImport);
      if (!isColabRoundTripReceipt(parsed)) {
        setColabReceiptStatus('Colab receipt rejected: wrong mission, failed test, secret flag, or missing digest.');
        return;
      }
      setColabReceiptStatus(`Colab receipt admitted locally: ${parsed.receipt_digest.slice(0, 20)}...`);
    } catch {
      setColabReceiptStatus('Colab receipt rejected: JSON could not be parsed.');
    }
  };

  const currentPromptNode = mageTwoHorizonsPrimaryFr.prompt_nodes.find((node) => node.prompt_id === adventureRuntime.latest_assignment?.prompt_id)
    ?? mageTwoHorizonsPrimaryFr.prompt_nodes.find((node) => node.prompt_id === adventureRuntime.quest_state.consumed_prompt_ids.at(-1))
    ?? mageTwoHorizonsPrimaryFr.prompt_nodes[0];
  const currentAsciiScene = renderAsciiScene(currentPromptNode);

  const advanceAdventure = async () => {
    const nextRuntime = await advanceAdventureRuntime(adventureRuntime);
    setAdventureRuntime(nextRuntime);
  };

  const resetAdventure = () => {
    setAdventureRuntime(createAdventureRuntime());
    setReplayStatus('Replay reset.');
  };

  const replayAdventure = async () => {
    const report = await replayAdventureRuntime(adventureRuntime);
    setReplayStatus(`${report.status}: ${report.replayed_state_digest.slice(0, 20)}...`);
  };

  const generateTokenRevocation = () => {
    const transfer = createKnowledgeTokenTransfer({
      token_id: 'token:first-proof',
      from_run_id: adventureRuntime.run.run_id,
      consent_scope: 'tool',
      expires_at: '2026-08-04T00:00:00.000Z',
    });
    const receipt = revokeKnowledgeTokenTransfer(transfer);
    persistPrivacyReceipt(receipt);
    setPrivacyReceiptCount(readPrivacyReceipts().length);
    setPrivacyReceipt(JSON.stringify(receipt, null, 2));
  };

  const generateDeletionReceipt = () => {
    const receipt = createDataDeletionReceipt({
      run_id: adventureRuntime.run.run_id,
      scope: 'local-run',
      requested_by: 'learner',
    });
    persistPrivacyReceipt(receipt);
    setPrivacyReceiptCount(readPrivacyReceipts().length);
    setPrivacyReceipt(JSON.stringify(receipt, null, 2));
  };

  const clearPrivacyReceipts = () => {
    const receipt = clearLocalPrivacyReceipts({ requested_by: 'learner' });
    setPrivacyReceiptCount(readPrivacyReceipts().length);
    setPrivacyReceipt(JSON.stringify(receipt, null, 2));
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-blue-300/15 bg-[#050816]/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="https://securedme.ca/" className="flex min-w-0 items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-300" aria-label="Return to SecuredMe home">
            <img src={logoIconDark} alt="" className="h-10 w-10 rounded-md object-cover" />
            <img src={wordmarkDark} alt="AlgoQuest Qbit Education" className="h-9 max-w-[190px] object-contain" />
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-300 md:flex" aria-label="AlgoQuest sections">
            <a href="https://securedme.ca/product/education/" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300">Education</a>
            <a href="#surfaces" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300">Surfaces</a>
            <a href="#lab" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300">Learning Lab</a>
            <a href="#hero-books" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300">Hero Books</a>
            <a href="#contracts" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300">Contracts</a>
            <a href="#suite" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300">Suite</a>
          </nav>
          <a
            href={sourceUrl}
            className="rounded-md border border-violet-300/40 px-3 py-2 text-xs font-black uppercase tracking-wide text-violet-100 hover:bg-violet-500/15 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Source
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-blue-300/10">
          <div className="absolute inset-0 opacity-35" aria-hidden="true">
            <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,.34),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(14,165,233,.25),transparent_30%),linear-gradient(120deg,rgba(14,165,233,.08),transparent_50%)]" />
          </div>
          <div className="relative mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <p className="inline-flex rounded-md border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-200">
                Pre-alpha · Qbit Education
              </p>
              <h1 className="mt-6 max-w-4xl text-6xl font-black leading-[0.92] text-white sm:text-7xl lg:text-8xl">
                AlgoQuest
              </h1>
              <p className="mt-5 max-w-2xl text-2xl font-black leading-tight text-blue-100">
                Your first door into algorithmic thinking.
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Turn validated algorithm artifacts into student challenges, teacher planning signals,
                and a keyboard-friendly Learning Lab. This is a supervised education surface, not an autonomous authority.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/student"
                  onClick={(event) => routeSurface(event, 'student')}
                  className="rounded-md bg-blue-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  Open Student Surface
                </a>
                <a
                  href="/teacher"
                  onClick={(event) => routeSurface(event, 'teacher')}
                  className="rounded-md bg-violet-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-600/25 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
                >
                  Open Teacher Surface
                </a>
                <a
                  href="/lab"
                  onClick={routeLab}
                  className="rounded-md border border-blue-200/40 bg-white/5 px-5 py-3 text-sm font-black text-blue-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  Enter Learning Lab
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['2', 'role-based surfaces'],
                  ['6', 'guided lab modules'],
                  ['11', 'suite connection targets'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md border border-blue-300/20 bg-slate-950/55 p-4">
                    <p className="text-3xl font-black text-blue-300">{value}</p>
                    <p className="mt-1 text-sm font-bold text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-xl border border-sky-400/30 bg-slate-950/85 p-5 shadow-2xl shadow-sky-950/80 backdrop-blur">
              <div className="flex items-center justify-between border-b border-sky-500/20 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
                  <span className="font-black tracking-wider text-cyan-400 uppercase">ALGOQUEST ACTIVE</span>
                </div>
                <span className="font-bold text-slate-200">Qbit Algorithm Telemetry Workspace</span>
                <span className="rounded border border-cyan-400/40 bg-cyan-400/10 px-2 py-0.5 font-black tracking-wider text-cyan-300 text-[10px]">LIVE PREVIEW</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Module</p>
                  <p className="font-mono text-sm font-black text-cyan-300">03 Build Algo</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step Order</p>
                  <p className="font-mono text-sm font-black text-amber-300">4/4 Validated</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Complexity</p>
                  <p className="font-mono text-sm font-black text-violet-300">O(n log n)</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Privacy Gate</p>
                  <p className="font-mono text-sm font-black text-emerald-400">ADMITTED</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-sky-400/20 bg-slate-900/90 p-4">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span className="font-bold text-sky-300">Array Sorting & Search Pipeline</span>
                  <span className="font-mono text-[11px] text-slate-400">Step 3: Compare & Pivot</span>
                </div>
                <svg className="w-full h-40" viewBox="0 0 460 160" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bar-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4"/>
                    </linearGradient>
                    <linearGradient id="bar-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffb703" stopOpacity="1"/>
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.5"/>
                    </linearGradient>
                    <linearGradient id="bar-violet" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>

                  {/* Comparison Bars */}
                  <rect x="30" y="70" width="38" height="70" rx="4" fill="url(#bar-cyan)"/>
                  <text x="49" y="62" textAnchor="middle" fill="#00f0ff" fontSize="10" fontWeight="bold">12</text>

                  <rect x="95" y="40" width="38" height="100" rx="4" fill="url(#bar-cyan)"/>
                  <text x="114" y="32" textAnchor="middle" fill="#00f0ff" fontSize="10" fontWeight="bold">35</text>

                  <rect x="160" y="20" width="38" height="120" rx="4" fill="url(#bar-gold)"/>
                  <text x="179" y="12" textAnchor="middle" fill="#ffb703" fontSize="10" fontWeight="bold">48 (Pivot)</text>

                  <rect x="225" y="55" width="38" height="85" rx="4" fill="url(#bar-cyan)"/>
                  <text x="244" y="47" textAnchor="middle" fill="#00f0ff" fontSize="10" fontWeight="bold">67</text>

                  <rect x="290" y="10" width="38" height="130" rx="4" fill="url(#bar-violet)"/>
                  <text x="309" y="88" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">89</text>

                  <rect x="355" y="30" width="38" height="110" rx="4" fill="url(#bar-cyan)"/>
                  <text x="374" y="22" textAnchor="middle" fill="#00f0ff" fontSize="10" fontWeight="bold">94</text>

                  {/* Baseline */}
                  <line x1="20" y1="142" x2="420" y2="142" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className="mt-4 flex flex-wrap justify-end gap-2">
                {['Qbit Engine', 'Privacy-Safe Aggregation', 'Student & Teacher Surfaces', 'Local Contracts'].map((chip) => (
                  <span key={chip} className="rounded-full border border-sky-400/30 bg-slate-900/90 px-3 py-1 text-[11px] font-bold text-slate-200">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="surfaces" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ['Student Surface', 'Validated artifact score, next-step hints, learner profile choice, and Qbit guidance for a supervised challenge path.', '/student', 'student'],
              ['Teacher Surface', 'Redacted aggregate planning, classroom-level metrics, and suite queue projection without raw learner records.', '/teacher', 'teacher'],
              ['Learning Lab', 'Six keyboard-friendly modules for problem types, step ordering, linear search, greedy paths, and future concepts.', '/lab', 'lab'],
            ].map(([title, copy, href, route]) => (
              <a
                key={title}
                href={href}
                onClick={(event) => {
                  event.preventDefault();
                  route === 'lab' ? onOpenLearningLab() : onNavigateSurface(route as EducationSurface);
                }}
                className="rounded-lg border border-blue-300/20 bg-slate-950/55 p-5 transition hover:border-blue-300/55 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <p className="text-xs font-black uppercase tracking-wide text-blue-300">{route}</p>
                <h2 className="mt-3 text-2xl font-black text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
                <span className="mt-5 inline-flex text-sm font-black text-amber-200">Open surface</span>
              </a>
            ))}
          </div>
        </section>

        <section id="lab" className="border-y border-blue-300/10 bg-slate-950/45">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-wide text-violet-300">Inside the Learning Lab</p>
              <h2 className="mt-3 text-3xl font-black text-white">Six modules that teach algorithmic reasoning step by step.</h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LAB_MODULES.map(([number, title, copy]) => (
                <article key={title} className="rounded-lg border border-slate-700 bg-[#080d1f] p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-blue-500 text-sm font-black text-white">{number}</span>
                  <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="hero-books" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Hero Books proof line</p>
              <h2 className="mt-3 text-3xl font-black text-white">A first governed adventure path, not an alpha dependency.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                The first proof is {HERO_BOOK_PROOF.firstWorld.title}: primary 5-6, fr-CA, twelve real prompt nodes,
                deterministic replay, and a Builder artifact receipt. Story points move the adventure; LearningEvidence stays separate.
              </p>
              <div className="mt-5 rounded-lg border border-emerald-300/20 bg-slate-950/65 p-4">
                <p className="text-sm font-black text-white">{mageEntryMissionManifest.first_objective}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  Entry state: {entryState.state} · mode: {entryState.mode} · help: {entryState.assistance_level}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => updateEntry(entryState.state, entryState.assistance_level, 'textual')} className="rounded-md border border-slate-600 px-2 py-1 text-[10px] font-black uppercase text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">Mode Text</button>
                  <button type="button" onClick={() => updateEntry(entryState.state, entryState.assistance_level, 'guided_notebook')} className="rounded-md border border-slate-600 px-2 py-1 text-[10px] font-black uppercase text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">Mode Notebook</button>
                  <button type="button" onClick={() => updateEntry(entryState.state, entryState.assistance_level, 'executable_example')} className="rounded-md border border-slate-600 px-2 py-1 text-[10px] font-black uppercase text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">Mode Example</button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => updateEntry('ready', 'none')} className="rounded-md border border-emerald-300/30 px-3 py-2 text-xs font-black text-emerald-100 hover:bg-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-200">Ready</button>
                  <button type="button" onClick={() => updateEntry('guided', 'hint')} className="rounded-md border border-sky-300/30 px-3 py-2 text-xs font-black text-sky-100 hover:bg-sky-500/10 focus:outline-none focus:ring-2 focus:ring-sky-200">Ask Hint</button>
                  <button type="button" onClick={() => updateEntry('retry', entryState.assistance_level)} className="rounded-md border border-indigo-300/30 px-3 py-2 text-xs font-black text-indigo-100 hover:bg-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-200">Retry</button>
                  <button type="button" onClick={() => updateEntry('hold', entryState.assistance_level)} className="rounded-md border border-pink-300/30 px-3 py-2 text-xs font-black text-pink-100 hover:bg-pink-500/10 focus:outline-none focus:ring-2 focus:ring-pink-200">Hold</button>
                  <button type="button" onClick={() => updateEntry('completed', entryState.assistance_level)} className="rounded-md border border-amber-300/30 px-3 py-2 text-xs font-black text-amber-100 hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-200">Mark First Action</button>
                  <button type="button" onClick={() => updateEntry('abstain', entryState.assistance_level)} className="rounded-md border border-slate-500 px-3 py-2 text-xs font-black text-slate-200 hover:bg-slate-700/40 focus:outline-none focus:ring-2 focus:ring-slate-300">Abstain</button>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-amber-300/20 bg-slate-950/65 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-amber-300">Mission envelope export</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Paste this mission into Algorithm Builder before creating the artifact receipt. Builder validates the envelope, but AlgoQuest stays the mission authority.
                </p>
                <textarea
                  aria-label="Mission envelope JSON export for Algorithm Builder"
                  readOnly
                  value={JSON.stringify(mageMissionEnvelope, null, 2)}
                  className="mt-3 min-h-36 w-full rounded-md border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <div className="mt-4 rounded-lg border border-blue-300/20 bg-slate-950/65 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-blue-300">Builder receipt import</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Local ports do not share browser storage. Until the WebAuth broker exists, paste a Builder receipt JSON here for explicit validation.
                </p>
                <textarea
                  aria-label="Builder artifact receipt JSON import"
                  value={receiptImport}
                  onChange={(event) => setReceiptImport(event.target.value)}
                  className="mt-3 min-h-24 w-full rounded-md border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder='{"schema":"securedme.education.algorithm-builder.algorithm-artifact-receipt.v1", ...}'
                />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={importBuilderReceipt} className="rounded-md bg-blue-500 px-4 py-2 text-xs font-black text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200">Validate Receipt</button>
                  <span className="text-xs font-bold text-slate-300">{receiptImportStatus}</span>
                </div>
                {builderReceipt ? (
                  <p className="mt-3 text-xs font-bold text-emerald-300">
                    Active receipt: {builderReceipt.receipt_id} · {builderReceipt.artifact_digest.slice(0, 20)}...
                  </p>
                ) : null}
              </div>
              <div className="mt-4 rounded-lg border border-violet-300/20 bg-slate-950/65 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-violet-300">Colab notebook round trip</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Notebook: {mageColabNotebookManifest.notebook_id}. It exports a receipt only; AlgoQuest remains the mission authority.
                </p>
                <a
                  href="/notebooks/mage-two-horizons-primary-5-6-fr-CA.ipynb"
                  download
                  className="mt-3 inline-flex rounded-md border border-violet-300/40 px-4 py-2 text-xs font-black text-violet-100 hover:bg-violet-500/10 focus:outline-none focus:ring-2 focus:ring-violet-200"
                >
                  Download Colab Notebook
                </a>
                <textarea
                  aria-label="Colab round trip receipt JSON import"
                  value={colabReceiptImport}
                  onChange={(event) => setColabReceiptImport(event.target.value)}
                  className="mt-3 min-h-24 w-full rounded-md border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-300"
                  placeholder='{"schema":"securedme.education.algoquest.colab-round-trip-receipt.v1", ...}'
                />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={importColabReceipt} className="rounded-md bg-violet-600 px-4 py-2 text-xs font-black text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200">Validate Colab Receipt</button>
                  <span className="text-xs font-bold text-slate-300">{colabReceiptStatus}</span>
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-cyan-300/20 bg-slate-950/65 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-cyan-300">Adventure view</p>
                  <h3 className="mt-2 text-xl font-black text-white">{currentPromptNode.title}</h3>
                  <pre className="mt-3 overflow-x-auto rounded-md border border-slate-700 bg-black p-3 text-[11px] leading-5 text-cyan-100">
                    {currentAsciiScene.art.join('\n')}
                  </pre>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{currentPromptNode.prompt_text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={advanceAdventure} className="rounded-md bg-cyan-500 px-4 py-2 text-xs font-black text-slate-950 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200">Next Prompt</button>
                    <button type="button" onClick={replayAdventure} className="rounded-md border border-cyan-300/40 px-4 py-2 text-xs font-black text-cyan-100 hover:bg-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-cyan-200">Replay</button>
                    <button type="button" onClick={resetAdventure} className="rounded-md border border-slate-500 px-4 py-2 text-xs font-black text-slate-200 hover:bg-slate-700/40 focus:outline-none focus:ring-2 focus:ring-slate-300">Reset</button>
                  </div>
                  <p className="mt-3 text-xs font-bold text-slate-400">Replay: {replayStatus}</p>
                </div>
                <div className="rounded-lg border border-emerald-300/20 bg-slate-950/65 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Study and artifact view</p>
                  <dl className="mt-3 grid gap-2 text-xs font-bold text-slate-300">
                    <div className="flex justify-between gap-4 rounded-md border border-slate-700 p-2">
                      <dt>Consumed prompts</dt>
                      <dd>{adventureRuntime.quest_state.consumed_prompt_ids.length}</dd>
                    </div>
                    <div className="flex justify-between gap-4 rounded-md border border-slate-700 p-2">
                      <dt>Story points</dt>
                      <dd>{adventureRuntime.quest_state.story_points}</dd>
                    </div>
                    <div className="flex justify-between gap-4 rounded-md border border-slate-700 p-2">
                      <dt>LearningEvidence tokens</dt>
                      <dd>{adventureRuntime.learning_evidence.knowledge_token_ids.length}</dd>
                    </div>
                    <div className="rounded-md border border-slate-700 p-2">
                      <dt>Linear ASCII equivalent</dt>
                      <dd className="mt-1 font-normal leading-5 text-slate-400">{currentAsciiScene.linear_equivalent}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-amber-300/20 bg-slate-950/65 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-amber-300">Privacy & Permissions Ledger</p>
                <div className="mt-3 grid gap-3 text-xs font-bold text-slate-300 sm:grid-cols-3">
                  <div className="rounded-md border border-slate-700 p-3">
                    <p className="text-white">Student private</p>
                    <p className="mt-1">raw answers: {String(demoStudentProjection.contains_raw_answer)}</p>
                    <p>identity: {String(demoStudentProjection.contains_identity)}</p>
                  </div>
                  <div className="rounded-md border border-slate-700 p-3">
                    <p className="text-white">Teacher assigned</p>
                    <p className="mt-1">status: {demoTeacherProjection.visible_status}</p>
                    <p>raw answers: {String(demoTeacherProjection.contains_raw_answer)}</p>
                  </div>
                  <div className="rounded-md border border-slate-700 p-3">
                    <p className="text-white">Organization</p>
                    <p className="mt-1">status: {demoOrganizationAggregate.status}</p>
                    <p>k: {demoOrganizationAggregate.k_threshold}</p>
                  </div>
                </div>
                <div className="mt-3 rounded-md border border-slate-700 p-3 text-xs font-bold text-slate-300">
                  <p className="text-white">Hierarchy guard</p>
                  <p className="mt-1">organization admin to teacher private activity: {demoHierarchyAccess.status}</p>
                  <p>reason: {demoHierarchyAccess.reason}</p>
                  <p>local receipts: {privacyReceiptCount}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={generateTokenRevocation} className="rounded-md border border-amber-300/40 px-3 py-2 text-xs font-black text-amber-100 hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-200">Revoke Data Access (Issue Receipt)</button>
                  <button type="button" onClick={generateDeletionReceipt} className="rounded-md border border-rose-300/40 px-3 py-2 text-xs font-black text-rose-100 hover:bg-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-200">Request Data Deletion (Issue Receipt)</button>
                  <button type="button" onClick={clearPrivacyReceipts} className="rounded-md border border-slate-500 px-3 py-2 text-xs font-black text-slate-200 hover:bg-slate-700/40 focus:outline-none focus:ring-2 focus:ring-slate-300">Clear Local Privacy Vault</button>
                </div>
                <textarea
                  aria-label="Privacy & Permissions JSON output"
                  readOnly
                  value={privacyReceipt}
                  className="mt-3 min-h-28 w-full rounded-md border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  [String(HERO_BOOK_PROOF.audienceCount), 'audiences'],
                  [String(HERO_BOOK_PROOF.firstManifest.prompt_nodes.length), 'first prompts'],
                  [HERO_BOOK_PROOF.tenebrisDefault, 'Tenebris'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md border border-emerald-300/20 bg-slate-950/60 p-4">
                    <p className="text-2xl font-black text-emerald-300">{value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {heroWorldRegistry.map((world) => (
                <article key={world.hero_book_id} className="rounded-lg border border-slate-700 bg-[#080d1f] p-4">
                  <h3 className="text-lg font-black text-white">{world.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{world.canonical_learning_purpose}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contracts" className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-amber-200">Qbit + Gateway contract</p>
            <h2 className="mt-3 text-3xl font-black text-white">The app is built around visible boundaries.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              AlgoQuest uses local typed contracts for session roles, student learning events, teacher planning events,
              Qbit interventions, and Gateway install choices. Contract validation blocks surface/role mismatch and obvious secret-like fields.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Student contract', 'Validated algorithm artifact, score threshold, risk flags, and next-step hint.'],
              ['Teacher contract', 'Redacted aggregate need, recommendation, rubric reference, and planning status.'],
              ['Qbit guidance', 'Optional badge, nudge, and planner support controlled by consent scope.'],
              ['Install sequence', 'Gateway doctor check, AlgoQuest offer, selected tool state, dry-run choice scope.'],
            ].map(([title, copy]) => (
              <article key={title} className="rounded-lg border border-blue-300/15 bg-slate-950/55 p-5">
                <h3 className="text-lg font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="suite" className="border-t border-blue-300/10 bg-[#070b1a]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-blue-300">Suite connection targets</p>
                <h2 className="mt-3 text-3xl font-black text-white">Pre-alpha queue, explicit consent, dry-run first.</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                The queue is a planning surface. It does not imply production integration or automatic data sharing.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SUITE_TARGETS.map((target) => (
                <div key={target} className="rounded-md border border-violet-300/15 bg-slate-950/60 px-4 py-3 text-sm font-bold text-slate-200">
                  {target}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-blue-300/10 bg-[#050816] px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>AlgoQuest Qbit Education · Pre-alpha / in development · SEL-2.0</p>
          <p>Official classroom AI routes: Codex/OpenAI and Antigravity/Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Home);
  const [showLearningLab, setShowLearningLab] = useState<boolean>(() => {
    const path = window.location.pathname.toLowerCase();
    return path.includes('/lab');
  });
  const [showLanding, setShowLanding] = useState<boolean>(() => {
    const path = window.location.pathname.toLowerCase();
    return !path.includes('/student') && !path.includes('/teacher') && !path.includes('/lab');
  });
  const [surface, setSurface] = useState<EducationSurface>(() => {
    const path = window.location.pathname.toLowerCase();
    return path.includes('/teacher') ? 'teacher' : 'student';
  });
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.toLowerCase();
      setSurface(path.includes('/teacher') ? 'teacher' : 'student');
      setShowLearningLab(path.includes('/lab'));
      setShowLanding(!path.includes('/student') && !path.includes('/teacher') && !path.includes('/lab'));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateSurface = (nextSurface: EducationSurface) => {
    setSurface(nextSurface);
    setShowLearningLab(false);
    setShowLanding(false);
    window.history.pushState({}, '', `/${nextSurface}${window.location.search}`);
  };

  const openLearningLab = () => {
    setShowLanding(false);
    setShowLearningLab(true);
    window.history.pushState({}, '', `/lab${window.location.search}`);
  };

  const currentSectionIndex = SECTION_ORDER.indexOf(activeSection);
  const sectionTitle = SECTION_COPY[activeSection]?.title ?? 'Learning Lab';
  const sectionDescription = SECTION_COPY[activeSection]?.description ?? '';
  const canGoPrev = currentSectionIndex > 0;
  const canGoNext = currentSectionIndex < SECTION_ORDER.length - 1;

  const goToPrevSection = () => {
    const previousIndex = Math.max(0, currentSectionIndex - 1);
    setActiveSection(SECTION_ORDER[previousIndex]);
  };

  const goToNextSection = () => {
    const nextIndex = Math.min(SECTION_ORDER.length - 1, currentSectionIndex + 1);
    setActiveSection(SECTION_ORDER[nextIndex]);
  };

  useEffect(() => {
    if (!showLearningLab) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevSection();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNextSection();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showLearningLab, currentSectionIndex]);

  const sections = {
    [SectionId.Home]: <HomeSection onNavigate={setActiveSection} />,
    [SectionId.ProblemTypes]: <ProblemTypesSection />,
    [SectionId.BuildAlgo]: <BuildAlgoSection />,
    [SectionId.Performance]: <PerformanceSection />,
    [SectionId.Paradigms]: <ParadigmsSection />,
    [SectionId.Innovation]: <InnovationSection />,
  };

  if (showLanding) {
    return (
      <>
        <LandingPage onNavigateSurface={navigateSurface} onOpenLearningLab={openLearningLab} />
        <UtilityDock />
      </>
    );
  }

  if (!showLearningLab) {
    return (
      <>
        <EducationHub
          surface={surface}
          onNavigateSurface={navigateSurface}
          onOpenLearningLab={openLearningLab}
        />
        <UtilityDock />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-sky-50 pb-48 text-slate-800 sm:pb-0">
      <nav className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between" aria-label="Main Navigation">
        <div>
          <h1 className="text-3xl font-black text-sky-600 mb-10">AlgoQuest</h1>
          <button
            onClick={() => {
              setShowLearningLab(false);
              setShowLanding(true);
              window.history.pushState({}, '', `/${window.location.search}`);
            }}
            className="mb-6 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Back to AlgoQuest
          </button>
          <ul className="space-y-3">
            {SECTION_ORDER.map((id) => (
              <li key={id}>
                <NavButton
                  label={id.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())}
                  isActive={activeSection === id}
                  onClick={() => setActiveSection(id)}
                />
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Learning path progress</p>
            <p className="mt-2 text-sm text-slate-700">
              Step {currentSectionIndex + 1} of {SECTION_ORDER.length}: {sectionTitle}
            </p>
            <p className="mt-1 text-xs text-slate-500">{sectionDescription}</p>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrevSection}
                disabled={!canGoPrev}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={goToNextSection}
                disabled={!canGoNext}
                className="flex-1 rounded-md bg-sky-600 px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
        <footer className="text-center text-xs text-slate-400">
          <p>&copy; {currentYear} AlgoQuest. Licensed under LicenseRef-SEL-2.0.</p>
        </footer>
      </nav>

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <p className="sr-only" aria-live="polite">
            {sectionTitle} loaded in the learning lab.
          </p>
          {sections[activeSection]}
        </div>
      </main>
      <UtilityDock />
    </div>
  );
};

export default App;
