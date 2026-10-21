# Easy AMOS: original three-disk installation completed

The original Work Disc Creator reports all three working disks ready. Each disk
was formatted and populated by the native installer, then exported without
repair. Programs independently cold-boots into the editor and executes the
[four Cls probes](../README.md). Examples and Tutorial have content inventories;
their supplied programs and lessons have not been executed.

| Disk | Native transfers | Entries | Files | Source |
| --- | --- | --- | --- | --- |
| Programs | 3 | 47 | 36 | Master Disc 1 |
| Examples | 4 | 41 | 37 | Master Disc 2 |
| Tutorial | 2 | 62 | 55 | Master Disc 2 |

[installation.json](installation.json) binds the original manual, environment,
master provenance, swap sequence and inspected completion captures. The per-disk
records are [Programs](programs.json), [Examples](examples.json) and
[Tutorial](tutorial.json). Programs references its existing runtime profile as
the canonical media/component identity; the other records retain their own
image and file hashes. Directories plus file counts account for every entry.

The native workflow uses disposable copies. Master Disc 1 is writable for
keyboard selection, then both masters are read-only. The original archives are
unchanged. Each work disk is exported before removal. Explicit eject, 100 frames
with an empty drive, and insertion allow the installer to recognise the next
disk. The creator performs its own load, unpack and write operations; no host
archive reconstruction or native program conversion is used.

After Tutorial completion, the installer offers an optional fourth disk for the
learner's own programs. Pass skips that optional formatting. These three system
disks should remain read-only. A separate working disk now supports one
[native program Save/Load trial](../../../save-load/easy/README.md); it preserves
the exact four-line source and execution after a fresh boot. That trial retains
its own filesystem-integrity finding.

## Provenance and verifier limits

Master Disc 1 already contains personalisation. Master Disc 2 matches the exact
catalogue entry labelled `[m bamcopy]`, including its size and SHA-1; the source
archive's CRC check passes. It is explicitly a modified copy, not pristine stock
media. Its manifest reports `boot block: checksum does not match its bootstrap`.
The installer nevertheless reads and unpacks its Examples and Tutorial payloads.
This finding is retained without attributing a cause or repairing the master.
Programs and the Cls observations use Master Disc 1 only.

Each generated working disk has a valid boot-block checksum. The filesystem
verifier reports one unused bitmap-bit finding per disk:

```text
Programs: bitmap block 1020: non-existent block 1978 is marked free
Examples: bitmap block 1380: non-existent block 1764 is marked free
Tutorial: bitmap block 1027: non-existent block 1766 is marked free
```

Those findings remain in the records. Readable manifests, native completion and
the Programs boot do not establish their cause or prove every filesystem case.
No all-clear integrity claim is made.

This evidence does not enable a CLI compatibility profile, change a grammar,
qualify extensions or publish a new package release. Captures document original
software. Runtime disks, snapshots, tokenised programs, personalisation,
registration data and private locator paths are excluded from this repository.
