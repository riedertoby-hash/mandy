// Task generators for "Proportionalität & Dreisatz" (Lehrplan 21, Zyklus 3).
import { chf, num, round } from '../../core/format';
import type { Difficulty, Generator, Rng } from '../../core/types';
import { choiceEx, fixedChoiceEx, numberEx } from '../helpers';

const KINDS = ['proportional', 'umgekehrt proportional', 'weder noch'];

// ---------------------------------------------------------------------------
// Chapter 1 – Zusammenhänge erkennen
// ---------------------------------------------------------------------------

const STORY_BANK: [string, string, 0 | 1 | 2, string][] = [
  ['Anzahl Gipfeli', 'Preis', 0, 'Doppelt so viele Gipfeli kosten doppelt so viel.'],
  ['Anzahl Malerinnen', 'Arbeitszeit für eine Wand', 1, 'Doppelt so viele Personen brauchen halb so lange.'],
  ['Alter eines Kindes', 'Körpergrösse', 2, 'Mit 10 Jahren ist man nicht doppelt so gross wie mit 5.'],
  ['Geschwindigkeit', 'Fahrzeit für die gleiche Strecke', 1, 'Doppelt so schnell → halb so lange.'],
  ['Liter Benzin', 'Preis an der Tankstelle', 0, 'Jeder Liter kostet gleich viel.'],
  ['Seitenlänge eines Quadrats', 'Umfang', 0, 'Umfang = 4 · Seite – doppelte Seite, doppelter Umfang.'],
  ['Seitenlänge eines Quadrats', 'Fläche', 2, 'Doppelte Seite gibt die vierfache Fläche – nicht proportional.'],
  ['Anzahl Personen, die sich eine Pizza teilen', 'Grösse eines Stücks', 1, 'Doppelt so viele Personen → halb so grosse Stücke.'],
  ['Fahrzeit bei konstantem Tempo', 'zurückgelegter Weg', 0, 'In doppelter Zeit fährt man doppelt so weit.'],
  ['Uhrzeit', 'Temperatur draussen', 2, 'Die Temperatur folgt keiner festen Regel zur Uhrzeit.'],
  ['Anzahl Kinder, die sich CHF 120 teilen', 'Betrag pro Kind', 1, 'Mehr Kinder → weniger pro Kind; Produkt bleibt CHF 120.'],
  ['Anzahl Schulstunden', 'Länge der Pause', 2, 'Kein fester Zusammenhang.'],
  ['Gewicht von Äpfeln', 'Preis', 0, 'Der Kilopreis bleibt gleich.'],
  ['Anzahl Pumpen', 'Zeit, um ein Becken zu füllen', 1, 'Doppelt so viele Pumpen → halbe Zeit.'],
  ['Handytarif mit Grundgebühr: Minuten', 'Rechnungsbetrag', 2, 'Wegen der Grundgebühr kostet die doppelte Zeit nicht das Doppelte.'],
];

const story: Generator = (rng, d, chapterId) => {
  const [a, b, k, why] = rng.pick(STORY_BANK);
  return fixedChoiceEx(
    { gen: 'pr1.story', chapterId, difficulty: d },
    {
      context: `${a} → ${b}`,
      prompt: 'Wie hängen diese beiden Grössen zusammen?',
      hint: 'Was passiert mit der zweiten Grösse, wenn du die erste verdoppelst?',
      solution: [why, `→ ${KINDS[k]}`],
    },
    KINDS,
    k,
  );
};

function tableXs(rng: Rng, n: number, max: number): number[] {
  const set = new Set<number>();
  while (set.size < n) set.add(rng.int(1, max));
  return [...set].sort((x, y) => x - y);
}

const tableKind: Generator = (rng, d, chapterId) => {
  const k = rng.int(0, 2) as 0 | 1 | 2;
  const xs = k === 1 ? rng.shuffle([1, 2, 3, 4, 5, 6, 8, 10, 12]).slice(0, 4).sort((x, y) => x - y) : tableXs(rng, 4, 12);
  let ys: number[];
  let why: string;
  if (k === 0) {
    const f = d === 1 ? rng.int(2, 9) : rng.pick([1.5, 2.5, 0.5, 4, 12, 0.2]);
    ys = xs.map((x) => round(x * f, 2));
    why = `Alle Quotienten y : x sind gleich (${num(f)}). → proportional`;
  } else if (k === 1) {
    const c = rng.pick([120, 240, 360, 480]);
    ys = xs.map((x) => round(c / x, 2));
    why = `Alle Produkte x · y sind gleich (${c}). → umgekehrt proportional`;
  } else {
    const f = rng.int(2, 6);
    const c = rng.int(1, 9);
    ys = xs.map((x) => x * f + c);
    why = `Quotienten (${ys.slice(0, 2).map((y, i) => num(y / xs[i], 2)).join(', ')}, …) und Produkte sind nicht konstant. → weder noch`;
  }
  return fixedChoiceEx(
    { gen: 'pr1.table', chapterId, difficulty: d },
    {
      prompt: 'Was für eine Zuordnung zeigt die Tabelle?',
      visual: { kind: 'table', rows: [['x', ...xs.map((x) => num(x))], ['y', ...ys.map((y) => num(y))]] },
      hint: 'Prüfe y : x (gleich → proportional) und x · y (gleich → umgekehrt proportional).',
      solution: [why],
    },
    KINDS,
    k,
  );
};

const missing: Generator = (rng, d, chapterId) => {
  const inverse = d === 3 && rng.chance(0.5);
  const xs = inverse ? rng.shuffle([2, 3, 4, 5, 6, 8, 10, 12]).slice(0, 4).sort((a, b) => a - b) : tableXs(rng, 4, d === 1 ? 10 : 15);
  const f = inverse ? rng.pick([120, 240, 360]) : d === 1 ? rng.int(2, 9) : rng.pick([1.5, 2.5, 0.4, 3.2, 1.25, 7]);
  const ys = xs.map((x) => round(inverse ? f / x : x * f, 2));
  const hole = rng.int(1, 3);
  const row = ys.map((y, i) => (i === hole ? '?' : num(y)));
  return numberEx(
    { gen: 'pr1.missing', chapterId, difficulty: d },
    {
      context: inverse ? 'Diese Tabelle ist umgekehrt proportional.' : 'Diese Tabelle ist proportional.',
      prompt: 'Welche Zahl gehört an die Stelle des Fragezeichens?',
      visual: { kind: 'table', rows: [['x', ...xs.map((x) => num(x))], ['y', ...row]] },
      answer: ys[hole],
      tolerance: 0.011,
      hint: inverse ? 'Bei umgekehrter Proportionalität ist x · y immer gleich.' : 'Bei Proportionalität ist y : x immer gleich.',
      solution: inverse
        ? [`x · y = ${num(xs[0])} · ${num(ys[0])} = ${num(f)}`, `? = ${num(f)} : ${num(xs[hole])} = ${num(ys[hole])}`]
        : [`y : x = ${num(ys[0])} : ${num(xs[0])} = ${num(f)}`, `? = ${num(xs[hole])} · ${num(f)} = ${num(ys[hole])}`],
    },
  );
};

// ---------------------------------------------------------------------------
// Chapter 2 – Dreisatz (proportional)
// ---------------------------------------------------------------------------

const GOODS = [
  ['Schulhefte', 'Schulhefte'],
  ['Gipfeli', 'Gipfeli'],
  ['Kinotickets', 'Kinotickets'],
  ['Glaces', 'Glaces'],
  ['Bahnbillette', 'Bahnbillette'],
];

const price: Generator = (rng, d, chapterId) => {
  const [item] = rng.pick(GOODS);
  const unit = d === 1 ? rng.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]) : d === 2 ? rng.int(12, 60) * 0.05 : rng.int(25, 400) / 100;
  const n1 = rng.int(2, d === 1 ? 6 : 9);
  let n2 = rng.int(2, d === 1 ? 12 : 20);
  while (n2 === n1) n2 = rng.int(2, 20);
  const p1 = round(unit * n1, 2);
  const p2 = round((p1 / n1) * n2, 2);
  return numberEx(
    { gen: 'pr2.price', chapterId, difficulty: d },
    {
      context: `${n1} ${item} kosten ${chf(p1)}.`,
      prompt: `Wie viel kosten ${n2} ${item}?${d === 3 ? ' (auf Rappen runden)' : ''}`,
      prefix: 'CHF',
      answer: p2,
      tolerance: 0.011,
      hint: `Rechne zuerst den Preis für 1 Stück aus.`,
      solution: [`${n1} Stück ≙ ${chf(p1)}`, `1 Stück ≙ ${chf(p1)} : ${n1} = ${chf(p1 / n1)}`, `${n2} Stück ≙ ${chf(p1 / n1)} · ${n2} = ${chf(p2)}`],
    },
  );
};

const RECIPES = [
  ['Mehl', 'g'],
  ['Milch', 'ml'],
  ['Zucker', 'g'],
  ['Butter', 'g'],
  ['Teigwaren', 'g'],
];

const recipe: Generator = (rng, d, chapterId) => {
  const [what, unit] = rng.pick(RECIPES);
  const p1 = rng.pick(d === 1 ? [2, 4] : [3, 4, 5, 6]);
  let p2 = rng.pick([2, 3, 4, 5, 6, 8, 10, 12]);
  while (p2 === p1) p2 = rng.pick([2, 3, 6, 8, 10]);
  const perPerson = d === 1 ? 25 * rng.int(1, 8) : d === 2 ? 10 * rng.int(3, 30) : 5 * rng.int(5, 70) + 2.5;
  const q1 = perPerson * p1;
  const q2 = round(perPerson * p2, 1);
  return numberEx(
    { gen: 'pr2.recipe', chapterId, difficulty: d },
    {
      context: `Für ein Rezept für ${p1} Personen braucht man ${num(q1)} ${unit} ${what}.`,
      prompt: `Wie viel ${what} braucht es für ${p2} Personen?`,
      unit,
      answer: q2,
      tolerance: 0.051,
      hint: 'Wie viel braucht es für 1 Person?',
      solution: [`${p1} Personen ≙ ${num(q1)} ${unit}`, `1 Person ≙ ${num(q1)} : ${p1} = ${num(perPerson)} ${unit}`, `${p2} Personen ≙ ${num(perPerson)} · ${p2} = ${num(q2)} ${unit}`],
    },
  );
};

const distance: Generator = (rng, d, chapterId) => {
  const speed = d === 1 ? 10 * rng.int(4, 10) : 5 * rng.int(8, 20);
  if (d === 3) {
    const m1 = rng.pick([15, 20, 30, 40, 45]);
    const m2 = rng.pick([50, 75, 90, 100, 150].filter((m) => m !== m1));
    const km1 = round((speed * m1) / 60, 2);
    const km2 = round((speed * m2) / 60, 2);
    return numberEx(
      { gen: 'pr2.distance', chapterId, difficulty: d },
      {
        context: `Ein Zug fährt mit gleichbleibendem Tempo in ${m1} Minuten ${num(km1)} km.`,
        prompt: `Wie weit kommt er in ${m2} Minuten?`,
        unit: 'km',
        answer: km2,
        tolerance: 0.011,
        hint: 'Rechne den Weg für 1 Minute aus.',
        solution: [`${m1} min ≙ ${num(km1)} km`, `1 min ≙ ${num(km1)} : ${m1} = ${num(km1 / m1, 4)} km`, `${m2} min ≙ ${num(km2)} km`],
      },
    );
  }
  const h1 = rng.int(2, 5);
  let h2 = rng.int(2, 8);
  while (h2 === h1) h2 = rng.int(2, 8);
  return numberEx(
    { gen: 'pr2.distance', chapterId, difficulty: d },
    {
      context: `Ein Car fährt mit gleichbleibendem Tempo in ${h1} Stunden ${speed * h1} km.`,
      prompt: `Wie weit kommt er in ${h2} Stunden?`,
      unit: 'km',
      answer: speed * h2,
      hint: 'Wie weit fährt er in 1 Stunde?',
      solution: [`${h1} h ≙ ${speed * h1} km`, `1 h ≙ ${speed} km`, `${h2} h ≙ ${speed * h2} km`],
    },
  );
};

const exchange: Generator = (rng, d, chapterId) => {
  const rate = rng.pick([0.92, 0.94, 0.95, 1.05, 1.07]);
  const chf1 = d === 1 ? 100 : 10 * rng.int(3, 30);
  const eur1 = round(chf1 / rate, 2);
  const chf2 = d === 1 ? 50 * rng.int(1, 8) : rng.pick([45, 75, 120, 250, 380, 15]);
  const eur2 = round((eur1 / chf1) * chf2, 2);
  return numberEx(
    { gen: 'pr2.exchange', chapterId, difficulty: d },
    {
      context: `Vor den Ferien in Italien: Für ${chf(chf1)} bekommst du EUR ${num(eur1, 2)}.`,
      prompt: `Wie viele Euro bekommst du für ${chf(chf2)}?`,
      prefix: 'EUR',
      answer: eur2,
      tolerance: 0.021,
      hint: 'Wie viele Euro gibt es für CHF 1?',
      solution: [`CHF ${num(chf1)} ≙ EUR ${num(eur1, 2)}`, `CHF 1 ≙ EUR ${num(eur1 / chf1, 4)}`, `CHF ${num(chf2)} ≙ EUR ${num(eur2, 2)}`],
    },
  );
};

// ---------------------------------------------------------------------------
// Chapter 3 – Umgekehrt proportional
// ---------------------------------------------------------------------------

const PRODUCTS: Record<Difficulty, number[]> = { 1: [12, 24, 36, 48, 60], 2: [72, 90, 120, 144, 180], 3: [100, 150, 210, 250, 84] };
const divisorsOf = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((i) => n % i === 0 && i > 1 && i < n);

function inversePair(rng: Rng, d: Difficulty) {
  const total = rng.pick(PRODUCTS[d]);
  const divs = divisorsOf(total).filter((x) => x <= 20);
  const a1 = rng.pick(divs);
  let a2 = d === 3 ? rng.int(2, 15) : rng.pick(divs);
  while (a2 === a1) a2 = d === 3 ? rng.int(2, 15) : rng.pick(divs);
  return { total, a1, b1: total / a1, a2, b2: round(total / a2, 1) };
}

const workers: Generator = (rng, d, chapterId) => {
  const { total, a1, b1, a2, b2 } = inversePair(rng, d);
  const job = rng.pick(['einen Garten umzugraben', 'eine Turnhalle zu streichen', 'Plakate für das Schulfest zu verteilen', 'die Zuschauertribüne aufzubauen']);
  const exact = Number.isInteger(total / a2);
  return numberEx(
    { gen: 'pr3.workers', chapterId, difficulty: d },
    {
      context: `${a1} Personen brauchen ${b1} Stunden, um ${job}. Alle arbeiten gleich schnell.`,
      prompt: `Wie lange brauchen ${a2} Personen?${exact ? '' : ' (auf eine Dezimalstelle runden)'}`,
      unit: 'h',
      answer: b2,
      tolerance: exact ? 0.001 : 0.051,
      hint: 'Mehr Personen → weniger Zeit. Wie lange bräuchte 1 Person allein?',
      solution: [`${a1} Personen ≙ ${b1} h`, `1 Person ≙ ${b1} · ${a1} = ${total} h`, `${a2} Personen ≙ ${total} : ${a2} = ${num(total / a2, 2)} h`],
    },
  );
};

const travel: Generator = (rng, d, chapterId) => {
  const v1 = rng.pick([40, 60, 80, 90, 100, 120]);
  const t1 = rng.pick(d === 1 ? [2, 3, 4, 6] : [1.5, 2, 2.5, 3, 4]);
  let v2 = rng.pick([40, 50, 60, 80, 90, 100, 120]);
  while (v2 === v1) v2 = rng.pick([50, 60, 80, 100, 120]);
  const dist = v1 * t1;
  const t2h = dist / v2;
  const inMinutes = d >= 2;
  const ans = inMinutes ? Math.round(t2h * 60) : round(t2h, 2);
  return numberEx(
    { gen: 'pr3.travel', chapterId, difficulty: d },
    {
      context: `Mit ${v1} km/h dauert eine Fahrt ${num(t1)} Stunden.`,
      prompt: `Wie lange dauert die gleiche Fahrt mit ${v2} km/h?${inMinutes ? ' Antworte in Minuten.' : ''}`,
      unit: inMinutes ? 'min' : 'h',
      answer: ans,
      tolerance: inMinutes ? 0.51 : 0.011,
      hint: 'Schneller → kürzer. Wie lange würde es mit 1 km/h dauern?',
      solution: [
        `${v1} km/h ≙ ${num(t1)} h`,
        `1 km/h ≙ ${num(t1)} · ${v1} = ${num(dist)} h`,
        `${v2} km/h ≙ ${num(dist)} : ${v2} = ${num(t2h, 3)} h`,
        ...(inMinutes ? [`${num(t2h, 3)} h · 60 = ${num(t2h * 60, 1)} min`] : []),
      ],
    },
  );
};

const food: Generator = (rng, d, chapterId) => {
  const { total, a1, b1, a2, b2 } = inversePair(rng, d);
  const [animals, stuff] = rng.pick([
    ['Kühe', 'Das Heu'],
    ['Pferde', 'Der Hafer'],
    ['Schafe', 'Das Futter'],
    ['Lagerteilnehmende', 'Der Vorrat an Teigwaren'],
  ]);
  const exact = Number.isInteger(total / a2);
  return numberEx(
    { gen: 'pr3.food', chapterId, difficulty: d },
    {
      context: `${stuff} reicht für ${a1} ${animals} genau ${b1} Tage.`,
      prompt: `Wie viele Tage reicht es für ${a2} ${animals}?${exact ? '' : ' (auf eine Dezimalstelle runden)'}`,
      unit: 'Tage',
      answer: b2,
      tolerance: exact ? 0.001 : 0.051,
      hint: 'Mehr Tiere → weniger Tage. Für wie viele Tage würde es für 1 Tier reichen?',
      solution: [`${a1} ≙ ${b1} Tage`, `1 ≙ ${b1} · ${a1} = ${total} Tage`, `${a2} ≙ ${total} : ${a2} = ${num(total / a2, 2)} Tage`],
    },
  );
};

const share: Generator = (rng, d, chapterId) => {
  const pot = d === 1 ? rng.pick([120, 240, 360, 600]) : rng.pick([180, 420, 540, 720, 840, 1260]);
  const opts = divisorsOf(pot).filter((x) => x >= 2 && x <= 12);
  const n1 = rng.pick(opts);
  let n2 = rng.pick(opts);
  while (n2 === n1) n2 = rng.pick(opts);
  return numberEx(
    { gen: 'pr3.share', chapterId, difficulty: d },
    {
      context: `Ein Gewinn wird gleichmässig verteilt. Bei ${n1} Personen erhält jede ${chf(pot / n1)}.`,
      prompt: `Wie viel erhält jede Person, wenn es ${n2} Personen sind?`,
      prefix: 'CHF',
      answer: pot / n2,
      tolerance: 0.011,
      hint: 'Wie gross ist der ganze Gewinn?',
      solution: [`Ganzer Gewinn: ${n1} · ${chf(pot / n1)} = ${chf(pot)}`, `Pro Person: ${chf(pot)} : ${n2} = ${chf(pot / n2)}`],
    },
  );
};

// ---------------------------------------------------------------------------
// Chapter 4 – Massstab & gemischt
// ---------------------------------------------------------------------------

const scale: Generator = (rng, d, chapterId) => {
  const b = { gen: 'pr4.scale', chapterId, difficulty: d };
  if (d === 1) {
    const s = rng.pick([100000, 50000, 200000]);
    const cm = rng.int(2, 15);
    const km = (cm * s) / 100000;
    return numberEx(b, {
      context: `Auf einer Landeskarte im Massstab 1 : ${num(s)} sind zwei Dörfer ${cm} cm voneinander entfernt.`,
      prompt: 'Wie weit sind sie in Wirklichkeit auseinander (Luftlinie)?',
      unit: 'km',
      answer: km,
      tolerance: 0.011,
      hint: `1 cm auf der Karte sind ${num(s)} cm in Wirklichkeit. 100'000 cm = 1 km.`,
      solution: [`${cm} cm · ${num(s)} = ${num(cm * s)} cm`, `${num(cm * s)} cm = ${num(km)} km`],
    });
  }
  if (d === 2) {
    const s = rng.pick([25000, 50000, 10000]);
    const cm = rng.int(3, 24) / 2;
    const km = round((cm * s) / 100000, 3);
    return numberEx(b, {
      context: `Auf einer Wanderkarte 1 : ${num(s)} misst Mandy für den Weg zur SAC-Hütte ${num(cm)} cm.`,
      prompt: 'Wie lang ist der Weg in Wirklichkeit?',
      unit: 'km',
      answer: km,
      tolerance: 0.006,
      hint: 'Erst mit dem Massstab multiplizieren, dann von cm in km umrechnen (: 100\'000).',
      solution: [`${num(cm)} cm · ${num(s)} = ${num(cm * s)} cm`, `${num(cm * s)} cm = ${num(km, 3)} km`],
    });
  }
  if (rng.chance(0.5)) {
    const s = rng.pick([25000, 50000]);
    const km = rng.int(2, 20) / 2;
    const cm = round((km * 100000) / s, 2);
    return numberEx(b, {
      context: `Zwei Orte liegen ${num(km)} km auseinander.`,
      prompt: `Wie viele Zentimeter sind das auf einer Karte im Massstab 1 : ${num(s)}?`,
      unit: 'cm',
      answer: cm,
      tolerance: 0.011,
      hint: 'Wirkliche Strecke in cm umrechnen, dann durch den Massstab teilen.',
      solution: [`${num(km)} km = ${num(km * 100000)} cm`, `${num(km * 100000)} cm : ${num(s)} = ${num(cm)} cm`],
    });
  }
  const real = rng.int(30, 120) / 10;
  const mapCm = rng.pick([3, 4, 6, 8]);
  const s = round((real * 100) / mapCm, 4);
  const sRounded = Math.round(s);
  const realM = (mapCm * sRounded) / 100;
  return numberEx(b, {
    context: `Auf einem Wohnungsplan ist ein Zimmer ${mapCm} cm lang. In Wirklichkeit ist es ${num(realM)} m lang.`,
    prompt: 'Welcher Massstab ist das? Gib die Zahl x in 1 : x an.',
    answer: sRounded,
    tolerance: 0.001,
    hint: 'Wirkliche Länge in cm durch Planlänge in cm.',
    solution: [`${num(realM)} m = ${num(realM * 100)} cm`, `${num(realM * 100)} : ${mapCm} = ${num(sRounded)}`, `Massstab 1 : ${num(sRounded)}`],
  });
};

const MIXED_GENS: Generator[] = [price, recipe, workers, travel, food, share];

const mixed: Generator = (rng, d, chapterId) => {
  const ex = rng.pick(MIXED_GENS)(rng, d, chapterId);
  return { ...ex, gen: 'pr4.mixed', hint: 'Überlege zuerst: Je mehr …, desto mehr – oder desto weniger?' };
};

const double: Generator = (rng, d, chapterId) => {
  const rate = rng.int(2, 12) * 5;
  const m1 = rng.int(2, 5);
  const h1 = rng.int(2, 6);
  let m2 = rng.int(2, 8);
  while (m2 === m1) m2 = rng.int(2, 8);
  const h2 = rng.int(2, 9);
  const p1 = rate * m1 * h1;
  const p2 = rate * m2 * h2;
  return numberEx(
    { gen: 'pr4.double', chapterId, difficulty: d },
    {
      context: `${m1} gleiche Maschinen produzieren in ${h1} Stunden ${num(p1)} Teile.`,
      prompt: `Wie viele Teile produzieren ${m2} Maschinen in ${h2} Stunden?`,
      answer: p2,
      hint: 'Rechne aus, wie viele Teile 1 Maschine in 1 Stunde schafft.',
      solution: [
        `1 Maschine in ${h1} h: ${num(p1)} : ${m1} = ${num(p1 / m1)}`,
        `1 Maschine in 1 h: ${num(p1 / m1)} : ${h1} = ${rate}`,
        `${m2} Maschinen in ${h2} h: ${rate} · ${m2} · ${h2} = ${num(p2)}`,
      ],
    },
  );
};

// Multiple choice: which way of solving fits? (keeps the "erst überlegen" habit)
const method: Generator = (rng, d, chapterId) => {
  const bank: [string, 0 | 1][] = [
    ['3 kg Äpfel kosten CHF 9. Wie viel kosten 5 kg?', 0],
    ['4 Lastwagen brauchen 6 Fahrten. Wie viele Fahrten brauchen 3 Lastwagen?', 1],
    ['In 2 Stunden laufen 300 Liter ins Becken. Wie viele Liter in 5 Stunden?', 0],
    ['Mit 5 Leuten dauert das Aufräumen 30 Minuten. Wie lange mit 3 Leuten?', 1],
    ['8 Hefte kosten CHF 12. Wie viel kosten 3 Hefte?', 0],
    ['Ein Vorrat reicht 6 Personen 10 Tage. Wie lange reicht er 4 Personen?', 1],
  ];
  const [q, k] = rng.pick(bank);
  return choiceEx(
    rng,
    { gen: 'pr4.method', chapterId, difficulty: d },
    {
      context: q,
      prompt: 'Wie rechnest du vom «1-Schritt» zur gesuchten Menge?',
      hint: 'Je mehr …, desto mehr → proportional. Je mehr …, desto weniger → umgekehrt.',
      solution: [k === 0 ? 'Je mehr, desto mehr → proportional: erst teilen, dann multiplizieren.' : 'Je mehr, desto weniger → umgekehrt proportional: erst multiplizieren, dann teilen.'],
    },
    k === 0 ? 'zuerst teilen, dann multiplizieren' : 'zuerst multiplizieren, dann teilen',
    [k === 0 ? 'zuerst multiplizieren, dann teilen' : 'zuerst teilen, dann multiplizieren', 'nur addieren', 'geht nicht mit Dreisatz'],
  );
};

export const proportionalGenerators: Record<string, Generator> = {
  'pr1.story': story,
  'pr1.table': tableKind,
  'pr1.missing': missing,
  'pr2.price': price,
  'pr2.recipe': recipe,
  'pr2.distance': distance,
  'pr2.exchange': exchange,
  'pr3.workers': workers,
  'pr3.travel': travel,
  'pr3.food': food,
  'pr3.share': share,
  'pr4.scale': scale,
  'pr4.mixed': mixed,
  'pr4.double': double,
  'pr4.method': method,
};
