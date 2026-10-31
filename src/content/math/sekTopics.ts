import type { Topic } from '../../core/types';
import { blocks } from './blocks';

export const proportionalTopic: Topic = {
  id: 'proportional',
  title: 'Proportionalität & Dreisatz',
  cycle: 3,
  grade: 'Sek 1',
  icon: '🔗',
  description: 'Je mehr, desto mehr – oder desto weniger? Dreisatz, Massstab, Alltagsrechnungen.',
  chapters: [
    {
      id: 'pr1',
      title: 'Zusammenhänge erkennen',
      subtitle: 'Proportional, umgekehrt oder keins?',
      icon: '🔍',
      theory: [
        {
          title: 'Proportional',
          text: ['Doppelt so viel → doppelt so viel. Der Quotient y : x bleibt immer gleich.', 'Beispiel: 1 Brötli CHF 0.80, 3 Brötli CHF 2.40.'],
          visual: { kind: 'table', rows: [['Anzahl', '1', '2', '3', '5'], ['Preis (CHF)', '0.80', '1.60', '2.40', '4.00']] },
        },
        {
          title: 'Umgekehrt proportional',
          text: ['Doppelt so viel → halb so viel. Das Produkt x · y bleibt immer gleich.', 'Beispiel: 2 Personen brauchen 6 h, 4 Personen 3 h (2 · 6 = 4 · 3 = 12).'],
          visual: { kind: 'table', rows: [['Personen', '1', '2', '3', '4'], ['Stunden', '12', '6', '4', '3']] },
        },
        {
          title: 'Weder noch',
          text: ['Viele Zusammenhänge sind weder das eine noch das andere – z. B. Alter und Körpergrösse oder ein Tarif mit Grundgebühr.'],
        },
      ],
      blocks: blocks('pr1', { 1: ['pr1.story', 'pr1.table', 'pr1.missing'], 2: ['pr1.story', 'pr1.table', 'pr1.missing'], 3: ['pr1.story', 'pr1.table', 'pr1.missing'] }),
    },
    {
      id: 'pr2',
      title: 'Dreisatz',
      subtitle: 'Über die Einheit zum Ziel',
      icon: '🪜',
      theory: [
        {
          title: 'Drei Schritte',
          text: ['1. Gegebenes aufschreiben.', '2. Auf 1 zurückrechnen (teilen).', '3. Auf die gesuchte Menge hochrechnen (multiplizieren).'],
          example: { question: '4 Hefte kosten CHF 6.00. Wie viel kosten 7 Hefte?', steps: ['4 Hefte ≙ CHF 6.00', '1 Heft ≙ CHF 6.00 : 4 = CHF 1.50', '7 Hefte ≙ CHF 1.50 · 7 = CHF 10.50'] },
        },
      ],
      blocks: blocks('pr2', { 1: ['pr2.price', 'pr2.recipe', 'pr2.distance'], 2: ['pr2.price', 'pr2.recipe', 'pr2.distance', 'pr2.exchange'], 3: ['pr2.price', 'pr2.recipe', 'pr2.distance', 'pr2.exchange'] }),
    },
    {
      id: 'pr3',
      title: 'Umgekehrter Dreisatz',
      subtitle: 'Je mehr, desto weniger',
      icon: '🔄',
      theory: [
        {
          title: 'Erst multiplizieren, dann teilen',
          text: ['Bei umgekehrter Proportionalität rechnest du zuerst aus, wie es mit 1 wäre (multiplizieren), dann teilst du.'],
          example: { question: '3 Personen brauchen 8 Tage. Wie lange brauchen 4 Personen?', steps: ['3 Personen ≙ 8 Tage', '1 Person ≙ 8 · 3 = 24 Tage', '4 Personen ≙ 24 : 4 = 6 Tage'] },
        },
      ],
      blocks: blocks('pr3', { 1: ['pr3.workers', 'pr3.share', 'pr3.food'], 2: ['pr3.workers', 'pr3.travel', 'pr3.food', 'pr3.share'], 3: ['pr3.workers', 'pr3.travel', 'pr3.food', 'pr3.share'] }),
    },
    {
      id: 'pr4',
      title: 'Massstab & Mix',
      subtitle: 'Karten lesen und richtig entscheiden',
      icon: '🗺️',
      theory: [
        {
          title: 'Massstab',
          text: ['1 : 25\'000 heisst: 1 cm auf der Karte sind 25\'000 cm = 250 m in Wirklichkeit.', 'Merke: 100\'000 cm = 1 km.'],
          example: { question: 'Karte 1 : 50\'000, gemessen 6 cm. Wie weit in Wirklichkeit?', steps: ['6 · 50\'000 = 300\'000 cm', '300\'000 cm = 3 km'] },
        },
        {
          title: 'Zuerst entscheiden',
          text: ['Frag dich immer: Je mehr …, desto mehr? → proportional. Je mehr …, desto weniger? → umgekehrt proportional.'],
        },
      ],
      blocks: blocks('pr4', { 1: ['pr4.scale', 'pr4.method', 'pr4.mixed'], 2: ['pr4.scale', 'pr4.method', 'pr4.mixed'], 3: ['pr4.scale', 'pr4.mixed', 'pr4.double'] }),
    },
  ],
};

export const equationTopic: Topic = {
  id: 'gleichungen',
  title: 'Gleichungen',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '⚖️',
  description: 'Gleichungen umformen und lösen – von x + 3 = 8 bis zu Textaufgaben.',
  chapters: [
    {
      id: 'gl1',
      title: 'Ein Schritt',
      subtitle: 'Die Waage im Gleichgewicht',
      icon: '⚖️',
      theory: [
        {
          title: 'Wie eine Waage',
          text: ['Eine Gleichung ist wie eine Waage im Gleichgewicht. Was du links tust, musst du auch rechts tun.', 'Ziel: x steht allein auf einer Seite.'],
          example: { question: 'x + 7 = 12', steps: ['x + 7 = 12   | − 7', 'x = 5'] },
        },
        {
          title: 'Umkehroperationen',
          text: ['+ wird mit − rückgängig gemacht, − mit +.', '· wird mit : rückgängig gemacht, : mit ·.'],
          example: { question: '4x = 28', steps: ['4x = 28   | : 4', 'x = 7'] },
        },
      ],
      blocks: blocks('gl1', { 1: ['gl1.oneStep', 'gl1.inverse'], 2: ['gl1.oneStep', 'gl1.inverse'], 3: ['gl1.oneStep'] }),
    },
    {
      id: 'gl2',
      title: 'Zwei Schritte',
      subtitle: 'Zuerst + / −, dann · / :',
      icon: '👣',
      theory: [
        {
          title: 'Reihenfolge',
          text: ['Bring zuerst die Zahl ohne x weg (mit + oder −), dann teilst du durch die Zahl vor dem x.'],
          example: { question: '3x + 5 = 26', steps: ['3x + 5 = 26   | − 5', '3x = 21   | : 3', 'x = 7'] },
        },
        {
          title: 'Probe machen',
          text: ['Setze deine Lösung ein: 3 · 7 + 5 = 26 ✓. So weisst du sicher, dass sie stimmt.'],
        },
      ],
      blocks: blocks('gl2', { 1: ['gl2.twoStep', 'gl2.check'], 2: ['gl2.twoStep', 'gl2.frac', 'gl2.check'], 3: ['gl2.twoStep', 'gl2.frac'] }),
    },
    {
      id: 'gl3',
      title: 'x auf beiden Seiten',
      subtitle: 'Sortieren und Klammern auflösen',
      icon: '🧹',
      theory: [
        {
          title: 'Sortieren',
          text: ['Bring alle x auf eine Seite (am besten dorthin, wo mehr x stehen) und alle Zahlen auf die andere.'],
          example: { question: '5x + 3 = 2x + 15', steps: ['| − 2x  →  3x + 3 = 15', '| − 3  →  3x = 12', '| : 3  →  x = 4'] },
        },
        {
          title: 'Klammern',
          text: ['Löse Klammern zuerst auf: 3(x + 2) = 3x + 6.'],
          example: { question: '2(x − 4) = 10', steps: ['2x − 8 = 10', '2x = 18', 'x = 9'] },
        },
      ],
      blocks: blocks('gl3', { 1: ['gl3.both'], 2: ['gl3.both', 'gl3.brackets'], 3: ['gl3.both', 'gl3.brackets'] }),
    },
    {
      id: 'gl4',
      title: 'Textaufgaben',
      subtitle: 'Vom Text zur Gleichung',
      icon: '📝',
      theory: [
        {
          title: 'So gehst du vor',
          text: ['1. Was ist gesucht? Das wird x.', '2. Text Stück für Stück übersetzen: «das Dreifache» = 3x, «vermindert um 5» = − 5.', '3. Gleichung lösen und Probe im Text machen.'],
          example: { question: 'Das Dreifache einer Zahl plus 4 ergibt 31.', steps: ['3x + 4 = 31', '3x = 27', 'x = 9'] },
        },
      ],
      blocks: blocks('gl4', { 1: ['gl4.setup', 'gl4.text'], 2: ['gl4.setup', 'gl4.text'], 3: ['gl4.text'] }),
    },
  ],
};

export const pythagorasTopic: Topic = {
  id: 'pythagoras',
  title: 'Satz des Pythagoras',
  cycle: 3,
  grade: 'Sek 2',
  icon: '📐',
  description: 'a² + b² = c² – Seiten im rechtwinkligen Dreieck berechnen.',
  chapters: [
    {
      id: 'py1',
      title: 'Quadrate & Wurzeln',
      subtitle: 'Das Werkzeug für Pythagoras',
      icon: '🟦',
      theory: [
        {
          title: 'Quadrieren',
          text: ['7² = 7 · 7 = 49. Merke dir die Quadratzahlen bis 15² = 225 – das spart viel Zeit.'],
        },
        {
          title: 'Wurzel ziehen',
          text: ['Die Wurzel macht das Quadrieren rückgängig: √49 = 7, weil 7 · 7 = 49.', '√50 ist keine ganze Zahl, liegt aber zwischen 7 und 8 (49 < 50 < 64).'],
        },
      ],
      blocks: blocks('py1', { all: ['py1.square', 'py1.sqrt', 'py1.between'] }),
    },
    {
      id: 'py2',
      title: 'Hypotenuse berechnen',
      subtitle: 'Die längste Seite finden',
      icon: '📏',
      theory: [
        {
          title: 'Der Satz',
          text: ['Im rechtwinkligen Dreieck gilt: a² + b² = c².', 'a und b sind die Katheten (sie bilden den rechten Winkel), c ist die Hypotenuse (gegenüber dem rechten Winkel, die längste Seite).'],
          visual: { kind: 'triangle', a: 'a', b: 'b', c: 'c', highlight: 'c' },
        },
        {
          title: 'Hypotenuse',
          text: ['c = √(a² + b²)'],
          example: { question: 'a = 6 cm, b = 8 cm. Wie lang ist c?', steps: ['c² = 36 + 64 = 100', 'c = √100 = 10 cm'] },
        },
      ],
      blocks: blocks('py2', { 1: ['py2.hyp', 'py2.formula'], 2: ['py2.hyp', 'py2.formula'], 3: ['py2.hyp'] }),
    },
    {
      id: 'py3',
      title: 'Katheten & Anwendungen',
      subtitle: 'Leitern, Bildschirme, Fussballfelder',
      icon: '🪜',
      theory: [
        {
          title: 'Kathete berechnen',
          text: ['Ist eine Kathete gesucht, rechnest du «Hypotenuse² minus die andere Kathete²»: a = √(c² − b²).'],
          example: { question: 'c = 13 cm, b = 5 cm. Wie lang ist a?', steps: ['a² = 169 − 25 = 144', 'a = 12 cm'] },
        },
        {
          title: 'Rechtwinklig?',
          text: ['Gilt a² + b² = c² für die drei Seiten, dann ist das Dreieck rechtwinklig – sonst nicht.'],
        },
      ],
      blocks: blocks('py3', { 1: ['py3.leg', 'py3.apply'], 2: ['py3.leg', 'py3.apply', 'py3.isRight'], 3: ['py3.leg', 'py3.apply', 'py3.isRight'] }),
    },
  ],
};
