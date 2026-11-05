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

const zelle: Topic = {
  id: 'bio-zelle',
  title: 'Zelle & Mikroskop',
  cycle: 3,
  grade: 'Sek 1',
  icon: '🔬',
  description: 'Bau von Pflanzen- und Tierzellen, Mikroskopieren und Vergrösserung.',
  chapters: [
    {
      id: 'bz1',
      title: 'Die Zelle',
      subtitle: 'Kleinste Einheit des Lebens',
      icon: '🧫',
      theory: [
        {
          title: 'Pflanzen- und Tierzelle',
          text: ['Beide haben Zellkern, Zellmembran, Zellplasma und Mitochondrien.', 'Nur Pflanzenzellen haben Zellwand, Chloroplasten und eine grosse Vakuole.'],
          visual: {
            kind: 'table',
            rows: [
              ['', 'Pflanze', 'Tier'],
              ['Zellkern', '✓', '✓'],
              ['Zellmembran', '✓', '✓'],
              ['Mitochondrien', '✓', '✓'],
              ['Zellwand', '✓', '–'],
              ['Chloroplasten', '✓', '–'],
              ['grosse Vakuole', '✓', '–'],
            ],
          },
        },
        { title: 'Vom Kleinen zum Grossen', text: ['Zelle → Gewebe → Organ → Organsystem → Organismus'] },
      ],
      blocks: blocks('bz1', { 1: ['bio.bz1.fakt', 'bio.organisation'], 2: ['bio.bz1.fakt', 'bio.organisation'], 3: ['bio.bz1.fakt'] }),
    },
    {
      id: 'bz2',
      title: 'Mikroskopieren',
      subtitle: 'Okular mal Objektiv',
      icon: '🔍',
      theory: [
        {
          title: 'Vergrösserung',
          text: ['Gesamtvergrösserung = Okular · Objektiv. Beispiel: 10 · 40 = 400-fach.', 'Wirkliche Grösse = Bildgrösse : Vergrösserung. 1 mm = 1000 µm (Mikrometer).'],
          example: { question: 'Bei 400-facher Vergrösserung erscheint eine Zelle 20 mm gross.', steps: ['20 mm : 400 = 0.05 mm', '0.05 mm = 50 µm'] },
        },
      ],
      blocks: blocks('bz2', { 1: ['bio.mikroskop', 'bio.bz2.fakt'], 2: ['bio.mikroskop', 'bio.bz2.fakt'], 3: ['bio.mikroskop', 'bio.bz2.fakt'] }),
    },
  ],
};

const mensch: Topic = {
  id: 'bio-mensch',
  title: 'Der menschliche Körper',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '🫀',
  description: 'Ernährung und Verdauung, Herz, Blut und Atmung.',
  chapters: [
    {
      id: 'bm1',
      title: 'Ernährung & Verdauung',
      subtitle: 'Der Weg der Nahrung',
      icon: '🍎',
      theory: [
        {
          title: 'Nährstoffe',
          text: ['Kohlenhydrate und Fette liefern Energie, Eiweisse bauen den Körper auf.', 'Vitamine, Mineralstoffe, Ballaststoffe und Wasser braucht der Körper ebenfalls.'],
        },
        {
          title: 'Der Verdauungsweg',
          text: ['Mund (zerkleinern, Speichel) → Speiseröhre → Magen (Säure) → Dünndarm (Nährstoffe ins Blut) → Dickdarm (Wasser entziehen).'],
          visual: { kind: 'timeline', events: ['Mund', 'Speiseröhre', 'Magen', 'Dünndarm', 'Dickdarm'].map((x, i) => ({ year: `${i + 1}.`, label: x })) },
        },
      ],
      blocks: blocks('bm1', { 1: ['bio.bm1.fakt', 'bio.verdauungsweg'], 2: ['bio.bm1.fakt', 'bio.verdauungsweg'], 3: ['bio.bm1.fakt', 'bio.verdauungsweg'] }),
    },
    {
      id: 'bm2',
      title: 'Herz, Blut & Atmung',
      subtitle: 'Der doppelte Kreislauf',
      icon: '❤️',
      theory: [
        {
          title: 'Zwei Kreisläufe',
          text: ['Lungenkreislauf: rechte Herzhälfte → Lunge → linke Herzhälfte. Hier nimmt das Blut Sauerstoff auf.', 'Körperkreislauf: linke Herzhälfte → Körper → rechte Herzhälfte. Hier gibt das Blut Sauerstoff und Nährstoffe ab.'],
        },
        {
          title: 'Blut',
          text: ['Rote Blutkörperchen: Sauerstoff · Weisse Blutkörperchen: Abwehr · Blutplättchen: Gerinnung', 'Arterien führen vom Herzen weg, Venen zum Herzen hin.'],
        },
      ],
      blocks: blocks('bm2', { 1: ['bio.bm2.fakt', 'bio.atemweg', 'bio.puls'], 2: ['bio.bm2.fakt', 'bio.blutweg', 'bio.puls'], 3: ['bio.blutweg', 'bio.puls', 'bio.bm2.fakt'] }),
    },
  ],
};

const oeko: Topic = {
  id: 'bio-oeko',
  title: 'Ökologie',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '🌳',
  description: 'Nahrungsketten, Energiefluss, Fotosynthese und Zellatmung.',
  chapters: [
    {
      id: 'bo1',
      title: 'Nahrungsketten',
      subtitle: 'Wer frisst wen?',
      icon: '🦊',
      theory: [
        {
          title: 'Rollen im Ökosystem',
          text: ['Produzenten (Pflanzen) → Konsumenten 1. Ordnung (Pflanzenfresser) → Konsumenten 2. Ordnung (Fleischfresser) …', 'Destruenten (Pilze, Bakterien, Regenwürmer) zersetzen tote Lebewesen.'],
          visual: { kind: 'timeline', events: [{ year: 'P', label: 'Gras' }, { year: 'K1', label: 'Heuschrecke' }, { year: 'K2', label: 'Frosch' }, { year: 'K3', label: 'Storch' }] },
        },
        { title: '10-%-Regel', text: ['Pro Stufe werden nur etwa 10 % der Energie weitergegeben. Darum gibt es viel mehr Pflanzen als Raubtiere.'] },
      ],
      blocks: blocks('bo1', { 1: ['bio.kette', 'bio.rolle', 'bio.bo1.fakt'], 2: ['bio.kette', 'bio.rolle', 'bio.energie', 'bio.bo1.fakt'], 3: ['bio.energie', 'bio.rolle', 'bio.bo1.fakt'] }),
    },
    {
      id: 'bo2',
      title: 'Fotosynthese & Zellatmung',
      subtitle: 'Energie aus Licht',
      icon: '☀️',
      theory: [
        {
          title: 'Fotosynthese',
          text: ['Kohlenstoffdioxid + Wasser → (mit Licht) → Traubenzucker + Sauerstoff', 'Sie findet in den Chloroplasten statt.'],
        },
        { title: 'Zellatmung', text: ['Traubenzucker + Sauerstoff → Kohlenstoffdioxid + Wasser + Energie', 'Sie findet in den Mitochondrien statt – bei Pflanzen und Tieren.'] },
      ],
      blocks: blocks('bo2', { all: ['bio.bo2.fakt'] }),
    },
  ],
};

const tiere: Topic = {
  id: 'bio-tiere',
  title: 'Wirbeltiere',
  cycle: 3,
  grade: 'Sek 1',
  icon: '🐸',
  description: 'Fische, Amphibien, Reptilien, Vögel und Säugetiere erkennen.',
  chapters: [
    {
      id: 'bt1',
      title: 'Die fünf Klassen',
      subtitle: 'Vom Hai bis zum Schnabeltier',
      icon: '🦎',
      theory: [
        {
          title: 'Merkmale',
          text: ['Alle Wirbeltiere haben eine Wirbelsäule.'],
          visual: {
            kind: 'table',
            rows: [
              ['Fische', 'Kiemen, Schuppen', 'wechselwarm'],
              ['Amphibien', 'feuchte Haut, Larve im Wasser', 'wechselwarm'],
              ['Reptilien', 'Hornschuppen, Eier an Land', 'wechselwarm'],
              ['Vögel', 'Federn, Schnabel, Eier', 'gleichwarm'],
              ['Säugetiere', 'Fell, Milch für die Jungen', 'gleichwarm'],
            ],
          },
        },
      ],
      blocks: blocks('bt1', { 1: ['bio.klasse', 'bio.merkmale'], 2: ['bio.klasse', 'bio.merkmale'], 3: ['bio.klasse', 'bio.merkmale'] }),
    },
  ],
};

const genetik: Topic = {
  id: 'bio-genetik',
  title: 'Vererbung',
  cycle: 3,
  grade: 'Sek 3',
  icon: '🧬',
  description: 'DNA, Chromosomen, Mendel und Kreuzungsschemata.',
  chapters: [
    {
      id: 'bg1',
      title: 'Mendels Regeln',
      subtitle: 'Kreuzungsschema rechnen',
      icon: '🫛',
      theory: [
        {
          title: 'Dominant und rezessiv',
          text: ['Jedes Lebewesen hat für ein Merkmal zwei Anlagen – eine von jedem Elternteil.', 'Grossbuchstabe = dominant (setzt sich durch), Kleinbuchstabe = rezessiv (zeigt sich nur doppelt: aa).'],
        },
        {
          title: 'Kreuzungsschema',
          text: ['Schreibe die Anlagen der Eltern an den Rand und kombiniere sie.'],
          visual: { kind: 'table', rows: [['Gg × Gg', 'G', 'g'], ['G', 'GG', 'Gg'], ['g', 'Gg', 'gg']] },
          example: { question: 'Wie viele gelbe Erbsen (G dominant) bei Gg × Gg?', steps: ['GG, Gg, Gg sind gelb, gg ist grün', '3 von 4 → 75 % gelb'] },
        },
      ],
      blocks: blocks('bg1', { 1: ['bio.punnett', 'bio.bg2.fakt'], 2: ['bio.punnett'], 3: ['bio.punnett'] }),
    },
    {
      id: 'bg2',
      title: 'DNA & Evolution',
      subtitle: 'Gene, Chromosomen, Darwin',
      icon: '🐒',
      theory: [
        {
          title: 'Erbinformation',
          text: ['Die DNA im Zellkern ist in Chromosomen verpackt. Menschen haben 46 Chromosomen (23 Paare).', 'Ein Gen ist ein Abschnitt der DNA.'],
        },
        { title: 'Evolution', text: ['Lebewesen unterscheiden sich (Variation). Besser angepasste überleben häufiger und vererben ihre Merkmale (Selektion).'] },
      ],
      blocks: blocks('bg2', { all: ['bio.bg2.fakt'] }),
    },
  ],
};

export const biologieSubject: Subject = {
  id: 'biologie',
  name: 'Biologie',
  icon: '🌿',
  color: '#37b24d',
  topics: [
    zelle,
    mensch,
    oeko,
    tiere,
    genetik,
    planned('bio-pflanzen', 'Pflanzen', 2, '5.–6. Klasse', '🌻', 'Aufbau der Blütenpflanze, Bestäubung, Samen.', ['Blüte & Bestäubung', 'Samen & Keimung']),
    planned('bio-sinne', 'Sinne & Nerven', 3, 'Sek 2', '👁️', 'Auge, Ohr, Haut, Nervensystem und Reflexe.', ['Auge', 'Ohr', 'Nervensystem']),
    planned('bio-gesundheit', 'Gesundheit & Pubertät', 3, 'Sek 1–2', '🩺', 'Immunsystem, Sucht, Pubertät.', ['Immunsystem', 'Sucht & Prävention', 'Pubertät']),
  ],
};
