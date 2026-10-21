# Exact Easy AMOS Save comparison

Follow-up to issue #6's bitmap investigation. Repeat the authored four-line
Save in installed FS-UAE 3.2.35 with the retained Programs disk, clean work
disk, PAL A500 + 512 KiB slow RAM and the same Kickstart 1.3.

1. Verify input hashes; prepare disposable disk copies and an isolated FS-UAE
   configuration. Use one drive and a swappable image list to reproduce the
   original drive replacement. Avoid input to any unrelated emulator window.
2. Cold boot Programs, type `Paper 4`, `Cls`, `Wait Key`, `End`, and capture the
   source. Eject Programs, allow an empty-drive interval, then insert work media.
   Capture a host copy before Save, checking its hash against the clean input.
3. Invoke native Save, name it `ROUNDTRIP.AMOS`, and wait for completion.
   Capture the resulting disk. Verify directory entry, logical file hash,
   in-range allocation, bitmap checksum and tail. Native file identity must
   match the earlier 56-byte AMOS file before calling the comparison equivalent.
4. If results differ, isolate pre-Save insertion and post-Save export in the
   pinned Emu198x release. Record scope differences; agree an owning-repository
   fix before any behaviour change.
5. Add public observations and safe screenshots under
   `corpus/editions/save-load/easy/`, update issue #6, verify and push evidence.
   Retain only unique private comparison media with hashes in the qualification
   output; stop task processes and remove disposable scratch files.

Verification: check actual guest screens and resulting media, not command
delivery alone. Checksum-correct negative controls remain those already recorded
in `bitmap-investigation.md`. No dependencies, parser or release changes.

## Result

Native Save reproduced the exact program bytes and entire bitmap in FS-UAE.
Both insertion and selector-open checkpoints match the original clean image.
The filename is ROUNDTRP.AMOS because I was not accepted. A fresh repeat reached
the same input difficulty and was stopped before Save after bounded attempts.
Its image is still clean. The result is not called filename-identical.

See `corpus/editions/save-load/easy/reference-save.md` and its JSON for evidence
and the proposed checker correction. No Emu198x export is involved, so the
conditional Emu198x isolation step is unnecessary for locating this tail outside
that implementation. Design agreement is still needed before changing policy.
