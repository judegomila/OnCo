import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { SPREAD } from "@/data/spread";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { SpreadMap } from "@/components/SpreadMap";

export const metadata: Metadata = pageMeta({ title: "Atlas: where cancers spread", description: "Metastatic spread maps for each cancer: the sites it usually reaches, ranked by how often, drawn on the body map with sources.", path: "/atlas/spread/" });

export default function SpreadAtlasPage() {
  const g = graph();
  const entries = SPREAD.map((s) => ({ s, c: g.must(s.cancer) })).sort((a, b) => a.c.name.localeCompare(b.c.name));
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map"><Link href="/atlas/" className="kicker hover:text-foreground">· Atlas</Link></GroupKicker>} title="Where cancers spread"
        lede={`Metastatic patterns for ${entries.length} cancers. Where a cancer goes decides which scans are done at staging and follow-up, and which symptoms to take seriously. Arrow weight follows how often a site is involved across autopsy and registry series; the sources are listed under each map.`} />
      <Container className="pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {entries.map(({ s, c }) => (
            <article key={s.cancer} id={s.cancer} className="card overflow-hidden">
              <div className="p-3 border-b border-border flex items-baseline justify-between gap-2">
                <Link href={routeFor(c)} className="font-medium hover:underline">{c.name}</Link>
                <span className="text-xs text-muted">{s.sites.length} sites</span>
              </div>
              <div className="px-6 pt-2"><SpreadMap spread={s} cancerName={c.name} compact /></div>
              <ol className="p-3 text-sm space-y-1">
                {s.sites.map((x) => <li key={x.region} className="flex items-baseline justify-between gap-2"><span>{x.site}</span><span className="text-xs text-muted whitespace-nowrap">{x.tier}</span></li>)}
              </ol>
              {s.sites.some((x) => x.pct || x.note) && <ul className="px-3 pb-2 text-xs text-muted space-y-1">{s.sites.filter((x) => x.pct || x.note).map((x) => <li key={x.region}><span className="font-medium text-foreground/80">{x.site}:</span> {[x.pct, x.note].filter(Boolean).join(". ")}</li>)}</ul>}
              <div className="px-3 pb-3 text-[11px] text-muted">Sources: {s.sources.map((u, i) => <a key={u} href={u} rel="noopener" className="underline mr-1.5">{i + 1}</a>)}</div>
            </article>
          ))}
        </div>
        <p className="text-xs text-muted mt-8 max-w-3xl">Tiers summarise several series (Disibio and French 2008 autopsy study; Budczies et al. 2015; Riihimäki et al. 2014-2018 Swedish registry studies; Coleman 2006 for bone). Frequencies differ between series taken at diagnosis and at autopsy, so only figures stated in a source are quoted as numbers.</p>
      </Container>
    </>
  );
}
