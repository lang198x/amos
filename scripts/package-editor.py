"""Package the declarative extension without downloading a packaging tool."""

import argparse
import json
import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
EDITOR = ROOT / "editors" / "vscode"
FILES = [
    "package.json",
    "language-configuration.json",
    "amal-language-configuration.json",
    "interface-language-configuration.json",
    "syntaxes/amos.tmLanguage.json",
    "syntaxes/amos-3d.tmLanguage.json",
    "syntaxes/amal.tmLanguage.json",
    "syntaxes/interface.tmLanguage.json",
    "README.md",
    "LICENSE",
    "icon.png",
]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pre-release", action="store_true")
    parser.add_argument(
        "--public", action="store_true", help="Make the Marketplace listing public"
    )
    parser.add_argument("--output-directory", type=Path, default=ROOT / "dist")
    args = parser.parse_args()
    package = json.loads((EDITOR / "package.json").read_text())
    if not re.fullmatch(r"[0-9]+\.[0-9]+\.[0-9]+", package["version"]):
        raise ValueError("VS Code requires a numeric major.minor.patch version")
    if package.get("preview") is True and not args.pre_release:
        raise ValueError("preview extension requires --pre-release")
    for source, packaged in [
        (
            ROOT / "syntaxes/amos.tmLanguage.json",
            EDITOR / "syntaxes/amos.tmLanguage.json",
        ),
        (
            ROOT / "syntaxes/amos-3d.tmLanguage.json",
            EDITOR / "syntaxes/amos-3d.tmLanguage.json",
        ),
        (
            ROOT / "syntaxes/amal.tmLanguage.json",
            EDITOR / "syntaxes/amal.tmLanguage.json",
        ),
        (
            ROOT / "syntaxes/interface.tmLanguage.json",
            EDITOR / "syntaxes/interface.tmLanguage.json",
        ),
        (ROOT / "LICENSE", EDITOR / "LICENSE"),
    ]:
        if source.read_bytes() != packaged.read_bytes():
            raise ValueError(f"stale editor file: {packaged.name}")
    name, version, publisher = [
        escape(package[key], {'"': "&quot;"})
        for key in ["name", "version", "publisher"]
    ]
    flags = (["Public"] if args.public else []) + (
        ["Preview"] if package.get("preview") else []
    )
    gallery_flags = f"<GalleryFlags>{' '.join(flags)}</GalleryFlags>" if flags else ""
    pre_release = (
        '<Property Id="Microsoft.VisualStudio.Code.PreRelease" Value="true" />'
        if args.pre_release
        else ""
    )
    manifest = f'''<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011">
  <Metadata>
    <Identity Language="en-US" Id="{name}" Version="{version}" Publisher="{publisher}" />
    <DisplayName>{escape(package["displayName"])}</DisplayName>
    <Description xml:space="preserve">{escape(package["description"])}</Description>
    <Categories>Programming Languages</Categories>
    {gallery_flags}
    <Properties>
      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="{escape(package["engines"]["vscode"])}" />
      <Property Id="Microsoft.VisualStudio.Code.ExecutesCode" Value="false" />
      {pre_release}
    </Properties>
    <License>extension/LICENSE</License>
    <Icon>extension/icon.png</Icon>
  </Metadata>
  <Installation><InstallationTarget Id="Microsoft.VisualStudio.Code" /></Installation>
  <Dependencies />
  <Assets>
    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
    <Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true" />
    <Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE" Addressable="true" />
    <Asset Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/icon.png" Addressable="true" />
  </Assets>
</PackageManifest>
'''
    content_types = """<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="json" ContentType="application/json" />
  <Default Extension="md" ContentType="text/markdown" />
  <Default Extension="vsixmanifest" ContentType="text/xml" />
  <Default Extension="png" ContentType="image/png" />
  <Override PartName="/extension/LICENSE" ContentType="text/plain" />
</Types>
"""
    output = args.output_directory / f"{publisher}-{name}-{version}.vsix"
    output.parent.mkdir(parents=True, exist_ok=True)
    entries = {
        "extension.vsixmanifest": manifest.encode(),
        "[Content_Types].xml": content_types.encode(),
    }
    entries.update(
        {f"extension/{name}": (EDITOR / name).read_bytes() for name in FILES}
    )
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, content in sorted(entries.items()):
            item = zipfile.ZipInfo(name, date_time=(2026, 10, 20, 0, 0, 0))
            item.compress_type = zipfile.ZIP_DEFLATED
            item.external_attr = 0o100644 << 16
            archive.writestr(item, content)
    with zipfile.ZipFile(output) as archive:
        if archive.testzip() is not None or set(archive.namelist()) != set(entries):
            raise ValueError("invalid extension archive")
    print(output.name)


if __name__ == "__main__":
    main()
