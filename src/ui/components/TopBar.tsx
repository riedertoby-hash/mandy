import { levelInfo } from '../../core/progress';
import { href } from '../router';
import { liveStreak, useProgress } from '../store';

export function TopBar({ back, title }: { back?: string; title?: string }) {
  const s = useProgress();
  const lvl = levelInfo(s.xp);
  const streak = liveStreak(s);
  return (
    <header className="topbar">
      {back ? (
        <a className="icon-btn" href={back} aria-label="Zurück">
          ←
        </a>
      ) : (
        <a className="brand" href={href.home()}>
          <span className="brand-logo">%</span>
          <span>Lernwelt</span>
        </a>
      )}
      {title && <h1 className="topbar-title">{title}</h1>}
      <div className="chips">
        <span className={`chip streak ${streak ? 'on' : ''}`} title="Tage in Folge">
          🔥 {streak}
        </span>
        <span className="chip xp" title={`Level ${lvl.level}`}>
          ⭐ {s.xp}
        </span>
        <a className="avatar-mini" href={href.profile()} style={{ background: s.profile.color }} aria-label="Profil">
          {s.profile.avatar}
        </a>
      </div>
    </header>
  );
}
