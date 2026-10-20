import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const json = async (path) => JSON.parse(await readFile(new URL(`../specifications/${path}`, import.meta.url), 'utf8'));

test('AMAL documentary inventory keeps significant capitals and register families separate from BASIC', async () => {
  const source = await json('amal/source.json');
  const core = await json('manual-core/source.json');
  assert.equal(source.extract_sha256, core.extract_sha256);
  assert.equal(source.product, 'AMOS Professional');
  assert.deepEqual(source.files, ['commands.json', 'functions.json', 'registers.json']);
  const all = await Promise.all(source.files.map((file) => json(`amal/${file}`)));
  assert.deepEqual(all.map((file) => file.entries.length), [16, 15, 5]);
  const codes = new Set();
  for (const entry of all.slice(0, 2).flatMap((file) => file.entries)) {
    assert.equal(entry.code, entry.spelling.replace(/[a-z]/g, ''));
    assert.ok(!codes.has(entry.code));
    assert.ok(entry.example.length > 0);
    assert.match(entry.page, /^07\.06\.\d{2}$/);
    assert.ok(Number.isInteger(entry.extract_line) && entry.extract_line > 0);
    codes.add(entry.code);
  }
  const regs = all[2].entries;
  assert.deepEqual(regs[0].members, Array.from({ length: 10 }, (_, i) => `R${i}`));
  assert.deepEqual(regs[1].members, Array.from({ length: 26 }, (_, i) => `R${String.fromCharCode(65 + i)}`));
  assert.equal(regs[1].held_heading, 'External registers RA to RI');
  assert.deepEqual(regs[1].range_evidence_lines, [12926, 12928]);
  assert.deepEqual(regs.slice(2).map((entry) => entry.spelling), ['X', 'Y', 'A']);
});

test('AMOS 3D scope retains extension sources and unresolved spelling evidence without qualifying releases', async () => {
  const source = await json('extensions/amos-3d/source.json');
  assert.equal(source.component, 'optional language extension');
  assert.deepEqual(source.qualified_releases, []);
  assert.deepEqual(Object.keys(source.sources), ['guide', 'quickcard']);
  for (const value of Object.values(source.sources)) assert.match(value.extract_sha256, /^[0-9a-f]{64}$/);
  assert.equal(source.evidence.length, 6);
  const seen = new Set();
  for (const entry of source.evidence) {
    assert.ok(!seen.has(entry.id));
    assert.ok(source.sources[entry.source]);
    assert.ok(Number.isInteger(entry.extract_line) && entry.extract_line > 0);
    assert.match(entry.page, /^\d+$/);
    assert.ok(entry.text.length > 0);
    seen.add(entry.id);
  }
  const find = (id) => source.evidence.find((entry) => entry.id === id).text;
  assert.equal(find('relative-angle-prose'), 'Td ANGLE REL');
  assert.equal(find('relative-angle-signature'), 'Td ANGEL REL n,dA,dB,dC');
});
