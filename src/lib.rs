//! Source-preserving parsing for a bounded AMOS surface.
//!
//! Parsing is independent of native compatibility. See [`check`] and the
//! repository's coverage document before interpreting a result.
mod ast;
mod diagnostic;
mod expression;
mod instructions;
mod lexer;
mod location;
mod parser;
mod profile;
mod segments;
mod token;

pub use ast::{Expression, Statement, StatementKind};
pub use diagnostic::{Diagnostic, DiagnosticKind};
pub use location::location;
pub use profile::{CheckStatus, CheckedProgram, Profile, check};
pub use token::{Token, TokenKind};

/// Half-open UTF-8 byte range in the unmodified input.
pub type Span = std::ops::Range<usize>;

/// Original source, complete tokens, typed statements and recovery diagnostics.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ParsedProgram<'src> {
    pub source: &'src str,
    pub tokens: Vec<Token>,
    pub statements: Vec<Statement>,
    pub diagnostics: Vec<Diagnostic>,
}

/// Parse a UTF-8 listing without asserting release or runtime compatibility.
///
/// Unsupported statements retain their source range and produce diagnostics.
/// No input is silently discarded to obtain a successful result.
#[must_use]
pub fn parse(source: &str) -> ParsedProgram<'_> {
    let (tokens, mut diagnostics) = lexer::lex(source);
    for (offset, ch) in source.char_indices() {
        if ch.is_control() && !matches!(ch, '\t' | '\r' | '\n') {
            diagnostics.push(Diagnostic {
                kind: DiagnosticKind::Invalid,
                span: offset..offset + ch.len_utf8(),
                message: "control character in plain-text listing; native files require a format decoder",
            });
        }
    }
    let statements = parser::parse(source, &tokens, &mut diagnostics);
    ParsedProgram {
        source,
        tokens,
        statements,
        diagnostics,
    }
}
