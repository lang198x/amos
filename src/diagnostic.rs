use crate::Span;

/// The reason a check cannot report supported source structure.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum DiagnosticKind {
    /// A malformed form within the supported surface, or invalid text input.
    Invalid,
    /// A construct outside this parser's implemented surface.
    Unsupported,
    /// The selected release/component configuration is not qualified.
    UnknownProfile,
}

/// A diagnostic located in the original source.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Diagnostic {
    pub kind: DiagnosticKind,
    pub span: Span,
    pub message: &'static str,
}
