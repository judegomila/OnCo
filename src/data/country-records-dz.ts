import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Algeria: the public bodies, the cancer centre and the paper behind /countries/dz/ (wave 4) that the corpus did not
 * hold. Each was written from its own primary source, read raw on 4 November 2026, in French or Arabic where that is
 * the original: the Plan National Cancer 2015 to 2019 (PDF text, WHO repository copy), the Institut National de Santé
 * Publique's Registre des Tumeurs d'Alger 2022 and its children's registry bulletin for 2022 (both PDF text, read from
 * Internet Archive copies because insp.dz did not answer), the Journal officiel texts (Law 18-11 of 2 July 2018, executive
 * decrees 20-325 of 22 November 2020 and 21-53 of 31 January 2021, presidential decree 24-65 of 3 February 2024, and
 * decree 84-27 of 11 February 1984, the last a scanned page read by OCR), the ANPP's own pages in French and Arabic, the
 * CNAS pages on the Chifa card (Internet Archive copies), the CPMC's own site and Radio Algérienne reports of ministers'
 * statements. The DOI of the Sétif paper was resolved through Europe PMC and Crossref and its findings are taken from
 * the indexed abstract.
 *
 * Inbound links: the registry network, INSP, the commission, ANPP, CNAS, PCH and CPMC link to each other, and the
 * registry network links the Sétif paper through keyPapers. Coordinates are city or district points, not buildings.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const PNC = "https://extranet.who.int/ncdccs/Data/DZA_B5_plan_national_cancer.pdf";
const RTA_2022 = "https://web.archive.org/web/20260807070858/https://www.insp.dz/images/PDF/Les%20registres/TumeursAlger/Registre_tumeurs_Alger_2022.pdf";
const RNCEA_2022 = "https://web.archive.org/web/20250418150902/https://www.insp.dz/images/PDF/Les%20registres/TumeursAlger/Bulletins_RNCEA/Bulletin-RNCEA%202022.pdf";
const RADIO_2023 = "https://news.radioalgerie.dz/fr/node/73122";
const JO_2024_08 = "https://www.joradp.dz/FTP/JO-francais/2024/F2024008.pdf";
const JO_2020_69 = "https://www.joradp.dz/FTP/JO-francais/2020/F2020069.pdf";
const JO_1984_07 = "https://www.joradp.dz/FTP/JO-francais/1984/F1984007.pdf";
const COUNCIL_2026 = "https://news.radioalgerie.dz/fr/node/85317";
const SAIHI_2025 = "https://news.radioalgerie.dz/fr/node/63463";

const institutions: InstitutionInput[] = [
  i({ id: "algeria-cancer-registry-network", name: "Réseau national des registres du cancer (Algeria's national network of cancer registries)", aka: ["RNRC", "Réseau National des Registres du Cancer", "Algerian cancer registry network"],
    city: "Algiers (network of wilaya registries)", country: "DZ", lat: 36.753, lng: 3.042, institutionType: "consortium",
    tldr: "Algeria's network of population-based wilaya cancer registries, grouped into three regional networks, the Centre network coordinated from the national public health institute. It recorded 51,095 new cancers in 2022 and, by the institute's director's figure, 56,319 in 2023.",
    summary: "Among Algeria's registries are those of Sétif, whose population-based registry has published incidence from 1986, and Algiers, where the national public health institute (INSP) has run the Registre des Tumeurs d'Alger since 1 January 1993. The Plan National Cancer 2015 to 2019 counted 14 cancer registries covering close to 40% of the population, named Algiers and Sétif as voting members of the International Association of Cancer Registries and Annaba, Batna, Constantine, Mascara, Oran and Sidi Bel Abbès as associate members, and set out to implement ministerial order No. 22 of 18 February 2014 on the creation, operation and organisation of population cancer registries, with a registry in every wilaya and a national coordination. The coordinates on this record are an Algiers city point.\n\nThe INSP's Algiers registry report for 2022 dates the wilaya registries, grouped into three regional networks, to 2015, the year the first national indicators were produced. It gives the network's count for 2022 as 51,095 new cancers, 28,618 in women and 22,477 in men, a crude rate of 110.2 per 100,000; the Centre network alone recorded more than 17,000. On 28 October 2025, at the network's annual meeting on its 2023 data, the INSP's director general gave 56,319 new cases recorded in 2023, and the health minister announced work to link the registries electronically to hospitals and laboratories. A national registry of cancers in children and adolescents, run by the INSP, has collected data since 1 January 2018.\n\nThe reports read for this record give new cases, not deaths, and name no completeness figure for the country as a whole, so its totals are counts of registered cases rather than a measured national incidence.",
    programs: ["Wilaya population-based cancer registries (three regional networks)", "Registre des Tumeurs d'Alger (INSP, since 1993)", "Sétif population-based registry (since 1986)", "Registre National des Cancers de l'Enfant et de l'Adolescent (since 2018)"],
    institutions: ["insp-algeria", "cnplcc-algeria", "cpmc-algiers", "blida-anti-cancer-center", "iarc"],
    keyPapers: ["paper-hamdi-cherif-setif-incidence-trends-bmc-cancer-2014"],
    cancers: ["colorectal", "prostate"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "INSP: Registre des Tumeurs d'Alger, année 2022 (December 2024, PDF, Internet Archive copy)", url: RTA_2022 },
      { label: "Plan National Cancer 2015 to 2019, strategic axis 6 (Ministry of Health, PDF)", url: PNC },
      { label: "Radio Algérienne: annual meeting of the registry network on 2023 data (28 October 2025)", url: RADIO_2023 },
      { label: "Hamdi Cherif et al., cancer incidence trends in Sétif 1986 to 2010 (BMC Cancer 2014)", url: "https://doi.org/10.1186/1471-2407-14-637" },
    ] }),

  i({ id: "insp-algeria", name: "Institut National de Santé Publique (INSP), Algeria", aka: ["INSP", "Institut National de Santé Publique", "المعهد الوطني للصحة العمومية"],
    city: "Algiers", country: "DZ", lat: 36.76, lng: 3.035, institutionType: "government", website: "https://www.insp.dz",
    tldr: "Algeria's national public health institute. It runs the Algiers tumour registry and the national registry of childhood and adolescent cancers, hosts the coordination of the Centre regional registry network, and publishes their annual reports.",
    summary: "The Institut National de Santé Publique is the public health institute of Algeria's Ministry of Health. Its Registre des Tumeurs d'Alger, a population-based registry set up on 1 January 1993, covered 3.9 million people in 2022, 8.6% of the population, and its 22nd annual report (December 2024) records 8,285 new cancers in the wilaya of Algiers in 2022, excluding basal cell skin cancers, with age-standardised rates of 173.2 per 100,000 men and 195.9 per 100,000 women. Cases are collected actively from public and private pathology laboratories, cancer centres, the four university hospitals and death records, and the report states that the registry met the IARC quality criteria for 2022 apart from the share of men's cases known only from a death certificate.\n\nThe institute also runs the Registre National des Cancers de l'Enfant et de l'Adolescent, set up on 1 January 2018, whose bulletin for 2022 (March 2025) counts 837 new cancers in people under 20 treated in the central network's units, and hosts the coordination of the Centre regional registry network; the national network's annual meeting in October 2025 heard the director general, Abderrazak Bouamra, report 56,319 new cases recorded in 2023. The Plan National Cancer 2015 to 2019 records that an INSP national survey of 31,000 cancers registered in 2002 found two thirds diagnosed at invasive or metastatic stages and a mean wait of six months for radiotherapy, and that the INSP's cytodiagnosis reference laboratory trained screeners for the cervical screening programme begun in 1997. The insp.dz website did not answer on 4 November 2026; its reports were read from Internet Archive copies. The coordinates are an Algiers city point.",
    programs: ["Registre des Tumeurs d'Alger", "Registre National des Cancers de l'Enfant et de l'Adolescent", "Coordination of the Centre regional cancer registry network", "Cytodiagnosis reference laboratory"],
    institutions: ["algeria-cancer-registry-network", "cnplcc-algeria", "cpmc-algiers"],
    cancers: ["colorectal", "prostate", "cervical"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "INSP: Registre des Tumeurs d'Alger, année 2022 (PDF, Internet Archive copy)", url: RTA_2022 },
      { label: "INSP: Registre National des Cancers de l'Enfant et de l'Adolescent, année 2022 (PDF, Internet Archive copy)", url: RNCEA_2022 },
      { label: "Radio Algérienne: registry network annual meeting (28 October 2025)", url: RADIO_2023 },
      { label: "Plan National Cancer 2015 to 2019 (PDF)", url: PNC },
    ] }),

  i({ id: "cnplcc-algeria", name: "Commission nationale de prévention et de lutte contre le cancer (Algeria)", aka: ["CNPLCC", "National Commission for Cancer Prevention and Control", "اللجنة الوطنية للوقاية من السرطان ومكافحته"],
    city: "Algiers", country: "DZ", lat: 36.745, lng: 3.05, institutionType: "government",
    tldr: "A six-member permanent commission attached to the President of Algeria, created in February 2024 to propose the national cancer strategy, coordinate and evaluate the national plan, and watch for shortages of cancer medicines and equipment.",
    summary: "Presidential decree No. 24-65 of 3 February 2024, published in the Journal officiel No. 8 of 4 February 2024, created the Commission nationale de prévention et de lutte contre le cancer as a permanent body for coordinating, monitoring and evaluating cancer prevention and control, attached to the President of the Republic. Article 2 charges it with proposing the national strategy for cancer prevention, control, monitoring and evaluation, coordinating and evaluating the national plan for the care of people with cancer, strengthening prevention and early detection with the ministries concerned (defence, health, higher education, pharmaceutical industry, labour and social security) and the national health security agency, encouraging research, and proposing mechanisms to prevent shortages of the medicines and devices needed for cancer care. It has six members, including its president, appointed by presidential decree for four years renewable once; it meets every three months and its president reports to the President every six months.\n\nThe commission organised national meetings in May 2025 that looked ahead to a national cancer strategy to 2035, which the Council of Ministers examined on 3 May 2026, when the President asked for a study of an oncology hospital in every wilaya and a system to monitor the availability and distribution of cancer medicines. Algerian press reports and a 2025 IHE report commissioned by MSD name Professor Adda Bounedjar, head of medical oncology at the Blida cancer centre, as the commission's president. The coordinates are an Algiers city point.",
    programs: ["National strategy for cancer prevention and control to 2035", "Coordination and evaluation of the national cancer plan", "Shortage watch for cancer medicines and devices"],
    institutions: ["insp-algeria", "algeria-cancer-registry-network", "anpp-algeria", "cnas-algeria", "pch-algeria", "blida-anti-cancer-center"],
    people: ["adda-bounedjar"], related: ["global-oncology-access"],
    links: [
      { label: "Journal officiel No. 8 of 4 February 2024: presidential decree 24-65 (PDF)", url: JO_2024_08 },
      { label: "Radio Algérienne: full text of the Council of Ministers communiqué (3 May 2026)", url: COUNCIL_2026 },
      { label: "Radio Algérienne: national meetings on cancer prevention and control (4 May 2025)", url: "https://news.radioalgerie.dz/fr/node/64094" },
    ] }),

  i({ id: "anpp-algeria", name: "Agence Nationale des Produits Pharmaceutiques (ANPP), Algeria", aka: ["ANPP", "الوكالة الوطنية للمواد الصيدلانية", "National Agency for Pharmaceutical Products"],
    city: "Algiers (Dely Ibrahim)", country: "DZ", lat: 36.754, lng: 2.985, institutionType: "government", website: "https://anpp.dz",
    tldr: "Algeria's medicines regulator. It registers medicines after the opinion of its registration commission, issues the price certificate once an interministerial committee has set the price, and gives opinions on temporary authorisations to use unregistered medicines.",
    summary: "The Agence Nationale des Produits Pharmaceutiques was created by article 223 of Law No. 18-11 of 2 July 2018 on health, as a public body with legal personality and financial autonomy under the Ministry of Health; ordinance No. 20-02 of 30 August 2020 moved it under the Ministry of Pharmaceutical Industry. Executive decree No. 19-190 of 3 July 2019 sets its missions and organisation. Its directorate for the registration of pharmaceutical products registers medicines for human use and grants, renews, suspends or withdraws registration after the opinion of the registration commission; issues the price certificate after the interministerial economic committee for medicines has fixed the price; assesses benefit, risk, therapeutic value and medico-economic evaluation; gives opinions on temporary authorisations for unregistered medicines; and takes part in drawing up the list of medicines covered by social security. Its offices are at Cité Djiroud, Staouéli, Dely Ibrahim, Algiers; the coordinates are a Dely Ibrahim district point.\n\nExecutive decree No. 20-325 of 22 November 2020 requires a pre-submission request before any registration application, a dossier in the Common Technical Document format, and, for an imported product, registration and marketing in its country of origin on the date of the application. The agency must decide within 150 days of finding a dossier admissible, exceptionally extendable by up to 90 days, with the clock stopped while further information is requested; a registration is valid for five years. In 2025 the agency held a self-assessment workshop with the World Health Organization (15 June) towards maturity level 3, which the minister of pharmaceutical industry said would open international markets to medicines made in Algeria, and its director general presented on regulatory reliance at an African ministerial conference on local production of medicines in Algiers (27 to 29 November 2025).",
    programs: ["Registration of pharmaceutical products (executive decree 20-325)", "Temporary authorisations for unregistered medicines (executive decree 21-53)", "Quality control and expertise", "Medical device approval", "Work towards WHO maturity level 3"],
    institutions: ["cnplcc-algeria", "pch-algeria", "cnas-algeria", "who"],
    links: [
      { label: "ANPP: présentation de l'ANPP", url: "https://anpp.dz/fr/presentation-de-lanpp/" },
      { label: "ANPP: directorate for the registration of pharmaceutical products (Arabic)", url: "https://anpp.dz/a-propos-direction-enregistrement/" },
      { label: "Journal officiel No. 69 of 22 November 2020: executive decree 20-325 on registration (PDF)", url: JO_2020_69 },
      { label: "ANPP: WHO self-assessment workshop on the national regulatory system (15 June 2025, Arabic)", url: "https://anpp.dz/%d9%88%d8%b1%d8%b4%d8%a9-%d8%b9%d9%85%d9%84-%d9%84%d8%aa%d9%82%d9%8a%d9%8a%d9%85-%d8%a7%d9%84%d9%86%d8%b8%d8%a7%d9%85-%d8%a7%d9%84%d8%aa%d9%86%d8%b8%d9%8a%d9%85%d9%8a-%d8%a7%d9%84%d9%88%d8%b7%d9%86/" },
      { label: "ANPP: regulatory reliance presentation (November 2025, Arabic)", url: "https://anpp.dz/%d8%aa%d8%b9%d8%b2%d9%8a%d8%b2-%d9%85%d8%a8%d8%af%d8%a3-%d8%a7%d9%84%d8%b1%d9%8a%d9%84%d8%a7%d9%8a%d9%86%d8%b3-%d8%a7%d9%84%d8%aa%d9%86%d8%b8%d9%8a%d9%85%d9%8a/" },
    ] }),

  i({ id: "cnas-algeria", name: "Caisse Nationale des Assurances Sociales des Travailleurs Salariés (CNAS), Algeria", aka: ["CNAS", "Caisse Nationale des Assurances Sociales", "الصندوق الوطني للتأمينات الاجتماعية للعمال الأجراء"],
    city: "Algiers", country: "DZ", lat: 36.753, lng: 3.042, institutionType: "government", website: "https://cnas.dz",
    tldr: "Algeria's social insurance fund for salaried workers and their dependants. Since a 1984 decree, cancers are among the long-term illnesses it reimburses at 100% of regulated tariffs, and its Chifa smart card lets patients collect medicines from pharmacies without paying up front.",
    summary: "The Caisse Nationale des Assurances Sociales des Travailleurs Salariés is the social insurance fund for salaried workers in Algeria. Decree No. 84-27 of 11 February 1984, applying Law No. 83-11 of 2 July 1983 on social insurance, raises reimbursement to 100% of regulated tariffs for the long-term illnesses listed in its article 21, which include cancers (les maladies cancéreuses) and blood diseases (les hémopathies), and for hospital stays of more than 30 days. Law No. 18-11 of 2018 on health has social security funds contribute to the cost of care in public hospitals under contracts with the Ministry of Health. The coordinates are an Algiers city point.\n\nThe CNAS's Chifa card identifies the insured person and dependants and records their treatment and reimbursements. From 3 February 2013 the third-party payment system was extended nationwide, so a chronically ill patient can collect a specific treatment of up to three months from any contracted pharmacy without paying; patients covered at 80% pay the remaining 20% unless they belong to a contracted mutual fund, and anyone pays the difference when a medicine costs more than its reference tariff. At a Ministry of Health meeting on 22 April 2025 a CNAS director said social security was preparing the legal framework, on the President's instructions, to pay for radiotherapy for children with cancer in private clinics through third-party payment, covering treatment preparation, sessions, lodging, meals and transport. The cnas.dz pages did not answer on 4 November 2026 and were read from Internet Archive copies.",
    programs: ["Health insurance for salaried workers and dependants", "100% reimbursement for long-term illnesses including cancers (decree 84-27)", "Chifa card and third-party payment", "Radiotherapy in private clinics for children with cancer (announced April 2025)"],
    institutions: ["cnplcc-algeria", "pch-algeria", "anpp-algeria", "cpmc-algiers"],
    links: [
      { label: "Journal officiel No. 7 of 14 February 1984: decree 84-27, articles 4, 5 and 21 (scanned PDF)", url: JO_1984_07 },
      { label: "CNAS: Chifa card and third-party payment (Internet Archive copy, 2018)", url: "https://web.archive.org/web/20180715202036/http://www.cnas.dz/fr/carte-chifa-et-le-system-du-tiers-payant/" },
      { label: "CNAS: presentation of the Chifa card (Internet Archive copy, 2018)", url: "https://web.archive.org/web/20180715202122/http://www.cnas.dz/fr/presentation-de-la-carte-chifa/" },
      { label: "Radio Algérienne: Ministry of Health meeting on cancer care (22 April 2025)", url: SAIHI_2025 },
    ] }),

  i({ id: "pch-algeria", name: "Pharmacie Centrale des Hôpitaux (PCH), Algeria", aka: ["PCH", "Pharmacie Centrale des Hôpitaux", "الصيدلية المركزية للمستشفيات"],
    city: "Algiers", country: "DZ", lat: 36.753, lng: 3.042, institutionType: "government", website: "https://pch.dz",
    tldr: "Algeria's central purchasing body for public hospitals. It buys the cancer medicines used in hospital, with a state subsidy that the national cancer plan put at 50 billion dinars in 2015.",
    summary: "The Pharmacie Centrale des Hôpitaux is governed by executive decree No. 94-293 of 25 September 1994, amended in January 2012, according to the Plan National Cancer 2015 to 2019, so that it could act as a central purchasing body with its own credits, buying on behalf of hospitals against identified needs and under public service obligations for national programmes. A ministerial order of 6 February 2013 (Journal officiel No. 50 of 2013) lists the national programmes, the cancer plan among them, for which the PCH receives a subsidy to buy medicines; the plan records that this subsidy rose from 27 billion dinars in 2012 to 50 billion in 2015, that purchases of cancer medicines (oncology and haematology) averaged more than 30 billion dinars a year, and that oncology purchases in 2014 were 21 billion dinars, more than half of it for targeted therapy. The plan proposed a dedicated purchasing unit for cancer medicines within the PCH.\n\nA 2025 IHE report, commissioned and funded by MSD, states that hospital medicines are put on the PCH's commercial list by the Ministry of Health and that nearly half (47%) of the PCH budget in 2023 went on cancer medicines. The pch.dz site did not answer on 4 November 2026 and its archived pages were blocked, so this record rests on the national plan and the IHE report. The coordinates are an Algiers city point.",
    programs: ["Central purchasing of hospital medicines", "State subsidy for national programme medicines, including the cancer plan"],
    institutions: ["anpp-algeria", "cnas-algeria", "cnplcc-algeria", "cpmc-algiers"],
    links: [
      { label: "Plan National Cancer 2015 to 2019, strategic axis 8 (PDF)", url: PNC },
      { label: "IHE: Tableau de bord du cancer pour l'Algérie (September 2025, commissioned by MSD, PDF)", url: "https://ihe.se/app/uploads/2025/10/IHE-Cancer-Dashboard-Algeria_french_.pdf" },
    ] }),

  i({ id: "cpmc-algiers", name: "Centre Pierre et Marie Curie (CPMC), Algiers", aka: ["CPMC", "EHS Centre Pierre et Marie Curie", "Établissement hospitalier spécialisé en cancérologie Pierre et Marie Curie", "مركز بيار وماري كوري"],
    city: "Algiers", country: "DZ", lat: 36.76, lng: 3.058, institutionType: "cancer-center", website: "https://cpmc.dz",
    tldr: "A cancer centre opened in Algiers in 1959. A specialised public hospital with surgery, medical oncology, radiotherapy and haematology, it takes patients from every region and reports more than 450 beds.",
    summary: "The Centre Pierre et Marie Curie was inaugurated on 16 November 1959 on the former Curtillet stadium, now Place du 1er Mai in Sidi M'Hamed, Algiers, with a first wing of 320 beds and a cobalt therapy unit, according to its own history. After independence in 1962 it kept its name, became the Centre national de lutte contre le cancer and ran under joint French and Algerian management until 1968. It is one of the specialised hospital establishments (EHS) known as anti-cancer centres; in October 2014 the national cancer plan listed it with one linear accelerator, two cobalt units, three brachytherapy sources and 484 beds. The coordinates are an approximate point for Place du 1er Mai.\n\nThe centre's site lists 16 specialised services, including oncological visceral and digestive surgery with liver transplantation, breast surgery, gynaecological surgery, medical oncology, radiotherapy, haematology with bone marrow transplantation, and pathology and imaging laboratories, and states more than 1,500 staff, more than 450 beds and more than 50,000 patients a year. It receives patients from all regions of Algeria by referral or with their medical file. In May 2026 the secretary general of the national federation of cancer patients' associations said radiotherapy appointments could take up to a year at the CPMC, and described a breast screening pilot in Biskra with double reading of mammograms by teleradiology with the CPMC.",
    programs: ["Oncological surgery, including breast and gynaecological surgery", "Medical oncology", "Radiotherapy", "Haematology and bone marrow transplantation", "Supportive and palliative care unit", "Teleradiology double reading for the Biskra breast screening pilot"],
    institutions: ["insp-algeria", "algeria-cancer-registry-network", "cnas-algeria", "pch-algeria", "blida-anti-cancer-center"],
    cancers: ["breast-cancer", "colorectal"],
    links: [
      { label: "CPMC: official site (history and services)", url: "https://cpmc.dz/" },
      { label: "Plan National Cancer 2015 to 2019, table 04: functioning anti-cancer centres, October 2014 (PDF)", url: PNC },
      { label: "Radio Algérienne: Hamida Kettab on the national cancer strategy (5 May 2026)", url: "https://news.radioalgerie.dz/fr/node/85413" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-hamdi-cherif-setif-incidence-trends-bmc-cancer-2014", name: "Cancer incidence trends in Sétif, Algeria, 1986 to 2010",
    journal: "BMC Cancer", year: 2014, doi: "10.1186/1471-2407-14-637", pmid: "25175348", authors: "Hamdi Cherif M, Serraino D, Mahnane A, et al.", paperType: "observational",
    tldr: "Twenty-five years of data from the population-based cancer registry of Sétif, in north-eastern Algeria, show cancer incidence rising by 2.5% a year in men and 3.7% a year in women between 1996 and 2010.",
    summary: "Published as \"Time trends of cancer incidence in Setif, Algeria, 1986-2010: an observational study\". The authors used diagnoses from the population-based Cancer Registry of Sétif for 1986 to 2010, by site, morphology, age and sex, with population figures from the Algerian statistics office, and computed age-standardised rates (world population) for five five-year periods and annual percentage changes for 1996 to 2010.",
    findings: [
      "In 2006 to 2010 the age-standardised incidence of all cancers was 106.4 per 100,000 men and 110.3 per 100,000 women.",
      "The leading cancers were lung (18.0%), colorectum (9.6%), bladder (9.1%) and prostate (6.5%) in men, and breast (36.4%), colorectum (8.5%), cervix (6.0%) and thyroid (6.0%) in women.",
      "From 1996 to 2010 overall incidence rose significantly, by 2.5% a year in men and 3.7% in women; breast cancer rose by 8.2% a year and colorectal cancer by 5.4% in men and 4.5% in women, while cervical cancer fell by 4.2% a year.",
    ],
    whatItMeans: "Sétif is one of the two Algerian registries the national cancer plan names as voting members of the International Association of Cancer Registries, and its 25-year series measures how cancer in one Algerian wilaya shifted towards breast, colorectal and lung cancer.",
    caveats: ["One wilaya; rates elsewhere in Algeria differ.", "The series ends in 2010."],
    institutions: ["algeria-cancer-registry-network"], cancers: ["breast-cancer", "colorectal", "cervical", "prostate"],
    links: [doi("10.1186/1471-2407-14-637", "BMC Cancer 2014"), pubmed("25175348")] }),
];

/** Records behind /countries/dz/ (wave 4). */
export const recordsDZ: EntityInput[] = [...institutions, ...papers];
