import type { Metadata } from "next";
import Link from "next/link";
import { paths } from "@/data/paths";
import { graph } from "@/lib/graph";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Reading paths", description: "Curated sequences of OnCo pages: ADCs in 30 minutes, understand your TNBC diagnosis, radiopharma for investors, and more." };

export default function PathsIndex() {
  const g = graph();
  for (const p of paths) for (const s of p.steps) g.must(s.entityId);
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Guided routes through the map"
        lede="A curated order of pages for a purpose and an audience, each step with a sentence on why it is there. Follow one end to end or jump in anywhere." />
      <Container className="pb-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paths.map((p) => (
            <Link key={p.id} href={`/paths/${p.id}/`} className="card p-4 hover:shadow-md hover:-translate-y-px transition flex flex-col">
              <div className="text-xs text-muted mb-1">{p.audience}</div>
              <div className="font-semibold leading-snug">{p.title}</div>
              <p className="text-sm text-muted mt-1 flex-1">{p.tldr}</p>
              <div className="mt-3 text-xs text-muted">{p.steps.length} pages · about {p.minutes} minutes</div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
