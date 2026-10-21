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

test('I/O documentary records retain provenance when promoted to lexical coverage', async () => {
  const source = await json('extensions/io/source.json');
  const core = await json('manual-core/source.json');
  assert.equal(source.product, core.product);
  assert.equal(source.extract_sha256, core.extract_sha256);
  assert.deepEqual(source.files, ['serial.json', 'parallel.json']);
  assert.deepEqual(source.qualified_releases, []);
  assert.ok(core.chapters.includes('10-04') && !core.chapters.includes('10-05'));
  const serialCore = await json('manual-core/10-04.json');
  const inventories = await Promise.all(source.files.map((file) => json(`extensions/io/${file}`)));
  assert.deepEqual(inventories.map((file) => file.entries.length), [18, 10]);
  assert.deepEqual(inventories.map((file) => file.entries.filter((entry) => entry.kind === 'function').length), [6, 5]);
  const seen = new Set();
  for (const inventory of inventories) {
    assert.ok(['10.04', '10.05'].includes(inventory.chapter));
    for (const entry of inventory.entries) {
      assert.ok(!seen.has(entry.spelling));
      assert.ok(entry.example.includes(entry.spelling));
      assert.ok(['command', 'function'].includes(entry.kind));
      assert.ok(entry.page.startsWith(`${inventory.chapter}.`));
      assert.ok(Number.isInteger(entry.extract_line) && entry.extract_line > 0);
      seen.add(entry.spelling);
    }
  }
  assert.ok(seen.has('Serial Input$') && seen.has('Parallel Input$'));
  assert.ok(!seen.has('Serial Inputs') && !seen.has('Parallel Inputs'));
  const buffer = inventories[0].entries.find((entry) => entry.spelling === 'Serial Buf');
  assert.equal(buffer.spelling_status, 'source-resolved');
  assert.equal(buffer.source_evidence, 'original-source.json#buffer-spelling');
  assert.deepEqual(serialCore.entries.map(({ component, ...entry }) => entry), inventories[0].entries);
  assert.equal(buffer.held_signature, 'Serial Buffer Channel number,length');
  assert.equal(buffer.signature_line, buffer.extract_line + 2);
  assert.ok(!seen.has('Serial Buffer'));
});

test('I/O boundary evidence preserves exact excerpts and unresolved questions', async () => {
  const source = await json('extensions/io/source.json');
  const questions = await json('extensions/io/questions.json');
  assert.deepEqual(source.evidence.map((entry) => entry.id), [
    'serial-component', 'buffer-heading-signature', 'serial-handshake-formula',
    'extension-installation', 'music-component', 'extension-configuration',
  ]);
  for (const entry of source.evidence) {
    assert.ok(entry.extract_line > 0 && entry.end_line >= entry.extract_line);
    assert.equal(entry.text.split('\n').length, entry.end_line - entry.extract_line + 1);
    assert.ok(entry.text.trim().length > 0);
    assert.match(entry.page, /^(?:\d{2}\.\d{2}|14\.D)\.\d{2}$/);
  }
  const text = (id) => source.evidence.find((entry) => entry.id === id).text;
  assert.match(text('serial-component'), /I\/O Extension/);
  assert.match(text('buffer-heading-signature'), /SERIAL BUF\n/);
  assert.match(text('buffer-heading-signature'), /Serial Buffer/);
  assert.match(text('music-component'), /separate MUSIC extension/);
  assert.match(text('serial-handshake-formula'), /XON110000000/);
  assert.deepEqual(questions.map((entry) => entry.id), ['buffer-spelling', 'serial-x-semantics', 'parallel-component', 'serial-base-arity']);
  for (const entry of questions) {
    const status = { 'buffer-spelling': 'source-resolved', 'serial-x-semantics': 'unresolved', 'parallel-component': 'source-resolved', 'serial-base-arity': 'source-conflict' };
    assert.equal(entry.status, status[entry.id]);
    assert.ok(entry.extract_line > 0 && entry.detail.length > 0);
    assert.match(entry.page, /^10\.0[45]\.\d{2}$/);
  }
});
