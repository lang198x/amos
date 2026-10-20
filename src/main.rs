use lang198x_amos::{CheckStatus, DiagnosticKind, Profile, check, location};
use std::{env, fs, process::ExitCode};

fn run() -> Result<ExitCode, String> {
    let args: Vec<_> = env::args().skip(1).collect();
    if args.as_slice() == ["--help"] {
        println!(
            "usage: lang198x-amos check --profile PROFILE FILE\n\nChecks supported source structure, not native runtime compatibility.\nProfile: amos-pro-2.00-observed (no additional extension qualification)"
        );
        return Ok(ExitCode::SUCCESS);
    }
    let [command, option, profile, path] = args.as_slice() else {
        return Err("usage: lang198x-amos check --profile PROFILE FILE".into());
    };
    if command != "check" || option != "--profile" {
        return Err("usage: lang198x-amos check --profile PROFILE FILE".into());
    }
    let source = fs::read_to_string(path).map_err(|error| {
        format!("{path}: cannot read UTF-8 text listing: {error}; native files need decoding")
    })?;
    let checked = check(
        &source,
        &Profile {
            id: profile,
            extensions: &[],
        },
    );
    for diagnostic in &checked.program.diagnostics {
        let (line, column) =
            location(&source, diagnostic.span.start).ok_or("invalid diagnostic source range")?;
        let kind = match diagnostic.kind {
            DiagnosticKind::Invalid => "invalid",
            DiagnosticKind::Unsupported => "unsupported",
            DiagnosticKind::UnknownProfile => "unknown-profile",
            _ => "unknown",
        };
        eprintln!("{path}:{line}:{column}: {kind}: {}", diagnostic.message);
    }
    match checked.status {
        CheckStatus::SupportedStructure => {
            println!(
                "supported source structure: {} statements; profile {profile}; native compatibility not established by this check",
                checked.program.statements.len()
            );
            Ok(ExitCode::SUCCESS)
        }
        CheckStatus::Invalid => Ok(ExitCode::from(1)),
        CheckStatus::Unsupported => Ok(ExitCode::from(2)),
        CheckStatus::UnknownCompatibility => Ok(ExitCode::from(3)),
    }
}

fn main() -> ExitCode {
    match run() {
        Ok(code) => code,
        Err(message) => {
            eprintln!("{message}");
            ExitCode::from(64)
        }
    }
}
