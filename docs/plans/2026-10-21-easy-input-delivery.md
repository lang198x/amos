# Establish Easy installer input delivery

Continue the approved edition investigation and Emu198x #1960. This is diagnostic
engineering-frontier work; no emulator behaviour change is approved by this plan.

1. Inspect the existing run/input/counter implementation and reference precedent.
   Reconstruct the exact private Easy test environment with verified source/tool
   hashes in a disposable workspace. Keep the source images immutable.
2. Establish controller counter/button values before and after small motion and
   run steps. Capture the actual pointer position before pressing; do not infer a
   hit from a guessed screenshot delta. Use a before/during/after button sequence.
3. If the control is hit and the installer waits, identify the waiting native
   call using existing task/stack/library observations. Separate missed input,
   requester/I/O waits, and display capture. Compare a reference only where its
   input is independently trustworthy. Stop guessing after failed experiments.
4. Retain newly established evidence under corpus/editions/cls/easy-startup/ and
   update #1960. Agree any required emulator fix before coding; do not silently
   alter hardware behaviour or introduce a bypass. If work-disk creation succeeds,
   independently boot its Programs disk and run the four shared Cls probes.
5. Verify/push the bounded result and clean task artifacts/processes. Check and
   merge website #905 if its required checks and reviewed source are suitable.

## Result

English selection succeeds after verifying the native hover highlight and the
pointer tip inside the button. The press/release query and active-low CIA bit
agree. The installer reaches the master write-protection instructions; working
disk creation and language probes remain pending. Blank menu captures also occur
before a selection in one uninterrupted cold boot, so no snapshot or rendering
fix is justified by this evidence. Retained captures exclude personalisation.

All 39 package checks pass. Three capture hashes and the button observations
were checked against the diagnostic results. Website #905 passed every check
and merged as b8b61dbf6fbeb8d79a4f6b7c8e999501a155ff0c.
