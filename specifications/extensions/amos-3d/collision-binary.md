# Single-object collision result in the pinned library

`Td Collide(n)` returns the first colliding candidate's index, or `-1` when
none is found, in the library identified in [collision-binary.json](collision-binary.json).
This supports the guide's object-identity description, rather than the quick
card's collision-count description. This is static analysis, not a native trial.

The original publisher's [pinned library](https://github.com/AOZ-Studio/AMOS-Professional-Official/blob/533b4b1f5acd604814513f78e02c7b4796cb0531/AMOSPro%20Sources/c3d.lib)
is 47,696 bytes. The evidence records its SHA-256, Git blob identity, exact
excerpts, file/hunk offsets, relocations and decoded instructions. Excerpts retain
the upstream MIT notice in `original-source-LICENSE`. The binary itself is not
stored here. `python3 scripts/check-3d-binary.py /path/to/c3d.lib` checks those
bindings against a separately obtained copy without loading or executing it.

## Finding the routine

The co-located `+3d.s` wrapper defines `TD_COLLIDE equ 23` at line 100 and
`C_COLD_START equ 2` at line 46. Lines 781–794 load the first segment, call its
offset-2 entry, and retain A0 as the function table and A1 as the C data base.
Lines 1208–1218 pass mode 1 for the single-object form and mode 0 for the pair.
Lines 714–732 push that mode before the ordinary arguments, call table entry 23
and forward D0 unchanged. Exact call/return excerpts are in `original-source.json`.

Hunk 0's cold-start return at `0x54` loads A0 with the PC-relative address `0xD0`;
`0x58` copies A4 to A1. Table entry `0xD0 + 23*4 = 0x12C` contains `0x153A`,
with a HUNK_RELOC32 target of hunk 2. The corresponding original file offsets
are `0x1BC` for the table entry and `0x2472` for the routine. This relocation
connects the wrapper's entry number to the code; a nearby apparent routine would
not suffice. Hunk 0's A4 setup at `0x42` relocates to data hunk 23.

## Following the return value

The routine saves six registers (24 bytes). Its loads at `0x153E`, `0x1542`
and `0x1546` therefore address mode, input index and second index at entry-stack
offsets 4, 8 and 12. The third load is overwritten in single-object mode.

| Hunk 2 offsets | Control flow |
| --- | --- |
| `0x1554–0x1558` | Clear D4; zero mode branches to the pair path. |
| `0x155A–0x1560` | Single-object mode starts candidate D5 at zero and A2 at the slot table. |
| `0x1562–0x156C` | Skip the input index and absent nonzero slots; slot zero has a special path. |
| `0x156E–0x1578` | Pass the candidate and prepared input to the predicate at `0x15AC`; replace D4 with its return. |
| `0x157A–0x1586` | Increment candidate and slot pointer; continue only below 20 and while D4's low byte is zero. |
| `0x1588–0x158E` | On a hit, subtract the loop's final increment from D5. |
| `0x159C–0x15AA` | If D4's low byte is nonzero, return D5 in D0; otherwise return `-1`. Restore registers and return. |

There is no collision-count accumulator. For example, if candidate 7 is the
first successful predicate, D5 advances to 8, the loop exits, and the return
path subtracts one and returns 7. Two successes are never counted: the loop
stops before checking later candidates. This example follows the instructions;
it is not an observed run with colliding models.

The predicate's geometry, error handling and special slot-zero meaning are
outside this bounded conclusion. No installed extension release, built-wrapper
equivalence, Creator/Easy compatibility or behaviour across AMOS 3D's lifetime
is established. A native trial should still use an identity different from the
collision count and check the no-hit case.
