export function getObjectPart (obj, keys) {
  return Object.entries(obj)
    .filter(([ key ]) => keys.indexOf(key) >= 0)
    .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), {});
}
