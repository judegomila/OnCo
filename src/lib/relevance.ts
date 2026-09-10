import { graph } from "./graph";
import { routeFor, type Entity, type Kind } from "./schema";
import { approvedRegions, regionalApprovals } from "@/data/regional-approvals";
import type { Biomarker } from "@/data/biomarkers";
import { biomarkerHits } from "./biomarker-match";
import type { Stage } from "./profile";

/**
 * Relevance of every entity to every cancer, for the power view.
 *
 *  Signals (per cancer):
 *   soc       entity referenced in the cancer's standard-of-care rows          +40
 *   pipeline  entity in the cancer's pipeline list                              +25
 *   history   entity referenced in the cancer's history timeline               +10
 *   direct    entity links to the cancer, or the cancer links to the entity    +15
 *   indirect  entity is a target/company/technology of a drug for this cancer   +5
 *
 *  Signals (global):
 *   evidence  approved/standard-of-care 10 · phase-3/positive 6 · phase-2 4 · phase-1/emerging 2
 *   degree    0.5 × min(connections, 20)
 *
 *  Optional personal signals (browser only; the profile never leaves the device):
 *   biomarker the entity matches one of the reader's biomarkers (targets, terms, technologies, tags)  +20
 *   region    the product is approved in the reader's region                                          +10
 *   stage     a standard-of-care row citing the entity matches the reader's stage                    +15
 *
 *  score(cancer) = sum of cancer signals + evidence + degree (+ personal).  score(all) = evidence + degree (+ personal).
 */
export type Signals = { soc?: 1; pipeline?: 1; history?: 1; direct?: 1; indirect?: 1 };
export type PowerRow = {
  id: string; kind: Kind; name: string; tldr: string; route: string; status?: string; degree: number; year?: number; evidence: number;
  tags: string[]; meta: string; rel: Record<string, Signals>;
  /** For personal signals: what the entity matches on, and where it is approved. */
  targets: string[]; terms: string[]; technologies: string[]; regions: string[];
  /** Standard-of-care settings that cite this entity, per cancer id. */
  soc: Record<string, string[]>;
};

const EVIDENCE: Record<string, number> = { approved: 10, "standard-of-care": 10, positive: 8, "phase-3": 6, established: 6, completed: 5, recruiting: 4, active: 4, "phase-2": 4, emerging: 3, "phase-1": 2, preclinical: 1, concept: 0, mixed: 3, historic: 1, negative: 0, withdrawn: 0, planned: 1 };

export const WEIGHTS = { soc: 40, pipeline: 25, history: 10, direct: 15, indirect: 5 } as const;
export const PERSONAL_WEIGHTS = { biomarker: 20, region: 10, stage: 15 } as const;

function yearOf(e: Entity): number | undefined {
  if (e.kind === "drug") return e.approvals.length ? Math.max(...e.approvals.map((a) => a.year)) : undefined;
  if (e.kind === "trial") return e.yearReported;
  if (e.kind === "technology") return typeof e.since === "number" ? e.since : undefined;
  return undefined;
}

function metaOf(e: Entity): string {
  switch (e.kind) {
    case "drug": return e.modality;
    case "technology": return e.generation ?? "";
    case "target": return e.targetClass.replace("-", " ");
    case "company": return `${e.companyType.replace("-", " ")} · ${e.hq}`;
    case "institution": return `${e.city}, ${e.country}`;
    case "trial": return `Phase ${e.phase}${e.sponsor ? ` · ${e.sponsor}` : ""}`;
    case "pairing": return e.pairingType.replace("-", " → ");
    case "idea": return e.maturity.replace(/-/g, " ");
    case "term": return e.category;
    case "collection": return e.maintainer ?? "";
    default: return "";
  }
}

/** Region codes a product is approved in: the record's own approvals (normalised) plus the regional-approvals side file. */
const REGION_ALIAS: Record<string, string> = { us: "US", usa: "US", fda: "US", eu: "EU", ema: "EU", europe: "EU", uk: "UK", mhra: "UK", jp: "JP", japan: "JP", pmda: "JP", cn: "CN", china: "CN", nmpa: "CN", au: "AU", australia: "AU", tga: "AU" };
function regionsOf(e: Entity): string[] {
  if (e.kind !== "drug") return [];
  const out = new Set<string>();
  for (const a of e.approvals) { const r = REGION_ALIAS[a.region.toLowerCase()]; if (r) out.add(r); if (/^(global|who)$/i.test(a.region)) ["US", "EU", "UK", "JP", "CN", "AU"].forEach((x) => out.add(x)); }
  const row = regionalApprovals[e.id];
  if (row) for (const r of approvedRegions(row)) out.add(r);
  return [...out];
}

export function powerRows(): PowerRow[] {
  const g = graph();
  const rows = new Map<string, PowerRow>();
  for (const e of g.entities) {
    if (e.kind === "cancer" || e.kind === "section") continue;
    rows.set(e.id, {
      id: e.id, kind: e.kind, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status, degree: g.degree(e.id), year: yearOf(e), evidence: EVIDENCE[e.status ?? ""] ?? 0, tags: e.tags, meta: metaOf(e), rel: {},
      targets: e.kind === "target" ? [e.id, ...e.targets] : e.targets, terms: e.terms, technologies: e.kind === "technology" ? [e.id, ...e.technologies] : e.technologies, regions: regionsOf(e), soc: {},
    });
  }
  const mark = (id: string, cancerId: string, s: keyof Signals) => { const r = rows.get(id); if (r) (r.rel[cancerId] ??= {})[s] = 1; };

  for (const c of g.kind("cancer")) {
    for (const row of c.standardOfCare) for (const id of row.refs) { mark(id, c.id, "soc"); const r = rows.get(id); if (r) (r.soc[c.id] ??= []).push(row.setting); }
    for (const id of c.pipeline) mark(id, c.id, "pipeline");
    for (const h of c.history) for (const id of h.refs) mark(id, c.id, "history");
    for (const [, list] of g.neighbours(c.id)) for (const n of list) mark(n.id, c.id, "direct");
    for (const d of g.neighbours(c.id).get("drug") ?? []) {
      for (const id of [...d.targets, ...d.companies, ...d.technologies]) { const r = rows.get(id); if (r && !r.rel[c.id]) mark(id, c.id, "indirect"); }
    }
  }
  return [...rows.values()];
}

/** Does a standard-of-care setting label ("Metastatic, first line", "Localised", "Relapsed") fit a profile stage? */
export function stageMatches(setting: string, stage: Stage): boolean {
  const s = setting.toLowerCase();
  switch (stage) {
    case "early": return /\b(early|localised|localized|resectable|operable|adjuvant|neoadjuvant|stage i\b|stage ii\b|stage i-ii|stage ii-iii|curative)/.test(s);
    case "locally-advanced": return /\b(locally advanced|stage iii|unresectable|inoperable|stage ii-iii)/.test(s);
    case "metastatic-first-line": return /\b(first[- ]line|frontline|1l\b|untreated|newly diagnosed)/.test(s) || (/\b(metastatic|advanced|stage iv)/.test(s) && !/\b(later|second|third|relapsed|refractory|pretreated|previously treated|2l|3l)/.test(s));
    case "metastatic-later": return /\b(later|second[- ]line|third[- ]line|2l\b|3l\b|relapsed|refractory|pretreated|previously treated|beyond|salvage)/.test(s);
    case "unknown": return false;
  }
}

export type Personal = { biomarkers: Biomarker[]; region?: string; stage?: Stage };
export type PersonalSignals = { biomarker?: string[]; region?: string; stage?: string };

/** Personal signals for one row: which biomarkers it matches, whether it is approved in the reader's region, which standard-of-care setting fits the stage. */
export function personalSignals(r: PowerRow, cancerId: string | null, p: Personal): PersonalSignals {
  const out: PersonalSignals = {};
  if (p.biomarkers.length) { const hits = biomarkerHits(r, p.biomarkers); if (hits.length) out.biomarker = hits; }
  if (p.region && r.regions.includes(p.region)) out.region = p.region;
  if (p.stage && p.stage !== "unknown") {
    const settings = cancerId ? (r.soc[cancerId] ?? []) : Object.values(r.soc).flat();
    const hit = settings.find((s) => stageMatches(s, p.stage!));
    if (hit) out.stage = hit;
  }
  return out;
}

export function personalPoints(sig: PersonalSignals | undefined): number {
  if (!sig) return 0;
  return (sig.biomarker ? PERSONAL_WEIGHTS.biomarker : 0) + (sig.region ? PERSONAL_WEIGHTS.region : 0) + (sig.stage ? PERSONAL_WEIGHTS.stage : 0);
}

export function scoreRow(r: PowerRow, cancerId: string | null, personal?: PersonalSignals): number {
  let s = r.evidence + 0.5 * Math.min(r.degree, 20);
  if (cancerId) {
    const sig = r.rel[cancerId];
    if (!sig) return -1; // not relevant
    for (const k of Object.keys(WEIGHTS) as Array<keyof typeof WEIGHTS>) if (sig[k]) s += WEIGHTS[k];
  }
  s += personalPoints(personal);
  return Math.round(s * 10) / 10;
}
