# Easy AMOS: verified route through keyboard selection

The selected Master Disc 1 boots its **Easy AMOS Work Disc Creator**, not the
language editor. This startup record does not execute language probes. The
separate [Programs-disk trial](../easy/README.md) creates the disk through the
original installer, cold-boots it independently and executes four Cls probes.
The media catalogue labels the master v1.01; editor identity has its own evidence
in that trial.

The controlled current-stable trial cold-boots Emu198x 0.43.0 with a disposable
copy writable from the start, A500+A501 PAL and Kickstart 1.3. The source image
matches the previously verified archive/catalogue hash. Boot intervals, input
attempt, source/firmware/tool hashes and four inspected captures are bound in
`observations.json`. Snapshots between intervals belong to this same cold boot;
none comes from Pro, Creator or an older emulator build.

The keyboard menu accepts an English selection through MCP. Ten small motion
steps of (16, 20), followed by (0, 12), place the visible pointer tip inside
English and produce its native hover highlight (`english-hover.png`). A click
held for three frames, followed by release and 200 frames, advances to the
instructions to write-protect both master disks. The input query reports the
button released, pressed and released; CIA-A PRA reads 188 while pressed and
204 after release, with active-low bit 6 changing accordingly. The exact sequence
and capture hashes are in `input-delivery.json`.

The pointer tip before the final downward adjustment sits above the button,
even though its lower pixels overlap the label. That click does not advance.
The verified hover and successful selection resolve the input-delivery question
without an emulator change. The source image already contains personalisation;
the post-selection screen is excluded rather than publishing its displayed name.
This is not evidence of pristine factory media or an identified editor release.

Blank captures alone cannot establish installer failure. `motion-menu.png` and
`motion-blank.png` come from one uninterrupted cold-boot session before a
selection click. Both full and blank menu captures occur during those small
movements. Snapshot restoration is not required to observe this. No display
mechanism or rendering regression is established. The earlier blank-panel
observations in `observations.json` remain bounded observations, not proof of a
failed control or a language rejection.

Earlier diagnostic attempts used a read-only master copy, an older snapshot or
uncalibrated pointer movements; they are not the controlled evidence above.
The manual requires a write-enabled master during personalisation (Introduction,
printed pages 5–7). A diagnostic-only screenshot immediately after restoration
also failed because no new frame existed. An unsupported key spelling was
rejected explicitly. None is a language acceptance/rejection result.

An independent FS-UAE 3.2.35 cold boot of the same image and configuration reaches
the welcome and keyboard menu. Native automation does not establish a reliable
selection there either, including after acquiring input capture. The comparison
is inconclusive: no confirmed Emu198x core regression is claimed. Source media
are unchanged; the reference uses its own disposable writable copy and isolated
base directory. FS-UAE documents its [base-directory options](https://fs-uae.net/docs/paths-and-directories/)
and [input-capture shortcuts](https://fs-uae.net/docs/keyboard-shortcuts/).

The [Programs-disk trial](../easy/README.md) follows this input route through the
native formatter and three transfers. Examples and Tutorial installation are
separate work. Do not use a modified preinstalled disk as evidence for an
unidentified stock release.

Captures document the original environment and are evidence, not newly licensed
Lang198x software. No runtime media, snapshots, registration data or private
locator paths are published. Task copies can be regenerated from the bound
source image; they need not remain after this investigation.

The input-delivery investigation is [Emu198x #1960](https://github.com/emu198x/emu198x/issues/1960).
