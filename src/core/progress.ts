// Progress model: XP, levels, stars per block, medals per chapter, trophies per subject,
// daily streak and a Leitner-style review box for tasks that were answered wrong.
// All functions are pure (state in → new state out) so they are easy to test.

import type { Chapter, Difficulty, Exercise, Subject } from './types';

export type Medal = 'bronze' | 'silver' | 'gold';
export const MEDAL_RANK: Record<Medal, number> = { bronze: 1, silver: 2, gold: 3 };
export const MEDAL_LABEL: Record<Medal, string> = { bronze: 'Bronze', silver: 'Silber', gold: 'Gold' };

export interface BlockProgress {
  completed: boolean;
  stars: 0 | 1 | 2 | 3;
  bestAccuracy: number;
  attempts: number;
  lastPlayed?: string;
}

export interface ReviewItem {
  key: string;
  gen: string;
  chapterId: string;
  difficulty: Difficulty;
  /** Leitner box 1–5. After a correct answer in box 5 the item is mastered and removed. */
  box: number;
  due: string;
  lapses: number;
}

export interface DayActivity {
  xp: number;
  answered: number;
  correct: number;
  seconds: number;
}

export interface ProgressState {
  version: 1;
  profile: { name: string; avatar: string; color: string; since: string };
  xp: number;
  blocks: Record<string, BlockProgress>;
  medals: Record<string, { medal: Medal; at: string }>;
  trophies: Record<string, { at: string }>;
  review: Record<string, ReviewItem>;
  activity: Record<string, DayActivity>;
  streak: { current: number; best: number; lastDay: string | null };
  totals: { answered: number; correct: number; blocks: number; mastered: number };
  chapterStats: Record<string, { answered: number; correct: number }>;
  settings: { sound: boolean; dailyGoal: number };
}

export const XP = {
  correct: 10,
  correctWithHint: 5,
  correctRepeat: 5,
  review: 8,
  blockBase: 20,
  perStar: 10,
  medal: { bronze: 30, silver: 60, gold: 100 } as Record<Medal, number>,
  trophy: 500,
};

/** Review intervals in days for Leitner boxes 1–5. */
export const REVIEW_INTERVALS = [1, 2, 4, 8, 16];

// ---------------------------------------------------------------------------
// Dates (local time, YYYY-MM-DD)
// ---------------------------------------------------------------------------

export function dayKey(d: Date = new Date()): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + n));
}

export function daysBetween(a: string, b: string): number {
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

// ---------------------------------------------------------------------------
// Initial state & levels
// ---------------------------------------------------------------------------

export function initialState(today = dayKey()): ProgressState {
  return {
    version: 1,
    profile: { name: 'Mandy', avatar: '🦊', color: '#6c4cf1', since: today },
    xp: 0,
    blocks: {},
    medals: {},
    trophies: {},
    review: {},
    activity: {},
    streak: { current: 0, best: 0, lastDay: null },
    totals: { answered: 0, correct: 0, blocks: 0, mastered: 0 },
    chapterStats: {},
    settings: { sound: true, dailyGoal: 60 },
  };
}

const LEVEL_TITLES = [
  'Neugierige', 'Entdeckerin', 'Rechenfüchsin', 'Tüftlerin', 'Denkerin', 'Knobelprofi',
  'Zahlenmagierin', 'Expertin', 'Meisterin', 'Grossmeisterin', 'Legende',
];

/** Level n starts at 50 · n · (n − 1) XP → 0, 100, 300, 600, 1000, … */
export const xpForLevel = (level: number) => 50 * level * (level - 1);

export function levelInfo(xp: number) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  const start = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return {
    level,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
    inLevel: xp - start,
    needed: next - start,
    progress: (xp - start) / (next - start),
  };
}

// ---------------------------------------------------------------------------
// Activity, streak, answers
// ---------------------------------------------------------------------------

function touchDay(s: ProgressState, today: string): ProgressState {
  if (s.streak.lastDay === today) return s;
  const gap = s.streak.lastDay ? daysBetween(s.streak.lastDay, today) : Infinity;
  const current = gap === 1 ? s.streak.current + 1 : 1;
  return { ...s, streak: { current, best: Math.max(s.streak.best, current), lastDay: today } };
}

function addActivity(s: ProgressState, today: string, patch: Partial<DayActivity>): ProgressState {
  const cur = s.activity[today] ?? { xp: 0, answered: 0, correct: 0, seconds: 0 };
  return {
    ...s,
    activity: {
      ...s.activity,
      [today]: {
        xp: cur.xp + (patch.xp ?? 0),
        answered: cur.answered + (patch.answered ?? 0),
        correct: cur.correct + (patch.correct ?? 0),
        seconds: cur.seconds + (patch.seconds ?? 0),
      },
    },
  };
}

export function addXp(s: ProgressState, xp: number, today = dayKey()): ProgressState {
  return addActivity({ ...s, xp: s.xp + xp }, today, { xp });
}

export const reviewKey = (ex: Pick<Exercise, 'gen' | 'chapterId' | 'difficulty'>) => `${ex.chapterId}|${ex.gen}|${ex.difficulty}`;

export type AnswerMode = 'first' | 'repeat' | 'review';

export interface AnswerOutcome {
  state: ProgressState;
  xp: number;
}

/** Records one answer. Wrong answers put the task type into the review box. */
export function recordAnswer(
  s: ProgressState,
  ex: Exercise,
  correct: boolean,
  opts: { mode: AnswerMode; usedHint?: boolean; seconds?: number; today?: string },
): AnswerOutcome {
  const today = opts.today ?? dayKey();
  let xp = 0;
  if (correct) {
    xp = opts.mode === 'first' ? (opts.usedHint ? XP.correctWithHint : XP.correct) : opts.mode === 'review' ? XP.review : XP.correctRepeat;
  }
  let next = touchDay(s, today);
  const cs = next.chapterStats[ex.chapterId] ?? { answered: 0, correct: 0 };
  next = {
    ...next,
    xp: next.xp + xp,
    totals: { ...next.totals, answered: next.totals.answered + 1, correct: next.totals.correct + (correct ? 1 : 0) },
    chapterStats: { ...next.chapterStats, [ex.chapterId]: { answered: cs.answered + 1, correct: cs.correct + (correct ? 1 : 0) } },
  };
  next = addActivity(next, today, { xp, answered: 1, correct: correct ? 1 : 0, seconds: opts.seconds ?? 0 });

  const key = reviewKey(ex);
  const item = next.review[key];
  if (opts.mode === 'review' && item) {
    if (correct) {
      if (item.box >= REVIEW_INTERVALS.length) {
        const { [key]: _done, ...rest } = next.review;
        next = { ...next, review: rest, totals: { ...next.totals, mastered: next.totals.mastered + 1 } };
      } else {
        const box = item.box + 1;
        next = { ...next, review: { ...next.review, [key]: { ...item, box, due: addDays(today, REVIEW_INTERVALS[box - 1]) } } };
      }
    } else {
      next = { ...next, review: { ...next.review, [key]: { ...item, box: 1, due: addDays(today, 1), lapses: item.lapses + 1 } } };
    }
  } else if (!correct && opts.mode === 'first') {
    next = {
      ...next,
      review: {
        ...next.review,
        [key]: {
          key,
          gen: ex.gen,
          chapterId: ex.chapterId,
          difficulty: ex.difficulty,
          box: 1,
          due: addDays(today, 1),
          lapses: (item?.lapses ?? 0) + 1,
        },
      },
    };
  }
  return { state: next, xp };
}

export function dueReviews(s: ProgressState, today = dayKey()): ReviewItem[] {
  return Object.values(s.review)
    .filter((r) => r.due <= today)
    .sort((a, b) => a.box - b.box || a.due.localeCompare(b.due));
}

export function nextReviewDay(s: ProgressState): string | null {
  const days = Object.values(s.review).map((r) => r.due).sort();
  return days[0] ?? null;
}

// ---------------------------------------------------------------------------
// Blocks, medals, trophies
// ---------------------------------------------------------------------------

export const starsFor = (accuracy: number): 1 | 2 | 3 => (accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1);
export const medalFor = (accuracy: number): Medal => (accuracy >= 0.9 ? 'gold' : accuracy >= 0.7 ? 'silver' : 'bronze');

export function chapterAccuracy(s: ProgressState, chapter: Chapter): number | null {
  const bp = chapter.blocks.map((b) => s.blocks[b.id]);
  if (bp.some((b) => !b?.completed)) return null;
  return bp.reduce((sum, b) => sum + (b?.bestAccuracy ?? 0), 0) / bp.length;
}

export function isChapterComplete(s: ProgressState, chapter: Chapter) {
  return chapter.blocks.every((b) => s.blocks[b.id]?.completed);
}

export function chapterProgress(s: ProgressState, chapter: Chapter) {
  const done = chapter.blocks.filter((b) => s.blocks[b.id]?.completed).length;
  return { done, total: chapter.blocks.length, ratio: done / chapter.blocks.length };
}

export function subjectProgress(s: ProgressState, subject: Subject) {
  const chapters = subject.topics.flatMap((t) => t.chapters);
  const plannedChapters = subject.topics.reduce((n, t) => n + (t.chapters.length ? 0 : (t.planned?.length ?? 1)), 0);
  const medals = chapters.filter((c) => s.medals[c.id]).length;
  const topicsDone = subject.topics.filter((t) => t.chapters.length > 0 && t.chapters.every((c) => s.medals[c.id])).length;
  return {
    medals,
    chapters: chapters.length,
    totalChapters: chapters.length + plannedChapters,
    topicsDone,
    topics: subject.topics.length,
    ratio: chapters.length + plannedChapters === 0 ? 0 : medals / (chapters.length + plannedChapters),
  };
}

/** A subject trophy is earned when every topic of the subject has content and all chapters have a medal. */
export function earnsTrophy(s: ProgressState, subject: Subject) {
  return subject.topics.length > 0 && subject.topics.every((t) => t.chapters.length > 0 && t.chapters.every((c) => s.medals[c.id]));
}

export interface BlockResult {
  state: ProgressState;
  stars: 1 | 2 | 3;
  improved: boolean;
  xp: number;
  medal?: { medal: Medal; upgraded: boolean; isNew: boolean };
  trophy?: boolean;
}

export function completeBlock(
  s: ProgressState,
  ctx: { blockId: string; chapter: Chapter; subject: Subject; accuracy: number; today?: string },
): BlockResult {
  const today = ctx.today ?? dayKey();
  const prev = s.blocks[ctx.blockId];
  const stars = starsFor(ctx.accuracy);
  const improved = !prev?.completed || stars > prev.stars;
  let xp = XP.blockBase + stars * XP.perStar;
  let next: ProgressState = {
    ...s,
    blocks: {
      ...s.blocks,
      [ctx.blockId]: {
        completed: true,
        stars: Math.max(stars, prev?.stars ?? 0) as 1 | 2 | 3,
        bestAccuracy: Math.max(ctx.accuracy, prev?.bestAccuracy ?? 0),
        attempts: (prev?.attempts ?? 0) + 1,
        lastPlayed: today,
      },
    },
    totals: { ...s.totals, blocks: s.totals.blocks + 1 },
  };

  let medal: BlockResult['medal'];
  const acc = chapterAccuracy(next, ctx.chapter);
  if (acc !== null) {
    const m = medalFor(acc);
    const old = next.medals[ctx.chapter.id]?.medal;
    if (!old || MEDAL_RANK[m] > MEDAL_RANK[old]) {
      xp += XP.medal[m] - (old ? XP.medal[old] : 0);
      next = { ...next, medals: { ...next.medals, [ctx.chapter.id]: { medal: m, at: today } } };
      medal = { medal: m, upgraded: !!old, isNew: !old };
    }
  }

  let trophy = false;
  if (!next.trophies[ctx.subject.id] && earnsTrophy(next, ctx.subject)) {
    trophy = true;
    xp += XP.trophy;
    next = { ...next, trophies: { ...next.trophies, [ctx.subject.id]: { at: today } } };
  }

  next = addXp(touchDay(next, today), xp, today);
  return { state: next, stars, improved, xp, medal, trophy };
}

// ---------------------------------------------------------------------------
// Unlocking
// ---------------------------------------------------------------------------

export function isChapterUnlocked(s: ProgressState, chapters: Chapter[], index: number) {
  return index === 0 || isChapterComplete(s, chapters[index - 1]);
}

export function isBlockUnlocked(s: ProgressState, chapter: Chapter, index: number) {
  return index === 0 || !!s.blocks[chapter.blocks[index - 1].id]?.completed;
}

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------

export const STORAGE_KEY = 'mandy-lernwelt-v1';

export function migrate(raw: unknown): ProgressState {
  const base = initialState();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<ProgressState>;
  return {
    ...base,
    ...r,
    version: 1,
    profile: { ...base.profile, ...r.profile },
    streak: { ...base.streak, ...r.streak },
    totals: { ...base.totals, ...r.totals },
    settings: { ...base.settings, ...r.settings },
  };
}
