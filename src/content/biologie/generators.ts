// Aufgaben-Generatoren Biologie.
import { num } from '../../core/format';
import { uid } from '../../core/random';
import type { Difficulty, Generator, OrderExercise, Rng } from '../../core/types';
import { choiceEx, fixedChoiceEx, numberEx } from '../helpers';
import { ATEMWEG, BLUTWEG, FAKTEN, KLASSEN, KLASSEN_MERKMALE, MERKMALE, NAHRUNGSKETTEN, ORGANISATION, TIERE, VERDAUUNGSWEG, type Fakt } from './data';

function pickLevel<T>(rng: Rng, items: T[], level: (t: T) => Difficulty, d: Difficulty): T {
  const exact = items.filter((t) => level(t) === d);
  const easier = items.filter((t) => level(t) <= d);
  return rng.pick(exact.length && rng.chance(0.65) ? exact : easier.length ? easier : items);
}

const faktGen =
  (gen: string, bank: Fakt[]): Generator =>
  (rng, d, chapterId) => {
    const [q, right, wrong, why] = pickLevel(rng, bank, (x) => x[4], d);
    return choiceEx(rng, { gen, chapterId, difficulty: d }, { prompt: q, solution: [why] }, right, wrong);
  };

/** Sequence task: put the given items in order. */
function sequenceEx(rng: Rng, gen: string, chapterId: string, d: Difficulty, seq: string[], prompt: string, hint: string, why: string[]): OrderExercise {
  let tiles = rng.shuffle(seq);
  for (let i = 0; i < 10 && tiles.join('|') === seq.join('|'); i++) tiles = rng.shuffle(seq);
  return { gen, chapterId, difficulty: d, id: uid(gen), type: 'order', tiles, answers: [seq.join(' ')], sequence: seq, prompt, hint, solution: [seq.join(' → '), ...why] };
}

/** Takes n consecutive items from a sequence. */
const slice = (rng: Rng, seq: string[], n: number) => {
  const start = rng.int(0, seq.length - n);
  return seq.slice(start, start + n);
};

// ---------------------------------------------------------------------------
// Reihenfolgen
// ---------------------------------------------------------------------------

const verdauungsweg: Generator = (rng, d, chapterId) =>
  sequenceEx(rng, 'bio.verdauungsweg', chapterId, d, d === 1 ? slice(rng, VERDAUUNGSWEG, 4) : VERDAUUNGSWEG, 'Bringe die Stationen der Nahrung in die richtige Reihenfolge.', 'Die Nahrung beginnt oben und endet unten.', [
    'Mund: zerkleinern, Speichel · Magen: Säure, Eiweissverdauung · Dünndarm: Aufnahme der Nährstoffe · Dickdarm: Wasserentzug.',
  ]);

const atemweg: Generator = (rng, d, chapterId) =>
  sequenceEx(rng, 'bio.atemweg', chapterId, d, d === 1 ? slice(rng, ATEMWEG, 4) : ATEMWEG, 'Welchen Weg nimmt die eingeatmete Luft?', 'Von aussen nach innen – bis zum Gasaustausch.', ['In den Lungenbläschen geht Sauerstoff ins Blut.']);

const blutweg: Generator = (rng, d, chapterId) =>
  sequenceEx(rng, 'bio.blutweg', chapterId, d, d === 3 ? BLUTWEG : slice(rng, BLUTWEG, 4), 'Bringe den Weg des Blutes in die richtige Reihenfolge.', 'Sauerstoffarmes Blut kommt zuerst in die rechte Herzhälfte und von dort in die Lunge.', [
    'Rechte Herzhälfte → Lunge (Sauerstoff aufnehmen) → linke Herzhälfte → Körper.',
  ]);

const organisation: Generator = (rng, d, chapterId) =>
  sequenceEx(rng, 'bio.organisation', chapterId, d, d === 1 ? slice(rng, ORGANISATION, 3) : ORGANISATION, 'Ordne vom Kleinsten zum Grössten.', 'Viele gleiche Zellen bilden ein Gewebe …', ['Beispiel: Muskelzelle → Muskelgewebe → Herz → Kreislaufsystem → Mensch.']);

const kette: Generator = (rng, d, chapterId) => {
  const k = rng.pick(d === 1 ? NAHRUNGSKETTEN.filter((x) => x.length <= 3) : NAHRUNGSKETTEN);
  return sequenceEx(rng, 'bio.kette', chapterId, d, k, 'Bilde die Nahrungskette: Wer wird von wem gefressen?', 'Am Anfang steht immer eine Pflanze (Produzent).', ['Die Pfeile zeigen: «wird gefressen von».']);
};

const ROLLEN = ['Produzent', 'Konsument 1. Ordnung', 'Konsument 2. Ordnung', 'Konsument 3. Ordnung'];

const rolle: Generator = (rng, d, chapterId) => {
  const k = rng.pick(NAHRUNGSKETTEN);
  const i = rng.int(0, k.length - 1);
  return fixedChoiceEx(
    { gen: 'bio.rolle', chapterId, difficulty: d },
    {
      context: k.join(' → '),
      prompt: `Welche Rolle hat «${k[i]}» in dieser Nahrungskette?`,
      hint: 'Pflanzen = Produzenten. Wer Pflanzen frisst = Konsument 1. Ordnung, usw.',
      solution: k.map((x, j) => `${x}: ${ROLLEN[j]}`),
    },
    ROLLEN.slice(0, Math.max(k.length, 3)),
    i,
  );
};

const energie: Generator = (rng, d, chapterId) => {
  const k = rng.pick(NAHRUNGSKETTEN.filter((x) => x.length >= (d === 1 ? 2 : 3)));
  const e0 = rng.pick([10000, 20000, 50000, 100000]);
  const steps = d === 1 ? 1 : Math.min(k.length - 1, d === 2 ? 2 : 3);
  const result = e0 * 0.1 ** steps;
  return numberEx(
    { gen: 'bio.energie', chapterId, difficulty: d },
    {
      context: `${k.slice(0, steps + 1).join(' → ')}. Die Pflanzen (${k[0]}) enthalten ${num(e0)} kJ Energie.`,
      prompt: `Wie viel Energie kommt ungefähr bei «${k[steps]}» an, wenn pro Stufe nur 10 % weitergegeben werden?`,
      unit: 'kJ',
      answer: round2(result),
      tolerance: 0.011,
      hint: 'Pro Stufe: geteilt durch 10.',
      solution: [`${num(e0)} kJ${' · 0.1'.repeat(steps)} = ${num(result)} kJ`, 'Darum gibt es viel weniger Raubtiere als Pflanzenfresser.'],
    },
  );
};
const round2 = (n: number) => Math.round(n * 100) / 100;

// ---------------------------------------------------------------------------
// Rechnen: Mikroskop, Puls
// ---------------------------------------------------------------------------

const mikroskop: Generator = (rng, d, chapterId) => {
  const ok = rng.pick([5, 10, 15]);
  const obj = rng.pick([4, 10, 40, 100]);
  const total = ok * obj;
  const b = { gen: 'bio.mikroskop', chapterId, difficulty: d };
  if (d === 1) {
    return numberEx(b, {
      context: `Okular: ${ok}-fach, Objektiv: ${obj}-fach.`,
      prompt: 'Wie stark ist die Gesamtvergrösserung?',
      unit: '-fach',
      answer: total,
      hint: 'Okular mal Objektiv.',
      solution: [`${ok} · ${obj} = ${total}-fach`],
    });
  }
  if (d === 2) {
    return numberEx(b, {
      context: `Das Okular vergrössert ${ok}-fach. Insgesamt siehst du das Objekt ${total}-fach vergrössert.`,
      prompt: 'Wie stark vergrössert das Objektiv?',
      unit: '-fach',
      answer: obj,
      hint: 'Gesamtvergrösserung geteilt durch Okular.',
      solution: [`${total} : ${ok} = ${obj}-fach`],
    });
  }
  const real = rng.pick([10, 20, 25, 40, 50, 80, 100]);
  const mag = rng.pick([100, 200, 400, 1000].filter((m) => (real * m) % 1000 === 0 || m === 400));
  const bildMm = (real * mag) / 1000;
  return numberEx(b, {
    context: `Bei ${mag}-facher Vergrösserung erscheint eine Zelle ${num(bildMm)} mm gross.`,
    prompt: 'Wie gross ist die Zelle in Wirklichkeit (in Mikrometern)?',
    unit: 'µm',
    answer: real,
    tolerance: 0.011,
    hint: 'Bildgrösse durch Vergrösserung teilen, dann mm in µm umrechnen (· 1000).',
    solution: [`${num(bildMm)} mm : ${mag} = ${num(bildMm / mag, 4)} mm`, `${num(bildMm / mag, 4)} mm · 1000 = ${real} µm`],
  });
};

const puls: Generator = (rng, d, chapterId) => {
  const b = { gen: 'bio.puls', chapterId, difficulty: d };
  if (d === 1) {
    const s = rng.pick([15, 20, 30]);
    // Whole numbers of beats that give a whole number per minute.
    const beats = s === 30 ? rng.int(30, 45) : s === 20 ? rng.int(20, 30) : rng.int(15, 22);
    const perMin = (beats * 60) / s;
    return numberEx(b, {
      context: `Mandy zählt ihren Puls während ${s} Sekunden: ${beats} Schläge.`,
      prompt: 'Wie hoch ist ihr Puls pro Minute?',
      unit: 'Schläge/min',
      answer: perMin,
      hint: `Wie oft passen ${s} Sekunden in eine Minute?`,
      solution: [`60 : ${s} = ${60 / s}`, `${beats} · ${60 / s} = ${perMin} Schläge pro Minute`],
    });
  }
  if (d === 2) {
    const p = rng.int(60, 80);
    return numberEx(b, {
      context: `Ein Herz schlägt in Ruhe ${p}-mal pro Minute.`,
      prompt: 'Wie oft schlägt es in einer Stunde?',
      unit: 'Schläge',
      answer: p * 60,
      hint: '1 Stunde = 60 Minuten.',
      solution: [`${p} · 60 = ${num(p * 60)} Schläge`],
    });
  }
  const p = rng.pick([60, 65, 70, 75, 80]);
  const ml = rng.pick([60, 70, 80]);
  const liters = (p * ml) / 1000;
  return numberEx(b, {
    context: `Bei jedem Schlag pumpt das Herz ${ml} ml Blut. Es schlägt ${p}-mal pro Minute.`,
    prompt: 'Wie viele Liter Blut pumpt es pro Minute?',
    unit: 'Liter',
    answer: liters,
    tolerance: 0.011,
    hint: 'Schläge mal Milliliter, dann in Liter umrechnen (: 1000).',
    solution: [`${p} · ${ml} ml = ${num(p * ml)} ml = ${num(liters)} Liter`, 'Das ist ungefähr die ganze Blutmenge – in nur einer Minute!'],
  });
};

// ---------------------------------------------------------------------------
// Tiere
// ---------------------------------------------------------------------------

const klasse: Generator = (rng, d, chapterId) => {
  const [tier, kl, why] = pickLevel(rng, TIERE, (x) => x[3], d);
  return fixedChoiceEx(
    { gen: 'bio.klasse', chapterId, difficulty: d },
    { prompt: `Zu welcher Wirbeltierklasse gehört: ${tier}?`, hint: 'Atmung? Haut (Schuppen, Federn, Fell)? Wie kommen die Jungen zur Welt?', solution: [`${tier} → ${kl}`, why] },
    [...KLASSEN],
    KLASSEN.indexOf(kl),
  );
};

// ---------------------------------------------------------------------------
// Vererbung (Mendel)
// ---------------------------------------------------------------------------

const punnett: Generator = (rng, d, chapterId) => {
  const [wesen, L, dom, rez] = rng.pick(MERKMALE);
  const l = L.toLowerCase();
  const pairs: [string, string][] = d === 1 ? [['AA', 'aa'], ['Aa', 'Aa'], ['Aa', 'aa']] : [['Aa', 'Aa'], ['Aa', 'aa'], ['AA', 'Aa'], ['AA', 'aa'], ['aa', 'aa']];
  const [g1, g2] = rng.pick(pairs).map((g) => g.replace(/A/g, L).replace(/a/g, l)) as [string, string];
  const cell = (x: string, y: string) => [x, y].sort((p, q) => (p === L ? -1 : q === L ? 1 : 0)).join('');
  const kids = [cell(g1[0], g2[0]), cell(g1[0], g2[1]), cell(g1[1], g2[0]), cell(g1[1], g2[1])];
  const ask = rng.pick(['rez', 'dom', ...(d >= 2 ? ['misch'] : [])] as const);
  const count = kids.filter((k) => (ask === 'rez' ? k === l + l : ask === 'dom' ? k.includes(L) : k[0] !== k[1])).length;
  const showCells = d === 1;
  const askText = ask === 'rez' ? `${rez}` : ask === 'dom' ? `${dom}` : 'mischerbig';
  return numberEx(
    { gen: 'bio.punnett', chapterId, difficulty: d },
    {
      context: `${wesen}: «${dom}» (${L}) ist dominant, «${rez}» (${l}) ist rezessiv. Gekreuzt wird ${g1} × ${g2}.`,
      prompt: ask === 'misch' ? 'Wie viel Prozent der Nachkommen sind mischerbig?' : `Wie viel Prozent der Nachkommen sind ${askText}?`,
      visual:
        d <= 2
          ? {
              kind: 'table',
              rows: [
                [`${g1} × ${g2}`, g2[0], g2[1]],
                [g1[0], showCells ? kids[0] : '?', showCells ? kids[1] : '?'],
                [g1[1], showCells ? kids[2] : '?', showCells ? kids[3] : '?'],
              ],
            }
          : undefined,
      unit: '%',
      answer: (count / 4) * 100,
      hint: `Fülle das Kreuzungsschema aus. ${ask === 'rez' ? `«${rez}» zeigt sich nur bei ${l}${l}.` : ask === 'dom' ? `Sobald ein ${L} vorkommt, ist das Tier «${dom}».` : 'Mischerbig = zwei verschiedene Buchstaben.'}`,
      solution: [`Nachkommen: ${kids.join(', ')}`, `${count} von 4 → ${(count / 4) * 100} %`],
    },
  );
};

// ---------------------------------------------------------------------------

export const biologieGenerators: Record<string, Generator> = {
  ...Object.fromEntries(Object.entries(FAKTEN).map(([k, bank]) => [`bio.${k}.fakt`, faktGen(`bio.${k}.fakt`, bank)])),
  'bio.merkmale': faktGen('bio.merkmale', KLASSEN_MERKMALE),
  'bio.verdauungsweg': verdauungsweg,
  'bio.atemweg': atemweg,
  'bio.blutweg': blutweg,
  'bio.organisation': organisation,
  'bio.kette': kette,
  'bio.rolle': rolle,
  'bio.energie': energie,
  'bio.mikroskop': mikroskop,
  'bio.puls': puls,
  'bio.klasse': klasse,
  'bio.punnett': punnett,
};

