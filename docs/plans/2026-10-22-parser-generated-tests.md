# Test the current source contract

Use the approved proptest development dependency and a separate cargo-fuzz
workspace with libfuzzer-sys. Production code and dependencies stay unchanged.
Do not expand the parser grammar in this step.

1. Add `tests/support/invariants.rs`. Check that tokens partition the source,
   every range is within UTF-8 boundaries, and child ranges stay within their
   statement. Repeat parsing and checking to test determinism. Both generated
   tests and fuzzing call these same contract checks.
2. Add `tests/properties.rs`. Generate Unicode text, spelling/space/newline
   variants of supported programs, and broken/unknown statements followed by
   End. Check recovery and the independent expected statement shapes. Retain
   minimized failures through proptest's normal regression files.
3. Add a separate `fuzz/` workspace, a `source_contract` target and authored seed
   listings. Use generated UTF-8 strings at the harness boundary. Run the contract
   checks on every valid input. Bound the first run to 60 seconds, 4 KiB inputs,
   a two-second per-input timeout and 1 GiB RSS. Keep generated corpora, crash
   artifacts and build output out of Git; retain any actual failure as a test.
4. Prove the contract checker fails by passing it deliberately damaged parsed
   results. Run tests, strict Clippy, formatting and the bounded fuzz campaign.
   Document commands, tool versions, actual limits and results. Measure the
   guide's prose with the installed Vale tool; aim at grade 10 or lower.

The next grammar slice still needs design agreement in issue #3. Fuzzing proves
only what ran under these limits; it cannot establish original AMOS behaviour.

## First run

- Rust tests: all passed, including three properties at 512 cases each and two
  deliberately damaged parsed results rejected by the contract checker.
- Strict Clippy and formatting passed. The first compile failed because
  proptest interpreted braces in two generated assertion messages as format
  strings; explicit messages fixed the test code. Production code was unchanged.
- cargo-fuzz 0.13.2, libfuzzer-sys 0.4.13, nightly-2026-09-24 on Apple Silicon:
  560,827 executions in 61 seconds, no failure, final coverage counter 547,
  feature counter 2,263, peak reported RSS 661 MiB. Default address sanitizer.
  Limits were 60 seconds, 4,096 bytes, two seconds per input and 1,024 MiB RSS.
  The campaign grew inputs only to a reported 1,210-byte limit. It did not
  exhaust the configured maximum or prove full grammar/path coverage.
- The first campaign wrote new inputs beside its two authored seeds. Those
  disposable hash-named files were checked and removed. The documented and CI
  commands use a separate ignored corpus directory as the writable first input.
- Vale's Flesch–Kincaid score for `docs/testing.md` is 6.33 (353 prose words).
  The roadmap scores 8.17 and edition summary 7.63. Vale excludes code and tables;
  these were reviewed separately. The scores do not establish comprehension.

CI runs the three generated properties through the existing test step. A
separate ten-minute job installs the pinned fuzz tool/nightly and runs a bounded
one-minute campaign. The fuzz lockfile must resolve before the run and remain
unchanged afterwards. No new parser forms or CLI profiles are enabled.
