use lang198x_amos::{
    Expression, ParsedProgram, Profile, Span, Statement, StatementKind, check, parse,
};

pub fn valid_span(source: &str, span: &Span) {
    assert!(span.start <= span.end, "reversed span: {span:?}");
    assert!(source.get(span.clone()).is_some(), "invalid span: {span:?}");
}

fn child_span(source: &str, span: &Span, parent: &Span) {
    valid_span(source, span);
    assert!(span.start >= parent.start && span.end <= parent.end);
}

pub fn parsed_contract(program: &ParsedProgram<'_>) {
    let source = program.source;
    let mut next = 0;
    let mut reconstructed = String::new();
    for token in &program.tokens {
        valid_span(source, &token.span);
        assert_eq!(token.span.start, next, "gap or overlap between tokens");
        assert!(token.span.end > token.span.start, "empty token");
        reconstructed.push_str(&source[token.span.clone()]);
        next = token.span.end;
    }
    assert_eq!(next, source.len(), "untokenized source bytes");
    assert_eq!(reconstructed, source);
    statements(source, &program.statements, &(0..source.len()));
    for diagnostic in &program.diagnostics {
        valid_span(source, &diagnostic.span);
        assert!(!diagnostic.message.is_empty());
    }
}

fn statements(source: &str, nodes: &[Statement], parent: &Span) {
    let mut end = parent.start;
    for statement in nodes {
        child_span(source, &statement.span, parent);
        assert!(statement.span.start >= end, "overlapping statements");
        assert!(statement.span.end > statement.span.start, "empty statement");
        end = statement.span.end;
        let span = &statement.span;
        match &statement.kind {
            StatementKind::Cls { colour } => {
                if let Some(colour) = colour {
                    expression(source, colour, span);
                }
            }
            StatementKind::Print { value } => expression(source, value, span),
            StatementKind::Assignment { target, value } => {
                child_span(source, target, span);
                expression(source, value, span);
            }
            StatementKind::If { condition, body } => {
                expression(source, condition, span);
                statements(source, body, span);
            }
            StatementKind::UnresolvedInvocation { name } => child_span(source, name, span),
            StatementKind::WaitKey | StatementKind::End | StatementKind::Unsupported => {}
            _ => panic!("extend the contract for the new AST node"),
        }
    }
}

fn expression(source: &str, node: &Expression, parent: &Span) {
    match node {
        Expression::IntegerLiteral(span)
        | Expression::StringLiteral(span)
        | Expression::Name(span) => child_span(source, span, parent),
        Expression::Negate { span, operand } => {
            child_span(source, span, parent);
            expression(source, operand, span);
        }
        Expression::Equal { span, left, right } => {
            child_span(source, span, parent);
            expression(source, left, span);
            expression(source, right, span);
        }
        _ => panic!("extend the contract for the new expression node"),
    }
}

pub fn source_contract(source: &str) {
    let first = parse(source);
    assert_eq!(first.source, source, "original source must be retained");
    parsed_contract(&first);
    assert_eq!(first, parse(source), "parse must be deterministic");
    for id in ["amos-pro-2.00-observed", "unknown-edition"] {
        let profile = Profile {
            id,
            extensions: &[],
        };
        let checked = check(source, &profile);
        parsed_contract(&checked.program);
        assert_eq!(checked.program.tokens, first.tokens);
        assert_eq!(checked.program.statements, first.statements);
        assert_eq!(
            checked,
            check(source, &profile),
            "check must be deterministic"
        );
    }
}
