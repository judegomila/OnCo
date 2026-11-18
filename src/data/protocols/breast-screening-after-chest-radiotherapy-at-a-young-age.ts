import { protocol } from "./helpers";

/*
 * Breast cancer surveillance for women and girls who had radiotherapy exposing breast tissue when young (for example
 * mantle or chest radiotherapy for Hodgkin lymphoma), and after high-dose anthracyclines.
 *
 * What was read, and how (first on 11 November 2026; re-read claim by claim on 17 November 2026 in a second accuracy
 * pass, each source fetched raw with curl and read as text, every quote checked verbatim by script):
 * - International Late Effects of Childhood Cancer Guideline Harmonization Group (IGHG) updated breast cancer
 *   surveillance recommendations (Mulder et al., J Clin Oncol 2020): full text as HTML from PubMed Central
 *   (PMC7723685). Tables 1 to 3 and Figures 1 and 2 are images and were not read; the Data Supplement was not read.
 * - IGHG recommendations for breast cancer surveillance after anthracyclines (JCO Oncol Pract 2026): abstract, from
 *   the Europe PMC REST API, which lists no open full text.
 * - NHS Breast Screening Programme very high risk guidance on GOV.UK (both pages updated 11 November 2026, apply to
 *   England): "The Surveillance of women at very high risk of developing breast cancer" and "Eligibility criteria and
 *   screening protocols for women at very high risk of breast cancer", full text (HTML).
 * Both DOIs were resolved through Crossref and Europe PMC and their titles checked. Quotes are copied from the raw text
 * with nothing changed. Second pass changes: the incidence figures are now scoped as IGHG scopes them, the reasons in
 * each step say only what the sources say, the patient summary separates the IGHG start age from the NHS one, total
 * body irradiation is described as both sources leave it, and the two GOV.UK pages carry their current titles.
 */
export const breastScreeningAfterChestRadiotherapyAtAYoungAge = protocol({
  id: "breast-screening-after-chest-radiotherapy-at-a-young-age",
  name: "Breast screening after chest radiotherapy at a young age",
  aka: ["breast cancer surveillance after Hodgkin lymphoma", "breast MRI after mantle radiotherapy", "very high risk breast screening after radiotherapy", "IGHG breast surveillance", "BARD referral"],
  domain: "survivorship",
  tldr: "Women who had radiotherapy to the chest as children, teenagers or young adults, for example for Hodgkin lymphoma, have a higher chance of breast cancer at a young age. International guidance recommends a yearly breast MRI and mammogram from age 25, or 8 years after the radiotherapy if later. In England the NHS very high risk screening programme arranges yearly scans from 25 or 30.",
  simple: "Radiotherapy to the chest when young raises the chance of breast cancer later. Yearly breast scans are offered from 25 or 30, or from 8 years after the radiotherapy if that is later.",
  summary: "Women given radiotherapy to fields that expose breast tissue as children, adolescents or young adults are at increased risk of breast cancer at a young age. IGHG 2020 reports a cumulative incidence of 13 to 20 per cent by age 40 to 45 in survivors of childhood cancer and as high as 35 per cent by age 50 in survivors of Hodgkin lymphoma. After chest radiotherapy of 10 Gy or more IGHG recommends annual mammography and breast MRI from age 25 or 8 years after radiotherapy, whichever is later, up to at least age 60 (level A, strong), and considers annual surveillance at 25 reasonable after upper abdominal radiotherapy exposing breast tissue at a young age (level B, moderate). It could make no recommendation after total body irradiation at a prescribed dose below 10 Gy. Surveillance should come with counselling on its benefits and harms.\n\nIn England the NHS Breast Screening Programme very high risk service takes women irradiated to breast tissue between 10 and 35 years of age, identified for lymphoma by the BARD dataset or referred by oncologists through BARD: annual MRI from 25 (irradiated at 10 to under 20) or 30 (irradiated at 20 to under 36), or 8 years after the first radiotherapy if later; annual MRI with mammography from 40 to under 51; annual mammography with or without MRI from 51 to under 71. Females irradiated below 10 are not tested by the programme, and NHS England has still to decide whether earlier total body irradiation qualifies. For anthracyclines without chest radiotherapy, IGHG's 2026 update considers surveillance reasonable after 200 mg/m² of doxorubicin or more, from 30 or 8 years after exposure, whichever is later.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Women who as children, adolescents or young adults had radiotherapy exposing breast tissue, above all for Hodgkin lymphoma. IGHG covers females diagnosed with cancer before 30 and 2 or more years after treatment, and counts thorax, whole or partial lung, mediastinal, axillary, mantle, mini-mantle and total or subtotal lymphoid fields, upper abdominal fields likely to expose breast tissue and total body irradiation, though it makes no recommendation after total body irradiation below 10 Gy. The NHS programme in England takes women irradiated between 10 and under 36. Under the 2026 IGHG update, also women treated with 200 mg/m² or more of doxorubicin without chest radiotherapy. Women with a genetic predisposition are outside the IGHG guideline and follow separate protocols.",
  trigger: "Under IGHG, a survivor treated with chest radiotherapy when young reaches age 25, or 8 years have passed since radiotherapy, whichever is later. In the NHS programme in England the age is 25 or 30, depending on the age at radiotherapy.",
  steps: [
    {
      action: "Identify women who had radiotherapy exposing breast tissue when young",
      why: "Their risk of breast cancer at a young age is raised, so IGHG says screening tailored to that risk has been recommended for them.",
      source: "ighg-2020",
      quote: "Female survivors of childhood, adolescent, and young adult (CAYA) cancer treated with radiation to fields that expose breast tissue—hereafter referred to as chest radiation—are at increased risk of developing breast cancer at a young age.",
    },
    {
      action: "Counsel the survivor on the benefits and harms of surveillance, using the IGHG survivor information form",
      why: "Scans can raise false alarms that lead to more imaging, biopsies and anxiety, and can sometimes miss a cancer; IGHG wants the decision to be an informed one.",
      source: "ighg-2020",
      quote: "A survivor information form was developed to counsel survivors about the potential harms and benefits of surveillance.",
    },
    {
      action: "After chest radiotherapy of 10 Gy or more, offer yearly mammography and breast MRI from age 25 or 8 years after radiotherapy, whichever is later, until at least 60",
      why: "In these survivors mammography and MRI together detect breast cancer better than either test alone, and the panel expects the benefits to outweigh the harms.",
      source: "ighg-2020",
      quote: "Therefore, annual breast cancer surveillance with both mammography and MRI is recommended for survivors of CAYA cancer treated with 10 Gy or more chest radiation with an attained age of 25 years or 8 years after radiation, whichever occurs last, for at least up to age 60 years (level A, strong recommendation).",
      grade: "level A, strong recommendation",
    },
    {
      action: "After upper abdominal radiotherapy that exposed breast tissue at a young age, consider yearly surveillance at 25, deciding with the woman",
      why: "IGHG says the balance of benefits and harms is less clear here, so the decision should be an individual one.",
      source: "ighg-2020",
      quote: "annual surveillance is reasonable at age 25 years for survivors treated with upper abdominal radiation—that can extend above the diaphragm—at a young age (level B, moderate recommendation).",
      grade: "level B, moderate recommendation",
    },
    {
      action: "In England, refer eligible women to the NHS Breast Screening Programme very high risk service; women treated for lymphoma are found through BARD, others through the BARD non-lymphoma referral form",
      why: "BARD finds these women from cancer registries and radiotherapy records and sends the referral to the breast screening service; a woman still too young is kept on the system to be invited at the right age.",
      source: "nhs-bsp-protocols-2026",
      quote: "BARD - for women who received radiotherapy to sites involving breast tissue during treatment for lymphoma and non-lymphomas (where appropriate)",
    },
    {
      action: "In the NHS programme, follow the age bands: annual MRI from 25 or 30 (by age at radiotherapy) to under 40, annual MRI with mammography from 40 to under 51, and annual mammography with or without MRI from 51 to under 71",
      why: "The programme sets which test is used at which age, and the start depends on the age at radiotherapy.",
      source: "nhs-bsp-frequency-2026",
      quote: "Surveillance starts at age 25 or 8 years after first irradiation, whichever is the later",
    },
    {
      action: "After 200 mg/m² or more of doxorubicin without chest radiotherapy, consider routine surveillance from 30 or 8 years after exposure, whichever is later; IGHG makes no recommendation for other anthracyclines",
      why: "IGHG found a moderate breast cancer risk (a relative risk of 2 to 4) at these doxorubicin doses even without chest radiotherapy, and inconclusive evidence for daunorubicin, epirubicin and idarubicin.",
      source: "ighg-2026",
      quote: "Due to inconclusive evidence, no recommendation could be formulated for routine breast cancer surveillance after daunorubicin, epirubicin, or idarubicin, in the absence of chest radiation.",
    },
  ],
  bestInClass: {
    statement: "IGHG (2020) is the international harmonised recommendation: annual mammography plus breast MRI from 25 or 8 years after chest radiotherapy of 10 Gy or more, whichever is later, until at least 60 (level A, strong), with counselling on benefits and harms. The NHS very high risk programme in England (pages updated 11 November 2026) uses age bands and differs in these ways: it starts at 30 for women irradiated at 20 to under 36, uses MRI alone before 40 and mammography with or without MRI from 51 to under 71, does not test females irradiated before age 10, and its pages state no radiation dose threshold. IGHG's 2026 update extends surveillance to survivors of 200 mg/m² or more of doxorubicin without chest radiotherapy; the NHS programme pages read do not mention them.",
    sources: ["ighg-2020", "nhs-bsp-frequency-2026", "nhs-bsp-protocols-2026", "ighg-2026"],
  },
  variants: [
    {
      name: "NHS Breast Screening Programme very high risk protocol (England)",
      differs: "Irradiated at 10 to under 20: annual MRI from 25 to under 40. Irradiated at 20 to under 36: annual MRI from 30 to under 40. Both: annual MRI with mammography from 40 to under 51, annual mammography with or without MRI from 51 to under 71, starting no earlier than 8 years after the first radiotherapy. Females irradiated below 10 are not tested by the programme. Women over 70 have one initial screen and then refer themselves each year. Total body irradiation is under review by NHS England and is not yet an eligibility criterion.",
      evidence: "A national screening protocol; not graded.",
      sources: ["nhs-bsp-frequency-2026", "nhs-bsp-protocols-2026"],
    },
    {
      name: "Surveillance after anthracyclines without chest radiotherapy (IGHG 2026)",
      differs: "Adds routine surveillance from 30 or 8 years after exposure for survivors treated with 200 mg/m² or more of doxorubicin; makes no recommendation for daunorubicin, epirubicin or idarubicin without chest radiotherapy.",
      evidence: "GRADE: moderate-quality evidence of no significant association below 100 mg/m² of doxorubicin; high-quality evidence of a statistically significant but weak association at 100 to 199 mg/m² (relative risk below 2) and a moderate risk at 200 mg/m² or more (relative risk 2 to 4). The abstract prints no grade for the recommendation itself. Read as an abstract.",
      sources: ["ighg-2026"],
    },
  ],
  grades: [
    { claim: "Annual mammography and MRI after 10 Gy or more chest radiotherapy, from 25 or 8 years after, to at least 60", grade: "level A, strong recommendation", source: "ighg-2020" },
    { claim: "Annual surveillance after upper abdominal radiotherapy exposing breast tissue at a young age", grade: "level B, moderate recommendation", source: "ighg-2020" },
  ],
  sources: [
    { key: "ighg-2020", label: "Updated Breast Cancer Surveillance Recommendations for Female Survivors of Childhood, Adolescent, and Young Adult Cancer From the International Guideline Harmonization Group", publisher: "International Late Effects of Childhood Cancer Guideline Harmonization Group, Journal of Clinical Oncology", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7723685/", doi: "10.1200/JCO.20.00562", gradingScheme: "GRADE Evidence-to-Decision framework. Evidence is printed with a level (A, B or C) and each recommendation with a strength (strong or moderate); the definitions are in the Data Supplement, which was not read.", read: "full-text", accessed: "2026-11-17" },
    { key: "ighg-2026", label: "International Guideline Harmonization Group Recommendations for Breast Cancer Surveillance in Childhood, Adolescent, and Young Adult Cancer Survivors After Anthracyclines", publisher: "IGHG, JCO Oncology Practice", year: 2026, url: "https://europepmc.org/abstract/MED/41499731", doi: "10.1200/OP-25-01017", gradingScheme: "GRADE (Grading of Recommendations Assessment, Development, and Evaluation), as the abstract states; the abstract prints the quality of evidence but no grade for the recommendation.", read: "abstract", accessed: "2026-11-17" },
    { key: "nhs-bsp-protocols-2026", label: "The Surveillance of women at very high risk of developing breast cancer", publisher: "NHS England, NHS Breast Screening Programme (GOV.UK)", year: 2026, url: "https://www.gov.uk/government/publications/breast-screening-higher-risk-women-surveillance-protocols/protocols-for-surveillance-of-women-at-higher-risk-of-developing-breast-cancer", gradingScheme: "National programme protocol; not graded. Page updated 11 November 2026; applies to England.", read: "full-text", accessed: "2026-11-17" },
    { key: "nhs-bsp-frequency-2026", label: "Eligibility criteria and screening protocols for women at very high risk of breast cancer", publisher: "NHS England, NHS Breast Screening Programme (GOV.UK)", year: 2026, url: "https://www.gov.uk/government/publications/breast-screening-higher-risk-women-surveillance-protocols/tests-and-frequency-of-testing-for-women-at-very-high-risk--2", gradingScheme: "National programme protocol; not graded. Page updated 11 November 2026; applies to England.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The IGHG 2026 anthracycline update was read only as an abstract; on 17 November 2026 Europe PMC listed no open full text, so how long that surveillance should continue and which tests it uses could not be read.",
    "On 17 November 2026 Tables 1 to 3 and Figures 1 and 2 of IGHG 2020 were images in the PubMed Central copy and were not read, and its Data Supplement was not read. The recommendations here come from the article text, which states no lower age at radiotherapy.",
    "IGHG 2020 could make no recommendation after total body irradiation at a prescribed dose below 10 Gy. The NHS page says NHS England will review whether earlier total body irradiation reaches the threshold for very high risk screening.",
    "The NHS programme pages read give no radiation dose threshold and do not mention survivors of high-dose doxorubicin without chest radiotherapy.",
    "IGHG's upper limit of at least 60 and the NHS programme's age bands differ, and no source read compares outcomes between them. IGHG says it is still unclear whether surveillance in these survivors improves life expectancy.",
    "Surveillance outside England (Scotland, Wales, Northern Ireland and other countries) was not read.",
    "Women who also carry a genetic predisposition follow a case-by-case protocol under the NHS programme, which is not given here.",
  ],
  institutions: [],
  technologies: ["mammography"],
  terms: ["late-effects", "lymphoma-living-hodgkin-survivorship-screening", "lymphoma-tx-hodgkin-late-effects"],
  cancers: ["hodgkin-lymphoma"],
  related: ["doxorubicin"],
  sections: ["supportive-care"],
  tags: ["protocol", "survivorship", "late-effects", "screening"],
});
