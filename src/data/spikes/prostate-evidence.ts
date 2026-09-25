import type { EntityInput, PaperInput, RoadmapInput } from "@/lib/schema";
import type { Spike } from "./index";
import { PROSTATE } from "./prostate-evidence-shared";
import { prostateAndrogenPapers, prostateArpiPapers, prostateChemotherapyPapers, prostateSchedulePapers } from "./prostate-evidence-papers-hormonal";
import { prostateImagingPapers, prostateLocalisedPapers, prostatePolicyPapers, prostatePsaPapers, prostateRiskPapers, prostateScreeningTrialPapers } from "./prostate-evidence-papers-screening";
import { prostateDnaRepairPapers, prostateGenomePapers, prostateResistancePapers } from "./prostate-evidence-papers-genomics";
import { PROSTATE_IDEAS, prostateIdeas, prostateRoadmap } from "./prostate-evidence-roadmap";

/**
 * PROSTATE CANCER: EVIDENCE, HISTORY, ROADMAP AND IDEAS (the evidence file of the September 2026 deep dive).
 *
 * Every paper record carries verbatim metadata from the Europe PMC record read on 2026-09-25 (title, authors,
 * journal, year, DOI, PMID); summaries paraphrase the indexed abstract and findings quote only its figures. Where
 * Europe PMC indexes no abstract (Huggins and Hodges 1941, whose indexed copy is the 1972 CA reprint) the record says
 * so and carries no numbers from it. Registry dates in the roadmap's watch list are quoted from ClinicalTrials.gov v2
 * records read the same day. UK and NHS specifics (the National Screening Committee position, NICE appraisal numbers,
 * Cancer Drugs Fund status, imaging and radiotherapy capacity, National Prostate Cancer Audit indicators) belong to
 * the UK file of the deep dive and are named here only as placeholders.
 *
 * The cancer this file patches is the `prostate` record (../cancers.ts). If the record is renamed, change PROSTATE in
 * ./prostate-evidence-shared.ts and nothing else. Papers that belong to one risk group or disease state also link the
 * pre-existing records `prostate-low-risk`, `prostate-intermediate-risk`, `prostate-high-risk`, `prostate-bcr`,
 * `prostate-mhspc`, `prostate-nmcrpc`, `prostate-mcrpc` and `prostate-nepc`; no new cancer record is created.
 *
 * Prostate cancer already had 99 paper records in the corpus when this file was written, so this file prioritises the
 * papers that made the field and that were missing, over completeness. Papers the corpus already held are linked by
 * id, not repeated: ProtecT at 10 and 15 years, the 16-year ERSPC follow-up, CAP, Klotz on active surveillance,
 * PRECISION, Goteborg-2, D'Amico's risk groups, COU-AA-301, COU-AA-302 (supplemented below rather than duplicated),
 * CHAARTED, STAMPEDE and its abiraterone and radiotherapy reports, LATITUDE, TITAN, ENZAMET, ARASENS, PEACE-1,
 * SPARTAN, PROSPER, ARAMIS, EMBARK, ALSYMPCA, IMPACT, proPSMA, TheraP, VISION, PSMAfore, PSMAddition, PROfound,
 * PROpel, TALAPRO-2, MAGNITUDE, AMPLITUDE, TALAPRO-3, CAPItello-281, Beltran, Ku, Rubin and Aggarwal. Trial records
 * belong to the trials file of the deep dive and glossary terms to the terms file; the ids that did not yet exist are
 * listed in PENDING_TRIALS and PENDING_TERMS (./prostate-evidence-shared.ts) and named in text only.
 */

export const prostateEvidencePapers: PaperInput[] = [
  ...prostateAndrogenPapers, ...prostateChemotherapyPapers, ...prostateArpiPapers, ...prostateSchedulePapers,
  ...prostatePsaPapers, ...prostateScreeningTrialPapers, ...prostatePolicyPapers, ...prostateLocalisedPapers,
  ...prostateImagingPapers, ...prostateRiskPapers,
  ...prostateGenomePapers, ...prostateDnaRepairPapers, ...prostateResistancePapers,
];
const ROADMAP: RoadmapInput["id"] = prostateRoadmap.id;

/** Records owned by other files that bear on prostate cancer without linking to this roadmap (backlinks found in the 25 Sept 2026 reading). */
const backlinkSupplements: Spike["supplements"] = [
  // The cross-cancer routes this roadmap joins.
  { id: "hormonal-therapy-roadmap", cancers: [PROSTATE], related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "early-detection-roadmap", cancers: [PROSTATE], related: [ROADMAP, PROSTATE_IDEAS.metastaticEndpoint] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "radiopharma-roadmap", related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "molecular-imaging-roadmap", related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "targeted-therapy-roadmap", related: [ROADMAP, PROSTATE_IDEAS.hrrTiming] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "surgery-roadmap", related: [ROADMAP] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "trial-modernisation-roadmap", related: [ROADMAP, PROSTATE_IDEAS.sequence] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "survivorship-roadmap", related: [ROADMAP, PROSTATE_IDEAS.otherCause] } satisfies { id: string } & Partial<RoadmapInput>,
  { id: "ctdna-tests", related: [ROADMAP, PROSTATE_IDEAS.plasticity] } satisfies { id: string } & Partial<RoadmapInput>,
  // COU-AA-302 exists as an automatically ingested record with no findings and no relations. It is supplemented here
  // rather than duplicated: the figures below are quoted from the same Europe PMC abstract the record already carries.
  { id: "paper-abiraterone-acetate-prostate-n-engl-j-med-2013",
    cancers: [PROSTATE, "prostate-mcrpc"], changedPractice: true, participants: 1088,
    findings: [
      "Median radiographic progression-free survival 16.5 months with abiraterone and prednisone against 8.3 months with prednisone alone (hazard ratio 0.53; 95 percent confidence interval 0.45 to 0.62; P less than 0.001), in 1,088 chemotherapy-naive patients.",
      "Over a median follow-up of 22.2 months, overall survival was improved with abiraterone and prednisone (median not reached against 27.2 months; hazard ratio 0.75; 0.61 to 0.93; P equals 0.01) but did not cross the pre-specified efficacy boundary.",
      "Abiraterone and prednisone were superior for time to initiation of cytotoxic chemotherapy, opiate use for cancer-related pain, prostate-specific antigen progression and decline in performance status.",
      "Grade 3 or 4 mineralocorticoid-related adverse events and liver-function abnormalities were more common with abiraterone and prednisone.",
    ],
    drugs: ["abiraterone", "prednisone"], targets: ["androgen-receptor"], sections: ["hormonal", "targeted-therapy"],
    bottlenecks: ["b-resistance"], terms: ["castration-resistance", "psa"],
    related: [ROADMAP, "paper-cou-aa-301-abiraterone-de-bono-nejm-2011", "paper-beer-prevail-enzalutamide-nejm-2014", "paper-attard-abiraterone-phase-1-cyp17-jco-2008"] } satisfies { id: string } & Partial<PaperInput>,
  // Existing full records the deep dive read: the roadmap link and the neighbour this file supplies.
  { id: "paper-protect-nejm-2016", cancers: [PROSTATE], related: [ROADMAP, "paper-bill-axelson-spcg-4-29-year-nejm-2018", "paper-wilt-pivot-prostatectomy-observation-nejm-2017"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-protect-15-year-nejm-2023", cancers: [PROSTATE], related: [ROADMAP, "paper-bill-axelson-spcg-4-29-year-nejm-2018", "paper-uspstf-prostate-screening-jama-2018"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-hugosson-eur-urol", cancers: [PROSTATE], related: [ROADMAP, "paper-schroder-erspc-screening-mortality-nejm-2009", "paper-draisma-lead-time-overdiagnosis-psa-jnci-2009"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-martin-jama", cancers: [PROSTATE], related: [ROADMAP, "paper-schroder-erspc-screening-mortality-nejm-2009", "paper-andriole-plco-prostate-screening-nejm-2009", PROSTATE_IDEAS.metastaticEndpoint] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-goteborg-2-n-engl-j-med-2022", cancers: [PROSTATE], related: [ROADMAP, "paper-ahmed-promis-multiparametric-mri-lancet-2017", PROSTATE_IDEAS.metastaticEndpoint] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-precision-mri-targeted-biopsy-nejm-2018", cancers: [PROSTATE], related: [ROADMAP, "paper-ahmed-promis-multiparametric-mri-lancet-2017", "paper-johnson-mpmri-individual-foci-eur-urol-2019", PROSTATE_IDEAS.perLesion] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-klotz-active-surveillance-jco-2015", cancers: [PROSTATE], related: [ROADMAP, "paper-loeb-overdiagnosis-overtreatment-prostate-eur-urol-2014", "paper-wilt-pivot-prostatectomy-observation-nejm-2017"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-damico-risk-groups-jama-1998", cancers: [PROSTATE], related: [ROADMAP, "paper-catalona-psa-screening-test-nejm-1991", "paper-bill-axelson-spcg-4-29-year-nejm-2018"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-cou-aa-301-abiraterone-de-bono-nejm-2011", cancers: [PROSTATE], related: [ROADMAP, "paper-attard-abiraterone-phase-1-cyp17-jco-2008", "paper-scher-affirm-enzalutamide-nejm-2012"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-chaarted-nejm-2015", cancers: [PROSTATE], related: [ROADMAP, "paper-gravis-getug-afu-15-docetaxel-lancet-oncol-2013", "paper-vale-stopcap-docetaxel-bisphosphonates-lancet-oncol-2016", "paper-tannock-tax-327-docetaxel-prednisone-nejm-2004"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-stampede-lancet-2016", cancers: [PROSTATE], related: [ROADMAP, "paper-gravis-getug-afu-15-docetaxel-lancet-oncol-2013", "paper-vale-stopcap-docetaxel-bisphosphonates-lancet-oncol-2016"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-latitude-nejm-2017", cancers: [PROSTATE], related: [ROADMAP, "paper-attard-abiraterone-phase-1-cyp17-jco-2008"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-stampede-abiraterone-nejm-2017", cancers: [PROSTATE], related: [ROADMAP, "paper-vale-stopcap-docetaxel-bisphosphonates-lancet-oncol-2016"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-profound-nejm-2020", cancers: [PROSTATE], related: [ROADMAP, "paper-mateo-toparp-a-olaparib-dna-repair-nejm-2015", "paper-fizazi-triton3-rucaparib-nejm-2023", PROSTATE_IDEAS.hrrTiming] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-propel-lancet-oncol-2023", cancers: [PROSTATE], related: [ROADMAP, "paper-mateo-toparp-a-olaparib-dna-repair-nejm-2015", PROSTATE_IDEAS.hrrTiming] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-talapro-2-lancet-2023", cancers: [PROSTATE], related: [ROADMAP, "paper-fizazi-triton3-rucaparib-nejm-2023", PROSTATE_IDEAS.hrrTiming] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-magnitude-j-clin-oncol-2023", cancers: [PROSTATE], related: [ROADMAP, "paper-chung-comprehensive-genomic-profiling-prostate-jco-po-2019", PROSTATE_IDEAS.hrrTiming] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-vision-nejm-2021", cancers: [PROSTATE], related: [ROADMAP, "paper-therap-lancet-2021", PROSTATE_IDEAS.sequence] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-therap-lancet-2021", cancers: [PROSTATE], related: [ROADMAP, "paper-de-bono-tropic-cabazitaxel-lancet-2010", PROSTATE_IDEAS.sequence] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-propsma-hofman-lancet-2020", cancers: [PROSTATE], related: [ROADMAP] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-beltran-nepc-divergent-evolution-nat-med-2016", cancers: [PROSTATE], related: [ROADMAP, "paper-mu-sox2-lineage-plasticity-science-2017", PROSTATE_IDEAS.plasticity] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-ku-science", cancers: [PROSTATE], related: [ROADMAP, "paper-mu-sox2-lineage-plasticity-science-2017", PROSTATE_IDEAS.plasticity] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-aggarwal-t-sccpc-jco-2018", cancers: [PROSTATE], related: [ROADMAP, "paper-mu-sox2-lineage-plasticity-science-2017", PROSTATE_IDEAS.plasticity] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-kantoff-n-engl-j-med", cancers: [PROSTATE], related: [ROADMAP, "paper-antonarakis-keynote-199-pembrolizumab-jco-2020"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-langley-lancet", cancers: [PROSTATE], related: [ROADMAP, "paper-huggins-hodges-castration-serum-phosphatases-prostate-1941", PROSTATE_IDEAS.otherCause] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-zhang-nat-commun", cancers: [PROSTATE], related: [ROADMAP, "paper-denmeade-transformer-bipolar-androgen-therapy-jco-2021", "paper-gundem-evolutionary-history-lethal-metastatic-prostate-nature-2015"] } satisfies { id: string } & Partial<PaperInput>,
  { id: "paper-esteva-npj-digit-med", cancers: [PROSTATE], related: [ROADMAP, "paper-taylor-integrative-genomic-profiling-cancer-cell-2010"] } satisfies { id: string } & Partial<PaperInput>,
  // The existing prostate ideas are the neighbours of the new ones rather than duplicates of them.
  { id: "idea-prev-reflex-germline-testing", related: [ROADMAP, PROSTATE_IDEAS.hrrTiming] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-prev-mri-first-prostate-screening-prs", related: [ROADMAP, PROSTATE_IDEAS.metastaticEndpoint, PROSTATE_IDEAS.perLesion] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-prev-prs-screening-start-age", related: [ROADMAP, PROSTATE_IDEAS.metastaticEndpoint] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-prev-prostate-as-triggered-biopsy", related: [ROADMAP, PROSTATE_IDEAS.perLesion] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-prev-gleason6-terminology-rct", related: [ROADMAP, PROSTATE_IDEAS.metastaticEndpoint] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-bio1-arv7-degrader", related: [ROADMAP, PROSTATE_IDEAS.plasticity] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-bio1-cfrna-plasticity-tracking", related: [ROADMAP, PROSTATE_IDEAS.plasticity] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-bio1-alternating-schedules", related: [ROADMAP, PROSTATE_IDEAS.bat, PROSTATE_IDEAS.sequence] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-tr1-adaptive-therapy-randomised-phase-2", related: [ROADMAP, PROSTATE_IDEAS.bat] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-tr1-standing-platform-per-cancer", related: [ROADMAP, PROSTATE_IDEAS.sequence] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-tr1-smart-designs-for-adaptive-strategies", related: [ROADMAP, PROSTATE_IDEAS.sequence] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-acc-cardiometabolic-clinic-hormone-therapy", related: [ROADMAP, PROSTATE_IDEAS.otherCause] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-fund-device-technique-registry", related: [ROADMAP, PROSTATE_IDEAS.perLesion] } satisfies { id: string } & Partial<PaperInput>,
  { id: "idea-psma-pet-guided-mdt", related: [ROADMAP, PROSTATE_IDEAS.sequence] } satisfies { id: string } & Partial<PaperInput>,
];

// ======================= SPIKE =======================
const spike: Spike = {
  cancerId: PROSTATE,
  entities: [...prostateEvidencePapers, prostateRoadmap, ...prostateIdeas] as EntityInput[],
  supplements: backlinkSupplements,
  patch: {
    // History entries are dated from the indexed papers linked in the roadmap. Entries the prostate record already
    // carries stand; these add the androgen story, the PSA era and its cost, the localised-treatment trials, the
    // genomic landmarks and the resistance mechanisms.
    history: [
      { year: 1941, title: "A cancer is shown to depend on a hormone", note: "Huggins and Hodges castrated men with metastatic prostate cancer, or gave them oestrogen, and the disease regressed; androgen injection made it worse. The first demonstration that a human cancer depends on a circulating hormone, and the origin of systemic cancer therapy. Huggins shared the 1966 Nobel Prize for it.", refs: ["paper-huggins-hodges-castration-serum-phosphatases-prostate-1941"] },
      { year: 1987, title: "Prostate-specific antigen becomes a marker", note: "Stamey measured the antigen in 2,200 samples from 699 patients: it tracked tumour volume, fell to undetectable after prostatectomy with a half-life of 2.2 days, and detected recurrence. The same paper warned that it is raised in benign prostatic hyperplasia and is not specific.", refs: ["paper-stamey-psa-serum-marker-nejm-1987"] },
      { year: 1991, title: "The 4.0 threshold, and the start of population testing", note: "Catalona screened 1,653 healthy men over 50 and biopsied those at or above 4.0 micrograms per litre. Rectal examination alone would have missed 12 of the 37 cancers. Testing spread through primary care over the following decade with no randomised evidence that it saved lives.", refs: ["paper-catalona-psa-screening-test-nejm-1991"] },
      { year: 1995, title: "Castration resistance is shown to be an adaptation, not an escape", note: "Visakorpi found androgen receptor gene amplification in 7 of 23 tumours recurring on androgen deprivation and in none of the pre-treatment samples from the same men. Chen showed in 2004 that receptor overexpression alone is necessary and sufficient to convert sensitive disease to resistant, and turns antagonists into agonists.", refs: ["paper-visakorpi-androgen-receptor-amplification-nat-genet-1995", "paper-chen-androgen-receptor-overexpression-antiandrogen-resistance-nat-med-2004"] },
      { year: 2004, title: "The first drug to extend survival after hormone therapy fails", note: "TAX 327 gave median survival of 18.9 months with three-weekly docetaxel against 16.5 with mitoxantrone, and improved pain and quality of life; SWOG 9916 reported 17.5 against 15.6 months in the same issue. The end of therapeutic nihilism in castration-resistant disease.", refs: ["paper-tannock-tax-327-docetaxel-prednisone-nejm-2004", "paper-petrylak-swog-9916-docetaxel-estramustine-nejm-2004"] },
      { year: 2005, title: "A gene fusion is found in a common carcinoma", note: "Tomlins found TMPRSS2 fused to ERG or ETV1 in 23 of 29 prostate tumours, putting a growth gene under the control of the hormone the prostate lives in. The first recurrent rearrangement described in a common solid cancer, and still without a drug twenty years later.", refs: ["paper-tomlins-tmprss2-ets-fusion-science-2005"] },
      { year: 2008, title: "Castration-resistant disease is proved to be still hormone driven", note: "Attard's phase 1 of abiraterone in 21 men resistant to multiple hormonal therapies produced prostate-specific antigen falls of at least 50 percent in 12 of them, lasting up to at least 578 days. The disease was renamed from hormone-refractory to castration-resistant on the strength of results like this.", refs: ["paper-attard-abiraterone-phase-1-cyp17-jco-2008"] },
      { year: 2009, title: "The two screening trials report on the same day and disagree", note: "ERSPC found a 20 percent reduction in prostate cancer mortality, at 1,410 men screened and 48 extra cancers treated per death prevented. PLCO found no difference, with control-group screening at 52 percent by year six. Welch and Albertsen counted 1,305,600 extra United States diagnoses and 1,004,800 definitive treatments since 1986.", refs: ["paper-schroder-erspc-screening-mortality-nejm-2009", "paper-andriole-plco-prostate-screening-nejm-2009", "paper-welch-albertsen-psa-era-diagnosis-treatment-jnci-2009", "paper-draisma-lead-time-overdiagnosis-psa-jnci-2009"] },
      { year: 2010, title: "A second line opens", note: "TROPIC gave cabazitaxel after docetaxel: 15.1 against 12.7 months, with grade 3 or higher neutropenia in 82 percent. Prostate cancer became a sequencing problem rather than a single-treatment disease.", refs: ["paper-de-bono-tropic-cabazitaxel-lancet-2010"] },
      { year: 2012, title: "Screening is recommended against, and enzalutamide arrives", note: "The United States task force issued a grade D recommendation against prostate-specific antigen screening at any age; it moved men aged 55 to 69 to grade C in 2018. In the same year AFFIRM reported enzalutamide after chemotherapy, 18.4 against 13.6 months, with a prostate-specific antigen response rate of 54 percent against 2 percent.", refs: ["paper-moyer-uspstf-prostate-screening-ann-intern-med-2012", "paper-uspstf-prostate-screening-jama-2018", "paper-scher-affirm-enzalutamide-nejm-2012", "paper-beer-prevail-enzalutamide-nejm-2014"] },
      { year: 2014, title: "The first predictive resistance marker", note: "Antonarakis found AR-V7, an androgen receptor lacking the part the drugs bind, in circulating tumour cells: a zero percent prostate-specific antigen response rate to enzalutamide and abiraterone in the men who carried it, against 53 and 68 percent in those who did not.", refs: ["paper-antonarakis-ar-v7-resistance-nejm-2014"] },
      { year: 2015, title: "The genome is classified, and DNA repair becomes a target", note: "TCGA put 74 percent of 333 primary tumours into seven subtypes and found DNA repair inactivation in 19 percent; the Stand Up To Cancer cohort sequenced 150 metastatic biopsies and found BRCA2, BRCA1 and ATM aberrations in 19.3 percent; TOPARP-A treated 50 unselected men with olaparib and 14 of the 16 with DNA repair defects responded. Gundem showed metastases seed other metastases.", refs: ["paper-tcga-molecular-taxonomy-primary-prostate-cell-2015", "paper-robinson-integrative-clinical-genomics-advanced-prostate-cell-2015", "paper-mateo-toparp-a-olaparib-dna-repair-nejm-2015", "paper-gundem-evolutionary-history-lethal-metastatic-prostate-nature-2015"] },
      { year: 2016, title: "Inherited DNA repair faults turn out to be common and unpredictable", note: "Pritchard found presumed deleterious germline DNA repair mutations in 11.8 percent of 692 men with metastatic prostate cancer, BRCA2 in 5.3 percent, with no relation to family history or age at diagnosis. The argument for testing every man with metastatic disease rather than selecting by family history.", refs: ["paper-pritchard-inherited-dna-repair-metastatic-prostate-nejm-2016"] },
      { year: 2017, title: "Resistance by changing cell type, and imaging moves in front of the biopsy", note: "Mu and Ku showed that losing TP53 and RB1 lets a prostate cancer cell switch on SOX2 and stop needing the androgen receptor, reversibly in the laboratory. PROMIS showed multiparametric magnetic resonance imaging is 93 percent sensitive for clinically significant cancer against 48 percent for standard biopsy, and could spare a quarter of men a biopsy.", refs: ["paper-mu-sox2-lineage-plasticity-science-2017", "paper-ahmed-promis-multiparametric-mri-lancet-2017", "paper-ku-science"] },
      { year: 2018, title: "Two long-running localised trials read out, and the disparity question is reframed", note: "SPCG-4 at 29 years: surgery cut prostate cancer death by 45 percent in clinically detected disease and added a mean 2.9 years of life. PIVOT at 19.5 years, in a largely screen-detected population, found no significant difference. Dess showed that once treatment and access are equal, the excess prostate cancer mortality in Black men largely disappears while the excess other-cause mortality does not.", refs: ["paper-bill-axelson-spcg-4-29-year-nejm-2018", "paper-wilt-pivot-prostatectomy-observation-nejm-2017", "paper-dess-black-race-prostate-mortality-jama-oncol-2019", "paper-teply-restore-bipolar-androgen-therapy-lancet-oncol-2018"] },
      { year: 2021, title: "Immunotherapy is measured and found wanting, and sequence is shown to matter", note: "KEYNOTE-199 gave objective response rates of 5 and 3 percent with pembrolizumab and PD-L1 predicted nothing, consistent with a median tumour mutational burden of 2.6 mutations per megabase. TRANSFORMER found identical progression-free survival for high-dose testosterone and enzalutamide and a difference of 8.6 months in progression-free survival through crossover depending on which came first.", refs: ["paper-antonarakis-keynote-199-pembrolizumab-jco-2020", "paper-chung-comprehensive-genomic-profiling-prostate-jco-po-2019", "paper-denmeade-transformer-bipolar-androgen-therapy-jco-2021", "paper-conti-trans-ancestry-gwas-prostate-nat-genet-2021"] },
      { year: 2023, title: "PARP inhibition is confirmed, and the biomarker is shown not to be one thing", note: "TRITON3 randomised 405 men and found imaging-based progression-free survival of 11.2 against 6.4 months in the BRCA subgroup, and a hazard ratio of 0.95 in the ATM subgroup: no effect. 4,855 men were screened to randomise 405.", refs: ["paper-fizazi-triton3-rucaparib-nejm-2023", "paper-abida-triton2-rucaparib-brca-jco-2020"] },
      { year: 2032, title: "The platform and registry trials complete", note: "ProBio's study completion is listed for December 2026, PSMAddition for 11 February 2027, CAPItello-281 for 31 March 2027, TALAPRO-3 for 28 August 2027, PROTEUS for 13 October 2028, PEACE III for December 2028, PSMA-DC for 3 October 2031, and STAMPEDE2, with 3,360 men planned, for March 2032.", refs: ["prostate-roadmap", "psmaddition", "capitello-281", "nct04821622", "nct03767244", "nct05939414", "stampede"] },
    ],
    pipeline: [...prostateIdeas.map((i) => i.id)],
    openProblems: [
      "Overdiagnosis is real, unavoidable with the current test, and unquantified to within a factor of thirty: estimates across epidemiological, clinical and autopsy studies range from 1.7 to 67 percent, modelling puts it at 23 to 42 percent of screen-detected cancers in United States calibration and 66 percent in the Rotterdam one, and autopsy studies find prostate cancer in 18.5 to 38.5 percent of men who died of something else.",
      "Overtreatment is the harm that overdiagnosis causes, and it is measured in the men who bear it: about 1 in 5 who have radical prostatectomy develop long-term urinary incontinence and 2 in 3 long-term erectile dysfunction, against about 1.3 prostate cancer deaths and about 3 metastatic cases prevented per 1,000 men screened over roughly 13 years.",
      "Metastatic prostate cancer now has six classes of treatment that extend survival and no randomised evidence about the order to give them in; TRANSFORMER measured a difference of 8.6 months in progression-free survival through crossover between two sequences of the same two treatments, which is larger than the gain most of the individual drugs were licensed on.",
      "The homologous recombination repair gene list is used as one biomarker and is not one: BRCA2 loss predicted response to olaparib in every case in TOPARP-A, ATM alteration gave a hazard ratio of 0.95 in TRITON3, and CDK12-altered tumours, 6 percent of the disease, are infrequently high for genome-wide loss of heterozygosity and are not homologous recombination deficient in the sense PARP inhibitors need.",
      "In a minority of men, treatment turns prostate cancer into a different disease: combined TP53 and RB1 loss allows a switch to an androgen receptor-independent, often neuroendocrine phenotype, found in 17 percent of metastatic biopsies in one prospective cohort, for which there is no approved treatment and no prospective surveillance strategy.",
      "Checkpoint immunotherapy does not work here and nobody can say which few patients it does work in: objective response rates of 5 percent in PD-L1-positive and 3 percent in PD-L1-negative disease, a median tumour mutational burden of 2.6 mutations per megabase, and mismatch repair deficiency in 4 percent of tumours, with durable responses in a subgroup that cannot be identified in advance.",
      "Magnetic resonance imaging is reported as a patient-level test and used as a lesion-level map: sensitivity is 93 percent for whether a man has clinically significant cancer and 65 percent for whether a given significant lesion is seen, with at least one significant focus missed in 34 percent of men and 45 percent of those with multifocal disease, and no service publishes its own per-lesion figure.",
      "The mortality gap that survives equal access is not a cancer gap: after adjustment for treatment and access, Black men in three United States cohorts had no excess prostate cancer mortality at the same stage, and a persistently higher hazard of dying of other causes, in a population treated for years with a hormone therapy that worsens metabolic and bone health.",
      "The TMPRSS2-ERG fusion defines roughly half of all prostate cancers, has been known since 2005, and has produced no treatment; the same is true of the seven-subtype TCGA taxonomy, which leaves a quarter of primary tumours unclassified.",
    ],
    terms: ["psa", "gleason-grade-group", "biochemical-recurrence", "castration-resistance", "overdiagnosis", "adt", "hrd", "msi", "tmb", "ctdna", "ngs", "ihc", "screening", "synthetic-lethality", "oligometastatic", "bone-metastases", "performance-status", "quality-of-life", "hazard-ratio", "prostatectomy", "radiotherapy"],
    technologies: ["prostate-screening-psa-mri", "mri", "psma-pet", "pet", "radioligand-therapy", "parp-inhibitor", "checkpoint-inhibitor", "liquid-biopsy", "germline-testing", "wes-wgs", "active-surveillance", "sbrt", "brachytherapy"],
    drugs: ["abiraterone", "enzalutamide", "apalutamide", "darolutamide", "docetaxel", "cabazitaxel", "mitoxantrone", "estramustine", "prednisone", "olaparib", "rucaparib", "niraparib", "talazoparib", "pluvicto", "radium-223", "sipuleucel-t", "pembrolizumab", "capivasertib", "leuprolide", "bicalutamide", "zoledronic-acid", "carboplatin"],
    targets: ["androgen-receptor", "psma", "brca", "atm", "cdk12", "tp53", "rb1", "pten", "erg", "tmprss2", "foxa1", "spop", "pik3ca"],
    trials: ["stampede", "protect", "chaarted", "latitude", "vision", "profound", "propel", "talapro-2", "magnitude", "embark", "arasens", "peace-1", "enzamet", "prosper", "aramis", "alsympca", "psmaddition", "capitello-281", "goteborg-2"],
    bottlenecks: ["b-overdiagnosis", "b-early-detection", "b-resistance", "b-biomarker-validation", "b-hereditary-risk", "b-toxicity-qol", "b-immunotherapy-response", "b-trial-design", "b-global-access", "b-survivorship", "b-undruggable-targets", "b-tumor-heterogeneity", "b-generic-repurposing", "b-aging-comorbidity"],
    related: [ROADMAP, ...Object.values(PROSTATE_IDEAS)],
  },
};

export default spike;
