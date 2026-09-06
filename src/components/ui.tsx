import Link from "next/link";
import type { Entity, Kind } from "@/lib/schema";
import { KIND_META, routeFor } from "@/lib/schema";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";

export function KindChip({ kind }: { kind: Kind }) {
  return <span className={`chip border ${KIND_COLOR[kind]}`}>{KIND_META[kind].label}</span>;
}

export function StatusChip({ status }: { status?: string }) {
  if (!status) return null;
  return <span className={`chip ${statusClass(status)}`}>{STATUS_LABEL[status] ?? status}</span>;
}

export function EntityLink({ e, className = "" }: { e: Entity; className?: string }) {
  return (
    <Link href={routeFor(e)} className={`underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground ${className}`}>
      {e.name}
    </Link>
  );
}

export function EntityCard({ e, compact = false }: { e: Entity; compact?: boolean }) {
  return (
    <Link href={routeFor(e)} className="card block p-4 hover:shadow-md hover:-translate-y-px transition">
      <div className="flex items-center gap-2 mb-1.5">
        <KindChip kind={e.kind} />
        <StatusChip status={e.status} />
      </div>
      <div className="font-semibold leading-snug">{e.name}</div>
      {!compact && <p className="text-sm text-muted mt-1 line-clamp-3">{e.tldr}</p>}
    </Link>
  );
}

export function ChipList({ items, kind }: { items: Entity[]; kind?: Kind }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((e) => (
        <Link key={e.id} href={routeFor(e)} className={`chip border hover:brightness-95 ${KIND_COLOR[kind ?? e.kind]}`}>
          {e.name}
        </Link>
      ))}
    </div>
  );
}

export function PageHeader({ kicker, title, lede, right, logo }: { kicker?: React.ReactNode; title: string; lede?: string; right?: React.ReactNode; logo?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-6">
      {kicker && <div className="mb-2 flex items-center gap-2">{kicker}</div>}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4 max-w-3xl">
          {logo}
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
        </div>
        {right}
      </div>
      {lede && <p className="mt-3 text-lg text-foreground/85 max-w-3xl leading-relaxed">{lede}</p>}
    </div>
  );
}

export function Section({ title, children, id, aside }: { title: string; children: React.ReactNode; id?: string; aside?: React.ReactNode }) {
  return (
    <section id={id} className="mt-10">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[15px] leading-relaxed">
      {items.map((s, i) => <li key={i}>{s}</li>)}
    </ul>
  );
}
