import test from 'node:test';
import assert from 'node:assert/strict';
import { highlighter } from './helpers/highlighter.mjs';
import { chapters, entries, checkEntry } from './helpers/manual-core.mjs';

test('manual checklist retains the core sweep and adds cited windows/input/screen chapters', () => {
  assert.equal(chapters.length, 12);
  assert.equal(entries.length, 262);
  assert.equal(chapters.slice(0, 5).flatMap((chapter) => chapter.entries).length, 109);
  assert.equal(chapters.slice(0, 7).flatMap((chapter) => chapter.entries).length, 171);
  for (const chapter of chapters) assert.ok(chapter.entries.length > 0);
  for (const spelling of ['Param', 'Param#', 'Param$', 'Pi#', 'Break Off', 'Break On']) {
    assert.ok(entries.some((entry) => entry.spelling === spelling));
  }
});

for (const chapter of chapters) {
  test(`manual chapter ${chapter.chapter} named forms and boundaries`, () => {
    for (const entry of chapter.entries) checkEntry(entry);
  });
}

test.after(() => highlighter.dispose());
