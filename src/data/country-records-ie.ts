import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Ireland: the public bodies behind /countries/ie/ (wave 8) that the corpus did not hold, written from their own pages
 * read raw on 11 November 2026: the National Cancer Registry Ireland's home page and its annual statistical report
 * Cancer in Ireland 1994 to 2023 (PDF text, 2026), the National Centre for Pharmacoeconomics' pages on the drug
 * reimbursement process and its home page, the Health Products Regulatory Authority's "About us" page, and the
 * Department of Health's National Cancer Strategy 2017 to 2026 (PDF text). The eight designated cancer centres, the
 * Irish Cancer Society and the National Screening Service already exist and are reused. Coordinates are approximate.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const NCRI = "https://www.ncri.ie/";
const NCRI_2026 = "https://www.ncri.ie/sites/default/files/2026-08/NCRI_AnnualStatReport_2026.pdf";
const NCPE_PROCESS = "https://www.ncpe.ie/submission-process/overview-of-the-drug-reimbursement-process/";
const STRATEGY = "https://assets.gov.ie/static/documents/national-cancer-strategy-2017-2026.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "national-cancer-registry-ireland", name: "National Cancer Registry Ireland", aka: ["National Cancer Registry"],
    city: "Cork", country: "IE", lat: 51.85, lng: -8.49, institutionType: "government", website: NCRI,
    tldr: "Ireland's state cancer registry, set up by the Minister for Health in 1991 and recording cancer for the whole population since 1994. Its 2026 report counts an average of 26,528 invasive cancers (excluding non-melanoma skin cancer) and 10,007 cancer deaths a year in 2021 to 2023.",
    summary: "The National Cancer Registry Ireland describes itself as the state agency responsible for collecting and analysing cancer data to inform policy, patient care and the planning of services. It was established by the Minister for Health in 1991 and has collected cancer information for the population of Ireland since 1994; it is based at Cork Airport Business Park. The coordinates are approximate.\n\nIts annual statistical report Cancer in Ireland 1994 to 2023, published in 2026, counts an average of 46,818 cancers or related tumours a year in 2021 to 2023, of which 26,528 were invasive cancers excluding non-melanoma skin cancer, the figure used for international comparison, and an average of 10,007 deaths from invasive cancer a year. Five-year net survival for all invasive cancers except non-melanoma skin cancer rose from 50% in 1999 to 2003 to 66% in 2019 to 2023. At the end of 2023 an estimated 230,946 people in Ireland had a previous diagnosis of invasive cancer, about 4.4% of the population. The report finds premature cancer mortality (ages 0 to 74) 11% below the EU-27 average, and all-age mortality 2.6% above it.",
    programs: ["National cancer registration (since 1994)", "Cancer in Ireland annual statistical report", "Cancer survival and prevalence statistics"],
    institutions: ["nccp-ireland", "irish-cancer-society", "cork-university-hospital", "iarc"],
    cancers: ["prostate", "breast-cancer", "colorectal", "lung-cancer", "melanoma"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "National Cancer Registry Ireland: home page", url: NCRI },
      { label: "NCRI: Cancer in Ireland 1994 to 2023, annual statistical report 2026 (PDF)", url: NCRI_2026 },
    ] }),

  i({ id: "nccp-ireland", name: "National Cancer Control Programme (NCCP), HSE", aka: ["NCCP", "HSE National Cancer Control Programme"],
    city: "Dublin", country: "IE", lat: 53.34, lng: -6.27, institutionType: "government", website: "https://www.hse.ie/eng/services/list/5/cancer/",
    tldr: "The Health Service Executive's national cancer programme, set up in 2007. Eight cancer centres were designated after the 2006 strategy; it has led the development of services such as rapid access clinics, and receives the NCPE's report on cancer medicines that undergo a full health technology assessment.",
    summary: "The Department of Health's National Cancer Strategy 2017 to 2026 records that the second national strategy, A Strategy for Cancer Control in Ireland (2006), led to the establishment of designated cancer centres and the reform of how cancer is diagnosed and treated, and that the National Cancer Control Programme was established in 2007 to formulate a whole-population, integrated approach to cancer. The strategy lists among the achievements of that period the designation of eight cancer centres, screening programmes, rapid access clinics, multidisciplinary team working and treatment standards, and says the designated centres will be developed further.\n\nThe National Centre for Pharmacoeconomics states that when it completes a full health technology assessment of a cancer medicine it sends its report both to the HSE's Corporate Pharmaceutical Unit and to the NCCP. The coordinates are an approximate Dublin city point; the HSE's cancer pages returned errors to a plain request on 11 November 2026 and were not read.",
    programs: ["Eight designated cancer centres", "Rapid access clinics", "National Cancer Strategy 2017 to 2026 implementation", "Oncology medicines review with the NCPE"],
    institutions: ["mater-misericordiae", "st-vincents-ucd-cancer-centre", "beaumont-rcsi-cancer-centre", "trinity-st-jamess-cancer-institute", "cork-university-hospital", "university-hospital-waterford", "mid-western-cancer-centre", "galway-university-hospital-cancer-centre", "national-cancer-registry-ireland", "ncpe-ireland", "hpra-ireland"],
    links: [
      { label: "Department of Health: National Cancer Strategy 2017 to 2026 (PDF)", url: STRATEGY },
      { label: "NCPE: overview of the drug reimbursement process", url: NCPE_PROCESS },
    ] }),

  i({ id: "ncpe-ireland", name: "National Centre for Pharmacoeconomics (NCPE), Ireland", aka: ["NCPE"],
    city: "Dublin", country: "IE", lat: 53.343, lng: -6.283, institutionType: "government", website: "https://www.ncpe.ie",
    tldr: "Ireland's health technology assessment agency for medicines. Every new medicine seeking reimbursement gets a Rapid Review of about four weeks; costly or uncertain ones get a full assessment of about 18 weeks, and the HSE then decides.",
    summary: "The National Centre for Pharmacoeconomics describes itself as an independent health technology assessment agency responsible for evaluating drug treatments for the Irish healthcare system, assessing comparative effectiveness and cost-effectiveness. It is based at St James's Hospital, Dublin. The Health Service Executive is responsible for reimbursement decisions; its Corporate Pharmaceutical Unit commissions the NCPE to assess new active substances seeking reimbursement, including orphan medicines, and drugs already reimbursed that have high expenditure or uncertain benefit.\n\nAll medicines undergo a Rapid Review, which the NCPE aims to complete in about four weeks and which a company can submit at any point after a positive opinion from the European Medicines Agency's CHMP. Products with a high cost relative to comparators, a net impact on the drugs budget, or a question over comparative efficacy or value go to a full assessment, which takes about 18 weeks plus about five weeks while queries are with the company. For cancer medicines the full assessment report also goes to the National Cancer Control Programme. The HSE's decision criteria are set out in Schedule 3, Part 3 of the Health (Pricing and Supply of Medical Goods) Act 2013. Its home page carried a press release of 4 May 2026 on the first joint clinical assessment completed under the EU HTA Regulation. The coordinates are approximate.",
    programs: ["Rapid Review of new medicines", "Full health technology assessment", "Patient submissions to assessments", "EU HTA Regulation joint clinical assessments"],
    institutions: ["nccp-ireland", "hpra-ireland"],
    links: [
      { label: "NCPE: home page", url: "https://www.ncpe.ie/" },
      { label: "NCPE: overview of the drug reimbursement process", url: NCPE_PROCESS },
    ] }),

  i({ id: "hpra-ireland", name: "Health Products Regulatory Authority (HPRA), Ireland", aka: ["HPRA"],
    city: "Dublin", country: "IE", lat: 53.336, lng: -6.25, institutionType: "government", website: "https://www.hpra.ie",
    tldr: "Ireland's regulator of medicines, health products and medical devices for people and animals. New cancer medicines reach Ireland through the European Medicines Agency's centralised procedure.",
    summary: "The Health Products Regulatory Authority describes itself as regulating medicines, health products and devices for the benefit of people and animals, publishing information on authorised and withdrawn medicines and notified shortages. Under EU law, medicines with a new active substance to treat cancer must be authorised through the European Medicines Agency's centralised procedure, and the European Commission's authorisation is valid in every EU member state including Ireland. The coordinates are an approximate Dublin city point.",
    programs: ["Medicines authorisation and safety monitoring", "Medical device regulation", "Medicine shortages notifications"],
    institutions: ["ema", "ncpe-ireland"],
    links: [
      { label: "HPRA: about us", url: "https://www.hpra.ie/about-us" },
      { label: "European Medicines Agency: authorisation of medicines, the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
    ] }),
];

/** Records behind /countries/ie/ (wave 8). */
export const recordsIE: EntityInput[] = [...institutions];
