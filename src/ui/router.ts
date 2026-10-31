import { useEffect, useState } from 'react';

// Minimal hash router: #/fach/mathe, #/thema/prozent, #/kapitel/p3, #/lernen/p3.b1, #/wiederholen, #/profil
export type Route =
  | { name: 'home' }
  | { name: 'subject'; id: string }
  | { name: 'topic'; id: string }
  | { name: 'chapter'; id: string }
  | { name: 'lesson'; blockId: string }
  | { name: 'review' }
  | { name: 'profile' };

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  switch (parts[0]) {
    case 'fach':
      return parts[1] ? { name: 'subject', id: parts[1] } : { name: 'home' };
    case 'thema':
      return parts[1] ? { name: 'topic', id: parts[1] } : { name: 'home' };
    case 'kapitel':
      return parts[1] ? { name: 'chapter', id: parts[1] } : { name: 'home' };
    case 'lernen':
      return parts[1] ? { name: 'lesson', blockId: parts[1] } : { name: 'home' };
    case 'wiederholen':
      return { name: 'review' };
    case 'profil':
      return { name: 'profile' };
    default:
      return { name: 'home' };
  }
}

export const href = {
  home: () => '#/',
  subject: (id: string) => `#/fach/${id}`,
  topic: (id: string) => `#/thema/${id}`,
  chapter: (id: string) => `#/kapitel/${id}`,
  lesson: (blockId: string) => `#/lernen/${blockId}`,
  review: () => '#/wiederholen',
  profile: () => '#/profil',
};

export const go = (h: string) => {
  window.location.hash = h;
};

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  useEffect(() => {
    const on = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
