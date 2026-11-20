import { mkdirSync, copyFileSync, cpSync } from 'node:fs';
// Static export; only application assets are copied, never reports or repository metadata.
mkdirSync('dist', { recursive: true });
for (const file of ['index.html', 'styles.css']) copyFileSync(file, `dist/${file}`);
cpSync('src', 'dist/src', { recursive: true });
console.log('Static build ready in dist/: index.html, styles.css and src/.');
