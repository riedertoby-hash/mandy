import { describe, expect, it } from 'vitest';
import { checkAnswer } from '../src/core/check';
import { createRng } from '../src/core/random';
import type { Difficulty, Exercise, UserAnswer } from '../src/core/types';
import { buildBlock, GENERATORS, similar } from '../src/content/registry';
import { SUBJECTS } from '../src/content/subjects';

const correctAnswer = (ex: Exercise): UserAnswer => {
  switch (ex.type) {
    case 'number':
      return { kind: 'number', raw: String(ex.answer) };
    case 'choice':
      return { kind: 'choice', index: ex.answerIndex };
    case 'grid':
      return { kind: 'grid', filled: ex.answer };
    case 'text':
      return { kind: 'text', raw: ex.answers[0] };
    case 'order':
      return { kind: 'order', tiles: ex.answers[0].split(' ') };
  }
};

describe('generators', () => {
  for (const [id, gen] of Object.entries(GENERATORS)) {
    it(`${id} produces valid, self-consistent tasks`, () => {
      const rng = createRng(42);
      for (const d of [1, 2, 3] as Difficulty[]) {
        for (let i = 0; i < 150; i++) {
          const ex = gen(rng, d, 'test');
          const text = [ex.prompt, ex.context ?? '', ...ex.solution].join(' ');
          expect(text, `${id} d${d}`).not.toMatch(/NaN|undefined|Infinity/);
          expect(ex.solution.length).toBeGreaterThan(0);
          expect(checkAnswer(ex, correctAnswer(ex)).correct, `${id} d${d}: ${ex.prompt}`).toBe(true);
          if (ex.type === 'number') {
            expect(Number.isFinite(ex.answer)).toBe(true);
            // A value just outside the allowed tolerance must be rejected.
            const outside = ex.answer + (ex.tolerance ?? 0.001) + 1;
            expect(checkAnswer(ex, { kind: 'number', raw: String(outside) }).correct).toBe(false);
          }
          if (ex.type === 'choice') {
            expect(new Set(ex.options).size, `${id}: duplicate options in "${ex.prompt}" ${ex.options}`).toBe(ex.options.length);
            expect(ex.options.length).toBeGreaterThanOrEqual(2);
            expect(ex.answerIndex).toBeGreaterThanOrEqual(0);
          }
          if (ex.type === 'text') {
            expect(ex.answers.length).toBeGreaterThan(0);
            expect(checkAnswer(ex, { kind: 'text', raw: 'zzz' }).correct).toBe(false);
          }
          if (ex.type === 'order') {
            // Tiles may hold several words (German Satzglieder) – compare the word multisets.
            const words = (t: string) => t.toLowerCase().split(' ').sort().join(' ');
            const sorted = words(ex.tiles.join(' '));
            for (const a of ex.answers) expect(words(a), `${id}: tiles ≠ answer`).toBe(sorted);
            expect(ex.tiles.length).toBeGreaterThan(2);
          }
          if (ex.type === 'grid') {
            expect(ex.answer).toBeGreaterThan(0);
            expect(ex.answer).toBeLessThan(ex.total);
          }
        }
      }
    });
  }
});

describe('content structure', () => {
  it('every block references existing generators', () => {
    for (const s of SUBJECTS)
      for (const t of s.topics)
        for (const c of t.chapters)
          for (const b of c.blocks) {
            expect(b.gens.length).toBeGreaterThan(0);
            for (const g of b.gens) expect(GENERATORS[g], `${b.id} → ${g}`).toBeDefined();
          }
  });

  it('ids are unique', () => {
    const ids = SUBJECTS.flatMap((s) => s.topics.flatMap((t) => t.chapters.flatMap((c) => [c.id, ...c.blocks.map((b) => b.id)])));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('buildBlock creates the right number of tasks and similar() keeps the kind', () => {
    const chapter = SUBJECTS[0].topics.find((t) => t.chapters.length)!.chapters[2];
    const list = buildBlock(chapter.blocks[1], chapter.id, createRng(1));
    expect(list).toHaveLength(chapter.blocks[1].count);
    const twin = similar(list[0], createRng(2));
    expect(twin.gen).toBe(list[0].gen);
    expect(twin.difficulty).toBe(list[0].difficulty);
  });
});
