// Task generators for "Satz des Pythagoras" (Lehrplan 21, Zyklus 3).
import { num, round } from '../../core/format';
import type { Difficulty, Generator, Rng } from '../../core/types';
import { choiceEx, fixedChoiceEx, numberEx } from '../helpers';

// ---------------------------------------------------------------------------
// Chapter 1 – Quadrate & Wurzeln
// ---------------------------------------------------------------------------

function base(rng: Rng, d: Difficulty): number {
  if (d === 1) return rng.int(2, 15);
  if (d === 2) return rng.chance(0.6) ? rng.int(11, 25) : rng.pick([1.5, 2.5, 0.5, 3.5]);
  return rng.pick([0.3, 0.7, 1.2, 0.9, 30, 40, 60, 1.1, 0.05, 4.5]);
}

const square: Generator = (rng, d, chapterId) => {
  const a = base(rng, d);
  return numberEx(
    { gen: 'py1.square', chapterId, difficulty: d },
    {
      prompt: `Berechne ${num(a)}²`,
      answer: round(a * a, 4),
      hint: `${num(a)}² heisst ${num(a)} · ${num(a)}.`,
      solution: [`${num(a)}² = ${num(a)} · ${num(a)} = ${num(a * a, 4)}`],
    },
  );
};

const sqrt: Generator = (rng, d, chapterId) => {
  const a = base(rng, d);
  return numberEx(
    { gen: 'py1.sqrt', chapterId, difficulty: d },
    {
      prompt: `Berechne √${num(a * a, 4)}`,
      answer: a,
      hint: 'Welche Zahl mit sich selbst multipliziert ergibt diese Zahl?',
      solution: [`${num(a)} · ${num(a)} = ${num(a * a, 4)}`, `also √${num(a * a, 4)} = ${num(a)}`],
    },
  );
};

const between: Generator = (rng, d, chapterId) => {
  const lo = rng.int(d === 1 ? 2 : 5, d === 1 ? 9 : 19);
  const n = rng.int(lo * lo + 1, (lo + 1) * (lo + 1) - 1);
  const correct = `zwischen ${lo} und ${lo + 1}`;
  return choiceEx(
    rng,
    { gen: 'py1.between', chapterId, difficulty: d },
    {
      prompt: `Zwischen welchen ganzen Zahlen liegt √${n}?`,
      hint: 'Suche die Quadratzahlen direkt unter und über der Zahl.',
      solution: [`${lo}² = ${lo * lo} und ${lo + 1}² = ${(lo + 1) * (lo + 1)}`, `${lo * lo} < ${n} < ${(lo + 1) * (lo + 1)} → √${n} liegt ${correct}.`],
    },
    correct,
    [`zwischen ${lo - 1} und ${lo}`, `zwischen ${lo + 1} und ${lo + 2}`, `zwischen ${Math.floor(n / 2)} und ${Math.floor(n / 2) + 1}`],
  );
};

// ---------------------------------------------------------------------------
// Chapter 2 – Hypotenuse
// ---------------------------------------------------------------------------

const TRIPLES: Record<Difficulty, [number, number, number][]> = {
  1: [[3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20], [15, 20, 25], [30, 40, 50]],
  2: [[5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [10, 24, 26], [9, 40, 41], [12, 35, 37]],
  3: [],
};

function legs(rng: Rng, d: Difficulty): [number, number, number, boolean] {
  if (d < 3 || rng.chance(0.25)) {
    const [a, b, c] = rng.pick(TRIPLES[d < 3 ? d : 2]);
    return rng.chance(0.5) ? [a, b, c, true] : [b, a, c, true];
  }
  const a = rng.int(3, 30);
  const b = rng.int(3, 30);
  return [a, b, Math.sqrt(a * a + b * b), false];
}

const UNITS = ['cm', 'm', 'mm'];

const hypotenuse: Generator = (rng, d, chapterId) => {
  const [a, b, c, exact] = legs(rng, d);
  const u = rng.pick(UNITS);
  const cr = round(c, 1);
  return numberEx(
    { gen: 'py2.hyp', chapterId, difficulty: d },
    {
      prompt: `Berechne die Hypotenuse c.${exact ? '' : ' Runde auf eine Dezimalstelle.'}`,
      visual: { kind: 'triangle', a: `a = ${a} ${u}`, b: `b = ${b} ${u}`, c: 'c = ?', highlight: 'c' },
      unit: u,
      answer: exact ? c : cr,
      tolerance: exact ? 0.001 : 0.051,
      hint: 'c² = a² + b², danach die Wurzel ziehen.',
      solution: [`c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}`, `c = √${a * a + b * b} ${exact ? '=' : '≈'} ${num(exact ? c : cr)} ${u}`],
    },
  );
};

const LETTER_SETS = [['p', 'q', 'r'], ['x', 'y', 'z'], ['e', 'f', 'g'], ['k', 'm', 'n']];

const formula: Generator = (rng, d, chapterId) => {
  const [l1, l2, h] = rng.pick(LETTER_SETS);
  const correct = `${l1}² + ${l2}² = ${h}²`;
  return choiceEx(
    rng,
    { gen: 'py2.formula', chapterId, difficulty: d },
    {
      prompt: 'Welche Gleichung gilt für dieses rechtwinklige Dreieck?',
      visual: { kind: 'triangle', a: l1, b: l2, c: h },
      hint: 'Die Hypotenuse liegt gegenüber dem rechten Winkel – sie ist die längste Seite.',
      solution: [`Die Hypotenuse ist ${h} (gegenüber dem rechten Winkel).`, `→ ${correct}`],
    },
    correct,
    [`${l1}² + ${h}² = ${l2}²`, `${l2}² + ${h}² = ${l1}²`, `${l1} + ${l2} = ${h}`],
  );
};

// ---------------------------------------------------------------------------
// Chapter 3 – Kathete & Anwendungen
// ---------------------------------------------------------------------------

const leg: Generator = (rng, d, chapterId) => {
  let [a, b, c, exact] = legs(rng, d);
  if (!exact) {
    c = rng.int(Math.max(a, b) + 1, Math.max(a, b) + 15);
  }
  const u = rng.pick(UNITS);
  const ask = Math.sqrt(c * c - b * b);
  const ar = round(ask, 1);
  return numberEx(
    { gen: 'py3.leg', chapterId, difficulty: d },
    {
      prompt: `Berechne die Kathete a.${exact ? '' : ' Runde auf eine Dezimalstelle.'}`,
      visual: { kind: 'triangle', a: 'a = ?', b: `b = ${b} ${u}`, c: `c = ${num(c)} ${u}`, highlight: 'a' },
      unit: u,
      answer: exact ? a : ar,
      tolerance: exact ? 0.001 : 0.051,
      hint: 'a² = c² − b² (Hypotenuse minus die andere Kathete).',
      solution: [`a² = ${num(c)}² − ${b}² = ${num(c * c)} − ${b * b} = ${num(c * c - b * b)}`, `a = √${num(c * c - b * b)} ${exact ? '=' : '≈'} ${num(exact ? a : ar)} ${u}`],
    },
  );
};

const apply: Generator = (rng, d, chapterId) => {
  const b = { gen: 'py3.apply', chapterId, difficulty: d };
  const kind = rng.int(0, d === 1 ? 1 : 3);
  if (kind === 0) {
    // [foot, height, ladder] in metres – realistic ladders
    const [foot, height, ladder] = rng.pick(
      d === 1
        ? ([[1.8, 2.4, 3], [1.5, 2, 2.5], [2.1, 2.8, 3.5], [2.4, 3.2, 4]] as [number, number, number][])
        : ([[1.4, 4.8, 5], [2, 4.8, 5.2], [2.4, 4.5, 5.1], [0.9, 4, 4.1], [1.2, 3.5, 3.7]] as [number, number, number][]),
    );
    return numberEx(b, {
      context: `Eine ${num(ladder)} m lange Leiter steht ${num(foot)} m von der Hauswand entfernt.`,
      prompt: 'Wie hoch reicht die Leiter an der Wand?',
      unit: 'm',
      answer: height,
      tolerance: 0.011,
      hint: 'Die Leiter ist die Hypotenuse.',
      solution: [`h² = ${num(ladder)}² − ${num(foot)}² = ${num(ladder * ladder, 4)} − ${num(foot * foot, 4)} = ${num(height * height, 4)}`, `h = ${num(height)} m`],
    });
  }
  if (kind === 1) {
    const [w, h] = rng.pick([
      [105, 68],
      [100, 64],
      [90, 45],
      [40, 20],
      [28, 15],
    ] as [number, number][]);
    const diag = Math.sqrt(w * w + h * h);
    const what = w > 50 ? 'Ein Fussballfeld' : 'Eine Turnhalle';
    return numberEx(b, {
      context: `${what} ist ${w} m lang und ${h} m breit.`,
      prompt: 'Wie lang ist die Diagonale? (auf eine Dezimalstelle)',
      unit: 'm',
      answer: round(diag, 1),
      tolerance: 0.051,
      hint: 'Länge und Breite sind die Katheten, die Diagonale ist die Hypotenuse.',
      solution: [`d² = ${w}² + ${h}² = ${w * w + h * h}`, `d = √${w * w + h * h} ≈ ${num(round(diag, 1))} m`],
    });
  }
  if (kind === 2) {
    const [w, h] = rng.pick([
      [48, 27],
      [64, 36],
      [32, 18],
      [16, 9],
      [80, 45],
    ] as [number, number][]);
    const diag = Math.sqrt(w * w + h * h);
    return numberEx(b, {
      context: `Ein Bildschirm ist ${w} cm breit und ${h} cm hoch.`,
      prompt: 'Wie lang ist die Bildschirmdiagonale? (auf eine Dezimalstelle)',
      unit: 'cm',
      answer: round(diag, 1),
      tolerance: 0.051,
      hint: 'Breite und Höhe bilden einen rechten Winkel.',
      solution: [`d² = ${w}² + ${h}² = ${w * w + h * h}`, `d ≈ ${num(round(diag, 1))} cm (≈ ${num(round(diag / 2.54, 1))} Zoll)`],
    });
  }
  const x1 = rng.int(-5, 5);
  const y1 = rng.int(-5, 5);
  const [dx, dy, dist] = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [4, 3, 5]] as [number, number, number][]);
  const x2 = x1 + dx * (rng.chance(0.5) ? 1 : -1);
  const y2 = y1 + dy * (rng.chance(0.5) ? 1 : -1);
  const pt = (x: number, y: number) => `(${num(x)} | ${num(y)})`;
  return numberEx(b, {
    context: `Im Koordinatensystem liegen die Punkte A${pt(x1, y1)} und B${pt(x2, y2)}.`,
    prompt: 'Wie lang ist die Strecke AB?',
    answer: dist,
    hint: 'Bestimme den Abstand in x-Richtung und in y-Richtung – das sind die Katheten.',
    solution: [`Δx = ${Math.abs(x2 - x1)}, Δy = ${Math.abs(y2 - y1)}`, `AB² = ${dx * dx} + ${dy * dy} = ${dist * dist}`, `AB = ${dist}`],
  });
};

const isRight: Generator = (rng, d, chapterId) => {
  const right = rng.chance(0.5);
  const [a, b, c0] = rng.pick([...TRIPLES[1], ...TRIPLES[2]]);
  let c = c0;
  if (!right) c = c + rng.pick([-1, 1]);
  const sides = rng.shuffle([a, b, c]);
  const [x, y, z] = [...sides].sort((p, q) => p - q);
  return fixedChoiceEx(
    { gen: 'py3.isRight', chapterId, difficulty: d },
    {
      prompt: `Ein Dreieck hat die Seiten ${sides.join(' cm, ')} cm. Ist es rechtwinklig?`,
      hint: 'Prüfe, ob die zwei kurzen Seiten im Quadrat zusammen das Quadrat der längsten ergeben.',
      solution: [`${x}² + ${y}² = ${x * x} + ${y * y} = ${x * x + y * y}`, `${z}² = ${z * z}`, x * x + y * y === z * z ? 'Gleich → rechtwinklig.' : 'Nicht gleich → nicht rechtwinklig.'],
    },
    ['Ja', 'Nein'],
    x * x + y * y === z * z ? 0 : 1,
  );
};

export const pythagorasGenerators: Record<string, Generator> = {
  'py1.square': square,
  'py1.sqrt': sqrt,
  'py1.between': between,
  'py2.hyp': hypotenuse,
  'py2.formula': formula,
  'py3.leg': leg,
  'py3.apply': apply,
  'py3.isRight': isRight,
};
