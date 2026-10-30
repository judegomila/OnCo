import Link from "next/link";
import { IntentLink } from "./IntentLink";
import type { Kind } from "@/lib/kinds";
import type { Entity } from "@/lib/schema";
import { KIND_META, KINDS } from "@/lib/kinds";
import { KindName, ProductClassName } from "./T";
import { PRODUCT_CLASSES, PRODUCT_CLASS_META, productClass, type ProductClass } from "@/lib/product-class";
import type { SimilarLink } from "@/lib/similar";
import { ChipList, KindChip } from "./ui";
import { DrugGrid } from "./DrugCard";
import type { Drug } from "@/lib/schema";

/**
 * Grouped links to everything connected to an entity, in a fixed kind order. When `similar` is given
 * (from similarLinks() in src/lib/similar.ts) a "Similar pages" strip leads: records that are not
 * directly linked but share many of the same links, each with the shared links that explain the match.
 */
export function Neighbours({ groups, exclude = [], similar, max, moreHref }: { groups: Map<Kind, Entity[]>; exclude?: Kind[]; similar?: SimilarLink[];
  /** Cap per group; the rest becomes an "and N more" chip linking to `moreHref(kind)` or the kind's index (see ChipList). */
  max?: number; moreHref?: (k: Kind) => string | undefined }) {
  const order = KINDS.filter((k) => !exclude.includes(k) && (groups.get(k)?.length ?? 0) > 0);
  if (!order.length && !similar?.length) return <p className="text-sm text-muted">Nothing links here yet.</p>;
  return (
    <div className="space-y-4">
      {similar && similar.length > 0 && <SimilarStrip items={similar} />}
      {order.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 min-w-0">
          {order.flatMap((k) => {
            const items = groups.get(k)!;
            if (k === "drug") return productGroups(items as Drug[]).map(({ cls, drugs }) => (
              <section key={`drug-${cls}`} aria-label={PRODUCT_CLASS_META[cls].group} className="card p-4 min-w-0 sm:col-span-2" data-product-class={cls}>
                {/* Products split by what they are: a blood test sat under "Drugs" on the page pairing it with
                    adjuvant treatment until the owner caught it, 30 October 2026 (src/lib/product-class.ts). */}
                <h3 className="kicker mb-2.5">{cls === "medicine" ? <KindName kind="drug" form="plural" fallback={KIND_META.drug.plural} /> : <ProductClassName cls={cls} form="group" />}</h3>
                <DrugGrid drugs={max && drugs.length > max ? drugs.slice(0, max) : drugs} compact />{max && drugs.length > max && <p className="mt-2 text-sm"><Link href={moreHref?.(k) ?? `/${KIND_META[k].route}/`} className="underline" data-more>and {drugs.length - max} more →</Link></p>}
              </section>
            ));
            return [(
              <section key={k} aria-label={KIND_META[k].plural} className="card p-4 min-w-0">
                {/* No count beside the heading: the rows are right there, and where the list is capped the
                    "and N more" link below already says how many are not shown. Owner, 2 October 2026. */}
                <h3 className="kicker mb-2.5"><KindName kind={k} form="plural" fallback={KIND_META[k].plural} /></h3>
                <ChipList items={items} kind={k} max={max} moreHref={moreHref?.(k)} />
              </section>
            )];
          })}
        </div>
      )}
    </div>
  );
}

/** Linked products in the order medicines, tests, imaging agents, devices; only the classes that have any. */
export function productGroups(drugs: Drug[]): { cls: ProductClass; drugs: Drug[] }[] {
  const by = new Map<ProductClass, Drug[]>();
  for (const d of drugs) { const c = productClass(d); by.set(c, [...(by.get(c) ?? []), d]); }
  return PRODUCT_CLASSES.filter((c) => by.has(c)).map((cls) => ({ cls, drugs: by.get(cls)! }));
}

/** "Similar pages": not linked directly, but sharing links. Each card names what is shared. */
export function SimilarStrip({ items }: { items: SimilarLink[] }) {
  return (
    <section aria-label="Similar pages" className="card p-4 min-w-0">
      {/* The caption "not linked directly; found by shared links" came off on 2 October 2026: every card below
          already begins "Shares ...", which says the same thing in the reader's own words. */}
      <h3 className="kicker mb-2.5">Similar pages</h3>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <li key={s.id} className="min-w-0 rounded-lg border border-border p-2.5 text-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <KindChip kind={s.kind} cls={s.cls} />
            </div>
            <IntentLink href={s.route} className="font-medium leading-snug hover:underline">{s.name}</IntentLink>
            <p className="text-xs text-muted mt-1 leading-snug">
              Shares {s.shared.map((x, i) => <span key={x.id}>{i > 0 && ", "}<IntentLink href={x.route} className="underline decoration-foreground/20 hover:decoration-foreground">{x.name}</IntentLink></span>)}
              {s.sharedTags.length > 0 && <span>{s.shared.length ? " and " : ""}the tag{s.sharedTags.length > 1 ? "s" : ""} {s.sharedTags.join(", ")}</span>}.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
