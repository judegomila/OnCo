import { protocol } from "./helpers";

/*
 * Venous thromboembolism (blood clot) risk assessment and primary thromboprophylaxis for people having anticancer
 * treatment as outpatients.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - ITAC 2022 international clinical practice guidelines (Farge et al., Lancet Oncol 2022): full text from Europe PMC
 *   (PMC9236567), including the recommendation panels with GRADE ratings.
 * - NICE NG89, venous thromboembolism in over 16s (published March 2018, last updated August 2019), recommendations page
 *   (HTML, full text), section 1.6 on people with cancer.
 * - ASCO VTE guideline updates 2020 and 2023: abstracts only, from Europe PMC. The 2023 update changed only the surgical
 *   and treatment questions; the outpatient recommendation is the 2020 one. ascopubs.org returned 403 to a script.
 * - ESMO 2023 VTE guideline: Europe PMC holds no abstract and annalsofoncology.org returned 403. Not read.
 * - Khorana et al. 2008, the derivation and validation of the Khorana score: abstract only, from Europe PMC.
 * No ITAC update after 2022 was found in Europe PMC. Every DOI was resolved through Europe PMC and its title checked.
 * Quotes are copied from the raw text with nothing changed.
 */
export const vteRiskAssessmentAndThromboprophylaxisAmbulatory = protocol({
  id: "vte-risk-assessment-and-thromboprophylaxis-ambulatory",
  name: "Blood clot risk assessment and preventive anticoagulation during outpatient cancer treatment",
  aka: ["Khorana score", "ambulatory thromboprophylaxis", "primary VTE prophylaxis in cancer outpatients", "cancer-associated thrombosis prevention", "blood thinners to prevent clots during chemotherapy"],
  domain: "supportive-care",
  tldr: "Cancer and its treatment raise the chance of a blood clot in a leg or lung. Most people having treatment as outpatients do not need a blood thinner, but some do: your team can work out your risk with a simple score from your blood count, weight and type of cancer. Everyone should know the signs of a clot: a swollen, painful leg or sudden breathlessness or chest pain.",
  simple: "Cancer can make blood clots more likely. Your team checks how likely a clot is. If your risk is high, they may offer a blood thinner. Tell them at once about a swollen leg or sudden breathlessness.",
  summary: "Routine thromboprophylaxis is not recommended for all outpatients with cancer (ITAC 2022; ASCO 2020; NICE NG89 for mobile people on anticancer treatment). Risk is assessed at the start of systemic treatment and periodically, with a validated model: the Khorana score gives 2 points for a very high-risk cancer site and 1 point each for a high-risk site, platelets of 350 × 10⁹/L or more, haemoglobin below 100 g/L or use of an erythropoiesis-stimulating agent, white cells above 11 × 10⁹/L and a body mass index of 35 or more.\n\nThe guidelines differ on who should be offered prophylaxis. ITAC (2022) recommends rivaroxaban or apixaban for ambulatory patients on systemic anticancer therapy with a Khorana score of 2 or more who are not bleeding or at high bleeding risk (grade 1B); ASCO (2020) says clinicians may offer apixaban, rivaroxaban or low-molecular-weight heparin to selected high-risk outpatients. NICE NG89 (2018) does not use a score: it advises against prophylaxis for mobile people on cancer treatment except for myeloma on thalidomide, pomalidomide or lenalidomide with steroids (aspirin or low-molecular-weight heparin) and pancreatic cancer on chemotherapy (low-molecular-weight heparin), continued for as long as chemotherapy lasts. ITAC also recommends prophylaxis in locally advanced or metastatic pancreatic cancer with low bleeding risk (low-molecular-weight heparin grade 1A, rivaroxaban or apixaban grade 1B) and in myeloma on immunomodulatory drugs (grade 1A), and does not recommend low-molecular-weight heparin prophylaxis outside a trial in advanced lung cancer.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults with cancer having systemic anticancer treatment as outpatients. People admitted to hospital, people having cancer surgery, people with a central venous catheter and the treatment of an established clot are covered by separate recommendations in the same guidelines and are not covered here. NICE NG89 covers people aged 16 or over.",
  trigger: "Systemic anticancer treatment is about to start, and periodically during it.",
  steps: [
    {
      action: "Do not give preventive blood thinners routinely to every outpatient with cancer",
      why: "For most people the chance of a clot is lower than the chance of a bleed from the blood thinner.",
      source: "asco-2020",
      quote: "Thromboprophylaxis is not routinely recommended for all outpatients with cancer.",
    },
    {
      action: "Assess clot risk when systemic treatment starts and again during it, with a validated score such as the Khorana score",
      why: "Risk changes with the cancer, the treatment and the blood count, and a score picks out the minority at high risk.",
      source: "asco-2020",
      quote: "Patients with cancer should be periodically assessed for VTE risk, and oncology professionals should provide patient education about the signs and symptoms of VTE.",
    },
    {
      action: "Score the cancer site, platelet count, haemoglobin or use of an erythropoiesis-stimulating agent, white cell count and body mass index",
      why: "These five items were the ones that predicted clots in a large group of outpatients on chemotherapy; a score of 3 or more marked a risk of about 7 per cent over the first few months.",
      source: "khorana-2008",
      quote: "Five predictive variables were identified in a multivariate model: site of cancer (2 points for very high-risk site, 1 point for high-risk site), platelet count of 350 x 10(9)/L or more, hemoglobin less than 100 g/L (10 g/dL) and/or use of erythropoiesis-stimulating agents, leukocyte count more than 11 x 10(9)/L, and body mass index of 35 kg/m(2) or more (1 point each).",
    },
    {
      action: "Check bleeding risk and medicine interactions before offering an anticoagulant",
      why: "Prophylaxis is only for people who are not bleeding and not at high risk of bleeding; some anticancer drugs interact with the newer oral anticoagulants.",
      source: "itac-2022",
      quote: "and not actively bleeding or not at a high risk for bleeding (grade 1B).",
    },
    {
      action: "For a Khorana score of 2 or more and low bleeding risk, offer rivaroxaban or apixaban (ITAC) or, under ASCO, apixaban, rivaroxaban or low-molecular-weight heparin",
      why: "In a meta-analysis ITAC cites, preventive anticoagulation cut clots by about two fifths at a score of 2 or more, and by more at 3 or more, without a rise in major bleeding.",
      source: "itac-2022",
      quote: "Primary prophylaxis with direct oral anticoagulant (rivaroxaban or apixaban) is recommended in ambulatory patients who are receiving systemic anticancer therapy and are at intermediate-to-high-risk of VTE, identified by a validated risk assessment model (ie, a Khorana score ≥2), and not actively bleeding or not at a high risk for bleeding (grade 1B).",
      grade: "1B",
    },
    {
      action: "In locally advanced or metastatic pancreatic cancer on systemic treatment with low bleeding risk, offer prophylaxis with low-molecular-weight heparin or rivaroxaban or apixaban",
      why: "Pancreatic cancer carries one of the highest clot risks, and two randomised trials support prophylaxis.",
      source: "itac-2022",
      quote: "Primary pharmacological prophylaxis of VTE with LMWH (grade 1A) or with direct oral anticoagulants (rivaroxaban or apixaban; grade 1B) is indicated in ambulatory patients with locally advanced or metastatic pancreatic cancer treated with systemic anticancer therapy and who have a low risk of bleeding.",
      grade: "1A (LMWH); 1B (rivaroxaban or apixaban)",
    },
    {
      action: "In myeloma treated with thalidomide, lenalidomide or pomalidomide with steroids, give prophylaxis: aspirin or low-molecular-weight heparin, or under ITAC also a prophylactic-dose anticoagulant",
      why: "These drugs combined with steroids raise the risk of clots substantially.",
      source: "itac-2022",
      quote: "In patients with myeloma treated with immunomodulatory drugs combined with steroids or other systemic anticancer therapies, VTE primary pharmacological prophylaxis is recommended (grade 1A)",
      grade: "1A",
    },
    {
      action: "Do not use low-molecular-weight heparin prophylaxis in advanced lung cancer outside a clinical trial",
      why: "The trials in lung cancer did not show a net benefit large enough to recommend it.",
      source: "itac-2022",
      quote: "Primary pharmacological prophylaxis of VTE with LMWH is not recommended outside of a clinical trial for patients with locally advanced or metastatic lung cancer treated with systemic anticancer therapy, including patients who have a low risk of bleeding (guidance).",
      grade: "guidance",
    },
    {
      action: "Where prophylaxis is given, continue it for as long as the chemotherapy continues",
      why: "The raised risk lasts as long as the treatment that causes it.",
      source: "nice-ng89",
      quote: "If giving VTE prophylaxis to people with cancer (see recommendations 1.6.2 and 1.6.3), continue for as long as they are receiving chemotherapy.",
    },
    {
      action: "Teach every patient the signs of a clot and to report them the same day",
      why: "A swollen painful leg, or new breathlessness or chest pain, can be a clot that needs treatment straight away.",
      source: "asco-2020",
      quote: "Patients with cancer should be periodically assessed for VTE risk, and oncology professionals should provide patient education about the signs and symptoms of VTE.",
    },
  ],
  bestInClass: {
    statement: "The guidelines agree that routine prophylaxis for all outpatients is not recommended and that pancreatic cancer and myeloma on immunomodulatory drugs are exceptions; they disagree on whether a risk score should decide it for everyone else. ITAC (2022, GRADE) recommends rivaroxaban or apixaban at a Khorana score of 2 or more with low bleeding risk (grade 1B); ASCO (2020) allows apixaban, rivaroxaban or low-molecular-weight heparin for selected high-risk outpatients, and its 2023 update did not change this; NICE NG89 (2018) does not use a score and limits prophylaxis in mobile people on cancer treatment to myeloma on thalidomide, pomalidomide or lenalidomide with steroids and to pancreatic cancer on chemotherapy. The ESMO 2023 guideline could not be read.",
    sources: ["itac-2022", "asco-2020", "asco-2023", "nice-ng89", "esmo-2023"],
  },
  variants: [
    {
      name: "No risk score; prophylaxis only in myeloma and pancreatic cancer (NICE NG89)",
      differs: "Advises against prophylaxis for mobile people on chemotherapy, radiotherapy or immunotherapy unless they have another reason for raised risk, and considers it only for myeloma on thalidomide, pomalidomide or lenalidomide with steroids (aspirin 75 mg or 150 mg, or low-molecular-weight heparin) and pancreatic cancer on chemotherapy (low-molecular-weight heparin).",
      evidence: "NICE does not grade recommendations; NG89's cancer recommendations date from 2018, before the direct oral anticoagulant trials in outpatients were reflected in ITAC 2022.",
      sources: ["nice-ng89"],
    },
    {
      name: "Low-molecular-weight heparin as an option at high Khorana risk (ASCO 2020)",
      differs: "Includes low-molecular-weight heparin, as well as apixaban and rivaroxaban, for selected high-risk outpatients, where ITAC's Khorana recommendation names the two oral drugs only.",
      evidence: "Read as an abstract; the abstract does not give the score threshold or the grade.",
      sources: ["asco-2020"],
    },
    {
      name: "Aspirin 100 mg in myeloma (ITAC)",
      differs: "Lists low-dose aspirin 100 mg daily, prophylactic low-molecular-weight heparin, low or therapeutic-dose vitamin K antagonists and prophylactic apixaban as options in myeloma on immunomodulatory drugs, where NICE names aspirin 75 or 150 mg or low-molecular-weight heparin.",
      evidence: "ITAC grades the choice among these 2B, saying they have shown similar effects in preventing clots.",
      sources: ["itac-2022", "nice-ng89"],
    },
  ],
  grades: [
    { claim: "Rivaroxaban or apixaban for ambulatory patients on systemic anticancer therapy with a Khorana score of 2 or more and low bleeding risk", grade: "1B (GRADE)", source: "itac-2022" },
    { claim: "Low-molecular-weight heparin in locally advanced or metastatic pancreatic cancer on systemic treatment, low bleeding risk", grade: "1A (GRADE)", source: "itac-2022" },
    { claim: "Rivaroxaban or apixaban in the same pancreatic cancer setting", grade: "1B (GRADE)", source: "itac-2022" },
    { claim: "Prophylaxis in myeloma on immunomodulatory drugs with steroids or other systemic therapy", grade: "1A (GRADE)", source: "itac-2022" },
    { claim: "Choice among anticoagulants and low-dose aspirin in myeloma", grade: "2B (GRADE)", source: "itac-2022", quote: "or low-dose aspirin (100 mg daily) can be used, and have shown similar effects with regard to preventing VTE (grade 2B)." },
    { claim: "No low-molecular-weight heparin prophylaxis outside a trial in advanced lung cancer", grade: "guidance (no GRADE rating)", source: "itac-2022" },
  ],
  sources: [
    { key: "itac-2022", label: "2022 international clinical practice guidelines for the treatment and prophylaxis of venous thromboembolism in patients with cancer, including patients with COVID-19", publisher: "International Initiative on Thrombosis and Cancer (ITAC), Lancet Oncology", year: 2022, url: "https://europepmc.org/article/PMC/PMC9236567", doi: "10.1016/S1470-2045(22)00160-7", gradingScheme: "GRADE methodology, printed as grade 1A, 1B, 2A and so on; 'guidance' where data are absent and the panel gives its own advice.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ng89", label: "Venous thromboembolism in over 16s: reducing the risk of hospital-acquired deep vein thrombosis or pulmonary embolism (NG89), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng89/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider', 'do not offer') and each is dated, for example [2018]. Published March 2018, last updated August 2019.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2020", label: "Venous Thromboembolism Prophylaxis and Treatment in Patients With Cancer: ASCO Clinical Practice Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/31381464", doi: "10.1200/JCO.19.01461", read: "abstract", accessed: "2026-11-11" },
    { key: "asco-2023", label: "Venous Thromboembolism Prophylaxis and Treatment in Patients With Cancer: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2023, url: "https://europepmc.org/abstract/MED/37075273", doi: "10.1200/JCO.23.00294", read: "abstract", accessed: "2026-11-11" },
    { key: "esmo-2023", label: "Venous thromboembolism in cancer patients: ESMO Clinical Practice Guideline", publisher: "ESMO, Annals of Oncology", year: 2023, url: "https://doi.org/10.1016/j.annonc.2022.12.014", doi: "10.1016/j.annonc.2022.12.014", read: "not-reachable", accessed: "2026-11-11" },
    { key: "khorana-2008", label: "Development and validation of a predictive model for chemotherapy-associated thrombosis", publisher: "Blood", year: 2008, url: "https://europepmc.org/abstract/MED/18216292", doi: "10.1182/blood-2007-10-116327", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-upgrade-clot-risk-score-and-preventive-anticoagulation"],
  gaps: [
    "The ESMO 2023 guideline could not be read: Europe PMC holds no abstract and the publisher's page refused a script. Its position on the Khorana score and on direct oral anticoagulants is not stated here.",
    "ASCO 2020 and 2023 were read only as abstracts, so ASCO's Khorana threshold, grades and doses are not given here.",
    "The Khorana abstract does not list which cancer sites count as very high or high risk; the ITAC text read does not list them either.",
    "None of the sources read gives doses for prophylactic apixaban, rivaroxaban or low-molecular-weight heparin in this setting; these come from the product label and the local formulary.",
    "No source read settles prophylaxis for people on immunotherapy alone or on oral targeted drugs, whose clot risk the Khorana score was not built for.",
    "NICE NG89's cancer recommendations date from 2018 and predate the outpatient trials of direct oral anticoagulants that ITAC 2022 draws on.",
  ],
  institutions: ["nice", "asco", "esmo"],
  technologies: ["cancer-associated-thrombosis"],
  drugs: ["aspirin", "apixaban", "rivaroxaban"],
  terms: ["vte"],
  cancers: ["pancreatic", "multiple-myeloma"],
  related: ["thalidomide", "lenalidomide", "pomalidomide"],
  sections: ["supportive-care"],
  tags: ["protocol", "thrombosis", "supportive-care"],
});
