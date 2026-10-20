import grammar from './syntaxes/amos.tmLanguage.json' with { type: 'json' };

/** TextMate registration accepted by Shiki's loadLanguage API. */
export const amos = { ...grammar, name: 'amos', aliases: ['amos-basic'] };
export default amos;
