import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import amosInterface from '../interface.mjs';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import amal from '../amal.mjs';

const json = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));

test('standalone Interface exports existing assets and exactly matches its explicit editor mode', async () => {
  assert.equal(amosInterface.name, 'amos-interface');
  assert.equal(amosInterface.scopeName, 'source.amos-interface');
  assert.deepEqual(amosInterface.fileTypes, []);
  const pkg = await json('package.json');
  assert.deepEqual(pkg.exports['./interface'], { types: './interface.d.ts', import: './interface.mjs' });
  assert.equal(pkg.exports['./interface.tmLanguage.json'], './syntaxes/interface.tmLanguage.json');
  for (const file of [...Object.values(pkg.exports['./interface']), pkg.exports['./interface.tmLanguage.json']]) {
    assert.ok((await readFile(new URL(`../${file}`, import.meta.url))).length > 0);
    assert.ok(pkg.files.includes(file.replace('./', '')));
  }
  const canonical = await readFile(new URL('../syntaxes/interface.tmLanguage.json', import.meta.url));
  assert.deepEqual(canonical, await readFile(new URL('../editors/vscode/syntaxes/interface.tmLanguage.json', import.meta.url)));
  const editor = await json('editors/vscode/package.json');
  assert.equal(editor.main, undefined);
  assert.equal(editor.browser, undefined);
  const language = editor.contributes.languages.find((entry) => entry.id === 'amos-interface');
  assert.equal(language.extensions, undefined);
  assert.equal(editor.contributes.grammars.find((entry) => entry.language === language.id).scopeName, amosInterface.scopeName);
  const config = await json(`editors/vscode/${language.configuration}`);
  assert.deepEqual(config.brackets, [['[', ']']]);
  assert.equal(config.comments, undefined);
  for (const base of [amos, amos3d, amal]) assert.ok(!JSON.stringify(base).includes(amosInterface.scopeName));
});
