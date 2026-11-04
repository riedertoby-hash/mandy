import type { Subject, Topic } from '../../core/types';
import { blocks } from '../math/blocks';
import { KLIMA } from './data';

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

const zurich = KLIMA[0];

const schweiz: Topic = {
  id: 'geo-schweiz',
  title: 'Schweiz',
  cycle: 3,
  grade: 'Sek 1',
  icon: '🇨🇭',
  description: '26 Kantone, Hauptorte, Sprachen, Landschaften, Flüsse und Seen.',
  chapters: [
    {
      id: 'gs1',
      title: 'Kantone & Hauptorte',
      subtitle: 'Von Aarau bis Zug',
      icon: '🏛️',
      theory: [
        {
          title: '26 Kantone',
          text: [
            'Die Schweiz besteht aus 26 Kantonen. Jeder Kanton hat einen Hauptort, wo Regierung und Parlament sitzen.',
            'Bei vielen Kantonen heisst der Hauptort gleich wie der Kanton (Zürich, Bern, Luzern). Merken musst du vor allem die anderen.',
          ],
          visual: {
            kind: 'table',
            rows: [
              ['Uri', 'Altdorf'],
              ['Graubünden', 'Chur'],
              ['Aargau', 'Aarau'],
              ['Thurgau', 'Frauenfeld'],
              ['Tessin', 'Bellinzona'],
              ['Waadt', 'Lausanne'],
              ['Wallis', 'Sitten'],
              ['Jura', 'Delsberg'],
            ],
          },
        },
        {
          title: 'Sprachregionen',
          text: ['Deutsch: Norden, Osten, Zentrum. Französisch: Westen (Romandie). Italienisch: Tessin und Südbünden. Rätoromanisch: Graubünden.', 'Mehrsprachige Kantone: Bern, Freiburg, Wallis, Graubünden.'],
        },
      ],
      blocks: blocks('gs1', { 1: ['geo.hauptortWahl', 'geo.kuerzel'], 2: ['geo.hauptortWahl', 'geo.hauptortTipp', 'geo.sprache'], 3: ['geo.hauptortTipp', 'geo.kuerzel', 'geo.sprache'] }),
    },
    {
      id: 'gs2',
      title: 'Landschaften & Gewässer',
      subtitle: 'Jura, Mittelland, Alpen',
      icon: '🏔️',
      theory: [
        {
          title: 'Drei Grosslandschaften',
          text: ['Jura (ca. 10 %): Kalkfalten im Nordwesten.', 'Mittelland (ca. 30 %): flach bis hügelig, hier leben die meisten Menschen.', 'Alpen (ca. 60 %): hohe Berge, Pässe, Gletscher.'],
        },
        {
          title: 'Wasserschloss Europas',
          text: ['Aus der Schweiz fliesst Wasser in vier Meere:', 'Rhein → Nordsee · Rhone → Mittelmeer · Inn → Donau → Schwarzes Meer · Ticino → Po → Adria'],
        },
      ],
      blocks: blocks('gs2', { all: ['geo.chFakten'] }),
    },
  ],
};

const europaTopic: Topic = {
  id: 'geo-europa',
  title: 'Europa',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '🇪🇺',
  description: 'Länder, Hauptstädte und Nachbarn.',
  chapters: [
    {
      id: 'ge1',
      title: 'Hauptstädte Europas',
      subtitle: 'Von Lissabon bis Kiew',
      icon: '🗼',
      theory: [
        {
          title: 'Merktipps',
          text: ['Unsere Nachbarn: Berlin, Paris, Rom, Wien, Vaduz.', 'Skandinavien: Oslo, Stockholm, Kopenhagen, Helsinki, Reykjavík.', 'Baltikum: Tallinn, Riga, Vilnius (von Norden nach Süden).'],
        },
      ],
      blocks: blocks('ge1', { 1: ['geo.euWahl', 'geo.euLand'], 2: ['geo.euWahl', 'geo.euTipp', 'geo.euLand'], 3: ['geo.euTipp', 'geo.euLand'] }),
    },
    {
      id: 'ge2',
      title: 'Nachbarn & Grenzen',
      subtitle: 'Wer grenzt an wen?',
      icon: '🧭',
      theory: [
        {
          title: 'Nachbarländer',
          text: ['Die Schweiz hat 5 Nachbarn: Deutschland, Frankreich, Italien, Österreich, Liechtenstein.', 'Deutschland hat 9 Nachbarn – so viele wie kein anderes Land in Europa.'],
        },
      ],
      blocks: blocks('ge2', { all: ['geo.nachbar', 'geo.euWahl'] }),
    },
  ],
};

const weltTopic: Topic = {
  id: 'geo-welt',
  title: 'Welt',
  cycle: 3,
  grade: 'Sek 1–3',
  icon: '🌍',
  description: 'Kontinente, Ozeane, Gebirge und Hauptstädte der Welt.',
  chapters: [
    {
      id: 'gw1',
      title: 'Kontinente & Ozeane',
      subtitle: 'Die grossen Räume der Erde',
      icon: '🌐',
      theory: [
        {
          title: 'Sieben Kontinente, fünf Ozeane',
          text: ['Kontinente: Asien, Afrika, Nordamerika, Südamerika, Antarktis, Europa, Australien/Ozeanien (von gross nach klein).', 'Ozeane: Pazifik, Atlantik, Indischer Ozean, Südlicher Ozean, Arktischer Ozean.'],
        },
      ],
      blocks: blocks('gw1', { 1: ['geo.weltFakten', 'geo.kontinent'], 2: ['geo.weltFakten', 'geo.kontinent'], 3: ['geo.weltFakten', 'geo.kontinent'] }),
    },
    {
      id: 'gw2',
      title: 'Hauptstädte der Welt',
      subtitle: 'Achtung Fallen: Sydney, Toronto, Istanbul …',
      icon: '✈️',
      theory: [
        {
          title: 'Nicht immer die grösste Stadt',
          text: ['Australien → Canberra (nicht Sydney)', 'Kanada → Ottawa (nicht Toronto)', 'Türkei → Ankara (nicht Istanbul)', 'Brasilien → Brasília (nicht Rio de Janeiro)'],
        },
      ],
      blocks: blocks('gw2', { 1: ['geo.weltWahl'], 2: ['geo.weltWahl', 'geo.weltTipp'], 3: ['geo.weltTipp', 'geo.weltWahl'] }),
    },
  ],
};

const klimaTopic: Topic = {
  id: 'geo-klima',
  title: 'Klima & Wetter',
  cycle: 3,
  grade: 'Sek 2–3',
  icon: '🌦️',
  description: 'Klimadiagramme lesen, Klimazonen, Föhn, Treibhauseffekt.',
  chapters: [
    {
      id: 'gk1',
      title: 'Klimadiagramme lesen',
      subtitle: 'Linie = Temperatur, Balken = Niederschlag',
      icon: '📊',
      theory: [
        {
          title: 'So liest du ein Klimadiagramm',
          text: [
            'Rote Linie = Durchschnittstemperatur pro Monat (Skala links, °C).',
            'Blaue Balken = Niederschlag pro Monat (Skala rechts, mm).',
            'Jahresschwankung = wärmster minus kältester Monat.',
          ],
          visual: { kind: 'climate', place: zurich[0], temp: zurich[1], precip: zurich[2] },
        },
        {
          title: 'Nord oder Süd?',
          text: ['Ist es im Juli am wärmsten, liegt der Ort auf der Nordhalbkugel. Ist es im Januar am wärmsten, liegt er auf der Südhalbkugel.'],
        },
      ],
      blocks: blocks('gk1', { 1: ['geo.klimaMonat', 'geo.klimaZahl'], 2: ['geo.klimaMonat', 'geo.klimaZahl', 'geo.halbkugel'], 3: ['geo.klimaZahl', 'geo.halbkugel', 'geo.klimaMonat'] }),
    },
    {
      id: 'gk2',
      title: 'Klimazonen & Wetter',
      subtitle: 'Von den Tropen bis zu den Polen',
      icon: '🌡️',
      theory: [
        {
          title: 'Vier Klimazonen',
          text: ['Tropen: das ganze Jahr heiss.', 'Subtropen: heisse Sommer, milde Winter, oft trocken.', 'Gemässigte Zone (Schweiz): vier Jahreszeiten.', 'Kalte Zone: lange, eisige Winter.'],
        },
        {
          title: 'Wetter in der Schweiz',
          text: ['Föhn: warmer, trockener Fallwind aus Süden.', 'Bise: kalter Nordostwind.', 'Pro 100 m Höhe wird es etwa 0,6 °C kälter.'],
        },
      ],
      blocks: blocks('gk2', { 1: ['geo.klimaFakten', 'geo.klimaZone'], 2: ['geo.klimaFakten', 'geo.klimaZone'], 3: ['geo.klimaZone', 'geo.klimaFakten'] }),
    },
  ],
};

const kartenTopic: Topic = {
  id: 'geo-karten',
  title: 'Karten & Orientierung',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '🧭',
  description: 'Himmelsrichtungen, Massstab, Höhenlinien, Gradnetz und Zeitzonen.',
  chapters: [
    {
      id: 'gm1',
      title: 'Orientierung',
      subtitle: 'Himmelsrichtungen und Gradnetz',
      icon: '🧭',
      theory: [
        {
          title: 'Kompassrose',
          text: ['N – NO – O – SO – S – SW – W – NW, im Uhrzeigersinn je 45°.', 'Die Sonne geht im Osten auf, steht mittags im Süden und geht im Westen unter.'],
        },
        {
          title: 'Gradnetz',
          text: ['Breitengrade: parallel zum Äquator (0°) bis zu den Polen (90°).', 'Längengrade: von Pol zu Pol, gezählt ab Greenwich (0°).', 'Bern liegt etwa bei 47° Nord, 7° Ost.'],
        },
      ],
      blocks: blocks('gm1', { 1: ['geo.richtung', 'geo.kartenFakten'], 2: ['geo.richtung', 'geo.kartenFakten'], 3: ['geo.richtung', 'geo.kartenFakten'] }),
    },
    {
      id: 'gm2',
      title: 'Massstab & Zeitzonen',
      subtitle: 'Rechnen mit Karten und Uhren',
      icon: '🕓',
      theory: [
        {
          title: 'Massstab',
          text: ['1 : 25\'000 → 1 cm auf der Karte = 250 m in Wirklichkeit.', '1 : 100\'000 → 1 cm = 1 km.'],
        },
        {
          title: 'Zeitzonen',
          text: ['Die Erde dreht sich in 24 Stunden einmal – also 15° pro Stunde.', 'Nach Osten ist es später, nach Westen früher. Zürich: UTC+1 (Winterzeit), New York: UTC−5 → 6 Stunden früher.'],
        },
      ],
      blocks: blocks('gm2', { 1: ['geo.massstab', 'geo.zeitzone'], 2: ['geo.massstab', 'geo.zeitzone'], 3: ['geo.zeitzone', 'geo.massstab'] }),
    },
  ],
};

export const geografieSubject: Subject = {
  id: 'geografie',
  name: 'Geografie',
  icon: '🗺️',
  color: '#2f9e44',
  topics: [
    schweiz,
    europaTopic,
    weltTopic,
    klimaTopic,
    kartenTopic,
    planned('geo-naturgefahren', 'Naturgefahren', 3, 'Sek 2–3', '🌋', 'Erdbeben, Vulkane, Lawinen, Hochwasser.', ['Plattentektonik', 'Vulkane & Erdbeben', 'Lawinen & Murgänge']),
    planned('geo-bevoelkerung', 'Bevölkerung & Städte', 3, 'Sek 2–3', '🏙️', 'Bevölkerungswachstum, Migration, Verstädterung.', ['Bevölkerungspyramiden', 'Migration', 'Megastädte']),
    planned('geo-wirtschaft', 'Wirtschaft & Globalisierung', 3, 'Sek 3', '🚢', 'Wirtschaftssektoren, Handel, Tourismus.', ['Wirtschaftssektoren', 'Welthandel', 'Tourismus']),
    planned('geo-nachhaltig', 'Ressourcen & Nachhaltigkeit', 3, 'Sek 3', '♻️', 'Energie, Wasser, Klimawandel, Fussabdruck.', ['Energie', 'Wasser', 'Ökologischer Fussabdruck']),
  ],
};
