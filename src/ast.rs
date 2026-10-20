use crate::Span;

/// A supported expression with a range into the original source.
#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub enum Expression {
    /// Decimal digits, retained without narrowing to a host integer type.
    IntegerLiteral(Span),
    /// The quoted literal's full range, including its delimiters.
    StringLiteral(Span),
}

/// Typed statement nodes for the first supported surface.
#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub enum StatementKind {
    Cls {
        colour: Option<Expression>,
    },
    Print {
        value: Expression,
    },
    WaitKey,
    End,
    /// A recognised statement family or form not yet analysed.
    Unsupported,
    /// May be a procedure/extension invocation; resolution is not implemented.
    UnresolvedInvocation {
        name: Span,
    },
}

/// Statement range excludes surrounding whitespace and the separator.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Statement {
    pub span: Span,
    pub kind: StatementKind,
}
