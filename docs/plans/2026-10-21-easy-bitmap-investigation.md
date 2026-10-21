# Easy AMOS bitmap investigation

Scope: issue #6. Establish why the retained native Save image fails the ADF
checker before proposing a fix. Native Save/Load success does not establish
filesystem integrity.

1. Verify the five retained image hashes against their private inventory.
   Inspect the initial and saved root/bitmap blocks without modifying either.
   Compare checksums, meaningful allocation bits and unused tail bytes.
2. Read `Format198x/format198x`'s `check.rs`, its ADF decision and regression
   cases alongside primary AmigaDOS bitmap documentation. Record precisely
   which requirement is documented and which is a checker policy.
3. If static evidence leaves ownership unresolved, isolate mount/validation,
   Save and export with bounded runtime trials, and compare an independent
   runtime. Keep all disk images and tokenised programs private.
4. Record reproducible observations under `corpus/editions/save-load/easy/`
   and update issue #6. Agree any behaviour change before implementing it in
   the owning repository. Run the existing corpus checks, commit and push
   the evidence; remove task scratch files and stop task-owned processes.

Verification: hashes and checksums must match; the clean initial image must
pass and the native result must reproduce the exact reported finding.
Any proposed interpretation must account for both controls and every changed
bitmap region. No parser, codec or release change is included in this plan.

## Result

Steps 1 and 2 completed. Step 3 produced a bounded native DOS write in FS-UAE:
the bitmap relocated but its unused tail stayed clear. It is a comparison,
not a reproduction of AMOS Save. Another session started its own FS-UAE window;
the task-owned process was stopped by its verified command line, with no input
sent to the unrelated session. Exact AMOS comparison and mount/Save/export
isolation remain open. See `corpus/editions/save-load/easy/bitmap-investigation.md`.

No behavioural fix is proposed on this evidence. The five existing private
images remain unchanged; the two reference-probe images are retained with a
hash inventory under the private qualification output until issue #6's
independent comparison is complete and its evidence is preserved elsewhere.
