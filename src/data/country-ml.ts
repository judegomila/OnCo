import type { CountryDive } from "@/data/country-dive";

/**
 * Mali deep dive: the hand-written cards for /countries/ml/ (wave 11). French sources were read in French, and every
 * figure was read from the raw text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024
 * fact sheet for Mali (PDF text), WHO's cancer country profile 2020 for Mali (PDF text), WHO's Global Health Expenditure
 * rows from the GHO API, WHO's HPV programme coverage API, WHO's list of regulators at maturity levels 3 and 4 (August
 * 2026, PDF text), the African Union's list of signatures of the African Medicines Agency treaty (PDF text), IAEA DIRAC's
 * public equipment data, Law 2018-074 and Decree 2022-0018 on universal health insurance (Journal officiel, PDF text
 * from WHO's health legislation database), the Ministry of Health and Social Development's news pages of July, October
 * and November 2026, the African Cancer Registry Network's page for the Bamako registry, the NIH ClinRegs profile for
 * Mali, and the papers' abstracts through Europe PMC. Mali is a fragile, conflict-affected setting; this page states
 * only what those sources say. Where a figure could not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/466-mali-fact-sheet.pdf";
const WHO_CCP = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/mli-2020.pdf";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'MLI'";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'MLI'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_ML = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const AU_AMA = "https://au.int/sites/default/files/treaties/36892-sl-TREATY_FOR_THE_ESTABLISHMENT_OF_THE_AFRICAN_MEDICINES_AGENCY.pdf";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const AFCRN_BAMAKO = "https://afcrn.org/index.php/membership/membership-list/136-malicancerregistry";
const RAMU_LAW = "https://extranet.who.int/cpcd/sites/default/files/public_file_repository/MLI_Mali_Loi-No2018-074-portant-institution-du-regime-dassurance-maladie-universelle_2018.pdf";
const RAMU_DECREE = "https://extranet.who.int/cpcd/sites/default/files/public_file_repository/MLI_Mali_Decret-No2022-0018-PT-RM-fixant-les-modaltes-d_application-de-certaines-dispositions-de-la-loi-portant-institution-du-regime-d_assurance-maladie-universelle-2022.pdf";
const MSDS = "https://www.sante.gov.ml/";
const MSDS_RAMU = "https://www.sante.gov.ml/index.php?option=com_content&view=article&id=270&catid=10&Itemid=105";
const MSDS_OCT = "https://www.sante.gov.ml/index.php?option=com_content&view=article&id=543&catid=10&Itemid=105";
const MSDS_NOV = "https://www.sante.gov.ml/index.php?option=com_content&view=article&id=562&catid=10&Itemid=105";
const MSDS_AMO_LIST = "https://www.sante.gov.ml/index.php?option=com_content&view=article&id=248&catid=23&Itemid=125";
const CLINREGS = "https://clinregs.niaid.nih.gov/country/mali";
const HSD_FREE = "https://hsd-fmsb.org/index.php/hsd/article/view/3225";
const CTGOV = "https://clinicaltrials.gov/search?country=Mali&cond=cancer";

export const ML_DIVE: CountryDive = {
  iso2: "ML",
  iso3: "MLI",
  name: "Mali",
  flag: "🇲🇱",
  asOf: "2026-11-11",
  title: "Cancer in Mali",
  description:
    "Cancer in Mali from Malian, WHO and peer-reviewed sources: IARC's estimate of 13,942 new cancers and 9,026 deaths in 2024, a Bamako registry running since 1986, universal health insurance created in 2018, state-funded free chemotherapy, one radiotherapy centre, free weekend cervical screening, and HPV vaccination from 2024.",
  lede:
    "Breast and cervical cancer are Mali's commonest cancers, and in hospital studies in Bamako most women with them are diagnosed late. Mali's cancer figures rest on a registry that has counted cancers in Bamako since 1986. The state funds anticancer medicines so that chemotherapy can be free, and a universal health insurance scheme is being built, but radiotherapy is available in one hospital in the capital.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Mali is 13,942 new cancers and 9,026 deaths, an age-standardised incidence of 116.5 per 100,000 (90.2 in men, 143.8 in women) and mortality of 80.2. Women have almost twice as many new cancers as men (8,974 against 4,968). The fact sheet gives Mali's incidence source as a subnational registry, with its rates applied to the 2024 population; the registry on the African Cancer Registry Network's list for Mali is Bamako's. Mortality has no national source: it is estimated from incidence using mortality-to-incidence ratios modelled on registry survival data. WHO's 2020 profile gave Mali's mortality registration as having no coverage. IARC counts 256 non-melanoma skin cancers among the 13,942 (13,686 excluding them).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Mali",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Mali (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 14,000 new cancers a year, most of them in women",
          plain:
            "IARC estimates 13,942 new cancers in Mali in 2024 and 9,026 cancer deaths. Breast and cervical cancer together are a third of all new cancers. Cervical cancer causes the most cancer deaths, then breast and stomach cancer. In men, stomach, prostate and liver cancer are the commonest.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,554 breast cancers (1,217 deaths), 2,042 cervical cancers (1,242 deaths), 1,050 stomach cancers (863 deaths), 899 colorectal cancers (480 deaths) and 665 liver cancers (593 deaths). Breast cancer is 28.5% and cervical cancer 22.8% of cancers in women. In men, stomach cancer is 11.9% of cancers, prostate 11.7% and liver 9.0%. The risk of developing a cancer before age 75 is 9.0% for men and 14.5% for women, and an estimated 21,555 people are living within five years of a diagnosis, in a population of 24,478,601. WHO's 2020 profile estimated 1,257 cancers a year in children aged 0 to 14.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Mali (PDF)", url: IARC_FACTSHEET },
            { label: "WHO: cancer country profile 2020, Mali (PDF)", url: WHO_CCP },
          ],
        },
        {
          id: "bamako-registry",
          title: "A registry that has counted cancers in Bamako since 1986",
          plain:
            "Mali's cancer figures come from a population-based registry in the capital, created in 1986, now based in the pathology department of CHU du Point G, and a member of the African Cancer Registry Network. Its 28 years of data show liver cancer becoming much less common in Bamako.",
          detail:
            "The registry's undated page on the African Cancer Registry Network describes medical students finding cases each year in the city's hospitals, pathology reports abstracted at Point G, and death certificates matched to the database. It aims to cover the population of Bamako, 1,810,366 at the 2009 census, and codes in ICD-O-3. Data from 1987 to 2015 showed liver cancer incidence in men falling from 19.41 per 100,000 in 1987 to 1996 to 8.15 in 2007 to 2015, and in women from 7.02 to 2.57; the authors found no sign that this came from changes in registration. Bamako's cases diagnosed from 2005 to 2014 were part of IARC's SURVCAN-3 study, which found 3-year net survival of 52.3% for cervical cancer and 18.1% for liver cancer across 13 African registries.",
          links: [
            { label: "African Cancer Registry Network: Mali, Registre des cancers du Mali", url: AFCRN_BAMAKO },
            { label: "Amadou et al., liver cancer incidence in Bamako 1987 to 2015 (World J Hepatol 2022)", url: "https://doi.org/10.4254/wjh.v14.i9.1767" },
            { label: "Joko-Fru et al., SURVCAN-3 (Lancet Glob Health 2024)", url: "https://doi.org/10.1016/S2214-109X(24)00130-X" },
          ],
        },
      ],
      tables: [
        {
          id: "ml-top",
          title: "IARC's leading cancers for Mali, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates built on Bamako's registry rates, not national counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 2554, deaths: 1217 },
            { site: "Cervix uteri", cases: 2042, deaths: 1242 },
            { site: "Stomach", cases: 1050, deaths: 863 },
            { site: "Colorectum", cases: 899, deaths: 480 },
            { site: "Liver", cases: 665, deaths: 593 },
            { site: "Bladder", cases: 616, deaths: 354 },
            { site: "Prostate", cases: 582, deaths: 355 },
            { site: "All cancers", cases: 13942, deaths: 9026 },
          ],
          note: "IARC applies subnational registry rates to Mali's 2024 population for new cases, and estimates deaths from those using modelled mortality-to-incidence ratios. Mali has no national cancer registry and no national death data on cancer.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Mali (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Law 2018-074 instituting the RAMU (PDF)", url: RAMU_LAW },
      cards: [
        {
          id: "ramu",
          title: "Universal health insurance by law since 2018, still being put in place",
          plain:
            "A 2018 law created compulsory health insurance for everyone living in Mali, the RAMU, run by the national health insurance fund, CANAM. Workers pay contributions; people who are destitute are covered in full. In July 2026, at a ceremony chaired by the health minister, CANAM signed contracts with more bodies to help run the scheme.",
          detail:
            "Law 2018-074 of 31 December 2018 joins existing schemes into the Régime d'Assurance Maladie Universelle: the compulsory insurance for formal workers (AMO), mutuals for the informal and farming sectors, and, without contributions, people covered by medical assistance (RAMED) and those with free care by law. Insured people pay a co-payment; those eligible for medical assistance have their costs covered in full. The law gives CANAM the management; Decree 2022-0018 limits cover to contracted facilities and bases the list of reimbursed medicines on the national essential medicines list. On 2 July 2026 CANAM signed delegation contracts with the medical assistance agency ANAM and the mutual union UTM, which join the social security bodies CMSS and INPS, already involved in running the AMO. The covered services are set by joint ministerial order; OnCo did not find one naming cancer treatments.",
          links: [
            { label: "Law 2018-074 instituting the RAMU (Journal officiel, via WHO, PDF)", url: RAMU_LAW },
            { label: "Decree 2022-0018/PT-RM (Journal officiel, via WHO, PDF)", url: RAMU_DECREE },
            { label: "MSDS: delegation of RAMU management signed (July 2026)", url: MSDS_RAMU },
          ],
        },
        {
          id: "out-of-pocket",
          title: "Families still pay almost half of health spending themselves",
          plain:
            "WHO's figures put out-of-pocket payments at 47.2% of Mali's health spending in 2023. Interviews with women with breast cancer in Mali describe debt. In a 2026 Bamako study, women without health insurance were more often diagnosed with late-stage breast cancer, but the link did not hold once other factors were taken into account.",
          detail:
            "WHO's Global Health Expenditure Database gives out-of-pocket spending as 68.8% of current health expenditure in 2000, falling to 31.1% in 2019, then rising to 44.7% in 2020, 50.8% in 2022 and 47.2% in 2023. In a qualitative study of 38 interviews in Mali, women and doctors described technical failures, strikes in university hospitals, incomplete free care and missing medicines, made worse by the security crisis since 2012, leaving some women in debt. The SENOVIE cohort of 265 women with breast cancer in five Bamako facilities from 2023 to 2024 found 13.6% diagnosed at stage I or II; late stage was linked in unadjusted analysis with living outside Bamako and having no health insurance, though not after adjustment.",
          links: [
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Mali (API)", url: WHO_OOP_API },
            { label: "Schantz et al., access to oncology care in Mali (BMC Cancer 2024)", url: "https://doi.org/10.1186/s12885-024-11825-6" },
            { label: "Togo et al., stage at diagnosis of breast cancer in Mali (Santé Publique 2026)", url: "https://doi.org/10.3917/spub.263.0331" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "NIH ClinRegs: Mali", url: CLINREGS },
      cards: [
        {
          id: "dpm",
          title: "A directorate of the Ministry, not on WHO's maturity level 3 list",
          plain:
            "Applications to market medicines in Mali are examined by the Direction de la Pharmacie et du Médicament (DPM), part of the Ministry of Health. It also evaluates clinical trial applications once an ethics committee has given its opinion, and the minister gives final approval. Mali is not on WHO's list of regulators at maturity level 3 or 4, and it ratified the African Medicines Agency treaty in 2020.",
          detail:
            "The NIH's ClinRegs profile for Mali, reviewed in January 2026, summarises Decree 2011-753: the DPM sits under the Ministry of Health and Social Development and has three divisions, for regulation and marketing authorisation, for quality assurance and the economics of medicines (which handles clinical trial authorisation and pharmacovigilance), and for biomedical laboratories. ClinRegs notes that the DPM's review starts only after an ethics committee has given its opinion, that the evaluated application then goes to the Minister of Health and Social Development for final approval, and that the DPM website was not working at the time of its August 2021 review. WHO's August 2026 list of regulators at maturity level 3 or 4 includes neighbouring Senegal but not Mali. The African Union's treaty list records Mali signing the African Medicines Agency treaty on 29 October 2019 and ratifying it on 12 May 2020.",
          links: [
            { label: "NIH ClinRegs: Mali regulatory authority (updated January 2026)", url: CLINREGS },
            { label: "WHO: regulators operating at maturity level 3 and 4 (August 2026)", url: WHO_ML },
            { label: "African Union: African Medicines Agency treaty, signatures and ratifications (PDF)", url: AU_AMA },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Mali (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination began in 2024 and reached 64% of girls in 2025",
          plain:
            "Mali added the HPV vaccine to its childhood programme in 2024. WHO's figures show 15% of girls in the target group vaccinated in 2024 and 64% in 2025. WHO has no figures for boys. At the October 2026 breast and cervical cancer campaign, girls aged 10 were given the vaccine.",
          detail:
            "WHO's immunisation coverage rows for Mali begin in 2024: first-dose HPV coverage for girls of 15% (50,563 of a target of 343,798) and 64% in 2025 (224,070 of 352,415), with identical figures for the last dose. There are no rows with values for boys. A study by the GAIA Vaccine Foundation, surveying 3,445 people in Bamako from 2021 to 2022, found that people trusted their primary care providers more than the government on vaccines, and notes that the COVID-19 pandemic and political unrest from March 2020 had disrupted new vaccine roll-outs. At the Ministry's fifth Octobre Rose campaign, launched on 8 October 2026, HPV vaccine was given to girls aged 10 and thermocoagulation devices for treating precancerous lesions were handed to Bamako hospitals.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Mali (public API)", url: WHO_HPV_API },
            { label: "Crippin et al., vaccine confidence before HPV vaccine introduction in Mali (Vaccines 2025)", url: "https://doi.org/10.3390/vaccines13050535" },
            { label: "MSDS: Octobre Rose 2026 launch", url: MSDS_OCT },
          ],
        },
        {
          id: "screening-programmes",
          title: "Cervical screening by visual inspection, and a first prostate campaign",
          plain:
            "WHO recorded no national cervical screening programme in Mali in 2019. Weekend70, a programme begun in Bamako in 2016, offers free screening by visual inspection and is being rolled out beyond Bamako. The Ministry ran its first prostate cancer campaign, Novembre Bleu, in 2025.",
          detail:
            "WHO's 2020 profile recorded no cervical or breast screening programme and no early detection guidelines in 2019. Weekend70, set up in Bamako in 2016, screened 289,924 women by July 2020 and is now being rolled out to other regions using visual inspection; a 2026 study of two health centres found staff and training shortages, and the limited involvement of religious groups, among the barriers. At the 2026 Novembre Bleu launch the minister said 832 men were screened in 2025 against 2,000 expected, with a mobile clinic doing about 59%; she did not say which test was used.",
          links: [
            { label: "WHO: cancer country profile 2020, Mali (PDF)", url: WHO_CCP },
            { label: "Téguété et al., the Weekend70 programme in Bamako (Acta Obstet Gynecol Scand 2021)", url: "https://doi.org/10.1111/aogs.14119" },
            { label: "Ndour et al., Weekend-70 outside Bamako (Int J Health Plann Manage 2026)", url: "https://doi.org/10.1002/hpm.70136" },
            { label: "MSDS: Novembre Bleu 2026 launch", url: MSDS_NOV },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer services",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "One radiotherapy centre for about 25 million people",
          plain:
            "IAEA's radiotherapy directory lists one centre in Mali, at the Hôpital du Mali in Bamako, with two linear accelerators. For years it had one machine, which broke down 198 times between 2014 and 2021; patients waited 3 to 6 months for an appointment.",
          detail:
            "IAEA DIRAC's public equipment data, read on 11 November 2026 with Mali's entry updated in 2026, lists the Hôpital du Mali Radiotherapy Center with two linear accelerators, no brachytherapy unit and one CT scanner, for a population DIRAC puts at 25.2 million: under one machine per 10 million people. A 2022 study in Santé Publique, written when Mali had a single linear accelerator, counted 198 breakdowns between 3 April 2014 and 24 September 2021, more than 54 weeks of downtime, and an average wait of 3 to 6 months. The African Cancer Registry Network's page says the hospital has offered radiotherapy since 2012, mainly for cervical cancer.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "Schantz et al., maintaining the linear accelerator at Hôpital du Mali (Santé Publique 2022)", url: "https://doi.org/10.3917/spub.223.0425" },
          ],
        },
        {
          id: "services",
          title: "Cancer services concentrated in three Bamako hospitals",
          plain:
            "Cancer treatment in Mali is concentrated in Bamako: medical oncology at CHU du Point G, children's cancer care at CHU Gabriel Touré, and radiotherapy at the Hôpital du Mali. WHO's 2020 profile gave the availability of opioids for pain relief as zero and recorded no national cancer management guidelines.",
          detail:
            "The African Cancer Registry Network's page names these three hospitals as the ones with specialised oncology, and Point G's pathology laboratory as the main one in the country. WHO's 2020 profile, per 10,000 cancer patients, counted 0.8 radiotherapy units, 0.8 medical physicists, 45.8 radiologists, 18.3 mammography units, 13.7 CT scanners and no MRI or PET scanner; it gave opioid availability for pain as 0 for 2015 to 2017, recorded no cancer management guidelines, and gave the national cancer control plan as operational in 2019. At Gabriel Touré, 3,083 women with cervical cancer seen from 2003 to 2024 had a median survival of 15.5 months, and 60.1% arrived at stage IV.",
          links: [
            { label: "African Cancer Registry Network: Mali registry page (hospitals and laboratories)", url: AFCRN_BAMAKO },
            { label: "WHO: cancer country profile 2020, Mali (PDF)", url: WHO_CCP },
            { label: "Tounkara et al., cervical cancer survival at Gabriel Touré (Obstet Gynecol Int 2026)", url: "https://doi.org/10.1155/ogi/9966827" },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Mali does differently",
      cards: [
        {
          id: "free-chemotherapy",
          title: "Free chemotherapy at CHU du Point G, when the medicines are in stock",
          plain:
            "Mali's state funds anticancer medicines so that chemotherapy is free. At CHU du Point G, where they reach patients through the hospital pharmacy, in 2019 only about two thirds of the medicines were available on average, and some ran out for up to four months.",
          detail:
            "Pharmacists at CHU du Point G, writing in 2022, describe the state providing anticancer medicines worth 285 million CFA francs a year to make chemotherapy free. That figure is not from their own study: they cite an undated Ministry of Health news item, consulted in October 2021, whose address no longer opens. They describe the supply chain at Point G: the hospital sets its needs, the DPM validates them, the Ministry orders from the Pharmacie Populaire du Mali, and the hospital receives the products. Their study of 1,490 prescriptions for 301 patients from January to June 2019 found FOLFOX, AC and paclitaxel with carboplatin the commonest regimens, 63.64% of medicines available on average, eight stock-outs of 20 to 120 days, and 11,148,890 CFA francs of medicine wasted. They suggest grouping patients on the same regimen. Women interviewed in 2024 still described free care as incomplete.",
          links: [
            { label: "Ballo et al., free anticancer medicines at CHU du Point G (Health Sci Dis 2022)", url: HSD_FREE },
            { label: "Schantz et al., access to oncology care in Mali (BMC Cancer 2024)", url: "https://doi.org/10.1186/s12885-024-11825-6" },
          ],
        },
        {
          id: "weekend70",
          title: "Free cervical screening at weekends lifted coverage in Bamako",
          plain:
            "Doctors in Bamako set up Weekend70 in 2016: awareness campaigns, stronger screening in health centres and free cervical screening at weekends. Weekly screening rose from under 800 women to a peak of 4,100, and by 2020 an estimated 47.3% of women aged 20 and over in Bamako had been screened.",
          detail:
            "Téguété and colleagues report 289,924 women screened between 1 January 2016 and 31 July 2020, 91.9% of them living in Bamako, with mean age 33.2 and 46.1% aged 30 to 49, WHO's priority group. They estimate coverage of 47.3% of women aged 20 and over and 56.9% of WHO's target population, against coverage below 2% that they cite for French-speaking African countries; coverage was calculated from numbers screened over demographic data, not measured in a survey. The programme is being extended to other regions; at two health centres, free screening days, on-site treatment and teamwork helped, while staff, equipment and training shortages held it back.",
          links: [
            { label: "Téguété et al., the Weekend70 programme in Bamako (Acta Obstet Gynecol Scand 2021)", url: "https://doi.org/10.1111/aogs.14119" },
            { label: "Ndour et al., Weekend-70 outside Bamako (Int J Health Plann Manage 2026)", url: "https://doi.org/10.1002/hpm.70136" },
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
          id: "trials-and-papers",
          title: "No trial in OnCo's records has a site in Mali",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Mali among its countries. Malian cancer research on this page is observational: registry studies from Bamako, hospital cohorts of women with breast and cervical cancer, and studies of access to care.",
          detail:
            "OnCo's participation data covers the trials in its graph, mostly large trials of new medicines, not every study registered; the search linked below shows cancer studies with a Malian site. Clinical trials in Mali need an ethics committee's opinion, then DPM evaluation and the health minister's approval. Recent work includes the SENOVIE cohort, which followed 265 women with breast cancer in Bamako from 2023 to 2024 and found 63.4% diagnosed at stage III and 23.0% at stage IV; the 21-year cervical cancer cohort at Gabriel Touré; and a paediatric study of 88 children with early retinoblastoma treated from 2011 to 2015 with French-African Paediatric Oncology Group guidelines, 73% of whom were alive at four years.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Mali", url: CTGOV },
            { label: "Togo et al., stage at diagnosis of breast cancer in Mali (Santé Publique 2026)", url: "https://doi.org/10.3917/spub.263.0331" },
            { label: "Traoré et al., retinoblastoma treatment in Bamako (Pediatr Blood Cancer 2018)", url: "https://doi.org/10.1002/pbc.27101" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "covered-medicines",
      title: "Which cancer medicines insurance covers was not found",
      plain:
        "OnCo could not read a current list of the medicines and treatments the universal health insurance covers, or Mali's national essential medicines list. The Ministry's download of the 2018 AMO medicines list returned an error on 11 November 2026, and the DPM's register of authorised medicines was not reached.",
      detail:
        "The Ministry's site lists the 2018 edition of the medicines and devices covered by the AMO in private pharmacies, but its download link answered \"Article introuvable\" when read on 11 November 2026. Law 2018-074 leaves the list of covered services to a joint ministerial order, and the co-payment rates to an order of the minister for social protection (Decree 2022-0018); neither was found. The DPM has no working website that OnCo could reach, so the register of authorised cancer medicines, approval times and any reliance on other regulators are not here. How many people are enrolled in the RAMU was not found in an official source.",
      links: [
        { label: "MSDS: AMO medicines list, 2018 edition (download failed)", url: MSDS_AMO_LIST },
        { label: "Law 2018-074, articles 18 and 23 (PDF)", url: RAMU_LAW },
      ],
    },
    {
      id: "registry-figures",
      title: "Recent Bamako registry figures and staff numbers were not found",
      plain:
        "OnCo did not find a recent report of the Bamako registry's own incidence figures by cancer type, or a primary source counting oncologists, radiation oncologists or pathologists in Mali. Whether an IAEA imPACT Review of Mali has been published was not checked.",
      detail:
        "The registry's figures on this page are its liver cancer trends to 2015 and its contribution to SURVCAN-3; the African Cancer Registry Network's page describing it is undated. WHO's 2020 profile gave the number of radiation oncologists as not available. Services outside Bamako, and the effect of insecurity on people reaching care from the north and centre of the country, are described in interviews but not measured in any source OnCo read. Survival for the whole country was not found.",
      links: [
        { label: "African Cancer Registry Network: Mali, Registre des cancers du Mali", url: AFCRN_BAMAKO },
        { label: "WHO: cancer country profile 2020, Mali (PDF)", url: WHO_CCP },
      ],
    },
  ],
  institutions: ["mali-ministry-of-health", "bamako-cancer-registry", "chu-point-g", "chu-gabriel-toure", "hopital-du-mali", "canam-mali", "dpm-mali", "iaea", "who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-amadou-bamako-liver-cancer-trends-wjh-2022", "paper-joko-fru-survcan3-lancet-gh-2024", "paper-teguete-weekend70-screening-aogs-2021",
    "paper-schantz-hopital-du-mali-linac-sante-publique-2022", "paper-tounkara-cervical-survival-gabriel-toure-ogi-2026",
    "paper-schantz-oncology-access-mali-bmc-cancer-2024", "paper-ballo-free-anticancer-drugs-point-g-hsd-2022",
  ],
  people: [],
  how:
    "Every card was written from Malian law and official sources, international agencies and peer-reviewed papers, read in full rather than through a summary: Law 2018-074 and Decree 2022-0018 from the Journal officiel, through WHO's health legislation database; the Ministry of Health and Social Development's news pages of 2026; the African Cancer Registry Network's page for the Bamako registry; the NIH ClinRegs profile for Mali; WHO's 2020 cancer country profile, health expenditure rows, HPV coverage rows and August 2026 list of regulators; the African Union's treaty list; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC and the journal's own site. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records for this page carry their own sources.",
  verify:
    "Mali's national cancer figures are estimates built on the Bamako registry. Which medicines are in stock, whether the radiotherapy machines are working and how long the wait is change faster than any published source; ask the oncology service at CHU du Point G, CHU Gabriel Touré or the Hôpital du Mali what applies to you, and CANAM what your insurance covers.",
  verifyLinks: [
    { label: "Ministère de la Santé et du Développement Social", url: MSDS },
    { label: "African Cancer Registry Network: Bamako registry", url: AFCRN_BAMAKO },
    { label: "IAEA DIRAC: radiotherapy centres", url: DIRAC },
  ],
};
