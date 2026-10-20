import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import amos from '../index.mjs';

const json = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));

test('published registration and editor grammar share exact bytes', async () => {
  const canonical = await readFile(new URL('../syntaxes/amos.tmLanguage.json', import.meta.url));
  const editor = await readFile(new URL('../editors/vscode/syntaxes/amos.tmLanguage.json', import.meta.url));
  assert.deepEqual(canonical, editor);
  assert.equal(amos.scopeName, 'source.basic.amos');
  assert.equal(amos.name, 'amos');
  const manifest = await json('../editors/vscode/package.json');
  assert.equal(manifest.contributes.grammars[0].scopeName, amos.scopeName);
  assert.deepEqual(manifest.contributes.languages[0].extensions, ['.amos.txt']);
  assert.equal(manifest.main, undefined);
});

test('every declared corpus case is bound to nonempty source bytes', async () => {
  for (const directory of ['opening', 'probes']) {
    const manifest = await json(`../corpus/${directory}/cases.json`);
    assert.ok(manifest.cases.length > 0);
    const ids = new Set();
    for (const item of manifest.cases) {
      assert.ok(!ids.has(item.id));
      ids.add(item.id);
      const source = await readFile(new URL(`../corpus/${directory}/${item.source}`, import.meta.url));
      assert.ok(source.length > 0);
      assert.equal(createHash('sha256').update(source).digest('hex'), item.sha256);
      if (item.capture) {
        const capture = await readFile(new URL(`../corpus/${directory}/${item.capture}`, import.meta.url));
        assert.equal(createHash('sha256').update(capture).digest('hex'), item.capture_sha256);
      }
    }
  }
});

test('package exports declare only existing dependency-free artefacts', async () => {
  const pkg = await json('../package.json');
  assert.equal(pkg.dependencies, undefined);
  assert.equal(pkg.peerDependencies, undefined);
  for (const file of [pkg.exports['.'].import, pkg.exports['.'].types, pkg.exports['./amos.tmLanguage.json']]) {
    assert.ok((await readFile(new URL(`../${file}`, import.meta.url))).length > 0);
  }
});

test('full-game scope expectations bind nonempty, unique ranges to pinned source', async () => {
  const inventory = await json('../corpus/highlighting/bank-or-risk.inventory.json');
  const source = await readFile(new URL('../corpus/highlighting/bank-or-risk.amos.txt', import.meta.url), 'utf8');
  assert.equal(createHash('sha256').update(source).digest('hex'), inventory.source_sha256);
  assert.ok(inventory.entries.length > 0);
  const lines = source.split('\n');
  const seen = new Set();
  for (const [line, start, end, text, scope] of inventory.entries) {
    assert.ok(line >= 1 && line <= lines.length && start >= 0 && end > start && scope.endsWith('.amos'));
    assert.equal(lines[line - 1].slice(start, end), text);
    const key = `${line}:${start}:${end}`;
    assert.ok(!seen.has(key));
    seen.add(key);
  }
});
