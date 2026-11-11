import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Singapore: the public bodies behind /countries/sg/ (wave 9) that the corpus did not hold, each written from its own
 * pages read as raw text on 11 November 2026: the Singapore Cancer Registry Annual Report 2023 (PDF text, National
 * Registry of Diseases Office), the Ministry of Health's Cancer Drug List page, its cancer treatment financing FAQs and
 * its 2022 brochure (PDF text), and the Health Sciences Authority's page on evaluation routes. The National Cancer Centre
 * Singapore, the National University Cancer Institute and the Singapore Cancer Society already exist and are reused.
 * Coordinates are approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const SCR_2023 = "https://isomer-user-content.by.gov.sg/737/a9695c77-40d5-4bbd-a4b9-347a0942b191/singapore-cancer-registry-annual-report-2023.pdf";
const CDL = "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/medishield-life/cancer-drug-list/";
const CDL_FAQ = "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/medishield-life/faqs-on-cancer-treatment-financing/";
const HSA_ROUTES = "https://www.hsa.gov.sg/therapeutic-products/registration-of-therapeutic-products/register-your-therapeutic-product/registration-of-therapeutic-products/evaluation-routes/";

const institutions: InstitutionInput[] = [
  i({ id: "ministry-of-health-singapore", name: "Ministry of Health, Singapore", aka: ["MOH Singapore"],
    city: "Singapore", country: "SG", lat: 1.29, lng: 103.85, institutionType: "government", website: "https://www.moh.gov.sg",
    tldr: "Singapore's health ministry. Since 1 September 2022 it decides, through its Cancer Drug List, which outpatient cancer treatments MediShield Life and MediSave will pay for and up to what monthly limit.",
    summary: "The Ministry of Health runs Singapore's public healthcare institutions and its health financing schemes: MediShield Life, the national basic health insurance, and MediSave, the compulsory medical savings accounts. In August 2021 it announced changes to the financing of outpatient cancer treatment, and from 1 September 2022 MediShield Life and MediSave cover only treatments on its Cancer Drug List, each with its own monthly claim limit. Its FAQs say the list comprises treatments that are clinically proven (registered by the Health Sciences Authority for the indication) and more cost-effective, that companies make the case through a submission to the Agency for Care Effectiveness, and that the list is updated three times a year. The coordinates on this record are an approximate city point.",
    programs: ["MediShield Life", "MediSave", "Cancer Drug List (from 1 September 2022)", "Medication Assistance Fund", "Healthier SG Screening"],
    institutions: ["singapore-cancer-registry", "hsa-singapore", "ace-singapore", "nccs", "nuh-ncis"],
    links: [
      { label: "Ministry of Health: Cancer Drug List", url: CDL },
      { label: "Ministry of Health: FAQs on cancer treatment financing", url: CDL_FAQ },
    ] }),

  i({ id: "singapore-cancer-registry", name: "Singapore Cancer Registry", aka: ["SCR", "National Registry of Diseases Office cancer registry"],
    city: "Singapore", country: "SG", lat: 1.29, lng: 103.85, institutionType: "government", website: "https://www.nrdo.gov.sg",
    tldr: "Singapore's national population-based cancer registry, counting cancers diagnosed in Singapore residents since 1 January 1968. Reporting is compulsory under the National Registry of Diseases Act of 2007.",
    summary: "The Singapore Cancer Registry was established in 1967 to collect information on all cancers diagnosed in Singapore from 1 January 1968. It is run by the National Registry of Diseases Office and governed by the National Registry of Diseases Act, enacted in 2007; the cancer notification regulations have been operational since 1 August 2009. Notifications come from doctors, histopathology and haematology laboratories and healthcare institutions, are matched on the national identity card number and are checked against medical records. Its Annual Report 2023 counts 91,574 cancers in residents in 2019 to 2023 (44,981 in men, 46,593 in women) and 30,979 cancer deaths, and gives five-year age-standardised relative survival of 61.4% for 2019 to 2023, against 19.5% in 1973 to 1977. The coordinates on this record are an approximate city point.",
    programs: ["Population-based cancer registration (from 1968)", "Annual reports and survival statistics"],
    institutions: ["ministry-of-health-singapore", "iarc"], cancers: ["breast-cancer", "colorectal", "nsclc", "prostate"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "Singapore Cancer Registry Annual Report 2023 (National Registry of Diseases Office, PDF)", url: SCR_2023 },
      { label: "National Registry of Diseases Office: publications", url: "https://www.nrdo.gov.sg/publications/" },
    ] }),

  i({ id: "hsa-singapore", name: "Health Sciences Authority, Singapore", aka: ["HSA", "HSA Singapore"],
    city: "Singapore", country: "SG", lat: 1.28, lng: 103.84, institutionType: "government", website: "https://www.hsa.gov.sg",
    tldr: "Singapore's medicines regulator. It registers a new medicine by full evaluation, by abridged evaluation if one regulator has approved it, or by verification if two of its six reference agencies have.",
    summary: "The Health Sciences Authority registers therapeutic products in Singapore. Its evaluation routes page describes three routes for a new drug: full evaluation for a product no regulator has approved; abridged evaluation for a product approved by at least one drug regulatory agency; and verification for a product approved by at least two of its reference agencies (the US FDA, the European Medicines Agency through the centralised procedure, Health Canada, the UK MHRA, Swissmedic and Australia's TGA), within three years by the chosen primary agency, with the unredacted assessment reports. A company may ask for priority review for a medicine for a serious life-threatening condition that meets a local unmet need, and the page names cancer among the conditions of local public health concern. Registration for the indication is the first test for a medicine to enter the Ministry of Health's Cancer Drug List.",
    programs: ["Full, abridged and verification evaluation routes", "Priority review", "Project Orbis participation"],
    institutions: ["ministry-of-health-singapore"], terms: ["project-orbis"],
    links: [{ label: "HSA: evaluation routes for therapeutic products", url: HSA_ROUTES }] }),

  i({ id: "ace-singapore", name: "Agency for Care Effectiveness", aka: ["ACE", "ACE Singapore"],
    city: "Singapore", country: "SG", lat: 1.29, lng: 103.85, institutionType: "government", website: "https://www.ace-hta.gov.sg",
    tldr: "Singapore's national health technology assessment agency. Drug companies submit evidence and price proposals to it for a cancer treatment to be added to the Cancer Drug List.",
    summary: "The Ministry of Health's FAQs on cancer treatment financing describe the Agency for Care Effectiveness as Singapore's national health technology assessment agency, and say companies are responsible for showing the clinical and cost-effectiveness of cancer drug treatments through a company-led submission to it, which can run in parallel with registration at the Health Sciences Authority. A combination treatment that is not cost-effective may still be listed after negotiation with the drug companies, with its claim limit pegged to the highest individual limit of the drugs in it.",
    programs: ["Health technology assessment", "Company-led submissions for the Cancer Drug List"],
    institutions: ["ministry-of-health-singapore"],
    links: [
      { label: "Agency for Care Effectiveness", url: "https://www.ace-hta.gov.sg" },
      { label: "Ministry of Health: FAQs on cancer treatment financing", url: CDL_FAQ },
    ] }),
];

/** Records behind /countries/sg/ (wave 9). */
export const recordsSG: EntityInput[] = [...institutions];
