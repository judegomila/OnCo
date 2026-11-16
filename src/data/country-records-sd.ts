import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Sudan: the public bodies, cancer centres and papers behind /countries/sd/ (wave 6) that the corpus did not hold. Each
 * was written from its own primary source, read raw on 11 November 2026: the Federal Ministry of Health's National
 * Cancer Strategy 2012 to 2016 (PDF text, draft for ratification dated 4 April 2012, on the ICCP portal), the National
 * Medicines and Poisons Board's Arabic "about" page and home page, the National Health Insurance Fund's Arabic "about"
 * page, the IAEA's press release of 4 May 2026 (read through the Internet Archive, as the IAEA site returned a bot
 * challenge), and WHO's news release of 14 April 2026. DOIs were resolved through Europe PMC and the figures in
 * `findings` are taken from the indexed abstracts, or from the full text where Europe PMC holds it (the 2023
 * ecancermedicalscience editorial, the 2022 women's cancers paper and the 2014 Khartoum registry paper).
 *
 * Sudan has been at war since 15 April 2023. Statements about whether a centre is working are dated to their source;
 * none of them should be read as the position in November 2026.
 *
 * Inbound links: the Ministry links the registry, the regulator, the insurer and the four cancer centres; the registry
 * links its incidence paper through keyPapers; the centres link the papers written from them. Coordinates are
 * approximate city points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCS_2012 = "https://www.iccp-portal.org/system/files/plans/SDN_B5_National%20Cancer%20Strategy.pdf";
const NMPB_ABOUT = "https://www.nmpb.gov.sd/intro.php";
const NHIF_ABOUT = "https://nhif.gov.sd/about/";
const IAEA_NCI_2026 = "https://web.archive.org/web/20260504142754/https://www.iaea.org/newscenter/pressreleases/iaea-rays-of-hope-initiative-delivers-critical-equipment-to-restore-radiotherapy-services-in-sudan";
const WHO_2026 = "https://www.who.int/news/item/14-04-2026-after-three-years-of-conflict--sudan-faces-a-deeper-health-crisis";

const institutions: InstitutionInput[] = [
  i({ id: "sudan-federal-ministry-of-health", name: "Federal Ministry of Health, Sudan", aka: ["FMOH Sudan", "Ministry of Health Sudan", "Sudan Federal Ministry of Health"],
    city: "Khartoum", country: "SD", lat: 15.59, lng: 32.53, institutionType: "government",
    tldr: "Sudan's health ministry. Its non-communicable diseases directorate runs the national cancer control programme and the National Cancer Registry, and its last cancer strategy on the international planning portal covers 2012 to 2016.",
    summary: "The Federal Ministry of Health oversees health care delivered through federal, state and local governments. Its National Cancer Strategy 2012 to 2016, drafted by the non-communicable diseases directorate with the Public Health Institute, the Radiation and Isotopes Centre Khartoum, the National Cancer Institute in Wad Medani, the National Cancer Registry and WHO, records that a vertical cancer programme began at the Khartoum centre in 1982 under WHO auspices and was adopted by the Ministry in 2002, that the earlier cancer control plan of 2002 to 2003 had lapsed, and that the programme was then run by one community physician and one registrar. The strategy describes cancer as among the ten leading killer diseases, with 80% of patients presenting at stage 3 or 4. The coordinates on this record are an approximate Khartoum city point.\n\nSince 15 April 2023 the country has been at war. WHO reported on 14 April 2026 that 37% of health facilities across Sudan's 18 states remained non-functional and that it had verified 217 attacks on health care since the war began. The IAEA's press release of 4 May 2026 quotes the Minister of Health, Haitham Awad Allah, saying radiotherapy services were almost entirely unavailable across the country, and calls the National Cancer Institute the first facility to benefit from IAEA assistance supported by national funding, which included the procurement and shipment of the equipment.",
    programs: ["National Cancer Control Programme (from 1982; Ministry programme from 2002)", "National Cancer Strategy 2012 to 2016 (draft for ratification, April 2012)", "National Cancer Registry (from 2009)", "Free chemotherapy and radiotherapy at public oncology centres"],
    institutions: ["sudan-national-cancer-registry", "nmpb-sudan", "nhif-sudan", "rick-khartoum-oncology-hospital", "nci-university-of-gezira", "shendi-tumour-therapy-centre", "east-oncology-centre-gedaref", "who", "iaea"],
    cancers: ["breast-cancer", "cervical", "prostate"], related: ["global-oncology-access"],
    keyPapers: ["paper-husain-womens-cancers-sudan-ecancer-2022", "paper-elhassan-kassala-cancer-treatment-conflict-jcpo-2025"],
    links: [
      { label: "National Cancer Strategy 2012 to 2016 (Federal Ministry of Health, draft for ratification, PDF, ICCP portal)", url: NCS_2012 },
      { label: "WHO: after three years of conflict, Sudan faces a deeper health crisis (14 April 2026)", url: WHO_2026 },
      { label: "IAEA: Rays of Hope delivers equipment to restore radiotherapy services in Sudan (4 May 2026; read through the Internet Archive)", url: IAEA_NCI_2026 },
    ] }),

  i({ id: "sudan-national-cancer-registry", name: "National Cancer Registry, Sudan", aka: ["Sudan National Population-based Cancer Registry", "NCR Sudan", "Khartoum Cancer Registry"],
    city: "Khartoum", country: "SD", lat: 15.58, lng: 32.54, institutionType: "government",
    tldr: "Sudan's population-based cancer registry, set up by the Federal Ministry of Health in 2009. Its only published incidence figures cover Khartoum State for 2009 and 2010, when it recorded 6,771 new cancers.",
    summary: "The National Cancer Registry was established in 2009 under the Federal Ministry of Health's non-communicable diseases directorate. The Ministry's 2012 to 2016 strategy says it began by surveying every public and private health facility and histopathology laboratory in Khartoum State, collects cases by passive and active case finding, and planned six more registries across the country; it estimated that hospital records had captured only 20 to 30% of the national cancer load and named the registry's lack of mortality and survival data as a weakness. An earlier registry ran at the National Health Laboratory from 1966 into the 1980s from two pathology laboratories and closed for lack of funds. The coordinates are an approximate Khartoum city point.\n\nIts first results, published in 2014, counted 6,771 new cancers in Khartoum State in 2009 and 2010, 53.8% in women, with breast cancer commonest in women and prostate cancer in men. The authors entered data in CanReg-5 and named biases from patients who seek alternative treatment and from patients living in other states who are treated in Khartoum. OnCo found no later published incidence report from the registry, and no statement of its status since the war reached Khartoum in April 2023.",
    programs: ["Population-based cancer registration for Khartoum State (from 2009)"],
    institutions: ["sudan-federal-ministry-of-health", "rick-khartoum-oncology-hospital", "nci-university-of-gezira", "iarc"],
    cancers: ["breast-cancer", "prostate"], related: ["cancer-registries-surveillance"],
    keyPapers: ["paper-saeed-khartoum-cancer-registry-2009-2010-cam4-2014"],
    links: [
      doi("10.1002/cam4.254", "Saeed et al., cancer incidence in Khartoum, first results from the Cancer Registry 2009 to 2010 (Cancer Med 2014)"),
      { label: "National Cancer Strategy 2012 to 2016, annex 1, cancer information system (PDF)", url: NCS_2012 },
    ] }),

  i({ id: "nmpb-sudan", name: "National Medicines and Poisons Board (NMPB), Sudan", aka: ["NMPB", "National Medicines and Poisons Board", "Federal Pharmacy and Poisons Board"],
    city: "Khartoum", country: "SD", lat: 15.6, lng: 32.53, institutionType: "government", website: "https://www.nmpb.gov.sd/",
    tldr: "Sudan's medicines regulator. Under the Medicines and Poisons Act 2009 it registers medicines and medical supplies, sets the conditions for importing, manufacturing, storing and pricing them, and licenses clinical trials of medicines.",
    summary: "The Board's own history page records that medicines regulation in Sudan began with the Pharmacy and Poisons Act of 1963, enforced by the Federal Ministry of Health's pharmacy directorate; that a Federal Pharmacy and Poisons Board was created under the 2001 Act and worked under the pharmacy directorate until 2007, when it came under the supervision of the Federal Minister of Health; and that the law was amended in 2009 to become the Medicines and Poisons Act 2009, which remains in force. Under article 6 of that Act the Board is the national authority for the specifications and conditions governing the import, manufacture, control, storage, pricing, transport and use of medicines, cosmetics and medical supplies. Its listed powers include registering medicines and setting registration conditions (need, safety, efficacy, price and quality), licensing trials of medicines in humans or animals under article 22, requiring importers to bring in a medicine the country needs, and approving exports. The coordinates are an approximate Khartoum city point.\n\nIts home page links to a public register of registered products. Its news page in October 2026 reported inspection campaigns seizing smuggled, expired and unregistered medicines in Kassala and in North Kordofan.",
    programs: ["Registration of medicines and medical supplies", "Licensing of clinical trials of medicines (Medicines and Poisons Act 2009, article 22)", "Medicine pricing", "Pharmacovigilance centre", "Inspection of pharmaceutical premises"],
    institutions: ["sudan-federal-ministry-of-health"],
    links: [
      { label: "NMPB: about the Board (Arabic)", url: NMPB_ABOUT },
      { label: "NMPB: home page and news (Arabic)", url: "https://www.nmpb.gov.sd/" },
    ] }),

  i({ id: "nhif-sudan", name: "National Health Insurance Fund, Sudan", aka: ["NHIF Sudan", "NHIF", "National Health Insurance Fund"],
    city: "Khartoum", country: "SD", lat: 15.57, lng: 32.55, institutionType: "government", website: "https://nhif.gov.sd/",
    tldr: "Sudan's national health insurer, set up under a 1994 decree with WHO technical help. It first paid for care in Sennar State in 1995; contributions are 4% of salary for salaried workers and a flat rate for others.",
    summary: "The Fund's own history page records that health insurance in Sudan formally began with the provisional decree of 1994 on the administration of health insurance, after earlier experiments with free and then fee-paying care, that technical assistance came from the World Health Organization, and that the first insured medical service was given in Sennar State in 1995. It describes a single package of medical services for all members, referral between levels of care and between states, contributions of 4% for salaried workers and a fixed flat rate for people with irregular incomes, and subsidised membership for poor families paid through bodies such as the Zakat Chamber. The coordinates are an approximate Khartoum city point.\n\nA 2023 study based on interviews with five senior health financing advisers, posted as a preprint, reported that the scheme covers only a minority of the population and that out-of-pocket payments account for over 70% of health spending; WHO's Global Health Expenditure Database gives out-of-pocket spending as 57.4% of current health expenditure in 2023. The Fund's news pages for September to November 2026 report health centres reopened after rehabilitation in Sennar State, a new health centre in Berber (River Nile State), and new offices and a reference laboratory for the Fund in Kassala. OnCo found no statement from the Fund of which cancer medicines or treatments it pays for.",
    programs: ["National health insurance (from 1994; first service in Sennar State, 1995)", "Additional medical services package", "Referral between states"],
    institutions: ["sudan-federal-ministry-of-health"],
    links: [
      { label: "NHIF: about the Fund (Arabic)", url: NHIF_ABOUT },
      { label: "Bashir and Allen, health financing in Sudan: key informant interviews in the wake of the 2023 conflict (medRxiv preprint, 2023)", url: "https://doi.org/10.1101/2023.12.20.23300333" },
      { label: "WHO Global Health Observatory: out-of-pocket share of current health expenditure, Sudan (API)", url: "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SDN'" },
    ] }),

  i({ id: "rick-khartoum-oncology-hospital", name: "Radiation and Isotopes Centre Khartoum (Khartoum Oncology Hospital)", aka: ["RICK", "Radiation and Isotope Centre Khartoum", "Khartoum Oncology Hospital", "Radioisotope Centre Khartoum"],
    city: "Khartoum", country: "SD", lat: 15.6, lng: 32.53, institutionType: "cancer-center",
    tldr: "Sudan's oldest public cancer centre, opened in 1967 with WHO and IAEA support, and before the war its main hub for cancer treatment. Peer-reviewed reports from 2023 and 2024 say it stopped working after fighting reached Khartoum in April 2023.",
    summary: "The Ministry of Health's 2012 to 2016 cancer strategy records that a cancer treatment centre was set up in the early 1960s under the auspices of WHO, the IAEA and the Sudanese government, WHO training staff and supplying cytotoxic drugs and the IAEA installing machines; that it started working in 1967 and was officially opened on 18 October 1968; that the strategy's authors called it the third such centre in Africa after Egypt and South Africa; and that until April 1999 it was the only specialised cancer centre in the country. A 2022 paper by Sudanese clinicians names Khartoum Oncology Hospital as the former Radiation and Isotope Center-Khartoum. It offered radiotherapy, chemotherapy, hormone therapy and nuclear medicine, opened a palliative care unit in February 2010, and its patient register grew from 2,471 patients in 2000 to 5,739 in 2009. The coordinates are an approximate Khartoum city point.\n\nAfter fighting began on 15 April 2023, an editorial by Sudanese clinicians described total cessation of oncology services in Khartoum, and a 2024 commentary in JCO Global Oncology called Khartoum Oncology Hospital, Sudan's main cancer hub for treatment, diagnostics and research, nonfunctional. The IAEA wrote in May 2026 that public radiotherapy in Khartoum, Shendi and Wad Madani had halted because of equipment breakdowns and that it is helping rehabilitate radiotherapy centres in Khartoum. OnCo found no primary source dated 2026 saying the centre is treating patients again.",
    programs: ["Radiotherapy", "Chemotherapy and hormone therapy", "Nuclear medicine", "Palliative care unit (from February 2010)"],
    institutions: ["sudan-federal-ministry-of-health", "sudan-national-cancer-registry", "iaea", "who"],
    cancers: ["breast-cancer", "cervical", "prostate"],
    keyPapers: ["paper-alrawa-sudan-cancer-services-five-months-ecancer-2023", "paper-ahmed-collapse-cancer-care-sudan-jcogo-2024"],
    links: [
      { label: "National Cancer Strategy 2012 to 2016, annex 1, historical background (PDF)", url: NCS_2012 },
      doi("10.1200/GO.24.00144", "Ahmed et al., collapse of cancer care under the current conflict in Sudan (JCO Glob Oncol 2024)"),
      doi("10.3332/ecancer.2023.128", "Alrawa et al., five months into conflict: near total collapse of cancer services in Sudan (ecancer 2023)"),
      doi("10.3332/ecancer.2022.1433", "Husain et al., women's cancers in Sudan: Khartoum Oncology Hospital, formerly the Radiation and Isotope Center-Khartoum (ecancer 2022)"),
      { label: "IAEA: Rays of Hope delivers equipment to restore radiotherapy services in Sudan (4 May 2026; Internet Archive)", url: IAEA_NCI_2026 },
    ] }),

  i({ id: "nci-university-of-gezira", name: "National Cancer Institute, University of Gezira (Wad Madani)", aka: ["National Cancer Institute Wad Madani", "Gezira Cancer Centre", "Institute of Nuclear Medicine, Molecular Biology and Oncology"],
    city: "Wad Madani", country: "SD", lat: 14.4, lng: 33.52, institutionType: "cancer-center", university: "University of Gezira",
    tldr: "Sudan's second public cancer centre, opened in Wad Madani in April 1999. It absorbed patients from Khartoum when the war began, stopped radiotherapy in August 2023 when its two cobalt machines failed, and received IAEA equipment to restore them in April 2026.",
    summary: "The Ministry of Health's 2012 to 2016 strategy records that the Gezira centre opened in April 1999, that like the Khartoum centre it offers radiotherapy, chemotherapy and nuclear medicine, and that its registry was population-based for Gezira State. A hospital-based study of 225 women treated there for breast cancer in 2012 found a 5-year overall survival of 58%. The coordinates are an approximate Wad Madani city point.\n\nAfter the war began on 15 April 2023, the number of new cancer patients registered at the institute between 15 April and 31 August rose from 1,560 in the same period a year earlier to 2,980, according to an editorial by Sudanese clinicians, one of them from the institute. Its two cobalt radiotherapy machines failed in June and August 2023 and radiotherapy stopped on 15 August 2023. A 2024 commentary reported that the institute faced the same fate as Khartoum Oncology Hospital as the conflict spread to Al Gezira State. On 4 May 2026 the IAEA announced that equipment worth about 2 million US dollars, including components to refurbish the institute's two teletherapy machines, treatment planning systems and dosimeters, had arrived in April and was being installed, with radiotherapy expected to restart later in 2026 for up to 10,000 patients a year. OnCo found no source confirming that radiotherapy had restarted by November 2026.",
    programs: ["Radiotherapy (two teletherapy machines; stopped August 2023, under refurbishment 2026)", "Chemotherapy", "Nuclear medicine", "Adult and paediatric oncology"],
    institutions: ["sudan-federal-ministry-of-health", "sudan-national-cancer-registry", "iaea"],
    cancers: ["breast-cancer", "cervical", "childhood-cancers"],
    keyPapers: ["paper-muddather-breast-cancer-survival-gezira-jcogo-2021", "paper-alrawa-sudan-cancer-services-five-months-ecancer-2023", "paper-elhaj-radiotherapy-sudan-radonc-2026"],
    links: [
      { label: "IAEA: Rays of Hope delivers equipment to restore radiotherapy services in Sudan (4 May 2026; Internet Archive)", url: IAEA_NCI_2026 },
      doi("10.3332/ecancer.2023.128", "Alrawa et al., five months into conflict (ecancer 2023)"),
      doi("10.1200/GO.20.00538", "Muddather et al., survival outcomes of breast cancer in Sudanese women (JCO Glob Oncol 2021)"),
      { label: "National Cancer Strategy 2012 to 2016, annex 1 (PDF)", url: NCS_2012 },
    ] }),

  i({ id: "shendi-tumour-therapy-centre", name: "Tumour Therapy and Cancer Research Center, Shendi", aka: ["Shendi Cancer Center", "Shandi Cancer Center", "Tumour Therapy and Cancer Research Centre Shendi"],
    city: "Shendi", country: "SD", lat: 16.69, lng: 33.43, institutionType: "cancer-center", university: "University of Shendi",
    tldr: "A public cancer centre in Shendi, River Nile State, linked to the University of Shendi. In 2012 it gave chemotherapy and nuclear medicine; after the war began its new patients rose almost fivefold as patients left Khartoum.",
    summary: "The Ministry of Health's 2012 to 2016 cancer strategy lists the Shendi Cancer Center in River Nile State as one of three centres then managing cancer, with chemotherapy and nuclear medicine but no radiotherapy, and a radiotherapy centre proposed by the University of Shendi. The IAEA wrote in May 2026 that radiotherapy had been offered at public centres in Khartoum, Shendi and Wad Madani and had halted at all three because of equipment breakdowns. The coordinates are an approximate Shendi city point.\n\nAn editorial by Sudanese clinicians reported that between 15 April and 31 August 2023, with oncology services in Khartoum at a standstill, new cancer patients at the Tumour Therapy and Cancer Research Center in Shendi rose from 163 in the same period of 2022 to 791, while medicine deliveries had stopped from March.",
    programs: ["Chemotherapy and hormone therapy", "Nuclear medicine", "Radiotherapy (halted, per the IAEA in May 2026)"],
    institutions: ["sudan-federal-ministry-of-health"], cancers: ["breast-cancer"],
    keyPapers: ["paper-alrawa-sudan-cancer-services-five-months-ecancer-2023"],
    links: [
      doi("10.3332/ecancer.2023.128", "Alrawa et al., five months into conflict (ecancer 2023)"),
      { label: "National Cancer Strategy 2012 to 2016, annex 1 (PDF)", url: NCS_2012 },
      { label: "IAEA: Rays of Hope delivers equipment to restore radiotherapy services in Sudan (4 May 2026; Internet Archive)", url: IAEA_NCI_2026 },
    ] }),

  i({ id: "east-oncology-centre-gedaref", name: "East Oncology Centre, Gedaref", aka: ["East Oncology Center", "EOC Gedaref", "East Oncology Center Elgadarif"],
    city: "Gedaref", country: "SD", lat: 14.03, lng: 35.38, institutionType: "cancer-center",
    tldr: "A cancer centre in Gedaref State, eastern Sudan, giving chemotherapy and hormone therapy. Its new patients roughly doubled after the war began in 2023, and it is one of the peripheral centres studied for how they absorbed displaced patients.",
    summary: "The East Oncology Centre treats patients from Gedaref State and the east of the country. A review of 394 breast cancer patients treated there from 2016 to 2022 found 50% diagnosed at stage III and 32% at stage IV, 43% with triple-negative disease, and 38% receiving radiotherapy, 84% chemotherapy and 46% hormone therapy. The coordinates are an approximate Gedaref city point.\n\nAn editorial by Sudanese clinicians reported that the centre treated 165 new patients in the period from 15 April to 31 August 2022 and 337 in the same months of 2023, after the war began. A 2025 paper in JCO Global Oncology gives new data on the surge of patients at the East Oncology Centre and the White Nile Cancer Centre and the shortage of medical supplies; its figures are in the full text, which OnCo could not read.",
    programs: ["Chemotherapy", "Hormone therapy", "Breast cancer care"],
    institutions: ["sudan-federal-ministry-of-health"], cancers: ["breast-cancer"],
    keyPapers: ["paper-ahmed-breast-cancer-eastern-sudan-ecancer-2024", "paper-ahmed-armed-conflict-cancer-care-sudan-jcogo-2025"],
    links: [
      doi("10.3332/ecancer.2024.1704", "Ahmed et al., breast cancer burden in eastern Sudan: seven-year retrospective study (ecancer 2024)"),
      doi("10.3332/ecancer.2023.128", "Alrawa et al., five months into conflict (ecancer 2023)"),
      doi("10.1200/GO-24-00568", "Ahmed et al., impact of armed conflict on cancer care in Sudan (JCO Glob Oncol 2025)"),
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-saeed-khartoum-cancer-registry-2009-2010-cam4-2014", name: "Cancer incidence in Khartoum State, 2009 to 2010: first results from Sudan's National Cancer Registry",
    journal: "Cancer Medicine", year: 2014, doi: "10.1002/cam4.254", pmid: "24821265", authors: "Saeed IE, Weng HY, Mohamed KH, Mohammed SI", paperType: "observational", participants: 6771,
    tldr: "In its first two years the National Cancer Registry recorded 6,771 new cancers in Khartoum State, 53.8% in women; breast cancer led in women and prostate cancer in men, and leukaemia was second in both.",
    summary: "Published as \"Cancer incidence in Khartoum, Sudan: first results from the Cancer Registry, 2009-2010\". Registry staff collected cancers diagnosed by any means in Khartoum State through passive and active case finding in public and private facilities and entered them in CanReg-5. Rates were standardised to the 2010 Sudan standard population and to the 1966 and 2000 world standard populations.",
    findings: [
      "6,771 new cancers were registered in 2009 to 2010: 3,646 (53.8%) in women and 3,125 (46.2%) in men.",
      "Age-standardised incidence was 124.3 per 100,000 women and 90.8 per 100,000 men on the 2010 Sudan standard, and 206.3 and 160.0 on the 2000 world standard.",
      "Breast cancer was commonest in women, followed by leukaemia, cervix and ovary; prostate cancer was commonest in men, followed by leukaemia, lymphoma, oral, colorectal and liver cancer. Leukaemia led in children under 15.",
    ],
    whatItMeans: "The only population-based incidence figures Sudan's registry has published; they show breast and prostate cancer leading, with cervical cancer lower than in many neighbouring countries.",
    caveats: ["The authors name biases from patients who seek alternative treatment and from out-of-state patients treated in Khartoum, which would raise Khartoum's rates.", "One state, two years, more than fifteen years ago."],
    institutions: ["sudan-national-cancer-registry", "rick-khartoum-oncology-hospital"], cancers: ["breast-cancer", "prostate"],
    links: [doi("10.1002/cam4.254", "Cancer Med 2014"), pubmed("24821265")] }),

  p({ id: "paper-alrawa-sudan-cancer-services-five-months-ecancer-2023", name: "Sudan's cancer services five months into the 2023 war",
    journal: "ecancermedicalscience", year: 2023, doi: "10.3332/ecancer.2023.128", pmid: "38414957", authors: "Alrawa SS, Alfadul ES, Elhassan MMA, Hammad N", paperType: "review",
    tldr: "Sudanese clinicians reported that five months after the war began, oncology services in Khartoum had stopped, the National Cancer Institute had lost radiotherapy, essential cancer medicines and opioids were unavailable, and one private machine in Merowe was the only radiotherapy left.",
    summary: "Published as \"Five months into conflict: near total collapse of cancer services in Sudan\", an editorial by clinicians from the University of Khartoum, the National Cancer Institute of the University of Gezira and St Michael's Hospital, Toronto. It describes the state of cancer services between 15 April and 31 August 2023.",
    findings: [
      "Before the war Sudan had fifteen public and private oncology centres, four offering radiotherapy; afterwards six were operating, two of them comprehensive: the National Cancer Institute in Wad Madani and the private Merowe Oncology Center.",
      "New patients from 15 April to 31 August rose against the same period of 2022: National Cancer Institute 1,560 to 2,980; Shendi 163 to 791; East Oncology Center, Gedaref, 165 to 337; Eldaman Oncology and Radiotherapy Center, Merowe, 217 to 397.",
      "The institute's two cobalt machines failed in June and August 2023 and radiotherapy stopped on 15 August; centres had received no medicines since March, staff had not been paid, isotope shortages had stopped nuclear medicine by early April, and opioid analgesics were absent.",
    ],
    whatItMeans: "A first-hand account of how the war removed most cancer treatment in Sudan within months, and moved the remaining patients to centres outside Khartoum.",
    caveats: ["An editorial, not a systematic survey; patient counts come from the centres.", "Describes August 2023, not the position since."],
    institutions: ["nci-university-of-gezira", "rick-khartoum-oncology-hospital", "shendi-tumour-therapy-centre", "east-oncology-centre-gedaref"], cancers: ["breast-cancer"],
    links: [doi("10.3332/ecancer.2023.128", "ecancer 2023"), pubmed("38414957")] }),

  p({ id: "paper-ahmed-collapse-cancer-care-sudan-jcogo-2024", name: "Collapse of cancer care under the conflict in Sudan",
    journal: "JCO Global Oncology", year: 2024, doi: "10.1200/GO.24.00144", pmid: "38959450", authors: "Ahmed I, Elhassan MMA, Elnour K, Sullivan R, Hammad N", paperType: "review",
    tldr: "A 2024 commentary reported that Khartoum Oncology Hospital had become nonfunctional, that the National Cancer Institute in Wad Madani faced the same fate as fighting spread to Al Gezira State, and that cancer patients had been displaced several times.",
    summary: "Published as \"Collapse of Cancer Care Under the Current Conflict in Sudan\". The authors describe the conflict between the Sudanese Armed Forces and the Rapid Support Forces since 15 April 2023, its effect on the health system and on cancer services, and call on WHO, UNICEF, St Jude and partners to evacuate children with cancer for treatment in neighbouring countries.",
    findings: [
      "At the time of writing the conflict had displaced 9.05 million people inside Sudan, including 2.2 million children under 5, and 1.47 million had fled as refugees.",
      "Khartoum Oncology Hospital, Sudan's main cancer hub for treatment, diagnostics and research, had become nonfunctional; the National Cancer Institute in Wad Madani, the second hub, faced a similar fate as the conflict spread to Al Gezira State.",
      "The health system had been targeted by air raids, ground invasion, vandalisation, looting, and the killing of health workers; the oncology workforce was itself displaced.",
    ],
    whatItMeans: "Documents the loss of Sudan's two main public cancer centres in the first year of the war and the case for evacuating children with cancer.",
    caveats: ["A commentary by clinicians and advocates; read as an account, not a measured survey."],
    institutions: ["rick-khartoum-oncology-hospital", "nci-university-of-gezira"], cancers: ["childhood-cancers"],
    links: [doi("10.1200/GO.24.00144", "JCO Glob Oncol 2024"), pubmed("38959450")] }),

  p({ id: "paper-ahmed-armed-conflict-cancer-care-sudan-jcogo-2025", name: "How Sudan's war moved cancer patients to peripheral oncology centres",
    journal: "JCO Global Oncology", year: 2025, doi: "10.1200/GO-24-00568", pmid: "40466016", authors: "Ahmed Y, Karadawi N, Abubaker M, Mustafa A", paperType: "observational",
    tldr: "A 2025 analysis reports quantitative data on the surge of patients at peripheral centres such as the East Oncology Centre and the White Nile Cancer Centre after Khartoum's cancer services collapsed, alongside critical shortages of supplies.",
    summary: "Published as \"Impact of Armed Conflict on Cancer Care in Sudan: Challenges and Strategic Responses\". The authors analyse the collapse of oncology services after 15 April 2023, the redistribution of patients to peripheral oncology centres, the strain on those centres, the disruption of supply chains and the displacement of health workers, and the lack of global attention to Sudan compared with other conflicts.",
    findings: [
      "The abstract states that Khartoum Oncology Hospital and numerous comprehensive cancer centres had been rendered nearly nonfunctional.",
      "It reports new quantitative data on patient numbers at the East Oncology Centre and the White Nile Cancer Centre, and critical shortages of medical supplies; the figures are in the full text, which OnCo could not read.",
    ],
    whatItMeans: "Evidence that the peripheral centres carried Sudan's cancer care after 2023, and of the equity gap in international attention.",
    caveats: ["Only the abstract was read; the full text refused a script.", "No numbers are quoted here for that reason."],
    institutions: ["east-oncology-centre-gedaref"],
    links: [doi("10.1200/GO-24-00568", "JCO Glob Oncol 2025"), pubmed("40466016")] }),

  p({ id: "paper-elhassan-kassala-cancer-treatment-conflict-jcpo-2025", name: "Cancer treatment during Sudan's war: 100 patients at a Kassala oncology centre",
    journal: "Journal of Cancer Policy", year: 2025, doi: "10.1016/j.jcpo.2025.100604", pmid: "40466808", authors: "Elhassan MMA, Mohammed AAA, Osman Muhyeldeen FK, et al.", paperType: "observational", participants: 100,
    tldr: "Of 100 patients surveyed at Dr. Tiraky Oncology Center in Kassala in late 2024, 89 had their chemotherapy interrupted, mostly because of displacement, and a single chemotherapy cycle cost on average about 900 US dollars.",
    summary: "Published as \"Cancer treatment amid armed conflict: Challenges and urgent needs in Sudan\". A cross-sectional questionnaire study at Dr. Tiraky Oncology Center in Kassala State between September and November 2024 covering treatment disruption, drug availability and financial burden.",
    findings: [
      "Chemotherapy interruptions affected 89% of patients, mainly because of displacement (52%) and transport barriers (29%).",
      "The government covers the cost of essential cancer medicines, but patients and families paid for out-of-stock chemotherapy, transport and accommodation; the average cost of one chemotherapy cycle was estimated at 900 US dollars.",
      "The centre had 12 chemotherapy chairs, with staff shortages and an increased workload; international donations gave some relief.",
    ],
    whatItMeans: "Shows that free public cancer medicines do not make treatment free when medicines run out and patients have been displaced.",
    caveats: ["One centre and 100 patients; descriptive statistics only."],
    institutions: ["sudan-federal-ministry-of-health"],
    links: [doi("10.1016/j.jcpo.2025.100604", "J Cancer Policy 2025"), pubmed("40466808")] }),

  p({ id: "paper-elhaj-radiotherapy-sudan-radonc-2026", name: "Radiotherapy in Sudan: machines, workforce and the effect of the war",
    journal: "Radiotherapy and Oncology", year: 2026, doi: "10.1016/j.radonc.2026.111637", pmid: "42285464", authors: "Elhaj A, Ahmed E, Ali Elhassan MM", paperType: "observational",
    tldr: "Before April 2023 Sudan had seven working megavoltage radiotherapy machines, one per seven million people, at five centres; by September 2025 only Merowe Medical City was still giving radiotherapy.",
    summary: "Published as \"Radiotherapy in Sudan: facing infrastructure, workforce and armed conflict challenges\". A facility survey of all five radiotherapy centres in Sudan (three public, two private) in January 2023, compared with IAEA benchmarks, with a follow-up survey in September 2025 of operational status during the conflict.",
    findings: [
      "Since 1967 Sudan has installed 13 cobalt-60 teletherapy units, eight linear accelerators and six HDR brachytherapy systems; before April 2023 seven megavoltage units (four cobalt-60, three linear accelerators) were working, one per seven million people against an IAEA recommendation of one per 250,000.",
      "About 30% of cobalt units were dismantled prematurely for lack of maintenance and source replacement; of six HDR brachytherapy units only two remained working; IMRT and VMAT were available only in private centres.",
      "The workforce was 52 clinical oncologists and 27 medical physicists, with about 77% of radiation oncologists in Khartoum; by September 2025 Merowe Medical City was the sole functioning radiotherapy facility.",
    ],
    whatItMeans: "The most complete count of Sudan's radiotherapy machines and staff, before and during the war.",
    caveats: ["Only the abstract was read.", "The second survey is dated September 2025; the IAEA reported equipment arriving for Wad Madani in April 2026."],
    institutions: ["nci-university-of-gezira", "rick-khartoum-oncology-hospital"],
    links: [doi("10.1016/j.radonc.2026.111637", "Radiother Oncol 2026"), pubmed("42285464")] }),

  p({ id: "paper-husain-womens-cancers-sudan-ecancer-2022", name: "Women's cancers in Sudan, with cervical cancer as the example",
    journal: "ecancermedicalscience", year: 2022, doi: "10.3332/ecancer.2022.1433", pmid: "36200016", authors: "Husain NE, Burhan A, Ahmed IAI, Mohammed SI, Hammad N", paperType: "review",
    tldr: "Before the war, Sudan had almost no cancer screening or prevention programmes, had not introduced the HPV vaccine, had no gynaecological oncologists, and its three public brachytherapy machines were out of service.",
    summary: "Published as \"Women's cancers in Sudan with a focus on cervical cancer: turmoil, geopolitics and opportunities\". A short communication on the challenges facing women's cancers in Sudan and the opportunities to improve outcomes.",
    findings: [
      "The HPV vaccine had not been introduced and Sudan had not used its eligibility for Gavi support; cervical screening by visual inspection and Pap smears was limited and uncoordinated.",
      "Chemotherapy drugs and radiotherapy sessions are free, but the health system could not regularly maintain radiotherapy, causing waiting lists and treatment breaks; the three public HDR brachytherapy machines in Khartoum, Medani and Shendi were out of work.",
      "There were no gynaecological oncologists and no training programme; thousands of patients outside Khartoum and Medani had no access to oral morphine.",
    ],
    whatItMeans: "Sets out the prevention and treatment gaps for women's cancers that existed before the war began.",
    caveats: ["A narrative communication by clinicians; it states that GLOBOCAN figures for Sudan rest on Federal Ministry of Health data."],
    institutions: ["sudan-federal-ministry-of-health"], cancers: ["cervical", "breast-cancer", "ovarian"],
    links: [doi("10.3332/ecancer.2022.1433", "ecancer 2022"), pubmed("36200016")] }),

  p({ id: "paper-muddather-breast-cancer-survival-gezira-jcogo-2021", name: "Five-year survival of women with breast cancer at Sudan's National Cancer Institute",
    journal: "JCO Global Oncology", year: 2021, doi: "10.1200/GO.20.00538", pmid: "33617296", authors: "Muddather HF, Elhassan MMA, Faggad A", paperType: "observational", participants: 225,
    tldr: "Of 225 women diagnosed with breast cancer at the National Cancer Institute, University of Gezira, in 2012, 58% were alive five years later; 65% were diagnosed at stage III or IV.",
    summary: "Published as \"Survival Outcomes of Breast Cancer in Sudanese Women: A Hospital-Based Study\". A retrospective review of women diagnosed and treated at the National Cancer Institute, University of Gezira, in 2012 and followed to August 2018.",
    findings: [
      "Median age at presentation was 45; stages I, II, III and IV made up 3.1%, 31.6%, 48% and 17.3%.",
      "The 5-year cumulative overall survival was 58%; by stage it was 71.5%, 82.4%, 56.5% and 8.4% for stages I to IV.",
      "Advanced stage and positive lymph nodes were associated with shorter survival.",
    ],
    whatItMeans: "One of the few survival figures for any cancer in Sudan, from one public centre before the war.",
    caveats: ["One hospital, one year of diagnoses; not population-based."],
    institutions: ["nci-university-of-gezira"], cancers: ["breast-cancer"],
    links: [doi("10.1200/GO.20.00538", "JCO Glob Oncol 2021"), pubmed("33617296")] }),

  p({ id: "paper-ahmed-breast-cancer-eastern-sudan-ecancer-2024", name: "Breast cancer in eastern Sudan: seven years at the East Oncology Centre",
    journal: "ecancermedicalscience", year: 2024, doi: "10.3332/ecancer.2024.1704", pmid: "39021556", authors: "Ahmed ABM, Alrawa S, Yeddi AA, et al.", paperType: "observational", participants: 394,
    tldr: "Of 394 breast cancer patients treated at the East Oncology Centre in Gedaref from 2016 to 2022, 82% were diagnosed at stage III or IV and 43% had triple-negative disease.",
    summary: "Published as \"Breast cancer burden in eastern Sudan: seven-year retrospective study\". A cross-sectional review of medical records of patients diagnosed with breast cancer and treated at the East Oncology Centre, Gedaref State, from 2016 to 2022.",
    findings: [
      "Median age at diagnosis was 48; 96% were women and 43% came from rural areas.",
      "Stages were I 1.6%, II 17%, III 50% and IV 32%; 25% were HER2-positive and 43% triple-negative.",
      "38% received radiotherapy, 84% chemotherapy and 46% hormone therapy; higher grade and lower education were associated with advanced stage.",
    ],
    whatItMeans: "Shows how late breast cancer is found outside the capital, and how often women there were treated without radiotherapy even before the war.",
    caveats: ["One centre; records-based."],
    institutions: ["east-oncology-centre-gedaref"], cancers: ["breast-cancer"],
    links: [doi("10.3332/ecancer.2024.1704", "ecancer 2024"), pubmed("39021556")] }),
];

/** Records behind /countries/sd/ (wave 6). */
export const recordsSD: EntityInput[] = [...institutions, ...papers];
