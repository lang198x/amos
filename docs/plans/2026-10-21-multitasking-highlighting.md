# Multitasking and inter-program communication

Approved continuation after AREXX. Cover the ten named forms in Professional
§11.4 using the existing manual-led lexical modes and verification process.

1. Add specifications/manual-core/11-04.json with exact heading/page bindings,
   fresh examples and notes. Retain the chapter's COMMAND LINES wording versus
   the existing Command Line$ inventory, and the Exec signature versus its earlier
   one-argument AREXX example. No argument or lifecycle rules are inferred.
   Update source.json and inventory counts; measure previous scopes first.
2. Add canonical Multi Wait, Amos To Back/Front/Lock/Unlock and Prun/Exec commands,
   plus Amos Here and Prg Under/State functions. Preserve longest phrases,
   identifier/label boundaries, strings/comments and existing AREXX/bank forms.
   Sync profiles/editor. Add examples/multitasking.amos.txt and
   tests/highlighting-multitasking.test.mjs for both modes/themes, opaque command
   and output-device strings, nested queries, Trap composition and fresh rendering.
3. Update current documentation and remaining-gap routing. Run package/editor and
   both consumer suites, prove a missing-command failure and restore. Build/inspect
   npm/VSIX bytes and render extracted registrations. Commit/push, inspect CI and
   clean /private/tmp/lang198x-multitasking task outputs.

No dependencies, parser behavior, process launch, display/system settings,
program loading, native timing, publication, version bump or Marketplace change.
Ask/Call Editor references remain for their own definitions in later work.

Verification adjustment: parallel test workers exposed Shiki 4.4.3's explanation
failure, `Cannot read properties of undefined (reading 'startIndex')`, in varying
existing tests. Shiki runs separate scope/encoded passes with a default 500 ms
budget. A diagnostic with a 1 ms budget observed scopes stoppedEarly and reproduced
the exact error. Sequential file execution passed all 161 tests. Bound the normal
integration command to --test-concurrency=1; keep every file/assertion, default
Shiki deadline and existing dependencies unchanged. No unrelated host processes
are stopped and no third-party installation is modified.

Outcome: ten headings/pages verified against the SHA-256-pinned manual; 25 package
checks and 161 integrations per existing consumer pass. Missing-command negative
control fails and restoration passes. npm/VSIX source bytes and extracted-export
rendering pass, including all three modes and both themes. No native execution or
publishing was performed. Task outputs are disposable and removed after push/CI.
