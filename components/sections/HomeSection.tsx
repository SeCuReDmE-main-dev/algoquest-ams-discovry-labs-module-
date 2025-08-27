import React from 'react';
import { SectionId } from '../../types';
import Card from '../ui/Card';

interface HomeSectionProps {
  onNavigate: (section: SectionId) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-5xl font-black text-slate-800 mb-2">Welcome to AlgoQuest!</h1>
        <p className="text-xl text-slate-600">Your interactive journey into the world of algorithms.</p>
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
          <h2 className="text-2xl font-bold text-sky-600 mb-3">Start Your Quest</h2>
          <p className="text-slate-600 mb-4 flex-grow">Begin with the basics. Learn what algorithms are and the types of problems they solve.</p>
          <button 
            onClick={() => onNavigate(SectionId.ProblemTypes)}
            className="mt-auto w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Explore Problem Types
          </button>
        </Card>
        <Card className="flex flex-col">
          <h2 className="text-2xl font-bold text-teal-600 mb-3">Build an Algorithm</h2>
          <p className="text-slate-600 mb-4 flex-grow">Get hands-on experience by constructing your own algorithm step-by-step.</p>
          <button 
            onClick={() => onNavigate(SectionId.BuildAlgo)}
            className="mt-auto w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Start Building
          </button>
        </Card>
      </div>
    </div>
  );
};

export default HomeSection;
