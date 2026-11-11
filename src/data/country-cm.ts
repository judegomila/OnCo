import type { CountryDive } from "@/data/country-dive";

/**
 * Cameroon deep dive: the hand-written cards for /countries/cm/ (wave 10). Every figure was read from the raw text of
 * its source on 11 November 2026, not from a summary of it: the Ministry of Public Health's National Strategic Plan for
 * Prevention and Cancer Control 2020 to 2024 (English edition, PDF text, ICCP portal), WHO's Cancer Country Profile
 * 2020 and Cervical Cancer Country Profile 2021 for Cameroon (PDF text), the Ministry's news pages on minsante.cm
 * (universal health coverage, the cancer committee, the cervical cancer elimination strategy, the planned medicines
 * agency, Douala General Hospital), WHO's list of regulators at maturity level 3 and 4 (PDF, August 2026), WHO's HPV
 * coverage, introduction and schedule rows from its public data API, the World Bank's health expenditure indicators
 * from its API, the African Cancer Registry Network's member list, ClinicalTrials.gov's API, IARC's GLOBOCAN 2024 fact
 * sheet for Cameroon, and the papers' abstracts (and open full text where cited) through Europe PMC. Where a figure
 * could not be read it is named under `gaps`.
 */
const PLAN = "https://www.iccp-portal.org/sites/default/files/plans/FINAL%20COPY%20OF%20PSNPLCa%20ENGLISH.pdf";
const PLAN_FR = "https://www.iccp-portal.org/sites/default/files/plans/FINAL%20COPY%20PSNPLCa%20FRENCH.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/120-cameroon-fact-sheet.pdf";
const WHO_PROFILE_2020 = "https://www.iccp-portal.org/sites/default/files/plans/CMR_2020.pdf";
const WHO_CX_2021 = "https://www.iccp-portal.org/sites/default/files/plans/cervical-cancer-cmr-2021-country-profile-en.pdf";
const ICCP_SURV = "https://www.iccp-portal.org/sites/default/files/plans/Cameroon%20NCCP%20Survivorship%20profile.pdf";
const AFCRN_LIST = "https://afcrn.org/index.php/membership/membership-list";
const MS = "https://minsante.cm/site/?q=fr/content";
const CSU_LAUNCH = `${MS}/couverture-sant%C3%A9-universelle-la-phase-i-sur-les-starting-blocks`;
const CSU_2023 = `${MS}/couverture-sant%C3%A9-universelle-plus-de-1052849-personnes-d%C3%A9j%C3%A0-enr%C3%B4l%C3%A9es-0`;
const CSU_2024 = `${MS}/journ%C3%A9e-internationale-de-la-couverture-sant%C3%A9-universelle-le-cameroun-c%C3%A9l%C3%A8bre-ses-avanc%C3%A9es`;
const CSU_2025 = `${MS}/le-ministre-de-la-sant%C3%A9-publique-%C3%A0-douala-entre-reconnaissance-du-personnel-suivi-des-grands`;
const CISCON_2026 = `${MS}/lutte-contre-le-cancer-la-prise-en-charge-pr%C3%A9occupe`;
const CNLCA_2026 = `${MS}/comit%C3%A9-national-de-lutte-contre-le-cancer-cnlca-dr-zeh-kakanou-florence-prend-la-rel%C3%A8ve`;
const CCU_2025 = `${MS}/cancer-du-col-de-lut%C3%A9rus-le-cameroun-sur-la-voie-de-son-%C3%A9limination`;
const ACM_2025 = `${MS}/r%C3%A9gulation-pharmaceutique-lagence-camerounaise-de-m%C3%A9dicaments-acm-en-gestation`;
const HGD_2026 = `${MS}/h%C3%B4pital-g%C3%A9n%C3%A9ral-de-douala-un-p%C3%B4le-d%E2%80%99excellence-au-service-de-la-sant%C3%A9-des-camerounais`;
const INDIA_2025 = `${MS}/diplomatie-sanitaire-le-cameroun-et-l%E2%80%99inde-renforcent-leur-coop%C3%A9ration-en-mati%C3%A8re-de-sant%C3%A9`;
const ACPA_2026 = `${MS}/renforcement-de-la-lutte-contre-le-cancer-le-minsant%C3%A9-et-l%E2%80%99acpa-consolident-leur-partenariat`;
const PAEDS_2025 = `${MS}/lutte-contre-les-cancers-p%C3%A9diatriques-am%C3%A9liorer-la-prise-en-charge-des-cancers-infantiles`;
const WHO_ML = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'CMR'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_HPV_INTRO = "https://xmart-api-public.who.int/WIISE/AD_VACCINE_INTRODUCTIONS?$filter=COUNTRY%20eq%20'CMR'";
const WB_OOP = "https://api.worldbank.org/v2/country/CMR/indicator/SH.XPD.OOPC.CH.ZS?format=json";
const WB_GOV = "https://api.worldbank.org/v2/country/CMR/indicator/SH.XPD.GHED.CH.ZS?format=json";
const CTGOV = "https://clinicaltrials.gov/search?locStr=Cameroon&country=Cameroon&cond=cancer";

export const CM_DIVE: CountryDive = {
  iso2: "CM",
  iso3: "CMR",
  name: "Cameroon",
  flag: "🇨🇲",
  asOf: "2026-11-11",
  title: "Cancer in Cameroon",
  description:
    "Cancer in Cameroon from Cameroonian sources: IARC's estimate of 16,087 new cancers and 9,719 deaths in 2024, made without a working national registry, the Ministry of Public Health's 2020 to 2024 cancer plan, universal health coverage launched in 2023 without cancer in its basket, families paying about two thirds of all health spending, medicines regulation inside the Ministry with a national agency being prepared, a 2025 cervical cancer elimination strategy, radiotherapy concentrated in Douala, and a paediatric oncology network built around two hub hospitals.",
  lede:
    "Cameroon has no working population-based cancer registry, so its national figures are IARC estimates: 16,087 new cancers and 9,719 deaths in 2024, with breast, cervical and prostate cancer the commonest and cervical cancer the leading cause of cancer death. Treatment is concentrated in the general hospitals of Yaoundé and Douala, radiotherapy machines are few, and most of the cost of care falls on families.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Cameroon is 16,087 new cancers and 9,719 deaths, an age-standardised incidence of 99.7 per 100,000 (93.0 in men, 108.3 in women), including 412 non-melanoma skin cancers. IARC's fact sheet names no country-specific source for incidence, giving its method as national or subnational rates scaled to regional all-cancer rates; for mortality it names Survcan registry survival data applied to its incidence estimates. WHO's 2020 cancer profile warns that Cameroon's incidence estimates have a high degree of uncertainty because they are not based on a population-based registry, and its mortality estimates likewise because there are no national mortality data. Successive editions move: the national plan quotes GLOBOCAN 2018 at 15,769 cases and gives 10,533 deaths a year, a figure its summary attributes to WHO, GLOBOCAN 2020 gave 20,745 cases and 13,199 deaths, and GLOBOCAN 2024 gives fewer cases than 2020. OnCo reads that fall as a change in how the estimate was made, not as evidence of fewer cancers. The Yaoundé registry the plan cites was interrupted in 2012, and the plan's only registry figures are an average age at diagnosis of about 45 and a share of 61.85% of cancers in women.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Cameroon",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Cameroon (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 16,000 new cancers a year, and cervical cancer the leading cause of cancer death",
          plain:
            "IARC estimates 16,087 new cancers in Cameroon in 2024: 9,549 in women and 6,538 in men. Breast cancer is the commonest, then cervical cancer and prostate cancer, and cervical cancer causes the most cancer deaths. For every ten new cancers IARC estimates about six cancer deaths in the same year, and the Ministry of Public Health says about 90% of patients reach a treatment centre with advanced disease.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,824 breast cancers (1,368 deaths), 2,379 cervical cancers (1,453 deaths), 1,829 prostate cancers (1,124 deaths), 1,262 non-Hodgkin lymphomas, 926 Kaposi sarcomas, 579 colorectal cancers and 503 liver cancers. Breast cancer is 29.6% of cancers in women and cervical cancer 24.9%; prostate cancer is 28.0% of cancers in men, followed by non-Hodgkin lymphoma and Kaposi sarcoma; the national plan counts Kaposi sarcoma among Cameroon's infection-related cancers. The risk of developing a cancer before age 75 is 10.3% for men and 11.5% for women, and an estimated 33,625 people are living within five years of a diagnosis. Deaths divided by new cases give 0.60 for 2024. The Ministry of Public Health's National Strategic Plan for Prevention and Cancer Control 2020 to 2024 states that about 90% of patients arrive at treatment centres at advanced stages, that about 20% abandon treatment, and that 5,191 cancers a year, 33.6%, are attributable to infections. It expects about 900 childhood cancers a year.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Cameroon (PDF)", url: IARC_FACTSHEET },
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, summary and sections 2.1 and 2.2 (Ministry of Public Health, PDF)", url: PLAN },
          ],
        },
        {
          id: "care-capacity",
          title: "Where treatment is: two general hospitals, nine chemotherapy sites and few machines",
          plain:
            "In the 2020 national plan, only the general hospitals of Yaoundé and Douala had the authorised setting for full cancer care, and nine facilities gave chemotherapy, most of them in those two cities. Pathology laboratories were in six places, immunohistochemistry only at the Centre Pasteur, and there was no working nuclear medicine or PET scanning.",
          detail:
            "The plan's list of facilities giving chemotherapy names Yaoundé General Hospital (since 1993), Douala General Hospital, Yaoundé Central Hospital, Laquintinie Hospital in Douala, Mbingo Baptist Hospital (since 2006), Bonassama District Hospital, Saint Martin de Porres, the gynaeco-obstetric and paediatric hospital the plan calls HGOPED, and the Mother and Child Centre of the Chantal Biya Foundation. Yaoundé General Hospital's oncology department received more than 800 new patients a year, about half of whom started chemotherapy. Pathology laboratories were three public (Douala, Yaoundé, Buea) and three private (Bamenda, Mbingo, Bafoussam), and 10 of 14 listed CT scanners and 2 of 3 MRI scanners were working. The plan counted, for 2018, 9 medical oncologists, 6 haemato-oncologists, 5 radiotherapists, 5 oncology surgeons, 3 paediatric oncologists and 1 oncology nurse, beside 50 palliative care nurses. The Ministry's April 2026 profile of Douala General Hospital lists 1,232 new radiotherapy consultations, 3,468 chemotherapy courses and 1,683 new oncology consultations, without giving the period.",
          links: [
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, section 2.5 and tables 3 to 5 (PDF)", url: PLAN },
            { label: "MINSANTE: Douala General Hospital (11 April 2026)", url: HGD_2026 },
          ],
        },
        {
          id: "radiotherapy",
          title: "Radiotherapy: two machines for about 29 million people, both in Douala",
          plain:
            "The national plan of 2020 described one working public radiotherapy machine, a cobalt-60 unit at Douala General Hospital, with waits of up to three months, and a private machine near Douala that most patients cannot afford. Yaoundé's radiotherapy closed in 2012. Papers from 2024 and 2026 still describe two machines, both in Douala, and no brachytherapy.",
          detail:
            "The plan says the radiotherapy department of Yaoundé General Hospital has been closed since 2012 because its radioactive source was exhausted, that Douala General Hospital's single cobalt-60 unit gives two-dimensional treatment and could suffer the same fate if its source was not replaced, and that the country's only nuclear medicine department, at Yaoundé General Hospital, closed in early 2019. It planned to strengthen Douala and Yaoundé and open three more radiotherapy services, in Bertoua, Garoua and Bamenda. The Cameroon Oncology Center, a private Douala centre, reports one linear accelerator in use since 2019 and describes it and the Douala General Hospital cobalt unit as Cameroon's two megavoltage machines, about one for every 15 million people; its operating cost was about 2,106 US dollars per patient in 2021. Mbingo Baptist Hospital described in 2024 building a bunker for a linear accelerator in the North-West region. In May 2025 the Minister inspected an extension of Douala General Hospital's radiotherapy department and a future nuclear medicine unit, and in December 2025 India offered to build a radiotherapy bunker. OnCo could not confirm how many machines were treating patients in November 2026; see the gaps.",
          links: [
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, sections 1.4 and 2.5 and the operational framework (PDF)", url: PLAN },
            { label: "Mobit et al., the cost of radiotherapy at the Cameroon Oncology Center (Radiat Oncol 2026)", url: "https://doi.org/10.1186/s13014-026-02813-0" },
            { label: "Akundoh Tontu et al., developing a radiotherapy department at Mbingo (Tech Innov Patient Support Radiat Oncol 2024)", url: "https://doi.org/10.1016/j.tipsro.2024.100293" },
            { label: "MINSANTE: the Minister in Douala (2 May 2025)", url: CSU_2025 },
            { label: "MINSANTE: Cameroon and India strengthen health cooperation (18 December 2025)", url: INDIA_2025 },
          ],
        },
      ],
      tables: [
        {
          id: "cm-counts",
          title: "What Cameroon has counted, and what has been estimated for it",
          caption: "New cancers and cancer deaths by source and year. Rows marked estimate are IARC's; the others are counts made in Cameroonian hospitals.",
          columns: [
            { key: "source", label: "Source (what it covers)" },
            { key: "period", label: "Year or period" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { source: "National plan: GLOBOCAN 2018 cases, and deaths the plan attributes to WHO (whole country)", period: "2018", cases: 15769, deaths: 10533 },
            { source: "IARC GLOBOCAN 2020 estimate, as quoted by the ICCP survivorship profile (whole country)", period: "2020", cases: 20745, deaths: 13199 },
            { source: "IARC GLOBOCAN 2024 estimate (whole country)", period: "2024", cases: 16087, deaths: 9719 },
            { source: "Cervical cancer cases and deaths declared, CNLCa elimination strategy (cervix only)", period: "2022", cases: 2525, deaths: 1837 },
            { source: "Paediatric Oncology Networked Database, Banso and Mbingo Baptist hospitals (children 0 to 15)", period: "2004 to 2015", cases: 1029, deaths: null },
            { source: "Mother and Child Centre, Chantal Biya Foundation, paediatric oncology (one hospital)", period: "2018", cases: 150, deaths: null },
          ],
          note: "Cameroon has no working population-based registry: the Yaoundé registry was interrupted in 2012 and WHO's 2021 cervical cancer profile records none. The hospital rows count only patients who reached those hospitals. The cervical row is the Ministry's reported figure for declared cases; the Ministry's page does not say how they were collected. The fall between the 2020 and 2024 IARC estimates should not be read as fewer cancers: the estimates carry high uncertainty.",
          sources: [
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, sections 2.1 and 2.4 (PDF)", url: PLAN },
            { label: "ICCP: NCCP survivorship profile, Cameroon (PDF)", url: ICCP_SURV },
            { label: "IARC: GLOBOCAN 2024 fact sheet, Cameroon (PDF)", url: IARC_FACTSHEET },
            { label: "MINSANTE: cervical cancer, Cameroon on the road to elimination (19 July 2025)", url: CCU_2025 },
            { label: "Afungchwi et al., a hospital-based cancer registry in North-West Cameroon (J Trop Pediatr 2021)", url: "https://doi.org/10.1093/tropej/fmaa038" },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry that stopped in 2012",
      aside: { label: "African Cancer Registry Network: current membership list", url: AFCRN_LIST },
      cards: [
        {
          id: "registry-yaounde",
          title: "The Yaoundé registry was interrupted in 2012, and the plan to restart it",
          plain:
            "Cameroon had a cancer registry in Yaoundé, but the national plan says it stopped in 2012 and that cancer surveillance has not worked since. Only suspected breast, cervical and prostate cancers are reported through the national health information system. No Cameroonian registry is on the African Cancer Registry Network's current member list.",
          detail:
            "The 2020 to 2024 plan states that epidemiological surveillance of cancer has not been effective since 2012 because the Yaoundé cancer registry was interrupted, and that facilities report through monthly activity reports in DHIS2 only suspected cases of breast, cervical and prostate cancer, with a national completion rate of 65%. It planned to reactivate two population cancer registries in Yaoundé and Douala, staff and equip them, create hospital registries for adults and children, train councils and hospitals on death certificates, and affiliate Cameroon's registries to African and global networks. WHO's 2021 cervical cancer profile records that no population-based cancer registry exists. The African Cancer Registry Network's current membership list, read on 11 November 2026, includes registries in Chad, Congo and Nigeria but none in Cameroon. The longest-running direct count OnCo found is hospital-based: the Paediatric Oncology Networked Database at Banso and Mbingo Baptist hospitals, which recorded 1,029 childhood cancers from 2004 to 2015.",
          links: [
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, sections 2.1 and 2.4 and table 12 (PDF)", url: PLAN },
            { label: "WHO: cervical cancer country profile, Cameroon, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
            { label: "African Cancer Registry Network: current membership list", url: AFCRN_LIST },
            { label: "Afungchwi et al., a hospital-based cancer registry in North-West Cameroon (J Trop Pediatr 2021)", url: "https://doi.org/10.1093/tropej/fmaa038" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: families, for most of it",
      aside: { label: "MINSANTE: two years of universal health coverage (2 May 2025)", url: CSU_2025 },
      cards: [
        {
          id: "oop",
          title: "Households pay about two thirds of all health spending",
          plain:
            "In Cameroon most health care is paid for at the point of use. World Bank figures from WHO's health spending database put out-of-pocket payments at 67.7% of current health spending in 2023, and government spending at 14.7%. The national plan says cancer treatment is expensive and that the Ministry's subsidy for cancer drugs covers less than a tenth of what is needed.",
          detail:
            "The World Bank indicator for out-of-pocket spending as a share of current health expenditure, drawn from WHO's Global Health Expenditure Database, gives 67.7% for Cameroon in 2023, 67.8% in 2022 and 78.5% in 2017; domestic general government health spending was 14.7% of current health expenditure in 2023, and current health spending was about 79 US dollars a person. The 2020 to 2024 plan records that since 2005 the Ministry of Public Health has partly subsidised the purchase of cancer drugs but that the budget covers less than 10% of national needs, that targeted and supportive medicines are often unavailable because of their cost, and that palliative care is in neither the minimum nor the complementary package of care. In a 2026 study, 57 people working in Cameroon's chemotherapy supply chain linked high prices to substandard medicines and treatment. The private Cameroon Oncology Center put its own operating cost for a course of radiotherapy at about 2,106 US dollars in 2021.",
          links: [
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Cameroon (API)", url: WB_OOP },
            { label: "World Bank: domestic general government health expenditure, % of current health expenditure, Cameroon (API)", url: WB_GOV },
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, section 2.5 (PDF)", url: PLAN },
            { label: "Saidu et al., barriers to accessing high-quality cancer medicines in Cameroon (PLOS Glob Public Health 2026)", url: "https://doi.org/10.1371/journal.pgph.0005370" },
          ],
        },
        {
          id: "csu",
          title: "Universal health coverage began in 2023, and cancer is not yet in its basket",
          plain:
            "Cameroon launched the first phase of universal health coverage (Couverture Santé Universelle) on 12 April 2023 in the East region. It covers children under five, pregnant women and newborns, HIV, tuberculosis and kidney failure, and by May 2025 more than 3.9 million people had enrolled. The Ministry has said the basket will grow, but its published lists do not include cancer.",
          detail:
            "The Ministry's April 2023 page described phase 1 as combining promotional and preventive care (vaccination, malnutrition, screening) with curative care. At an October 2023 press briefing the Minister reported 1,684,720 people pre-enrolled and 1,052,849 fully enrolled, and listed the targets as children under five for simple and severe malaria, pregnant women and newborns to 42 days, and people with kidney failure, HIV and tuberculosis; the Minister said 98% of patients with kidney failure were having dialysis for an annual contribution of 15,000 FCFA. In December 2024 the Minister reported 3,524,687 people enrolled, said type 1 diabetes and viral hepatitis would be added next, and gave a goal of about 6 million people covered. In May 2025 he reported more than 3.9 million enrolled, 91% of the 2025 target. None of these pages names cancer. In March 2026 the first congress of the Cameroonian Society of Oncology, opened in Douala, took as its question how to improve cancer care while universal coverage is still being built.",
          links: [
            { label: "MINSANTE: universal health coverage, phase 1 at the starting blocks (April 2023)", url: CSU_LAUNCH },
            { label: "MINSANTE: more than 1,052,849 people enrolled (press briefing of 4 October 2023)", url: CSU_2023 },
            { label: "MINSANTE: International Universal Health Coverage Day (13 December 2024)", url: CSU_2024 },
            { label: "MINSANTE: the Minister in Douala, two years of universal health coverage (2 May 2025)", url: CSU_2025 },
            { label: "MINSANTE: cancer care, first congress of the Cameroonian Society of Oncology (26 March 2026)", url: CISCON_2026 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: a Ministry department, and an agency in preparation",
      aside: { label: "MINSANTE: the Cameroonian Medicines Agency in preparation (13 March 2025)", url: ACM_2025 },
      cards: [
        {
          id: "acm",
          title: "Medicines are regulated inside the Ministry; a Cameroonian Medicines Agency is being prepared",
          plain:
            "Cameroon has no independent medicines agency: regulation sits inside the Ministry of Public Health, which has a national quality control laboratory. In March 2025 its Department of Pharmacy, Medicines and Laboratories reported a draft law and road map for a Cameroonian Medicines Agency. Cameroon is not on WHO's August 2026 list of regulators rated at maturity level 3 or 4.",
          detail:
            "At a meeting on 12 March 2025 chaired by the Inspector General of Pharmaceutical Services and Laboratories, the director of the Department of Pharmacy, Medicines and Laboratories reported that, after Cameroon ratified the African Union treaty establishing the African Medicines Agency, a road map and a draft text creating, organising and running a Cameroonian Medicines Agency (Agence Camerounaise du Médicament) had been prepared, with a sustainability study still to come. The meeting named market surveillance, smuggling and counterfeit medicines among its concerns. For 2024 it reported ten applications for clinical trial authorisation, two in progress, covering subjects including malaria, cancers, tuberculosis and hepatitis, and 577 pharmaceutical batches received by the national quality control laboratory, LANACOME. WHO's list of national regulatory authorities operating at maturity level 3 or 4, dated August 2026, includes ten African regulators, among them those of Senegal, Nigeria, Ghana, Rwanda and Ethiopia, but not Cameroon's. OnCo found no published registration times for medicines in Cameroon.",
          links: [
            { label: "MINSANTE: pharmaceutical regulation, the Cameroonian Medicines Agency in preparation (13 March 2025)", url: ACM_2025 },
            { label: "WHO: list of national regulatory authorities operating at maturity level 3 and 4 (August 2026)", url: WHO_ML },
          ],
        },
        {
          id: "medicine-quality",
          title: "Cancer medicines of uncertain quality, and why",
          plain:
            "Doctors, pharmacists and regulators interviewed for a 2026 study described weak regulation, underfunded regulatory work and high prices as reasons that substandard cancer medicines circulate in Cameroon, and said treatment is sometimes chosen by what a patient can afford. The national plan says chemotherapy is prepared at the point of care in most facilities.",
          detail:
            "Saidu and colleagues reviewed documents and interviewed 57 people across Cameroon's chemotherapy supply chain, from regulation and procurement to quality control and use. They found weak regulatory systems, inadequate funding for regulatory activities and a lack of core competencies among regulatory staff, together with high prices that shaped which products patients could afford, and wrote that the lack of point-of-care testing tools appears to encourage substandard medicines and the use of substandard therapies or protocols. The 2020 to 2024 plan records that day hospitals for chemotherapy do not always meet international standards, that drugs are prepared at the point of care in most facilities, sometimes under unskilled supervision, and asks for continued availability of chemotherapy drugs and harmonised national treatment guidelines; WHO's 2020 profile recorded that Cameroon had no cancer management guidelines. In February 2026 the Ministry's Secretary General asked the cancer committee for an accreditation mechanism for hospitals treating cancer and continuous supply of medicines.",
          links: [
            { label: "Saidu et al., barriers to accessing high-quality cancer medicines in Cameroon (PLOS Glob Public Health 2026)", url: "https://doi.org/10.1371/journal.pgph.0005370" },
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, section 2.5 and table 11 (PDF)", url: PLAN },
            { label: "WHO: cancer country profile, Cameroon, 2020 (PDF, ICCP portal)", url: WHO_PROFILE_2020 },
            { label: "MINSANTE: CNLCa, Dr Zeh Kakanou Florence takes over (12 February 2026)", url: CNLCA_2026 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "MINSANTE: cervical cancer, Cameroon on the road to elimination (19 July 2025)", url: CCU_2025 },
      cards: [
        {
          id: "cervical-screening",
          title: "No national screening programme yet; a cervical cancer elimination strategy since July 2025",
          plain:
            "Cameroon has had no national programme for cervical or breast screening. WHO's 2021 profile found about 5% of women aged 30 to 49 screened in the previous five years. Screening has come from faith-based health services, some public hospitals and research projects. In July 2025 the Ministry validated a strategy to eliminate cervical cancer by 2030.",
          detail:
            "The 2020 to 2024 plan states that Cameroon does not have a national screening programme for breast and cervical cancers, that a 2016 cervical cancer plan was drafted but not implemented, and that the Cameroon Baptist Convention Health Services, the Presbyterian Church in Cameroon Health Services and some public hospitals screen and treat precancerous lesions in cities including Bamenda, Mbingo, Kumbo, Douala, Kumba, Bafoussam, Yaoundé and Limbe, while many lesions cannot be treated for lack of equipment. WHO's 2021 cervical cancer profile records no national programme, 5% of women aged 30 to 49 screened in the last five years and 6% ever screened. A 2023 review of 20 studies found a lack of a national training curriculum and algorithm. In Dschang, a programme of HPV self-sampling with same-day testing and treatment screened 840 women; 19.8% were HPV positive. The strategy validated on 16 July 2025 aims by 2030 for 90% HPV vaccination, 70% of women screened, and 90% of precancerous lesions and invasive cancers treated, and to cut incidence from 33.1 to 17 per 100,000 women.",
          links: [
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, section 2.4 (PDF)", url: PLAN },
            { label: "WHO: cervical cancer country profile, Cameroon, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
            { label: "MINSANTE: cervical cancer, Cameroon on the road to elimination (19 July 2025)", url: CCU_2025 },
            { label: "Woks et al., disparities in cervical cancer screening programmes in Cameroon (Int J Equity Health 2023)", url: "https://doi.org/10.1186/s12939-023-01942-2" },
            { label: "Levy et al., implementing the 3T approach for cervical screening in Cameroon (Cancer Med 2020)", url: "https://doi.org/10.1002/cam4.3355" },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccine nationally since 2020, one dose since 2023, and boys included",
          plain:
            "After a pilot, Cameroon introduced the HPV vaccine nationwide in 2020. Since 2023 it has given a single dose, and the coverage it reports to WHO includes boys as well as girls. In 2025, 30% of the target group of girls and 28% of boys were vaccinated. Hepatitis B vaccine, which protects against liver cancer, is part of routine childhood immunisation.",
          detail:
            "WHO's vaccine introduction records show HPV vaccine introduced nationally in 2020, after community introduction and a school launch scheduled for 23 November 2020, and a one-dose schedule since 2023. The national plan describes a pilot for girls aged 9 to 13 completed in 2015, and a private cost of about 35,000 FCFA a dose before national introduction. In the programme coverage rows Cameroon reported to WHO, first-dose coverage of girls was 5% in 2020, 21% in 2021 and 23% in 2022; with one dose, coverage was 68% of girls and 30% of boys in 2023, 36% and 24% in 2024, and 30% and 28% in 2025, against target groups of 393,418 girls and 293,989 boys in 2025. The 2025 elimination strategy aims for 90% coverage by 2030. The plan records hepatitis B vaccine in routine immunisation, but that the birth dose for babies born to infected mothers was then paid by the family. The plan's breast cancer objective was mammography for at least 80% of women aged 40 and over and a mammograph in every regional hospital; WHO's 2020 profile recorded no breast screening programme, and in 2026 the Ministry asked the cancer committee for mobile mammography in its campaigns.",
          links: [
            { label: "WHO immunisation data: HPV programme coverage rows for Cameroon (API)", url: WHO_HPV_API },
            { label: "WHO immunisation data: vaccine introduction rows for Cameroon (API)", url: WHO_HPV_INTRO },
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, sections 2.4 and 5 (PDF)", url: PLAN },
            { label: "MINSANTE: CNLCa, Dr Zeh Kakanou Florence takes over (12 February 2026)", url: CNLCA_2026 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Cameroon does",
      title: "What Cameroon does differently",
      cards: [
        {
          id: "faith-based",
          title: "Faith-based hospitals give cancer care outside the two big cities",
          plain:
            "In the North-West region, Mbingo Baptist Hospital, run by the Cameroon Baptist Convention Health Services, has built cancer care step by step: a childhood cancer programme in 2003, women's cancer screening in 2007, pathology in 2010 and adult oncology in 2017. It sees about 1,000 new cancer cases a year and has been building a radiotherapy department.",
          detail:
            "The hospital's staff describe a 278-bed rural hospital that is also a postgraduate training site, where cancer care began with a childhood cancer programme supported by World Child Cancer in 2003, the Women's Health Program for breast and cervical screening started in 2007, a pathology laboratory opened in 2010 with two on-site pathologists and telepathology support, and adult medical oncology began in 2017. The commonest adult cancers seen are breast, prostate and cervical cancer; in children, Burkitt lymphoma, non-Hodgkin lymphoma, Wilms tumour and brain tumours. Patients needing radiotherapy had to travel to Douala, which few could afford, so the hospital raised funds abroad, trained radiation oncologists, dosimetrists, radiation therapists and physicists, and built a bunker for a linear accelerator. The national plan names the Baptist and Presbyterian health services as two of the bodies doing routine cervical screening and treatment, and its pathology count includes the private laboratories at Mbingo and Bamenda. The paediatric registry the Baptist hospitals keep is one of the few direct counts of childhood cancer in the country.",
          links: [
            { label: "Akundoh Tontu et al., developing a radiotherapy department at Mbingo (Tech Innov Patient Support Radiat Oncol 2024)", url: "https://doi.org/10.1016/j.tipsro.2024.100293" },
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, sections 2.4 and 2.5 (PDF)", url: PLAN },
          ],
        },
        {
          id: "childhood",
          title: "Childhood cancer: a national shared care network around two hub hospitals",
          plain:
            "In 2023 Cameroon set up a national network for children with cancer under WHO's Global Initiative for Childhood Cancer. Two hub hospitals, Mbingo Baptist Hospital and the Mother and Child Centre in Yaoundé, give full treatment, and eight other hospitals give basic chemotherapy and refer children on. None of the ten had radiotherapy.",
          detail:
            "The network's baseline survey of ten hospitals in six regions, validated with the Ministry of Public Health and the cancer committee, designated the two hubs, found X-ray and ultrasound in all facilities but CT scanning and paediatric surgery only at the hubs, and no immunohistochemistry or radiotherapy anywhere in the network. It identified 49 healthcare workers, including five paediatric oncologists and 35 trained nurses, and found psychosocial and rehabilitation services in three centres; civil society groups helped with transport, housing and buying drugs. In May 2025 the Ministry convened experts to revise the network's manual of standards, protocols and referral. Results show why speed matters: of 934 children with Burkitt lymphoma treated from 2004 to 2015, 53% were alive at one year, from 77.1% at stage I to 32.4% at stage IV. The national plan expects about 900 childhood cancers a year; the Mother and Child Centre recorded 150 in 2018.",
          links: [
            { label: "Afungchwi et al., a national shared care network for paediatric oncology in Cameroon (J Cancer Policy 2026)", url: "https://doi.org/10.1016/j.jcpo.2026.100780" },
            { label: "MINSANTE: improving care for childhood cancers (30 May 2025)", url: PAEDS_2025 },
            { label: "Hesseling et al., Burkitt lymphoma in 934 patients in Cameroon (PLOS ONE 2024)", url: "https://doi.org/10.1371/journal.pone.0299777" },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research, trials and the national plan",
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Cameroon; local research is mostly cervical screening",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026, none of the cancer trials in our records lists a site in Cameroon. ClinicalTrials.gov itself lists a small number of cancer-related studies there, most of them on cervical screening and most sponsored from Geneva, the United States or France.",
          detail:
            "Of 5,899 trials in OnCo's graph with ClinicalTrials.gov participation data, 5,580 list their countries and none includes Cameroon; four include Nigeria and eight Kenya. That reflects the trials OnCo holds, mostly large trials of new medicines. A ClinicalTrials.gov search on 11 November 2026 returned 169 studies of any condition with a location matching Cameroon, and 17 matching cancer; of those 17, twelve concern cervical screening or prevention, several of them sponsored by the University Hospitals of Geneva or its investigators, and others include a Wilms tumour project and a childhood cancer registry run by the French Africa Pediatric Oncology Group. The national plan noted little experience of cancer research among health professionals and asked to build capacity for clinical trials. In 2024 the Ministry received ten applications to authorise clinical trials, on subjects including cancers. The Cameroonian Society of Oncology held its first international congress in Douala in March 2026.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Cameroon (search)", url: CTGOV },
            { label: "MINSANTE: pharmaceutical regulation, the Cameroonian Medicines Agency in preparation (13 March 2025)", url: ACM_2025 },
            { label: "MINSANTE: cancer care, first congress of the Cameroonian Society of Oncology (26 March 2026)", url: CISCON_2026 },
          ],
        },
        {
          id: "plan-2020",
          title: "The 2020 to 2024 plan: cut cancer illness and death by 10%, for about 90 million US dollars",
          plain:
            "Cameroon's National Strategic Plan for Prevention and Cancer Control ran from 2020 to 2024. It aimed to cut cancer illness and deaths by at least 10%, bring HPV vaccine into routine immunisation, screen for cervical cancer with visual inspection, build a National Cancer Institute and open three more radiotherapy services. OnCo found no successor plan for 2025 onwards.",
          detail:
            "The plan, dated June 2020 and drafted by the National Committee for the Fight against Cancer with WHO's technical and financial support, sets six specific objectives: a national cancer control policy by 2021, a 25% increase in primary prevention, a 25% increase in cancers detected and treated early, a 10% rise in the cure rate, strategic information on cancer, and stronger programme management. It is costed at 52,486,566,318 FCFA, about 90.4 million US dollars at its June 2020 rate, of which 30,932,510,001 FCFA was for treatment and palliative care. Its operational framework includes funding chemotherapy drugs, strengthening radiotherapy in Douala and Yaoundé, opening radiotherapy services in Bertoua, Garoua and Bamenda, rehabilitating nuclear medicine in Yaoundé and starting it in Douala, eight chemotherapy day hospitals across the regions, and building a National Cancer Institute. It planned a mid-term review and a plan for 2025 to 2029. An ICCP review found two of its strategies addressed survivorship guidelines and none a survivorship care plan. In July 2026 the Ministry and the Association of Cameroonian Physicians in the Americas said they would formalise their collaboration, in part to support the revision of Cameroon's strategic documents on cancer.",
          links: [
            { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, chapters 5 to 7 (English, PDF)", url: PLAN },
            { label: "Plan Stratégique National de Prévention et de Lutte contre le Cancer 2020 à 2024 (French, PDF)", url: PLAN_FR },
            { label: "ICCP: NCCP survivorship profile, Cameroon (PDF)", url: ICCP_SURV },
            { label: "MINSANTE: the Ministry and the ACPA strengthen their partnership (14 July 2026)", url: ACPA_2026 },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "registry-data",
      title: "No published population-based registry figures for Cameroon",
      plain:
        "OnCo found no published incidence rates from the Yaoundé or Douala registries, and no report that either has restarted since the 2020 plan asked for it. The national figures on this page are therefore IARC estimates built mostly on other countries' registries, and survival after a cancer diagnosis in adults is unknown.",
      detail:
        "A search of Europe PMC for population-based registry papers from Yaoundé or Douala returned none; the plan's only registry statistics (average age at diagnosis of about 45 and 61.85% of cancers in women) are quoted without a period. The African Cancer Registry Network lists no Cameroonian member, and IARC's fact sheet names no country-specific source for its incidence estimate. The cervical figure of 2,525 cases and 1,837 deaths for 2022 is the Ministry's own, but its page does not say how the cases were collected. No adult survival figures were found; the one-year survival for Burkitt lymphoma is from a hospital registry.",
      links: [
        { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024, sections 2.1 and 2.4 (PDF)", url: PLAN },
        { label: "African Cancer Registry Network: current membership list", url: AFCRN_LIST },
      ],
    },
    {
      id: "radiotherapy-now",
      title: "How many radiotherapy machines are treating patients now is not confirmed",
      plain:
        "The newest sources say Cameroon had two radiotherapy machines, both in Douala. The Ministry reported building work on Douala General Hospital's radiotherapy in 2025, and an Indian offer of a radiotherapy bunker in December 2025, but OnCo found no official count of working machines for 2026 or news of the three regional services planned for Bertoua, Garoua and Bamenda.",
      detail:
        "The IAEA's Directory of Radiotherapy Centres (DIRAC) loads its country data through a script and could not be read as plain text on 11 November 2026, so it is not used here. WHO's 2021 cervical profile gives 1 radiotherapy unit and 0 brachytherapy units per 10,000 cancer patients, and its 2020 profile 0.6 external beam units per 10,000 cancer patients. Whether the Mbingo linear accelerator is treating patients was not found in a primary source. Ask the referring hospital which centre is treating and how long the wait is.",
      links: [
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
        { label: "WHO: cervical cancer country profile, Cameroon, 2021 (PDF, ICCP portal)", url: WHO_CX_2021 },
        { label: "MINSANTE: the Minister in Douala (2 May 2025)", url: CSU_2025 },
      ],
    },
    {
      id: "plan-and-cover",
      title: "No successor cancer plan, and no published rules on what is paid for",
      plain:
        "The national cancer plan ended in 2024. OnCo found no published plan for 2025 onwards, no evaluation of the 2020 to 2024 plan, and no list of which cancer medicines the Ministry's subsidy pays for or at which hospitals. The text of the cervical cancer elimination strategy was not found either, only the Ministry's news report of it.",
      detail:
        "The ICCP portal holds the 2020 to 2024 plan in English and French but no later plan for Cameroon. The Ministry's pages on universal health coverage list the conditions covered and do not mention cancer; whether cancer will be added, and when, was not found. The 2016 cervical cancer plan the national plan mentions was not found. The draft text creating the Cameroonian Medicines Agency is not published. WHO's 2020 and 2021 profiles were read from copies on the ICCP portal. The Ministry's page reporting 1,052,849 people enrolled is dated 22 February 2020 by the website, but its text describes a press briefing of 4 October 2023, which is the date used here.",
      links: [
        { label: "MINSANTE: two years of universal health coverage (2 May 2025)", url: CSU_2025 },
        { label: "MINSANTE: cervical cancer, Cameroon on the road to elimination (19 July 2025)", url: CCU_2025 },
        { label: "MINSANTE: more than 1,052,849 people enrolled (press briefing of 4 October 2023)", url: CSU_2023 },
      ],
    },
  ],
  institutions: [
    "cameroon-ministry-of-public-health", "cnlc-cameroon", "dpml-cameroon", "yaounde-general-hospital", "douala-general-hospital",
    "mbingo-baptist-hospital", "chantal-biya-foundation-mother-child-centre", "cameroon-oncology-center", "who", "iarc",
  ],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-saidu-cancer-medicines-barriers-cameroon-pgph-2026", "paper-afungchwi-paediatric-oncology-shared-care-cameroon-jcpo-2026",
    "paper-afungchwi-hospital-cancer-registry-northwest-cameroon-jtp-2021", "paper-hesseling-burkitt-lymphoma-934-cameroon-plosone-2024",
    "paper-mobit-radiotherapy-cost-cameroon-oncology-center-radiatoncol-2026", "paper-akundoh-mbingo-radiotherapy-tipsro-2024",
    "paper-levy-3t-cervical-screening-dschang-cammed-2020", "paper-woks-cervical-screening-disparities-cameroon-ijeh-2023",
  ],
  people: ["florence-zeh-kakanou"],
  how:
    "Every card was written from Cameroonian official sources and international data, read in full rather than through a summary: the Ministry of Public Health's National Strategic Plan for Prevention and Cancer Control 2020 to 2024; the Ministry's news pages on universal health coverage, the cancer committee, the cervical cancer elimination strategy, the planned medicines agency and Douala General Hospital; WHO's 2020 cancer and 2021 cervical cancer profiles; WHO's list of regulators at maturity level 3 and 4; WHO's HPV coverage and introduction rows from its public data API; the World Bank's health spending indicators; the African Cancer Registry Network's member list; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data and the ClinicalTrials.gov API. French sources were read in French and their figures translated, not paraphrased. The new records added for this page (the Ministry, the cancer committee, the medicines department, five hospitals and cancer centres, eight papers and one person) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates made without a Cameroonian registry, not a national count. Which hospitals give radiotherapy and chemotherapy, which medicines are in stock and what universal health coverage pays for change faster than the published plans; ask the treating hospital's oncology department what applies to you and what it will cost before treatment starts. Cervical screening is offered by some hospitals and programmes, not everywhere.",
  verifyLinks: [
    { label: "Ministry of Public Health, Cameroon", url: "https://www.minsante.cm/" },
    { label: "National Strategic Plan for Prevention and Cancer Control 2020 to 2024 (PDF)", url: PLAN },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Cameroon (PDF)", url: IARC_FACTSHEET },
  ],
};
