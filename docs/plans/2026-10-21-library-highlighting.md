# Library, equate and structure highlighting

Continue §11.5 in the existing manual-led modes. This slice covers thirteen
named library/equate/structure forms on pp.11.05.01–05. Device I/O and the
explicit Requester Extension remain later bounded work.

1. Add specifications/manual-core/11-05.json with this partial chapter scope,
   exact heading/page bindings, examples and role notes. Check all thirteen
   against the pinned extract; measure their scopes before editing grammar.
2. Add Lib Open/Close and Set Equate Bank commands, Lib Call/Base and direct
   library-call functions, Lvo/Equ functions, Struc reserved variable and Struc$
   function. Preserve typed boundaries and opaque, case-sensitive name strings.
   Sync canonical/editor profiles. Add tests/highlighting-libraries.test.mjs and
   specifications/manual-core/examples/libraries.amos.txt with read/write, nested
   and adjacent existing forms. Keep native ABI and name resolution unqualified.
3. Update source.json, inventory/current docs and tests for 652 entries across
   35 partially or fully inventoried chapters. Run package/editor checks, both
   consumers in both modes/themes, and a missing-rule failure control. Inspect
   built npm/VSIX bytes and extracted rendering. Commit/push, inspect CI and
   remove /private/tmp/lang198x-libraries outputs.

No dependencies, parser change, library execution, version bump or publication.
Struc$ retains the manual's function label in reads and assignments; Struc keeps
its reserved-variable label. Lexical colour does not validate structure types,
registers, offsets, library availability, editions or equate names.

Outcome: all thirteen headings/page bindings and the before-change missing-scope
baseline were checked. Package checks pass 25/25 and both consumers pass 167/167
integrations. Removing the library command rule fails both profiles; restored
rules pass. npm/VSIX bytes match source and extracted exports preserve source,
render all modes/themes and retain both structure roles. No publication or native
execution was performed. Remove inspected task outputs after remote/CI retention.
