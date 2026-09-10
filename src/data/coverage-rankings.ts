/**
 * Which plans cover cancer care best: the data behind /coverage/rankings/.
 *
 * Rules of the file. Nothing is scored or combined: every ranking on the page is "ranked by one published
 * metric", chosen by the reader. Every number carries the year it refers to and the document it comes from.
 * A plan with no published figure for a metric shows a blank, never an estimate. Metrics are published
 * per parent organisation (KFF prior-authorisation analysis, CMS Star Ratings, Senate PSI report), so the
 * rows are parent organisations and plan types, not individual plan products. Verify with the linked
 * document before relying on a figure; insurers, contracts and rules change every year.
 */

export type Src = { label: string; url: string };

/** A published number with the year it describes and where it was published. */
export type MetricValue = { value: number; year: number; source: Src; note?: string };
/** A published statement (a finding, a rule, a count) with year and source. */
export type Fact = { text: string; year: number; source: Src };

export type UsMetricKey = "paDenialRate" | "paPerMember" | "appealRate" | "overturnRate" | "maShare" | "fiveStarContracts";

export type UsMetric = {
  key: UsMetricKey;
  label: string;
  unit: "%" | "per member" | "contracts";
  /** Which direction reads as better for a person with cancer; "neutral" when the metric is descriptive. */
  betterWhen: "lower" | "higher" | "neutral";
  year: number;
  source: Src;
  description: string;
};

export type UsPlanRow = {
  id: string;
  name: string;
  kind: "Original Medicare" | "Medicare Advantage" | "National carrier" | "Blue plans" | "Integrated system" | "Medicaid";
  /** Who it covers, one line. */
  who: string;
  /** The plan's official oncology or medical-policy page (where prior-authorisation criteria are published). */
  policy: Src;
  metrics: Partial<Record<UsMetricKey, MetricValue>>;
  facts: Fact[];
};

const KFF_PA_2024: Src = { label: "KFF: Medicare Advantage insurers made nearly 53 million prior authorization determinations in 2024 (January 2026)", url: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" };
const KFF_ENROL_2025: Src = { label: "KFF: Medicare Advantage in 2025, enrollment update and key trends", url: "https://www.kff.org/medicare/medicare-advantage-in-2025-enrollment-update-and-key-trends/" };
const CMS_STARS_2025: Src = { label: "CMS fact sheet: 2025 Medicare Advantage and Part D Star Ratings (October 2024)", url: "https://www.cms.gov/newsroom/fact-sheets/2025-medicare-advantage-and-part-d-star-ratings" };
const PSI_2024: Src = { label: "US Senate Permanent Subcommittee on Investigations, majority staff report: Refusal of Recovery (October 2024)", url: "https://www.hsgac.senate.gov/wp-content/uploads/2024.10.17-PSI-Majority-Staff-Report-on-Medicare-Advantage.pdf" };
const OIG_2022: Src = { label: "HHS Office of Inspector General, OEI-09-18-00260 (April 2022)", url: "https://oig.hhs.gov/reports/all/2022/some-medicare-advantage-organization-denials-of-prior-authorization-requests-raise-concerns-about-beneficiary-access-to-medically-necessary-care/" };
const MEDICARE_CHEMO: Src = { label: "Medicare.gov: Chemotherapy", url: "https://www.medicare.gov/coverage/chemotherapy" };
const MEDICARE_PARTD_COSTS: Src = { label: "Medicare.gov: Costs for Medicare drug coverage", url: "https://www.medicare.gov/drug-coverage-part-d/costs-for-medicare-drug-coverage" };
const MEDIGAP: Src = { label: "Medicare.gov: Medigap (Medicare Supplement Insurance)", url: "https://www.medicare.gov/health-drug-plans/medigap" };
const MCD: Src = { label: "CMS Medicare Coverage Database (NCDs and LCDs)", url: "https://www.cms.gov/medicare-coverage-database/search.aspx" };
const CMS_2025_ANNOUNCEMENT: Src = { label: "CMS: 2025 Medicare Advantage and Part D Rate Announcement (April 2024)", url: "https://www.cms.gov/files/document/2025-announcement.pdf" };
const MACPAC_COST_SHARING: Src = { label: "MACPAC: Cost sharing in Medicaid", url: "https://www.macpac.gov/subtopic/cost-sharing/" };
const HEALTHCARE_GOV_OOP: Src = { label: "HealthCare.gov glossary: out-of-pocket maximum", url: "https://www.healthcare.gov/glossary/out-of-pocket-maximum-limit/" };
const CMS_NEGOTIATED_2026: Src = { label: "CMS fact sheet: negotiated prices for initial price applicability year 2026 (August 2024)", url: "https://www.cms.gov/newsroom/fact-sheets/medicare-drug-price-negotiation-program-negotiated-prices-initial-price-applicability-year-2026" };
const CMS_SELECTED_DRUGS: Src = { label: "CMS: selected drugs and negotiated prices (2026 and 2027)", url: "https://www.cms.gov/initiatives/medicare-prescription-drug-affordability/overview/medicare-drug-price-negotiation-program/selected-drugs-negotiated-prices" };
const NCQA_RATINGS: Src = { label: "NCQA Health Plan Ratings (report cards, updated each autumn)", url: "https://reportcards.ncqa.org/health-plans" };
const NCI_CENTRES: Src = { label: "NCI: NCI-Designated Cancer Centers", url: "https://www.cancer.gov/research/infrastructure/cancer-centers" };
const ACS_CAN_PARITY: Src = { label: "American Cancer Society Cancer Action Network: oral chemotherapy fairness", url: "https://www.fightcancer.org/policy-resources/oral-chemotherapy-fairness" };
const PARITY_BILL: Src = { label: "Congress.gov: Cancer Drug Parity Act, H.R. 1730 (118th Congress)", url: "https://www.congress.gov/bill/118th-congress/house-bill/1730" };

/** The metrics a reader can rank by. Each is a single published measure; none is combined with another. */
export const US_METRICS: UsMetric[] = [
  { key: "paDenialRate", label: "Prior authorisation denial rate", unit: "%", betterWhen: "lower", year: 2024, source: KFF_PA_2024, description: "Share of Medicare Advantage prior authorisation requests the insurer denied in full or in part in 2024, from CMS data analysed by KFF. Covers all services, not only cancer care." },
  { key: "paPerMember", label: "Prior authorisation requests per member", unit: "per member", betterWhen: "lower", year: 2024, source: KFF_PA_2024, description: "How many prior authorisation determinations the insurer made per Medicare Advantage member in 2024. A low number means fewer services need permission first." },
  { key: "appealRate", label: "Share of denials appealed", unit: "%", betterWhen: "neutral", year: 2024, source: KFF_PA_2024, description: "Share of denied requests that members or clinicians appealed in 2024. Low appeal rates can mean clear denials or an appeals process people give up on; read with the overturn rate." },
  { key: "overturnRate", label: "Share of appeals overturned", unit: "%", betterWhen: "higher", year: 2024, source: KFF_PA_2024, description: "Share of appealed denials that the insurer reversed in full or in part in 2024. A high figure means the original denial was often wrong; a plan that appears here with a lower figure may simply deny less." },
  { key: "maShare", label: "Share of Medicare Advantage enrolment", unit: "%", betterWhen: "neutral", year: 2025, source: KFF_ENROL_2025, description: "The insurer's share of all Medicare Advantage members in 2025 (KFF). Descriptive: it says how many people the plan's oncology rules affect, not how good they are." },
  { key: "fiveStarContracts", label: "Five-star Medicare Advantage contracts", unit: "contracts", betterWhen: "higher", year: 2025, source: CMS_STARS_2025, description: "Number of the insurer's Medicare Advantage prescription drug contracts rated 5 stars by CMS for 2025 (7 contracts nationally). Star Ratings measure quality and member experience across all conditions." },
];

export const US_PLANS: UsPlanRow[] = [
  {
    id: "original-medicare-medigap", name: "Original Medicare with Medigap", kind: "Original Medicare",
    who: "People 65 and over, or with a qualifying disability, who keep Parts A and B and buy a Medigap supplement for the 20% coinsurance.",
    policy: MCD,
    metrics: {},
    facts: [
      { text: "Part B pays 80% of the Medicare-approved amount for clinician-administered chemotherapy; the patient owes 20% with no annual cap unless a Medigap policy pays it.", year: 2025, source: MEDICARE_CHEMO },
      { text: "Medigap policies are standardised by letter; Plans G and N cover the Part B coinsurance in full, so the drug cost to the patient is the premium.", year: 2025, source: MEDIGAP },
      { text: "Any provider that accepts Medicare can be used without a network or referral, including the NCI-Designated Cancer Centers that treat patients (66 of the 74 are comprehensive or clinical centres).", year: 2025, source: NCI_CENTRES },
      { text: "Coverage rules are national coverage determinations and local coverage determinations, published for anyone to read, rather than proprietary plan policies.", year: 2025, source: MCD },
    ],
  },
  {
    id: "medicare-advantage-all", name: "Medicare Advantage (all insurers)", kind: "Medicare Advantage",
    who: "The private-plan alternative to Original Medicare; more than half of eligible beneficiaries in 2025. Same benefit categories, plus networks, prior authorisation and an out-of-pocket cap.",
    policy: { label: "Medicare.gov: Medicare Advantage plans", url: "https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/medicare-advantage-plans" },
    metrics: {
      paDenialRate: { value: 7.7, year: 2024, source: KFF_PA_2024, note: "Nearly 53 million determinations across all insurers." },
      appealRate: { value: 11.5, year: 2024, source: KFF_PA_2024 },
      overturnRate: { value: 80.7, year: 2024, source: KFF_PA_2024 },
    },
    facts: [
      { text: "About 62% of members were in contracts rated 4 stars or higher for 2025, weighted by enrolment.", year: 2025, source: CMS_STARS_2025 },
      { text: "In a 2019 sample, 13% of prior authorisation denials and 18% of payment denials met Medicare coverage rules and would have been paid by Original Medicare.", year: 2022, source: OIG_2022 },
      { text: "Every plan must cap in-network out-of-pocket spending for Part A and B services; CMS set the mandatory in-network limit at $9,350 for 2025.", year: 2025, source: CMS_2025_ANNOUNCEMENT },
    ],
  },
  {
    id: "unitedhealthcare", name: "UnitedHealthcare (UnitedHealth Group)", kind: "National carrier",
    who: "Largest Medicare Advantage insurer and a major employer and individual carrier; oncology criteria published as medical and drug policies.",
    policy: { label: "UnitedHealthcare provider policies and protocols (medical, drug and Medicare Advantage policies)", url: "https://www.uhcprovider.com/en/policies-protocols.html" },
    metrics: {
      paDenialRate: { value: 12.8, year: 2024, source: KFF_PA_2024 },
      paPerMember: { value: 1.0, year: 2024, source: KFF_PA_2024 },
      maShare: { value: 29, year: 2025, source: KFF_ENROL_2025 },
    },
    facts: [
      { text: "The Senate PSI report found UnitedHealthcare's prior authorisation denial rate for post-acute care rose from 10.9% in 2020 to 22.7% in 2022, while its overall denial rate stayed flat.", year: 2024, source: PSI_2024 },
    ],
  },
  {
    id: "humana", name: "Humana", kind: "National carrier",
    who: "Second-largest Medicare Advantage insurer; little commercial business. Oncology requests are reviewed against published medical coverage policies.",
    policy: { label: "Humana medical coverage policies", url: "https://www.humana.com/provider/medical-resources/clinical/medical-coverage-policies" },
    metrics: {
      paDenialRate: { value: 5.8, year: 2024, source: KFF_PA_2024 },
      paPerMember: { value: 2.2, year: 2024, source: KFF_PA_2024 },
      maShare: { value: 18, year: 2025, source: KFF_ENROL_2025 },
    },
    facts: [
      { text: "The Senate PSI report found Humana's 2022 denial rate for long-term acute care hospital stays was about sixteen times its overall prior authorisation denial rate.", year: 2024, source: PSI_2024 },
    ],
  },
  {
    id: "cvs-aetna", name: "Aetna (CVS Health)", kind: "National carrier",
    who: "Medicare Advantage, employer and individual plans; the CVS Caremark pharmacy benefit manager sits in the same group. Oncology criteria are Clinical Policy Bulletins.",
    policy: { label: "Aetna Clinical Policy Bulletins (medical and pharmacy)", url: "https://www.aetna.com/health-care-professionals/clinical-policy-bulletins.html" },
    metrics: {
      appealRate: { value: 19.9, year: 2024, source: KFF_PA_2024, note: "Highest appeal rate among the large insurers in the KFF analysis." },
      maShare: { value: 12, year: 2025, source: KFF_ENROL_2025 },
    },
    facts: [
      { text: "The Senate PSI report found CVS's 2022 prior authorisation denial rate for post-acute care was about three times its overall denial rate.", year: 2024, source: PSI_2024 },
    ],
  },
  {
    id: "elevance", name: "Elevance Health (Anthem Blue Cross Blue Shield plans)", kind: "National carrier",
    who: "Anthem-branded Blue plans in 14 states plus Medicaid and Medicare Advantage subsidiaries; oncology reviews often run through its Carelon subsidiary.",
    policy: { label: "Anthem clinical UM guidelines and medical policies", url: "https://www.anthem.com/provider/policies/clinical-guidelines/" },
    metrics: {
      paDenialRate: { value: 4.2, year: 2024, source: KFF_PA_2024, note: "Lowest denial rate among the large insurers in the KFF analysis." },
      paPerMember: { value: 3.0, year: 2024, source: KFF_PA_2024 },
      maShare: { value: 7, year: 2025, source: KFF_ENROL_2025 },
      fiveStarContracts: { value: 2, year: 2025, source: CMS_STARS_2025, note: "Healthsun Health Plans and Optimum Healthcare, both Florida." },
    },
    facts: [],
  },
  {
    id: "cigna", name: "Cigna Healthcare", kind: "National carrier",
    who: "Employer and individual plans; oncology drug criteria published as coverage policies. Not part of the Medicare Advantage analyses on this page.",
    policy: { label: "Cigna coverage policies (medical and drug)", url: "https://static.cigna.com/assets/chcp/resourceLibrary/coveragePolicies/index.html" },
    metrics: {},
    facts: [],
  },
  {
    id: "kaiser-permanente", name: "Kaiser Permanente", kind: "Integrated system",
    who: "Insurer and delivery system in one: members are treated by Permanente Medical Group oncologists in Kaiser hospitals, so far fewer requests go through prior authorisation.",
    policy: { label: "Kaiser Permanente clinical review criteria (Washington provider manual)", url: "https://wa-provider.kaiserpermanente.org/provider-manual/clinical-review/criteria" },
    metrics: {
      paPerMember: { value: 0.6, year: 2024, source: KFF_PA_2024, note: "Fewest requests per member among the large insurers." },
      appealRate: { value: 1.6, year: 2024, source: KFF_PA_2024 },
      overturnRate: { value: 51.0, year: 2024, source: KFF_PA_2024 },
      maShare: { value: 6, year: 2025, source: KFF_ENROL_2025 },
    },
    facts: [
      { text: "Kaiser Foundation Health Plan contracts are rated by NCQA each year; the report card lists each regional plan separately.", year: 2025, source: NCQA_RATINGS },
    ],
  },
  {
    id: "centene", name: "Centene (WellCare, Ambetter, state Medicaid plans)", kind: "National carrier",
    who: "Largest Medicaid managed-care insurer and the largest Marketplace (Ambetter) insurer, plus WellCare Medicare Advantage.",
    policy: { label: "WellCare clinical coverage guidelines", url: "https://www.wellcare.com/en/Providers/Clinical-Coverage-Guidelines" },
    metrics: {
      paDenialRate: { value: 12.3, year: 2024, source: KFF_PA_2024 },
      paPerMember: { value: 2.9, year: 2024, source: KFF_PA_2024 },
      maShare: { value: 4, year: 2025, source: KFF_ENROL_2025 },
    },
    facts: [],
  },
  {
    id: "bcbs-plans", name: "Blue Cross Blue Shield plans (independent Blues)", kind: "Blue plans",
    who: "Thirty-three independent licensees (Health Care Service Corporation, Highmark, Florida Blue and others) with their own medical policies; Anthem's Blues are counted under Elevance.",
    policy: { label: "Blue Cross Blue Shield Association: find your local plan's medical policies", url: "https://www.bcbs.com/" },
    metrics: {
      maShare: { value: 14, year: 2025, source: KFF_ENROL_2025, note: "All Blue plans combined, including Anthem." },
      fiveStarContracts: { value: 1, year: 2025, source: CMS_STARS_2025, note: "Highmark Choice Company (Highmark Health)." },
    },
    facts: [],
  },
  {
    id: "medicaid", name: "Medicaid (state programmes and managed-care plans)", kind: "Medicaid",
    who: "Low-income adults and children, with eligibility set by each state. Cancer drugs on the state formulary or preferred drug list; most states contract managed-care organisations.",
    policy: { label: "Medicaid.gov: prescription drugs", url: "https://www.medicaid.gov/medicaid/prescription-drugs/index.html" },
    metrics: {},
    facts: [
      { text: "Federal rules limit Medicaid premiums and cost sharing for a household to 5% of family income, with nominal copayments for most services.", year: 2014, source: MACPAC_COST_SHARING },
    ],
  },
];

/** Rules that apply to everyone in a category, whichever plan they hold. Each carries the year it applies to. */
export const US_RULES: Fact[] = [
  { text: "Marketplace and most employer plans: the annual out-of-pocket maximum for in-network care is $10,600 for one person and $21,200 for a family in 2026 (it was $9,200 and $18,400 in 2025; it rises to $12,000 and $24,000 in 2027).", year: 2026, source: HEALTHCARE_GOV_OOP },
  { text: "Medicare Part D: out-of-pocket spending on covered drugs is capped at $2,100 in 2026 ($2,000 in 2025), under the Inflation Reduction Act of 2022; oral cancer drugs taken at home are Part D drugs.", year: 2026, source: MEDICARE_PARTD_COSTS },
  { text: "Original Medicare Part B: 20% coinsurance on clinician-administered cancer drugs with no cap; a Medigap policy or Medicaid pays it for those who have one.", year: 2025, source: MEDICARE_CHEMO },
  { text: "Medicare Advantage: every plan must cap in-network out-of-pocket spending on Part A and B services; the CMS mandatory limit was $9,350 for 2025.", year: 2025, source: CMS_2025_ANNOUNCEMENT },
  { text: "Medicare price negotiation: the first negotiated prices took effect in 2026 and include Imbruvica (ibrutinib) at $9,319 for a 30-day supply against a 2023 list price of $14,934; prices for Xtandi, Pomalyst, Ibrance and Calquence take effect in 2027.", year: 2026, source: CMS_NEGOTIATED_2026 },
  { text: "Oral chemotherapy parity: 43 states and the District of Columbia require state-regulated plans to cover oral anticancer drugs on terms no less favourable than infused drugs; self-funded employer plans are exempt, which is why the federal Cancer Drug Parity Act keeps being reintroduced.", year: 2023, source: ACS_CAN_PARITY },
  { text: "Medicaid: household premiums and cost sharing may not exceed 5% of family income; copayments are nominal.", year: 2014, source: MACPAC_COST_SHARING },
  { text: "Medicare Advantage denials: 13% of prior authorisation denials sampled by the HHS Inspector General met Medicare coverage rules; 80.7% of denials that were appealed in 2024 were overturned.", year: 2024, source: KFF_PA_2024 },
];

/** Extra sources named on the page. */
export const US_EXTRA_SOURCES: Src[] = [OIG_2022, PSI_2024, CMS_SELECTED_DRUGS, NCQA_RATINGS, PARITY_BILL, NCI_CENTRES];

/** How Medicare pays for a cancer drug or service, and where the public price files are. Figures only with year and source. */
export const PAYMENT_MECHANICS: Fact[] = [
  { text: "Part B pays for clinician-administered drugs at the average sales price plus 6%, published quarterly in the ASP pricing files; the patient's 20% coinsurance is 20% of that amount.", year: 2025, source: { label: "CMS: ASP pricing files (Part B drugs)", url: "https://www.cms.gov/medicare/payment/part-b-drugs/asp-pricing-files" } },
  { text: "Infusion, imaging and radiotherapy delivered in a clinic are priced by the Medicare Physician Fee Schedule; the same service in a hospital outpatient department is priced by the Outpatient Prospective Payment System, usually higher.", year: 2025, source: { label: "CMS: Physician Fee Schedule look-up tool", url: "https://www.cms.gov/medicare/physician-fee-schedule/search" } },
  { text: "Hospitals must publish machine-readable files of their standard charges and negotiated rates for every item and service, including cancer drugs and infusions.", year: 2021, source: { label: "CMS: Hospital Price Transparency", url: "https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency" } },
  { text: "Part D plans place oral cancer drugs on a specialty tier with coinsurance of 25% to 33% until the annual cap is reached, then pay in full.", year: 2026, source: MEDICARE_PARTD_COSTS },
];

/* ───────────────────────── United Kingdom: NHS entitlement versus private medical insurance ───────────────────────── */

export type UkPlanRow = {
  id: string;
  name: string;
  kind: "NHS" | "Private medical insurance";
  /** How cancer treatment is paid for under this route, in plain words. */
  cancerCover: string;
  /** Time or money limits on cancer cover as the insurer describes them. */
  limits: string;
  /** Options that change the cancer cover (NHS top-up cover, reduced cover, upgrades). */
  options: string;
  /** The insurer's own cancer-cover page or policy documents. */
  docs: Src;
  year: number;
  note?: string;
};

export const UK_ABI: Src = { label: "Association of British Insurers: private medical insurance", url: "https://www.abi.org.uk/" };

export const UK_PLANS: UkPlanRow[] = [
  {
    id: "nhs", name: "NHS (England, Scotland, Wales, Northern Ireland)", kind: "NHS",
    cancerCover: "Free at the point of use for diagnosis, surgery, radiotherapy, chemotherapy and any drug NICE (or the SMC in Scotland) has recommended for the indication. Drugs NICE has not recommended are available only through the Cancer Drugs Fund, an individual funding request or a trial.",
    limits: "No financial or time limit on funded treatment. In England, people being treated for cancer are exempt from prescription charges with a medical exemption certificate; prescriptions are free in Scotland, Wales and Northern Ireland.",
    options: "Private medical insurance can run alongside NHS care; several insurers sell cover that pays only for treatment the NHS will not fund.",
    docs: { label: "NHS Business Services Authority: medical exemption certificates", url: "https://www.nhsbsa.nhs.uk/help-nhs-prescription-costs/medical-exemption-certificates" },
    year: 2026,
    note: "See What the NHS offers for the NICE and Cancer Drugs Fund record of every product.",
  },
  {
    id: "bupa", name: "Bupa UK", kind: "Private medical insurance",
    cancerCover: "Comprehensive policies include cancer cover: diagnosis, surgery, radiotherapy, chemotherapy and licensed drugs including biological and targeted therapies, in Bupa's network of consultants and hospitals.",
    limits: "Bupa describes its cancer cover as having no time limit and no financial limit on eligible treatment for as long as the policy is held; check the policy wording for exclusions such as pre-existing conditions and experimental treatment.",
    options: "NHS Cancer Cover Plus: the NHS provides treatment and Bupa pays for licensed cancer drugs or radiotherapy the NHS will not fund for the member, at a lower premium.",
    docs: { label: "Bupa: health insurance and cancer cover", url: "https://www.bupa.co.uk/health/health-insurance" },
    year: 2026,
  },
  {
    id: "axa-health", name: "AXA Health", kind: "Private medical insurance",
    cancerCover: "Personal Health policies include full cancer cover as standard: diagnosis, surgery, radiotherapy, chemotherapy, licensed drugs and reconstructive surgery, with hospital and consultant options set at quote.",
    limits: "Full cancer cover is described without a financial cap on eligible treatment; exclusions and the hospital list are in the policy handbook.",
    options: "NHS cancer support: NHS treatment with AXA paying for licensed cancer drugs or treatments the NHS does not fund, plus a cash benefit for NHS stays, at a reduced premium.",
    docs: { label: "AXA Health: health insurance", url: "https://www.axahealth.co.uk/health-insurance/" },
    year: 2026,
  },
  {
    id: "aviva", name: "Aviva", kind: "Private medical insurance",
    cancerCover: "Healthier Solutions includes cancer cover as standard: diagnosis, treatment and licensed drugs, with out-patient and hospital options chosen at quote.",
    limits: "Aviva publishes its cancer-cover terms in the policy wording; check the current document for limits and the position on unlicensed or experimental treatment.",
    options: "Out-patient limits and hospital lists can be varied to reduce premiums; the cancer pathway itself is set out in the policy wording.",
    docs: { label: "Aviva: private health insurance", url: "https://www.aviva.co.uk/health/health-products/health-insurance/" },
    year: 2026,
  },
  {
    id: "vitality", name: "Vitality", kind: "Private medical insurance",
    cancerCover: "Personal Healthcare includes Full Cancer Cover as standard: diagnosis, surgery, radiotherapy, chemotherapy and biological therapies for as long as the consultant recommends them.",
    limits: "Vitality describes Full Cancer Cover as having no limits on biological therapies; see the plan guide for the definition of eligible treatment.",
    options: "Advanced Cancer Cover: an optional upgrade that widens cover to certain treatments and drugs outside the standard definition; the plan guide sets out what qualifies.",
    docs: { label: "Vitality: health insurance", url: "https://www.vitality.co.uk/health-insurance/" },
    year: 2026,
  },
];

/* ───────────────────────── International: how cancer drugs are paid for ───────────────────────── */

export type IntlRow = {
  id: string;
  country: string;
  region?: "US" | "UK" | "EU" | "JP" | "CN" | "AU";
  /** Who pays and how prices are set, one or two sentences. */
  model: string;
  /** What the patient typically pays, as stated by the source. */
  patientShare: string;
  /** Body that decides whether a new drug is funded. */
  decider: string;
  year: number;
  source: Src;
};

export const INTL_ROWS: IntlRow[] = [
  { id: "us", country: "United States", region: "US", model: "Mixed: Medicare (Part B for infused drugs at ASP+6%, Part D for oral drugs), Medicaid, employer and Marketplace plans; list prices set by manufacturers, with Medicare negotiation for selected drugs from 2026.", patientShare: "Part B: 20% coinsurance, uncapped without Medigap. Part D: capped at $2,100 in 2026. Marketplace plans: out-of-pocket maximum $10,600 in 2026.", decider: "Each payer; CMS national and local coverage determinations for Medicare.", year: 2026, source: MEDICARE_PARTD_COSTS },
  { id: "uk", country: "United Kingdom", region: "UK", model: "Tax-funded NHS. NICE appraises cost-effectiveness against a threshold; a recommendation obliges NHS England to fund within 90 days. Uncertain drugs enter the Cancer Drugs Fund under managed access (since 29 July 2016).", patientShare: "Nothing at the point of use; cancer patients in England are exempt from prescription charges.", decider: "NICE (England, Wales, Northern Ireland); SMC (Scotland).", year: 2026, source: { label: "NHS England: Cancer Drugs Fund", url: "https://www.england.nhs.uk/cancer/cdf/" } },
  { id: "germany", country: "Germany", region: "EU", model: "Statutory health insurance (GKV) covers about 90% of residents. New drugs are reimbursed from launch at the manufacturer's price; the G-BA assesses added benefit within a year (AMNOG) and the price is then negotiated.", patientShare: "10% of the pack price, minimum 5 euros and maximum 10 euros, with all co-payments capped at 2% of gross household income a year (1% for people with a chronic illness).", decider: "Gemeinsamer Bundesausschuss (G-BA) with IQWiG assessments.", year: 2025, source: { label: "Gemeinsamer Bundesausschuss: benefit assessment of medicinal products (AMNOG)", url: "https://www.g-ba.de/english/benefitassessment/" } },
  { id: "france", country: "France", region: "EU", model: "Statutory health insurance (Assurance Maladie). HAS rates clinical benefit (ASMR) and CEPS negotiates the price; early access allows funded use before pricing is settled.", patientShare: "Cancer is a long-term condition (ALD); care related to it is reimbursed at 100% of the statutory tariff, so the patient pays nothing for listed treatment.", decider: "Haute Autorité de Santé (HAS) and the Comité économique des produits de santé (CEPS).", year: 2025, source: { label: "Assurance Maladie: affection de longue durée (ALD)", url: "https://www.ameli.fr/" } },
  { id: "japan", country: "Japan", region: "JP", model: "Universal statutory insurance; every approved drug is listed on the national price list within about 60 to 90 days at a price set by the ministry, then revised down over time.", patientShare: "30% coinsurance for working-age adults (10% to 20% over 70), with the High-Cost Medical Expense Benefit capping monthly out-of-pocket spending by income band.", decider: "Ministry of Health, Labour and Welfare with the Central Social Insurance Medical Council (Chuikyo).", year: 2025, source: { label: "MHLW: High-Cost Medical Expense Benefit", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html" } },
  { id: "australia", country: "Australia", region: "AU", model: "Pharmaceutical Benefits Scheme subsidises listed drugs after PBAC finds them cost-effective; chemotherapy given in public hospitals is free under Medicare.", patientShare: "PBS co-payment of A$25.00 per prescription for general patients and A$7.70 for concession-card holders from 1 January 2026, with a safety net after which scripts are cheaper or free.", decider: "Pharmaceutical Benefits Advisory Committee (PBAC).", year: 2026, source: { label: "PBS: patient co-payment and safety net", url: "https://www.pbs.gov.au/info/healthpro/explanatory-notes/front/fee" } },
  { id: "canada", country: "Canada", model: "Provincial single-payer systems fund drugs given in hospital or cancer centre. Canada's Drug Agency (formerly CADTH) reviews new drugs and the pan-Canadian Pharmaceutical Alliance negotiates one price; each province then decides to list.", patientShare: "Nothing for hospital-administered drugs. Take-home oral drugs depend on the province: fully funded in the west, partly through public plans with deductibles or private insurance elsewhere.", decider: "Canada's Drug Agency (reviews) and the pan-Canadian Pharmaceutical Alliance (prices); provinces list.", year: 2025, source: { label: "Canada's Drug Agency: reimbursement reviews", url: "https://www.cda-amc.ca/" } },
  { id: "india", country: "India", model: "Mostly out-of-pocket, with public hospitals charging little and Ayushman Bharat PM-JAY paying hospitals for cancer packages for the poorest 40% of the population. Prices are controlled by the NPPA, which capped trade margins on 42 anticancer drugs at 30% in 2019; a compulsory licence on sorafenib (2012) is the landmark precedent.", patientShare: "PM-JAY covers hospital treatment up to 5 lakh rupees per family per year; outside it, patients pay the price of the drug, so generics and manufacturer programmes decide access.", decider: "NPPA for prices; state and PM-JAY schemes for funding; CDSCO for approval.", year: 2025, source: { label: "National Health Authority: PM-JAY", url: "https://nha.gov.in/PM-JAY" } },
  { id: "china", country: "China", region: "CN", model: "Basic medical insurance covers nearly everyone. The National Healthcare Security Administration negotiates prices for the National Reimbursement Drug List every year, and volume-based procurement sets prices for off-patent drugs.", patientShare: "Once listed, insurance reimburses a share that varies by province and by whether the drug is inpatient or outpatient; before listing the patient pays the full price, which is why the annual negotiation matters.", decider: "National Healthcare Security Administration (NHSA).", year: 2025, source: { label: "National Healthcare Security Administration", url: "https://www.nhsa.gov.cn/" } },
];
