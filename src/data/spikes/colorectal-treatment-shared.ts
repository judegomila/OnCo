import type { DrugInput, TermInput, TrialInput } from "@/lib/schema";

/**
 * Constants shared by the colorectal treatment files (./colorectal-treatment.ts, -trials.ts). Not a spike.
 * Every URL here was fetched on 2026-09-24: ClinicalTrials.gov v2, Europe PMC, the FDA oncology approval
 * notifications, openFDA labels, the EMA medicine pages and the NICE guidance pages. NICE reference numbers
 * were checked one by one against nice.org.uk; the page title is quoted in the record that uses them.
 */
export const asOf = "2026-09-24";
export const CRC = "colorectal";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (label: string, id: string) => ({ label, url: `https://doi.org/${id}` });
export const nice = (ref: string, label: string) => ({ label, url: `https://www.nice.org.uk/guidance/${ref}` });
export const D = (id: string) => `https://doi.org/${id}`;

export const t = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });
export const d = (x: Omit<DrugInput, "kind" | "asOf">): DrugInput => ({ kind: "drug", asOf, ...x });
export const term = (x: Omit<TermInput, "kind" | "asOf">): TermInput => ({ kind: "term", asOf, ...x });

/** Sources quoted more than once. Papers are DOIs read through Europe PMC; regulator pages are the live URLs. */
export const SRC = {
  // Early disease
  mosaic: D("10.1056/NEJMoa032709"), mosaic6y: D("10.1200/JCO.2008.20.6771"), idea: D("10.1056/NEJMoa1713709"),
  quasar: D("10.1016/S0140-6736(07)61866-2"), foxtrot: D("10.1200/JCO.22.00046"), n0147: D("10.1001/jama.2012.385"),
  petacc8: D("10.1016/S1470-2045(14)70227-X"), scot: D("10.1016/S1470-2045(18)30093-7"), tosca: D("10.1016/j.annonc.2020.10.477"),
  // Rectal
  cao94: D("10.1056/NEJMoa040694"), cao94lt: D("10.1200/JCO.2011.40.1836"), dutchTme: D("10.1056/NEJMoa010580"),
  stockholm3: D("10.1016/S1470-2045(17)30086-4"), stellar: D("10.1200/JCO.21.01667"), cao12: D("10.1200/JCO.19.00308"),
  rapido: D("10.1016/S1470-2045(20)30555-6"), prodige23: D("10.1016/S1470-2045(21)00079-6"), opra5y: D("10.1200/JCO.23.01208"),
  iwwd: D("10.1016/S0140-6736(18)31078-X"), prospect: D("10.1056/NEJMoa2303269"),
  // Metastatic
  avf2107g: D("10.1056/NEJMoa032691"), crystal: D("10.1056/NEJMoa0805019"), prime: D("10.1056/NEJMoa1305275"),
  fire3: D("10.1016/S1470-2045(14)70330-4"), calgb80405: D("10.1001/jama.2017.7105"), opus: D("10.1093/annonc/mdq632"),
  tribe: D("10.1056/NEJMoa1403108"), tribe2: D("10.1016/S1470-2045(19)30862-9"), velour: D("10.1200/JCO.2012.42.8201"),
  raise: D("10.1016/S1470-2045(15)70127-0"), correct: D("10.1016/S0140-6736(12)61900-X"), concur: D("10.1016/S1470-2045(15)70156-7"),
  recourse: D("10.1056/NEJMoa1414325"), fresco: D("10.1001/jama.2018.7855"), fresco2: D("10.1016/S0140-6736(23)00772-9"),
  cairo3: D("10.1016/S0140-6736(14)62004-3"), cairo5: D("10.1016/S1470-2045(23)00219-X"),
  // Biomarker-directed
  swogS1406: D("10.1200/JCO.20.01994"), destinyCrc01: D("10.1016/S1470-2045(21)00086-3"), mountaineer: D("10.1016/S1470-2045(23)00150-X"),
  imblaze370: D("10.1016/S1470-2045(19)30027-0"),
  // Liver and peritoneum
  prodige7: D("10.1016/S1470-2045(20)30599-4"), colopec: D("10.1016/S2468-1253(19)30239-0"), prophylochip: D("10.1016/S1470-2045(20)30322-3"),
  eortc40983: D("10.1016/S1470-2045(13)70447-9"), clocc: D("10.1093/jnci/djx015"), newEpoc: D("10.1016/S1470-2045(19)30798-3"),
  // ctDNA
  dynamic: D("10.1056/NEJMoa2200075"), dynamic3: D("10.1038/s41591-025-04030-w"), altair: D("10.1038/s41591-026-04428-0"),
  galaxy: D("10.1038/s41591-022-02115-4"), circulateJapan: D("10.1111/cas.14926"),
  // Guidelines
  nccnColon: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1428",
  nccnRectal: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1461",
  esmo: "https://www.esmo.org/guidelines/esmo-clinical-practice-guidelines-gastrointestinal-cancers/",
  // NICE (reference number and page title verified on nice.org.uk, 24 September 2026)
  ng151: "https://www.nice.org.uk/guidance/ng151", ta118: "https://www.nice.org.uk/guidance/ta118", ta212: "https://www.nice.org.uk/guidance/ta212",
  ta242: "https://www.nice.org.uk/guidance/ta242", ta307: "https://www.nice.org.uk/guidance/ta307", ta405: "https://www.nice.org.uk/guidance/ta405",
  ta439: "https://www.nice.org.uk/guidance/ta439", ta630: "https://www.nice.org.uk/guidance/ta630", ta644: "https://www.nice.org.uk/guidance/ta644",
  ta668: "https://www.nice.org.uk/guidance/ta668", ta709: "https://www.nice.org.uk/guidance/ta709", ta716: "https://www.nice.org.uk/guidance/ta716",
  ta866: "https://www.nice.org.uk/guidance/ta866", ta914: "https://www.nice.org.uk/guidance/ta914", ta1008: "https://www.nice.org.uk/guidance/ta1008",
  ta1065: "https://www.nice.org.uk/guidance/ta1065", ta1079: "https://www.nice.org.uk/guidance/ta1079", ta1136: "https://www.nice.org.uk/guidance/ta1136",
  // FDA and EMA
  fdaNotices: "https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancerhematologic-malignancies-approval-notifications",
  fdaErbitux: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22ERBITUX%22",
  fdaVectibix: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22VECTIBIX%22",
  fdaAvastin: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22AVASTIN%22",
  fdaZaltrap: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22ZALTRAP%22",
  fdaStivarga: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22STIVARGA%22",
  fdaLonsurf: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22LONSURF%22",
  fdaFruzaqla: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22FRUZAQLA%22",
  fdaBraftovi: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22BRAFTOVI%22",
  emaErbitux: "https://www.ema.europa.eu/en/medicines/human/EPAR/erbitux", emaVectibix: "https://www.ema.europa.eu/en/medicines/human/EPAR/vectibix",
  emaAvastin: "https://www.ema.europa.eu/en/medicines/human/EPAR/avastin", emaZaltrap: "https://www.ema.europa.eu/en/medicines/human/EPAR/zaltrap",
  emaStivarga: "https://www.ema.europa.eu/en/medicines/human/EPAR/stivarga", emaLonsurf: "https://www.ema.europa.eu/en/medicines/human/EPAR/lonsurf",
  emaFruzaqla: "https://www.ema.europa.eu/en/medicines/human/EPAR/fruzaqla", emaBraftovi: "https://www.ema.europa.eu/en/medicines/human/EPAR/braftovi",
};
