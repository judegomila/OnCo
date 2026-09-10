import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { graph } from "@/lib/graph";
import { routeFor, type Target } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { Dossier, dossierData } from "@/components/Dossier";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return graph().kind("target").map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = graph().get(id);
  if (!t || t.kind !== "target") return {};
  return pageMeta({ title: `${t.name} dossier`, description: `Everything OnCo knows about ${t.name}: biology, prevalence by cancer, mutation hotspots, products by modality and phase, trials, resistance routes, pathways, assays, preclinical models, open questions and external identifiers.`, path: `/dossiers/${t.id}/` });
}

export default async function DossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = graph().get(id);
  if (!t || t.kind !== "target") notFound();
  const target = t as Target;
  const d = dossierData(target);
  const approved = d.drugs.filter((x) => x.status === "approved").length;
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Target dossiers", href: "/dossiers/" }, { label: target.name, href: `/dossiers/${target.id}/` }]} />
      <PageHeader kicker={<GroupKicker id="map"><Link href="/dossiers/" className="kicker hover:underline">· Target dossier</Link></GroupKicker>} title={target.name}
        lede={`${target.tldr} This dossier gathers the ${d.drugs.length} product${d.drugs.length === 1 ? "" : "s"} (${approved} approved), ${d.trials.length} trial${d.trials.length === 1 ? "" : "s"}, ${d.pathways.length} pathway${d.pathways.length === 1 ? "" : "s"} and ${d.mechanisms.length} resistance route${d.mechanisms.length === 1 ? "" : "s"} in the corpus that involve it, with external identifiers so it can be joined to UniProt, ChEMBL, Open Targets and the rest of biology.`}
        right={<Link href={routeFor(target)} className="chip border bg-card border-border hover:bg-foreground/5 text-sm">Short target page →</Link>} />
      <Container className="pb-16"><Dossier target={target} /></Container>
    </>
  );
}
