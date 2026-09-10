import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { BodyMap, type BodyCancer, type BodyTech } from "@/components/BodyMap";
import { SpreadPicker, type SpreadOption } from "@/components/SpreadPicker";
import { BODY_REGIONS } from "@/data/body-regions";
import { SPREAD } from "@/data/spread";
import Link from "next/link";

export const metadata: Metadata = pageMeta({ title: "Body map", description: "Click a region of the body to reach the cancers that arise there and the imaging, ablation, radiation, and surgical technologies that apply there.", path: "/body/" });

export default function BodyPage() {
  const g = graph();
  const cancers: Record<string, BodyCancer> = {};
  const technologies: Record<string, BodyTech> = {};
  for (const r of BODY_REGIONS) {
    for (const id of r.cancers) {
      const c = g.must(id); // throws at build if a region references an unknown cancer
      if (!cancers[id]) cancers[id] = { id, name: c.name, tldr: c.tldr, route: routeFor(c), products: (g.forCancer(id).get("drug") ?? []).length };
    }
    for (const id of r.technologies) {
      const t = g.must(id);
      if (!technologies[id]) technologies[id] = { id, name: t.name, tldr: t.tldr, route: routeFor(t), status: t.status };
    }
  }
  const spreadOptions: SpreadOption[] = SPREAD.map((s) => { const c = g.must(s.cancer); return { spread: s, name: c.name, route: routeFor(c) }; }).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Body map"
        lede="An anatomical way in. Pick where the cancer is to reach its page, or flip the switch to see where each imaging, ablation, radiation, and surgical technology is used. Blood, lymph, skin, bone, and neuroendocrine cancers are system-wide and drawn as side boxes." />
      <Container className="pb-16">
        <BodyMap regions={BODY_REGIONS} cancers={cancers} technologies={technologies} />
        <section id="spread" className="mt-14">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
            <h2 className="text-xl font-semibold tracking-tight">Where cancers spread</h2>
            <Link href="/atlas/spread/" className="text-sm underline text-muted">Atlas: every cancer side by side →</Link>
          </div>
          <p className="text-[15px] text-foreground/85 max-w-3xl mb-5">Where a cancer usually travels decides which scans are done at staging and in follow-up, and which new symptoms matter. Pick a cancer to see its common metastatic sites drawn on the same figure, ranked by how often they are involved.</p>
          <SpreadPicker options={spreadOptions} initial="colorectal" />
        </section>
      </Container>
    </>
  );
}
