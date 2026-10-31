// Task generators for "Gleichungen" (Lehrplan 21, Zyklus 3).
import { chf, num } from '../../core/format';
import type { Difficulty, Generator, Rng } from '../../core/types';
import { choiceEx, fixedChoiceEx, numberEx } from '../helpers';

/** Coefficient times x: 1 → "x", −1 → "−x", 3 → "3x", 0.5 → "0.5x". */
export const tx = (a: number, v = 'x') => (a === 1 ? v : a === -1 ? `−${v}` : `${num(a, 4)}${v}`);
/** Constant appended to a term: " + 5", " − 5", "" for 0. */
export const tc = (c: number) => (c === 0 ? '' : c > 0 ? ` + ${num(c, 4)}` : ` − ${num(-c, 4)}`);
/** Operation written after "|", e.g. "| − 5", "| : 3". */
const op = (sym: string, n: number) => `| ${sym} ${n < 0 ? `(${num(n, 4)})` : num(n, 4)}`;

const nz = (rng: Rng, min: number, max: number) => {
  let v = 0;
  while (v === 0) v = rng.int(min, max);
  return v;
};

function solution(rng: Rng, d: Difficulty): number {
  if (d === 1) return rng.int(1, 15);
  if (d === 2) return nz(rng, -12, 15);
  return rng.chance(0.5) ? nz(rng, -15, 20) : rng.pick([0.5, 1.5, 2.5, -0.5, 3.5, 0.25, 4.5]);
}

const tolFor = (x: number) => (Number.isInteger(x) ? 0.001 : 0.011);

// ---------------------------------------------------------------------------
// Chapter 1 – one step
// ---------------------------------------------------------------------------

const oneStep: Generator = (rng, d, chapterId) => {
  const x = solution(rng, d);
  const kind = rng.int(0, 3);
  let eq: string, steps: string[];
  if (kind === 0) {
    const a = d === 1 ? rng.int(1, 20) : nz(rng, -20, 25);
    eq = `x${tc(a)} = ${num(x + a, 4)}`;
    steps = [`${eq}   ${op(a > 0 ? '−' : '+', Math.abs(a))}`, `x = ${num(x, 4)}`];
  } else if (kind === 1) {
    const a = d === 1 ? rng.int(1, Math.max(1, Math.min(20, x + 10))) : rng.int(1, 25);
    eq = `x − ${a} = ${num(x - a, 4)}`;
    steps = [`${eq}   ${op('+', a)}`, `x = ${num(x - a, 4)} + ${a} = ${num(x, 4)}`];
  } else if (kind === 2) {
    const a = d === 1 ? rng.int(2, 9) : d === 2 ? nz(rng, -9, 12) : rng.pick([4, -2, 6, 8, 0.5, -4]);
    if (a === 1 || a === -1) return oneStep(rng, d, chapterId);
    eq = `${tx(a)} = ${num(a * x, 4)}`;
    steps = [`${eq}   ${op(':', a)}`, `x = ${num(a * x, 4)} : ${a < 0 ? `(${num(a)})` : num(a)} = ${num(x, 4)}`];
  } else {
    const a = d === 1 ? rng.int(2, 6) : rng.int(2, 9);
    eq = `x : ${a} = ${num(x / a, 4)}`;
    if (!Number.isFinite(x / a) || Math.abs(x / a - Math.round((x / a) * 10000) / 10000) > 1e-9) return oneStep(rng, d, chapterId);
    steps = [`${eq}   ${op('·', a)}`, `x = ${num(x / a, 4)} · ${a} = ${num(x, 4)}`];
  }
  return numberEx(
    { gen: 'gl1.oneStep', chapterId, difficulty: d },
    {
      prompt: `Löse die Gleichung: ${eq}`,
      prefix: 'x =',
      answer: x,
      tolerance: tolFor(x),
      hint: 'Mach die Rechnung rückgängig – auf beiden Seiten das Gleiche tun.',
      solution: steps,
    },
  );
};

const inverseOp: Generator = (rng, d, chapterId) => {
  const a = rng.int(2, 12);
  const b = rng.int(5, 40);
  const kind = rng.int(0, 3);
  const [eq, correct] = (
    [
      [`x + ${a} = ${b}`, `auf beiden Seiten − ${a}`],
      [`x − ${a} = ${b}`, `auf beiden Seiten + ${a}`],
      [`${a}x = ${a * b}`, `beide Seiten : ${a}`],
      [`x : ${a} = ${b}`, `beide Seiten · ${a}`],
    ] as [string, string][]
  )[kind];
  const all = [`auf beiden Seiten − ${a}`, `auf beiden Seiten + ${a}`, `beide Seiten : ${a}`, `beide Seiten · ${a}`];
  return choiceEx(
    rng,
    { gen: 'gl1.inverse', chapterId, difficulty: d },
    {
      prompt: `Mit welchem Schritt bekommst du x allein? ${eq}`,
      hint: 'Die Umkehrung von + ist −, die Umkehrung von · ist :.',
      solution: [`Bei ${eq} hilft: ${correct}.`],
    },
    correct,
    all.filter((o) => o !== correct),
  );
};

// ---------------------------------------------------------------------------
// Chapter 2 – two steps
// ---------------------------------------------------------------------------

const twoStep: Generator = (rng, d, chapterId) => {
  const x = solution(rng, d);
  const a = d === 1 ? rng.int(2, 9) : d === 2 ? nz(rng, -9, 9) : rng.pick([3, 4, -3, -5, 6, 8, -2]);
  if (Math.abs(a) === 1) return twoStep(rng, d, chapterId);
  const b = d === 1 ? rng.int(1, 20) : nz(rng, -25, 25);
  const c = a * x + b;
  const eq = `${tx(a)}${tc(b)} = ${num(c, 4)}`;
  return numberEx(
    { gen: 'gl2.twoStep', chapterId, difficulty: d },
    {
      prompt: `Löse: ${eq}`,
      prefix: 'x =',
      answer: x,
      tolerance: tolFor(x),
      hint: `Zuerst die Zahl ${num(b)} wegbringen, dann durch ${num(a)} teilen.`,
      solution: [`${eq}   ${op(b > 0 ? '−' : '+', Math.abs(b))}`, `${tx(a)} = ${num(c - b, 4)}   ${op(':', a)}`, `x = ${num(x, 4)}`],
    },
  );
};

const fracStep: Generator = (rng, d, chapterId) => {
  const k = rng.int(2, 6);
  const q = d === 1 ? rng.int(1, 10) : nz(rng, -8, 12);
  const x = k * q;
  const b = d === 1 ? rng.int(1, 15) : nz(rng, -15, 15);
  const c = q + b;
  const eq = `x : ${k}${tc(b)} = ${num(c)}`;
  return numberEx(
    { gen: 'gl2.frac', chapterId, difficulty: d },
    {
      prompt: `Löse: ${eq}`,
      prefix: 'x =',
      answer: x,
      hint: `Zuerst ${num(b)} wegbringen, dann mit ${k} multiplizieren.`,
      solution: [`${eq}   ${op(b > 0 ? '−' : '+', Math.abs(b))}`, `x : ${k} = ${num(q)}   ${op('·', k)}`, `x = ${num(x)}`],
    },
  );
};

const check: Generator = (rng, d, chapterId) => {
  const x = solution(rng, Math.min(d, 2) as Difficulty);
  const a = rng.int(2, 7);
  const b = nz(rng, -12, 12);
  const c = a * x + b;
  const isSol = rng.chance(0.5);
  const test = isSol ? x : x + rng.pick([-2, -1, 1, 2]);
  return fixedChoiceEx(
    { gen: 'gl2.check', chapterId, difficulty: d },
    {
      prompt: `Ist x = ${num(test)} eine Lösung von ${tx(a)}${tc(b)} = ${num(c)}?`,
      hint: 'Setze die Zahl für x ein und rechne die linke Seite aus.',
      solution: [`Einsetzen: ${a} · ${test < 0 ? `(${num(test)})` : num(test)}${tc(b)} = ${num(a * test + b)}`, a * test + b === c ? `= ${num(c)} ✓ → Ja` : `≠ ${num(c)} → Nein`],
    },
    ['Ja', 'Nein'],
    isSol ? 0 : 1,
  );
};

// ---------------------------------------------------------------------------
// Chapter 3 – x on both sides, brackets
// ---------------------------------------------------------------------------

const bothSides: Generator = (rng, d, chapterId) => {
  const x = solution(rng, d);
  let a = rng.int(2, 9);
  let c = rng.int(1, 8);
  if (a === c) a++;
  if (d >= 2 && rng.chance(0.3)) c = -c;
  if (a < c) [a, c] = [c, a];
  const b = d === 1 ? rng.int(1, 20) : nz(rng, -20, 20);
  const e = (a - c) * x + b;
  const eq = `${tx(a)}${tc(b)} = ${tx(c)}${tc(e)}`;
  return numberEx(
    { gen: 'gl3.both', chapterId, difficulty: d },
    {
      prompt: `Löse: ${eq}`,
      prefix: 'x =',
      answer: x,
      tolerance: tolFor(x),
      hint: 'Bringe alle x auf eine Seite und alle Zahlen auf die andere.',
      solution: [
        `${eq}   | ${c > 0 ? '−' : '+'} ${tx(Math.abs(c))}`,
        `${tx(a - c)}${tc(b)} = ${num(e)}   ${op(b > 0 ? '−' : '+', Math.abs(b))}`,
        `${tx(a - c)} = ${num(e - b, 4)}   ${op(':', a - c)}`,
        `x = ${num(x, 4)}`,
      ],
    },
  );
};

const brackets: Generator = (rng, d, chapterId) => {
  const x = solution(rng, Math.max(2, d) as Difficulty);
  const a = rng.int(2, 6);
  const b = nz(rng, -9, 9);
  const withRight = d === 3 && rng.chance(0.6);
  const c = withRight ? rng.int(1, a - 1 || 1) : 0;
  if (withRight && c >= a) return brackets(rng, d, chapterId);
  const e = a * (x + b) - c * x;
  const left = `${a}(x${tc(b)})`;
  const right = withRight ? `${tx(c)}${tc(e)}` : num(e, 4);
  return numberEx(
    { gen: 'gl3.brackets', chapterId, difficulty: d },
    {
      prompt: `Löse: ${left} = ${right}`,
      prefix: 'x =',
      answer: x,
      tolerance: tolFor(x),
      hint: 'Löse zuerst die Klammer auf (ausmultiplizieren).',
      solution: [
        `Klammer auflösen: ${tx(a)}${tc(a * b)} = ${right}`,
        ...(withRight ? [`| − ${tx(c)}  →  ${tx(a - c)}${tc(a * b)} = ${num(e, 4)}`] : []),
        `${tx(a - c)} = ${num(e - a * b, 4)}`,
        `x = ${num(x, 4)}`,
      ],
    },
  );
};

// ---------------------------------------------------------------------------
// Chapter 4 – Textaufgaben
// ---------------------------------------------------------------------------

const text: Generator = (rng, d, chapterId) => {
  const b = { gen: 'gl4.text', chapterId, difficulty: d };
  const kind = rng.int(0, d === 1 ? 2 : d === 2 ? 3 : 4);
  if (kind === 0) {
    const x = rng.int(3, 25);
    const k = rng.int(2, 5);
    const add = rng.int(2, 30);
    const words = ['', '', 'verdoppelt', 'verdreifacht', 'vervierfacht', 'verfünffacht'][k];
    return numberEx(b, {
      context: `Zahlenrätsel: Wenn man eine Zahl ${words} und dann ${add} addiert, erhält man ${k * x + add}.`,
      prompt: 'Wie heisst die Zahl?',
      answer: x,
      hint: `Gleichung: ${k}x + ${add} = ${k * x + add}`,
      solution: [`${k}x + ${add} = ${k * x + add}`, `${k}x = ${k * x}`, `x = ${x}`],
    });
  }
  if (kind === 1) {
    const brother = rng.int(6, 15);
    const diff = rng.int(2, 6);
    const sum = 2 * brother + diff;
    return numberEx(b, {
      context: `Mandy ist ${diff} Jahre älter als ihr Bruder. Zusammen sind sie ${sum} Jahre alt.`,
      prompt: 'Wie alt ist der Bruder?',
      unit: 'Jahre',
      answer: brother,
      hint: 'Bruder = x, Mandy = x + ' + diff,
      solution: [`x + (x + ${diff}) = ${sum}`, `2x + ${diff} = ${sum}`, `2x = ${sum - diff}`, `x = ${brother}`],
    });
  }
  if (kind === 2) {
    const w = rng.int(2, 15);
    const more = rng.int(1, 8);
    const u = 2 * (w + w + more);
    return numberEx(b, {
      context: `Ein Rechteck ist ${more} cm länger als breit. Sein Umfang beträgt ${u} cm.`,
      prompt: 'Wie breit ist das Rechteck?',
      unit: 'cm',
      answer: w,
      hint: `Breite = x, Länge = x + ${more}. Umfang = 2 · (Länge + Breite).`,
      solution: [`2 · (x + x + ${more}) = ${u}`, `4x + ${2 * more} = ${u}`, `4x = ${u - 2 * more}`, `x = ${w}`],
    });
  }
  if (kind === 3) {
    const base = rng.pick([6, 6.5, 7, 8]);
    const perKm = rng.pick([3.2, 3.5, 3.8, 4]);
    const km = rng.int(3, 20);
    const total = Math.round((base + perKm * km) * 100) / 100;
    return numberEx(b, {
      context: `Ein Taxi kostet ${chf(base)} Grundtaxe plus ${chf(perKm)} pro Kilometer. Die Fahrt kostete ${chf(total)}.`,
      prompt: 'Wie viele Kilometer war die Fahrt lang?',
      unit: 'km',
      answer: km,
      hint: `${num(base)} + ${num(perKm)} · x = ${num(total)}`,
      solution: [`${num(base)} + ${num(perKm)}x = ${num(total)}`, `${num(perKm)}x = ${num(total - base)}`, `x = ${km}`],
    });
  }
  const fixA = rng.pick([15, 20, 25]);
  const fixB = fixA + rng.pick([10, 15, 20]);
  const perA = rng.pick([0.15, 0.2, 0.25]);
  const perB = rng.pick([0.05, 0.1].filter((p) => p < perA));
  const x = (fixB - fixA) / (perA - perB);
  return numberEx(b, {
    context: `Handyabo A kostet ${chf(fixA)} pro Monat plus ${chf(perA)} pro Gesprächsminute. Abo B kostet ${chf(fixB)} plus ${chf(perB)} pro Minute.`,
    prompt: 'Bei wie vielen Minuten kosten beide Abos gleich viel?',
    unit: 'min',
    answer: Math.round(x * 100) / 100,
    tolerance: 0.51,
    hint: 'Setze die beiden Preise gleich: A = B.',
    solution: [`${num(fixA)} + ${num(perA)}x = ${num(fixB)} + ${num(perB)}x`, `${num(perA - perB, 2)}x = ${num(fixB - fixA)}`, `x = ${num(x, 2)} Minuten`],
  });
};

const setup: Generator = (rng, d, chapterId) => {
  const k = rng.int(2, 5);
  const add = rng.int(2, 20);
  const res = rng.int(30, 80);
  const words = ['', '', 'Das Doppelte', 'Das Dreifache', 'Das Vierfache', 'Das Fünffache'][k];
  return choiceEx(
    rng,
    { gen: 'gl4.setup', chapterId, difficulty: d },
    {
      context: `${words} einer Zahl, vermindert um ${add}, ergibt ${res}.`,
      prompt: 'Welche Gleichung passt?',
      hint: '«vermindert um» heisst minus.',
      solution: [`${words} einer Zahl = ${k}x`, `vermindert um ${add} → − ${add}`, `${k}x − ${add} = ${res}`],
    },
    `${k}x − ${add} = ${res}`,
    [`${k}(x − ${add}) = ${res}`, `${k}x + ${add} = ${res}`, `x − ${k * add} = ${res}`],
  );
};

export const equationGenerators: Record<string, Generator> = {
  'gl1.oneStep': oneStep,
  'gl1.inverse': inverseOp,
  'gl2.twoStep': twoStep,
  'gl2.frac': fracStep,
  'gl2.check': check,
  'gl3.both': bothSides,
  'gl3.brackets': brackets,
  'gl4.text': text,
  'gl4.setup': setup,
};
