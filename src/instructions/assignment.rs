use crate::{Diagnostic, DiagnosticKind, StatementKind, Token, expression};

pub(super) fn parse(
    source: &str,
    head: &Token,
    args: &[&Token],
    diagnostics: &mut Vec<Diagnostic>,
) -> StatementKind {
    match expression::atom(source, &args[1..], args[0].span.end) {
        Ok(value) => StatementKind::Assignment {
            target: head.span.clone(),
            value,
        },
        Err(expression::Failure::Missing(span)) => {
            diagnostics.push(Diagnostic {
                kind: DiagnosticKind::Invalid,
                span,
                message: "missing assignment value",
            });
            StatementKind::Unsupported
        }
        Err(expression::Failure::Unsupported) => StatementKind::Unsupported,
    }
}
