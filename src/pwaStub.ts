// Used instead of 'virtual:pwa-register' in the single-file build (no service worker there).
export function registerSW(_opts?: unknown) {
  return () => Promise.resolve();
}
