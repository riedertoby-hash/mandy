import type { Subject, Topic } from '../../core/types';
import { blocks } from '../math/blocks';
import { IRREGULAR, THEMES } from './lexicon';

const planned = (id: string, title: string, cycle: 1 | 2 | 3, grade: string, icon: string, description: string, chapters: string[]): Topic => ({
  id,
  title,
  cycle,
  grade,
  icon,
  description,
  chapters: [],
  planned: chapters,
});

const vocabTopic: Topic = {
  id: 'en-vocab',
  title: 'Wortschatz',
  cycle: 3,
  grade: 'Sek 1–3',
  icon: '📚',
  description: 'Wörter zu Schule, Essen, Reisen, Gefühlen, Natur und Medien – mit Aussprache.',
  chapters: THEMES.map((t) => ({
    id: `vo-${t.id}`,
    title: t.title,
    subtitle: t.subtitle,
    icon: t.icon,
    theory: [
      {
        title: 'So lernst du Wörter',
        text: [
          'Lies das Wort, hör es dir an (🔊) und sprich es laut nach.',
          'Zuerst erkennst du die Wörter (Auswahl), danach schreibst du sie selbst. Falsche Wörter kommen in deine Lernkiste und tauchen wieder auf.',
        ],
        visual: { kind: 'table', rows: [['Deutsch', ...t.words.slice(0, 3).map((w) => w[0])], ['English', ...t.words.slice(0, 3).map((w) => w[1])]] },
      },
    ],
    blocks: blocks(`vo-${t.id}`, {
      1: [`vo.${t.id}.enDe`, `vo.${t.id}.deEn`],
      2: [`vo.${t.id}.deEn`, `vo.${t.id}.type`, `vo.${t.id}.odd`],
      3: [`vo.${t.id}.type`],
    }),
  })),
};

const ivTable = (g: number) => {
  const list = IRREGULAR.filter((v) => v[4] === g).slice(0, 4);
  return { kind: 'table' as const, rows: [['Infinitiv', ...list.map((v) => v[0])], ['Simple Past', ...list.map((v) => v[1])], ['Participle', ...list.map((v) => v[2])]] };
};

const irregularTopic: Topic = {
  id: 'en-irregular',
  title: 'Irregular Verbs',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '🔀',
  description: 'Die unregelmässigen Verben in drei Etappen – von go/went/gone bis shine/shone/shone.',
  chapters: [
    {
      id: 'iv1',
      title: 'Die wichtigsten 25',
      subtitle: 'be, have, go, see …',
      icon: '⭐',
      theory: [
        {
          title: 'Drei Formen',
          text: [
            'Jedes Verb hat drei Formen: Infinitiv (go), Simple Past (went) und Past Participle (gone).',
            'Regelmässige Verben bekommen einfach -ed (play – played – played). Die unregelmässigen musst du auswendig lernen.',
          ],
          visual: ivTable(1),
        },
        {
          title: 'Wofür brauche ich sie?',
          text: ['2. Form → Simple Past: Yesterday I went to school.', '3. Form → Present Perfect: I have gone to school.'],
        },
      ],
      blocks: blocks('iv1', { 1: ['iv1.meaning', 'iv1.mc'], 2: ['iv1.past', 'iv1.pp', 'iv1.mc'], 3: ['iv1.three', 'iv1.sentence', 'iv1.pp'] }),
    },
    {
      id: 'iv2',
      title: 'Die nächsten 28',
      subtitle: 'begin, bring, choose …',
      icon: '🚀',
      theory: [
        {
          title: 'Gruppen helfen',
          text: ['Viele Verben folgen einem Muster:', 'bring – brought, buy – bought, think – thought, teach – taught', 'begin – began – begun, sing – sang – sung, swim – swam – swum'],
          visual: ivTable(2),
        },
      ],
      blocks: blocks('iv2', { 1: ['iv2.meaning', 'iv2.mc'], 2: ['iv2.past', 'iv2.pp', 'iv2.mc'], 3: ['iv2.three', 'iv2.sentence', 'iv2.pp'] }),
    },
    {
      id: 'iv3',
      title: 'Profi-Verben',
      subtitle: 'Seltener, aber wichtig',
      icon: '🏆',
      theory: [
        {
          title: 'Gleiche Formen',
          text: ['Bei manchen Verben sind alle drei Formen gleich: put – put – put, hurt – hurt – hurt.', 'Bei anderen nur die 2. und 3.: hold – held – held, feed – fed – fed.'],
          visual: ivTable(3),
        },
      ],
      blocks: blocks('iv3', { 1: ['iv3.meaning', 'iv3.mc'], 2: ['iv3.past', 'iv3.pp', 'iv3.mc'], 3: ['iv3.three', 'iv0.three', 'iv0.past'] }),
    },
  ],
};

const tensesTopic: Topic = {
  id: 'en-tenses',
  title: 'Zeitformen',
  cycle: 3,
  grade: 'Sek 1–3',
  icon: '⏳',
  description: 'Simple Present, Progressive, Past, Present Perfect und Future – mit Signalwörtern.',
  chapters: [
    {
      id: 'te1',
      title: 'Simple Present',
      subtitle: 'Gewohnheiten und Fakten',
      icon: '🔁',
      theory: [
        {
          title: 'he/she/it – das s muss mit',
          text: ['I play, you play, he/she/it plays, we play, they play.', 'Nach -s, -sh, -ch, -x, -o kommt -es: watches, goes. Konsonant + y wird -ies: studies.'],
          visual: { kind: 'table', rows: [['I / you / we / they', 'play', "don't play"], ['he / she / it', 'plays', "doesn't play"]] },
        },
        {
          title: 'Fragen',
          text: ['Do/Does + Subjekt + Grundform: Does she play football?', 'Achtung: Nach does kein -s mehr am Verb!'],
        },
      ],
      blocks: blocks('te1', { 1: ['te1.gap'], 2: ['te1.gap', 'te1.sentence'], 3: ['te1.gap', 'te1.question', 'te1.sentence'] }),
    },
    {
      id: 'te2',
      title: 'Present Progressive',
      subtitle: 'Was gerade jetzt passiert',
      icon: '🎬',
      theory: [
        {
          title: 'am/is/are + -ing',
          text: ['Für Handlungen, die genau jetzt passieren: She is reading a book right now.', 'Signalwörter: now, right now, at the moment, Look!, Listen!'],
          example: { question: 'Simple Present oder Progressive?', steps: ['Every day she plays football. (Gewohnheit)', 'Look! She is playing football. (gerade jetzt)'] },
        },
        {
          title: '-ing richtig schreiben',
          text: ['make → making (stummes e fällt weg)', 'swim → swimming, run → running, stop → stopping (Konsonant verdoppeln)', 'travel → travelling (britisch)'],
        },
      ],
      blocks: blocks('te2', { 1: ['te2.gap', 'te2.signal'], 2: ['te2.gap', 'te2.signal', 'te2.question'], 3: ['te2.gap', 'te2.question'] }),
    },
    {
      id: 'te3',
      title: 'Simple Past',
      subtitle: 'Abgeschlossen in der Vergangenheit',
      icon: '📜',
      theory: [
        {
          title: 'Formen',
          text: ['Regelmässig: -ed (played, cleaned). Unregelmässig: 2. Form (went, ate, wrote).', "Verneinung und Frage mit did: I didn't go. Did you go? – danach immer die Grundform!"],
          visual: { kind: 'table', rows: [['bejaht', 'She watched TV.'], ['verneint', "She didn't watch TV."], ['Frage', 'Did she watch TV?']] },
        },
        { title: 'Signalwörter', text: ['yesterday, last week/year, two days ago, in 2019, when I was a child'] },
      ],
      blocks: blocks('te3', { 1: ['te3.gap'], 2: ['te3.gap', 'te3.sentence'], 3: ['te3.gap', 'te3.question', 'te3.sentence'] }),
    },
    {
      id: 'te4',
      title: 'Present Perfect',
      subtitle: 'Vergangenheit mit Bezug zu jetzt',
      icon: '🔗',
      theory: [
        {
          title: 'have/has + 3. Form',
          text: ['I have just eaten. She has never been to London. Have you ever seen a whale?', 'Signalwörter: just, already, ever, never, yet, so far, since, for'],
        },
        {
          title: 'Present Perfect oder Simple Past?',
          text: ['Genauer Zeitpunkt in der Vergangenheit (yesterday, last year) → Simple Past.', 'Kein Zeitpunkt / Wirkung bis jetzt (just, already, since, for) → Present Perfect.'],
          example: { question: 'since oder for?', steps: ['since = seit einem Zeitpunkt: since 2020, since Monday', 'for = seit einer Dauer: for two years, for a week'] },
        },
      ],
      blocks: blocks('te4', { 1: ['te4.signal', 'te4.sinceFor'], 2: ['te4.pastPerfect', 'te4.sinceFor', 'te4.signal'], 3: ['te4.pastPerfect', 'te4.sinceFor', 'te4.question'] }),
    },
    {
      id: 'te5',
      title: 'Future & Mix',
      subtitle: 'will, going to und alle Zeiten gemischt',
      icon: '🔮',
      theory: [
        {
          title: 'will',
          text: ['Spontane Entscheidung, Vermutung, Versprechen: I think it will rain. I’ll help you!'],
        },
        {
          title: 'going to',
          text: ['Plan oder sichtbare Anzeichen: We are going to visit Rome. Look at the clouds – it is going to rain.'],
        },
      ],
      blocks: blocks('te5', { 1: ['te5.choice', 'te5.signal'], 2: ['te5.future', 'te5.choice', 'te5.goingto', 'te5.signal'], 3: ['te5.future', 'te5.goingto', 'te5.signal'] }),
    },
  ],
};

export const englishSubject: Subject = {
  id: 'englisch',
  name: 'Englisch',
  icon: '🇬🇧',
  color: '#1c7ed6',
  topics: [
    planned('en-basics', 'Basics', 2, '5.–6. Klasse', '🔤', 'Zahlen, Farben, Uhrzeit, Wochentage, sich vorstellen.', ['Numbers & Colours', 'Time & Dates', 'Introducing yourself']),
    vocabTopic,
    irregularTopic,
    tensesTopic,
    planned('en-adjectives', 'Adjectives & Adverbs', 3, 'Sek 1', '📏', 'Steigerung (bigger, the biggest) und Adverbien (quickly).', ['Comparatives', 'Superlatives', 'Adverbs']),
    planned('en-modals', 'Modal Verbs', 3, 'Sek 2', '🗝️', 'can, must, have to, should, may.', ['can & could', 'must & have to', 'should']),
    planned('en-conditionals', 'If-Clauses', 3, 'Sek 2–3', '🔀', 'Bedingungssätze Typ 1 und 2.', ['Type 1', 'Type 2', 'Mixed']),
    planned('en-passive', 'Passive', 3, 'Sek 3', '🔄', 'The bridge was built in 1890.', ['Present Passive', 'Past Passive']),
    planned('en-reading', 'Reading & Listening', 3, 'Sek 1–3', '🎧', 'Kurze Texte verstehen und Fragen beantworten.', ['Short texts', 'Emails', 'Stories']),
  ],
};
