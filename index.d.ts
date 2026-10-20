/** Structural TextMate rule compatible with Shiki; no type dependency needed. */
export interface TextMateRule {
  name?: string;
  include?: string;
  match?: string;
  begin?: string;
  end?: string;
  patterns?: TextMateRule[];
  captures?: Record<string, TextMateRule>;
  beginCaptures?: Record<string, TextMateRule>;
  endCaptures?: Record<string, TextMateRule>;
}
/** Registration accepted by Shiki and TextMate consumers. */
export interface AmosGrammar {
  name: string;
  aliases: string[];
  scopeName: string;
  fileTypes: string[];
  patterns: TextMateRule[];
  repository: Record<string, TextMateRule>;
}
export const amos: AmosGrammar;
export default amos;
