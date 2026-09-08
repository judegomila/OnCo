import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { TimelineScrubber, type TimelineData } from "@/components/TimelineScrubber";

export const metadata: Metadata = { title: "Timeline", description: "Drag a year slider and see approvals, trials, history, and roadmap eras as they stood in any year from 1940 to 2030." };

/** Parse an era like "2019-2022", "2026-2030", "2028+", "1980s-2000", "1946-2000" into [start, end]. */
function eraRange(era: string): [number, number] {
  const years = [...era.matchAll(/(\d{4})/g)].map((m) => Number(m[1]));
  if (years.length === 0) return [2026, 2030];
  const start = years[0];
  const end = era.includes("+") ? 2030 : years.length > 1 ? years[years.length - 1] : start + (era.includes("s") ? 9 : 0);
  return [start, Math.max(start, end)];
}

export default function TimelinePage() {
  const g = graph();
  const short = (s: string) => s.replace(/ \(.*\)$/, "");
  const data: TimelineData = {
    approvals: g.kind("drug").flatMap((d) => d.approvals.map((a) => ({ year: a.year, drug: d.name, route: routeFor(d), region: a.region, indication: a.indication }))).sort((a, b) => a.year - b.year),
    trials: g.kind("trial").filter((t) => t.yearReported).map((t) => ({ year: t.yearReported!, name: t.name, route: routeFor(t), status: t.status, cancers: t.cancers.map((id) => short(g.must(id).name)) })).sort((a, b) => a.year - b.year),
    history: g.kind("cancer").flatMap((c) => c.history.filter((h) => typeof h.year === "number" || /^\d{4}$/.test(String(h.year))).map((h) => ({ year: Number(h.year), cancer: short(c.name), cancerRoute: routeFor(c), title: h.title, note: h.note, refs: h.refs.map((id) => ({ name: g.must(id).name, route: routeFor(g.must(id)) })) }))).sort((a, b) => a.year - b.year),
    steps: g.kind("roadmap").flatMap((r) => r.steps.map((s) => { const [start, end] = eraRange(s.era); return { start, end, era: s.era, title: s.title, roadmap: r.name.split(":")[0], route: routeFor(r), status: s.status }; })),
    min: 1940, max: 2030,
  };
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Timeline" lede="Scrub through the years. Approvals, landmark trials, cancer history events, and roadmap eras appear as they stood in the chosen year, all derived from dated records in the corpus." />
      <Container className="pb-16">
        <TimelineScrubber data={data} />
      </Container>
    </>
  );
}
