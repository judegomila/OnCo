import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { runAudit, type Audit, type Finding } from "../../../scripts/audit";
import { isBlocked, isGone, isUnreachable, type LinkResult, type LinksReport } from "../../../scripts/check-links";
import type { StaticColumn, StaticRow } from "@/components/filters/StaticTable";

/**
 * The tables of /audit/: per-check findings, registry mismatches, proposed patches, broken links and staleness.
 * Built once here for the page and for scripts/build-tables.ts, so the first page in the HTML and the file behind
 * it come from the same rows. Table ids: audit-findings-<check>, audit-mismatches, audit-patches, audit-broken,
 * audit-stale.
 */
export type FactcheckReport = { generated: string; checked: { drugs: number; trials: number }; mismatches: Array<{ check: string; id: string; name: string; route: string; recorded: string; registry: string; url: string; severity: string }>; errors: string[] };
export type PatchFile = { generated: string; patches: Array<{ id: string; name: string; route: string; field: string; current: string; proposed: string; reason: string; source: string }> };

export const SEV: Record<string, string> = { high: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200", medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200", low: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" };
export const CHECK_LABEL: Record<string, string> = {
  "status-vs-approvals": "Status disagrees with approvals", "text-says-approved": "Text says approved, status does not", "future-approval": "Approval year in the future", "positive-no-result": "Positive trial without a result",
  "future-year": "Year in the future", "future-year-in-text": "Mentions a future year", "soc-cites-dead": "Standard of care cites a withdrawn or negative item", "pipeline-cites-dead": "Pipeline lists a withdrawn or negative item",
  unsourced: "No external source", "regional-approval-only": "Approved only outside the US and EU", "duplicate-name": "Duplicate name", "near-duplicate-name": "Overlapping names",
  "approvals-vs-regional": "Approvals disagree with the regional table", "positive-hr-ge-1": "Positive trial with a primary hazard ratio at or above 1", "asof-before-regulatory-event": "Last checked before the latest regulatory event",
  "spike-scalar-divergence": "Spike duplicates with different values", "roadmap-cites-withdrawn": "Roadmap step cites a withdrawn product",
  "unsourced-numbers": "Numbers in the text without a source", "outcome-no-source": "Structured outcomes without a source",
  orphan: "Orphan: nothing links here", "name-collision-across-kinds": "Same name in two kinds", "near-duplicate-levenshtein": "Near-duplicate names (two characters apart)", "shared-code": "Two products share a development code",
  "us-approval-no-openfda-label": "US approval recorded, no openFDA label", "openfda-label-but-not-approved": "openFDA label exists, not recorded as approved", "trial-status-vs-registry": "Trial status disagrees with ClinicalTrials.gov", "nct-not-found": "NCT id not found",
  "trial-phase-vs-registry": "Trial phase disagrees with ClinicalTrials.gov", "primary-completion-passed": "Primary completion date has passed",
  "nct-title-mismatch": "NCT id points at a differently named study", "enrolled-vs-registry": "Enrolment disagrees with ClinicalTrials.gov", "us-approval-before-fda-record": "US approval year earlier than Drugs@FDA", "us-first-approval-missing": "Earlier US approval missing from approvals",
  "text-vs-structured": "Number in the text disagrees with the structured field", "approved-only-live-trials": "Approved product whose linked trials are all still running",
};
export type Family = "contradiction" | "sourcing" | "hygiene";
export const FAMILY: Record<string, Family> = {
  unsourced: "sourcing", "unsourced-numbers": "sourcing", "outcome-no-source": "sourcing",
  orphan: "hygiene", "duplicate-name": "hygiene", "near-duplicate-name": "hygiene", "near-duplicate-levenshtein": "hygiene", "name-collision-across-kinds": "hygiene", "shared-code": "hygiene", "spike-scalar-divergence": "hygiene",
};
export const familyOf = (check: string): Family => FAMILY[check] ?? "contradiction";
export const ROW_CAP = 150;

export const FINDING_COLUMNS: StaticColumn[] = [
  { key: "entity", label: "Entity" },
  { key: "kind", label: "Kind", filterable: true, className: "text-muted" },
  { key: "detail", label: "Detail", className: "text-muted" },
];
export const MISMATCH_COLUMNS: StaticColumn[] = [
  { key: "severity", label: "Severity", filterable: true, order: ["high", "medium", "low"] },
  { key: "check", label: "Check", filterable: true, className: "text-muted" },
  { key: "entity", label: "Entity" },
  { key: "recorded", label: "Recorded", className: "text-muted" },
  { key: "registry", label: "Registry", className: "text-muted" },
];
export const PATCH_COLUMNS: StaticColumn[] = [
  { key: "entity", label: "Entity" },
  { key: "field", label: "Field", filterable: true },
  { key: "current", label: "Current", className: "text-muted" },
  { key: "proposed", label: "Proposed" },
  { key: "why", label: "Why", className: "text-muted" },
];
export const BROKEN_COLUMNS: StaticColumn[] = [
  { key: "status", label: "Status", filterable: true },
  { key: "url", label: "URL", className: "text-muted break-all text-xs" },
  { key: "cited", label: "Cited by" },
  { key: "archive", label: "Archive", filterable: true, className: "text-xs" },
];
export const STALE_COLUMNS: StaticColumn[] = [
  { key: "entity", label: "Entity" },
  { key: "kind", label: "Kind", filterable: true, className: "text-muted" },
  { key: "asOf", label: "Last checked", sortable: true, numeric: false, className: "text-muted" },
  { key: "days", label: "Days", sortable: true, numeric: true },
];

function readJson<T>(name: string): T | null {
  const p = join(process.cwd(), "public", name);
  return existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : null;
}

export const findingsTableId = (check: string) => `audit-findings-${check}`;
export const AUDIT_MISMATCHES_TABLE = "audit-mismatches";
export const AUDIT_PATCHES_TABLE = "audit-patches";
export const AUDIT_BROKEN_TABLE = "audit-broken";
export const AUDIT_STALE_TABLE = "audit-stale";

export type AuditTables = {
  audit: Audit; fc: FactcheckReport | null; patches: PatchFile | null; links: LinksReport | null;
  /** Findings by check, in first-seen order, each capped at ROW_CAP rows on the page. */
  byCheck: Map<string, Finding[]>;
  gone: LinkResult[]; blocked: LinkResult[]; moved: LinkResult[];
  findingRows: (check: string) => StaticRow[];
  mismatchRows: StaticRow[]; patchRows: StaticRow[]; brokenRows: StaticRow[]; staleRows: StaticRow[];
};

/** Everything the audit page lists, computed from the corpus and the weekly reports under public/. */
export function auditTables(): AuditTables {
  // The audit is a pure function of the corpus; compute at build so the page is never stale relative to the data.
  const audit = runAudit();
  const fc = readJson<FactcheckReport>("factcheck.json");
  const patches = readJson<PatchFile>("factcheck-patches.json");
  const links = readJson<LinksReport>("links.json");
  const byCheck = new Map<string, Finding[]>();
  for (const f of audit.findings) byCheck.set(f.check, [...(byCheck.get(f.check) ?? []), f]);
  // Only links the server says are gone count as broken; sites that refuse a bot (403, 429, 5xx) are live to a reader.
  const gone = links?.results.filter((r) => isGone(r) || isUnreachable(r)) ?? [];
  const blocked = links?.results.filter(isBlocked) ?? [];
  const moved = links?.results.filter((r) => r.ok && r.domainMoved) ?? [];
  const findingRows = (check: string): StaticRow[] => (byCheck.get(check) ?? []).slice(0, ROW_CAP).map((f, i) => ({ id: `${f.id}-${i}`, entity: { text: f.name, href: f.route, strong: true }, kind: f.kind, detail: f.detail }));
  const mismatchRows: StaticRow[] = (fc?.mismatches ?? []).map((m, i) => ({
    id: `${m.id}-${m.check}-${i}`,
    severity: { text: m.severity, chip: SEV[m.severity] },
    check: CHECK_LABEL[m.check] ?? m.check,
    entity: { text: m.name, href: m.route, strong: true },
    recorded: m.recorded,
    registry: { text: m.registry, href: m.url, ext: true },
  }));
  const patchRows: StaticRow[] = (patches?.patches ?? []).map((p, i) => ({
    id: `${p.id}-${p.field}-${i}`,
    entity: { text: p.name, href: p.route, strong: true },
    field: { text: p.field, mono: true },
    current: p.current,
    proposed: p.proposed,
    why: { text: p.reason, href: p.source, ext: true },
  }));
  const brokenRows: StaticRow[] = gone.slice(0, ROW_CAP).map((r, i) => ({
    id: `${r.url}-${i}`,
    status: { text: r.status ? String(r.status) : "no response", chip: r.status === 0 || r.status === 404 || r.status === 410 ? SEV.high : SEV.medium },
    url: { text: r.url, href: r.url, ext: true, sub: r.error },
    cited: [...r.refs.slice(0, 3).map((x) => ({ text: x.name, href: x.route, title: x.field })), ...(r.refs.length > 3 ? [{ text: `and ${r.refs.length - 3} more`, muted: true }] : [])],
    archive: r.archive ? { text: "Wayback copy", v: "Wayback copy", href: r.archive, ext: true } : r.archiveRequested ? { text: "save requested", muted: true } : { text: "none", muted: true },
  }));
  // The 80 oldest records; audit.staleness is already days descending, the table's default order.
  const staleRows: StaticRow[] = audit.staleness.slice(0, 80).map((s) => ({ id: s.id, entity: { text: s.name, href: s.route, strong: true }, kind: s.kind, asOf: s.asOf, days: s.days }));
  return { audit, fc, patches, links, byCheck, gone, blocked, moved, findingRows, mismatchRows, patchRows, brokenRows, staleRows };
}

/** Every audit table as id and rows, for the API writer. */
export function auditTableFiles(t = auditTables()): Array<{ id: string; rows: StaticRow[] }> {
  return [
    ...[...t.byCheck.keys()].map((check) => ({ id: findingsTableId(check), rows: t.findingRows(check) })),
    { id: AUDIT_MISMATCHES_TABLE, rows: t.mismatchRows },
    { id: AUDIT_PATCHES_TABLE, rows: t.patchRows },
    { id: AUDIT_BROKEN_TABLE, rows: t.brokenRows },
    { id: AUDIT_STALE_TABLE, rows: t.staleRows },
  ];
}
