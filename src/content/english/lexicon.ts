// English word material (British English, level A2–B1 / Sek 1–3).
// All verb forms are written out on purpose – no spelling rules that could produce wrong forms.

/** [base, simple past, past participle, German, frequency group 1–3, extra accepted forms] */
export type Irregular = [string, string, string, string, 1 | 2 | 3, string[]?];

export const IRREGULAR: Irregular[] = [
  // Group 1 – the most frequent ones
  ['be', 'was/were', 'been', 'sein', 1, ['was', 'were']],
  ['have', 'had', 'had', 'haben', 1],
  ['do', 'did', 'done', 'tun, machen', 1],
  ['go', 'went', 'gone', 'gehen', 1],
  ['come', 'came', 'come', 'kommen', 1],
  ['get', 'got', 'got', 'bekommen', 1],
  ['make', 'made', 'made', 'machen, herstellen', 1],
  ['say', 'said', 'said', 'sagen', 1],
  ['see', 'saw', 'seen', 'sehen', 1],
  ['take', 'took', 'taken', 'nehmen', 1],
  ['give', 'gave', 'given', 'geben', 1],
  ['know', 'knew', 'known', 'wissen, kennen', 1],
  ['think', 'thought', 'thought', 'denken', 1],
  ['eat', 'ate', 'eaten', 'essen', 1],
  ['drink', 'drank', 'drunk', 'trinken', 1],
  ['write', 'wrote', 'written', 'schreiben', 1],
  ['read', 'read', 'read', 'lesen', 1],
  ['buy', 'bought', 'bought', 'kaufen', 1],
  ['find', 'found', 'found', 'finden', 1],
  ['tell', 'told', 'told', 'erzählen', 1],
  ['sleep', 'slept', 'slept', 'schlafen', 1],
  ['swim', 'swam', 'swum', 'schwimmen', 1],
  ['run', 'ran', 'run', 'rennen', 1],
  ['sing', 'sang', 'sung', 'singen', 1],
  ['meet', 'met', 'met', 'treffen', 1],
  // Group 2
  ['begin', 'began', 'begun', 'beginnen', 2],
  ['bring', 'brought', 'brought', 'bringen', 2],
  ['build', 'built', 'built', 'bauen', 2],
  ['catch', 'caught', 'caught', 'fangen', 2],
  ['choose', 'chose', 'chosen', 'wählen', 2],
  ['drive', 'drove', 'driven', 'fahren (Auto)', 2],
  ['fall', 'fell', 'fallen', 'fallen', 2],
  ['feel', 'felt', 'felt', 'fühlen', 2],
  ['fly', 'flew', 'flown', 'fliegen', 2],
  ['forget', 'forgot', 'forgotten', 'vergessen', 2],
  ['grow', 'grew', 'grown', 'wachsen', 2],
  ['hear', 'heard', 'heard', 'hören', 2],
  ['keep', 'kept', 'kept', 'behalten', 2],
  ['leave', 'left', 'left', 'verlassen', 2],
  ['lose', 'lost', 'lost', 'verlieren', 2],
  ['pay', 'paid', 'paid', 'bezahlen', 2],
  ['put', 'put', 'put', 'legen, stellen', 2],
  ['ride', 'rode', 'ridden', 'reiten, fahren (Velo)', 2],
  ['sell', 'sold', 'sold', 'verkaufen', 2],
  ['send', 'sent', 'sent', 'senden', 2],
  ['sit', 'sat', 'sat', 'sitzen', 2],
  ['speak', 'spoke', 'spoken', 'sprechen', 2],
  ['spend', 'spent', 'spent', 'ausgeben, verbringen', 2],
  ['stand', 'stood', 'stood', 'stehen', 2],
  ['teach', 'taught', 'taught', 'unterrichten', 2],
  ['understand', 'understood', 'understood', 'verstehen', 2],
  ['wear', 'wore', 'worn', 'tragen (Kleider)', 2],
  ['win', 'won', 'won', 'gewinnen', 2],
  // Group 3 – less frequent / trickier
  ['bite', 'bit', 'bitten', 'beissen', 3],
  ['blow', 'blew', 'blown', 'blasen', 3],
  ['break', 'broke', 'broken', 'zerbrechen', 3],
  ['dream', 'dreamt', 'dreamt', 'träumen', 3, ['dreamed']],
  ['draw', 'drew', 'drawn', 'zeichnen', 3],
  ['feed', 'fed', 'fed', 'füttern', 3],
  ['fight', 'fought', 'fought', 'kämpfen', 3],
  ['forgive', 'forgave', 'forgiven', 'vergeben', 3],
  ['freeze', 'froze', 'frozen', 'frieren', 3],
  ['hide', 'hid', 'hidden', 'verstecken', 3],
  ['hold', 'held', 'held', 'halten', 3],
  ['hurt', 'hurt', 'hurt', 'verletzen', 3],
  ['lead', 'led', 'led', 'führen', 3],
  ['learn', 'learnt', 'learnt', 'lernen', 3, ['learned']],
  ['lend', 'lent', 'lent', 'ausleihen', 3],
  ['mean', 'meant', 'meant', 'bedeuten', 3],
  ['ring', 'rang', 'rung', 'klingeln', 3],
  ['rise', 'rose', 'risen', 'steigen', 3],
  ['shake', 'shook', 'shaken', 'schütteln', 3],
  ['shine', 'shone', 'shone', 'scheinen', 3],
  ['shoot', 'shot', 'shot', 'schiessen', 3],
  ['steal', 'stole', 'stolen', 'stehlen', 3],
  ['throw', 'threw', 'thrown', 'werfen', 3],
  ['wake', 'woke', 'woken', 'aufwachen', 3],
];

// ---------------------------------------------------------------------------
// Verbs for sentence building (forms written out)
// ---------------------------------------------------------------------------

export interface Verb {
  base: string;
  s: string;
  ing: string;
  past: string;
  pp: string;
  objects: string[];
}

const v = (base: string, s: string, ing: string, past: string, pp: string, objects: string[]): Verb => ({ base, s, ing, past, pp, objects });

export const VERBS: Verb[] = [
  v('play', 'plays', 'playing', 'played', 'played', ['football', 'the guitar', 'computer games']),
  v('watch', 'watches', 'watching', 'watched', 'watched', ['a film', 'TV', 'the news']),
  v('read', 'reads', 'reading', 'read', 'read', ['a book', 'the newspaper', 'a comic']),
  v('write', 'writes', 'writing', 'wrote', 'written', ['an email', 'a letter', 'a story']),
  v('eat', 'eats', 'eating', 'ate', 'eaten', ['pizza', 'an apple', 'a sandwich']),
  v('drink', 'drinks', 'drinking', 'drank', 'drunk', ['tea', 'orange juice', 'water']),
  v('cook', 'cooks', 'cooking', 'cooked', 'cooked', ['dinner', 'spaghetti', 'soup']),
  v('clean', 'cleans', 'cleaning', 'cleaned', 'cleaned', ['the kitchen', 'the bathroom', 'the windows']),
  v('visit', 'visits', 'visiting', 'visited', 'visited', ['the museum', 'the zoo', 'a castle']),
  v('buy', 'buys', 'buying', 'bought', 'bought', ['new shoes', 'a present', 'some bread']),
  v('ride', 'rides', 'riding', 'rode', 'ridden', ['a bike', 'a horse', 'a scooter']),
  v('learn', 'learns', 'learning', 'learnt', 'learnt', ['English', 'French', 'new words']),
  v('sing', 'sings', 'singing', 'sang', 'sung', ['a song', 'in the choir']),
  v('make', 'makes', 'making', 'made', 'made', ['a cake', 'breakfast', 'a video']),
  v('do', 'does', 'doing', 'did', 'done', ['homework', 'the dishes', 'yoga']),
  v('take', 'takes', 'taking', 'took', 'taken', ['photos', 'the bus', 'the train']),
  v('meet', 'meets', 'meeting', 'met', 'met', ['friends', 'the coach']),
  v('wash', 'washes', 'washing', 'washed', 'washed', ['the car', 'the dog']),
  v('listen', 'listens', 'listening', 'listened', 'listened', ['to music', 'to the radio', 'to a podcast']),
  v('help', 'helps', 'helping', 'helped', 'helped', ['the teacher', 'the neighbours']),
  v('swim', 'swims', 'swimming', 'swam', 'swum', ['in the lake', 'in the pool']),
  v('run', 'runs', 'running', 'ran', 'run', ['in the park', 'to the station']),
  v('study', 'studies', 'studying', 'studied', 'studied', ['for a test', 'maths']),
  v('carry', 'carries', 'carrying', 'carried', 'carried', ['the bags', 'a heavy box']),
  v('travel', 'travels', 'travelling', 'travelled', 'travelled', ['to London', 'by train']),
  v('tidy', 'tidies', 'tidying', 'tidied', 'tidied', ['the room', 'the desk']),
  v('dance', 'dances', 'dancing', 'danced', 'danced', ['at the party', 'with friends']),
  v('stop', 'stops', 'stopping', 'stopped', 'stopped', ['the car', 'the music']),
  v('go', 'goes', 'going', 'went', 'gone', ['to school', 'swimming', 'to the cinema']),
  v('send', 'sends', 'sending', 'sent', 'sent', ['a message', 'a postcard']),
];

export type Person = '1s' | '2' | '3s' | 'pl';
export interface Subject {
  text: string;
  person: Person;
}

export const SUBJECTS: Subject[] = [
  { text: 'I', person: '1s' },
  { text: 'You', person: '2' },
  { text: 'He', person: '3s' },
  { text: 'She', person: '3s' },
  { text: 'Mandy', person: '3s' },
  { text: 'My brother', person: '3s' },
  { text: 'We', person: 'pl' },
  { text: 'They', person: 'pl' },
  { text: 'Tom and Lisa', person: 'pl' },
];

/** Durative verbs for present perfect with since/for: [base, s-form, pp, complement]. */
export const DURATIVE: [string, string, string][] = [
  ['live', 'lived', 'in Zurich'],
  ['know', 'known', 'Lisa'],
  ['have', 'had', 'a dog'],
  ['learn', 'learnt', 'English'],
  ['play', 'played', 'the piano'],
  ['work', 'worked', 'at the hospital'],
];

export const SINCE = ['2020', 'last summer', 'Christmas', 'March', 'we were kids'];
export const FOR = ['two years', 'five months', 'a long time', 'three weeks', 'ten years'];

// ---------------------------------------------------------------------------
// Vocabulary by theme: [German, English, level, other accepted English answers]
// ---------------------------------------------------------------------------

export type Word = [string, string, 1 | 2 | 3, string[]?];

export interface VocabTheme {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  words: Word[];
}

export const THEMES: VocabTheme[] = [
  {
    id: 'school',
    title: 'School & Free Time',
    subtitle: 'Schule, Hobbys und Sport',
    icon: '🎒',
    words: [
      ['das Schulzimmer', 'classroom', 1],
      ['die Hausaufgaben', 'homework', 1],
      ['die Lehrerin', 'teacher', 1],
      ['das Fach (Schulfach)', 'subject', 2],
      ['der Stundenplan', 'timetable', 2, ['schedule']],
      ['die Pause', 'break', 1],
      ['die Prüfung', 'exam', 2, ['test']],
      ['das Wörterbuch', 'dictionary', 2],
      ['der Bleistift', 'pencil', 1],
      ['das Lineal', 'ruler', 2],
      ['der Rucksack', 'backpack', 1, ['rucksack', 'schoolbag']],
      ['die Note', 'mark', 3, ['grade']],
      ['die Mannschaft', 'team', 1],
      ['der Verein', 'club', 2],
      ['das Training', 'practice', 3, ['training']],
      ['gewinnen', 'win', 1, ['to win']],
      ['verlieren', 'lose', 1, ['to lose']],
      ['das Hobby', 'hobby', 1],
      ['zeichnen', 'draw', 2, ['to draw']],
      ['sich treffen mit', 'meet', 2, ['to meet']],
      ['das Lager', 'camp', 2],
      ['die Freizeit', 'free time', 2, ['spare time', 'leisure time']],
    ],
  },
  {
    id: 'food',
    title: 'Food & Shopping',
    subtitle: 'Essen, Trinken und Einkaufen',
    icon: '🛒',
    words: [
      ['das Frühstück', 'breakfast', 1],
      ['das Mittagessen', 'lunch', 1],
      ['das Abendessen', 'dinner', 1, ['supper']],
      ['das Gemüse', 'vegetables', 1, ['vegetable']],
      ['das Obst', 'fruit', 1],
      ['das Brot', 'bread', 1],
      ['die Kartoffel', 'potato', 1],
      ['das Rindfleisch', 'beef', 2],
      ['das Poulet / Huhn', 'chicken', 1],
      ['die Rechnung (Restaurant)', 'bill', 2, ['check']],
      ['das Trinkgeld', 'tip', 3],
      ['die Kasse', 'checkout', 3, ['till', 'cash desk']],
      ['das Wechselgeld', 'change', 3],
      ['teuer', 'expensive', 1],
      ['billig', 'cheap', 1],
      ['die Grösse (Kleider)', 'size', 2],
      ['anprobieren', 'try on', 2, ['to try on']],
      ['die Quittung', 'receipt', 3],
      ['der Einkaufswagen', 'trolley', 3, ['shopping trolley', 'shopping cart', 'cart']],
      ['das Sonderangebot', 'special offer', 3, ['offer', 'deal']],
      ['hungrig', 'hungry', 1],
      ['durstig', 'thirsty', 2],
    ],
  },
  {
    id: 'travel',
    title: 'Travel & Places',
    subtitle: 'Unterwegs in der Stadt und auf Reisen',
    icon: '🧳',
    words: [
      ['der Bahnhof', 'station', 1, ['train station', 'railway station']],
      ['der Flughafen', 'airport', 1],
      ['die Fahrkarte / das Billett', 'ticket', 1],
      ['das Gepäck', 'luggage', 2, ['baggage']],
      ['der Koffer', 'suitcase', 2],
      ['die Unterkunft', 'accommodation', 3],
      ['die Jugendherberge', 'youth hostel', 2, ['hostel']],
      ['die Strasse', 'street', 1, ['road']],
      ['die Kreuzung', 'crossroads', 3, ['junction', 'intersection']],
      ['die Ampel', 'traffic lights', 2, ['traffic light']],
      ['links abbiegen', 'turn left', 2],
      ['geradeaus', 'straight on', 2, ['straight ahead']],
      ['die Bibliothek', 'library', 1],
      ['die Kirche', 'church', 1],
      ['die Brücke', 'bridge', 1],
      ['der Ausflug', 'trip', 2, ['excursion']],
      ['die Sehenswürdigkeit', 'sight', 3, ['sights', 'tourist attraction', 'attraction']],
      ['der Reisepass', 'passport', 2],
      ['ankommen', 'arrive', 2, ['to arrive']],
      ['abfahren', 'leave', 2, ['depart', 'to leave', 'to depart']],
      ['die Verspätung', 'delay', 3],
      ['der Stadtplan', 'map', 1, ['city map']],
    ],
  },
  {
    id: 'people',
    title: 'People & Feelings',
    subtitle: 'Familie, Charakter und Gefühle',
    icon: '💬',
    words: [
      ['die Eltern', 'parents', 1],
      ['die Geschwister', 'siblings', 3, ['brothers and sisters']],
      ['der Cousin / die Cousine', 'cousin', 1],
      ['die Nachbarin', 'neighbour', 2, ['neighbor']],
      ['glücklich', 'happy', 1],
      ['traurig', 'sad', 1],
      ['wütend', 'angry', 1],
      ['müde', 'tired', 1],
      ['nervös', 'nervous', 1],
      ['gelangweilt', 'bored', 2],
      ['überrascht', 'surprised', 2],
      ['enttäuscht', 'disappointed', 3],
      ['stolz', 'proud', 2],
      ['ängstlich', 'scared', 2, ['afraid', 'frightened']],
      ['freundlich', 'friendly', 1, ['kind']],
      ['schüchtern', 'shy', 2],
      ['faul', 'lazy', 2],
      ['ehrlich', 'honest', 3],
      ['zuverlässig', 'reliable', 3],
      ['lustig', 'funny', 1],
      ['eifersüchtig', 'jealous', 3],
      ['selbstbewusst', 'confident', 3, ['self-confident']],
    ],
  },
  {
    id: 'nature',
    title: 'Nature & Environment',
    subtitle: 'Wetter, Natur und Umweltschutz',
    icon: '🌍',
    words: [
      ['das Wetter', 'weather', 1],
      ['sonnig', 'sunny', 1],
      ['bewölkt', 'cloudy', 1],
      ['der Regen', 'rain', 1],
      ['das Gewitter', 'thunderstorm', 2, ['storm']],
      ['der Wald', 'forest', 1, ['wood', 'woods']],
      ['der Berg', 'mountain', 1],
      ['der See', 'lake', 1],
      ['der Fluss', 'river', 1],
      ['das Tal', 'valley', 2],
      ['die Umwelt', 'environment', 2],
      ['die Verschmutzung', 'pollution', 3],
      ['der Abfall', 'rubbish', 2, ['waste', 'litter', 'trash', 'garbage']],
      ['wiederverwerten', 'recycle', 2, ['to recycle']],
      ['Energie sparen', 'save energy', 2],
      ['der Klimawandel', 'climate change', 3],
      ['die Überschwemmung', 'flood', 3],
      ['der Gletscher', 'glacier', 3],
      ['die Pflanze', 'plant', 1],
      ['wild lebende Tiere', 'wildlife', 3],
      ['schützen', 'protect', 2, ['to protect']],
      ['erneuerbar', 'renewable', 3],
    ],
  },
  {
    id: 'media',
    title: 'Media & Technology',
    subtitle: 'Handy, Internet und Medien',
    icon: '📱',
    words: [
      ['das Handy', 'mobile phone', 1, ['mobile', 'phone', 'smartphone', 'cell phone']],
      ['der Bildschirm', 'screen', 1],
      ['die Tastatur', 'keyboard', 2],
      ['herunterladen', 'download', 1, ['to download']],
      ['hochladen', 'upload', 2, ['to upload']],
      ['das Passwort', 'password', 1],
      ['die Nachricht (SMS/Chat)', 'message', 1, ['text', 'text message']],
      ['die Nachrichten (TV)', 'news', 2],
      ['die Werbung', 'advertisement', 3, ['advert', 'ad', 'advertising', 'commercial']],
      ['die Sendung', 'programme', 2, ['program', 'show']],
      ['das Gerät', 'device', 3],
      ['aufladen (Akku)', 'charge', 3, ['to charge']],
      ['löschen', 'delete', 2, ['to delete']],
      ['speichern', 'save', 2, ['to save']],
      ['teilen', 'share', 1, ['to share']],
      ['suchen (online)', 'search', 2, ['to search', 'look up', 'google']],
      ['der Benutzername', 'username', 2, ['user name']],
      ['die Einstellungen', 'settings', 2],
      ['abhängig (süchtig)', 'addicted', 3],
      ['die Privatsphäre', 'privacy', 3],
      ['das Ladegerät', 'charger', 2],
      ['die Bewertung (online)', 'review', 3, ['rating']],
    ],
  },
];
