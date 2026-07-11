import React, { useState, useEffect, useRef } from 'react';
import { PERFORMANCE_DATA_LIST, PERFORMANCE_TARGET_NUMBER } from '../../constants';
import { BarData } from '../../types';
import Card from '../ui/Card';

const PerformanceSection: React.FC = () => {
  const initialData: BarData[] = PERFORMANCE_DATA_LIST.map((val, i) => ({
    value: val,
    id: `bar-${i}`,
    state: 'default'
  }));

  const [data, setData] = useState<BarData[]>(initialData);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [searchSteps, setSearchSteps] = useState(0);
  const dataRef = useRef(initialData);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  
  const reset = () => {
    setData(initialData);
    setCurrentIndex(-1);
    setIsSearching(false);
    setFoundIndex(-1);
    setSearchSteps(0);
  };

  const startSearch = () => {
    if (isSearching) return;
    reset();
    setIsSearching(true);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (!isSearching) {
      return;
    }

    if (currentIndex >= data.length) {
      setIsSearching(false);
      return;
    }

    const interval = setInterval(() => {
      const currentBar = dataRef.current[currentIndex];
      if (!currentBar) {
        setIsSearching(false);
        return;
      }

      setSearchSteps((value) => value + 1);
      setData(prevData => prevData.map((bar, index) => 
        index === currentIndex ? { ...bar, state: 'comparing' } : bar
      ));

      if (currentBar.value === PERFORMANCE_TARGET_NUMBER) {
        setIsSearching(false);
        setFoundIndex(currentIndex);
        setData(prevData => prevData.map((bar, index) => 
          index === currentIndex ? { ...bar, state: 'sorted' } : bar
        ));
      } else {
         setData(prevData => prevData.map((bar, index) => 
          index === currentIndex ? { ...bar, state: 'default' } : bar
        ));
        setCurrentIndex(currentIndex + 1);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isSearching, currentIndex, data.length]);

  const statusText = foundIndex !== -1
    ? `Found ${PERFORMANCE_TARGET_NUMBER} at index ${foundIndex}.`
    : isSearching && currentIndex < data.length
      ? `Checking index ${currentIndex}. Value is ${data[currentIndex].value}.`
      : foundIndex === -1 && currentIndex >= data.length
        ? `Search ended. ${PERFORMANCE_TARGET_NUMBER} is not present.`
        : 'Ready to start a linear search.';
  
  const getBarColor = (state: BarData['state']) => {
    switch (state) {
      case 'comparing': return 'bg-yellow-400';
      case 'sorted': return 'bg-green-500';
      default: return 'bg-sky-500';
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-black text-slate-800 mb-2">Algorithm Performance</h1>
      <p className="text-lg text-slate-600 mb-6">Let's visualize a <strong>Linear Search</strong>. We'll scan through the data one by one to find the number <strong>{PERFORMANCE_TARGET_NUMBER}</strong>.</p>
      
      <Card>
        <div className="h-64 flex items-end justify-center gap-1 mb-6 p-4 bg-slate-50 rounded-lg">
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`w-4 rounded-t-sm transition-all duration-300 ${getBarColor(item.state)}`}
              style={{ height: `${item.value * 15}px` }}
              title={`Value: ${item.value}`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={startSearch}
            disabled={isSearching}
            className="bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition-colors disabled:bg-slate-300">
            {isSearching ? 'Searching...' : 'Start Search'}
          </button>
          <button 
            onClick={reset}
            className="bg-slate-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors">
            Reset
          </button>
        </div>
        
        <div className="mt-4 text-center h-6">
          <p className="font-bold" aria-live="polite">
            {statusText}
          </p>
        </div>
        <div className="mt-2 text-center text-xs text-slate-500" aria-live="polite">
          Steps: {searchSteps}
        </div>
      </Card>
    </div>
  );
};

export default PerformanceSection;
