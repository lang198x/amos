# Easy AMOS 1.01: one native Save/Load round trip

The original Easy editor saves the [four-line red-screen probe](../../cls/paper-4-bare.amos.txt)
to a separate work disk. A fresh editor session then loads that native file,
reproduces the source listing and runs it successfully. The disk checker reports
an integrity finding; its cause remains open in [issue #6](https://github.com/lang198x/amos/issues/6).

The [observations](observations.json) bind source, native-file and image hashes,
all eleven inspected captures, input timings and the original manual. The
[Easy 1.01 profile](../../../opening/profiles/easy-1.01.json) supplies the exact
installed runtime, firmware, machine and Programs-disk identities.

## Saved file survives a fresh boot

Both writer and reader cold-boot Programs read-only in fresh processes, with
Emu198x 0.43.0, PAL A500+A501 and Kickstart 1.3. Each runs intervals of 500, 500,
1,000 and 1,000 frames. Their initial blank-editor PNGs are byte-identical.
Checkpoints continue each session between RPC batches; no writer checkpoint or
source text is supplied to the reader.

The separate OFS `My_Programs` disk starts empty and passes the existing
filesystem checker. After typing the exact probe, the writer ejects Programs,
runs 100 empty-drive frames and inserts this work disk writable. Native
Amiga+S opens the Save selector on that volume. Entering `ROUNDTRIP.AMOS` and
Return saves the program and returns to the editor with its filename displayed.
After 1,000 frames the disk motor is off and no write words are pending. The
existing export tool writes a sidecar, leaving the initial host disk unchanged.

The export contains one file, `ROUNDTRIP.AMOS`, 56 bytes. Its exact native-byte
hash is retained; the file itself is private. In the fresh reader, the exported
disk is inserted read-only after an explicit eject interval. Native Amiga+L
lists and loads `ROUNDTRIP.AMOS`. All four lines reappear in the editor.

F1 runs the reloaded program. Pixel (400,250) is RGBA 255,0,0,255, agreeing with
the earlier Paper 4 / bare Cls observation. Space advances past Wait Key to
“End of program at line 4”; another Space returns to the same editor. Four Down
keypresses place the cursor below the source. The complete four-line raster
rectangle (82,154)–(240,218) then matches the original typed source pixel for
pixel. A blank-editor negative control differs, so the comparison cannot pass
by checking an empty region.

Exporting after the read-only load/run yields a byte-identical 901,120-byte
image. Source/image hashes confirm that Programs and the initial blank host
image remain unchanged. RPC error flags, response IDs and process exit codes
are checked; each RPC response has a 50-second bound.

## Integrity finding retained

The saved export's filesystem check exits 1:

```text
build198x-adf: corrupt ADF: filesystem structure
```

The manifest resolves the sole file but reports exactly:

```text
bitmap block 884: non-existent block 2402 is marked free
```

The initial host image references bitmap block 881; the exported image references
884. Both report bitmap-valid flag 0xFFFFFFFF. No repair is applied. The workflow
does not isolate which of native mount/validation, Save or export changes those
bytes. Successful native reload is not proof of filesystem integrity. Issue #6
tracks comparison with independent evidence and the existing checker policy
before any component is changed.

## Scope

The Easy manual documents these editor controls in First Steps, printed pages
25–29; its exact extract identity is in the existing edition source record.
This trial covers one four-line program under this installed Easy 1.01 only.
It does not qualify other save/load forms, memory banks, extensions, cross-version
import or native file codecs. No parser semantics, CLI compatibility activation,
highlighting assets or package releases change.

Captures document original software as evidence. Runtime disks, tokenised
programs, snapshots, registration data, personalisation and private locator paths
are excluded from this repository. The authored source remains under the root
software licence.
