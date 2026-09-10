import Link from "next/link";
import type { Entity, Kind } from "@/lib/schema";
import { KIND_META, KINDS } from "@/lib/schema";
import { KindName } from "./T";
import type { SimilarLink } from "@/lib/similar";
import { KIND_COLOR } from "@/lib/text";
import { ChipList } from "./ui";
import { DrugGrid } from "./DrugCard";
import type { Drug } from "@/lib/schema";

/**
 * Grouped links to everything connected to an entity, in a fixed kind order. When `similar` is given
 * (from similarLinks() in src/lib/similar.ts) a "Pages like this" strip leads: records that are not
 * directly linked but share many of the same links, each with the shared links that explain the match.
 */
export function Neighbours({ groups, exclude = [], similar }: { groups: Map<Kind, Entity[]>; exclude?: Kind[]; similar?: SimilarLink[] }) {
  const order = KINDS.filter((k) => !exclude.includes(k) && (groups.get(k)?.length ?? 0) > 0);
  if (!order.length && !similar?.length) return <p className="text-sm text-muted">Nothing links here yet.</p>;
  return (
    <div className="space-y-4">
      {similar && similar.length > 0 && <SimilarStrip items={similar} />}
      {order.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {order.map((k) => {
            const items = groups.get(k)!;
            return (
              <section key={k} aria-label={KIND_META[k].plural} className={`card p-4 ${k === "drug" ? "sm:col-span-2" : ""}`}>
                <div className="mb-2.5 flex items-baseline justify-between gap-3">
                  <h3 className="kicker"><KindName kind={k} form="plural" fallback={KIND_META[k].plural} /></h3>
                  <span className="text-xs text-muted tabular-nums">{items.length}</span>
                </div>
                {k === "drug" ? <DrugGrid drugs={items as Drug[]} compact /> : <ChipList items={items} kind={k} />}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** "Pages like this": not linked directly, but sharing links. Each card names what is shared. */
export function SimilarStrip({ items }: { items: SimilarLink[] }) {
  return (
    <section aria-label="Pages like this" className="card p-4">
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <h3 className="kicker">Pages like this</h3>
        <span className="text-xs text-muted">not linked directly; found by shared links</span>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <li key={s.id} className="rounded-lg border border-border p-2.5 text-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`chip border ${KIND_COLOR[s.kind]}`}><KindName kind={s.kind} form="label" fallback={KIND_META[s.kind].label} /></span>
            </div>
            <Link href={s.route} className="font-medium leading-snug hover:underline">{s.name}</Link>
            <p className="text-xs text-muted mt-1 leading-snug">
              Shares {s.shared.map((x, i) => <span key={x.id}>{i > 0 && ", "}<Link href={x.route} className="underline decoration-foreground/20 hover:decoration-foreground">{x.name}</Link></span>)}
              {s.sharedTags.length > 0 && <span>{s.shared.length ? " and " : ""}the tag{s.sharedTags.length > 1 ? "s" : ""} {s.sharedTags.join(", ")}</span>}.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
