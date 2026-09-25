import type { EntityInput, PaperInput, RoadmapInput } from "@/lib/schema";
import type { Spike } from "./index";
import { CRC } from "./colorectal-evidence-shared";
import { colorectalBiologyPapers, colorectalEpidemiologyPapers, colorectalGuidelinePapers, colorectalScreeningPapers } from "./colorectal-evidence-papers-foundations";
import { colorectalAdjuvantPapers, colorectalBiologicalPapers, colorectalCtdnaPapers, colorectalImmunotherapyPapers, colorectalPeritonealPapers, colorectalRectalPapers, colorectalTargetedPapers } from "./colorectal-evidence-papers-treatment";
import { CRC_IDEAS, colorectalIdeas, colorectalRoadmap } from "./colorectal-evidence-roadmap";

/**
 * COLORECTAL CANCER: EVIDENCE, HISTORY, ROADMAP AND IDEAS (the evidence file of the September 2026 deep dive).
 *
 * Every paper record carries verbatim metadata from the Europe PMC record read on 2026-09-24 (title, authors, journal,
 * year, DOI, PMID); summaries paraphrase the indexed abstract and findings quote only its figures. Where Europe PMC
 * indexes no abstract (the three ESMO guidelines) the record says so and carries no numbers. Registry dates in the
 * roadmap's watch list are quoted from ClinicalTrials.gov v2 records read the same day. UK and NHS specifics
 * (programme ages, the symptomatic FIT threshold, NICE NG151 and NG12 positions, endoscopy capacity, National Bowel
 * Cancer Audit indicators) belong to the UK file of the deep dive and are named here only as placeholders.
 *
 * The cancer this file patches is the `colorectal` record (../cancers.ts). If the record is renamed, change CRC in
 * ./colorectal-evidence-shared.ts and nothing else.
 *
 * Papers the corpus already held are linked by id, not repeated: Fearon and Vogelstein 1990 (paper-fearon-cell),
 * Vogelstein 2013, Guinney's consensus molecular subtypes, the Minnesota faecal occult blood trial, Sauer 2004,
 * Hurwitz 2004, Amado 2008 and Van Cutsem 2011 on KRAS and anti-EGFR therapy, Galon 2006, NICHE-2 and Cercek 2022.
 * Trial records belong to the trials file of the deep dive and glossary terms to the terms file; the ids that did not
 * yet exist are listed in PENDING_TRIALS and PENDING_TERMS (./colorectal-evidence-shared.ts) and named in text only.
 */

export const colorectalEvidencePapers: PaperInput[] = [
  ...colorectalGuidelinePapers, ...colorectalBiologyPapers, ...colorectalScreeningPapers, ...colorectalEpidemiologyPapers,
  ...colorectalAdjuvantPapers, ...colorectalRectalPapers, ...colorectalBiologicalPapers, ...colorectalImmunotherapyPapers,
  ...colorectalTargetedPapers, ...colorectalCtdnaPapers, ...colorectalPeritonealPapers,
];
const ROADMAP: RoadmapInput["id"] = colorectalRoadmap.id;

/** Records owned by other files that bear on colorectal cancer without linking to this roadmap (backlinks found in the 24 Sept 2026 reading). */
const backlinkSupplements: Spike["supplements"] = [
  { id: "early-detection-roadmap", cancers: [CRC], related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "kras-roadmap", related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "ctdna-tests", related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  // Fearon and Vogelstein 1990 exists as a thin Europe PMC ingest record matched by DOI (papers-cited-wave7.ts) with no
  // indexed abstract. The 1988 NEJM paper carries the figures; this attaches the 1990 record to the cancer and the roadmap
  // rather than writing a second copy of it.
  { id: "paper-fearon-cell", cancers: [CRC], related: [ROADMAP, "paper-vogelstein-genetic-alterations-colorectal-tumor-development-nejm-1988"], journals: ["cell"] } satisfies { id: string } & Partial<PaperInput>,
  // Existing full records the deep dive read: their Europe PMC ids, the cancer link and the roadmap neighbour.
  { id: "paper-cms-guinney-nat-med-2015", related: [ROADMAP, "paper-tcga-colorectal-comprehensive-characterization-nature-2012"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-minnesota-fobt-nejm-1993", related: [ROADMAP, "paper-hardcastle-nottingham-faecal-occult-blood-lancet-1996", "paper-kronborg-funen-faecal-occult-blood-lancet-1996"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-sauer-preoperative-chemoradiotherapy-rectal-nejm-2004", related: [ROADMAP, "paper-sebag-montefiore-cr07-preoperative-radiotherapy-lancet-2009", "paper-kapiteijn-dutch-tme-preoperative-radiotherapy-nejm-2001"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-hurwitz-bevacizumab-crc-nejm-2004", related: [ROADMAP, "paper-van-cutsem-crystal-cetuximab-folfiri-nejm-2009"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-galon-immune-contexture-colorectal-science-2006", related: [ROADMAP, CRC_IDEAS.mss] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-niche-2-nejm-2024", related: [ROADMAP, "paper-andre-checkmate-8hw-nivolumab-ipilimumab-nejm-2024", "paper-cercek-nonoperative-management-mismatch-repair-deficient-tumours-nejm-2025"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-cercek-dostarlimab-rectal-nejm-2022", related: [ROADMAP, "paper-cercek-nonoperative-management-mismatch-repair-deficient-tumours-nejm-2025"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-kras-colorectal-j-clin-oncol-2008", cancers: [CRC], related: ["paper-douillard-prime-panitumumab-ras-nejm-2013"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-kras-colorectal-j-clin-oncol-2011", cancers: [CRC], related: ["paper-van-cutsem-crystal-cetuximab-folfiri-nejm-2009"] } satisfies { id: string } & Partial<PaperInput>,
  // The two existing colorectal ideas are the neighbours of the new ones rather than duplicates of them.
  { id: "idea-ctdna-guided-adjuvant-crc", related: [ROADMAP, CRC_IDEAS.ctdna] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-immunotherapy-mss-crc", related: [ROADMAP, CRC_IDEAS.mss] } satisfies { id: string } & Partial<PaperInput>,
];

// ======================= SPIKE =======================
const spike: Spike = {
  cancerId: CRC,
  entities: [...colorectalEvidencePapers, colorectalRoadmap, ...colorectalIdeas] as EntityInput[],
  supplements: backlinkSupplements,
  patch: {
    // History entries are dated from the indexed papers linked in the roadmap. The 1957, 1988, 1990, 2000, 2004, 2008,
    // 2014, 2015, 2017, 2018, 2020, 2022, 2023, 2024, 2025 and 2026 entries in ./colorectal.ts stand; these add the
    // screening, surgical, radiotherapy, de-escalation, sidedness, ctDNA and early-onset threads.
    history: [
      { year: 1993, title: "Stool blood testing cuts bowel cancer deaths", note: "Nottingham (1996, 152,850 people, 15 percent reduction) and Funen (1996, 18 percent) follow the Minnesota result and build the case for national programmes.", refs: ["paper-minnesota-fobt-nejm-1993", "paper-hardcastle-nottingham-faecal-occult-blood-lancet-1996", "paper-kronborg-funen-faecal-occult-blood-lancet-1996"] },
      { year: 1997, title: "Swedish Rectal Cancer Trial: radiotherapy before surgery", note: "1,168 patients; five-year local recurrence 11 versus 27 percent and overall survival 58 versus 48 percent, against surgery that was not standardised.", refs: ["paper-swedish-rectal-cancer-trial-preoperative-radiotherapy-nejm-1997"] },
      { year: 2001, title: "Dutch TME trial separates local control from survival", note: "1,861 patients; two-year local recurrence 2.4 versus 8.2 percent with preoperative radiotherapy, two-year survival identical at 82.0 versus 81.8 percent.", refs: ["paper-kapiteijn-dutch-tme-preoperative-radiotherapy-nejm-2001"] },
      { year: 2003, title: "Cytoreduction with heated intraperitoneal chemotherapy for peritoneal disease", note: "Verwaal, 105 patients: median survival 22.3 versus 12.6 months, at 8 percent treatment-related mortality.", refs: ["paper-verwaal-cytoreduction-hipec-peritoneal-colorectal-jco-2003", "hipec"] },
      { year: 2007, title: "QUASAR measures the stage II benefit", note: "3,239 patients, 91 percent node-negative: relative risk of death 0.82, an absolute survival gain of about 3.6 percent.", refs: ["paper-quasar-adjuvant-chemotherapy-vs-observation-lancet-2007"] },
      { year: 2009, title: "MRC CR07 settles the timing of rectal radiotherapy", note: "1,350 patients; local recurrence 61 percent lower with short-course radiotherapy before surgery than with selective postoperative chemoradiotherapy, with no survival difference.", refs: ["paper-sebag-montefiore-cr07-preoperative-radiotherapy-lancet-2009"] },
      { year: 2010, title: "One flexible sigmoidoscopy, and the adenoma detection rate", note: "Atkin, 170,432 people: incidence down 23 percent and mortality 31 percent, still holding at 17 years. Kaminski: endoscopists finding adenomas in under 20 percent of people leave a roughly tenfold higher interval cancer risk.", refs: ["paper-atkin-once-only-flexible-sigmoidoscopy-lancet-2010", "paper-atkin-flexible-sigmoidoscopy-17-year-follow-up-lancet-2017", "paper-kaminski-adenoma-detection-rate-interval-cancer-nejm-2010"] },
      { year: 2012, title: "Polypectomy prevents deaths, not just cancers", note: "National Polyp Study at 23 years: colorectal cancer mortality halved against the general population.", refs: ["paper-zauber-national-polyp-study-colonoscopic-polypectomy-nejm-2012", "paper-tcga-colorectal-comprehensive-characterization-nature-2012"] },
      { year: 2013, title: "The first refractory-line drug", note: "CORRECT: regorafenib gave 6.4 against 5.0 months after everything else had been used, the first drug approved for that setting.", refs: ["paper-douillard-prime-panitumumab-ras-nejm-2013", "paper-grothey-correct-regorafenib-lancet-2013"] },
      { year: 2016, title: "HER2 becomes a colorectal target", note: "HERACLES treated RAS wild-type patients with HER2 amplification using trastuzumab and lapatinib and got responses in 8 of 27.", refs: ["paper-tie-ctdna-minimal-residual-disease-stage-ii-colon-sci-transl-med-2016", "ctdna", "mrd"] },
      { year: 2019, title: "BEACON CRC gives BRAF V600E disease a targeted option", note: "665 patients; encorafenib with cetuximab and binimetinib 9.0 versus 5.4 months, the doublet 8.4 months.", refs: ["paper-kopetz-beacon-encorafenib-braf-colorectal-nejm-2019", "beacon-crc"] },
      { year: 2021, title: "Total neoadjuvant therapy arrives in rectal cancer", note: "RAPIDO cuts three-year treatment failure from 30.4 to 23.7 percent; PRODIGE 23 raises three-year disease-free survival from 69 to 76 percent.", refs: ["paper-bahadoer-rapido-short-course-radiotherapy-lancet-oncol-2021", "paper-conroy-prodige-23-neoadjuvant-folfirinox-rectal-lancet-oncol-2021", "paper-quenet-prodige-7-hipec-peritoneal-colorectal-lancet-oncol-2021"] },
      { year: 2032, title: "The ctDNA strategy trials complete", note: "CIRCULATE-US (NRG-GI008, 1,912 estimated participants) has a primary completion date of 10 March 2029 and the French CIRCULATE (1,980 estimated) of March 2032; NordICC's study completion, and the 15-year screening mortality answer, is listed for July 2036.", refs: [CRC_IDEAS.ctdna, "nordicc", "mrd-testing"] },
    ],
    pipeline: [...colorectalIdeas.map((i) => i.id)],
    openProblems: [
      "Screening delivers the effect of its uptake, not of its test: 40.4 percent of the Nottingham screening group never returned a kit, and endoscopy capacity and the endoscopist's adenoma detection rate then decide what a positive test is worth.",
      "Incidence in adults under 50 is rising by 1.6 to 7.9 percent a year across Europe and the United States, the stage shift screening bought is reversing (60 percent of United States cases advanced in 2019 against 52 percent in the mid-2000s), and the only mechanistic lead is a bacterial toxin signature enriched 3.3-fold in cancers diagnosed before 40.",
      "Organ preservation for mismatch repair-proficient rectal cancer has never been randomised against surgery, and the bowel, urinary and sexual function that justifies it has never been a primary endpoint.",
    ],
    terms: ["msi", "mmr", "sidedness", "cms-subtypes", "lynch-syndrome", "fit-test", "ctdna", "mrd", "total-mesorectal-excision", "organ-preservation", "clinical-complete-response", "total-neoadjuvant-therapy", "chemoradiation", "complete-response", "tumour-agnostic", "cold-vs-hot", "neoantigen", "performance-status"],
    technologies: ["colonoscopy", "endoscopy", "cologuard", "liquid-biopsy", "signatera", "wes-wgs", "ngs", "radiotherapy", "imrt-igrt", "adc"],
    trials: ["nordicc", "rapido", "prodige-23", "opra", "circulate-japan"],
    bottlenecks: ["b-early-detection", "b-prevention-adoption", "b-immunotherapy-response", "b-dormancy-mrd", "b-workforce", "b-care-fragmentation", "b-survivorship"],
    related: [ROADMAP, ...Object.values(CRC_IDEAS)],
  },
};

export default spike;
