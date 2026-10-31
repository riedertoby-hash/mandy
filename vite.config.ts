import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// `npm run build`          → installable PWA in dist/ (GitHub Pages etc.)
// `npm run build:single`   → one self-contained HTML file in dist-single/ (for hosts without a service worker)
const single = process.env.BUILD_SINGLE === '1';

// Relative base + hash routing: the app works on any static host.
export default defineConfig({
  base: './',
  resolve: single ? { alias: { 'virtual:pwa-register': fileURLToPath(new URL('./src/pwaStub.ts', import.meta.url)) } } : undefined,
  build: single
    ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000, cssCodeSplit: false, rollupOptions: { output: { inlineDynamicImports: true } } }
    : undefined,
  plugins: [
    react(),
    ...(single
      ? []
      : [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon.svg', 'apple-touch-icon.png'],
            manifest: {
              name: 'Mandys Lernwelt',
              short_name: 'Lernwelt',
              description: 'Spielerisch lernen – Mathematik und mehr.',
              lang: 'de-CH',
              start_url: '.',
              scope: '.',
              display: 'standalone',
              orientation: 'portrait',
              background_color: '#f6f4ff',
              theme_color: '#6c4cf1',
              icons: [
                { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
                { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
              ],
            },
            workbox: {
              globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
            },
          }),
        ]),
  ],
});
