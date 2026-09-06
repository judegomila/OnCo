import type { Metadata } from "next";
import { Suspense } from "react";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, PageHeader } from "@/components/ui";
import { CompareView, type CompareItem } from "@/components/CompareView";

export const metadata: Metadata = { title: "Compare", description: "Side-by-side comparison of two products or technologies." };

export default function ComparePage() {
  const g = graph();
  const names = (ids: string[]) => ids.map((id) => g.must(id).name).join(", ") || "—";
  const items: CompareItem[] = [
    ...g.kind("drug").map((d): CompareItem => ({
      id: d.id, kind: "drug", name: d.name, route: routeFor(d), status: d.status, tldr: d.tldr,
      fields: [
        ["Brand / code", [d.brand, d.code].filter(Boolean).join(" · ") || "—"],
        ["Modality", d.modality],
        ["Mechanism", d.mechanism],
        ["Payload", d.payload ?? "—"],
        ["Linker", d.linker ?? "—"],
        ["Targets", names(d.targets)],
        ["Cancers", names(d.cancers)],
        ["Companies", names(d.companies)],
        ["Approvals", d.approvals.length ? d.approvals.map((a) => `${a.region} ${a.year}: ${a.indication}`).join(" · ") : "—"],
        ["Key trials", names(d.trials)],
      ],
    })),
    ...g.kind("technology").map((t): CompareItem => ({
      id: t.id, kind: "technology", name: t.name, route: routeFor(t), status: t.status, tldr: t.tldr,
      fields: [
        ["Principle", t.principle],
        ["Generation", t.generation ?? "—"],
        ["Since", t.since !== undefined ? String(t.since) : "—"],
        ["Strengths", t.strengths.join(" · ") || "—"],
        ["Limitations", t.limitations.join(" · ") || "—"],
        ["Fronts", names(t.sections)],
        ["Targets", names(t.targets)],
        ["Cancers", names(t.cancers)],
        ["Companies", names(t.companies)],
      ],
    })),
  ].sort((x, y) => x.name.localeCompare(y.name));
  return (
    <>
      <PageHeader kicker={<span className="kicker">Tools</span>} title="Compare" lede="Two products or two technologies side by side, same fields, differences highlighted. Shareable via the URL." />
      <Container className="pb-16">
        <Suspense><CompareView items={items} /></Suspense>
      </Container>
    </>
  );
}
