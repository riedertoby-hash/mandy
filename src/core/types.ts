// Core content model. Subjects → Topics → Chapters → Blocks → Exercises.
// Any subject (Deutsch, Englisch, …) plugs in by providing the same structure.

export type Difficulty = 1 | 2 | 3;

/** Optional picture shown with a task or a theory card. */
export type Visual =
  | { kind: 'grid'; total: number; filled: number }
  | { kind: 'bar'; percent: number; left?: string; right?: string; marks?: number[] };

interface ExerciseBase {
  /** Unique id of this concrete task instance. */
  id: string;
  /** Generator that produced it – used to create "similar" tasks for repetition. */
  gen: string;
  chapterId: string;
  difficulty: Difficulty;
  prompt: string;
  /** Short context line above the prompt (e.g. a story). */
  context?: string;
  visual?: Visual;
  hint?: string;
  /** Step-by-step solution shown after answering. */
  solution: string[];
}

export interface NumberExercise extends ExerciseBase {
  type: 'number';
  answer: number;
  /** Accepted absolute deviation (default 0.001). */
  tolerance?: number;
  unit?: string;
  /** Text placed before the input, e.g. "CHF". */
  prefix?: string;
}

export interface ChoiceExercise extends ExerciseBase {
  type: 'choice';
  options: string[];
  answerIndex: number;
}

export interface GridExercise extends ExerciseBase {
  type: 'grid';
  total: number;
  /** Number of cells that must be filled. */
  answer: number;
}

export type Exercise = NumberExercise | ChoiceExercise | GridExercise;

export type UserAnswer = { kind: 'number'; raw: string } | { kind: 'choice'; index: number } | { kind: 'grid'; filled: number };

export interface Rng {
  next(): number;
  int(min: number, max: number): number;
  pick<T>(items: readonly T[]): T;
  shuffle<T>(items: readonly T[]): T[];
  chance(p: number): boolean;
}

export type Generator = (rng: Rng, difficulty: Difficulty, chapterId: string) => Exercise;

export interface TheoryCard {
  title: string;
  text: string[];
  visual?: Visual;
  example?: { question: string; steps: string[] };
}

export interface BlockDef {
  id: string;
  title: string;
  difficulty: Difficulty;
  count: number;
  /** Generator ids that are mixed in this block. */
  gens: string[];
}

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  theory: TheoryCard[];
  blocks: BlockDef[];
}

export interface Topic {
  id: string;
  title: string;
  /** Lehrplan-21 cycle (1–3) and grade label for the map. */
  cycle: 1 | 2 | 3;
  grade: string;
  icon: string;
  description: string;
  chapters: Chapter[];
  /** Planned chapter titles for topics without content yet. */
  planned?: string[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
}
