import { chapterProgress, isChapterComplete, isChapterUnlocked, MEDAL_LABEL } from '../../core/progress';
import { findTopic } from '../../content/subjects';
import { MedalIcon, ProgressRing } from '../components/Badges';
import { TopBar } from '../components/TopBar';
import { href } from '../router';
import { useProgress } from '../store';
import { NotFound } from './SubjectScreen';

// Zig-zag offsets (in % of path width) for the learning path.
const OFFSETS = [50, 61, 67, 61, 50, 39, 33, 39];
const STEP = 125;

export function TopicScreen({ id }: { id: string }) {
  const s = useProgress();
  const found = findTopic(id);
  if (!found || !found.topic.chapters.length) return <NotFound />;
  const { subject, topic } = found;
  const chapters = topic.chapters;
  const currentIdx = chapters.findIndex((c, i) => isChapterUnlocked(s, chapters, i) && !isChapterComplete(s, c));
  const medals = chapters.filter((c) => s.medals[c.id]).length;
  const height = (chapters.length + 1) * STEP;
  const points = [...chapters.map((_, i) => OFFSETS[i % OFFSETS.length]), 50];

  return (
    <div className="page">
      <TopBar back={href.subject(subject.id)} title={topic.title} />
      <section className="topic-head card">
        <div className="topic-big-icon">{topic.icon}</div>
        <div>
          <h2>{topic.title}</h2>
          <p className="muted small">{topic.description}</p>
          <div className="medal-strip">
            {chapters.map((c) => (
              <MedalIcon key={c.id} medal={s.medals[c.id]?.medal} size={20} />
            ))}
          </div>
          <small>
            {medals} von {chapters.length} Medaillen
          </small>
        </div>
      </section>

      <div className="path" style={{ height }}>
        <svg className="path-line" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden>
          {points.slice(1).map((x, i) => {
            const x0 = points[i];
            const y0 = i * STEP + 50;
            const y1 = (i + 1) * STEP + 50;
            const done = i < chapters.length && isChapterComplete(s, chapters[i]);
            return (
              <path
                key={i}
                d={`M ${x0} ${y0} C ${x0} ${y0 + STEP / 2}, ${x} ${y1 - STEP / 2}, ${x} ${y1}`}
                className={done ? 'done' : ''}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {chapters.map((c, i) => {
          const unlocked = isChapterUnlocked(s, chapters, i);
          const prog = chapterProgress(s, c);
          const medal = s.medals[c.id]?.medal;
          const current = i === currentIdx;
          return (
            <a
              key={c.id}
              className={`path-node ${unlocked ? '' : 'locked'} ${current ? 'current' : ''} ${medal ? 'has-medal' : ''}`}
              style={{ left: `${points[i]}%`, top: i * STEP + 50 }}
              href={unlocked ? href.chapter(c.id) : undefined}
              aria-disabled={!unlocked}
              onClick={(e) => !unlocked && e.preventDefault()}
              title={unlocked ? c.title : 'Schliesse zuerst das vorherige Kapitel ab'}
            >
              <ProgressRing value={prog.ratio} size={84} stroke={7} color={medal ? 'var(--success)' : 'var(--primary)'}>
                <span className="node-btn">{unlocked ? c.icon : '🔒'}</span>
              </ProgressRing>
              {medal && (
                <span className="node-medal" title={`${MEDAL_LABEL[medal]}-Medaille`}>
                  <MedalIcon medal={medal} size={26} />
                </span>
              )}
              <span className="node-label">
                <b>{i + 1}. {c.title}</b>
                {current && <em> · {prog.done ? 'weiter' : 'start'}</em>}
              </span>
            </a>
          );
        })}
        <div className="path-goal" style={{ left: '50%', top: chapters.length * STEP + 50 }}>
          <span>{medals === chapters.length ? '🏁' : '🚩'}</span>
          <small>{medals === chapters.length ? 'Thema gemeistert!' : 'Ziel'}</small>
        </div>
      </div>
    </div>
  );
}
