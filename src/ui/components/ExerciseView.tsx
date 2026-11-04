import { useEffect, useRef, useState } from 'react';
import { checkAnswer } from '../../core/check';
import { chf, num } from '../../core/format';
import type { Exercise, UserAnswer } from '../../core/types';
import { canSpeak, speak } from '../speech';
import { Grid, VisualView } from './Visuals';

export function formatAnswer(ex: Exercise): string {
  if (ex.type === 'choice') return ex.options[ex.answerIndex];
  if (ex.type === 'grid') return `${ex.answer} Kästchen`;
  if (ex.type === 'text') return [ex.before, ex.answers[0], ex.after].filter(Boolean).join(' ');
  if (ex.type === 'order') return ex.sequence ? ex.sequence.join(' → ') : ex.answers[0];
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
  const [built, setBuilt] = useState<number[]>([]);
  const [status, setStatus] = useState<'answering' | 'correct' | 'wrong'>('answering');
  const [hint, setHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [praise] = useState(() => PRAISE[Math.floor(Math.random() * PRAISE.length)]);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ex.type === 'number' || ex.type === 'text') inputRef.current?.focus({ preventScroll: true });
  }, [ex]);
  useEffect(() => {
    if (status !== 'answering') nextRef.current?.focus({ preventScroll: true });
  }, [status]);

  const answer = (): UserAnswer | null => {
    if (ex.type === 'number') return raw.trim() ? { kind: 'number', raw } : null;
    if (ex.type === 'choice') return choice === null ? null : { kind: 'choice', index: choice };
    if (ex.type === 'text') return raw.trim() ? { kind: 'text', raw } : null;
    if (ex.type === 'order') return built.length ? { kind: 'order', tiles: built.map((i) => ex.tiles[i]) } : null;
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
  const canSubmit =
    ex.type === 'number' || ex.type === 'text'
      ? raw.trim() !== ''
      : ex.type === 'choice'
        ? choice !== null
        : ex.type === 'order'
          ? built.length === ex.tiles.length
          : true;
  const devAnswer =
    ex.type === 'choice' ? ex.answerIndex : ex.type === 'text' || ex.type === 'order' ? ex.answers[0] : ex.answer;

  return (
    <div
      className={`exercise ${status}`}
      // Dev only: lets the automated UI test answer correctly. Not present in production builds.
      data-answer={import.meta.env.DEV ? devAnswer : undefined}
      data-type={ex.type}
    >
      <div className="exercise-card">
        {label && <div className="exercise-label">{label}</div>}
        {ex.context && <p className="exercise-context">{ex.context}</p>}
        <h2 className="exercise-prompt">
          {ex.prompt}
          {ex.speakPrompt && canSpeak() && (
            <button type="button" className="speak-btn" onClick={() => speak(ex.speakPrompt!)} aria-label="Vorlesen">
              🔊
            </button>
          )}
        </h2>
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
        {ex.type === 'text' && (
          <form
            className={`answer-input text ${invalid ? 'shake' : ''}`}
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            {ex.before && <span className="affix text-affix">{ex.before}</span>}
            <input
              ref={inputRef}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              lang="en"
              enterKeyHint="done"
              value={raw}
              disabled={done}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="…"
              aria-label="Antwort"
            />
            {ex.after && <span className="affix text-affix">{ex.after}</span>}
          </form>
        )}

        {ex.type === 'order' && (
          <div className="order">
            <div className={`order-line ${done ? status : ''}`} aria-label="Dein Satz">
              {built.length === 0 && <span className="order-placeholder">Tippe die Kärtchen in der richtigen Reihenfolge an</span>}
              {built.map((ti, pos) => (
                <button key={ti} type="button" className="tile placed" disabled={done} onClick={() => setBuilt(built.filter((_, p) => p !== pos))}>
                  {ex.tiles[ti]}
                </button>
              ))}
            </div>
            <div className="order-pool">
              {ex.tiles.map((t, ti) => (
                <button key={ti} type="button" className={`tile ${built.includes(ti) ? 'used' : ''}`} disabled={done || built.includes(ti)} onClick={() => setBuilt([...built, ti])}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {invalid && <p className="invalid-msg">{ex.type === 'number' ? 'Bitte gib eine Zahl ein (z. B. 12.5).' : 'Bitte gib zuerst eine Antwort ein.'}</p>}

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
            {done && ex.speak && canSpeak() && (
              <button type="button" className="link-btn speak-line" onClick={() => speak(ex.speak!)}>
                🔊 Anhören
              </button>
            )}
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
