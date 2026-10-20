# Manual sweep: memory banks, drawing and menus

Cover the approved Professional manual §§5.9, 6.4 and 6.5. Keep releases and
Marketplace availability unchanged; add no dependency, parser or native trial.

1. Inventory named forms with pages, held-extract lines and original examples in
   `specifications/manual-core/{05-09,06-04,06-05}.json`; extend source metadata.
   Record embedded menu commands separately from BASIC vocabulary. Inspect
   grouped headings and preserve category ambiguity rather than guessing context.
2. Extend metadata and lexical checks, retaining the earlier 109/171/262 counts.
   Reproduce missing forms before changing the canonical TextMate grammar. Match
   long phrases before existing short commands; synchronise the editor copy.
   Colour has command/function uses: retain both with the neutral scope used for
   Screen. Menu$ keeps its reserved-variable scope for menu definitions, including
   the manual's instruction-labelled description of advanced assignments.
3. Add a small independent mixed listing and focused tests for bank queries,
   Reserve variants, Load/Save versus Load/Save Iff, assignable Colour, menus,
   callback identifiers, prefixes and literal embedded menu payloads. Preserve
   full-game expectations. Disable one new rule to prove a check fails; restore.
4. Verify source hashes and all entry/page bindings, both existing highlighting
   consumers and themes, package checks, editor sync and actual npm/VSIX contents.
   Update README, coverage, provenance and verification documents. Commit/push,
   inspect CI results, and remove disposable build/cache files before finishing.

Embedded menu strings are a distinct mini-language. Recording their vocabulary
here does not commission parsing or highlighting inside string literals. Memory
sizes, pointer safety, argument overloads and original execution remain unqualified.
Objects/animation, general file I/O and edition/extension qualification remain
later work. Reuse current chapter/helper/test conventions; no new framework.

Outcome: 25 bank, 27 drawing and 35 menu entries add 87 to the earlier 262.
Fourteen embedded forms remain a separate inventory. Six new BASIC entries
passed before expansion; all 349 now pass, with all 363 cited bindings verified.
Menu$'s disabled rule produces the expected precise failure before restoration.
Forty-eight integrations pass in each existing consumer and six package checks
pass. Actual npm/VSIX contents retain grammar/icon bytes and omit public flags;
the extracted npm registration preserves the mixed listing and critical scopes.
