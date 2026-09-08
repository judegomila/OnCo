import type { Entity, Kind } from "@/lib/schema";
import { KIND_META, KINDS } from "@/lib/schema";
import { ChipList } from "./ui";
import { DrugGrid } from "./DrugCard";
import type { Drug } from "@/lib/schema";

/** Grouped links to everything connected to an entity, in a fixed kind order. */
export function Neighbours({ groups, exclude = [] }: { groups: Map<Kind, Entity[]>; exclude?: Kind[] }) {
  const order = KINDS.filter((k) => !exclude.includes(k) && (groups.get(k)?.length ?? 0) > 0);
  if (!order.length) return <p className="text-sm text-muted">Nothing links here yet.</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {order.map((k) => {
        const items = groups.get(k)!;
        return (
          <section key={k} aria-label={KIND_META[k].plural} className={`card p-4 ${k === "drug" ? "sm:col-span-2" : ""}`}>
            <div className="mb-2.5 flex items-baseline justify-between gap-3">
              <h3 className="kicker">{KIND_META[k].plural}</h3>
              <span className="text-xs text-muted tabular-nums">{items.length}</span>
            </div>
            {k === "drug" ? <DrugGrid drugs={items as Drug[]} compact /> : <ChipList items={items} kind={k} />}
          </section>
        );
      })}
    </div>
  );
}
