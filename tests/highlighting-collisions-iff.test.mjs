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

test('collision functions win over bare object commands and retain range connectives', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const word of ['Bob Col', 'Sprite Col', 'Spritebob Col', 'Bobsprite Col']) {
      const source = `MC_HIT=${word}(1,2 To 4)`;
      check(source, word, 'support.function.amos', theme);
      check(source, 'To', 'keyword.control.amos', theme);
    }
    for (const source of ['MC_ID=Col(-1)', 'If Col(2) Then End', 'MC_HIT=Hardcol']) {
      check(source, source.includes('Hardcol') ? 'Hardcol' : 'Col', 'support.function.amos', theme);
    }
    check('Set Hardcol %1111,%111111', 'Set Hardcol', 'keyword.control.amos', theme);
  }
});

test('screen and hardware zone queries coexist with typed Zone$ and zone commands', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const [source, words] of [
      ['MC_ZONE=Zone(X Bob(1),Y Bob(1))', ['Zone', 'X Bob', 'Y Bob']],
      ['MC_ZONE=Hzone(X Sprite(8),Y Sprite(8))', ['Hzone', 'X Sprite', 'Y Sprite']],
      ['MC_ZONE=Mouse Zone', ['Mouse Zone']], ['Print Zone$(1)', ['Zone$']],
    ]) for (const word of words) check(source, word, 'support.function.amos', theme);
    for (const word of ['Reserve Zone', 'Set Zone', 'Reset Zone', 'Make Mask']) {
      check(word, word, 'keyword.control.amos', theme);
    }
  }
});

test('frame operations are functions and IFF masking separates command from query', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const [word, args] of [['Frame Load', '(1 To 10,20)'], ['Frame Length', '(1,20)'],
      ['Frame Play', '(10,1,0)'], ['Frame Skip', '(10,1)'], ['Frame Param', '']]) {
      check(`MC_RESULT=${word}${args}`, word, 'support.function.amos', theme);
    }
    check('MC_DELAY=Frame Param', 'Frame Param', 'support.function.amos', theme);
    check('Mask Iff Picture', 'Mask Iff', 'keyword.control.amos', theme);
    check('Mask Iff Picture', 'Picture', 'support.function.amos', theme);
    check('Mask Iff %10000', '%10000', 'constant.numeric.binary.amos', theme);
    for (const word of ['Iff Anim', 'Load Iff', 'Save Iff', 'Freeze', 'Unfreeze']) {
      check(word, word, 'keyword.control.amos', theme);
    }
  }
});

test('partial phrases, transcription mistakes and literal payloads do not become new builtins', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const [source, word] of [['Frame Parameter', 'Parameter'], ['Iff Animation', 'Animation'],
      ['Make Masks', 'Masks'], ['Bob ColExtra', 'ColExtra'], ['Form Param', 'Form'], ['Bobsprite 001', 'Bobsprite'],
      ['Col#=1', 'Col#'], ['Zone#=1', 'Zone#'], ['Picture$=""', 'Picture$'], ['FreezeExtra=1', 'FreezeExtra']]) {
      check(source, word, 'variable.other.amos', theme);
    }
    for (const source of ['Iff Anim "Frame Play.anim" To 0', 'Load Iff "Bob Col.iff"', 'Print "Anim 0,(1,2)(2,2)"']) {
      assertScope(tokens(source, theme)[0], source.indexOf('"') + 1, source.lastIndexOf('"'), 'string.quoted.double.amos', source);
    }
  }
});

test('fresh collision/IFF listing preserves source through both consumers and themes', async () => {
  const source = await readFile(new URL('../specifications/manual-core/examples/collisions-iff.amos.txt', import.meta.url), 'utf8');
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amos);
  for (const theme of ['dark-plus', 'light-plus']) {
    assert.equal(tokens(source, theme).map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    const html = await api.codeToHighlightHtml(source, { lang: 'amos', theme });
    assert.ok(html.html.includes('Spritebob Col'));
    assert.ok(html.html.includes('Frame Length'));
    assert.ok(html.css.includes('::highlight('));
    assert.ok(html.stats.tokens > 100);
  }
});

test.after(() => highlighter.dispose());
