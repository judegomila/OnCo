import Link from "next/link";
import type { Drug } from "@/lib/schema";
import { routeFor } from "@/lib/schema";
import { MoleculeSlot } from "./MoleculeSlot";
import { ApprovalChip } from "./ApprovalChip";

/** Product card with its rotating molecule. Used wherever products are listed as a section. */
export function DrugCard({ d, compact = false }: { d: Drug; compact?: boolean }) {
  return (
    <Link href={routeFor(d)} className="card overflow-hidden hover:shadow-md hover:-translate-y-px transition flex flex-col">
      <MoleculeSlot drugId={d.id} modality={d.modality} name={d.name} className={`w-full border-0 rounded-none ${compact ? "h-20" : "h-28"}`} />
      <div className="p-3 flex-1">
        <div className="flex items-center gap-2 mb-1"><ApprovalChip drugId={d.id} status={d.status} compact /><span className="text-xs text-muted truncate">{d.modality}</span></div>
        <div className="font-medium leading-snug">{d.name}{d.brand && <span className="text-muted font-normal"> · {d.brand}</span>}</div>
        {!compact && <p className="text-sm text-muted mt-0.5 line-clamp-2">{d.tldr}</p>}
      </div>
    </Link>
  );
}

export function DrugGrid({ drugs, compact = false }: { drugs: Drug[]; compact?: boolean }) {
  if (!drugs.length) return null;
  return <div className={`grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>{drugs.map((d) => <DrugCard key={d.id} d={d} compact={compact} />)}</div>;
}
