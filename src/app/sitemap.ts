import type { MetadataRoute } from "next";
import { sitemapUrls, chunkUrls, SITEMAP_CHUNK } from "@/lib/sitemap-urls";

/** Required for metadata routes under `output: "export"`. */
export const dynamic = "force-static";

/**
 * `out/sitemap.xml` for the static export: the home page, every kind index, every nav route, every digest and
 * reading path, and every entity page (with `lastModified` from the record's `asOf`).
 *
 * Splitting: `sitemapUrls()` and `chunkUrls()` already partition the list at SITEMAP_CHUNK URLs. When the site
 * grows past that, switch this file to `export function generateSitemaps()` returning one `{ id }` per chunk and
 * make the default export take `{ id }`, then add a sitemap index (Next does not emit one for static export).
 * Until then a single file is emitted and a build-time warning fires if a second chunk would be needed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const chunks = chunkUrls(sitemapUrls());
  if (chunks.length > 1) console.warn(`sitemap: ${chunks.length * SITEMAP_CHUNK}+ URLs; only the first ${SITEMAP_CHUNK} are emitted. Move to generateSitemaps() (see src/app/sitemap.ts).`);
  return chunks[0].map((u) => (u.lastModified ? { url: u.url, lastModified: u.lastModified } : { url: u.url }));
}
