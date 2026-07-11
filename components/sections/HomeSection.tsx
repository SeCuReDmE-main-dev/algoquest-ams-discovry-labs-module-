import React from 'react';
import { SectionId } from '../../types';
import Card from '../ui/Card';

interface HomeSectionProps {
  onNavigate: (section: SectionId) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-5xl font-black text-slate-800 mb-2">Welcome to AlgoQuest</h1>
        <p className="text-xl text-slate-600">
          A structured path into algorithmic thinking for every level of learner, from beginner-safe onboarding to advanced planning.
        </p>
      </header>
      
      <Card>
        <p className="text-lg text-slate-700 leading-relaxed">
          Algorithms are the heart of computer science, powering everything from search engines to social media feeds. 
          AlgoQuest is designed to demystify these powerful tools, making them accessible and fun to learn. 
          Whether you're a curious beginner or looking to refresh your knowledge, you've come to the right place.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <h2 className="text-2xl font-bold text-sky-600 mb-3">Start Learning</h2>
          <p className="text-slate-600 mb-4 flex-grow">
            Begin with the basics. Learn what algorithms are and the types of problems they solve.
          </p>
          <button 
            onClick={() => onNavigate(SectionId.ProblemTypes)}
            className="mt-auto w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Open Problem Types
          </button>
        </Card>
        <Card className="flex flex-col">
          <h2 className="text-2xl font-bold text-teal-600 mb-3">Build an Algorithm</h2>
          <p className="text-slate-600 mb-4 flex-grow">Practice by constructing your own algorithm step-by-step.</p>
          <button 
            onClick={() => onNavigate(SectionId.BuildAlgo)}
            className="mt-auto w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Open Builder
          </button>
        </Card>
        <Card className="md:col-span-2 flex flex-col">
          <h2 className="text-2xl font-bold text-amber-600 mb-3">Explore the Academy View</h2>
          <p className="text-slate-600 mb-4 flex-grow">
            Compare learner vs teacher surfaces to validate how privacy-safe aggregation and planning stay separate.
          </p>
          <a
            href="/teacher?tool=vot-guardian&role=teacher"
            className="mt-auto inline-flex w-full justify-center rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-900 hover:bg-amber-100"
          >
            Open Teacher Surface
          </a>
        </Card>
      </div>
    </div>
  );
};

export default HomeSection;
