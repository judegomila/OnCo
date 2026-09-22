import { graph } from "./graph";
import { NAV_GROUPS } from "./nav";
import { routeFor, type Kind } from "./kinds";

export type SearchDoc = { id: string; kind: Kind | "page"; name: string; aka: string; tldr: string; tags: string; route: string; status?: string; /** Space-separated ids of the cancers the record links to, for the "for my cancer" filter. */ cancers?: string };

/** Pages outside the navigation groups that a search should still reach. */
export const SITE_PAGES: ReadonlyArray<{ href: string; label: string; blurb: string }> = [
  { href: "/about/", label: "About and methodology", blurb: "What OnCo is, how it is built, its rules for facts, licences and how to contribute." },
  { href: "/terms-of-use/", label: "Terms of use", blurb: "The rules for using OnCo: not medical advice, accuracy not guaranteed, accounts, licences, liability and contact." },
  { href: "/privacy/", label: "Privacy policy", blurb: "What OnCo collects and where it lives: hosting, analytics, accounts, browser storage, your rights and how to contact us." },
];

/** Compact documents for the client-side search index. */
/** The site's own tool and landing pages, so a search for "models" or "pivot" reaches the page and not only the records. */
function pageDocs(): SearchDoc[] {
  const seen = new Set<string>();
  const out: SearchDoc[] = [];
  const pages = [...NAV_GROUPS.flatMap((gp) => [{ href: gp.href, label: gp.label, blurb: gp.blurb }, ...gp.items]), ...SITE_PAGES];
  for (const it of pages) {
    if (seen.has(it.href)) continue; seen.add(it.href);
    out.push({ id: "page:" + it.href, kind: "page", name: it.label, aka: "", tldr: it.blurb, tags: "page", route: it.href, status: "" });
  }
  return out;
}

export function searchDocs(): SearchDoc[] {
  return graph().entities.map((e) => ({
    id: e.id,
    kind: e.kind,
    name: e.name,
    aka: e.aka.join(" "),
    tldr: e.tldr,
    tags: e.tags.join(" "),
    route: routeFor(e),
    status: e.status,
    cancers: e.cancers.length ? e.cancers.join(" ") : undefined,
  }));
}

/** What the site ships as search.json: the tool pages first, then every record. Pages are not entities, so callers that resolve ids against the graph should use searchDocs(). */
export function siteSearchDocs(): SearchDoc[] {
  return [...pageDocs(), ...searchDocs()];
}
