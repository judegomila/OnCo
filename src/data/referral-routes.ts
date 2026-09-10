/**
 * How second opinions work, region by region: who refers, whether you can self-refer, what records to
 * bring, remote-review services, cost and timing. Plain language, each region with checkable sources.
 * Used by /second-opinion/. Costs are qualitative unless a linked page states a figure.
 */
import type { Region } from "@/data/regional-approvals";

export type RemoteReview = { name: string; url: string; note: string; /** Only when the linked page publishes a price. */ cost?: string };
export type SourceLink = { label: string; url: string };
export type ReferralRoute = {
  region: Region;
  title: string;
  /** Plain steps: who refers, whether self-referral is possible, what to send. */
  howItWorks: string[];
  remoteReview: RemoteReview[];
  cost: string;
  timeline?: string;
  sources: SourceLink[];
  asOf: string;
};

/** ISO 3166-1 alpha-2 codes that fall under each region switcher value. */
export const REGION_COUNTRIES: Record<Region, string[]> = {
  US: ["US"],
  UK: ["GB"],
  EU: ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "NO", "IS", "CH"],
  AU: ["AU", "NZ"],
  JP: ["JP"],
  CN: ["CN", "HK"],
  IN: ["IN"],
};

export function regionForCountry(iso2: string): Region | undefined {
  for (const [r, list] of Object.entries(REGION_COUNTRIES) as Array<[Region, string[]]>) if (list.includes(iso2)) return r;
  return undefined;
}

const RECORDS = "Gather the pathology report, the slides or a digital scan of them, imaging on disc or via a portal link, the operation note if you had surgery, the molecular or genomic report, and a one-page timeline of treatments and dates. Most centres will not give an opinion without the original pathology.";

export const referralRoutes: ReferralRoute[] = [
  {
    region: "US", title: "United States", asOf: "2026-09-09",
    howItWorks: [
      "You can ask any cancer centre directly for a second opinion; no referral is required, although many insurers want a referral or prior authorisation before they pay for it.",
      "Start with an NCI-designated cancer centre for your cancer type; the NCI list has one entry per centre with the disease programmes it runs.",
      RECORDS,
      "Ask your current oncologist to send records electronically; most centres also accept records uploaded by the patient.",
      "Medicare Part B covers a second opinion before surgery when the surgery is itself covered, and a third opinion if the first two disagree; other insurers set their own rules, so check before you book.",
    ],
    remoteReview: [
      { name: "Cleveland Clinic virtual second opinions", url: "https://my.clevelandclinic.org/online-services/virtual-second-opinions", note: "Online review of records by a Cleveland Clinic specialist, with a written report; the page lists the process and how to submit records." },
      { name: "Memorial Sloan Kettering: become a patient", url: "https://www.mskcc.org/experience/become-patient", note: "MSK's new-patient page covers in-person and remote consultations and how records and pathology are sent." },
      { name: "Dana-Farber Cancer Institute", url: "https://www.dana-farber.org/", note: "Dana-Farber offers an online second opinion service; find it from the site's patient and family section." },
    ],
    cost: "Varies. Insurance often covers an in-person second opinion with a referral; online record-review services are usually paid out of pocket and the price is on each centre's page.",
    timeline: "In-person appointments at large centres are commonly within one to three weeks; online record reviews are typically quoted in days to two weeks once records arrive.",
    sources: [
      { label: "NCI: Find a Cancer Center", url: "https://www.cancer.gov/research/infrastructure/cancer-centers/find" },
      { label: "American Cancer Society: Seeking a second opinion", url: "https://www.cancer.org/cancer/managing-cancer/finding-care/seeking-a-second-opinion.html" },
      { label: "Medicare: Second surgical opinions", url: "https://www.medicare.gov/coverage/second-surgical-opinions" },
    ],
  },
  {
    region: "UK", title: "United Kingdom (NHS)", asOf: "2026-09-09",
    howItWorks: [
      "There is no legal right to a second opinion on the NHS, but a GP or your hospital consultant will usually arrange one if you ask, and the NHS Constitution commits to involving you in decisions about your care.",
      "Ask your consultant or specialist nurse first; they can refer you to another team in the same trust or to a specialist centre elsewhere in the country, and they can also present your case to a specialist multidisciplinary team meeting.",
      "For rare cancers, ask to be referred to the designated specialist centre for that tumour type; sarcoma, brain tumour and children's cancer services are centralised.",
      RECORDS + " Within the NHS, records and pathology are transferred between trusts by the referring team.",
      "Private second opinions are available without a referral from most private oncology providers; the private consultant may still need the NHS pathology and imaging.",
    ],
    remoteReview: [
      { name: "Macmillan Cancer Support: treatment information", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment", note: "Macmillan explains treatment decisions and how to ask for a second opinion, and runs a support line for questions about the process." },
      { name: "NHS hospital services", url: "https://www.nhs.uk/nhs-services/hospitals/", note: "How referrals to hospital services work in England, including choosing which hospital you are referred to." },
    ],
    cost: "Free on the NHS when arranged by your GP or consultant. Private second opinions are paid for by you or your insurer; ask for the fee before you book.",
    timeline: "NHS second opinions depend on the receiving team's clinic capacity; cancer referrals are expected to follow the national cancer waiting-time standards.",
    sources: [
      { label: "The NHS Constitution for England", url: "https://www.gov.uk/government/publications/the-nhs-constitution-for-england/the-nhs-constitution-for-england" },
      { label: "NHS: cancer", url: "https://www.nhs.uk/conditions/cancer/" },
      { label: "Macmillan: treatment", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment" },
    ],
  },
  {
    region: "EU", title: "European Union and EEA", asOf: "2026-09-09",
    howItWorks: [
      "Rules differ by country: in some systems your GP or treating specialist must refer you, in others you can book a specialist directly. Ask your treating team how it works where you live.",
      "For rare adult solid cancers, ask your team to refer your case to the European Reference Network EURACAN, which reviews cases in virtual tumour boards across member centres; for children's cancers the network is ERN PaedCan.",
      "Under the cross-border healthcare directive (2011/24/EU) you may seek care, including a specialist consultation, in another EU country and be reimbursed up to what the same care would have cost at home; some treatments need prior authorisation from your national contact point.",
      RECORDS + " Ask for reports in English or with an English summary if you are going abroad.",
    ],
    remoteReview: [
      { name: "ERN EURACAN (rare adult solid cancers)", url: "https://euracan.eu/", note: "Cases are referred by a treating clinician to the network's virtual tumour boards; patients cannot self-refer but can ask their team to do so." },
      { name: "ERN PaedCan (children's cancers)", url: "https://paedcan.ern-net.eu/", note: "The paediatric oncology reference network; referral is by the treating centre." },
      { name: "Your Europe: planned healthcare abroad", url: "https://europa.eu/youreurope/citizens/health/planned-healthcare/index_en.htm", note: "Official guide to reimbursement and prior authorisation for planned care in another EU country, with national contact points." },
    ],
    cost: "Usually covered by your national insurer when referred within your own system. Cross-border care is reimbursed up to the home-country tariff, so you may pay the difference and travel.",
    sources: [
      { label: "Directive 2011/24/EU on patients' rights in cross-border healthcare", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0024" },
      { label: "ESMO: for patients", url: "https://www.esmo.org/for-patients" },
    ],
  },
  {
    region: "AU", title: "Australia", asOf: "2026-09-09",
    howItWorks: [
      "You are entitled to ask for a second opinion. In the public system your GP refers you to a specialist or a hospital cancer service; a new referral is needed to see a different specialist under Medicare.",
      "Ask your treating specialist to write to the second specialist, or ask your GP for a fresh referral; either route is normal and does not affect your current care.",
      RECORDS + " Pathology laboratories and imaging providers will forward results to another specialist on request.",
      "Cancer Council's support line (13 11 20) can help you find specialist services and explain how referrals work in your state or territory.",
    ],
    remoteReview: [
      { name: "Cancer Council Australia: treatment", url: "https://www.cancer.org.au/cancer-information/treatment", note: "Plain-language guide to treatment decisions, including asking for a second opinion and questions to bring." },
      { name: "Cancer Council: support and services", url: "https://www.cancer.org.au/support-and-services", note: "Support line, accommodation and transport help for people travelling to a specialist centre." },
    ],
    cost: "Consultations are rebated by Medicare with a valid referral; specialists may charge a gap above the schedule fee. Public hospital clinics are free.",
    sources: [
      { label: "Cancer Council Australia: treatment", url: "https://www.cancer.org.au/cancer-information/treatment" },
    ],
  },
  {
    region: "JP", title: "Japan", asOf: "2026-09-09",
    howItWorks: [
      "Large hospitals run dedicated second-opinion outpatient clinics (sekando opinion gairai). You attend to hear another specialist's view on your diagnosis and treatment plan; the second hospital does not take over your treatment unless you transfer.",
      "A referral letter (shokaijo) and copies of your records from the treating hospital are required; the current hospital prepares them on request.",
      RECORDS,
      "Second-opinion consultations are outside national health insurance and are charged as a fixed fee by each hospital, published on its website.",
    ],
    remoteReview: [
      { name: "National Cancer Center Hospital (Tokyo)", url: "https://www.ncc.go.jp/en/ncch/", note: "English pages for the national cancer hospital, including how to be seen as a new or second-opinion patient." },
      { name: "National Cancer Center Japan", url: "https://www.ncc.go.jp/en/", note: "The national centre's English portal, with links to both its hospitals and to cancer information services." },
    ],
    cost: "Second-opinion clinics are self-pay at a fixed fee set by each hospital and not covered by national health insurance; the fee is on the hospital's website.",
    sources: [
      { label: "National Cancer Center Japan (English)", url: "https://www.ncc.go.jp/en/" },
    ],
  },
  {
    region: "CN", title: "China", asOf: "2026-09-09",
    howItWorks: [
      "Patients commonly self-refer to a higher-level hospital; national cancer centres and top-tier (grade 3A) cancer hospitals run outpatient clinics you can book directly, often through the hospital's app or an official booking platform.",
      "Multidisciplinary team (MDT) clinics at major cancer hospitals review complex cases and are the closest equivalent of a formal second opinion; ask the treating doctor whether your case can be presented.",
      RECORDS + " Bring the original pathology slides or arrange for a pathology review at the second hospital, which is routine there.",
      "Internet hospital services run by major centres offer online consultations with named specialists for a fee.",
    ],
    remoteReview: [
      { name: "Cancer Hospital, Chinese Academy of Medical Sciences (National Cancer Center)", url: "https://www.cicams.ac.cn/", note: "The national cancer centre in Beijing; outpatient and online consultation information is on the hospital site." },
    ],
    cost: "Outpatient consultation fees are set by the hospital and partly covered by basic medical insurance; specialist and online consultations carry higher self-pay fees.",
    sources: [
      { label: "National Cancer Center China (Cancer Hospital CAMS)", url: "https://www.cicams.ac.cn/" },
      { label: "National Healthcare Security Administration", url: "https://www.nhsa.gov.cn/" },
    ],
  },
  {
    region: "IN", title: "India", asOf: "2026-09-10",
    howItWorks: [
      "You can go directly to a cancer centre: most Indian hospitals, public and private, register new patients without a referral letter, although a summary from your current doctor speeds things up.",
      "The National Cancer Grid lists its member centres (more than 360 hospitals and institutes) and publishes the treatment guidelines they follow, so you can check what standard care should look like for your cancer.",
      "Tata Memorial Hospital in Mumbai and its sister units (Varanasi, Sangrur and Mullanpur, Visakhapatnam, Muzaffarpur, Guwahati) and the other Grid centres run multidisciplinary tumour boards; ask whether your case can be discussed there, and whether a virtual tumour board review is possible from your local hospital.",
      RECORDS + " Bring the original biopsy slides or blocks; a pathology review at the second centre is routine in India.",
      "If your family holds an Ayushman Bharat PM-JAY card, treatment at an empanelled hospital is cashless up to the family limit; ask the hospital's PM-JAY help desk before admission.",
    ],
    remoteReview: [
      { name: "National Cancer Grid", url: "https://www.ncgindia.org", note: "The Grid's site lists member centres, treatment guidelines and its virtual tumour board service, through which member hospitals present cases to specialists elsewhere." },
      { name: "Tata Memorial Centre", url: "https://tmc.gov.in", note: "India's largest cancer centre; the site covers new-patient registration at Mumbai and at its units across the country." },
      { name: "Ayushman Bharat PM-JAY (National Health Authority)", url: "https://nha.gov.in/PM-JAY", note: "Check eligibility, find empanelled hospitals and see which treatment packages are covered." },
    ],
    cost: "Public cancer centres charge little or nothing for most patients (Tata Memorial treats the majority of its patients free or at subsidised rates); private hospital consultations are self-pay unless covered by PM-JAY, a state scheme or private insurance. Second opinions themselves are rarely a separate charge.",
    timeline: "New-patient registration at the large public centres is usually within days, but investigations and treatment slots can take weeks because of volume; private centres are faster.",
    sources: [
      { label: "National Cancer Grid", url: "https://www.ncgindia.org" },
      { label: "Tata Memorial Centre", url: "https://tmc.gov.in" },
      { label: "National Health Authority: PM-JAY", url: "https://nha.gov.in/PM-JAY" },
    ],
  },
];

export function referralRouteFor(region: Region): ReferralRoute | undefined {
  return referralRoutes.find((r) => r.region === region);
}
