# Evidence for the native import proposal

A header can name a file family without proving which editor saved it. The
existing Easy 1.01 trial is a direct example: its 56-byte file begins with
`AMOS Basic v1.3 `. Keep the trailing space when comparing those 16 bytes.
The [observation](easy-header-observation.json) binds the native file hash to
its earlier Save/Load evidence. No native file bytes are published here.

## What the pinned source establishes

[sources.json](sources.json) binds five publisher source files and twelve line
ranges at commit `533b4b1f5acd604814513f78e02c7b4796cb0531`. It includes
links to each range. These are source observations, not proof that those files
built our tested binaries. The source's 2.00 version marker does not establish
that equivalence. Creator and Easy token tables still need their own evidence.

| Binding | Observation and design consequence |
| --- | --- |
| `header-constants`, `header-load` | The Pro source reads 16 header bytes and a four-byte body length. It compares only ten bytes for `AMOS Basic` or eight for `AMOS Pro`. Those tests cannot identify an exact edition/revision. |
| `save-envelope` | The writer chooses a Basic or Pro header, changes byte 11 to v/V, and puts Pro math flags at byte 15. It writes the body length, body and then banks. Keep all header bytes; do not turn a saved check flag into a safety claim. |
| `save-envelope`, `source-record-traversal` | The saved body ends before the in-memory zero sentinel. Do not require a separate file-level zero line after the declared body. Closed procedures have a distinct traversal path. |
| `line-prefix`, `record-length` | This tokenizer stores a line length in words in its first byte and an indentation value in its second byte. Tokens have variable payloads; a two-byte walk is insufficient. These are profile-specific rules. |
| `special-token-codes` | Names, labels, strings, numbers and extension references have special token codes. Retain their raw bytes before interpreting values. |
| `extension-record`, `listing-and-extension-resolution` | An extension reference carries a slot, metadata byte and token-table offset. The lister resolves it through the installed table and has a fallback when that table is absent. A slot alone cannot name a known extension release. |
| `bank-signatures`, `save-bank-tail` | Bank output has separate signatures and a multi-bank count. Retain the tail; source decoding must not consume it as more program text. |

The editor's `EnHead` string is not used as the native program-header authority.
The program loader and writer provide that evidence. Token numbers refer to
specific tables; a manual's command spelling alone does not supply their values.
The [existing lexical source evidence](../readiness/lexical-source.json) uses the
same pinned tokenizer, with the same raw-byte hash.

## One native envelope observation

The retained Easy file has 16 header bytes, a big-endian body length of 30 at
offset 16, and an `AmBs` tail at offset 50. Six bytes remain at that point.
These lengths total 56. The complete extracted window matches the previously
published native-file SHA-256; a header search alone was not accepted as proof.
This inspection is not a full token walk or a new native execution trial.

The earlier independent FS-UAE Save produced the same program bytes. That
supports this one specimen. It does not qualify Pro headers, Creator revisions,
extension records, non-ASCII text or banks with content.

## Unknowns to keep visible

| Area | Evidence still needed |
| --- | --- |
| Creator and Easy revisions | Original token tables, saved fixtures, source/export comparisons and revision bounds. The same file family may cover several runtimes. |
| Pro revisions | Header variants, changed token offsets, math modes and native fixtures from each claimed revision. |
| Extensions, including AMOS 3D | Exact installed table identities, slot bindings and payload rules. The 59-record lexical inventory is not a native-token map. |
| Text | Guest character encoding, keyboard/editor normalization, names, comments and strings outside the ASCII subset. |
| Procedures | Folded/closed records and any protected forms. Do not infer traversal from an ordinary line. |
| Banks | Layouts and sizes beyond the observed empty tail. First import retains these bytes without decoding or running them. |

Fetch source bytes through the Git blob API and check the object hash. A contents
response yielded UTF-8 pairs in place of single legacy bytes in this investigation;
those bytes did not match the tree's object. The blob response did, and matched the earlier
source record. The verifier checks both the Git object hash and SHA-256.
