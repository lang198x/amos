import test from 'node:test';
import assert from 'node:assert/strict';
import { highlighter } from './helpers/highlighter.mjs';
import { chapters, entries, checkEntry } from './helpers/manual-core.mjs';

test('manual checklist retains the core sweep and adds cited AREXX chapter', () => {
  assert.equal(chapters.length, 33);
  assert.equal(entries.length, 629);
  assert.equal(chapters.slice(0, 5).flatMap((chapter) => chapter.entries).length, 109);
  assert.equal(chapters.slice(0, 7).flatMap((chapter) => chapter.entries).length, 171);
  assert.equal(chapters.slice(0, 12).flatMap((chapter) => chapter.entries).length, 262);
  assert.equal(chapters.slice(0, 15).flatMap((chapter) => chapter.entries).length, 349);
  assert.equal(chapters.slice(0, 18).flatMap((chapter) => chapter.entries).length, 402);
  assert.equal(chapters.slice(0, 20).flatMap((chapter) => chapter.entries).length, 428);
  assert.equal(chapters.slice(0, 21).flatMap((chapter) => chapter.entries).length, 452);
  assert.equal(chapters.slice(0, 22).flatMap((chapter) => chapter.entries).length, 490);
  assert.equal(chapters.slice(0, 23).flatMap((chapter) => chapter.entries).length, 511);
  assert.equal(chapters.slice(0, 24).flatMap((chapter) => chapter.entries).length, 521);
  assert.equal(chapters.slice(0, 25).flatMap((chapter) => chapter.entries).length, 536);
  assert.equal(chapters.slice(0, 26).flatMap((chapter) => chapter.entries).length, 543);
  assert.equal(chapters.slice(0, 27).flatMap((chapter) => chapter.entries).length, 558);
  assert.equal(chapters.slice(0, 28).flatMap((chapter) => chapter.entries).length, 571);
  assert.equal(chapters.slice(0, 29).flatMap((chapter) => chapter.entries).length, 582);
  assert.equal(chapters.slice(0, 30).flatMap((chapter) => chapter.entries).length, 594);
  assert.equal(chapters.slice(0, 31).flatMap((chapter) => chapter.entries).length, 612);
  assert.equal(chapters.slice(0, 32).flatMap((chapter) => chapter.entries).length, 622);
  assert.equal(chapters.at(-1).entries.length, 7);
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
