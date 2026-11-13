import { protocol } from "./helpers";

/*
 * Preventing oral and oropharyngeal mucositis in children receiving chemotherapy, radiotherapy to the head and neck,
 * or a haematopoietic stem cell transplant.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Children's Oncology Group endorsement document for the POGO 2021 update (version date 7 February 2022; endorsed
 *   December 2021), public PDF from the COG supportive care page (pdftotext, full text). It reprints every
 *   recommendation with its grade and remarks.
 * - Patel et al., Clinical practice guideline for the prevention of oral and oropharyngeal mucositis in pediatric
 *   cancer and hematopoietic stem cell transplant patients: 2021 update (Eur J Cancer 2021): abstract only, from Europe
 *   PMC; the full text is not open access. The COG page gives a ScienceDirect link for it; its DOI was resolved
 *   through Europe PMC. A Europe PMC title search found no later paediatric mucositis guideline (2021 to 2026).
 * - MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (Elad et al.,
 *   Cancer 2020), open access, full text from Europe PMC (PMC7540329), for basic oral care and for where adult advice
 *   differs. No later MASCC/ISOO mucositis guideline was found by title search.
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const paediatricOralMucositisPrevention = protocol({
  id: "paediatric-oral-mucositis-prevention",
  name: "Preventing mouth sores (oral mucositis) in children having cancer treatment or a stem cell transplant",
  aka: ["paediatric oral mucositis prevention", "pediatric mucositis prophylaxis", "cryotherapy ice chips children", "photobiomodulation children transplant", "mouth care during chemotherapy children"],
  domain: "paediatric",
  tldr: "Some chemotherapy and transplants cause painful sores in the mouth and throat. Older children who can manage it suck ice during short infusions of certain drugs, and children having a stem cell transplant or radiotherapy to the head and neck have gentle red-light treatment inside the mouth. Good daily mouth care and a dental check before treatment help too.",
  simple: "Cancer treatment can make the mouth very sore. Sucking ice during some drips, and a red-light treatment in the mouth for children having a transplant, can lower the chance of bad sores.",
  summary: "The Pediatric Oncology Group of Ontario 2021 update (seven systematic reviews, 107 studies, GRADE), endorsed by the Children's Oncology Group, covers patients aged 0 to 18. Cryotherapy: use for older, cooperative children receiving short infusions of melphalan or 5-fluorouracil (strong, high), consider for short infusions of other mucotoxic chemotherapy (conditional, moderate); the panel thought it not feasible for infusions longer than 1 hour or in young children. Intraoral photobiomodulation in the red spectrum (620 to 750 nm): use for children having autologous or allogeneic transplant and for head and neck carcinoma radiotherapy (strong, high), consider for radiotherapy to other head and neck cancers such as rhabdomyosarcoma (conditional, moderate). Do not give palifermin routinely (strong, high), because its benefit was modest (risk ratio for severe mucositis 0.81) against short-term harms, possible long-term effects on cancer outcomes, cost and availability; do not give G-CSF to prevent mucositis (strong, high). The adult MASCC/ISOO 2020 guideline adds multiagent basic oral care protocols during chemotherapy, radiotherapy and transplant (level III), dental assessment before treatment (expert opinion), and differs on palifermin, which it recommends for autologous transplant with high-dose chemotherapy and total body irradiation.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "chemotherapy-day-unit", "radiotherapy-department", "home"],
  },
  population: "Children and adolescents aged 0 to 18 receiving treatment for cancer or undergoing haematopoietic stem cell transplant, as the paediatric guideline scopes it. The basic oral care steps rest on the MASCC/ISOO guideline, which is written mainly from adult evidence.",
  trigger: "A child is due to start chemotherapy, radiotherapy to the head and neck, or transplant conditioning likely to cause mucositis.",
  steps: [
    {
      action: "Arrange a dental assessment, and any treatment needed, before cancer treatment starts",
      why: "Bad teeth and gums can become a source of infection once the white count falls.",
      source: "mascc-isoo-2020",
      quote: "the panel is of the opinion that dental evaluation and treatment as indicated before cancer therapy are desirable to reduce risk for local and systemic infections from odontogenic sources.",
      grade: "Expert opinion",
    },
    {
      action: "Put a daily oral care routine in place, with tooth brushing and bland rinses, and teach the child and family to keep it up",
      why: "Combined mouth care routines lowered mucositis in trials of chemotherapy, radiotherapy and transplant, mostly in adults.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that implementation of multiagent combination oral care protocols is beneficial for the prevention of OM during CT.",
      grade: "LoE III (suggestion)",
    },
    {
      action: "For an older, cooperative child having a short infusion of melphalan or 5-fluorouracil, give ice chips or ice water to hold in the mouth during the infusion",
      why: "In trials it halved severe mucositis (risk ratio 0.49), with no documented harms and little cost; it suits infusions of 30 minutes or less.",
      source: "patel-mucositis-2021",
      quote: "Cryotherapy should be used for older cooperative pediatric patients who will receive short infusions of melphalan or 5-fluorouracil.",
      grade: "Strong recommendation, High-quality evidence",
    },
    {
      action: "Consider ice for short infusions of other chemotherapy that causes mucositis, and tell families that sores can still happen",
      why: "The benefit is likely to carry over to other drugs, but there is no direct evidence; cooling is not practical for infusions longer than an hour.",
      source: "cog-mucositis-2022",
      quote: "Consider using cryotherapy for older, cooperative pediatric patients receiving treatment for cancer or undergoing HSCT who will receive short infusions of chemotherapy associated with mucositis other than melphalan or 5-fluorouracil.",
      grade: "Conditional recommendation, Moderate-quality evidence",
    },
    {
      action: "For a child having an autologous or allogeneic transplant, or radiotherapy for head and neck carcinoma, give intraoral red-light photobiomodulation (620 to 750 nm)",
      why: "It reduced severe mucositis by more than half in trials and was workable in children of all ages, though it needs trained staff, equipment and eye protection.",
      source: "cog-mucositis-2022",
      quote: "Use intraoral photobiomodulation therapy in the red light spectrum (620–750 nm) for pediatric patients undergoing autologous or allogeneic HSCT and for pediatric patients who will receive radiotherapy for head and neck carcinoma.",
      grade: "Strong recommendation, High-quality evidence",
    },
    {
      action: "Consider photobiomodulation for radiotherapy to other head and neck cancers, such as rhabdomyosarcoma",
      why: "The benefit is expected to be similar, but there are no direct data in these cancers.",
      source: "cog-mucositis-2022",
      quote: "Consider using intraoral photobiomodulation therapy in the red light spectrum (620–750 nm) for pediatric patients who will receive radiotherapy for head and neck cancers other than carcinoma.",
      grade: "Conditional recommendation, Moderate-quality evidence",
    },
    {
      action: "Do not give palifermin routinely",
      why: "It reduced severe mucositis only modestly, has short-term side effects, may affect cancer outcomes in the long term, and is costly and hard to get.",
      source: "cog-mucositis-2022",
      quote: "Do not administer palifermin routinely to pediatric patients with cancer receiving treatment for cancer or undergoing HSCT.",
      grade: "Strong recommendation, High-quality evidence",
    },
    {
      action: "Do not give G-CSF to prevent mucositis",
      why: "It did not prevent mucositis; children may still have it for other reasons, such as shortening neutropenia.",
      source: "cog-mucositis-2022",
      quote: "Do not administer GCSFs to pediatric patients receiving treatment for cancer or undergoing HSCT for the purpose of mucositis prevention.",
      grade: "Strong recommendation, High-quality evidence",
    },
  ],
  bestInClass: {
    statement: "For children, the POGO 2021 update endorsed by the Children's Oncology Group is the current guideline: cryotherapy for older, cooperative children on short melphalan or 5-fluorouracil infusions, red-light intraoral photobiomodulation for transplant and head and neck radiotherapy, and no routine palifermin or G-CSF. The adult MASCC/ISOO 2020 guideline agrees on cryotherapy (melphalan conditioning and bolus 5-fluorouracil, level II) and photobiomodulation (adult transplant, level I) and adds basic oral care protocols, but differs on palifermin: MASCC/ISOO recommends intravenous KGF-1 (palifermin) for haematological cancers having autologous transplant with high-dose chemotherapy and total body irradiation (level I), where the paediatric panel advises against routine use because of harms, possible long-term effects on cancer outcomes and cost.",
    sources: ["cog-mucositis-2022", "patel-mucositis-2021", "mascc-isoo-2020"],
  },
  variants: [
    {
      name: "Palifermin in autologous transplant with total body irradiation (MASCC/ISOO, adults)",
      differs: "Gives intravenous palifermin to prevent mucositis in people with haematological cancers having autologous transplant with high-dose chemotherapy and total body irradiation.",
      evidence: "MASCC/ISOO level I recommendation in adults. The paediatric guideline makes a strong recommendation against routine use in children (risk ratio for severe mucositis 0.81).",
      sources: ["mascc-isoo-2020", "cog-mucositis-2022"],
    },
    {
      name: "Chlorhexidine mouthwash",
      differs: "Some units use chlorhexidine rinses as part of mouth care to prevent mucositis.",
      evidence: "MASCC/ISOO suggests chlorhexidine not be used to prevent mucositis during head and neck radiotherapy (level III); the paediatric guideline makes no recommendation on it.",
      sources: ["mascc-isoo-2020"],
    },
  ],
  grades: [
    { claim: "Cryotherapy for short melphalan or 5-fluorouracil infusions in older, cooperative children", grade: "Strong recommendation, High-quality evidence", source: "cog-mucositis-2022" },
    { claim: "Cryotherapy considered for other short mucotoxic infusions", grade: "Conditional recommendation, Moderate-quality evidence", source: "cog-mucositis-2022" },
    { claim: "Photobiomodulation for transplant and head and neck carcinoma radiotherapy", grade: "Strong recommendation, High-quality evidence", source: "cog-mucositis-2022" },
    { claim: "No routine palifermin in children", grade: "Strong recommendation, High-quality evidence", source: "cog-mucositis-2022" },
    { claim: "No G-CSF for mucositis prevention", grade: "Strong recommendation, High-quality evidence", source: "cog-mucositis-2022" },
    { claim: "Multiagent oral care protocols during chemotherapy (adults)", grade: "LoE III", source: "mascc-isoo-2020" },
    { claim: "Palifermin for autologous transplant with high-dose chemotherapy and total body irradiation (adults)", grade: "LoE I", source: "mascc-isoo-2020", quote: "The use of KGF‐1 intravenously is recommended for the prevention of OM in patients with hematologic cancer undergoing autologous HSCT with a conditioning regimen that includes high‐dose CT and TBI." },
    { claim: "Chlorhexidine not to be used to prevent mucositis during head and neck radiotherapy (adults)", grade: "LoE III", source: "mascc-isoo-2020", quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT." },
  ],
  sources: [
    { key: "cog-mucositis-2022", label: "Clinical practice guideline for the prevention of oral and oropharyngeal mucositis in pediatric cancer and hematopoietic stem cell transplant patients: 2021 update (COG endorsement, version date 7 February 2022)", publisher: "Children's Oncology Group", year: 2022, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Mucositis_Guideline_Document_07FEB2022-new-logo.pdf", gradingScheme: "GRADE, reprinted from the source guideline: strong or conditional recommendation, with high, moderate, low or very low quality evidence.", read: "full-text", accessed: "2026-11-11" },
    { key: "patel-mucositis-2021", label: "Clinical practice guideline for the prevention of oral and oropharyngeal mucositis in pediatric cancer and hematopoietic stem cell transplant patients: 2021 update", publisher: "Pediatric Oncology Group of Ontario, European Journal of Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34252760", doi: "10.1016/j.ejca.2021.05.013", gradingScheme: "GRADE: strong or conditional recommendations; evidence high, moderate, low or very low.", read: "abstract", accessed: "2026-11-11" },
    { key: "mascc-isoo-2020", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy", publisher: "MASCC and ISOO, Cancer", year: 2020, url: "https://europepmc.org/article/PMC/PMC7540329", doi: "10.1002/cncr.33100", gradingScheme: "Level of evidence I to V printed beside each statement; 'recommends' for stronger and 'suggests' for weaker evidence; expert opinion where no guideline was possible.", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-upgrade-oral-cryotherapy-with-bolus-chemotherapy"],
  gaps: [
    "The full text of the paediatric 2021 guideline is not open access and was read through the COG endorsement document and the abstract; the photobiomodulation settings (wavelength apart) and the cryotherapy method used in the trials are not given here.",
    "The paediatric guideline makes no recommendation on basic oral care, chlorhexidine or other mouthwashes; the oral care steps rest on adult MASCC/ISOO evidence.",
    "Cryotherapy was not feasible in young children, and no prevention is recommended for them during chemotherapy other than in transplant.",
    "Photobiomodulation needs equipment and trained staff that many centres do not have; access has not been measured here.",
  ],
  drugs: ["palifermin", "filgrastim"],
  cancers: ["childhood-cancers"],
  technologies: ["oral-cryotherapy-mucositis", "photobiomodulation-mucositis", "allogeneic-hsct", "autologous-stem-cell-transplant"],
  companies: ["childrens-oncology-group"],
  institutions: ["mascc"],
  terms: ["mucositis"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "mucositis"],
  related: ["oral-mucositis-prevention-and-oral-care"],
});
