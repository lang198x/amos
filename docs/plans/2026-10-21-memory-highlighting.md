# Direct memory read/write vocabulary

Add eight Appendix A forms: Peek/Poke, Deek/Doke, Leek/Loke, Peek$/Poke$.
Keep Copy/Fill/Hunt, Varptr, bit operations and machine-code calls for later work.

1. Add specifications/manual-core/14-A.json with exact heading/page bindings and
   fresh examples. Verify pinned extract and missing scopes first. Record PEEKS
   prose versus Peek$ heading; do not infer an alias or native memory semantics.
2. Add canonical command/function rules with dollar boundaries and label exclusions,
   sync combined/editor profiles, and allow explicit 14.A citations beside 14.B.
   Add tests/highlighting-memory.test.mjs and examples/memory.amos.txt for typed
   variants, expressions, statement composition, opaque strings/comments and
   line recovery. No reads/writes execute.
3. Update docs/tests/source to 698 entries across 42 partial/full chapter/appendix
   sections. Four catalogue memory gaps close; four Copper gaps remain. Run
   package/editor checks, both consumer suites, a missing-rule failure control,
   npm/VSIX byte checks and extracted rendering. Commit/push, inspect CI and
   remove /private/tmp/lang198x-memory outputs.

No dependencies, parser/API changes, native memory operations, numeric-notation
change, version bump or publication. Address validity/alignment, widths, signed
results, string bounds/stop behavior and runtime compatibility remain unqualified.

Outcome: all eight headings/pages and before-change gaps verified. Package checks
pass 25/25 and both consumers pass 219/219 integrations. Missing-rule controls
fail both profiles; restoration passes. npm/VSIX source bytes and extracted
all-mode/two-theme rendering pass, preserving source and Poke$ scope. No native
execution or publication occurred. Remove task outputs after remote/CI retention.
