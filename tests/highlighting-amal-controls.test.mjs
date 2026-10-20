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

test('BASIC AMAL control phrases remain complete and case insensitive', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const word of ['Amal On', 'Amal Off', 'Amal Freeze', 'Anim On', 'Anim Off', 'Anim Freeze',
      'Move X', 'Move Y', 'Move On', 'Move Off', 'Move Freeze', 'Synchro On', 'Synchro Off', 'Update Every']) {
      for (const form of [word, word.toLowerCase(), word.toUpperCase(), word.replaceAll(' ', '\t')]) {
        check(form, form, 'keyword.control.amos', theme);
      }
    }
    check('Channel 2 To Screen Size 0', 'To Screen Size', 'keyword.control.amos', theme);
    check('Channel\t2\tTo\tScreen\tSize\t0', 'To\tScreen\tSize', 'keyword.control.amos', theme);
    check('Screen Size', 'Screen', 'keyword.other.amos', theme);
    check('Screen Size', 'Size', 'variable.other.amos', theme);
  }
});

test('Amreg assignments and reads retain their reserved-variable role', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['Amreg(1,0)=20', 'MC_VALUE=Amreg(1,0)', 'Amreg(0)=10']) {
      check(source, 'Amreg', 'variable.language.amos', theme);
    }
    for (const word of ['Chanan', 'Chanmv', 'Movon', 'Amalerr']) {
      check(`MC_RESULT=${word}`, word, 'support.function.amos', theme);
    }
    for (const word of ['Amreg$', 'Amal_VALUE', 'AnimExtra', 'Move_X', 'Chanmv#']) {
      check(`${word}=1`, word, 'variable.other.amos', theme);
    }
    check('Amal Officer', 'Officer', 'variable.other.amos', theme);
    check('Move Yesterday', 'Yesterday', 'variable.other.amos', theme);
  }
});

test('all embedded AMAL examples stay strings, including significant-capital variants', async () => {
  for (const file of ['commands', 'functions', 'registers']) {
    const data = JSON.parse(await readFile(new URL(`../specifications/amal/${file}.json`, import.meta.url), 'utf8'));
    for (const entry of data.entries) {
      for (const theme of ['dark-plus', 'light-plus']) {
        const source = `Amal 1,"${entry.example}"`;
        assertScope(tokens(source, theme)[0], 8, 8 + entry.example.length, 'string.quoted.double.amos', entry.spelling);
      }
    }
  }
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['Amal 1,"If X>10 Jump Target"', 'Amal 1,"IF X>10 Jump Target"', 'Anim 1,"(1,4)(2,4)L"']) {
      assertScope(tokens(source, theme)[0], source.indexOf('"') + 1, source.lastIndexOf('"'), 'string.quoted.double.amos', source);
    }
  }
});

test('embedded-only vocabulary and unqualified AMOS 3D forms do not become BASIC builtins', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const word of ['BC', 'SC', 'XM', 'YM', 'RA', 'RZ', 'AUtotest', 'Jump', 'Let', 'PL']) {
      check(word, word, 'variable.other.amos', theme);
    }
    check('Td Object 1', 'Td', 'variable.other.amos', theme);
    check('Td Object 1', 'Object', 'variable.other.amos', theme);
  }
});

test('fresh AMAL-control listing preserves source through both consumers and themes', async () => {
  const source = await readFile(new URL('../specifications/manual-core/examples/amal-controls.amos.txt', import.meta.url), 'utf8');
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amos);
  for (const theme of ['dark-plus', 'light-plus']) {
    assert.equal(tokens(source, theme).map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    const html = await api.codeToHighlightHtml(source, { lang: 'amos', theme });
    assert.ok(html.html.includes('Amal Freeze'));
    assert.ok(html.html.includes('Update Every'));
    assert.ok(html.css.includes('::highlight('));
    assert.ok(html.stats.tokens > 100);
  }
});

test.after(() => highlighter.dispose());
