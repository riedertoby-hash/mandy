import { parseNumber } from './format';
import type { Exercise, UserAnswer } from './types';

export type CheckResult = { correct: boolean; invalid?: boolean };

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
  }
}
