import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { readPublicJson } from "@/lib/feed-meta";
import { INTERNATIONAL_SOURCES, SURVIVAL_SITES } from "@/data/survival-map";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { Tip } from "@/components/Tip";
import { GentleSection } from "@/components/GentleSection";
import { WhatIsBeingDone } from "@/components/WhatIsBeingDone";

export const metadata: Metadata = pageMeta({ title: "Survival statistics", description: "What moves survival (stage at diagnosis, subtype and the treatments approved since the figures were collected), then five-year relative survival by cancer and stage from the NCI SEER programme, behind a click, with the period each figure covers and the caveats that matter.", path: "/survival/" });

/** Shape written by scripts/fetch-survival.ts (public/survival/index.json). */
type StageRow = { stage: string; description?: string; casesPct?: number; survivalPct?: number };
type Site = { slug: string; label: string; url: string; overall?: { pct: number; period: string }; byStage: StageRow[]; basis?: string; newCasesPer100k?: number; deathsPer100k?: number; ratesPeriod?: string; fetched: string };
type Snapshot = { fetched: string; source: string; sourceUrl: string; note: string; sites: Record<string, Site>; failed: string[] };

const STAGES = ["Localized", "Regional", "Distant"];
const stageValue = (s: Site, stage: string) => s.byStage.find((r) => r.stage.toLowerCase().startsWith(stage.toLowerCase()))?.survivalPct;
const fmt = (n?: number) => (n === undefined ? "" : `${n.toFixed(1).replace(/\.0$/, "")}%`);

function Bar({ pct }: { pct?: number }) {
  if (pct === undefined) return <span className="text-muted">n/a</span>;
  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <span className="inline-block h-2 w-20 rounded bg-foreground/10 overflow-hidden" aria-hidden><span className="block h-full bg-accent" style={{ width: `${Math.min(100, pct)}%` }} /></span>
      {fmt(pct)}
    </span>
  );
}

export default function SurvivalPage() {
  const g = graph();
  const snap = readPublicJson<Snapshot>("survival/index.json");
  const cancers = g.kind("cancer");
  const mapped = cancers.filter((c) => SURVIVAL_SITES[c.id] && snap?.sites[SURVIVAL_SITES[c.id].slug]).sort((a, b) => a.name.localeCompare(b.name));
  const unmapped = cancers.filter((c) => !SURVIVAL_SITES[c.id] || !snap?.sites[SURVIVAL_SITES[c.id].slug]).sort((a, b) => a.name.localeCompare(b.name));
  const periods = new Set(Object.values(snap?.sites ?? {}).map((s) => s.overall?.period).filter(Boolean));
  const periodText = [...periods].join(", ");
  // Cancers where localised disease is at or near the general population's survival: the calm headline the table supports.
  const nearNormal = mapped.filter((c) => (stageValue(snap!.sites[SURVIVAL_SITES[c.id].slug], "Localized") ?? 0) >= 90).length;

  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Survival: what moves it, then the numbers"
        lede={snap ? `Survival depends first on stage at diagnosis, then on subtype and the treatment received, and it is improving for most cancers because of screening and the drugs approved since these figures were collected. The five-year figures for ${mapped.length} of ${cancers.length} cancers in OnCo, from the US National Cancer Institute's SEER programme (${periodText} diagnoses), are below behind a click: population averages for the United States, not predictions for any one person.` : "What moves survival, then five-year relative survival by cancer and stage from the NCI SEER programme. The snapshot has not been fetched yet."} />
      <Container className="pb-16 space-y-8">
        {!snap && <p className="card p-4 text-sm text-muted">Run <code>npx tsx scripts/fetch-survival.ts</code> to build the snapshot.</p>}
        {snap && (
          <>
            <section className="grid gap-4 lg:grid-cols-2">
              <div className="card p-4 sm:p-5 space-y-2 text-sm leading-relaxed">
                <div className="kicker">What the table actually shows</div>
                <p><span className="font-medium">Stage is the biggest lever.</span> For {nearNormal} of the {mapped.length} cancers below, people diagnosed with localised disease have five-year survival at or above 90%, close to people without cancer. That is why screening and early detection are on almost every cancer&apos;s state-of-the-art list.</p>
                <p><span className="font-medium">The figures lag treatment.</span> They describe people diagnosed in {periodText}. Immunotherapy, ADCs, targeted pills and radioligand therapy approved since then are not reflected, so for fast-moving cancers current survival is likely better than the number shown.</p>
                <p><span className="font-medium">Subtype matters more than site.</span> SEER groups by organ; OnCo splits breast, lung, leukaemia and lymphoma by subtype, and the same site figure is repeated with a note on which way the subtype differs. Each cancer page explains its own picture in words first.</p>
              </div>
              <WhatIsBeingDone topic="late-diagnosis" />
            </section>

            <GentleSection title="the survival table" kicker="SEER, United States" why="Five-year relative survival by cancer and by stage at diagnosis, for readers who want the numbers."
              reassurance={<>Averages across everyone diagnosed in {periodText}, before several of today&apos;s treatments existed. Your stage, subtype, age, fitness and the treatment you receive matter more than the average; ask your team how the figure for your stage and subtype has moved. Each row links to the cancer page, which leads with what can be done.</>}>
              <div className="overflow-x-auto -mx-4 px-4">
                <table className="onco">
                  <thead>
                    <tr>
                      <th>Cancer</th>
                      <th className="hidden md:table-cell">SEER site</th>
                      <th><Tip title="5-year relative survival" text="The share of people diagnosed who are alive five years later, divided by the share of the general population of the same age, sex and race alive over the same five years. 100% means no excess deaths from the cancer; it can exceed 100%."><span className="underline decoration-dotted decoration-foreground/30 underline-offset-[3px] cursor-help">5-year relative survival</span></Tip></th>
                      {STAGES.map((s) => <th key={s} className="hidden sm:table-cell"><Tip title={`${s} at diagnosis`} text={s === "Localized" ? "Confined to the organ where it started (SEER summary stage)." : s === "Regional" ? "Spread to nearby lymph nodes or tissues." : "Spread to distant organs (metastatic)."}><span className="underline decoration-dotted decoration-foreground/30 underline-offset-[3px] cursor-help">{s === "Localized" ? "Localised" : s}</span></Tip></th>)}
                      <th className="hidden lg:table-cell">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mapped.map((c) => {
                      const m = SURVIVAL_SITES[c.id];
                      const s = snap.sites[m.slug];
                      return (
                        <tr key={c.id}>
                          <td><Link href={routeFor(c)} className="font-medium hover:underline">{c.name}</Link>{m.shared && <div className="text-xs text-muted max-w-xs">{m.shared}</div>}</td>
                          <td className="hidden md:table-cell text-muted"><a href={s.url} rel="noopener" className="hover:underline">{m.seerLabel}</a></td>
                          <td><Bar pct={s.overall?.pct} /></td>
                          {STAGES.map((st) => <td key={st} className="hidden sm:table-cell tabular-nums">{s.byStage.length ? fmt(stageValue(s, st)) || <span className="text-muted">n/a</span> : <span className="text-muted" title="SEER does not stage this cancer">no staging</span>}</td>)}
                          <td className="hidden lg:table-cell text-xs text-muted">{s.overall?.period}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm space-y-2">
                <h2 className="font-semibold text-base">Read these numbers carefully</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{snap.note}</li>
                  <li>Figures describe people diagnosed in {[...periods].join(" or ")}. Treatments approved since then are not reflected; for fast-moving cancers current survival is likely better.</li>
                  <li>SEER groups by anatomical site. Where OnCo splits a site into subtypes (breast by receptor status, lung by histology, brain tumours) the same site figure is repeated and the caveat says which way the subtype differs.</li>
                  <li>Staging follows SEER summary stage (localised, regional, distant), not TNM stage groups. Blood cancers are not staged this way and show no stage columns.</li>
                  <li>Relative survival can exceed 100% when the diagnosed group has fewer deaths than the general population, as for localised breast cancer.</li>
                </ul>
                <p className="text-muted">Source: <a className="underline" href={snap.sourceUrl} rel="noopener">{snap.source}</a>, fetched {snap.fetched}. Each row links to its SEER fact sheet.</p>
              </div>
            </GentleSection>

            <section className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="card p-5 space-y-2">
                <h2 className="font-semibold text-base">Outside the United States</h2>
                <p>Survival differs between countries because of stage at diagnosis, access to treatment and registry practice. No figures are copied here from the international studies; these are the places to look:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {INTERNATIONAL_SOURCES.map((s) => <li key={s.url}><a className="underline" href={s.url} rel="noopener">{s.label}</a>: {s.note}</li>)}
                </ul>
                <p className="text-muted">Incidence by country is on <Link className="underline" href="/cases/">cases by country</Link>; where the cancer sits in the body on the <Link className="underline" href="/body/">body map</Link>.</p>
              </div>
              {unmapped.length > 0 && (
                <div className="card p-5 space-y-2">
                  <h2 className="font-semibold text-base">Cancers without a SEER fact sheet ({unmapped.length})</h2>
                  <p className="text-muted">SEER publishes stat facts for common sites only. These cancers have no comparable table here; their pages describe the outlook in words, with what is being done first, where a source exists.</p>
                  <div className="flex flex-wrap gap-1.5">{unmapped.map((c) => <Link key={c.id} href={routeFor(c)} className="chip border bg-card border-border hover:bg-foreground/5">{c.name}</Link>)}</div>
                </div>
              )}
            </section>
          </>
        )}
      </Container>
    </>
  );
}
