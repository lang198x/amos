import test from 'node:test';
import assert from 'node:assert/strict';
import { highlighter, tokens, scopes, assertScope } from './helpers/highlighter.mjs';

test('existing guards protect command-like names, strings and both comment forms', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const name of ['PrintCount', 'Endless', 'Inkey$Extra', 'Upper$Extra', 'Wait_Key', 'Rnd#']) {
      assertScope(tokens(`${name}=1`, theme)[0], 0, name.length, 'variable.other.amos', name);
    }
    for (const source of ['"Screen Swap: And Key State"', "'Screen Swap", 'Rem Screen Swap']) {
      for (const token of tokens(source, theme)[0]) {
        assert.ok(!scopes(token).some((s) => s.startsWith('support.function') || s.startsWith('keyword.operator')));
      }
    }
    const source = 'Print "\\" : End';
    assertScope(tokens(source, theme)[0], source.indexOf('End'), source.length, 'keyword.control.amos');
  }
});

test.after(() => highlighter.dispose());
