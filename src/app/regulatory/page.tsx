import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { RegulatoryBrowser, type RegRow } from "@/components/RegulatoryBrowser";
import { dateKey } from "@/components/RegulatoryTimeline";

export const metadata: Metadata = pageMeta({ title: "Regulatory timeline", description: "Every designation, filing, approval, complete response letter, withdrawal, and label change across products, sortable and filterable.", path: "/regulatory/" });

export default function RegulatoryPage() {
  const g = graph();
  const rows: RegRow[] = g.kind("drug").flatMap((d) => d.regulatoryEvents.map((e) => ({ id: `${d.id}-${e.date}-${e.type}`, drugId: d.id, drug: d.name, route: routeFor(d), modality: d.modality, date: e.date, key: dateKey(e.date), type: e.type, region: e.region, note: e.note, source: e.source })));
  const approvals = rows.filter((r) => r.type === "approval").length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Regulatory timeline" lede={`${rows.length} dated events across ${new Set(rows.map((r) => r.drugId)).size} products, including ${approvals} approvals, plus designations, filings, complete response letters, withdrawals, and label changes. Sort by date, filter by type or region, and click through to the product.`} />
      <Container className="pb-16"><RegulatoryBrowser rows={rows} /></Container>
    </>
  );
}
