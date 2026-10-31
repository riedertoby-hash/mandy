import { createRng } from '../core/random';
import type { BlockDef, Difficulty, Exercise, Generator, Rng } from '../core/types';
import { equationGenerators } from './math/equationGenerators';
import { percentGenerators } from './math/percentGenerators';
import { proportionalGenerators } from './math/proportionalGenerators';
import { pythagorasGenerators } from './math/pythagorasGenerators';

export const GENERATORS: Record<string, Generator> = {
  ...percentGenerators,
  ...proportionalGenerators,
  ...equationGenerators,
  ...pythagorasGenerators,
};

export function generate(gen: string, difficulty: Difficulty, chapterId: string, rng: Rng = createRng()): Exercise {
  const g = GENERATORS[gen];
  if (!g) throw new Error(`Unknown generator: ${gen}`);
  return g(rng, difficulty, chapterId);
}

/** A task of the same kind with new numbers (used for repetition). */
export function similar(ex: Exercise, rng: Rng = createRng()): Exercise {
  for (let i = 0; i < 6; i++) {
    const next = generate(ex.gen, ex.difficulty, ex.chapterId, rng);
    if (next.prompt + (next.context ?? '') !== ex.prompt + (ex.context ?? '')) return next;
  }
  return generate(ex.gen, ex.difficulty, ex.chapterId, rng);
}

/** Builds the task list of a block: generators are mixed evenly, duplicates avoided. */
export function buildBlock(block: BlockDef, chapterId: string, rng: Rng = createRng()): Exercise[] {
  const order: string[] = [];
  while (order.length < block.count) order.push(...rng.shuffle(block.gens));
  const seen = new Set<string>();
  const result: Exercise[] = [];
  for (const gen of order.slice(0, block.count)) {
    let ex = generate(gen, block.difficulty, chapterId, rng);
    for (let i = 0; i < 8 && seen.has(ex.prompt + (ex.context ?? '')); i++) ex = generate(gen, block.difficulty, chapterId, rng);
    seen.add(ex.prompt + (ex.context ?? ''));
    result.push(ex);
  }
  return result;
}
