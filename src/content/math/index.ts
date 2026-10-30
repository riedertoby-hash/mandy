import type { Subject, Topic } from '../../core/types';
import { percentTopic } from './percent';

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

// Roadmap of the whole math curriculum (Lehrplan 21: Zahl & Variable, Form & Raum, Grössen, Funktionen & Daten).
// Topics without chapters are shown on the map as "in Vorbereitung".
export const mathSubject: Subject = {
  id: 'mathe',
  name: 'Mathematik',
  icon: '🧮',
  color: '#6c4cf1',
  topics: [
    planned('zahlen100', 'Zahlen bis 100', 1, '1.–2. Klasse', '🔢', 'Zählen, ordnen, Zehner und Einer.', ['Zählen & Ordnen', 'Zehner und Einer', 'Plus und Minus bis 100']),
    planned('einmaleins', 'Das Einmaleins', 1, '2.–3. Klasse', '✖️', 'Malreihen sicher im Kopf.', ['Kernaufgaben', 'Alle Reihen', 'Teilen']),
    planned('zahlenraum', 'Grosse Zahlen', 2, '3.–5. Klasse', '🏔️', 'Stellenwerte bis zur Million und weiter.', ['Stellenwerte', 'Runden', 'Schriftlich rechnen']),
    planned('masse', 'Grössen & Masseinheiten', 2, '3.–6. Klasse', '📏', 'Länge, Gewicht, Zeit, Geld, Volumen.', ['Längen', 'Gewichte', 'Zeit', 'Hohlmasse']),
    planned('brueche', 'Brüche', 2, '4.–6. Klasse', '🍕', 'Anteile verstehen, kürzen, erweitern, rechnen.', ['Brüche verstehen', 'Kürzen & Erweitern', 'Addieren & Subtrahieren', 'Multiplizieren & Dividieren']),
    planned('dezimal', 'Dezimalzahlen', 2, '5.–6. Klasse', '🔟', 'Kommazahlen lesen, ordnen und rechnen.', ['Stellenwerte', 'Rechnen', 'Runden']),
    planned('geometrie1', 'Formen & Flächen', 2, '3.–6. Klasse', '📐', 'Vierecke, Dreiecke, Umfang und Fläche.', ['Formen erkennen', 'Umfang', 'Flächeninhalt']),
    planned('negativ', 'Negative Zahlen', 3, 'Sek 1', '🌡️', 'Rechnen mit ganzen und rationalen Zahlen.', ['Zahlengerade', 'Addieren & Subtrahieren', 'Multiplizieren & Dividieren']),
    planned('terme', 'Terme & Variablen', 3, 'Sek 1', '🔤', 'Mit Buchstaben rechnen, vereinfachen, ausmultiplizieren.', ['Terme aufstellen', 'Vereinfachen', 'Klammern']),
    planned('gleichungen', 'Gleichungen', 3, 'Sek 1–2', '⚖️', 'Gleichungen umformen und lösen.', ['Einfache Gleichungen', 'Umformen', 'Textaufgaben']),
    planned('proportional', 'Proportionalität', 3, 'Sek 1', '🔗', 'Dreisatz, proportional und umgekehrt proportional.', ['Dreisatz', 'Proportional', 'Umgekehrt proportional']),
    percentTopic,
    planned('potenzen', 'Potenzen & Wurzeln', 3, 'Sek 2', '🌱', 'Hochzahlen, Quadratwurzeln, wissenschaftliche Schreibweise.', ['Potenzen', 'Wurzeln', 'Grosse & kleine Zahlen']),
    planned('pythagoras', 'Satz des Pythagoras', 3, 'Sek 2', '📐', 'a² + b² = c² und Anwendungen.', ['Der Satz', 'Anwendungen']),
    planned('koerper', 'Flächen & Körper', 3, 'Sek 2–3', '🧊', 'Kreis, Prisma, Zylinder, Pyramide, Kegel.', ['Kreis', 'Prisma & Zylinder', 'Pyramide & Kegel']),
    planned('funktionen', 'Lineare Funktionen', 3, 'Sek 2–3', '📉', 'Graphen, Steigung, Funktionsgleichung.', ['Koordinaten', 'Steigung', 'Gleichung der Geraden']),
    planned('gleichungssysteme', 'Gleichungssysteme', 3, 'Sek 3', '🧷', 'Zwei Gleichungen, zwei Unbekannte.', ['Gleichsetzen', 'Einsetzen', 'Textaufgaben']),
    planned('statistik', 'Statistik & Wahrscheinlichkeit', 3, 'Sek 1–3', '🎲', 'Mittelwert, Diagramme, Zufall.', ['Mittelwerte', 'Diagramme', 'Wahrscheinlichkeit']),
  ],
};
