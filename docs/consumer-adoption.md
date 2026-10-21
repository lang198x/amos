# Published AMOS consumer adoption

The real Code198x website uses Sätteri with static Shiki spans for Markdown
fences and CodeFromFile lesson listings. Its retained Shiki API loader is a
separate path. Both previously imported the website's local AMOS grammar at
website baseline 7412570891a79c0485b3d894cefd4cf74eb924eb.

Steve explicitly approved pinning @lang198x/amos@0.3.0 and replacing both
imports. The verified change is retained in
[website PR #902](https://github.com/code198x/website/pull/902), source commit
`9c7cfd41b52c728b8a646e983d24451a10af6e08`; it is not merged or deployed.
The implementation observations below describe that branch. The package lock's SHA-512 integrity matches the published archive in
[release evidence](releases/0.3.0-evidence.json). The local grammar has no
remaining consumers and is removed; other languages, page styles and language
tags remain unchanged. This does not introduce AMAL/Interface/3D website modes.

## Demonstrated consumer regression

The new static-role check uses a scientific value and single-quoted command
words. Before adoption it fails with:

```text
AssertionError: expected [ 'kw:Print', 'num:3', …(2) ] to include 'num:1E+3'
```

After adoption both focused renderer/API suites pass (12 checks), including
whole-number colouring, opaque quotes and command-word boundaries. The website
check reports 229 passes and nine existing skips. The production build succeeds.

## Real lesson and installed editor

The built opening lesson contains the exact maintained greeting, with keyword
and string roles. The sample is
[hello.amos](https://github.com/code198x/code-samples/blob/main/commodore-amiga/amos/meet-amos/unit-01/hello.amos),
SHA-256 `4d6d67688d86ce573cc878b3876a22c6a404de014a3f928acea11d98c5f3b19d`.
An initial ad hoc inspection asserted the wrong CSS class prefix and raised
`AssertionError`; inspection of tokensHtml establishes hl-kw/hl-str, and the
corrected built-artifact check passes. No product change was needed for that
inspection error.

A fresh isolated VS Code profile installs lang198x.lang198x-amos 0.3.1 through
the public Marketplace with --pre-release. Copies of the maintained plain-text
greeting and Bank or Risk prototype use .amos.txt suffixes. Their original
bytes are unchanged. The editor automatically selects AMOS in Restricted Mode;
the greeting's three commands and string remain readable. The prototype's
opening section displays multiword commands, numbers, identifiers and quoted
rules without visible leakage. This is an observed opening view, not a review
of every line. Prototype SHA-256:
`8e886151b90fb04cf25b9690dc849862aee1c3140f77a9176ef833724ad2f339`.

No sign-in or workspace-trust change is needed. The external VS Code CLI emits
its existing DEP0169 url.parse deprecation warning and installs successfully.
The task window is closed after inspection. No personal editor profile changes.
No beginner trial, original AMOS execution, native file decoding or additional
edition/runtime qualification follows from this consumer check.

## Browser verification

The four targeted built-lesson scenarios preserve source and readable keyword/
string roles without horizontal page overflow at 390px and 1440px in light and
dark modes. The initial full release suite passes 469 browser checks but times
out on the desktop dark homepage at page.goto, before any accessibility
assertion. The isolated homepage rerun passes in 17.5 seconds; its cause remains
unknown and is tracked separately in
[website #901](https://github.com/code198x/website/issues/901). No accessibility
baseline or timeout was weakened.

The first manual low-concurrency retry omitted the release script's required
CODE_SAMPLES_PATH; native-image verification fails with
`TypeError: The "paths[0]" argument must be of type string. Received undefined`.
That invalid run is stopped with its evidence retained. The correctly configured
complete rerun uses the release script's sample/decoder paths and two workers.
All 478 checks pass in that correctly configured complete rerun, including
eight AMOS theme/width/project cases. Offline lychee reports 228144 total links,
17918 unique and zero errors. The initial production build/content/media checks
and this complete browser/offline rerun together cover the required release
checks without rebuilding unchanged inputs. A direct live RSS read returns
`HTTP Error 403: Forbidden`; no live-site verification is claimed.

[Adoption issue #900](https://github.com/code198x/website/issues/900) owns the
website change; [roadmap #5](https://github.com/lang198x/amos/issues/5) tracks
subsequent edition qualification and analysis milestones.

The website push reports three existing default-branch dependency alerts (one
high, two moderate). They are not triaged by this AMOS adoption task; no unrelated
dependency update is included. GitHub check results remain distinct from the
local release evidence above.
