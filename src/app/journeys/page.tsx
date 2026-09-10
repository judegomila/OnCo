import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { JOURNEYS, layoutPhases } from "@/data/journeys";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMeta({ title: "Treatment journeys", description: "What the next twelve months look like: typical treatment timelines by cancer and stage, phase by phase, with durations from the trial protocols and guidelines that set them.", path: "/journeys/" });

export default function JourneysPage() {
  const g = graph();
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Treatment journeys"
        lede="The first question after a diagnosis is usually what the next year looks like. These timelines lay out the typical sequence for a cancer at a stage: tests, treatment before and after surgery, radiotherapy, long-term tablets and follow-up, with the decision points where the plan forks. Durations come from the trial protocols and guidelines named on each page; your own plan will differ." />
      <Container className="pb-16">
        <ul className="grid gap-3 md:grid-cols-2">
          {JOURNEYS.map((j) => {
            const c = g.must(j.cancer);
            const rows = layoutPhases(j);
            const active = Math.max(...rows.filter((r) => !r.phase.ongoing).map((r) => r.endMin));
            return (
              <li key={j.id}>
                <Link href={`/journeys/${j.id}/`} className="card block p-4 hover:shadow-md transition">
                  <div className="text-xs text-muted">{c.name} · {j.stage}</div>
                  <div className="font-semibold mt-0.5">{j.title}</div>
                  <p className="text-sm text-muted mt-1.5 line-clamp-3">{j.tldr}</p>
                  <div className="text-xs text-muted mt-2">{j.phases.length} phases · about {Math.round(active / 4.345)} months of active treatment · {j.decisions.length} decision point{j.decisions.length === 1 ? "" : "s"}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}
