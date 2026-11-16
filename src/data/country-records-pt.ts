import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Portugal: the public bodies behind /countries/pt/ that the corpus did not hold. Every record was written from the
 * body's own publications or from the Portuguese legal text that sets it up, read raw in Portuguese on 11 November
 * 2026: Law 53/2017 creating the national cancer registry and Decree-Law 97/2015 creating the national health
 * technology assessment system (both from the Diário da República PDFs, reached through their ELI addresses), the
 * registry's 2019 report as published by IPO Porto (its text layer is not extractable, so it was read by OCR and the
 * figures checked against the page images), Despacho 13227/2023 approving the national cancer strategy, the
 * Directorate-General of Health's Norma 002/2026 on HPV vaccination, and the OECD and European Commission's Country
 * Cancer Profile Portugal 2025 (through the Internet Archive, because the registry site rejected scripts).
 *
 * Coordinates: the registry is placed at IPO Porto, which hosts it; the three Lisbon bodies are given a Lisbon city
 * point (38.722, -9.139), not a street address.
 *
 * Inbound links: the health service links the registry, the medicines authority, the health directorate and the three
 * oncology institutes; the registry links the medicines authority and the directorate; the directorate links the
 * registry and the health service; the medicines authority links the health service, the registry and the EMA.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const LEI_53 = "https://data.dre.pt/eli/lei/53/2017/07/14/p/dre/pt/pdf";
const DL_97 = "https://data.dre.pt/eli/dec-lei/97/2015/06/01/p/dre/pt/pdf";
const RON_2019 = "https://ipoporto.pt/wpsite_2020/wp-content/uploads/2023/05/ron-2019_new_v8f.pdf";
const RORENO_PUBS = "https://ipoporto.pt/eu-cidadao/registo-oncologico-regional-do-norte/publicacoes/";
const ENLCC = "https://www.iccp-portal.org/system/files/plans/Estrategia%20Nacional%20de%20Luta%20vs%20Cancro_2023.pdf";
const CCP_2025 = "https://web.archive.org/web/20261013171208/https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-pt-2024-1681-en.pdf";
const NORMA_HPV = "https://www.dgs.pt/normas-orientacoes-e-informacoes/normas-e-circulares-normativas/norma-n-0022026-de-08042026-atualizacao-da-estrategia-de-vacinacao-contra-o-virus-do-papiloma-humano-hpv-no-programa-nacional-de-vacinacao.aspx";

const institutions: InstitutionInput[] = [
  i({ id: "ron-portugal", name: "Portuguese National Cancer Registry (Registo Oncológico Nacional)", aka: ["Registo Oncológico Nacional", "RON", "National Cancer Registry of Portugal"],
    city: "Porto", country: "PT", lat: 41.181, lng: -8.604, institutionType: "government", website: "https://ron.min-saude.pt",
    tldr: "Portugal's single national cancer registry, created by Law 53/2017 and working since 1 January 2018. Every public, social and private health service must record each new cancer within nine months of diagnosis. It counted 57,878 new cancers in 2019, and its coordinator reported 60,954 for 2022.",
    summary: "Law 53/2017 of 14 July 2017, in force from 1 January 2018, creates the Registo Oncológico Nacional as a centralised registry on a single electronic platform, to collect and analyse data on every cancer patient diagnosed or treated in mainland Portugal and the autonomous regions. Its stated purposes are monitoring the activity of institutions, the effectiveness of organised screening and of treatment, epidemiological surveillance and research, and, with the medicines authority INFARMED, monitoring the effectiveness of medicines and medical devices. Every public, social and private health service must register each new cancer within nine months of learning of the diagnosis and update the stage, treatments and vital status at least once a year. The data of the former regional registries, of the Portuguese paediatric cancer registry and of the autonomous regions' registries are integrated into it. The board of the Francisco Gentil Portuguese Oncology Institute group administers it and names a coordinator from one of the three oncology institutes for three years, rotating between them.\n\nIts 2019 report, edited and published by IPO Porto, counts 57,878 new cancers in people resident in Portugal diagnosed in 2019 and registered by 9 September 2022, a crude rate of 562.1 per 100,000, of which 31,507 were in men and 26,371 in women; breast (8,567), prostate (6,912) and colon (5,483) were the commonest sites. The report counts all invasive cancers except basal cell skin cancer, plus in situ and uncertain-behaviour bladder tumours and, in children under 15, benign brain tumours. Its coordinator, Maria José Bento, reported 60,954 new cancers for 2022 (579.6 per 100,000) in a note sent to the press in December 2025. The OECD and European Commission's 2025 profile says the registry has integrated the regional, paediatric and island registries and published incidence and mortality, but that survival and stage at diagnosis remain unpublished.",
    programs: ["Single national electronic cancer registration platform", "Mandatory registration within nine months by every public, social and private provider", "Yearly update of stage, treatment and vital status", "Paediatric cancer registration", "Treatment-effectiveness monitoring with INFARMED"],
    cancers: ["breast-cancer", "prostate", "colorectal", "gastric", "childhood-cancers"], institutions: ["ipo-porto", "ipo-lisboa", "ipo-coimbra", "infarmed", "dgs-portugal"], people: ["maria-jose-bento"],
    links: [
      { label: "Lei n.º 53/2017, de 14 de julho: cria e regula o Registo Oncológico Nacional (Diário da República PDF)", url: LEI_53 },
      { label: "RON: Registo Oncológico Nacional de todos os tumores na população residente em Portugal, 2019 (PDF, IPO Porto)", url: RON_2019 },
      { label: "IPO Porto: registry publications", url: RORENO_PUBS },
      { label: "OECD/EC, Country Cancer Profile Portugal 2025, section 5.2 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),

  i({ id: "infarmed", name: "INFARMED, National Authority of Medicines and Health Products (Portugal)", aka: ["INFARMED", "INFARMED, I.P.", "Autoridade Nacional do Medicamento e Produtos de Saúde"],
    city: "Lisbon", country: "PT", lat: 38.722, lng: -9.139, institutionType: "government", website: "https://www.infarmed.pt",
    tldr: "Portugal's medicines regulator, which also runs the national health technology assessment system, SiNATS. A cancer medicine authorised for the whole EU still needs a SiNATS assessment before NHS hospitals may buy it or the state may reimburse it.",
    summary: "INFARMED, the Autoridade Nacional do Medicamento e Produtos de Saúde, I.P., is the public institute that regulates medicines, medical devices and clinical trials in Portugal. New cancer medicines are authorised once for the whole European Union through the European Medicines Agency's centralised procedure.\n\nDecree-Law 97/2015 of 1 June 2015 created the Sistema Nacional de Avaliação de Tecnologias de Saúde (SiNATS), managed by INFARMED, covering every public and private body that produces, sells or uses health technologies, with technical, therapeutic and economic assessment. Its preamble states that placing a technology on the market is a necessary but not sufficient condition for NHS funding, and it introduced contracts with the marketing authorisation holder as the instrument for reimbursement (comparticipação) and for the prior assessment (avaliação prévia) that every prescription medicine NHS bodies are to buy must pass, which weighs therapeutic innovation against economic advantage and sets a maximum purchase price. Law 53/2017 links the national cancer registry to INFARMED for monitoring the effectiveness of medicines in use. The OECD and European Commission's 2025 profile reports a mean of 748 days from EMA approval to a coverage decision for a sample of breast and lung cancer medicines, 45% longer than the EU average, and 266 days for cancer biosimilars against an EU average of 505; it also cites INFARMED's figures of 203 clinical trials approved in 2023, against 99 in 2012, 58 of them for antineoplastic and immunomodulatory drugs.",
    programs: ["Marketing authorisation and pharmacovigilance", "SiNATS health technology assessment (Decree-Law 97/2015)", "Prior assessment (avaliação prévia) of hospital medicines", "Reimbursement contracts with marketing authorisation holders", "Clinical trial authorisation"],
    institutions: ["sns-portugal", "ron-portugal", "ema"],
    links: [
      { label: "Decreto-Lei n.º 97/2015, de 1 de junho: cria o SiNATS (Diário da República PDF)", url: DL_97 },
      { label: "INFARMED", url: "https://www.infarmed.pt" },
      { label: "OECD/EC, Country Cancer Profile Portugal 2025, sections 5.1 and 5.2 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),

  i({ id: "dgs-portugal", name: "Directorate-General of Health of Portugal (Direção-Geral da Saúde)", aka: ["Direção-Geral da Saúde", "DGS", "Programa Nacional para as Doenças Oncológicas", "PNDO"],
    city: "Lisbon", country: "PT", lat: 38.722, lng: -9.139, institutionType: "government", website: "https://www.dgs.pt",
    tldr: "Portugal's public health directorate under the Ministry of Health. Its National Programme for Oncological Diseases wrote the national cancer strategy to 2030 and monitors the screening programmes, and its standards set the HPV vaccination schedule.",
    summary: "The Direção-Geral da Saúde is the Ministry of Health's directorate for public health. Despacho 13227/2023, published on 27 December 2023, records that the Estratégia Nacional de Luta contra o Cancro, horizonte 2030 was prepared by the DGS through its Programa Nacional para as Doenças Oncológicas (PNDO), with other national programmes, the NHS Executive Board and the Portuguese Environment Agency, after a public consultation from 30 June to 29 July 2022; the strategy is coordinated by an executive committee led by the PNDO's director. The strategy has four pillars, prevention, early detection, diagnosis and treatment, and survivors, and its targets include formalising an Oncology Referral Network by 2026, publishing the time taken to decide reimbursement of innovative cancer medicines by 2025, and doubling the number of cancer clinical trials under way by 2027.\n\nThe PNDO's monitoring of 2022 population screening, published in 2023, is the source the OECD's 2025 profile uses for screening coverage. The directorate's Norma 002/2026 of 8 April 2026, signed by the Director-General Rita Sá Machado, sets the national HPV vaccination schedule: two doses of the nine-valent vaccine at age 10 for both sexes, catch-up to age 18 for both sexes and to 27 for women, and a phased catch-up for men born from 2000.",
    programs: ["Programa Nacional para as Doenças Oncológicas (PNDO)", "Estratégia Nacional de Luta contra o Cancro, horizonte 2030", "Screening monitoring and guidelines", "National vaccination programme standards, including HPV"],
    cancers: ["cervical", "breast-cancer", "colorectal"], institutions: ["ron-portugal", "sns-portugal"], people: ["rita-sa-machado"],
    links: [
      { label: "Despacho n.º 13227/2023 and annex: Estratégia Nacional de Luta contra o Cancro, horizonte 2030 (PDF, ICCP portal copy)", url: ENLCC },
      { label: "DGS: Norma n.º 002/2026, HPV vaccination strategy", url: NORMA_HPV },
      { label: "Direção-Geral da Saúde", url: "https://www.dgs.pt" },
    ] }),

  i({ id: "sns-portugal", name: "Portuguese National Health Service (Serviço Nacional de Saúde)", aka: ["Serviço Nacional de Saúde", "SNS", "Portuguese NHS"],
    city: "Lisbon", country: "PT", lat: 38.722, lng: -9.139, institutionType: "government", website: "https://www.sns.gov.pt",
    tldr: "Portugal's tax-funded national health service. Since June 2022 it charges no user fees except for emergency visits without a referral, so cancer screening, diagnosis, treatment and cancer medicines are free to patients.",
    summary: "The Serviço Nacional de Saúde delivers most cancer care in Portugal, in hospitals within its 39 local health units and at the three Francisco Gentil oncology institutes in Lisbon, Porto and Coimbra. The OECD and European Commission's 2025 profile records that the institutes handled 27% of new cancer cases, 44% of cancer surgery and 57% of radiotherapy treatment plans in 2021; that Portugal eliminated user charges across all NHS services in June 2022, except emergency visits without a referral, so that vaccination, screening, consultations, diagnosis, treatment and cancer medicines in hospital and outpatient care are free; and that NHS hospitals spent just over EUR 625 million on oncology medicines in 2023, 32% of their pharmaceutical spending. It also records maximum guaranteed response times for cancer, set in 2017 (a first appointment within 30 days for the lowest priority level and immediately for the highest; scheduled cancer surgery within 60 days down to 72 hours), monitored by the Health Regulatory Authority; in 2023, 62% of public hospitals exceeded the limit for a first cancer appointment and the median wait was 25 days.\n\nThe three population screening programmes for breast, cervical and colorectal cancer are publicly financed through the NHS and run mainly by the regional health administrations, with family physicians inviting patients. Over 1.5 million people (15% of the population) lacked an assigned family doctor in April 2024, according to the Ministry of Health figures the OECD profile cites.",
    programs: ["Free cancer care with no user charges (since June 2022)", "Maximum guaranteed response times for cancer appointments and surgery", "Population screening for breast, cervical and colorectal cancer", "Three national oncology institutes"],
    cancers: ["breast-cancer", "cervical", "colorectal"], institutions: ["ipo-lisboa", "ipo-porto", "ipo-coimbra", "infarmed", "dgs-portugal", "ron-portugal"],
    links: [
      { label: "OECD/EC, Country Cancer Profile Portugal 2025, sections 4 and 5 (PDF, Internet Archive copy)", url: CCP_2025 },
      { label: "Despacho n.º 13227/2023: Estratégia Nacional de Luta contra o Cancro, horizonte 2030 (PDF, ICCP portal copy)", url: ENLCC },
    ] }),
];

/** Portugal: the records behind /countries/pt/ (wave 5) that the corpus did not hold. */
export const recordsPT: EntityInput[] = [...institutions];
