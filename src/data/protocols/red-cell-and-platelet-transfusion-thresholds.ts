import { protocol } from "./helpers";

/*
 * Red cell and platelet transfusion thresholds for adults with cancer, including during chemotherapy and stem cell
 * transplant.
 *
 * First written 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw text
 * (curl, pdftotext or the Europe PMC and gov.uk REST APIs, saved to a scratch directory) and each claim checked
 * against it:
 * - NICE NG24, Blood transfusion (published 18 November 2015, last updated 26 February 2026): the red blood cell
 *   transfusion, inclusions and exclusions and update information chapters fetched from nice.org.uk; the platelet
 *   transfusion chapter and the overview re-used from a copy a sibling checker fetched from nice.org.uk the same
 *   day. The February 2026 update added recommendations on tranexamic acid only; every recommendation used here is
 *   dated [2015].
 * - Red Blood Cell Transfusion: 2023 AABB International Guidelines (JAMA 2023): abstract, from Europe PMC. The full
 *   text at jamanetwork.com returned 403 and no open copy is listed.
 * - Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines (JAMA 2025): abstract, from
 *   Europe PMC. The full text returned 403.
 * - ASCO platelet transfusion guideline update (J Clin Oncol 2018): abstract, from Europe PMC. The full text at
 *   ascopubs.org returned 403.
 * - Added in this pass: the British Society for Haematology's own two-page summary of its platelet guideline (PDF
 *   from b-s-h.org.uk, marked "Reviewed December 2021"), and the SaBTO position statement on cytomegalovirus tested
 *   blood components (PDF from gov.uk, published 8 March 2012). The full BSH platelet guideline and the BSH 2020
 *   guideline on irradiated components are on Wiley, which returned 403.
 * In the raw text, "10⁹" and "10³" print as "109" and "103", so no quote contains a platelet count and the counts are
 * given in the prose. Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied
 * from the raw text with nothing changed, and were checked by script against the saved copies.
 */
export const redCellAndPlateletTransfusionThresholds = protocol({
  id: "red-cell-and-platelet-transfusion-thresholds",
  name: "Red cell and platelet transfusion thresholds in cancer care",
  aka: ["restrictive transfusion threshold", "when to transfuse in cancer", "platelet transfusion threshold during chemotherapy", "blood transfusion for anaemia in cancer", "prophylactic platelet transfusion"],
  domain: "transfusion",
  tldr: "During cancer treatment your red cells or platelets may fall. Transfusions are given when a level falls below a set point, or when you are bleeding, rather than to bring the numbers back to normal. In trials, waiting for a lower level before transfusing did not lead to worse outcomes for most groups of patients. Your own team's thresholds come first.",
  simple: "Cancer treatment can lower blood cells. You may need a transfusion if levels fall low or you bleed. Doctors use set levels to decide.",
  summary: "For red cells, NICE NG24 recommends restrictive thresholds for people without major haemorrhage, acute coronary syndrome or regular transfusion for chronic anaemia: consider transfusing at haemoglobin 70 g/L, aiming for 70 to 90 g/L afterwards, and consider a threshold of 80 g/L and target of 80 to 100 g/L in acute coronary syndrome. AABB (2023) recommends considering transfusion below 7 g/dL for haemodynamically stable hospitalised adults (strong, moderate certainty) and suggests the same for hospitalised adults with haematological and oncological disorders (conditional, low certainty); clinicians may choose 8 g/dL with pre-existing cardiovascular disease. NICE says to consider single units for adults who are not bleeding, and to reassess after each.\n\nFor platelets, NICE offers prophylactic transfusion below 10 × 10⁹/L to people who are not bleeding and not having procedures, and AABB/ICTMG (2025) recommend the same count for people having chemotherapy or allogeneic transplant (strong). NICE advises against routine prophylaxis in chronic bone marrow failure, autoimmune thrombocytopenia, heparin-induced thrombocytopenia and thrombotic thrombocytopenic purpura. For adults having autologous transplant, ASCO (2018) says those at experienced centres may be transfused at the first sign of bleeding instead, AABB/ICTMG (2025, conditional) do not recommend prophylaxis, and the BSH summary says to consider no prophylaxis; NICE makes no such exception. For bleeding, NICE offers platelets for WHO grade 2 bleeding below 30 × 10⁹/L and uses higher thresholds, up to 100 × 10⁹/L, for severe or critical-site bleeding. Before procedures the guidelines differ. NICE says to consider raising the count above 50 × 10⁹/L (50 to 75 × 10⁹/L where the bleeding risk is high, above 100 × 10⁹/L for surgery on the central nervous system or back of the eye) and not to offer platelets for central venous cannulation in adults. AABB/ICTMG recommend transfusion below 10 × 10⁹/L for central venous catheters in compressible sites and below 20 × 10⁹/L for lumbar puncture. The BSH summary lists 20 × 10⁹/L for central venous catheters and 40 × 10⁹/L for lumbar puncture. Give a single adult dose and recheck. On cytomegalovirus, SaBTO (2012) concluded that leucodepleted components are adequate for stem cell transplant patients without added CMV-seronegative selection.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Adults with cancer, including those having chemotherapy or a stem cell transplant, who are anaemic or thrombocytopenic. NICE NG24 gives general principles of transfusion and makes no recommendations for specific conditions such as cancer; it excludes fetuses, neonates and children under 1 year, pregnant women and people with haemoglobinopathies, and leaves trauma and massive haemorrhage to other NICE guidance. The management of anaemia in medical patients is outside its scope. The AABB red cell recommendations quoted here are for hospitalised adults.",
  trigger: "A low haemoglobin or platelet count during cancer care, bleeding, or a planned invasive procedure.",
  steps: [
    {
      action: "Use a restrictive red cell threshold unless the person has major bleeding, acute coronary syndrome or regular transfusions for chronic anaemia",
      why: "AABB's review of 45 randomised trials in adults found moderate quality evidence that, for most patient populations, restrictive thresholds did not adversely affect the outcomes that matter to patients.",
      source: "nice-ng24-rbc",
      quote: "Use restrictive red blood cell transfusion thresholds for people who need red blood cell transfusions and who do not: have major haemorrhage or have acute coronary syndrome or need regular blood transfusions for chronic anaemia.",
    },
    {
      action: "Consider transfusing at a haemoglobin of 70 g/L and aim for 70 to 90 g/L afterwards",
      why: "NICE and AABB both name this level (AABB writes it as 7 g/dL). The restrictive thresholds in the trials AABB reviewed were typically 7 to 8 g/dL.",
      source: "nice-ng24-rbc",
      quote: "When using a restrictive red blood cell transfusion threshold, consider a threshold of 70 g/litre and a haemoglobin concentration target of 70 to 90 g/litre after transfusion.",
    },
    {
      action: "In acute coronary syndrome, consider a threshold of 80 g/L and aim for 80 to 100 g/L afterwards",
      why: "NICE sets acute coronary syndrome apart from the restrictive threshold and gives it a higher one.",
      source: "nice-ng24-rbc",
      quote: "Consider a red blood cell transfusion threshold of 80 g/litre and a haemoglobin concentration target of 80 to 100 g/litre after transfusion for people with acute coronary syndrome.",
    },
    {
      action: "In hospitalised adults with blood cancers or other cancers, consider transfusion when the haemoglobin is below 7 g/dL",
      why: "AABB looked at people with haematological and oncological disorders separately and suggests the same threshold, on weaker evidence.",
      source: "aabb-rbc-2023",
      quote: "Recommendation 2: for hospitalized adult patients with hematologic and oncologic disorders, the panel suggests a restrictive transfusion strategy considering transfusion when the hemoglobin concentration is less than 7 g/dL (conditional recommendations, low certainty evidence).",
      grade: "conditional recommendations, low certainty evidence",
    },
    {
      action: "Consider giving one unit at a time to adults who are not bleeding; after each unit, reassess the person and recheck the haemoglobin",
      why: "NICE asks for a clinical reassessment and a haemoglobin check after each single unit, so that further units are given only if needed.",
      source: "nice-ng24-rbc",
      quote: "Consider single‑unit red blood cell transfusions for adults (or equivalent volumes calculated based on body weight for children or adults with low body weight) who do not have active bleeding.",
    },
    {
      action: "Offer prophylactic platelets when the count is below 10 × 10⁹/L in someone who is not bleeding and not having an invasive procedure or surgery",
      why: "NICE sets this count for people who are not bleeding, and AABB/ICTMG recommend the same count for people having chemotherapy or an allogeneic transplant. AABB/ICTMG found that giving fewer platelets probably did not increase deaths or bleeding.",
      source: "nice-ng24-platelets",
    },
    {
      action: "Do not routinely give prophylactic platelets in chronic bone marrow failure, autoimmune thrombocytopenia, heparin-induced thrombocytopenia or thrombotic thrombocytopenic purpura",
      why: "NICE names these four conditions as exceptions to routine prophylaxis. The BSH summary lists thrombotic thrombocytopenic purpura as a contraindication unless bleeding is life-threatening.",
      source: "nice-ng24-platelets",
      quote: "Do not routinely offer prophylactic platelet transfusions to people with any of the following: chronic bone marrow failure autoimmune thrombocytopenia heparin‑induced thrombocytopenia thrombotic thrombocytopenic purpura.",
    },
    {
      action: "For adults having an autologous stem cell transplant at an experienced centre, consider transfusing platelets at the first sign of bleeding rather than prophylactically",
      why: "ASCO bases this on randomised controlled trials. AABB/ICTMG do not recommend prophylactic platelets in this group, on a conditional grade. NICE makes no exception for autologous transplant.",
      source: "asco-2018",
      quote: "Based on data from randomized controlled trials, adult patients who undergo autologous stem-cell transplantation at experienced centers may receive a platelet transfusion at the first sign of bleeding, rather than prophylactically.",
    },
    {
      action: "For clinically significant bleeding (WHO grade 2), offer platelets if the count is below 30 × 10⁹/L; for severe bleeding (WHO grades 3 and 4) or bleeding in a critical site, use a higher threshold, up to 100 × 10⁹/L",
      why: "NICE names the central nervous system, including the eyes, as critical sites.",
      source: "nice-ng24-platelets",
    },
    {
      action: "Before an invasive procedure or surgery, consider platelets to raise the count above 50 × 10⁹/L, and above 100 × 10⁹/L for surgery in a critical site such as the central nervous system or the back of the eye",
      why: "NICE also says to consider a higher threshold, for example 50 to 75 × 10⁹/L, where the bleeding risk is high. AABB/ICTMG and BSH set thresholds procedure by procedure, and they differ; see the variants.",
      source: "nice-ng24-platelets",
    },
    {
      action: "Do not offer platelets before procedures with a low risk of bleeding; NICE names central venous cannulation in adults, and bone marrow aspiration and trephine biopsy",
      why: "NICE classes these as low risk. Others set a count for central lines: AABB/ICTMG recommend platelets below 10 × 10⁹/L for a catheter in a compressible site, and the BSH summary lists 20 × 10⁹/L for central venous catheters other than PICC lines.",
      source: "nice-ng24-platelets",
      quote: "Do not offer prophylactic platelet transfusions to people having procedures with a low risk of bleeding, such as adults having central venous cannulation or any people having bone marrow aspiration and trephine biopsy.",
    },
    {
      action: "Give a single dose of platelets, then reassess and recheck the count before giving more",
      why: "NICE says to consider more than a single dose only for severe thrombocytopenia with bleeding in a critical site.",
      source: "nice-ng24-platelets",
      quote: "Do not routinely transfuse more than a single dose of platelets.",
    },
  ],
  bestInClass: {
    statement: "NICE NG24 and AABB agree on restrictive thresholds. For red cells both name 70 g/L (7 g/dL): NICE says to consider it, AABB's 2023 recommendation for haemodynamically stable hospitalised adults is strong on moderate-certainty evidence, and its recommendation for people with haematological and oncological disorders is conditional on low-certainty evidence. For prophylactic platelets NICE offers transfusion below 10 × 10⁹/L to people who are not bleeding or having procedures, and AABB/ICTMG (2025) recommend the same count for non-bleeding people having chemotherapy or allogeneic transplant (strong, high or moderate certainty). They differ on procedures: NICE says to consider a count above 50 × 10⁹/L before invasive procedures generally and advises against platelets for central venous cannulation in adults, whereas AABB/ICTMG (2025) set procedure-specific thresholds (10 × 10⁹/L for central lines in compressible sites, 20 × 10⁹/L for lumbar puncture and low-risk interventional radiology, 50 × 10⁹/L for high-risk interventional radiology and major non-neuraxial surgery), and the BSH summary lists 20 × 10⁹/L for central venous catheters and 40 × 10⁹/L for lumbar puncture. On autologous transplant in adults, ASCO (2018) allows a bleeding-triggered approach at experienced centres, AABB/ICTMG (2025, conditional) do not recommend prophylaxis and the BSH summary says to consider no prophylaxis; NICE makes no such exception.",
    sources: ["nice-ng24-rbc", "nice-ng24-platelets", "aabb-rbc-2023", "aabb-ictmg-platelets-2025", "asco-2018", "bsh-platelets-2016-summary"],
  },
  variants: [
    {
      name: "Procedure-specific platelet thresholds (AABB and ICTMG 2025)",
      differs: "Sets thresholds by procedure: below 10 × 10⁹/L for central venous catheters in compressible sites in adults, below 20 × 10⁹/L for lumbar puncture and for low-risk interventional radiology in adults, below 50 × 10⁹/L for high-risk interventional radiology and major non-neuraxial surgery in adults. The abstract prints these counts per microlitre (10, 20 and 50 × 10³/μL).",
      evidence: "GRADE; strong with high or moderate certainty for lumbar puncture, conditional with low or very low certainty for the others; read as an abstract.",
      sources: ["aabb-ictmg-platelets-2025"],
    },
    {
      name: "Procedure and bleeding thresholds in the BSH summary (guideline of 2016, summary reviewed December 2021)",
      differs: "For adults. Before procedures: 20 × 10⁹/L for a central venous catheter other than a PICC line, 40 × 10⁹/L for lumbar puncture, 50 × 10⁹/L for percutaneous liver biopsy and major surgery, 80 × 10⁹/L for inserting or removing an epidural, and 100 × 10⁹/L for neurosurgery or eye surgery involving the posterior segment; not indicated for bone marrow aspirate or trephine, PICC line insertion, traction removal of a central venous catheter or cataract surgery. Prophylaxis at 10 × 10⁹/L in reversible bone marrow failure, including allogeneic transplant, with 10 to 20 × 10⁹/L where there are added risk factors for bleeding such as sepsis; not indicated in chronic stable bone marrow failure. For bleeding: 30 × 10⁹/L where it is not severe, 50 × 10⁹/L for severe bleeding, and 100 × 10⁹/L for multiple trauma, brain or eye injury or spontaneous intracerebral haemorrhage.",
      evidence: "The summary prints no grades. It is the society's own two-page summary; the full guideline (Br J Haematol 2017) could not be read.",
      sources: ["bsh-platelets-2016-summary"],
    },
    {
      name: "Higher red cell threshold with cardiovascular disease (AABB 2023)",
      differs: "Says clinicians may choose 8 g/dL for people with pre-existing cardiovascular disease or having orthopaedic surgery, and 7.5 g/dL in cardiac surgery, in line with the restrictive threshold used in most trials. NICE gives a higher threshold (consider 80 g/L) only for acute coronary syndrome.",
      evidence: "Stated in the abstract after AABB recommendation 1 (strong, moderate certainty) as a choice clinicians may make; the abstract prints no separate grade for it. Read as an abstract.",
      sources: ["aabb-rbc-2023", "nice-ng24-rbc"],
    },
    {
      name: "CMV-seronegative components after stem cell transplant (SaBTO 2012, United Kingdom)",
      differs: "Concludes that leucodepletion, which all UK blood components other than granulocytes undergo, is adequate for stem cell transplant patients, organ transplant patients and immune deficient patients, without CMV-seronegative components in addition. It keeps CMV-seronegative red cells and platelets for intra-uterine transfusions, neonates and elective transfusions in pregnancy, and CMV-seronegative granulocytes for CMV-seronegative patients.",
      evidence: "A position statement of the UK advisory committee; it prints no grades.",
      sources: ["sabto-cmv-2012"],
    },
  ],
  grades: [
    { claim: "Restrictive red cell threshold (7 g/dL) for haemodynamically stable hospitalised adults", grade: "strong recommendation, moderate certainty evidence", source: "aabb-rbc-2023" },
    { claim: "Restrictive red cell threshold (7 g/dL) for hospitalised adults with haematological and oncological disorders", grade: "conditional recommendations, low certainty evidence", source: "aabb-rbc-2023" },
    { claim: "Platelets below 10 × 10⁹/L for non-bleeding people on chemotherapy or having allogeneic transplant, and below 20 × 10⁹/L before lumbar puncture (the abstract grades these as a group)", grade: "strong recommendations with high/moderate-certainty evidence", source: "aabb-ictmg-platelets-2025", quote: "The following recommendations are strong recommendations with high/moderate-certainty evidence." },
    { claim: "No prophylactic platelets for non-bleeding adults having autologous transplant or with aplastic anaemia (graded as part of a group)", grade: "conditional recommendations with low/very low-certainty evidence", source: "aabb-ictmg-platelets-2025", quote: "For hypoproliferative thrombocytopenia in nonbleeding adults undergoing autologous stem cell transplant or with aplastic anemia, prophylactic platelet transfusion is not recommended." },
    { claim: "CMV-seronegative components not needed in addition to leucodepletion after stem cell transplant", grade: "not graded", source: "sabto-cmv-2012", quote: "CMV seronegative red cells and platelets may be replaced with leucodepleted blood components for adults and children post haemopoeitic stem cell transplantation, for all patient groups including seronegative donor/seronegative recipients." },
  ],
  sources: [
    { key: "nice-ng24-rbc", label: "Blood transfusion (NG24): red blood cell transfusion", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ng24/chapter/Red-blood-cell-transfusion", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider, do not offer) shows their strength, and each is dated, here [2015]. Published 18 November 2015, last updated 26 February 2026.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng24-platelets", label: "Blood transfusion (NG24): platelet transfusion", publisher: "NICE", year: 2015, url: "https://www.nice.org.uk/guidance/ng24/chapter/Platelet-transfusion", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider, do not offer) shows their strength, and each is dated, here [2015].", read: "full-text", accessed: "2026-11-17" },
    { key: "aabb-rbc-2023", label: "Red Blood Cell Transfusion: 2023 AABB International Guidelines", publisher: "AABB, JAMA", year: 2023, url: "https://europepmc.org/abstract/MED/37824153", doi: "10.1001/jama.2023.12914", gradingScheme: "GRADE: strong or conditional recommendation, with the certainty of evidence stated.", read: "abstract", accessed: "2026-11-17" },
    { key: "aabb-ictmg-platelets-2025", label: "Platelet Transfusion: 2025 AABB and ICTMG International Clinical Practice Guidelines", publisher: "AABB and the International Collaboration for Transfusion Medicine Guidelines, JAMA", year: 2025, url: "https://europepmc.org/abstract/MED/40440268", doi: "10.1001/jama.2025.7529", gradingScheme: "GRADE: strong or conditional recommendation, with certainty of evidence. The abstract grades its recommendations in two groups rather than one by one.", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-2018", label: "Platelet Transfusion for Patients With Cancer: American Society of Clinical Oncology Clinical Practice Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29182495", doi: "10.1200/JCO.2017.76.1734", gradingScheme: "The abstract prints no grades.", read: "abstract", accessed: "2026-11-17" },
    { key: "bsh-platelets-2016-summary", label: "Summary of Guidelines for the Use of Platelet Transfusions: A British Society for Haematology Guideline (2016), Appendix 1", publisher: "British Society for Haematology", year: 2016, url: "https://b-s-h.org.uk/media/20677/bsh-platelet-transfusion-guidelines-summary-2021.pdf", gradingScheme: "The summary prints no grades. It is marked \"Reviewed December 2021\".", read: "public-summary", accessed: "2026-11-17" },
    { key: "sabto-cmv-2012", label: "Cytomegalovirus tested blood components: position statement", publisher: "Advisory Committee on the Safety of Blood, Tissues and Organs (SaBTO), Department of Health", year: 2012, url: "https://www.gov.uk/government/publications/sabto-report-of-the-cytomegalovirus-steering-group", gradingScheme: "A position statement; recommendations are not graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The AABB, AABB/ICTMG and ASCO guidelines were read only as abstracts: on 17 November 2026 their full texts at jamanetwork.com and ascopubs.org returned 403 and Europe PMC lists no open copy. Their thresholds for solid tumours, for chronic stable severe thrombocytopenia and for platelet refractoriness are not given here, and the grade of each AABB/ICTMG recommendation is known only as one of the abstract's two groups.",
    "No newer edition of the AABB red cell (2023), AABB/ICTMG platelet (2025) or ASCO platelet (2018) guideline was found in Europe PMC or Crossref on 17 November 2026. The ASCO guideline predates the AABB/ICTMG 2025 guideline by seven years.",
    "NICE's thresholds date from 2015; its 26 February 2026 update added recommendations on tranexamic acid during surgery and did not change the red cell or platelet recommendations read here. NICE NG24 is a general transfusion guideline and makes no recommendations specific to cancer.",
    "The platelet threshold steps carry no quotation because the raw text prints the powers of ten incorrectly; the numbers are taken from NICE recommendations 1.7.1 to 1.7.6 and checked against the text. AABB/ICTMG print counts per microlitre (for example 10 × 10³/μL), written here in the same form as NICE.",
    "The British Society for Haematology platelet guideline (Br J Haematol 2017, doi 10.1111/bjh.14423) was read only as the society's two-page summary; on 17 November 2026 the full text on Wiley returned 403, so its grades and reasoning are not given here. The society's page gives its date as 23 December 2016 and its last review as 14 January 2022.",
    "Irradiated components: the British Society for Haematology's Guidelines on the use of irradiated blood components (Br J Haematol 2020, doi 10.1111/bjh.17015) exist, but on 17 November 2026 the full text returned 403 and no source read says which patients need irradiated red cells or platelets, so this page does not say.",
    "The SaBTO statement on CMV-seronegative components dates from March 2012 and applies to the United Kingdom; no later statement was found on gov.uk on 17 November 2026, and no other country's position was read.",
    "No source read covers transfusion thresholds for children with cancer.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["transfusion-support"],
  terms: ["thrombocytopenia", "anaemia"],
  sections: ["supportive-care"],
  tags: ["protocol", "transfusion", "supportive-care"],
});
