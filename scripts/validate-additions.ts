/**
 * Validates optional entity collections that are not yet wired into src/data/index.ts,
 * by building a graph from ALL_INPUTS plus the additions. Used by the pipeline cluster.
 * Run: npx tsx scripts/validate-additions.ts
 */
import { ALL_INPUTS } from "../src/data";
import { failures } from "../src/data/failures";
import { pipelineTrials } from "../src/data/pipeline-trials";
import { EntitySchema, REL_FIELDS } from "../src/lib/schema";
import { calendar } from "../src/data/calendar";
import { digests } from "../src/data/digests";
import { resistance } from "../src/data/resistance";
import { payloads, linkers } from "../src/data/payloads";
import { isotopes } from "../src/data/isotopes";

const all = [...ALL_INPUTS, ...failures, ...pipelineTrials];
const ids = new Set<string>();
const errors: string[] = [];
for (const raw of all) {
  const r = EntitySchema.safeParse(raw);
  if (!r.success) { errors.push(`${(raw as { id?: string }).id}: ${r.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`); continue; }
  if (ids.has(r.data.id)) errors.push(`duplicate id ${r.data.id}`);
  ids.add(r.data.id);
}
const check = (from: string, id: string) => { if (!ids.has(id)) errors.push(`${from} -> unknown id "${id}"`); };
for (const raw of [...failures, ...pipelineTrials]) {
  const r = EntitySchema.safeParse(raw);
  if (!r.success) continue;
  for (const f of REL_FIELDS) for (const to of r.data[f]) check(r.data.id, to);
}
for (const e of calendar) for (const id of e.refs) check(`calendar "${e.title}"`, id);
for (const d of digests) for (const it of d.items) for (const id of it.refs) check(`digest ${d.id} "${it.title}"`, id);
for (const r of resistance) { for (const id of r.exemplars) check(`resistance ${r.id}`, id); for (const m of r.mechanisms) { for (const id of m.refs) check(`resistance ${r.id}/${m.name}`, id); for (const c of m.countermeasures) for (const id of c.refs) check(`resistance ${r.id}/${m.name}/cm`, id); } }
for (const p of payloads) for (const id of p.adcs) check(`payload ${p.id}`, id);
for (const l of linkers) for (const id of l.adcs) check(`linker ${l.id}`, id);
for (const i of isotopes) for (const id of [...i.supplierIds, ...i.refs]) check(`isotope ${i.id}`, id);

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`OK — ${all.length} entities incl. ${failures.length} failures + ${pipelineTrials.length} pipeline trials; calendar ${calendar.length}, digests ${digests.length}, resistance ${resistance.length}, payloads ${payloads.length}, linkers ${linkers.length}, isotopes ${isotopes.length}`);
