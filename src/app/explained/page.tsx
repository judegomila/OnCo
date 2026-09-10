import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Cancer, type Trial } from "@/lib/schema";
import { Container, GroupKicker, PageHeader, StatusChip } from "@/components/ui";
import { TrialExplainer } from "@/components/TrialExplainer";
import { CancerIcon } from "@/components/CancerIcon";

export const metadata: Metadata = pageMeta({
  title: "Trials in plain words",
  description: "Every trial result in OnCo explained without statistics: how many more people out of 100 were helped, what a median means, which endpoints are surrogates, and who the result applies to.",
  path: "/explained/",
});

type Group = { cancer?: Cancer; trials: Trial[] };

export default function ExplainedPage() {
  const g = graph();
  const trials = g.kind("trial").filter((t) => t.outcomes.length);

  // Group by cancer using links in either direction; a trial that touches several cancers appears under each.
  const groups = new Map<string, Group>();
  const other: Trial[] = [];
  for (const t of trials) {
    const cancers = g.neighbours(t.id).get("cancer") ?? [];
    if (!cancers.length) { other.push(t); continue; }
    for (const c of cancers) {
      if (c.kind !== "cancer") continue;
      const grp = groups.get(c.id) ?? { cancer: c, trials: [] };
      grp.trials.push(t);
      groups.set(c.id, grp);
    }
  }
  const ordered = [...groups.values()].sort((a, b) => (a.cancer?.name ?? "").localeCompare(b.cancer?.name ?? ""));
  if (other.length) ordered.push({ trials: other });
  for (const grp of ordered) grp.trials.sort((a, b) => (b.yearReported ?? 0) - (a.yearReported ?? 0) || a.name.localeCompare(b.name));

  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Trials in plain words"
        lede="Hazard ratios and medians mean little to most readers. This page takes every trial result recorded in OnCo and says what it means for people: how many more out of 100 were helped, roughly how many need to be treated for one extra person to benefit, what a median is and is not, whether the endpoint is a surrogate or actual survival, and who the trial enrolled. The numbers come from the trial records and their sources; the words are ours." />
      <Container className="pb-16">
        <div className="text-sm text-muted mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="tabular-nums">{trials.length} trials with structured results</span>
          <span className="tabular-nums">{groups.size} cancers</span>
          <span>Jump to a cancer:</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-10">
          {ordered.map((grp) => (
            <a key={grp.cancer?.id ?? "other"} href={`#${grp.cancer ? `cancer-${grp.cancer.id}` : "cancer-other"}`} className="chip border border-border bg-card hover:bg-foreground/5">
              {grp.cancer?.name ?? "Other trials"} <span className="text-muted tabular-nums ml-1">{grp.trials.length}</span>
            </a>
          ))}
        </div>

        <div className="space-y-14">
          {ordered.map((grp) => (
            <section key={grp.cancer?.id ?? "other"} id={grp.cancer ? `cancer-${grp.cancer.id}` : "cancer-other"}>
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
                {grp.cancer && <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><CancerIcon cancerId={grp.cancer.id} className="h-6 w-6" /></span>}
                <h2 className="text-xl font-semibold">{grp.cancer ? <Link href={routeFor(grp.cancer)} className="hover:underline">{grp.cancer.name}</Link> : "Trials not yet linked to a cancer"}</h2>
                <span className="ml-auto text-sm text-muted tabular-nums">{grp.trials.length} trial{grp.trials.length === 1 ? "" : "s"}</span>
              </div>
              {/* Each trial is collapsed by default: 300-plus fully expanded explainers made the page hundreds of screens long on a phone. Fragment links (#trial-id) still open the right one. */}
              <div className="space-y-3">
                {grp.trials.map((t) => (
                  <details key={t.id} id={t.id} className="group card scroll-mt-20 open:pb-4">
                    <summary className="cursor-pointer list-none px-4 py-3 marker:content-none [&::-webkit-details-marker]:hidden">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span aria-hidden className="text-muted text-xs transition-transform group-open:rotate-90">▶</span>
                        <h3 className="text-lg font-semibold">{t.name}</h3>
                        <StatusChip status={t.status} />
                        <span className="text-xs text-muted">Phase {t.phase}{t.yearReported ? ` · reported ${t.yearReported}` : ""}</span>
                      </div>
                      <p className="text-sm text-muted mt-1 max-w-3xl line-clamp-2 group-open:line-clamp-none">{t.tldr}</p>
                    </summary>
                    <div className="px-4">
                      <p className="text-xs text-muted mb-3"><Link href={routeFor(t)} className="underline">Trial page</Link>{t.nct ? <> · <a className="underline" href={`https://clinicaltrials.gov/study/${t.nct}`} rel="noopener">{t.nct}</a></> : null}</p>
                      <TrialExplainer trial={t} />
                      <p className="text-xs text-muted mt-2"><Link href={`${routeFor(t)}#outcomes`} className="underline">Pictograms, table and sources on the trial page</Link></p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
