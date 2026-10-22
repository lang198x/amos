mod assignment;
mod cls;
mod end;
pub(crate) mod if_block;
mod print;
mod wait_key;

use crate::{Diagnostic, StatementKind, Token, TokenKind, expression};

pub(crate) fn parse(
    source: &str,
    head: &Token,
    args: &[&Token],
    diagnostics: &mut Vec<Diagnostic>,
) -> StatementKind {
    if head.kind != TokenKind::Word {
        return StatementKind::Unsupported;
    }
    match source[head.span.clone()].to_ascii_lowercase().as_str() {
        "cls" => cls::parse(args),
        "print" => print::parse(args),
        "wait" => wait_key::parse(source, args),
        "end" => end::parse(args),
        "if" | "then" | "else" | "do" | "loop" | "for" | "next" | "repeat" | "until" | "while"
        | "wend" | "procedure" => StatementKind::Unsupported,
        _ if args
            .first()
            .is_some_and(|token| expression::text(source, token, "=")) =>
        {
            assignment::parse(source, head, args, diagnostics)
        }
        _ => StatementKind::UnresolvedInvocation {
            name: head.span.clone(),
        },
    }
}
