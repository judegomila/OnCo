import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { runAudit, type Audit } from "../../../scripts/audit";

export const metadata: Metadata = pageMeta({ title: "Audit", description: "Automated staleness, contradiction, and registry fact-check findings for the OnCo corpus.", path: "/audit/" });

type FactcheckReport = { generated: string; checked: { drugs: number; trials: number }; mismatches: Array<{ check: string; id: string; name: string; route: string; recorded: string; registry: string; url: string; severity: string }>; errors: string[] };

const SEV: Record<string, string> = { high: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200", medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200", low: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" };
const CHECK_LABEL: Record<string, string> = {
  "status-vs-approvals": "Status disagrees with approvals", "text-says-approved": "Text says approved, status does not", "future-approval": "Approval year in the future", "positive-no-result": "Positive trial without a result",
  "future-year": "Year in the future", "future-year-in-text": "Mentions a future year", "soc-cites-dead": "Standard of care cites a withdrawn or negative item", "pipeline-cites-dead": "Pipeline lists a withdrawn or negative item",
  unsourced: "No external source", "regional-approval-only": "Approved only outside the US and EU", "duplicate-name": "Duplicate name", "near-duplicate-name": "Overlapping names",
  "us-approval-no-openfda-label": "US approval recorded, no openFDA label", "openfda-label-but-not-approved": "openFDA label exists, not recorded as approved", "trial-status-vs-registry": "Trial status disagrees with ClinicalTrials.gov", "nct-not-found": "NCT id not found",
};

export default function AuditPage() {
  // The audit is a pure function of the corpus; compute at build so the page is never stale relative to the data.
  const audit: Audit = runAudit();
  const fcPath = join(process.cwd(), "public", "factcheck.json");
  const fc: FactcheckReport | null = existsSync(fcPath) ? (JSON.parse(readFileSync(fcPath, "utf8")) as FactcheckReport) : null;
  const byCheck = new Map<string, typeof audit.findings>();
  for (const f of audit.findings) byCheck.set(f.check, [...(byCheck.get(f.check) ?? []), f]);
  const stale = audit.staleness.filter((s) => s.days > 60);

  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Audit: staleness, contradictions, and registry checks"
        lede="Automated checks run on every build (contradictions and staleness) and weekly against public registries (openFDA labels, ClinicalTrials.gov statuses). Findings are candidates for review, not verdicts; confirmed errors go to the corrections log." />
      <Container className="pb-16">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-8">
          <Stat label="Entities" value={audit.total} />
          <Stat label="Findings" value={audit.findings.length} />
          <Stat label="High" value={audit.findings.filter((f) => f.severity === "high").length} tone="rose" />
          <Stat label="Medium" value={audit.findings.filter((f) => f.severity === "medium").length} tone="amber" />
          <Stat label="Older than 60 days" value={stale.length} />
          <Stat label="Registry mismatches" value={fc?.mismatches.length ?? 0} />
        </div>

        <h2 className="text-xl font-semibold mb-3">Contradictions and gaps</h2>
        <p className="text-sm text-muted mb-4 max-w-3xl">Computed from the corpus alone: status fields that disagree with approval records, positive trials without results, standard-of-care rows citing withdrawn or negative items, future years, duplicate names, and records without an external source.</p>
        <div className="space-y-6">
          {[...byCheck.entries()].map(([check, list]) => (
            <details key={check} className="card" open={list.some((f) => f.severity === "high")}>
              <summary className="cursor-pointer px-4 py-3 flex items-center gap-3"><span className={`chip ${SEV[list[0].severity]}`}>{list[0].severity}</span><span className="font-medium">{CHECK_LABEL[check] ?? check}</span><span className="text-sm text-muted">{list.length}</span></summary>
              <table className="onco"><thead><tr><th>Entity</th><th>Kind</th><th>Detail</th></tr></thead>
                <tbody>{list.map((f, i) => <tr key={i}><td><Link href={f.route} className="font-medium hover:underline">{f.name}</Link></td><td className="text-muted">{f.kind}</td><td className="text-muted">{f.detail}</td></tr>)}</tbody></table>
            </details>
          ))}
          {byCheck.size === 0 && <div className="card p-6 text-sm text-muted">No findings.</div>}
        </div>

        <h2 className="text-xl font-semibold mt-12 mb-3">Registry fact checks</h2>
        {fc ? (
          <>
            <p className="text-sm text-muted mb-4 max-w-3xl">Generated {fc.generated.slice(0, 10)}: {fc.checked.drugs} products checked against openFDA labels, {fc.checked.trials} trials against ClinicalTrials.gov. {fc.errors.length > 0 && <>{fc.errors.length} lookups failed and were skipped.</>}</p>
            {fc.mismatches.length ? (
              <div className="card overflow-x-auto"><table className="onco"><thead><tr><th>Severity</th><th>Check</th><th>Entity</th><th>Recorded</th><th>Registry</th></tr></thead>
                <tbody>{fc.mismatches.map((m, i) => <tr key={i}><td><span className={`chip ${SEV[m.severity]}`}>{m.severity}</span></td><td className="text-muted">{CHECK_LABEL[m.check] ?? m.check}</td><td><Link href={m.route} className="font-medium hover:underline">{m.name}</Link></td><td className="text-muted">{m.recorded}</td><td className="text-muted"><a className="underline" href={m.url} rel="noopener">{m.registry}</a></td></tr>)}</tbody></table></div>
            ) : <div className="card p-6 text-sm text-muted">No mismatches.</div>}
          </>
        ) : <div className="card p-6 text-sm text-muted">No fact-check report yet. Run <code>npm run factcheck</code>.</div>}

        <h2 className="text-xl font-semibold mt-12 mb-3">Staleness</h2>
        <p className="text-sm text-muted mb-4 max-w-3xl">Records by last-checked date. The site does not show dates to readers; maintainers use this list to schedule re-checks. Oncology moves weekly, so anything over 60 days is due.</p>
        <div className="card overflow-x-auto"><table className="onco"><thead><tr><th>Entity</th><th>Kind</th><th>Last checked</th><th>Days</th></tr></thead>
          <tbody>{audit.staleness.slice(0, 80).map((s) => <tr key={s.id}><td><Link href={s.route} className="font-medium hover:underline">{s.name}</Link></td><td className="text-muted">{s.kind}</td><td className="tabular-nums text-muted">{s.asOf}</td><td className="tabular-nums">{s.days}</td></tr>)}</tbody></table></div>
        <p className="text-xs text-muted mt-3">Showing the 80 oldest of {audit.total}. Full data: <a className="underline" href="/audit.json">audit.json</a> · <a className="underline" href="/factcheck.json">factcheck.json</a> · <Link className="underline" href="/corrections/">corrections log</Link>.</p>
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
