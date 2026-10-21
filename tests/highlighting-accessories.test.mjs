import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/13-01.json', import.meta.url), 'utf8'));
assert.equal(chapter.entries.length, 5);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} accessory statements retain whole phrases and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), 'keyword.control.amos', lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_') + suffix;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
          const source = entry.spelling + suffix;
          check(source, source.split(' ').at(-1), 'variable.other.amos', lang, theme);
        }
      }
      for (const word of ['Accessory', 'Editor', 'Workbench', 'Call', 'Ask']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      check('Set Editor', 'Editor', 'variable.other.amos', lang, theme);
      check('Kill Editor', 'Editor', 'variable.other.amos', lang, theme);
      for (const word of ['Call Editor', 'Ask Editor']) {
        for (const args of ['MC_FUNCTION', 'MC_FUNCTION,MC_VALUE,MC_TEXT$']) check(`${word} ${args}`, word, 'keyword.control.amos', lang, theme);
      }
      for (const word of ['Close Editor', 'Close Workbench']) check(`Print 1: ${word}: Print 2`, word, 'keyword.control.amos', lang, theme);
      check('Close #1', 'Close', 'keyword.control.amos', lang, theme);
      check('Trap Call Editor MC_FUNCTION', 'Trap', 'keyword.control.amos', lang, theme);
      check('Trap Call Editor MC_FUNCTION', 'Call Editor', 'keyword.control.amos', lang, theme);
      check('Set Buffer 8', 'Set Buffer', 'keyword.control.amos', lang, theme);
      check('MC_PARENT=Prg Under', 'Prg Under', 'support.function.amos', lang, theme);
      check('Request On', 'Request On', 'keyword.control.amos', lang, theme);
    }
  });

  test(`${lang} editor payloads stay opaque with line recovery`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      check('Call Editor MC_FUNCTION,MC_VALUE,"Ask Editor: Close Workbench"', 'Ask Editor: Close Workbench', 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Close Editor\nAsk Editor MC_FUNCTION', lang, theme);
      assertScope(result[1], 0, 10, 'keyword.control.amos');
    }
  });
}

test('fresh accessory notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/accessories.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[4], 0, 10, 'keyword.control.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Ask Editor'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
