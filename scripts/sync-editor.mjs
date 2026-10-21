import { readFile, writeFile, mkdir } from 'node:fs/promises';
import './compose-3d.mjs';

const files = [
  ['syntaxes/amos.tmLanguage.json', 'editors/vscode/syntaxes/amos.tmLanguage.json'],
  ['syntaxes/amos-3d.tmLanguage.json', 'editors/vscode/syntaxes/amos-3d.tmLanguage.json'],
  ['syntaxes/amal.tmLanguage.json', 'editors/vscode/syntaxes/amal.tmLanguage.json'],
  ['syntaxes/interface.tmLanguage.json', 'editors/vscode/syntaxes/interface.tmLanguage.json'],
  ['LICENSE', 'editors/vscode/LICENSE'],
];
for (const [source, target] of files) {
  const content = await readFile(new URL(`../${source}`, import.meta.url));
  if (process.argv.includes('--check')) {
    const packaged = await readFile(new URL(`../${target}`, import.meta.url));
    if (!content.equals(packaged)) {
      throw new Error(`${target} differs from canonical ${source}; run node scripts/sync-editor.mjs`);
    }
  } else {
    await mkdir(new URL(`../${target.substring(0, target.lastIndexOf('/'))}/`, import.meta.url), { recursive: true });
    await writeFile(new URL(`../${target}`, import.meta.url), content);
  }
}
