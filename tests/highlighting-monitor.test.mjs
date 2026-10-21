import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} Monitor and existing floating-point forms keep documented roles`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const word of ['Monitor', 'MONITOR', 'monitor']) {
        check(word, word, 'keyword.control.amos', lang, theme);
        check(`${word}:`, word, 'keyword.control.amos', lang, theme);
        check(`Print 1: ${word}: Print 2`, word, 'keyword.control.amos', lang, theme);
      }
      for (const word of ['MonitorExtra', 'Monitor_VALUE', 'Monitor$', 'Monitor#']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      check('MC_PAUSE:', 'MC_PAUSE', 'entity.name.label.amos', lang, theme);
      for (const word of ['Init', 'Precision', 'Single', 'Double']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      for (const word of ['Sin', 'Cos', 'Sqr']) check(`MC_RESULT#=${word}(9)`, word, 'support.function.amos', lang, theme);
      check('Set Double Precision', 'Set Double Precision', 'keyword.control.amos', lang, theme);
      check('MC_CODE=Errtrap', 'Errtrap', 'support.function.amos', lang, theme);
      check('Request On', 'Request On', 'keyword.control.amos', lang, theme);
    }
  });

  test(`${lang} monitor labels and floating-point library payloads stay opaque`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const text of ['Monitor', 'INIT VAL', 'Single Precision', 'Double Precision', 'mathffp.library', 'mathtrans.library', 'mathieeedoubbas.library']) {
        check(`Print "${text}"`, text, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${text}`, text, 'comment.line.rem.amos', lang, theme);
        check(`'${text}`, text, 'comment.line.apostrophe.amos', lang, theme);
      }
      const result = render('Print "Monitor\nMonitor', lang, theme);
      assertScope(result[1], 0, 7, 'keyword.control.amos');
    }
  });
}

test('fresh monitor/maths notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/monitor.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[5], 0, 7, 'keyword.control.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Monitor'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
