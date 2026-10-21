import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/11-05.json', import.meta.url), 'utf8'));
const entries = chapter.entries.filter((entry) => entry.spelling.startsWith('Request '));
assert.equal(entries.length, 3);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} requester phrases keep component provenance and complete boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        assert.equal(entry.component, 'Requester Extension (as labelled by the manual)');
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), 'keyword.control.amos', lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const phrase = entry.spelling + suffix;
          check(phrase, 'Request', 'variable.other.amos', lang, theme);
          const word = entry.spelling.replaceAll(' ', '_') + suffix;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
      }
      for (const source of ['Request', 'Request=1', 'Request W', 'Request Extra', 'Request_Wb=1']) check(source, source.startsWith('Request_') ? 'Request_Wb' : 'Request', 'variable.other.amos', lang, theme);
      check('Wb=1', 'Wb', 'variable.other.amos', lang, theme);
      check('On', 'On', 'keyword.control.amos', lang, theme);
      check('Trap Request On', 'Trap', 'keyword.control.amos', lang, theme);
      check('Trap Request On', 'Request On', 'keyword.control.amos', lang, theme);
      check('Request Off: Dev Close 1', 'Dev Close', 'keyword.control.amos', lang, theme);
      check('MC_BASE=Lib Base(1)', 'Lib Base', 'support.function.amos', lang, theme);
      check('MC_CODE=Errtrap', 'Errtrap', 'support.function.amos', lang, theme);
      check('MC_FRONT=Amos Here', 'Amos Here', 'support.function.amos', lang, theme);
    }
  });

  test(`${lang} requester-looking payloads stay opaque and recover on new lines`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      check('Exec "Request Off: Request On"', 'Request Off: Request On', 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Request Off\nRequest On', lang, theme);
      assertScope(result[1], 0, 10, 'keyword.control.amos');
    }
  });
}

test('fresh requester notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/requesters.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[1], 0, 10, 'keyword.control.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Request Wb'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
