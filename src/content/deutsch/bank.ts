// Sprachmaterial Deutsch (Sek 1–3, Schweizer Rechtschreibung: ss statt ß).
// Alle Sätze sind von Hand geschrieben – nichts wird automatisch konjugiert oder dekliniert.

import type { Difficulty } from '../../core/types';

// ---------------------------------------------------------------------------
// Rechtschreibung
// ---------------------------------------------------------------------------

/** [Satz mit ___, Lösung, Begründung, Stufe] */
export const DAS_DASS: [string, 'das' | 'dass', string, Difficulty][] = [
  ['Ich hoffe, ___ du morgen kommst.', 'dass', 'Konjunktion nach «hoffen» – lässt sich nicht durch «dieses/welches» ersetzen.', 1],
  ['___ Velo steht vor der Tür.', 'das', 'Artikel – ersetzbar durch «dieses».', 1],
  ['Das Buch, ___ ich lese, ist spannend.', 'das', 'Relativpronomen – ersetzbar durch «welches».', 1],
  ['Sie weiss, ___ die Prüfung schwierig war.', 'dass', 'Konjunktion nach «wissen».', 1],
  ['Hast du ___ gehört?', 'das', 'Pronomen – ersetzbar durch «dieses».', 1],
  ['Es ist schön, ___ du da bist.', 'dass', 'Konjunktion – leitet einen Nebensatz ein.', 1],
  ['Wir glauben, ___ es morgen regnet.', 'dass', 'Konjunktion nach «glauben».', 1],
  ['Das Haus, ___ am See steht, gehört meinem Onkel.', 'das', 'Relativpronomen – ersetzbar durch «welches».', 1],
  ['Ich finde es super, ___ wir zusammen ins Lager gehen.', 'dass', 'Konjunktion.', 2],
  ['___ ist mir egal.', 'das', 'Pronomen – ersetzbar durch «dieses».', 2],
  ['Er war so müde, ___ er sofort einschlief.', 'dass', '«so …, dass» – Konjunktion.', 2],
  ['Das Lied, ___ im Radio läuft, kenne ich.', 'das', 'Relativpronomen.', 2],
  ['___ du das weisst, überrascht mich.', 'dass', 'Konjunktion am Satzanfang – ersetzbar durch «Die Tatsache, dass …».', 2],
  ['Ich habe vergessen, ___ heute Training ist.', 'dass', 'Konjunktion nach «vergessen».', 2],
  ['Kennst du das Mädchen, ___ dort drüben steht?', 'das', 'Relativpronomen – ersetzbar durch «welches».', 2],
  ['Das Beste, ___ du tun kannst, ist üben.', 'das', 'Relativpronomen nach «das Beste».', 3],
  ['Es ist wichtig, ___ man genug schläft.', 'dass', 'Konjunktion.', 3],
  ['Ohne ___ er es merkte, war der Bus weg.', 'dass', '«ohne dass» – Konjunktion.', 3],
  ['Das Ergebnis, ___ wir erreicht haben, freut alle.', 'das', 'Relativpronomen.', 3],
  ['Ich verspreche dir, ___ ich pünktlich bin.', 'dass', 'Konjunktion nach «versprechen».', 3],
  ['Das Gerücht, ___ die Schule ausfällt, stimmt nicht.', 'dass', 'Achtung: Hier erklärt der Nebensatz den Inhalt des Gerüchts – ersetzbar weder durch «welches» noch «dieses» → Konjunktion.', 3],
];

/** [Satz mit (?) Platzhalter, klein, gross, richtig, Begründung, Stufe] */
export const GROSS_KLEIN: [string, string, string, 'klein' | 'gross', string, Difficulty][] = [
  ['Beim ___ habe ich mir den Fuss verletzt.', 'joggen', 'Joggen', 'gross', 'Nominalisierung: «beim» (= bei dem) macht das Verb zum Nomen.', 1],
  ['Wir gehen am ___ ins Kino.', 'abend', 'Abend', 'gross', '«am Abend» – Nomen nach Artikel.', 1],
  ['Ich trainiere ___ nach der Schule.', 'montags', 'Montags', 'klein', 'Zeitangaben mit -s (montags, abends) sind Adverbien → klein.', 1],
  ['Das ___ fällt mir schwer.', 'schreiben', 'Schreiben', 'gross', 'Artikel «das» → Nominalisierung.', 1],
  ['Heute ___ treffen wir uns.', 'abend', 'Abend', 'gross', '«heute Abend» – die Tageszeit nach heute/morgen/gestern wird gross geschrieben.', 1],
  ['Sie hat etwas ___ erlebt.', 'spannendes', 'Spannendes', 'gross', '«etwas» + Adjektiv → Nominalisierung.', 1],
  ['Er kommt immer ___ nach Hause.', 'spät', 'Spät', 'klein', 'Adjektiv/Adverb ohne Begleiter → klein.', 1],
  ['Ich wünsche dir alles ___!', 'gute', 'Gute', 'gross', '«alles» + Adjektiv → Nominalisierung.', 2],
  ['Zum ___ braucht man Geduld.', 'lernen', 'Lernen', 'gross', '«zum» (= zu dem) → Nominalisierung.', 2],
  ['Das ist nichts ___.', 'neues', 'Neues', 'gross', '«nichts» + Adjektiv → Nominalisierung.', 2],
  ['Wir haben viel ___ gelacht.', 'zusammen', 'Zusammen', 'klein', 'Adverb → klein.', 2],
  ['Sie ist die ___ in der Klasse.', 'schnellste', 'Schnellste', 'gross', 'Artikel «die» + Adjektiv ohne Nomen → Nominalisierung.', 2],
  ['Mir ist ___ geworden.', 'kalt', 'Kalt', 'klein', 'Adjektiv ohne Begleiter → klein.', 2],
  ['Er hat beim ___ gewonnen.', 'jassen', 'Jassen', 'gross', '«beim» → Nominalisierung.', 2],
  ['Das ist mir im ___ klar.', 'grossen und ganzen', 'Grossen und Ganzen', 'gross', 'Feste Wendung «im Grossen und Ganzen» → gross.', 3],
  ['Wir kommen ___ wieder.', 'morgen', 'Morgen', 'klein', '«morgen» als Zeitangabe (= am nächsten Tag) → klein.', 3],
  ['Er trainiert am ___ vor der Schule.', 'morgen', 'Morgen', 'gross', '«am Morgen» → Nomen nach Artikel.', 3],
  ['Viel ___ ist passiert.', 'schlimmes', 'Schlimmes', 'gross', '«viel» + Adjektiv → Nominalisierung.', 3],
  ['Sie hat es ___ gesagt.', 'auf deutsch', 'auf Deutsch', 'gross', '«auf Deutsch» (die Sprache) → gross.', 3],
  ['Er spricht gut ___.', 'englisch', 'Englisch', 'gross', 'Sprache als Nomen («gut Englisch sprechen») → gross.', 3],
  ['Das ___ Ergebnis überrascht.', 'neue', 'Neue', 'klein', 'Hier ist «neue» ein Adjektiv vor dem Nomen «Ergebnis» → klein.', 3],
];

/** [Satz mit ___, richtig, falsch, Erklärung, Stufe] */
export const VERWECHSLUNG: [string, string, string, string, Difficulty][] = [
  ['Ihr ___ heute aber früh!', 'seid', 'seit', '«seid» kommt von «sein» (ihr seid). «seit» ist eine Zeitangabe.', 1],
  ['Ich wohne ___ drei Jahren in Bern.', 'seit', 'seid', '«seit» = Zeitangabe.', 1],
  ['Das ist ___!', 'wahr', 'war', '«wahr» = richtig, stimmt. «war» = Vergangenheit von sein.', 1],
  ['Gestern ___ es kalt.', 'war', 'wahr', '«war» = Präteritum von «sein».', 1],
  ['Kommst du ___?', 'wieder', 'wider', '«wieder» = noch einmal.', 1],
  ['Der Vogel ist ___.', 'tot', 'tod', '«tot» (Adjektiv) mit t. «der Tod» (Nomen) mit d.', 2],
  ['Er hatte Angst vor dem ___.', 'Tod', 'Tot', '«der Tod» = Nomen mit d.', 2],
  ['Das Glas ___ vom Tisch.', 'fiel', 'viel', '«fiel» = fallen (Präteritum). «viel» = eine Menge.', 2],
  ['Wir haben ___ Spass.', 'viel', 'fiel', '«viel» = eine Menge.', 2],
  ['Er sprach ___ die Regel.', 'wider', 'wieder', '«wider» = gegen.', 2],
  ['Sie singt ein schönes ___.', 'Lied', 'Lid', '«das Lied» = Gesang. «das Lid» = Augenlid.', 2],
  ['Die Gitarre hat eine ___ verloren.', 'Saite', 'Seite', '«die Saite» am Instrument. «die Seite» im Buch.', 3],
  ['Auf ___ 12 steht die Lösung.', 'Seite', 'Saite', '«die Seite» im Buch.', 3],
  ['Wir ___ ein Bild.', 'malen', 'mahlen', '«malen» = Bilder. «mahlen» = Kaffee, Korn.', 3],
  ['Die Mühle ___ das Korn.', 'mahlt', 'malt', '«mahlen» = zerkleinern.', 3],
  ['Das ist ___lich klar.', 'end', 'ent', '«endlich» kommt von «Ende» → end-.', 3],
  ['Ich muss mich ___scheiden.', 'ent', 'end', 'Vorsilbe «ent-» (entscheiden, entdecken).', 3],
  ['Die Lehrerin ___ uns Mathe.', 'lehrt', 'leert', '«lehren» = unterrichten. «leeren» = leer machen.', 3],
  ['Er ___ den Abfalleimer.', 'leert', 'lehrt', '«leeren» = leer machen.', 3],
];

// ---------------------------------------------------------------------------
// Grammatik
// ---------------------------------------------------------------------------

export const WORTARTEN = ['Nomen', 'Verb', 'Adjektiv', 'Pronomen', 'Partikel'] as const;
export type Wortart = (typeof WORTARTEN)[number];
export const PARTIKELN = ['Präposition', 'Konjunktion', 'Adverb', 'Interjektion'] as const;

/** [Satz, markiertes Wort, Wortart, Partikel-Art (falls Partikel), Stufe] */
export const WORTART_BANK: [string, string, Wortart, (typeof PARTIKELN)[number] | null, Difficulty][] = [
  ['Der Hund bellt laut.', 'Hund', 'Nomen', null, 1],
  ['Der Hund bellt laut.', 'bellt', 'Verb', null, 1],
  ['Der Hund bellt laut.', 'laut', 'Adjektiv', null, 1],
  ['Der Hund bellt laut.', 'Der', 'Pronomen', null, 2],
  ['Mandy liest ein spannendes Buch.', 'spannendes', 'Adjektiv', null, 1],
  ['Mandy liest ein spannendes Buch.', 'liest', 'Verb', null, 1],
  ['Wir fahren mit dem Zug nach Luzern.', 'mit', 'Partikel', 'Präposition', 2],
  ['Wir fahren mit dem Zug nach Luzern.', 'Wir', 'Pronomen', null, 1],
  ['Ich bleibe zu Hause, weil ich krank bin.', 'weil', 'Partikel', 'Konjunktion', 2],
  ['Er kommt morgen zurück.', 'morgen', 'Partikel', 'Adverb', 2],
  ['Au! Das tut weh.', 'Au', 'Partikel', 'Interjektion', 2],
  ['Die Freude war gross.', 'Freude', 'Nomen', null, 1],
  ['Die Freude war gross.', 'gross', 'Adjektiv', null, 1],
  ['Das Schwimmen macht Spass.', 'Schwimmen', 'Nomen', null, 2],
  ['Sie hat ihr Velo repariert.', 'ihr', 'Pronomen', null, 2],
  ['Sie hat ihr Velo repariert.', 'repariert', 'Verb', null, 2],
  ['Der Ball liegt unter dem Tisch.', 'unter', 'Partikel', 'Präposition', 2],
  ['Wir gehen ins Kino oder bleiben hier.', 'oder', 'Partikel', 'Konjunktion', 3],
  ['Wir gehen ins Kino oder bleiben hier.', 'hier', 'Partikel', 'Adverb', 3],
  ['Das Haus, das dort steht, ist alt.', 'das', 'Pronomen', null, 3],
  ['Etwas Schönes ist passiert.', 'Schönes', 'Nomen', null, 3],
  ['Er rennt schneller als ich.', 'schneller', 'Adjektiv', null, 3],
  ['Er rennt schneller als ich.', 'als', 'Partikel', 'Konjunktion', 3],
  ['Leider regnet es heute.', 'Leider', 'Partikel', 'Adverb', 3],
  ['Trotz des Regens spielen wir.', 'Trotz', 'Partikel', 'Präposition', 3],
];

export const FAELLE = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'] as const;
export type Fall = (typeof FAELLE)[number];
export const FRAGEN: Record<Fall, string> = { Nominativ: 'Wer oder was?', Akkusativ: 'Wen oder was?', Dativ: 'Wem?', Genitiv: 'Wessen?' };

/** [Satz, markierte Wortgruppe, Fall, Stufe] */
export const FALL_BANK: [string, string, Fall, Difficulty][] = [
  ['Der Lehrer erklärt die Aufgabe.', 'Der Lehrer', 'Nominativ', 1],
  ['Der Lehrer erklärt die Aufgabe.', 'die Aufgabe', 'Akkusativ', 1],
  ['Ich schenke meiner Mutter Blumen.', 'meiner Mutter', 'Dativ', 1],
  ['Ich schenke meiner Mutter Blumen.', 'Blumen', 'Akkusativ', 2],
  ['Das ist das Velo meines Bruders.', 'meines Bruders', 'Genitiv', 1],
  ['Wir besuchen den Zoo.', 'den Zoo', 'Akkusativ', 1],
  ['Mandy hilft dem Nachbarn.', 'dem Nachbarn', 'Dativ', 1],
  ['Der Hund spielt im Garten.', 'Der Hund', 'Nominativ', 1],
  ['Sie gibt dem Kind einen Ball.', 'einen Ball', 'Akkusativ', 2],
  ['Sie gibt dem Kind einen Ball.', 'dem Kind', 'Dativ', 2],
  ['Die Farbe des Autos gefällt mir.', 'des Autos', 'Genitiv', 2],
  ['Die Farbe des Autos gefällt mir.', 'mir', 'Dativ', 2],
  ['Ich sehe dich morgen.', 'dich', 'Akkusativ', 2],
  ['Das Buch gehört der Bibliothek.', 'der Bibliothek', 'Dativ', 2],
  ['Der Trainer lobt die Mannschaft.', 'die Mannschaft', 'Akkusativ', 2],
  ['Wegen des Sturms fällt das Spiel aus.', 'des Sturms', 'Genitiv', 3],
  ['Wegen des Sturms fällt das Spiel aus.', 'das Spiel', 'Nominativ', 3],
  ['Mit dem Zug sind wir schneller.', 'dem Zug', 'Dativ', 3],
  ['Er wartet auf den Bus.', 'den Bus', 'Akkusativ', 3],
  ['Trotz des Regens joggt sie.', 'des Regens', 'Genitiv', 3],
  ['Ihr gefällt der neue Film.', 'Ihr', 'Dativ', 3],
  ['Ihr gefällt der neue Film.', 'der neue Film', 'Nominativ', 3],
];

/** Artikel einsetzen: [vor, nach, Lösung, Fall, Erklärung, Stufe] */
export const ARTIKEL_BANK: [string, string, string, Fall, string, Difficulty][] = [
  ['Ich helfe', 'Nachbarin.', 'der', 'Dativ', '«helfen» verlangt den Dativ: Wem helfe ich? – der Nachbarin.', 1],
  ['Wir besuchen', 'Grossvater.', 'den', 'Akkusativ', 'Wen besuchen wir? – den Grossvater.', 1],
  ['Das Spielzeug', 'Kindes liegt hier.', 'des', 'Genitiv', 'Wessen Spielzeug? – des Kindes.', 2],
  ['Ich gebe', 'Hund einen Knochen.', 'dem', 'Dativ', 'Wem gebe ich ihn? – dem Hund.', 1],
  ['Sie sucht', 'Schlüssel.', 'den', 'Akkusativ', 'Wen oder was sucht sie? – den Schlüssel.', 1],
  ['Er dankt', 'Lehrerin.', 'der', 'Dativ', '«danken» verlangt den Dativ.', 2],
  ['Wir fahren mit', 'Velo.', 'dem', 'Dativ', '«mit» verlangt immer den Dativ.', 2],
  ['Ich warte auf', 'Zug.', 'den', 'Akkusativ', '«warten auf» + Akkusativ.', 2],
  ['Trotz', 'Kälte gehen wir raus.', 'der', 'Genitiv', '«trotz» verlangt den Genitiv.', 3],
  ['Wegen', 'Gewitters fällt das Konzert aus.', 'des', 'Genitiv', '«wegen» verlangt den Genitiv.', 3],
  ['Das Buch liegt auf', 'Tisch.', 'dem', 'Dativ', 'Wo? → Dativ (auf dem Tisch).', 3],
  ['Ich lege das Buch auf', 'Tisch.', 'den', 'Akkusativ', 'Wohin? → Akkusativ (auf den Tisch).', 3],
];

export const SATZGLIEDER = ['Subjekt', 'Prädikat (Verb)', 'Akkusativobjekt', 'Dativobjekt', 'Adverbiale'] as const;
export type Satzglied = (typeof SATZGLIEDER)[number];

/** [Satz, markiertes Satzglied, Art, Stufe] */
export const SATZGLIED_BANK: [string, string, Satzglied, Difficulty][] = [
  ['Mandy trinkt am Morgen einen Tee.', 'Mandy', 'Subjekt', 1],
  ['Mandy trinkt am Morgen einen Tee.', 'trinkt', 'Prädikat (Verb)', 1],
  ['Mandy trinkt am Morgen einen Tee.', 'einen Tee', 'Akkusativobjekt', 1],
  ['Mandy trinkt am Morgen einen Tee.', 'am Morgen', 'Adverbiale', 2],
  ['Der Trainer erklärt den Spielerinnen die Taktik.', 'den Spielerinnen', 'Dativobjekt', 2],
  ['Der Trainer erklärt den Spielerinnen die Taktik.', 'die Taktik', 'Akkusativobjekt', 2],
  ['Der Trainer erklärt den Spielerinnen die Taktik.', 'Der Trainer', 'Subjekt', 1],
  ['Im Sommer schwimmen wir im See.', 'wir', 'Subjekt', 2],
  ['Im Sommer schwimmen wir im See.', 'im See', 'Adverbiale', 2],
  ['Meine Schwester schreibt ihrer Freundin einen Brief.', 'ihrer Freundin', 'Dativobjekt', 2],
  ['Meine Schwester schreibt ihrer Freundin einen Brief.', 'einen Brief', 'Akkusativobjekt', 2],
  ['Wegen des Regens bleiben die Kinder drinnen.', 'Wegen des Regens', 'Adverbiale', 3],
  ['Wegen des Regens bleiben die Kinder drinnen.', 'die Kinder', 'Subjekt', 3],
  ['Gestern hat uns der Lehrer eine Geschichte vorgelesen.', 'uns', 'Dativobjekt', 3],
  ['Gestern hat uns der Lehrer eine Geschichte vorgelesen.', 'hat … vorgelesen', 'Prädikat (Verb)', 3],
  ['Gestern hat uns der Lehrer eine Geschichte vorgelesen.', 'der Lehrer', 'Subjekt', 3],
];

/** Umstellprobe: Satzglieder als Kärtchen, mehrere Reihenfolgen richtig (Verb immer an 2. Stelle). */
export const UMSTELL_BANK: { tiles: string[]; answers: string[] }[] = [
  {
    tiles: ['Mandy', 'trinkt', 'am Morgen', 'einen Tee'],
    answers: ['Mandy trinkt am Morgen einen Tee', 'Am Morgen trinkt Mandy einen Tee', 'Einen Tee trinkt Mandy am Morgen'],
  },
  {
    tiles: ['Wir', 'fahren', 'im Sommer', 'nach Italien'],
    answers: ['Wir fahren im Sommer nach Italien', 'Im Sommer fahren wir nach Italien', 'Nach Italien fahren wir im Sommer'],
  },
  {
    tiles: ['Der Hund', 'bellt', 'in der Nacht'],
    answers: ['Der Hund bellt in der Nacht', 'In der Nacht bellt der Hund'],
  },
  {
    tiles: ['Die Lehrerin', 'erklärt', 'uns', 'die Aufgabe'],
    answers: ['Die Lehrerin erklärt uns die Aufgabe', 'Uns erklärt die Lehrerin die Aufgabe', 'Die Aufgabe erklärt uns die Lehrerin'],
  },
  {
    tiles: ['Tom', 'spielt', 'jeden Mittwoch', 'Fussball'],
    answers: ['Tom spielt jeden Mittwoch Fussball', 'Jeden Mittwoch spielt Tom Fussball', 'Fussball spielt Tom jeden Mittwoch'],
  },
];

// ---------------------------------------------------------------------------
// Verben
// ---------------------------------------------------------------------------

export const PERSONEN = ['Ich', 'Du', 'Mandy', 'Wir', 'Ihr', 'Tom und Lisa'] as const;
export type PersonIndex = 0 | 1 | 2 | 3 | 4 | 5;

const HABEN = { praes: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'], praet: ['hatte', 'hattest', 'hatte', 'hatten', 'hattet', 'hatten'] };
const SEIN = { praes: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'], praet: ['war', 'warst', 'war', 'waren', 'wart', 'waren'] };
export const WERDEN = ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'];
export const AUX = { haben: HABEN, sein: SEIN };

export interface GVerb {
  inf: string;
  praes: string[];
  praet: string[];
  part: string;
  aux: 'haben' | 'sein';
  /** Ergänzung, z. B. «ins Kino» */
  obj: string;
}

export const GVERBEN: GVerb[] = [
  { inf: 'gehen', praes: ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'], praet: ['ging', 'gingst', 'ging', 'gingen', 'gingt', 'gingen'], part: 'gegangen', aux: 'sein', obj: 'ins Kino' },
  { inf: 'spielen', praes: ['spiele', 'spielst', 'spielt', 'spielen', 'spielt', 'spielen'], praet: ['spielte', 'spieltest', 'spielte', 'spielten', 'spieltet', 'spielten'], part: 'gespielt', aux: 'haben', obj: 'Fussball' },
  { inf: 'lesen', praes: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'], praet: ['las', 'last', 'las', 'lasen', 'last', 'lasen'], part: 'gelesen', aux: 'haben', obj: 'ein Buch' },
  { inf: 'schreiben', praes: ['schreibe', 'schreibst', 'schreibt', 'schreiben', 'schreibt', 'schreiben'], praet: ['schrieb', 'schriebst', 'schrieb', 'schrieben', 'schriebt', 'schrieben'], part: 'geschrieben', aux: 'haben', obj: 'einen Brief' },
  { inf: 'fahren', praes: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'], praet: ['fuhr', 'fuhrst', 'fuhr', 'fuhren', 'fuhrt', 'fuhren'], part: 'gefahren', aux: 'sein', obj: 'nach Bern' },
  { inf: 'essen', praes: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'], praet: ['ass', 'assest', 'ass', 'assen', 'asst', 'assen'], part: 'gegessen', aux: 'haben', obj: 'eine Pizza' },
  { inf: 'sehen', praes: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'], praet: ['sah', 'sahst', 'sah', 'sahen', 'saht', 'sahen'], part: 'gesehen', aux: 'haben', obj: 'einen Film' },
  { inf: 'laufen', praes: ['laufe', 'läufst', 'läuft', 'laufen', 'lauft', 'laufen'], praet: ['lief', 'liefst', 'lief', 'liefen', 'lieft', 'liefen'], part: 'gelaufen', aux: 'sein', obj: 'in den Wald' },
  { inf: 'machen', praes: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'], praet: ['machte', 'machtest', 'machte', 'machten', 'machtet', 'machten'], part: 'gemacht', aux: 'haben', obj: 'die Hausaufgaben' },
  { inf: 'kommen', praes: ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'], praet: ['kam', 'kamst', 'kam', 'kamen', 'kamt', 'kamen'], part: 'gekommen', aux: 'sein', obj: 'nach Hause' },
  { inf: 'trinken', praes: ['trinke', 'trinkst', 'trinkt', 'trinken', 'trinkt', 'trinken'], praet: ['trank', 'trankst', 'trank', 'tranken', 'trankt', 'tranken'], part: 'getrunken', aux: 'haben', obj: 'einen Tee' },
  { inf: 'schwimmen', praes: ['schwimme', 'schwimmst', 'schwimmt', 'schwimmen', 'schwimmt', 'schwimmen'], praet: ['schwamm', 'schwammst', 'schwamm', 'schwammen', 'schwammt', 'schwammen'], part: 'geschwommen', aux: 'sein', obj: 'im See' },
  { inf: 'finden', praes: ['finde', 'findest', 'findet', 'finden', 'findet', 'finden'], praet: ['fand', 'fandest', 'fand', 'fanden', 'fandet', 'fanden'], part: 'gefunden', aux: 'haben', obj: 'den Schlüssel' },
  { inf: 'bleiben', praes: ['bleibe', 'bleibst', 'bleibt', 'bleiben', 'bleibt', 'bleiben'], praet: ['blieb', 'bliebst', 'blieb', 'blieben', 'bliebt', 'blieben'], part: 'geblieben', aux: 'sein', obj: 'zu Hause' },
  { inf: 'kaufen', praes: ['kaufe', 'kaufst', 'kauft', 'kaufen', 'kauft', 'kaufen'], praet: ['kaufte', 'kauftest', 'kaufte', 'kauften', 'kauftet', 'kauften'], part: 'gekauft', aux: 'haben', obj: 'ein Geschenk' },
  { inf: 'singen', praes: ['singe', 'singst', 'singt', 'singen', 'singt', 'singen'], praet: ['sang', 'sangst', 'sang', 'sangen', 'sangt', 'sangen'], part: 'gesungen', aux: 'haben', obj: 'ein Lied' },
];

export const ZEITFORMEN = ['Präsens', 'Präteritum', 'Perfekt', 'Plusquamperfekt', 'Futur I'] as const;
export type Zeitform = (typeof ZEITFORMEN)[number];

/** Indirekte Rede: [direkte Rede (Sprecher), Satzanfang indirekt, Lücke danach, Konjunktiv-Lösung, falsche Optionen, Erklärung, Stufe] */
export const KONJUNKTIV_BANK: [string, string, string, string, string[], string, Difficulty][] = [
  ['Mandy sagt: «Ich bin müde.»', 'Mandy sagt, sie', 'müde.', 'sei', ['ist', 'wäre', 'bin'], 'Konjunktiv I von «sein»: sie sei.', 1],
  ['Tom sagt: «Ich habe Hunger.»', 'Tom sagt, er', 'Hunger.', 'habe', ['hat', 'hätte', 'hab'], 'Konjunktiv I von «haben»: er habe.', 1],
  ['Lisa erzählt: «Ich komme später.»', 'Lisa erzählt, sie', 'später.', 'komme', ['kommt', 'käme', 'kam'], 'Konjunktiv I: sie komme.', 1],
  ['Der Lehrer sagt: «Die Prüfung ist einfach.»', 'Der Lehrer sagt, die Prüfung', 'einfach.', 'sei', ['ist', 'wäre', 'war'], 'Konjunktiv I: sie sei.', 1],
  ['Die Trainerin meint: «Das Team kann gewinnen.»', 'Die Trainerin meint, das Team', 'gewinnen.', 'könne', ['kann', 'könnte', 'konnte'], 'Konjunktiv I von «können»: es könne.', 2],
  ['Der Arzt sagt: «Sie muss im Bett bleiben.»', 'Der Arzt sagt, sie', 'im Bett bleiben.', 'müsse', ['muss', 'müsste', 'musste'], 'Konjunktiv I von «müssen»: sie müsse.', 2],
  ['Mandy sagt: «Ich weiss die Antwort.»', 'Mandy sagt, sie', 'die Antwort.', 'wisse', ['weiss', 'wüsste', 'wusste'], 'Konjunktiv I von «wissen»: sie wisse.', 2],
  ['Tom meint: «Es wird regnen.»', 'Tom meint, es', 'regnen.', 'werde', ['wird', 'würde', 'wurde'], 'Konjunktiv I von «werden»: es werde.', 2],
  ['Die Kinder sagen: «Wir haben keine Zeit.»', 'Die Kinder sagen, sie', 'keine Zeit.', 'hätten', ['haben', 'habe', 'hatten'], 'Konjunktiv I «sie haben» sieht aus wie der Indikativ → Ersatzform Konjunktiv II: sie hätten.', 3],
  ['Die Eltern sagen: «Wir kommen um acht.»', 'Die Eltern sagen, sie', 'um acht.', 'kämen', ['kommen', 'komme', 'kamen'], '«sie kommen» = Indikativ → Ersatzform Konjunktiv II: sie kämen.', 3],
  ['Der Politiker erklärt: «Wir sind dagegen.»', 'Der Politiker erklärt, sie', 'dagegen.', 'seien', ['sind', 'wären', 'sei'], 'Konjunktiv I Plural von «sein»: sie seien.', 3],
  ['Die Zeitung schreibt: «Der Zug fährt nicht.»', 'Die Zeitung schreibt, der Zug', 'nicht.', 'fahre', ['fährt', 'führe', 'fuhr'], 'Konjunktiv I: er fahre.', 3],
];

// ---------------------------------------------------------------------------
// Kommasetzung – Sätze mit korrekten Kommas
// ---------------------------------------------------------------------------

/** [Satz mit korrekten Kommas, Regel, Stufe, Kapitel 1 = Aufzählung/Nebensatz, 2 = Relativsatz/Infinitiv] */
export const KOMMA_BANK: [string, string, Difficulty, 1 | 2][] = [
  ['Ich kaufe Brot, Käse, Äpfel und Milch.', 'Aufzählung: Komma zwischen den Gliedern, aber nicht vor «und».', 1, 1],
  ['Wir spielen, singen und tanzen.', 'Aufzählung von Verben – kein Komma vor «und».', 1, 1],
  ['Ich bleibe zu Hause, weil ich krank bin.', 'Nebensatz mit «weil» wird mit Komma abgetrennt.', 1, 1],
  ['Sie weiss, dass er recht hat.', 'Nebensatz mit «dass» → Komma.', 1, 1],
  ['Wenn es regnet, nehmen wir den Bus.', 'Vorangestellter Nebensatz mit «wenn» → Komma.', 1, 1],
  ['Er kam zu spät, obwohl er früh losging.', 'Nebensatz mit «obwohl» → Komma.', 2, 1],
  ['Als wir ankamen, war das Konzert schon vorbei.', 'Nebensatz mit «als» → Komma.', 2, 1],
  ['Ich lese gern, aber meine Schwester spielt lieber.', 'Vor «aber» steht immer ein Komma.', 2, 1],
  ['Nachdem wir gegessen hatten, gingen wir spazieren.', 'Nebensatz mit «nachdem» → Komma.', 2, 1],
  ['Ich frage mich, ob er kommt.', 'Nebensatz mit «ob» → Komma.', 2, 1],
  ['Wir wissen nicht, wann der Zug fährt, weil die Anzeige kaputt ist.', 'Zwei Nebensätze – beide werden abgetrennt.', 3, 1],
  ['Das Buch, das ich lese, ist spannend.', 'Eingeschobener Relativsatz → Komma davor und danach.', 1, 2],
  ['Der Mann, der dort steht, ist mein Onkel.', 'Relativsatz mit «der» wird eingeschlossen.', 1, 2],
  ['Ich kenne ein Mädchen, das sehr gut Gitarre spielt.', 'Relativsatz am Ende → Komma davor.', 1, 2],
  ['Er spart, um ein neues Velo zu kaufen.', 'Infinitivgruppe mit «um … zu» → Komma.', 1, 2],
  ['Sie ging, ohne sich zu verabschieden.', 'Infinitivgruppe mit «ohne … zu» → Komma.', 2, 2],
  ['Die Stadt, in der ich wohne, liegt am See.', 'Relativsatz mit Präposition («in der») → Kommas.', 2, 2],
  ['Statt zu lernen, schaute er Videos.', 'Infinitivgruppe mit «statt … zu» → Komma.', 2, 2],
  ['Das Velo, dessen Bremse kaputt ist, steht im Keller.', 'Relativsatz mit «dessen» → Kommas.', 3, 2],
  ['Die Lehrerin, die uns Deutsch unterrichtet, kommt aus Basel.', 'Eingeschobener Relativsatz → zwei Kommas.', 2, 2],
  ['Um pünktlich zu sein, stand sie früh auf.', 'Vorangestellte Infinitivgruppe mit «um … zu» → Komma.', 3, 2],
  ['Alle, die mitkommen wollen, treffen sich um acht.', 'Relativsatz nach «alle» → Kommas.', 3, 2],
  ['Er hatte keine Lust, die Küche aufzuräumen.', 'Infinitivgruppe, die von einem Nomen abhängt («Lust») → Komma.', 3, 2],
];
