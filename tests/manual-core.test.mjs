import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = new URL('../specifications/manual-core/', import.meta.url);
const json = async (file) => JSON.parse(await readFile(new URL(file, base), 'utf8'));

test('manual inventory has cited, nonempty examples for every declared chapter', async () => {
  const source = await json('source.json');
  assert.equal(source.product, 'AMOS Professional');
  assert.match(source.extract_sha256, /^[0-9a-f]{64}$/);
  assert.equal(source.chapters.length, 5);
  const seen = new Set();
  let checked = 0;
  for (const id of source.chapters) {
    const chapter = await json(`${id}.json`);
    assert.equal(chapter.chapter, id.replace('-', '.'));
    assert.ok(chapter.entries.length > 0);
    for (const entry of chapter.entries) {
      const key = `${id}:${entry.spelling.toLowerCase()}`;
      assert.ok(entry.spelling.length > 0 && !seen.has(key));
      assert.ok(entry.example.includes(entry.spelling));
      assert.ok(entry.page.startsWith(`${chapter.chapter}.`));
      assert.ok(Number.isInteger(entry.extract_line) && entry.extract_line > 0);
      assert.ok(['command', 'comment', 'function', 'operator', 'reserved'].includes(entry.kind));
      seen.add(key);
      checked++;
    }
  }
  assert.equal(checked, 109);
});
