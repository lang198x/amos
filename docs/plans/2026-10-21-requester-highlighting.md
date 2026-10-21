# Requester Extension controls

Add Request Wb, Request On and Request Off from Professional §11.5 p.11.05.06
using existing lexical profiles. Preserve their explicit manual-labelled component
without inferring installed extension versions or native requester behavior.

1. Extend specifications/manual-core/11-05.json with the three heading/page
   bindings and Requester Extension component. Verify against the pinned extract
   and measure missing scopes first. Update tests/manual-core.test.mjs to enforce
   exact component attribution; preserve the thirteen library and nine device forms.
2. Add the complete Request phrases to syntaxes/amos.tmLanguage.json and sync
   editor/combined mode. Add tests/highlighting-requesters.test.mjs and
   examples/requesters.amos.txt for case/spacing, suffix boundaries, bare Request,
   existing On/Off words, opaque comments/strings, Trap composition, line recovery
   and mixed rendering. Update prior tests that deliberately expected missing forms.
3. Update current source/count documentation to 664 entries across 35 chapters,
   with 25 named §11.5 headings covered. Dev D0's example mention still awaits its
   own definition; no broad chapter-completeness claim follows. Run package/editor
   checks, both consumer suites and a missing-rule failure control. Inspect built
   npm/VSIX bytes and extracted rendering, commit/push, inspect CI and clean
   /private/tmp/lang198x-requesters outputs.

No dependencies, parser/API change, original execution, display settings, version
bump or publishing. Marketplace remains private. Requester visibility, cancellation,
Workbench routing and extension release compatibility remain unqualified.

Outcome: all 25 named §11.5 headings/page bindings and the Requester Extension
section heading match the pinned extract. All three new forms lacked complete
scopes before implementation. Package checks pass 25/25 and both consumers pass
177/177 integrations. Missing-rule controls fail both profiles; restoration
passes. Archive source bytes and extracted all-mode/two-theme rendering pass,
with exact source and Request Wb scope retained. No native settings or publication
changed. Remove inspected disposable outputs after remote/CI retention.
