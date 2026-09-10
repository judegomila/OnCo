/** A three-record copy of the API layout in a temporary directory, for the CLI and MCP tests. Not part of the bundles. */
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { encodeAskIndex, deriveAliases } from "../../../src/lib/ask-index";
import { routeFor, type Kind } from "../../../src/lib/schema";

const sg = {
  id: "sacituzumab-govitecan", kind: "drug" as Kind, name: "Sacituzumab govitecan", aka: ["Trodelvy"], brand: "Trodelvy", code: "IMMU-132",
  tldr: "An antibody that carries chemotherapy to TROP2 on tumour cells.",
  summary: "Sacituzumab govitecan is approved for metastatic triple-negative breast cancer after two prior therapies. Neutropenia and diarrhoea are the main grade 3 toxicities. The ASCENT trial showed a survival benefit over chemotherapy.",
  status: "approved", asOf: "2026-08-01", links: [{ label: "FDA label", url: "https://example.org/label" }], tags: ["adc"], modality: "ADC", payload: "SN-38",
  approvals: [{ region: "US", year: 2020, indication: "mTNBC after two prior therapies" }], targets: ["trop2"], cancers: ["tnbc"], trials: ["ascent"], companies: [], related: [],
  toxicity: [{ event: "Neutropenia", grade3PlusPct: 51 }, { event: "Diarrhoea", grade3PlusPct: 10 }],
};
const dato = {
  id: "datopotamab-deruxtecan", kind: "drug" as Kind, name: "Datopotamab deruxtecan", aka: ["Datroway"], brand: "Datroway", code: "DS-1062",
  tldr: "A TROP2 ADC with a topoisomerase I payload for breast and lung cancer.",
  summary: "Datopotamab deruxtecan is a TROP2-directed antibody-drug conjugate. It was approved in 2025 for HR-positive, HER2-negative breast cancer after endocrine therapy and chemotherapy.",
  status: "approved", asOf: "2026-08-01", links: [], tags: ["adc"], modality: "ADC", payload: "Deruxtecan",
  approvals: [{ region: "US", year: 2025, indication: "HR+/HER2- breast cancer" }], targets: ["trop2"], cancers: ["tnbc"], trials: [], companies: [], related: [],
  toxicity: [{ event: "Stomatitis", grade3PlusPct: 7 }],
};
const tnbc = {
  id: "tnbc", kind: "cancer" as Kind, name: "Triple-negative breast cancer (TNBC)", aka: [], tldr: "Breast cancer with no ER, PR or HER2; about 15% of cases and the hardest subtype to treat.",
  summary: "Triple-negative breast cancer lacks the three receptors that other breast cancers are treated through. Chemotherapy, immunotherapy and antibody-drug conjugates are the main options.",
  status: undefined, asOf: "2026-08-01", links: [], tags: [], group: "Breast", pipeline: ["sacituzumab-govitecan"], related: [], drugs: ["sacituzumab-govitecan", "datopotamab-deruxtecan"],
  standardOfCare: [{ setting: "Metastatic, later line", approach: "Sacituzumab govitecan" }],
};

export const FIXTURE_ENTITIES = [sg, dato, tnbc];

const nb = (e: { id: string; kind: Kind; name: string }) => ({ id: e.id, kind: e.kind, name: e.name, route: routeFor(e) });

/** Writes the fixture and returns its path plus a cleanup function. */
export async function writeFixture(): Promise<{ dir: string; cleanup: () => Promise<void> }> {
  const dir = await mkdtemp(join(tmpdir(), "onco-api-"));
  await mkdir(join(dir, "entities"), { recursive: true });
  await mkdir(join(dir, "context"), { recursive: true });
  const w = (name: string, data: unknown) => writeFile(join(dir, name), typeof data === "string" ? data : JSON.stringify(data));
  await w("meta.json", { built: "2026-09-10T00:00:00.000Z", version: "test", counts: { drug: 2, cancer: 1 }, total: 3, license: "test" });
  await w("search.json", FIXTURE_ENTITIES.map((e) => ({ id: e.id, kind: e.kind, name: e.name, aka: e.aka.join(" "), tldr: e.tldr, tags: e.tags.join(" "), route: routeFor(e), status: e.status })));
  await w("drugs.json", [sg, dato]);
  await w("cancers.json", [tnbc]);
  await w("drugs.csv", "# Data from OnCo, test fixture\nid,name,status\nsacituzumab-govitecan,Sacituzumab govitecan,approved\ndatopotamab-deruxtecan,Datopotamab deruxtecan,approved\n");
  await w("entities/sacituzumab-govitecan.json", { entity: sg, route: routeFor(sg), neighbours: { cancer: [nb(tnbc)], drug: [nb(dato)] } });
  await w("entities/datopotamab-deruxtecan.json", { entity: dato, route: routeFor(dato), neighbours: { cancer: [nb(tnbc)], drug: [nb(sg)] } });
  await w("entities/tnbc.json", { entity: tnbc, route: routeFor(tnbc), neighbours: { drug: [nb(sg), nb(dato)] } });
  await w("context/tnbc.md", `# ${tnbc.name}\n\n${tnbc.tldr}\n`);
  await w("ask-index.json", encodeAskIndex({ version: 1, entries: FIXTURE_ENTITIES.map((e) => ({ id: e.id, kind: e.kind, name: e.name, aliases: deriveAliases({ id: e.id, kind: e.kind, name: e.name, aka: e.aka, brand: "brand" in e ? e.brand : undefined, code: "code" in e ? e.code : undefined }), route: routeFor(e), status: e.status })), pairs: [] }));
  return { dir, cleanup: () => rm(dir, { recursive: true, force: true }) };
}
