import Link from "next/link";
import { readPublicJson } from "@/lib/feed-meta";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";

/** Shape written by scripts/fetch-fda.ts (public/fda/recent.json). */
export type FdaSnapshot = {
  fetched: string; previousFetched?: string; window: { from: string; to: string };
  sources: { oce: string; drugsfda: string };
  oce: Array<{ date: string; title: string; url: string; summary: string; drugIds: string[]; cancerIds: string[]; firstSeen: string }>;
  drugsfda: Array<{ applicationNumber: string; sponsor?: string; brand?: string; generic?: string; submissionType: string; submissionNumber: string; classCode?: string; classDescription?: string; statusDate: string; drugIds: string[]; firstSeen: string }>;
  notInCorpus: Array<{ date: string; title: string; url: string; firstSeen: string; generic?: string }>;
  errors: string[];
};

export const readFda = () => readPublicJson<FdaSnapshot>("fda/recent.json");

/** Latest FDA activity date per product, for chips in the regulatory browser. */
export function fdaActivityByDrug(snap: FdaSnapshot | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!snap) return out;
  for (const o of snap.oce) for (const id of o.drugIds) if (!out[id] || o.date > out[id]) out[id] = o.date;
  for (const d of snap.drugsfda) for (const id of d.drugIds) if (!out[id] || d.statusDate > out[id]) out[id] = d.statusDate;
  return out;
}

function newIssueUrl(n: FdaSnapshot["notInCorpus"][number]): string {
  const p = new URLSearchParams({
    template: "new-object.yml",
    title: `add: ${n.generic ?? n.title.replace(/^FDA (approves|grants [a-z ]*approval to) /i, "").slice(0, 80)}`,
    body: `FDA notice (${n.date}): ${n.title}\n\nSource: ${n.url}\n\nFound by scripts/fetch-fda.ts; not matched to any product in the corpus.`,
  });
  return `https://github.com/judegomila/OnCo/issues/new?${p.toString()}`;
}

/**
 * "New since the last snapshot" and "not yet in corpus" panels for /regulatory/, read from public/fda/recent.json
 * at build time. Renders a short note when the feed has not run.
 */
export function FdaFeed() {
  const snap = readFda();
  if (!snap) return <p className="card p-4 text-sm text-muted">The FDA approvals feed is not part of this build yet; it appears after the next weekly refresh. Approvals recorded by hand are on each product page.</p>;
  const g = graph();
  const name = (id: string) => g.get(id)?.name ?? id;
  const route = (id: string) => { const e = g.get(id); return e ? routeFor(e) : undefined; };
  const fresh = snap.oce.filter((o) => o.firstSeen === snap.fetched);
  const recent = snap.oce.slice(0, 12);
  const supplements = snap.drugsfda.filter((d) => d.submissionType === "SUPPL" && /efficacy|labeling/i.test(d.classDescription ?? "")).slice(0, 10);
  const missingEvents = snap.oce.filter((o) => o.drugIds.some((id) => { const d = g.get(id); return d?.kind === "drug" && !d.regulatoryEvents.some((e) => e.date === o.date || e.source === o.url); }));

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="card p-4">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h2 className="font-semibold">FDA oncology approvals feed</h2>
          <span className="text-xs text-muted">fetched {snap.fetched}{snap.previousFetched ? `, previous ${snap.previousFetched}` : ""}</span>
        </div>
        <p className="text-sm text-muted mb-3">{snap.oce.length} notifications from the <a className="underline" href={snap.sources.oce} rel="noopener">Oncology Center of Excellence</a> since {snap.window.from}; {fresh.length} new since the last snapshot. {missingEvents.length > 0 && <>{missingEvents.length} are not yet recorded as regulatory events on the product page.</>}</p>
        <ul className="divide-y divide-border text-sm">
          {recent.map((o) => {
            const missing = missingEvents.includes(o);
            return (
              <li key={o.url} className="py-2 grid gap-1 sm:grid-cols-[6rem_1fr]">
                <span className="font-mono text-xs text-muted">{o.date}</span>
                <span>
                  <a href={o.url} rel="noopener" className="hover:underline">{o.title.replace(/^FDA /, "")}</a>
                  {o.firstSeen === snap.fetched && <span className="chip ml-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">new</span>}
                  {missing && <span className="chip ml-1.5 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">not on product page</span>}
                  <span className="block mt-0.5 flex flex-wrap gap-1">{o.drugIds.slice(0, 4).map((id) => { const r = route(id); return r ? <Link key={id} href={`${r}#approvals`} className="chip border bg-card border-border hover:bg-foreground/5">{name(id)}</Link> : null; })}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="space-y-4">
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Not yet in the corpus</h2>
          {snap.notInCorpus.length === 0 ? <p className="text-sm text-muted">Every FDA oncology notice in the window matched a product in OnCo.</p> : (
            <ul className="space-y-2 text-sm">
              {snap.notInCorpus.map((n) => (
                <li key={n.url} className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-xs text-muted">{n.date}</span>
                  <a href={n.url} rel="noopener" className="hover:underline">{n.title.replace(/^FDA /, "")}</a>
                  <a href={newIssueUrl(n)} rel="noopener" className="text-xs underline text-muted whitespace-nowrap">Open an issue to add it</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Label and efficacy supplements (openFDA)</h2>
          <p className="text-xs text-muted mb-2">{snap.drugsfda.length} approved submissions for corpus products since {snap.window.from}, from <a className="underline" href="https://open.fda.gov/apis/drug/drugsfda/" rel="noopener">openFDA drugsfda</a>. Efficacy and labelling supplements are listed; manufacturing and REMS changes are not.</p>
          <ul className="divide-y divide-border text-sm">
            {supplements.map((d) => (
              <li key={`${d.applicationNumber}-${d.submissionNumber}`} className="py-1.5 flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-xs text-muted">{d.statusDate}</span>
                {d.drugIds.slice(0, 1).map((id) => { const r = route(id); return r ? <Link key={id} href={r} className="font-medium hover:underline">{name(id)}</Link> : <span key={id}>{d.brand}</span>; })}
                <span className="text-muted">{d.classDescription ?? d.submissionType} · {d.applicationNumber}</span>
              </li>
            ))}
            {supplements.length === 0 && <li className="py-1.5 text-muted">No efficacy or labelling supplements in the window.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}
