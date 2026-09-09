import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/** Required for metadata routes under `output: "export"`. */
export const dynamic = "force-static";

/**
 * `out/robots.txt`. Everything is crawlable except the raw JSON under /api/v1/: it duplicates every entity page
 * as a JSON blob, so letting it into the index would surface ~8,000 machine-readable duplicates next to the real
 * pages. The /api/ documentation page stays indexable and the JSON stays fetchable by anything that ignores robots.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/v1/"] }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
