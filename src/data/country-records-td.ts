import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Chad: the public bodies, hospitals and papers behind /countries/td/ (wave 10) that the corpus did not hold. Each
 * was written from its own primary source, read raw on 11 November 2026: the Ministry of Public Health's
 * multisectoral non-communicable disease plan 2017 to 2021 (PDF text, posted on the ICCP portal), its national list of
 * essential medicines, 2022 edition (PDF text, posted by WHO's Africa office), Law No. 024/PR/2000 on pharmacy (text on
 * WIPO Lex), WHO's 2020 cancer country profile and 2021 cervical cancer profile for Chad (PDF text), IARC's GLOBOCAN
 * 2022 and 2024 fact sheets for Chad (the 2022 sheet read through the Internet Archive), the African Cancer Registry
 * Network's member list, and news pages from Alwihda Info and Tchadinfos on the pathology service and the national
 * cancer centre. DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed
 * abstracts; for the medicines study, also from the full text posted by WHO.
 *
 * Inbound links: the Ministry links the registry, the regulator and the two hospitals, and lists the four papers in
 * keyPapers. Coordinates are an approximate N'Djamena city point for every record, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const NCD_PLAN = "https://www.iccp-portal.org/sites/default/files/plans/TCD_B3_PLAN%20MULTISEC%20MNT.pdf";
const LNME_2022 = "https://www.afro.who.int/sites/default/files/2023-07/LNME%202022-Tchad%2001%2009%2022-1.pdf";
const PHARMACY_LAW = "https://www.wipo.int/wipolex/fr/legislation/details/9127";
const WHO_PROFILE_2020 = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cancer-tcd-2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-tcd-2021-country-profile-en.pdf";
const AFCRN_TD = "https://afcrn.org/index.php/membership/membership-list/175-chad-ndjamena";
const IARC_2022_WB = "https://web.archive.org/web/20250529211947/https://gco.iarc.who.int/media/globocan/factsheets/populations/148-chad-fact-sheet.pdf";
const IARC_2024 = "https://gco.iarc.who.int/media/globocan/factsheets/populations/148-chad-fact-sheet.pdf";
const ALWIHDA_PATHOLOGY = "https://www.alwihdainfo.com/tchad-ouverture-d-un-service-d-anatomopathologie-au-chu-la-renaissance-a135591/";
const ALWIHDA_IAEA_2022 = "https://www.alwihdainfo.com/tchad-acceleration-de-la-construction-du-centre-de-radiotherapie-et-medecine-nucleaire-a110652/";
const TCHADINFOS_CNEC = "https://tchadinfos.com/?p=348769";
const PAMJ_DOI = "10.11604/pamj.2025.51.72.47698";

const institutions: InstitutionInput[] = [
  i({ id: "chad-ministry-of-public-health", name: "Ministry of Public Health and Prevention, Chad", aka: ["Ministère de la Santé Publique et de la Prévention", "Ministère de la Santé Publique et de la Solidarité Nationale", "Ministère de la Santé Publique (Tchad)", "MSP Tchad"],
    city: "N'Djamena", country: "TD", lat: 12.11, lng: 15.04, institutionType: "government",
    tldr: "Chad's health ministry. It runs the national cancer control programme, publishes the national list of essential medicines, grants marketing authorisations for medicines, and is building the country's first public cancer centre in N'Djamena with Kuwaiti financing and IAEA technical support.",
    summary: "The Ministry of Public Health has carried several names; its 2022 essential medicines list was issued as the Ministry of Public Health and National Solidarity, and in 2025 it was the Ministry of Public Health and Prevention. Its multisectoral plan against non-communicable diseases for 2017 to 2021 said that cancer cases were referred to national hospitals and a few private clinics in N'Djamena, that medicines for these diseases were costly and often out of stock, and that they were almost absent from the free emergency care list in place since 2007. Under the heading of cancer, the plan set out to establish a cancer registry, build and open a national cancer treatment centre, equip five hospitals with pathology laboratories, set up screen-and-treat units for cervical cancer in six health facilities, and build cancer departments in Abéché and Sarh. The coordinates on this record are an approximate N'Djamena city point.\n\nIn January 2022 the coordinator of the national cancer control programme told an IAEA meeting that an IAEA-funded feasibility study for a radiotherapy and nuclear medicine centre had been carried out in 2008, and the minister said the centre was financed by the Kuwait Fund and that staff would need three to four years of training. On 15 June 2025 the first stone of the Centre National d'Excellence en Cancérologie, planned with 50 beds, was laid at Karkadjerie in N'Djamena. In September 2024 the minister opened a pathology department at CHU La Renaissance.\n\nThe Ministry's General Directorate of Pharmacy, Medicines and Laboratories issues the national list of essential medicines; the 2022 edition lists cancer medicines, including trastuzumab, imatinib, rituximab and nivolumab, for use at national hospital level. The country enacted Law No. 035/PR/2019 of 5 August 2019 on universal health coverage, which provides for three schemes and began with the one under which the state pays for the care of the poorest.",
    programs: ["Programme National de Lutte contre le Cancer (national cancer control programme)", "Plan multisectoriel de lutte et de contrôle des maladies non transmissibles 2017 to 2021", "Liste nationale des médicaments essentiels et autres produits de santé (2022 edition)", "Centre National d'Excellence en Cancérologie, N'Djamena (under construction from June 2025)", "Couverture santé universelle (Law No. 035/PR/2019)"],
    institutions: ["ndjamena-cancer-registry", "dgpml-chad", "chu-la-renaissance-ndjamena", "hgrn-ndjamena", "iaea", "who", "iarc"],
    cancers: ["cervical", "breast-cancer", "prostate"], related: ["global-oncology-access"],
    keyPapers: ["paper-ragomzingba-essential-medicines-chad-pamj-2025", "paper-mboumba-bouassa-hpv-ndjamena-plosone-2019", "paper-mortier-cervical-smear-hiv-chad-bspe-2016", "paper-waheed-hpv-vaccine-barriers-francophone-vaccine-2026"],
    links: [
      { label: "Plan multisectoriel de lutte et de contrôle des maladies non transmissibles 2017 to 2021 (Ministry of Public Health, January 2017, PDF, ICCP portal)", url: NCD_PLAN },
      { label: "Liste nationale des médicaments essentiels et autres produits de santé, 2022 edition (PDF, WHO Africa)", url: LNME_2022 },
      { label: "Alwihda Info: acceleration of the radiotherapy and nuclear medicine centre (21 January 2022)", url: ALWIHDA_IAEA_2022 },
      { label: "Tchadinfos: first stone of the Centre National d'Excellence en Cancérologie at Karkadjerie (15 June 2025)", url: TCHADINFOS_CNEC },
      { label: "WHO Africa: models of care for universal health coverage in Chad", url: "https://www.afro.who.int/fr/publications/modeles-des-prestations-des-soins-pour-la-mise-en-oeuvre-de-la-couverture-sante" },
    ] }),

  i({ id: "ndjamena-cancer-registry", name: "N'Djamena Cancer Registry", aka: ["Registre de Cancer de N'Djamena", "Registre des cancers de N'Djamena", "N'djamena Cancer Registry"],
    city: "N'Djamena", country: "TD", lat: 12.11, lng: 15.04, institutionType: "research-institute", website: AFCRN_TD,
    tldr: "Chad's cancer registry for the capital, N'Djamena, a member of the African Cancer Registry Network. IARC applies its rates to the whole country to estimate Chad's cancer burden; OnCo found no published report of its own counts.",
    summary: "The registry appears on the African Cancer Registry Network's membership list as \"Chad, Registre de Cancer de N'Djamena\"; its page there says only that registry details are coming soon. IARC's GLOBOCAN 2022 fact sheet for Chad names the N'djamena Cancer Registry as its country-specific data source and gives its method as the most recent rates from a single registry applied to the 2022 population; the GLOBOCAN 2024 fact sheet gives the data source as a subnational registry, with subnational rates applied to the 2024 population. The coordinates on this record are an approximate city point.\n\nThe Ministry of Public Health's plan for 2017 to 2021 listed setting up a cancer registry among its actions, and WHO's cancer country profile of 2020 recorded no information on a population-based registry for 2019 and warned that Chad's estimates were not based on one. WHO's cervical cancer profile of 2021 records that a population-based registry exists. OnCo found no peer-reviewed paper or report publishing the registry's own counts, its population covered or its years of operation; these are named as gaps on the Chad page.",
    programs: ["Population-based cancer registration for N'Djamena", "African Cancer Registry Network member registry"],
    institutions: ["chad-ministry-of-public-health", "iarc"], cancers: ["prostate", "breast-cancer", "cervical"], related: ["cancer-registries-surveillance"],
    links: [
      { label: "African Cancer Registry Network: Chad, Registre de Cancer de N'Djamena", url: AFCRN_TD },
      { label: "IARC: GLOBOCAN 2022 fact sheet, Chad (read through the Internet Archive, PDF)", url: IARC_2022_WB },
      { label: "IARC: GLOBOCAN 2024 fact sheet, Chad (PDF)", url: IARC_2024 },
      { label: "WHO: cervical cancer country profile, Chad, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
    ] }),

  i({ id: "dgpml-chad", name: "General Directorate of Pharmacy, Medicines and Laboratories, Chad (DGPML)", aka: ["Direction Générale de la Pharmacie, du Médicament et des Laboratoires", "DGPML", "DPML Tchad"],
    city: "N'Djamena", country: "TD", lat: 12.11, lng: 15.04, institutionType: "government",
    tldr: "The directorate of Chad's health ministry that acts as the national medicines regulator. Under the 2000 pharmacy law the Minister of Health grants marketing authorisations after advice from a National Medicines Commission; a 2025 study by WHO and DGPML staff rated the regulatory system's maturity as low.",
    summary: "Law No. 024/PR/2000 on pharmacy, adopted by the National Assembly on 30 October 2000, requires every proprietary or generic medicine sold or given in Chad to hold a marketing authorisation from the Minister of Health, valid for five renewable years. The Minister decides within six months of an application after the opinion of the National Medicines Commission, a refusal must give reasons, and grants, suspensions and withdrawals are to be published by the Ministry. A medicine chosen in a public tender is authorised for the length of the tender. The coordinates are an approximate N'Djamena city point.\n\nA 2025 study by WHO's Chad office and DGPML staff describes the General Directorate of Pharmacy, Medicines and Laboratories as playing the role of the national pharmaceutical regulatory authority, with a national drug commission in charge of approval and a committee of pharmacovigilance experts. The authors rate the maturity of the regulatory system as low (level 1 on a scale of 1 to 4) and note that the authority lacks autonomy and independence. They record that Chad has no medicines manufacturer, that public supply runs through a central purchasing centre (CPA) and 23 provincial supply pharmacies, and that a 2023 mapping counted 50 private pharmacies, 47 of them in N'Djamena. The directorate also issued the 2022 national list of essential medicines.",
    programs: ["Marketing authorisation of medicines (Law No. 024/PR/2000)", "National list of essential medicines (2022 edition)", "Pharmacovigilance expert committee", "Inspection of pharmacies"],
    institutions: ["chad-ministry-of-public-health"],
    links: [
      { label: "Law No. 024/PR/2000 on pharmacy (WIPO Lex, French text)", url: PHARMACY_LAW },
      doi(PAMJ_DOI, "Ragomzingba et al., availability, prices and affordability of essential medicines in Chad (Pan Afr Med J 2025)"),
      { label: "Liste nationale des médicaments essentiels et autres produits de santé, 2022 edition (PDF, WHO Africa)", url: LNME_2022 },
    ] }),

  i({ id: "chu-la-renaissance-ndjamena", name: "CHU La Renaissance, N'Djamena", aka: ["Centre Hospitalier Universitaire La Renaissance", "CHU-R", "Hôpital La Renaissance"],
    city: "N'Djamena", country: "TD", lat: 12.11, lng: 15.04, institutionType: "hospital",
    tldr: "A university hospital in N'Djamena where Chad's Minister of Public Health opened a pathology (anatomopathology) department in September 2024, set up with a team from India and paid for from the hospital's own funds, so that cancer diagnoses could be made in the country.",
    summary: "On 23 September 2024 the Minister of Public Health inaugurated a pathology department at the Centre Hospitalier Universitaire La Renaissance in N'Djamena, in the presence of a team from the Pondicherry Institute of Medical Sciences in India. The hospital's director general said the service was paid for from the hospital's own funds, that some tests previously done abroad could now be done locally, and that the aim was to reduce medical evacuations. The department was described as having a sample-processing room and a microscope connected for telemedicine, and a member of the Indian team was to train Chadian staff. At the opening the minister said a large cancer care centre would be built in the coming months. The coordinates are an approximate N'Djamena city point.\n\nWHO's 2021 cervical cancer profile for Chad had recorded pathology services as not generally available, and the Ministry's 2017 to 2021 non-communicable disease plan had aimed to set up pathology laboratories for cancer diagnosis in five hospitals.",
    programs: ["Pathology (anatomopathology) department, opened 23 September 2024"],
    institutions: ["chad-ministry-of-public-health"],
    links: [
      { label: "Alwihda Info: a pathology department opens at CHU La Renaissance (23 September 2024)", url: ALWIHDA_PATHOLOGY },
      { label: "WHO: cervical cancer country profile, Chad, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
    ] }),

  i({ id: "hgrn-ndjamena", name: "Hôpital Général de Référence Nationale, N'Djamena (HGRN)", aka: ["HGRN", "National General Reference Hospital, N'Djamena"],
    city: "N'Djamena", country: "TD", lat: 12.11, lng: 15.04, institutionType: "hospital",
    tldr: "Chad's national general reference hospital in N'Djamena. The Ministry of Public Health's 2017 plan described it as the one hospital that brings together most of the country's specialised units for non-communicable diseases, and said cancer cases are referred to the national hospitals.",
    summary: "The Ministry of Public Health's multisectoral plan against non-communicable diseases for 2017 to 2021 names the Hôpital Général de Référence Nationale as the only hospital that groups most of the specialised units for these diseases, including surgery, and with two other N'Djamena hospitals as among the few in the capital with such units at all. It states that cancer cases are referred to the national hospitals and a few private clinics in N'Djamena, where they are treated without information flowing back to the referring facility. WHO's 2021 cervical cancer profile recorded no cancer centre or cancer department at tertiary level in Chad, and cancer surgery, chemotherapy and radiotherapy as not generally available. The coordinates are an approximate N'Djamena city point.",
    programs: ["National referral hospital for non-communicable diseases (surgery, diabetes and other specialised units)"],
    institutions: ["chad-ministry-of-public-health"],
    links: [
      { label: "Plan multisectoriel de lutte et de contrôle des maladies non transmissibles 2017 to 2021, sections 2.4.3 and 2.4.4 (PDF, ICCP portal)", url: NCD_PLAN },
      { label: "WHO: cancer country profile, Chad, 2020 (PDF)", url: WHO_PROFILE_2020 },
      { label: "WHO: cervical cancer country profile, Chad, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-ragomzingba-essential-medicines-chad-pamj-2025", name: "Availability, prices and affordability of essential medicines in Chad, 2023",
    journal: "Pan African Medical Journal", year: 2025, doi: PAMJ_DOI, pmid: "41064686", authors: "Ragomzingba FEZ, Haroun SH, Ngabéré C, et al.", paperType: "observational",
    tldr: "A June to July 2023 survey using the WHO and Health Action International method found essential medicines in stock in 52.6% of public health facilities on average, with the lowest availability in Batha, Kanem, Lac and Hadjer Lamis.",
    summary: "Published as \"National availability, prices and affordability of essential medicines: a comprehensive analysis using WHO/HAI methodology in Chad\". A descriptive cross-sectional study of public, private and contracted (religious) outlets, carried out from 1 June to 31 July 2023 by WHO's Chad office with staff of the General Directorate of Pharmacy, Medicines and Laboratories. Availability was the share of surveyed outlets holding each medicine, and prices were expressed as median price ratios. The introduction describes the regulatory system: the Directorate acts as the national regulator, the authors rate its maturity at level 1 on a scale of 1 to 4, and the country has no medicines manufacturer. It was the first such survey in Chad since 2004.",
    findings: [
      "Average availability across all public health institutions was 52.6%, from roughly 46% at health centres to 61.4% at provincial supply pharmacies.",
      "In the private sector availability was around 38% at wholesalers, 48% at pharmacies and 58.4% at pharmaceutical depots; the contracted sector was 48%.",
      "Batha, Kanem, Lac and Hadjer Lamis had the lowest availability, between 39 and 43%; the lowest-priced generics cost 9 times less than originator brands in the contracted sector, 4 times less in the public sector and 2 times less in the private sector.",
    ],
    whatItMeans: "The survey covers essential medicines in general, not cancer medicines, but it shows the supply system cancer care in Chad depends on: about half of listed medicines in stock in public facilities, and generics far cheaper than brands.",
    caveats: ["Convenience sampling of outlets.", "Not specific to cancer medicines; the abstract gives no figure for any cancer drug."],
    institutions: ["dgpml-chad", "chad-ministry-of-public-health", "who"],
    links: [doi(PAMJ_DOI, "Pan Afr Med J 2025"), pubmed("41064686"), { label: "Full text (PDF, WHO Africa)", url: "https://afro.who.int/sites/default/files/2025-10/Article%20Dispo%26Prix%20Med_Chad%20PAMJ%202025.pdf" }] }),

  p({ id: "paper-mboumba-bouassa-hpv-ndjamena-plosone-2019", name: "High-risk HPV infection in adult women in N'Djamena, Chad",
    journal: "PLoS One", year: 2019, doi: "10.1371/journal.pone.0217486", pmid: "31158254", authors: "Mboumba Bouassa RS, Nodjikouambaye ZA, Sadjoli D, et al.", paperType: "observational", participants: 253,
    tldr: "In a 2018 survey of 253 women in N'Djamena, 15.8% carried a high-risk type of human papillomavirus, the virus that causes cervical cancer, and about two thirds of the types found are covered by the nine-valent HPV vaccine.",
    summary: "Published as \"High prevalence of cervical high-risk human papillomavirus infection mostly covered by Gardasil-9 prophylactic vaccine in adult women living in N'Djamena, Chad\". In 2018 the authors surveyed women aged 25 to 65 from five of the city's ten districts, recruited by peer educators through church communities and women's associations and seen at a women's sexual health clinic, La Renaissance Plus. HPV DNA in endocervical swabs was genotyped.",
    findings: [
      "253 women were enrolled (mean age 35.0 years), 3.5% of them HIV-positive.",
      "HPV prevalence was 22.9%, and high-risk HPV prevalence 15.8% (95% CI 11.3 to 20.3); the commonest high-risk types were HPV-58, 35, 56, 31, 16, 45, 52 and 18.",
      "Types targeted by the nine-valent vaccine were found in 67.5% of infections, and HIV infection was strongly associated with high-risk HPV (adjusted odds ratio 13.2).",
    ],
    whatItMeans: "The authors argue that the high share of vaccine-preventable types is the rationale for introducing HPV vaccination for young adolescent girls in Chad, which WHO's data still record as not introduced.",
    caveats: ["Women were recruited through community networks, not a random population sample.", "One city; 253 women."],
    institutions: ["chad-ministry-of-public-health"], cancers: ["cervical"],
    links: [doi("10.1371/journal.pone.0217486", "PLoS One 2019"), pubmed("31158254")] }),

  p({ id: "paper-mortier-cervical-smear-hiv-chad-bspe-2016", name: "Cervical smear screening for women living with HIV in Moundou, Chad",
    journal: "Bulletin de la Société de Pathologie Exotique", year: 2016, doi: "10.1007/s13149-016-0496-z", pmid: "27299910", authors: "Mortier E, Doudéadoum N, Némian F, Gaulier A, Kemian M.", paperType: "observational", participants: 311,
    tldr: "Between 2013 and 2015, 311 women living with HIV in Moundou accepted cervical smear screening; 13% had high-grade lesions or cancer needing treatment, and about half the smears could not be fully interpreted.",
    summary: "Published in French; indexed in English as \"Feasibility of cervical smear in HIV-positive women living in Chad\". Between August 2013 and May 2015, Papanicolaou smear screening for cervical lesions was offered to women living with HIV in Moundou, all of them on antiretroviral therapy. The authors state that there were no previous data on cervical lesions in Chad.",
    findings: [
      "311 women accepted screening without refusal; mean age was 38 years.",
      "Results: normal 19%, inflammatory or haemorrhagic 44%, low-grade lesion 19%, high-grade lesion 9%, squamous carcinoma 4%, uninterpretable 5%.",
      "Only five women had a cone biopsy; two of three women who died during the study died of a gynaecological cancer diagnosed too late.",
    ],
    whatItMeans: "Screening was accepted and possible in a regional town, but cytology alone could not be read for half the smears, and the authors suggest looking at the cervix after staining first, the approach of visual inspection.",
    caveats: ["Women living with HIV only, at one site.", "Cytology without a confirmed treatment pathway for most women with lesions."],
    institutions: ["chad-ministry-of-public-health"], cancers: ["cervical"],
    links: [doi("10.1007/s13149-016-0496-z", "Bull Soc Pathol Exot 2016"), pubmed("27299910")] }),

  p({ id: "paper-waheed-hpv-vaccine-barriers-francophone-vaccine-2026", name: "Barriers to HPV vaccine introduction in Chad and other francophone African countries",
    journal: "Vaccine", year: 2026, doi: "10.1016/j.vaccine.2025.128030", pmid: "41313895", authors: "Waheed DE, Bolio A, Burdier R, et al.", paperType: "observational",
    tldr: "Interviews in early 2024 with officials and partners in six francophone African countries, including Chad, found that weak health systems, competing vaccine priorities, staff shortages, conflict and logistics held back HPV vaccine introduction.",
    summary: "Published as \"Barriers to HPV vaccine introduction and revitalization in sub-Saharan francophone African countries: a qualitative descriptive study\". From January to April 2024 the authors held key-informant interviews in four countries yet to introduce the HPV vaccine (Chad, the Central African Republic, Gabon and the Republic of Congo) and two seeking to sustain a programme (Senegal and Côte d'Ivoire), with regional and global partners, and analysed them thematically.",
    findings: [
      "Shared barriers to introduction were weak health system capacity, competing vaccine priorities, human resource constraints, political and conflict instability, and logistical challenges.",
      "Countries with programmes reported problems coordinating health and education ministries, too little money for communication, misinformation and gaps in engaging teachers.",
      "Financial sustainability, including co-financing and the transition away from Gavi support, remained a core concern despite policy commitment.",
    ],
    whatItMeans: "It places Chad among the countries still preparing to introduce the HPV vaccine in 2024 and names why that is hard.",
    caveats: ["Qualitative interviews; the abstract does not separate findings by country."],
    institutions: ["chad-ministry-of-public-health"], cancers: ["cervical"],
    links: [doi("10.1016/j.vaccine.2025.128030", "Vaccine 2026"), pubmed("41313895")] }),
];

/** Records behind /countries/td/ (wave 10). */
export const recordsTD: EntityInput[] = [...institutions, ...papers];
