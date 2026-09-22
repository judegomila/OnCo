import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import type { BrowserRow, ColDef, FacetDef, FacetLink, LinkItem } from "@/components/EntityBrowser";
import { logoSrc } from "@/lib/logos";
import { COMPANY_TYPE_LABEL, fmtUsd, latestRound, STAGE_LABEL, STAGE_ORDER, STAGE_TIP, stageOf, startups, ycBatchLabel, ycBatchSortKey } from "@/lib/startups";
import type { SortState } from "@/components/filters/ResultsTable";

/** The /startups/ browser (1.2 MB of HTML with every startup shipped twice): the page carries the first page, the file the rest. */
export const STARTUPS_TABLE = "startups";
/** Newest round first; the rows are pre-sorted this way so the first page stands in for the whole until the file is fetched. */
export const STARTUPS_SORT: SortState = { key: "round", dir: -1 };

const short = (s: string) => s.replace(/ \(.*\)$/, "");

export function startupBrowser(): { rows: BrowserRow[]; facets: FacetDef[]; columns: ColDef[] } {
  const g = graph();
  const fl = (facet: string, value: string | undefined, extra?: Pick<FacetLink, "label" | "tip">): FacetLink | undefined => (value ? { facet, value, ...extra } : undefined);
  const link = (id: string): LinkItem => { const e = g.must(id); return { label: short(e.name), href: routeFor(e), tip: e.tldr }; };
  const list = startups();
  const out: BrowserRow[] = list.map((c) => {
    const stage = stageOf(c);
    const stageLabel = stage ? STAGE_LABEL[stage] : undefined;
    const techNames = [...new Set(c.technologies.map((id) => short(g.must(id).name)))];
    const fronts = [...new Set([...c.sections, ...c.technologies.flatMap((t) => g.must(t).sections)])].map((id) => g.must(id).name);
    const latest = latestRound(c);
    const products = new Set([...c.drugs, ...(g.incoming(c.id).get("drug") ?? []).map((d) => d.id)]).size;
    return {
      id: c.id, name: c.name, tldr: c.tldr, route: routeFor(c), logo: logoSrc(c.id, c.website), avatar: "org",
      sub: `${c.hq}, ${c.country}${c.founded ? ` · founded ${c.founded}` : ""}`,
      facets: {
        stage: stageLabel ? [stageLabel] : [],
        type: [COMPANY_TYPE_LABEL[c.companyType]],
        modality: [...techNames, ...fronts],
        cancers: c.cancers.map((id) => short(g.must(id).name)),
        yc: c.ycBatch ? [c.ycBatch] : [],
        investor: c.investors.map((id) => g.must(id).name),
        country: [c.country],
      },
      cols: {
        stage: fl("stage", stageLabel, stage ? { tip: STAGE_TIP[stage] } : undefined),
        type: fl("type", COMPANY_TYPE_LABEL[c.companyType]),
        yc: fl("yc", c.ycBatch, c.ycBatch ? { tip: `Y Combinator, ${ycBatchLabel(c.ycBatch)} batch. Click to see the whole batch.` } : undefined),
        investors: c.investors.map(link),
        round: latest ? `${latest.round} ${latest.year}${fmtUsd(latest.amountUsd) ? ` · ${fmtUsd(latest.amountUsd)}` : ""}` : undefined,
        cancers: c.cancers.map(link),
        country: fl("country", c.country),
        products: products || undefined,
      },
      sortKeys: { round: latest?.year ?? 0, products, yc: c.ycBatch ? ycBatchSortKey(c.ycBatch) : 0, investors: c.investors.length },
      tie: c.founded ?? 0,
    };
  });
  // The browser's default order (STARTUPS_SORT): latest round year descending, then founded descending, then name.
  out.sort((a, b) => (b.sortKeys?.round ?? 0) - (a.sortKeys?.round ?? 0) || (b.tie ?? 0) - (a.tie ?? 0) || a.name.localeCompare(b.name));
  return {
    rows: out,
    facets: [
      { key: "stage", label: "Stage", searchable: false, width: "w-44", order: STAGE_ORDER.map((s) => STAGE_LABEL[s]) },
      { key: "modality", label: "Modality / technology", width: "w-56" },
      { key: "cancers", label: "Cancer", width: "w-48" },
      { key: "yc", label: "YC batch", searchable: false, width: "w-36" },
      { key: "investor", label: "Investor", width: "w-56" },
      { key: "country", label: "Country", searchable: false, width: "w-36" },
      { key: "type", label: "Type", searchable: false, width: "w-44" },
    ],
    columns: [
      { key: "stage", label: "Stage", sortable: true, tip: "Startup, growth stage, public, large private, acquired or wound down. Click a chip to filter." },
      { key: "type", label: "Type", sortable: true, hide: "hidden lg:table-cell" },
      { key: "yc", label: "YC", sortable: true, hide: "hidden sm:table-cell", tip: "Y Combinator batch, from the open YC directory." },
      { key: "round", label: "Latest round", sortable: true, hide: "hidden md:table-cell", tip: "Most recent financing round on record, with the amount only where the cited source states it." },
      { key: "investors", label: "Investors", hide: "hidden lg:table-cell" },
      { key: "cancers", label: "Cancers", hide: "hidden xl:table-cell" },
      { key: "products", label: "Products", sortable: true, numeric: true, hide: "hidden md:table-cell" },
    ],
  };
}
