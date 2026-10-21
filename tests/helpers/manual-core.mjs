import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { tokens, assertScope } from './highlighter.mjs';

const base = new URL('../../specifications/manual-core/', import.meta.url);
export const reference = JSON.parse(await readFile(new URL('source.json', base), 'utf8'));
export const chapters = await Promise.all(reference.chapters.map(async (id) =>
  JSON.parse(await readFile(new URL(`${id}.json`, base), 'utf8'))));
export const entries = chapters.flatMap((chapter) => chapter.entries);
const known = new Set(entries.map((entry) => entry.spelling.toLowerCase()));
export const scopeFor = (kind) => ({
  command: 'keyword.control.amos', comment: 'keyword.control.amos',
  function: 'support.function.amos', operator: 'keyword.operator.amos',
  reserved: 'variable.language.amos',
  shortcut: 'keyword.control.amos',
})[kind];

export const checkEntry = (entry) => {
  const { spelling, example, kind } = entry;
  const scope = entry.lexical_scope ?? scopeFor(kind);
  const start = example.indexOf(spelling);
  assert.ok(start >= 0 && spelling.length > 0 && scopeFor(kind));
  assert.match(entry.page, /^(?:\d{2}\.\d{2}|14\.[ABCF])\.\d{2}$/);
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const change of [(s) => s, (s) => s.toLowerCase(), (s) => s.toUpperCase()]) {
      const source = change(example);
      assertScope(tokens(source, theme)[0], start, start + spelling.length, scope, `${spelling}: ${source}`);
    }
    const tabbed = spelling.replaceAll(' ', '\t');
    assertScope(tokens(tabbed, theme)[0], 0, tabbed.length, scope, tabbed);
    if (kind === 'comment' || kind === 'shortcut') continue;
    for (const suffix of ['Extra', '_VALUE', '$', '#']) {
      const name = spelling.replace(/[ /.]/g, '_').replace(/[$#]$/, '') + suffix;
      if (known.has(name.toLowerCase())) continue; // Param$/Param# are positive entries.
      assertScope(tokens(`${name}=1`, theme)[0], 0, name.length, 'variable.other.amos', name);
    }
    if (!spelling.includes(' ')) {
      assertScope(tokens(`${spelling}:`, theme)[0], 0, spelling.length, scope, `${spelling}:`);
    }
  }
};
