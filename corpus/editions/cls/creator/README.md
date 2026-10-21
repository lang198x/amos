# Creator 1.1: bare Cls uses paper colour

Four controlled programs execute in the independently booted installation whose
banner reads **AMOS The Creator V 1.1**. Bare Cls follows Paper 2 (white) and
Paper 4 (red); explicit Cls 0 gives black in both controls. This contradicts the
Creator manual's colour-zero description for this tested revision. It does not
establish how other Creator revisions behave or where the wording came from.

The [profile](../../../opening/profiles/creator-1.1.json) binds the disk,
executable/environment/keymap, firmware, emulator and configuration. The banner
also identifies music player, picture compactor and requester as V 1.1; those
components' functionality is not qualified by this test. This evidence record
does not add a recognised CLI compatibility profile.

A cold PAL A500+A501 boot with Kickstart 1.3 advances in four 500-frame intervals.
The first three captures remain in AmigaDOS; the fourth shows the identity
banner. Space (hold 3 frames), then 150 frames, reaches the blank editor.
Each probe restores that edition's own blank snapshot, types the exact shared
source (hold 3, settle 30), captures the listing, presses F1 (hold 3), runs
100 frames and captures the result. The program remains at Wait Key; End is
not reached. Every editor/result capture was inspected. Central RGBA samples
at (400,250) agree with the [Professional results](../README.md).

`cases.json` binds all source and capture hashes. Sources live in the parent
directory; no native-file import/export is used. Each subprocess has a 50-second
limit and every RPC result is checked. An initial diagnostic-only screenshot
after snapshot restore reported `no frame has been captured`; it was not treated
as an execution result. Later captures follow actual frame execution.

The original disk matches the previously checked archive/catalogue image hash.
Its filesystem verifier flags one out-of-range free bitmap bit. It nevertheless
boots and runs these probes. No repair is made, and original file bytes remain
unchanged. This warning is not a diagnosed cause of a startup or runtime bug.

Captures are evidence of the original AMOS environment, not newly licensed
Lang198x software. No runtime media, snapshots or private locator paths are
published. The newly authored shared source retains the root software licence.
