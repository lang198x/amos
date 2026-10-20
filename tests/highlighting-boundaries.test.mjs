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

test('new vocabulary cannot escape string/comment guards or borrow a neighbouring scope', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    const body = 'Screen Swap Key State Timer Play Off And';
    assertScope(tokens(`Print "${body}"`, theme)[0], 7, 7 + body.length, 'string.quoted.double.amos');
    assertScope(tokens(`Rem ${body}`, theme)[0], 4, 4 + body.length, 'comment.line.rem.amos');
    assertScope(tokens(`'${body}`, theme)[0], 1, 1 + body.length, 'comment.line.apostrophe.amos');
    // The theme merges ")="; its unscoped parenthesis must not inherit "="'s scope.
    assert.throws(() => assertScope(tokens('X(1)=2', theme)[0], 3, 4, 'keyword.operator.amos'), /lacks/);
  }
});

test.after(() => highlighter.dispose());
