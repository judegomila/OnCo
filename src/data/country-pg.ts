import type { CountryDive } from "@/data/country-dive";

/**
 * Papua New Guinea deep dive: the hand-written cards for /countries/pg/ (wave 11). Every figure was read from the raw
 * text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024 fact sheet for Papua New
 * Guinea (PDF text), the National Department of Health's National Cancer Control Policy 2015 and its Free Primary
 * Health Care and Subsidized Specialist Services Policy of 2013 (PDF text), the Department's Pharmaceutical Services
 * Standards Branch page and the Medicines and Cosmetics Act 1999 it links (PDF text), WHO's list of regulators at
 * maturity level 3 and 4 (August 2026, PDF text), WHO's release of 8 September 2026 on the HPV vaccine launch, WHO's
 * vaccine introduction, HPV coverage and Global Health Expenditure Database rows from its public data APIs, IAEA DIRAC's
 * public equipment data, and the papers' abstracts through Europe PMC. Where a figure could not be read it is named
 * under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/598-papua-new-guinea-fact-sheet.pdf";
const NDOH = "https://www.health.gov.pg/";
const NCCP_2015 = "https://www.health.gov.pg/pdf/NCCP_2015.pdf";
const FREE_CARE_2013 = "https://www.health.gov.pg/pdf/FPHCSSSP_2014.pdf";
const PSSB = "https://www.health.gov.pg/subindex.php?pharm=1";
const MCA_1999 = "https://www.health.gov.pg/param_pdf/M%26CA1999.pdf";
const WHO_ML = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const WHO_HPV_LAUNCH = "https://www.who.int/papuanewguinea/news/detail/08-09-2026-papua-new-guinea-launches-hpv-vaccination-to-protect-girls-from-cervical-cancer";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PNG'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_INTRO_API = "https://xmart-api-public.who.int/WIISE/MT_AD_INTRO_LONG?$filter=ISO_3_CODE%20eq%20'PNG'";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'PNG'";
const WHO_GOV_API = "https://ghoapi.azureedge.net/api/GHED_GGHE-DCHE_SHA2011?$filter=SpatialDim%20eq%20'PNG'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHE_pc_US_SHA2011?$filter=SpatialDim%20eq%20'PNG'";
const TGA_MOU = "https://www.health.gov.pg/param_pdf/MOUGOA%26GOPNGTGAC.pdf";
const WHO_EXT_API = "https://ghoapi.azureedge.net/api/GHED_EXTCHE_SHA2011?$filter=SpatialDim%20eq%20'PNG'";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const CTGOV = "https://clinicaltrials.gov/search?country=Papua%20New%20Guinea&cond=cancer";
const HPV_STAT = "https://doi.org/10.1016/S2214-109X(22)00271-6";
const NGUYEN_2022 = "https://doi.org/10.1136/bmjgh-2021-007380";
const KELWAIP_2020 = "https://doi.org/10.1016/j.oooo.2020.06.010";
const RAJ_2025 = "https://doi.org/10.7189/jogh.15.03008";
const UMO_2023 = "https://doi.org/10.1016/j.jcpo.2023.100447";
const LAVU_2005 = "https://europepmc.org/article/MED/16156984";
const SAUK_2026 = "https://doi.org/10.1186/s44263-026-00336-0";
const ROSE_2026 = "https://doi.org/10.1016/j.soncn.2026.152254";

export const PG_DIVE: CountryDive = {
  iso2: "PG",
  iso3: "PNG",
  name: "Papua New Guinea",
  flag: "🇵🇬",
  asOf: "2026-11-11",
  title: "Cancer in Papua New Guinea",
  description:
    "Cancer in Papua New Guinea from its own and WHO sources: IARC's estimate of 13,908 new cancers and 7,785 deaths in 2024, made without national incidence data, oral cancer, linked to betel quid, among the commonest, one radiotherapy centre in Lae with two cobalt-60 machines, a 2013 policy of free primary care, a 2015 cancer policy, and HPV vaccination introduced in September 2026.",
  lede:
    "Papua New Guinea's 2015 cancer policy said the cancer registry set up in the 1980s was no longer working, and IARC still has no national incidence data, so the national cancer figures are a model: 13,908 new cancers and 7,785 deaths in 2024, with breast, oral and cervical cancer the commonest. Radiotherapy is given in one place, the National Cancer Centre in Lae, and HPV vaccination for girls began in September 2026.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Papua New Guinea is 13,908 new cancers and 7,785 deaths, an age-standardised incidence of 199.5 per 100,000 (190.1 in men, 210.8 in women) and mortality of 117.7. The fact sheet gives the country-specific incidence data source as \"No data\": incidence is national mortality estimates applied to model-based mortality-to-incidence ratios. Mortality comes from WHO national data, with national or subnational rates scaled to regional all-cancer rates. The National Department of Health's own 2015 policy estimated 10,000 to 15,000 cases a year from hospital data, said mortality was not known, and added that most cases are never recorded because people do not reach a health facility. IARC counts 510 non-melanoma skin cancers among the 13,908 (13,398 excluding them).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Papua New Guinea",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Papua New Guinea (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 14,000 new cancers a year, with breast and oral cancer the commonest",
          plain:
            "IARC estimates 13,908 new cancers in Papua New Guinea in 2024, 6,429 in men and 7,479 in women, and 7,785 cancer deaths. Breast cancer is the commonest overall, cancer of the lip and mouth second and cervical cancer third. In men, mouth cancer is the commonest of all.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,494 breast cancers (656 deaths), 1,414 lip and oral cavity cancers (851 deaths), 1,055 cervical cancers (635 deaths), 1,023 lung cancers (895 deaths), 995 colorectal cancers (490 deaths) and 897 liver cancers (773 deaths). In men the leading cancers are lip and oral cavity (874, 13.6%), colorectum (718) and prostate (618); in women, breast (1,494, 20.0%), cervix (1,055, 14.1%) and lip and oral cavity (540). By deaths the order is lung, lip and oral cavity, then liver. The risk of developing cancer before 75 is 19.3%, and of dying of it 12.3%.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Papua New Guinea (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "no-registry",
          title: "A cancer registry from the 1980s that had stopped working by 2015",
          plain:
            "The National Department of Health's 2015 cancer policy says a cancer registry existed in the 1980s but had not worked in recent years. It planned hospital-based registries in Lae and Port Moresby first, with a population-based registry as the long-term goal. IARC still lists no national incidence data.",
          detail:
            "Section 3.2.7 of the National Cancer Control Policy, approved by the National Executive Council in 2015, says the cancer burden was being estimated from hospital data and capacity reviews, that a national population-based registry was not then feasible, and that a hospital-based registry would be set up first at the National Cancer Centre in Lae and at Port Moresby General Hospital, working with the National Health Information System. Recalculated from that system's hospital admissions, excluding benign tumours, the policy gives cervical cancer 28% of cancer admissions, oral cancer 15%, and breast and liver cancer 9% each. A childhood cancer registry has been developed at Port Moresby General Hospital with SIOP Oceania.",
          links: [
            { label: "National Department of Health: National Cancer Control Policy 2015, sections 3.1 and 3.2.7 (PDF)", url: NCCP_2015 },
            { label: "Raj et al., childhood cancer care in Papua New Guinea (J Glob Health 2025)", url: RAJ_2025 },
          ],
        },
      ],
      tables: [
        {
          id: "pg-top",
          title: "IARC's leading cancers for Papua New Guinea, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Breast", cases: 1494, deaths: 656 },
            { site: "Lip, oral cavity", cases: 1414, deaths: 851 },
            { site: "Cervix uteri", cases: 1055, deaths: 635 },
            { site: "Lung", cases: 1023, deaths: 895 },
            { site: "Colorectum", cases: 995, deaths: 490 },
            { site: "Liver", cases: 897, deaths: 773 },
            { site: "Prostate", cases: 618, deaths: 348 },
            { site: "Thyroid", cases: 590, deaths: 83 },
            { site: "All cancers", cases: 13908, deaths: 7785 },
          ],
          note: "IARC lists no incidence data for Papua New Guinea: new cases are modelled from national mortality estimates and mortality-to-incidence ratios, so this is the table a registry would replace.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Papua New Guinea (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "pg-admissions",
          title: "Share of cancer hospital admissions, from the National Health Information System",
          caption: "Percentage of cancer admissions, excluding benign tumours, as given in the 2015 National Cancer Control Policy. The policy does not state the years counted.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "share", label: "Share of cancer admissions (%)", numeric: true },
          ],
          rows: [
            { site: "Cervix", share: 28 },
            { site: "Oral", share: 15 },
            { site: "Breast", share: 9 },
            { site: "Liver", share: 9 },
          ],
          note: "Hospital admissions, not incidence: they count people who reached a hospital, and the policy says most people with cancer do not.",
          sources: [{ label: "National Department of Health: National Cancer Control Policy 2015, section 3.1 (PDF)", url: NCCP_2015 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "Free Primary Health Care and Subsidized Specialist Services Policy (2013, PDF)", url: FREE_CARE_2013 },
      cards: [
        {
          id: "free-care",
          title: "Free primary care and subsidised hospital care, paid mostly by the government",
          plain:
            "Health care in Papua New Guinea is paid for mainly by the government. A 2013 policy set out to abolish user fees at aid posts, health centres and urban clinics and to subsidise specialist care in hospitals. WHO puts out-of-pocket payment at 8.6% of health spending in 2023.",
          detail:
            "The Free Primary Health Care and Subsidized Specialist Services Policy, issued in 2013 to carry out the Alotau Accord, said user fees would be abolished altogether at facility levels one to three once the National Executive Council approved it, with government funds to offset the loss, and planned subsidised specialist services at district, provincial and regional hospitals and the national hospital by December 2013. WHO's Global Health Expenditure Database gives, for 2023, current health spending of about US$85 a person, 73.3% of it from government, 18.2% from external donors and 8.6% paid out of pocket. The 2015 cancer policy says the National Cancer Centre had an annual budget of under two million kina, used up by routine operations.",
          links: [
            { label: "National Department of Health: Free Primary Health Care and Subsidized Specialist Services Policy (2013, PDF)", url: FREE_CARE_2013 },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Papua New Guinea (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: government share (API)", url: WHO_GOV_API },
            { label: "WHO Global Health Expenditure Database: external share (API)", url: WHO_EXT_API },
            { label: "WHO Global Health Expenditure Database: health spending per person in US dollars (API)", url: WHO_CHE_API },
          ],
        },
        {
          id: "cost-and-supply",
          title: "What breast cancer care costs a provincial hospital, and an unreliable drug supply",
          plain:
            "At Alotau Provincial Hospital, breast cancer care cost an average of about 25,000 kina a patient between 2017 and 2022, almost all of it borne by the hospital. The 2015 policy said the procurement of cancer medicines did not keep stocks reliably.",
          detail:
            "A cost study of consecutive patients at Alotau Provincial Hospital, Milne Bay, from January 2017 to August 2022 put the total direct medical cost at K1,624,656 (US$471,150), with hospital costs 99.7% of it and an average of K24,995 (US$7,248) a patient; 58.5% of the patients had no surgery of any kind. The National Cancer Control Policy listed, among the challenges of 2015, that the procurement system for cancer drugs and equipment did not maintain stocks in a timely way, and that pain relief for advanced cancer was limited by training and by some opiates not being available.",
          links: [
            { label: "Umo et al., cost of breast cancer care in a provincial hospital (J Cancer Policy 2023)", url: UMO_2023 },
            { label: "National Department of Health: National Cancer Control Policy 2015, sections 3.1 and 3.2.5 (PDF)", url: NCCP_2015 },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "National Department of Health: Pharmaceutical Services Standards Branch", url: PSSB },
      cards: [
        {
          id: "pssb",
          title: "A branch of the health department registers medicines, taking account of the exporting country's approval",
          plain:
            "Medicines are regulated by the Pharmaceutical Services Standards Branch of the National Department of Health, under the Medicines and Cosmetics Act 1999. When it licenses an imported medicine, the law asks it to consider whether the exporting country's regulator has registered it. Papua New Guinea is not on WHO's list of maturity level 3 or 4 regulators.",
          detail:
            "The Department's page says the branch registers medicinal products under its Guidelines for Medicines, licenses and inspects pharmacies, importers and wholesalers, runs a medicine quality control laboratory, reports adverse drug reactions to the Uppsala Monitoring Centre, and is secretariat to the Pharmacy Board and the Medicines Evaluation Committee. Section 10 of the Act tells the licensing authority, the departmental head, to weigh a product's safety, efficacy and quality and, for imports, its registration with the licensing authority of the country it comes from. Under a memorandum with Australia running to 31 March 2021, the Therapeutic Goods Administration offered to test up to five medicine samples a year for Papua New Guinea at no charge, with cytotoxic medicines excluded; the memorandum does not say how many were tested.",
          links: [
            { label: "National Department of Health: Pharmaceutical Services Standards Branch", url: PSSB },
            { label: "Medicines and Cosmetics Act 1999, section 10 (PDF)", url: MCA_1999 },
            { label: "Memorandum of understanding between Australia and Papua New Guinea on testing therapeutic goods, paragraph 4 (PDF)", url: TGA_MOU },
            { label: "WHO: list of regulatory authorities operating at maturity level 3 and 4 (August 2026)", url: WHO_ML },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: Papua New Guinea launches HPV vaccination (8 September 2026)", url: WHO_HPV_LAUNCH },
      cards: [
        {
          id: "hpv-vaccine",
          title: "HPV vaccination for girls began in September 2026, one dose, free of charge",
          plain:
            "Papua New Guinea added HPV vaccination to its national immunisation programme on 8 September 2026. Girls aged 9 to 14 receive a single dose, free, starting in the National Capital District and Central Province in November 2026, with about 60,000 girls expected in the first phase.",
          detail:
            "The joint release by WHO and partners says the National Department of Health leads the programme with the Department of Education and the provincial health authorities, supported by the Australian Government, Gavi, WHO and UNICEF, through schools, health facilities and outreach so that girls out of school are reached. It calls cervical cancer the leading cause of cancer death in women, with over 1,000 diagnoses and about 650 deaths a year; IARC's 2024 estimate puts breast cancer deaths in women (656) slightly above cervical (635). WHO's vaccine introduction rows record no HPV introduction up to 2025, and WHO's coverage data held no HPV rows for Papua New Guinea when read on 11 November 2026, so there is no coverage figure yet. The 2015 policy had only proposed exploring the vaccine's feasibility.",
          links: [
            { label: "WHO: Papua New Guinea launches HPV vaccination (8 September 2026)", url: WHO_HPV_LAUNCH },
            { label: "WHO: vaccine introduction rows for Papua New Guinea (API)", url: WHO_INTRO_API },
            { label: "WHO: HPV vaccination coverage rows for Papua New Guinea (API)", url: WHO_HPV_API },
          ],
        },
        {
          id: "no-programme",
          title: "No national cervical screening programme in the published record",
          plain:
            "The 2015 policy promised locally appropriate screening, and named visual inspection with acetic acid for study. A 2022 modelling paper says Papua New Guinea had no national cervical screening programme. OnCo found no later official statement of one.",
          detail:
            "Section 3.2.3 of the National Cancer Control Policy commits to cost-effective, evidence-based screening for the cervix, breast and mouth, to investigating visual inspection with acetic acid (VIA) with or without cryotherapy, and to researching the detection of oral pre-cancer. Nguyen and colleagues, modelling the country in 2022, found VIA neither effective nor cost-effective, and self-collected HPV screen-and-treat cost-effective, preventing an estimated 23,000 to 29,000 deaths over 50 years if it reached 70% coverage from 2023. None of the sources read describes a breast screening programme.",
          links: [
            { label: "National Department of Health: National Cancer Control Policy 2015, section 3.2.3 (PDF)", url: NCCP_2015 },
            { label: "Nguyen et al., modelled HPV screen-and-treat in Papua New Guinea (BMJ Glob Health 2022)", url: NGUYEN_2022 },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and cancer centres",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "One radiotherapy centre, in Lae, with two cobalt-60 machines",
          plain:
            "IAEA's radiotherapy directory lists one centre in Papua New Guinea, the National Cancer Centre at Angau Memorial Hospital in Lae, with two cobalt-60 machines and a brachytherapy unit. Radiotherapy stopped there from 1998 until the centre was revived in 2009. Port Moresby General Hospital gives chemotherapy but not radiotherapy.",
          detail:
            "IAEA DIRAC's public equipment data, read on 11 November 2026, lists for Angau Memorial Hospital's National Cancer Centre two cobalt-60 teletherapy units, no linear accelerator, one remote afterloading brachytherapy unit, one CT scanner, one simulator and one X-ray therapy unit, in an entry last updated in 2024. The 2015 policy says the cobalt-60 machine broke down in 1998 with no cancer specialist available, leaving the country without radiotherapy for about ten years. It cites a WHO guide of one high-energy machine per million people; DIRAC puts the population at about 10.8 million. The policy proposed a second centre with linear accelerators at Port Moresby General Hospital.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "National Department of Health: National Cancer Control Policy 2015, sections 1.2 and 3.2.6 (PDF)", url: NCCP_2015 },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Papua New Guinea does differently",
      cards: [
        {
          id: "test-and-treat",
          title: "Women test themselves for HPV and are treated the same day",
          plain:
            "Papua New Guinea was the setting for what its authors call the first real-world evaluation in a low- or middle-income country of a fully integrated, same-day cervical screening strategy: a woman takes her own sample, gets an HPV result on site, and is treated with thermal ablation in the same visit if needed.",
          detail:
            "In the HPV-STAT trial at two clinics from June 2018 to January 2020, 4,285 women aged 30 to 59 self-collected a vaginal sample for point-of-care GeneXpert testing. 647 (15.1%) tested positive, and 602 of them (93.0%) had thermal ablation the same day. The strategy detected 85.4% of high-grade lesions or worse, acceptability was high and there were no serious adverse events. A 2026 cohort of 404 women living with HIV found the same test missed almost no high-grade disease, and that restricting positives to eight HPV types made it more specific. Neither study is a national programme.",
          links: [
            { label: "Vallely et al., HPV-STAT (Lancet Glob Health 2022)", url: HPV_STAT },
            { label: "Sauk et al., HPV testing in women living with HIV in Papua New Guinea (BMC Glob Public Health 2026)", url: SAUK_2026 },
          ],
        },
        {
          id: "betel",
          title: "A cancer policy that names betel nut alongside tobacco and alcohol",
          plain:
            "Betel nut chewing is common in Papua New Guinea, and mouth cancer is IARC's commonest cancer in men there. The 2015 cancer policy commits to education on the link between betel nut and head and neck cancer, and to policies, laws and taxes to reduce chewing as well as smoking and drinking.",
          detail:
            "The National Cancer Control Policy gives 79% of the population as current betel nut chewers and 44% as current smokers (60% of men, 27% of women), and lists among its prevention strategies education on the risk of chewing betel nut and its direct relation to head and neck cancers, and fiscal and legal measures to reduce betel nut chewing. A 2020 review notes that oral cancer has for decades been identified as the commonest cancer in men in Papua New Guinea, but that its true frequency is unknown, and that oral health was not a priority in the National Health Plan 2011 to 2020.",
          links: [
            { label: "National Department of Health: National Cancer Control Policy 2015, sections 3.1 and 3.2.2 (PDF)", url: NCCP_2015 },
            { label: "Kelwaip et al., oral cancer in Papua New Guinea (Oral Surg Oral Med Oral Pathol Oral Radiol 2020)", url: KELWAIP_2020 },
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
          title: "No trial in OnCo's records has a site in Papua New Guinea",
          plain:
            "None of the cancer trials in OnCo's ClinicalTrials.gov participation data lists Papua New Guinea. The published papers OnCo found are on cervical screening, oral cancer, childhood cancer, breast cancer costs and cancer nursing.",
          detail:
            "OnCo's participation data covers the trials in its graph, not every trial registered; HPV-STAT itself was registered with ISRCTN, not ClinicalTrials.gov. Childhood cancer research has a long history here: a 2005 study found Burkitt lymphoma made up 13% of childhood cancers diagnosed from 1998 to 2003, with a national incidence of 1.7 per 100,000 and 13.4 in Gulf Province. A 2026 paper says cancer nursing was not a recognised speciality in 2021 and traces the founding of a national cancer nurses' group, PaNGONA.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Papua New Guinea", url: CTGOV },
            { label: "Lavu et al., Burkitt lymphoma in Papua New Guinea, 40 years on (Ann Trop Paediatr 2005)", url: LAVU_2005 },
            { label: "Rose et al., cancer nursing in Papua New Guinea 2021 to 2025 (Semin Oncol Nurs 2026)", url: ROSE_2026 },
            { label: "OnCo: endemic Burkitt lymphoma in the malaria belt", url: "/cancers/non-hodgkin-lymphoma/#geography" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "programme-progress",
      title: "No published report on the 2015 cancer policy's progress",
      plain:
        "The 2015 policy promised a costed five-year cancer control plan, a coordination committee, an advisory council and hospital registries in Lae and Port Moresby. OnCo found no published plan, registry report or progress review on the National Department of Health's site.",
      detail:
        "The Department's policies page, read on 11 November 2026, lists the 2015 policy but no later cancer plan. The 2012 IAEA imPACT review the policy cites was not found on the IAEA site, and the UICC member pages for the PNG Cancer Foundation and the PNG National Cancer Centre refused automated requests. Numbers of oncologists, pathologists and radiation therapists in Papua New Guinea were not found in a primary source.",
      links: [
        { label: "National Department of Health: home page", url: NDOH },
        { label: "National Department of Health: National Cancer Control Policy 2015, chapters 4 and 5 (PDF)", url: NCCP_2015 },
      ],
    },
    {
      id: "medicines-list",
      title: "Which cancer medicines are on the national list was not found",
      plain:
        "The Pharmaceutical Services Standards Branch keeps the product specifications in the Medical and Dental Catalogue and advises on which medicines the public sector buys. OnCo could not read the catalogue or the National Medicines Policy 2014, so which cancer medicines the public system supplies is not on this page.",
      detail:
        "The link to the National Medicines Policy 2014 on the Department's pharmaceutical page returned a web page rather than the document on 11 November 2026, and no copy of the Medical and Dental Catalogue was found online. A WHO release of July 2026 on the medical supply system timed out when requested and was not read. WHO's 2020 cancer country profile for Papua New Guinea was not at the address used for other countries.",
      links: [
        { label: "National Department of Health: Pharmaceutical Services Standards Branch", url: PSSB },
        { label: "Medicines and Cosmetics Act 1999 (PDF)", url: MCA_1999 },
      ],
    },
    {
      id: "survival",
      title: "No survival figures and no current screening coverage",
      plain:
        "OnCo found no population-based survival figure for any cancer in Papua New Guinea, and no official count of women screened for cervical cancer. The HPV vaccine's first coverage figures will come from WHO once the 2026 data are reported.",
      detail:
        "Without a working population-based registry there is no national survival estimate. The screen-and-treat studies on this page report on their own participants, at a few clinics, and do not measure national coverage. No programme report from the Department on how many women have been screened was found. The paediatric service's registry has not published counts that OnCo could find.",
      links: [
        { label: "WHO: HPV vaccination coverage rows for Papua New Guinea (API)", url: WHO_HPV_API },
        { label: "Vallely et al., HPV-STAT (Lancet Glob Health 2022)", url: HPV_STAT },
      ],
    },
  ],
  institutions: ["png-national-department-of-health", "angau-national-cancer-centre-png", "port-moresby-general-hospital", "pssb-png", "iaea", "who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-vallely-hpv-stat-png-lancetgh-2022", "paper-nguyen-hpv-screen-treat-png-bmjgh-2022", "paper-kelwaip-oral-cancer-png-oooo-2020",
    "paper-raj-childhood-cancer-png-jogh-2025", "paper-umo-breast-cancer-cost-png-jcpo-2023",
  ],
  people: [],
  how:
    "Every card was written from Papua New Guinea's own policies and laws and from international agencies, read in full rather than through a summary: the National Department of Health's National Cancer Control Policy 2015, its Free Primary Health Care and Subsidized Specialist Services Policy of 2013, its Pharmaceutical Services Standards Branch page and the Medicines and Cosmetics Act 1999; WHO's release on the HPV vaccine launch, its list of regulators at maturity level 3 and 4, and its vaccine and health expenditure rows from its public data APIs; IAEA DIRAC's public equipment data; IARC's GLOBOCAN 2024 fact sheet; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Department, the National Cancer Centre, Port Moresby General Hospital, the regulator and five papers) carry their own sources.",
  verify:
    "National incidence figures for Papua New Guinea are modelled, not counted. Whether radiotherapy in Lae is running, which medicines a hospital has in stock and where the HPV vaccine has reached change faster than any policy or paper; ask the treating hospital, the National Cancer Centre in Lae or the provincial health authority what applies to you.",
  verifyLinks: [
    { label: "National Department of Health", url: NDOH },
    { label: "National Cancer Control Policy 2015 (PDF)", url: NCCP_2015 },
    { label: "Pharmaceutical Services Standards Branch", url: PSSB },
    { label: "WHO Papua New Guinea: HPV vaccination", url: WHO_HPV_LAUNCH },
  ],
};
