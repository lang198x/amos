# Icons/blocks, fonts and error handling

Approved sequence after the gap review: §7.7, §11.1, then §12.2. Deliver each as a
self-contained verified commit and push it before starting the next chapter.

For each chapter:
1. Read the pinned Professional extract. Add its cited inventory at
   specifications/manual-core/{07-07,11-01,12-02}.json with fresh examples and
   discrepancy notes. Update source.json and the two manual inventory/count tests.
   Measure previous complete-scope coverage before changing grammar.
2. Extend syntaxes/amos.tmLanguage.json with bounded phrases/roles, preserving
   labels, typed boundaries, longest phrases, strings/comments and existing forms.
   Recompose/sync through scripts/sync-editor.mjs. Add independent fixtures at
   examples/{icons-blocks,fonts,error-handling}.amos.txt and focused suites at
   tests/highlighting-{icons-blocks,fonts,error-handling}.test.mjs, exercising all
   entries in both profiles/themes and chapter-specific interactions.
3. Update README, editor README, inventory README, coverage/provenance/verification
   and the gap review's current status. Run 22 package checks, editor sync and both
   existing consumer suites. Prove a missing-rule failure and restore it. Build
   npm/VSIX archives, inspect exact packaged bytes and render extracted modes.
   Commit/push, inspect CI and continue to the next chapter.

§7.7: Get Icon Palette before Get Icon/bare Get; Hrev/Vrev Block commands versus
image functions. §11.1: full font/metric phrases before bare Text; retain Assign;
record incorrect Xtext/Ytext conversion signatures. §12.2: full On Error/Resume
forms; Trap immediately precedes another command; Err$ remains typed and targets
unresolved. Record suspect source prose without semantic validation.

No dependencies, parser/runtime changes, release bump, publication or Marketplace
change. Shared disposable task workspace: /private/tmp/lang198x-ordered-sweeps;
inspect and remove its archives/cache/consumer/scripts before final completion.

§7.7 outcome: 15 entries, total 558 across 27 chapters. 22 package checks and
118 integrations per consumer pass; missing-rule control and package inspection
pass. Native graphics remain unqualified.

§11.1 outcome: 13 entries (Assign overlaps §10.2), total 571 across 28 chapters.
22 package checks and 125 integrations per consumer pass. The old partial Text
expectation now recognises its documented command prefix. Missing-rule control,
archive byte inspection and extracted-mode rendering pass.

§12.2 outcome: 11 entries, total 582 across 29 chapters. 22 package checks and
131 integrations per consumer pass, with Trap composition and unresolved-target
checks. Missing-rule control, archive byte inspection and extracted rendering
pass. The gap review records completion and preserves the original audit baseline.
