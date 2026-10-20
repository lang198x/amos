import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope } from './helpers/highlighter.mjs';

const chapter = JSON.parse(await readFile(new URL('../specifications/manual-core/08-03.json', import.meta.url), 'utf8'));
await highlighter.loadLanguage(amos3d);
const render = (source, lang, theme) => highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
const check = (source, word, scope, lang, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0);
  assertScope(render(source, lang, theme)[0], start, start + word.length, scope, `${lang}: ${source}`);
};

for (const lang of ['amos', 'amos-3d']) {
  test(`${lang} music-module forms retain phrases, functions and identifier boundaries`, () => {
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
      for (const word of ['Track', 'Tracker', 'Med', 'Medplayer', 'TrackPlay', 'MedMidiOn']) {
        check(`${word}=1`, word, 'variable.other.amos', lang, theme);
      }
      for (const source of ['Track PlayExtra', 'Track Loop Office', 'Med Midi Office', 'Med Continue']) {
        const word = source.split(' ')[0];
        check(source, word, 'variable.other.amos', lang, theme);
      }
      for (const source of ['Track Play', 'Track Play ,2', 'Track Play 9', 'Track Play 9,2', 'Med Play', 'Med Play ,1', 'Med Play 12', 'Med Play 12,1']) {
        check(source, source.startsWith('Track') ? 'Track Play' : 'Med Play', 'keyword.control.amos', lang, theme);
      }
      for (const word of ['Music Stop', 'Music Off', 'Mvolume', 'Tempo', 'Sam Play']) {
        check(word, word, 'keyword.control.amos', lang, theme);
      }
      check('Track Play MC_BANK,MC_PATTERN+1', 'MC_PATTERN', 'variable.other.amos', lang, theme);
    }
  });

  test(`${lang} module-looking payloads stay opaque and contexts end on new lines`, () => {
    for (const theme of ['dark-plus', 'light-plus']) {
      for (const entry of chapter.entries) {
        check(`Print "${entry.spelling}"`, entry.spelling, 'string.quoted.double.amos', lang, theme);
        check(`Rem ${entry.example}`, entry.example, 'comment.line.rem.amos', lang, theme);
        check(`'${entry.example}`, entry.example, 'comment.line.apostrophe.amos', lang, theme);
      }
      check('Track Load "RAM:Med Midi On.mod",9', 'RAM:Med Midi On.mod', 'string.quoted.double.amos', lang, theme);
      check('Med Load "RAM:Track Play.med",12', 'RAM:Track Play.med', 'string.quoted.double.amos', lang, theme);
      const result = render('Print "Med Midi On\nTrack Stop\nRem Med Cont\nMed Play ,1', lang, theme);
      assertScope(result[1], 0, 10, 'keyword.control.amos');
      assertScope(result[3], 0, 8, 'keyword.control.amos');
    }
  });
}

test('fresh mixed music-module listing preserves source and renders in both existing consumer modes', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/music-modules.amos.txt', import.meta.url), 'utf8');
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = render(source, registration.name, theme);
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      assertScope(result[3], 0, 10, 'keyword.control.amos');
      assertScope(result[6], 0, 11, 'keyword.control.amos');
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Track Loop On'));
      assert.ok(html.html.includes('Med Midi On'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 0);
    }
  }
});

test.after(() => highlighter.dispose());
