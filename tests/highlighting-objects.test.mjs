import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import { highlighter, tokens, assertScope } from './helpers/highlighter.mjs';

const check = (source, word, scope, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(tokens(source, theme)[0], start, start + word.length, scope, source);
};

test('object commands and update variants retain their complete forms', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const prefix of ['Bob Update', 'Sprite Update', 'Update']) {
      for (const ending of ['', ' Off', ' On']) check(prefix + ending, prefix + ending, 'keyword.control.amos', theme);
    }
    for (const word of ['Bob', 'Sprite', 'Bob Clear', 'Bob Draw', 'Get Sprite Palette', 'Get Bob Palette',
      'Get Object Palette', 'Set Sprite Buffer', 'Priority Reverse On', 'Priority Reverse Off', 'Set Bob']) {
      check(word, word, 'keyword.control.amos', theme);
    }
    for (const word of ['Sprite Base', 'Screen Base', 'Icon Base']) {
      check(`MC_TABLE=${word}(1)`, word, 'support.function.amos', theme);
    }
  }
});

test('nested coordinate and image functions coexist with omitted object arguments', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const [source, words] of [
      ['MC_X=X Screen(X Sprite(8))', ['X Screen', 'X Sprite']],
      ['MC_Y=Y Screen(Y Sprite(8))', ['Y Screen', 'Y Sprite']],
      ['Bob 1,X Bob(1),Y Bob(1),Hrev(I Bob(1))', ['X Bob', 'Y Bob', 'Hrev', 'I Bob']],
      ['Sprite 8,X Hard(80),Y Hard(60),2', ['X Hard', 'Y Hard']],
      ['Paste Bob 80,60,Rev(Vrev(1))', ['Rev', 'Vrev']],
    ]) for (const word of words) check(source, word, 'support.function.amos', theme);
    for (const source of ['Bob 1,,,2', 'Sprite 8,,100,', 'Bob 1,80,,Hrev(1)']) {
      const word = source.split(' ')[0];
      check(source, word, 'keyword.control.amos', theme);
    }
    check('Set Bob 1,0,%1111,%11001010', '%11001010', 'constant.numeric.binary.amos', theme);
  }
});

test('partial update endings retain only independently documented commands', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const prefix of ['Bob Update', 'Sprite Update', 'Update']) {
      const source = `${prefix} Office`;
      check(source, prefix, 'keyword.control.amos', theme);
      check(source, 'Office', 'variable.other.amos', theme);
    }
    for (const word of ['SpriteExtra', 'Bob_VALUE', 'Hrev$', 'Update#', 'Get_Object_Palette', 'PaletteExtra']) {
      check(`${word}=1`, word, 'variable.other.amos', theme);
    }
    check('Get Object PaletteExtra', 'Object', 'variable.other.amos', theme);
  }
});

test('object command and AMAL-like literal contents remain opaque strings', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const payload of ['Bob Update Off; Sprite Base', 'Anim 0,($8001,2)($8002,2)', '(BO 1:PR MC_DRAW)']) {
      const source = `Print "${payload}"`;
      assertScope(tokens(source, theme)[0], 7, 7 + payload.length, 'string.quoted.double.amos', payload);
    }
  }
});

test('fresh object listing preserves source and critical scopes through both consumers', async () => {
  const source = await readFile(new URL('../specifications/manual-core/examples/objects-updating.amos.txt', import.meta.url), 'utf8');
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amos);
  for (const theme of ['dark-plus', 'light-plus']) {
    assert.equal(tokens(source, theme).map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    const html = await api.codeToHighlightHtml(source, { lang: 'amos', theme });
    assert.ok(html.html.includes('Get Object Palette'));
    assert.ok(html.html.includes('Sprite Update'));
    assert.ok(html.css.includes('::highlight('));
    assert.ok(html.stats.tokens > 100);
  }
});

test.after(() => highlighter.dispose());
