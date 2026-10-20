use crate::{Expression, StatementKind, Token, TokenKind};

pub(super) fn parse(args: &[&Token]) -> StatementKind {
    match args {
        [value] if value.kind == TokenKind::String => StatementKind::Print {
            value: Expression::StringLiteral(value.span.clone()),
        },
        _ => StatementKind::Unsupported,
    }
}
