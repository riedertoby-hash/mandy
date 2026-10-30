// Task generators for "Prozentrechnen" (Lehrplan 21, Zyklus 3).
// Every generator creates a fresh task with random numbers for a given difficulty,
// so repetitions are "similar tasks", not memorised answers.

import { chf, num, pct, round } from '../../core/format';
import { uid } from '../../core/random';
import type {
  ChoiceExercise,
  Difficulty,
  Exercise,
  Generator,
  GridExercise,
  NumberExercise,
  Rng,
} from '../../core/types';

type Base = { gen: string; chapterId: string; difficulty: Difficulty };
type NumberFields = Omit<NumberExercise, 'id' | 'type' | keyof Base>;
type ChoiceFields = Omit<ChoiceExercise, 'id' | 'type' | keyof Base | 'answerIndex' | 'options'>;

const numberEx = (b: Base, f: NumberFields): NumberExercise => ({ ...b, ...f, type: 'number', id: uid(b.gen) });
const gridEx = (b: Base, f: Omit<GridExercise, 'id' | 'type' | keyof Base>): GridExercise => ({
  ...b,
  ...f,
  type: 'grid',
  id: uid(b.gen),
});

/** Builds a multiple choice task; the first option is the correct one, order gets shuffled. */
function choiceEx(rng: Rng, b: Base, f: ChoiceFields, correct: string, wrong: string[], keepOrder = false): ChoiceExercise {
  const uniqueWrong = [...new Set(wrong.filter((w) => w !== correct))];
  const all = keepOrder ? [correct, ...uniqueWrong] : rng.shuffle([correct, ...uniqueWrong]);
  return { ...b, ...f, type: 'choice', id: uid(b.gen), options: all, answerIndex: all.indexOf(correct) };
}

/** Same as choiceEx, but options stay in the given order (correct one passed by index). */
function fixedChoiceEx(b: Base, f: ChoiceFields, options: string[], answerIndex: number): ChoiceExercise {
  return { ...b, ...f, type: 'choice', id: uid(b.gen), options, answerIndex };
}

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
/** Smallest step for G so that G · p / 100 is a whole number (p integer). */
const stepFor = (p: number) => 100 / gcd(p, 100);
const r4 = (n: number) => num(n, 4);

// ---------------------------------------------------------------------------
// Number triples (G = Grundwert, p = Prozentsatz, P = Prozentwert)
// ---------------------------------------------------------------------------

interface Triple {
  G: number;
  p: number;
  P: number;
}

function triple(rng: Rng, d: Difficulty, opts: { integer?: boolean; maxG?: number } = {}): Triple {
  const maxG = opts.maxG ?? (d === 1 ? 600 : 3000);
  if (d === 1) {
    const p = rng.pick([10, 20, 25, 50, 75, 5, 1]);
    const step = stepFor(p);
    const G = step * rng.int(Math.max(1, Math.ceil(20 / step)), Math.max(1, Math.floor(maxG / step)));
    return { G, p, P: (G * p) / 100 };
  }
  if (d === 2 || opts.integer) {
    let p = rng.int(2, 98);
    while ([10, 25, 50].includes(p)) p = rng.int(2, 98);
    const step = stepFor(p);
    const top = Math.max(1, Math.floor((d === 3 ? maxG * 4 : maxG) / step));
    const G = step * rng.int(Math.max(1, Math.ceil(30 / step)), top);
    return { G, p, P: (G * p) / 100 };
  }
  const p = rng.pick([12.5, 7.5, 2.5, 17.5, 0.5, 37.5, 125, 150, 8.1, 3.5, 62.5, 2.6]);
  const G = 10 * rng.int(5, Math.floor(maxG / 10));
  return { G, p, P: round((G * p) / 100, 2) };
}

const percentValueSteps = ({ G, p, P }: Triple, fmt: (n: number) => string = num): string[] => [
  `Gegeben: Grundwert G = ${fmt(G)}, Prozentsatz p = ${pct(p)}. Gesucht: Prozentwert P.`,
  `1 % von ${fmt(G)} = ${fmt(G)} : 100 = ${r4(G / 100)}`,
  `${pct(p)} = ${num(p)} · ${r4(G / 100)} = ${fmt(P)}`,
  `Kurz: P = G · p : 100 = ${num(G)} · ${num(p)} : 100 = ${fmt(P)}`,
];

const percentRateSteps = ({ G, P }: Triple, p: number, fmt: (n: number) => string = num): string[] => [
  `Gegeben: Grundwert G = ${fmt(G)}, Prozentwert P = ${fmt(P)}. Gesucht: Prozentsatz p.`,
  `Anteil als Bruch: ${num(P)} / ${num(G)} = ${r4(P / G)}`,
  `In Prozent: ${r4(P / G)} · 100 = ${pct(p, 2)}`,
  `Kurz: p = P : G · 100`,
];

const baseValueSteps = ({ G, p, P }: Triple, fmt: (n: number) => string = num): string[] => [
  `Gegeben: Prozentwert P = ${fmt(P)}, Prozentsatz p = ${pct(p)}. Gesucht: Grundwert G (100 %).`,
  `${pct(p)} ≙ ${fmt(P)}`,
  `1 % ≙ ${fmt(P)} : ${num(p)} = ${r4(P / p)}`,
  `100 % ≙ ${r4(P / p)} · 100 = ${fmt(G)}`,
  `Kurz: G = P : p · 100`,
];

const shortcutHint = (p: number): string | undefined =>
  ({
    50: '50 % ist die Hälfte – teile durch 2.',
    25: '25 % ist ein Viertel – teile durch 4.',
    75: '75 % sind drei Viertel – erst durch 4, dann mal 3.',
    10: '10 % ist ein Zehntel – teile durch 10.',
    20: '20 % ist ein Fünftel – teile durch 5.',
    5: '5 % ist die Hälfte von 10 %.',
    1: '1 % ist ein Hundertstel – teile durch 100.',
  })[p];

// ---------------------------------------------------------------------------
// Story contexts that work for all three unknowns
// ---------------------------------------------------------------------------

type Ask = 'P' | 'p' | 'G';
interface Story {
  id: string;
  kind: 'count' | 'money' | 'ml';
  /** Returns context + question for the given unknown. Values are already formatted. */
  text(G: string, p: string, P: string, ask: Ask): { context: string; prompt: string };
}

const STORIES: Story[] = [
  {
    id: 'velo',
    kind: 'count',
    text: (G, p, P, ask) =>
      ask === 'P'
        ? { context: `Eine Schule hat ${G} Schülerinnen und Schüler. ${p} davon kommen mit dem Velo.`, prompt: 'Wie viele kommen mit dem Velo?' }
        : ask === 'p'
          ? { context: `Von ${G} Schülerinnen und Schülern kommen ${P} mit dem Velo.`, prompt: 'Wie viel Prozent sind das?' }
          : { context: `${P} Schülerinnen und Schüler kommen mit dem Velo. Das sind ${p} aller Kinder der Schule.`, prompt: 'Wie viele Kinder besuchen die Schule?' },
  },
  {
    id: 'vote',
    kind: 'count',
    text: (G, p, P, ask) =>
      ask === 'P'
        ? { context: `Bei einer Gemeindeabstimmung haben ${G} Personen abgestimmt. ${p} stimmten Ja.`, prompt: 'Wie viele Ja-Stimmen gab es?' }
        : ask === 'p'
          ? { context: `Bei einer Gemeindeabstimmung haben ${G} Personen abgestimmt, ${P} stimmten Ja.`, prompt: 'Wie hoch ist der Ja-Anteil in Prozent?' }
          : { context: `Bei einer Abstimmung gab es ${P} Ja-Stimmen. Das entspricht ${p} aller Stimmen.`, prompt: 'Wie viele Personen haben abgestimmt?' },
  },
  {
    id: 'concert',
    kind: 'count',
    text: (G, p, P, ask) =>
      ask === 'P'
        ? { context: `Das Hallenstadion hat für ein Konzert ${G} Plätze. ${p} davon sind schon verkauft.`, prompt: 'Wie viele Tickets sind verkauft?' }
        : ask === 'p'
          ? { context: `Für ein Konzert mit ${G} Plätzen wurden bereits ${P} Tickets verkauft.`, prompt: 'Wie viel Prozent der Plätze sind verkauft?' }
          : { context: `Für ein Konzert sind ${P} Tickets verkauft. Das sind ${p} aller Plätze.`, prompt: 'Wie viele Plätze gibt es insgesamt?' },
  },
  {
    id: 'savings',
    kind: 'money',
    text: (G, p, P, ask) =>
      ask === 'P'
        ? { context: `Mandy verdient im Ferienjob ${G}. Sie spart ${p} davon.`, prompt: 'Wie viel Geld spart sie?' }
        : ask === 'p'
          ? { context: `Mandy verdient im Ferienjob ${G} und spart davon ${P}.`, prompt: 'Wie viel Prozent ihres Lohns spart sie?' }
          : { context: `Mandy spart ${P}. Das sind ${p} ihres Ferienlohns.`, prompt: 'Wie viel hat sie insgesamt verdient?' },
  },
  {
    id: 'juice',
    kind: 'ml',
    text: (G, p, P, ask) =>
      ask === 'P'
        ? { context: `Ein Fruchtsaft-Getränk enthält ${p} Orangensaft. Die Flasche fasst ${G}.`, prompt: 'Wie viele Milliliter Orangensaft sind drin?' }
        : ask === 'p'
          ? { context: `In einer Flasche mit ${G} Getränk sind ${P} Orangensaft.`, prompt: 'Wie hoch ist der Saftanteil in Prozent?' }
          : { context: `Ein Getränk enthält ${P} Orangensaft. Das sind ${p} des Inhalts.`, prompt: 'Wie viele Milliliter fasst die Flasche?' },
  },
];

const fmtFor = (kind: Story['kind']) => (n: number) => (kind === 'money' ? chf(n) : kind === 'ml' ? `${num(n)} ml` : num(n));
const answerFields = (kind: Story['kind']) =>
  kind === 'money' ? { prefix: 'CHF', tolerance: 0.011 } : kind === 'ml' ? { unit: 'ml', tolerance: 0.011 } : { tolerance: 0.001 };

function storyTriple(rng: Rng, d: Difficulty, story: Story): Triple {
  if (story.kind === 'count') return triple(rng, d, { integer: true, maxG: d === 1 ? 800 : 2500 });
  if (story.kind === 'ml') {
    const G = rng.pick([250, 330, 500, 750, 1000, 1500]);
    const p = d === 1 ? rng.pick([10, 20, 50, 25]) : d === 2 ? rng.int(2, 19) * 5 : rng.pick([12, 15, 35, 4, 6, 8, 12.5]);
    return { G, p, P: round((G * p) / 100, 2) };
  }
  if (d === 1) {
    const G = 50 * rng.int(4, 40);
    const p = rng.pick([10, 20, 25, 50]);
    return { G, p, P: (G * p) / 100 };
  }
  const G = d === 2 ? 20 * rng.int(15, 120) : 5 * rng.int(100, 1200);
  const p = d === 2 ? rng.int(1, 9) * 5 : rng.pick([12, 15, 18, 22, 7.5, 12.5, 33]);
  return { G, p, P: round((G * p) / 100, 2) };
}

// ---------------------------------------------------------------------------
// Chapter 1 – Prozente verstehen
// ---------------------------------------------------------------------------

const gridTotals: Record<Difficulty, number[]> = { 1: [100], 2: [10, 20, 50, 25], 3: [20, 25, 40, 50] };

const gridFill: Generator = (rng, d, chapterId) => {
  const b = { gen: 'p1.gridFill', chapterId, difficulty: d };
  const total = rng.pick(gridTotals[d]);
  const cellPct = 100 / total;
  const cells = d === 1 ? rng.int(1, 19) * 5 + (rng.chance(0.4) ? rng.int(1, 4) : 0) : rng.int(1, total - 1);
  const p = d === 1 ? cells : cells * cellPct;
  return gridEx(b, {
    prompt: `Färbe ${pct(p)} der Felder ein.`,
    context: total === 100 ? 'Das Feld hat 100 Kästchen.' : `Dieses Feld hat nur ${total} Kästchen.`,
    total,
    answer: cells,
    hint: total === 100 ? '1 Kästchen = 1 %' : `1 Kästchen = 100 % : ${total} = ${pct(cellPct)}`,
    solution:
      total === 100
        ? [`100 Kästchen = 100 %, also ist 1 Kästchen = 1 %.`, `${pct(p)} = ${cells} Kästchen.`]
        : [`${total} Kästchen = 100 %`, `1 Kästchen = 100 % : ${total} = ${pct(cellPct)}`, `${pct(p)} : ${pct(cellPct)} = ${cells} Kästchen`],
  });
};

const gridRead: Generator = (rng, d, chapterId) => {
  const b = { gen: 'p1.gridRead', chapterId, difficulty: d };
  const total = rng.pick(gridTotals[d]);
  const filled = rng.int(1, total - 1);
  const p = (filled * 100) / total;
  return numberEx(b, {
    prompt: 'Wie viel Prozent der Kästchen sind gefärbt?',
    visual: { kind: 'grid', total, filled },
    unit: '%',
    answer: p,
    hint: total === 100 ? 'Zähle die gefärbten Kästchen – jedes ist 1 %.' : `Es sind ${total} Kästchen. Wie viel Prozent ist ein Kästchen?`,
    solution: [
      `Gefärbt: ${filled} von ${total} Kästchen.`,
      `1 Kästchen = 100 % : ${total} = ${pct(100 / total)}`,
      `${filled} · ${pct(100 / total)} = ${pct(p)}`,
    ],
  });
};

const ofHundred: Generator = (rng, d, chapterId) => {
  const b = { gen: 'p1.ofHundred', chapterId, difficulty: d };
  const things = [
    ['Jugendlichen', 'haben ein Haustier'],
    ['Befragten', 'essen gerne Pizza'],
    ['Lernenden', 'spielen ein Instrument'],
    ['Personen', 'fahren mit dem ÖV zur Arbeit'],
    ['Kindern', 'können schwimmen'],
  ];
  const [who, what] = rng.pick(things);
  const total = d === 1 ? 100 : d === 2 ? rng.pick([50, 200, 20, 25]) : rng.pick([1000, 500, 400, 40]);
  const part = rng.int(1, total - 1);
  const p = (part * 100) / total;
  return numberEx(b, {
    prompt: `${num(part)} von ${num(total)} ${who} ${what}. Wie viel Prozent sind das?`,
    unit: '%',
    answer: round(p, 2),
    tolerance: 0.011,
    hint: total === 100 ? '«Prozent» heisst «von Hundert».' : `Rechne um auf «von 100»: Teile durch ${num(total)} und multipliziere mit 100.`,
    solution:
      total === 100
        ? [`${part} von 100 = ${part} Hundertstel = ${pct(part)}`]
        : [`Anteil: ${num(part)} / ${num(total)} = ${r4(part / total)}`, `${r4(part / total)} · 100 = ${pct(p)}`],
  });
};

const conceptBank: Record<Difficulty, [string, string, string[], string][]> = {
  1: [
    ['Was bedeutet das Wort «Prozent»?', 'von Hundert', ['von Tausend', 'von Zehn', 'mal Hundert'], '«pro centum» ist Latein und heisst «von Hundert».'],
    ['Wie viel Prozent sind das Ganze?', '100 %', ['10 %', '1 %', '1000 %'], 'Das Ganze entspricht immer 100 %.'],
    ['Ein Glas ist halb voll. Wie viel Prozent sind das?', '50 %', ['25 %', '5 %', '20 %'], 'Die Hälfte von 100 % sind 50 %.'],
    ['Wie viel Prozent ist ein Viertel?', '25 %', ['4 %', '40 %', '14 %'], '100 % : 4 = 25 %'],
    ['Wie viel Prozent ist ein Zehntel?', '10 %', ['1 %', '0.1 %', '20 %'], '100 % : 10 = 10 %'],
  ],
  2: [
    ['Welche Angabe ist gleich gross wie 50 %?', 'die Hälfte', ['ein Fünftel', 'fünf Hundertstel', 'das Doppelte'], '50 % = 50/100 = 1/2'],
    ['Kann ein Anteil mehr als 100 % sein?', 'Ja, wenn etwas mehr als das Ganze ist (z. B. nach einem Wachstum).', ['Nein, niemals.', 'Nur bei Geld.', 'Nur bei Temperaturen.'], 'Wächst etwas über den Grundwert hinaus, ist es mehr als 100 %.'],
    ['1 % von CHF 100 sind …', 'CHF 1', ['CHF 10', 'CHF 0.10', 'CHF 100'], '100 : 100 = 1'],
    ['Was ist mehr: 30 % oder ein Drittel?', 'ein Drittel', ['30 %', 'beides gleich viel', 'kann man nicht vergleichen'], 'Ein Drittel sind ca. 33.3 % – also mehr als 30 %.'],
    ['Ein Fünftel entspricht …', '20 %', ['5 %', '15 %', '50 %'], '100 % : 5 = 20 %'],
  ],
  3: [
    ['Im Laden steht «−100 %». Was würde das bedeuten?', 'Der Artikel wäre gratis.', ['Der Preis halbiert sich.', 'Der Preis verdoppelt sich.', 'Nichts ändert sich.'], '100 % Rabatt = der ganze Preis fällt weg.'],
    ['0.5 % von 1000 Personen sind …', '5 Personen', ['50 Personen', '0.5 Personen', '500 Personen'], '1 % von 1000 = 10, also 0.5 % = 5.'],
    ['200 % einer Zahl sind …', 'das Doppelte', ['die Hälfte', 'das Zehnfache', 'die Zahl selbst'], '200 % = 2 · 100 % = das Doppelte.'],
    ['Ein Viertel von 40 % sind …', '10 %', ['4 %', '160 %', '36 %'], '40 % : 4 = 10 %'],
    ['Welche Aussage stimmt?', '10 % von 50 ist gleich viel wie 50 % von 10.', ['10 % von 50 ist mehr als 50 % von 10.', '10 % von 50 ist weniger als 50 % von 10.', 'Das kann man nicht sagen.'], 'Beides ergibt 5, denn 10 · 50 : 100 = 50 · 10 : 100.'],
  ],
};

const concept: Generator = (rng, d, chapterId) => {
  const [q, correct, wrong, why] = rng.pick(conceptBank[d]);
  return choiceEx(rng, { gen: 'p1.concept', chapterId, difficulty: d }, { prompt: q, solution: [why] }, correct, wrong);
};

// ---------------------------------------------------------------------------
// Chapter 2 – Bruch, Dezimalzahl, Prozent
// ---------------------------------------------------------------------------

const FRACTIONS: Record<Difficulty, [number, number][]> = {
  1: [[1, 2], [1, 4], [3, 4], [1, 10], [1, 5], [3, 10], [2, 5], [1, 100]],
  2: [[3, 5], [7, 10], [7, 20], [1, 8], [3, 25], [9, 50], [4, 5], [11, 20], [3, 8]],
  3: [[1, 3], [2, 3], [5, 8], [7, 40], [3, 2], [5, 4], [1, 6], [1, 40], [9, 8]],
};

const fracToPct: Generator = (rng, d, chapterId) => {
  const [a, bb] = rng.pick(FRACTIONS[d]);
  const p = (a / bb) * 100;
  const exact = Math.abs(round(p, 2) - p) < 1e-9;
  const factor = 100 % bb === 0 ? 100 / bb : null;
  return numberEx(
    { gen: 'p2.fracToPct', chapterId, difficulty: d },
    {
      prompt: `Schreibe den Bruch ${a}/${bb} in Prozent.${exact ? '' : ' Runde auf zwei Dezimalstellen.'}`,
      unit: '%',
      answer: round(p, 2),
      tolerance: exact ? 0.001 : 0.011,
      hint: factor ? `Erweitere so, dass unten 100 steht.` : `Rechne ${a} : ${bb} und multipliziere mit 100.`,
      solution: factor
        ? [`Erweitere mit ${factor}: ${a}/${bb} = ${a * factor}/100`, `${a * factor}/100 = ${pct(p)}`]
        : [`${a} : ${bb} = ${num(a / bb, 4)}`, `${num(a / bb, 4)} · 100 = ${pct(p)}`],
    },
  );
};

const DECIMALS: Record<Difficulty, number[]> = {
  1: [0.5, 0.25, 0.1, 0.75, 0.2, 0.3, 0.9],
  2: [0.07, 0.35, 0.125, 0.04, 0.62, 0.015, 0.99],
  3: [1.2, 0.005, 2.5, 1.05, 0.0125, 3, 0.333],
};

const decToPct: Generator = (rng, d, chapterId) => {
  const x = rng.pick(DECIMALS[d]);
  return numberEx(
    { gen: 'p2.decToPct', chapterId, difficulty: d },
    {
      prompt: `Schreibe die Dezimalzahl ${num(x, 4)} in Prozent.`,
      unit: '%',
      answer: round(x * 100, 4),
      hint: 'Multipliziere mit 100 – das Komma rutscht zwei Stellen nach rechts.',
      solution: [`${num(x, 4)} · 100 = ${pct(x * 100, 4)}`, 'Das Komma wandert zwei Stellen nach rechts.'],
    },
  );
};

const pctToDec: Generator = (rng, d, chapterId) => {
  const x = rng.pick(DECIMALS[d]);
  const p = round(x * 100, 4);
  return numberEx(
    { gen: 'p2.pctToDec', chapterId, difficulty: d },
    {
      prompt: `Schreibe ${pct(p, 4)} als Dezimalzahl.`,
      answer: x,
      hint: 'Teile durch 100 – das Komma rutscht zwei Stellen nach links.',
      solution: [`${pct(p, 4)} = ${num(p, 4)} : 100 = ${num(x, 4)}`],
    },
  );
};

const FRAC_PCT: [string, number][] = [
  ['1/2', 50], ['1/4', 25], ['3/4', 75], ['1/5', 20], ['2/5', 40], ['3/5', 60], ['4/5', 80],
  ['1/10', 10], ['3/10', 30], ['7/10', 70], ['1/8', 12.5], ['3/8', 37.5], ['5/8', 62.5], ['9/20', 45], ['1/20', 5],
];

const pctToFrac: Generator = (rng, d, chapterId) => {
  const pool = d === 1 ? FRAC_PCT.slice(0, 8) : d === 2 ? FRAC_PCT.slice(3, 13) : FRAC_PCT.slice(8);
  const [frac, p] = rng.pick(pool);
  const others = rng.shuffle(FRAC_PCT.filter(([f]) => f !== frac)).slice(0, 2).map(([f]) => f);
  const trap = `1/${Math.round(p)}`;
  const wrong = [...others, trap === frac ? `${p}/10` : trap];
  return choiceEx(
    rng,
    { gen: 'p2.pctToFrac', chapterId, difficulty: d },
    {
      prompt: `Welcher Bruch entspricht ${pct(p)}?`,
      hint: `Schreibe ${pct(p)} als Bruch mit Nenner 100 und kürze.`,
      solution: [`${pct(p)} = ${p}/100`, `Gekürzt: ${frac}`],
    },
    frac,
    wrong,
  );
};

const ORDER_VALUES = [20, 25, 30, 37.5, 40, 45, 50, 60, 62.5, 70, 75, 80];
const fracOf = (p: number) => FRAC_PCT.find(([, v]) => v === p)?.[0];

const orderValues: Generator = (rng, d, chapterId) => {
  const vals = rng.shuffle(ORDER_VALUES).slice(0, 4);
  const asLargest = rng.chance(0.5);
  const target = asLargest ? Math.max(...vals) : Math.min(...vals);
  const show = (p: number) => {
    const f = fracOf(p);
    const form = rng.int(0, d === 3 ? 2 : 1);
    if (form === 0 && f) return f;
    if (form <= 1) return num(p / 100, 4);
    return pct(p);
  };
  const labels = vals.map(show);
  return fixedChoiceEx(
    { gen: 'p2.order', chapterId, difficulty: d },
    {
      prompt: `Welche Zahl ist am ${asLargest ? 'grössten' : 'kleinsten'}?`,
      hint: 'Schreibe alle Zahlen in Prozent um, dann kannst du sie vergleichen.',
      solution: [...vals.map((v, i) => `${labels[i]} = ${pct(v)}`), `Am ${asLargest ? 'grössten' : 'kleinsten'}: ${labels[vals.indexOf(target)]}`],
    },
    labels,
    vals.indexOf(target),
  );
};

// ---------------------------------------------------------------------------
// Chapter 3 – Prozentwert
// ---------------------------------------------------------------------------

const pvBasic: Generator = (rng, d, chapterId) => {
  const t = triple(rng, d);
  return numberEx(
    { gen: 'p3.basic', chapterId, difficulty: d },
    {
      prompt: `Berechne ${pct(t.p)} von ${num(t.G)}.`,
      visual: d === 1 ? { kind: 'bar', percent: t.p, left: '0', right: num(t.G) } : undefined,
      answer: t.P,
      tolerance: 0.011,
      hint: shortcutHint(t.p) ?? 'Berechne zuerst 1 % (durch 100), dann multipliziere mit dem Prozentsatz.',
      solution: percentValueSteps(t),
    },
  );
};

const pvText: Generator = (rng, d, chapterId) => {
  const story = rng.pick(STORIES);
  const t = storyTriple(rng, d, story);
  const fmt = fmtFor(story.kind);
  const { context, prompt } = story.text(fmt(t.G), pct(t.p), fmt(t.P), 'P');
  return numberEx(
    { gen: 'p3.text', chapterId, difficulty: d },
    {
      context,
      prompt,
      answer: t.P,
      ...answerFields(story.kind),
      hint: 'Gesucht ist der Anteil (Prozentwert): P = G · p : 100',
      solution: percentValueSteps(t, fmt),
    },
  );
};

const pvEstimate: Generator = (rng, d, chapterId) => {
  const [p, nice, frac] = rng.pick([
    [49, 50, 'die Hälfte'], [51, 50, 'die Hälfte'], [26, 25, 'ein Viertel'], [24, 25, 'ein Viertel'],
    [19, 20, 'ein Fünftel'], [11, 10, 'ein Zehntel'], [9, 10, 'ein Zehntel'], [74, 75, 'drei Viertel'], [34, 100 / 3, 'ein Drittel'],
  ] as [number, number, string][]);
  const roundG = (d === 3 ? 1200 : 400) * rng.int(1, 5) * (nice === 100 / 3 ? 3 : 1);
  const G = roundG + rng.int(-9, 9);
  const est = (roundG * nice) / 100;
  const opts = [est, est * 10, est / 10, est / 2].map((v) => `etwa ${num(v, 0)}`);
  return choiceEx(
    rng,
    { gen: 'p3.estimate', chapterId, difficulty: d },
    {
      prompt: `Überschlage: Wie viel sind ungefähr ${pct(p)} von ${num(G)}?`,
      hint: `${pct(p)} ist fast ${frac}.`,
      solution: [`${pct(p)} ≈ ${pct(round(nice, 1))} = ${frac}`, `${num(G)} ≈ ${num(roundG)}`, `${frac} von ${num(roundG)} ≈ ${num(est, 0)}`],
    },
    opts[0],
    opts.slice(1),
  );
};

// ---------------------------------------------------------------------------
// Chapter 4 – Prozentsatz
// ---------------------------------------------------------------------------

function rateTriple(rng: Rng, d: Difficulty, integer = false): Triple & { rounded: boolean } {
  if (d === 1) {
    const [a, b] = rng.pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 10], [3, 10], [1, 20], [4, 5]] as [number, number][]);
    const m = rng.int(2, 25);
    return { G: b * m, P: a * m, p: (a / b) * 100, rounded: false };
  }
  if (d === 2) return { ...triple(rng, 2, { integer }), rounded: false };
  const G = rng.int(30, 900);
  const P = rng.int(1, G - 1);
  const p = round((P / G) * 100, 1);
  return { G, P, p, rounded: Math.abs(p - (P / G) * 100) > 1e-9 };
}

const psBasic: Generator = (rng, d, chapterId) => {
  const t = rateTriple(rng, d);
  return numberEx(
    { gen: 'p4.basic', chapterId, difficulty: d },
    {
      prompt: `Wie viel Prozent sind ${num(t.P)} von ${num(t.G)}?${t.rounded ? ' Runde auf eine Dezimalstelle.' : ''}`,
      unit: '%',
      answer: t.p,
      tolerance: t.rounded ? 0.051 : 0.001,
      hint: 'Teile den Anteil durch das Ganze und multipliziere mit 100.',
      solution: percentRateSteps(t, t.p),
    },
  );
};

const psText: Generator = (rng, d, chapterId) => {
  if (rng.chance(0.3)) {
    // School test – very relatable
    const max = rng.pick(d === 1 ? [20, 40, 50] : [24, 30, 36, 45, 60]);
    const got = d === 1 ? rng.pick([max / 2, (max * 3) / 4, max / 4, (max * 4) / 5].filter(Number.isInteger)) : rng.int(Math.floor(max / 3), max - 1);
    const exact = (got / max) * 100;
    const p = round(exact, 1);
    const rounded = Math.abs(p - exact) > 1e-9;
    return numberEx(
      { gen: 'p4.text', chapterId, difficulty: d },
      {
        context: `In der Mathe-Prüfung waren ${max} Punkte möglich. Mandy hat ${got} Punkte erreicht.`,
        prompt: `Wie viel Prozent der Punkte hat sie erreicht?${rounded ? ' Runde auf eine Dezimalstelle.' : ''}`,
        unit: '%',
        answer: p,
        tolerance: rounded ? 0.051 : 0.001,
        hint: 'p = erreichte Punkte : mögliche Punkte · 100',
        solution: percentRateSteps({ G: max, P: got, p }, p),
      },
    );
  }
  const story = rng.pick(STORIES);
  const integer = story.kind === 'count';
  const t = story.kind === 'count' ? rateTriple(rng, d, true) : { ...storyTriple(rng, d, story), rounded: false };
  const fmt = fmtFor(story.kind);
  const { context, prompt } = story.text(fmt(t.G), pct(t.p), fmt(t.P), 'p');
  return numberEx(
    { gen: 'p4.text', chapterId, difficulty: d },
    {
      context,
      prompt: prompt + (t.rounded ? ' Runde auf eine Dezimalstelle.' : ''),
      unit: '%',
      answer: t.p,
      tolerance: t.rounded ? 0.051 : integer ? 0.001 : 0.011,
      hint: 'Gesucht ist der Prozentsatz: p = P : G · 100',
      solution: percentRateSteps(t, t.p, fmt),
    },
  );
};

const NAMES = ['Lea', 'Noah', 'Mia', 'Luca', 'Sara', 'Elias', 'Lina', 'Jan', 'Alina', 'Nico'];

const psCompare: Generator = (rng, d, chapterId) => {
  const [n1, n2] = rng.shuffle(NAMES);
  const equal = d === 3 && rng.chance(0.2);
  let a1 = 0, b1 = 0, a2 = 0, b2 = 0;
  for (let tries = 0; tries < 50; tries++) {
    b1 = rng.int(12, 40);
    b2 = rng.int(12, 40);
    a1 = rng.int(Math.floor(b1 / 3), b1 - 1);
    if (equal) {
      const k = rng.pick([2, 3, 4, 5]);
      b1 = rng.pick([10, 12, 15, 20]);
      a1 = rng.int(Math.ceil(b1 / 3), b1 - 1);
      b2 = b1 * k;
      a2 = a1 * k;
      break;
    }
    a2 = rng.int(Math.floor(b2 / 3), b2 - 1);
    const diff = Math.abs(a1 / b1 - a2 / b2) * 100;
    if (diff >= (d === 2 ? 4 : 1.5) && diff <= 15) break;
  }
  const p1 = (a1 / b1) * 100, p2 = (a2 / b2) * 100;
  const opts = [n1, n2, 'Beide gleich gut'];
  const answerIndex = Math.abs(p1 - p2) < 1e-9 ? 2 : p1 > p2 ? 0 : 1;
  return fixedChoiceEx(
    { gen: 'p4.compare', chapterId, difficulty: d },
    {
      context: `Beim Basketball-Training trifft ${n1} ${a1} von ${b1} Würfen, ${n2} trifft ${a2} von ${b2} Würfen.`,
      prompt: 'Wer hat die bessere Trefferquote?',
      hint: 'Mehr Treffer heisst nicht automatisch besser – vergleiche die Prozentsätze.',
      solution: [`${n1}: ${a1} : ${b1} · 100 ≈ ${pct(round(p1, 1))}`, `${n2}: ${a2} : ${b2} · 100 ≈ ${pct(round(p2, 1))}`, `Besser: ${opts[answerIndex]}`],
    },
    opts,
    answerIndex,
  );
};

// ---------------------------------------------------------------------------
// Chapter 5 – Grundwert
// ---------------------------------------------------------------------------

const gwBasic: Generator = (rng, d, chapterId) => {
  const t = triple(rng, d);
  return numberEx(
    { gen: 'p5.basic', chapterId, difficulty: d },
    {
      prompt: `${pct(t.p)} sind ${num(t.P)}. Wie gross ist der Grundwert (100 %)?`,
      visual: d === 1 ? { kind: 'bar', percent: t.p, left: num(t.P), right: '?' } : undefined,
      answer: t.G,
      tolerance: 0.011,
      hint: `Rechne zuerst aus, wie viel 1 % ist (teile durch ${num(t.p)}).`,
      solution: baseValueSteps(t),
    },
  );
};

const gwText: Generator = (rng, d, chapterId) => {
  const story = rng.pick(STORIES);
  const t = storyTriple(rng, d, story);
  const fmt = fmtFor(story.kind);
  const { context, prompt } = story.text(fmt(t.G), pct(t.p), fmt(t.P), 'G');
  return numberEx(
    { gen: 'p5.text', chapterId, difficulty: d },
    {
      context,
      prompt,
      answer: t.G,
      ...answerFields(story.kind),
      hint: 'Gesucht ist das Ganze (Grundwert): G = P : p · 100',
      solution: baseValueSteps(t, fmt),
    },
  );
};

const IDENTIFY_OPTIONS = ['der Grundwert G (das Ganze, 100 %)', 'der Prozentwert P (der Anteil)', 'der Prozentsatz p (in %)'];

const identify: Generator = (rng, d, chapterId) => {
  const story = rng.pick(STORIES);
  const t = storyTriple(rng, Math.min(d, 2) as Difficulty, story);
  const fmt = fmtFor(story.kind);
  const ask = rng.pick<Ask>(['G', 'P', 'p']);
  const { context, prompt } = story.text(fmt(t.G), pct(t.p), fmt(t.P), ask);
  const idx = ask === 'G' ? 0 : ask === 'P' ? 1 : 2;
  return fixedChoiceEx(
    { gen: 'p5.identify', chapterId, difficulty: d },
    {
      context: `${context} ${prompt}`,
      prompt: 'Was ist bei dieser Aufgabe gesucht?',
      hint: 'Das Ganze = Grundwert, der Teil davon = Prozentwert, die Angabe in % = Prozentsatz.',
      solution: [
        `Gesucht ist ${IDENTIFY_OPTIONS[idx]}.`,
        ask === 'G' ? `Formel: G = P : p · 100 → ${fmt(t.G)}` : ask === 'P' ? `Formel: P = G · p : 100 → ${fmt(t.P)}` : `Formel: p = P : G · 100 → ${pct(t.p)}`,
      ],
    },
    IDENTIFY_OPTIONS,
    idx,
  );
};

// ---------------------------------------------------------------------------
// Chapter 6 – Rabatt, Aufschlag, MWST
// ---------------------------------------------------------------------------

const ITEMS = ['ein Pulli', 'ein Velo', 'ein Kopfhörer', 'ein Paar Sneakers', 'ein Rucksack', 'ein Skateboard', 'ein Videogame', 'eine Jacke', 'ein Snowboard'];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

function price(rng: Rng, d: Difficulty): number {
  if (d === 1) return 10 * rng.int(2, 30);
  if (d === 2) return rng.pick([5 * rng.int(6, 80), rng.int(2, 30) * 10 - 0.1]);
  return rng.pick([rng.int(30, 400) - 0.1, 5 * rng.int(20, 200), rng.int(10, 120) * 10 + 0.5]);
}

const discount: Generator = (rng, d, chapterId) => {
  const item = rng.pick(ITEMS);
  const old = price(rng, d);
  const b = { gen: 'p6.discount', chapterId, difficulty: d };
  if (d === 3) {
    const r1 = rng.pick([20, 25, 30, 40]);
    const r2 = rng.pick([5, 10]);
    const mid = old * (1 - r1 / 100);
    const end = round(mid * (1 - r2 / 100), 2);
    return numberEx(b, {
      context: `${cap(item)} kostet ${chf(old)}. Im Ausverkauf gibt es ${pct(r1)} Rabatt. An der Kasse bekommst du mit der Kundenkarte nochmals ${pct(r2)} auf den reduzierten Preis.`,
      prompt: 'Wie viel bezahlst du am Schluss?',
      prefix: 'CHF',
      answer: end,
      tolerance: 0.011,
      hint: 'Zwei Schritte: zuerst der erste Rabatt, dann der zweite auf den neuen Preis. (Nicht einfach addieren!)',
      solution: [
        `Nach ${pct(r1)} Rabatt: ${chf(old)} · ${num(1 - r1 / 100)} = ${chf(mid)}`,
        `Nach weiteren ${pct(r2)}: ${chf(mid)} · ${num(1 - r2 / 100)} = ${chf(end)}`,
        `Achtung: Das sind insgesamt NICHT ${pct(r1 + r2)} Rabatt, sondern ${pct(round(100 - (end / old) * 100, 1))}.`,
      ],
    });
  }
  const r = d === 1 ? rng.pick([10, 20, 25, 50]) : rng.int(1, 8) * 5;
  const saved = round((old * r) / 100, 2);
  const askSaved = d === 1 && rng.chance(0.4);
  return numberEx(b, {
    context: `${cap(item)} kostet ${chf(old)}. Es gibt ${pct(r)} Rabatt.`,
    prompt: askSaved ? 'Wie viele Franken sparst du?' : 'Wie hoch ist der Preis nach dem Rabatt?',
    prefix: 'CHF',
    answer: askSaved ? saved : round(old - saved, 2),
    tolerance: 0.011,
    hint: askSaved ? 'Berechne den Prozentwert des Rabatts.' : `Nach ${pct(r)} Rabatt bezahlst du noch ${pct(100 - r)} des Preises.`,
    solution: askSaved
      ? [`Rabatt = ${chf(old)} · ${num(r)} : 100 = ${chf(saved)}`]
      : [
          `Rabatt = ${chf(old)} · ${num(r)} : 100 = ${chf(saved)}`,
          `Neuer Preis = ${chf(old)} − ${chf(saved)} = ${chf(old - saved)}`,
          `Schneller: ${chf(old)} · ${num(1 - r / 100)} = ${chf(old - saved)}`,
        ],
  });
};

const increase: Generator = (rng, d, chapterId) => {
  const b = { gen: 'p6.increase', chapterId, difficulty: d };
  if (d >= 2 && rng.chance(0.5)) {
    const net = price(rng, d);
    const gross = round(net * 1.081, 2);
    return numberEx(b, {
      context: `${cap(rng.pick(ITEMS))} kostet ohne Mehrwertsteuer ${chf(net)}. In der Schweiz kommen 8.1 % MWST dazu.`,
      prompt: 'Wie hoch ist der Preis inklusive MWST? (auf Rappen genau)',
      prefix: 'CHF',
      answer: gross,
      tolerance: 0.011,
      hint: 'Mit MWST bezahlst du 108.1 % – multipliziere mit 1.081.',
      solution: [`100 % + 8.1 % = 108.1 % → Faktor 1.081`, `${chf(net)} · 1.081 = ${chf(gross)}`],
    });
  }
  const old = d === 1 ? 10 * rng.int(2, 20) : price(rng, d);
  const r = d === 1 ? rng.pick([10, 20, 25, 50]) : rng.pick([3, 4, 6, 8, 12, 15, 35]);
  const neu = round(old * (1 + r / 100), 2);
  const thing = rng.pick(['Ein Konzertticket', 'Das Jahresabo fürs Fitnesscenter', 'Ein Kinoeintritt für die ganze Familie', 'Das Handy-Abo pro Jahr']);
  return numberEx(b, {
    context: `${thing} kostet ${chf(old)}. Der Preis wird um ${pct(r)} erhöht.`,
    prompt: 'Wie hoch ist der neue Preis?',
    prefix: 'CHF',
    answer: neu,
    tolerance: 0.011,
    hint: `Neu bezahlt man ${pct(100 + r)} des alten Preises.`,
    solution: [`Aufschlag = ${chf(old)} · ${num(r)} : 100 = ${chf((old * r) / 100)}`, `Neuer Preis = ${chf(old)} + ${chf((old * r) / 100)} = ${chf(neu)}`, `Schneller: ${chf(old)} · ${num(1 + r / 100, 4)} = ${chf(neu)}`],
  });
};

const factor: Generator = (rng, d, chapterId) => {
  const up = rng.chance(0.5);
  const r = d === 1 ? rng.pick([10, 20, 25, 50]) : d === 2 ? rng.int(1, 19) * 5 : rng.pick([8.1, 12.5, 3, 7.5, 2.5, 120]);
  const f = round(up ? 1 + r / 100 : 1 - r / 100, 4);
  if (!up && r >= 100) return factor(rng, d, chapterId);
  return numberEx(
    { gen: 'p6.factor', chapterId, difficulty: d },
    {
      prompt: `Mit welcher Zahl multiplizierst du den alten Wert bei ${up ? 'einer Erhöhung' : 'einer Senkung'} um ${pct(r)}?`,
      answer: f,
      hint: up ? `100 % + ${pct(r)} = ? – dann durch 100.` : `100 % − ${pct(r)} = ? – dann durch 100.`,
      solution: [`${up ? `100 % + ${pct(r)}` : `100 % − ${pct(r)}`} = ${pct(f * 100)}`, `${pct(f * 100)} = ${num(f, 4)} → Wachstumsfaktor ${num(f, 4)}`],
    },
  );
};

const reverse: Generator = (rng, d, chapterId) => {
  const b = { gen: 'p6.reverse', chapterId, difficulty: d };
  if (d === 3 && rng.chance(0.5)) {
    const net = 10 * rng.int(3, 80);
    const gross = round(net * 1.081, 2);
    return numberEx(b, {
      context: `Auf der Quittung steht: Total ${chf(gross)} inkl. 8.1 % MWST.`,
      prompt: 'Wie hoch ist der Preis ohne MWST?',
      prefix: 'CHF',
      answer: net,
      tolerance: 0.011,
      hint: `${chf(gross)} sind 108.1 % – nicht 100 %! Teile durch 1.081.`,
      solution: [`${chf(gross)} ≙ 108.1 %`, `100 % ≙ ${chf(gross)} : 1.081 = ${chf(net)}`, 'Fehlerfalle: 8.1 % vom Endpreis abziehen ist falsch.'],
    });
  }
  const r = d === 1 ? rng.pick([10, 20, 25, 50]) : rng.int(1, 8) * 5;
  const old = (d === 1 ? 20 : 10) * rng.int(2, 30);
  const neu = round(old * (1 - r / 100), 2);
  const item = rng.pick(ITEMS);
  return numberEx(b, {
    context: `Nach ${pct(r)} Rabatt kostet ${item} noch ${chf(neu)}.`,
    prompt: 'Wie hoch war der Preis vorher?',
    prefix: 'CHF',
    answer: old,
    tolerance: 0.011,
    hint: `Der neue Preis entspricht ${pct(100 - r)} des alten Preises.`,
    solution: [`${chf(neu)} ≙ ${pct(100 - r)}`, `1 % ≙ ${chf(neu)} : ${100 - r} = ${r4(neu / (100 - r))}`, `100 % ≙ ${chf(old)}`, `Oder: ${chf(neu)} : ${num(1 - r / 100)} = ${chf(old)}`],
  });
};

// ---------------------------------------------------------------------------
// Chapter 7 – Prozentuale Veränderung
// ---------------------------------------------------------------------------

const CHANGE_CTX = [
  { what: 'Der Preis eines Kinotickets', unit: 'money' },
  { what: 'Die Anzahl Follower von Mandys Kanal', unit: 'count' },
  { what: 'Die Einwohnerzahl eines Dorfs', unit: 'count' },
  { what: 'Die Zahl der Besucherinnen und Besucher im Zoo', unit: 'count' },
] as const;

const change: Generator = (rng, d, chapterId) => {
  // Money only with easy numbers; harder levels use counts so values stay whole numbers.
  const ctx = d === 1 ? rng.pick(CHANGE_CTX) : rng.pick(CHANGE_CTX.filter((c) => c.unit === 'count'));
  const up = rng.chance(0.55);
  let old: number, neu: number, p: number, rounded = false;
  if (d === 1) {
    old = rng.pick([20, 40, 50, 80, 100, 200, 400, 500]);
    p = rng.pick([10, 20, 25, 50]);
    neu = old * (1 + ((up ? 1 : -1) * p) / 100);
  } else if (d === 2) {
    const t = triple(rng, 2, { integer: true, maxG: 2000 });
    old = t.G;
    p = t.p;
    if (!up && p >= 90) p = p - 50;
    neu = old * (1 + ((up ? 1 : -1) * p) / 100);
  } else {
    old = rng.int(120, 5000);
    neu = Math.round(old * (1 + ((up ? 1 : -1) * rng.int(3, 45)) / 100));
    const exact = (Math.abs(neu - old) / old) * 100;
    p = round(exact, 1);
    rounded = Math.abs(exact - p) > 1e-9;
  }
  const fmt = ctx.unit === 'money' ? chf : (n: number) => num(n);
  const pronoun = ctx.what.startsWith('Der') ? 'er' : 'sie';
  const diff = Math.abs(neu - old);
  return numberEx(
    { gen: 'p7.change', chapterId, difficulty: d },
    {
      context: `${ctx.what} ist von ${fmt(old)} auf ${fmt(neu)} ${up ? 'gestiegen' : 'gesunken'}.`,
      prompt: `Um wie viel Prozent hat ${pronoun} ${up ? 'zugenommen' : 'abgenommen'}?${rounded ? ' Runde auf eine Dezimalstelle.' : ''}`,
      unit: '%',
      answer: p,
      tolerance: rounded ? 0.051 : 0.011,
      hint: 'Veränderung durch den ALTEN Wert teilen (der alte Wert ist 100 %).',
      solution: [
        `Veränderung: ${fmt(neu)} − ${fmt(old)} = ${up ? '' : '−'}${fmt(diff)}`,
        `Bezogen auf den alten Wert: ${num(diff)} : ${num(old)} = ${r4(diff / old)}`,
        `${r4(diff / old)} · 100 = ${pct((diff / old) * 100, 2)}`,
      ],
    },
  );
};

const newValue: Generator = (rng, d, chapterId) => {
  const up = rng.chance(0.5);
  const old = d === 1 ? 100 * rng.int(2, 50) : d === 2 ? 50 * rng.int(10, 200) : rng.int(1000, 50000);
  const p = d === 1 ? rng.pick([10, 20, 25, 50]) : d === 2 ? rng.int(1, 30) : rng.pick([1.5, 2.5, 3.2, 0.8, 4.5, 12.5]);
  const neu = round(old * (1 + ((up ? 1 : -1) * p) / 100), 2);
  const exact = Number.isInteger(neu);
  return numberEx(
    { gen: 'p7.newValue', chapterId, difficulty: d },
    {
      context: `Ein Dorf hat ${num(old)} Einwohnerinnen und Einwohner. In zehn Jahren ${up ? 'wächst' : 'schrumpft'} es um ${pct(p)}.`,
      prompt: `Wie viele Einwohner hat es danach?${exact ? '' : ' (Runde auf eine ganze Zahl.)'}`,
      answer: exact ? neu : Math.round(neu),
      tolerance: exact ? 0.001 : 0.51,
      hint: `Wachstumsfaktor: ${up ? '1 + ' : '1 − '}${num(p / 100, 4)}`,
      solution: [`Faktor = ${num(1 + ((up ? 1 : -1) * p) / 100, 4)}`, `${num(old)} · ${num(1 + ((up ? 1 : -1) * p) / 100, 4)} = ${num(neu)}`],
    },
  );
};

const points: Generator = (rng, d, chapterId) => {
  const a = d === 1 ? rng.pick([10, 20, 25, 40, 50]) : rng.pick([4, 5, 8, 10, 12, 16, 20, 25]);
  const relPool = d === 1 ? [10, 20, 50] : [25, 50, 75, 20, 10, 100];
  const rel = rng.pick(relPool.filter((r) => Number.isInteger((a * r) / 100) || d > 1));
  const b = round(a * (1 + rel / 100), 2);
  const askPoints = rng.chance(0.5);
  return numberEx(
    { gen: 'p7.points', chapterId, difficulty: d },
    {
      context: `Der Anteil der Jugendlichen, die ein E-Bike haben, ist von ${pct(a)} auf ${pct(b)} gestiegen.`,
      prompt: askPoints ? 'Um wie viele Prozentpunkte ist der Anteil gestiegen?' : 'Um wie viel Prozent ist der Anteil gestiegen?',
      unit: askPoints ? 'Prozentpunkte' : '%',
      answer: askPoints ? round(b - a, 2) : rel,
      tolerance: 0.011,
      hint: askPoints ? 'Prozentpunkte = einfache Differenz der beiden Prozentangaben.' : 'Prozent = Veränderung im Verhältnis zum alten Wert.',
      solution: [
        `Prozentpunkte: ${num(b)} − ${num(a)} = ${num(b - a)} Prozentpunkte`,
        `Prozent: ${num(b - a)} : ${num(a)} · 100 = ${pct(rel)}`,
        'Prozentpunkte vergleichen zwei Prozentangaben direkt, Prozent beziehen sich auf den alten Wert.',
      ],
    },
  );
};

const twoStep: Generator = (rng, d, chapterId) => {
  const b = { gen: 'p7.twoStep', chapterId, difficulty: d };
  if (d < 3) {
    const x = rng.pick([10, 20, 25, 50]);
    const upFirst = rng.chance(0.5);
    return choiceEx(
      rng,
      b,
      {
        context: `Ein Preis von CHF 100 wird zuerst um ${pct(x)} ${upFirst ? 'erhöht' : 'gesenkt'} und danach um ${pct(x)} ${upFirst ? 'gesenkt' : 'erhöht'}.`,
        prompt: 'Wie ist der Endpreis im Vergleich zum Anfangspreis?',
        hint: 'Die zweite Veränderung bezieht sich auf einen anderen Grundwert!',
        solution: [
          `${upFirst ? `100 · ${num(1 + x / 100)}` : `100 · ${num(1 - x / 100)}`} = ${num(100 * (1 + ((upFirst ? 1 : -1) * x) / 100))}`,
          `${num(100 * (1 + ((upFirst ? 1 : -1) * x) / 100))} · ${num(1 + ((upFirst ? -1 : 1) * x) / 100)} = ${num(100 * (1 - (x * x) / 10000))}`,
          `Der Endpreis ist um ${pct((x * x) / 100)} tiefer.`,
        ],
      },
      'tiefer',
      ['gleich hoch', 'höher', 'kommt auf den Preis an'],
    );
  }
  const x = rng.pick([10, 20, 25, 30, 40, 50]);
  const y = rng.pick([10, 20, 25, 50].filter((v) => v !== x));
  const f = (1 + x / 100) * (1 - y / 100);
  return numberEx(b, {
    context: `Eine Aktie steigt zuerst um ${pct(x)}, danach fällt sie um ${pct(y)}.`,
    prompt: 'Wie viel Prozent des Anfangswerts ist sie jetzt wert?',
    unit: '%',
    answer: round(f * 100, 2),
    tolerance: 0.011,
    hint: 'Multipliziere die beiden Wachstumsfaktoren.',
    solution: [`Faktoren: ${num(1 + x / 100)} und ${num(1 - y / 100)}`, `${num(1 + x / 100)} · ${num(1 - y / 100)} = ${num(f, 4)}`, `${num(f, 4)} = ${pct(f * 100)}`],
  });
};

// ---------------------------------------------------------------------------
// Chapter 8 – Zinsrechnen
// ---------------------------------------------------------------------------

function capital(rng: Rng, d: Difficulty): number {
  return d === 1 ? 100 * rng.int(5, 100) : d === 2 ? 50 * rng.int(20, 400) : 250 * rng.int(8, 200);
}
const rate = (rng: Rng, d: Difficulty) => (d === 1 ? rng.pick([1, 2, 3, 4, 5]) : d === 2 ? rng.pick([0.5, 1.5, 2.5, 0.75, 1.25]) : rng.pick([0.25, 1.75, 2.15, 0.6, 3.25]));

const yearInterest: Generator = (rng, d, chapterId) => {
  const K = capital(rng, d);
  const p = rate(rng, d);
  const Z = round((K * p) / 100, 2);
  return numberEx(
    { gen: 'p8.year', chapterId, difficulty: d },
    {
      context: `Mandy legt ${chf(K)} auf ein Sparkonto. Die Bank zahlt ${pct(p)} Zins pro Jahr.`,
      prompt: 'Wie viel Zins bekommt sie nach einem Jahr?',
      prefix: 'CHF',
      answer: Z,
      tolerance: 0.011,
      hint: 'Der Jahreszins ist ein Prozentwert: Z = K · p : 100',
      solution: [`K = ${chf(K)}, p = ${pct(p)}`, `Z = ${num(K)} · ${num(p)} : 100 = ${chf(Z)}`],
    },
  );
};

const marchInterest: Generator = (rng, d, chapterId) => {
  const K = capital(rng, d);
  const p = rate(rng, d);
  const useMonths = d < 3 || rng.chance(0.3);
  const months = rng.pick([3, 4, 6, 8, 9]);
  const days = useMonths ? months * 30 : rng.pick([45, 72, 100, 135, 200, 250]);
  const Z = round((((K * p) / 100) * days) / 360, 2);
  return numberEx(
    { gen: 'p8.march', chapterId, difficulty: d },
    {
      context: `Ein Kapital von ${chf(K)} ist zu ${pct(p)} Jahreszins angelegt – aber nur ${useMonths ? `${months} Monate` : `${days} Tage`} lang.`,
      prompt: 'Wie viel Zins gibt es für diese Zeit? (Bankjahr: 360 Tage, 1 Monat = 30 Tage)',
      prefix: 'CHF',
      answer: Z,
      tolerance: 0.011,
      hint: `Zuerst den Jahreszins, dann den Anteil für ${days} von 360 Tagen.`,
      solution: [`Jahreszins = ${num(K)} · ${num(p)} : 100 = ${chf((K * p) / 100)}`, `Zeit: ${days} Tage = ${days}/360 Jahr`, `Zins = ${chf((K * p) / 100)} · ${days} : 360 = ${chf(Z)}`],
    },
  );
};

const findRate: Generator = (rng, d, chapterId) => {
  const K = capital(rng, d);
  const p = rate(rng, d);
  const Z = round((K * p) / 100, 2);
  const askK = d === 3 && rng.chance(0.5);
  return numberEx(
    { gen: 'p8.findRate', chapterId, difficulty: d },
    askK
      ? {
          context: `Bei einem Zinssatz von ${pct(p)} bekommt jemand nach einem Jahr ${chf(Z)} Zins.`,
          prompt: 'Wie gross war das Kapital?',
          prefix: 'CHF',
          answer: K,
          tolerance: 0.011,
          hint: 'Das Kapital ist der Grundwert: K = Z : p · 100',
          solution: [`${pct(p)} ≙ ${chf(Z)}`, `1 % ≙ ${r4(Z / p)}`, `100 % ≙ ${chf(K)}`],
        }
      : {
          context: `Für ${chf(K)} Guthaben zahlt die Bank nach einem Jahr ${chf(Z)} Zins.`,
          prompt: 'Wie hoch ist der Zinssatz?',
          unit: '%',
          answer: p,
          tolerance: 0.006,
          hint: 'Der Zinssatz ist ein Prozentsatz: p = Z : K · 100',
          solution: [`p = ${num(Z)} : ${num(K)} · 100 = ${pct(p)}`],
        },
  );
};

const compound: Generator = (rng, d, chapterId) => {
  const K = d === 2 ? 1000 * rng.int(1, 10) : 500 * rng.int(2, 40);
  const p = d === 2 ? rng.pick([1, 2, 5, 10]) : rng.pick([1.5, 2, 2.5, 3, 4]);
  const n = d === 2 ? 2 : rng.int(3, 6);
  const end = round(K * (1 + p / 100) ** n, 2);
  return numberEx(
    { gen: 'p8.compound', chapterId, difficulty: d },
    {
      context: `${chf(K)} werden zu ${pct(p)} angelegt. Der Zins wird jedes Jahr dazugezählt und im nächsten Jahr mitverzinst (Zinseszins).`,
      prompt: `Wie gross ist das Guthaben nach ${n} Jahren?`,
      prefix: 'CHF',
      answer: end,
      tolerance: 0.011,
      hint: `Multipliziere ${n}-mal mit dem Faktor ${num(1 + p / 100, 4)}.`,
      solution: [`Faktor pro Jahr: ${num(1 + p / 100, 4)}`, `K · ${num(1 + p / 100, 4)}^${n} = ${num(K)} · ${num((1 + p / 100) ** n, 6)}`, `= ${chf(end)}`],
    },
  );
};

// ---------------------------------------------------------------------------

export const percentGenerators: Record<string, Generator> = {
  'p1.gridFill': gridFill,
  'p1.gridRead': gridRead,
  'p1.ofHundred': ofHundred,
  'p1.concept': concept,
  'p2.fracToPct': fracToPct,
  'p2.decToPct': decToPct,
  'p2.pctToDec': pctToDec,
  'p2.pctToFrac': pctToFrac,
  'p2.order': orderValues,
  'p3.basic': pvBasic,
  'p3.text': pvText,
  'p3.estimate': pvEstimate,
  'p4.basic': psBasic,
  'p4.text': psText,
  'p4.compare': psCompare,
  'p5.basic': gwBasic,
  'p5.text': gwText,
  'p5.identify': identify,
  'p6.discount': discount,
  'p6.increase': increase,
  'p6.factor': factor,
  'p6.reverse': reverse,
  'p7.change': change,
  'p7.newValue': newValue,
  'p7.points': points,
  'p7.twoStep': twoStep,
  'p8.year': yearInterest,
  'p8.march': marchInterest,
  'p8.findRate': findRate,
  'p8.compound': compound,
};

export type { Exercise };
