import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/14-F.json', import.meta.url), 'utf8'));
assert.equal(chapter.entries.length, 8);
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} Copper forms retain whole phrases, roles and boundaries`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'support.function.amos';
        for (const change of [(s) => s, (s) => s.toLowerCase(), (s) => s.toUpperCase(), (s) => s.replaceAll(' ', '\t')]) check(change(entry.example), change(entry.spelling), scope, lang, theme);
        for (const suffix of ['Extra', '_VALUE', '$', '#']) {
          const name = entry.spelling.replaceAll(' ', '_') + suffix;
          check(`${name}=1`, name, 'variable.other.amos', lang, theme);
          const source = entry.spelling + suffix;
          check(source, source.split(' ').at(-1), 'variable.other.amos', lang, theme);
          check(source, source.split(' ')[0], 'variable.other.amos', lang, theme);
        }
        check(`${entry.spelling}: Print 1`, entry.spelling, scope, lang, theme);
      }
      for (const word of ['Cop', 'Copper', 'Move', 'Movel', 'Reset', 'Skip']) check(word, word, 'variable.other.amos', lang, theme);
      for (const source of ['Cop Wait MC_X,MC_Y', 'Cop Wait MC_X,MC_Y,$1FF,%11']) check(source, 'Cop Wait', 'keyword.control.amos', lang, theme);
      check('Cop Move MC_REGISTER,MC_WORD', 'Cop Move', 'keyword.control.amos', lang, theme);
      check('Cop Movel MC_REGISTER,Logbase(0)', 'Cop Movel', 'keyword.control.amos', lang, theme);
      check('MC_WORD=Deek(Cop Logic)', 'Cop Logic', 'support.function.amos', lang, theme);
      check('MC_WORD=Deek(Cop Logic)', 'Deek', 'support.function.amos', lang, theme);
      check('Doke Cop Logic,MC_WORD', 'Cop Logic', 'support.function.amos', lang, theme);
      check('Trap Cop Move MC_REGISTER,MC_WORD', 'Trap', 'keyword.control.amos', lang, theme);
      check('Cop Swap : Wait Vbl', 'Wait Vbl', 'keyword.control.amos', lang, theme);
      check('MC_BUFFER=Logic(0)', 'Logic', 'support.function.amos', lang, theme);
    }
  });

  test(`${lang} Copper payloads remain opaque with line recovery`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      const result = render('Print "Cop Move Copper On\nCop Swap', lang, theme);
      assertScope(result[1], 0, 8, 'keyword.control.amos');
    }
  });
}

test('fresh Copper notebook preserves source through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/copper.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[1], 0, 10, 'keyword.control.amos');
      assertScope(result[2], 8, 17, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Copper Off'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
