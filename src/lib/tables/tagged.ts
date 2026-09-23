import type { BrowserRow, ColDef, FacetCounts, FacetDef, LinkItem } from "@/components/EntityBrowser";
import type { SortState } from "@/components/filters/ResultsTable";
import { graph } from "@/lib/graph";
import { buildBrowser } from "@/lib/kind-browser";
import { sortBrowserRows } from "@/lib/browser-sort";
import { KIND_META, KINDS, routeFor, type Kind } from "@/lib/kinds";
import type { Entity } from "@/lib/schema";
import { KIND_PAGE, pageRows, type MoreRows } from "@/lib/static-tables";
import { allTags, publicTags, tagIndex, tagRoute, tagSlug, type TagEntry } from "@/lib/tags";
import { facetCounts } from "./kinds";
import type { TableFile } from "./index";

/**
 * The tag pages (/tagged/<slug>/) as paged browsers: every record carrying one tag, whatever its kind, in one
 * EntityBrowser with kind, cancer, phase or status and year facets. Rows share their picture with the kind
 * browsers (the molecule, drawing, organ icon, logo or portrait `buildBrowser` gives the same record), so a mixed
 * table never shows a gap beside a name. The largest tag ("pipeline") covers 2,400 trials and products, so pages
 * carry their first KIND_PAGE rows and fetch the rest from /api/v1/tables/tag-<slug>.json (scripts/build-tables.ts).
 */

/** The table id of a tag browser's file: `tag-` and the slug, so it cannot clash with a kind browser (`kind-`) or a hand-written table. */
export const tagTableId = (slug: string): string => `tag-${slug}`;

export const TAG_FACETS: FacetDef[] = [
  { key: "kind", label: "Kind", searchable: false, width: "w-44" },
  { key: "cancers", label: "Cancer", width: "w-56" },
  { key: "year", label: "Year", searchable: false, width: "w-36" },
];

export const TAG_COLUMNS: ColDef[] = [
  { key: "kind", label: "Kind", sortable: true, chip: true, tip: "What sort of record this is; click to keep only that kind." },
  { key: "cancers", label: "Cancers", hide: "hidden md:table-cell", facet: null },
  { key: "year", label: "Year", sortable: true, numeric: true, hide: "hidden sm:table-cell", tip: "The year the record turns on: a paper's publication, a trial's readout, a product's first approval, a technology's start." },
  { key: "tags", label: "Other tags", hide: "hidden lg:table-cell", facet: null, tip: "The record's other tags, each opening its own tag page." },
];

/** The tag pages sort by name: statuses mix across kinds, and a name order reads as a directory. */
export const TAG_SORT: SortState = { key: "name", dir: 1 };

type Visual = Pick<BrowserRow, "molecule" | "modality" | "target" | "schematic" | "term" | "cancerIcon" | "sectionIcon" | "logo" | "round" | "avatar" | "sub">;

let VISUALS: Map<string, Visual> | null = null;

/** The picture and subtitle every kind browser gives a record, keyed by id, built once from `buildBrowser` for every kind. */
function visualById(): Map<string, Visual> {
  if (VISUALS) return VISUALS;
  const m = new Map<string, Visual>();
  for (const k of KINDS) for (const r of buildBrowser(k).rows) {
    const v: Visual = {};
    if (r.molecule) { v.molecule = r.molecule; v.modality = r.modality; }
    if (r.target) v.target = r.target;
    if (r.schematic) v.schematic = r.schematic;
    if (r.term) v.term = r.term;
    if (r.cancerIcon) v.cancerIcon = r.cancerIcon;
    if (r.sectionIcon) v.sectionIcon = r.sectionIcon;
    if (r.logo) v.logo = r.logo;
    if (r.round) v.round = r.round;
    if (r.avatar) v.avatar = r.avatar;
    if (r.sub) v.sub = r.sub;
    m.set(r.id, v);
  }
  VISUALS = m;
  return m;
}

/** The year a record turns on, where its kind has one. */
export function entityYear(e: Entity): number | undefined {
  switch (e.kind) {
    case "paper": return e.year;
    case "trial": return e.yearReported;
    case "drug": { const ys = e.approvals.map((a) => a.year).filter((y) => typeof y === "number"); return ys.length ? Math.min(...ys) : undefined; }
    case "technology": return typeof e.since === "number" ? e.since : undefined;
    default: return undefined;
  }
}

const short = (s: string) => s.replace(/ \(.*\)$/, "");
const kindLabel = (k: Kind) => KIND_META[k].label;

/** One browser row per record carrying the tag, in name order. */
export function taggedRows(entry: TagEntry): BrowserRow[] {
  const g = graph();
  const visuals = visualById();
  const rows: BrowserRow[] = [];
  for (const id of entry.ids) {
    const e = g.get(id);
    if (!e) continue;
    const year = entityYear(e);
    const cancers = e.cancers.map((cid) => g.get(cid)).filter((x): x is Entity => !!x);
    const others = publicTags(e.tags).filter((t) => tagSlug(t) !== entry.slug);
    const otherLinks: LinkItem[] = [...new Map(others.map((t) => [tagSlug(t), t])).values()].map((t) => ({ label: t, href: tagRoute(t), tip: `Every record tagged ${t}.` }));
    rows.push({
      id: e.id, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status, kind: e.kind,
      ...visuals.get(e.id),
      facets: { kind: [kindLabel(e.kind)], cancers: cancers.map((c) => short(c.name)), year: year ? [String(year)] : [] },
      cols: {
        kind: { facet: "kind", value: kindLabel(e.kind), tip: KIND_META[e.kind].blurb },
        cancers: cancers.slice(0, 4).map((c) => ({ label: short(c.name), href: routeFor(c), tip: c.tldr })),
        year: year ? { facet: "year", value: String(year) } : undefined,
        tags: otherLinks,
      },
      sortKeys: { year: year ?? 0 },
    });
  }
  return sortBrowserRows(rows, TAG_SORT);
}

export type TagBrowser = { entry: TagEntry; rows: BrowserRow[]; counts: FacetCounts };

/** The whole browser of one tag: rows in default order and facet counts over every row. Null when no record carries the slug. */
export function tagBrowser(slug: string): TagBrowser | null {
  const entry = tagIndex().get(slug);
  if (!entry) return null;
  const rows = taggedRows(entry);
  return { entry, rows, counts: facetCounts(rows, TAG_FACETS, false) };
}

/** What the tag page hands to EntityBrowser: every row for a small tag; the first KIND_PAGE rows and the file for a long one. */
export function pageTagRows(slug: string, rows: BrowserRow[]): { rows: BrowserRow[]; more?: MoreRows } {
  return pageRows(tagTableId(slug), rows, KIND_PAGE);
}

/** The tag browsers longer than one page as table files for scripts/build-tables.ts, largest first. */
export function tagTables(): TableFile[] {
  return allTags().filter((t) => t.count > KIND_PAGE).map((t) => ({ id: tagTableId(t.slug), rows: taggedRows(t), page: KIND_PAGE }));
}

/** Test seam. */
export function resetTagVisuals() { VISUALS = null; }
