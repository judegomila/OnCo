import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Oman: the bodies behind /countries/om/ (wave 13) that the corpus did not hold, written from the Ministry of Health's
 * own pages and its national cancer registry report, read raw on 16 November 2026: the ministry's "About" page, the
 * Drug Safety Center's page, and "Cancer Incidence in Oman 2021" (PDF text, published 2025). The National Oncology
 * Centre at the Royal Hospital, the Sultan Qaboos Comprehensive Cancer Care and Research Centre and the Oman Cancer
 * Association already have records and are linked by id from the page, not repeated here. Coordinates are an
 * approximate city point for Muscat, the same point other Muscat records use. The Drug Safety Center's page gives its
 * address as Muscat, Al-Khuwair; the ministry's "About" page and the registry report state no address, so Muscat for
 * those two records rests on the centre being listed among the directorates at the ministry's headquarters.
 *
 * Second accuracy pass, 16 November 2026: the alias "ONCR" was removed (the registry's report does not use it) and the
 * 1996 transfer was reworded to what the report says.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const MOH_ABOUT = "https://www.moh.gov.om/en/ministry/about-moh/";
const MOH_REPORTS = "https://www.moh.gov.om/en/statistics/cancer-repoerts/";
const CI_2021 = "https://www.moh.gov.om/media/veahqntc/cancer-incidence-in-oman-2021-updated-on-27-octobar2025.pdf";
const DSC = "https://www.moh.gov.om/en/hospitals-directorates/directorates-and-centers-at-hq/drug-safety-center/";

const institutions: InstitutionInput[] = [
  i({ id: "moh-oman", name: "Ministry of Health of Oman", aka: ["MOH Oman", "Ministry of Health, Sultanate of Oman", "وزارة الصحة"],
    city: "Muscat", country: "OM", lat: 23.588, lng: 58.383, institutionType: "government", website: "https://www.moh.gov.om/en/",
    tldr: "Oman's health ministry, which describes itself as the principal authority providing healthcare to the population. It runs the national cancer registry, the Royal Hospital with its National Oncology Centre, and the Drug Safety Center that regulates medicines.",
    summary: "The ministry's own page calls it the principal authority responsible for providing healthcare services to the population of the Sultanate of Oman, led by the Minister of Health with three undersecretaries. Its listed competencies include organising and providing comprehensive healthcare services for all citizens, their families and residents in accordance with the applicable decrees and laws; ensuring the availability of pharmaceuticals under a unified procurement policy for the state's health institutions; and regulating the manufacture, import, distribution and use of medicines and medical devices. The page says the first National Health Policy was issued in 1992 and has since been updated; the updated policy is dated 2025. The ministry publishes the annual Cancer Incidence in Oman reports and national guidelines on breast and colorectal cancer screening.",
    programs: ["Oman National Cancer Registry", "National guidelines for breast and colorectal cancer screening", "School immunisation programme"],
    institutions: ["oman-national-cancer-registry", "drug-safety-center-oman", "royal-hospital-national-oncology-centre-oman"],
    cancers: ["breast-cancer", "colorectal", "cervical"],
    links: [{ label: "Ministry of Health: About the ministry", url: MOH_ABOUT }, { label: "Ministry of Health: cancer reports", url: MOH_REPORTS }] }),

  i({ id: "oman-national-cancer-registry", name: "Oman National Cancer Registry", aka: ["National Cancer Registry, Oman"],
    city: "Muscat", country: "OM", lat: 23.588, lng: 58.383, institutionType: "government", website: MOH_REPORTS,
    tldr: "The health ministry's national cancer registry. It began as a hospital registry in 1985, has published a national report for every year from 1996 to 2021, and registered 2,510 tumours for 2021, of which 2,318 were cancers among Omani nationals.",
    summary: "The registry's 2021 report, published in 2025, says it was established in 1985 as a hospital-based registry and was transferred in 1996, when the Department of Non-Communicable Diseases Surveillance and Control was set up; cancer notification became mandatory in 2001 under Ministerial Decision 4/2001, replaced in 2017 by Decision 222/2017, which covers civil, military and private health institutions and requires a report within 30 days of diagnosis. Two trained registrars collect and code the data, visiting the Royal Hospital twice a week, and the registry uses IARC's CanReg5 software. It also traces patients treated abroad through the ministry's treatment abroad committee and lists from the United Arab Emirates. The 2021 report counts 2,510 tumours: 2,318 cancers among Omanis, 163 among non-Omanis and 29 in situ. Incidence rates are calculated for Omanis only: an age-standardised rate of 122.2 per 100,000 in 2021. It reports 97.6% of 2021 cases as morphologically verified and none registered from a death certificate alone.",
    programs: ["Annual Cancer Incidence in Oman report (26th edition covers 2021)", "Mandatory cancer notification under Ministerial Decision 222/2017"],
    institutions: ["moh-oman", "royal-hospital-national-oncology-centre-oman", "iarc"],
    cancers: ["breast-cancer", "colorectal", "non-hodgkin-lymphoma", "childhood-cancers"],
    links: [{ label: "Ministry of Health: Cancer Incidence in Oman 2021 (PDF, published 2025)", url: CI_2021 }, { label: "Ministry of Health: all cancer incidence reports", url: MOH_REPORTS }] }),

  i({ id: "drug-safety-center-oman", name: "Drug Safety Center, Ministry of Health of Oman", aka: ["DSC Oman", "Drug Safety Center (DSC)"],
    city: "Muscat", country: "OM", lat: 23.588, lng: 58.383, institutionType: "government", website: DSC,
    tldr: "Oman's medicines regulator, a centre within the health ministry. It registers medicines and medical devices, licenses pharmacists and pharmacies, clears imports and watches safety after a product is on the market.",
    summary: "The centre's page on the ministry's site describes it as the regulatory body responsible for assuring effective, safe and good quality drugs in Oman, whether made locally or imported, by implementing the pharmacy practice law issued under Royal Decree 41/91 and its amendments. It says the centre regulates and oversees medicines, medical devices and medical supplies, licenses pharmacists and pharmaceutical institutions, oversees product registration and conducts post-marketing surveillance. Services listed on the page include product classification, clearance and customs release of medical products, and listing of medical products and devices. The centre publishes safety circulars and ran public consultations on draft registration guidelines from 5 May to 30 June 2026.",
    programs: ["Registration of medicines and medical devices", "Post-marketing surveillance and safety circulars", "Licensing of pharmacists and pharmaceutical establishments"],
    institutions: ["moh-oman"],
    links: [{ label: "Ministry of Health: Drug Safety Center", url: DSC }] }),
];

/** Records behind /countries/om/ (wave 13). */
export const recordsOM: EntityInput[] = [...institutions];
