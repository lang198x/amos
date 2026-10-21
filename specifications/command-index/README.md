# Professional command-index audit

All 818 Appendix G rows are retained across 20 small page files. This is a
locator reconciliation against the 6091e09 inventory baseline, not another
language inventory or a grammar input. BASIC stays at 728 entries/44 sections.

source.json pins the extract, boundaries, page files, surface totals and finding
counts. Each row preserves its printed spelling/role/target, source line,
resolved language surface and exact inventory references, including kind.
Interface references deliberately remain empty in this frozen baseline. The
later interface/index.json overlay maps all 69 rows to their definitions.

See [the review](../../docs/command-index-review.md) for definition evidence and
limits. Regenerate with scripts/audit-command-index.py --source PATH; use
--check to verify exact source replay without writing. Unexpected or unmapped
rows fail. The held primary extract is external to this repository; CI validates
the retained records and references, not a download of that source.
