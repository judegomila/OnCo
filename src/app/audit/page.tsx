import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { runAudit, type Audit } from "../../../scripts/audit";
import { isBlocked, isGone, isUnreachable, type LinksReport } from "../../../scripts/check-links";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";

export const metadata: Metadata = pageMeta({ title: "Audit", description: "Automated staleness, contradiction, sourcing, hygiene, link and registry fact-check findings for the OnCo corpus.", path: "/audit/" });

type FactcheckReport = { generated: string; checked: { drugs: number; trials: number }; mismatches: Array<{ check: string; id: string; name: string; route: string; recorded: string; registry: string; url: string; severity: string }>; errors: string[] };
type PatchFile = { generated: string; patches: Array<{ id: string; name: string; route: string; field: string; current: string; proposed: string; reason: string; source: string }> };

const SEV: Record<string, string> = { high: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200", medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200", low: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" };
const CHECK_LABEL: Record<string, string> = {
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
const FAMILY: Record<string, "contradiction" | "sourcing" | "hygiene"> = {
  unsourced: "sourcing", "unsourced-numbers": "sourcing", "outcome-no-source": "sourcing",
  orphan: "hygiene", "duplicate-name": "hygiene", "near-duplicate-name": "hygiene", "near-duplicate-levenshtein": "hygiene", "name-collision-across-kinds": "hygiene", "shared-code": "hygiene", "spike-scalar-divergence": "hygiene",
};
const ROW_CAP = 150;

const FINDING_COLUMNS: StaticColumn[] = [
  { key: "entity", label: "Entity" },
  { key: "kind", label: "Kind", filterable: true, className: "text-muted" },
  { key: "detail", label: "Detail", className: "text-muted" },
];
const MISMATCH_COLUMNS: StaticColumn[] = [
  { key: "severity", label: "Severity", filterable: true, order: ["high", "medium", "low"] },
  { key: "check", label: "Check", filterable: true, className: "text-muted" },
  { key: "entity", label: "Entity" },
  { key: "recorded", label: "Recorded", className: "text-muted" },
  { key: "registry", label: "Registry", className: "text-muted" },
];
const PATCH_COLUMNS: StaticColumn[] = [
  { key: "entity", label: "Entity" },
  { key: "field", label: "Field", filterable: true },
  { key: "current", label: "Current", className: "text-muted" },
  { key: "proposed", label: "Proposed" },
  { key: "why", label: "Why", className: "text-muted" },
];
const BROKEN_COLUMNS: StaticColumn[] = [
  { key: "status", label: "Status", filterable: true },
  { key: "url", label: "URL", className: "text-muted break-all text-xs" },
  { key: "cited", label: "Cited by" },
  { key: "archive", label: "Archive", filterable: true, className: "text-xs" },
];
const STALE_COLUMNS: StaticColumn[] = [
  { key: "entity", label: "Entity" },
  { key: "kind", label: "Kind", filterable: true, className: "text-muted" },
  { key: "asOf", label: "Last checked", sortable: true, numeric: false, className: "text-muted" },
  { key: "days", label: "Days", sortable: true, numeric: true },
];

function readJson<T>(name: string): T | null {
  const p = join(process.cwd(), "public", name);
  return existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : null;
}

export default function AuditPage() {
  // The audit is a pure function of the corpus; compute at build so the page is never stale relative to the data.
  const audit: Audit = runAudit();
  const fc = readJson<FactcheckReport>("factcheck.json");
  const patches = readJson<PatchFile>("factcheck-patches.json");
  const links = readJson<LinksReport>("links.json");
  const byCheck = new Map<string, typeof audit.findings>();
  for (const f of audit.findings) byCheck.set(f.check, [...(byCheck.get(f.check) ?? []), f]);
  const family = (check: string) => FAMILY[check] ?? "contradiction";
  const groups = (["contradiction", "sourcing", "hygiene"] as const).map((fam) => ({ fam, checks: [...byCheck.entries()].filter(([c]) => family(c) === fam) }));
  const stale = audit.staleness.filter((s) => s.days > 60);
  // Only links the server says are gone count as broken; sites that refuse a bot (403, 429, 5xx) are live to a reader.
  const gone = links?.results.filter((r) => isGone(r) || isUnreachable(r)) ?? [];
  const blocked = links?.results.filter(isBlocked) ?? [];
  const broken = gone;
  const moved = links?.results.filter((r) => r.ok && r.domainMoved) ?? [];
  const findingRows = (list: typeof audit.findings): StaticRow[] => list.slice(0, ROW_CAP).map((f, i) => ({ id: `${f.id}-${i}`, entity: { text: f.name, href: f.route, strong: true }, kind: f.kind, detail: f.detail }));
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
  const brokenRows: StaticRow[] = broken.slice(0, ROW_CAP).map((r, i) => ({
    id: `${r.url}-${i}`,
    status: { text: r.status ? String(r.status) : "no response", chip: r.status === 0 || r.status === 404 || r.status === 410 ? SEV.high : SEV.medium },
    url: { text: r.url, href: r.url, ext: true, sub: r.error },
    cited: [...r.refs.slice(0, 3).map((x) => ({ text: x.name, href: x.route, title: x.field })), ...(r.refs.length > 3 ? [{ text: `and ${r.refs.length - 3} more`, muted: true }] : [])],
    archive: r.archive ? { text: "Wayback copy", v: "Wayback copy", href: r.archive, ext: true } : r.archiveRequested ? { text: "save requested", muted: true } : { text: "none", muted: true },
  }));
  const staleRows: StaticRow[] = audit.staleness.slice(0, 80).map((s) => ({ id: s.id, entity: { text: s.name, href: s.route, strong: true }, kind: s.kind, asOf: s.asOf, days: s.days }));

  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Audit"
        lede="Automated checks run on every build (contradictions, sourcing and hygiene) and weekly against the outside world (openFDA labels, ClinicalTrials.gov, and every cited URL). Findings are candidates for review, not verdicts; confirmed errors go to the corrections log." />
      <Container className="pb-16">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 mb-8">
          <Stat label="Entities" value={audit.total} />
          <Stat label="Findings" value={audit.findings.length} />
          <Stat label="High" value={audit.findings.filter((f) => f.severity === "high").length} tone="rose" />
          <Stat label="Medium" value={audit.findings.filter((f) => f.severity === "medium").length} tone="amber" />
          <Stat label="Older than 60 days" value={stale.length} />
          <Stat label="Registry mismatches" value={fc?.mismatches.length ?? 0} />
          <Stat label="Broken links (gone or unreachable)" value={broken.length} tone={broken.length ? "rose" : undefined} /><Stat label="Refused to the checker (live to readers)" value={blocked.length} />
        </div>

        {groups.map(({ fam, checks }) => (
          <section key={fam} className="mb-12">
            <h2 className="text-xl font-semibold mb-3">{fam === "contradiction" ? "Contradictions" : fam === "sourcing" ? "Sourcing" : "Hygiene: orphans and duplicates"}</h2>
            <p className="text-sm text-muted mb-4 max-w-3xl">
              {fam === "contradiction" && "Computed from the corpus alone: status fields that disagree with approval records or the six-region table, positive trials whose primary hazard ratio is not below 1, records last checked before their latest regulatory event, standard-of-care and roadmap rows citing withdrawn items, and future years."}
              {fam === "sourcing" && "Rule one is cite it. Records with no external source at all, records whose text carries a percentage, hazard ratio, duration or price with no link behind it, and structured trial outcomes without a source."}
              {fam === "hygiene" && "Parallel editing leaves seams: records nothing links to, the same name in two kinds, names two characters apart inside a kind, two products with one development code, and spike duplicates whose values diverge (the first copy wins silently). Each row says what a merge would look like."}
            </p>
            <div className="space-y-6">
              {checks.map(([check, list]) => (
                <details key={check} className="card" open={list.some((f) => f.severity === "high")}>
                  <summary className="cursor-pointer px-4 py-3 flex items-center gap-3"><span className={`chip ${SEV[list[0].severity]}`}>{list[0].severity}</span><span className="font-medium">{CHECK_LABEL[check] ?? check}</span><span className="text-sm text-muted">{list.length}</span></summary>
                  <div className="px-3 pb-3 pt-1"><StaticTable rows={findingRows(list)} columns={FINDING_COLUMNS} noun="findings" /></div>
                  {list.length > ROW_CAP && <div className="px-4 py-3 text-xs text-muted">Showing {ROW_CAP} of {list.length}; the rest are in <a className="underline" href="/audit.json">audit.json</a>.</div>}
                </details>
              ))}
              {checks.length === 0 && <div className="card p-6 text-sm text-muted">No findings.</div>}
            </div>
          </section>
        ))}

        <h2 className="text-xl font-semibold mt-12 mb-3">Registry fact checks</h2>
        {fc ? (
          <>
            <p className="text-sm text-muted mb-4 max-w-3xl">Generated {fc.generated.slice(0, 10)}: {fc.checked.drugs} products checked against openFDA labels, {fc.checked.trials} trials against ClinicalTrials.gov (status, phase, primary completion). {fc.errors.length > 0 && <>{fc.errors.length} lookups failed and were skipped.</>}</p>
            {fc.mismatches.length ? (
              <StaticTable rows={mismatchRows} columns={MISMATCH_COLUMNS} noun="mismatches" url />
            ) : <div className="card p-6 text-sm text-muted">No mismatches.</div>}
            {patches && patches.patches.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-8 mb-2">Proposed patches</h3>
                <p className="text-sm text-muted mb-3 max-w-3xl">Where the registry value maps unambiguously onto ours, the fact check proposes a concrete edit. Nothing is applied automatically: a maintainer applies each proposed edit by hand, which updates the record, refreshes its checked date and adds a row to the <Link className="underline" href="/corrections/">corrections log</Link>.</p>
                <StaticTable rows={patchRows} columns={PATCH_COLUMNS} noun="patches" />
              </>
            )}
          </>
        ) : <div className="card p-6 text-sm text-muted">The fact-check report is produced weekly and is not part of this build yet; it appears after the next run.</div>}

        <h2 className="text-xl font-semibold mt-12 mb-3">Broken links</h2>
        {links ? (
          <>
            <p className="text-sm text-muted mb-4 max-w-3xl">Checked {links.generated.slice(0, 10)}: {links.checked.toLocaleString("en-GB")} of {links.total.toLocaleString("en-GB")} cited URLs probed; {links.broken} did not resolve, {links.moved} redirect to a different domain, {links.archived} have a Wayback Machine copy. Replace a dead URL with the archive copy or a current source; if the fact itself changes, log it in the corrections.</p>
            {broken.length ? (
              <>
                <StaticTable rows={brokenRows} columns={BROKEN_COLUMNS} noun="links" />
                {broken.length > ROW_CAP && <div className="px-1 py-3 text-xs text-muted">Showing {ROW_CAP} of {broken.length}; the rest are in <a className="underline" href="/links.json">links.json</a>.</div>}
              </>
            ) : <div className="card p-6 text-sm text-muted">Every checked link resolved.</div>}
            {moved.length > 0 && (
              <details className="card mt-4"><summary className="cursor-pointer px-4 py-3 text-sm font-medium">{moved.length} links redirect to a different domain</summary>
                <div className="overflow-x-auto"><table className="onco"><thead><tr><th>URL</th><th>Now at</th><th>Cited by</th></tr></thead>
                  <tbody>{moved.slice(0, ROW_CAP).map((r, i) => <tr key={i}><td className="text-xs break-all text-muted">{r.url}</td><td className="text-xs break-all"><a className="underline" href={r.finalUrl} rel="noopener">{r.finalUrl}</a></td><td>{r.refs.slice(0, 2).map((x) => <div key={`${x.id}-${x.field}`}><Link href={x.route} className="hover:underline">{x.name}</Link></div>)}</td></tr>)}</tbody></table></div>
              </details>
            )}
          </>
        ) : <div className="card p-6 text-sm text-muted">The link report is produced weekly and is not part of this build yet; it appears after the next run.</div>}

        <h2 className="text-xl font-semibold mt-12 mb-3">Staleness</h2>
        <p className="text-sm text-muted mb-4 max-w-3xl">Records by last-checked date. The site does not show dates to readers; maintainers use this list to schedule re-checks. What counts as too old for each kind, and which records are past due, is defined on the <Link className="underline" href="/freshness/">freshness page</Link>.</p>
        <StaticTable rows={staleRows} columns={STALE_COLUMNS} noun="records" defaultSort={{ key: "days", dir: -1 }} />
        <p className="text-xs text-muted mt-3">Showing the 80 oldest of {audit.total}. Full data: <a className="underline" href="/audit.json">audit.json</a> · <a className="underline" href="/factcheck.json">factcheck.json</a> · {patches && <><a className="underline" href="/factcheck-patches.json">factcheck-patches.json</a> · </>}{links && <><a className="underline" href="/links.json">links.json</a> · </>}<Link className="underline" href="/freshness/">freshness</Link> · <Link className="underline" href="/history/">recent changes</Link> · <Link className="underline" href="/corrections/">corrections log</Link>.</p>
      </Container>
    </>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "rose" | "amber" }) {
  return (
    <div className={`card p-3 ${tone === "rose" ? "border-rose-200 dark:border-rose-900" : tone === "amber" ? "border-amber-200 dark:border-amber-900" : ""}`}>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}
