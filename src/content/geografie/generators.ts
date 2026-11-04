// Aufgaben-Generatoren Geografie.
import { num } from '../../core/format';
import { uid } from '../../core/random';
import type { Difficulty, Generator, Rng, TextExercise } from '../../core/types';
import { choiceEx, fixedChoiceEx, numberEx, type Base } from '../helpers';
import {
  CH_FAKTEN,
  FALLEN,
  KANTONE,
  KARTEN_FAKTEN,
  KLIMA,
  KLIMA_FAKTEN,
  KLIMAZONEN,
  KONTINENTE,
  LAENDER,
  MONATE,
  NACHBARN,
  RICHTUNGEN,
  WELT_FAKTEN,
  ZEITZONEN,
} from './data';

const textEx = (b: Base, f: Omit<TextExercise, 'id' | 'type' | keyof Base>): TextExercise => ({ ...b, ...f, type: 'text', id: uid(b.gen) });

function pickLevel<T>(rng: Rng, items: T[], level: (t: T) => Difficulty, d: Difficulty): T {
  const exact = items.filter((t) => level(t) === d);
  const easier = items.filter((t) => level(t) <= d);
  return rng.pick(exact.length && rng.chance(0.65) ? exact : easier.length ? easier : items);
}

/** Multiple choice from a fact bank [question, right, wrong[], why, level]. */
const factGen =
  (gen: string, bank: [string, string, string[], string, Difficulty][]): Generator =>
  (rng, d, chapterId) => {
    const [q, right, wrong, why] = pickLevel(rng, bank, (x) => x[4], d);
    return choiceEx(rng, { gen, chapterId, difficulty: d }, { prompt: q, solution: [why] }, right, wrong);
  };

// ---------------------------------------------------------------------------
// Schweiz
// ---------------------------------------------------------------------------

const hauptortWahl: Generator = (rng, d, chapterId) => {
  const k = pickLevel(rng, KANTONE, (x) => x[5], d);
  const others = rng.shuffle(KANTONE.filter((x) => x[2] !== k[2])).slice(0, 3).map((x) => x[2]);
  return choiceEx(
    rng,
    { gen: 'geo.hauptortWahl', chapterId, difficulty: d },
    { prompt: `Wie heisst der Hauptort des Kantons ${k[0]} (${k[1]})?`, solution: [`${k[0]} (${k[1]}) → ${k[2]}`] },
    k[2],
    others,
  );
};

const hauptortTipp: Generator = (rng, d, chapterId) => {
  const k = pickLevel(rng, KANTONE, (x) => x[5], d);
  return textEx(
    { gen: 'geo.hauptortTipp', chapterId, difficulty: d },
    {
      prompt: `Schreibe den Hauptort des Kantons ${k[0]} (${k[1]}).`,
      answers: [k[2], ...k[3]],
      hint: `Er beginnt mit «${k[2].slice(0, 2)}…».`,
      solution: [`${k[0]} (${k[1]}) → ${k[2]}${k[3].length ? ` (auch: ${k[3].join(', ')})` : ''}`],
    },
  );
};

const kuerzel: Generator = (rng, d, chapterId) => {
  const k = pickLevel(rng, KANTONE, (x) => x[5], d);
  const others = rng.shuffle(KANTONE.filter((x) => x[0] !== k[0])).slice(0, 3).map((x) => x[0]);
  return choiceEx(
    rng,
    { gen: 'geo.kuerzel', chapterId, difficulty: d },
    { prompt: `Welcher Kanton hat das Autokennzeichen «${k[1]}»?`, solution: [`${k[1]} = ${k[0]}`] },
    k[0],
    others,
  );
};

const sprachregion: Generator = (rng, d, chapterId) => {
  const k = pickLevel(rng, KANTONE, (x) => x[5], d);
  const opts = ['Deutsch', 'Französisch', 'Italienisch', 'mehrsprachig'];
  return fixedChoiceEx(
    { gen: 'geo.sprache', chapterId, difficulty: d },
    {
      prompt: `Welche Amtssprache(n) hat der Kanton ${k[0]}?`,
      hint: 'Mehrsprachig sind Bern, Freiburg, Wallis (Deutsch/Französisch) und Graubünden (Deutsch/Rätoromanisch/Italienisch).',
      solution: [`${k[0]}: ${k[4]}`],
    },
    opts,
    opts.indexOf(k[4]),
  );
};

// ---------------------------------------------------------------------------
// Europa & Welt
// ---------------------------------------------------------------------------

const europa = LAENDER.filter((l) => l[3] === 'Europa');
const welt = LAENDER.filter((l) => l[3] !== 'Europa');

const hauptstadtWahl =
  (gen: string, pool: typeof LAENDER): Generator =>
  (rng, d, chapterId) => {
    const l = pickLevel(rng, pool, (x) => x[4], d);
    const trap = FALLEN[l[0]];
    const others = rng.shuffle(pool.filter((x) => x[1] !== l[1])).map((x) => x[1]);
    const wrong = trap ? [trap, ...others.slice(0, 2)] : others.slice(0, 3);
    return choiceEx(
      rng,
      { gen, chapterId, difficulty: d },
      {
        prompt: `Wie heisst die Hauptstadt von ${l[0]}?`,
        solution: [`${l[0]} → ${l[1]}`, ...(trap ? [`Falle: ${trap} ist grösser, aber nicht die Hauptstadt.`] : [])],
      },
      l[1],
      wrong,
    );
  };

const hauptstadtTipp =
  (gen: string, pool: typeof LAENDER): Generator =>
  (rng, d, chapterId) => {
    const l = pickLevel(rng, pool, (x) => x[4], d);
    return textEx(
      { gen, chapterId, difficulty: d },
      {
        prompt: `Schreibe die Hauptstadt von ${l[0]}.`,
        answers: [l[1], ...l[2]],
        hint: `Sie beginnt mit «${l[1].slice(0, 2)}…».`,
        solution: [`${l[0]} → ${l[1]}`],
      },
    );
  };

const landZuStadt =
  (gen: string, pool: typeof LAENDER): Generator =>
  (rng, d, chapterId) => {
    const l = pickLevel(rng, pool.filter((x) => x[0] !== x[1]), (x) => x[4], d);
    const others = rng.shuffle(pool.filter((x) => x[0] !== l[0])).slice(0, 3).map((x) => x[0]);
    return choiceEx(
      rng,
      { gen, chapterId, difficulty: d },
      { prompt: `${l[1]} ist die Hauptstadt von …`, solution: [`${l[1]} → ${l[0]}`] },
      l[0],
      others,
    );
  };

// Transcontinental or often disputed assignments are left out of the continent question.
const UNKLAR = new Set(['Russland', 'Türkei', 'Kuba', 'Mexiko']);

const kontinent: Generator = (rng, d, chapterId) => {
  const l = pickLevel(rng, LAENDER.filter((x) => !UNKLAR.has(x[0])), (x) => x[4], d);
  return choiceEx(
    rng,
    { gen: 'geo.kontinent', chapterId, difficulty: d },
    { prompt: `Auf welchem Kontinent liegt ${l[0]}?`, solution: [`${l[0]} liegt in ${l[3]}.`] },
    l[3],
    rng.shuffle(KONTINENTE.filter((k) => k !== l[3] && k !== 'Antarktis')).slice(0, 3),
  );
};

const nachbar: Generator = (rng, d, chapterId) => {
  const land = rng.pick(Object.keys(NACHBARN));
  const nb = NACHBARN[land];
  const fremd = rng.pick(europa.map((e) => e[0]).filter((e) => e !== land && !nb.includes(e)));
  const asks = rng.shuffle(nb).slice(0, 3);
  return choiceEx(
    rng,
    { gen: 'geo.nachbar', chapterId, difficulty: d },
    { prompt: `Welches Land grenzt NICHT an ${land}?`, solution: [`Nachbarn von ${land}: ${nb.join(', ')}.`, `${fremd} ist kein Nachbarland.`] },
    fremd,
    asks,
  );
};

// ---------------------------------------------------------------------------
// Klima
// ---------------------------------------------------------------------------

const idxMax = (a: number[]) => a.indexOf(Math.max(...a));
const idxMin = (a: number[]) => a.indexOf(Math.min(...a));

/** Places where the asked month is unique (no ties). */
function climateWithUnique(rng: Rng, pick: (k: (typeof KLIMA)[number]) => number[], extreme: 'max' | 'min') {
  const ok = KLIMA.filter((k) => {
    const a = pick(k);
    const v = extreme === 'max' ? Math.max(...a) : Math.min(...a);
    return a.filter((x) => x === v).length === 1;
  });
  return rng.pick(ok);
}

const klimaMonat: Generator = (rng, d, chapterId) => {
  const ask = rng.pick(['wärmste', 'kälteste', 'nasseste'] as const);
  const k = climateWithUnique(rng, (x) => (ask === 'nasseste' ? x[2] : x[1]), ask === 'kälteste' ? 'min' : 'max');
  const [place, temp, precip] = k;
  const i = ask === 'wärmste' ? idxMax(temp) : ask === 'kälteste' ? idxMin(temp) : idxMax(precip);
  const wrong = rng.shuffle(MONATE.filter((_, j) => j !== i)).slice(0, 3);
  return choiceEx(
    rng,
    { gen: 'geo.klimaMonat', chapterId, difficulty: d },
    {
      prompt: `Welcher Monat ist in ${place} der ${ask}?`,
      visual: { kind: 'climate', place, temp, precip },
      hint: ask === 'nasseste' ? 'Suche den höchsten Balken.' : `Suche den ${ask === 'wärmste' ? 'höchsten' : 'tiefsten'} Punkt der roten Linie.`,
      solution: [ask === 'nasseste' ? `Höchster Balken: ${MONATE[i]} (${precip[i]} mm)` : `${ask === 'wärmste' ? 'Höchster' : 'Tiefster'} Punkt: ${MONATE[i]} (${temp[i]} °C)`],
    },
    MONATE[i],
    wrong,
  );
};

const klimaZahl: Generator = (rng, d, chapterId) => {
  const [place, temp, precip] = rng.pick(KLIMA);
  const kind = d === 1 ? 'monat' : d === 2 ? rng.pick(['amplitude', 'monat'] as const) : rng.pick(['amplitude', 'summe'] as const);
  const b = { gen: 'geo.klimaZahl', chapterId, difficulty: d };
  const visual = { kind: 'climate' as const, place, temp, precip };
  if (kind === 'monat') {
    const m = rng.int(0, 11);
    return numberEx(b, {
      prompt: `Wie warm ist es in ${place} im ${MONATE[m]} im Durchschnitt?`,
      visual,
      unit: '°C',
      answer: temp[m],
      tolerance: 1.01,
      hint: 'Lies den Punkt der roten Linie über dem Monat ab (linke Skala).',
      solution: [`${MONATE[m]}: ca. ${temp[m]} °C (± 1 °C wird akzeptiert)`],
    });
  }
  if (kind === 'amplitude') {
    const hi = Math.max(...temp);
    const lo = Math.min(...temp);
    return numberEx(b, {
      prompt: `Wie gross ist in ${place} der Unterschied zwischen wärmstem und kältestem Monat?`,
      visual,
      unit: '°C',
      answer: hi - lo,
      tolerance: 2.01,
      hint: 'Höchster minus tiefster Punkt der Temperaturlinie.',
      solution: [`${hi} °C − (${lo} °C) = ${hi - lo} °C`, 'Diesen Unterschied nennt man Jahresschwankung (Temperaturamplitude). Ist er klein, ist das Klima ausgeglichen.'],
    });
  }
  const sum = precip.reduce((a, x) => a + x, 0);
  return numberEx(b, {
    context: `Monatswerte (mm): ${precip.join(', ')}`,
    prompt: `Wie viel Niederschlag fällt in ${place} pro Jahr? (auf 50 mm genau)`,
    visual,
    unit: 'mm',
    answer: sum,
    tolerance: 50.01,
    hint: 'Zähle alle 12 Monatswerte zusammen.',
    solution: [`${precip.join(' + ')} = ${num(sum)} mm`],
  });
};

const klimaZone: Generator = (rng, d, chapterId) => {
  const [place, temp, precip, zone] = rng.pick(KLIMA);
  const why: Record<string, string> = {
    Tropen: 'Das ganze Jahr warm (über 18 °C), kaum Jahreszeiten.',
    Subtropen: 'Heisse Sommer, milde Winter – oft trocken (Wüste oder Mittelmeerklima).',
    'Gemässigte Zone': 'Deutliche Jahreszeiten mit warmen Sommern und kühlen bis kalten Wintern.',
    'Kalte Zone': 'Lange, kalte Winter und kurze, kühle Sommer (unter 10 °C).',
  };
  return fixedChoiceEx(
    { gen: 'geo.klimaZone', chapterId, difficulty: d },
    {
      prompt: `In welcher Klimazone liegt ${place}?`,
      visual: { kind: 'climate', place, temp, precip },
      hint: 'Wie warm ist es im kältesten und im wärmsten Monat? Wie stark schwankt es?',
      solution: [why[zone]],
    },
    KLIMAZONEN,
    KLIMAZONEN.indexOf(zone),
  );
};

const halbkugel: Generator = (rng, d, chapterId) => {
  const [place, temp, precip, , south] = rng.pick(KLIMA.filter((k) => k[3] !== 'Tropen'));
  return fixedChoiceEx(
    { gen: 'geo.halbkugel', chapterId, difficulty: d },
    {
      prompt: `Liegt ${place.replace(/ \(.+\)/, '')} auf der Nord- oder Südhalbkugel?`,
      visual: { kind: 'climate', place: place.replace(/ \(.+\)/, ''), temp, precip },
      hint: 'Wann ist es am wärmsten? Im Juli → Norden, im Januar → Süden.',
      solution: [south ? 'Am wärmsten im Dezember–Februar → Sommer im Januar → Südhalbkugel.' : 'Am wärmsten im Juli/August → Nordhalbkugel.'],
    },
    ['Nordhalbkugel', 'Südhalbkugel'],
    south ? 1 : 0,
  );
};

// ---------------------------------------------------------------------------
// Karten & Orientierung
// ---------------------------------------------------------------------------

const richtung: Generator = (rng, d, chapterId) => {
  const i = rng.int(0, 7);
  const steps = d === 1 ? 4 : rng.pick([2, 6, 4, 3, 5]);
  const dir = rng.chance(0.5) ? 1 : -1;
  if (steps === 4) {
    const opp = RICHTUNGEN[(i + 4) % 8];
    return choiceEx(
      rng,
      { gen: 'geo.richtung', chapterId, difficulty: d },
      { prompt: `Was ist die Gegenrichtung von ${RICHTUNGEN[i]}?`, solution: [`${RICHTUNGEN[i]} ↔ ${opp}`] },
      opp,
      rng.shuffle(RICHTUNGEN.filter((r) => r !== opp && r !== RICHTUNGEN[i])).slice(0, 3),
    );
  }
  const deg = steps * 45;
  const target = RICHTUNGEN[(((i + dir * steps) % 8) + 8) % 8];
  return choiceEx(
    rng,
    { gen: 'geo.richtung', chapterId, difficulty: d },
    {
      prompt: `Du schaust nach ${RICHTUNGEN[i]} und drehst dich um ${deg}° ${dir === 1 ? 'nach rechts (im Uhrzeigersinn)' : 'nach links (gegen den Uhrzeigersinn)'}. Wohin schaust du jetzt?`,
      hint: 'Zwischen zwei benachbarten Richtungen (z. B. Norden → Nordosten) liegen 45°.',
      solution: [`${deg}° = ${steps} × 45° → ${steps} Schritte ${dir === 1 ? 'im' : 'gegen den'} Uhrzeigersinn`, `→ ${target}`],
    },
    target,
    rng.shuffle(RICHTUNGEN.filter((r) => r !== target)).slice(0, 3),
  );
};

const zeitzone: Generator = (rng, d, chapterId) => {
  const [a, ua] = d === 1 ? ZEITZONEN[0] : rng.pick(ZEITZONEN);
  let [bCity, ub] = rng.pick(ZEITZONEN);
  while (bCity === a) [bCity, ub] = rng.pick(ZEITZONEN);
  const h = rng.int(0, 23);
  const res = (((h + ub - ua) % 24) + 24) % 24;
  return numberEx(
    { gen: 'geo.zeitzone', chapterId, difficulty: d },
    {
      context: `Zeitverschiebung (Winterzeit): ${a} UTC${ua >= 0 ? '+' : '−'}${Math.abs(ua)}, ${bCity} UTC${ub >= 0 ? '+' : '−'}${Math.abs(ub)}.`,
      prompt: `In ${a} ist es ${h} Uhr. Wie viel Uhr ist es gleichzeitig in ${bCity}? (0–23)`,
      unit: 'Uhr',
      answer: res,
      hint: 'Rechne den Unterschied der UTC-Werte aus. Nach Osten wird es später, nach Westen früher.',
      solution: [`Unterschied: (${ub}) − (${ua}) = ${ub - ua} Stunden`, `${h} Uhr ${ub - ua >= 0 ? '+' : '−'} ${Math.abs(ub - ua)} h = ${res} Uhr${h + ub - ua < 0 ? ' (am Vortag)' : h + ub - ua >= 24 ? ' (am nächsten Tag)' : ''}`],
    },
  );
};

const massstab: Generator = (rng, d, chapterId) => {
  const s = d === 1 ? rng.pick([25000, 50000, 100000]) : rng.pick([25000, 50000, 200000]);
  const cm = d === 1 ? rng.int(1, 8) * 2 : rng.int(3, 25) / 2;
  const km = (cm * s) / 100000;
  return numberEx(
    { gen: 'geo.massstab', chapterId, difficulty: d },
    {
      context: `Auf der Landeskarte 1 : ${num(s)} misst du zwischen zwei Orten ${num(cm)} cm (Luftlinie).`,
      prompt: 'Wie weit sind die Orte in Wirklichkeit voneinander entfernt?',
      unit: 'km',
      answer: km,
      tolerance: 0.011,
      hint: `1 cm auf der Karte = ${num(s)} cm = ${num(s / 100000)} km`,
      solution: [`${num(cm)} cm · ${num(s)} = ${num(cm * s)} cm = ${num(km)} km`],
    },
  );
};

// ---------------------------------------------------------------------------

export const geografieGenerators: Record<string, Generator> = {
  'geo.hauptortWahl': hauptortWahl,
  'geo.hauptortTipp': hauptortTipp,
  'geo.kuerzel': kuerzel,
  'geo.sprache': sprachregion,
  'geo.chFakten': factGen('geo.chFakten', CH_FAKTEN),
  'geo.euWahl': hauptstadtWahl('geo.euWahl', europa),
  'geo.euTipp': hauptstadtTipp('geo.euTipp', europa),
  'geo.euLand': landZuStadt('geo.euLand', europa),
  'geo.nachbar': nachbar,
  'geo.weltWahl': hauptstadtWahl('geo.weltWahl', welt),
  'geo.weltTipp': hauptstadtTipp('geo.weltTipp', welt),
  'geo.kontinent': kontinent,
  'geo.weltFakten': factGen('geo.weltFakten', WELT_FAKTEN),
  'geo.klimaMonat': klimaMonat,
  'geo.klimaZahl': klimaZahl,
  'geo.klimaZone': klimaZone,
  'geo.halbkugel': halbkugel,
  'geo.klimaFakten': factGen('geo.klimaFakten', KLIMA_FAKTEN),
  'geo.richtung': richtung,
  'geo.zeitzone': zeitzone,
  'geo.massstab': massstab,
  'geo.kartenFakten': factGen('geo.kartenFakten', KARTEN_FAKTEN),
};
