import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import amal from '../amal.mjs';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';

const json = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));

test('standalone AMAL is additive, self-contained and exactly synchronised with the editor', async () => {
  assert.equal(amal.name, 'amal');
  assert.equal(amal.scopeName, 'source.amal');
  assert.deepEqual(amal.fileTypes, []);
  assert.ok(!amal.repository.comments && !amal.repository.strings);
  for (const base of [amos, amos3d]) {
    assert.ok(!JSON.stringify(base).includes('source.amal'));
  }
  const pkg = await json('package.json');
  assert.equal(pkg.exports['./amal'].import, './amal.mjs');
  assert.equal(pkg.exports['./amal'].types, './amal.d.ts');
  assert.equal(pkg.exports['./amal.tmLanguage.json'], './syntaxes/amal.tmLanguage.json');
  for (const file of [...Object.values(pkg.exports['./amal']), pkg.exports['./amal.tmLanguage.json']]) {
    assert.ok((await readFile(new URL(`../${file}`, import.meta.url))).length > 0);
    assert.ok(pkg.files.includes(file.replace('./', '')));
  }
  const canonical = await readFile(new URL('../syntaxes/amal.tmLanguage.json', import.meta.url));
  assert.deepEqual(canonical, await readFile(new URL('../editors/vscode/syntaxes/amal.tmLanguage.json', import.meta.url)));
  const editor = await json('editors/vscode/package.json');
  assert.equal(editor.main, undefined);
  const language = editor.contributes.languages.find((entry) => entry.id === 'amal');
  assert.equal(language.extensions, undefined);
  assert.equal(editor.contributes.grammars.find((entry) => entry.language === 'amal').scopeName, amal.scopeName);
  const configuration = await json(`editors/vscode/${language.configuration}`);
  assert.equal(configuration.comments, undefined);
  assert.deepEqual(configuration.brackets, [['(', ')']]);
});

test('AMAL lexical decisions retain separate primary citations and no release qualification', async () => {
  const source = await json('specifications/amal/source.json');
  const lexical = await json(`specifications/amal/${source.lexical}`);
  assert.deepEqual(source.qualified_releases, []);
  assert.deepEqual(lexical.qualified_releases, []);
  assert.equal(lexical.citations.length, 8);
  for (const cite of lexical.citations) {
    assert.match(cite.page, /^07\.06\.\d{2}$/);
    assert.ok(cite.extract_line > 0 && cite.end_line >= cite.extract_line);
    assert.equal(cite.text.split('\n').length, cite.end_line - cite.extract_line + 1);
  }
  assert.match(lexical.citations.find((entry) => entry.id === 'significant-capitals').text, /Everything in lower case is ignored/);
  assert.match(lexical.citations.find((entry) => entry.id === 'autotest-if-actions').text, /If expression eXit/);
  assert.ok(lexical.limits.length >= 3);
});
