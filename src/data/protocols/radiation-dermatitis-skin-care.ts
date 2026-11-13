import { protocol } from "./helpers";

/*
 * Skin care during external beam radiotherapy, and prevention and management of acute radiation dermatitis.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - MASCC clinical practice guidelines for acute radiation dermatitis, part 2: international Delphi consensus
 *   recommendations (Behroozian et al., Lancet Oncol 2023): abstract only (Europe PMC). The full text is paywalled and
 *   was not read, so the strength and wording of individual recommendations beyond the abstract are not stated here.
 * - MASCC guidelines part 1, the systematic review behind them (EClinicalMedicine 2023): full text, Europe PMC XML
 *   (PMC10166790).
 * - MASCC Oncodermatology clinical practice statements: film dressings (2025), topical corticosteroids (2026) and
 *   barrier-forming topical agents (2026), all in Supportive Care in Cancer: abstracts only.
 * - Canadian modified Delphi consensus for breast cancer (Int J Radiat Oncol Biol Phys 2025): abstract only.
 * - ONS Guidelines for cancer treatment-related radiodermatitis (Oncol Nurs Forum 2020): abstract only; ons.org was not
 *   tried with a script because the ONS guideline pages are known in this project to refuse one.
 * - Chan et al., washing and skin hygiene, systematic review and meta-analysis (Support Care Cancer 2023), and Salvestrini
 *   et al., antiperspirant and deodorant meta-analysis (Support Care Cancer 2023): abstracts only.
 * - Society and College of Radiographers, Radiation dermatitis guidelines for radiotherapy healthcare professionals
 *   (2020): not reachable. The page on sor.org returns 404 (Internet Archive captures show it live until 2024, and 404
 *   from October 2025); the guideline PDF itself was not captured by the Internet Archive. The 2020 patient leaflet
 *   was captured but its layout breaks into fragments as text, so it is not quoted.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 */
export const radiationDermatitisSkinCare = protocol({
  id: "radiation-dermatitis-skin-care",
  name: "Skin care during radiotherapy and acute radiation dermatitis",
  aka: ["radiation dermatitis", "radiodermatitis", "radiotherapy skin reaction", "radiotherapy skin care", "moist desquamation", "Mepitel film", "StrataXRT", "mometasone for radiotherapy skin", "can I wash during radiotherapy", "deodorant during radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy often makes the treated skin pink or darker, dry, itchy and sore, and sometimes it peels. Wash the area gently with water and mild soap, use your usual moisturiser and keep using deodorant unless it stings. If your risk is high, as with breast or head and neck treatment, your team may suggest a thin film dressing or a steroid cream from the start. Report blisters or pain.",
  simple: "The treated skin can get red, dry, itchy or sore. You can wash it gently, moisturise and use deodorant. Tell your team if it blisters, peels or hurts.",
  summary: "Prevention. The MASCC 2023 Delphi guideline (42 experts, interventions reaching 75% consensus) recommends six interventions for prevention: photobiomodulation and Mepitel film in breast cancer, Hydrofilm, mometasone, betamethasone and olive oil; most others were not recommended for lack or conflict of evidence. Its systematic review found that washing with water and soap and deodorant use do not worsen dermatitis but did not find enough evidence to recommend them for prevention. Two 2023 meta-analyses go further: washing with or without soap reduced severe dermatitis (OR 0.32) and moist desquamation (OR 0.25), and deodorant made no difference, so the evidence does not support advising against it. The Canadian breast Delphi (2025) reached consensus for education, moisturising and washing for every patient, and Mepitel film and mometasone for high-risk patients. MASCC clinical practice statements since then recommend Mepitel film or Hydrofilm prophylaxis in breast and selected head and neck cancers (2025), medium-potency topical steroid such as mometasone furoate 0.1% for high-risk head and neck and breast patients (2026), and barrier-forming agents, StrataXRT having the most evidence, where the contour is irregular (2026). The ONS guideline (2020, GRADE) made a conditional recommendation for deodorant and suggested against emu oil, calendula and non-steroidal agents.\n\nManagement. MASCC 2023 recommends Mepilex Lite dressings for established dermatitis; the 2026 steroid statement allows topical steroid for early dermatitis without moist desquamation and asks for weekly skin review, stopping the steroid if moist desquamation appears. Most of this rests on abstracts; the full MASCC 2023 text and the UK Society of Radiographers guideline could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["radiographer", "nurse", "doctor", "patient-or-carer"],
    where: ["radiotherapy-department", "home"],
  },
  population: "Adults having external beam radiotherapy, in any cancer; most trials are in breast and head and neck cancer, and the film dressings, topical steroid and barrier-agent statements are scoped to those sites or to high-risk patients. Children, late radiation skin changes and fibrosis, and dermatitis with EGFR inhibitors (cetuximab) are not covered here.",
  trigger: "The start of a course of external beam radiotherapy, and each weekly review during it.",
  steps: [
    {
      action: "Before treatment starts, explain how the skin may react and how to care for it, and assess whether the patient is at high risk of a severe reaction",
      why: "Knowing what to expect helps people look after their skin and report changes early; some treatments, like film dressings, only help if started at the beginning.",
      source: "canadian-delphi-breast-2025",
      quote: "After the four rounds, consensus for recommendation was reached for 3 prevention interventions in both low- and high-risk patients: prevention care education, moisturizing, and washing.",
      grade: "Delphi consensus (19 Canadian experts, breast cancer)",
    },
    {
      action: "Tell the patient they can wash the treated skin gently with water, with or without mild soap, and pat it dry",
      why: "Pooled trials found washing led to fewer severe skin reactions and less peeling, and people feel better for it.",
      source: "chan-washing-2023",
      quote: "Given the QoL benefits of washing, it should be advocated as part of routine skin care during RT.",
      grade: "Systematic review and meta-analysis of randomised trials",
    },
    {
      action: "Let the patient keep using their usual deodorant or antiperspirant unless it irritates the skin",
      why: "Trials found deodorant did not make skin reactions, itching or pain worse.",
      source: "salvestrini-deodorant-2023",
      quote: "As such, the current evidence does not support recommendation against antiperspirant/deodorant use during RT.",
      grade: "Meta-analysis of five randomised trials",
    },
    {
      action: "For patients with breast cancer, and selected head and neck patients, consider a thin film dressing (Mepitel film or Hydrofilm) over the treated skin from the start of treatment",
      why: "A thin film protects the skin from friction and has reduced the severity of reactions, especially peeling, in several trials.",
      source: "mascc-film-cps-2025",
      quote: "Prophylactic use of Mepitel Film and Hydrofilm is recommended for reducing the severity of ARD in breast cancer and selected head and neck cancer patients.",
      grade: "MASCC clinical practice statement (expert consensus on a literature review)",
    },
    {
      action: "For head and neck or breast patients at high risk, consider a medium-strength steroid cream such as mometasone furoate 0.1% on the treated skin during treatment",
      why: "A steroid cream calms the inflammation that causes redness and itching, and several trials found fewer and milder reactions with it.",
      source: "mascc-steroid-cps-2026",
      quote: "TCs are recommended for the prevention of ARD in selected patients with head and neck and breast cancers at a high risk of ARD.",
      grade: "MASCC clinical practice statement (expert consensus on a literature review)",
    },
    {
      action: "Where the treated area has an irregular shape, such as the head and neck, consider a barrier-forming gel for patients at high risk",
      why: "A gel that dries into a film can cover curved or folded skin where a dressing will not stay on.",
      source: "mascc-barrier-cps-2026",
      quote: "Barrier-forming topical agents are recommended for patients undergoing radiotherapy who are at considerable risk of developing high‑grade ARD, particularly in treatment sites with irregular anatomical contours, such as head and neck cancers.",
      grade: "MASCC clinical practice statement (expert consensus on a literature review)",
    },
    {
      action: "Look at the skin at least weekly during treatment, and stop a steroid cream if the skin starts to weep or peel (moist desquamation)",
      why: "Reactions build up over the course and often peak after it ends; once the skin is broken a steroid cream is no longer the right treatment.",
      source: "mascc-steroid-cps-2026",
      quote: "Healthcare professionals should monitor patients' skin weekly during radiation and guide steroid use, discontinuing it if moist desquamation or other complications arise.",
      grade: "MASCC clinical practice statement (expert consensus on a literature review)",
    },
    {
      action: "For established dermatitis, especially moist desquamation, use a soft silicone foam dressing such as Mepilex Lite",
      why: "A soft dressing protects broken skin, eases pain and lets it heal without sticking to the wound.",
      source: "mascc-delphi-2023",
      quote: "Mepilex Lite dressings were recommended for the management of acute radiation dermatitis.",
      grade: "Delphi consensus (at least 75% of 42 experts)",
    },
  ],
  bestInClass: {
    statement: "For everyone: education before treatment, gentle washing with water with or without mild soap, a moisturiser the patient likes, and their usual deodorant (Chan 2023 and Salvestrini 2023 meta-analyses; Canadian Delphi 2025; ONS 2020 conditional for deodorant). For high-risk patients, prophylaxis chosen by site: Mepitel film or Hydrofilm in breast cancer (MASCC 2023, 2025), medium-potency topical steroid such as mometasone furoate 0.1% in breast or head and neck cancer (MASCC 2023, 2026), photobiomodulation in breast cancer where available (MASCC 2023), or a barrier-forming agent on irregular contours (MASCC 2026). Weekly skin review; Mepilex Lite for established dermatitis (MASCC 2023). Where the sources differ: the MASCC 2023 systematic review found that washing and deodorant do not worsen dermatitis but judged the evidence insufficient to recommend them for prevention, while the 2023 washing meta-analysis found a reduction in severe dermatitis and recommends washing as routine care; the Canadian panel recommended washing for all. None of the sources read advises against washing or deodorant.",
    sources: ["mascc-delphi-2023", "mascc-systematic-review-2023", "mascc-film-cps-2025", "mascc-steroid-cps-2026", "mascc-barrier-cps-2026", "chan-washing-2023", "salvestrini-deodorant-2023", "canadian-delphi-breast-2025", "ons-radiodermatitis-2020"],
  },
  variants: [
    {
      name: "Advice not to wash the treated area or use deodorant",
      differs: "Older patient information told people to keep the treated skin dry, avoid soap and stop deodorant for the whole course.",
      evidence: "Not supported by any source read: washing reduced severe dermatitis in pooled trials (OR 0.32, 95% CI 0.19 to 0.55), and deodorant did not change grade 1 or worse, grade 2 or worse, or grade 3 dermatitis in five trials. How many departments still give this advice was not measured by any source read.",
      sources: ["chan-washing-2023", "salvestrini-deodorant-2023", "mascc-systematic-review-2023"],
    },
    {
      name: "Topical steroid for every patient rather than only those at high risk",
      differs: "Some departments prescribe a steroid cream such as mometasone from the first day for all patients.",
      evidence: "MASCC 2023 recommends mometasone and betamethasone for prevention without restricting them to high-risk patients in its abstract; the 2026 MASCC statement and the Canadian panel recommend them for high-risk patients. The systematic review found mometasone effective across eight randomised trials of mixed quality.",
      sources: ["mascc-delphi-2023", "mascc-steroid-cps-2026", "canadian-delphi-breast-2025", "mascc-systematic-review-2023"],
    },
    {
      name: "Photobiomodulation",
      differs: "Low-level red or near-infrared light is applied to the treated skin from the start of treatment.",
      evidence: "Recommended by MASCC 2023 for prevention in breast cancer. Needs a device and staff time; one trial in 46 head and neck patients found grade 2 to 3 dermatitis in 28.6% with it against 77.8% without (reported in the MASCC systematic review).",
      sources: ["mascc-delphi-2023", "mascc-systematic-review-2023"],
    },
    {
      name: "Aloe vera, calendula and other creams",
      differs: "Many departments and patients use aloe vera, calendula, emu oil or other non-steroidal creams to prevent reactions.",
      evidence: "ONS 2020 suggested against emu oil, calendula and non-steroidal interventions and recommended aloe vera only within a trial; the MASCC 2023 systematic review found most such interventions unsupported, and MASCC 2023 recommended olive oil as the only one of these to reach consensus.",
      sources: ["ons-radiodermatitis-2020", "mascc-delphi-2023", "mascc-systematic-review-2023"],
    },
  ],
  grades: [
    { claim: "Prevention: photobiomodulation and Mepitel film in breast cancer, Hydrofilm, mometasone, betamethasone and olive oil", grade: "Delphi consensus (at least 75% of 42 experts)", source: "mascc-delphi-2023", quote: "Six interventions could be recommended for the prevention of acute radiation dermatitis: photobiomodulation therapy and Mepitel film in people with breast cancer, Hydrofilm, mometasone, betamethasone, and olive oil." },
    { claim: "Most interventions were not recommended", grade: "Delphi consensus", source: "mascc-delphi-2023", quote: "Most interventions were not recommended due to insufficient evidence, conflicting evidence, or lack of consensus to support use, suggesting a need for further research." },
    { claim: "Washing and deodorant do not worsen dermatitis but are not proven to prevent it", grade: "Systematic review (149 randomised trials among 235 studies)", source: "mascc-systematic-review-2023", quote: "Based on evidence from multiple RCTs, aluminum/deodorant use and washing with water and soap do not worsen ARD, but there is insufficient evidence to support their use in the prevention of ARD." },
    { claim: "Washing with or without soap reduces severe dermatitis and moist desquamation", grade: "Meta-analysis of two randomised trials", source: "chan-washing-2023", quote: "Washing with or without soap significantly reduced the incidence of severe RD (OR: 0.32, 95% CI: 0.19-0.55, p < 0.01) and moist desquamation (OR: 0.25, 95% CI: 0.12-0.52, p < 0.01)." },
    { claim: "Medium-potency steroid preferred", grade: "MASCC clinical practice statement", source: "mascc-steroid-cps-2026", quote: "Medium potency TCs, such as mometasone furoate 0.1% cream, are preferred." },
    { claim: "Among barrier-forming agents, StrataXRT has the most evidence", grade: "MASCC clinical practice statement", source: "mascc-barrier-cps-2026", quote: "Among these agents, StrataXRT currently has the most robust supporting evidence." },
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
      accessed: "2026-11-11",
    },
    {
      key: "mascc-systematic-review-2023",
      label: "MASCC clinical practice guidelines for the prevention and management of acute radiation dermatitis: part 1) systematic review",
      publisher: "MASCC (EClinicalMedicine)",
      year: 2023,
      url: "https://doi.org/10.1016/j.eclinm.2023.101886",
      doi: "10.1016/j.eclinm.2023.101886",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "mascc-film-cps-2025",
      label: "MASCC oncodermatology clinical practice statement: prevention and management of acute radiation dermatitis with Mepitel Film and Hydrofilm",
      publisher: "MASCC (Supportive Care in Cancer)",
      year: 2025,
      url: "https://doi.org/10.1007/s00520-025-10218-0",
      doi: "10.1007/s00520-025-10218-0",
      gradingScheme: "Clinical practice statement: literature review and expert consensus of the MASCC Oncodermatology Study Group, without formal grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "mascc-steroid-cps-2026",
      label: "MASCC clinical practice statement: prevention and management of acute radiation dermatitis using topical corticosteroids",
      publisher: "MASCC (Supportive Care in Cancer)",
      year: 2026,
      url: "https://doi.org/10.1007/s00520-026-10659-1",
      doi: "10.1007/s00520-026-10659-1",
      gradingScheme: "Clinical practice statement: MEDLINE search to 23 November 2025 and structured expert discussion, without formal grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "mascc-barrier-cps-2026",
      label: "MASCC oncodermatology clinical practice statement: prevention of acute radiation dermatitis using barrier-forming topical agents",
      publisher: "MASCC (Supportive Care in Cancer)",
      year: 2026,
      url: "https://doi.org/10.1007/s00520-026-11244-2",
      doi: "10.1007/s00520-026-11244-2",
      gradingScheme: "Clinical practice statement: literature search to 23 April 2026 and structured expert discussion, without formal grades.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "canadian-delphi-breast-2025",
      label: "Modified Delphi consensus on interventions for acute radiation dermatitis in breast cancer: a Canadian expert perspective",
      publisher: "International Journal of Radiation Oncology, Biology, Physics",
      year: 2025,
      url: "https://doi.org/10.1016/j.ijrobp.2024.12.037",
      doi: "10.1016/j.ijrobp.2024.12.037",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ons-radiodermatitis-2020",
      label: "ONS Guidelines for Cancer Treatment-Related Radiodermatitis",
      publisher: "Oncology Nursing Society (Oncology Nursing Forum)",
      year: 2020,
      url: "https://doi.org/10.1188/20.ONF.654-670",
      doi: "10.1188/20.ONF.654-670",
      gradingScheme: "GRADE: recommendations strong or conditional, certainty high to very low.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "chan-washing-2023",
      label: "Prevention of radiation dermatitis with skin hygiene and washing: a systematic review and meta-analysis",
      publisher: "Supportive Care in Cancer (Chan et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s00520-023-07720-8",
      doi: "10.1007/s00520-023-07720-8",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "salvestrini-deodorant-2023",
      label: "The effect of antiperspirant and deodorant use on acute radiation dermatitis in breast cancer patients during radiotherapy: a systematic review and meta-analysis",
      publisher: "Supportive Care in Cancer (Salvestrini et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s00520-023-07657-y",
      doi: "10.1007/s00520-023-07657-y",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "scor-dermatitis-2020",
      label: "Radiation dermatitis guidelines for radiotherapy healthcare professionals",
      publisher: "Society and College of Radiographers",
      year: 2020,
      url: "https://www.sor.org/learning-advice/professional-body-guidance-and-publications/documents-and-publications/policy-guidance-document-library/radiation-dermatitis-guidelines-for-radiotherapy-h",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["breast-cancer", "head-and-neck"],
  drugs: ["mometasone"],
  technologies: ["photobiomodulation-mucositis"],
  terms: ["radiation-dermatitis", "radiotherapy"],
  related: ["breast-radiotherapy-positioning-and-setup"],
  upgrades: ["idea-pu-washing-and-deodorant-during-radiotherapy"],
  gaps: [
    "The full text of the MASCC 2023 Delphi guideline is paywalled and was not read; the recommendations here are those its abstract names, and any conditions or grading in the full text are not stated.",
    "The UK Society and College of Radiographers radiation dermatitis guideline (2020) could not be read: its page on sor.org returns 404 and the PDF is not in the Internet Archive. Whether it has been withdrawn or replaced is not known.",
    "The ONS 2020 guideline was read as an abstract; its eight recommendations and their GRADE certainty are not listed here.",
    "Who counts as high risk is defined in the full texts of the MASCC statements and the Canadian consensus, not in their abstracts; the abstracts name breast and head and neck cancer, skin folds and irregular contours.",
    "The washing meta-analysis pooled only two trials, and the MASCC review judged the same evidence insufficient for a prevention recommendation; the sources agree that washing does no harm.",
    "The technology record linked for photobiomodulation describes its use for oral mucositis; no OnCo record covers photobiomodulation for the skin.",
    "Sun protection after treatment and long-term skin care (late effects, fibrosis) are not covered.",
  ],
});
