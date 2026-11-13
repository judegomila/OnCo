/**
 * Check one protocol file before registering it: `npx tsx scripts/check-protocol.ts src/data/protocols/<file>.ts`.
 *
 * Parses every protocol the file exports against ProtocolSchema, checks that each step, evidence row, variant and
 * best-in-class block cites a source key the record defines, and that every id in its relation arrays and `upgrades`
 * names a record in the corpus. The same rules run over the registered set in src/lib/protocols.test.ts; this is the
 * quick loop for a fill agent writing a file that is not registered yet. Exits 1 on any problem.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ProtocolSchema, REL_FIELDS } from "../src/lib/schema";
import { ALL_INPUTS } from "../src/data";
import { protocolProblems } from "../src/lib/protocols";

async function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: tsx scripts/check-protocol.ts <file>"); process.exit(2); }
  const mod = (await import(pathToFileURL(path.resolve(file)).href)) as Record<string, unknown>;
  const found = Object.values(mod).flatMap((v) => (Array.isArray(v) ? v : [v])).filter((v): v is Record<string, unknown> => !!v && typeof v === "object" && (v as { kind?: unknown }).kind === "protocol");
  if (!found.length) { console.error(`${file}: exports no protocol`); process.exit(1); }
  const byId = new Map(ALL_INPUTS.map((e) => [e.id, e]));
  let bad = 0;
  for (const raw of found) {
    const r = ProtocolSchema.safeParse(raw);
    if (!r.success) {
      bad++;
      console.error(`${String(raw.id)}: ${r.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
      continue;
    }
    const p = r.data;
    const problems = protocolProblems(p);
    for (const f of [...REL_FIELDS, "upgrades"] as const) for (const id of (p as unknown as Record<string, string[]>)[f]) if (!byId.has(id)) problems.push(`${f}: no record "${id}"`);
    for (const id of p.upgrades) { const e = byId.get(id); if (e && (e.kind !== "idea" || !(e.tags ?? []).includes("protocol-upgrade"))) problems.push(`upgrades: "${id}" is not an idea tagged protocol-upgrade`); }
    if (byId.has(p.id) && byId.get(p.id) !== raw) problems.push(`id "${p.id}" is already used by another record`);
    if (problems.length) { bad++; console.error(`${p.id}:\n  ${problems.join("\n  ")}`); }
    else console.log(`${p.id}: ok (${p.steps.length} steps, ${p.sources.length} sources)`);
  }
  process.exit(bad ? 1 : 0);
}

void main();
