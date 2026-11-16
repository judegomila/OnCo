import type { CountryDive } from "@/data/country-dive";

/**
 * Panama deep dive: the hand-written cards for /countries/pa/ (wave 12). Every figure was read from the raw text of its
 * source on 11 November 2026, not from a summary of it, in Spanish where the source is Spanish: the Instituto Oncológico
 * Nacional's (ION) hospital cancer registry bulletin for 2024 (PDF text), its registry, history and admission pages and
 * its home page figures for 2023; WHO's Cancer Country Profile 2020 for Panama (PDF text); WHO's HPV coverage rows from
 * its public immunisation data API; the World Bank's out-of-pocket series; and IARC's GLOBOCAN 2024 fact sheet for
 * Panama. Where a figure could not be read it is named under `gaps`.
 */
const ION_HOME = "https://ion.gob.pa/";
const ION_HISTORY = "https://ion.gob.pa/?page_id=395";
const ION_INSURED = "https://ion.gob.pa/?page_id=493";
const ION_UNINSURED = "https://ion.gob.pa/?page_id=495";
const ION_RHC = "https://ion.gob.pa/?page_id=556";
const ION_BULLETIN_2024 = "https://ion.gob.pa/wp-content/uploads/2025/07/BOLETIN-2024-FINAL.pdf";
const WHO_PROFILE = "https://cdn.who.int/media/docs/default-source/country-profiles/cancer/pan-2020.pdf";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/591-panama-fact-sheet.pdf";
const WHO_HPV_API = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'PAN'%20and%20startswith(ANTIGEN,'PRHPV')";
const WB_OOP = "https://data.worldbank.org/indicator/SH.XPD.OOPC.CH.ZS?locations=PA";
const CTGOV = "https://clinicaltrials.gov/search?country=Panama&cond=cancer";

export const PA_DIVE: CountryDive = {
  iso2: "PA",
  iso3: "PAN",
  name: "Panama",
  flag: "🇵🇦",
  asOf: "2026-11-11",
  title: "Cancer in Panama",
  description:
    "Cancer in Panama from Panamanian sources: IARC's estimate of 9,417 new cancers and 3,971 deaths in 2024, the Instituto Oncológico Nacional's hospital registry of 5,273 patients in 2024, referrals from the Caja de Seguro Social and the Ministry of Health, out-of-pocket spending at 40.5% of health spending, HPV vaccination of girls and boys, and 19 trials in OnCo's records with a site in Panama.",
  lede:
    "Panama's public cancer care is centred on one national institute in Panama City, the Instituto Oncológico Nacional, which saw 5,273 cancer patients in 2024, nearly half of them referred by the social security fund. IARC estimates about 9,400 new cancers a year in the country, with prostate and breast cancer the commonest.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Panama is 9,417 new cancers and 3,971 deaths, an age-standardised incidence of 158.2 per 100,000 (166.1 in men, 159.3 in women). IARC's fact sheet gives the country-specific source for incidence as \"no data\", with national mortality estimates applied to modelled mortality-to-incidence ratios; mortality comes from WHO's national data, projected to 2024. In other words, IARC worked backwards from deaths. The Instituto Oncológico Nacional's registry counts the patients that one hospital sees, about 5,300 a year, so it is a floor, not a national count. OnCo did not read a report from Panama's national population-based registry; see the gaps.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Panama",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Panama (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 9,400 new cancers a year; prostate cancer is the commonest",
          plain:
            "IARC estimates 9,417 new cancers in Panama in 2024 and 3,971 cancer deaths. Prostate cancer is the commonest cancer, then breast, colorectal, stomach and thyroid cancer. Colorectal cancer causes the most cancer deaths.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 1,780 prostate cancers (411 deaths), 1,118 breast cancers (330 deaths), 851 colorectal cancers (418 deaths), 621 stomach cancers (390 deaths) and 618 thyroid cancers (44 deaths). Men and women have nearly equal numbers of cases, 4,694 and 4,723. The risk of developing a cancer before age 75 is 14.2%, and an estimated 28,553 people are living within five years of a diagnosis.",
          links: [{ label: "IARC: GLOBOCAN 2024 fact sheet, Panama (PDF)", url: IARC_FACTSHEET }],
        },
        {
          id: "ion-registry",
          title: "The national institute's registry: 5,273 patients in 2024, breast cancer first",
          plain:
            "The Instituto Oncológico Nacional has kept a hospital cancer registry since 1 January 2012. It recorded 5,273 cancers diagnosed or treated at the institute in 2024, 61% of them in women; breast cancer was 22% of the total, followed by prostate, colon, cervical and stomach cancer.",
          detail:
            "The registry's 2024 bulletin counts 5,273 cases (3,229 women, 2,044 men), up from 3,171 in 2012, with a dip to 3,758 in 2020; it holds more than 55,935 cases in all. The ten commonest sites in 2024 were breast (1,142), prostate (574), colon (409), cervix (372), stomach (306), skin (252), uterine body (243), thyroid (214), lung (166) and rectum (163). 91.8% were confirmed by histology of the primary tumour. The bulletin says more than 5,000 cases are referred to the institute a year, more than 90% of them new, mostly from the provinces of Panamá and Panamá Oeste, and that many provinces have diagnosis but lack specialised treatment. Deaths are traced through the national statistics institute (INEC), the Comptroller General and the Electoral Tribunal. The registry does not yet record stage at diagnosis.",
          links: [
            { label: "ION: hospital cancer registry bulletin 2024 (PDF, in Spanish)", url: ION_BULLETIN_2024 },
            { label: "ION: hospital cancer registry (RHC-ION)", url: ION_RHC },
          ],
        },
      ],
      tables: [
        {
          id: "pa-ion-registry",
          title: "Cancers recorded by the Instituto Oncológico Nacional's hospital registry",
          caption: "Cases diagnosed or treated at the institute per year, from table 16 of the 2024 bulletin.",
          columns: [
            { key: "year", label: "Year" },
            { key: "cases", label: "Cases", numeric: true },
          ],
          rows: [
            { year: "2012", cases: 3171 },
            { year: "2016", cases: 3749 },
            { year: "2019", cases: 4576 },
            { year: "2020", cases: 3758 },
            { year: "2022", cases: 5176 },
            { year: "2023", cases: 5088 },
            { year: "2024", cases: 5273 },
          ],
          note: "A hospital registry counts the patients one institution sees, not every cancer in the country, so a rise can mean more referrals as well as more cancer.",
          sources: [{ label: "ION: hospital cancer registry bulletin 2024, table 16 (PDF)", url: ION_BULLETIN_2024 }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Paying",
      title: "Paying for care: social security, the Ministry of Health and the national institute",
      aside: { label: "ION: admission rules for insured patients", url: ION_INSURED },
      cards: [
        {
          id: "referral-routes",
          title: "Half of the institute's patients come through the Caja de Seguro Social",
          plain:
            "Patients reach the Instituto Oncológico Nacional by referral from the social security fund, the Caja de Seguro Social, from the Ministry of Health or from private care. In 2024, 48% of the cases it registered were referred by the social security fund, 30% by the Ministry of Health and 22% by private hospitals and clinics.",
          detail:
            "The 2024 registry bulletin gives the referral sources as the Caja de Seguro Social (2,552 cases, 48%), the Ministry of Health (1,552, 30%) and private hospitals and clinics (1,169, 22%); the largest single referrer was the Caja's Complejo Hospitalario Dr. Arnulfo A. Madrid with 1,219 cases. The institute's admission rules ask insured patients for an authorisation form issued by the Caja de Seguro Social and signed by the director of the Hospital de Cancerología de la Ciudad Salud, and uninsured patients for a referral and their pathology report; foreigners need a passport and a valid immigration permit. The World Bank's series, from WHO's health expenditure database, puts out-of-pocket spending at 40.5% of current health spending in 2023, across all care.",
          links: [
            { label: "ION: hospital cancer registry bulletin 2024, graph 3 and table 7 (PDF)", url: ION_BULLETIN_2024 },
            { label: "ION: admission rules for insured patients", url: ION_INSURED },
            { label: "ION: admission rules for uninsured patients", url: ION_UNINSURED },
            { label: "World Bank: out-of-pocket expenditure, % of current health expenditure, Panama", url: WB_OOP },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator",
      cards: [
        {
          id: "regulator-gap",
          title: "OnCo has not yet read Panama's medicines regulator",
          plain:
            "OnCo did not read the rules of Panama's medicines regulator for registering cancer medicines or authorising trials for this page, so it states nothing about who approves what, or how fast.",
          detail:
            "This card is a placeholder for a source OnCo has not yet read, not a description of how the regulator works. The institute's own medicines committee and its published list of research topics appear on its website. For the trials OnCo does hold with a site in Panama, see the research section below.",
          links: [
            { label: "Ministry of Health of Panama", url: "https://www.minsa.gob.pa/" },
            { label: "ION: home page", url: ION_HOME },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and vaccination",
      aside: { label: "WHO: HPV vaccination coverage rows for Panama (data API)", url: WHO_HPV_API },
      cards: [
        {
          id: "hpv",
          title: "HPV vaccination for girls and boys: 81% of girls had a first dose in 2025",
          plain:
            "Panama vaccinates both girls and boys against HPV. WHO's figures for 2025 give 81% of girls a first dose and 70% the last dose, and 73% of boys a first dose. WHO's 2020 profile recorded cervical screening by Pap smear, offered opportunistically rather than by invitation, and a breast screening programme.",
          detail:
            "WHO's immunisation data give HPV programme coverage among females of 85% (first dose) and 71% (last dose) in 2023, 80% and 64% in 2024, and 81% and 70% in 2025, and first-dose coverage among males of 73% in 2025. WHO's Cancer Country Profile 2020 recorded an operational national cancer control plan, cervical screening by Pap smear on an opportunistic basis, a breast cancer screening programme and HPV programme coverage of 68.5% in 2018. In the institute's 2024 registry cervical cancer was still the fourth commonest cancer, with 372 cases.",
          links: [
            { label: "WHO: HPV vaccination coverage rows for Panama (data API)", url: WHO_HPV_API },
            { label: "WHO: Cancer Country Profile 2020, Panama (PDF)", url: WHO_PROFILE },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What differs",
      title: "What Panama does differently",
      cards: [
        {
          id: "one-institute",
          title: "One national institute since 1936, in the old Gorgas Hospital since 1999",
          plain:
            "Panama's cancer care grew from a radiology institute founded in 1936 into the Instituto Oncológico Nacional, created by Law 11 of 4 July 1984. In 1999 it moved into the buildings of the former Gorgas Hospital in Ancón. In 2023 it saw 4,934 new patients and gave 155,883 consultations.",
          detail:
            "The institute's history page traces it to the Instituto Radiológico Nacional, founded in 1936 under President Juan Demóstenes Arosemena with treatment given at the Santo Tomás and Panamá hospitals; its own building opened on 18 September 1940 with four doctors, three nurses and forty beds. The history records a cobalt-60 unit added in the period it dates to 1965. Law 11 created the Instituto Oncológico Nacional on 4 July 1984. By Cabinet Resolution 44 of 3 June 1999 the Autoridad de la Región Interoceánica transferred the former Gorgas Hospital, buildings 242 and 254, and the move began on 23 July 1999. Its home page reports 4,934 new patients and 155,883 consultations in 2023. Its registry bulletin notes that many provinces have access to diagnosis but lack some specialised cancer treatment.",
          links: [
            { label: "ION: historical review (Reseña histórica)", url: ION_HISTORY },
            { label: "ION: home page, figures for 2023", url: ION_HOME },
            { label: "ION: hospital cancer registry bulletin 2024, conclusions (PDF)", url: ION_BULLETIN_2024 },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      aside: { label: "ClinicalTrials.gov: cancer studies with sites in Panama", url: CTGOV },
      cards: [
        {
          id: "trial-count",
          title: "19 trials in OnCo's records list a site in Panama",
          plain:
            "Nineteen trials in OnCo's records include Panama among their countries, 12 of them phase 3. Roche and GlaxoSmithKline sponsor most of them, and four were recruiting when the registry was last read.",
          detail:
            "Counted from ClinicalTrials.gov participation data in OnCo's graph on 11 November 2026: 19 trials list Panama, 12 phase 3, 2 phase 2, 3 phase 1/2 and 2 phase 2/3. ClinicalTrials.gov lists 4 as recruiting, 6 as active and not recruiting, 7 as completed and 2 as terminated. Hoffmann-La Roche leads 8 and GlaxoSmithKline 6. They include APHINITY, KATHERINE, GOYA, OAK and IMpassion130. OnCo holds a selection of trials, not the whole registry.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with sites in Panama", url: CTGOV },
            { label: "KATHERINE (NCT01772472)", url: "https://clinicaltrials.gov/study/NCT01772472" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-sources",
      title: "Sources not read for this page",
      plain:
        "OnCo did not read a report from Panama's national population-based cancer registry, the Caja de Seguro Social's own pages (its site refused a script), the medicines regulator's rules, or a count of radiotherapy machines. The figures here come from the national institute, WHO and IARC instead.",
      detail:
        "css.gob.pa answered 403 on 11 November 2026. The Ministry of Health's registry page tried (minsa.gob.pa/informacion-salud/registro-nacional-de-cancer) answered 404. IARC's fact sheet records no national incidence data for its 2024 estimate. Radiotherapy capacity is published in IAEA's DIRAC database, which needs an account for most queries. Each is a named gap, not a claim that the source does not exist.",
      links: [
        { label: "Caja de Seguro Social", url: "https://www.css.gob.pa/" },
        { label: "IAEA: Directory of Radiotherapy Centres (DIRAC)", url: "https://dirac.iaea.org/" },
      ],
    },
  ],
  institutions: ["ion-panama", "css-panama"],
  companies: [],
  drugs: [],
  trials: ["aphinity", "katherine", "goya", "oak", "impassion130", "gatsby", "toga"],
  papers: [],
  people: [],
  how:
    "Every card was written from Panamanian and international public sources read as raw text on 11 November 2026, in Spanish where the source is Spanish: the Instituto Oncológico Nacional's registry bulletin and pages, WHO's 2020 country profile and immunisation data, the World Bank and IARC's GLOBOCAN 2024 fact sheet.",
  verify:
    "The institute's registry counts its own patients, not the country's. Admission rules change; check with the institute or the Caja de Seguro Social before travelling.",
  verifyLinks: [
    { label: "ION: hospital cancer registry bulletin 2024 (PDF)", url: ION_BULLETIN_2024 },
    { label: "ION: admission rules for insured patients", url: ION_INSURED },
    { label: "IARC: GLOBOCAN 2024 fact sheet, Panama (PDF)", url: IARC_FACTSHEET },
  ],
};
