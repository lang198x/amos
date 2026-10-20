use crate::{Diagnostic, DiagnosticKind, Statement, StatementKind, Token, TokenKind, instructions};

pub(crate) fn parse(
    source: &str,
    tokens: &[Token],
    diagnostics: &mut Vec<Diagnostic>,
) -> Vec<Statement> {
    let mut statements = Vec::new();
    let mut has_statement = false;
    for token in tokens {
        match token.kind {
            TokenKind::Colon => {
                if !has_statement {
                    diagnostics.push(Diagnostic {
                        kind: DiagnosticKind::Unsupported,
                        span: token.span.clone(),
                        message: "empty colon statement is not qualified",
                    });
                }
                has_statement = false;
            }
            TokenKind::Newline => has_statement = false,
            TokenKind::Whitespace | TokenKind::Comment => {}
            _ => has_statement = true,
        }
    }
    for segment in tokens.split(|t| matches!(t.kind, TokenKind::Colon | TokenKind::Newline)) {
        let significant: Vec<_> = segment
            .iter()
            .filter(|t| !matches!(t.kind, TokenKind::Whitespace | TokenKind::Comment))
            .collect();
        let (Some(first), Some(last)) = (significant.first(), significant.last()) else {
            continue;
        };
        let span = first.span.start..last.span.end;
        let kind = instructions::parse(source, first, &significant[1..]);
        let message = match kind {
            StatementKind::Unsupported => {
                Some("form is outside the supported opening-program surface")
            }
            StatementKind::UnresolvedInvocation { .. } => {
                Some("unresolved statement; may require procedure or extension analysis")
            }
            _ => None,
        };
        if let Some(message) = message
            && !significant.iter().any(|t| {
                matches!(
                    t.kind,
                    TokenKind::UnterminatedString | TokenKind::InvalidControl
                )
            })
        {
            diagnostics.push(Diagnostic {
                kind: DiagnosticKind::Unsupported,
                span: span.clone(),
                message,
            });
        }
        statements.push(Statement { span, kind });
    }
    statements
}
