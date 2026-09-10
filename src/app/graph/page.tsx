import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graphData } from "@/lib/graph-export";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { GraphExplorer } from "@/components/GraphExplorer";

export const metadata: Metadata = pageMeta({ title: "Graph explorer", description: "Navigate the OnCo knowledge graph visually: cancers, targets, products, companies, trials, and more, linked.", path: "/graph/" });

export default function GraphPage() {
  const data = graphData();
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Graph explorer"
        lede="Fronts on the inner ring, cancers on the outer. Pick or click any object to put it in the centre with its neighbours grouped by kind; the panel beside it explains what you are looking at and lists every link." />
      <Container className="pb-16">
        <GraphExplorer data={data} />
      </Container>
    </>
  );
}
