"""Replay the bounded edition inventory against the exact primary extracts."""

import argparse
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FORMS = {"cls", "print", "wait-key", "end", "assignment", "inline-if", "block-if"}


def check(directory: Path) -> int:
    inventory = ROOT / "specifications/editions"
    sources = json.loads((inventory / "sources.json").read_text())["sources"]
    if len(sources) != 3 or {s["id"] for s in sources} != {
        "creator",
        "easy",
        "professional",
    }:
        raise ValueError("expected three distinct edition sources")
    checked = 0
    for source in sources:
        content = (directory / source["extract"]).read_bytes()
        if hashlib.sha256(content).hexdigest() != source["extract_sha256"]:
            raise ValueError(f"source hash mismatch: {source['id']}")
        lines = content.decode().split("\n")
        edition = json.loads((inventory / f"{source['id']}.json").read_text())
        facts = edition["facts"]
        if len(facts) != len(FORMS) or {f["id"] for f in facts} != FORMS:
            raise ValueError("expected seven distinct nonempty form records")
        if edition["software_revision"] != "unqualified" or edition["runtime_verified"]:
            raise ValueError("documentary inventory cannot qualify runtime revisions")
        for fact in facts:
            citation = fact["citation"]
            start, end = citation["line_start"], citation["line_end"]
            anchor_line = citation["anchor_line"]
            if not (
                citation["source"] == source["id"]
                and 1 <= start <= anchor_line <= end <= len(lines)
            ):
                raise ValueError("invalid source range")
            if (
                not fact["finding"].strip()
                or not fact["form"].strip()
                or fact["surface"] != "documentary"
            ):
                raise ValueError("empty or non-documentary claim")
            if (
                not citation["anchor"].strip()
                or lines[anchor_line - 1].strip() != citation["anchor"]
            ):
                raise ValueError("source anchor mismatch")
            checked += 1
    return checked


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-directory", type=Path, required=True)
    args = parser.parse_args()
    checked = check(args.source_directory)
    print(f"Verified three exact manual hashes and {checked} documentary source ranges")


if __name__ == "__main__":
    main()
