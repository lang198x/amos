import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';

const json = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));

test('the opt-in profile shares every BASIC rule and adds only the canonical 3D rules', async () => {
  assert.equal(amos.name, 'amos');
  assert.equal(amos3d.name, 'amos-3d');
  assert.notEqual(amos.scopeName, amos3d.scopeName);
  const extra = await json('syntaxes/extensions/amos-3d.json');
  assert.deepEqual(amos3d.repository, { ...amos.repository, ...extra });
  assert.deepEqual(amos3d.patterns.filter((rule) => !rule.include.startsWith('#td-')), amos.patterns);
  assert.ok(!amos.patterns.some((rule) => rule.include.startsWith('#td-')));
  assert.deepEqual(amos3d.fileTypes, []);
});

test('both declarative editor modes use exact packaged grammars without stealing file associations', async () => {
  const editor = await json('editors/vscode/package.json');
  assert.equal(editor.main, undefined);
  assert.deepEqual(editor.contributes.languages.map((item) => item.id), ['amos', 'amos-3d']);
  assert.deepEqual(editor.contributes.languages[0].extensions, ['.amos.txt']);
  assert.equal(editor.contributes.languages[1].extensions, undefined);
  for (const registration of [amos, amos3d]) {
    const contribution = editor.contributes.grammars.find((item) => item.language === registration.name);
    assert.equal(contribution.scopeName, registration.scopeName);
    const relative = contribution.path.replace('./', '');
    const canonical = await readFile(new URL(`../${relative}`, import.meta.url));
    assert.deepEqual(await readFile(new URL(`../editors/vscode/${relative}`, import.meta.url)), canonical);
  }
  const pkg = await json('package.json');
  assert.equal(pkg.exports['./amos-3d'].import, './amos-3d.mjs');
  assert.equal(pkg.exports['./amos-3d'].types, './amos-3d.d.ts');
  assert.equal(pkg.exports['./amos-3d.tmLanguage.json'], './syntaxes/amos-3d.tmLanguage.json');
  for (const file of Object.values(pkg.exports['./amos-3d'])) {
    assert.ok((await readFile(new URL(`../${file}`, import.meta.url))).length > 0);
    assert.ok(pkg.files.includes(file.replace('./', '')));
  }
  assert.ok(pkg.files.includes(pkg.exports['./amos-3d.tmLanguage.json'].replace('./', '')));
});
