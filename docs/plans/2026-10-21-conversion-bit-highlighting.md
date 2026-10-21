# Appendix A conversion and bit operations

1. Verify the pinned manual headings/pages for Bin$, Hex$, Rol.B/W/L,
   Ror.B/W/L, Btst, Bset, Bchg and Bclr; measure their scopes before editing.
   Add twelve records to specifications/manual-core/14-A.json (714 total).
2. Add focused command/function rules to syntaxes/amos.tmLanguage.json and
   synchronise combined/editor copies. Add tests/highlighting-bits.test.mjs and
   examples/bits.amos.txt for cases, suffixes, dotted boundaries, opaque payloads,
   line recovery and both existing consumers. Keep the prior block tests bounded;
   normalise dots to underscores in generated identifier lookalikes, and test
   actual malformed dotted spellings separately without treating them as names.
3. Update current source/coverage/provenance docs. Run package/editor checks,
   both complete consumer suites sequentially, a missing-rule failure control,
   npm/VSIX byte checks and extracted-package rendering. Commit/push, inspect CI,
   remove /private/tmp/lang198x-bits task outputs.

No dependencies, parser change, numeric-notation expansion, native operation,
version bump or publication. Rotation arithmetic, bit/address semantics and
version compatibility remain unqualified; four Copper catalogue gaps remain.

Outcome: all 24 Appendix A heading/page bindings match the pinned extract.
Twelve new forms lacked scopes before implementation. Package checks pass
25/25; both existing consumers pass 229/229 integrations. Removing the new
command rule fails both profiles; restoration passes. npm/VSIX source bytes,
extracted exports, all-mode/two-theme rendering and source preservation pass.
No native execution or publication occurred. Remove task outputs after remote
and CI retention have been verified.
