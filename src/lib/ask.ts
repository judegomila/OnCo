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
import type { Kind } from "./kinds";
import { normaliseName } from "./search-rank";
import { regionFromQuestion } from "./ask-index";
import { fuseRanks, tokenize } from "./semantic";
import { isScopedEvidenceField, scopedEvidencePassages, type ScopedFields } from "./scoped-evidence-text";

export type Passage = { text: string; field: string };
export type AskRecord = { id: string; kind: Kind; name: string; route: string; tldr: string; passages: Passage[] };
export type Cited = { text: string; cite: number; field: string; score: number };
export type Source = { id: string; kind: Kind; name: string; route: string };
export type Answer = { sentences: Cited[]; sources: Source[]; confidence: "high" | "medium" | "low"; note?: string };

/** The subset of an entity record the composer reads. Accepts the JSON from /api/v1/entities/<id>.json. */
export type EntityLike = ScopedFields & {
  id: string; kind: Kind; name: string; tldr: string; summary: string; route?: string; simple?: string; notes?: string[];
  stateOfArt?: string[]; openProblems?: string[]; standardOfCare?: Array<{ setting: string; approach: string }>;
  principle?: string; strengths?: string[]; limitations?: string[]; biology?: string; whereFound?: string[]; mechanism?: string;
  result?: string; replication?: string; rationale?: string; evidence?: string; hypothesis?: string; test?: string;
  findings?: string[]; whatItMeans?: string; caveats?: string[]; causes?: string[]; currentEfforts?: string[]; successLooksLike?: string;
  analogy?: string; interventions?: string[]; holds?: string; /** A person's role line, or a target's roles in cancer. */ role?: string | readonly string[];
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
  // These statements retain the whole scoped observation. Sentence splitting could detach a threshold,
  // hypothesis or local recruitment claim from the subject, model, facility or date that qualifies it.
  p.push(...scopedEvidencePassages(e));
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
    // Similar wording can describe different therapies, thresholds or models. Keep distinct scoped
    // observations intact; only exact repeats of those passages are duplicates.
    if (chosen.some((x) => isScopedEvidenceField(c.field) ? x.text === c.text : similar(x.toks, c.toks) > 0.7)) continue;
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

/**
 * What retrieval needs to know about a record beyond its text: its kind, its name and aliases (brand names included),
 * to tell whether a question names it; and for a product, its status, its dated approvals as "<date> <region>"
 * (ask-index.ts approvalDates) and, when it is a test, a device or an imaging agent rather than a medicine, its class
 * (product-class.ts), to tell whether a medicine is approved at all and whether a product was approved when and
 * where a question asks.
 */
export type NamedLookup = (id: string) => { kind: string; names: string[]; status?: string; approved?: string[]; cls?: string } | undefined;

/** A NamedLookup over search documents (`aka`, one alias a line, brand included) or Ask index entries (`aliases`). */
export function namedLookup(entries: Iterable<{ id: string; kind: string; name: string; aka?: string; aliases?: string[]; status?: string; approved?: string[]; cls?: string }>): NamedLookup {
  const m = new Map<string, { kind: string; names: string[]; status?: string; approved?: string[]; cls?: string }>();
  for (const e of entries) m.set(e.id, { kind: e.kind, names: [e.name, ...(e.aliases ?? []), ...(e.aka ? e.aka.split("\n") : [])], status: e.status, approved: e.approved, cls: e.cls });
  return (id) => m.get(id);
}

/** How far down the word-search list a named medicine is looked for. */
const NAMED_DEPTH = 12;
/** Shorter names are too often ordinary words or initials ("SG", "ADC") to count as the reader naming a medicine. */
const NAMED_MIN = 4;

/**
 * Medicines in the word search's top 12 that the question names word for word, by name or alias (which carries the
 * brand): "before starting an ADC such as Enhertu" names trastuzumab deruxtecan. Only medicines: a reader who types a
 * brand means that product, whereas the name of a class or a concept ("inhibitor", "CAR-T") is also an ordinary word
 * in a question and pinning it pushed better records out (measured on the Ask benchmark, 11 November 2026).
 */
export function namedDrugs(question: string, lexical: Array<{ id: string }>, lookup: NamedLookup): string[] {
  const q = ` ${normaliseName(question)} `;
  return lexical.slice(0, NAMED_DEPTH).map((h) => h.id).filter((id) => {
    const r = lookup(id);
    return r?.kind === "drug" && r.names.some((n) => { const x = normaliseName(n); return x.length >= NAMED_MIN && q.includes(` ${x} `); });
  });
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
/** A month, optional, and a four-digit year: "July 2026", "Sept. 2026", "2026". The month counts only when the year follows it, so the verb in "may be approved in 2026" is not May. */
const PERIOD = /\b(?:(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sept|sep|oct|nov|dec)\.?,?\s+)?((?:19|20)\d{2})\b/gi;
/** The question asks about something being approved. Whole words: "approved", "approvals", "authorised", "licensed"; not "disapproved" or "approvable". */
const APPROVAL_SENSE = /\b(?:approv(?:e|es|ed|al|als)|authori[sz](?:e|es|ed|ation|ations)|licen[cs]ed)\b/i;
/** The question asks about the opposite, or about another regulatory outcome that happens to mention approval ("which approvals were withdrawn in 2026"). */
const OTHER_OUTCOME = /\b(?:not|never|withdr(?:aw|aws|awn|ew|awal|awals)|reject(?:s|ed|ion|ions)?|refus(?:e|es|ed|al|als)|revok(?:e|es|ed)|den(?:y|ies|ied)|(?:is|are|was|were|has|have|had|did|does|do|wo|ca)n['’]t|cannot)\b/i;
/** The period must be what the approval happened in ("in July 2026", "during 2025"), not a name that carries a year ("FDORA 2022") or one end of a span ("since 2020"). */
const IN_PERIOD = /\b(?:in|during)\s+(?:the\s+)?(?:(?:month|year)\s+(?:of\s+)?)?$/i;

/**
 * The period and place a question asks approvals for: "Which drugs were approved in the US in July 2026?" gives
 * { period: "2026-07", region: "US" }; "approved in 2025" gives { period: "2025" } and any region. Undefined unless
 * the question has an approval word, exactly one period introduced by "in" or "during", and no word for another
 * outcome. The period is a prefix of an ISO date, which is how approvalDates writes them.
 */
export function approvalPeriod(question: string): { period: string; region?: string } | undefined {
  if (!APPROVAL_SENSE.test(question) || OTHER_OUTCOME.test(question)) return undefined;
  const found = [...question.matchAll(PERIOD)];
  if (new Set(found.map((m) => m[2])).size !== 1) return undefined;
  const m = found.find((x) => IN_PERIOD.test(question.slice(0, x.index)));
  if (!m) return undefined;
  const month = m[1] ? MONTHS.findIndex((name) => name.startsWith(m[1].toLowerCase().slice(0, 3))) + 1 : 0;
  return { period: month ? `${m[2]}-${String(month).padStart(2, "0")}` : m[2], region: regionFromQuestion(question) };
}

/**
 * Of the records the two searches found, the products whose own dated approvals (NamedLookup `approved`) fall in the
 * period and region the question asks about, in the order given. This checks the record's typed data rather than its
 * words: a medicine approved in the US whose European application was withdrawn in July 2026 carries every word of
 * "approved in the US in July 2026" and was not approved then. A record dated only to the year cannot confirm a
 * month, so it does not match a question that names one. It adds no record the searches did not find.
 */
export function approvedThen(question: string, found: string[], lookup: NamedLookup): string[] {
  const asked = approvalPeriod(question);
  if (!asked) return [];
  return found.filter((id) => lookup(id)?.approved?.some((a) => {
    const cut = a.indexOf(" ");
    return a.slice(0, cut).startsWith(asked.period) && (!asked.region || a.slice(cut + 1) === asked.region);
  }));
}

/** The question asks about something that is approved: the participle, whole word, so not "unapproved", "approval" or "approvable". */
const APPROVED_SENSE = /\b(?:approved|authori[sz]ed|licen[cs]ed)\b/i;
/** The approval the question speaks of has not happened: "not yet approved", "awaiting", "expected to be approved", "could be approved". */
const NOT_YET = /\b(?:yet|awaiting|pending|will|may|might|could|would|expected|likely|soon|unapproved)\b/i;

/**
 * For a question about something approved ("What is the first approved TIL therapy?"), the same list with the
 * medicines that are approved somewhere moved ahead of the medicines that are approved nowhere. Only the places
 * medicines already hold are reordered: a trial, a term, a person or a test stays exactly where it was, and the
 * medicines keep their order within each group. Approved is read from the record, not its words: status approved, or
 * a dated approval (NamedLookup `approved`). An experimental product whose summary says it "could become the first
 * approved" of its kind shares the question's words and is not the answer. Tests, devices and imaging agents are left
 * alone: a regulator clearing a test is a different judgement, and a cleared test for another purpose is no nearer the
 * question than an uncleared one on its subject. Any other question gets the list back unchanged.
 */
export function approvedFirst(question: string, found: string[], lookup: NamedLookup): string[] {
  if (!APPROVED_SENSE.test(question) || OTHER_OUTCOME.test(question) || NOT_YET.test(question)) return found;
  const isMedicine = (id: string) => { const r = lookup(id); return r?.kind === "drug" && !r.cls; };
  const isApproved = (id: string) => { const r = lookup(id); return r?.status === "approved" || !!r?.approved?.length; };
  const medicines = found.filter(isMedicine);
  const order = [...medicines.filter(isApproved), ...medicines.filter((id) => !isApproved(id))];
  let next = 0;
  return found.map((id) => (isMedicine(id) ? order[next++] : id));
}

/**
 * Merge lexical and concept-search hits into one ordered id list (reciprocal rank fusion), capped at `k`. With
 * `named`, a medicine the question names (namedDrugs) comes first, so a reader who asks about Enhertu gets Enhertu's
 * page even when near-ties in the two lists would have left it seventh. When the question names no medicine and asks
 * about something approved, the products among the hits are checked against their typed approval data rather than
 * their words: approved medicines take the medicines' places ahead of unapproved ones (approvedFirst), and when the
 * question asks what was approved in a period ("in the US in July 2026"), the products approved then and there come
 * first of all (approvedThen).
 */
export function retrieveIds(lexical: Array<{ id: string }>, semantic: Array<{ id: string }>, k = 6, named?: { question: string; lookup: NamedLookup }): string[] {
  const fused = fuseRanks([lexical, semantic]).map((h) => h.id);
  if (!named) return fused.slice(0, k);
  const drugs = namedDrugs(named.question, lexical, named.lookup);
  if (drugs.length) return [...new Set([...drugs, ...fused])].slice(0, k);
  const checked = approvedFirst(named.question, fused, named.lookup);
  return [...new Set([...approvedThen(named.question, checked, named.lookup), ...checked])].slice(0, k);
}

/** Plain-text rendering with numbered citations, for the copy button, tests and the MCP tool. */
export function answerText(a: Answer): string {
  const body = a.sentences.map((s) => `${s.text} [${s.cite}]`).join(" ");
  const refs = a.sources.map((s, i) => `[${i + 1}] ${s.name} (https://onco.cc${s.route})`).join("\n");
  return `${body}\n\nSources\n${refs}`;
}
