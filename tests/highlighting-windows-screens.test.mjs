import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import { entries } from './helpers/manual-core.mjs';
import { highlighter, tokens, assertScope } from './helpers/highlighter.mjs';

const check = (source, word, scope, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(tokens(source, theme)[0], start, start + word.length, scope, source);
};

test('Screen retains both documented roles with a neutral lexical scope', () => {
  const roles = entries.filter((entry) => entry.spelling === 'Screen');
  assert.deepEqual(roles.map((entry) => entry.kind), ['command', 'function']);
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['Screen 1', 'MC_CURRENT=Screen', 'Screen:']) {
      check(source, 'Screen', 'keyword.other.amos', theme);
    }
    for (const word of ['Screen Open', 'Screen To Front', 'Screen Swap', 'Default Palette', 'Rainbow Del', 'Hide On']) {
      check(word, word, 'keyword.control.amos', theme);
    }
    for (const word of ['Screen Width', 'Screen Height', 'Screen Mode', 'Screen Colour']) {
      check(`MC_RESULT=${word}`, word, 'support.function.amos', theme);
    }
  }
});

test('mouse coordinates remain reserved in reads and assignments; Read Text$ is a command', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const word of ['X Mouse', 'Y Mouse']) {
      for (const source of [`MC_VALUE=${word}`, `${word}=80`]) check(source, word, 'variable.language.amos', theme);
    }
    check('Read Text$ "hello"', 'Read Text$', 'keyword.control.amos', theme);
    check('MC_MODE=Lowres+Laced', 'Laced', 'variable.language.amos', theme);
    check('Rain(1,0)=$FFF', 'Rain', 'support.function.amos', theme);
  }
});

test('partial phrases retain only independently documented words', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const [source, word, scope] of [
      ['Screen Swapper', 'Screen', 'keyword.other.amos'],
      ['Screen Swapper', 'Swapper', 'variable.other.amos'],
      ['Screen WidthExtra', 'WidthExtra', 'variable.other.amos'],
      ['Flash Officer', 'Flash', 'keyword.control.amos'],
      ['Flash Officer', 'Officer', 'variable.other.amos'],
      ['Mouse Clicked', 'Mouse', 'variable.other.amos'],
      ['Mouse Clicked', 'Clicked', 'variable.other.amos'],
      ['X MouseExtra', 'MouseExtra', 'variable.other.amos'],
      ['Wind Opened', 'Opened', 'variable.other.amos'],
    ]) check(source, word, scope, theme);
  }
});

test('filenames and effect payloads remain opaque strings', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['Load Iff "Screen Width.iff",1', 'Flash 1,"($FFF,5)($000,5)"', 'Set Rainbow 1,1,100,"(1,1,1)"']) {
      const start = source.indexOf('"') + 1;
      const end = source.indexOf('"', start);
      assertScope(tokens(source, theme)[0], start, end, 'string.quoted.double.amos', source);
    }
  }
});

test('fresh windows/screens listing preserves source through both consumers and themes', async () => {
  const source = await readFile(new URL('../specifications/manual-core/examples/windows-screens.amos.txt', import.meta.url), 'utf8');
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amos);
  for (const theme of ['dark-plus', 'light-plus']) {
    assert.equal(tokens(source, theme).map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    const html = await api.codeToHighlightHtml(source, { lang: 'amos', theme });
    assert.ok(html.html.includes('WINDOW AND SCREEN'));
    assert.ok(html.html.includes('Screen Width'));
    assert.ok(html.css.includes('::highlight('));
    assert.ok(html.stats.tokens > 100);
  }
});

test.after(() => highlighter.dispose());
