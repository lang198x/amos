# Highlight the complete Bank or Risk listing

Steve approved this bounded coverage milestone. Marketplace availability stays
private; completion does not automatically authorise public release.

1. Retain the pinned 416-line MIT source in `corpus/highlighting/` with its
   SHA-256, attribution and independently reviewed vocabulary/occurrence inventory.
   Inspect expressions, inline statements, logical operators and labels as well
   as physical-line heads. Record primary-manual sections in `docs/provenance.md`.
2. Fix demonstrated boundary gaps before adding vocabulary. Add focused tests in
   `tests/highlighting-boundaries.test.mjs` and a small shared test helper. Protect
   variable suffixes, larger identifiers, strings/comments and whole multiword
   forms. Run against existing Shiki and shiki-highlights installations.
3. Extend canonical `syntaxes/amos.tmLanguage.json` in control/data, display and
   sound/input groups. Use existing TextMate repositories, not a new grammar
   framework. Check each group before committing/pushing. Labels get lexical
   definition scopes; do not pretend Gosub expressions resolve to labels.
4. Test every inventory occurrence in the full source in dark/light themes,
   reconstruct exact text and check array names stay identifiers. Disable one
   added pattern to prove the coverage assertion fails, then restore it.
5. Synchronise the editor grammar; update coverage/provenance/verification docs.
   Build and inspect VSIX and npm tarball, with no Public gallery flag. Keep
   published versioned assets unchanged; no registry publication is commissioned
   by this coverage work. No parser changes or dependency additions.
6. Commit/push verified changes, read CI results and remove disposable build files.

Primary reference: the original AMOS Professional User Guide (1992), preserved
by Amiga Source Code Preservation. Version-independent compatibility is not
inferred from manual syntax or highlighting. Creator/Easy qualification remains
separate work.

## Outcome

All three vocabulary groups are implemented and synchronised to the editor.
The pinned game has 398 independently inventoried scope occurrences, including
functions in expressions, logical operators and six label definitions. Both
themes preserve every source character; all four array references remain names.
An intentionally disabled Screen Copy rule failed at source line 414 and was
restored. Scope checks also reject borrowing a neighbouring fragment's scope
when a theme combines tokens of equal style.

Four package checks and fourteen integration tests pass with existing Shiki
4.4.3 and both existing shiki-highlight-api 1.3.0/local 2.0.0. The built npm
registration renders the full game in both themes. npm/VSIX grammar bytes and
VSIX icon/public-flag metadata were inspected. No dependency, parser change,
new registry release or Marketplace upload was made. The original physical-line
audit remains a historical baseline. Wider vocabulary, language variants,
extension languages and numeric forms remain explicit gaps.

Disposable artifacts are local build checks, not replacements for released
0.1.0/0.1.1 assets. Remove the task npm cache, extracted consumer and dist before
finishing; no background process or worktree was created.
