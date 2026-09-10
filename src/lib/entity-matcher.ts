/**
 * Aho-Corasick matcher for entity names in prose. Builds one automaton over every name and alias
 * (lower-cased) and scans a paragraph once, instead of running thousands of regular expressions.
 *
 * Match rules: case-insensitive; a hit must sit on word boundaries (no letter, digit or hyphen on either
 * side, so "HER2" does not fire inside "HER2-low", and "PD-1" does not fire inside "PD-L1"); when hits
 * overlap the leftmost one wins, and among hits starting at the same place the longest wins, so
 * "HER2-low" beats "HER2". Pure and browser-safe.
 */

export type MatchEntry<T> = { pattern: string; ref: T };
export type Match<T> = { start: number; end: number; ref: T; pattern: string };

type Node = { next: Map<string, number>; fail: number; out: number[] };

export type Matcher<T> = { nodes: Node[]; entries: MatchEntry<T>[] };

export function buildMatcher<T>(entries: MatchEntry<T>[]): Matcher<T> {
  const nodes: Node[] = [{ next: new Map(), fail: 0, out: [] }];
  entries.forEach((e, ei) => {
    let cur = 0;
    for (const ch of e.pattern.toLowerCase()) {
      let nx = nodes[cur].next.get(ch);
      if (nx === undefined) { nx = nodes.length; nodes.push({ next: new Map(), fail: 0, out: [] }); nodes[cur].next.set(ch, nx); }
      cur = nx;
    }
    nodes[cur].out.push(ei);
  });
  // Breadth-first failure links.
  const queue: number[] = [];
  for (const nx of nodes[0].next.values()) { nodes[nx].fail = 0; queue.push(nx); }
  for (let qi = 0; qi < queue.length; qi++) {
    const u = queue[qi];
    for (const [ch, v] of nodes[u].next) {
      let f = nodes[u].fail;
      while (f && !nodes[f].next.has(ch)) f = nodes[f].fail;
      const t = nodes[f].next.get(ch);
      nodes[v].fail = t !== undefined && t !== v ? t : 0;
      nodes[v].out.push(...nodes[nodes[v].fail].out);
      queue.push(v);
    }
  }
  return { nodes, entries };
}

const isWordChar = (c: string | undefined) => !!c && /[\p{L}\p{N}-]/u.test(c);

/** Every boundary-respecting occurrence, before overlap resolution. */
export function scan<T>(m: Matcher<T>, text: string): Match<T>[] {
  const lower = text.toLowerCase();
  // toLowerCase can change string length for a few scripts; fall back to per-character lowering then.
  const src = lower.length === text.length ? lower : Array.from(text, (c) => { const l = c.toLowerCase(); return l.length === 1 ? l : c; }).join("");
  const hits: Match<T>[] = [];
  let state = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    while (state && !m.nodes[state].next.has(ch)) state = m.nodes[state].fail;
    state = m.nodes[state].next.get(ch) ?? 0;
    for (const ei of m.nodes[state].out) {
      const e = m.entries[ei];
      const start = i - e.pattern.length + 1, end = i + 1;
      if (isWordChar(src[start - 1]) || isWordChar(src[end])) continue;
      hits.push({ start, end, ref: e.ref, pattern: e.pattern });
    }
  }
  return hits;
}

/**
 * Non-overlapping matches, leftmost-longest, at most one per distinct key (first occurrence), skipping
 * refs for which `skip` returns true, capped at `max`.
 */
export function findMatches<T>(m: Matcher<T>, text: string, opts: { key: (ref: T) => string; skip?: (ref: T) => boolean; max?: number } ): Match<T>[] {
  const all = scan(m, text).filter((h) => !opts.skip?.(h.ref)).sort((a, b) => a.start - b.start || b.end - a.end);
  const out: Match<T>[] = [];
  const seen = new Set<string>();
  let pos = 0;
  for (const h of all) {
    if (h.start < pos) continue;
    const k = opts.key(h.ref);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(h);
    pos = h.end;
    if (opts.max && out.length >= opts.max) break;
  }
  return out;
}
