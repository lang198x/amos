"""Verify Interface definitions and reference appendices against the pinned manual."""

import argparse
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "specifications/interface"


def read(file: str) -> dict:
    return json.loads((BASE / file).read_text())


def check(source: Path) -> None:
    metadata = read("source.json")
    if hashlib.sha256(source.read_bytes()).hexdigest() != metadata["extract_sha256"]:
        raise ValueError("primary extract hash mismatch")
    lines = source.read_text().split("\n")
    entries = [entry for file in metadata["files"] for entry in read(file)["entries"]]
    if len(entries) != 69 or len({(e["code"], e["kind"]) for e in entries}) != 69:
        raise ValueError("incomplete or duplicated Interface definitions")
    found_roles, found_signatures = set(), set()
    for entry in entries:
        number = entry["extract_line"]
        if lines[number - 1].strip() != entry["heading"]:
            raise ValueError(f"heading mismatch: {entry}")
        role = entry["role_line"]
        label = re.match(
            r"\s*Interface (instructions?|functions?|structure):",
            lines[role - 1],
            re.IGNORECASE,
        )
        expected = {
            "command": "instruction",
            "function": "function",
            "structure": "structure",
        }[entry["kind"]]
        if not label or not label[1].lower().startswith(expected):
            raise ValueError(f"definition role mismatch: {entry}")
        found_roles.add(role)
        page = next(
            re.search(r"09\.0[1-4]\.\d{2}", line)[0]
            for line in lines[number:]
            if re.search(r"09\.0[1-4]\.\d{2}", line)
        )
        if page != entry["page"]:
            raise ValueError(f"page mismatch: {entry}")
        for signature in entry["signatures"]:
            line = signature["extract_line"]
            if lines[line - 1].strip() != signature["text"] or not re.search(
                r"\b" + entry["code"] + r"\b", signature["text"]
            ):
                raise ValueError(f"signature mismatch: {entry}")
            found_signatures.add(line)
    actual_roles, actual_signatures = set(), set()
    for chapter in metadata["chapters"]:
        first, last = chapter["extract_lines"]
        if chapter["chapter"] not in lines[last - 1]:
            raise ValueError(f"chapter boundary mismatch: {chapter}")
        for number in range(first, last + 1):
            if re.match(
                r"\s*Interface (instructions?|functions?|structure):",
                lines[number - 1],
                re.IGNORECASE,
            ):
                actual_roles.add(number)
                cursor = number + 1
                while lines[cursor - 1].strip():
                    actual_signatures.add(cursor)
                    cursor += 1
    if actual_roles != found_roles or actual_signatures != found_signatures:
        raise ValueError("unaccounted Interface definition/signature lines")
    for citation in read("lexical.json")["citations"]:
        first, last = citation["extract_lines"]
        if not first <= last or not any(
            lines[n - 1].strip() for n in range(first, last + 1)
        ):
            raise ValueError(f"empty lexical citation: {citation}")
        page = next(
            re.search(r"09\.0[1-4]\.\d{2}", line)[0]
            for line in lines[first:]
            if re.search(r"09\.0[1-4]\.\d{2}", line)
        )
        if page != citation["page"]:
            raise ValueError(f"lexical page mismatch: {citation}")
    for number, text in [(28485, "App. H:"), (28628, "App. I:"), (28724, "Index")]:
        if text not in lines[number - 1]:
            raise ValueError("reference-appendix boundary mismatch")
    if "14.H.04" not in lines[28626] or "14.I.02" not in lines[28722]:
        raise ValueError("reference-appendix final page mismatch")
    if any(
        re.match(
            r"\s*(?:Interface )?(?:instruction|function|structure|reserved variable):",
            line,
            re.IGNORECASE,
        )
        for line in lines[28484:28723]
    ):
        raise ValueError("reference appendix contains an unreviewed definition label")
    print(
        f"Verified {len(entries)} definitions, {len(found_roles)} role blocks, {len(found_signatures)} signature lines and H/I boundaries"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    check(parser.parse_args().source)


if __name__ == "__main__":
    main()
