import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import amos from '../index.mjs';
import amos3d from '../amos-3d.mjs';
import { highlighter, tokens, assertScope } from './helpers/highlighter.mjs';

const check = (source, word, scope, theme) => {
  const start = source.indexOf(word);
  assert.ok(start >= 0, source);
  assertScope(tokens(source, theme)[0], start, start + word.length, scope, source);
};

test('directory options stay in listing statements while paths and division keep their roles', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['Dir/W', 'Ldir/W', 'Dir "RAM:*.txt" /W', 'Ldir MC_PATH$/W', 'Dir Fsel$("*.txt") /w']) {
      check(source, source.slice(source.lastIndexOf('/')), 'keyword.control.amos', theme);
    }
    check('Dir "RAM:folder/W/*.txt" /W', 'RAM:folder/W/*.txt', 'string.quoted.double.amos', theme);
    check('Dir Fsel$("*.txt") /W', 'Fsel$', 'support.function.amos', theme);
    check('MC_VALUE=12/W', '/', 'keyword.operator.amos', theme);
    check('MC_VALUE=12/W', 'W', 'variable.other.amos', theme);
    check('Dir MC_PATH$ /Width', 'Width', 'variable.other.amos', theme);
    check('Dir MC_PATH$ : MC_VALUE=12/W', 'W', 'variable.other.amos', theme);
    const lines = tokens('Dir MC_PATH$ /W\nMC_VALUE=12/W', theme);
    assertScope(lines[1], 12, 13, 'variable.other.amos');
    check('MC_PATH$=Dir First$("*.txt")', 'Dir First$', 'support.function.amos', theme);
    check('MC_PATH$=Dir Next$', 'Dir Next$', 'support.function.amos', theme);
  }
});

test('channel markers and random-access connectives retain complete command scopes', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const word of ['Print #', 'Input #', 'Line Input #', '? #']) {
      check(`${word}1,MC_VALUE$`, word, 'keyword.control.amos', theme);
    }
    check('Field 2,16 As MC_NAME$,4 As MC_CODE$', 'As', 'keyword.control.amos', theme);
    for (const word of ['Open In', 'Open Out', 'Open Random', 'Set Input', 'Append', 'Close', 'Field', 'Put', 'Get', 'Include']) {
      check(`${word} 1`, word, 'keyword.control.amos', theme);
    }
    for (const word of ['Get Bob Palette', 'Get Object Palette', 'Put Key', 'Get Sprite']) {
      check(word, word, 'keyword.control.amos', theme);
    }
    check('MC_PART$=Input$(1,4)', 'Input$', 'support.function.amos', theme);
    check('MC_DONE=Eof(1) : MC_SIZE=Lof(1)', 'Eof', 'support.function.amos', theme);
    check('MC_DONE=Eof(1) : MC_SIZE=Lof(1)', 'Lof', 'support.function.amos', theme);
  }
});

test('file variables support reads and assignments without promoting disputed spellings', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['Dir$="RAM:"', 'MC_PATH$=Dir$', 'Pof(1)=0', 'MC_AT=Pof(1)', 'Command Line$="stage=2"', 'MC_ARGS$=Command Line$']) {
      const word = source.includes('Dir$') ? 'Dir$' : source.includes('Pof') ? 'Pof' : 'Command Line$';
      check(source, word, 'variable.language.amos', theme);
    }
    for (const word of ['Field$', 'Command', 'Lines$', 'Directory', 'Open_In', 'EofExtra', 'Pof#', 'Dir#', 'Input#', 'Print#']) {
      check(`${word}=1`, word, 'variable.other.amos', theme);
    }
    check('MC_ARGS$=Command Lines$', 'Command', 'variable.other.amos', theme);
    check('MC_ARGS$=Command Lines$', 'Lines$', 'variable.other.amos', theme);
    check('Open InputExtra', 'InputExtra', 'variable.other.amos', theme);
  }
});

test('filenames, comments and line endings protect file-looking content', () => {
  for (const theme of ['dark-plus', 'light-plus']) {
    for (const source of ['Print "Open In #1: Field As /W"', 'Include "RAM:Dir/W/Field.AMOS"', 'Rename "RAM:Input #" To "RAM:Open In"']) {
      const first = source.indexOf('"');
      const last = source.indexOf('"', first + 1);
      check(source, source.slice(first + 1, last), 'string.quoted.double.amos', theme);
    }
    check('Dir MC_PATH$ : Rem /W Print # Input #', '/W Print # Input #', 'comment.line.rem.amos', theme);
    check("'Dir/W Print #1,MC_VALUE$", 'Dir/W Print #1,MC_VALUE$', 'comment.line.apostrophe.amos', theme);
    const result = tokens('Dir "RAM:unterminated\nMC_VALUE=12/W', theme);
    assertScope(result[1], 12, 13, 'variable.other.amos');
  }
});

test('the fresh file I/O listing renders in both profiles through existing consumers', async () => {
  assert.ok(process.env.AMOS_HIGHLIGHT_API_MODULE, 'AMOS_HIGHLIGHT_API_MODULE must name an existing consumer');
  const api = await import(pathToFileURL(process.env.AMOS_HIGHLIGHT_API_MODULE).href);
  const source = await readFile(new URL('../specifications/manual-core/examples/file-io.amos.txt', import.meta.url), 'utf8');
  await highlighter.loadLanguage(amos3d);
  for (const registration of [amos, amos3d]) {
    await api.loadCustomLanguage(registration);
    for (const theme of ['dark-plus', 'light-plus']) {
      const result = highlighter.codeToTokensBase(source, { lang: registration.name, theme, includeExplanation: true });
      assert.equal(result.map((line) => line.map((token) => token.content).join('')).join('\n'), source);
      const html = await api.codeToHighlightHtml(source, { lang: registration.name, theme });
      assert.ok(html.html.includes('Open Random'));
      assert.ok(html.html.includes('Dir First$'));
      assert.ok(html.css.includes('::highlight('));
      assert.ok(html.stats.tokens > 150);
      assertScope(result[4], 16, 18, 'keyword.control.amos');
    }
  }
});

test.after(() => highlighter.dispose());
