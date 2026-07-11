import React, { useState } from 'react';
import Card from '../ui/Card';

const TOPIC_GUIDANCE: Record<string, string[]> = {
  'quantum computing': [
    'Quantum computing introduces a different way to reason about search, probability, and optimization.',
    'For a beginner, the useful lesson is not to claim magic speedups. It is to compare classical steps with quantum-inspired concepts such as superposition, measurement, and constrained problem framing.',
  ],
  'AI and machine learning algorithms': [
    'AI and machine learning algorithms learn patterns from examples instead of following only fixed hand-written rules.',
    'In classroom use, the important habit is to ask what data was used, what the model is allowed to decide, and where human review remains required.',
  ],
  'DNA computing': [
    'DNA computing shows that algorithms are not limited to silicon. Information can be represented and transformed through biochemical structures.',
    'The school-safe takeaway is systems thinking: the representation, the environment, and the verification method matter as much as the abstract algorithm.',
  ],
  'neuromorphic computing': [
    'Neuromorphic computing explores circuits inspired by nervous systems, especially event-driven signals and low-power pattern processing.',
    'For learners, it is a good bridge between algorithms, hardware, perception, and the limits of copying biological ideas too literally.',
  ],
};

const topicOptions = Object.keys(TOPIC_GUIDANCE);
const initialTopic = topicOptions[0] || 'quantum computing';

const InnovationSection: React.FC = () => {
  const [topic, setTopic] = useState(initialTopic);
  const [generatedContent, setGeneratedContent] = useState(() => (TOPIC_GUIDANCE[initialTopic] || []).join('\n\n'));

  const fetchInnovationInfo = () => {
    setGeneratedContent((TOPIC_GUIDANCE[topic] || []).join('\n\n'));
  };

  return (
    <div>
      <h1 className="text-4xl font-black text-slate-800 mb-2">Future of Algorithms</h1>
      <p className="text-lg text-slate-600 mb-6">
        Explore topics that shape algorithmic thinking through school-safe local guidance.
      </p>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <label htmlFor="topic-selector" className="sr-only">
            Innovation topic
          </label>
          <select
            id="topic-selector"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full sm:w-auto flex-grow p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            aria-label="Select an innovation topic"
          >
            {topicOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            onClick={fetchInnovationInfo}
            className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Explore Topic
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setGeneratedContent('')}
            className="text-xs text-slate-500 underline hover:text-slate-700"
          >
            Clear content
          </button>
        </div>

        {generatedContent ? (
          <div className="prose max-w-none mt-4 p-4 bg-slate-50 rounded-lg">
            <h2 className="text-2xl font-bold text-purple-700 capitalize">{topic}</h2>
            {generatedContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-slate-50 rounded-lg">
            <p className="text-slate-500">Press "Explore Topic" to load learning guidance for this area.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InnovationSection;

