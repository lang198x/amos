# Rust parser preview 0.1.0

`lang198x-amos` 0.1.0 is our first crates.io preview of the source-preserving
AMOS parser and bounded checker. It provides a Rust library and the
`lang198x-amos` CLI, with no production dependencies. It requires Rust 1.98 or
later and uses the GPL-2.0-or-later licence; retained teaching fixtures keep
their MIT notice.

Install the CLI:

```sh
cargo install lang198x-amos --version 0.1.0 --locked
lang198x-amos check --profile amos-pro-2.00-observed listing.amos.txt
```

For a Rust consumer, add `lang198x-amos = "0.1.0"` to dependencies. The library
exports `parse` for source structure and `check` for the explicit profile check.
Both use the same parser as the CLI.

## Supported source

We parse UTF-8 text listings with these bounded forms:

- `Cls`, with no argument or one unsigned decimal literal.
- `Print` with exactly one double-quoted string literal.
- `Wait Key` and `End`, without arguments.
- Named assignments using an integer, string or name, with one unary minus.
- One multiline `If` / `End If` block, with an equality condition and a body
  containing supported statements. This covers the maintained Perfect 10
  fragment from Bank or Risk.

The parser preserves spelling, all tokens and half-open UTF-8 byte ranges.
LF, CRLF and CR line endings retain their original bytes. Diagnostics report
one-based lines and Unicode scalar columns; these are not LSP UTF-16 positions.
Malformed supported expressions and missing terminators produce diagnostics;
recovery preserves later statements. Unsupported blocks retain their whole
source range. The release includes the cross-platform fixture preservation fix.

Else, nested conditionals, arithmetic, arrays and inline If remain unsupported.
We do not evaluate expressions, resolve names or check types. Unknown statement
calls stay unresolved rather than being labelled spelling mistakes. Control
characters other than tabs and line endings are rejected.

## Results and limits

The only enabled CLI profile is `amos-pro-2.00-observed`. A successful check
means supported source structure. It does not establish native compatibility,
value ranges, type correctness or whether a program will finish. Native trials
remain evidence for their exact inputs and installations; they do not enable
Creator or Easy CLI profiles or qualify other revisions or extensions.

| CLI exit | Meaning |
| --- | --- |
| 0 | Supported source structure |
| 1 | Invalid text or supported form |
| 2 | Unsupported form |
| 3 | Unknown profile |
| 64 | Usage or input error |

There is no native `.AMOS` import/export, interpreter, compiler or language
server. Host tests, generated source-contract checks and retained native
observations answer different questions. See [coverage](../coverage.md) and
[verification](../verification.md) for their scope.

This Rust release leaves npm `@lang198x/amos` at 0.3.0 and the VS Code preview
at 0.3.1. Their highlighting grammars and public availability are unchanged.
