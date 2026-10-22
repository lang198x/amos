#[path = "support/invariants.rs"]
mod invariants;

use lang198x_amos::{StatementKind, parse};
use proptest::prelude::*;

proptest! {
    #![proptest_config(ProptestConfig::with_cases(512))]

    #[test]
    fn arbitrary_unicode_keeps_source_and_ranges(
        chars in proptest::collection::vec(any::<char>(), 0..1024)
    ) {
        let source: String = chars.into_iter().collect();
        invariants::source_contract(&source);
    }

    #[test]
    fn spelling_and_layout_keep_supported_shapes(
        lower in any::<bool>(),
        gap in "[ \\t]{1,8}",
        newline in prop::sample::select(vec!["\n", "\r", "\r\n"]),
        colour in 0_u32..256,
    ) {
        let words = if lower { ["cls", "print", "wait", "key", "end"] }
                    else { ["CLS", "PRINT", "WAIT", "KEY", "END"] };
        let source = format!("{gap}{}{gap}{colour}{newline}{}{gap}\"Hello: café\"{newline}{}{gap}{}{newline}{}{gap}",
                             words[0], words[1], words[2], words[3], words[4]);
        let parsed = parse(&source);
        prop_assert!(parsed.diagnostics.is_empty());
        prop_assert_eq!(parsed.statements.len(), 4);
        prop_assert!(matches!(parsed.statements[0].kind, StatementKind::Cls { .. }), "expected Cls");
        prop_assert!(matches!(parsed.statements[1].kind, StatementKind::Print { .. }), "expected Print");
        prop_assert!(matches!(parsed.statements[2].kind, StatementKind::WaitKey));
        prop_assert!(matches!(parsed.statements[3].kind, StatementKind::End));
        invariants::source_contract(&source);
    }

    #[test]
    fn generated_blocks_keep_their_body_and_later_end(
        name in "BR_[A-Z]{1,12}",
        value in 0_u32..100_000,
        message in "[a-zA-Z :]{0,64}",
        newline in prop::sample::select(vec!["\n", "\r", "\r\n"]),
    ) {
        let source = format!("If {name}=CAP{newline}{name}=-{value}{newline}MSG$=\"{message}\"{newline}End If{newline}End");
        let parsed = parse(&source);
        prop_assert!(parsed.diagnostics.is_empty());
        prop_assert_eq!(parsed.statements.len(), 2);
        let StatementKind::If { body, .. } = &parsed.statements[0].kind else {
            return Err(TestCaseError::fail("expected typed If"));
        };
        prop_assert_eq!(body.len(), 2);
        prop_assert!(matches!(parsed.statements[1].kind, StatementKind::End));
        invariants::source_contract(&source);
    }

    #[test]
    fn a_bad_statement_cannot_consume_the_next_line(
        tail in "[a-zA-Z0-9 :]{0,64}",
        newline in prop::sample::select(vec!["\n", "\r", "\r\n"]),
        broken_string in any::<bool>(),
    ) {
        let prefix = if broken_string { "Print \"" } else { "UnknownCall " };
        let source = format!("{prefix}{tail}{newline}End");
        let parsed = parse(&source);
        prop_assert!(!parsed.diagnostics.is_empty());
        prop_assert!(matches!(parsed.statements.last().map(|s| &s.kind), Some(StatementKind::End)));
        prop_assert_eq!(parsed.statements.last().map(|s| s.span.clone()), Some(source.len()-3..source.len()));
        invariants::source_contract(&source);
    }
}

#[test]
fn contract_rejects_a_token_gap_and_a_broken_utf8_range() {
    let mut gap = parse("Cls\nEnd");
    gap.tokens[0].span.start = 1;
    assert!(std::panic::catch_unwind(|| invariants::parsed_contract(&gap)).is_err());
    let mut boundary = parse("Print \"é\"");
    boundary.statements[0].span.end = 8;
    assert!(std::panic::catch_unwind(|| invariants::parsed_contract(&boundary)).is_err());
}
