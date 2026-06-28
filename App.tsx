import React, { useState, useEffect } from 'react';
import { SectionId } from './types';
import HomeSection from './components/sections/HomeSection';
import ProblemTypesSection from './components/sections/ProblemTypesSection';
import BuildAlgoSection from './components/sections/BuildAlgoSection';
import PerformanceSection from './components/sections/PerformanceSection';
import ParadigmsSection from './components/sections/ParadigmsSection';
import InnovationSection from './components/sections/InnovationSection';
import NavButton from './components/ui/NavButton';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Home);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const sections = {
    [SectionId.Home]: <HomeSection onNavigate={setActiveSection} />,
    [SectionId.ProblemTypes]: <ProblemTypesSection />,
    [SectionId.BuildAlgo]: <BuildAlgoSection />,
    [SectionId.Performance]: <PerformanceSection />,
    [SectionId.Paradigms]: <ParadigmsSection />,
    [SectionId.Innovation]: <InnovationSection />,
  };

  return (
    <div className="flex min-h-screen bg-sky-50 text-slate-800">
      <nav className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between" aria-label="Main Navigation">
        <div>
          <h1 className="text-3xl font-black text-sky-600 mb-10">AlgoQuest</h1>
          <ul className="space-y-3">
            {Object.values(SectionId).map((id) => (
              <li key={id}>
                <NavButton
                  label={id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  isActive={activeSection === id}
                  onClick={() => setActiveSection(id)}
                />
              </li>
            ))}
          </ul>
        </div>
        <footer className="text-center text-xs text-slate-400">
          <p>&copy; {currentYear} AlgoQuest. Licensed under LicenseRef-SEL-2.0.</p>
        </footer>
      </nav>

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {sections[activeSection]}
        </div>
      </main>
    </div>
  );
};

export default App;
