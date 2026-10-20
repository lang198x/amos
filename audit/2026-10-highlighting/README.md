# First game highlighting baseline

The released 0.1.0 grammar was compared with the pinned Bank or Risk
`stable-display.amos` source linked in `statement-heads.json`. Source and grammar
SHA-256 values bind the comparison. This is a lexical highlighting observation,
not AMOS parsing, static analysis or a new native-runtime test.

The scan inspected 332 physical-line head candidates and found 35 distinct
spellings. Twenty-six are not currently coloured as keywords/functions. These
are **candidates, not 26 missing commands**: `BR_MARK` is an array assignment.
The scan skips simple assignments, standalone labels and comment/blank lines;
it does not resolve names, classify array assignments, inspect every inline
statement, or inventory functions inside expressions. No coverage percentage
or whole-language claim follows from these counts.

The useful next groups are visible in the actual source:

- Control and data: Gosub, Return, Dim, Randomize and the unqualified Wait family.
- Display: Hide/Show, Curs Off, Flash Off, Double Buffer, Autoback, Bob Update
  Off, Palette, Paper, Pen, Locate, Ink, Bar, Box and Screen operations.
- Sound/input: Play Off, Wave, Volume, Set Envel and Clear Key.

Confirm complete multiword forms and their boundaries in the original manual
before adding rules. Functions, labels and procedure names need their own cases.
Keep string/comment guards, suffixes and case-insensitivity under test. The
parser remains at its separately documented opening-program surface.

## Reproduce

Obtain the exact pinned source from its linked upstream revision, then use an
existing Shiki 4.4.3 installation:

```sh
AMOS_SHIKI_MODULE=/path/to/shiki/dist/index.mjs \
  node audit/2026-10-highlighting/scan.mjs stable-display.amos.txt report.json
```

The helper fails if the input or grammar differs from the recorded baseline,
if Shiki is missing, if token/source line counts disagree, or if it examines no
candidates. A deliberately empty input was rejected. It is a research helper,
not a production AMOS scanner; future baselines require fresh source bindings.
