/**
 * Emits the corpus as static JSON under public/api/v1/.
 * Run before `next build` (see package.json). Output is gitignored.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { KIND_META, KINDS, routeFor } from "../src/lib/schema";
import { searchDocs } from "../src/lib/search-index";
import { rankInstitutions } from "../src/lib/ranking";

const out = join(process.cwd(), "public", "api", "v1");
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "entities"), { recursive: true });

const g = graph();
const write = (name: string, data: unknown) => writeFileSync(join(out, name), JSON.stringify(data, null, 0));

const incoming: Record<string, Array<{ id: string; kind: string }>> = {};
for (const e of g.entities) {
  const groups = g.incoming(e.id);
  incoming[e.id] = [...groups.values()].flat().map((x) => ({ id: x.id, kind: x.kind }));
}

write("all.json", { entities: g.entities, incoming });
write("search.json", searchDocs());
for (const k of KINDS) write(`${KIND_META[k].plural}.json`, g.kind(k));
for (const e of g.entities) {
  const neighbours: Record<string, Array<{ id: string; kind: string; name: string; route: string }>> = {};
  for (const [k, list] of g.neighbours(e.id)) neighbours[k] = list.map((x) => ({ id: x.id, kind: x.kind, name: x.name, route: routeFor(x) }));
  write(`entities/${e.id}.json`, { entity: e, route: routeFor(e), neighbours });
}
write("ranking.json", rankInstitutions().map((r) => ({ rank: r.rank, id: r.institution.id, name: r.institution.name, city: r.institution.city, country: r.institution.country, newsweekOncology2026: r.institution.newsweekOncology2026 ?? null, nci: r.institution.nci ?? null, links: r.links, newsweekPoints: r.newsweekPoints, nciPoints: r.nciPoints, linkPoints: r.linkPoints, score: r.score })));
write("meta.json", { built: new Date().toISOString(), schema: 1, counts: Object.fromEntries(KINDS.map((k) => [k, g.kind(k).length])), total: g.entities.length, license: "CC BY 4.0", source: "https://github.com/judegomila/OnCo" });

console.log(`api: wrote ${g.entities.length} entities to public/api/v1`);
