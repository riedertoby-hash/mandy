// Task generators for English (Lehrplan 21, Sek: A2–B1, British English).
import { uid } from '../../core/random';
import type { Difficulty, Generator, OrderExercise, Rng, TextExercise } from '../../core/types';
import { choiceEx, fixedChoiceEx, type Base } from '../helpers';
import { DURATIVE, FOR, IRREGULAR, SINCE, SUBJECTS, THEMES, VERBS, type Person, type Subject, type Verb, type Word } from './lexicon';

const textEx = (b: Base, f: Omit<TextExercise, 'id' | 'type' | keyof Base>): TextExercise => ({ ...b, ...f, type: 'text', id: uid(b.gen) });

/** Word-order task: shuffles the words of `sentence` (until the order differs). */
function orderEx(rng: Rng, b: Base, f: Omit<OrderExercise, 'id' | 'type' | keyof Base | 'tiles' | 'answers'>, sentence: string): OrderExercise {
  const words = sentence.split(' ');
  let tiles = rng.shuffle(words);
  for (let i = 0; i < 10 && tiles.join(' ') === sentence; i++) tiles = rng.shuffle(words);
  return { ...b, ...f, type: 'order', id: uid(b.gen), tiles, answers: [sentence] };
}

/** British forms like "learnt" – the American "learned" is accepted too. */
const withVariants = (a: string) => (/\blearnt\b/.test(a) ? [a, a.replace(/\blearnt\b/, 'learned')] : [a]);
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** Lower-case the first word unless it is "I" or a name. */
const low = (s: string) => (/^(I|Mandy|Tom)\b/.test(s) ? s : s[0].toLowerCase() + s.slice(1));

// ---------------------------------------------------------------------------
// Conjugation helpers
// ---------------------------------------------------------------------------

const be = (p: Person) => (p === '1s' ? 'am' : p === '3s' ? 'is' : 'are');
const beNeg = (p: Person) => (p === '1s' ? 'am not' : p === '3s' ? "isn't" : "aren't");
const have = (p: Person) => (p === '3s' ? 'has' : 'have');
const doAux = (p: Person) => (p === '3s' ? 'does' : 'do');

type Tense = 'simple' | 'progressive' | 'past' | 'perfect' | 'will' | 'goingto';

interface Clause {
  subj: Subject;
  verb: Verb;
  obj: string;
}

function clause(rng: Rng, verbs: Verb[] = VERBS): Clause {
  const verb = rng.pick(verbs);
  return { subj: rng.pick(SUBJECTS), verb, obj: rng.pick(verb.objects) };
}

/** Verb phrase for a tense (affirmative or negative). */
function phrase(c: Clause, t: Tense, neg = false): string {
  const p = c.subj.person;
  const vb = c.verb;
  switch (t) {
    case 'simple':
      return neg ? `${p === '3s' ? "doesn't" : "don't"} ${vb.base}` : p === '3s' ? vb.s : vb.base;
    case 'progressive':
      return `${neg ? beNeg(p) : be(p)} ${vb.ing}`;
    case 'past':
      return neg ? `didn't ${vb.base}` : vb.past;
    case 'perfect':
      return `${have(p)}${neg ? "n't" : ''} ${vb.pp}`;
    case 'will':
      return neg ? `won't ${vb.base}` : `will ${vb.base}`;
    case 'goingto':
      return `${neg ? beNeg(p) : be(p)} going to ${vb.base}`;
  }
}

/** Question with the same parts, e.g. "Does Mandy play football every day?" (without "?"). */
function question(c: Clause, t: Tense, signal: string): string {
  const p = c.subj.person;
  const s = low(c.subj.text);
  const tail = `${c.obj}${signal ? ' ' + signal : ''}`;
  switch (t) {
    case 'simple':
      return `${cap(doAux(p))} ${s} ${c.verb.base} ${tail}`;
    case 'progressive':
      return `${cap(be(p))} ${s} ${c.verb.ing} ${tail}`;
    case 'past':
      return `Did ${s} ${c.verb.base} ${tail}`;
    case 'perfect':
      return `${cap(have(p))} ${s} ${signal === 'ever' ? 'ever ' : ''}${c.verb.pp} ${signal === 'ever' ? c.obj : tail}`;
    case 'will':
      return `Will ${s} ${c.verb.base} ${tail}`;
    case 'goingto':
      return `${cap(be(p))} ${s} going to ${c.verb.base} ${tail}`;
  }
}

const SIGNALS: Record<Tense, string[]> = {
  simple: ['every day', 'every morning', 'on Saturdays', 'twice a week', 'every summer'],
  progressive: ['right now', 'at the moment'],
  past: ['yesterday', 'last week', 'two days ago', 'last summer', 'in 2020'],
  perfect: ['just', 'already', 'never'],
  will: ['tomorrow', 'next year', 'one day'],
  goingto: ['next weekend', 'tomorrow evening'],
};

const TENSE_NAME: Record<Tense, string> = {
  simple: 'Simple Present',
  progressive: 'Present Progressive',
  past: 'Simple Past',
  perfect: 'Present Perfect',
  will: 'will-Future',
  goingto: 'going to-Future',
};

const RULE: Record<Tense, string> = {
  simple: 'Simple Present: Grundform, bei he/she/it mit -s. Verneinung: don’t / doesn’t + Grundform.',
  progressive: 'Present Progressive: am/is/are + -ing – für das, was gerade jetzt passiert.',
  past: 'Simple Past: -ed oder unregelmässige Form. Verneinung: didn’t + Grundform.',
  perfect: 'Present Perfect: have/has + 3. Form (past participle).',
  will: 'will-Future: will + Grundform.',
  goingto: 'going to: am/is/are going to + Grundform.',
};

/** Gap-fill: "Mandy ___ football every day. (play)" */
function gap(rng: Rng, b: Base, t: Tense, neg: boolean, verbs?: Verb[]): TextExercise {
  const c = clause(rng, verbs);
  const signal = rng.pick(SIGNALS[t]);
  const vp = phrase(c, t, neg);
  let before = c.subj.text;
  let answer = vp;
  let after = `${c.obj} ${t === 'perfect' ? '' : signal}`.trim() + '.';
  // For the two futures the signal word does not decide the form, so the form is named.
  const futureLabel = t === 'will' ? 'will / ' : t === 'goingto' ? 'going to / ' : '';
  let hintVerb = `${futureLabel}${neg ? 'not / ' : ''}${c.verb.base}`;
  if (t === 'perfect') {
    // "She has just eaten pizza." – adverb goes between have and participle.
    const [aux, ...rest] = vp.split(' ');
    answer = neg ? vp : `${aux} ${signal} ${rest.join(' ')}`;
    hintVerb = neg ? `not / ${c.verb.base}` : `${signal} / ${c.verb.base}`;
    after = `${c.obj}${neg ? ' yet' : ''}.`;
  }
  if (t === 'progressive' && rng.chance(0.4)) {
    before = `${rng.pick(['Look!', 'Listen!'])} ${c.subj.text}`;
    after = `${c.obj}.`;
  }
  const full = `${before} ${answer} ${after}`;
  return textEx(b, {
    prompt: `Setze das Verb (${hintVerb}) in der richtigen Form ein.`,
    before,
    after,
    answers: withVariants(answer),
    hint: RULE[t],
    speak: full,
    solution: [RULE[t], `→ ${full}`],
  });
}

// ---------------------------------------------------------------------------
// Vocabulary
// ---------------------------------------------------------------------------

const wordsFor = (themeId: string, d: Difficulty): Word[] => {
  const all = THEMES.find((t) => t.id === themeId)!.words;
  const fit = all.filter((w) => w[2] <= d);
  return fit.length >= 4 ? fit : all;
};

function vocabGens(themeId: string): Record<string, Generator> {
  const id = (k: string) => `vo.${themeId}.${k}`;
  const enToDe: Generator = (rng, d, chapterId) => {
    const words = wordsFor(themeId, d);
    const w = rng.pick(words);
    const others = rng.shuffle(words.filter((x) => x !== w)).slice(0, 3).map((x) => x[0]);
    return choiceEx(
      rng,
      { gen: id('enDe'), chapterId, difficulty: d },
      { prompt: `Was bedeutet «${w[1]}»?`, speak: w[1], speakPrompt: w[1], solution: [`${w[1]} = ${w[0]}`] },
      w[0],
      others,
    );
  };
  const deToEn: Generator = (rng, d, chapterId) => {
    const words = wordsFor(themeId, d);
    const w = rng.pick(words);
    const others = rng.shuffle(words.filter((x) => x !== w)).slice(0, 3).map((x) => x[1]);
    return choiceEx(
      rng,
      { gen: id('deEn'), chapterId, difficulty: d },
      { prompt: `Wie heisst «${w[0]}» auf Englisch?`, speak: w[1], solution: [`${w[0]} = ${w[1]}`] },
      w[1],
      others,
    );
  };
  const type: Generator = (rng, d, chapterId) => {
    const words = wordsFor(themeId, d).filter((w) => d === 1 || w[2] >= Math.min(d, 2));
    const w = rng.pick(words.length ? words : wordsFor(themeId, d));
    return textEx(
      { gen: id('type'), chapterId, difficulty: d },
      {
        prompt: `Schreibe auf Englisch: «${w[0]}»`,
        answers: [w[1], ...(w[3] ?? []), `the ${w[1]}`, `a ${w[1]}`, `an ${w[1]}`],
        hint: `Das Wort beginnt mit «${w[1].slice(0, 2)}…» und hat ${w[1].length} Zeichen.`,
        speak: w[1],
        solution: [`${w[0]} = ${w[1]}${w[3]?.length ? ` (auch: ${w[3].join(', ')})` : ''}`],
      },
    );
  };
  const odd: Generator = (rng, d, chapterId) => {
    const words = wordsFor(themeId, 3);
    const three = rng.shuffle(words).slice(0, 3).map((w) => w[1]);
    const otherTheme = rng.pick(THEMES.filter((t) => t.id !== themeId));
    const intruder = rng.pick(otherTheme.words)[1];
    const theme = THEMES.find((t) => t.id === themeId)!;
    return choiceEx(
      rng,
      { gen: id('odd'), chapterId, difficulty: d },
      {
        prompt: 'Welches Wort passt nicht zu den anderen?',
        solution: [`${three.join(', ')} gehören zu «${theme.title}».`, `«${intruder}» gehört zu «${otherTheme.title}».`],
      },
      intruder,
      three,
    );
  };
  return { [id('enDe')]: enToDe, [id('deEn')]: deToEn, [id('type')]: type, [id('odd')]: odd };
}

// ---------------------------------------------------------------------------
// Irregular verbs
// ---------------------------------------------------------------------------

const groupVerbs = (g: number) => IRREGULAR.filter((v) => (g === 0 ? true : v[4] === g));

function irregularGens(g: 0 | 1 | 2 | 3): Record<string, Generator> {
  const id = (k: string) => `iv${g}.${k}`;
  const pool = () => groupVerbs(g);

  const past: Generator = (rng, d, chapterId) => {
    const [base, p, pp, de, , extra] = rng.pick(pool());
    return textEx(
      { gen: id('past'), chapterId, difficulty: d },
      {
        prompt: `Simple Past von «${base}» (${de})?`,
        speakPrompt: base,
        answers: [p, ...(extra ?? [])],
        hint: 'Unregelmässig – nicht einfach -ed anhängen!',
        speak: `${base}, ${p.replace('/', ', ')}, ${pp}`,
        solution: [`${base} – ${p} – ${pp}`],
      },
    );
  };
  const participle: Generator = (rng, d, chapterId) => {
    const [base, p, pp, de, , extra] = rng.pick(pool());
    return textEx(
      { gen: id('pp'), chapterId, difficulty: d },
      {
        prompt: `Past Participle (3. Form) von «${base}» (${de})?`,
        speakPrompt: base,
        answers: [pp, ...(base === 'learn' || base === 'dream' ? (extra ?? []) : [])],
        hint: 'Die 3. Form brauchst du z. B. für das Present Perfect: I have …',
        speak: `${base}, ${p.replace('/', ', ')}, ${pp}`,
        solution: [`${base} – ${p} – ${pp}`],
      },
    );
  };
  const mc: Generator = (rng, d, chapterId) => {
    const verbs = pool().filter((x) => x[0] !== 'be');
    const [base, p, pp] = rng.pick(verbs);
    const askPast = rng.chance(0.6);
    const correct = askPast ? p : pp;
    const other = rng.pick(verbs.filter((x) => x[0] !== base));
    const wrong = [`${base.replace(/e$/, '')}ed`, askPast ? pp : p, askPast ? other[1] : other[2], `${base}s`];
    return choiceEx(
      rng,
      { gen: id('mc'), chapterId, difficulty: d },
      {
        prompt: `Welche Form ist das ${askPast ? 'Simple Past' : 'Past Participle'} von «${base}»?`,
        speak: `${base}, ${p.replace('/', ', ')}, ${pp}`,
        solution: [`${base} – ${p} – ${pp}`],
      },
      correct,
      wrong.filter((w) => w !== correct).slice(0, 3),
    );
  };
  const meaning: Generator = (rng, d, chapterId) => {
    const verbs = pool();
    const [base, p, pp, de] = rng.pick(verbs);
    return choiceEx(
      rng,
      { gen: id('meaning'), chapterId, difficulty: d },
      { prompt: `Welches Verb bedeutet «${de}»?`, speak: base, solution: [`${de} = ${base} (${p}, ${pp})`] },
      base,
      rng.shuffle(verbs.filter((x) => x[0] !== base)).slice(0, 3).map((x) => x[0]),
    );
  };
  const three: Generator = (rng, d, chapterId) => {
    const [base, p, pp, de, , extra] = rng.pick(pool());
    const pasts = [p, ...(extra ?? [])].filter((x) => !x.includes('/'));
    const answers = (pasts.length ? pasts : ['was', 'were']).flatMap((pa) => [`${pa} ${pp}`, `${pa}, ${pp}`]);
    return textEx(
      { gen: id('three'), chapterId, difficulty: d },
      {
        prompt: `Ergänze die 2. und 3. Form: ${base} (${de}) – … – …`,
        speakPrompt: base,
        before: base,
        answers,
        hint: 'Schreibe beide Formen mit Leerschlag getrennt, z. B. «went gone».',
        speak: `${base}, ${p.replace('/', ', ')}, ${pp}`,
        solution: [`${base} – ${p} – ${pp}`],
      },
    );
  };
  const sentence: Generator = (rng, d, chapterId) => {
    const pick = rng.pick(VERBS.filter((v) => IRREGULAR.some((i) => i[0] === v.base && (g === 0 || i[4] === g))));
    const verb = pick ?? rng.pick(VERBS);
    const c: Clause = { subj: rng.pick(SUBJECTS), verb, obj: rng.pick(verb.objects) };
    const usePerfect = d >= 2 && rng.chance(0.5);
    const signal = usePerfect ? 'already' : rng.pick(SIGNALS.past);
    const answer = usePerfect ? `${have(c.subj.person)} already ${verb.pp}` : verb.past;
    const after = usePerfect ? `${c.obj}.` : `${c.obj} ${signal}.`;
    return textEx(
      { gen: id('sentence'), chapterId, difficulty: d },
      {
        prompt: `Setze ein: (${usePerfect ? 'already / ' : ''}${verb.base})`,
        before: c.subj.text,
        after,
        answers: withVariants(answer),
        hint: usePerfect ? 'have/has + already + 3. Form' : 'Signalwort für das Simple Past → 2. Form',
        speak: `${c.subj.text} ${answer} ${after}`,
        solution: [`${c.subj.text} ${answer} ${after}`],
      },
    );
  };
  return {
    [id('past')]: past,
    [id('pp')]: participle,
    [id('mc')]: mc,
    [id('meaning')]: meaning,
    [id('three')]: three,
    [id('sentence')]: sentence,
  };
}

// ---------------------------------------------------------------------------
// Tenses
// ---------------------------------------------------------------------------

const tenseGap =
  (gen: string, tenses: Tense[], negFrom: Difficulty = 2, verbs?: (d: Difficulty) => Verb[]): Generator =>
  (rng, d, chapterId) => {
    const t = rng.pick(tenses);
    const neg = d >= negFrom && rng.chance(0.35);
    return gap(rng, { gen, chapterId, difficulty: d }, t, neg, verbs?.(d));
  };

const tenseQuestion =
  (gen: string, tenses: Tense[]): Generator =>
  (rng, d, chapterId) => {
    const t = rng.pick(tenses);
    const c = clause(rng);
    const signal = t === 'perfect' ? 'ever' : rng.pick(SIGNALS[t]);
    const q = question(c, t, signal);
    return orderEx(
      rng,
      { gen, chapterId, difficulty: d },
      {
        prompt: `Bilde eine Frage im ${TENSE_NAME[t]}.`,
        hint: t === 'simple' ? 'Do/Does + Subjekt + Grundform …' : t === 'past' ? 'Did + Subjekt + Grundform …' : 'Hilfsverb zuerst, dann das Subjekt.',
        speak: `${q}?`,
        solution: [`${q}?`, RULE[t]],
      },
      q,
    );
  };

const tenseSentence =
  (gen: string, tenses: Tense[]): Generator =>
  (rng, d, chapterId) => {
    const t = rng.pick(tenses);
    const c = clause(rng);
    const neg = d >= 2 && rng.chance(0.4);
    const signal = t === 'perfect' ? '' : rng.pick(SIGNALS[t]);
    const vp = phrase(c, t, neg);
    const s = `${c.subj.text} ${vp} ${c.obj}${signal ? ' ' + signal : ''}`;
    return orderEx(
      rng,
      { gen, chapterId, difficulty: d },
      { prompt: `Bilde einen ${neg ? 'verneinten ' : ''}Satz im ${TENSE_NAME[t]}.`, hint: 'Subjekt – Verb – Objekt – Zeitangabe', speak: `${s}.`, solution: [`${s}.`] },
      s,
    );
  };

const SIGNAL_TENSES: Tense[] = ['simple', 'progressive', 'past', 'perfect', 'will'];
const SIGNAL_WORDS: Record<Tense, string[]> = {
  simple: ['every day', 'usually', 'often', 'on Mondays', 'always', 'twice a week'],
  progressive: ['right now', 'at the moment', 'Look!', 'Listen!', 'now'],
  past: ['yesterday', 'last week', 'two years ago', 'in 2019', 'when I was a child'],
  perfect: ['just', 'already', 'ever', 'yet', 'since 2020', 'for three years', 'so far'],
  will: ['tomorrow', 'next year', 'I think …', 'probably', 'in the future'],
  goingto: ['next weekend'],
};

const signalWords =
  (gen: string, tenses: Tense[]): Generator =>
  (rng, d, chapterId) => {
    const t = rng.pick(tenses);
    const word = rng.pick(SIGNAL_WORDS[t]);
    // Correct tense + up to 3 others (chapter tenses first), shown in a fixed timeline order.
    const others = [...rng.shuffle(tenses.filter((x) => x !== t)), ...rng.shuffle(SIGNAL_TENSES.filter((x) => x !== t && !tenses.includes(x)))].slice(0, 3);
    const picked = new Set<Tense>([t, ...others]);
    const all = SIGNAL_TENSES.filter((x) => picked.has(x)).map((x) => TENSE_NAME[x]);
    return fixedChoiceEx(
      { gen, chapterId, difficulty: d },
      {
        prompt: `Signalwort «${word}» – welche Zeitform passt?`,
        hint: 'Gewohnheit, gerade jetzt, abgeschlossene Vergangenheit, Verbindung zur Gegenwart oder Zukunft?',
        solution: [`«${word}» → ${TENSE_NAME[t]}`, RULE[t]],
      },
      all,
      all.indexOf(TENSE_NAME[t]),
    );
  };

const sinceFor: Generator = (rng, d, chapterId) => {
  const [base, pp, comp] = rng.pick(DURATIVE);
  const subj = rng.pick(SUBJECTS);
  const useSince = rng.chance(0.5);
  const time = rng.pick(useSince ? SINCE : FOR);
  const askWord = d === 1 || rng.chance(0.4);
  if (askWord) {
    return fixedChoiceEx(
      { gen: 'te4.sinceFor', chapterId, difficulty: d },
      {
        prompt: `${subj.text} ${have(subj.person)} ${pp} ${comp} ___ ${time}.`,
        speak: `${subj.text} ${have(subj.person)} ${pp} ${comp} ${useSince ? 'since' : 'for'} ${time}.`,
        hint: 'since = seit einem Zeitpunkt, for = seit einer Zeitdauer',
        solution: [useSince ? `«${time}» ist ein Zeitpunkt → since` : `«${time}» ist eine Zeitdauer → for`],
      },
      ['since', 'for'],
      useSince ? 0 : 1,
    );
  }
  const answer = `${have(subj.person)} ${pp}`;
  const after = `${comp} ${useSince ? 'since' : 'for'} ${time}.`;
  return textEx(
    { gen: 'te4.sinceFor', chapterId, difficulty: d },
    {
      prompt: `Setze das Verb (${base}) im Present Perfect ein.`,
      before: subj.text,
      after,
      answers: withVariants(answer),
      hint: 'since/for → Present Perfect: have/has + 3. Form',
      speak: `${subj.text} ${answer} ${after}`,
      solution: [`${subj.text} ${answer} ${after}`, RULE.perfect],
    },
  );
};

/** Present perfect vs simple past depending on the signal word. */
const pastOrPerfect: Generator = (rng, d, chapterId) => {
  const usePerfect = rng.chance(0.5);
  return gap(rng, { gen: 'te4.pastPerfect', chapterId, difficulty: d }, usePerfect ? 'perfect' : 'past', d === 3 && rng.chance(0.3));
};

// will vs going to – fixed bank, because the choice depends on the situation.
// [before, verb, after, will-form, going-to-form, correct, why]
const FUTURE_BANK: [string, string, string, string, string, 'will' | 'goingto', string][] = [
  ['Look at those dark clouds! It', 'rain', '.', 'will rain', 'is going to rain', 'goingto', 'Man sieht schon Anzeichen → going to'],
  ['I have bought the tickets. We', 'see', 'the concert on Friday.', 'will see', 'are going to see', 'goingto', 'Plan steht schon fest → going to'],
  ['The phone is ringing. – OK, I', 'answer', 'it.', 'will answer', 'am going to answer', 'will', 'Spontaner Entschluss → will'],
  ['I think Switzerland', 'win', 'the match.', 'will win', 'is going to win', 'will', 'Vermutung (I think) → will'],
  ['She has saved money for months. She', 'buy', 'a new bike.', 'will buy', 'is going to buy', 'goingto', 'Absicht/Plan → going to'],
  ['Maybe it', 'snow', 'tomorrow.', 'will snow', 'is going to snow', 'will', 'Vermutung (maybe) → will'],
  ['Watch out! You', 'fall', '!', 'will fall', 'are going to fall', 'goingto', 'Man sieht es kommen → going to'],
  ['Are you cold? I', 'close', 'the window.', 'will close', 'am going to close', 'will', 'Spontanes Angebot → will'],
  ['In 2050, people', 'live', 'longer.', 'will live', 'are going to live', 'will', 'Vorhersage für die Zukunft → will'],
  ['We have booked a hotel. We', 'stay', 'in London for a week.', 'will stay', 'are going to stay', 'goingto', 'Plan steht fest → going to'],
  ['I promise I', 'help', 'you with your homework.', 'will help', 'am going to help', 'will', 'Versprechen → will'],
  ['Tom has packed his bag. He', 'travel', 'to Italy.', 'will travel', 'is going to travel', 'goingto', 'Vorbereitung sichtbar → going to'],
];

const futureAnswers = (f: string) => [f, f.replace(/^will /, "'ll ").replace(/^is going/, "'s going").replace(/^are going/, "'re going").replace(/^am going/, "'m going")];

const futureGap: Generator = (rng, d, chapterId) => {
  const [before, verb, after, willForm, goingForm, kind, why] = rng.pick(FUTURE_BANK);
  const right = kind === 'will' ? willForm : goingForm;
  return textEx(
    { gen: 'te5.future', chapterId, difficulty: d },
    {
      prompt: `will oder going to? Setze (${verb}) ein.`,
      before,
      after,
      answers: futureAnswers(right),
      hint: 'will: spontan, Vermutung, Versprechen. going to: Plan oder sichtbare Anzeichen.',
      speak: `${before} ${right} ${after}`,
      solution: [why, `${before} ${right} ${after}`],
    },
  );
};

const futureChoice: Generator = (rng, d, chapterId) => {
  const [before, , after, willForm, goingForm, kind, why] = rng.pick(FUTURE_BANK);
  const right = kind === 'will' ? willForm : goingForm;
  return fixedChoiceEx(
    { gen: 'te5.choice', chapterId, difficulty: d },
    { context: `${before} ___ ${after}`, prompt: 'Was passt besser?', speak: `${before} ${right} ${after}`, solution: [why] },
    [willForm, goingForm],
    kind === 'will' ? 0 : 1,
  );
};

const goingToGap = tenseGap('te5.goingto', ['goingto', 'will'], 2);

// ---------------------------------------------------------------------------

export const englishGenerators: Record<string, Generator> = {
  ...Object.assign({}, ...THEMES.map((t) => vocabGens(t.id))),
  ...irregularGens(1),
  ...irregularGens(2),
  ...irregularGens(3),
  ...irregularGens(0),
  'te1.gap': tenseGap('te1.gap', ['simple']),
  'te1.question': tenseQuestion('te1.question', ['simple']),
  'te1.sentence': tenseSentence('te1.sentence', ['simple']),
  'te2.gap': tenseGap('te2.gap', ['simple', 'progressive']),
  'te2.signal': signalWords('te2.signal', ['simple', 'progressive']),
  'te2.question': tenseQuestion('te2.question', ['simple', 'progressive']),
  'te3.gap': tenseGap('te3.gap', ['past']),
  'te3.question': tenseQuestion('te3.question', ['past']),
  'te3.sentence': tenseSentence('te3.sentence', ['past']),
  'te4.pastPerfect': pastOrPerfect,
  'te4.sinceFor': sinceFor,
  'te4.signal': signalWords('te4.signal', ['past', 'perfect']),
  'te4.question': tenseQuestion('te4.question', ['perfect']),
  'te5.future': futureGap,
  'te5.choice': futureChoice,
  'te5.goingto': goingToGap,
  'te5.signal': signalWords('te5.signal', ['simple', 'progressive', 'past', 'perfect', 'will']),
};
