import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { JOURNEYS, journeyFor, journeysForCancer, layoutPhases } from "@/data/journeys";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { JourneyGantt } from "@/components/JourneyGantt";
import { ChartExport } from "@/components/ChartExport";
import { RefChips } from "@/components/RefChips";

export function generateStaticParams() { return JOURNEYS.map((j) => ({ id: j.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const j = journeyFor(id);
  if (!j) return {};
  return pageMeta({ title: `${j.title}: treatment journey`, description: j.tldr, path: `/journeys/${j.id}/` });
}

export default async function JourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const j = journeyFor(id);
  if (!j) notFound();
  const g = graph();
  const cancer = g.must(j.cancer);
  const rows = layoutPhases(j);
  const others = journeysForCancer(j.cancer).filter((x) => x.id !== j.id);
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find"><Link href="/journeys/" className="kicker hover:text-foreground">· Treatment journeys</Link></GroupKicker>} title={j.title} lede={j.tldr}
        right={<Link href={routeFor(cancer)} className="chip border bg-card border-border hover:bg-foreground/5">{cancer.name} →</Link>} />
      <Container className="pb-16">
        <div className="card p-4 overflow-x-auto">
          <ChartExport title={`${j.title}: treatment timeline`} source={j.sources[0]} filename={`journey-${j.id}`} align="start">
            <JourneyGantt journey={j} />
          </ChartExport>
        </div>
        <p className="text-xs text-muted mt-2 max-w-3xl">Typical sequence for {j.stage.toLowerCase()} disease as of {j.asOf}; durations are protocol values (cycle counts and lengths, fraction schedules, guideline follow-up intervals), not averages of real patients. Your team&apos;s plan will differ in detail.</p>

        <h2 className="text-lg font-semibold mt-10 mb-3">Phase by phase</h2>
        <ol className="space-y-3">
          {rows.map((r, i) => (
            <li key={r.phase.id} className="card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-medium">{i + 1}. {r.phase.label}</div>
                <div className="text-xs text-muted tabular-nums">{r.phase.ongoing ? `from week ${r.start}, continues for years` : `weeks ${r.start}-${r.endMax}${r.phase.parallel ? " (alongside the previous phase)" : ""}`}</div>
              </div>
              <p className="text-[15px] text-foreground/85 mt-1">{r.phase.detail}</p>
              {(r.phase.drugs?.length || r.phase.technologies?.length) ? <div className="mt-2"><RefChips ids={[...(r.phase.drugs ?? []), ...(r.phase.technologies ?? [])]} /></div> : null}
              {r.phase.source && <a href={r.phase.source} rel="noopener" className="text-xs underline text-muted mt-2 inline-block">Source</a>}
              {j.decisions.filter((d) => d.after === r.phase.id).map((d, k) => (
                <div key={k} className="mt-3 rounded-md border border-accent/40 bg-accent-soft/40 p-3">
                  <div className="text-sm font-medium">Decision: {d.question}</div>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-0.5">{d.options.map((o) => <li key={o}>{o}</li>)}</ul>
                </div>
              ))}
            </li>
          ))}
        </ol>

        <h2 className="text-lg font-semibold mt-10 mb-2">Sources</h2>
        <ul className="text-sm space-y-1">{j.sources.map((s) => <li key={s}><a href={s} rel="noopener" className="underline break-all">{s}</a></li>)}</ul>
        {others.length > 0 && <p className="text-sm text-muted mt-6">Other journeys for {cancer.name}: {others.map((o, i) => <span key={o.id}>{i > 0 && ", "}<Link href={`/journeys/${o.id}/`} className="underline">{o.stage}</Link></span>)}</p>}
      </Container>
    </>
  );
}
