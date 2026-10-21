# Verify Easy AMOS native program Save/Load

Continue the approved engineering-frontier qualification work. Use the installed
Easy 1.01 Programs disk, pinned Emu198x 0.43.0, PAL A500+A501 and Kickstart 1.3.
No emulator behaviour, parser, native codec, dependencies or release changes.

1. Re-read the Easy manual's save/load controls. Verify the retained Programs
   image and official runtime hashes. Create a separate disposable OFS work disk.
2. Cold-boot Programs. Type the existing
   `corpus/editions/cls/paper-4-bare.amos.txt` probe and capture its editor text.
   Use the original editor's Save selector to save ROUNDTRIP.AMOS to the work
   disk. Inspect native prompts before acting. Export after native completion.
3. Inspect the exported work disk through the existing ADF manifest tool: require
   a nonempty ROUNDTRIP.AMOS and bind its native bytes/hash without publishing it.
   Start another fresh process, cold-boot Programs, insert the saved work disk
   read-only and use the original Load selector. Capture the restored source,
   run it and verify the red display and completion path.
4. Retain `corpus/editions/save-load/easy/{README.md,observations.json,*.png}`.
   Link the precise result from the Easy runtime profile and working-disk docs.
   Check source/capture/native-file bindings and the outcome, not just RPC success.
   Leave wider overload/revision/format-compatibility claims unknown.
5. Commit and push verified evidence, update the edition tracker, retain only
   useful private output media with provenance, and remove task-owned disposable
   tools, snapshots, source copies, logs and processes. If a native step fails,
   record its state and investigate before proposing an emulator change.

## Result

The original Save selector creates ROUNDTRIP.AMOS (56 bytes) on the separate
work disk. A second fresh Programs boot loads it read-only, reproduces the
four-line source raster exactly, runs the red display, reaches End at line 4
and returns to the editor. The read-only load/run leaves the complete exported
image byte-identical. Both initial blank-editor captures are identical too.

The initially clean disk's exported result fails the existing integrity check:
`build198x-adf: corrupt ADF: filesystem structure`. Its manifest reports
`bitmap block 884: non-existent block 2402 is marked free`. The cause is not
isolated between native mount/validation, Save and export. No repair is applied;
[issue #6](https://github.com/lang198x/amos/issues/6) tracks the investigation.

All 39 package checks and the three-manual/21-range source checker pass. The
save/load citation range includes both documented controls. Source, eleven
capture bindings, native-file/image hashes, exact raster comparison and red
sample verify. A wrong native-file hash is rejected, and a blank-editor raster
differs. The exact before/after work-disk images are retained as private read-only
outputs for issue #6; the three installed source images remain unchanged.
