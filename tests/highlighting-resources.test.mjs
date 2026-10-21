import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/09-04.json', import.meta.url), 'utf8'));
assert.equal(chapter.entries.length, 4);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} BASIC resource forms keep complete phrases and typed boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'support.function.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) check(change(entry.example), change(entry.spelling), scope, lang, theme);
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_').replace(/[$#]$/, '') + suffix;
          if (word.toLowerCase() === entry.spelling.toLowerCase()) continue;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
      }
      for (const word of ['Resource', 'Resources', 'Resource$Extra', 'Resource#', 'ME', 'PUsh', 'VLine']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      for (const source of ['Resource BankExtra', 'Resource Screen OpenExtra', 'Resource Unpack#']) check(source, 'Resource', 'variable.other.amos', lang, theme);
      check('MC_TEXT$=Left$(Resource$(1),12)', 'Resource$', 'support.function.amos', lang, theme);
      for (const word of ['Trap', 'Resource Bank']) check('Trap Resource Bank 0', word, 'keyword.control.amos', lang, theme);
      check('Unpack 10', 'Unpack', 'keyword.control.amos', lang, theme);
      check('Screen Open 0,320,200,16,Lowres', 'Screen Open', 'keyword.control.amos', lang, theme);
      check('MC_BUTTON=Dialog Box(MC_UI$)', 'Dialog Box', 'support.function.amos', lang, theme);
    }
  });

  test(`${lang} resource payloads and embedded Interface remain opaque`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      for (const payload of ['PR 0,0,7 ME,2;UN 8,8,1;EXit;', 'PU 1;LI 0,0,1,24;VL 0,0,1,16;BO 0,0,1,24,16;', 'Resource.Abk']) check(`MC_UI$="${payload}"`, payload, 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Resource$\nResource Unpack 1,16,16', lang, theme);
      assertScope(result[1], 0, 15, 'keyword.control.amos');
    }
  });
}

test('fresh resource notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/resources.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[2], 12, 21, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Resource Unpack'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
