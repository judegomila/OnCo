import type { EntityInput, PaperInput, TermInput, TrialInput } from "@/lib/schema";
import type { Spike } from "./index";
import { GB, asOf, ct, doi, pubmed } from "./gallbladder-evidence-shared";
import { gallbladderSurgeryPapers } from "./gallbladder-evidence-papers-surgery";
import { gallbladderEpidemiologyPapers } from "./gallbladder-evidence-papers-epidemiology";
import { gallbladderIdeas, gallbladderRoadmap } from "./gallbladder-evidence-roadmap";

/**
 * GALLBLADDER CANCER: EVIDENCE, HISTORY, ROADMAP AND IDEAS (agent E of the September 2026 deep dive).
 *
 * Every paper record carries verbatim metadata from the Europe PMC record read on 2026-09-24 (title, authors,
 * journal, year, DOI, PMID); summaries paraphrase the indexed abstract and findings quote only its figures. Where
 * Europe PMC indexes no abstract (the ESMO guideline, the AJCC eighth-edition editorial, the Chilean programme
 * evaluation in the American Journal of Epidemiology) the record says so and carries no numbers. Registry dates
 * in the roadmap's watch list are quoted from ClinicalTrials.gov v2 records read the same day. Historical dates
 * come from indexed papers (Hardy 1993 for Langenbuch's 1882 cholecystectomy; Glenn and Hays 1954; Nevin 1976).
 *
 * The cancer this file patches is the existing `gallbladder` record (src/data/spikes/nci-rare-other.ts). If the
 * deep dive renames it or adds a `gallbladder-cancer` record, change GB below and nothing else.
 *
 * Papers the corpus already held are linked by id, not repeated: ABC-02, BILCAP, TOPAZ-1, KEYNOTE-966 and
 * DESTINY-PanTumor02 primaries, the HERIZON-BTC-01 primary (paper-harding-lancet-oncol) and the WHO 2019
 * digestive tumours classification (paper-who-2019-digestive-system-tumours-nagtegaal-histopathology-2020).
 */

type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, tags: ["gallbladder-evidence"], ...x });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, tags: ["gallbladder-evidence"], ...x });
type Tm = Omit<TermInput, "kind" | "asOf">;
const term = (x: Tm): TermInput => ({ kind: "term", asOf, ...x });

const HERIZON_01_PAPER = "paper-harding-lancet-oncol";

// ======================= TERMS =======================
const terms: TermInput[] = [
  term({ id: "incidental-gallbladder-cancer", name: "Incidental gallbladder cancer", aka: ["iGBC", "Incidental gallbladder carcinoma", "Occult gallbladder cancer"], category: "Clinical",
    tldr: "A gallbladder cancer that nobody suspected before the operation, found by the pathologist in a gallbladder removed for gallstones.",
    summary: "Between about 0.25 and 0.9 percent of gallbladders removed for presumed benign disease turn out to contain cancer (Soreide 2019; pooled estimate 0.6 percent in Pyo 2020). Most are early: about a third pT1 and about half pT2. Tumours confined to the mucosa (T1a) are cured by the cholecystectomy itself; T1b or deeper tumours are referred for a second, radical operation because residual disease is found in roughly a third to a half of re-resection specimens (Pawlik 2007, de Savornin Lohman 2020). The timing of that second operation, whether routine histology of every gallbladder is needed, and whether chemotherapy should come before it (OPT-IN, GAIN) are the open questions.",
    cancers: [GB], terms: ["radical-cholecystectomy", "tnm-staging"], keyPapers: ["paper-soreide-incidental-gallbladder-cancer-review-bjs-2019", "paper-pyo-incidental-gallbladder-cancer-meta-analysis-jcm-2020", "paper-pawlik-incidental-gallbladder-cancer-residual-disease-jgs-2007"] }),
  term({ id: "radical-cholecystectomy", name: "Radical (extended) cholecystectomy", aka: ["Extended cholecystectomy", "Re-resection for gallbladder cancer", "Revision surgery", "Liver bed resection with lymphadenectomy"], category: "Procedures",
    tldr: "The cancer operation for the gallbladder: removing the gallbladder together with a rim of liver beneath it (segments 4b and 5) and the nearby lymph nodes, and the bile duct if its margin is involved.",
    summary: "Described by Glenn and Hays in 1954, radical cholecystectomy removes the gallbladder bed (a wedge or the anatomical segments IVb and V), clears the portal lymph nodes and, when the cystic duct margin is positive, excises the extrahepatic bile duct. For incidental cancers it is done as a second operation; observational series and the Dutch registry associate it with much longer survival (median 52.6 versus 13.7 months in unmatched comparison), and the UK CAPBIL study found 97.9 percent of liver resections were segment 4b/5 resections. Whether T1b and peritoneal-side T2a tumours need the liver resection is contested (Kim 2018; Kang 2021).",
    cancers: [GB], terms: ["incidental-gallbladder-cancer", "hepatectomy", "lymphadenectomy", "t2a-t2b-gallbladder"], keyPapers: ["paper-de-savornin-lohman-re-resection-incidental-gallbladder-cancer-aso-2020", "paper-kim-t1b-gallbladder-cancer-international-jhbps-2018"] }),
  term({ id: "t2a-t2b-gallbladder", name: "T2a and T2b gallbladder cancer (peritoneal side versus hepatic side)", aka: ["T2 tumour location", "Hepatic-side gallbladder cancer", "Peritoneal-side gallbladder cancer"], category: "Pathology",
    tldr: "Since 2017 a gallbladder tumour that has reached the muscle layer is split by which side of the gallbladder it sits on: the free side facing the abdomen (T2a) does better than the side stuck to the liver (T2b).",
    summary: "Shindoh and colleagues showed in 437 resected patients that hepatic-side T2 tumours carried more vascular, neural and nodal invasion and worse survival (five-year survival 42.6 versus 64.7 percent; hazard ratio 2.7). The eighth edition of the AJCC staging manual (2017) adopted the split as T2a (peritoneal side) and T2b (hepatic side). Meta-analyses confirm the prognostic gap (hazard ratio about 2.1 to 3.2) and suggest liver resection helps T2b but may be unnecessary for T2a, a question no randomised trial has yet answered.",
    cancers: [GB], terms: ["tnm-staging", "radical-cholecystectomy"], keyPapers: ["paper-shindoh-t2-gallbladder-cancer-tumour-location-ann-surg-2015", "paper-kang-t2-gallbladder-cancer-location-meta-analysis-jcm-2021"] }),
  term({ id: "gallbladder-polyp", name: "Gallbladder polyp", aka: ["Polypoid lesion of the gallbladder", "Gallbladder polypoid lesion"], category: "Clinical",
    tldr: "A small growth on the inside wall of the gallbladder, seen on ultrasound in about one adult in twenty; nearly all are harmless, and size is the main clue to the rare ones that are not.",
    summary: "Polypoid lesions are found on 4 to 6 percent of adult abdominal ultrasound scans. Most are cholesterol deposits or adenomyomatosis rather than true neoplasms; in a 20-year Kaiser Permanente cohort of 35,856 people with polyps the cancer rate was 11.3 per 100,000 person-years and did not differ from people without polyps, though it rose steeply above 10 mm. The 2022 joint European guideline advises cholecystectomy at 10 mm or more, at 6 to 9 mm with risk factors (age over 60, primary sclerosing cholangitis, Asian ethnicity, sessile shape), and two years of ultrasound follow-up for the rest.",
    cancers: [GB], technologies: ["ultrasound"], terms: ["screening", "overdiagnosis"], keyPapers: ["paper-gallbladder-polyp-joint-guideline-eur-radiol-2022", "paper-szpakowski-gallbladder-polyps-20-year-cohort-jama-netw-open-2020"] }),
  term({ id: "prophylactic-cholecystectomy", name: "Prophylactic (preventive) cholecystectomy", aka: ["Preventive cholecystectomy", "Chilean GES cholecystectomy programme"], category: "Epidemiology & prevention",
    tldr: "Removing a gallbladder that contains stones before it causes trouble, in the hope of preventing a cancer that almost always arises in a gallbladder with stones. Chile has run a national programme since 2006.",
    summary: "Because nearly all gallbladder cancers arise in gallbladders with stones and chronic inflammation, high-incidence countries have considered removing stone-bearing gallbladders preventively. In 2006 Chile's Explicit Health Guarantees (GES) programme guaranteed cholecystectomy for symptomatic gallstones at ages 35 to 49; by 2024 it had issued 284,139 notifications. Evaluations find national mortality falling before and after the programme and a faster fall in the targeted age group, but no clear break in the trend, and areas of high incidence are not always the areas of high uptake. Whether the operation should be targeted by region, ancestry or risk score rather than by age is the live question.",
    cancers: [GB], terms: ["screening", "overdiagnosis", "gallbladder-polyp"], institutions: ["falp-chile"], keyPapers: ["paper-samaniego-chile-ges-programme-evaluation-rev-med-chile-2024", "paper-mardones-frenz-chile-ges-mortality-rev-med-chile-2019"] }),
];

// ======================= TRIALS (the ones the corpus lacked) =======================
const trials: TrialInput[] = [
  t({ id: "herizon-btc-01", name: "HERIZON-BTC-01", nct: "NCT04466891", phase: "2", status: "positive", yearReported: 2023, sponsor: "Jazz Pharmaceuticals", enrolled: 87,
    setting: "HER2-amplified unresectable or metastatic biliary tract cancer after gemcitabine-based therapy: single-arm zanidatamab",
    tldr: "The single-arm trial that won zanidatamab its approval: about four in ten patients with HER2-positive bile duct or gallbladder cancer responded after chemotherapy had failed.",
    summary: "HERIZON-BTC-01 enrolled 87 patients at 32 sites in nine countries between September 2020 and March 2022; 80 were HER2 immunohistochemistry 2+ or 3+ (cohort 1). Zanidatamab 20 mg/kg every two weeks produced confirmed objective responses in 33 of 80 (41.3 percent, 95 percent CI 30.4 to 52.8) by independent central review; 18 percent had grade 3 treatment-related adverse events and there were no treatment-related deaths. It supported the FDA accelerated approval of November 2024 and is being confirmed in first line by HERIZON-BTC-302.",
    result: "Confirmed objective response rate 41.3 percent (95 percent CI 30.4 to 52.8) in HER2-positive cohort 1.",
    outcomes: [{ endpoint: "Confirmed objective response rate (cohort 1, central review)", primary: true, unit: "%", arms: [{ name: "Zanidatamab", n: 80, value: 41.3 }], ci: [30.4, 52.8], source: "https://doi.org/10.1016/S1470-2045(23)00242-5" }],
    drugs: ["zanidatamab"], targets: ["her2"], technologies: ["bispecific-antibody"], cancers: [GB, "cholangiocarcinoma", "biliary-tract-cancer"], companies: ["jazz", "zymeworks", "beone"], related: ["herizon-btc-302"], keyPapers: [HERIZON_01_PAPER],
    links: [ct("NCT04466891"), doi("10.1016/S1470-2045(23)00242-5", "Lancet Oncol 2023")] }),
  t({ id: "nifty", name: "NIFTY", nct: "NCT03524508", phase: "2", status: "positive", yearReported: 2021, sponsor: "Asan Medical Center (Changhoon Yoo)", enrolled: 178,
    setting: "Metastatic biliary tract cancer after gemcitabine-cisplatin: liposomal irinotecan plus fluorouracil and leucovorin vs fluorouracil and leucovorin",
    tldr: "A Korean randomised trial in which adding liposomal irinotecan to fluorouracil lengthened the time before second-line bile duct and gallbladder cancer grew; a later German trial did not reproduce the gain.",
    summary: "NIFTY randomised 174 analysed patients at five Korean centres (88 to liposomal irinotecan plus fluorouracil and leucovorin, 86 to fluorouracil and leucovorin) after progression on gemcitabine plus cisplatin. Median progression-free survival by blinded central review was 7.1 versus 1.4 months (hazard ratio 0.56, 95 percent CI 0.39 to 0.81). Grade 3 to 4 neutropenia was 24 versus 1 percent and serious adverse events 42 versus 24 percent. The German NALIRICC trial later found no benefit, so the regimen sits beside FOLFOX as an option rather than a standard.",
    result: "Median progression-free survival 7.1 vs 1.4 months; hazard ratio 0.56 (95 percent CI 0.39 to 0.81).",
    outcomes: [{ endpoint: "Progression-free survival (blinded central review)", primary: true, unit: "months", arms: [{ name: "Liposomal irinotecan + 5-FU/LV", n: 88, value: 7.1 }, { name: "5-FU/LV", n: 86, value: 1.4 }], hr: 0.56, ci: [0.39, 0.81], p: "0.0019", source: "https://doi.org/10.1016/S1470-2045(21)00486-1" }],
    replication: "Not reproduced by NALIRICC (AIO, 2024).",
    drugs: ["irinotecan", "fluorouracil", "leucovorin"], technologies: ["cytotoxic-chemotherapy"], cancers: [GB, "cholangiocarcinoma", "biliary-tract-cancer"], institutions: ["asan-medical-center"], people: ["ghassan-abou-alfa"], related: ["naliricc", "abc-06"],
    links: [ct("NCT03524508"), doi("10.1016/S1470-2045(21)00486-1", "Lancet Oncol 2021")] }),
  t({ id: "swog-s0809", name: "SWOG S0809", nct: "NCT00789958", phase: "2", status: "completed", yearReported: 2015, sponsor: "SWOG Cancer Research Network", enrolled: 105,
    setting: "Resected extrahepatic cholangiocarcinoma or gallbladder cancer (pT2 to 4, node-positive or margin-positive): adjuvant gemcitabine-capecitabine then capecitabine with radiotherapy",
    tldr: "The only prospective trial of chemotherapy followed by radiotherapy after gallbladder or bile duct surgery: two in three patients were alive at two years, even when the margin had been involved, but with no comparison group the benefit is unproven.",
    summary: "S0809 treated 79 eligible patients (68 percent extrahepatic cholangiocarcinoma, 32 percent gallbladder cancer; 54 R0, 25 R1) with four cycles of gemcitabine and capecitabine followed by 45 Gy to the regional nodes and 54 to 59.4 Gy to the tumour bed with concurrent capecitabine. Two-year survival was 65 percent (95 percent CI 53 to 74), 67 percent after R0 and 60 percent after R1 resection; median overall survival was 35 months. Grade 3 and 4 adverse effects occurred in 52 and 11 percent. It is the evidence behind guideline options for chemoradiation after R1 or node-positive resection, and no phase 3 has followed it.",
    result: "Two-year overall survival 65 percent (95 percent CI 53 to 74); median overall survival 35 months.",
    outcomes: [{ endpoint: "Two-year overall survival", primary: true, unit: "%", arms: [{ name: "Gemcitabine-capecitabine then chemoradiation (all)", n: 79, value: 65 }, { name: "R0 subgroup", n: 54, value: 67 }, { name: "R1 subgroup", n: 25, value: 60 }], ci: [53, 74], source: "https://doi.org/10.1200/JCO.2014.60.2219" }],
    drugs: ["gemcitabine", "capecitabine"], technologies: ["cytotoxic-chemotherapy"], terms: ["chemoradiation", "radiotherapy"], cancers: [GB, "extrahepatic-cholangiocarcinoma"], institutions: ["swog"], related: ["bilcap", "polcagb"],
    links: [ct("NCT00789958"), doi("10.1200/JCO.2014.60.2219", "J Clin Oncol 2015")] }),
  t({ id: "opt-in", name: "OPT-IN (EA2197)", nct: "NCT04559139", phase: "2/3", status: "active", sponsor: "ECOG-ACRIN Cancer Research Group", enrolled: 186,
    setting: "Incidental gallbladder cancer after cholecystectomy (T2 to T3): gemcitabine-cisplatin before and after re-resection vs re-resection then adjuvant chemotherapy",
    tldr: "A US trial asking whether people whose gallbladder cancer was found by chance should have chemotherapy before their second operation rather than only after it.",
    summary: "OPT-IN randomises patients with incidentally found T2 to T3 gallbladder cancer to perioperative gemcitabine and cisplatin (before and after radical re-resection) or to re-resection followed by adjuvant chemotherapy. The registry lists an estimated 186 participants, a start date of 24 February 2021, a status of active but not recruiting and an estimated primary completion date of 1 July 2028. It is the first randomised test of the neoadjuvant idea for incidental cancer in a Western population.",
    drugs: ["gemcitabine-cisplatin"], terms: ["incidental-gallbladder-cancer", "neoadjuvant-adjuvant", "radical-cholecystectomy"], cancers: [GB], institutions: ["ecog-acrin"], related: ["gain-igbc"],
    links: [ct("NCT04559139"), doi("10.1245/s10434-021-10277-7", "Trial in progress, Ann Surg Oncol 2022")] }),
  t({ id: "gain-igbc", name: "GAIN (AIO/CALGP/ACO)", nct: "NCT03673072", phase: "3", status: "completed", sponsor: "Krankenhaus Nordwest", enrolled: 68,
    setting: "Incidental gallbladder cancer before re-resection, and resectable cholangiocarcinoma: three cycles of gemcitabine-cisplatin before and after surgery vs surgery first",
    tldr: "A German phase 3 of chemotherapy before the second operation for incidental gallbladder cancer that closed in October 2024 with 68 of a planned 333 participants; its report will show how much a small trial can say.",
    summary: "GAIN, built on the German Registry of Incidental Gallbladder Carcinoma, planned 333 patients randomised to three cycles of gemcitabine and cisplatin before and after radical surgery or to surgery alone with therapy of the investigator's choice; the primary endpoint was overall survival. Recruitment began in August 2019. ClinicalTrials.gov records an actual enrolment of 68 and completion on 10 October 2024, so the trial closed well short of its target and its result will be underpowered.",
    drugs: ["gemcitabine-cisplatin"], terms: ["incidental-gallbladder-cancer", "neoadjuvant-adjuvant"], cancers: [GB, "cholangiocarcinoma"], institutions: ["krankenhaus-nordwest"], related: ["opt-in"], keyPapers: ["paper-gain-trial-protocol-bmc-cancer-2020"],
    links: [ct("NCT03673072"), doi("10.1186/s12885-020-6610-4", "Protocol, BMC Cancer 2020")] }),
  t({ id: "polcagb", name: "POLCAGB", nct: "NCT02867865", phase: "2/3", status: "active", sponsor: "Tata Memorial Hospital", enrolled: 124,
    setting: "Locally advanced (T3 to T4) gallbladder cancer: neoadjuvant chemoradiotherapy vs neoadjuvant gemcitabine-based chemotherapy before attempted resection",
    tldr: "An Indian randomised trial asking whether adding radiotherapy to chemotherapy before surgery shrinks locally advanced gallbladder cancer enough to help people live longer.",
    summary: "POLCAGB, run at Tata Memorial Hospital in Mumbai, randomises biopsy-proven locally advanced (T3 to T4) gallbladder cancer without metastases to gemcitabine-based chemotherapy alone or to chemoradiation, with overall survival as the primary endpoint. The protocol planned 314 patients to detect a 5.5-month gain in median survival (11 months in the control arm, hazard ratio 0.7). The registry lists 124 actual participants, a status of active but not recruiting, an estimated primary completion date of 10 September 2025 and study completion of 10 September 2027. It is registered with the Clinical Trials Registry India as CTRI/2016/08/007199.",
    drugs: ["gemcitabine"], terms: ["chemoradiation", "neoadjuvant-adjuvant", "radiotherapy"], cancers: [GB], institutions: ["tata-memorial"], keyPapers: ["paper-polcagb-protocol-bmj-open-2019"],
    links: [ct("NCT02867865"), doi("10.1136/bmjopen-2018-028147", "Protocol, BMJ Open 2019")] }),
  t({ id: "acticca-1", name: "ACTICCA-1", nct: "NCT02170090", phase: "3", status: "active", sponsor: "Universitaetsklinikum Hamburg-Eppendorf", enrolled: 789,
    setting: "Resected cholangiocarcinoma and muscle-invasive gallbladder cancer: adjuvant gemcitabine-cisplatin vs standard of care (capecitabine after the BILCAP amendment)",
    tldr: "The large European trial that will say whether the two-drug chemotherapy used for advanced disease beats capecitabine tablets as the treatment after surgery for bile duct and gallbladder cancer.",
    summary: "ACTICCA-1 opened in April 2014 comparing adjuvant gemcitabine and cisplatin with observation, and after BILCAP reported its control arm became capecitabine. The registry lists 789 actual participants, a status of active but not recruiting, and an estimated primary completion date of December 2025 (last updated 30 March 2025). Its readout is the next thing that could change adjuvant care for gallbladder cancer, where BILCAP's evidence is borrowed from a mixed biliary population.",
    drugs: ["gemcitabine-cisplatin", "capecitabine"], terms: ["neoadjuvant-adjuvant"], cancers: [GB, "cholangiocarcinoma", "biliary-tract-cancer"], related: ["bilcap"],
    links: [ct("NCT02170090")] }),
  t({ id: "artemide-biliary01", name: "ARTEMIDE-Biliary01", nct: "NCT06109779", phase: "3", status: "active", sponsor: "AstraZeneca", enrolled: 760,
    setting: "Resected biliary tract cancer: adjuvant rilvegostomig plus chemotherapy vs placebo plus chemotherapy",
    tldr: "A global trial testing whether a two-target immunotherapy added to chemotherapy after surgery stops bile duct and gallbladder cancer coming back.",
    summary: "ARTEMIDE-Biliary01 is a double-blind phase 3 of the PD-1 and TIGIT bispecific antibody rilvegostomig with chemotherapy, against placebo with chemotherapy, after curative-intent resection of biliary tract cancer. The registry lists 760 actual participants, a start of 4 December 2023, a status of active but not recruiting, an estimated primary completion date of 2 January 2029 and study completion of 3 May 2030. It is the first adjuvant immunotherapy phase 3 to include gallbladder cancer.",
    drugs: ["rilvegostomig"], technologies: ["checkpoint-inhibitor", "bispecific-antibody"], terms: ["neoadjuvant-adjuvant"], cancers: [GB, "cholangiocarcinoma", "biliary-tract-cancer"], companies: ["astrazeneca"], related: ["bilcap", "acticca-1"],
    links: [ct("NCT06109779")] }),
];


// ======================= PAPERS =======================
const guidelines: PaperInput[] = [
  p({ id: "paper-esmo-biliary-tract-cancer-guideline-ann-oncol-2023", name: "Biliary tract cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up",
    tldr: "The European oncology society's 2023 guideline for bile duct and gallbladder cancer, covering how the diseases are diagnosed, staged, operated on, treated with drugs and followed up.",
    summary: "ESMO Clinical Practice Guideline for biliary tract cancer, published in Annals of Oncology in 2023 by Vogel, Bridgewater, Edeline and colleagues for the ESMO Guidelines Committee. Europe PMC indexes no abstract for this article, so OnCo carries no figures from it; the guideline itself is open on the ESMO website and covers diagnosis, molecular testing, resection and adjuvant capecitabine, first-line gemcitabine-cisplatin with durvalumab, and later-line targeted options.",
    journal: "Annals of Oncology", year: 2023, doi: "10.1016/j.annonc.2022.10.506", pmid: "36372281",
    authors: "Vogel A, Bridgewater J, Edeline J, et al.", paperType: "guideline", changedPractice: true,
    findings: ["No abstract is indexed on Europe PMC; recommendations are read from the guideline itself."],
    whatItMeans: "This is the reference European standard against which UK and NHS practice for gallbladder cancer is compared; it treats gallbladder cancer within biliary tract cancer rather than as its own disease.",
    caveats: ["Gallbladder cancer recommendations are largely extrapolated from mixed biliary trials.", "Published before the zanidatamab approvals of 2024 and 2025."],
    links: [doi("10.1016/j.annonc.2022.10.506", "Ann Oncol 2023"), pubmed("36372281"), { label: "ESMO guidelines: gastrointestinal cancers", url: "https://www.esmo.org/guidelines/guidelines-by-topic/gastrointestinal-cancers" }],
    cancers: [GB, "cholangiocarcinoma", "biliary-tract-cancer"], institutions: ["esmo"], people: ["john-primrose", "juan-valle"], journals: ["annals-of-oncology"], related: ["esmo-guidelines"] }),
  p({ id: "paper-nccn-biliary-tract-cancers-v2-2025-jnccn-2025", name: "Biliary Tract Cancers, Version 2.2025, NCCN Clinical Practice Guidelines In Oncology",
    tldr: "The 2025 summary of the US NCCN guideline for gallbladder and bile duct cancers, focused on what to give after surgery.",
    summary: "Journal summary of the NCCN Guidelines for Biliary Tract Cancers, version 2.2025, which cover gallbladder cancer, intrahepatic and extrahepatic cholangiocarcinoma. The panel meets at least yearly to review requests and new data; this manuscript focuses on the adjuvant chemotherapy and chemoradiation recommendations. The 2023 Insights paper (Benson et al., JNCCN 2023, PMID 37433432) recorded the split of the former Hepatobiliary Cancers guideline into separate Hepatocellular Carcinoma and Biliary Tract Cancers guidelines.",
    journal: "Journal of the National Comprehensive Cancer Network", year: 2025, doi: "10.6004/jnccn.2025.0042", pmid: "40930144",
    authors: "Benson AB, D'Angelica MI, Abrams T, et al.", paperType: "guideline", changedPractice: true,
    findings: ["Covers gallbladder cancer, intrahepatic and extrahepatic cholangiocarcinoma; this version's text concentrates on adjuvant chemotherapy and chemoradiation."],
    whatItMeans: "NCCN is the source of the category grades quoted on the gallbladder cancer page; the adjuvant section leans on BILCAP for capecitabine and on SWOG S0809 for chemoradiation after margin-positive or node-positive resection.",
    caveats: ["The full guideline requires free registration on nccn.org; the JNCCN article is a summary.", "Adjuvant recommendations for gallbladder cancer rest on subgroup and single-arm data."],
    links: [doi("10.6004/jnccn.2025.0042", "JNCCN 2025"), pubmed("40930144"), { label: "NCCN Guidelines: Biliary Tract Cancers", url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1517" }],
    cancers: [GB, "cholangiocarcinoma"], trials: ["bilcap", "swog-s0809"], journals: ["jnccn"], related: ["nccn"] }),
  p({ id: "paper-bsg-cholangiocarcinoma-guideline-gut-2023", name: "British Society of Gastroenterology guidelines for the diagnosis and management of cholangiocarcinoma",
    tldr: "The UK gastroenterology society's 2023 guideline for bile duct cancer, written with patient charities; there is no equivalent UK guideline written for gallbladder cancer.",
    summary: "Guideline commissioned by the British Society of Gastroenterology liver section, written by a multidisciplinary committee with patient and public representatives from AMMF (the Cholangiocarcinoma Charity) and PSC Support, with evidence graded in the AGREE II format. The recommendations are framed as guidance rather than protocol. Its scope is cholangiocarcinoma; a Europe PMC search on 24 September 2026 found no UK society guideline specific to gallbladder cancer, so UK gallbladder practice draws on this document, the ESMO guideline and NCCN.",
    journal: "Gut", year: 2023, doi: "10.1136/gutjnl-2023-330029", pmid: "37770126",
    authors: "Rushbrook SM, Kendall TJ, Zen Y, et al.", paperType: "guideline", changedPractice: true,
    findings: ["Multidisciplinary UK guideline for cholangiocarcinoma with patient representation and AGREE II grading; gallbladder cancer is outside its stated scope."],
    whatItMeans: "For a UK patient with gallbladder cancer the nearest national guideline is about a neighbouring disease; the gap is one the UK layer of this deep dive should name.",
    caveats: ["Scope is cholangiocarcinoma, not gallbladder cancer.", "Guidance rather than protocol, by the authors' own framing."],
    links: [doi("10.1136/gutjnl-2023-330029", "Gut 2023"), pubmed("37770126")],
    cancers: ["cholangiocarcinoma", GB], people: ["juan-valle"], related: ["paper-esmo-biliary-tract-cancer-guideline-ann-oncol-2023"] }),
  p({ id: "paper-gallbladder-polyp-joint-guideline-eur-radiol-2022", name: "Management and follow-up of gallbladder polyps: updated joint guidelines between the ESGAR, EAES, EFISDS and ESGE",
    tldr: "The 2022 European rules for gallbladder polyps found on ultrasound: operate at 10 mm or more, operate at 6 to 9 mm if there are risk factors, scan again for two years otherwise, and stop watching tiny polyps in people without risk factors.",
    summary: "Update of the 2017 joint recommendations of the European Society of Gastrointestinal and Abdominal Radiology, the European Association for Endoscopic Surgery, the European Federation of the International Society of Digestive Surgery and the European Society of Gastrointestinal Endoscopy. Ultrasound is the primary investigation. Cholecystectomy is recommended for polypoid lesions of 10 mm or more (strong recommendation, low-quality evidence), for symptomatic polyps, and for 6 to 9 mm polyps with a risk factor: age over 60, primary sclerosing cholangitis, Asian ethnicity, or a sessile lesion including focal wall thickening over 4 mm.\n\nPolyps of 6 to 9 mm without risk factors, or 5 mm or less with risk factors, get ultrasound at 6 months, 1 and 2 years and are discharged if they have not grown; 5 mm or less without risk factors need no follow-up. Growth to 10 mm means surgery; growth of 2 mm or more within two years prompts multidisciplinary discussion; a polyp that disappears ends monitoring.",
    journal: "European Radiology", year: 2022, doi: "10.1007/s00330-021-08384-w", pmid: "34918177",
    authors: "Foley KG, Lahaye MJ, Thoeni RF, et al.", paperType: "guideline", changedPractice: true,
    findings: ["Cholecystectomy for polypoid lesions of 10 mm or more (strong recommendation, low-quality evidence).", "Cholecystectomy for 6 to 9 mm lesions with a risk factor: age over 60, primary sclerosing cholangitis, Asian ethnicity, sessile shape or wall thickening over 4 mm.", "Ultrasound at 6 months, 1 year and 2 years for 6 to 9 mm lesions without risk factors and 5 mm or smaller lesions with them; no follow-up for 5 mm or smaller lesions without risk factors.", "Growth to 10 mm: surgery; growth of 2 mm or more within two years: multidisciplinary review."],
    whatItMeans: "This is the polyp pathway UK radiologists and surgeons follow (a UK author, Foley, leads it). It is a surveillance-and-surgery guideline built on low to moderate quality evidence, and the Kaiser Permanente cohort published two years earlier questions whether following small polyps finds cancer at all.",
    caveats: ["Most recommendations rest on low to moderate quality evidence.", "The 10 mm threshold has only moderate accuracy for neoplasia (Wennmacker 2019)."],
    links: [doi("10.1007/s00330-021-08384-w", "Eur Radiol 2022"), pubmed("34918177")],
    cancers: [GB], technologies: ["ultrasound"], terms: ["gallbladder-polyp", "screening", "overdiagnosis"] }),
  p({ id: "paper-jshbps-biliary-tract-cancer-guidelines-2019-jhbps-2021", name: "Clinical practice guidelines for the management of biliary tract cancers 2019: The 3rd English edition",
    tldr: "Japan's surgical society guideline for bile duct, gallbladder and ampullary cancer, the only major guideline with a section on preventive treatment.",
    summary: "Third English edition of the Japanese Society of Hepato-Biliary-Pancreatic Surgery guidelines, first issued in 2007 and revised in 2014. Thirty-one clinical questions cover six topics: prophylactic treatment, diagnosis, biliary drainage, surgical treatment, chemotherapy and radiation therapy, graded with GRADE as strong (14 recommendations) or weak (14), with three questions left without a recommendation.",
    journal: "Journal of Hepato-Biliary-Pancreatic Sciences", year: 2021, doi: "10.1002/jhbp.870", pmid: "33259690",
    authors: "Nagino M, Hirano S, Yoshitomi H, et al.", paperType: "guideline", changedPractice: true,
    findings: ["31 clinical questions across six topics including prophylactic treatment.", "14 strong and 14 weak recommendations; three questions with no recommendation."],
    whatItMeans: "Japanese surgeons operate on gallbladder cancer far more often than UK surgeons and their guideline addresses prevention (pancreaticobiliary maljunction, polyps) as a clinical topic, which Western guidelines do not.",
    caveats: ["Surgical-society guideline; systemic therapy sections predate the immunotherapy trials.", "Evidence for many surgical questions is retrospective."],
    links: [doi("10.1002/jhbp.870", "J Hepatobiliary Pancreat Sci 2021"), pubmed("33259690")],
    cancers: [GB, "cholangiocarcinoma", "ampullary"], terms: ["radical-cholecystectomy", "prophylactic-cholecystectomy"] }),
];

const trialPapers: PaperInput[] = [
  p({ id: "paper-abc-06-folfox-second-line-lancet-oncol-2021", name: "Second-line FOLFOX chemotherapy versus active symptom control for advanced biliary tract cancer (ABC-06): a phase 3, open-label, randomised, controlled trial",
    tldr: "The UK trial that showed a second chemotherapy, FOLFOX, helps people with advanced bile duct or gallbladder cancer live about a month longer on average once gemcitabine and cisplatin stop working, with one in four alive at a year instead of one in nine.",
    summary: "ABC-06 randomised 162 patients at 20 UK sites between March 2014 and January 2018, after progression on cisplatin and gemcitabine, to active symptom control with or without FOLFOX for up to 12 cycles. Median overall survival was 6.2 months (95 percent CI 5.4 to 7.6) with FOLFOX against 5.3 months (4.1 to 5.8); adjusted hazard ratio 0.69 (0.50 to 0.97), p=0.031. Survival at 6 and 12 months was 50.6 and 25.9 percent with FOLFOX against 35.5 and 11.4 percent. Grade 3 to 5 adverse events occurred in 69 versus 52 percent, with three chemotherapy-related deaths.",
    journal: "The Lancet Oncology", year: 2021, doi: "10.1016/S1470-2045(21)00027-9", pmid: "33798493",
    authors: "Lamarca A, Palmer DH, Wasan HS, et al.", paperType: "rct", participants: 162, changedPractice: true,
    findings: ["Median overall survival 6.2 vs 5.3 months; adjusted hazard ratio 0.69 (95 percent CI 0.50 to 0.97), p=0.031.", "Overall survival at 12 months 25.9 vs 11.4 percent; at 6 months 50.6 vs 35.5 percent.", "Grade 3 to 5 adverse events 69 vs 52 percent; three chemotherapy-related deaths."],
    whatItMeans: "FOLFOX became the guideline second-line option for gallbladder cancer on this trial. The gain is real but small, which is why later-line care now starts with a search for a HER2 or other targetable alteration.",
    caveats: ["Open-label trial with a symptom-control comparator.", "Gallbladder and ampullary cancers were included but not analysed as separate populations in the abstract."],
    links: [doi("10.1016/S1470-2045(21)00027-9", "Lancet Oncol 2021"), pubmed("33798493"), ct("NCT01926236")],
    cancers: [GB, "cholangiocarcinoma", "biliary-tract-cancer"], drugs: ["folfox"], trials: ["abc-06"], terms: ["os"], people: ["angela-lamarca", "juan-valle"], institutions: ["the-christie"], journals: ["lancet-oncology"] }),
  p({ id: "paper-nifty-liposomal-irinotecan-lancet-oncol-2021", name: "Liposomal irinotecan plus fluorouracil and leucovorin versus fluorouracil and leucovorin for metastatic biliary tract cancer after progression on gemcitabine plus cisplatin (NIFTY): a multicentre, open-label, randomised, phase 2b study",
    tldr: "In a Korean trial, adding liposomal irinotecan to fluorouracil held second-line bile duct and gallbladder cancer still for about seven months rather than six weeks, at the cost of more low blood counts.",
    summary: "NIFTY randomised 174 patients at five South Korean academic centres between September 2018 and February 2020 to liposomal irinotecan 70 mg/m2 with fluorouracil and leucovorin, or fluorouracil and leucovorin alone, every two weeks. Median progression-free survival by blinded independent central review was 7.1 months (95 percent CI 3.6 to 8.8) against 1.4 months (1.2 to 1.5); hazard ratio 0.56 (0.39 to 0.81), p=0.0019. Grade 3 to 4 neutropenia occurred in 24 versus 1 percent and serious adverse events in 42 versus 24 percent, with no treatment-related deaths.",
    journal: "The Lancet Oncology", year: 2021, doi: "10.1016/S1470-2045(21)00486-1", pmid: "34656226",
    authors: "Yoo C, Kim KP, Jeong JH, et al.", paperType: "rct", participants: 174, changedPractice: false,
    findings: ["Median progression-free survival 7.1 vs 1.4 months; hazard ratio 0.56 (95 percent CI 0.39 to 0.81), p=0.0019.", "Grade 3 to 4 neutropenia 24 vs 1 percent; serious adverse events 42 vs 24 percent."],
    whatItMeans: "A positive randomised phase 2 that the German NALIRICC trial failed to reproduce; guidelines list the regimen as an option, and the disagreement is a reminder that single-country phase 2 results in biliary cancer need replication.",
    caveats: ["Phase 2b with a progression-free survival endpoint, not survival.", "Not reproduced by NALIRICC (2024)."],
    links: [doi("10.1016/S1470-2045(21)00486-1", "Lancet Oncol 2021"), pubmed("34656226"), ct("NCT03524508")],
    cancers: [GB, "cholangiocarcinoma", "biliary-tract-cancer"], drugs: ["irinotecan", "fluorouracil"], trials: ["nifty", "naliricc"], terms: ["pfs"], people: ["ghassan-abou-alfa"], journals: ["lancet-oncology"] }),
  p({ id: "paper-swog-s0809-adjuvant-chemoradiation-jco-2015", name: "SWOG S0809: A Phase II Intergroup Trial of Adjuvant Capecitabine and Gemcitabine Followed by Radiotherapy and Concurrent Capecitabine in Extrahepatic Cholangiocarcinoma and Gallbladder Carcinoma",
    tldr: "In the only prospective trial of chemotherapy then radiotherapy after surgery for gallbladder or bile duct cancer, two in three patients were alive at two years, including those whose cancer had reached the cut edge, but there was no comparison group.",
    summary: "S0809 enrolled patients with extrahepatic cholangiocarcinoma or gallbladder carcinoma after radical resection with pT2 to 4, node-positive or margin-positive disease. Four cycles of gemcitabine and capecitabine were followed by capecitabine with radiotherapy (45 Gy to regional lymphatics, 54 to 59.4 Gy to the tumour bed). Of 79 eligible patients (68 percent cholangiocarcinoma, 32 percent gallbladder; 54 R0, 25 R1), 86 percent completed treatment. Two-year survival was 65 percent (95 percent CI 53 to 74): 67 percent after R0 and 60 percent after R1. Median overall survival was 35 months. Relapse was local in 14, distant in 24 and both in 9 patients. Grade 3 and 4 adverse effects occurred in 52 and 11 percent; one patient died of gastrointestinal haemorrhage.",
    journal: "Journal of Clinical Oncology", year: 2015, doi: "10.1200/JCO.2014.60.2219", pmid: "25964250",
    authors: "Ben-Josef E, Guthrie KA, El-Khoueiry AB, et al.", paperType: "observational", participants: 79, changedPractice: true,
    findings: ["Two-year overall survival 65 percent (95 percent CI 53 to 74); 67 percent after R0 and 60 percent after R1 resection.", "Median overall survival 35 months (R0 34, R1 35).", "Grade 3 adverse effects 52 percent, grade 4 11 percent; one treatment-related death."],
    whatItMeans: "This single-arm trial is why NCCN lists chemoradiation after a positive margin or involved nodes. The near-identical survival after R0 and R1 resection is suggestive but unproven; no randomised trial has followed, and the UK does not routinely offer it.",
    caveats: ["Single-arm phase 2 with a historical benchmark, not a randomised comparison.", "Only 25 gallbladder cancer patients."],
    links: [doi("10.1200/JCO.2014.60.2219", "J Clin Oncol 2015"), pubmed("25964250"), ct("NCT00789958")],
    cancers: [GB, "extrahepatic-cholangiocarcinoma"], drugs: ["gemcitabine", "capecitabine"], trials: ["swog-s0809"], terms: ["chemoradiation", "radiotherapy"], institutions: ["swog"], journals: ["jco"], bottlenecks: ["b-surgery-radiation-innovation"] }),
  p({ id: "paper-topaz-1-three-year-survival-j-hepatol-2025", name: "Durvalumab plus chemotherapy in advanced biliary tract cancer: 3-year overall survival update from the phase III TOPAZ-1 study",
    tldr: "Three and a half years on, adding durvalumab to chemotherapy for advanced bile duct and gallbladder cancer still showed a survival edge, and about one in seven patients were alive at three years compared with one in fourteen on chemotherapy alone.",
    summary: "Exploratory update of TOPAZ-1 (685 randomised: 341 durvalumab plus gemcitabine-cisplatin, 344 placebo plus gemcitabine-cisplatin) at a median follow-up of 41.3 months. Median overall survival was 12.9 months (95 percent CI 11.6 to 14.1) against 11.3 months (10.1 to 12.5), hazard ratio 0.74 (0.63 to 0.87); 36-month survival was 14.6 versus 6.9 percent. Among the 82.6 percent who achieved disease control, 36-month survival was 17.0 versus 7.6 percent. Extended long-term survivors (alive at 30 months or more) were 17.0 percent of the durvalumab arm and 8.7 percent of the placebo arm and included every clinically relevant subgroup. Benefit held regardless of subsequent therapy, and serious adverse events in long-term survivors were comparable between arms.",
    journal: "Journal of Hepatology", year: 2025, doi: "10.1016/j.jhep.2025.05.003", pmid: "40381735",
    authors: "Oh DY, He AR, Qin S, et al.", paperType: "rct", participants: 685, changedPractice: false,
    findings: ["Median overall survival 12.9 vs 11.3 months; hazard ratio 0.74 (95 percent CI 0.63 to 0.87) at 41.3 months median follow-up.", "36-month overall survival 14.6 vs 6.9 percent.", "Extended long-term survivors 17.0 vs 8.7 percent."],
    whatItMeans: "The tail of long survivors is the case for chemo-immunotherapy in gallbladder cancer, where the median gain is under two months. Who lands in that tail is still unknown; no biomarker in the trial predicts it.",
    caveats: ["Exploratory, post hoc analysis.", "Gallbladder cancer is a subgroup of a mixed biliary population."],
    links: [doi("10.1016/j.jhep.2025.05.003", "J Hepatol 2025"), pubmed("40381735"), ct("NCT03875235")],
    cancers: [GB, "cholangiocarcinoma", "biliary-tract-cancer"], drugs: ["durvalumab", "gemcitabine-cisplatin"], trials: ["topaz-1"], terms: ["os"], people: ["juan-valle"], companies: ["astrazeneca"], related: ["paper-topaz-1-nejm-evidence-2022", "gemcis-plus-io-btc"] }),
  p({ id: "paper-polcagb-protocol-bmj-open-2019", name: "A phase III randomised clinical trial of perioperative therapy (neoadjuvant chemotherapy versus chemoradiotherapy) in locally advanced gallbladder cancers (POLCAGB): study protocol",
    tldr: "The plan for an Indian trial comparing chemotherapy with chemotherapy plus radiotherapy before surgery for gallbladder cancer that has grown beyond the gallbladder wall.",
    summary: "Protocol from Tata Memorial Hospital for a randomised trial in biopsy-proven locally advanced (T3 to T4) gallbladder cancer without metastases, comparing gemcitabine-based neoadjuvant chemotherapy with neoadjuvant chemoradiation. The primary endpoint is overall survival; secondary endpoints include progression-free survival, R0 resection rate, toxicity, complications and quality of life. The design targets a 5.5-month improvement in median survival (11 months in the control arm, hazard ratio 0.7) with 80 percent power, requiring 314 patients (157 per arm) over five years with 10 percent attrition. Registered as CTRI/2016/08/007199 and NCT02867865.",
    journal: "BMJ Open", year: 2019, doi: "10.1136/bmjopen-2018-028147", pmid: "31253621",
    authors: "Engineer R, Patkar S, Lewis SC, et al.", paperType: "methods", participants: 314, changedPractice: false,
    findings: ["Planned sample 314 (157 per arm) to detect a 5.5-month gain in median overall survival, hazard ratio 0.7, 80 percent power.", "Primary endpoint overall survival; the registry now lists 124 actual participants."],
    whatItMeans: "India carries a large share of the world's gallbladder cancer and this is the only randomised test of radiotherapy's role before surgery; the registry's actual enrolment of 124 against a plan of 314 means the answer will be less certain than designed.",
    caveats: ["Protocol paper; no results.", "Single-institution design."],
    links: [doi("10.1136/bmjopen-2018-028147", "BMJ Open 2019"), pubmed("31253621"), ct("NCT02867865")],
    cancers: [GB], trials: ["polcagb"], terms: ["chemoradiation", "neoadjuvant-adjuvant"], institutions: ["tata-memorial"] }),
  p({ id: "paper-gain-trial-protocol-bmc-cancer-2020", name: "Neoadjuvant chemotherapy with gemcitabine plus cisplatin followed by radical liver resection versus immediate radical liver resection alone with or without adjuvant chemotherapy in incidentally detected gallbladder carcinoma after simple cholecystectomy or in front of radical resection of BTC (ICC/ECC) - a phase III study of the German registry of incidental gallbladder carcinoma platform (GR)- the AIO/ CALGP/ ACO- GAIN-trial",
    tldr: "The design of the German GAIN trial: chemotherapy before and after the second operation for gallbladder cancer found by chance, against surgery first.",
    summary: "Protocol for GAIN, a multicentre randomised open-label phase 3 built on the German Registry of Incidental Gallbladder Carcinoma. Patients with incidentally discovered gallbladder cancer before radical re-resection, or with resectable or borderline resectable cholangiocarcinoma, were to receive three cycles of gemcitabine plus cisplatin before and after surgery, or surgery alone followed by therapy of the investigator's choice. Primary endpoint overall survival; planned 333 patients; recruitment started August 2019. The authors note that gallbladder cancer is suspected before surgery in only about 30 percent of patients and that five-year survival after curative resection is 20 to 40 percent.",
    journal: "BMC Cancer", year: 2020, doi: "10.1186/s12885-020-6610-4", pmid: "32059704",
    authors: "Goetze TO, Bechstein WO, Bankstahl US, et al.", paperType: "methods", participants: 333, changedPractice: false,
    findings: ["Planned 333 patients; three cycles of gemcitabine-cisplatin before and after radical surgery vs surgery first; primary endpoint overall survival.", "Gallbladder cancer is suspected preoperatively in only about 30 percent of patients (authors' background)."],
    whatItMeans: "GAIN closed in October 2024 with 68 participants according to ClinicalTrials.gov, one fifth of its target: the clearest example of how hard it is to run a randomised surgical trial in incidental gallbladder cancer, and why OPT-IN's result matters.",
    caveats: ["Protocol paper; the trial closed far short of its target.", "Mixed population of incidental gallbladder cancer and cholangiocarcinoma."],
    links: [doi("10.1186/s12885-020-6610-4", "BMC Cancer 2020"), pubmed("32059704"), ct("NCT03673072")],
    cancers: [GB, "cholangiocarcinoma"], trials: ["gain-igbc"], terms: ["incidental-gallbladder-cancer", "neoadjuvant-adjuvant"], institutions: ["krankenhaus-nordwest"], journals: ["bmc-cancer"], bottlenecks: ["b-trial-enrolment"] }),
];

export const gallbladderEvidencePapers: PaperInput[] = [...guidelines, ...trialPapers, ...gallbladderSurgeryPapers, ...gallbladderEpidemiologyPapers];
const ROADMAP = "gallbladder-cancer-roadmap";

// ======================= SPIKE =======================
const spike: Spike = {
  cancerId: GB,
  entities: [...terms, ...trials, ...gallbladderEvidencePapers, gallbladderRoadmap, ...gallbladderIdeas] as EntityInput[],
  patch: {
    // History entries are dated from the indexed papers linked in the roadmap; the existing 1777 and 1954 entries stay.
    history: [
      { year: 1882, title: "Carl Langenbuch performs the first cholecystectomy", note: "Lazarus Hospital, Berlin, July 1882 (Hardy 1993; Traverso 1976). The operation for gallstones through which most gallbladder cancers are still discovered.", refs: ["radical-cholecystectomy", "incidental-gallbladder-cancer"] },
      { year: 1976, title: "Nevin stages gallbladder cancer by depth of invasion", note: "Sixty-six cases and 399 from the literature; essentially all found incidentally at gallstone surgery.", refs: ["paper-nevin-gallbladder-carcinoma-staging-cancer-1976", "tnm-staging"] },
      { year: 2006, title: "Chile guarantees preventive cholecystectomy for gallstones at ages 35 to 49", note: "The GES programme, the world's only national prophylactic cholecystectomy policy against gallbladder cancer; 284,139 notifications by 2024.", refs: ["prophylactic-cholecystectomy", "paper-samaniego-chile-ges-programme-evaluation-rev-med-chile-2024"] },
      { year: 2007, title: "Residual disease found in 46 percent of re-resections for incidental cancer", note: "Pawlik and colleagues, six centres, 115 patients: the observational basis for re-resecting T1b or deeper tumours.", refs: ["paper-pawlik-incidental-gallbladder-cancer-residual-disease-jgs-2007", "radical-cholecystectomy"] },
      { year: 2015, title: "Hepatic-side T2 tumours shown to do worse than peritoneal-side", note: "Shindoh and colleagues, 437 patients: five-year survival 42.6 vs 64.7 percent.", refs: ["paper-shindoh-t2-gallbladder-cancer-tumour-location-ann-surg-2015", "t2a-t2b-gallbladder"] },
      { year: 2015, title: "SWOG S0809: the only prospective adjuvant chemoradiation trial", note: "79 patients, two-year survival 65 percent; no randomised trial has followed.", refs: ["swog-s0809", "paper-swog-s0809-adjuvant-chemoradiation-jco-2015"] },
      { year: 2017, title: "AJCC eighth edition splits T2 into T2a and T2b", refs: ["paper-chun-ajcc-8th-edition-hepatobiliary-aso-2018", "t2a-t2b-gallbladder"] },
      { year: 2017, title: "Re-resection at four to eight weeks associated with longest survival", note: "Ethun and colleagues, ten US centres, 207 patients; a 2026 individual patient data meta-analysis found no difference by timing.", refs: ["paper-ethun-re-resection-timing-incidental-gallbladder-cancer-jama-surg-2017", "paper-selvakumar-revision-surgery-timing-ipd-meta-analysis-hpb-2026"] },
      { year: 2021, title: "ABC-06 published: second-line FOLFOX", note: "Median overall survival 6.2 vs 5.3 months; one-year survival 25.9 vs 11.4 percent. NIFTY (liposomal irinotecan) published the same year.", refs: ["abc-06", "paper-abc-06-folfox-second-line-lancet-oncol-2021", "nifty"] },
      { year: 2022, title: "European gallbladder polyp guideline updated", note: "Cholecystectomy at 10 mm, or 6 to 9 mm with risk factors; two years of ultrasound follow-up otherwise.", refs: ["paper-gallbladder-polyp-joint-guideline-eur-radiol-2022", "gallbladder-polyp"] },
      { year: 2023, title: "HERIZON-BTC-01 published; ESMO biliary tract cancer guideline", note: "Zanidatamab response rate 41.3 percent in HER2-positive disease after chemotherapy.", refs: ["herizon-btc-01", "paper-harding-lancet-oncol", "paper-esmo-biliary-tract-cancer-guideline-ann-oncol-2023"] },
      { year: 2025, title: "TOPAZ-1 three-year update; ctDNA residual disease shown prognostic after biliary resection", note: "36-month survival 14.6 vs 6.9 percent with durvalumab. Residual disease hazard ratios of 26 (2025) and 15.86 (2026) in two cohorts.", refs: ["paper-topaz-1-three-year-survival-j-hepatol-2025", "paper-yu-ctdna-early-recurrence-biliary-tract-cancer-jco-po-2025", "paper-malla-ctdna-resected-biliary-tract-cancer-esmo-gi-onc-2026"] },
      { year: 2026, title: "CAPBIL: first UK nationwide gallbladder cancer cohorts", note: "285 incidental cancers and 516 operated patients across 24 centres, 2014 to 2022; 67.7 percent of incidental cancers had liver resection.", refs: ["paper-mcclements-capbil-incidental-gallbladder-cancer-bjs-2026", "paper-mcclements-capbil-surgical-outcomes-gallbladder-cancer-hpb-2026"] },
    ],
    pipeline: ["opt-in", "gain-igbc", "polcagb", "acticca-1", "artemide-biliary01", ...gallbladderIdeas.map((i) => i.id)],
    openProblems: [
      "Whether T1b tumours need re-resection at all (five-year disease-specific survival 93.7 vs 95.5 percent with simple vs extended cholecystectomy in 237 patients) and whether peritoneal-side T2a tumours need the liver resection.",
      "Adjuvant capecitabine's benefit is borrowed from BILCAP's mixed population; the UK CAPBIL cohort saw none in matched analysis. ACTICCA-1 and ARTEMIDE-Biliary01 are the tests.",
      "Residual disease blood tests are strongly prognostic after biliary resection but no trial acts on them.",
      "Prevention in high-incidence regions: Chile's prophylactic cholecystectomy programme has run since 2006 without an evaluable design; typhoid carriers have never been offered a trial.",
    ],
    terms: ["incidental-gallbladder-cancer", "radical-cholecystectomy", "t2a-t2b-gallbladder", "gallbladder-polyp", "prophylactic-cholecystectomy"],
    trials: ["herizon-btc-01", "nifty", "swog-s0809", "opt-in", "gain-igbc", "polcagb", "acticca-1", "artemide-biliary01"],
    related: [ROADMAP, "cholangiocarcinoma", "ampullary"],
    links: [
      { label: "ESMO Clinical Practice Guideline: biliary tract cancer (Ann Oncol 2023)", url: "https://doi.org/10.1016/j.annonc.2022.10.506" },
      { label: "Joint European guideline on gallbladder polyps (Eur Radiol 2022)", url: "https://doi.org/10.1007/s00330-021-08384-w" },
      { label: "CAPBIL: incidental gallbladder cancer in the UK (Br J Surg 2026)", url: "https://doi.org/10.1093/bjs/znag050" },
    ],
  },
};

export default spike;
