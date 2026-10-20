use crate::{StatementKind, Token, TokenKind};

pub(super) fn parse(source: &str, args: &[&Token]) -> StatementKind {
    match args {
        [key]
            if key.kind == TokenKind::Word
                && source[key.span.clone()].eq_ignore_ascii_case("Key") =>
        {
            StatementKind::WaitKey
        }
        _ => StatementKind::Unsupported,
    }
}
