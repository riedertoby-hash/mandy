import type { Subject, Topic } from '../../core/types';
import { blocks } from '../math/blocks';

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

const rechtschreibung: Topic = {
  id: 'de-rechtschreibung',
  title: 'Rechtschreibung',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '✍️',
  description: 'das oder dass, gross oder klein, seid oder seit – die häufigsten Fehlerquellen.',
  chapters: [
    {
      id: 'ru1',
      title: 'das oder dass',
      subtitle: 'Die Ersatzprobe hilft',
      icon: '🔍',
      theory: [
        {
          title: 'Ersatzprobe',
          text: [
            '«das» kannst du durch «dieses», «jenes» oder «welches» ersetzen: Das Buch, das (welches) ich lese …',
            '«dass» lässt sich nicht ersetzen. Es ist eine Konjunktion und leitet einen Nebensatz ein: Ich hoffe, dass du kommst.',
          ],
          example: { question: 'Ich weiss, ___ das Velo, ___ dort steht, dir gehört.', steps: ['1. Lücke: nicht ersetzbar → dass', '2. Lücke: «welches dort steht» → das'] },
        },
      ],
      blocks: blocks('ru1', { all: ['de.dasDass'] }),
    },
    {
      id: 'ru2',
      title: 'Gross oder klein',
      subtitle: 'Nominalisierungen erkennen',
      icon: '🔠',
      theory: [
        {
          title: 'Wann wird gross geschrieben?',
          text: [
            'Nomen schreibt man gross – auch Verben und Adjektive, die zu Nomen werden (Nominalisierung).',
            'Signalwörter: Artikel (das Lesen), verschmolzene Präpositionen (beim, zum, im, am), etwas/nichts/viel/alles + Adjektiv (etwas Schönes).',
          ],
        },
        {
          title: 'Zeitangaben',
          text: ['heute Abend, morgen Früh, am Montag → gross', 'abends, montags, morgen (= am nächsten Tag) → klein'],
          visual: { kind: 'table', rows: [['gross', 'am Abend', 'heute Morgen', 'beim Essen'], ['klein', 'abends', 'morgens', 'essen']] },
        },
      ],
      blocks: blocks('ru2', { all: ['de.grossKlein'] }),
    },
    {
      id: 'ru3',
      title: 'Verwechslungswörter',
      subtitle: 'seid/seit, wahr/war, tot/Tod …',
      icon: '🪞',
      theory: [
        {
          title: 'Eselsbrücken',
          text: [
            'seid kommt von sein (ihr seid) – seit ist eine Zeitangabe (seit gestern).',
            'wahr = richtig (die Wahrheit) – war = Vergangenheit von sein.',
            'tot (Adjektiv) mit t – der Tod (Nomen) mit d.',
            'wieder = nochmals – wider = gegen (Widerstand).',
          ],
        },
      ],
      blocks: blocks('ru3', { all: ['de.verwechslung'] }),
    },
  ],
};

const grammatik: Topic = {
  id: 'de-grammatik',
  title: 'Grammatik',
  cycle: 3,
  grade: 'Sek 1–3',
  icon: '🧩',
  description: 'Die fünf Wortarten, die vier Fälle und die Satzglieder.',
  chapters: [
    {
      id: 'gr1',
      title: 'Die fünf Wortarten',
      subtitle: 'Nomen, Verb, Adjektiv, Pronomen, Partikel',
      icon: '🏷️',
      theory: [
        {
          title: 'Fünf Wortarten',
          text: [
            'Veränderbar: Nomen (deklinierbar, mit Artikel), Verb (konjugierbar), Adjektiv (steigerbar), Pronomen (begleitet oder ersetzt ein Nomen – auch die Artikel).',
            'Unveränderbar: Partikeln – Präpositionen (mit, unter), Konjunktionen (und, weil), Adverbien (morgen, hier) und Interjektionen (au, oh).',
          ],
          visual: {
            kind: 'table',
            rows: [
              ['Nomen', 'Hund, Freude'],
              ['Verb', 'rennt, liest'],
              ['Adjektiv', 'laut, schnell'],
              ['Pronomen', 'der, wir, ihr'],
              ['Partikel', 'mit, weil, morgen'],
            ],
          },
        },
      ],
      blocks: blocks('gr1', { all: ['de.wortart'] }),
    },
    {
      id: 'gr2',
      title: 'Die vier Fälle',
      subtitle: 'Nominativ, Akkusativ, Dativ, Genitiv',
      icon: '❓',
      theory: [
        {
          title: 'Mit Fragen zum Fall',
          text: ['Wer oder was? → Nominativ', 'Wessen? → Genitiv', 'Wem? → Dativ', 'Wen oder was? → Akkusativ'],
          visual: {
            kind: 'table',
            rows: [
              ['Nominativ', 'der Hund', 'die Katze', 'das Pferd'],
              ['Akkusativ', 'den Hund', 'die Katze', 'das Pferd'],
              ['Dativ', 'dem Hund', 'der Katze', 'dem Pferd'],
              ['Genitiv', 'des Hundes', 'der Katze', 'des Pferdes'],
            ],
          },
        },
        {
          title: 'Präpositionen bestimmen den Fall',
          text: ['mit, nach, bei, von, zu → Dativ', 'für, ohne, gegen, durch → Akkusativ', 'wegen, trotz, während → Genitiv', 'in, auf, unter …: Wo? → Dativ, Wohin? → Akkusativ'],
        },
      ],
      blocks: blocks('gr2', { 1: ['de.fall'], 2: ['de.fall', 'de.artikel'], 3: ['de.fall', 'de.artikel'] }),
    },
    {
      id: 'gr3',
      title: 'Satzglieder',
      subtitle: 'Umstellprobe und Fragen',
      icon: '🧱',
      theory: [
        {
          title: 'Umstellprobe',
          text: [
            'Satzglieder sind Wörter oder Wortgruppen, die man nur zusammen verschieben kann.',
            'Das Verb (die Personalform) bleibt im Aussagesatz immer an 2. Stelle.',
          ],
          example: { question: 'Mandy | trinkt | am Morgen | einen Tee.', steps: ['Am Morgen | trinkt | Mandy | einen Tee.', 'Einen Tee | trinkt | Mandy | am Morgen.'] },
        },
        {
          title: 'Satzglieder bestimmen',
          text: ['Subjekt: Wer oder was?', 'Akkusativobjekt: Wen oder was?', 'Dativobjekt: Wem?', 'Adverbiale: Wann? Wo? Wie? Warum?'],
        },
      ],
      blocks: blocks('gr3', { 1: ['de.umstell', 'de.satzglied'], 2: ['de.satzglied', 'de.umstell'], 3: ['de.satzglied'] }),
    },
  ],
};

const verben: Topic = {
  id: 'de-verben',
  title: 'Verben & Zeitformen',
  cycle: 3,
  grade: 'Sek 1–3',
  icon: '⏱️',
  description: 'Zeitformen erkennen und bilden, Partizip II, haben oder sein, indirekte Rede.',
  chapters: [
    {
      id: 've1',
      title: 'Zeitformen erkennen',
      subtitle: 'Von Präsens bis Futur',
      icon: '🕰️',
      theory: [
        {
          title: 'Die fünf Zeitformen',
          text: ['Achte auf das Hilfsverb und die zweite Verbform am Satzende.'],
          visual: {
            kind: 'table',
            rows: [
              ['Präsens', 'ich gehe'],
              ['Präteritum', 'ich ging'],
              ['Perfekt', 'ich bin gegangen'],
              ['Plusquamperfekt', 'ich war gegangen'],
              ['Futur I', 'ich werde gehen'],
            ],
          },
        },
      ],
      blocks: blocks('ve1', { all: ['de.zeitBestimmen'] }),
    },
    {
      id: 've2',
      title: 'Zeitformen bilden',
      subtitle: 'Präteritum, Perfekt und Co.',
      icon: '🛠️',
      theory: [
        {
          title: 'Perfekt mit haben oder sein',
          text: [
            'Perfekt = haben/sein (Präsens) + Partizip II.',
            '«sein» bei Bewegung von A nach B oder Veränderung: ich bin gegangen, gefahren, gelaufen, geblieben.',
            '«haben» bei allen anderen: ich habe gelesen, gespielt, gegessen.',
          ],
        },
        {
          title: 'Starke Verben',
          text: ['Starke Verben ändern den Stammvokal: singen – sang – gesungen, fahren – fuhr – gefahren.'],
        },
      ],
      blocks: blocks('ve2', { 1: ['de.partizip', 'de.hilfsverb', 'de.zeitBilden'], 2: ['de.zeitBilden', 'de.hilfsverb', 'de.partizip'], 3: ['de.zeitBilden'] }),
    },
    {
      id: 've3',
      title: 'Indirekte Rede',
      subtitle: 'Konjunktiv I – wie in der Zeitung',
      icon: '📰',
      theory: [
        {
          title: 'Konjunktiv I',
          text: [
            'Wenn man wiedergibt, was jemand gesagt hat, braucht man den Konjunktiv I: Mandy sagt, sie sei müde.',
            'Formen: er sei, sie habe, es komme, sie könne, er werde.',
          ],
          example: { question: 'Tom sagt: «Ich habe Hunger.»', steps: ['→ Tom sagt, er habe Hunger.'] },
        },
        {
          title: 'Ersatzform',
          text: ['Sieht der Konjunktiv I gleich aus wie der Indikativ (sie haben), nimmt man den Konjunktiv II: Sie sagen, sie hätten keine Zeit.'],
        },
      ],
      blocks: blocks('ve3', { all: ['de.konjunktiv'] }),
    },
  ],
};

const komma: Topic = {
  id: 'de-komma',
  title: 'Kommasetzung',
  cycle: 3,
  grade: 'Sek 1–3',
  icon: '❝',
  description: 'Aufzählungen, Nebensätze, Relativsätze und Infinitivgruppen.',
  chapters: [
    {
      id: 'ko1',
      title: 'Aufzählung & Nebensatz',
      subtitle: 'weil, dass, wenn, obwohl …',
      icon: '➗',
      theory: [
        {
          title: 'Aufzählungen',
          text: ['Gleichrangige Wörter werden mit Komma getrennt – vor «und» und «oder» steht kein Komma.', 'Ich kaufe Brot, Käse und Milch.'],
        },
        {
          title: 'Nebensätze',
          text: [
            'Ein Nebensatz wird immer mit Komma abgetrennt. Erkennungszeichen: Konjunktion am Anfang (weil, dass, wenn, obwohl, als, ob, nachdem), Verb am Ende.',
            'Vor «aber» und «sondern» steht immer ein Komma.',
          ],
          example: { question: 'Ich bleibe zu Hause weil ich krank bin.', steps: ['Nebensatz: «weil ich krank bin» (Verb «bin» am Ende)', '→ Ich bleibe zu Hause, weil ich krank bin.'] },
        },
      ],
      blocks: blocks('ko1', { 1: ['de.komma1', 'de.kommaZahl1'], 2: ['de.komma1', 'de.kommaZahl1'], 3: ['de.komma1', 'de.kommaZahl1'] }),
    },
    {
      id: 'ko2',
      title: 'Relativsatz & Infinitiv',
      subtitle: 'der, die, das … und um … zu',
      icon: '🔗',
      theory: [
        {
          title: 'Relativsätze',
          text: ['Relativsätze beginnen mit der, die, das, welcher … und werden abgetrennt. Steht der Relativsatz in der Mitte, braucht es zwei Kommas.', 'Das Buch, das ich lese, ist spannend.'],
        },
        {
          title: 'Infinitivgruppen',
          text: ['Mit um, ohne, statt, anstatt, ausser, als + zu immer ein Komma: Er spart, um ein Velo zu kaufen.', 'Auch wenn die Gruppe von einem Nomen abhängt: Ich habe keine Lust, aufzuräumen.'],
        },
      ],
      blocks: blocks('ko2', { 1: ['de.komma2', 'de.kommaZahl2'], 2: ['de.komma2', 'de.kommaZahl2'], 3: ['de.komma2', 'de.kommaZahl2'] }),
    },
  ],
};

export const deutschSubject: Subject = {
  id: 'deutsch',
  name: 'Deutsch',
  icon: '📖',
  color: '#e8590c',
  topics: [
    rechtschreibung,
    grammatik,
    verben,
    komma,
    planned('de-lesen', 'Lesen & Verstehen', 3, 'Sek 1–3', '📚', 'Texte verstehen, Informationen finden, Absichten erkennen.', ['Sachtexte', 'Erzählungen', 'Diagramme lesen']),
    planned('de-schreiben', 'Texte schreiben', 3, 'Sek 1–3', '📝', 'Bericht, Erörterung, Bewerbung, Zusammenfassung.', ['Bericht', 'Zusammenfassung', 'Bewerbung', 'Erörterung']),
    planned('de-stil', 'Wortschatz & Stil', 3, 'Sek 2–3', '🎨', 'Fremdwörter, Synonyme, Stilmittel, Redewendungen.', ['Fremdwörter', 'Synonyme', 'Stilmittel']),
    planned('de-literatur', 'Literatur', 3, 'Sek 2–3', '🎭', 'Textsorten, Gedichte, Merkmale von Erzählungen.', ['Textsorten', 'Gedichte', 'Erzählperspektive']),
  ],
};
