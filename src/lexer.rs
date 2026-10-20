use crate::{Diagnostic, DiagnosticKind, Token, TokenKind};

pub(crate) fn lex(source: &str) -> (Vec<Token>, Vec<Diagnostic>) {
    let mut tokens = Vec::new();
    let mut diagnostics = Vec::new();
    let (mut offset, mut line_start, mut statement_start) = (0, true, true);
    while let Some(ch) = source[offset..].chars().next() {
        let start = offset;
        offset += ch.len_utf8();
        let kind = match ch {
            ' ' | '\t' => {
                while matches!(source.as_bytes().get(offset), Some(b' ' | b'\t')) {
                    offset += 1;
                }
                TokenKind::Whitespace
            }
            '\n' | '\r' => {
                if ch == '\r' && source.as_bytes().get(offset) == Some(&b'\n') {
                    offset += 1;
                }
                line_start = true;
                statement_start = true;
                TokenKind::Newline
            }
            ':' => {
                statement_start = true;
                line_start = false;
                TokenKind::Colon
            }
            '"' => {
                let mut closed = false;
                while let Some(next) = source[offset..].chars().next() {
                    if matches!(next, '\r' | '\n') {
                        break;
                    }
                    offset += next.len_utf8();
                    if next == '"' {
                        closed = true;
                        break;
                    }
                }
                line_start = false;
                statement_start = false;
                if closed {
                    TokenKind::String
                } else {
                    diagnostics.push(Diagnostic {
                        kind: DiagnosticKind::Invalid,
                        span: start..offset,
                        message: "unterminated string literal",
                    });
                    TokenKind::UnterminatedString
                }
            }
            '\'' => {
                if !line_start {
                    diagnostics.push(Diagnostic { kind: DiagnosticKind::Invalid, span: start..offset, message: "apostrophe comments must start a line; use : Rem for inline comments" });
                }
                while let Some(next) = source[offset..].chars().next() {
                    if matches!(next, '\r' | '\n') {
                        break;
                    }
                    offset += next.len_utf8();
                }
                TokenKind::Comment
            }
            c if c.is_ascii_alphabetic() || c == '_' => {
                while let Some(next) = source[offset..].chars().next() {
                    if !next.is_ascii_alphanumeric() && next != '_' {
                        break;
                    }
                    offset += next.len_utf8();
                }
                if matches!(source.as_bytes().get(offset), Some(b'$' | b'#')) {
                    offset += 1;
                }
                let rem = statement_start && source[start..offset].eq_ignore_ascii_case("Rem");
                line_start = false;
                statement_start = false;
                if rem {
                    while let Some(next) = source[offset..].chars().next() {
                        if matches!(next, '\r' | '\n') {
                            break;
                        }
                        offset += next.len_utf8();
                    }
                    TokenKind::Comment
                } else {
                    TokenKind::Word
                }
            }
            c if c.is_ascii_digit() => {
                while source
                    .as_bytes()
                    .get(offset)
                    .is_some_and(u8::is_ascii_digit)
                {
                    offset += 1;
                }
                line_start = false;
                statement_start = false;
                TokenKind::Integer
            }
            c if c.is_control() => TokenKind::InvalidControl,
            _ => {
                line_start = false;
                statement_start = false;
                TokenKind::Symbol
            }
        };
        tokens.push(Token {
            kind,
            span: start..offset,
        });
    }
    (tokens, diagnostics)
}
