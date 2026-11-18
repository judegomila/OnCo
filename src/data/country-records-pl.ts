import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Poland: the public bodies behind /countries/pl/ that the corpus did not hold. Every record was written from the
 * body's own site or from the Polish statute that sets it up, read raw in Polish on 4 November 2026: the Polish
 * National Cancer Registry's bulletin "Nowotwory złośliwe w Polsce w 2023 roku" (PDF, pdftotext), the consolidated
 * texts of the reimbursement act (Dz.U. 2026 poz. 253), the healthcare benefits act (Dz.U. 2025 poz. 1461), the
 * National Oncology Network act (Dz.U. 2024 poz. 1208, amended by Dz.U. 2026 poz. 1007) and the clinical trials act
 * (Dz.U. 2023 poz. 605), all through the Sejm's ELI API, and the agencies' own pages. Coordinates are the street
 * addresses each body publishes, geocoded through OpenStreetMap Nominatim.
 *
 * Inbound links: the five records link each other (the registry from the payer, the payer and the regulator from
 * the assessment agency, the assessment agency from the payer, the research agency from the regulator), so none is
 * reachable only from the country page.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const KRN_2023 = "https://onkologia.org.pl/pliki/pl/publikacje/296411/0.nowotwory-krn-2025-book-20260123.pdf";
const REFUND_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2026/253/text.pdf";
const BENEFITS_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2025/1461/text.pdf";
const KSO_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2024/1208/text.pdf";
const TRIALS_ACT = "https://api.sejm.gov.pl/eli/acts/DU/2023/605/text.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "krn-poland", name: "Polish National Cancer Registry (Krajowy Rejestr Nowotworów)", aka: ["Krajowy Rejestr Nowotworów", "KRN", "Polish National Cancer Registry", "National Cancer Registry of Poland"],
    city: "Warsaw", country: "PL", lat: 52.215, lng: 20.984, institutionType: "government", website: "https://onkologia.org.pl",
    tldr: "Poland's national cancer registry, run by the National Institute of Oncology in Warsaw with a registration office in each of the sixteen regions. Its latest bulletin counts 192,922 new cancers registered in 2023.",
    summary: "The Krajowy Rejestr Nowotworów is, in the words of its own bulletin, a separate organisational unit of the Maria Skłodowska-Curie National Institute of Oncology, State Research Institute, in Warsaw. Its legal basis is the 1995 public statistics act, the 2011 act on the health information system and the Minister of Health's regulation of 14 June 2018 on the registry, which also fixes the seat of a registration office in each of the sixteen voivodeships. Cases are collected in a central database, and almost 180 hospitals have connected their own systems to the electronic e-KRN system. Deaths come from death certificates collected by Statistics Poland (GUS).\n\nIts bulletin on 2023, published in Warsaw in 2025 with data as they stood on 10 October 2025, records 192,922 new cases registered (96,925 in men and 95,997 in women, ICD-10 C00 to D09, so including other skin cancers and in situ tumours) and 99,676 cancer death certificates (53,322 men, 46,354 women). It states that the incidence figures are still burdened with some under-registration and should be read as registered incidence; in 2023, 96.2% of cases in men and 96.4% in women were confirmed under the microscope. The National Institute of Oncology has published national bulletins since 1979; the registry's website holds archived bulletins back to 1990 and offers its own tabulations of data for 1999 to 2023.",
    programs: ["Annual bulletin: Nowotwory złośliwe w Polsce", "Sixteen regional registration offices", "e-KRN electronic reporting from hospitals", "Polish Onco-Haematology Registry (PROH)", "Online tabulations, 1999 to 2023"],
    cancers: ["lung-cancer", "colorectal", "prostate"], institutions: ["nio-warsaw", "nio-gliwice", "greater-poland-cancer-centre"],
    links: [
      { label: "KRN: Nowotwory złośliwe w Polsce w 2023 roku (PDF)", url: KRN_2023 },
      { label: "KRN: publikacje", url: "https://onkologia.org.pl/pl/publikacje/1" },
    ] }),

  i({ id: "nfz", name: "National Health Fund of Poland (Narodowy Fundusz Zdrowia)", aka: ["Narodowy Fundusz Zdrowia", "NFZ", "National Health Fund"],
    city: "Warsaw", country: "PL", lat: 52.208, lng: 21.006, institutionType: "government", website: "https://www.nfz.gov.pl",
    tldr: "Poland's single public health insurer, funded by a health contribution of 9% of the contribution base. It pays for cancer diagnosis and treatment, decides which hospitals belong to the National Oncology Network, and runs the national screening programmes.",
    summary: "The Narodowy Fundusz Zdrowia is created by article 96 of the 2004 act on publicly funded health care benefits as a state body with legal personality, and article 79 of the same act sets the health insurance contribution at 9% of the contribution base. It contracts the hospitals and clinics that treat insured patients.\n\nFor cancer the law gives it several specific roles. Under the 2023 National Oncology Network act its President qualifies hospitals to the network's levels and publishes the list, and since 1 April 2025 only hospitals in the network may provide cancer care under an NFZ contract. Under the benefits act the amount the NFZ pays for diagnosis and treatment given on a cancer diagnosis and treatment card (DiLO) is adjusted to need and to what was done. It also pays for the national screening programmes: its own figures for 1 November 2026 put coverage of the eligible population at 32.93% for breast, 16.66% for cervical and 17.62% for bowel cancer screening.",
    programs: ["National Oncology Network qualification", "Cancer diagnosis and treatment card (DiLO)", "Drug programmes and chemotherapy catalogue", "Screening programmes: mammography, cervical, colonoscopy, low-dose lung CT"],
    institutions: ["krn-poland", "aotmit", "nio-warsaw"],
    links: [
      { label: "Ustawa o świadczeniach opieki zdrowotnej, consolidated text Dz.U. 2025 poz. 1461 (PDF)", url: BENEFITS_ACT },
      { label: "Ustawa o Krajowej Sieci Onkologicznej, consolidated text Dz.U. 2024 poz. 1208 (PDF)", url: KSO_ACT },
      { label: "NFZ: dane o realizacji programów profilaktycznych", url: "https://www.nfz.gov.pl/dla-pacjenta/programy-profilaktyczne/dane-o-realizacji-programow/" },
    ] }),

  i({ id: "aotmit", name: "Agency for Health Technology Assessment and Tariff System (AOTMiT)", aka: ["Agencja Oceny Technologii Medycznych i Taryfikacji", "AOTMiT", "AOTM"],
    city: "Warsaw", country: "PL", lat: 52.233, lng: 21.014, institutionType: "government", website: "https://www.aotm.gov.pl",
    tldr: "Poland's health technology assessment agency. Its President recommends to the Minister of Health whether a new medicine should be reimbursed, within 60 days of receiving the file, and it also sets the tariffs hospitals are paid.",
    summary: "The Agencja Oceny Technologii Medycznych i Taryfikacji was created on 16 September 2005 by order of the Minister of Health as the Agency for Health Technology Assessment, took on the setting of tariffs for health services from 1 January 2015 and added the words 'i Taryfikacji' to its name. It describes itself as an advisory body supervised by the minister that supports decisions on funding medicines and other services.\n\nUnder article 35 of the reimbursement act, when a company applies for reimbursement of a medicine with no reimbursed equivalent, the minister sends the file to the agency, which writes a verification analysis, obtains the position of its Transparency Council (Rada Przejrzystości) and issues the President's recommendation for or against reimbursement, within 60 days of receiving the documents. The analyses are published in the agency's public information bulletin. The act now also requires the agency to take account of joint clinical assessments published under the EU health technology assessment regulation. From November 2020 it compiles the lists of highly innovative medicines and medicines of high clinical value that can be paid for from the Medical Fund. By its own count it produced 2,597 assessments of medicines from 2007 to 2025.",
    programs: ["Reimbursement recommendations", "Transparency Council (Rada Przejrzystości)", "Off-label reimbursement assessments", "Lists of highly innovative medicines (TLI)", "Tariff setting"],
    institutions: ["nfz", "urpl"],
    links: [
      { label: "AOTMiT: o Agencji", url: "https://www.aotm.gov.pl/o-nas/o-agencji/" },
      { label: "AOTMiT: statystyki", url: "https://www.aotm.gov.pl/o-nas/statystyki-aotmit/" },
      { label: "Ustawa o refundacji leków, consolidated text Dz.U. 2026 poz. 253, article 35 (PDF)", url: REFUND_ACT },
    ] }),

  i({ id: "urpl", name: "Office for Registration of Medicinal Products, Medical Devices and Biocidal Products (URPL)", aka: ["Urząd Rejestracji Produktów Leczniczych, Wyrobów Medycznych i Produktów Biobójczych", "URPL", "URPLWMiPB"],
    city: "Warsaw", country: "PL", lat: 52.21, lng: 20.953, institutionType: "government", website: "https://www.gov.pl/web/urpl",
    tldr: "Poland's medicines regulator. New cancer medicines are almost all authorised once for the whole European Union, so its main national roles for cancer patients are authorising clinical trials and watching medicines' safety.",
    summary: "The Urząd Rejestracji Produktów Leczniczych, Wyrobów Medycznych i Produktów Biobójczych registers medicines, medical devices and biocides in Poland and collects reports of side effects. New active substances for cancer must go through the European Union's centralised procedure, in which the European Commission authorises a medicine for every member state on the opinion of the European Medicines Agency, so they are valid in Poland without a separate national approval. When this record was written the office's site carried reports of the EU coordination group (CMDh) meetings it attends; the site could not be re-read on 17 November 2026.\n\nFor clinical trials, the 2023 act on clinical trials of medicinal products, which applies the EU clinical trials regulation, makes the President of the office the authority that decides on trial applications in Poland, with the ethical assessment done by the National Bioethics Committee at the Medical Research Agency or by a local committee entered on the official list. The same act set up a compensation fund for trial participants, administered by the Patient Ombudsman. The office did not publish, on the pages read for this record, a count of trials authorised in recent years or national approval times.",
    programs: ["Marketing authorisation (national, decentralised and mutual recognition procedures)", "Clinical trial authorisation under the EU clinical trials regulation", "Pharmacovigilance and side-effect reporting"],
    institutions: ["ema", "abm-poland"],
    links: [
      { label: "URPL", url: "https://www.gov.pl/web/urpl" },
      { label: "EMA: authorisation of medicines, scope of the centralised procedure", url: "https://www.ema.europa.eu/en/about-us/what-we-do/authorisation-medicines" },
      { label: "Ustawa o badaniach klinicznych produktów leczniczych, Dz.U. 2023 poz. 605 (PDF)", url: TRIALS_ACT },
    ] }),

  i({ id: "abm-poland", name: "Medical Research Agency of Poland (Agencja Badań Medycznych)", aka: ["Agencja Badań Medycznych", "ABM", "Medical Research Agency"],
    city: "Warsaw", country: "PL", lat: 52.229, lng: 21.0, institutionType: "government", website: "https://abm.gov.pl",
    tldr: "Poland's state agency for medical research, set up by a 2019 act, which funds academic clinical trials that companies would not run, with cancer one of its stated priorities. The national bioethics committee for trials sits within it.",
    summary: "The Agencja Badań Medycznych was established by the act of 21 February 2019 on the Medical Research Agency. It describes itself as the state agency responsible for developing research in the medical and health sciences, and says it runs one of the first public grant programmes in Poland for non-commercial clinical trials. It gives oncology, cardiology and rare diseases as the main areas, because companies often leave them aside, and states on its own page that non-commercial trials are about 2% of all registered trials in Poland, against about 40% in Western Europe, and that it aims to raise the share to 20 to 30%.\n\nUnder the 2023 clinical trials act the National Bioethics Committee (Naczelna Komisja Bioetyczna), which can give the ethical assessment of a trial application, operates at the agency. The agency also funds population and epidemiological studies.",
    programs: ["Grants for non-commercial clinical trials", "National Bioethics Committee for clinical trials", "Population and epidemiological research"],
    institutions: ["urpl"],
    links: [
      { label: "ABM: o Agencji", url: "https://abm.gov.pl/pl/o-nas/o-agencji/34,O-Agencji.html" },
      { label: "Ustawa o Agencji Badań Medycznych, consolidated text Dz.U. 2025 poz. 259 (PDF)", url: "https://api.sejm.gov.pl/eli/acts/DU/2025/259/text.pdf" },
      { label: "Ustawa o badaniach klinicznych produktów leczniczych, article 15 (PDF)", url: TRIALS_ACT },
    ] }),
];

export const recordsPL: EntityInput[] = [...institutions];
