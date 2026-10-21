import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapters = await Promise.all(['09-01', '09-03'].map(async (id) => JSON.parse(await readFile(new URL(`../specifications/manual-core/${id}.json`, import.meta.url), 'utf8'))));
const entries = chapters.flatMap((chapter) => chapter.entries);
assert.equal(entries.length, 6);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} BASIC dialogue roles retain longest phrases and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'support.function.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), scope, lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_') + suffix;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
        if (!entry.spelling.includes(' ')) check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
      }
      for (const source of ['Dialog BoxExtra', 'Dialog Run#', 'Dialog OpenExtra', 'Dialog Close$']) check(source, source.split(' ')[1], 'variable.other.amos', lang, theme);
      for (const source of ['Dialog Close', 'Dialog Close 1']) check(source, 'Dialog Close', 'keyword.control.amos', lang, theme);
      for (const source of ['MC_BUTTON=Dialog Box(MC_UI$,42,MC_TEXT$,10,20)', 'MC_BUTTON=Dialog Run(1,,10,20)']) check(source, source.includes('Box') ? 'Dialog Box' : 'Dialog Run', 'support.function.amos', lang, theme);
      check('MC_BUTTON=Max(0,Dialog(1))', 'Dialog', 'support.function.amos', lang, theme);
      for (const word of ['Trap', 'Dialog Open']) check('Trap Dialog Open 1,MC_UI$,17,1024', word, 'keyword.control.amos', lang, theme);
      check('MC_POSITION=Edialog', 'Edialog', 'support.function.amos', lang, theme);
      for (const word of ['VA', 'BA', 'RunUntil', 'SetVar', 'Rdialog', 'Vdialog']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      check('Request On', 'Request On', 'keyword.control.amos', lang, theme);
      check('MC_CODE=Errtrap', 'Errtrap', 'support.function.amos', lang, theme);
    }
  });

  test(`${lang} Interface programs stay opaque BASIC strings with line recovery`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      for (const payload of ["BA 10,10;PR 4,4,'Ready',2;EXit;", 'VA;LA 1;JU 1;RunUntil;Dialog Open']) check(`Dialog Open 1,"${payload}"`, payload, 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Dialog Open\nMC_POSITION=Edialog', lang, theme);
      assertScope(result[1], 12, 19, 'support.function.amos');
    }
  });
}

test('fresh dialogue notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/dialog.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[4], 10, 20, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Dialog Run'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
