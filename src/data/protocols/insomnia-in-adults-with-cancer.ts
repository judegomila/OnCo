import { protocol } from "./helpers";

/*
 * Insomnia in adults with cancer: regular screening, assessment with a validated scale and an interview, cognitive
 * behavioural therapy for insomnia (CBT-I) first, and the limited place of sleeping tablets, melatonin and cannabis.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with the Europe PMC REST API into a scratch directory
 * and read as text):
 * - ESMO Clinical Practice Guideline on insomnia in adult patients with cancer (ESMO Open 2023): full text from PubMed
 *   Central (PMC10774975), including every recommendation and its grade. It is the latest ESMO edition found.
 * - MASCC guideline on cannabis for psychological symptoms including insomnia (Support Care Cancer 2023): abstract.
 * No ASCO guideline on insomnia in cancer was found in a Europe PMC search for 2022 to 2026.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const insomniaInAdultsWithCancer = protocol({
  id: "insomnia-in-adults-with-cancer",
  name: "Insomnia in adults with cancer: screening, assessment and CBT-I first",
  aka: ["insomnia during cancer treatment", "sleep problems after cancer", "CBT-I", "cognitive behavioural therapy for insomnia", "digital CBT-I", "sleeping tablets in cancer", "melatonin for sleep in cancer"],
  domain: "symptom-management",
  tldr: "Trouble sleeping is very common during and after cancer treatment, and it often lasts. Your team should ask about your sleep at every stage. The treatment with the best evidence is cognitive behavioural therapy for insomnia (CBT-I), face to face or online. Sleeping tablets can help for a short time but are not recommended for long-term use; exercise can help too.",
  simple: "If you cannot sleep, tell your team. A short course called CBT-I helps most. Sleeping pills are only for a short time.",
  summary: "ESMO (2023) recommends that every patient with cancer be screened and assessed for insomnia regularly, from diagnosis through treatment and survivorship [I, A]; that people who screen positive have their severity measured with a validated tool, with the Insomnia Severity Index recommended [II, B]; and that a clinical interview is needed for a detailed evaluation [I, A]. CBT-I is the standard of care for insomnia in cancer survivors [I, A]. Where face-to-face CBT-I cannot be had, electronic CBT-I should be offered [II, A]; brief behavioural therapy should be considered during active treatment [II, B]; and mindfulness-based therapy is an alternative when CBT-I is not available or is preferred [II, B]. Exercise tailored to the person should be offered alone or alongside [II, B].\n\nHypnotics are an option, but their limited evidence of benefit does not outweigh the harms of long-term use [II, C]; short-term use of up to two weeks is not ruled out. Melatonin should be considered when circadian disruption is thought to maintain the insomnia and non-drug options are limited [II, B]; ESMO notes studies used 2 to 20 mg and that there is no dosing recommendation. Bright light therapy has insufficient evidence [II, C]. MASCC (2023) found no high-quality evidence to recommend cannabis for insomnia or other psychological symptoms in cancer.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "community"],
  },
  population: "Adults with cancer, during any phase of treatment and in survivorship. ESMO's strongest treatment recommendation (CBT-I as standard of care) is made for cancer survivors; for people in active treatment it recommends considering the briefer behavioural version. Children and adolescents are not covered.",
  trigger: "At diagnosis, before primary treatment, and regularly during treatment and survivorship; or whenever a person reports poor sleep.",
  steps: [
    {
      action: "Screen every patient for insomnia regularly, from diagnosis and before treatment through to survivorship",
      why: "Sleep problems are common, often start with the diagnosis and treatment, and can last for years if nobody asks.",
      source: "esmo-2023",
      quote: "All patients with cancer should be regularly screened and assessed for insomnia during all phases of their treatment (e.g. after diagnosis and prior to surgery or any other primary treatment) and during the survivorship trajectory [I, A]",
      grade: "[I, A]",
    },
    {
      action: "For a positive screen, measure severity with a validated tool such as the Insomnia Severity Index, and repeat it over time",
      why: "A score shows how severe the problem is and whether treatment is working.",
      source: "esmo-2023",
      quote: "The ISI is recommended for assessment of insomnia severity in patients with cancer [II, B]",
      grade: "[II, B]",
    },
    {
      action: "Assess in a clinical interview, including the factors that keep the insomnia going such as pain, low mood, anxiety and fatigue",
      why: "Insomnia is tangled up with pain, worry, depression and tiredness, and each makes the others worse; the interview finds what to treat.",
      source: "esmo-2023",
      quote: "A clinical interview is needed for a detailed insomnia evaluation [I, A]",
      grade: "[I, A]",
    },
    {
      action: "Offer cognitive behavioural therapy for insomnia (CBT-I) as the first treatment",
      why: "CBT-I, which retrains sleep habits and the worries that keep people awake, has the strongest evidence and lasting effects without the risks of tablets.",
      source: "esmo-2023",
      quote: "CBT-I is recommended as the standard of care for treating insomnia in cancer survivors [I, A]",
      grade: "[I, A]",
    },
    {
      action: "Where face-to-face CBT-I is not available, offer electronic CBT-I; during active treatment, consider brief behavioural therapy",
      why: "Online programmes worked about as well in trials, and a shorter version is easier to manage while having treatment.",
      source: "esmo-2023",
      quote: "eCBT-I should be offered to cancer survivors with insomnia when face-to-face CBT-I is not available due to cost, lack of trained therapists, or physical or geographical constraints [II, A]",
      grade: "[II, A]",
    },
    {
      action: "Offer exercise suited to the person's abilities, alone or alongside other treatment",
      why: "Exercise improves sleep and has wider benefits after cancer.",
      source: "esmo-2023",
      quote: "While currently available evidence is moderate, the general benefits of physical exercise suggest that exercise tailored to the patient’s abilities and needs should be offered as a stand-alone or supplementary intervention for insomnia in patients with cancer and cancer survivors [II, B]",
      grade: "[II, B]",
    },
    {
      action: "Use sleeping tablets only for short periods; do not rely on them long term",
      why: "The evidence that they help is limited, and long-term use brings side effects and risks.",
      source: "esmo-2023",
      quote: "Hypnotics are an option for treating insomnia in patients with cancer and cancer survivors; however, the limited evidence for efficacy does not outweigh the side-effects and risks of AEs associated with long-term use [II, C]. This recommendation does not preclude short-term use (≤2 weeks).",
      grade: "[II, C]",
    },
    {
      action: "Consider melatonin when disrupted body-clock rhythms seem to keep the insomnia going and non-drug options are limited",
      why: "Melatonin may help when the body clock is out of step, and it has few side effects.",
      source: "esmo-2023",
      quote: "Melatonin should be considered in patients with cancer and cancer survivors when circadian rhythm disruption is believed to be an important factor in maintaining the insomnia and when suitable nonpharmacological options are limited [II, B]",
      grade: "[II, B]",
    },
  ],
  bestInClass: {
    statement: "ESMO 2023 is the latest specialist guideline found and was read in full: screen everyone regularly, assess with the Insomnia Severity Index and a clinical interview, and treat with CBT-I first [I, A], electronic CBT-I where face-to-face therapy is unavailable [II, A], brief behavioural therapy during active treatment [II, B], mindfulness-based therapy as an alternative [II, B] and exercise alongside [II, B]. Hypnotics are for short-term use only [II, C]. ESMO notes that the American College of Physicians, the European Sleep Research Society and the American Academy of Sleep Medicine also recommend CBT-I as standard care for insomnia in general. MASCC (2023) does not recommend cannabis for insomnia in cancer.",
    sources: ["esmo-2023", "mascc-cannabis-2023"],
  },
  variants: [
    {
      name: "Brief behavioural therapy for insomnia (BBT-I) during active treatment",
      differs: "A shorter behavioural programme, with less burden on the patient, in place of full CBT-I while treatment is ongoing.",
      evidence: "Recommended by ESMO for patients in active treatment [II, B].",
      sources: ["esmo-2023"],
    },
    {
      name: "Mindfulness-based therapy",
      differs: "Mindfulness training instead of CBT-I.",
      evidence: "ESMO: to be offered when CBT-I is not available or the survivor prefers it [II, B]; in the meta-analysis ESMO cites it was better than attention-control conditions such as sleep hygiene education.",
      sources: ["esmo-2023"],
    },
    {
      name: "Sleep hygiene advice alone",
      differs: "Advice on caffeine, alcohol, screens and the bedroom, without the other parts of CBT-I.",
      evidence: "ESMO describes sleep hygiene education as one component of CBT-I, and cites mindfulness-based therapy outperforming sleep hygiene education as an attention-control condition; it is not recommended as a stand-alone treatment in any source read.",
      sources: ["esmo-2023"],
    },
    {
      name: "Cannabis for sleep",
      differs: "Cannabis or cannabinoids used for insomnia.",
      evidence: "MASCC (2023): of 15 randomised trials, none assessed psychological symptoms as the primary outcome; no high-quality evidence to recommend it.",
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
    { key: "esmo-2023", label: "Insomnia in adult patients with cancer: ESMO Clinical Practice Guideline", publisher: "ESMO, ESMO Open", year: 2023, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10774975/", doi: "10.1016/j.esmoop.2023.102047", gradingScheme: "ESMO levels of evidence (Roman numerals) and grades of recommendation (letters), as set out in the guideline's Supplementary Table S5, which was not read.", read: "full-text", accessed: "2026-11-11" },
    { key: "mascc-cannabis-2023", label: "Multinational Association of Supportive Care in Cancer (MASCC) guidelines: cannabis for psychological symptoms including insomnia, anxiety, and depression", publisher: "MASCC, Supportive Care in Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/36809575", doi: "10.1007/s00520-023-07628-3", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "ESMO's grading table is in Supplementary Table S5, which was not read; grades are quoted as printed in the recommendations.",
    "ESMO makes its strongest CBT-I recommendation for survivors; the evidence for full CBT-I during active treatment, and for sleep restriction in people who are very tired or at risk of falls or seizures, is not settled in the text read.",
    "ESMO gives no melatonin dose; studies used 2 to 20 mg.",
    "Access to CBT-I is limited in many health systems; how many patients with cancer are offered it has not been measured in any source read.",
    "No ASCO or NCCN insomnia guideline was read; NCCN's survivorship guideline covers sleep but its text cannot be reproduced.",
  ],
  institutions: ["esmo"],
  technologies: ["cbt-insomnia-cancer", "rejuv-mind-sleep-after-cancer", "rejuv-mind-sleeping-tablets-after-cancer", "sleep-circadian-interventions", "mindfulness-based-interventions", "exercise-oncology"],
  terms: ["quality-of-life", "cancer-related-fatigue"],
  sections: ["supportive-care"],
  tags: ["protocol", "supportive-care", "sleep"],
});
