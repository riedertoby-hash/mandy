import { describe, expect, it } from 'vitest';
import { chf, num, parseNumber } from '../src/core/format';
import {
  completeBlock,
  dueReviews,
  initialState,
  levelInfo,
  medalFor,
  recordAnswer,
  reviewKey,
  starsFor,
} from '../src/core/progress';
import type { NumberExercise } from '../src/core/types';
import { mathSubject } from '../src/content/math';

describe('format', () => {
  it('parses Swiss and German inputs', () => {
    expect(parseNumber('12,5')).toBe(12.5);
    expect(parseNumber("1'250.50")).toBe(1250.5);
    expect(parseNumber('CHF 30.–')).toBe(30);
    expect(parseNumber('35 %')).toBe(35);
    expect(parseNumber('3/4')).toBe(0.75);
    expect(parseNumber('-2')).toBe(-2);
    expect(parseNumber('abc')).toBeNull();
    expect(parseNumber('')).toBeNull();
  });
  it('formats numbers the Swiss way', () => {
    expect(num(1234567.891)).toBe("1'234'567.89");
    expect(chf(12.5)).toBe('CHF 12.50');
  });
});

const ex: NumberExercise = { id: 'a', gen: 'p3.basic', chapterId: 'p3', difficulty: 1, type: 'number', prompt: 'x', answer: 1, solution: ['x'] };

describe('progress', () => {
  it('levels grow', () => {
    expect(levelInfo(0).level).toBe(1);
    expect(levelInfo(100).level).toBe(2);
    expect(levelInfo(299).level).toBe(2);
    expect(levelInfo(300).level).toBe(3);
  });

  it('stars and medals use thresholds', () => {
    expect(starsFor(0.95)).toBe(3);
    expect(starsFor(0.75)).toBe(2);
    expect(starsFor(0.2)).toBe(1);
    expect(medalFor(0.9)).toBe('gold');
    expect(medalFor(0.7)).toBe('silver');
    expect(medalFor(0.5)).toBe('bronze');
  });

  it('wrong answers go into the review box and climb on correct reviews', () => {
    let s = initialState('2026-01-01');
    s = recordAnswer(s, ex, false, { mode: 'first', today: '2026-01-01' }).state;
    const key = reviewKey(ex);
    expect(s.review[key].box).toBe(1);
    expect(dueReviews(s, '2026-01-01')).toHaveLength(0);
    expect(dueReviews(s, '2026-01-02')).toHaveLength(1);
    s = recordAnswer(s, ex, true, { mode: 'review', today: '2026-01-02' }).state;
    expect(s.review[key].box).toBe(2);
    expect(s.review[key].due).toBe('2026-01-04');
    s = recordAnswer(s, ex, false, { mode: 'review', today: '2026-01-04' }).state;
    expect(s.review[key].box).toBe(1);
  });

  it('review item is mastered after the last box', () => {
    let s = initialState('2026-01-01');
    s = recordAnswer(s, ex, false, { mode: 'first', today: '2026-01-01' }).state;
    for (let i = 0; i < 5; i++) s = recordAnswer(s, ex, true, { mode: 'review', today: '2026-03-01' }).state;
    expect(Object.keys(s.review)).toHaveLength(0);
    expect(s.totals.mastered).toBe(1);
  });

  it('streak counts consecutive days', () => {
    let s = initialState('2026-01-01');
    s = recordAnswer(s, ex, true, { mode: 'first', today: '2026-01-01' }).state;
    s = recordAnswer(s, ex, true, { mode: 'first', today: '2026-01-02' }).state;
    expect(s.streak.current).toBe(2);
    s = recordAnswer(s, ex, true, { mode: 'first', today: '2026-01-05' }).state;
    expect(s.streak.current).toBe(1);
    expect(s.streak.best).toBe(2);
  });

  it('medal is awarded when all blocks of a chapter are done and can be upgraded', () => {
    const chapter = mathSubject.topics.find((t) => t.chapters.length)!.chapters[0];
    let s = initialState();
    let medal;
    for (const b of chapter.blocks) {
      const r = completeBlock(s, { blockId: b.id, chapter, subject: mathSubject, accuracy: 0.5 });
      s = r.state;
      medal = r.medal;
    }
    expect(medal?.medal).toBe('bronze');
    const r = completeBlock(s, { blockId: chapter.blocks[0].id, chapter, subject: mathSubject, accuracy: 1 });
    expect(r.medal).toBeUndefined(); // avg (1 + .5 + .5)/3 < .7
    let s2 = r.state;
    const r2 = completeBlock(s2, { blockId: chapter.blocks[1].id, chapter, subject: mathSubject, accuracy: 1 });
    s2 = r2.state;
    expect(r2.medal?.medal).toBe('silver');
    expect(r2.medal?.upgraded).toBe(true);
    expect(s2.trophies.mathe).toBeUndefined(); // other math topics not available yet
  });
});
