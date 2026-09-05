import type { Entity, Kind } from "@/lib/schema";
import { KIND_META, KINDS } from "@/lib/schema";
import { ChipList } from "./ui";

/** Grouped links to everything connected to an entity, in a fixed kind order. */
export function Neighbours({ groups, exclude = [] }: { groups: Map<Kind, Entity[]>; exclude?: Kind[] }) {
  const order = KINDS.filter((k) => !exclude.includes(k) && (groups.get(k)?.length ?? 0) > 0);
  if (!order.length) return <p className="text-sm text-muted">Nothing links here yet.</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {order.map((k) => (
        <div key={k} className="card p-4">
          <div className="kicker mb-2">{KIND_META[k].plural} · {groups.get(k)!.length}</div>
          <ChipList items={groups.get(k)!} kind={k} />
        </div>
      ))}
    </div>
  );
}
