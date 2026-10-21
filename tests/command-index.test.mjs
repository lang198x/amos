import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = new URL('../specifications/', import.meta.url);
const json = async (file) => JSON.parse(await readFile(new URL(file, base), 'utf8'));
const source = await json('command-index/source.json');
const pages = await Promise.all(source.files.map((file) => json(`command-index/${file}`)));
const rows = pages.flatMap((page) => page.entries);
const counts = (values) => Object.fromEntries([...new Set(values)].sort().map((key) => [key, values.filter((value) => value === key).length]));

test('command-index audit partitions all pages and resolves every claimed inventory reference', async () => {
  assert.equal(source.extract_sha256, (await json('manual-core/source.json')).extract_sha256);
  assert.deepEqual(source.extract_lines, [27469, 28484]);
  assert.deepEqual(source.files, Array.from({ length: 20 }, (_, i) => `14-G-${String(i + 1).padStart(2, '0')}.json`));
  assert.equal(rows.length, 818);
  assert.equal(source.entries, rows.length);
  assert.deepEqual(counts(rows.map((row) => row.surface)), source.surfaces);
  assert.deepEqual(source.surfaces, { amal: 33, basic: 702, interface: 69, menu: 14 });
  assert.deepEqual(counts(rows.flatMap((row) => row.findings)), source.findings);
  let last = source.extract_lines[0] - 1;
  const seen = new Set();
  for (const [index, page] of pages.entries()) {
    assert.equal(page.page, `14.G.${String(index + 1).padStart(2, '0')}`);
    assert.equal(page.extract_lines[0], last + 1);
    assert.ok(page.entries.length > 0 && page.extract_lines[1] > page.extract_lines[0]);
    last = page.extract_lines[1];
    let previous = page.extract_lines[0] - 1;
    for (const row of page.entries) {
      assert.ok(row.extract_line > previous && row.extract_line < last && !seen.has(row.extract_line));
      previous = row.extract_line;
      seen.add(row.extract_line);
      assert.ok(row.spelling.length > 0 && row.role.length > 0);
      assert.match(row.target_page, /^\d+\.(?:\d+|[A-F])\.\d+$/);
      assert.ok(row.target.endsWith(row.target_page));
      assert.equal(row.references.length === 0, row.surface === 'interface');
      for (const reference of row.references) {
        assert.match(reference.file, /^(?:manual-core|amal)\/[A-Za-z0-9-]+\.json$/);
        const inventory = await json(reference.file);
        const entries = row.surface === 'menu' ? inventory.embedded_entries : inventory.entries;
        assert.equal(entries.filter((entry) => entry.spelling === reference.spelling && entry.kind === reference.kind).length, 1);
        assert.equal(reference.file.startsWith('amal/'), row.surface === 'amal');
      }
    }
  }
  assert.equal(last, source.extract_lines[1]);
});

test('index conflicts preserve language boundaries, composites and definition roles', () => {
  const find = (line) => {
    const found = rows.filter((row) => row.extract_line === line);
    assert.equal(found.length, 1);
    return found[0];
  };
  for (const [line, spelling, context] of [[27749, 'eXit', [13544, 13545]], [28413, 'Wait', [13549, 13550]]]) {
    const row = find(line);
    assert.equal(row.surface, 'amal');
    assert.equal(row.references[0].spelling, spelling);
    assert.ok(row.findings.includes('surface-label'));
    assert.deepEqual(row.definition_context, context);
  }
  const composite = find(28026);
  assert.deepEqual(composite.references.map((reference) => reference.spelling), ['On', 'Proc']);
  assert.deepEqual(composite.definition_context, [5235, 5237]);
  for (const line of [27698, 27893, 27905, 28126]) assert.ok(find(line).findings.includes('role'));
  assert.deepEqual(find(27842).findings, ['missing-colon']);
  assert.equal(find(28070).target, 'PI 5.3.07');
  assert.ok(find(27718).findings.includes('spelling'));
  assert.equal(find(27718).references[0].spelling, 'ELlipse');
  assert.equal(find(27848).references[0].spelling, 'INk');
});
