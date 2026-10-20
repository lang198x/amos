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
