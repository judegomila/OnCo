import type { Metadata } from "next";
import { Suspense } from "react";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { powerRows } from "@/lib/relevance";
import { Container, PageHeader } from "@/components/ui";
import { PowerView, type PowerCancer } from "@/components/PowerView";

export const metadata: Metadata = { title: "Explore — ranked power view", description: "Pick a cancer type, switch entity kind, and get a ranked, sortable, filterable list of products, technologies, targets, trials, and more, each linking to its page." };

export default function Explore() {
  const g = graph();
  const cancers: PowerCancer[] = g.kind("cancer").map((c) => ({ id: c.id, name: c.name, group: c.group, route: routeFor(c) }));
  const rows = powerRows();
  return (
    <>
      <PageHeader kicker={<span className="kicker">Power view</span>} title="Explore: one ranked list, any cancer, any kind"
        lede="Choose a cancer type (or all), switch between products, technologies, targets, trials, pairings, ideas, companies, and institutions, then sort and filter. Every row links to its page. The rank is a disclosed documentation-and-evidence score, not a measure of clinical benefit." />
      <Container className="pb-16">
        <Suspense><PowerView rows={rows} cancers={cancers} /></Suspense>
      </Container>
    </>
  );
}
