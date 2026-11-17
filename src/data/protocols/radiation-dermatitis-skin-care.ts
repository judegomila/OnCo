import { protocol } from "./helpers";

/*
 * Skin care during external beam radiotherapy, and prevention and management of acute radiation dermatitis.
 *
 * First written on 11 November 2026 from abstracts and one full text. Second accuracy pass on 17 November 2026: every
 * source was fetched again raw with curl and read as text, and every quote was checked by script against the saved text.
 * - Society and College of Radiographers, Radiation dermatitis guidelines for radiotherapy healthcare professionals
 *   (second revised edition, April 2020): the page on sor.org, which returned 404 on 11 November, answered on 17 November
 *   and the 191-page PDF was read in full as text (pdftotext). It includes the patient information sheet as text. The
 *   separate A5 leaflet PDFs are images with no text layer and were not used.
 * - Practical recommendations for the management of radiodermatitis, on behalf of the ESTRO RTT committee (Radiation
 *   Oncology 2025): found in this pass, full text, Europe PMC XML (PMC11954187). It prints a strength and a quality of
 *   evidence for each recommendation.
 * - MASCC guidelines part 1, the systematic review (EClinicalMedicine 2023): full text, Europe PMC XML (PMC10166790).
 * - MASCC guidelines part 2, the Delphi consensus recommendations (Behroozian et al., Lancet Oncol 2023): abstract only
 *   (Europe PMC). The publisher's page answered a script with a redirect page and no text; no open copy was found.
 * - MASCC clinical practice statements on film dressings (2025), topical corticosteroids (2026) and barrier-forming
 *   topical agents (2026), all in Supportive Care in Cancer: abstracts only (Europe PMC). The publisher's page answered
 *   with a browser check, which was not worked round.
 * - Canadian modified Delphi consensus for breast cancer (Int J Radiat Oncol Biol Phys 2025): abstract only.
 * - ONS Guidelines for cancer treatment-related radiodermatitis (Oncol Nurs Forum 2020): abstract only; the ons.org page
 *   was requested once and shows the abstract, not the recommendations.
 * - Chan et al., washing (Support Care Cancer 2023), and Salvestrini et al., deodorant (Support Care Cancer 2023):
 *   abstracts only. A correction to the Chan paper (January 2024) exists and its text could not be read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const radiationDermatitisSkinCare = protocol({
  id: "radiation-dermatitis-skin-care",
  name: "Skin care during radiotherapy and acute radiation dermatitis",
  aka: ["radiation dermatitis", "radiodermatitis", "radiotherapy skin reaction", "radiotherapy skin care", "moist desquamation", "Mepitel film", "StrataXRT", "mometasone for radiotherapy skin", "can I wash during radiotherapy", "deodorant during radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy often makes the treated skin pinker or darker, dry, itchy and sore, and sometimes it blisters or peels. Wash gently with your usual products, and keep using your moisturiser and deodorant unless they irritate. If your risk is high, your team may suggest a film dressing or a steroid cream. Tell them if the skin blisters, peels or hurts. It can worsen for 10 to 14 days after treatment.",
  simple: "The treated skin can change colour and get dry, itchy or sore. You can wash it gently, moisturise and use deodorant. Tell your team if it blisters, peels or hurts.",
  summary: "For every patient. The UK Society and College of Radiographers guideline (2020) and the ESTRO radiation therapist committee (2025) both ask for a baseline skin and risk assessment, washing, a moisturiser and no ban on deodorant; ESTRO grades washing and deodorant as strong recommendations on level 1 evidence. Two 2023 meta-analyses agree: washing with or without soap reduced severe dermatitis (OR 0.32) and moist desquamation (OR 0.25), and deodorant made no significant difference in five breast trials. The MASCC 2023 systematic review found that washing and deodorant do not worsen dermatitis but judged the evidence insufficient to recommend them as prevention. The Canadian breast Delphi (2025) reached consensus for education, moisturising and washing in low-risk and high-risk patients. The ONS guideline (2020, GRADE) made a conditional recommendation for deodorant and suggested against emu oil, calendula and non-steroidal agents.\n\nProducts for prevention, where the sources differ. The MASCC 2023 Delphi guideline (42 experts, at least 75% consensus) recommends photobiomodulation and Mepitel film in breast cancer, Hydrofilm, mometasone, betamethasone and olive oil, and says clinicians can consider them. MASCC clinical practice statements since then recommend Mepitel film or Hydrofilm in breast and selected head and neck cancers (2025), topical steroid, preferably medium potency such as mometasone furoate 0.1% cream, for selected high-risk head and neck and breast patients (2026), and barrier-forming agents, StrataXRT having the most evidence, for patients at considerable risk of high-grade dermatitis (2026). The UK guideline of 2020 is more cautious: it recommends steroid cream only for patients at high risk of high-grade dermatitis and not as early prevention in breast radiotherapy, found the film and dressing studies not significant enough to recommend a change in practice, and wanted more research before photobiomodulation is used widely. ESTRO 2025 says steroid cream and films can be considered and photobiomodulation may be used.\n\nManagement. MASCC 2023 recommends Mepilex Lite dressings for established dermatitis; the Canadian panel also reached consensus for betamethasone valerate, mometasone furoate, saline soaks or cold compresses and barrier creams. The 2026 steroid statement gives topical steroid as an option for early dermatitis without moist desquamation and asks for weekly skin review, stopping the steroid if moist desquamation appears. For broken skin the UK guideline and ESTRO recommend non-adhesive or soft silicone dressings. The MASCC, Canadian and ONS documents were read as abstracts only.",
  asOf: "2026-11-17",
  setting: {
    who: ["radiographer", "nurse", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department", "home"],
  },
  population: "Adults having external beam radiotherapy, in any cancer; most trials are in breast and head and neck cancer. The MASCC film and steroid statements are scoped to breast and head and neck cancer, the Canadian consensus to breast cancer, and the deodorant meta-analysis to breast radiotherapy. Children, late radiation skin changes and fibrosis, and dermatitis with EGFR inhibitors (cetuximab) are not covered here.",
  trigger: "The start of a course of external beam radiotherapy, and each weekly review during it.",
  steps: [
    {
      action: "Before treatment starts, record the condition of the skin and the patient's usual skin care, and identify whether the patient is at low, medium or high risk of a skin reaction",
      why: "The UK guideline lists things that raise the risk, such as skin folds in the treated area, smoking and a higher dose, and asks that people at higher risk are checked more often.",
      source: "scor-dermatitis-2020",
      quote: "Prior to the start of radiotherapy, patients should be identified as being at low, medium or high risk based on intrinsic and extrinsic factors.",
      grade: "Key principle 1 of 8 (systematic review and expert consensus; no grade printed)",
    },
    {
      action: "Explain how the skin may react and how to care for it",
      why: "A panel of 19 Canadian experts agreed that every patient with breast cancer, at low or high risk, should have this teaching. The UK guideline also asks for self-care advice before treatment.",
      source: "canadian-delphi-breast-2025",
      quote: "After the four rounds, consensus for recommendation was reached for 3 prevention interventions in both low- and high-risk patients: prevention care education, moisturizing, and washing.",
      grade: "Delphi consensus (19 Canadian experts, breast cancer)",
    },
    {
      action: "Tell the patient they can wash the treated skin, with or without soap",
      why: "In two pooled trials washing led to fewer severe skin reactions and less moist peeling, and one trial found better quality of life. The UK guideline says to wash gently with soap and water and gently pat dry.",
      source: "chan-washing-2023",
      quote: "Given the QoL benefits of washing, it should be advocated as part of routine skin care during RT.",
      grade: "Systematic review and meta-analysis of randomised trials",
    },
    {
      action: "Advise the patient to keep using the moisturiser they prefer, or to start one if they do not use one",
      why: "No one moisturiser has been shown to be better than another, so the UK guideline leaves the choice to the patient. Its patient sheet says to stop moisturiser on any area that blisters or peels and to ask the team.",
      source: "scor-dermatitis-2020",
      quote: "Advise the patient to continue moisturising with preferred products.",
      grade: "Table 11 guidance (no grade printed)",
    },
    {
      action: "Let the patient keep using their usual deodorant, stopping it if it irritates or if the skin breaks",
      why: "Five trials in breast radiotherapy found that deodorant or antiperspirant did not significantly change skin reactions, itching or pain. The UK guideline says the same and adds the exception for irritation.",
      source: "estro-rtt-2025",
      quote: "The use of deodorant is allowed unless the skin is broken",
      grade: "QoE L1, Strong recommendation",
    },
    {
      action: "For patients with breast cancer, and selected head and neck patients, consider a film dressing (Mepitel Film or Hydrofilm) from the start of treatment",
      why: "Several trials found these films reduced how often and how badly the skin reacted, most clearly for moist peeling. The UK guideline of 2020 did not find the studies it reviewed strong enough to recommend a change in practice.",
      source: "mascc-film-cps-2025",
      quote: "Prophylactic use of Mepitel Film and Hydrofilm is recommended for reducing the severity of ARD in breast cancer and selected head and neck cancer patients.",
      grade: "MASCC clinical practice statement (literature review and expert consensus)",
    },
    {
      action: "For selected head and neck or breast patients at high risk, consider a steroid cream, preferably medium potency such as mometasone furoate 0.1% cream, on unbroken skin",
      why: "The MASCC review found mometasone prevented skin reactions and redness across eight randomised trials. The UK guideline also keeps steroid cream for people at high risk, and both it and ESTRO say not to use it on broken skin.",
      source: "mascc-steroid-cps-2026",
      quote: "TCs are recommended for the prevention of ARD in selected patients with head and neck and breast cancers at a high risk of ARD.",
      grade: "MASCC clinical practice statement (literature review and expert discussion)",
    },
    {
      action: "For patients at considerable risk of a high-grade reaction, particularly where the treated area has an irregular contour such as the head and neck, consider a barrier-forming topical agent",
      why: "MASCC recommends these products for this group and says StrataXRT has the strongest evidence among them; it wants better data before they are used routinely at other sites.",
      source: "mascc-barrier-cps-2026",
      quote: "Barrier-forming topical agents are recommended for patients undergoing radiotherapy who are at considerable risk of developing high‑grade ARD, particularly in treatment sites with irregular anatomical contours, such as head and neck cancers.",
      grade: "MASCC clinical practice statement (literature review and expert discussion)",
    },
    {
      action: "Check the skin weekly during treatment, and stop a steroid cream if moist desquamation (broken, weeping skin) or another complication appears",
      why: "The UK guideline also asks for a formal skin assessment at least weekly, and lists broken skin and signs of infection as reasons not to use steroid cream.",
      source: "mascc-steroid-cps-2026",
      quote: "Healthcare professionals should monitor patients' skin weekly during radiation and guide steroid use, discontinuing it if moist desquamation or other complications arise.",
      grade: "MASCC clinical practice statement (literature review and expert discussion)",
    },
    {
      action: "For established dermatitis, consider a Mepilex Lite dressing",
      why: "In the MASCC review, three randomised trials favoured this dressing over aqueous cream or standard wound care.",
      source: "mascc-delphi-2023",
      quote: "Mepilex Lite dressings were recommended for the management of acute radiation dermatitis.",
      grade: "Delphi consensus (at least 75% of 42 experts)",
    },
    {
      action: "If the skin breaks, advise the patient to stop creams on that area, cover it with a non-adhesive or low-adhesion silicone dressing, and assess the skin daily",
      why: "A suitable dressing lowers the risk of further damage and infection. The UK guideline also asks for a swab if there are signs of infection, and for pain relief to be prescribed if needed.",
      source: "scor-dermatitis-2020",
      quote: "use an appropriate dressing/product to reduce further trauma and infection. Suitable products would be non-adhesive or silicone low adhesion.",
      grade: "Summary of skin care advice (no grade printed)",
    },
    {
      action: "At the end of treatment, tell the patient the reaction may get worse and peak around 10 to 14 days after the last session, and whom to contact if it worries them",
      why: "The reaction can keep building after the last session before it improves. The UK patient sheet says most people find their skin has improved about 4 weeks after treatment.",
      source: "scor-dermatitis-2020",
      quote: "Inform patients of the potential for skin reactions to worsen and ‘peak’ around 10–14 days after the last treatment session.",
      grade: "Guidance for the end of radiotherapy (no grade printed)",
    },
  ],
  bestInClass: {
    statement: "For everyone: a baseline skin and risk assessment and teaching before treatment, gentle washing with soap and water, the moisturiser the patient prefers, their usual deodorant unless it irritates or the skin breaks, and a skin check at least weekly (SCoR 2020; ESTRO 2025, strong recommendations; Canadian Delphi 2025; Chan 2023 and Salvestrini 2023 meta-analyses; ONS 2020 conditional for deodorant). None of the sources read advises against washing, and none advises against deodorant on intact skin. For high-risk patients the sources differ on products. MASCC recommends prophylaxis chosen by site: Mepitel film or Hydrofilm in breast and selected head and neck cancer (2023, 2025), topical steroid, preferably medium potency such as mometasone furoate 0.1% cream, in selected high-risk breast or head and neck patients (2023, 2026), photobiomodulation in breast cancer (2023), or a barrier-forming agent on irregular contours (2026). The UK SCoR guideline (2020) agrees on steroid cream for patients at high risk of high-grade dermatitis only, but does not recommend early steroid for breast radiotherapy, did not find the film studies significant enough to change practice, and asked for more research on photobiomodulation. ESTRO 2025 sits between them: steroid cream can be considered (strong, level 1), films or dressings can be considered (conditional, level 1), and photobiomodulation may be used (conditional, level 2). For established dermatitis, Mepilex Lite (MASCC 2023) or another soft silicone dressing (ESTRO 2025, strong, level 1); on broken skin a non-adhesive or low-adhesion silicone dressing (SCoR 2020).",
    sources: ["scor-dermatitis-2020", "estro-rtt-2025", "mascc-delphi-2023", "mascc-systematic-review-2023", "mascc-film-cps-2025", "mascc-steroid-cps-2026", "mascc-barrier-cps-2026", "chan-washing-2023", "salvestrini-deodorant-2023", "canadian-delphi-breast-2025", "ons-radiodermatitis-2020"],
  },
  variants: [
    {
      name: "Advice not to wash the treated area or use deodorant",
      differs: "Traditional advice told people not to wash the treated skin, or to use water without soap, and not to use deodorant.",
      evidence: "Not supported by any source read: washing reduced severe dermatitis in pooled trials (OR 0.32, 95% CI 0.19 to 0.55), and deodorant did not significantly change grade 1 or worse, grade 2 or worse, or grade 3 dermatitis in five breast trials. The UK guideline calls the advice unnecessary and reports from a 2014 survey of UK departments that 74% restricted washing (no soap, or named brands only) and 55% advised against deodorant under the arm on the treated side in breast cancer. No later figure was found in the sources read.",
      sources: ["chan-washing-2023", "salvestrini-deodorant-2023", "mascc-systematic-review-2023", "scor-dermatitis-2020", "estro-rtt-2025"],
    },
    {
      name: "Topical steroid for every patient rather than only those at high risk",
      differs: "A steroid cream such as mometasone is offered to all patients from the start, not only to those at high risk.",
      evidence: "MASCC 2023 recommends mometasone and betamethasone for prevention without restricting them to high-risk patients in its abstract; the 2026 MASCC statement and the Canadian panel recommend them for high-risk patients. The systematic review found mometasone effective across eight randomised trials of doubtful and adequate quality. The UK guideline (2020) recommends steroid cream only for patients at high risk of high-grade dermatitis, and not as early prevention for breast radiotherapy, because most UK breast patients have a hypofractionated course in which the benefit may not carry over. ESTRO 2025 says it can be considered when the skin is not broken (strong, level 1).",
      sources: ["mascc-delphi-2023", "mascc-steroid-cps-2026", "canadian-delphi-breast-2025", "mascc-systematic-review-2023", "scor-dermatitis-2020", "estro-rtt-2025"],
    },
    {
      name: "Photobiomodulation",
      differs: "Low-level laser light is applied to the treated skin to prevent a reaction.",
      evidence: "Recommended by MASCC 2023 for prevention in breast cancer. One trial in 46 head and neck patients found grade 2 to 3 dermatitis in 28.6% with it against 77.8% without (reported in the MASCC systematic review). ESTRO 2025 says it may be used to prevent higher grades (conditional, level 2). The UK guideline (2020) asked for more research on long-term effects before it is recommended for widespread use.",
      sources: ["mascc-delphi-2023", "mascc-systematic-review-2023", "estro-rtt-2025", "scor-dermatitis-2020"],
    },
    {
      name: "Aloe vera, calendula and other creams",
      differs: "Aloe vera, calendula, emu oil or other non-steroidal creams are used to prevent reactions.",
      evidence: "ONS 2020 suggested against emu oil, calendula and non-steroidal interventions and recommended aloe vera only within a trial. The MASCC 2023 systematic review found inconsistent evidence for aloe vera and calendula, and olive oil is the only product of this kind among the six MASCC 2023 recommended. The UK guideline (2020) says a wide variety of topical products is still used locally, often with little or no evidence, and that the evidence neither supports nor refutes any particular product.",
      sources: ["ons-radiodermatitis-2020", "mascc-delphi-2023", "mascc-systematic-review-2023", "scor-dermatitis-2020"],
    },
  ],
  grades: [
    { claim: "Prevention: photobiomodulation and Mepitel film in breast cancer, Hydrofilm, mometasone, betamethasone and olive oil", grade: "Delphi consensus (at least 75% of 42 experts)", source: "mascc-delphi-2023", quote: "Six interventions could be recommended for the prevention of acute radiation dermatitis: photobiomodulation therapy and Mepitel film in people with breast cancer, Hydrofilm, mometasone, betamethasone, and olive oil." },
    { claim: "Most interventions were not recommended", grade: "Delphi consensus", source: "mascc-delphi-2023", quote: "Most interventions were not recommended due to insufficient evidence, conflicting evidence, or lack of consensus to support use, suggesting a need for further research." },
    { claim: "Washing and deodorant do not worsen dermatitis but are not proven to prevent it", grade: "Systematic review (149 randomised trials among 235 studies)", source: "mascc-systematic-review-2023", quote: "Based on evidence from multiple RCTs, aluminum/deodorant use and washing with water and soap do not worsen ARD, but there is insufficient evidence to support their use in the prevention of ARD." },
    { claim: "Washing with or without soap reduces severe dermatitis and moist desquamation", grade: "Meta-analysis of two randomised trials", source: "chan-washing-2023", quote: "Washing with or without soap significantly reduced the incidence of severe RD (OR: 0.32, 95% CI: 0.19-0.55, p < 0.01) and moist desquamation (OR: 0.25, 95% CI: 0.12-0.52, p < 0.01)." },
    { claim: "Daily washing", grade: "QoE L1, Strong recommendation", source: "estro-rtt-2025", quote: "Ensure good hygiene by washing the skin daily, preferably with lukewarm water and gentle drying of the treatment area" },
    { claim: "The evidence does not support advising against deodorant in breast radiotherapy", grade: "Meta-analysis of five randomised trials", source: "salvestrini-deodorant-2023", quote: "As such, the current evidence does not support recommendation against antiperspirant/deodorant use during RT." },
    { claim: "Medium-potency steroid preferred", grade: "MASCC clinical practice statement", source: "mascc-steroid-cps-2026", quote: "Medium potency TCs, such as mometasone furoate 0.1% cream, are preferred." },
    { claim: "Steroid cream can be considered on unbroken skin", grade: "QoE L1, Strong recommendation", source: "estro-rtt-2025", quote: "The use of corticoid creams or topical steroid can be considered (but only when the skin is not broken)" },
    { claim: "Steroid cream for prevention only in patients at high risk", grade: "No grade printed (systematic review and expert consensus)", source: "scor-dermatitis-2020", quote: "Therefore, the use of steroid-based cream is only recommended for RISR prevention in patients assessed as being at high risk of developing a high-grade radiation dermatitis." },
    { claim: "Films and dressings can be considered", grade: "QoE L1, Conditional recommendation", source: "estro-rtt-2025", quote: "The use of barrier films or (semipermeable) dressings can be considered" },
    { claim: "Films and dressings: no change in practice recommended in 2020", grade: "No grade printed (systematic review and expert consensus)", source: "scor-dermatitis-2020", quote: "However, the results of studies included in this review are not significant enough to recommend a change in practice." },
    { claim: "Photobiomodulation may be used", grade: "QoE L2, Conditional recommendation", source: "estro-rtt-2025", quote: "Photo-biomodulation or low-level laser therapy may be used to prevent higher grades of RID" },
    { claim: "Among barrier-forming agents, StrataXRT has the most evidence", grade: "MASCC clinical practice statement", source: "mascc-barrier-cps-2026", quote: "Among these agents, StrataXRT currently has the most robust supporting evidence." },
    { claim: "Soft silicone dressings for grade 2 dermatitis", grade: "QoE L1, Strong recommendation", source: "estro-rtt-2025", quote: "Apply self-adhesive soft silicone dressings on the irradiated skin" },
    { claim: "Conditional recommendation for deodorant; aloe vera and oral curcumin only within a trial; against emu oil, calendula and non-steroidal interventions", grade: "GRADE (ONS); the individual grades are in the full text, not read", source: "ons-radiodermatitis-2020", quote: "The panel agreed on eight recommendations and made a conditional recommendation for deodorant/antiperspirant." },
  ],
  sources: [
    {
      key: "mascc-delphi-2023",
      label: "Multinational Association of Supportive Care in Cancer (MASCC) clinical practice guidelines for the prevention and management of acute radiation dermatitis: international Delphi consensus-based recommendations",
      publisher: "MASCC (Lancet Oncology; Behroozian et al.)",
      year: 2023,
      url: "https://doi.org/10.1016/S1470-2045(23)00067-0",
      doi: "10.1016/S1470-2045(23)00067-0",
      gradingScheme: "Four-round Delphi of 42 international experts; an intervention was recommended when it reached at least 75% consensus.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-systematic-review-2023",
      label: "MASCC clinical practice guidelines for the prevention and management of acute radiation dermatitis: part 1) systematic review",
      publisher: "MASCC (EClinicalMedicine)",
      year: 2023,
      url: "https://doi.org/10.1016/j.eclinm.2023.101886",
      doi: "10.1016/j.eclinm.2023.101886",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-film-cps-2025",
      label: "MASCC oncodermatology clinical practice statement: prevention and management of acute radiation dermatitis with Mepitel Film and Hydrofilm",
      publisher: "MASCC (Supportive Care in Cancer)",
      year: 2025,
      url: "https://doi.org/10.1007/s00520-025-10218-0",
      doi: "10.1007/s00520-025-10218-0",
      gradingScheme: "Clinical practice statement: literature review and expert consensus of the MASCC Oncodermatology Study Group; the abstract prints no grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-steroid-cps-2026",
      label: "MASCC clinical practice statement: prevention and management of acute radiation dermatitis using topical corticosteroids",
      publisher: "MASCC (Supportive Care in Cancer)",
      year: 2026,
      url: "https://doi.org/10.1007/s00520-026-10659-1",
      doi: "10.1007/s00520-026-10659-1",
      gradingScheme: "Clinical practice statement: MEDLINE search to 23 November 2025 and structured expert discussion; the abstract prints no grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-barrier-cps-2026",
      label: "MASCC oncodermatology clinical practice statement: prevention of acute radiation dermatitis using barrier-forming topical agents",
      publisher: "MASCC (Supportive Care in Cancer)",
      year: 2026,
      url: "https://doi.org/10.1007/s00520-026-11244-2",
      doi: "10.1007/s00520-026-11244-2",
      gradingScheme: "Clinical practice statement: literature search to 23 April 2026 and structured expert discussion; the abstract prints no grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "estro-rtt-2025",
      label: "Practical recommendations for the management of radiodermatitis: on behalf of the ESTRO RTT committee",
      publisher: "ESTRO Radiation Therapist (RTT) Committee (Radiation Oncology; Forde et al.)",
      year: 2025,
      url: "https://doi.org/10.1186/s13014-025-02624-9",
      doi: "10.1186/s13014-025-02624-9",
      gradingScheme: "Strength strong or conditional, rated in conformity with the ASTRO guideline methodology guide; quality of evidence (QoE) from Level 1, a systematic review or meta-analysis of at least 2 good randomised studies, to Level 4, expert opinion or no evidence referenced.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "canadian-delphi-breast-2025",
      label: "Modified Delphi consensus on interventions for acute radiation dermatitis in breast cancer: a Canadian expert perspective",
      publisher: "International Journal of Radiation Oncology, Biology, Physics",
      year: 2025,
      url: "https://doi.org/10.1016/j.ijrobp.2024.12.037",
      doi: "10.1016/j.ijrobp.2024.12.037",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "ons-radiodermatitis-2020",
      label: "ONS Guidelines for Cancer Treatment-Related Radiodermatitis",
      publisher: "Oncology Nursing Society (Oncology Nursing Forum)",
      year: 2020,
      url: "https://doi.org/10.1188/20.ONF.654-670",
      doi: "10.1188/20.ONF.654-670",
      gradingScheme: "GRADE methodology, with the certainty of the evidence assessed by the GRADE approach; the abstract names one recommendation as conditional and does not print the others' grades.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "chan-washing-2023",
      label: "Prevention of radiation dermatitis with skin hygiene and washing: a systematic review and meta-analysis",
      publisher: "Supportive Care in Cancer (Chan et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s00520-023-07720-8",
      doi: "10.1007/s00520-023-07720-8",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "salvestrini-deodorant-2023",
      label: "The effect of antiperspirant and deodorant use on acute radiation dermatitis in breast cancer patients during radiotherapy: a systematic review and meta-analysis",
      publisher: "Supportive Care in Cancer (Salvestrini et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s00520-023-07657-y",
      doi: "10.1007/s00520-023-07657-y",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "scor-dermatitis-2020",
      label: "Radiation Dermatitis Guidelines for Radiotherapy Healthcare Professionals, second revised edition (April 2020)",
      publisher: "Society and College of Radiographers",
      year: 2020,
      url: "https://www.sor.org/learning-advice/professional-body-guidance-and-publications/documents-and-publications/policy-guidance-document-library/radiation-dermatitis-guidelines-for-radiotherapy-h",
      gradingScheme: "No grades are printed: eight key principles and a summary of skin care advice, from a systematic review and expert consensus.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["breast-cancer", "head-and-neck"],
  drugs: ["mometasone"],
  technologies: ["photobiomodulation-mucositis"],
  terms: ["radiation-dermatitis", "radiotherapy"],
  related: ["breast-radiotherapy-positioning-and-setup"],
  upgrades: ["idea-pu-washing-and-deodorant-during-radiotherapy"],
  gaps: [
    "The full text of the MASCC 2023 Delphi guideline is paywalled and was not read; the recommendations here are those its abstract names, and any conditions or grading in the full text are not stated. On 17 November 2026 the publisher's page still gave a script no text.",
    "The three MASCC clinical practice statements (2025 and 2026), the Canadian consensus and the two 2023 meta-analyses were read as abstracts only on 17 November 2026: how to apply a film, how often and for how long to use a steroid cream, and which barrier product to choose are in their full texts and are not stated here.",
    "The UK Society and College of Radiographers guideline (second revised edition, April 2020) was read in full on 17 November 2026. It prints a review date of 2025; the Society's page still shows the 2020 edition and no later one. It was written before the MASCC 2023 guideline and before the 2022 Mepitel film trial that the MASCC review reports.",
    "The ONS 2020 guideline was read as an abstract; its eight recommendations and their GRADE certainty are not listed here.",
    "Who counts as high risk is not defined the same way in every source. The UK guideline names a bolus, smoking, a total dose above 40 Gy and a high body mass index as likely to raise the risk and says more research is needed to weigh them; the MASCC statements and the Canadian consensus define high risk in full texts that were not read.",
    "The washing meta-analysis pooled only two trials, and the MASCC review judged the same evidence insufficient for a prevention recommendation; the sources agree that washing does no harm. A correction to the washing meta-analysis was published in January 2024 (DOI 10.1007/s00520-024-08312-w); on 17 November 2026 its text could not be read, so what it corrects is not known. The figures quoted here are those in the abstract held by Europe PMC.",
    "The technology record linked for photobiomodulation describes its use for oral mucositis; no OnCo record covers photobiomodulation for the skin.",
    "Sun protection is covered only briefly by the sources: the UK guideline and ESTRO advise keeping the treated area out of the sun and using SPF 50 sunscreen. Long-term skin care, late effects and fibrosis are not covered here.",
  ],
});
