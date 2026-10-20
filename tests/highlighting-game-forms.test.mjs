import test from 'node:test';
import { highlighter, tokens, assertScope } from './helpers/highlighter.mjs';
import { entries } from './helpers/manual-core.mjs';

const known = new Set(entries.map((entry) => entry.spelling.toLowerCase()));

const checkForms = (forms, scope) => {
  for (const form of forms) {
    for (const source of [form, form.toLowerCase(), form.toUpperCase(), form.replaceAll(' ', '\t')]) {
      for (const theme of ['dark-plus', 'light-plus']) {
        assertScope(tokens(source, theme)[0], 0, source.length, scope, source);
        // A suffixed name stays an identifier unless it is a documented builtin.
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const name = form.replaceAll(' ', '_').replace(/[$#]$/, '') + suffix;
          if (name === form) continue; // The actual builtin is a positive case above.
          if (known.has(name.toLowerCase())) continue; // Pen$/Paper$ have their own positive tests.
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
  for (const source of ['Double Buffering', 'Bob Update Office', 'Curs Offset']) {
    for (const token of tokens(source)[0]) {
      if (token.content.trim()) assertScope([token], 0, token.content.length, 'variable.other.amos', source);
    }
  }
});

test('sound, input and screen functions retain their complete forms', () => {
  checkForms(['Play Off', 'Play', 'Wave', 'Volume', 'Set Envel', 'Clear Key'], 'keyword.control.amos');
  checkForms(['Key State', 'Upper$', 'Inkey$', 'Scancode', 'Physic', 'Logic', 'Rnd'], 'support.function.amos');
  checkForms(['Timer'], 'variable.language.amos');
  checkForms(['And', 'Or'], 'keyword.operator.amos');
});

test('standalone labels differ from commands, array names and unresolved invocations', () => {
  for (const source of ['BR_DRAW_STATE:', 'Other_Label:', '  other_label :']) {
    const start = source.search(/[A-Za-z_]/);
    const end = source.indexOf(':');
    assertScope(tokens(source)[0], start, source.slice(0, end).trimEnd().length, 'entity.name.label.amos');
  }
  for (const source of ['Print:', 'End:', 'Return:', 'Wait:']) {
    assertScope(tokens(source)[0], 0, source.length - 1, 'keyword.control.amos');
  }
  for (const source of ['BR_MARK(1)=2', 'BR_DRAW_STATE', 'Gosub TARGET+1', 'MY_PROC[1]']) {
    const name = source.startsWith('Gosub') ? 'TARGET' : source.match(/^[A-Za-z_]+/)[0];
    const start = source.indexOf(name);
    assertScope(tokens(source)[0], start, start + name.length, 'variable.other.amos');
  }
});

test.after(() => highlighter.dispose());
