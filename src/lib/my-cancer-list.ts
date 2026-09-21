import { graph } from "./graph";
import { routeFor } from "./kinds";
import type { MyCancerLite } from "./use-my-cancer";

/**
 * Every cancer as (id, name, route, group): the contents of /api/v1/my-cancers.json (scripts/build-api.ts), which the
 * browser fetches on demand through useMyCancerList (src/lib/use-my-cancer-list.ts). Not for page props: the layout
 * used to pass this list to two header components and every one of the 27,000 pages carried two 39 KB copies.
 */
export function myCancerList(): Array<MyCancerLite & { group: string }> {
  return graph().kind("cancer").map((c) => ({ id: c.id, name: c.name, route: routeFor(c), group: c.group }));
}

/** The same list with the group and TL;DR, for the pinned tile on the cancer hub (one page, so it may ship inline). */
export function myCancerTiles(): Array<MyCancerLite & { group: string; tldr: string }> {
  return graph().kind("cancer").map((c) => ({ id: c.id, name: c.name, route: routeFor(c), group: c.group, tldr: c.tldr }));
}
