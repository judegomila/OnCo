import type { RoadmapInput, TermInput, TrialInput } from "@/lib/schema";

/**
 * The ctDNA test roadmap (owner ask, 21 Sept 2026): where blood tests that read tumour DNA have been, where the
 * evidence stands, and what to watch next. Every dated claim carries the source it was read from: FDA premarket
 * approval pages, the FDA oncology approval notice, Europe PMC abstracts, ClinicalTrials.gov v2 records, the CMS
 * coverage article, and GRAIL's own releases for its trial readouts and meeting dates. Registry completion dates are
 * quoted as the registry states them and can move.
 *
 * Only records the corpus lacked are added here: the trials the roadmap needs to point at (TRACC, MERMAID-1 and -2,
 * BESPOKE, CIRCULATE-US, the NCI Vanguard study) and the term for tumour-informed versus tumour-naive assays.
 * `scripts/ctdna-watch.ts` (npm run ctdna:watch) reads this file's roadmap, checks each trial's registry status and
 * searches Europe PMC for new papers on the trial acronyms since `asOf`, so the roadmap can be refreshed on a schedule.
 */
const asOf = "2026-09-21";
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
const epmc = (pmid: string, label: string) => ({ label, url: `https://europepmc.org/article/MED/${pmid}` });

type R = Omit<RoadmapInput, "kind" | "asOf">;
const r = (x: R): RoadmapInput => ({ kind: "roadmap", asOf, ...x });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, tags: ["ctdna-roadmap"], ...x });

export const ctdnaRoadmaps: RoadmapInput[] = [
  r({
    id: "ctdna-tests", name: "ctDNA tests roadmap: from a curiosity in plasma to blood tests that decide treatment",
    aka: ["Liquid biopsy roadmap", "MRD testing roadmap", "Multi-cancer early detection roadmap"],
    tldr: "Blood carries fragments of tumour DNA. This roadmap follows the tests that read them, from the first sighting in 1948 to blood tests that now choose a drug, spare chemotherapy, or screen for many cancers at once, and it lists the readouts to watch next.",
    summary: "Circulating tumour DNA (ctDNA) testing has three jobs, and each is at a different stage. Genotyping from blood is settled: the cobas EGFR plasma test became the first FDA-approved liquid biopsy in June 2016, and Guardant360 CDx and FoundationOne Liquid CDx followed in August 2020 as broad companion diagnostics. Residual disease testing after surgery has crossed from prognosis to action: DYNAMIC showed in 2022 that a ctDNA-guided approach halves chemotherapy in stage II colon cancer without harm, and in May 2026 the FDA approved adjuvant atezolizumab for ctDNA-positive muscle-invasive bladder cancer on IMvigor011, the first drug approval that depends on a ctDNA residual disease result. Escalation for a positive test is not yet proven: ALTAIR missed its endpoint and the MERMAID lung trials closed small.\n\nMulti-cancer early detection is the least settled. Shield won FDA approval for colorectal screening in July 2024 on a single-cancer claim. Galleri has one randomised trial behind it: NHS-Galleri did not reduce stage III and IV cancers combined, its primary endpoint, while reporting fewer stage IV diagnoses, and the FDA's advisory panel considers the test on 23 September 2026. The NCI's Vanguard study is the first randomised US test of the approach and runs to 2029.\n\nThe steps below are grouped by what the evidence allowed at the time. The 'What to watch' list carries registry completion dates and meeting dates as their sources state them. Tumour-informed assays (built from the patient's own tumour sequence) and tumour-naive assays (fixed panels, often methylation-based) compete on sensitivity, turnaround and cost; the roadmap treats that split as a running theme rather than an era.",
    sections: ["diagnostics", "early-detection"],
    technologies: ["liquid-biopsy", "mrd-testing", "mced", "cfdna-methylation-testing", "fragmentomics", "continuous-ctdna-monitoring", "methylation-profiling", "companion-diagnostic"],
    drugs: ["cobas-egfr-mutation-test", "guardant360-cdx", "foundationone-cdx", "signatera", "guardant-reveal", "radar-mrd", "galleri", "shield"],
    trials: ["dynamic", "circulate-japan", "imvigor011", "tracc", "bespoke-crc", "mermaid-1", "mermaid-2", "circulate-us", "pathfinder-2", "nhs-galleri", "eclipse-shield", "vanguard-study"],
    companies: ["roche-genentech", "guardant-health", "foundation-medicine", "natera", "grail", "exact-sciences", "freenome", "delfi-diagnostics"],
    terms: ["cfdna", "ctdna", "mrd", "tumour-informed-assay", "de-escalation", "stage-shift", "ppv", "surrogate-validation"],
    people: ["nitzan-rosenfeld", "dawson-sarah-jane", "nickolas-papadopoulos", "alberto-bardelli", "jeanne-tie", "thomas-powles", "deb-schrag", "peter-sasieni", "klaus-pantel"],
    bottlenecks: ["b-dormancy-mrd"],
    keyPapers: ["paper-dynamic-nejm-2022", "paper-galaxy-signatera-nat-med-2023", "paper-imvigor011-nejm-2025", "paper-pathfinder-lancet-2023", "paper-nhs-galleri-design-cancers-2022", "paper-nhs-galleri-performance-nat-med-2026"],
    related: ["diagnostics-roadmap", "early-detection-roadmap", "cure-paths", "ctdna-mrd-to-adjuvant", "idea-ctdna-guided-adjuvant-crc", "idea-tr2-ctdna-mrd-qualification", "idea-bio2-mrd-coverage-with-evidence", "idea-prev-mced-positive-resolution-pathway"],
    links: [
      epmc("18875018", "Mandel and Metais: nucleic acids in human blood plasma (C R Seances Soc Biol Fil 1948)"),
      epmc("837366", "Leon et al.: free DNA in the serum of cancer patients and the effect of therapy (Cancer Research 1977)"),
      epmc("18670422", "Diehl et al.: circulating mutant DNA to assess tumour dynamics (Nature Medicine 2008)"),
      epmc("23484797", "Dawson et al.: analysis of circulating tumour DNA to monitor metastatic breast cancer (NEJM 2013)"),
      epmc("24553385", "Bettegowda et al.: detection of circulating tumour DNA in early- and late-stage human malignancies (Science Translational Medicine 2014)"),
      epmc("27384348", "Tie et al.: ctDNA detects minimal residual disease and predicts recurrence in stage II colon cancer (Science Translational Medicine 2016)"),
      { label: "AACR: FDA approves first liquid biopsy test for lung cancer patients, 1 June 2016", url: "https://www.aacr.org/blog/2016/06/06/fda-approval-liquid-biopsy-test-lung-cancer/" },
      { label: "FDA PMA P150044: cobas EGFR Mutation Test v2 (tissue and plasma)", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P150044" },
      { label: "FDA PMA P200010: Guardant360 CDx, approved 7 August 2020", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P200010" },
      { label: "FDA PMA P190032: FoundationOne Liquid CDx, approved 26 August 2020", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P190032" },
      { label: "Natera: final Medicare coverage for Signatera in stage II-III colorectal cancer, 3 September 2020", url: "https://www.natera.com/company/news/natera-receives-final-medicare-coverage-for-its-signatera-mrd-test-in-stage-ii-iii-colorectal-cancer-2/" },
      { label: "CMS article A58456: MolDX minimal residual disease testing for solid tumour cancers (revision effective 1 January 2026)", url: "https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleId=58456" },
      epmc("35657320", "DYNAMIC: ctDNA analysis guiding adjuvant therapy in stage II colon cancer (NEJM, 16 June 2022)"),
      epmc("40055522", "DYNAMIC five-year outcomes (Nature Medicine 2025)"),
      epmc("36646802", "GALAXY: molecular residual disease and efficacy of adjuvant chemotherapy in colorectal cancer (Nature Medicine 2023)"),
      epmc("33931919", "CIRCULATE-Japan: ctDNA-guided adaptive platform trials, design of GALAXY, VEGA and ALTAIR (Cancer Science 2021)"),
      epmc("42260101", "ALTAIR: post-adjuvant trifluridine/tipiracil in ctDNA-positive resected colorectal cancer, primary endpoint not met (Nature Medicine 2026)"),
      epmc("41124204", "IMvigor011: ctDNA-guided adjuvant atezolizumab in muscle-invasive bladder cancer (NEJM 2025)"),
      { label: "FDA approves atezolizumab for adjuvant treatment of muscle invasive bladder cancer with ctDNA molecular residual disease, 15 May 2026", url: "https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-atezolizumab-adjuvant-treatment-muscle-invasive-bladder-cancer-patients-molecular" },
      epmc("37805216", "PATHFINDER: blood-based tests for multicancer early detection (The Lancet 2023)"),
      { label: "FDA PMA P230009: Shield blood-based colorectal cancer screening test, approved 26 July 2024", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=P230009" },
      epmc("42773209", "NHS-Galleri: performance of a multi-cancer early detection test across three annual rounds (Nature Medicine, 22 September 2026)"),
      { label: "GRAIL: full results from the NHS-Galleri trial, 30 May 2026", url: "https://grail.com/press-releases/grail-reports-full-results-from-nhs-galleri-trial-demonstrating-substantial-reduction-in-stage-iv-cancer-diagnoses-at-2026-asco-annual-meeting/" },
      { label: "GRAIL: PATHFINDER 2 results in more than 35,000 participants, 31 May 2026", url: "https://grail.com/press-releases/grail-presents-pathfinder-2-results-of-more-than-35000-participants-showing-the-galleri-test-substantially-increased-cancer-detection-with-robust-performance-and-favorable-safety-at-2026-a/" },
      { label: "GRAIL: FDA advisory committee meeting on the Galleri PMA set for 23 September 2026", url: "https://grail.com/press-releases/grail-announces-fda-advisory-committee-meeting-to-review-premarket-approval-application-for-the-galleri-multi-cancer-early-detection-test/" },
      ct("NCT06995898"), ct("NCT05174169"), ct("NCT04050345"), ct("NCT04660344"), ct("NCT05155605"),
    ],
    steps: [
      {
        era: "1948-1994", status: "historic", title: "A curiosity in plasma",
        description: "Mandel and Metais reported nucleic acids in human blood plasma in 1948, and in 1977 Leon and colleagues found that people with cancer carried more free DNA in their serum and that levels fell when treatment worked. Nobody could yet say which fragments came from the tumour, so for four decades this stayed an observation rather than a test.",
        refs: ["cfdna", "ctdna", "liquid-biopsy", "klaus-pantel"],
      },
      {
        era: "2008-2016", status: "historic", title: "Proof that blood tracks the tumour",
        description: "Digital PCR and deep sequencing made it possible to count tumour-specific mutations in plasma: Diehl and colleagues showed mutant DNA rising and falling with disease in 2008, Dawson and colleagues tracked metastatic breast cancer with it in 2013, and Bettegowda and colleagues detected ctDNA across early- and late-stage cancers in 2014. Tie and colleagues then showed in 2016 that ctDNA found after surgery for stage II colon cancer predicted recurrence, the observation the residual disease trials were built on.",
        refs: ["ctdna", "liquid-biopsy", "nitzan-rosenfeld", "dawson-sarah-jane", "nickolas-papadopoulos", "alberto-bardelli", "jeanne-tie", "clonal-evolution"],
      },
      {
        era: "2016-2020", status: "historic", title: "Regulators accept a blood genotype",
        description: "On 1 June 2016 the FDA approved the cobas EGFR Mutation Test v2 for plasma, the first liquid biopsy companion diagnostic, letting lung cancer patients start erlotinib on a blood result when tissue was unavailable. Two broad panels followed in August 2020: Guardant360 CDx on 7 August and FoundationOne Liquid CDx on 26 August, each a companion diagnostic for several drugs, with a negative blood result sent back to tissue testing.",
        refs: ["cobas-egfr-mutation-test", "guardant360-cdx", "foundationone-cdx", "companion-diagnostic", "roche-genentech", "guardant-health", "foundation-medicine", "erlotinib", "osimertinib"],
      },
      {
        era: "2019-2021", status: "current", title: "Tumour-informed residual disease tests reach the clinic and the payer",
        description: "Signatera sequences each patient's tumour, picks 16 mutations, and looks for them in plasma after surgery; in the GALAXY registry a positive test four weeks after colorectal surgery carried a tenfold higher recurrence risk. Medicare's MolDX programme finalised coverage for serial Signatera testing in stage II and III colorectal cancer on 3 September 2020, and its coverage article for residual disease tests now lists several tests and cancers, which is how tumour-informed testing became routine before any randomised trial had finished.",
        refs: ["signatera", "natera", "mrd-testing", "mrd", "tumour-informed-assay", "guardant-reveal", "radar-mrd", "paper-galaxy-signatera-nat-med-2023", "circulate-japan", "medicare-ced"],
      },
      {
        era: "2022-2026", status: "current", title: "Randomised trials: sparing treatment works, adding it is harder",
        description: "DYNAMIC, published in June 2022, randomised 455 people with stage II colon cancer and cut adjuvant chemotherapy from 28 percent to 15 percent with two-year recurrence-free survival of 93.5 against 92.4 percent; the five-year update in 2025 held at 88 against 87 percent. Escalation has been harder to prove: ALTAIR, which gave trifluridine/tipiracil to ctDNA-positive patients after colorectal surgery, did not meet its disease-free survival endpoint, the MERMAID lung trials closed with 89 and 30 participants, and TRACC, BESPOKE and CIRCULATE-Japan's VEGA de-escalation trial are still running.",
        refs: ["dynamic", "paper-dynamic-nejm-2022", "circulate-japan", "tracc", "bespoke-crc", "mermaid-1", "mermaid-2", "ctdna-mrd-to-adjuvant", "de-escalation", "trifluridine-tipiracil", "colorectal"],
      },
      {
        era: "2025-2026", status: "current", title: "The first drug approval that depends on a ctDNA result",
        description: "IMvigor011 tested 761 people after cystectomy for muscle-invasive bladder cancer and randomised the 250 whose blood turned ctDNA-positive to atezolizumab or placebo: disease-free survival hazard ratio 0.64 and overall survival hazard ratio 0.59, published in NEJM in December 2025. On 15 May 2026 the FDA approved adjuvant atezolizumab for patients with ctDNA molecular residual disease after cystectomy, with Signatera CDx as the companion diagnostic, so a residual disease blood test now sits inside a drug label.",
        refs: ["imvigor011", "paper-imvigor011-nejm-2025", "atezolizumab", "signatera", "thomas-powles", "urothelial", "companion-diagnostic"],
      },
      {
        era: "2021-2026", status: "current", title: "Screening from blood: one cancer approved, many cancers under review",
        description: "PATHFINDER, published in 2023, was the first prospective test of a multi-cancer blood test in 6,621 adults without symptoms: 1.4 percent had a signal, 38 percent of those had cancer, and resolving a positive took a median of 79 days. Shield became the first FDA-approved blood test for colorectal cancer screening on 26 July 2024, for average-risk adults aged 45 and over with colonoscopy after a positive. NHS-Galleri, the randomised trial of Galleri in 142,250 people in England, reported on 30 May 2026 that stage III and IV cancers combined were not reduced (the primary endpoint) while stage IV diagnoses fell by 14 percent; PATHFINDER 2 reported a positive predictive value of 60.3 percent in 35,878 people the next day, and GRAIL's premarket application, filed on 29 January 2026, goes to an FDA advisory panel on 23 September 2026. The trial's peer-reviewed test-performance paper appeared in Nature Medicine on 22 September 2026: positive results in 1.03, 0.80 and 0.90 percent of intervention-arm participants across three annual rounds, positive predictive values of 58.0, 50.4 and 45.8 percent, specificity of 99.50 to 99.60 percent and episode sensitivity of 26.7 to 37.2 percent for all cancers; it states the primary endpoint was not met and is reported elsewhere.",
        refs: ["mced", "galleri", "shield", "grail", "guardant-health", "pathfinder-2", "nhs-galleri", "eclipse-shield", "paper-pathfinder-lancet-2023", "paper-nhs-galleri-design-cancers-2022", "paper-nhs-galleri-performance-nat-med-2026", "cfdna-methylation-testing", "stage-shift", "ppv", "deb-schrag", "peter-sasieni"],
      },
      {
        era: "2026-2029", status: "emerging", title: "The randomised answers arrive",
        description: "The open questions each have a trial with a date on the registry. For screening, the NCI's Vanguard study randomises 24,000 people to multi-cancer detection tests or usual care, with primary completion listed for 31 January 2029, and NHS-Galleri's follow-up continues. For residual disease, CIRCULATE-US randomises stage III colon cancer patients by Signatera result to more or less chemotherapy (primary completion 10 March 2029), TRACC follows 1,000 people to 2029, and VEGA asks whether ctDNA-negative patients can skip chemotherapy altogether. If escalation trials keep missing, the field's case will rest on de-escalation and on ctDNA as a surrogate endpoint.",
        refs: ["vanguard-study", "circulate-us", "tracc", "circulate-japan", "nci", "nrg-oncology", "idea-ctdna-guided-adjuvant-crc", "idea-tr2-ctdna-mrd-qualification", "surrogate-validation"],
      },
      {
        era: "2026-2030", status: "emerging", title: "Deeper, cheaper and tumour-naive",
        description: "Two technical routes are competing to make the tests more sensitive without a tumour sample: methylation, which reads chemical marks that also point to the tissue of origin, and fragmentomics, which reads the sizes and positions of the fragments themselves. Whole-genome approaches and repeated sampling aim to catch relapse earlier than a three-monthly draw. The gating question for all of them is utility rather than sensitivity: finding disease earlier has to change an outcome, and the clonal haematopoiesis of normal blood cells is the main source of false positives.",
        refs: ["cfdna-methylation-testing", "fragmentomics", "methylation-profiling", "continuous-ctdna-monitoring", "delfi-diagnostics", "freenome", "guardant-reveal", "clonal-haematopoiesis", "mrd-kinetics-models", "idea-bio2-whole-genome-mrd-depth", "idea-bio1-methylation-clone-tracking"],
      },
      {
        era: "What sets the pace", status: "current", title: "Payment, standards and what to do with a positive",
        description: "In the United States, Medicare pays for residual disease tests through a MolDX coverage article that names tests and cancers one at a time (revision effective 1 January 2026); screening tests need their own coverage route, and most health systems outside the United States pay for none of this yet. Laboratories run different assays with no shared reference material, so a positive in one is not a positive in another, and a screening positive still needs a fast, agreed diagnostic pathway. Coverage with evidence, reference plasma standards and a national positive-result pathway are the proposals on the table.",
        refs: ["medicare-ced", "fda-ldt-rule", "idea-bio2-mrd-coverage-with-evidence", "idea-tr2-ctdna-reference-plasma", "idea-bio2-mrd-reference-standards", "idea-prev-mced-positive-resolution-pathway", "b-dormancy-mrd"],
      },
    ],
    watch: [
      { item: "FDA Molecular and Clinical Genetics Panel reviews the Galleri premarket approval application", expected: "2026-09-23", source: "https://grail.com/press-releases/grail-announces-fda-advisory-committee-meeting-to-review-premarket-approval-application-for-the-galleri-multi-cancer-early-detection-test/", refs: ["galleri", "grail", "mced"] },
      { item: "IMvigor011 study completion on the registry; longer follow-up of ctDNA-negative patients under surveillance", expected: "2026-10-01", source: "https://clinicaltrials.gov/study/NCT04660344", refs: ["imvigor011", "atezolizumab"] },
      { item: "NHS-Galleri: peer-reviewed test-performance paper (reported: Nature Medicine, 22 September 2026, states the primary endpoint was not met and is reported elsewhere)", expected: "2026-09-22", source: "https://doi.org/10.1038/s41591-026-04652-8", refs: ["nhs-galleri", "galleri", "stage-shift", "paper-nhs-galleri-performance-nat-med-2026"] },
      { item: "NHS-Galleri: primary-endpoint paper (stage III/IV incidence) not yet on Europe PMC; registry study completion, with cancer-specific mortality follow-up, listed as January 2031", expected: "2031-01", source: "https://clinicaltrials.gov/study/NCT05611632", refs: ["nhs-galleri", "galleri", "stage-shift"] },
      { item: "ECLIPSE (Shield) study completion on the registry", expected: "2027-08-05", source: "https://clinicaltrials.gov/study/NCT04136002", refs: ["eclipse-shield", "shield"] },
      { item: "PATHFINDER 2 study completion (primary completion listed as 2026-02-11)", expected: "2028-04-30", source: "https://clinicaltrials.gov/study/NCT05155605", refs: ["pathfinder-2", "galleri"] },
      { item: "Vanguard study primary completion: the NCI's randomised feasibility trial of multi-cancer detection tests in 24,000 people", expected: "2029-01-31", source: "https://clinicaltrials.gov/study/NCT06995898", refs: ["vanguard-study", "nci"] },
      { item: "CIRCULATE-US primary completion: ctDNA-guided escalation and de-escalation of adjuvant chemotherapy in stage III colon cancer", expected: "2029-03-10", source: "https://clinicaltrials.gov/study/NCT05174169", refs: ["circulate-us", "signatera"] },
      { item: "TRACC primary completion: 1,000 people with early colorectal cancer followed by ctDNA", expected: "2029-07-31", source: "https://clinicaltrials.gov/study/NCT04050345", refs: ["tracc"] },
      { item: "VEGA (CIRCULATE-Japan): non-inferiority of no chemotherapy in ctDNA-negative colon cancer; no readout date in the sources read", source: "https://europepmc.org/article/MED/33931919", refs: ["circulate-japan"] },
      { item: "BESPOKE CRC: registry status not updated since a listed completion of September 2025; watch for the primary publication", expected: "2025-09", source: "https://clinicaltrials.gov/study/NCT04264702", refs: ["bespoke-crc", "signatera"] },
    ],
    notes: [
      "How this stays current: run `npm run ctdna:watch`. The script reads this roadmap, lists every trial it references with its corpus status, checks each NCT id against the ClinicalTrials.gov v2 API for overall status and completion dates, and searches Europe PMC for papers on the trial acronyms published since the roadmap's asOf date. Anything it prints that this page does not say is an edit to make; then move asOf forward.",
      "Dates in 'What to watch' are quoted from registries and releases and are not predictions. Registry completion dates move, and a company release is used only for a meeting date or a readout date, never for a result the paper has not yet reported.",
    ],
    tags: ["ctdna", "liquid-biopsy", "mrd", "mced"],
  }),
];

export const ctdnaTrials: TrialInput[] = [
  t({
    id: "tracc", name: "TRACC", aka: ["Tracking mutations in cell free tumour DNA to predict relapse in early colorectal cancer"], nct: "NCT04050345", phase: "observational", status: "recruiting", sponsor: "Royal Marsden NHS Foundation Trust", enrolled: 1000,
    setting: "Early colorectal cancer after curative surgery in the United Kingdom: serial ctDNA to predict relapse, with a later part that uses the result to guide adjuvant chemotherapy",
    tldr: "A UK study following 1,000 people after bowel cancer surgery with repeated blood tests for tumour DNA, to see how well a positive predicts the cancer coming back and whether the result can guide chemotherapy.",
    summary: "TRACC is the Royal Marsden-led UK programme tracking ctDNA after surgery for early colorectal cancer. The registry lists it as an observational study of 1,000 participants that started on 5 December 2016, still recruiting, with a primary completion date of 31 July 2029 and study completion of 31 July 2031. It is one of the three large national colorectal programmes (with CIRCULATE-Japan and CIRCULATE-US) whose readouts decide whether ctDNA-guided adjuvant therapy becomes standard outside a trial.",
    links: [ct("NCT04050345")], cancers: ["colorectal"], technologies: ["mrd-testing", "liquid-biopsy"], terms: ["mrd", "ctdna"], institutions: ["royal-marsden"], related: ["dynamic", "circulate-japan", "circulate-us", "ctdna-tests"],
  }),
  t({
    id: "bespoke-crc", name: "BESPOKE CRC", aka: ["BESPOKE Study of ctDNA Guided Therapy in Colorectal Cancer"], nct: "NCT04264702", phase: "observational", status: "active", sponsor: "Natera, Inc.", enrolled: 1788,
    setting: "Stage II to IV colorectal cancer after surgery in the United States: Signatera results returned to treating doctors, with treatment decisions and outcomes recorded",
    tldr: "Natera's US study in which 1,788 people with bowel cancer had Signatera blood tests after surgery and their doctors could act on the result; it records what changed and what happened, but does not randomise anyone.",
    summary: "BESPOKE CRC is Natera's prospective observational study of Signatera in resected colorectal cancer. The registry lists 1,788 participants, a start date of 24 April 2020 and a completion date of September 2025, with the overall status not updated. Because doctors chose treatment knowing the result, it can show how often a ctDNA result changes management and how ctDNA-positive and ctDNA-negative patients fare, but not whether acting on the test improves survival; that question belongs to DYNAMIC, CIRCULATE-US and VEGA.",
    links: [ct("NCT04264702")], cancers: ["colorectal"], drugs: ["signatera"], companies: ["natera"], technologies: ["mrd-testing", "liquid-biopsy"], terms: ["mrd", "ctdna", "tumour-informed-assay"], related: ["circulate-us", "ctdna-tests"],
  }),
  t({
    id: "mermaid-1", name: "MERMAID-1", nct: "NCT04385368", phase: "3", status: "completed", sponsor: "AstraZeneca", enrolled: 89,
    setting: "Completely resected stage II to III non-small-cell lung cancer: adjuvant durvalumab plus platinum chemotherapy against placebo plus chemotherapy, with ctDNA-positive patients as the group of interest",
    tldr: "A lung cancer trial that planned to test whether adding the immunotherapy durvalumab to chemotherapy after surgery helps people whose blood shows leftover tumour DNA; the registry lists it as complete with 89 participants.",
    summary: "MERMAID-1 was AstraZeneca's phase 3, double-blind trial of adjuvant durvalumab with platinum chemotherapy in completely resected stage II to III non-small-cell lung cancer, designed around ctDNA-detected minimal residual disease. The registry records a start on 17 July 2020, a status of completed and 89 participants, with primary and study completion on 31 August 2023. Together with MERMAID-2 it is the main example that a ctDNA-selected escalation trial can be hard to run in lung cancer, where adjuvant immunotherapy was approved for all-comers while the trials were recruiting.",
    links: [ct("NCT04385368")], cancers: ["nsclc"], drugs: ["durvalumab"], companies: ["astrazeneca"], technologies: ["mrd-testing", "liquid-biopsy"], terms: ["mrd", "ctdna"], related: ["mermaid-2", "ctdna-tests"],
  }),
  t({
    id: "mermaid-2", name: "MERMAID-2", nct: "NCT04642469", phase: "3", status: "completed", sponsor: "AstraZeneca", enrolled: 30,
    setting: "Stage II to III non-small-cell lung cancer after surgery and curative treatment: durvalumab against placebo started when ctDNA becomes detectable during surveillance",
    tldr: "A lung cancer trial that planned to start durvalumab the moment a surveillance blood test found tumour DNA, before any scan showed relapse; the registry lists it as complete with 30 participants.",
    summary: "MERMAID-2 was AstraZeneca's phase 3, double-blind trial of durvalumab against placebo for people with stage II to III non-small-cell lung cancer whose ctDNA became detectable during surveillance after curative treatment, the 'treat at molecular relapse' design. The registry records a start on 30 November 2020, a status of completed with 30 participants, primary completion on 31 May 2023 and study completion on 15 January 2024. Its small size is the reason the roadmap describes ctDNA-triggered escalation as unproven outside bladder cancer.",
    links: [ct("NCT04642469")], cancers: ["nsclc"], drugs: ["durvalumab"], companies: ["astrazeneca"], technologies: ["mrd-testing", "liquid-biopsy", "continuous-ctdna-monitoring"], terms: ["mrd", "ctdna"], related: ["mermaid-1", "ctdna-tests"],
  }),
  t({
    id: "circulate-us", name: "CIRCULATE-US", aka: ["NRG-GI008", "Colon Adjuvant Chemotherapy Based on Evaluation of Residual Disease"], nct: "NCT05174169", phase: "2/3", status: "recruiting", sponsor: "NRG Oncology", enrolled: 1912,
    setting: "Resected stage III colon cancer in the United States: Signatera result assigns patients to randomised de-escalation (shorter or later chemotherapy) if negative or escalation (mFOLFIRINOX against mFOLFOX6 or CAPOX) if positive",
    tldr: "The US national trial that uses a blood test for leftover tumour DNA to decide who gets less chemotherapy and who gets more after stage III colon cancer surgery, with both questions randomised.",
    summary: "CIRCULATE-US (NRG-GI008) is the NRG Oncology phase 2/3 trial in resected stage III colon cancer. Patients are tested with Signatera after surgery; ctDNA-negative patients are randomised between immediate chemotherapy and surveillance with treatment on conversion, and ctDNA-positive patients are randomised between standard mFOLFOX6 or CAPOX and intensified mFOLFIRINOX. The registry lists an estimated 1,912 participants, a start on 8 July 2022, recruiting status, primary completion on 10 March 2029 and study completion on 10 March 2030. It is the US counterpart of CIRCULATE-Japan and TRACC and the trial most likely to settle whether escalation helps ctDNA-positive colon cancer.",
    links: [ct("NCT05174169")], cancers: ["colorectal"], drugs: ["signatera", "capox"], companies: ["nrg-oncology", "natera"], technologies: ["mrd-testing", "liquid-biopsy"], terms: ["mrd", "ctdna", "de-escalation", "tumour-informed-assay"], related: ["dynamic", "circulate-japan", "tracc", "ctdna-mrd-to-adjuvant", "ctdna-tests"],
  }),
  t({
    id: "vanguard-study", name: "Vanguard Study (NCI Cancer Screening Research Network)", aka: ["The Vanguard Study: Testing a New Way to Screen for Cancer"], nct: "NCT06995898", phase: "platform", status: "recruiting", sponsor: "National Cancer Institute", enrolled: 24000,
    setting: "Adults without a cancer diagnosis in the United States: randomised to a multi-cancer detection blood test or usual care to test whether a full randomised screening trial is feasible",
    tldr: "The US government's first randomised study of multi-cancer blood tests: 24,000 people are being assigned to a blood test or usual care to work out how a much larger trial should be run.",
    summary: "The Vanguard study is the National Cancer Institute's randomised feasibility trial for multi-cancer detection tests, run through its Cancer Screening Research Network. The registry lists it as an interventional, randomised study with no drug phase, an estimated 24,000 participants, a start on 18 June 2025, recruiting status, primary completion on 31 January 2029 and study completion on 30 June 2029, across bladder, breast, colorectal, oesophageal, gastric, liver, lung, ovarian, pancreatic and prostate cancers. It is the counterpart to NHS-Galleri: a public-sector randomised test of the approach rather than of one company's product, and its design will decide whether a mortality-powered trial follows.",
    links: [ct("NCT06995898")], technologies: ["mced", "liquid-biopsy"], institutions: ["nci"], terms: ["stage-shift", "ppv"], related: ["nhs-galleri", "pathfinder-2", "galleri", "idea-prev-mced-registry-randomised", "ctdna-tests"],
  }),
];

export const ctdnaTerms: TermInput[] = [
  {
    id: "tumour-informed-assay", wikipediaChecked: "2026-09-22", kind: "term", name: "Tumour-informed versus tumour-naive ctDNA assays", aka: ["Tumour-informed MRD", "Tumour-agnostic ctDNA assay", "Personalised ctDNA panel"], category: "Biomarkers", asOf,
    tldr: "A tumour-informed blood test is built for one patient: the tumour is sequenced first and the test then hunts for that patient's own mutations in blood. A tumour-naive test uses the same fixed panel, often of methylation marks, for everyone, so it needs no tumour sample and returns faster.",
    summary: "Tumour-informed assays (Signatera, RaDaR) sequence the resected tumour, choose a set of clonal mutations, and track them in plasma at high depth, which gives high specificity and lets a positive be called on very few molecules; the cost is a tumour sample, a bespoke panel per patient and a longer first turnaround. Tumour-naive assays (Guardant Reveal and most multi-cancer tests) apply a fixed panel of mutations and methylation or fragmentation features to every sample, so they work without tissue and from the first draw, at the price of having to distinguish tumour signal from clonal haematopoiesis and other background. Trials so far have used tumour-informed tests for treatment decisions (DYNAMIC used a tumour-informed approach; IMvigor011 used Signatera), while screening tests are necessarily tumour-naive. Head-to-head sensitivity comparisons are few, and results are not interchangeable between assays.",
    links: [
      { label: "IMvigor011: ctDNA-guided adjuvant atezolizumab in muscle-invasive bladder cancer (NEJM 2025), tumour-informed Signatera", url: "https://europepmc.org/article/MED/41124204" },
      { label: "CMS article A58456: MolDX minimal residual disease testing for solid tumour cancers (lists covered tests)", url: "https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleId=58456" },
    ],
    technologies: ["mrd-testing", "liquid-biopsy", "mced", "cfdna-methylation-testing"], drugs: ["signatera", "radar-mrd", "guardant-reveal", "galleri"], terms: ["ctdna", "mrd", "cfdna", "clonal-haematopoiesis"], related: ["ctdna-tests", "imvigor011", "dynamic"], sections: ["diagnostics"],
  },
];

export const tldrZh: Record<string, string> = {
  "ctdna-tests": "血液中带有肿瘤脱落的 DNA 片段。这条路线图追踪读取这些片段的检测：从 1948 年首次在血浆中发现，到如今能选药、免除化疗或一次筛查多种癌症的血液检测，并列出接下来值得关注的结果。",
  "tracc": "英国一项研究，对 1,000 名肠癌手术后患者反复做肿瘤 DNA 血液检测，看阳性结果预测复发的准确程度，以及能否用它指导化疗。",
  "bespoke-crc": "Natera 在美国的研究：1,788 名肠癌患者术后接受 Signatera 血液检测，医生可据此决定治疗；它记录了改变和结局，但没有随机分组。",
  "mermaid-1": "一项肺癌试验，原计划检验术后在化疗基础上加用免疫药物度伐利尤单抗，是否对血液中仍有肿瘤 DNA 的人有益；登记显示已完成，仅 89 人参加。",
  "mermaid-2": "一项肺癌试验，原计划在随访血液检测发现肿瘤 DNA 的那一刻就开始度伐利尤单抗，早于任何影像上的复发；登记显示已完成，仅 30 人参加。",
  "circulate-us": "美国的全国性试验，用检测残留肿瘤 DNA 的血液检查决定 III 期结肠癌术后谁少做化疗、谁多做，两个问题都经随机分组。",
  "vanguard-study": "美国政府首个多癌种血液检测的随机研究：24,000 人被分到血液检测组或常规护理组，以确定更大规模试验应如何进行。",
  "tumour-informed-assay": "肿瘤知情型血液检测为一位患者专门定制：先测肿瘤序列，再在血液中寻找该患者自己的突变。肿瘤非知情型检测对所有人用同一套固定组合（常为甲基化标记），不需要肿瘤样本，出结果更快。",
};
