/**
 * The weekly re-check's report: docs/proposals/weekly-recheck-latest.md for a person, the same rows as JSON beside it
 * for an agent, and the short summary that becomes the pull request's description. Pure functions of the checkers'
 * results, so the three cannot disagree.
 */
import { type CheckKind, type CheckResult, type Finding, type Severity, sortFindings } from "./lib";

export type Report = { generated: string; results: CheckResult[] };

/** A heading for each rule. A rule with no entry is shown by its own name. */
export const TYPE_WORDS: Record<string, string> = {
  "shared-registration": "One registration carried by two records",
  "status-moved-to-closed": "Trials now completed, terminated or withdrawn on the registry",
  "results-posted": "Trials with results posted since the record was last checked",
  "historic-but-open": "Records labelled historic that the registry still calls open",
  "primary-completion-reached": "Primary completion reached since the record was last checked",
  "status-moved": "Other status changes",
  phase: "Phase differs from the registry",
  sponsor: "Lead sponsor differs from the registry",
  enrolment: "Enrolment differs from the registry",
  "primary-completion": "Primary completion date in the text differs from the registry",
  "not-returned": "Registrations the registry did not return",
  "notice-newer-than-record": "FDA approval notices newer than the newest US approval on the record",
  "notice-drug-not-held": "Recent FDA approval notices naming a drug OnCo does not hold",
  "indication-withdrawn": "Indications the FDA lists as withdrawn that OnCo does not",
  "accelerated-converted": "Accelerated approvals the FDA now lists as converted",
  "accelerated-outcome-changed": "Accelerated approvals whose outcome or date differs",
  "accelerated-row-new": "Accelerated approvals in the FDA's tables and not in OnCo's file",
  "accelerated-row-gone": "Rows in OnCo's file no longer in the FDA's tables",
  "decision-date-passed": "Decision dates that have passed with no outcome recorded",
  "status-mismatch": "EU status differs from the EMA's",
  "conditional-mismatch": "Conditional and full approval differ",
  "status-class-mismatch": "Kind of non-approval differs",
  "missing-row": "Medicines the EMA lists with no EU row here",
  "year-mismatch": "Year of first EU approval differs",
  "chmp-opinion-awaiting-decision": "CHMP opinions awaiting the Commission's decision",
  "chmp-opinion-since-check": "CHMP opinions adopted since the record was last checked",
  "label-changed": "Labels that changed since last week",
  "label-newer-than-record": "Labels newer than the record (first reading)",
  "label-not-found": "Cited labels that could not be found",
  "source-gone": "Guideline sources that are gone",
  "source-redirected": "Guideline sources that now redirect",
  "source-changed": "Guideline sources whose headers changed",
  "source-unreachable": "Guideline sources that did not answer",
  "link-gone": "Dead links (404 or 410)",
  "pdf-address-serves-a-web-page": "PDF addresses that now serve a web page",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDate = (iso: string) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
const seconds = (ms: number) => (ms < 60_000 ? `${Math.round(ms / 1000)} s` : `${Math.floor(ms / 60_000)} min ${Math.round((ms % 60_000) / 1000)} s`);
const cell = (s: string, max = 320) => (s.length > max ? `${s.slice(0, max - 1)}…` : s).replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
const count = (f: Finding[], s: Severity) => f.filter((x) => x.severity === s).length;

export function byType(findings: Finding[]): Array<[string, Finding[]]> {
  const m = new Map<string, Finding[]>();
  for (const f of sortFindings(findings)) m.set(f.type, [...(m.get(f.type) ?? []), f]);
  const rank = (rows: Finding[]) => (rows.some((r) => r.severity === "high") ? 0 : rows.some((r) => r.severity === "medium") ? 1 : 2);
  return [...m].sort((a, b) => rank(a[1]) - rank(b[1]) || b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

function summaryTable(results: CheckResult[]): string[] {
  const lines = ["| Check | Compared | Findings | High | Medium | Low | Blocked | Requests | Time |", "|---|---:|---:|---:|---:|---:|---:|---:|---:|"];
  for (const r of results) lines.push(`| ${r.label} | ${r.checked.toLocaleString("en-GB")} | ${r.findings.length.toLocaleString("en-GB")} | ${count(r.findings, "high")} | ${count(r.findings, "medium")} | ${count(r.findings, "low")} | ${r.blocked.length} | ${r.requests.toLocaleString("en-GB")} | ${seconds(r.durationMs)} |`);
  return lines;
}

/** The report as a person reads it. Each rule's table is cut at `maxRows`; the JSON beside it holds every row. */
export function reportMarkdown(report: Report, opts: { maxRows?: number } = {}): string {
  const maxRows = opts.maxRows ?? 100;
  const all = report.results.flatMap((r) => r.findings);
  const L: string[] = [
    `# Weekly re-check, ${longDate(report.generated)}`, "",
    "Written by `scripts/weekly-recheck.ts` ([what it checks and how to pause it](../AUTOMATION-WEEKLY-RECHECK.md)). No model took part: every row is a comparison of what OnCo holds with what a public source returned on the day. Dates are UTC.",
    "",
    "Nothing below has been applied to a record, except what is listed under \"Changed by the run itself\". Each row is something for a person or an agent to read against the source before the record is touched. A row says the two sides differ; it does not say which is right.",
    "",
    `${all.length.toLocaleString("en-GB")} rows: ${count(all, "high")} high, ${count(all, "medium")} medium, ${count(all, "low")} low. Every row is in [weekly-recheck-latest.json](weekly-recheck-latest.json); the tables here show the first ${maxRows} of each kind.`,
    "", "## Summary", "", ...summaryTable(report.results), "",
    "## Changed by the run itself", "",
  ];
  const mech = report.results.flatMap((r) => r.mechanical.map((m) => `- ${r.label}: ${m}`));
  L.push(...(mech.length ? mech : ["- Nothing."]), "");
  const blocked = report.results.flatMap((r) => r.blocked.map((b) => ({ ...b, label: r.label })));
  const errors = report.results.flatMap((r) => r.errors.map((e) => `- ${r.label}: ${e}`));
  if (errors.length) L.push("## Not completed", "", ...errors, "");
  report.results.forEach((r, i) => {
    L.push(`## ${i + 1}. ${r.label}`, "");
    for (const n of r.notes) L.push(n, "");
    if (!r.findings.length) L.push(r.errors.length ? "No rows: the check did not complete (see above)." : "Nothing to report.", "");
    for (const [type, rows] of byType(r.findings)) {
      L.push(`### ${TYPE_WORDS[type] ?? type} (${rows.length.toLocaleString("en-GB")})`, "", "| Record | OnCo says | The source says | Source | Date |", "|---|---|---|---|---|");
      for (const f of rows.slice(0, maxRows)) L.push(`| ${f.recordId ? `\`${f.recordId}\`` : "not held"} | ${cell(f.onco)} | ${cell(f.source)}${f.note ? ` *${cell(f.note, 200)}*` : ""} | [${cell(f.url.replace(/^https?:\/\/(www\.)?/, "").split(/[/?#]/)[0], 40)}](${f.url.replace(/\|/g, "%7C").replace(/\s/g, "%20").replace(/\)/g, "%29")}) | ${f.date ?? ""} |`);
      if (rows.length > maxRows) L.push("", `${(rows.length - maxRows).toLocaleString("en-GB")} more rows of this kind are in the JSON file.`);
      L.push("");
    }
  });
  if (blocked.length) {
    L.push("## Blocked sources", "", "These refused the request (a 401, 403 or 429, or a bot-challenge page). Nothing was done to get round a refusal, and a refusal is not counted as a dead link or a change.", "");
    const hosts = new Map<string, { n: number; label: string; reason: string; example: string }>();
    for (const b of blocked) { const h = `${b.label}|${b.url.replace(/^https?:\/\/(www\.)?/, "").split(/[/?#]/)[0]}`; const e = hosts.get(h); if (e) e.n++; else hosts.set(h, { n: 1, label: b.label, reason: b.reason, example: b.url }); }
    L.push("| Check | Host | Addresses | Reason |", "|---|---|---:|---|");
    for (const [h, e] of [...hosts].sort((a, b) => b[1].n - a[1].n).slice(0, 60)) L.push(`| ${e.label} | ${h.split("|")[1]} | ${e.n} | ${cell(e.reason)} |`);
    if (hosts.size > 60) L.push("", `${hosts.size - 60} more hosts are in the JSON file.`);
    L.push("");
  }
  return `${L.join("\n").trimEnd()}\n`;
}

/** The JSON twin: every row, grouped by check, with the counts a consumer would otherwise have to recompute. */
export function reportJson(report: Report): unknown {
  return {
    generated: report.generated,
    about: "Weekly re-check of OnCo against public sources (scripts/weekly-recheck.ts). Each finding: the record, what OnCo says, what the source says, the source URL and the source's date. Findings are not applied to records.",
    totals: { findings: report.results.reduce((n, r) => n + r.findings.length, 0), requests: report.results.reduce((n, r) => n + r.requests, 0) },
    checks: report.results.map((r) => ({
      kind: r.kind, label: r.label, checked: r.checked, requests: r.requests, durationSeconds: Math.round(r.durationMs / 1000),
      counts: Object.fromEntries(byType(r.findings).map(([t, rows]) => [t, rows.length])),
      mechanical: r.mechanical, notes: r.notes, errors: r.errors, blocked: r.blocked,
      findings: sortFindings(r.findings).map((f) => ({ type: f.type, severity: f.severity, recordId: f.recordId, recordKind: f.recordKind, onco: f.onco, source: f.source, url: f.url, date: f.date, note: f.note })),
    })),
  };
}

/** The pull request's description: counts by check and by rule, what the run changed, and what it could not do. */
export function prSummary(report: Report): string {
  const L: string[] = [`Weekly re-check of ${longDate(report.generated)}: what OnCo holds, compared with ClinicalTrials.gov, the FDA, the EMA, openFDA and DailyMed, and the addresses its records cite. No model took part.`, "", ...summaryTable(report.results), ""];
  const mech = report.results.flatMap((r) => r.mechanical.map((m) => `- ${r.label}: ${m}`));
  L.push("**Changed by the run itself** (generated data only):", "", ...(mech.length ? mech : ["- Nothing."]), "");
  L.push("**For a person or an agent to read** (reported, not applied):", "");
  for (const r of report.results) for (const [type, rows] of byType(r.findings)) L.push(`- ${TYPE_WORDS[type] ?? type}: ${rows.length.toLocaleString("en-GB")}`);
  if (!report.results.some((r) => r.findings.length)) L.push("- Nothing.");
  const errors = report.results.flatMap((r) => r.errors.map((e) => `- ${r.label}: ${e}`));
  if (errors.length) L.push("", "**Not completed:**", "", ...errors);
  const blocked = report.results.filter((r) => r.blocked.length).map((r) => `${r.label} ${r.blocked.length}`);
  if (blocked.length) L.push("", `Sources that refused the request, left alone: ${blocked.join("; ")}.`);
  L.push("", "The rows are in `docs/proposals/weekly-recheck-latest.md`, and as JSON beside it.");
  return `${L.join("\n")}\n`;
}

export const KIND_ORDER: CheckKind[] = ["trials", "us-approvals", "eu-approvals", "labels", "guidelines", "links"];
