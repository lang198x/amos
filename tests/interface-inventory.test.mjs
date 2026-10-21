import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = new URL('../specifications/', import.meta.url);
const json = async (file) => JSON.parse(await readFile(new URL(file, base), 'utf8'));
const source = await json('interface/source.json');
const chapters = await Promise.all(source.files.map((file) => json(`interface/${file}`)));
const definitions = chapters.flatMap((chapter) => chapter.entries.map((entry) => ({ ...entry, chapter: chapter.chapter })));
const key = (entry) => `${entry.chapter}:${entry.code}:${entry.kind}`;

test('Interface definitions retain separate roles, grouped signatures and illustrative fragments', async () => {
  assert.equal(source.extract_sha256, (await json('manual-core/source.json')).extract_sha256);
  assert.deepEqual(source.qualified_releases, []);
  assert.deepEqual(source.files, ['09-01.json', '09-02.json', '09-03.json', '09-04.json']);
  assert.deepEqual(chapters.map((chapter) => chapter.entries.length), [15, 35, 13, 6]);
  assert.equal(source.entries, 69);
  assert.equal(definitions.length, 69);
  assert.equal(new Set(definitions.map(key)).size, 69);
  assert.equal(new Set(definitions.map((entry) => entry.code)).size, 68);
  assert.equal(source.unique_codes, 68);
  assert.deepEqual(['command', 'function', 'structure'].map((kind) => definitions.filter((entry) => entry.kind === kind).length), [46, 22, 1]);
  assert.equal(new Set(definitions.map((entry) => entry.role_line)).size, 64);
  assert.equal(new Set(definitions.flatMap((entry) => entry.signatures.map((signature) => signature.extract_line))).size, 70);
  for (const entry of definitions) {
    const bounds = source.chapters.find((chapter) => chapter.chapter === entry.chapter).extract_lines;
    assert.match(entry.code, /^[A-Z]{2}$/);
    assert.ok(entry.heading.length > 0 && entry.example.length > 0 && entry.signatures.length > 0);
    assert.ok(entry.extract_line >= bounds[0] && entry.extract_line < entry.role_line && entry.role_line < bounds[1]);
    assert.ok(entry.page.startsWith(entry.chapter + '.'));
    assert.match(entry.example, new RegExp(`\\b${entry.code}\\b`));
    for (const signature of entry.signatures) {
      assert.ok(signature.extract_line > entry.role_line && signature.extract_line < bounds[1]);
      assert.match(signature.text, new RegExp(`\\b${entry.code}\\b`));
    }
  }
  const sw = definitions.filter((entry) => entry.code === 'SW');
  assert.deepEqual(sw.map((entry) => entry.kind), ['function', 'command']);
  assert.deepEqual(sw.map((entry) => entry.extract_line), [16080, 16258]);
  const sh = definitions.find((entry) => entry.code === 'SH');
  assert.equal(sh.heading, 'ScreenWidth');
  assert.equal(sh.signatures[0].extract_line, 16083);
});

test('every Interface index row maps to one definition while conflicts and lexical questions stay explicit', async () => {
  const index = await json('command-index/source.json');
  const pages = await Promise.all(index.files.map((file) => json(`command-index/${file}`)));
  const rows = pages.flatMap((page) => page.entries).filter((row) => row.surface === 'interface');
  const mapping = (await json('interface/index.json')).entries;
  assert.equal(rows.length, 69);
  assert.deepEqual(mapping.map((row) => row.index_line), rows.map((row) => row.extract_line));
  assert.equal(new Set(mapping.map(key)).size, definitions.length);
  for (const entry of mapping) {
    const row = rows.find((item) => item.extract_line === entry.index_line);
    assert.equal(entry.index_spelling, row.spelling);
    assert.equal(entry.index_role, row.role);
    assert.equal(entry.code, row.spelling.replace(/[a-z]/g, ''));
    assert.equal(definitions.filter((definition) => key(definition) === key(entry)).length, 1);
  }
  const conflicts = mapping.filter((entry) => entry.findings.length > 0);
  assert.deepEqual(conflicts.map((entry) => [entry.code, entry.kind, entry.findings]), [['AR', 'function', ['role']], ['AS', 'function', ['role']]]);
  const lexical = await json('interface/lexical.json');
  assert.deepEqual(lexical.qualified_releases, []);
  assert.deepEqual(lexical.arithmetic, ['+', '-', '*', '/', 'Neg', '!', '#', 'Min', 'Max']);
  assert.deepEqual(lexical.conditional, ['=', '\\', '<', '>', '&', '|']);
  assert.deepEqual(lexical.parameter_family.members, Array.from({ length: 9 }, (_, i) => `P${i + 1}`));
  assert.equal(new Set(lexical.citations.map((citation) => citation.id)).size, 9);
  for (const citation of lexical.citations) {
    assert.ok(citation.extract_lines[0] <= citation.extract_lines[1] && citation.finding.length > 0);
    assert.match(citation.page, /^09\.0[1-4]\.\d{2}$/);
  }
});
