import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = new URL('../specifications/extensions/io/', import.meta.url);
const source = JSON.parse(await readFile(new URL('original-source.json', base), 'utf8'));

test('pinned I/O token evidence resolves spelling and grouping without native qualification', async () => {
  assert.equal(source.commit, '533b4b1f5acd604814513f78e02c7b4796cb0531');
  assert.equal(source.git_blob, '59162d7c0d6790a338fb2e1095db47a539cb56fa');
  assert.equal(source.sha256, '12e3c62ee4dbc537fc64a2288e380c57e8937c9dc47736fd0c9f1a344285594a');
  assert.deepEqual(source.qualified_releases, []);
  for (const citation of source.citations) {
    assert.equal(citation.text.split('\n').length, citation.end_line - citation.line + 1);
    assert.equal(createHash('sha256').update(Buffer.from(citation.text, 'latin1')).digest('hex'), citation.sha256);
  }
  const text = (id) => source.citations.find((citation) => citation.id === id).text;
  const table = text('token-table');
  assert.ok(table.startsWith('C_Tk\n') && table.includes('TOKEN_END'));
  const names = [...table.matchAll(/dc\.b\s+"!?([^"]+)","([^"])"\+\$80/g)].map((match) => match[1] + match[2]);
  assert.equal(new Set(names).size, 38);
  assert.equal(new Set(names.filter((name) => name.startsWith('serial '))).size, 18);
  assert.equal(new Set(names.filter((name) => name.startsWith('parallel '))).size, 10);
  assert.ok(names.includes('serial buf') && !names.includes('serial buffer'));
  assert.ok(names.includes('serial input$') && names.includes('parallel input$'));
  assert.match(table, /L_InSerialBuf,L_Nul\n[^\n]+"serial bu","f"\+\$80/);
  assert.match(text('buffer-dispatch'), /Lib_Par\s+InSerialBuf/);
  assert.match(text('serial-base'), /move\.l\s+d3,d0\n\s+Rbsr\s+L_GetSerA1/);
  for (const finding of source.findings) assert.equal(finding.native_verified, false);
  assert.match(await readFile(new URL('original-source-LICENSE', base), 'utf8'), /MIT License/);
});
