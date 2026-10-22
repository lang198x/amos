# Parse the Perfect 10 block

Approved 22 October 2026 after choosing the bounded block over assignments alone
or a larger arithmetic/nested-conditional slice.

The maintained fixture is Bank or Risk lines 128–132. Its source hash is
`d540a483d722b4961f1abd70838d04d77c72f3e3596e78f63a011825414f9111`.
It assigns a name, a negative integer and a string within `If BR_TOTAL=BR_CAP`
and `End If`. Keep the original fixture and MIT notice.

Add typed names, assignments, unary minus and equality expressions, and one
multiline If node with a body. All nodes retain half-open byte spans into the
original source. Names retain spelling and suffixes. Do not evaluate values,
resolve names, check types or infer native compatibility.

Keep Else, nested conditionals, arithmetic, arrays and inline If unsupported.
Preserve the whole unsupported block's range. A malformed supported expression
gets an Invalid diagnostic at its missing or wrong operand. A missing End If
gets an Invalid diagnostic at the header; later statements remain available for
recovery. An orphan End If retains the old Unsupported result.

Extend the canonical library parser only; the CLI continues to call it. Keep
assignments, expressions, segment handling and If coordination in focused
files. Do not add dependencies, a parser framework or a new profile. The existing
opening instruction modules retain their argument limits.

Extend the shared source-contract checks to visit every new expression and
nested body range. Use the exact maintained fragment, unsupported neighbours,
malformed headers/assignments and later End recovery as fixtures. Add generated
assignment/block tests and rerun the bounded fuzz campaign. No native execution
claim follows from these checks.

Reconsult this record before adding Else, nesting, arithmetic, arrays or inline
conditionals. Those need a new bounded design and evidence.
