import type { CountryDive } from "@/data/country-dive";

/**
 * Bangladesh deep dive: the hand-written cards for /countries/bd/. Sources were read raw on 4 November 2026, in English
 * and in Bengali: the National Institute of Cancer Research and Hospital's Hospital Cancer Registry Report 2025, its
 * history page and its Bengali citizen charter; the Directorate General of Drug Administration's Bengali annual report
 * for 2024-25 and its 2023 reliance guideline; the Department of Social Services' Bengali page on its grant for
 * patients with cancer and other long illnesses; the national cancer control strategy of 2008 and the cervical cancer
 * strategy for 2017 to 2022; Bangladesh Public Procurement Authority notices for the Health Economics Unit; the World
 * Bank's copy of WHO's Global Health Expenditure Database; the WTO's 2015 announcement on the medicines patent waiver;
 * ClinicalTrials.gov's API; and the Nessa et al. 2025 paper through Europe PMC. Two Bengali PDFs are set in a legacy
 * font encoding (SutonnyMJ), which pdftotext returns as Latin letters; those passages were transliterated by hand and
 * the figures quoted are the Arabic numerals printed in them. Where a figure could not be read it is under `gaps`.
 */
const HCR_2025 = "https://nicrh.gov.bd/public/images/report/1774752821reports.pdf";
const NICRH_REPORTS = "https://nicrh.gov.bd/reports";
const NICRH_ABOUT = "https://nicrh.gov.bd/about-us";
const NICRH_CHARTER = "https://nicrh.gov.bd/public/images/citizen/1758347812notice.pdf";
const DGDA_AR = "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-dgda/2026/5/b888567a-34d8-441a-a61e-3021ef1912b4.pdf";
const DGDA_RELIANCE = "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-dgda/2024/12/5b3ead1750704a4babc94a4e6565d6e5.pdf";
const DGDA_LAWS = "https://dgda.gov.bd/pages/laws";
const DSS_GRANT = "https://dss.gov.bd/pages/static-pages/6922dc97933eb65569e1122e";
const NCCS = "https://www.iccp-portal.org/system/files/plans/Publication_Cancer_Strategy.pdf.pdf";
const CX_STRATEGY = "https://www.iccp-portal.org/system/files/plans/BGD_B5_s21_National%20Strategy%20cervical%20ca%20prevention%20and%20control%20Bd%202017-%202022.pdf";
const NESSA = "https://doi.org/10.1186/s44263-025-00145-x";
const DASHBOARD_WB = "https://web.archive.org/web/20250318130213/https://nccbcst.bsmmu.ac.bd/viacbesync/dashboard";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=BD";
const TBS_BNHA = "https://www.tbsnews.net/bangladesh/health/out-pocket-expenditure-treatment-increases-further-562758";
const HEU_SSK = "https://www.bppa.gov.bd/advertisement-services/details-7927.html";
const HEU_BNHA7 = "https://bppa.gov.bd/advertisement-services/details-8645.html";
const DS_SSK = "https://www.thedailystar.net/frontpage/free-healthcare-ultra-poor-1199365";
const WTO_2015 = "https://www.wto.org/english/news_e/news15_e/trip_06nov15_e.htm";
const PA_LDC = "https://en.prothomalo.com/bangladesh/addcsizr3s";
const CTGOV_BD = "https://clinicaltrials.gov/search?cond=cancer&locStr=Bangladesh&country=Bangladesh";

export const BD_DIVE: CountryDive = {
  iso2: "BD",
  iso3: "BGD",
  name: "Bangladesh",
  flag: "🇧🇩",
  asOf: "2026-11-04",
  title: "Cancer in Bangladesh",
  description:
    "Cancer in Bangladesh from Bangladeshi sources: the national cancer institute's hospital registry of 30,831 new patients in 2025, IARC's modelled estimate of 187,263 new cancers a year, a health system in which households pay most of the cost themselves, the regulator that says the country makes 98 per cent of its own medicines, the cervical and breast screening programme and its electronic register, and why the country has almost no cancer trials in the international registry.",
  lede:
    "Bangladesh has no nationwide population-based cancer registry, so its own cancer counts come from one hospital: the National Institute of Cancer Research and Hospital in Dhaka registered 30,831 new cancer patients in 2025, most often with lung, breast or cervical cancer. Households pay most of the cost of care themselves, and the country makes nearly all of its own medicines, cancer medicines among them.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Bangladesh is 187,263 new cancers and 138,906 deaths, an age-standardised incidence of 117.5 per 100,000. It is a model, not a count: IARC's incidence method for Bangladesh is code 5, rates based on incidence estimates or registry data from neighbouring countries, and its mortality method is 3c, built from incidence estimates and modelled mortality-to-incidence ratios. Bangladesh's own registry figures cannot be compared with it directly. The National Institute of Cancer Research and Hospital's registry counts only patients who reach that one hospital in Dhaka (30,831 new patients in 2025, 34.9 per cent of them from Dhaka division), not a defined population, so it gives the mix of cancers that arrive there, not a rate. The two disagree most on oesophageal cancer: GLOBOCAN puts it first in Bangladesh with 29,410 new cases, while the hospital registry ranked it eighth with 1,030 patients. Both put lung, breast and cervical cancer among the commonest.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Bangladesh",
      aside: { label: "NICRH: Hospital Cancer Registry Report 2025 (PDF)", url: HCR_2025 },
      cards: [
        {
          id: "shape",
          title: "30,831 new patients at the national cancer institute in 2025, lung, breast and cervix the commonest",
          plain:
            "The national cancer institute in Dhaka registered 30,831 people newly diagnosed with cancer in 2025. Lung cancer was the commonest, then breast and cervical cancer. In men nearly a quarter of all cancers were lung cancers; in women nearly half were breast or cervical cancers. The patients' average age was about 50, and three in five could not read.",
          detail:
            "The Hospital Cancer Registry Report 2025, published by the institute's Department of Cancer Epidemiology in January 2026, records that 42,494 patients attended the outpatient department in 2025, of whom 31,046 were newly diagnosed with cancer; 30,831 (99.3%) with documented evidence of cancer were included. 15,809 (51.3%) were women and 15,022 (48.7%) men; mean age was 49.93 years (range 1 to 109); 61.4% were illiterate and 18.8% had primary education. Its top-ten table puts lung first at 4,626 (15%), then breast 3,800 (12.3%), cervix 3,632 (11.8%), connective tissue 1,433, lymph nodes 1,386, liver 1,271, stomach 1,215, oesophagus 1,030, cheek and buccal mucosa 828 and colon 825; the report's own text gives 4,274 for lung, so the two disagree. In men lung accounted for 3,574 (23.79%); in women breast 3,737 (23.64%) and cervix 3,632 (22.87%). 1,518 (4.9%) were children aged 0 to 18, with blood cancers commonest, and 6,713 (about 22%) were 65 or older. 69.9% arrived with a histopathological diagnosis, 9.2% cytological, more than 16% radiological only and 4.7% clinical only.",
          links: [
            { label: "NICRH: Hospital Cancer Registry Report 2025 (PDF)", url: HCR_2025 },
            { label: "NICRH: registry reports", url: NICRH_REPORTS },
          ],
        },
        {
          id: "tobacco",
          title: "Tobacco in the registry: men smoke, women chew",
          plain:
            "The registry asks every patient about tobacco. Just over half of the men had ever smoked, against fewer than two in a hundred women. Chewing tobacco ran the other way: more than a third of the women had ever chewed it, slightly more than the men. Cancers of the lip, mouth and throat made up almost one in eleven patients.",
          detail:
            "Table VI of the 2025 report gives, for men, 7,869 ever smokers (52.38%), of whom 1,243 (8.27%) were current smokers, and 4,802 ever chewers (31.96%), 905 (6.02%) current. For women it gives 238 ever smokers (1.51%), 86 (0.54%) current, and 5,701 ever chewers (36.07%), 1,365 (8.64%) current. The report summarises that men mainly use tobacco by smoking and women more often by chewing. Cancers of the lip, oral cavity and pharynx (ICD-O C00 to C14) were 2,683 patients, 8.7% of the total, and oral cavity cancer was among the ten commonest in both sexes (447 men, 599 women). These are proportions among patients who reached one hospital, not the prevalence of tobacco use in the population, and the registry does not attribute any cancer to tobacco.",
          links: [{ label: "NICRH: Hospital Cancer Registry Report 2025, Table VI (PDF)", url: HCR_2025 }],
        },
      ],
      tables: [
        {
          id: "nicrh-2025",
          title: "The ten commonest cancers among new patients at the National Institute of Cancer Research and Hospital, 2025",
          caption: "New patients registered at one hospital in Dhaka in 2025 (n = 30,831), both sexes, from Table III of the Hospital Cancer Registry Report 2025.",
          columns: [
            { key: "site", label: "Site" },
            { key: "n", label: "Patients", numeric: true },
            { key: "pct", label: "Per cent of all new patients", numeric: true },
          ],
          rows: [
            { site: "All sites", n: 30831, pct: 100 },
            { site: "Lung (the report's text gives 4,274)", n: 4626, pct: 15 },
            { site: "Breast", n: 3800, pct: 12.3 },
            { site: "Cervix", n: 3632, pct: 11.8 },
            { site: "Connective tissue", n: 1433, pct: 4.6 },
            { site: "Lymph nodes", n: 1386, pct: 4.5 },
            { site: "Liver", n: 1271, pct: 4.1 },
            { site: "Stomach", n: 1215, pct: 3.9 },
            { site: "Oesophagus", n: 1030, pct: 3.3 },
            { site: "Cheek and buccal mucosa", n: 828, pct: 2.7 },
            { site: "Colon", n: 825, pct: 2.7 },
          ],
          note: "A hospital-based register counts the patients who come to that hospital, not every cancer in a population, so it cannot give incidence rates and over-represents cancers that are referred to a Dhaka cancer centre. 34.9% of these patients lived in Dhaka division and 2.4% in Sylhet.",
          sources: [{ label: "NICRH: Hospital Cancer Registry Report 2025 (PDF)", url: HCR_2025 }],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: one hospital register, no national population count",
      cards: [
        {
          id: "hospital-registry",
          title: "A hospital register since 2005, with reports years apart",
          plain:
            "Bangladesh counts cancer through the national cancer institute's own patient register, started in 2005. The institute's director writes that the country has no nationwide population-based cancer registry. Reports have come out in batches covering several years, and the years 2021 to 2024 have not yet been published.",
          detail:
            "The institute's history page states that it began the country's first hospital-based cancer registry in 2005. The 2025 report records that the registry started officially on 1 January 2005, and its editor, Dr Md. Johirul Islam, writes that it first reported in 2006, with reports for 2005 to 2007 and 2008 to 2010, a draft for 2011 to 2013, an online report for 2014 on the Directorate General of Health Services website, and reports for 2015 to 2017 and 2018 to 2020; work on 2021 to 2024 was nearing completion, and he credits automation for the faster 2025 report. The director's message describes the registry as a vital source of information 'particularly in the absence of a nationwide population-based cancer registry'. The national cancer strategy of 2008 planned to extend hospital registration nationwide and named a population-based registry at Gazipur and a planned one by the oncology department of the medical university at Matlab, Chandpur and Mirsarai, Chittagong; OnCo found no published incidence figures from them.",
          links: [
            { label: "NICRH: About us (history)", url: NICRH_ABOUT },
            { label: "NICRH: Hospital Cancer Registry Report 2025 (PDF)", url: HCR_2025 },
            { label: "National Cancer Control Strategy and Plan of Action 2009-2015 (PDF, ICCP portal copy)", url: NCCS },
          ],
        },
        {
          id: "strategy-2008",
          title: "The national cancer strategy dates from 2008",
          plain:
            "Bangladesh's national cancer control strategy was approved in December 2008 to run from 2009 to 2015. It set out goals for prevention, screening, treatment and palliative care. OnCo found no newer national cancer strategy, though a separate strategy for cervical cancer covered 2017 to 2022.",
          detail:
            "The National Cancer Control Strategy and Plan of Action 2009-2015 was published by the line director for Non Communicable Diseases and Other Public Health Interventions at the Directorate General of Health Services in December 2008, and approved by the National Cancer Control Council on 7 December 2008. Its goals were to reduce incidence through primary prevention, ensure screening and early detection, ensure diagnosis and treatment, and improve quality of life through support, rehabilitation and palliative care. It reported, from the institute's and the medical university's hospital registries, that more than 66% of cancers occurred at ages 30 to 65, that about 20 to 25% were diagnosed at a localised stage, about two thirds when regional, and fewer than 15% with distant metastasis. The National Strategy for Cervical Cancer Prevention and Control covered 2017 to 2022. OnCo found no successor to either on the Directorate's or the institute's websites.",
          links: [
            { label: "National Cancer Control Strategy and Plan of Action 2009-2015 (PDF, ICCP portal copy)", url: NCCS },
            { label: "National Strategy for Cervical Cancer Prevention and Control, 2017-2022 (PDF, ICCP portal copy)", url: CX_STRATEGY },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: mostly the patient's household",
      aside: { label: "WHO Global Health Expenditure Database: out-of-pocket share, Bangladesh (World Bank)", url: WB_OOP },
      cards: [
        {
          id: "out-of-pocket",
          title: "Households pay around seven in every ten taka spent on health, most of it on medicines",
          plain:
            "Most health spending in Bangladesh comes straight from patients and their families rather than from taxes or insurance. The government's own health accounts put that share at 68.5% in 2020, and WHO's estimate for 2023 is 79%. About two thirds of what households spend goes on medicines.",
          detail:
            "The Health Economics Unit's sixth round of the Bangladesh National Health Accounts, covering 1997 to 2020, was presented in January 2023; at the launch its focal person reported that 68.5% of total health expenditure in 2020 was paid out of pocket, up from 56% in 1997, 62% in 2012 and 67% in 2015, and that public spending was 23.1%. The Health Care Financing Strategy 2012-2032 had set a target of 32% by 2032. Households spent 64.6% of their health expenses on drugs, 13.4% on ambulatory providers and 11.7% at medical and diagnostic laboratories. These figures are quoted from The Business Standard's report of the launch, because the report itself could not be downloaded. WHO's Global Health Expenditure Database, as republished by the World Bank (re-read on 17 November 2026), gives out-of-pocket spending as 79.3% of current health expenditure in 2023 and 77.0% in 2020; the WHO series is a share of current health expenditure, which leaves out capital spending, and is WHO's own estimate, so it does not match the national accounts.",
          links: [
            { label: "The Business Standard: Out-of-pocket spending on treatment rises further (4 January 2023)", url: TBS_BNHA },
            { label: "World Bank: out-of-pocket expenditure (% of current health expenditure), Bangladesh", url: WB_OOP },
            { label: "BPPA: Health Economics Unit notice on National Health Accounts VII (6 April 2024)", url: HEU_BNHA7 },
          ],
        },
        {
          id: "public-hospital",
          title: "At the national cancer institute: a ticket fee, free care for the poor, medicines free while stocks last",
          plain:
            "At the government cancer institute in Dhaka, outpatients buy a ticket for a set fee, and user fees for services are posted in each department. Patients who are poor or otherwise entitled are treated free. Medicines are given free when the hospital has them, but patients may have to buy some outside. Radiotherapy depends on the machines working.",
          detail:
            "The institute's citizen charter (in Bengali, dated 20 September 2025) states that outpatient tickets are bought for a fixed fee or online, that services are given first come first served, and that a list of user fees is displayed in each department. It states that poor and entitled patients ('অসচ্ছল ও প্রাধিকারভুক্ত রোগী') receive services free of charge, and that medicines are provided free subject to supply, though some medicines may have to be bought from outside. The hospital has free beds, paying beds and cabins, at fees set by the government. Admitted patients receive cancer surgery, chemotherapy, physiotherapy, rehabilitation and other treatment under specialists, and radiotherapy 'subject to the machines being operational', and day-care chemotherapy is available. The charter does not list the fees themselves, and OnCo did not find a published price for a course of radiotherapy or chemotherapy at the institute.",
          links: [
            { label: "NICRH: Citizen charter, 20 September 2025 (Bengali, PDF)", url: NICRH_CHARTER },
            { label: "NICRH: Citizen charter page", url: "https://nicrh.gov.bd/citizen-charter" },
          ],
        },
        {
          id: "social-grant",
          title: "A one-off grant of 100,000 taka for poor patients with cancer",
          plain:
            "The social welfare ministry pays a one-off grant to selected poor patients with cancer and six other long and costly illnesses. From the 2026-27 financial year each selected patient receives 100,000 taka. Patients or their families apply online, with a biopsy or other diagnostic report, through their local social services office.",
          detail:
            "The Department of Social Services' page for the 'financial assistance programme for people with cancer, kidney disease, liver cirrhosis, paralysis, heart disease, leukaemia and thalassaemia' (in Bengali; it showed a last update of 11 November 2026 when re-read on 17 November 2026) cites articles 15(a) and 15(d) of the Constitution and states that the programme aims to help poor and helpless patients afford treatment and protect their families. It covers all types of cancer diagnosed by a cancer specialist that need chemotherapy, radiotherapy, surgery or other costly treatment. It states that every finally selected patient receives a one-off 1,00,000 (one lakh) taka from the 2026-27 financial year. Applications are made online by the patient, a family member or a guardian; the signed printout, with the latest prescription and attested test reports no more than a year old (for cancer, a histopathology, cytopathology, bone marrow or biopsy report), goes to the upazila, city or hospital social services office. An applicant can receive the grant no more than once in a financial year and three times in a lifetime. The page's table of the programme, which covers all seven illnesses, shows an allocation of 650 crore taka for 65,000 patients in 2026-27, against 300 crore taka for 60,000 patients in 2025-26 and 561 patients in its first year, 2013-14; it does not say how many of them had cancer.",
          links: [{ label: "Department of Social Services: financial assistance for people with cancer and other illnesses (Bengali)", url: DSS_GRANT }],
        },
        {
          id: "ssk",
          title: "A government health card for the poorest, piloted since 2016",
          plain:
            "The health ministry has been piloting a health card for households below the poverty line, called Shasthyo Surokhsha Karmasuchi, since 2016. The government pays the premium and cardholders get free care for a list of diseases at local public hospitals. It covers part of the country, and OnCo could not confirm whether it pays for cancer treatment.",
          detail:
            "The Health Economics Unit's procurement notice of 16 February 2023 describes the scheme as a model of social health insurance for below-poverty-line households under the Health Care Financing Strategy 2012-2032: piloting began in one upazila of Tangail district in March 2016, was extended to two more upazilas in September 2017, and had then expanded to all upazilas and municipalities of Tangail, six more districts and the North and South Dhaka city corporations, with Barishal district next. At launch in March 2016, The Daily Star reported a health ministry statement that cardholders and their families could receive free care for 50 diseases, including complicated heart, kidney and gallbladder ailments, at upazila and district public hospitals, with the government paying an annual premium of 1,000 taka per household for care up to 50,000 taka a year. Neither source names cancer, and the scheme's current benefit list could not be read because the Unit's website did not respond.",
          links: [
            { label: "BPPA: scheme operator for Shasthyo Surokhsha Karmasuchi, Barishal (16 February 2023)", url: HEU_SSK },
            { label: "The Daily Star: Free healthcare for the poor (24 March 2016)", url: DS_SSK },
          ],
        },
        {
          id: "no-hta",
          title: "No health technology assessment body for medicines",
          plain:
            "OnCo found no national body in Bangladesh that assesses whether a cancer medicine is worth its price before the public system buys it. The regulator registers medicines and sets their prices, and households pay for most medicines themselves.",
          detail:
            "The Directorate General of Drug Administration's 2024-25 annual report records that, on the health ministry's instruction, the National List of Essential Medicines was updated and published in the gazette, and lists among its functions registration, licensing and price-setting; the anti-cancer therapeutic class carries code 010 in its classification. OnCo found no health technology assessment agency, cost-effectiveness threshold or published reimbursement decision for cancer medicines in the regulator's, the health ministry's or the Health Economics Unit's material that could be reached. With out-of-pocket spending at about 70 to 80% of health spending and 64.6% of household health spending going on drugs, the practical question for most patients is the pharmacy price and whether the public hospital has the medicine in stock.",
          links: [
            { label: "DGDA: Annual report 2024-2025 (Bengali, PDF)", url: DGDA_AR },
            { label: "The Business Standard: National Health Accounts launch (4 January 2023)", url: TBS_BNHA },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: the Directorate General of Drug Administration",
      aside: { label: "DGDA: Annual report 2024-2025 (Bengali, PDF)", url: DGDA_AR },
      cards: [
        {
          id: "dgda",
          title: "A 2023 law, reliance on eight reference regulators, and no published approval times",
          plain:
            "Bangladesh's medicines regulator works under a new law passed in 2023. For vaccines and biological medicines, its 2023 guideline relies on approvals by eight named regulators abroad, such as those of the United States, the European Union, the United Kingdom and Japan, and on WHO prequalification. It does not publish how long approvals take.",
          detail:
            "The Drugs and Cosmetics Act 2023 (Act 29 of 2023, Bangladesh Gazette of 18 September 2023) consolidated and updated the existing drug laws, the regulator's annual report says, and its section 65 governs pre-clinical and clinical trials of medicines, vaccines and devices. The Directorate's Guidelines for Reliance on other NRAs in Bangladesh, issued on 21 August 2023 and implemented from 31 August 2023, cite the National Drug Policy 2016 and Drug Control Committee meetings 248 and 250 as the legal basis, and list in Annexure 1 eight reference authorities for vaccines and biological products: the US Food and Drug Administration, the European Medicines Agency, Australia's Therapeutic Goods Administration, Japan's PMDA, the UK's MHRA, Germany's Federal Institute for Drugs and Medical Devices, Swissmedic and France's regulator, with WHO-prequalified products considered case by case. For vaccines and biologicals already approved by a reference authority, the guideline says the Directorate 'does not review again' and registers them on the basis of that evaluation or a Certificate of Pharmaceutical Product, and that a molecule registered by a reference authority in a given strength and form is considered safe and effective when a new drug is considered locally. The Directorate also takes part in WHO's collaborative registration procedure. Its 2024-25 report says it is working towards WHO maturity level 3, and it publishes no approval times.",
          links: [
            { label: "DGDA: Guidelines for Reliance on other NRAs in Bangladesh, 2023 (PDF)", url: DGDA_RELIANCE },
            { label: "DGDA: laws and policies, including the Drugs and Cosmetics Act 2023", url: DGDA_LAWS },
            { label: "DGDA: Annual report 2024-2025 (Bengali, PDF)", url: DGDA_AR },
          ],
        },
        {
          id: "made-at-home",
          title: "A country that makes 98 per cent of its own medicines and exports to more than 150 countries",
          plain:
            "The regulator reports that Bangladeshi factories now make about 98 per cent of the medicines the country uses, including anti-cancer medicines, vaccines and insulin, and export to more than 150 countries. It describes a park built at Gazaria so that the country can make its own raw ingredients, where three makers have started production. One Dhaka company has tested its own version of the breast cancer antibody trastuzumab.",
          detail:
            "The Directorate's 2024-25 annual report (in Bengali) states that about 98% of domestic demand for medicines is produced locally and exported to more than 150 countries including in Europe and America; that high-technology medicines such as vaccines, insulin and anti-cancer medicines are made in the country; and that an API park has been built at Gazaria, Munshiganj, to make the country self-sufficient in the raw materials of medicines, with 44 plots allocated to raw material makers, of which three had begun production. The report does not say what share of raw materials is imported. Approved exports in 2024-25 were 29,374,614,433 taka, and the Directorate issued 1,412 Certificates of Pharmaceutical Product, 129 Free Sale Certificates, 3,040 export licences and 58 Good Manufacturing Practice certificates. Its National Drug Control Laboratory tested 2,882 samples and found 84 substandard. Incepta Pharmaceuticals, which says it exports to more than 102 countries, sponsored a completed phase 1 comparison of its proposed trastuzumab biosimilar with Roche's in 80 healthy adults in Dhaka (NCT06886659).",
          links: [
            { label: "DGDA: Annual report 2024-2025, sections 9.1 to 9.3 and 12.9 (Bengali, PDF)", url: DGDA_AR },
            { label: "ClinicalTrials.gov NCT06886659", url: "https://clinicaltrials.gov/study/NCT06886659" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: cervical and breast examination at public health facilities",
      aside: { label: "Nessa et al., BMC Global and Public Health 2025", url: NESSA },
      cards: [
        {
          id: "via-cbe",
          title: "Cervical screening by visual inspection, with clinical breast examination, for women aged 30 to 60",
          plain:
            "Bangladesh screens women for cervical cancer by looking at the cervix after applying dilute vinegar, a test that gives an answer on the spot, and examines their breasts at the same visit. Women aged 30 to 60 are offered it every five years at public hospitals and clinics. Fewer than one in five eligible women were screened over ten years.",
          detail:
            "The National Strategy for Cervical Cancer Prevention and Control 2017-2022 records that the government chose visual inspection with acetic acid in October 2003, piloted it in 16 districts in 2005 with providers trained at the medical university, formally launched the National Cervical and Breast Cancer Screening Program in 2006 with the university and UNFPA, and extended it to upazila level from 2012; screening then ran at around 400 centres and was described as predominantly opportunistic. The strategy set screening for women aged 30 to 60 every five years with a target of at least 40% coverage, and 'see and treat' for screen-positive women at colposcopy. Nessa et al. (2025) describe screening at 600 facilities and put the target population at 29.43 million women; aggregated data for 2014 to 2024 show coverage of 17.9% (5.3 million). In the case-based electronic register from January 2018 to May 2023, 3.3% of 1,557,002 women tested positive and 40.4% of those attended colposcopy. No national mammography programme was found.",
          links: [
            { label: "National Strategy for Cervical Cancer Prevention and Control, 2017-2022 (PDF, ICCP portal copy)", url: CX_STRATEGY },
            { label: "Nessa et al., Cervical cancer screening data from the case-based national electronic registry in Bangladesh (2025)", url: NESSA },
          ],
        },
        {
          id: "dashboard",
          title: "The programme's own dashboard: over five million women enrolled",
          plain:
            "The screening centre at the national medical university publishes a public dashboard of the programme's numbers. In a copy saved in March 2025 it counted over five million women enrolled in its case-based register since 2019, more than half of them at community clinics, with about three in a hundred testing positive.",
          detail:
            "The National Cervical and Breast Cancer Statistics dashboard (programme office at the medical university, data source the national DHIS2), as archived by the Internet Archive on 18 March 2025, showed for the case-based system 2019 to 2025: 5,272,966 women enrolled, 2,874,216 (54.5%) in community clinics; 2,805,215 visual inspection screens with 82,965 (3.0%) positive; 63,521 colposcopy tests with 27,411 (43.2%) positive; and 2,807,789 clinical breast examinations with 26,028 (0.9%) positive. For the aggregated system 2014 to 2025 it showed 5,490,164 visual inspection screens with 239,589 (4.4%) positive and 5,548,979 breast examinations with 78,983 (1.4%) positive. The live dashboard returned 'not found' on 4 November 2026, so these figures are from the archived copy. The national cancer institute separately runs free breast screening campaigns for women each December, which its history page dates to 2015.",
          links: [
            { label: "National Cervical and Breast Cancer Statistics dashboard (Internet Archive copy, 18 March 2025)", url: DASHBOARD_WB },
            { label: "NICRH: About us (history)", url: NICRH_ABOUT },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Bangladesh does",
      title: "What Bangladesh does that others do not",
      cards: [
        {
          id: "patent-waiver",
          title: "A medicines industry working under a patent exemption for the poorest countries",
          plain:
            "As one of the world's least developed countries, Bangladesh is not required by world trade rules to protect patents or clinical trial data on medicines, so it may choose not to. Its exit from that group was due in November 2026, and on 30 October 2026 the UN agreed to postpone it to November 2029.",
          detail:
            "On 6 November 2015 the WTO's TRIPS Council extended until January 2033 the period during which the key pharmaceutical provisions of the TRIPS Agreement do not apply to least developed countries, which may choose whether to protect pharmaceutical patents and clinical trial data before then; the decision covers pharmaceutical products in least developed countries. Bangladesh was scheduled to leave the category on 24 November 2026; on 30 October 2026 the UN General Assembly, without objection, approved a G-77 proposal to defer the graduation of Bangladesh and Nepal by three years, so Bangladesh is now to graduate in November 2029, as Prothom Alo reported from the plenary. The regulator's report that about 98% of domestic demand is met locally, including anti-cancer medicines, describes the industry as it works under these terms; OnCo has not found a source that measures how much of its growth the exemption explains. What graduation will mean for the price of cancer medicines in Bangladesh is debated and is not stated here.",
          links: [
            { label: "WTO: members agree to extend drug patent exemption for poorest members (6 November 2015)", url: WTO_2015 },
            { label: "Prothom Alo: Bangladesh's LDC graduation postponed by 3 years to November 2029 (30 October 2026)", url: PA_LDC },
            { label: "DGDA: Annual report 2024-2025 (Bengali, PDF)", url: DGDA_AR },
          ],
        },
        {
          id: "e-register",
          title: "Following every screened woman electronically, through community clinics",
          plain:
            "Bangladesh records each woman screened for cervical cancer in a national electronic register that follows her from enrolment to test, referral and treatment. Community clinics, the smallest public health posts, enrolled about a fifth of the women in the paper's data to May 2023, and more than half in the programme's dashboard as archived in March 2025. The researchers who reviewed it note that few countries track screening this way.",
          detail:
            "The national programme began aggregated reporting in DHIS2 in 2013 and a case-based register on its tracker component in January 2018 (Nessa et al., 2025). From January 2018 to May 2023 it enrolled 1,562,963 women at 497 screening facilities and 6,398 community clinics, with primary facilities doing 74.4% of enrolments and 72% of tests; upazila health complexes did 51.8% of enrolments and community clinics 22.6%, while the programme's dashboard, in a copy archived on 18 March 2025, showed 54.5% of 5,272,966 enrolments from 2019 to 2025 at community clinics; of women treated for precancer, 81.6% (5,062) had thermal ablation and 17.6% (1,089) loop excision. The authors set screening coverage of 53.9% in Thailand, 78.0% in England and 3.0% to 7.1% in Ghana, Uganda and India beside Bangladesh's, write that those countries do not have electronic enrolment and tracking systems like Bangladesh's, and name Burkina Faso, Côte d'Ivoire, Guatemala and the Philippines as examples of the few countries reporting use of the DHIS2 tracker for cervical screening. Only 40.4% of screen-positive women attended colposcopy, and the authors suggest telephone follow-up of women who do not attend, decentralised colposcopy and mobile reminders.",
          links: [
            { label: "Nessa et al., BMC Global and Public Health 2025", url: NESSA },
            { label: "Europe PMC: full text", url: "https://europepmc.org/article/MED/40205589" },
            { label: "National Cervical and Breast Cancer Statistics dashboard (Internet Archive copy, 18 March 2025)", url: DASHBOARD_WB },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with a site in Bangladesh", url: CTGOV_BD },
      cards: [
        {
          id: "trials-registry",
          title: "Almost no international cancer trials: none in OnCo's records, 48 hits on ClinicalTrials.gov",
          plain:
            "None of OnCo's trial records lists a site in Bangladesh: of 6,525 trial records counted on 17 November 2026, 5,578 carry the list of countries from ClinicalTrials.gov, and the country's name was checked against every spelling in that data. ClinicalTrials.gov's own cancer search returns 48 studies with a Bangladeshi site, some of which are not about cancer, and 8 of them were recruiting. Most are small studies run by Bangladeshi universities and hospitals.",
          detail:
            "Of OnCo's 6,525 trial records, counted on 17 November 2026, 5,578 carry the countries ClinicalTrials.gov lists for the study; across those and their 95 distinct country names, none is Bangladesh or any spelling of it. A query of the ClinicalTrials.gov API on 4 November 2026 found 846 studies of any condition with a location in Bangladesh, and 48 returned by its 'cancer' condition search, which also matched studies of polycystic ovary syndrome and nutrition; 8 of the 48 were recruiting. The commonest sponsor of the cancer studies is the national medical university, under its old or new name, for example trastuzumab with capecitabine and oxaliplatin (NCT05997524, phase 2), venetoclax with hypomethylating agents in acute myeloid leukaemia (NCT07773909), brachytherapy schedules (NCT02765919) and nerve blocks for cancer pain (NCT07653906). The icddr,b research centre is testing locally made nutritional supplements for cancer cachexia (NCT07613125). Industry trials are rare: ClinicalTrials.gov classes the lead sponsor as industry in 3 of the 48, Sanofi, HKGepitherapeutics and Incepta, whose trastuzumab biosimilar study (NCT06886659) is the only one of the three from a Bangladeshi sponsor. A Dhaka sponsor named Clinical Research Organization, which the registry does not class as industry, leads two more.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Bangladesh", url: CTGOV_BD },
            { label: "ClinicalTrials.gov NCT07613125", url: "https://clinicaltrials.gov/study/NCT07613125" },
          ],
        },
        {
          id: "publications",
          title: "Oncology papers with a Bangladeshi author more than doubled from 2021 to 2025",
          plain:
            "OpenAlex, an open index of research papers, counts oncology papers with at least one author in Bangladesh: 209 in 2021 rising to 469 in 2025, 1,462 over the five years. The national cancer institute has published its own journal, the Cancer Journal of Bangladesh, since 2020.",
          detail:
            "OnCo's OpenAlex extract (built 8 September 2026, works whose primary topic is in the Oncology subfield, whole counting by author country) gives 209 works in 2021, 239 in 2022, 247 in 2023, 298 in 2024 and 469 in 2025, 1,462 in total, of which 1,020 are open access. These count any paper with a Bangladesh-affiliated author, including large international collaborations, so they measure participation rather than leadership. The National Institute of Cancer Research and Hospital's history records that the Cancer Journal of Bangladesh began publication with an ISSN in 2020, and its publications page lists issues from volume 1 (July 2020) to volume 7, and a first institutional yearbook, for 2023, published in 2024. The institute has offered MD and MS courses in radiation, medical and surgical oncology since 2004.",
          links: [
            { label: "NICRH: publications", url: "https://nicrh.gov.bd/publications" },
            { label: "NICRH: About us (history)", url: NICRH_ABOUT },
            { label: "OpenAlex", url: "https://openalex.org/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-population-registry",
      title: "No population-based incidence figures for Bangladesh",
      plain:
        "OnCo could not find any published cancer incidence rate for a defined population anywhere in Bangladesh, so every national figure on this page is either IARC's model or a count of patients at one hospital. The registry years 2021 to 2024 are still unpublished.",
      detail:
        "The 2008 national strategy described a population-based registry at Gazipur and a planned one at Matlab and Mirsarai; OnCo found no report of incidence from either. The National Institute of Cancer Research and Hospital's 2025 report says its 2021 to 2024 report is nearing completion. The earlier reports for 2014, 2015 to 2017 and 2018 to 2020 are posted on its reports page but were not read for this page, so no trend across years is given. Survival data for Bangladesh were not found.",
      links: [{ label: "NICRH: registry reports", url: NICRH_REPORTS }],
    },
    {
      id: "unreadable-sources",
      title: "Sources that could not be reached on 4 November 2026",
      plain:
        "The Health Economics Unit's website did not respond, so the national health accounts report and the health card scheme's benefit list were not read from the source; the figures given come from a newspaper report of the launch and procurement notices. The live screening dashboard returned 'not found', and an archived copy was used instead. Both were tried again on 17 November 2026 with the same result.",
      detail:
        "heu.portal.gov.bd timed out. The Internet Archive's copy of its publications list (19 May 2025) names Research Paper No. 35, Bangladesh National Health Accounts 1997-2020 (January 2023), but the archived link points to a different file, Research Paper No. 32. The out-of-pocket figures from that report are therefore quoted as The Business Standard reported them from the launch. nccbcst.bsmmu.ac.bd returned 404, and the medical university's old domain bsmmu.ac.bd did not respond; its new site is bmu.ac.bd. On 17 November 2026 heu.portal.gov.bd again did not respond and the dashboard address again returned 404. The Directorate General of Drug Administration's Bengali annual report is set in a legacy font, and figures were taken from the numerals printed in it.",
      links: [
        { label: "Internet Archive: Health Economics Unit publications list (19 May 2025)", url: "https://web.archive.org/web/20250519152855/https://heu.portal.gov.bd/site/page/bd4ebc9f-e97d-4549-bd3d-c38a49db3c32" },
        { label: "The Business Standard: National Health Accounts launch (4 January 2023)", url: TBS_BNHA },
      ],
    },
    {
      id: "approval-times",
      title: "No published approval times or prices, and no count of working radiotherapy machines",
      plain:
        "The regulator does not publish how long it takes to register a new cancer medicine, and OnCo did not research the prices it sets for cancer medicines. IAEA's directory of radiotherapy centres lists 26 linear accelerators and 5 cobalt-60 units at 22 centres in Bangladesh, but OnCo found no source saying how many of them were working.",
      detail:
        "The Directorate's 2024-25 annual report gives counts of certificates, licences and tests but no time from application to registration, and the reliance guideline sets no deadlines. Bangladesh's medicine price-setting rules and the retail prices of cancer medicines were not surveyed. The national cancer institute's citizen charter says radiotherapy is given subject to the machines working, and OnCo found no source saying how many machines were working; press reports of new machines were not used. IAEA's Directory of Radiotherapy Centres (DIRAC), read on 16 November 2026, lists 22 centres in Bangladesh with 26 linear accelerators and 5 cobalt-60 units between them; 16 of the centres are listed with brachytherapy, and 4 are listed with neither a linear accelerator nor a cobalt-60 unit. For the National Institute of Cancer Research & Hospital it lists 2 linear accelerators and no cobalt-60 unit. Every entry gives 2026 as the year it was last updated. The directory lists machines and does not say whether they were in working order. HPV vaccination was not researched for this page.",
      links: [
        { label: "DGDA: Annual report 2024-2025 (Bengali, PDF)", url: DGDA_AR },
        { label: "NICRH: Citizen charter, 20 September 2025 (Bengali, PDF)", url: NICRH_CHARTER },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries data", url: "https://dirac.iaea.org/Data/CountriesLight" },
      ],
    },
  ],
  institutions: ["nicrh-dhaka", "dghs-bangladesh", "dgda-bangladesh", "bangladesh-medical-university", "heu-bangladesh", "tata-medical-center-kolkata"],
  companies: ["incepta-pharmaceuticals"],
  drugs: ["trastuzumab"],
  trials: [],
  papers: ["paper-nessa-bangladesh-cervical-screening-registry-2025"],
  people: ["mostafa-aziz-sumon"],
  how:
    "Every card was written from sources read raw on 4 November 2026: the National Institute of Cancer Research and Hospital's Hospital Cancer Registry Report 2025, history page and Bengali citizen charter; the Directorate General of Drug Administration's Bengali annual report 2024-25 and its 2023 reliance guideline; the Department of Social Services' Bengali page on its grant for patients with cancer; the 2008 national cancer strategy and the 2017 to 2022 cervical cancer strategy; procurement notices of the Health Economics Unit; WHO's health expenditure series through the World Bank; the WTO's 2015 announcement; the ClinicalTrials.gov API; and Nessa et al. (2025), resolved through Crossref and read in Europe PMC. Bengali was read in Bengali; quotations keep their wording. The GLOBOCAN table comes from IARC's 2024 estimates. New records added for this page: the drug regulator, the health services directorate, the medical university, the Health Economics Unit, Incepta and the screening paper. Tata Medical Center in Kolkata is listed because its OnCo record describes it as serving eastern India, Bangladesh and Nepal.",
  verify:
    "The registry figures describe patients at one Dhaka hospital in 2025, not the country. The grant amount is the one the Department of Social Services states from the 2026-27 financial year, and may change. Graduation from least developed country status is now scheduled for November 2029, and the trade terms on medicines may change with it. Before relying on whether a treatment or medicine is free at a public hospital, ask the hospital, because the charter says medicines are free only while supplies last.",
  verifyLinks: [
    { label: "NICRH: Hospital Cancer Registry Report 2025 (PDF)", url: HCR_2025 },
    { label: "Department of Social Services: financial assistance programme (Bengali)", url: DSS_GRANT },
    { label: "DGDA: Annual report 2024-2025 (Bengali, PDF)", url: DGDA_AR },
    { label: "ClinicalTrials.gov: cancer studies with a site in Bangladesh", url: CTGOV_BD },
  ],
};
