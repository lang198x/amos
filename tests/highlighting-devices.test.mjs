import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/11-05.json', import.meta.url), 'utf8'));
const entries = chapter.entries.filter((entry) => entry.spelling.startsWith('Dev '));
assert.equal(entries.length, 9);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} device forms retain complete phrases, roles and typed boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        const scope = entry.kind === 'function' ? 'support.function.amos' : 'keyword.control.amos';
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), scope, lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_').replace(/[$#]$/, '') + suffix;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
      }
      for (const source of ['Dev First("**")', 'Dev Next', 'Dev First$Extra', 'Dev OpenExtra', 'Dev Check#(1)', 'Dev D0(1,MC_COMMAND)']) {
        check(source, 'Dev', 'variable.other.amos', lang, theme);
      }
      for (const source of ['Dev Close', 'Dev Close 1']) check(source, 'Dev Close', 'keyword.control.amos', lang, theme);
      check('Dev=1', 'Dev', 'variable.other.amos', lang, theme);
      check('Request Extra', 'Request', 'variable.other.amos', lang, theme);
      check('MC_NAME$=Struc$(Dev Base(1),"ln_Name")', 'Dev Base', 'support.function.amos', lang, theme);
      check('Struc(Dev Base(1),"IO_LENGTH")=MC_SIZE', 'Struc', 'variable.language.amos', lang, theme);
      for (const word of ['Trap', 'Dev Open']) check('Trap Dev Open 1,"trackdisk.device",256,0,0', word, 'keyword.control.amos', lang, theme);
      for (const word of ['Dev Send', 'Equ']) check('Dev Send 1,Equ("CMD_READ")', word, word === 'Equ' ? 'support.function.amos' : 'keyword.control.amos', lang, theme);
      check('MC_BASE=Lib Base(1)', 'Lib Base', 'support.function.amos', lang, theme);
      check('MC_MODE=Prg State', 'Prg State', 'support.function.amos', lang, theme);
    }
  });

  test(`${lang} device names and path masks stay opaque and recover on new lines`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      for (const mask of ['**', 'D/**', 'A/**', 'Dev Send:Dev Check']) {
        check(`MC_DEVICE$=Dev First$("${mask}")`, mask, 'string.quoted.double.amos', lang, theme);
      }
      check('Dev Open 1,"trackdisk.device",256,0,0', 'trackdisk.device', 'string.quoted.double.amos', lang, theme);
      check('Dev Do 1,Equ("CMD_READ")', 'CMD_READ', 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Dev Send\nMC_STATE=Dev Check(1)', lang, theme);
      assertScope(result[1], 9, 18, 'support.function.amos');
    }
  });
}

test('fresh device notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/devices.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[10], 9, 18, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('trackdisk.device'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
