import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { routeFor, type Kind } from "@/lib/schema";
import { Container, PageHeader } from "@/components/ui";
import { CancerPicker, type PickerCancer } from "@/components/CancerPicker";

export const metadata: Metadata = { title: "For me — pick your cancer type", description: "Select one or more cancer types and see the technologies, products, trials, pairings, and ideas relevant to you." };

export default function ForMe() {
  const g = graph();
  const data: PickerCancer[] = g.kind("cancer").map((c) => {
    const rel = g.forCancer(c.id);
    const groups: Partial<Record<Kind, Array<{ id: string; name: string; tldr: string; route: string; status?: string }>>> = {};
    for (const [k, list] of rel) groups[k] = list.map((e) => ({ id: e.id, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status }));
    return { id: c.id, name: c.name, group: c.group, tldr: c.tldr, route: routeFor(c), stateOfArt: c.stateOfArt, pipeline: c.pipeline.map((id) => { const e = g.must(id); return { id, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status }; }), groups };
  });
  return (
    <>
      <PageHeader kicker={<span className="kicker">For me</span>} title="Pick your cancer type(s)"
        lede="Choose one or more. You will see the state of the art, what is in the pipeline, and every technology, product, target, trial, pairing, and idea in OnCo that touches those cancers. Nothing you select leaves your browser. This is orientation, not medical advice." />
      <Container className="pb-16">
        <CancerPicker cancers={data} />
      </Container>
    </>
  );
}
