import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Trial } from "@/lib/schema";
import { explainedGroups } from "@/lib/explained-data";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { ExplainedSection, type ExplainedRow } from "@/components/ExplainedSection";
import { CancerIcon } from "@/components/CancerIcon";

export const metadata: Metadata = pageMeta({
  title: "Trials in plain words",
  description: "Every trial result in OnCo explained without statistics: how many more people out of 100 were helped, what a median means, which endpoints are surrogates, and who the result applies to.",
  path: "/explained/",
});

/** One trial as the section component renders it: heading, status, phase and year, one-line summary and registry id. */
const row = (t: Trial): ExplainedRow => ({ id: t.id, name: t.name, status: t.status, phase: t.phase, year: t.yearReported, tldr: t.tldr, nct: t.nct ?? undefined });

export default function ExplainedPage() {
  const g = graph();
  // Sections and their trials come from src/lib/explained-data.ts, which also shapes the per-section files
  // (/api/v1/explained/<id>.json) holding the explainer bodies that ExplainedSection fetches on demand.
  const ordered = explainedGroups(g);
  const trialCount = new Set(ordered.flatMap((grp) => grp.trials.map((t) => t.id))).size;
  const cancerCount = ordered.filter((grp) => grp.cancer).length;
  // A trial that touches several cancers has its full row once, in the first section (alphabetical) it appears in; the
  // later sections list it as a pill that opens that row. Every trial name, summary and page link is in the HTML once.
  const firstIn = new Map<string, string>();
  for (const grp of ordered) for (const t of grp.trials) if (!firstIn.has(t.id)) firstIn.set(t.id, grp.cancer?.name ?? "Other trials");

  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Trials in plain words"
        lede="Hazard ratios and medians mean little to most readers. This page takes every trial result recorded in OnCo and says what it means for people: how many more out of 100 were helped, roughly how many need to be treated for one extra person to benefit, what a median is and is not, whether the endpoint is a surrogate or actual survival, and who the trial enrolled. The numbers come from the trial records and their sources; the words are ours." />
      <Container className="pb-16">
        {/* The speech-bubble glyph every Open explanation pill reuses through <use>. */}
        <svg className="hidden" aria-hidden><symbol id="explained-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></symbol></svg>
        <div className="text-sm text-muted mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="tabular-nums">{trialCount} trials with structured results</span>
          <span className="tabular-nums">{cancerCount} cancers</span>
          <span>Jump to a cancer:</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-10">
          {ordered.map((grp) => (
            <a key={grp.key} href={`#cancer-${grp.key}`} className="chip border border-border bg-card hover:bg-foreground/5">
              {grp.cancer?.name ?? "Other trials"} <span className="text-muted tabular-nums ml-1">{grp.trials.length}</span>
            </a>
          ))}
        </div>

        <div className="space-y-14">
          {ordered.map((grp) => {
            const here = grp.cancer?.name ?? "Other trials";
            const own = grp.trials.filter((t) => firstIn.get(t.id) === here);
            const elsewhere = grp.trials.filter((t) => firstIn.get(t.id) !== here);
            return (
              <section key={grp.key} id={`cancer-${grp.key}`}>
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
                  {grp.cancer && <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><CancerIcon cancerId={grp.cancer.id} className="h-6 w-6" /></span>}
                  <h2 className="text-xl font-semibold">{grp.cancer ? <Link href={routeFor(grp.cancer)} className="hover:underline">{grp.cancer.name}</Link> : "Trials not yet linked to a cancer"}</h2>
                  <span className="ml-auto text-sm text-muted tabular-nums">{grp.trials.length} trial{grp.trials.length === 1 ? "" : "s"}</span>
                </div>
                {/* Rows are collapsed by default; the explainer is fetched when a row is opened (or prefetched as the section scrolls near). */}
                <ExplainedSection section={grp.key} rows={own.map(row)} refs={elsewhere.map((t) => ({ id: t.id, name: t.name, under: firstIn.get(t.id)! }))} />
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
