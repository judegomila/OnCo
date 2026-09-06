import { graph } from "./graph";
import { routeFor, type Entity, type Kind } from "./schema";

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
 *  score(cancer) = sum of cancer signals + evidence + degree.  score(all) = evidence + degree.
 */
export type Signals = { soc?: 1; pipeline?: 1; history?: 1; direct?: 1; indirect?: 1 };
export type PowerRow = {
  id: string; kind: Kind; name: string; tldr: string; route: string; status?: string; degree: number; year?: number; evidence: number;
  tags: string[]; meta: string; rel: Record<string, Signals>;
};

const EVIDENCE: Record<string, number> = { approved: 10, "standard-of-care": 10, positive: 8, "phase-3": 6, established: 6, completed: 5, recruiting: 4, active: 4, "phase-2": 4, emerging: 3, "phase-1": 2, preclinical: 1, concept: 0, mixed: 3, historic: 1, negative: 0, withdrawn: 0, planned: 1 };

export const WEIGHTS = { soc: 40, pipeline: 25, history: 10, direct: 15, indirect: 5 } as const;

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

export function powerRows(): PowerRow[] {
  const g = graph();
  const rows = new Map<string, PowerRow>();
  for (const e of g.entities) {
    if (e.kind === "cancer" || e.kind === "section") continue;
    rows.set(e.id, { id: e.id, kind: e.kind, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status, degree: g.degree(e.id), year: yearOf(e), evidence: EVIDENCE[e.status ?? ""] ?? 0, tags: e.tags, meta: metaOf(e), rel: {} });
  }
  const mark = (id: string, cancerId: string, s: keyof Signals) => { const r = rows.get(id); if (r) (r.rel[cancerId] ??= {})[s] = 1; };

  for (const c of g.kind("cancer")) {
    for (const row of c.standardOfCare) for (const id of row.refs) mark(id, c.id, "soc");
    for (const id of c.pipeline) mark(id, c.id, "pipeline");
    for (const h of c.history) for (const id of h.refs) mark(id, c.id, "history");
    for (const [, list] of g.neighbours(c.id)) for (const n of list) mark(n.id, c.id, "direct");
    for (const d of g.neighbours(c.id).get("drug") ?? []) {
      for (const id of [...d.targets, ...d.companies, ...d.technologies]) { const r = rows.get(id); if (r && !r.rel[c.id]) mark(id, c.id, "indirect"); }
    }
  }
  return [...rows.values()];
}

export function scoreRow(r: PowerRow, cancerId: string | null): number {
  let s = r.evidence + 0.5 * Math.min(r.degree, 20);
  if (cancerId) {
    const sig = r.rel[cancerId];
    if (!sig) return -1; // not relevant
    for (const k of Object.keys(WEIGHTS) as Array<keyof typeof WEIGHTS>) if (sig[k]) s += WEIGHTS[k];
  }
  return Math.round(s * 10) / 10;
}
