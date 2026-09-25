import type { DrugInput, TermInput, TrialInput } from "@/lib/schema";

/** Constants shared by the pancreatic treatment files (./pancreatic-treatment.ts, -trials.ts, -supplements.ts). Not a spike. */
export const asOf = "2026-09-24";
export const PC = "pancreatic";
export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const doi = (label: string, id: string) => ({ label, url: `https://doi.org/${id}` });
export const nice = (ref: string, label: string) => ({ label, url: `https://www.nice.org.uk/guidance/${ref}` });
export const D = (id: string) => `https://doi.org/${id}`;

export const t = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });
export const d = (x: Omit<DrugInput, "kind" | "asOf">): DrugInput => ({ kind: "drug", asOf, ...x });
export const term = (x: Omit<TermInput, "kind" | "asOf">): TermInput => ({ kind: "term", asOf, ...x });

// Sources quoted more than once.
export const SRC = {
  prodige4: D("10.1056/NEJMoa1011923"), mpact: D("10.1056/NEJMoa1304369"), mpactLt: D("10.1093/jnci/dju413"),
  napoli1: D("10.1016/S0140-6736(15)00986-1"), napoli3: D("10.1016/S0140-6736(23)01366-1"),
  prodige24: D("10.1056/NEJMoa1809775"), prodige24y5: D("10.1001/jamaoncol.2022.3829"),
  preopanc1: D("10.1200/JCO.19.02274"), preopanc1lt: D("10.1200/JCO.21.02233"), preopanc2: D("10.1016/S1470-2045(25)00363-8"),
  conko007: D("10.1200/JCO-24-01502"), polo: D("10.1056/NEJMoa1903387"), poloOs: D("10.1200/JCO.21.01604"), panova3: D("10.1200/JCO-25-00746"),
  codebreak100: D("10.1056/NEJMoa2208470"), krystal1: D("10.1200/JCO.23.00434"), conko003: D("10.1200/JCO.2013.53.6995"), pancreox: D("10.1200/JCO.2016.68.5776"),
  jaspac01: D("10.1016/S0140-6736(16)30583-9"), gest: D("10.1200/JCO.2012.43.3680"), apact: D("10.1200/JCO.22.01134"), s1505: D("10.1001/jamaoncol.2020.7328"),
  a021501: D("10.1001/jamaoncol.2022.2319"), a021806design: D("10.1245/s10434-024-15817-5"), halo301: D("10.1200/JCO.20.00590"), sequoia: D("10.1200/JCO.20.02232"),
  canstem: D("10.1016/j.eclinm.2023.101897"), resolve: D("10.1016/j.annonc.2021.01.070"), neolap: D("10.1016/S2468-1253(20)30330-7"), neonax: D("10.1016/j.annonc.2022.09.161"),
  prodige35: D("10.1200/JCO.20.03329"), enrgy: D("10.1056/NEJMoa2405008"), kn158: D("10.1200/JCO.19.02105"), rojas: D("10.1038/s41586-023-06063-y"), sethna: D("10.1038/s41586-024-08508-4"),
  daraxP1: D("10.1056/NEJMoa2505783"), rasolute302: D("10.1056/NEJMoa2605555"), elraglusibRct: D("10.1038/s41591-026-04327-4"), elraglusibP2: D("10.1016/j.esmoop.2025.105122"),
  espac4: D("10.1016/S0140-6736(16)32409-6"), espac4lt: D("10.1200/JCO.24.01118"), espac5: D("10.1016/S2468-1253(22)00348-X"), conko005: D("10.1200/JCO.2017.72.6463"), rtog0848: D("10.1097/COC.0000000000000633"),
  scalop: D("10.1016/S1470-2045(13)70021-4"), scalopLt: D("10.1038/bjc.2017.95"), espac1: D("10.1056/NEJMoa032295"), crossfire: D("10.1016/S2468-1253(24)00017-7"), panfire2: D("10.1148/radiol.2019191109"),
  eclipse: D("10.1158/1078-0432.CCR-18-2992"), wyse: D("10.1200/JCO.2010.32.2750"), koulouris: D("10.1016/j.pan.2020.12.016"), sustent: D("10.1016/j.gie.2009.09.042"), almadi: D("10.1038/ajg.2016.512"),
  paik: D("10.1038/s41395-018-0122-8"), dramb: D("10.1053/j.gastro.2023.04.016"), saito: D("10.1097/MPA.0000000000001079"), iglesia: D("10.1177/2050640620938987"), ponsegromab: D("10.1056/NEJMoa2409515"), cassini: D("10.1002/cam4.3269"),
  esmo2023: D("10.1016/j.annonc.2023.08.009"), asco2020: D("10.1200/JCO.20.01364"), lap07: D("10.1001/jama.2016.4324"), conko001: D("10.1001/jama.2013.279201"), norpact: D("10.1016/S2468-1253(23)00405-3"),
  nccn: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1455",
  ng85: "https://www.nice.org.uk/guidance/ng85/chapter/Recommendations", ta476: "https://www.nice.org.uk/guidance/ta476", ta440: "https://www.nice.org.uk/guidance/ta440", ta630: "https://www.nice.org.uk/guidance/ta630",
  ta644: "https://www.nice.org.uk/guidance/ta644", ta1118: "https://www.nice.org.uk/guidance/terminated/ta1118", ta914: "https://www.nice.org.uk/guidance/ta914", ta25: "https://www.nice.org.uk/guidance/ta25",
  fdaOnivyde: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22ONIVYDE%22", fdaAbraxane: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22ABRAXANE%22",
  fdaLynparza: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22LYNPARZA%22", fdaRasonque: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22RASONQUE%22",
  fdaKeytruda: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22KEYTRUDA%22", fdaBizengri: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22BIZENGRI%22",
  fdaLumakras: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22LUMAKRAS%22", fdaKrazati: "https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22KRAZATI%22",
  fdaNotices: "https://www.fda.gov/drugs/resources-information-approved-drugs/oncology-cancer-hematologic-malignancies-approval-notifications",
  emaOnivyde: "https://www.ema.europa.eu/en/medicines/human/EPAR/onivyde-pegylated-liposomal", emaAbraxane: "https://www.ema.europa.eu/en/medicines/human/EPAR/abraxane", emaLynparza: "https://www.ema.europa.eu/en/medicines/human/EPAR/lynparza",
  emaKeytruda: "https://www.ema.europa.eu/en/medicines/human/EPAR/keytruda", emaTarceva: "https://www.ema.europa.eu/en/medicines/human/EPAR/tarceva", emaVitrakvi: "https://www.ema.europa.eu/en/medicines/human/EPAR/vitrakvi",
  emaRozlytrek: "https://www.ema.europa.eu/en/medicines/human/EPAR/rozlytrek", emaTeysuno: "https://www.ema.europa.eu/en/medicines/human/EPAR/teysuno", emaJemperli: "https://www.ema.europa.eu/en/medicines/human/EPAR/jemperli",
};
