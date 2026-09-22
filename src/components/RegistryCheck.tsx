import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { entryFor, type RoadmapWatchReport } from "@/lib/roadmap-watch";
import report from "../../public/roadmap-watch.json";

/**
 * The latest run of scripts/roadmap-watch.ts for one roadmap: when it ran, how many referenced trials it checked
 * against ClinicalTrials.gov, and any contradictions in plain words. Reads the committed public/roadmap-watch.json
 * (refreshed weekly by .github/workflows/roadmap-watch.yml); renders nothing when the file has no entry for the
 * roadmap or the entry checked no trials.
 */
export function RegistryCheck({ roadmapId }: { roadmapId: string }) {
  const entry = entryFor(report as unknown as RoadmapWatchReport, roadmapId);
  if (!entry || (entry.counts.checked === 0 && entry.counts.watch === 0)) return null;
  const g = graph();
  const { counts } = entry;
  const explained = entry.explained ?? [];
  const date = (report as unknown as RoadmapWatchReport).generatedAt;
  const n = (k: number, one: string, many = `${one}s`) => `${k} ${k === 1 ? one : many}`;
  return (
    <aside className="mt-4 text-sm text-muted max-w-3xl" aria-labelledby={`${roadmapId}-registry-check`}>
      <p>
        <span id={`${roadmapId}-registry-check`} className="kicker">Registry check</span>{" "}
        <span className="font-mono text-xs tabular-nums">{date}</span>: {n(counts.checked, "trial")} of {counts.trials} checked against ClinicalTrials.gov
        {counts.watch > 0 && <>, {n(counts.watchPassed, "watch item")} past {counts.watchPassed === 1 ? "its" : "their"} expected date</>}
        {counts.papers > 0 && <>, {n(counts.papers, "new paper")} since {entry.since}</>}
        {explained.length > 0 && <>, {n(explained.length, "explained enrolment gap")}</>}
        {counts.contradictions === 0 ? <>, no contradictions.</> : <>, {n(counts.contradictions, "contradiction")}:</>}
        {" "}<a href="/roadmap-watch.json" className="underline decoration-foreground/25 underline-offset-[3px] hover:decoration-foreground text-xs">full report</a>
      </p>
      {counts.contradictions > 0 && (
        <ul className="mt-1.5 space-y-1 list-disc ps-5">
          {entry.contradictions.map((c, i) => {
            const e = g.get(c.ref);
            return (
              <li key={i}>
                {e ? <Link href={routeFor(e)} className="text-foreground underline decoration-foreground/25 underline-offset-[3px] hover:decoration-foreground">{c.name}</Link> : <span className="text-foreground">{c.name}</span>}: {c.text}
              </li>
            );
          })}
        </ul>
      )}
      {explained.length > 0 && (
        <details className="mt-1.5">
          <summary className="cursor-pointer text-xs">Explained enrolment gaps: the corpus counts the population in the primary paper, the registry counts everyone enrolled</summary>
          <ul className="mt-1.5 space-y-1 list-disc ps-5 text-xs">
            {explained.map((c, i) => {
              const e = g.get(c.ref);
              return (
                <li key={i}>
                  {e ? <Link href={routeFor(e)} className="text-foreground underline decoration-foreground/25 underline-offset-[3px] hover:decoration-foreground">{c.name}</Link> : <span className="text-foreground">{c.name}</span>}: {c.text}
                </li>
              );
            })}
          </ul>
        </details>
      )}
    </aside>
  );
}
