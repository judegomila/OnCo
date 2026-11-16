import { protocol } from "./helpers";

/*
 * Oral care and the prevention of oral mucositis during chemotherapy, head and neck radiotherapy and stem cell
 * transplant: basic oral care, ice chips (oral cryotherapy), benzydamine mouthwash and intraoral photobiomodulation.
 * One record for the four census rows that rest on the same guideline (basic oral care, oral cryotherapy, benzydamine,
 * photobiomodulation), so the reader sees which measure applies to which treatment side by side.
 *
 * What was read, and how (all on 11 November 2026, fetched with the Europe PMC REST API into a scratch directory and
 * read as text):
 * - MASCC/ISOO clinical practice guidelines for the management of mucositis (Elad et al., Cancer 2020): full text from
 *   Europe PMC (PMC7540329), including Table 1 of guideline statements with their level of evidence. Table 2 (the
 *   photobiomodulation settings) is an image in the XML and its numbers were not read.
 * - MASCC/ISOO clinical practice statement on controversies in basic oral care in haemato-oncology and
 *   haematopoietic cell transplantation (2024): full text from Europe PMC (PMC11269443).
 * - The 2021 paediatric guideline for the prevention of oral and oropharyngeal mucositis (Eur J Cancer 2021):
 *   abstract only, from Europe PMC; the publisher page was not tried.
 * - NCI, Chemotherapy and You (NIH Publication No. 24-7157, January 2024): full text, PDF from cancer.gov with
 *   pdftotext; the home mouth care routine.
 * - A 2021 erratum to the MASCC/ISOO guideline exists (Cancer 2021, PMC8565669) and was not read.
 * No later MASCC/ISOO mucositis guideline than the 2019/2020 update was found in Europe PMC (searched 2021 to 2026).
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with nothing changed.
 *
 * This record joins two fill rounds written in parallel on 11 November 2026: this one and the home routine formerly
 * at mouth-care-during-cancer-treatment. Every step, source, variant and gap from both is kept; where the NCI home
 * guide and the 2024 MASCC/ISOO statement disagree (flossing during low counts, swabs), the difference is a variant.
 */
export const oralMucositisPreventionAndOralCare = protocol({
  id: "oral-mucositis-prevention-and-oral-care",
  name: "Oral care and oral mucositis prevention during cancer treatment",
  aka: ["mouth care during chemotherapy", "oral care during chemotherapy", "mouth care at home during cancer treatment", "mouth sores from chemo", "oral mucositis prevention", "mouthwash during chemotherapy", "salt and baking soda mouth rinse", "ice chips during chemotherapy", "oral cryotherapy", "benzydamine mouthwash", "photobiomodulation for mucositis", "low-level laser for mouth sores", "basic oral care"],
  domain: "supportive-care",
  tldr: "Some cancer treatments cause painful mouth sores. See a dentist first if you can, check your mouth daily, keep brushing gently with a soft brush even when counts are low, rinse with salt and baking soda rather than an alcohol mouthwash, and tell your team early about pain or sores. Depending on treatment, the team may add ice chips during the drip, a benzydamine mouthwash or a low-level laser.",
  simple: "Some cancer treatments make the mouth sore. Look in your mouth every day. Brushing gently with a soft toothbrush helps. Rinse with salty water a few times a day and avoid mouthwash with alcohol. Call your team if your mouth is very sore or you cannot eat or drink. For some treatments, sucking ice during the drip or using a special mouthwash or light treatment helps more.",
  summary: "MASCC/ISOO (2020) build prevention on basic oral care: a multiagent combination oral care protocol (brushing, flossing, bland rinses, moisturising) is suggested during chemotherapy, head and neck radiotherapy and haematopoietic stem cell transplant (level III), with dental evaluation and treatment before cancer therapy as expert opinion. Their 2024 practice statement says toothbrushing with a soft or very soft brush twice daily should continue through neutropenia and thrombocytopenia, and that brushes are preferred over foam swabs. Chlorhexidine is not to be used to prevent mucositis during head and neck radiotherapy.\n\nTargeted measures depend on the treatment. Oral cryotherapy (ice chips) is recommended for 30 minutes during bolus 5-fluorouracil and during high-dose melphalan conditioning before autologous transplant (level II). Benzydamine mouthwash is recommended for head and neck radiotherapy at moderate dose, below 50 Gy (level I), and suggested with chemoradiotherapy (level II). Intraoral photobiomodulation with low-level laser is recommended for adults having high-dose conditioning for transplant (level I), head and neck radiotherapy alone (level II) and head and neck chemoradiotherapy (level I), using one of the protocols the guideline specifies. For children, the 2021 paediatric guideline uses cryotherapy only for older cooperative children on short melphalan or 5-fluorouracil infusions and photobiomodulation across transplant and head and neck radiotherapy. Topical 0.2% morphine mouthwash is suggested for mucositis pain in head and neck chemoradiotherapy (level III), and honey for head and neck radiotherapy or chemoradiotherapy (level II).\n\nThe NCI patient guide (2024) gives the home routine: dentist at least two weeks before, check the mouth daily, extra-soft brush after meals and at bedtime, fluoride toothpaste, no alcohol mouthwash, a baking soda and salt rinse three to four times a day, gentle flossing (ask if platelets are low), keep the mouth moist, soft cool foods, and call if it hurts a lot.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor"],
    where: ["chemotherapy-day-unit", "ward", "radiotherapy-department", "home"],
  },
  population: "Adults having chemotherapy, radiotherapy to the head and neck, or high-dose conditioning before a haematopoietic stem cell transplant, as MASCC/ISOO scope each measure. Each targeted measure applies only to the treatment named for it. Children are covered by the separate 2021 paediatric guideline, summarised as a variant. Treatment of established mucositis beyond the home routine and pain relief, and gastrointestinal mucositis, are not covered here; head and neck radiotherapy has its own record with the treatment and assessment steps.",
  trigger: "Before the first cycle of chemotherapy, the first fraction of head and neck radiotherapy, or transplant conditioning, and every day of treatment after.",
  steps: [
    {
      action: "Before treatment starts, arrange a dental check and any needed dental treatment",
      why: "Infected teeth and gums can cause infections when the immune system is weak; the panel advises this although trials have not proved it prevents mucositis.",
      source: "mascc-isoo-2020",
      quote: "the panel is of the opinion that dental evaluation and treatment as indicated before cancer therapy are desirable to reduce risk for local and systemic infections from odontogenic sources.",
      grade: "III (no guideline possible; expert opinion)",
    },
    {
      action: "Start a combined oral care routine and teach it: brushing, cleaning between the teeth, bland rinses and moisturising the mouth",
      why: "A routine that the patient and staff follow keeps the mouth cleaner and is linked with fewer and milder sores.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that implementation of multiagent combination oral care protocols is beneficial for the prevention of OM during CT.",
      grade: "III (suggestion)",
    },
    {
      action: "Check your mouth and tongue every day and tell the team at once about sores, white spots or signs of infection",
      why: "Sores and thrush are easier to treat when caught early.",
      source: "nci-2024",
      quote: "Check your mouth and tongue every day.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "Brush teeth, gums and tongue after each meal and at bedtime with an extra-soft toothbrush and fluoride toothpaste",
      why: "Gentle, frequent cleaning removes food and germs without damaging the lining of the mouth.",
      source: "nci-2024",
      quote: "Brush your teeth, gums, and tongue after each meal and at bedtime.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "Brush at least twice a day with a soft or very soft toothbrush, and keep brushing when blood counts are low",
      why: "Stopping brushing lets plaque build up, which causes more gum bleeding and infection, not less.",
      source: "mascc-isoo-2024-boc",
      quote: "It is advised for patients to continue toothbrushing during leukopenia, neutropenia, or thrombocytopenia.",
    },
    {
      action: "Use a toothbrush rather than foam swabs, and do not replace the brush every day",
      why: "Swabs remove debris but do not clean plaque off the teeth.",
      source: "mascc-isoo-2024-boc",
      quote: "Toothbrushes do not need to be replaced daily and are preferred over cleansing swabs.",
    },
    {
      action: "Keep flossing or using interdental brushes only if already used to them; do not start during low counts",
      why: "Careful cleaning between the teeth helps, but someone new to it is more likely to injure the gums while counts are low.",
      source: "mascc-isoo-2024-boc",
      quote: "However, it should be noted that for inexperienced patients who do not routinely use interproximal cleaning devices, episodes of leukopenia and/or thrombocytopenia are not the best times to initiate their use.",
    },
    {
      action: "Do not use mouthwash containing alcohol; rinse three to four times a day with a bland rinse of baking soda and salt in warm water, then plain water",
      why: "Alcohol stings and dries a sore mouth; a bland rinse washes the mouth and is soothing.",
      source: "nci-2024",
      quote: "Do not use mouthwash that has alcohol. Instead, rinse your mouth three to four times a day with a solution of baking soda, salt, and warm water followed by a plain water rinse.",
      grade: "Not graded (patient guide); MASCC/ISOO: no guideline possible, expert opinion supports bland rinses",
    },
    {
      action: "Do not use chlorhexidine to prevent mucositis during head and neck radiotherapy",
      why: "Chlorhexidine did not prevent mucositis in head and neck radiotherapy.",
      source: "mascc-isoo-2020",
      quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT.",
      grade: "III (suggestion against)",
    },
    {
      action: "Keep the mouth moist by sipping water, ice chips or sugar-free sweets, and ask about saliva substitutes for a persistently dry mouth",
      why: "A dry mouth is sore and more prone to infection and tooth decay.",
      source: "nci-2024",
      quote: "Ask your doctor or nurse about saliva substitutes if your mouth is always dry.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "When the mouth is sore, choose soft, moist, cool foods and avoid sharp, spicy, acidic or sugary foods, alcohol and tobacco",
      why: "Rough, hot or acidic food hurts and damages the sore lining further.",
      source: "nci-2024",
      quote: "Choose foods that are moist, soft, and easy to chew or swallow.",
      grade: "Not graded (patient guide)",
    },
    {
      action: "During bolus 5-fluorouracil, have the patient hold ice chips in the mouth for 30 minutes",
      why: "Cold narrows the blood vessels in the mouth, so less of the drug reaches the lining while the level in the blood is highest.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends using 30 min of oral cryotherapy to prevent OM in patients receiving bolus 5‐FU CT during the infusion of the CT.",
      grade: "II (recommendation)",
    },
    {
      action: "Use oral cryotherapy during high-dose melphalan conditioning before an autologous transplant",
      why: "Melphalan is given as a short infusion and clears quickly, so cooling during it protects the mouth.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends using oral cryotherapy to prevent OM in patients undergoing autologous HSCT when the conditioning includes high‐dose melphalan.",
      grade: "II (recommendation)",
    },
    {
      action: "During head and neck radiotherapy, use benzydamine mouthwash to prevent mucositis",
      why: "Benzydamine is an anti-inflammatory rinse; trials showed fewer and milder sores at moderate radiotherapy doses.",
      source: "mascc-isoo-2020",
      quote: "The panel recommends benzydamine mouthwash for the prevention of OM in patients with H&N cancer receiving a moderate dose RT (<50 Gy).",
      grade: "I (recommendation)",
    },
    {
      action: "Offer intraoral photobiomodulation with low-level laser to adults having high-dose conditioning for transplant or head and neck chemoradiotherapy, following a published set of laser settings",
      why: "Low-level light reduces the inflammation that leads to sores; it works only with the right wavelength, dose and schedule.",
      source: "mascc-isoo-2020",
      quote: "For all PBM guidelines, it is recommended that the specific PTPs of the selected protocol will be followed for optimal therapy.",
      grade: "I (recommendation) for transplant and for head and neck chemoradiotherapy; II for head and neck radiotherapy alone",
    },
    {
      action: "In head and neck cancer, weigh photobiomodulation with the radiotherapy team where the tumour is in the mouth",
      why: "The guideline asks for care because the light is aimed at tissue near the tumour.",
      source: "mascc-isoo-2020",
      quote: "safety considerations unique to patients with oral cancer should be considered.",
    },
    {
      action: "Call the team if the mouth hurts a lot or you cannot eat or drink",
      why: "Severe mucositis may need prescribed pain relief, treatment for infection, feeding support or a change to treatment.",
      source: "nci-2024",
      quote: "Call your doctor, nurse, or dentist if your mouth hurts a lot.",
      grade: "Not graded (patient guide)",
    },
  ],
  bestInClass: {
    statement: "MASCC/ISOO (2020) is the only international guideline on mucositis prevention and its most recent full update; no later update was found. It grades the targeted measures by treatment: benzydamine mouthwash in head and neck radiotherapy below 50 Gy (level I) and photobiomodulation in transplant conditioning and head and neck chemoradiotherapy (level I) have the strongest evidence; ice chips during bolus 5-fluorouracil and high-dose melphalan are level II recommendations. Basic oral care is a level III suggestion in every setting, and its 2024 practice statement settles the common disputes in haematology: keep brushing through low counts, prefer a brush over swabs, and do not count chlorhexidine as mucositis prevention. The 2021 paediatric guideline agrees on cryotherapy and photobiomodulation and differs on who can use cryotherapy and on palifermin (see variants). For the daily routine at home, the NCI patient guide (2024) gives the practical detail: dental check beforehand, daily self-checks, a soft brush after meals, bland rinses instead of alcohol mouthwash, and early reporting; saline and bicarbonate rinses have too little evidence for a guideline but are supported as bland and comforting.",
    sources: ["mascc-isoo-2020", "mascc-isoo-2024-boc", "paediatric-2021", "nci-2024"],
  },
  variants: [
    {
      name: "Children (2021 paediatric guideline)",
      differs: "Uses cryotherapy only for older cooperative children receiving short infusions of melphalan or 5-fluorouracil, because young children cannot keep ice in the mouth; uses intraoral photobiomodulation (620 to 750 nm) for autologous or allogeneic transplant and for head and neck carcinoma treated with radiotherapy; advises against routine palifermin.",
      evidence: "Systematic reviews of randomised trials in children and adults: severe mucositis risk ratio 0.49 with cryotherapy and 0.40 with photobiomodulation; palifermin 0.81 but with adverse effects. Read as an abstract only.",
      sources: ["paediatric-2021"],
    },
    {
      name: "Palifermin (keratinocyte growth factor) before transplant",
      differs: "Gives palifermin intravenously to adults with blood cancers having autologous transplant with high-dose chemotherapy and total body irradiation.",
      evidence: "MASCC/ISOO recommend it at level I in that setting only; the paediatric guideline advises against routine use in children because of adverse effects.",
      sources: ["mascc-isoo-2020", "paediatric-2021"],
    },
    {
      name: "Chlorhexidine rinse in haematology and transplant",
      differs: "Many haematology units use chlorhexidine mouthwash routinely.",
      evidence: "The 2024 MASCC/ISOO statement says chlorhexidine may reduce the risk of oral infections but was not found to reduce the risk of oral mucositis; the 2020 guideline suggests against it for mucositis prevention in head and neck radiotherapy (level III). It remains in use for other purposes, such as dental plaque control, in some local protocols.",
      sources: ["mascc-isoo-2024-boc", "mascc-isoo-2020"],
    },
    {
      name: "Honey",
      differs: "Uses honey, topically or swallowed, to prevent mucositis.",
      evidence: "Suggested by MASCC/ISOO 2020 for head and neck radiotherapy or chemoradiotherapy only (level II); trials were small and used different honeys.",
      sources: ["mascc-isoo-2020"],
    },
    {
      name: "Flossing every day and sponge swabs when brushing hurts (NCI home guide)",
      differs: "The NCI patient guide tells everyone to floss gently every day, asking the team first if platelets are low, and to use a sponge swab if brushing hurts.",
      evidence: "Patient guide, not graded. The 2024 MASCC/ISOO statement prefers a toothbrush over swabs and advises people not used to cleaning between the teeth not to start during low counts.",
      sources: ["nci-2024", "mascc-isoo-2024-boc"],
    },
  ],
  grades: [
    { claim: "Multiagent combination oral care protocols during chemotherapy, head and neck radiotherapy and transplant", grade: "III (suggestion)", source: "mascc-isoo-2020" },
    { claim: "No chlorhexidine for mucositis prevention during head and neck radiotherapy", grade: "III (suggestion against)", source: "mascc-isoo-2020", quote: "The panel suggests that CHX not be used in the prevention of OM in patients undergoing H&N RT." },
    { claim: "Saline or bicarbonate rinses", grade: "No guideline possible, LoE III (expert opinion supports them as bland rinses)", source: "mascc-isoo-2020", quote: "No guideline was possible regarding the use of saline or sodium bicarbonate rinses in the prevention or treatment of OM in patients undergoing cancer therapy because of limited data." },
    { claim: "Topical 0.2% morphine mouthwash for mucositis pain in head and neck chemoradiotherapy", grade: "Suggestion, LoE III", source: "mascc-isoo-2020", quote: "Topical morphine 0.2% mouthwash is suggested for the treatment of OM‐associated pain in patients with H&N cancer who receive RT‐CT." },
    { claim: "Dental visit at least two weeks before chemotherapy", grade: "Not graded (patient guide)", source: "nci-2024", quote: "Visit a dentist at least two weeks before starting chemotherapy." },
    { claim: "Benzydamine mouthwash, head and neck radiotherapy below 50 Gy", grade: "I (recommendation)", source: "mascc-isoo-2020" },
    { claim: "Benzydamine mouthwash, head and neck chemoradiotherapy", grade: "II (suggestion)", source: "mascc-isoo-2020", quote: "The panel suggests the use of benzydamine mouthwash for the prevention of OM in patients with H&N cancer who receive RT‐CT." },
    { claim: "Intraoral photobiomodulation, adults having transplant with high-dose conditioning", grade: "I (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends the use of intraoral PBM therapy using low‐level laser therapy for the prevention of OM in adult patients receiving HSCT conditioned with high‐dose CT, with or without TBI, using one of the selected protocols listed in Table 2 ." },
    { claim: "Intraoral photobiomodulation, head and neck radiotherapy without chemotherapy", grade: "II (recommendation)", source: "mascc-isoo-2020" },
    { claim: "Intraoral photobiomodulation, head and neck chemoradiotherapy", grade: "I (recommendation)", source: "mascc-isoo-2020" },
    { claim: "30 minutes of oral cryotherapy during bolus 5-fluorouracil", grade: "II (recommendation)", source: "mascc-isoo-2020" },
    { claim: "Oral cryotherapy with high-dose melphalan before autologous transplant", grade: "II (recommendation)", source: "mascc-isoo-2020", quote: "The panel recommends using oral cryotherapy to prevent OM in patients undergoing autologous HSCT when the conditioning includes high‐dose melphalan." },
    { claim: "Intravenous palifermin, autologous transplant with high-dose chemotherapy and total body irradiation", grade: "I (recommendation)", source: "mascc-isoo-2020", quote: "The use of KGF‐1 intravenously is recommended for the prevention of OM in patients with hematologic cancer undergoing autologous HSCT with a conditioning regimen that includes high‐dose CT and TBI." },
  ],
  sources: [
    { key: "mascc-isoo-2020", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy", publisher: "MASCC and ISOO, Cancer", year: 2020, url: "https://europepmc.org/article/PMC/PMC7540329", doi: "10.1002/cncr.33100", gradingScheme: "Each statement carries a level of evidence (I to V, after Somerfield and McCrae) and one of three determinations: recommendation, suggestion, or no guideline possible; negative guidelines mean lack of efficacy, not harm.", read: "full-text", accessed: "2026-11-11" },
    { key: "mascc-isoo-2024-boc", label: "MASCC/ISOO clinical practice statement: Current understanding on controversies in basic oral care in hemato-oncology and hematopoietic cell transplantation", publisher: "MASCC and ISOO, Supportive Care in Cancer", year: 2024, url: "https://europepmc.org/article/PMC/PMC11269443", doi: "10.1007/s00520-024-08690-1", gradingScheme: "Expert practice statement; statements are not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "nci-2024", label: "Chemotherapy and You: Support for People Who Have Cancer (NIH Publication No. 24-7157)", publisher: "National Cancer Institute", year: 2024, url: "https://www.cancer.gov/publications/patient-education/chemotherapy-and-you.pdf", gradingScheme: "Patient guide; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "paediatric-2021", label: "Clinical practice guideline for the prevention of oral and oropharyngeal mucositis in pediatric cancer and hematopoietic stem cell transplant patients: 2021 update", publisher: "European Journal of Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34252760", doi: "10.1016/j.ejca.2021.05.013", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-upgrade-oral-cryotherapy-with-bolus-chemotherapy"],
  gaps: [
    "The photobiomodulation settings (wavelength, power, energy and schedule) that MASCC/ISOO require are in Table 2 of the 2020 guideline, which is an image in the text read; they are not given here, and a team should take them from the guideline itself.",
    "No later full MASCC/ISOO mucositis update than 2020 was found, so evidence published since 2019 has not been graded by the panel.",
    "MASCC/ISOO could make no guideline on patient education or professional oral care alone, nor on saline or bicarbonate rinses; these rest on expert opinion.",
    "The guideline gives no length of time for ice chips with high-dose melphalan, and neither source read gives a benzydamine dose or schedule.",
    "The cryotherapy recommendations name bolus 5-fluorouracil and high-dose melphalan only; the sources read say nothing about combination regimens that include other drugs given at the same visit.",
    "The 2021 paediatric guideline was read only as an abstract.",
    "The evidence for the general oral care routine is weak (level III), and the exact recipe and frequency of bland rinses rest on practice rather than trials; the NCI recipe is one example among many.",
    "The 2021 erratum to the MASCC/ISOO guideline was not read; it may correct a statement used here.",
    "Mouth sores from targeted drugs and immunotherapy are not separately addressed in what was read and are outside this record.",
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
