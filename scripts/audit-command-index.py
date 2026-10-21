"""Reconcile every pinned Appendix G row without changing language vocabulary."""

import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = ROOT / "specifications"
OUT = SPEC / "command-index"
FIRST, LAST = 27469, 28484
ROLES = (
    "Picture Compactor Extension|Interface Reserved Variable|Interface Instruction|"
    "Interface Function|Interface Structure|Embedded Menu Command|Embedded Menu Function|"
    "AMAL Reserved Variable|AMAL Instruction|AMAL Function|AMAL Structure|"
    "System Function|System Instruction|Reserved Variable|Instruction|Function|Structure"
)
LABEL = re.compile(r"^(.*?)\s+(" + ROLES + r")\s*:\s*(.*)$")
SPELLINGS = {
    "ELipse": "ELlipse",
    "AM REG": "Amreg",
    "INPUT#": "Input #",
    "LINE INPUT#": "Line Input #",
    "PRINT#": "Print #",
    "X CURS": "Xcurs",
    "Y CURS": "Ycurs",
    "X GRAPHIC": "Xgraphic",
    "Y GRAPHIC": "Ygraphic",
    "X TEXT": "Xtext",
    "Y TEXT": "Ytext",
}
# These unqualified index labels point at AMAL Autotest definitions, not BASIC.
AMAL_CONTEXT = {27749: "eXit", 28413: "Wait"}


def read(path: Path) -> dict:
    return json.loads(path.read_text())


def normal_page(page: str) -> str:
    return ".".join(part.zfill(2) for part in page.split("."))


def inventories() -> dict:
    core = read(SPEC / "manual-core/source.json")
    result = {"basic": {}, "amal": {}, "menu": {}}
    for chapter in core["chapters"]:
        file = f"manual-core/{chapter}.json"
        data = read(SPEC / file)
        for entry in data["entries"]:
            result["basic"].setdefault(entry["spelling"].casefold(), []).append(
                (file, entry)
            )
        for entry in data.get("embedded_entries", []):
            result["menu"].setdefault(entry["spelling"].casefold(), []).append(
                (file, entry)
            )
    for file in read(SPEC / "amal/source.json")["files"]:
        for entry in read(SPEC / "amal" / file)["entries"]:
            result["amal"].setdefault(entry["spelling"].casefold(), []).append(
                (f"amal/{file}", entry)
            )
    return result


def reconcile(row: dict, known: dict) -> dict:
    role, word = row["role"], row["spelling"]
    surface = "interface" if role.startswith("Interface") else "basic"
    if role.startswith("AMAL") or row["extract_line"] in AMAL_CONTEXT:
        surface = "amal"
    elif role.startswith("Embedded Menu"):
        surface = "menu"
    row["surface"] = surface
    findings = row["findings"]
    if surface == "interface":
        row["references"] = []
        return row
    if row["extract_line"] in AMAL_CONTEXT:
        word = AMAL_CONTEXT[row["extract_line"]]
        findings.append("surface-label")
        row["definition_context"] = (
            [13544, 13545] if row["extract_line"] == 27749 else [13549, 13550]
        )
    elif word in SPELLINGS:
        word = SPELLINGS[word]
        findings.append("spelling")
    words = [word]
    if surface == "basic" and word == "ON PROC":
        words = ["On", "Proc"]
        findings.append("composite")
        row["definition_context"] = [5235, 5237]
    matches = [
        item for name in words for item in known[surface].get(name.casefold(), [])
    ]
    if not matches or any(name.casefold() not in known[surface] for name in words):
        raise ValueError(f"unmapped index row: {row}")
    row["references"] = [
        {"file": file, "spelling": entry["spelling"], "kind": entry["kind"]}
        for file, entry in matches
    ]
    if (
        surface in {"menu", "amal"}
        and "surface-label" not in findings
        and word != matches[0][1]["spelling"]
    ):
        findings.append("capitalisation")
    pages = {normal_page(entry["page"]) for _, entry in matches}
    pages.update(
        normal_page(entry["definition"]["page"])
        for _, entry in matches
        if "definition" in entry
    )
    if "composite" not in findings and normal_page(row["target_page"]) not in pages:
        findings.append("locator")
    expected = {
        "Instruction": "command",
        "Function": "function",
        "System Function": "function",
        "Reserved Variable": "reserved",
        "Picture Compactor Extension": "command",
    }.get(role)
    if (
        surface == "basic"
        and expected
        and expected not in {entry["kind"] for _, entry in matches}
    ):
        findings.append("role")
    return row


def audit(source: Path) -> dict[str, dict]:
    core = read(SPEC / "manual-core/source.json")
    if hashlib.sha256(source.read_bytes()).hexdigest() != core["extract_sha256"]:
        raise ValueError("primary extract hash mismatch")
    lines = source.read_text().split("\n")
    if "App. G:" not in lines[FIRST - 1] or "App. H:" not in lines[LAST]:
        raise ValueError("index boundary mismatch")
    known, pages, start, rows = inventories(), [], FIRST, []
    for number in range(FIRST, LAST + 1):
        line = lines[number - 1]
        footer = re.search(r"14\.G\.(\d{2})", line)
        if footer:
            page = int(footer[1])
            if page != len(pages) + 1 or not rows:
                raise ValueError("missing, reordered or empty index page")
            pages.append(
                {
                    "page": f"14.G.{page:02}",
                    "extract_lines": [start, number],
                    "entries": rows,
                }
            )
            start, rows = number + 1, []
            continue
        if ".." not in line:
            if (
                number >= 27486
                and line.strip()
                and not re.fullmatch(r"(?:Command Index|[NMDAS ]+)", line.strip())
            ):
                raise ValueError(f"unrecognised non-row text at {number}: {line}")
            continue
        left, target = re.split(r"\.{2,}", line, maxsplit=1)
        match, findings = LABEL.match(left.strip()), []
        if number == 27842:
            match = re.match(r"^(If) (AMAL Structure) (.*)$", left.strip())
            findings.append("missing-colon")
        target = target.strip()
        locator = re.search(r"(\d+\.(?:\d+|[A-F])\.\d+)$", target)
        if not match or not locator:
            raise ValueError(f"unparsed row at {number}: {line}")
        if target != locator[1]:
            findings.append("target-decoration")
        row = {
            "extract_line": number,
            "spelling": match[1],
            "role": match[2],
            "target": target,
            "target_page": locator[1],
            "findings": findings,
        }
        rows.append(reconcile(row, known))
    all_rows = [row for page in pages for row in page["entries"]]
    if rows or len(pages) != 20 or len(all_rows) != 818:
        raise ValueError("incomplete command-index audit")
    result = {f"14-G-{i:02}.json": page for i, page in enumerate(pages, 1)}
    result["source.json"] = {
        "title": core["title"],
        "product": core["product"],
        "source": core["source"],
        "held_extract": core["held_extract"],
        "extract_sha256": core["extract_sha256"],
        "extract_lines": [FIRST, LAST],
        "baseline_commit": "6091e09e5c57fd54957b275595d56d4e9e54f337",
        "scope": "Complete index locator reconciliation, not new syntax, aliases, native or edition qualification; Interface rows await a separate inventory",
        "files": list(result),
        "entries": len(all_rows),
        "surfaces": dict(sorted(Counter(row["surface"] for row in all_rows).items())),
        "findings": dict(
            sorted(Counter(f for row in all_rows for f in row["findings"]).items())
        ),
    }
    return result


def encode(data: dict) -> str:
    if isinstance(data.get("entries"), list):
        header = {key: value for key, value in data.items() if key != "entries"}
        prefix = json.dumps(header, ensure_ascii=False)[:-1]
        rows = ",\n".join(
            "    " + json.dumps(row, ensure_ascii=False) for row in data["entries"]
        )
        return prefix + ', "entries": [\n' + rows + "\n]}\n"
    return json.dumps(data, indent=2, ensure_ascii=False) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    result = audit(args.source)
    for file, data in result.items():
        text = encode(data)
        destination = OUT / file
        if args.check:
            if not destination.exists() or destination.read_text() != text:
                raise ValueError(f"stale or missing audit: {file}")
        else:
            OUT.mkdir(exist_ok=True)
            destination.write_text(text)
    if {path.name for path in OUT.glob("*.json")} != set(result):
        raise ValueError("unexpected command-index audit JSON")
    print(
        f"Verified {len(result) - 1} pages and {result['source.json']['entries']} rows"
    )


if __name__ == "__main__":
    main()
