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
