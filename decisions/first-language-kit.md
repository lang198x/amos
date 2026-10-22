# First AMOS language kit

Adopted 20 October 2026 after design approval.

One repository owns the AMOS lexer, typed AST, analysis, version/extension
profiles and highlighting assets. Other languages get separate repositories
and ASTs; no shared framework is introduced before a second consumer needs it.

Start with plain UTF-8 listings and the opening message forms: `Cls`, a single
string-literal `Print`, `Wait Key` and `End`. Keep source spelling and byte spans.
Parsing and compatibility are separate. A parsed listing is not evidence that
an original runtime accepts it. Unknown calls may refer to procedures/extensions.

Ship a TextMate grammar as JSON and an npm package, plus a thin VS Code extension
using the same grammar. Highlighting can cover more than parsing, but colour
does not establish validity. Share fixtures and documented command facts instead
of trying to turn regex highlighting into a parser. Later semantic highlighting
must consume canonical analysis.

The production Rust implementation and distributable highlighting package add no
runtime dependencies. On 22 October 2026, the user approved proptest for generated
tests, libfuzzer-sys in a separate fuzz workspace, and cargo-fuzz as a test tool.
This refines the initial dependency-free test setup without adding production
dependencies. Other dependency additions still require approval.
Test integrations with existing tools; dependency additions require approval.
New authored material follows the foundation's GPL-2.0-or-later licence; retained
teaching fixtures keep their upstream MIT notice. Do not copy website software
whose applicable licence has not been established.

Native format codecs belong in Format198x. Loadable native programs are a later
verified milestone; standalone compilation remains beyond the initial need.

Reconsult this record before introducing a parser framework, shared AST,
duplicated editor grammar/analysis, dependency, native codec or compiler.

Source organisation follows the requested small-file convention: one supported
instruction per Rust module, with separate AST, lexer, parser coordination,
diagnostics, profile checks and coordinate mapping. Do not accumulate instruction
implementations in a central match body or introduce a framework to split files.
