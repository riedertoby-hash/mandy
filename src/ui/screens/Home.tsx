import { dayKey, dueReviews, levelInfo, subjectProgress } from '../../core/progress';
import { SUBJECTS } from '../../content/subjects';
import { ProgressRing } from '../components/Badges';
import { TopBar } from '../components/TopBar';
import { nextStep } from '../next';
import { href } from '../router';
import { liveStreak, useProgress } from '../store';

const greeting = () => {
  const h = new Date().getHours();
  return h < 11 ? 'Guten Morgen' : h < 17 ? 'Hallo' : 'Guten Abend';
};

export function Home() {
  const s = useProgress();
  const lvl = levelInfo(s.xp);
  const today = s.activity[dayKey()];
  const goal = s.settings.dailyGoal;
  const todayXp = today?.xp ?? 0;
  const due = dueReviews(s).length;
  const next = nextStep(s);
  const streak = liveStreak(s);
  const medals = Object.keys(s.medals).length;

  return (
    <div className="page">
      <TopBar />
      <section className="hero">
        <div className="hero-text">
          <p className="muted">{greeting()},</p>
          <h1>{s.profile.name} {s.profile.avatar}</h1>
          <div className="level-line">
            <span className="level-badge">Level {lvl.level}</span>
            <span className="muted">{lvl.title}</span>
          </div>
          <div className="xpbar" aria-label={`${lvl.inLevel} von ${lvl.needed} XP bis Level ${lvl.level + 1}`}>
            <div style={{ width: `${lvl.progress * 100}%` }} />
          </div>
          <p className="small muted">
            Noch {lvl.needed - lvl.inLevel} XP bis Level {lvl.level + 1}
          </p>
        </div>
        <ProgressRing value={todayXp / goal} size={104} stroke={10} color={todayXp >= goal ? 'var(--success)' : 'var(--accent)'}>
          <div className="goal-ring">
            <b>{todayXp}</b>
            <small>/{goal} XP</small>
            <small>{todayXp >= goal ? 'Tagesziel ✓' : 'heute'}</small>
          </div>
        </ProgressRing>
      </section>

      <section className="quick-stats">
        <div className="qs">
          <span>🔥</span>
          <b>{streak}</b>
          <small>{streak === 1 ? 'Tag' : 'Tage'} in Folge</small>
        </div>
        <div className="qs">
          <span>🏅</span>
          <b>{medals}</b>
          <small>Medaillen</small>
        </div>
        <div className="qs">
          <span>🏆</span>
          <b>{Object.keys(s.trophies).length}</b>
          <small>Pokale</small>
        </div>
      </section>

      {next ? (
        <a className="card continue" href={href.lesson(next.block.id)}>
          <div className="continue-icon">{next.chapter.icon}</div>
          <div className="continue-text">
            <small>{Object.keys(s.blocks).length ? 'Weiterlernen' : 'Los geht’s!'}</small>
            <b>{next.chapter.title}</b>
            <span className="muted small">
              {next.topic.title} · {next.block.title}
            </span>
          </div>
          <span className="btn primary">Start</span>
        </a>
      ) : (
        <div className="card continue done">
          <div className="continue-icon">🎉</div>
          <div className="continue-text">
            <b>Alles erledigt!</b>
            <span className="muted small">Verbessere deine Medaillen oder festige mit Wiederholen.</span>
          </div>
        </div>
      )}

      <a className={`card review-card ${due ? 'has-due' : ''}`} href={href.review()}>
        <div className="continue-icon">🧠</div>
        <div className="continue-text">
          <b>Wiederholen & Festigen</b>
          <span className="muted small">
            {due ? `${due} ${due === 1 ? 'Aufgabentyp wartet' : 'Aufgabentypen warten'} auf dich` : 'Gerade nichts fällig – freies Training möglich'}
          </span>
        </div>
        {due > 0 && <span className="pill danger">{due}</span>}
      </a>

      <h2 className="section-title">Fächer</h2>
      <div className="subject-grid">
        {SUBJECTS.map((sub) => {
          const p = subjectProgress(s, sub);
          const active = sub.topics.some((t) => t.chapters.length);
          return active ? (
            <a key={sub.id} className="subject-tile" href={href.subject(sub.id)} style={{ ['--c' as string]: sub.color }}>
              <span className="subject-icon">{sub.icon}</span>
              <b>{sub.name}</b>
              <div className="mini-bar">
                <div style={{ width: `${Math.max(p.ratio * 100, 2)}%` }} />
              </div>
              <small className="muted">
                {p.medals} / {p.totalChapters} Medaillen
              </small>
            </a>
          ) : (
            <div key={sub.id} className="subject-tile soon" style={{ ['--c' as string]: sub.color }}>
              <span className="subject-icon">{sub.icon}</span>
              <b>{sub.name}</b>
              <small className="muted">bald verfügbar</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
