# Speech highlighting

Approved continuation after tracker/MED music.

1. Add seven named Professional §11.2 forms in
   specifications/manual-core/11-02.json, using exact heading/page citations from
   the pinned extract and fresh examples. Retain command/function roles: Say,
   Set Talk, Talk Misc/Stop and Mouth Width/Height/Read. Note omitted style
   parameters and narrator/multitasking context without claiming runtime support.
   Update source.json and inventory totals; reproduce gaps first.
2. Extend syntaxes/amos.tmLanguage.json with the four commands and three functions.
   Keep complete phrases, case/tab and typed identifier boundaries, standalone Say
   versus labels, and strings/comments intact. Sync/recompose existing profiles.
   Add examples/speech.amos.txt and tests/highlighting-speech.test.mjs for both
   profiles/themes, Say mode forms, omitted Set Talk parameters, mouth expressions,
   lookalikes, payloads and fresh rendering.
3. Update current README/editor/inventory and coverage/provenance/verification docs.
   Run package/editor and both consumer suites. Remove Mouth Read to demonstrate
   failure, restore and verify. Build/inspect npm/VSIX files and render extracted
   registrations. Commit/push, read CI and clean /private/tmp/lang198x-speech.

No dependency, parser behavior, narrator installation, spoken audio, native timing
or mouth animation, version bump, publication or Marketplace change.

Outcome: seven cited forms bring BASIC to 543 entries. All 22 package/inventory
checks and 112 integrations per existing consumer pass. Removing Mouth Read
fails the focused suite; restored canonical/profile/editor files pass.
Inspected npm/VSIX files match source; extracted registrations render all modes
in both themes and retain the speech function scope.
