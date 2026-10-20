use lang198x_amos::{DiagnosticKind, TokenKind, location, parse};

#[test]
fn tokens_partition_the_original_bytes_including_trivia() {
    for source in [
        "",
        "\tCls 12\r\nPrint \"café: Rem '\" : Rem note\rEnd\n",
        "' comment\nPrint \"broken\nEnd\n",
        "Print \"a\\\"\n",
    ] {
        let program = parse(source);
        let mut next = 0;
        let mut reconstructed = String::new();
        for token in &program.tokens {
            assert_eq!(token.span.start, next);
            assert!(token.span.end > token.span.start);
            reconstructed.push_str(&source[token.span.clone()]);
            next = token.span.end;
        }
        assert_eq!(next, source.len());
        assert_eq!(reconstructed, source);
    }
}

#[test]
fn comments_cannot_hide_strings_or_inline_errors() {
    let parsed = parse(" 'comment\nPrint \"Rem ' :\": Rem Print \"not code\"\nEnd");
    assert!(parsed.diagnostics.is_empty());
    assert_eq!(parsed.statements.len(), 2);
    let invalid = parse("Print \"ok\": 'illegal inline comment\nEnd");
    assert!(
        invalid
            .diagnostics
            .iter()
            .any(|d| d.kind == DiagnosticKind::Invalid)
    );
    assert_eq!(invalid.statements.len(), 2);
}

#[test]
fn string_closes_after_backslash_and_recovers_at_newline() {
    let parsed = parse("Print \"a\\\"\nEnd\n");
    assert!(parsed.diagnostics.is_empty());
    let broken = parse("Print \"unfinished\nEnd\n");
    assert_eq!(broken.diagnostics.len(), 1);
    assert_eq!(broken.diagnostics[0].span, 6..17);
    assert!(
        broken
            .tokens
            .iter()
            .any(|t| t.kind == TokenKind::UnterminatedString)
    );
    assert_eq!(broken.statements.len(), 2);
}

#[test]
fn coordinates_are_byte_safe_and_explicit_about_tabs() -> Result<(), Box<dyn std::error::Error>> {
    let source = "\tPrint \"é\"\r\nEnd\rCls\n";
    assert_eq!(
        location(source, source.find('é').ok_or("missing character")?),
        Some((1, 9))
    );
    assert_eq!(
        location(source, source.find('é').ok_or("missing character")? + 1),
        None
    );
    assert_eq!(
        location(source, source.find("End").ok_or("missing End")?),
        Some((2, 1))
    );
    assert_eq!(
        location(source, source.find("Cls").ok_or("missing Cls")?),
        Some((3, 1))
    );
    assert_eq!(location(source, source.len()), Some((4, 1)));
    assert_eq!(location(source, source.len() + 1), None);
    Ok(())
}
