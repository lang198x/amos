use lang198x_amos::{CheckStatus, Expression, Profile, StatementKind, check, parse};

const PROFILE: Profile<'_> = Profile {
    id: "amos-pro-2.00-observed",
    extensions: &[],
};

#[test]
fn maintained_message_builds_typed_nodes() {
    let source = include_str!("../corpus/opening/sources/message.amos.txt");
    let checked = check(source, &PROFILE);
    assert_eq!(checked.status, CheckStatus::SupportedStructure);
    let nodes = &checked.program.statements;
    assert_eq!(nodes.len(), 5);
    assert!(matches!(
        nodes[0].kind,
        StatementKind::Cls {
            colour: Some(Expression::IntegerLiteral(_))
        }
    ));
    let StatementKind::Print {
        value: Expression::StringLiteral(span),
    } = &nodes[1].kind
    else {
        panic!("expected literal Print")
    };
    assert_eq!(&source[span.clone()], "\"BANK OR RISK\"");
    assert_eq!(nodes[3].kind, StatementKind::WaitKey);
    assert_eq!(nodes[4].kind, StatementKind::End);
}

#[test]
fn instruction_forms_are_general_not_fixture_recognition() {
    for colour in ["0", "12", "9999999999999999999999999999999999"] {
        for text in ["", "different words", "a: Rem ' \\", "café"] {
            let source = format!("cLs {colour}:pRiNt\"{text}\":wAiT\tKeY:eNd\n");
            let checked = check(&source, &PROFILE);
            assert_eq!(checked.status, CheckStatus::SupportedStructure, "{source}");
            assert_eq!(checked.program.statements.len(), 4);
        }
    }
    assert!(parse("Cls").diagnostics.is_empty());
}

#[test]
fn recovery_keeps_unsupported_and_later_supported_nodes() {
    let parsed = parse("Do\nPrint 2\nPrit \"title\"\nEnd\n");
    assert_eq!(parsed.statements.len(), 4);
    assert_eq!(parsed.diagnostics.len(), 3);
    assert_eq!(parsed.statements[0].kind, StatementKind::Unsupported);
    assert!(matches!(
        parsed.statements[2].kind,
        StatementKind::UnresolvedInvocation { .. }
    ));
    assert_eq!(parsed.statements[3].kind, StatementKind::End);
}

#[test]
fn larger_valid_forms_do_not_pass_the_bounded_checker() {
    for source in [
        "Print",
        "Print 2",
        "Print \"a\";",
        "Cls 0,1,2 To 3,4",
        "Wait 1",
        "End If",
        "End 1",
        "Wait Key 1",
    ] {
        assert_eq!(
            check(source, &PROFILE).status,
            CheckStatus::Unsupported,
            "{source}"
        );
    }
}
