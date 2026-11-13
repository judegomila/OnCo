import { protocol } from "./helpers";

/*
 * Protecting hearing in children and adolescents receiving cisplatin: sodium thiosulfate, what not to use, and
 * hearing surveillance.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Freyer et al., Prevention of cisplatin-induced ototoxicity in children and adolescents with cancer: a clinical
 *   practice guideline (Lancet Child Adolesc Health 2020), full text of the author manuscript from PubMed Central
 *   (PMC7521149, HTML). The publisher's open-access page returned 403 to a script. A Europe PMC title search for a
 *   later cisplatin ototoxicity guideline (2020 to 2026) found none; this is the current edition.
 * - Children's Oncology Group endorsement document for that guideline (version date 27 August 2020), public PDF from
 *   the COG supportive care page (pdftotext, full text).
 * - Clemens et al., IGHG and PanCare recommendations for ototoxicity surveillance for childhood, adolescent and young
 *   adult cancer survivors (Lancet Oncol 2019), full text of the author manuscript from PubMed Central (PMC7549756).
 * - US prescribing information for PEDMARK (sodium thiosulfate injection), DailyMed SPL version 7, published
 *   17 November 2025 (XML, full text), for the dose timing, the age limit and the sodium check.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const paediatricCisplatinHearingProtection = protocol({
  id: "paediatric-cisplatin-hearing-protection",
  name: "Hearing protection for children receiving cisplatin",
  aka: ["cisplatin ototoxicity prevention in children", "sodium thiosulfate otoprotection", "Pedmark", "Pedmarqsi", "cisplatin hearing loss children", "ototoxicity surveillance"],
  domain: "paediatric",
  tldr: "Cisplatin can permanently damage a child's hearing. For many children whose cancer has not spread, a drug called sodium thiosulfate, given as a short drip six hours after each dose of cisplatin, roughly halves the chance of hearing loss. Hearing is tested during treatment and for years after, and any loss is referred to a hearing specialist.",
  simple: "One cancer medicine, cisplatin, can hurt hearing. Another medicine, given six hours later, can protect it for many children. Their hearing is checked during and after treatment.",
  summary: "The international guideline (Freyer et al., 2020, GRADE, endorsed by the Children's Oncology Group in August 2020) covers children and adolescents aged 0 to 18 receiving cisplatin. Sodium thiosulfate: use it in non-metastatic hepatoblastoma (strong, high quality, from SIOPEL 6, where any hearing loss fell from 63% to 33% with no loss of survival); consider it in other non-metastatic cancers (weak, low); and do not use it routinely in metastatic cancers (weak, low), because in the post-hoc metastatic subgroup of ACCL0431 3-year overall survival was 45% with it against 84% without, an estimate the panel judged open to bias and asked to be discussed with families. Do not use amifostine (strong, high), sodium diethyldithiocarbamate (strong, low) or intratympanic therapy (strong, low), and do not change the cisplatin infusion length to protect hearing (strong, low), except that sodium thiosulfate needs cisplatin infusions of 6 hours or less.\n\nThe US label for PEDMARK limits it to children aged 1 month or older with localised, non-metastatic solid tumours, gives it over 15 minutes starting 6 hours after each cisplatin infusion and at least 10 hours before the next, doses by weight-based surface area, and says not to start it with a serum sodium above 145 mmol/L. The IGHG recommends hearing surveillance from the end of treatment at the latest: yearly under 6 years, every other year from 6 to 12, and every 5 years over 12, with pure-tone audiometry at 1000 to 8000 Hz from age 6 and a referral for any loss of more than 15 dB.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Children and adolescents aged 0 to 18 receiving cisplatin for cancer (the guideline notes it may also apply to older adolescents and young adults); the drug label excludes babies under 1 month and children with metastatic cancer. Surveillance recommendations cover childhood, adolescent and young adult survivors treated with cisplatin or with head or brain radiotherapy of 30 Gy or more. Adults are not covered.",
  trigger: "A child or adolescent is due to start a cisplatin-containing regimen.",
  steps: [
    {
      action: "Plan hearing tests during treatment for every child receiving cisplatin",
      why: "Hearing loss from cisplatin often starts in the high pitches a child does not notice, so it has to be measured.",
      source: "ighg-2019",
      quote: "Surveillance is usually mandatory for at-risk patients during treatment.",
    },
    {
      action: "In non-metastatic hepatoblastoma, give sodium thiosulfate with each cisplatin dose",
      why: "In the SIOPEL 6 trial hearing loss fell from 63% to 33% of children, and survival was not reduced.",
      source: "freyer-2020",
      quote: "Use sodium thiosulfate for the prevention of cisplatin-induced ototoxicity in children and adolescents with non-metastatic hepatoblastoma",
      grade: "Strong, high quality",
    },
    {
      action: "In other non-metastatic cancers, consider sodium thiosulfate and discuss it with the family",
      why: "Hearing protection should not depend on the type of cancer, but the survival evidence outside hepatoblastoma is less certain.",
      source: "freyer-2020",
      quote: "Consider sodium thiosulfate for the prevention of cisplatin-induced ototoxicity in children and adolescents with non-metastatic cancers other than hepatoblastoma",
      grade: "Weak, low quality",
    },
    {
      action: "In metastatic cancers, do not give sodium thiosulfate routinely, but discuss it as an option",
      why: "In one trial, children with metastatic disease who had it survived less often; that finding may be due to chance or bias, so the family's values matter.",
      source: "freyer-2020",
      quote: "We suggest sodium thiosulfate not be used routinely for the prevention of cisplatin-induced ototoxicity for children and adolescents with metastatic cancers",
      grade: "Weak, low quality",
    },
    {
      action: "Do not give sodium thiosulfate to a baby under 1 month old",
      why: "Babies this young control their blood sodium less well, and the drug raises the risk of sodium going too high.",
      source: "pedmark-label",
      quote: "PEDMARK is not indicated and not recommended for use in pediatric patients younger than 1 month of age.",
    },
    {
      action: "Where sodium thiosulfate is planned, keep each cisplatin infusion to 6 hours or less",
      why: "Both trials used cisplatin infusions of 6 hours or less; after a longer infusion the damage may already be done.",
      source: "freyer-2020",
      quote: "However, if sodium thiosulfate is to be introduced as an otoprotectant, then the cisplatin infusion will need to be 6 h or less, as was required in the SIOPEL 6 and ACCL0431 trials.",
    },
    {
      action: "Check sodium and potassium first, and do not start sodium thiosulfate if the sodium is above 145 mmol/L",
      why: "The drug can push sodium too high and potassium too low.",
      source: "pedmark-label",
      quote: "Do not initiate PEDMARK infusions in patients with baseline serum sodium greater than 145 mmol/L",
    },
    {
      action: "Give sodium thiosulfate over 15 minutes, starting 6 hours after each cisplatin infusion ends",
      why: "This is the timing both trials used and the label sets; the guideline says that if sodium thiosulfate is used it should be given the same way.",
      source: "pedmark-label",
      quote: "Administer PEDMARK as an intravenous infusion over 15 minutes starting 6 hours after completion of cisplatin infusion.",
    },
    {
      action: "On multi-day cisplatin, give it at least 10 hours before the next cisplatin dose, and skip it if that gap cannot be kept",
      why: "The gap stops the protector being in the blood when the next dose of cisplatin is given.",
      source: "pedmark-label",
      quote: "Do not administer PEDMARK if the next cisplatin infusion is scheduled to begin in less than 10 hours",
    },
    {
      action: "Do not use amifostine to protect hearing",
      why: "Five trials, two of them in children, showed no benefit, and it causes low calcium, sickness and low blood pressure.",
      source: "freyer-2020",
      quote: "Do not use amifostine for the prevention of cisplatin-induced ototoxicity in children and adolescents with cancer",
      grade: "Strong, high quality",
    },
    {
      action: "Do not use sodium diethyldithiocarbamate or intratympanic (ear-drum) injections to protect hearing",
      why: "Neither showed a benefit that mattered, both have harms or practical problems, and the ear injections are hard to repeat in children.",
      source: "freyer-2020",
      quote: "Do not use intratympanic middle ear therapy for the prevention of cisplatin-induced ototoxicity in children and adolescents with cancer",
      grade: "Strong, low quality",
    },
    {
      action: "Do not lengthen or shorten the cisplatin infusion just to protect hearing",
      why: "The two trials that tested infusion length did not show it changes hearing loss.",
      source: "freyer-2020",
      quote: "Do not alter cisplatin infusion duration, as a means in itself, to reduce ototoxicity in children and adolescents with cancer",
      grade: "Strong, low quality",
    },
    {
      action: "After treatment, test hearing from the end of treatment at the latest: yearly under 6, every other year from 6 to 12, every 5 years over 12",
      why: "Hearing loss can appear or worsen years later, and young children are still learning to speak.",
      source: "ighg-2019",
      quote: "consensus among the guideline panel was that surveillance in survivors should start no later than the end of treatment and should be done annually for children younger than 6 years of age, every other year for children 6–12 years of age, and every 5 years for adolescents and young adults older than 12 years",
      grade: "strong (level A and B evidence for cisplatin)",
    },
    {
      action: "Use pure-tone audiometry at 1000 to 8000 Hz from age 6; under 6, refer to an audiologist for an age-appropriate assessment",
      why: "Pure-tone tests are the standard measure once a child can do them; younger children need a specialist's methods.",
      source: "ighg-2019",
      quote: "The guideline panel recommends that pure-tone audiometry at 1000–8000 Hz is the gold standard for routine surveillance of CAYA cancer survivors aged 6 years or older to avoid over-testing",
      grade: "strong recommendations",
    },
    {
      action: "Refer any child with symptoms of hearing loss or tinnitus, or a loss of more than 15 dB, to an audiologist or ear, nose and throat service",
      why: "Hearing aids, remote microphones and support at school reduce the effect on speech and learning.",
      source: "ighg-2019",
      quote: "The guideline panel strongly recommends (based on expert opinion) that referral to an audiologist, auditory clinic, or ear, nose, and throat physician as appropriate for any survivor who has symptoms suggesting hearing loss, atypical audiological test results showing a loss of more than 15 dB at 1000–8000 Hz, or both.",
      grade: "strong (expert opinion)",
    },
  ],
  bestInClass: {
    statement: "The 2020 international guideline (Freyer et al.), endorsed by the Children's Oncology Group, is the only guideline on preventing cisplatin hearing loss in children and has not been replaced: sodium thiosulfate for non-metastatic hepatoblastoma (strong), considered for other non-metastatic cancers (weak), not routinely in metastatic cancers (weak), and no amifostine, sodium diethyldithiocarbamate, intratympanic therapy or change of infusion length. The US label for PEDMARK sets the practical limits the guideline leaves open: age 1 month or older, localised non-metastatic solid tumours, cisplatin infusions of 1 to 6 hours, a 15-minute infusion 6 hours after cisplatin and at least 10 hours before the next dose. The two trials used different doses (20 g/m2 in SIOPEL 6, 16 g/m2 in ACCL0431); the guideline accepts either, and the label doses by weight band. Surveillance follows the IGHG and PanCare recommendations, which say the use of an otoprotectant does not change the surveillance schedule.",
    sources: ["freyer-2020", "cog-ototox-2020", "pedmark-label", "ighg-2019"],
  },
  variants: [
    {
      name: "Sodium thiosulfate offered in metastatic disease after discussion",
      differs: "Some families and teams choose sodium thiosulfate for a child with metastatic cancer, for example where the child is blind and hearing is the main sense, after the survival uncertainty is explained.",
      evidence: "The guideline's weak recommendation against routine use was made weak at the patient representatives' request so that it could be discussed; the panel names a child with blindness as a case where benefit probably outweighs risk. The US label does not cover metastatic cancer.",
      sources: ["freyer-2020", "pedmark-label"],
    },
  ],
  grades: [
    { claim: "Sodium thiosulfate in non-metastatic hepatoblastoma", grade: "Strong, high quality", source: "freyer-2020" },
    { claim: "Sodium thiosulfate considered in other non-metastatic cancers", grade: "Weak, low quality", source: "freyer-2020" },
    { claim: "Sodium thiosulfate not routinely in metastatic cancers", grade: "Weak, low quality", source: "freyer-2020" },
    { claim: "No amifostine", grade: "Strong, high quality", source: "freyer-2020" },
    { claim: "No sodium diethyldithiocarbamate", grade: "Strong, low quality", source: "freyer-2020", quote: "Do not use sodium diethyldithiocarbamate for the prevention of cisplatin-induced ototoxicity in children and adolescents with cancer" },
    { claim: "No intratympanic therapy", grade: "Strong, low quality", source: "freyer-2020" },
    { claim: "Do not alter cisplatin infusion duration to protect hearing", grade: "Strong, low quality", source: "freyer-2020" },
    { claim: "Hearing surveillance after cisplatin, from the end of treatment", grade: "strong (level A and B evidence)", source: "ighg-2019" },
  ],
  sources: [
    { key: "freyer-2020", label: "Prevention of cisplatin-induced ototoxicity in children and adolescents with cancer: a clinical practice guideline", publisher: "International panel (Pediatric Oncology Group of Ontario), The Lancet Child & Adolescent Health", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7521149/", doi: "10.1016/S2352-4642(19)30336-0", gradingScheme: "GRADE: recommendation strong or weak, evidence high, moderate, low or very low quality, printed in the guideline's summary table.", read: "full-text", accessed: "2026-11-11" },
    { key: "cog-ototox-2020", label: "Prevention of Cisplatin-induced Ototoxicity in Children and Adolescents with Cancer (COG endorsement, version date 27 August 2020)", publisher: "Children's Oncology Group", year: 2020, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Cisplatin_Ototox_Guideline_Document_27AUG2020-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality for each recommendation.", read: "full-text", accessed: "2026-11-11" },
    { key: "ighg-2019", label: "Recommendations for ototoxicity surveillance for childhood, adolescent, and young adult cancer survivors: a report from the International Late Effects of Childhood Cancer Guideline Harmonization Group in collaboration with the PanCare Consortium", publisher: "IGHG and PanCare, The Lancet Oncology", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7549756/", doi: "10.1016/S1470-2045(18)30858-1", gradingScheme: "Evidence levels A (high) to C (low) by Cochrane Childhood Cancer and IGHG criteria, with recommendations strong or weak, or expert opinion where no evidence exists.", read: "full-text", accessed: "2026-11-11" },
    { key: "pedmark-label", label: "PEDMARK (sodium thiosulfate injection) prescribing information, SPL version 7", publisher: "Fennec Pharmaceuticals, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f98c7076-2a7b-4fd7-ab90-eed5e9137bae", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The European label for sodium thiosulfate (Pedmarqsi) was not read; its age limits and dosing may differ from the US label quoted here.",
    "The guideline does not set a baseline or during-treatment hearing test schedule; the IGHG schedule quoted is for survivors after treatment, and timing of tests during treatment follows local protocols.",
    "Whether sodium thiosulfate is safe in children with metastatic cancer is not settled; the only data are a post-hoc subgroup of one trial, and the panel asks for more research.",
    "The best dose of sodium thiosulfate is not known; the two trials used 20 g/m2 and 16 g/m2.",
    "No guideline read here says how to protect hearing in a child who already has hearing loss and needs more cisplatin.",
    "The guideline was written for high-income countries and set a 5-year review; no update had been published by November 2026.",
  ],
  drugs: ["sodium-thiosulfate", "cisplatin", "amifostine"],
  cancers: ["childhood-cancers", "hepatoblastoma", "medulloblastoma", "osteosarcoma", "neuroblastoma", "paediatric-germ-cell-tumours"],
  technologies: ["hearing-after-platinum-chemotherapy", "rejuv-paed-hearing"],
  companies: ["childrens-oncology-group"],
  related: ["idea-moon-hearing-protection-cisplatin"],
  terms: ["late-effects"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "ototoxicity"],
});
