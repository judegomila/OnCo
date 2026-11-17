import type { CountryDive } from "@/data/country-dive";

/**
 * Nigeria deep dive: the hand-written cards for /countries/ng/ (wave 3). Every figure was read from the raw text of
 * its source on 4 November 2026, not from a summary of it: the Nigeria National Cancer Control Plan 2026 to 2030 (PDF
 * text, with OCR of its image-only pages 19 to 34), NICRAT's National Strategic Cancer Control Plan 2023 to 2027 and
 * its National Guidelines for Cervical Cancer Screening (both scanned, read by OCR and checked against the page
 * images where a number mattered), NICRAT's January to August 2026 activity report and news pages, the gazetted
 * National Health Insurance Authority Act 2022 (OCR), NHIA's own news pages, NAFDAC's reliance guideline, the IAEA,
 * WHO and IARC imPACT Review summary (September 2025), IARC's GLOBOCAN 2024 fact sheet for Nigeria, and the registry
 * papers' abstracts through Europe PMC. Where a figure could not be read it is named under `gaps`.
 */
const NCCP_2026 = "https://www.iccp-portal.org/sites/default/files/2026-05/Nigeria_NCCP_2026-2030_web.pdf";
const NSCCP_2023 = "https://www.nicrat.gov.ng/wp-content/uploads/2023/08/NATIONAL-STRATEGIC-CANCER-CONTROL-PLAN-2023-2027.pdf";
const IMPACT_2025 = "https://www.iaea.org/sites/default/files/2025-11/nigeria-impact-241024.pdf";
const NICRAT_REPORT = "https://www.nicrat.gov.ng/wp-content/uploads/2023/08/NICRAT-FINAL-JAN-AUG-2026-EDITABLE-ACTIVITY-REPORT-FINAL-PDF.pdf";
const CX_GUIDELINE = "https://www.nicrat.gov.ng/wp-content/uploads/2023/08/Guidelines-for-Cervical-Cancer-Screening-in-Nigeria-2025.pdf";
const NHIA_ACT = "https://www.nhia.gov.ng/wp-content/uploads/2024/03/NHIA-Act-2022-Gazetted-Copy.pdf";
const NHIA_23M = "https://www.nhia.gov.ng/nhia-enrolment-hits-23m-as-cancer-hiv-tb-coverage-expands/";
const NHIA_HTA = "https://www.nhia.gov.ng/nigeria-institutionalises-health-technology-assessment-to-advance-uhc/";
const NHIA_BLUEPRINT = "https://www.nhia.gov.ng/a-dual-sided-investment-blueprint-for-oncology-and-ncd-care-in-africa/";
const NAFDAC_RELIANCE = "https://www.nafdac.gov.ng/wp-content/uploads/Files/Resources/Guidelines/DR&R_2025/Guidelines-For-Registration-And-Related-Activities-Of-Drugs-Vaccines-And-In-Vitro-Diagnostics-Using-The-Reliance-Procedure.pdf";
const NAFDAC_ML3 = "https://statehouse.gov.ng/president-tinubu-congratulates-nafdac-on-maintaining-who-maturity-level-3-for-regulation-of-medicines-and-vaccines/";
const IARC_FACTSHEET = "https://gco.iarc.who.int/media/globocan/factsheets/populations/566-nigeria-fact-sheet.pdf";
const NCR = "https://ncr.nicrat.gov.ng/";
const NICRAT_NCS = "https://www.nicrat.gov.ng/ncs/";
const CX_TASKFORCE = "https://www.nicrat.gov.ng/14/fg-reconstitutes-taskforce-on-cervical-cancer-elimination-appoints-ssa-to-president-as-chairperson/";
const WHO_HPV = "https://xmart-api-public.who.int/WIISE/MT_AD_COV_LONG?$filter=CODE%20eq%20'NGA'%20and%20contains(ANTIGEN,'HPV')";
const DIRAC = "https://dirac.iaea.org/Data/CountriesLight";
const NCAP_2026 = "https://www.nicrat.gov.ng/19/nicrat-upgrades-chemotherapy-suites-in-six-geopolitical-zones/";

export const NG_DIVE: CountryDive = {
  iso2: "NG",
  iso3: "NGA",
  name: "Nigeria",
  flag: "🇳🇬",
  asOf: "2026-11-04",
  title: "Cancer in Nigeria",
  description:
    "Cancer in Nigeria from Nigerian sources: IARC's estimate of 152,261 new cancers and 90,795 deaths in 2024 against the few population-based registries that count cancer directly, a 2022 law that makes health insurance compulsory while most cancer care is still paid out of pocket, the national Cancer Health Fund and medicine price partnerships, NAFDAC and its reliance route, a new HPV-based cervical screening programme, 15 working radiotherapy machines for about 223 million people, and the trials in our records with sites in Nigeria.",
  lede:
    "Nigeria's published cancer registry rates come from a handful of cities, and its national figures are IARC estimates: 152,261 new cancers and 90,795 deaths in 2024, with breast, prostate and cervical cancer leading. A 2022 law makes health insurance compulsory, but most patients still pay for cancer care themselves, and the country had 15 working radiotherapy machines when international reviewers visited in 2024.",
  globocanNote:
    "IARC's GLOBOCAN 2024 figure for Nigeria is 152,261 new cancers and 90,795 deaths, an age-standardised incidence of 113.7 per 100,000 (103.3 in men, 125.6 in women); the all-cancers figure includes the 3,177 non-melanoma skin cancers IARC estimates separately. It is a model, not a count: IARC's fact sheet gives Nigeria's incidence method as national or subnational rates scaled to regional all-cancer rates, and its mortality as national incidence estimates applied to modelled mortality-to-incidence ratios from registry survival data. The 2025 imPACT Review names five population-based registries (Abuja, Calabar, Ekiti, Enugu and Ibadan) as contributing data to these estimates. Those registries measure higher rates in women than IARC does in some cities and lower in others: in 2009 to 2010 Ibadan recorded 130.6 cancers per 100,000 women and 66.4 per 100,000 men, Abuja 138.6 and 58.3, and Calabar in 2009 to 2013 recorded 86.9 and 78.8. Their cervical cancer rates (36.0 in Ibadan, 30.3 in Abuja, 21 in Calabar) are above IARC's 2024 figure of 19.1 per 100,000 women, while breast is close (52.0 and 64.6 against IARC's 59.3). The registry rates are a decade or more older and cover a few cities, so neither set is a national count. NICRAT's 2026 activity report describes Nigeria's first national Cancer Burden Report for 2024, but its figures could not be found, and the activity report could not be re-read on 17 November 2026; see the gaps.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Nigeria",
      aside: { label: "IARC: GLOBOCAN 2024 fact sheet, Nigeria (PDF)", url: IARC_FACTSHEET },
      cards: [
        {
          id: "shape",
          title: "About 152,000 new cancers a year, most of them in women",
          plain:
            "IARC estimates 152,261 new cancers in Nigeria in 2024: 89,659 in women and 62,602 in men. Breast cancer is the commonest, then prostate and cervical cancer, and those three make up more than half of all cases. IARC estimates about six cancer deaths for every ten new cases in the same year, which the national plan reads as a high likelihood of death after diagnosis.",
          detail:
            "The GLOBOCAN 2024 fact sheet gives 44,196 breast cancers (21,309 deaths), 24,396 prostate cancers (15,176 deaths) and 12,312 cervical cancers (7,599 deaths), followed by colorectal cancer (10,212) and liver cancer (3,783). Together breast, prostate and cervix are 80,904 of 152,261 cases, 53%. In men the leading cancers are prostate, colorectum and liver; in women breast, cervix and colorectum. The risk of developing a cancer before age 75 is 11.2% for men and 13.0% for women, and there are an estimated 292,934 people living within five years of a cancer diagnosis. Deaths divided by new cases give 0.60 for 2024; the 2026 to 2030 national cancer control plan, quoting IARC's 2022 figures of 127,763 cases and 79,542 deaths, calls its ratio of 0.62 an unacceptable level that points to a high likelihood of death after diagnosis. The plan also cites about 6,000 new childhood cancers in 2022, with approximately 95% presenting at late stages, and a 2024 study at one teaching hospital found 66.2% of patients with breast cancer had stage III disease or later at presentation.",
          links: [
            { label: "IARC: GLOBOCAN 2024 fact sheet, Nigeria (PDF)", url: IARC_FACTSHEET },
            { label: "Nigeria National Cancer Control Plan 2026 to 2030 (Federal Ministry of Health and Social Welfare, PDF)", url: NCCP_2026 },
            { label: "Wuraola et al., out-of-pocket cost of breast cancer care in Nigeria (J Cancer Policy 2024)", url: "https://doi.org/10.1016/j.jcpo.2024.100518" },
          ],
        },
        {
          id: "care-capacity",
          title: "Where treatment is: 13 federal hospitals offer surgery, chemotherapy and radiotherapy",
          plain:
            "Nigeria's federal government runs 35 teaching hospitals and 25 federal medical centres meant to treat cancer, but the national plan says only 13 of those 60 offer the full range of surgery, chemotherapy and radiotherapy. The rest give chemotherapy and surgery only, and specialist services are concentrated in the cities.",
          detail:
            "The National Cancer Control Plan 2026 to 2030 counts 83 federal tertiary health institutions: 35 federal teaching hospitals, 25 federal medical centres and 23 specialty hospitals. Of the 60 teaching hospitals and medical centres, 13 offer chemotherapy, surgery and radiotherapy; the Ministry is upgrading six of them as centres of excellence, at Katsina, Benin, Jos, Zaria (Ahmadu Bello University Teaching Hospital), Lagos (Lagos University Teaching Hospital) and Enugu (University of Nigeria Teaching Hospital), with linear accelerators, brachytherapy and CT simulators. The plan reports that about 30 of 36 states provide some form of systemic therapy, mainly through teaching hospitals and private institutions in cities, and that 38 institutions in 24 states offer some paediatric oncology, four with dedicated wards. Molecular and genetic testing is not readily available, so specimens are sent abroad or to private laboratories, and out-of-pocket payment is the main way patients pay for pathology. Imaging equipment per million people is below the regional expectation: 0.18 mammography units against 1.48, 0.26 MRI against 0.67, 0.89 CT against 1.036.",
          links: [
            { label: "Nigeria National Cancer Control Plan 2026 to 2030, sections 2.1 to 2.8 (PDF)", url: NCCP_2026 },
            { label: "imPACT Review summary, Nigeria (IAEA, WHO and IARC, September 2025, PDF)", url: IMPACT_2025 },
          ],
        },
      ],
      tables: [
        {
          id: "ng-registries",
          title: "What Nigeria's population-based registries have published",
          caption: "New cancers and age-standardised incidence per 100,000, as reported by each registry's paper. Latest published periods found: 2009 to 2014.",
          columns: [
            { key: "registry", label: "Registry (area covered)" },
            { key: "period", label: "Years" },
            { key: "cases", label: "New cancers", numeric: true },
            { key: "men", label: "All cancers, men", numeric: true },
            { key: "women", label: "All cancers, women", numeric: true },
            { key: "breast", label: "Breast", numeric: true },
            { key: "cervix", label: "Cervix", numeric: true },
          ],
          rows: [
            { registry: "Ibadan Population Based Cancer Registry", period: "2009 to 2010", cases: 3393, men: 66.4, women: 130.6, breast: 52.0, cervix: 36.0 },
            { registry: "Abuja Population Based Cancer Registry", period: "2009 to 2010", cases: 1128, men: 58.3, women: 138.6, breast: 64.6, cervix: 30.3 },
            { registry: "Calabar Cancer Registry (two local government areas, 375,196 people in 2006)", period: "2009 to 2013", cases: 719, men: 78.8, women: 86.9, breast: 35, cervix: 21 },
            { registry: "Abuja and Enugu registries combined (113.9 per 100,000, both sexes)", period: "2012 to 2014", cases: 4336, men: null, women: null, breast: null, cervix: null },
          ],
          note: "These are the only measured population rates found for Nigeria, from a few cities, and none is newer than 2014. Registries publish new cases, not deaths. The Abuja abstract's sex breakdown (389 men, 768 women) sums to more than its stated total of 1,128. Rates are age-standardised as each paper reports them; the Abuja and Enugu paper gives one rate for both sexes.",
          sources: [
            { label: "Jedy-Agba et al., Cancer incidence in Nigeria (Cancer Epidemiol 2012)", url: "https://doi.org/10.1016/j.canep.2012.04.007" },
            { label: "Ekanem and Parkin, Five year cancer incidence in Calabar (Cancer Epidemiol 2016)", url: "https://doi.org/10.1016/j.canep.2016.04.014" },
            { label: "Odutola et al., cancers attributable to overweight and obesity, Abuja and Enugu registries 2012 to 2014 (Front Oncol 2019)", url: "https://doi.org/10.3389/fonc.2019.00460" },
          ],
        },
      ],
    },
    {
      id: "registry",
      nav: "Registry",
      title: "Who counts cancer: a network of city registries, now a national registry in law",
      aside: { label: "National Cancer Registry, Nigeria (NICRAT)", url: NCR },
      cards: [
        {
          id: "registry-network",
          title: "Cancer has been notifiable since 2024; OnCo found no published national count",
          plain:
            "Nigeria's oldest cancer registry was started in Ibadan in 1960. Today a national registry run by the national cancer institute, NICRAT, links population-based registries in a few cities with hospital registries, and under regulations launched in 2024 cancer is a notifiable disease. OnCo could not find a published national incidence figure from the registries.",
          detail:
            "The Ibadan registry was set up in 1960 in the Pathology Department of University College Hospital and contributed to the first three volumes of Cancer Incidence in Five Continents before economic and political upheaval stopped its submissions. The Nigerian National System of Cancer Registries, conceived in 2009 by the Federal Ministry of Health, the Society of Oncology and Cancer Research of Nigeria and the Institute of Human Virology Nigeria, rebuilt registration; its 2015 report lists Abuja covering 1,406,239 people and Ibadan 2,549,265. The 2024 National Cancer Registry Regulations made cancer a notifiable disease and created the National Cancer Registry of Nigeria, which the 2025 imPACT Review describes as 26 population-based and hospital-based registries; NICRAT's 2023 to 2027 plan had counted 34, with 13 population-based and 24 hospital-based, figures that do not add up as printed, and set a target of raising registration from under 10% of cases a year to over 70% by 2027. The review found most registries have no dedicated budget and that the last census, in 2006, limits incidence rates. In 2026 NICRAT reported training more than 100 registrars, accrediting eight registries, signing a three-year agreement with the African Cancer Registry Network and validating national registry procedures on 29 June 2026. NICRAT's website returned a bot check on 17 November 2026, so the figures here from NICRAT's 2023 to 2027 plan and its 2026 reports could not be re-read on that date.",
          links: [
            { label: "Jedy-Agba et al., the Nigerian National System of Cancer Registries (Front Public Health 2015)", url: "https://doi.org/10.3389/fpubh.2015.00186" },
            { label: "imPACT Review summary, section 4: cancer registry (PDF)", url: IMPACT_2025 },
            { label: "National Strategic Cancer Control Plan 2023 to 2027, section 3.6 (NICRAT, PDF)", url: NSCCP_2023 },
            { label: "NICRAT: experts approve Nigeria's first national cancer registry standards (1 July 2026)", url: "https://www.nicrat.gov.ng/01/experts-approve-nigerias-first-national-cancer-registry-standards/" },
          ],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: compulsory insurance in law, out of pocket in practice",
      aside: { label: "National Health Insurance Authority Act 2022, gazetted copy (PDF)", url: NHIA_ACT },
      cards: [
        {
          id: "nhia-law",
          title: "The 2022 Act makes health insurance compulsory; about one in ten people is enrolled",
          plain:
            "Since May 2022 Nigerian law has required every resident to have health insurance, and a fund pays premiums for people who cannot afford them. In practice the national insurer reports 23 million people enrolled, about one in ten Nigerians, and patients pay more than three quarters of all health spending themselves.",
          detail:
            "The National Health Insurance Authority Act 2022, Act No. 17 of 19 May 2022, replaced the National Health Insurance Scheme with an Authority charged to ensure that health insurance is mandatory for every Nigerian and legal resident (section 3) and states in section 14 that every person resident in Nigeria shall be required to obtain health insurance. Sections 25 and 26 establish a Vulnerable Group Fund, financed from the Basic Health Care Provision Fund, a health insurance levy and government allocations, to subsidise insurance for vulnerable people and pay premiums for the indigent; the Act defines the vulnerable group as including children under five, pregnant women, the aged, the physically and mentally challenged and the indigent. The Act does not mention cancer. On 25 September 2026 the Authority reported more than 23 million people enrolled, against IARC's 2024 population estimate of 232.7 million. The 2025 imPACT Review records that out-of-pocket payments are 76% of current health expenditure, that about 60% of health services are provided privately, and that the Basic Health Care Provision Fund package included self breast examination as its only cancer component.",
          links: [
            { label: "National Health Insurance Authority Act 2022, sections 3, 14, 25 and 26 (PDF)", url: NHIA_ACT },
            { label: "NHIA: enrolment hits 23m as cancer, HIV and TB coverage expands (25 September 2026)", url: NHIA_23M },
            { label: "imPACT Review summary, section 2 (PDF)", url: IMPACT_2025 },
          ],
        },
        {
          id: "what-patients-pay",
          title: "What a patient pays: more than most households can afford, with partial help for some",
          plain:
            "In a study at one teaching hospital, treating breast cancer cost an average of about 5,200 US dollars, nearly twice what households could afford, and between 79% and all of the patients faced catastrophic spending. Insurance now covers some scans, tests and radiotherapy, and a few cancer medicines through cost sharing with manufacturers.",
          detail:
            "Wuraola and colleagues followed 71 patients treated with curative intent for breast cancer at a tertiary hospital in south-west Nigeria from 2019 to 2022: the mean cost of care was 5,192.77 US dollars against a mean annual capacity to pay of 2,866.93, between 56 (78.9%) and 71 (100%) faced catastrophic health expenditure depending on the definition, and 66% had no health insurance. The NHIA said on 25 September 2026 that its benefits and payment structure covers mammography, CT and MRI scans, cancer-related diagnostic tests and radiotherapy, and that it is improving access to selected oncology medicines through cost sharing with Roche. In February 2025 its Director General was reported announcing a 50% subsidy on radiotherapy capped at 400,000 naira, and saying cost sharing with Roche and Pfizer had reached over 200 patients at seven tertiary centres; OnCo could not find the scheme's rules on the NHIA's own site. The 2026 to 2030 plan sets out to include all anticancer medicines in health insurance, and estimates palliative care coverage under the NHIA at below 1%.",
          links: [
            { label: "Wuraola et al., out-of-pocket cost of breast cancer care in Nigeria (J Cancer Policy 2024)", url: "https://doi.org/10.1016/j.jcpo.2024.100518" },
            { label: "NHIA: enrolment hits 23m as cancer, HIV and TB coverage expands (25 September 2026)", url: NHIA_23M },
            { label: "Nairametrics: NHIA introduces 400,000 naira subsidy for radiotherapy (6 February 2025)", url: "https://nairametrics.com/2025/02/06/nhia-introduces-n400000-subsidy-for-cancer-patients-under-cost-sharing-initiative/" },
            { label: "Nigeria National Cancer Control Plan 2026 to 2030, sections 1.1 and 2.7 (PDF)", url: NCCP_2026 },
          ],
        },
        {
          id: "cancer-funds",
          title: "Public funds and price deals for patients who cannot pay",
          plain:
            "Two government programmes help with the cost of treatment. The Cancer Health Fund pays for chemotherapy and radiotherapy for poorer patients with breast, cervical or prostate cancer at six public centres, and a Childhood Cancer Fund started at three hospitals in 2026. A partnership with drug makers supplies some cancer medicines at prices the national plan describes as reduced by about half.",
          detail:
            "The 2025 imPACT Review describes the National Cancer Health Fund, implemented by NICRAT, as supporting chemotherapy and radiotherapy for patients with breast, cervical and prostate cancers in six public comprehensive cancer centres, and as providing free systemic therapy for indigent patients; NICRAT's 2023 to 2027 plan noted it covered only those three adult cancers. NICRAT's activity report for January to August 2026 records a Childhood Cancer Fund live at Federal Medical Centre Abeokuta, Usmanu Danfodiyo University Teaching Hospital Sokoto and Jos University Teaching Hospital, and, at a joint meeting of the Nigeria Cancer Access Partnership and the Cancer Health Fund, more than 10,000 patients accessing care through their platform. The access partnership, run with the Clinton Health Access Initiative, buys specific originator medicines directly from manufacturers, which the 2026 to 2030 plan describes as supplied at drastically reduced rates of 50 to 60% to the patient; another passage of the plan says the programme cuts the cost of chemotherapy medicines by as much as 50%. NICRAT reported in June 2026 that the network had grown from 18 to 24 centres and aims for 30; the 2023 plan had counted it in 20 of 44 cancer treatment centres. Partners at the June 2026 meeting named funding as a particular challenge. NICRAT's website returned a bot check on 17 November 2026, so its 2023 to 2027 plan, its activity report and its June 2026 news page could not be re-read on that date.",
          links: [
            { label: "imPACT Review summary, sections 2 and 10 (PDF)", url: IMPACT_2025 },
            { label: "NICRAT activity report, January to August 2026 (PDF)", url: NICRAT_REPORT },
            { label: "NICRAT: NCAP stakeholders meeting (19 June 2026)", url: NCAP_2026 },
            { label: "Nigeria National Cancer Control Plan 2026 to 2030, section 2.5 (PDF)", url: NCCP_2026 },
          ],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Nigeria decides what insurance pays for",
      aside: { label: "NHIA: Nigeria institutionalises health technology assessment (22 September 2026)", url: NHIA_HTA },
      cards: [
        {
          id: "hta",
          title: "A national health technology assessment system, started in 2025, with a liver cancer drug among its first cases",
          plain:
            "Nigeria began assessing medicines and services for value before insurance pays for them only recently. The national insurer set up an assessment division in 2025 and ran three pilot assessments, one of them on sorafenib for advanced liver cancer, and in September 2026 it reported the inauguration of a national steering committee.",
          detail:
            "On 22 September 2026 the NHIA reported that the Coordinating Minister of Health and Social Welfare had inaugurated a National Health Technology Assessment Steering Committee to oversee the national system, prioritise topics, guard against conflicts of interest and give findings a route into benefit-package design, strategic purchasing and reimbursement. The NHIA's Director General described the steps so far: a Strategic Purchasing Department with a dedicated assessment division set up in 2025; an assessment framework, reference case, process guidelines and conflict of interest policy; Nigerian researchers trained at Mahidol University; a Nigerian EQ-5D-5L valuation study so that quality-adjusted life years reflect local preferences; and three pilot assessments, of kidney replacement therapy, colorectal cancer screening and sorafenib for advanced liver cancer. The committee includes NAFDAC's Director General and a NICE adviser. The announcement gives neither the pilots' results nor any cost-effectiveness threshold, so OnCo cannot say what was decided about sorafenib.",
          links: [
            { label: "NHIA: Nigeria institutionalises health technology assessment (22 September 2026)", url: NHIA_HTA },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: NAFDAC",
      aside: { label: "NAFDAC: registration using the reliance procedure (PDF)", url: NAFDAC_RELIANCE },
      cards: [
        {
          id: "nafdac-reliance",
          title: "For a medicine approved by a stringent regulator, NAFDAC commits to a decision in about 90 days",
          plain:
            "Nigeria's medicines regulator, NAFDAC, registers each medicine nationally. Since September 2024 a company whose medicine is already approved by a stringent regulator, such as those in the United States or Europe, can ask NAFDAC to rely on that approval, and the guideline commits NAFDAC to a decision within 60 working days.",
          detail:
            "NAFDAC's guideline DR&R-GDL-035-00, effective 10 September 2024, covers drugs, vaccines and in vitro diagnostics registered or authorised by a stringent regulatory authority as the World Health Organization defines it. NAFDAC may rely on that authority's assessment reports and its inspection reports, which must be no more than three years old, for an abridged assessment of quality, safety and efficacy, while it retains its sovereignty in decision-making; it verifies that the product is identical or similar to the one the reference authority approved. It may rely on laboratory reports from WHO-prequalified or ISO 17025 laboratories and from regulators at maturity level 3 or 4, and may still test the product itself. After dossier review, risk-based categorisation of the manufacturing site and any laboratory analysis, the product goes to the Food and Drugs Registration Committee, and the guideline states that NAFDAC will make its decision within 60 working days, about 90 calendar days. NAFDAC's own page says it was established by Decree No. 15 of 1993, as amended by Decree No. 19 of 1999, and now operates under the NAFDAC Act Cap N1 of 2004.",
          links: [
            { label: "NAFDAC: guidelines for registration using the reliance procedure, DR&R-GDL-035-00 (PDF)", url: NAFDAC_RELIANCE },
            { label: "NAFDAC: about NAFDAC", url: "https://www.nafdac.gov.ng/about-nafdac/" },
          ],
        },
        {
          id: "nafdac-ml3",
          title: "Rated at the World Health Organization's maturity level 3 for medicines and vaccines",
          plain:
            "The World Health Organization rates national medicines regulators on a four-level scale. NAFDAC reached level 3, a stable and well-functioning system, in 2022 for medicines and vaccines it does not itself produce, the first African regulator to do so in that category, and kept the rating after a review in 2025.",
          detail:
            "The State House statement of 11 August 2025 reports that the World Health Organization re-benchmarked NAFDAC from 28 to 30 May 2025, after a formal re-benchmarking in November 2024 and five institutional development plan review meetings between February and April 2025, and quotes its verdict that NAFDAC has maintained a regulatory system that operates as a stable, well-functioning and integrated framework for regulating medicines and vaccines (non-producing). Maturity level 3 matters for patients because other regulators can lean on the work of authorities at that level; NAFDAC's own reliance guideline, for example, lets it accept laboratory reports from regulators at maturity level 3 or 4. The national cancer plan for 2026 to 2030 asks regulators to streamline review and clearance of new cancer screening, diagnostic and treatment products and of products for clinical trials. NAFDAC publishes no median approval time for cancer medicines that OnCo could find; this is named under gaps.",
          links: [
            { label: "State House: NAFDAC maintains WHO maturity level 3 (11 August 2025)", url: NAFDAC_ML3 },
            { label: "NAFDAC: reliance guideline, step 7.2 on laboratory reports (PDF)", url: NAFDAC_RELIANCE },
            { label: "Nigeria National Cancer Control Plan 2026 to 2030, strategy 4.4.1 (PDF)", url: NCCP_2026 },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening and prevention",
      aside: { label: "National Guidelines for Cervical Cancer Screening in Nigeria (NICRAT, PDF)", url: CX_GUIDELINE },
      cards: [
        {
          id: "cervical-programme",
          title: "A national cervical screening programme based on HPV testing has just begun",
          plain:
            "Fewer than one in eight Nigerian women has ever been screened for cervical cancer. New national guidelines set HPV testing, including tests women can take themselves, for women aged 30 to 49, with treatment on the spot where possible, and the national programme was rolled out first in Owerri, Imo State.",
          detail:
            "The National Guidelines for Cervical Cancer Screening, developed by the National Task Force on Cervical Cancer Elimination by adapting the WHO's 2021 guidelines, put lifetime screening coverage at less than 12% nationally, with over 70% of patients presenting at an advanced stage. They recommend primary HPV testing with partial genotyping; for the general population a target age of 30 to 49, starting at 30 and screening every 10 years (twice in a lifetime, by 35 and again by 45); for women aged 50 to 65 not previously screened, screening immediately and every 5 to 10 years until 70; for women living with HIV, every 5 years from 25 to 65. Both self-sampling and provider sampling are recommended, point-of-care testing where feasible, and thermal ablation as first-line treatment, with triage by VIA or colposcopy for HPV types other than 16 and 18. On 14 October 2026 the Minister of State for Health listed the programme's first rollout in Owerri, Imo State, among the taskforce's achievements; NICRAT's 2026 report records launches in Imo and Niger States and about 20 women treated for precancerous lesions. The 2025 imPACT Review put cervical screening coverage at less than 10%. NICRAT's website returned a bot check on 17 November 2026, so the guidelines, the taskforce announcement and the activity report could not be re-read on that date; of the figures on this card only the imPACT Review's was re-read.",
          links: [
            { label: "National Guidelines for Cervical Cancer Screening in Nigeria (NICRAT, PDF)", url: CX_GUIDELINE },
            { label: "NICRAT: FG reconstitutes taskforce on cervical cancer elimination (14 October 2026)", url: CX_TASKFORCE },
            { label: "NICRAT activity report, January to August 2026 (PDF)", url: NICRAT_REPORT },
          ],
        },
        {
          id: "other-screening",
          title: "No fully established national programmes yet for breast, prostate or bowel cancer; HPV vaccine since 2023",
          plain:
            "International reviewers found in 2024 that Nigeria's national screening programmes for breast, prostate and bowel cancer were not yet fully established. Clinical breast examination is offered in primary care and mammography is available in larger hospitals for people who ask, but there are few machines. Since October 2023 the HPV vaccine has been part of routine immunisation, given as a single dose.",
          detail:
            "The 2025 imPACT Review states that national programmes for breast, cervical, prostate and colorectal cancer screening had not yet been fully established, that clinical breast examination has been integrated at primary care level, and that mammography has been introduced at secondary and tertiary hospitals as part of an opportunistic strategy; the 2026 to 2030 plan counts 0.18 mammography units per million people against an expected 1.48 for the region. The review recommends that national guidance advise against routine prostate-specific antigen (PSA) blood testing to screen for prostate cancer. NICRAT's 2023 to 2027 plan aimed for more than 50% screening of the eligible population by 2027, and its 2026 report records more than 4,000 people screened through community outreach, primary health centres and partners, and eight preventive oncology clinics. On prevention, the HPV vaccine entered routine immunisation in October 2023 as a single dose, a National Taskforce on Cervical Cancer Elimination was set up in August 2024, and hepatitis B birth-dose vaccination is part of childhood immunisation, with national coverage estimated at 67% in 2023. For the HPV vaccine the review gives campaign coverage rather than a national figure: 80% of the multi-age cohort in 21 states in phase 1 and 96% in 16 states in phase 2. The World Health Organization's immunisation data, read in November 2026, holds national figures for girls: programme coverage with a first dose of 27% in 2023, 60% in 2024 and 60% in 2025, and first-dose coverage by age 15 of 28% in 2024 and 67% in 2025; the administrative first-dose figure reported for 2025 is 84% (2,624,019 doses against a target of 3,123,178). NICRAT's website returned a bot check on 17 November 2026, so the figures here from NICRAT's 2023 to 2027 plan and its 2026 report could not be re-read on that date.",
          links: [
            { label: "imPACT Review summary, sections 5 and 6 (PDF)", url: IMPACT_2025 },
            { label: "WHO immunisation data: HPV vaccination coverage rows for Nigeria (JSON)", url: WHO_HPV },
            { label: "Nigeria National Cancer Control Plan 2026 to 2030, sections 2.3 and 2.8 (PDF)", url: NCCP_2026 },
            { label: "NICRAT activity report, January to August 2026 (PDF)", url: NICRAT_REPORT },
          ],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Nigeria does",
      title: "What Nigeria does differently",
      cards: [
        {
          id: "clinical-oncologists",
          title: "No separate medical oncology specialty: one doctor gives both radiotherapy and chemotherapy",
          plain:
            "In most countries chemotherapy and radiotherapy are given by different specialists. Nigeria has no medical oncology specialty: clinical oncologists are trained in both, and in some centres surgeons give chemotherapy too. The country had 74 practising clinical oncologists and eight trained paediatric oncologists for about 223 million people when assessed in 2024.",
          detail:
            "NICRAT's 2023 to 2027 plan states that the country does not have medical oncology as a specialty, that those trained as radiation oncologists also train in giving chemotherapy, and that in some centres surgeons administer chemotherapy. The 2025 imPACT Review counts 74 practising clinical oncologists, all trained in radiation therapy, six training programmes with 70 registrars in 2024, and 62 medical physicists against an estimated need of 150; it recommends reducing reliance on non-oncologists such as general surgeons for chemotherapy. The 2026 to 2030 plan records eight paediatric oncologists with specialised training, so general paediatricians treat children with cancer in most centres, and notes that surgical oncology residency and fellowship training has begun with accreditation by the West African College of Surgeons. Its illustrative projection is that raising the share of medical graduates entering oncology from about 1% to 3 to 5% would take new entrants from 44 to 88 a year to about 264 to 440. NICRAT's 2023 to 2027 plan could not be re-read on 17 November 2026, when NICRAT's website returned a bot check; the imPACT Review, which was re-read, says medical oncology services are largely provided by clinical oncologists with dual specialisation in radiation and systemic therapy, and that surgeons with limited oncology training also prescribe chemotherapy.",
          links: [
            { label: "National Strategic Cancer Control Plan 2023 to 2027, goal 1B (NICRAT, PDF)", url: NSCCP_2023 },
            { label: "imPACT Review summary, sections 10 and 11 (PDF)", url: IMPACT_2025 },
            { label: "Nigeria National Cancer Control Plan 2026 to 2030, sections 2.5 and 2.6 (PDF)", url: NCCP_2026 },
          ],
        },
        {
          id: "radiotherapy-ppp",
          title: "Radiotherapy through public and private partnerships: machines that stay working",
          plain:
            "When international reviewers visited in 2024, Nigeria had 15 working radiotherapy machines in eight states for about 223 million people, against a need of more than 120. Centres run as public and private partnerships kept their machines working more than 95% of the time and started treatment within a month, and 35 more machines are planned.",
          detail:
            "The 2025 imPACT Review counts 15 functional external beam machines, 13 linear accelerators and 2 cobalt units, in eight states including Lagos, Enugu, Kano and Sokoto, plus seven brachytherapy afterloaders; radiotherapy at Ibadan, Maiduguri and Zaria was not functioning at the time of the visit. Because over half of people with cancer are estimated to need radiotherapy, it puts the need at more than 120 machines. Under public and private partnership arrangements at cancer centres in Enugu, Sokoto, Ebonyi and Lagos, with service contracts in place, machine uptime rose above 95% and waits for the start of treatment fell to an estimated less than one month; outside them, power cuts and the lack of maintenance contracts interrupt treatment. The Lagos centre at Lagos University Teaching Hospital now trades as Medserve-LUTH Cancer Centre. In October 2026 an article on the NHIA's site, co-written by its Director General, described MedServe as the healthcare subsidiary of the Nigeria Sovereign Investment Authority and a 154 million US dollar oncology investment by MedServe with the International Finance Corporation, and pictured one of 18 new diagnostic and oncology centres. NICRAT reported in September 2026 a memorandum for 35 additional linear accelerators with a local servicing hub; that page could not be re-read on 17 November 2026, when NICRAT's website returned a bot check. The IAEA's directory of radiotherapy centres, read on 16 November 2026, lists 15 centres in Nigeria with 16 linear accelerators and 2 cobalt-60 units between them, 10 of the centres with brachytherapy (entries last updated in 2025 or 2026). The review counted machines that were working in October 2024, while the directory's entries are self-reported by centre, so the two counts are not the same measure: the directory shows 2 linear accelerators at University of Maiduguri Teaching Hospital (UMTH) and no linear accelerator or cobalt-60 unit at the Ibadan and Zaria teaching hospitals.",
          links: [
            { label: "imPACT Review summary, section 11: radiation oncology (PDF)", url: IMPACT_2025 },
            { label: "IAEA: Directory of Radiotherapy Centres (DIRAC), countries data", url: DIRAC },
            { label: "NHIA: a dual-sided investment blueprint for oncology and NCD care in Africa (22 October 2026)", url: NHIA_BLUEPRINT },
            { label: "NICRAT: plans to deploy 35 LINAC radiotherapy machines (15 September 2026)", url: "https://www.nicrat.gov.ng/15/cancer-care-nicrat-plans-deployment-of-35-linac-radiotherapy-machines/" },
            { label: "Medserve-LUTH Cancer Centre", url: "https://nlcc.ng/" },
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
          title: "Few trials with sites in Nigeria, several of them studying how cancer behaves in Nigerian patients",
          plain:
            "ClinicalTrials.gov listed 459 studies of any condition with a site in Nigeria in September 2026, and four cancer trials in OnCo's records have sites there: two on triple-negative breast cancer, one on immunotherapy for bowel cancer and one large liver cancer trial. Nigerian research has shown that inherited gene changes are common in Nigerian women with breast cancer.",
          detail:
            "OnCo's ClinicalTrials.gov data has four trials with a Nigerian site: two phase 2 studies registered under the name TARMAC, NCT06291064 from the University of Chicago, of chemotherapy in Nigerian women with triple-negative breast cancer, and NCT04771871 from University College Hospital, Ibadan, of microRNA profiles in the same disease; NCT06529523, a Memorial Sloan Kettering phase 2 trial of tislelizumab for mismatch repair-deficient colorectal cancer; and NCT05904886, Roche's phase 3 trial of atezolizumab and bevacizumab with or without tiragolumab in liver cancer, with sites listed in 27 countries and territories, which ClinicalTrials.gov showed as active but no longer recruiting on 4 November 2026. OpenAlex counts 1,494 oncology papers with a Nigerian author from 2021 to 2025, rising from 264 in 2021 to 356 in 2025, and ClinicalTrials.gov counted 459 studies of any condition with a site in Nigeria when OnCo built its country file on 8 September 2026. A study of 1,136 women with breast cancer in Ibadan found that one in eight cases resulted from an inherited mutation in BRCA1, BRCA2, PALB2 or TP53, and 86.1% of those with a recorded stage were diagnosed at stage III or IV. In 2026 NICRAT reported four competitive research grants awarded, a national cancer biobank in operation and a new Nigeria Journal of Cancer Research; its clinical trials page read under construction on 4 November 2026. NICRAT's website returned a bot check on 17 November 2026, so neither the report nor that page could be re-read on that date.",
          links: [
            { label: "ClinicalTrials.gov: NCT06291064 (TARMAC)", url: "https://clinicaltrials.gov/study/NCT06291064" },
            { label: "ClinicalTrials.gov: NCT06529523", url: "https://clinicaltrials.gov/study/NCT06529523" },
            { label: "Zheng et al., inherited breast cancer in Nigerian women (J Clin Oncol 2018)", url: "https://doi.org/10.1200/JCO.2018.78.3977" },
            { label: "NICRAT activity report, January to August 2026 (PDF)", url: NICRAT_REPORT },
          ],
        },
        {
          id: "plans",
          title: "Two national cancer plans overlap: NICRAT's 2023 to 2027 plan and the Ministry's 2026 to 2030 plan",
          plain:
            "Nigeria has two current cancer plans. The national cancer institute wrote a plan for 2023 to 2027, and the Ministry of Health launched a National Cancer Control Plan for 2026 to 2030 on World Cancer Day 2026, aiming to halve cancer incidence and deaths by 2030. Both set targets for screening, registration and access to medicines.",
          detail:
            "NICRAT's National Strategic Cancer Control Plan 2023 to 2027, a costed plan with eight priority areas, followed the expired 2018 to 2022 plan; the 2025 imPACT Review notes that its scope was limited to federal-level activities and that awareness of it in the states was low. The Nigeria National Cancer Control Plan 2026 to 2030, developed by the Federal Ministry of Health and Social Welfare's National Cancer Control and Nuclear Medicine Programme, was launched by the Minister of State for Health on 4 February 2026 alongside the first National Nuclear Medicine Policy. Its stated objective is to reduce cancer incidence and mortality in Nigeria by 50% by 2030; the Vice President, in a July 2026 speech delivered by a representative, spoke of a commitment to reduce the cancer burden by at least 30% by the end of the decade. Its strategies include HPV and hepatitis B vaccination, screening with diagnostic confirmation within 60 days for 80% of positive tests by 2030, inclusion of all anticancer medicines in health insurance, an annual cancer burden report from population-based registries, and the use of artificial intelligence in registration.",
          links: [
            { label: "Nigeria National Cancer Control Plan 2026 to 2030 (PDF, ICCP portal)", url: NCCP_2026 },
            { label: "ICCP: Nigeria marks World Cancer Day with launch of new National Cancer Control Plan (5 February 2026)", url: "https://www.iccp-portal.org/news/nigeria-marks-world-cancer-day-launch-new-national-cancer-control-plan" },
            { label: "Move Against Cancer Africa: the World Cancer Day 2026 ministerial briefing and launch of the 2026 to 2030 plan", url: "https://macafrica.org/maca-at-the-world-cancer-day-2026-ministerial-press-briefing-and-launch-of-the-2026-2030-national-cancer-plan/" },
            { label: "National Strategic Cancer Control Plan 2023 to 2027 (NICRAT, PDF)", url: NSCCP_2023 },
            { label: "Vanguard: Shettima on the national cancer control plan (30 July 2026)", url: "https://www.vanguardngr.com/2026/07/shettima-nigeria-accounts-for-10-5-of-africas-cancer-burden/" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "burden-report",
      title: "Nigeria's first national Cancer Burden Report could not be found",
      plain:
        "NICRAT says it produced Nigeria's first national report of cancer incidence and deaths from its own registries, the Cancer Burden Report 2024, and a launch was announced for 18 August 2026. OnCo could not find the report or any figure from it, and NICRAT's national cancer statistics page was under construction.",
      detail:
        "NICRAT's activity report for January to August 2026 describes the Nigeria Cancer Burden Report 2024 as the country's first national statement of cancer incidence and mortality produced from Nigerian registries reporting to one common standard, moving beyond GLOBOCAN estimates, and says the Federal Ministry of Health has asked NICRAT to lead a working group for the next estimate. An announcement on OncoDaily gave a launch date of 18 August 2026 in Abuja. On 4 November 2026 NICRAT's National Cancer Statistics page read under construction, its documents page did not list the report, and the national registry site showed no figures to a plain request. On 17 November 2026 NICRAT's website returned a bot check to a plain request, so the activity report and these pages could not be re-read. Until the report is found, the registry figures on this page are those of individual city registries from 2009 to 2014.",
      links: [
        { label: "NICRAT activity report, January to August 2026 (PDF)", url: NICRAT_REPORT },
        { label: "NICRAT: National Cancer Statistics", url: NICRAT_NCS },
        { label: "OncoDaily: Nigeria Cancer Burden Report 2024 launch announcement", url: "https://oncodaily.com/voices/nigeria-cancer-burden-report-542409" },
      ],
    },
    {
      id: "nhia-guidelines",
      title: "The NHIA's operational guidelines and benefit package could not be read",
      plain:
        "The rules that say exactly which cancer services and medicines national health insurance pays for, and what share the patient pays, are in the NHIA's operational guidelines. The link on the NHIA's website returned a page-not-found error and no archived copy existed, so this page cannot list them.",
      detail:
        "The NHIA's operational guideline page links a PDF of its 2023 operational guidelines that returned HTTP 404 on 4 November 2026, and the Internet Archive held no copy of it; the benefit package page carried no list. The Cancer Health Fund page on NICRAT's site read under construction on 4 November 2026 and could not be re-read on 17 November 2026, so the fund's eligibility rules, the amount it pays per patient and its budget are not stated; press reports of its funding conflict with each other and are not used. The radiotherapy subsidy of 50% capped at 400,000 naira is quoted from a press report of the Director General's announcement in February 2025, not from an NHIA document.",
      links: [
        { label: "NHIA: operational guideline page", url: "https://www.nhia.gov.ng/operational-guideline/" },
        { label: "NICRAT: Cancer Health Fund page", url: "https://www.nicrat.gov.ng/cancer-health-fund/" },
      ],
    },
    {
      id: "approval-times",
      title: "No published approval times for cancer medicines in Nigeria",
      plain:
        "OnCo found no published figure for how long NAFDAC takes, on average, to register a cancer medicine, or how long after its approval in the United States or Europe a medicine reaches Nigerian patients. The only timeline found is the 60 working days the reliance guideline commits to.",
      detail:
        "NAFDAC's reliance guideline sets a decision within 60 working days for products already approved by a stringent regulator, but OnCo did not find a published timeline for the standard registration route, a median time actually achieved, or a list of cancer medicines registered in Nigeria with their dates. Third-party regulatory consultancies quote review times for the standard route; they are not used here. Whether a registered medicine is stocked, priced within reach, or covered by insurance or the Nigeria Cancer Access Partnership is a separate question this page cannot answer medicine by medicine.",
      links: [{ label: "NAFDAC: guidelines for registration using the reliance procedure (PDF)", url: NAFDAC_RELIANCE }],
    },
    {
      id: "unread-sources",
      title: "Other figures not found or not verified",
      plain:
        "Some figures a reader would want are not on this page because OnCo could not find them in a primary source: survival after a cancer diagnosis in Nigeria, the detailed GLOBOCAN data-source note for Nigeria, and the outcome of the national pilot assessment of sorafenib.",
      detail:
        "No Nigerian population-based survival figures were found in the sources read. IARC's detailed data sources and methods page for Nigeria loads only in a browser, so the registries IARC used are taken from the 2025 imPACT Review rather than from IARC. National HPV vaccination coverage was first listed here as not found; the World Health Organization's immunisation data does hold it, and the figures are now on the screening card. The NHIA's three pilot health technology assessments are named on its site without their results. The 2023 to 2027 plan's registry count (34 registries, 13 population-based and 24 hospital-based) does not add up as printed and is quoted as written. A Vice President's statement that Nigeria accounts for about 10.5% of Africa's cancer burden in 2024 is not used, because OnCo's own GLOBOCAN 2024 file does not reproduce it. All scanned documents were read by optical character recognition, with numbers checked against the page image.",
      links: [
        { label: "IARC: GLOBOCAN 2024 fact sheet, Nigeria (PDF)", url: IARC_FACTSHEET },
        { label: "imPACT Review summary, Nigeria (PDF)", url: IMPACT_2025 },
      ],
    },
  ],
  institutions: ["nicrat", "nigeria-national-cancer-registry", "nhia", "nafdac", "luth-lagos", "uch-ibadan", "iaea", "iarc", "who", "st-jude", "uchicago-cancer", "mskcc"],
  companies: ["roche-genentech", "pfizer"],
  drugs: [],
  trials: ["nct06291064", "nct04771871", "nct06529523", "nct05904886"],
  papers: [
    "paper-jedy-agba-nigeria-registries-canep-2012", "paper-jedy-agba-nscr-front-public-health-2015", "paper-ekanem-parkin-calabar-incidence-canep-2016",
    "paper-wuraola-breast-cancer-out-of-pocket-nigeria-jcpo-2024", "paper-zheng-nigerian-inherited-breast-cancer-jco-2018",
  ],
  people: ["jesse-otegbayo", "wasiu-lanre-adeyemo"],
  how:
    "Every card was written from Nigerian official sources and international reviews, read in full rather than through a summary: the Federal Ministry of Health and Social Welfare's National Cancer Control Plan 2026 to 2030; NICRAT's National Strategic Cancer Control Plan 2023 to 2027, its cervical screening guidelines, its 2026 activity report and its news pages; the gazetted National Health Insurance Authority Act 2022 and the NHIA's own announcements; NAFDAC's reliance guideline; the IAEA, WHO and IARC imPACT Review summary of September 2025; IARC's GLOBOCAN 2024 fact sheet; and the registry papers through Europe PMC. Scanned documents were read by optical character recognition and load-bearing numbers checked against the page images. The new records added for this page (NICRAT, the National Cancer Registry of Nigeria, the NHIA, NAFDAC and four papers) carry their own sources.",
  verify:
    "National incidence and death figures are IARC estimates, not counts, and the registry rates are from a few cities and are more than ten years old. Insurance cover, subsidies and fund eligibility change by announcement and are not fully published; ask the hospital's NHIA desk or the oncology department what applies to you. Cervical screening is being rolled out state by state, so availability depends on where you live.",
  verifyLinks: [
    { label: "NICRAT", url: "https://www.nicrat.gov.ng/" },
    { label: "National Health Insurance Authority", url: "https://www.nhia.gov.ng/" },
    { label: "NAFDAC", url: "https://www.nafdac.gov.ng/" },
    { label: "Nigeria National Cancer Control Plan 2026 to 2030 (PDF)", url: NCCP_2026 },
  ],
};
