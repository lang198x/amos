import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/14-A.json', import.meta.url), 'utf8'));
assert.equal(chapter.entries.length, 8);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} memory read/write roles retain dollar and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'support.function.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase()]) check(change(entry.example), change(entry.spelling), scope, lang, theme);
        check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replace(/[$#]$/, '') + suffix;
          if (chapter.entries.some((item) => item.spelling.toLowerCase() === word.toLowerCase())) continue;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
      }
      for (const word of ['Peeks', 'Pokes', 'Peek$Extra', 'Poke$Extra', 'Peek#', 'Poke#', 'Varptr', 'Hunt']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      check('MC_VALUE=Max(Peek(MC_ADDRESS),Deek(MC_ADDRESS))', 'Peek', 'support.function.amos', lang, theme);
      check('MC_VALUE=Max(Peek(MC_ADDRESS),Deek(MC_ADDRESS))', 'Deek', 'support.function.amos', lang, theme);
      check('MC_TEXT$=Left$(Peek$(MC_ADDRESS,8,";"),4)', 'Peek$', 'support.function.amos', lang, theme);
      for (const word of ['Trap', 'Poke$']) check('Trap Poke$ MC_ADDRESS,MC_TEXT$', word, 'keyword.control.amos', lang, theme);
      check('Poke MC_ADDRESS,Peek(MC_SOURCE)', 'Peek', 'support.function.amos', lang, theme);
      check('MC_CODE=Errtrap', 'Errtrap', 'support.function.amos', lang, theme);
      check('MC_TEXT$=Resource$(1)', 'Resource$', 'support.function.amos', lang, theme);
    }
  });

  test(`${lang} memory-looking strings/comments stay opaque with line recovery`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      check('Poke$ MC_ADDRESS,"Deek: Leek; Peeks"', 'Deek: Leek; Peeks', 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Peek$\nLoke MC_ADDRESS,MC_VALUE', lang, theme);
      assertScope(result[1], 0, 4, 'keyword.control.amos');
    }
  });
}

test('fresh memory notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/memory.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[6], 0, 5, 'keyword.control.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Poke$'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
