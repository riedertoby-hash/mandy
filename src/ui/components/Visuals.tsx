import { useRef } from 'react';
import type { Visual } from '../../core/types';

const colsFor = (total: number) => (total === 25 ? 5 : total < 10 ? total : 10);

interface GridProps {
  total: number;
  filled: number;
  onChange?: (filled: number) => void;
  disabled?: boolean;
  status?: 'correct' | 'wrong';
}

/**
 * Kästchen-Feld. Interactive mode: tap a cell to fill everything up to it,
 * tap the last filled cell again to remove it, or drag across cells.
 */
export function Grid({ total, filled, onChange, disabled, status }: GridProps) {
  const dragging = useRef(false);
  const interactive = !!onChange && !disabled;
  const set = (i: number, toggle: boolean) => {
    if (!onChange) return;
    if (toggle && i + 1 === filled) onChange(i);
    else onChange(i + 1);
  };
  return (
    <div
      className={`grid-field ${interactive ? 'interactive' : ''} ${status ?? ''}`}
      style={{ gridTemplateColumns: `repeat(${colsFor(total)}, 1fr)`, maxWidth: total === 25 ? 220 : total <= 20 ? 360 : 320 }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      role={interactive ? 'group' : 'img'}
      aria-label={`${filled} von ${total} Kästchen gefärbt`}
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          type="button"
          key={i}
          tabIndex={interactive ? 0 : -1}
          disabled={!interactive}
          className={`cell ${i < filled ? 'on' : ''}`}
          onPointerDown={(e) => {
            if (!interactive) return;
            e.preventDefault();
            dragging.current = true;
            set(i, true);
          }}
          onPointerEnter={() => interactive && dragging.current && set(i, false)}
          onKeyDown={(e) => {
            if (interactive && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              set(i, true);
            }
          }}
          aria-label={`Kästchen ${i + 1}`}
        />
      ))}
    </div>
  );
}

export function PercentBar({ percent, left, right, marks }: { percent: number; left?: string; right?: string; marks?: number[] }) {
  const w = Math.min(percent, 100);
  return (
    <div className="pbar">
      <div className="pbar-track">
        <div className="pbar-fill" style={{ width: `${w}%` }}>
          <span>{percent} %</span>
        </div>
        {marks?.map((m) => <i key={m} className="pbar-mark" style={{ left: `${m}%` }} />)}
      </div>
      <div className="pbar-labels">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

export function ValueTable({ rows }: { rows: string[][] }) {
  return (
    <div className="vtable-wrap">
      <table className="vtable">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {c}
                  </th>
                ) : (
                  <td key={j} className={c === '?' ? 'unknown' : ''}>
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RightTriangle({ a, b, c, highlight }: { a: string; b: string; c: string; highlight?: 'a' | 'b' | 'c' }) {
  const cls = (k: 'a' | 'b' | 'c') => `tri-side ${highlight === k ? 'hl' : ''}`;
  return (
    <svg className="triangle" viewBox="0 0 290 170" role="img" aria-label={`Rechtwinkliges Dreieck mit Seiten ${a}, ${b} und ${c}`}>
      <polygon points="95,20 95,140 270,140" className="tri-fill" />
      <line x1="95" y1="20" x2="95" y2="140" className={cls('a')} />
      <line x1="95" y1="140" x2="270" y2="140" className={cls('b')} />
      <line x1="95" y1="20" x2="270" y2="140" className={cls('c')} />
      <path d="M95 122 h18 v18" className="tri-angle" />
      <text x="86" y="84" textAnchor="end" className={`tri-label ${highlight === 'a' ? 'hl' : ''}`}>{a}</text>
      <text x="182" y="162" textAnchor="middle" className={`tri-label ${highlight === 'b' ? 'hl' : ''}`}>{b}</text>
      <text x="190" y="70" textAnchor="start" className={`tri-label ${highlight === 'c' ? 'hl' : ''}`}>{c}</text>
    </svg>
  );
}

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

/** Climate diagram: precipitation bars (right axis, mm) and temperature line (left axis, °C). */
export function ClimateChart({ place, temp, precip }: { place: string; temp: number[]; precip: number[] }) {
  const W = 320;
  const H = 210;
  const left = 34;
  const right = 40;
  const top = 26;
  const bottom = 30;
  const plotW = W - left - right;
  const plotH = H - top - bottom;
  const tMin = Math.min(-10, Math.floor(Math.min(...temp) / 10) * 10);
  const tMax = Math.max(30, Math.ceil(Math.max(...temp) / 10) * 10);
  const pMax = Math.max(100, Math.ceil(Math.max(...precip) / 100) * 100);
  const ty = (t: number) => top + plotH - ((t - tMin) / (tMax - tMin)) * plotH;
  const py = (p: number) => top + plotH - (p / pMax) * plotH;
  const step = plotW / 12;
  const x = (i: number) => left + step * i + step / 2;
  const tTicks: number[] = [];
  for (let t = tMin; t <= tMax; t += 5) tTicks.push(t);
  const pTicks = [0, pMax / 2, pMax];
  return (
    <svg className="climate" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Klimadiagramm ${place}`}>
      <text x={W / 2} y={14} textAnchor="middle" className="c-title">
        {place}
      </text>
      {tTicks.map((t) => (
        <g key={t}>
          <line x1={left} x2={W - right} y1={ty(t)} y2={ty(t)} className={t === 0 ? 'c-zero' : t % 10 === 0 ? 'c-grid' : 'c-grid minor'} />
          {t % 10 === 0 && (
            <text x={left - 6} y={ty(t) + 4} textAnchor="end" className="c-axis temp">
              {t}°
            </text>
          )}
        </g>
      ))}
      {pTicks.map((p) => (
        <text key={p} x={W - right + 6} y={py(p) + 4} className="c-axis prec">
          {p}
        </text>
      ))}
      <text x={left - 6} y={top - 8} textAnchor="end" className="c-axis temp">
        °C
      </text>
      <text x={W - right + 6} y={top - 8} className="c-axis prec">
        mm
      </text>
      {precip.map((p, i) => (
        <rect key={i} x={x(i) - step * 0.32} y={py(p)} width={step * 0.64} height={Math.max(0, top + plotH - py(p))} rx={2} className="c-bar">
          <title>
            {MONTHS[i]}: {p} mm
          </title>
        </rect>
      ))}
      <polyline points={temp.map((t, i) => `${x(i)},${ty(t)}`).join(' ')} className="c-line" />
      {temp.map((t, i) => (
        <circle key={i} cx={x(i)} cy={ty(t)} r={3} className="c-dot">
          <title>
            {MONTHS[i]}: {t} °C
          </title>
        </circle>
      ))}
      {MONTHS.map((m, i) => (
        <text key={i} x={x(i)} y={H - bottom + 16} textAnchor="middle" className="c-axis">
          {m}
        </text>
      ))}
    </svg>
  );
}

export function VisualView({ visual }: { visual: Visual }) {
  switch (visual.kind) {
    case 'grid':
      return <Grid total={visual.total} filled={visual.filled} />;
    case 'bar':
      return <PercentBar percent={visual.percent} left={visual.left} right={visual.right} marks={visual.marks} />;
    case 'table':
      return <ValueTable rows={visual.rows} />;
    case 'triangle':
      return <RightTriangle a={visual.a} b={visual.b} c={visual.c} highlight={visual.highlight} />;
    case 'climate':
      return <ClimateChart place={visual.place} temp={visual.temp} precip={visual.precip} />;
  }
}
