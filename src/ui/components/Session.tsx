import { useRef, useState } from 'react';
import { recordAnswer, type AnswerMode } from '../../core/progress';
import type { Exercise } from '../../core/types';
import { similar } from '../../content/registry';
import { play } from '../sound';
import { store, useProgress } from '../store';
import { ConfirmDialog } from './ConfirmDialog';
import { ExerciseView, formatAnswer } from './ExerciseView';

export interface SessionSummary {
  /** Share of tasks solved correctly on the first try (main round only). */
  accuracy: number;
  correctFirst: number;
  total: number;
  xp: number;
  repeatRounds: number;
}

interface Props {
  exercises: Exercise[];
  /** How answers of the first round are recorded: 'first' (block / training) or 'review' (Leitner box). */
  answerMode: Extract<AnswerMode, 'first' | 'review'>;
  onExit: () => void;
  onFinish: (summary: SessionSummary) => void;
}

/**
 * Runs a learning block:
 * 1. main round – every task once, with immediate correction,
 * 2. correction overview – all mistakes with solution,
 * 3. repetition round – similar tasks for every mistake, repeated until all are right.
 */
export function Session({ exercises, answerMode, onExit, onFinish }: Props) {
  const settings = useProgress().settings;
  const [items, setItems] = useState(exercises);
  const [roundNo, setRoundNo] = useState(0);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'play' | 'correction'>('play');
  const [answered, setAnswered] = useState(false);
  const [combo, setCombo] = useState(0);
  const [xpPop, setXpPop] = useState<{ v: number; k: number } | null>(null);
  const [askExit, setAskExit] = useState(false);
  const wrong = useRef<Exercise[]>([]);
  const [wrongList, setWrongList] = useState<Exercise[]>([]);
  const stats = useRef({ correctFirst: 0, xp: 0 });
  const started = useRef(Date.now());

  const isRepeat = roundNo > 0;
  const ex = items[idx];

  const handleAnswered = (correct: boolean, usedHint: boolean) => {
    const seconds = Math.min(300, Math.round((Date.now() - started.current) / 1000));
    const mode: AnswerMode = isRepeat ? 'repeat' : answerMode;
    let gained = 0;
    store.update((s) => {
      const r = recordAnswer(s, ex, correct, { mode, usedHint, seconds });
      gained = r.xp;
      return r.state;
    });
    stats.current.xp += gained;
    if (gained) setXpPop({ v: gained, k: Date.now() });
    if (!isRepeat && correct) stats.current.correctFirst++;
    if (!correct) wrong.current.push(ex);
    setCombo((c) => (correct ? c + 1 : 0));
    setAnswered(true);
    play(correct ? 'correct' : 'wrong', settings.sound);
  };

  const finish = () =>
    onFinish({
      accuracy: stats.current.correctFirst / exercises.length,
      correctFirst: stats.current.correctFirst,
      total: exercises.length,
      xp: stats.current.xp,
      repeatRounds: roundNo,
    });

  const handleNext = () => {
    setAnswered(false);
    started.current = Date.now();
    if (idx + 1 < items.length) {
      setIdx(idx + 1);
      return;
    }
    if (wrong.current.length > 0) {
      setWrongList(wrong.current);
      setPhase('correction');
    } else finish();
  };

  const startRepeat = () => {
    setItems(wrongList.map((w) => similar(w)));
    wrong.current = [];
    setRoundNo((r) => r + 1);
    setIdx(0);
    setPhase('play');
    started.current = Date.now();
  };

  const progress = (idx + (answered ? 1 : 0)) / items.length;

  return (
    <div className="session">
      <ConfirmDialog
        open={askExit}
        title="Block abbrechen?"
        text="Gesammelte XP bleiben erhalten, der Block zählt aber noch nicht als geschafft."
        confirmLabel="Abbrechen"
        cancelLabel="Weiterlernen"
        danger
        onConfirm={onExit}
        onCancel={() => setAskExit(false)}
      />
      <div className="session-top">
        <button
          className="icon-btn"
          aria-label="Abbrechen"
          onClick={() => setAskExit(true)}
        >
          ✕
        </button>
        <div className={`session-progress ${isRepeat ? 'repeat' : ''}`}>
          <div style={{ width: `${phase === 'correction' ? 100 : progress * 100}%` }} />
        </div>
        <span className={`combo ${combo >= 3 ? 'hot' : ''}`} title="Richtige Antworten in Folge">
          {combo >= 3 ? `🔥 ${combo}` : `${idx + 1}/${items.length}`}
        </span>
        {xpPop && (
          <span key={xpPop.k} className="xp-pop">
            +{xpPop.v} XP
          </span>
        )}
      </div>

      {phase === 'play' ? (
        <>
          {isRepeat && (
            <div className="repeat-banner">
              🔁 Wiederholungsrunde {roundNo > 1 ? roundNo : ''} – ähnliche Aufgaben zu deinen Fehlern
            </div>
          )}
          <ExerciseView key={ex.id} exercise={ex} onAnswered={handleAnswered} onNext={handleNext} />
        </>
      ) : (
        <div className="correction">
          <div className="correction-head">
            <div className="big-emoji">🧐</div>
            <h2>Korrektur</h2>
            <p>
              {isRepeat
                ? `Noch ${wrongList.length} ${wrongList.length === 1 ? 'Aufgabe' : 'Aufgaben'} – fast geschafft!`
                : `${stats.current.correctFirst} von ${exercises.length} auf Anhieb richtig. Schau dir die Fehler kurz an – danach kommen ähnliche Aufgaben nochmals.`}
            </p>
          </div>
          <ul className="correction-list">
            {wrongList.map((w) => (
              <li key={w.id}>
                {w.context && <p className="muted small">{w.context}</p>}
                <p className="c-prompt">{w.prompt}</p>
                <p className="c-answer">
                  Richtig: <b>{formatAnswer(w)}</b>
                </p>
                <details>
                  <summary>Lösungsweg</summary>
                  <ol className="solution">
                    {w.solution.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </details>
              </li>
            ))}
          </ul>
          <div className="sticky-actions">
            <button className="btn primary big" onClick={startRepeat}>
              {wrongList.length === 1 ? 'Ähnliche Aufgabe lösen' : `${wrongList.length} ähnliche Aufgaben lösen`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
