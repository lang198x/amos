"""Check public provenance bindings; these tests do not execute native AMOS."""
from __future__ import annotations

import hashlib
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORPUS = ROOT / 'corpus/editions/perfect-ten'


def check_hash(path: Path, expected: str) -> None:
    if hashlib.sha256(path.read_bytes()).hexdigest() != expected:
        raise ValueError(f'changed evidence: {path.name}')


class NativeEvidence(unittest.TestCase):
    def test_all_editions_and_cases_have_bound_evidence(self) -> None:
        record = json.loads((CORPUS / 'observations.json').read_text())
        expected = json.loads((CORPUS / 'expectations.json').read_text())
        pairs = [(case['edition'], case['case']) for case in record['cases']]
        self.assertEqual(len(pairs), 12)
        self.assertEqual(set(pairs), {(edition, case) for edition in ('creator', 'easy', 'pro') for case in expected})
        for case in record['cases']:
            check_hash(CORPUS / case['source'], case['source_sha256'])
            for capture in case['captures'].values():
                check_hash(CORPUS / capture['file'], capture['sha256'])
                self.assertTrue(capture['visually_inspected'])
            if case['case'] in ('equal', 'unequal'):
                self.assertEqual(case['observed'], expected[case['case']])
        for environment in record['environments'].values():
            check_hash(ROOT / environment['identity_record'], environment['identity_record_sha256'])
        for capture in record['pro_error_timing']['captures']:
            check_hash(CORPUS / capture['file'], capture['sha256'])

    def test_harness_keeps_exact_fragment(self) -> None:
        fragment = (ROOT / 'corpus/parser/perfect-ten.amos.txt').read_bytes()
        for case in ('equal', 'unequal'):
            self.assertEqual((CORPUS / 'sources' / f'{case}.amos.txt').read_bytes().count(fragment), 1)

    def test_changed_hash_fails(self) -> None:
        path = CORPUS / 'sources/equal.amos.txt'
        with self.assertRaises(ValueError):
            check_hash(path, '0' * 64)


if __name__ == '__main__':
    unittest.main()
