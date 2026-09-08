/**
 * Fixed taxonomy of resistance mechanisms used by the resistance atlas.
 * Every mechanism in `src/data/resistance.ts` carries one of these categories, so the page can
 * group escape routes, colour them consistently, and count them in the class × category matrix.
 * Colours are chosen to be distinguishable from the countermeasure green (#16a34a) and to read in dark mode.
 */
export type MechanismCategory = "on-target" | "bypass" | "lineage" | "payload" | "antigen" | "immune-evasion" | "pharmacology" | "other";

export type CategoryInfo = {
  id: MechanismCategory;
  /** Short label for headers and chips. */
  label: string;
  /** Plain-English one-liner shown under the label. */
  oneLiner: string;
  /** Hex colour for routes, dots and heat cells. */
  color: string;
};

export const CATEGORIES: readonly CategoryInfo[] = [
  { id: "on-target", label: "On-target", oneLiner: "The drug's binding site mutates, so the drug no longer fits.", color: "#b91c1c" },
  { id: "bypass", label: "Bypass", oneLiner: "Another pathway takes over the job the blocked one was doing.", color: "#d97706" },
  { id: "lineage", label: "Lineage switch", oneLiner: "The cell changes type and no longer depends on the target.", color: "#7c3aed" },
  { id: "payload", label: "Payload", oneLiner: "The poison stops working: TOP1 loss, SLFN11 silencing, efflux pumps.", color: "#0284c7" },
  { id: "antigen", label: "Antigen loss", oneLiner: "The target disappears from the cell surface.", color: "#db2777" },
  { id: "immune-evasion", label: "Immune evasion", oneLiner: "Antigen presentation is lost, the tumour is cold, or the microenvironment suppresses T cells.", color: "#2563eb" },
  { id: "pharmacology", label: "Pharmacology", oneLiner: "The drug does not reach its site or is cleared: decoys, sanctuary sites, poor persistence, dosing.", color: "#0d9488" },
  { id: "other", label: "Other", oneLiner: "Escape routes that do not fit the classes above, such as pre-existing minor clones.", color: "#6b7280" },
];

export const CATEGORY_BY_ID: Record<MechanismCategory, CategoryInfo> = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<MechanismCategory, CategoryInfo>;

/** Category record for a mechanism, from its explicit `category` field (falls back to `other`). */
export function categoryOf(mechanism: { category?: MechanismCategory }): CategoryInfo {
  return CATEGORY_BY_ID[mechanism.category ?? "other"];
}

/** Ordered index of a category, for stable column order. */
export function categoryIndex(id: MechanismCategory): number {
  return CATEGORIES.findIndex((c) => c.id === id);
}
