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

test('display commands keep complete multiword forms and ordinary names distinct', () => {
  checkForms(['Bob Update Off', 'Double Buffer', 'Screen Swap', 'Screen Copy',
    'Curs Off', 'Flash Off', 'Autoback', 'Palette', 'Paper', 'Pen', 'Locate',
    'Ink', 'Bar', 'Box', 'Hide', 'Show'], 'keyword.control.amos');
  for (const source of ['Screen Swapper', 'Double Buffering', 'Bob Update Office', 'Flash Officer', 'Curs Offset']) {
    for (const token of tokens(source)[0]) {
      if (token.content.trim()) assertScope([token], 0, token.content.length, 'variable.other.amos', source);
    }
  }
});

test.after(() => highlighter.dispose());
