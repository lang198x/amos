# Memory blocks and variable addresses

Add the approved Copy, Fill, Hunt and Varptr Appendix A definitions.

1. Extend specifications/manual-core/14-A.json with exact headings/pages and
   fresh range/address examples; verify pinned extract and missing scopes before
   edits. Record Hunt's INSTR$ prose versus existing Instr heading without alias
   or semantic inference. Keep representation/lifetime claims unqualified.
2. Add canonical Copy/Fill commands and Hunt/Varptr functions with label/boundary
   guards; sync editor/combined assets. Add tests/highlighting-memory-blocks.test.mjs
   and examples/memory-blocks.amos.txt for To connectives, nested expressions,
   variable-address arguments, typed lookalikes, Trap, strings/comments and recovery.
   Keep prior direct-memory tests focused on their eight forms and remove old
   missing-Hunt/Varptr expectations.
3. Update current docs/source/tests to 702 entries across 42 partial/full chapter/
   appendix sections. Four Copper catalogue gaps remain. Run package/editor
   checks, both consumers, missing-rule controls, npm/VSIX source bytes and
   extracted rendering. Commit/push, inspect CI and clean
   /private/tmp/lang198x-memory-blocks outputs.

No dependencies, parser/API change, memory operation, numeric-notation change,
version bump or publication. Addresses, range endpoints, overlap/alignment,
patterns, search results and variable layout/address lifetime are unqualified.

Outcome: all twelve retained/new headings/pages match the pinned extract; four
new forms lacked scopes before implementation. Package checks pass 25/25 and
both consumers pass 224/224 integrations. Missing-rule controls fail both profiles;
restoration passes. Package bytes and extracted all-mode/two-theme rendering pass,
preserving source and Varptr scope. No native execution or publication occurred.
Remove task outputs after remote/CI retention.
