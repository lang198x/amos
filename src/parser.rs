use crate::{
    Diagnostic, DiagnosticKind, Statement, StatementKind, Token, TokenKind, instructions, segments,
};

pub(crate) fn parse(
    source: &str,
    tokens: &[Token],
    diagnostics: &mut Vec<Diagnostic>,
) -> Vec<Statement> {
    let segments = segments::collect(tokens, diagnostics);
    let mut statements = Vec::new();
    let mut index = 0;
    while index < segments.len() {
        if let Some((statement, consumed)) =
            instructions::if_block::parse(source, &segments[index..], diagnostics)
        {
            statements.push(statement);
            index += consumed;
        } else {
            statements.push(statement(source, &segments[index], diagnostics));
            index += 1;
        }
    }
    statements
}

pub(crate) fn statement(
    source: &str,
    segment: &segments::Segment<'_>,
    diagnostics: &mut Vec<Diagnostic>,
) -> Statement {
    let first = segment.tokens[0];
    let before = diagnostics.len();
    let kind = instructions::parse(source, first, &segment.tokens[1..], diagnostics);
    let message = match kind {
        StatementKind::Unsupported => Some("form is outside the supported source surface"),
        StatementKind::UnresolvedInvocation { .. } => {
            Some("unresolved statement; may require procedure or extension analysis")
        }
        _ => None,
    };
    if let Some(message) = message
        && diagnostics.len() == before
        && !segment.tokens.iter().any(|t| {
            matches!(
                t.kind,
                TokenKind::UnterminatedString | TokenKind::InvalidControl
            )
        })
    {
        diagnostics.push(Diagnostic {
            kind: DiagnosticKind::Unsupported,
            span: segment.span.clone(),
            message,
        });
    }
    Statement {
        span: segment.span.clone(),
        kind,
    }
}
