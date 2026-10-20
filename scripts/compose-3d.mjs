import { readFile, writeFile } from 'node:fs/promises';

// One explicit profile composition; the two inputs remain canonical.
const base = JSON.parse(await readFile(new URL('../syntaxes/amos.tmLanguage.json', import.meta.url), 'utf8'));
const extra = JSON.parse(await readFile(new URL('../syntaxes/extensions/amos-3d.json', import.meta.url), 'utf8'));
for (const key of Object.keys(extra)) {
  if (Object.hasOwn(base.repository, key)) throw new Error(`3D rule collides with BASIC: ${key}`);
}
const index = base.patterns.findIndex((pattern) => pattern.include === '#reserved');
if (index < 0) throw new Error('missing BASIC insertion point');
const patterns = [...base.patterns];
patterns.splice(index, 0, { include: '#td-functions' }, { include: '#td-commands' });
const combined = {
  ...base,
  name: 'AMOS + AMOS 3D',
  scopeName: 'source.basic.amos.3d',
  fileTypes: [],
  patterns,
  repository: { ...base.repository, ...extra },
};
const content = `${JSON.stringify(combined, null, 2)}\n`;
const output = new URL('../syntaxes/amos-3d.tmLanguage.json', import.meta.url);
if (process.argv.includes('--check')) {
  if (await readFile(output, 'utf8') !== content) {
    throw new Error('stale AMOS 3D profile; run node scripts/sync-editor.mjs');
  }
} else {
  await writeFile(output, content);
}
