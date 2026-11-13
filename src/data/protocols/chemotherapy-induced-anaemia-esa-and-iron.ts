import { protocol } from "./helpers";

/*
 * Anaemia during chemotherapy: finding other causes, iron, erythropoiesis-stimulating agents (ESAs) and when
 * transfusion is the alternative.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ASCO/ASH clinical practice guideline update on cancer-associated anaemia and ESAs (Bohlius et al., 2019), the
 *   Blood Advances version: full text from PubMed Central (PMC6482353), including every recommendation with its type,
 *   evidence quality and strength, and Table 1 of baseline investigations.
 * - NICE TA323, ESAs for treating anaemia in people with cancer having chemotherapy (November 2014): recommendations
 *   page (HTML, full text).
 * - ESMO 2018 guideline on anaemia and iron deficiency in cancer (Ann Oncol 2018): Europe PMC holds no abstract and the
 *   publisher refused a script. Not read.
 * No ASCO/ASH update after 2019 was found in Europe PMC. Every DOI was resolved through Europe PMC and its title checked.
 * Quotes are copied from the raw text with nothing changed.
 */
export const chemotherapyInducedAnaemiaEsaAndIron = protocol({
  id: "chemotherapy-induced-anaemia-esa-and-iron",
  name: "Anaemia during chemotherapy: investigation, iron and erythropoiesis-stimulating agents",
  aka: ["chemotherapy-induced anaemia", "ESA in cancer", "epoetin for anaemia in cancer", "darbepoetin", "iron for anaemia during chemotherapy", "cancer-associated anaemia"],
  domain: "supportive-care",
  tldr: "Chemotherapy often lowers the red blood cells, causing tiredness and breathlessness. Your team should first look for other causes such as low iron or blood loss. If the treatment is not aimed at cure, injections that stimulate red cell production (ESAs) or a blood transfusion are options; if the aim is cure, ESAs are not used because of their risks.",
  simple: "Chemotherapy can lower red blood cells and make you tired. Doctors check for other causes first. They may give iron, an injection to make more red cells, or a blood transfusion.",
  summary: "ASCO/ASH (2019) ask clinicians first to look for and treat other causes of anaemia (drug history, blood film, iron studies including ferritin and transferrin saturation, folate, vitamin B12, reticulocytes, occult blood loss, renal function, erythropoietin level, thyroid where indicated). ESAs may be offered for chemotherapy-associated anaemia when treatment is not curative in intent and haemoglobin has fallen below 10 g/dL, with red cell transfusion as an alternative (evidence based, high quality, strong); they should not be offered when treatment is curative (strong), nor to most people whose anaemia is not chemotherapy-associated (strong), except lower-risk myelodysplastic syndromes with erythropoietin 500 IU/L or below.\n\nESAs raise the risk of venous thromboembolism (high quality, strong), so the risk is weighed for each person. Doses follow the product's licence; haemoglobin is raised only to the lowest level that avoids transfusion; ESAs stop if there is no response in 6 to 8 weeks, prompting a search for progression or iron deficiency (strong). Iron replacement may be used with an ESA, with baseline and periodic iron studies (weak). In myeloma, non-Hodgkin lymphoma and CLL the response to cancer treatment is observed before an ESA is considered. NICE TA323 recommends ESAs within their licences for anaemia in people having chemotherapy, choosing the cheapest suitable product. Epoetin alfa and beta, darbepoetin and biosimilar epoetin alfa are considered equivalent.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults with cancer and anaemia during or related to myelosuppressive chemotherapy. Children, people with chronic kidney disease (who have their own ESA guidance) and red cell transfusion thresholds (covered in the transfusion protocol) are not covered here.",
  trigger: "Haemoglobin falls during chemotherapy, or symptoms of anaemia appear.",
  steps: [
    {
      action: "Before any ESA, look for other causes: take a drug history, review a blood film, check iron studies, folate, vitamin B12, reticulocytes, kidney function and signs of blood loss, and treat what you find",
      why: "Anaemia during cancer care often has a treatable cause, such as iron deficiency or bleeding, that an ESA would not fix.",
      source: "asco-ash-2019",
      quote: "Before offering an ESA, clinicians should conduct an appropriate history, physical examination, and diagnostic tests to identify alternative causes of anemia aside from chemotherapy or an underlying hematopoietic malignancy.",
      grade: "informal consensus; evidence quality intermediate; strength strong",
    },
    {
      action: "If treatment is not aimed at cure and haemoglobin is below 10 g/dL, offer an ESA or a red cell transfusion, depending on how severe the anaemia is and the circumstances",
      why: "ESAs reduce the need for transfusions; a transfusion works faster when symptoms are severe.",
      source: "asco-ash-2019",
      quote: "Depending on clinical circumstances, ESAs may be offered to patients with chemotherapy-associated anemia whose cancer treatment is not curative in intent and whose hemoglobin (HgB) has declined to < 10 g/dL.",
      grade: "evidence based; evidence quality high; strength strong",
    },
    {
      action: "Do not offer an ESA when the treatment is curative in intent",
      why: "ASCO/ASH judged the possible harms of ESAs not worth taking when the aim of treatment is cure.",
      source: "asco-ash-2019",
      quote: "ESAs should not be offered to patients with chemotherapy-associated anemia whose cancer treatment is curative in intent",
      grade: "evidence based; evidence quality intermediate; strength strong",
    },
    {
      action: "Do not offer an ESA to most people whose anaemia is not caused by chemotherapy; the exception is lower-risk myelodysplastic syndromes with a low erythropoietin level",
      why: "ASCO/ASH found no case for routine use outside chemotherapy and lower-risk MDS.",
      source: "asco-ash-2019",
      quote: "ESAs should not be offered to most patients with nonchemotherapy-associated anemia",
      grade: "informal consensus; evidence quality low; strength strong",
    },
    {
      action: "Weigh the risk of blood clots before starting an ESA",
      why: "ESAs increase the risk of venous thromboembolism, which is already raised in cancer.",
      source: "asco-ash-2019",
      quote: "ESAs increase the risk of thromboembolism, and clinicians should carefully weigh the risks of thromboembolism and use caution and clinical judgment when considering use of these agents",
      grade: "evidence based; evidence quality high; strength strong",
    },
    {
      action: "Raise haemoglobin only to the lowest level that avoids transfusion",
      why: "ASCO/ASH set no fixed target; the aim is to avoid transfusion, not to reach a normal count.",
      source: "asco-ash-2019",
      quote: "HgB may be increased to the lowest concentration needed to avoid or reduce the need for RBC transfusions, which may vary by patient and condition",
      grade: "informal consensus; evidence quality intermediate; strength moderate",
    },
    {
      action: "Give iron alongside an ESA where it helps, and check iron studies at the start and during treatment",
      why: "Iron improves the response to an ESA and reduces transfusions, with or without measured iron deficiency.",
      source: "asco-ash-2019",
      quote: "Iron replacement may be used to improve HgB response and reduce RBC transfusions for patients receiving ESA with or without iron deficiency.",
      grade: "evidence based; evidence quality intermediate; strength weak",
    },
    {
      action: "Stop the ESA if there is no response after 6 to 8 weeks, and look again for progression or iron deficiency",
      why: "If it has not worked by then, continuing adds risk and cost without benefit.",
      source: "asco-ash-2019",
      quote: "ESAs should be discontinued in patients who do not respond within 6 to 8 weeks.",
      grade: "informal consensus; evidence quality intermediate; strength strong",
    },
  ],
  bestInClass: {
    statement: "ASCO/ASH (2019), read in full, is the most detailed current guideline: investigate other causes first, offer an ESA or transfusion for chemotherapy-associated anaemia below 10 g/dL only when treatment is not curative, weigh the clot risk, aim for the lowest haemoglobin that avoids transfusion, stop after 6 to 8 weeks without response, and consider iron alongside. NICE TA323 (2014) recommends ESAs within their marketing authorisations for people having chemotherapy and does not repeat ASCO/ASH's restriction to non-curative treatment; the licences themselves were not read. ESMO's 2018 guideline, which covers intravenous iron in more detail, could not be read.",
    sources: ["asco-ash-2019", "nice-ta323", "esmo-2018"],
  },
  variants: [
    {
      name: "ESAs within their licences, cheapest suitable product (NICE TA323)",
      differs: "Recommends epoetin alfa, beta, theta and zeta and darbepoetin alfa within their marketing authorisations for anaemia in people having chemotherapy, and the product with the lowest acquisition cost where several are suitable.",
      evidence: "A NICE technology appraisal of cost-effectiveness; NICE does not grade it. ASCO/ASH likewise consider the products equivalent (informal consensus, moderate).",
      sources: ["nice-ta323", "asco-ash-2019"],
    },
    {
      name: "Wait for the response to treatment in myeloma, lymphoma and CLL (ASCO/ASH)",
      differs: "In myeloma, non-Hodgkin lymphoma and chronic lymphocytic leukaemia, observes the blood count response to cancer treatment before considering an ESA.",
      evidence: "ASCO/ASH recommendation 3; the response to treatment may correct the anaemia without an ESA.",
      sources: ["asco-ash-2019"],
    },
  ],
  grades: [
    { claim: "ESA or transfusion for chemotherapy-associated anaemia below 10 g/dL, non-curative treatment", grade: "evidence based; high; strong", source: "asco-ash-2019" },
    { claim: "No ESA when treatment is curative", grade: "evidence based; intermediate; strong", source: "asco-ash-2019" },
    { claim: "ESA for lower-risk MDS with erythropoietin 500 IU/L or below", grade: "evidence based; intermediate; moderate", source: "asco-ash-2019", quote: "ESAs may be offered to patients with lower risk myelodysplastic syndromes and a serum erythropoietin level ≤ 500 IU/L" },
    { claim: "ESAs increase thromboembolism risk", grade: "evidence based; high; strong", source: "asco-ash-2019" },
    { claim: "Iron with an ESA", grade: "evidence based; intermediate; weak", source: "asco-ash-2019" },
  ],
  sources: [
    { key: "asco-ash-2019", label: "Management of cancer-associated anemia with erythropoiesis-stimulating agents: ASCO/ASH clinical practice guideline update", publisher: "ASCO and the American Society of Hematology, Blood Advances (also published in J Clin Oncol)", year: 2019, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6482353/", doi: "10.1182/bloodadvances.2018030387", gradingScheme: "Each recommendation printed with type (evidence based or informal consensus), evidence quality (high, intermediate, low) and strength (strong, moderate, weak).", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ta323", label: "Erythropoiesis-stimulating agents (epoetin and darbepoetin) for treating anaemia in people with cancer having chemotherapy (TA323)", publisher: "NICE", year: 2014, url: "https://www.nice.org.uk/guidance/ta323/chapter/1-Guidance", gradingScheme: "NICE technology appraisals are not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "esmo-2018", label: "Management of anaemia and iron deficiency in patients with cancer: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2018, url: "https://doi.org/10.1093/annonc/mdx758", doi: "10.1093/annonc/mdx758", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The ESMO 2018 guideline could not be read: Europe PMC holds no abstract and the publisher refused a script. Its recommendations on intravenous iron without an ESA, and its ferritin and transferrin saturation thresholds, are not given here.",
    "ASCO/ASH 2019 does not set iron-deficiency thresholds or choose between oral and intravenous iron in the text read; it recommends monitoring iron, transferrin saturation or ferritin.",
    "ASCO/ASH ask that ESA doses follow FDA labelling; UK practice follows the SmPC under NICE TA323. Neither label was read.",
    "No guideline after 2019 was found in Europe PMC; newer agents for anaemia in MDS are outside this protocol.",
  ],
  institutions: ["asco", "nice"],
  technologies: ["transfusion-support"],
  drugs: ["epoetin-alfa", "darbepoetin-alfa", "epoetin-theta"],
  terms: ["anaemia"],
  related: ["mds", "red-cell-and-platelet-transfusion-thresholds"],
  sections: ["supportive-care"],
  tags: ["protocol", "anaemia", "supportive-care"],
});
