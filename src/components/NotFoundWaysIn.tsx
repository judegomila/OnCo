"use client";

import Link from "next/link";
import { SearchBox } from "./SearchBox";
import { KindIcon } from "./KindIcon";
import { RouteIcon } from "./RouteIcon";
import { NavIcon } from "./NavIcon";
import { KIND_META, KINDS } from "@/lib/schema";

/** Ways in that are not a kind hub: the anatomical map, the per-cancer view, the full search and home. */
const WAYS_IN: { href: string; title: string; blurb: string }[] = [
  { href: "/body/", title: "Body map", blurb: "Pick where the cancer is to reach its page and the technologies used there." },
  { href: "/for-me/", title: "For me", blurb: "Choose one or more cancers and see everything in OnCo that touches them." },
  { href: "/search/", title: "Full search", blurb: "Word and concept search over every record, with why each result matched." },
  { href: "/", title: "Home", blurb: "The front page: fronts, latest changes and the state of the art." },
];

/**
 * The static body of the 404 page: search, the ways in and one card per kind. Next embeds the root not-found tree
 * in the RSC payload of every page (once per router segment, so twice on record pages); as a client module the
 * payload carries one reference and these 9 KB of icons and blurbs ship once in the bundle. Markup is unchanged.
 */
export function NotFoundWaysIn() {
  return (
    <>
      <section aria-labelledby="nf-search">
        <h2 id="nf-search" className="text-lg font-semibold tracking-tight mb-3 inline-flex items-center gap-2"><NavIcon id="search" className="h-5 w-5 text-accent" />Search OnCo</h2>
        <SearchBox large />
      </section>

      <section aria-labelledby="nf-ways">
        <h2 id="nf-ways" className="text-lg font-semibold tracking-tight mb-3 inline-flex items-center gap-2"><NavIcon id="find" className="h-5 w-5 text-accent" />Other ways in</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WAYS_IN.map((w) => (
            <li key={w.href}>
              <Link href={w.href} className="card card-link p-4 block h-full">
                <span className="flex items-center gap-2 font-medium"><RouteIcon href={w.href} className="h-5 w-5 text-accent" />{w.title}</span>
                <span className="block text-sm text-muted mt-1">{w.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="nf-kinds">
        <h2 id="nf-kinds" className="text-lg font-semibold tracking-tight mb-3 inline-flex items-center gap-2"><NavIcon id="map" className="h-5 w-5 text-accent" />Browse by kind</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KINDS.map((k) => {
            const m = KIND_META[k];
            return (
              <li key={k}>
                <Link href={`/${m.route}/`} className="card card-link p-4 block h-full">
                  <span className="flex items-center gap-2 font-medium first-letter:uppercase"><KindIcon kind={k} className="h-5 w-5 text-accent" />{m.title ?? m.plural.charAt(0).toUpperCase() + m.plural.slice(1)}</span>
                  <span className="block text-sm text-muted mt-1">{m.blurb}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
