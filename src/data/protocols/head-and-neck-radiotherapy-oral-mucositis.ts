import { protocol } from "./helpers";

/*
 * Mouth care and the prevention and treatment of oral mucositis during radiotherapy (with or without chemotherapy)
 * for head and neck cancer.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (Elad et al.,
 *   Cancer 2020; 2019 update): full text, Europe PMC full-text XML (PMC7540329). Table 1 was read row by row from the
 *   XML so that each level of evidence is matched to its own statement. This is still the latest full MASCC/ISOO
 *   mucositis guideline: a Europe PMC search on 11 November 2026 for MASCC or ISOO mucositis guidelines from 2021 to
 *   2026 found an erratum (2021, text not retrievable), a paediatric sub-analysis (abstract read), a survey of
 *   photobiomodulation practice and the assessment Delphi below, and no newer edition.
 * - Guidance on mucositis assessment from the MASCC Mucositis Study Group and ISOO, an international Delphi study
 *   (Abdalla-Aslan et al., eClinicalMedicine 2024): full text, Europe PMC full-text XML (PMC11200283). The head and neck
 *   recommendations are table cells (Table 1); the quote is the cell text.
 * - The 2014 MASCC/ISOO statements that the 2020 update left unchanged (among them the doxepin rinse for pain) are in
 *   the 2020 paper's Supporting Table 1, a supplement that was not read; no step rests on them.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed; the source uses the Unicode hyphen (‐) in "RT‐CT" and "self‐management", and it is kept.
 */
export const headAndNeckRadiotherapyOralMucositis = protocol({
  id: "head-and-neck-radiotherapy-oral-mucositis",
  name: "Mouth care and oral mucositis prevention during head and neck radiotherapy",
  aka: ["oral mucositis during radiotherapy", "radiation mucositis", "sore mouth during head and neck radiotherapy", "mouth care during radiotherapy", "photobiomodulation for mucositis", "benzydamine mouthwash", "Difflam during radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy to the head and neck makes the lining of the mouth and throat sore, usually from the second or third week. Keeping the mouth clean on a regular routine, a benzydamine mouthwash, and in many centres a low-level light treatment inside the mouth help prevent it; pain relief and help with eating matter as much as anything else.",
  simple: "Radiotherapy to the mouth or throat often makes the mouth very sore. Brush gently, rinse often, and use the mouthwash your team gives you. Tell them early if it hurts to eat or swallow, so they can help with pain and food.",
  summary: "The MASCC/ISOO 2020 guideline (the latest full edition) is the reference. For head and neck radiotherapy it suggests a multiagent combination oral care protocol (level III), recommends benzydamine mouthwash for moderate-dose radiotherapy below 50 Gy (level I) and suggests it with chemoradiotherapy (level II), and recommends intraoral photobiomodulation with low-level laser for radiotherapy alone (level II) and for chemoradiotherapy (level I), following the parameters of one of the protocols in its Table 2 and telling patients that animal data on tumour effects conflict. It suggests against chlorhexidine for prevention (level III), recommends against sucralfate, suggests honey (level II) and, with caution, oral glutamine with chemoradiotherapy (level II), and suggests topical morphine 0.2% mouthwash for pain with chemoradiotherapy (level III). Professional oral care, patient education and saline or bicarbonate rinses carry expert opinion only: dental assessment before treatment, education to support self-care, and bland rinses for clearance and comfort. The MASCC/ISOO Delphi (2024) adds how to assess: the WHO scale by the clinician, weekly or more often in high-grade mucositis, with a patient-reported measure (OMWQ and OMDQ, or PRO-CTCAE items). Where no intervention is recommended, pain relief, dietary support and preventing secondary infection carry management.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "radiographer", "patient-or-carer", "multidisciplinary-team"],
    where: ["radiotherapy-department", "outpatient-clinic", "home"],
  },
  population: "Adults having radiotherapy, with or without concurrent chemotherapy, to the head and neck. The MASCC/ISOO statements are scoped by treatment (radiotherapy alone, chemoradiotherapy) and by dose for benzydamine (below 50 Gy for the level I recommendation). Children are not covered: a MASCC/ISOO paediatric sub-analysis (2021) found too little evidence to make recommendations beyond basic oral care, and advised extrapolating from adults. Mucositis from chemotherapy alone or from stem cell transplant conditioning follows other statements in the same guideline and is not covered here.",
  trigger: "Radiotherapy to the head and neck is planned; the protocol starts before the first fraction and runs to the end of treatment and the weeks after.",
  steps: [
    {
      action: "Arrange a dental assessment, and any treatment needed, before radiotherapy starts",
      why: "Bad teeth or gums are a source of infection during treatment, and some dental work is safer done before the jaw is irradiated.",
      source: "mascc-isoo-2020",
      quote: "An expert opinion complements this guideline: Although there was insufficient evidence to support the use of professional oral care for OM prevention, the panel is of the opinion that dental evaluation and treatment as indicated before cancer therapy are desirable to reduce risk for local and systemic infections from odontogenic sources.",
      grade: "III (expert opinion)",
    },
    {
      action: "Start a combined oral care routine (brushing, flossing where possible and regular rinses) and support the patient to keep to it throughout treatment",
      why: "A regular routine of cleaning the mouth lowers the chance and severity of a sore mouth, mostly by making daily mouth care happen.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that implementation of multiagent combination oral care protocols is beneficial for the prevention of OM during H&N RT.",
      grade: "III (suggestion)",
    },
    {
      action: "Teach the patient and carer why mouth care matters and how to do it",
      why: "People who understand the routine are more likely to keep to it when the mouth is sore.",
      source: "mascc-isoo-2020",
      quote: "An expert opinion complements this guideline: The panel is of the opinion that educating patients about the benefits of BOC strategies is still appropriate because this may improve self‐management and adherence to the recommended oral care protocol during cancer treatment.",
      grade: "III (expert opinion)",
    },
    {
      action: "Offer bland rinses (salt water or sodium bicarbonate) for cleaning and comfort",
      why: "They are harmless, wash debris away and can make the mouth feel better, though they have not been shown to prevent mucositis.",
      source: "mascc-isoo-2020",
      quote: "An expert opinion complements this guideline: Despite the limited data available for both saline and sodium bicarbonate, the panel recognizes that these are inert, bland rinses that increase oral clearance, which may be helpful for maintaining oral hygiene and improving patient comfort.",
      grade: "III (expert opinion)",
    },
    {
      action: "Give benzydamine mouthwash from the start of radiotherapy where the dose is moderate (below 50 Gy)",
      why: "Benzydamine is an anti-inflammatory rinse that reduces mucositis in trials of moderate-dose head and neck radiotherapy.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends benzydamine mouthwash for the prevention of OM in patients with H&N cancer receiving a moderate dose RT (<50 Gy).",
      grade: "I (recommendation)",
    },
    {
      action: "Consider benzydamine mouthwash as well when chemotherapy is given with the radiotherapy",
      why: "The evidence is weaker with chemoradiotherapy, but points the same way.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests the use of benzydamine mouthwash for the prevention of OM in patients with H&N cancer who receive RT‐CT.",
      grade: "II (suggestion)",
    },
    {
      action: "Where available, give intraoral photobiomodulation (low-level laser) through the course, using the exact parameters of a published protocol",
      why: "Low-energy red light inside the mouth reduces how severe mucositis gets; the benefit depends on using settings that were tested.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends the use of intraoral PBM therapy using low‐level laser therapy for the prevention of OM in adults receiving RT‐CT for H&N cancer (Table 2); safety considerations unique to patients with oral cancer should be considered.",
      grade: "I (recommendation, chemoradiotherapy); II (recommendation, radiotherapy alone)",
    },
    {
      action: "Before photobiomodulation, explain the expected benefit and the uncertain risk of light shone on or near a tumour",
      why: "Animal studies disagree on whether the light affects tumour cells; follow-up of treated patients has not shown more recurrence, but the data are hard to analyse.",
      source: "mascc-isoo-2020",
      quote: "Considering the conflicting evidence from animal models regarding the effect of PBM on tumor behavior, the clinician is advised to inform patients about the expected benefits and potential risks of PBM.",
    },
    {
      action: "Do not use chlorhexidine mouthwash to prevent mucositis, unless it is needed to treat an infection",
      why: "Trials found it does not prevent radiation mucositis; it remains acceptable for a mouth infection.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT.",
      grade: "III (suggestion against)",
    },
    {
      action: "Check the mouth at least weekly with the WHO mucositis scale, more often once it is severe, and ask the patient to score it too",
      why: "Regular scoring catches worsening early, and the patient's own report shows how much it affects eating and pain.",
      source: "mascc-delphi-2024",
      quote: "Weekly or more in high grade mucositis",
      grade: "Delphi consensus (more than 80% agreement)",
    },
    {
      action: "Treat the pain early and step it up as needed; with chemoradiotherapy, consider a topical morphine 0.2% mouthwash",
      why: "Pain is what stops people eating and drinking; a morphine rinse can help where chemotherapy is part of treatment.",
      source: "mascc-isoo-2020",
      quote: "Topical morphine 0.2% mouthwash is suggested for the treatment of OM‐associated pain in patients with H&N cancer who receive RT‐CT.",
      grade: "III (suggestion)",
    },
    {
      action: "Do not use sucralfate to prevent or treat mucositis pain during head and neck radiotherapy",
      why: "Trials found the combined mouth-and-swallowed form did not help.",
      source: "mascc-isoo-2020",
      quote: "Sucralfate (combined topical and systemic) is not recommended for the prevention of OM‐associated pain in patients with H&N cancer who receive RT.",
      grade: "II (recommendation against)",
    },
    {
      action: "Keep the patient eating and drinking with dietetic support, and watch for and treat mouth infection",
      why: "Where no treatment prevents mucositis, nutrition, pain relief and stopping infection are what carry people through.",
      source: "mascc-isoo-2020",
      quote: "Until more research is available, pain relief, dietary support, and secondary infection prevention are key elements in patient management.",
    },
  ],
  bestInClass: {
    statement: "MASCC/ISOO 2020 is the only current international guideline read and the reference for this protocol: a combination oral care routine with dental assessment beforehand, benzydamine mouthwash (level I below 50 Gy, level II with chemotherapy), intraoral photobiomodulation with the tested parameters (level I with chemoradiotherapy, level II with radiotherapy alone) after explaining its uncertain tumour safety, no chlorhexidine or sucralfate for prevention, weekly WHO-scale assessment with a patient-reported measure (MASCC/ISOO Delphi 2024), and early pain relief and dietary support. Honey (level II) and oral glutamine with chemoradiotherapy (level II, with caution) are suggestions, not recommendations.",
    sources: ["mascc-isoo-2020", "mascc-delphi-2024"],
  },
  variants: [
    {
      name: "Honey",
      differs: "Adds honey, applied in the mouth and swallowed, through radiotherapy or chemoradiotherapy.",
      evidence: "MASCC/ISOO 2020 suggests it (level II); the trials were small, mixed radiotherapy and chemoradiotherapy, and used different honeys, so only a suggestion was possible.",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Oral glutamine with chemoradiotherapy",
      differs: "Adds oral glutamine during chemoradiotherapy.",
      evidence: "MASCC/ISOO 2020 suggests it (level II) on two randomised trials, with caution: \"The suggestion is with caution because of the higher mortality rate seen in patients undergoing HSCT who receive parenteral glutamine.\" The dose printed in the guideline's discussion is not reproduced here because it could not be checked against the trials.",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Zinc, misoprostol and other agents once suggested",
      differs: "Some centres still give zinc or a misoprostol rinse.",
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
      gradingScheme: "Level of evidence I to V (Somerfield and McCrae criteria); each statement is a recommendation, a suggestion or no guideline possible (NGP), and expert opinion is marked as such. Negative guidelines mean lack of efficacy, not harm.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "mascc-delphi-2024",
      label: "Guidance on mucositis assessment from the MASCC Mucositis Study Group and ISOO: an international Delphi study",
      publisher: "MASCC Mucositis Study Group and ISOO (eClinicalMedicine; Abdalla-Aslan et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.eclinm.2024.102675",
      doi: "10.1016/j.eclinm.2024.102675",
      gradingScheme: "Delphi consensus, defined as agreement by more than 80% of respondents; not graded by evidence level.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "mascc-isoo-paediatric-2021",
      label: "MASCC/ISOO clinical practice guidelines for the management of mucositis: sub-analysis of current interventions for the management of oral mucositis in pediatric cancer patients",
      publisher: "MASCC and ISOO (Supportive Care in Cancer)",
      year: 2021,
      url: "https://doi.org/10.1007/s00520-020-05803-4",
      doi: "10.1007/s00520-020-05803-4",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["head-and-neck", "oral-cavity-cancer", "oropharyngeal-cancer"],
  drugs: ["morphine"],
  technologies: ["photobiomodulation-mucositis", "honey-radiation-mucositis", "glutamine-mucositis-neuropathy"],
  terms: ["mucositis"],
  related: ["idea-moon-mucositis-taste-programme", "head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis", "oral-mucositis-prevention-and-oral-care"],
  upgrades: ["idea-pu-photobiomodulation-every-head-neck-centre"],
  gaps: [
    "MASCC/ISOO 2020 remains the latest full edition; an erratum was published in 2021 (Cancer, doi 10.1002/cncr.33549) whose text could not be retrieved, so what it corrects was not checked.",
    "The 2014 statements carried forward unchanged (including the doxepin rinse for pain) sit in the 2020 paper's Supporting Table 1, which was not read; nothing here rests on them.",
    "Photobiomodulation parameters (wavelength, power, time per spot, number of sites) are in Table 2 of the guideline and in the PBM systematic review; they are not reproduced here, and the guideline asks that a tested protocol be followed exactly. Access to photobiomodulation varies widely between centres.",
    "The guideline's discussion gives the oral glutamine dose as '10 to 30 mg daily', which does not match the gram doses used in glutamine trials; the figure was not checked against the trials and is not used.",
    "No national guideline (NICE, ESMO) on radiation mucositis newer than MASCC/ISOO 2020 was found. The UK Oral Mucositis in Cancer Group guidance was not located to read.",
    "Children: the evidence is too thin for recommendations beyond basic oral care (paediatric sub-analysis, abstract read).",
  ],
});
