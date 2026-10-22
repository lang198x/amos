use crate::{Diagnostic, DiagnosticKind, Span, Token, TokenKind};

pub(crate) struct Segment<'a> {
    pub tokens: Vec<&'a Token>,
    pub span: Span,
    pub separator: Option<TokenKind>,
}

pub(crate) fn collect<'a>(
    tokens: &'a [Token],
    diagnostics: &mut Vec<Diagnostic>,
) -> Vec<Segment<'a>> {
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
    tokens
        .split_inclusive(|t| matches!(t.kind, TokenKind::Colon | TokenKind::Newline))
        .filter_map(|segment| {
            let separator = segment
                .last()
                .filter(|t| matches!(t.kind, TokenKind::Colon | TokenKind::Newline))
                .map(|t| t.kind);
            let significant: Vec<_> = segment
                .iter()
                .filter(|t| {
                    !matches!(
                        t.kind,
                        TokenKind::Whitespace
                            | TokenKind::Comment
                            | TokenKind::Colon
                            | TokenKind::Newline
                    )
                })
                .collect();
            let (Some(first), Some(last)) = (significant.first(), significant.last()) else {
                return None;
            };
            Some(Segment {
                span: first.span.start..last.span.end,
                tokens: significant,
                separator,
            })
        })
        .collect()
}
