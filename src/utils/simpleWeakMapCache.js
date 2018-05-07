export function createSimpleCache (fn) {
  if (typeof WeakMap === 'function') {
    let _cache = new WeakMap();

    return function cachedFn (arg) {
      if (!_cache.has(arg)) {
        _cache.set(arg, fn(arg));
      }

      return _cache.get(arg);
    };
  }
  else {
    return fn;
  }
}
