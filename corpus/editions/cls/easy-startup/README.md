# Easy AMOS: work-disk creation remains unqualified

The selected Master Disc 1 boots its **Easy AMOS Work Disc Creator**, not the
language editor. No Easy Cls source is entered or executed. The media catalogue
labels this image v1.01; that is not an observed editor revision.

The controlled current-stable trial cold-boots Emu198x 0.43.0 with a disposable
copy writable from the start, A500+A501 PAL and Kickstart 1.3. The source image
matches the previously verified archive/catalogue hash. Boot intervals, input
attempt, source/firmware/tool hashes and four inspected captures are bound in
`observations.json`. Snapshots between intervals belong to this same cold boot;
none comes from Pro, Creator or an older emulator build.

After the welcome click, the keyboard menu appears. A mouse-motion/button
attempt aimed at English leaves a blank blue panel. It remains blank after
another 1,000 frames. Disk queries report writable media and an idle motor;
a CIA-A port read has bit 6 high (left button released). Exec reports the AMOS
task waiting on signal $10. These observations do not identify a cause or prove
that the intended GUI control received the click.

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

Next: establish native mouse coordinates/button delivery and a completed
keyboard selection, then finish the original work-disk creator and independently
boot its Programs disk. Only then run the shared four Cls probes. Do not use a
modified preinstalled disk as evidence for an unidentified stock release.

Captures document the original environment and are evidence, not newly licensed
Lang198x software. No runtime media, snapshots, registration data or private
locator paths are published. Task copies can be regenerated from the bound
source image; they need not remain after this investigation.

The focused native-workflow investigation is [Emu198x #1960](https://github.com/emu198x/emu198x/issues/1960).
