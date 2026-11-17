import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Belize: the bodies and papers behind /countries/bz/ (wave 16) that the corpus did not hold. Each was written from
 * its own source, read raw on 16 November 2026: the National Health Insurance scheme's history, screenings and
 * co-payment pages; Amandala's report on the Belize Cancer Society's clinic, datelined 13 December 2021 and published on the 15th (no
 * working website was found for the society: the address tried did not resolve); and three papers whose DOIs were resolved through Europe PMC, with the figures in `findings`
 * taken from the indexed abstracts and, where marked, from the open full text at Europe PMC.
 *
 * Inbound links: the two institutions list each other and the clinic paper, the three papers list one another through
 * `related`, and each institution lists the existing
 * records for the Karl Heusner Memorial Hospital and the Ministry of Health and Wellness. Coordinates are approximate
 * city points, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NHI = "https://www.nhi.bz/";
const NHI_HISTORY = "https://www.nhi.bz/history-of-nhi/";
const NHI_SCREENINGS = "https://www.nhi.bz/screenings/";
const NHI_COPAY = "https://www.nhi.bz/copayment/";
const AMANDALA_BCC = "https://amandala.com.bz/news/cancer-center-opens-doors-in-belize-city";
const WONG = "paper-wong-cancer-time-to-care-belize-oncologist-2023";
const NEIBART = "paper-neibart-cervical-infrastructure-belize-jcogo-2021";
const MITTAL = "paper-mittal-cervical-screening-barriers-belize-ccc-2023";

const institutions: InstitutionInput[] = [
  i({ id: "nhi-belize", name: "National Health Insurance, Belize", aka: ["NHI Belize", "National Health Insurance Scheme (Belize)"],
    city: "Belmopan", country: "BZ", lat: 17.25, lng: -88.77, institutionType: "government", website: NHI,
    tldr: "Belize's public health insurance scheme, set up in 2000 under the Social Security Act. It buys a package of primary care, including screening for breast, cervical and prostate cancer, for people registered in the parts of the country it covers.",
    summary: "The scheme's own history says a National Health Insurance Scheme was established in 2000 through an amendment to the Social Security Act and began as a purchaser of health services with a pilot on the south side of Belize City in August 2001. It expanded to the Southern Region in January 2006 and rolled out to Corozal in 2015. It buys a defined package from registered public, private and non-governmental providers; the package was redefined to include screening for breast, cervical and prostate cancer. Members pay a 10% co-payment on some services, with exemptions. The scheme names a sustainable source of funding as the main obstacle to a national roll-out. A 2023 paper from the public oncology clinic in Belize City says the scheme covers basic diagnostic services and primary care, that patients pay for chemotherapy and scans, and that a regular stock of chemotherapy medicines was secured in 2021 in partnership with the scheme. The coordinates are an approximate Belmopan city point.",
    programs: ["Primary care package from registered providers (since 2001)", "Screening for breast, cervical and prostate cancer", "Co-payment of 10% on some services"],
    institutions: ["moh-belize", "khmh-belize", "belize-cancer-society"],
    keyPapers: [WONG],
    cancers: ["breast-cancer", "cervical", "prostate"],
    links: [
      { label: "National Health Insurance Belize: history of the scheme", url: NHI_HISTORY },
      { label: "National Health Insurance Belize: screenings", url: NHI_SCREENINGS },
      { label: "National Health Insurance Belize: co-payment", url: NHI_COPAY },
      doi("10.1093/oncolo/oyad030", "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)"),
    ] }),

  i({ id: "belize-cancer-society", name: "Belize Cancer Society", aka: ["BCS"],
    city: "Belize City", country: "BZ", lat: 17.5, lng: -88.2, institutionType: "consortium",
    tldr: "A cancer charity in Belize. In December 2021 it opened a clinic on Mercy Lane in Belize City where the Belize Cancer Center Dangriga gives consultations and chemotherapy, according to the newspaper Amandala.",
    summary: "Amandala reported, in an article datelined 13 December 2021, that the Belize Cancer Society owns a new cancer clinic on Mercy Lane, Belize City, and provides its administration, while the Belize Cancer Center Dangriga, a charity clinic operating at 11 Pine Street, Dangriga, since October 2008, delivers the consultations and chemotherapy; patients are asked to cover as much of their bill as they can. The 2023 paper from the public oncology clinic says work on a cancer registry in Belize dates back to a 2008 collaboration between the society and the Ministry of Health. OnCo did not find a working website for the society, so this record rests on the newspaper report and the paper, and the clinic's current services should be confirmed with the society. The coordinates are an approximate Belize City point.",
    programs: ["Cancer clinic on Mercy Lane, Belize City (opened December 2021, with the Belize Cancer Center Dangriga)", "Work towards a cancer registry with the Ministry of Health (from 2008)"],
    institutions: ["khmh-belize", "moh-belize", "nhi-belize"],
    keyPapers: [WONG],
    links: [
      { label: "Amandala: Cancer Center opens doors in Belize City (published 15 December 2021)", url: AMANDALA_BCC },
      doi("10.1093/oncolo/oyad030", "Wong et al., cancer demographics and time-to-care in Belize (The Oncologist 2023)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: WONG, name: "Cancer Demographics and Time-to-Care in Belize",
    journal: "The Oncologist", year: 2023, doi: "10.1093/oncolo/oyad030", pmid: "36928719", authors: "Wong W, Dickerson JC, Valtis YK, et al.", paperType: "observational", participants: 465,
    tldr: "A review of the 465 people with cancer seen at Belize's public oncology clinic from 2018 to 2022 found that 68% arrived with stage 3 or 4 disease, and that a biopsy came a median of 130 days after the first symptoms.",
    summary: "A retrospective chart review at the oncology clinic of the Karl Heusner Memorial Hospital, Belize City, set up in 2018 by the hospital, the Ministry of Health and the charity Global Oncology. The authors describe it as the first report of clinic-based cancer statistics for Belize, a country without a cancer registry, and measure the time from a patient's first symptoms to biopsy and treatment. The open full text adds that radiotherapy is not available in the country, that many patients who can afford to travel go to Mexico and Guatemala, and that the National Health Insurance scheme covers basic diagnostic services and primary care.",
    findings: ["465 patients with cancer presented to the clinic from 2018 to 2022; breast cancer (28%) and cervical cancer (12%) were the most common.", "68% presented with stage 3 or 4 disease, and 21% ever started treatment with curative intent.", "Median time from patient-reported symptoms to a biopsy was 130 days, and to treatment 189 days; for breast cancer, 140 and 178 days.", "At the clinic itself, biopsy and the start of chemotherapy each took under 30 days from the first visit."],
    whatItMeans: "It gives Belize its first figures from its own patients, and shows that most of the delay comes before a person reaches the clinic.",
    caveats: ["One public clinic's patients, not national incidence; people treated privately or abroad are not counted.", "Symptom onset was reported by patients, and no outcomes such as survival are reported.", "The abstract and the full text give slightly different percentages for patients without insurance and without work (78% and 79%)."],
    cancers: ["breast-cancer", "cervical"], institutions: ["khmh-belize", "moh-belize", "nhi-belize", "belize-cancer-society"], related: [NEIBART, MITTAL],
    links: [doi("10.1093/oncolo/oyad030", "DOI"), pubmed("36928719")] }),

  p({ id: NEIBART, name: "Assessment of Cervical Cancer Prevention and Treatment Infrastructure in Belize",
    journal: "JCO Global Oncology", year: 2021, doi: "10.1200/go.21.00138", pmid: "34351814", authors: "Neibart SS, Smith TA, Fang JH, et al.", paperType: "observational",
    tldr: "A 2018 survey of Belize's public facilities for cervical cancer found one screening nurse or doctor for every 1,076 eligible women, half of facilities screening one day a week, and no radiotherapy anywhere in the country.",
    summary: "Health facility assessments were carried out in 2018 across all six districts of Belize, at the national pathology facility and 12 public facilities identified as critical to cervical cancer control, using a structured instrument covering staff, equipment, supplies and policies. The authors conclude that tertiary services are concentrated in the largest district and that screening, outreach and pathology are limited mostly by resources.",
    findings: ["The public screening workforce was 75 primary care nurses and physicians, one per 1,076 screening-eligible women, with 44% doing rural outreach.", "All districts had at least one screening facility, but 50% performed screening only once a week.", "Colposcopy was available in three districts and loop excision in four; radical hysterectomy and chemotherapy in two; radiation therapy was unavailable.", "Of essential pathology equipment, 38.5% was present and working, 23% present but not working and 38.5% unavailable; 75% of supplies had been unavailable at least once in the previous 12 months."],
    whatItMeans: "It shows where a woman in Belize with an abnormal screening result could and could not be treated in the public system in 2018.",
    caveats: ["A snapshot from June 2018; services may have changed since.", "Rural health centres were not sampled, and only one facility in Toledo district was sampled."],
    cancers: ["cervical"], institutions: ["khmh-belize", "moh-belize"], related: [WONG, MITTAL],
    links: [doi("10.1200/go.21.00138", "DOI"), pubmed("34351814")] }),

  p({ id: MITTAL, name: "Barriers and facilitators to effective cervical cancer screening in Belize: a qualitative analysis",
    journal: "Cancer Causes & Control", year: 2023, doi: "10.1007/s10552-023-01703-0", pmid: "37165111", authors: "Mittal A, Neibart SS, Kulkarni A, et al.", paperType: "observational", participants: 47,
    tldr: "Interviews in 2018 with 47 people who provide or manage cervical screening in Belize found that screening is free in public clinics, but that delays in smear results, staff workload and limited rural access get in the way.",
    summary: "Semi-structured interviews on cervical cancer screening were held with key stakeholders across the six districts of Belize in 2018, then transcribed, coded and analysed by theme, organised by the levels of the social-ecological model. Most interviews (78%) were from the public sector.",
    findings: ["47 interviews: health care providers (45%), administrators (17%), government officials (25%) and other stakeholders (13%).", "Barriers named included potential delays in Pap smear results and fear of a cancer diagnosis, competing responsibilities for clinicians, insufficient space and training, reduced access in rural areas, and limits on budgets for equipment and staff.", "Facilitators named included resource-sharing between the public and private sectors, dedicated rural outreach staff, free public screening and the establishment of population-based screening."],
    whatItMeans: "Free screening is not enough on its own: results and follow-up have to arrive in time for an abnormal test to be acted on.",
    caveats: ["Qualitative interviews with people working in the service, not with the women it serves.", "Interviews date from 2018."],
    cancers: ["cervical"], institutions: ["moh-belize"], related: [WONG, NEIBART],
    links: [doi("10.1007/s10552-023-01703-0", "DOI"), pubmed("37165111")] }),
];

/** Records behind /countries/bz/ (wave 16). */
export const recordsBZ: EntityInput[] = [...institutions, ...papers];
