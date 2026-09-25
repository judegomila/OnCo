import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import type { BrowserRow, ColDef, FacetDef, FacetLink, LinkItem } from "@/components/EntityBrowser";
import type { SortState } from "@/components/filters/ResultsTable";
import { logoFor } from "@/lib/logos";
import { DATA_SOURCES } from "@/data/data-sources";
import { openSourceProjects } from "@/data/open-source";
import { activeYear, CATEGORY_META, CATEGORY_ORDER, LICENCE_FAMILY_ORDER, LICENCE_FAMILY_TIP, licenceFamily, OPENNESS_META, OPENNESS_ORDER } from "@/lib/open-source";

/** The /open-source/ browser: the page carries the first page of rows, the file under /api/v1/tables/ the rest. */
export const OPEN_SOURCE_TABLE = "open-source";
/** Most starred first; page-only records (no stars) sort last. Rows are pre-sorted this way so the first page stands in for the whole. */
export const OPEN_SOURCE_SORT: SortState = { key: "stars", dir: -1 };

const short = (s: string) => s.replace(/ \(.*\)$/, "");
const fmtStars = (n: number) => (n >= 1000 ? `${(n / 1000).toLocaleString("en-GB", { maximumFractionDigits: 1 })}k` : String(n));
const domain = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

export function openSourceBrowser(): { rows: BrowserRow[]; facets: FacetDef[]; columns: ColDef[] } {
  const g = graph();
  const sourceName = new Map(DATA_SOURCES.map((s) => [s.id, s.name]));
  const fl = (facet: string, value: string, extra?: Pick<FacetLink, "label" | "tip">): FacetLink => ({ facet, value, ...extra });
  const link = (id: string): LinkItem | undefined => { const e = g.get(id); return e ? { label: short(e.name), href: routeFor(e), tip: e.tldr } : undefined; };
  const rows: BrowserRow[] = openSourceProjects.map((p) => {
    const cat = CATEGORY_META[p.category];
    const open = OPENNESS_META[p.openness];
    const fam = licenceFamily(p.licence);
    const techNames = p.technologies.map((id) => g.get(id)?.name).filter((x): x is string => !!x).map(short);
    const sourceNames = p.dataSources.map((id) => sourceName.get(id)).filter((x): x is string => !!x);
    const cancerNames = p.cancers.map((id) => g.get(id)?.name).filter((x): x is string => !!x).map(short);
    const maintainer = p.maintainerId ? g.get(p.maintainerId) : undefined;
    const links: LinkItem[] = [];
    if (p.repo) links.push({ label: domain(p.repo) === "github.com" ? "repository" : domain(p.repo), href: p.repo, tip: p.repo });
    if (p.homepage && p.homepage !== p.repo) links.push({ label: domain(p.homepage), href: p.homepage, tip: p.homepage });
    if (p.doi) links.push({ label: "paper", href: `https://doi.org/${p.doi}`, tip: `First DOI named in the README: ${p.doi}` });
    const year = activeYear(p);
    return {
      id: p.id, name: p.name, tldr: p.summary, route: p.repo ?? p.homepage ?? p.source.url, logo: logoFor(p.maintainerId).src, avatar: "org",
      sub: [p.maintainer, p.since ? `since ${p.since}` : undefined].filter(Boolean).join(" · ") || undefined,
      facets: {
        category: [cat.label],
        licence: [fam],
        language: p.language ? [p.language] : ["Not a code repository"],
        openness: [open.label],
        active: [year],
        technology: techNames,
        source: sourceNames,
        cancer: cancerNames,
        maintainer: p.maintainer ? [p.maintainer] : [],
      },
      cols: {
        category: fl("category", cat.label, { tip: cat.blurb }),
        openness: fl("openness", open.label, { tip: p.opennessNote ? `${open.tip} ${p.opennessNote}` : open.tip }),
        licence: fl("licence", fam, { label: p.licence, tip: p.licenceNote ? `${p.licence}: ${p.licenceNote}` : `${p.licence} (${fam.toLowerCase()}). ${LICENCE_FAMILY_TIP[fam]}` }),
        language: p.language ? fl("language", p.language) : undefined,
        stars: p.stars === undefined ? undefined : fmtStars(p.stars),
        active: fl("active", year, { label: p.lastCommit ?? "page", tip: p.lastCommit ? `Last push to the repository: ${p.lastCommit}.` : "Not a repository: a project page, package index or model card was fetched instead." }),
        technologies: p.technologies.map(link).filter((x): x is LinkItem => !!x),
        // In the corpus the maintainer is a page link; outside it the name filters the table, as a trial's sponsor does.
        maintainer: maintainer ? [{ label: short(maintainer.name), href: routeFor(maintainer), tip: maintainer.tldr }] : p.maintainer ? fl("maintainer", p.maintainer) : undefined,
        links,
      },
      sortKeys: { stars: p.stars ?? -1, active: p.lastCommit ? Number(p.lastCommit.replace(/-/g, "")) : 0, since: p.since ?? 0 },
      tie: p.since ?? 0,
    };
  });
  rows.sort((a, b) => (b.sortKeys?.stars ?? -1) - (a.sortKeys?.stars ?? -1) || a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
  const years = [...new Set(rows.map((r) => r.facets.active[0]))].sort((a, b) => (a === "Page" ? 1 : b === "Page" ? -1 : b.localeCompare(a)));
  return {
    rows,
    facets: [
      { key: "category", label: "Category", searchable: false, width: "w-64", order: CATEGORY_ORDER.map((c) => CATEGORY_META[c].label) },
      { key: "licence", label: "Licence family", searchable: false, width: "w-48", order: LICENCE_FAMILY_ORDER },
      { key: "language", label: "Language", width: "w-44" },
      { key: "openness", label: "Openness", searchable: false, width: "w-52", order: OPENNESS_ORDER.map((o) => OPENNESS_META[o].label) },
      { key: "active", label: "Last active", searchable: false, width: "w-36", order: years },
      { key: "technology", label: "Technology", width: "w-56" },
      { key: "source", label: "Data source", width: "w-52" },
      { key: "cancer", label: "Cancer", width: "w-48" },
      { key: "maintainer", label: "Maintainer", width: "w-56" },
    ],
    columns: [
      { key: "category", label: "Category", sortable: true, tip: "One of fourteen categories; click a chip to filter." },
      { key: "openness", label: "Openness", sortable: true, hide: "hidden md:table-cell", tip: "What you can actually take away: code, data, weights, hardware designs or a standard." },
      { key: "licence", label: "Licence", sortable: true, hide: "hidden sm:table-cell", tip: "The SPDX id the repository declares, or as stated on the project page. Hover for the note; click to filter by family." },
      { key: "language", label: "Language", hide: "hidden lg:table-cell", tip: "Primary language as the GitHub API reports it." },
      { key: "stars", label: "Stars", sortable: true, numeric: true, tip: "GitHub stars on the day of the fetch; a rough measure of attention, not quality." },
      { key: "active", label: "Last push", sortable: true, hide: "hidden lg:table-cell", tip: "Date of the last push to the repository as the API reports it." },
      { key: "technologies", label: "Technologies", hide: "hidden xl:table-cell", tip: "OnCo technology pages this project implements or serves." },
      { key: "maintainer", label: "Maintainer", hide: "hidden xl:table-cell", tip: "Linked when the maintainer is an institution or company in the corpus." },
      { key: "links", label: "Links", hide: "hidden md:table-cell", tip: "Repository, project site and the first DOI the README names." },
    ],
  };
}
