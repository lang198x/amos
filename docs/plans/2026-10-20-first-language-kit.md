# First AMOS language kit

Approved direction: dedicated language repository, distributable TextMate
highlighting and a small real Rust parser/checker. No added dependencies.

1. Establish context and record scope in `decisions/first-language-kit.md`.
   Inspect the website grammar's provenance and manual evidence. Reuse only
   material with an applicable software licence; otherwise author a small
   grammar from documented language facts. Verify relative links and licences.
2. Place the comparison corpus under `corpus/`, preserving MIT notices, hashes
   and native observation limits. Add independent original-runtime probes for
   lexical boundaries before implementing those rules; retain private runtime
   artefacts outside Git and publish source/observations only.
3. Add `syntaxes/amos.tmLanguage.json`, `package.json`, `index.mjs`, `index.d.ts`
   and `editors/vscode/`. Package the same grammar for npm and VS Code without
   runtime dependencies. Verify packed contents and scopes with already
   installed Shiki and shiki-highlight-api; do not install dependencies.
4. Add `Cargo.toml`, `src/{lib,lexer,parser,main}.rs` and `tests/`. Preserve text,
   tokens and byte spans, build typed statements and report unsupported forms.
   Explicit profile required for checking; no inferred release compatibility.
   Run format, tests, strict Clippy and CLI negative controls.
5. Document exact coverage, usage, provenance and follow-ons in `README.md` and
   `docs/coverage.md`. Add repeatable dependency-free CI checks. Publish the
   verified repository and retain package artefacts for review; report registry
   or editor validation limits precisely.
6. Update the Lang198x hub to point at the canonical AMOS corpus/repository,
   preserving existing links and research history. Commit and push each owning
   repository after checks. Preserve unrelated website and umbrella work.

Native Creator/Easy installation qualification continues separately. It does not
block useful host tools, but those products must remain unknown in compatibility
results. Native file writing, LSP, compilation and Blitz are outside this slice.

Implementation layout amended during review: use src/instructions/{cls,print,
wait_key,end}.rs, plus ast.rs, diagnostic.rs, profile.rs and location.rs. Keep
files small; tests split by concern. This replaces the initial four-file layout.
