import { protocol } from "./helpers";

/*
 * Breast cancer surveillance for women and girls who had radiotherapy exposing breast tissue when young (for example
 * mantle or chest radiotherapy for Hodgkin lymphoma), and after high-dose anthracyclines.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - International Late Effects of Childhood Cancer Guideline Harmonization Group (IGHG) updated breast cancer
 *   surveillance recommendations (Mulder et al., J Clin Oncol 2020): full text from PubMed Central (PMC7723685).
 * - IGHG recommendations for breast cancer surveillance after anthracyclines (JCO Oncol Pract 2026): abstract, from
 *   Europe PMC.
 * - NHS Breast Screening Programme, protocols for surveillance of women at higher risk, and the tests and frequency of
 *   testing for women at very high risk (GOV.UK, page updated 11 November 2026, applies to England): full text (HTML).
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const breastScreeningAfterChestRadiotherapyAtAYoungAge = protocol({
  id: "breast-screening-after-chest-radiotherapy-at-a-young-age",
  name: "Breast screening after chest radiotherapy at a young age",
  aka: ["breast cancer surveillance after Hodgkin lymphoma", "breast MRI after mantle radiotherapy", "very high risk breast screening after radiotherapy", "IGHG breast surveillance", "BARD referral"],
  domain: "survivorship",
  tldr: "Women who had radiotherapy to the chest as children, teenagers or young adults, for example for Hodgkin lymphoma, have a much higher chance of breast cancer at a young age. They should be offered yearly breast MRI and mammograms, starting at 25 or 30 or 8 years after the radiotherapy, whichever is later. In England this is arranged through the NHS very high risk screening programme.",
  simple: "Radiotherapy to the chest when young raises the chance of breast cancer later. Yearly breast scans should start in your mid-twenties or thirties.",
  summary: "Female survivors of childhood, adolescent and young adult cancer treated with chest radiotherapy of 10 Gy or more have a cumulative breast cancer incidence of 13 to 20 per cent by 40 to 45 years, and up to 35 per cent by 50 (IGHG 2020). IGHG recommends annual mammography and breast MRI from age 25 or 8 years after radiotherapy, whichever is later, up to at least age 60 (level A, strong), and annual surveillance from 25 to be reasonable after upper abdominal radiotherapy exposing breast tissue at a young age (level B, moderate). Surveillance should come with counselling on its benefits and harms.\n\nIn England the NHS Breast Screening Programme very high risk service takes women irradiated to breast tissue between 10 and 35 years of age, identified for lymphoma by the BARD dataset or referred by oncologists: annual MRI from 25 (irradiated at 10 to under 20) or 30 (irradiated at 20 to under 36), or 8 years after radiotherapy if later; annual MRI with mammography from 40 to under 51; annual mammography with or without MRI from 51 to under 71. Girls irradiated below 10 are not tested by the programme, unlike IGHG. For anthracyclines without chest radiotherapy, IGHG's 2026 update considers surveillance reasonable after 200 mg/m² of doxorubicin or more, from 30 or 8 years after exposure.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Women who as children, adolescents or young adults had radiotherapy exposing breast tissue (chest, mantle, mediastinal, axillary, whole-lung or total body fields, or upper abdominal fields extending above the diaphragm), above all for Hodgkin lymphoma; and, under the 2026 IGHG update, women treated with 200 mg/m² or more of doxorubicin without chest radiotherapy. Women with a genetic predisposition follow separate genetic surveillance protocols.",
  trigger: "A survivor treated with chest radiotherapy when young reaches age 25, or 8 years have passed since radiotherapy, whichever is later.",
  steps: [
    {
      action: "Identify women who had radiotherapy exposing breast tissue when young and tell them about their raised risk",
      why: "Survivors may not know they need earlier screening unless someone tells them.",
      source: "ighg-2020",
      quote: "Female survivors of childhood, adolescent, and young adult (CAYA) cancer treated with radiation to fields that expose breast tissue—hereafter referred to as chest radiation—are at increased risk of developing breast cancer at a young age.",
    },
    {
      action: "Counsel the survivor on the benefits and harms of surveillance before starting",
      why: "Surveillance finds cancers earlier but also brings false alarms, biopsies and anxiety; the choice is hers.",
      source: "ighg-2020",
      quote: "A survivor information form was developed to counsel survivors about the potential harms and benefits of surveillance.",
    },
    {
      action: "After chest radiotherapy of 10 Gy or more, offer yearly mammography and breast MRI from age 25 or 8 years after radiotherapy, whichever is later, until at least 60",
      why: "MRI and mammography together find more cancers than either alone in young women with dense breasts.",
      source: "ighg-2020",
      quote: "Therefore, annual breast cancer surveillance with both mammography and MRI is recommended for survivors of CAYA cancer treated with 10 Gy or more chest radiation with an attained age of 25 years or 8 years after radiation, whichever occurs last, for at least up to age 60 years (level A, strong recommendation).",
      grade: "level A, strong recommendation",
    },
    {
      action: "After upper abdominal radiotherapy that exposed breast tissue at a young age, consider yearly surveillance from 25, deciding with the woman",
      why: "The risk is raised but less clearly than after chest radiotherapy, so it is an individual decision.",
      source: "ighg-2020",
      quote: "annual surveillance is reasonable at age 25 years for survivors treated with upper abdominal radiation—that can extend above the diaphragm—at a young age (level B, moderate recommendation).",
      grade: "level B, moderate recommendation",
    },
    {
      action: "In England, refer eligible women to the NHS Breast Screening Programme very high risk service; women treated for lymphoma are found through BARD, others through the BARD non-lymphoma referral form",
      why: "The programme organises the MRI and mammography schedule and the recall of women who would otherwise be lost to follow-up.",
      source: "nhs-bsp-protocols-2026",
      quote: "BARD - for women who received radiotherapy to sites involving breast tissue during treatment for lymphoma and non-lymphomas (where appropriate)",
    },
    {
      action: "In the NHS programme, follow the age bands: annual MRI first, adding mammography from 40, and annual mammography with or without MRI from 51 to under 71",
      why: "The programme sets which test is used at which age, and the start depends on the age at radiotherapy.",
      source: "nhs-bsp-frequency-2026",
      quote: "Surveillance starts at age 25 or 8 years after first irradiation, whichever is the later",
    },
    {
      action: "After 200 mg/m² or more of doxorubicin without chest radiotherapy, consider routine surveillance from 30 or 8 years after exposure, whichever is later",
      why: "Newer evidence shows a moderate rise in breast cancer risk at these doses even without radiotherapy.",
      source: "ighg-2026",
      quote: "Routine breast cancer surveillance after ≥200 mg/m 2 doxorubicin in the absence of chest radiation is reasonable from age 30 years onward or ≥8 years from exposure (whichever occurs last).",
    },
  ],
  bestInClass: {
    statement: "IGHG (2020) is the international standard: annual mammography plus breast MRI from 25 or 8 years after chest radiotherapy of 10 Gy or more, whichever is later, until at least 60 (level A, strong), with counselling on benefits and harms. The NHS very high risk programme in England (updated 11 November 2026) implements the same principle with age bands and differs in three ways: it starts at 30 for women irradiated at 20 or older, uses MRI alone before 40 and mammography with or without MRI from 51, and does not screen women irradiated before age 10. IGHG's 2026 update extends surveillance to survivors of 200 mg/m² or more of doxorubicin without chest radiotherapy; the NHS programme pages read do not include them.",
    sources: ["ighg-2020", "nhs-bsp-frequency-2026", "nhs-bsp-protocols-2026", "ighg-2026"],
  },
  variants: [
    {
      name: "NHS Breast Screening Programme very high risk protocol (England)",
      differs: "Irradiated at 10 to under 20: annual MRI from 25 to under 40. Irradiated at 20 to under 36: annual MRI from 30 to under 40. Both: annual MRI with mammography from 40 to under 51, annual mammography with or without MRI from 51 to under 71, starting no earlier than 8 years after radiotherapy. Girls irradiated below 10 are not tested by the programme.",
      evidence: "A national screening protocol; not graded.",
      sources: ["nhs-bsp-frequency-2026"],
    },
    {
      name: "Surveillance after anthracyclines without chest radiotherapy (IGHG 2026)",
      differs: "Adds routine surveillance from 30 or 8 years after exposure for survivors treated with 200 mg/m² or more of doxorubicin; makes no recommendation for daunorubicin, epirubicin or idarubicin without chest radiotherapy.",
      evidence: "GRADE: moderate-quality evidence of no association below 100 mg/m², high-quality evidence of a weak association at 100 to 199 mg/m² and a moderate risk at 200 mg/m² or more. Read as an abstract.",
      sources: ["ighg-2026"],
    },
  ],
  grades: [
    { claim: "Annual mammography and MRI after 10 Gy or more chest radiotherapy, from 25 or 8 years after, to at least 60", grade: "level A, strong recommendation", source: "ighg-2020" },
    { claim: "Annual surveillance after upper abdominal radiotherapy exposing breast tissue at a young age", grade: "level B, moderate recommendation", source: "ighg-2020" },
  ],
  sources: [
    { key: "ighg-2020", label: "Updated Breast Cancer Surveillance Recommendations for Female Survivors of Childhood, Adolescent, and Young Adult Cancer From the International Guideline Harmonization Group", publisher: "International Late Effects of Childhood Cancer Guideline Harmonization Group, Journal of Clinical Oncology", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7723685/", doi: "10.1200/JCO.20.00562", gradingScheme: "GRADE Evidence-to-Decision framework; recommendations printed with a level (for example A or B) and a strength (for example strong or moderate).", read: "full-text", accessed: "2026-11-11" },
    { key: "ighg-2026", label: "International Guideline Harmonization Group Recommendations for Breast Cancer Surveillance in Childhood, Adolescent, and Young Adult Cancer Survivors After Anthracyclines", publisher: "IGHG, JCO Oncology Practice", year: 2026, url: "https://europepmc.org/abstract/MED/41499731", doi: "10.1200/OP-25-01017", read: "abstract", accessed: "2026-11-11" },
    { key: "nhs-bsp-protocols-2026", label: "Protocols for surveillance of women at higher risk of developing breast cancer", publisher: "NHS Breast Screening Programme (GOV.UK)", year: 2026, url: "https://www.gov.uk/government/publications/breast-screening-higher-risk-women-surveillance-protocols/protocols-for-surveillance-of-women-at-higher-risk-of-developing-breast-cancer", gradingScheme: "National programme protocol; not graded. Page updated 11 November 2026; applies to England.", read: "full-text", accessed: "2026-11-11" },
    { key: "nhs-bsp-frequency-2026", label: "Tests and frequency of testing for women at very high risk", publisher: "NHS Breast Screening Programme (GOV.UK)", year: 2026, url: "https://www.gov.uk/government/publications/breast-screening-higher-risk-women-surveillance-protocols/tests-and-frequency-of-testing-for-women-at-very-high-risk--2", gradingScheme: "National programme protocol; not graded. Applies to England.", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The IGHG 2026 anthracycline update was read only as an abstract.",
    "The NHS programme pages read do not say whether survivors of high-dose doxorubicin without chest radiotherapy are eligible.",
    "IGHG's upper limit of at least 60 and the NHS programme's age bands differ, and no source read compares outcomes between them.",
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
