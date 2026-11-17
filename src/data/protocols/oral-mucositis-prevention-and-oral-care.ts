import { protocol } from "./helpers";

/*
 * Oral care and the prevention of oral mucositis during chemotherapy, head and neck radiotherapy and stem cell
 * transplant: basic oral care, oral cryotherapy, benzydamine mouthwash and intraoral photobiomodulation.
 * One record for the four census rows that rest on the same guideline (basic oral care, oral cryotherapy, benzydamine,
 * photobiomodulation), so the reader sees which measure applies to which treatment side by side.
 *
 * First written on 11 November 2026 by joining two fill rounds (this one and the home routine formerly at
 * mouth-care-during-cancer-treatment). Where the NCI home guide and the 2024 MASCC/ISOO statement differ (flossing
 * during low counts, swabs), the difference is a variant.
 *
 * Second accuracy pass, 17 November 2026. Every source was read again as raw text and every claim checked against it:
 * - MASCC/ISOO mucositis guideline (Elad et al., Cancer 2020): full-text XML from the Europe PMC REST API
 *   (PMC7540329), a copy another checker of this pass saved the same day, tags stripped by script. Table 1 and Table 2
 *   are both text in the XML. The first pass said Table 2 (the photobiomodulation settings) was an image; it is not,
 *   and its five rows were parsed cell by cell and are now a variant. The supplementary file (Supporting Table 1, the
 *   2014 statements carried over unchanged) returned 403 and was not read.
 * - Its 2021 erratum (Cancer 2021, PMC8565669): read as HTML from PubMed Central with one plain request. It corrects
 *   one unit, the oral glutamine dose in the trials, from milligrams to grams.
 * - MASCC/ISOO clinical practice statement on controversies in basic oral care (2024): full-text XML from Europe PMC
 *   (PMC11269443).
 * - NCI, Chemotherapy and You (NIH Publication No. 24-7157, January 2024): PDF from cancer.gov, pdftotext -layout.
 * - NCI web page on mouth and throat problems (reviewed 24 September 2021): HTML with curl; added for the advice on
 *   when to call, which the booklet states less fully.
 * - Kepivance (palifermin) US label: SPL XML from DailyMed (version 22, effective 17 December 2025); added for the
 *   dose, which the guideline does not print.
 * - EMA Kepivance page: HTML with curl; added for the withdrawal of the European Union authorisation.
 * - The 2021 paediatric guideline (Eur J Cancer 2021): abstract only, from Europe PMC; the publisher PDF returned 403.
 * - ESMO mucosal injury guideline (Ann Oncol 2015): found in Europe PMC with no abstract; the DOI leads to a
 *   subscription page. Not read; named in gaps.
 * Europe PMC was searched on 17 November 2026 for a later MASCC/ISOO mucositis guideline, a later ESMO one and a later
 * paediatric one; none was found. Every DOI was resolved through Crossref or Europe PMC and its title checked. Every
 * quote was checked by script against the saved text (whitespace and tags only).
 *
 * What the pass changed: the claim that MASCC/ISOO is the only international guideline (ESMO has one); cryotherapy
 * wording that put the 30 minutes on melphalan as well as 5-fluorouracil; mechanisms and reasons the sources do not
 * state; "do not" where the 2024 statement says "need not" or "not the best time"; the benzydamine step, which lacked
 * its dose limit; the palifermin variant, which said adults where the guideline says patients; and the statements
 * the page left out (glutamine, sucralfate, topical GM-CSF, lidocaine rinse).
 */
export const oralMucositisPreventionAndOralCare = protocol({
  id: "oral-mucositis-prevention-and-oral-care",
  name: "Oral care and oral mucositis prevention during cancer treatment",
  aka: ["mouth care during chemotherapy", "oral care during chemotherapy", "mouth care at home during cancer treatment", "mouth sores from chemo", "oral mucositis prevention", "mouthwash during chemotherapy", "salt and baking soda mouth rinse", "ice chips during chemotherapy", "oral cryotherapy", "benzydamine mouthwash", "photobiomodulation for mucositis", "low-level laser for mouth sores", "basic oral care"],
  domain: "supportive-care",
  tldr: "Some cancer treatments cause painful mouth sores. See a dentist first if you can, check your mouth daily, keep brushing gently with a soft brush even when counts are low, rinse with salt and baking soda rather than an alcohol mouthwash, and tell your team early about pain or sores. Depending on treatment, the team may add ice chips during the drip, a benzydamine mouthwash or a low-level laser.",
  simple: "Some cancer treatments make the mouth sore. Look in your mouth every day. Brush gently with a soft toothbrush. Rinse with salt and baking soda in warm water three or four times a day and avoid mouthwash with alcohol. Call your team if your mouth hurts a lot, if pain makes it hard to eat, drink or sleep, or if you have a fever. For some treatments, the team may add cooling the mouth with ice during the drip, a special mouthwash or a light treatment.",
  summary: "MASCC/ISOO (2020) build prevention on basic oral care: they suggest multiagent combination oral care protocols (combinations of bland mouth rinses, toothbrushes and flossing) to prevent oral mucositis during chemotherapy, head and neck radiotherapy and haematopoietic stem cell transplant (level III in each). No guideline was possible on professional oral care, patient education, or saline and bicarbonate rinses; the panel adds its opinion that dental evaluation and treatment before cancer therapy are desirable, that educating patients is still appropriate, and that these bland rinses may help hygiene and comfort. Their 2024 practice statement for haematology and transplant advises patients to continue toothbrushing through leukopenia, neutropenia or thrombocytopenia, twice daily with a soft or very soft brush, and prefers toothbrushes over cleansing swabs. MASCC/ISOO suggest that chlorhexidine not be used to prevent mucositis during head and neck radiotherapy (level III); this does not exclude its use for a mouth infection.\n\nTargeted measures depend on the treatment. Oral cryotherapy is recommended for 30 minutes during the infusion of bolus 5-fluorouracil, and, with no duration printed, for autologous transplant when the conditioning includes high-dose melphalan (both level II). Benzydamine mouthwash is recommended for head and neck radiotherapy at a moderate dose, printed as below 50 Gy (level I), and suggested with chemoradiotherapy (level II). Intraoral photobiomodulation with low-level laser is recommended for adults having a transplant conditioned with high-dose chemotherapy, with or without total body irradiation (level I), head and neck radiotherapy without chemotherapy (level II) and head and neck chemoradiotherapy (level I), using one of the five protocols in the guideline's Table 2 (632.8, 650 or 660 nm; see variants). Intravenous palifermin is recommended for blood cancers treated with autologous transplant after high-dose chemotherapy and total body irradiation (level I). Topical 0.2% morphine mouthwash is suggested for mucositis pain in head and neck chemoradiotherapy (level III), honey for head and neck radiotherapy or chemoradiotherapy (level II), and oral glutamine, with caution, for head and neck chemoradiotherapy (level II). The guideline is against parenteral glutamine in transplant (level I), combined topical and systemic sucralfate in three settings (level II) and topical GM-CSF in transplant (level II). For children, the 2021 paediatric guideline says cryotherapy should be used for older cooperative children on short infusions of melphalan or 5-fluorouracil, and photobiomodulation in transplant and in head and neck carcinoma treated with radiotherapy.\n\nThe NCI patient guide (2024) gives the home routine: dentist at least two weeks before, check the mouth daily, extra-soft brush after meals and at bedtime, fluoride toothpaste, no alcohol mouthwash, a baking soda and salt rinse three to four times a day, gentle flossing (ask if platelets are low), keep the mouth moist, soft cool foods, and call if it hurts a lot. NCI's web page adds calling when pain makes it hard to eat, drink or sleep, or with a fever of 38 °C or higher.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor"],
    where: ["chemotherapy-day-unit", "ward", "radiotherapy-department", "home"],
  },
  population: "People having chemotherapy, radiotherapy to the head and neck, or high-dose conditioning before a haematopoietic stem cell transplant. MASCC/ISOO scope each statement to one treatment setting, and the photobiomodulation statements to adults; each targeted measure applies only to the treatment named for it. The 2024 basic oral care statement is written for haematology and transplant patients. Children are covered by the separate 2021 paediatric guideline, summarised as a variant. Treatment of established mucositis beyond the home routine and pain relief, and gastrointestinal mucositis, are not covered here; head and neck radiotherapy has its own record with the treatment and assessment steps.",
  trigger: "Before the first cycle of chemotherapy, the first fraction of head and neck radiotherapy, or transplant conditioning, and every day of treatment after.",
  steps: [
    {
      action: "Before treatment starts, arrange a dental check and any dental treatment that is needed",
      why: "The panel's opinion is that this is desirable to lower the risk of infections that start in the teeth, although it found too little evidence that professional oral care prevents mucositis.",
      source: "mascc-isoo-2020",
      quote: "the panel is of the opinion that dental evaluation and treatment as indicated before cancer therapy are desirable to reduce risk for local and systemic infections from odontogenic sources.",
      grade: "III (no guideline possible; expert opinion)",
    },
    {
      action: "Start a combined oral care routine and teach it: brushing, flossing, bland rinses and keeping the mouth moist",
      why: "The guideline says such routines make patients and staff more aware of good oral hygiene, which may lead to fewer and less severe mouth complications.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that implementation of multiagent combination oral care protocols is beneficial for the prevention of OM during CT.",
      grade: "III (suggestion)",
    },
    {
      action: "Check your mouth and tongue every day and tell your doctor or nurse right away about sores, white spots or infections",
      why: "Checking every day means you see or feel a problem as soon as it starts.",
      source: "nci-2024",
      quote: "Check your mouth and tongue every day.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "Brush teeth, gums and tongue after each meal and at bedtime with an extra-soft toothbrush and fluoride toothpaste",
      why: "Chemotherapy can affect the teeth, the gums and the lining of the mouth; the guide's routine is to keep them clean with the gentlest brush.",
      source: "nci-2024",
      quote: "Brush your teeth, gums, and tongue after each meal and at bedtime.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "Keep brushing twice a day when blood counts are low, using a soft or very soft toothbrush",
      why: "Plaque that builds up inflames the gums and makes them bleed, and inflamed gums let bacteria into the blood; brushing reduces plaque.",
      source: "mascc-isoo-2024-boc",
      quote: "It is advised for patients to continue toothbrushing during leukopenia, neutropenia, or thrombocytopenia.",
      grade: "Not graded (expert practice statement)",
    },
    {
      action: "Use a toothbrush rather than foam swabs for cleaning the teeth; the brush does not need replacing every day",
      why: "Swabs clear debris and moisten the mouth but have been shown not to remove dental plaque.",
      source: "mascc-isoo-2024-boc",
      quote: "Toothbrushes do not need to be replaced daily and are preferred over cleansing swabs.",
      grade: "Not graded (expert practice statement)",
    },
    {
      action: "Let people who already floss or use interdental brushes well carry on, carefully, during low counts; do not choose that time to start someone new to them",
      why: "The statement says cleaning between the teeth should be done carefully so as not to injure the tissue, and that a spell of low counts is not the best time to begin.",
      source: "mascc-isoo-2024-boc",
      quote: "However, it should be noted that for inexperienced patients who do not routinely use interproximal cleaning devices, episodes of leukopenia and/or thrombocytopenia are not the best times to initiate their use.",
      grade: "Not graded (expert practice statement)",
    },
    {
      action: "Do not use mouthwash containing alcohol; rinse three to four times a day with baking soda and salt in warm water, then plain water",
      why: "MASCC/ISOO describe salt and bicarbonate rinses as inert and bland: they help clear the mouth, which may help hygiene and comfort.",
      source: "nci-2024",
      quote: "Do not use mouthwash that has alcohol. Instead, rinse your mouth three to four times a day with a solution of baking soda, salt, and warm water followed by a plain water rinse.",
      grade: "Not graded (patient guide); MASCC/ISOO: no guideline possible (level III), with expert opinion that these bland rinses may help",
    },
    {
      action: "Do not rely on chlorhexidine to prevent mucositis during head and neck radiotherapy",
      why: "The panel found evidence that it does not prevent mucositis in this setting. This is not a statement that it is harmful, and it may still be used for a mouth infection.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT.",
      grade: "III (suggestion against)",
    },
    {
      action: "Keep the mouth moist by sipping water through the day, sucking ice chips or sugar-free hard sweets, or chewing sugar-free gum, and ask about saliva substitutes if the mouth is always dry",
      why: "Chemotherapy can affect the glands that make saliva.",
      source: "nci-2024",
      quote: "Ask your doctor or nurse about saliva substitutes if your mouth is always dry.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "When the mouth is sore, choose soft, moist, cool foods and avoid sharp, spicy, citrus or sugary foods, alcohol and tobacco",
      why: "These are the things the guide lists as able to hurt, scrape or burn a sore mouth.",
      source: "nci-2024",
      quote: "Choose foods that are moist, soft, and easy to chew or swallow.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "Give 30 minutes of oral cryotherapy (cooling the mouth) during the infusion of bolus 5-fluorouracil",
      why: "Cold narrows the small blood vessels near the surface of the mouth, so less of the drug reaches the lining. The cooling is temporary, so it suits only drugs given over a short time or with a short half-life.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends using 30 min of oral cryotherapy to prevent OM in patients receiving bolus 5‐FU CT during the infusion of the CT.",
      grade: "II (recommendation)",
    },
    {
      action: "Use oral cryotherapy when the conditioning for an autologous transplant includes high-dose melphalan",
      why: "The same cooling effect applies; the guideline gives no length of time for this setting.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends using oral cryotherapy to prevent OM in patients undergoing autologous HSCT when the conditioning includes high‐dose melphalan.",
      grade: "II (recommendation)",
    },
    {
      action: "For head and neck radiotherapy at a moderate dose (the guideline prints below 50 Gy), use benzydamine mouthwash to prevent mucositis",
      why: "The guideline files benzydamine under anti-inflammatory agents. With radiotherapy and chemotherapy together it is a suggestion (level II), not a recommendation.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends benzydamine mouthwash for the prevention of OM in patients with H&N cancer receiving a moderate dose RT (<50 Gy).",
      grade: "I (recommendation)",
    },
    {
      action: "Offer intraoral photobiomodulation with low-level laser to adults having a transplant conditioned with high-dose chemotherapy, head and neck radiotherapy or head and neck chemoradiotherapy, following exactly one of the guideline's listed protocols",
      why: "The guideline lists five protocols, each of which stands alone; it says it is unclear how changing the settings affects the result.",
      source: "mascc-isoo-2020",
      quote: "For all PBM guidelines, it is recommended that the specific PTPs of the selected protocol will be followed for optimal therapy.",
      grade: "I (recommendation) for transplant and for head and neck chemoradiotherapy; II (recommendation) for head and neck radiotherapy without chemotherapy",
    },
    {
      action: "In head and neck cancer, consider the safety questions particular to oral cancer before using photobiomodulation, and tell the patient the expected benefits and possible risks",
      why: "Animal studies conflict on whether the light affects tumour behaviour. Follow-up of treated patients showed no increase in cancer coming back, though the panel calls those data hard to analyse.",
      source: "mascc-isoo-2020",
      quote: "safety considerations unique to patients with oral cancer should be considered.",
      grade: "Printed within the level II and level I photobiomodulation recommendations for head and neck cancer",
    },
    {
      action: "Call your doctor or nurse if pain in the mouth, lips or throat makes it hard to eat, drink or sleep, or if you have a fever of 38 °C (100.5 °F) or higher",
      why: "Mouth problems are more serious when they interfere with eating and drinking, because they can lead to dehydration or malnutrition. The team can prescribe medicine for pain.",
      source: "nci-mouth-throat",
      quote: "It’s important to call your doctor or nurse if you have pain in your mouth, lips, or throat that makes it difficult to eat, drink, or sleep or if you have a fever of 100.5 °F (38 °C) or higher.",
      grade: "Not graded (patient information)",
    },
  ],
  bestInClass: {
    statement: "MASCC/ISOO (2020) is the most recent full update of the mucositis guideline from the supportive care societies whose remit this is; a search of Europe PMC on 17 November 2026 found no later one. ESMO also has a guideline on oral and gastrointestinal mucosal injury (2015); it is older and could not be read, so the two are not compared here. MASCC/ISOO grade each targeted measure for one treatment setting. The level I recommendations are benzydamine mouthwash in head and neck radiotherapy below 50 Gy, photobiomodulation for adults having transplant conditioning or head and neck chemoradiotherapy, and intravenous palifermin for autologous transplant conditioned with high-dose chemotherapy and total body irradiation. Oral cryotherapy during bolus 5-fluorouracil and with high-dose melphalan before autologous transplant are level II recommendations. Multiagent oral care protocols are a level III suggestion in each of the three settings. The 2024 practice statement, which is ungraded expert opinion for haematology and transplant, addresses the common disputes: continue brushing through low counts, prefer a brush over swabs, and chlorhexidine may reduce oral infections but was not found to reduce the risk of mucositis. The 2021 paediatric guideline also uses cryotherapy and photobiomodulation, limits cryotherapy to older cooperative children, and says palifermin should not be used routinely (see variants). For the daily routine at home, the NCI patient guide (2024) gives the practical detail: dental check beforehand, daily self-checks, an extra-soft brush after meals, a baking soda and salt rinse instead of alcohol mouthwash, and calling if the mouth hurts a lot; MASCC/ISOO could make no guideline on saline or bicarbonate rinses but describe them as bland rinses that may help hygiene and comfort.",
    sources: ["mascc-isoo-2020", "mascc-isoo-2024-boc", "paediatric-2021", "nci-2024", "esmo-2015"],
  },
  variants: [
    {
      name: "Children (2021 paediatric guideline)",
      differs: "Says cryotherapy should be used for older cooperative children receiving short infusions of melphalan or 5-fluorouracil; that intraoral photobiomodulation (620 to 750 nm) should be used for autologous or allogeneic transplant and for head and neck carcinoma treated with radiotherapy; and that palifermin should not be used routinely.",
      evidence: "Systematic reviews of randomised trials in children and adults: risk ratio for severe mucositis 0.49 (95% CI 0.31 to 0.76) with cryotherapy, 0.40 (0.27 to 0.60) with photobiomodulation and 0.81 (0.69 to 0.95) with palifermin, which was associated with adverse effects. Cryotherapy was not feasible in young children. Read as an abstract only.",
      sources: ["paediatric-2021"],
    },
    {
      name: "The five photobiomodulation protocols (MASCC/ISOO 2020, Table 2)",
      differs: "Transplant, either 632.8 nm at 31.25 mW per square centimetre, 40 seconds per spot, 1.0 J per square centimetre, spot size 0.8 square centimetres, 18 sites, from the day after conditioning ends for 5 days; or 650 nm at 1000 mW per square centimetre, 2 seconds per spot, 2.0 J per square centimetre, spot size 0.04 square centimetres, 54 to 70 sites, from the first day of conditioning to day +2 after transplant (7 to 13 days). Head and neck radiotherapy alone: 632.8 nm at 24 mW per square centimetre, 125 seconds per spot, 3.0 J per square centimetre, spot size 1.00 square centimetre, 12 sites, for the entire radiotherapy course. Head and neck chemoradiotherapy, either 660 nm at 417 mW per square centimetre, 10 seconds per spot, 4.2 J per square centimetre, spot size 0.24 square centimetres, 72 sites; or 660 nm at 625 mW per square centimetre, 10 seconds per spot, 6.2 J per square centimetre, spot size 0.04 square centimetres, 69 sites; both for the entire radiotherapy course.",
      evidence: "The guideline says the settings of the chosen protocol should be followed exactly and that each protocol stands alone. It marks the 1000, 417 and 625 mW per square centimetre settings as carrying a possible heating effect, to which the clinician should pay attention, and refers to its systematic review (Zadik and colleagues, 2019) for detail. A team should set a device from the guideline itself, not from this page.",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Palifermin (keratinocyte growth factor 1) around transplant",
      differs: "Gives palifermin intravenously to people with blood cancers having an autologous transplant whose conditioning includes high-dose chemotherapy and total body irradiation.",
      evidence: "MASCC/ISOO recommend it at level I in that setting only and print no dose. The United States label (Kepivance, version effective 17 December 2025) gives 60 micrograms per kg per day as an intravenous bolus for 3 consecutive days before and 3 consecutive days after myelotoxic therapy, 6 doses in all, with the third dose 24 to 48 hours before that therapy begins, and says not to give it within 24 hours of myelotoxic chemotherapy. In the European Union the marketing authorisation was withdrawn on 1 April 2016 at the request of the holder, which stopped marketing it for commercial reasons. The paediatric guideline says it should not be used routinely in children.",
      sources: ["mascc-isoo-2020", "kepivance-label", "ema-kepivance", "paediatric-2021"],
    },
    {
      name: "Chlorhexidine rinse in haematology and transplant",
      differs: "Uses chlorhexidine mouthwash, which the 2024 statement describes as in widespread use for dental plaque control and for lowering the number of microbes in the mouth.",
      evidence: "The 2024 MASCC/ISOO statement says chlorhexidine may reduce the risk of oral infections but was not found to reduce the risk of oral mucositis; it may be considered for patients at high risk of oral infection and is advised where brushing and cleaning between the teeth are compromised. The 2020 guideline suggests against it for mucositis prevention in head and neck radiotherapy (level III), could make no guideline for other groups (as the 2024 statement reports), and says this does not exclude its use for oral infection.",
      sources: ["mascc-isoo-2024-boc", "mascc-isoo-2020"],
    },
    {
      name: "Honey",
      differs: "Uses honey, applied in the mouth and swallowed, to prevent mucositis.",
      evidence: "Suggested by MASCC/ISOO 2020 for head and neck radiotherapy or chemoradiotherapy only (level II); only a suggestion was possible because some trials mixed the two groups, were small and used honey from different sources.",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Glutamine",
      differs: "Gives glutamine by mouth during head and neck chemoradiotherapy to prevent mucositis.",
      evidence: "MASCC/ISOO 2020 suggest oral glutamine in that setting only (level II), with caution, and recommend against glutamine given into a vein for transplant patients (level I), in whom one study reported higher relapse and death rates. The suggestion rests on 2 randomised trials of 10 to 30 g daily; the guideline first printed milligrams and corrected the unit to grams in its 2021 erratum.",
      sources: ["mascc-isoo-2020", "mascc-isoo-2020-erratum"],
    },
    {
      name: "Flossing every day and sponge swabs when brushing hurts (NCI home guide)",
      differs: "The NCI patient guide tells everyone to floss gently every day, asking the team first if platelets are low, and to try cotton swabs or sponges on a stick if brushing is painful.",
      evidence: "Patient guide, not graded. The 2024 MASCC/ISOO statement prefers a toothbrush over swabs for removing plaque, allows swabs as an addition or, in exceptional cases, for a limited period when a brush cannot be tolerated, and says low counts are not the best time for someone inexperienced to start cleaning between the teeth.",
      sources: ["nci-2024", "mascc-isoo-2024-boc"],
    },
  ],
  grades: [
    { claim: "Multiagent combination oral care protocols during chemotherapy, head and neck radiotherapy and transplant (three statements)", grade: "III (suggestion)", source: "mascc-isoo-2020", quote: "The panel suggests that implementation of multiagent combination oral care protocols is beneficial for the prevention of OM during HSCT." },
    { claim: "No chlorhexidine for mucositis prevention during head and neck radiotherapy", grade: "III (suggestion against)", source: "mascc-isoo-2020", quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT." },
    { claim: "Saline or bicarbonate rinses", grade: "No guideline possible, LoE III (expert opinion describes them as bland rinses that may help)", source: "mascc-isoo-2020", quote: "No guideline was possible regarding the use of saline or sodium bicarbonate rinses in the prevention or treatment of OM in patients undergoing cancer therapy because of limited data." },
    { claim: "Topical 0.2% morphine mouthwash for mucositis pain in head and neck chemoradiotherapy", grade: "Suggestion, LoE III", source: "mascc-isoo-2020", quote: "Topical morphine 0.2% mouthwash is suggested for the treatment of OM‐associated pain in patients with H&N cancer who receive RT‐CT." },
    { claim: "Lidocaine rinse, swished and spat out, for mouth pain; not advised under 3 years of age", grade: "Not graded (expert practice statement): may be considered", source: "mascc-isoo-2024-boc", quote: "Lidocaine rinse, swish and spit, may be considered to palliate oral mucosal pain in cancer patients." },
    { claim: "Dental visit at least two weeks before chemotherapy", grade: "Not graded (patient guide)", source: "nci-2024", quote: "Visit a dentist at least two weeks before starting chemotherapy." },
    { claim: "Benzydamine mouthwash, head and neck radiotherapy at moderate dose (below 50 Gy)", grade: "I (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends benzydamine mouthwash for the prevention of OM in patients with H&N cancer receiving a moderate dose RT (<50 Gy)." },
    { claim: "Benzydamine mouthwash, head and neck chemoradiotherapy", grade: "II (suggestion)", source: "mascc-isoo-2020", quote: "The panel suggests the use of benzydamine mouthwash for the prevention of OM in patients with H&N cancer who receive RT‐CT." },
    { claim: "Intraoral photobiomodulation, adults having transplant conditioned with high-dose chemotherapy, with or without total body irradiation", grade: "I (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends the use of intraoral PBM therapy using low‐level laser therapy for the prevention of OM in adult patients receiving HSCT conditioned with high‐dose CT, with or without TBI, using one of the selected protocols listed in Table 2." },
    { claim: "Intraoral photobiomodulation, adults having head and neck radiotherapy without chemotherapy", grade: "II (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends the use of intraoral PBM therapy using low‐level laser therapy for prevention of OM in adults receiving RT to the H&N (without CT)" },
    { claim: "Intraoral photobiomodulation, adults having head and neck chemoradiotherapy", grade: "I (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends the use of intraoral PBM therapy using low‐level laser therapy for the prevention of OM in adults receiving RT‐CT for H&N cancer" },
    { claim: "30 minutes of oral cryotherapy during the infusion of bolus 5-fluorouracil", grade: "II (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends using 30 min of oral cryotherapy to prevent OM in patients receiving bolus 5‐FU CT during the infusion of the CT." },
    { claim: "Oral cryotherapy when conditioning for autologous transplant includes high-dose melphalan (no duration printed)", grade: "II (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends using oral cryotherapy to prevent OM in patients undergoing autologous HSCT when the conditioning includes high‐dose melphalan." },
    { claim: "Intravenous palifermin (KGF-1), blood cancers, autologous transplant conditioned with high-dose chemotherapy and total body irradiation", grade: "I (recommendation)", source: "mascc-isoo-2020", quote: "The use of KGF‐1 intravenously is recommended for the prevention of OM in patients with hematologic cancer undergoing autologous HSCT with a conditioning regimen that includes high‐dose CT and TBI." },
    { claim: "Honey, head and neck radiotherapy or chemoradiotherapy", grade: "II (suggestion)", source: "mascc-isoo-2020", quote: "Honey is suggested for the prevention of OM in patients with H&N cancer who receive treatment with either RT or RT‐CT." },
    { claim: "Oral glutamine, head and neck chemoradiotherapy, with caution", grade: "II (suggestion)", source: "mascc-isoo-2020", quote: "The suggestion is with caution because of the higher mortality rate seen in patients undergoing HSCT who receive parenteral glutamine." },
    { claim: "No parenteral glutamine for mucositis prevention in transplant", grade: "I (recommendation against)", source: "mascc-isoo-2020", quote: "The panel recommends against the use of glutamine (parenteral) for the prevention of OM in patients undergoing HSCT." },
    { claim: "Sucralfate, combined topical and systemic: not for preventing or treating mucositis pain in head and neck radiotherapy, nor for treating it in solid cancers on chemotherapy (three statements)", grade: "II (not recommended)", source: "mascc-isoo-2020", quote: "Sucralfate (combined topical and systemic) is not recommended for the treatment of OM‐associated pain in patients with H&N cancer who receive RT." },
    { claim: "No topical GM-CSF for mucositis prevention in transplant", grade: "II (the evidence suggests it should not be used)", source: "mascc-isoo-2020", quote: "The evidence suggests that topical GM‐CSF should not be used for the prevention of OM in patients undergoing HSCT." },
    { claim: "Palifermin dose on the United States label", grade: "Not graded (product label)", source: "kepivance-label", quote: "The recommended dose of Kepivance is 60 mcg/kg/day, administered as an intravenous bolus injection for 3 consecutive days before and 3 consecutive days after myelotoxic therapy, for a total of 6 doses." },
  ],
  sources: [
    { key: "mascc-isoo-2020", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy", publisher: "MASCC and ISOO, Cancer", year: 2020, url: "https://europepmc.org/article/PMC/PMC7540329", doi: "10.1002/cncr.33100", gradingScheme: "Each statement carries a level of evidence (LoE, by the criteria of Somerfield and McCrae) and one of three determinations: recommendation, suggestion, or no guideline possible. Negative guidelines rest on evidence of lack of efficacy and do not mean the agent is harmful.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-isoo-2020-erratum", label: "Erratum to MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy", publisher: "Cancer", year: 2021, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8565669/", doi: "10.1002/cncr.33549", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-isoo-2024-boc", label: "MASCC/ISOO clinical practice statement: Current understanding on controversies in basic oral care in hemato-oncology and hematopoietic cell transplantation", publisher: "MASCC and ISOO, Supportive Care in Cancer", year: 2024, url: "https://europepmc.org/article/PMC/PMC11269443", doi: "10.1007/s00520-024-08690-1", gradingScheme: "Expert practice statement; statements are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nci-2024", label: "Chemotherapy and You: Support for People Who Have Cancer (NIH Publication No. 24-7157)", publisher: "National Cancer Institute", year: 2024, url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf", gradingScheme: "Patient guide; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nci-mouth-throat", label: "Mouth and Throat Problems: Cancer Treatment Side Effects (reviewed 24 September 2021)", publisher: "National Cancer Institute", year: 2021, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat", gradingScheme: "Patient information; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "paediatric-2021", label: "Clinical practice guideline for the prevention of oral and oropharyngeal mucositis in pediatric cancer and hematopoietic stem cell transplant patients: 2021 update", publisher: "European Journal of Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34252760", doi: "10.1016/j.ejca.2021.05.013", read: "abstract", accessed: "2026-11-17" },
    { key: "kepivance-label", label: "Kepivance (palifermin) injection: United States prescribing information, version effective 17 December 2025", publisher: "Swedish Orphan Biovitrum, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=426f6e64-2c20-4a61-6d65-7320426f6e64", gradingScheme: "Product label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "ema-kepivance", label: "Kepivance (palifermin): European public assessment report page, authorisation withdrawn 1 April 2016", publisher: "European Medicines Agency", year: 2016, url: "https://www.ema.europa.eu/en/medicines/human/EPAR/kepivance", read: "public-summary", accessed: "2026-11-17" },
    { key: "esmo-2015", label: "Management of oral and gastrointestinal mucosal injury: ESMO Clinical Practice Guidelines for diagnosis, treatment, and follow-up", publisher: "ESMO, Annals of Oncology", year: 2015, url: "https://doi.org/10.1093/annonc/mdv202", doi: "10.1093/annonc/mdv202", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-oral-cryotherapy-with-bolus-chemotherapy"],
  gaps: [
    "The five photobiomodulation protocols are in Table 2 of the 2020 guideline and are given here as a variant; the guideline says each must be followed exactly and sends the reader to its 2019 systematic review for detail, which was not read. It also notes that rules on these devices differ between countries.",
    "No later full MASCC/ISOO mucositis update than 2020 was found in Europe PMC on 17 November 2026; the panel reviewed randomised trials published up to June 2019, so later evidence has not been graded by it.",
    "ESMO published a guideline on oral and gastrointestinal mucosal injury in 2015 (Annals of Oncology). On 17 November 2026 Europe PMC held no abstract or open copy and the DOI led to a subscription page, so it was not read and nothing here rests on it; no later ESMO mucositis guideline was found in Europe PMC.",
    "The supplementary file of the 2020 guideline (Supporting Table 1, the 2014 statements carried over unchanged because there was no new evidence) returned 403 on 17 November 2026 and was not read, so those carried-over statements, which may include further measures for pain, are not on this page.",
    "MASCC/ISOO could make no guideline on patient education or professional oral care, nor on saline or bicarbonate rinses; these rest on the panel's expert opinion.",
    "The guideline text read does not describe how oral cryotherapy is done; ice chips are how the term is used on this page, but no source read here says so. It gives no length of time for cryotherapy with high-dose melphalan, and no source read gives a benzydamine dose or schedule.",
    "The cryotherapy recommendations name bolus 5-fluorouracil and high-dose melphalan only; the guideline makes no cryotherapy statement for other drugs or for combination regimens.",
    "The 2021 paediatric guideline was read only as an abstract; on 17 November 2026 the publisher's PDF returned 403. No later paediatric update was found in Europe PMC.",
    "The evidence for the general oral care routine is weak (level III), and the NCI guide says there are many recipes for the baking soda and salt rinse; its own is one example.",
    "The 2021 erratum to the MASCC/ISOO guideline was read on 17 November 2026: it corrects only the unit of the oral glutamine dose in the supporting trials, from milligrams to grams.",
    "The palifermin dose is from the United States label; the guideline prints none. Whether palifermin can be obtained in the United Kingdom or elsewhere outside the United States and the European Union was not checked.",
    "MASCC/ISOO have separate practice statements on the oral complications of targeted therapy (2024) and of immunotherapy (2025); they were not read and mouth sores from those drugs are outside this record.",
  ],
  institutions: ["mascc"],
  technologies: ["oral-cryotherapy-mucositis", "photobiomodulation-mucositis"],
  drugs: ["fluorouracil", "melphalan", "morphine"],
  terms: ["mucositis"],
  cancers: ["head-and-neck"],
  related: ["palifermin", "head-and-neck-radiotherapy-oral-mucositis", "paediatric-oral-mucositis-prevention", "bleeding-precautions-when-platelets-are-low", "head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis"],
  sections: ["supportive-care"],
  tags: ["protocol", "mucositis", "oral-care", "supportive-care"],
});
