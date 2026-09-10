/**
 * Ask OnCo, step two: build the answer from the structured fields of the records the question named.
 *
 * One template per intent (define, treatments, approval, mechanism, side effects, trials, results, compare,
 * prognosis, who, cost, biomarkers). Every sentence is either copied from a record field or filled from
 * structured data on that record, and every sentence carries a citation to the record it came from. Plain
 * English comes first (the TL;DR), then one level deeper. When no template applies the extractive
 * sentence-retrieval path in ask.ts is used unchanged.
 *
 * Pure and browser-safe. Reads regional approvals from src/data/regional-approvals.ts (already in the client
 * bundle through the region switcher).
 */
import { composeAnswer, recordFromEntity, sentences, type Answer, type AskRecord, type Cited, type EntityLike, type Source } from "./ask";
import { shortName, type AskIndexEntry } from "./ask-index";
import { INTENT_LABEL, type Intent } from "./ask-intent";
import { tokenize } from "./semantic";
import type { Kind } from "./schema";
import { REGION_META, REGIONS, regionalApprovals, type Region, type RegionalEntry } from "@/data/regional-approvals";
import { SURVIVAL_SITES } from "@/data/survival-map";

export type Neighbour = { id: string; kind: Kind; name: string; route: string };

/** The entity JSON from /api/v1/entities/<id>.json, typed loosely: every kind-specific field is optional. */
export type AskEntity = EntityLike & {
  aka?: string[]; status?: string; tags?: string[];
  brand?: string; code?: string; modality?: string; payload?: string; linker?: string; mechanismSteps?: string[];
  toxicity?: Array<{ event: string; anyGradePct?: number; grade3PlusPct?: number; note?: string }>;
  access?: Array<{ country: string; listPrice?: string; reimbursement?: string; assistance?: string; generic?: boolean }>;
  regulatoryEvents?: Array<{ date: string; type: string; region: string; note: string }>;
  dosing?: { route: string; schedule: string; modifications?: string; monitoring?: string };
  standardOfCare?: Array<{ setting: string; approach: string; refs?: string[] }>;
  pipeline?: string[]; group?: string; burden?: string; subtypes?: string[]; biomarkers?: string[];
  phase?: string; setting?: string; sponsor?: string; nct?: string; yearReported?: number; enrolled?: number;
  hq?: string; country?: string; companyType?: string; ticker?: string; founded?: number;
  city?: string; institutionType?: string; nci?: string; university?: string; programs?: string[]; newsweekOncology2026?: number;
  role?: string; specialisms?: string[]; institutionId?: string;
  category?: string; journal?: string; year?: number; authors?: string; paperType?: string;
  symbol?: string; targetClass?: string; prevalence?: Array<{ cancerId: string; pct: number | string; measure?: string }>;
  since?: number | string; generation?: string; holds?: string; url?: string; maturity?: string; actor?: string;
  stage?: string; severity?: string; metrics?: Array<{ label: string; value: string }>;
  targets?: string[]; drugs?: string[]; cancers?: string[]; trials?: string[]; companies?: string[]; technologies?: string[]; terms?: string[]; institutions?: string[];
};
export type AskEntityRecord = { entity: AskEntity; route: string; neighbours: Record<string, Neighbour[]> };
export type ReadMore = { label: string; href: string };

export type AskAnswer = Answer & {
  intent: Intent;
  /** Which template produced the answer, or "extractive" for the fallback. */
  template: string;
  /** Records the question named, primary first. */
  entities: Source[];
  /** Other candidates for "Not what you meant?". */
  alternates: Source[];
  followUps: string[];
  readMore: ReadMore[];
  /** One line on how the answer was built. */
  method: string;
  pair?: { question: string; source: string };
};

export type ComposeInput = {
  question: string;
  intent: Intent;
  primary?: AskEntityRecord;
  /** Other records the question named, best first. */
  secondary: AskEntityRecord[];
  /** Second-wave records fetched for the template (trials of a drug, target of a drug, the irAE term). */
  related: AskEntityRecord[];
  /** Retrieval hits, for the fallback and the detail sentences. */
  retrieved: AskEntityRecord[];
  lookup: (id: string) => AskIndexEntry | undefined;
  region?: Region;
  alternates: AskIndexEntry[];
  /** True when the primary was named in the question (not merely retrieved). */
  primaryStrong: boolean;
  /** "'triple-negative' → Triple-negative breast cancer (TNBC)" lines for the method note. */
  resolvedNotes: string[];
  pair?: { question: string; source: string };
};

const toSource = (r: { entity: { id: string; kind: Kind; name: string }; route: string }): Source => ({ id: r.entity.id, kind: r.entity.kind, name: r.entity.name, route: r.route });
const entrySource = (e: AskIndexEntry): Source => ({ id: e.id, kind: e.kind, name: e.name, route: e.route });

/** Collects cited sentences in order, one citation number per record in order of first use. */
class Builder {
  sentences: Cited[] = [];
  sources: Source[] = [];
  private cite = new Map<string, number>();
  private seen = new Set<string>();
  private tokens: Array<Set<string>> = [];

  citeOf(s: Source): number {
    let n = this.cite.get(s.id);
    if (n === undefined) { n = this.sources.length + 1; this.cite.set(s.id, n); this.sources.push(s); }
    return n;
  }
  has(text: string): boolean {
    const t = new Set(tokenize(text));
    if (this.seen.has(text.trim())) return true;
    return this.tokens.some((x) => overlap(x, t) > 0.7);
  }
  add(src: Source, text: string | undefined, field: string, score = 1): boolean {
    if (!text) return false;
    const t = text.replace(/\s+/g, " ").trim();
    if (!t || this.has(t)) return false;
    this.seen.add(t);
    this.tokens.push(new Set(tokenize(t)));
    this.sentences.push({ text: /[.!?]$/.test(t) ? t : `${t}.`, cite: this.citeOf(src), field, score });
    return true;
  }
}

function overlap(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / Math.max(1, Math.min(a.size, b.size));
}

const list = (items: string[]): string => items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
const firstPara = (s?: string) => (s ?? "").split(/\n\s*\n/)[0] ?? "";
const first = (text: string | undefined, n: number) => sentences(firstPara(text)).slice(0, n);
const short = (r: AskEntityRecord) => shortName(r.entity);
const nameOf = (lookup: ComposeInput["lookup"], id: string) => lookup(id)?.name ?? id;
const statusOf = (lookup: ComposeInput["lookup"], id: string) => lookup(id)?.status;

const COMPANY_TYPE: Record<string, string> = { pharma: "pharmaceutical", biotech: "biotech", diagnostics: "diagnostics", imaging: "imaging", devices: "medical-device", "ai-software": "AI and software", radiopharma: "radiopharmaceutical", "cell-therapy": "cell-therapy", "cro-services": "contract-research", nonprofit: "non-profit" };
const INSTITUTION_TYPE: Record<string, string> = { "cancer-center": "cancer centre", university: "university", hospital: "hospital", "research-institute": "research institute", government: "government body", consortium: "consortium" };
const COUNTRY: Record<string, string> = { US: "the United States", GB: "the United Kingdom", UK: "the United Kingdom", FR: "France", DE: "Germany", JP: "Japan", CN: "China", KR: "South Korea", CA: "Canada", AU: "Australia", NL: "the Netherlands", IT: "Italy", ES: "Spain", CH: "Switzerland", SE: "Sweden", DK: "Denmark", BE: "Belgium", IN: "India", BR: "Brazil", IL: "Israel", SG: "Singapore", TW: "Taiwan", AT: "Austria", NO: "Norway", FI: "Finland", IE: "Ireland", PT: "Portugal", PL: "Poland", TR: "Türkiye", MX: "Mexico", AR: "Argentina", ZA: "South Africa", EG: "Egypt", NG: "Nigeria", KE: "Kenya", TZ: "Tanzania", RW: "Rwanda", GH: "Ghana", MA: "Morocco", TN: "Tunisia", SA: "Saudi Arabia", AE: "the United Arab Emirates", QA: "Qatar", JO: "Jordan", IR: "Iran", TH: "Thailand", VN: "Vietnam", ID: "Indonesia", PH: "the Philippines", NZ: "New Zealand", HK: "Hong Kong", CL: "Chile", CO: "Colombia", PE: "Peru", HU: "Hungary", CZ: "Czechia", SI: "Slovenia" };
const country = (c?: string) => (c ? COUNTRY[c] ?? c : "");
const regulator = (r: Region) => REGION_META[r].regulator.replace(/\s*\(.*\)$/, "");

/** The regional-approvals row for a product, said in sentences: the reader's region first, then the rest in one line. */
function regionalSentences(name: string, id: string, region: Region | undefined): string[] {
  const row = regionalApprovals[id];
  if (!row) return [];
  const out: string[] = [];
  const say = (r: Region, e: RegionalEntry): string => {
    const label = REGION_META[r].label;
    switch (e.status) {
      case "approved": return `In ${r === "US" || r === "EU" || r === "UK" ? "the " : ""}${label}, ${name} is approved by the ${regulator(r)}${e.year ? ` (first approval ${e.year})` : ""}${e.indication ? `, covering ${e.indication}` : ""}${e.note ? `; ${e.note}` : ""}.`;
      case "conditional": return `In ${r === "US" || r === "EU" || r === "UK" ? "the " : ""}${label}, ${name} has conditional approval from the ${regulator(r)}${e.year ? ` (${e.year})` : ""}${e.indication ? `, for ${e.indication}` : ""}.`;
      case "under-review": return `In ${r === "US" || r === "EU" || r === "UK" ? "the " : ""}${label}, ${name} is under review by the ${regulator(r)}${e.note ? `: ${e.note}` : ""}.`;
      case "not-filed": return `In ${r === "US" || r === "EU" || r === "UK" ? "the " : ""}${label}, ${name} has not been filed with the ${regulator(r)}${e.note ? ` (${e.note})` : ""}.`;
      case "withdrawn": return `In ${r === "US" || r === "EU" || r === "UK" ? "the " : ""}${label}, ${name} was withdrawn${e.year ? ` in ${e.year}` : ""}${e.note ? ` (${e.note})` : ""}.`;
      case "rejected": return `In ${r === "US" || r === "EU" || r === "UK" ? "the " : ""}${label}, ${name} was rejected by the ${regulator(r)}${e.note ? ` (${e.note})` : ""}.`;
    }
  };
  const order: Region[] = region ? [region, ...REGIONS.filter((r) => r !== region)] : [...REGIONS];
  const firstRegion = order.find((r) => row[r]);
  if (!firstRegion) return [];
  out.push(say(firstRegion, row[firstRegion]!));
  const rest = order.filter((r) => r !== firstRegion && row[r]);
  const approved = rest.filter((r) => row[r]!.status === "approved" || row[r]!.status === "conditional").map((r) => `${regionName(r)} (${regulator(r)}${row[r]!.year ? `, ${row[r]!.year}` : ""})`);
  const other = rest.filter((r) => row[r]!.status !== "approved" && row[r]!.status !== "conditional").map((r) => `${row[r]!.status.replace("-", " ")} in ${regionName(r)}`);
  if (approved.length) out.push(`It is also approved in ${list(approved)}.`);
  if (other.length) out.push(`Elsewhere it is ${list(other)}.`);
  if (region && !row[region]) out.push(`OnCo has no regulatory record for ${name} in ${regionName(region)}; absence means unknown, not "not approved".`);
  return out;
}

const regionName = (r: Region) => (r === "US" || r === "EU" || r === "UK" ? `the ${REGION_META[r].label}` : REGION_META[r].label);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** A region the question names ("in the UK", "in Europe", "by the FDA") outranks the reader's saved region. */
export function regionFromQuestion(q: string): Region | undefined {
  const s = q.toLowerCase();
  if (/\b(?:uk|u\.k\.|united kingdom|britain|british|england|nhs|nice|mhra)\b/.test(s)) return "UK";
  if (/\b(?:eu|e\.u\.|europe|european|ema|emea|germany|france|italy|spain|netherlands)\b/.test(s)) return "EU";
  if (/\b(?:japan|japanese|pmda|mhlw)\b/.test(s)) return "JP";
  if (/\b(?:china|chinese|nmpa)\b/.test(s)) return "CN";
  if (/\b(?:australia|australian|tga|pbs)\b/.test(s)) return "AU";
  if (/\b(?:india|indian|cdsco|dcgi|pm-jay|ayushman)\b/.test(s)) return "IN";
  if (/\b(?:us|u\.s\.|usa|united states|america|american|fda|medicare)\b/.test(s)) return "US";
  return undefined;
}

/** Trials linked to a record, curated order first, recruiting first. */
export function trialsOf(r: AskEntityRecord, lookup: ComposeInput["lookup"], max = 6): Neighbour[] {
  const ids = [...(r.entity.trials ?? []), ...(r.neighbours.trial ?? []).map((t) => t.id)];
  const seen = new Set<string>();
  const out: Neighbour[] = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    const n = (r.neighbours.trial ?? []).find((t) => t.id === id);
    const en = lookup(id);
    if (n) out.push(n); else if (en) out.push({ id: en.id, kind: en.kind, name: en.name, route: en.route });
  }
  const rank = (s?: string) => (s === "recruiting" ? 0 : s === "active" || s === "planned" ? 1 : s === "positive" ? 2 : s === "mixed" ? 3 : s === "completed" ? 4 : s === "negative" ? 5 : 6);
  return out.sort((a, b) => rank(statusOf(lookup, a.id)) - rank(statusOf(lookup, b.id))).slice(0, max);
}

function withStatus(n: Neighbour, lookup: ComposeInput["lookup"]): string {
  const s = statusOf(lookup, n.id);
  return s ? `${n.name} (${s.replace("-", " ")})` : n.name;
}

/** The products that matter most for a record: for a cancer, those named in its standard of care (in order); otherwise approved neighbours. */
function keyDrugs(r: AskEntityRecord, lookup: ComposeInput["lookup"]): Neighbour[] {
  const out: Neighbour[] = [];
  const seen = new Set<string>();
  const push = (n?: Neighbour) => { if (n && !seen.has(n.id)) { seen.add(n.id); out.push(n); } };
  if (r.entity.kind === "cancer") {
    for (const row of r.entity.standardOfCare ?? []) for (const id of row.refs ?? []) { const en = lookup(id); if (en?.kind === "drug") push({ id: en.id, kind: en.kind, name: en.name, route: en.route }); }
  }
  for (const d of r.neighbours.drug ?? []) if (statusOf(lookup, d.id) === "approved") push(d);
  return out;
}

function drugsOf(r: AskEntityRecord, lookup: ComposeInput["lookup"]): { approved: Neighbour[]; late: Neighbour[]; other: Neighbour[] } {
  const ds = r.neighbours.drug ?? [];
  const approved = ds.filter((d) => statusOf(lookup, d.id) === "approved");
  const late = ds.filter((d) => statusOf(lookup, d.id) === "phase-3");
  const other = ds.filter((d) => !approved.includes(d) && !late.includes(d));
  return { approved, late, other };
}

type Ctx = ComposeInput & { b: Builder; readMore: ReadMore[] };

/* ------------------------------------------------------------------ templates */

function tDefine(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  c.b.add(s, e.tldr, "TL;DR");
  for (const x of first(e.summary, 2)) c.b.add(s, x, "summary");
  switch (e.kind) {
    case "cancer": if (e.stateOfArt?.[0]) c.b.add(s, e.stateOfArt[0], "state of the art"); break;
    case "target": c.b.add(s, e.biology, "biology"); if (e.whereFound?.length) c.b.add(s, `Where it is found: ${list(e.whereFound.slice(0, 4))}.`, "where found"); break;
    case "technology": for (const x of first(e.principle, 1)) c.b.add(s, x, "principle"); break;
    case "drug": c.b.add(s, e.mechanism, "mechanism"); if (e.approvals?.length) { const a = [...e.approvals].sort((x, y) => x.year - y.year)[0]; c.b.add(s, `First approved in ${a.region} in ${a.year} for ${a.indication}.`, "approvals"); } break;
    case "trial": c.b.add(s, e.result, "result"); if (e.setting) c.b.add(s, `Setting: ${e.setting}.`, "setting"); break;
    case "pathway": c.b.add(s, e.analogy, "analogy"); if (e.interventions?.[0]) c.b.add(s, e.interventions[0], "interventions"); break;
    case "term": {
      const drugs = (r.neighbours.drug ?? []).slice(0, 4).map((d) => d.name);
      const cancers = (r.neighbours.cancer ?? []).slice(0, 4).map((d) => shortName(d));
      if (drugs.length || cancers.length) c.b.add(s, `Why it matters: ${[drugs.length ? `it decides or shapes the use of ${list(drugs)}` : "", cancers.length ? `it comes up in ${list(cancers)}` : ""].filter(Boolean).join(", and ")}.`, "linked records");
      break;
    }
    case "company": case "institution": case "person": return tWho(c, r);
    case "collection": c.b.add(s, e.holds, "what it holds"); break;
    case "bottleneck": if (e.causes?.[0]) c.b.add(s, e.causes[0], "causes"); if (e.successLooksLike) c.b.add(s, e.successLooksLike, "success looks like"); break;
    case "paper": c.b.add(s, e.whatItMeans, "what it means"); if (e.findings?.[0]) c.b.add(s, e.findings[0], "findings"); break;
    case "idea": c.b.add(s, e.hypothesis, "hypothesis"); break;
  }
  if (e.kind === "cancer" || e.kind === "target") {
    const drugs = keyDrugs(r, c.lookup).slice(0, 5).map((d) => d.name);
    if (drugs.length) c.b.add(s, `${e.kind === "cancer" ? "Treatments in the standard of care for" : "Approved products against"} ${short(r)} on OnCo include ${list(drugs)}.`, "linked products");
    if (e.kind === "cancer" && e.burden && /\bhow (?:common|many)\b|\bincidence\b|\bprevalence\b|\bburden\b|\bcases\b|\bmarket\b/i.test(c.question)) c.b.add(s, e.burden, "burden");
  }
  if (e.kind === "drug" && e.dosing && /\bdos(?:e|es|ing|age)\b|\bschedule\b|\bhow (?:often|much)\b|\bmg\b/i.test(c.question)) {
    c.b.add(s, `Dosing: ${e.dosing.route}; ${e.dosing.schedule}.`, "dosing");
    if (e.dosing.monitoring) c.b.add(s, `Monitoring: ${e.dosing.monitoring}.`, "dosing");
  }
  return c.b.sentences.length > 0;
}

function companyLine(e: AskEntity): string | undefined {
  if (!e.hq) return undefined;
  return `${e.name} is a ${COMPANY_TYPE[e.companyType ?? ""] ?? e.companyType ?? ""} company headquartered in ${e.hq}${e.ticker ? ` (ticker ${e.ticker})` : ""}${e.founded ? `, founded ${e.founded}` : ""}.`;
}

function institutionLine(e: AskEntity): string | undefined {
  if (!e.city) return undefined;
  return `${e.name} is a ${INSTITUTION_TYPE[e.institutionType ?? ""] ?? e.institutionType ?? "centre"} in ${e.city}, ${country(e.country)}${e.nci ? `, an NCI-designated ${e.nci} cancer center` : ""}${e.newsweekOncology2026 ? `, ranked ${e.newsweekOncology2026} in the world for oncology in the Newsweek/Statista 2026 list` : ""}.`;
}

function tTreatments(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  if (e.kind === "cancer") {
    c.b.add(s, e.tldr, "TL;DR");
    const rows = e.standardOfCare ?? [];
    for (const row of rows.slice(0, 6)) c.b.add(s, `${row.setting}: ${row.approach}`, "standard of care");
    if (!rows.length) for (const x of e.stateOfArt?.slice(0, 2) ?? []) c.b.add(s, x, "state of the art");
    const pipe = (e.pipeline ?? []).slice(0, 6).map((id) => nameOf(c.lookup, id));
    if (pipe.length) c.b.add(s, `In the pipeline for ${short(r)}: ${list(pipe)}.`, "pipeline");
    c.readMore.push({ label: `Lines of therapy for ${short(r)}`, href: `/sequencing/${e.id}/` }, { label: "Questions to ask your oncologist", href: `/prep/?cancer=${e.id}` });
    return true;
  }
  if (e.kind === "drug") {
    c.b.add(s, e.tldr, "TL;DR");
    const ap = [...(e.approvals ?? [])].sort((a, b) => b.year - a.year).slice(0, 4);
    if (ap.length) c.b.add(s, `${short(r)} is approved for: ${ap.map((a) => `${a.indication} (${a.region} ${a.year})`).join("; ")}.`, "approvals");
    else c.b.add(s, `${short(r)} is not yet approved anywhere OnCo tracks${e.status ? `; its status is ${e.status.replace("-", " ")}` : ""}.`, "status");
    const cancers = (r.neighbours.cancer ?? []).slice(0, 5).map((x) => shortName(x));
    if (cancers.length) c.b.add(s, `Cancers linked to ${short(r)} on OnCo: ${list(cancers)}.`, "linked cancers");
    return true;
  }
  if (e.kind === "target" || e.kind === "technology" || e.kind === "term" || e.kind === "pathway") {
    c.b.add(s, e.tldr, "TL;DR");
    const { approved, late } = drugsOf(r, c.lookup);
    if (approved.length) c.b.add(s, `Approved products ${e.kind === "target" ? "against" : e.kind === "technology" ? "using" : "linked to"} ${short(r)}: ${list(approved.slice(0, 8).map((d) => d.name))}.`, "linked products");
    if (late.length) c.b.add(s, `In phase 3: ${list(late.slice(0, 6).map((d) => d.name))}.`, "linked products");
    if (!approved.length && !late.length) { const other = (r.neighbours.drug ?? []).slice(0, 6).map((d) => withStatus(d, c.lookup)); if (other.length) c.b.add(s, `Products on OnCo linked to ${short(r)}: ${list(other)}.`, "linked products"); }
    if (e.kind === "pathway" && e.interventions?.length) for (const x of e.interventions.slice(0, 2)) c.b.add(s, x, "interventions");
    return c.b.sentences.length > 0;
  }
  return false;
}

function tBiomarkers(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  if (e.kind !== "cancer") return false;
  c.b.add(s, e.tldr, "TL;DR");
  if (e.biomarkers?.length) c.b.add(s, `Biomarkers tested in ${short(r)}: ${e.biomarkers.join("; ")}.`, "biomarkers");
  if (e.subtypes?.length) c.b.add(s, `Recognised subtypes: ${e.subtypes.slice(0, 6).join("; ")}.`, "subtypes");
  c.readMore.push({ label: "Biomarker matrix", href: "/biomarker-matrix/" }, { label: "Report reader", href: "/report-reader/" });
  return (e.biomarkers?.length ?? 0) > 0;
}

function tApproval(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  if (e.kind === "drug") {
    c.b.add(s, e.tldr, "TL;DR");
    if (e.mechanism && e.modality) c.b.add(s, `It is ${/^[aeiou]/i.test(e.modality) ? "an" : "a"} ${e.modality}: ${e.mechanism}`, "mechanism");
    for (const x of regionalSentences(short(r), e.id, regionFromQuestion(c.question) ?? c.region)) c.b.add(s, x, "regional approvals");
    const ap = [...(e.approvals ?? [])].sort((a, b) => a.year - b.year);
    if (ap.length) c.b.add(s, `Approvals recorded on OnCo: ${ap.slice(-4).map((a) => `${a.region} ${a.year}, ${a.indication}`).join("; ")}.`, "approvals");
    else if (!regionalApprovals[e.id]) c.b.add(s, `${short(r)} is not approved anywhere OnCo tracks${e.status ? `; its status is ${e.status.replace("-", " ")}` : ""}.`, "status");
    const ev = [...(e.regulatoryEvents ?? [])].sort((a, b) => b.date.localeCompare(a.date))[0];
    if (ev) c.b.add(s, `Latest regulatory event: ${ev.date}, ${ev.type.replace("-", " ")} (${ev.region}): ${ev.note}`, "regulatory events");
    c.readMore.push({ label: "Regulatory status by region", href: "/regulatory/regions/" });
    return true;
  }
  if (e.kind === "technology" || e.kind === "target" || e.kind === "term") {
    c.b.add(s, e.tldr, "TL;DR");
    const { approved, late } = drugsOf(r, c.lookup);
    if (approved.length) c.b.add(s, `Approved products ${e.kind === "target" ? "against" : "using"} ${short(r)} on OnCo: ${list(approved.slice(0, 8).map((d) => d.name))}.`, "linked products");
    else c.b.add(s, `No product ${e.kind === "target" ? "against" : "using"} ${short(r)} is approved yet on OnCo's record.`, "linked products");
    if (late.length) c.b.add(s, `In phase 3: ${list(late.slice(0, 6).map((d) => d.name))}.`, "linked products");
    if (e.kind === "technology" && e.since) c.b.add(s, `First used in people or approved: ${e.since}.`, "since");
    return true;
  }
  if (e.kind === "cancer") return tTreatments(c, r);
  return false;
}

function tMechanism(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  c.b.add(s, e.tldr, "TL;DR");
  switch (e.kind) {
    case "drug":
      c.b.add(s, e.mechanism, "mechanism");
      if (e.mechanismSteps?.length) c.b.add(s, `Step by step: ${e.mechanismSteps.map((x, i) => `${i + 1}) ${x.replace(/\.$/, "")}`).join("; ")}.`, "mechanism steps");
      if (e.payload) c.b.add(s, `Payload: ${e.payload}${e.linker ? `; linker: ${e.linker}` : ""}.`, "payload");
      for (const t of c.related.filter((x) => x.entity.kind === "target").slice(0, 1)) c.b.add(toSource(t), t.entity.biology, "biology");
      return true;
    case "technology": {
      for (const x of first(e.principle, 3)) c.b.add(s, x, "principle");
      if (/\bresist|\blimit|\bfail|\bwhy not\b|\bproblem/i.test(c.question)) for (const x of (e.limitations ?? []).slice(0, 3)) c.b.add(s, x, "limitations");
      else if (e.strengths?.[0]) c.b.add(s, `Strengths: ${e.strengths.slice(0, 2).join("; ")}.`, "strengths");
      return true;
    }
    case "pathway": c.b.add(s, e.analogy, "analogy"); for (const x of first(e.summary, 1)) c.b.add(s, x, "summary"); for (const x of e.interventions?.slice(0, 2) ?? []) c.b.add(s, x, "interventions"); return true;
    case "target": c.b.add(s, e.biology, "biology"); for (const x of first(e.summary, 1)) c.b.add(s, x, "summary"); return true;
    case "term": for (const x of first(e.summary, 2)) c.b.add(s, x, "summary"); return true;
    default: return false;
  }
}

function tSideEffects(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  if (e.kind === "drug") {
    c.b.add(s, e.tldr, "TL;DR");
    const tox = [...(e.toxicity ?? [])].sort((a, b) => (b.grade3PlusPct ?? -1) - (a.grade3PlusPct ?? -1) || (b.anyGradePct ?? -1) - (a.anyGradePct ?? -1));
    if (tox.length) {
      const fmt = (t: (typeof tox)[number]) => `${t.event.toLowerCase()}${t.anyGradePct !== undefined || t.grade3PlusPct !== undefined ? ` (${[t.anyGradePct !== undefined ? `${t.anyGradePct}% any grade` : "", t.grade3PlusPct !== undefined ? `${t.grade3PlusPct}% grade 3 or higher` : ""].filter(Boolean).join(", ")})` : ""}`;
      c.b.add(s, `The side effects recorded for ${short(r)}${tox[0].note ? ` (${tox[0].note})` : ""}, most serious first: ${tox.slice(0, 5).map(fmt).join("; ")}.`, "toxicity");
    } else {
      const hits = sentences(e.summary).filter((x) => /toxic|adverse|side effect|neutropenia|nausea|diarrhoea|pneumonitis|ILD|fatigue|rash|monitor/i.test(x));
      for (const x of hits.slice(0, 2)) c.b.add(s, x, "summary");
      if (!hits.length) c.b.add(s, `OnCo has no side-effect table for ${short(r)} yet; the label and the pivotal trial publication are the sources to check.`, "toxicity");
    }
    if (e.dosing?.monitoring) c.b.add(s, `Monitoring: ${e.dosing.monitoring}.`, "dosing");
    if (e.dosing?.modifications) c.b.add(s, `Dose changes: ${e.dosing.modifications}.`, "dosing");
    const checkpoint = (e.technologies ?? []).includes("checkpoint-inhibitor") || (e.targets ?? []).some((t) => t === "pd1" || t === "pdl1" || t === "ctla4" || t === "lag3");
    if (checkpoint) c.readMore.push({ label: "irAE guide: immune side effects by organ and grade", href: "/irae/" });
    const irae = c.related.find((x) => x.entity.id === "irae");
    if (checkpoint && irae) c.b.add(toSource(irae), irae.entity.tldr, "TL;DR");
    c.readMore.push({ label: "Side effects by symptom: when to call", href: "/side-effects/" });
    return true;
  }
  if (e.kind === "technology" || e.kind === "term" || e.kind === "cancer") {
    c.b.add(s, e.tldr, "TL;DR");
    const pool = [...(e.limitations ?? []), ...sentences(e.summary), ...(e.openProblems ?? [])];
    const hits = pool.filter((x) => /toxic|adverse|side effect|safety|neutropenia|nausea|diarrhoea|pneumonitis|ILD|fatigue|rash|colitis|thyroid|cytokine|CRS|neurotox|hair|alopecia|immune-related|irAE|hospital/i.test(x));
    for (const x of hits.slice(0, 3)) c.b.add(s, x, e.limitations?.includes(x) ? "limitations" : "summary");
    const irae = c.related.find((x) => x.entity.id === "irae");
    if (irae) { c.b.add(toSource(irae), irae.entity.tldr, "TL;DR"); for (const x of first(irae.entity.summary, 1)) c.b.add(toSource(irae), x, "summary"); c.readMore.push({ label: "irAE guide: immune side effects by organ and grade", href: "/irae/" }); }
    c.readMore.push({ label: "Side effects by symptom: when to call", href: "/side-effects/" });
    return c.b.sentences.length > 1;
  }
  return false;
}

function tTrials(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  if (e.kind === "trial") return tResults(c, r);
  const trials = trialsOf(r, c.lookup, 6);
  c.b.add(s, e.tldr, "TL;DR");
  if (trials.length) {
    c.b.add(s, `Trials on OnCo linked to ${short(r)}: ${list(trials.map((t) => withStatus(t, c.lookup)))}.`, "linked trials");
    for (const t of trials.slice(0, 3)) { const rec = c.related.find((x) => x.entity.id === t.id); if (rec) c.b.add(toSource(rec), rec.entity.tldr, "TL;DR"); }
  } else {
    c.b.add(s, `OnCo lists no trial linked to ${short(r)} yet; the registry search below covers every registered study.`, "linked trials");
  }
  if (e.kind === "cancer") c.readMore.push({ label: `Lines of therapy for ${short(r)}`, href: `/sequencing/${e.id}/` });
  c.readMore.push({ label: "ClinicalTrials.gov (registry)", href: "/collections/clinicaltrials-gov/" }, { label: "Trial explainers in plain words", href: "/explained/" });
  return true;
}

function tResults(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  if (e.kind === "trial") {
    c.b.add(s, e.tldr, "TL;DR");
    if (e.phase || e.setting) c.b.add(s, `${e.name} is a phase ${e.phase ?? "?"} trial${e.sponsor ? ` run by ${e.sponsor}` : ""}${e.enrolled ? ` with ${e.enrolled.toLocaleString()} participants` : ""}${e.setting ? `: ${e.setting}` : ""}.`, "setting");
    c.b.add(s, e.result ? `Headline result: ${e.result}` : undefined, "result");
    const rec = recordFromEntity(e, r.route);
    for (const p of rec.passages.filter((x) => x.field === "outcome").slice(0, 3)) c.b.add(s, p.text, "outcome");
    for (const x of first(e.summary, 2)) c.b.add(s, x, "summary");
    c.b.add(s, e.replication ? `Replication: ${e.replication}` : undefined, "replication");
    for (const d of c.related.filter((x) => x.entity.kind === "drug").slice(0, 2)) c.b.add(toSource(d), d.entity.tldr, "TL;DR");
    c.readMore.push({ label: "Forest plot of every hazard ratio", href: "/forest/" });
    return true;
  }
  if (e.kind === "drug" || e.kind === "technology" || e.kind === "target") {
    c.b.add(s, e.tldr, "TL;DR");
    const trials = c.related.filter((x) => x.entity.kind === "trial");
    for (const t of trials.slice(0, 3)) {
      const ts = toSource(t);
      c.b.add(ts, t.entity.result ? `${t.entity.name}: ${t.entity.result}` : t.entity.tldr, t.entity.result ? "result" : "TL;DR");
    }
    if (!trials.length) for (const x of first(e.summary, 2)) c.b.add(s, x, "summary");
    if (e.kind === "drug") { const ev = [...(e.regulatoryEvents ?? [])].sort((a, b) => b.date.localeCompare(a.date))[0]; if (ev) c.b.add(s, `Latest regulatory event: ${ev.date}, ${ev.type.replace("-", " ")} (${ev.region}): ${ev.note}`, "regulatory events"); }
    return true;
  }
  if (e.kind === "paper") { c.b.add(s, e.tldr, "TL;DR"); for (const x of e.findings?.slice(0, 3) ?? []) c.b.add(s, x, "findings"); c.b.add(s, e.whatItMeans, "what it means"); return true; }
  if (e.kind === "cancer") return tTreatments(c, r);
  return false;
}

function compareFields(r: AskEntityRecord, lookup: ComposeInput["lookup"]): Array<[string, string]> {
  const e = r.entity;
  const names = (ids?: string[]) => (ids ?? []).slice(0, 4).map((id) => nameOf(lookup, id));
  switch (e.kind) {
    case "drug": {
      const ap = e.approvals ?? [];
      const tox = (e.toxicity ?? []).filter((t) => t.grade3PlusPct !== undefined).sort((a, b) => (b.grade3PlusPct ?? 0) - (a.grade3PlusPct ?? 0)).slice(0, 3);
      const common = (e.toxicity ?? []).filter((t) => t.anyGradePct !== undefined).sort((a, b) => (b.anyGradePct ?? 0) - (a.anyGradePct ?? 0)).slice(0, 5);
      return [["Modality", `${e.modality ?? ""}${e.targets?.length ? ` against ${list(names(e.targets))}` : ""}`], ["Payload", e.payload ?? ""], ["Mechanism", e.mechanism ?? ""], ["Approvals", ap.length ? `${ap.length} recorded, first ${Math.min(...ap.map((a) => a.year))}: ${[...ap].sort((a, b) => a.year - b.year)[0].indication}` : `none yet (${e.status ?? "status unknown"})`], ["Grade 3 or higher side effects", tox.map((t) => `${t.event.toLowerCase()} ${t.grade3PlusPct}%`).join(", ")], ["Most common side effects (any grade)", common.map((t) => `${t.event.toLowerCase()} ${t.anyGradePct}%`).join(", ")], ["Companies", list(names(e.companies))]];
    }
    case "technology": return [["Principle", first(e.principle, 1)[0] ?? ""], ["Since", e.since ? String(e.since) : ""], ["Status", e.status ?? ""], ["Strengths", (e.strengths ?? []).slice(0, 2).join("; ")], ["Limitations", (e.limitations ?? []).slice(0, 2).join("; ")]];
    case "cancer": return [["Burden", e.burden ?? ""], ["Biomarkers", (e.biomarkers ?? []).slice(0, 4).join("; ")], ["Standard of care", (e.standardOfCare ?? []).slice(0, 2).map((x) => `${x.setting}: ${x.approach}`).join(" ")]];
    case "target": return [["Class", e.targetClass?.replace("-", " ") ?? ""], ["Biology", e.biology ?? ""], ["Where found", (e.whereFound ?? []).slice(0, 3).join("; ")]];
    case "trial": return [["Phase", e.phase ?? ""], ["Setting", e.setting ?? ""], ["Result", e.result ?? ""], ["Status", e.status ?? ""]];
    case "term": return [["In one line", e.tldr], ["Detail", first(e.summary, 1)[0] ?? ""]];
    default: return [["In one line", e.tldr]];
  }
}

function tCompare(c: Ctx, a: AskEntityRecord, b: AskEntityRecord): boolean {
  const sa = toSource(a), sb = toSource(b);
  c.b.add(sa, a.entity.tldr, "TL;DR");
  c.b.add(sb, b.entity.tldr, "TL;DR");
  const fa = compareFields(a, c.lookup), fb = compareFields(b, c.lookup);
  for (const [label, va] of fa) {
    const vb = fb.find(([l]) => l === label)?.[1];
    if (va) c.b.add(sa, `${label} of ${short(a)}: ${va}`, label.toLowerCase());
    if (vb) c.b.add(sb, `${label} of ${short(b)}: ${vb}`, label.toLowerCase());
  }
  c.readMore.push({ label: `Compare ${short(a)} and ${short(b)} side by side`, href: `/compare/?ids=${a.entity.id},${b.entity.id}` });
  return true;
}

function tPrognosis(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  if (e.kind !== "cancer") return false;
  // Calm framing: what can be done first, then where the population figures live, never a bare number first.
  c.b.add(s, e.tldr, "TL;DR");
  for (const x of (e.stateOfArt ?? []).slice(0, 2)) c.b.add(s, x, "state of the art");
  const soc = e.standardOfCare?.[0];
  if (soc) c.b.add(s, `${soc.setting}: ${soc.approach}`, "standard of care");
  c.b.add(s, `Outcomes in ${short(r)} depend on stage, subtype and the treatments above, and population statistics describe groups, not any one person; that is why this page starts with what can be done rather than a number.`, "how to read survival figures");
  const site = SURVIVAL_SITES[e.id];
  if (site) c.b.add(s, `Five-year relative survival for "${site.seerLabel}" from SEER, with the period it covers and its caveats, is on the survival page${site.shared ? `. ${cap(site.shared)}` : ""}`, "survival disclosure");
  else c.b.add(s, `No population survival table is available for ${short(r)} in SEER; the survival page lists it as a gap and points to international registries.`, "survival disclosure");
  const prog = c.related.find((x) => x.entity.id === "prognosis");
  if (prog) c.b.add(toSource(prog), prog.entity.tldr, "TL;DR");
  c.readMore.push({ label: "Survival statistics, with caveats", href: "/survival/" }, { label: `Treatment journeys for ${short(r)}`, href: "/journeys/" });
  return true;
}

function tWho(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  switch (e.kind) {
    case "company": {
      c.b.add(s, companyLine(e), "profile");
      c.b.add(s, e.tldr, "TL;DR");
      const products = (r.neighbours.drug ?? []).slice(0, 8).map((d) => d.name);
      if (products.length) c.b.add(s, `Products on OnCo linked to ${short(r)}: ${list(products)}.`, "linked products");
      for (const x of first(e.summary, 1)) c.b.add(s, x, "summary");
      c.readMore.push({ label: "Company scorecards", href: "/scorecards/" });
      return true;
    }
    case "institution": {
      c.b.add(s, institutionLine(e), "profile");
      c.b.add(s, e.tldr, "TL;DR");
      if (e.programs?.length) c.b.add(s, `Programmes: ${list(e.programs.slice(0, 5))}.`, "programs");
      const people = (r.neighbours.person ?? []).slice(0, 5).map((p) => p.name);
      if (people.length) c.b.add(s, `People on OnCo at ${short(r)}: ${list(people)}.`, "linked people");
      c.readMore.push({ label: "Institutions, mapped and ranked", href: "/institutions/" }, { label: "Second opinion: expert centres by cancer", href: "/second-opinion/" });
      return true;
    }
    case "person": {
      c.b.add(s, e.role ? `${e.name}: ${e.role}.` : undefined, "role");
      c.b.add(s, e.tldr, "TL;DR");
      const inst = (r.neighbours.institution ?? []).slice(0, 2).map((i) => i.name);
      if (inst.length) c.b.add(s, `Institutions: ${list(inst)}.`, "linked institutions");
      if (e.specialisms?.length) c.b.add(s, `Specialisms: ${list(e.specialisms.slice(0, 4))}.`, "specialisms");
      return true;
    }
    case "drug": {
      c.b.add(s, e.tldr, "TL;DR");
      const cos = (e.companies ?? []).map((id) => c.lookup(id)).filter((x): x is AskIndexEntry => !!x);
      if (cos.length) c.b.add(s, `${short(r)} is developed or marketed by ${list(cos.map((x) => x.name))}.`, "companies");
      for (const co of cos.slice(0, 2)) { const rec = c.related.find((x) => x.entity.id === co.id); if (rec) c.b.add(toSource(rec), rec.entity.tldr, "TL;DR"); }
      const inst = (r.neighbours.institution ?? []).slice(0, 4).map((i) => i.name);
      if (inst.length) c.b.add(s, `Institutions on OnCo linked to ${short(r)}: ${list(inst)}.`, "linked institutions");
      for (const x of first(e.summary, 1)) c.b.add(s, x, "summary");
      c.readMore.push({ label: "Deals and licences", href: "/deals/" });
      return true;
    }
    case "collection": c.b.add(s, e.tldr, "TL;DR"); c.b.add(s, e.holds, "what it holds"); if (e.url) c.readMore.push({ label: `${e.name} (external)`, href: e.url }); return true;
    case "technology": case "target": case "trial": case "cancer": {
      c.b.add(s, e.tldr, "TL;DR");
      // Companies behind the approved products that use or hit it (second wave), then direct company links.
      const products = c.related.filter((x) => x.entity.kind === "drug");
      const viaProducts = new Map<string, string[]>();
      for (const d of products) for (const id of d.entity.companies ?? []) { const en = c.lookup(id); if (en) viaProducts.set(en.name, [...(viaProducts.get(en.name) ?? []), d.entity.brand?.split(/\s*[\/;]\s*/)[0] || short(d)]); }
      if (viaProducts.size) c.b.add(s, `Companies behind the approved products: ${list([...viaProducts].slice(0, 6).map(([co, ds]) => `${co} (${list([...new Set(ds)].slice(0, 3))})`))}.`, "linked products");
      const cos = (r.neighbours.company ?? []).filter((x) => !viaProducts.has(x.name)).slice(0, 6).map((x) => x.name);
      const inst = (r.neighbours.institution ?? []).slice(0, 4).map((x) => x.name);
      const people = (r.neighbours.person ?? []).slice(0, 4).map((x) => x.name);
      if (e.kind === "trial" && e.sponsor) c.b.add(s, `${e.name} is sponsored by ${e.sponsor}.`, "sponsor");
      if (cos.length) c.b.add(s, `${viaProducts.size ? "Also linked" : "Companies on OnCo linked"} to ${short(r)}: ${list(cos)}.`, "linked companies");
      if (inst.length) c.b.add(s, `Institutions: ${list(inst)}.`, "linked institutions");
      if (people.length) c.b.add(s, `People: ${list(people)}.`, "linked people");
      return c.b.sentences.length > 1;
    }
    default: return false;
  }
}

function tCost(c: Ctx, r: AskEntityRecord): boolean {
  const s = toSource(r), e = r.entity;
  if (e.kind !== "drug") return false;
  c.b.add(s, e.tldr, "TL;DR");
  const rows = e.access ?? [];
  const pref: string = regionFromQuestion(c.question) ?? c.region ?? "US";
  const ordered = [...rows].sort((a, b) => (a.country === pref ? -1 : b.country === pref ? 1 : 0));
  for (const a of ordered.slice(0, 4)) {
    const parts = [a.listPrice ? `list price ${a.listPrice}` : "", a.reimbursement ? `coverage: ${a.reimbursement}` : "", a.assistance ? `assistance: ${a.assistance}` : "", a.generic ? "generic available" : ""].filter(Boolean);
    if (parts.length) c.b.add(s, `In ${country(a.country) || a.country}: ${parts.join("; ")}.`, "access");
  }
  if (!rows.length) c.b.add(s, `OnCo has no cost or coverage record for ${short(r)} yet; the financial-help page lists manufacturer programmes and national schemes by country.`, "access");
  for (const x of regionalSentences(short(r), e.id, regionFromQuestion(c.question) ?? c.region).slice(0, 1)) c.b.add(s, x, "regional approvals");
  c.readMore.push({ label: "Financial help by country and product", href: "/assistance/" }, { label: "Cost and coverage by drug", href: "/coverage/" });
  return true;
}

/* ------------------------------------------------------------------ assembly */

const READ_MORE_LIMIT = 6;

export function followUpsFor(e: { kind: Kind; name: string }, intent: Intent): string[] {
  const n = shortName(e);
  const by: Partial<Record<Kind, Array<[Intent, string]>>> = {
    cancer: [["treatments", `How is ${n} treated?`], ["trials", `What trials are open for ${n}?`], ["biomarkers", `Which biomarkers matter in ${n}?`], ["define", `What is ${n}?`]],
    drug: [["mechanism", `How does ${n} work?`], ["side-effects", `What are the side effects of ${n}?`], ["approval", `Where is ${n} approved?`], ["results", `What did the trials of ${n} show?`], ["who", `Who makes ${n}?`], ["cost", `Is ${n} covered where I live?`]],
    target: [["treatments", `Which drugs target ${n}?`], ["define", `What is ${n}?`], ["trials", `What trials target ${n}?`], ["mechanism", `How does ${n} drive cancer?`]],
    technology: [["mechanism", `How does ${n} work?`], ["approval", `Which ${n} products are approved?`], ["side-effects", `What are the side effects of ${n}?`], ["trials", `What trials use ${n}?`]],
    term: [["define", `What does ${n} mean?`], ["treatments", `Which treatments depend on ${n}?`], ["trials", `Which trials used ${n}?`]],
    trial: [["results", `What did ${n} show?`], ["define", `What is ${n}?`], ["who", `Who ran ${n}?`]],
    company: [["who", `What does ${n} make?`], ["trials", `Which trials is ${n} running?`], ["define", `What is ${n}?`]],
    institution: [["who", `Where is ${n} and what is it known for?`], ["trials", `Which trials is ${n} linked to?`]],
    person: [["who", `Where does ${n} work?`], ["define", `Who is ${n}?`]],
    pathway: [["mechanism", `How does the ${n} pathway work?`], ["treatments", `Which drugs act on ${n}?`], ["define", `What is ${n}?`]],
    paper: [["results", `What did the paper ${n} find?`], ["define", `What is ${n}?`]],
    collection: [["define", `What is ${n}?`], ["who", `Who maintains ${n}?`]],
    bottleneck: [["define", `What is the bottleneck "${n}"?`]],
  };
  return (by[e.kind] ?? [["define", `What is ${n}?`]]).filter(([i]) => i !== intent).slice(0, 3).map(([, q]) => q);
}

/** Kinds whose sentences may be added as detail without being named: the evidence-bearing records. */
const DETAIL_KINDS = new Set<Kind>(["cancer", "drug", "target", "technology", "trial", "term", "paper", "pathway", "company", "institution", "person"]);

/**
 * Append the best question-matched sentences (extractive), skipping what the template already said. Only records the
 * question named, records linked to the primary, or evidence-bearing kinds qualify, so a stray idea or source
 * collection cannot drift in on a shared word.
 */
function addDetails(c: Ctx, records: AskEntityRecord[], max: number) {
  if (max <= 0) return;
  const named = new Set([c.primary?.entity.id, ...c.secondary.map((r) => r.entity.id), ...c.related.map((r) => r.entity.id)]);
  const linked = new Set(Object.values(c.primary?.neighbours ?? {}).flat().map((n) => n.id));
  // With no template to lean on (general questions), every retrieved record may contribute, as the extractive path always did.
  const pool = c.intent === "general" ? records : records.filter((r) => named.has(r.entity.id) || (DETAIL_KINDS.has(r.entity.kind) && (!c.primary || linked.has(r.entity.id))));
  const recs: AskRecord[] = pool.map((r) => recordFromEntity(r.entity, r.route));
  const a = composeAnswer(c.question, recs, { maxSentences: max + 4, perRecord: 2 });
  let added = 0;
  for (const s of a.sentences) {
    if (added >= max) break;
    if (s.score < 0.42) continue;
    const src = a.sources[s.cite - 1];
    if (c.b.add(src, s.text, s.field, s.score)) added++;
  }
}

/** Build the templated, cited answer. Falls back to sentence retrieval when no template fits. */
export function composeTemplated(input: ComposeInput): AskAnswer {
  const b = new Builder();
  const c: Ctx = { ...input, b, readMore: [] };
  const { primary, intent } = input;
  const named = [primary, ...input.secondary].filter((r): r is AskEntityRecord => !!r);
  const all = dedupe([...named, ...input.related, ...input.retrieved]);

  let template = "extractive";
  let applied = false;
  if (primary) {
    const pick = (fn: (c: Ctx, r: AskEntityRecord) => boolean, name: string) => { if (fn(c, primary)) { template = name; applied = true; } };
    switch (intent) {
      case "define": pick(tDefine, "define"); break;
      case "treatments": pick(tTreatments, "treatments"); break;
      case "biomarkers": pick(tBiomarkers, "biomarkers"); break;
      case "approval": pick(tApproval, "approval"); break;
      case "mechanism": pick(tMechanism, "mechanism"); break;
      case "side-effects": pick(tSideEffects, "side-effects"); break;
      case "trials": pick(tTrials, "trials"); break;
      case "results": pick(tResults, "results"); break;
      case "prognosis": pick(tPrognosis, "prognosis"); break;
      case "who": pick(tWho, "who"); break;
      case "cost": pick(tCost, "cost"); break;
      case "compare": { const other = input.secondary[0]; if (other && tCompare(c, primary, other)) { template = "compare"; applied = true; } break; }
      case "general": break;
    }
    if (!applied && intent !== "general") { b.sentences.length = 0; if (tDefine(c, primary)) { template = "define"; applied = true; } }
    if (!applied && intent === "general") { if (b.add(toSource(primary), primary.entity.tldr, "TL;DR")) { template = "orientation"; applied = true; } }
  }

  // The other records the question named, in one plain sentence each.
  for (const r of input.secondary.slice(0, 2)) if (b.sentences.length < 9 && r.entity.id !== primary?.entity.id) b.add(toSource(r), r.entity.tldr, "TL;DR");

  let answer: Answer;
  if (applied) {
    addDetails(c, all, intent === "general" ? 5 : Math.max(0, Math.min(3, 7 - b.sentences.length)));
    const confidence: Answer["confidence"] = input.primaryStrong ? "high" : "medium";
    answer = { sentences: b.sentences, sources: b.sources, confidence, note: input.primaryStrong ? undefined : "No record in your question was recognised by name; the answer is built around the closest record search found. Check the chips above." };
  } else {
    const recs: AskRecord[] = all.map((r) => recordFromEntity(r.entity, r.route));
    answer = composeAnswer(input.question, recs);
    if (!answer.sentences.length && !recs.length) answer.note = "OnCo has no record close to this question. Try naming a cancer, product, target, trial or term.";
  }

  // Read more: named records first, then the pages the template pointed at.
  const readMore: ReadMore[] = [];
  const seenHref = new Set<string>();
  const pushRm = (x: ReadMore) => { if (!seenHref.has(x.href) && readMore.length < READ_MORE_LIMIT) { seenHref.add(x.href); readMore.push(x); } };
  for (const r of named.slice(0, 3)) pushRm({ label: r.entity.name, href: r.route });
  for (const x of c.readMore) pushRm(x);
  for (const s of answer.sources.slice(0, 3)) pushRm({ label: s.name, href: s.route });
  if (/\bask\b/i.test(input.question) && named.some((r) => r.entity.kind === "cancer")) pushRm({ label: "Appointment prep pack", href: "/prep/" });

  const followUps = primary ? followUpsFor(primary.entity, applied ? intent : "general") : [];
  const entities: Source[] = named.map(toSource);
  const alternates: Source[] = input.alternates.filter((e) => !named.some((r) => r.entity.id === e.id)).slice(0, 6).map(entrySource);
  const method = [
    `Rules, not a model: the wording was read as “${INTENT_LABEL[intent]}”`,
    named.length ? `${named.length} record${named.length === 1 ? "" : "s"} resolved by name${input.resolvedNotes.length ? ` (${input.resolvedNotes.slice(0, 3).join("; ")})` : ""}` : "no record was named, so the closest records from word and concept search were used",
    applied ? `the “${template}” template filled sentences from record fields` : "sentences were copied verbatim from the closest records",
    input.pair ? `matched the curated question “${input.pair.question}” (${input.pair.source})` : "",
    "every sentence cites the record it came from; nothing is generated",
  ].filter(Boolean).join("; ") + ".";

  return { ...answer, intent, template, entities, alternates, followUps, readMore, method, pair: input.pair };
}

function dedupe(records: AskEntityRecord[]): AskEntityRecord[] {
  const seen = new Set<string>();
  return records.filter((r) => { if (seen.has(r.entity.id)) return false; seen.add(r.entity.id); return true; });
}
