# Bitmap investigation

The saved Easy AMOS image has a consistent allocation map for all real disk
blocks. Format198x rejects nonzero bits beyond that map. The origin and required
contents of those unused bytes are examined further in the
[independent native Save comparison](reference-save.md); no disk or checker
was fixed in this investigation.
This is evidence for [issue #6](https://github.com/lang198x/amos/issues/6).

The machine-readable results are in [bitmap-investigation.json](bitmap-investigation.json).
The original Save/Load evidence and its scope remain in [README.md](README.md).

## Retained images

All five private image hashes matched the previous inventory before analysis.
The before/after pair differs only at blocks 880, 882, 883 and 884. The saved
root points to bitmap 884, file header 882 and data block 883. The original
bitmap at 881 is unchanged and is now free. Both root and bitmap checksums sum
to zero modulo 2^32; the root's bitmap-valid flag is 0xFFFFFFFF.

There are 1,758 allocation bits, representing blocks 2 through 1759. These fit
in 55 longwords following the checksum. The final word is 0x3FFFFFFF: the 30
real blocks it represents are free, and its two padding bits are clear.
Ten of the remaining 72 whole words are nonzero. Their positions include fields
that resemble an old file header, but this does not establish their origin.
No raw tail bytes or native file contents are published.

The complete in-range allocation is correct: root 880, header 882, data 883 and
bitmap 884 are allocated; every other non-reserved block is free. The existing
Format198x traversal reports no other problem.

## Independent validator and controls

The already installed amitools 0.8.1 `xdfscan -v` reports `boot ok` for both
images. Its `BitmapScan.check_bits` examines only the allocation words, leaving
the unused whole words unchecked. Format198x 0.3.2's
`Walk::bitmap_agreement` checks all remaining bits through the end of the block.
This latter requirement is deliberate: Format198x issue #7 and the regression
`bitmap_location_comes_from_the_root_and_tail_bits_are_closed` explicitly cover it.

The following mutations were made only to disposable copies of the saved disk.
After each mutation, bitmap word 0 was set to zero and then replaced with the
negated sum of all 128 big-endian longwords modulo 2^32.

| Control | Mutation | Format198x result | xdfscan result |
|---|---|---|---|
| Live header offered as free | Set word 28, bit 16, corresponding to block 882 | Verify exit 1 | `E001 boot NOK` |
| Unused tail cleared | Preserve the 1,758 real bits, clear the final two padding bits and words 56–127 | Verify exit 0 | `boot ok` |
| Last real block held without an owner | Clear word 55, bit 29, corresponding to block 1759 | Manifest additionally reports block 1759 held but unreachable | `boot ok` |

Word offsets include the checksum at word 0. These controls show that the tail
rule alone causes the original rejection. They also expose an independent
validator limitation: amitools computes its final-word mask from the number of
padding bits (2), instead of the number of real bits (30). Its green result
cannot independently establish the entire allocation map. `xdfscan` exits 0
even for `NOK`; inspect its output rather than trusting process status.

## Independent native write

FS-UAE 3.2.35, whose startup identifies its core as WinUAE 3300b2, booted a
disposable copy of the same Programs disk with the same Kickstart 1.3 ROM.
The effective configuration confirmed A500, 512 KiB chip and 512 KiB slow RAM,
with two floppy drives. DF1 held a writable copy of the clean initial work disk.
Only the boot copy's startup sequence was replaced:

```text
C/AddBuffers >DF1:PROBE DF0: 0
```

This uses native AmigaDOS output redirection to create an empty file. The first
attempt put redirection after the arguments and produced `Bad arguments` and
`C/AddBuffers failed returncode 20`. The 1986 AmigaDOS manual's redirection
example explicitly requires redirection before the command options; the second
attempt uses that order.

The resulting image contains `PROBE`, zero bytes, at header 882. Its bitmap moved
from 881 to 883, allocating exactly root 880, header 882 and bitmap 883. The
checksum and bitmap-valid flag are valid, and every unused whole word is zero.
Both validators accept it. The disk hash in the JSON was checked after the
task-owned emulator exited. No Emu198x export or AMOS execution was involved.

The result establishes that bitmap relocation is ordinary native behaviour and
does not itself require a fix. This small DOS write did not reproduce the
nonzero tail. It does not substitute for repeating the original AMOS Save under
FS-UAE with the same input and disk-swap history. An unrelated FS-UAE session
became active during the comparison; no further UI input was sent to it, and
only the process with this trial's exact isolated command line was stopped.

## Source boundary and next experiment

The local original *AmigaDOS Technical Reference Manual* (1985), section 1.1.1,
documents the root bitmap pointers and checksum convention. Its extracted text
does not specify the unused bitmap tail. The local 1986 *AmigaDOS Manual*
likewise does not settle that requirement in its technical file-structure section.

Thomas Richter's [2024 AmigaDOS ROM Kernel Reference Manual](https://developer.amigaos3.net/sites/default/files/downloads/2024-10/Amiga_ROM_Kernel_Reference_Manual_DOS.pdf),
section 13.6.12, printed pages 248–250, describes bitmap indexing from the reserved
block count and the whole-block checksum. It does not state that the unused
tail must be zero. This later manual is supporting evidence, rather than proof
of every Kickstart 1.3 behaviour.

The [native Save comparison](reference-save.md) supplies the discriminating
experiment: the work image is unchanged before Save, and FS-UAE produces the
same complete bitmap afterwards. This establishes native production outside
Emu198x and supports a narrower checker policy. Its filename-input difference,
remaining mechanism uncertainty and proposed checks are explicit in that report.
