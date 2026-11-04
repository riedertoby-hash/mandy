// Aufgaben-Generatoren Geschichte.
import { uid } from '../../core/random';
import type { Difficulty, Generator, OrderExercise, Rng } from '../../core/types';
import { choiceEx, numberEx } from '../helpers';
import { BEGRIFFE, EREIGNISSE, type Ereignis } from './data';

function pickLevel<T>(rng: Rng, items: T[], level: (t: T) => Difficulty, d: Difficulty): T {
  const exact = items.filter((t) => level(t) === d);
  const easier = items.filter((t) => level(t) <= d);
  return rng.pick(exact.length && rng.chance(0.65) ? exact : easier.length ? easier : items);
}

const pool = (ch: string, d: Difficulty) => {
  const all = EREIGNISSE[ch];
  // Easy blocks use well-known events (level 1–2); harder blocks may use all.
  const fit = all.filter((e) => e[3] <= Math.max(d, 2));
  return fit.length >= 4 ? fit : all;
};

/** Which year? – multiple choice with nearby years as distractors. */
const jahrWahl =
  (ch: string): Generator =>
  (rng, d, chapterId) => {
    const e = pickLevel(rng, EREIGNISSE[ch], (x) => x[3], d);
    const near = d === 1 ? [-50, -25, 25, 50] : d === 2 ? [-20, -10, 10, 20] : [-5, -3, -1, 1, 3, 5];
    const others = EREIGNISSE[ch].filter((x) => x[0] !== e[0]).map((x) => String(x[0]));
    const wrong = [...new Set([...rng.shuffle(others).slice(0, 2), ...rng.shuffle(near).map((n) => String(e[0] + n))])].slice(0, 3);
    return choiceEx(
      rng,
      { gen: `hi.${ch}.jahr`, chapterId, difficulty: d },
      { prompt: `In welchem Jahr? ${e[1]}`, solution: [`${e[0]}: ${e[1]}`, e[2]] },
      String(e[0]),
      wrong,
    );
  };

/** Type the year. */
const jahrTipp =
  (ch: string): Generator =>
  (rng, d, chapterId) => {
    const e = pickLevel(rng, EREIGNISSE[ch], (x) => x[3], d);
    return numberEx(
      { gen: `hi.${ch}.jahrTipp`, chapterId, difficulty: d },
      {
        prompt: `In welchem Jahr? ${e[1]}`,
        answer: e[0],
        hint: `Es war im ${Math.floor((e[0] - 1) / 100) + 1}. Jahrhundert.`,
        solution: [`${e[0]}: ${e[1]}`, e[2]],
      },
    );
  };

/** Put events in chronological order. */
const reihe =
  (ch: string): Generator =>
  (rng, d, chapterId) => {
    const n = d === 1 ? 3 : 4;
    const byYear = new Map<number, Ereignis>();
    for (const e of rng.shuffle(pool(ch, d))) if (!byYear.has(e[0])) byYear.set(e[0], e);
    const chosen = [...byYear.values()].slice(0, n).sort((a, b) => a[0] - b[0]);
    const seq = chosen.map((e) => e[1]);
    let tiles = rng.shuffle(seq);
    for (let i = 0; i < 10 && tiles.join('|') === seq.join('|'); i++) tiles = rng.shuffle(seq);
    const ex: OrderExercise = {
      gen: `hi.${ch}.reihe`,
      chapterId,
      difficulty: d,
      id: uid(`hi.${ch}.reihe`),
      type: 'order',
      tiles,
      answers: [seq.join(' ')],
      sequence: seq,
      prompt: 'Bringe die Ereignisse in die richtige Reihenfolge – das älteste zuerst.',
      hint: 'Überlege zuerst, welches Ereignis am frühesten war.',
      solution: chosen.map((e) => `${e[0]}: ${e[1]}`),
    };
    return ex;
  };

/** Timeline with one event hidden. */
const zeitstrahl =
  (ch: string): Generator =>
  (rng, d, chapterId) => {
    const byYear = new Map<number, Ereignis>();
    for (const e of rng.shuffle(pool(ch, d))) if (!byYear.has(e[0])) byYear.set(e[0], e);
    const chosen = [...byYear.values()].slice(0, 4).sort((a, b) => a[0] - b[0]);
    const ask = rng.int(0, chosen.length - 1);
    const target = chosen[ask];
    const others = EREIGNISSE[ch].filter((e) => !chosen.includes(e)).map((e) => e[1]);
    const wrongPool = others.length >= 3 ? others : EREIGNISSE[ch].filter((e) => e !== target).map((e) => e[1]);
    return choiceEx(
      rng,
      { gen: `hi.${ch}.zeitstrahl`, chapterId, difficulty: d },
      {
        prompt: 'Welches Ereignis fehlt auf dem Zeitstrahl?',
        visual: { kind: 'timeline', events: chosen.map((e, i) => ({ year: String(e[0]), label: i === ask ? '?' : e[1] })) },
        solution: [`${target[0]}: ${target[1]}`, target[2]],
      },
      target[1],
      rng.shuffle(wrongPool).slice(0, 3),
    );
  };

const begriff =
  (ch: string): Generator =>
  (rng, d, chapterId) => {
    const [q, right, wrong, why] = pickLevel(rng, BEGRIFFE[ch], (x) => x[4], d);
    return choiceEx(rng, { gen: `hi.${ch}.begriff`, chapterId, difficulty: d }, { prompt: q, solution: [why] }, right, wrong);
  };

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];

/** Which century? e.g. 1648 → 17. Jahrhundert; 44 v. Chr. → 1. Jh. v. Chr. */
const jahrhundert: Generator = (rng, d, chapterId) => {
  const bc = d === 3 && rng.chance(0.35);
  const year = bc ? rng.pick([44, 753, 216, 31, 490, 1200, 323]) : d === 1 ? rng.int(1, 20) * 100 + rng.int(1, 99) : rng.pick([rng.int(101, 2025), rng.int(1, 20) * 100]);
  const c = Math.floor((year - 1) / 100) + 1;
  return numberEx(
    { gen: 'hi.jahrhundert', chapterId, difficulty: d },
    {
      prompt: `In welchem Jahrhundert liegt das Jahr ${year}${bc ? ' v. Chr.' : ''}?`,
      unit: `. Jahrhundert${bc ? ' v. Chr.' : ''}`,
      answer: c,
      hint: 'Das 1. Jahrhundert umfasst die Jahre 1 bis 100, das 20. Jahrhundert die Jahre 1901 bis 2000.',
      solution: [
        `Faustregel: Jahr ohne die letzten zwei Ziffern + 1 – ausser das Jahr endet auf 00.`,
        `${year}${bc ? ' v. Chr.' : ''} → ${c}. Jahrhundert${bc ? ' v. Chr.' : ''} (${ROMAN[c] ?? c}. Jh.)`,
      ],
    },
  );
};

const CHAPTERS = ['ch1', 'ch2', 'ch3', 'nz1', 'nz2', 'wk1', 'wk2', 'kk1'];

export const geschichteGenerators: Record<string, Generator> = Object.assign(
  {
    'hi.me1.begriff': begriff('me1'),
    'hi.jahrhundert': jahrhundert,
  },
  ...CHAPTERS.map((ch) => ({
    [`hi.${ch}.jahr`]: jahrWahl(ch),
    [`hi.${ch}.jahrTipp`]: jahrTipp(ch),
    [`hi.${ch}.reihe`]: reihe(ch),
    [`hi.${ch}.zeitstrahl`]: zeitstrahl(ch),
    [`hi.${ch}.begriff`]: begriff(ch),
  })),
);
