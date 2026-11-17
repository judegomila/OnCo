import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Brunei: the public bodies and the paper behind /countries/bn/ (wave 15) that the corpus did not hold. Each was
 * written from its own source, read as raw text on 16 November 2026: the Ministry of Health's own pages (National
 * Health Screening Programme, Pharmacy Services, Ministry Departments) and its Scheme of Charges updated 8 July 2025
 * (PDF text); the Ministry's National Cervical Cancer Prevention and Control Guideline 2025 (PDF text, posted on the
 * ICCP portal); WHO's 2020 cancer country profile (PDF text); and the Europe PMC record and open full text of the one
 * paper (DOI resolved, abstract and methods read).
 *
 * The Brunei Darussalam Cancer Registry (`brunei-darussalam-cancer-registry`) and The Brunei Cancer Centre
 * (`brunei-cancer-centre-jpmc`) already exist in src/data/institutions/countries-2026-11-asia-pacific.ts and are
 * linked here, not repeated.
 *
 * Inbound links: the Ministry lists the Department of Pharmaceutical Services in `institutions` and the paper in
 * `keyPapers`; the Department lists the Ministry. Coordinates are an approximate Bandar Seri Begawan city point for
 * both bodies, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

const MOH_NHSP = "https://moh.gov.bn/services/national-health-screening-programme/";
const MOH_PHARMACY = "https://moh.gov.bn/services/pharmary-services/";
const MOH_DEPARTMENTS = "https://moh.gov.bn/about-us/ministry-departments/";
const MOH_CHARGES = "https://moh.gov.bn/wp-content/uploads/2025/07/SCHEME-OF-CHARGES-V3.pdf";
const CERVICAL_GUIDELINE = "https://www.iccp-portal.org/sites/default/files/2026-05/CERVICAL-CANCER-2025.pdf";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-brn-2020.pdf";
const WHO_ML_LIST = "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf";
const INCIDENCE_DOI = "10.1186/s12885-023-10962-8";

const institutions: InstitutionInput[] = [
  i({ id: "brunei-ministry-of-health", name: "Ministry of Health, Brunei Darussalam", aka: ["Kementerian Kesihatan", "Ministry of Health Brunei", "MOH Brunei"],
    city: "Bandar Seri Begawan", country: "BN", lat: 4.89, lng: 114.942, institutionType: "government", website: "https://moh.gov.bn",
    tldr: "Brunei's health ministry. It manages the national cancer registry, school vaccination against the virus that causes cervical cancer, and a national screening programme for bowel, breast and cervical cancer.",
    summary: "This record is written from the Ministry's own pages and documents. Its National Health Screening Programme, organised in 2019, offers citizens and permanent residents a stool test for colorectal cancer at ages 50 to 75, a mammogram at ages 40 to 69 and an HPV test for cervical cancer at ages 25 to 65, alongside checks for cardiovascular risk. Its National Cervical Cancer Prevention and Control Guideline 2025 records the first such guideline in 2009, a national Pap test registry with call and recall from 2011, and a school-based HPV vaccination programme launched on 6 October 2011 and given since 2012. The Ministry's departments page lists national cancer registry management among the services of the Epidemic Intelligence and Response Unit of the Brunei Centre for Disease Control and Prevention, a unit established on 1 November 2023.\n\nThe Ministry's Scheme of Charges, updated on 8 July 2025, marks holders of a yellow identity card, and holders of a purple identity card labelled stateless, as exempt from charges at government facilities and for referrals to non-government facilities, with an outpatient registration fee of one dollar. The document does not define the card colours. WHO's 2020 cancer country profile recorded an operational integrated plan for noncommunicable diseases in 2019 and no entry for a national cancer control plan. OnCo found no annual report of the cancer registry on the Ministry's site. The coordinates on this record are an approximate Bandar Seri Begawan city point.",
    programs: ["National Health Screening Programme (colorectal, breast and cervical cancer, from 2019)", "National School-Based HPV Vaccination Programme (given since 2012)", "National Cervical Cancer Prevention and Control Guideline 2025", "National cancer registry management (Brunei Centre for Disease Control and Prevention)", "Scheme of Charges (updated 8 July 2025)"],
    institutions: ["brunei-department-of-pharmaceutical-services", "brunei-darussalam-cancer-registry", "brunei-cancer-centre-jpmc", "who"],
    cancers: ["cervical", "breast-cancer", "colorectal"],
    keyPapers: ["paper-leong-cancer-incidence-mortality-brunei-bmccancer-2023"],
    links: [
      { label: "Ministry of Health Brunei: National Health Screening Programme", url: MOH_NHSP },
      { label: "Ministry of Health Brunei: Ministry Departments", url: MOH_DEPARTMENTS },
      { label: "Ministry of Health Brunei: Scheme of Charges, updated 8 July 2025 (PDF)", url: MOH_CHARGES },
      { label: "Brunei Darussalam National Cervical Cancer Prevention and Control Guideline 2025 (Ministry of Health, PDF on the ICCP portal)", url: CERVICAL_GUIDELINE },
      { label: "WHO: Cancer Country Profile 2020, Brunei Darussalam (PDF)", url: WHO_PROFILE_2020 },
    ] }),

  i({ id: "brunei-department-of-pharmaceutical-services", name: "Department of Pharmaceutical Services, Ministry of Health, Brunei Darussalam", aka: ["Brunei Darussalam Medicines Control Authority", "BDMCA", "Department of Pharmaceutical Services", "DPS Brunei"],
    city: "Bandar Seri Begawan", country: "BN", lat: 4.89, lng: 114.942, institutionType: "government", website: MOH_PHARMACY,
    tldr: "The department of Brunei's Ministry of Health through which the Brunei Darussalam Medicines Control Authority registers medicines and licenses their import, manufacture and wholesale. A medicine has had to be registered before it can be sold in Brunei since July 2012.",
    summary: "The Ministry of Health's Pharmacy Services page says that medicinal products manufactured, sold, supplied or imported into Brunei Darussalam are regulated under the Medicines Order, 2007 and its regulations, and that the Brunei Darussalam Medicines Control Authority, through the Department of Pharmaceutical Services, is the authority responsible for decisions on registration, licences and the listing of any medicinal product. Since the drug registration system became mandatory in July 2012, importers, wholesalers and manufacturers must register a medicinal product before it can be marketed. The page also carries applications for an import permit for medicinal products with special approval and for import and wholesale licences, and says that traditional medicines and health supplements do not need a licence or approval before sale.\n\nOnCo did not read a list of registered cancer medicines or a hospital formulary. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include the authority. The department gives its address as Simpang 433, Rimba Highway, Kampong Madaras; the coordinates on this record are an approximate Bandar Seri Begawan city point.",
    programs: ["Registration of medicinal products (mandatory since July 2012)", "Import, wholesale and manufacturing licences", "Import permits for medicinal products with special approval", "Notification of cosmetic products"],
    institutions: ["brunei-ministry-of-health"],
    links: [
      { label: "Ministry of Health Brunei: Pharmacy Services", url: MOH_PHARMACY },
      { label: "WHO: list of regulators operating at maturity level 3 and 4 (August 2026, PDF)", url: WHO_ML_LIST },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-leong-cancer-incidence-mortality-brunei-bmccancer-2023", name: "Cancer incidence and mortality in Brunei Darussalam, 2011 to 2020",
    journal: "BMC Cancer", year: 2023, doi: INCIDENCE_DOI, pmid: "37217954", authors: "Leong E, Ong SK, Si-Ramlee KA, Naing L.", paperType: "observational", participants: 6495,
    tldr: "Brunei's national cancer registry recorded 6,495 new cancers and 3,359 cancer deaths among citizens and permanent residents from 2011 to 2020. Colorectal cancer was the commonest in men and breast cancer in women, and cervical cancer incidence fell over the decade.",
    summary: "A registry study using de-identified data from the Brunei Darussalam Cancer Registry of the Ministry of Health, covering every cancer diagnosed among citizens and permanent residents from 2011 to 2020. Rates were age-standardised to the WHO world standard population and trends tested by joinpoint regression. The methods describe the registry: established by the Ministry in 2001 as a population-based database of all malignant cancers, collecting actively from the central pathology service, hospital records and the death registry because cancer is not a notifiable disease by law, and helped since 2013 by the national electronic patient record system.",
    findings: [
      "6,495 new cancers were recorded (3,792 in women, 2,703 in men) and 3,359 deaths (1,723 in women, 1,636 in men); 516 cases were diagnosed in 2011 and 827 in 2020, with age-standardised incidence of 234.4 and 230.5 per 100,000.",
      "In men the commonest cancers were colorectal (551), lung (323), prostate (258), liver (195) and non-Hodgkin lymphoma (172); in women breast (906), colorectal (455), lung (293), cervix (286) and corpus uteri (284).",
      "Deaths were led by lung (293) and colorectal cancer (278) in men and by breast (309) and lung cancer (250) in women; cervical cancer incidence declined and corpus uteri incidence rose significantly over the decade.",
    ],
    whatItMeans: "Brunei is one of the countries where national cancer figures are counted, not modelled, and the authors describe this paper as the first study of ten-year changes in incidence and mortality for the common cancers there. IARC's GLOBOCAN 2024 fact sheet names a national registry as its source for Brunei's incidence.",
    caveats: ["Covers citizens and permanent residents only.", "Reporting to the registry is not required by law; the registry collects cases actively."],
    institutions: ["brunei-darussalam-cancer-registry", "brunei-ministry-of-health"], cancers: ["colorectal", "breast-cancer", "lung-cancer", "cervical"],
    links: [{ label: "BMC Cancer 2023", url: `https://doi.org/${INCIDENCE_DOI}` }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/37217954/" }, { label: "Full text as read (Europe PMC API, XML)", url: "https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10201047/fullTextXML" }] }),
];

export const recordsBN: EntityInput[] = [...institutions, ...papers];
