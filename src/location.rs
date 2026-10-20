/// One-based line and Unicode-scalar column, with tabs counting as one column.
///
/// CRLF counts as one newline; CR and LF also delimit lines. Returns `None` for
/// offsets outside the source or inside a UTF-8 character. Visual tab widths and
/// LSP's UTF-16 coordinates require a consumer-specific conversion.
#[must_use]
pub fn location(source: &str, offset: usize) -> Option<(usize, usize)> {
    let prefix = source.get(..offset)?;
    let (mut line, mut column, mut after_cr) = (1, 1, false);
    for ch in prefix.chars() {
        match ch {
            '\r' => {
                line += 1;
                column = 1;
                after_cr = true;
            }
            '\n' => {
                if !after_cr {
                    line += 1;
                }
                column = 1;
                after_cr = false;
            }
            _ => {
                column += 1;
                after_cr = false;
            }
        }
    }
    Some((line, column))
}
