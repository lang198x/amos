import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/09-03.json', import.meta.url), 'utf8'));
const entries = chapter.entries.slice(5);
assert.equal(entries.length, 9);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} zone/value forms retain roles, typed boundaries and assignment contexts`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'support.function.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) check(change(entry.example), change(entry.spelling), scope, lang, theme);
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_').replace(/[$#]$/, '') + suffix;
          if (entries.some((item) => item.spelling.toLowerCase() === word.toLowerCase())) continue;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
        if (!entry.spelling.includes(' ')) check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
      }
      for (const word of ['Vdialog', 'Vdialog$']) {
        check(`${word}(1,0)=MC_VALUE`, word, 'support.function.amos', lang, theme);
        check(`MC_VALUE=${word}(1,0)`, word, 'support.function.amos', lang, theme);
      }
      for (const word of ['Rdialog', 'Rdialog$']) check(`MC_VALUE=${word}(1,2,0)`, word, 'support.function.amos', lang, theme);
      for (const word of ['Vdialog', 'Array']) check('Vdialog(1,0)=Array(MC_ITEMS$(0))', word, 'support.function.amos', lang, theme);
      for (const word of ['Dialog Freeze', 'Dialog Unfreeze']) for (const suffix of ['', ' 1']) check(word + suffix, word, 'keyword.control.amos', lang, theme);
      for (const word of ['Dialog FreezeExtra', 'Dialog Update#']) check(word, word.split(' ')[1], 'variable.other.amos', lang, theme);
      for (const source of ['Dialog Update 1,2', 'Dialog Update 1,2,MC_VALUE,MC_FIRST,MC_LAST']) check(source, 'Dialog Update', 'keyword.control.amos', lang, theme);
      for (const word of ['ArrayRead', 'AR', 'VA']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      check('MC_BUTTON=Dialog(1)', 'Dialog', 'support.function.amos', lang, theme);
      check('Trap Dialog Clr 1', 'Dialog Clr', 'keyword.control.amos', lang, theme);
    }
  });

  test(`${lang} embedded Interface stays opaque with line recovery`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      const payload = "AR 0,0 VA;ED 1,0,0,10,20,'Ready',0,2;EXit;";
      check(`MC_UI$="${payload}"`, payload, 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Vdialog$\nDialog Freeze', lang, theme);
      assertScope(result[1], 0, 13, 'keyword.control.amos');
    }
  });
}

test('fresh zone/value notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/dialog-values.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[4], 0, 8, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Dialog Update'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
