# Proposed read contract

Keep the input bytes intact. Derived text is a view, not the original listing.
Tokenisation may have changed spaces, command case or numeric spelling before
the file was saved. A readable projection cannot recover details that were
never stored. No write-back or byte-identical source round trip is promised.

## Read in layers

1. Read the envelope under explicit size limits. Retain the entire input and
   header, declared body range, and remaining bank/tail range.
2. Select a qualified wire profile. Header family detection may suggest
   candidates; it must not silently choose a runtime revision.
3. Walk records within those bounds. Retain token codes, raw payloads and native
   ranges. Apply only the selected profile's known payload rules.
4. Build byte-linked listing segments for known tokens and stored text. Keep
   opaque segments where a safe interpretation is absent.
5. In Lang198x, convert known text under the chosen encoding policy and compose
   its UTF-8 source map. Run the existing parser only on a complete projection,
   or on explicitly isolated known fragments with a whole-file incomplete result.

A wire profile describes stored bytes. A language profile describes source
analysis and observed compatibility. Their IDs and claims are distinct. The
current Pro CLI profile does not automatically qualify a Pro file decoder.
Unknown profile IDs must fail; no fallback to the latest Pro rules is allowed.

## Preserve unknowns without guessing boundaries

An unknown built-in or extension token is not dropped, replaced with a known
command or treated as a comment. Keep its code, slot where present, raw bytes
and range. Mark the projection incomplete. Do not let placeholders enter the
parser and produce a successful whole-program result.

If a record boundary is proven but a token payload is not, preserve the rest
of that record as opaque. Resume only at its proven boundary. If a closed
procedure or damaged length prevents safe framing, stop the body walk and
retain the rest as one opaque span. Never search arbitrary bytes for the next
plausible token, line, End If or bank signature.

First import treats bank contents as opaque. It must label them unvalidated,
not report them as sound. Unknown tail data is retained and reported. No bank,
resource, extension, Include path, library or program is loaded or executed.

## Errors and limits

The reader must distinguish malformed storage from a valid but unqualified
form, and both from unsupported source syntax. Keep byte offsets on storage
errors. Do not reuse the parser's result enum to blur these layers.

Check minimum header size and declared body bounds before slicing. Use checked
arithmetic for offsets, lengths and counts. Require progress on every walk.
Cap file bytes, records and projected text before allocating; choose and test
concrete limits in the envelope implementation plan. A failed read exposes no
unlabelled partial success. A truncated or over-limit file cannot yield a clean
analysis result. An empty program is not rejected just for having no lines.

Preserve raw integer and floating-point payloads. Formatting and range claims
need profile evidence; host integer or float casts must not discard bits.
Retain header check/math flags without trusting them to prove program validity.

## Encoding and positions

The codec returns stored text bytes and native ranges, plus known token text.
Lang198x chooses an explicit conversion policy. Start with qualified ASCII
examples; unqualified high bytes remain opaque with an encoding diagnostic.
Do not silently use UTF-8, Latin-1, a guessed keymap or replacement characters.
A future reversible encoding policy needs its own evidence and design.

Map each projected UTF-8 span to zero, one or several native spans. Expanded
command words point back to their token bytes. Stored literal text points to
its payload. Added spaces and line endings have a distinct generated origin;
they do not pretend to be source bytes. Keep map entries for retained opaque
ranges even when they have no source text. Native-to-text lookups may be
one-to-many and must expose ambiguity.

Compose this map with the parser's half-open UTF-8 ranges. Convert to line and
column only at the presentation edge. LSP UTF-16 conversion is later adapter
work; the existing scalar-column API does not change. Read-only editor views
must retain the original file identity and show incomplete/encoding limits.

## API and delivery boundary

These are behavioral requirements, not stable struct names, exit codes or
method signatures. Settle the small borrowed/owned read API in the envelope
plan before implementing it. No new dependency, native writer, shared AST,
second parser, editor association or compiler is part of this proposal.
