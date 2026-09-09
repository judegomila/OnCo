import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { graph } from "@/lib/graph";
import { KIND_META, routeFor } from "@/lib/schema";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";

const SITE = "https://onco.cc";

export function generateStaticParams() {
  return graph().entities.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const e = graph().get(id);
  return e ? { title: `${e.name} · OnCo card`, description: e.tldr } : {};
}

export default async function EmbedCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = graph().get(id);
  if (!e) notFound();
  const href = `${SITE}${routeFor(e)}`;
  return (
    <a href={href} target="_top" rel="noopener" className="card block m-2 p-4 hover:shadow-md transition font-sans" style={{ fontFamily: "system-ui, sans-serif" }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`chip border ${KIND_COLOR[e.kind]}`}>{KIND_META[e.kind].label}</span>
        {e.status && <span className={`chip ${statusClass(e.status)}`}>{STATUS_LABEL[e.status] ?? e.status}</span>}
        <span className="ml-auto text-[11px] text-muted">OnCo</span>
      </div>
      <div className="font-semibold leading-snug">{e.name}</div>
      <p className="text-sm text-muted mt-1 line-clamp-3">{e.tldr}</p>
      <div className="text-xs underline mt-2">Open on OnCo →</div>
    </a>
  );
}
