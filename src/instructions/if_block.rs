use crate::{
    Diagnostic, DiagnosticKind, Statement, StatementKind, TokenKind, expression, parser,
    segments::Segment,
};

pub(crate) fn parse(
    source: &str,
    segments: &[Segment<'_>],
    diagnostics: &mut Vec<Diagnostic>,
) -> Option<(Statement, usize)> {
    let header = segments.first()?;
    if !word(source, header, "If")
        || header.separator != Some(TokenKind::Newline)
        || header
            .tokens
            .iter()
            .any(|token| expression::text(source, token, "Then"))
    {
        return None;
    }
    let condition = expression::equality(source, &header.tokens[1..], header.span.end);
    let (end, complex) = matching_end(source, segments);
    let span = header.span.start..end.map_or(header.span.end, |index| segments[index].span.end);
    let consumed = end.map_or(1, |index| index + 1);
    let unsupported = Statement {
        span: span.clone(),
        kind: StatementKind::Unsupported,
    };
    let condition = match condition {
        Ok(condition) => condition,
        Err(expression::Failure::Missing(span)) => {
            diagnostics.push(Diagnostic {
                kind: DiagnosticKind::Invalid,
                span,
                message: "missing If comparison operand",
            });
            return Some((unsupported, consumed));
        }
        Err(expression::Failure::Unsupported) => {
            diagnostics.push(Diagnostic {
                kind: DiagnosticKind::Unsupported,
                span,
                message: "If condition is outside the supported equality form",
            });
            return Some((unsupported, consumed));
        }
    };
    let Some(end) = end else {
        diagnostics.push(Diagnostic {
            kind: DiagnosticKind::Invalid,
            span: header.span.clone(),
            message: "missing End If; later statements retained for recovery",
        });
        return Some((unsupported, 1));
    };
    if complex {
        diagnostics.push(Diagnostic {
            kind: DiagnosticKind::Unsupported,
            span,
            message: "Else and nested If blocks are not supported",
        });
        return Some((unsupported, consumed));
    }
    let body = segments[1..end]
        .iter()
        .map(|segment| parser::statement(source, segment, diagnostics))
        .collect();
    Some((
        Statement {
            span,
            kind: StatementKind::If { condition, body },
        },
        consumed,
    ))
}

fn matching_end(source: &str, segments: &[Segment<'_>]) -> (Option<usize>, bool) {
    let (mut depth, mut complex) = (1, false);
    for (index, segment) in segments.iter().enumerate().skip(1) {
        if word(source, segment, "If") {
            complex = true;
            if segment.separator == Some(TokenKind::Newline)
                && !segment
                    .tokens
                    .iter()
                    .any(|token| expression::text(source, token, "Then"))
            {
                depth += 1;
            }
        }
        if word(source, segment, "Else") {
            complex = true;
        }
        if segment.tokens.len() == 2
            && word(source, segment, "End")
            && expression::text(source, segment.tokens[1], "If")
        {
            depth -= 1;
            if depth == 0 {
                return (Some(index), complex);
            }
        }
    }
    (None, complex)
}

fn word(source: &str, segment: &Segment<'_>, expected: &str) -> bool {
    segment.tokens[0].kind == TokenKind::Word
        && expression::text(source, segment.tokens[0], expected)
}
