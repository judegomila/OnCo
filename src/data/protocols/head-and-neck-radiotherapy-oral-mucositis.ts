import { protocol } from "./helpers";

/*
 * Mouth care and the prevention and treatment of oral mucositis during radiotherapy (with or without chemotherapy)
 * for head and neck cancer.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw
 * text and each claim checked against it.
 * - MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (Elad et al.,
 *   Cancer 2020; 2019 update): full text, Europe PMC full-text XML (PMC7540329), a copy a sibling checker fetched on
 *   17 November 2026 and re-used here. Table 1 was read row by row so that each level of evidence is matched to its
 *   own statement, and Table 2 (the photobiomodulation settings) is text, not an image.
 * - Its 2021 erratum (Cancer, PMC8565669): the sibling's copy of the PubMed Central page, fetched on 17 November
 *   2026. The first pass could not retrieve it. It corrects one unit: the glutamine dose in the two supporting
 *   trials is 10 to 30 g daily, not mg.
 * - Guidance on mucositis assessment from the MASCC Mucositis Study Group and ISOO, an international Delphi study
 *   (Abdalla-Aslan et al., eClinicalMedicine 2024): full text, Europe PMC full-text XML (PMC11200283), fetched on
 *   17 November 2026. The head and neck recommendations are table cells (Table 1, clinical practice); the quotes are
 *   the cell text.
 * - MASCC/ISOO paediatric sub-analysis (Supportive Care in Cancer 2021): abstract, from the Europe PMC record.
 * - US National Cancer Institute patient page on mouth and throat problems (reviewed 24 September 2021): the
 *   sibling's copy of the page, fetched on 17 November 2026. Added in this pass for the advice on when to call.
 * - The 2014 MASCC/ISOO statements that the 2020 update carried over for lack of new evidence (the text names those
 *   against antimicrobial lozenges and pastes, pilocarpine and pentoxifylline) are in
 *   the 2020 paper's Supporting Table 1; the supplement file answered 403 to the sibling on 17 November 2026 and
 *   was not read; no step rests on it.
 * - Europe PMC was searched on 17 November 2026 for mucositis guidelines and consensus papers from 2022 to 2026: no
 *   newer MASCC/ISOO edition. ESMO's 2015 guideline exists and could not be read.
 *
 * What the pass changed: reasons the sources do not give were removed or reworded (dental work being safer before
 * irradiation, onset in the second or third week, red light, trials of benzydamine, zinc still given in some
 * centres); orders were softened where the guideline suggests; the sucralfate statement now carries its scope; the
 * glutamine trial dose is given from the erratum; the first pass said the doxepin rinse was carried over unchanged,
 * when the 2020 update changed doxepin mouthwash to no guideline possible; the patient advice on when to call now has a source.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed; the source uses the Unicode hyphen (‐) in "RT‐CT" and "self‐management", and it is kept.
 */
export const headAndNeckRadiotherapyOralMucositis = protocol({
  id: "head-and-neck-radiotherapy-oral-mucositis",
  name: "Mouth care and oral mucositis prevention during head and neck radiotherapy",
  aka: ["oral mucositis during radiotherapy", "radiation mucositis", "sore mouth during head and neck radiotherapy", "mouth care during radiotherapy", "photobiomodulation for mucositis", "benzydamine mouthwash", "Difflam during radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy to the head and neck commonly makes the lining of the mouth and throat sore. A regular mouth-cleaning routine is suggested to help prevent this; a benzydamine mouthwash and a low-level light treatment inside the mouth are recommended in some settings. Pain relief, help with eating and preventing infection are key parts of care.",
  simple: "Radiotherapy to the mouth or throat often makes the mouth sore. Keep to the mouth-cleaning routine and the rinses your team gives you. Call your doctor or nurse if pain in your mouth, lips or throat makes it hard to eat, drink or sleep, or if you have a fever of 38 °C or higher.",
  summary: "The MASCC/ISOO 2020 guideline (the latest full edition found) is the reference. For head and neck radiotherapy it suggests a multiagent combination oral care protocol (level III), recommends benzydamine mouthwash for moderate-dose radiotherapy, printed as below 50 Gy (level I), and suggests it with chemoradiotherapy (level II). It recommends intraoral photobiomodulation with low-level laser for adults having radiotherapy alone (level II) or chemoradiotherapy (level I), following the settings of one of the protocols in its Table 2; because evidence from animal models on tumour behaviour conflicts, it advises telling patients the expected benefits and potential risks. It suggests against chlorhexidine for prevention (level III), does not recommend sucralfate, combined topical and systemic, for preventing or treating mucositis pain with radiotherapy (level II), suggests honey (level II) and, with caution, oral glutamine with chemoradiotherapy (level II), and suggests topical morphine 0.2% mouthwash for pain with chemoradiotherapy (level III). No guideline was possible on professional oral care, patient education or saline and bicarbonate rinses; the panel adds its expert opinion that dental evaluation and treatment before therapy are desirable, that education is still appropriate, and that bland rinses may help hygiene and comfort. The MASCC/ISOO Delphi (2024) adds how to assess adults in practice: the WHO scale by the clinician, weekly or more in high-grade mucositis, with a patient-reported measure (OMWQ and OMDQ, or PRO-CTCAE questions). Where no intervention is recommended, the guideline names pain relief, dietary support and secondary infection prevention as the key elements of management. A US National Cancer Institute patient page says when to call the team.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "radiographer", "patient-or-carer", "multidisciplinary-team"],
    where: ["radiotherapy-department", "outpatient-clinic", "home"],
  },
  population: "Adults having radiotherapy, with or without concurrent chemotherapy, to the head and neck. The MASCC/ISOO statements are scoped by treatment (radiotherapy alone, chemoradiotherapy) and by dose for benzydamine (below 50 Gy for the level I recommendation); the photobiomodulation recommendations and the Delphi assessment statements are for adults. Children are not covered: a MASCC/ISOO paediatric sub-analysis (2021, abstract read) found limited or conflicting evidence for every intervention except chewing gum, which was ineffective for prevention, said that data from adult studies may need to be extrapolated, and advised a basic oral care protocol. Mucositis from chemotherapy alone or from stem cell transplant conditioning follows other statements in the same guideline and is not covered here.",
  trigger: "Radiotherapy to the head and neck is planned; the protocol starts before the first fraction and runs through the course of treatment.",
  steps: [
    {
      action: "Arrange a dental assessment, and any treatment needed, before radiotherapy starts",
      why: "The panel could make no guideline on professional oral care, but its opinion is that this is desirable to lower the risk of local and systemic infection arising from the teeth.",
      source: "mascc-isoo-2020",
      quote: "An expert opinion complements this guideline: Although there was insufficient evidence to support the use of professional oral care for OM prevention, the panel is of the opinion that dental evaluation and treatment as indicated before cancer therapy are desirable to reduce risk for local and systemic infections from odontogenic sources.",
      grade: "III (no guideline possible; expert opinion)",
    },
    {
      action: "Start a combined oral care routine (bland mouth rinses, toothbrushing and flossing, with set timing and frequency) and support the patient to keep to it",
      why: "The guideline says these protocols raise awareness of oral hygiene among patients and staff, which may lead to fewer and less severe oral complications.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that implementation of multiagent combination oral care protocols is beneficial for the prevention of OM during H&N RT.",
      grade: "III (suggestion)",
    },
    {
      action: "Teach the patient and carer why mouth care matters and how to do it",
      why: "The panel's opinion is that education may improve self-management and adherence to the oral care routine. No guideline was possible on education itself, and the statement this opinion complements was about people with blood cancers having chemotherapy or a transplant.",
      source: "mascc-isoo-2020",
      quote: "An expert opinion complements this guideline: The panel is of the opinion that educating patients about the benefits of BOC strategies is still appropriate because this may improve self‐management and adherence to the recommended oral care protocol during cancer treatment.",
      grade: "III (no guideline possible; expert opinion)",
    },
    {
      action: "Offer bland rinses (salt water or sodium bicarbonate) for cleaning and comfort",
      why: "The panel describes them as inert, bland rinses that increase oral clearance and may help hygiene and comfort; the data were too limited for a guideline on preventing or treating mucositis with them.",
      source: "mascc-isoo-2020",
      quote: "An expert opinion complements this guideline: Despite the limited data available for both saline and sodium bicarbonate, the panel recognizes that these are inert, bland rinses that increase oral clearance, which may be helpful for maintaining oral hygiene and improving patient comfort.",
      grade: "III (no guideline possible; expert opinion)",
    },
    {
      action: "Give benzydamine mouthwash to prevent mucositis where the radiotherapy dose is moderate (the guideline prints below 50 Gy)",
      why: "This is the guideline's level I recommendation, listed among its anti-inflammatory agents. The guideline paper prints no strength, volume or rinsing frequency for the mouthwash.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends benzydamine mouthwash for the prevention of OM in patients with H&N cancer receiving a moderate dose RT (<50 Gy).",
      grade: "I (recommendation)",
    },
    {
      action: "Consider benzydamine mouthwash as well when chemotherapy is given with the radiotherapy",
      why: "With chemoradiotherapy the guideline makes a suggestion on level II evidence, not a recommendation.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests the use of benzydamine mouthwash for the prevention of OM in patients with H&N cancer who receive RT‐CT.",
      grade: "II (suggestion)",
    },
    {
      action: "Where available, give adults intraoral photobiomodulation (low-level laser) to prevent mucositis through the whole radiotherapy course, following one of the guideline's Table 2 protocols exactly",
      why: "The guideline recommends it for prevention and says the settings of the chosen protocol should be followed exactly to optimise the effect; it adds that safety considerations particular to oral cancer should be weighed.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends the use of intraoral PBM therapy using low‐level laser therapy for the prevention of OM in adults receiving RT‐CT for H&N cancer (Table 2); safety considerations unique to patients with oral cancer should be considered.",
      grade: "I (recommendation, chemoradiotherapy); II (recommendation, radiotherapy alone)",
    },
    {
      action: "Before photobiomodulation, tell the patient the expected benefits and the potential risks",
      why: "Evidence from animal models on how the light affects tumour behaviour conflicts. Long-term follow-up of treated patients showed no increase in cancer recurrence, though the guideline calls the analysis of these data challenging.",
      source: "mascc-isoo-2020",
      quote: "Considering the conflicting evidence from animal models regarding the effect of PBM on tumor behavior, the clinician is advised to inform patients about the expected benefits and potential risks of PBM.",
    },
    {
      action: "Avoid chlorhexidine mouthwash as a way to prevent mucositis; it may still be used for a mouth infection",
      why: "This is a suggestion, and the guideline says its negative statements rest on lack of efficacy, not on harm. It does not rule out chlorhexidine for preventing or treating oral infection.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT.",
      grade: "III (suggestion against)",
    },
    {
      action: "Assess the mouth with the WHO mucositis scale weekly, or more often in high-grade mucositis, and add a patient-reported measure",
      why: "The Delphi panel reached consensus, for adults in clinical practice, on the WHO scale for clinicians and on a patient questionnaire (OMWQ and OMDQ, or PRO-CTCAE questions) weekly or more frequently in severe mucositis. It says patient-reported measures capture the burden of a symptom whatever its objective severity.",
      source: "mascc-delphi-2024",
      quote: "Weekly or more in high grade mucositis",
      grade: "Delphi consensus (more than 80% agreement)",
    },
    {
      action: "Relieve mucositis pain; with chemoradiotherapy, consider a topical morphine 0.2% mouthwash",
      why: "The guideline names pain relief as a key element of management and links oral mucositis with pain, difficulty eating and swallowing, and higher opioid use. The morphine rinse is a suggestion for treating pain during chemoradiotherapy only; the guideline paper prints the 0.2% strength and no volume or frequency.",
      source: "mascc-isoo-2020",
      quote: "Topical morphine 0.2% mouthwash is suggested for the treatment of OM‐associated pain in patients with H&N cancer who receive RT‐CT.",
      grade: "III (suggestion)",
    },
    {
      action: "Do not use sucralfate (combined topical and systemic) to prevent or treat mucositis pain during head and neck radiotherapy",
      why: "The guideline recommends against it on level II evidence, which it says means lack of efficacy and not harm. The statement does not cover the newer polymerised cross-linked sucralfate.",
      source: "mascc-isoo-2020",
      quote: "Sucralfate (combined topical and systemic) is not recommended for the prevention of OM‐associated pain in patients with H&N cancer who receive RT.",
      grade: "II (recommendation against)",
    },
    {
      action: "Give dietary support and take steps to prevent secondary infection, alongside pain relief",
      why: "The guideline names these three as the key elements of care in settings where it recommends no intervention.",
      source: "mascc-isoo-2020",
      quote: "Until more research is available, pain relief, dietary support, and secondary infection prevention are key elements in patient management.",
    },
    {
      action: "Tell the patient to call their doctor or nurse if pain in the mouth, lips or throat makes it difficult to eat, drink or sleep, or if they have a fever of 38 °C or higher",
      why: "The patient page says mouth problems are more serious when they interfere with eating and drinking, because they can lead to dehydration and malnutrition.",
      source: "nci-mouth-throat",
      quote: "It’s important to call your doctor or nurse if you have pain in your mouth, lips, or throat that makes it difficult to eat, drink, or sleep or if you have a fever of 100.5 °F (38 °C) or higher.",
      grade: "Not graded (patient information)",
    },
  ],
  bestInClass: {
    statement: "MASCC/ISOO 2020 is the most recent full mucositis guideline found (Europe PMC searched on 17 November 2026) and the reference for this protocol. ESMO has an older guideline on oral and gastrointestinal mucosal injury (2015) that could not be read, so the two are not compared here. For head and neck radiotherapy MASCC/ISOO support a combination oral care routine (level III suggestion) with dental evaluation beforehand (expert opinion), benzydamine mouthwash (level I recommendation below 50 Gy, level II suggestion with chemotherapy), intraoral photobiomodulation in adults with the listed settings (level I with chemoradiotherapy, level II with radiotherapy alone) after telling patients the expected benefits and potential risks, and topical morphine 0.2% mouthwash for pain with chemoradiotherapy (level III suggestion). They suggest against chlorhexidine for prevention (level III) and recommend against combined topical and systemic sucralfate for mucositis pain (level II). Honey (level II) and oral glutamine with chemoradiotherapy (level II, with caution) are suggestions, not recommendations. The MASCC/ISOO Delphi (2024) adds weekly WHO-scale assessment, more often in high-grade mucositis, with a patient-reported measure.",
    sources: ["mascc-isoo-2020", "mascc-delphi-2024"],
  },
  variants: [
    {
      name: "Honey",
      differs: "Adds honey, applied in the mouth and swallowed, through radiotherapy or chemoradiotherapy.",
      evidence: "MASCC/ISOO 2020 suggests it (level II); some of the trials had mixed radiotherapy and chemoradiotherapy patients, small samples and different sources of honey, so only a suggestion was possible.",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Oral glutamine with chemoradiotherapy",
      differs: "Adds oral glutamine during chemoradiotherapy.",
      evidence: "MASCC/ISOO 2020 suggests it (level II) on two randomised trials, with caution: \"The suggestion is with caution because of the higher mortality rate seen in patients undergoing HSCT who receive parenteral glutamine.\" The discussion reports that in those two trials a glutamine dose from 10 to 30 g daily during chemoradiotherapy may prevent mucositis; the paper first printed milligrams, and its 2021 erratum corrected the unit to grams. That describes the trials and is not a recommended dose.",
      sources: ["mascc-isoo-2020", "mascc-isoo-2020-erratum"],
    },
    {
      name: "Zinc, misoprostol and other agents once suggested",
      differs: "Adds zinc, or a misoprostol mouthwash, both of which the 2014 edition addressed.",
      evidence: "MASCC/ISOO 2020 withdrew the 2014 suggestion for zinc and the 2014 suggestion against misoprostol, reversing both to no guideline possible: \"The previous suggestion made for zinc in the 2014 MASCC/ISOO guidelines for patients with H&N cancer who received RT or RT‐CT was reversed in the current guidelines to NGP.\"",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Chlorhexidine as the routine mouthwash",
      differs: "Uses chlorhexidine as the standard rinse through radiotherapy.",
      evidence: "MASCC/ISOO 2020 suggests against it for preventing mucositis (level III) but keeps it for infection: \"If CHX is indicated because of concurrent oral infection and OM, it is acceptable to use it for the oral infection.\"",
      sources: ["mascc-isoo-2020"],
    },
  ],
  grades: [
    { claim: "Multiagent combination oral care protocols during head and neck radiotherapy", grade: "III (suggestion)", source: "mascc-isoo-2020" },
    { claim: "Benzydamine mouthwash with moderate-dose radiotherapy (below 50 Gy)", grade: "I (recommendation)", source: "mascc-isoo-2020" },
    { claim: "Benzydamine mouthwash with chemoradiotherapy", grade: "II (suggestion)", source: "mascc-isoo-2020" },
    { claim: "Intraoral photobiomodulation with radiotherapy alone", grade: "II (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends the use of intraoral PBM therapy using low‐level laser therapy for prevention of OM in adults receiving RT to the H&N (without CT) (Table 2); safety considerations unique to patients with oral cancer should be considered." },
    { claim: "Intraoral photobiomodulation with chemoradiotherapy", grade: "I (recommendation)", source: "mascc-isoo-2020" },
    { claim: "Follow the specific parameters of the selected photobiomodulation protocol", grade: "Recommendation (ungraded note to the table)", source: "mascc-isoo-2020", quote: "For all PBM guidelines, it is recommended that the specific PTPs of the selected protocol will be followed for optimal therapy." },
    { claim: "Chlorhexidine not to be used to prevent mucositis in head and neck radiotherapy", grade: "III (suggestion against)", source: "mascc-isoo-2020" },
    { claim: "Topical morphine 0.2% mouthwash for pain with chemoradiotherapy", grade: "III (suggestion)", source: "mascc-isoo-2020" },
    { claim: "Sucralfate not recommended for prevention or treatment of pain with radiotherapy", grade: "II (recommendation against)", source: "mascc-isoo-2020" },
    { claim: "Oral glutamine with chemoradiotherapy", grade: "II (suggestion, with caution)", source: "mascc-isoo-2020", quote: "The panel suggests oral glutamine for the prevention of OM in patients with H&N cancer who receive receiving RT‐CT." },
    { claim: "Honey with radiotherapy or chemoradiotherapy", grade: "II (suggestion)", source: "mascc-isoo-2020", quote: "Honey is suggested for the prevention of OM in patients with H&N cancer who receive treatment with either RT or RT‐CT." },
    { claim: "Patient-reported measure for head and neck (chemo)radiotherapy in practice", grade: "Delphi consensus (more than 80% agreement)", source: "mascc-delphi-2024", quote: "OMWQ and OMDQ or PRO-CTCAE questions related to mucositis" },
  ],
  sources: [
    {
      key: "mascc-isoo-2020",
      label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (2019 update)",
      publisher: "MASCC and ISOO (Cancer; Elad et al.)",
      year: 2020,
      url: "https://doi.org/10.1002/cncr.33100",
      doi: "10.1002/cncr.33100",
      gradingScheme: "Each statement carries a level of evidence (Somerfield and McCrae criteria) and is a recommendation, a suggestion or no guideline possible (NGP); expert opinion is marked as such. Negative guidelines rest on evidence of lack of efficacy and do not mean the agent is harmful.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-delphi-2024",
      label: "Guidance on mucositis assessment from the MASCC Mucositis Study Group and ISOO: an international Delphi study",
      publisher: "MASCC Mucositis Study Group and ISOO (eClinicalMedicine; Abdalla-Aslan et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.eclinm.2024.102675",
      doi: "10.1016/j.eclinm.2024.102675",
      gradingScheme: "Delphi consensus, defined in the abstract as agreement by more than 80% of respondents (the methods section prints 80% or more); not graded by evidence level. The statements apply to adults only.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-isoo-paediatric-2021",
      label: "MASCC/ISOO clinical practice guidelines for the management of mucositis: sub-analysis of current interventions for the management of oral mucositis in pediatric cancer patients",
      publisher: "MASCC and ISOO (Supportive Care in Cancer)",
      year: 2021,
      url: "https://doi.org/10.1007/s00520-020-05803-4",
      doi: "10.1007/s00520-020-05803-4",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-isoo-2020-erratum",
      label: "Erratum to MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy",
      publisher: "Cancer",
      year: 2021,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8565669/",
      doi: "10.1002/cncr.33549",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-mouth-throat",
      label: "Mouth and Throat Problems: Cancer Treatment Side Effects (reviewed 24 September 2021)",
      publisher: "National Cancer Institute",
      year: 2021,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["head-and-neck", "oral-cavity-cancer", "oropharyngeal-cancer"],
  drugs: ["morphine"],
  technologies: ["photobiomodulation-mucositis", "honey-radiation-mucositis", "glutamine-mucositis-neuropathy"],
  terms: ["mucositis"],
  related: ["idea-moon-mucositis-taste-programme", "head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis", "oral-mucositis-prevention-and-oral-care"],
  upgrades: ["idea-pu-photobiomodulation-every-head-neck-centre"],
  gaps: [
    "MASCC/ISOO 2020 remains the latest full edition: a Europe PMC search on 17 November 2026 found no newer one. Its 2021 erratum (Cancer, doi 10.1002/cncr.33549) was read on 17 November 2026 and corrects only the unit of the glutamine dose in the supporting trials, from milligrams to grams.",
    "The 2014 statements carried over because there was no new evidence (the text names those against antimicrobial lozenges and pastes, pilocarpine and pentoxifylline) sit in the 2020 paper's Supporting Table 1. On 17 November 2026 the supplement file answered 403 and was not read; nothing here rests on it. Doxepin mouthwash and transdermal fentanyl are not among them: the 2020 update changed both from a suggestion to no guideline possible.",
    "Photobiomodulation settings (wavelength, power density, time per spot, energy density, spot size, number of sites) are in Table 2 of the guideline: one protocol for radiotherapy alone and two for chemoradiotherapy. They are not reproduced on this page, and the guideline asks that the chosen protocol be followed exactly. It also notes that photobiomodulation may be regulated differently by local agencies.",
    "The guideline paper prints no strength, volume or frequency for benzydamine mouthwash and no volume or frequency for the morphine 0.2% mouthwash; those sit in its section papers, which were not read, so no such figure is given here.",
    "The time at which mucositis usually starts during a radiotherapy course is not stated in any source read, so the page gives none.",
    "The advice on when to call is from a US National Cancer Institute patient page for all cancer treatments, not one written for head and neck radiotherapy, and no source read gives a time limit for calling. Local teams give their own contact instructions.",
    "ESMO published a guideline on oral and gastrointestinal mucosal injury in 2015 (Annals of Oncology, doi 10.1093/annonc/mdv202); Europe PMC holds no abstract or open copy, so it was not read and nothing here rests on it. An expert consensus on radiochemotherapy-induced oral mucositis (International Journal of Oral Science, 2025, doi 10.1038/s41368-025-00382-8) was found by title on 17 November 2026 and not read. NICE was not searched separately, and the UK Oral Mucositis in Cancer Group guidance was not located to read.",
    "Children: the paediatric sub-analysis (abstract read) found limited or conflicting evidence and advised a basic oral care protocol; the Delphi assessment statements apply to adults only.",
  ],
});
