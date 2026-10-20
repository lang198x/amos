import grammar from './syntaxes/amal.tmLanguage.json' with { type: 'json' };

/** Standalone Professional-manual AMAL lexical registration. */
export const amal = { ...grammar, name: 'amal', aliases: ['amos-amal'] };
export default amal;
