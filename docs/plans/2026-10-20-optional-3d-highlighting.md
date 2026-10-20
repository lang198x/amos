# Implement the approved optional 3D highlighting profile

1. Add `syntaxes/extensions/amos-3d.json` with command/function rules. Add explicit
   composition in `scripts/compose-3d.mjs`; integrate its stale-output check with
   `scripts/sync-editor.mjs`. Emit `syntaxes/amos-3d.tmLanguage.json` without
   changing the base grammar. Verify byte identity of shared rules.
2. Add `amos-3d.mjs`/`.d.ts`, additive package exports/files, a second language and
   grammar in `editors/vscode/package.json`, and include it in the VSIX packager.
   Keep automatic file associations with AMOS. Verify registration and built
   npm/VSIX contents, without publishing or replacing retained versioned assets.
3. Add focused package checks, an independent mixed fixture, and integration
   checks for all 59 records, profile isolation, negative boundaries/literals,
   longest forms and BASIC regressions. Run both existing consumers/themes;
   missing installations must fail, never skip. Run package/editor/Ruff checks.
4. Document opt-in use and evidence limits, commit/push, inspect CI and remove
   temporary package/build outputs after verifying retained evidence.

No dependencies, sibling changes, native execution, parser or release changes.


Outcome: implemented the two declarative modes, additive npm subpaths and shared
canonical composition. Twenty package/inventory checks and 74 integrations per
existing consumer installation pass, with both themes. A missing World Z rule
fails the inventory-driven integration check. Extracted npm imports render and
type-check; the VSIX has both exact grammars. BASIC grammar bytes and full-game
scopes/colours are unchanged. No publication or native/visual execution claim.
