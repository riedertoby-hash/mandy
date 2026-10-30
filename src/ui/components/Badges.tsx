import type { Medal } from '../../core/progress';

const MEDAL_COLORS: Record<Medal, [string, string, string]> = {
  gold: ['#ffe066', '#f5b301', '#a86b00'],
  silver: ['#f1f3f5', '#adb5bd', '#5c636a'],
  bronze: ['#ffc9a3', '#d9792b', '#7a3e0c'],
};

export function MedalIcon({ medal, size = 56, label }: { medal?: Medal | null; size?: number; label?: string }) {
  const empty = !medal;
  const [light, mid, dark] = medal ? MEDAL_COLORS[medal] : ['var(--slot)', 'var(--slot)', 'var(--slot-dark)'];
  const id = `m-${medal ?? 'none'}`;
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 64 80" role="img" aria-label={label ?? (medal ? `Medaille ${medal}` : 'Noch keine Medaille')}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={mid} />
        </linearGradient>
      </defs>
      <path d="M14 0 h14 l8 26 h-14z" fill={empty ? 'var(--slot)' : '#4c6ef5'} />
      <path d="M50 0 h-14 l-8 26 h14z" fill={empty ? 'var(--slot-dark)' : '#f03e3e'} />
      <circle cx="32" cy="50" r="26" fill={`url(#${id})`} stroke={dark} strokeWidth="3" opacity={empty ? 0.6 : 1} />
      <circle cx="32" cy="50" r="18" fill="none" stroke={dark} strokeOpacity="0.35" strokeWidth="2" />
      {empty ? (
        <text x="32" y="57" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--slot-dark)">?</text>
      ) : (
        <path d="M32 37 l4 8.5 9.2 1.2 -6.8 6.3 1.8 9.1 -8.2 -4.6 -8.2 4.6 1.8 -9.1 -6.8 -6.3 9.2 -1.2z" fill={dark} opacity="0.85" />
      )}
    </svg>
  );
}

export function TrophyIcon({ earned, size = 72, color = '#f5b301' }: { earned: boolean; size?: number; color?: string }) {
  const c = earned ? color : 'var(--slot)';
  const d = earned ? '#a86b00' : 'var(--slot-dark)';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={earned ? 'Pokal gewonnen' : 'Pokal noch nicht gewonnen'}>
      <path d="M18 8 h28 v14 a14 14 0 0 1 -28 0z" fill={c} stroke={d} strokeWidth="2.5" />
      <path d="M18 12 h-8 a8 8 0 0 0 10 14" fill="none" stroke={d} strokeWidth="3" />
      <path d="M46 12 h8 a8 8 0 0 1 -10 14" fill="none" stroke={d} strokeWidth="3" />
      <rect x="29" y="35" width="6" height="10" fill={c} stroke={d} strokeWidth="2" />
      <rect x="20" y="45" width="24" height="7" rx="2" fill={c} stroke={d} strokeWidth="2.5" />
      <rect x="16" y="52" width="32" height="6" rx="2" fill={d} />
      {earned && <path d="M27 16 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1z" fill="#fff" opacity="0.8" transform="translate(4 -2) scale(0.9)" />}
    </svg>
  );
}

export function Stars({ count, size = 18 }: { count: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${count} von 3 Sternen`}>
      {[1, 2, 3].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" className={i <= count ? 'on' : ''}>
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

export function ProgressRing({ value, size = 64, stroke = 7, color = 'var(--primary)', children }: { value: number; size?: number; stroke?: number; color?: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <div className="ring-content">{children}</div>
    </div>
  );
}

export function Confetti({ pieces = 80 }: { pieces?: number }) {
  const colors = ['#6c4cf1', '#ffc93c', '#ff6b8b', '#4cc3ff', '#2fb344'];
  return (
    <div className="confetti" aria-hidden>
      {Array.from({ length: pieces }, (_, i) => (
        <i
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.6}s`,
            animationDuration: `${1.8 + Math.random() * 1.6}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}
