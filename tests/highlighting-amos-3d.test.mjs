import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos3d from '../amos-3d.mjs';
import { highlighter, tokens, assertScope, scopes } from './helpers/highlighter.mjs';

await highlighter.loadLanguage(amos3d);
const render = (source, theme) => highlighter.codeToTokensBase(source, {
  lang: 'amos-3d', theme, includeExplanation: true,
});
const check = (source, word, scope, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0, source);
  assertScope(render(source, theme)[0], start, start + word.length, scope, source);
};
const base = new URL('../specifications/extensions/amos-3d/', import.meta.url);
const json = async (file) => JSON.parse(await readFile(new URL(file, base), 'utf8'));
const inventory = await json('source.json');
const entries = (await Promise.all(inventory.inventory_files.map(json))).flatMap((family) => family.entries);

test('all 59 3D records have command/function scopes only in the selected profile', () => {
  assert.equal(entries.length, 59);
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const entry of entries) {
      const word = entry.source_spelling ?? entry.spellings[0];
      const scope = entry.kind === 'command' ? 'keyword.control.amos' : 'support.function.amos';
      for (const spelling of [word, word.toLowerCase(), word.toUpperCase().replaceAll(' ', '\t')]) {
        check(spelling, spelling, scope, theme);
      }
      // The leading Td identifier must remain ordinary in the base profile.
      assertScope(tokens(word, theme)[0], 0, 2, 'variable.other.amos', word);
      const examples = entry.source_example ? [entry.source_example] : entry.examples.map((source) => {
        // Keep conflicting manual examples in the inventory; use the source spelling here.
        for (const spelling of entry.spellings) source = source.replace(spelling, word);
        return source;
      });
      for (const source of examples) {
        check(source, word, scope, theme);
      }
    }
  }
});

test('longest 3D forms win and spelling conflicts do not create aliases', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const word of ['Td Surface Points Off', 'Td Surface Points', 'Td Anim Rel', 'Td Move Rel', 'Td Angle Rel']) {
      check(`${word} 1,2,3`, word, 'keyword.control.amos', theme);
    }
    check('MC_X=Td Anim Point X(1,0)', 'Td Anim Point X', 'support.function.amos', theme);
    for (const source of ['Td Angel Rel 1,0,0,0', 'Td Priority 1,2', 'Td Pragma 1,2', 'Td Set Colour 1,0,2', 'Td Rotate 1,0,0,0']) {
      assertScope(render(source, theme)[0], 0, 2, 'variable.other.amos', source);
    }
  }
});

test('3D lookalikes, comments and strings retain ordinary scopes', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const word of ['TdRedraw', 'Td_Redraw', 'XTd', 'Td', 'RedrawExtra', 'Redraw$', 'Redraw#']) {
      const source = word.startsWith('Redraw') ? `Td ${word}=1` : `${word}=1`;
      check(source, word, 'variable.other.amos', theme);
    }
    check('Print "Td Collide(7): Td Quit"', 'Td Collide(7): Td Quit', 'string.quoted.double.amos', theme);
    check('Rem Td Redraw', 'Td Redraw', 'comment.line.rem.amos', theme);
    check("' Td Redraw", 'Td Redraw', 'comment.line.apostrophe.amos', theme);
    check('Td Move X 1,"(10,2,1)"', '(10,2,1)', 'string.quoted.double.amos', theme);
    check('MC_A=1 : Td Redraw', 'Td Redraw', 'keyword.control.amos', theme);
    check('Procedure TD[MC_A]', 'TD', 'entity.name.function.amos', theme);
  }
});

test('the combined mode preserves full-game BASIC token scopes and colours', async () => {
  const source = await readFile(new URL('../corpus/highlighting/bank-or-risk.amos.txt', import.meta.url), 'utf8');
  const normalise = (lines) => lines.map((line) => line.map((token) => ({
    content: token.content, color: token.color, fontStyle: token.fontStyle,
    scopes: scopes(token).filter((scope) => !scope.startsWith('source.basic.amos')),
  })));
  for (const theme of ['dark-plus', 'light-plus']) {
    assert.deepEqual(normalise(render(source, theme)), normalise(tokens(source, theme)));
  }
});

test('the independent mixed 3D listing renders through the existing HTML consumer', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amos3d);
  const source = await readFile(new URL('highlighting.amos.txt', base), 'utf8');
  for (const theme of ['dark-plus', 'light-plus']) {
    assert.equal(render(source, theme).map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    const result = await api.codeToHighlightHtml(source, { lang: 'amos-3d', theme });
    assert.ok(result.html.includes('Td Collide'));
    assert.ok(result.css.includes('::highlight('));
    assert.ok(result.stats.tokens > 100);
  }
});

test.after(() => highlighter.dispose());
