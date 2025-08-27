
import { ProblemTypeQuestion, AlgorithmStepType, BarData, GreedyGraph } from './types';

export const PROBLEM_TYPE_QUESTIONS: ProblemTypeQuestion[] = [
  {
    id: 1,
    questionText: "You have a jumbled phone book and need to find a specific person's number. What type of problem is this?",
    options: [
      { text: "Sorting Problem", isCorrect: false },
      { text: "Search Problem", isCorrect: true },
      { text: "Optimization Problem", isCorrect: false },
      { text: "Decision Problem", isCorrect: false },
    ],
    explanation: "Finding a specific item in a collection is a classic Search Problem."
  },
  {
    id: 2,
    questionText: "You want to arrange your music playlist from shortest song to longest. This is a...",
    options: [
      { text: "Search Problem", isCorrect: false },
      { text: "Graph Problem", isCorrect: false },
      { text: "Sorting Problem", isCorrect: true },
      { text: "Dynamic Programming Problem", isCorrect: false },
    ],
    explanation: "Arranging items in a specific order is a Sorting Problem."
  },
  {
    id: 3,
    questionText: "A delivery driver needs to visit 10 locations using the shortest possible route. This is an example of an...",
    options: [
      { text: "Optimization Problem", isCorrect: true },
      { text: "Counting Problem", isCorrect: false },
      { text: "String Processing Problem", isCorrect: false },
      { text: "Geometric Problem", isCorrect: false },
    ],
    explanation: "Finding the 'best' solution (e.g., shortest, fastest, cheapest) among many possibilities is an Optimization Problem, often related to the Traveling Salesperson Problem."
  }
];

export const BUILD_ALGO_INITIAL_STEPS: AlgorithmStepType[] = [
  { id: 'step1', text: "Pick the first friend and assume they are the tallest so far." },
  { id: 'step2', text: "Compare this 'tallest so far' friend with the next friend in the group." },
  { id: 'step3', text: "If the next friend is taller, they become the new 'tallest so far'." },
  { id: 'step4', text: "Repeat steps 2 and 3 for all remaining friends in the group." },
  { id: 'step5', text: "The friend who is 'tallest so far' after checking everyone is the answer." },
  { id: 'step0', text: "Line up all friends from shortest to tallest." }, // Distractor
];

export const BUILD_ALGO_CORRECT_ORDER_IDS: string[] = ['step1', 'step2', 'step3', 'step4', 'step5'];

export const PERFORMANCE_DATA_LIST: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const PERFORMANCE_TARGET_NUMBER: number = 11;

export const BUBBLE_SORT_INITIAL_DATA: number[] = [5, 1, 4, 2, 8, 6];

export const GREEDY_PATH_GRAPH: GreedyGraph = {
  nodes: [
    { id: 'S', label: 'S', x: 50, y: 75, isEndpoint: true },
    { id: 'A', label: 'A', x: 120, y: 30 },
    { id: 'B', label: 'B', x: 120, y: 120 },
    { id: 'E', label: 'E', x: 200, y: 75, isEndpoint: true },
  ],
  edges: [
    { id: 'S-A', from: 'S', to: 'A', cost: 10 },
    { id: 'S-B', from: 'S', to: 'B', cost: 5 },
    { id: 'A-E', from: 'A', to: 'E', cost: 3 },
    { id: 'B-E', from: 'B', to: 'E', cost: 8 },
  ],
};

    