# Opening-program boundary observations

Five new native F2 observations, 20 October 2026. Each run restored the same
blank editor snapshot in the pinned emulator and typed the exact source bound
by `cases.json`. Captures were inspected: accepted cases show `No errors`, while
`End 1` and `Wait Key 1` show `Syntax error.`. The editor normalises case and
spacing; these are typed-input bindings, not exported native-file bytes.

- `boundaries`: mixed case, leading spaces, adjacent Print/string, punctuation
  inside a string, and a literal backslash before its closing quote.
- `comments`: beginning-of-line apostrophe, empty string, default Cls, colon
  separators and inline Rem containing apparent code.
- `unsupported-print`: numeric Print is accepted natively, but deliberately
  outside this parser's single-string Print surface.
- `end-argument` and `wait-argument`: rejected natively. The host reports these
  argument forms as unsupported rather than claiming full argument/type analysis.

The installation is the specific AMOS Professional 2.00 profile retained from
our opening lesson work. Creator, Easy and other Pro installations remain
unqualified. F2 also checks static properties, so its result is not a pure
parsing oracle. These probes do not execute the programs or test every feature
of that runtime. Original requests/stdout remain private because they include
local media paths. No media, snapshots or native programs are distributed.

The probe source is newly authored under the root software licence. The MIT
notice in `corpus/LICENSE` applies to the retained `opening/` teaching sources.
Captures document the original AMOS environment and are evidence, not newly
licensed Lang198x software.
