import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/14-C.json', import.meta.url), 'utf8'));
assert.equal(chapter.entries.length, 2);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} PAL/NTSC queries retain function scopes and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        for (const change of [(s) => s, (s) => s.toLowerCase(), (s) => s.toUpperCase(), (s) => s.replaceAll(' ', '\t')]) check(change(entry.example), change(entry.spelling), 'support.function.amos', lang, theme);
        check(`${entry.spelling}: Print 1`, entry.spelling, 'support.function.amos', lang, theme);
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const name = entry.spelling.replaceAll(' ', '_') + suffix;
          check(`${name}=1`, name, 'variable.other.amos', lang, theme);
          const source = entry.spelling + suffix;
          check(source, source.split(' ').at(-1), 'variable.other.amos', lang, theme);
        }
      }
      for (const word of ['Pal', 'Secam', 'Display', 'Height', 'XNtsc']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      check('XDisplay Height', 'XDisplay', 'variable.other.amos', lang, theme);
      for (const source of ['Print Ntsc', 'If Ntsc : Print "Mode" : End If', 'MC_MODE=(Ntsc=0)']) check(source, 'Ntsc', 'support.function.amos', lang, theme);
      for (const source of ['MC_HEIGHT=Max(0,Display Height-56)', 'Screen Open 0,320,Display Height-56,16,Lowres']) check(source, 'Display Height', 'support.function.amos', lang, theme);
      check('Screen Open 0,320,Display Height-56,16,Lowres', 'Screen Open', 'keyword.control.amos', lang, theme);
      check('Screen Open 0,320,Display Height-56,16,Lowres', 'Lowres', 'support.function.amos', lang, theme);
      check('Screen Display 0,,MC_POSITION,,', 'Screen Display', 'keyword.control.amos', lang, theme);
      check('Global MC_HEIGHT,MC_POSITION', 'Global', 'keyword.control.amos', lang, theme);
      for (const [source, words] of [['For MC_TICK=0 To MC_LIMIT', ['For', 'To']], ['Wait Vbl : Next MC_TICK', ['Wait Vbl', 'Next']]]) {
        for (const word of words) check(source, word, 'keyword.control.amos', lang, theme);
      }
    }
  });

  test(`${lang} mode labels in strings/comments remain opaque and recover`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      check('Print "PAL NTSC SECAM Display Height"', 'PAL NTSC SECAM Display Height', 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Display Height\nPrint Ntsc', lang, theme);
      assertScope(result[1], 6, 10, 'support.function.amos');
    }
  });
}

test('fresh display-mode notebook preserves source through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/pal-ntsc.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[1], 10, 24, 'support.function.amos');
      assertScope(result[3], 3, 7, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Display Height'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
