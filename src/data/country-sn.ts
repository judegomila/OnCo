import type { CountryDive } from "@/data/country-dive";

/**
 * Senegal deep dive: the hand-written cards for /countries/sn/ (wave 11). French sources were read in French, and every
 * figure was read from the raw text of its source on 11 November 2026, not from a summary of it: IARC's GLOBOCAN 2024
 * fact sheet for Senegal (PDF text), WHO's 2020 cancer country profile for Senegal (PDF text), WHO's HPV coverage rows
 * and Global Health Expenditure Database rows from WHO's public data APIs, the AFCRN membership list, the ARP
 * regulator's pages, the SEN-CSU agency's site (read from its own script bundle, because the page text is built by
 * script), the Ministry of Health's site (under maintenance, so the Internet Archive copy of 31 December 2025), IAEA
 * DIRAC's public equipment data, and the papers' abstracts and one full text through Europe PMC. Where a figure could
 * not be read it is named under `gaps`.
 */
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/686-senegal-fact-sheet.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/sen-2020.pdf";
const AFCRN = "https://afcrn.org/index.php/membership/membership-list";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'SEN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WHO_OOP_API = "https://ghoapi.azureedge.net/api/GHED_OOPSCHE_SHA2011?$filter=SpatialDim%20eq%20'SEN'";
const WHO_CHE_API = "https://ghoapi.azureedge.net/api/GHED_CHEGDP_SHA2011?$filter=SpatialDim%20eq%20'SEN'";
const SEN_CSU = "https://www.agencecmu.sn/";
const ARP_ABOUT = "https://www.arp.sn/a-propos";
const ARP_HOME = "https://www.arp.sn/";
const ARP_FUNCTIONS = "https://www.arp.sn/fonctions-reglementaires";
const MSHP_ARCHIVE = "https://web.archive.org/web/20251231195126/https://www.sante.gouv.sn/";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const WHO_ML_LIST = "https://www.who.int/publications/m/item/list-of-nras-operating-at-ml3-and-ml4";
const GBENONSI = "https://doi.org/10.1186/s12889-024-18937-5";
const CTGOV = "https://clinicaltrials.gov/search?country=Senegal&cond=cancer";

export const SN_DIVE: CountryDive = {
  iso2: "SN",
  iso3: "SEN",
  name: "Senegal",
  flag: "🇸🇳",
  asOf: "2026-11-11",
  title: "Cancer in Senegal",
  description:
    "Cancer in Senegal from Senegalese and international sources: IARC's estimate of 14,358 new cancers and 9,659 deaths in 2024, made without Senegalese incidence data, cervical and breast cancer the commonest and liver cancer the deadliest, free chemotherapy since 2019, the ARP regulator, four radiotherapy machines in three centres, and first-dose HPV vaccination of girls reaching 69%.",
  lede:
    "Senegal has no population-based cancer registry that IARC can use, so its national figures are estimates borrowed from neighbouring countries: 14,358 new cancers and 9,659 deaths in 2024. Cervical and breast cancer are the commonest, and liver cancer, mostly following hepatitis B, causes the most deaths. Since 2019 the state has paid for chemotherapy, first for breast and cervical cancer and from 2022 for all anticancer medicines.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Senegal is 14,358 new cancers (5,688 in men, 8,670 in women) and 9,659 deaths, an age-standardised incidence of 121.1 per 100,000 (101.7 in men, 140.6 in women) and mortality of 84.9. The fact sheet names no country-specific incidence source: incidence rates are based on estimates or registry data from neighbouring countries. Mortality is then derived from those incidence estimates using model-based mortality-to-incidence ratios from registry survival data (the fact sheet names SURVCAN as the source). So neither figure is counted in Senegal, and WHO's 2020 profile notes that Senegal had no coverage by mortality registration in 2007 to 2016. IARC counts 154 non-melanoma skin cancers among the 14,358 (14,204 excluding them).",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Senegal",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Senegal (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 14,000 new cancers a year, most of them in women",
          plain:
            "IARC estimates 14,358 new cancers in Senegal in 2024, 8,670 of them in women and 5,688 in men, and 9,659 cancer deaths. Cervical cancer is the commonest cancer, then breast and liver cancer. Six in ten new cancers are in women, because cervical and breast cancer together make up over half of women's cancers.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 2,280 cervical cancers (1,362 deaths), 2,220 breast cancers (1,041 deaths), 1,926 liver cancers (1,705 deaths), 1,073 prostate cancers (656 deaths) and 641 colorectal cancers (361 deaths). Cervical cancer is 26.3% of cancers in women and breast cancer 25.6%. In men the order is liver (21.7%), prostate (18.9%), stomach, colorectum and lung. The risk of developing a cancer before age 75 is 10.7% for men and 14.3% for women, and an estimated 25,818 people are living within five years of a diagnosis. These figures are estimates built from other countries' data; see the note under the table below.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Senegal (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "liver",
          title: "Liver cancer causes the most cancer deaths, and mostly follows hepatitis B",
          plain:
            "Liver cancer is the commonest cancer in Senegalese men and the leading cause of cancer death overall, with 1,705 deaths in 2024 against 1,926 new cases. In West Africa it mostly follows long-term hepatitis B infection, and a Dakar study showed that regular ultrasound checks for people with hepatitis B can be run there.",
          detail:
            "The SEN-B cohort at Fann University Hospital in Dakar enrolled 758 people with hepatitis B who had not been treated, between October 2019 and October 2022, and offered abdominal ultrasound every six months. 755 had at least one scan; their median age was 31. Three liver cancers were found at entry and one more in 809.5 person-years, an incidence of 1.24 per 1,000 person-years. 93.0% kept optimal surveillance, falling to 77.8% of those followed for 24 months. The authors call hepatitis B the predominant cause of liver cancer in West Africa and say longer follow-up is needed before tailored screening advice can be set.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Senegal (PDF)", url: IARC_FACTSHEET },
            { label: "Ramírez Mena et al., SEN-B liver cancer surveillance (Lancet Gastroenterol Hepatol 2024)", url: "https://doi.org/10.1016/s2468-1253(24)00040-2" },
          ],
        },
        {
          id: "no-registry",
          title: "No population-based registry, and only a hospital registry for children",
          plain:
            "Senegal has no cancer registry whose figures IARC uses, and no Senegalese registry is on the African Cancer Registry Network's current member list. For children, a hospital registry at Le Dantec Hospital in Dakar recorded 568 cancers in 2017 to 2019, and researchers have tested whether a population registry for the Dakar region is possible.",
          detail:
            "WHO's 2020 cancer country profile records no information on a population-based registry and warns that Senegal's incidence and mortality estimates carry a high degree of uncertainty because they rest on neither a population registry nor national mortality data. The AFCRN membership list, read on 11 November 2026, has 35 registries and none in Senegal. The paediatric oncology unit at Le Dantec Hospital keeps a hospital-based registry that takes children from all of Senegal: 568 cancers in children under 18 from 2017 to 2019, 133 of them in Dakar residents. A search of other Dakar hospitals found 283 more cases, 149 without a recorded home address, and an estimated incidence of 33 per million person-years, which the GFAOP authors judge too low to be complete.",
          links: [
            { label: "WHO: cancer country profile 2020, Senegal (PDF)", url: WHO_PROFILE },
            { label: "AFCRN: current membership list", url: AFCRN },
            { label: "Mallon et al., towards a childhood cancer registry for Dakar (EJC Paediatr Oncol 2025)", url: "https://doi.org/10.1016/j.ejcped.2025.100420" },
          ],
        },
      ],
      tables: [
        {
          id: "sn-top",
          title: "IARC's leading cancers for Senegal, 2024",
          caption: "New cases and deaths in 2024, both sexes, from the GLOBOCAN 2024 fact sheet. Estimates, not registry counts.",
          columns: [
            { key: "site", label: "Cancer" },
            { key: "cases", label: "New cases", numeric: true },
            { key: "deaths", label: "Deaths", numeric: true },
          ],
          rows: [
            { site: "Cervix uteri", cases: 2280, deaths: 1362 },
            { site: "Breast", cases: 2220, deaths: 1041 },
            { site: "Liver", cases: 1926, deaths: 1705 },
            { site: "Prostate", cases: 1073, deaths: 656 },
            { site: "Colorectum", cases: 641, deaths: 361 },
            { site: "Stomach", cases: 638, deaths: 533 },
            { site: "Lung", cases: 437, deaths: 406 },
            { site: "All cancers", cases: 14358, deaths: 9659 },
          ],
          note: "IARC lists no Senegalese incidence data: rates come from neighbouring countries' estimates or registries, and deaths are derived from those using mortality-to-incidence ratios. This is the table a Senegalese registry would replace.",
          sources: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Senegal (PDF)", url: IARC_FACTSHEET }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for cancer care",
      aside: { label: "SEN-CSU: universal health coverage agency", url: SEN_CSU },
      cards: [
        {
          id: "coverage",
          title: "Mutual health schemes, targeted free care, and 44% paid out of pocket",
          plain:
            "Senegal's universal health coverage agency, SEN-CSU, runs community health insurance through local mutual schemes and free-care schemes for young children, caesarean sections, dialysis and older people. Out-of-pocket payment is 44% of what the country spends on health, and studies find the subsidised schemes do little to protect the poorest households.",
          detail:
            "The agency's site, read on 11 November 2026, dates its origin to a 2015 decree creating the Agence de la Couverture Maladie Universelle and its present form, SEN-CSU, to 2024. It lists communal mutual health schemes and free-care schemes for children aged 0 to 5, caesarean section, dialysis, Plan Sésame for older people, households in the national family security grants programme (PNBSF) and holders of the Carte d'égalité des chances; OnCo did not find cancer among them. WHO's Global Health Expenditure Database puts out-of-pocket spending at 44.3% of current health expenditure in 2023 (47.2% in 2022) and total health spending at 4.3% of GDP. A 2019 survey in three regions found community insurance protected non-poor members against catastrophic spending but not the poor.",
          links: [
            { label: "SEN-CSU: agency site", url: SEN_CSU },
            { label: "WHO Global Health Expenditure Database: out-of-pocket share, Senegal (API)", url: WHO_OOP_API },
            { label: "WHO Global Health Expenditure Database: health spending as share of GDP, Senegal (API)", url: WHO_CHE_API },
            { label: "Ly et al., community health insurance and the poor in Senegal (BMJ Open 2022)", url: "https://doi.org/10.1136/bmjopen-2022-063035" },
          ],
        },
        {
          id: "free-chemotherapy",
          title: "Free chemotherapy, first for breast and cervical cancer, then for all cancers",
          plain:
            "A peer-reviewed review reports that Senegal made chemotherapy free in 2019 for all women with cervical or breast cancer and, three years later, extended this to all anticancer treatments. A 2019 account of medical oncology in Senegal had called for a large subsidy of anticancer drugs.",
          detail:
            "Gbenonsi, Martini and Mahieu's 2024 review of breast cancer policy in sub-Saharan Africa gives Senegal as its example that access to cancer care for all is possible in a resource-limited country: free chemotherapy in 2019 for women with cervical and breast cancer, extended three years later to all anticancer treatments, with civil society groups credited for helping bring in the measure. Their sources are a news report and the Ministry of Health's site; OnCo could not read the government text itself (see the gaps). Diop's 2019 account says chemotherapy was given at several public and private sites in Dakar by general practitioners and oncology surgeons, and called for subsidy of anticancer drugs, especially targeted ones, and their central management. What the policy leaves to the patient, such as surgery, radiotherapy and tests, was not found in a primary source.",
          links: [
            { label: "Gbenonsi et al., breast cancer public policies in sub-Saharan Africa (BMC Public Health 2024)", url: GBENONSI },
            { label: "Diop, the state of medical oncology in Senegal (ecancermedicalscience 2019)", url: "https://doi.org/10.3332/ecancer.2019.941" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator and how medicines are approved",
      aside: { label: "ARP: about the agency", url: ARP_ABOUT },
      cards: [
        {
          id: "arp",
          title: "ARP, a regulator created in 2022 that WHO lists at maturity level 3",
          plain:
            "Medicines in Senegal are authorised by the Agence sénégalaise de Réglementation pharmaceutique (ARP), created by decree in April 2022. It also licenses pharmaceutical establishments, oversees clinical trials and collects reports of side effects. WHO lists it at maturity level 3 for medicines and for vaccines, announced in 2024, and its own site says Senegal is the first French-speaking African country to reach that level.",
          detail:
            "Decree 2022-824 of 7 April 2022 created ARP and set its rules. Its mission covers pharmacy, medicines and other health products, pharmaceutical establishments, medical laboratories and clinical trials. It sets out its work against WHO's Global Benchmarking Tool: marketing authorisation, vigilance, market surveillance and control, licensing, inspection, laboratory testing, clinical trial oversight, lot release for vaccines, and approval and oversight of blood products. WHO's list of regulators at maturity levels 3 and 4, dated August 2026, lists ARP at maturity level 3 for medicines and for vaccines (non-producing), with the year of announcement 2024. The claim that Senegal is the first in French-speaking Africa to reach that level is ARP's own, from the banner on its site read on 11 November 2026; WHO's list does not rank countries. Patients and health workers can report a side effect or a quality defect through the Med Safety app or ARP's online form.",
          links: [
            { label: "ARP: about the agency, decree 2022-824 and missions", url: ARP_ABOUT },
            { label: "ARP: regulatory functions", url: ARP_FUNCTIONS },
            { label: "ARP: home page and maturity level 3 notice", url: ARP_HOME },
            { label: "WHO: regulatory authorities at maturity levels 3 and 4 (PDF, August 2026)", url: WHO_ML_LIST },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Senegal (API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination of 9-year-old girls since 2018, with first-dose coverage of 69%",
          plain:
            "Senegal added the HPV vaccine to its routine schedule in 2018 for 9-year-old girls, through health centres, schools and outreach. WHO's figures show first-dose coverage of 90% in 2019, a fall to 48% in 2020, and a climb back to 69% in 2025. WHO gives no coverage figures for boys.",
          detail:
            "WHO's immunisation coverage rows for Senegal give first-dose HPV coverage for girls of 90% in 2019, 48% in 2020, 67% in 2021, 50% in 2022, 58% in 2023, 66% in 2024 and 69% in 2025. Coverage of the last dose in the schedule rose from 26% in 2019 to 51% in 2024 and 60% in 2025. A review of the introduction says school-based demonstrations ran from 2014 to 2016, that the global vaccine shortage limited the start to one age group, and that a health worker strike, rumours and hesitancy held it back. A costing study counted 375,608 doses given and a financial cost of US$7.75 a dose.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Senegal (public API)", url: WHO_HPV_API },
            { label: "Casey et al., HPV vaccine introduction in Senegal (Vaccine 2022)", url: "https://doi.org/10.1016/j.vaccine.2021.08.042" },
            { label: "Brennan et al., cost of HPV vaccine delivery in Senegal (Vaccine 2022)", url: "https://doi.org/10.1016/j.vaccine.2021.11.057" },
          ],
        },
        {
          id: "cervical-screening",
          title: "About one woman in ten has ever been screened for cervical cancer",
          plain:
            "In the 2023 national health survey, 9.5% of women of reproductive age said they had been screened for cervical cancer, from 2.4% in Matam to 14.6% in Thiès. WHO recorded screening in 2019 as opportunistic, by visual inspection, rather than an organised programme.",
          detail:
            "Adam and Sougou analysed a weighted sample of 16,583 women in Senegal's 2023 Continuous Demographic and Health Survey: 9.5% (95% CI 8.67 to 10.41) had been screened, against WHO's aim of 70%. Women aged 30 to 49, married women, wealthier women, those with health insurance and those who had visited a health facility were more likely to have been screened. WHO's 2020 profile records cervical screening as opportunistic, using visual inspection, with participation of 10 to 50%, and an early detection programme and referral system in place; it also records a breast cancer screening programme. Researchers are testing patient navigation by community health workers in Dakar and Kédougou.",
          links: [
            { label: "Adam and Sougou, cervical screening in Senegal from the 2023 DHS (BMC Public Health 2025)", url: "https://doi.org/10.1186/s12889-025-23900-z" },
            { label: "WHO: cancer country profile 2020, Senegal (PDF)", url: WHO_PROFILE },
            { label: "Dykens et al., patient navigation for cervical screening in Senegal (Int J Womens Health 2025)", url: "https://doi.org/10.2147/ijwh.s515070" },
          ],
        },
      ],
    },
    {
      id: "capacity",
      nav: "Capacity",
      title: "Radiotherapy and the cancer workforce",
      aside: { label: "IAEA DIRAC: radiotherapy equipment by centre", url: DIRAC },
      cards: [
        {
          id: "radiotherapy",
          title: "Four radiotherapy machines in three centres, two in Dakar and one in Touba",
          plain:
            "IAEA's radiotherapy directory lists three centres in Senegal with four linear accelerators between them: two at Dalal Jamm Hospital in Dakar, one at the Centre International de Cancérologie de Dakar and one at the national hospital in Touba. That is roughly one machine for every 4.7 million people.",
          detail:
            "IAEA DIRAC's public equipment data, read on 11 November 2026, lists Dalal Jamm Hospital in Dakar (2 linear accelerators and brachytherapy, entry last updated 2019), the Centre International de Cancérologie de Dakar, K.G. Oncologie (1, updated 2023) and the Centre Hospitalier National Cheikh Ahmadoul Khadim in Touba (1, updated 2026), with one CT simulator. DIRAC's population figure for Senegal is about 18.9 million. Because the Dalal Jamm entry dates from 2019, the current count may differ. A team in Dakar has published results of volumetric modulated arc therapy for rectal cancer in 59 patients.",
          links: [
            { label: "IAEA DIRAC: radiotherapy equipment by centre (read 11 November 2026)", url: DIRAC },
            { label: "Ka et al., VMAT for rectal cancer in Senegal (Pan Afr Med J 2026)", url: "https://doi.org/10.11604/pamj.2026.53.107.47465" },
          ],
        },
        {
          id: "workforce",
          title: "In 2019 the country had one medical oncologist",
          plain:
            "A 2019 account of medical oncology in Senegal said the country had only one specialist in medical oncology, at the Cancer Institute, and that general practitioners and cancer surgeons gave chemotherapy in Dakar. WHO's 2020 profile found pathology generally available but bone marrow transplant and home-based palliative care generally not.",
          detail:
            "Diop's 2019 paper calls for fellowships to train new doctors fully in medical oncology, training for experienced general practitioners and chemotherapy in nurses' curricula. WHO's 2020 cancer country profile gives, per 10,000 cancer patients, 2.8 external-beam radiotherapy machines, 1.9 medical physicists, 47.4 radiologists, 2.8 nuclear medicine physicians and 36.0 surgeons (2011), and 0 PET scanners. It records opioid availability for pain of 22 defined daily doses per million people a day in 2015 to 2017, and bone marrow transplant as generally not available; Senegal's first autologous transplant followed in February 2025. A current count of oncologists was not found.",
          links: [
            { label: "Diop, the state of medical oncology in Senegal (ecancermedicalscience 2019)", url: "https://doi.org/10.3332/ecancer.2019.941" },
            { label: "WHO: cancer country profile 2020, Senegal (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "Doing",
      title: "What Senegal does differently",
      aside: { label: "Gbenonsi et al., breast cancer policies in sub-Saharan Africa (2024)", url: GBENONSI },
      cards: [
        {
          id: "transplant-and-children",
          title: "Building services that were missing: a first stem cell transplant and a childhood cancer plan",
          plain:
            "Beyond paying for chemotherapy, Senegal has started services it did not have. Doctors at Dalal Jamm performed the country's first autologous stem cell transplant in February 2025, and in 2021 Senegal launched WHO's CureAll programme for childhood cancer, which brought a second children's cancer centre.",
          detail:
            "The Dalal Jamm team transplanted a 51-year-old man with high-risk myeloma using his own stem cells, kept at 4°C for 24 hours instead of frozen, after high-dose melphalan; he left hospital on day 17 and was in complete remission at five months. The authors call it the first transplant programme in French-speaking sub-Saharan Africa and say freezing and molecular testing are needed next. A 2025 paper on WHO's Global Initiative for Childhood Cancer says that in Senegal, where childhood cancer had been neither structured nor prioritised, the CureAll launch in 2021 brought a national situational analysis, an action plan on early diagnosis, quality of care and research, and a second treatment centre. WHO's 2020 profile estimated 942 cancers a year in children aged 0 to 14.",
          links: [
            { label: "Niang et al., first autologous stem cell transplant in Senegal (ecancermedicalscience 2026)", url: "https://doi.org/10.3332/ecancer.2026.2100" },
            { label: "Hessissen et al., WHO childhood cancer initiative in Morocco and Senegal (Bull Cancer 2025)", url: "https://doi.org/10.1016/j.bulcan.2025.11.007" },
            { label: "WHO: cancer country profile 2020, Senegal (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer trials with a site in Senegal", url: CTGOV },
      cards: [
        {
          id: "trials-and-studies",
          title: "No ClinicalTrials.gov cancer trials in OnCo's data, but local studies",
          plain:
            "OnCo's ClinicalTrials.gov participation data has no cancer trial with a site in Senegal. Research still happens: a French and Senegalese study treated lymphoma in Dakar with standard R-CHOP, and Senegalese women were part of the study that found triple-negative breast cancer common in West Africa.",
          detail:
            "The LYMPHODAK pilot, registered nationally as SEN18/11, used Senegalese pathology with remote review in France to diagnose 31 diffuse large B-cell lymphomas among 70 biopsies, and treated 30 patients with six cycles of R-CHOP between July 2018 and May 2022: 73% responded, 57% completely, and 24-month overall survival was 80%. Huo and colleagues' 2009 study of 507 women with breast cancer in Nigeria and Senegal found triple-negative tumours predominant, basal-like in 27% and unclassified in 28%, with a mean age of 44.8 in the first cohort; OnCo's triple-negative breast cancer page cites it. The SEN-B hepatitis B cohort at Fann hospital is described in the profile above.",
          links: [
            { label: "Diop et al., the LYMPHODAK study (EJHaem 2025)", url: "https://doi.org/10.1002/jha2.70133" },
            { label: "Huo et al., triple-negative breast cancer in West African women (J Clin Oncol 2009)", url: "https://doi.org/10.1200/jco.2008.19.6873" },
            { label: "OnCo: triple-negative breast cancer", url: "/cancers/tnbc/" },
            { label: "ClinicalTrials.gov: cancer trials with a site in Senegal", url: CTGOV },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "free-care-text",
      title: "The government text of the free chemotherapy policy was not read",
      plain:
        "OnCo could not read the decree or ministry notice behind Senegal's free chemotherapy policy. The Ministry of Health's site was under maintenance, and the coverage agency's site does not list cancer, so which medicines and hospitals are covered comes from a review, not the source.",
      detail:
        "The live sante.gouv.sn site showed a maintenance page on 11 November 2026, and its Internet Archive copy of 31 December 2025 showed no cancer programme page. The 2019 and 2022 dates come from a peer-reviewed review that cites a news report and the ministry's site. That news report (AlloDocteurs Africa, a press report, not a government text) quotes a Ministry of Health communiqué saying anticancer medicines are free in all facilities that give chemotherapy, and names hospitals mostly in the Dakar region plus the regional hospitals of Thiès and Fatick; OnCo has not read the communiqué itself. What the policy leaves to patients (surgery, radiotherapy, imaging, pathology), which hospitals give free chemotherapy outside Dakar, and whether targeted and immunotherapy drugs are included were not found in a primary source. A national essential medicines list was not read.",
      links: [
        { label: "Ministry of Health (Internet Archive copy, 31 December 2025)", url: MSHP_ARCHIVE },
        { label: "Gbenonsi et al., breast cancer public policies in sub-Saharan Africa (BMC Public Health 2024)", url: GBENONSI },
      ],
    },
    {
      id: "who-ml3",
      title: "How ARP's maturity level 3 rating applies to cancer medicines was not found",
      plain:
        "WHO's own list confirms ARP at maturity level 3 for medicines and vaccines, announced in 2024, but how long ARP takes to authorise a cancer medicine, and whether Senegal relies on a regional approval route, were not found.",
      detail:
        "WHO's list of regulatory authorities at maturity levels 3 and 4, dated August 2026 and read as PDF text on 11 November 2026, gives ARP maturity level 3 for medicines and vaccines (non-producing) and 2024 as the year of announcement; WHO's announcement for Senegal itself was not read, so the exact date is not given here. Whether Senegal takes part in a regional approval route, such as the African Medicines Agency or the West African harmonisation work, and how long ARP takes to authorise a cancer medicine, were also not found in a primary source.",
      links: [
        { label: "ARP: home page and maturity level 3 notice", url: ARP_HOME },
        { label: "WHO: regulatory authorities at maturity levels 3 and 4 (PDF, August 2026)", url: WHO_ML_LIST },
        { label: "ARP: regulatory functions", url: ARP_FUNCTIONS },
      ],
    },
    {
      id: "centres-and-groups",
      title: "No primary source read for the cancer institute, LISCA or a national cancer plan",
      plain:
        "The Joliot-Curie cancer institute at Aristide Le Dantec Hospital and the patient groups LISCA and AFEC have no records here yet, because OnCo could not read a primary source for them.",
      detail:
        "UICC's member pages for the Ligue Sénégalaise Contre le Cancer (LISCA) and ONG Action Femme et Enfant contre le Cancer (AFEC) refused OnCo's requests and no archived copy was found, so their membership is not confirmed here. The Joliot-Curie Institute at Aristide Le Dantec Hospital is named in published studies, such as a 2022 study of the direct medical costs of breast cancer treatment there, but no institutional page was read, and the hospital's current status was not checked. The text of Senegal's national cancer control plan, recorded as operational by WHO in 2019, was not found, and an IAEA imPACT review of Senegal was not checked.",
      links: [
        { label: "WHO: cancer country profile 2020, Senegal (PDF)", url: WHO_PROFILE },
        { label: "Direct medical costs of breast cancer treatment at the Joliot Curie Institute, Dakar (Pan Afr Med J 2022)", url: "https://doi.org/10.11604/pamj.2022.42.266.32967" },
      ],
    },
  ],
  institutions: ["senegal-ministry-of-health", "sen-csu-senegal", "arp-senegal", "dalal-jamm-hospital", "iaea", "who", "iarc"],
  companies: [],
  drugs: [],
  trials: [],
  papers: [
    "paper-mallon-dakar-childhood-cancer-registry-ejcpo-2025", "paper-diop-medical-oncology-senegal-ecancer-2019",
    "paper-casey-hpv-introduction-senegal-vaccine-2022", "paper-ramirez-mena-sen-b-hcc-surveillance-lgh-2024",
  ],
  people: [],
  how:
    "Every card was written from Senegalese official sources, international agencies and peer-reviewed papers, read in full rather than through a summary: IARC's GLOBOCAN 2024 fact sheet; WHO's 2020 cancer country profile; WHO's HPV coverage and health expenditure rows from its public data APIs; the AFCRN membership list; ARP's pages; the SEN-CSU agency's site; the Ministry of Health's site through the Internet Archive; IAEA DIRAC's public equipment data; and the papers through Europe PMC. Trials were counted from OnCo's ClinicalTrials.gov participation data. The new records added for this page (the Ministry, SEN-CSU, ARP, Dalal Jamm hospital and four papers) carry their own sources.",
  verify:
    "National cancer figures for Senegal are estimates borrowed from other countries, not counts. Which medicines are free, which hospital gives chemotherapy or radiotherapy and how long the wait is change faster than published reports; ask the treating hospital's oncology service, your mutual health scheme or SEN-CSU what applies to you.",
  verifyLinks: [
    { label: "Ministère de la Santé et de l'Hygiène publique", url: "https://www.sante.gouv.sn/" },
    { label: "SEN-CSU: universal health coverage agency", url: SEN_CSU },
    { label: "ARP: medicines regulator", url: ARP_HOME },
  ],
};
