/**
 * Ask OnCo, end to end: analyse the question (ask-intent.ts), decide which records to read, fetch them,
 * fetch a second wave the template needs (a drug's trials, its target, the irAE term), and compose the
 * cited answer (ask-compose.ts). The record loader is injected: the browser fetches
 * /api/v1/entities/<id>.json, tests and scripts read the graph directly (ask-harness.ts).
 *
 * Pure and browser-safe.
 */
import { retrieveIds, type Source } from "./ask";
import { analyseQuestion, kindPriority, prepareIndex, type Analysis } from "./ask-intent";
import { composeTemplated, trialsOf, type AskAnswer, type AskEntityRecord } from "./ask-compose";
import type { AskIndex, AskIndexEntry } from "./ask-index";
import type { Region } from "@/data/regional-approvals";

export type AskDeps = {
  index: AskIndex;
  /** Word-search ids, best first. */
  lexical: (q: string, k: number) => string[];
  /** Concept-search ids, best first. */
  concept: (q: string, k: number) => string[];
  load: (id: string) => Promise<AskEntityRecord | null>;
  region?: Region;
  /** Force this record to be the primary ("Not what you meant?" picks). */
  pin?: string;
  /** Set false to ignore curated question pairs (used to measure the pipeline without them). Default true. */
  usePairs?: boolean;
  onStep?: (step: string) => void;
};

export type AskResult = AskAnswer & { analysis: Analysis; consulted: Source[] };

/** How many records are read for one question (named records first, then retrieval). */
export const ASK_FETCH = 8;

const unique = (ids: Array<string | undefined>): string[] => { const s = new Set<string>(); const out: string[] = []; for (const id of ids) if (id && !s.has(id)) { s.add(id); out.push(id); } return out; };

export async function answerQuestion(question: string, deps: AskDeps): Promise<AskResult> {
  const { index } = deps;
  const byId = prepareIndex(index).byId;
  const lookup = (id: string): AskIndexEntry | undefined => byId.get(id);
  deps.onStep?.("Reading the question");
  const a = analyseQuestion(question, index);
  if (deps.usePairs === false) a.pair = undefined;

  deps.onStep?.("Finding records");
  const lexical = deps.lexical(question, 12), concept = deps.concept(question, 12);
  const retrieved = retrieveIds(lexical.map((id) => ({ id })), concept.map((id) => ({ id })), ASK_FETCH);

  // Candidates for the primary record: what the question named, then the curated pair's records.
  type Cand = { entry: AskIndexEntry; strong: boolean; order: number; fromPair?: boolean };
  const cands: Cand[] = a.entities.map((r, i) => ({ entry: r.entry, strong: r.strong, order: i }));
  for (const id of a.pair?.pair.ids ?? []) {
    if (cands.some((c) => c.entry.id === id)) continue;
    const en = byId.get(id);
    if (en) cands.push({ entry: en, strong: true, order: cands.length, fromPair: true });
  }
  // Records the question itself named outrank records that only the curated pair supplies.
  const rank = (c: Cand) => (c.strong ? 1 : 0) + kindPriority(a.intent, c.entry.kind) - 0.02 * c.order - (c.fromPair ? 0.2 : 0);
  const sorted = [...cands].sort((x, y) => rank(y) - rank(x));
  let primaryEntry: AskIndexEntry | undefined = sorted[0]?.entry;
  let primaryStrong = !!sorted[0]?.strong;
  // A weak match alone ("chemo", "early-stage") only anchors a definition.
  if (primaryEntry && !primaryStrong && a.intent !== "define" && a.intent !== "general") primaryEntry = undefined;
  // Nothing named: trust the top hit only when word search and concept search agree on it.
  if (!primaryEntry) {
    const agree = lexical.slice(0, 5).find((id) => concept.slice(0, 5).includes(id));
    const en = agree ? byId.get(agree) : undefined;
    if (en && kindPriority(a.intent, en.kind) >= 0.3) { primaryEntry = en; primaryStrong = false; }
  }
  const pinned = deps.pin ? byId.get(deps.pin) : undefined;
  if (pinned) { primaryEntry = pinned; primaryStrong = true; }
  const secondaryEntries = sorted.filter((c) => c.strong && c.entry.id !== primaryEntry?.id).map((c) => c.entry).slice(0, 3);

  const wanted = unique([primaryEntry?.id, ...secondaryEntries.map((e) => e.id), ...(a.pair?.pair.ids ?? []), ...retrieved]).slice(0, ASK_FETCH + 2);
  deps.onStep?.(`Reading ${wanted.length} records`);
  const loaded = new Map<string, AskEntityRecord>();
  const loadAll = async (ids: string[]) => { const rs = await Promise.all(ids.map((id) => deps.load(id))); rs.forEach((r, i) => { if (r) loaded.set(ids[i], r); }); };
  await loadAll(wanted);

  const primary = primaryEntry ? loaded.get(primaryEntry.id) : undefined;
  const secondary = secondaryEntries.map((e) => loaded.get(e.id)).filter((r): r is AskEntityRecord => !!r);

  // Second wave: what the template for this intent needs beyond the named records.
  const wave: string[] = [];
  if (primary) {
    const e = primary.entity;
    if (a.intent === "results" && e.kind !== "trial") wave.push(...(e.trials ?? []).slice(0, 3), ...(primary.neighbours.trial ?? []).map((t) => t.id).slice(0, 3));
    if (a.intent === "trials" && e.kind !== "trial") wave.push(...trialsOf(primary, lookup, 3).map((t) => t.id));
    if (a.intent === "mechanism" && e.kind === "drug") wave.push(...(e.targets ?? []).slice(0, 1));
    if (a.intent === "who" && e.kind === "drug") wave.push(...(e.companies ?? []).slice(0, 2));
    if (a.intent === "who" && (e.kind === "technology" || e.kind === "target")) wave.push(...(primary.neighbours.drug ?? []).filter((d) => byId.get(d.id)?.status === "approved").slice(0, 4).map((d) => d.id));
    if (a.intent === "results" && e.kind === "trial") wave.push(...(e.drugs ?? []).slice(0, 2));
    const checkpoint = e.id === "checkpoint-inhibitor" || e.id === "irae" || (e.technologies ?? []).includes("checkpoint-inhibitor") || (e.targets ?? []).some((t) => ["pd1", "pdl1", "ctla4", "lag3", "tigit"].includes(t));
    if (a.intent === "side-effects" && checkpoint) wave.push("irae");
    if (a.intent === "prognosis") wave.push("prognosis");
  }
  const waveIds = unique(wave).filter((id) => byId.has(id)).slice(0, 4);
  if (waveIds.some((id) => !loaded.has(id))) { deps.onStep?.("Reading linked records"); await loadAll(waveIds.filter((id) => !loaded.has(id))); }
  const related = waveIds.map((id) => loaded.get(id)).filter((r): r is AskEntityRecord => !!r);

  const namedIds = new Set([primary?.entity.id, ...secondary.map((r) => r.entity.id)]);
  const retrievedRecs = wanted.map((id) => loaded.get(id)).filter((r): r is AskEntityRecord => !!r && !namedIds.has(r.entity.id));
  const resolvedNotes = a.entities.filter((r) => r.strong).slice(0, 3).map((r) => (r.pattern.toLowerCase() === r.entry.name.toLowerCase() ? r.entry.name : `“${r.pattern}” → ${r.entry.name}`));

  deps.onStep?.("Composing the answer");
  const answer = composeTemplated({
    question, intent: a.intent, primary, secondary, related, retrieved: retrievedRecs, lookup, region: deps.region,
    alternates: a.alternates, primaryStrong, resolvedNotes,
    pair: a.pair ? { question: a.pair.pair.q, source: a.pair.pair.source === "benchmark" ? "open benchmark" : "questions to ask your oncologist" } : undefined,
  });
  const consulted: Source[] = [...loaded.values()].map((r) => ({ id: r.entity.id, kind: r.entity.kind, name: r.entity.name, route: r.route }));
  return { ...answer, analysis: a, consulted };
}
