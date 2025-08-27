
export enum SectionId {
  Home = 'home',
  ProblemTypes = 'problem-types',
  BuildAlgo = 'build-algo',
  Performance = 'performance',
  Paradigms = 'paradigms',
  Innovation = 'innovation',
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface ProblemTypeQuestion {
  id: number;
  questionText: string;
  options: QuizOption[];
  explanation?: string; // Optional explanation for after submission
}

export interface AlgorithmStepType {
  id: string;
  text: string;
}

export interface BarData {
  value: number;
  id: string; // For key prop
  state?: 'default' | 'comparing' | 'swapped' | 'sorted' | 'pivot';
}

export interface GreedyNode {
  id: string;
  label: string;
  x: number;
  y: number;
  isEndpoint?: boolean; // S or E
}

export interface GreedyEdge {
  from: string;
  to: string;
  cost: number;
  id: string;
}

export interface GreedyGraph {
  nodes: GreedyNode[];
  edges: GreedyEdge[];
}
    