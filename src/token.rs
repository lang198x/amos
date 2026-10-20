use crate::Span;

/// Lexical category; token text always comes from the original source range.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum TokenKind {
    Whitespace,
    Newline,
    Word,
    Integer,
    String,
    UnterminatedString,
    Colon,
    Comment,
    Symbol,
    InvalidControl,
}

/// A lossless token, including whitespace and comments.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Token {
    pub kind: TokenKind,
    pub span: Span,
}
