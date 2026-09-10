import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { guidelineMap } from "@/data/guideline-map";
import { guidelineCancerIds, versionsFor } from "@/lib/guidelines";
import { Container, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GuidelineConcordance, type ConcordanceRow } from "@/components/GuidelineConcordance";
import { CancerIcon } from "@/components/CancerIcon";
import { VersionDiff, type RefLite } from "./VersionDiff";

export function generateStaticParams() {
  return guidelineCancerIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = graph().get(id);
  return c ? pageMeta({ title: `${c.name} · Guideline history`, description: `Dated NCCN and ESMO guideline versions for ${c.name}: what was added, removed or recategorised, with a two-version diff, and where NCCN, ESMO, NICE and ASCO disagree.`, path: `/guidelines/${id}/` }) : {};
}

export default async function GuidelineCancerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = graph();
  const c = g.get(id);
  if (!c || c.kind !== "cancer" || !guidelineCancerIds().includes(id)) notFound();
  const versions = versionsFor(id);
  const refs: Record<string, RefLite> = {};
  for (const v of versions) for (const ch of v.changes) for (const rid of ch.refs) { const e = g.get(rid); if (e) refs[rid] = { id: rid, name: e.name, route: routeFor(e) }; }
  const rows: ConcordanceRow[] = guidelineMap.filter((e) => e.cancerId === id).map((e) => ({ ...e, cancerName: c.name, cancerRoute: routeFor(c), refs: e.refs.map((rid) => { const x = g.must(rid); return { id: rid, name: x.name, route: routeFor(x) }; }) }));
  const changeCount = versions.reduce((n, v) => n + v.changes.length, 0);
  const others = guidelineCancerIds().filter((x) => x !== id).map((x) => g.must(x)).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="intel"><span className="kicker">·</span><Link href="/guidelines/" className="kicker hover:underline">Guidelines</Link></GroupKicker>}
        title={`${c.name}: guideline history`}
        lede={versions.length ? `${versions.length} dated versions from ${versions[0].date.slice(0, 4)} to ${versions[versions.length - 1].date.slice(0, 4)} listing ${changeCount} changes. Pick two versions to see what changed between them; the timeline below shows every version with the event it is anchored to.` : "No version history recorded yet for this cancer; the concordance rows below compare what each body says today."}
        logo={<span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><CancerIcon cancerId={c.id} className="h-8 w-8" /></span>}
        right={<Link href={`${routeFor(c)}#care`} className="text-xs underline text-muted">Standard of care today →</Link>} />
      <Container className="pb-16">
        {versions.length > 0 && (
          <>
            <VersionDiff versions={versions} refs={refs} />
            <Section title="Timeline">
              <ol className="relative border-l-2 border-border ml-3 space-y-6 max-w-3xl">
                {versions.map((v) => (
                  <li key={v.id} className="ml-6" id={v.id}>
                    <span className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full ring-4 ring-background ${v.body === "NCCN" ? "bg-sky-500" : "bg-teal-500"}`} aria-hidden />
                    <div className="card p-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted"><span className="tabular-nums font-medium text-foreground">{v.date}</span><span className={`chip ${v.body === "NCCN" ? "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200" : "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200"}`}>{v.body}</span><a href={v.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{v.version}</a></div>
                      <p className="text-sm mt-1.5"><span className="text-muted">Anchored to:</span> {v.anchor}</p>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {v.changes.map((ch, i) => (
                          <li key={i} className="flex gap-2">
                            <span className={`chip shrink-0 text-[10px] ${ch.kind === "added" ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100" : ch.kind === "removed" ? "bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100" : "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100"}`}>{ch.kind}</span>
                            <span><span className="text-muted">{ch.setting}:</span> {ch.text}{ch.kind === "recategorised" && ch.from && ch.to && <span className="block text-xs text-muted mt-0.5"><span className="line-through">{ch.from}</span> → {ch.to}</span>}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          </>
        )}
        {rows.length > 0 && (
          <Section title="Where the bodies stand today">
            <GuidelineConcordance rows={rows} />
          </Section>
        )}
        <Section title="Other cancers">
          <div className="flex flex-wrap gap-1.5">{others.map((o) => <Link key={o.id} href={`/guidelines/${o.id}/`} className="chip border bg-card border-border hover:bg-foreground/5">{o.name}</Link>)}</div>
        </Section>
        <p className="mt-10 text-xs text-muted max-w-3xl">Each entry is anchored to a dated public event and links to the guideline body&rsquo;s page for the disease; NCCN &ldquo;Summary of changes&rdquo; pages sit behind a free login and are not reproduced. Version labels say &ldquo;update&rdquo; where the NCCN version number has not been verified. Corrections are welcome via the repository.</p>
      </Container>
    </>
  );
}
