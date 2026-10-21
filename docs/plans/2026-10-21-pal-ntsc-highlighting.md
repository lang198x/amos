# Appendix C PAL/NTSC reconciliation

1. Verify Appendix C boundaries and both named headings in the pinned extract;
   measure current scopes. Create specifications/manual-core/14-C.json for
   Display Height and Ntsc, with page/line evidence and fresh examples. Reconcile
   existing Screen Open/Display, Lowres, Global, control and Wait Vbl references
   in docs/manual-reconciliation.md; do not duplicate those records.
2. Add complete function scopes, Ntsc label exclusion and identifier guards to
   the canonical grammar; sync combined/editor copies. Add
   tests/highlighting-pal-ntsc.test.mjs and examples/pal-ntsc.amos.txt covering
   expressions, branches, screen argument omissions, timing references, phrase
   boundaries, strings/comments, recovery and both existing consumers.
3. Extend Appendix C validation, preserve prior inventory guards and update
   current docs to 728 entries across 44 chapter/appendix sections. Retain the
   catalogue audit closure; update its stale reconciliation cross-reference.
   Run package/editor, both full consumer suites sequentially, missing-rule
   controls, npm/VSIX bytes and extracted rendering. Commit/push, inspect CI
   and remove /private/tmp/lang198x-pal-ntsc outputs.

No dependencies, parser/API change, native screen/timing qualification, version
bump or publication. PAL/SECAM are labels, not new command aliases. No historical
geographic, display-height, refresh-rate or A3000 advice becomes executable policy.

Outcome: two new heading/page bindings match the pinned extract and lacked
function scopes before implementation. Package checks pass 25/25; both existing
consumers pass 246/246 integrations. Missing-function-rule controls fail both
profiles, then restoration passes. npm/VSIX source bytes and extracted all-mode/
two-theme source/render checks pass. Existing references are reconciled without
duplicates. No native operation or publication occurred. Remove task outputs
after exact remote retention and CI verification.
