import type { Metadata } from "next";
import Link from "next/link";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import type { HistoryIndex, RecordChange } from "../../../scripts/history";

export const metadata: Metadata = pageMeta({ title: "Recent changes", description: "What changed on which OnCo record, field by field, from the git history.", path: "/history/" });

const REPO = "https://github.com/judegomila/OnCo";
const TYPE_CLASS: Record<RecordChange["type"], string> = {
  changed: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  added: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  removed: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
};

function load(): HistoryIndex | null {
  const p = join(process.cwd(), "public", "history", "index.json");
  return existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as HistoryIndex) : null;
}

/** Strip the surrounding quotes a string field value carries in source. */
function show(v: string | undefined): string {
  if (v === undefined) return "";
  const m = /^"([\s\S]*)"$/.exec(v) ?? /^'([\s\S]*)'$/.exec(v) ?? /^`([\s\S]*)`$/.exec(v);
  return m ? m[1] : v;
}

export default function HistoryPage() {
  const index = load();
  const changes = index?.changes ?? [];
  const byDay = new Map<string, RecordChange[]>();
  for (const c of changes) byDay.set(c.date, [...(byDay.get(c.date) ?? []), c]);
  const edited = changes.filter((c) => c.type === "changed");
  const ids = new Set(changes.map((c) => c.id));

  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Recent changes, record by record"
        lede="Every record shows who last edited it. This page shows what changed: for each recent commit, the records it touched and the fields that differ, before and after. Read it to see the corpus being corrected and kept current, or to check a record you rely on." />
      <Container className="pb-16">
        {!index ? (
          <div className="card p-6 text-sm text-muted">No history yet. Run <code>npx tsx scripts/history.ts</code> in a clone with full git history.</div>
        ) : (
          <>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 mb-8">
              <Stat label="Commits scanned" value={index.commits} />
              <Stat label="Records touched" value={index.records} />
              <Stat label="Changes in this feed" value={changes.length} />
              <Stat label="Field-level edits" value={edited.length} />
            </div>
            <p className="text-sm text-muted mb-6 max-w-3xl">Newest first, {ids.size} records across {byDay.size} days. Additions list the fields the new record carries; edits show each changed field. Values are the source text, trimmed. Generated {index.generated.slice(0, 10)} from the last {index.commits} commits to <code>src/data/</code>.</p>
            <div className="space-y-8">
              {[...byDay.entries()].map(([day, list]) => {
                const byCommit = new Map<string, RecordChange[]>();
                for (const c of list) byCommit.set(c.commit, [...(byCommit.get(c.commit) ?? []), c]);
                return (
                  <section key={day}>
                    <h2 className="text-lg font-semibold mb-3 tabular-nums">{day}</h2>
                    <div className="space-y-4">
                      {[...byCommit.entries()].map(([commit, recs]) => {
                        const added = recs.filter((r) => r.type === "added");
                        const rest = recs.filter((r) => r.type !== "added");
                        return (
                          <div key={commit} className="card p-4">
                            <div className="flex flex-wrap items-baseline gap-2 text-sm mb-3">
                              <span className="font-medium">{recs[0].message}</span>
                              <span className="text-muted">{recs[0].author}</span>
                              <a className="underline text-muted font-mono text-xs" href={`${REPO}/commit/${commit}`} rel="noopener">{commit}</a>
                            </div>
                            {rest.length > 0 && (
                              <ul className="space-y-3">
                                {rest.map((r, i) => (
                                  <li key={i} id={r.id} className="scroll-mt-24">
                                    <div className="flex flex-wrap items-center gap-2 text-sm">
                                      <span className={`chip ${TYPE_CLASS[r.type]}`}>{r.type}</span>
                                      {r.route ? <Link href={r.route} className="font-medium hover:underline">{r.name ?? r.id}</Link> : <span className="font-medium">{r.id}</span>}
                                      {r.kind && <span className="text-muted">{r.kind}</span>}
                                      <a className="text-xs text-muted underline" href={`/history/${r.id}.json`}>all changes</a>
                                    </div>
                                    {r.type === "changed" && (
                                      <table className="onco mt-2"><thead><tr><th>Field</th><th>Before</th><th>After</th></tr></thead>
                                        <tbody>{r.fields.map((f) => <tr key={f.field}><td><code className="text-xs">{f.field}</code></td><td className="text-muted text-xs break-words max-w-md">{f.before === undefined ? <em>absent</em> : show(f.before)}</td><td className="text-xs break-words max-w-md">{f.after === undefined ? <em>removed</em> : show(f.after)}</td></tr>)}</tbody></table>
                                    )}
                                    {r.type === "removed" && <div className="text-xs text-muted mt-1">Fields: {r.fields.map((f) => f.field).join(", ")}</div>}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {added.length > 0 && (
                              <details className={rest.length ? "mt-3" : ""}>
                                <summary className="cursor-pointer text-sm"><span className={`chip ${TYPE_CLASS.added} mr-2`}>added</span>{added.length} new record{added.length === 1 ? "" : "s"}</summary>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {added.map((r, i) => r.route ? <Link key={i} id={r.id} href={r.route} className="chip border bg-foreground/5 hover:bg-foreground/10">{r.name ?? r.id}</Link> : <span key={i} className="chip border bg-foreground/5">{r.id}</span>)}
                                </div>
                              </details>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
            <p className="text-xs text-muted mt-8">Data: <a className="underline" href="/history/index.json">history/index.json</a>, one file per record at <code>/history/&lt;id&gt;.json</code>. See also <Link className="underline" href="/changelog/">changelog</Link>, <Link className="underline" href="/corrections/">corrections</Link>, <Link className="underline" href="/audit/">audit</Link>.</p>
          </>
        )}
      </Container>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-3">
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}
