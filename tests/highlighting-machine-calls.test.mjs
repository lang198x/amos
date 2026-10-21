import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/14-A.json', import.meta.url), 'utf8'));
const entries = chapter.entries.slice(24);
assert.equal(entries.length, 4);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} machine calls and registers preserve roles and longer forms`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'variable.language.amos';
        for (const change of [(s) => s, (s) => s.toLowerCase(), (s) => s.toUpperCase()]) check(change(entry.example), change(entry.spelling), scope, lang, theme);
        check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const name = entry.spelling + suffix;
          check(`${name}=1`, name, 'variable.other.amos', lang, theme);
          check(`X${name}=1`, `X${name}`, 'variable.other.amos', lang, theme);
        }
      }
      for (const word of ['Areg', 'Dreg']) {
        for (const source of [`MC_RESULT=${word}(0)`, `${word}(0)=MC_VALUE`, `Print ${word}(0)`, `Call MC_BANK,${word}(0)`]) check(source, word, 'variable.language.amos', lang, theme);
      }
      for (const source of ['Call MC_BANK', 'Call MC_ADDRESS,MC_INTEGER,MC_REAL#,MC_TEXT$', 'Call Start(MC_BANK)', 'Trap Call MC_BANK']) check(source, 'Call', 'keyword.control.amos', lang, theme);
      for (const source of ['Pload "routine.bin",MC_BANK', 'Pload "routine.bin",-MC_BANK']) check(source, 'Pload', 'keyword.control.amos', lang, theme);
      for (const word of ['Call Editor', 'Call\tEditor', 'CALL EDITOR']) check(`${word},MC_VALUE`, word, 'keyword.control.amos', lang, theme);
      check('DO', 'DO', 'keyword.control.amos', lang, theme);
      check('MC_RESULT=Lib Call(1,MC_OFFSET)', 'Lib Call', 'support.function.amos', lang, theme);
      check('MC_ADDRESS=Areg(0)+Varptr(MC_TEXT$)', 'Varptr', 'support.function.amos', lang, theme);
      for (const word of ['Insert', 'Inset', 'RTS', 'CODE', 'A3', 'D0']) check(word, word, 'variable.other.amos', lang, theme);
    }
  });

  test(`${lang} machine-call strings/comments stay opaque and recover`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      check('Pload "Call Areg Dreg",MC_BANK', 'Call Areg Dreg', 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Call Areg\nDreg(0)=MC_VALUE', lang, theme);
      assertScope(result[1], 0, 4, 'variable.language.amos');
    }
  });
}

test('fresh machine-call notebook preserves source through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/machine-calls.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[1], 0, 5, 'keyword.control.amos');
      assertScope(result[2], 0, 4, 'variable.language.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Pload'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
