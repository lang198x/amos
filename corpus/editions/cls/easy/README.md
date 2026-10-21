# Easy AMOS 1.01: four Cls observations

The Programs disk created by the original Easy AMOS Work Disc Creator cold-boots
into the Easy AMOS editor. All four shared Cls probes execute from that editor.
Bare Cls follows Paper in these cases; explicit Cls 0 clears to black.

| Source | Inspected background | Pixel (400,250), RGBA |
| --- | --- | --- |
| Paper 2, Cls | White | 255,255,255,255 |
| Paper 4, Cls | Red | 255,0,0,255 |
| Paper 2, Cls 0 | Black | 0,0,0,255 |
| Paper 4, Cls 0 | Black | 0,0,0,255 |

The [environment record](../../../opening/profiles/easy-1.01.json) binds the
exported Programs image, original Master Disc 1, firmware, emulator and all 36
installed file hashes. The installer displays Version 1.01; the installed
`EasyAMOS` executable contains `$VER: 1.01` at byte offset 2275. The visible
editor brand is Easy AMOS; its blank screen does not itself show a revision.
This identifies the tested artefacts, not every disk labelled 1.01.

## Original installation and independent boot

The native single-drive creator formats the disposable disk as `Easy_AMOS`,
then performs three transfers from Master Disc 1: load, unpack and write. The
installer's Programs-ready prompt is retained in `programs-finish.png`; a full
progress bar alone was not treated as completion. The original instructions
are the Easy AMOS User Guide (1992), Introduction, printed pages 4–11.

The full [working-disk record](working-disks/README.md) also documents completed
Examples and Tutorial creation, their source limits and per-file identities.

An explicit eject, 100 frames with an empty drive, and insertion allow the
creator to recognise the requested source/work disk. A direct replacement at
the first master prompt did not advance during 1,000 frames; no cause is claimed.
Each writable work disk is exported before it is removed. The masters remain
read-only after keyboard selection; their archive sources are unchanged.
Programs uses Master Disc 1 only. The separately catalogued modified Master
Disc 2 does not contribute to these probes.

The exported disk is then loaded read-only into a **fresh process**, with the
same PAL A500+A501 (512 KiB chip + 512 KiB slow) and Kickstart 1.3. Boot intervals
are 500, 500, 1,000 and 1,000 frames. No installer snapshot is used for this boot.
`programs-cold-boot.png` shows the resulting blank editor.

The filesystem verifier reports exactly:

```text
bitmap block 1020: non-existent block 1978 is marked free
```

The disk is not repaired. Its boot checksum validates and the manifest resolves
47 entries (36 files); native cold boot and these typed-source trials succeed.
The bitmap finding remains a qualification limit, not evidence of its cause.
The original Master Disc 1 already contains personalisation. No pristine factory
media claim, personal name or registration data is published.

## Probe boundaries

Each trial restores our blank-editor checkpoint from that independent boot,
types the exact shared source (hold 3 frames, settle 30), retains an editor
capture, presses F1 (hold 3), runs 100 frames and captures the program display.
All editor and result captures were inspected. PNG samples independently verify
background colour away from the pointer; `cases.json` binds every source and
capture hash. RPC responses, error flags and process exit codes were checked;
each RPC had a 50-second response bound.

The four result captures are taken while the programs wait at Wait Key.
A separate follow-up on `paper-4-explicit-zero` presses Space (hold 3, run 100):
the native display reports "End of program at line 4". Another Space with the
same timing returns to the editor with the source intact. Those two captures
are bound separately in `cases.json`. They establish that one completion path,
not every Wait or End form.

These trials do not verify native source-file Save/Load, rectangular Cls,
extensions or other revisions. The four colour results agree with the Easy glossary's current-paper
wording (printed page 347), the [Creator 1.1 trial](../creator/README.md) and the
[Professional 2.00 trial](../README.md). No parser semantics, recognised CLI
compatibility profile, grammar or release channel changes.

The separate [native Save/Load trial](../../save-load/easy/README.md) uses the
Paper 4 / bare Cls source, a disposable work disk and a fresh reader boot. Its
successful round trip and unresolved integrity finding have their own evidence.

Sources are newly authored under the root software licence. Captures document
original software as evidence. No runtime media, snapshots, tokenised programs,
registration data or private locator paths are included.
