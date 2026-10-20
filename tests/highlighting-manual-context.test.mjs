import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { highlighter, tokens, fragments, scopes, assertScope } from './helpers/highlighter.mjs';
import { entries } from './helpers/manual-core.mjs';

test('procedure and user-function declaration names are lexical definitions', () => {
  for (const source of ['Procedure MC_COMPUTE[V]', 'procedure mc_compute[V]', 'Def Fn MC_TEXT$(V$)=V$', 'Def Fn MC_REAL#(V#)=V#']) {
    const name = source.match(/(?:Procedure|Def Fn)\s+(\w+[$#]?)/i)[1];
    const start = source.indexOf(name);
    for (const theme of ['dark-plus', 'light-plus']) {
      assertScope(tokens(source, theme)[0], start, start + name.length, 'entity.name.function.amos', source);
    }
  }
  for (const source of ['MC_COMPUTE[1]', 'Proc MC_COMPUTE', 'Print Fn MC_TEXT$("x")']) {
    const name = source.includes('MC_TEXT$') ? 'MC_TEXT$' : 'MC_COMPUTE';
    const start = source.indexOf(name);
    assertScope(tokens(source)[0], start, start + name.length, 'variable.other.amos');
  }
});

test('manual vocabulary and declaration syntax stay inside strings and comments', () => {
  for (const entry of entries) {
    const word = entry.spelling;
    for (const theme of ['dark-plus', 'light-plus']) {
      assertScope(tokens(`Print "${word}"`, theme)[0], 7, 7 + word.length, 'string.quoted.double.amos');
      assertScope(tokens(`Rem ${word}`, theme)[0], 4, 4 + word.length, 'comment.line.rem.amos');
      assertScope(tokens(`'${word}`, theme)[0], 1, 1 + word.length, 'comment.line.apostrophe.amos');
    }
  }
  const quoted = 'Procedure MC_COMPUTE';
  assertScope(tokens(`Print "${quoted}"`)[0], 7, 7 + quoted.length, 'string.quoted.double.amos');
  const commented = 'Def Fn MC_TEXT$';
  assertScope(tokens(`Rem ${commented}`)[0], 4, 4 + commented.length, 'comment.line.rem.amos');
});

test('incomplete declarations do not consume names on the next line', () => {
  for (const prefix of ['Procedure', 'Def Fn']) {
    const result = tokens(`${prefix}\nMC_VALUE=1`);
    assertScope(result[1], 0, 8, 'variable.other.amos');
    assert.ok(!result.flatMap(fragments).some((t) => scopes(t).includes('entity.name.function.amos')));
  }
  assertScope(tokens('MC_PROCEDURE=1')[0], 0, 12, 'variable.other.amos');
});

test('independent mixed listings preserve exact text and expose declaration scopes in both themes', async () => {
  for (const file of ['control', 'strings-maths']) {
    const source = await readFile(new URL(`../specifications/manual-core/examples/${file}.amos.txt`, import.meta.url), 'utf8');
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = tokens(source, theme);
      assert.equal(result.map((line) => line.map((t) => t.content).join('')).join('\n'), source);
      const definitions = result.flatMap(fragments).filter((t) => scopes(t).includes('entity.name.function.amos'));
      assert.deepEqual(definitions.map((t) => t.content), file === 'control' ? ['MC_TWICE', 'MC_ACCUMULATE'] : []);
      assert.ok(result.flatMap(fragments).some((t) => scopes(t).includes('support.function.amos')));
    }
  }
});

test.after(() => highlighter.dispose());
