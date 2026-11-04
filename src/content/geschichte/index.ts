import type { Chapter, Subject, TheoryCard, Topic } from '../../core/types';
import { blocks } from '../math/blocks';
import { EREIGNISSE } from './data';

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

/** Theory card with a timeline of the chapter's key events (level 1–2). */
const zeitstrahlKarte = (ch: string, title: string, text: string[]): TheoryCard => ({
  title,
  text,
  visual: { kind: 'timeline', events: EREIGNISSE[ch].filter((e) => e[3] <= 2).map((e) => ({ year: String(e[0]), label: e[1] })) },
});

/** Standard chapter: years, order, timeline, terms. */
const kapitel = (id: string, title: string, subtitle: string, icon: string, theory: TheoryCard[]): Chapter => ({
  id,
  title,
  subtitle,
  icon,
  theory,
  blocks: blocks(id, {
    1: [`hi.${id}.begriff`, `hi.${id}.jahr`, `hi.${id}.reihe`],
    2: [`hi.${id}.begriff`, `hi.${id}.zeitstrahl`, `hi.${id}.reihe`, `hi.${id}.jahr`],
    3: [`hi.${id}.jahrTipp`, `hi.${id}.reihe`, `hi.${id}.zeitstrahl`, `hi.${id}.begriff`],
  }),
});

const schweiz: Topic = {
  id: 'hist-schweiz',
  title: 'Schweizer Geschichte',
  cycle: 3,
  grade: 'Sek 1–3',
  icon: '🇨🇭',
  description: 'Vom Bundesbrief 1291 über den Bundesstaat 1848 bis zum Frauenstimmrecht.',
  chapters: [
    kapitel('ch1', 'Die alte Eidgenossenschaft', '1291 bis 1515', '🛡️', [
      zeitstrahlKarte('ch1', 'Vom Bund zur Eidgenossenschaft', [
        'Uri, Schwyz und Unterwalden verbündeten sich gegen fremde Herrscher, vor allem die Habsburger. Nach und nach kamen Städte wie Luzern, Zürich und Bern dazu.',
        'Geschichten wie die von Wilhelm Tell oder dem Rütlischwur sind Sagen – sie erzählen, wie man sich später an die Anfänge erinnern wollte.',
      ]),
    ]),
    kapitel('ch2', 'Reformation bis Bundesstaat', '1517 bis 1848', '⛪', [
      zeitstrahlKarte('ch2', 'Glaube, Krieg und Neubeginn', [
        'Die Reformation spaltete die Eidgenossenschaft in reformierte und katholische Orte.',
        '1798 marschierte Frankreich ein. Nach dem Sonderbundskrieg entstand 1848 der moderne Bundesstaat mit Bundesrat, Nationalrat und Ständerat.',
      ]),
    ]),
    kapitel('ch3', 'Schweiz im 20. Jahrhundert', 'Landesstreik, Weltkrieg, Frauenstimmrecht', '🗳️', [
      zeitstrahlKarte('ch3', 'Krisen und Reformen', [
        'Im Zweiten Weltkrieg blieb die Schweiz verschont – mit Armee im Réduit, Anbauschlacht und einer umstrittenen Flüchtlingspolitik.',
        'Nach dem Krieg kamen AHV, Wohlstand und – sehr spät – das Frauenstimmrecht (1971).',
      ]),
    ]),
  ],
};

const neuzeit: Topic = {
  id: 'hist-neuzeit',
  title: 'Revolutionen & Industrialisierung',
  cycle: 3,
  grade: 'Sek 1–2',
  icon: '⚙️',
  description: 'Französische Revolution, Napoleon, Dampfmaschine und Soziale Frage.',
  chapters: [
    kapitel('nz1', 'Französische Revolution', 'Freiheit, Gleichheit, Brüderlichkeit', '🇫🇷', [
      zeitstrahlKarte('nz1', 'Vom König zum Kaiser', [
        'Der Dritte Stand zahlte die Steuern, hatte aber kaum Rechte. 1789 stürmte das Volk die Bastille.',
        'Die Revolution brachte Menschenrechte, aber auch Terror. Napoleon beendete sie und machte sich zum Kaiser.',
      ]),
      { title: 'Die drei Stände', text: ['1. Stand: Klerus (Geistliche)', '2. Stand: Adel', '3. Stand: Bürger, Bauern, Handwerker – rund 98 % der Bevölkerung'] },
    ]),
    kapitel('nz2', 'Industrialisierung', 'Maschinen verändern die Welt', '🏭', [
      zeitstrahlKarte('nz2', 'Dampf, Eisen, Eisenbahn', [
        'Maschinen ersetzten Handarbeit. Fabriken entstanden, Menschen zogen in die Städte.',
        'Lange Arbeitstage, Kinderarbeit und Armut nannte man die Soziale Frage. Gewerkschaften und Gesetze wie das Fabrikgesetz von 1877 brachten Verbesserungen.',
      ]),
    ]),
  ],
};

const weltkriege: Topic = {
  id: 'hist-weltkriege',
  title: 'Die Weltkriege',
  cycle: 3,
  grade: 'Sek 2–3',
  icon: '🕊️',
  description: 'Erster Weltkrieg, Nationalsozialismus, Holocaust und Zweiter Weltkrieg.',
  chapters: [
    kapitel('wk1', 'Erster Weltkrieg', '1914–1918', '🪖', [
      zeitstrahlKarte('wk1', 'Der «Grosse Krieg»', [
        'Nach dem Attentat von Sarajevo zogen die Bündnisse Europa in den Krieg: Entente gegen Mittelmächte.',
        'Im Stellungskrieg starben Millionen Soldaten. Der Versailler Vertrag belastete den Frieden.',
      ]),
    ]),
    kapitel('wk2', 'Zweiter Weltkrieg', '1939–1945', '🎖️', [
      zeitstrahlKarte('wk2', 'Diktatur, Krieg und Völkermord', [
        'Ab 1933 errichteten die Nationalsozialisten eine Diktatur. 1939 begann Deutschland mit dem Überfall auf Polen den Krieg.',
        'Im Holocaust ermordeten die Nationalsozialisten rund sechs Millionen Jüdinnen und Juden sowie viele weitere Menschen.',
      ]),
    ]),
  ],
};

const kalterKrieg: Topic = {
  id: 'hist-kalter-krieg',
  title: 'Kalter Krieg',
  cycle: 3,
  grade: 'Sek 3',
  icon: '🧱',
  description: 'Ost gegen West, Berliner Mauer, Kubakrise und das Ende der Sowjetunion.',
  chapters: [
    kapitel('kk1', 'Ost gegen West', '1945–1991', '🚀', [
      zeitstrahlKarte('kk1', 'Zwei Supermächte', [
        'Nach 1945 standen sich die USA und die Sowjetunion gegenüber – mit Wettrüsten, Spionage und Stellvertreterkriegen.',
        'Mit dem Fall der Berliner Mauer 1989 und dem Zerfall der Sowjetunion 1991 endete der Kalte Krieg.',
      ]),
    ]),
  ],
};

const methode: Topic = {
  id: 'hist-methode',
  title: 'Zeit & Quellen',
  cycle: 3,
  grade: 'Sek 1',
  icon: '📜',
  description: 'Jahrhunderte, Epochen und wie man Quellen liest.',
  chapters: [
    {
      id: 'me1',
      title: 'Zeit & Quellen',
      subtitle: 'Werkzeuge der Historikerin',
      icon: '🔎',
      theory: [
        {
          title: 'Jahrhunderte',
          text: ['Das 1. Jahrhundert dauert von Jahr 1 bis 100. Darum liegt 1648 im 17. Jahrhundert und 2000 noch im 20. Jahrhundert.', 'Ein Jahr 0 gibt es nicht: Auf 1 v. Chr. folgt 1 n. Chr.'],
          visual: {
            kind: 'timeline',
            events: [
              { year: '–500', label: 'Antike' },
              { year: '500', label: 'Mittelalter beginnt' },
              { year: '1500', label: 'Neuzeit beginnt' },
              { year: '1914', label: 'Zeitgeschichte' },
            ],
          },
        },
        {
          title: 'Quellen',
          text: ['Primärquellen stammen aus der Zeit selbst: Briefe, Fotos, Urkunden, Gegenstände.', 'Sekundärquellen sind später entstanden: Schulbücher, Dokumentarfilme, Sachbücher.', 'Frage immer: Wer? Wann? Warum? Für wen?'],
        },
      ],
      blocks: blocks('me1', { 1: ['hi.jahrhundert', 'hi.me1.begriff'], 2: ['hi.jahrhundert', 'hi.me1.begriff'], 3: ['hi.jahrhundert', 'hi.me1.begriff'] }),
    },
  ],
};

export const geschichteSubject: Subject = {
  id: 'geschichte',
  name: 'Geschichte',
  icon: '🏛️',
  color: '#a8743a',
  topics: [
    methode,
    schweiz,
    neuzeit,
    weltkriege,
    kalterKrieg,
    planned('hist-antike', 'Antike', 2, '5.–6. Klasse', '🏺', 'Ägypten, Griechen und Römer – auch in der Schweiz.', ['Ägypten', 'Griechenland', 'Römer in Helvetien']),
    planned('hist-mittelalter', 'Mittelalter', 2, '6. Klasse', '🏰', 'Burgen, Klöster, Städte und Rittertum.', ['Leben auf der Burg', 'Klöster', 'Städte und Handel']),
    planned('hist-entdeckungen', 'Entdeckungen & Kolonialismus', 3, 'Sek 1', '⛵', 'Columbus, Kolonien, Sklavenhandel und ihre Folgen.', ['Entdeckungsfahrten', 'Kolonien', 'Sklavenhandel']),
    planned('hist-demokratie', 'Demokratie & Menschenrechte', 3, 'Sek 2–3', '⚖️', 'Wie Demokratie funktioniert und Menschenrechte entstanden.', ['Direkte Demokratie', 'Menschenrechte', 'Gewaltenteilung']),
  ],
};
