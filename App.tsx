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

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Home);
  const [showLearningLab, setShowLearningLab] = useState<boolean>(false);
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
      setShowLearningLab(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateSurface = (nextSurface: EducationSurface) => {
    setSurface(nextSurface);
    setShowLearningLab(false);
    window.history.pushState({}, '', `/${nextSurface}${window.location.search}`);
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

  if (!showLearningLab) {
    return (
      <EducationHub
        surface={surface}
        onNavigateSurface={navigateSurface}
        onOpenLearningLab={() => setShowLearningLab(true)}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-sky-50 text-slate-800">
      <nav className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between" aria-label="Main Navigation">
        <div>
          <h1 className="text-3xl font-black text-sky-600 mb-10">AlgoQuest</h1>
          <button
            onClick={() => setShowLearningLab(false)}
            className="mb-6 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Back to Education Hub
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
    </div>
  );
};

export default App;
