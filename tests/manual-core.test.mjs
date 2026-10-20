import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = new URL('../specifications/manual-core/', import.meta.url);
const json = async (file) => JSON.parse(await readFile(new URL(file, base), 'utf8'));

test('manual inventory has cited, nonempty examples for every declared chapter', async () => {
  const source = await json('source.json');
  assert.equal(source.product, 'AMOS Professional');
  assert.match(source.extract_sha256, /^[0-9a-f]{64}$/);
  assert.deepEqual(source.chapters, ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06', '10-01', '05-07', '05-08', '06-01', '06-02', '06-03', '05-09', '06-04', '06-05', '07-01', '07-02', '07-03', '07-04', '07-05', '07-06', '10-02', '08-01']);
  const seen = new Set();
  let checked = 0;
  for (const id of source.chapters) {
    const chapter = await json(`${id}.json`);
    assert.equal(chapter.chapter, id.replace('-', '.'));
    assert.ok(chapter.entries.length > 0);
    for (const entry of chapter.entries) {
      const key = `${id}:${entry.spelling.toLowerCase()}:${entry.kind}`;
      assert.ok(entry.spelling.length > 0 && !seen.has(key));
      assert.ok(entry.example.includes(entry.spelling));
      assert.ok(entry.page.startsWith(`${chapter.chapter}.`));
      assert.ok(Number.isInteger(entry.extract_line) && entry.extract_line > 0);
      assert.ok(['command', 'comment', 'function', 'operator', 'reserved', 'shortcut'].includes(entry.kind));
      if (entry.kind === 'shortcut') assert.ok(entry.spelling === '?' || (id === '10-02' && entry.spelling === '? #'));
      if (entry.lexical_scope !== undefined) {
        const allowed = {
          Screen: ['06-01', 'keyword.other.amos'],
          Colour: ['06-04', 'keyword.other.amos'],
          'Menu$': ['06-05', 'variable.language.amos'],
          'Dir$': ['10-02', 'variable.language.amos'],
        };
        assert.deepEqual([id, entry.lexical_scope], allowed[entry.spelling]);
        if (entry.spelling === 'Menu$') assert.equal(entry.kind, 'command');
      }
      if (entry.component !== undefined) {
        assert.equal(id, '06-02');
        assert.ok(['Spack', 'Pack', 'Unpack'].includes(entry.spelling));
        assert.equal(entry.component, 'picture-compactor extension (as labelled by the manual)');
      }
      seen.add(key);
      checked++;
    }
  }
  assert.equal(checked, 511);
  const music = await json('08-01.json');
  const playback = music.entries.filter((entry) => entry.definition);
  assert.deepEqual(playback.map((entry) => entry.spelling), ['Music', 'Music Stop', 'Music Off', 'Mvolume', 'Tempo']);
  for (const entry of playback) {
    assert.ok(Number.isInteger(entry.definition.extract_line) && entry.definition.extract_line > entry.extract_line);
    assert.match(entry.definition.page, /^08\.03\.0[12]$/);
  }
  const maths = await json('05-03.json');
  const crosschecked = maths.entries.filter((entry) => entry.held_retypeset_page);
  assert.deepEqual(crosschecked.map((entry) => entry.spelling), ['Degree', 'Radian', 'Sin', 'Cos']);
  for (const entry of crosschecked) {
    assert.equal(entry.page, '05.03.08');
    assert.equal(entry.held_retypeset_page, '05.02.08');
  }
  assert.match(source.pagination_crosscheck.extract_sha256, /^[0-9a-f]{64}$/);
});

test('embedded menu commands have a separate cited inventory inside string examples', async () => {
  const menu = await json('06-05.json');
  assert.equal(menu.embedded_entries.length, 14);
  const seen = new Set();
  for (const entry of menu.embedded_entries) {
    assert.equal(entry.kind, 'embedded');
    assert.equal(entry.prefix, entry.spelling.slice(0, 2).toUpperCase());
    assert.ok(!seen.has(entry.prefix));
    assert.ok(entry.page.startsWith('06.05.'));
    assert.ok(Number.isInteger(entry.extract_line) && entry.extract_line > 0);
    assert.ok(entry.example.startsWith('Menu$(1,1)="('));
    assert.ok(entry.example.includes(entry.prefix));
    assert.ok(entry.example.endsWith(')"'));
    seen.add(entry.prefix);
  }
});
