# Perfect 10 in three original AMOS editions

The exact five-line block works in Creator 1.1, Easy 1.01 and Professional 2.00
in these trials. When total equals cap, it sets the award, flag and message.
When they differ, it leaves all three sentinel values unchanged. Each edition
also rejects the two malformed controls. This is evidence for these programs
and installations, not for a whole edition or a new CLI profile.

## Expected and observed results

The harness sets cap to 10, award to 99, hand-finished to 0 and message to
`unchanged`. It then inserts the [maintained fragment](../../parser/perfect-ten.amos.txt)
without changing its bytes. The final Print lines show all three values.
Expectations were written before the runs in [expectations.json](expectations.json).

| Case | Creator 1.1 | Easy 1.01 | Professional 2.00 |
| --- | --- | --- | --- |
| Total 10 | Award 10; flag -1; Perfect 10 message | Same | Same |
| Total 9 | Award 99; flag 0; unchanged message | Same | Same |
| Missing assignment value | `Syntax error` | `Syntax error` | `Syntax error.` |
| Missing End If | `ELSE without ENDIF` | `ELSE without ENDIF` | `If without Endif.` |

The missing-End-If source has no Else. The table preserves what each editor
reports. The host parser reports missing End If; it need not copy a runtime's
message. Positive programs wait at Wait Key. These trials do not reach End.

[observations.json](observations.json) binds the exact source, editor and result
captures, emulator and three environments. All published captures were inspected.
Each environment starts from its own fresh boot. Creator's banner identifies
1.1, Easy's banner identifies 1.01, and Professional's banner identifies 2.00.
Prior component/media records remain linked for provenance. Those records'
older emulator details do not replace this trial's emulator binding.

## Keep input and results distinct

The input tool sends US keyboard chords. Creator and Easy need Shift+2 to enter
a quote in these installations. A small Print probe checked that chord. The
first US-chord Creator run lost its quotes and reported a type mismatch. It is
an input failure, excluded from the results above. Listings were then checked
for intact strings before accepting execution results. Professional uses US chords.

F1 runs each positive program. F2 checks each malformed source. Creator and Easy
retain the error at 100 frames. Professional's missing-value error is visible
immediately and after 10 and 30 more frames, but has cleared at 100. The
[extra captures](observations.json) bind those four observations. Professional's
recorded errors therefore use the immediate capture. A late blank status bar
alone cannot show that a program passed.

All calls use pinned Emu198x 0.43.0. Creator and Easy use a PAL A500+A501 with
Kickstart 1.3; Professional uses a PAL A1200 with Kickstart 3.1. Original media
mount read-only and their hashes are unchanged. Snapshots contain private runtime
state and are not published. No native file is saved or imported by these probes.

Long boot/typing calls exceeded the 50-second process limit. Startup then used
500-frame checkpoints with the original media mounted before each restore.
The replay script types at most 70 source characters per process, saving a
private checkpoint between chunks. This bounds each call without cutting text.

## Replay and host checks

Use [run-native-perfect-ten.py](../../../scripts/run-native-perfect-ten.py) with
an owned runtime, matching firmware, and that edition's blank-editor checkpoint.
Its help lists required paths, machine and quote-key choice. Put outputs outside
the repository: they contain private paths and runtime state. It checks every
RPC response, but reports no semantic result. Inspect the editor, immediate and
settled captures yourself. Error controls must be able to show rejection.

[host-results.json](host-results.json) records the separate host checks. The
maintained fragment has supported structure. The two broken sources are invalid.
Both complete harnesses remain unsupported because their Print expressions are
outside the host parser's single-string Print limit. Native success does not
silently widen that limit or qualify all forms of assignment and If.

The retained fragment keeps the [MIT notice](../../LICENSE). New harness code
uses the repository's GPL-2.0-or-later licence. Captures document original AMOS;
they are evidence, not newly licensed Lang198x software. No runtime disks, native
programs, snapshots, registration details or private media paths are included.
