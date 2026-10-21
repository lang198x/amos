"""Verify retained preview artifacts against committed preparation evidence."""

import argparse
import base64
import hashlib
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def verify(
    evidence: dict, release: dict, directory: Path, tag: str, commit: str
) -> None:
    """Reject incomplete or mismatched publication inputs before npm receives them."""
    if not re.fullmatch(r"v[0-9]+\.[0-9]+\.[0-9]+", tag):
        raise ValueError("invalid preview tag")
    if evidence["version"] != tag[1:] or release["tag_name"] != tag:
        raise ValueError("release version mismatch")
    if release["draft"] or not release["prerelease"] or not release["published_at"]:
        raise ValueError("release must be a published prerelease")
    if commit != evidence["source_commit"]:
        raise ValueError("release tag does not identify the verified source commit")
    if release["id"] != evidence["github_release"]["id"]:
        raise ValueError("release identity mismatch")
    expected = {
        f"lang198x-amos-{tag[1:]}.tgz",
        f"lang198x-lang198x-amos-{tag[1:]}.vsix",
    }
    artifacts = evidence["artifacts"]
    if len(artifacts) != 2 or {a["name"] for a in artifacts} != expected:
        raise ValueError("incomplete artifact evidence")
    if {a["name"] for a in release["assets"]} != expected | {"SHA256SUMS"}:
        raise ValueError("release asset set mismatch")
    for artifact in artifacts:
        content = (directory / artifact["name"]).read_bytes()
        integrity = (
            "sha512-" + base64.b64encode(hashlib.sha512(content).digest()).decode()
        )
        if (
            len(content) != artifact["size"]
            or hashlib.sha256(content).hexdigest() != artifact["sha256"]
            or integrity != artifact["sha512_integrity"]
        ):
            raise ValueError(f"artifact integrity mismatch: {artifact['name']}")
    checksums = "".join(f"{a['sha256']}  {a['name']}\n" for a in artifacts)
    if (directory / "SHA256SUMS").read_text() != checksums:
        raise ValueError("checksum asset mismatch")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("tag")
    parser.add_argument("directory", type=Path)
    args = parser.parse_args()
    if not re.fullmatch(r"v[0-9]+\.[0-9]+\.[0-9]+", args.tag):
        parser.error("invalid preview tag")
    evidence = json.loads(
        (ROOT / f"docs/releases/{args.tag[1:]}-evidence.json").read_text()
    )
    release = json.loads((args.directory / "release.json").read_text())
    commit = subprocess.check_output(
        ["git", "rev-parse", "--verify", f"refs/tags/{args.tag}^{{commit}}"],
        cwd=ROOT,
        text=True,
    ).strip()
    verify(evidence, release, args.directory, args.tag, commit)
    print(f"Verified {args.tag} artifacts against source {commit}")


if __name__ == "__main__":
    main()
