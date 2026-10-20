# Music playback and basic sound highlighting

Approved continuation of the manual-led highlighting sweep.

1. Inventory §8.1 in `specifications/manual-core/08-01.json`, using the pinned
   Professional extract and checking the five music playback forms against §8.3.
   Retain the repeated MVOLUME tempo wording and the voice-table discrepancy as
   source notes. Update source.json and inventory count tests. Reproduce gaps
   against the unchanged grammar before editing it.
2. Extend `syntaxes/amos.tmLanguage.json` with complete music/sound phrases and
   Vumeter, preserving longer phrases, identifier boundaries and label exclusions.
   Recompose/synchronise through scripts/sync-editor.mjs. Add a fresh mixed
   `examples/music.amos.txt` and `tests/highlighting-music.test.mjs` checking both
   profiles/themes, command/function roles, payload protection and boundaries.
3. Update README, editor README, inventory README, coverage, provenance and
   verification. Run package/editor checks and full integrations against both
   existing consumers. Remove a new rule to prove a coverage check fails, restore
   it and rerun. Build/inspect npm and VSIX archives, render extracted npm modes,
   commit/push and inspect CI. Clean task outputs in /private/tmp/lang198x-music.

Sample assignment appears in §8.1; sample playback/management (§8.2), tracker/MED
facilities (§8.3) and speech remain later sweeps. No dependency, parser behaviour,
version bump, publication, Marketplace change or native execution is included.


Outcome: 21 cited entries bring BASIC to 511; five already passed before the
change. All 22 package/inventory checks and 94 integrations per existing consumer
pass, with exact editor copies. The missing-Vumeter negative control fails as
intended. Disposable archives retain exact grammars/icon/configuration and no
public flag, and extracted npm imports render all modes in both themes.
