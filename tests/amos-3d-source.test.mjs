import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = new URL('../specifications/extensions/amos-3d/', import.meta.url);
const json = async (file) => JSON.parse(await readFile(new URL(file, base), 'utf8'));
const evidence = await json('original-source.json');

test('original-source findings retain immutable provenance and source-only qualification', async () => {
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

test('three source conclusions do not erase the external collision implementation boundary', () => {
  const finding = (id) => evidence.findings.find((item) => item.id === id);
  assert.equal(evidence.findings.length, 4);
  assert.equal(evidence.findings.filter((item) => item.status === 'source-resolved').length, 3);
  for (const item of evidence.findings) assert.equal(item.native_verified, false);
  assert.equal(finding('relative-angle-spelling').source_spelling, 'Td Angle Rel');
  assert.deepEqual(finding('relative-angle-spelling').not_in_token_table, ['Td Angel Rel']);
  assert.equal(finding('quit-role').kind, 'command');
  assert.equal(finding('advanced-call-syntax').arguments, 1);
  assert.equal(finding('collision-result').status, 'open');
  assert.equal(finding('collision-result').unresolved_boundary, 'c3d.lib TD_COLLIDE implementation');
  assert.equal(evidence.external_library.inspected, false);
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
