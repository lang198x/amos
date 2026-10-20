import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
if (!process.env.AMOS_SHIKI_MODULE) throw new Error('AMOS_SHIKI_MODULE must identify an existing Shiki installation');
const shikiUrl = pathToFileURL(process.env.AMOS_SHIKI_MODULE);
const { createHighlighter } = await import(shikiUrl.href);
const shikiPackage = JSON.parse(await readFile(new URL('../package.json', shikiUrl)));
if (shikiPackage.version !== '4.4.3') throw new Error('use the recorded Shiki 4.4.3 baseline');
import amos from '../../index.mjs';

const [sourcePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !outputPath) throw new Error('usage: node scan.mjs LISTING OUTPUT');
const input = await readFile(sourcePath);
const inputHash = createHash('sha256').update(input).digest('hex');
if (inputHash !== 'd540a483d722b4961f1abd70838d04d77c72f3e3596e78f63a011825414f9111') throw new Error('listing differs from the pinned research input');
const grammar = await readFile(new URL('../../syntaxes/amos.tmLanguage.json', import.meta.url));
const grammarHash = createHash('sha256').update(grammar).digest('hex');
if (grammarHash !== '3164ff08e962fc691797caefa4c038d47eb689a0f5d4bf26ae313809a5d39d86') throw new Error('grammar differs from the recorded baseline');
const source = input.toString('utf8');
if (!input.length || !Buffer.from(source, 'utf8').equals(input)) throw new Error('nonempty UTF-8 listing required');
const highlighter = await createHighlighter({ langs: [amos], themes: ['dark-plus'] });
const lines = source.split(/\r\n|\r|\n/);
const tokens = highlighter.codeToTokensBase(source, { lang: 'amos', theme: 'dark-plus', includeExplanation: true });
if (tokens.length !== lines.length) throw new Error('source and token line counts differ');
const heads = new Map();
let examined = 0;
for (const [index, line] of lines.entries()) {
  if (!line.trim() || /^\s*(Rem\b|')/i.test(line)) continue;
  if (/^\s*[A-Za-z_][A-Za-z0-9_]*[$#]?\s*=/.test(line)) continue;
  if (/^\s*[A-Za-z_][A-Za-z0-9_]*\s*:\s*$/.test(line)) continue;
  const word = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*[$#]?)/)?.[1];
  if (!word) continue;
  const first = tokens[index].find((token) => token.content.trim());
  if (!first) throw new Error('nonempty candidate line has no tokens');
  const scopes = first.explanation?.flatMap((item) => item.scopes.map((scope) => scope.scopeName)) ?? [];
  const highlighted = scopes.some((scope) => scope.startsWith('keyword.') || scope.startsWith('support.function'));
  const key = word.toLowerCase();
  const record = heads.get(key) ?? { word, occurrences: 0, highlighted: true, example_line: index + 1 };
  record.occurrences += 1;
  record.highlighted &&= highlighted;
  heads.set(key, record);
  examined += 1;
}
if (!examined || !heads.size) throw new Error('no statement-head candidates examined');
const report = {
  method: 'physical_line_head_candidates_not_a_parser_or_full_vocabulary_audit',
  source: 'https://github.com/code198x/code-samples/blob/633cd5805d4d0fcbe16ddc4eb41b85769bde41d8/commodore-amiga/amos/bank-or-risk/stages/arcade/stable-display.amos',
  source_sha256: createHash('sha256').update(input).digest('hex'),
  grammar_commit: '1f96074c0b8215d4d29bfe98c8d5a6c426baf672',
  grammar_sha256: grammarHash,
  highlighter: 'Shiki 4.4.3, dark-plus, scopes inspected',
  source_lines: lines.length,
  examined_candidate_lines: examined,
  heads: [...heads.values()].sort((a, b) => a.word.localeCompare(b.word)),
};
await writeFile(outputPath, JSON.stringify(report, null, 2) + '\n');
highlighter.dispose();
console.log('Examined:', examined, 'candidate lines;', heads.size, 'distinct heads');
console.log('Unhighlighted head candidates:', report.heads.filter((head) => !head.highlighted).map((head) => head.word).join(', '));
