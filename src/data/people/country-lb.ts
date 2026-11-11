import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/lb/ (wave 10). Public professional information only. Roles are taken from the Ministry of
 * Public Health's news page of 8 October 2026 on the national breast cancer campaign (Arabic, translated by OnCo), the National
 * Cancer Plan's abstract and a Syndicate of Hospitals article, and affiliations from each person's indexed papers, whose DOIs were resolved through Europe PMC on 11 November 2026.
 * Roles change over time; treat `role` as indicative.
 */
const asOf = "2026-11-11";
const provenance = { editedBy: "OnCo country deep dive, Lebanon (wave 10)", editedOn: asOf };
const pm = (q: string) => ({ label: "PubMed author search", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` });
const BREAST_2026 = "https://www.moph.gov.lb/en/Pages/0/87269/nassereddine-launches-national-breast-cancer-awareness-and-early-detection-campaign";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, provenance, links: x.profiles, ...x });

export const peopleLB: PersonInput[] = [
  p({ id: "arafat-tfayli", name: "Arafat Tfayli", role: "Head of Lebanon's National Cancer Plan (Ministry of Public Health); medical oncologist, Naef K. Basile Cancer Institute, American University of Beirut Medical Center", institutionId: "aubmc-basile-cancer-institute", institutions: ["aubmc-basile-cancer-institute", "lebanon-ministry-of-public-health"],
    specialisms: ["Medical oncology", "Lung cancer", "Cancer policy"],
    tldr: "A medical oncologist who heads the Hematology/Oncology Division at the American University of Beirut and directs the team behind Lebanon's National Cancer Plan 2023 to 2028, now overseen by a formally established National Cancer Program.",
    summary: "The Ministry of Public Health's page on the launch of the 2026 national breast cancer campaign names Arafat Tfayli as head of the National Cancer Plan and reports him welcoming the formal establishment, for the first time, of a National Cancer Program whose task is to oversee and follow the implementation of the National Cancer Plan 2023 to 2028. The plan's official abstract lists him first in its core team, and a Syndicate of Hospitals magazine article describes him as head of the Hematology/Oncology Division at AUB and director of the National Cancer Plan team. His affiliation on his 2026 paper in JCO Global Oncology is the Division of Hematology and Oncology, Naef K. Basile Cancer Institute, American University of Beirut Medical Center (ORCID 0000-0002-0633-2538); he is senior author of that multicentre study of how reduced immunotherapy doses during Lebanon's shortage related to outcomes in stage IV non-small cell lung cancer.",
    orcid: "0000-0002-0633-2538",
    profiles: [pm("Tfayli A[au] Beirut"), { label: "MoPH: National Cancer Plan 2023 to 2028, official abstract (core team)", url: "https://www.moph.gov.lb/userfiles/files/About%20MOPH/StrategicPlans/National%20Cancer%20Plan%202023-2028/NCP%20ABSTRACT%20OFFICIAL%20VERSION.pdf" }, { label: "Syndicate of Hospitals magazine: Tfayli, Cancer in Lebanon (PDF)", url: "https://syndicateofhospitals.org.lb/Content/uploads/SyndicateMagazinePdfs/9190_32-33.pdf" }, { label: "MoPH: national breast cancer awareness and early detection campaign (8 October 2026, Arabic)", url: BREAST_2026 }],
    papers: [
      { title: "Impact of Lack of Access to Immunotherapy on Survival in Stage IV Non-Small Cell Lung Cancer: A Multicenter Retrospective Study From Lebanon", journal: "JCO Global Oncology", year: 2026, doi: "10.1200/go-26-00203", note: "Senior author." },
    ],
    keyPapers: ["paper-hodroj-nsclc-immunotherapy-shortage-lebanon-jcogo-2026"], cancers: ["nsclc"],
    tags: ["clinician-scientist", "cancer-policy"] }),

  p({ id: "nagi-el-saghir", name: "Nagi S. El Saghir", aka: ["Nagi El-Saghir"], role: "Oncologist, American University of Beirut Medical Center", institutionId: "aubmc-basile-cancer-institute", institutions: ["aubmc-basile-cancer-institute"],
    specialisms: ["Breast cancer", "Medical oncology", "Early detection"],
    tldr: "A breast cancer oncologist at the American University of Beirut Medical Center whose papers trace breast cancer in Lebanon and the Arab world and the effect of Lebanon's screening campaigns on the stage at which it is found.",
    summary: "His affiliation on his 2007 review of breast cancer in Arab countries is the Division of Hematology, Department of Internal Medicine, American University of Beirut Medical Center, and on a 2020 study of breast cancer stage at diagnosis at that hospital from 1990 to 2015 it is the Department of Internal Medicine there; that study reports that awareness campaigns calling for annual mammography have run in Lebanon since 2002 and that stage I cases more than doubled after they began. The Ministry of Public Health's Arabic page on the launch of the 2026 national breast cancer campaign names the head of its national committee for breast cancer awareness and early detection as Dr Naji El Saghir. OnCo has not found a source that confirms this is the same person, so this record does not state that he holds that role.",
    profiles: [pm("El Saghir NS[au]"), { label: "MoPH: national breast cancer awareness and early detection campaign (8 October 2026, Arabic), naming Dr Naji El Saghir as committee head", url: BREAST_2026 }],
    papers: [
      { title: "Trends in epidemiology and management of breast cancer in developing Arab countries: a literature and registry analysis", journal: "International Journal of Surgery", year: 2007, doi: "10.1016/j.ijsu.2006.06.015" },
      { title: "Trends in Breast Cancer Staging at Diagnosis Associated with Screening Campaigns in Lebanon", journal: "Women's Health Reports", year: 2020, doi: "10.1089/whr.2020.0076", note: "Senior author." },
    ],
    cancers: ["breast-cancer"],
    tags: ["clinician-scientist", "breast-cancer"] }),
];
