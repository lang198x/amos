import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = new URL('../specifications/extensions/amos-3d/', import.meta.url);
const json = async (file) => JSON.parse(await readFile(new URL(file, base), 'utf8'));
const evidence = await json('original-source.json');

test('original-source findings retain immutable provenance and no native qualification', async () => {
  assert.equal(evidence.repository, 'https://github.com/AOZ-Studio/AMOS-Professional-Official');
  assert.match(evidence.commit, /^[0-9a-f]{40}$/);
  assert.equal(evidence.wrapper_label, 'Issue 1.02(AP200)');
  assert.deepEqual(evidence.qualified_releases, []);
  assert.match(await readFile(new URL(evidence.license_file, base), 'utf8'), /MIT License/);
  for (const file of Object.values(evidence.files)) {
    assert.match(file.git_blob, /^[0-9a-f]{40}$/);
    assert.match(file.sha256, /^[0-9a-f]{64}$/);
    assert.ok(file.path.endsWith('.s'));
  }
  for (const cite of [...evidence.revision_citations, ...evidence.findings.flatMap((finding) => finding.citations)]) {
    assert.ok(evidence.files[cite.file]);
    assert.ok(cite.line > 0 && cite.end_line >= cite.line);
    assert.equal(cite.text.split('\n').length, cite.end_line - cite.line + 1);
  }
});

test('source and binary conclusions retain separate qualification', () => {
  const finding = (id) => evidence.findings.find((item) => item.id === id);
  assert.equal(evidence.findings.length, 4);
  assert.equal(evidence.findings.filter((item) => item.status === 'source-resolved').length, 3);
  for (const item of evidence.findings) assert.equal(item.native_verified, false);
  assert.equal(finding('relative-angle-spelling').source_spelling, 'Td Angle Rel');
  assert.deepEqual(finding('relative-angle-spelling').not_in_token_table, ['Td Angel Rel']);
  assert.equal(finding('quit-role').kind, 'command');
  assert.equal(finding('advanced-call-syntax').arguments, 1);
  assert.equal(finding('collision-result').status, 'binary-resolved');
  assert.equal(finding('collision-result').binary_evidence, 'collision-binary.json');
  assert.equal(evidence.external_library.inspected, true);
});

test('documentary conflicts remain linked to revision-scoped findings', async () => {
  const { questions } = await json('questions.json');
  for (const finding of evidence.findings) {
    const question = questions.find((item) => item.id === finding.id);
    assert.equal(question.status, finding.status);
    assert.equal(question.source_evidence, `original-source.json#${finding.id}`);
    assert.ok(question.citations.length >= 2);
    assert.ok(question.remaining_evidence.length > 0);
  }
  const source = await json('source.json');
  const records = (await Promise.all(source.inventory_files.map(json))).flatMap((family) => family.entries);
  const linked = records.filter((entry) => entry.status === 'source-evidenced');
  assert.equal(linked.length, 3);
  for (const entry of linked) assert.ok(entry.implementation_evidence.startsWith('original-source.json#'));
  const quit = records.find((entry) => entry.id === 'td-quit');
  assert.equal(quit.documented_kind, 'ambiguous');
  assert.equal(quit.kind, 'command');
  assert.equal(records.find((entry) => entry.id === 'td-advanced').source_example, 'MC_ADDRESS=Td Advanced(1)');
});

test('binary evidence binds the dispatch entry to nonempty, intact code excerpts', async () => {
  const binary = await json(evidence.external_library.evidence);
  assert.equal(binary.commit, evidence.commit);
  assert.equal(binary.git_blob, evidence.external_library.git_blob);
  assert.equal(binary.path, evidence.external_library.path);
  assert.match(binary.sha256, /^[0-9a-f]{64}$/);
  assert.equal(binary.native_verified, false);
  assert.deepEqual(binary.qualified_releases, []);
  for (const excerpt of binary.excerpts) {
    const bytes = Buffer.from(excerpt.hex, 'hex');
    assert.ok(bytes.length > 0);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), excerpt.sha256);
    if (excerpt.listing) {
      const listed = excerpt.listing.map((line) => Buffer.from(line.match(/\[([^\]]+)\]/)[1].replaceAll(', ', ''), 'hex'));
      assert.deepEqual(Buffer.concat(listed), bytes);
    }
  }
  const table = binary.table;
  const cold = binary.excerpts.find((item) => item.id === 'cold-start-return');
  const code = Buffer.from(cold.hex, 'hex');
  // LEA d16(PC),A0 at 0x54 uses the extension word's address as its PC base.
  const lea = 0x54 - cold.hunk_offset;
  assert.equal(code.readUInt16BE(lea), 0x41fa);
  assert.equal(0x54 + 2 + code.readInt16BE(lea + 2), table.offset);
  assert.equal(table.offset + table.index * 4, table.entry_offset);
  const slot = binary.excerpts.find((item) => item.id === 'collision-slot');
  assert.equal(slot.hunk_offset, table.entry_offset);
  assert.equal(Buffer.from(slot.hex, 'hex').readUInt32BE(), table.target_offset);
  assert.ok(binary.relocations.some((item) => item.hunk === table.hunk && item.offset === slot.hunk_offset && item.target_hunk === table.target_hunk));
  const routine = binary.excerpts.find((item) => item.id === 'collision-entry');
  assert.equal(routine.hunk, table.target_hunk);
  assert.equal(routine.hunk_offset, table.target_offset);
});

test('retained return-path bytes distinguish candidate identity from predicate result', async () => {
  const binary = await json('collision-binary.json');
  const excerpt = binary.excerpts.find((item) => item.id === 'collision-entry');
  const bytes = Buffer.from(excerpt.hex, 'hex');
  const word = (address) => bytes.readUInt16BE(address - excerpt.hunk_offset);
  const branch = (address) => address + 2 + bytes.readInt8(address - excerpt.hunk_offset + 1);
  assert.equal(word(0x1584), 0x4a04); // TST.B D4
  assert.equal(word(0x1586) >>> 8, 0x67); // BEQ back only without a hit
  assert.equal(branch(0x1586), 0x1562);
  assert.equal(word(0x158c), 0x5385); // SUBQ.L #1,D5 undoes loop increment
  assert.equal(branch(0x158e), 0x159c);
  assert.equal(word(0x159c), 0x4a04);
  assert.equal(branch(0x159e), 0x15a4); // no-hit path
  assert.equal(word(0x15a0), 0x2005); // MOVE.L D5,D0, not predicate D4
  assert.equal(word(0x15a4), 0x70ff); // MOVEQ #-1,D0
  assert.equal(word(0x15aa), 0x4e75); // RTS
});
