import { parseNumber } from './format';
import type { Exercise, UserAnswer } from './types';

export type CheckResult = { correct: boolean; invalid?: boolean };

const CONTRACTIONS: [RegExp, string][] = [
  [/\bcan't\b/g, 'can not'],
  [/\bcannot\b/g, 'can not'],
  [/\bwon't\b/g, 'will not'],
  [/\bshan't\b/g, 'shall not'],
  [/n't\b/g, ' not'],
  [/'m\b/g, ' am'],
  [/'re\b/g, ' are'],
  [/'ve\b/g, ' have'],
  [/'ll\b/g, ' will'],
];

/** Normalises typed language answers: case, spaces, apostrophes, end punctuation, contractions. */
export function normalizeText(s: string): string {
  let t = s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[.!?,;:]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  for (const [re, rep] of CONTRACTIONS) t = t.replace(re, rep);
  return t.replace(/\s+/g, ' ').trim();
}

export function checkAnswer(ex: Exercise, ans: UserAnswer): CheckResult {
  switch (ex.type) {
    case 'number': {
      if (ans.kind !== 'number') return { correct: false, invalid: true };
      const v = parseNumber(ans.raw);
      if (v === null) return { correct: false, invalid: true };
      const tol = ex.tolerance ?? 0.001;
      return { correct: Math.abs(v - ex.answer) <= tol + 1e-9 };
    }
    case 'choice':
      if (ans.kind !== 'choice') return { correct: false, invalid: true };
      return { correct: ans.index === ex.answerIndex };
    case 'grid':
      if (ans.kind !== 'grid') return { correct: false, invalid: true };
      return { correct: ans.filled === ex.answer };
    case 'text': {
      if (ans.kind !== 'text' || !ans.raw.trim()) return { correct: false, invalid: true };
      const given = normalizeText(ans.raw);
      return { correct: ex.answers.some((a) => normalizeText(a) === given) };
    }
    case 'order': {
      if (ans.kind !== 'order' || ans.tiles.length === 0) return { correct: false, invalid: true };
      const given = normalizeText(ans.tiles.join(' '));
      return { correct: ex.answers.some((a) => normalizeText(a) === given) };
    }
  }
}
