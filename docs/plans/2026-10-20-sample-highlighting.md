# Sample playback and management highlighting

Approved continuation after the music/basic sound pass.

1. Read Professional §8.2 against the pinned extract. Add ten named forms to
   specifications/manual-core/08-02.json with exact heading/page citations and
   fresh examples. Retain Sam Swap's To/comma discrepancy and the run-together
   SAMRAW prose spelling without inferring aliases or runtime semantics. Update
   source.json and inventory totals; reproduce missing scopes before editing.
2. Extend syntaxes/amos.tmLanguage.json with sample command phrases, Sload/Ssave
   and the Sam Swapped function. Preserve phrase boundaries, existing Sample and
   Swap forms, strings/comments and labels. Sync/recompose using the existing
   scripts. Add examples/samples.amos.txt and tests/highlighting-samples.test.mjs
   for both profiles/themes, overload examples, nested expressions, unknown
   lookalikes and opaque payloads. Update the earlier music test's intentionally
   unknown Sam Bank example now that the documented phrase is covered.
3. Update README, editor README, inventory README and coverage/provenance/evidence
   docs. Run package/editor checks and all integrations in both existing consumers.
   Remove Sam Swapped's function rule to prove a failing check, then restore it.
   Build and inspect npm/VSIX contents and render extracted registrations. Commit,
   push, read CI results and clean /private/tmp/lang198x-samples task outputs.

No dependency, parser change, native audio/memory/file I/O, version bump,
publication or Marketplace change. Tracker/MED and speech remain later passes.

Outcome: ten cited forms bring BASIC to 521 entries; none passed complete phrase
checks before the change. All 22 package checks and 100 integrations per existing
consumer pass. The missing-Sam-Swapped control fails, and restored editor/profile
copies pass. Inspected npm/VSIX contents match source; extracted registrations
render all modes in both themes with sample function scopes intact.
