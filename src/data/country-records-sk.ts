import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Slovakia: the public bodies behind /countries/sk/ (wave 9) that the corpus did not hold, each written from its own
 * pages read as raw text in Slovak on 11 November 2026: the National Health Information Centre's pages on the National
 * Cancer Registry and on expected cancer counts, the Ministry of Health's drug categorisation page, the Health Care
 * Surveillance Authority's page on the three health insurers, and the National Oncology Institute's pages on its remit
 * and the National Oncology Programme. The Biomedical Research Center of the Slovak Academy of Sciences already exists
 * and is reused. Coordinates are approximate Bratislava points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const NCZI_NOR = "https://www.nczisk.sk/Statisticke_vystupy/Tematicke_statisticke_vystupy/Onkologia/Incidencia_registrovanych_nadorovych_ochoreni_NOR_SR/Pages/default.aspx";
const NCZI_EXPECTED = "https://www.nczisk.sk/Statisticke_vystupy/Tematicke_statisticke_vystupy/Onkologia/Vyskyt_zhubnych_nadorov_SR/Pages/default.aspx";
const MZ_KAT = "https://www.health.gov.sk/odbornik/kategorizacia-a-cenotvorba/kategorizacia-liekov/";
const NOI_STATUT = "https://www.noisk.sk/o-nas/poslanie";
const NOI_NOP = "https://www.noisk.sk/o-nas/narodny-onkologicky-program";

const institutions: InstitutionInput[] = [
  i({ id: "nczi-slovakia", name: "National Health Information Centre, Slovakia", aka: ["Národné centrum zdravotníckych informácií", "NCZI"],
    city: "Bratislava", country: "SK", lat: 48.15, lng: 17.11, institutionType: "government", website: "https://www.nczisk.sk",
    tldr: "Slovakia's health statistics centre. It holds the National Cancer Registry, whose confirmed counts run to 2016, and publishes expected cancer counts for 2017 to 2025 estimated from insurers' claims and death records.",
    summary: "The National Health Information Centre (Národné centrum zdravotníckych informácií) keeps the National Cancer Registry of the Slovak Republic (Národný onkologický register SR). Its pages say the registry's processed data run from 1978 to 2016, and that its published series combines confirmed registry counts for 1996 to 2016 with expected counts of newly diagnosed cancers for 2017 to 2025, calculated by an algorithm from health insurers' data on reimbursed care and from death records, last updated on 29 October 2026. It also publishes annual statistics on clinical and radiation oncology services. The coordinates on this record are an approximate Bratislava point.",
    programs: ["National Cancer Registry of the Slovak Republic", "Expected cancer counts from insurers' data (2017 to 2025)", "Annual statistics on clinical and radiation oncology"],
    institutions: ["ministry-of-health-slovakia", "national-cancer-institute-slovakia"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "NCZI: incidence of registered cancers from the National Cancer Registry", url: NCZI_NOR },
      { label: "NCZI: occurrence of cancer including expected cases from insurers' data", url: NCZI_EXPECTED },
    ] }),

  i({ id: "ministry-of-health-slovakia", name: "Ministry of Health of the Slovak Republic", aka: ["Ministerstvo zdravotníctva Slovenskej republiky", "MZ SR"],
    city: "Bratislava", country: "SK", lat: 48.16, lng: 17.13, institutionType: "government", website: "https://www.health.gov.sk",
    tldr: "Slovakia's health ministry. It decides which medicines public health insurance pays for through categorisation, which requires a pharmacoeconomic analysis, and runs the cancer screening commission.",
    summary: "The Ministry of Health of the Slovak Republic decides which medicines are reimbursed from public health insurance through categorisation (kategorizácia liekov) and sets official prices. Its categorisation page publishes the list of categorised medicines and the template and methodological guide for the pharmacoeconomic analysis (farmako-ekonomický rozbor lieku) that an applicant must submit under Decree 422/2011, and it has a route for submissions by patient organisations. Its commissions include one for screening of oncological diseases. Public health insurance is run by three insurers: Všeobecná zdravotná poisťovňa, Dôvera and Union. The coordinates on this record are an approximate Bratislava point.",
    programs: ["Categorisation and pricing of medicines", "Commission for screening of oncological diseases", "National Oncology Programme"],
    institutions: ["nczi-slovakia", "national-cancer-institute-slovakia"],
    links: [
      { label: "MZ SR: kategorizácia liekov", url: MZ_KAT },
      { label: "ÚDZS: the three health insurers", url: "https://www.udzs-sk.sk/zdravotne-poistovne/" },
    ] }),

  i({ id: "national-cancer-institute-slovakia", name: "National Cancer Institute, Slovakia", aka: ["Národný onkologický ústav", "NOÚ", "Národný onkologický inštitút", "NOI"],
    city: "Bratislava", country: "SK", lat: 48.17, lng: 17.13, institutionType: "cancer-center", website: "https://www.noisk.sk",
    tldr: "Slovakia's national cancer centre at Klenová 1 in Bratislava. Its National Oncology Institute, set up on 1 August 2018, coordinates the National Oncology Programme, keeps lists of cancer medicines and runs a register of clinical trials.",
    summary: "The National Oncology Institute (Národný onkologický inštitút, NOI) was established within the National Cancer Institute (Národný onkologický ústav) on 1 August 2018, according to its statute page, to serve as a clinical, research, academic and educational platform for carrying out the National Oncology Programme of the Slovak Republic. Its areas cover coordinating cancer infrastructure, prevention, diagnosis and treatment, research and education, and the processing and interpretation of cancer data. It publishes the National Oncology Programme for 2026 to 2030 and earlier action plans, lists of oncology medicines, treatment recommendations and a register of clinical trials, and works with Gustave Roussy, IARC and EU joint actions. Its address is Klenová 1, Bratislava. The Biobank of the National Cancer Institute holds collections listed in the BBMRI-ERIC Directory.",
    programs: ["National Oncology Programme of the Slovak Republic (2026 to 2030)", "Register of clinical trials", "Lists of oncology medicines", "Slovak Cooperative Oncology Group"],
    institutions: ["ministry-of-health-slovakia", "nczi-slovakia", "biomedical-research-center-sas", "iarc"],
    links: [
      { label: "NOI: mission and statute", url: NOI_STATUT },
      { label: "NOI: National Oncology Programme", url: NOI_NOP },
    ] }),
];

/** Records behind /countries/sk/ (wave 9). */
export const recordsSK: EntityInput[] = [...institutions];
