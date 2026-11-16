import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * New Zealand: the public bodies behind /countries/nz/ (wave 9) that the corpus did not hold, each written from its own
 * pages read as raw text on 11 November 2026: Health New Zealand's page on the New Zealand Cancer Registry, Te Aho o Te
 * Kahu's State of Cancer in New Zealand 2025 report and its insights summary (PDF text), its page on the Cervical Cancer
 * Elimination Plan 2026 to 2040, Pharmac's "about" pages and Medsafe's "about" page. Auckland City Hospital, Starship and
 * the Cancer Society of New Zealand already exist and are reused. Coordinates are approximate city points.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const NZCR = "https://www.healthnz.govt.nz/about-us/health-data/data-sets-and-collections/cancer-data-and-statistics/new-zealand-cancer-registry";
const SOC_2025 = "https://teaho.govt.nz/index.php/CanStats/reports/state-cancer-new-zealand-2025";
const CX_PLAN = "https://teaho.govt.nz/index.php/CanStats/reports/new-zealand-cervical-cancer-elimination-plan-2026-2040";

const institutions: InstitutionInput[] = [
  i({ id: "te-aho-o-te-kahu", name: "Te Aho o Te Kahu, Cancer Control Agency", aka: ["Te Aho o Te Kahu", "Cancer Control Agency New Zealand"],
    city: "Wellington", country: "NZ", lat: -41.29, lng: 174.78, institutionType: "government", website: "https://teaho.govt.nz",
    tldr: "New Zealand's cancer control agency. It reports on how the cancer system is performing, most recently in The State of Cancer in New Zealand 2025, and led the Cervical Cancer Elimination Plan 2026 to 2040 with the Ministry of Health.",
    summary: "Te Aho o Te Kahu released The State of Cancer in New Zealand 2025 on 11 December 2025, its second such report after the 2020 edition. The report counts 137,000 people diagnosed with cancer in 2018 to 2022, projects more than 30,000 diagnoses in 2025 and more than 45,000 a year by 2044, and finds that Māori were 1.6 times and Pacific peoples 1.4 times as likely to die from cancer as people of European or other ethnicity in 2017 to 2021. Its 2022 report Understanding the Gap compared publicly funded cancer medicines with Australia's and found 20 medicines for solid tumours that would give substantial clinical benefit if funded in New Zealand. With the Ministry of Health and Health New Zealand it developed the Cervical Cancer Elimination Plan 2026 to 2040, launched on 1 September 2026. Its chief executive in December 2025 was Rami Rahal. The coordinates on this record are an approximate Wellington point.",
    programs: ["The State of Cancer in New Zealand reports (2020, 2025)", "New Zealand Cancer Action Plan 2019 to 2029", "Cervical Cancer Elimination Plan 2026 to 2040", "Cancer medicines availability analyses (2022, 2024)", "Quality improvement monitoring reports"],
    institutions: ["health-new-zealand", "pharmac-nz", "medsafe-nz", "nz-cancer-registry", "cancer-society-new-zealand"],
    cancers: ["cervical", "breast-cancer", "colorectal", "nsclc"],
    links: [
      { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025", url: SOC_2025 },
      { label: "Te Aho o Te Kahu: media release on the 2025 report (11 December 2025)", url: "https://teaho.govt.nz/index.php/media-releases/media-release-state-cancer-new-zealand-2025" },
      { label: "Te Aho o Te Kahu: Cervical Cancer Elimination Plan 2026 to 2040", url: CX_PLAN },
    ] }),

  i({ id: "health-new-zealand", name: "Health New Zealand | Te Whatu Ora", aka: ["Te Whatu Ora", "Health NZ"],
    city: "Wellington", country: "NZ", lat: -41.29, lng: 174.78, institutionType: "government", website: "https://www.healthnz.govt.nz",
    tldr: "New Zealand's national public health service. It runs the public hospitals that treat cancer, the national breast, cervical and bowel screening programmes, and the New Zealand Cancer Registry.",
    summary: "Health New Zealand runs New Zealand's public hospitals and its three national cancer screening programmes (breast, cervical and bowel), and holds the New Zealand Cancer Registry. Te Aho o Te Kahu's 2025 report records that cervical screening now uses HPV testing with the option of a self-test, that the bowel screening starting age dropped from 60 to 58 from October 2025, and that breast screening is being extended to people aged 70 to 74. The coordinates on this record are an approximate Wellington point.",
    programs: ["National Cervical Screening Programme (HPV primary screening with self-test)", "BreastScreen Aotearoa", "National Bowel Screening Programme", "New Zealand Cancer Registry"],
    institutions: ["nz-cancer-registry", "te-aho-o-te-kahu", "auckland-city-hospital"],
    links: [
      { label: "Health New Zealand: cancer data and statistics", url: "https://www.healthnz.govt.nz/about-us/health-data/data-sets-and-collections/cancer-data-and-statistics" },
      { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025", url: SOC_2025 },
    ] }),

  i({ id: "nz-cancer-registry", name: "New Zealand Cancer Registry", aka: ["NZCR"],
    city: "Wellington", country: "NZ", lat: -41.29, lng: 174.78, institutionType: "government", website: NZCR,
    tldr: "New Zealand's national population-based cancer registry, set up under the Cancer Registry Act 1993, which requires laboratories and other providers to report every new cancer. It excludes squamous and basal cell skin cancers.",
    summary: "The New Zealand Cancer Registry is a population-based register of all primary malignant cancers diagnosed in New Zealand, excluding squamous and basal cell skin cancers, and it does not record recurrences. Health New Zealand's page says it was established under the Cancer Registry Act 1993, which requires laboratories and other health providers to report new cancers, and that it combines laboratory results with hospital discharge and mortality data. The Act states its purpose as information on cancer incidence and mortality and a basis for survival studies and research. The coordinates on this record are an approximate Wellington point.",
    programs: ["Population-based cancer registration", "Cancer web tool"],
    institutions: ["health-new-zealand", "te-aho-o-te-kahu"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Health New Zealand: New Zealand Cancer Registry", url: NZCR },
      { label: "Cancer Registry Act 1993 (New Zealand Legislation)", url: "https://www.legislation.govt.nz/act/public/1993/102/en/latest/" },
    ] }),

  i({ id: "pharmac-nz", name: "Pharmac | Te Pātaka Whaioranga", aka: ["Pharmac", "PHARMAC", "Pharmaceutical Management Agency"],
    city: "Wellington", country: "NZ", lat: -41.29, lng: 174.78, institutionType: "government", website: "https://pharmac.govt.nz",
    tldr: "The New Zealand government agency that decides which medicines are publicly funded, and the law requires it to stay within its budget. A June 2024 budget increase led it to fund 33 new cancer medicines by May 2025.",
    summary: "Pharmac describes itself as the government agency that decides which medicines and related products are funded in New Zealand, and says the law requires it to stay within its budget. Its Pharmaceutical Schedule lists funded medicines in the community and in hospitals. Te Aho o Te Kahu's 2025 report records that in June 2024 the Government announced a $604 million increase to Pharmac's Combined Pharmaceutical Budget over four years, and that by May 2025 Pharmac had funded 33 new cancer medicines as a result, expected to benefit about 2,350 people in the first year. The coordinates on this record are an approximate Wellington point.",
    programs: ["Pharmaceutical Schedule", "Hospital Medicines List", "Funding applications and prioritisation"],
    institutions: ["te-aho-o-te-kahu", "health-new-zealand"],
    links: [
      { label: "Pharmac: about Pharmac", url: "https://pharmac.govt.nz/about" },
      { label: "Te Aho o Te Kahu: The State of Cancer in New Zealand 2025 (full report, PDF)", url: "https://teaho.govt.nz/index.php/download_file/view/c2d96fa6-bbad-4b38-bbf2-96b7fdcb5c3e/584" },
    ] }),

  i({ id: "medsafe-nz", name: "Medsafe", aka: ["New Zealand Medicines and Medical Devices Safety Authority"],
    city: "Wellington", country: "NZ", lat: -41.29, lng: 174.78, institutionType: "government", website: "https://www.medsafe.govt.nz",
    tldr: "New Zealand's medicines regulator, a business unit of the Ministry of Health. Approval by Medsafe allows a medicine to be sold; whether it is publicly funded is Pharmac's separate decision.",
    summary: "Medsafe, the New Zealand Medicines and Medical Devices Safety Authority, is a business unit of the Ministry of Health and the authority responsible for regulating therapeutic products in New Zealand, according to its own 'about' page. Approval to market a medicine and public funding are separate steps: Pharmac decides funding.",
    programs: ["Medicine approvals", "Safety monitoring"],
    institutions: ["pharmac-nz"],
    links: [{ label: "Medsafe: about Medsafe", url: "https://www.medsafe.govt.nz/other/about.asp" }] }),
];

/** Records behind /countries/nz/ (wave 9). */
export const recordsNZ: EntityInput[] = [...institutions];
