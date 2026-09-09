import type { Metadata } from "next";
import { KIND_META, routeFor, type Entity, type Kind } from "./schema";

/** Canonical origin. Every canonical URL, sitemap entry and JSON-LD `url` is built from this. */
export const SITE = "https://onco.cc";
export const SITE_NAME = "OnCo";

/** Absolute URL for a site path (paths are always `/…/` because `trailingSlash: true`). */
export const absoluteUrl = (path: string) => `${SITE}${path.startsWith("/") ? path : `/${path}`}`;

export const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Public display name of a kind: "Treatments & tests" for drugs, else the capitalised plural. */
export const kindTitle = (k: Kind) => KIND_META[k].title ?? cap(KIND_META[k].plural);

/**
 * Meta description from a TL;DR: whole sentences up to `max` characters; if the first sentence alone is too long,
 * cut at a word boundary and add an ellipsis. Never returns a fragment that ends mid-word.
 */
export function describe(text: string, max = 155): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const sentences = t.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const s of sentences) {
    const next = out ? `${out} ${s}` : s;
    if (next.length > max) break;
    out = next;
  }
  if (out) return out;
  const cut = t.slice(0, max - 1);
  const atWord = cut.lastIndexOf(" ");
  return `${(atWord > max / 2 ? cut.slice(0, atWord) : cut).replace(/[,;:\s]+$/, "")}…`;
}

/**
 * Metadata for a page: canonical URL, Open Graph and Twitter copies of the title/description, and an explicit
 * index/follow. The site Open Graph image comes from `src/app/opengraph-image.png` (file-based metadata) and is
 * applied by Next on top of this, so it is not repeated here. `title` is the page part only; the root layout
 * template appends " · OnCo" to `<title>` and we mirror that for the social cards.
 */
export function pageMeta({ title, description, path, absoluteTitle, noindex }: { title: string; description: string; path: string; absoluteTitle?: string; noindex?: boolean }): Metadata {
  const fullTitle = absoluteTitle ?? `${title} · ${SITE_NAME}`;
  const url = absoluteUrl(path);
  const desc = describe(description);
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description: desc, url, siteName: SITE_NAME, type: "website", locale: "en_GB" },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

/** "Name · Kind" (layout template adds " · OnCo"). */
export const entityTitle = (e: Entity) => `${e.name} · ${KIND_META[e.kind].label}`;

/** Metadata for an entity page. */
export function entityMeta(e: Entity): Metadata {
  return pageMeta({ title: entityTitle(e), description: e.tldr, path: routeFor(e) });
}

export type Crumb = { label: string; href: string };

/** Home › Kind › Name. Shared by the visible breadcrumb and the BreadcrumbList JSON-LD so they always agree. */
export function entityCrumbs(e: Entity): Crumb[] {
  return [
    { label: "Home", href: "/" },
    { label: kindTitle(e.kind), href: `/${KIND_META[e.kind].route}/` },
    { label: e.name, href: routeFor(e) },
  ];
}
