# Bounded highlighting readiness review

1. Review the pinned Professional manual and original tokenizer source for BASIC
   numbers, labels, comments and spacing boundaries. Record exact citations,
   reproducible pre-change scopes and qualified/unknown behavior under
   specifications/readiness/lexical-source.json and docs/highlighting-readiness.md;
   replay with scripts/check-readiness-source.py and tests/readiness-source.test.mjs. Reproduce bugs
   before changing syntaxes/amos.tmLanguage.json; make only source-backed lexical
   fixes, synchronise with scripts/sync-editor.mjs, and add focused integration
   tests. Keep parser and edition/extension qualification unchanged.
2. Locate independent public plain-text AMOS programs, pin immutable revisions,
   hashes and provenance/licence limits in corpus/independent/sources.json.
   Retain licensed ASCII inputs and both notices under corpus/independent/, with
   tests/highlighting-readiness-corpus.test.mjs for reviewed ranges. Exercise
   source preservation and independently reviewed scope spans through both BASIC
   modes/themes and existing consumers. Avoid redistributing source without clear
   rights; use temporary source downloads plus retained hashes/ranges if needed.
   No native media, new dependency or decoder is commissioned.
3. Build npm/VSIX artifacts and install the extension in an isolated VS Code
   instance under /private/tmp/lang198x-highlighting-readiness. Inspect BASIC,
   optional 3D, AMAL and Interface in dark/light themes. Verify language selection,
   automatic .amos.txt detection and comment/string/label/number appearance.
   Preserve existing editor sessions/settings. Retain only inspected captures
   free of unrelated/private content; report any unverified UI boundary plainly.
4. Update README.md, editors/vscode/README.md, docs/coverage.md,
   docs/highlighting-gaps.md and docs/verification.md with the exact Professional-
   based preview scope and evidence. Produce a concrete release recommendation
   in docs/highlighting-readiness.md, with residual gaps clearly bounded.
   Run fail-capable regression controls, package/editor/source checks, both serial
   consumer suites and archive-byte/extracted-render checks. Commit/push each
   self-contained completed change, inspect CI, stop task-owned editor processes
   and remove inspected temporary outputs after remote retention.

No version bump, public Marketplace action, npm publication, parser expansion,
new dependency, native format codec or compiler. Public release remains a
separate decision after this review.

Outcome: fixed reproduced BASIC number, line-label, quote and numbered/inline Rem
scope bugs, retaining pinned original-source evidence. Corrected a source-
contradicted old label expectation and one handwritten SM corpus annotation.
Both final consumer suites pass 264/264; all 35 package checks, source replay,
sync and Ruff pass. Two independent programs retain 116 reviewed ranges plus
76 numeric stress cases. Four native editor modes pass bounded dark/light review;
the final inline Rem correction was reinstalled/reloaded and visually checked.
All 23 npm files and eleven VSIX assets match source, with extracted renders
through each consumer. The readiness recommendation is a Professional-based
public preview with explicit residual limits; no publication is authorised here.
