# Coverage guide, native trials and import design

Follow the approved order. No new dependencies, runtime profiles or native codec
implementation are authorised by this plan.

## 1. Coverage guide (#7)

- Keep `docs/coverage.md` as a short current-support guide: parser forms, four
  highlighting modes, result meanings, source positions and edition limits.
- Move detailed vocabulary sections to `docs/highlighting-coverage.md`. Keep
  evidence and source links. Replace stale private/unreleased status with current
  preview scope. Preserve every old coverage fragment as a link to its detail.
- Add `scripts/check-coverage-docs.py` using the installed Vale CLI and Python
  standard library. Check non-empty prose, grade <= 10 for the current guide,
  local links and every retained fragment. Record the reference's score without
  pretending technical inventories meet the same prose target.
- Prove rejection of empty/over-grade input, missing links and removed anchors.
  Run existing package checks because the distributable Rust crate includes the
  guide; include its new referenced file. Check existing source/support claims.
  Commit and push the focused change, read CI, then reconcile #7.

## 2. Native Perfect 10 trials (#1)

- Create an authored harness around the exact maintained five-line fragment.
  Use equal and unequal cases, inspect the resulting three variable values,
  and include separately named malformed examples. Record predictions before
  running. A host-parser rejection is not a native-language rejection.
- Use the identified Creator 1.1, Easy 1.01 and Professional 2.00 installations
  independently. Reuse approved installed tools and private media; verify hashes.
  Bound each emulator process, retain only useful checkpoints, and distinguish
  input failures from editor checks and execution outcomes.
- Publish sources, observations and inspected captures only. Keep original
  media, native programs, private locators and snapshots outside Git. Record
  exact profiles, input method, visible diagnostics and limits. If blocked,
  preserve the prepared trials and identify the missing observation explicitly.
- Commit and push verified evidence. Clean disposable task files/processes.

## 3. Native import specification (#4)

- Re-consult Format198x and umbrella codec/ownership decisions. Identify primary
  format and token sources for Creator, Easy and Professional, including version
  and extension uncertainty. Use the trial results where they bear on import.
- Draft the smallest read-only codec boundary: owned bytes and decoded records
  in Format198x, readable source and source analysis in Lang198x. Specify unknown
  token preservation, malformed-input failures, encoding and source mapping.
- Define lawful fixtures, rejection controls, round trips and independent native
  checks needed before implementation. Native output, compilation, extension
  execution and a shared AST remain outside this milestone.
- Publish a concrete reviewable proposal in `specifications/native-import/` and
  #4. Do not treat unresolved format facts or this proposal as adopted APIs.

## Coverage result

The short guide measures grade 7.58 (730 words, 100 sentences) with Vale 3.24.0.
The report is in `2026-10-22-coverage-quality.json`; the 44 retained fragment
addresses are in `2026-10-22-coverage-anchors.json`. Local links and forwarding
links pass. Four negative-control tests pass. Real Vale runs reject empty prose
and a deliberately dense sample (grade 59.52). Code, tables and mode/profile
claims were reviewed against the decisions and release records.

All 39 npm tests and editor sync pass. npm's dry-run file inventory and Cargo's
package list both include the two coverage pages. The default npm cache was
unwritable; the check used a task-owned cache without changing global settings.
This changes documentation and its packaging, not grammar bytes or parser scope.
