"""Verify the raw publisher source bindings used by the native-import proposal."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RECORD = ROOT / 'specifications/native-import/sources.json'
REQUIRED = {
    '+Verif.s': {'header-constants', 'header-load', 'save-envelope', 'source-record-traversal'},
    'AMOSPro Sources/+Token.s': {'line-prefix', 'record-length', 'extension-record', 'listing-and-extension-resolution'},
    '+Equ.s': {'special-token-codes'},
    '+Lib.s': {'bank-signatures', 'save-bank-tail'},
    '+Version.s': {'source-version'},
}


def validate_inventory(evidence: dict) -> None:
    files = evidence['files']
    if len(files) != len(REQUIRED) or {file['path'] for file in files} != REQUIRED.keys():
        raise ValueError('incomplete or repeated source files')
    for file in files:
        ids = [item['id'] for item in file['ranges']]
        if len(ids) != len(REQUIRED[file['path']]) or set(ids) != REQUIRED[file['path']]:
            raise ValueError(f'incomplete or repeated source ranges: {file["path"]}')


def check_bytes(raw: bytes, file: dict, encoding: str) -> None:
    if len(raw) != file['bytes'] or hashlib.sha256(raw).hexdigest() != file['sha256']:
        raise ValueError(f'raw source hash/size mismatch: {file["path"]}')
    git_object = b'blob ' + str(len(raw)).encode() + b'\0' + raw
    if hashlib.sha1(git_object).hexdigest() != file['git_blob']:
        raise ValueError(f'Git object mismatch: {file["path"]}')
    lines = raw.decode(encoding).split('\n')
    for item in file['ranges']:
        first, last = item['first_line'], item['last_line']
        if not 1 <= first <= last <= len(lines):
            raise ValueError(f'out-of-bounds source range: {item["id"]}')
        text = '\n'.join(lines[first - 1:last])
        if not text.strip() or hashlib.sha256(text.encode(encoding)).hexdigest() != item['range_sha256']:
            raise ValueError(f'changed or empty source range: {item["id"]}')


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--directory', type=Path, required=True)
    args = parser.parse_args()
    evidence = json.loads(RECORD.read_text())
    validate_inventory(evidence)
    for file in evidence['files']:
        check_bytes((args.directory / file['path']).read_bytes(), file, evidence['encoding'])
    print('Verified five raw files, Git objects and twelve complete source ranges.')


if __name__ == '__main__':
    main()
