import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope, scopes } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/14-A.json', import.meta.url), 'utf8'));
const entries = chapter.entries.slice(12, 24);
assert.equal(entries.length, 12);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} conversion and sized bit forms retain complete scopes and boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'support.function.amos';
        for (const change of [(s) => s, (s) => s.toLowerCase(), (s) => s.toUpperCase()]) check(change(entry.example), change(entry.spelling), scope, lang, theme);
        check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
        const stem = entry.spelling.replace('.', '_').replace(/\$$/, '');
        for (const suffix of ['Extra', '_VALUE', '#']) check(`${stem}${suffix}=1`, stem + suffix, 'variable.other.amos', lang, theme);
      }
      for (const word of ['Bin', 'Hex', 'Rol', 'Ror', 'Btst$', 'Bset$', 'Bchg$', 'Bclr$']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      for (const word of ['Rol.BExtra', 'Ror.W_VALUE', 'Rol.L$', 'Ror.B#', 'Rol.X', 'Rol.B.More', 'X.Rol.B']) {
        const result = render(`${word} 1,BIT_VALUE`, lang, theme)[0];
        assert.ok(result.every((token) => !scopes(token).includes('keyword.control.amos')), `${word} must not acquire a rotate command scope`);
      }
      for (const source of ['Print Bin$(BIT_VALUE)', 'Print Bin$(BIT_VALUE,8)', 'Print Hex$(BIT_VALUE)', 'Print Hex$(BIT_VALUE,2)']) {
        check(source, source.includes('Bin$') ? 'Bin$' : 'Hex$', 'support.function.amos', lang, theme);
      }
      check('Print Hex$(Btst(3,BIT_VALUE))', 'Btst', 'support.function.amos', lang, theme);
      check('BIT_VALUE=%1010 : Print $0A', '%1010', 'constant.numeric.binary.amos', lang, theme);
      check('BIT_VALUE=%1010 : Print $0A', '$0A', 'constant.numeric.hex.amos', lang, theme);
    }
  });

  test(`${lang} bit/conversion strings and comments stay opaque and recover`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      const result = render('Print "Rol.B Bin$\nBset 1,BIT_VALUE', lang, theme);
      assertScope(result[1], 0, 4, 'keyword.control.amos');
    }
  });
}

test('fresh bit notebook preserves source through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/bits.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[2], 0, 5, 'keyword.control.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Rol.B'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
