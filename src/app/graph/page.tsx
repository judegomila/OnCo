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
        lede="Fronts on the inner ring, cancers on the outer. Pick or click any object to put it in the centre with its neighbours grouped by kind. Click the centre to open its page." />
      <Container className="pb-16">
        <GraphExplorer data={data} />
      </Container>
    </>
  );
}
