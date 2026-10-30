import { useState } from 'react';
import { dueReviews, nextReviewDay, daysBetween, dayKey } from '../../core/progress';
import type { Exercise } from '../../core/types';
import { buildBlock, generate } from '../../content/registry';
import { findChapter, SUBJECTS } from '../../content/subjects';
import { createRng } from '../../core/random';
import { Confetti } from '../components/Badges';
import { Session, type SessionSummary } from '../components/Session';
import { TopBar } from '../components/TopBar';
import { href } from '../router';
import { useProgress } from '../store';

const MAX_REVIEW = 12;

function practiceSet(blocksDone: Set<string>): Exercise[] {
  const rng = createRng();
  const blocks = SUBJECTS.flatMap((s) => s.topics.flatMap((t) => t.chapters.flatMap((c) => c.blocks.map((b) => ({ b, c }))))).filter(({ b }) => blocksDone.has(b.id));
  if (!blocks.length) return [];
  const picks = rng.shuffle(blocks).slice(0, 5);
  return rng.shuffle(picks.flatMap(({ b, c }) => buildBlock({ ...b, count: 2 }, c.id, rng))).slice(0, 10);
}

export function ReviewScreen() {
  const s = useProgress();
  const [session, setSession] = useState<{ items: Exercise[]; mode: 'first' | 'review' } | null>(null);
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const due = dueReviews(s);
  const nextDay = nextReviewDay(s);
  const boxCounts = [1, 2, 3, 4, 5].map((b) => Object.values(s.review).filter((r) => r.box === b).length);
  const doneBlocks = new Set(Object.entries(s.blocks).filter(([, v]) => v.completed).map(([k]) => k));

  if (session && !summary)
    return (
      <div className="page lesson-page">
        <div className="lesson-title">🧠 {session.mode === 'review' ? 'Wiederholen' : 'Freies Training'}</div>
        <Session exercises={session.items} answerMode={session.mode} onExit={() => setSession(null)} onFinish={setSummary} />
      </div>
    );

  if (summary)
    return (
      <div className="page result">
        <Confetti pieces={50} />
        <div className="result-card card">
          <div className="big-emoji">🧠</div>
          <h1>Gefestigt!</h1>
          <div className="result-stats">
            <div>
              <b>
                {summary.correctFirst}/{summary.total}
              </b>
              <small>auf Anhieb</small>
            </div>
            <div>
              <b>+{summary.xp}</b>
              <small>XP</small>
            </div>
          </div>
          <p className="muted small">Richtig gelöste Aufgabentypen wandern ein Fach weiter und kommen später wieder – so bleibt es im Kopf.</p>
          <div className="result-actions">
            <a className="btn primary big" href={href.home()}>
              Zur Startseite
            </a>
            <button
              className="btn ghost"
              onClick={() => {
                setSummary(null);
                setSession(null);
              }}
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    );

  const startReview = () => {
    const rng = createRng();
    setSession({ items: due.slice(0, MAX_REVIEW).map((r) => generate(r.gen, r.difficulty, r.chapterId, rng)), mode: 'review' });
  };

  return (
    <div className="page">
      <TopBar back={href.home()} title="Wiederholen" />
      <section className="card center review-hero">
        <div className="big-emoji">🧠</div>
        {due.length ? (
          <>
            <h2>{due.length} {due.length === 1 ? 'Aufgabentyp ist' : 'Aufgabentypen sind'} fällig</h2>
            <p className="muted">Fehler von früher kommen hier mit neuen Zahlen zurück. Löst du sie richtig, kommen sie seltener – bis du sie sicher kannst.</p>
            <button className="btn primary big" onClick={startReview}>
              Jetzt wiederholen ({Math.min(due.length, MAX_REVIEW)})
            </button>
          </>
        ) : (
          <>
            <h2>Nichts fällig 🎉</h2>
            <p className="muted">
              {nextDay
                ? `Nächste Wiederholung ${daysBetween(dayKey(), nextDay) <= 1 ? 'morgen' : `in ${daysBetween(dayKey(), nextDay)} Tagen`}.`
                : 'Sobald dir ein Fehler passiert, landet er hier zum Festigen.'}
            </p>
          </>
        )}
      </section>

      <section className="card">
        <h3>Deine Lernkiste</h3>
        <p className="small muted">Jedes Fach ist ein Abstand: 1 Tag → 2 → 4 → 8 → 16 Tage. Nach Fach 5 gilt ein Aufgabentyp als gemeistert.</p>
        <div className="boxes">
          {boxCounts.map((n, i) => (
            <div key={i} className="box">
              <div className="box-stack">
                {Array.from({ length: Math.min(n, 6) }, (_, k) => (
                  <i key={k} />
                ))}
              </div>
              <b>{n}</b>
              <small>Fach {i + 1}</small>
            </div>
          ))}
          <div className="box mastered">
            <div className="box-stack">⭐</div>
            <b>{s.totals.mastered}</b>
            <small>gemeistert</small>
          </div>
        </div>
        {Object.values(s.review).length > 0 && (
          <ul className="review-list">
            {Object.values(s.review)
              .sort((a, b) => a.due.localeCompare(b.due))
              .slice(0, 8)
              .map((r) => (
                <li key={r.key}>
                  <span>{findChapter(r.chapterId)?.chapter.title ?? r.chapterId}</span>
                  <small className="muted">
                    Fach {r.box} · {r.due <= dayKey() ? 'fällig' : `ab ${r.due.split('-').reverse().join('.')}`}
                  </small>
                </li>
              ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h3>Freies Training</h3>
        <p className="small muted">Gemischte Aufgaben aus allen Blöcken, die du schon abgeschlossen hast.</p>
        <button className="btn ghost" disabled={!doneBlocks.size} onClick={() => setSession({ items: practiceSet(doneBlocks), mode: 'first' })}>
          {doneBlocks.size ? 'Training starten (10 Aufgaben)' : 'Schliesse zuerst einen Block ab'}
        </button>
      </section>
    </div>
  );
}
