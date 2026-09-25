import type { EntityInput, PaperInput, RoadmapInput } from "@/lib/schema";
import type { Spike } from "./index";
import { PANC } from "./pancreatic-evidence-shared";
import { pancreaticBiologyPapers, pancreaticGuidelinePapers, pancreaticSurgeryHistoryPapers } from "./pancreatic-evidence-papers-foundations";
import { pancreaticDetectionPapers, pancreaticSupportivePapers, pancreaticTrialPapers } from "./pancreatic-evidence-papers-treatment";
import { PANC_IDEAS, pancreaticIdeas, pancreaticRoadmap } from "./pancreatic-evidence-roadmap";

/**
 * PANCREATIC CANCER: EVIDENCE, HISTORY, ROADMAP AND IDEAS (the evidence file of the September 2026 deep dive).
 *
 * Every paper record carries verbatim metadata from the Europe PMC record read on 2026-09-24 (title, authors, journal,
 * year, DOI, PMID); summaries paraphrase the indexed abstract and findings quote only its figures. Where Europe PMC
 * indexes no abstract (the ESMO guideline, Whipple 1935, Hidalgo 2010) the record says so and carries no numbers.
 * Registry dates in the roadmap's watch list are quoted from ClinicalTrials.gov v2 records read the same day. Audit
 * and charity reports (National Pancreatic Cancer Audit State of the Nation 2024 to 2026, Pancreatic Cancer UK
 * campaigns, NICE NG85) are linked as sources for the UK and NHS page, written by another file of the deep dive.
 *
 * The cancer this file patches is the `pancreatic` record (../cancers.ts). If the record is renamed, change PANC in
 * ./pancreatic-evidence-shared.ts and nothing else.
 *
 * Papers the corpus already held are linked by id, not repeated: Conroy 2011, MPACT 2013, NAPOLI 3, PRODIGE 24 (2018),
 * ESPAC-3, ESPAC-4, ESPAC-5, CONKO-001 (2013), LAP07, NORPACT-1, Alliance A021501, PREOPANC long-term (2022), POLO
 * (2019, 2022), CodeBreaK 100, KRYSTAL-1, RASolute 302 (paper-daraxonrasib-pancreatic-n-engl-j-med-2026), Rojas 2023,
 * Burris 1997, Rahib 2014 and Fearon 2011. Trial records belong to the treatment file of the deep dive and glossary
 * terms to the terms file; the ids that did not yet exist are listed in PENDING_TRIALS and PENDING_TERMS
 * (./pancreatic-evidence-shared.ts) and named in text only.
 */

export const pancreaticEvidencePapers: PaperInput[] = [...pancreaticGuidelinePapers, ...pancreaticSurgeryHistoryPapers, ...pancreaticBiologyPapers, ...pancreaticTrialPapers, ...pancreaticDetectionPapers, ...pancreaticSupportivePapers];
const ROADMAP: RoadmapInput["id"] = pancreaticRoadmap.id;

/** Records owned by other files that bear on pancreatic cancer without linking to this roadmap (backlinks found in the 24 Sept 2026 reading). */
const backlinkSupplements: Spike["supplements"] = [
  { id: "kras-roadmap", related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "early-detection-roadmap", cancers: [PANC], related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  // Ostrem and Shokat 2013 is the corpus's key paper; the pancreatic reading adds its relations here rather than a second record.
  { id: "paper-ostrem-kras-g12c-nature-2013", related: ["kras-roadmap", "paper-codebreak-100-sotorasib-kras-g12c-pancreatic-nejm-2023", "paper-almoguera-kras-codon-12-pancreatic-cell-1988"] } satisfies { id: string } & Partial<PaperInput>,
  // Four papers exist twice: the full records in the evidence files and thin Europe PMC ingest records matched to a trial or
  // a citing page by DOI (papers-cited-wave7.ts, papers-trials-wave1.ts). The ingest record points at the full one (the
  // full record sees it as an incoming neighbour); the reverse link is not written because the roadmap page renders a
  // key paper's related papers and the ingest cards pushed it past its 300 KB budget. Until the ingest ids retire.
  { id: "paper-versteijne-j-clin-oncol", related: ["paper-preopanc-preoperative-chemoradiotherapy-jco-2020"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-van-cutsem-j-clin-oncol", related: ["paper-halo-301-pegvorhyaluronidase-jco-2020"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-babiker-j-clin-oncol", related: ["paper-panova-3-ttfields-locally-advanced-pancreatic-jco-2025"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-ponsegromab-phase-2-n-engl-j-med-2024", related: ["paper-groarke-ponsegromab-cancer-cachexia-nejm-2024"] } satisfies { id: string } & Partial<PaperInput>,
  // Existing records whose Europe PMC ids were read for this file; the PMIDs let the watch script and the DOI checker match them.
  { id: "paper-conroy-folfirinox-pancreatic-nejm-2011", pmid: "21561347", related: ["paper-napoli-1-nanoliposomal-irinotecan-lancet-2016"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-rojas-mrna-neoantigen-vaccine-pancreatic-nature-2023", related: ["paper-sethna-rna-neoantigen-vaccine-long-lived-t-cells-nature-2025"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-rahib-projecting-cancer-deaths-2030-cancerres-2014", related: ["paper-rahib-projection-us-cancer-2040-jama-netw-open-2021"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-conko-001-adjuvant-gemcitabine-long-term-oettle-jama-2013", related: ["paper-conko-001-adjuvant-gemcitabine-observation-jama-2007"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-preopanc-neoadjuvant-chemoradiotherapy-long-term-jco-2022", related: ["paper-preopanc-preoperative-chemoradiotherapy-jco-2020", "paper-preopanc-2-neoadjuvant-folfirinox-vs-chemoradiotherapy-lancet-oncol-2025"] } satisfies { id: string } & Partial<PaperInput>,
];

// ======================= SPIKE =======================
const spike: Spike = {
  cancerId: PANC,
  entities: [...pancreaticEvidencePapers, pancreaticRoadmap, ...pancreaticIdeas] as EntityInput[],
  supplements: backlinkSupplements,
  patch: {
    // History entries are dated from the indexed papers linked in the roadmap. The 1935, 1982, 1997, 2011, 2013, 2018,
    // 2019, 2021, 2023, 2024, 2025 and 2026 entries in ./pancreatic.ts stand; these add the surgical, marker,
    // oncogene, adjuvant, genome, hereditary, surveillance, stroma, device and vaccine threads.
    history: [
      { year: 1978, title: "Pylorus-preserving Whipple operation described", note: "Traverso and Longmire, two patients; their 1980 follow-up of 18 found every patient had exocrine insufficiency and needed enzyme replacement.", refs: ["paper-traverso-longmire-pylorus-preservation-pancreaticoduodenectomy-sgo-1978", "whipple"] },
      { year: 1987, title: "Lewis-negative patients shown unable to make CA 19-9", note: "Tempero and colleagues, 20 patients: a normal marker never rules the cancer out.", refs: ["paper-tempero-ca19-9-lewis-antigens-cancer-res-1987", "ca19-9"] },
      { year: 1988, title: "KRAS codon 12 mutations in 21 of 22 pancreatic cancers", note: "Almoguera and Perucho, by polymerase chain reaction; the most uniform driver in any common cancer.", refs: ["paper-almoguera-kras-codon-12-pancreatic-cell-1988", "kras"] },
      { year: 2004, title: "ESPAC-1: adjuvant chemotherapy helps, chemoradiotherapy harms", note: "289 patients; five-year survival 21 versus 8 percent with chemotherapy, 10 versus 20 percent with chemoradiotherapy.", refs: ["paper-espac-1-chemoradiotherapy-chemotherapy-resected-pancreatic-nejm-2004"] },
      { year: 2005, title: "New-onset diabetes after 50 carries a 1 percent three-year risk of pancreatic cancer", note: "Chari's Minnesota cohort of 2,122; observed-to-expected ratio 7.94.", refs: ["paper-chari-pancreatic-cancer-following-diabetes-gastroenterology-2005", PANC_IDEAS.nod] },
      { year: 2007, title: "CONKO-001: adjuvant gemcitabine doubles disease-free survival", note: "368 patients; 13.4 versus 6.9 months.", refs: ["paper-conko-001-adjuvant-gemcitabine-observation-jama-2007", "conko-001"] },
      { year: 2015, title: "Whole genomes and the classical versus basal-like split", note: "Waddell's 100 genomes tie unstable genomes to BRCA-type defects and platinum response; Moffitt separates tumour from stroma and finds two tumour and two stromal subtypes; Witkiewicz's 109 microdissected exomes give the purified driver frequencies.", refs: ["paper-waddell-whole-genomes-pancreatic-nature-2015", "paper-moffitt-virtual-microdissection-subtypes-nat-genet-2015", "paper-witkiewicz-pancreatic-exomes-utsw-nat-commun-2015"] },
      { year: 2016, title: "Bailey's four subtypes; NAPOLI-1 gives a second line", note: "456 tumours, 32 genes, 10 pathways, squamous subtype worst. Liposomal irinotecan with fluorouracil: 6.1 versus 4.2 months after gemcitabine.", refs: ["paper-bailey-molecular-subtypes-pancreatic-nature-2016", "paper-napoli-1-nanoliposomal-irinotecan-lancet-2016", "liposomal-irinotecan"] },
      { year: 2018, title: "Germline faults in 5.5 percent regardless of family history; CAPS surveillance finds operable cancers", note: "Hu, 3,030 patients. Canto, 354 high-risk individuals over 16 years: 9 of 10 surveillance-detected cancers resectable. Sharma's ENDPAC score for new-onset diabetes.", refs: ["paper-hu-germline-mutations-pancreatic-cancer-risk-jama-2018", "paper-canto-caps-long-term-surveillance-gastroenterology-2018", "paper-sharma-endpac-model-new-onset-diabetes-gastroenterology-2018", PANC_IDEAS.carriers] },
      { year: 2020, title: "PREOPANC primary report; HALO-301 negative; ASCO makes biomarker testing routine", note: "Preoperative chemoradiotherapy: 16.0 versus 14.3 months, R0 71 versus 40 percent. Pegvorhyaluronidase: 11.2 versus 11.5 months. Germline and tumour testing for every treatment-eligible patient.", refs: ["paper-preopanc-preoperative-chemoradiotherapy-jco-2020", "paper-halo-301-pegvorhyaluronidase-jco-2020", "paper-asco-metastatic-pancreatic-cancer-guideline-update-jco-2020", "preopanc", PANC_IDEAS.stroma] },
      // CAPS5 (2022) is the core file's entry and PANOVA-3 (2025) the base spike's; each is written once (pancreatic QA, 24 Sept 2026).
      { year: 2022, title: "PRODIGE 24 at five years: median survival 53.5 months", note: "Adjuvant modified FOLFIRINOX against gemcitabine: median overall survival 53.5 versus 35.5 months, five-year survival 43.2 versus 31.4 percent, hazard ratio 0.68.", refs: ["paper-prodige-24-five-year-outcomes-jama-oncol-2022", "prodige-24"] },
      { year: 2025, title: "PREOPANC-2 leaves the resectable question open; vaccine T cells last years", note: "Neoadjuvant FOLFIRINOX 21.9 versus 21.3 months against gemcitabine chemoradiotherapy. Sethna: responders' recurrence-free survival not reached at 3.2 years.", refs: ["paper-preopanc-2-neoadjuvant-folfirinox-vs-chemoradiotherapy-lancet-oncol-2025", "paper-sethna-rna-neoantigen-vaccine-long-lived-t-cells-nature-2025", PANC_IDEAS.neoadjuvant] },
    ],
    pipeline: [...pancreaticIdeas.map((i) => i.id)],
    openProblems: [
      "Neither the new-onset diabetes score (3.6 percent prevalence among high scorers) nor carrier surveillance (7 of 9 CAPS5 cancers at stage I) has been tested prospectively at population scale, and CA 19-9 cannot be read in the Lewis-negative tenth of patients; four in five patients still present with disease that cannot be removed.",
      "Two perioperative trials (PREOPANC-3, Alliance A021806) are the only ones comparing chemotherapy before and after surgery with the current adjuvant standard; until they read out, neoadjuvant treatment for clearly resectable disease rests on secondary endpoints.",
      "Enzyme replacement reached 21.7 percent of UK patients in primary care data and cachexia has a mechanism-based drug in phase 2 but no phase 3; both determine whether combination chemotherapy is delivered, and both sit outside the trials that set the standards.",
    ],
    terms: ["whipple", "resectability", "resection-margins", "neoadjuvant-adjuvant", "total-neoadjuvant-therapy", "tumour-markers", "gbrca-mutation", "germline-vs-somatic", "kras-mutation-subtypes", "neoantigen", "obstructive-jaundice", "biliary-stent", "performance-status", "ppv"],
    trials: ["espac-4", "espac-5", "conko-001", "lap07", "precede", "nct05968326", "nct07491445", "nct07252232", "nct07805954", "nct07522073"],
    related: [ROADMAP, ...Object.values(PANC_IDEAS)],
  },
};

export default spike;
