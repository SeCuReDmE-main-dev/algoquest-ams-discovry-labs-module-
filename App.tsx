import React, { useState, useEffect } from 'react';
import { EducationSurface, SectionId } from './types';
import EducationHub from './components/education/EducationHub';
import HomeSection from './components/sections/HomeSection';
import ProblemTypesSection from './components/sections/ProblemTypesSection';
import BuildAlgoSection from './components/sections/BuildAlgoSection';
import PerformanceSection from './components/sections/PerformanceSection';
import ParadigmsSection from './components/sections/ParadigmsSection';
import InnovationSection from './components/sections/InnovationSection';
import NavButton from './components/ui/NavButton';
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

type UtilityTheme = 'night' | 'day';
type UtilityLanguage = 'en' | 'fr';
type UtilityAccess = 'base' | 'autism-calm' | 'adhd-sprint' | 'deep-work';

const ACCESS_ORDER: UtilityAccess[] = ['base', 'autism-calm', 'adhd-sprint', 'deep-work'];
const ACCESS_LABELS: Record<UtilityAccess, string> = {
  base: 'Access',
  'autism-calm': 'Autism Calm',
  'adhd-sprint': 'ADHD Sprint',
  'deep-work': 'Deep Work',
};

const UtilityDock: React.FC = () => {
  const [language, setLanguage] = useState<UtilityLanguage>(() => {
    return window.localStorage.getItem('securedme.algoquest.language') === 'fr' ? 'fr' : 'en';
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

  const nextAccess = () => {
    const currentIndex = ACCESS_ORDER.indexOf(access);
    setAccess(ACCESS_ORDER[(currentIndex + 1) % ACCESS_ORDER.length]);
  };

  return (
    <aside className="fixed bottom-4 right-4 z-[80] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2" aria-label="SecuredMe utility controls">
      <button
        type="button"
        onClick={() => setLanguage((current) => (current === 'en' ? 'fr' : 'en'))}
        className="rounded-full border border-amber-200/70 bg-slate-950/90 px-4 py-2 text-xs font-black text-white shadow-lg shadow-slate-950/40 backdrop-blur hover:border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200"
        aria-pressed={language === 'fr'}
      >
        Language: {language.toUpperCase()}
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

  const routeSurface = (event: React.MouseEvent<HTMLAnchorElement>, surface: EducationSurface) => {
    event.preventDefault();
    onNavigateSurface(surface);
  };

  const routeLab = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onOpenLearningLab();
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

            <div className="relative">
              <picture>
                <source media="(prefers-color-scheme: light)" srcSet={landingLight} />
                <img
                  src={landingDark}
                  alt="AlgoQuest owl mascot, Qbit Education wordmark, and learning-path visual identity"
                  className="w-full rounded-lg border border-blue-300/20 object-cover shadow-2xl shadow-blue-950/80"
                />
              </picture>
              <div className="absolute bottom-4 left-4 rounded-md border border-slate-200/20 bg-slate-950/80 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-200 backdrop-blur">
                Local contracts · no raw learner secrets
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
