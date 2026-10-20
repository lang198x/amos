import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/12-02.json', import.meta.url), 'utf8'));
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} error-handling forms retain phrases, functions and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        const scope = entry.kind === 'function' ? 'support.function.amos' : 'keyword.control.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), scope, lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_').replace(/[$#]$/, '') + suffix;
          if (chapter.entries.some((entry) => entry.spelling.toLowerCase() === word.toLowerCase())) continue;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
        if (!entry.spelling.includes(' ')) check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
      }
      for (const word of ['On Error Goto', 'On Error Proc', 'Resume Next', 'Resume Label']) check(word, word, 'keyword.control.amos', lang, theme);
      for (const word of ['Trap', 'Load']) check('Trap Load MC_PATH$,10', word, 'keyword.control.amos', lang, theme);
      check('Trap Locate -1,-1 : Locate 0,0', 'Locate', 'keyword.control.amos', lang, theme);
      check('On Error Goto MC_RECOVER', 'MC_RECOVER', 'variable.other.amos', lang, theme);
      check('On Error Proc MC_HANDLER', 'MC_HANDLER', 'variable.other.amos', lang, theme);
      check('Resume MC_RETRY', 'MC_RETRY', 'variable.other.amos', lang, theme);
      check('Print Err$(Errn)', 'Errn', 'support.function.amos', lang, theme);
      for (const word of ['GotoExtra', 'ProcExtra']) check('On Error ' + word, word, 'variable.other.amos', lang, theme);
      for (const word of ['LabelExtra', 'NextExtra']) check('Resume ' + word, word, 'variable.other.amos', lang, theme);
      for (const word of ['Err#', 'ErrorExtra', 'Errtrap_VALUE']) check(word + '=1', word, 'variable.other.amos', lang, theme);
    }
  });

  test(`${lang} error-handling-looking payloads stay opaque and contexts end on new lines`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }

    }
  });
}

test('fresh mixed error-handling listing preserves source and renders in both existing consumer modes', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/error-handling.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      const lines = source.split('\n');
      const line = lines.findIndex((text) => text.includes('On Error Goto'));
      assert.ok(line >= 0);
      const start = lines[line].indexOf('On Error Goto');
      assertScope(result[line], start, start + 13, 'keyword.control.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('On Error Goto'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
