"""Publication must reject altered artifacts and unapproved release identities."""

import base64
import copy
import hashlib
import importlib.util
import tempfile
import unittest
from pathlib import Path

SPEC = importlib.util.spec_from_file_location(
    "preview_release",
    Path(__file__).resolve().parents[1] / "scripts/verify-preview-release.py",
)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class PreviewReleaseTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)
        artifacts = []
        for name in ["lang198x-amos-0.3.0.tgz", "lang198x-lang198x-amos-0.3.0.vsix"]:
            content = name.encode()
            (self.directory / name).write_bytes(content)
            artifacts.append(
                {
                    "name": name,
                    "size": len(content),
                    "sha256": hashlib.sha256(content).hexdigest(),
                    "sha512_integrity": "sha512-"
                    + base64.b64encode(hashlib.sha512(content).digest()).decode(),
                }
            )
        (self.directory / "SHA256SUMS").write_text(
            "".join(f"{a['sha256']}  {a['name']}\n" for a in artifacts)
        )
        self.evidence = {
            "version": "0.3.0",
            "source_commit": "a" * 40,
            "github_release": {"id": 1},
            "artifacts": artifacts,
        }
        self.release = {
            "tag_name": "v0.3.0",
            "id": 1,
            "draft": False,
            "prerelease": True,
            "published_at": "2026-10-21T00:00:00Z",
            "assets": [{"name": a["name"]} for a in artifacts]
            + [{"name": "SHA256SUMS"}],
        }

    def verify(self, release: dict | None = None, commit: str = "a" * 40) -> None:
        MODULE.verify(
            self.evidence, release or self.release, self.directory, "v0.3.0", commit
        )

    def test_complete_approved_release_passes(self) -> None:
        self.verify()

    def test_same_size_tampering_is_rejected_for_either_archive(self) -> None:
        for artifact in self.evidence["artifacts"]:
            with self.subTest(artifact=artifact["name"]):
                path = self.directory / artifact["name"]
                original = path.read_bytes()
                path.write_bytes(bytes([original[0] ^ 1]) + original[1:])
                with self.assertRaisesRegex(ValueError, "artifact integrity mismatch"):
                    self.verify()
                path.write_bytes(original)

    def test_wrong_source_commit_is_rejected(self) -> None:
        with self.assertRaisesRegex(ValueError, "source commit"):
            self.verify(commit="b" * 40)

    def test_draft_stable_and_wrong_release_are_rejected(self) -> None:
        for key, value in [
            ("draft", True),
            ("prerelease", False),
            ("published_at", None),
            ("id", 2),
            ("tag_name", "v0.2.0"),
        ]:
            with self.subTest(field=key):
                release = copy.deepcopy(self.release)
                release[key] = value
                with self.assertRaises(ValueError):
                    self.verify(release=release)

    def test_empty_artifact_evidence_is_rejected(self) -> None:
        self.evidence["artifacts"] = []
        with self.assertRaisesRegex(ValueError, "incomplete artifact evidence"):
            self.verify()

    def test_missing_release_asset_is_rejected(self) -> None:
        self.release["assets"].pop()
        with self.assertRaisesRegex(ValueError, "asset set mismatch"):
            self.verify()

    def test_changed_checksum_asset_is_rejected(self) -> None:
        (self.directory / "SHA256SUMS").write_text("")
        with self.assertRaisesRegex(ValueError, "checksum asset mismatch"):
            self.verify()
