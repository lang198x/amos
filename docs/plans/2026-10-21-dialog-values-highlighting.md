# Interface-facing zone values and controls

Continue §9.3 with nine BASIC forms: Rdialog/Rdialog$, Vdialog/Vdialog$, Array,
Dialog Update/Freeze/Unfreeze/Clr. Keep embedded Interface strings opaque.

1. Extend specifications/manual-core/09-03.json with exact heading/page bindings
   and fresh examples. Retain Vdialog/Vdialog$ function headings in reads/writes;
   note swapped short descriptions versus numeric/string signatures/prose. Verify
   source hash and missing scopes before grammar changes.
2. Add canonical command/function phrases and bare-name label exclusions, sync
   combined/editor assets, add tests/highlighting-dialog-values.test.mjs and
   examples/dialog-values.amos.txt. Check dollar boundaries, read/write/nested
   contexts, optional freeze channels, update variants, Array versus embedded
   ArrayRead, longest phrases, strings/comments and recovery. Keep prior entry-
   point tests focused on their six forms rather than pinning new forms as missing.
3. Update source/docs/tests to 686 entries across 40 chapter/appendix sections.
   Record fourteen BASIC headings in §9.3 without claiming embedded coverage.
   Run package/editor checks, both consumers, a missing-rule failure control,
   package byte checks and extracted rendering. Commit/push, inspect CI and clean
   /private/tmp/lang198x-dialog-values. Eight catalogue gaps remain unchanged.

No dependencies, parser/API change, embedded language mode, native Interface
execution, version bump or publication. Types, memory addresses, zone/channel
validity, update/freeze semantics and event results remain unqualified.

Outcome: all fourteen retained/new BASIC headings/pages match the pinned extract;
the nine new forms lacked scopes before changes. Package checks pass 25/25 and
both consumers pass 207/207 integrations. Missing-rule controls fail both profiles;
restoration passes. Package source bytes and extracted all-mode/two-theme rendering
pass, with exact source and Vdialog$ assignment scope retained. No native execution
or publication occurred. Remove task outputs after remote/CI retention.
