# Qualify Creator and Easy Cls behaviour

Steve approved independent identification/boot and the same controlled native
comparison used for Professional 2.00. No parser or grammar change is planned.

1. Read the existing private media inventory. Select Creator 1.1 and Easy 1.01
   candidates; verify archive integrity, recorded image hashes and firmware.
   Use disposable private copies only. If a candidate cannot boot, investigate
   the visible failure before trying a later named revision. Keep labels and
   observed editor identity separate.
2. Boot each independently using the retained pinned Emu198x Amiga binary and
   A500+A501 PAL/Kickstart 1.3 configuration. Bound each headless subprocess to
   50 seconds; save intermediate private snapshots to resume longer boots.
   Inspect identity and editor captures. Never reuse the Pro editor state.
3. In each usable editor, run the four exact sources already retained under
   corpus/editions/cls/, restoring that edition's own blank state each time.
   Bind source, emulator, firmware and runtime media hashes, typed-input method,
   frames, inspected captures and sampled display pixels. If input or execution
   fails, report that separately from language rejection and do not guess.
4. Add bounded records and captures under corpus/editions/cls/{creator,easy}/
   and qualified profiles under corpus/opening/profiles/ only where identity is
   observed. Update the edition comparison and roadmap with exact scope. No
   manual record becomes universal runtime compatibility evidence.
5. Verify source/capture bindings, citation checks and package checks. Commit
   and push. Update issues #1/#2 with evidence; leave incomplete editions or
   revisions open. Clean task media/snapshots/scripts/processes once public
   evidence is retained. Check website PR #902 and merge only if suitable.

## Creator result

Creator 1.1 boots independently. Its four inspected Cls results match Pro 2.00:
white/red for Paper 2/4 with bare Cls, black for both explicit-zero controls.
This contradicts the manual wording for the named runtime. Four source and
all eight editor/result capture hashes and 768×576 dimensions verify. All 39
package tests and 21 primary-manual citation ranges pass. No recognised CLI
compatibility profile or parser behaviour changes.

Easy's work-disk creator has reached keyboard selection. The first copy was
mounted read-only despite the installer's documented write-enabled requirement;
retests use a writable disposable copy. Current-stable cold-boot investigation
is in progress before any emulator bug is claimed.
