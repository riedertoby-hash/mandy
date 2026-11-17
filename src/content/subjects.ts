import type { Subject } from '../core/types';
import { biologieSubject } from './biologie';
import { deutschSubject } from './deutsch';
import { englishSubject } from './english';
import { geografieSubject } from './geografie';
import { geschichteSubject } from './geschichte';
import { mathSubject } from './math';

// To add a subject: create src/content/<fach>/index.ts with topics → chapters → blocks
// and register its task generators in src/content/registry.ts.
const comingSoon = (id: string, name: string, icon: string, color: string): Subject => ({ id, name, icon, color, topics: [] });

export const SUBJECTS: Subject[] = [
  mathSubject,
  deutschSubject,
  englishSubject,
  comingSoon('franzoesisch', 'Französisch', '🥐', '#ae3ec9'),
  geografieSubject,
  geschichteSubject,
  biologieSubject,
  comingSoon('chemie', 'Chemie', '⚗️', '#0ca678'),
  comingSoon('physik', 'Physik', '⚡', '#f59f00'),
];

export const subjectById = (id: string) => SUBJECTS.find((s) => s.id === id);

export function findChapter(chapterId: string) {
  for (const subject of SUBJECTS)
    for (const topic of subject.topics)
      for (const chapter of topic.chapters) if (chapter.id === chapterId) return { subject, topic, chapter };
  return undefined;
}

export function findBlock(blockId: string) {
  for (const subject of SUBJECTS)
    for (const topic of subject.topics)
      for (const chapter of topic.chapters)
        for (const block of chapter.blocks) if (block.id === blockId) return { subject, topic, chapter, block };
  return undefined;
}

export const isTopicAvailable = (t: { chapters: unknown[] }) => t.chapters.length > 0;

export function findTopic(topicId: string) {
  for (const subject of SUBJECTS) for (const topic of subject.topics) if (topic.id === topicId) return { subject, topic };
  return undefined;
}
