import { protocol } from "./helpers";

/*
 * Red cell and platelet transfusion thresholds for adults with cancer, including during chemotherapy and stem cell
 * transplant.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - NICE NG24, Blood transfusion (published November 2015, last updated 26 February 2026): the red blood cell
 *   transfusion, platelet transfusion and inclusions and exclusions chapters (HTML, full text). The cancer-relevant
 *   recommendations are dated [2015].
 * - Red Blood Cell Transfusion: 2023 AABB International Guidelines (JAMA 2023): abstract, from Europe PMC.
 * - Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines (JAMA 2025): abstract, from
 *   Europe PMC.
 * - ASCO platelet transfusion guideline update (J Clin Oncol 2018): abstract, from Europe PMC.
 * In the raw text, "10⁹" and "10³" print as "10 9" and "103", so quotes containing platelet counts were avoided and the
 * counts are given in the prose. Every DOI was resolved through Europe PMC and its title checked. Quotes are copied
 * from the raw text with nothing changed.
 */
export const redCellAndPlateletTransfusionThresholds = protocol({
  id: "red-cell-and-platelet-transfusion-thresholds",
  name: "Red cell and platelet transfusion thresholds in cancer care",
  aka: ["restrictive transfusion threshold", "when to transfuse in cancer", "platelet transfusion threshold during chemotherapy", "blood transfusion for anaemia in cancer", "prophylactic platelet transfusion"],
  domain: "transfusion",
  tldr: "During cancer treatment your red cells or platelets may fall. Blood or platelet transfusions are given when the levels fall below set points, or when you are bleeding, rather than to bring the numbers back to normal. Giving less blood at higher thresholds has proved just as safe in trials, and spares people the risks of transfusion.",
  simple: "Cancer treatment can lower blood cells. You may need a transfusion if levels fall low or you bleed. Doctors use set levels to decide.",
  summary: "For red cells, NICE NG24 recommends a restrictive threshold for people without major haemorrhage, acute coronary syndrome or regular transfusion for chronic anaemia: consider transfusing at haemoglobin 70 g/L, aiming for 70 to 90 g/L afterwards, with a threshold of 80 g/L and target 80 to 100 g/L in acute coronary syndrome. AABB (2023) suggests the same 7 g/dL threshold for hospitalised adults with haematological and oncological disorders (conditional, low certainty), within its strong recommendation for stable hospitalised adults generally; clinicians may use 8 g/dL with pre-existing cardiovascular disease. Give single units to adults who are not bleeding, and reassess after each.\n\nFor platelets, prophylactic transfusion is given below 10 × 10⁹/L in people not bleeding and not having procedures (NICE; AABB/ICTMG 2025 strong recommendation for chemotherapy and allogeneic transplant), with no routine prophylaxis in chronic bone marrow failure, immune thrombocytopenia, heparin-induced thrombocytopenia or TTP. Adults having autologous transplant may be transfused at the first sign of bleeding rather than prophylactically (ASCO 2018; AABB/ICTMG 2025 conditional). For bleeding, NICE offers platelets for WHO grade 2 bleeding below 30 × 10⁹/L and allows up to 100 × 10⁹/L for severe or critical-site bleeding. Before procedures, NICE considers raising the count above 50 × 10⁹/L (100 × 10⁹/L for the central nervous system or back of the eye), while AABB/ICTMG (2025) set lower thresholds for some, such as 10 × 10⁹/L for central venous catheters in compressible sites and 20 × 10⁹/L for lumbar puncture. Give a single dose and recheck.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Adults with cancer, including those having chemotherapy or a stem cell transplant, who are anaemic or thrombocytopenic. NICE NG24 excludes children under 1 year, pregnant women, people with haemoglobinopathies and major haemorrhage protocols; anaemia management before transfusion (iron, erythropoiesis-stimulating agents) is a separate question.",
  trigger: "A low haemoglobin or platelet count during cancer care, bleeding, or a planned invasive procedure.",
  steps: [
    {
      action: "Use a restrictive red cell threshold unless the person has major bleeding, acute coronary syndrome or regular transfusions for chronic anaemia",
      why: "Trials found that transfusing at a lower haemoglobin is as safe as transfusing at a higher one, and avoids unneeded blood.",
      source: "nice-ng24-rbc",
      quote: "Use restrictive red blood cell transfusion thresholds for people who need red blood cell transfusions and who do not: have major haemorrhage or have acute coronary syndrome or need regular blood transfusions for chronic anaemia.",
    },
    {
      action: "Consider transfusing at a haemoglobin of 70 g/L and aim for 70 to 90 g/L afterwards",
      why: "This is the threshold used in most trials and in both NICE and AABB.",
      source: "nice-ng24-rbc",
      quote: "When using a restrictive red blood cell transfusion threshold, consider a threshold of 70 g/litre and a haemoglobin concentration target of 70 to 90 g/litre after transfusion.",
    },
    {
      action: "Apply the same 7 g/dL threshold to hospitalised adults with blood cancers or other cancers",
      why: "AABB looked at people with haematological and oncological disorders separately and suggests the same threshold, on weaker evidence.",
      source: "aabb-rbc-2023",
      quote: "Recommendation 2: for hospitalized adult patients with hematologic and oncologic disorders, the panel suggests a restrictive transfusion strategy considering transfusion when the hemoglobin concentration is less than 7 g/dL (conditional recommendations, low certainty evidence).",
      grade: "conditional recommendation, low certainty evidence",
    },
    {
      action: "Give one unit at a time to adults who are not bleeding, then reassess and recheck the haemoglobin",
      why: "One unit is often enough, and each extra unit adds risk.",
      source: "nice-ng24-rbc",
      quote: "Consider single‑unit red blood cell transfusions for adults (or equivalent volumes calculated based on body weight for children or adults with low body weight) who do not have active bleeding.",
    },
    {
      action: "Give prophylactic platelets when the count is below 10 × 10⁹/L in someone not bleeding and not having a procedure",
      why: "This is the threshold both NICE and AABB/ICTMG use for people who are not bleeding; transfusing at higher counts adds risk without shown benefit.",
      source: "nice-ng24-platelets",
    },
    {
      action: "Do not give routine prophylactic platelets in chronic bone marrow failure, immune thrombocytopenia, heparin-induced thrombocytopenia or thrombotic thrombocytopenic purpura",
      why: "In these conditions the low count has other causes and its own treatment; NICE advises against routine prophylaxis.",
      source: "nice-ng24-platelets",
      quote: "Do not routinely offer prophylactic platelet transfusions to people with any of the following: chronic bone marrow failure autoimmune thrombocytopenia heparin‑induced thrombocytopenia thrombotic thrombocytopenic purpura.",
    },
    {
      action: "For adults having an autologous stem cell transplant at an experienced centre, consider transfusing platelets at the first sign of bleeding rather than prophylactically",
      why: "Randomised trials in this group showed that a bleeding-triggered approach is reasonable.",
      source: "asco-2018",
      quote: "Based on data from randomized controlled trials, adult patients who undergo autologous stem-cell transplantation at experienced centers may receive a platelet transfusion at the first sign of bleeding, rather than prophylactically.",
    },
    {
      action: "For clinically significant bleeding (WHO grade 2), offer platelets if the count is below 30 × 10⁹/L; for severe or critical-site bleeding, use a threshold up to 100 × 10⁹/L",
      why: "Bleeding in the brain or eye is dangerous at counts that would otherwise be safe.",
      source: "nice-ng24-platelets",
    },
    {
      action: "Do not give platelets before low-risk procedures such as central line insertion or bone marrow biopsy",
      why: "These procedures rarely bleed, and the platelets carry their own risks.",
      source: "nice-ng24-platelets",
      quote: "Do not offer prophylactic platelet transfusions to people having procedures with a low risk of bleeding, such as adults having central venous cannulation or any people having bone marrow aspiration and trephine biopsy.",
    },
    {
      action: "Give a single dose of platelets, then reassess and recheck the count before giving more",
      why: "One dose is usually enough; more doses add risk without benefit except in severe bleeding at a critical site.",
      source: "nice-ng24-platelets",
      quote: "Do not routinely transfuse more than a single dose of platelets.",
    },
  ],
  bestInClass: {
    statement: "NICE NG24 and AABB agree on restrictive thresholds. For red cells both use 70 g/L (7 g/dL); AABB's 2023 recommendation for people with haematological and oncological disorders is conditional on low-certainty evidence, while its recommendation for stable hospitalised adults overall is strong. For prophylactic platelets both use 10 × 10⁹/L in people having chemotherapy or allogeneic transplant (AABB/ICTMG 2025, strong, high or moderate certainty). They differ on procedures: NICE considers a count above 50 × 10⁹/L before invasive procedures generally and advises against platelets for central venous cannulation, whereas AABB/ICTMG (2025) set procedure-specific thresholds (10 × 10⁹/L for central lines in compressible sites, 20 × 10⁹/L for lumbar puncture and low-risk interventional radiology, 50 × 10⁹/L for high-risk interventional radiology and major non-neuraxial surgery). On autologous transplant, ASCO (2018) and AABB/ICTMG (2025, conditional) support a bleeding-triggered rather than prophylactic approach in adults.",
    sources: ["nice-ng24-rbc", "nice-ng24-platelets", "aabb-rbc-2023", "aabb-ictmg-platelets-2025", "asco-2018"],
  },
  variants: [
    {
      name: "Procedure-specific platelet thresholds (AABB and ICTMG 2025)",
      differs: "Sets thresholds by procedure: below 10 × 10⁹/L for central venous catheters in compressible sites, below 20 × 10⁹/L for lumbar puncture and low-risk interventional radiology, below 50 × 10⁹/L for high-risk interventional radiology and major non-neuraxial surgery.",
      evidence: "GRADE; strong with high or moderate certainty for lumbar puncture, conditional with low or very low certainty for the others; read as an abstract.",
      sources: ["aabb-ictmg-platelets-2025"],
    },
    {
      name: "Higher red cell threshold with cardiovascular disease (AABB 2023)",
      differs: "Allows 8 g/dL for people with pre-existing cardiovascular disease or having orthopaedic surgery, and 7.5 g/dL in cardiac surgery, in line with the trials' restrictive arms; NICE uses 80 g/L only for acute coronary syndrome.",
      evidence: "AABB recommendation 1, strong, moderate certainty; read as an abstract.",
      sources: ["aabb-rbc-2023", "nice-ng24-rbc"],
    },
  ],
  grades: [
    { claim: "Restrictive red cell threshold (7 g/dL) for stable hospitalised adults", grade: "strong recommendation, moderate certainty evidence (GRADE)", source: "aabb-rbc-2023" },
    { claim: "Restrictive red cell threshold (7 g/dL) for adults with haematological and oncological disorders", grade: "conditional recommendation, low certainty evidence (GRADE)", source: "aabb-rbc-2023" },
    { claim: "Platelets below 10 × 10⁹/L for non-bleeding people on chemotherapy or having allogeneic transplant", grade: "strong recommendation, high or moderate certainty (GRADE)", source: "aabb-ictmg-platelets-2025" },
    { claim: "No prophylactic platelets for non-bleeding adults having autologous transplant or with aplastic anaemia", grade: "conditional recommendation, low or very low certainty (GRADE)", source: "aabb-ictmg-platelets-2025", quote: "For hypoproliferative thrombocytopenia in nonbleeding adults undergoing autologous stem cell transplant or with aplastic anemia, prophylactic platelet transfusion is not recommended." },
  ],
  sources: [
    { key: "nice-ng24-rbc", label: "Blood transfusion (NG24): red blood cell transfusion", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ng24/chapter/Red-blood-cell-transfusion", gradingScheme: "NICE does not grade recommendations; each is dated, here [2015]. Published November 2015, last updated February 2026.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ng24-platelets", label: "Blood transfusion (NG24): platelet transfusion", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion", gradingScheme: "NICE does not grade recommendations; each is dated, here [2015].", read: "full-text", accessed: "2026-11-11" },
    { key: "aabb-rbc-2023", label: "Red Blood Cell Transfusion: 2023 AABB International Guidelines", publisher: "AABB, JAMA", year: 2023, url: "https://europepmc.org/abstract/MED/37824153", doi: "10.1001/jama.2023.12914", gradingScheme: "GRADE: strong or conditional recommendation, with certainty of evidence high, moderate, low or very low.", read: "abstract", accessed: "2026-11-11" },
    { key: "aabb-ictmg-platelets-2025", label: "Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines", publisher: "AABB and the International Collaboration for Transfusion Medicine Guidelines, JAMA", year: 2025, url: "https://europepmc.org/abstract/MED/40440268", doi: "10.1001/jama.2025.7529", gradingScheme: "GRADE: strong or conditional recommendation, with certainty of evidence.", read: "abstract", accessed: "2026-11-11" },
    { key: "asco-2018", label: "Platelet Transfusion for Patients With Cancer: ASCO Clinical Practice Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29182495", doi: "10.1200/JCO.2017.76.1734", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The AABB, AABB/ICTMG and ASCO guidelines were read only as abstracts; their thresholds for solid tumours, for chronic stable severe thrombocytopenia and for platelet refractoriness are not given here.",
    "NICE's thresholds date from 2015; its February 2026 update did not change the red cell or platelet recommendations read here.",
    "The platelet threshold steps carry no quotation because the raw text prints the powers of ten incorrectly; the numbers are taken from NICE recommendations 1.7.1 to 1.7.3 and checked against the text.",
    "No source read covers transfusion thresholds for children with cancer, or the use of irradiated or CMV-negative products after transplant or purine analogues.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["transfusion-support"],
  terms: ["thrombocytopenia", "anaemia"],
  sections: ["supportive-care"],
  tags: ["protocol", "transfusion", "supportive-care"],
});
