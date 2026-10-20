use crate::{StatementKind, Token};

pub(super) fn parse(args: &[&Token]) -> StatementKind {
    if args.is_empty() {
        StatementKind::End
    } else {
        StatementKind::Unsupported
    }
}
