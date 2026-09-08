import { graph } from "./graph";
import type { Entity, Trial } from "./schema";

/**
 * Evidence strength, 0–100, with the parts disclosed. It measures how much and what kind of
 * evidence supports an object in this corpus. It is not a measure of clinical benefit size.
 *
 * Trials
 *   phase          3 → 30 · 2/3 → 22 · 2 → 15 · 1/2 → 8 · 1 → 4 · observational/platform → 10
 *   size           5 × log10(enrolled) capped at 20 (100 → 10, 1,000 → 15, 10,000 → 20)
 *   endpoint       primary endpoint is OS → 20 · PFS/EFS/DFS/RFS/iDFS → 14 · pCR/ORR/other surrogate → 8 · none recorded → 0
 *   result         positive → 15 · mixed → 6 · recruiting/active/planned → 0 · negative/withdrawn → −20
 *   replication    a replication note that does not start with "No", "Not", "Failed", "Ongoing", "Single" → 10 · otherwise 0
 *   regulatory     any linked drug approved → 5
 *
 * Products
 *   status tier    approved/standard-of-care → 35 · phase-3 → 22 · phase-2 → 12 · phase-1 → 6 · preclinical → 2 · negative/withdrawn → 0
 *   best trial     0.45 × the best linked trial score
 *   approvals      4 per approval entry, capped at 20
 *
 * Technologies, targets, and everything else
 *   status tier    as products, scaled to 40
 *   best product   0.6 × the best linked product score
 *
 * Cancers are not scored (a disease is not evidence).
 */
export type EvidencePart = { label: string; points: number };
export type Evidence = { score: number; parts: EvidencePart[] };

const clamp = (x: number) => Math.max(0, Math.min(100, Math.round(x)));
const cache = new Map<string, Evidence>();

const TIER: Record<string, number> = { approved: 35, "standard-of-care": 35, established: 28, positive: 30, "phase-3": 22, completed: 20, "phase-2": 12, recruiting: 8, active: 8, emerging: 10, "phase-1": 6, preclinical: 2, concept: 0, planned: 0, mixed: 10, historic: 5, negative: 0, withdrawn: 0 };

function endpointPoints(t: Trial): EvidencePart {
  const o = t.outcomes.find((x) => x.primary) ?? t.outcomes[0];
  if (!o) return { label: "No structured primary endpoint", points: 0 };
  const e = o.endpoint.toLowerCase();
  if (/overall survival/.test(e) && !/progression|recurrence/.test(e)) return { label: "Primary endpoint: overall survival", points: 20 };
  if (/progression|event-free|disease-free|recurrence|metastasis-free|idfs|dfs|rfs|efs/.test(e)) return { label: "Primary endpoint: time to progression or recurrence", points: 14 };
  return { label: "Primary endpoint: surrogate (response, pCR, detection)", points: 8 };
}

export function trialEvidence(t: Trial): Evidence {
  const parts: EvidencePart[] = [];
  const phase: Record<string, number> = { "3": 30, "2/3": 22, "2": 15, "1/2": 8, "1": 4, "4": 20, observational: 10, platform: 10 };
  parts.push({ label: `Phase ${t.phase}`, points: phase[t.phase] ?? 5 });
  if (t.enrolled) parts.push({ label: `${t.enrolled.toLocaleString()} enrolled`, points: Math.min(20, Math.round(5 * Math.log10(t.enrolled))) });
  parts.push(endpointPoints(t));
  const s = t.status ?? "";
  parts.push({ label: `Result: ${s || "not reported"}`, points: s === "positive" ? 15 : s === "mixed" ? 6 : s === "negative" || s === "withdrawn" ? -20 : 0 });
  const rep = t.replication ?? "";
  const replicated = rep && !/^(no|not|failed|ongoing|single)/i.test(rep);
  parts.push({ label: replicated ? "Independent replication or consistent trials" : "No independent replication recorded", points: replicated ? 10 : 0 });
  const g = graph();
  const anyApproved = t.drugs.some((id) => { const d = g.get(id); return d && (d.status === "approved" || d.status === "standard-of-care"); });
  if (anyApproved) parts.push({ label: "A linked product is approved", points: 5 });
  return { score: clamp(parts.reduce((a, p) => a + p.points, 0)), parts };
}

export function evidenceFor(e: Entity): Evidence | null {
  if (e.kind === "cancer" || e.kind === "section" || e.kind === "institution" || e.kind === "company" || e.kind === "collection" || e.kind === "term" || e.kind === "roadmap" || e.kind === "idea" || e.kind === "pairing" || e.kind === "pathway") return null;
  const hit = cache.get(e.id);
  if (hit) return hit;
  const g = graph();
  let result: Evidence;
  if (e.kind === "trial") result = trialEvidence(e);
  else if (e.kind === "drug") {
    const parts: EvidencePart[] = [{ label: `Status: ${e.status ?? "unknown"}`, points: TIER[e.status ?? ""] ?? 0 }];
    const trials = [...new Set([...e.trials, ...(g.incoming(e.id).get("trial") ?? []).map((t) => t.id)])].map((id) => g.get(id)).filter((t): t is Trial => !!t && t.kind === "trial");
    const best = trials.map((t) => ({ t, s: trialEvidence(t).score })).sort((a, b) => b.s - a.s)[0];
    parts.push(best ? { label: `Best linked trial: ${best.t.name} (${best.s})`, points: Math.round(0.45 * best.s) } : { label: "No linked trial", points: 0 });
    parts.push({ label: `${e.approvals.length} approval entr${e.approvals.length === 1 ? "y" : "ies"}`, points: Math.min(20, 4 * e.approvals.length) });
    result = { score: clamp(parts.reduce((a, p) => a + p.points, 0)), parts };
  } else {
    const parts: EvidencePart[] = [{ label: `Status: ${e.status ?? "unknown"}`, points: Math.round(((TIER[e.status ?? ""] ?? 0) / 35) * 40) }];
    const drugs = (g.incoming(e.id).get("drug") ?? []).concat(e.drugs.map((id) => g.must(id)));
    const best = drugs.map((d) => ({ d, s: evidenceFor(d)?.score ?? 0 })).sort((a, b) => b.s - a.s)[0];
    parts.push(best ? { label: `Best linked product: ${best.d.name} (${best.s})`, points: Math.round(0.6 * best.s) } : { label: "No linked product", points: 0 });
    result = { score: clamp(parts.reduce((a, p) => a + p.points, 0)), parts };
  }
  cache.set(e.id, result);
  return result;
}

export function evidenceLabel(score: number): string {
  return score >= 75 ? "Strong" : score >= 50 ? "Solid" : score >= 30 ? "Emerging" : "Preliminary";
}
