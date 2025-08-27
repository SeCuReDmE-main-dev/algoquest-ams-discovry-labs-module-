import React, { useState } from 'react';
import { GREEDY_PATH_GRAPH } from '../../constants';
import Card from '../ui/Card';

const ParadigmsSection: React.FC = () => {
  const [path, setPath] = useState<string[]>(['S']);
  const [totalCost, setTotalCost] = useState(0);

  const findPath = () => {
    // Simple greedy logic for this specific graph
    const nextNode = GREEDY_PATH_GRAPH.edges
      .filter(edge => edge.from === 'S')
      .reduce((prev, curr) => (prev.cost < curr.cost ? prev : curr));
    
    setPath(['S', nextNode.to, 'E']);

    const finalEdge = GREEDY_PATH_GRAPH.edges.find(edge => edge.from === nextNode.to && edge.to === 'E');
    setTotalCost(nextNode.cost + (finalEdge?.cost || 0));
  };

  const reset = () => {
    setPath(['S']);
    setTotalCost(0);
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
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={findPath} className="bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition-colors">Find Greedy Path</button>
          <button onClick={reset} className="bg-slate-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors">Reset</button>
        </div>
      </Card>
    </div>
  );
};

export default ParadigmsSection;
