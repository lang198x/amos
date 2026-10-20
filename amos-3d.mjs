import grammar from './syntaxes/amos-3d.tmLanguage.json' with { type: 'json' };

/** Opt-in BASIC plus AMOS 3D lexical vocabulary, not a release qualification. */
export const amos3d = { ...grammar, name: 'amos-3d', aliases: ['amos-basic-3d'] };
export default amos3d;
