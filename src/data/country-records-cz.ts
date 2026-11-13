import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Czechia: the public bodies behind /countries/cz/ (wave 5) that the corpus did not hold. Every record was written
 * from the body's own site or from the Czech statute that sets out its role, read raw in Czech on 11 November 2026:
 * ÚZIS's page on the Národní onkologický registr and its management page, the NOR incidence and mortality data
 * summaries on the national health information portal (NZIP, XLSX files processed 24 June 2026, data to 31 December
 * 2024) and their methodological notes, the consolidated text of Act 48/1997 Coll. on public health insurance and of
 * Act 592/1992 Coll. on health insurance premiums (zakonyprolidi.cz), the Medicines Act 378/2007 Coll., SÚKL's
 * mandatory disclosure page, VZP's "O nás" page, and the Ministry of Health's page on the National Oncology Plan 2030.
 * Coordinates are city points for Prague, not buildings.
 *
 * Inbound links: the ministry links ÚZIS, SÚKL and VZP; ÚZIS links the registry; the registry links ÚZIS; SÚKL and
 * VZP link each other. Existing records linked: iba-masaryk, mou-brno, motol-university-hospital, ema, and the person
 * ladislav-dusek (ÚZIS director). The new person tomas-boran is linked from SÚKL.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const UZIS_NOR = "https://www.uzis.cz/index.php?pg=registry-sber-dat--narodni-zdravotni-registry--narodni-onkologicky-registr";
const UZIS_LEAD = "https://www.uzis.cz/index.php?pg=o-nas--vedeni";
const NOR_INC = "https://www.nzip.cz/data/1773-novotvary-kraje-incidence-datovy-souhrn";
const NOR_MORT = "https://www.nzip.cz/data/1774-novotvary-kraje-mortalita-datovy-souhrn";
const SVOD = "https://www.svod.cz/";
const ACT_48 = "https://www.zakonyprolidi.cz/cs/1997-48";
const ACT_592 = "https://www.zakonyprolidi.cz/cs/1992-592";
const ACT_378 = "https://www.zakonyprolidi.cz/cs/2007-378";
const SUKL_PZI = "https://sukl.gov.cz/o-nas/povinne-zverejnovane-informace/";
const VZP_ABOUT = "https://www.vzp.cz/o-nas";
const NOPL = "https://mzd.gov.cz/narodni-onkologicky-plan-cr-2030/";
const NOPL_EN = "https://mzd.gov.cz/wp-content/uploads/2022/07/2207_MZCR_NOPL_CR_2030_EN_v03.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "nor-czech", name: "Czech National Oncology Registry (Národní onkologický registr)", aka: ["Národní onkologický registr", "NOR", "NOR ČR", "National Cancer Registry of the Czech Republic", "Czech National Cancer Registry"],
    city: "Prague", country: "CZ", lat: 50.076, lng: 14.418, institutionType: "government", website: UZIS_NOR,
    tldr: "Czechia's population-wide cancer registry, run by the state health statistics institute ÚZIS. Its data summary for 2024 counts 102,027 new malignant cancers, 69,015 of them other than the common non-melanoma skin cancers.",
    summary: "The Národní onkologický registr is, in ÚZIS's own description, a population-wide registry that continues the monitoring of tumours in the Czech population introduced in the 1950s, and that ÚZIS has run as a population registry of individual tumour records since 1976. Every provider who diagnoses or treats a new tumour, and every pathology or cytology laboratory that confirms one, must report it under Act 372/2011 Coll. on health services and Decree 373/2016 Coll.; reports cover malignant tumours (C00 to C97), in situ and uncertain-behaviour tumours, and cancers first found at autopsy or on the death examination form. The registry is a member of the International Association of Cancer Registries and works with the European Network of Cancer Registries.\n\nIts published data summaries are built from the registry's own reports, checked and completed against the national register of reimbursed health services, the national hospitalisation register and the death examination forms. The incidence summary processed on 24 June 2026 counts 102,027 malignant cancers diagnosed in 2024 (54,009 in men, 48,018 in women), of which 33,012 were non-melanoma skin cancers (C44); without them, 69,015, a world age-standardised rate of 299.9 per 100,000. The mortality summary, based on Czech Statistical Office death records corrected by the registry for selected diagnoses, counts 27,219 deaths from malignant cancers in 2024. The summaries also give the stage at diagnosis: 47.1% of lung cancers registered in 2024 were stage IV.",
    programs: ["Annual incidence and mortality data summaries (NZIP)", "Stage at diagnosis for each cancer", "SVOD cancer epidemiology portal, with Masaryk University", "Data for population screening evaluation"],
    cancers: ["lung-cancer", "colorectal", "prostate"], institutions: ["uzis-czech", "iba-masaryk"], people: ["ladislav-dusek"],
    links: [
      { label: "ÚZIS: Národní onkologický registr", url: UZIS_NOR },
      { label: "NZIP: incidence data summary, 1995 to 2024", url: NOR_INC },
      { label: "NZIP: mortality data summary", url: NOR_MORT },
      { label: "SVOD: Portál epidemiologie novotvarů v ČR", url: SVOD },
    ] }),

  i({ id: "uzis-czech", name: "Institute of Health Information and Statistics of the Czech Republic (ÚZIS ČR)", aka: ["Ústav zdravotnických informací a statistiky ČR", "ÚZIS", "UZIS", "IHIS CR"],
    city: "Prague", country: "CZ", lat: 50.076, lng: 14.418, institutionType: "government", website: "https://www.uzis.cz/",
    tldr: "Czechia's state health statistics institute. It runs the national cancer registry and the other national health registers, and its National Screening Centre manages the cancer screening programmes.",
    summary: "ÚZIS ČR, at Palackého náměstí 4 in Prague 2, administers the National Health Information System, including the Národní onkologický registr, the national register of reimbursed health services, the national hospitalisation register and the national register of preventive and screening examinations, which has modules for colorectal, breast and cervical screening and for the early detection of lung and prostate cancer. Its management page names prof. RNDr. Ladislav Dušek, Ph.D. as director and PhDr. Karel Hejduk as head of the National Screening Centre.\n\nThe National Oncology Plan 2030 describes the National Screening Centre, part of ÚZIS, as providing the coordinating management structure, methods and technical infrastructure for introducing, running and evaluating early detection programmes. ÚZIS publishes the programme sites mamo.cz, kolorektum.cz and cervix.cz, and with Masaryk University's Faculty of Medicine the SVOD portal of cancer epidemiology, whose data were updated to 2024 on 18 May 2026.",
    programs: ["Národní onkologický registr", "National Screening Centre (Národní screeningové centrum)", "National register of reimbursed health services", "National Health Information Portal (NZIP)"],
    institutions: ["nor-czech", "iba-masaryk", "ministry-of-health-czech"], people: ["ladislav-dusek"],
    links: [
      { label: "ÚZIS: vedení ústavu", url: UZIS_LEAD },
      { label: "ÚZIS: Národní onkologický registr", url: UZIS_NOR },
      { label: "National Oncology Plan 2030 (English, PDF)", url: NOPL_EN },
    ] }),

  i({ id: "sukl", name: "State Institute for Drug Control (Státní ústav pro kontrolu léčiv, SÚKL)", aka: ["Státní ústav pro kontrolu léčiv", "SÚKL", "SUKL", "State Institute for Drug Control"],
    city: "Prague", country: "CZ", lat: 50.076, lng: 14.418, institutionType: "government", website: "https://sukl.gov.cz/",
    tldr: "Czechia's medicines regulator. Besides overseeing medicines and authorising clinical trials, it decides the maximum price of a medicine and whether and on what terms public health insurance pays for it.",
    summary: "SÚKL describes itself as an administrative authority established by Act 79/1997 Coll., an organisational unit of the state under the Ministry of Health, with its seat at Šrobárova 49/48, Prague 10. Its predecessor, the Institute for the Examination of Medicines, was set up in 1918, and SÚKL was separated from the National Institute of Public Health by a Ministry of Health decree of 24 April 1952. Its disclosure page lists MUDr. Tomáš Boráň as director from 2 May 2024.\n\nSince 1 January 2008 Act 48/1997 Coll. has given SÚKL the setting of maximum prices and of the level and conditions of reimbursement of medicines. Under section 39b it weighs, among other things, therapeutic effect and safety, the severity of the disease, the applicant's cost-effectiveness and budget impact analyses, substitutability and the price of alternatives, professional guidelines, and any published EU joint clinical assessment report. Section 39d lets it grant a highly innovative medicine temporary reimbursement for 3 years, renewable for at most 2 more, without the cost-effectiveness condition. Under section 51 of the Medicines Act 378/2007 Coll. it assesses applications to authorise clinical trials under the EU clinical trials regulation and is the national contact point. Under section 49 of the same act it gives its opinion on specific treatment programmes that allow an unregistered medicine to be used, which the Ministry of Health approves.",
    programs: ["Maximum prices and reimbursement decisions (Act 48/1997, sections 39a to 39d)", "Temporary reimbursement of highly innovative medicines", "Clinical trial authorisation", "Opinions on specific treatment programmes (Act 378/2007, section 49)", "Pharmacovigilance and medicine shortages"],
    institutions: ["vzp-czech", "ministry-of-health-czech", "ema"], people: ["tomas-boran"],
    links: [
      { label: "SÚKL: povinně zveřejňované informace", url: SUKL_PZI },
      { label: "Zákon 48/1997 Sb. o veřejném zdravotním pojištění, sections 39b and 39d", url: ACT_48 },
      { label: "Zákon 378/2007 Sb. o léčivech, sections 49 and 51", url: ACT_378 },
    ] }),

  i({ id: "vzp-czech", name: "General Health Insurance Company of the Czech Republic (VZP ČR)", aka: ["Všeobecná zdravotní pojišťovna České republiky", "VZP", "VZP ČR"],
    city: "Prague", country: "CZ", lat: 50.076, lng: 14.418, institutionType: "government", website: "https://www.vzp.cz/",
    tldr: "The biggest of Czechia's seven public health insurers, with more than 6 million clients. It pays for cancer care under public health insurance and decides individual requests to pay for treatment that is not normally covered.",
    summary: "VZP states that it was established on 1 January 1992 by Act 551/1991 Coll., that further insurers arose later under Act 280/1992 Coll., and that with more than 6 million clients it remains the largest of seven. It plans to spend 327 billion koruna on its clients' care in 2026. Its page says most patients of the comprehensive cancer centres and other centres with special contracts, which allow them to treat with the newest and most expensive medicines, are VZP clients.\n\nThe public health insurance premium is 13.5% of the assessment base under Act 592/1992 Coll., and a client can change insurer once in 12 months. Under section 16 of Act 48/1997 Coll. an insurer pays, in exceptional cases and after assessing the request before the care is given (section 19), for care not otherwise covered when it is the only option for the patient's state of health. VZP describes a procedure for joint expert statements with the professional medical societies that serve as the basis both for these individual section 16 requests and for VZP's part in reimbursement proceedings.",
    programs: ["Public health insurance for more than 6 million clients", "Contracts with comprehensive cancer centres for centre-based medicines", "Section 16 exceptional reimbursement", "Prevention fund contributions"],
    institutions: ["sukl", "mou-brno", "motol-university-hospital"],
    links: [
      { label: "VZP: O nás", url: VZP_ABOUT },
      { label: "Zákon 48/1997 Sb., sections 11a, 16 and 19", url: ACT_48 },
      { label: "Zákon 592/1992 Sb. o pojistném, section 2", url: ACT_592 },
    ] }),

  i({ id: "ministry-of-health-czech", name: "Ministry of Health of the Czech Republic (Ministerstvo zdravotnictví)", aka: ["Ministerstvo zdravotnictví České republiky", "MZ ČR", "MZČR", "Czech Ministry of Health"],
    city: "Prague", country: "CZ", lat: 50.076, lng: 14.418, institutionType: "government", website: "https://mzd.gov.cz/",
    tldr: "Czechia's health ministry. It wrote the National Oncology Plan 2030, which the government approved in June 2022, and it oversees the medicines regulator and the health statistics institute.",
    summary: "The Ministry of Health, at Palackého náměstí 375/4 in Prague 2, states that the government approved its National Oncology Plan of the Czech Republic 2030 on 22 June 2022 as an umbrella document for the field, linked to Europe's Beating Cancer Plan. The plan sets four strategic objectives: prevention in all its phases, quality of life of patients and survivors, modern coordination of the whole cancer system, and care to a high standard in step with science and technology. Implementation runs through action plans, one for 2022 to 2024 and one for 2025 to 2027.\n\nThe ministry is the superior body of SÚKL, approves specific treatment programmes for unregistered medicines on SÚKL's opinion under section 49 of the Medicines Act, and gives binding opinions in some reimbursement proceedings for orphan medicines under Act 48/1997 Coll.",
    programs: ["National Oncology Plan of the Czech Republic 2030", "Action plans 2022 to 2024 and 2025 to 2027", "Approval of specific treatment programmes"],
    institutions: ["sukl", "uzis-czech", "vzp-czech"],
    links: [
      { label: "MZ ČR: Národní onkologický plán ČR 2030", url: NOPL },
      { label: "National Oncology Plan 2030 (English, PDF)", url: NOPL_EN },
    ] }),
];

/** Records behind /countries/cz/ (wave 5). */
export const recordsCZ: EntityInput[] = [...institutions];
