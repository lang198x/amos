import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';
import amos from '../index.mjs';

// Resolve existing consumer installations without adding project dependencies.
const moduleUrl = (key) => {
  assert.ok(process.env[key], `${key} must name an installed module entry file`);
  return pathToFileURL(process.env[key]).href;
};
const { createHighlighter } = await import(moduleUrl('AMOS_SHIKI_MODULE'));
const highlightApi = await import(moduleUrl('AMOS_HIGHLIGHT_API_MODULE'));
const highlighter = await createHighlighter({ langs: [amos], themes: ['dark-plus'] });
const tokens = (source) => highlighter.codeToTokensBase(source, { lang: 'amos', theme: 'dark-plus', includeExplanation: true });
const scopes = (token) => token.explanation?.flatMap((e) => e.scopes.map((s) => s.scopeName)) ?? [];
const scoped = (source, text, scope) => tokens(source).flat().some((t) => t.content.includes(text) && scopes(t).some((s) => s.startsWith(scope)));

test('commands are case insensitive, longest multiword forms and dollar names have boundaries', () => {
  assert.ok(scoped('cLs 0: wait key: eNd', 'wait key', 'keyword.control'));
  assert.ok(scoped('End If', 'End If', 'keyword.control'));
  assert.ok(scoped('A$=Inkey$', 'Inkey$', 'support.function'));
  assert.ok(!scoped('PrintCount=1: Inkey$Extra=2', 'Print', 'keyword.control'));
  assert.ok(!scoped('Inkey$Extra', 'Inkey$', 'support.function'));
});

test('string punctuation and backslashes do not become comments or escapes', () => {
  assert.ok(scoped('Print "Rem: \' \\" : End', "Rem: ' \\", 'string.quoted'));
  assert.ok(scoped('Print "Rem: \' \\" : End', 'End', 'keyword.control'));
  assert.ok(!scoped('Print "\\x"', '\\x', 'constant.character.escape'));
  assert.ok(scoped('Print "unfinished\nEnd', 'End', 'keyword.control'));
});

test('apostrophe and Rem comment boundaries match the documented rules', () => {
  assert.ok(scoped("  'Print", 'Print', 'comment.line'));
  assert.ok(scoped('End: Rem Print "ignored"', 'ignored', 'comment.line'));
  assert.ok(!scoped("End: 'Print", 'Print', 'comment.line'));
  assert.ok(!scoped('Remember=1', 'Remember', 'comment.line'));
});

test('shared native probe input preserves all text through highlighting', async () => {
  for (const name of ['boundaries', 'comments']) {
    const source = await readFile(new URL(`../corpus/probes/${name}.amos.txt`, import.meta.url), 'utf8');
    assert.equal(tokens(source).map((line) => line.map((t) => t.content).join('')).join('\n'), source);
  }
});

test('shiki-highlights consumes the registration and emits styled source', async () => {
  await highlightApi.loadCustomLanguage(amos);
  const result = await highlightApi.codeToHighlightHtml('Print "hello"\nWait Key', { lang: 'amos', theme: 'dark-plus' });
  assert.ok(result.html.includes('hello'));
  assert.ok(result.css.includes('::highlight('));
  assert.ok(result.stats.tokens > 0);
  assert.ok(result.stats.uniqueStyles >= 2);
});

test('shiki-highlights renders the complete pinned game with both themes', async () => {
  await highlightApi.loadCustomLanguage(amos);
  const source = await readFile(new URL('../corpus/highlighting/bank-or-risk.amos.txt', import.meta.url), 'utf8');
  for (const theme of ['dark-plus', 'light-plus']) {
    const result = await highlightApi.codeToHighlightHtml(source, { lang: 'amos', theme });
    assert.ok(result.html.includes('BANK OR RISK'));
    assert.ok(result.html.includes('Screen Swap'));
    assert.ok(result.html.includes('BR_PRESENT'));
    assert.ok(result.css.includes('::highlight('));
    assert.ok(result.stats.tokens > 398);
  }
});

test.after(() => highlighter.dispose());
