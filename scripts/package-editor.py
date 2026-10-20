"""Package the declarative extension without downloading a packaging tool."""

import json
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
EDITOR = ROOT / "editors" / "vscode"
FILES = [
    "package.json",
    "language-configuration.json",
    "syntaxes/amos.tmLanguage.json",
    "README.md",
    "LICENSE",
    "icon.png",
]


def main() -> None:
    package = json.loads((EDITOR / "package.json").read_text())
    for source, packaged in [
        (
            ROOT / "syntaxes/amos.tmLanguage.json",
            EDITOR / "syntaxes/amos.tmLanguage.json",
        ),
        (ROOT / "LICENSE", EDITOR / "LICENSE"),
    ]:
        if source.read_bytes() != packaged.read_bytes():
            raise ValueError(f"stale editor file: {packaged.name}")
    name, version, publisher = [
        escape(package[key], {'"': "&quot;"})
        for key in ["name", "version", "publisher"]
    ]
    manifest = f'''<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011">
  <Metadata>
    <Identity Language="en-US" Id="{name}" Version="{version}" Publisher="{publisher}" />
    <DisplayName>{escape(package["displayName"])}</DisplayName>
    <Description xml:space="preserve">{escape(package["description"])}</Description>
    <Categories>Programming Languages</Categories>
    <Properties>
      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="{escape(package["engines"]["vscode"])}" />
      <Property Id="Microsoft.VisualStudio.Code.ExecutesCode" Value="false" />
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
    output = ROOT / "dist" / f"{publisher}-{name}-{version}.vsix"
    output.parent.mkdir(exist_ok=True)
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
