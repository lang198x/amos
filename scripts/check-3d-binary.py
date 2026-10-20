"""Verify retained excerpts/relocations against a separately obtained library.

Usage: python3 scripts/check-3d-binary.py /path/to/c3d.lib
Reads bytes only. Never loads or executes the original program.
"""

import hashlib
import json
import struct
import sys
from pathlib import Path


def check(library: Path) -> None:
    evidence = json.loads(
        (
            Path(__file__).resolve().parent.parent
            / "specifications/extensions/amos-3d/collision-binary.json"
        ).read_text()
    )
    data = library.read_bytes()
    if len(data) != evidence["size"]:
        raise ValueError("library size mismatch")
    if hashlib.sha256(data).hexdigest() != evidence["sha256"]:
        raise ValueError("library SHA-256 mismatch")
    blob = f"blob {len(data)}\0".encode() + data
    if hashlib.sha1(blob).hexdigest() != evidence["git_blob"]:
        raise ValueError("library Git blob mismatch")
    position = 0

    def word() -> int:
        nonlocal position
        if position + 4 > len(data):
            raise ValueError("truncated Hunk record")
        value = struct.unpack_from(">I", data, position)[0]
        position += 4
        return value

    def skip(size: int) -> None:
        nonlocal position
        if position + size > len(data):
            raise ValueError("truncated Hunk payload")
        position += size

    if word() != 1011 or word() != 0:
        raise ValueError("expected unnamed HUNK_HEADER")
    count, first, last = word(), word(), word()
    if (count, first, last) != (29, 0, 28):
        raise ValueError("unexpected Hunk table")
    allocations = [word() & 0x3FFFFFFF for _ in range(count)]
    hunks: list[tuple[int, int]] = []
    relocations: dict[tuple[int, int], int] = {}
    ended = True
    while position < len(data):
        kind = word() & 0x3FFFFFFF
        if kind in (1001, 1002):
            if not ended or len(hunks) >= count:
                raise ValueError("unexpected Hunk body")
            size = word() * 4
            if size > allocations[len(hunks)] * 4:
                raise ValueError("Hunk exceeds allocation")
            hunks.append((position, size))
            skip(size)
            ended = False
        elif kind == 1004 and not ended:
            while number := word():
                target = word()
                for _ in range(number):
                    offset = word()
                    key = (len(hunks) - 1, offset)
                    if (
                        target >= count
                        or offset + 4 > hunks[-1][1]
                        or key in relocations
                    ):
                        raise ValueError("invalid or duplicate relocation")
                    relocations[key] = target
        elif kind == 1008 and not ended:
            while number := word():
                skip(number * 4)
                word()
        elif kind == 1010 and not ended:
            ended = True
        else:
            raise ValueError(f"unexpected Hunk record {kind}")
    if not ended or len(hunks) != count:
        raise ValueError("incomplete Hunk file")
    for excerpt in evidence["excerpts"]:
        start, size = hunks[excerpt["hunk"]]
        raw = bytes.fromhex(excerpt["hex"])
        offset = excerpt["hunk_offset"]
        if offset + len(raw) > size or start + offset != excerpt["file_offset"]:
            raise ValueError("excerpt location mismatch")
        if data[start + offset : start + offset + len(raw)] != raw:
            raise ValueError("excerpt bytes mismatch")
        if hashlib.sha256(raw).hexdigest() != excerpt["sha256"]:
            raise ValueError("excerpt SHA-256 mismatch")
    for relocation in evidence["relocations"]:
        if (
            relocations.get((relocation["hunk"], relocation["offset"]))
            != relocation["target_hunk"]
        ):
            raise ValueError("dispatch relocation mismatch")
    table = evidence["table"]
    entry = table["offset"] + table["index"] * 4
    start, _ = hunks[table["hunk"]]
    if (
        entry != table["entry_offset"]
        or struct.unpack_from(">I", data, start + entry)[0] != table["target_offset"]
    ):
        raise ValueError("dispatch entry mismatch")
    print(
        "Verified library identity, 29 complete hunks, excerpts and dispatch relocations"
    )


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("expected one library path")
    check(Path(sys.argv[1]))
