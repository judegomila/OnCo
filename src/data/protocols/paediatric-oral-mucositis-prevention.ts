import { protocol } from "./helpers";

/*
 * Preventing oral and oropharyngeal mucositis in children receiving chemotherapy, radiotherapy to the head and neck,
 * or a haematopoietic stem cell transplant.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw
 * with curl and read as text, and every quote was checked by script (whitespace and tags only normalised).
 * - Children's Oncology Group endorsement document for the POGO 2021 update (version date 7 February 2022; endorsed
 *   December 2021), public PDF from the COG supportive care page (pdftotext, full text). It reprints all six
 *   recommendations with their grades and remarks. The COG page still lists it as the endorsed mucositis guideline;
 *   the earlier edition, listed as "Mucositis Prevention (POGO 2016)", is marked archived April 2021.
 * - Patel et al., 2021 update (Eur J Cancer 2021;154:92-101): abstract only, from Europe PMC; DOI resolved through
 *   Crossref and Europe PMC. Crossref lists the article under a Creative Commons licence, but the publisher's PDF
 *   answered a script with a 403 browser check on 17 November 2026 and no copy is in PubMed Central, so the full text
 *   was not read. A Europe PMC title search (2021 to 2026) found no later paediatric mucositis guideline.
 * - Sung et al., the earlier edition (BMJ Support Palliat Care, online 2015, print 2017): open access, full text from
 *   Europe PMC (PMC5339548). Added in the second pass for what the earlier edition said and for how the trials gave
 *   cryotherapy.
 * - MASCC/ISOO guidelines (Elad et al., Cancer 2020), open access: full text XML from Europe PMC (PMC7540329), the
 *   copy a sibling checker saved on 17 November 2026 was re-used. An erratum exists (Cancer 2021,
 *   10.1002/cncr.33549); its body could not be read (see gaps). No later MASCC/ISOO mucositis guideline was found.
 * - MASCC/ISOO paediatric sub-analysis (Miranda-Silva et al., Support Care Cancer 2021): abstract only, Europe PMC.
 * Corrected in the second pass: MASCC/ISOO statements had been labelled as adult recommendations where the guideline
 * names adults only for photobiomodulation; "ice water" and the reasons given for the dental and mouth care steps
 * went beyond the sources; the MASCC/ISOO grading scheme was described in words the guideline does not use.
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const paediatricOralMucositisPrevention = protocol({
  id: "paediatric-oral-mucositis-prevention",
  name: "Preventing mouth sores (oral mucositis) in children having cancer treatment or a stem cell transplant",
  aka: ["paediatric oral mucositis prevention", "pediatric mucositis prophylaxis", "cryotherapy ice chips children", "photobiomodulation children transplant", "mouth care during chemotherapy children"],
  domain: "paediatric",
  tldr: "Some chemotherapy and transplants cause painful sores in the mouth and throat. Older children who can manage it hold ice in the mouth during short infusions of certain drugs. Children having a stem cell transplant, or radiotherapy for some head and neck cancers, have red-light treatment inside the mouth. Daily mouth care and a dental check before treatment are advised too.",
  simple: "Cancer treatment can make the mouth very sore. Holding ice in the mouth during some short drips, and a red-light treatment in the mouth for children having a transplant, can lower the chance of bad sores.",
  summary: "The Pediatric Oncology Group of Ontario 2021 update (seven systematic reviews, 107 studies, GRADE), endorsed by the Children's Oncology Group, covers patients aged 0 to 18. Cryotherapy: use for older, cooperative children receiving short infusions of melphalan or 5-fluorouracil (strong, high), consider for short infusions of other chemotherapy associated with mucositis (conditional, moderate); the panel did not believe it feasible for administrations longer than 1 hour, and it was not feasible in young children. Intraoral photobiomodulation in the red spectrum (620 to 750 nm): use for children having autologous or allogeneic transplant and for radiotherapy for head and neck carcinoma (strong, high), consider for radiotherapy to other head and neck cancers such as rhabdomyosarcoma (conditional, moderate). Do not give palifermin routinely (strong, high): its effect was modest (risk ratio for severe mucositis 0.81, 95% CI 0.69 to 0.95) against short-term harms, possible long-term effects on cancer outcomes, cost and availability. Do not give G-CSF to prevent mucositis (strong, high). Pooled risk ratios for severe mucositis, from trials in adults and children, were 0.49 for cryotherapy and 0.40 for photobiomodulation. The 2015 edition had made only weak recommendations, that cryotherapy, low-level light therapy or palifermin may be offered; the 2021 update strengthened the first two for named groups and reversed the third. The MASCC/ISOO 2020 guideline, which is not specific to children, adds multiagent oral care protocols during chemotherapy, head and neck radiotherapy and transplant (suggestion, level III) and dental evaluation before treatment (expert opinion), and differs on palifermin, which it recommends for haematological cancer with autologous transplant conditioned with high-dose chemotherapy and total body irradiation (level I).",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer", "multidisciplinary-team"],
    where: ["ward", "chemotherapy-day-unit", "radiotherapy-department", "home"],
  },
  population: "Children and adolescents aged 0 to 18 receiving treatment for cancer or undergoing haematopoietic stem cell transplant, as the paediatric guideline scopes it. The dental and mouth care steps rest on the MASCC/ISOO guideline, which is not specific to children; its own review of studies in children found limited or conflicting evidence and says data from adult studies may need to be extrapolated.",
  trigger: "A child is due to start chemotherapy, radiotherapy to the head and neck, or transplant conditioning likely to cause mucositis.",
  steps: [
    {
      action: "Arrange a dental evaluation, and any treatment needed, before cancer treatment starts",
      why: "The MASCC/ISOO panel found too little evidence that professional dental care prevents mouth sores, but thought a dental check desirable to lower the risk of infection starting from the teeth.",
      source: "mascc-isoo-2020",
      quote: "the panel is of the opinion that dental evaluation and treatment as indicated before cancer therapy are desirable to reduce risk for local and systemic infections from odontogenic sources.",
      grade: "Expert opinion (no guideline possible, LoE III)",
    },
    {
      action: "Put a daily mouth care routine in place (the routines studied combined toothbrushes, flossing and bland mouth rinses) and explain to the child and family why it matters",
      why: "MASCC/ISOO suggests that combined mouth care routines help prevent mouth sores during chemotherapy, head and neck radiotherapy and transplant, on a small number of trials. Its review of studies in children advises a basic mouth care routine while noting the lack of high-level evidence.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that implementation of multiagent combination oral care protocols is beneficial for the prevention of OM during CT.",
      grade: "LoE III (suggestion)",
    },
    {
      action: "For an older, cooperative child having a short infusion of melphalan or 5-fluorouracil, use oral cryotherapy: ice held in the mouth during the infusion",
      why: "Across trials in adults and children it lowered the rate of severe mucositis (risk ratio 0.49, 95% CI 0.31 to 0.76), and the panel valued the absence of documented harms and the low cost. Where the trials gave an infusion time, it was 30 minutes or less. The 2015 edition describes cryotherapy as ice cubes or ice chips placed in the mouth and replenished through the infusion, and notes that ice chips may be a choking hazard in very young children.",
      source: "cog-mucositis-2022",
      quote: "Use cryotherapy for older, cooperative pediatric patients receiving treatment for cancer or undergoing HSCT who will receive short infusions of melphalan or 5-fluorouracil.",
      grade: "Strong recommendation, High-quality evidence",
    },
    {
      action: "Consider cryotherapy for short infusions of other chemotherapy that causes mucositis, and tell families that sores can still happen",
      why: "The panel thought the benefit likely to carry over to other drugs, but the evidence is indirect and the effect may vary with the chemotherapy given. The panel did not believe cryotherapy feasible for administrations longer than an hour.",
      source: "cog-mucositis-2022",
      quote: "Consider using cryotherapy for older, cooperative pediatric patients receiving treatment for cancer or undergoing HSCT who will receive short infusions of chemotherapy associated with mucositis other than melphalan or 5-fluorouracil.",
      grade: "Conditional recommendation, Moderate-quality evidence",
    },
    {
      action: "For a child having an autologous or allogeneic transplant, or radiotherapy for head and neck carcinoma, give intraoral red-light photobiomodulation (620 to 750 nm)",
      why: "Across trials in adults and children it lowered the rate of severe mucositis (risk ratio 0.40, 95% CI 0.27 to 0.60) and was feasible across age groups. It needs specialised equipment, training and protective eyewear, and very young children need help from family and may not always manage it.",
      source: "cog-mucositis-2022",
      quote: "Use intraoral photobiomodulation therapy in the red light spectrum (620–750 nm) for pediatric patients undergoing autologous or allogeneic HSCT and for pediatric patients who will receive radiotherapy for head and neck carcinoma.",
      grade: "Strong recommendation, High-quality evidence",
    },
    {
      action: "Consider photobiomodulation for radiotherapy to other head and neck cancers, such as rhabdomyosarcoma",
      why: "The panel thought the benefit likely to carry over, but there were no direct data in these cancers.",
      source: "cog-mucositis-2022",
      quote: "Consider using intraoral photobiomodulation therapy in the red light spectrum (620–750 nm) for pediatric patients who will receive radiotherapy for head and neck cancers other than carcinoma.",
      grade: "Conditional recommendation, Moderate-quality evidence",
    },
    {
      action: "Do not give palifermin routinely",
      why: "It reduced severe mucositis only modestly, has known short-term side effects, may affect cancer outcomes in the long term, and is costly and of restricted availability.",
      source: "cog-mucositis-2022",
      quote: "Do not administer palifermin routinely to pediatric patients with cancer receiving treatment for cancer or undergoing HSCT.",
      grade: "Strong recommendation, High-quality evidence",
    },
    {
      action: "Do not give G-CSF to prevent mucositis",
      why: "The panel found no benefit for mucositis, with side effects and costs; children may still have G-CSF for other reasons, such as shortening neutropenia.",
      source: "cog-mucositis-2022",
      quote: "Do not administer GCSFs to pediatric patients receiving treatment for cancer or undergoing HSCT for the purpose of mucositis prevention.",
      grade: "Strong recommendation, High-quality evidence",
    },
  ],
  bestInClass: {
    statement: "For children, the POGO 2021 update endorsed by the Children's Oncology Group is the current guideline: cryotherapy for older, cooperative children on short melphalan or 5-fluorouracil infusions, red-light intraoral photobiomodulation for transplant and for radiotherapy for head and neck carcinoma, and no routine palifermin and no G-CSF for mucositis prevention. The MASCC/ISOO 2020 guideline, which is not specific to children, agrees on cryotherapy (autologous transplant with high-dose melphalan conditioning, and 30 minutes of cryotherapy with bolus 5-fluorouracil, both level II) and on photobiomodulation, which it recommends in adults (transplant, level I; head and neck radiotherapy, level II, or level I with chemotherapy). It adds oral care protocols, and differs on palifermin: MASCC/ISOO recommends intravenous KGF-1 (palifermin) for haematological cancer with autologous transplant conditioned with high-dose chemotherapy and total body irradiation (level I), where the paediatric panel makes a strong recommendation against routine use because of the modest effect, harms, possible long-term effects on cancer outcomes, cost and availability.",
    sources: ["cog-mucositis-2022", "patel-mucositis-2021", "mascc-isoo-2020"],
  },
  variants: [
    {
      name: "Palifermin in autologous transplant with total body irradiation (MASCC/ISOO)",
      differs: "Gives intravenous palifermin to prevent mucositis in people with haematological cancer having autologous transplant conditioned with high-dose chemotherapy and total body irradiation.",
      evidence: "MASCC/ISOO level I recommendation; the statement sets no age limit. The paediatric guideline makes a strong recommendation against routine use in children (risk ratio for severe mucositis 0.81).",
      sources: ["mascc-isoo-2020", "cog-mucositis-2022", "patel-mucositis-2021"],
    },
    {
      name: "The 2015 edition of the paediatric guideline (superseded)",
      differs: "Suggested that cryotherapy or low-level light therapy may be offered to cooperative children receiving chemotherapy or transplant conditioning with a high rate of mucositis, and that palifermin may be offered to children receiving transplant conditioning with a high rate of severe mucositis.",
      evidence: "All three were weak recommendations (cryotherapy on moderate-quality evidence; light therapy and palifermin on high-quality evidence). The 2021 update replaced them: strong for cryotherapy and photobiomodulation in named groups, and strong against routine palifermin. The Children's Oncology Group archived its endorsement of the earlier edition in April 2021.",
      sources: ["sung-mucositis-2017", "cog-mucositis-2022"],
    },
    {
      name: "Chlorhexidine mouthwash",
      differs: "Uses chlorhexidine rinses as part of mouth care with the aim of preventing mucositis.",
      evidence: "MASCC/ISOO suggests chlorhexidine not be used to prevent mucositis during head and neck radiotherapy (level III), and says this does not exclude its use for other reasons such as oral infection. The six recommendations reprinted by the Children's Oncology Group do not mention it.",
      sources: ["mascc-isoo-2020", "cog-mucositis-2022"],
    },
  ],
  grades: [
    { claim: "Cryotherapy for short melphalan or 5-fluorouracil infusions in older, cooperative children", grade: "Strong recommendation, High-quality evidence", source: "cog-mucositis-2022" },
    { claim: "Cryotherapy considered for other short infusions of chemotherapy associated with mucositis", grade: "Conditional recommendation, Moderate-quality evidence", source: "cog-mucositis-2022" },
    { claim: "Photobiomodulation for transplant and for radiotherapy for head and neck carcinoma", grade: "Strong recommendation, High-quality evidence", source: "cog-mucositis-2022" },
    { claim: "Photobiomodulation considered for radiotherapy for head and neck cancers other than carcinoma", grade: "Conditional recommendation, Moderate-quality evidence", source: "cog-mucositis-2022" },
    { claim: "No routine palifermin in children", grade: "Strong recommendation, High-quality evidence", source: "cog-mucositis-2022" },
    { claim: "No G-CSF for mucositis prevention", grade: "Strong recommendation, High-quality evidence", source: "cog-mucositis-2022" },
    { claim: "Multiagent oral care protocols during chemotherapy (not specific to children)", grade: "LoE III", source: "mascc-isoo-2020" },
    { claim: "Palifermin for haematological cancer with autologous transplant conditioned with high-dose chemotherapy and total body irradiation (not specific to children)", grade: "LoE I", source: "mascc-isoo-2020", quote: "The use of KGF‐1 intravenously is recommended for the prevention of OM in patients with hematologic cancer undergoing autologous HSCT with a conditioning regimen that includes high‐dose CT and TBI." },
    { claim: "Chlorhexidine not to be used to prevent mucositis during head and neck radiotherapy (not specific to children)", grade: "LoE III", source: "mascc-isoo-2020", quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT." },
    { claim: "Chewing gum not suggested for preventing mucositis in children having chemotherapy", grade: "LoE III", source: "mascc-isoo-2020", quote: "Chewing gum is not suggested for the prevention of OM in pediatric patients with hematological or solid cancer who receive CT." },
    { claim: "2015 edition: palifermin may be offered to children receiving transplant conditioning with a high rate of severe mucositis (superseded in 2021)", grade: "Weak recommendation, High-quality evidence", source: "sung-mucositis-2017", quote: "We suggest that KGF may be offered to children receiving HSCT conditioning with regimens associated with a high rate of severe mucositis." },
  ],
  sources: [
    { key: "cog-mucositis-2022", label: "Clinical practice guideline for the prevention of oral and oropharyngeal mucositis in pediatric cancer and hematopoietic stem cell transplant patients: 2021 update (COG endorsement, version date 7 February 2022)", publisher: "Children's Oncology Group", year: 2022, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_Mucositis_Guideline_Document_07FEB2022-new-logo.pdf", gradingScheme: "GRADE, reprinted from the source guideline: strong, or weak or conditional, recommendation, with high, moderate, low or very low quality evidence.", read: "full-text", accessed: "2026-11-17" },
    { key: "patel-mucositis-2021", label: "Clinical practice guideline for the prevention of oral and oropharyngeal mucositis in pediatric cancer and hematopoietic stem cell transplant patients: 2021 update", publisher: "Pediatric Oncology Group of Ontario, European Journal of Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34252760", doi: "10.1016/j.ejca.2021.05.013", gradingScheme: "GRADE, as reprinted in the Children's Oncology Group endorsement; the abstract prints no grades.", read: "abstract", accessed: "2026-11-17" },
    { key: "sung-mucositis-2017", label: "Guideline for the prevention of oral and oropharyngeal mucositis in children receiving treatment for cancer or undergoing haematopoietic stem cell transplantation (the earlier edition; published online 2015)", publisher: "Pediatric Oncology Group of Ontario, BMJ Supportive & Palliative Care", year: 2017, url: "https://europepmc.org/article/PMC/PMC5339548", doi: "10.1136/bmjspcare-2014-000804", gradingScheme: "GRADE: strong or weak recommendation, with the quality of evidence printed beside it.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-isoo-2020", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy", publisher: "MASCC and ISOO, Cancer", year: 2020, url: "https://europepmc.org/article/PMC/PMC7540329", doi: "10.1002/cncr.33100", gradingScheme: "A level of evidence (LoE) is printed beside each statement, I, II or III in the table used here; each guideline is classed as a recommendation, a suggestion or no guideline possible, and an expert opinion is added to some where no guideline was possible.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-isoo-paediatric-2021", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis: sub-analysis of current interventions for the management of oral mucositis in pediatric cancer patients", publisher: "MASCC and ISOO, Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/33156403", doi: "10.1007/s00520-020-05803-4", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-oral-cryotherapy-with-bolus-chemotherapy"],
  gaps: [
    "The full text of the paediatric 2021 guideline was not read: on 17 November 2026 the publisher's PDF answered a script with a browser check and there is no copy in PubMed Central. It was read through the Children's Oncology Group endorsement document, which reprints the six recommendations, grades and remarks, and through the abstract. The photobiomodulation settings (wavelength apart), the timing of cryotherapy and any wider discussion are not given here.",
    "How cryotherapy is given (ice cubes or chips in the mouth, replenished through the infusion) is taken from the 2015 edition, not from the 2021 text. The 2015 edition adds that flavoured ice lollies or slushy drinks are likely to be more acceptable to children than plain ice.",
    "The Children's Oncology Group document reprints no recommendation on basic mouth care, chlorhexidine or other mouthwashes, and the 2015 edition says it did not address oral hygiene. The dental and mouth care steps rest on MASCC/ISOO, whose review of studies in children (read as an abstract only) found limited or conflicting evidence for every intervention except chewing gum, which did not work.",
    "An erratum to the MASCC/ISOO 2020 guideline was published in Cancer in 2021 (10.1002/cncr.33549). On 17 November 2026 its text could not be read (Europe PMC returned an error and the PubMed Central record carried no body), so what it corrects is not known here.",
    "Cryotherapy was not feasible in young children, and the recommendations name no other prevention for a young child having chemotherapy outside a transplant or head and neck radiotherapy.",
    "This protocol covers prevention only. Treating mouth sores once they appear, and the pain they cause, is outside the paediatric guideline and is not covered here.",
    "The Children's Oncology Group says it archives an endorsed guideline six years after publication whether or not an update exists. A Europe PMC search on 17 November 2026 found no later paediatric mucositis prevention guideline.",
    "Photobiomodulation needs equipment and trained staff; how many centres can offer it has not been measured here.",
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
