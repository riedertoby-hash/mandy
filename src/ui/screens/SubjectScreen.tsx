import { chapterProgress, subjectProgress } from '../../core/progress';
import { subjectById } from '../../content/subjects';
import { ProgressRing, TrophyIcon } from '../components/Badges';
import { TopBar } from '../components/TopBar';
import { href } from '../router';
import { useProgress } from '../store';

const CYCLES: Record<number, string> = {
  1: 'Zyklus 1 · Kindergarten – 2. Klasse',
  2: 'Zyklus 2 · 3. – 6. Klasse',
  3: 'Zyklus 3 · Sekundarstufe',
};

export function SubjectScreen({ id }: { id: string }) {
  const s = useProgress();
  const subject = subjectById(id);
  if (!subject) return <NotFound />;
  const p = subjectProgress(s, subject);
  const earned = !!s.trophies[subject.id];

  return (
    <div className="page">
      <TopBar back={href.home()} title={subject.name} />
      <section className="trophy-head card">
        <TrophyIcon earned={earned} size={84} />
        <div>
          <h2>{earned ? `Pokal ${subject.name} gewonnen!` : `Pokal ${subject.name}`}</h2>
          <p className="muted small">Sammle in allen Themen die Medaillen, um den Pokal zu gewinnen.</p>
          <div className="mini-bar wide">
            <div style={{ width: `${Math.max(p.ratio * 100, 1.5)}%` }} />
          </div>
          <small>
            {p.medals} von {p.totalChapters} Medaillen · {p.topicsDone} von {p.topics} Themen abgeschlossen
          </small>
        </div>
      </section>

      {[3, 2, 1].map((cycle) => {
        const topics = subject.topics.filter((t) => t.cycle === cycle);
        if (!topics.length) return null;
        return (
          <section key={cycle}>
            <h2 className="section-title">{CYCLES[cycle]}</h2>
            <div className="topic-list">
              {topics.map((t) => {
                if (!t.chapters.length)
                  return (
                    <div key={t.id} className="topic-card soon">
                      <span className="topic-icon">{t.icon}</span>
                      <div>
                        <b>{t.title}</b>
                        <small className="muted">
                          {t.grade} · in Vorbereitung
                        </small>
                        <p className="small muted">{t.description}</p>
                      </div>
                    </div>
                  );
                const done = t.chapters.reduce((n, c) => n + chapterProgress(s, c).done, 0);
                const total = t.chapters.reduce((n, c) => n + c.blocks.length, 0);
                const medals = t.chapters.filter((c) => s.medals[c.id]).length;
                return (
                  <a key={t.id} className="topic-card active" href={href.topic(t.id)}>
                    <ProgressRing value={done / total} size={60} stroke={6}>
                      <span className="topic-icon in-ring">{t.icon}</span>
                    </ProgressRing>
                    <div>
                      <b>{t.title}</b>
                      <small className="muted">
                        {t.grade} · {medals}/{t.chapters.length} Medaillen
                      </small>
                      <p className="small muted">{t.description}</p>
                    </div>
                    <span className="chev">›</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function NotFound() {
  return (
    <div className="page">
      <TopBar back={href.home()} />
      <div className="card center">
        <p>Diese Seite gibt es nicht.</p>
        <a className="btn primary" href={href.home()}>
          Zur Startseite
        </a>
      </div>
    </div>
  );
}
