import type { TermInput } from "@/lib/schema";
import type { Spike, SpikeSupplement } from "./index";

/**
 * PROSTATE CANCER: THE GLOSSARY LAYER of the September 2026 deep dive.
 *
 * The evidence layer (./prostate-evidence*.ts) wrote twenty words out in prose and listed them in PENDING_TERMS
 * (./prostate-evidence-shared.ts) because no record held them. Three of the twenty already had a record and are not
 * rewritten here: `psa-doubling-time`, a term in ./prostate-living.ts; `lineage-plasticity`, which is a stage of the
 * resistance atlas in ../mechanics-atlas.ts rather than a glossary term, with the pathway record
 * `lineage-plasticity-neuroendocrine` and the term `histologic-transformation` beside it; and
 * `homologous-recombination-repair`, which is a pathway record in ../mechanics-pathways.ts. Two more existed under a
 * different id, which the pending list did not catch, and are supplemented rather than duplicated (see SUPPLEMENTS):
 *
 *   psa50-response                    -> the existing `psa50` term ("PSA50 / PSA90 response", ../spikes/prostate.ts)
 *   androgen-receptor-splice-variant  -> the existing `ar-v7` term ("AR-V7 splice variant", ../spikes/prostate.ts)
 *
 * That leaves fifteen new terms, written here. Most of them are measurement words. A reader meets them as though
 * they had one meaning each, and they do not: metastasis-free survival and radiographic progression-free survival
 * are defined by whoever ran the trial, the overtreatment figure depends entirely on the method used to estimate it,
 * and a British MRI report and an American one score the same scan on two different five-point scales. The point of
 * an entry here is to say who defines the word, how, and with which cohort, so that two numbers a reader meets in
 * two places can be told apart.
 *
 * Sources, all opened on 25 September 2026: NICE NG131 (prostate cancer: diagnosis and management, May 2019, last
 * updated 15 December 2021), read for the recommendation numbers and for its own glossary definition of template and
 * mapping template biopsy; the Prostate Cancer Clinical Trials Working Group papers PCWG2 (Scher, J Clin Oncol 2008)
 * and PCWG3 (Scher, J Clin Oncol 2016); the ICECaP meta-analysis of metastasis-free survival (Xie, J Clin Oncol
 * 2017); SPARTAN (Smith, N Engl J Med 2018); ERSPC at 9 and at 16 years (Schroder, N Engl J Med 2009; Hugosson, Eur
 * Urol 2019) and PLCO (Andriole, N Engl J Med 2009); the lead-time and overdiagnosis modelling (Draisma, J Natl
 * Cancer Inst 2009), the overdiagnosis and overtreatment review (Loeb, Eur Urol 2014), the PSA-era count (Welch and
 * Albertsen, J Natl Cancer Inst 2009) and the 2018 USPSTF statement (JAMA 2018); Dess (JAMA Oncol 2019) for
 * other-cause mortality; Conti (Nat Genet 2021), the BARCODE1 pilot (Benafif, BJU Int 2022), BARCODE1 itself (McHugh,
 * N Engl J Med 2025) and the standardised comparison against Goteborg-2 and ProScreen (Sud, Eur Urol Oncol 2026) for
 * polygenic risk scores; Baca (Cell 2013) for chromoplexy; Chung (JCO Precis Oncol 2019), Sokol (JCO Precis Oncol
 * 2020), Westphalen (Clin Cancer Res 2022) and ARIEL2 (Swisher, Lancet Oncol 2017) for genome-wide loss of
 * heterozygosity; Epstein (Am J Surg Pathol 2014), the WHO fifth edition as reported by Kench (Histopathology 2022)
 * and the Royal College of Pathologists dataset G084 for neuroendocrine differentiation; PROMIS (Ahmed, Lancet 2017)
 * and Johnson (Eur Urol 2019) for template mapping biopsy and whole-mount pathology, with the whole-mount review by
 * Cimadamore (Eur Urol Oncol 2021); PI-RADS v2.1 (Turkbey, Eur Urol 2019) and the ACR's own PI-RADS page; RESTORE
 * (Teply, Lancet Oncol 2018) and TRANSFORMER (Denmeade, J Clin Oncol 2021) for bipolar androgen therapy; and SWOG
 * 9346 (Hussain, N Engl J Med 2013) with NG131 1.4.1 and 1.4.2 for intermittent androgen deprivation.
 *
 * This file creates no cancer record, no trial record and no paper record. Every number carries its cohort and none
 * of it is a prognosis for an individual.
 */

const asOf = "2026-09-25";
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });
const tags = ["gu", "prostate-glossary"];

const SRC = {
  ng131: { label: "NICE NG131: prostate cancer, diagnosis and management (recommendations)", url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations" },
  ng131terms: { label: "NICE NG131: terms used in this guideline (template biopsy and mapping template biopsy)", url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations#terms-used-in-this-guideline" },
  rcpath: { label: "Royal College of Pathologists G084: dataset for histopathology reports for prostatic carcinoma, version 4, October 2024", url: "https://www.rcpath.org/static/8cc88604-2c8d-4df4-a99542df41c102af/G084-dataset-for-histopathology-reports-for-prostatic-carcinoma.pdf" },
  who2022: { label: "WHO Classification of Tumours, 5th edition: tumours of the prostate (IARC, 2022)", url: "https://tumourclassification.iarc.who.int/chapters/36" },
  kench2022: doi("Kench et al., Histopathology 2022: WHO Classification of Tumours fifth edition, evolving issues in the classification, diagnosis and prognostication of prostate cancer", "10.1111/his.14711"),
  epstein2014: doi("Epstein et al., American Journal of Surgical Pathology 2014: proposed morphologic classification of prostate cancer with neuroendocrine differentiation", "10.1097/pas.0000000000000208"),
  pcwg2: doi("Scher et al., Journal of Clinical Oncology 2008 (PCWG2): design and end points of clinical trials for patients with progressive prostate cancer and castrate levels of testosterone", "10.1200/jco.2007.12.4487"),
  pcwg3: doi("Scher et al., Journal of Clinical Oncology 2016 (PCWG3): trial design and objectives for castration-resistant prostate cancer, updated recommendations", "10.1200/jco.2015.64.2702"),
  icecap: doi("Xie et al., Journal of Clinical Oncology 2017 (ICECaP): metastasis-free survival is a strong surrogate of overall survival in localized prostate cancer", "10.1200/jco.2017.73.9987"),
  spartan: doi("Smith et al., New England Journal of Medicine 2018 (SPARTAN): apalutamide treatment and metastasis-free survival in prostate cancer", "10.1056/nejmoa1715546"),
  erspc2009: doi("Schroder et al., New England Journal of Medicine 2009 (ERSPC): screening and prostate cancer mortality in a randomised European study", "10.1056/nejmoa0810084"),
  erspc16: doi("Hugosson et al., European Urology 2019: a 16-year follow-up of the European Randomized study of Screening for Prostate Cancer", "10.1016/j.eururo.2019.02.009"),
  plco: doi("Andriole et al., New England Journal of Medicine 2009 (PLCO): mortality results from a randomised prostate cancer screening trial", "10.1056/nejmoa0810696"),
  draisma: doi("Draisma et al., Journal of the National Cancer Institute 2009: lead time and overdiagnosis in prostate-specific antigen screening, importance of methods and context", "10.1093/jnci/djp001"),
  loeb: doi("Loeb et al., European Urology 2014: overdiagnosis and overtreatment of prostate cancer", "10.1016/j.eururo.2013.12.062"),
  welch: doi("Welch and Albertsen, Journal of the National Cancer Institute 2009: prostate cancer diagnosis and treatment after the introduction of prostate-specific antigen screening, 1986 to 2005", "10.1093/jnci/djp278"),
  uspstf2018: doi("US Preventive Services Task Force, JAMA 2018: screening for prostate cancer, recommendation statement", "10.1001/jama.2018.3710"),
  dess: doi("Dess et al., JAMA Oncology 2019: association of Black race with prostate cancer-specific and other-cause mortality", "10.1001/jamaoncol.2019.0826"),
  conti: doi("Conti et al., Nature Genetics 2021: trans-ancestry genome-wide association meta-analysis of prostate cancer", "10.1038/s41588-020-00748-0"),
  barcode1: doi("McHugh et al., New England Journal of Medicine 2025 (BARCODE1): assessment of a polygenic risk score in screening for prostate cancer", "10.1056/nejmoa2407934"),
  barcode1pilot: doi("Benafif et al., BJU International 2022: the BARCODE1 pilot, a feasibility study of using germline single nucleotide polymorphisms to target prostate cancer screening", "10.1111/bju.15535"),
  sud2026: doi("Sud, McNeill and Vickers, European Urology Oncology 2026: comparison of results from the BARCODE1 study and contemporary prostate cancer screening trials", "10.1016/j.euo.2025.12.013"),
  baca: doi("Baca et al., Cell 2013: punctuated evolution of prostate cancer genomes", "10.1016/j.cell.2013.03.021"),
  grasso: doi("Grasso et al., Nature 2012: the mutational landscape of lethal castration-resistant prostate cancer", "10.1038/nature11125"),
  chung: doi("Chung et al., JCO Precision Oncology 2019: prospective comprehensive genomic profiling of 3,476 primary and metastatic prostate tumours", "10.1200/po.18.00283"),
  sokol: doi("Sokol et al., JCO Precision Oncology 2020: pan-cancer analysis of BRCA1 and BRCA2 genomic alterations and their association with genomic instability as measured by genome-wide loss of heterozygosity", "10.1200/po.19.00345"),
  westphalen: doi("Westphalen et al., Clinical Cancer Research 2022: pan-cancer analysis of homologous recombination repair-associated gene alterations and genome-wide loss-of-heterozygosity score", "10.1158/1078-0432.ccr-21-2096"),
  ariel2: doi("Swisher et al., Lancet Oncology 2017 (ARIEL2 part 1): rucaparib in relapsed, platinum-sensitive high-grade ovarian carcinoma", "10.1016/s1470-2045(16)30559-9"),
  promis: doi("Ahmed et al., The Lancet 2017 (PROMIS): diagnostic accuracy of multiparametric MRI and TRUS biopsy in prostate cancer", "10.1016/s0140-6736(16)32401-1"),
  johnson: doi("Johnson et al., European Urology 2019: detection of individual prostate cancer foci via multiparametric magnetic resonance imaging", "10.1016/j.eururo.2018.11.031"),
  cimadamore: doi("Cimadamore et al., European Urology Oncology 2021: added clinical value of whole-mount histopathology of radical prostatectomy specimens, a collaborative review", "10.1016/j.euo.2020.08.003"),
  pirads21: doi("Turkbey et al., European Urology 2019: Prostate Imaging Reporting and Data System version 2.1, the 2019 update of PI-RADS version 2", "10.1016/j.eururo.2019.02.033"),
  acrPirads: { label: "American College of Radiology: PI-RADS, Prostate Imaging Reporting and Data System (v2.1, a joint development of the ACR, ESUR and the Admetech Foundation)", url: "https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/PI-RADS" },
  restore: doi("Teply et al., Lancet Oncology 2018 (RESTORE): bipolar androgen therapy after progression on enzalutamide in metastatic castration-resistant prostate cancer", "10.1016/s1470-2045(17)30906-3"),
  transformer: doi("Denmeade et al., Journal of Clinical Oncology 2021 (TRANSFORMER): bipolar androgen therapy versus enzalutamide in asymptomatic metastatic castration-resistant prostate cancer", "10.1200/jco.20.02759"),
  swog9346: doi("Hussain et al., New England Journal of Medicine 2013 (SWOG 9346): intermittent versus continuous androgen deprivation in metastatic prostate cancer", "10.1056/nejmoa1212299"),
  antonarakis: doi("Antonarakis et al., New England Journal of Medicine 2014: AR-V7 and resistance to enzalutamide and abiraterone in prostate cancer", "10.1056/nejmoa1315815"),
  abida: doi("Abida et al., Journal of Clinical Oncology 2020 (TRITON2): rucaparib in men with metastatic castration-resistant prostate cancer harbouring a BRCA1 or BRCA2 alteration", "10.1200/jco.20.01035"),
  proscreen: doi("Auvinen et al., JAMA 2024 (ProScreen): prostate cancer screening with PSA, kallikrein panel and MRI", "10.1001/jama.2024.3841"),
};

const PROSTATE = "prostate";
const LOW_RISK = "prostate-low-risk";
const INTERMEDIATE_RISK = "prostate-intermediate-risk";
const HIGH_RISK = "prostate-high-risk";
const BCR = "prostate-bcr";
const MHSPC = "prostate-mhspc";
const NMCRPC = "prostate-nmcrpc";
const MCRPC = "prostate-mcrpc";
const NEPC = "prostate-nepc";

// ======================= TERMS =======================
export const prostateGlossaryTerms: TermInput[] = [

  // ---------------------------------------------------------------- the screening argument
  { id: "lead-time-bias", kind: "term", asOf, tags, name: "Lead time, and lead-time bias", category: "Epidemiology & prevention", wikipedia: W("Lead_time_bias"),
    aka: ["lead time", "lead-time", "lead time bias", "screening lead time", "lead time in prostate cancer screening"],
    tldr: "Finding a cancer earlier means you know about it for longer, even if nothing you do changes the day you die. That extra stretch of knowing is called the lead time, and lead-time bias is the mistake of counting it as extra life. It is the single biggest reason survival figures make screening look better than it is.",
    summary: "Lead time is the interval between the moment a screening test finds a cancer and the moment that cancer would have been diagnosed because it caused symptoms. Lead-time bias is what happens when survival is measured from diagnosis: a man whose cancer is found five years earlier appears to survive five years longer even if the date of his death is unchanged. It is why survival from diagnosis is close to useless as a measure of whether a screening programme works, and why randomised screening trials report mortality in the whole invited population instead.\n\nProstate cancer has the longest lead time of any common cancer, and the honest figure is a range rather than a number. Draisma and Etzioni ran three independently built models of prostate cancer progression and detection, all calibrated to Surveillance, Epidemiology, and End Results incidence in United States men aged 54 to 80 between 1985 and 2000. Among screen-detected cancers that would have surfaced in the man's lifetime, mean lead time was 5.4 to 6.9 years across the three models; the original MISCAN model fitted instead to the Rotterdam section of the European screening trial gave 7.9 years. Published estimates before that work spanned 3 to 12 years. The three models agreed closely with each other for any single definition of lead time and disagreed substantially across definitions, which is the paper's real finding: the number is a property of the question, not of the disease.\n\nThe consequence is practical. Lead time is what generates overdiagnosis: if the lead time is longer than the man's remaining life, the cancer would never have troubled him, and the same modelling put overdiagnosis at 23 to 42 percent of screen-detected cancers in the United States calibration and 66 percent in the Rotterdam one. It is also why the 2018 United States task force statement expresses benefit as deaths and metastatic cases prevented per 1,000 men screened over about 13 years rather than as a survival rate, and why the two 2009 randomised trials, ERSPC and PLCO, are the evidence rather than any registry series.",
    cancers: [PROSTATE, LOW_RISK, INTERMEDIATE_RISK],
    terms: ["overdiagnosis", "overtreatment", "number-needed-to-screen", "screening", "psa"],
    related: ["overdiagnosis", "number-needed-to-screen", "overtreatment", "paper-draisma-lead-time-overdiagnosis-psa-jnci-2009", "prostate-screening-psa-mri"],
    sections: ["early-detection", "prevention"],
    keyPapers: ["paper-draisma-lead-time-overdiagnosis-psa-jnci-2009", "paper-welch-albertsen-psa-era-diagnosis-treatment-jnci-2009", "paper-schroder-erspc-screening-mortality-nejm-2009"],
    bottlenecks: ["b-overdiagnosis", "b-early-detection", "b-trial-design"],
    links: [SRC.draisma, SRC.welch, SRC.uspstf2018, SRC.erspc2009],
    notes: [
      "Why a five-year survival rate cannot settle a screening argument. Three biases push it up without anyone living longer: lead-time bias, because the clock starts earlier; length bias, because a test that samples the population at intervals preferentially catches slow-growing cancers that sit around waiting to be found; and overdiagnosis, because cancers that would never have surfaced are added to the numerator of survivors. All three run in the same direction. Mortality in a randomised invited population is immune to all three, which is why it is the endpoint the trials used.",
      "Lead time is not the same as overdiagnosis, although the two are produced by the same mechanism. Lead time is how much earlier the diagnosis came. Overdiagnosis is the case where the lead time exceeded the rest of the man's life, so the diagnosis never needed to come at all. A long lead time with a long life left is exactly what screening is for.",
    ] },

  { id: "overtreatment", kind: "term", asOf, tags, name: "Overtreatment", category: "Epidemiology & prevention", wikipedia: W("Unnecessary_health_care"),
    aka: ["over-treatment", "overtreatment of prostate cancer", "unnecessary treatment", "treatment of overdiagnosed cancer"],
    tldr: "Treating a cancer that was never going to cause trouble. It is the harm that overdiagnosis causes: the diagnosis itself does not leak urine or end erections, the operation does. Published estimates of how much prostate cancer is overdiagnosed range from under 2 percent to two thirds, and the range is a fact about the methods, not about the disease.",
    summary: "Overdiagnosis is finding a cancer that would never have caused symptoms or death; overtreatment is what turns that into an injury. The distinction matters because only one of the two can be fixed once the test has been done. An overdiagnosed cancer managed by active surveillance costs anxiety and appointments; the same cancer taken to radical prostatectomy or radical radiotherapy costs the continence and sexual function of a man who was never at risk from it.\n\nThe range, and why it is a range. Loeb and Etzioni reviewed the primary data across epidemiological, clinical and autopsy studies and found overdiagnosis estimates from 1.7 percent to 67 percent. Four incompatible methods sit behind that spread: lead-time modelling, which gave 23 to 42 percent of screen-detected cancers in the United States calibration and 66 percent in the Rotterdam one (Draisma); excess incidence against a pre-screening baseline, which is how Welch and Albertsen counted an additional 1,305,600 United States diagnoses and 1,004,800 definitive treatments between 1986 and 2005, and concluded that more than 20 men were diagnosed for each man who experienced the presumed benefit; counting low-grade minimal tumours in prostatectomy specimens, which gives 1.7 to 46.8 percent; and autopsy series, which find prostate cancer in 18.5 to 38.5 percent of men who died of something else. Each method answers a different question, each depends on the background incidence of the population it was measured in, and none of them is wrong. A single overdiagnosis percentage quoted without its method and its population is not a meaningful figure.\n\nThe harm side is better measured than the numerator. The 2018 United States task force statement puts it in units a man can weigh: screening men aged 55 to 69 may prevent about 1.3 prostate cancer deaths and about 3 cases of metastatic disease per 1,000 men screened over about 13 years, while about 1 in 5 men who have radical prostatectomy develop long-term urinary incontinence and 2 in 3 experience long-term erectile dysfunction. Those harms fall only on the men who are treated, which is why the size of the overtreatment problem depends on how many screen-detected cancers are managed conservatively, and why the rise of active surveillance, magnetic resonance imaging triage before biopsy and risk-banded guidelines (NICE NG131 offers active surveillance first in Cambridge Prognostic Group 1) changes the answer without changing the test.",
    cancers: [PROSTATE, LOW_RISK, INTERMEDIATE_RISK],
    terms: ["overdiagnosis", "lead-time-bias", "number-needed-to-screen", "screening", "active-surveillance-term", "gleason-grade-group", "quality-of-life"],
    related: ["overdiagnosis", "lead-time-bias", "active-surveillance-term", "active-surveillance", "paper-loeb-overdiagnosis-overtreatment-prostate-eur-urol-2014"],
    technologies: ["active-surveillance", "prostate-screening-psa-mri"],
    sections: ["early-detection", "prevention"],
    keyPapers: ["paper-loeb-overdiagnosis-overtreatment-prostate-eur-urol-2014", "paper-draisma-lead-time-overdiagnosis-psa-jnci-2009", "paper-welch-albertsen-psa-era-diagnosis-treatment-jnci-2009", "paper-uspstf-prostate-screening-jama-2018"],
    bottlenecks: ["b-overdiagnosis", "b-toxicity-qol", "b-early-detection", "b-patient-voice"],
    links: [SRC.loeb, SRC.draisma, SRC.welch, SRC.uspstf2018, SRC.ng131],
    notes: [
      "Why the estimates differ by method, in one line each. Lead-time modelling asks what fraction of screen-detected cancers would not have surfaced before death, and depends on the assumed natural history and on competing mortality. Excess incidence compares diagnoses after screening began against a pre-screening baseline, and depends on how much of the rise was incidence rather than detection. Prostatectomy series count low-grade minimal tumours in specimens, and depend on the threshold for minimal. Autopsy series count cancer in men who died of other causes, and measure reservoir rather than overdiagnosis, because some autopsy-detected cancer is high grade and would have surfaced.",
      "Overtreatment is not a synonym for treatment you regret. It is a population measure: it counts the treatments given to cancers that would never have become symptomatic, and it can only be estimated in aggregate. No test tells an individual man that his own cancer is one of them, which is why the practical answer is a strategy that defers treatment safely rather than a better estimate.",
      "The older figures are historical. The Loeb review was published in 2014, before magnetic resonance imaging triage before biopsy and before active surveillance reached its current share of low-risk management, and the review itself records contemporary international studies showing increasing use of conservative management.",
    ] },

  { id: "number-needed-to-screen", kind: "term", asOf, tags, name: "Number needed to screen (and number needed to diagnose)", category: "Epidemiology & prevention",
    aka: ["NNS", "number needed to invite", "number needed to diagnose", "NND", "number needed to treat to prevent one prostate cancer death"],
    tldr: "How many men have to be offered the test for one man to be saved from dying of prostate cancer, and how many extra cancers have to be found along the way. In the big European trial the answer at sixteen years was 570 men invited and 18 extra cancers diagnosed per death prevented, and the figures get better the longer the trial runs.",
    summary: "The number needed to screen is the reciprocal of the absolute risk difference in disease-specific mortality between an invited group and a control group: how many people must be invited to, or must undergo, screening for one death from that disease to be prevented over a stated follow-up. Its companion, the number needed to diagnose, is how many extra cancers must be found to prevent that one death, and is the arithmetic of overdiagnosis. Neither is a property of the test. Both depend on the follow-up length, on the disease risk of the population, on the screening interval and threshold, and on whether the denominator counts men invited or men actually screened.\n\nThe European Randomized study of Screening for Prostate Cancer is the reference. At a median 9 years of follow-up in the predefined core age group of 162,243 men aged 55 to 69, the rate ratio for prostate cancer death was 0.80 (95 percent confidence interval 0.65 to 0.98), the absolute risk difference 0.71 deaths per 1,000 men, and 1,410 men had to be screened and 48 additional cases treated to prevent one prostate cancer death. At 16 years, in 162,389 men of the same core group, the rate ratio was 0.80 (0.72 to 0.89), the absolute mortality difference had grown from 0.14 percent at 13 years to 0.18 percent, the number needed to be invited had fallen to 570 from 742 at 13 years, and the number needed to diagnose had fallen to 18 from 26. The direction of travel is the point: the benefit accrues with time while the overdiagnosed cancers are all counted up front, so a number needed to screen quoted without its follow-up is close to meaningless.\n\nThree cautions. First, ERSPC's 1,410 counts men screened and its 570 counts men invited, which are different denominators, and the second is the one that matches how a programme is offered. Second, PLCO reported no significant mortality difference in 76,693 United States men, but screening in its control group rose from 40 percent in the first year to 52 percent in the sixth, so its comparison is organised against opportunistic screening and no number needed to screen can be computed from it. Third, none of these figures came from a modern pathway: the trials randomised a blood test, not magnetic resonance imaging triage followed by targeted biopsy and active surveillance, and both the numerator and the denominator move when the pathway changes. The 2018 United States task force expresses the same quantity the other way up, as about 1.3 prostate cancer deaths and about 3 metastatic cases prevented per 1,000 men screened over about 13 years.",
    cancers: [PROSTATE, LOW_RISK, INTERMEDIATE_RISK, HIGH_RISK],
    terms: ["screening", "overdiagnosis", "overtreatment", "lead-time-bias", "psa", "hazard-ratio"],
    related: ["lead-time-bias", "overtreatment", "overdiagnosis", "paper-schroder-erspc-screening-mortality-nejm-2009", "paper-hugosson-eur-urol", "prostate-screening-psa-mri"],
    technologies: ["prostate-screening-psa-mri"],
    sections: ["early-detection", "prevention"],
    keyPapers: ["paper-schroder-erspc-screening-mortality-nejm-2009", "paper-hugosson-eur-urol", "paper-andriole-plco-prostate-screening-nejm-2009", "paper-uspstf-prostate-screening-jama-2018"],
    bottlenecks: ["b-early-detection", "b-overdiagnosis", "b-trial-design"],
    links: [SRC.erspc2009, SRC.erspc16, SRC.plco, SRC.uspstf2018],
    notes: [
      "Invited, screened or attended: three denominators, three numbers. ERSPC's 16-year report gives 570 as the number of men needed to be invited; its 2009 report gives 1,410 as the number needed to be screened. Reports adjusted for non-participation give a third, smaller figure, because they estimate the effect in men who actually attended rather than in everyone offered. A programme is offered to a population, so the invited denominator is the one that describes what a health service would buy.",
      "The number needed to diagnose is the overdiagnosis cost in the same units as the benefit. ERSPC's fall from 48 extra cases treated at 9 years to 18 extra diagnoses at 16 years is not a change in the disease; it is the benefit catching up with a harm that was banked at the start.",
    ] },

  { id: "other-cause-mortality", kind: "term", asOf, tags, name: "Other-cause mortality", category: "Endpoints",
    aka: ["death from other causes", "competing mortality", "non-cancer mortality", "competing risk of death", "other cause mortality"],
    tldr: "Dying of something that is not the cancer. In prostate cancer most men do, which makes it the outcome that decides how much any treatment can possibly help. It is also where the inequality that survives equal cancer care shows up, and almost no cancer service measures it.",
    summary: "Other-cause mortality is death from any cause other than the disease under study, counted as a competing risk: once a man has died of a heart attack he can no longer die of prostate cancer, so the two are not independent and cannot be estimated with an ordinary Kaplan-Meier curve. The correct handling is a cumulative incidence function with a Fine and Gray subdistribution hazard, which is what the prostate literature reports as a subdistribution hazard ratio. Prostate cancer has an unusually strong competing-risk structure: the disease is common, slow, and diagnosed at a median age at which other causes of death are already the majority, so other-cause mortality sets a ceiling on how much benefit any prostate cancer treatment can deliver.\n\nIt carries the equity finding, which is why it has an entry here. Dess and Spratt assembled individual patient data on men with clinical T1 to T4, N0 to N1, M0 prostate cancer from three cohorts with progressively tighter control of access to care: the Surveillance, Epidemiology, and End Results registry (296,273 men), five equal-access Veterans Affairs medical centres (3,972 men, all treated surgically) and four pooled National Cancer Institute randomised radiotherapy trials (5,854 men), with inverse probability weighting for demographic, cancer and treatment differences. Prostate cancer-specific mortality in Black men fell from an age-adjusted subdistribution hazard ratio of 1.30 in the registry to 1.09 after weighting, was not significantly different in the equal-access surgical cohort (0.85), and was significantly lower in the randomised trial cohort (0.81). Other-cause mortality stayed significantly higher in two of the three: 1.30 in the weighted registry cohort and 1.17 in the weighted trial cohort.\n\nWhat that means operationally. Once treatment and access are equalised, the excess prostate cancer death largely disappears and the excess death from everything else does not. A prostate cancer service that measures only cancer-specific mortality has therefore made itself blind to the larger surviving gap, in a population it sees regularly for years and treats with androgen deprivation, a therapy that worsens metabolic and bone health. The caveats belong with the finding: these are United States cohorts with a United States access gradient, the analysis is retrospective despite the weighting, and it addresses mortality after diagnosis at a given stage rather than the higher incidence and younger age at presentation in Black men.",
    cancers: [PROSTATE, LOW_RISK, INTERMEDIATE_RISK, HIGH_RISK, MHSPC, NMCRPC],
    terms: ["hazard-ratio", "adt", "quality-of-life", "overtreatment", "screening"],
    related: ["idea-prostate-other-cause-mortality-as-a-reported-service-outcome", "paper-dess-black-race-prostate-mortality-jama-oncol-2019", "hazard-ratio", "treatment-induced-bone-loss"],
    sections: ["supportive-care", "hormonal", "early-detection"],
    keyPapers: ["paper-dess-black-race-prostate-mortality-jama-oncol-2019", "paper-bill-axelson-spcg-4-29-year-nejm-2018", "paper-wilt-pivot-prostatectomy-observation-nejm-2017"],
    bottlenecks: ["b-survivorship", "b-aging-comorbidity", "b-global-access", "b-trial-diversity"],
    links: [SRC.dess, SRC.uspstf2018],
    notes: [
      "Why competing risks need their own arithmetic. Censoring a man who died of a heart attack as though he were simply lost to follow-up assumes he could still have died of prostate cancer later, which he could not. The cumulative incidence function and the subdistribution hazard ratio keep the competing deaths in the denominator, which is why prostate papers report subdistribution hazard ratios rather than plain hazard ratios for cancer-specific death.",
      "It is also the reason localised treatment trials disagree. SPCG-4, which recruited clinically detected disease, showed a substantial benefit from prostatectomy at 29 years; PIVOT, in a largely screen-detected population where competing mortality dominated, found no significant difference at 19.5 years. The treatment was similar; the competing risk was not.",
      "For an individual man, the practical version of this word is his own health apart from the cancer. It is the reason a guideline talks about life expectancy and comorbidity before it talks about grade group, and the reason watchful waiting exists as a plan distinct from active surveillance.",
    ] },

  // ---------------------------------------------------------------- the regulatory endpoints
  { id: "metastasis-free-survival", kind: "term", asOf, tags, name: "Metastasis-free survival (MFS)", category: "Endpoints",
    aka: ["MFS", "metastasis free survival", "time to first metastasis", "distant metastasis-free survival", "DMFS"],
    tldr: "The time from joining a trial until a scan first shows the cancer has spread, or the man dies, whichever comes first. It is the endpoint that got three hormone drugs licensed for prostate cancer that had not yet spread, because waiting for deaths would have taken another decade.",
    summary: "Metastasis-free survival is a composite time-to-event endpoint: the interval from randomisation to the first radiographic evidence of distant metastasis or death from any cause, whichever occurs first. Its rise in prostate cancer solved a specific problem. In non-metastatic castration-resistant disease and in high-risk localised disease, overall survival takes ten to fifteen years to read out, by which time the control arm has received several treatments that did not exist when the trial opened. PCWG3 recommended time to first metastasis and time to progression as outcome measures for trials in the non-metastatic castration-resistant state for exactly this reason.\n\nThe surrogacy evidence is the ICECaP meta-analysis. Xie, Regan and colleagues collected individual patient data from 28 randomised trials in localised prostate cancer covering 28,905 patients, with metastasis-free survival evaluable in 12,712 patients from 19 trials after a median 10 years of follow-up. At the patient level Kendall's tau correlation with overall survival was 0.91; at the trial level, the correlation of treatment effects measured as log hazard ratios was R squared 0.92 (95 percent confidence interval 0.81 to 0.95), against 0.73 for disease-free survival. That is a strong surrogate by the two-stage meta-analytic standard, and it is the reason regulators accepted the endpoint.\n\nThe definition differs between trials, which is the part that matters when two numbers are compared. It is set by each protocol, not by a single standards body, and the three things that vary are the imaging used, who reads it and what counts as an event. SPARTAN defined metastasis-free survival as the time from randomisation to the first detection of distant metastasis on imaging or death, in men with non-metastatic castration-resistant disease and a prostate-specific antigen doubling time of 10 months or less, with conventional imaging (technetium bone scan and computed tomography) read by blinded independent central review; median metastasis-free survival was 40.5 months with apalutamide against 16.2 months with placebo (hazard ratio 0.28; 95 percent confidence interval 0.23 to 0.35). Conventional imaging is doing the work in all of these trials. PSMA PET finds metastatic disease that a bone scan cannot see, so a man classified as non-metastatic in 2018 would often be classified as metastatic in 2026, and the ninth edition of TNM now asks that such a finding be recorded as M1(PET). Metastasis-free survival figures measured on bone scan and on PSMA PET are not the same quantity and should not be pooled.",
    cancers: [PROSTATE, HIGH_RISK, BCR, NMCRPC, MHSPC],
    terms: ["radiographic-progression-free-survival", "psa-doubling-time", "hazard-ratio", "castration-resistance", "biochemical-recurrence", "tnm-prostate-cancer"],
    related: ["radiographic-progression-free-survival", "psa-doubling-time", "prosper", "aramis", "embark", "hazard-ratio"],
    technologies: ["psma-pet", "pet"],
    sections: ["hormonal", "imaging"],
    keyPapers: ["paper-uspstf-prostate-screening-jama-2018"],
    bottlenecks: ["b-trial-design", "b-regulatory-fragmentation", "b-early-detection"],
    links: [SRC.icecap, SRC.spartan, SRC.pcwg3],
    notes: [
      "Who defines it: the protocol, not a standards body. PCWG3 recommends time to first metastasis as an outcome measure in the non-metastatic castration-resistant state but does not impose a single operational definition, so each trial specifies its own imaging schedule, its own reader (investigator or blinded independent central review) and its own handling of death without metastasis. Reading two metastasis-free survival numbers side by side means reading two protocols.",
      "Metastasis-free survival counts death from any cause as an event, which is what makes it a survival endpoint rather than a progression endpoint. In an elderly population with substantial other-cause mortality, a meaningful share of the events are deaths without metastasis, and a drug that delays metastasis without affecting mortality will show a smaller effect than the imaging alone would suggest.",
      "Do not confuse it with radiographic progression-free survival. Metastasis-free survival is used where there is no measurable metastatic disease yet and asks when the first deposit appears. Radiographic progression-free survival is used where metastatic disease already exists and asks when it grows or spreads further.",
    ] },

  { id: "radiographic-progression-free-survival", kind: "term", asOf, tags, name: "Radiographic progression-free survival (rPFS)", category: "Endpoints",
    aka: ["rPFS", "radiographic progression free survival", "radiologic progression-free survival", "imaging-based progression-free survival", "rPFS by PCWG"],
    tldr: "In cancer that has already spread, this is the time until the scans show it getting worse, or the man dies. It deliberately ignores a rising PSA on its own, because in prostate cancer the PSA can rise for reasons that do not mean the treatment has stopped working.",
    summary: "Radiographic progression-free survival is the time from randomisation to the first documented progression on imaging, or death from any cause, whichever comes first, with prostate-specific antigen rise alone explicitly excluded as an event. It is the workhorse endpoint of metastatic castration-resistant prostate cancer trials, and the reason it exists is the Prostate Cancer Clinical Trials Working Group's judgement that biochemical progression is an unreliable proxy in a disease where androgen receptor-directed drugs can move the PSA independently of tumour burden.\n\nThe imaging rules come from PCWG2 and are carried forward by PCWG3. Soft-tissue disease is assessed by RECIST. Bone disease is assessed on bone scan, where progression requires a minimum of two new lesions; PCWG2 advises against a follow-up bone scan before 12 weeks of treatment unless clinically indicated, because of the flare phenomenon, in which a responding bone metastasis looks worse before it looks better; and confirmation requires a further scan performed six or more weeks later showing additional new lesions. That is the rule usually shorthanded as two plus two. PCWG3 added time to symptomatic skeletal events and the concept of no longer clinically benefiting, to separate the first evidence of progression from the clinical need to change treatment, and asked that progression in existing lesions be documented separately from the appearance of new ones.\n\nAs with metastasis-free survival, the operational definition is set by each protocol, and three things vary: the imaging schedule, whether the reads are by investigator or by blinded independent central review, and whether bone-scan progression alone is enough. That is why reported medians are not interchangeable. COU-AA-302 reported radiographic progression-free survival of 16.5 months with abiraterone and prednisone against 8.3 months with prednisone alone in 1,088 chemotherapy-naive men (hazard ratio 0.53; 95 percent confidence interval 0.45 to 0.62). TRITON3 reported imaging-based progression-free survival of 11.2 against 6.4 months in its BRCA subgroup. Both are radiographic progression endpoints; neither was measured the same way.",
    cancers: [PROSTATE, MCRPC, MHSPC, NEPC],
    terms: ["metastasis-free-survival", "psa50", "psa", "hazard-ratio", "castration-resistance", "bone-metastases"],
    related: ["metastasis-free-survival", "psa50", "vision", "profound", "hazard-ratio", "bone-metastases"],
    technologies: ["psma-pet", "pet"],
    sections: ["hormonal", "imaging", "targeted-therapy"],
    keyPapers: ["paper-abiraterone-acetate-prostate-n-engl-j-med-2013", "paper-fizazi-triton3-rucaparib-nejm-2023", "paper-antonarakis-ar-v7-resistance-nejm-2014"],
    bottlenecks: ["b-trial-design", "b-regulatory-fragmentation", "b-resistance"],
    links: [SRC.pcwg2, SRC.pcwg3],
    notes: [
      "The flare rule, and why an early scan can mislead. A bone metastasis that is responding to treatment can increase osteoblastic activity and light up more brightly on a bone scan before it improves. PCWG2's answer is not to scan before 12 weeks unless there is a clinical reason, and to require a confirmatory scan six or more weeks after the first one showing additional new lesions before calling progression. A single alarming scan at week six is, under these rules, not an event.",
      "Why the PSA is left out. A rising prostate-specific antigen is the most visible thing that happens to a man on treatment and the most misleading. PCWG2 recommends that early changes in PSA or pain not be acted on without other evidence of progression, and that treatment continue for at least 12 weeks to ensure adequate drug exposure. Radiographic progression-free survival encodes that judgement in the endpoint itself.",
    ] },

  // ---------------------------------------------------------------- genomics
  { id: "chromoplexy", kind: "term", asOf, tags, name: "Chromoplexy", category: "Genomics & genetics", wikipedia: W("Chromoplexy"),
    aka: ["chromoplectic rearrangement", "chained rearrangements", "punctuated evolution prostate genome", "closed chains of rearrangement"],
    tldr: "Instead of collecting damage one mutation at a time, a prostate cancer genome can be scrambled in a single burst: several chromosomes break at once and are stitched back together in a chain, knocking out several cancer genes in one event. It was discovered in prostate cancer and named there.",
    summary: "Chromoplexy is a pattern of interdependent DNA translocations and deletions that arise together rather than sequentially, forming chains that can involve several chromosomes and disrupt multiple cancer genes coordinately. Baca, Garraway and Rubin described and named it after whole-genome sequencing of 57 prostate tumours with matched normal tissue and modelling how the rearrangements they found could have arisen: translocations and deletions were abundant and highly interdependent, chromoplexy frequently accounted for the dysregulation of prostate cancer genes, and the modelling suggested it can derange a large amount of genome in relatively few events. Ordering the clonal hierarchy of those lesions charted a path of oncogenic events along which chromoplexy appeared to drive carcinogenesis.\n\nWhat it changed is the model of the disease. The classical picture of cancer as the gradual accumulation of point mutations does not describe prostate cancer, and chromoplexy is the main reason why. It is a model of punctuated evolution: long quiet periods interrupted by catastrophic rearrangement. It sits beside the other observation that makes prostate cancer unusual among common carcinomas, Grasso's finding of a mutation rate of only 2.00 per megabase even in lethal, heavily pre-treated castration-resistant disease, and Chung's real-world median tumour mutational burden of 2.6 mutations per megabase across 3,476 tumours. A structurally rearranged but point-mutationally quiet genome is why tumour mutational burden rarely qualifies prostate cancer for checkpoint immunotherapy, and why the archetypal prostate cancer lesion is a fusion, TMPRSS2-ERG, rather than a kinase mutation.\n\nIt is a model rather than a therapy. Chromoplexy is inferred from the pattern of rearrangements by modelling rather than observed as it happens, it was characterised in 57 mostly primary tumours so its frequency across the disease is not established, and no treatment follows from it. Its practical consequence is assay choice: whole-genome sequencing sees chained rearrangements and exome sequencing does not.",
    cancers: [PROSTATE, HIGH_RISK, MCRPC],
    terms: ["ngs", "tmb", "wes-wgs"],
    targets: ["erg", "tmprss2"],
    related: ["paper-baca-punctuated-evolution-chromoplexy-cell-2013", "paper-grasso-mutational-landscape-lethal-crpc-nature-2012", "paper-gundem-evolutionary-history-lethal-metastatic-prostate-nature-2015", "genome-wide-loss-of-heterozygosity"],
    technologies: ["wes-wgs", "ngs"],
    sections: ["diagnostics", "drug-discovery"],
    keyPapers: ["paper-baca-punctuated-evolution-chromoplexy-cell-2013", "paper-grasso-mutational-landscape-lethal-crpc-nature-2012"],
    bottlenecks: ["b-tumor-heterogeneity", "b-undruggable-targets"],
    links: [SRC.baca, SRC.grasso, SRC.chung],
    notes: [
      "Chromoplexy is not chromothripsis. Chromothripsis is the shattering and haphazard reassembly of one chromosome or chromosome arm, producing many fragments and oscillating copy number. Chromoplexy is a chain of balanced or near-balanced rearrangements linking several chromosomes, with little copy number change, and was described in prostate cancer. Both are single-catastrophe models; they look different in the data and arise by different mechanisms.",
      "The reason this word appears on a prostate page at all: it explains the shape of the disease's genome, which in turn explains two clinical facts a patient may meet. Immunotherapy generally does not work here, because there are too few mutations to make neoantigens. And the targeted drugs that do work are aimed at the hormone axis and at DNA repair, not at the kinases that dominate targeted therapy in other cancers.",
    ] },

  { id: "genome-wide-loss-of-heterozygosity", kind: "term", asOf, tags, name: "Genome-wide loss of heterozygosity (gLOH)", category: "Genomics & genetics", wikipedia: W("Loss_of_heterozygosity"),
    aka: ["gLOH", "genomic LOH", "LOH score", "genome-wide LOH", "LOH-high", "genomic scar score"],
    tldr: "A score for how much of a tumour's genome has lost one of its two parental copies. A high score is a scar left behind by a broken DNA repair system, and is used as a rough sign that a PARP inhibitor might work. It is a measure of damage already done, not of the fault that caused it.",
    summary: "Every cell carries two copies of most of its genome, one from each parent. Loss of heterozygosity is the loss of one of those copies at a locus; genome-wide loss of heterozygosity is the percentage of the interrogated genome showing it, computed from a targeted next-generation sequencing panel. It is one of the genomic scar measures of homologous recombination deficiency: a cell that cannot repair double-strand breaks accurately falls back on error-prone mechanisms, and the accumulated result is large stretches of single-copy genome. Because it measures the consequence rather than the cause, it can be raised by faults the panel does not sequence, and can be normal in a tumour that has only recently lost repair capacity.\n\nThe threshold is set by the assay, not by biology, and it is a continuous score cut into two boxes. ARIEL2 part 1 prespecified 14 percent or more as loss-of-heterozygosity high in ovarian carcinoma; that cut point was derived and validated for one assay in one disease and does not transfer unchanged. Pan-cancer work from the same platform showed that biallelic BRCA1 and BRCA2 alterations are associated with elevated genome-wide loss of heterozygosity across many tumour types while monoallelic alterations are not (Sokol 2020), and that the association extends beyond BRCA to a core set of homologous recombination repair genes including BARD1, PALB2, FANCC, RAD51C and RAD51D, particularly in breast, ovarian, pancreatic and prostate cancer, with an independent contribution from TP53 loss (Westphalen 2022).\n\nIn prostate cancer it is the number that shows the homologous recombination repair gene list is not one biomarker. Across 3,476 clinically advanced prostate tumours profiled in routine practice, BRCA1, BRCA2, ATR and FANCA alterations were associated with high genome-wide loss of heterozygosity, whereas CDK12-altered tumours, about 6 percent of the disease, were infrequently loss-of-heterozygosity high (Chung 2019). CDK12 is on the gene list that qualifies men for PARP inhibitors in several licences, and by this measure those tumours are not homologous recombination deficient in the sense a PARP inhibitor needs. That, together with TRITON3's hazard ratio of 0.95 in the ATM subgroup against 11.2 versus 6.4 months in the BRCA subgroup, is why the gene list is increasingly read gene by gene rather than as a single qualifying category.",
    cancers: [PROSTATE, MCRPC, MHSPC],
    terms: ["hrd", "synthetic-lethality", "ngs", "msi", "tmb"],
    pathways: ["homologous-recombination-repair"],
    targets: ["brca", "atm", "cdk12", "tp53"],
    drugs: ["olaparib", "rucaparib", "niraparib", "talazoparib"],
    related: ["hrd", "homologous-recombination-repair", "chromoplexy", "paper-chung-comprehensive-genomic-profiling-prostate-jco-po-2019", "paper-fizazi-triton3-rucaparib-nejm-2023"],
    technologies: ["ngs", "parp-inhibitor", "liquid-biopsy"],
    sections: ["diagnostics", "targeted-therapy"],
    keyPapers: ["paper-chung-comprehensive-genomic-profiling-prostate-jco-po-2019", "paper-abida-triton2-rucaparib-brca-jco-2020", "paper-fizazi-triton3-rucaparib-nejm-2023"],
    bottlenecks: ["b-biomarker-validation", "b-resistance", "b-regulatory-fragmentation"],
    links: [SRC.chung, SRC.sokol, SRC.westphalen, SRC.ariel2, SRC.abida],
    notes: [
      "Scar, not cause. A genomic scar score says the repair pathway was broken for long enough to leave a mark. It does not say which gene broke, and it does not say the pathway is still broken now: a tumour that has restored BRCA function by a reversion mutation, the commonest route to PARP inhibitor resistance, keeps its high score and loses its sensitivity.",
      "Whose threshold. There is no single agreed cut point for gLOH-high across assays or across cancers. ARIEL2 part 1's prespecified 14 percent was set for one next-generation sequencing assay in ovarian carcinoma. Any gLOH result should be read with the name of the assay attached, and a result near the threshold should be treated as what it is, a continuous number cut arbitrarily in two.",
      "In prostate practice, tumour sequencing and germline testing answer different questions and both are needed: TRITON2 found similar objective response rates for germline and somatic BRCA alterations, which is why a normal blood test for an inherited fault does not rule out a targetable tumour.",
    ] },

  { id: "polygenic-risk-score", kind: "term", asOf, tags, name: "Polygenic risk score (PRS)", category: "Genomics & genetics", wikipedia: W("Polygenic_score"),
    aka: ["PRS", "polygenic score", "genetic risk score", "GRS", "SNP risk score", "polygenic risk score prostate"],
    tldr: "A single number adding up hundreds of common, individually tiny genetic differences to say whether a man's inherited risk of prostate cancer is above or below average. It is not a test for a faulty gene like BRCA2, and it says nothing about how aggressive a cancer would be.",
    summary: "A polygenic risk score is the weighted sum of the risk alleles a person carries across a set of common single nucleotide polymorphisms identified by genome-wide association studies, each of which shifts risk by a fraction of a percent. It is a population ranking device: it places a man in a percentile of inherited susceptibility. It is categorically different from a germline test for a rare high-penetrance variant such as BRCA2 or a mismatch repair gene, which names a single fault with a large effect and consequences for relatives.\n\nProstate cancer has the best-developed score of any common cancer, and the biggest ancestry problem. Conti, Haiman and Eeles ran a multi-ancestry meta-analysis of 107,247 cases and 127,006 controls, identified 86 new risk variants for a total of 269, and built a score from them. The top decile carried odds ratios from 5.06 (95 percent confidence interval 4.84 to 5.29) in men of European ancestry to 3.74 (3.36 to 4.17) in men of African ancestry, and the mean score was 2.18 times higher in men of African ancestry (2.14 to 2.22) and 0.73 times that of European ancestry in men of East Asian ancestry (0.71 to 0.76). The discovery data were largely European, which is why the score discriminates least well in the group with the highest mean risk.\n\nThe United Kingdom has tested it prospectively. BARCODE1 recruited men aged 55 to 69 through primary care, derived a score from 130 variants using saliva DNA, and invited those at or above the 90th percentile for multiparametric magnetic resonance imaging and transperineal biopsy irrespective of prostate-specific antigen. Of 40,292 invited, 6,393 had a score calculated, 745 (11.7 percent) were in the top decile and 468 were screened; prostate cancer was found in 187 (40.0 percent), of whom 103 had disease of intermediate risk or higher by 2024 NCCN criteria, and 74 of those 103 would not have been detected by the current United Kingdom pathway of raised prostate-specific antigen followed by magnetic resonance imaging. The trial had no comparator arm, which is the basis of the main criticism: standardised to 10,000 men tested, Sud and Vickers calculated that BARCODE1 biopsied more men (704 against 386 and 338), found more low-grade cancers (126 against 103 and 41) and found fewer high-grade cancers (155 against 178 and 165) than the contemporaneous Goteborg-2 and ProScreen trials, which risk-stratify with magnetic resonance imaging and blood markers. The open question is therefore not whether a score can find cancer but whether it finds the cancer that matters, and the current evidence is that it does not preferentially find aggressive disease.",
    cancers: [PROSTATE, LOW_RISK, INTERMEDIATE_RISK, HIGH_RISK],
    terms: ["screening", "overdiagnosis", "number-needed-to-screen", "psa", "lead-time-bias"],
    related: ["polygenic-risk-scores", "paper-conti-trans-ancestry-gwas-prostate-nat-genet-2021", "idea-prev-prs-screening-start-age", "idea-prev-mri-first-prostate-screening-prs", "germline-testing"],
    technologies: ["polygenic-risk-scores", "germline-testing", "prostate-screening-psa-mri", "mri"],
    sections: ["prevention", "early-detection", "diagnostics"],
    keyPapers: ["paper-conti-trans-ancestry-gwas-prostate-nat-genet-2021", "paper-goteborg-2-n-engl-j-med-2022"],
    bottlenecks: ["b-hereditary-risk", "b-early-detection", "b-trial-diversity", "b-overdiagnosis"],
    links: [SRC.conti, SRC.barcode1, SRC.barcode1pilot, SRC.sud2026, SRC.proscreen],
    notes: [
      "It ranks risk of getting the disease, not risk of dying of it. Nothing in a polygenic risk score distinguishes a grade group 1 cancer that will sit quietly for twenty years from a grade group 5 cancer, which is why a screening programme selected by score alone will find a great deal of low-grade disease. That is the substance of the criticism of BARCODE1 and the reason its result is not a recommendation.",
      "It is not a germline test in the clinical sense. A polygenic risk score carries no implication for relatives that would trigger cascade testing, no eligibility for a PARP inhibitor and no change of surveillance in the way a pathogenic BRCA2 variant does. A man may have both tests and they answer different questions.",
      "Ancestry is not a technical footnote here. A score built mostly in European-ancestry cohorts performs worse in men of African ancestry, who carry the highest mean score and the highest incidence, so a programme that adopts the score without fixing the discovery imbalance under-serves the group with most to gain.",
    ] },

  // ---------------------------------------------------------------- pathology
  { id: "neuroendocrine-differentiation", kind: "term", asOf, tags, name: "Neuroendocrine differentiation in prostate cancer", category: "Pathology",
    aka: ["NED", "neuroendocrine differentiation", "treatment-emergent neuroendocrine differentiation", "Paneth cell-like change", "chromogranin positive prostate cancer", "synaptophysin positive prostate cancer"],
    tldr: "Prostate cancer cells that have taken on the look and the markers of nerve-and-hormone cells. A trace of it is present in almost every prostate cancer and means nothing; a tumour made mostly of it is a different and much more serious disease, and it usually appears after years of hormone treatment.",
    summary: "Neuroendocrine differentiation describes prostate cancer cells expressing neuroendocrine markers, principally chromogranin A, synaptophysin and CD56, with or without the morphology to match. It is a spectrum rather than a category, which is why the word appears in so many contexts with so many meanings. The Prostate Cancer Foundation working committee set out the range in a classification with six named entries: usual prostate adenocarcinoma with neuroendocrine differentiation; adenocarcinoma with Paneth cell neuroendocrine differentiation; carcinoid tumour; small cell carcinoma; large cell neuroendocrine carcinoma; and mixed neuroendocrine carcinoma with acinar adenocarcinoma, alongside two clinical descriptions, prostate carcinoma with overlapping features of small cell carcinoma and acinar adenocarcinoma, and castration-resistant prostate cancer with a small cell cancer-like clinical presentation.\n\nThe practical rule in a United Kingdom report is that scattered marker positivity in an ordinary adenocarcinoma is not looked for and does not change anything. The Royal College of Pathologists dataset does not ask for routine synaptophysin and chromogranin staining of ordinary prostate adenocarcinoma, because almost all of them show some neuroendocrine differentiation and the evidence that finding it changes treatment or prognosis is insufficient; the stains are for tumours that already look neuroendocrine down the microscope. Neuroendocrine carcinomas are not Gleason graded.\n\nThe form that matters is treatment-related. The WHO fifth edition gives treatment-related neuroendocrine prostatic carcinoma its own section in the prostate chapter rather than folding it into the classification's neuroendocrine chapter, and defines it as tumours demonstrating complete neuroendocrine differentiation, or partial neuroendocrine differentiation with adenocarcinoma, following androgen deprivation therapy, covering both the primary and its metastases. It is found in 10.5 to 17 percent of people with metastatic castration-resistant prostate cancer treated with androgen receptor signalling inhibitors, and the evidence is that it arises by transformation of an existing adenocarcinoma rather than from resident neuroendocrine cells, which is what lineage plasticity means in this disease. PSA and NKX3.1 are usually lost, which is why the blood test can stay reassuringly low while the disease advances, and why an unexplained clinical deterioration with a flat prostate-specific antigen is the situation in which a biopsy is worth taking.",
    cancers: [PROSTATE, NEPC, MCRPC],
    terms: ["histologic-transformation", "castration-resistance", "ihc", "psa", "prostate-acinar-adenocarcinoma", "gleason-grade-group"],
    pathways: ["lineage-plasticity-neuroendocrine"],
    targets: ["tp53", "rb1", "androgen-receptor"],
    related: ["histologic-transformation", "prostate-nepc", "paper-mu-sox2-lineage-plasticity-science-2017", "paper-aggarwal-t-sccpc-jco-2018", "idea-prostate-plasticity-surveillance-before-it-is-neuroendocrine"],
    technologies: ["ihc", "liquid-biopsy"],
    sections: ["diagnostics", "hormonal", "targeted-therapy"],
    keyPapers: ["paper-mu-sox2-lineage-plasticity-science-2017", "paper-aggarwal-t-sccpc-jco-2018", "paper-beltran-nepc-divergent-evolution-nat-med-2016"],
    bottlenecks: ["b-resistance", "b-rare-cancers", "b-tumor-heterogeneity"],
    links: [SRC.epstein2014, SRC.kench2022, SRC.who2022, SRC.rcpath],
    notes: [
      "A trace is not a diagnosis. Almost all prostate adenocarcinomas contain some cells with neuroendocrine features, and that is why the United Kingdom dataset does not ask for the stains routinely. A report mentioning focal chromogranin positivity in an otherwise ordinary adenocarcinoma is describing a common finding, not a change of disease.",
      "Three words that are often run together and are not the same. Neuroendocrine differentiation is a marker and morphology finding on a spectrum. Lineage plasticity is the mechanism by which an androgen receptor-dependent luminal cell becomes androgen receptor-independent. Treatment-related neuroendocrine prostatic carcinoma is the WHO entity at the far end of the spectrum, with its own page here.",
      "Why the PSA misleads here. These tumours usually lose PSA and NKX3.1 expression, so a man whose disease is transforming can have a stable or falling prostate-specific antigen while his scans and his symptoms worsen. Discordance between the blood test and the clinical picture is the trigger to look, not reassurance.",
    ] },

  { id: "whole-mount-pathology", kind: "term", asOf, tags, name: "Whole-mount pathology", category: "Pathology",
    aka: ["whole mount", "whole-mount sectioning", "whole mount histopathology", "large format histology", "macrosectioning", "whole-mount prostatectomy specimen"],
    tldr: "Slicing the whole removed prostate into complete cross-sections on oversized slides, so each slide shows the entire gland in one piece rather than in fragments. It is the reference standard used to check how well a scan found what was really there.",
    summary: "Whole-mount pathology, also called large format histology or whole-mount sectioning, is the examination of tissue sections cut from specimens processed in large tissue cassettes, so that a complete cross-section of the organ sits on a single slide. In prostate cancer it is applied to the radical prostatectomy specimen. A collaborative review of the literature found that whole-mount sections are not superior to standard sections at detecting adverse pathological features, and that their advantage is spatial: they display the architecture of the gland and identify and locate tumour nodules, and the index tumour in particular, more clearly, which makes the pathology far easier to compare with the digital rectal examination, the transrectal ultrasound, the multiparametric magnetic resonance imaging, the operation and the biopsies.\n\nThat is why it is the reference standard for imaging accuracy. Johnson and Raman co-registered multiparametric magnetic resonance imaging with whole-mount pathology in 588 consecutive men who had a 3 Tesla scan before radical prostatectomy, giving 1,213 pathologically confirmed tumour foci, and measured per-lesion rather than per-patient sensitivity. The scan detected 45 percent of all foci (95 percent confidence interval 42 to 47) and 65 percent of clinically significant lesions (61 to 69), and missed at least one clinically significant focus in 34 percent of men overall and 45 percent of men with multifocal disease. Set against PROMIS's 93 percent per-patient sensitivity for clinically significant cancer, the gap of roughly 30 percentage points is the difference between asking whether a man has a serious cancer and asking where all of it is, and it is precisely the territory in which focal therapy and imaging-only surveillance operate.\n\nThe method has limits of its own. Co-registration of a scan with a whole-mount section is imperfect, which biases measured detection downwards by an unknown amount; the specimen shrinks and deforms in processing; a prostatectomy cohort is enriched for intermediate and high-risk disease and cannot report specificity; and standardised annotation protocols show excellent agreement between pathologists for cancer localisation and grading but persistent variability for cribriform growth and intraductal carcinoma.",
    cancers: [PROSTATE, LOW_RISK, INTERMEDIATE_RISK, HIGH_RISK],
    terms: ["prostatectomy", "gleason-grade-group", "template-mapping-biopsy", "pi-rads", "cribriform-prostate-cancer", "intraductal-carcinoma-prostate", "resection-margins"],
    related: ["paper-johnson-mpmri-individual-foci-eur-urol-2019", "idea-prostate-per-lesion-mri-audit-before-focal-treatment", "template-mapping-biopsy", "prostatectomy"],
    technologies: ["mri"],
    sections: ["diagnostics", "imaging", "surgery"],
    keyPapers: ["paper-johnson-mpmri-individual-foci-eur-urol-2019", "paper-ahmed-promis-multiparametric-mri-lancet-2017"],
    bottlenecks: ["b-biomarker-validation", "b-surgery-radiation-innovation", "b-ai-validation"],
    links: [SRC.cimadamore, SRC.johnson, SRC.promis, SRC.rcpath],
    notes: [
      "Whole-mount is not routine everywhere and does not need to be. It costs more in cassettes, embedding and reporting time and, on the evidence, does not find more adverse features than standard sampling. Where it earns its place is any work that needs the tumour's position rather than only its presence: imaging validation, focal therapy planning, surgical technique audit and the ground-truth datasets that artificial intelligence imaging models are trained on.",
      "It is also the ground truth behind the machine learning. Prostate imaging models are trained and validated against annotated prostatectomy pathology, so the reliability of the annotation protocol is the ceiling on the model. Standardised protocols reach excellent agreement for localising cancer and substantial agreement on Gleason pattern, and remain a source of disagreement for cribriform and intraductal disease.",
    ] },

  // ---------------------------------------------------------------- imaging and biopsy
  { id: "pi-rads", kind: "term", asOf, tags, name: "PI-RADS (Prostate Imaging Reporting and Data System)", category: "Diagnostics & imaging", wikipedia: W("PI-RADS"),
    aka: ["PI-RADS", "PIRADS", "PI-RADS v2.1", "PI-RADS score", "PI-RADS 3", "PI-RADS 4", "PI-RADS 5", "Prostate Imaging Reporting and Data System"],
    tldr: "The international scoring system radiologists use to say how likely a prostate MRI finding is to be a serious cancer, from 1 (very unlikely) to 5 (very likely). British NHS reports usually do not use it: NICE asks for a 5-point Likert score instead, and the two look identical on the page and are not the same thing.",
    summary: "PI-RADS is a structured reporting system for multiparametric prostate magnetic resonance imaging, developed jointly by the American College of Radiology, the European Society of Urogenital Radiology and the Admetech Foundation. It assigns each suspicious finding an assessment category from 1 to 5 expressing the probability that it is clinically significant cancer, from very low at 1 to very high at 5, and it derives that overall category from scores given separately to the individual sequences: diffusion-weighted imaging with its apparent diffusion coefficient map is the determining sequence in the peripheral zone, T2-weighted imaging is dominant in the transition zone, and dynamic contrast enhancement acts as a tie-break that can move a peripheral-zone 3 to a 4. Clinically significant cancer, in the system's own definition, is Gleason score 7 or above including 3+4 with a prominent but not predominant pattern 4 component, or tumour volume above 0.5 cubic centimetres, or extraprostatic extension. The current version is 2.1, published in 2019 as a consensus revision of version 2 intended to reduce inter-reader variability, with changed guidance on the T2-weighted acquisition plane, diffusion b-values, dynamic contrast temporal resolution, the anterior fibromuscular stroma and the central zone, and the scoring of transition zone category 2.\n\nA reader in Britain will meet a different word for the same job. NICE NG131 recommendation 1.2.2 offers multiparametric magnetic resonance imaging as the first-line investigation for suspected clinically localised prostate cancer and asks that the result be reported on a 5-point Likert scale. Recommendation 1.2.3 offers magnetic resonance imaging-influenced biopsy at a Likert score of 3 or more, and 1.2.4 allows omitting biopsy at Likert 1 or 2 after discussing the risks and benefits and reaching a shared decision, with systematic biopsy offered to anyone who still wants one. The Likert scale is the radiologist's overall subjective judgement of the probability of clinically significant cancer using all available information, including the prostate-specific antigen and the clinical picture; PI-RADS is a prescriptive algorithm that combines per-sequence scores by fixed rules and is intended to be read from the images alone. They share a 1 to 5 range and the same clinical thresholds in practice, and they are not interchangeable scores.\n\nThe number a man is given is therefore a probability statement and not a diagnosis. NG131 sets out what the threshold means in the two directions: between 11 and 28 out of 100 people with a low-risk magnetic resonance imaging result turn out to have clinically significant cancer, and between 18 and 23 out of 100 with a low-risk result who are biopsied receive a diagnosis of clinically insignificant cancer. And the score is a per-patient triage judgement, not a map: the same scan that is 93 percent sensitive for whether a man has clinically significant cancer detects only 65 percent of individual clinically significant lesions against whole-mount pathology.",
    cancers: [PROSTATE, LOW_RISK, INTERMEDIATE_RISK, HIGH_RISK],
    terms: ["psa-density", "gleason-grade-group", "whole-mount-pathology", "template-mapping-biopsy", "screening", "psa"],
    related: ["paper-ahmed-promis-multiparametric-mri-lancet-2017", "paper-precision-mri-targeted-biopsy-nejm-2018", "whole-mount-pathology", "template-mapping-biopsy", "prostate-screening-psa-mri"],
    technologies: ["mri", "prostate-screening-psa-mri", "active-surveillance"],
    sections: ["imaging", "diagnostics", "early-detection"],
    keyPapers: ["paper-ahmed-promis-multiparametric-mri-lancet-2017", "paper-precision-mri-targeted-biopsy-nejm-2018", "paper-johnson-mpmri-individual-foci-eur-urol-2019"],
    bottlenecks: ["b-early-detection", "b-biomarker-validation", "b-overdiagnosis"],
    links: [SRC.pirads21, SRC.acrPirads, SRC.ng131, SRC.promis, SRC.johnson],
    notes: [
      "If your NHS report says Likert and not PI-RADS, nothing is missing. NICE NG131 1.2.2 asks for a 5-point Likert scale, which is the radiologist's overall probability judgement using the scan together with the clinical information, and NG131 writes its biopsy thresholds in Likert numbers: 3 or more means a magnetic resonance imaging-influenced biopsy is offered, 1 or 2 means omitting biopsy can be considered after a shared discussion. Many United Kingdom centres report both, and most international literature, private reports and American guidance are in PI-RADS.",
      "Why 3 is the difficult number in both systems. Category 3 means intermediate, which is to say the scan cannot tell. It is the score at which the decision moves off the image and onto other information: prostate-specific antigen density, family history, previous biopsies and the man's own preferences. NICE does not set a density threshold; it treats density as one of the things weighed in that conversation.",
      "The score describes a lesion's probability of being clinically significant cancer, not its size, its grade or its danger to the man. Grade comes from the biopsy, stage comes from the scan read against TNM, and the risk band comes from combining grade, prostate-specific antigen and stage.",
    ] },

  { id: "template-mapping-biopsy", kind: "term", asOf, tags, name: "Template mapping biopsy (transperineal template prostate mapping)", category: "Procedures", wikipedia: W("Prostate_biopsy"),
    aka: ["transperineal template mapping biopsy", "template prostate mapping", "TPM biopsy", "mapping template biopsy", "transperineal template biopsy", "5 mm template mapping biopsy"],
    tldr: "A thorough biopsy done under general anaesthetic through the skin behind the scrotum, using a grid to sample the whole prostate systematically. It gives the most complete picture available short of removing the gland, and for that reason it is used as the yardstick in research rather than as a routine test.",
    summary: "A template biopsy takes transperineal core biopsies through a brachytherapy grid, usually two to three cores from each of eight sites, under general anaesthetic. A mapping template biopsy is the exhaustive version: NICE's own glossary defines it as systematic sampling of 20 sites with two or three cores per site, sometimes meaning more than 50 cores from one gland. Sampling the gland on a fixed grid, typically at 5 millimetre intervals, is what makes it a near-complete map rather than a sample, and going through the perineal skin rather than the rectal wall greatly reduces the risk of sepsis that transrectal biopsy carries.\n\nIts role is as a reference standard. PROMIS used it for precisely that: 576 men with prostate-specific antigen up to 15 nanograms per millilitre and no previous biopsy had 1.5 Tesla multiparametric magnetic resonance imaging, then both transrectal ultrasound-guided biopsy and template prostate mapping biopsy, each read blind to the others. Comparing a scan against the standard biopsy it is meant to replace answers nothing, because that biopsy is itself inaccurate; comparing both against an exhaustive mapping biopsy is what produced the numbers that changed the pathway, with the scan 93 percent sensitive and the standard biopsy 48 percent sensitive for clinically significant cancer. Of 576 men completing all three tests, 408 (71 percent) had cancer on mapping biopsy and 230 (40 percent) had clinically significant cancer.\n\nIt is not a routine test, and in the United Kingdom it is explicitly not one. NICE NG131 recommendation 1.2.5 says do not offer mapping transperineal template biopsy as part of an initial assessment unless as part of a clinical trial. The reasons are the general anaesthetic, the theatre time, the acute urinary retention that follows a heavily sampled gland, and the overdiagnosis that comes with sampling everything: a test that finds every cancer in a gland finds a great many cancers that were never going to matter. It remains in use in research, in imaging validation, and in selected clinical situations such as planning focal therapy or resolving a persistently raised prostate-specific antigen after repeated negative biopsies. PROMIS itself reported serious adverse events in 44 of 740 enrolled men (5.9 percent), including 8 cases of sepsis, a reminder that the reference standard has harms of its own.",
    cancers: [PROSTATE, LOW_RISK, INTERMEDIATE_RISK, HIGH_RISK],
    terms: ["pi-rads", "whole-mount-pathology", "gleason-grade-group", "overdiagnosis", "acute-urinary-retention", "psa"],
    related: ["paper-ahmed-promis-multiparametric-mri-lancet-2017", "paper-precision-mri-targeted-biopsy-nejm-2018", "pi-rads", "whole-mount-pathology", "idea-prostate-per-lesion-mri-audit-before-focal-treatment"],
    technologies: ["mri", "prostate-screening-psa-mri"],
    sections: ["diagnostics", "surgery", "imaging"],
    keyPapers: ["paper-ahmed-promis-multiparametric-mri-lancet-2017", "paper-johnson-mpmri-individual-foci-eur-urol-2019"],
    bottlenecks: ["b-early-detection", "b-overdiagnosis", "b-biomarker-validation"],
    links: [SRC.ng131terms, SRC.ng131, SRC.promis],
    notes: [
      "Template, mapping template and targeted biopsy are three different operations. A template biopsy samples eight sites on a grid. A mapping template biopsy samples 20 sites and may take over 50 cores (NICE NG131's own definitions). A magnetic resonance imaging-targeted biopsy samples only what the scan flagged, which is what NG131 1.2.3 offers at a Likert score of 3 or more and what the modern pathway is built on.",
      "Transperineal is a route, not a thoroughness. Most United Kingdom centres have moved their routine biopsies from transrectal to transperineal to reduce sepsis, often under local anaesthetic, and that is a different procedure from a mapping template biopsy under general anaesthetic. A man told he is having a transperineal biopsy is not necessarily having 50 cores.",
      "Why the most accurate test is the one you are advised not to have. Mapping biopsy finds more cancer than any other test short of removing the gland, and much of the extra cancer it finds is exactly the low-grade disease the pathway now tries not to find. Accuracy and benefit are not the same thing in a disease with this much overdiagnosis, which is the whole reason NG131 restricts it to trials.",
    ] },

  // ---------------------------------------------------------------- hormone treatment strategies
  { id: "bipolar-androgen-therapy", kind: "term", asOf, tags, name: "Bipolar androgen therapy (BAT)", category: "Treatment jargon",
    aka: ["BAT", "bipolar androgen therapy", "supraphysiological testosterone", "high-dose testosterone therapy", "testosterone cycling prostate cancer"],
    tldr: "Deliberately giving large doses of testosterone to men whose prostate cancer has learned to live without it, swinging the level from very high to very low each month. It is the opposite of standard treatment, and about a third of men respond, with about half then responding again to the hormone-blocking drug that had stopped working.",
    summary: "Bipolar androgen therapy is rapid cycling between supraphysiological and near-castrate serum testosterone, achieved by giving intramuscular testosterone cipionate 400 mg every 28 days while continuing luteinising hormone-releasing hormone agonist therapy, so the level peaks far above the normal range and falls back towards castrate before the next dose. The rationale comes directly from the mechanism of castration resistance established by Visakorpi and by Chen: a cell that survives androgen deprivation by amplifying and overexpressing the androgen receptor is, on that account, adapted to a low-ligand environment and vulnerable to a high-ligand one.\n\nThe evidence is two trials from Johns Hopkins. RESTORE gave it to 30 asymptomatic men whose metastatic castration-resistant disease had progressed on enzalutamide: 9 of 30 (30 percent; 95 percent confidence interval 15 to 49) had a prostate-specific antigen fall of at least 50 percent, and of the 21 who went on to enzalutamide rechallenge afterwards, 15 (52 percent; 33 to 71) responded again. TRANSFORMER randomised 195 asymptomatic men to bipolar androgen therapy or enzalutamide with crossover allowed at progression. The primary endpoint was flat, 5.7 months in both arms (hazard ratio 1.14; 0.83 to 1.55). The interesting results were secondary: prostate-specific antigen progression-free survival on enzalutamide was 3.8 months when it followed abiraterone and 10.9 months when it followed bipolar androgen therapy; progression-free survival through crossover was 28.2 months for the bipolar-then-enzalutamide sequence against 19.6 months for the reverse (hazard ratio 0.44; 0.22 to 0.88); overall survival did not differ (32.9 against 29.0 months; hazard ratio 0.95); and patient-reported quality of life consistently favoured bipolar androgen therapy.\n\nIt is not standard care anywhere and it is not safe in everyone. Both trials excluded men with more than five visceral sites or bone lesions at risk of fracture, because of the risk of tumour flare, and enrolled only asymptomatic men. Cardiovascular and thromboembolic events occurred: hypertension in 3 of 30 in RESTORE, with single grade 3 or worse events including pulmonary embolism, myocardial infarction, urinary obstruction, gallstone and sepsis. The case for a definitive trial rests on the resensitisation effect rather than the direct response rate, and the endpoint that would show it, progression-free survival through the second line, is not the one phase 3 trials usually use.",
    cancers: [PROSTATE, MCRPC],
    terms: ["castration-resistance", "adt", "psa50", "quality-of-life", "intermittent-androgen-deprivation"],
    drugs: ["enzalutamide", "abiraterone"],
    targets: ["androgen-receptor"],
    institutions: ["johns-hopkins"],
    related: ["paper-teply-restore-bipolar-androgen-therapy-lancet-oncol-2018", "paper-denmeade-transformer-bipolar-androgen-therapy-jco-2021", "idea-prostate-bipolar-androgen-therapy-phase-3-on-pfs2", "intermittent-androgen-deprivation", "idea-bio1-alternating-schedules"],
    sections: ["hormonal"],
    keyPapers: ["paper-teply-restore-bipolar-androgen-therapy-lancet-oncol-2018", "paper-denmeade-transformer-bipolar-androgen-therapy-jco-2021", "paper-chen-androgen-receptor-overexpression-antiandrogen-resistance-nat-med-2004"],
    bottlenecks: ["b-resistance", "b-generic-repurposing", "b-toxicity-qol", "b-trial-design"],
    links: [SRC.restore, SRC.transformer],
    notes: [
      "Bipolar androgen therapy is not the same as intermittent androgen deprivation, and confusing the two is the commonest error here. Intermittent deprivation pauses treatment and lets testosterone drift back towards normal, to give the man a break from side effects. Bipolar androgen therapy pushes testosterone far above normal on purpose, while castration continues underneath, to attack a cell that has adapted to its absence. One is a rest; the other is an attack.",
      "It is testosterone, which men with prostate cancer are taught to fear, and the fear is not unfounded outside the trial population. The trials enrolled asymptomatic men without high-risk sites for tumour flare; a man with spinal disease, extensive visceral metastases or symptoms is exactly the man in whom a testosterone surge is dangerous. This is a trial treatment, and it should be had inside a trial.",
      "Why the endpoint matters for whether it ever gets licensed. The benefit shows up in what happens after bipolar androgen therapy, as resensitisation to a drug that had failed. A conventional progression-free survival endpoint measures only the first step and was flat in TRANSFORMER. That is the argument for progression-free survival through the second line as the primary endpoint of a phase 3.",
    ] },

  { id: "intermittent-androgen-deprivation", kind: "term", asOf, tags, name: "Intermittent androgen deprivation (IAD)", category: "Treatment jargon",
    aka: ["IAD", "IADT", "intermittent hormone therapy", "intermittent androgen suppression", "treatment holiday", "hormone therapy break"],
    tldr: "Taking planned breaks from hormone therapy once the PSA has settled, restarting when it rises again. The aim is to give a man time back with his energy, his libido and his mood. The largest trial found the benefit was real but lasted about three months, and could not rule out a worse chance of survival.",
    summary: "Intermittent androgen deprivation is a strategy of stopping androgen deprivation after an induction period in men who have responded, allowing testosterone to recover, and restarting on a defined trigger. NICE NG131 recommendation 1.4.1 says to consider intermittent therapy for people having long-term androgen deprivation, other than in the adjuvant setting, and to discuss the rationale, the limited evidence for a reduction in side effects, and the effect on progression. Recommendation 1.4.2 sets the practical rule: measure prostate-specific antigen every 3 months, and restart androgen deprivation if the level reaches 10 nanograms per millilitre or above, or if there is symptomatic progression.\n\nThe evidence is SWOG 9346, and it is honestly inconclusive. Hussain and the Southwest Oncology Group enrolled 3,040 men with newly diagnosed metastatic hormone-sensitive prostate cancer, gave seven months of androgen deprivation, and randomised the 1,535 whose prostate-specific antigen fell to 4 nanograms per millilitre or below to continuous or intermittent therapy, with co-primary objectives of non-inferior survival, bounded by a hazard ratio of 1.20, and quality of life at three months. Median survival was 5.8 years continuous against 5.1 years intermittent, hazard ratio 1.10 with a 90 percent confidence interval of 0.99 to 1.23. That interval crosses the non-inferiority boundary, so a 20 percent greater risk of death could not be excluded, and too few events occurred to demonstrate inferiority either. Erectile function (p less than 0.001) and mental health (p equals 0.003) were better on intermittent therapy at month 3 and not afterwards. Median follow-up was 9.8 years.\n\nThat is why it is offered as a choice rather than recommended, and why the honest statement to a man weighing it is that the quality-of-life gain is real, measurable and brief, and the survival question is open rather than settled. Two further limits belong with the figures: only men whose prostate-specific antigen fell below 4 nanograms per millilitre after seven months were randomised, so the result does not apply to men who do not achieve that response; and standard of care has changed completely since enrolment, because androgen deprivation alone is no longer first-line treatment for metastatic disease, so the question would have to be re-asked on top of a modern backbone of an androgen receptor pathway inhibitor with or without docetaxel.",
    cancers: [PROSTATE, MHSPC, BCR, HIGH_RISK],
    terms: ["adt", "psa", "quality-of-life", "hazard-ratio", "bipolar-androgen-therapy", "hot-flushes-on-hormone-therapy", "treatment-induced-bone-loss"],
    drugs: ["leuprolide", "bicalutamide"],
    targets: ["androgen-receptor"],
    related: ["paper-hussain-swog-9346-intermittent-androgen-deprivation-nejm-2013", "adt", "bipolar-androgen-therapy", "idea-prostate-other-cause-mortality-as-a-reported-service-outcome", "idea-bio1-alternating-schedules"],
    sections: ["hormonal", "supportive-care"],
    keyPapers: ["paper-hussain-swog-9346-intermittent-androgen-deprivation-nejm-2013", "paper-langley-lancet"],
    bottlenecks: ["b-toxicity-qol", "b-trial-design", "b-survivorship", "b-aging-comorbidity"],
    links: [SRC.ng131, SRC.swog9346],
    notes: [
      "What NICE actually asks for, in numbers. Consider it for long-term androgen deprivation outside the adjuvant setting, and discuss three things honestly: the rationale, the limited evidence that side effects improve, and the effect on progression (NG131 1.4.1). If it is used, check the prostate-specific antigen every 3 months and restart at 10 nanograms per millilitre or above, or on symptomatic progression (NG131 1.4.2).",
      "The break is not immediate and it is not complete. Testosterone recovery after stopping a luteinising hormone-releasing hormone agonist takes months and is slower the longer the treatment has run and the older the man; some men never recover normal levels. A man expecting to feel like himself within weeks of the last injection should be told what the recovery curve actually looks like.",
      "SWOG 9346 is a good trial to read if you want to see what an inconclusive result looks like when it is reported honestly. The authors state plainly that neither non-inferiority nor inferiority was established. A summary that reports it as intermittent therapy is as good as continuous is misreading it.",
    ] },
];

// ======================= SUPPLEMENTS =======================
/**
 * Two of the seventeen words in PENDING_TERMS already had records under a different id, so they are supplemented
 * rather than duplicated (a rival record would split the glossary and the search index in two). The rest of the
 * supplements are the inbound links: each new term is attached to the papers, ideas, technologies and terms whose
 * vocabulary it is, without editing the files those records live in.
 */
const supplements: SpikeSupplement[] = [

  // ---- the two existing records that cover a pending id, widened rather than replaced
  { id: "psa50",
    aka: ["PSA50 response", "PSA50", "PSA90", "PSA90 response", "50 percent PSA decline", "prostate-specific antigen response rate"],
    terms: ["radiographic-progression-free-survival", "bipolar-androgen-therapy"],
    related: ["radiographic-progression-free-survival", "bipolar-androgen-therapy"],
    links: [SRC.pcwg2, SRC.pcwg3],
    notes: [
      "What counts as a PSA50, exactly. It is a decline of 50 percent or more from the baseline value, measured on treatment and confirmed by a second value at least four weeks later; PSA90 is the same with a 90 percent threshold. Both are proportions of patients, not times, so a PSA50 rate says nothing about how long the response lasted.",
      "The working group that trials cite for it recommends against reporting it. PCWG2 advises against prostate-specific antigen response rates, on the grounds that thresholds such as a 50 percent decline have no demonstrated clinical significance, and asks instead for the percentage change from baseline to 12 weeks and the maximum decline at any point, reported per patient in a waterfall plot. Trials report PSA50 anyway because it is a single comparable number, which is exactly the property PCWG2 objected to.",
      "The prostate figures a reader will meet. RESTORE: a 50 percent decline in 9 of 30 men (30 percent) on bipolar androgen therapy, and in 15 of 21 (52 percent) on enzalutamide rechallenge afterwards. TRANSFORMER: 28.2 percent on bipolar androgen therapy against 25.3 percent on enzalutamide, and 77.8 percent in men crossing over to enzalutamide. TRITON2: 54.8 percent (63 of 115) with rucaparib in BRCA-altered disease. AR-V7-positive men in Antonarakis's cohort: 0 percent on either enzalutamide or abiraterone.",
    ] },

  { id: "ar-v7",
    aka: ["androgen receptor splice variant", "androgen receptor splice variant 7", "AR splice variant", "AR-V7 positive", "AR variant", "AR-V9", "AR-V567es", "truncated androgen receptor"],
    terms: ["neuroendocrine-differentiation", "genome-wide-loss-of-heterozygosity", "bipolar-androgen-therapy"],
    related: ["neuroendocrine-differentiation", "bipolar-androgen-therapy", "paper-antonarakis-ar-v7-resistance-nejm-2014"],
    links: [SRC.antonarakis],
    notes: [
      "Why a splice variant defeats a drug, in one sentence. Alternative splicing of the androgen receptor transcript produces truncated receptors, of which AR-V7 is the commonest and best studied, that retain the DNA-binding domain but lack the ligand-binding domain; they are constitutively active, and enzalutamide and abiraterone both act on the ligand-binding domain that is no longer there. AR-V9 and AR-V567es are other described variants, less well characterised clinically.",
      "The original figures, with their cohort. In 62 men with metastatic castration-resistant prostate cancer starting enzalutamide or abiraterone, AR-V7 messenger RNA was detectable in circulating tumour cells in 39 percent of 31 enzalutamide-treated and 19 percent of 31 abiraterone-treated men. Prostate-specific antigen response was 0 percent in AR-V7-positive men against 53 percent (enzalutamide) and 68 percent (abiraterone) in AR-V7-negative men; median prostate-specific antigen progression-free survival on enzalutamide was 1.4 against 6.0 months and overall survival 5.5 months against not reached.",
      "Why the test is available and little used. A negative result does not predict response, only the absence of this one resistance mechanism, and most non-responders are AR-V7-negative. Messenger RNA and protein-based assays do not identify the same men and the test is not standardised between laboratories. And the treatments a positive result would send a man to, taxanes and radioligand therapy, tend to be given in that sequence anyway.",
    ] },

  // ---- inbound links from the screening evidence
  { id: "overdiagnosis", terms: ["lead-time-bias", "overtreatment", "number-needed-to-screen"], related: ["lead-time-bias", "overtreatment", "number-needed-to-screen"] },
  { id: "paper-draisma-lead-time-overdiagnosis-psa-jnci-2009", terms: ["lead-time-bias", "overtreatment", "number-needed-to-screen"] },
  { id: "paper-welch-albertsen-psa-era-diagnosis-treatment-jnci-2009", terms: ["lead-time-bias", "overtreatment"] },
  { id: "paper-loeb-overdiagnosis-overtreatment-prostate-eur-urol-2014", terms: ["overtreatment", "lead-time-bias"] },
  { id: "paper-uspstf-prostate-screening-jama-2018", terms: ["overtreatment", "number-needed-to-screen", "other-cause-mortality"] },
  { id: "paper-moyer-uspstf-prostate-screening-ann-intern-med-2012", terms: ["overtreatment", "lead-time-bias"] },
  { id: "paper-schroder-erspc-screening-mortality-nejm-2009", terms: ["number-needed-to-screen", "lead-time-bias"] },
  { id: "paper-hugosson-eur-urol", terms: ["number-needed-to-screen"] },
  { id: "paper-andriole-plco-prostate-screening-nejm-2009", terms: ["number-needed-to-screen", "lead-time-bias"] },
  { id: "paper-catalona-psa-screening-test-nejm-1991", terms: ["number-needed-to-screen", "lead-time-bias"] },
  { id: "paper-bill-axelson-spcg-4-29-year-nejm-2018", terms: ["other-cause-mortality", "overtreatment"] },
  { id: "paper-wilt-pivot-prostatectomy-observation-nejm-2017", terms: ["other-cause-mortality", "overtreatment"] },
  { id: "paper-dess-black-race-prostate-mortality-jama-oncol-2019", terms: ["other-cause-mortality", "polygenic-risk-score"] },
  { id: "paper-conti-trans-ancestry-gwas-prostate-nat-genet-2021", terms: ["polygenic-risk-score", "other-cause-mortality"] },
  { id: "paper-goteborg-2-n-engl-j-med-2022", terms: ["polygenic-risk-score", "pi-rads", "number-needed-to-screen"] },
  { id: "polygenic-risk-scores", terms: ["polygenic-risk-score"], related: ["polygenic-risk-score"] },

  // ---- inbound links from the imaging and pathology evidence
  { id: "paper-ahmed-promis-multiparametric-mri-lancet-2017", terms: ["template-mapping-biopsy", "pi-rads", "whole-mount-pathology"] },
  { id: "paper-johnson-mpmri-individual-foci-eur-urol-2019", terms: ["whole-mount-pathology", "pi-rads", "template-mapping-biopsy"] },
  { id: "paper-precision-mri-targeted-biopsy-nejm-2018", terms: ["pi-rads", "template-mapping-biopsy"] },
  { id: "prostate-screening-psa-mri", terms: ["pi-rads", "lead-time-bias", "number-needed-to-screen", "polygenic-risk-score"], related: ["pi-rads"] },
  { id: "idea-prostate-per-lesion-mri-audit-before-focal-treatment", terms: ["whole-mount-pathology", "pi-rads", "template-mapping-biopsy"] },
  { id: "idea-prostate-metastatic-presentation-as-the-screening-endpoint", terms: ["metastasis-free-survival", "lead-time-bias", "overtreatment", "number-needed-to-screen"] },
  { id: "idea-prev-prs-screening-start-age", terms: ["polygenic-risk-score"] },
  { id: "idea-prev-mri-first-prostate-screening-prs", terms: ["polygenic-risk-score", "pi-rads"] },
  { id: "idea-prev-prostate-as-triggered-biopsy", terms: ["pi-rads", "template-mapping-biopsy"] },

  // ---- inbound links from the genomics and resistance evidence
  { id: "paper-baca-punctuated-evolution-chromoplexy-cell-2013", terms: ["chromoplexy"] },
  { id: "paper-grasso-mutational-landscape-lethal-crpc-nature-2012", terms: ["chromoplexy"] },
  { id: "paper-gundem-evolutionary-history-lethal-metastatic-prostate-nature-2015", terms: ["chromoplexy"] },
  { id: "paper-chung-comprehensive-genomic-profiling-prostate-jco-po-2019", terms: ["genome-wide-loss-of-heterozygosity", "chromoplexy"] },
  { id: "paper-abida-triton2-rucaparib-brca-jco-2020", terms: ["genome-wide-loss-of-heterozygosity"] },
  { id: "paper-fizazi-triton3-rucaparib-nejm-2023", terms: ["genome-wide-loss-of-heterozygosity", "radiographic-progression-free-survival"] },
  { id: "hrd", terms: ["genome-wide-loss-of-heterozygosity"], related: ["genome-wide-loss-of-heterozygosity"] },
  { id: "idea-prostate-hrr-testing-at-metastatic-diagnosis", terms: ["genome-wide-loss-of-heterozygosity"] },
  { id: "paper-mu-sox2-lineage-plasticity-science-2017", terms: ["neuroendocrine-differentiation"] },
  { id: "paper-aggarwal-t-sccpc-jco-2018", terms: ["neuroendocrine-differentiation"] },
  { id: "paper-beltran-nepc-divergent-evolution-nat-med-2016", terms: ["neuroendocrine-differentiation"] },
  { id: "idea-prostate-plasticity-surveillance-before-it-is-neuroendocrine", terms: ["neuroendocrine-differentiation"] },
  { id: "histologic-transformation", terms: ["neuroendocrine-differentiation"], related: ["neuroendocrine-differentiation"] },
  { id: "paper-antonarakis-ar-v7-resistance-nejm-2014", terms: ["radiographic-progression-free-survival", "neuroendocrine-differentiation"] },

  // ---- inbound links from the hormonal evidence
  { id: "paper-teply-restore-bipolar-androgen-therapy-lancet-oncol-2018", terms: ["bipolar-androgen-therapy"] },
  { id: "paper-denmeade-transformer-bipolar-androgen-therapy-jco-2021", terms: ["bipolar-androgen-therapy", "radiographic-progression-free-survival"] },
  { id: "paper-hussain-swog-9346-intermittent-androgen-deprivation-nejm-2013", terms: ["intermittent-androgen-deprivation", "other-cause-mortality"] },
  { id: "idea-prostate-bipolar-androgen-therapy-phase-3-on-pfs2", terms: ["bipolar-androgen-therapy", "intermittent-androgen-deprivation"] },
  { id: "idea-prostate-other-cause-mortality-as-a-reported-service-outcome", terms: ["other-cause-mortality", "intermittent-androgen-deprivation"] },
  { id: "idea-prostate-randomise-the-sequence-not-only-the-drugs", terms: ["radiographic-progression-free-survival", "metastasis-free-survival", "bipolar-androgen-therapy"] },
  { id: "idea-bio1-alternating-schedules", terms: ["bipolar-androgen-therapy", "intermittent-androgen-deprivation"] },
  { id: "adt", terms: ["intermittent-androgen-deprivation", "bipolar-androgen-therapy"], related: ["intermittent-androgen-deprivation"] },
  // androgen-deprivation-therapy merged into adt on 2026-09-25: see src/data/merged-records.ts.
  { id: "paper-abiraterone-acetate-prostate-n-engl-j-med-2013", terms: ["radiographic-progression-free-survival"] },
  { id: "paper-scher-affirm-enzalutamide-nejm-2012", terms: ["radiographic-progression-free-survival"] },
  { id: "paper-beer-prevail-enzalutamide-nejm-2014", terms: ["radiographic-progression-free-survival", "metastasis-free-survival"] },
  { id: "prosper", terms: ["metastasis-free-survival"] },
  { id: "aramis", terms: ["metastasis-free-survival"] },
  { id: "embark", terms: ["metastasis-free-survival", "psa-doubling-time"] },
  { id: "psa-doubling-time", terms: ["metastasis-free-survival"], related: ["metastasis-free-survival"] },
];

// ======================= PATCHES =======================
/** The family page gains the vocabulary; the state and risk pages gain the words that belong to them. */
const prostatePatch: Spike["patch"] = {
  asOf,
  terms: [
    "lead-time-bias", "overtreatment", "number-needed-to-screen", "other-cause-mortality",
    "metastasis-free-survival", "radiographic-progression-free-survival", "psa50",
    "chromoplexy", "genome-wide-loss-of-heterozygosity", "polygenic-risk-score",
    "neuroendocrine-differentiation", "whole-mount-pathology", "pi-rads", "template-mapping-biopsy",
    "bipolar-androgen-therapy", "intermittent-androgen-deprivation", "ar-v7",
  ],
  notes: [
    "The words that carry the screening argument, in one place. Lead time is how much earlier a screening test found the cancer, and lead-time bias is the mistake of counting that extra knowing as extra life; overdiagnosis is a lead time longer than the rest of the man's life; overtreatment is the harm that follows when an overdiagnosed cancer is treated. The number needed to screen turns all of it into one figure a health service can weigh: at 16 years in the European randomised trial, 570 men invited and 18 extra cancers diagnosed to prevent one prostate cancer death.",
    "Two words for the same scan, and they are not the same score. The international system is PI-RADS, now version 2.1, which builds a 1 to 5 assessment category from fixed per-sequence rules. NICE NG131 1.2.2 asks United Kingdom reports to use a 5-point Likert scale instead, which is the radiologist's overall probability judgement using the clinical picture as well as the images. Both run 1 to 5 and both trigger a biopsy at 3 or more, and a man reading an American source about his own scan is reading a different scale.",
  ],
};

const screeningTermsPatch: Spike["patch"] = { asOf, terms: ["lead-time-bias", "overtreatment", "number-needed-to-screen", "pi-rads", "template-mapping-biopsy", "polygenic-risk-score", "whole-mount-pathology"] };
const highRiskTermsPatch: Spike["patch"] = { asOf, terms: ["metastasis-free-survival", "other-cause-mortality", "chromoplexy", "pi-rads", "whole-mount-pathology", "polygenic-risk-score"] };
const bcrTermsPatch: Spike["patch"] = { asOf, terms: ["metastasis-free-survival", "intermittent-androgen-deprivation"] };
const mhspcTermsPatch: Spike["patch"] = { asOf, terms: ["intermittent-androgen-deprivation", "other-cause-mortality", "genome-wide-loss-of-heterozygosity", "radiographic-progression-free-survival"] };
const nmcrpcTermsPatch: Spike["patch"] = { asOf, terms: ["metastasis-free-survival", "other-cause-mortality", "psa-doubling-time"] };
const mcrpcTermsPatch: Spike["patch"] = { asOf, terms: ["radiographic-progression-free-survival", "bipolar-androgen-therapy", "genome-wide-loss-of-heterozygosity", "neuroendocrine-differentiation", "chromoplexy"] };
const nepcTermsPatch: Spike["patch"] = { asOf, terms: ["neuroendocrine-differentiation", "radiographic-progression-free-survival"] };

const spike: Spike = { cancerId: PROSTATE, entities: prostateGlossaryTerms, patch: prostatePatch, supplements };

export const prostateGlossaryLowRiskSpike: Spike = { cancerId: LOW_RISK, entities: [], patch: screeningTermsPatch };
export const prostateGlossaryIntermediateRiskSpike: Spike = { cancerId: INTERMEDIATE_RISK, entities: [], patch: screeningTermsPatch };
export const prostateGlossaryHighRiskSpike: Spike = { cancerId: HIGH_RISK, entities: [], patch: highRiskTermsPatch };
export const prostateGlossaryBcrSpike: Spike = { cancerId: BCR, entities: [], patch: bcrTermsPatch };
export const prostateGlossaryMhspcSpike: Spike = { cancerId: MHSPC, entities: [], patch: mhspcTermsPatch };
export const prostateGlossaryNmcrpcSpike: Spike = { cancerId: NMCRPC, entities: [], patch: nmcrpcTermsPatch };
export const prostateGlossaryMcrpcSpike: Spike = { cancerId: MCRPC, entities: [], patch: mcrpcTermsPatch };
export const prostateGlossaryNepcSpike: Spike = { cancerId: NEPC, entities: [], patch: nepcTermsPatch };

export default spike;
