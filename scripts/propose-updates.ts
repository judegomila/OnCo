/**
 * Nightly change-proposal bot (improvement #99).
 *
 * Reads what the feeds found and drafts record patches for a human to review:
 *   public/factcheck.json         registry mismatches (trial status vs ClinicalTrials.gov, openFDA label vs recorded approval)
 *   public/trials/changes.json    trial status changes, posted results, moved primary completion dates
 *   public/fda/recent.json        FDA oncology approvals matched to products but missing from their regulatory events
 *   public/regional/candidates.json  EU rows missing or disagreeing with the EMA register
 *
 * Every proposal names the entity, the source file and line, the field, the current and proposed values,
 * and the URL the evidence came from. The text is deterministic: it is assembled from the fetched records only.
 * An LLM step is deliberately not included (it would need a key, and the plan constrains any model to fetched
 * text); the proposals are already structured enough to apply by hand or in a follow-up tool.
 *
 * Outputs:
 *   public/proposals/latest.json   machine-readable proposals (read by /status/)
 *   docs/proposals/latest.md       the same, as a review checklist for the pull request
 *   CORRECTIONS.md                 with --corrections, one line under "Proposed by the update bot" per run
 *
 * The workflow (.github/workflows/propose.yml) opens a PR labelled `bot-proposal`. Nothing is merged automatically.
 * Run: npx tsx scripts/propose-updates.ts [--corrections]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { routeFor, type Kind } from "../src/lib/schema";
import { sourceLocation } from "../src/lib/source-location";
import { regionalApprovals } from "../src/data/regional-approvals";
import { publicPath, readJson, today, writeJson } from "./feed-utils";
import type { TrialChanges } from "./fetch-trials";
import type { FdaSnapshot } from "./fetch-fda";
import type { RegionalSnapshot } from "./fetch-ema";

type Factcheck = { generated: string; mismatches: Array<{ check: string; id: string; name: string; route: string; recorded: string; registry: string; url: string; severity: string }> };

export type Proposal = {
  id: string;
  kind: "trial-status" | "trial-results" | "trial-completion" | "drug-approval" | "regulatory-event" | "regional-row" | "regional-status" | "new-product";
  confidence: "high" | "medium" | "low";
  entityId?: string; entityName: string; entityKind?: string; route?: string;
  file?: string; line?: number; editUrl?: string;
  field: string; current?: string; proposed: string;
  evidence: string; sourceUrl: string; detected: string;
};
export type ProposalsSnapshot = { generated: string; inputs: Record<string, string | null>; proposals: Proposal[] };

const CT_TO_OURS: Record<string, string> = { COMPLETED: "completed", TERMINATED: "withdrawn", WITHDRAWN: "withdrawn", SUSPENDED: "mixed", RECRUITING: "recruiting", ACTIVE_NOT_RECRUITING: "active", NOT_YET_RECRUITING: "planned", ENROLLING_BY_INVITATION: "recruiting" };
const CORRECTIONS_HEADER = "## Proposed by the update bot (pending review)";

function main() {
  const g = graph();
  const generated = today();
  const proposals: Proposal[] = [];
  const loc = (id: string, kind: Kind) => { try { const l = sourceLocation(id, kind); return { file: l.file, line: l.line, editUrl: l.url }; } catch { return {}; } };
  const push = (p: Omit<Proposal, "id" | "detected"> & { detected?: string }) => proposals.push({ ...p, id: `${p.kind}:${p.entityId ?? p.entityName}:${p.field}:${p.proposed}`.toLowerCase().replace(/[^a-z0-9:.-]+/g, "-").slice(0, 160), detected: p.detected ?? generated });

  const fc = readJson<Factcheck>(publicPath("factcheck.json"));
  const changes = readJson<TrialChanges>(publicPath("trials", "changes.json"));
  const fda = readJson<FdaSnapshot>(publicPath("fda", "recent.json"));
  const regional = readJson<RegionalSnapshot>(publicPath("regional", "candidates.json"));
  const inputs = { factcheck: fc?.generated?.slice(0, 10) ?? null, trialChanges: changes?.fetched ?? null, fda: fda?.fetched ?? null, regional: regional?.fetched ?? null };

  // 1. Registry fact-check mismatches.
  for (const m of fc?.mismatches ?? []) {
    const e = g.get(m.id);
    if (!e) continue;
    if (m.check === "trial-status-vs-registry" && e.kind === "trial") {
      const reg = m.registry.match(/[A-Z_]{6,}/)?.[0];
      const proposed = reg ? CT_TO_OURS[reg] : undefined;
      if (!proposed || proposed === e.status) continue;
      push({ kind: "trial-status", confidence: reg === "COMPLETED" || reg === "TERMINATED" || reg === "WITHDRAWN" ? "medium" : "low", entityId: e.id, entityName: e.name, entityKind: e.kind, route: routeFor(e), ...loc(e.id, e.kind), field: "status", current: e.status, proposed, evidence: `ClinicalTrials.gov overall status is ${reg}; recorded ${m.recorded}. Editorial statuses (positive, negative, mixed) need the result, so this is a floor, not a verdict.`, sourceUrl: m.url });
    }
    if (m.check === "openfda-label-but-not-approved" && e.kind === "drug") {
      push({ kind: "drug-approval", confidence: "medium", entityId: e.id, entityName: e.name, entityKind: e.kind, route: routeFor(e), ...loc(e.id, e.kind), field: "approvals / status", current: `status ${e.status ?? "unset"}; no US approval recorded`, proposed: `add { region: "US", year: <from label>, indication: <from label> } and set status to approved`, evidence: m.registry, sourceUrl: m.url });
    }
  }

  // 2. Trial registry changes.
  for (const c of changes?.changes ?? []) {
    const trial = g.kind("trial").find((t) => t.nct === c.nct);
    const drug = g.get(c.drugId);
    const url = `https://clinicaltrials.gov/study/${c.nct}`;
    if (c.kind === "status" && trial) {
      const proposed = CT_TO_OURS[c.to ?? ""];
      if (proposed && proposed !== trial.status) push({ kind: "trial-status", confidence: "medium", entityId: trial.id, entityName: trial.name, entityKind: "trial", route: routeFor(trial), ...loc(trial.id, "trial"), field: "status", current: trial.status, proposed, evidence: `Registry status moved from ${c.from} to ${c.to} (detected ${c.detected}).`, sourceUrl: url, detected: c.detected });
    } else if (c.kind === "results-posted" && trial) {
      push({ kind: "trial-results", confidence: "high", entityId: trial.id, entityName: trial.name, entityKind: "trial", route: routeFor(trial), ...loc(trial.id, "trial"), field: "result / outcomes", current: trial.result ?? "(none)", proposed: "add the posted primary outcome with the registry as source", evidence: `ClinicalTrials.gov now has posted results for ${c.nct} (detected ${c.detected}).`, sourceUrl: `${url}?tab=results`, detected: c.detected });
    } else if (c.kind === "primary-completion" && trial) {
      push({ kind: "trial-completion", confidence: "medium", entityId: trial.id, entityName: trial.name, entityKind: "trial", route: routeFor(trial), ...loc(trial.id, "trial"), field: "yearReported / calendar", current: c.from, proposed: c.to ?? "", evidence: `Primary completion date moved from ${c.from} to ${c.to}; check the readout calendar entry.`, sourceUrl: url, detected: c.detected });
    } else if (c.kind === "status" && !trial && drug && (c.to === "COMPLETED" || c.to === "TERMINATED") && c.phases.includes("PHASE3")) {
      push({ kind: "trial-status", confidence: "low", entityId: drug.id, entityName: `${c.title} (${c.nct})`, entityKind: "trial", route: routeFor(drug), field: "new trial record", current: "(not in corpus)", proposed: `add phase 3 trial ${c.nct} for ${drug.name} with status ${CT_TO_OURS[c.to] ?? c.to.toLowerCase()}`, evidence: `A phase 3 study of ${drug.name} moved from ${c.from} to ${c.to} (detected ${c.detected}).`, sourceUrl: url, detected: c.detected });
    }
  }

  // 3. FDA approvals matched to products but absent from their regulatory events. Only products named in the
  //    notice title are proposed; a CDK4/6 inhibitor mentioned as a combination partner in the summary is not.
  const namedIn = (title: string, d: { name: string; brand?: string; aka: string[] }) => {
    const low = title.toLowerCase();
    return [d.name, d.brand ?? "", ...d.aka].join(" ").toLowerCase().split(/[^a-z0-9]+/).some((w) => w.length >= 5 && low.includes(w));
  };
  for (const o of fda?.oce ?? []) {
    for (const id of o.drugIds) {
      const d = g.get(id);
      if (!d || d.kind !== "drug" || !namedIn(o.title, d)) continue;
      const has = d.regulatoryEvents.some((e) => e.date === o.date || e.source === o.url);
      if (has) continue;
      const accelerated = /accelerated approval/i.test(o.title);
      push({ kind: "regulatory-event", confidence: "high", entityId: d.id, entityName: d.name, entityKind: "drug", route: routeFor(d), ...loc(d.id, "drug"), field: "regulatoryEvents", current: `${d.regulatoryEvents.length} events; none dated ${o.date}`, proposed: `{ date: "${o.date}", type: "approval", region: "US", note: "${o.title.replace(/^FDA /, "").replace(/"/g, "'")}${accelerated ? " (accelerated)" : ""}", source: "${o.url}" }`, evidence: o.summary.slice(0, 300), sourceUrl: o.url, detected: o.firstSeen });
    }
  }
  for (const n of fda?.notInCorpus ?? []) {
    push({ kind: "new-product", confidence: "medium", entityName: n.generic ?? n.title, field: "new drug record", current: "(not in corpus)", proposed: `add product ${n.generic ?? "(see notice)"} with a US approval dated ${n.date}`, evidence: n.title, sourceUrl: n.url, detected: n.firstSeen });
  }

  // 4. EMA register vs regional-approvals.ts.
  for (const c of regional?.candidates ?? []) {
    if (!c.drugId) continue;
    const d = g.get(c.drugId);
    if (!d) continue;
    const row = regionalApprovals[c.drugId]?.EU;
    if (c.reason === "missing-row") push({ kind: "regional-row", confidence: "high", entityId: d.id, entityName: d.name, entityKind: "drug", route: routeFor(d), file: "src/data/regional-approvals.ts", field: "EU", current: "(no EU entry)", proposed: `EU: ${/conditional/i.test(c.register) ? "C" : "A"}(${c.date?.slice(0, 4) ?? "<year>"}, "${c.url ?? ""}", "${(c.indication ?? "").slice(0, 80).replace(/"/g, "'")}")`, evidence: `EMA register: ${c.product} (${c.inn ?? ""}) ${c.register}${c.date ? `, ${c.date}` : ""}.`, sourceUrl: c.url ?? regional?.sources.ema ?? "" });
    else if (c.reason === "status-mismatch" || c.reason === "year-mismatch") push({ kind: "regional-status", confidence: "medium", entityId: d.id, entityName: d.name, entityKind: "drug", route: routeFor(d), file: "src/data/regional-approvals.ts", field: "EU", current: `${row?.status ?? "?"}${row?.year ? ` (${row.year})` : ""}`, proposed: `${c.register}${c.date ? ` (${c.date})` : ""}`, evidence: `EMA register disagrees with the recorded EU row for ${c.product}.`, sourceUrl: c.url ?? regional?.sources.ema ?? "" });
  }

  // Deduplicate by id; highest confidence first, then newest.
  const rank = { high: 0, medium: 1, low: 2 };
  const seen = new Set<string>();
  const list = proposals.filter((p) => { if (seen.has(p.id)) return false; seen.add(p.id); return true; }).sort((a, b) => rank[a.confidence] - rank[b.confidence] || b.detected.localeCompare(a.detected));

  const snap: ProposalsSnapshot = { generated, inputs, proposals: list };
  writeJson(publicPath("proposals", "latest.json"), snap);
  mkdirSync(join(process.cwd(), "docs", "proposals"), { recursive: true });
  writeFileSync(join(process.cwd(), "docs", "proposals", "latest.md"), renderMarkdown(snap));
  console.log(`propose: ${list.length} proposals (${list.filter((p) => p.confidence === "high").length} high) -> public/proposals/latest.json, docs/proposals/latest.md`);

  if (process.argv.includes("--corrections")) {
    const path = join(process.cwd(), "CORRECTIONS.md");
    if (existsSync(path)) {
      let md = readFileSync(path, "utf8");
      const line = `- ${generated}: ${list.length} proposals drafted from the feeds (${list.filter((p) => p.confidence === "high").length} high confidence); review in [docs/proposals/latest.md](docs/proposals/latest.md). Nothing here is a confirmed correction until a human moves it above.`;
      if (md.includes(CORRECTIONS_HEADER)) {
        md = md.replace(new RegExp(`(${CORRECTIONS_HEADER}\\n\\n)(- ${generated}:[^\\n]*\\n)?`), `$1${line}\n`);
      } else {
        md = md.replace(/\n## How corrections are logged/, `\n${CORRECTIONS_HEADER}\n\n${line}\n\n## How corrections are logged`);
        if (!md.includes(CORRECTIONS_HEADER)) md += `\n${CORRECTIONS_HEADER}\n\n${line}\n`;
      }
      writeFileSync(path, md);
      console.log("propose: CORRECTIONS.md line added");
    }
  }
}

function renderMarkdown(s: ProposalsSnapshot): string {
  const lines = [`# Change proposals ${s.generated}`, "", `Drafted by scripts/propose-updates.ts from: ${Object.entries(s.inputs).map(([k, v]) => `${k} ${v ?? "missing"}`).join(", ")}.`, "", "Review each line against its source. Apply by editing the file named; nothing is applied automatically.", ""];
  for (const conf of ["high", "medium", "low"] as const) {
    const group = s.proposals.filter((p) => p.confidence === conf);
    if (!group.length) continue;
    lines.push(`## ${conf[0].toUpperCase()}${conf.slice(1)} confidence (${group.length})`, "");
    for (const p of group) {
      lines.push(`- [ ] **${p.entityName}**${p.route ? ` ([page](https://onco-umber.vercel.app${p.route}))` : ""} · ${p.kind} · \`${p.field}\``);
      if (p.current) lines.push(`  - current: ${p.current}`);
      lines.push(`  - proposed: ${p.proposed}`);
      lines.push(`  - evidence: ${p.evidence} ([source](${p.sourceUrl}))`);
      if (p.file) lines.push(`  - file: \`${p.file}${p.line ? `:${p.line}` : ""}\``);
    }
    lines.push("");
  }
  if (!s.proposals.length) lines.push("No proposals: the feeds and the corpus agree.", "");
  return lines.join("\n");
}

main();
