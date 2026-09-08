/**
 * Automated fact checks against public registries. Network. Polite (sequential, backoff).
 *
 *  (a) Products with a US approval → openFDA drug label search by generic name. A product recorded
 *      as US-approved but with no openFDA label is flagged (possible error, or label not yet indexed).
 *      A product with a label but recorded status not approved is flagged the other way.
 *  (b) Trials with an NCT id → ClinicalTrials.gov v2 overallStatus. Recorded "recruiting" vs registry
 *      completed/terminated, recorded positive/negative vs registry withdrawn, etc.
 *
 * Writes public/factcheck.json. Run: npm run factcheck. Weekly via .github/workflows/factcheck.yml.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { routeFor } from "../src/lib/schema";

type Mismatch = { check: string; id: string; name: string; route: string; recorded: string; registry: string; url: string; severity: "high" | "medium" | "low" };
type Report = { generated: string; checked: { drugs: number; trials: number }; mismatches: Mismatch[]; errors: string[] };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function getJson(url: string, attempt = 1): Promise<unknown | null | "404"> {
  try {
    const r = await fetch(url, { headers: { Accept: "application/json", "User-Agent": "OnCo/1.0 (github.com/judegomila/OnCo)" } });
    if (r.status === 404) return "404";
    if (r.status === 429 || r.status >= 500) throw new Error(`HTTP ${r.status}`);
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    if (attempt >= 4) { console.warn(`  giving up ${url}: ${String(e)}`); return null; }
    await sleep(1500 * 2 ** attempt);
    return getJson(url, attempt + 1);
  }
}

function genericName(name: string, code?: string): string {
  const cleaned = name.replace(/\(.*?\)/g, "").replace(/\/.*$/, "").replace(/ \+ .*$/, "").replace(/\bF-18\b|\bLu-177\b|\bLutetium-177\b|\bActinium-225\b/gi, "").trim();
  return cleaned.split(" ").length <= 3 ? cleaned : (code?.split(",")[0].trim() || cleaned);
}

const CT_TO_OURS: Record<string, string[]> = {
  RECRUITING: ["recruiting", "active"],
  NOT_YET_RECRUITING: ["planned", "recruiting"],
  ENROLLING_BY_INVITATION: ["recruiting", "active"],
  ACTIVE_NOT_RECRUITING: ["active", "positive", "negative", "mixed", "completed", "recruiting"],
  COMPLETED: ["completed", "positive", "negative", "mixed", "historic", "active"],
  TERMINATED: ["negative", "withdrawn", "mixed", "completed"],
  WITHDRAWN: ["withdrawn", "negative"],
  SUSPENDED: ["mixed", "negative"],
  UNKNOWN: [],
};

async function main() {
  const g = graph();
  const report: Report = { generated: new Date().toISOString(), checked: { drugs: 0, trials: 0 }, mismatches: [], errors: [] };

  // (a) openFDA labels.
  const drugs = g.kind("drug").filter((d) => !/test|assay|imaging agent|device|regimen|classifier/i.test(d.modality));
  for (const d of drugs) {
    const usApproved = d.approvals.some((a) => /^US/i.test(a.region));
    const q = genericName(d.name, d.code);
    const url = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(q)}"&limit=1`;
    const res = await getJson(url);
    report.checked.drugs++;
    await sleep(400);
    if (res === null) { report.errors.push(`openFDA error for ${d.id}`); continue; }
    type LabelResult = { openfda?: { generic_name?: string[]; brand_name?: string[] } };
    const results = res !== "404" && Array.isArray((res as { results?: LabelResult[] }).results) ? (res as { results: LabelResult[] }).results : [];
    // openFDA's search is fuzzy (e.g. "DOTATATE" matches Lutathera) and biologic names carry
    // four-letter suffixes ("trastuzumab-anns", "tarlatamab-dlle"). "strong" = the name itself or
    // name + suffix; "weak" = the name appears as a whole word (combination products).
    const ql = q.toLowerCase();
    const names = results.flatMap((r) => r.openfda?.generic_name ?? []).map((n) => n.toLowerCase());
    const strong = names.some((n) => n === ql || n.startsWith(`${ql}-`) || n.replace(/-[a-z]{4}$/, "") === ql);
    const weak = strong || names.some((n) => new RegExp(`(^|[^a-z])${ql.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`).test(n));
    const hasLabel = strong;
    const publicUrl = `https://open.fda.gov/apis/drug/label/`;
    if (usApproved && !weak) report.mismatches.push({ check: "us-approval-no-openfda-label", id: d.id, name: d.name, route: routeFor(d), recorded: `US approval ${Math.min(...d.approvals.filter((a) => /^US/i.test(a.region)).map((a) => a.year))}`, registry: `no openFDA label for "${q}"`, url: publicUrl, severity: "low" });
    if (!usApproved && hasLabel && !["approved", "standard-of-care", "withdrawn"].includes(d.status ?? "")) report.mismatches.push({ check: "openfda-label-but-not-approved", id: d.id, name: d.name, route: routeFor(d), recorded: `status ${d.status ?? "unset"}, no US approval recorded`, registry: `openFDA has a label for "${q}"`, url: publicUrl, severity: "medium" });
  }

  // (b) ClinicalTrials.gov statuses.
  const trials = g.kind("trial").filter((t) => t.nct && /^NCT\d{8}$/.test(t.nct));
  for (const t of trials) {
    const url = `https://clinicaltrials.gov/api/v2/studies/${t.nct}?fields=protocolSection.statusModule.overallStatus,protocolSection.statusModule.whyStopped`;
    const res = await getJson(url);
    report.checked.trials++;
    await sleep(300);
    if (res === null) { report.errors.push(`CT.gov error for ${t.id}`); continue; }
    if (res === "404") { report.mismatches.push({ check: "nct-not-found", id: t.id, name: t.name, route: routeFor(t), recorded: t.nct!, registry: "not found", url: `https://clinicaltrials.gov/study/${t.nct}`, severity: "high" }); continue; }
    const status = (res as { protocolSection?: { statusModule?: { overallStatus?: string; whyStopped?: string } } }).protocolSection?.statusModule?.overallStatus ?? "UNKNOWN";
    const ok = CT_TO_OURS[status] ?? [];
    if (t.status && ok.length && !ok.includes(t.status)) {
      report.mismatches.push({ check: "trial-status-vs-registry", id: t.id, name: t.name, route: routeFor(t), recorded: t.status, registry: status, url: `https://clinicaltrials.gov/study/${t.nct}`, severity: status === "WITHDRAWN" || status === "TERMINATED" ? "high" : "medium" });
    }
  }

  const out = join(process.cwd(), "public");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "factcheck.json"), JSON.stringify(report, null, 0));
  console.log(`factcheck: ${report.checked.drugs} drugs, ${report.checked.trials} trials; ${report.mismatches.length} mismatches; ${report.errors.length} errors`);
  for (const m of report.mismatches) console.log(`  [${m.severity}] ${m.check}: ${m.name} — recorded ${m.recorded}; registry ${m.registry}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
