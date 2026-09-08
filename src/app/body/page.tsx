import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { BodyMap, type BodyCancer, type BodyTech } from "@/components/BodyMap";
import { BODY_REGIONS } from "@/data/body-regions";

export const metadata: Metadata = { title: "Body map", description: "Click a region of the body to reach the cancers that arise there and the imaging, ablation, radiation, and surgical technologies that apply there." };

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
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Body map"
        lede="An anatomical way in. Pick where the cancer is to reach its page, or flip the switch to see where each imaging, ablation, radiation, and surgical technology is used. Blood, lymph, skin, bone, and neuroendocrine cancers are system-wide and drawn as side boxes." />
      <Container className="pb-16">
        <BodyMap regions={BODY_REGIONS} cancers={cancers} technologies={technologies} />
      </Container>
    </>
  );
}
