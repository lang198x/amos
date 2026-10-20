# AMOS 3D extension scope

AMOS 3D belongs in the language roadmap as an optional extension. It is not AMAL
and does not become part of core AMOS because a highlighter recognises its words.
The held guide and quick card are bound by SHA-256 in `source.json`; its evidence
records cite exact extract lines and printed pages. The 1991 date follows the
reference catalogue, whose bibliographic details have not all been title-checked.

The guide describes installation of a command extension (p. 11) and says AMOS 1.3
or later is required (p. 5). That is a documentary minimum-version claim, not proof
that every Creator or Professional release loads the extension. No release or
installation is qualified here. Nothing is installed or downloaded by this work.

The command inventory has 59 records across six small family files. These expand
axis groups and keep overload/cached-value examples without counting each argument
combination as another command. All 46 command/function cells in the two-column
quick card are recorded independently in `quickcard-cells.json` and covered by
entries crosschecked against the guide. The title is not a command cell. This is
coverage of these documents, not a completeness or native-compatibility claim.

| File | Records |
| --- | ---: |
| display-lifecycle.json | 10 |
| movement-attitude.json | 18 |
| bearings-coordinates.json | 12 |
| visibility-zones.json | 8 |
| animation.json | 8 |
| background-memory.json | 3 |

Each record retains spellings, documentary category, uncertainty status, original
examples and exact guide/quick-card line/page citations. `documented` means only
that the cited sources describe the form. The examples assume objects, screens,
points and surfaces that may not exist; they are not qualified native programs.
The 11 bearing/conversion axis forms include cached-result reads. Both target
forms of Face and Collide and the optional Background plane are represented.
The background signature continuation on the next card line is preserved.

The four documentary questions retain their original citations in
[questions.json](questions.json). Three now have answers scoped to the original
publisher source at commit `533b4b1f5acd604814513f78e02c7b4796cb0531`; the fourth
remains open. [original-source.json](original-source.json) binds file hashes,
exact excerpt ranges and conclusions. The excerpts retain their upstream MIT
notice in `original-source-LICENSE`.

- Relative angle: this token table spells `td angle rel` and has no `td angel rel`
  token. Both manual spellings remain recorded; they are not treated as aliases.
- Quit: token metadata and IQuit dispatch identify a no-argument instruction.
  The record retains its earlier ambiguous documentary category separately.
- Advanced: metadata and FAdvanced dispatch identify an integer function with one
  integer argument. The verifier's argument collection and signature comparison
  support `Td Advanced(1)`, rather than the bare/unparenthesised manual forms.
  This is source analysis, not an observed native acceptance trial.
- Collide: both overloads call an external TD_COLLIDE routine with different mode
  flags and return its integer unchanged. Identity-versus-count semantics remain
  unresolved; inspecting the wrapper cannot settle them.

The wrapper labels itself `Issue 1.02(AP200)`. No built binary has been matched to
these bytes, and no Creator/Professional release is qualified. The table also
contains later forms absent from the quick card, including Priority, Pragma Status,
Pragma, Set Colour and Rotate. These need a separate revision-scoped inventory;
they are not silently added to the 59 manual records. Source evidence for one
revision does not establish accepted spellings across all AMOS 3D versions.

`strings.json` separately records positional XYZ and angular ABC string families.
The guide ties their application to Td Redraw and refers to STOS-compatible
movement-string syntax. This does not qualify full AMAL, interrupts, timing or a
complete embedded string grammar. The guide's Delete Zone signature uses `en`
where nearby prose and the card use n; placeholder spelling is not a new argument.

Next, trace TD_COLLIDE in the pinned external library or run a native trial that
distinguishes object identity from collision count. Before implementation, agree
optional highlighting/profile selection, preserving existing package exports and consumers. Native availability,
object formats, runtime behaviour and tokenised persistence need separate evidence.
No Td highlighting, parser, codec, compiler or runtime is implemented by this scope
record. Native formats remain outside the language frontend's ownership.
