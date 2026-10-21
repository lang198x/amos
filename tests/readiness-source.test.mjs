import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const read = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));

test('readiness lexical claims retain original source excerpts and explicit qualification limits', async () => {
  const source = await read('specifications/readiness/lexical-source.json');
  assert.deepEqual(source.qualified_releases, []);
  assert.equal(source.manual.sha256, (await read('specifications/manual-core/source.json')).extract_sha256);
  assert.equal(source.files.length, 2);
  const excerpts = source.files.flatMap((file) => file.excerpts);
  assert.deepEqual(excerpts.map((item) => item.id), ['line-start-numbers', 'quoted-strings', 'named-labels', 'numeric-reader']);
  for (const file of source.files) {
    assert.match(file.sha256, /^[a-f0-9]{64}$/);
    for (const excerpt of file.excerpts) {
      assert.equal(excerpt.text.split('\n').length, excerpt.last_line - excerpt.first_line + 1);
      assert.ok(excerpt.first_line > 0);
    }
  }
  assert.ok(excerpts.find((item) => item.id === 'quoted-strings').text.includes('TkChCar'));
  assert.ok(excerpts.find((item) => item.id === 'named-labels').text.includes('"' + ':' + '"'));
  assert.ok(excerpts.find((item) => item.id === 'numeric-reader').text.includes('val3b'));
  assert.ok((await readFile(new URL(`../specifications/readiness/${source.licence}`, import.meta.url), 'utf8')).includes('MIT License'));
  assert.ok(source.limits.length >= 4);
});


test('independent fixtures retain immutable bytes, licences and nonempty reviewed source ranges', async () => {
  const manifest = await read('corpus/independent/sources.json');
  assert.equal(manifest.sources.length, 3);
  let reviewed = 0;
  for (const item of manifest.sources) {
    const base = new URL('../corpus/independent/', import.meta.url);
    const raw = await readFile(new URL(item.file, base));
    assert.equal(createHash('sha256').update(raw).digest('hex'), item.sha256);
    const lines = raw.toString('utf8').split('\n');
    assert.equal(lines.length - 1, item.lines);
    assert.match(item.commit, /^[a-f0-9]{40}$/);
    assert.ok((await readFile(new URL(item.licence, base), 'utf8')).includes('MIT License'));
    for (const [line, start, end, text, scope] of item.ranges) {
      assert.ok(line >= 1 && line <= item.lines && start >= 0 && end > start);
      assert.equal(lines[line - 1].slice(start, end), text);
      assert.ok(scope.endsWith('.amos') || scope.endsWith('.amos-interface'));
      reviewed += 1;
    }
  }
  assert.equal(reviewed, 116);
});
