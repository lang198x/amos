import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/10-03.json', import.meta.url), 'utf8'));
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} printer forms retain phrases, functions and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        const scope = entry.kind === 'function' ? 'support.function.amos' : 'keyword.control.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), scope, lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_') + suffix;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
        if (!entry.spelling.includes(' ')) check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
      }
      for (const word of ['Printer', 'PortExtra', 'Port$', 'PrinterCheck']) {
        check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      }
      for (const source of ['Printer OnlineExtra', 'Printer ErrorExtra', 'Printer OpenExtra']) {
        check(source, 'Printer', 'variable.other.amos', lang, theme);
      }
      for (const source of ['Printer Dump', 'Printer Dump 0,0 To 100,80', 'Printer Dump 0,0 To 100,80,0,0,$80']) {
        check(source, 'Printer Dump', 'keyword.control.amos', lang, theme);
      }
      for (const word of ['Trap', 'Printer Open']) check('Trap Printer Open', word, 'keyword.control.amos', lang, theme);
      for (const word of ['Printer Error', 'Printer Check', 'Printer Online', 'Printer Base']) {
        check('MC_VALUE=' + word, word, 'support.function.amos', lang, theme);
      }
      check('Error 88', 'Error', 'keyword.control.amos', lang, theme);
      check('Printer Out Start(10),Length(10)', 'Start', 'support.function.amos', lang, theme);
      for (const word of ['Print #', 'Input #']) check(word + '1,MC_TEXT$', word, 'keyword.control.amos', lang, theme);
      for (const word of ['MILCOLS', 'DENSITY1', 'aSGR3']) check(word + '=1', word, 'variable.other.amos', lang, theme);
    }
  });

  test(`${lang} printer-looking payloads stay opaque and contexts end on new lines`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      for (const device of ['PAR:', 'SER:', 'PRT:']) {
        check(`Open Port 1,"${device}"`, device, 'string.quoted.double.amos', lang, theme);
      }
      check('Printer Send Chr$(27)+"[3mPrinter Error"', '[3mPrinter Error', 'string.quoted.double.amos', lang, theme);
      const result = render('Printer Send "Printer Error\nMC_READY=Printer Check', lang, theme);
      assertScope(result[1], 9, 22, 'support.function.amos');
    }
  });
}

test('fresh mixed printer listing preserves source and renders in both existing consumer modes', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/printer.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      const lines = source.split('\n');
      const line = lines.findIndex((text) => text.includes('Printer Error'));
      assert.ok(line >= 0);
      const start = lines[line].indexOf('Printer Error');
      assertScope(result[line], start, start + 13, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Printer Dump'));
      assert.ok(html.html.includes('Printer Error'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
