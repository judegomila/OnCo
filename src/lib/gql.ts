/**
 * OnCo graph query language: a one-line text form of the /query/ builder.
 *
 *   cancer:tnbc -> drugs(status:approved) -> targets
 *   targets has drugs(status:approved) no technologies(tag:pet-target)
 *   cancers no drugs(status:phase-3)
 *   trials(status:positive, minlinks:3) no drugs(status:approved) | limit:20
 *
 * Grammar
 *   query   := stage ( '->' stage )* ( '|' 'limit' ':' NUMBER )?
 *   stage   := ref filters? ( ('has' | 'no') ref filters? )*
 *   ref     := KIND ( ':' ID )?               KIND is singular, plural or '*'
 *   filters := '(' filter ( ',' filter )* ')'
 *   filter  := KEY ( '!' )? ':' VALUE          VALUE may be quoted; 'a+b' means a or b
 *
 * Each '->' walks one hop along any relationship (both directions) to neighbours of the named kind.
 * 'has' and 'no' keep or drop items of the current stage by whether such a neighbour exists, without
 * moving. Filter keys: status, tag, text (name, TL;DR or tags contain), name, id, minlinks.
 *
 * Runs over the same compact graph the form builder uses: nodes with kind, status, tags, TL;DR,
 * degree; undirected edges. Pure and browser-safe.
 */
import { KIND_META, KINDS, type Kind } from "./schema";

export type GqlNode = { id: string; kind: Kind; name: string; route: string; status?: string; tags: string[]; tldr: string; degree: number };
export type GqlData = { nodes: GqlNode[]; edges: Array<[number, number]> };

export type Filter = { key: string; negate: boolean; value: string };
export type Ref = { kind: Kind | "*"; id?: string; filters: Filter[] };
export type Exists = Ref & { negate: boolean };
export type Stage = Ref & { exists: Exists[] };
export type Query = { stages: Stage[]; limit?: number };

export const FILTER_KEYS = ["status", "tag", "text", "name", "id", "minlinks"] as const;

export class GqlError extends Error {
  constructor(message: string, public position: number) { super(message); }
}

type Tok = { t: "word" | "string" | "arrow" | "(" | ")" | "," | ":" | "!" | "|"; v: string; pos: number };

export function lex(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (src.startsWith("->", i)) { out.push({ t: "arrow", v: "->", pos: i }); i += 2; continue; }
    if (c === '"' || c === "'") {
      const end = src.indexOf(c, i + 1);
      if (end < 0) throw new GqlError("Unterminated quote", i);
      out.push({ t: "string", v: src.slice(i + 1, end), pos: i });
      i = end + 1; continue;
    }
    if ("(),:!|".includes(c)) { out.push({ t: c as Tok["t"], v: c, pos: i }); i++; continue; }
    const m = /^[A-Za-z0-9_*][A-Za-z0-9_*+\-./]*/.exec(src.slice(i));
    if (!m) throw new GqlError(`Unexpected character "${c}"`, i);
    out.push({ t: "word", v: m[0], pos: i });
    i += m[0].length;
  }
  return out;
}

const KIND_ALIASES: Record<string, Kind> = { front: "section", fronts: "section", product: "drug", products: "drug", treatment: "drug", treatments: "drug", "key-paper": "paper", "key-papers": "paper", papers: "paper", persons: "person" };

/** Resolve "drugs", "drug", "products", "key-papers", "*" to a kind. */
export function resolveKind(word: string): Kind | "*" | undefined {
  const w = word.toLowerCase();
  if (w === "*" || w === "any") return "*";
  if ((KINDS as readonly string[]).includes(w)) return w as Kind;
  if (KIND_ALIASES[w]) return KIND_ALIASES[w];
  for (const k of KINDS) if (KIND_META[k].plural.replace(/\s+/g, "-") === w || KIND_META[k].plural === w) return k;
  return undefined;
}

export function parse(src: string): Query {
  const toks = lex(src);
  let p = 0;
  const peek = () => toks[p];
  const next = () => toks[p++];
  const expect = (t: Tok["t"]) => { const k = next(); if (!k || k.t !== t) throw new GqlError(`Expected "${t}"`, k?.pos ?? src.length); return k; };

  const filters = (): Filter[] => {
    if (peek()?.t !== "(") return [];
    next();
    const out: Filter[] = [];
    while (true) {
      const key = expect("word");
      if (!(FILTER_KEYS as readonly string[]).includes(key.v.toLowerCase())) throw new GqlError(`Unknown filter "${key.v}". Use ${FILTER_KEYS.join(", ")}`, key.pos);
      let negate = false;
      if (peek()?.t === "!") { next(); negate = true; }
      expect(":");
      const val = next();
      if (!val || (val.t !== "word" && val.t !== "string")) throw new GqlError(`Expected a value for ${key.v}`, val?.pos ?? src.length);
      out.push({ key: key.v.toLowerCase(), negate, value: val.v });
      if (peek()?.t === ",") { next(); continue; }
      expect(")");
      break;
    }
    return out;
  };

  const ref = (): Ref => {
    const w = next();
    if (!w || w.t !== "word") throw new GqlError("Expected a kind such as drugs, targets or cancer:tnbc", w?.pos ?? src.length);
    const kind = resolveKind(w.v);
    if (!kind) throw new GqlError(`Unknown kind "${w.v}"`, w.pos);
    let id: string | undefined;
    if (peek()?.t === ":") { next(); const idTok = next(); if (!idTok || (idTok.t !== "word" && idTok.t !== "string")) throw new GqlError("Expected an id after ':'", idTok?.pos ?? src.length); id = idTok.v; }
    return { kind, id, filters: filters() };
  };

  const stage = (): Stage => {
    const r = ref();
    const exists: Exists[] = [];
    while (peek()?.t === "word" && /^(has|no)$/i.test(peek().v)) {
      const negate = next().v.toLowerCase() === "no";
      exists.push({ ...ref(), negate });
    }
    return { ...r, exists };
  };

  if (!toks.length) throw new GqlError("Empty query", 0);
  const stages = [stage()];
  let limit: number | undefined;
  while (p < toks.length) {
    const k = next();
    if (k.t === "arrow") { stages.push(stage()); continue; }
    if (k.t === "|") {
      const w = expect("word");
      if (w.v.toLowerCase() !== "limit") throw new GqlError(`Only "limit" is allowed after "|"`, w.pos);
      expect(":");
      const n = expect("word");
      limit = Number(n.v);
      if (!Number.isInteger(limit) || limit <= 0) throw new GqlError("limit must be a positive whole number", n.pos);
      continue;
    }
    throw new GqlError(`Unexpected "${k.v}"`, k.pos);
  }
  return { stages, limit };
}

function matchesFilter(n: GqlNode, f: Filter): boolean {
  const values = f.value.split("+").map((v) => v.toLowerCase());
  let hit = false;
  switch (f.key) {
    case "status": hit = values.includes((n.status ?? "").toLowerCase()); break;
    case "tag": hit = n.tags.some((t) => values.includes(t.toLowerCase())); break;
    case "text": { const hay = `${n.name} ${n.tldr} ${n.tags.join(" ")}`.toLowerCase(); hit = values.some((v) => hay.includes(v)); break; }
    case "name": hit = values.some((v) => n.name.toLowerCase().includes(v)); break;
    case "id": hit = values.includes(n.id.toLowerCase()); break;
    case "minlinks": hit = n.degree >= Number(f.value); break;
  }
  return f.negate ? !hit : hit;
}

function matchesRef(n: GqlNode, r: Ref): boolean {
  if (r.kind !== "*" && n.kind !== r.kind) return false;
  if (r.id && n.id !== r.id) return false;
  return r.filters.every((f) => matchesFilter(n, f));
}

export type GqlResult = { nodes: GqlNode[]; counts: number[]; };

export function run(q: Query, data: GqlData): GqlResult {
  const adj: number[][] = data.nodes.map(() => []);
  for (const [a, b] of data.edges) { adj[a].push(b); adj[b].push(a); }
  const passesExists = (i: number, st: Stage) => st.exists.every((ex) => { const has = adj[i].some((j) => matchesRef(data.nodes[j], ex)); return ex.negate ? !has : has; });

  let current: number[] = [];
  const counts: number[] = [];
  q.stages.forEach((st, si) => {
    if (si === 0) {
      current = data.nodes.map((_, i) => i).filter((i) => matchesRef(data.nodes[i], st) && passesExists(i, st));
    } else {
      const seen = new Set<number>();
      for (const i of current) for (const j of adj[i]) if (!seen.has(j) && matchesRef(data.nodes[j], st) && passesExists(j, st)) seen.add(j);
      current = [...seen];
    }
    counts.push(current.length);
  });
  const nodes = current.map((i) => data.nodes[i]).sort((a, b) => b.degree - a.degree || a.name.localeCompare(b.name));
  return { nodes: q.limit ? nodes.slice(0, q.limit) : nodes, counts };
}

/** Parse and run in one call. */
export function query(src: string, data: GqlData): GqlResult { return run(parse(src), data); }

const kindName = (k: Kind | "*", plural: boolean) => k === "*" ? (plural ? "objects" : "object") : plural ? KIND_META[k].plural : KIND_META[k].label.toLowerCase();

function describeFilters(fs: Filter[]): string {
  if (!fs.length) return "";
  return " with " + fs.map((f) => {
    const vals = f.value.split("+").join(" or ");
    switch (f.key) {
      case "status": return `status ${f.negate ? "not " : ""}${vals}`;
      case "tag": return `${f.negate ? "no tag" : "tag"} ${vals}`;
      case "text": return `text ${f.negate ? "not containing" : "containing"} "${vals}"`;
      case "name": return `name ${f.negate ? "not containing" : "containing"} "${vals}"`;
      case "id": return `id ${f.negate ? "not " : ""}${vals}`;
      case "minlinks": return `at least ${f.value} links`;
      default: return `${f.key} ${vals}`;
    }
  }).join(", ");
}

/** Plain-English reading of a query, for the caption under the text box. */
export function describe(q: Query): string {
  const parts = q.stages.map((st, i) => {
    const head = st.id ? `${kindName(st.kind, false)} ${st.id}` : (i === 0 ? `all ${kindName(st.kind, true)}` : `their ${kindName(st.kind, true)}`);
    const ex = st.exists.map((e) => `${e.negate ? "without" : "with"} a linked ${kindName(e.kind, false)}${e.id ? ` ${e.id}` : ""}${describeFilters(e.filters)}`);
    return [head + describeFilters(st.filters), ...ex].join(" ");
  });
  return parts.join(", then ") + (q.limit ? `, first ${q.limit}` : "");
}

export type Completion = { value: string; hint: string };

/**
 * Suggestions for the text being typed. Returns the trailing fragment to replace and the options.
 * Context is decided from the last complete token, so the caller can splice `value` over `prefix`.
 */
export function complete(src: string, data: GqlData, max = 12): { prefix: string; options: Completion[] } {
  const m = /([A-Za-z0-9_*+\-./]*)$/.exec(src);
  const prefix = m ? m[1] : "";
  const before = src.slice(0, src.length - prefix.length).trimEnd();
  const lower = prefix.toLowerCase();
  const pick = (opts: Completion[]) => opts.filter((o) => o.value.toLowerCase().startsWith(lower) && o.value.toLowerCase() !== lower).slice(0, max);
  const kinds: Completion[] = KINDS.filter((k) => k !== "section").map((k) => ({ value: KIND_META[k].plural.replace(/\s+/g, "-"), hint: KIND_META[k].blurb }));

  // After "kind:" -> ids of that kind.
  const refId = /([A-Za-z0-9_*\-]+):$/.exec(before);
  if (refId && !/\(\s*[^)]*$/.test(before.slice(0, refId.index))) {
    const k = resolveKind(refId[1]);
    if (k && k !== "*") return { prefix, options: pick(data.nodes.filter((n) => n.kind === k).map((n) => ({ value: n.id, hint: n.name }))) };
  }
  // Inside filters.
  const openParen = before.lastIndexOf("("), closeParen = before.lastIndexOf(")");
  if (openParen > closeParen) {
    const inside = before.slice(openParen + 1);
    const key = /([a-z]+)!?:$/i.exec(inside);
    if (key) {
      const k = key[1].toLowerCase();
      if (k === "status") return { prefix, options: pick([...new Set(data.nodes.map((n) => n.status).filter((s): s is string => !!s))].sort().map((s) => ({ value: s, hint: "status" }))) };
      if (k === "tag") return { prefix, options: pick([...new Set(data.nodes.flatMap((n) => n.tags))].sort().map((t) => ({ value: t, hint: "tag" }))) };
      return { prefix, options: [] };
    }
    if (/^$|,$/.test(inside.trim()) || /^[^:,]*$/.test(inside)) return { prefix, options: pick(FILTER_KEYS.map((k) => ({ value: `${k}:`, hint: k === "minlinks" ? "minimum number of links" : k === "text" ? "name, TL;DR or tags contain" : k }))) };
    return { prefix, options: [] };
  }
  // Start, after "->", "has" or "no": kinds.
  if (before === "" || /->$/.test(before) || /\b(has|no)$/i.test(before)) return { prefix, options: pick(kinds) };
  // After a complete ref: connectors.
  return { prefix, options: pick([{ value: "->", hint: "walk one hop to neighbours" }, { value: "has", hint: "keep items with such a neighbour" }, { value: "no", hint: "keep items without such a neighbour" }, { value: "(", hint: "add filters" }, { value: "| limit:", hint: "cap the result" }]) };
}
