# Check bare Cls in an identified runtime

Continue the agreed edition qualification without changing parser behaviour.

1. Reuse only the existing Professional 2.00 blank-editor snapshot and pinned
   emulator from the recorded native probes. Check their presence and hashes.
2. Add newly authored plain-text probes under corpus/editions/cls/: Paper 2
   then bare Cls, Paper 4 then bare Cls, and explicit Cls 0 controls. Run each
   from a fresh restored state with bounded subprocess time and checked RPC
   responses. Inspect captures rather than treating RPC success as execution.
3. Retain source hashes, runtime identity, captures and observed limitations in
   corpus/editions/cls/README.md and cases.json. Report Creator/Easy untested.
   If the retained runtime cannot execute, record the blocker without changing
   the manual-backed inventory or claiming a difference.
4. Run applicable source/package checks, commit and push the evidence. Clean
   task-owned temporary logs/scripts; preserve the existing shared runtime.

## Outcome

All four native programs execute. Inspected captures and independent central
pixel samples show white/red for bare Cls after Paper 2/4, black for both
explicit Cls 0 controls. Four source and four capture hashes verify; all 39
package checks and the 21 manual citation bindings pass. No runtime/media files
are published. Temporary scripts and raw replies are removed; the existing
shared runtime/snapshot are retained for the ongoing edition investigation.
