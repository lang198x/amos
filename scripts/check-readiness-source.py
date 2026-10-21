"""Replay retained lexical evidence against the pinned original source and manual."""

import argparse
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def check(directory: Path, manual: Path) -> None:
    evidence = json.loads(
        (ROOT / "specifications/readiness/lexical-source.json").read_text()
    )
    if hashlib.sha256(manual.read_bytes()).hexdigest() != evidence["manual"]["sha256"]:
        raise ValueError("manual hash mismatch")
    count = 0
    for record in evidence["files"]:
        raw = (directory / record["path"].replace("/", "__")).read_bytes()
        if hashlib.sha256(raw).hexdigest() != record["sha256"]:
            raise ValueError(f"original source hash mismatch: {record['path']}")
        lines = raw.decode(evidence["encoding"]).split("\n")
        for excerpt in record["excerpts"]:
            retained = "\n".join(
                lines[excerpt["first_line"] - 1 : excerpt["last_line"]]
            )
            if not retained or retained != excerpt["text"]:
                raise ValueError(f"source excerpt mismatch: {excerpt['id']}")
            count += 1
    if count != 4:
        raise ValueError("incomplete lexical source evidence")
    print("Verified both original files, four excerpts and pinned manual hash")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--directory", type=Path, required=True)
    parser.add_argument("--manual", type=Path, required=True)
    args = parser.parse_args()
    check(args.directory, args.manual)


if __name__ == "__main__":
    main()
