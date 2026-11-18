import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Romania: the public bodies and cancer institutes behind /countries/ro/ that the corpus did not hold. Every record
 * was written from the body's own site or from the Romanian legal text that sets it up, read raw in Romanian on
 * 4 November 2026: Law 293/2022 on preventing and combating cancer (the consolidated text published by the medicines
 * agency, including changes to September 2024), Government Decision 663/2023 founding the National Cancer Registry
 * (the copy published by the Bucharest Oncology Institute), the Ministry of Health order 861/2014 on health
 * technology assessment (consolidated to July 2020, as published by the agency), the National Health Insurance
 * House's description of the National Oncology Programme and its cost-volume page (both read through the Internet
 * Archive, because cnas.ro refused scripts), and the institutes' own history pages. Coordinates are the street
 * addresses each body publishes, geocoded through OpenStreetMap Nominatim.
 *
 * Inbound links: the payer links the regulator, the public health institute and both institutes; the registry links
 * the public health institute; the regulator links the payer and the EMA; so none is reachable only from the page.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const LAW_293 = "https://www.anm.ro/_/LEGI%20ORDONANTE/Lege%20293-2022.pdf";
const HG_663 = "https://iob.ro/wp-content/uploads/2023/09/hotararea-nr-663-2023-privind-infiintarea-registrului-national-de-cancer.pdf";
const OMS_861 = "https://www.anm.ro/_/EVALUARE%20TEHNOLOGII%20MEDICALE/ORDIN%20Nr.%20861%20din%2023%20iulie%202014.pdf";
const PNO = "https://web.archive.org/web/2026/https://cnas.ro/wp-content/uploads/2024/06/PROGRAMUL-NATIONAL-DE-ONCOLOGIE.pdf";
const CNAS_CV = "https://web.archive.org/web/20261011015554/https://cnas.ro/contracte-cost-volum-cost-volum-rezultat/";
const CCP_2025 = "https://web.archive.org/web/2026/https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-ro-2024-1682-en.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "rnc-romania", name: "National Cancer Registry of Romania (Registrul Național de Cancer)", aka: ["Registrul Național de Cancer", "RNC", "Romanian National Cancer Registry"],
    city: "Bucharest", country: "RO", lat: 44.436, lng: 26.069, institutionType: "government", website: "https://insp.gov.ro",
    tldr: "Romania's population-based national cancer registry, founded by a government decision of August 2023 and owned by the National Institute of Public Health. Every public and private provider must report each new cancer within 30 days, but the OECD's 2025 profile says it was not yet working.",
    summary: "Government Decision 663/2023, in force from 4 August 2023, founds the Registrul Național de Cancer as the information system for the named registration of new cancer cases on a population basis, to monitor cancer incidence nationally, evaluate the impact of the disease and support public health policy. It is owned and run by the National Institute of Public Health through its national centres for non-communicable disease surveillance and for public health statistics. Every public and private provider that diagnoses or treats cancer must report each new primary tumour, coded in ICD-O-3, within 30 days of diagnosis, of any change of diagnosis or of the end of initial treatment; county public health directorates report deaths. Reportable tumours are all in situ and invasive cancers except basal cell skin carcinomas, all brain and spinal tumours whatever their behaviour, and borderline tumours. Fines of 500 to 5,000 lei for providers who do not report apply only 30 days after the registry's software is running, which is paid for from Romania's recovery and resilience plan. The decision repealed the 2007 order that had set up regional cancer registries.\n\nBefore the decision, the annex to Law 293/2022 recorded only two working regional registries, in Cluj and Timiș. The OECD and European Commission's Country Cancer Profile of 2025 says Romania does not have a national cancer registry, that only two of eight regional registries collect data routinely, and that the national registry was expected to be fully working by the end of 2025, connected to the screening registries and the national childhood cancer registry.",
    programs: ["Named population-based registration of new cancers (ICD-O-3)", "30-day reporting duty for public and private providers", "Link to screening registries and the national childhood cancer registry"],
    cancers: ["cervical", "lung-cancer", "colorectal"], institutions: ["insp-romania"],
    links: [
      { label: "Hotărârea Guvernului nr. 663/2023 privind înființarea Registrului Național de Cancer (PDF)", url: HG_663 },
      { label: "Legea nr. 293/2022, annex, objective B.4 (PDF)", url: LAW_293 },
      { label: "OECD/EC, Country Cancer Profile Romania 2025, section 5.2 and box 3 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),

  i({ id: "insp-romania", name: "National Institute of Public Health of Romania (Institutul Național de Sănătate Publică)", aka: ["Institutul Național de Sănătate Publică", "INSP", "National Institute of Public Health"],
    city: "Bucharest", country: "RO", lat: 44.436, lng: 26.069, institutionType: "government", website: "https://insp.gov.ro",
    tldr: "Romania's public health institute, under the Ministry of Health. It owns the National Cancer Registry founded in 2023, plans the national screening programmes with the Ministry and runs the yearly cervical cancer awareness days.",
    summary: "The Institutul Național de Sănătate Publică is a body under the Ministry of Health. Government Decision 663/2023 makes it the owner and administrator of the National Cancer Registry, through its National Centre for the Surveillance of Non-communicable Diseases and its National Centre for Public Health Statistics, and makes it responsible for training the people who report cases in hospitals and county public health directorates.\n\nThe OECD and European Commission's 2025 profile records that national plans to scale the EU-funded screening pilots up into population programmes were put in place in 2024 by the Ministry of Health and the institute. Its press release for the cervical cancer elimination day of 17 November 2025 states that Romania has the highest cervical cancer incidence and mortality in the European Union, cites ECIS estimates of 32.6 new cases and 16.8 deaths per 100,000 women in 2022, and describes free HPV vaccination for girls and boys aged 11 to 26 and HPV testing with cytology triage every five years for women aged 25 to 64 in the health insurance package. Its own website answered scripts only with a browser check on 4 November 2026, so it was not read directly.",
    programs: ["Owner of the National Cancer Registry", "National centre for non-communicable disease surveillance", "National centre for public health statistics", "Screening programme planning with the Ministry of Health", "Cervical cancer and HPV awareness campaigns"],
    institutions: ["rnc-romania"],
    links: [
      { label: "Hotărârea Guvernului nr. 663/2023, articles 4, 8 and 10 (PDF)", url: HG_663 },
      { label: "INSP press release, cervical cancer elimination day, 17 November 2025 (PDF, DSP Gorj copy)", url: "https://dsp-gorj.centruldecalcul.ro/wp-content/uploads/2025/11/Comunicat-de-presa-1.pdf" },
      { label: "OECD/EC, Country Cancer Profile Romania 2025, box 2 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),

  i({ id: "cnas-romania", name: "National Health Insurance House of Romania (Casa Națională de Asigurări de Sănătate)", aka: ["Casa Națională de Asigurări de Sănătate", "CNAS", "National Health Insurance House"],
    city: "Bucharest", country: "RO", lat: 44.432, lng: 26.131, institutionType: "government", website: "https://cnas.ro",
    tldr: "Romania's social health insurer. It pays for cancer medicines, radiotherapy and tumour genetic testing through the National Oncology Programme, which the OECD says is free for all patients whether or not they are insured, and it negotiates cost-volume contracts for new medicines.",
    summary: "The Casa Națională de Asigurări de Sănătate manages the single national health insurance fund (FNUASS). Law 293/2022 makes it responsible, with the Ministry of Finance, for carrying out the measures of the national cancer plan, and the OECD and European Commission's 2025 profile puts the uninsured share of the population at around 14% in 2023, citing the House.\n\nIts National Oncology Programme has six subprogrammes: medicines for adults and children with cancer, breast reconstruction with implants, diagnosis and monitoring of blood cancers, radiotherapy, genetic diagnosis of solid tumours, and genetic testing. The programme text it publishes sets as yearly indicators 167,243 patients treated with cancer medicines in hospital and outpatient care, at an average 25,554 lei each, and 10 patients treated with CAR-T cell therapy at the Fundeni Clinical Institute in Bucharest or the Iași Regional Oncology Institute, at an average 1,489,579.47 lei each, and lists radiotherapy from orthovoltage to IMRT, brachytherapy and stereotactic treatment with a tariff for each. When the medicines agency decides that a new medicine may be included in the reimbursed list only on condition, the House negotiates a cost-volume or cost-volume-result contract with the maker under joint order 735/976/2018, within a sum it announces as remaining available for the year.",
    programs: ["National Oncology Programme (medicines, CAR-T, radiotherapy, blood cancer diagnosis, solid tumour genetic diagnosis, genetic testing, breast reconstruction)", "Cost-volume and cost-volume-result contracts", "National PET-CT programme", "Prevention packages including HPV testing"],
    cancers: ["cervical", "lung-cancer", "colorectal"], institutions: ["anmdmr", "insp-romania", "iob-bucharest", "iocn-cluj", "iasi-regional-oncology-institute"],
    links: [
      { label: "CNAS: Programul național de oncologie (PDF, Internet Archive copy)", url: PNO },
      { label: "CNAS: contracte cost-volum / cost-volum-rezultat (Internet Archive copy, 11 October 2026)", url: CNAS_CV },
      { label: "Legea nr. 293/2022, articles 2 and 5 (PDF)", url: LAW_293 },
      { label: "OECD/EC, Country Cancer Profile Romania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),

  i({ id: "anmdmr", name: "National Agency for Medicines and Medical Devices of Romania (ANMDMR)", aka: ["Agenția Națională a Medicamentului și a Dispozitivelor Medicale din România", "ANMDMR", "ANM Romania"],
    city: "Bucharest", country: "RO", lat: 44.467, lng: 26.073, institutionType: "government", website: "https://www.anm.ro",
    tldr: "Romania's medicines regulator and its health technology assessment body. New cancer medicines are authorised for the whole EU; the agency then scores each one against a points scale to decide whether it can enter the reimbursed list, unconditionally or on condition of a cost-volume contract.",
    summary: "The Agenția Națională a Medicamentului și a Dispozitivelor Medicale din România authorises medicines and clinical trials in Romania and runs pharmacovigilance; new cancer medicines are authorised once for the whole European Union through the European Medicines Agency's centralised procedure.\n\nUnder Ministry of Health order 861/2014 it is also the national authority that carries out health technology assessment and proposes to the Ministry the list of reimbursed medicines, which the Government approves by decision. For a new medicine the order awards points for the assessments of France's HAS, the United Kingdom's NICE or SMC and Germany's IQWiG or G-BA, for the number of EU member states and the United Kingdom that reimburse it (25 points for at least 14), and for cost against a comparator; a clinical trial of the medicine run in Romania, an EUnetHTA assessment or a notified real-world data study can earn 45 points in place of the points for the three foreign assessments. The agency then decides unconditional inclusion, conditional inclusion on the basis of a cost-volume or cost-volume-result contract, or non-inclusion. The OECD and European Commission's 2025 profile notes that in 2024 the agency coordinated Romania's first Strategic Plan on Clinical Studies.",
    programs: ["Health technology assessment for the reimbursed medicines list", "Clinical trial authorisation", "Pharmacovigilance", "Strategic Plan on Clinical Studies (2024)"],
    institutions: ["cnas-romania", "ema"],
    links: [
      { label: "ANMDMR: evaluare tehnologii medicale", url: "https://www.anm.ro/medicamente-de-uz-uman/evaluare-tehnologii-medicale/" },
      { label: "Ordinul MS nr. 861/2014, consolidated to July 2020, articles 6 to 8 and annexes 1, 2 and 5 (PDF)", url: OMS_861 },
      { label: "OECD/EC, Country Cancer Profile Romania 2025, section 5.1 (PDF, Internet Archive copy)", url: CCP_2025 },
    ] }),

  i({ id: "iob-bucharest", name: "Bucharest Oncology Institute Prof. Dr. Alexandru Trestioreanu", aka: ["Institutul Oncologic Prof. Dr. Alexandru Trestioreanu București", "Institutul Oncologic București", "IOB"],
    city: "Bucharest", country: "RO", lat: 44.463, lng: 26.156, institutionType: "cancer-center", website: "https://iob.ro",
    tldr: "One of Romania's three cancer institutes, founded by a Ministry of Health decision of 1949 and working on the Fundeni medical campus in Bucharest since 1989, with surgical, medical and paediatric oncology, radiotherapy, nuclear medicine and cancer research laboratories.",
    summary: "The institute's own history traces it to the first anticancer centre, opened at Colțea Hospital in Bucharest in 1926 under Prof. Amza Jianu and Prof. Ion Jovin and moved to Filantropia Hospital in 1932. The Bucharest Oncology Institute was founded by a Ministry of Health decision published in February 1949 and began work on 21 December 1949, led first by Prof. Octav Costăchel and then by Prof. Alexandru Trestioreanu, whose name it carries. It describes itself as the first hospital in which complex cancer treatment combining chemotherapy, hormone therapy, radiotherapy and surgery was used, and moved to the Fundeni medical campus in February 1989.\n\nIts departments include three surgical oncology wards and thoracic surgery, two medical oncology wards, paediatric oncology, three radiotherapy wards with an isotope therapy unit and a high-energy radiotherapy laboratory, nuclear medicine, pathology, and laboratories for cancer biochemistry and radiobiology, cancer biology and chemical carcinogenesis. The National Oncology Programme names it among the units doing breast reconstruction with implants. The OECD and European Commission's 2025 profile says Romania's three cancer institutes treat most of its cancer patients, and that staff and equipment are spread unevenly across the country, so patients have to travel long distances for monitoring and treatment.",
    programs: ["Surgical, medical and paediatric oncology", "Radiotherapy and isotope therapy", "Nuclear medicine and PET-CT", "Cancer research laboratories", "Breast reconstruction subprogramme"],
    institutions: ["cnas-romania"],
    links: [
      { label: "IOB: istoric", url: "https://iob.ro/istoric" },
      { label: "OECD/EC, Country Cancer Profile Romania 2025 (PDF, Internet Archive copy)", url: CCP_2025 },
      { label: "CNAS: Programul național de oncologie (PDF, Internet Archive copy)", url: PNO },
    ] }),

  i({ id: "iocn-cluj", name: "Prof. Dr. Ion Chiricuță Oncology Institute, Cluj-Napoca", aka: ["Institutul Oncologic Prof. Dr. Ion Chiricuță Cluj-Napoca", "Institutul Oncologic Cluj-Napoca", "IOCN"],
    city: "Cluj-Napoca", country: "RO", lat: 46.764, lng: 23.588, institutionType: "cancer-center", website: "https://iocn.ro",
    tldr: "One of Romania's three cancer institutes, founded in Cluj in 1929 by Prof. Iuliu Moldovan as an institute for the prevention and treatment of cancer, and a public body under the Ministry of Health.",
    summary: "The institute's own history says it was founded in 1929 by Prof. Iuliu Moldovan as the Institute for the Prophylaxis and Treatment of Cancer, and calls it one of the first such centres in Europe. Its first director, the gynaecologist Prof. Constantin Stanca (1929 to 1940), founded a school of gynaecological oncology, imported the first radium sources from Paris and started the journal Cancerul in 1933, which the institute calls the first oncology publication in Romania; the pathologist Prof. Rubin Popa led it from 1940 to 1957. Prof. Ion Chiricuță, a surgeon, took over in 1958, built the present institute at Strada Republicii 34-36, finished in 1965, and set out the principles it keeps: cooperation between surgeon, radiotherapist, medical oncologist and pathologist, research applied quickly to patients, and training of specialists.\n\nIt is a public body with legal personality under the Ministry of Health. The annex to Law 293/2022 lists Cluj as one of only two places with a working regional cancer registry. The National Oncology Programme names it among the units doing breast reconstruction with implants, and the OECD and European Commission's 2025 profile cites a 2020 survey by the National Institute of Public Health and the Institute of Oncology Cluj in which 75% of mothers asked favoured HPV vaccination for their daughters.",
    programs: ["Surgical, medical and radiation oncology", "Cancer research", "Specialist training", "Breast reconstruction subprogramme"],
    institutions: ["cnas-romania"],
    links: [
      { label: "IOCN: istoric", url: "https://iocn.ro/istoric/" },
      { label: "Legea nr. 293/2022, annex, objective B.4 (PDF)", url: LAW_293 },
      { label: "CNAS: Programul național de oncologie (PDF, Internet Archive copy)", url: PNO },
    ] }),
];

export const recordsRO: EntityInput[] = [...institutions];
