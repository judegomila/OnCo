import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Samoa: the public body and papers behind /countries/ws/ (wave 16) that the corpus did not hold. The Ministry record
 * was written from its own documents, read raw on 16 November 2026: the National Cancer Policy and Action Plan
 * FY2024/25 to FY2028/29 (PDF text), the Overseas Medical Treatment Revised Policy 2023 (PDF text) and the National
 * Medicines Policy and Plan of Action FY2023/24 to FY2027/28 (PDF text). DOIs were resolved through Europe PMC and the
 * figures in `findings` are taken from the indexed abstracts.
 *
 * Inbound links: the Ministry links the existing records for Tupua Tamasese Meaole Hospital and the Samoa Cancer
 * Society and is listed on the country page; the papers are linked from the country page and through keyPapers.
 * Coordinates are an approximate Apia city point, not a building position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MOH = "https://www.health.gov.ws/";
const CANCER_POLICY = "https://www.health.gov.ws/wp-content/uploads/2025/02/NATIONAL-CANCER-POLICY-AND-ACTION-PLAN-MASTER-COPY-12.09.2024.pdf";
const OVT_POLICY = "https://www.health.gov.ws/wp-content/uploads/2024/06/OVT-Revised-Policy-2023-ENDORSED-COPY-BY-NPCC-28-08-2023.pdf";
const MEDICINES_POLICY = "https://www.health.gov.ws/wp-content/uploads/2024/06/FINAL-NATIONAL-MEDICINES-POLICY-PLAN-OF-ACTION_MASTER-COPY.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "samoa-ministry-of-health", name: "Ministry of Health, Samoa", aka: ["MOH Samoa", "Samoa Ministry of Health"],
    city: "Apia", country: "WS", lat: -13.835, lng: -171.763, institutionType: "government", website: MOH,
    tldr: "Samoa's health ministry. It wrote the National Cancer Policy and Action Plan for 2024/25 to 2028/29, runs the Samoan overseas medical treatment scheme, and regulates medicines through its Quality Assurance Division.",
    summary: "The Ministry of Health's National Cancer Policy and Action Plan FY2024/25 to FY2028/29 sets ten priorities: health promotion, cancer information campaigns, early detection, screening, local diagnostic services, local treatment services, an equitable and cost-effective overseas medical treatment programme, palliative care, a cancer registry and a cancer centre. Its situational analysis says a cancer registry is held at Tupua Tamasese Meaole Hospital in a laboratory spreadsheet, that 149 cancers were confirmed by histology or cytology in 2023, that there are no consistent national screening programmes, that no systemic intravenous cancer treatment is delivered to adults, and that there is no radiation therapy in Samoa. It describes two overseas referral schemes, one funded by the Samoan government and one by the New Zealand government, which referred 50 cancer patients in FY2022/23 at a cost of NZD 1,058,405. The Ministry's National Medicines Policy and Plan of Action FY2023/24 to FY2027/28 says the Ministry is in charge of regulating medicines through its Quality Assurance Division, under laws including the Drugs Act 1967, the Narcotics Act 1967 and the Poisons Act 1968. The coordinates are an approximate Apia city point.",
    programs: ["National Cancer Policy and Action Plan FY2024/25 to FY2028/29", "Samoa Overseas Medical Treatment Scheme", "HPV vaccination in the national immunisation programme (from 2022)", "Medicines regulation (Quality Assurance Division)", "Essential Medicines List 2022"],
    institutions: ["tupua-tamasese-meaole-hospital", "samoa-cancer-society", "who", "iarc"],
    cancers: ["breast-cancer", "cervical", "endometrial"],
    keyPapers: ["paper-amosa-lei-sam-cancer-incidence-samoa-apjph-2021", "paper-sofija-vave-campaign-samoa-hpi-2023", "paper-cuesta-briand-diagnosis-delays-samoa-apjph-2021"],
    links: [
      { label: "Ministry of Health: National Cancer Policy and Action Plan FY2024/25 to FY2028/29 (PDF)", url: CANCER_POLICY },
      { label: "Ministry of Health: Overseas Medical Treatment Revised Policy 2023 (PDF)", url: OVT_POLICY },
      { label: "Ministry of Health: National Medicines Policy and Plan of Action FY2023/24 to FY2027/28 (PDF)", url: MEDICINES_POLICY },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-amosa-lei-sam-cancer-incidence-samoa-apjph-2021", name: "Cancer Incidence in Samoa: A 10-Year Retrospective Survey (2007-2016)",
    journal: "Asia-Pacific Journal of Public Health", year: 2021, doi: "10.1177/1010539520975261", pmid: "33233921", authors: "Amosa-Lei Sam F, Akinremi A, Mery L, Sarfati D, Stanley J, Gurney J", paperType: "observational",
    tldr: "A survey of every laboratory and clinically confirmed cancer in Samoa from 2007 to 2016 found recorded incidence rising from 28.5 per 100,000 in 2007 to 67.1 in 2012, then varying between 50 and 65 per 100,000.",
    summary: "The authors, from Tupua Tamasese Meaole Hospital, Fiji National University, IARC and the University of Otago, describe the survey as a preliminary step to upscale population-based cancer registry initiatives in Samoa. They reviewed all laboratory and clinically confirmed cases of cancer from 2007 to 2016 in government and non-government facilities.",
    findings: ["Recorded incidence rose steadily from 28.5 per 100,000 in 2007 to 67.1 per 100,000 in 2012.", "It fell to 51.4 per 100,000 in 2013, was 65.1 in 2014 and 54.3 in 2015; from 2012 to 2016 it varied between 50 and 65 per 100,000.", "Cancers of the female genital organs and breast were the commonest in women, and of the digestive system in men."],
    whatItMeans: "It is the published baseline for confirmed cancer counts in Samoa, made before the registry work the National Cancer Policy now plans.",
    caveats: ["Confirmed cases only, so cancers never diagnosed or never recorded are missing.", "The abstract gives rates without the underlying case counts."],
    cancers: ["breast-cancer", "cervical"], institutions: ["tupua-tamasese-meaole-hospital"], links: [doi("10.1177/1010539520975261", "DOI"), pubmed("33233921")] }),

  p({ id: "paper-sofija-vave-campaign-samoa-hpi-2023", name: "The Vave campaign: impact evaluation of a cancer awareness raising multi-media campaign in Samoa",
    journal: "Health Promotion International", year: 2023, doi: "10.1093/heapro/daac021", pmid: "35348669", authors: "Sofija E, Harris N, Cuesta-Briand B, Spratling T, Burich S", paperType: "observational",
    tldr: "An evaluation of the Samoa Cancer Society's Vave (quickly) campaign found it raised awareness of cancer and of early detection, while almost 30% of those surveyed said they were unsure or would not see a doctor about a possible sign of cancer.",
    summary: "The Samoa Cancer Society developed Vave as, in the authors' words, the first multi-media cancer awareness campaign in Samoa. It combined mass media, printed resources and community outreach at churches, villages and schools, with three messages: detect signs and symptoms quickly, quickly see a doctor, and quickly call the Society. Impact was measured with surveys before and after outreach sessions, a campaign recall survey and the enquiries the Society received.",
    findings: ["The campaign increased awareness of cancer and of the importance of early detection, shown by recall of its messages, more enquiries to the Society and improved knowledge.", "Almost 30% of recall survey respondents said they were unsure or would not see a doctor if concerned about a sign of cancer.", "The reasons given were lack of knowledge, lack of trust in hospitals and a preference for traditional healing."],
    whatItMeans: "Awareness campaigns in Samoa work, but knowing the signs is not enough where people do not trust the hospital or prefer a traditional healer.",
    caveats: ["Measures awareness and stated intention, not stage at diagnosis or survival.", "Written with the Society that ran the campaign."],
    institutions: ["samoa-cancer-society"], links: [doi("10.1093/heapro/daac021", "DOI"), pubmed("35348669")] }),

  p({ id: "paper-cuesta-briand-diagnosis-delays-samoa-apjph-2021", name: "Delays in the Pathway to Cancer Diagnosis in Samoa: A Qualitative Study of Patients' Experiences",
    journal: "Asia-Pacific Journal of Public Health", year: 2021, doi: "10.1177/10105395211019857", pmid: "34075810", authors: "Cuesta-Briand B, Hansell D, Burich S, Loimata T", paperType: "observational", participants: 19,
    tldr: "Interviews with 19 Samoan patients found four sources of delay in reaching a cancer diagnosis: beliefs about cancer, waiting for pain before seeking care, lack of follow-up, and communication and trust.",
    summary: "A qualitative study using semistructured interviews with 19 Samoan patients, analysed thematically with socioecological theory. The authors note that people with cancer in Samoa present late.",
    findings: ["Four themes emerged: knowledge and beliefs about cancer; pain as a trigger for seeking health care; follow-up issues; and communication and trust.", "Knowledge of cancer and attitudes to pain were strongly influenced by culture and community beliefs.", "Lack of follow-up resulted in significant delays, and ineffective communication between patient and doctor led to uncertainty and mistrust of the health care system."],
    whatItMeans: "Delay in Samoa is not only a matter of what patients know; it also arises inside the health service, in follow-up and in how doctors and patients talk.",
    caveats: ["Nineteen patients, so the findings describe experiences and do not measure how common each delay is."],
    institutions: ["samoa-cancer-society"], links: [doi("10.1177/10105395211019857", "DOI"), pubmed("34075810")] }),
];

/** Records behind /countries/ws/ (wave 16). */
export const recordsWS: EntityInput[] = [...institutions, ...papers];
