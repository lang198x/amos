import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/11-02.json', import.meta.url), 'utf8'));
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} speech forms retain phrases, functions and identifier boundaries`, () => {
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
      for (const word of ['Talk', 'Mouth', 'SayMore', 'Say$', 'MouthRead', 'SetTalk']) {
        check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      }
      for (const source of ['Talk StopExtra', 'Talk Miscellaneous', 'Mouth Reader', 'Mouth WidthExtra']) {
        const word = source.split(' ')[0];
        check(source, word, 'variable.other.amos', lang, theme);
      }
      for (const source of ['Say MC_TEXT$', 'Say MC_TEXT$,0', 'Say MC_TEXT$,1']) {
        check(source, 'Say', 'keyword.control.amos', lang, theme);
      }
      for (const source of ['Set Talk 0,0,120,150', 'Set Talk ,,100,', 'Set Talk 1,1,,']) {
        check(source, 'Set Talk', 'keyword.control.amos', lang, theme);
      }
      for (const word of ['Mouth Width', 'Mouth Height', 'Mouth Read']) {
        check(`MC_VALUE=Max(0,${word})`, word, 'support.function.amos', lang, theme);
      }
      check('Talk Stop : Read MC_VALUE', 'Read', 'keyword.control.amos', lang, theme);
    }
  });

  test(`${lang} speech-looking payloads stay opaque and contexts end on new lines`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      check("Say \"Talk Stop: Mouth Read, don't pause.\",1", "Talk Stop: Mouth Read, don't pause.", 'string.quoted.double.amos', lang, theme);
      const result = render('Say "Mouth Read\nTalk Stop\nRem Say\nMC_POSITION=Mouth Read', lang, theme);
      assertScope(result[1], 0, 9, 'keyword.control.amos');
      assertScope(result[3], 12, 22, 'support.function.amos');
    }
  });
}

test('fresh mixed speech listing preserves source and renders in both existing consumer modes', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/speech.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[2], 0, 8, 'keyword.control.amos');
      assertScope(result[6], 12, 22, 'support.function.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Talk Misc'));
      assert.ok(html.html.includes('Mouth Read'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
