# Test AMOS source analysis

Run the normal checks from the repository root:

```sh
cargo test --locked
cargo fmt --check
cargo clippy --all-targets --locked -- -D warnings
```

Unit and fixture tests cover named examples. Property tests also generate new
inputs. They check Unicode text, command spelling, spaces and line endings.
They also check that a broken statement cannot consume End on the next line.
Each generated property runs 512 cases. To try more cases, change the test's
case count. When a property fails, proptest shrinks the input to a smaller case.
Keep its regression seed file with the fix so later runs replay the failure.

The shared checks require tokens to cover every source byte once, in order.
They check that every range falls on UTF-8 boundaries and stays within the
source. Expression and name ranges must stay within their statement. Repeated
parse and check calls must agree. A control test passes damaged ranges to these
checks and requires them to fail. A green run must mean that a check ran.

## Fuzz malformed source

Fuzzing uses feedback from executed code to explore new paths. Install the
approved test tool and a separate nightly toolchain:

```sh
cargo install cargo-fuzz --version 0.13.2 --locked
rustup toolchain install nightly-2026-09-24 --profile minimal
mkdir -p fuzz/corpus/source_contract
cargo +nightly-2026-09-24 fuzz run source_contract \
  fuzz/corpus/source_contract fuzz/seeds/source_contract -- \
  -max_total_time=60 -max_len=4096 -timeout=2 -rss_limit_mb=1024 -seed=1980
```

The target passes generated UTF-8 strings through the same checks as the
property tests. Native bytes and their decoding remain outside this parser.
The three seed files cover an opening program and recovery from broken
input, plus the maintained Perfect 10 block. Generated corpus files go in the first directory. They do not change
those seeds. The fuzz workspace has its own lockfile and no published package.
Neither test tool adds a production dependency.

The run lasts up to 60 seconds after the target builds. Each input has a
4 KiB limit, a two-second timeout and a 1 GiB process memory limit. A crash,
timeout or memory failure must fail the command. Preserve the failure input,
reduce it, and add a test before fixing the cause. Do not commit private native
programs or disk images as test cases.

Pull requests do not fuzz, because a time-boxed run is not repeatable and
could fail a pull request that did not cause the problem. They only check that
the target builds. The [fuzz workflow](../.github/workflows/fuzz.yml) fuzzes
for ten minutes every Monday, and on demand. It keeps its corpus between runs,
uploads any crashing input and opens an issue. Run longer campaigns locally
before releases and after parser changes.

A short run is a smoke test. It does not prove that all inputs work, that the
whole grammar is covered, or that original AMOS accepts a program. Native
trials and parser tests answer different questions. See [coverage](coverage.md)
and the [edition evidence](../specifications/editions/README.md) for those limits.

## Check the coverage guide

With the existing Vale tool installed, run:

```sh
python3 scripts/check-coverage-docs.py
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p test_coverage_docs.py
```

The guide must have measured prose and a Flesch–Kincaid grade at or below 10.
The checker also requires local links and all 44 retained section addresses.
The detailed vocabulary reference reports its score but has no grade gate;
exact command names and source conflicts need manual review. Review code and
tables too, since Vale leaves them out of prose metrics. A score cannot prove
that a reader understands the page.
