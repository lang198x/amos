# Full-game highlighting fixture

`bank-or-risk.amos.txt` retains all 416 physical lines of
[Bank or Risk's stable display listing](https://github.com/code198x/code-samples/blob/633cd5805d4d0fcbe16ddc4eb41b85769bde41d8/commodore-amiga/amos/bank-or-risk/stages/arcade/stable-display.amos).
SHA-256: `d540a483d722b4961f1abd70838d04d77c72f3e3596e78f63a011825414f9111`.

The upstream [MIT licence and copyright notice](../LICENSE) apply. This plain
UTF-8 fixture is not a native tokenised program or a new original-runtime trial.
It exercises highlighting beyond the host parser's opening-program subset.

`bank-or-risk.inventory.json` records reviewed source ranges for 398 occurrences:
commands/control words, functions, Timer, And/Or and six standalone label
definitions. It was made from source text and the manual vocabulary independently
of TextMate output. Tests do not regenerate expectations from the highlighter.
The full source was inspected, including expressions and the final presentation
routine. This is complete for this fixture, not a whole-language percentage.

Each compact entry is `[line, start, end, text, scope]`. Lines are one-based;
columns are zero-based, half-open UTF-16 offsets (this fixture is ASCII). Tests
verify the source hash and exact ranges, then compare every highlighted builtin
span with this inventory in dark-plus and light-plus. Unexpected bare identifiers
outside the game's BR_ names fail, so an omitted command cannot quietly become a
variable. All four BR_MARK array occurrences must remain identifiers.
