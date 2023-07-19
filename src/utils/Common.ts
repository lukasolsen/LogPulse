export function isBrowser() {
  return typeof window !== 'undefined';
}

export function isNode() {
  return (
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null
  );
}
