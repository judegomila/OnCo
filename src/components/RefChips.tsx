import { graph } from "@/lib/graph";
import type { Entity } from "@/lib/schema";
import { ChipList } from "./ui";

/** Render entity ids as linked chips; unknown ids are skipped silently. */
export function RefChips({ ids, className = "" }: { ids: string[]; className?: string }) {
  const g = graph();
  const items = ids.map((id) => g.get(id)).filter((x): x is Entity => !!x);
  if (!items.length) return null;
  return <div className={className}><ChipList items={items} /></div>;
}
