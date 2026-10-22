"""Replay one bounded native trial from an edition's blank-editor checkpoint.

Output is private: requests contain local media paths and snapshots contain
original runtime bytes. Only inspected, non-personalised captures may be copied
into the public corpus. The script does not infer results from RPC success.
"""
from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CASES = ('equal', 'unequal', 'missing-value', 'missing-end-if')


def typing_steps(text: str, keymap: str) -> list[tuple[str, dict]]:
    if keymap == 'us':
        return [('type_string', {'text': text, 'hold_frames': 3, 'settle_frames': 30})]
    # The emulator's US chord for @ is Shift+2. These tested guest keymaps
    # use Shift+2 for a quote. Keep actual source distinct from key events.
    steps: list[tuple[str, dict]] = []
    parts = text.split('"')
    for index, part in enumerate(parts):
        if index:
            steps.append(('press_keys', {'keys': ['lshift', '2'], 'hold_frames': 3}))
        if part:
            steps.append(('type_string', {'text': part, 'hold_frames': 3, 'settle_frames': 3}))
    steps.append(('run_frames', {'frames': 30}))
    return steps


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('case', choices=CASES)
    for option in ('emulator', 'kickstart', 'media', 'snapshot', 'output-directory'):
        parser.add_argument('--' + option, type=Path, required=True)
    parser.add_argument('--model', choices=('a1200', 'a500-a501'), required=True)
    parser.add_argument('--keymap', choices=('us', 'shift-2-quote'), required=True)
    args = parser.parse_args()
    for path in (args.emulator, args.kickstart, args.media, args.snapshot):
        if not path.is_file():
            parser.error(f'missing input: {path}')
    source = (ROOT / 'corpus/editions/perfect-ten/sources' / f'{args.case}.amos.txt').read_text()
    output = args.output_directory
    output.mkdir(parents=True, exist_ok=False)
    def run(label: str, steps: list[tuple[str, dict]]) -> None:
        requests = [
            {'jsonrpc': '2.0', 'id': index + 1, 'method': 'tools/call',
             'params': {'name': name, 'arguments': arguments}}
            for index, (name, arguments) in enumerate(steps)
        ]
        (output / f'{label}-requests.json').write_text(json.dumps(requests, indent=2) + '\n')
        result = subprocess.run(
            [str(args.emulator), '--model', args.model, '--kickstart', str(args.kickstart), '--mcp'],
            input='\n'.join(map(json.dumps, requests)) + '\n', text=True,
            capture_output=True, timeout=50, check=False,
        )
        (output / f'{label}-stdout.jsonl').write_text(result.stdout)
        (output / f'{label}-stderr.txt').write_text(result.stderr)
        result.check_returncode()
        responses = [json.loads(line) for line in result.stdout.splitlines()]
        if len(responses) != len(requests) or any(
            'error' in response or response['result'].get('isError') for response in responses
        ):
            raise RuntimeError('missing or failed RPC response; inspect private logs')

    def restore(snapshot: Path) -> list[tuple[str, dict]]:
        return [
            ('load_media', {'slot': 'floppy-0', 'kind': 'disk', 'path': str(args.media)}),
            ('load_snapshot', {'path': str(snapshot)}),
        ]

    checkpoint = output / 'typed.state'
    for index, start in enumerate(range(0, len(source), 70)):
        run(f'part-{index:02}', [
            *restore(args.snapshot if index == 0 else checkpoint),
            *typing_steps(source[start:start + 70], args.keymap),
            ('save_snapshot', {'path': str(checkpoint)}),
        ])
    run('result', [
        *restore(checkpoint),
        ('run_frames', {'frames': 1}),
        ('save_screenshot', {'path': str(output / 'editor.png')}),
        ('press_key', {'key': 'f2' if args.case.startswith('missing') else 'f1', 'hold_frames': 3}),
        ('save_screenshot', {'path': str(output / 'immediate.png')}),
        ('run_frames', {'frames': 100}),
        ('save_screenshot', {'path': str(output / 'result.png')}),
    ])
    print('All RPCs passed. Inspect editor, immediate and settled captures before recording a result.')


if __name__ == '__main__':
    main()
