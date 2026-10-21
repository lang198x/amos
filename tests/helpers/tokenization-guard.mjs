// Test instrumentation only: every highlighter using this TextMate prototype
// must finish both passes before its output can count as verification evidence.
const guarded = new WeakSet();

export function guardTokenization(grammar) {
  const prototype = Object.getPrototypeOf(grammar);
  if (!prototype || !['tokenizeLine', 'tokenizeLine2'].every((name) => typeof prototype[name] === 'function')) {
    throw new TypeError('Cannot guard this TextMate grammar: expected both tokenization methods');
  }
  if (guarded.has(prototype)) return;
  for (const name of ['tokenizeLine', 'tokenizeLine2']) {
    const original = prototype[name];
    prototype[name] = function (...args) {
      const result = original.apply(this, args);
      if (result.stoppedEarly) {
        throw new Error(`Incomplete Shiki tokenization: ${name} stopped early (limit ${args[2]} ms); output cannot verify highlighting`);
      }
      return result;
    };
  }
  guarded.add(prototype);
}
