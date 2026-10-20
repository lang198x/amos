import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/08-02.json', import.meta.url), 'utf8'));
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} sample forms retain phrases, functions and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        const scope = entry.kind === 'function' ? 'support.function.amos' : 'keyword.control.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), scope, lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_') + suffix;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
        if (!entry.spelling.includes(' ')) check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
      }
      for (const word of ['Samraw', 'Samplay', 'Sam', 'Sload$', 'Ssave#']) {
        check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      }
      for (const source of ['Sam SwapExtra', 'Sam SwappedExtra', 'Sam BankExtra', 'Sam Loop Office']) {
        check(source, 'Sam', 'variable.other.amos', lang, theme);
      }
      for (const source of ['Sam Play 2', 'Sam Play %0011,2', 'Sam Play %0001,2,8000']) {
        check(source, 'Sam Play', 'keyword.control.amos', lang, theme);
      }
      for (const source of ['Sam Stop', 'Sam Stop %0001']) check(source, 'Sam Stop', 'keyword.control.amos', lang, theme);
      check('MC_STATUS=Sam Swapped(0)+Sam Swapped(3)', 'Sam Swapped', 'support.function.amos', lang, theme);
      check('Sam Raw %0001,Start(10),Length(10),8000', 'Start', 'support.function.amos', lang, theme);
      check('Sam Swap %0001 To Start(11),4096', 'To', 'keyword.control.amos', lang, theme);
      check('Ssave 2,Start(10) To Start(10)+4096', 'To', 'keyword.control.amos', lang, theme);
      check('Sample 2 To %0001', 'Sample', 'keyword.control.amos', lang, theme);
      check('Swap MC_CURRENT,MC_NEXT', 'Swap', 'keyword.control.amos', lang, theme);
    }
  });

  test(`${lang} sample-looking payloads stay opaque and contexts end on new lines`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.example}"`, entry.example, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      const result = render('Print "Sam Swap\nSam Stop\nRem Ssave\nMC_STATUS=Sam Swapped(0)', lang, theme);
      assertScope(result[1], 0, 8, 'keyword.control.amos');
      assertScope(result[3], 10, 21, 'support.function.amos');
    }
  });
}

test('fresh mixed sample listing preserves source and renders in both existing consumer modes', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/samples.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[8], 0, 8, 'keyword.control.amos');
      assertScope(result[9], 10, 21, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Sam Swap'));
      assert.ok(html.html.includes('Sam Swapped'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 100);
    }
  }
});

test.after(() => highlighter.dispose());
