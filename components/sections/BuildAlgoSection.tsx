import React, { useState } from 'react';
import { BUILD_ALGO_INITIAL_STEPS, BUILD_ALGO_CORRECT_ORDER_IDS } from '../../constants';
import { AlgorithmStepType } from '../../types';
import Card from '../ui/Card';

const BuildAlgoSection: React.FC = () => {
  const [steps, setSteps] = useState<AlgorithmStepType[]>(() => [...BUILD_ALGO_INITIAL_STEPS].sort(() => Math.random() - 0.5));
  const [draggedItem, setDraggedItem] = useState<AlgorithmStepType | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: AlgorithmStepType) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: AlgorithmStepType) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;
    
    const currentIndex = steps.findIndex(item => item.id === draggedItem.id);
    const targetIndex = steps.findIndex(item => item.id === targetItem.id);
    
    const newSteps = [...steps];
    newSteps.splice(currentIndex, 1);
    newSteps.splice(targetIndex, 0, draggedItem);
    
    setSteps(newSteps);
    setDraggedItem(null);
    setIsCorrect(null);
  };

  const checkOrder = () => {
    const userOrderIds = steps.map(step => step.id);
    const result = userOrderIds.slice(0, BUILD_ALGO_CORRECT_ORDER_IDS.length)
      .every((id, index) => id === BUILD_ALGO_CORRECT_ORDER_IDS[index]);
    setAttemptCount((value) => value + 1);
    setIsCorrect(result);
  };

  const resetChallenge = () => {
    setSteps([...BUILD_ALGO_INITIAL_STEPS].sort(() => Math.random() - 0.5));
    setDraggedItem(null);
    setIsCorrect(null);
    setAttemptCount(0);
  };

  return (
    <div>
      <h1 className="text-4xl font-black text-slate-800 mb-2">Build an Algorithm</h1>
      <p className="text-lg text-slate-600 mb-6">Drag and drop the steps into the correct order to describe how to find the tallest person in a group.</p>
      
      <Card>
        <div className="space-y-3 mb-6">
          {steps.map(step => (
            <div
              key={step.id}
              draggable
              onDragStart={(e) => handleDragStart(e, step)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, step)}
              className="p-4 bg-sky-100 border-l-4 border-sky-500 rounded cursor-grab active:cursor-grabbing shadow-sm"
            >
              {step.text}
            </div>
          ))}
        </div>
        
        <button
          onClick={checkOrder}
          className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors"
        >
          Check My Algorithm
        </button>
        <button
          type="button"
          onClick={resetChallenge}
          className="w-full mt-3 border border-slate-200 bg-white text-slate-700 font-bold py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Reset Challenge
        </button>

        {isCorrect !== null && (
          <div className={`mt-4 p-4 rounded-lg text-center font-bold ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isCorrect ? 'Correct! You\'ve built a working algorithm.' : 'Not quite right. Try re-arranging the steps.'}
          </div>
        )}
      </Card>
      <Card className="mt-4">
        <h3 className="font-bold text-lg">Note:</h3>
        <p className="text-slate-600">One of these steps is a distractor and shouldn't be part of the final core logic. Your goal is to get the first five steps right!</p>
        <p className="mt-2 text-sm text-slate-500">Attempts so far: {attemptCount}</p>
      </Card>
    </div>
  );
};

export default BuildAlgoSection;
