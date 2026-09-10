/**
 * Getting the cost of cancer care down: the data behind /costs/.
 *
 * Solution first. Each cost driver is paired with what is already being done (with the document that says so
 * and the year) and what could be done next, pointing at idea records in src/data/ideas-waves/wave-costs.ts.
 * Savings figures appear only as the cited report states them. UK spelling; no invented numbers.
 */

import type { Src, Fact } from "./coverage-rankings";

export type CostDriver = {
  id: string;
  /** The driver, named plainly. */
  name: string;
  /** One or two sentences on the mechanism: why this raises the bill. */
  mechanism: string;
  /** What is already happening, each with year and source. */
  beingDone: Fact[];
  /** Ids of idea records (kind "idea") that attack this driver. */
  ideas: string[];
  /** Ids of bottleneck records this driver sits in. */
  bottlenecks: string[];
  /** Further reading. */
  links?: Src[];
};

const IQVIA_BIOSIM: Src = { label: "IQVIA Institute: Biosimilars in the United States 2023-2027 (January 2023)", url: "https://www.iqvia.com/insights/the-iqvia-institute/reports-and-publications/reports/biosimilars-in-the-united-states-2023-2027" };
const CMS_NEG_2026: Src = { label: "CMS fact sheet: negotiated prices for initial price applicability year 2026 (August 2024)", url: "https://www.cms.gov/newsroom/fact-sheets/medicare-drug-price-negotiation-program-negotiated-prices-initial-price-applicability-year-2026" };
const CMS_SELECTED: Src = { label: "CMS: selected drugs and negotiated prices (2026 and 2027)", url: "https://www.cms.gov/initiatives/medicare-prescription-drug-affordability/overview/medicare-drug-price-negotiation-program/selected-drugs-negotiated-prices" };
const KFF_PA: Src = { label: "KFF: Medicare Advantage insurers made nearly 53 million prior authorization determinations in 2024 (January 2026)", url: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" };
const CMS_0057: Src = { label: "CMS Interoperability and Prior Authorization final rule, CMS-0057-F (January 2024)", url: "https://www.cms.gov/priorities/key-initiatives/burden-reduction/interoperability/policies-and-regulations/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f" };
const FDA_OPTIMUS: Src = { label: "FDA final guidance: Optimizing the Dosage of Human Prescription Drugs and Biological Products for the Treatment of Oncologic Diseases (August 2024)", url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/optimizing-dosage-human-prescription-drugs-and-biological-products-treatment-oncologic-diseases" };
const HRSA_340B: Src = { label: "HRSA: 340B Drug Pricing Program", url: "https://www.hrsa.gov/opa" };
const GAO_340B: Src = { label: "GAO-15-442: Medicare Part B drugs, action needed to reduce financial incentives to prescribe 340B drugs at participating hospitals (June 2015)", url: "https://www.gao.gov/products/gao-15-442" };
const PRICE_TRANSPARENCY: Src = { label: "CMS: Hospital Price Transparency", url: "https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency" };
const PARITY_BILL: Src = { label: "Congress.gov: Cancer Drug Parity Act, H.R. 1730 (118th Congress)", url: "https://www.congress.gov/bill/118th-congress/house-bill/1730" };
const PARTD_CAP: Src = { label: "Medicare.gov: Costs for Medicare drug coverage", url: "https://www.medicare.gov/drug-coverage-part-d/costs-for-medicare-drug-coverage" };
const RAMSEY_2013: Src = { label: "Ramsey et al., Health Affairs 2013: Washington State cancer patients found to be at greater risk for bankruptcy", url: "https://doi.org/10.1377/hlthaff.2012.1263" };
const CDF: Src = { label: "NHS England: Cancer Drugs Fund", url: "https://www.england.nhs.uk/cancer/cdf/" };
const PBS_FEE: Src = { label: "PBS: patient co-payment and safety net", url: "https://www.pbs.gov.au/info/healthpro/explanatory-notes/front/fee" };
const NPPA: Src = { label: "National Pharmaceutical Pricing Authority (India)", url: "https://www.nppaindia.nic.in/" };
const IPINDIA: Src = { label: "Intellectual Property India: compulsory licence order, Natco v Bayer (2012)", url: "https://ipindia.gov.in/" };
const WHO_EML: Src = { label: "WHO Model Lists of Essential Medicines (24th list, September 2025)", url: "https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists" };
const PAHO_SF: Src = { label: "PAHO Strategic Fund", url: "https://www.paho.org/en/paho-strategic-fund" };
const ABI_FOOD: Src = { label: "Szmulewitz et al., JCO 2018: low-fat meal abiraterone", url: "https://doi.org/10.1200/JCO.2017.76.4381" };
const TATA_NIVO: Src = { label: "Patil et al., JCO 2023: low-dose nivolumab with triple metronomic chemotherapy", url: "https://doi.org/10.1200/JCO.22.01015" };
const PERSEPHONE: Src = { label: "Earl et al., Lancet 2019: PERSEPHONE", url: "https://doi.org/10.1016/S0140-6736(19)30650-6" };
const FAST_FORWARD: Src = { label: "Brunt et al., Lancet 2020: FAST-Forward", url: "https://doi.org/10.1016/S0140-6736(20)30932-6" };
const DRUGS_AT_FDA: Src = { label: "FDA: Drugs@FDA approved labels", url: "https://www.accessdata.fda.gov/scripts/cder/daf/" };
const ESMO_MCBS: Src = { label: "ESMO Magnitude of Clinical Benefit Scale", url: "https://www.esmo.org/guidelines/esmo-mcbs" };
const ASCO_VF: Src = { label: "Schnipper et al., JCO 2016: updating the ASCO Value Framework", url: "https://doi.org/10.1200/JCO.2016.68.2518" };
const ICER: Src = { label: "Institute for Clinical and Economic Review", url: "https://icer.org/" };
const COST_PLUS: Src = { label: "Mark Cuban Cost Plus Drug Company", url: "https://costplusdrugs.com/" };
const CIVICA: Src = { label: "Civica Rx", url: "https://civicarx.org/" };
const MEDICAID_TRIALS: Src = { label: "Medicaid.gov: coverage of routine patient costs in qualifying clinical trials (Clinical Treatment Act, effective January 2022)", url: "https://www.medicaid.gov/federal-policy-guidance/downloads/cib122921.pdf" };
const JW_JZ: Src = { label: "CMS: discarded drug refunds (JW and JZ modifiers)", url: "https://www.cms.gov/medicare/payment/part-b-drugs/discarded-drug-units" };
const CHOOSING_WISELY: Src = { label: "ASCO: Choosing Wisely recommendations", url: "https://www.asco.org/news-initiatives/current-initiatives/cancer-care-initiatives/choosing-wisely" };
const TELEHEALTH: Src = { label: "Medicare.gov: Telehealth", url: "https://www.medicare.gov/coverage/telehealth" };

export const COST_DRIVERS: CostDriver[] = [
  {
    id: "list-price-growth", name: "List prices rise at launch and every year after",
    mechanism: "Manufacturers set US launch prices freely and have raised them annually; coinsurance is a percentage of the list price, so the patient's bill rises with it even when the plan negotiates rebates.",
    beingDone: [
      { text: "Medicare negotiated its first prices, effective 2026: Imbruvica (ibrutinib) at $9,319 for a 30-day supply against a 2023 list price of $14,934. Xtandi, Pomalyst, Ibrance and Calquence have negotiated prices effective 2027.", year: 2026, source: CMS_NEG_2026 },
      { text: "Manufacturers must rebate Medicare when a Part B or Part D drug's price rises faster than inflation, under the Inflation Reduction Act of 2022.", year: 2023, source: { label: "CMS: Medicare Prescription Drug Inflation Rebate Program", url: "https://www.cms.gov/inflation-reduction-act-and-medicare/inflation-rebates-medicare" } },
      { text: "England pays through NICE appraisal and the Cancer Drugs Fund's managed access with confidential discounts; Australia lists only after PBAC finds a drug cost-effective, and patients pay A$25.00 per script (A$7.70 with a concession card) from 1 January 2026.", year: 2026, source: PBS_FEE },
      { text: "Value scales grade the benefit of each indication: ESMO-MCBS, the ASCO Value Framework and ICER's cost-effectiveness reviews.", year: 2016, source: ASCO_VF },
    ],
    ideas: ["idea-cost-indication-based-pricing", "idea-cost-inflation-rebates-commercial", "idea-cost-value-scale-in-coverage", "idea-cost-managed-access-everywhere"],
    bottlenecks: ["b-drug-pricing", "b-incentive-misalignment"],
    links: [CMS_SELECTED, ESMO_MCBS, ICER, CDF],
  },
  {
    id: "hospital-markups-340b", name: "Hospital markups and the 340B programme",
    mechanism: "The same infusion costs more in a hospital outpatient department than in a clinic, and Medicare's Part B add-on is a percentage of price. Hospitals in the 340B programme buy at deep discounts but bill at full price, and the GAO found they prescribed more and dearer Part B drugs than other hospitals.",
    beingDone: [
      { text: "The GAO reported that per-beneficiary Part B drug spending was substantially higher at 340B hospitals than at non-340B hospitals and recommended Congress act on the financial incentive.", year: 2015, source: GAO_340B },
      { text: "Hospitals must publish machine-readable standard charges and negotiated rates for every item and service, including cancer drugs and infusions.", year: 2021, source: PRICE_TRANSPARENCY },
      { text: "HRSA publishes 340B programme rules and ceiling prices; purchases at 340B prices reached $66.3 billion in 2023.", year: 2023, source: HRSA_340B },
    ],
    ideas: ["idea-cost-site-neutral-infusion", "idea-cost-asp-flat-fee", "idea-cost-340b-pass-through"],
    bottlenecks: ["b-drug-pricing", "b-incentive-misalignment", "b-care-fragmentation"],
  },
  {
    id: "biosimilar-uptake", name: "Biosimilars exist but are not always used",
    mechanism: "Copies of trastuzumab, bevacizumab, rituximab and pegfilgrastim are approved and cheaper, but the switch depends on the prescriber, the payer's preference and the purchasing contract lining up, and percentage-based payment rewards the dearer product.",
    beingDone: [
      { text: "IQVIA estimated biosimilars saved $56 billion in the United States over the decade to 2022 and projected $181 billion of savings over 2023 to 2027.", year: 2023, source: IQVIA_BIOSIM },
      { text: "FDA-approved biosimilars are listed in the Purple Book; interchangeable products may be substituted at the pharmacy under state law.", year: 2025, source: { label: "FDA: Biosimilars", url: "https://www.fda.gov/drugs/therapeutic-biologics-applications-bla/biosimilars" } },
    ],
    ideas: ["idea-cost-biosimilar-default-substitution", "idea-cost-interchangeable-oncology-biosimilars", "idea-cost-asp-flat-fee"],
    bottlenecks: ["b-drug-pricing", "b-knowledge-diffusion"],
  },
  {
    id: "generics-shortages", name: "Cheap generics that run short or cost patients too much",
    mechanism: "Old cytotoxics cost a few dollars a dose and run short because margins are thin; old oral drugs such as imatinib and abiraterone are cheap to buy yet can carry high specialty-tier coinsurance through insurance.",
    beingDone: [
      { text: "Mark Cuban Cost Plus Drug Company publishes acquisition cost plus a 15% markup and a pharmacy fee for each drug it sells, including oncology generics such as imatinib, abiraterone, anastrozole, letrozole and capecitabine.", year: 2025, source: COST_PLUS },
      { text: "Civica Rx, a hospital-owned non-profit manufacturer, supplies essential sterile injectables under long-term fixed-price contracts.", year: 2025, source: CIVICA },
      { text: "India's NPPA capped trade margins on 42 non-scheduled anticancer drugs at 30% in 2019; the 2012 compulsory licence on sorafenib set the precedent for generic entry before patent expiry.", year: 2019, source: NPPA },
      { text: "The WHO Model List of Essential Medicines (24th list, 2025) names the cancer medicines every health system should stock; the PAHO Strategic Fund pools purchasing for member states.", year: 2025, source: WHO_EML },
    ],
    ideas: ["idea-cost-transparent-generic-pricing", "idea-cost-nonprofit-generic-oncology", "idea-cost-pooled-procurement-essential", "idea-cost-voluntary-licensing-oncology"],
    bottlenecks: ["b-drug-pricing", "b-global-access", "b-generic-repurposing"],
    links: [IPINDIA, PAHO_SF],
  },
  {
    id: "dose-and-schedule", name: "Doses and courses set higher and longer than needed",
    mechanism: "Most cancer drug doses came from the highest dose tolerated in early trials, and adjuvant durations were fixed without duration-finding studies. Lower doses, longer intervals and shorter courses have matched outcomes wherever they have been tested.",
    beingDone: [
      { text: "The FDA's Project Optimus guidance, final in August 2024, requires sponsors to compare doses before approval rather than default to the maximum tolerated dose.", year: 2024, source: FDA_OPTIMUS },
      { text: "Abiraterone 250 mg with a low-fat meal was non-inferior to 1,000 mg fasting in a randomised trial.", year: 2018, source: ABI_FOOD },
      { text: "Nivolumab 20 mg every three weeks added to metronomic chemotherapy raised one-year overall survival from 16.3% to 43.4% in a randomised trial at Tata Memorial in patients who could not afford full-dose immunotherapy.", year: 2023, source: TATA_NIVO },
      { text: "PERSEPHONE: six months of adjuvant trastuzumab was non-inferior to twelve (four-year disease-free survival 89.4% versus 89.8%) in 4,089 women.", year: 2019, source: PERSEPHONE },
      { text: "FAST-Forward: 26 Gy in five fractions over one week was non-inferior to 40 Gy in fifteen fractions for breast radiotherapy.", year: 2020, source: FAST_FORWARD },
      { text: "Pembrolizumab 400 mg every six weeks, subcutaneous atezolizumab (2024), nivolumab (2024) and pembrolizumab (2025) are approved; each cuts chair time, visits and travel.", year: 2025, source: DRUGS_AT_FDA },
      { text: "Medicare requires manufacturers to refund discarded drug above 10% of a single-dose vial (JW and JZ modifiers), and NHS dose banding rounds doses to standard vial sizes.", year: 2023, source: JW_JZ },
    ],
    ideas: ["idea-cost-low-dose-abiraterone-food", "idea-cost-low-dose-immunotherapy-trials", "idea-cost-optimus-legacy-drugs", "idea-cost-extended-interval-default", "idea-cost-shorter-course-trials", "idea-cost-hypofractionation-payment", "idea-cost-subcutaneous-community", "idea-cost-vial-sharing-dose-rounding"],
    bottlenecks: ["b-dose-optimisation", "b-surgery-radiation-innovation", "b-toxicity-qol"],
  },
  {
    id: "oral-parity-gaps", name: "Pills cost patients more than infusions",
    mechanism: "Oral cancer drugs sit on the pharmacy benefit with percentage coinsurance on a specialty tier; infused drugs sit on the medical benefit with a copay. Self-funded employer plans are exempt from state parity laws.",
    beingDone: [
      { text: "Medicare Part D out-of-pocket spending is capped at $2,100 in 2026 ($2,000 in 2025), so the specialty-tier problem is bounded for Medicare patients.", year: 2026, source: PARTD_CAP },
      { text: "Forty-three states and the District of Columbia have oral parity laws for state-regulated plans; the federal Cancer Drug Parity Act would extend parity to self-funded plans.", year: 2023, source: PARITY_BILL },
    ],
    ideas: ["idea-cost-federal-oral-parity", "idea-cost-transparent-generic-pricing", "idea-cost-part-b-cap"],
    bottlenecks: ["b-drug-pricing", "b-regulatory-fragmentation"],
  },
  {
    id: "prior-authorisation", name: "Prior authorisation that mostly ends in approval",
    mechanism: "Every request costs practice staff time and delays treatment; when most denials that are appealed are overturned, the process is spending money to reach the answer it would have reached anyway.",
    beingDone: [
      { text: "Medicare Advantage insurers made nearly 53 million prior authorisation determinations in 2024, denied 7.7%, and overturned 80.7% of the denials that were appealed; only 11.5% of denials were appealed.", year: 2024, source: KFF_PA },
      { text: "CMS requires payers to offer electronic prior authorisation through FHIR interfaces and to decide urgent requests within 72 hours and standard requests within seven days, phased in from 2026.", year: 2024, source: CMS_0057 },
    ],
    ideas: ["idea-cost-gold-card-oncology", "idea-cost-real-time-pa-fhir", "idea-cost-value-scale-in-coverage"],
    bottlenecks: ["b-care-fragmentation", "b-workforce", "b-data-silos"],
  },
  {
    id: "financial-toxicity", name: "Financial toxicity",
    mechanism: "Bills, lost earnings and travel push people into debt, and people in debt skip doses and appointments. It is a treatment side effect with its own dose-response.",
    beingDone: [
      { text: "People with cancer in Washington State were 2.65 times more likely to file for bankruptcy than matched people without cancer.", year: 2013, source: RAMSEY_2013 },
      { text: "Manufacturer, charity and public assistance programmes exist for most products; OnCo's financial help browser lists them by country and product.", year: 2026, source: { label: "OnCo: financial help browser", url: "https://onco-umber.vercel.app/assistance/" } },
    ],
    ideas: ["idea-cost-financial-toxicity-screening", "idea-cost-part-b-cap", "idea-cost-federal-oral-parity"],
    bottlenecks: ["b-toxicity-qol", "b-patient-voice"],
  },
  {
    id: "travel", name: "Travel and time",
    mechanism: "Journeys to a distant centre, parking, hotels and days off work are real costs that no claims database records; for rural and low-income families they decide whether treatment is completed.",
    beingDone: [
      { text: "Medicare covers telehealth visits, including from home for many services, following the changes made permanent after 2020.", year: 2025, source: TELEHEALTH },
      { text: "Extended-interval and subcutaneous immunotherapy and one-week radiotherapy cut the number of journeys directly.", year: 2025, source: DRUGS_AT_FDA },
    ],
    ideas: ["idea-cost-travel-teleoncology", "idea-cost-extended-interval-default", "idea-cost-subcutaneous-community", "idea-cost-hypofractionation-payment"],
    bottlenecks: ["b-care-fragmentation", "b-global-access"],
  },
  {
    id: "end-of-life-intensity", name: "Intensive treatment in the last weeks of life",
    mechanism: "Chemotherapy in the final two weeks, late intensive-care admissions and late hospice referral are expensive, rarely help, and are what most patients say they do not want when asked early enough.",
    beingDone: [
      { text: "ASCO's Choosing Wisely list names cancer-directed therapy for patients with poor performance status and no benefit from prior treatment as care to avoid.", year: 2012, source: CHOOSING_WISELY },
    ],
    ideas: ["idea-cost-early-palliative-default"],
    bottlenecks: ["b-palliative", "b-toxicity-qol"],
  },
  {
    id: "trial-access", name: "Trials as a cost lever",
    mechanism: "In a trial the investigational drug is supplied free, and public and private payers are required to cover routine costs; enrolment lowers the bill for the patient and the payer while producing the evidence everyone needs.",
    beingDone: [
      { text: "State Medicaid programmes must cover routine patient costs in qualifying clinical trials from January 2022, joining Medicare (2000) and Affordable Care Act plans.", year: 2022, source: MEDICAID_TRIALS },
    ],
    ideas: ["idea-cost-trial-enrolment-cost-lever", "idea-cost-shorter-course-trials", "idea-cost-low-dose-immunotherapy-trials"],
    bottlenecks: ["b-trial-enrolment", "b-drug-pricing"],
  },
];
