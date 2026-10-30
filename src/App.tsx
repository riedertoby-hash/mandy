import { useRoute } from './ui/router';
import { ChapterScreen } from './ui/screens/ChapterScreen';
import { Home } from './ui/screens/Home';
import { LessonScreen } from './ui/screens/LessonScreen';
import { ProfileScreen } from './ui/screens/ProfileScreen';
import { ReviewScreen } from './ui/screens/ReviewScreen';
import { SubjectScreen } from './ui/screens/SubjectScreen';
import { TopicScreen } from './ui/screens/TopicScreen';

export default function App() {
  const route = useRoute();
  switch (route.name) {
    case 'subject':
      return <SubjectScreen id={route.id} />;
    case 'topic':
      return <TopicScreen id={route.id} />;
    case 'chapter':
      return <ChapterScreen key={route.id} id={route.id} />;
    case 'lesson':
      return <LessonScreen key={route.blockId} blockId={route.blockId} />;
    case 'review':
      return <ReviewScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return <Home />;
  }
}
