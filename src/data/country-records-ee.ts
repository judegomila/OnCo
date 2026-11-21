import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Estonia: the public bodies behind /countries/ee/ (wave 13) that the corpus did not hold. Each was written from its own
 * primary source, read raw on 16 November 2026: Tervise Arengu Instituut's pages on the cancer registry, the cancer
 * screening registry and cancer control, with its releases of 24 September 2026, 6 July 2026 and 25 March 2026 and its
 * statistics database (tables PK10 and SD21 through the PxWeb API); Tervisekassa's English pages on health insurance, its
 * organisation, medicines and the list of health care services; the State Agency of Medicines' English "about" page; the
 * Estonian Biobank's page at the University of Tartu's Institute of Genomics; and the Cancer Treatment Fund's own site.
 *
 * North Estonia Medical Centre, Tartu University Hospital, East Tallinn Central Hospital and the Estonian Cancer Society
 * already exist and are reused, not duplicated. Coordinates are approximate city points for Tallinn and Tartu, taken
 * from the city named in each body's own address, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const TAI_REG = "https://www.tai.ee/et/statistika-ja-registrid/vahiregister";
const TAI_CONTROL = "https://www.tai.ee/et/tervis-ja-heaolu/vahitorje";
const TAI_SCREEN_REG = "https://www.tai.ee/et/terviseandmed/registrid/vahi-soeluuringute-register";
const TAI_2024 = "https://www.tai.ee/et/uudised/vahijuhtude-arv-pusinud-eelmise-aastaga-samal-tasemel";
const TAI_STAGE = "https://www.tai.ee/et/uudised/tai-varske-raport-mitme-vahi-puhul-leitakse-kasvajad-uha-enam-varases-staadiumis";
const TAI_SCREEN_2025 = "https://www.tai.ee/et/uudised/elupaastvatel-vahi-soeluuringutel-osales-eelmisel-aastal-ule-183-000-inimese";
const PX = "https://statistika.tai.ee/pxweb/et/Andmebaas/Andmebaas__02Haigestumus__04PahaloomulisedKasvajad/?tablelist=true";
const TK_ABOUT = "https://www.tervisekassa.ee/en/organisation/about-us";
const TK_INS = "https://www.tervisekassa.ee/en/people/health-insurance";
const TK_MED = "https://www.tervisekassa.ee/en/partner/medicinal-products";
const TK_LIST = "https://www.tervisekassa.ee/en/partner/list-health-care-services";
const SAM = "https://www.ravimiamet.ee/en/agency-and-contact/about-state-agency-medicines";
const BIOBANK = "https://genomics.ut.ee/en/content/estonian-biobank";
const FUND = "https://kingitudelu.ee/";

const institutions: InstitutionInput[] = [
  i({ id: "tervise-arengu-instituut", name: "Tervise Arengu Instituut (National Institute for Health Development)", aka: ["TAI", "NIHD", "National Institute for Health Development"],
    city: "Tallinn", country: "EE", lat: 59.44, lng: 24.75, institutionType: "research-institute", website: "https://www.tai.ee",
    tldr: "Estonia's state public health research institute. It keeps the national cancer registry, the cancer screening registry and the causes of death register, and led the drafting of the Cancer Control Plan for 2021 to 2030.",
    summary: "Tervise Arengu Instituut (TAI) describes itself as a state research and development institution working on public health research, disease prevention programmes and health promotion. Its cancer control page says it keeps the cancer registry, on which national incidence and survival statistics rest, and the cancer screening registry, through which it helps run breast, cervical and bowel screening with Tervisekassa; that it publishes interpreted results on incidence, stage and survival as annual reports; that it led the drafting of the Cancer Control Plan 2021 to 2030 and contributes to carrying it out and evaluating it; and that it takes part in feasibility and pilot studies of lung cancer screening and is introducing HPV home testing. Its statistics database publishes registry counts from 1968 and deaths by cause from the Estonian Causes of Death Register.",
    programs: ["Estonian Cancer Registry", "Cancer screening registry", "Causes of Death Register", "Health statistics and health research database", "Annual cancer reports"],
    institutions: ["estonian-cancer-registry", "estonian-cancer-screening-registry", "tervisekassa"],
    cancers: ["breast-cancer", "cervical", "colorectal", "lung-cancer", "prostate"],
    links: [{ label: "TAI: Vähitõrje (cancer control)", url: TAI_CONTROL }, { label: "TAI: Vähiregister", url: TAI_REG }, { label: "TAI statistics database: malignant neoplasms", url: PX }] }),

  i({ id: "estonian-cancer-registry", name: "Eesti vähiregister (Estonian Cancer Registry)", aka: ["Estonian Cancer Registry", "Vähiregister", "Eesti Vähiregister"],
    city: "Tallinn", country: "EE", lat: 59.44, lng: 24.75, institutionType: "research-institute", website: TAI_REG,
    tldr: "Estonia's national, population-based cancer registry, kept at Tervise Arengu Instituut, with every case diagnosed since 1968. It recorded 9,926 new cancers in 2024.",
    summary: "The registry's page says its main task is the fullest and most reliable registration of cancer cases possible, and that it holds data on all cancers diagnosed in Estonia since 1968, in situ tumours since 1994 and benign and uncertain tumours of the brain and central nervous system since 1998. Reporting is compulsory for every doctor in Estonia who diagnoses or treats cancer, and forensic doctors report too. The registry adds data from the population register and the causes of death register and compares its database regularly with those of North Estonia Medical Centre, Tartu University Hospital and Tallinn Children's Hospital. It has belonged to the International Association of Cancer Registries since 1989 and the European Network of Cancer Registries since 1994, and publishes final incidence statistics about two years after the year of diagnosis. On 24 September 2026 it published 9,926 new cancers for 2024, 4,956 in men and 4,970 in women. Its 2026 report gives relative survival of 79, 66 and 62 per cent at one, five and ten years for people diagnosed in 2019 to 2023.",
    programs: ["Cancer registration for Estonia (since 1968)", "Annual report on incidence, stage and survival", "Member of IACR (since 1989) and ENCR (since 1994)"],
    institutions: ["tervise-arengu-instituut", "north-estonia-medical-centre", "tartu-university-hospital", "iarc", "estonian-biobank"],
    cancers: ["prostate", "breast-cancer", "lung-cancer", "colorectal", "cervical"],
    links: [{ label: "TAI: Vähiregister", url: TAI_REG }, { label: "TAI: 2024 incidence release (24 September 2026)", url: TAI_2024 }, { label: "TAI: cancer report release (6 July 2026)", url: TAI_STAGE }, { label: "TAI statistics database: malignant neoplasms", url: PX }], people: ["margit-magi"] }),

  i({ id: "estonian-cancer-screening-registry", name: "Vähi sõeluuringute register (Estonian Cancer Screening Registry)", aka: ["Cancer Screening Registry", "Estonian Cancer Screening Registry", "Vähi sõeluuringute register"],
    city: "Tallinn", country: "EE", lat: 59.44, lng: 24.75, institutionType: "research-institute", website: TAI_SCREEN_REG,
    tldr: "The registry at Tervise Arengu Instituut that draws up Estonia's invitation lists for breast, cervical and bowel screening and records the results. In 2025 it counted more than 183,000 screening attendances.",
    summary: "The registry's page says it collects and analyses personal data on everyone in the target groups for breast, cervical and bowel screening, draws up the birth-year lists of people to invite, and creates the invitation that doubles as a referral in the health portal. It gathers results by electronic bulk queries from the health information system and queries the population register, the causes of death register, the cancer registry and Tervisekassa's insurance database; about 270,000 people were in the target groups in 2024. People diagnosed with the cancer in question are left off the lists, for five years in breast and cervical screening and for life in bowel screening. TAI's release of 25 March 2026 reports participation in 2025 of 65 per cent in breast and cervical screening and 62 per cent in bowel screening, with 19 per cent of cervical screening participants choosing the home HPV test.",
    programs: ["Invitation lists for breast, cervical and bowel screening", "Annual screening participation statistics"],
    institutions: ["tervise-arengu-instituut", "tervisekassa", "estonian-cancer-registry"],
    cancers: ["breast-cancer", "cervical", "colorectal"],
    links: [{ label: "TAI: Vähi sõeluuringute register", url: TAI_SCREEN_REG }, { label: "TAI: screening in 2025 (25 March 2026)", url: TAI_SCREEN_2025 }], people: ["dolores-eamets"] }),

  i({ id: "tervisekassa", name: "Tervisekassa (Estonian Health Insurance Fund)", aka: ["Estonian Health Insurance Fund", "EHIF", "Health Insurance Fund"],
    city: "Tallinn", country: "EE", lat: 59.44, lng: 24.75, institutionType: "government", website: "https://www.tervisekassa.ee",
    tldr: "Estonia's national health insurance fund. It pays hospitals and doctors for the care of insured people, including cancer treatment and screening, and decides with the ministry which medicines are reimbursed.",
    summary: "Tervisekassa says its main task is to organise national health insurance so that insured people have access to health services, medicines, medical devices and cash benefits, on a principle of solidarity in which contributions depend on income and not on health risk. Permanent residents and people with a residence permit are insured when social tax is paid for them, when they are treated as equal to insured persons, or under a voluntary contract. Its list of health care services holds every service, procedure and hospital medicine in the insurance package with prices and conditions, and is updated annually. It processes manufacturers' applications to add medicines to the list of medicines sold at a discount, which is amended on 1 January, 1 April, 1 July and 1 October, with an advisory Committee for Medicinal Products of eight members taking part where a change matters substantially. Its supreme body is a supervisory board representing employers, insured persons and the state.",
    programs: ["National health insurance", "List of health care services", "List of reimbursed medicines", "Funding of cancer screening"],
    institutions: ["ravimiamet-estonia", "tervise-arengu-instituut", "vahiravifond-elu"],
    links: [{ label: "Tervisekassa: about us", url: TK_ABOUT }, { label: "Tervisekassa: health insurance", url: TK_INS }, { label: "Tervisekassa: medicinal products", url: TK_MED }, { label: "Tervisekassa: list of health care services", url: TK_LIST }] }),

  i({ id: "ravimiamet-estonia", name: "Ravimiamet (State Agency of Medicines, Estonia)", aka: ["State Agency of Medicines", "SAM", "Ravimiamet", "Estonian State Agency of Medicines"],
    city: "Tartu", country: "EE", lat: 58.38, lng: 26.72, institutionType: "government", website: "https://www.ravimiamet.ee",
    tldr: "Estonia's medicines regulator, an agency under the Ministry of Social Affairs with its main office in Tartu. It assesses medicines and clinical trial applications and represents Estonia on the European Medicines Agency's committees.",
    summary: "The agency's own page says the Estonian Centre on Medicines was set up on 11 April 1991 and that the State Agency of Medicines was created in 1993. It is an agency under the Ministry of Social Affairs with nine departments and over 130 employees, a main office in Tartu and another in Tallinn. It evaluates the efficacy, quality and safety of medicines at authorisation and while they are on the market, collects and analyses data on medicine use and adverse reactions, assesses clinical trial applications and supervises trials, oversees those who handle medicines, and represents Estonia in the committees of the European Medicines Agency and the European Pharmacopoeia. Its biological preparations department handles advanced therapy medicinal products, and it has a seat on the Committee for Medicinal Products that advises Tervisekassa on reimbursement.",
    programs: ["Marketing authorisations", "Clinical trial authorisation and supervision", "Pharmacovigilance", "Compassionate use programme"],
    institutions: ["ema", "tervisekassa"],
    links: [{ label: "Ravimiamet: about the State Agency of Medicines", url: SAM }, { label: "Tervisekassa: medicinal products (Committee for Medicinal Products)", url: TK_MED }], people: ["katrin-kiisk"] }),

  i({ id: "estonian-biobank", name: "Estonian Biobank (University of Tartu)", aka: ["EstBB", "Estonian Biobank"],
    city: "Tartu", country: "EE", lat: 58.38, lng: 26.72, institutionType: "research-institute", website: BIOBANK,
    tldr: "A population biobank at the University of Tartu with genetic data from more than 210,000 people, about a fifth of Estonia's adults. Its records are regularly linked with the national cancer registry.",
    summary: "The biobank's page says it has a cohort of more than 210,000 people, all genotyped with genome-wide arrays, reflecting the age, sex and geographical spread of the adult Estonian population, and that about 20 per cent of Estonia's adults have joined. Participants signed a broad consent under what the page calls the Human Genetic Research Act, which allows them to be contacted again. The database is regularly linked with national registries such as the Cancer Registry and the Causes of Death Registry, with hospital databases and with the national health insurance fund's bills. The page reports more than 830 research papers from the Estonian Genome Centre based on the biobank, and a pilot of personalised medicine in breast cancer and heart attack in which more than 2,000 participants received genetic feedback.",
    programs: ["Population biobank of more than 210,000 participants", "Linkage with the Cancer Registry and Causes of Death Registry", "Personalised medicine pilots in breast cancer and heart disease"],
    institutions: ["estonian-cancer-registry"],
    cancers: ["breast-cancer"],
    links: [{ label: "University of Tartu, Institute of Genomics: Estonian Biobank", url: BIOBANK }] }),

  i({ id: "vahiravifond-elu", name: "Vähiravifond Kingitud Elu (Cancer Treatment Fund, Estonia)", aka: ["Kingitud Elu", "Sihtasutus Hille Tänavsuu Vähiravifond Kingitud Elu", "Vähiravifond"],
    city: "Tallinn", country: "EE", lat: 59.44, lng: 24.75, institutionType: "consortium", website: FUND,
    tldr: "A private Estonian charity that helps people with cancer pay for medicines the state does not fund. It says more than 16,000 people and companies donate to it each month.",
    summary: "Sihtasutus Hille Tänavsuu Vähiravifond Kingitud Elu describes itself on its own site as a privately initiated fund for supporting cancer treatment, whose mission is to help people with cancer whose treatment the state does not currently consider cost-effective enough. It says it supports people mainly with money, helping them buy modern medicines they need. The site names Toivo Tänavsuu as its founder and a member of its council, and says the fund grew out of his mother Hille Tänavsuu's illness. The site says more than 16,000 people and companies in Estonia support the fund every month. OnCo has not read the fund's annual accounts or its rules for who is supported.",
    programs: ["Grants for cancer medicines not reimbursed by the state"],
    institutions: ["tervisekassa"],
    links: [{ label: "Vähiravifond Kingitud Elu", url: FUND }] }),
];

/** Records behind /countries/ee/ (wave 13). */
export const recordsEE: EntityInput[] = [...institutions];
