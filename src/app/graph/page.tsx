import type { Metadata } from "next";
import { graphData } from "@/lib/graph-export";
import { Container, PageHeader } from "@/components/ui";
import { GraphExplorer } from "@/components/GraphExplorer";

export const metadata: Metadata = { title: "Graph explorer", description: "Navigate the OnCo knowledge graph visually: cancers, targets, products, companies, trials, and more, linked." };

export default function GraphPage() {
  const data = graphData();
  return (
    <>
      <PageHeader kicker={<span className="kicker">Tools</span>} title="Graph explorer"
        lede="The whole map as a force-directed graph. Filter by kind and connectivity, or focus on one object to see its neighbourhood. Click any node to open its page." />
      <Container className="pb-16">
        <GraphExplorer data={data} />
      </Container>
    </>
  );
}
