import { useEffect, useRef, useState } from 'react';
import { checkAnswer } from '../../core/check';
import { chf, num } from '../../core/format';
import type { Exercise, UserAnswer } from '../../core/types';
import { Grid, VisualView } from './Visuals';

export function formatAnswer(ex: Exercise): string {
  if (ex.type === 'choice') return ex.options[ex.answerIndex];
  if (ex.type === 'grid') return `${ex.answer} Kästchen`;
  if (ex.prefix === 'CHF') return chf(ex.answer);
  const value = num(ex.answer, 4);
  return `${ex.prefix ? ex.prefix + ' ' : ''}${value}${ex.unit ? ' ' + ex.unit : ''}`;
}

const PRAISE = ['Super!', 'Genau!', 'Stark!', 'Richtig!', 'Perfekt!', 'Klasse!', 'Bravo!'];

interface Props {
  exercise: Exercise;
  onAnswered: (correct: boolean, usedHint: boolean) => void;
  onNext: () => void;
  label?: string;
}

export function ExerciseView({ exercise: ex, onAnswered, onNext, label }: Props) {
  const [raw, setRaw] = useState('');
  const [choice, setChoice] = useState<number | null>(null);
  const [filled, setFilled] = useState(0);
  const [status, setStatus] = useState<'answering' | 'correct' | 'wrong'>('answering');
  const [hint, setHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [praise] = useState(() => PRAISE[Math.floor(Math.random() * PRAISE.length)]);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ex.type === 'number') inputRef.current?.focus({ preventScroll: true });
  }, [ex]);
  useEffect(() => {
    if (status !== 'answering') nextRef.current?.focus({ preventScroll: true });
  }, [status]);

  const answer = (): UserAnswer | null => {
    if (ex.type === 'number') return raw.trim() ? { kind: 'number', raw } : null;
    if (ex.type === 'choice') return choice === null ? null : { kind: 'choice', index: choice };
    return { kind: 'grid', filled };
  };

  const submit = () => {
    if (status !== 'answering') return;
    const a = answer();
    if (!a) return;
    const res = checkAnswer(ex, a);
    if (res.invalid) {
      setInvalid(true);
      setTimeout(() => setInvalid(false), 1600);
      return;
    }
    setStatus(res.correct ? 'correct' : 'wrong');
    setShowSolution(!res.correct);
    onAnswered(res.correct, hint);
  };

  const done = status !== 'answering';
  const canSubmit = ex.type === 'number' ? raw.trim() !== '' : ex.type === 'choice' ? choice !== null : true;

  return (
    <div
      className={`exercise ${status}`}
      // Dev only: lets the automated UI test answer correctly. Not present in production builds.
      data-answer={import.meta.env.DEV ? (ex.type === 'choice' ? ex.answerIndex : ex.answer) : undefined}
      data-type={ex.type}
    >
      <div className="exercise-card">
        {label && <div className="exercise-label">{label}</div>}
        {ex.context && <p className="exercise-context">{ex.context}</p>}
        <h2 className="exercise-prompt">{ex.prompt}</h2>
        {ex.visual && (
          <div className="exercise-visual">
            <VisualView visual={ex.visual} />
          </div>
        )}

        {ex.type === 'number' && (
          <form
            className={`answer-input ${invalid ? 'shake' : ''}`}
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            {ex.prefix && <span className="affix">{ex.prefix}</span>}
            <input
              ref={inputRef}
              inputMode="decimal"
              autoComplete="off"
              enterKeyHint="done"
              value={raw}
              disabled={done}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="Deine Antwort"
              aria-label="Antwort"
            />
            {ex.unit && <span className="affix">{ex.unit}</span>}
          </form>
        )}
        {invalid && <p className="invalid-msg">Bitte gib eine Zahl ein (z. B. 12.5).</p>}

        {ex.type === 'choice' && (
          <div className="choices">
            {ex.options.map((o, i) => (
              <button
                key={o + i}
                type="button"
                disabled={done}
                className={`choice ${choice === i ? 'selected' : ''} ${done && i === ex.answerIndex ? 'is-correct' : ''} ${done && choice === i && i !== ex.answerIndex ? 'is-wrong' : ''}`}
                onClick={() => setChoice(i)}
              >
                <span className="choice-key">{String.fromCharCode(65 + i)}</span>
                {o}
              </button>
            ))}
          </div>
        )}

        {ex.type === 'grid' && (
          <div className="grid-wrap">
            <Grid total={ex.total} filled={filled} onChange={setFilled} disabled={done} status={done ? (status === 'correct' ? 'correct' : 'wrong') : undefined} />
            <div className="grid-count">
              {filled} von {ex.total} Kästchen = <b>{num((filled * 100) / ex.total, 2)} %</b>
              {!done && (
                <span className="grid-tools">
                  <button type="button" className="mini-btn" onClick={() => setFilled(Math.max(0, filled - 1))} aria-label="Ein Kästchen weniger">
                    −
                  </button>
                  <button type="button" className="mini-btn" onClick={() => setFilled(Math.min(ex.total, filled + 1))} aria-label="Ein Kästchen mehr">
                    +
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {!done && ex.hint && (
          <div className="hint-row">
            {hint ? (
              <p className="hint">💡 {ex.hint}</p>
            ) : (
              <button type="button" className="link-btn" onClick={() => setHint(true)}>
                💡 Tipp anzeigen <small>(halbe Punkte)</small>
              </button>
            )}
          </div>
        )}
      </div>

      <div className={`feedback ${status}`}>
        {!done ? (
          <button type="button" className="btn primary big" disabled={!canSubmit} onClick={submit}>
            Prüfen
          </button>
        ) : (
          <>
            <div className="feedback-head">
              {status === 'correct' ? (
                <strong>✅ {praise}</strong>
              ) : (
                <strong>
                  ❌ Leider nicht. Richtig wäre: <span className="right-answer">{formatAnswer(ex)}</span>
                </strong>
              )}
              {status === 'correct' && !showSolution && (
                <button type="button" className="link-btn" onClick={() => setShowSolution(true)}>
                  Lösungsweg
                </button>
              )}
            </div>
            {showSolution && (
              <ol className="solution">
                {ex.solution.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
            <button ref={nextRef} type="button" className={`btn big ${status === 'correct' ? 'success' : 'danger'}`} onClick={onNext}>
              Weiter
            </button>
          </>
        )}
      </div>
    </div>
  );
}
