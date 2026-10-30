import { useState } from 'react';
import { chapterAccuracy, isBlockUnlocked, isChapterUnlocked, MEDAL_LABEL } from '../../core/progress';
import { findChapter } from '../../content/subjects';
import { MedalIcon, Stars } from '../components/Badges';
import { TopBar } from '../components/TopBar';
import { VisualView } from '../components/Visuals';
import { href } from '../router';
import { useProgress } from '../store';
import { NotFound } from './SubjectScreen';

const DIFF_LABEL = { 1: 'leicht', 2: 'mittel', 3: 'schwer' } as const;

export function ChapterScreen({ id }: { id: string }) {
  const s = useProgress();
  const found = findChapter(id);
  const neverPlayed = found ? !found.chapter.blocks.some((b) => s.blocks[b.id]) : true;
  const [showTheory, setShowTheory] = useState(neverPlayed);
  const [card, setCard] = useState(0);
  if (!found) return <NotFound />;
  const { topic, chapter } = found;
  const idx = topic.chapters.indexOf(chapter);
  if (!isChapterUnlocked(s, topic.chapters, idx)) return <NotFound />;
  const medal = s.medals[chapter.id]?.medal;
  const acc = chapterAccuracy(s, chapter);
  const theory = chapter.theory[card];

  return (
    <div className="page">
      <TopBar back={href.topic(topic.id)} title={`Kapitel ${idx + 1}`} />
      <section className="chapter-head card">
        <div className="chapter-icon">{chapter.icon}</div>
        <div className="grow">
          <h1>{chapter.title}</h1>
          <p className="muted">{chapter.subtitle}</p>
        </div>
        <div className="chapter-medal">
          <MedalIcon medal={medal} size={44} />
          <small>{medal ? MEDAL_LABEL[medal] : 'offen'}</small>
        </div>
      </section>
      {acc !== null && (
        <p className="small muted center">
          Trefferquote auf Anhieb: {Math.round(acc * 100)} %{' '}
          {medal !== 'gold' && '· Ab 70 % gibt es Silber, ab 90 % Gold – spiel die Blöcke nochmals, um aufzusteigen.'}
        </p>
      )}

      <section className="card theory">
        <button className="theory-toggle" onClick={() => setShowTheory(!showTheory)} aria-expanded={showTheory}>
          <span>📘 Lernkarte{chapter.theory.length > 1 ? `n (${chapter.theory.length})` : ''}</span>
          <span>{showTheory ? '▲' : '▼'}</span>
        </button>
        {showTheory && theory && (
          <div className="theory-body">
            <h3>{theory.title}</h3>
            {theory.text.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            {theory.visual && (
              <div className="theory-visual">
                <VisualView visual={theory.visual} />
              </div>
            )}
            {theory.example && (
              <div className="example">
                <b>Beispiel: {theory.example.question}</b>
                <ol>
                  {theory.example.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ol>
              </div>
            )}
            {chapter.theory.length > 1 && (
              <div className="theory-nav">
                <button className="btn ghost" disabled={card === 0} onClick={() => setCard(card - 1)}>
                  ‹ Zurück
                </button>
                <span className="dots">
                  {chapter.theory.map((_, i) => (
                    <i key={i} className={i === card ? 'on' : ''} />
                  ))}
                </span>
                <button className="btn ghost" disabled={card === chapter.theory.length - 1} onClick={() => setCard(card + 1)}>
                  Weiter ›
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <h2 className="section-title">Lernblöcke</h2>
      <div className="block-list">
        {chapter.blocks.map((b, i) => {
          const bp = s.blocks[b.id];
          const unlocked = isBlockUnlocked(s, chapter, i);
          return (
            <div key={b.id} className={`block-card ${unlocked ? '' : 'locked'} ${bp?.completed ? 'completed' : ''}`}>
              <div className={`block-level d${b.difficulty}`}>{unlocked ? i + 1 : '🔒'}</div>
              <div className="grow">
                <b>{b.title}</b>
                <small className="muted">
                  {b.count} Aufgaben · {DIFF_LABEL[b.difficulty]}
                  {bp?.completed ? ` · beste Quote ${Math.round(bp.bestAccuracy * 100)} %` : ''}
                </small>
                <Stars count={bp?.stars ?? 0} />
              </div>
              {unlocked ? (
                <a className={`btn ${bp?.completed ? 'ghost' : 'primary'}`} href={href.lesson(b.id)}>
                  {bp?.completed ? 'Nochmals' : 'Start'}
                </a>
              ) : (
                <span className="small muted">gesperrt</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
