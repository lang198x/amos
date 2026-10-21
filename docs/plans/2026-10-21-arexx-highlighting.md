# AREXX integration highlighting

Approved continuation after serial/parallel. Cover the seven named AMOS-facing
forms in Professional §10.6; do not implement the separate AREXX language.

1. Add specifications/manual-core/10-06.json with exact heading/page citations,
   documented command/function roles, fresh examples and limits. Record blank
   CLI example blocks and keep startup Exec plus Ask/Call Editor references for
   their own definitions in later sweeps. Update source.json and inventory tests.
   Measure existing complete scopes before changing grammar.
2. Extend syntaxes/amos.tmLanguage.json with Arexx Open/Close/Wait/Answer commands,
   Arexx Exist and distinct Arexx/Arexx$ functions. Preserve longest forms, typed
   boundaries and labels, strings/comments. Recompose/sync existing profiles.
   Add examples/arexx.amos.txt and tests/highlighting-arexx.test.mjs for both
   profiles/themes: message queries, reply variants, nested calls, typed lookalikes,
   port/message payloads and fresh rendering. No external scripts are interpreted.
3. Update README/editor/inventory, coverage/provenance/verification and gap routing.
   Run all package/editor and two-consumer checks; remove the new command rule to
   prove failure, restore and verify. Build/inspect npm/VSIX contents and render
   extracted modes. Commit/push, inspect CI and clean /private/tmp/lang198x-arexx.

No dependency, parser, native ports/process launch, script execution, release bump,
publication or Marketplace change. OS/library availability, response obligations,
port names, result codes and native behavior remain unqualified.

Outcome: seven cited forms bring BASIC to 629 entries across 33 chapters. All
25 package checks and 155 integrations per existing consumer pass. Missing-rule
control, editor sync, exact archive inspection and extracted-mode rendering pass.
The seven named headings/pages were checked against the pinned extract.
