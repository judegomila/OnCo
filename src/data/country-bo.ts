import type { CountryDive } from "@/data/country-dive";

/**
 * Bolivia deep dive: the hand-written cards for /countries/bo/ (wave 10). Spanish sources were read in Spanish, from
 * the raw text of each page or file, not from a summary of it, on 11 November 2026: the texts of Ley 1152 (2019), Ley
 * 1223 del Cáncer (2019), Decreto Supremo 4881 (2023) and Decreto Supremo 4608 (2021) as reproduced by Lexivox, because
 * the Gaceta Oficial de Bolivia did not answer; the Ministerio de Salud y Deportes' news pages of August to November
 * 2026; PAHO's October 2023 note on the national cancer registry; the Agencia Boliviana de Energía Nuclear's pages and
 * press notes on its radiotherapy centres; AGEMED's pages (served through its own content API), its LINAME 2026 to 2027
 * spreadsheet and its clinical trial norm (PDF text); WHO's HPV coverage rows and WHO's list of maturity level 3 and 4
 * regulators (PDF text); the World Bank's health expenditure indicators; IARC's GLOBOCAN 2024 fact sheet for Bolivia
 * (PDF text); ClinicalTrials.gov's API; and the papers' abstracts through Europe PMC, with the EULAT Eradicate GBC
 * profile read in full text. sus.minsalud.gob.bo refused the connection; what could not be read is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/68-bolivia-plurinational-state-of-fact-sheet.pdf";
const L1223 = "https://www.lexivox.org/norms/BO-L-N1223.html";
const L1152 = "https://www.lexivox.org/norms/BO-L-N1152.html";
const DS4881 = "https://www.lexivox.org/norms/BO-DS-N4881.html";
const DS4608 = "https://www.lexivox.org/norms/BO-DS-N4608.html";
const PAHO_RNC = "https://www.paho.org/es/noticias/6-10-2023-definen-conjunto-variables-registro-nacional-cancer-listado-medicamentos-que";
const MSYD_ROSA = "https://www.minsalud.gob.bo/9584-consultorios-rosas-para-promover-deteccion-oportuna-de-cancer-de-mama";
const MSYD_POTOSI_RT = "https://www.minsalud.gob.bo/9391-potosi-ministerio-de-salud-y-deportes-verifica-infraestructura-de-la-unidad-de-radioterapia-para-reactivar-su-construccion";
const MSYD_TRIANGULAR = "https://www.minsalud.gob.bo/9494-ministerio-de-salud-lanza-proyecto-de-cooperacion-triangular-entre-bolivia-paraguay-y-el-salvador-para-la-eliminacion-del-cancer-de-cuello-uterino";
const MSYD_LIPEZ = "https://www.minsalud.gob.bo/9644-prevencion-y-diagnostico-oportuno-del-cancer-de-cuello-uterino-en-mancomunidad-de-los-lipez-en-potosi";
const MSYD_CHILD = "https://www.minsalud.gob.bo/9516-salud-impulsa-campana-nacional-para-detectar-oportunamente-cancer-infantil-a-traves-de-telesalud";
const ABEN_RED = "https://www.aben.gob.bo/servicio/red-de-centros-de-medicina-nuclear-y-radioterapia/";
const ABEN_106K = "https://www.aben.gob.bo/index.php/nota_prensa/aben-supera-las-106-mil-atenciones-oncologicas-con-tecnologia-nuclear/";
const ABEN_4Y = "https://www.aben.gob.bo/index.php/nota_prensa/cuatro-anos-de-servicio-de-la-salud-de-los-bolivianos/";
const ABEN_LP = "https://www.aben.gob.bo/index.php/nota_prensa/cmnyr-la-paz-celebra-2-anos-con-la-primera-residencia-medica-en-radioncologia-del-pais/";
const AGEMED = "https://www.agemed.gob.bo/";
const LINAME_XLSX = "https://www.agemed.gob.bo/archivo_uso_racional/liname/LINAME_2026_2027_07-04-26.xlsx";
const AGEMED_EC_NORM = "https://www.agemed.gob.bo/archivos_agemed/ensayosclinicos/001-2021.pdf";
const WHO_ML = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'BOL'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=BO";
const WB_CHE = "https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=BO";
const CTGOV = "https://clinicaltrials.gov/search?cond=cancer&country=Bolivia";
const EULAT_CTGOV = "https://clinicaltrials.gov/study/NCT06192719";
const DOI_HUANCA = "https://doi.org/10.26633/RPSP.2025.44";
const DOI_RIOS = "https://doi.org/10.1002/ijc.2910280309";
const DOI_EULAT = "https://doi.org/10.1093/ije/dyaf127";
const DOI_ALLENDE = "https://doi.org/10.1186/s12879-020-04963-2";
const DOI_CAROZZI = "https://doi.org/10.1371/journal.pone.0292605";
const DOI_FRANK = "https://doi.org/10.1177/26892820261428648";

export const BO_DIVE: CountryDive = {
  iso2: "BO",
  iso3: "BOL",
  name: "Bolivia",
  flag: "🇧🇴",
  asOf: "2026-11-11",
  title: "Cancer in Bolivia",
  description:
    "Cancer in Bolivia from Bolivian sources: IARC's estimate of 16,995 new cancers and 10,041 deaths in 2024, built without Bolivian incidence data, the national cancer registry's count of more than 103,500 cases in 2016 to 2025, the 2019 cancer law and the free Sistema Único de Salud, AGEMED and its 2026 to 2027 essential medicines list, cervical screening that reached about 14% of women in 2022, the state's three nuclear medicine and radiotherapy centres, the world's highest estimated gallbladder cancer rate, and why no trial in our records has a site in Bolivia.",
  lede:
    "Cervical cancer is the commonest cancer in Bolivia, and IARC estimates the country has the highest rate of gallbladder cancer of the 186 countries it covers. IARC had no Bolivian incidence data to use for 2024, so its national estimate of 16,995 new cancers is modelled from death records; the Ministry of Health's own registry counted more than 103,500 cases over ten years. Since 2019 a cancer law and the free Sistema Único de Salud promise care to everyone without social insurance, and since 2022 the state has opened three centres for radiotherapy and nuclear medicine.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Bolivia is 16,995 new cancers and 10,041 deaths, an age-standardised incidence of 153.3 per 100,000 (156.3 in men, 156.5 in women), including 540 non-melanoma skin cancers. IARC's fact sheet lists no country-specific source for incidence: the figure is national mortality applied to modelled mortality-to-incidence ratios. Mortality comes from WHO's national death data, scaled to regional all-cancer rates. So the national figure rests on death certificates, not on a count of diagnoses. The Ministry of Health's Registro Nacional de Cáncer counted 48,048 new adult cancers in 2016 to 2020 and more than 103,500 new cancers in 2016 to 2025, roughly 10,000 a year against IARC's estimate of about 17,000 for 2024. The registry gathers cases notified by facilities, most of them in the four departments with specialist oncology services, and OnCo could not read a registry report that says how complete it is. A population-based registry in La Paz was described in 1981; OnCo found no other in Bolivia.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Bolivia",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Bolivia (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 17,000 new cancers a year, with cervical cancer first",
          plain:
            "IARC estimates 16,995 new cancers in Bolivia in 2024, 9,257 in women and 7,738 in men, and 10,041 deaths. Cervical cancer is the commonest cancer and the commonest cause of cancer death. Prostate cancer leads in men. For every ten new cancers IARC estimates about six deaths in the same year.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,745 cervical cancers (1,014 deaths), 1,586 prostate cancers (597 deaths), 1,266 breast cancers (416 deaths), 986 stomach cancers (799 deaths), 955 lung cancers (875 deaths), 880 liver cancers (803 deaths), 722 leukaemias and 716 gallbladder cancers (574 deaths). Cervical cancer is 18.9% of cancers in women, with an age-standardised rate of 29.2 per 100,000; in the GLOBOCAN 2024 data only Guyana and Paraguay have higher rates in the Americas. In men the leading cancers are prostate (20.5% of male cancers), lung (619) and stomach (556). The risk of developing a cancer before age 75 is 13.3% for men and 14.5% for women, and 37,693 people are estimated to be living within five years of a diagnosis. Because IARC builds Bolivia's incidence from death records, the ratio of deaths to cases (0.59) is partly an assumption of the model rather than a measurement. In the Ministry's registry for 2016 to 2025, breast cancer was the second commonest cancer in women, with 10,348 cases and 2,171 deaths.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bolivia (PDF)", url: IARC_FACTSHEET },
            { label: "Ministerio de Salud y Deportes: Consultorios Rosa for earlier breast cancer diagnosis (16 October 2026, Spanish)", url: MSYD_ROSA },
          ],
        },
        {
          id: "gallbladder-burden",
          title: "The highest estimated gallbladder cancer rate in the world",
          plain:
            "Gallbladder cancer, usually found late, is much commoner in the Andes than in most of the world. IARC estimates 716 cases and 574 deaths in Bolivia in 2024, an age-standardised rate of 6.7 per 100,000, the highest of the 186 countries in GLOBOCAN 2024 and about six times the world rate. A registry in La Paz reported high rates in women as early as 1981.",
          detail:
            "In the GLOBOCAN 2024 data Bolivia's age-standardised gallbladder cancer incidence is 6.68 per 100,000, ahead of Chile (5.63), Nepal (4.01) and Peru (3.51); the fact sheet gives 7.4 per 100,000 in women and 6.0 in men, and puts gallbladder cancer sixth among causes of cancer death. The world rate in GLOBOCAN 2024 is 1.15. As IARC has no Bolivian incidence data, these are estimates from death records. The first report from a population-based registry in La Paz, by Ríos-Dalenz, Correa and Haenszel in 1981, found high incidence in women of cancers of the cervix, the gallbladder and the thyroid, in a city then strongly shaped by Aymara migration from the altiplano. The IARC-led review by Piñeros and colleagues (2025) found that recorded rates within countries differ widely from national estimates, which is why subnational registries matter for this cancer. Bolivia now contributes patients to EULAT Eradicate GBC, a European and Latin American study of more than 11,000 people; see what Bolivia does.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bolivia (PDF)", url: IARC_FACTSHEET },
            { label: "Ríos-Dalenz, Correa and Haenszel: morbidity from cancer in La Paz, Bolivia (Int J Cancer 1981)", url: DOI_RIOS },
            { label: "Piñeros et al.: global variations in gallbladder cancer incidence (Int J Cancer 2025)", url: "https://doi.org/10.1002/ijc.35232" },
            { label: "OnCo: gallbladder cancer", url: "/cancers/gallbladder/" },
          ],
        },
      ],
      tables: [
        {
          id: "bo-registry",
          title: "What Bolivia's national cancer registry has reported, beside IARC's estimate",
          caption: "New cancers and deaths as each source reports them. The registry figures are totals for several years; IARC's is one year, 2024.",
          columns: [
            { key: "source", label: "Source" },
            { key: "period", label: "Years" },
            { key: "scope", label: "What is counted" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { source: "Registro Nacional de Cáncer, reported by PAHO", period: "2016 to 2020", scope: "Adults, all cancers", cases: 48048, deaths: null },
            { source: "Registro Nacional de Cáncer, reported by the Ministry of Health", period: "2016 to 2025", scope: "All cancers", cases: "more than 103,500", deaths: "more than 31,500" },
            { source: "Registro Nacional de Cáncer, reported by the Ministry of Health", period: "2016 to 2025", scope: "Breast cancer", cases: 10348, deaths: 2171 },
            { source: "IARC GLOBOCAN 2024 estimate", period: "2024 (one year)", scope: "All cancers, all ages", cases: 16995, deaths: 10041 },
          ],
          note: "The registry belongs to the Ministry's Programa Nacional de Lucha Contra el Cancer and gathers cases notified by health facilities; OnCo reads it as a count of cases reaching those facilities rather than of a defined population, and the Ministry has published no completeness figure that OnCo could find. IARC did not use it: its fact sheet lists no Bolivian incidence source. The registry's published figures are the rounded totals quoted in a PAHO note and a Ministry press release.",
          sources: [
            { label: "PAHO: variables of the national cancer registry agreed (6 October 2023, Spanish)", url: PAHO_RNC },
            { label: "Ministerio de Salud y Deportes: Consultorios Rosa (16 October 2026, Spanish)", url: MSYD_ROSA },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Bolivia (PDF)", url: IARC_FACTSHEET },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a national registry set up by law",
      aside: { label: "Ley 1223 del Cáncer, article 10 (Lexivox, Spanish)", url: L1223 },
      cards: [
        {
          id: "registry-law",
          title: "Reporting every cancer is compulsory, but the registry's own reports are not published",
          plain:
            "Bolivia's 2019 cancer law makes the Ministry of Health keep a national cancer registry and obliges every public, social insurance and private facility to report each cancer to it. The Ministry quotes its totals in press releases, but OnCo found no published registry report with rates, stages or completeness.",
          detail:
            "Article 10 of Ley 1223 del Cáncer (5 September 2019) requires the Ministry of Health to set up an epidemiological surveillance system and the Registro Nacional de Cáncer, names the registry as the source of information on the disease, and obliges all public, social security and private institutions to supply cancer data, with confidentiality guaranteed, in coordination with the Sistema Único de Información de Salud. Decreto Supremo 4881 (22 February 2023), the law's regulation, gives the Programa Nacional de Lucha Contra el Cáncer the task of writing the registry's manuals and methodology, to be approved by ministerial resolution. In October 2023 a workshop in Cochabamba with adult and paediatric oncologists, the programme, the Sociedad Boliviana de Cancerología and PAHO agreed the registry's variables; PAHO's note reports 48,048 new adult cancers registered in 2016 to 2020, most in La Paz, Santa Cruz, Cochabamba and Chuquisaca, the four departments with specialist oncology services. A population-based registry in La Paz was described by Ríos-Dalenz and colleagues in 1981, without the years it covered in the abstract; OnCo found no current population-based registry in Bolivia.",
          links: [
            { label: "Ley 1223 del Cáncer, 5 September 2019 (Lexivox, Spanish)", url: L1223 },
            { label: "Decreto Supremo 4881, 22 February 2023 (Lexivox, Spanish)", url: DS4881 },
            { label: "PAHO: variables of the national cancer registry agreed (6 October 2023, Spanish)", url: PAHO_RNC },
            { label: "Ríos-Dalenz, Correa and Haenszel: morbidity from cancer in La Paz (Int J Cancer 1981)", url: DOI_RIOS },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: social insurance for workers, the free SUS for everyone else",
      aside: { label: "Ley 1152, the Sistema Único de Salud (Lexivox, Spanish)", url: L1152 },
      cards: [
        {
          id: "sus",
          title: "Free public care since 2019 for everyone without social insurance",
          plain:
            "Bolivians with formal jobs are covered by social security health funds. Since 2019 everyone else is entitled to free care in public facilities under the Sistema Único de Salud (SUS), reached through a local health centre and referral upwards. The cancer law says cancer care is to be added to the SUS step by step, paid for by the national treasury and regional and local governments.",
          detail:
            "Ley 1152 of 20 February 2019, \"Hacia el Sistema Único de Salud, Universal y Gratuito\", amends Ley 475 so that Bolivians not protected by short-term social security, and some groups of foreigners, receive comprehensive care free of charge in the public subsector. Care is provided as health products, introduced progressively; patients enter through a first-level facility, and reach second, third and fourth level hospitals only by referral, except in emergencies. The national treasury pays for staff, national health programmes and third and fourth level care; municipalities pay for first and second level care from 15.5% of their share of national tax revenue (or the equivalent from hydrocarbon tax), and more where that is not enough. Ley 1223 del Cáncer (2019) guarantees universal and comprehensive access for people with cancer \"de manera progresiva y paulatina\", according to the epidemiological profile and available funding within the SUS, protects workers with cancer from dismissal without just cause, and Decreto Supremo 4881 (2023) makes the social security regulator, ASUSS, responsible for checking that insured people receive their cancer benefits. In October 2026 the Ministry told readers that the SUS, Ley 1223 and its clinical norms guarantee comprehensive and free care for breast cancer patients.",
          links: [
            { label: "Ley 1152, 20 February 2019 (Lexivox, Spanish)", url: L1152 },
            { label: "Ley 1223 del Cáncer, articles 1, 12 and 14 (Lexivox, Spanish)", url: L1223 },
            { label: "Decreto Supremo 4881, 22 February 2023 (Lexivox, Spanish)", url: DS4881 },
            { label: "Ministerio de Salud y Deportes: Consultorios Rosa (16 October 2026, Spanish)", url: MSYD_ROSA },
          ],
        },
        {
          id: "money-medicines",
          title: "About a quarter of health spending is paid out of pocket, and 41 cancer medicines are on the essential list",
          plain:
            "In 2023 households paid 27% of Bolivia's health spending directly, up from 21% in 2020. The national essential medicines list for 2026 to 2027, which guides what public services buy, includes 41 cancer medicines and 10 hormone treatments for cancer, among them trastuzumab and imatinib, but no immunotherapy of the checkpoint inhibitor kind.",
          detail:
            "World Bank figures from WHO's Global Health Expenditure Database put out-of-pocket spending at 27.3% of current health expenditure in 2023 (25.8% in 2022, 20.9% in 2020), government spending at 67.3%, total health spending at 6.9% of GDP and 255 US dollars a person. AGEMED's spreadsheet of the Lista Nacional de Medicamentos Esenciales (LINAME) 2026 to 2027, approved by Ministerial Resolution 0121 (Decreto Supremo 26873 of 2002 requires all medicine purchasing in the public system and short-term social security to be based on this list), lists 42 antineoplastic entries under ATC group L01 (41 substances, doxorubicin appearing twice as ordinary and liposomal forms) and 10 under L02. They include trastuzumab, pertuzumab, rituximab, bevacizumab, nimotuzumab, imatinib, dasatinib, erlotinib, pazopanib, bortezomib, abiraterone and enzalutamide, many marked for restricted use; there is no PD-1 or PD-L1 inhibitor. No cancer medicine was added or removed in the 2026 to 2027 revision. Oral and injectable morphine are listed. The 2023 workshop recorded by PAHO also agreed a list of oncology medicines to be included in the SUS; OnCo could not read that list.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, Bolivia (WHO Global Health Expenditure Database)", url: WB_OOP },
            { label: "World Bank: current health expenditure, Bolivia", url: WB_CHE },
            { label: "AGEMED: LINAME 2026 to 2027 (spreadsheet, Spanish)", url: LINAME_XLSX },
            { label: "Decreto Supremo 26873, 21 December 2002, the single medicines supply system (Lexivox, Spanish)", url: "https://www.lexivox.org/norms/BO-DS-26873.html" },
            { label: "PAHO: oncology medicines for the SUS (6 October 2023, Spanish)", url: PAHO_RNC },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: AGEMED",
      aside: { label: "AGEMED: Agencia Estatal de Medicamentos y Tecnologías en Salud", url: AGEMED },
      cards: [
        {
          id: "agemed",
          title: "AGEMED, created in 2016, registers medicines and keeps the essential medicines list",
          plain:
            "Bolivia's medicines regulator, AGEMED, is part of the Ministry of Health with its own administration. It registers medicines, inspects their quality, runs the national pharmacovigilance centre and keeps the essential medicines list. It is not on the World Health Organization's list of regulators rated at maturity level 3 or 4.",
          detail:
            "AGEMED's own pages say the Agencia Estatal de Medicamentos y Tecnologías en Salud was created on 21 September 2016 by Decreto Supremo 2905 as a deconcentrated body of the Ministry of Health with administrative, financial, legal and technical independence, responsible for evaluating, authorising and controlling the manufacture, import, distribution, promotion, prescription and prices of medicines and health technologies. Its history traces the function to a national chemical and pharmaceutical service founded in 1937. Its departments cover marketing authorisation, inspection and post-market control, health technology assessment and rational use, and pharmacovigilance, and its quality control laboratory, CONCAMYT, aims to keep WHO prequalification. WHO's list of national regulators operating at maturity level 3 or 4, dated August 2026, does not include Bolivia, and AGEMED publishes no time for registering a new medicine that OnCo could find. AGEMED's home page links the regulators of Argentina, Brazil, Chile, Colombia, Cuba, Ecuador and Peru, but OnCo found no published reliance route under which Bolivia accepts another regulator's approval.",
          links: [
            { label: "AGEMED: home page (Spanish)", url: AGEMED },
            { label: "WHO: list of national regulatory authorities at maturity level 3 and 4", url: WHO_ML },
          ],
        },
        {
          id: "trial-rules",
          title: "Clinical trials: 60 days for a decision, and none for cancer on AGEMED's list",
          plain:
            "A clinical trial with medicines needs AGEMED's authorisation and an ethics committee's approval. Under the norm AGEMED publishes, the regulator has 60 calendar days to decide on an application. Its list of registered trials holds studies of Chagas disease, leishmaniasis and COVID-19, and none of cancer.",
          detail:
            "The Norma para Estudios Clínicos, issued by the Ministry's former medicines directorate and published by AGEMED beside its Resolución Administrativa 006 of 3 February 2021, gives the authority 60 calendar days from receipt of an application requiring prior authorisation to check it, ask for information, or authorise or refuse it, then 30 calendar days from the last information requested; an abbreviated route for products already authorised for trials, or registered medicines in new uses, is deemed approved if no decision is made within 60 days. The investigator must send a final report within 180 days of the end of a study, and six-monthly reports for studies longer than a year. AGEMED lists eight research ethics committees, among them those of the Universidad Mayor de San Simón, the Universidad Católica Boliviana, the Universidad Mayor de San Andrés and the Hospital de Niños de Santa Cruz. Its list of registered trials names four completed studies, all of Chagas disease, and seven observed studies of COVID-19 and leishmaniasis, including four of chlorine dioxide for COVID-19; none concerns cancer. The cancer law asks the Ministry to promote clinical research in cancer.",
          links: [
            { label: "AGEMED: Norma para Estudios Clínicos (PDF, Spanish)", url: AGEMED_EC_NORM },
            { label: "AGEMED: health technology assessment and clinical trials pages (Spanish)", url: AGEMED },
            { label: "Ley 1223 del Cáncer, article 6 (Lexivox, Spanish)", url: L1223 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "Huanca Challgua et al.: cervical screening coverage in Bolivia (Rev Panam Salud Publica 2025)", url: DOI_HUANCA },
      cards: [
        {
          id: "cervical-screening",
          title: "About one woman in seven screened for cervical cancer in 2022, with wide gaps between towns",
          plain:
            "Bolivia's public services screen women for cervical cancer with the Pap smear, as in the Ministry's 2026 brigades. A nationwide study found that about 14% of women aged 20 to 69 were screened in 2022, far from WHO's target of 70%, and coverage ranged from 59% in some municipalities to under 1% in others. Studies in Bolivia have tested HPV self-sampling as an alternative.",
          detail:
            "Huanca Challgua and colleagues (2025) calculated standardised coverage for every department and municipality and found clusters of higher coverage in Pando, Chuquisaca and Tarija and of lower coverage in Beni and Santa Cruz. In Cochabamba, Allende and colleagues (2020) compared tests in 362 women: sensitivity for high-grade lesions or cancer was 100% for visual inspection with acetic acid, 76% for HPV testing on self-collected samples and 44% for cytology, and they judged visual inspection plus HPV self-sampling the best combination. A pilot by the Italian development agency in La Paz, Toro Toro and Acasio (Carozzi and colleagues, 2024) enrolled 2,168 women, found high-risk HPV in 12.5%, a rate similar to Europe and the USA, and judged self-sampling with on-site testing feasible in town and countryside. In 2026 the Ministry ran Pap and colposcopy brigades through its telehealth programme in eight remote municipalities of southwest Potosí, reaching more than 400 women, and in September 2026 it launched a cooperation project with Paraguay, El Salvador, Spain's AECID and the Catalan Institute of Oncology on HPV testing, self-sampling and screen and treat.",
          links: [
            { label: "Huanca Challgua et al.: geographical inequities in cervical screening coverage in Bolivia (Rev Panam Salud Publica 2025)", url: DOI_HUANCA },
            { label: "Allende et al.: HPV self-sampling for cervical screening in Bolivia (BMC Infect Dis 2020)", url: DOI_ALLENDE },
            { label: "Carozzi et al.: self-sampling and HPV testing in rural and urban Bolivia (PLoS One 2024)", url: DOI_CAROZZI },
            { label: "Ministerio de Salud y Deportes: cervical screening in Los Lípez, Potosí (4 November 2026, Spanish)", url: MSYD_LIPEZ },
            { label: "Ministerio de Salud y Deportes: triangular cooperation for cervical cancer elimination (22 September 2026, Spanish)", url: MSYD_TRIANGULAR },
          ],
        },
        {
          id: "hpv-breast",
          title: "HPV vaccine for girls since 2017 and for boys since 2024, and pink clinics for breast cancer",
          plain:
            "In WHO's data Bolivia has vaccinated girls against HPV since 2017 and boys since 2024. In 2025 it reported vaccinating 67% of its target girls and 61% of its target boys. For breast cancer, the Ministry opened Consultorios Rosa in October 2026, with Roche, to shorten the time from suspicion to treatment for women aged 40 to 60 in the SUS.",
          detail:
            "In the coverage rows Bolivia reported to WHO, the first year is 2017, when 74% of a target of 347,869 girls received a first dose and 65% completed the course. Coverage fell during the pandemic (58% first dose and 23% completed in 2020), and first-dose coverage was back at 74% in 2022 to 2024; since 2023 first-dose and completed coverage are the same. Rows for boys begin in 2024, at 56% of 124,326, rising to 61% of 124,427 in 2025, when girls' coverage was 67% of 120,290. The Ministry's October 2026 campaign recommends monthly breast self-examination from age 20, a yearly clinical examination from 25 and screening mammography every two years for women aged 40 to 69. Its Consultorios Rosa, set up in alliance with Roche Bolivia, will operate first in the main cities and then in all nine departments, giving priority care to women aged 40 to 60 enrolled in the SUS, with digital tracking so that patients are not lost between referrals. OnCo found no national mammography coverage figure. Two laws, 252 and 798, give workers paid leave for a mammogram and Pap smear.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Bolivia (API)", url: WHO_HPV_API },
            { label: "Ministerio de Salud y Deportes: Consultorios Rosa (16 October 2026, Spanish)", url: MSYD_ROSA },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Bolivia does",
      title: "What Bolivia does differently",
      cards: [
        {
          id: "nuclear-network",
          title: "Radiotherapy built and run by the national nuclear energy agency",
          plain:
            "Instead of its health ministry, Bolivia's nuclear energy agency, ABEN, built and runs the country's three state centres for radiotherapy and nuclear medicine, in El Alto, La Paz and Santa Cruz. The first opened in March 2022. SUS patients are treated free of charge, and by February 2026 the centres had recorded 106,054 patient attendances.",
          detail:
            "Decreto Supremo 3257 (19 July 2017) authorised treasury funds for the Agencia Boliviana de Energía Nuclear to build a network of nuclear medicine and radiotherapy centres in Santa Cruz, El Alto and La Paz, and Decreto Supremo 4608 (3 November 2021) authorised ABEN, which answers to the hydrocarbons and energy ministry, to run them on an exceptional and temporary basis. Ley 1393 of 2021, as quoted in that decree, added access to the public network of nuclear technology to the SUS, so the Ministry of Health pays for SUS beneficiaries under agreement. ABEN dates the El Alto centre's opening to 6 March 2022 and its 37,920 attendances in four years, and says its staff are Bolivians trained abroad on state scholarships; social insurance funds send patients under agreements. The La Paz centre, two years old in November 2025, has two linear accelerators, high dose rate brachytherapy, a CT simulator, PET/CT and SPECT/CT, and began what ABEN calls the country's first medical residency in radiation oncology. Elsewhere, a regional radiotherapy unit in Potosí, costed at 97 million bolivianos, stood at 8.47% physical progress when the Health Minister inspected it in August 2026; the national government will pay 20% and the departmental government 80%.",
          links: [
            { label: "Decreto Supremo 4608, 3 November 2021 (Lexivox, Spanish)", url: DS4608 },
            { label: "ABEN: 106,054 oncology attendances (4 February 2026, Spanish)", url: ABEN_106K },
            { label: "ABEN: four years of the El Alto centre (6 March 2026, Spanish)", url: ABEN_4Y },
            { label: "ABEN: La Paz centre and the first radiation oncology residency (28 November 2025, Spanish)", url: ABEN_LP },
            { label: "Ministerio de Salud y Deportes: Potosí radiotherapy unit (20 August 2026, Spanish)", url: MSYD_POTOSI_RT },
          ],
        },
        {
          id: "gallbladder-research",
          title: "Bolivian patients in a European and Latin American effort to prevent gallbladder cancer",
          plain:
            "Gallstones are one of the known risk factors for gallbladder cancer, and the aim is to find out which people with gallstones should have the gallbladder removed before a cancer develops. Bolivia is one of four South American countries in EULAT Eradicate GBC, a consortium funded by the European Union that collects samples to predict who is at risk. By March 2025, 1,570 of its 11,453 Latin American participants were Bolivian.",
          detail:
            "The consortium's data resource profile (Scherer and colleagues, International Journal of Epidemiology, 2025) describes a case-control study and biobank recruiting people with gallstone disease before their gallbladder is removed, and people with gallbladder cancer, in Argentina, Bolivia, Chile and Peru, with samples processed in four Bolivian centres; 14% of participants are Bolivian. Across the study, 74% of participants are women, the median age is 48, and 1,033 have gallbladder cancer. The aim is markers in blood, saliva, urine, bile and stool that can predict risk and pick out who would benefit from early surgery. Its ClinicalTrials.gov record lists five Bolivian sites, all in Cochabamba, among them the Instituto Oncológico Nacional and the Hospital Obrero No. 2 (Caja Nacional del Seguro Social, as the record names it), and the Universidad Mayor de San Simón's medical faculty gave ethical approval. Separately, the Ministry launched a national telehealth campaign in 2026 with the Hospital del Niño to help doctors spot childhood cancer early and refer children to paediatric oncology.",
          links: [
            { label: "Scherer et al.: EULAT Eradicate GBC data resource profile (Int J Epidemiol 2025)", url: DOI_EULAT },
            { label: "ClinicalTrials.gov: EULAT Eradicate GBC, NCT06192719", url: EULAT_CTGOV },
            { label: "Ministerio de Salud y Deportes: telehealth campaign for childhood cancer (2026, Spanish)", url: MSYD_CHILD },
            { label: "OnCo: gallbladder cancer", url: "/cancers/gallbladder/" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Bolivia",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Bolivia; 143 list neighbouring Peru. ClinicalTrials.gov itself holds seven cancer studies with a Bolivian site, six of them observational, and AGEMED's register lists no cancer trial.",
          detail:
            "Of the 5,899 trials in OnCo's graph with ClinicalTrials.gov participation data, 0 list Bolivia among their countries. That reflects the trials OnCo holds, mostly large industry and academic trials of new medicines. A search of ClinicalTrials.gov on 11 November 2026 returned 79 studies of any condition with a site in Bolivia, and 7 matching cancer, six of them observational: a study of EGFR mutations in Latin American lung cancer led by the US National Cancer Institute (NCT01255150), IARC's study of cervical screening with HPV testing (NCT01881659), a phase 1/2 trial of topical ranpirnase for genital warts (NCT02535104), and four gallbladder studies from the EULAT Eradicate GBC consortium led by the Centre Paul Strauss in Strasbourg, among them NCT06192719. Bolivian cancer research on this page is observational: the cervical screening coverage study, the HPV self-sampling studies, and a 2026 scoping review of palliative care that found programmes expanding since 2008, with barriers in access to opioids, where care is located, training and policy.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Bolivia (search)", url: CTGOV },
            { label: "Frank et al.: palliative care in Bolivia, a scoping review (Palliat Med Rep 2026)", url: DOI_FRANK },
            { label: "AGEMED: health technology assessment and clinical trials pages (Spanish)", url: AGEMED },
          ],
        },
        {
          id: "cancer-law",
          title: "A cancer law and a national commission, but no published national cancer plan",
          plain:
            "Bolivia's cancer law of 2019 created a National Cancer Commission led by the Minister of Health, with places for oncologists and for patient groups, and gives departments and municipalities their own cancer programmes. The law's regulation took until February 2023. OnCo found no current national cancer control plan published by the Ministry.",
          detail:
            "Ley 1223 del Cáncer aims to reduce cancer illness and death; it gives the Ministry of Health, through the Programa Nacional de Lucha Contra el Cáncer, responsibility for policy from surveillance to palliative care under a Plan Nacional de Lucha Contra el Cáncer, and requires each departmental health service and municipal health directorate to have a cancer programme lead. Its transitional provision set 120 working days for the regulation; Decreto Supremo 4881 was issued on 22 February 2023. That decree sets the commission's membership (the minister, three vice-ministers, the programme head, one representative of the scientific society of cancer specialists and two of organised civil society for child and adult cancer), requires it to meet at least twice a year, and lets the Ministry transfer donated cancer medicines to private bodies. The law also requires every institution donating for cancer care to report the donation to the national programme. Villarreal-Garza and colleagues (Lancet Oncology 2025) found that 16 countries in Latin America and the Caribbean had an active national cancer plan in 2022; OnCo could not confirm from a Bolivian source whether a Plan Nacional exists.",
          links: [
            { label: "Ley 1223 del Cáncer, 5 September 2019 (Lexivox, Spanish)", url: L1223 },
            { label: "Decreto Supremo 4881, 22 February 2023 (Lexivox, Spanish)", url: DS4881 },
            { label: "Villarreal-Garza et al.: national cancer control plans in Latin America and the Caribbean (Lancet Oncol 2025)", url: "https://doi.org/10.1016/S1470-2045(25)00039-7" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-report",
      title: "The national registry's own report could not be found",
      plain:
        "OnCo found the national cancer registry's totals only as quoted in a PAHO note and a Ministry press release. No registry report with rates by cancer, age, department or stage, or a statement of how complete it is, was found, and IARC's estimate does not use it.",
      detail:
        "The figures on this page from the Registro Nacional de Cáncer are 48,048 adult cases in 2016 to 2020 (PAHO, October 2023) and more than 103,500 cases, more than 31,500 deaths and 10,348 breast cancers with 2,171 deaths in 2016 to 2025 (Ministry, October 2026). The manuals and methodology that Decreto Supremo 4881 asks the national programme to approve by ministerial resolution were not found. The La Paz population-based registry is known here only from the 1981 abstract; its years of operation and rates were not read. IARC's detailed data sources page for Bolivia was not read; the method is taken from the fact sheet.",
      links: [
        { label: "PAHO: variables of the national cancer registry agreed (6 October 2023, Spanish)", url: PAHO_RNC },
        { label: "Decreto Supremo 4881, article 5 (Lexivox, Spanish)", url: DS4881 },
      ],
    },
    {
      id: "radiotherapy-count",
      title: "How many radiotherapy machines Bolivia has in total is not confirmed",
      plain:
        "This page counts the state's three nuclear medicine and radiotherapy centres from the agency that runs them. Radiotherapy in social insurance, university and private hospitals is not counted, because OnCo could not read the IAEA's directory of radiotherapy centres or WHO's 2020 cancer country profile for Bolivia.",
      detail:
        "The IAEA's DIrectory of RAdiotherapy Centres (DIRAC) serves its country pages through an interactive application that returned no readable figures to a plain request. WHO's 2020 cancer country profile for Bolivia returned 404 at its expected address, and the Internet Archive refused the request for a copy (HTTP 429). ABEN gives equipment for two of its centres: in La Paz two linear accelerators and high dose rate brachytherapy, and in Santa Cruz two linear accelerators and a high dose rate brachytherapy unit delivered in April 2022, before it opened in September 2022. ABEN's El Alto pages give services but not machine counts, and construction of the Potosí unit had stalled and was being restarted in August 2026. Ask the referring hospital where radiotherapy is available and how long the wait is.",
      links: [
        { label: "ABEN: Red de Centros de Medicina Nuclear y Radioterapia (Spanish)", url: ABEN_RED },
        { label: "ABEN: linear accelerators and brachytherapy delivered to the Santa Cruz centre (21 April 2022, Spanish)", url: "https://www.aben.gob.bo/nota_prensa/presidente-arce-entrega-aceleradores-lineales-y-equipo-de-braquiterapia-de-ultima-generacion-al-cmnyr-de-santa-cruz/" },
        { label: "ABEN: the Santa Cruz centre's first year (23 September 2023, Spanish)", url: "https://www.aben.gob.bo/nota_prensa/cmnyr-de-santa-cruz-cumple-un-ano-brindando-atencion-integral-y-de-calidad-a-los-pacientes-con-cancer/" },
        { label: "Ministerio de Salud y Deportes: Potosí radiotherapy unit (20 August 2026, Spanish)", url: MSYD_POTOSI_RT },
        { label: "IAEA: DIrectory of RAdiotherapy Centres", url: "https://dirac.iaea.org/" },
      ],
    },
    {
      id: "sus-cover",
      title: "Which cancer treatments the SUS pays for, medicine by medicine, could not be read",
      plain:
        "The SUS website refused the connection, so OnCo could not read its list of covered health products for cancer, or the list of oncology medicines agreed for the SUS in 2023. The essential medicines list shows what public services should buy from, not what is in stock.",
      detail:
        "sus.minsalud.gob.bo did not answer on 11 November 2026, and the Gaceta Oficial de Bolivia did not either, so the laws on this page were read from Lexivox's reproduction, which notes that only the Gaceta is the legal reference. AGEMED's PDF of Ministerial Resolution 0121 approving the LINAME 2026 to 2027 was damaged and could not be read, so its date is not given. OnCo found no figure for the share of Bolivians covered by social security funds rather than the SUS, no population-based survival figures, and no national count of oncologists. AGEMED publishes no registration time for a new medicine that OnCo could find. A Senate report on the late regulation of the cancer law was not read.",
      links: [
        { label: "Ley 1152 (Lexivox, Spanish)", url: L1152 },
        { label: "AGEMED: LINAME 2026 to 2027 (spreadsheet, Spanish)", url: LINAME_XLSX },
      ],
    },
  ],
  institutions: ["bolivia-ministry-of-health", "agemed-bolivia", "aben-bolivia", "iarc", "iaea", "who", "ico-catalonia"],
  companies: ["roche-genentech"],
  drugs: ["trastuzumab", "pertuzumab", "rituximab", "imatinib", "dasatinib", "nimotuzumab", "abiraterone", "enzalutamide"],
  trials: [],
  papers: [
    "paper-huanca-challgua-cervical-screening-coverage-bolivia-rpsp-2025", "paper-rios-dalenz-cancer-la-paz-ijc-1981", "paper-scherer-eulat-eradicate-gbc-ije-2025",
    "paper-allende-hpv-self-sampling-bolivia-bmcid-2020", "paper-carozzi-hpv-self-sampling-bolivia-plosone-2024", "paper-frank-palliative-care-bolivia-pmr-2026",
  ],
  people: [],
  how:
    "Every card was written from Bolivian official sources and peer-reviewed papers, read in Spanish where they are Spanish and in full rather than through a summary: the texts of Ley 1152, Ley 1223 del Cáncer and Decretos Supremos 4881 and 4608 as reproduced by Lexivox; the Ministerio de Salud y Deportes' news pages of 2026; PAHO's 2023 note on the national registry; the Agencia Boliviana de Energía Nuclear's pages and press notes; AGEMED's pages, its LINAME 2026 to 2027 spreadsheet and its clinical trial norm; WHO's HPV coverage rows and its list of maturity level 3 and 4 regulators; World Bank health expenditure data; IARC's GLOBOCAN 2024 fact sheet and data file; ClinicalTrials.gov's API; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, AGEMED, ABEN and six papers) carry their own sources.",
  verify:
    "National incidence figures are IARC estimates built from death records, not a count of diagnoses. What the SUS pays for, which essential medicines are in stock and where radiotherapy is available change faster than laws and lists; ask the treating hospital's oncology service, or the SUS or your social security fund, what applies to you. Screening services and the Consultorios Rosa are being rolled out department by department, so availability depends on where you live.",
  verifyLinks: [
    { label: "Ministerio de Salud y Deportes", url: "https://www.minsalud.gob.bo/" },
    { label: "AGEMED", url: AGEMED },
    { label: "ABEN: Red de Centros de Medicina Nuclear y Radioterapia", url: ABEN_RED },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Bolivia (PDF)", url: IARC_FACTSHEET },
  ],
};
