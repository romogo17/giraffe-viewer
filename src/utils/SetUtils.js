export function intersect(a, b) {
  return [...new Set(a)].filter(x => new Set(b).has(x))
}

export function difference(a, b) {
  return [...new Set(a)].filter(x => !new Set(b).has(x))
}

export function union(a, b) {
  return [...new Set([...a, ...b])]
}
