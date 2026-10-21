import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/14-A.json', import.meta.url), 'utf8'));
const entries = chapter.entries.slice(8);
assert.equal(entries.length, 4);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} block/address forms preserve roles, ranges and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'support.function.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase()]) check(change(entry.example), change(entry.spelling), scope, lang, theme);
        check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
        for (const suffix of ['Extra', '_VALUE', '$', '#']) check(`${entry.spelling}${suffix}=1`, entry.spelling + suffix, 'variable.other.amos', lang, theme);
        if (entry.example.includes(' To ')) {
          check(entry.example, 'To', 'keyword.control.amos', lang, theme);
          check(entry.example.replaceAll(' To ', '\tTo\t'), 'To', 'keyword.control.amos', lang, theme);
        }
      }
      check('MC_BYTE=Peek(Varptr(MC_VALUE))', 'Varptr', 'support.function.amos', lang, theme);
      check('MC_MATCH=Max(0,Hunt(MC_START To MC_FINISH,"Ready"))', 'Hunt', 'support.function.amos', lang, theme);
      for (const value of ['MC_INTEGER', 'MC_REAL#', 'MC_TEXT$', 'MC_ITEMS(0)']) check(`MC_ADDRESS=Varptr(${value})`, 'Varptr', 'support.function.amos', lang, theme);
      for (const word of ['Trap', 'Copy']) check('Trap Copy MC_START,MC_FINISH To MC_DESTINATION', word, 'keyword.control.amos', lang, theme);
      check('Instr$', 'Instr$', 'variable.other.amos', lang, theme);
      check('MC_INDEX=Instr(MC_TEXT$,"Ready")', 'Instr', 'support.function.amos', lang, theme);
      check('Poke MC_ADDRESS,MC_BYTE', 'Poke', 'keyword.control.amos', lang, theme);
      check('MC_CODE=Errtrap', 'Errtrap', 'support.function.amos', lang, theme);
    }
  });

  test(`${lang} memory-block payloads remain opaque with line recovery`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      check('MC_MATCH=Hunt(MC_START To MC_FINISH,"Fill To Copy; Varptr")', 'Fill To Copy; Varptr', 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Copy To\nFill MC_START To MC_FINISH,MC_PATTERN', lang, theme);
      assertScope(result[1], 0, 4, 'keyword.control.amos');
    }
  });
}

test('fresh block/address notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/memory-blocks.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[1], 11, 17, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Varptr'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
