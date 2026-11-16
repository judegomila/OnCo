import { protocol } from "./helpers";

/*
 * Preventing and treating chemotherapy-induced nausea and vomiting in children: classifying the chemotherapy, acute
 * and delayed prophylaxis, breakthrough and refractory nausea, and anticipatory nausea.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Children's Oncology Group summary of its five endorsed CINV guidelines (version date 15 January 2024), public PDF
 *   from the COG supportive care page (pdftotext, both raw and layout text, full text). It reprints every
 *   recommendation of the POGO guidelines with its GRADE strength and quality; COG lists earlier versions (2020, 2022,
 *   2023) as archived.
 * - The POGO source guidelines, abstracts only from Europe PMC (none is open access): emetogenicity classification
 *   (Paw Cho Sing et al., Pediatr Blood Cancer 2019), acute and delayed prevention (Patel et al., 2022), anticipatory
 *   CINV (Patel et al., 2021), breakthrough and refractory CINV (Patel et al., 2023). Every DOI was resolved through
 *   Europe PMC and its title checked. A Europe PMC title search found no later paediatric CINV guideline.
 * - ASCO antiemetics guideline update (Hesketh et al., 2020), endorsed by COG for acute prevention: resolved, not read
 *   (not open access, no recommendation text in the abstract).
 * Quotes are copied from the raw text with line breaks joined and nothing else changed. In the COG PDF the grade column
 * runs into recommendations that wrap over two lines, so those steps carry the grade (read from the layout text) and
 * no quote.
 */
export const paediatricChemotherapyNauseaVomitingPrevention = protocol({
  id: "paediatric-chemotherapy-nausea-vomiting-prevention",
  name: "Preventing chemotherapy sickness (nausea and vomiting) in children",
  aka: ["paediatric CINV", "pediatric chemotherapy-induced nausea and vomiting", "antiemetics in children", "POGO CINV guidelines", "breakthrough nausea children", "anticipatory nausea children"],
  domain: "paediatric",
  tldr: "How likely a child's chemotherapy is to cause sickness decides which anti-sickness medicines they get, given before the chemotherapy, not after the child is sick. The strongest chemotherapy gets three medicines together. If a child is still sick, the team steps up the medicines straight away and for the next cycle, because sickness that is not controlled makes the next cycle worse.",
  simple: "Anti-sickness medicines are chosen by how strong the chemotherapy is. They are given before it starts. If they do not work, the team adds more.",
  summary: "Children's Oncology Group endorses four POGO guidelines (GRADE) and the ASCO 2020 antiemetics update. First classify the acute emetogenicity of the chemotherapy using the POGO 2019 paediatric classification (high, moderate, low, minimal; for example cisplatin 12 mg/m2 per dose or more is highly emetogenic). Acute prophylaxis: highly emetogenic, a 5-HT3 antagonist plus dexamethasone plus aprepitant or fosaprepitant (strong, high), with palonosetron-based alternatives where dexamethasone or the NK1 antagonist cannot be given, and olanzapine to be considered (conditional, moderate); moderately emetogenic, a 5-HT3 antagonist plus dexamethasone (strong, moderate); low, a 5-HT3 antagonist (strong, low); minimal, no routine prophylaxis (strong, very low). Delayed phase after highly emetogenic chemotherapy: oral aprepitant if started acutely (strong, high), dexamethasone after ondansetron or granisetron (strong, moderate), continue olanzapine, and no 5-HT3 antagonists (strong, low). Breakthrough nausea: escalate to the prophylaxis for the next emetogenic level (strong, low) or, on highly emetogenic regimens, consider switching to palonosetron and adding dexamethasone, an NK1 antagonist or olanzapine; next cycle, use what worked. Anticipatory nausea: control acute and delayed nausea from the start (strong, moderate); consider hypnosis, systematic desensitisation or relaxation and lorazepam; not ginger routinely; never clonidine.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["ward", "chemotherapy-day-unit", "home"],
  },
  population: "Children and adolescents receiving chemotherapy, aged 1 month to 18 years for the emetogenicity classification and up to 18 for the prevention and treatment guidelines, including haematopoietic stem cell transplant recipients for anticipatory and breakthrough nausea. Adults are covered by adult antiemetic guidelines.",
  trigger: "A child is due to start a chemotherapy block.",
  steps: [
    {
      action: "Before each chemotherapy block, classify how likely it is to cause sickness, using the paediatric emetogenicity classification",
      why: "The level decides which anti-sickness medicines are needed, and the paediatric classification is built from studies in children.",
      source: "pogo-classification-2019",
      quote: "This information is critically important for the appropriate selection of antiemetic prophylaxis.",
      grade: "Strong recommendation (very low to high quality evidence, by regimen)",
    },
    {
      action: "For highly emetogenic chemotherapy, give a 5-HT3 antagonist, dexamethasone and aprepitant or fosaprepitant before the chemotherapy",
      why: "For the strongest chemotherapy this three-drug combination has the best evidence, rated high quality.",
      source: "cog-cinv-2024",
      quote: "a. Use a 5HT3RA + dexamethasone + (fos)aprepitant",
      grade: "Strong recommendation, High quality evidence",
    },
    {
      action: "If a child cannot have dexamethasone or aprepitant, use palonosetron-based combinations instead",
      why: "Some children cannot be given dexamethasone or an NK1 antagonist, and the guideline names palonosetron combinations for each of those cases.",
      source: "cog-cinv-2024",
      grade: "Strong recommendation, Low to Moderate quality evidence (by combination)",
    },
    {
      action: "Consider adding olanzapine to the other antiemetics for highly emetogenic chemotherapy",
      why: "Olanzapine can add to the other medicines; the recommendation is conditional, so it is offered rather than required.",
      source: "cog-cinv-2024",
      quote: "e. Consider adding olanzapine to other CPG-consistent antiemetics",
      grade: "Conditional recommendation, Moderate quality evidence",
    },
    {
      action: "For moderately emetogenic chemotherapy, give a 5-HT3 antagonist with dexamethasone",
      why: "Two medicines are enough for most children at this level.",
      source: "cog-cinv-2024",
      quote: "a. Use a 5HT3RA + dexamethasone",
      grade: "Strong recommendation, Moderate quality evidence",
    },
    {
      action: "For low emetogenic chemotherapy, give a 5-HT3 antagonist alone, and for minimally emetogenic chemotherapy give no routine prophylaxis",
      why: "Children on mild chemotherapy are rarely sick, and extra medicines add side effects.",
      source: "cog-cinv-2024",
      quote: "a. Do not use prophylaxis routinely",
      grade: "Strong recommendation, Very low quality evidence (minimal); Strong recommendation, Low quality evidence (low)",
    },
    {
      action: "In the days after highly emetogenic chemotherapy, continue oral aprepitant if it was started on day one, add dexamethasone if ondansetron or granisetron was used, and continue olanzapine if started",
      why: "Sickness can come on a day or more after chemotherapy, and these medicines cover that delayed phase.",
      source: "cog-cinv-2024",
      grade: "Strong recommendation, High quality evidence (aprepitant); Strong recommendation, Moderate quality evidence (dexamethasone, olanzapine)",
    },
    {
      action: "Do not use 5-HT3 antagonists such as ondansetron in the delayed phase",
      why: "They work for the first day's sickness, not for the delayed phase.",
      source: "cog-cinv-2024",
      quote: "g. Do not use 5HT3RAs in the delayed phase",
      grade: "Strong recommendation, Low quality evidence",
    },
    {
      action: "If a child is sick despite prophylaxis for minimal, low or moderate chemotherapy, step up straight away to the medicines for the next level of chemotherapy",
      why: "Breakthrough sickness means the level of cover was too low.",
      source: "pogo-breakthrough-2023",
      quote: "In patients with breakthrough CINV, escalation of antiemetic agents to those recommended for chemotherapy of the next higher level of emetogenic risk is strongly recommended.",
      grade: "Strong recommendation, Low-quality evidence",
    },
    {
      action: "On highly emetogenic chemotherapy, for breakthrough sickness consider switching to palonosetron and adding dexamethasone, aprepitant or olanzapine if not already given; consider metoclopramide if olanzapine cannot be used",
      why: "There is no higher level to step up to, so the team adds or swaps medicines instead.",
      source: "cog-cinv-2024",
      grade: "Conditional recommendation, Low to Moderate quality evidence",
    },
    {
      action: "For the next block, use the antiemetics that controlled the breakthrough sickness last time",
      why: "Sickness that was hard to control once is likely to happen again; preventing it is easier than treating it.",
      source: "pogo-breakthrough-2023",
      quote: "A strong recommendation to use antiemetic agents that controlled breakthrough CINV for the prevention of refractory CINV is also made.",
      grade: "Strong recommendation, Low-quality evidence",
    },
    {
      action: "Control acute and delayed sickness well from the first block, to stop the child becoming sick at the thought of chemotherapy",
      why: "Children who were sick in earlier cycles are the ones who later feel sick before treatment even starts.",
      source: "cog-cinv-2024",
      grade: "Strong recommendation, Moderate-quality evidence",
    },
    {
      action: "For a child with anticipatory sickness, consider hypnosis, systematic desensitisation or relaxation, and consider lorazepam; do not use ginger routinely, and do not use clonidine",
      why: "The psychological methods carry little risk; lorazepam helped adults; ginger's results were inconsistent; clonidine has a poor safety record and no clear benefit.",
      source: "cog-cinv-2024",
      quote: "2.4 Do not use clonidine for secondary prevention of anticipatory CINV.",
      grade: "Strong recommendation, Low-quality evidence (clonidine); Conditional recommendation (others)",
    },
  ],
  bestInClass: {
    statement: "The POGO paediatric guidelines endorsed together by the Children's Oncology Group (summary dated 15 January 2024) are the current standard for children: classify emetogenicity with the paediatric classification, then three-drug prophylaxis (5-HT3 antagonist, dexamethasone and an NK1 antagonist) for highly emetogenic chemotherapy, two drugs for moderate, one for low, none for minimal, with olanzapine considered; escalate for breakthrough sickness and carry the effective regimen into the next block. COG also endorses the adult ASCO 2020 antiemetics update for acute prevention; that guideline was not read here, so any difference between them is not stated. Where paediatric data for a regimen are lacking, the classification guideline says adult guidelines may be consulted.",
    sources: ["cog-cinv-2024", "pogo-classification-2019", "pogo-acute-delayed-2022", "pogo-breakthrough-2023", "pogo-anticipatory-2021"],
  },
  variants: [
    {
      name: "Palonosetron as the 5-HT3 antagonist for highly emetogenic chemotherapy",
      differs: "Uses palonosetron rather than ondansetron or granisetron in the acute phase for children at high risk of delayed sickness, and may then add dexamethasone in the delayed phase rather than routinely.",
      evidence: "Strong recommendation, moderate quality evidence, for palonosetron in patients at high risk of delayed-phase CINV; conditional, moderate, for adding delayed dexamethasone after palonosetron.",
      sources: ["cog-cinv-2024"],
    },
    {
      name: "Dietary counselling and yoga for refractory sickness",
      differs: "Adds sickness-focused dietary counselling or yoga for a child who stays sick despite every suitable antiemetic.",
      evidence: "Conditional recommendation, low-quality evidence.",
      sources: ["cog-cinv-2024"],
    },
  ],
  grades: [
    { claim: "5-HT3 antagonist, dexamethasone and (fos)aprepitant for highly emetogenic chemotherapy", grade: "Strong recommendation, High quality evidence", source: "cog-cinv-2024" },
    { claim: "Olanzapine considered with highly emetogenic chemotherapy", grade: "Conditional recommendation, Moderate quality evidence", source: "cog-cinv-2024" },
    { claim: "5-HT3 antagonist with dexamethasone for moderately emetogenic chemotherapy", grade: "Strong recommendation, Moderate quality evidence", source: "cog-cinv-2024" },
    { claim: "5-HT3 antagonist for low emetogenic chemotherapy", grade: "Strong recommendation, Low quality evidence", source: "cog-cinv-2024", quote: "a. Use a 5HT3RA" },
    { claim: "No routine prophylaxis for minimally emetogenic chemotherapy", grade: "Strong recommendation, Very low quality evidence", source: "cog-cinv-2024" },
    { claim: "Oral aprepitant in the delayed phase if started acutely (highly emetogenic)", grade: "Strong recommendation, High quality evidence", source: "cog-cinv-2024" },
    { claim: "No 5-HT3 antagonists in the delayed phase", grade: "Strong recommendation, Low quality evidence", source: "cog-cinv-2024" },
    { claim: "Escalate to the next level's prophylaxis for breakthrough sickness", grade: "Strong recommendation, Low-quality evidence", source: "cog-cinv-2024" },
    { claim: "Lorazepam considered for secondary prevention of anticipatory sickness", grade: "Conditional recommendation, Very low-quality evidence", source: "cog-cinv-2024" },
    { claim: "No clonidine for anticipatory sickness", grade: "Strong recommendation, Low-quality evidence", source: "cog-cinv-2024" },
  ],
  sources: [
    { key: "cog-cinv-2024", label: "COG-endorsed guidelines on chemotherapy-induced nausea and vomiting: classification, acute, delayed, anticipatory, breakthrough and refractory (version date 15 January 2024)", publisher: "Children's Oncology Group", year: 2024, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_CINV_Guidelines_Document_15JAN2024-new-logo.pdf", gradingScheme: "GRADE, reprinted from the source guidelines: strong or conditional recommendation, with high, moderate, low or very low quality evidence.", read: "full-text", accessed: "2026-11-11" },
    { key: "pogo-classification-2019", label: "Classification of the acute emetogenicity of chemotherapy in pediatric patients: a clinical practice guideline", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2019, url: "https://europepmc.org/abstract/MED/30729654", doi: "10.1002/pbc.27646", read: "abstract", accessed: "2026-11-11" },
    { key: "pogo-acute-delayed-2022", label: "Prevention of acute and delayed chemotherapy-induced nausea and vomiting in pediatric cancer patients: a clinical practice guideline", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2022, url: "https://europepmc.org/abstract/MED/36221901", doi: "10.1002/pbc.30001", read: "abstract", accessed: "2026-11-11" },
    { key: "pogo-anticipatory-2021", label: "Prevention and treatment of anticipatory chemotherapy-induced nausea and vomiting in pediatric cancer patients and hematopoietic stem cell recipients: clinical practice guideline update", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/33686754", doi: "10.1002/pbc.28947", read: "abstract", accessed: "2026-11-11" },
    { key: "pogo-breakthrough-2023", label: "Treatment of breakthrough and prevention of refractory chemotherapy-induced nausea and vomiting in pediatric cancer patients: clinical practice guideline update", publisher: "Pediatric Oncology Group of Ontario, Pediatric Blood & Cancer", year: 2023, url: "https://europepmc.org/abstract/MED/37178438", doi: "10.1002/pbc.30395", read: "abstract", accessed: "2026-11-11" },
    { key: "asco-antiemetics-2020", label: "Antiemetics: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/32658626", doi: "10.1200/JCO.20.01296", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-moon-olanzapine-antiemetic-everywhere"],
  gaps: [
    "Doses of the antiemetics for children are not given in the COG summary and were not read in the full source guidelines, which are not open access; the source guidelines name optimal dosing and safety as evidence gaps.",
    "The ASCO 2020 antiemetics update, endorsed by COG for acute prevention, was not read; how it differs from the paediatric guidelines is not set out here.",
    "Many chemotherapies given to children have no paediatric emetogenicity data; the classification guideline says adult guidelines may be consulted for them.",
    "No recommendation could be made for treating anticipatory sickness once it has started.",
    "Several recommendations wrap across the grade column of the COG PDF; their grades were read from the layout text and they carry no quote.",
  ],
  drugs: ["ondansetron", "granisetron", "palonosetron", "aprepitant", "dexamethasone", "cisplatin", "metoclopramide"],
  cancers: ["childhood-cancers"],
  technologies: ["antiemetic-therapy"],
  companies: ["childrens-oncology-group"],
  institutions: ["asco"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "nausea-and-vomiting"],
});
