// Inlines the built JS and CSS into dist-single/index.html → one self-contained file.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'dist-single';
let html = readFileSync(join(dir, 'index.html'), 'utf8');

html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/([^"]+)"[^>]*>/g, (_, f) => `<style>${readFileSync(join(dir, f), 'utf8')}</style>`);
html = html.replace(/<script type="module" crossorigin src="\.\/([^"]+)"><\/script>/g, (_, f) => {
  const js = readFileSync(join(dir, f), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script type="module">${js}</script>`;
});
// Local icon files are not part of the single file.
html = html.replace(/\s*<link rel="(icon|apple-touch-icon)"[^>]*>/g, '');

// Keep only the page content: hosts like claude.ai Artifacts add their own document skeleton.
// Browsers still open the file directly without these wrapper tags.
html = html
  .replace(/<!doctype html>\s*/i, '')
  .replace(/<\/?(html|head|body)[^>]*>\s*/gi, '')
  .replace(/\s*<meta (charset|name="viewport")[^>]*>/gi, '');
const title = html.match(/<title>.*?<\/title>/)[0];
html = `${title}\n<meta name="claude:viewport-fit-sides" content="cover" />\n<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />\n${html.replace(title, '')}`;

if (/src="\.\/|href="\.\/assets/.test(html)) throw new Error('Unresolved local asset left in single file');
writeFileSync(join(dir, 'lernwelt.html'), html);
console.log(`dist-single/lernwelt.html: ${(html.length / 1024).toFixed(0)} KB`);
