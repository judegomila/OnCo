import type { InstitutionInput } from "@/lib/schema";

/**
 * Institutions for thirteen countries of eastern and southern Africa and the Indian Ocean that the corpus held few or
 * none of: Angola, Madagascar, Somalia, South Sudan, Burundi, Namibia, Botswana, Eritrea, Lesotho, Eswatini and
 * Mauritius (Djibouti and Comoros have none; see below). Every source was read as raw text on 11 November 2026, not through a
 * summary: IAEA DIRAC's public equipment report (the JSON behind dirac.iaea.org/Data/CountriesLight, which gives each
 * radiotherapy centre with its machines, last update year and coordinates); the African Cancer Registry Network's
 * member list and its pages for the Mauritius, Botswana, Namibia and Eswatini registries; UICC's member profiles; the
 * websites of ministries, regulators and hospitals where they answered (minsa.gov.ao, moh.gov.so, moh.gov.ss,
 * bomra.co.bw, moh.gov.bw, sante.gouv.dj (read, nothing on cancer), health.govmu.org, clinicagirassol.co.ao, fondationakbaraly.org,
 * ennrevennsourir.org); the IAEA imPACT review summaries for Madagascar (2015) and Eswatini (2017) as PDF text; WHO
 * Africa news releases on Burundi; the Islamic Development Bank's release on Djibouti; the UN in Botswana on the Sir
 * Ketumile Masire radiotherapy centre; Eritrea's Ministry of Information (shabait.com); Archemed on the Orotta
 * paediatric oncology unit; and press reports where no official page existed (Ver Angola quoting Ministry of Health
 * statements, L'Express de Madagascar, Newsmada, The Star, The Radio Community, China Daily, ehospice, 3BL Media
 * republishing the Bristol Myers Squibb Foundation, and The Namibian's investigation of Lesotho's cancer costs). Two
 * papers were resolved before use: 10.1016/j.canrad.2019.07.122 through Crossref, and 10.2147/CMAR.S277202 through
 * Europe PMC with its abstract read.
 *
 * Coordinates: radiotherapy centres use the coordinates IAEA DIRAC publishes for them; Mogadishu's Erdoğan hospital,
 * Juba Teaching Hospital, Mbabane Government Hospital and the Centre Médico-Chirurgical de Kinindo use the
 * OpenStreetMap Nominatim point for the named hospital; every other record uses Nominatim's city point and says
 * "approximate city point" in its summary. All are rounded to three decimals.
 *
 * Inbound links: each country's ministry lists the country's other new records and each lists the ministry back; where
 * no ministry record could be written (Burundi), the country's three cancer bodies list each other. UICC members are
 * also linked from the UICC record, and IAEA, WHO, the Uganda Cancer Institute and University Hospital Essen list the
 * centres their own sources say they supported. No ClinicalTrials.gov facility in the context file names an
 * institution here (the one site listed for every country is "Local Institution - 0300"), so no trial is linked.
 *
 * Not read:
 * - Namibia's Ministry of Health and Social Services (mhss.gov.na): HTTP 468 on https, no answer on http.
 * - Namibia Medicines Regulatory Council (nmrc.com.na), Ministry of Public Health of Madagascar (sante.gov.mg), the
 *   Malagasy medicines agency (agmed.mg, HTTP 410 on http, no answer on https), Burundi's Ministry of Health
 *   (minisante.bi) and regulator (abrema.bi), Lesotho's Ministry of Health (health.gov.ls), the Eswatini government
 *   site (gov.sz), Eritrea's Ministry of Health (moh.gov.er), the Comoros Ministry of Health (sante.gouv.km), the Cancer
 *   Association of Botswana (cancer.org.bw), Link to Life (linktolife.mu), Sir Ketumile Masire Teaching Hospital
 *   (skmth.org) and the Namibia Oncology Centre: no answer within 30 seconds.
 * - villageoncology.com: the domain is parked; OnCo found no website for Village Oncology in Gaborone.
 * - IAEA project and news pages (iaea.org/node/..., iaea.org/projects/tc/MAG6008): HTTP 403, including the IAEA story
 *   on Comoros' planned oncology service at CHU El-Maarouf.
 * - AllAfrica's story on Polyclinique Ilafy suspending cover for civil servants (October 2025): HTTP 403 paywall.
 * - Swazi Daily News on an Eswatini private oncology centre project (2024): HTTP 404.
 * - The Mauritius Ministry's Paediatric Cancer Scheme communiqué (2025): a scanned image PDF with no text layer.
 * - armed.gov.ao answers with a JavaScript shell only; the agency is described from Angolan legislation and press.
 * - South Sudan's Drugs and Food Control Authority page on moh.gov.ss carries no content beyond its name.
 *
 * Gaps named rather than filled: Comoros (no source describing a cancer service that answered; the UICC member there
 * lists only a post office box); Djibouti (the Islamic Development Bank signed US$26.10 million on 3 February 2026 for a
 * National Oncology Center not yet built, and the Ministry of Health's site carries nothing on cancer; a ministry record
 * was drafted but left out because no record in the corpus has a sourced relationship to link it from, and the orphan
 * ratchet forbids an unlinked record); Eritrea (two records); no public payer record for any of these countries, as
 * none was found on a source that answered.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const DIRAC_L = { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC };
const AFCRN = "https://afcrn.org/index.php/membership/membership-list";
const AFCRN_L = { label: "African Cancer Registry Network: member registries", url: AFCRN };
const UICC = (slug: string, name: string) => ({ label: `UICC member profile: ${name}`, url: `https://www.uicc.org/membership/${slug}` });

// Angola
const MINSA = "https://minsa.gov.ao/";
const VA_ONC = "https://www.verangola.net/va/en/082026/Health/49838/New-Oncology-Center-progresses-construction-reaches-over-30-percent-completion.htm";
const VA_ONC_L = { label: "Ver Angola: Ministry of Health statement on the new oncology centre and existing oncology services (August 2026)", url: VA_ONC };
const VA_ARMED = "https://www.verangola.net/va/pt/042021/Saude/24808/Ag%C3%AAncia-Reguladora-de-Medicamentos-%C3%A9-um-%E2%80%9Cganho-importante%E2%80%9D-para-o-sector-admite-ministra-da-Sa%C3%BAde.htm";
const LEX_ARMED = "https://lex.ao/docs/ministerios-das-financas-e-da-saude/2025/decreto-executivo-conjunto-n-o-1-25-de-14-de-janeiro/";
const GIRASSOL = "https://clinicagirassol.co.ao/";

// Madagascar
const LEX_COBALT = "https://www.lexpress.mg/2024/11/sante-publique-la-cobaltotherapie-au.html";
const LEX_PROV = "https://lexpress.mg/30/10/2023/sante-physique-les-six-provinces-dotes-de-services-specialises-en-oncologie/";
const IMPACT_MG = "https://iaea.org/sites/default/files/documents/review-missions/madagascar-2015-impact-review.pdf";
const ILAFY_PAPER = "https://doi.org/10.1016/j.canrad.2019.07.122";
const ILAFY_NEWS = "https://newsmada.com/2023/02/09/polyclinique-dilafy-la-lutte-contre-le-cancer-saccelere/";
const AKB = "https://fondationakbaraly.org/";
const AKB_WW = "https://fondationakbaraly.org/what-where-2/";

// Somalia
const MOH_SO = "https://moh.gov.so/en/";
const MOH_SO_NMRA = "https://moh.gov.so/en/nmra/";
const SO_PAPER = "https://doi.org/10.2147/CMAR.S277202";
const STAR_SO = "https://www.the-star.co.ke/news/2024-08-17-somalia-steps-up-fight-against-cancer-with-awareness-programme";

// South Sudan
const MOH_SS = "https://moh.gov.ss/";
const TRC_SS = "https://theradiocommunity.org/south-sudan-launches-cancer-network-5366";
const CD_SS = "https://govt.chinadaily.com.cn/s/202008/26/WS5f4603c0498ed1e2f3408d41/south-sudan-inaugurates-china-aided-cancer-screening-facility.html";

// Burundi
const WHO_BI_2021 = "https://www.afro.who.int/node/14378";
const WHO_BI_2023 = "https://www.afro.who.int/node/17240";

// Namibia
const AFCRN_NA = "https://afcrn.org/index.php/membership/membership-list/125-nambiancr";

// Botswana
const AFCRN_BW = "https://afcrn.org/index.php/membership/membership-list/118-bncr";
const UN_BW = "https://botswana.un.org/en/243955-botswana-opens-its-first-public-radiotherapy-centre-iaea-support";
const BOMRA = "https://www.bomra.co.bw/";
const BOMRA_M = "https://www.bomra.co.bw/our-mandate/";
const MOH_BW = "https://www.moh.gov.bw/";

// Eritrea
const SHABAIT_HPV = "https://shabait.com/2022/11/22/cervical-cancer-vaccination-program-underway-nationwide/";
const SHABAIT_OROTTA = "https://shabait.com/2024/02/26/raising-awareness-and-promoting-prevention-to-reduce-the-cancer-burden/";
const ARCHEMED = "https://www.archemed.org/news/children-with-cancer-are-given-a-chance-at-life/?lang=en";

// Lesotho
const NAMIBIAN_LS = "https://investigations.namibian.com.na/lesothos-cancer-burden-and-its-soaring-costs/";
const BMSF_LS = "https://www.3blmedia.com/news/cancer-care-milestone-reached-lesotho";

// Eswatini
const AFCRN_SZ = "https://afcrn.org/index.php/membership/membership-list/146-eswatinincr";
const IMPACT_SZ = "https://www.iaea.org/sites/default/files/documents/review-missions/eswatini_-_2017_impact_review.pdf";
const EHOSPICE_SZ = "https://ehospice.com/africa_posts/the-role-of-south-to-south-partnerships-in-developing-cancer-services-in-africa/";

// Mauritius
const AFCRN_MU = "https://afcrn.org/index.php/membership/membership-list/103-mauritius";
const MOH_MU = "https://health.govmu.org/health/";
const MOH_MU_HOSP = "https://health.govmu.org/health/?page_id=5509";
const MOH_MU_INFRA = "https://health.govmu.org/health/?page_id=6991";
const MOH_MU_PCS = "https://health.govmu.org/health/?p=10581";
const ERES = "https://ennrevennsourir.org/";

export const institutionsCountriesEastSouthernAfrica: InstitutionInput[] = [
  // ---------------------------------------------------------------- Angola
  i({ id: "angola-ministry-of-health", name: "Ministério da Saúde, Angola", aka: ["MINSA", "Ministry of Health, Angola"],
    city: "Luanda", country: "AO", lat: -8.827, lng: 13.244, institutionType: "government", website: MINSA,
    tldr: "Angola's health ministry. It reports that cancer is treated at the national cancer institute in Luanda and at two newer public hospitals, and in 2026 it was building a new oncology centre with 148 beds in the capital.",
    summary: "The Ministério da Saúde is Angola's ministry of health. In a statement reported by Ver Angola in August 2026, the Ministry said the country has oncology services at the Instituto Angolano de Controlo do Câncer (IACC) and at hospitals including the Hospital Geral de Cacuaco \"Heróis de Kifangondo\" and the Complexo Hospitalar Pedro Maria Tonha \"Pedalé\", and that a new oncology centre, part of the third phase of the Cardinal Dom Alexandre do Nascimento cardiopulmonary hospital complex in Luanda, was 36 per cent built, with four floors and 148 beds. The same statement gives the IACC 70 inpatient beds and an average of 360 consultations a day. The medicines regulator, the Agência Reguladora de Medicamentos e Tecnologias de Saúde, replaced the Ministry's own national directorate of medicines and equipment in 2021. The coordinates are an approximate city point for Luanda.",
    programs: ["New oncology centre in Luanda (148 beds, under construction in 2026)"],
    // TODO: re-link iacc-angola (defined in the country deep dive, PR #395) once it merges.
    institutions: ["armed-angola", "hospital-geral-cacuaco", "complexo-hospitalar-pedale", "clinica-girassol"],
    links: [
      { label: "Ministério da Saúde de Angola", url: MINSA },
      VA_ONC_L,
    ] }),

  i({ id: "armed-angola", name: "Agência Reguladora de Medicamentos e Tecnologias de Saúde (ARMED)", aka: ["ARMED", "Angolan Medicines and Health Technologies Regulatory Agency"],
    city: "Luanda", country: "AO", lat: -8.827, lng: 13.244, institutionType: "government", website: "https://www.armed.gov.ao/",
    tldr: "Angola's medicines regulator, set up in 2021 to take over from the health ministry's own medicines directorate. It licenses, checks and controls medicines and health technologies.",
    summary: "Angola's Council of Ministers approved the creation of the Agência Reguladora de Medicamentos e Tecnologias de Saúde in 2021. The health minister said at the time that the Ministry's Direcção Nacional de Medicamentos e Equipamentos would be transformed into the agency, with all its assets and staff, and that this would align the sector with World Health Organization and African Union guidance. Its organic statute was approved by Presidential Decree 136/21 of 1 June 2021, and Joint Executive Decree 1/25 of 14 January 2025, from the ministries of finance and health, set the fees and charges for its services. Its website showed only a JavaScript application shell to a plain request in November 2026, so OnCo has not read its own account of its approval routes. The coordinates are an approximate city point for Luanda.",
    institutions: ["angola-ministry-of-health"],
    links: [
      { label: "Ver Angola: health minister on the new medicines regulatory agency (2021)", url: VA_ARMED },
      { label: "Joint Executive Decree 1/25 on ARMED fees, citing its statute in Presidential Decree 136/21 (lex.ao)", url: LEX_ARMED },
    ] }),

  i({ id: "clinica-girassol", name: "Clínica Girassol", aka: ["Girassol Clinic"],
    city: "Luanda", country: "AO", lat: -8.837, lng: 13.231, institutionType: "hospital", website: GIRASSOL,
    tldr: "A publicly owned hospital in Luanda belonging to the Sonangol group, open since 2008. It offers medical oncology with chemotherapy and hormone therapy, a breast clinic, and radiotherapy with two linear accelerators.",
    summary: "Clínica Girassol is a hospital in the Alvalade district of Luanda, publicly owned through Sonangol E.P. (99 per cent) and Sonangol Holdings (1 per cent), which began work on 4 September 2008 and has six medical centres and eleven medical posts in other provinces. Its specialty pages describe a medical oncology service planning and following systemic treatment (chemotherapy and hormone therapy), and a breast clinic working with a multidisciplinary group that includes radiotherapy, medical oncology, pathology, imaging and plastic surgery. IAEA DIRAC, with the entry updated in 2026, lists it with two linear accelerators, brachytherapy and a CT scanner. The coordinates are DIRAC's.",
    programs: ["Medical oncology (chemotherapy, hormone therapy)", "Radiotherapy (two linear accelerators in IAEA DIRAC)", "Brachytherapy", "Breast clinic with multidisciplinary group"],
    institutions: ["angola-ministry-of-health"], cancers: ["breast-cancer"],
    links: [
      { label: "Clínica Girassol: about the clinic", url: "https://clinicagirassol.co.ao/about/" },
      { label: "Clínica Girassol: medical specialties (oncology)", url: "https://clinicagirassol.co.ao/primary-health-care/" },
      { label: "Clínica Girassol: surgical specialties (breast clinic)", url: "https://clinicagirassol.co.ao/primary-health-care-2/" },
      DIRAC_L,
    ] }),

  i({ id: "hospital-geral-cacuaco", name: "Hospital Geral de Cacuaco \"Heróis de Kifangondo\"", aka: ["Cacuaco General Hospital", "Hospital Geral de Cacuaco"],
    city: "Cacuaco (Sequele), Luanda", country: "AO", lat: -8.891, lng: 13.49, institutionType: "hospital",
    tldr: "A public general hospital with 300 beds in Cacuaco, opened in 2024. It has a children's cancer unit with 34 beds that gives chemotherapy, and a radiotherapy machine.",
    summary: "The Hospital Geral de Cacuaco \"Heróis de Kifangondo\" is a 300-bed public hospital in the Sequele centrality of Cacuaco municipality, inaugurated by the President of the Republic in 2024. According to the Ministry of Health's statement reported in August 2026, it has integrated a paediatric oncology unit with 34 beds, with inpatient and day-hospital capacity for giving chemotherapy. IAEA DIRAC, with the entry updated in 2026, lists one linear accelerator, brachytherapy and a CT scanner there. The coordinates are DIRAC's.",
    programs: ["Paediatric oncology unit (34 beds, inpatient and day-hospital chemotherapy)", "Radiotherapy (one linear accelerator in IAEA DIRAC)", "Brachytherapy"],
    institutions: ["angola-ministry-of-health"],
    links: [VA_ONC_L, DIRAC_L] }),

  i({ id: "complexo-hospitalar-pedale", name: "Complexo Hospitalar General de Exército Pedro Maria Tonha \"Pedalé\"", aka: ["Pedalé Hospital Complex", "Complexo Hospitalar Pedalé"],
    city: "Luanda", country: "AO", lat: -8.882, lng: 13.199, institutionType: "hospital",
    tldr: "A hospital complex in Luanda that opened in September 2025 and added cancer care, radiotherapy and nuclear medicine to Angola's public network. It has two linear accelerators for radiotherapy.",
    summary: "The Complexo Hospitalar General de Exército Pedro Maria Tonha \"Pedalé\" in Luanda was inaugurated on 27 September 2025. The Ministry of Health's statement reported in August 2026 says it added oncology, radiotherapy and nuclear medicine services to the national network, with 3 tesla magnetic resonance imaging, computed tomography and linear accelerators for radiotherapy. IAEA DIRAC, with the entry updated in 2026, lists two linear accelerators and brachytherapy. The coordinates are DIRAC's.",
    programs: ["Radiotherapy (two linear accelerators in IAEA DIRAC)", "Brachytherapy", "Nuclear medicine", "Oncology"],
    institutions: ["angola-ministry-of-health"],
    links: [VA_ONC_L, DIRAC_L] }),

  // ---------------------------------------------------------------- Madagascar
  i({ id: "madagascar-ministry-of-public-health", name: "Ministère de la Santé Publique, Madagascar", aka: ["Ministry of Public Health, Madagascar"],
    city: "Antananarivo", country: "MG", lat: -18.91, lng: 47.526, institutionType: "government",
    tldr: "Madagascar's health ministry. The government asked the International Atomic Energy Agency to review the country's cancer services in 2014, and in 2024 the minister visited maintenance work on the cobalt radiotherapy machines at the capital's university hospital.",
    summary: "The Ministère de la Santé Publique is Madagascar's ministry of health. In late 2014 the Government asked the IAEA to carry out an imPACT review of the country's capacity for cancer control; the mission took place in August 2015, and the minister told it he had launched construction of a bunker for radiotherapy equipment at the university hospital in Ampefiloha. In October 2024 the minister visited maintenance work on the cobalt-60 radiotherapy machines of CHU Joseph Ravoahangy Andrianavalona at Befelatanana, which the Republic of India donated and maintains under a partnership running to 2025. L'Express de Madagascar reported in October 2023 that oncology services exist in the university hospitals of all six former provinces, so that patients can have chemotherapy there and travel to the capital only for radiotherapy. The Ministry's website (sante.gov.mg) did not answer in November 2026. The coordinates are an approximate city point for Antananarivo.",
    institutions: ["chu-jra-antananarivo", "polyclinique-ilafy", "fondation-akbaraly", "iaea"],
    links: [
      { label: "IAEA: imPACT review, Madagascar (August 2015, PDF)", url: IMPACT_MG },
      { label: "L'Express de Madagascar: cobalt therapy for twelve thousand patients (November 2024)", url: LEX_COBALT },
      { label: "L'Express de Madagascar: oncology services in all six provinces (October 2023)", url: LEX_PROV },
    ] }),

  i({ id: "chu-jra-antananarivo", name: "Centre Hospitalier Universitaire Joseph Ravoahangy Andrianavalona (CHU JRA)", aka: ["CHU JRA", "CHU-HJRA", "HJRA", "Joseph Ravoahangy Andrianavalona University Hospital"],
    city: "Antananarivo", country: "MG", lat: -18.879, lng: 47.508, institutionType: "hospital",
    tldr: "A public university hospital in Antananarivo with a cancer service and a cobalt radiotherapy centre that opened in 2021. About twelve thousand people with cancer had been treated at the radiotherapy centre by late 2024.",
    summary: "CHU Joseph Ravoahangy Andrianavalona is a public university hospital in Antananarivo. Its cobalt radiotherapy centre at Befelatanana, set up with cobalt-60 machines donated by the Republic of India, had treated twelve thousand people with cancer between February 2021 and the minister's visit of 31 October 2024, with fifteen to twenty patients a day treated with curative or palliative intent; India agreed preventive maintenance three times a year until 2025. IAEA DIRAC, with the entry last updated in 2022, lists one cobalt-60 unit and brachytherapy at CHU-HJRA and no CT scanner. The coordinates are DIRAC's.",
    programs: ["Cobalt-60 radiotherapy centre at Befelatanana (from February 2021)", "Brachytherapy", "Medical oncology"],
    institutions: ["madagascar-ministry-of-public-health"],
    links: [
      { label: "L'Express de Madagascar: cobalt therapy for twelve thousand patients (November 2024)", url: LEX_COBALT },
      DIRAC_L,
    ] }),

  i({ id: "polyclinique-ilafy", name: "Polyclinique d'Ilafy", aka: ["Polyclinique Ilafy", "Ilafy Polyclinic"],
    city: "Antananarivo", country: "MG", lat: -18.855, lng: 47.55, institutionType: "hospital",
    tldr: "A private hospital in Antananarivo whose radiotherapy service, with two linear accelerators, has treated patients since March 2015. It also offers cancer surgery and chemotherapy.",
    summary: "The Polyclinique d'Ilafy is a private hospital at Ilafy, Antananarivo. Its radiotherapy and quality staff reported in Cancer/Radiothérapie (2019) that after Madagascar's previous radiotherapy service stopped in 2009 for safety reasons, a private entrepreneur, with the agreement of Malagasy radiation oncologists, created a new service that has worked since March 2015, with two twin linear accelerators, a CT scanner shared with radiology, a treatment planning system, and a team of four radiographers, two medical physicists and four radiation oncologists. Newsmada reported in February 2023 that the polyclinic diagnoses cancer and treats it by surgery, radiotherapy and chemotherapy. IAEA DIRAC, with the entry last updated in 2019, lists two linear accelerators and a CT scanner. The coordinates are DIRAC's.",
    programs: ["Radiotherapy (two linear accelerators, from March 2015)", "Cancer surgery", "Chemotherapy"],
    institutions: ["madagascar-ministry-of-public-health"],
    links: [
      { label: "Aletti et al., Contrôles de qualité et certification dans le premier service de radiothérapie avec accélérateurs de Madagascar (Cancer/Radiothérapie 2019)", url: ILAFY_PAPER },
      { label: "Newsmada: Polyclinique d'Ilafy and cancer care (February 2023)", url: ILAFY_NEWS },
      DIRAC_L,
    ] }),

  i({ id: "fondation-akbaraly", name: "Fondation Akbaraly", aka: ["Akbaraly Foundation", "4aWoman"],
    city: "Antananarivo", country: "MG", lat: -18.91, lng: 47.526, institutionType: "consortium", website: AKB,
    tldr: "A foundation in Madagascar whose women's health project screens for and treats cervical and breast cancer at early stages, at centres in Antananarivo, Fianarantsoa and Mahajanga and with a mobile unit.",
    summary: "The Fondation Akbaraly is an associate member of UICC with its office in Antananarivo. Its 4aWoman project aims to provide primary and secondary prevention, early diagnosis and treatment of women's cancers, with three health centres (the Kintana Center in Antananarivo, the Rex Center in Fianarantsoa and Candide Hospital in Mahajanga), a mobile unit with telemedicine and a hospital network across the country. Its website reports more than 100,000 uterine cancer prevention and early diagnosis interventions and more than 110,000 for breast cancer, and says its research has been presented at conferences of AORTIC and UICC. The coordinates are an approximate city point for Antananarivo.",
    programs: ["4aWoman: prevention, early diagnosis and treatment of women's cancers", "Mobile unit with telemedicine"],
    institutions: ["madagascar-ministry-of-public-health", "uicc"], cancers: ["cervical", "breast-cancer"],
    links: [
      { label: "Fondation Akbaraly", url: AKB },
      { label: "Fondation Akbaraly: what we do and where", url: AKB_WW },
      UICC("fondation-akbaraly", "Fondation Akbaraly"),
    ] }),

  // ---------------------------------------------------------------- Somalia
  i({ id: "somalia-ministry-of-health", name: "Ministry of Health and Human Services, Federal Republic of Somalia", aka: ["Federal Ministry of Health and Human Services", "Ministry of Health, Somalia", "Wasaaradda Caafimaadka"],
    city: "Mogadishu", country: "SO", lat: 2.035, lng: 45.342, institutionType: "government", website: MOH_SO,
    tldr: "Somalia's health ministry, which leads national cancer control. It says it is writing the country's first national cancer control plan for 2026 to 2030 and setting up a national cancer registry.",
    summary: "The Federal Ministry of Health is a full member of UICC. Its UICC profile, updated in July 2026, describes it as the national lead agency for cancer control through a National Cancer Control Program, developing the first National Cancer Control Plan (2026 to 2030), establishing the national cancer registry, coordinating partnerships with WHO, IAEA and UICC, training oncologists, pathologists and radiotherapy professionals, and promoting early screening for breast, cervical and colorectal cancer. The Ministry's own page on medicines regulation says that Somalia does not yet have a functioning National Medicines Regulatory Authority: a bill was endorsed by the cabinet in 2019, but product evaluation and registration, import control, inspection and pharmacovigilance are not carried out. The coordinates are an approximate city point for Mogadishu.",
    programs: ["National Cancer Control Program", "National Cancer Control Plan 2026 to 2030 (in development)", "National cancer registry (being established)"],
    institutions: ["erdogan-hospital-mogadishu", "oasis-cancer-hospital-mogadishu", "uicc", "who", "iaea"], cancers: ["breast-cancer", "cervical"],
    links: [
      UICC("ministry-health-somalia", "Ministry of Health, Somalia"),
      { label: "Ministry of Health: National Medicine Regulatory Authority", url: MOH_SO_NMRA },
    ] }),

  i({ id: "erdogan-hospital-mogadishu", name: "Somalia Turkey Recep Tayyip Erdoğan Training and Research Hospital", aka: ["Erdoğan Hospital", "Digfer Hospital", "Somalia Turkey Recep Tayyip Erdogan Education and Research Hospital"],
    city: "Mogadishu", country: "SO", lat: 2.042, lng: 45.304, institutionType: "hospital",
    tldr: "A public teaching and research hospital in Mogadishu. A study of its pathology records from 2017 to 2020 found cancer of the gullet to be the commonest cancer among 1,306 patients.",
    summary: "The Somalia Turkey Recep Tayyip Erdoğan Training and Research Hospital in Mogadishu. A retrospective study by its staff, whose affiliation is given as the University of Health Sciences, in Cancer Management and Research (2020) reviewed 5,238 pathology reports from 2017 to 2020 and included 1,306 confirmed cancers: oesophageal cancer was the commonest overall (21.7 per cent, 91.1 per cent of them squamous cell carcinoma), followed by liver cancer (7.6 per cent), breast cancer (7.3 per cent) and cervical cancer (6.7 per cent); 5.1 per cent of patients were under 18. OnCo did not find a primary source describing the hospital's current cancer treatment services. The coordinates are the OpenStreetMap point for the hospital.",
    institutions: ["somalia-ministry-of-health"], cancers: ["breast-cancer", "cervical"],
    links: [
      { label: "Cancer incidence and distribution at a tertiary care hospital in Somalia from 2017 to 2020 (Cancer Management and Research 2020)", url: SO_PAPER },
      { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/33061565/" },
    ] }),

  i({ id: "oasis-cancer-hospital-mogadishu", name: "Oasis Cancer Hospital", aka: ["Oasis Cancer Hospital Mogadishu"],
    city: "Mogadishu", country: "SO", lat: 2.035, lng: 45.342, institutionType: "cancer-center",
    tldr: "A cancer hospital in Mogadishu that led a public cancer awareness programme in 2024, backed by the federal government, to encourage people to seek help earlier.",
    summary: "The Star (Kenya) reported in August 2024 that Somalia's federal government had stepped up cancer awareness with a programme in Mogadishu led by the Oasis Cancer Hospital, founded by Dr Abdirahim Mohamed Ali after returning from London. Its chief executive said most people seek treatment only when cancer is advanced and that poverty is a barrier. OnCo found no website for the hospital and no source describing its treatment services, so none are listed. The coordinates are an approximate city point for Mogadishu.",
    institutions: ["somalia-ministry-of-health"],
    links: [{ label: "The Star: Somalia steps up fight against cancer with awareness programme (August 2024)", url: STAR_SO }] }),

  // ---------------------------------------------------------------- South Sudan
  i({ id: "south-sudan-ministry-of-health", name: "Ministry of Health, Republic of South Sudan", aka: ["Ministry of Health, South Sudan", "MoH South Sudan"],
    city: "Juba", country: "SS", lat: 4.846, lng: 31.596, institutionType: "government", website: MOH_SS,
    tldr: "South Sudan's health ministry. It has set up a cancer department and treatment protocols, and plans an oncology unit at Juba Teaching Hospital.",
    summary: "The Ministry of Health of the Republic of South Sudan lists among its commissions a Drugs and Food Control Authority, whose page carried no content beyond its name in November 2026. At the launch of the South Sudan Cancer Network on 4 February 2026, reported by The Radio Community, the health minister said 85 per cent of the health budget comes from donors, and the ministry was reported to have established a cancer department and developed protocols, with plans to open an oncology unit at Juba Teaching Hospital and eventually a comprehensive cancer centre; the WHO representative said cancer accounts for 7 per cent of deaths in the country. The coordinates are an approximate city point for Juba.",
    programs: ["Cancer department and treatment protocols", "Planned oncology unit at Juba Teaching Hospital"],
    institutions: ["juba-teaching-hospital", "south-sudan-cancer-network"],
    links: [
      { label: "Ministry of Health, Republic of South Sudan", url: MOH_SS },
      { label: "The Radio Community: South Sudan launches Cancer Network (February 2026)", url: TRC_SS },
    ] }),

  i({ id: "juba-teaching-hospital", name: "Juba Teaching and Referral Hospital", aka: ["Juba Teaching Hospital", "JTH"],
    city: "Juba", country: "SS", lat: 4.85, lng: 31.608, institutionType: "hospital",
    tldr: "South Sudan's main referral hospital in Juba. It opened a cervical cancer screening centre in 2020, and the health ministry plans an oncology unit there.",
    summary: "Juba Teaching and Referral Hospital is described by China Daily as South Sudan's main referral hospital. A cervical cancer screening centre built with Chinese government support opened there on 25 August 2020; its director said it would serve screening and, he hoped, treatment. In February 2026 the Ministry of Health was reported to be planning an oncology unit at the hospital, with a comprehensive cancer centre as the eventual goal. The coordinates are the OpenStreetMap point for the hospital.",
    programs: ["Cervical cancer screening centre (from August 2020)", "Oncology unit (planned)"],
    institutions: ["south-sudan-ministry-of-health"], cancers: ["cervical"],
    links: [
      { label: "China Daily: South Sudan inaugurates China-aided cancer screening facility (August 2020)", url: CD_SS },
      { label: "The Radio Community: South Sudan launches Cancer Network (February 2026)", url: TRC_SS },
    ] }),

  i({ id: "south-sudan-cancer-network", name: "South Sudan Cancer Network", aka: ["Cancer Network South Sudan"],
    city: "Juba", country: "SS", lat: 4.846, lng: 31.596, institutionType: "consortium",
    tldr: "A national network launched in Juba on World Cancer Day 2026 to coordinate earlier detection and better treatment of cancer across South Sudan.",
    summary: "The South Sudan Cancer Network was launched in Juba on 4 February 2026, World Cancer Day, with government officials, health partners and civil society. Its vice president said it will coordinate nationwide efforts to detect cancer early and improve treatment outcomes; the Governor of Central Equatoria State pledged land in Yei County for cancer services and called for a cancer registry. The coordinates are an approximate city point for Juba.",
    institutions: ["south-sudan-ministry-of-health"],
    links: [{ label: "The Radio Community: South Sudan launches Cancer Network (February 2026)", url: TRC_SS }] }),

  // ---------------------------------------------------------------- Burundi
  i({ id: "cmck-bujumbura", name: "Centre Médico-Chirurgical de Kinindo (CMCK)", aka: ["CMCK", "Kinindo Medical and Surgical Centre"],
    city: "Bujumbura", country: "BI", lat: -3.417, lng: 29.357, institutionType: "hospital",
    tldr: "A private hospital in Bujumbura whose cancer unit, opened in 2020, gives chemotherapy to adults and children. It has no radiotherapy, so patients who can afford it go to Rwanda or Kenya.",
    summary: "The Centre Médico-Chirurgical de Kinindo is a private hospital in the south of Bujumbura. Its cancer unit began work in June 2020 under the oncologist Dr Alexis Manirakiza; when the health minister and the WHO representative visited in April 2021 it had received 379 patients with 26 types of cancer, 137 still in treatment. WHO Africa reported in February 2023 that its oncology service had received 1,427 patients, 467 of them diagnosed with cancer (75 children); breast cancer was the commonest in adults (159 cases), and 62 per cent of those women arrived at stage 4. It offers chemotherapy with curative or palliative intent but no radiotherapy, and patients who can pay are referred to Rwanda or Kenya; a doctor there described it to WHO as the country's reference centre for cancer care while the government's planned cancer treatment centre is awaited. WHO's country office gave it a laminar flow hood in 2022. The coordinates are the OpenStreetMap point for the hospital.",
    programs: ["Cancer unit (from June 2020): chemotherapy for adults and children"],
    institutions: ["abspa-burundi", "kenyera-burundi", "who"], cancers: ["breast-cancer"],
    links: [
      { label: "WHO Africa: minister and WHO representative visit the CMCK cancer unit (April 2021)", url: WHO_BI_2021 },
      { label: "WHO Africa: Pour combattre le cancer, il faut le dépister tôt (February 2023)", url: WHO_BI_2023 },
    ] }),

  i({ id: "abspa-burundi", name: "Association Burundaise de Soins Palliatifs (ABSPA)", aka: ["ABSPA", "Burundi Palliative Care Association"],
    city: "Bujumbura", country: "BI", lat: -3.364, lng: 29.368, institutionType: "consortium",
    tldr: "Burundi's national palliative care association, registered in 2023. It works to bring pain relief and end-of-life care, including for people with cancer, into the country's health system.",
    summary: "The Association Burundaise de Soins Palliatifs is a full member of UICC. Its UICC profile says it was registered under Ministerial Ordinance 530/750 of 29 June 2023 as a national organisation promoting, developing and integrating palliative care in Burundi's health system, in the face of rising non-communicable diseases including cancer, working with public institutions, health facilities, universities and communities. The coordinates are an approximate city point for Bujumbura.",
    programs: ["Palliative care advocacy and integration into the health system"],
    institutions: ["cmck-bujumbura", "uicc"],
    links: [UICC("association-burundaise-de-soins-palliatifs-abspa", "Association Burundaise de Soins Palliatifs (ABSPA)")] }),

  i({ id: "kenyera-burundi", name: "Kenyera", aka: ["Kenyera Non-Governmental Organization"],
    city: "Bujumbura", country: "BI", lat: -3.364, lng: 29.368, institutionType: "consortium",
    tldr: "A Burundian charity that screens women for cervical and breast cancer, treats early changes in the cervix before they become cancer, and gives palliative care.",
    summary: "Kenyera is an associate member of UICC based in Bujumbura. Its UICC profile says it works on cancer control through awareness, capacity building, screening and treatment of precancerous cervical lesions, provides palliative care to patients with cervical and breast cancer, and has taken part in cervical and breast cancer screening and treatment activities with local administrations and the Ministry of Health. The coordinates are an approximate city point for Bujumbura.",
    programs: ["Cervical and breast cancer screening", "Treatment of precancerous cervical lesions", "Palliative care"],
    institutions: ["cmck-bujumbura", "uicc"], cancers: ["cervical", "breast-cancer"],
    links: [UICC("kenyera-non-governmental-organization", "Kenyera Non-Governmental Organization")] }),

  // ---------------------------------------------------------------- Namibia
  i({ id: "namibia-ministry-of-health", name: "Ministry of Health and Social Services, Namibia", aka: ["MoHSS", "Ministry of Health, Namibia"],
    city: "Windhoek", country: "NA", lat: -22.534, lng: 17.045, institutionType: "government",
    tldr: "Namibia's health ministry. Its Windhoek Central Hospital houses the public cancer centre, and it works with the Cancer Association of Namibia, which runs the national cancer registry.",
    summary: "The Ministry of Health and Social Services runs Namibia's state hospitals. The African Cancer Registry Network's undated page on the Namibian registry describes the ministry's oncology clinic taking part in founding the registry in 1995, the Dr A.B. May Cancer Care Centre within the state Central Hospital in Windhoek, a cancer centre at Oshakati Intermediate Hospital, and the state National Institute of Pathology; it says the registry and the Cancer Association were asking the ministry to make cancer a reportable disease. The ministry's website (mhss.gov.na) refused a plain request in November 2026. The coordinates are an approximate city point for Windhoek.",
    institutions: ["windhoek-central-hospital-oncology", "namibia-national-cancer-registry", "namibia-oncology-centre", "cancer-association-of-namibia"],
    links: [{ label: "African Cancer Registry Network: Namibian National Cancer Registry", url: AFCRN_NA }] }),

  i({ id: "windhoek-central-hospital-oncology", name: "Dr A.B. May Cancer Care Centre, Windhoek Central Hospital", aka: ["Windhoek Central Hospital, Radiation Oncology Department", "Dr AB May Cancer Care Centre"],
    city: "Windhoek", country: "NA", lat: -22.551, lng: 17.075, institutionType: "cancer-center",
    tldr: "The public cancer centre at Windhoek Central Hospital, where state patients with cancer are assessed and treated. It has two cobalt radiotherapy machines and brachytherapy.",
    summary: "The Dr A.B. May Cancer Care Centre is part of Windhoek Central Hospital, one of Namibia's two large state hospitals. The African Cancer Registry Network's page says that cancer patients, private or state, are supposed to be sent to it or to the Namibia Oncology Centre for assessment and possible treatment, that its admissions nurses complete the registry's forms, and that its staff help the registry with data input. IAEA DIRAC, with the entry updated in 2024, lists the hospital's radiation oncology department with two cobalt-60 units, brachytherapy and a CT scanner. The coordinates are DIRAC's.",
    programs: ["Radiotherapy (two cobalt-60 units in IAEA DIRAC)", "Brachytherapy"],
    institutions: ["namibia-ministry-of-health", "namibia-national-cancer-registry"],
    links: [{ label: "African Cancer Registry Network: Namibian National Cancer Registry", url: AFCRN_NA }, DIRAC_L] }),

  i({ id: "namibia-oncology-centre", name: "Namibia Oncology Centre (NOC)", aka: ["NOC", "Namibia Oncology Centre Windhoek"],
    city: "Windhoek", country: "NA", lat: -22.544, lng: 17.086, institutionType: "cancer-center",
    tldr: "A private cancer treatment centre in Windhoek, opened in 2015, with a radiotherapy machine. Together with the public centre at Windhoek Central Hospital it is where Namibia's cancer patients are referred.",
    summary: "The African Cancer Registry Network's page on the Namibian registry says the Namibia Oncology Centre, a specialised private cancer treatment facility, opened in 2015, and that it is one of the two places, with the Dr A.B. May Cancer Care Centre, where registry data are primarily collected. IAEA DIRAC, with the entry last updated in 2018, lists one linear accelerator and a CT scanner in the Eros district of Windhoek. Its website did not answer in November 2026. The coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator in IAEA DIRAC)"],
    institutions: ["namibia-national-cancer-registry", "namibia-ministry-of-health"],
    links: [{ label: "African Cancer Registry Network: Namibian National Cancer Registry", url: AFCRN_NA }, DIRAC_L] }),

  i({ id: "namibia-national-cancer-registry", name: "Namibian National Cancer Registry", aka: ["NNCR", "Namibia National Cancer Registry"],
    city: "Windhoek", country: "NA", lat: -22.534, lng: 17.045, institutionType: "research-institute", website: AFCRN_NA,
    tldr: "Namibia's population-based cancer registry, run from the offices of the Cancer Association of Namibia in Windhoek. It records cancers across the whole country from pathology reports and the two main cancer centres.",
    summary: "The African Cancer Registry Network's undated page says the Namibian National Cancer Registry began in 1995, when the Rössing Uranium mine, the Ministry of Health's oncology clinic and the Cancer Association of Namibia collected all cancers reported to the Windhoek state pathology laboratory and the one private laboratory from 1979 to 1994; active registration of pathology and clinical cases then began in four sentinel regions. It is population-based, covering all of Namibia (2,104,900 people at the 2011 census), and is based at and largely funded by the Cancer Association of Namibia, with some costs met, the page says, by the International Association of Cancer Registries and the African Cancer Registry Network; cases diagnosed in South Africa are re-routed to it through a network of registries technically supported by IARC. Cases come mainly from the Dr A.B. May Cancer Care Centre, the Namibia Oncology Centre and pathology reports, with copies of death certificates available from 2016; the page notes there is no active case finding. Data moved from CanReg4 to CanReg5 in 2010. The coordinates are an approximate city point for Windhoek.",
    programs: ["Population-based cancer registration for Namibia", "African Cancer Registry Network member registry"],
    institutions: ["cancer-association-of-namibia", "windhoek-central-hospital-oncology", "namibia-oncology-centre", "namibia-ministry-of-health", "iarc"], related: ["cancer-registries-surveillance"],
    links: [{ label: "African Cancer Registry Network: Namibian National Cancer Registry", url: AFCRN_NA }, AFCRN_L] }),

  i({ id: "zuzu-holding-hands-cancer-foundation", name: "Zuzu Holding Hands Cancer Foundation", aka: ["Zuzu Holding Hands"],
    city: "Windhoek", country: "NA", lat: -22.534, lng: 17.045, institutionType: "consortium",
    tldr: "A community charity in Windhoek that teaches people about cancer prevention and screening, especially where awareness is low, and gives emotional support to patients and carers.",
    summary: "The Zuzu Holding Hands Cancer Foundation is a full member of UICC based in Shandumbala, Windhoek. Its UICC profile describes a grassroots organisation working on community awareness of prevention, early detection and screening, particularly in underserved areas, emotional support for patients and caregivers, and advocacy, working alongside the Cancer Association of Namibia. The coordinates are an approximate city point for Windhoek.",
    programs: ["Community cancer awareness", "Patient and caregiver support"],
    institutions: ["cancer-association-of-namibia", "uicc"],
    links: [UICC("zuzu-holding-hands-cancer-foundation", "Zuzu Holding Hands Cancer Foundation")] }),

  // ---------------------------------------------------------------- Botswana
  i({ id: "botswana-ministry-of-health", name: "Ministry of Health, Botswana", aka: ["Ministry of Health and Wellness, Botswana", "MoH Botswana"],
    city: "Gaborone", country: "BW", lat: -24.658, lng: 25.909, institutionType: "government", website: MOH_BW,
    tldr: "Botswana's health ministry. It runs all public health facilities, keeps the national cancer registry, and opened the country's public radiotherapy centre in 2023.",
    summary: "The African Cancer Registry Network's page on Botswana says all public health facilities are under the Ministry of Health, which set up the national cancer registry in 1999 within its Non-Communicable Diseases Programme in the Department of Public Health. The minister, Edwin Dikoloti, opened the radiotherapy centre at Sir Ketumile Masire Teaching Hospital on 27 July 2023. The Botswana Medicines Regulatory Authority is a statutory body under the ministry. The coordinates are an approximate city point for Gaborone.",
    institutions: ["botswana-national-cancer-registry", "sir-ketumile-masire-teaching-hospital", "bomra-botswana", "gaborone-private-hospital", "village-oncology-gaborone", "cancer-association-of-botswana"],
    links: [
      { label: "Ministry of Health, Botswana", url: MOH_BW },
      { label: "African Cancer Registry Network: Botswana National Cancer Registry", url: AFCRN_BW },
      { label: "UN in Botswana: public radiotherapy centre opens with IAEA support (August 2023)", url: UN_BW },
    ] }),

  i({ id: "botswana-national-cancer-registry", name: "Botswana National Cancer Registry (BNCR)", aka: ["BNCR"],
    city: "Gaborone", country: "BW", lat: -24.658, lng: 25.909, institutionType: "research-institute", website: AFCRN_BW,
    tldr: "Botswana's population-based cancer registry, run by the Ministry of Health since 1999. It collects cancer cases from hospitals, laboratories, death certificates and oncology clinics across the country.",
    summary: "The African Cancer Registry Network's page says the Ministry of Health set up the Botswana National Cancer Registry in 1999, with help from the International Association of Cancer Registries, to measure cancer incidence and its distribution, identify risk factors and evaluate cancer control. Its first report, in 2005, counted 2,000 malignant cancers registered from 1986 to 2004 (56.7 per cent in women), and the page gives more than 16,000 cases by 2012. It is population-based, collecting cases from referral and district hospitals through notification, laboratory and death certificate forms, hospital discharge abstracts, the Integrated Patient Management System and interviews in oncology clinics, and is staffed within the Non-Communicable Diseases Programme. The coordinates are an approximate city point for Gaborone.",
    programs: ["Population-based cancer registration for Botswana (from 1999)", "African Cancer Registry Network member registry"],
    institutions: ["botswana-ministry-of-health"], related: ["cancer-registries-surveillance"],
    links: [{ label: "African Cancer Registry Network: Botswana National Cancer Registry", url: AFCRN_BW }, AFCRN_L] }),

  i({ id: "sir-ketumile-masire-teaching-hospital", name: "Sir Ketumile Masire Teaching Hospital (SKMTH)", aka: ["SKMTH", "Sir Ketumile Masire Teaching Hospital Gaborone"],
    city: "Gaborone", country: "BW", lat: -24.628, lng: 25.923, institutionType: "hospital",
    tldr: "A public teaching hospital in Gaborone whose radiotherapy centre, opened in 2023 with help from the International Atomic Energy Agency, treats cancer patients from Botswana and neighbouring countries.",
    summary: "The radiotherapy centre at Sir Ketumile Masire Teaching Hospital in Gaborone was opened by the Minister of Health, Edwin Dikoloti, on 27 July 2023, with IAEA support including its Rays of Hope initiative; the UN in Botswana described it as the country's first public radiotherapy centre. The minister said it would reduce government spending on cancer care abroad and waiting times, and serve patients from Zambia, Zimbabwe, Lesotho, Mozambique and elsewhere, as well as teaching and research. IAEA DIRAC, with the entry updated in 2025, lists one linear accelerator and brachytherapy. The coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator in IAEA DIRAC, from July 2023)", "Brachytherapy"],
    institutions: ["botswana-ministry-of-health", "iaea"],
    links: [{ label: "UN in Botswana: Botswana opens its first public radiotherapy centre, with IAEA support (August 2023)", url: UN_BW }, DIRAC_L] }),

  i({ id: "gaborone-private-hospital", name: "Life Gaborone Private Hospital", aka: ["Gaborone Private Hospital", "Lifehealthcare Gaborone"],
    city: "Gaborone", country: "BW", lat: -24.629, lng: 25.934, institutionType: "hospital",
    tldr: "A private hospital in Gaborone with radiotherapy and brachytherapy. The Cancer Association of Botswana houses patients from elsewhere in the country while they are treated there.",
    summary: "IAEA DIRAC, with the entry last updated in 2022, lists Lifehealthcare Gaborone (Gaborone Private Hospital) on Mica Way with one linear accelerator, brachytherapy and a CT scanner. The Cancer Association of Botswana's UICC profile says its Tshiamo House gives temporary accommodation, care and meals to patients while they receive treatment at Princess Marina Hospital and Gaborone Private Hospital. The coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator in IAEA DIRAC)", "Brachytherapy"],
    institutions: ["botswana-ministry-of-health", "cancer-association-of-botswana"],
    links: [DIRAC_L, UICC("cancer-association-botswana", "Cancer Association of Botswana")] }),

  i({ id: "village-oncology-gaborone", name: "Village Oncology", aka: ["Village Oncology Gaborone"],
    city: "Gaborone", country: "BW", lat: -24.669, lng: 25.936, institutionType: "cancer-center",
    tldr: "A radiotherapy centre in Gaborone listed by the International Atomic Energy Agency with one linear accelerator and brachytherapy.",
    summary: "IAEA DIRAC, with the entry updated in 2026, lists Village Oncology on Maratadiba Road, Gaborone, with one linear accelerator, brachytherapy and a CT scanner. OnCo found no website or other primary source for it (the domain villageoncology.com is parked), so nothing else is stated here. The coordinates are DIRAC's.",
    programs: ["Radiotherapy (one linear accelerator in IAEA DIRAC)", "Brachytherapy"],
    institutions: ["botswana-ministry-of-health"],
    links: [DIRAC_L] }),

  i({ id: "bomra-botswana", name: "Botswana Medicines Regulatory Authority (BoMRA)", aka: ["BoMRA"],
    city: "Gaborone", country: "BW", lat: -24.658, lng: 25.909, institutionType: "government", website: BOMRA,
    tldr: "Botswana's medicines regulator, which checks that medicines, medical devices and cosmetics, including cancer medicines, are safe, effective and of good quality.",
    summary: "The Botswana Medicines Regulatory Authority is a corporate body established through the Medicines and Related Substances Act of 2013, strengthened and re-enacted in 2025; its website says it was established in 2018 as a statutory body under the Ministry of Health. Its mandate is to ensure the safety, efficacy and quality of medical products and cosmetics for human and veterinary use, and it regulates medicines, medical devices and cosmetics. Its head office is at the Gaborone International Finance Park. The coordinates are an approximate city point for Gaborone.",
    programs: ["Registration and regulation of medicines, medical devices and cosmetics"],
    institutions: ["botswana-ministry-of-health"],
    links: [{ label: "BoMRA: our mandate", url: BOMRA_M }] }),

  i({ id: "cancer-association-of-botswana", name: "Cancer Association of Botswana (CAB)", aka: ["CAB"],
    city: "Gaborone", country: "BW", lat: -24.658, lng: 25.909, institutionType: "consortium",
    tldr: "A Botswana charity that raises awareness of cancer, gives patients a place to stay, meals and transport during treatment in Gaborone, and offers free counselling and home visits by survivors.",
    summary: "The Cancer Association of Botswana is an associate member of UICC. Its UICC profile lists awareness programmes; Tshiamo House, an interim care home giving temporary accommodation, medical care and meals to patients receiving treatment at Princess Marina Hospital and Gaborone Private Hospital; transport to hospital; free confidential counselling and telephone and home follow-up; and Reach for Recovery, in which survivors visit patients at home. The coordinates are an approximate city point for Gaborone.",
    programs: ["Tshiamo House interim care home", "Patient transport", "Counselling and after-care", "Reach for Recovery"],
    institutions: ["gaborone-private-hospital", "botswana-ministry-of-health", "uicc"],
    links: [UICC("cancer-association-botswana", "Cancer Association of Botswana")] }),

  // ---------------------------------------------------------------- Eritrea
  i({ id: "eritrea-ministry-of-health", name: "Ministry of Health, Eritrea", aka: ["MoH Eritrea"],
    city: "Asmara", country: "ER", lat: 15.339, lng: 38.933, institutionType: "government",
    tldr: "Eritrea's health ministry. It began a nationwide vaccination programme against cervical cancer for girls aged 9 to 14 in November 2022 and runs cervical cancer awareness campaigns in schools.",
    summary: "Eritrea's Ministry of Information reported that the Ministry of Health began a nationwide cervical cancer vaccination programme on 21 November 2022, at 1,382 schools, more than 300 health facilities, 250 temporary centres and 60 mobile facilities, expecting to vaccinate 300,000 girls aged 9 to 14. In February 2024 the Ministry, with the Ministry of Education, held a cervical cancer lecture for secondary school students at Orotta Referral Hospital. The Ministry's website (moh.gov.er) did not answer in November 2026. The coordinates are an approximate city point for Asmara.",
    programs: ["National HPV vaccination programme (from November 2022)", "Cervical cancer awareness in schools"],
    institutions: ["orotta-referral-hospital"], cancers: ["cervical"],
    links: [
      { label: "Shabait: cervical cancer vaccination program underway nationwide (November 2022)", url: SHABAIT_HPV },
      { label: "Shabait: raising awareness and promoting prevention to reduce the cancer burden (February 2024)", url: SHABAIT_OROTTA },
    ] }),

  i({ id: "orotta-referral-hospital", name: "Orotta National Referral Hospital", aka: ["Orotta Referral Hospital", "Orotta Hospital", "Orota Hospital"],
    city: "Asmara", country: "ER", lat: 15.339, lng: 38.933, institutionType: "hospital",
    tldr: "Eritrea's national referral hospital in Asmara. Its children's hospital opened a cancer unit for children in February 2025, with training from a German team.",
    summary: "Orotta Referral Hospital in Asmara is described by Eritrea's Ministry of Information as the country's largest medical facility. A paediatric oncology unit opened in a renovated section of its children's hospital on 13 February 2025, led by Prof. Uta Dirksen of University Hospital Essen with the German charity Archemed and support from the RTL Foundation; Archemed estimates that about 500 children are diagnosed with cancer in Eritrea each year, and says the German team trains doctors and nurses there. The coordinates are an approximate city point for Asmara.",
    programs: ["Paediatric oncology unit (from February 2025)"],
    institutions: ["eritrea-ministry-of-health", "essen-wtz"],
    links: [
      { label: "Archemed: children with cancer are given a chance at life (March 2025)", url: ARCHEMED },
      { label: "Shabait: raising awareness and promoting prevention to reduce the cancer burden (February 2024)", url: SHABAIT_OROTTA },
    ] }),

  // ---------------------------------------------------------------- Lesotho
  i({ id: "lesotho-ministry-of-health", name: "Ministry of Health, Lesotho", aka: ["MoH Lesotho"],
    city: "Maseru", country: "LS", lat: -29.31, lng: 27.478, institutionType: "government",
    tldr: "Lesotho's health ministry. The health minister said in 2025 that Lesotho pays for people with cancer to be treated in Bloemfontein, South Africa, including radiotherapy, at about 250,000 maloti a patient.",
    summary: "The Namibian's investigative unit reported in March 2025 that the health minister, Selibe Mochoboroane, said Lesotho pays M250,000 per patient for cancer treatment, including radiotherapy, in Bloemfontein, South Africa, and that the ministry's principal secretary said in a June 2024 affidavit, in a dispute over a tender for a cancer treatment facility, that the treatment debt to South African hospitals stood at M148 million and had not been paid. Chemotherapy is given in Lesotho at the Senkatana Oncology Clinic in Maseru. The ministry's website (health.gov.ls) did not answer in November 2026. The coordinates are an approximate city point for Maseru.",
    institutions: ["senkatana-oncology-clinic", "action-against-cancer-lesotho"],
    links: [{ label: "The Namibian: Lesotho's cancer burden and its soaring costs (March 2025)", url: NAMIBIAN_LS }] }),

  i({ id: "senkatana-oncology-clinic", name: "Senkatana Oncology Clinic", aka: ["Senkatana Centre of Excellence", "Senkatana"],
    city: "Maseru", country: "LS", lat: -29.31, lng: 27.478, institutionType: "cancer-center",
    tldr: "A cancer clinic in Maseru, set up in 2020 with funding from the Bristol Myers Squibb Foundation, where chemotherapy was first given inside Lesotho in July 2022. More complex treatment is in Bloemfontein, South Africa.",
    summary: "The Senkatana Oncology Clinic is at the Botshabelo complex in Maseru. The Namibian reported in March 2025 that it was established in 2020 with Bristol Myers Squibb Foundation Global Cancer Disparities funding and that patients needing more complex treatment are transported to Bloemfontein. The foundation reported that the first chemotherapy infusion given within Lesotho was given at Senkatana in July 2022, and that it provides in-service training for pharmacists and oncology nurses there. The coordinates are an approximate city point for Maseru.",
    programs: ["Chemotherapy (from July 2022)"],
    institutions: ["lesotho-ministry-of-health"],
    links: [
      { label: "Bristol Myers Squibb Foundation via 3BL Media: cancer care milestone reached in Lesotho (December 2022)", url: BMSF_LS },
      { label: "The Namibian: Lesotho's cancer burden and its soaring costs (March 2025)", url: NAMIBIAN_LS },
    ] }),

  i({ id: "action-against-cancer-lesotho", name: "Action Against Cancer Association", aka: ["Action Against Cancer Association Lesotho"],
    city: "Butha-Buthe", country: "LS", lat: -28.767, lng: 28.25, institutionType: "consortium",
    tldr: "A Lesotho charity based in Butha-Buthe that runs cancer awareness campaigns and screening, supports patients, and campaigns for better cancer care.",
    summary: "The Action Against Cancer Association is a full member of UICC based in Butha-Buthe. Its UICC profile lists awareness campaigns, screening programmes, patient support and advocacy, aimed at reducing the cancer burden in Lesotho. The coordinates are an approximate town point for Butha-Buthe.",
    programs: ["Awareness campaigns", "Screening programmes", "Patient support"],
    institutions: ["lesotho-ministry-of-health", "uicc"],
    links: [UICC("action-against-cancer-association", "Action Against Cancer Association")] }),

  // ---------------------------------------------------------------- Eswatini
  i({ id: "eswatini-ministry-of-health", name: "Ministry of Health, Eswatini", aka: ["Ministry of Health, Swaziland", "MoH Eswatini"],
    city: "Mbabane", country: "SZ", lat: -26.326, lng: 31.145, institutionType: "government",
    tldr: "Eswatini's health ministry. It re-established the national cancer registry in 2015, screens for cervical and breast cancer at primary care clinics, and in 2017 referred most people needing cancer treatment to South Africa.",
    summary: "The IAEA's summary of its imPACT review of Eswatini (then Swaziland), published in October 2017, says the country set up a cancer registry in 2015 and began cervical and breast cancer screening at 80 primary care clinics; that only minor cancer surgery was done at three public hospitals and basic chemotherapy for a few cancers at Mbabane Government Hospital; and that with no radiotherapy, the government referred most cancer patients to South Africa. The health minister said the ministry would develop a national cancer control plan and planned a cancer control unit. The African Cancer Registry Network's page says the ministry re-established the registry in August 2015. The government's website (gov.sz) did not answer in November 2026. The coordinates are an approximate city point for Mbabane.",
    programs: ["Cervical and breast cancer screening at primary care clinics"],
    institutions: ["eswatini-national-cancer-registry", "mbabane-government-hospital", "iaea"], cancers: ["cervical", "breast-cancer"],
    links: [
      { label: "IAEA: imPACT review, Eswatini (August 2017, PDF)", url: IMPACT_SZ },
      { label: "African Cancer Registry Network: Eswatini National Cancer Registry", url: AFCRN_SZ },
    ] }),

  i({ id: "eswatini-national-cancer-registry", name: "Eswatini National Cancer Registry", aka: ["Swaziland National Cancer Registry", "SNCR"],
    city: "Mbabane", country: "SZ", lat: -26.326, lng: 31.145, institutionType: "research-institute", website: AFCRN_SZ,
    tldr: "Eswatini's national cancer registry, re-established by the Ministry of Health in 2015. Every hospital and laboratory that diagnoses or treats cancer must report cases to it.",
    summary: "The African Cancer Registry Network's page (updated May 2017) says the Ministry of Health re-established a cancer registry in August 2015 and made it a national registry, and in October 2015 set reporting requirements obliging all public and private hospitals and laboratories that diagnose or treat cancer to make data available. It aims to record every cancer diagnosed among residents, including site, stage and treatment, finding cases actively in hospitals, pathology and radiology reports, oncology reports, death certificates and chemotherapy units, and enters data in CanReg5. The coordinates are an approximate city point for Mbabane.",
    programs: ["National cancer registration (from 2015)", "African Cancer Registry Network member registry"],
    institutions: ["eswatini-ministry-of-health"], related: ["cancer-registries-surveillance"],
    links: [{ label: "African Cancer Registry Network: Eswatini National Cancer Registry", url: AFCRN_SZ }, AFCRN_L] }),

  i({ id: "mbabane-government-hospital", name: "Mbabane Government Hospital", aka: ["Mbabane National Hospital"],
    city: "Mbabane", country: "SZ", lat: -26.331, lng: 31.144, institutionType: "hospital",
    tldr: "The main public hospital in Eswatini's capital, where a cancer unit giving chemotherapy was set up in 2016 and 2017 with help from the Uganda Cancer Institute.",
    summary: "The IAEA's 2017 imPACT summary says basic chemotherapy for a few cancers was available at Mbabane Government Hospital, with no radiotherapy in the country. An ehospice report by the African Palliative Care Association describes a partnership of the association, the American Cancer Society, the Ministry of Health and the Uganda Cancer Institute that, from December 2016 to December 2017, supported the start and running of a cancer unit at the hospital through expert exchange visits and mentoring. The coordinates are the OpenStreetMap point for the hospital.",
    programs: ["Cancer unit with chemotherapy (from 2017)"],
    institutions: ["eswatini-ministry-of-health", "uganda-cancer-institute"],
    links: [
      { label: "ehospice: the role of South-to-South partnerships in developing cancer services in Africa", url: EHOSPICE_SZ },
      { label: "IAEA: imPACT review, Eswatini (August 2017, PDF)", url: IMPACT_SZ },
    ] }),

  // ---------------------------------------------------------------- Mauritius
  i({ id: "mauritius-ministry-of-health", name: "Ministry of Health and Wellness, Mauritius", aka: ["MOHW", "Ministry of Health, Mauritius"],
    city: "Port Louis", country: "MU", lat: -20.162, lng: 57.503, institutionType: "government", website: MOH_MU,
    tldr: "Mauritius' health ministry. It runs the public hospitals, including the National Cancer Centre, gives chemotherapy at all five regional hospitals, and houses the national cancer registry.",
    summary: "The Ministry of Health and Wellness runs Mauritius' public hospitals: five regional hospitals and two district hospitals, supported by seven specialised hospitals including a new cancer hospital, and its list of major infrastructure projects includes the new cancer centre at Solferino. The African Cancer Registry Network's page says specialised cancer treatment (cancer surgery, radiotherapy and brachytherapy) is given at the National Cancer Centre, chemotherapy at all five regional hospitals, and that the national cancer registry sits within the ministry. The Pharmacy Board controls medicines. The ministry publishes a Paediatric Cancer Scheme communiqué (2025), a scanned image OnCo could not read as text. The coordinates are an approximate city point for Port Louis.",
    programs: ["Chemotherapy at all five regional hospitals", "Paediatric Cancer Scheme"],
    institutions: ["mauritius-national-cancer-centre", "mauritius-national-cancer-registry", "mauritius-pharmacy-board", "link-to-life-mauritius", "enn-rev-enn-sourir"],
    links: [
      { label: "Ministry of Health and Wellness: hospital services", url: MOH_MU_HOSP },
      { label: "Ministry of Health and Wellness: ongoing major infrastructure projects", url: MOH_MU_INFRA },
      { label: "Ministry of Health and Wellness: Paediatric Cancer Scheme", url: MOH_MU_PCS },
      { label: "African Cancer Registry Network: Mauritius National Cancer Registry", url: AFCRN_MU },
    ] }),

  i({ id: "mauritius-national-cancer-centre", name: "National Cancer Centre, Mauritius", aka: ["NCC Mauritius", "National Cancer Centre Solferino"],
    city: "Vacoas", country: "MU", lat: -20.278, lng: 57.477, institutionType: "cancer-center",
    tldr: "The public cancer hospital of Mauritius, at Solferino in Vacoas. It provides cancer surgery, radiotherapy with three linear accelerators, and brachytherapy.",
    summary: "The African Cancer Registry Network's page on Mauritius says specialised cancer treatment, including cancer surgery, radiotherapy and brachytherapy, is provided at the National Cancer Centre, and that since July 2024 registry staff abstract clinical and pathology data directly from its records at Solferino. IAEA DIRAC, with the entry updated in 2024, lists it on SSR Avenue, Solferino, Vacoas, with three linear accelerators, two cobalt-60 units, brachytherapy and a CT scanner. The coordinates are DIRAC's.",
    programs: ["Radiotherapy (three linear accelerators and two cobalt-60 units in IAEA DIRAC)", "Brachytherapy", "Cancer surgery"],
    institutions: ["mauritius-ministry-of-health", "mauritius-national-cancer-registry"],
    links: [{ label: "African Cancer Registry Network: Mauritius National Cancer Registry", url: AFCRN_MU }, DIRAC_L] }),

  i({ id: "mauritius-national-cancer-registry", name: "Mauritius National Cancer Registry (MNCR)", aka: ["MNCR"],
    city: "Ebene", country: "MU", lat: -20.242, lng: 57.482, institutionType: "research-institute", website: AFCRN_MU,
    tldr: "Mauritius' population-based cancer registry, set up in 1993 and covering the whole country including Rodrigues. Its data are included in the international series Cancer Incidence in Five Continents.",
    summary: "The African Cancer Registry Network's page says the Mauritius National Cancer Registry was set up in 1993 as a pathology-based registry at the Central Health Laboratory of Victoria Hospital, published its first report in 1999 (data from 1989 to 1996), and became population-based in 2001. It covers the whole Republic of Mauritius, including Rodrigues and the outer islands (1,260,767 people in 2023), uses CanReg5, has been an AFCRN member since 2013, and its data were included in volume 12 of Cancer Incidence in Five Continents (2024). Cases rose from 1,394 in 2001 to 2,841 in 2023; in 2023 the commonest cancers were prostate in men (age-standardised incidence 23.4 per 100,000) and breast in women (65.7 per 100,000). It sits in the Ministry of Health and Wellness at the NeXsky Building in Ebene. The coordinates are an approximate point for Ebene.",
    programs: ["Population-based cancer registration for Mauritius and Rodrigues (from 2001)", "African Cancer Registry Network member registry"],
    institutions: ["mauritius-ministry-of-health", "mauritius-national-cancer-centre", "iarc"], cancers: ["breast-cancer", "prostate"], related: ["cancer-registries-surveillance"],
    links: [{ label: "African Cancer Registry Network: Mauritius National Cancer Registry", url: AFCRN_MU }, AFCRN_L] }),

  i({ id: "mauritius-pharmacy-board", name: "Pharmacy Board, Mauritius", aka: ["Pharmacy Board of Mauritius"],
    city: "Port Louis", country: "MU", lat: -20.162, lng: 57.503, institutionType: "government",
    tldr: "The body that controls the manufacture, import, distribution and sale of medicines in Mauritius and licenses its pharmacies.",
    summary: "The Ministry of Health and Wellness says the Pharmacy Board is responsible for control over the manufacture, importation, distribution and sale of medications in Mauritius and for licensing retail and wholesale pharmacies, and that the Ministry's Pharmacovigilance Department monitors the safety of medicines in use. OnCo did not find a website for the Board. The coordinates are an approximate city point for Port Louis.",
    institutions: ["mauritius-ministry-of-health"],
    links: [{ label: "Ministry of Health and Wellness: hospital services", url: MOH_MU_HOSP }] }),

  i({ id: "link-to-life-mauritius", name: "Link to Life", aka: ["Link to Life Mauritius"],
    city: "Vacoas", country: "MU", lat: -20.299, lng: 57.493, institutionType: "consortium",
    tldr: "A Mauritian charity that gives counselling to people with cancer and their families, runs group therapy, helps with prostheses and wigs, and raises awareness in schools and workplaces.",
    summary: "Link to Life is an associate member of UICC based in Vacoas. Its UICC profile lists counselling for patients and families, therapeutic group activities, help with prostheses and wigs, and awareness campaigns in schools and firms. Its website did not answer in November 2026. The coordinates are an approximate point for Vacoas.",
    programs: ["Counselling", "Group therapy", "Prostheses and wigs", "Awareness campaigns"],
    institutions: ["mauritius-ministry-of-health", "uicc"],
    links: [UICC("link-life", "Link to Life")] }),

  i({ id: "enn-rev-enn-sourir", name: "Enn Rev Enn Sourir", aka: ["ERES"],
    city: "Port Louis", country: "MU", lat: -20.162, lng: 57.503, institutionType: "consortium", website: ERES,
    tldr: "A Mauritian charity that helps children and adults reach specialised treatment, with cancer care as a main focus, including programmes for children with cancer and for breast cancer.",
    summary: "Enn Rev Enn Sourir is a non-governmental organisation in Port Louis and a full member of UICC. Its UICC profile says cancer care is among its key priorities, through advocacy, support and better access to treatment. Its website lists programmes for children with cancer (Soins aux enfants atteints du cancer, Plan Cancer Enfant), a SMILE Breast Cancer Care Project, a prosthesis support project and a fertility project. The coordinates are an approximate city point for Port Louis.",
    programs: ["Care for children with cancer", "Plan Cancer Enfant", "SMILE Breast Cancer Care Project"],
    institutions: ["mauritius-ministry-of-health", "uicc"], cancers: ["breast-cancer"],
    links: [{ label: "Enn Rev Enn Sourir", url: ERES }, UICC("enn-rev-enn-sourir", "Enn Rev Enn Sourir")] }),
];

/** Existing record id to the new institution ids it should list (applied in src/data/index.ts). */
export const countriesEastSouthernAfricaBacklinks: Record<string, string[]> = {
  // TODO: iacc-angola is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "iacc-angola": ["angola-ministry-of-health"],
  "cancer-association-of-namibia": ["namibia-national-cancer-registry", "zuzu-holding-hands-cancer-foundation", "namibia-ministry-of-health"],
  uicc: [
    "fondation-akbaraly", "somalia-ministry-of-health", "abspa-burundi", "kenyera-burundi", "zuzu-holding-hands-cancer-foundation",
    "cancer-association-of-botswana", "action-against-cancer-lesotho", "link-to-life-mauritius", "enn-rev-enn-sourir",
  ],
  iaea: ["sir-ketumile-masire-teaching-hospital"],
  who: ["cmck-bujumbura"],
  "uganda-cancer-institute": ["mbabane-government-hospital"],
  "essen-wtz": ["orotta-referral-hospital"],
};
