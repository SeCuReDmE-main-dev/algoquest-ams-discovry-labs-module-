import React, { useMemo, useState } from 'react';
import { GREEDY_PATH_GRAPH } from '../../constants';
import Card from '../ui/Card';

const ParadigmsSection: React.FC = () => {
  const [path, setPath] = useState<string[]>(['S']);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [lastDecision, setLastDecision] = useState<string>('Press "Find Greedy Path" to run the step-by-step example.');

  const getCurrentNode = () => path[path.length - 1];
  const completionNote = useMemo(() => {
    if (!path.length) return 'No active path. Click reset to start again.';
    if (isComplete) return `Path complete at ${getCurrentNode()} with total cost ${totalCost}.`;
    return `Current node: ${getCurrentNode()}.`;
  }, [isComplete, path, totalCost]);

  const findPath = () => {
    const currentNode = getCurrentNode();

    if (isComplete) {
      setLastDecision('Greedy path already completed to the destination node.');
      return;
    }

    const edgesFromCurrent = GREEDY_PATH_GRAPH.edges.filter((edge) => edge.from === currentNode);

    if (!edgesFromCurrent.length) {
      setLastDecision('No outgoing edges available from the current node.');
      return;
    }

    const nextNode = edgesFromCurrent.reduce((prev, curr) => (prev.cost < curr.cost ? prev : curr));
    const nextPath = [...path, nextNode.to];

    setPath(nextPath);
    setTotalCost((prev) => prev + nextNode.cost);
    setLastDecision(`Greedy step: chose ${nextNode.from} -> ${nextNode.to} with weight ${nextNode.cost}.`);

    if (nextNode.to === 'E') {
      setIsComplete(true);
    }
  };

  const reset = () => {
    setPath(['S']);
    setTotalCost(0);
    setIsComplete(false);
    setLastDecision('Press "Find Greedy Path" to run the step-by-step example.');
  };

  const isEdgeInPath = (edgeId: string) => {
    const [from, to] = edgeId.split('-');
    for (let i = 0; i < path.length - 1; i++) {
      if (path[i] === from && path[i+1] === to) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <h1 className="text-4xl font-black text-slate-800 mb-2">Algorithm Paradigms</h1>
      <p className="text-lg text-slate-600 mb-6">A <strong>Greedy Algorithm</strong> makes the locally optimal choice at each step. Let's find the shortest path from S to E by always picking the cheapest next step.</p>
      <Card>
        <div className="flex justify-center items-center mb-6">
          <svg width="250" height="150" viewBox="0 0 250 150">
            {/* Edges */}
            {GREEDY_PATH_GRAPH.edges.map(edge => {
              const fromNode = GREEDY_PATH_GRAPH.nodes.find(n => n.id === edge.from)!;
              const toNode = GREEDY_PATH_GRAPH.nodes.find(n => n.id === edge.to)!;
              return (
                <g key={edge.id}>
                  <line
                    x1={fromNode.x} y1={fromNode.y}
                    x2={toNode.x} y2={toNode.y}
                    stroke={isEdgeInPath(edge.id) ? '#10b981' : '#94a3b8'}
                    strokeWidth={isEdgeInPath(edge.id) ? 4 : 2}
                    className="transition-all duration-500"
                  />
                  <text
                    x={(fromNode.x + toNode.x) / 2 + 5}
                    y={(fromNode.y + toNode.y) / 2 - 5}
                    fill="#475569"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {edge.cost}
                  </text>
                </g>
              );
            })}
            {/* Nodes */}
            {GREEDY_PATH_GRAPH.nodes.map(node => (
              <g key={node.id}>
                <circle
                  cx={node.x} cy={node.y} r="15"
                  fill={path.includes(node.id) ? '#0ea5e9' : '#fff'}
                  stroke={path.includes(node.id) ? '#0284c7' : '#94a3b8'}
                  strokeWidth="3"
                  className="transition-all duration-500"
                />
                <text x={node.x} y={node.y + 5} textAnchor="middle" fill={path.includes(node.id) ? '#fff' : '#000'} fontWeight="bold">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="text-center mb-6">
          <p className="text-lg">Path: <strong className="text-sky-600">{path.join(' -> ')}</strong></p>
          <p className="text-lg">Total Cost: <strong className="text-sky-600">{totalCost}</strong></p>
          <p className="mt-1 text-sm text-slate-600">{completionNote}</p>
          <p className="mt-2 text-sm text-slate-600" aria-live="polite">
            {lastDecision}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={findPath}
            disabled={isComplete}
            className="bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition-colors disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isComplete ? 'Path Complete' : 'Next Greedy Step'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="bg-slate-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ParadigmsSection;
