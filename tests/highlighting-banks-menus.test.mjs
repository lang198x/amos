import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import { chapters, entries } from './helpers/manual-core.mjs';
import { highlighter, tokens, assertScope } from './helpers/highlighter.mjs';

const check = (source, word, scope, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(tokens(source, theme)[0], start, start + word.length, scope, source);
};

test('bank and menu phrases win over shorter command and screen forms', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const word of ['Reserve As Chip Data', 'Reserve As Chip Work', 'Erase All', 'Erase Temp',
      'Load Iff', 'Save Iff', 'Bank To Menu', 'Menu To Bank', 'Menu Item Movable', 'On Menu On', 'Draw To']) {
      check(word, word, 'keyword.control.amos', theme);
    }
    for (const word of ['Screen Base', 'Icon Base', 'Sprite Base', 'Fast Free', 'Chip Free', 'X Menu', 'Y Menu']) {
      check(`MC_RESULT=${word}`, word, 'support.function.amos', theme);
    }
    for (const [source, word] of [['Erase Temporary', 'Temporary'], ['Menu Item Movement', 'Movement'],
      ['Reserve As Chip Working', 'Working'], ['Bank To Menus', 'Menus'], ['Colour Background', 'Background']]) {
      check(source, word, 'variable.other.amos', theme);
    }
  }
});

test('Colour retains both roles and menu assignments retain a reserved-variable scope', () => {
  assert.deepEqual(entries.filter((entry) => entry.spelling === 'Colour').map((entry) => entry.kind), ['function', 'command']);
  assert.deepEqual(entries.filter((entry) => entry.spelling === 'Menu$').map((entry) => entry.kind), ['reserved', 'command']);
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['Colour 2,$F80', 'MC_RGB=Colour(2)', 'Colour:']) check(source, 'Colour', 'keyword.other.amos', theme);
    check('Colour Back $123', 'Colour Back', 'keyword.control.amos', theme);
    for (const source of ['Menu$(1)="Shapes"', 'Menu$(1,1)="Circle","Selected"']) {
      check(source, 'Menu$', 'variable.language.amos', theme);
    }
    for (const word of ['Colourful', 'ChoiceExtra', 'Menu$Extra', 'Screen_Base']) {
      check(`${word}=1`, word, 'variable.other.amos', theme);
    }
  }
});

test('menu callback targets remain unresolved identifiers', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const kind of ['Proc', 'Gosub', 'Goto']) {
      const source = `On Menu ${kind} MC_FIRST,MC_SECOND`;
      for (const word of ['MC_FIRST', 'MC_SECOND']) check(source, word, 'variable.other.amos', theme);
    }
  }
});

test('all fourteen embedded menu forms remain strings without promoting embedded-only names to BASIC vocabulary', () => {
  const embedded = chapters.find((chapter) => chapter.chapter === '06.05').embedded_entries;
  assert.equal(embedded.length, 14);
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const entry of embedded) {
      const source = entry.example;
      assertScope(tokens(source, theme)[0], source.indexOf('"') + 1, source.lastIndexOf('"'), 'string.quoted.double.amos', entry.spelling);
    }
    check('Bob 1,80,60,1', 'Bob', 'keyword.control.amos', theme);
    for (const word of ['Sfont', 'Sstyle', 'Sline', 'Pattern', 'Outline', 'Reserve', 'Icon']) {
      check(word, word, 'variable.other.amos', theme);
    }
  }
});

test('fresh bank/drawing/menu listing preserves source and scopes through both consumers', async () => {
  const source = await readFile(new URL('../specifications/manual-core/examples/banks-drawing-menus.amos.txt', import.meta.url), 'utf8');
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amos);
  for (const theme of ['dark-plus', 'light-plus']) {
    const lines = tokens(source, theme);
    assert.equal(lines.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    for (const [word, scope] of [['Bank Shrink', 'keyword.control.amos'], ['Point', 'support.function.amos'], ['On Menu Proc', 'keyword.control.amos']]) {
      const index = source.split('\n').findIndex((line) => line.includes(word));
      assert.ok(index >= 0);
      const start = source.split('\n')[index].indexOf(word);
      assertScope(lines[index], start, start + word.length, scope, word);
    }
    const html = await api.codeToHighlightHtml(source, { lang: 'amos', theme });
    assert.ok(html.html.includes('Shapes'));
    assert.ok(html.html.includes('Reserve As Chip Work'));
    assert.ok(html.css.includes('::highlight('));
    assert.ok(html.stats.tokens > 100);
  }
});

test.after(() => highlighter.dispose());
