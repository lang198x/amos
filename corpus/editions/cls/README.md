# Bare Cls: Professional 2.00 observation

Four programs executed on 21 October 2026 in the previously identified
[Professional 2.00 installation](../../opening/profiles/pro-2.00.json).
Bare Cls follows the selected paper colour in these two cases. Explicit Cls 0
clears to black under both paper settings.

| Source | Inspected background | Pixel (800,250), RGBA |
| --- | --- | --- |
| Paper 2, Cls | White | 255,255,255,255 |
| Paper 4, Cls | Red | 255,0,0,255 |
| Paper 2, Cls 0 | Black | 0,0,0,255 |
| Paper 4, Cls 0 | Black | 0,0,0,255 |

Each trial restores the same blank-editor snapshot, types the corresponding
newly authored `.amos.txt` source (hold 3 frames, settle 30), presses F1 (hold 3),
runs 100 frames and captures the 1536×576 display while the program waits for
input. The capture shows the program display and original pointer. The central
pixel avoids the pointer and border. All four captures were visually inspected;
the sampled RGBA values independently describe their central background.

`cases.json` binds exact source/capture bytes, emulator binary and private
snapshot hashes. Each subprocess had a 50-second limit and checked all five RPC
responses. RPC completion alone was not treated as execution evidence. These
are typed-source trials, not native-file round trips. The restored editor is a
setup shortcut, not a fresh boot test. No shared running emulator was changed.

This agrees with the Professional manual wording in the
[edition comparison](../../../specifications/editions/README.md). It does not
resolve the Creator manual's colour-zero wording, qualify Easy AMOS, establish
behaviour in other Pro revisions, or test rectangular Cls. Those trials remain
open in [issue #2](https://github.com/lang198x/amos/issues/2). No parser semantics
or highlighting profiles change from this result.

Source probes are newly authored under the root software licence. Captures
record the original AMOS environment; they are evidence, not newly licensed
Lang198x software. Runtime media, snapshots and raw requests with private
locators are excluded.
