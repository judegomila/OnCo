import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { KIND_META, KINDS, type Kind } from "@/lib/schema";
import { EntityDetail } from "@/components/EntityDetail";

const ROUTE_TO_KIND: Record<string, Kind> = Object.fromEntries(KINDS.map((k) => [KIND_META[k].route, k])) as Record<string, Kind>;

export function generateStaticParams() {
  const g = graph();
  return g.entities.map((e) => ({ kind: KIND_META[e.kind].route, id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string; id: string }> }): Promise<Metadata> {
  const { kind, id } = await params;
  const e = graph().get(id);
  if (!e || KIND_META[e.kind].route !== kind) return {};
  return { title: e.name, description: e.tldr };
}

export default async function EntityPage({ params }: { params: Promise<{ kind: string; id: string }> }) {
  const { kind, id } = await params;
  const k = ROUTE_TO_KIND[kind];
  const e = graph().get(id);
  if (!k || !e || e.kind !== k) notFound();
  return <EntityDetail e={e} />;
}
