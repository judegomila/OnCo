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

/** atoms: [x, y, z, element, chain?, role?] where role is "ca" (backbone trace), "lig" (bound ligand), or "pkt" (pocket residue atoms within 5 Å of a ligand). */
type Atom = [number, number, number, string] | [number, number, number, string, string, string];
type Mol = { atoms: Atom[]; bonds: Array<[number, number, number]>; dim: 2 | 3; source: string; id: string; name: string; chains?: string[]; ligands?: string[] };

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

const SKIP_HET = new Set(["HOH", "WAT", "DOD", "SO4", "GOL", "PEG", "PG4", "EDO", "DMS", "ACT", "PO4", "CL", "NA", "MG", "ZN", "CA", "K", "MN", "NI", "CD", "IOD", "BR", "NO3", "FMT", "TRS", "MES", "EPE", "BME", "MPD", "PGE", "1PE", "P6G", "NAG", "MAN", "BMA", "FUC", "GAL", "GLC", "NDG", "SIA", "CIT", "TLA", "MLI", "IMD", "BU3", "PE4", "OLC", "UNX", "UNL"]);

async function pdb(def: StructureDef): Promise<{ file: string } | null> {
  const id = def.query.toUpperCase();
  const file = `pdb-${id}.json`;
  const path = join(out, file);
  if (existsSync(path)) return { file };
  const txt = await get(`https://files.rcsb.org/download/${id}.pdb`);
  if (!txt) return null;
  type Raw = { x: number; y: number; z: number; el: string; chain: string; res: number; resn: string; name: string; het: boolean };
  const raw: Raw[] = [];
  for (const l of txt.split(/\r?\n/)) {
    if (l.startsWith("ENDMDL")) break; // first model only
    const isAtom = l.startsWith("ATOM"), isHet = l.startsWith("HETATM");
    if (!isAtom && !isHet) continue;
    if (l[16] !== " " && l[16] !== "A") continue; // alt loc
    const resn = l.slice(17, 20).trim();
    if (isHet && SKIP_HET.has(resn)) continue;
    const elRaw = l.slice(76, 78).trim() || l.slice(12, 14).trim().replace(/[0-9]/g, "");
    const el = elRaw[0].toUpperCase() + elRaw.slice(1).toLowerCase();
    if (el === "H" || el === "D") continue;
    raw.push({ x: parseFloat(l.slice(30, 38)), y: parseFloat(l.slice(38, 46)), z: parseFloat(l.slice(46, 54)), el, chain: l[21], res: parseInt(l.slice(22, 26), 10), resn, name: l.slice(12, 16).trim(), het: isHet });
  }
  // Ligands: HETATM residues with >= 12 heavy atoms (drug-like), grouped by chain + residue.
  const groups = new Map<string, Raw[]>();
  for (const a of raw) if (a.het) { const k = `${a.chain}:${a.resn}:${a.res}`; groups.set(k, [...(groups.get(k) ?? []), a]); }
  const ligAtoms: Raw[] = []; const ligands = new Set<string>();
  for (const [k, g] of groups) if (g.length >= 12) { ligAtoms.push(...g); ligands.add(k.split(":")[1]); }
  // Pocket: protein residues with any atom within 5 Å of a ligand atom (whole residue kept).
  const pocketRes = new Set<string>();
  if (ligAtoms.length) {
    for (const a of raw) {
      if (a.het) continue;
      for (const l of ligAtoms) { const d = (a.x - l.x) ** 2 + (a.y - l.y) ** 2 + (a.z - l.z) ** 2; if (d <= 25) { pocketRes.add(`${a.chain}:${a.res}`); break; } }
    }
  }
  const atoms: Atom[] = []; const bonds: Mol["bonds"] = [];
  let prevChain = "", prevIdx = -1, prevRes = -999;
  const chains = new Set<string>();
  for (const a of raw) {
    if (a.het || a.name !== "CA") continue;
    chains.add(a.chain);
    atoms.push([a.x, a.y, a.z, "CA", a.chain, "ca"]);
    const idx = atoms.length - 1;
    if (a.chain === prevChain && prevIdx >= 0 && a.res - prevRes <= 1) bonds.push([prevIdx, idx, 1]);
    prevChain = a.chain; prevIdx = idx; prevRes = a.res;
  }
  const bondByDistance = (list: Raw[], role: "lig" | "pkt") => {
    const start = atoms.length;
    for (const a of list) atoms.push([a.x, a.y, a.z, a.el, a.chain, role]);
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const d2 = (list[i].x - list[j].x) ** 2 + (list[i].y - list[j].y) ** 2 + (list[i].z - list[j].z) ** 2;
      const big = ["S", "P", "Cl", "Br", "I", "Se"];
      const lim = big.includes(list[i].el) || big.includes(list[j].el) ? 2.1 : 1.9;
      if (d2 <= lim * lim) bonds.push([start + i, start + j, 1]);
    }
  };
  if (ligAtoms.length) {
    bondByDistance(ligAtoms, "lig");
    const pocket = raw.filter((a) => !a.het && pocketRes.has(`${a.chain}:${a.res}`) && a.name !== "CA");
    if (pocket.length && pocket.length <= 1500) bondByDistance(pocket, "pkt");
  }
  const mol: Mol = { atoms, bonds, dim: 3, source: "pdb", id, name: `PDB ${id}`, chains: [...chains], ligands: [...ligands] };
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
