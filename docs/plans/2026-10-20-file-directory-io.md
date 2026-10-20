# Continue the manual sweep with file and directory I/O

Approved after highlighting preview 0.2.0. Inventory Professional §10.2, then
add lexical coverage; parser, release versions and Marketplace remain unchanged.

1. Read the hash-pinned held extract, pp.10.02.01–18. Add
   `specifications/manual-core/10-02.json` with exact heading/signature citations,
   fresh examples and ambiguity notes. Update `source.json`, inventory totals in
   `tests/manual-core.test.mjs` and `tests/highlighting-manual.test.mjs`, and the
   inventory README. Preserve source defects without accepting invented aliases.
2. Reproduce missing scopes against the unchanged grammar. Add file forms to
   `syntaxes/amos.tmLanguage.json`, including channel markers, readable/assignable
   variables and a narrow directory-listing context for /W. Keep longer existing
   Get/Put forms and strings/comments intact. Recompose both editor/profile copies
   using `scripts/sync-editor.mjs`.
3. Add `examples/file-io.amos.txt` and `tests/highlighting-file-io.test.mjs` for
   directory paths/options, channel operations, records/As, function expressions,
   include/program filenames, boundaries and literals. Extend the shared inventory
   helper only where punctuated forms require it; identifier checks still apply
   to actual identifier spellings. Check both modes and existing consumers/themes.
4. Update current coverage/provenance/verification docs with counts and limits.
   Run package/editor checks and full integrations, prove a missing rule fails,
   inspect built npm/VSIX grammars and exercise extracted imports. Commit/push and
   inspect CI. Remove task-owned package/cache/consumer outputs afterwards.

No new dependency, parser implementation, actual filesystem I/O in AMOS, native
execution, publication, replacement release asset or Marketplace change.
Temporary workspace, if needed: `/private/tmp/lang198x-file-io/`.


Outcome: 38 cited entries bring the BASIC inventory to 490. One complete form
(Input$) passed before the change. The new chapter and focused checks pass, as
do 20 package/inventory checks and 80 integrations per existing consumer. The
missing-Eof negative control fails as intended. Disposable package grammars and
icon/registrations match source; extracted npm rendering passes in both profiles
and themes. Published 0.2.0 assets and parser/Marketplace scope are unchanged.
