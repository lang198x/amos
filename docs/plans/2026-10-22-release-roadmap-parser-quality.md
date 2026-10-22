# Delivery, roadmap and parser quality

Follow the approved order: deliver the disk-checker fix, reconcile the roadmap,
then agree a useful parser slice. Aim for clear, coherent reader-facing prose
at Flesch–Kincaid grade 10 or lower. Preserve exact API names and source evidence.
Readability scores are review aids; they do not prove that an explanation works.

## 1. Deliver the checker fix

- Review Format198x release PR #71. In its ADF crate changelog, replace duplicate
  generated notes with one clear Fixed entry. Check the crate and lockfile both
  select 0.3.4, and keep the release limited to this crate.
- Run release checks, merge the reviewed PR, and verify the registry archive
  contains the corrected checker. A successful workflow alone is insufficient.
- Update both existing ADF dependency declarations in Build198x, its lockfile,
  and the standalone CLI's manifest version label. Verify source and lockfile
  agree with that label. Test the consumer against retained native media and
  corruption controls. Follow Build198x's checked PR and release process.
- Update AMOS issue #6 with actual delivery state. Keep native media private.

## 2. Reconcile the roadmap

- Update `docs/roadmap.md`, `specifications/editions/README.md` and current
  verification/coverage summaries only where they make stale status claims.
  Keep historical plans as evidence; link them from current summaries.
- Reconcile GitHub #1, #5 and #6 against merged PRs and exact runtime evidence.
  State the limits of Creator/Easy/Professional observations and distinguish
  documentary coverage, host analysis and original execution.
- Check local links and claims. Review prose for clarity and grade-10 reading
  level, excluding code, identifiers and machine-readable evidence from scores.

## 3. Agree the parser and quality design

- Choose an exact small fragment from `corpus/highlighting/bank-or-risk.amos.txt`.
  Specify assignment, expression and one conditional grammar, typed AST nodes,
  diagnostics, spans, recovery and unsupported neighbouring forms in #3.
- Define properties for lossless tokens, valid spans, determinism, recovery and
  CLI/library agreement. Generated tests must be able to fail, retain useful
  seeds and shrink failures. Fuzz malformed input under bounded memory/time.
- Ask before new development/fuzz dependencies; keep production dependency-free.
  Record toolchain and run limits, not a claim of exhaustive correctness.
- Propose the bounded design for agreement before new parser behaviour. Native
  import, an LSP, compilation and Blitz remain separate later work.

Use small focused commits. Push completed work. Track and clean disposable
checkouts, build directories and processes; retain unique private media until
the released consumer is verified and the evidence has a durable home.
