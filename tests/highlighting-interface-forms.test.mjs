import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { highlighter, render, check, lacks, themes } from './helpers/interface-highlighter.mjs';

const entries = [];
for (const chapter of ['09-01', '09-02', '09-03', '09-04']) {
  const data = JSON.parse(await readFile(new URL(`../specifications/interface/${chapter}.json`, import.meta.url), 'utf8'));
  entries.push(...data.entries);
}

test('all 69 Interface records receive definition-backed lexical roles in both themes', () => {
  assert.equal(entries.length, 69);
  assert.equal(new Set(entries.map((entry) => entry.code)).size, 68);
  for (const theme of themes) {
    for (const entry of entries) {
      const scope = entry.code === 'SW' ? 'support.other.builtin.amos-interface'
        : entry.kind === 'function' ? 'support.function.amos-interface' : 'keyword.control.amos-interface';
      check(entry.example, entry.code, scope, theme);
      const padded = `lower${entry.code[0]}padding${entry.code[1]}tail`;
      check(entry.example.replace(entry.code, padded), padded, scope, theme);
      check(entry.code.toLowerCase(), entry.code.toLowerCase(), 'meta.ignored.amos-interface', theme);
    }
  }
});

test('documented long spellings use significant capitals; SW stays neutral in both roles', () => {
  for (const theme of themes) {
    for (const word of ['EXit', 'SetVar', 'PRint', 'GraphicBox', 'JmP', 'RunUntil', 'CAll']) {
      check(`${word} 0;`, word, 'keyword.control.amos-interface', theme);
    }
    for (const word of ['VAriable', 'ArrayRead', 'ArraySize', 'SpaddingH']) {
      check(`0 ${word}`, word, 'support.function.amos-interface', theme);
    }
    for (const word of ['SW', 'ScreenWidth', 'SetWriting']) {
      check(`PR 0,0,${word},3;`, word, 'support.other.builtin.amos-interface', theme);
      lacks(word, word, 'support.function.amos-interface', theme);
      lacks(`${word} 1;`, word, 'keyword.control.amos-interface', theme);
    }
    for (const word of ['AR', 'AS']) lacks(word, word, 'keyword.control.amos-interface', theme);
  }
});

test('unknown pairs and disputed single-capital spellings do not invent aliases', () => {
  for (const theme of themes) {
    for (const word of ['ZZ', 'QQ', 'Call', 'Min', 'Max', 'Neg', 'Print', 'Rem']) {
      check(word, word, 'meta.unclassified.amos-interface', theme);
    }
    check('ZZPR 0,0,1,3;', 'ZZ', 'meta.unclassified.amos-interface', theme);
    check('ZZPR 0,0,1,3;', 'PR', 'keyword.control.amos-interface', theme);
    check('UI ZZ,1;[PR 0,0,P1,3;] ZZ 1;', 'ZZ', 'meta.unclassified.amos-interface', theme);
    check('pr', 'pr', 'meta.ignored.amos-interface', theme);
    // Recognition is lexical, not a promise that missing command separators run.
    const source = 'PR 0,0,1,3 EX;';
    check(source, 'EX', 'keyword.control.amos-interface', theme);
    assert.equal(render(source, theme)[0].map((token) => token.content).join(''), source);
  }
});

test.after(() => highlighter.dispose());
