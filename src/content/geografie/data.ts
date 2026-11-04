// Geografie-Daten (Sek 1–3). Zahlen gerundet; strittige Rekorde (z. B. längster Fluss der Welt) bewusst weggelassen.
import type { Difficulty } from '../../core/types';

// ---------------------------------------------------------------------------
// Schweiz
// ---------------------------------------------------------------------------

export type Sprache = 'Deutsch' | 'Französisch' | 'Italienisch' | 'mehrsprachig';

/** [Kanton, Kürzel, Hauptort, weitere akzeptierte Schreibweisen des Hauptorts, Sprachregion, Stufe] */
export const KANTONE: [string, string, string, string[], Sprache, Difficulty][] = [
  ['Zürich', 'ZH', 'Zürich', ['Zuerich'], 'Deutsch', 1],
  ['Bern', 'BE', 'Bern', [], 'mehrsprachig', 1],
  ['Luzern', 'LU', 'Luzern', [], 'Deutsch', 1],
  ['Uri', 'UR', 'Altdorf', [], 'Deutsch', 2],
  ['Schwyz', 'SZ', 'Schwyz', [], 'Deutsch', 1],
  ['Obwalden', 'OW', 'Sarnen', [], 'Deutsch', 3],
  ['Nidwalden', 'NW', 'Stans', [], 'Deutsch', 3],
  ['Glarus', 'GL', 'Glarus', [], 'Deutsch', 1],
  ['Zug', 'ZG', 'Zug', [], 'Deutsch', 1],
  ['Freiburg', 'FR', 'Freiburg', ['Fribourg'], 'mehrsprachig', 2],
  ['Solothurn', 'SO', 'Solothurn', [], 'Deutsch', 1],
  ['Basel-Stadt', 'BS', 'Basel', [], 'Deutsch', 1],
  ['Basel-Landschaft', 'BL', 'Liestal', [], 'Deutsch', 2],
  ['Schaffhausen', 'SH', 'Schaffhausen', [], 'Deutsch', 1],
  ['Appenzell Ausserrhoden', 'AR', 'Herisau', [], 'Deutsch', 3],
  ['Appenzell Innerrhoden', 'AI', 'Appenzell', [], 'Deutsch', 2],
  ['St. Gallen', 'SG', 'St. Gallen', ['St Gallen', 'Sankt Gallen'], 'Deutsch', 1],
  ['Graubünden', 'GR', 'Chur', [], 'mehrsprachig', 2],
  ['Aargau', 'AG', 'Aarau', [], 'Deutsch', 2],
  ['Thurgau', 'TG', 'Frauenfeld', [], 'Deutsch', 2],
  ['Tessin', 'TI', 'Bellinzona', [], 'Italienisch', 2],
  ['Waadt', 'VD', 'Lausanne', [], 'Französisch', 2],
  ['Wallis', 'VS', 'Sitten', ['Sion'], 'mehrsprachig', 3],
  ['Neuenburg', 'NE', 'Neuenburg', ['Neuchâtel', 'Neuchatel'], 'Französisch', 2],
  ['Genf', 'GE', 'Genf', ['Genève', 'Geneve'], 'Französisch', 1],
  ['Jura', 'JU', 'Delsberg', ['Delémont', 'Delemont'], 'Französisch', 3],
];

/** Fakten-Fragen zur Schweiz: [Frage, richtig, falsch[], Erklärung, Stufe] */
export const CH_FAKTEN: [string, string, string[], string, Difficulty][] = [
  ['Wie viele Kantone hat die Schweiz?', '26', ['23', '24', '28'], 'Die Schweiz hat 26 Kantone (darunter 6 frühere «Halbkantone»).', 1],
  ['Welches ist der höchste Berg der Schweiz?', 'Dufourspitze', ['Matterhorn', 'Jungfrau', 'Eiger'], 'Die Dufourspitze im Monte-Rosa-Massiv ist 4634 m hoch.', 1],
  ['Welche drei Grosslandschaften hat die Schweiz?', 'Jura, Mittelland, Alpen', ['Jura, Voralpen, Tessin', 'Mittelland, Seeland, Alpen', 'Alpen, Engadin, Jura'], 'Jura (Nordwesten), Mittelland (dazwischen) und Alpen (Süden).', 1],
  ['Welche Grosslandschaft nimmt die grösste Fläche ein?', 'die Alpen', ['das Mittelland', 'der Jura', 'alle gleich viel'], 'Die Alpen bedecken rund 60 % der Schweiz.', 1],
  ['Wo wohnen die meisten Menschen der Schweiz?', 'im Mittelland', ['in den Alpen', 'im Jura', 'im Tessin'], 'Rund zwei Drittel der Bevölkerung wohnen im flachen Mittelland.', 1],
  ['Welche Länder grenzen an die Schweiz?', 'Deutschland, Frankreich, Italien, Österreich, Liechtenstein', ['Deutschland, Frankreich, Italien, Österreich', 'Deutschland, Frankreich, Italien, Slowenien, Liechtenstein', 'Deutschland, Belgien, Italien, Österreich, Liechtenstein'], 'Fünf Nachbarländer – Liechtenstein wird oft vergessen.', 1],
  ['Wie viele Landessprachen hat die Schweiz?', '4', ['3', '2', '5'], 'Deutsch, Französisch, Italienisch und Rätoromanisch.', 1],
  ['In welchem Kanton spricht man auch Rätoromanisch?', 'Graubünden', ['Tessin', 'Wallis', 'Uri'], 'Graubünden ist dreisprachig: Deutsch, Rätoromanisch, Italienisch.', 2],
  ['Welcher Fluss fliesst in die Nordsee?', 'Rhein', ['Rhone', 'Inn', 'Ticino'], 'Der Rhein fliesst durch Deutschland und die Niederlande in die Nordsee.', 2],
  ['Wohin fliesst die Rhone?', 'ins Mittelmeer', ['in die Nordsee', 'ins Schwarze Meer', 'in die Ostsee'], 'Die Rhone fliesst vom Rhonegletscher durch den Genfersee und Frankreich ins Mittelmeer.', 2],
  ['Über welchen Fluss gelangt Wasser aus dem Engadin ins Schwarze Meer?', 'Inn (→ Donau)', ['Rhein', 'Rhone', 'Ticino (→ Po)'], 'Der Inn mündet in die Donau, die ins Schwarze Meer fliesst.', 3],
  ['Welcher ist der längste Fluss, der ganz in der Schweiz verläuft?', 'Aare', ['Rhein', 'Rhone', 'Reuss'], 'Die Aare (ca. 290 km) fliesst nur durch die Schweiz und mündet bei Koblenz AG in den Rhein.', 2],
  ['Welcher ist der grösste See, der ganz in der Schweiz liegt?', 'Neuenburgersee', ['Genfersee', 'Bodensee', 'Vierwaldstättersee'], 'Genfer- und Bodensee sind grösser, liegen aber teilweise im Ausland.', 3],
  ['Welcher grosse See liegt zum Teil in Frankreich?', 'Genfersee', ['Bodensee', 'Lago Maggiore', 'Zürichsee'], 'Das Südufer des Genfersees gehört zu Frankreich.', 2],
  ['An welchen See grenzen Deutschland, Österreich und die Schweiz?', 'Bodensee', ['Genfersee', 'Lago di Lugano', 'Walensee'], 'Am Bodensee treffen sich drei Länder.', 1],
  ['Wie heisst die Bundesstadt der Schweiz?', 'Bern', ['Zürich', 'Genf', 'Luzern'], 'Bern ist der Sitz von Bundesrat und Parlament – offiziell «Bundesstadt».', 1],
  ['Wie viele Menschen leben ungefähr in der Schweiz?', 'rund 9 Millionen', ['rund 5 Millionen', 'rund 15 Millionen', 'rund 20 Millionen'], 'Die Schweiz hat rund 9 Millionen Einwohnerinnen und Einwohner.', 2],
  ['Welcher Pass verbindet Uri mit dem Tessin?', 'Gotthard', ['Simplon', 'Grimsel', 'Bernina'], 'Über und unter dem Gotthard (Strassen- und Basistunnel) führt die wichtigste Nord-Süd-Achse.', 2],
  ['Wie heisst der längste Eisenbahntunnel der Welt (57 km)?', 'Gotthard-Basistunnel', ['Lötschberg-Basistunnel', 'Simplontunnel', 'Furka-Basistunnel'], 'Der Gotthard-Basistunnel wurde 2016 eröffnet.', 3],
  ['Welcher ist der grösste Gletscher der Alpen?', 'Grosser Aletschgletscher', ['Rhonegletscher', 'Morteratschgletscher', 'Gornergletscher'], 'Der Grosse Aletschgletscher im Wallis ist rund 20 km lang – er schmilzt aber stark.', 2],
];

// ---------------------------------------------------------------------------
// Europa & Welt
// ---------------------------------------------------------------------------

export type Kontinent = 'Europa' | 'Asien' | 'Afrika' | 'Nordamerika' | 'Südamerika' | 'Australien/Ozeanien' | 'Antarktis';
export const KONTINENTE: Kontinent[] = ['Europa', 'Asien', 'Afrika', 'Nordamerika', 'Südamerika', 'Australien/Ozeanien', 'Antarktis'];

/** [Land, Hauptstadt, weitere akzeptierte Schreibweisen, Kontinent, Stufe] */
export const LAENDER: [string, string, string[], Kontinent, Difficulty][] = [
  // Europa
  ['Deutschland', 'Berlin', [], 'Europa', 1],
  ['Frankreich', 'Paris', [], 'Europa', 1],
  ['Italien', 'Rom', ['Roma'], 'Europa', 1],
  ['Österreich', 'Wien', [], 'Europa', 1],
  ['Spanien', 'Madrid', [], 'Europa', 1],
  ['Portugal', 'Lissabon', ['Lisboa'], 'Europa', 1],
  ['Niederlande', 'Amsterdam', [], 'Europa', 1],
  ['Belgien', 'Brüssel', ['Bruessel', 'Bruxelles'], 'Europa', 1],
  ['Vereinigtes Königreich', 'London', [], 'Europa', 1],
  ['Irland', 'Dublin', [], 'Europa', 2],
  ['Dänemark', 'Kopenhagen', [], 'Europa', 2],
  ['Norwegen', 'Oslo', [], 'Europa', 2],
  ['Schweden', 'Stockholm', [], 'Europa', 2],
  ['Finnland', 'Helsinki', [], 'Europa', 2],
  ['Island', 'Reykjavík', ['Reykjavik'], 'Europa', 3],
  ['Polen', 'Warschau', [], 'Europa', 2],
  ['Tschechien', 'Prag', [], 'Europa', 2],
  ['Slowakei', 'Bratislava', [], 'Europa', 3],
  ['Ungarn', 'Budapest', [], 'Europa', 2],
  ['Slowenien', 'Ljubljana', [], 'Europa', 3],
  ['Kroatien', 'Zagreb', [], 'Europa', 2],
  ['Serbien', 'Belgrad', [], 'Europa', 3],
  ['Bosnien und Herzegowina', 'Sarajevo', [], 'Europa', 3],
  ['Albanien', 'Tirana', [], 'Europa', 3],
  ['Nordmazedonien', 'Skopje', [], 'Europa', 3],
  ['Kosovo', 'Pristina', ['Priština', 'Prishtina'], 'Europa', 3],
  ['Griechenland', 'Athen', [], 'Europa', 1],
  ['Bulgarien', 'Sofia', [], 'Europa', 3],
  ['Rumänien', 'Bukarest', [], 'Europa', 3],
  ['Ukraine', 'Kiew', ['Kyjiw', 'Kyiv'], 'Europa', 2],
  ['Litauen', 'Vilnius', [], 'Europa', 3],
  ['Lettland', 'Riga', [], 'Europa', 3],
  ['Estland', 'Tallinn', [], 'Europa', 3],
  ['Liechtenstein', 'Vaduz', [], 'Europa', 2],
  ['Luxemburg', 'Luxemburg', [], 'Europa', 2],
  ['Malta', 'Valletta', [], 'Europa', 3],
  // Welt
  ['USA', 'Washington', ['Washington D.C.', 'Washington DC'], 'Nordamerika', 1],
  ['Kanada', 'Ottawa', [], 'Nordamerika', 2],
  ['Mexiko', 'Mexiko-Stadt', ['Mexico City', 'Mexiko Stadt'], 'Nordamerika', 2],
  ['Kuba', 'Havanna', [], 'Nordamerika', 3],
  ['Brasilien', 'Brasília', ['Brasilia'], 'Südamerika', 2],
  ['Argentinien', 'Buenos Aires', [], 'Südamerika', 2],
  ['Peru', 'Lima', [], 'Südamerika', 3],
  ['Chile', 'Santiago de Chile', ['Santiago'], 'Südamerika', 3],
  ['Kolumbien', 'Bogotá', ['Bogota'], 'Südamerika', 3],
  ['Ägypten', 'Kairo', [], 'Afrika', 1],
  ['Marokko', 'Rabat', [], 'Afrika', 3],
  ['Kenia', 'Nairobi', [], 'Afrika', 2],
  ['Nigeria', 'Abuja', [], 'Afrika', 3],
  ['Äthiopien', 'Addis Abeba', ['Addis Ababa'], 'Afrika', 3],
  ['Ghana', 'Accra', [], 'Afrika', 3],
  ['China', 'Peking', ['Beijing'], 'Asien', 1],
  ['Japan', 'Tokio', ['Tokyo'], 'Asien', 1],
  ['Indien', 'Neu-Delhi', ['New Delhi', 'Delhi', 'Neu Delhi'], 'Asien', 2],
  ['Russland', 'Moskau', [], 'Europa', 1],
  ['Türkei', 'Ankara', [], 'Asien', 2],
  ['Thailand', 'Bangkok', [], 'Asien', 2],
  ['Südkorea', 'Seoul', [], 'Asien', 2],
  ['Vietnam', 'Hanoi', [], 'Asien', 3],
  ['Iran', 'Teheran', [], 'Asien', 3],
  ['Saudi-Arabien', 'Riad', ['Riyadh'], 'Asien', 3],
  ['Australien', 'Canberra', [], 'Australien/Ozeanien', 2],
  ['Neuseeland', 'Wellington', [], 'Australien/Ozeanien', 3],
];

/** Bekannte Fallen: grösste Stadt ist nicht die Hauptstadt. */
export const FALLEN: Record<string, string> = {
  Australien: 'Sydney',
  Kanada: 'Toronto',
  Türkei: 'Istanbul',
  Brasilien: 'Rio de Janeiro',
  Nigeria: 'Lagos',
  USA: 'New York',
  Marokko: 'Casablanca',
  Neuseeland: 'Auckland',
  Vietnam: 'Ho-Chi-Minh-Stadt',
};

/** Nachbarländer für «Welches Land grenzt nicht an …?» */
export const NACHBARN: Record<string, string[]> = {
  Schweiz: ['Deutschland', 'Frankreich', 'Italien', 'Österreich', 'Liechtenstein'],
  Deutschland: ['Dänemark', 'Polen', 'Tschechien', 'Österreich', 'Schweiz', 'Frankreich', 'Luxemburg', 'Belgien', 'Niederlande'],
  Österreich: ['Deutschland', 'Tschechien', 'Slowakei', 'Ungarn', 'Slowenien', 'Italien', 'Schweiz', 'Liechtenstein'],
  Frankreich: ['Belgien', 'Luxemburg', 'Deutschland', 'Schweiz', 'Italien', 'Spanien', 'Andorra', 'Monaco'],
  Italien: ['Frankreich', 'Schweiz', 'Österreich', 'Slowenien', 'San Marino', 'Vatikanstadt'],
};

export const WELT_FAKTEN: [string, string, string[], string, Difficulty][] = [
  ['Welches ist der grösste Kontinent?', 'Asien', ['Afrika', 'Nordamerika', 'Europa'], 'Asien ist der grösste und bevölkerungsreichste Kontinent.', 1],
  ['Welches ist der kleinste Kontinent?', 'Australien/Ozeanien', ['Europa', 'Antarktis', 'Südamerika'], 'Australien/Ozeanien ist der kleinste Kontinent.', 1],
  ['Welches ist der grösste Ozean?', 'Pazifik', ['Atlantik', 'Indischer Ozean', 'Arktischer Ozean'], 'Der Pazifik ist grösser als alle Landflächen der Erde zusammen.', 1],
  ['Welcher Ozean liegt zwischen Europa und Nordamerika?', 'Atlantik', ['Pazifik', 'Indischer Ozean', 'Südlicher Ozean'], 'Der Atlantik trennt Europa und Afrika von Amerika.', 1],
  ['Welches ist der höchste Berg der Erde?', 'Mount Everest', ['K2', 'Kilimandscharo', 'Mont Blanc'], 'Der Mount Everest im Himalaya ist rund 8849 m hoch.', 1],
  ['Welches ist das flächengrösste Land der Erde?', 'Russland', ['Kanada', 'China', 'USA'], 'Russland ist mit Abstand das grösste Land.', 1],
  ['Welches Land hat die meisten Einwohner?', 'Indien', ['China', 'USA', 'Indonesien'], 'Seit 2023 hat Indien mehr Einwohner als China.', 2],
  ['Welches ist die grösste Hitzewüste der Erde?', 'Sahara', ['Gobi', 'Atacama', 'Kalahari'], 'Die Sahara in Nordafrika ist die grösste heisse Wüste.', 1],
  ['Welcher Gebirgszug verläuft entlang der Westküste Südamerikas?', 'Anden', ['Rocky Mountains', 'Ural', 'Himalaya'], 'Die Anden sind die längste Gebirgskette der Welt.', 2],
  ['Welches Gebirge gilt als Grenze zwischen Europa und Asien?', 'Ural', ['Kaukasus', 'Karpaten', 'Alpen'], 'Der Ural trennt Europa und Asien.', 2],
  ['Welcher ist der höchste Berg Afrikas?', 'Kilimandscharo', ['Mount Kenya', 'Atlas', 'Mont Blanc'], 'Der Kilimandscharo in Tansania ist rund 5895 m hoch.', 2],
  ['Welcher ist der höchste Berg der Alpen?', 'Mont Blanc', ['Dufourspitze', 'Matterhorn', 'Grossglockner'], 'Der Mont Blanc (ca. 4806 m) liegt an der Grenze Frankreich–Italien.', 2],
  ['Welcher ist der längste Fluss Europas?', 'Wolga', ['Donau', 'Rhein', 'Elbe'], 'Die Wolga in Russland ist rund 3500 km lang.', 3],
  ['Durch wie viele Hauptstädte fliesst die Donau?', '4', ['2', '3', '6'], 'Wien, Bratislava, Budapest und Belgrad.', 3],
  ['Wie viele Kontinente zählt man in der Schule meist?', '7', ['5', '6', '8'], 'Europa, Asien, Afrika, Nord- und Südamerika, Australien/Ozeanien, Antarktis.', 1],
  ['Welcher Breitengrad teilt die Erde in Nord- und Südhalbkugel?', 'der Äquator (0°)', ['der Nullmeridian', 'der Wendekreis des Krebses', 'der Polarkreis'], 'Der Äquator liegt bei 0° Breite.', 1],
];

// ---------------------------------------------------------------------------
// Klima
// ---------------------------------------------------------------------------

export type Klimazone = 'Tropen' | 'Subtropen' | 'Gemässigte Zone' | 'Kalte Zone';
export const KLIMAZONEN: Klimazone[] = ['Tropen', 'Subtropen', 'Gemässigte Zone', 'Kalte Zone'];

/** Gerundete langjährige Mittelwerte. [Ort, Temperatur °C (12 Monate), Niederschlag mm (12 Monate), Klimazone, Südhalbkugel] */
export const KLIMA: [string, number[], number[], Klimazone, boolean][] = [
  ['Zürich (Schweiz)', [0, 2, 6, 9, 14, 17, 19, 18, 14, 10, 5, 1], [67, 64, 74, 88, 118, 131, 128, 124, 94, 85, 82, 82], 'Gemässigte Zone', false],
  ['Singapur', [27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 27, 27], [240, 160, 180, 170, 170, 150, 160, 170, 170, 190, 260, 290], 'Tropen', false],
  ['Kairo (Ägypten)', [14, 15, 18, 21, 25, 27, 28, 28, 26, 23, 19, 15], [5, 4, 4, 1, 0, 0, 0, 0, 0, 1, 3, 5], 'Subtropen', false],
  ['Moskau (Russland)', [-6, -6, -1, 6, 13, 17, 19, 17, 11, 5, -1, -5], [50, 40, 40, 40, 50, 80, 85, 80, 65, 65, 55, 50], 'Gemässigte Zone', false],
  ['Sydney (Australien)', [23, 23, 22, 19, 16, 13, 13, 14, 16, 18, 20, 22], [100, 120, 130, 125, 120, 130, 100, 80, 70, 75, 85, 80], 'Subtropen', true],
  ['Nuuk (Grönland)', [-7, -8, -8, -4, 1, 4, 7, 6, 3, -2, -4, -6], [40, 45, 45, 35, 45, 50, 75, 80, 85, 60, 50, 45], 'Kalte Zone', false],
  ['Manaus (Brasilien)', [26, 26, 26, 26, 27, 27, 27, 28, 28, 28, 28, 27], [260, 290, 310, 290, 230, 115, 85, 60, 85, 110, 175, 220], 'Tropen', true],
  ['Rom (Italien)', [8, 9, 11, 14, 18, 22, 25, 25, 22, 17, 12, 9], [80, 75, 60, 60, 40, 25, 15, 30, 70, 110, 110, 90], 'Subtropen', false],
];

export const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export const KLIMA_FAKTEN: [string, string, string[], string, Difficulty][] = [
  ['Was ist der Unterschied zwischen Wetter und Klima?', 'Wetter ist kurzfristig, Klima ist der Durchschnitt über mindestens 30 Jahre.', ['Das ist dasselbe.', 'Klima gibt es nur in den Tropen.', 'Wetter dauert genau ein Jahr.'], 'Wetter = Zustand der Atmosphäre jetzt; Klima = langjähriger Durchschnitt.', 1],
  ['Warum gibt es auf der Erde Jahreszeiten?', 'Weil die Erdachse geneigt ist.', ['Weil die Erde im Sommer näher an der Sonne ist.', 'Weil sich die Sonne um die Erde dreht.', 'Wegen des Mondes.'], 'Durch die Neigung der Erdachse (ca. 23,5°) treffen die Sonnenstrahlen je nach Jahreszeit steiler oder flacher auf.', 2],
  ['Wie heisst der warme, trockene Fallwind in den Alpen?', 'Föhn', ['Bise', 'Mistral', 'Monsun'], 'Der Föhn wärmt sich beim Absteigen auf der Alpennordseite auf.', 1],
  ['Was verstärkt den natürlichen Treibhauseffekt am meisten?', 'zusätzliches CO₂ aus Verbrennung von Öl, Gas und Kohle', ['das Ozonloch', 'Vulkanasche', 'Wasserkraftwerke'], 'Mehr CO₂ in der Atmosphäre hält mehr Wärme zurück.', 2],
  ['Wie viel kühler wird es ungefähr pro 100 Höhenmeter?', 'um etwa 0,6 °C', ['um etwa 6 °C', 'um etwa 0,06 °C', 'gar nicht'], 'Faustregel: pro 100 m Höhe ca. 0,6 °C kälter.', 2],
  ['Wo liegt die tropische Zone?', 'rund um den Äquator', ['an den Polen', 'nur in Afrika', 'zwischen Polarkreis und Pol'], 'Die Tropen liegen zwischen den beiden Wendekreisen.', 1],
  ['Was zeigen die Balken in einem Klimadiagramm?', 'den Niederschlag pro Monat', ['die Temperatur', 'die Sonnenstunden', 'den Wind'], 'Balken = Niederschlag (mm), Linie = Temperatur (°C).', 1],
  ['Was ist typisch für das Mittelmeerklima?', 'heisse, trockene Sommer und milde, feuchte Winter', ['das ganze Jahr Regen', 'kalte Sommer', 'Schnee im Juli'], 'Das Mittelmeerklima gehört zu den Subtropen.', 2],
  ['Wie heisst der kalte Nordostwind im Schweizer Mittelland?', 'Bise', ['Föhn', 'Scirocco', 'Passat'], 'Die Bise bläst im Winter oft kalt aus Nordosten.', 2],
  ['Warum schmelzen die Alpengletscher?', 'wegen der Klimaerwärmung', ['wegen zu viel Schnee', 'wegen Erdbeben', 'weil Gletscher immer schmelzen und nie wachsen'], 'Seit 1850 haben die Alpengletscher deutlich mehr als die Hälfte ihres Volumens verloren.', 2],
];

// ---------------------------------------------------------------------------
// Karten & Orientierung
// ---------------------------------------------------------------------------

export const RICHTUNGEN = ['Norden', 'Nordosten', 'Osten', 'Südosten', 'Süden', 'Südwesten', 'Westen', 'Nordwesten'];

/** Zeitzonen (Winterzeit, UTC-Abstand in Stunden) */
export const ZEITZONEN: [string, number][] = [
  ['Zürich', 1],
  ['London', 0],
  ['New York', -5],
  ['Los Angeles', -8],
  ['Tokio', 9],
  ['Peking', 8],
  ['Moskau', 3],
  ['Dubai', 4],
  ['Rio de Janeiro', -3],
  ['Bangkok', 7],
];

export const KARTEN_FAKTEN: [string, string, string[], string, Difficulty][] = [
  ['Wo geht die Sonne auf?', 'im Osten', ['im Westen', 'im Norden', 'im Süden'], 'Die Sonne geht im Osten auf und im Westen unter.', 1],
  ['Wo steht die Sonne bei uns am Mittag?', 'im Süden', ['im Norden', 'im Osten', 'im Westen'], 'Auf der Nordhalbkugel steht die Mittagssonne im Süden.', 2],
  ['Was zeigen Höhenlinien auf einer Karte?', 'Punkte mit gleicher Höhe über Meer', ['Grenzen zwischen Gemeinden', 'Wanderwege', 'Flüsse'], 'Höhenlinien verbinden Punkte gleicher Höhe.', 1],
  ['Liegen Höhenlinien eng beieinander, ist das Gelände …', 'steil', ['flach', 'bewaldet', 'sumpfig'], 'Enge Höhenlinien = steiles Gelände.', 1],
  ['Durch welchen Ort verläuft der Nullmeridian (0° Länge)?', 'Greenwich (London)', ['Paris', 'Bern', 'Rom'], 'Der Nullmeridian verläuft durch die Sternwarte in Greenwich.', 2],
  ['Auf welcher Halbkugel liegt die Schweiz?', 'Nord- und Osthalbkugel', ['Süd- und Osthalbkugel', 'Nord- und Westhalbkugel', 'Süd- und Westhalbkugel'], 'Die Schweiz liegt bei ca. 47° Nord und 8° Ost.', 2],
  ['Welche Linien verlaufen von Pol zu Pol?', 'Längengrade (Meridiane)', ['Breitengrade', 'Höhenlinien', 'Wendekreise'], 'Längengrade (Meridiane) verbinden Nord- und Südpol.', 2],
  ['Ungefähr auf welchem Breitengrad liegt die Schweiz?', '47° Nord', ['10° Nord', '47° Süd', '70° Nord'], 'Bern liegt etwa bei 47° nördlicher Breite.', 3],
  ['Was ist das Gegenteil von Nordosten?', 'Südwesten', ['Südosten', 'Nordwesten', 'Westen'], 'Gegenüberliegende Himmelsrichtungen: NO ↔ SW.', 1],
  ['Welche Farbe haben Gewässer auf der Landeskarte?', 'Blau', ['Grün', 'Braun', 'Rot'], 'Gewässer blau, Wald grün, Höhenlinien braun.', 1],
];
