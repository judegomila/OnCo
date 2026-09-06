import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { paths } from "@/data/paths";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, KindChip, PageHeader, StatusChip } from "@/components/ui";

export function generateStaticParams() {
  return paths.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = paths.find((x) => x.id === id);
  return p ? { title: p.title, description: p.tldr } : {};
}

export default async function PathPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = paths.find((x) => x.id === id);
  if (!p) notFound();
  const g = graph();
  const steps = p.steps.map((s) => ({ ...s, e: g.must(s.entityId) }));
  const idx = paths.findIndex((x) => x.id === id);
  const next = paths[(idx + 1) % paths.length];
  return (
    <>
      <PageHeader kicker={<><Link href="/paths/" className="kicker hover:underline">Reading paths</Link><span className="text-xs text-muted">{p.steps.length} pages · about {p.minutes} minutes</span></>} title={p.title} lede={p.tldr}
        right={<div className="text-xs text-muted max-w-xs text-right">For: {p.audience}</div>} />
      <Container className="pb-16">
        <ol className="relative border-l-2 border-border ml-3 space-y-6 max-w-3xl">
          {steps.map((s, i) => (
            <li key={s.entityId} className="ml-6">
              <span className="absolute -left-[13px] mt-1 h-6 w-6 rounded-full bg-accent text-white text-xs font-semibold flex items-center justify-center ring-4 ring-background">{i + 1}</span>
              <Link href={routeFor(s.e)} className="card block p-4 hover:shadow-md hover:-translate-y-px transition">
                <div className="flex items-center gap-2 mb-1"><KindChip kind={s.e.kind} /><StatusChip status={s.e.status} /></div>
                <div className="font-semibold">{s.e.name}</div>
                <p className="text-sm text-muted mt-1">{s.e.tldr}</p>
                <p className="text-sm mt-2"><span className="kicker">Why here</span> <span className="ml-1">{s.why}</span></p>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-10 card p-4 flex flex-wrap items-center justify-between gap-3 text-sm max-w-3xl">
          <span className="text-muted">Finished? Try another route.</span>
          <Link href={`/paths/${next.id}/`} className="underline font-medium">{next.title} →</Link>
        </div>
      </Container>
    </>
  );
}
