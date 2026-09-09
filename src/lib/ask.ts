/**
 * Ask OnCo: grounded, cited answers assembled from record text only.
 *
 * There is no language model. The pipeline is: retrieve records (lexical and concept search, fused),
 * split their text into sentences, score each sentence against the question, and return the best few,
 * each carrying a citation to the record it was copied from. Nothing is paraphrased or generated, so
 * nothing can be invented; a reader can check every sentence on the cited page.
 *
 * Pure and browser-safe. The retrieval step lives in the client component (it needs the search
 * indexes); this module turns retrieved records into an answer.
 */
import type { Kind } from "./schema";
import { fuseRanks, tokenize } from "./semantic";

export type Passage = { text: string; field: string };
export type AskRecord = { id: string; kind: Kind; name: string; route: string; tldr: string; passages: Passage[] };
export type Cited = { text: string; cite: number; field: string; score: number };
export type Source = { id: string; kind: Kind; name: string; route: string };
export type Answer = { sentences: Cited[]; sources: Source[]; confidence: "high" | "medium" | "low"; note?: string };

/** The subset of an entity record the composer reads. Accepts the JSON from /api/v1/entities/<id>.json. */
export type EntityLike = {
  id: string; kind: Kind; name: string; tldr: string; summary: string; route?: string; simple?: string; notes?: string[];
  stateOfArt?: string[]; openProblems?: string[]; standardOfCare?: Array<{ setting: string; approach: string }>;
  principle?: string; strengths?: string[]; limitations?: string[]; biology?: string; whereFound?: string[]; mechanism?: string;
  result?: string; replication?: string; rationale?: string; evidence?: string; hypothesis?: string; test?: string;
  findings?: string[]; whatItMeans?: string; caveats?: string[]; causes?: string[]; currentEfforts?: string[]; successLooksLike?: string;
  analogy?: string; interventions?: string[]; holds?: string; role?: string;
  outcomes?: Array<{ endpoint: string; unit?: string; arms: Array<{ name: string; value?: number; n?: number }>; hr?: number; p?: string }>;
  approvals?: Array<{ region: string; year: number; indication: string }>;
  dosing?: { route: string; schedule: string };
};

/** Split prose into sentences; keeps abbreviations like "vs." and decimals intact well enough for display. */
export function sentences(text: string): string[] {
  return text.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+(?=["(A-Z0-9])/).map((s) => s.trim()).filter((s) => s.length >= 25);
}

/** Turn an entity record into passages, each labelled with the field it came from. */
export function recordFromEntity(e: EntityLike, route: string): AskRecord {
  const p: Passage[] = [];
  const add = (field: string, text?: string | null) => { if (text) for (const s of sentences(text)) p.push({ text: s, field }); };
  const addAll = (field: string, list?: string[]) => list?.forEach((t) => add(field, t));
  add("TL;DR", e.tldr);
  add("summary", e.summary);
  add("result", e.result);
  addAll("state of the art", e.stateOfArt);
  e.standardOfCare?.forEach((s) => add("standard of care", `${s.setting}: ${s.approach}`));
  for (const o of e.outcomes ?? []) {
    const arms = o.arms.filter((a) => a.value !== undefined).map((a) => `${a.name} ${a.value}${o.unit === "%" ? "%" : o.unit ? ` ${o.unit}` : ""}`).join(" versus ");
    if (arms) add("outcome", `${e.name}, ${o.endpoint}: ${arms}${o.hr !== undefined ? `, hazard ratio ${o.hr}` : ""}${o.p ? `, p ${o.p}` : ""}.`);
  }
  if (e.approvals?.length) add("approvals", `${e.name} approvals: ${e.approvals.map((a) => `${a.region} ${a.year} for ${a.indication}`).join("; ")}.`);
  add("mechanism", e.mechanism);
  add("principle", e.principle);
  add("biology", e.biology);
  addAll("where found", e.whereFound);
  add("what it means", e.whatItMeans);
  addAll("findings", e.findings);
  addAll("caveats", e.caveats);
  add("hypothesis", e.hypothesis);
  add("rationale", e.rationale);
  add("evidence", e.evidence);
  add("proposed test", e.test);
  addAll("strengths", e.strengths);
  addAll("limitations", e.limitations);
  addAll("open problems", e.openProblems);
  addAll("causes", e.causes);
  addAll("current efforts", e.currentEfforts);
  add("success looks like", e.successLooksLike);
  add("analogy", e.analogy);
  addAll("interventions", e.interventions);
  add("replication", e.replication);
  if (e.dosing) add("dosing", `${e.name} dosing: ${e.dosing.route}; ${e.dosing.schedule}.`);
  addAll("notes", e.notes);
  add("plain language", e.simple);
  return { id: e.id, kind: e.kind, name: e.name, route, tldr: e.tldr, passages: p };
}

/** Generic words that should not count as evidence that a sentence answers the question. */
const GENERIC = new Set(["cancer", "patient", "treatment", "drug", "trial", "study", "use", "used", "also", "one", "two", "first", "new", "year", "high", "low", "cell", "disease"]);

export type ComposeOptions = { maxSentences?: number; perRecord?: number };

/**
 * Pick the sentences that best answer the question. Scoring per sentence:
 *   coverage  share of the question's informative tokens present (weighted by rarity across candidates)
 *   field     TL;DR +0.12, outcome or result +0.08 (they carry the numbers), plain language +0.04
 *   rank      +0.10 for the top retrieved record falling to 0 for the last
 * Records are assumed to be in retrieval order. Near-duplicate sentences are dropped.
 */
export function composeAnswer(question: string, records: AskRecord[], opts: ComposeOptions = {}): Answer {
  const maxSentences = opts.maxSentences ?? 6, perRecord = opts.perRecord ?? 2;
  const qTokens = [...new Set(tokenize(question))].filter((t) => !GENERIC.has(t));
  const sources: Source[] = records.map((r) => ({ id: r.id, kind: r.kind, name: r.name, route: r.route }));
  if (!records.length) return { sentences: [], sources, confidence: "low", note: "OnCo has no record close to this question." };

  type Cand = { r: number; i: number; text: string; field: string; toks: Set<string>; score: number };
  const cands: Cand[] = [];
  records.forEach((r, ri) => r.passages.forEach((p, pi) => cands.push({ r: ri, i: pi, text: p.text, field: p.field, toks: new Set(tokenize(p.text)), score: 0 })));
  // Rarity of each question token across candidate sentences: a token in every sentence carries little.
  const df = new Map<string, number>();
  for (const t of qTokens) df.set(t, cands.filter((c) => c.toks.has(t)).length);
  const weight = (t: string) => 1 / (1 + Math.log(1 + (df.get(t) ?? 0)));
  const total = qTokens.reduce((s, t) => s + weight(t), 0) || 1;
  // Record names matter: a sentence from the record the question names is on topic even without shared words.
  const nameHit = records.map((r) => { const nt = new Set(tokenize(r.name)); return qTokens.some((t) => nt.has(t) && t.length > 2); });

  for (const c of cands) {
    const covered = qTokens.filter((t) => c.toks.has(t)).reduce((s, t) => s + weight(t), 0) / total;
    const field = c.field === "TL;DR" ? 0.12 : c.field === "outcome" || c.field === "result" ? 0.08 : c.field === "plain language" ? 0.04 : 0;
    const rank = 0.1 * (1 - c.r / Math.max(1, records.length));
    const named = nameHit[c.r] && c.field === "TL;DR" ? 0.15 : 0;
    c.score = covered + field + rank + named;
  }
  cands.sort((a, b) => b.score - a.score || a.r - b.r || a.i - b.i);

  const chosen: Cand[] = [];
  const perRec = new Map<number, number>();
  const similar = (a: Set<string>, b: Set<string>) => { let inter = 0; for (const t of a) if (b.has(t)) inter++; return inter / Math.max(1, Math.min(a.size, b.size)); };
  for (const c of cands) {
    if (chosen.length >= maxSentences) break;
    if (c.score < 0.25) break;
    if ((perRec.get(c.r) ?? 0) >= perRecord) continue;
    if (chosen.some((x) => similar(x.toks, c.toks) > 0.7)) continue;
    chosen.push(c);
    perRec.set(c.r, (perRec.get(c.r) ?? 0) + 1);
  }
  // Fall back to the top record's TL;DR so the reader always gets an orientation sentence.
  if (!chosen.length) { const t = cands.find((c) => c.r === 0 && c.field === "TL;DR"); if (t) chosen.push(t); }

  // Present in record order, then original order, with citation numbers in order of first appearance.
  chosen.sort((a, b) => a.r - b.r || a.i - b.i);
  const cite = new Map<number, number>();
  const used: Source[] = [];
  const out: Cited[] = chosen.map((c) => {
    let n = cite.get(c.r);
    if (n === undefined) { n = used.length + 1; cite.set(c.r, n); used.push(sources[c.r]); }
    return { text: c.text, cite: n, field: c.field, score: Math.round(c.score * 100) / 100 };
  });
  const best = chosen[0] ? Math.max(...chosen.map((c) => c.score)) : 0;
  const confidence: Answer["confidence"] = best >= 0.55 && used.length >= 2 ? "high" : best >= 0.35 ? "medium" : "low";
  const note = confidence === "low" ? "No record answers this directly. The sentences below are the closest OnCo has; check the linked pages." : undefined;
  return { sentences: out, sources: used, confidence, note };
}

/** Merge lexical and concept-search hits into one ordered id list (reciprocal rank fusion), capped at `k`. */
export function retrieveIds(lexical: Array<{ id: string }>, semantic: Array<{ id: string }>, k = 6): string[] {
  return fuseRanks([lexical, semantic]).slice(0, k).map((h) => h.id);
}

/** Plain-text rendering with numbered citations, for the copy button, tests and the MCP tool. */
export function answerText(a: Answer): string {
  const body = a.sentences.map((s) => `${s.text} [${s.cite}]`).join(" ");
  const refs = a.sources.map((s, i) => `[${i + 1}] ${s.name} (https://onco.cc${s.route})`).join("\n");
  return `${body}\n\nSources\n${refs}`;
}
