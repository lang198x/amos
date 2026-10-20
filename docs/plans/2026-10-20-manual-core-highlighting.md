# Build core highlighting from the manual

Steve approved a manual-led inventory covering control flow, procedures, data,
strings and maths. The first bounded sweep is the Professional User Guide's
§§5.1–5.5. Other editions, extensions, later chapters and native execution are
separate qualifications. Keep Marketplace private and published assets unchanged.

1. Read the held primary extract and inventory every named form in these five
   chapters, including grouped headings and typed variants. Write small chapter
   data files under `specifications/manual-core/`, with printed pages, a pinned
   source hash and freshly authored examples. Do not scrape headings into a claim
   of complete language coverage. Record uncertain prose/extract details.
2. Add manual inventory tests and compare current scopes. Check command/function
   distinctions, full multiword forms, suffixed builtins and existing boundaries.
   Reproduce gaps before editing. Keep the canonical grammar in its existing
   TextMate format; no new generator, parser architecture or dependency.
3. Add missing basics/string/maths forms; synchronise the editor grammar, run
   applicable tests/build, commit and push this small group.
4. Add missing control/data/procedure forms, including lexical declaration names
   if unambiguous. Keep unresolved calls and targets distinct from resolution.
   Test each group, commit and push. Preserve the full-game regression inventory.
5. Add independently authored mixed listings and malformed/boundary cases. Run
   the complete integration suite with existing consumers in both themes; prove
   a missing manual form makes a check fail. Update provenance/coverage and plans.
6. Inspect built npm/VSIX artifacts and exact canonical bytes. Read CI outcomes,
   then remove disposable artifacts/cache/consumer directories. No publication,
   Marketplace upload or background process is needed.

Files: `specifications/manual-core/{README.md,source.json,05-01.json,...,05-05.json}`,
`tests/highlighting-manual*.test.mjs`, existing `tests/helpers/highlighter.mjs`,
`syntaxes/amos.tmLanguage.json`, its synchronised editor copy and current docs.

The core vocabulary and known-word label guard share boundaries. Deliver their
small grammar edits atomically so no intermediate commit leaves some chapter
tests failing; declaration-context work follows separately. The initial checklist
has 109 entries (32 previously passed all lexical checks). Its intentional red
run failed first on Set Buffer, Left$, Mod, Goto and Set Stack in the five
chapters. These are reproduced scope gaps, not original-runtime verdicts.

## Outcome

All 109 inventory entries now pass lexical checks; procedure and Def Fn names
have declaration scopes while references stay unresolved. Two MC_-prefixed mixed
listings exercise control/data/procedures and string/maths contexts. Every
inventory entry matches its heading/mention in the hash-pinned primary extract.
The pagination discrepancy caught by the metadata test is cross-checked against
a separately held original-manual extract, with both page values retained.
The original failing metadata commit was corrected by a follow-up, not a weakened
check. Removing typed Param recognition fails on Param# as intended.

The first sweep is limited to named forms in §§5.1–5.5. Later text/input,
screen/object/file facilities, numeric notation, inline/numeric labels and
edition/extension qualification remain explicit gaps. No dependency, Rust parser,
registry release or Marketplace change is part of this work.

Final checks: 24 integration tests pass with Shiki 4.4.3 and both existing
shiki-highlight-api consumers; five package/inventory checks pass. Source hashes
and all 109 extract-line/printed-page bindings were compared to the held sources.
Built npm and VSIX grammar bytes, icon metadata and absence of Public gallery
flags were inspected. The actual tarball registration renders both mixed
listings in both themes with expected core scopes. No dependency was added.
The baseline comparison used grammar at `3913df4` before the expansion.

Disposable work: `dist/` and `/private/tmp/lang198x-manual-packages/` (extracted
consumer plus task npm cache). These contain no unfinished source and are removed
after the final source commit is retained remotely. No background process or
temporary worktree was created.
