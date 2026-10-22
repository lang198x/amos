"""Check the support guide's prose and the split reference's retained links."""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'docs/plans/2026-10-22-coverage-anchors.json'


def anchors(text: str) -> set[str]:
    headings = re.findall(r'^#{1,6} (.+)$', text, re.MULTILINE)
    result = {
        re.sub(r'[^\w\- ]', '', heading.lower()).replace(' ', '-')
        for heading in headings
    }
    return result | set(re.findall(r'<a id="([^"]+)"', text))


def check_links(path: Path) -> None:
    for link in re.findall(r'\]\(([^)]+)\)', path.read_text()):
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        target = path.parent / unquote(url.path) if url.path else path
        if not target.is_file():
            raise ValueError(f'{path.name}: missing link target {link}')
        if url.fragment and unquote(url.fragment) not in anchors(target.read_text()):
            raise ValueError(f'{path.name}: missing fragment {link}')


def check_metrics(metrics: dict[str, float]) -> None:
    for key in ('words', 'sentences'):
        if metrics.get(key, 0) <= 0:
            raise ValueError(f'no measured prose: {key}')
    score = metrics.get('flesch_kincaid')
    if score is None or not 0 <= score <= 10:
        raise ValueError(f'guide exceeds grade 10 or has invalid score: {score}')


def measure(path: Path) -> dict[str, float]:
    result = subprocess.run(
        ['vale', 'ls-metrics', str(path)], capture_output=True, text=True,
        check=True, timeout=30,
    )
    return json.loads(result.stdout)


def check_split(guide: Path, reference: Path, retained: set[str]) -> None:
    for path in (guide, reference):
        missing = retained - anchors(path.read_text())
        if missing:
            raise ValueError(f'{path.name}: lost anchors {sorted(missing)}')
        check_links(path)
    for anchor in retained:
        if f'highlighting-coverage.md#{anchor}' not in guide.read_text():
            raise ValueError(f'guide does not forward {anchor}')


def main() -> None:
    guide, reference = ROOT / 'docs/coverage.md', ROOT / 'docs/highlighting-coverage.md'
    check_split(guide, reference, set(json.loads(MANIFEST.read_text())))
    metrics = measure(guide)
    check_metrics(metrics)
    detail = measure(reference)
    print(json.dumps({
        'guide': metrics, 'reference': detail,
        'retained_anchors': len(json.loads(MANIFEST.read_text())),
        'scope': 'Vale prose only; code and tables need review. Score is not comprehension.',
    }, indent=2))


if __name__ == '__main__':
    main()
