import { isBlockUnlocked, isChapterUnlocked, type ProgressState } from '../core/progress';
import type { BlockDef, Chapter, Subject, Topic } from '../core/types';
import { SUBJECTS } from '../content/subjects';

export interface NextStep {
  subject: Subject;
  topic: Topic;
  chapter: Chapter;
  block: BlockDef;
  chapterIndex: number;
}

/** First unlocked block that is not completed yet – the "Weiterlernen" target. */
export function nextStep(s: ProgressState, topic?: Topic): NextStep | null {
  for (const subject of SUBJECTS)
    for (const t of subject.topics) {
      if (topic && t.id !== topic.id) continue;
      for (let ci = 0; ci < t.chapters.length; ci++) {
        const chapter = t.chapters[ci];
        if (!isChapterUnlocked(s, t.chapters, ci)) break;
        for (let bi = 0; bi < chapter.blocks.length; bi++) {
          const block = chapter.blocks[bi];
          if (!s.blocks[block.id]?.completed && isBlockUnlocked(s, chapter, bi)) return { subject, topic: t, chapter, block, chapterIndex: ci };
        }
      }
    }
  return null;
}
