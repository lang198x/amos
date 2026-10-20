# Coverage and result meanings

Version 0.1.0 is an opening-program language kit, not complete AMOS support.

| Surface | Implemented |
| --- | --- |
| Parser | Cls with no argument or an unsigned decimal literal; Print with exactly one double-quoted literal; Wait Key; End. |
| Source | Original UTF-8 text, all tokens/trivia, half-open byte ranges, typed statement nodes; recovery at line/colon boundaries. |
| Lexical rules | Case-insensitive commands, spaces/tabs, blank lines, colon separators, double-quoted strings without backslash escapes, line-start apostrophe comments and statement-start Rem comments. |
| Highlighting | Opening commands, common control words, Inkey$/Chr$/Str$/Rnd, decimal/hex/binary numbers, names, strings and comments. Partial vocabulary, not version validation. |
| Profiles | One named observed Pro 2.00 installation; no additional extension qualification. Creator/Easy/other Pro/derivatives are unknown. |
| Native files, LSP, compilation | Not implemented. A native .AMOS file must be decoded separately. |

`SupportedStructure` means the parser understands the listing's forms. It does
not mean its literal values are within runtime limits, static types are valid,
execution will finish, or a different installation accepts it. For example, a
large decimal is retained without narrowing it to a host integer; AMOS range and
palette checks are future analysis. `Print 2` is valid in the observed runtime,
but the host reports it as unsupported. `Prit` is an unresolved invocation rather
than a lexical error; procedure/extension resolution is not implemented.

Malformed strings and misplaced apostrophe comments are invalid within this
source contract. Other argument combinations generally remain unsupported:
we do not infer invalidity from absence in the first subset. An unsupported
statement always retains its range and prevents a successful check. Empty
colon statements also remain unsupported pending qualification.

LF, CRLF and CR delimit lines in host text. This is a text-input convention,
not a native import/encoding qualification. Columns count Unicode scalar values
and count tabs as one; they are not visual tab stops or LSP UTF-16 positions.
Unicode literal text is retained by the host; historical encoding conversion is
future codec work. Control characters other than tab/newline are rejected by
this plain-text input contract, including inside strings/comments.

CLI exit codes: 0 supported structure; 1 invalid text/form; 2 unsupported form;
3 unknown profile; 64 usage or input error. Errors use one-based line/column.
A profile is always explicit; unknown releases never default to Pro.

TextMate highlighting is lexical. It can colour unsupported or invalid source;
it cannot supply parser diagnostics or determine whether a name is a procedure.
Native .AMOS is deliberately not associated with the editor extension: only
`.amos.txt` listings are associated automatically.
