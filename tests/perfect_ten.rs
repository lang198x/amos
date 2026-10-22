#[path = "support/invariants.rs"]
mod invariants;
use lang198x_amos::{
    CheckStatus, DiagnosticKind, Expression, Profile, StatementKind, check, parse,
};

const PROFILE: Profile<'_> = Profile {
    id: "amos-pro-2.00-observed",
    extensions: &[],
};

#[test]
fn maintained_perfect_ten_block_is_supported_and_typed() {
    let game = include_str!("../corpus/highlighting/bank-or-risk.amos.txt");
    let source = game
        .lines()
        .skip(127)
        .take(5)
        .collect::<Vec<_>>()
        .join("\n");
    assert_eq!(
        source.trim_end(),
        include_str!("../corpus/parser/perfect-ten.amos.txt").trim_end()
    );
    let result = check(&source, &PROFILE);
    assert_eq!(result.status, CheckStatus::SupportedStructure);
    assert_eq!(result.program.statements.len(), 1);
    let StatementKind::If {
        condition: Expression::Equal { left, right, .. },
        body,
    } = &result.program.statements[0].kind
    else {
        panic!("typed If equality")
    };
    for (node, expected) in [(left.as_ref(), "BR_TOTAL"), (right.as_ref(), "BR_CAP")] {
        let Expression::Name(span) = node else {
            panic!("comparison name")
        };
        assert_eq!(&source[span.clone()], expected);
    }
    assert_eq!(body.len(), 3);
    let StatementKind::Assignment {
        target,
        value: Expression::Name(value),
    } = &body[0].kind
    else {
        panic!("name assignment")
    };
    assert_eq!(&source[target.clone()], "BR_AWARD");
    assert_eq!(&source[value.clone()], "BR_TOTAL");
    let StatementKind::Assignment {
        value: Expression::Negate { span, operand },
        ..
    } = &body[1].kind
    else {
        panic!("negative integer")
    };
    assert_eq!(&source[span.clone()], "-1");
    assert!(matches!(operand.as_ref(), Expression::IntegerLiteral(_)));
    let StatementKind::Assignment {
        target,
        value: Expression::StringLiteral(value),
    } = &body[2].kind
    else {
        panic!("string assignment")
    };
    assert_eq!(&source[target.clone()], "BR_MSG$");
    assert_eq!(
        &source[value.clone()],
        "\"Perfect 10. Secured automatically.\""
    );
    invariants::source_contract(&source);
}

#[test]
fn unsupported_neighbours_do_not_pass_or_hide_later_end() {
    for source in [
        "A=1+2\nEnd",
        "A(1)=2\nEnd",
        "If A=B Then A=1\nEnd",
        "If A=B\nA=1\nElse\nA=2\nEnd If\nEnd",
        "If A=B\nIf B=C\nA=1\nEnd If\nEnd If\nEnd",
        "If A>B\nA=1\nEnd If\nEnd",
        "If A=B\nIf C=D Then A=1\nEnd If\nEnd",
        "If A=B=C\nEnd If\nEnd",
    ] {
        let result = check(source, &PROFILE);
        assert_eq!(result.status, CheckStatus::Unsupported, "{source}");
        assert_eq!(
            result.program.statements.last().map(|s| &s.kind),
            Some(&StatementKind::End)
        );
        invariants::source_contract(source);
    }
}

#[test]
fn missing_values_and_terminators_are_located_and_recover() {
    for (source, offset) in [
        ("A=\nEnd", 2),
        ("A=-\nEnd", 3),
        ("If A=\nEnd If\nEnd", 5),
        ("If =B\nEnd If\nEnd", 3),
        ("If A=B\nA=1\nEnd", 0),
    ] {
        let result = check(source, &PROFILE);
        assert_eq!(result.status, CheckStatus::Invalid, "{source}");
        assert!(
            result
                .program
                .diagnostics
                .iter()
                .any(|d| d.kind == DiagnosticKind::Invalid && d.span.start == offset),
            "{source}"
        );
        assert_eq!(
            result.program.statements.last().map(|s| &s.kind),
            Some(&StatementKind::End)
        );
        invariants::source_contract(source);
    }
}

#[test]
fn unsupported_block_retains_the_whole_source_range() -> Result<(), Box<dyn std::error::Error>> {
    let source = "If A=B\nIf B=C\nA=1\nEnd If\nEnd If\nEnd";
    let parsed = parse(source);
    assert_eq!(parsed.statements.len(), 2);
    assert_eq!(
        &source[parsed.statements[0].span.clone()],
        source.strip_suffix("\nEnd").ok_or("test suffix")?
    );
    assert_eq!(parsed.statements[0].kind, StatementKind::Unsupported);
    Ok(())
}
