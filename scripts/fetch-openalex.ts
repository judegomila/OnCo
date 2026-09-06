/**
 * Oncology research output per institution from OpenAlex (CC0).
 *
 * For each institution entity: resolve an OpenAlex institution id (manual overrides first,
 * then /institutions?search=), then count works whose primary topic subfield is Oncology
 * (OpenAlex subfield 2730) for 2024 and 2025, with summed citations, using the
 * authorships.institutions.lineage filter (includes child institutions).
 *
 * Writes public/openalex/institutions.json (committed). Run: npm run fetch:openalex
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";

const MAILTO = "onco@judegomila.com";
const SUBFIELD = 2730; // Oncology

/** Manual search queries for names OpenAlex search gets wrong. Values starting with "I" and digits are ids. */
const OVERRIDE: Record<string, string> = {
  "johns-hopkins": "Johns Hopkins University",
  "heidelberg-nct": "Heidelberg University",
  dkfz: "German Cancer Research Center",
  "royal-marsden": "Royal Marsden NHS Foundation Trust",
  "icr-london": "Institute of Cancer Research",
  "the-christie": "Christie Hospital",
  "dana-farber": "Dana-Farber Cancer Institute",
  mgh: "Massachusetts General Hospital",
  "mount-sinai": "Icahn School of Medicine at Mount Sinai",
  "mayo-clinic": "Mayo Clinic",
  "cleveland-clinic": "Cleveland Clinic",
  stanford: "Stanford University",
  ucsf: "University of California, San Francisco",
  "ucla-jonsson": "University of California, Los Angeles",
  "penn-abramson": "University of Pennsylvania",
  "michigan-rogel": "University of Michigan",
  "wustl-siteman": "Washington University in St. Louis",
  "fred-hutch": "Fred Hutchinson Cancer Center",
  "city-of-hope": "City of Hope",
  moffitt: "Moffitt Cancer Center",
  "roswell-park": "Roswell Park Comprehensive Cancer Center",
  "broad-institute": "Broad Institute",
  "cold-spring-harbor": "Cold Spring Harbor Laboratory",
  "francis-crick": "Francis Crick Institute",
  nci: "National Cancer Institute",
  "ncc-japan": "I4210145079", // NCC Hospital East (Kashiwa); OpenAlex has no record for the Tokyo hospital
  jfcr: "Japanese Foundation for Cancer Research",
  "int-milan": "Fondazione IRCCS Istituto Nazionale dei Tumori",
  "ieo-milan": "European Institute of Oncology",
  "vall-dhebron": "Vall d'Hebron Institute of Oncology",
  charite: "Charité - Universitätsmedizin Berlin",
  "lmu-munich": "Ludwig-Maximilians-Universität München",
  karolinska: "Karolinska University Hospital",
  "gustave-roussy": "Gustave Roussy",
  "institut-curie": "Institut Curie",
  nki: "Netherlands Cancer Institute",
  "peter-mac": "Peter MacCallum Cancer Centre",
  "princess-margaret": "Princess Margaret Cancer Centre",
  "samsung-medical-center": "Samsung Medical Center",
  "asan-medical-center": "Asan Medical Center",
  snuh: "Seoul National University Hospital",
  severance: "Severance Hospital",
  sysucc: "Sun Yat-sen University Cancer Center",
  fuscc: "Fudan University Shanghai Cancer Center",
  "west-china": "West China Hospital of Sichuan University",
  "cams-cancer-hospital": "Cancer Hospital Chinese Academy of Medical Sciences",
  "tata-memorial": "Tata Memorial Hospital",
  "einstein-sao-paulo": "I2800288331",
  "sirio-libanes": "Hospital Sírio-Libanês",
  "uke-hamburg": "Universitätsklinikum Hamburg-Eppendorf",
  "uniklinik-koeln": "University Hospital Cologne",
  gemelli: "Agostino Gemelli University Polyclinic",
  "la-paz": "Hospital Universitario La Paz",
  "gregorio-maranon": "Hospital General Universitario Gregorio Marañón",
  "md-anderson": "University of Texas MD Anderson Cancer Center",
  mskcc: "Memorial Sloan Kettering Cancer Center",
};

/** Institutions that are societies/agencies/funders rather than research producers; skipped. */
const SKIP = new Set(["asco", "esmo", "aacr", "iarc", "cruk", "curie-nki-eortc"]);

type Row = { openalexId: string; openalexName: string; works2024: number; works2025: number; cited2024: number | null; cited2025: number | null; matchedBy: "override" | "search" };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function getJson(url: string): Promise<Record<string, unknown> | null> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const r = await fetch(`${url}${url.includes("?") ? "&" : "?"}mailto=${MAILTO}`, { headers: { "User-Agent": `OnCo/1.0 (mailto:${MAILTO})` } });
    if (r.ok) return (await r.json()) as Record<string, unknown>;
    if (r.status === 429 || r.status >= 500) { await sleep(1500 * 2 ** attempt); continue; }
    return null;
  }
  return null;
}

const ALLOWED_TYPES = new Set(["education", "healthcare", "facility", "government", "nonprofit", "other"]);

async function resolve(id: string, name: string): Promise<{ oid: string; oname: string; by: Row["matchedBy"] } | null> {
  const ov = OVERRIDE[id];
  if (ov && /^I\d+$/.test(ov)) {
    const j = await getJson(`https://api.openalex.org/institutions/${ov}`);
    if (j && typeof j.display_name === "string") return { oid: ov, oname: j.display_name, by: "override" };
  }
  const q = ov ?? name.split(" / ")[0].replace(/\(.*?\)/g, "").trim();
  const j = await getJson(`https://api.openalex.org/institutions?search=${encodeURIComponent(q)}&per_page=5`);
  const results = ((j?.results as Array<{ id: string; display_name: string; works_count: number; type: string }> | undefined) ?? [])
    .filter((r) => ALLOWED_TYPES.has(r.type) && r.works_count >= 200);
  if (!results.length) return null;
  const best = results.sort((a, b) => b.works_count - a.works_count)[0];
  return { oid: best.id.replace("https://openalex.org/", ""), oname: best.display_name, by: ov ? "override" : "search" };
}

async function count(oid: string, year: number): Promise<{ n: number; cited: number }> {
  const j = await getJson(`https://api.openalex.org/works?filter=authorships.institutions.lineage:${oid},primary_topic.subfield.id:${SUBFIELD},publication_year:${year}&per_page=1&cited_by_count_sum=true`);
  const meta = (j?.meta as { count?: number; cited_by_count_sum?: number } | undefined) ?? {};
  return { n: meta.count ?? 0, cited: meta.cited_by_count_sum ?? 0 };
}

async function main() {
  const g = graph();
  const dir = join(process.cwd(), "public", "openalex");
  const file = join(dir, "institutions.json");
  const force = process.argv.includes("--force");
  const prev: Record<string, Row> = !force && existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")).institutions as Record<string, Row>) : {};
  const out: Record<string, Row> = {};
  const unresolved: string[] = [];
  for (const inst of g.kind("institution")) {
    if (SKIP.has(inst.id)) continue;
    const cached = prev[inst.id];
    if (cached && cached.works2024 > 0 && cached.works2025 > 0 && cached.cited2024 !== null && cached.cited2025 !== null) { out[inst.id] = cached; continue; }
    const r = await resolve(inst.id, inst.name);
    if (!r) { unresolved.push(inst.id); continue; }
    const a = await count(r.oid, 2024);
    const b = await count(r.oid, 2025);
    out[inst.id] = { openalexId: r.oid, openalexName: r.oname, works2024: a.n, works2025: b.n, cited2024: a.cited, cited2025: b.cited, matchedBy: r.by };
    console.log(`${inst.id.padEnd(24)} ${r.oid.padEnd(13)} ${r.oname.slice(0, 40).padEnd(40)} 2024=${a.n} 2025=${b.n} [${r.by}]`);
    await sleep(400);
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, JSON.stringify({ fetched: new Date().toISOString().slice(0, 10), subfield: SUBFIELD, subfieldName: "Oncology", source: "https://openalex.org", license: "CC0", institutions: out }, null, 0));
  console.log(`openalex: ${Object.keys(out).length} institutions resolved; unresolved: ${unresolved.join(", ") || "none"}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
