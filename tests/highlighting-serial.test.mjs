import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/10-04.json', import.meta.url), 'utf8'));
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} serial forms retain phrases, functions and identifier boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        const scope = entry.kind === 'function' ? 'support.function.amos' : 'keyword.control.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), scope, lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_').replace(/[$#]$/, '') + suffix;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
        if (!entry.spelling.includes(' ')) check(`${entry.spelling}:`, entry.spelling, scope, lang, theme);
      }
      for (const source of ['Serial Buffer 0,1024', 'Serial BufExtra 0,1', 'Serial InputExtra']) check(source, 'Serial', 'variable.other.amos', lang, theme);
      check('Serial Buffer 0,1024', 'Buffer', 'variable.other.amos', lang, theme);
      for (const source of ['Serial Open 0,0', 'Serial Open 0,0,-1,0,0', 'Serial Close', 'Serial Close 0']) check(source, source.startsWith('Serial Open') ? 'Serial Open' : 'Serial Close', 'keyword.control.amos', lang, theme);
      for (const source of ['MC_VALUE=Serial Base', 'MC_VALUE=Serial Base(0)']) check(source, 'Serial Base', 'support.function.amos', lang, theme);
      check('MC_VALUE=Serial Input$(0)', 'Serial Input$', 'support.function.amos', lang, theme);
      check('Serial Out 0,Start(10),Length(10)', 'Length', 'support.function.amos', lang, theme);
      check('Printer Error', 'Printer Error', 'support.function.amos', lang, theme);
      check('Open Port 1,MC_DEVICE$', 'Open Port', 'keyword.control.amos', lang, theme);
    }
  });

  test(`${lang} serial-looking payloads stay opaque and contexts end on new lines`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }

    }
  });
}

test('fresh mixed serial listing preserves source and renders in both existing consumer modes', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/serial.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      const lines = source.split('\n');
      const line = lines.findIndex((text) => text.includes('Serial Input$'));
      assert.ok(line >= 0);
      const start = lines[line].indexOf('Serial Input$');
      assertScope(result[line], start, start + 13, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Serial Input$'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
