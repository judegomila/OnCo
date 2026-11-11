import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/ke/ (wave 5). Public professional information only. Roles come from the National Cancer
 * Institute of Kenya's own pages, read on 11 November 2026: its about page and the joint notice with the Social Health
 * Authority (October 2026), signed by Dr Elias Melly as chief executive officer, and its report of the IACR-AFCRN-NORA
 * conference in Arusha (14 to 16 October 2026), which names Gladys Chesumbai as Head of the National Cancer Registry.
 * Papers were resolved through Europe PMC and the author's affiliation read on each.
 */
const asOf = "2026-11-11";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

const NCI_ABOUT = "https://ncikenya.go.ke/about/";
const NCI_IACR = "https://ncikenya.go.ke/blogs/nci-k-ceo-dr-elias-melly-delivers-keynote-address-at-international-cancer-registries-conference-in-tanzania/";
const JOINT = "https://uploads.ncikenya.go.ke/uploads/notices/SHA-NCI-Joint-Notice.pdf";

export const peopleKE: PersonInput[] = [
  p({ id: "elias-melly", name: "Elias Melly", role: "Chief Executive Officer, National Cancer Institute of Kenya",
    institutionId: "national-cancer-institute-of-kenya", institutions: ["national-cancer-institute-of-kenya", "social-health-authority-kenya"],
    specialisms: ["Cancer control", "Health leadership"],
    tldr: "A medical doctor who leads the National Cancer Institute of Kenya, the statutory body that keeps the national cancer register and certifies the centres the Social Health Authority pays for cancer care.",
    summary: "Dr Elias Melly is Chief Executive Officer of the National Cancer Institute of Kenya. The Institute's about page describes him as a medical doctor and cancer expert with experience in clinical care, training, research and programme development at local, regional and global levels. He signed, with the Social Health Authority's chief executive, the October 2026 joint notice making the Institute's certification a condition of contracting a facility for cancer services, and gave the opening keynote at the IACR, AFCRN and NORA scientific conference on cancer registration in Arusha on 14 October 2026. Papers listing him with the affiliation Kenya National Cancer Institute include a 2025 study of non-small cell lung cancer survival and a 2026 study of neoadjuvant chemotherapy for triple-negative breast cancer, both from western Kenya.",
    profiles: [
      { label: "National Cancer Institute of Kenya: about and leadership", url: NCI_ABOUT },
      { label: "Social Health Authority and NCI joint notice, October 2026 (PDF)", url: JOINT },
      { label: "National Cancer Institute of Kenya: keynote at the IACR conference, October 2026", url: NCI_IACR },
    ],
    papers: [
      { title: "Characteristics and Associated Survival of Patients Diagnosed With Non-Small Cell Lung Cancer in a Designated Lung Cancer Program in Western Kenya", journal: "JCO Global Oncology", year: 2025, doi: "10.1200/GO.24.00212" },
      { title: "Neoadjuvant chemotherapy in women with triple-negative breast cancer: real world results from Western Kenya", journal: "The Oncologist", year: 2026, doi: "10.1093/oncolo/oyag325" },
    ] }),

  p({ id: "gladys-chesumbai", name: "Gladys Chesumbai", role: "Head of the National Cancer Registry, National Cancer Institute of Kenya",
    institutionId: "national-cancer-institute-of-kenya", institutions: ["national-cancer-institute-of-kenya", "eldoret-cancer-registry"],
    specialisms: ["Cancer registration", "Cancer surveillance"],
    tldr: "She heads Kenya's National Cancer Registry at the National Cancer Institute of Kenya, and has long represented the Eldoret Cancer Registry in African population-based cancer studies.",
    summary: "Gladys Chesumbai is Head of the National Cancer Registry at the National Cancer Institute of Kenya, according to the Institute's report of the IACR, AFCRN and NORA conference in Arusha, where on 15 October 2026 she presented on a Delphi consensus for a standardised national childhood cancer registry minimum dataset for Kenya. On papers she is affiliated with the Eldoret Cancer Registry at Moi University and Moi Teaching and Referral Hospital, and she is an author of the African Cancer Registry Network's population-based studies, including SURVCAN-3 on cancer survival in sub-Saharan Africa (2024), the study of guideline-concordant care for five cancers (2025) and the 2026 survey of patient-reported barriers to radiotherapy, as well as the 2016 economic analysis of the Nairobi Cancer Registry.",
    profiles: [
      { label: "National Cancer Institute of Kenya: report of the IACR conference, October 2026", url: NCI_IACR },
      { label: "PubMed author search", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Chesumbai%20G%5BAuthor%5D" },
    ],
    papers: [
      { title: "Patient- and caregiver-reported barriers to radiotherapy for cancer in sub-Saharan Africa: a survey of population-based registries", journal: "International Journal of Cancer", year: 2026, doi: "10.1002/ijc.70390" },
      { title: "NCCN guideline-concordant cancer care in sub-Saharan Africa: a population-based multicountry study of 5 cancers", journal: "Journal of the National Cancer Institute", year: 2025, doi: "10.1093/jnci/djae221" },
      { title: "Cancer survival in sub-Saharan Africa (SURVCAN-3): a population-based study", journal: "Lancet Global Health", year: 2024, doi: "10.1016/S2214-109X(24)00130-X" },
      { title: "Economic analysis of the Nairobi Cancer Registry: Implications for expanding and enhancing cancer registration in Kenya", journal: "Cancer Epidemiology", year: 2016, doi: "10.1016/j.canep.2016.11.006" },
    ],
    keyPapers: ["paper-korir-nairobi-cancer-registry-costs-2016"] }),
];
