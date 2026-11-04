// Geschichte (Sek 1–3, Lehrplan 21 RZG). Jahreszahlen nach gängigen Schweizer Lehrmitteln.
import type { Difficulty } from '../../core/types';

/** [Jahr, kurzes Ereignis (für Kärtchen), Erklärung, Stufe] */
export type Ereignis = [number, string, string, Difficulty];

export const EREIGNISSE: Record<string, Ereignis[]> = {
  // Alte Eidgenossenschaft
  ch1: [
    [1291, 'Bundesbrief von Uri, Schwyz und Unterwalden', 'Die drei Länder versprechen sich gegenseitige Hilfe – später als Gründung der Eidgenossenschaft gefeiert (1. August).', 1],
    [1315, 'Schlacht am Morgarten', 'Die Schwyzer besiegen ein habsburgisches Ritterheer.', 2],
    [1332, 'Luzern tritt dem Bund bei', 'Erste Stadt im Bund der Eidgenossen.', 3],
    [1351, 'Zürich tritt dem Bund bei', 'Zürich verbündet sich mit den Waldstätten.', 3],
    [1353, 'Bern tritt dem Bund bei', 'Mit Bern entsteht die Eidgenossenschaft der acht Orte.', 3],
    [1386, 'Schlacht bei Sempach', 'Die Eidgenossen siegen gegen Herzog Leopold III. von Habsburg.', 2],
    [1476, 'Schlachten bei Grandson und Murten', 'Siege gegen Karl den Kühnen von Burgund.', 3],
    [1499, 'Schwabenkrieg', 'Die Eidgenossenschaft löst sich faktisch vom Heiligen Römischen Reich.', 3],
    [1515, 'Schlacht bei Marignano', 'Niederlage gegen Frankreich – Ende der eidgenössischen Grossmachtpolitik.', 2],
  ],
  // Reformation bis Bundesstaat
  ch2: [
    [1517, 'Luther veröffentlicht seine 95 Thesen', 'Beginn der Reformation in Deutschland.', 1],
    [1519, 'Zwingli predigt in Zürich', 'Huldrych Zwingli wird Leutpriester am Grossmünster und beginnt die Reformation in Zürich.', 2],
    [1536, 'Calvin kommt nach Genf', 'Johannes Calvin macht Genf zum Zentrum der Reformation.', 3],
    [1648, 'Westfälischer Friede', 'Die Unabhängigkeit der Eidgenossenschaft vom Reich wird anerkannt.', 2],
    [1798, 'Helvetische Republik', 'Französische Truppen marschieren ein; die alte Eidgenossenschaft endet.', 2],
    [1803, 'Mediationsakte Napoleons', 'Napoleon gibt der Schweiz wieder eine föderalistische Ordnung; neue Kantone entstehen.', 3],
    [1815, 'Wiener Kongress anerkennt die Neutralität', 'Die Grossmächte anerkennen die immerwährende Neutralität der Schweiz.', 2],
    [1847, 'Sonderbundskrieg', 'Kurzer Bürgerkrieg zwischen liberalen und katholisch-konservativen Kantonen.', 2],
    [1848, 'Bundesverfassung – moderner Bundesstaat', 'Die Schweiz wird ein Bundesstaat mit Bundesrat und Parlament.', 1],
  ],
  // Schweiz im 20. Jahrhundert
  ch3: [
    [1918, 'Landesstreik', 'Grösster Generalstreik der Schweiz: Forderungen u. a. nach 48-Stunden-Woche und Frauenstimmrecht.', 2],
    [1939, 'Henri Guisan wird General', 'Bei Kriegsbeginn wählt die Bundesversammlung Henri Guisan zum General.', 2],
    [1940, 'Rütlirapport', 'General Guisan ruft die Offiziere zum Widerstand auf (Réduit-Strategie).', 3],
    [1948, 'Einführung der AHV', 'Die Alters- und Hinterlassenenversicherung tritt in Kraft.', 2],
    [1959, 'Zauberformel im Bundesrat', 'Die vier grossen Parteien teilen sich die sieben Bundesratssitze.', 3],
    [1971, 'Frauenstimmrecht auf Bundesebene', 'Erst seit 1971 dürfen Frauen in der Schweiz national abstimmen und wählen.', 1],
    [1979, 'Gründung des Kantons Jura', 'Der Jura löst sich von Bern und wird zum jüngsten Kanton der Schweiz.', 2],
    [1990, 'Bundesgericht: Frauenstimmrecht in Appenzell Innerrhoden', 'Als letzter Kanton muss Appenzell Innerrhoden das Frauenstimmrecht einführen.', 3],
    [1992, 'Nein zum EWR', 'Das Stimmvolk lehnt den Beitritt zum Europäischen Wirtschaftsraum knapp ab.', 3],
    [2002, 'UNO-Beitritt der Schweiz', 'Nach einer Volksabstimmung wird die Schweiz Mitglied der Vereinten Nationen.', 2],
  ],
  // Revolutionen
  nz1: [
    [1776, 'Unabhängigkeitserklärung der USA', 'Die 13 Kolonien erklären sich unabhängig von Grossbritannien.', 2],
    [1789, 'Sturm auf die Bastille', 'Am 14. Juli beginnt die Französische Revolution.', 1],
    [1793, 'Hinrichtung von Ludwig XVI.', 'Der König stirbt unter der Guillotine; Beginn der Schreckensherrschaft.', 3],
    [1799, 'Napoleon übernimmt die Macht', 'Mit einem Staatsstreich wird Napoleon Erster Konsul.', 3],
    [1804, 'Napoleon krönt sich zum Kaiser', 'Im selben Jahr tritt der Code civil in Kraft.', 2],
    [1812, 'Napoleons Russlandfeldzug', 'Die Grande Armée wird in Russland fast vollständig vernichtet.', 2],
    [1815, 'Schlacht bei Waterloo', 'Napoleons endgültige Niederlage.', 2],
  ],
  // Industrialisierung
  nz2: [
    [1769, 'Watt verbessert die Dampfmaschine', 'James Watts Dampfmaschine treibt die Industrialisierung an.', 2],
    [1825, 'Erste öffentliche Eisenbahn in England', 'Die Strecke Stockton–Darlington wird eröffnet.', 3],
    [1847, 'Spanisch-Brötli-Bahn Zürich–Baden', 'Erste Eisenbahnstrecke ganz auf Schweizer Boden.', 2],
    [1848, 'Kommunistisches Manifest', 'Karl Marx und Friedrich Engels fordern eine Revolution der Arbeiter.', 3],
    [1877, 'Eidgenössisches Fabrikgesetz', '11-Stunden-Tag und Verbot der Fabrikarbeit für Kinder unter 14 Jahren.', 3],
    [1882, 'Eröffnung der Gotthardbahn', 'Der Gotthard-Eisenbahntunnel verbindet Nord und Süd.', 2],
    [1886, 'Benz baut das erste Automobil', 'Carl Benz meldet seinen Motorwagen zum Patent an.', 2],
  ],
  // Erster Weltkrieg
  wk1: [
    [1914, 'Attentat von Sarajevo – Kriegsbeginn', 'Der österreichische Thronfolger wird ermordet; wenige Wochen später beginnt der Krieg.', 1],
    [1916, 'Schlacht um Verdun', 'Eine der verlustreichsten Schlachten des Stellungskriegs.', 2],
    [1917, 'Russische Revolution', 'Die Bolschewiki unter Lenin übernehmen die Macht.', 2],
    [1918, 'Waffenstillstand – Kriegsende', 'Am 11. November 1918 schweigen die Waffen.', 1],
    [1919, 'Vertrag von Versailles', 'Deutschland muss harte Friedensbedingungen annehmen.', 2],
    [1920, 'Völkerbund nimmt Arbeit auf', 'Sitz des Völkerbunds wird Genf.', 3],
    [1929, 'Börsencrash – Weltwirtschaftskrise', 'Der «Schwarze Donnerstag» in New York löst eine weltweite Krise aus.', 2],
  ],
  // Zweiter Weltkrieg
  wk2: [
    [1933, 'Hitler wird Reichskanzler', 'Die NSDAP übernimmt die Macht und errichtet eine Diktatur.', 1],
    [1938, 'Novemberpogrome', 'Gewalt gegen Jüdinnen und Juden in ganz Deutschland.', 2],
    [1939, 'Überfall auf Polen – Kriegsbeginn', 'Am 1. September 1939 beginnt der Zweite Weltkrieg.', 1],
    [1941, 'Überfall auf die Sowjetunion', 'Deutschland greift die Sowjetunion an; Ende Jahr treten die USA in den Krieg ein.', 2],
    [1942, 'Wannseekonferenz', 'Planung der systematischen Ermordung der europäischen Jüdinnen und Juden.', 3],
    [1943, 'Niederlage bei Stalingrad', 'Wendepunkt des Kriegs im Osten.', 3],
    [1944, 'Landung in der Normandie (D-Day)', 'Die Alliierten eröffnen eine zweite Front im Westen.', 2],
    [1945, 'Kriegsende in Europa', 'Am 8. Mai 1945 kapituliert Deutschland.', 1],
  ],
  // Kalter Krieg
  kk1: [
    [1945, 'Gründung der UNO', 'Die Vereinten Nationen sollen den Frieden sichern.', 2],
    [1949, 'Gründung der NATO', 'Westliches Verteidigungsbündnis unter Führung der USA.', 2],
    [1955, 'Gründung des Warschauer Pakts', 'Militärbündnis der Ostblockstaaten unter Führung der Sowjetunion.', 3],
    [1957, 'Sputnik – erster Satellit', 'Die Sowjetunion schiesst den ersten Satelliten ins All.', 3],
    [1961, 'Bau der Berliner Mauer', 'Die DDR riegelt West-Berlin ab.', 1],
    [1962, 'Kubakrise', 'Die Welt steht kurz vor einem Atomkrieg.', 2],
    [1969, 'Erste Mondlandung', 'Neil Armstrong betritt als erster Mensch den Mond.', 1],
    [1989, 'Fall der Berliner Mauer', 'Am 9. November 1989 öffnet die DDR die Grenze.', 1],
    [1990, 'Deutsche Wiedervereinigung', 'DDR und BRD werden wieder ein Staat.', 2],
    [1991, 'Auflösung der Sowjetunion', 'Die UdSSR zerfällt in 15 unabhängige Staaten.', 2],
  ],
};

/** Begriffe & Personen: [Frage, richtig, falsch[], Erklärung, Stufe] */
export const BEGRIFFE: Record<string, [string, string, string[], string, Difficulty][]> = {
  ch1: [
    ['Wer ist Wilhelm Tell?', 'eine Sagenfigur der Befreiungsgeschichte', ['der erste Bundespräsident', 'ein habsburgischer König', 'der Gründer von Bern'], 'Ob Tell wirklich gelebt hat, ist nicht belegt – er ist eine Sagengestalt.', 1],
    ['Gegen welches Herrschergeschlecht kämpften die frühen Eidgenossen vor allem?', 'die Habsburger', ['die Bourbonen', 'die Medici', 'die Tudors'], 'Die Habsburger hatten Herrschaftsrechte in der Innerschweiz.', 1],
    ['Was waren Reisläufer?', 'Schweizer Söldner in fremden Diensten', ['reisende Händler', 'Pilger nach Rom', 'Boten der Tagsatzung'], 'Viele junge Eidgenossen kämpften gegen Bezahlung für fremde Herrscher.', 2],
    ['Was war die Tagsatzung?', 'die Versammlung der Gesandten der Orte', ['ein Feiertag', 'ein Gericht in Rom', 'ein Steuerbuch'], 'An der Tagsatzung berieten die Gesandten der eidgenössischen Orte.', 2],
    ['Was ist eine Landsgemeinde?', 'eine Versammlung der Stimmberechtigten unter freiem Himmel', ['eine Kirche', 'ein Landvogt', 'ein Marktplatz'], 'Heute gibt es sie noch in Glarus und Appenzell Innerrhoden.', 2],
    ['Wie heissen die drei Urkantone?', 'Uri, Schwyz und Unterwalden', ['Zürich, Bern und Luzern', 'Uri, Glarus und Zug', 'Schwyz, Luzern und Zug'], 'Sie schlossen den Bund von 1291.', 1],
  ],
  ch2: [
    ['Wer führte die Reformation in Zürich ein?', 'Huldrych Zwingli', ['Martin Luther', 'Johannes Calvin', 'Niklaus von Flüe'], 'Zwingli wirkte ab 1519 am Grossmünster.', 1],
    ['Was kritisierten die Reformatoren unter anderem?', 'den Ablasshandel', ['den Buchdruck', 'die Schulen', 'die Landwirtschaft'], 'Mit Ablassbriefen konnte man sich angeblich von Sündenstrafen freikaufen.', 2],
    ['Wer kämpfte im Sonderbund gegen die anderen Kantone?', 'katholisch-konservative Kantone', ['die reformierten Städte', 'die französischsprachigen Kantone', 'das Tessin allein'], 'Luzern, Uri, Schwyz, Unterwalden, Zug, Freiburg und Wallis bildeten den Sonderbund.', 2],
    ['Wer führte die eidgenössischen Truppen im Sonderbundskrieg?', 'General Guillaume-Henri Dufour', ['General Henri Guisan', 'Napoleon', 'Alfred Escher'], 'Dufour führte den Krieg mit möglichst wenig Opfern.', 3],
    ['Aus wie vielen Mitgliedern besteht der Bundesrat seit 1848?', '7', ['5', '9', '26'], 'Die Landesregierung hat sieben gleichberechtigte Mitglieder.', 1],
    ['Wie heissen die beiden Kammern des Parlaments?', 'Nationalrat und Ständerat', ['Bundesrat und Nationalrat', 'Senat und Kongress', 'Grosser Rat und Kleiner Rat'], 'Das Zweikammersystem wurde 1848 nach US-Vorbild eingeführt.', 2],
  ],
  ch3: [
    ['Was war das Réduit?', 'die Verteidigungsstellung der Armee in den Alpen', ['ein Bunker in Bern', 'ein Flüchtlingslager', 'ein Wirtschaftsabkommen'], 'Im Zweiten Weltkrieg zog sich die Armee in die Alpenfestung zurück.', 2],
    ['Was war die «Anbauschlacht» (Plan Wahlen)?', 'mehr Lebensmittel im eigenen Land anbauen', ['ein Krieg um Ackerland', 'ein Fussballturnier', 'eine Bauernrevolte'], 'Sogar Parks wurden zu Kartoffelfeldern.', 2],
    ['Wofür steht der Satz «Das Boot ist voll»?', 'die strenge Flüchtlingspolitik im Zweiten Weltkrieg', ['die Überfüllung der Schiffe auf dem Zürichsee', 'die Auswanderung nach Amerika', 'den Bau der Gotthardbahn'], 'Viele jüdische Flüchtlinge wurden an der Grenze abgewiesen.', 3],
    ['Was ist die AHV?', 'die Altersvorsorge (Rente) für alle', ['eine Armee-Einheit', 'eine Partei', 'die Autobahnvignette'], 'Die AHV gibt es seit 1948.', 1],
    ['Seit wann dürfen Frauen in der Schweiz national abstimmen?', '1971', ['1918', '1945', '1990'], 'Die Schweiz führte das Frauenstimmrecht im europäischen Vergleich sehr spät ein.', 1],
    ['Was regelt die «Zauberformel»?', 'die Verteilung der Bundesratssitze auf die Parteien', ['das Datum der Abstimmungen', 'die Höhe der Steuern', 'die Sprachen im Parlament'], 'Ab 1959 galt die Verteilung 2-2-2-1.', 3],
  ],
  nz1: [
    ['Wie hiessen die drei Stände in Frankreich vor der Revolution?', 'Klerus, Adel, Dritter Stand', ['König, Bürger, Bauern', 'Adel, Händler, Soldaten', 'Kirche, Stadt, Land'], 'Der Dritte Stand (rund 98 % der Menschen) zahlte fast alle Steuern.', 1],
    ['Wie lautet das Motto der Französischen Revolution?', 'Freiheit, Gleichheit, Brüderlichkeit', ['Gott, König, Vaterland', 'Brot und Spiele', 'Einer für alle, alle für einen'], '«Liberté, Égalité, Fraternité».', 1],
    ['Was bedeutet «Ancien Régime»?', 'die alte Ordnung vor der Revolution', ['die neue Republik', 'die Armee Napoleons', 'die Regierung der Jakobiner'], 'Absolutistische Herrschaft des Königs und Vorrechte von Adel und Klerus.', 2],
    ['Welches Gesetzbuch liess Napoleon schaffen?', 'den Code civil', ['die Magna Carta', 'die Bill of Rights', 'die Bundesverfassung'], 'Der Code civil regelte z. B. Eigentum und Gleichheit vor dem Gesetz.', 2],
    ['Was war die Guillotine?', 'ein Fallbeil zur Hinrichtung', ['ein Gefängnis in Paris', 'eine Zeitung', 'ein Revolutionslied'], 'Während der Schreckensherrschaft wurden Tausende hingerichtet.', 2],
    ['Was drückt der Satz «Der Staat bin ich» aus?', 'Der König hat alle Macht (Absolutismus).', ['das Volk entscheidet', 'die Kirche regiert', 'die Kantone sind gleichberechtigt'], 'Zugeschrieben Ludwig XIV.', 3],
  ],
  nz2: [
    ['Was war die «Soziale Frage»?', 'die Not der Fabrikarbeiterinnen und -arbeiter', ['eine Frage beim Volksentscheid', 'die Frage nach der Religion', 'ein Streit unter Adligen'], 'Lange Arbeitstage, tiefe Löhne, Kinderarbeit und schlechte Wohnungen.', 1],
    ['Wer schrieb «Das Kapital» und kritisierte den Kapitalismus?', 'Karl Marx', ['Adam Smith', 'James Watt', 'Henri Dunant'], 'Marx forderte, dass die Arbeiter die Produktionsmittel besitzen.', 2],
    ['Was taten Gewerkschaften?', 'Arbeiter schlossen sich zusammen, um bessere Bedingungen zu erkämpfen', ['Fabrikbesitzer gründeten Banken', 'Bauern verkauften Land', 'Städte bauten Bahnhöfe'], 'Gemeinsam konnten sie z. B. kürzere Arbeitszeiten fordern.', 2],
    ['In welchem Land begann die Industrialisierung?', 'in England', ['in der Schweiz', 'in Russland', 'in Italien'], 'Kohle, Eisen und Kapital waren in England reichlich vorhanden.', 1],
    ['Wer gründete das Rote Kreuz?', 'Henri Dunant', ['Alfred Escher', 'Karl Marx', 'Guillaume-Henri Dufour'], 'Der Genfer Henri Dunant gründete 1863 das Rote Kreuz.', 2],
    ['Was bedeutet Urbanisierung?', 'Menschen ziehen vom Land in die Städte', ['Bau von Kirchen', 'Rückkehr zur Landwirtschaft', 'Auswanderung nach Amerika'], 'Die Fabriken zogen viele Menschen in die Städte.', 2],
  ],
  wk1: [
    ['Welche Bündnisse standen sich im Ersten Weltkrieg gegenüber?', 'Entente und Mittelmächte', ['NATO und Warschauer Pakt', 'Achse und Alliierte', 'Ost und West'], 'Entente: Frankreich, Grossbritannien, Russland; Mittelmächte: Deutschland, Österreich-Ungarn.', 1],
    ['Was war typisch für den Krieg an der Westfront?', 'der Stellungskrieg in Schützengräben', ['schnelle Panzerangriffe', 'Atombomben', 'Kämpfe nur auf See'], 'Die Fronten bewegten sich jahrelang kaum.', 1],
    ['Welche neue Waffe wurde im Ersten Weltkrieg erstmals in grossem Stil eingesetzt?', 'Giftgas', ['die Atombombe', 'Raketen', 'Drohnen'], 'Giftgas verursachte schreckliche Verletzungen.', 2],
    ['Wo hatte der Völkerbund seinen Sitz?', 'in Genf', ['in New York', 'in Paris', 'in Wien'], 'Der Völkerbund sollte nach dem Krieg den Frieden sichern.', 2],
    ['Warum fühlten sich viele Deutsche durch den Versailler Vertrag gedemütigt?', 'wegen Gebietsverlusten, hoher Reparationen und der Alleinschuld am Krieg', ['weil Deutschland Kolonien bekam', 'weil der Kaiser bleiben durfte', 'weil die Armee vergrössert wurde'], 'Diese Unzufriedenheit nutzten später die Nationalsozialisten.', 3],
  ],
  wk2: [
    ['Was bezeichnet der Begriff Holocaust (Shoa)?', 'den Völkermord an rund sechs Millionen Jüdinnen und Juden', ['den Bombenkrieg', 'die Besetzung Frankreichs', 'den Kalten Krieg'], 'Die Nationalsozialisten ermordeten systematisch Millionen Menschen.', 1],
    ['Welche Mächte bildeten die «Achse»?', 'Deutschland, Italien, Japan', ['USA, Grossbritannien, Sowjetunion', 'Frankreich, Polen, Belgien', 'Schweiz, Schweden, Spanien'], 'Gegen sie kämpften die Alliierten.', 2],
    ['Wie hiess die Partei Hitlers?', 'NSDAP', ['SPD', 'KPD', 'CDU'], 'Nationalsozialistische Deutsche Arbeiterpartei.', 1],
    ['Was war die «Weisse Rose»?', 'eine Widerstandsgruppe von Studierenden', ['eine Propaganda-Zeitung', 'ein Orden der SS', 'eine Schweizer Hilfsorganisation'], 'Sophie und Hans Scholl verteilten Flugblätter gegen das NS-Regime.', 2],
    ['Was war Auschwitz?', 'das grösste Vernichtungslager der Nationalsozialisten', ['eine Stadt in der Schweiz', 'eine Panzerschlacht', 'ein Friedensvertrag'], 'Allein in Auschwitz wurden über eine Million Menschen ermordet.', 2],
    ['Warum gilt Stalingrad als Wendepunkt?', 'Die deutsche Armee erlitt dort eine schwere Niederlage.', ['Dort wurde der Krieg beendet.', 'Dort landeten die Alliierten.', 'Dort trafen sich Hitler und Stalin.'], 'Ab 1943 waren die deutschen Truppen im Osten auf dem Rückzug.', 3],
  ],
  kk1: [
    ['Wer stand sich im Kalten Krieg gegenüber?', 'die USA (Westen) und die Sowjetunion (Osten)', ['Deutschland und Frankreich', 'China und Japan', 'die Schweiz und Österreich'], 'Zwei Supermächte mit unterschiedlichen Systemen: Demokratie/Kapitalismus und Kommunismus.', 1],
    ['Warum heisst er «Kalter» Krieg?', 'Die Supermächte kämpften nicht direkt gegeneinander.', ['Er fand vor allem im Winter statt.', 'Er wurde in der Arktis geführt.', 'Es gab keine Waffen.'], 'Es gab Wettrüsten, Spionage und Stellvertreterkriege – aber keinen direkten Krieg.', 1],
    ['Was meinte Churchill mit dem «Eisernen Vorhang»?', 'die Grenze zwischen Ost- und Westeuropa', ['eine Mauer in Paris', 'ein Theater in London', 'die Alpen'], 'Er trennte die demokratischen Staaten im Westen vom Ostblock.', 2],
    ['Was sind Stellvertreterkriege?', 'Kriege in anderen Ländern, in denen die Supermächte verschiedene Seiten unterstützten', ['Kriege zwischen Vertretern', 'Kriege um Wahlen', 'Kriege im Weltraum'], 'Beispiele: Korea- und Vietnamkrieg.', 2],
    ['Wer leitete mit Glasnost und Perestroika Reformen in der Sowjetunion ein?', 'Michail Gorbatschow', ['Josef Stalin', 'Nikita Chruschtschow', 'Wladimir Putin'], 'Seine Reformen trugen zum Ende des Kalten Kriegs bei.', 2],
    ['Was war das Wettrüsten?', 'beide Seiten bauten immer mehr Atomwaffen', ['ein Sportwettkampf', 'ein Wettlauf zum Mond', 'ein Handelsvertrag'], 'Die gegenseitige Abschreckung sollte einen Krieg verhindern.', 1],
  ],
  me1: [
    ['Was ist eine Primärquelle?', 'ein Zeugnis aus der Zeit selbst (z. B. Brief, Foto, Urkunde)', ['ein Schulbuch von heute', 'ein Film über die Vergangenheit', 'eine Wikipedia-Seite'], 'Primärquellen stammen direkt aus der untersuchten Zeit.', 1],
    ['Was ist eine Sekundärquelle?', 'ein späterer Text über die Vergangenheit (z. B. Schulbuch)', ['ein Tagebuch aus dem Krieg', 'eine mittelalterliche Urkunde', 'eine Münze aus der Römerzeit'], 'Sekundärquellen deuten und erklären Primärquellen.', 1],
    ['In welcher Reihenfolge folgen die Epochen?', 'Antike – Mittelalter – Neuzeit – Zeitgeschichte', ['Mittelalter – Antike – Neuzeit – Zeitgeschichte', 'Antike – Neuzeit – Mittelalter – Zeitgeschichte', 'Neuzeit – Mittelalter – Antike – Zeitgeschichte'], 'Antike (bis ca. 500), Mittelalter (ca. 500–1500), Neuzeit (ab ca. 1500).', 1],
    ['Womit beginnt man oft die Neuzeit?', 'mit der Entdeckung Amerikas (1492) und der Reformation', ['mit dem Bau der Pyramiden', 'mit dem Ersten Weltkrieg', 'mit der Mondlandung'], 'Um 1500 veränderten Buchdruck, Entdeckungen und Reformation Europa.', 2],
    ['Was bedeutet «v. Chr.»?', 'vor Christi Geburt', ['vor Christoph Columbus', 'von Chronik', 'viertes Jahrhundert'], 'Unsere Zeitrechnung zählt ab der (angenommenen) Geburt Christi.', 1],
    ['Warum muss man Quellen kritisch lesen?', 'weil sie aus einer bestimmten Sicht geschrieben sind', ['weil alle Quellen gefälscht sind', 'weil Quellen immer langweilig sind', 'weil nur Bilder wahr sind'], 'Wer hat die Quelle wann, warum und für wen geschrieben?', 2],
  ],
};
