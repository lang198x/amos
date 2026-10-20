use crate::{Expression, StatementKind, Token, TokenKind};

pub(super) fn parse(args: &[&Token]) -> StatementKind {
    match args {
        [] => StatementKind::Cls { colour: None },
        [colour] if colour.kind == TokenKind::Integer => StatementKind::Cls {
            colour: Some(Expression::IntegerLiteral(colour.span.clone())),
        },
        _ => StatementKind::Unsupported,
    }
}
