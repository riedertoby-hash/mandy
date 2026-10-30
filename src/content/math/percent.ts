import type { BlockDef, Chapter, Difficulty, Topic } from '../../core/types';

const LEVELS: [Difficulty, string, number][] = [
  [1, 'Einstieg', 6],
  [2, 'Training', 8],
  [3, 'Profi', 8],
];

/** Three blocks per chapter: easy → medium → hard. */
function blocks(chapterId: string, gens: Partial<Record<Difficulty, string[]>> & { all?: string[] }): BlockDef[] {
  return LEVELS.map(([difficulty, title, count]) => ({
    id: `${chapterId}.b${difficulty}`,
    title,
    difficulty,
    count,
    gens: gens[difficulty] ?? gens.all ?? [],
  }));
}

const chapters: Chapter[] = [
  {
    id: 'p1',
    title: 'Prozente verstehen',
    subtitle: 'Was heisst eigentlich «Prozent»?',
    icon: '🧩',
    theory: [
      {
        title: 'Prozent heisst «von Hundert»',
        text: [
          'Das Zeichen % bedeutet «Hundertstel». 1 % ist also ein Hundertstel vom Ganzen.',
          'Das Ganze ist immer 100 %. Färbst du in einem Feld mit 100 Kästchen 35 Kästchen, sind das 35 %.',
        ],
        visual: { kind: 'grid', total: 100, filled: 35 },
      },
      {
        title: 'Nicht immer 100 Kästchen',
        text: [
          'Hat ein Feld nur 20 Kästchen, ist ein Kästchen 100 % : 20 = 5 %.',
          'So kannst du jeden Anteil in Prozent ausdrücken: Anteil : Ganzes · 100.',
        ],
        visual: { kind: 'grid', total: 20, filled: 7 },
        example: { question: '7 von 20 Kästchen sind gefärbt. Wie viel Prozent?', steps: ['1 Kästchen = 5 %', '7 · 5 % = 35 %'] },
      },
    ],
    blocks: blocks('p1', { all: ['p1.gridFill', 'p1.gridRead', 'p1.ofHundred', 'p1.concept'] }),
  },
  {
    id: 'p2',
    title: 'Bruch, Dezimalzahl, Prozent',
    subtitle: 'Drei Schreibweisen für dasselbe',
    icon: '🔁',
    theory: [
      {
        title: 'Drei Schreibweisen',
        text: ['1/4 = 0.25 = 25 %. Alle drei bedeuten genau dasselbe.', 'Merke dir die wichtigsten: 1/2 = 50 %, 1/4 = 25 %, 3/4 = 75 %, 1/5 = 20 %, 1/10 = 10 %.'],
        visual: { kind: 'bar', percent: 25, left: '0', right: '1', marks: [25, 50, 75] },
      },
      {
        title: 'So wandelst du um',
        text: [
          'Dezimalzahl → Prozent: mal 100 (Komma 2 Stellen nach rechts). 0.07 = 7 %',
          'Prozent → Dezimalzahl: durch 100 (Komma 2 Stellen nach links). 45 % = 0.45',
          'Bruch → Prozent: so erweitern, dass unten 100 steht – oder Zähler : Nenner · 100.',
        ],
        example: { question: 'Schreibe 3/20 in Prozent.', steps: ['Erweitern mit 5: 3/20 = 15/100', '15/100 = 15 %'] },
      },
    ],
    blocks: blocks('p2', {
      1: ['p2.fracToPct', 'p2.decToPct', 'p2.pctToDec', 'p2.pctToFrac'],
      2: ['p2.fracToPct', 'p2.decToPct', 'p2.pctToDec', 'p2.pctToFrac', 'p2.order'],
      3: ['p2.fracToPct', 'p2.decToPct', 'p2.pctToDec', 'p2.pctToFrac', 'p2.order'],
    }),
  },
  {
    id: 'p3',
    title: 'Prozentwert berechnen',
    subtitle: 'Wie viel sind 35 % von 240?',
    icon: '🎯',
    theory: [
      {
        title: 'Die drei Grössen',
        text: [
          'Grundwert G: das Ganze (100 %).',
          'Prozentsatz p: die Angabe in %.',
          'Prozentwert P: der Anteil, der zum Prozentsatz gehört.',
        ],
        visual: { kind: 'bar', percent: 35, left: 'P', right: 'G = 100 %' },
      },
      {
        title: 'Über 1 % rechnen (Dreisatz)',
        text: ['Zuerst 1 % ausrechnen (durch 100), dann mit dem Prozentsatz multiplizieren.', 'Formel: P = G · p : 100'],
        example: { question: 'Berechne 35 % von 240.', steps: ['1 % von 240 = 2.4', '35 % = 35 · 2.4 = 84'] },
      },
      {
        title: 'Abkürzungen im Kopf',
        text: ['50 % → durch 2   ·   25 % → durch 4   ·   10 % → durch 10   ·   20 % → durch 5   ·   5 % → Hälfte von 10 %'],
      },
    ],
    blocks: blocks('p3', { 1: ['p3.basic', 'p3.text'], 2: ['p3.basic', 'p3.text', 'p3.estimate'], 3: ['p3.basic', 'p3.text', 'p3.estimate'] }),
  },
  {
    id: 'p4',
    title: 'Prozentsatz berechnen',
    subtitle: 'Wie viel Prozent sind 18 von 24?',
    icon: '📊',
    theory: [
      {
        title: 'Anteil durch Ganzes',
        text: ['Teile den Prozentwert durch den Grundwert. Das Resultat mal 100 ergibt den Prozentsatz.', 'Formel: p = P : G · 100'],
        example: { question: 'Wie viel Prozent sind 18 von 24?', steps: ['18 : 24 = 0.75', '0.75 · 100 = 75 %'] },
      },
      {
        title: 'Vergleichen mit Prozent',
        text: ['Prozente machen Anteile vergleichbar, auch wenn das Ganze verschieden gross ist: 9 von 12 (75 %) ist besser als 10 von 16 (62.5 %).'],
      },
    ],
    blocks: blocks('p4', { 1: ['p4.basic', 'p4.text'], 2: ['p4.basic', 'p4.text', 'p4.compare'], 3: ['p4.basic', 'p4.text', 'p4.compare'] }),
  },
  {
    id: 'p5',
    title: 'Grundwert berechnen',
    subtitle: '20 % sind 36 – wie viel ist das Ganze?',
    icon: '🏗️',
    theory: [
      {
        title: 'Rückwärts zum Ganzen',
        text: ['Du kennst einen Teil und seinen Prozentsatz. Rechne zuerst 1 % aus, dann 100 %.', 'Formel: G = P : p · 100'],
        visual: { kind: 'bar', percent: 20, left: '36', right: '?' },
        example: { question: '20 % sind 36. Wie gross ist das Ganze?', steps: ['20 % ≙ 36', '1 % ≙ 36 : 20 = 1.8', '100 % ≙ 1.8 · 100 = 180'] },
      },
      {
        title: 'Was ist gesucht?',
        text: ['Lies genau: Ist das Ganze gesucht (G), ein Teil davon (P) oder eine Angabe in % (p)? Dann wählst du die passende Formel.'],
      },
    ],
    blocks: blocks('p5', { 1: ['p5.basic', 'p5.identify', 'p5.text'], 2: ['p5.basic', 'p5.text', 'p5.identify'], 3: ['p5.basic', 'p5.text', 'p5.identify'] }),
  },
  {
    id: 'p6',
    title: 'Rabatt, Aufschlag & MWST',
    subtitle: 'Einkaufen wie ein Profi',
    icon: '🛍️',
    theory: [
      {
        title: 'Rabatt (verminderter Grundwert)',
        text: ['Bei 20 % Rabatt bezahlst du noch 80 % des Preises.', 'Neuer Preis = alter Preis · 0.8'],
        visual: { kind: 'bar', percent: 80, left: 'du bezahlst 80 %', right: '100 %' },
      },
      {
        title: 'Aufschlag & MWST (vermehrter Grundwert)',
        text: ['Bei 15 % Aufschlag bezahlst du 115 % → mal 1.15.', 'In der Schweiz beträgt die normale Mehrwertsteuer 8.1 % → mal 1.081.'],
      },
      {
        title: 'Rückwärts rechnen',
        text: ['Kostet etwas nach 25 % Rabatt noch CHF 60, sind CHF 60 = 75 %. Also: 60 : 0.75 = CHF 80.', 'Fehlerfalle: Nicht 25 % von 60 dazuzählen!'],
      },
    ],
    blocks: blocks('p6', {
      1: ['p6.discount', 'p6.increase', 'p6.factor', 'p6.reverse'],
      2: ['p6.discount', 'p6.increase', 'p6.factor', 'p6.reverse'],
      3: ['p6.discount', 'p6.increase', 'p6.factor', 'p6.reverse'],
    }),
  },
  {
    id: 'p7',
    title: 'Prozentuale Veränderung',
    subtitle: 'Zunahme, Abnahme, Prozentpunkte',
    icon: '📈',
    theory: [
      {
        title: 'Veränderung in Prozent',
        text: ['Veränderung : alter Wert · 100. Der alte Wert ist immer der Grundwert (100 %).'],
        example: { question: 'Von CHF 40 auf CHF 50 – um wie viel Prozent teurer?', steps: ['Veränderung: 50 − 40 = 10', '10 : 40 = 0.25 → 25 %'] },
      },
      {
        title: 'Prozent ≠ Prozentpunkte',
        text: ['Steigt ein Anteil von 20 % auf 30 %, sind das 10 Prozentpunkte – aber eine Zunahme um 50 % (10 : 20).'],
      },
      {
        title: 'Zwei Veränderungen hintereinander',
        text: ['+10 % und danach −10 % ergibt NICHT 0 %: 1.1 · 0.9 = 0.99 → 1 % weniger als am Anfang.'],
      },
    ],
    blocks: blocks('p7', { 1: ['p7.change', 'p7.newValue', 'p7.points'], 2: ['p7.change', 'p7.newValue', 'p7.points', 'p7.twoStep'], 3: ['p7.change', 'p7.newValue', 'p7.points', 'p7.twoStep'] }),
  },
  {
    id: 'p8',
    title: 'Zinsrechnen',
    subtitle: 'Wie dein Geld wächst',
    icon: '🏦',
    theory: [
      {
        title: 'Zins ist ein Prozentwert',
        text: ['Kapital K = Grundwert, Zinssatz p = Prozentsatz, Zins Z = Prozentwert.', 'Jahreszins: Z = K · p : 100'],
        example: { question: 'CHF 2\'000 zu 1.5 %. Zins nach einem Jahr?', steps: ['2000 · 1.5 : 100 = CHF 30.00'] },
      },
      {
        title: 'Marchzins (für einen Teil des Jahres)',
        text: ['Banken rechnen mit 360 Tagen pro Jahr und 30 Tagen pro Monat.', 'Z = K · p : 100 · Tage : 360'],
      },
      {
        title: 'Zinseszins',
        text: ['Bleibt der Zins auf dem Konto, wird er im nächsten Jahr mitverzinst.', 'Nach n Jahren: K · (1 + p/100)ⁿ'],
      },
    ],
    blocks: blocks('p8', { 1: ['p8.year', 'p8.findRate'], 2: ['p8.year', 'p8.march', 'p8.findRate', 'p8.compound'], 3: ['p8.year', 'p8.march', 'p8.findRate', 'p8.compound'] }),
  },
  {
    id: 'p9',
    title: 'Meisterprüfung',
    subtitle: 'Alles gemischt – zeig, was du kannst!',
    icon: '👑',
    theory: [
      {
        title: 'Deine Werkzeuge',
        text: ['P = G · p : 100   ·   p = P : G · 100   ·   G = P : p · 100', 'Veränderung: Faktor 1 ± p/100', 'Zuerst immer fragen: Was ist das Ganze? Was ist gesucht?'],
      },
    ],
    blocks: [
      { id: 'p9.b1', title: 'Prüfung Teil 1', difficulty: 2, count: 10, gens: ['p3.text', 'p4.text', 'p5.text', 'p5.identify', 'p6.discount', 'p6.reverse', 'p7.change', 'p7.points', 'p8.year', 'p2.order'] },
      { id: 'p9.b2', title: 'Prüfung Teil 2', difficulty: 3, count: 10, gens: ['p3.basic', 'p4.basic', 'p5.basic', 'p6.discount', 'p6.reverse', 'p6.increase', 'p7.change', 'p7.twoStep', 'p8.march', 'p8.compound'] },
    ],
  },
];

export const percentTopic: Topic = {
  id: 'prozent',
  title: 'Prozentrechnen',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '%',
  description: 'Von «Was ist ein Prozent?» bis Rabatt, Zins und Zinseszins.',
  chapters,
};
