import { graph } from "./graph";
import { routeFor, type Kind } from "./schema";

export type SearchDoc = { id: string; kind: Kind; name: string; aka: string; tldr: string; tags: string; route: string; status?: string };

/** Compact documents for the client-side search index. */
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
  }));
}
