import type { EntityInput, RoadmapInput } from "@/lib/schema";

/**
 * The precision roadmap (Precision and protocol-upgrades run, 20 October 2026): where precision in cancer care stands
 * across molecular detection, surgery with imaging and pathology, radiotherapy and dosing, and what would make it
 * better. It is the record behind the precision matrix at /live/precision/ (src/data/precision-matrix/), which holds
 * one row per technology; this record carries the arc and the matrix carries the numbers.
 *
 * Every figure in a step was read from the abstract of the source in `links` and checked against the Europe PMC
 * record by exact string match on 20 October 2026: NCI-MATCH (Flaherty, JCO 2020), the genome-driven benefit estimate
 * (Marquart, Chen and Prasad, JAMA Oncology 2018), the margin recipe (van Herk, IJROBP 2000), heart dose after breast
 * radiotherapy (Darby, NEJM 2013), MIRAGE (Kishan, JAMA Oncology 2023), cavity shave margins (Chagpar, NEJM 2015),
 * proPSMA (Hofman, Lancet 2020), INSITE (Smith, NEJM Evidence 2023), DPYD genotype-guided dosing (Henricks, Lancet
 * Oncology 2018) and DYNAMIC (Tie, NEJM 2022). The Project Optimus wording is from the FDA page itself. Step eras are
 * the years of those publications, not estimates; the forward-looking steps carry no dates because no source gives one.
 *
 * Records the corpus already held are referenced, not restated: the ctDNA roadmap (`ctdna-tests`) owns blood-test
 * history, `radiation-roadmap`, `surgery-roadmap`, `molecular-imaging-roadmap` and `diagnostics-roadmap` own their
 * modalities, and the technologies themselves are tagged `precision` by the facets that own their domains.
 */

const asOf = "2026-10-20";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });

const NCI_MATCH = doi("Flaherty et al.: molecular landscape and actionable alterations in NCI-MATCH (Journal of Clinical Oncology 2020)", "10.1200/JCO.19.03010");
const MARQUART = doi("Marquart, Chen and Prasad: estimation of the percentage of US patients with cancer who benefit from genome-driven oncology (JAMA Oncology 2018)", "10.1001/jamaoncol.2018.1660");
const VAN_HERK = doi("van Herk et al.: the probability of correct target dosage, dose-population histograms for deriving treatment margins in radiotherapy (International Journal of Radiation Oncology, Biology, Physics 2000)", "10.1016/S0360-3016(00)00518-6");
const DARBY = doi("Darby et al.: risk of ischemic heart disease in women after radiotherapy for breast cancer (New England Journal of Medicine 2013)", "10.1056/NEJMoa1209825");
const MIRAGE = doi("Kishan et al.: MRI-guided versus CT-guided stereotactic body radiotherapy for prostate cancer, the MIRAGE randomised trial (JAMA Oncology 2023)", "10.1001/jamaoncol.2022.6558");
const CHAGPAR = doi("Chagpar et al.: a randomised, controlled trial of cavity shave margins in breast cancer (New England Journal of Medicine 2015)", "10.1056/NEJMoa1504473");
const PROPSMA = doi("Hofman et al.: PSMA PET-CT before curative-intent surgery or radiotherapy, the proPSMA randomised study (Lancet 2020)", "10.1016/S0140-6736(20)30314-7");
const INSITE = doi("Smith et al.: intraoperative fluorescence guidance for breast cancer lumpectomy surgery, the INSITE trial (NEJM Evidence 2023)", "10.1056/EVIDoa2200333");
const HENRICKS = doi("Henricks et al.: DPYD genotype-guided dose individualisation of fluoropyrimidine therapy, a prospective safety analysis (Lancet Oncology 2018)", "10.1016/S1470-2045(18)30686-7");
const DYNAMIC = doi("Tie et al.: circulating tumour DNA analysis guiding adjuvant therapy in stage II colon cancer, the DYNAMIC trial (New England Journal of Medicine 2022)", "10.1056/NEJMoa2200075");
const OPTIMUS = { label: "FDA Oncology Center of Excellence: Project Optimus", url: "https://www.fda.gov/about-fda/oncology-center-excellence/project-optimus" };
const MATRIX = { label: "OnCo: the precision matrix, technology by technology", url: "https://onco.cc/live/precision/" };

const roadmap: RoadmapInput = {
  kind: "roadmap", asOf,
  id: "precision-roadmap",
  name: "Precision roadmap: margins measured in millimetres → tests that find a target → doses fitted to the person → precision that changes outcomes",
  aka: ["Precision in cancer care", "How precise cancer treatment is", "Precision oncology roadmap", "Precision matrix"],
  tldr: "Cancer care is limited by how precise it is: how small a tumour a test can find, how close to it a surgeon can cut, how tightly a beam can be aimed and how well a dose fits the person. This roadmap follows each of those from where it stands now to the next step, and says plainly where more precision has been shown to help a patient and where it has not.",
  summary: "Precision means something different in each part of cancer care, and it is measured in different units. In radiotherapy it is millimetres: the margin of healthy tissue added around a target because the tumour moves and the set-up varies. In surgery it is whether the edge of what was removed is clear, and how often a second operation is needed. In imaging it is the smallest deposit a scan can see. In molecular testing it is how little tumour DNA a test can find, and separately how often the result points to a drug that works. In dosing it is how far a dose chosen by body size, or by the highest dose people tolerated in a first trial, sits from the dose a particular person needs.\n\nThe record so far is uneven, and that is the point of setting the domains side by side. Tighter radiotherapy margins have randomised evidence of fewer side effects: in MIRAGE, cutting the prostate margin from 4 mm to 2 mm with MRI guidance lowered acute moderate urinary side effects from 43.4 to 24.4 per cent. Genotype-guided dosing of fluoropyrimidines has prospective evidence of fewer severe side effects in carriers of DPYD variants. Molecular matching, the form of precision most often promised, finds a target in a minority and helps fewer: NCI-MATCH found an actionable alteration in 37.6 per cent of 5,954 people and assigned 17.8 per cent to a matched treatment, and a 2018 estimate put the share of US patients with metastatic cancer who benefit from genome-targeted therapy at 4.90 per cent.\n\nThe steps below run from the measurements that made precision a number to the ones that would make it routine. The precision matrix at /live/precision/ holds one row per technology: what precision means there, how precise it is today with the source's own words, what limits it, the next step and what that step would buy a patient. Where a technology is sold as more precise than its evidence shows, the row carries a grade on the same scale OnCo uses for complementary therapies.",
  sections: ["diagnostics", "imaging", "surgery", "radiation", "targeted-therapy", "chemotherapy"],
  technologies: ["imrt-igrt", "respiratory-motion-management", "mr-linac", "adaptive-radiotherapy", "sbrt", "proton-therapy", "sentinel-node", "psma-pet", "fluorescence-guided-surgery", "intraoperative-fluorescence-imaging-systems", "digital-pathology-ai", "liquid-biopsy", "mrd-testing", "companion-diagnostic", "variant-knowledgebases", "dpyd-genotyping", "oncology-pharmacogenomics", "functional-precision-medicine-haematology"],
  drugs: ["pegulicianine", "signatera", "fluorouracil", "capecitabine", "sotorasib"],
  trials: ["nci-match", "propsma", "dynamic", "imvigor011"],
  terms: ["deep-inspiration-breath-hold", "breast-margins-and-re-excision", "resection-margins", "ngs", "tumour-agnostic", "ctdna", "mrd", "project-optimus", "hypofractionation"],
  bottlenecks: ["b-dose-optimisation"],
  keyPapers: ["paper-flaherty-j-clin-oncol", "paper-kishan-jama-oncol", "paper-propsma-hofman-lancet-2020", "paper-henricks-lancet-oncol"],
  related: ["ctdna-tests", "radiation-roadmap", "surgery-roadmap", "molecular-imaging-roadmap", "diagnostics-roadmap", "idea-moon-image-guided-surgery-everywhere", "idea-bio2-lean-mass-dosing", "idea-tr1-model-based-dose-finding-with-late-toxicity", "idea-moon-post-approval-dose-deescalation", "idea-cost-optimus-legacy-drugs", "idea-net-dosimetry-prrt", "idea-bio2-functional-precision-rare"],
  links: [MATRIX, VAN_HERK, DARBY, MIRAGE, CHAGPAR, PROPSMA, INSITE, NCI_MATCH, MARQUART, HENRICKS, OPTIMUS, DYNAMIC],
  steps: [
    {
      era: "2000", status: "historic", title: "Precision in radiotherapy gets a formula",
      description: "Every radiotherapy plan adds a margin of healthy tissue around the target, because the set-up varies from day to day and the tumour moves. Van Herk and colleagues turned that margin into arithmetic in 2000: to give at least 95 per cent of the dose to the target in 90 per cent of patients, the margin should be about 2.5 times the spread of systematic errors plus 0.7 times the spread of random ones, and because that recipe leaves out rotations and changes of shape the authors called it a lower limit for safe radiotherapy. From then on, a margin was a measured number that better imaging could shrink.",
      refs: ["imrt-igrt", "radiation-roadmap", "linear-quadratic-model"],
    },
    {
      era: "2013 to 2023", status: "current", title: "The millimetres matter to the organ next door",
      description: "The reason to shrink a margin is the tissue beside it. In 2,168 women given radiotherapy for breast cancer in Sweden and Denmark between 1958 and 2001, the rate of major coronary events rose by 7.4 per cent for every gray of mean heart dose, with no apparent threshold, which is the case for breath-holding and motion management that keep the heart out of the beam. The first randomised test of a tighter margin came from MIRAGE: 156 men having stereotactic radiotherapy for prostate cancer were given either a 4 mm margin with CT guidance or a 2 mm margin with MRI guidance, and acute moderate or worse urinary side effects fell from 43.4 to 24.4 per cent, and moderate or worse bowel side effects from 10.5 to 0 per cent. Longer follow-up is needed to show whether the difference lasts.",
      refs: ["deep-inspiration-breath-hold", "respiratory-motion-management", "cardio-oncology", "mr-linac", "sbrt", "paper-kishan-jama-oncol"],
    },
    {
      era: "2015 to 2023", status: "current", title: "Seeing the edge: the margin, the scan and the second operation",
      description: "In surgery, imprecision shows up as a second operation. In a randomised trial of 235 patients having a partial mastectomy, funded by the Yale Cancer Center, 34 per cent of those whose surgeon took no extra tissue had a positive margin and 21 per cent needed a second operation; shaving extra tissue from the cavity halved both, to 19 and 10 per cent. Imaging moved in the same direction: in proPSMA, 302 men with high-risk prostate cancer were randomised to PSMA PET-CT or to CT and bone scanning, and PSMA PET-CT was 92 per cent accurate against 65 per cent for finding spread to lymph nodes or further. A dye that lights up tumour left in the cavity followed: in the INSITE trial of pegulicianine it removed tumour left behind after standard lumpectomy in 27 of 357 patients, with a per-margin sensitivity of 49.3 per cent and a specificity of 85.2 per cent, so it helps the surgeon find some residual cancer and misses about half.",
      refs: ["breast-margins-and-re-excision", "resection-margins", "psma-pet", "propsma", "paper-propsma-hofman-lancet-2020", "pegulicianine", "fluorescence-guided-surgery", "intraoperative-fluorescence-imaging-systems", "sentinel-node", "surgery-roadmap", "molecular-imaging-roadmap"],
    },
    {
      era: "2018 to 2020", status: "current", title: "Matching drugs to mutations: precise tests, few matches",
      description: "Sequencing a tumour is precise; finding a drug that works for what it shows is less often possible. NCI-MATCH sequenced tumours from 5,954 people with cancers that had stopped responding to standard treatment, at 1,117 sites: profiling worked for 93.0 per cent, an actionable alteration was found in 37.6 per cent, and 17.8 per cent were assigned to a matched treatment. The share varied by cancer, from more than 35 per cent for urothelial cancers to under 6 per cent for pancreatic and small-cell lung cancer. A 2018 estimate from FDA approvals put the share of US patients with metastatic cancer eligible for genome-targeted therapy at 8.33 per cent and the share estimated to benefit at 4.90 per cent. The test can be precise and the match still rare, which is why the matrix scores both.",
      refs: ["nci-match", "paper-flaherty-j-clin-oncol", "ngs", "companion-diagnostic", "variant-knowledgebases", "tumour-agnostic", "diagnostics-roadmap"],
    },
    {
      era: "From 2018", status: "current", title: "The dose stops being one size for everyone",
      description: "Chemotherapy doses are calculated from height and weight, and the FDA says the dose of many newer targeted drugs is inadequately characterised before the trials that lead to approval. Two changes have started to move that. In 1,103 patients in 17 Dutch hospitals tested for four DPYD variants before fluoropyrimidine chemotherapy, the 8 per cent who carried one were given a lower starting dose; for carriers of DPYD*2A the relative risk of severe toxicity was 1.31 with genotype-guided dosing against 2.87 in a historical cohort treated at full dose, and the authors concluded that genotype-based dose reductions improved patient safety. For new drugs, the FDA's Project Optimus asks companies to find the best dose rather than the highest tolerable one, because, in its own words, a poorly characterised dose may lead to \"selection of a dose that provides more toxicity without additional efficacy\".",
      refs: ["dpyd-genotyping", "oncology-pharmacogenomics", "paper-henricks-lancet-oncol", "fluorouracil", "capecitabine", "project-optimus", "b-dose-optimisation", "sotorasib"],
    },
    {
      era: "2022 to 2026", status: "current", title: "A blood test for residual disease starts to decide treatment",
      description: "Tests that find tumour DNA in the blood after surgery are the molecular form of a margin: they ask whether anything was left behind. In DYNAMIC, 455 people with stage II colon cancer were randomised to have adjuvant chemotherapy decided by a blood test or by the usual pathology features; the blood-test group received chemotherapy less often (15 against 28 per cent) with two-year recurrence-free survival of 93.5 against 92.4 per cent. The ctDNA roadmap follows this in detail, including the first drug approval that depends on a residual disease result. How little tumour DNA a test can find is the precision limit, and it is recorded row by row in the matrix.",
      refs: ["ctdna-tests", "mrd-testing", "liquid-biopsy", "dynamic", "signatera", "imvigor011", "ctdna", "mrd"],
    },
    {
      era: "Next", status: "emerging", title: "Adapting to the day: plans and operations that follow the tumour",
      description: "The next step in radiotherapy and surgery is to measure during treatment rather than before it. Online adaptive radiotherapy redraws the plan on the treatment couch from that day's scan, so the margin can follow a shrinking tumour or a filling bladder; trials are testing whether that reduces side effects in more cancers than prostate. In surgery, the proposals are fluorescent agents, mass spectrometry and rapid digital pathology that read the margin before the wound is closed. Each is available somewhere and routine almost nowhere, and for most of them the outcome a patient would feel, fewer side effects or fewer second operations, has not yet been measured in a randomised trial.",
      refs: ["adaptive-radiotherapy", "mr-linac", "proton-therapy", "digital-pathology-ai", "fluorescence-guided-surgery", "idea-moon-image-guided-surgery-everywhere"],
    },
    {
      era: "Next", status: "emerging", title: "Dosing the person rather than the average",
      description: "Proposals in the corpus would carry dose precision further: dosing chemotherapy by muscle mass measured on routine scans rather than by height and weight, dose-finding designs that count late and lasting side effects rather than the first month only, randomised lower-dose trials for drugs already approved at the highest tolerated dose, and radioligand doses set by measuring what each patient's tumour and kidneys absorb. None has yet changed a label or a guideline. They are listed so that the gap between a dose that is convenient to calculate and one that fits the person stays visible.",
      refs: ["idea-bio2-lean-mass-dosing", "idea-tr1-model-based-dose-finding-with-late-toxicity", "idea-moon-post-approval-dose-deescalation", "idea-cost-optimus-legacy-drugs", "idea-net-dosimetry-prrt", "b-dose-optimisation"],
    },
    {
      era: "Further", status: "speculative", title: "Testing the drug on the patient's own cells",
      description: "Matching by mutation predicts which drug might work; testing drugs directly on a patient's living cancer cells measures it. In blood cancers, where cells survive outside the body long enough to be screened against a panel of approved drugs, this has reached small interventional trials. For solid tumours it remains research. If it works at scale it would change the molecular question from whether a target is present to whether a drug kills this cancer.",
      refs: ["functional-precision-medicine-haematology", "idea-bio2-functional-precision-rare"],
    },
    {
      era: "What sets the pace", status: "current", title: "Precision is not the same as benefit",
      description: "Three things limit how fast precision reaches patients, and only one of them is technical. The first is evidence: a tighter margin, a more sensitive test or a fitted dose has to change something a patient feels, and for many technologies that trial has not been run, so the matrix records the outcome as shown, plausible or not established. The second is access: the machines, assays and genotyping tests exist and are unevenly paid for. The third is the honest arithmetic of molecular matching, where a test that finds a target in a third of people leads to a matched treatment in fewer than one in five and a benefit in fewer still. Where precision is marketed beyond what has been shown, the matrix grades it rather than leaving it out.",
      refs: ["nci-match", "paper-flaherty-j-clin-oncol", "b-dose-optimisation", "companion-diagnostic", "mrd-testing"],
    },
  ],
  watch: [],
  tags: ["precision"],
};

export const precisionRoadmap: EntityInput[] = [roadmap];
