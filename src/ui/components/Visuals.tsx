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

export function VisualView({ visual }: { visual: Visual }) {
  if (visual.kind === 'grid') return <Grid total={visual.total} filled={visual.filled} />;
  return <PercentBar percent={visual.percent} left={visual.left} right={visual.right} marks={visual.marks} />;
}
