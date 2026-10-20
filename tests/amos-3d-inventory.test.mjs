import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const json = async (file) => JSON.parse(await readFile(new URL(`../specifications/extensions/amos-3d/${file}`, import.meta.url), 'utf8'));
const source = await json('source.json');
const families = await Promise.all(source.inventory_files.map(json));
const entries = families.flatMap((family) => family.entries);
const { cells } = await json(source.card_cells);
const { questions } = await json(source.questions);
const citationKey = (cite) => `${cite.source}:${cite.extract_line}:${cite.text}`;

const checkCitation = (cite) => {
  assert.ok(source.sources[cite.source]);
  assert.ok(Number.isInteger(cite.extract_line) && cite.extract_line > 0);
  assert.match(cite.page, /^\d+$/);
  assert.ok(cite.text.trim().length > 0);
};

test('3D inventory retains all six families, fresh examples and optional-extension boundaries', () => {
  assert.deepEqual(families.map((family) => family.entries.length), [10, 18, 12, 8, 8, 3]);
  assert.equal(entries.length, 59);
  assert.equal(new Set(entries.map((entry) => entry.id)).size, 59);
  assert.deepEqual(source.qualified_releases, []);
  const spellings = new Set();
  for (const entry of entries) {
    assert.ok(['command', 'function', 'ambiguous'].includes(entry.kind));
    assert.ok(['documented', 'unresolved'].includes(entry.status));
    assert.ok(entry.examples.length > 0);
    for (const text of entry.examples) assert.ok(entry.spellings.some((word) => text.includes(word)));
    for (const word of entry.spellings) {
      assert.ok(word.startsWith('Td ') && !spellings.has(word));
      spellings.add(word);
    }
    assert.ok(entry.citations.some((cite) => cite.source === 'guide'));
    assert.ok(entry.citations.some((cite) => cite.source === 'quickcard'));
    entry.citations.forEach(checkCitation);
  }
});

test('all 46 independently recorded quick-card cells are covered by guide-crosschecked records', () => {
  assert.equal(cells.length, 46);
  const expected = new Set(cells.map(citationKey));
  assert.equal(expected.size, 46);
  cells.forEach(checkCitation);
  const covered = new Set(entries.flatMap((entry) => entry.citations).map(citationKey).filter((key) => expected.has(key)));
  assert.deepEqual(covered, expected);
});

test('grouped axes and cached-result forms are expanded without dropping variants', () => {
  for (const [family, axes] of [['Move', 'XYZ'], ['Position', 'XYZ'], ['Angle', 'ABC'], ['Attitude', 'ABC'],
    ['Bearing', 'ABR'], ['Screen', 'XY'], ['World', 'XYZ'], ['View', 'XYZ'], ['Zone', 'XYZR'], ['Anim Point', 'XYZ']]) {
    for (const axis of axes) assert.ok(entries.some((entry) => entry.spellings.includes(`Td ${family} ${axis}`)), `${family} ${axis}`);
  }
  const cached = entries.filter((entry) => entry.spellings.some((word) => /^Td (Bearing|Screen|World|View) [A-Z]$/.test(word)));
  assert.equal(cached.length, 11);
  for (const entry of cached) assert.ok(entry.examples.includes(`MC_CACHED=${entry.spellings[0]}`));
});

test('unresolved spellings, roles, call syntax and results remain explicit evidence questions', () => {
  assert.deepEqual(questions.map((question) => question.id), ['relative-angle-spelling', 'quit-role', 'advanced-call-syntax', 'collision-result']);
  const referenced = new Set();
  for (const entry of entries) {
    assert.equal(entry.status === 'unresolved', entry.questions.length > 0, entry.id);
    for (const id of entry.questions) {
      assert.ok(questions.some((question) => question.id === id));
      referenced.add(id);
    }
  }
  assert.equal(entries.filter((entry) => entry.status === 'unresolved').length, 4);
  assert.deepEqual(referenced, new Set(questions.map((question) => question.id)));
  for (const question of questions) {
    assert.ok(question.blocks.length > 0 && question.evidence_needed.length > 0);
    question.citations.forEach(checkCitation);
  }
});

test('movement and rotation strings retain separate command families and redraw evidence', async () => {
  const { records } = await json(source.strings);
  assert.deepEqual(records.map((record) => record.commands), [
    ['Td Move X', 'Td Move Y', 'Td Move Z'], ['Td Angle A', 'Td Angle B', 'Td Angle C'],
  ]);
  for (const record of records) {
    assert.ok(record.examples.length > 0);
    assert.ok(record.qualification.includes('no string parser'));
    assert.ok(record.citations.some((cite) => cite.text.includes('every time Td Redraw')));
    record.citations.forEach(checkCitation);
  }
});
