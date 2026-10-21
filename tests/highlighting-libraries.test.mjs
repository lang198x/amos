import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/11-05.json', import.meta.url), 'utf8'));
const scopeFor = (kind) => ({ command: 'keyword.control.amos', function: 'support.function.amos', reserved: 'variable.language.amos' })[kind];
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} library forms preserve roles, complete phrases and typed boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        for (const change of [(s) => s, (s) => s.toUpperCase(), (s) => s.toLowerCase(), (s) => s.replaceAll(' ', '\t')]) {
          check(change(entry.example), change(entry.spelling), scopeFor(entry.kind), lang, theme);
        }
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const word = entry.spelling.replaceAll(' ', '_').replace(/[$#]$/, '') + suffix;
          if (chapter.entries.some((item) => item.spelling.toLowerCase() === word.toLowerCase())) continue;
          check(`${word}=1`, word, 'variable.other.amos', lang, theme);
        }
        if (!entry.spelling.includes(' ')) check(`${entry.spelling}:`, entry.spelling, scopeFor(entry.kind), lang, theme);
      }
      for (const word of ['Lib', 'LvoExtra', 'Equ$', 'Struc#']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      check('Lib CallExtra', 'Lib', 'variable.other.amos', lang, theme);
      check('Set Equate BankExtra', 'Equate', 'variable.other.amos', lang, theme);
      for (const [word, scope] of [['Struc', 'variable.language.amos'], ['Struc$', 'support.function.amos']]) {
        check(`${word}(MC_BASE,"ln_Name")=MC_VALUE`, word, scope, lang, theme);
        check(`MC_VALUE=${word}(Lib Base(1),"ln_Name")`, word, scope, lang, theme);
      }
      for (const word of ['Execall', 'Lvo']) check('MC_TASK=Execall(Lvo("FindTask"))', word, 'support.function.amos', lang, theme);
      for (const word of ['Trap', 'Lib Open']) check('Trap Lib Open 1,"dos.library",0', word, 'keyword.control.amos', lang, theme);
      check('Exec "Echo Ready"', 'Exec', 'keyword.control.amos', lang, theme);
      check('MC_MODE=Prg State', 'Prg State', 'support.function.amos', lang, theme);
      check('MC_PORT=Arexx Exist("REXX")', 'Arexx Exist', 'support.function.amos', lang, theme);
      for (const word of ['Dev', 'Request']) check(`${word}=1`, word, 'variable.other.amos', lang, theme);
    }
  });

  test(`${lang} equate names and library-like payloads stay opaque with line recovery`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      for (const name of ['FindTask', 'FINDTASK', 'findtask', 'Lib Call: Struc$']) {
        check(`MC_OFFSET=Lvo("${name}")`, name, 'string.quoted.double.amos', lang, theme);
      }
      check('MC_COMMAND=Equ("CMD_WRITE")', 'CMD_WRITE', 'string.quoted.double.amos', lang, theme);
      check('Struc$(MC_BASE,"ln_Name")="Lib Close"', 'Lib Close', 'string.quoted.double.amos', lang, theme);
      const result = render('Lib Open 1,"Struc$\nMC_SIZE=Struc(MC_BASE,"IO_LENGTH")', lang, theme);
      assertScope(result[1], 8, 13, 'variable.language.amos');
    }
  });
}

test('fresh library notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/libraries.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[8], 0, 5, 'variable.language.amos');
      assertScope(result[10], 0, 6, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('FindTask'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
