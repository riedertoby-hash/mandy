import type { BlockDef, Difficulty } from '../../core/types';

const LEVELS: [Difficulty, string, number][] = [
  [1, 'Einstieg', 6],
  [2, 'Training', 8],
  [3, 'Profi', 8],
];

/** Three blocks per chapter: easy → medium → hard. */
export function blocks(chapterId: string, gens: Partial<Record<Difficulty, string[]>> & { all?: string[] }): BlockDef[] {
  return LEVELS.map(([difficulty, title, count]) => ({
    id: `${chapterId}.b${difficulty}`,
    title,
    difficulty,
    count,
    gens: gens[difficulty] ?? gens.all ?? [],
  }));
}
