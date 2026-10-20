# Tracker and MED highlighting

Approved continuation of the manual-led music sweep.

1. Inventory all 15 named §8.3 forms in specifications/manual-core/08-03.json,
   including five AMOS music forms already recorded as §8.1 cross-references.
   Check heading/page bindings against the pinned extract; retain the MMDO/MMD1
   prose and Track Load signature/example discrepancy as documentary notes.
   Update source.json and inventory totals. Measure existing coverage first.
2. Add the ten missing Track/Med command phrases to syntaxes/amos.tmLanguage.json.
   Recompose/synchronise using scripts/sync-editor.mjs. Add
   examples/music-modules.amos.txt and tests/highlighting-music-modules.test.mjs
   for both profiles/themes: complete phrases, omitted arguments, boundaries,
   existing Music controls, strings/comments and independent mixed rendering.
3. Update current README/editor/inventory and coverage/provenance/verification
   docs. Run package/editor and both existing consumer suites, remove Med Midi On
   to prove a failing control, then restore. Build/inspect npm and VSIX archives
   and render extracted npm modes. Commit/push, read CI and clean task outputs in
   /private/tmp/lang198x-music-modules.

No dependency, parser change, runtime module/library loading, audio/MIDI test,
version bump, publication or Marketplace change. Speech is a later pass.

Outcome: 15 chapter entries (five overlapping §8.1) bring BASIC to 536. All 22
package/inventory checks and 106 integrations per existing consumer pass. The
missing-Med-Midi-On control fails, and restored profile/editor copies pass.
Inspected npm/VSIX contents match source, and extracted registrations render
all modes in both themes with the module command scope intact.
