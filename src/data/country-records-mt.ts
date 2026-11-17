import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Malta: the public bodies behind /countries/mt/ (wave 13) that the corpus did not hold. Each was written from sources
 * read raw on 16 November 2026: the PPRI Pharma Brief Malta 2021 (written by staff of the Directorate for
 * Pharmaceutical Affairs), the National Screening Centre's own pages (in Maltese, Internet Archive copies of 9 August
 * 2025, because healthscreening.gov.mt refused a script), the Malta Community Chest Fund Foundation's own site, and the
 * OECD and European Commission's EU Country Cancer Profile Malta 2025. The Sir Anthony Mamo Oncology Centre, the Malta
 * National Cancer Registry and the Malta Medicines Authority already exist and are reused. Coordinates are approximate
 * points for the locality named in the source (Valletta, and Guardamangia in Pietà), not the buildings.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const CCP_2025 = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-mt-2024-1677-en.pdf";
const PPRI = "https://ppri.goeg.at/system/files/inline-files/PPRI_Pharma_Malta_Brief_final.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "directorate-pharmaceutical-affairs-malta", name: "Directorate for Pharmaceutical Affairs (Malta)", aka: ["DPA", "Direttorat għall-Affarijiet Farmaċewtiċi", "Government Formulary List", "Government Formulary List Advisory Committee", "GFLAC"],
    city: "Guardamangia", country: "MT", lat: 35.892, lng: 14.493, institutionType: "government", website: "https://pharmaceuticalaffairs.gov.mt",
    tldr: "The unit of Malta's Ministry for Health that assesses new medicines for the Government Formulary List, the list of medicines the public health service gives free. It also manages the list and handles requests for medicines outside it.",
    summary: "The PPRI Pharma Brief for Malta, written by the Directorate's own staff and describing 2021, says the Directorate for Pharmaceutical Affairs forms part of the Department for Policy in Health. It receives applications for new medicines from marketing authorisation holders or clinical consultants, and its health technology assessment unit prepares assessments and presents them to the Government Formulary List Advisory Committee, a technical committee that recommends inclusion and a maximum reference price. The Advisory Committee for Health Care Benefits then advises the Minister for Health on budget impact, sustainability and capacity, and the Minister gives the final endorsement. The Directorate's Formulary Management Unit manages the Hospital Formulary List and the Out-Patients Formulary List, and its Pharmaceutical Pricing Unit calculates maximum reference prices. Listed medicines are bought by the Central Procurement and Supplies Unit, mostly by tender, and are free to entitled patients with no copayment. The brief says the initiative of setting aside budgeted funds for a disease area started as an oncology fund. The OECD and European Commission's 2025 Country Cancer Profile reports that none of a sample of new breast and lung cancer medicines with the highest clinical benefit was on the list, although all were available on a named-patient basis. The Directorate's own site refused a script, so OnCo has not read it.",
    programs: ["Health technology assessment for the Government Formulary List", "Formulary Management Unit", "Pharmaceutical Pricing Unit", "Exceptional medicinal treatment requests"],
    institutions: ["malta-medicines-authority", "sir-anthony-mamo-oncology-centre"],
    links: [
      { label: "PPRI Pharma Brief: Malta 2021, by the Directorate for Pharmaceutical Affairs (PDF, published June 2022)", url: PPRI },
      { label: "OECD and European Commission: EU Country Cancer Profile Malta 2025, sections 5.1 and 5.3 (PDF)", url: CCP_2025 },
    ] }),

  i({ id: "national-screening-centre-malta", name: "National Screening Centre (Malta)", aka: ["Ċentru Nazzjonali tal-Iscreening"],
    city: "Valletta", country: "MT", lat: 35.9, lng: 14.51, institutionType: "government", website: "https://healthscreening.gov.mt",
    tldr: "The government centre in Valletta that runs Malta's three cancer screening programmes, for breast, bowel and cervical cancer. It sends the invitations and carries out the screening mammograms.",
    summary: "The National Screening Centre's pages, read in Maltese in the Internet Archive's copies of 9 August 2025, give its address as 17 Lascaris Wharf, Valletta. They say screening mammograms are carried out at the Centre and read independently by two radiologists, with normal results posted after about three weeks; that the eligible age group for breast screening is 50 to 69; that bowel screening with a FIT home testing kit is offered to everyone aged 50 to 74; and that cervical screening invites women born from 1980 onwards, first at age 25, then every three years, and every five years from age 50. The OECD and European Commission's 2025 Country Cancer Profile says the three programmes began in 2009 (breast), 2012 (colorectal) and 2015 (cervical), gives the ages as 51 to 69 for breast and 53 to 74 for bowel, and reports programme participation in 2022 of 44% for breast, a quarter for bowel and 16% for cervical screening, with higher figures in surveys because many people are screened privately. The Centre's live site refused a script on 16 November 2026, so the ages now in force were not confirmed.",
    programs: ["Breast screening (since 2009)", "Colorectal screening (since 2012)", "Cervical screening (since 2015)"],
    institutions: ["sir-anthony-mamo-oncology-centre", "malta-national-cancer-registry"],
    cancers: ["breast-cancer", "colorectal", "cervical"],
    links: [
      { label: "National Screening Centre: breast screening (in Maltese, Internet Archive copy of 9 August 2025)", url: "https://web.archive.org/web/20250809142605/https://healthscreening.gov.mt/screening-tas-sider/" },
      { label: "National Screening Centre: colorectal screening (in Maltese, Internet Archive copy of 9 August 2025)", url: "https://web.archive.org/web/20250809153840/https://healthscreening.gov.mt/screening-kolorettali/" },
      { label: "National Screening Centre: cervical screening (in Maltese, Internet Archive copy of 9 August 2025)", url: "https://web.archive.org/web/20250809141549/https://healthscreening.gov.mt/screening-cervikali/" },
      { label: "OECD and European Commission: EU Country Cancer Profile Malta 2025, section 4 (PDF)", url: CCP_2025 },
    ] }),

  i({ id: "malta-community-chest-fund-foundation", name: "Malta Community Chest Fund Foundation", aka: ["MCCFF", "Malta Community Chest Fund"],
    city: "Valletta", country: "MT", lat: 35.9, lng: 14.51, institutionType: "consortium", website: "https://www.mccff.org.mt",
    tldr: "A Maltese charitable foundation that pays for specialised medicines for people with cancer and severe chronic illness, and for travel and accommodation when patients are treated abroad. The OECD's 2025 profile calls it a major funder of cancer medicines that are not on Malta's Government Formulary List.",
    summary: "The Foundation's own site says its mission is to improve the quality of life and care of individuals and society in general, without discrimination, by applying funds raised through fund-raising activities, donations, contributions, bequests, endowments and legacies. Its Medical Assistance Unit provides specialised medicine for severe chronic illness and cancer, specialised treatment for rare diseases, and accommodation, transport and subsistence for patients receiving treatment abroad and their accompanying relatives. Its offices are at the Grandmasters' Palace in Valletta, in Victoria, Gozo, and at the Sir Anthony Mamo Oncology Centre. The OECD and European Commission's 2025 Country Cancer Profile says the Foundation is funded through government support and public donations, that by 2023 it had enabled access to over 40 different chemotherapy treatments, and that its annual expenditure rose from less than EUR 1 million in 2015 to over EUR 20 million in 2022, citing Maltese press reports. Its published accounts are scanned images, which OnCo could not read as text.",
    programs: ["Medical Assistance Unit", "Social Assistance Unit", "Unit for Assistance of Persons with Disability"],
    institutions: ["sir-anthony-mamo-oncology-centre"],
    links: [
      { label: "Malta Community Chest Fund Foundation: the Medical Assistance Unit", url: "https://www.mccff.org.mt/en/services/medical-assistance/" },
      { label: "Malta Community Chest Fund Foundation: about, with its annual reports", url: "https://www.mccff.org.mt/en/about-mccff/" },
      { label: "OECD and European Commission: EU Country Cancer Profile Malta 2025, section 5.3 (PDF)", url: CCP_2025 },
    ] }),
];

/** Records behind /countries/mt/ (wave 13). */
export const recordsMT: EntityInput[] = [...institutions];
