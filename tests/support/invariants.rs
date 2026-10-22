use lang198x_amos::{Expression, ParsedProgram, Profile, Span, StatementKind, check, parse};

pub fn valid_span(source: &str, span: &Span) {
    assert!(span.start <= span.end, "reversed span: {span:?}");
    assert!(source.get(span.clone()).is_some(), "invalid span: {span:?}");
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
    let mut end = 0;
    for statement in &program.statements {
        valid_span(source, &statement.span);
        assert!(statement.span.start >= end, "overlapping statements");
        assert!(statement.span.end > statement.span.start, "empty statement");
        end = statement.span.end;
        let child = match &statement.kind {
            StatementKind::Cls { colour } => colour.as_ref().map(expression_span),
            StatementKind::Print { value } => Some(expression_span(value)),
            StatementKind::UnresolvedInvocation { name } => Some(name),
            StatementKind::WaitKey | StatementKind::End | StatementKind::Unsupported => None,
            _ => panic!("extend the contract for the new AST node"),
        };
        if let Some(child) = child {
            valid_span(source, child);
            assert!(child.start >= statement.span.start && child.end <= statement.span.end);
        }
    }
    for diagnostic in &program.diagnostics {
        valid_span(source, &diagnostic.span);
        assert!(!diagnostic.message.is_empty());
    }
}

fn expression_span(expression: &Expression) -> &Span {
    match expression {
        Expression::IntegerLiteral(span) | Expression::StringLiteral(span) => span,
        _ => panic!("extend the contract for the new expression node"),
    }
}

pub fn source_contract(source: &str) {
    let first = parse(source);
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
