"""Negative controls for the coverage guide's documentation checks."""
from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/check-coverage-docs.py'
SPEC = importlib.util.spec_from_file_location('coverage_docs', SCRIPT)
assert SPEC and SPEC.loader
checks = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(checks)


class CoverageChecks(unittest.TestCase):
    def test_empty_measurement_fails(self) -> None:
        for metrics in ({}, {'words': 0, 'sentences': 1}, {'words': 1, 'sentences': 0}):
            with self.subTest(metrics=metrics), self.assertRaises(ValueError):
                checks.check_metrics(metrics)

    def test_over_grade_and_nonfinite_scores_fail(self) -> None:
        for score in (10.01, float('nan'), float('inf'), -1):
            with self.subTest(score=score), self.assertRaises(ValueError):
                checks.check_metrics({'words': 10, 'sentences': 2, 'flesch_kincaid': score})
        checks.check_metrics({'words': 10, 'sentences': 2, 'flesch_kincaid': 10})

    def test_split_rejects_removed_anchor_or_forwarding_link(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            guide = Path(directory) / 'coverage.md'
            reference = Path(directory) / 'highlighting-coverage.md'
            guide.write_text('# Old\n\n[Detail](highlighting-coverage.md#old)\n')
            reference.write_text('# Old\n')
            checks.check_split(guide, reference, {'old'})
            reference.write_text('# New\n')
            with self.assertRaises(ValueError):
                checks.check_split(guide, reference, {'old'})
            reference.write_text('# Old\n')
            guide.write_text('# Old\n')
            with self.assertRaises(ValueError):
                checks.check_split(guide, reference, {'old'})

    def test_missing_file_and_fragment_fail(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            page = Path(directory) / 'page.md'
            page.write_text('[Missing](missing.md)\n')
            with self.assertRaises(ValueError):
                checks.check_links(page)
            page.write_text('[Missing](#absent)\n')
            with self.assertRaises(ValueError):
                checks.check_links(page)


if __name__ == '__main__':
    unittest.main()
