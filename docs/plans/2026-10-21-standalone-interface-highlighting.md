# Standalone opt-in Interface highlighting

1. Record the approved shape in decisions/standalone-interface-highlighting.md.
   Implement syntaxes/interface.tmLanguage.json with capital-pair rules for the
   68 codes: command/structure, function and neutral SW roles; lowercase padding,
   opaque quotes, integer/binary/hex numbers, P1–P9, documented operators including
   NEg, separators and square brackets. Unknown pairs/single capitals stay neutral.
   No semantic validation or BASIC-string injection. Keep Min/Max/Call uncertain.
2. Add interface.mjs/interface.d.ts, npm exports/files and the explicit
   amos-interface editor mode/configuration. Extend scripts/sync-editor.mjs and
   scripts/package-editor.py for exact canonical bytes. No new associations,
   versions, dependencies or public flags; retain all existing grammar bytes.
3. Add tests/interface-package.test.mjs to package checks, extend the explicit
   mode list in tests/amos-3d-package.test.mjs, and split Interface
   integration tests for vocabulary and lexical boundaries. Exercise every one of
   69 inventory records in both themes, compact/padded forms, SW/AR/AS, unknown
   pairs, strings/recovery, numbers/operators/parameters, bracket/terminator
   limits, BASIC opacity and source-preserving HTML through both existing
   consumers. Add specifications/interface/highlighting.interface.txt as an
   independent illustrative listing, without claiming native acceptance.
4. Update README.md, editors/vscode/README.md, docs/interface-inventory.md,
   docs/coverage.md, docs/provenance.md, docs/highlighting-gaps.md,
   docs/command-index-review.md and docs/manual-reconciliation.md to state
   current lexical scope and preserve source questions. Record observed checks
   in docs/verification.md. Run source replay, package/editor checks, fail-capable
   disabled-pattern and stale-copy controls, serial consumer suites and npm/VSIX
   source-byte/render checks for all four modes. Commit/push, inspect CI and clean
   /private/tmp/lang198x-standalone-interface after retaining evidence.

Outcome: the opt-in mode covers all 69 records/68 codes in both themes. Missing-PR
and stale-editor controls fail; restoration passes 33 package checks, sync,
primary/index replay and Ruff. Both full consumer suites pass 255/255; all four
extracted modes preserve source/scopes/styles in both themes through each
consumer. Twenty-two npm files and eleven VSIX assets match source bytes.
Existing six grammar files are unchanged. No parser/version/publication change.
