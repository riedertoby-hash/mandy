// Biologie (Sek 1–3, Lehrplan 21 Natur und Technik). Fakten nach gängigen Schweizer Lehrmitteln.
import type { Difficulty } from '../../core/types';

/** Multiple-choice facts: [Frage, richtig, falsch[], Erklärung, Stufe] */
export type Fakt = [string, string, string[], string, Difficulty];

export const FAKTEN: Record<string, Fakt[]> = {
  bz1: [
    ['Was ist die kleinste Einheit des Lebens?', 'die Zelle', ['das Organ', 'das Atom', 'das Gewebe'], 'Alle Lebewesen bestehen aus einer oder vielen Zellen.', 1],
    ['Wo liegt die Erbinformation (DNA) einer Zelle?', 'im Zellkern', ['in der Zellwand', 'in der Vakuole', 'in der Zellmembran'], 'Der Zellkern ist die Steuerzentrale der Zelle.', 1],
    ['Was macht die Zellmembran?', 'Sie grenzt die Zelle ab und kontrolliert, was hinein- und hinausgeht.', ['Sie macht Fotosynthese.', 'Sie speichert die DNA.', 'Sie gibt der Pflanze Halt wie ein Skelett.'], 'Die Zellmembran ist eine dünne Haut um jede Zelle.', 1],
    ['Wo findet die Fotosynthese statt?', 'in den Chloroplasten', ['in den Mitochondrien', 'im Zellkern', 'in der Zellmembran'], 'Chloroplasten enthalten den grünen Farbstoff Chlorophyll.', 1],
    ['Welche Zellbestandteile hat nur die Pflanzenzelle?', 'Zellwand, Chloroplasten und grosse Vakuole', ['Zellkern, Zellmembran und Zellplasma', 'Mitochondrien und Zellkern', 'nur die Zellmembran'], 'Tierzellen haben keine Zellwand, keine Chloroplasten und höchstens kleine Vakuolen.', 2],
    ['Was sind die «Kraftwerke» der Zelle?', 'die Mitochondrien', ['die Chloroplasten', 'die Vakuolen', 'die Ribosomen'], 'In den Mitochondrien wird bei der Zellatmung Energie freigesetzt.', 2],
    ['Was ist ein Gewebe?', 'ein Verband gleichartiger Zellen', ['ein einzelnes Organ', 'ein Teil des Zellkerns', 'eine Art Bakterium'], 'Zellen → Gewebe → Organe → Organsysteme → Organismus.', 2],
    ['Was stimmt für Bakterien?', 'Sie haben keinen echten Zellkern.', ['Sie sind immer grösser als Tierzellen.', 'Sie haben Chloroplasten wie Pflanzen.', 'Sie bestehen aus vielen Zellen.'], 'Bakterien sind Einzeller ohne Zellkern; ihre DNA liegt frei im Zellplasma.', 3],
    ['Wozu dient die grosse Vakuole der Pflanzenzelle?', 'Sie speichert Zellsaft und hält die Zelle prall.', ['Sie macht Fotosynthese.', 'Sie steuert die Zellteilung.', 'Sie produziert Eiweisse.'], 'Welkt eine Pflanze, haben die Vakuolen Wasser verloren.', 3],
  ],
  bz2: [
    ['Welchen Teil des Mikroskops schaust du direkt durch?', 'das Okular', ['das Objektiv', 'den Objekttisch', 'die Blende'], 'Okular = Auge, Objektiv = beim Objekt.', 1],
    ['Womit beginnst du beim Mikroskopieren?', 'mit der kleinsten Vergrösserung', ['mit der grössten Vergrösserung', 'mit ausgeschaltetem Licht', 'ohne Deckglas'], 'So findest du das Objekt am einfachsten.', 1],
    ['Was regelt die Blende?', 'die Lichtmenge', ['die Vergrösserung', 'die Schärfe', 'die Farbe'], 'Mit weniger Licht siehst du oft mehr Kontrast.', 2],
    ['Was legt man auf das Präparat, damit es flach und feucht bleibt?', 'ein Deckglas', ['ein Okular', 'eine Lupe', 'ein Filterpapier'], 'Objektträger + Präparat + Wassertropfen + Deckglas.', 1],
    ['Warum färbt man Zellen manchmal ein (z. B. mit Methylenblau)?', 'damit Bestandteile wie der Zellkern besser sichtbar werden', ['damit sie schneller wachsen', 'damit sie nicht austrocknen', 'damit das Mikroskop nicht kaputtgeht'], 'Viele Zellteile sind sonst fast durchsichtig.', 2],
    ['Wie viele Mikrometer (µm) sind 1 Millimeter?', '1000', ['10', '100', '1 000 000'], '1 mm = 1000 µm.', 2],
  ],
  bm1: [
    ['Welche Nährstoffe liefern vor allem Energie?', 'Kohlenhydrate und Fette', ['Vitamine und Mineralstoffe', 'Wasser und Salz', 'nur Eiweisse'], 'Kohlenhydrate sind schnelle, Fette langfristige Energielieferanten.', 1],
    ['Wofür braucht der Körper vor allem Eiweisse?', 'zum Aufbau von Muskeln und Zellen', ['nur als Energiereserve', 'zum Schwitzen', 'für die Verdauung von Wasser'], 'Eiweisse (Proteine) sind die Bausteine des Körpers.', 1],
    ['Wo beginnt die Verdauung von Kohlenhydraten?', 'im Mund (Speichel)', ['im Magen', 'im Dickdarm', 'in der Leber'], 'Der Speichel enthält ein Enzym, das Stärke spaltet – Brot schmeckt beim Kauen süsslich.', 2],
    ['Wo werden die meisten Nährstoffe ins Blut aufgenommen?', 'im Dünndarm', ['im Magen', 'in der Speiseröhre', 'im Dickdarm'], 'Die Darmzotten vergrössern die Oberfläche enorm.', 2],
    ['Was geschieht vor allem im Dickdarm?', 'Dem Speisebrei wird Wasser entzogen.', ['Eiweisse werden verdaut.', 'Die Nahrung wird zerkaut.', 'Galle wird produziert.'], 'Darum wird der Darminhalt dort fester.', 2],
    ['Welches Organ produziert die Galle für die Fettverdauung?', 'die Leber', ['die Bauchspeicheldrüse', 'die Niere', 'das Herz'], 'Die Galle wird in der Gallenblase gespeichert.', 3],
    ['Was macht die Magensäure?', 'Sie tötet Keime ab und hilft bei der Eiweissverdauung.', ['Sie verdaut Fette.', 'Sie nimmt Wasser auf.', 'Sie transportiert Sauerstoff.'], 'Der Magen ist sehr sauer (Salzsäure).', 3],
  ],
  bm2: [
    ['Wie viele Kammern hat das menschliche Herz?', '4 (2 Vorhöfe, 2 Herzkammern)', ['2', '3', '6'], 'Rechte Herzhälfte → Lunge, linke Herzhälfte → Körper.', 1],
    ['Was transportieren die roten Blutkörperchen?', 'Sauerstoff', ['Nährstoffe', 'Abwehrstoffe', 'Hormone'], 'Der rote Blutfarbstoff Hämoglobin bindet Sauerstoff.', 1],
    ['Wozu dienen die weissen Blutkörperchen?', 'zur Abwehr von Krankheitserregern', ['zum Sauerstofftransport', 'zur Blutgerinnung', 'zum Färben des Blutes'], 'Sie sind Teil des Immunsystems.', 1],
    ['Wozu dienen die Blutplättchen?', 'zur Blutgerinnung (Wundverschluss)', ['zur Abwehr', 'zum Sauerstofftransport', 'zur Verdauung'], 'Sie verschliessen kleine Verletzungen.', 2],
    ['Wo findet der Gasaustausch in der Lunge statt?', 'in den Lungenbläschen', ['in der Luftröhre', 'in den Bronchien', 'im Kehlkopf'], 'Sauerstoff geht ins Blut, Kohlenstoffdioxid in die Atemluft.', 2],
    ['Welche Blutgefässe führen Blut vom Herzen weg?', 'die Arterien', ['die Venen', 'die Lungenbläschen', 'die Lymphgefässe'], 'Arterien = weg vom Herzen, Venen = zum Herzen hin.', 2],
    ['Wie viel Blut hat ein erwachsener Mensch ungefähr?', '5 bis 6 Liter', ['1 Liter', '15 Liter', '50 Liter'], 'Etwa 7–8 % des Körpergewichts.', 2],
    ['Welche Herzhälfte pumpt Blut in den Körperkreislauf?', 'die linke Herzhälfte', ['die rechte Herzhälfte', 'beide gleichzeitig in die Lunge', 'die Vorhöfe'], 'Darum ist die linke Kammerwand dicker.', 3],
  ],
  bo1: [
    ['Was ist ein Produzent?', 'ein Lebewesen, das mit Sonnenlicht Nährstoffe herstellt (Pflanze)', ['ein Tier, das Pflanzen frisst', 'ein Pilz, der Laub zersetzt', 'ein Raubtier'], 'Pflanzen stehen am Anfang jeder Nahrungskette.', 1],
    ['Was sind Destruenten?', 'Zersetzer wie Pilze, Bakterien und Regenwürmer', ['Raubtiere', 'Pflanzenfresser', 'Pflanzen'], 'Sie bauen tote Lebewesen zu Mineralstoffen ab.', 1],
    ['Was zeigt ein Nahrungsnetz?', 'wer wen frisst – mit vielen verknüpften Ketten', ['wie gross Tiere werden', 'wo Tiere wohnen', 'wie alt Bäume sind'], 'In der Natur fressen die meisten Tiere verschiedene Arten.', 2],
    ['Was passiert, wenn in einem Wald alle Füchse verschwinden?', 'Die Zahl der Mäuse nimmt zunächst zu.', ['Es wachsen keine Bäume mehr.', 'Die Mäuse sterben auch aus.', 'Nichts ändert sich.'], 'Ohne Räuber vermehren sich die Beutetiere stärker.', 2],
    ['Wie viel Energie gelangt ungefähr von einer Stufe zur nächsten?', 'etwa 10 %', ['etwa 90 %', 'alles', 'etwa 50 %'], 'Der Rest wird für Bewegung und Wärme verbraucht.', 2],
    ['Was ist Biodiversität?', 'die Vielfalt an Arten, Lebensräumen und Genen', ['die Anzahl Bäume pro Hektare', 'die Grösse eines Waldes', 'eine Krankheit von Pflanzen'], 'Je vielfältiger ein Ökosystem, desto stabiler ist es meist.', 3],
  ],
  bo2: [
    ['Was brauchen Pflanzen für die Fotosynthese?', 'Licht, Wasser und Kohlenstoffdioxid', ['Sauerstoff und Zucker', 'nur Erde', 'Wärme und Stickstoff'], 'Daraus stellen sie Traubenzucker und Sauerstoff her.', 1],
    ['Was entsteht bei der Fotosynthese?', 'Traubenzucker und Sauerstoff', ['Kohlenstoffdioxid und Wasser', 'Stärke und Stickstoff', 'Eiweiss und Fett'], '6 CO₂ + 6 H₂O → Traubenzucker + 6 O₂ (mit Lichtenergie).', 1],
    ['Was geschieht bei der Zellatmung?', 'Zucker wird mit Sauerstoff abgebaut, Energie wird frei.', ['Licht wird in Zucker umgewandelt.', 'Wasser wird zu Sauerstoff.', 'Pflanzen nehmen Erde auf.'], 'Zellatmung ist quasi die Umkehrung der Fotosynthese.', 2],
    ['Welcher grüne Farbstoff fängt das Sonnenlicht ein?', 'Chlorophyll', ['Hämoglobin', 'Melanin', 'Karotin'], 'Chlorophyll sitzt in den Chloroplasten.', 1],
    ['Durch welche Öffnungen nimmt das Blatt CO₂ auf?', 'durch die Spaltöffnungen', ['durch die Wurzeln', 'durch die Blattadern', 'durch die Blüte'], 'Die Spaltöffnungen liegen meist auf der Blattunterseite.', 2],
    ['Betreiben auch Pflanzen Zellatmung?', 'Ja, Tag und Nacht.', ['Nein, nur Tiere.', 'Nur nachts im Winter.', 'Nur die Blüten.'], 'Pflanzen brauchen ebenfalls Energie aus Zucker – auch nachts.', 3],
  ],
  bg2: [
    ['Wie viele Chromosomen hat eine normale menschliche Körperzelle?', '46', ['23', '48', '92'], '23 Paare – je ein Satz von Mutter und Vater.', 1],
    ['Wie viele Chromosomen hat eine Eizelle oder Spermienzelle?', '23', ['46', '12', '92'], 'Bei der Befruchtung entsteht wieder ein Satz von 46.', 2],
    ['Was ist ein Gen?', 'ein Abschnitt der DNA, der eine Information enthält', ['ein ganzes Chromosom', 'eine Zelle', 'ein Organ'], 'Gene bestimmen z. B. Merkmale wie die Augenfarbe mit.', 1],
    ['Wer entdeckte mit Erbsen die Grundregeln der Vererbung?', 'Gregor Mendel', ['Charles Darwin', 'Louis Pasteur', 'Albert Einstein'], 'Der Mönch Mendel kreuzte im 19. Jahrhundert Erbsen.', 1],
    ['Was bedeutet «dominant»?', 'Das Merkmal setzt sich durch, auch wenn es nur einmal vorhanden ist.', ['Das Merkmal ist immer verborgen.', 'Das Merkmal kommt nur bei Männern vor.', 'Das Merkmal entsteht durch Umwelt.'], 'Ein rezessives Merkmal zeigt sich nur, wenn es doppelt vorhanden ist.', 2],
    ['Was bedeutet «reinerbig» (homozygot)?', 'Beide Anlagen für ein Merkmal sind gleich (AA oder aa).', ['Die Anlagen sind verschieden (Aa).', 'Es gibt keine Anlagen.', 'Das Merkmal ist neu entstanden.'], 'Mischerbig (heterozygot) heisst: Aa.', 2],
    ['Was ist eine Mutation?', 'eine Veränderung der Erbinformation', ['eine Zellteilung', 'eine Krankheit durch Viren', 'ein neues Organ'], 'Mutationen sind eine Quelle der Vielfalt in der Evolution.', 3],
    ['Wie entsteht laut Darwin die Vielfalt der Arten?', 'durch Variation und natürliche Selektion', ['durch Zufall ohne Auswahl', 'weil Tiere sich anstrengen', 'durch Kreuzung von Pflanzen und Tieren'], 'Besser angepasste Lebewesen überleben häufiger und vererben ihre Merkmale.', 3],
  ],
};

// ---------------------------------------------------------------------------
// Reihenfolgen
// ---------------------------------------------------------------------------

export const VERDAUUNGSWEG = ['Mund', 'Speiseröhre', 'Magen', 'Dünndarm', 'Dickdarm'];
export const ATEMWEG = ['Nase', 'Rachen', 'Luftröhre', 'Bronchien', 'Lungenbläschen'];
export const BLUTWEG = ['rechter Vorhof', 'rechte Herzkammer', 'Lunge', 'linker Vorhof', 'linke Herzkammer', 'Körperarterie (Aorta)'];
export const ORGANISATION = ['Zelle', 'Gewebe', 'Organ', 'Organsystem', 'Organismus'];

/** Nahrungsketten: Produzent → Konsumenten */
export const NAHRUNGSKETTEN: string[][] = [
  ['Gras', 'Heuschrecke', 'Frosch', 'Storch'],
  ['Blätter', 'Raupe', 'Meise', 'Sperber'],
  ['Algen', 'Wasserfloh', 'Rotauge (Fisch)', 'Graureiher'],
  ['Gras', 'Kaninchen', 'Fuchs'],
  ['Eicheln', 'Waldmaus', 'Waldkauz'],
  ['Klee', 'Schnecke', 'Igel', 'Uhu'],
  ['Plankton-Algen', 'Krill', 'Blauwal'],
  ['Löwenzahn', 'Feldhase', 'Luchs'],
];

// ---------------------------------------------------------------------------
// Wirbeltiere
// ---------------------------------------------------------------------------

export const KLASSEN = ['Fische', 'Amphibien', 'Reptilien', 'Vögel', 'Säugetiere'] as const;
export type Klasse = (typeof KLASSEN)[number];

/** [Tier, Klasse, Hinweis, Stufe] */
export const TIERE: [string, Klasse, string, Difficulty][] = [
  ['Forelle', 'Fische', 'Kiemen, Schuppen, Flossen.', 1],
  ['Hai', 'Fische', 'Haie atmen mit Kiemen – sie sind (Knorpel-)Fische.', 2],
  ['Seepferdchen', 'Fische', 'Trotz der seltsamen Form ein Fisch mit Kiemen.', 3],
  ['Grasfrosch', 'Amphibien', 'Kaulquappen leben im Wasser, die Frösche an Land.', 1],
  ['Feuersalamander', 'Amphibien', 'Feuchte, drüsenreiche Haut ohne Schuppen.', 2],
  ['Bergmolch', 'Amphibien', 'Molche legen ihre Eier ins Wasser.', 2],
  ['Zauneidechse', 'Reptilien', 'Trockene Haut mit Hornschuppen.', 1],
  ['Krokodil', 'Reptilien', 'Legt Eier mit Schale an Land.', 1],
  ['Schildkröte', 'Reptilien', 'Hornschuppen bilden den Panzer.', 2],
  ['Blindschleiche', 'Reptilien', 'Keine Schlange und kein Wurm, sondern eine beinlose Echse.', 3],
  ['Pinguin', 'Vögel', 'Federn und Schnabel – auch wenn er nicht fliegen kann.', 2],
  ['Strauss', 'Vögel', 'Grösster Vogel der Welt, legt Eier.', 2],
  ['Kiwi', 'Vögel', 'Flugunfähiger Vogel aus Neuseeland.', 3],
  ['Amsel', 'Vögel', 'Federn, Schnabel, legt Eier.', 1],
  ['Fledermaus', 'Säugetiere', 'Kann fliegen, säugt aber ihre Jungen.', 2],
  ['Delfin', 'Säugetiere', 'Atmet mit Lungen und säugt seine Jungen.', 2],
  ['Blauwal', 'Säugetiere', 'Grösstes Säugetier – kein Fisch!', 2],
  ['Schnabeltier', 'Säugetiere', 'Legt zwar Eier, säugt die Jungen aber mit Milch.', 3],
  ['Murmeltier', 'Säugetiere', 'Fell, säugt die Jungen, hält Winterschlaf.', 1],
];

export const KLASSEN_MERKMALE: Fakt[] = [
  ['Welche Tiere sind gleichwarm (konstante Körpertemperatur)?', 'Vögel und Säugetiere', ['Fische und Amphibien', 'Reptilien und Vögel', 'alle Wirbeltiere'], 'Fische, Amphibien und Reptilien sind wechselwarm.', 1],
  ['Welche Wirbeltierklasse macht eine Metamorphose (Larve → erwachsenes Tier) durch?', 'Amphibien', ['Reptilien', 'Vögel', 'Säugetiere'], 'Aus der Kaulquappe wird ein Frosch.', 1],
  ['Was haben nur Säugetiere?', 'Milchdrüsen und Fell/Haare', ['eine Wirbelsäule', 'Lungen', 'Eier mit Schale'], 'Säugetiere säugen ihre Jungen mit Milch.', 1],
  ['Was haben alle Wirbeltiere gemeinsam?', 'eine Wirbelsäule', ['Federn', 'Kiemen', 'ein Fell'], 'Daher der Name Wirbeltiere.', 1],
  ['Welche Tiere haben eine trockene Haut mit Hornschuppen?', 'Reptilien', ['Amphibien', 'Fische', 'Säugetiere'], 'Die Schuppen schützen vor Austrocknung.', 2],
  ['Womit atmen erwachsene Fische?', 'mit Kiemen', ['mit Lungen', 'durch die Haut allein', 'mit Tracheen'], 'Kiemen holen Sauerstoff aus dem Wasser.', 1],
];

// ---------------------------------------------------------------------------
// Vererbung
// ---------------------------------------------------------------------------

/** Merkmal mit dominanter/rezessiver Ausprägung: [Lebewesen, Buchstabe, dominant, rezessiv] */
export const MERKMALE: [string, string, string, string][] = [
  ['Erbsen (Samenfarbe)', 'G', 'gelb', 'grün'],
  ['Meerschweinchen (Fellfarbe)', 'S', 'schwarz', 'weiss'],
  ['Erbsen (Samenform)', 'R', 'rund', 'runzelig'],
  ['Kaninchen (Fell)', 'K', 'kurzhaarig', 'langhaarig'],
];
