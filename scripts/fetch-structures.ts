/**
 * Resolves src/data/structures.ts to files under public/structures/ (committed).
 *
 *   pubchem → public/structures/pubchem-<cid>.json   { atoms:[[x,y,z,el]], bonds:[[a,b,order]], dim: 2|3, cid, name }
 *   pdb     → public/structures/pdb-<id>.json        { atoms:[[x,y,z,"CA"]], bonds:[[i,i+1,1]] per chain, dim: 3 }
 *
 * Run: npm run fetch:structures   (needs network; idempotent, skips existing files)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { structures, type StructureDef } from "../src/data/structures";

const out = join(process.cwd(), "public", "structures");
mkdirSync(out, { recursive: true });

type Mol = { atoms: Array<[number, number, number, string]>; bonds: Array<[number, number, number]>; dim: 2 | 3; source: string; id: string; name: string };

async function get(url: string): Promise<string | null> {
  const r = await fetch(url, { headers: { "User-Agent": "OnCo/1.0 (github.com/judegomila/OnCo)" } });
  if (!r.ok) return null;
  return r.text();
}

function parseSdf(sdf: string): Omit<Mol, "source" | "id" | "name" | "dim"> & { dim: 2 | 3 } {
  const lines = sdf.split(/\r?\n/);
  if (lines.some((l) => l.includes("V3000"))) throw new Error("V3000 SDF not supported");
  const counts = lines[3];
  const nAtoms = parseInt(counts.slice(0, 3), 10), nBonds = parseInt(counts.slice(3, 6), 10);
  const atoms: Mol["atoms"] = [];
  for (let i = 0; i < nAtoms; i++) {
    const l = lines[4 + i];
    atoms.push([parseFloat(l.slice(0, 10)), parseFloat(l.slice(10, 20)), parseFloat(l.slice(20, 30)), l.slice(31, 34).trim()]);
  }
  const bonds: Mol["bonds"] = [];
  for (let i = 0; i < nBonds; i++) {
    const l = lines[4 + nAtoms + i];
    bonds.push([parseInt(l.slice(0, 3), 10) - 1, parseInt(l.slice(3, 6), 10) - 1, parseInt(l.slice(6, 9), 10) || 1]);
  }
  const dim: 2 | 3 = atoms.some((a) => Math.abs(a[2]) > 1e-3) ? 3 : 2;
  return { atoms, bonds, dim };
}

async function pubchem(def: StructureDef): Promise<{ file: string; cid: number; dim: 2 | 3 } | null> {
  let cid: number | null = null;
  if (def.query.startsWith("cid:")) cid = parseInt(def.query.slice(4), 10);
  else {
    const j = await get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(def.query)}/cids/JSON`);
    if (!j) return null;
    cid = JSON.parse(j)?.IdentifierList?.CID?.[0] ?? null;
  }
  if (!cid) return null;
  const file = `pubchem-${cid}.json`;
  const path = join(out, file);
  if (existsSync(path)) { const m = JSON.parse(readFileSync(path, "utf8")); return { file, cid, dim: m.dim }; }
  let sdf = await get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/SDF?record_type=3d`);
  if (!sdf) sdf = await get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/SDF`);
  if (!sdf) return null;
  const parsed = parseSdf(sdf);
  const name = (sdf.match(/> <PUBCHEM_IUPAC_TRADITIONAL_NAME>\n(.*)/)?.[1] ?? def.query).trim();
  const mol: Mol = { ...parsed, source: "pubchem", id: String(cid), name };
  writeFileSync(path, JSON.stringify(mol));
  return { file, cid, dim: parsed.dim };
}

async function pdb(def: StructureDef): Promise<{ file: string } | null> {
  const id = def.query.toUpperCase();
  const file = `pdb-${id}.json`;
  const path = join(out, file);
  if (existsSync(path)) return { file };
  const txt = await get(`https://files.rcsb.org/download/${id}.pdb`);
  if (!txt) return null;
  const atoms: Mol["atoms"] = [];
  const bonds: Mol["bonds"] = [];
  let prevChain = "", prevIdx = -1, prevRes = -999;
  for (const l of txt.split(/\r?\n/)) {
    if (!l.startsWith("ATOM")) continue;
    if (l.slice(12, 16).trim() !== "CA") continue;
    if (l[16] !== " " && l[16] !== "A") continue; // alt loc
    const chain = l[21], res = parseInt(l.slice(22, 26), 10);
    atoms.push([parseFloat(l.slice(30, 38)), parseFloat(l.slice(38, 46)), parseFloat(l.slice(46, 54)), "CA"]);
    const idx = atoms.length - 1;
    if (chain === prevChain && prevIdx >= 0 && res - prevRes <= 1) bonds.push([prevIdx, idx, 1]);
    prevChain = chain; prevIdx = idx; prevRes = res;
  }
  const mol: Mol = { atoms, bonds, dim: 3, source: "pdb", id, name: `PDB ${id}` };
  writeFileSync(path, JSON.stringify(mol));
  return { file };
}

async function main() {
  const index: Record<string, Array<{ label: string; file: string; note?: string; dim: 2 | 3; source: string; ref: string }>> = {};
  const failures: string[] = [];
  const cache = new Map<string, Promise<{ file: string; dim: 2 | 3; ref: string } | null>>();
  const resolve = (def: StructureDef) => {
    const key = `${def.source}:${def.query}`;
    if (!cache.has(key)) {
      cache.set(key, (async () => {
        if (def.source === "pubchem") { const r = await pubchem(def); return r ? { file: r.file, dim: r.dim, ref: `https://pubchem.ncbi.nlm.nih.gov/compound/${r.cid}` } : null; }
        const r = await pdb(def); return r ? { file: r.file, dim: 3 as const, ref: `https://www.rcsb.org/structure/${def.query.toUpperCase()}` } : null;
      })());
    }
    return cache.get(key)!;
  };
  for (const [drugId, defs] of Object.entries(structures)) {
    const entries = [] as NonNullable<(typeof index)[string]>;
    for (const def of defs) {
      const r = await resolve(def);
      if (!r) { failures.push(`${drugId}: ${def.source} "${def.query}"`); continue; }
      entries.push({ label: def.label, file: r.file, note: def.note, dim: r.dim, source: def.source, ref: r.ref });
    }
    if (entries.length) index[drugId] = entries;
  }
  writeFileSync(join(out, "index.json"), JSON.stringify(index, null, 0));
  console.log(`structures: ${Object.keys(index).length} products, ${cache.size} unique structures`);
  if (failures.length) console.log(`unresolved:\n  ${failures.join("\n  ")}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
