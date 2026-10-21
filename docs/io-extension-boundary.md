# I/O Extension boundary review

Approved 21 October 2026: use the existing manual-led lexical modes with explicit
component provenance. Serial coverage is implemented; parallel follows separately.
No new mode or runtime availability claim is introduced.

Pinned original source resolves Serial Buf and the serial/printer/parallel
implementation grouping. [Source evidence](../specifications/extensions/io/original-source.json)
retains token/dispatch excerpts and the upstream licence. It does not qualify an
installed binary or individual release.

## What the manual establishes

The source is the 1992 Professional User Guide extract already pinned by the
[BASIC source record](../specifications/manual-core/source.json), SHA-256
`b0bf946502ad3ce6534e13d620dd5c017f8f6a6cd7a4c4f99ced87b1d925715c`.
Exact boundary excerpts are retained in the
[I/O source record](../specifications/extensions/io/source.json).

| Evidence | Implication | Limit |
| --- | --- | --- |
| §10.4, 10.04.01, line 19272 explicitly attributes serial commands to the I/O Extension. | Serial forms need component provenance. | It does not identify all shipped/default releases or prove a configured installation contains them. |
| Appendix D, 14.D.01, lines 26354–56 says Bell belongs to a separate Music extension containing music, sound and samples. | An implementation extension can be part of the ordinary Professional manual surface. | This does not prove I/O and Music have identical distribution histories. |
| §6.2 explicitly labels Spack/Pack/Unpack as picture-compactor extension forms; the existing inventory preserves that label. | We already retain implementation-component provenance within the ordinary lexical inventory. | Inclusion is lexical, not runtime or edition qualification. |
| §13.1, 13.01.05, lines 22855–59 describes configured extension paths; Appendix D describes extension installation. | Configured availability is distinct from spelling recognition. | No default extension list, binary revision or native installation was examined here. |
| §10.5 describes parallel forms without explicitly naming an extension component. | We can inventory the chapter's vocabulary. | Adjacency and similar naming are insufficient to assign module ownership. |

AMOS 3D remains distinct: it has its own product sources and an explicitly
approved opt-in lexical profile. This review does not amend that decision.

## Concrete inventory and uncertainties

The [documentary inventory](../specifications/extensions/io/README.md) has 28
records: 18 serial (12 commands, six functions) and ten parallel (five commands,
five functions). Each heading and following printed-page footer was checked
against the held extract. Fresh examples illustrate lexical contexts only.
The 18 serial records are now included in 612 BASIC chapter entries; the ten
parallel records remain documentary until their separate sweep.

Source findings and remaining limits:

- **Serial Buf** is resolved by the pinned original token table and InSerialBuf
  dispatch. No Serial Buffer token is present. Conflicting manual wording remains
  recorded; the longer spelling is not promoted to an alias.
- Preserve **Serial X** uncertainty. The formula at line 19401 prints
  `Xmode=XON110000000+XOFF*$1000`. The toggle wording and Serial Open explanation
  also need separate semantic verification. This blocks claims about handshake
  behavior, not straightforward spelling recognition.
- Keep **Parallel Input$** distinct from the nearby `PARALLEL INPUTS` prose.
  The heading/signature establish the dollar spelling; the prose does not justify
  an Inputs alias or optional-parameter semantics.
- **Parallel component ownership** is source-resolved: the same I/O source contains
  all serial, printer and parallel token tables. This settles grouping at that
  revision, not distribution across every edition or installation.
- **Serial Base arity** conflicts: the manual omits an argument, while the token
  table and routine use a channel. Both lexical contexts are checked without
  claiming native acceptance.

The review has not examined runtime media, sent bytes, opened a device, checked
handshake flags or qualified Creator/Easy/individual Professional releases.

## Implementation choices

| Approach | Tradeoff |
| --- | --- |
| **Adopted: existing lexical modes, explicit documentary provenance.** Add serial/parallel rules using the current inventory-and-test process; carry the serial component label and parallel unknown separately. | Consistent with Music/picture compaction and useful for listings. The modes must continue to describe lexical vocabulary rather than installed capabilities. |
| Separate opt-in I/O mode. | Could be appropriate if source/version research establishes a meaningful user-facing profile. It adds mode/composition/packaging choices now, without evidence that the manual's extension label alone requires them. |

No generic extension selector or framework is proposed. If later research shows
colliding tokens, incompatible syntax or a separately distributed optional
product, revisit profile selection with that evidence. Do not infer a profile
from the union of highlighted names.

The serial sweep uses source-resolved spelling, complete phrases, dollar
boundaries, command/function roles and existing port/printer regressions. Parallel
is the next separate sweep. Hardware semantics and publication remain separate.
