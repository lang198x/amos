use crate::{Expression, Span, Token, TokenKind};

pub(crate) enum Failure {
    Missing(Span),
    Unsupported,
}

pub(crate) fn atom(source: &str, tokens: &[&Token], missing: usize) -> Result<Expression, Failure> {
    match tokens {
        [] => Err(Failure::Missing(missing..missing)),
        [minus] if text(source, minus, "-") => {
            Err(Failure::Missing(minus.span.end..minus.span.end))
        }
        [token] => match token.kind {
            TokenKind::Integer => Ok(Expression::IntegerLiteral(token.span.clone())),
            TokenKind::String => Ok(Expression::StringLiteral(token.span.clone())),
            TokenKind::Word => Ok(Expression::Name(token.span.clone())),
            _ => Err(Failure::Unsupported),
        },
        [minus, value] if text(source, minus, "-") => Ok(Expression::Negate {
            span: minus.span.start..value.span.end,
            operand: Box::new(atom(source, &tokens[1..], minus.span.end)?),
        }),
        _ => Err(Failure::Unsupported),
    }
}

pub(crate) fn equality(
    source: &str,
    tokens: &[&Token],
    missing: usize,
) -> Result<Expression, Failure> {
    let Some(index) = tokens.iter().position(|token| text(source, token, "=")) else {
        return if tokens.is_empty() {
            Err(Failure::Missing(missing..missing))
        } else {
            Err(Failure::Unsupported)
        };
    };
    let left = atom(source, &tokens[..index], tokens[index].span.start)?;
    let right = atom(source, &tokens[index + 1..], tokens[index].span.end)?;
    let start = tokens.first().map_or(missing, |token| token.span.start);
    let end = tokens.last().map_or(missing, |token| token.span.end);
    Ok(Expression::Equal {
        span: start..end,
        left: Box::new(left),
        right: Box::new(right),
    })
}

pub(crate) fn text(source: &str, token: &Token, expected: &str) -> bool {
    source[token.span.clone()].eq_ignore_ascii_case(expected)
}
