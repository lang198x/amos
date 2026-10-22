"""Failure controls for the native-import research bindings."""
from __future__ import annotations

import copy
import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('native_sources', ROOT / 'scripts/check-native-import-sources.py')
assert SPEC and SPEC.loader
checks = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(checks)


class ImportSourceChecks(unittest.TestCase):
    def setUp(self) -> None:
        self.record = json.loads(checks.RECORD.read_text())

    def test_complete_inventory(self) -> None:
        checks.validate_inventory(self.record)

    def test_empty_or_repeated_files_fail(self) -> None:
        for files in ([], [self.record['files'][0]] * 5):
            with self.subTest(files=len(files)), self.assertRaises(ValueError):
                checks.validate_inventory({'files': files})

    def test_missing_or_repeated_ranges_fail(self) -> None:
        for replacement in ([], [self.record['files'][0]['ranges'][0]] * 4):
            record = copy.deepcopy(self.record)
            record['files'][0]['ranges'] = replacement
            with self.subTest(ranges=len(replacement)), self.assertRaises(ValueError):
                checks.validate_inventory(record)

    def test_empty_and_changed_source_fail(self) -> None:
        for raw in (b'', b'changed'):
            with self.subTest(raw=raw), self.assertRaises(ValueError):
                checks.check_bytes(raw, self.record['files'][0], self.record['encoding'])


if __name__ == '__main__':
    unittest.main()
