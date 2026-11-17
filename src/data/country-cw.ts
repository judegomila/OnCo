import type { CountryDive } from "@/data/country-dive";

/**
 * Curaçao deep dive: the hand-written cards for /countries/cw/ (wave 16). Every figure was read from the raw text of
 * its source on 16 November 2026, not from a summary of it; Dutch sources were read in Dutch and Curaçao Medical
 * Center's pages in Papiamentu: IARC's GLOBOCAN 2024 fact sheet for Curaçao (PDF text); the Sociale Verzekeringsbank's
 * (SVB) page on the basic health insurance and its combined annual accounts for 2025 (PDF text); the consolidated
 * Landsbesluit verpakte geneesmiddelen published as Publicatieblad 2025 no. 71 (GT) (PDF text) and the Regeling
 * maximumprijzen geneesmiddelen 2015 (Publicatieblad 2015 no. 21, PDF text); Fundashon Prevenshon's home, screening,
 * programme and history pages; Curaçao Medical Center's oncology and radiotherapy pages; IAEA's DIRAC equipment report (JSON, two rows for
 * Willemstad); WHO's immunisation data service (JSON: 185 rows for Curaçao for 2017 to 2019, of which the eight HPV
 * rows carry no coverage value) and its health expenditure service (JSON, no rows); the World Bank's population
 * series (JSON); the Government of Curaçao's annual account for 2022 (in Papiamentu); three Curaçao Chronicle news
 * reports (18 October 2022, 13 February 2026 and 9 June 2026), used only as reports and labelled as such; and the
 * papers' abstracts through Europe PMC, with the full text of Hooi 2018 (Sex Transm Infect) through Europe PMC for its
 * statements on the registry and vaccination.
 *
 * Second check, 16 November 2026: every source was read again as raw text. The population was corrected, WHO's HPV
 * rows and the government's own statement that HPV vaccination began in 2022 were added, and the decree's time
 * limit for a registration decision was added.
 *
 * Not found: any page or report of Curaçao's own cancer registry, a cancer plan, an HPV coverage figure, and the base
 * text of the Landsverordening basisverzekering ziektekosten (the SVB's page quotes from it). A text of the
 * Landsverordening op de geneesmiddelenvoorziening found through search was Aruba's (AB 1990 no. GT 9) and was not
 * used. Named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/531-curacao-fact-sheet.pdf";
const SVB_BVZ = "https://svbcur.org/werknemers/bvz/";
const SVB_ACCOUNTS_2025 = "https://svbcur.org/wp-content/uploads/2026/08/Jaarrekening-SVB-2025.pdf";
const LB_VERPAKT = "https://gobiernu.cw/wp-content/uploads/2020/04/71-GT.-Landsbesluit-verpakte-geneesmiddelen.pdf";
const PRICES_2015 = "https://gobiernu.cw/wp-content/uploads/2019/07/P.B._2015__no._21.pdf";
const FP = "https://fundashon-prevenshon.odoo.com/";
const FP_SCREENING = "https://fundashon-prevenshon.odoo.com/screening";
const FP_BREAST = "https://fundashon-prevenshon.odoo.com/breast-cancer-screening";
const FP_CERVICAL = "https://fundashon-prevenshon.odoo.com/cervical-cancer-screening";
const FP_BOWEL = "https://fundashon-prevenshon.odoo.com/bowel-cancer-screening";
const CMC_ONC = "https://www.cmc.cw/clinics/oncology/";
const CMC_RT = "https://www.cmc.cw/clinics/radiotherapy/";
const CHRONICLE_REGISTRY = "https://www.curacaochronicle.com/post/local/curacao-joins-kingdom-push-to-establish-cancer-registry-and-chronic-disease-surveillance";
const CHRONICLE_HPV = "https://www.curacaochronicle.com/post/local/government-introduces-hpv-vaccination";
const CHRONICLE_SCREENING = "https://www.curacaochronicle.com/post/local/screening-error-affects-28-breast-cancer-screening-participants-on-curacao";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'CUW'%20and%20startswith(ANTIGEN,'HPV')";
const WORLD_BANK_POP = "https://data.worldbank.org/indicator/SP.POP.TOTL?locations=CW";
const GOV_ACCOUNT_2022 = "https://gobiernu.cw/notisia_di_ministernan/relato-anual-2022-di-gabinete-pisas-ii/";
const FP_HISTORY = "https://fundashon-prevenshon.odoo.com/our-history";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'CUW'";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/cuw-2020.pdf";
const CTGOV = "https://clinicaltrials.gov/search?country=Cura%C3%A7ao&cond=cancer";

const HOOI_STI_2018 = { label: "Hooi et al., HPV genotypes in cervical cancers of Curaçao (Sex Transm Infect 2018)", url: "https://doi.org/10.1136/sextrans-2017-053109" };
const HOOI_PLOS_2018 = { label: "Hooi et al., HPV prevalence in women from Curaçao (PLoS One 2018)", url: "https://doi.org/10.1371/journal.pone.0199624" };
const BLAKE_2023 = { label: "Blake et al., decision-making on colorectal cancer screening in Curaçao (BMC Public Health 2023)", url: "https://doi.org/10.1186/s12889-023-16335-x" };
const BLAKE_2026 = { label: "Blake et al., masculinity and colorectal cancer screening in Curaçao (J Natl Med Assoc 2026)", url: "https://doi.org/10.1016/j.jnma.2026.01.011" };

export const CW_DIVE: CountryDive = {
  iso2: "CW",
  iso3: "CUW",
  name: "Curaçao",
  flag: "🇨🇼",
  asOf: "2026-11-16",
  title: "Cancer in Curaçao",
  description:
    "Cancer in Curaçao from Curaçao's own sources: IARC's estimate of 658 new cancers and 369 deaths in 2024, a basic health insurance for all residents run by the SVB with 136,801 people insured, 881 medical referrals abroad in 2025, a local register of medicines that accepts generics registered in the United States, Canada, the European Union or the Netherlands, population screening for breast, cervical and bowel cancer by Fundashon Prevenshon, two linear accelerators at Curaçao Medical Center, and what could not be found about the cancer registry.",
  lede:
    "Curaçao is a Caribbean island of about 156,000 people, by the World Bank's estimate for 2024, with its own government, laws and health insurance within the Kingdom of the Netherlands. IARC estimates 658 new cancers and 369 cancer deaths in 2024, with breast, prostate and colorectal cancer the most common. Cancer is treated at Curaçao Medical Center in Willemstad, which has radiotherapy; the public insurer sends patients abroad when treatment cannot be given on the island.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Curaçao is 658 new cancers (334 in men, 324 in women) and 369 deaths, an age-standardised incidence of 186.6 per 100,000 (224.0 in men, 166.2 in women). For incidence IARC's fact sheet gives \"Country-specific data source: Registry (national)\" and \"Method: National rates applied to 2024 population\". For mortality it gives \"Country-specific data source: Survcan\" and \"Method: National incidence estimates applied to model-based M:I ratios (registry survival data)\", so the deaths are modelled from incidence and survival, not counted from death certificates. IARC's fact sheet gives Curaçao a population of 185,486, while the World Bank's estimate for 2024 is 155,967; OnCo cannot say how that difference affects the counts. OnCo found no publication by Curaçao's cancer registry to set beside these figures, and so cannot say which years of registry data IARC used.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Curaçao",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Curaçao (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 660 new cancers a year; breast, prostate and colorectal cancer are the most common",
          plain:
            "IARC estimates 658 new cancers in Curaçao in 2024, 334 in men and 324 in women, and 369 cancer deaths. Prostate cancer is the most common cancer in men (100 cases, 29.9% of men's cancers) and breast cancer in women (103 cases, 31.8%). Colorectal cancer is second in both sexes, with 97 cases in all.",
          detail:
            "After these come lung cancer (44 cases), stomach cancer (32), cancer of the body of the uterus (30) and cervical cancer (23). IARC ranks breast cancer first for deaths (58), then colorectal (45), lung (39) and prostate (30), and puts the risk of developing cancer before age 75 at 24.9% for men and 17.5% for women. IARC says its incidence figures apply national registry rates to the 2024 population; the number of deaths is derived by model. The population on IARC's fact sheet is 185,486, about 30,000 more than the World Bank's estimate of 155,967 for the same year, and the fact sheet does not explain the difference. A 2022 news report quotes a nurse speaking in a video from the Ministry of Health, Environment and Nature as saying that on average ten women a year develop cervical cancer and five to six people die of it; IARC's 2024 estimate is 23 cases and 12 deaths, and OnCo could not check either against a registry publication.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Curaçao (PDF)", url: IARC_FACTSHEET },
            { label: "Curaçao Chronicle: government introduces HPV vaccination (news report, 18 October 2022)", url: CHRONICLE_HPV },
            { label: "World Bank: population, total, Curaçao", url: WORLD_BANK_POP },
          ],
        },
      ],
      tables: [
        {
          id: "cw-factsheet",
          title: "IARC's estimate for Curaçao, 2024, by cancer",
          caption: "Estimated new cancers and deaths in 2024, both sexes, from IARC's GLOBOCAN 2024 fact sheet. Incidence applies national registry rates to the 2024 population; deaths are modelled.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "All cancers", cases: 658, deaths: 369 },
            { site: "Breast", cases: 103, deaths: 58 },
            { site: "Prostate", cases: 100, deaths: 30 },
            { site: "Colorectum", cases: 97, deaths: 45 },
            { site: "Lung", cases: 44, deaths: 39 },
            { site: "Stomach", cases: 32, deaths: 24 },
            { site: "Corpus uteri", cases: 30, deaths: 7 },
            { site: "Cervix uteri", cases: 23, deaths: 12 },
            { site: "Bladder", cases: 22, deaths: 14 },
            { site: "Non-Hodgkin lymphoma", cases: 20, deaths: 9 },
            { site: "Leukaemia", cases: 17, deaths: 13 },
          ],
          note: "IARC gives 334 new cancers in men and 324 in women, and 193 and 176 deaths. With numbers this small, a difference of a few cases changes a ranking. No table from Curaçao's own registry is shown because OnCo found none published.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Curaçao (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a registry IARC cites, with nothing published that OnCo could find",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Curaçao, data source and methods (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "registry-status",
          title: "IARC names a national registry as its source; researchers have cited one; no report was found",
          plain:
            "IARC's fact sheet gives a national registry as the source of its incidence figures for Curaçao. A 2018 research paper cites the Cancer Registry of Curaçao for cervical cancer incidence in 2004 to 2008, as a personal communication. OnCo found no website, report or table published by the registry itself. A news report of February 2026 says Curaçao is to take part in a Kingdom-wide system for monitoring chronic diseases that includes creating a cancer registry.",
          detail:
            "Hooi and colleagues give the registry's figure for cervical cancer as 13.4 per 100,000 women over 2004 to 2008, and drew their cancer cases from PALGA, which they describe as the nationwide network and registry of histopathology and cytopathology in the Netherlands and Curaçao. That shows pathology-confirmed cancers are recorded; it does not show a registry that publishes. The Curaçao Chronicle report of 13 February 2026 describes a harmonised system for monitoring non-communicable diseases across the Kingdom, and is a newspaper account, not a government document. Fundashon Prevenshon, the screening foundation, gives one figure on the pages read, without a source: \"The estimated incidence of bowel cancer in 2015 was 100 out of 100.000 people per year.\" It publishes no counts of cancers. The Ministry of Health, Environment and Nature is the body to ask for counts.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Curaçao (PDF)", url: IARC_FACTSHEET },
            HOOI_STI_2018,
            { label: "Curaçao Chronicle: Curaçao joins Kingdom push to establish cancer registry (news report, 13 February 2026)", url: CHRONICLE_REGISTRY },
            { label: "Fundashon Prevenshon: bowel cancer screening programme", url: FP_BOWEL },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a basic health insurance for all residents, run by the SVB",
      aside: { label: "SVB Curaçao: basisverzekering ziektekosten (in Dutch)", url: SVB_BVZ },
      cards: [
        {
          id: "bvz",
          title: "The basisverzekering ziektekosten has covered residents since February 2013",
          plain:
            "Since 1 February 2013 Curaçao has had one basic health insurance, the basisverzekering ziektekosten (BVZ), set by its own law and carried out by the Sociale Verzekeringsbank (SVB). Everyone who is a resident is insured, with listed exceptions such as people who kept equivalent private cover. At the end of 2025 the SVB counted 136,801 people insured.",
          detail:
            "The SVB's page says the BVZ replaced earlier schemes aimed at particular groups. Specialist and hospital care needs a referral from a general practitioner or specialist, valid six months, and covers diagnostic tests including pathology, and admission in third class with specialist, nursing and pharmaceutical care. Insured people are entitled to medicines prescribed by a doctor or specialist unless they are on the SVB's negative list, and pay 1 guilder per prescription line. The SVB's accounts put average medical cost per insured person at about 4,785 Caribbean guilders (XCG) in 2025, up from 4,327 in 2024. A separate insurance, the AVBZ, covers long-term care. WHO's health expenditure database holds no rows for Curaçao, so no out-of-pocket share is given; the SVB's negative list was not read.",
          links: [
            { label: "SVB Curaçao: basisverzekering ziektekosten, who is insured and what is covered (in Dutch)", url: SVB_BVZ },
            { label: "SVB Curaçao: combined annual accounts 2025 (PDF, in Dutch)", url: SVB_ACCOUNTS_2025 },
            { label: "WHO: out-of-pocket share query for Curaçao (data API, no rows)", url: WHO_OOP_API },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "Medicines: Curaçao's own register, with a fast route for generics registered elsewhere",
      aside: { label: "Publicatieblad 2025 no. 71 (GT): consolidated Landsbesluit verpakte geneesmiddelen (PDF, in Dutch)", url: LB_VERPAKT },
      cards: [
        {
          id: "medicines-register",
          title: "Packaged medicines are entered in Curaçao's own register, with an exception for hospital pharmacies",
          plain:
            "Curaçao regulates medicines under its own law. Packaged medicines are entered in a register by a Medicines Registration Commission, and medicines are imported only after an Inspector for Medicines has declared that the import concerns registered medicines. The ban on unregistered medicines does not apply to one supplied only on a doctor's prescription by a pharmacy housed in a hospital, and the Inspector can give a pharmacist written permission in special cases. The commission refuses a medicine that can reasonably be assumed not to work as claimed or to be harmful. A generic medicine already registered and admitted to the market by the regulator of the United States, Canada, the European Union or the Netherlands is entered at once at an importer's request.",
          detail:
            "The rules are in the Landsbesluit verpakte geneesmiddelen, first issued in 1961 under the Landsverordening op de geneesmiddelenvoorziening, a decree of Curaçao since 10 October 2010; its consolidated text was adopted on 26 February 2025 and issued in the Publicatieblad on 13 June 2025. Article 13a lists the four authorities: \"de Federal Drug Administration van de Verenigde Staten van Amerika\", \"Health Canada\", \"het Europees Geneesmiddelenagentschap\" and \"het College ter Beoordeling van Geneesmiddelen van Nederland\", and requires proof that the medicine is registered there and supplied to patients in that country. The fast route is written for generics; the decree read does not make a European or Dutch authorisation of a new medicine valid in Curaçao by itself. A 2015 ministerial regulation caps the prices importers charge for registered packaged medicines. Because article 2 lifts the ban for medicines a hospital pharmacy supplies on prescription, the register alone does not show which cancer medicines a hospital can give. OnCo did not read the register itself, so cannot say which cancer medicines are on it; the hospital pharmacy can.",
          links: [
            { label: "Publicatieblad 2025 no. 71 (GT): consolidated Landsbesluit verpakte geneesmiddelen (PDF, in Dutch)", url: LB_VERPAKT },
            { label: "Publicatieblad 2015 no. 21: Regeling maximumprijzen geneesmiddelen 2015 (PDF, in Dutch)", url: PRICES_2015 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and HPV vaccination",
      aside: { label: "Fundashon Prevenshon: screening programmes", url: FP_SCREENING },
      cards: [
        {
          id: "screening-programmes",
          title: "A foundation invites residents for breast, cervical and bowel cancer screening",
          plain:
            "Fundashon Prevenshon, a foundation set up in 2008, runs three population screening programmes in Curaçao: breast screening for women aged 45 to 75 every two years, cervical screening for women aged 25 to 65, and bowel cancer screening for men and women aged 50 to 75. It gets a yearly overview of its target groups from the Civil Registry, sends invitations, and offers free transport to its centre. Bowel screening began in September 2020; in its first year about 20% of those invited took part.",
          detail:
            "The foundation's history page says cervical screening started in June 2016; its programme pages describe a cell test alone at 25 to 29 and a high-risk HPV test from 30, and say that bowel screening followed a pilot in June 2020 and is free for anyone on the Civil Registry with the basic health insurance or a guarantee letter. The foundation says there is no national policy on screening for these three cancers, that general practitioners can refer patients elsewhere for a mammogram, and that it therefore has no complete overview of the share of the target population actually screened. The SVB's 2025 accounts, under preventive care for people with the basic insurance, say the population screening for the three cancers was continued with Fundashon Prevenshon. The 20% figure is stated by Blake and colleagues in a 2023 interview study, which found trust in the organiser but little familiarity with the test; a 2026 survey by the same group says men take part half as often as women. In June 2026 a news report said the foundation had found that 28 of more than 2,500 result letters sent since December 2025 wrongly reported a negative breast screening result, had corrected them and reported the error to the health inspectorate. The foundation's pages give no participation rates, and the address its home page gives for a 2020 annual report answered 404 on 16 November 2026; the foundation can be asked for its results on 0800-1811.",
          links: [
            { label: "Fundashon Prevenshon: screening programmes", url: FP_SCREENING },
            { label: "Fundashon Prevenshon: breast cancer screening programme", url: FP_BREAST },
            { label: "Fundashon Prevenshon: cervical cancer screening programme", url: FP_CERVICAL },
            { label: "Fundashon Prevenshon: bowel cancer screening programme", url: FP_BOWEL },
            { label: "Fundashon Prevenshon: our history", url: FP_HISTORY },
            { label: "SVB Curaçao: combined annual accounts 2025, section 2.11 (PDF, in Dutch)", url: SVB_ACCOUNTS_2025 },
            BLAKE_2023,
            BLAKE_2026,
            { label: "Curaçao Chronicle: screening error affects 28 participants (news report, 9 June 2026)", url: CHRONICLE_SCREENING },
          ],
        },
        {
          id: "hpv",
          title: "HPV vaccination for 9 and 10 year olds began in 2022, by the government's account; no coverage figure is published",
          plain:
            "A study published in 2018 said HPV vaccines were not part of a national vaccination programme in Curaçao and were available only at the patient's own expense. In October 2022 a news report said the Ministry of Health, Environment and Nature wanted to start vaccinating girls and boys aged nine to ten that school year, with parents' written consent. The government's own account of 2022, published that December, lists starting the HPV vaccination programme for children aged 9 to 10 among the Ministry's results for the year. OnCo found no figure for how many children have been vaccinated.",
          detail:
            "The annual account of the Pisas II government, dated 29 December 2022 and written in Papiamentu, says the Ministry of Health, Environment and Nature managed to \"Inisiá programa di bakunashon di HPV pa muchanan entre 9 pa 10 aña\" (start the HPV vaccination programme for children aged 9 to 10). It gives no numbers, and OnCo did not find a ministry page describing the programme, so the detail of who is offered the vaccine and how rests on the 2022 newspaper account. WHO's immunisation data hold rows for Curaçao for 2017 to 2019 only: the eight HPV rows, for girls and boys in 2018 and 2019, carry no coverage value, and WHO's vaccine introduction data hold no rows for Curaçao. The 2018 paper adds, from a personal communication, that fewer than a hundred vaccines had been sold since the vaccine was introduced in Curaçao in 2007. Studies led by Hooi found HPV in 19.7% of 1,075 women aged 25 to 65 sampled from the population register, and found types 16 and 18 in a smaller share of Curaçao's cervical cancers than worldwide: types 16, 18 and 45 together covered 58.7% of 104 cancers, while seven high-risk types covered 73.1%. The authors asked that this be taken into account when choosing a vaccine. Parents can ask the Ministry or the child's school whether the vaccine is being offered.",
          links: [
            { label: "Government of Curaçao: annual account 2022 of the Pisas II government (in Papiamentu, 29 December 2022)", url: GOV_ACCOUNT_2022 },
            { label: "Curaçao Chronicle: government introduces HPV vaccination (news report, 18 October 2022)", url: CHRONICLE_HPV },
            HOOI_STI_2018,
            HOOI_PLOS_2018,
            { label: "WHO: HPV vaccination coverage query for Curaçao (data API, rows without a figure)", url: WHO_HPV_API },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy in Willemstad, and referral abroad",
      aside: { label: "Curaçao Medical Center: radiotherapy (in Papiamentu)", url: CMC_RT },
      cards: [
        {
          id: "radiotherapy",
          title: "Two linear accelerators at Curaçao Medical Center, as IAEA's directory lists it",
          plain:
            "The IAEA's Directory of Radiotherapy Centres lists Curaçao Medical Center in Willemstad with two linear accelerators, in an entry updated in 2024. The hospital's radiotherapy page describes external beam radiotherapy, combined chemotherapy and radiotherapy, and HDR brachytherapy for gynaecological and skin cancers. Its oncology and haematology department treats solid tumours and blood cancers and offers palliative care.",
          detail:
            "The directory also still carries a 2015 entry for the Saint Elisabeth Hospital in Willemstad, with a cobalt-60 unit and brachytherapy; the hospital's page, in its profile of a radiation oncologist, says a new radiotherapy department with a linear accelerator and CT scanner was completed at the Sint Elisabeth Hospital and treated its first patients on 29 November 2017. The oncology page lists surgeons, haematologists, medical, radiation and gynaecological oncologists and interventional radiology, describes close collaboration with academic centres in the Netherlands, and a palliative care consultation service, Kuido Palliativo Kòrsou, begun in 2018, which any doctor on the island can consult. The directory's entry for Curaçao Medical Center records no brachytherapy, while the hospital's page describes HDR brachytherapy; OnCo could not tell which is current. The pages are undated. OnCo found no public count of oncologists or of patients treated.",
          links: [
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries", url: DIRAC },
            { label: "Curaçao Medical Center: radiotherapy (in Papiamentu)", url: CMC_RT },
            { label: "Curaçao Medical Center: oncology and haematology (in Papiamentu)", url: CMC_ONC },
          ],
        },
        {
          id: "referral-abroad",
          title: "Medical referral abroad: 881 cases in 2025, within the region by policy and to the Netherlands for the most complex care",
          plain:
            "An insured person is entitled to be sent abroad for examination or treatment that is not possible in Curaçao, or for a life-threatening condition, or where care abroad adds to the patient's health, on a medical specialist's indication and with the approval of a board, the College Medische Uitzendingen. The SVB pays the medical costs, the flight, a daily allowance for the patient and a companion where one applies, local transport and lodging. In 2025 there were 881 such cases.",
          detail:
            "The SVB's 2025 accounts say 758 of the 881 were regular referrals and 123 were acute illness abroad or reverse referrals, where a specialist is flown in. Volume was almost the same as in 2024 (884), but the SVB reports costs up 16%, which it puts down to the mix of cases and rising prices; its cost table books 37.3 million guilders for medical referral against 31.8 million the year before. Under its regional policy the SVB chooses referral within the region in principle, unless the care is highly complex or a transplant, in which case the patient goes to the Netherlands. Patients are as a rule referred to providers with which the SVB has a contract. The passages read do not name the countries of the region or say how many referrals were for cancer. A question and answer on the SVB's home page says it covers costs abroad only in emergencies, so care sought abroad without an approved referral should not be assumed to be paid.",
          links: [
            { label: "SVB Curaçao: basisverzekering ziektekosten, medische uitzendingen (in Dutch)", url: SVB_BVZ },
            { label: "SVB Curaçao: combined annual accounts 2025, section 2.13 (PDF, in Dutch)", url: SVB_ACCOUNTS_2025 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Curaçao does",
      title: "What Curaçao does differently",
      cards: [
        {
          id: "reverse-referral",
          title: "Flying the specialist in, and bringing screening to the person",
          plain:
            "Two arrangements stand out in the sources read for this page. The public insurer uses what it calls reverse referral: where needed, it flies in highly qualified specialists for specific procedures that could not otherwise be done locally and would have meant sending patients abroad. And the screening foundation offers free transport so that everyone invited can reach its centre.",
          detail:
            "The SVB's 2025 accounts describe reverse referral as an alternative to sending the insured person abroad, and count such cases together with acute illness abroad: 123 in 2025. Fundashon Prevenshon says accessibility is essential to its programme, that all women and legal residents in the target group are invited, and that it runs a toll-free number for appointments. Neither source reports outcomes: the accounts do not say how many patients were treated by visiting specialists or for which conditions, and the foundation's pages give no participation rate. The published research gives one figure, about 20% participation in the first year of bowel cancer screening.",
          links: [
            { label: "SVB Curaçao: combined annual accounts 2025, section 2.13 (PDF, in Dutch)", url: SVB_ACCOUNTS_2025 },
            { label: "Fundashon Prevenshon: screening programmes", url: FP_SCREENING },
            BLAKE_2023,
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Curaçao (search)", url: CTGOV },
      cards: [
        {
          id: "trials-research",
          title: "No trial in OnCo's records has a site in Curaçao",
          plain:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 16 November 2026, no cancer trial lists a site in Curaçao. OnCo holds a selection of trials, not the whole registry, so this is not proof that none exists; a search of ClinicalTrials.gov itself on the same day for cancer studies with a site in Curaçao also returned none. The published research read for this page is about cervical cancer and HPV, and about taking part in bowel cancer screening.",
          detail:
            "The HPV studies sampled 5,000 women from the population register, of whom 1,075 enrolled, and analysed 104 cervical cancers, which the authors called the largest such study in the Caribbean. The screening studies interviewed 23 people not yet invited and surveyed 109 men aged 50 to 75. A patient who wants to know about trials should ask the treating oncologist at Curaçao Medical Center, whose department describes working with academic centres in the Netherlands, whether a trial there is open to someone treated on the island.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Curaçao (search)", url: CTGOV },
            HOOI_STI_2018,
            HOOI_PLOS_2018,
            BLAKE_2023,
            BLAKE_2026,
            { label: "Curaçao Medical Center: oncology and haematology (in Papiamentu)", url: CMC_ONC },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "who-data",
      title: "WHO publishes no cancer profile, HPV coverage figure or spending rows for Curaçao",
      plain:
        "WHO's Cancer Country Profile 2020 was not found for Curaçao at the address WHO uses for other countries. WHO's immunisation database holds HPV rows for Curaçao with no coverage figure in them, and its health expenditure database returns no rows. This page uses the public insurer's own accounts in their place. No out-of-pocket share of health spending is available.",
      detail:
        "The address where WHO publishes its 2020 cancer profiles answered 404 for Curaçao on 16 November 2026. WHO's immunisation data service returned 185 coverage rows for the code CUW, all for 2017 to 2019; the eight HPV rows (final dose, girls and boys, 2018 and 2019) have no value, and its programme coverage series for HPV has no rows. Its vaccine introduction query and four Global Health Expenditure Database indicators each returned an empty list. IAEA's directory files Curaçao's radiotherapy entries under a summary row still named Netherlands Antilles. The SVB's annual accounts are the place to look for what the public insurer spends.",
      links: [
        { label: "WHO: Cancer Country Profile 2020 address for Curaçao (answers 404)", url: WHO_PROFILE },
        { label: "WHO: HPV vaccination coverage query for Curaçao (data API, rows without a figure)", url: WHO_HPV_API },
        { label: "WHO: out-of-pocket share query for Curaçao (data API, no rows)", url: WHO_OOP_API },
      ],
    },
    {
      id: "registry-and-plan",
      title: "No registry report, no cancer plan and no screening or vaccination rates were found",
      plain:
        "OnCo found no publication by Curaçao's cancer registry, no cancer or chronic disease plan, no participation rate for the three screening programmes and no HPV vaccination coverage. These are searches that came up empty, not statements that the documents do not exist.",
      detail:
        "IARC's fact sheet names a national registry and survival data as its sources without saying which years they cover. The statements on this page about a planned Kingdom-wide registry and the 2026 screening error come from a news site, the Curaçao Chronicle, and were not confirmed against government or foundation documents. That HPV vaccination for children aged 9 to 10 began in 2022 is stated in the government's annual account for that year; that both girls and boys are offered it, the consent form and the nurse's figures come from the Chronicle alone. A search of the government's website for \"kankerregistratie\" on 16 November 2026 returned no results. A Papiamentu newspaper article on HPV vaccination was behind a subscription and was not read. The Ministry of Health, Environment and Nature and Fundashon Prevenshon are the bodies to ask.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Curaçao (PDF)", url: IARC_FACTSHEET },
        { label: "Fundashon Prevenshon", url: FP },
        { label: "Curaçao Chronicle: Curaçao joins Kingdom push to establish cancer registry (news report, 13 February 2026)", url: CHRONICLE_REGISTRY },
        { label: "Government of Curaçao: annual account 2022 of the Pisas II government (in Papiamentu, 29 December 2022)", url: GOV_ACCOUNT_2022 },
      ],
    },
    {
      id: "laws-not-read",
      title: "Laws read in part, and what is not known about cancer medicines",
      plain:
        "OnCo read the decree on packaged medicines but not the ordinance above it, and read the SVB's account of the basic health insurance but not the law itself or the decree on medical referrals. It did not read the register of medicines or the SVB's negative list, so this page does not say which cancer medicines are available or paid for, and shows no approvals count.",
      detail:
        "A text of the Landsverordening op de geneesmiddelenvoorziening found through a search turned out to be Aruba's version and was set aside. The fast registration route in article 13a is for generic medicines. For any other medicine the decree sets out the ordinary route: a written request with the composition, the claimed effect supported by scientific data and shelf-life data for the tropics (article 13), a decision by the Medicines Registration Commission within three months, which it may extend once by three months (article 14), and a registration valid for five years. How long this takes in practice for a new branded cancer medicine, and how many have been through it, was not established. The SVB's accounts report medical referrals in total, not for cancer, and the passages read do not name destination countries other than the Netherlands. The treating oncologist and the SVB's medical referral department can answer for an individual case.",
      links: [
        { label: "Publicatieblad 2025 no. 71 (GT): consolidated Landsbesluit verpakte geneesmiddelen (PDF, in Dutch)", url: LB_VERPAKT },
        { label: "SVB Curaçao: basisverzekering ziektekosten (in Dutch)", url: SVB_BVZ },
      ],
    },
  ],
  institutions: ["curacao-medical-center", "svb-curacao", "fundashon-prevenshon", "iarc", "iaea", "who"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-hooi-hpv-genotypes-cervical-cancer-curacao-sti-2018", "paper-hooi-hpv-prevalence-women-curacao-plos-one-2018",
    "paper-blake-colorectal-screening-decisions-curacao-bmc-public-health-2023", "paper-blake-masculinity-colorectal-screening-curacao-jnma-2026",
  ],
  people: [],
  how:
    "Every card was written from Curaçao's own sources where they exist, read as raw text and not through a summary, in Dutch and Papiamentu where that is the language of the source: the Sociale Verzekeringsbank's page on the basic health insurance and its 2025 accounts; the consolidated decree on packaged medicines and the 2015 price regulation from the government's Publicatieblad; Fundashon Prevenshon's pages; Curaçao Medical Center's pages; IARC's GLOBOCAN fact sheet; IAEA's radiotherapy directory; the government's annual account for 2022; and the papers' abstracts. Three points rest wholly or partly on news reports from the Curaçao Chronicle and are labelled as such. The population is the World Bank's estimate. Trial counts are from OnCo's own copy of ClinicalTrials.gov participation data.",
  verify:
    "The cancer numbers on this page are IARC's estimates, because no publication by Curaçao's registry was found. The hospital pages are undated, and the detail of HPV vaccination rests on a 2022 news report and one line in the government's account of that year. A referral abroad needs the approval of the College Medische Uitzendingen: confirm what the SVB will pay, and where, before travelling.",
  verifyLinks: [
    { label: "SVB Curaçao: basisverzekering ziektekosten (in Dutch)", url: SVB_BVZ },
    { label: "Curaçao Medical Center: oncology and haematology (in Papiamentu)", url: CMC_ONC },
    { label: "Fundashon Prevenshon", url: FP },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Curaçao (PDF)", url: IARC_FACTSHEET },
  ],
};
