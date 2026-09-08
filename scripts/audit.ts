/**
 * Staleness and contradiction audit. Pure function of the corpus (no network).
 * Writes public/audit.json, rendered at /audit/.
 *
 * Run: npm run audit
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { routeFor, type Entity } from "../src/lib/schema";

export type Finding = { check: string; severity: "high" | "medium" | "low"; id: string; kind: string; name: string; route: string; detail: string };
export type Audit = { generated: string; today: string; total: number; findings: Finding[]; staleness: Array<{ id: string; kind: string; name: string; route: string; asOf: string; days: number }>; summary: Record<string, number> };

const APPROVED_LIKE = new Set(["approved", "standard-of-care"]);
const DEAD = new Set(["negative", "withdrawn", "historic"]);

function daysBetween(a: string, b: Date): number {
  return Math.floor((b.getTime() - new Date(a).getTime()) / 86400000);
}

function textOf(e: Entity): string {
  const parts: string[] = [e.tldr, e.summary, ...e.notes];
  if (e.kind === "drug") parts.push(e.mechanism);
  if (e.kind === "technology") parts.push(e.principle);
  if (e.kind === "cancer") parts.push(...e.stateOfArt, ...e.openProblems, ...e.standardOfCare.map((s) => s.approach));
  if (e.kind === "trial") parts.push(e.setting, e.result ?? "");
  return parts.join(" \n ");
}

function normName(s: string): string {
  return s.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

export function runAudit(now = new Date()): Audit {
  const g = graph();
  const today = now.toISOString().slice(0, 10);
  const year = now.getFullYear();
  const findings: Finding[] = [];
  const add = (check: string, severity: Finding["severity"], e: Entity, detail: string) => findings.push({ check, severity, id: e.id, kind: e.kind, name: e.name, route: routeFor(e), detail });

  for (const e of g.entities) {
    // Drug status vs approvals.
    if (e.kind === "drug") {
      const hasApprovals = e.approvals.length > 0;
      if (APPROVED_LIKE.has(e.status ?? "") && !hasApprovals) add("status-vs-approvals", "high", e, `status "${e.status}" but no approvals recorded`);
      const majorApprovals = e.approvals.filter((a) => /^(US|EU|FDA|EMA)/i.test(a.region));
      if (majorApprovals.length && !APPROVED_LIKE.has(e.status ?? "") && e.status !== "withdrawn") add("status-vs-approvals", "medium", e, `US/EU approvals recorded (${majorApprovals.map((a) => `${a.region} ${a.year}`).join(", ")}) but status is "${e.status ?? "unset"}"`);
      else if (hasApprovals && !majorApprovals.length && !APPROVED_LIKE.has(e.status ?? "")) add("regional-approval-only", "low", e, `approved only outside US/EU (${e.approvals.map((a) => `${a.region} ${a.year}`).join(", ")}); status "${e.status ?? "unset"}" describes the global stage`);
      if (!APPROVED_LIKE.has(e.status ?? "") && e.status !== "withdrawn" && /\b(was|is|were|been) approved\b|\bFDA approved\b|\bapproval (in|for) \d{4}/i.test(e.tldr + " " + e.summary) && !/\bChina\b|\bNMPA\b|\bJapan\b|\bEU\b|\bEMA\b/i.test(e.summary))
        add("text-says-approved", "low", e, `text mentions approval but status is "${e.status ?? "unset"}"`);
      const approvalYears = e.approvals.map((a) => a.year);
      if (approvalYears.some((y) => y > year)) add("future-approval", "high", e, `approval year in the future: ${approvalYears.filter((y) => y > year).join(", ")}`);
    }
    // Trials: positive without result or outcomes.
    if (e.kind === "trial") {
      if (e.status === "positive" && !e.result && e.outcomes.length === 0) add("positive-no-result", "medium", e, "status positive but neither result text nor structured outcomes");
      if (e.yearReported && e.yearReported > year) add("future-year", "high", e, `yearReported ${e.yearReported} is in the future`);
    }
    // Any entity: years beyond the current year in text (e.g. "approved in 2027") that are not clearly forward-looking.
    const text = textOf(e);
    const futureYears = [...text.matchAll(/\b(20[2-9]\d)\b/g)].map((m) => Number(m[1])).filter((y) => y > year);
    if (futureYears.length) {
      const fwd = /expected|planned|will|projected|by 20|target|readout|pending|anticipat|due|deadline|forecast|ongoing/i.test(text);
      add("future-year-in-text", fwd ? "low" : "medium", e, `mentions ${[...new Set(futureYears)].join(", ")}${fwd ? " (looks forward-looking)" : ""}`);
    }
    // Cancers: standard-of-care rows citing dead entities.
    if (e.kind === "cancer") {
      for (const row of e.standardOfCare) for (const id of row.refs) {
        const r = g.get(id);
        if (r && (DEAD.has(r.status ?? "") || r.tags.includes("failure"))) add("soc-cites-dead", "high", e, `standard-of-care row "${row.setting}" cites ${r.name} (status ${r.status ?? "unset"})`);
      }
      for (const id of e.pipeline) {
        const r = g.get(id);
        if (r && (DEAD.has(r.status ?? "") || r.tags.includes("failure"))) add("pipeline-cites-dead", "medium", e, `pipeline lists ${r.name} (status ${r.status ?? "unset"})`);
      }
    }
    // Sourcing: no external link, no wikipedia, and no trial registry.
    if (e.links.length === 0 && !e.wikipedia && !(e.kind === "trial" && e.nct) && !(e.kind === "collection") && !(e.kind === "company") && !(e.kind === "institution"))
      add("unsourced", "low", e, "no external link or Wikipedia reference");
  }

  // Duplicates by normalised name.
  const byName = new Map<string, Entity[]>();
  for (const e of g.entities) { const k = normName(e.name); byName.set(k, [...(byName.get(k) ?? []), e]); }
  for (const [, list] of byName) if (list.length > 1) for (const e of list) add("duplicate-name", "medium", e, `same normalised name as ${list.filter((x) => x.id !== e.id).map((x) => `${x.id} (${x.kind})`).join(", ")}`);
  // Near-duplicates: one name contains the other, same kind, both > 8 chars.
  const sameKind = new Map<string, Entity[]>();
  for (const e of g.entities) sameKind.set(e.kind, [...(sameKind.get(e.kind) ?? []), e]);
  for (const list of sameKind.values()) {
    const names = list.map((e) => [e, normName(e.name)] as const);
    for (const [a, na] of names) for (const [b, nb] of names) {
      if (a.id >= b.id || na.length < 9 || nb.length < 9) continue;
      if (na !== nb && (na.includes(nb) || nb.includes(na))) add("near-duplicate-name", "low", a, `name overlaps with ${b.name} (${b.id})`);
    }
  }

  const staleness = g.entities.map((e) => ({ id: e.id, kind: e.kind, name: e.name, route: routeFor(e), asOf: e.asOf, days: daysBetween(e.asOf, now) })).sort((a, b) => b.days - a.days);
  const summary: Record<string, number> = {};
  for (const f of findings) summary[f.check] = (summary[f.check] ?? 0) + 1;
  const order = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => order[a.severity] - order[b.severity] || a.check.localeCompare(b.check) || a.name.localeCompare(b.name));
  return { generated: now.toISOString(), today, total: g.entities.length, findings, staleness, summary };
}

if (process.argv[1]?.endsWith("audit.ts")) {
  const audit = runAudit();
  const out = join(process.cwd(), "public");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "audit.json"), JSON.stringify(audit, null, 0));
  console.log(`audit: ${audit.findings.length} findings across ${audit.total} entities`);
  for (const [k, n] of Object.entries(audit.summary).sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${n}`);
}
