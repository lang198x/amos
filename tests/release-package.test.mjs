import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const repository = new URL('../', import.meta.url);
const builder = new URL('../scripts/package-editor.py', import.meta.url);
const inspect = (file) => JSON.parse(execFileSync('python3', ['-c', `
import json, sys, zipfile, xml.etree.ElementTree as ET
with zipfile.ZipFile(sys.argv[1]) as archive:
    root = ET.fromstring(archive.read('extension.vsixmanifest'))
    ns = {'v': 'http://schemas.microsoft.com/developer/vsx-schema/2011'}
    metadata = root.find('v:Metadata', ns)
    print(json.dumps({
        'flags': metadata.findtext('v:GalleryFlags', namespaces=ns).split(),
        'properties': {p.attrib['Id']: p.attrib['Value'] for p in metadata.findall('v:Properties/v:Property', ns)},
        'identity': metadata.find('v:Identity', ns).attrib,
        'package': json.loads(archive.read('extension/package.json')),
    }))
`, file], { encoding: 'utf8' }));
const assertPreview = (archive) => {
  assert.deepEqual(archive.flags, ['Preview']);
  assert.equal(archive.properties['Microsoft.VisualStudio.Code.PreRelease'], 'true');
  assert.equal(archive.properties['Microsoft.VisualStudio.Code.ExecutesCode'], 'false');
  assert.equal(archive.package.preview, true);
  assert.equal(archive.identity.Version, archive.package.version);
};

test('preview package defaults keep npm on next and the editor on a numeric matching version', async () => {
  const npm = JSON.parse(await readFile(new URL('package.json', repository), 'utf8'));
  const editor = JSON.parse(await readFile(new URL('editors/vscode/package.json', repository), 'utf8'));
  assert.equal(npm.version, editor.version);
  assert.match(editor.version, /^[0-9]+\.[0-9]+\.[0-9]+$/);
  assert.equal(npm.publishConfig.tag, 'next');
  assert.equal(editor.preview, true);
});

test('built VSIX carries both Preview label and prerelease channel without a Public flag', async () => {
  const output = await mkdtemp(join(tmpdir(), 'amos-preview-package-'));
  try {
    const name = execFileSync('python3', [builder.pathname, '--pre-release', '--output-directory', output], { encoding: 'utf8' }).trim();
    const archive = inspect(join(output, name));
    assertPreview(archive);
    // A Preview gallery label alone must not satisfy the prerelease-channel check.
    delete archive.properties['Microsoft.VisualStudio.Code.PreRelease'];
    assert.throws(() => assertPreview(archive), assert.AssertionError);
  } finally {
    await rm(output, { recursive: true });
  }
});

test('preview packaging refuses to silently build without the prerelease channel flag', async () => {
  const output = await mkdtemp(join(tmpdir(), 'amos-preview-package-'));
  try {
    assert.throws(() => execFileSync('python3', [builder.pathname, '--output-directory', output], { stdio: 'pipe' }), (error) => {
      assert.ok(error.stderr.toString().includes('preview extension requires --pre-release'));
      return true;
    });
  } finally {
    await rm(output, { recursive: true });
  }
});
