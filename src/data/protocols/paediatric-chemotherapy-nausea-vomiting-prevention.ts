import { protocol } from "./helpers";

/*
 * Preventing and treating chemotherapy-induced nausea and vomiting in children: classifying the chemotherapy, acute
 * and delayed prophylaxis, breakthrough and refractory nausea, and anticipatory nausea.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source fetched again raw with
 * curl into a scratch directory and read as text, and every claim on the page re-read against it.
 * - Children's Oncology Group summary of its five endorsed CINV guidelines (version date 15 January 2024), public PDF
 *   from the COG supportive care page, which still links this version as the current one and lists 2020, 2021, 2022
 *   and 2023 versions as archived. Read in full with pdftotext three ways: raw, layout, and the recommendation column
 *   cropped on its own (pdftotext -x -W), because in the layout text the grade column runs into recommendations that
 *   wrap over two lines. Quotes were checked by script against the cropped column. It reprints every recommendation of
 *   the POGO guidelines with its GRADE strength and quality.
 * - The POGO source guidelines, abstracts only, from Europe PMC: emetogenicity classification (Paw Cho Sing et al.,
 *   Pediatr Blood Cancer 2019), acute and delayed prevention (Patel et al., 2022), anticipatory CINV (Patel et al.,
 *   2021), breakthrough and refractory CINV (Patel et al., 2023). Every DOI was resolved through Europe PMC and its
 *   title checked. The journal site (Wiley) answered a script with a browser check (HTTP 403) on 17 November 2026, so
 *   the full texts, and with them the dosing tables, were not read.
 * - POGO's own guideline pages (pogo.ca, last modified 26 May 2026), read as raw HTML: they list the 2019, 2021, 2022
 *   and 2023 guidelines as the current editions and the earlier ones as archived.
 * - ASCO antiemetics guideline update (Hesketh et al., 2020), endorsed by COG for acute prevention: abstract only,
 *   from Europe PMC. A Europe PMC title search found no later ASCO antiemetics update.
 * - International consensus on dexamethasone as an antiemetic in children (Shavandi et al., Pediatr Blood Cancer
 *   2026), found in a Europe PMC search for later paediatric guidance: abstract only.
 * - The MASCC/ESMO 2023 summary guideline (ESMO Open 2024), re-used from a sibling checker's copy fetched from Europe
 *   PMC on 17 November 2026, was searched for paediatric recommendations: it says paediatric patients were not the
 *   focus of that guideline, so it is not cited here.
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const paediatricChemotherapyNauseaVomitingPrevention = protocol({
  id: "paediatric-chemotherapy-nausea-vomiting-prevention",
  name: "Preventing chemotherapy sickness (nausea and vomiting) in children",
  aka: ["paediatric CINV", "pediatric chemotherapy-induced nausea and vomiting", "antiemetics in children", "POGO CINV guidelines", "breakthrough nausea children", "anticipatory nausea children"],
  domain: "paediatric",
  tldr: "How likely a child's chemotherapy is to cause sickness decides which anti-sickness medicines they are given to prevent it. The chemotherapy most likely to cause sickness gets three medicines together. If a child is still sick, the team steps up the medicines, and starts the next block with what worked. Good control from the start also helps stop a child feeling sick before later treatments.",
  simple: "Anti-sickness medicines are chosen by how likely the chemotherapy is to cause sickness. They are given to prevent it. If they do not work, the team adds more.",
  summary: "Children's Oncology Group endorses four POGO guidelines (GRADE) and the ASCO 2020 antiemetics update. First classify the acute emetogenicity of the chemotherapy using the POGO 2019 paediatric classification (high, moderate, low, minimal; for example intravenous cisplatin 12 mg/m2 per dose or more is highly emetogenic). Acute prophylaxis: highly emetogenic, a 5-HT3 antagonist plus dexamethasone plus aprepitant or fosaprepitant (strong, high), with palonosetron-based alternatives where dexamethasone or the NK1 antagonist cannot be given, and olanzapine to be considered (conditional, moderate); moderately emetogenic, a 5-HT3 antagonist plus dexamethasone (strong, moderate), or a 5-HT3 antagonist plus aprepitant or fosaprepitant where dexamethasone cannot be given (strong, low); low, a 5-HT3 antagonist (strong, low); minimal, no routine prophylaxis (strong, very low). Delayed phase after highly emetogenic chemotherapy: oral aprepitant if aprepitant or fosaprepitant was started acutely (strong, high), dexamethasone after ondansetron or granisetron or where oral aprepitant cannot be given (strong, moderate), continue olanzapine if started (strong, moderate), and no 5-HT3 antagonists (strong, low). Delayed phase after moderately emetogenic chemotherapy: consider dexamethasone (conditional, low); after low and minimally emetogenic chemotherapy, no routine prophylaxis (strong, very low). Breakthrough nausea: on prophylaxis for minimal, low or moderate chemotherapy, escalate in the current block to the prophylaxis for the next emetogenic level (strong, low); on prophylaxis for highly emetogenic chemotherapy, consider switching to palonosetron (conditional, low) and adding dexamethasone, aprepitant or fosaprepitant, or olanzapine (conditional, moderate). Next block: use what controlled it (strong, low). Anticipatory nausea: control acute and delayed nausea from the start (strong, moderate); consider hypnosis, systematic desensitisation or relaxation and lorazepam (conditional); ginger not routinely (conditional, low); do not use clonidine (strong, low). The COG summary prints no doses.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["ward", "chemotherapy-day-unit", "home"],
  },
  population: "Children and adolescents receiving chemotherapy. The emetogenicity classification covers ages 1 month to 18 years. The anticipatory guideline and the breakthrough and refractory guideline cover paediatric oncology patients and haematopoietic stem cell recipients up to 18 years of age. The COG summary gives no age range for the acute and delayed prevention guideline, which it describes as for children. Adults are covered by adult antiemetic guidelines.",
  trigger: "A child is due to start a chemotherapy block.",
  steps: [
    {
      action: "Classify how likely the chemotherapy is to cause sickness (high, moderate, low or minimal), using the paediatric emetogenicity classification",
      why: "The level decides which anti-sickness medicines are chosen, and the classification rests on a systematic review limited to children.",
      source: "pogo-classification-2019",
      quote: "This information is critically important for the appropriate selection of antiemetic prophylaxis.",
    },
    {
      action: "For highly emetogenic chemotherapy, give a 5-HT3 antagonist, dexamethasone and either oral aprepitant or intravenous fosaprepitant to prevent sickness in the acute phase",
      why: "For the chemotherapy most likely to cause sickness, this three-drug combination is a strong recommendation resting on high quality evidence.",
      source: "cog-cinv-2024",
      quote: "a. Use a 5HT3RA + dexamethasone + (fos)aprepitant",
      grade: "Strong recommendation, High quality evidence",
    },
    {
      action: "For highly emetogenic chemotherapy in a child who cannot have dexamethasone, or aprepitant and fosaprepitant, use palonosetron: with dexamethasone if only the NK1 antagonist is ruled out, with aprepitant or fosaprepitant if only dexamethasone is ruled out, and on its own if both are",
      why: "Some children cannot be given dexamethasone or an NK1 antagonist, and the guideline names a palonosetron-based regimen for each of those cases.",
      source: "cog-cinv-2024",
      quote: "b. Use palonosetron + dexamethasone in patients unable to receive (fos)aprepitant",
      grade: "Strong recommendation, Moderate quality evidence (palonosetron with dexamethasone; palonosetron alone); Strong recommendation, Low quality evidence (palonosetron with aprepitant or fosaprepitant)",
    },
    {
      action: "Consider adding olanzapine to the other antiemetics for highly emetogenic chemotherapy",
      why: "The recommendation is conditional, so olanzapine is something the team weighs rather than a fixed part of the regimen.",
      source: "cog-cinv-2024",
      quote: "e. Consider adding olanzapine to other CPG-consistent antiemetics",
      grade: "Conditional recommendation, Moderate quality evidence",
    },
    {
      action: "For moderately emetogenic chemotherapy, give a 5-HT3 antagonist with dexamethasone; if the child cannot have dexamethasone, give a 5-HT3 antagonist with aprepitant or fosaprepitant",
      why: "Two medicines are the recommended cover at this level, and the guideline names the second medicine to use when dexamethasone is ruled out.",
      source: "cog-cinv-2024",
      quote: "a. Use a 5HT3RA + dexamethasone",
      grade: "Strong recommendation, Moderate quality evidence (with dexamethasone); Strong recommendation, Low quality evidence (with aprepitant or fosaprepitant where dexamethasone cannot be given)",
    },
    {
      action: "For low emetogenic chemotherapy, give a 5-HT3 antagonist alone, and for minimally emetogenic chemotherapy give no routine prophylaxis",
      why: "The less likely the chemotherapy is to cause sickness, the fewer medicines the guideline recommends.",
      source: "cog-cinv-2024",
      quote: "a. Do not use prophylaxis routinely",
      grade: "Strong recommendation, Low quality evidence (low: a 5-HT3 antagonist); Strong recommendation, Very low quality evidence (minimal: no routine prophylaxis)",
    },
    {
      action: "In the delayed phase after highly emetogenic chemotherapy, give oral aprepitant if aprepitant or fosaprepitant was started in the acute phase, add dexamethasone if ondansetron or granisetron was the 5-HT3 antagonist or if the child cannot have oral aprepitant, and continue olanzapine if it was started",
      why: "The guideline makes separate recommendations for the delayed phase, which follows the acute phase, and these are the medicines it names for it.",
      source: "cog-cinv-2024",
      quote: "b. Use oral aprepitant in the delayed phase, if (fos)aprepitant started in the acute phase",
      grade: "Strong recommendation, High quality evidence (oral aprepitant); Strong recommendation, Moderate quality evidence (dexamethasone; olanzapine)",
    },
    {
      action: "After highly emetogenic chemotherapy, do not use 5-HT3 antagonists such as ondansetron in the delayed phase",
      why: "The guideline recommends against them for the delayed phase after highly emetogenic chemotherapy; the evidence behind this is rated low quality.",
      source: "cog-cinv-2024",
      quote: "g. Do not use 5HT3RAs in the delayed phase",
      grade: "Strong recommendation, Low quality evidence",
    },
    {
      action: "In the delayed phase after moderately emetogenic chemotherapy, consider dexamethasone, continue oral aprepitant after single-day chemotherapy if aprepitant or fosaprepitant was given in the acute phase, and continue olanzapine if it was started; after low or minimally emetogenic chemotherapy, give no routine delayed-phase prophylaxis",
      why: "Delayed-phase cover is lighter at the lower levels, and none is given routinely at the lowest two.",
      source: "cog-cinv-2024",
      quote: "a. Consider using dexamethasone in the delayed phase",
      grade: "Conditional recommendation, Low quality evidence (dexamethasone); Strong recommendation, Moderate quality evidence (oral aprepitant, single-day chemotherapy); Strong recommendation, Low quality evidence (olanzapine); Strong recommendation, Very low quality evidence (no routine prophylaxis after low and minimal)",
    },
    {
      action: "If a child is sick despite the prophylaxis recommended for minimal, low or moderate chemotherapy, step up in the current block to the medicines recommended for the next level up",
      why: "The guideline strongly recommends moving up a level within the block the child is in.",
      source: "pogo-breakthrough-2023",
      quote: "In patients with breakthrough CINV, escalation of antiemetic agents to those recommended for chemotherapy of the next higher level of emetogenic risk is strongly recommended.",
      grade: "Strong recommendation, Low-quality evidence (the grade as the COG summary prints it for recommendation 1.1)",
    },
    {
      action: "For breakthrough sickness in a child on the prophylaxis for highly emetogenic chemotherapy, consider giving palonosetron in place of the next scheduled ondansetron or granisetron dose in the acute phase, and consider adding dexamethasone, aprepitant or fosaprepitant, or olanzapine if not already given; consider metoclopramide if the child cannot have olanzapine",
      why: "Highly emetogenic is the top level, so there is no higher level to step up to; the guideline suggests swapping or adding medicines instead.",
      source: "cog-cinv-2024",
      quote: "1.4 In pediatric patients receiving acute or delayed CINV prophylaxis recommended for HEC, consider adding metoclopramide in the current chemotherapy block in pediatric patients unable to receive olanzapine",
      grade: "Conditional recommendation, Low-quality evidence (palonosetron switch; metoclopramide); Conditional recommendation, Moderate-quality evidence (adding dexamethasone, aprepitant or fosaprepitant, or olanzapine)",
    },
    {
      action: "For the next block, use the antiemetics that controlled the breakthrough sickness last time",
      why: "Sickness in a child who had breakthrough sickness in earlier blocks is called refractory, and the guideline strongly recommends preventing it with what worked.",
      source: "pogo-breakthrough-2023",
      quote: "A strong recommendation to use antiemetic agents that controlled breakthrough CINV for the prevention of refractory CINV is also made.",
      grade: "Strong recommendation, Low-quality evidence (the grade as the COG summary prints it for recommendation 2.1)",
    },
    {
      action: "If the breakthrough sickness was not controlled last time, for the next block move up a level of prophylaxis for minimal or low emetogenic chemotherapy, or consider adding dexamethasone, aprepitant or fosaprepitant, or olanzapine for moderate or highly emetogenic chemotherapy",
      why: "When nothing controlled the sickness last time, the guideline steps up the cover before the next block starts.",
      source: "cog-cinv-2024",
      quote: "2.2 Use the antiemetic agents recommended for CINV prophylaxis for chemotherapy of the next higher level of emetogenic risk in patients who did not experience control of breakthrough CINV in previous chemotherapy blocks and are receiving minEC or LEC",
      grade: "Strong recommendation, Moderate-quality evidence (next level up, minimal or low); Conditional recommendation, Moderate-quality evidence (adding medicines, moderate or high)",
    },
    {
      action: "Control acute and delayed sickness as well as possible, to lower the risk of the child becoming sick in anticipation of chemotherapy",
      why: "The guideline found consistent evidence that a history of acute or delayed sickness is a risk factor for anticipatory sickness.",
      source: "cog-cinv-2024",
      quote: "1.1 Optimize acute and delayed CINV control to minimize the risk of anticipatory CINV",
      grade: "Strong recommendation, Moderate-quality evidence",
    },
    {
      action: "To prevent anticipatory sickness coming back, consider offering a cooperative child hypnosis, systematic desensitisation or relaxation techniques, and consider lorazepam; do not use ginger routinely, and do not use clonidine",
      why: "The guideline values the minimal risks of the psychological methods; limited data show benzodiazepines helped adults, with no direct evidence in children; ginger's results in adults were inconsistent; clonidine has a poor safety profile and no clear benefit.",
      source: "cog-cinv-2024",
      quote: "2.4 Do not use clonidine for secondary prevention of anticipatory CINV.",
      grade: "Conditional recommendation, Low-quality evidence (hypnosis, desensitisation or relaxation; ginger not routinely); Conditional recommendation, Very low-quality evidence (lorazepam); Strong recommendation, Low-quality evidence (no clonidine)",
    },
  ],
  bestInClass: {
    statement: "The POGO paediatric guidelines endorsed together by the Children's Oncology Group (summary dated 15 January 2024) are the current standard for children, and POGO's own pages list the same four as its current editions: classify emetogenicity with the paediatric classification, then three-drug prophylaxis (5-HT3 antagonist, dexamethasone and an NK1 antagonist) for highly emetogenic chemotherapy, two drugs for moderate, one for low, none routinely for minimal, with olanzapine considered; escalate for breakthrough sickness and carry the effective regimen into the next block. COG also endorses the adult ASCO 2020 antiemetics update for acute prevention; only its abstract could be read, which says the option of fosaprepitant was added to its paediatric recommendations, so any other difference between the two is not stated here. Where paediatric data for a regimen are lacking, the classification guideline says consulting methodologically sound adult guidelines may be appropriate.",
    sources: ["cog-cinv-2024", "pogo-classification-2019", "pogo-acute-delayed-2022", "pogo-breakthrough-2023", "pogo-anticipatory-2021", "pogo-cinv-pages", "asco-antiemetics-2020"],
  },
  variants: [
    {
      name: "Palonosetron as the 5-HT3 antagonist for highly emetogenic chemotherapy",
      differs: "Uses palonosetron as the preferred 5-HT3 antagonist in the acute phase for children at high risk of delayed sickness; dexamethasone in the delayed phase is then something to consider rather than something to add.",
      evidence: "Strong recommendation, moderate quality evidence, for palonosetron in patients at high risk of delayed-phase CINV; conditional, moderate, for adding delayed dexamethasone after palonosetron.",
      sources: ["cog-cinv-2024"],
    },
    {
      name: "Dietary counselling and yoga for refractory sickness",
      differs: "Considers offering sickness-focused dietary counselling or yoga to a child who has refractory sickness despite every suitable guideline-consistent antiemetic.",
      evidence: "Conditional recommendation, low-quality evidence.",
      sources: ["cog-cinv-2024"],
    },
    {
      name: "Deciding when dexamethasone is used as an antiemetic (2026 international consensus)",
      differs: "For children who have not had chemotherapy before and are about to receive moderately or highly emetogenic chemotherapy, a 16-member international panel agreed that the benefits of dexamethasone as an antiemetic outweigh its risks in bone tumours, germ cell tumours outside the central nervous system, hepatoblastoma, retinoblastoma, rhabdomyosarcoma and autologous haematopoietic stem cell transplant, and do not outweigh them in children having CAR T-cell therapy or with a known fungal infection.",
      evidence: "Delphi consensus statements, not graded recommendations; consensus needed at least 75% of panelists responding and 80% of respondents agreeing. Abstract only read.",
      sources: ["dexamethasone-consensus-2026"],
    },
  ],
  grades: [
    { claim: "Lists of highly emetogenic and of moderately emetogenic regimens in the classification", grade: "Strong recommendation, Very low to high quality of evidence", source: "cog-cinv-2024" },
    { claim: "List of low emetogenic regimens in the classification", grade: "Strong recommendation, Very low to moderate quality of evidence", source: "cog-cinv-2024" },
    { claim: "List of minimally emetogenic regimens in the classification", grade: "Strong recommendation, Very low to low quality of evidence", source: "cog-cinv-2024" },
    { claim: "5-HT3 antagonist, dexamethasone and (fos)aprepitant for highly emetogenic chemotherapy", grade: "Strong recommendation, High quality evidence", source: "cog-cinv-2024" },
    { claim: "Olanzapine considered with highly emetogenic chemotherapy", grade: "Conditional recommendation, Moderate quality evidence", source: "cog-cinv-2024" },
    { claim: "5-HT3 antagonist with dexamethasone for moderately emetogenic chemotherapy", grade: "Strong recommendation, Moderate quality evidence", source: "cog-cinv-2024" },
    { claim: "5-HT3 antagonist for low emetogenic chemotherapy", grade: "Strong recommendation, Low quality evidence", source: "cog-cinv-2024", quote: "a. Use a 5HT3RA" },
    { claim: "No routine prophylaxis for minimally emetogenic chemotherapy", grade: "Strong recommendation, Very low quality evidence", source: "cog-cinv-2024" },
    { claim: "Oral aprepitant in the delayed phase if (fos)aprepitant was started acutely (highly emetogenic)", grade: "Strong recommendation, High quality evidence", source: "cog-cinv-2024" },
    { claim: "No 5-HT3 antagonists in the delayed phase (highly emetogenic)", grade: "Strong recommendation, Low quality evidence", source: "cog-cinv-2024" },
    { claim: "Escalate to the next level's prophylaxis for breakthrough sickness (minimal, low or moderate)", grade: "Strong recommendation, Low-quality evidence", source: "cog-cinv-2024" },
    { claim: "Lorazepam considered for secondary prevention of anticipatory sickness", grade: "Conditional recommendation, Very low-quality evidence", source: "cog-cinv-2024" },
    { claim: "No clonidine for secondary prevention of anticipatory sickness", grade: "Strong recommendation, Low-quality evidence", source: "cog-cinv-2024" },
  ],
  sources: [
    { key: "cog-cinv-2024", label: "COG-endorsed guidelines on chemotherapy-induced nausea and vomiting: classification, acute, delayed, anticipatory, breakthrough and refractory (version date 15 January 2024)", publisher: "Children's Oncology Group", year: 2024, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_CINV_Guidelines_Document_15JAN2024-new-logo.pdf", gradingScheme: "GRADE, reprinted from the source guidelines: strong or conditional (weak) recommendation, with high, moderate, low or very low quality evidence.", read: "full-text", accessed: "2026-11-17" },
    { key: "pogo-classification-2019", label: "Classification of the acute emetogenicity of chemotherapy in pediatric patients: a clinical practice guideline", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2019, url: "https://europepmc.org/abstract/MED/30729654", doi: "10.1002/pbc.27646", read: "abstract", accessed: "2026-11-17" },
    { key: "pogo-acute-delayed-2022", label: "Prevention of acute and delayed chemotherapy-induced nausea and vomiting in pediatric cancer patients: a clinical practice guideline", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2022, url: "https://europepmc.org/abstract/MED/36221901", doi: "10.1002/pbc.30001", read: "abstract", accessed: "2026-11-17" },
    { key: "pogo-anticipatory-2021", label: "Prevention and treatment of anticipatory chemotherapy-induced nausea and vomiting in pediatric cancer patients and hematopoietic stem cell recipients: clinical practice guideline update", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/33686754", doi: "10.1002/pbc.28947", read: "abstract", accessed: "2026-11-17" },
    { key: "pogo-breakthrough-2023", label: "Treatment of breakthrough and prevention of refractory chemotherapy-induced nausea and vomiting in pediatric cancer patients: clinical practice guideline update", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/37178438", doi: "10.1002/pbc.30395", read: "abstract", accessed: "2026-11-17" },
    { key: "pogo-cinv-pages", label: "Clinical practice guidelines: chemotherapy-induced nausea and vomiting (web pages listing the current and archived editions, last modified 26 May 2026)", publisher: "Pediatric Oncology Group of Ontario", year: 2026, url: "https://www.pogo.ca/healthcare/clinical-practice-guidelines/chemotherapy-induced-nausea-and-vomiting/", read: "public-summary", accessed: "2026-11-17" },
    { key: "asco-antiemetics-2020", label: "Antiemetics: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/32658626", doi: "10.1200/JCO.20.01296", read: "abstract", accessed: "2026-11-17" },
    { key: "dexamethasone-consensus-2026", label: "Dexamethasone for chemotherapy-induced nausea and vomiting prevention in pediatric patients: international consensus", publisher: "International Pediatric Dexamethasone Panel, Pediatric Blood & Cancer", year: 2026, url: "https://europepmc.org/abstract/MED/41952471", doi: "10.1002/1545-5017.70299", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-moon-olanzapine-antiemetic-everywhere"],
  gaps: [
    "This page gives no antiemetic doses, no minimum age or weight for aprepitant or fosaprepitant, and no rule for adjusting dexamethasone when it is given with aprepitant, because the COG summary prints none of them. On 17 November 2026 the full POGO guidelines could not be read: Europe PMC holds abstracts only and the journal site answered a script with a browser check. The acute and delayed guideline's abstract names antiemetic safety and optimal dosing as evidence gaps.",
    "The ASCO 2020 antiemetics update, endorsed by COG for acute prevention, was read as an abstract only on 17 November 2026; it says the option of fosaprepitant was added to its paediatric recommendations. Its full paediatric recommendations and its two published errata were not read, so how it differs from the POGO guidelines is not set out here.",
    "The 2019 classification has a corrigendum (Pediatric Blood & Cancer 2021, doi 10.1002/pbc.28990) that could not be read on 17 November 2026. The COG summary is dated after it, but whether its lists include the correction could not be checked.",
    "No newer edition of any of the four POGO guidelines, of the COG summary or of the ASCO update was found on 17 November 2026 on POGO's pages, the COG supportive care page or in Europe PMC. The MASCC/ESMO 2023 antiemetic guideline says paediatric patients were not its focus.",
    "Many chemotherapies given to children have no paediatric emetogenicity data; the classification guideline says consulting methodologically sound adult guidelines may be appropriate in that case.",
    "No recommendation could be made for treating anticipatory sickness once it has started.",
    "The COG summary does not define the acute and delayed phases in hours or days, and does not say how long before chemotherapy the medicines are given.",
    "For moderately emetogenic chemotherapy lasting three days or more, the guideline says to consider not using oral aprepitant in the delayed phase (conditional, low quality evidence); and where neither dexamethasone nor an NK1 antagonist can be given it says to use a 5-HT3 antagonist alone (strong, low), to consider palonosetron as the preferred one and to consider adding olanzapine (both conditional, low). These are not written as steps above.",
  ],
  drugs: ["ondansetron", "granisetron", "palonosetron", "aprepitant", "dexamethasone", "cisplatin", "metoclopramide"],
  cancers: ["childhood-cancers"],
  technologies: ["antiemetic-therapy"],
  companies: ["childrens-oncology-group"],
  institutions: ["asco"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "nausea-and-vomiting"],
});
