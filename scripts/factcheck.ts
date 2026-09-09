/**
 * Automated fact checks against public registries. Network. Polite (sequential, backoff).
 *
 *  (a) Products with a US approval → openFDA drug label search by generic name. A product recorded
 *      as US-approved but with no openFDA label is flagged (possible error, or label not yet indexed).
 *      A product with a label but recorded status not approved is flagged the other way.
 *  (b) Trials with an NCT id → ClinicalTrials.gov v2: overallStatus, phases, primary completion date.
 *      Recorded "recruiting" vs registry completed/terminated, recorded positive/negative vs registry
 *      withdrawn, recorded phase vs registry phase, and a primary completion date that has passed while
 *      we still say recruiting.
 *
 * Writes public/factcheck.json (mismatches, for /audit/) and public/factcheck-patches.json: concrete
 * patch proposals {id, field, current, proposed, source} where the registry value maps unambiguously
 * onto ours. Nothing is applied automatically; a maintainer accepts patches with
 * `npx tsx scripts/apply-factcheck.ts <id>[.<field>] ...` (or --all), which edits the data file and
 * appends a CORRECTIONS.md line.
 *
 * Run: npm run factcheck. Weekly via .github/workflows/factcheck.yml.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { routeFor, type Trial } from "../src/lib/schema";

type Mismatch = { check: string; id: string; name: string; route: string; recorded: string; registry: string; url: string; severity: "high" | "medium" | "low" };
type Report = { generated: string; checked: { drugs: number; trials: number }; mismatches: Mismatch[]; errors: string[] };
export type Patch = { id: string; kind: "trial" | "drug"; name: string; route: string; field: "status" | "phase"; current: string; proposed: string; reason: string; source: string; registryValue: string; proposedOn: string };
export type PatchFile = { generated: string; patches: Patch[] };

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

/**
 * Where the registry status maps onto exactly one of ours given what we currently say, propose it.
 * Result statuses (positive, negative, mixed) are editorial judgements the registry cannot make, so a
 * COMPLETED registry entry only ever proposes "completed" for a trial we still call recruiting or active.
 */
export function proposeStatus(current: string | undefined, registry: string): string | null {
  if (!current) return null;
  if (registry === "WITHDRAWN" && current !== "withdrawn" && current !== "negative") return "withdrawn";
  if (registry === "COMPLETED" && (current === "recruiting" || current === "planned")) return "completed";
  if (registry === "ACTIVE_NOT_RECRUITING" && (current === "recruiting" || current === "planned")) return "active";
  if ((registry === "RECRUITING" || registry === "ENROLLING_BY_INVITATION") && current === "planned") return "recruiting";
  if (registry === "NOT_YET_RECRUITING" && current === "recruiting") return "planned";
  return null;
}

/** CT.gov `phases` array -> our phase enum, or null when it does not map (NA, early phase 1). */
export function phaseFromRegistry(phases: string[] | undefined): Trial["phase"] | null {
  if (!phases || !phases.length) return null;
  const set = new Set(phases);
  if (set.has("NA") || set.has("EARLY_PHASE1")) return null;
  const has = (p: string) => set.has(`PHASE${p}`);
  if (has("1") && has("2")) return "1/2";
  if (has("2") && has("3")) return "2/3";
  if (has("1")) return "1";
  if (has("2")) return "2";
  if (has("3")) return "3";
  if (has("4")) return "4";
  return null;
}

async function main() {
  const g = graph();
  const report: Report = { generated: new Date().toISOString(), checked: { drugs: 0, trials: 0 }, mismatches: [], errors: [] };
  const patches: Patch[] = [];
  const today = new Date().toISOString().slice(0, 10);

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

  // (b) ClinicalTrials.gov: status, phase, primary completion.
  const trials = g.kind("trial").filter((t) => t.nct && /^NCT\d{8}$/.test(t.nct));
  for (const t of trials) {
    const fields = ["protocolSection.statusModule.overallStatus", "protocolSection.statusModule.whyStopped", "protocolSection.statusModule.primaryCompletionDateStruct", "protocolSection.designModule.phases"].join(",");
    const url = `https://clinicaltrials.gov/api/v2/studies/${t.nct}?fields=${fields}`;
    const res = await getJson(url);
    report.checked.trials++;
    await sleep(300);
    const registryUrl = `https://clinicaltrials.gov/study/${t.nct}`;
    if (res === null) { report.errors.push(`CT.gov error for ${t.id}`); continue; }
    if (res === "404") { report.mismatches.push({ check: "nct-not-found", id: t.id, name: t.name, route: routeFor(t), recorded: t.nct!, registry: "not found", url: registryUrl, severity: "high" }); continue; }
    const ps = (res as { protocolSection?: { statusModule?: { overallStatus?: string; whyStopped?: string; primaryCompletionDateStruct?: { date?: string; type?: string } }; designModule?: { phases?: string[] } } }).protocolSection;
    const status = ps?.statusModule?.overallStatus ?? "UNKNOWN";
    const ok = CT_TO_OURS[status] ?? [];
    if (t.status && ok.length && !ok.includes(t.status)) {
      report.mismatches.push({ check: "trial-status-vs-registry", id: t.id, name: t.name, route: routeFor(t), recorded: t.status, registry: status, url: registryUrl, severity: status === "WITHDRAWN" || status === "TERMINATED" ? "high" : "medium" });
    }
    const proposed = proposeStatus(t.status, status);
    if (proposed && proposed !== t.status) patches.push({ id: t.id, kind: "trial", name: t.name, route: routeFor(t), field: "status", current: t.status!, proposed, reason: `ClinicalTrials.gov overall status is ${status}${ps?.statusModule?.whyStopped ? ` (${ps.statusModule.whyStopped.slice(0, 100)})` : ""}`, source: registryUrl, registryValue: status, proposedOn: today });

    const regPhase = phaseFromRegistry(ps?.designModule?.phases);
    if (regPhase && regPhase !== t.phase && t.phase !== "platform" && t.phase !== "observational") {
      report.mismatches.push({ check: "trial-phase-vs-registry", id: t.id, name: t.name, route: routeFor(t), recorded: `phase ${t.phase}`, registry: (ps?.designModule?.phases ?? []).join("/"), url: registryUrl, severity: "medium" });
      patches.push({ id: t.id, kind: "trial", name: t.name, route: routeFor(t), field: "phase", current: t.phase, proposed: regPhase, reason: `ClinicalTrials.gov lists phases ${(ps?.designModule?.phases ?? []).join(", ")}`, source: registryUrl, registryValue: (ps?.designModule?.phases ?? []).join("/"), proposedOn: today });
    }

    const pc = ps?.statusModule?.primaryCompletionDateStruct;
    if (pc?.date && pc.type === "ACTUAL" && pc.date < today && (t.status === "recruiting" || t.status === "planned")) {
      report.mismatches.push({ check: "primary-completion-passed", id: t.id, name: t.name, route: routeFor(t), recorded: t.status, registry: `primary completion ${pc.date} (actual)`, url: registryUrl, severity: "medium" });
      if (!patches.some((p) => p.id === t.id && p.field === "status")) patches.push({ id: t.id, kind: "trial", name: t.name, route: routeFor(t), field: "status", current: t.status!, proposed: status === "COMPLETED" ? "completed" : "active", reason: `Primary completion date ${pc.date} has passed (actual) and the registry status is ${status}`, source: registryUrl, registryValue: `${status}; primary completion ${pc.date}`, proposedOn: today });
    }
  }

  const out = join(process.cwd(), "public");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "factcheck.json"), JSON.stringify(report, null, 0));
  const patchFile: PatchFile = { generated: report.generated, patches };
  writeFileSync(join(out, "factcheck-patches.json"), JSON.stringify(patchFile, null, 0));
  console.log(`factcheck: ${report.checked.drugs} drugs, ${report.checked.trials} trials; ${report.mismatches.length} mismatches; ${patches.length} patch proposals; ${report.errors.length} errors`);
  for (const m of report.mismatches) console.log(`  [${m.severity}] ${m.check}: ${m.name} — recorded ${m.recorded}; registry ${m.registry}`);
  if (patches.length) console.log(`  apply accepted patches with: npx tsx scripts/apply-factcheck.ts ${patches.slice(0, 3).map((p) => `${p.id}.${p.field}`).join(" ")} ...`);
}

if (process.argv[1]?.endsWith("factcheck.ts")) main().catch((e) => { console.error(e); process.exit(1); });
