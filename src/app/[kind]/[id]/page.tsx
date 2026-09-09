import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { KIND_META, KINDS, type Kind } from "@/lib/schema";
import { EntityDetail } from "@/components/EntityDetail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { entityCrumbs, entityMeta } from "@/lib/seo";

const ROUTE_TO_KIND: Record<string, Kind> = Object.fromEntries(KINDS.map((k) => [KIND_META[k].route, k])) as Record<string, Kind>;

export function generateStaticParams() {
  const g = graph();
  return g.entities.map((e) => ({ kind: KIND_META[e.kind].route, id: e.id }));
}

/** "Name · Kind · OnCo", description from the TL;DR, canonical URL, social cards, index/follow. */
export async function generateMetadata({ params }: { params: Promise<{ kind: string; id: string }> }): Promise<Metadata> {
  const { kind, id } = await params;
  const e = graph().get(id);
  if (!e || KIND_META[e.kind].route !== kind) return {};
  return entityMeta(e);
}

export default async function EntityPage({ params }: { params: Promise<{ kind: string; id: string }> }) {
  const { kind, id } = await params;
  const k = ROUTE_TO_KIND[kind];
  const e = graph().get(id);
  if (!k || !e || e.kind !== k) notFound();
  return (
    <>
      <Breadcrumbs items={entityCrumbs(e)} />
      <EntityDetail e={e} />
    </>
  );
}
