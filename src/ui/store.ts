import { useSyncExternalStore } from 'react';
import { STORAGE_KEY, daysBetween, dayKey, initialState, migrate, type ProgressState } from '../core/progress';

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? migrate(JSON.parse(raw)) : initialState();
  } catch {
    return initialState();
  }
}

let state: ProgressState = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked – app keeps working in memory */
  }
}

export const store = {
  get: () => state,
  set(next: ProgressState) {
    state = next;
    persist();
    listeners.forEach((l) => l());
  },
  update(fn: (s: ProgressState) => ProgressState) {
    store.set(fn(state));
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  exportJson: () => JSON.stringify(state, null, 2),
  importJson(json: string) {
    store.set(migrate(JSON.parse(json)));
  },
  reset() {
    store.set(initialState());
  },
};

// Keep several open tabs in sync.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      state = load();
      listeners.forEach((l) => l());
    }
  });
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

/** Streak that is still "alive" (played today or yesterday). */
export function liveStreak(s: ProgressState): number {
  if (!s.streak.lastDay) return 0;
  return daysBetween(s.streak.lastDay, dayKey()) <= 1 ? s.streak.current : 0;
}
