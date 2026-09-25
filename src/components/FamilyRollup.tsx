import Link from "next/link";
import { graph } from "@/lib/graph";
import type { Cancer } from "@/lib/schema";
import { familyRollup, ROLLUP_ITEM_CAP, type RollupKind } from "@/lib/cancer-rollup";
import { anchorHref } from "@/lib/record-sections";
import { Block } from "./record-blocks";
import { ChipList } from "./ui";

/**
 * What the subtypes hold and the family record does not (docs/CANCER-FAMILIES.md): the trials, medicines and expert
 * centres attached to a type of this cancer rather than to the cancer itself, grouped by the type each came from.
 *
 * The reader who lands on a family page is the one who does not yet know which type she has, so she is shown the work
 * and told where it sits. Nothing is copied onto the family record: the roll-up is a view. Each group names the first
 * `ROLLUP_ITEM_CAP` records and links the rest into the subtype's own page, so the markup grows with the number of
 * subtypes, not with the number of trials.
 */

const COPY: Record<RollupKind, { title: string; anchor: string; lead: (c: Cancer, n: number) => string }> = {
  trial: {
    title: "Trials in the types of this cancer",
    anchor: "landmark-trials",
    lead: (c, n) => `${n.toLocaleString("en-GB")} trials on record are attached to a type of ${c.name} rather than to ${c.name} itself. They are grouped by the type that holds them, so a reader still working out which type she has can see the whole field from here.`,
  },
  drug: {
    title: "Medicines in the types of this cancer",
    anchor: "pipeline",
    lead: (c, n) => `${n.toLocaleString("en-GB")} medicines on record are linked to a type of ${c.name} rather than to ${c.name} itself. Grouped by the type that holds them; each list opens that type's own page.`,
  },
  institution: {
    title: "Expert centres named on the types of this cancer",
    anchor: "centres",
    lead: (c, n) => `${n.toLocaleString("en-GB")} centres are named on a type of ${c.name} rather than on ${c.name} itself. Grouped by the type that holds them; the full table for each sits on that type's page.`,
  },
};

export function FamilyRollup({ c, kind, id }: { c: Cancer; kind: RollupKind; id?: string }) {
  const g = graph();
  const roll = familyRollup(c, kind, g);
  if (!roll.total) return null;
  const copy = COPY[kind];
  return (
    <Block id={id} title={copy.title} aside={<span className="text-sm text-muted tabular-nums">{roll.total.toLocaleString("en-GB")}</span>}>
      <p className="text-sm text-muted mb-3 max-w-3xl">{copy.lead(c, roll.total)}</p>
      <div className="space-y-3">
        {roll.groups.map((grp) => {
          const href = anchorHref(grp.child, copy.anchor, g);
          return (
            <div key={grp.child.id} className="card p-3" data-rollup-child={grp.child.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <Link href={href} className="font-medium hover:text-accent">{grp.child.name}</Link>
                <span className="text-sm text-muted tabular-nums">{grp.items.length.toLocaleString("en-GB")}</span>
              </div>
              <ChipList items={grp.items.map((i) => i.e)} max={ROLLUP_ITEM_CAP} moreHref={href} />
            </div>
          );
        })}
      </div>
    </Block>
  );
}
