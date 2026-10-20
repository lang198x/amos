use crate::{Diagnostic, DiagnosticKind, ParsedProgram, parse};

/// Explicit release/component selection. Unknown selections never pass a check.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Profile<'a> {
    pub id: &'a str,
    pub extensions: &'a [&'a str],
}

/// Outcome of checking source against this tool's bounded implementation.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CheckStatus {
    /// Source structure is supported; this is not a native execution verdict.
    SupportedStructure,
    Invalid,
    Unsupported,
    UnknownCompatibility,
}

/// Structure and profile findings from the canonical parser/checker.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CheckedProgram<'src> {
    pub program: ParsedProgram<'src>,
    pub status: CheckStatus,
}

/// Check the supported source surface with an explicit profile.
///
/// Only `amos-pro-2.00-observed` without additional extension claims is currently
/// recognised. Even that profile has native observations for a small corpus,
/// not a conformance guarantee for arbitrary programs.
#[must_use]
pub fn check<'src>(source: &'src str, profile: &Profile<'_>) -> CheckedProgram<'src> {
    let mut program = parse(source);
    if profile.id != "amos-pro-2.00-observed" || !profile.extensions.is_empty() {
        program.diagnostics.push(Diagnostic {
            kind: DiagnosticKind::UnknownProfile,
            span: 0..0,
            message: "release or extension configuration is not qualified",
        });
    }
    let status = if program
        .diagnostics
        .iter()
        .any(|d| d.kind == DiagnosticKind::Invalid)
    {
        CheckStatus::Invalid
    } else if program
        .diagnostics
        .iter()
        .any(|d| d.kind == DiagnosticKind::UnknownProfile)
    {
        CheckStatus::UnknownCompatibility
    } else if program.diagnostics.is_empty() {
        CheckStatus::SupportedStructure
    } else {
        CheckStatus::Unsupported
    };
    CheckedProgram { program, status }
}
