// Core content model. Subjects → Topics → Chapters → Blocks → Exercises.
// Any subject (Deutsch, Englisch, …) plugs in by providing the same structure.

export type Difficulty = 1 | 2 | 3;

/** Optional picture shown with a task or a theory card. */
export type Visual =
  | { kind: 'grid'; total: number; filled: number }
  | { kind: 'bar'; percent: number; left?: string; right?: string; marks?: number[] }
  /** Value table, first column is the row label. */
  | { kind: 'table'; rows: string[][] }
  /** Right triangle: legs a (vertical) and b (horizontal), hypotenuse c. Labels are shown as given. */
  | { kind: 'triangle'; a: string; b: string; c: string; highlight?: 'a' | 'b' | 'c' }
  /** Climate diagram: 12 monthly mean temperatures (°C, line) and precipitation (mm, bars). */
  | { kind: 'climate'; place: string; temp: number[]; precip: number[] };

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
  /** English text read aloud after answering (may contain the solution). */
  speak?: string;
  /** English text that may be read aloud before answering (must not reveal the solution). */
  speakPrompt?: string;
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

/** Typed word or sentence (languages). Comparison ignores case, extra spaces, end punctuation and contractions. */
export interface TextExercise extends ExerciseBase {
  type: 'text';
  /** All accepted answers; the first one is shown as the solution. */
  answers: string[];
  /** Text before / after the input, e.g. "She" … "football." */
  before?: string;
  after?: string;
}

/** Build a sentence by tapping word tiles in the right order. */
export interface OrderExercise extends ExerciseBase {
  type: 'order';
  /** Tiles in shuffled order. */
  tiles: string[];
  /** Correct sentence(s) as tile sequences joined by single spaces. */
  answers: string[];
}

export type Exercise = NumberExercise | ChoiceExercise | GridExercise | TextExercise | OrderExercise;

export type UserAnswer =
  | { kind: 'number'; raw: string }
  | { kind: 'choice'; index: number }
  | { kind: 'grid'; filled: number }
  | { kind: 'text'; raw: string }
  | { kind: 'order'; tiles: string[] };

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
