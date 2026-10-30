import { useMemo, useState } from 'react';
import { completeBlock, MEDAL_LABEL, type BlockResult } from '../../core/progress';
import { buildBlock } from '../../content/registry';
import { findBlock } from '../../content/subjects';
import { Confetti, MedalIcon, Stars, TrophyIcon } from '../components/Badges';
import { Session, type SessionSummary } from '../components/Session';
import { go, href } from '../router';
import { play } from '../sound';
import { store, useProgress } from '../store';
import { NotFound } from './SubjectScreen';

export function LessonScreen({ blockId }: { blockId: string }) {
  const found = findBlock(blockId);
  const [runKey, setRunKey] = useState(0);
  // New random tasks for every run ("Nochmals" increments runKey).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const exercises = useMemo(() => (found ? buildBlock(found.block, found.chapter.id) : []), [blockId, runKey]);
  const [result, setResult] = useState<{ summary: SessionSummary; block: BlockResult } | null>(null);

  if (!found) return <NotFound />;
  const { subject, topic, chapter, block } = found;

  if (result) {
    const bi = chapter.blocks.indexOf(block);
    const nextBlock = chapter.blocks[bi + 1];
    return (
      <ResultView
        summary={result.summary}
        result={result.block}
        chapterTitle={chapter.title}
        subjectName={subject.name}
        onNext={() => go(nextBlock ? href.lesson(nextBlock.id) : href.topic(topic.id))}
        nextLabel={nextBlock ? `Weiter: ${nextBlock.title}` : 'Zum Lernpfad'}
        onAgain={() => {
          setResult(null);
          setRunKey((k) => k + 1);
        }}
        onBack={() => go(href.chapter(chapter.id))}
      />
    );
  }

  return (
    <div className="page lesson-page">
      <div className="lesson-title">
        <span>{chapter.icon}</span> {chapter.title} · {block.title}
      </div>
      <Session
        key={`${blockId}-${runKey}-${exercises[0]?.id}`}
        exercises={exercises}
        answerMode="first"
        onExit={() => go(href.chapter(chapter.id))}
        onFinish={(summary) => {
          let br: BlockResult | null = null;
          store.update((s) => {
            br = completeBlock(s, { blockId, chapter, subject, accuracy: summary.accuracy });
            return br.state;
          });
          const r = br as BlockResult | null;
          if (r) {
            play(r.medal || r.trophy ? 'medal' : 'finish', store.get().settings.sound);
            setResult({ summary, block: r });
          }
        }}
      />
    </div>
  );
}

interface ResultProps {
  summary: SessionSummary;
  result: BlockResult;
  chapterTitle: string;
  subjectName: string;
  nextLabel: string;
  onNext: () => void;
  onAgain: () => void;
  onBack: () => void;
}

function ResultView({ summary, result, chapterTitle, subjectName, nextLabel, onNext, onAgain, onBack }: ResultProps) {
  const s = useProgress();
  const pct = Math.round(summary.accuracy * 100);
  const msg = pct >= 90 ? 'Hervorragend!' : pct >= 70 ? 'Gut gemacht!' : 'Geschafft – Übung macht die Meisterin!';
  return (
    <div className="page result">
      <Confetti pieces={result.medal || result.trophy ? 140 : 70} />
      <div className="result-card card">
        <div className="big-emoji">{pct >= 90 ? '🤩' : pct >= 70 ? '😊' : '💪'}</div>
        <h1>{msg}</h1>
        <div className="result-stars">
          <Stars count={result.stars} size={44} />
        </div>
        <div className="result-stats">
          <div>
            <b>{pct} %</b>
            <small>auf Anhieb richtig</small>
          </div>
          <div>
            <b>+{summary.xp + result.xp}</b>
            <small>XP</small>
          </div>
          <div>
            <b>{summary.repeatRounds}</b>
            <small>Wiederholungs&shy;runden</small>
          </div>
        </div>

        {result.medal && (
          <div className="medal-reveal">
            <MedalIcon medal={result.medal.medal} size={96} />
            <h2>
              {result.medal.upgraded ? 'Medaille verbessert: ' : 'Neue Medaille: '}
              {MEDAL_LABEL[result.medal.medal]}!
            </h2>
            <p className="muted">Kapitel «{chapterTitle}» abgeschlossen.</p>
          </div>
        )}
        {result.trophy && (
          <div className="medal-reveal">
            <TrophyIcon earned size={110} />
            <h2>Pokal {subjectName}!</h2>
          </div>
        )}
        {!result.medal && result.stars < 3 && <p className="small muted">Tipp: Mit 90 % auf Anhieb gibt es 3 Sterne.</p>}

        <div className="result-actions">
          <button className="btn primary big" onClick={onNext}>
            {nextLabel}
          </button>
          <div className="row">
            <button className="btn ghost" onClick={onAgain}>
              🔁 Nochmals
            </button>
            <button className="btn ghost" onClick={onBack}>
              Kapitelübersicht
            </button>
          </div>
        </div>
        <p className="small muted">Gesamt: {s.xp} XP</p>
      </div>
    </div>
  );
}
