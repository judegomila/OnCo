import { protocol } from "./helpers";

/*
 * Protecting hearing in children and adolescents receiving cisplatin: sodium thiosulfate, what not to use, and
 * hearing surveillance.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl into a scratch directory and read as text, and every claim was checked against it.
 * - Freyer et al., Prevention of cisplatin-induced ototoxicity in children and adolescents with cancer: a clinical
 *   practice guideline (Lancet Child Adolesc Health 2020), full text of the author manuscript (PMC7521149) as XML
 *   from the NCBI E-utilities API; the Europe PMC full-text endpoint returned HTTP 500 that day. Europe PMC title
 *   searches for a later cisplatin ototoxicity guideline (2019 to 2026) found none.
 * - Children's Oncology Group endorsement document for that guideline (version date 27 August 2020), public PDF from
 *   the COG site (pdftotext, full text).
 * - Clemens et al., IGHG and PanCare recommendations for ototoxicity surveillance (Lancet Oncol 2019), full text of
 *   the author manuscript (PMC7549756) as XML from the NCBI E-utilities API.
 * - US prescribing information for PEDMARK, DailyMed SPL version 7, published 17 November 2025 and still the latest
 *   version in the DailyMed history on 17 November 2026 (XML, full text).
 * - European summary of product characteristics for Pedmarqsi, the EPAR product information PDF from the European
 *   Medicines Agency, shown there as last updated 1 July 2025 (pdftotext, full text). Read for the first time in
 *   this pass: it prints the dose as the anhydrous salt and a 6-hour, not 10-hour, gap before the next cisplatin.
 * - NICE technology appraisal TA1034, published 22 January 2025 (HTML, recommendation and product sections).
 * Both DOIs were resolved through Crossref and their titles checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed, and were checked by script. Doses are written in prose as g/m² because the
 * superscript does not survive in the raw text; no quote contains a dose.
 * Doses independently re-read on 17 November 2026 against the PEDMARK label fetched again from DailyMed (SPL
 * version 7) and the Pedmarqsi product information PDF saved that day from the European Medicines Agency; the
 * pentahydrate and anhydrous vial strengths were added from the two labels.
 */
export const paediatricCisplatinHearingProtection = protocol({
  id: "paediatric-cisplatin-hearing-protection",
  name: "Hearing protection for children receiving cisplatin",
  aka: ["cisplatin ototoxicity prevention in children", "sodium thiosulfate otoprotection", "Pedmark", "Pedmarqsi", "cisplatin hearing loss children", "ototoxicity surveillance"],
  domain: "paediatric",
  tldr: "Cisplatin can permanently damage a child's hearing. For many children whose cancer has not spread, a drug called sodium thiosulfate, given as a short drip six hours after each dose of cisplatin, roughly halves the chance of hearing loss. Hearing is tested during treatment and for years after, and any loss is referred to a hearing specialist.",
  simple: "One cancer medicine, cisplatin, can hurt hearing. Another medicine, given six hours later, can protect it for many children. Their hearing is checked during and after treatment.",
  summary: "The international guideline (Freyer et al., 2020, GRADE, endorsed by the Children's Oncology Group in August 2020) covers children and adolescents aged 0 to 18 receiving cisplatin. Sodium thiosulfate: use it in non-metastatic hepatoblastoma (strong, high quality, from SIOPEL 6, where any hearing loss was found in 18 of 55 children (33%) with it against 29 of 46 (63%) without, and 3-year overall survival was 98% against 92%); consider it in other non-metastatic cancers (weak, low); and do not use it routinely in metastatic cancers (weak, low), because among the 47 children in ACCL0431 classed after the trial as having metastatic disease, 3-year overall survival was 45% with it against 84% without (p=0.009), an estimate the panel judged open to bias and asked to be discussed with families. In ACCL0431 as a whole, hearing loss was found in 14 of 49 children tested (29%) with it against 31 of 55 (56%) without. Do not use amifostine (strong, high), sodium diethyldithiocarbamate (strong, low) or intratympanic therapy (strong, low), and do not change the cisplatin infusion length to protect hearing (strong, low), except that sodium thiosulfate needs cisplatin infusions of 6 hours or less.\n\nTwo licensed products set the practical limits. The US label for PEDMARK (age 1 month and older) and the European label for Pedmarqsi (1 month to under 18 years) both cover localised, non-metastatic solid tumours only, and both give a 15-minute infusion starting 6 hours after the end of a cisplatin infusion that lasted no more than 6 hours, in three weight bands. The US label prints 10 g/m² under 5 kg, 15 g/m² from 5 to 10 kg and 20 g/m² above 10 kg; the European label prints 6.4, 9.6 and 12.8 g/m² for the same bands, counted as the anhydrous salt. Each label gives a sodium load of 162 mmol/m² for its top dose, and both vials hold 8 g of the anhydrous salt in 100 mL: the US label calls this the equivalent of 12.5 g of sodium thiosulfate pentahydrate (125 mg/mL), and the European label 80 mg/mL. The labels differ on the gap before the next cisplatin: at least 10 hours in the US, at least 6 hours in Europe. Both say not to give it when serum sodium is above 145 mmol/L. The US label reports high sodium in 12% to 26% of children in the trials, low potassium in 15% to 27% and allergic reactions in 8% to 13%. Counting children with no hearing test as having hearing loss, the US label reports loss in 24 of 61 (39%) against 36 of 53 (68%) in SIOPEL 6, and in 17 of 39 (44%) against 22 of 38 (58%) among children with localised disease in ACCL0431 (relative risk 0.75, 95% confidence interval 0.48 to 1.18). NICE recommended Pedmarqsi within its licence in January 2025 (TA1034).\n\nThe IGHG recommends hearing surveillance from the end of treatment at the latest: yearly under 6 years, every other year from 6 to 12, and every 5 years over 12, with pure-tone audiometry at 1000 to 8000 Hz from age 6 and a referral for any loss of more than 15 dB.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Children and adolescents aged 0 to 18 receiving cisplatin for cancer (the guideline notes it may also apply to older adolescents and young adults). The US and European labels for sodium thiosulfate cover only localised, non-metastatic solid tumours from 1 month of age; the European label stops at under 18 years and makes age under 1 month a contraindication. Surveillance recommendations cover childhood, adolescent and young adult survivors treated with cisplatin or with head or brain radiotherapy of 30 Gy or more. Adults are not covered.",
  trigger: "A child or adolescent is due to start a cisplatin-containing regimen.",
  steps: [
    {
      action: "Test hearing during treatment, on the schedule the child's treatment protocol sets",
      why: "The surveillance guideline says testing during treatment is usually required for children at risk, but it does not set the schedule. Hearing loss from treatment typically affects high-pitched sounds, often with ringing in the ears.",
      source: "ighg-2019",
      quote: "Surveillance is usually mandatory for at-risk patients during treatment.",
    },
    {
      action: "In non-metastatic hepatoblastoma, give sodium thiosulfate with each cisplatin dose",
      why: "In the SIOPEL 6 trial hearing loss was found in 33% of children who had it against 63% of those who did not, and survival was not reduced.",
      source: "freyer-2020",
      quote: "Use sodium thiosulfate for the prevention of cisplatin-induced ototoxicity in children and adolescents with non-metastatic hepatoblastoma",
      grade: "Strong, high quality",
    },
    {
      action: "In other non-metastatic cancers, consider sodium thiosulfate and discuss it with the family",
      why: "The panel expected hearing protection to be the same whatever the type of cancer, but the survival evidence outside hepatoblastoma is less certain.",
      source: "freyer-2020",
      quote: "Consider sodium thiosulfate for the prevention of cisplatin-induced ototoxicity in children and adolescents with non-metastatic cancers other than hepatoblastoma",
      grade: "Weak, low quality",
    },
    {
      action: "In metastatic cancers, do not give sodium thiosulfate routinely, but discuss it as an option",
      why: "In one trial, children with metastatic disease who had it survived less often; the panel judged that finding open to bias, so the family's values matter.",
      source: "freyer-2020",
      quote: "We suggest sodium thiosulfate not be used routinely for the prevention of cisplatin-induced ototoxicity for children and adolescents with metastatic cancers",
      grade: "Weak, low quality",
    },
    {
      action: "Do not give sodium thiosulfate to a baby under 1 month old",
      why: "Babies this young control their blood sodium less well, and the drug raises the risk of sodium going too high. The US label says it is not recommended at this age; the European label makes it a contraindication.",
      source: "pedmark-label",
      quote: "PEDMARK is not indicated and not recommended for use in pediatric patients younger than 1 month of age.",
    },
    {
      action: "Where sodium thiosulfate is planned, keep each cisplatin infusion to 6 hours or less",
      why: "Both trials required cisplatin infusions of 6 hours or less. The US label adds that after a longer infusion the damage to hearing may already have happened.",
      source: "freyer-2020",
      quote: "However, if sodium thiosulfate is to be introduced as an otoprotectant, then the cisplatin infusion will need to be 6 h or less, as was required in the SIOPEL 6 and ACCL0431 trials.",
    },
    {
      action: "Check sodium and potassium first, and do not give sodium thiosulfate if the sodium is above 145 mmol/L",
      why: "The drug carries a large load of sodium, and in the trials it raised sodium and lowered potassium in some children. The European label also asks for magnesium, phosphate and blood pressure to be monitored.",
      source: "pedmark-label",
      quote: "Do not initiate PEDMARK infusions in patients with baseline serum sodium greater than 145 mmol/L",
    },
    {
      action: "Give antiemetics before each sodium thiosulfate infusion, and watch for an allergic reaction",
      why: "In SIOPEL 6, vomiting was reported in 85% of children who had it against 54% on cisplatin alone, and allergic reactions were reported in 8% to 13% of children in the trials.",
      source: "pedmark-label",
      quote: "Administer antiemetics prior to each PEDMARK administration",
    },
    {
      action: "Dose sodium thiosulfate by the child's weight band and body surface area, using the label of the product in hand",
      why: "The US label prints 10 g/m² under 5 kg, 15 g/m² from 5 to 10 kg and 20 g/m² above 10 kg. The European label prints 6.4, 9.6 and 12.8 g/m² for the same weight bands because it counts the anhydrous salt, while the US label gives its vial strength as the equivalent weight of the pentahydrate, so the two sets of figures must not be mixed. The US label also says PEDMARK is not substitutable with other sodium thiosulfate products.",
      source: "pedmark-label",
      quote: "The recommended dose of PEDMARK is based on surface area according to actual body weight",
    },
    {
      action: "Give sodium thiosulfate over 15 minutes, starting 6 hours after each cisplatin infusion ends",
      why: "This is the timing both trials used and both labels set; the guideline says that if sodium thiosulfate is used it should be given the same way.",
      source: "pedmark-label",
      quote: "Administer PEDMARK as an intravenous infusion over 15 minutes starting 6 hours after completion of cisplatin infusion.",
    },
    {
      action: "On multi-day cisplatin, keep the label's gap before the next cisplatin dose (at least 10 hours on the US label, at least 6 hours on the European label), and skip sodium thiosulfate if that gap cannot be kept",
      why: "The timing is set to limit any interference with cisplatin's effect on the cancer. The two labels print different gaps; the ACCL0431 trial required at least 10 hours.",
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
      why: "Sodium diethyldithiocarbamate did not reduce hearing loss and has side effects of its own. The ear injections gave inconsistent results and are hard to repeat in children.",
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
      why: "Hearing loss that starts late is well recognised, and young children are still learning to speak.",
      source: "ighg-2019",
      quote: "consensus among the guideline panel was that surveillance in survivors should start no later than the end of treatment and should be done annually for children younger than 6 years of age, every other year for children 6–12 years of age, and every 5 years for adolescents and young adults older than 12 years",
      grade: "strong (level A and B evidence for cisplatin)",
    },
    {
      action: "Use pure-tone audiometry at 1000 to 8000 Hz from age 6; under 6, refer to an audiologist for an age-appropriate assessment",
      why: "Pure-tone tests are the standard for routine checks once a child can do them; younger children need a specialist's methods. Testing above 8000 Hz is recommended as well where the equipment is available.",
      source: "ighg-2019",
      quote: "The guideline panel recommends that pure-tone audiometry at 1000–8000 Hz is the gold standard for routine surveillance of CAYA cancer survivors aged 6 years or older to avoid over-testing",
      grade: "strong recommendations",
    },
    {
      action: "Refer any child with symptoms of hearing loss or tinnitus, or a loss of more than 15 dB, to an audiologist or ear, nose and throat service",
      why: "The panel endorses hearing aids, remote microphone technology and support at school for survivors with hearing loss, to limit the effect on speech and learning.",
      source: "ighg-2019",
      quote: "The guideline panel strongly recommends (based on expert opinion) that referral to an audiologist, auditory clinic, or ear, nose, and throat physician as appropriate for any survivor who has symptoms suggesting hearing loss, atypical audiological test results showing a loss of more than 15 dB at 1000–8000 Hz, or both.",
      grade: "strong (expert opinion)",
    },
  ],
  bestInClass: {
    statement: "The 2020 international guideline (Freyer et al.), endorsed by the Children's Oncology Group, has not been replaced; a Europe PMC search on 17 November 2026 found no later edition. It recommends sodium thiosulfate for non-metastatic hepatoblastoma (strong), considers it for other non-metastatic cancers (weak), suggests it not be used routinely in metastatic cancers (weak), and recommends against amifostine, sodium diethyldithiocarbamate, intratympanic therapy and changing the infusion length. The product labels set the practical limits the guideline leaves open: age 1 month or older, localised non-metastatic solid tumours, cisplatin infusions of no more than 6 hours, and a 15-minute infusion 6 hours after cisplatin. The US label (PEDMARK) asks for at least 10 hours before the next cisplatin and the European label (Pedmarqsi) at least 6 hours. The guideline describes the trial doses as 20 g/m² in SIOPEL 6 and 16 g/m² in ACCL0431 and accepts either; the labels dose by weight band, and the European label prints its figures as the anhydrous salt (12.8 g/m² at most, and 10.2 g/m² for ACCL0431). NICE recommended Pedmarqsi within its licence in January 2025. Surveillance follows the IGHG and PanCare recommendations, which say the use of an otoprotectant does not change the surveillance schedule.",
    sources: ["freyer-2020", "cog-ototox-2020", "pedmark-label", "pedmarqsi-smpc", "nice-ta1034", "ighg-2019"],
  },
  variants: [
    {
      name: "Sodium thiosulfate offered in metastatic disease after discussion",
      differs: "Some families and teams choose sodium thiosulfate for a child with metastatic cancer, for example where the child is blind and hearing is the main sense, after the survival uncertainty is explained.",
      evidence: "The guideline's recommendation against routine use was weak rather than strong under the influence of the patient representatives on the panel, who wanted it to be discussed with families; the panel names a child with blindness as a case where benefit probably outweighs risk. Neither the US nor the European label covers metastatic cancer.",
      sources: ["freyer-2020", "pedmark-label", "pedmarqsi-smpc"],
    },
    {
      name: "European label (Pedmarqsi) in place of the US label (PEDMARK)",
      differs: "The European label prints the dose as the anhydrous salt (6.4 g/m² under 5 kg, 9.6 g/m² from 5 to 10 kg, 12.8 g/m² above 10 kg, with the volume in mL/m² beside each). It asks for a gap of at least 6 hours after sodium thiosulfate before the next cisplatin, where the US label asks for 10. It makes age under 1 month a contraindication, where the US label says not indicated and not recommended. It also recommends a central vein, and intravenous antiemetics 30 minutes before the infusion.",
      evidence: "Both labels rest on SIOPEL 6 and ACCL0431. The European label reports hearing loss in 20 of 57 children (35.1%) with sodium thiosulfate against 35 of 52 (67.3%) without in SIOPEL 6, and in 14 of 49 (28.6%) against 31 of 55 (56.4%) in ACCL0431. NICE recommends Pedmarqsi within its marketing authorisation for people aged 1 month to 17 years with localised, non-metastatic solid tumours, under a commercial arrangement.",
      sources: ["pedmarqsi-smpc", "pedmark-label", "nice-ta1034"],
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
    { claim: "Sodium thiosulfate (Pedmarqsi) for localised, non-metastatic solid tumours, age 1 month to 17 years", grade: "Recommended (NICE does not grade)", source: "nice-ta1034", quote: "Anhydrous sodium thiosulfate is recommended, within its marketing authorisation, for preventing hearing loss caused by cisplatin chemotherapy in people 1 month to 17 years with localised, non-metastatic solid tumours." },
    { claim: "Gap before the next cisplatin on the European label", grade: "Not graded (product label)", source: "pedmarqsi-smpc", quote: "When cisplatin is administered on consecutive days, ensure a minimum 6-hour gap after sodium thiosulfate infusion before a subsequent cisplatin infusion is given." },
  ],
  sources: [
    { key: "freyer-2020", label: "Prevention of cisplatin-induced ototoxicity in children and adolescents with cancer: a clinical practice guideline", publisher: "International panel (Pediatric Oncology Group of Ontario), The Lancet Child & Adolescent Health", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7521149/", doi: "10.1016/S2352-4642(19)30336-0", gradingScheme: "GRADE: recommendation strong or weak, evidence high, moderate, low or very low quality, printed in the guideline's summary table.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-ototox-2020", label: "Prevention of Cisplatin-induced Ototoxicity in Children and Adolescents with Cancer (COG endorsement, version date 27 August 2020)", publisher: "Children's Oncology Group", year: 2020, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Cisplatin_Ototox_Guideline_Document_27AUG2020-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality for each recommendation.", read: "full-text", accessed: "2026-11-17" },
    { key: "ighg-2019", label: "Recommendations for ototoxicity surveillance for childhood, adolescent, and young adult cancer survivors: a report from the International Late Effects of Childhood Cancer Guideline Harmonization Group in collaboration with the PanCare Consortium", publisher: "IGHG and PanCare, The Lancet Oncology", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7549756/", doi: "10.1016/S1470-2045(18)30858-1", gradingScheme: "Evidence levels A (high) to C (low) by Cochrane Childhood Cancer and IGHG criteria, with recommendations strong or weak, or expert opinion where no evidence exists.", read: "full-text", accessed: "2026-11-17" },
    { key: "pedmark-label", label: "PEDMARK (sodium thiosulfate injection) prescribing information, SPL version 7", publisher: "Fennec Pharmaceuticals, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f98c7076-2a7b-4fd7-ab90-eed5e9137bae", read: "full-text", accessed: "2026-11-17" },
    { key: "pedmarqsi-smpc", label: "Pedmarqsi (sodium thiosulfate) summary of product characteristics, EPAR product information", publisher: "Norgine, via the European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/pedmarqsi-epar-product-information_en.pdf", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ta1034", label: "Anhydrous sodium thiosulfate for preventing hearing loss caused by cisplatin chemotherapy in people 1 month to 17 years with localised solid tumours (TA1034)", publisher: "National Institute for Health and Care Excellence", year: 2025, url: "https://www.nice.org.uk/guidance/ta1034", gradingScheme: "NICE does not grade recommendations; a technology appraisal says whether a medicine is recommended.", read: "public-summary", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The US and European labels print different figures for the same weight bands (10, 15 and 20 g/m² against 6.4, 9.6 and 12.8 g/m²), because the European label counts the anhydrous salt. Neither label prints a conversion between the two sets of doses. The US label does say that its 100 mL vial holds the equivalent of 12.5 g of sodium thiosulfate pentahydrate, provided as 8 g of the anhydrous salt, and each label gives the same sodium load for its top dose.",
    "The two labels disagree on the gap before the next cisplatin dose (at least 10 hours in the US, at least 6 hours in Europe), and no source read explains the difference.",
    "The guideline does not set a baseline or during-treatment hearing test schedule; the IGHG schedule quoted is for survivors after treatment, and timing of tests during treatment follows local protocols.",
    "No source read recommends one scale for grading hearing loss. SIOPEL 6 used the Brock scale and ACCL0431 the American Speech-Language-Hearing Association criteria, and the IGHG says choosing a uniform scale was outside its scope. The SIOP Boston scale is cited by both guidelines but neither sets it as the standard.",
    "Whether sodium thiosulfate is safe in children with metastatic cancer is not settled; the only data are a post-hoc subgroup of one trial, and the panel asks for more research.",
    "The best dose of sodium thiosulfate is not known; the guideline lists finding it as a research need.",
    "No guideline read here says how to protect hearing in a child who already has hearing loss and needs more cisplatin.",
    "The guideline was written for high-income countries and planned an update in 5 years or sooner; on 17 November 2026 a Europe PMC search found no update.",
    "The European label's own date of revision is blank in the published PDF; the European Medicines Agency page shows the product information as last updated on 1 July 2025. Of the NICE appraisal, only the recommendation and product sections were read on 17 November 2026, not the committee discussion.",
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
