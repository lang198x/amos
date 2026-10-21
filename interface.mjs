import grammar from './syntaxes/interface.tmLanguage.json' with { type: 'json' };

/** Standalone Professional-manual Interface lexical registration. */
export const amosInterface = { ...grammar, name: 'amos-interface', aliases: ['amos-pro-interface'] };
export default amosInterface;
