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
  test(`${lang} Kill Editor retains the complete command and file Kill behavior`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const word of ['Kill Editor', 'KILL EDITOR', 'kill editor', 'Kill\tEditor']) {
        check(word, word, 'keyword.control.amos', lang, theme);
        check(`Print 1: ${word}: Print 2`, word, 'keyword.control.amos', lang, theme);
      }
      for (const suffix of ['Extra', '_VALUE', '$', '#']) {
        check(`Kill Editor${suffix}`, `Editor${suffix}`, 'variable.other.amos', lang, theme);
        check(`Kill_Editor${suffix}=1`, `Kill_Editor${suffix}`, 'variable.other.amos', lang, theme);
      }
      check('Editor=1', 'Editor', 'variable.other.amos', lang, theme);
      check('Set Editor', 'Editor', 'variable.other.amos', lang, theme);
      check('Kill "RAM:MC_TEMP.TXT"', 'Kill', 'keyword.control.amos', lang, theme);
      check('Kill "RAM:MC_TEMP.TXT"', 'RAM:MC_TEMP.TXT', 'string.quoted.double.amos', lang, theme);
      for (const word of ['Close Editor', 'Close Workbench', 'Ask Editor']) check(word, word, 'keyword.control.amos', lang, theme);
      check('MC_STATE=Prg State', 'Prg State', 'support.function.amos', lang, theme);
      check('Trap Kill Editor', 'Kill Editor', 'keyword.control.amos', lang, theme);
    }
  });

  test(`${lang} runtime-looking payloads remain opaque with line recovery`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const text of ['Kill Editor', '[Set Editor]', 'AMOSPro.Editor', 'Prg State']) {
        check(`Print "${text}"`, text, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${text}`, text, 'comment.line.rem.amos', lang, theme);
        check(`'${text}`, text, 'comment.line.apostrophe.amos', lang, theme);
      }
      const result = render('Print "Kill Editor\nKill Editor', lang, theme);
      assertScope(result[1], 0, 11, 'keyword.control.amos');
    }
  });
}

test('fresh runtime notebook preserves source and renders through both existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/kill-editor.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[2], 0, 11, 'keyword.control.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Kill Editor'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
