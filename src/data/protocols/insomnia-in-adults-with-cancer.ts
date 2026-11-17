import { protocol } from "./helpers";

/*
 * Insomnia in adults with cancer: regular screening, assessment with a validated scale and an interview, cognitive
 * behavioural therapy for insomnia (CBT-I) first, and the limited place of sleeping tablets, melatonin and cannabis.
 *
 * What was read, and how. First written on 11 November 2026. Second accuracy pass on 17 November 2026: both sources
 * were fetched again as raw text and every claim was re-read against them.
 * - ESMO Clinical Practice Guideline on insomnia in adult patients with cancer (ESMO Open 2023): full text XML from the
 *   Europe PMC REST API (PMC10774975), tags stripped by script, including every recommendation and its grade. The
 *   supplementary file (Tables S1 to S5), unread in the first pass, was downloaded from the Europe PMC supplementary
 *   files endpoint and read with pdftotext; Table S5 is the grading scheme. Europe PMC and Crossref list no update,
 *   correction or newer edition. ESMO's own guideline page is drawn by script and gave no readable update notice.
 * - MASCC guideline on cannabis for psychological symptoms including insomnia (Support Care Cancer 2023): abstract only,
 *   from the Europe PMC REST API; the full text is not open access.
 * A Europe PMC title search for 2022 to 2026 found no ASCO guideline on insomnia in cancer and no newer ESMO or MASCC
 * one. Both DOIs were resolved through Crossref and Europe PMC and the titles checked. Every quote was checked
 * verbatim by script against the raw text (whitespace normalised only).
 */
export const insomniaInAdultsWithCancer = protocol({
  id: "insomnia-in-adults-with-cancer",
  name: "Insomnia in adults with cancer: screening, assessment and CBT-I first",
  aka: ["insomnia during cancer treatment", "sleep problems after cancer", "CBT-I", "cognitive behavioural therapy for insomnia", "digital CBT-I", "sleeping tablets in cancer", "melatonin for sleep in cancer"],
  domain: "symptom-management",
  tldr: "Trouble sleeping is very common during and after cancer treatment, and it often lasts. Your team should ask about your sleep at every stage. The treatment with the best evidence is cognitive behavioural therapy for insomnia (CBT-I), face to face or online. Sleeping tablets can help for a short time but are not recommended for long-term use; exercise can help too.",
  simple: "If you cannot sleep, tell your team. A talking treatment called CBT-I has the best evidence. Sleeping pills are only for a short time.",
  summary: "ESMO (2023) recommends that every patient with cancer be screened and assessed for insomnia regularly, from diagnosis through treatment and survivorship [I, A]; that people who screen positive have their severity measured with a validated tool, with the Insomnia Severity Index recommended [II, B]; and that a clinical interview is needed for a detailed evaluation [I, A]. CBT-I is the standard of care for insomnia in cancer survivors [I, A]. Where face-to-face CBT-I cannot be had, electronic CBT-I should be offered to survivors [II, A]; brief behavioural therapy should be considered during active treatment [II, B]; and mindfulness-based therapy should be offered to survivors when CBT-I is not available or they prefer it [II, B]. ESMO says it remains unclear whether full CBT-I is effective during active treatment, because nearly all the trials were in survivors. Exercise tailored to the person should be offered alone or alongside [II, B].\n\nHypnotics are an option, but their limited evidence of benefit does not outweigh the harms of long-term use [II, C]; short-term use of up to two weeks is not ruled out. Melatonin should be considered when circadian disruption is thought to maintain the insomnia and non-drug options are limited [II, B]; ESMO notes studies used 2 to 20 mg and that there is no dosing recommendation. Bright light therapy has insufficient evidence [II, C]. MASCC (2023) found no high-quality evidence to recommend cannabis for insomnia or other psychological symptoms in cancer.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "community"],
  },
  population: "Adults with cancer, during any phase of treatment and in survivorship. ESMO's strongest treatment recommendation (CBT-I as standard of care) is made for cancer survivors; for people in active treatment it recommends considering the briefer behavioural version. Children and adolescents are not covered.",
  trigger: "At diagnosis, before primary treatment, and regularly during treatment and survivorship.",
  steps: [
    {
      action: "Screen every patient for insomnia regularly, from diagnosis and before treatment through to survivorship",
      why: "Insomnia is about three times as common in people with cancer as in the general population, often peaks after diagnosis, and frequently becomes chronic. ESMO says it is under-recognised and inadequately treated.",
      source: "esmo-2023",
      quote: "All patients with cancer should be regularly screened and assessed for insomnia during all phases of their treatment (e.g. after diagnosis and prior to surgery or any other primary treatment) and during the survivorship trajectory [I, A]",
      grade: "[I, A]",
    },
    {
      action: "For a positive screen, measure severity with a validated tool such as the Insomnia Severity Index, and repeat it over time",
      why: "The Insomnia Severity Index has been validated in people with cancer. It scores from 0 to 28: ESMO reads 8 to 14 as subthreshold insomnia and 15 or more as clinical insomnia.",
      source: "esmo-2023",
      quote: "The ISI is recommended for assessment of insomnia severity in patients with cancer [II, B]",
      grade: "[II, B]",
    },
    {
      action: "Assess in a clinical interview covering night-time and daytime symptoms, other mental or physical conditions and daily habits",
      why: "Insomnia, depression and fatigue can maintain and amplify each other, and pain and anxiety can be part of the same loop. ESMO adds that a full interview is rarely feasible in an oncology clinic and can be replaced by a validated questionnaire completed before the consultation.",
      source: "esmo-2023",
      quote: "A clinical interview is needed for a detailed insomnia evaluation [I, A]",
      grade: "[I, A]",
    },
    {
      action: "Offer cognitive behavioural therapy for insomnia (CBT-I) as the first treatment for cancer survivors with insomnia",
      why: "CBT-I works on the sleep habits and thoughts that keep insomnia going. It has the strongest evidence, and the trials that looked for harms found none. Nearly all the trials were in survivors, so ESMO says it remains unclear whether it works as well during active treatment.",
      source: "esmo-2023",
      quote: "CBT-I is recommended as the standard of care for treating insomnia in cancer survivors [I, A]",
      grade: "[I, A]",
    },
    {
      action: "Where face-to-face CBT-I is not available to a survivor, offer electronic CBT-I; during active treatment, consider brief behavioural therapy",
      why: "In trials, online programmes had effects similar to face-to-face CBT-I. The brief version lowers the burden on the patient; ESMO grades it [II, B] and calls its evidence weak.",
      source: "esmo-2023",
      quote: "eCBT-I should be offered to cancer survivors with insomnia when face-to-face CBT-I is not available due to cost, lack of trained therapists, or physical or geographical constraints [II, A]",
      grade: "[II, A]",
    },
    {
      action: "Offer exercise suited to the person's abilities, alone or alongside other treatment",
      why: "ESMO rates the evidence that exercise improves insomnia in cancer as weak to moderate, and recommends it because of the general benefits of exercise.",
      source: "esmo-2023",
      quote: "While currently available evidence is moderate, the general benefits of physical exercise suggest that exercise tailored to the patient’s abilities and needs should be offered as a stand-alone or supplementary intervention for insomnia in patients with cancer and cancer survivors [II, B]",
      grade: "[II, B]",
    },
    {
      action: "If sleeping tablets are used, keep to two weeks or less; long-term use is not recommended",
      why: "The evidence that they help in cancer is limited. ESMO lists the risks of long-term use as drowsiness and poor daytime performance, dependence and tolerance, and insomnia on withdrawal.",
      source: "esmo-2023",
      quote: "Hypnotics are an option for treating insomnia in patients with cancer and cancer survivors; however, the limited evidence for efficacy does not outweigh the side-effects and risks of AEs associated with long-term use [II, C]. This recommendation does not preclude short-term use (≤2 weeks).",
      grade: "[II, C]",
    },
    {
      action: "Consider melatonin when disrupted body-clock rhythms seem to keep the insomnia going and non-drug options are limited",
      why: "ESMO suggests sleep problems in cancer may more often involve a disrupted body clock, which responds better to melatonin, and trials report only mild side effects. ESMO gives no dose.",
      source: "esmo-2023",
      quote: "Melatonin should be considered in patients with cancer and cancer survivors when circadian rhythm disruption is believed to be an important factor in maintaining the insomnia and when suitable nonpharmacological options are limited [II, B]",
      grade: "[II, B]",
    },
  ],
  bestInClass: {
    statement: "ESMO 2023 is the latest specialist guideline found and was read in full: screen everyone regularly, assess with the Insomnia Severity Index and a clinical interview, and treat survivors with CBT-I first [I, A], electronic CBT-I where face-to-face therapy is unavailable [II, A], brief behavioural therapy to be considered during active treatment [II, B], mindfulness-based therapy as an alternative for survivors [II, B] and exercise alone or alongside [II, B]. Hypnotics are an option, with long-term use not recommended and use restricted to two weeks or less [II, C]. ESMO notes that the American College of Physicians, the European Sleep Research Society and the American Academy of Sleep Medicine also recommend CBT-I as standard care for insomnia in general. MASCC (2023) does not recommend cannabis for insomnia in cancer.",
    sources: ["esmo-2023", "mascc-cannabis-2023"],
  },
  variants: [
    {
      name: "Brief behavioural therapy for insomnia (BBT-I) during active treatment",
      differs: "A shorter behavioural programme, with less burden on the patient, in place of full CBT-I while treatment is ongoing.",
      evidence: "ESMO: should be considered for patients in active treatment [II, B]. ESMO describes it as promising but calls the evidence weak, because the studies are few and report little beyond sleep quality.",
      sources: ["esmo-2023"],
    },
    {
      name: "Mindfulness-based therapy",
      differs: "Mindfulness training instead of CBT-I.",
      evidence: "ESMO: to be offered when CBT-I is not available or the survivor prefers it [II, B]; in the meta-analysis ESMO cites, which was not limited to cancer, it was better than attention-control conditions such as sleep hygiene education and no different from sleep-specific treatments such as CBT-I. ESMO calls the evidence in cancer weak.",
      sources: ["esmo-2023"],
    },
    {
      name: "Sleep hygiene advice alone",
      differs: "Advice on caffeine and alcohol late in the day, daytime naps and irregular bedtimes, without the other parts of CBT-I.",
      evidence: "ESMO describes sleep hygiene education as one component of CBT-I, and cites mindfulness-based therapy outperforming sleep hygiene education as an attention-control condition; it is not recommended as a stand-alone treatment in any source read.",
      sources: ["esmo-2023"],
    },
    {
      name: "Cannabis for sleep",
      differs: "Cannabis or cannabinoids used for insomnia.",
      evidence: "MASCC (2023): of 15 randomised trials, none assessed psychological symptoms as the primary outcome, though six suggested a benefit (five for sleep, one for mood); no high-quality evidence to recommend it.",
      sources: ["mascc-cannabis-2023"],
    },
  ],
  grades: [
    { claim: "Bright light therapy for insomnia", grade: "[II, C]", source: "esmo-2023", quote: "There is currently insufficient evidence to support the use of bright light therapy in treating insomnia in patients with cancer and cancer survivors [II, C]" },
    { claim: "Mindfulness-based therapy as an alternative to CBT-I", grade: "[II, B]", source: "esmo-2023", quote: "MBT should be offered to cancer survivors with insomnia when CBT-I is not available or when MBT is preferable to survivors [II, B]" },
    { claim: "Brief behavioural therapy during active treatment", grade: "[II, B]", source: "esmo-2023", quote: "BBT-I, which reduces the patient burden of the intervention, should be considered for patients in active treatment for cancer who are experiencing insomnia [II, B]" },
    { claim: "Cannabis for psychological symptoms including insomnia", grade: "no high-quality evidence (MASCC)", source: "mascc-cannabis-2023", quote: "There is no high-quality evidence to recommend the use of cannabis as an intervention for psychological symptoms in patients with cancer until more high-quality research demonstrates benefit." },
  ],
  sources: [
    { key: "esmo-2023", label: "Insomnia in adult patients with cancer: ESMO Clinical Practice Guideline", publisher: "ESMO, ESMO Open", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10774975/", doi: "10.1016/j.esmoop.2023.102047", gradingScheme: "ESMO levels of evidence I to V (I is at least one large, good-quality randomised trial or a meta-analysis of such trials; II is small or possibly biased randomised trials; V is uncontrolled studies, case reports and expert opinion) and grades of recommendation A to E (A strongly recommended, B generally recommended, C optional, D generally not recommended, E never recommended), adapted from the Infectious Diseases Society of America-United States Public Health Service system and set out in Supplementary Table S5.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-cannabis-2023", label: "Multinational Association of Supportive Care in Cancer (MASCC) guidelines: cannabis for psychological symptoms including insomnia, anxiety, and depression", publisher: "MASCC, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/36809575", doi: "10.1007/s00520-023-07628-3", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "On 17 November 2026 ESMO's supplementary file was read, including the grading table (Table S5). Its Table S4 lists typical doses of sleeping tablets used in medical settings; they are not repeated here because ESMO makes no dose recommendation for people with cancer.",
    "The MASCC cannabis guideline was read as an abstract only on 17 November 2026; its full text is not open access, so its detailed recommendations and any grading could not be checked.",
    "ESMO 2023 is the latest edition found on 17 November 2026: Europe PMC and Crossref list no update or correction. ESMO's own guideline page is drawn by script and could not be read as raw text for an update notice.",
    "ESMO makes its CBT-I, electronic CBT-I and mindfulness recommendations for survivors and says it remains unclear whether CBT-I is effective in patients in active treatment. The text read does not say who should avoid sleep restriction.",
    "ESMO gives no melatonin dose recommendation; it reports that studies in patients with cancer used 2 to 20 mg.",
    "Access to CBT-I is limited in many health systems; how many patients with cancer are offered it has not been measured in any source read.",
    "No ASCO or NCCN insomnia guideline was read; NCCN's survivorship guideline covers sleep but its text cannot be reproduced.",
  ],
  institutions: ["esmo"],
  technologies: ["cbt-insomnia-cancer", "rejuv-mind-sleep-after-cancer", "rejuv-mind-sleeping-tablets-after-cancer", "sleep-circadian-interventions", "mindfulness-based-interventions", "exercise-oncology"],
  terms: ["quality-of-life", "cancer-related-fatigue"],
  sections: ["supportive-care"],
  tags: ["protocol", "supportive-care", "sleep"],
});
