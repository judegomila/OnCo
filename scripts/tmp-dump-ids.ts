// Temporary: dump corpus ids for the pancreatic registry generator (/tmp/panc). Not committed.
import { graph } from "../src/lib/graph";
import fs from "node:fs";
const g = graph();
const out: Record<string, unknown> = {};
for (const kind of ["drug", "technology", "term", "cancer", "institution", "company", "target", "pathway", "trial"] as const) {
  out[kind] = g.kind(kind as never).map((e: { id: string; name: string; aka?: string[]; brand?: string; code?: string; nct?: string }) => ({ id: e.id, name: e.name, aka: e.aka ?? [], brand: e.brand, code: e.code, nct: e.nct }));
}
fs.writeFileSync("/tmp/panc/corpus-ids.json", JSON.stringify(out));
for (const [k, v] of Object.entries(out)) console.log(k, (v as unknown[]).length);
