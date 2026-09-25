import type { EntityInput, PaperInput, RoadmapInput } from "@/lib/schema";
import type { Spike } from "./index";
import { TNBC } from "./tnbc-evidence-shared";
import { tnbcDiscoveryPapers, tnbcGuidelinePapers } from "./tnbc-evidence-papers-foundations";
import { tnbcBiomarkerAndAdcPapers, tnbcChemotherapyPapers } from "./tnbc-evidence-papers-treatment";
import { TNBC_IDEAS, tnbcIdeas, tnbcRoadmap } from "./tnbc-evidence-roadmap";

/**
 * TRIPLE-NEGATIVE BREAST CANCER: EVIDENCE, HISTORY, ROADMAP AND IDEAS (the evidence file of the September 2026 deep dive).
 *
 * Every paper record carries verbatim metadata from the Europe PMC record read on 2026-09-24 (title, authors, journal,
 * year, DOI, PMID); summaries paraphrase the indexed abstract and findings quote only its figures. Where Europe PMC
 * indexes no abstract (the ESMO early and metastatic guidelines, the living guideline letter) the record says so and
 * carries no numbers. Registry dates in the roadmap's watch list are quoted from ClinicalTrials.gov v2 records read the
 * same day. Guideline positions are read from the guideline papers and their public pages; UK positions are on the UK
 * and NHS page for triple-negative breast cancer, written by another file of the deep dive.
 *
 * The cancer this file patches is the `tnbc` record (../cancers.ts). If the record is renamed, change TNBC in
 * ./tnbc-evidence-shared.ts and nothing else.
 *
 * Papers the corpus already held are linked by id, not repeated: KEYNOTE-522 (2020, 2022, 2024), KEYNOTE-355 (2020,
 * 2022), IMpassion130 (2018, 2020) and IMpassion131, ASCENT, ASCENT-03, ASCENT-04, DESTINY-Breast04 (2022, 2025),
 * OlympiA (2021), OlympiAD, EMBRACA, BrighTNess (2018), GeparSixto (2014), TNT (paper-tutt-nat-med) and the 2007
 * residual cancer burden paper (paper-symmans-j-clin-oncol). Trial records belong to the treatment file of the deep
 * dive and glossary terms to the terms file; trials that did not yet exist when this file was written are listed in
 * PENDING_TRIALS (./tnbc-evidence-shared.ts) and named in text only.
 */

export const tnbcEvidencePapers: PaperInput[] = [...tnbcGuidelinePapers, ...tnbcDiscoveryPapers, ...tnbcChemotherapyPapers, ...tnbcBiomarkerAndAdcPapers];
const ROADMAP: RoadmapInput["id"] = tnbcRoadmap.id;

/** Records owned by other files that bear on triple-negative disease without linking to it (backlinks found in the 24 Sept 2026 reading). */
const backlinkSupplements: Spike["supplements"] = [
  { id: "ctdna-tests", cancers: [TNBC] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "tnbc-history", related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  // Slamon 1987 (the third receptor test, and so by exclusion the triple-negative definition) is the HER2 spike's record.
  { id: "paper-slamon-her2-amplification-science-1987", cancers: [TNBC], related: ["paper-asco-cap-er-pr-testing-guideline-jco-2010"], pmid: "3798106" } satisfies { id: string } & Partial<PaperInput>,
  // The three thin Europe PMC ingest records that shared a DOI with this file's records were merged into them on
  // 25 September 2026 (src/data/merged-records.ts), so the cross-links that stood in for the merge are gone.
];

// ======================= SPIKE =======================
const spike: Spike = {
  cancerId: TNBC,
  entities: [...tnbcEvidencePapers, tnbcRoadmap, ...tnbcIdeas] as EntityInput[],
  supplements: backlinkSupplements,
  patch: {
    // History entries are dated from the indexed papers linked in the roadmap. The 2000, 2007, 2014, 2018, 2020, 2021,
    // 2022, 2025 and 2026 entries in ../cancers.ts stand; these add the receptor, hereditary, disparity and residual
    // disease threads and the 2026 trial papers.
    history: [
      { year: 1987, title: "HER2 amplification found in 30 percent of breast cancers and tied to early relapse", note: "Slamon and colleagues, 189 tumours. With the oestrogen and progesterone receptor assays it completed the three tests whose absence defines triple-negative disease.", refs: ["paper-slamon-her2-amplification-science-1987", "her2"] },
      { year: 1997, title: "Founder BRCA mutations: 56 percent breast cancer risk by 70 in Ashkenazi carriers", note: "Struewing and colleagues, 5,318 volunteers, three founder variants carried by over 2 percent of the population; Górski described the Polish BRCA1 founder set in 2000.", refs: ["paper-struewing-brca-founder-mutations-ashkenazi-nejm-1997", "paper-gorski-brca1-founder-mutations-poland-ajhg-2000", "brca"] },
      { year: 2003, title: "BRCA1 carriers' tumours shown to be basal-like", note: "Sørlie's independent data sets and Foulkes's cytokeratin 5/6 stain (odds ratio 9.0) linked hereditary and basal-like disease; Atchley (2008) found 57 percent of BRCA1 carriers' cancers triple-negative.", refs: ["paper-sorlie-repeated-observation-subtypes-brca1-basal-pnas-2003", "paper-foulkes-brca1-basal-phenotype-jnci-2003", "paper-atchley-brca-status-triple-negative-jco-2008", "germline-testing"] },
      { year: 2006, title: "Carolina Breast Cancer Study: basal-like tumours in 39 percent of young African American women", note: "Carey and colleagues, 496 cases; 16 percent in other women. California registry data (2007) fixed the wider demography of younger, Black, Hispanic and poorer women with worse survival at every stage.", refs: ["paper-carey-race-breast-cancer-subtypes-cbcs-jama-2006", "paper-bauer-triple-negative-california-registry-cancer-2007", TNBC_IDEAS.disparities] },
      { year: 2007, title: "Residual cancer burden score; the relapse curve that peaks at three years", note: "Symmans graded residual disease after neoadjuvant chemotherapy; Dent's Toronto cohort showed distant relapse hazard ratio 2.6 peaking at three years and fading after five.", refs: ["paper-symmans-j-clin-oncol", "paper-dent-tnbc-clinical-features-recurrence-ccr-2007", "rcb"] },
      { year: 2008, title: "The residual disease paradox and the brain metastasis rate", note: "Liedtke: pathological complete response 22 vs 11 percent yet worse survival, driven by residual disease. Lin: 46 percent of metastatic patients developed brain metastases; median survival 13.3 months.", refs: ["paper-liedtke-neoadjuvant-response-survival-tnbc-jco-2008", "paper-lin-tnbc-cns-metastases-dfci-cancer-2008", "brain-metastases"] },
      { year: 2011, title: "Six molecular subtypes of triple-negative breast cancer", note: "Lehmann and colleagues, 587 tumours: basal-like 1 and 2, immunomodulatory, mesenchymal, mesenchymal stem-like, luminal androgen receptor; refined to four in 2016 (Burstein reached a similar four in 2015).", refs: ["paper-lehmann-tnbc-subtypes-jci-2011", "paper-lehmann-tnbctype-4-refinement-plos-one-2016", "paper-burstein-tnbc-genomic-subtypes-ccr-2015"] },
      { year: 2014, title: "UK POSH cohort: young Black women have more triple-negative disease and worse survival despite equal access", note: "Copson and colleagues, 2,915 women aged 40 or under: 26.1 vs 18.6 percent triple-negative; five-year survival 71.1 vs 82.4 percent with equal chemotherapy use.", refs: ["paper-copson-posh-ethnicity-young-breast-cancer-uk-bjc-2014", TNBC_IDEAS.ukEthnicity] },
      { year: 2017, title: "CREATE-X: capecitabine after residual disease lengthens survival", note: "910 patients; five-year overall survival 89.2 vs 83.6 percent, and 78.8 vs 70.3 percent in the triple-negative group. The first post-neoadjuvant treatment.", refs: ["paper-create-x-adjuvant-capecitabine-nejm-2017", "capecitabine"] },
      { year: 2021, title: "PD-L1 assays shown not to be interchangeable", note: "Rugo and colleagues on 614 IMpassion130 tumours: SP142, SP263 and 22C3 positive in 46, 75 and 73 percent, concordance 69 percent. Atezolizumab's US breast indication withdrawn the same year.", refs: ["paper-rugo-pd-l1-assay-comparison-impassion130-jnci-2021", "impassion130", TNBC_IDEAS.pdl1] },
      { year: 2023, title: "c-TRAK TN: acting on ctDNA came too late", note: "UK trial, 161 women under surveillance; 27 percent ctDNA-positive by a year, 72 percent of them already metastatic on staging; none of five given pembrolizumab cleared.", refs: ["paper-turner-c-trak-tn-ctdna-pembrolizumab-ann-oncol-2023", "ctdna", TNBC_IDEAS.ctdna] },
      { year: 2024, title: "Lymphocyte-rich stage I tumours do well without chemotherapy", note: "Leon-Ferre and colleagues, 1,966 untreated patients: five-year distant recurrence-free survival 94 percent with lymphocytes of 50 percent or more vs 78 percent below 30 percent.", refs: ["paper-leon-ferre-tils-tnbc-no-chemotherapy-jama-2024", "tils", TNBC_IDEAS.deescalate] },
      { year: 2026, title: "TROPION-Breast02 and OlympiA six-year update published; CAPItello-290 negative", note: "Datopotamab deruxtecan first line: overall survival 23.7 vs 18.7 months. Olaparib: six-year survival 87.5 vs 83.2 percent, no excess leukaemia. Capivasertib plus paclitaxel: no survival gain.", refs: ["paper-tropion-breast02-ann-oncol-2026", "paper-olympia-6-year-update-ann-oncol-2026", "paper-capitello-290-capivasertib-paclitaxel-ann-oncol-2026", "tropion-breast02", "olympia", "nct03997123"] },
    ],
    pipeline: [...tnbcIdeas.map((i) => i.id)],
    // The molecular file's overlapping problems (assay swing, ctDNA timing, ancestry) were folded into these three on review (docs/TNBC-QA.md).
    openProblems: [
      "PD-L1 assays disagree on about a quarter of tumours (SP142 46 percent positive, 22C3 73 percent, concordance 69 percent in IMpassion130; 27 percent CPS 10 or more against 51 percent SP142-positive in the Swedish early cohort); only 22C3 combined positive score of 10 has an approved drug attached, laboratories are not harmonised, and no assay predicts benefit from the first-line antibody-drug conjugate plus pembrolizumab combinations.",
      "Acting on ctDNA after residual disease failed once (c-TRAK TN: detection came after metastases were visible, and ctDNA misses brain-only relapse); the next design needs tumour-informed assays, a sample at surgery and an active drug, and has not been run.",
      "The disparity is measured in the United States and was measured once in the UK (POSH, women under 41, recruited to 2008); NHS statistics do not report triple-negative outcomes by ethnicity, and women of African ancestry, who carry a distinct immune landscape, remain under-represented in the trials that set the biomarker thresholds.",
    ],
    terms: ["ctdna", "mrd", "de-escalation", "germline-testing", "brain-metastases", "adc-sequencing", "pam50", "neoadjuvant-adjuvant"],
    trials: ["ascent-05", "tropion-breast03", "tropion-breast05", "nct03997123"],
    related: [ROADMAP, ...Object.values(TNBC_IDEAS)],
    // No `links` here: src/lib/model-reviews.test.ts expects the tnbc record to keep its single Wikipedia link; the
    // guideline and POSH links live on the roadmap record instead.
  },
};

export default spike;
