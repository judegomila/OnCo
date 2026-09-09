import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { runFreshness, TRACK_META, type Freshness } from "../../../scripts/freshness";

export const metadata: Metadata = pageMeta({ title: "Freshness", description: "How old is too old for each kind of OnCo record, by review track, and which records are past their re-check date.", path: "/freshness/" });

const TRACK_CLASS: Record<string, string> = {
  clinical: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
  scientific: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200",
  regulatory: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  advocate: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200",
  editorial: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

export default function FreshnessPage() {
  // Pure function of the corpus: compute at build so the page can never be stale relative to the data.
  const f: Freshness = runFreshness();
  const shown = f.stale.slice(0, 120);
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Freshness: how old is too old"
        lede="Every record carries the date its facts were last checked. This page defines the maximum acceptable age for each kind of record, assigns it to a review track, and lists what is past due. Critical breaches fail the build once they exceed a limit, so the site cannot quietly go stale." />
      <Container className="pb-16">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8">
          <Stat label="Records under an SLA" value={f.slas.reduce((n, s) => n + s.checked, 0)} />
          <Stat label="Past due" value={f.stale.length + f.calendarStale.length} tone={f.stale.length + f.calendarStale.length ? "amber" : undefined} />
          <Stat label="Critical past due" value={f.criticalStale} tone={f.criticalStale ? "rose" : undefined} />
          <Stat label="Build limit" value={f.limit} />
          <div className={`card p-3 ${f.pass ? "border-emerald-200 dark:border-emerald-900" : "border-rose-200 dark:border-rose-900"}`}>
            <div className="text-2xl font-semibold">{f.pass ? "Pass" : "Fail"}</div>
            <div className="text-xs text-muted">CI freshness gate</div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">By review track</h2>
        <p className="text-sm text-muted mb-4 max-w-3xl">Tracks follow <a className="underline" href="https://github.com/judegomila/OnCo/blob/main/.github/REVIEWERS.md" rel="noopener">REVIEWERS.md</a>. A track&apos;s count is the number of its records whose last check is older than the track&apos;s SLA for that kind.</p>
        <div className="card overflow-x-auto mb-10">
          <table className="onco"><thead><tr><th>Track</th><th>Owns</th><th>Checked</th><th>Past due</th><th>Critical</th></tr></thead>
            <tbody>{f.tracks.map((t) => <tr key={t.track}><td><span className={`chip ${TRACK_CLASS[t.track]}`}>{t.label}</span></td><td className="text-muted">{TRACK_META[t.track].owner}</td><td className="tabular-nums">{t.checked}</td><td className="tabular-nums">{t.stale}</td><td className="tabular-nums">{t.criticalStale}</td></tr>)}</tbody></table>
        </div>

        <h2 className="text-xl font-semibold mb-3">The SLAs</h2>
        <p className="text-sm text-muted mb-4 max-w-3xl">Days since <code>asOf</code> before a record is due for a re-check. Critical SLAs cover the records where a stale fact can mislead a reader today: approved products, open trials, cancer pages and the readout calendar. Defined in <a className="underline" href="https://github.com/judegomila/OnCo/blob/main/scripts/freshness.ts" rel="noopener">scripts/freshness.ts</a>.</p>
        <div className="card overflow-x-auto mb-10">
          <table className="onco"><thead><tr><th>Records</th><th>Track</th><th>Max age (days)</th><th>Critical</th><th>Checked</th><th>Past due</th></tr></thead>
            <tbody>{f.slas.map((s) => <tr key={s.id}><td>{s.label}</td><td><span className={`chip ${TRACK_CLASS[s.track]}`}>{TRACK_META[s.track].label}</span></td><td className="tabular-nums">{s.days}</td><td>{s.critical ? "yes" : "no"}</td><td className="tabular-nums">{s.checked}</td><td className={`tabular-nums ${s.stale ? "font-semibold" : ""}`}>{s.stale}</td></tr>)}</tbody></table>
        </div>

        <h2 className="text-xl font-semibold mb-3">Past due</h2>
        {f.stale.length === 0 && f.calendarStale.length === 0 ? <div className="card p-6 text-sm text-muted">Nothing is past due as of {f.today}.</div> : (
          <>
            {f.calendarStale.length > 0 && (
              <div className="card overflow-x-auto mb-6"><table className="onco"><thead><tr><th>Calendar event</th><th>Kind</th><th>Date</th><th>Days ago</th></tr></thead>
                <tbody>{f.calendarStale.map((c, i) => <tr key={i}><td><Link href="/calendar/" className="font-medium hover:underline">{c.title}</Link></td><td className="text-muted">{c.kind}</td><td className="tabular-nums text-muted">{c.date}</td><td className="tabular-nums">{c.days}</td></tr>)}</tbody></table></div>
            )}
            {shown.length > 0 && (
              <div className="card overflow-x-auto"><table className="onco"><thead><tr><th>Entity</th><th>Kind</th><th>SLA</th><th>Last checked</th><th>Days over</th></tr></thead>
                <tbody>{shown.map((s) => <tr key={s.id}><td><Link href={s.route} className="font-medium hover:underline">{s.name}</Link>{s.critical && <span className="chip ml-2 bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200">critical</span>}</td><td className="text-muted">{s.kind}</td><td className="text-muted">{s.sla}</td><td className="tabular-nums text-muted">{s.asOf}</td><td className="tabular-nums">{s.over}</td></tr>)}</tbody></table></div>
            )}
            {f.stale.length > shown.length && <p className="text-xs text-muted mt-3">Showing the {shown.length} most overdue of {f.stale.length}.</p>}
          </>
        )}
        <p className="text-xs text-muted mt-6">Full data: <a className="underline" href="/freshness.json">freshness.json</a> · <Link className="underline" href="/audit/">audit</Link> · <Link className="underline" href="/corrections/">corrections log</Link>. Generated {f.today}.</p>
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
