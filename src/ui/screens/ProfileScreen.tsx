import { useRef } from 'react';
import { addDays, dayKey, levelInfo, MEDAL_LABEL, subjectProgress } from '../../core/progress';
import { SUBJECTS } from '../../content/subjects';
import { MedalIcon, TrophyIcon } from '../components/Badges';
import { TopBar } from '../components/TopBar';
import { href } from '../router';
import { liveStreak, store, useProgress } from '../store';

const AVATARS = ['🦊', '🐼', '🦄', '🐱', '🐬', '🦉', '🐯', '🐸', '🌸', '🚀', '⚡', '🎧'];
const COLORS = ['#6c4cf1', '#e64980', '#1c7ed6', '#0ca678', '#f59f00', '#e8590c'];
const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export function ProfileScreen() {
  const s = useProgress();
  const lvl = levelInfo(s.xp);
  const fileRef = useRef<HTMLInputElement>(null);
  const today = dayKey();
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i - 13));
  const maxXp = Math.max(s.settings.dailyGoal, ...days.map((d) => s.activity[d]?.xp ?? 0));
  const accuracy = s.totals.answered ? Math.round((s.totals.correct / s.totals.answered) * 100) : 0;
  const minutes = Math.round(Object.values(s.activity).reduce((n, a) => n + a.seconds, 0) / 60);
  const activeDays = Object.keys(s.activity).length;

  const setProfile = (patch: Partial<typeof s.profile>) => store.update((st) => ({ ...st, profile: { ...st.profile, ...patch } }));
  const setSettings = (patch: Partial<typeof s.settings>) => store.update((st) => ({ ...st, settings: { ...st.settings, ...patch } }));

  const exportData = () => {
    const blob = new Blob([store.exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `lernwelt-${s.profile.name.toLowerCase()}-${today}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importData = async (file: File) => {
    try {
      store.importJson(await file.text());
      alert('Fortschritt wurde geladen.');
    } catch {
      alert('Die Datei konnte nicht gelesen werden.');
    }
  };

  return (
    <div className="page">
      <TopBar back={href.home()} title="Profil" />

      <section className="card profile-head">
        <div className="avatar-big" style={{ background: s.profile.color }}>
          {s.profile.avatar}
        </div>
        <div className="grow">
          <h1>{s.profile.name}</h1>
          <p className="muted">
            Level {lvl.level} · {lvl.title}
          </p>
          <div className="xpbar">
            <div style={{ width: `${lvl.progress * 100}%` }} />
          </div>
          <small className="muted">
            {s.xp} XP · noch {lvl.needed - lvl.inLevel} bis Level {lvl.level + 1}
          </small>
        </div>
      </section>

      <div className="stat-grid">
        <Stat icon="🔥" value={liveStreak(s)} label="Tage in Folge" sub={`Rekord: ${s.streak.best}`} />
        <Stat icon="✅" value={s.totals.correct} label="richtige Antworten" sub={`von ${s.totals.answered}`} />
        <Stat icon="🎯" value={`${accuracy} %`} label="Trefferquote" />
        <Stat icon="⏱️" value={minutes} label="Minuten gelernt" sub={`an ${activeDays} Tagen`} />
        <Stat icon="🧱" value={s.totals.blocks} label="Blöcke gespielt" />
        <Stat icon="⭐" value={s.totals.mastered} label="Aufgabentypen gemeistert" />
      </div>

      <section className="card">
        <h3>Letzte 14 Tage</h3>
        <svg className="activity-chart" viewBox="0 0 280 120" role="img" aria-label="XP pro Tag in den letzten 14 Tagen">
          <line x1="0" x2="280" y1={100 - (s.settings.dailyGoal / maxXp) * 88} y2={100 - (s.settings.dailyGoal / maxXp) * 88} className="goal-line" />
          {days.map((d, i) => {
            const xp = s.activity[d]?.xp ?? 0;
            const h = (xp / maxXp) * 88;
            const [y, m, dd] = d.split('-').map(Number);
            const wd = WEEKDAYS[new Date(y, m - 1, dd).getDay()];
            return (
              <g key={d}>
                <rect x={i * 20 + 4} y={100 - h} width={12} height={Math.max(h, xp ? 2 : 0)} rx={3} className={xp >= s.settings.dailyGoal ? 'bar goal' : 'bar'}>
                  <title>
                    {dd}.{m}.: {xp} XP
                  </title>
                </rect>
                <text x={i * 20 + 10} y={114} textAnchor="middle" className={d === today ? 'today' : ''}>
                  {wd}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="small muted">Gestrichelte Linie = Tagesziel ({s.settings.dailyGoal} XP)</p>
      </section>

      <section className="card">
        <h3>Pokal-Regal</h3>
        <div className="trophy-shelf">
          {SUBJECTS.map((sub) => {
            const p = subjectProgress(s, sub);
            return (
              <div key={sub.id} className={`trophy-slot ${s.trophies[sub.id] ? 'earned' : ''}`}>
                <TrophyIcon earned={!!s.trophies[sub.id]} size={48} />
                <small>{sub.name}</small>
                {p.totalChapters > 0 && <small className="muted">{Math.round(p.ratio * 100)} %</small>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="card">
        <h3>Medaillen-Vitrine</h3>
        {SUBJECTS.flatMap((sub) => sub.topics.filter((t) => t.chapters.length)).map((t) => (
          <div key={t.id} className="vitrine">
            <b className="small">{t.title}</b>
            <div className="vitrine-row">
              {t.chapters.map((c) => {
                const m = s.medals[c.id]?.medal;
                const st = s.chapterStats[c.id];
                return (
                  <a key={c.id} className="vitrine-item" href={href.chapter(c.id)} title={c.title}>
                    <MedalIcon medal={m} size={36} />
                    <small>{c.title}</small>
                    <small className="muted">{m ? MEDAL_LABEL[m] : st ? `${Math.round((st.correct / st.answered) * 100)} %` : '–'}</small>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>Stärken & Baustellen</h3>
        {Object.keys(s.chapterStats).length === 0 && <p className="small muted">Sobald du übst, siehst du hier, wo du stark bist.</p>}
        <ul className="skill-bars">
          {SUBJECTS.flatMap((sub) => sub.topics.flatMap((t) => t.chapters))
            .filter((c) => s.chapterStats[c.id])
            .map((c) => {
              const st = s.chapterStats[c.id];
              const a = st.correct / st.answered;
              return (
                <li key={c.id}>
                  <span>
                    {c.icon} {c.title}
                  </span>
                  <div className="skill-bar">
                    <div className={a >= 0.85 ? 'good' : a >= 0.65 ? 'ok' : 'weak'} style={{ width: `${a * 100}%` }} />
                  </div>
                  <small>{Math.round(a * 100)} %</small>
                </li>
              );
            })}
        </ul>
      </section>

      <section className="card">
        <h3>Avatar</h3>
        <div className="avatar-picker">
          {AVATARS.map((a) => (
            <button key={a} className={`avatar-opt ${s.profile.avatar === a ? 'on' : ''}`} onClick={() => setProfile({ avatar: a })} aria-label={`Avatar ${a}`}>
              {a}
            </button>
          ))}
        </div>
        <div className="color-picker">
          {COLORS.map((c) => (
            <button key={c} className={`color-opt ${s.profile.color === c ? 'on' : ''}`} style={{ background: c }} onClick={() => setProfile({ color: c })} aria-label={`Farbe ${c}`} />
          ))}
        </div>
      </section>

      <section className="card settings">
        <h3>Einstellungen</h3>
        <label className="setting">
          <span>Töne</span>
          <input type="checkbox" checked={s.settings.sound} onChange={(e) => setSettings({ sound: e.target.checked })} />
        </label>
        <label className="setting">
          <span>Tagesziel</span>
          <select value={s.settings.dailyGoal} onChange={(e) => setSettings({ dailyGoal: Number(e.target.value) })}>
            <option value={30}>locker · 30 XP</option>
            <option value={60}>normal · 60 XP</option>
            <option value={100}>ehrgeizig · 100 XP</option>
            <option value={150}>Profi · 150 XP</option>
          </select>
        </label>
        <div className="setting-actions">
          <button className="btn ghost" onClick={exportData}>
            ⬇️ Fortschritt sichern
          </button>
          <button className="btn ghost" onClick={() => fileRef.current?.click()}>
            ⬆️ Sicherung laden
          </button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
          <button
            className="btn ghost danger-text"
            onClick={() => {
              if (window.confirm('Wirklich ALLES zurücksetzen? Medaillen, XP und Fortschritt gehen verloren.')) store.reset();
            }}
          >
            Zurücksetzen
          </button>
        </div>
        <p className="small muted">Der Fortschritt wird nur auf diesem Gerät gespeichert. Mit «Fortschritt sichern» kannst du ihn auf ein anderes Gerät mitnehmen.</p>
      </section>
    </div>
  );
}

function Stat({ icon, value, label, sub }: { icon: string; value: string | number; label: string; sub?: string }) {
  return (
    <div className="stat">
      <span className="stat-icon">{icon}</span>
      <b>{value}</b>
      <small>{label}</small>
      {sub && <small className="muted">{sub}</small>}
    </div>
  );
}
