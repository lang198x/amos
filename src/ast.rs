use crate::Span;

/// A supported expression with a range into the original source.
#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub enum Expression {
    /// Decimal digits, retained without narrowing to a host integer type.
    IntegerLiteral(Span),
    /// A lexical name with its original spelling and suffix; not resolved.
    Name(Span),
    /// One unary minus; no value is evaluated or narrowed.
    Negate {
        span: Span,
        operand: Box<Expression>,
    },
    /// The single equality comparison in a supported If header.
    Equal {
        span: Span,
        left: Box<Expression>,
        right: Box<Expression>,
    },
    /// The quoted literal's full range, including its delimiters.
    StringLiteral(Span),
}

/// Typed statement nodes for the first supported surface.
#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub enum StatementKind {
    /// A named target and one supported value expression.
    Assignment {
        target: Span,
        value: Expression,
    },
    /// A complete multiline block; the statement span includes End If.
    If {
        condition: Expression,
        body: Vec<Statement>,
    },
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
