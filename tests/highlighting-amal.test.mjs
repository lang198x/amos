import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amal from '../amal.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, assertScope, fragments, scopes } from './helpers/highlighter.mjs';

await highlighter.loadLanguage(amal);
const render = (source, theme = 'dark-plus') => highlighter.codeToTokensBase(source, {
  lang: 'amal', theme, includeExplanation: true,
});
const check = (source, word, scope, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0, source);
  assertScope(render(source, theme)[0], start, start + word.length, scope, source);
};
const json = async (file) => JSON.parse(await readFile(new URL(`../specifications/amal/${file}.json`, import.meta.url), 'utf8'));
const commands = (await json('commands')).entries;
const functions = (await json('functions')).entries;
const registers = (await json('registers')).entries;

// Check semantic scopes, not colour: themes can merge adjacent styles.
const lacks = (source, word, scope, theme) => {
  const first = source.indexOf(word);
  assert.ok(first >= 0);
  let offset = 0;
  for (const token of fragments(render(source, theme)[0])) {
    const next = offset + token.content.length;
    if (next > first && offset < first + word.length) assert.ok(!scopes(token).includes(scope), source);
    offset = next;
  }
};

test('all 16 command and 15 function records retain significant spellings and compact codes', () => {
  assert.equal(commands.length, 16);
  assert.equal(functions.length, 15);
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const [entries, scope] of [[commands, 'keyword.control.amal'], [functions, 'support.function.amal']]) {
      for (const entry of entries) {
        check(entry.example, entry.spelling, scope, theme);
        const source = entry.example.replace(entry.spelling, entry.code);
        check(source, entry.code, scope, theme);
        if (scope === 'support.function.amal') {
          const expression = entry.example.slice(entry.example.indexOf('=') + 1);
          check(`AU (If ${expression}=1 eXit)`, entry.spelling, scope, theme);
          const lower = entry.spelling.toLowerCase();
          lacks(`Let R0=${lower}`, lower, scope, theme);
        }
      }
    }
    for (const word of ['A', 'Anim', 'Animate', 'Anything']) check(`${word} 2,(1,4)`, word, 'keyword.control.amal', theme);
    check('L R0=BpaddingC(1,2,4)', 'BpaddingC', 'support.function.amal', theme);
    check('PLay 1', 'PLay', 'keyword.control.amal', theme);
    check('AU', 'AU', 'keyword.control.amal', theme);
  }
});

test('all 39 register members and A/X instruction roles have explicit contexts', () => {
  const members = registers.flatMap((entry) => entry.members);
  assert.equal(members.length, 39);
  assert.equal(new Set(members).size, 39);
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const member of members) {
      check(`Let ${member}=1`, member, 'variable.language.amal', theme);
      const condition = `AU (If ${member}>1 eXit)`;
      assertScope(render(condition, theme)[0], 7, 7 + member.length, 'variable.language.amal', condition);
    }
    check('Let R0=XM-X', 'XM', 'support.function.amal', theme);
    assertScope(render('Let R0=XM-X', theme)[0], 10, 11, 'variable.language.amal');
    check('Let A=1', 'A', 'variable.language.amal', theme);
    check('Anim 1,(2,3)', 'Anim', 'keyword.control.amal', theme);
    check('eXit', 'eXit', 'keyword.control.amal', theme);
    check('L RpaddingZ=1', 'RpaddingZ', 'variable.language.amal', theme);
    lacks('Let R10=1', 'R10', 'variable.language.amal', theme);
    lacks('Let r0=1', 'r0', 'variable.language.amal', theme);
  }
});

test('wrong capitals are not folded into BASIC-like words or function aliases', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    check('If X>1 Jump Target', 'If', 'keyword.control.amal', theme);
    const wrong = render('IF', theme)[0];
    assertScope(wrong, 0, 1, 'meta.instruction.if.amal');
    assertScope(wrong, 1, 2, 'meta.instruction.for.amal');
    check('MOVE 1,0,2', 'V', 'meta.unclassified.amal', theme);
    check('move 1,0,2', 'move', 'meta.ignored.amal', theme);
    check('Let X=XMouse', 'XMouse', 'support.function.amal', theme);
    lacks('Let R0=Xmouse', 'Xmouse', 'support.function.amal', theme);
    check('Let R0=Xmouse', 'Xmouse', 'variable.language.amal', theme);
  }
});

test('label definitions and jump/direct targets use one significant capital', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const label of ['T', 'Target', 'Zippadeedoodah']) {
      check(`${label}: Pause`, label, 'entity.name.label.amal', theme);
      check(`${label}: Pause`, ':', 'punctuation.definition.label.amal', theme);
      check(`Jump ${label}`, label, 'entity.name.label.amal', theme);
      check(`Direct ${label}`, label, 'entity.name.label.amal', theme);
    }
    check('M1,0,4;P;JTarget', 'M', 'keyword.control.amal', theme);
    check('M1,0,4;P;JTarget', 'P', 'keyword.control.amal', theme);
    check('M1,0,4;P;JTarget', 'Target', 'entity.name.label.amal', theme);
    check('For R0=0 To 4 Next R0', 'To', 'keyword.control.amal', theme);
    check('For R0=0 To 4 Next R0', 'Next', 'keyword.control.amal', theme);
  }
});

test('Autotest distinguishes expression X from its extended If exit action', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['AUtotest (If X>10 eXit)', 'AU (I X>Y X)', 'AU (I (X+1)>Z(255) X)', 'AU (I X+XM>10 X)']) {
      const line = render(source, theme)[0];
      const condition = source.indexOf('X');
      assertScope(line, condition, condition + 1, 'variable.language.amal', source);
      const exit = source.lastIndexOf('X');
      assertScope(line, exit, exit + 1, 'keyword.control.amal', source);
      check(source, ')', 'punctuation.section.group.end.amal', theme);
    }
    check('AU (If R0=1 Direct Target)', 'Target', 'entity.name.label.amal', theme);
    const resumed = 'AU (I X>10 X); X; Let X=1';
    lacks(resumed, '; X', 'meta.autotest.amal', theme);
    assertScope(render(resumed, theme)[0], resumed.lastIndexOf('X'), resumed.lastIndexOf('X') + 1, 'variable.language.amal');
    check('Anim 2,(1,4)(2,4)', ',', 'punctuation.separator.amal', theme);
    check('Let R0=(RA+1)*2/3', '*', 'keyword.operator.amal', theme);
    check('Let R0=K1|K2', '|', 'keyword.operator.amal', theme);
  }
});

test('ambiguous separatorless A/X transitions remain neutral until an explicit separator', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['M0,0,4A1,(1,4)', 'L R0=1X']) {
      const start = source.includes('A') ? source.indexOf('A') : source.indexOf('X');
      assertScope(render(source, theme)[0], start, start + 1, 'meta.unclassified.amal');
    }
    check('M0,0,4;A1,(1,4)', 'A', 'keyword.control.amal', theme);
    check('L R0=1;X', 'X', 'keyword.control.amal', theme);
  }
});

test('AMAL inherits no BASIC comments/strings and BASIC payloads stay opaque', async () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    check("' Pause", "'", 'meta.unclassified.amal', theme);
    check("' Pause", 'Pause', 'keyword.control.amal', theme);
    check('Rem', 'R', 'meta.unclassified.amal', theme);
    check('Let R0=1:Pause', ':', 'meta.unclassified.amal', theme);
    await highlighter.loadLanguage(amos3d);
    for (const lang of ['amos', 'amos-3d']) {
      const source = 'Amal 1,"AU (I X>10 X); M1,0,4;P;JT"';
      const result = highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
      assertScope(result[0], source.indexOf('"') + 1, source.lastIndexOf('"'), 'string.quoted.double.amos');
    }
  }
});

test('the independent AMAL listing preserves source through both existing consumers/themes', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  await api.loadCustomLanguage(amal);
  const source = await readFile(new URL('../specifications/amal/highlighting.amal.txt', import.meta.url), 'utf8');
  for (const theme of ['dark-plus', 'light-plus']) {
    assert.equal(render(source, theme).map((line) => line.map((token) => token.content).join('')).join('\n'), source);
    const html = await api.codeToHighlightHtml(source, { lang: 'amal', theme });
    assert.ok(html.html.includes('AUtotest'));
    assert.ok(html.html.includes('Jump'));
    assert.ok(html.css.includes('::highlight('));
    assert.ok(html.stats.tokens > 100);
  }
});

test.after(() => highlighter.dispose());
