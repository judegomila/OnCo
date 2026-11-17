import type { EntityInput, PaperInput } from "@/lib/schema";

/**
 * Solomon Islands: the papers behind /countries/sb/ (wave 16) that the corpus did not hold. The corpus already holds
 * the Ministry of Health and Medical Services and the National Referral Hospital in Honiara, so no institution is
 * added. DOIs were resolved through Europe PMC on 16 November 2026 and the figures in `findings` are taken from the
 * indexed abstracts; the description of the cancer registry in Yip et al. 2023 was read from the open-access full text
 * through Europe PMC.
 *
 * Inbound links: both papers are listed on the country page and link the existing hospital record.
 */
const asOf = "2026-11-16";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const papers: PaperInput[] = [
  p({ id: "paper-yip-oncology-unit-solomon-islands-jcogo-2023", name: "Building Capability and Capacity: The Establishment of an Oncology Unit in the Solomon Islands",
    journal: "JCO Global Oncology", year: 2023, doi: "10.1200/go.22.00325", pmid: "36862976", authors: "Yip D, Soma A, Pati N, Spencer W, Hua B, Jagilly R", paperType: "observational",
    tldr: "Describes how a medical oncology unit was set up at the National Referral Hospital in Honiara, commissioned in September 2018 with Australian partners, and reports that Solomon Islands now has a sustainable unit giving chemotherapy.",
    summary: "The authors, from the National Referral Hospital in Honiara, The Canberra Hospital and the Australian National University, describe a scoping visit in 2016 at the request of the hospital's Medical Superintendent, an observership in Canberra in 2017 by a hospital doctor training in oncology, and, after a request from the Solomon Islands Ministry of Health, a multidisciplinary mission arranged by Australia's Department of Foreign Affairs and Trade under the Royal Australasian College of Surgeons and Royal Australasian College of Physicians Pacific Islands Program to help commission the unit in September 2018. A second mission followed in 2019. The full text adds that the Solomon Islands Cancer Registry was re-established in 2008 with IARC's support, is hospital-based and uses CanReg 5 software, that the hospital has no radiotherapy facilities, and that it had no CT scanner until 2022.",
    findings: ["The National Referral Hospital Medical Oncology Unit was commissioned in September 2018.", "With an Australian Volunteers International pharmacist, the team helped hospital staff develop localised Solomon Islands Oncology Guidelines.", "Two oncology nurses visited Canberra on observership in 2019, and the unit's doctor was supported to pursue postgraduate education in cancer sciences.", "The authors report a sustainable oncology unit delivering chemotherapy and management of patients with cancer."],
    whatItMeans: "Chemotherapy in Solomon Islands is now given in one dedicated unit by trained staff to written local guidelines.",
    caveats: ["A descriptive account by the people who built the unit; the abstract reports no survival or outcome figures.", "The country still has no radiotherapy."],
    institutions: ["national-referral-hospital-honiara"], links: [doi("10.1200/go.22.00325", "DOI"), pubmed("36862976")] }),

  p({ id: "paper-martiniuk-cancer-solomon-islands-cancerepidemiol-2017", name: "Cancer in the Solomon Islands",
    journal: "Cancer Epidemiology", year: 2017, doi: "10.1016/j.canep.2017.04.016", pmid: "29120823", authors: "Martiniuk A, Jagilli R, Natuzzi E, et al.", paperType: "review",
    tldr: "A 2017 review of cancer in Solomon Islands found breast and cervical cancer the two most commonly identified cancers, a hospital-based registry with incomplete data, and delays in diagnosis arising from distance, awareness and limited diagnostic services.",
    summary: "The authors combined a literature review, an analysis of cancer data from the National Referral Hospital in Honiara, interviews with key stakeholders and an audit of health services for cancer using the WHO SARA tool. The abstract gives the population as 550,000.",
    findings: ["Breast and cervical cancer were the first and second most commonly identified cancers.", "The cancer registry is hospital-based and has incomplete data collection because it is passive and lacks resources for data entry and processing, so its data are rarely used for decision-making.", "Reasons for delayed diagnosis or lack of treatment included patients not knowing the symptoms, late referral to the National Referral Hospital, health workers lacking the skills or diagnostic capability to detect cancer, and lack of access to any health care because of geography and economic fragility.", "Stakeholders recommended a cancer unit, improved registry processes and closer collaboration between the one tertiary hospital and other health services."],
    whatItMeans: "It is the baseline description of cancer services in Solomon Islands before the oncology unit opened in 2018.",
    caveats: ["Written before the oncology unit was commissioned, so the services it describes have changed.", "Hospital data, not a population count."],
    cancers: ["breast-cancer", "cervical"], institutions: ["national-referral-hospital-honiara"], links: [doi("10.1016/j.canep.2017.04.016", "DOI"), pubmed("29120823")] }),
];

/** Records behind /countries/sb/ (wave 16). */
export const recordsSB: EntityInput[] = [...papers];
