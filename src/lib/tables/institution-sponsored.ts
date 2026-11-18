import { graph } from "@/lib/graph";
import { phaseLabel, routeFor } from "@/lib/kinds";
import type { CellObj, StaticColumn, StaticRow } from "@/components/filters/StaticTable";
import { institutionsSponsoring, ROLE_LABEL, sponsoredBy, type Sponsored } from "@/lib/trials-sponsored";

/**
 * An institution page's "Trials it sponsors or funds" (src/components/TrialsSponsored.tsx). The National Cancer
 * Institute has over a hundred, so a page carries the first INSTITUTION_SPONSORED_PAGE and fetches the rest from
 * /api/v1/tables/institution-sponsored-<id>.json.
 */
export const institutionSponsoredTableId = (id: string) => `institution-sponsored-${id}`;
export const INSTITUTION_SPONSORED_PAGE = 15;

export const INSTITUTION_SPONSORED_COLUMNS: StaticColumn[] = [
  { key: "trial", label: "Trial" },
  { key: "cancers", label: "Cancer", filterable: true, className: "max-w-xs" },
  { key: "phase", label: "Phase", filterable: true, className: "whitespace-nowrap" },
  { key: "role", label: "Role", filterable: true, className: "whitespace-nowrap", tip: "Lead sponsor is the registry's own field. Sponsor and funder are the words of the trial record or of the ISRCTN entry." },
  { key: "namedAs", label: "Named as", hide: "hidden md:table-cell", className: "text-muted max-w-xs", tip: "The sponsor or funder name as the source gives it, and which source." },
];

export function institutionSponsoredRows(list: Sponsored[]): StaticRow[] {
  const g = graph();
  return list.map((s): StaticRow => ({
    id: s.trial.id,
    trial: { text: s.trial.name, href: routeFor(s.trial), strong: true, sub: (s.trial.participation ?? []).map((p) => p.nct).join(", ") || undefined },
    cancers: s.trial.cancers.flatMap((id) => { const c = g.get(id); return c ? [{ text: c.name, href: routeFor(c) }] : []; }) as CellObj[],
    phase: phaseLabel(s.trial.phase),
    role: s.roles.map((r) => ROLE_LABEL[r]).join(", "),
    namedAs: `${s.namedAs.join("; ")} (${s.sources.join(", ")})`,
  }));
}

/** Every institution's rows keyed by table id, for the API writer (only tables longer than a page are written). */
export function institutionSponsoredTables(): Array<{ id: string; rows: StaticRow[]; page: number }> {
  return institutionsSponsoring().map((id) => ({ id: institutionSponsoredTableId(id), rows: institutionSponsoredRows(sponsoredBy(id)), page: INSTITUTION_SPONSORED_PAGE }));
}
