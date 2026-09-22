import { cancerDagExport } from "@/lib/cancer-dag";
import { absoluteUrl } from "@/lib/seo";

/** Required under `output: "export"`: the file is written to disk at build time. */
export const dynamic = "force-static";

/**
 * The cancer map as data, for agents and scripts: every node (organ systems, histology groupings, cancers and
 * subtypes) with its page, depth and counts, every edge with the field it came from, the ordered layers and the
 * summary statistics. Same structure the page at /cancers/map/ draws.
 */
export function GET() {
  const x = cancerDagExport();
  const body = {
    title: "OnCo cancer map",
    description: "Directed acyclic graph of cancer types: organ system to cancer to subtype, plus histology groupings read from record names. Edges point from the broader node to the narrower one; counts are distinct linked records over a node and everything beneath it.",
    page: absoluteUrl("/cancers/map/"),
    licence: "https://creativecommons.org/licenses/by-nc/4.0/",
    ...x,
    nodes: x.nodes.map((n) => ({ ...n, url: absoluteUrl(n.route) })),
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
