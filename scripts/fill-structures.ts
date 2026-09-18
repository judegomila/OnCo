/**
 * Fills PubChem structures for small-molecule and peptide products that have none.
 *
 * For every drug without a molecule whose modality is not a biologic, cell, vaccine, test or bare
 * radioisotope, the name, sponsor code and short aliases are looked up on PubChem PUG REST (one
 * request per query, 250 ms apart, one retry on 503, hard cap of 700 requests). A hit is accepted
 * only when it resolves to a single compound (or several records that share one InChIKey skeleton,
 * in which case the single-component parent is taken) with a plausible molecular weight for the
 * modality. Accepted hits are appended to src/data/structures.ts pinned by CID, their SDF is
 * fetched through scripts/fetch-structures.ts and public/structures/index.json is extended, so the
 * result is exactly what `npm run fetch:structures` would have produced.
 *
 * Run: npx tsx scripts/fill-structures.ts           (lookup only; prints the table and counts)
 *      npx tsx scripts/fill-structures.ts --apply   (also writes structures.ts and public/structures)
 * Lookups are cached under /tmp/onco-fill-structures so a re-run costs no requests.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { hasMolecule } from "../src/lib/structures";
import { pubchem } from "./fetch-structures";

const APPLY = process.argv.includes("--apply");
const CACHE = "/tmp/onco-fill-structures";
mkdirSync(CACHE, { recursive: true });
const MAX_REQUESTS = 700;
let requests = 0;

/** Modalities with no single small molecule to draw; mirrors EXPLAINED_PLACEHOLDER in lib/health.ts plus registry "not stated" rows. */
const BIOLOGIC = /antibody|mab\b|adc\b|conjugate|bispecific|engager|immtac|checkpoint modulator|car-t|car t|car-nk|tcr|til\b|cell therapy|cell-therapy|nk cell|lymphocyte|stem cell|cord blood|vaccine|mrna|oncolytic|virus|gene therapy|bacteri|oligonucleotide|nucleic acid|test|assay|diagnostic|sequencing|panel|classifier|device|software|imaging|cytokine|fusion|enzyme|protein\b|recombinant|erythropoietin|interferon|growth factor|colony-stimulating|g-csf|interleukin|il-\d|superagonist|toxin|nanoparticle|nanocell|minicell|ligand trap|asparaginase|contrast agent|radiotracer|radioligand|not stated|peptibody|pegylated/i;
/** Small molecules the regex above would wrongly exclude (a nitrogen-mustard conjugate, an enzyme inhibitor, a podophyllotoxin, PROTAC degraders). */
const INCLUDE = new Set(["estramustine", "pevonedistat", "teniposide", "azd9750", "bexobrutideg", "bms-986365", "qlh12016", "rnk05047", "tri-611"]);
/** Bare radioisotopes, macromolecules, oligomer mixtures and combinations: nothing to draw. */
const EXCLUDE = new Set(["phosphorus-32", "radium-223", "tilmanocept-tc99m", "pegvisomant", "romiplostim", "porfimer-sodium", "wjb001"]);
/** Depot or formulation products whose active molecule has its own name. */
const QUERY_OVERRIDE: Record<string, { query: string; label: string }> = {
  cam2029: { query: "octreotide", label: "Octreotide (the peptide in the CAM2029 depot)" },
  "hypericin-sgx301": { query: "hypericin", label: "Hypericin (SGX301)" },
};
const PEPTIDE = /peptide|somatostatin analogue|gnrh|melanocortin/i;
/** Aliases that are formulations, class descriptions or combinations rather than compound names. */
const NOT_A_NAME = /inhibitor|tablet|softgel|capsule|ointment|suspension|oral|\+|agonist|antagonist|single-agent|acid$/i;

type Prop = { CID: number; MolecularFormula: string; MolecularWeight: string; InChIKey: string; IUPACName?: string; ConnectivitySMILES?: string; CanonicalSMILES?: string };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const PROPS = "property/CanonicalSMILES,InChIKey,MolecularFormula,MolecularWeight,IUPACName/JSON";

/** One PUG REST call, cached on disk; 250 ms spacing, one retry on 503, null on 404. */
async function pug(path: string): Promise<unknown | null> {
  const key = join(CACHE, encodeURIComponent(path.toLowerCase()) + ".json");
  if (existsSync(key)) return JSON.parse(readFileSync(key, "utf8"));
  if (requests >= MAX_REQUESTS) throw new Error("request budget exhausted");
  let out: unknown | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    await sleep(250);
    requests++;
    const r = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/${path}`, { headers: { "User-Agent": "OnCo/1.0 (github.com/judegomila/OnCo)" } });
    if (r.ok) { out = await r.json(); break; }
    if (r.status === 503) continue;
    break; // 404 (no such name) or 400
  }
  writeFileSync(key, JSON.stringify(out));
  return out;
}

const props = (j: unknown | null) => (j as { PropertyTable?: { Properties?: Prop[] } } | null)?.PropertyTable?.Properties ?? null;
const lookup = async (name: string) => props(await pug(`name/${encodeURIComponent(name)}/${PROPS}`));

/** Salts and solvates are deposited under their own CID; PubChem's `parent` relation gives the neutral compound. Falls back to the record itself. */
async function parent(p: Prop): Promise<{ prop: Prop; detail?: string }> {
  const j = (await pug(`cid/${p.CID}/cids/JSON?cids_type=parent`)) as { IdentifierList?: { CID?: number[] } } | null;
  const cid = j?.IdentifierList?.CID?.[0];
  if (!cid || cid === p.CID) return { prop: p };
  const pp = props(await pug(`cid/${cid}/${PROPS}`))?.[0];
  return pp ? { prop: pp, detail: `parent of salt CID ${p.CID}` } : { prop: p };
}

type Outcome = { id: string; label: string; query: string; status: "filled" | "no-match" | "ambiguous" | "implausible"; cid?: number; formula?: string; mw?: number; inchikey?: string; detail?: string };

/** One compound from a name hit: a single record, or the single-component parent when all records share one InChIKey skeleton or are that parent's salts. */
function pick(props: Prop[]): { prop: Prop; detail?: string } | { ambiguous: string } {
  if (props.length === 1) return { prop: props[0] };
  const skeletons = new Set(props.map((p) => p.InChIKey.slice(0, 14)));
  const parents = props.filter((p) => !p.MolecularFormula.includes("."));
  if (skeletons.size === 1 && parents.length) return { prop: parents.sort((a, b) => a.CID - b.CID)[0], detail: `${props.length} records, one skeleton` };
  if (parents.length === 1) return { prop: parents[0], detail: `${props.length} records, one parent plus salts` };
  return { ambiguous: props.map((p) => `${p.CID} ${p.MolecularFormula} ${p.InChIKey.slice(0, 14)}`).join("; ") };
}

async function main() {
  const drugs = graph().kind("drug").filter((d) => !hasMolecule(d.id));
  const biologic = drugs.filter((d) => !INCLUDE.has(d.id) && (EXCLUDE.has(d.id) || BIOLOGIC.test(d.modality)));
  const cands = drugs.filter((d) => !biologic.includes(d));
  const outcomes: Outcome[] = [];
  for (const d of cands) {
    const over = QUERY_OVERRIDE[d.id];
    const plain = d.name.replace(/\s*\(.*\)\s*$/, "").trim();
    const names = over ? [over.query] : [...new Set([plain, d.code ?? "", ...d.aka].map((s) => s.trim()).filter((s) => s && !NOT_A_NAME.test(s)))];
    const code = d.code && d.code.toLowerCase() !== plain.toLowerCase() ? d.code : undefined;
    const label = over?.label ?? (code ? `${plain} (${code})` : plain);
    const limit = PEPTIDE.test(d.modality) ? 6000 : 2000;
    let result: Outcome = { id: d.id, label, query: names.join(" / "), status: "no-match" };
    for (const q of names) {
      const props = await lookup(q);
      if (!props?.length) continue;
      const p = pick(props);
      if ("ambiguous" in p) { result = { id: d.id, label, query: q, status: "ambiguous", detail: p.ambiguous }; break; }
      const par = await parent(p.prop);
      const mw = parseFloat(par.prop.MolecularWeight);
      const base = { id: d.id, label, query: q, cid: par.prop.CID, formula: par.prop.MolecularFormula, mw, inchikey: par.prop.InChIKey, detail: [p.detail, par.detail].filter(Boolean).join("; ") || undefined };
      result = mw > limit || mw < 100 ? { ...base, status: "implausible", detail: `MW ${mw} outside range for "${d.modality}"` } : { ...base, status: "filled" };
      break;
    }
    outcomes.push(result);
  }
  const by = (s: Outcome["status"]) => outcomes.filter((o) => o.status === s);
  console.log("id | label | query | status | cid | formula | mw | inchikey | detail");
  for (const o of outcomes) console.log([o.id, o.label, o.query, o.status, o.cid ?? "", o.formula ?? "", o.mw ?? "", o.inchikey ?? "", o.detail ?? ""].join(" | "));
  console.log(`\ncandidates ${cands.length}, filled ${by("filled").length}, skipped as biologic ${biologic.length}, no PubChem match ${by("no-match").length}, ambiguous ${by("ambiguous").length}, implausible weight ${by("implausible").length}, requests ${requests}`);
  if (!APPLY) return;

  const filled = by("filled");
  const idKey = (id: string) => (/^[a-z][a-z0-9]*$/.test(id) ? id : JSON.stringify(id));
  const lines = filled.map((o) => `  ${idKey(o.id)}: [pc(${JSON.stringify(o.label)}, "cid:${o.cid}")],`);
  const path = join(process.cwd(), "src", "data", "structures.ts");
  const src = readFileSync(path, "utf8");
  const marker = "\n};";
  const at = src.lastIndexOf(marker);
  const block = `\n  // Small molecules and peptides resolved by PubChem name lookup on 18 Sept 2026 (scripts/fill-structures.ts), pinned by compound id.\n${lines.join("\n")}\n`;
  writeFileSync(path, src.slice(0, at) + block + src.slice(at));

  const indexPath = join(process.cwd(), "public", "structures", "index.json");
  const index = JSON.parse(readFileSync(indexPath, "utf8")) as Record<string, Array<{ label: string; file: string; note?: string; dim: 2 | 3; source: string; ref: string }>>;
  const failures: string[] = [];
  for (const o of filled) {
    const def = { label: o.label, source: "pubchem" as const, query: `cid:${o.cid}` };
    const r = await pubchem(def);
    if (!r) { failures.push(`${o.id}: cid ${o.cid}`); continue; }
    index[o.id] = [{ label: def.label, file: r.file, note: undefined, dim: r.dim, source: "pubchem", ref: `https://pubchem.ncbi.nlm.nih.gov/compound/${r.cid}` }];
  }
  writeFileSync(indexPath, JSON.stringify(index, null, 0));
  console.log(`wrote ${filled.length} entries to structures.ts and index.json`);
  if (failures.length) console.log(`SDF unresolved (remove these from structures.ts):\n  ${failures.join("\n  ")}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
