mod cls;
mod end;
mod print;
mod wait_key;

use crate::{StatementKind, Token, TokenKind};

pub(crate) fn parse(source: &str, head: &Token, args: &[&Token]) -> StatementKind {
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
        _ => StatementKind::UnresolvedInvocation {
            name: head.span.clone(),
        },
    }
}
