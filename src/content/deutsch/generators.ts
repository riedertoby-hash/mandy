// Aufgaben-Generatoren Deutsch (Sek 1–3, Schweizer Schulgrammatik).
import { uid } from '../../core/random';
import type { Difficulty, Generator, OrderExercise, Rng, TextExercise } from '../../core/types';
import { choiceEx, fixedChoiceEx, numberEx, type Base } from '../helpers';
import {
  ARTIKEL_BANK,
  AUX,
  DAS_DASS,
  FAELLE,
  FALL_BANK,
  FRAGEN,
  GROSS_KLEIN,
  GVERBEN,
  KOMMA_BANK,
  KONJUNKTIV_BANK,
  PARTIKELN,
  PERSONEN,
  SATZGLIED_BANK,
  SATZGLIEDER,
  UMSTELL_BANK,
  VERWECHSLUNG,
  WERDEN,
  WORTART_BANK,
  WORTARTEN,
  ZEITFORMEN,
  type GVerb,
  type PersonIndex,
  type Zeitform,
} from './bank';

const textEx = (b: Base, f: Omit<TextExercise, 'id' | 'type' | keyof Base>): TextExercise => ({ ...b, ...f, type: 'text', id: uid(b.gen) });

/** Picks an item of the bank: mostly from the current level, otherwise from easier levels. */
function pickLevel<T>(rng: Rng, items: T[], level: (t: T) => Difficulty, d: Difficulty): T {
  const exact = items.filter((t) => level(t) === d);
  const easier = items.filter((t) => level(t) <= d);
  return rng.pick(exact.length && rng.chance(0.65) ? exact : easier.length ? easier : items);
}

/** Marks a word group in a sentence with «…» (both parts for split verbs like «hat … vorgelesen»). */
function mark(sentence: string, part: string): string {
  if (part.includes('…')) {
    return part
      .split('…')
      .map((p) => p.trim())
      .reduce((s, p) => s.replace(new RegExp(`(^|[^\\p{L}])${p}(?=[^\\p{L}]|$)`, 'u'), `$1«${p}»`), sentence);
  }
  return sentence.replace(new RegExp(`(^|[^\\p{L}])${part}(?=[^\\p{L}]|$)`, 'u'), `$1«${part}»`);
}

const fill = (sentence: string, word: string) => {
  const s = sentence.replace('___', word);
  return s[0].toUpperCase() + s.slice(1);
};

// ---------------------------------------------------------------------------
// Rechtschreibung
// ---------------------------------------------------------------------------

const dasDass: Generator = (rng, d, chapterId) => {
  const [s, answer, why] = pickLevel(rng, DAS_DASS, (x) => x[3], d);
  return fixedChoiceEx(
    { gen: 'de.dasDass', chapterId, difficulty: d },
    {
      context: s,
      prompt: 'das oder dass?',
      hint: 'Kannst du «dieses» oder «welches» einsetzen? Dann «das». Sonst «dass».',
      solution: [why, fill(s, answer)],
    },
    ['das', 'dass'],
    answer === 'das' ? 0 : 1,
  );
};

const grossKlein: Generator = (rng, d, chapterId) => {
  const [s, klein, gross, right, why] = pickLevel(rng, GROSS_KLEIN, (x) => x[5], d);
  return fixedChoiceEx(
    { gen: 'de.grossKlein', chapterId, difficulty: d },
    {
      context: s,
      prompt: 'Klein oder gross?',
      hint: 'Steht ein Begleiter davor (der, das, beim, am, etwas, nichts, viel, alles …)? Dann gross.',
      solution: [why, fill(s, right === 'gross' ? gross : klein)],
    },
    [klein, gross],
    right === 'klein' ? 0 : 1,
  );
};

const verwechslung: Generator = (rng, d, chapterId) => {
  const [s, right, wrong, why] = pickLevel(rng, VERWECHSLUNG, (x) => x[4], d);
  return choiceEx(
    rng,
    { gen: 'de.verwechslung', chapterId, difficulty: d },
    { context: s, prompt: 'Welches Wort ist richtig?', solution: [why, fill(s, right)] },
    right,
    [wrong],
  );
};

// ---------------------------------------------------------------------------
// Grammatik
// ---------------------------------------------------------------------------

const wortart: Generator = (rng, d, chapterId) => {
  const [s, word, art, sub] = pickLevel(rng, WORTART_BANK, (x) => x[4], d);
  if (sub && d === 3 && rng.chance(0.6)) {
    return fixedChoiceEx(
      { gen: 'de.wortart', chapterId, difficulty: d },
      {
        context: mark(s, word),
        prompt: `«${word}» ist eine Partikel. Welche Art?`,
        hint: 'Präposition: vor einem Nomen (mit, unter, trotz). Konjunktion: verbindet (und, weil, als). Adverb: wann/wo/wie (morgen, hier, leider).',
        solution: [`«${word}» ist ${sub === 'Adverb' ? 'ein' : 'eine'} ${sub}.`],
      },
      [...PARTIKELN],
      PARTIKELN.indexOf(sub),
    );
  }
  const why: Record<string, string> = {
    Nomen: 'Nomen schreibt man gross und man kann einen Artikel davorsetzen.',
    Verb: 'Verben lassen sich konjugieren (ich …, du …, er …).',
    Adjektiv: 'Adjektive lassen sich steigern (gross – grösser – am grössten).',
    Pronomen: 'Pronomen (auch Artikel) begleiten oder ersetzen ein Nomen.',
    Partikel: 'Partikeln sind unveränderlich: Präpositionen, Konjunktionen, Adverbien, Interjektionen.',
  };
  return fixedChoiceEx(
    { gen: 'de.wortart', chapterId, difficulty: d },
    {
      context: mark(s, word),
      prompt: `Welche Wortart ist «${word}»?`,
      hint: 'Veränderbar? Konjugieren → Verb. Steigern → Adjektiv. Artikel davor → Nomen. Gar nicht veränderbar → Partikel.',
      solution: [`«${word}» → ${art}${sub ? ` (${sub})` : ''}`, why[art]],
    },
    [...WORTARTEN],
    WORTARTEN.indexOf(art),
  );
};

const fall: Generator = (rng, d, chapterId) => {
  const [s, part, f] = pickLevel(rng, FALL_BANK, (x) => x[3], d);
  return fixedChoiceEx(
    { gen: 'de.fall', chapterId, difficulty: d },
    {
      context: mark(s, part),
      prompt: `In welchem Fall steht «${part}»?`,
      hint: 'Frage: Wer oder was? (Nominativ) – Wessen? (Genitiv) – Wem? (Dativ) – Wen oder was? (Akkusativ)',
      solution: [`Frage: ${FRAGEN[f]} → ${part}`, `→ ${f}`],
    },
    [...FAELLE],
    FAELLE.indexOf(f),
  );
};

const artikel: Generator = (rng, d, chapterId) => {
  const [before, after, answer, f, why] = pickLevel(rng, ARTIKEL_BANK, (x) => x[5], d);
  return textEx(
    { gen: 'de.artikel', chapterId, difficulty: d },
    {
      prompt: 'Setze den richtigen Artikel ein.',
      before,
      after,
      answers: [answer],
      hint: 'Frag nach dem Fall: Wer? Wessen? Wem? Wen?',
      solution: [why, `${before} ${answer} ${after}`, `→ ${f}`],
    },
  );
};

const satzglied: Generator = (rng, d, chapterId) => {
  const [s, part, art] = pickLevel(rng, SATZGLIED_BANK, (x) => x[3], d);
  const why: Record<string, string> = {
    Subjekt: 'Frage «Wer oder was?» → Subjekt (steht im Nominativ).',
    'Prädikat (Verb)': 'Das Verb (Personalform + weitere Verbteile) bildet das Prädikat.',
    Akkusativobjekt: 'Frage «Wen oder was?» → Akkusativobjekt.',
    Dativobjekt: 'Frage «Wem?» → Dativobjekt.',
    Adverbiale: 'Frage «Wann? Wo? Wie? Warum?» → Adverbiale (Umstandsbestimmung).',
  };
  return fixedChoiceEx(
    { gen: 'de.satzglied', chapterId, difficulty: d },
    {
      context: mark(s, part),
      prompt: `Welches Satzglied ist «${part}»?`,
      hint: 'Stelle die passende Frage: Wer? Wen? Wem? Wann/Wo/Wie?',
      solution: [why[art]],
    },
    [...SATZGLIEDER],
    SATZGLIEDER.indexOf(art),
  );
};

const umstell: Generator = (rng, d, chapterId) => {
  const item = rng.pick(UMSTELL_BANK);
  let tiles = rng.shuffle(item.tiles);
  for (let i = 0; i < 10 && item.answers.some((a) => a.toLowerCase() === tiles.join(' ').toLowerCase()); i++) tiles = rng.shuffle(item.tiles);
  const ex: OrderExercise = {
    gen: 'de.umstell',
    chapterId,
    difficulty: d,
    id: uid('de.umstell'),
    type: 'order',
    tiles,
    answers: item.answers,
    prompt: 'Bilde einen richtigen Satz. Das Verb steht an 2. Stelle.',
    hint: 'Jedes Kärtchen ist ein Satzglied. Das Verb muss an zweiter Stelle stehen.',
    solution: ['Richtig sind zum Beispiel:', ...item.answers.map((a) => `${a}.`), 'Umstellprobe: Satzglieder lassen sich verschieben, das Verb bleibt an 2. Stelle.'],
  };
  return ex;
};

// ---------------------------------------------------------------------------
// Verben
// ---------------------------------------------------------------------------

function satz(v: GVerb, p: PersonIndex, t: Zeitform): { full: string; verbPart: string } {
  const subj = PERSONEN[p];
  const aux = AUX[v.aux];
  switch (t) {
    case 'Präsens':
      return { full: `${subj} ${v.praes[p]} ${v.obj}.`, verbPart: v.praes[p] };
    case 'Präteritum':
      return { full: `${subj} ${v.praet[p]} ${v.obj}.`, verbPart: v.praet[p] };
    case 'Perfekt':
      return { full: `${subj} ${aux.praes[p]} ${v.obj} ${v.part}.`, verbPart: `${aux.praes[p]} ${v.obj} ${v.part}` };
    case 'Plusquamperfekt':
      return { full: `${subj} ${aux.praet[p]} ${v.obj} ${v.part}.`, verbPart: `${aux.praet[p]} ${v.obj} ${v.part}` };
    case 'Futur I':
      return { full: `${subj} ${WERDEN[p]} ${v.obj} ${v.inf}.`, verbPart: `${WERDEN[p]} ${v.obj} ${v.inf}` };
  }
}

const ZEIT_REGEL: Record<Zeitform, string> = {
  Präsens: 'Präsens: Verb in der Gegenwartsform (ich gehe).',
  Präteritum: 'Präteritum: einfache Vergangenheitsform (ich ging).',
  Perfekt: 'Perfekt: haben/sein im Präsens + Partizip II (ich bin gegangen).',
  Plusquamperfekt: 'Plusquamperfekt: haben/sein im Präteritum + Partizip II (ich war gegangen).',
  'Futur I': 'Futur I: werden + Infinitiv (ich werde gehen).',
};

const zeitBestimmen: Generator = (rng, d, chapterId) => {
  const v = rng.pick(GVERBEN);
  const p = rng.int(0, 5) as PersonIndex;
  const pool: Zeitform[] = d === 1 ? ['Präsens', 'Präteritum', 'Perfekt', 'Futur I'] : [...ZEITFORMEN];
  const t = rng.pick(pool);
  const { full } = satz(v, p, t);
  return fixedChoiceEx(
    { gen: 'de.zeitBestimmen', chapterId, difficulty: d },
    {
      context: full,
      prompt: 'In welcher Zeitform steht der Satz?',
      hint: 'Schau auf die Verbteile: Hilfsverb (haben/sein/werden) + Partizip oder Infinitiv?',
      solution: [ZEIT_REGEL[t]],
    },
    [...ZEITFORMEN],
    ZEITFORMEN.indexOf(t),
  );
};

const zeitBilden: Generator = (rng, d, chapterId) => {
  const v = rng.pick(GVERBEN);
  const p = rng.int(0, 5) as PersonIndex;
  const target: Zeitform = d === 1 ? 'Präteritum' : d === 2 ? rng.pick(['Präteritum', 'Perfekt'] as Zeitform[]) : rng.pick(['Perfekt', 'Plusquamperfekt', 'Futur I'] as Zeitform[]);
  const ausgang = satz(v, p, 'Präsens').full;
  const ziel = satz(v, p, target);
  const subj = PERSONEN[p];
  const simple = target === 'Präteritum';
  return textEx(
    { gen: 'de.zeitBilden', chapterId, difficulty: d },
    {
      context: `«${ausgang}»`,
      prompt: `Setze den Satz ins ${target}.`,
      before: subj,
      after: simple ? `${v.obj}.` : '.',
      answers: [ziel.verbPart],
      hint: ZEIT_REGEL[target],
      solution: [ZEIT_REGEL[target], `→ ${ziel.full}`],
    },
  );
};

const partizip: Generator = (rng, d, chapterId) => {
  const v = rng.pick(GVERBEN);
  return textEx(
    { gen: 'de.partizip', chapterId, difficulty: d },
    {
      prompt: `Wie heisst das Partizip II von «${v.inf}»?`,
      answers: [v.part],
      hint: 'Meist mit ge-: ge…t (gespielt) oder ge…en (gegangen).',
      solution: [`${v.inf} → ${v.part} (Perfekt: ich ${AUX[v.aux].praes[0]} … ${v.part})`],
    },
  );
};

const hilfsverb: Generator = (rng, d, chapterId) => {
  const v = rng.pick(GVERBEN);
  const p = rng.int(0, 5) as PersonIndex;
  const rightForm = AUX[v.aux].praes[p];
  const wrongForm = AUX[v.aux === 'haben' ? 'sein' : 'haben'].praes[p];
  return choiceEx(
    rng,
    { gen: 'de.hilfsverb', chapterId, difficulty: d },
    {
      context: `${PERSONEN[p]} ___ ${v.obj} ${v.part}.`,
      prompt: 'haben oder sein?',
      hint: 'Bewegung von A nach B oder Zustandsänderung → meist «sein» (gehen, fahren, laufen). Sonst «haben».',
      solution: [`${v.inf} bildet das Perfekt mit «${v.aux}».`, `${PERSONEN[p]} ${rightForm} ${v.obj} ${v.part}.`],
    },
    rightForm,
    [wrongForm],
  );
};

const konjunktiv: Generator = (rng, d, chapterId) => {
  const [direkt, anfang, rest, right, wrong, why] = pickLevel(rng, KONJUNKTIV_BANK, (x) => x[6], d);
  return choiceEx(
    rng,
    { gen: 'de.konjunktiv', chapterId, difficulty: d },
    {
      context: direkt,
      prompt: `Indirekte Rede: ${anfang} ___ ${rest}`,
      hint: 'In der indirekten Rede steht der Konjunktiv I (er sei, sie habe). Ist er gleich wie der Indikativ, nimmt man den Konjunktiv II.',
      solution: [why, `${anfang} ${right} ${rest}`],
    },
    right,
    wrong,
  );
};

// ---------------------------------------------------------------------------
// Kommasetzung
// ---------------------------------------------------------------------------

const stripCommas = (s: string) => s.replace(/,/g, '');

/** Wrong variant: one comma moved to a word boundary where none belongs. */
function movedComma(rng: Rng, s: string): string | null {
  const words = s.split(' ');
  const commaAt = words.map((w, i) => (w.endsWith(',') ? i : -1)).filter((i) => i >= 0);
  if (!commaAt.length) return null;
  const from = rng.pick(commaAt);
  const free = words.map((_, i) => i).filter((i) => i < words.length - 1 && !commaAt.includes(i) && Math.abs(i - from) <= 3);
  if (!free.length) return null;
  const to = rng.pick(free);
  const out = words.map((w, i) => (i === from ? w.slice(0, -1) : i === to ? `${w},` : w));
  return out.join(' ');
}

const kommaWahl =
  (gen: string, chapter: 1 | 2): Generator =>
  (rng, d, chapterId) => {
    const [s, rule] = pickLevel(rng, KOMMA_BANK.filter((k) => k[3] === chapter), (x) => x[2], d);
    const wrong = new Set<string>();
    wrong.add(stripCommas(s));
    for (let i = 0; i < 8 && wrong.size < 3; i++) {
      const m = movedComma(rng, s);
      if (m && m !== s) wrong.add(m);
    }
    if (wrong.size < 3) {
      // add a superfluous comma before «und» or after the first word
      const extra = s.includes(' und ') ? s.replace(' und ', ', und ') : s.replace(' ', ', ');
      if (extra !== s) wrong.add(extra);
    }
    return choiceEx(
      rng,
      { gen, chapterId, difficulty: d },
      { prompt: 'Welcher Satz ist richtig geschrieben?', hint: 'Nebensätze, Relativsätze und Infinitivgruppen mit um/ohne/statt … zu werden mit Komma abgetrennt.', solution: [rule, s] },
      s,
      [...wrong].slice(0, 3),
    );
  };

const kommaZahl =
  (gen: string, chapter: 1 | 2): Generator =>
  (rng, d, chapterId) => {
    const [s, rule] = pickLevel(rng, KOMMA_BANK.filter((k) => k[3] === chapter), (x) => x[2], d);
    const n = (s.match(/,/g) ?? []).length;
    return numberEx(
      { gen, chapterId, difficulty: d },
      {
        context: stripCommas(s),
        prompt: 'Wie viele Kommas fehlen in diesem Satz?',
        answer: n,
        hint: 'Suche Nebensätze (weil, dass, wenn, der/die/das …) und Aufzählungen.',
        solution: [`${n} ${n === 1 ? 'Komma' : 'Kommas'}: ${s}`, rule],
      },
    );
  };

// ---------------------------------------------------------------------------

export const deutschGenerators: Record<string, Generator> = {
  'de.dasDass': dasDass,
  'de.grossKlein': grossKlein,
  'de.verwechslung': verwechslung,
  'de.wortart': wortart,
  'de.fall': fall,
  'de.artikel': artikel,
  'de.satzglied': satzglied,
  'de.umstell': umstell,
  'de.zeitBestimmen': zeitBestimmen,
  'de.zeitBilden': zeitBilden,
  'de.partizip': partizip,
  'de.hilfsverb': hilfsverb,
  'de.konjunktiv': konjunktiv,
  'de.komma1': kommaWahl('de.komma1', 1),
  'de.kommaZahl1': kommaZahl('de.kommaZahl1', 1),
  'de.komma2': kommaWahl('de.komma2', 2),
  'de.kommaZahl2': kommaZahl('de.kommaZahl2', 2),
};
