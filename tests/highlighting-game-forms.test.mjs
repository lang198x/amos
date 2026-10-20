import test from 'node:test';
import { highlighter, tokens, assertScope } from './helpers/highlighter.mjs';

const checkForms = (forms, scope) => {
  for (const form of forms) {
    for (const source of [form, form.toLowerCase(), form.toUpperCase(), form.replaceAll(' ', '\t')]) {
      for (const theme of ['dark-plus', 'light-plus']) {
        assertScope(tokens(source, theme)[0], 0, source.length, scope, source);
        // Every longer word, including either AMOS type suffix, stays an identifier.
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const name = form.replaceAll(' ', '_') + suffix;
          assertScope(tokens(`${name}=1`, theme)[0], 0, name.length, 'variable.other.amos', name);
        }
      }
    }
  }
};

test('control/data commands from the full game have complete lexical scopes', () => {
  checkForms(['Gosub', 'Return', 'Dim', 'Randomize', 'Wait', 'Wait Vbl', 'Wait Key'], 'keyword.control.amos');
});

test.after(() => highlighter.dispose());
