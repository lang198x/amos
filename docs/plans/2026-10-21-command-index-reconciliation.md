# Appendix G command-index reconciliation

1. Verify the pinned extract and complete 20-page index boundaries. Extract
   every named index row, preserving line, index page, role and target page;
   compare BASIC, Menu and AMAL rows with their separate current inventories.
   Keep Interface rows separate. Inspect every unmatched row and classification
   difference against its definition/context; do not create aliases from the index.
2. Add scripts/audit-command-index.py with a hash-pinned source/check mode,
   fail on unparsed/unmapped rows, and retain the reproducible audit in specifications/command-index/ (source.json
   and per-page JSON records), plus docs/command-index-review.md with totals,
   discrepancy/definition routes and limits. Update current gap/reconciliation/
   provenance docs. Preserve the 728-entry/44-section BASIC count unless a
   separate definition-led implementation is justified and verified.
3. Validate complete row coverage against the pinned extract, nonempty page
   partitions and every claimed inventory mapping. Add tests/command-index.test.mjs to package checks; validate page coverage
   and reference/surface integrity. Run appropriate package/inventory checks, preserve grammar hashes, inspect package documentation
   bytes if changed, commit/push, inspect CI and remove
   /private/tmp/lang198x-command-index outputs.

No dependencies, parser/API change, native execution, profile qualification,
version bump, publication or automatic vocabulary expansion. The index locates
sources; a spelling or role there alone does not settle syntax or semantics.

Outcome: all 818 rows/20 pages reproduce exactly from the pinned source. No new
BASIC vocabulary follows; 30 rows retain conflicts and 69 Interface rows remain
separate. Missing-row controls fail both source replay and package tests;
restoration passes 27 package checks, editor sync and Ruff. Grammar hashes are
unchanged. Eighteen npm files and nine VSIX assets match source. Full consumer
verification is limited: 245/246 passed before a Shiki timeout/explanation crash;
isolated 4/6 repeated it and a style-count assertion. Diagnostic scope/encoded
passes confirmed an early-stop mismatch under high host load. No test/dependency
change or repeated retry loop was used. See docs/verification.md for exact evidence.
Remove task outputs after exact remote retention and CI verification.
