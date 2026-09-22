import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Suspense } from "react";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { exploreSections } from "@/lib/relevance-rows";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { PowerView, type PowerCancer } from "@/components/PowerView";

export const metadata: Metadata = pageMeta({ title: "Explore", description: "Pick a cancer type, switch entity kind, and get a ranked, sortable, filterable list of products, technologies, targets, trials, and more, each linking to its page.", path: "/explore/" });

export default function Explore() {
  const g = graph();
  const cancers: PowerCancer[] = g.kind("cancer").map((c) => ({ id: c.id, name: c.name, group: c.group, route: routeFor(c) }));
  // The page carries the first rows of each kind and the per-cancer counts; the rest of a kind is one static file
  // (/api/v1/explore/<plural>.json, scripts/build-explore.ts) the view fetches on demand. See src/lib/explore-kinds.ts.
  const { first, counts } = exploreSections();
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Explore"
        lede="Choose a cancer type (or all), switch between products, technologies, targets, trials, pairings, ideas, companies, and institutions, then sort and filter. Every row links to its page. The rank is a disclosed documentation-and-evidence score, not a measure of clinical benefit." />
      <Container className="pb-16">
        <Suspense><PowerView rows={first} cancers={cancers} counts={counts} /></Suspense>
      </Container>
    </>
  );
}
