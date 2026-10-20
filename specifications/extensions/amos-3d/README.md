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

Four records remain explicitly unresolved, with evidence requirements in
[questions.json](questions.json):

- Relative angle: prose says ANGLE REL, signatures say ANGEL REL. These are not
  established aliases; neither spelling is selected as accepted.
- Quit: equals-prefixed guide notation conflicts with command notation on the card.
- Advanced: a bare guide form and later unparenthesised n notation leave the
  accepted argument/call syntax unqualified.
- Collide: the single-object guide describes a collided object's identity, whereas
  the card says number of collided objects. A trial must distinguish count from ID.

`strings.json` separately records positional XYZ and angular ABC string families.
The guide ties their application to Td Redraw and refers to STOS-compatible
movement-string syntax. This does not qualify full AMAL, interrupts, timing or a
complete embedded string grammar. The guide's Delete Zone signature uses `en`
where nearby prose and the card use n; placeholder spelling is not a new argument.

Before implementation, resolve the four questions against original extension
metadata/source or qualified native probes, then agree optional highlighting/profile
selection, preserving existing package exports and consumers. Native availability,
object formats, runtime behaviour and tokenised persistence need separate evidence.
No Td highlighting, parser, codec, compiler or runtime is implemented by this scope
record. Native formats remain outside the language frontend's ownership.
