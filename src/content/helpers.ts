// Shared builders for task generators of all subjects.
import { num } from '../core/format';
import { uid } from '../core/random';
import type { ChoiceExercise, Difficulty, GridExercise, NumberExercise, Rng } from '../core/types';

export type Base = { gen: string; chapterId: string; difficulty: Difficulty };
export type NumberFields = Omit<NumberExercise, 'id' | 'type' | keyof Base>;
export type ChoiceFields = Omit<ChoiceExercise, 'id' | 'type' | keyof Base | 'answerIndex' | 'options'>;

export const numberEx = (b: Base, f: NumberFields): NumberExercise => ({ ...b, ...f, type: 'number', id: uid(b.gen) });

export const gridEx = (b: Base, f: Omit<GridExercise, 'id' | 'type' | keyof Base>): GridExercise => ({
  ...b,
  ...f,
  type: 'grid',
  id: uid(b.gen),
});

/** Multiple choice: `correct` plus distinct wrong options, shuffled. */
export function choiceEx(rng: Rng, b: Base, f: ChoiceFields, correct: string, wrong: string[]): ChoiceExercise {
  const uniqueWrong = [...new Set(wrong.filter((w) => w !== correct))];
  const all = rng.shuffle([correct, ...uniqueWrong]);
  return { ...b, ...f, type: 'choice', id: uid(b.gen), options: all, answerIndex: all.indexOf(correct) };
}

/** Multiple choice with a fixed option order. */
export function fixedChoiceEx(b: Base, f: ChoiceFields, options: string[], answerIndex: number): ChoiceExercise {
  return { ...b, ...f, type: 'choice', id: uid(b.gen), options, answerIndex };
}

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const r4 = (n: number) => num(n, 4);
/** Signed number for equations: −3 with a real minus sign. */
export const sn = (n: number) => num(n, 4);
