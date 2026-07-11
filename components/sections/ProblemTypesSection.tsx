import React, { useState } from 'react';
import { PROBLEM_TYPE_QUESTIONS } from '../../constants';
import { ProblemTypeQuestion } from '../../types';
import Card from '../ui/Card';

const ProblemTypesSection: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion: ProblemTypeQuestion = PROBLEM_TYPE_QUESTIONS[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    setIsAnswered(true);
    if (currentQuestion.options[selectedOption].isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setIsAnswered(false);
      setSelectedOption(null);
      if (currentQuestionIndex < PROBLEM_TYPE_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  }

  const getOptionClasses = (index: number) => {
    let classes = 'w-full p-4 border rounded-lg transition-all duration-300 text-left';
    if (!isAnswered) {
      return `${classes} ${
        selectedOption === index
          ? 'bg-sky-100 border-sky-500 text-sky-900'
          : 'bg-white border-slate-200 hover:bg-sky-50 hover:border-sky-400'
      }`;
    }
    if (currentQuestion.options[index].isCorrect) {
      return `${classes} bg-green-100 border-green-500 text-green-800`;
    }
    if (index === selectedOption) {
      return `${classes} bg-red-100 border-red-500 text-red-800`;
    }
    return `${classes} bg-white border-slate-200`;
  };

  if (showResult) {
    return (
      <Card className="text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-6">You scored {score} out of {PROBLEM_TYPE_QUESTIONS.length}</p>
        <button onClick={restartQuiz} className="bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors">
          Try Again
        </button>
      </Card>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-black text-slate-800 mb-6">Quiz: Algorithm Problem Types</h1>
      <p className="mb-5 text-slate-600">
        Pick the best answer for each question. You can use the keyboard (Tab then Enter/Space) on every option.
      </p>
      <Card>
        <div className="mb-4">
          <p className="text-slate-500">Question {currentQuestionIndex + 1}/{PROBLEM_TYPE_QUESTIONS.length}</p>
          <h2 className="text-2xl font-bold mt-2">{currentQuestion.questionText}</h2>
        </div>
        <div className="space-y-4 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
              className={`${getOptionClasses(index)} focus:outline-none focus:ring-2 focus:ring-sky-400`}
              aria-label={`Option ${index + 1}: ${option.text}`}
            >
              {option.text}
            </button>
          ))}
        </div>
        
        {isAnswered && (
          <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg mb-4">
            <h3 className="font-bold text-yellow-800">Explanation:</h3>
            <p className="text-yellow-700">{currentQuestion.explanation}</p>
          </div>
        )}

        <button 
          onClick={handleSubmit} 
          disabled={selectedOption === null || isAnswered}
          className="w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {isAnswered ? 'Next Question...' : 'Submit Answer'}
        </button>
      </Card>
    </div>
  );
};

export default ProblemTypesSection;
