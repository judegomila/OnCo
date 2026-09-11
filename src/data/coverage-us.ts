/**
 * US insurance coverage for approved cancer treatments and tests.
 *
 * One record per product: which part of Medicare pays (Part B for drugs a clinician administers,
 * Part D for drugs the patient takes at home), the usual commercial-insurance pattern, a list price
 * only where a real published figure exists, and manufacturer or charity assistance programmes.
 *
 * Rules of the file: nothing is invented. `listPriceUsd` appears only with a source and a year.
 * Medicare notes reflect Original Medicare; Medicare Advantage plans follow the same benefit
 * categories but may add prior authorisation, step therapy and network rules. Commercial patterns
 * describe what large PBMs and insurers typically do; individual plans differ. Not medical or
 * financial advice: verify with the plan.
 */

export type UsCoverage = {
  drugId: string;
  medicare: { part: "B" | "D" | "B or D" | "not covered" | "unknown"; note: string; ncd?: string; url?: string };
  commercial: { typical: "covered on label" | "covered with prior authorisation" | "step therapy common" | "variable" | "unknown"; note: string };
  listPriceUsd?: { value: number; per: string; source: string; url?: string; year: number };
  patientAssistance?: Array<{ program: string; url: string; note?: string }>;
  oopNote?: string;
  sources: Array<{ label: string; url: string }>;
};

type Src = { label: string; url: string };
type Pap = { program: string; url: string; note?: string };
type Part = UsCoverage["medicare"]["part"];
type Typical = UsCoverage["commercial"]["typical"];

/** Shared, durable sources. */
const SRC = {
  chemo: { label: "Medicare.gov: Chemotherapy", url: "https://www.medicare.gov/coverage/chemotherapy" },
  outpatientDrugs: { label: "Medicare.gov: Prescription drugs (outpatient, Part B)", url: "https://www.medicare.gov/coverage/prescription-drugs-outpatient" },
  partD: { label: "Medicare.gov: Drug coverage (Part D)", url: "https://www.medicare.gov/drug-coverage-part-d" },
  partDCosts: { label: "Medicare.gov: Costs for Medicare drug coverage (annual out-of-pocket cap)", url: "https://www.medicare.gov/drug-coverage-part-d/costs-for-medicare-drug-coverage" },
  mcd: { label: "CMS Medicare Coverage Database (NCDs and LCDs)", url: "https://www.cms.gov/medicare-coverage-database/search.aspx" },
  carT: { label: "CMS NCD 110.24: Chimeric antigen receptor (CAR) T-cell therapy", url: "https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=374" },
  ngs: { label: "CMS NCD 90.2: Next generation sequencing for patients with advanced cancer", url: "https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=372" },
  negotiation: { label: "CMS: Medicare Drug Price Negotiation Program", url: "https://www.cms.gov/inflation-reduction-act-and-medicare/medicare-drug-price-negotiation" },
  negotiated2026: { label: "CMS fact sheet: negotiated prices for 2026 (August 2024)", url: "https://www.cms.gov/newsroom/fact-sheets/medicare-drug-price-negotiation-program-negotiated-prices-initial-price-applicability-year-2026" },
  biosimilars: { label: "FDA: Biosimilars", url: "https://www.fda.gov/drugs/therapeutic-biologics-applications-bla/biosimilars" },
  imaging: { label: "Medicare.gov: Diagnostic non-laboratory tests (imaging)", url: "https://www.medicare.gov/coverage/diagnostic-non-laboratory-tests" },
  labs: { label: "Medicare.gov: Clinical laboratory tests", url: "https://www.medicare.gov/coverage/clinical-laboratory-tests" },
  dme: { label: "Medicare.gov: Durable medical equipment", url: "https://www.medicare.gov/coverage/durable-medical-equipment-dme-coverage" },
  crcScreen: { label: "Medicare.gov: Colorectal cancer screenings", url: "https://www.medicare.gov/coverage/colorectal-cancer-screenings" },
  vaccines: { label: "Medicare.gov: Vaccines covered by Part D at no cost", url: "https://www.medicare.gov/coverage/vaccines" },
  inpatient: { label: "Medicare.gov: Inpatient hospital care (Part A)", url: "https://www.medicare.gov/coverage/inpatient-hospital-care" },
  fdaLabel: { label: "FDA: Drugs@FDA approved labels", url: "https://www.accessdata.fda.gov/scripts/cder/daf/" },
} satisfies Record<string, Src>;

/** Manufacturer access and assistance programmes (hub services, co-pay help for commercially insured patients, free-drug foundations). Medicare patients cannot use manufacturer co-pay cards; foundations and independent charities are the route. */
const PAP = {
  merck: [{ program: "Merck Access Program", url: "https://www.merckaccessprogram.com/" }, { program: "Merck Patient Assistance Program", url: "https://www.merckhelps.com/", note: "Free medicine for eligible uninsured or underinsured patients." }],
  bms: [{ program: "BMS Access Support", url: "https://www.bmsaccesssupport.com/" }, { program: "Bristol Myers Squibb Patient Assistance Foundation", url: "https://www.bmspaf.org/" }],
  genentech: [{ program: "Genentech Access Solutions", url: "https://www.genentech-access.com/" }, { program: "Genentech Patient Foundation", url: "https://www.gene.com/patients/patient-foundation", note: "Free medicine for eligible patients regardless of insurance type." }],
  az: [{ program: "AstraZeneca Access 360", url: "https://www.myaccess360.com/" }, { program: "AZ&Me Prescription Savings", url: "https://www.azandmeapp.com/" }],
  pfizer: [{ program: "Pfizer Oncology Together", url: "https://www.pfizeroncologytogether.com/" }, { program: "Pfizer RxPathways", url: "https://www.pfizerrxpathways.com/" }],
  novartis: [{ program: "Novartis Patient Support (Patient Assistance NOW Oncology)", url: "https://www.patientassistancenow.com/" }],
  lilly: [{ program: "Lilly Cares Foundation", url: "https://www.lillycares.com/" }],
  jnj: [{ program: "Johnson & Johnson withMe", url: "https://www.jnjwithme.com/" }, { program: "Johnson & Johnson Patient Assistance Foundation", url: "https://www.jjpaf.org/" }],
  abbvie: [{ program: "myAbbVie Assist", url: "https://www.abbvie.com/patients/patient-assistance.html" }],
  amgen: [{ program: "Amgen SupportPlus", url: "https://www.amgensupportplus.com/" }, { program: "Amgen Safety Net Foundation", url: "https://www.amgensafetynetfoundation.com/" }],
  kite: [{ program: "Kite Konnect", url: "https://www.kitekonnect.com/" }],
  gilead: [{ program: "Gilead Advancing Access", url: "https://www.gileadadvancingaccess.com/" }],
  takeda: [{ program: "Takeda Oncology Here2Assist", url: "https://www.here2assist.com/" }],
  bayer: [{ program: "Bayer US Patient Assistance Foundation", url: "https://www.patientassistance.bayer.us/" }],
  seagen: [{ program: "Seagen Secure (Pfizer)", url: "https://www.seagensecure.com/" }],
  enhertu: [{ program: "ENHERTU4U (Daiichi Sankyo / AstraZeneca)", url: "https://www.enhertu4u.com/" }],
  regeneron: [{ program: "Libtayo Surround", url: "https://www.libtayosurround.com/" }],
  incyte: [{ program: "IncyteCARES", url: "https://www.incytecares.com/" }],
  beigene: [{ program: "myBeiGene", url: "https://www.mybeigene.com/" }],
  jazz: [{ program: "JazzCares", url: "https://www.jazzcares.com/" }],
  gsk: [{ program: "Together with GSK Oncology", url: "https://www.togetherwithgskoncology.com/" }],
  servier: [{ program: "ServierONE", url: "https://www.servierone.com/" }],
  sanofi: [{ program: "Sanofi CareASSIST", url: "https://www.sanoficareassist.com/" }],
  astellas: [{ program: "Astellas Pharma Support Solutions", url: "https://www.astellaspharmasupportsolutions.com/" }],
  blueprint: [{ program: "YourBlueprint", url: "https://www.yourblueprint.com/" }],
  deciphera: [{ program: "Deciphera AccessPoint", url: "https://www.decipheraaccesspoint.com/" }],
  ipsen: [{ program: "Ipsen Cares", url: "https://www.ipsencares.com/" }],
  eisai: [{ program: "Eisai Assistance Program", url: "https://www.eisaireimbursement.com/" }],
  karyopharm: [{ program: "KaryForward", url: "https://www.karyforward.com/" }],
  exelixis: [{ program: "Exelixis Access Services (EASE)", url: "https://www.exelixis.com/" }],
  iovance: [{ program: "IovanceCares", url: "https://www.iovancecares.com/" }],
  emdSerono: [{ program: "EMD Serono CoverOne", url: "https://www.coverone.com/" }],
  taiho: [{ program: "Taiho Oncology Patient Support", url: "https://www.taihopatientsupport.com/" }],
  springworks: [{ program: "SpringWorks CareConnections", url: "https://www.springworkscareconnections.com/" }],
  novocure: [{ program: "Novocure nCompass", url: "https://www.optune.com/" }],
  boehringer: [{ program: "Boehringer Ingelheim patient support", url: "https://www.boehringer-ingelheim.com/us" }],
  /** Independent charities that help Medicare patients, who cannot use manufacturer co-pay cards. */
  charities: [
    { program: "PAN Foundation", url: "https://www.panfoundation.org/", note: "Disease-specific co-pay and premium funds; open and closed funds change monthly." },
    { program: "HealthWell Foundation", url: "https://www.healthwellfoundation.org/" },
    { program: "CancerCare Co-Payment Assistance Foundation", url: "https://www.cancercarecopay.org/" },
    { program: "Patient Advocate Foundation Co-Pay Relief", url: "https://copays.org/" },
  ],
  lls: [{ program: "Leukemia & Lymphoma Society financial support", url: "https://www.lls.org/support-resources/financial-support" }],
} satisfies Record<string, Pap[]>;

const B_SOURCES: Src[] = [SRC.chemo, SRC.outpatientDrugs];
const D_SOURCES: Src[] = [SRC.partD, SRC.partDCosts];

/** Build one record with the right default sources for its Medicare benefit category. */
function rec(drugId: string, part: Part, medNote: string, typical: Typical, comNote: string, o: { ncd?: string; url?: string; price?: UsCoverage["listPriceUsd"]; pap?: Pap[]; oop?: string; sources?: Src[] } = {}): UsCoverage {
  const base = part === "B" ? B_SOURCES : part === "D" ? D_SOURCES : part === "B or D" ? [...B_SOURCES, ...D_SOURCES] : [SRC.mcd];
  const r: UsCoverage = {
    drugId,
    medicare: { part, note: medNote, ...(o.ncd ? { ncd: o.ncd } : {}), ...(o.url ? { url: o.url } : {}) },
    commercial: { typical, note: comNote },
    sources: [...base, ...(o.sources ?? [])],
  };
  if (o.price) r.listPriceUsd = o.price;
  if (o.pap) r.patientAssistance = o.pap;
  if (o.oop) r.oopNote = o.oop;
  return r;
}

/** Reusable note fragments. */
const IV = "Given by infusion or injection in a clinic or hospital outpatient department, so it is a Part B drug: Medicare pays 80% after the Part B deductible and the patient owes 20% coinsurance, uncapped in Original Medicare unless a Medigap policy applies.";
const ORAL = "Oral, self-administered, so it is a Part D drug: covered through a stand-alone Part D plan or Medicare Advantage drug benefit, usually on the specialty tier with 25 to 33% coinsurance until the annual cap ($2,000 in 2025, $2,100 in 2026).";
const PA = "Covered for FDA-labelled and NCCN-listed uses, but almost always behind prior authorisation confirming diagnosis, biomarker and line of therapy; dispensed through a specialty pharmacy.";
const PA_IV = "Covered under the medical benefit with prior authorisation confirming diagnosis, biomarker status and line of therapy; site-of-care policies may steer infusions away from hospital outpatient departments.";
const GENERIC = "Multi-source generic; covered under the medical benefit without prior authorisation in most plans, as part of standard regimens.";
const GENERIC_ORAL = "Multi-source generic on low-cost tiers; usually no prior authorisation. Cash prices without insurance are modest.";
const CART = "Autologous CAR-T covered nationally under NCD 110.24 for FDA-labelled indications at facilities enrolled in the FDA REMS. Inpatient administration is paid under Part A (MS-DRG 018); outpatient administration is a Part B drug. The product itself is bundled into the facility payment.";
const CART_COM = "Covered with prior authorisation and usually a single-case agreement with a certified treatment centre; many plans restrict to centres of excellence and require documentation of prior lines of therapy.";
const BISPECIFIC = `${IV} Step-up dosing is often started in hospital (Part A) because of cytokine release syndrome monitoring, then continued in the outpatient setting.`;
const ORAL_CANCER_B = "Oral anticancer drug with an injectable equivalent used for the same indication, so Medicare covers the oral form under Part B (the oral anticancer drug benefit) as well as under Part D; the pharmacy bills whichever applies.";
const NOT_US = "Not FDA-approved, so there is no US coverage; access is only through a clinical trial or an FDA expanded-access request.";
const CAP_OOP = "Part D out-of-pocket capped at $2,000 (2025) / $2,100 (2026). Medicare patients cannot use manufacturer co-pay cards; charity funds (PAN, HealthWell, CancerCare) and the Extra Help subsidy are the routes.";
const B_OOP = "20% Part B coinsurance on a high-cost infusion adds up quickly: Medigap Plan G or N, Medicare Advantage maximum out-of-pocket, Medicaid dual eligibility, or a charity fund are the usual buffers.";

const RECORDS: UsCoverage[] = [
  // ---- Checkpoint inhibitors and immune-oncology antibodies (Part B) ----
  rec("pembrolizumab", "B", `${IV} HCPCS J9271. The subcutaneous Keytruda Qlex is also clinician-administered and stays in Part B.`, "covered with prior authorisation", `${PA_IV} The largest-selling cancer drug in the US; nearly every plan has a Keytruda policy tied to indication and PD-L1 status where the label requires it.`, {
    price: { value: 11115.2, per: "200 mg dose every 3 weeks (manufacturer list price)", source: "Merck, KEYTRUDA cost and financial support page", url: "https://www.keytruda.com/cost/", year: 2024 },
    pap: [...PAP.merck, ...PAP.charities], oop: B_OOP,
  }),
  rec("nivolumab", "B", `${IV} HCPCS J9299. Opdivo Qvantig (subcutaneous, with hyaluronidase) is clinician-administered and also Part B.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.bms, ...PAP.charities], oop: B_OOP }),
  rec("atezolizumab", "B", `${IV} HCPCS J9022. Tecentriq Hybreza (subcutaneous) is clinician-administered and Part B.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.genentech, ...PAP.charities], oop: B_OOP }),
  rec("durvalumab", "B", `${IV} HCPCS J9173.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.az, ...PAP.charities], oop: B_OOP }),
  rec("avelumab", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.emdSerono, ...PAP.pfizer, ...PAP.charities], oop: B_OOP }),
  rec("cemiplimab", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.regeneron, ...PAP.charities], oop: B_OOP }),
  rec("dostarlimab", "B", IV, "covered with prior authorisation", `${PA_IV} Plans generally require documented dMMR/MSI-H status for the endometrial and tumour-agnostic uses.`, { pap: [...PAP.gsk, ...PAP.charities], oop: B_OOP }),
  rec("ipilimumab", "B", `${IV} HCPCS J9228.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.bms, ...PAP.charities], oop: B_OOP }),
  rec("tremelimumab", "B", `${IV} Used only in combination with durvalumab.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.az, ...PAP.charities], oop: B_OOP }),
  rec("relatlimab-nivolumab", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.bms, ...PAP.charities], oop: B_OOP }),
  rec("tislelizumab", "B", `${IV} FDA-approved (oesophageal and gastric cancers); newer entrant with lower US uptake.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.beigene, ...PAP.charities], oop: B_OOP }),
  rec("toripalimab", "B", `${IV} FDA-approved for nasopharyngeal carcinoma.`, "covered with prior authorisation", PA_IV, { oop: B_OOP }),
  rec("retifanlimab", "B", `${IV} FDA-approved for Merkel cell carcinoma and squamous anal cancer.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.incyte, ...PAP.charities], oop: B_OOP }),
  rec("cosibelimab", "B", `${IV} FDA-approved for cutaneous squamous cell carcinoma.`, "covered with prior authorisation", PA_IV, { oop: B_OOP }),
  rec("camrelizumab", "not covered", NOT_US, "unknown", NOT_US),
  rec("cadonilimab", "not covered", NOT_US, "unknown", NOT_US),
  rec("serplulimab", "not covered", NOT_US, "unknown", NOT_US),
  rec("aldesleukin", "B", `${IV} High-dose IL-2 is given as an inpatient course, so hospital stays fall under Part A.`, "covered with prior authorisation", PA_IV, { oop: B_OOP }),
  rec("talimogene-laherparepvec", "B", `${IV} Intralesional injection by the clinician; HCPCS J9325.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.amgen, ...PAP.charities], oop: B_OOP }),
  rec("nadofaragene-firadenovec", "B", `${IV} Intravesical instillation in the urology clinic, quarterly.`, "covered with prior authorisation", `${PA_IV} Plans require BCG-unresponsive NMIBC documented per the label.`, { oop: B_OOP }),
  rec("nogapendekin-alfa", "B", `${IV} Intravesical, given with BCG in the urology clinic.`, "covered with prior authorisation", `${PA_IV} Plans require BCG-unresponsive NMIBC with carcinoma in situ.`, { oop: B_OOP }),
  rec("tar-200", "B", `${IV} Intravesical drug-releasing system placed in the urology clinic; approved 2025 and newly assigned coding, so check the local Medicare contractor.`, "covered with prior authorisation", `${PA_IV} New product; expect plan policies to lag the approval by several months.`, { pap: [...PAP.jnj, ...PAP.charities], oop: B_OOP }),
  rec("sipuleucel-t", "B", `${IV} National coverage under NCD 110.22 for asymptomatic or minimally symptomatic metastatic castration-resistant prostate cancer; HCPCS Q2043.`, "covered with prior authorisation", PA_IV, { ncd: "110.22", url: SRC.mcd.url, oop: B_OOP }),

  // ---- HER2, VEGF, EGFR and other targeted antibodies (Part B) ----
  rec("trastuzumab", "B", `${IV} HCPCS J9355 for Herceptin; each biosimilar has its own Q-code. Under the Inflation Reduction Act, Part B coinsurance on a biosimilar is calculated on the reference product's price, so biosimilars usually cost the patient less.`, "step therapy common", "Most commercial plans and PBM medical-benefit programmes now require a preferred trastuzumab biosimilar (e.g. Kanjinti, Ogivri, Trazimera) before the originator; prior authorisation confirms HER2 status.", { pap: [...PAP.genentech, ...PAP.charities], oop: B_OOP, sources: [SRC.biosimilars] }),
  rec("trastuzumab-biosimilars", "B", `${IV} Biosimilars are paid at their own average sales price plus 8% of the reference product's price under Medicare Part B, an incentive to prescribe them; patient coinsurance is generally lower than for Herceptin.`, "covered on label", "Preferred products on most commercial medical-benefit formularies; plans pick one or two preferred biosimilars and may require a switch.", { oop: B_OOP, sources: [SRC.biosimilars] }),
  rec("pertuzumab", "B", `${IV} Phesgo (pertuzumab + trastuzumab + hyaluronidase) is a subcutaneous clinician-administered product and also Part B.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.genentech, ...PAP.charities], oop: B_OOP }),
  rec("trastuzumab-deruxtecan", "B", `${IV} HCPCS J9358.`, "covered with prior authorisation", `${PA_IV} Plans require HER2 IHC/ISH results, including HER2-low documentation for the DESTINY-Breast04 indication.`, { pap: [...PAP.enhertu, ...PAP.az, ...PAP.charities], oop: B_OOP }),
  rec("trastuzumab-emtansine", "B", `${IV} HCPCS J9354.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.genentech, ...PAP.charities], oop: B_OOP }),
  rec("margetuximab", "B", IV, "covered with prior authorisation", PA_IV, { oop: B_OOP }),
  rec("zanidatamab", "B", `${IV} FDA accelerated approval for HER2-positive biliary tract cancer (2024).`, "covered with prior authorisation", PA_IV, { pap: [...PAP.jazz, ...PAP.charities], oop: B_OOP }),
  rec("zenocutuzumab", "B", `${IV} FDA accelerated approval for NRG1 fusion-positive NSCLC and pancreatic cancer (2024).`, "covered with prior authorisation", `${PA_IV} NRG1 fusion must be documented by an approved NGS assay.`, { oop: B_OOP }),
  rec("bevacizumab", "B", `${IV} HCPCS J9035 for Avastin; biosimilars (Mvasi, Zirabev, Alymsys, Vegzelma, Avzivi) have their own codes and lower patient coinsurance.`, "step therapy common", "Commercial plans almost universally prefer a bevacizumab biosimilar over Avastin; prior authorisation checks indication.", { pap: [...PAP.genentech, ...PAP.charities], oop: B_OOP, sources: [SRC.biosimilars] }),
  rec("bevacizumab-glioma", "B", `${IV} Same drug and coding as bevacizumab; the glioblastoma indication is on label.`, "step therapy common", "Preferred biosimilar usually required; some plans apply additional review for recurrent glioblastoma.", { pap: [...PAP.genentech, ...PAP.charities], oop: B_OOP, sources: [SRC.biosimilars] }),
  rec("ramucirumab", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.lilly, ...PAP.charities], oop: B_OOP }),
  rec("cetuximab", "B", `${IV} HCPCS J9055.`, "covered with prior authorisation", `${PA_IV} RAS wild-type documentation required for colorectal use.`, { pap: [...PAP.lilly, ...PAP.charities], oop: B_OOP }),
  rec("panitumumab", "B", IV, "covered with prior authorisation", `${PA_IV} RAS wild-type documentation required.`, { pap: [...PAP.amgen, ...PAP.charities], oop: B_OOP }),
  rec("amivantamab", "B", `${IV} The subcutaneous formulation, if approved, remains clinician-administered and Part B.`, "covered with prior authorisation", `${PA_IV} EGFR exon 20 insertion or common EGFR mutation documented by an approved test.`, { pap: [...PAP.jnj, ...PAP.charities], oop: B_OOP }),
  rec("rituximab", "B", `${IV} HCPCS J9312 for Rituxan; biosimilars Truxima, Ruxience and Riabni have their own codes. Rituxan Hycela (subcutaneous) is Part B.`, "step therapy common", "Preferred rituximab biosimilar required by most commercial medical-benefit programmes; prior authorisation confirms CD20-positive disease.", { pap: [...PAP.genentech, ...PAP.charities, ...PAP.lls], oop: B_OOP, sources: [SRC.biosimilars] }),
  rec("obinutuzumab", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.genentech, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("daratumumab", "B", `${IV} HCPCS J9145 (IV); Darzalex Faspro (subcutaneous) is clinician-administered and Part B.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.jnj, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("isatuximab", "B", `${IV} The 2025 subcutaneous on-body injector (Sarclisa Escena) is applied in the clinic and stays in Part B.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.sanofi, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("elotuzumab", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("tafasitamab", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.incyte, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("mogamulizumab", "B", IV, "covered with prior authorisation", PA_IV, { oop: B_OOP }),
  rec("dinutuximab", "B", `${IV} Unituxin is usually given inpatient in paediatric centres (Part A / Medicaid); dinutuximab beta (Qarziba) is not FDA-approved.`, "covered with prior authorisation", "Paediatric high-risk neuroblastoma; most children are covered by commercial family plans or Medicaid/CHIP, which cover on-label use with review.", { oop: B_OOP }),
  rec("naxitamab", "B", `${IV} Mostly paediatric, given in specialist centres.`, "covered with prior authorisation", "Paediatric relapsed/refractory neuroblastoma; commercial and Medicaid plans cover on label with prior authorisation.", { oop: B_OOP }),
  rec("zolbetuximab", "B", `${IV} FDA-approved 2024 for CLDN18.2-positive gastric/GEJ cancer.`, "covered with prior authorisation", `${PA_IV} CLDN18.2 IHC result required.`, { pap: [...PAP.astellas, ...PAP.charities], oop: B_OOP }),

  // ---- Antibody-drug conjugates (Part B) ----
  rec("enfortumab-vedotin", "B", `${IV} HCPCS J9177.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.astellas, ...PAP.seagen, ...PAP.charities], oop: B_OOP }),
  rec("sacituzumab-govitecan", "B", `${IV} HCPCS J9317.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.gilead, ...PAP.charities], oop: B_OOP }),
  rec("brentuximab-vedotin", "B", `${IV} HCPCS J9042.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.seagen, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("polatuzumab-vedotin", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.genentech, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("mirvetuximab-soravtansine", "B", IV, "covered with prior authorisation", `${PA_IV} FRα-positive status by the approved IHC test required.`, { pap: [...PAP.abbvie, ...PAP.charities], oop: B_OOP }),
  rec("tisotumab-vedotin", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.seagen, ...PAP.charities], oop: B_OOP }),
  rec("datopotamab-deruxtecan", "B", `${IV} FDA-approved 2025.`, "covered with prior authorisation", `${PA_IV} New product; expect indication-specific policies.`, { pap: [...PAP.az, ...PAP.charities], oop: B_OOP }),
  rec("telisotuzumab-vedotin", "B", `${IV} FDA accelerated approval 2025 for c-Met overexpressing NSCLC.`, "covered with prior authorisation", `${PA_IV} c-Met IHC result required.`, { pap: [...PAP.abbvie, ...PAP.charities], oop: B_OOP }),
  rec("zynlonta", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("gemtuzumab-ozogamicin", "B", `${IV} Often given inpatient with induction chemotherapy (Part A).`, "covered with prior authorisation", PA_IV, { pap: [...PAP.pfizer, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("inotuzumab-ozogamicin", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.pfizer, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("belantamab-mafodotin", "B", `${IV} Withdrawn from the US market between 2022 and 2023 and re-approved in 2025 in combination; ocular monitoring under a REMS.`, "covered with prior authorisation", `${PA_IV} Plans require documented prior lines and enrolment in the ocular REMS.`, { pap: [...PAP.gsk, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("disitamab-vedotin", "not covered", NOT_US, "unknown", NOT_US),
  rec("trastuzumab-rezetecan", "not covered", NOT_US, "unknown", NOT_US),
  rec("cetuximab-sarotalocan", "not covered", `${NOT_US} Approved in Japan only.`, "unknown", NOT_US),

  // ---- T-cell engagers (Part B) ----
  rec("blinatumomab", "B", `${BISPECIFIC} Continuous 28-day infusion via a portable pump; HCPCS J9039.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.amgen, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("teclistamab", "B", BISPECIFIC, "covered with prior authorisation", `${PA_IV} Four or more prior lines of therapy documented for the myeloma label.`, { pap: [...PAP.jnj, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("elranatamab", "B", BISPECIFIC, "covered with prior authorisation", PA_IV, { pap: [...PAP.pfizer, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("talquetamab", "B", BISPECIFIC, "covered with prior authorisation", PA_IV, { pap: [...PAP.jnj, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("linvoseltamab", "B", `${BISPECIFIC} FDA-approved 2025.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.regeneron, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("epcoritamab", "B", `${BISPECIFIC} Subcutaneous, clinician-administered.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.abbvie, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("glofitamab", "B", BISPECIFIC, "covered with prior authorisation", PA_IV, { pap: [...PAP.genentech, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("mosunetuzumab", "B", BISPECIFIC, "covered with prior authorisation", PA_IV, { pap: [...PAP.genentech, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("tarlatamab", "B", `${BISPECIFIC} First DLL3 engager for small-cell lung cancer (2024).`, "covered with prior authorisation", PA_IV, { pap: [...PAP.amgen, ...PAP.charities], oop: B_OOP }),
  rec("tebentafusp", "B", `${IV} Weekly infusion for HLA-A*02:01-positive uveal melanoma; first doses in hospital for CRS monitoring.`, "covered with prior authorisation", `${PA_IV} HLA-A*02:01 genotype must be documented.`, { oop: B_OOP }),

  // ---- Cell therapies ----
  rec("axicabtagene-ciloleucel", "B", `${CART} HCPCS Q2041.`, "covered with prior authorisation", CART_COM, {
    ncd: "110.24", url: SRC.carT.url, sources: [SRC.carT, SRC.inpatient],
    price: { value: 373000, per: "one-time treatment, launch list price", source: "National Cancer Institute, Cancer Currents, October 2017 (reporting Kite/Gilead's announced price)", url: "https://www.cancer.gov/news-events/cancer-currents-blog/2017/yescarta-fda-lymphoma", year: 2017 },
    pap: [...PAP.kite, ...PAP.lls], oop: "Medicare patients usually face the Part A inpatient deductible rather than 20% of the product price; the hospital stay, apheresis and bridging therapy drive the bill.",
  }),
  rec("tisagenlecleucel", "B", `${CART} HCPCS Q2042.`, "covered with prior authorisation", CART_COM, {
    ncd: "110.24", url: SRC.carT.url, sources: [SRC.carT, SRC.inpatient],
    price: { value: 475000, per: "one-time treatment for paediatric/young adult B-ALL, launch list price", source: "National Cancer Institute, Cancer Currents, September 2017 (reporting Novartis's announced price)", url: "https://www.cancer.gov/news-events/cancer-currents-blog/2017/tisagenlecleucel-fda-childhood-leukemia", year: 2017 },
    pap: [...PAP.novartis, ...PAP.lls], oop: "Medicare patients usually face the Part A inpatient deductible rather than 20% of the product price; the hospital stay, apheresis and bridging therapy drive the bill.",
  }),
  rec("lisocabtagene-maraleucel", "B", `${CART} HCPCS Q2054. Often given outpatient, which shifts the product to Part B with 20% coinsurance.`, "covered with prior authorisation", CART_COM, { ncd: "110.24", url: SRC.carT.url, sources: [SRC.carT, SRC.inpatient], pap: [...PAP.bms, ...PAP.lls] }),
  rec("brexucabtagene-autoleucel", "B", `${CART} HCPCS Q2053.`, "covered with prior authorisation", CART_COM, { ncd: "110.24", url: SRC.carT.url, sources: [SRC.carT, SRC.inpatient], pap: [...PAP.kite, ...PAP.lls] }),
  rec("idecabtagene-vicleucel", "B", `${CART} HCPCS Q2055.`, "covered with prior authorisation", CART_COM, { ncd: "110.24", url: SRC.carT.url, sources: [SRC.carT, SRC.inpatient], pap: [...PAP.bms, ...PAP.lls] }),
  rec("ciltacabtagene-autoleucel", "B", `${CART} HCPCS Q2056.`, "covered with prior authorisation", CART_COM, { ncd: "110.24", url: SRC.carT.url, sources: [SRC.carT, SRC.inpatient], pap: [...PAP.jnj, ...PAP.lls] }),
  rec("obecabtagene-autoleucel", "B", `${CART} FDA-approved November 2024 for adult relapsed/refractory B-ALL.`, "covered with prior authorisation", CART_COM, { ncd: "110.24", url: SRC.carT.url, sources: [SRC.carT, SRC.inpatient], pap: PAP.lls }),
  rec("lifileucel", "B", "Autologous TIL therapy; not a CAR-T so NCD 110.24 does not apply. Covered case by case by Medicare contractors as a reasonable and necessary FDA-approved biologic; the inpatient stay for lymphodepletion, infusion and high-dose IL-2 is paid under Part A.", "covered with prior authorisation", `${CART_COM} Iovance reports broad payer policy coverage since 2024.`, { sources: [SRC.inpatient, SRC.mcd], pap: PAP.iovance }),
  rec("afamitresgene-autoleucel", "B", "Autologous TCR-T for MAGE-A4-positive synovial sarcoma (2024); not covered by the CAR-T NCD, so coverage is contractor-determined. Inpatient administration falls under Part A.", "covered with prior authorisation", `${CART_COM} HLA-A*02 and MAGE-A4 expression must be documented.`, { sources: [SRC.inpatient, SRC.mcd] }),
  rec("satricabtagene-autoleucel", "not covered", NOT_US, "unknown", NOT_US),

  // ---- Cytotoxic chemotherapy (mostly generic, Part B) ----
  rec("cisplatin", "B", `${IV} HCPCS J9060. Generic; low unit cost.`, "covered on label", GENERIC),
  rec("carboplatin", "B", `${IV} HCPCS J9045. Generic; supply shortages in 2023 affected access more than coverage did.`, "covered on label", GENERIC),
  rec("oxaliplatin", "B", `${IV} HCPCS J9263. Generic.`, "covered on label", GENERIC),
  rec("paclitaxel", "B", `${IV} HCPCS J9267 for paclitaxel (generic). Nab-paclitaxel (Abraxane) is also Part B; generics launched in 2022.`, "covered on label", `${GENERIC} Some plans apply prior authorisation to nab-paclitaxel because of its higher price.`),
  rec("docetaxel", "B", `${IV} HCPCS J9171. Generic.`, "covered on label", GENERIC),
  rec("cabazitaxel", "B", `${IV} Generics entered the US market between 2021 and 2024 after patent litigation.`, "covered with prior authorisation", `${PA_IV} Plans typically require prior docetaxel.`, { pap: [...PAP.sanofi, ...PAP.charities], oop: B_OOP }),
  rec("doxorubicin", "B", `${IV} Generic.`, "covered on label", GENERIC),
  rec("pegylated-liposomal-doxorubicin", "B", `${IV} Generic liposomal doxorubicin is available; Doxil coverage is the same benefit.`, "covered on label", GENERIC),
  rec("gemcitabine", "B", `${IV} HCPCS J9201. Generic; Infugem (premixed) is priced higher and may be reviewed.`, "covered on label", GENERIC),
  rec("fluorouracil", "B", `${IV} HCPCS J9190. When 5-FU is infused over 46 hours through an ambulatory pump at home, the drug and pump are paid under the Part B durable medical equipment benefit. Topical fluorouracil (Efudex) for skin lesions is Part D.`, "covered on label", GENERIC),
  rec("irinotecan", "B", `${IV} Generic irinotecan; liposomal irinotecan (Onivyde) is a branded Part B drug that plans may review.`, "covered on label", `${GENERIC} Onivyde usually requires prior authorisation.`, { pap: [...PAP.ipsen, ...PAP.charities] }),
  rec("nalirifox", "B", `${IV} Each component is billed separately; liposomal irinotecan (Onivyde) is the branded, reviewed component.`, "covered with prior authorisation", `${PA_IV} Plans compare NALIRIFOX against FOLFIRINOX and may require justification.`, { pap: [...PAP.ipsen, ...PAP.charities], oop: B_OOP }),
  rec("pemetrexed", "B", `${IV} HCPCS J9305 for Alimta; generics and Pemfexy/Pemrydi RTU have separate codes with different patient coinsurance.`, "covered on label", `${GENERIC} Plans increasingly prefer generic pemetrexed over Alimta.`),
  rec("cyclophosphamide", "B or D", `${ORAL_CANCER_B} IV cyclophosphamide is Part B (HCPCS J9070).`, "covered on label", GENERIC),
  rec("methotrexate", "B or D", `${ORAL_CANCER_B} High-dose IV methotrexate is Part B and usually inpatient (Part A).`, "covered on label", GENERIC_ORAL),
  rec("etoposide", "B or D", `${ORAL_CANCER_B} IV etoposide is Part B.`, "covered on label", GENERIC),
  rec("topotecan", "B or D", `${ORAL_CANCER_B} IV topotecan is Part B.`, "covered on label", GENERIC),
  rec("melphalan", "B or D", `${ORAL_CANCER_B} High-dose IV melphalan for transplant conditioning is inpatient (Part A). The Hepzato Kit (hepatic delivery) is a hospital procedure with its own coding.`, "covered on label", `${GENERIC} Hepzato Kit requires prior authorisation.`),
  rec("vincristine", "B", `${IV} Generic; Marqibo (liposomal) was discontinued.`, "covered on label", GENERIC),
  rec("vinblastine", "B", `${IV} Generic.`, "covered on label", GENERIC),
  rec("vinorelbine", "B", `${IV} Generic.`, "covered on label", GENERIC),
  rec("bleomycin", "B", `${IV} Generic.`, "covered on label", GENERIC),
  rec("ifosfamide", "B", `${IV} Generic; usually with mesna.`, "covered on label", GENERIC),
  rec("dactinomycin", "B", `${IV} Generic; paediatric and gestational trophoblastic uses.`, "covered on label", GENERIC),
  rec("mitomycin", "B", `${IV} IV and intravesical mitomycin are generic Part B drugs. Jelmyto (pyelocalyceal) and Zusduri (intravesical, 2025) are branded, clinician-instilled products under Part B with higher coinsurance.`, "covered on label", `${GENERIC} Jelmyto and Zusduri typically require prior authorisation.`),
  rec("bendamustine", "B", `${IV} Bendeka and Belrapzo are branded; generic bendamustine is available.`, "covered on label", `${GENERIC} Plans may prefer a specific bendamustine product.`, { pap: PAP.charities }),
  rec("eribulin", "B", `${IV} Generic eribulin has been approved.`, "covered with prior authorisation", `${PA_IV} Plans typically require two prior chemotherapy regimens for metastatic breast cancer, per the label.`, { pap: [...PAP.eisai, ...PAP.charities], oop: B_OOP }),
  rec("trabectedin", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.jnj, ...PAP.charities], oop: B_OOP }),
  rec("lurbinectedin", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.jazz, ...PAP.charities], oop: B_OOP }),
  rec("azacitidine", "B or D", `Injectable azacitidine (Vidaza and generics) is a Part B drug given subcutaneously or IV in the clinic. Oral azacitidine (Onureg) has a different indication (AML maintenance) and is a Part D drug.`, "covered with prior authorisation", `Injectable generic azacitidine is covered on label without much review; Onureg requires prior authorisation and specialty pharmacy dispensing.`, { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("decitabine-cedazuridine", "D", `${ORAL} Inqovi is oral decitabine; Medicare contractors generally treat it as Part D rather than under the oral anticancer Part B benefit because cedazuridine has no injectable equivalent.`, "covered with prior authorisation", PA, { pap: [...PAP.taiho, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("cpx-351", "B", `${IV} Almost always given inpatient during AML induction, so paid within the Part A stay.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.jazz, ...PAP.charities, ...PAP.lls] }),
  rec("arsenic-trioxide", "B", `${IV} Generic; daily infusions in the clinic during consolidation.`, "covered on label", GENERIC),
  rec("asparaginase", "B", `${IV} Pegaspargase (Oncaspar), calaspargase pegol (Asparlas) and Rylaze are clinician-administered Part B drugs; paediatric ALL patients are mostly on commercial family plans or Medicaid.`, "covered on label", "Covered as part of standard paediatric and adult ALL protocols; Rylaze usually requires documented hypersensitivity to E. coli-derived asparaginase.", { pap: [...PAP.servier, ...PAP.jazz, ...PAP.lls] }),
  rec("cladribine", "B", `${IV} Generic; IV or subcutaneous for hairy cell leukaemia. (Oral cladribine, Mavenclad, is a multiple sclerosis drug and Part D.)`, "covered on label", GENERIC),
  rec("hydroxyurea", "D", `${ORAL} Generic; typically a low-tier drug costing a few dollars a month.`, "covered on label", GENERIC_ORAL),
  rec("tretinoin-atra", "D", `${ORAL} Generic tretinoin capsules.`, "covered on label", GENERIC_ORAL),
  rec("trifluridine-tipiracil", "D", ORAL, "covered with prior authorisation", `${PA} Plans require prior fluoropyrimidine, oxaliplatin and irinotecan for colorectal use.`, { pap: [...PAP.taiho, ...PAP.charities], oop: CAP_OOP }),
  rec("treosulfan", "B", `${IV} Transplant conditioning given inpatient; paid within the Part A transplant stay.`, "covered with prior authorisation", "Bundled into the transplant authorisation; centres seek approval as part of the allogeneic transplant episode.", { sources: [SRC.inpatient] }),
  rec("sodium-thiosulfate", "B", `${IV} Pedmark is given after each cisplatin dose in children; almost all patients are on Medicaid/CHIP or commercial family plans.`, "covered with prior authorisation", "Covered on label (paediatric localised solid tumours receiving cisplatin) with prior authorisation."),
  rec("mifamurtide", "not covered", `${NOT_US} Approved in the EU for osteosarcoma; the FDA declined approval in 2007.`, "unknown", NOT_US),

  // ---- Proteasome inhibitors, IMiDs and other myeloma drugs ----
  rec("bortezomib", "B", `${IV} Subcutaneous or IV in the clinic; HCPCS J9041. Generic bortezomib since 2022.`, "covered on label", `${GENERIC} Prior authorisation is uncommon now that generics exist.`, { pap: [...PAP.takeda, ...PAP.charities, ...PAP.lls] }),
  rec("carfilzomib", "B", `${IV} HCPCS J9047.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.amgen, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("ixazomib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.takeda, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("lenalidomide", "D", `${ORAL} Generic lenalidomide entered the US in March 2022 under volume-limited licences and became fully generic in January 2026; Part D plans increasingly prefer the generic. Dispensed only through the REMS.`, "covered with prior authorisation", `${PA} Plans now require the generic where available.`, { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("pomalidomide", "D", `${ORAL} Pomalyst was selected for Medicare price negotiation in January 2025; the negotiated maximum fair price takes effect 1 January 2027. REMS-restricted dispensing.`, "covered with prior authorisation", PA, { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: CAP_OOP, sources: [SRC.negotiation] }),
  rec("thalidomide", "D", `${ORAL} Generic thalidomide is available; REMS-restricted dispensing.`, "covered with prior authorisation", PA, { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("selinexor", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.karyopharm, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("belumosudil", "D", `${ORAL} Rezurock (chronic GVHD) is a Part D specialty drug.`, "covered with prior authorisation", `${PA} Plans require failure of at least two prior lines of systemic therapy for chronic GVHD, per the label.`, { pap: [...PAP.sanofi, ...PAP.charities], oop: CAP_OOP }),

  // ---- Hormonal therapies ----
  rec("abiraterone", "D", `${ORAL} Generic abiraterone (since 2018) is inexpensive; the Yonsa formulation and brand Zytiga cost far more.`, "covered on label", `${GENERIC_ORAL} Many plans require generic abiraterone before enzalutamide or other novel hormonal agents.`, { pap: PAP.charities }),
  rec("enzalutamide", "D", `${ORAL} Xtandi was selected for Medicare price negotiation in January 2025; the negotiated price takes effect 1 January 2027.`, "step therapy common", "Covered with prior authorisation; several PBMs require a trial of generic abiraterone first in metastatic castration-resistant disease unless abiraterone is contraindicated.", { pap: [...PAP.astellas, ...PAP.pfizer, ...PAP.charities], oop: CAP_OOP, sources: [SRC.negotiation] }),
  rec("apalutamide", "D", ORAL, "covered with prior authorisation", `${PA} Non-metastatic castration-resistant or metastatic castration-sensitive disease per the label.`, { pap: [...PAP.jnj, ...PAP.charities], oop: CAP_OOP }),
  rec("darolutamide", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.bayer, ...PAP.charities], oop: CAP_OOP }),
  rec("relugolix", "D", `${ORAL} The only oral GnRH antagonist for prostate cancer, so it sits in Part D whereas injectable GnRH agonists and degarelix are Part B; this shifts the cost from 20% coinsurance to the Part D specialty tier and cap.`, "covered with prior authorisation", `${PA} Some plans prefer injectable leuprolide first.`, { pap: PAP.charities, oop: CAP_OOP }),
  rec("bicalutamide", "D", `${ORAL} Generic, low cost.`, "covered on label", GENERIC_ORAL),
  rec("leuprolide", "B", `${IV} Depot injections given in the clinic (HCPCS J9217 for leuprolide 7.5 mg) are Part B. Self-administered forms are rare in oncology.`, "covered on label", "Covered under the medical benefit; plans may prefer one depot brand (Lupron Depot, Eligard, Camcevi) over another.", { oop: B_OOP }),
  rec("goserelin", "B", `${IV} Zoladex implant placed by the clinician; Part B.`, "covered on label", "Covered under the medical benefit as a GnRH agonist; brand preference varies by plan."),
  rec("degarelix", "B", `${IV} Monthly subcutaneous depot in the clinic.`, "covered on label", "Covered under the medical benefit; some plans require justification versus leuprolide.", { pap: PAP.charities }),
  rec("fulvestrant", "B", `${IV} Intramuscular injection in the clinic (HCPCS J9395); generic fulvestrant since 2019.`, "covered on label", GENERIC),
  rec("tamoxifen", "D", `${ORAL} Generic, on the lowest tiers; often a few dollars a month.`, "covered on label", GENERIC_ORAL),
  rec("letrozole", "D", `${ORAL} Letrozole, anastrozole and exemestane are all generic, low-tier Part D drugs.`, "covered on label", GENERIC_ORAL),
  rec("exemestane", "D", `${ORAL} Generic.`, "covered on label", GENERIC_ORAL),
  rec("elacestrant", "D", ORAL, "covered with prior authorisation", `${PA} ESR1 mutation must be documented by an approved test.`, { pap: PAP.charities, oop: CAP_OOP }),
  rec("imlunestrant", "D", `${ORAL} FDA-approved 2025.`, "covered with prior authorisation", `${PA} ESR1 mutation documentation required; plan policies are still being written.`, { pap: [...PAP.lilly, ...PAP.charities], oop: CAP_OOP }),
  rec("megestrol-progestins", "D", `${ORAL} Megestrol and medroxyprogesterone are generic Part D drugs. The levonorgestrel IUD is placed by a clinician and billed under Part B, and is a $0 preventive benefit in most commercial plans under the ACA when used for contraception.`, "covered on label", GENERIC_ORAL),
  rec("octreotide-lanreotide", "B", `${IV} Long-acting depot injections (Sandostatin LAR, Somatuline Depot, lanreotide generics) given in the clinic are Part B. Self-injected short-acting octreotide is Part D.`, "covered with prior authorisation", "Covered for neuroendocrine tumours and carcinoid syndrome with prior authorisation; plans may prefer lanreotide (now multi-source) over Sandostatin LAR.", { pap: [...PAP.ipsen, ...PAP.novartis, ...PAP.charities], oop: B_OOP }),
  rec("mitotane", "D", ORAL, "covered with prior authorisation", `${PA} Adrenocortical carcinoma is rare enough that most plans cover on diagnosis.`, { pap: PAP.charities, oop: CAP_OOP }),
  rec("relacorilant", "D", `${ORAL} Approved 2025 for hypercortisolism; oncology use is investigational, and Part D plans will not cover off-label ovarian cancer use outside a compendium listing.`, "variable", "Covered with prior authorisation for the labelled endocrine indication only; ovarian cancer use is not yet on label.", { oop: CAP_OOP }),

  // ---- CDK4/6, PI3K/AKT/mTOR and breast cancer targeted orals ----
  rec("palbociclib", "D", `${ORAL} Ibrance was selected for Medicare price negotiation in January 2025; the negotiated price takes effect 1 January 2027.`, "covered with prior authorisation", `${PA} Some PBMs designate a preferred CDK4/6 inhibitor and require it first.`, { pap: [...PAP.pfizer, ...PAP.charities], oop: CAP_OOP, sources: [SRC.negotiation] }),
  rec("ribociclib", "D", ORAL, "covered with prior authorisation", `${PA} Some PBMs designate a preferred CDK4/6 inhibitor.`, { pap: [...PAP.novartis, ...PAP.charities], oop: CAP_OOP }),
  rec("abemaciclib", "D", ORAL, "covered with prior authorisation", `${PA} Adjuvant use requires documentation of the high-risk node-positive criteria in the label.`, { pap: [...PAP.lilly, ...PAP.charities], oop: CAP_OOP }),
  rec("alpelisib", "D", ORAL, "covered with prior authorisation", `${PA} PIK3CA mutation by an approved test required.`, { pap: [...PAP.novartis, ...PAP.charities], oop: CAP_OOP }),
  rec("inavolisib", "D", `${ORAL} FDA-approved October 2024.`, "covered with prior authorisation", `${PA} PIK3CA mutation and endocrine-resistant disease per the label.`, { pap: [...PAP.genentech, ...PAP.charities], oop: CAP_OOP }),
  rec("capivasertib", "D", ORAL, "covered with prior authorisation", `${PA} PIK3CA, AKT1 or PTEN alteration by an approved test required.`, { pap: [...PAP.az, ...PAP.charities], oop: CAP_OOP }),
  rec("everolimus", "D", `${ORAL} Generic everolimus is available and inexpensive relative to Afinitor.`, "covered on label", `${GENERIC_ORAL} Plans require the generic.`),
  rec("temsirolimus", "B", `${IV} Weekly infusion; generic available.`, "covered on label", GENERIC),
  rec("tucatinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.seagen, ...PAP.charities], oop: CAP_OOP }),
  rec("neratinib", "D", ORAL, "covered with prior authorisation", PA, { pap: PAP.charities, oop: CAP_OOP }),
  rec("lapatinib", "D", `${ORAL} Generic lapatinib is available.`, "covered on label", `${GENERIC_ORAL} Prior authorisation is uncommon for the generic.`),

  // ---- PARP inhibitors ----
  rec("olaparib", "D", ORAL, "covered with prior authorisation", `${PA} BRCA or HRD status by an approved test, depending on indication.`, { pap: [...PAP.az, ...PAP.merck, ...PAP.charities], oop: CAP_OOP }),
  rec("niraparib", "D", `${ORAL} Akeega (niraparib + abiraterone) is also Part D.`, "covered with prior authorisation", PA, { pap: [...PAP.gsk, ...PAP.charities], oop: CAP_OOP }),
  rec("rucaparib", "D", ORAL, "covered with prior authorisation", PA, { pap: PAP.charities, oop: CAP_OOP }),
  rec("talazoparib", "D", ORAL, "covered with prior authorisation", `${PA} Germline BRCA (breast) or HRR gene alteration (prostate, with enzalutamide).`, { pap: [...PAP.pfizer, ...PAP.charities], oop: CAP_OOP }),

  // ---- Lung and tumour-agnostic kinase inhibitors ----
  rec("osimertinib", "D", ORAL, "covered with prior authorisation", `${PA} EGFR mutation by an approved test; adjuvant and unresectable stage III uses have their own criteria.`, { pap: [...PAP.az, ...PAP.charities], oop: CAP_OOP }),
  rec("erlotinib", "D", `${ORAL} Generic erlotinib is inexpensive.`, "covered on label", `${GENERIC_ORAL} Some plans still require EGFR mutation documentation.`),
  rec("gefitinib", "D", `${ORAL} Generic gefitinib is available.`, "covered on label", GENERIC_ORAL),
  rec("afatinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.boehringer, ...PAP.charities], oop: CAP_OOP }),
  rec("dacomitinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.pfizer, ...PAP.charities], oop: CAP_OOP }),
  rec("lazertinib", "D", `${ORAL} Lazcluze is oral and Part D; its partner amivantamab is an infusion under Part B, so a patient on the MARIPOSA regimen pays under both benefits.`, "covered with prior authorisation", PA, { pap: [...PAP.jnj, ...PAP.charities], oop: CAP_OOP }),
  rec("alectinib", "D", ORAL, "covered with prior authorisation", `${PA} ALK rearrangement by an approved test.`, { pap: [...PAP.genentech, ...PAP.charities], oop: CAP_OOP }),
  rec("brigatinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.takeda, ...PAP.charities], oop: CAP_OOP }),
  rec("lorlatinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.pfizer, ...PAP.charities], oop: CAP_OOP }),
  rec("crizotinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.pfizer, ...PAP.charities], oop: CAP_OOP }),
  rec("ceritinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.novartis, ...PAP.charities], oop: CAP_OOP }),
  rec("ensartinib", "D", `${ORAL} FDA-approved December 2024.`, "covered with prior authorisation", PA, { oop: CAP_OOP }),
  rec("entrectinib", "D", ORAL, "covered with prior authorisation", `${PA} NTRK fusion or ROS1 rearrangement by an approved test.`, { pap: [...PAP.genentech, ...PAP.charities], oop: CAP_OOP }),
  rec("larotrectinib", "D", ORAL, "covered with prior authorisation", `${PA} NTRK fusion by an approved test.`, { pap: [...PAP.bayer, ...PAP.charities], oop: CAP_OOP }),
  rec("repotrectinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.bms, ...PAP.charities], oop: CAP_OOP }),
  rec("taletrectinib", "D", `${ORAL} FDA-approved June 2025.`, "covered with prior authorisation", PA, { oop: CAP_OOP }),
  rec("sotorasib", "D", ORAL, "covered with prior authorisation", `${PA} KRAS G12C by an approved test.`, { pap: [...PAP.amgen, ...PAP.charities], oop: CAP_OOP }),
  rec("adagrasib", "D", ORAL, "covered with prior authorisation", `${PA} KRAS G12C by an approved test.`, { pap: [...PAP.bms, ...PAP.charities], oop: CAP_OOP }),
  rec("capmatinib-tepotinib", "D", `${ORAL} Both Tabrecta and Tepmetko are Part D specialty drugs.`, "covered with prior authorisation", `${PA} MET exon 14 skipping by an approved test.`, { pap: [...PAP.novartis, ...PAP.emdSerono, ...PAP.charities], oop: CAP_OOP }),
  rec("selpercatinib", "D", ORAL, "covered with prior authorisation", `${PA} RET fusion or mutation by an approved test.`, { pap: [...PAP.lilly, ...PAP.charities], oop: CAP_OOP }),
  rec("pralsetinib", "D", ORAL, "covered with prior authorisation", PA, { pap: PAP.charities, oop: CAP_OOP }),
  rec("vandetanib", "D", ORAL, "covered with prior authorisation", PA, { oop: CAP_OOP }),
  rec("dabrafenib-trametinib", "D", `${ORAL} Both components are Part D; the paediatric oral suspensions are also Part D.`, "covered with prior authorisation", `${PA} BRAF V600 mutation by an approved test.`, { pap: [...PAP.novartis, ...PAP.charities], oop: CAP_OOP }),
  rec("encorafenib", "D", ORAL, "covered with prior authorisation", `${PA} BRAF V600E documented; colorectal use requires cetuximab (Part B) alongside.`, { pap: [...PAP.pfizer, ...PAP.charities], oop: CAP_OOP }),
  rec("binimetinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.pfizer, ...PAP.charities], oop: CAP_OOP }),
  rec("cobimetinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.genentech, ...PAP.charities], oop: CAP_OOP }),
  rec("vemurafenib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.genentech, ...PAP.charities], oop: CAP_OOP }),
  rec("tovorafenib", "D", `${ORAL} Paediatric low-grade glioma; most patients are on commercial family plans or Medicaid.`, "covered with prior authorisation", `${PA} BRAF fusion or V600 mutation documented.`, { oop: CAP_OOP }),
  rec("zongertinib", "D", `${ORAL} FDA accelerated approval 2025 for HER2-mutant NSCLC.`, "covered with prior authorisation", `${PA} HER2 (ERBB2) activating mutation by an approved test.`, { pap: [...PAP.boehringer, ...PAP.charities], oop: CAP_OOP }),
  rec("avutometinib-defactinib", "D", `${ORAL} FDA accelerated approval May 2025 for KRAS-mutant low-grade serous ovarian cancer.`, "covered with prior authorisation", `${PA} KRAS mutation documented; a rare indication most plans review individually.`, { oop: CAP_OOP }),

  // ---- GI, renal, hepatic and multi-kinase orals ----
  rec("regorafenib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.bayer, ...PAP.charities], oop: CAP_OOP }),
  rec("fruquintinib", "D", ORAL, "covered with prior authorisation", `${PA} Prior fluoropyrimidine, oxaliplatin, irinotecan and anti-VEGF therapy documented.`, { pap: [...PAP.takeda, ...PAP.charities], oop: CAP_OOP }),
  rec("sorafenib", "D", `${ORAL} Generic sorafenib is available.`, "covered on label", `${GENERIC_ORAL} Plans require the generic.`),
  rec("sunitinib", "D", `${ORAL} Generic sunitinib is available.`, "covered on label", `${GENERIC_ORAL} Plans require the generic.`),
  rec("pazopanib", "D", `${ORAL} Generic pazopanib is available.`, "covered on label", GENERIC_ORAL),
  rec("axitinib", "D", `${ORAL} Generic axitinib entered in 2025.`, "covered with prior authorisation", `${PA} Usually paired with pembrolizumab or avelumab (Part B).`, { pap: [...PAP.pfizer, ...PAP.charities], oop: CAP_OOP }),
  rec("cabozantinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.exelixis, ...PAP.charities], oop: CAP_OOP }),
  rec("lenvatinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.eisai, ...PAP.merck, ...PAP.charities], oop: CAP_OOP }),
  rec("tivozanib", "D", ORAL, "covered with prior authorisation", `${PA} Two or more prior systemic therapies for RCC documented.`, { pap: PAP.charities, oop: CAP_OOP }),
  rec("belzutifan", "D", ORAL, "covered with prior authorisation", `${PA} VHL disease or prior immunotherapy and VEGF-TKI for RCC.`, { pap: [...PAP.merck, ...PAP.charities], oop: CAP_OOP }),
  rec("erdafitinib", "D", ORAL, "covered with prior authorisation", `${PA} FGFR3 alteration by an approved test.`, { pap: [...PAP.jnj, ...PAP.charities], oop: CAP_OOP }),
  rec("pemigatinib", "D", ORAL, "covered with prior authorisation", `${PA} FGFR2 fusion documented.`, { pap: [...PAP.incyte, ...PAP.charities], oop: CAP_OOP }),
  rec("futibatinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.taiho, ...PAP.charities], oop: CAP_OOP }),
  rec("ivosidenib", "D", ORAL, "covered with prior authorisation", `${PA} IDH1 mutation by an approved test.`, { pap: [...PAP.servier, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("vorasidenib", "D", ORAL, "covered with prior authorisation", `${PA} IDH1/2-mutant grade 2 glioma after surgery, per the label.`, { pap: [...PAP.servier, ...PAP.charities], oop: CAP_OOP }),

  // ---- GIST, sarcoma, desmoid and rare-tumour orals ----
  rec("imatinib", "D", `${ORAL} Generic imatinib since 2016; often under $100 a month with insurance and far below the Gleevec price.`, "covered on label", `${GENERIC_ORAL} Brand Gleevec is usually excluded in favour of the generic.`),
  rec("avapritinib", "D", ORAL, "covered with prior authorisation", `${PA} PDGFRA exon 18 mutation (GIST) or systemic mastocytosis diagnosis.`, { pap: [...PAP.blueprint, ...PAP.charities], oop: CAP_OOP }),
  rec("ripretinib", "D", ORAL, "covered with prior authorisation", `${PA} Three or more prior kinase inhibitors for GIST.`, { pap: [...PAP.deciphera, ...PAP.charities], oop: CAP_OOP }),
  rec("pexidartinib", "D", `${ORAL} REMS-restricted for hepatotoxicity.`, "covered with prior authorisation", `${PA} Symptomatic tenosynovial giant cell tumour not amenable to surgery.`, { pap: PAP.charities, oop: CAP_OOP }),
  rec("vimseltinib", "D", `${ORAL} FDA-approved February 2025.`, "covered with prior authorisation", PA, { pap: [...PAP.deciphera, ...PAP.charities], oop: CAP_OOP }),
  rec("nirogacestat", "D", ORAL, "covered with prior authorisation", `${PA} Progressing desmoid tumour requiring systemic therapy.`, { pap: [...PAP.springworks, ...PAP.charities], oop: CAP_OOP }),
  rec("eflornithine", "D", `${ORAL} Iwilfin for high-risk neuroblastoma maintenance; paediatric, so mostly Medicaid/CHIP and commercial family plans.`, "covered with prior authorisation", PA, { oop: CAP_OOP }),
  rec("vismodegib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.genentech, ...PAP.charities], oop: CAP_OOP }),
  rec("sonidegib", "D", ORAL, "covered with prior authorisation", PA, { pap: PAP.charities, oop: CAP_OOP }),

  // ---- Haematology: BCR-ABL, BTK, BCL-2, PI3K, JAK, FLT3, IDH, menin ----
  rec("dasatinib", "D", `${ORAL} Generic dasatinib launched in the US in 2024.`, "step therapy common", "Many commercial plans require generic imatinib first for chronic-phase CML unless there is a documented reason for a second-generation TKI; the generic is now preferred over Sprycel.", { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("nilotinib", "D", `${ORAL} Generic nilotinib is available; Danziten (nilotinib tartrate) is a newer branded formulation.`, "step therapy common", "Generic imatinib first is a common commercial requirement; generic nilotinib preferred over Tasigna.", { pap: [...PAP.novartis, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("bosutinib", "D", ORAL, "step therapy common", "Generic imatinib first is common; Bosulif otherwise covered with prior authorisation.", { pap: [...PAP.pfizer, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("ponatinib", "D", ORAL, "covered with prior authorisation", `${PA} T315I mutation or failure/intolerance of two prior TKIs, per the label.`, { pap: [...PAP.takeda, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("asciminib", "D", ORAL, "covered with prior authorisation", `${PA} First-line CML label (2024) has loosened prior-TKI requirements at some plans.`, { pap: [...PAP.novartis, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("ibrutinib", "D", `${ORAL} Imbruvica was in the first group of ten drugs negotiated under the Inflation Reduction Act: the Medicare maximum fair price of $9,319 per 30-day supply took effect 1 January 2026, a 38% cut from the 2023 list price.`, "covered with prior authorisation", `${PA} Several PBMs now prefer acalabrutinib or zanubrutinib over ibrutinib for CLL on the basis of head-to-head trials.`, {
    price: { value: 14934, per: "30-day supply, 2023 list price; negotiated Medicare price $9,319 from 2026", source: "CMS fact sheet, Medicare Drug Price Negotiation Program negotiated prices for 2026", url: SRC.negotiated2026.url, year: 2023 },
    pap: [...PAP.jnj, ...PAP.abbvie, ...PAP.charities, ...PAP.lls], oop: CAP_OOP, sources: [SRC.negotiation, SRC.negotiated2026],
  }),
  rec("acalabrutinib", "D", `${ORAL} Calquence was selected for Medicare price negotiation in January 2025; the negotiated price takes effect 1 January 2027.`, "covered with prior authorisation", `${PA} Preferred BTK inhibitor on several commercial formularies.`, { pap: [...PAP.az, ...PAP.charities, ...PAP.lls], oop: CAP_OOP, sources: [SRC.negotiation] }),
  rec("zanubrutinib", "D", ORAL, "covered with prior authorisation", `${PA} Preferred BTK inhibitor on several commercial formularies.`, { pap: [...PAP.beigene, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("pirtobrutinib", "D", ORAL, "covered with prior authorisation", `${PA} Prior covalent BTK inhibitor required, per the label.`, { pap: [...PAP.lilly, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("venetoclax", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.abbvie, ...PAP.genentech, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("idelalisib", "D", ORAL, "covered with prior authorisation", `${PA} Restricted to relapsed CLL with rituximab after indication withdrawals.`, { pap: [...PAP.gilead, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("duvelisib", "D", ORAL, "covered with prior authorisation", `${PA} Two or more prior therapies for CLL/SLL.`, { pap: [...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("ruxolitinib", "D", `${ORAL} Jakafi is a Part D specialty drug; generic entry is not expected before 2028.`, "covered with prior authorisation", PA, { pap: [...PAP.incyte, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("fedratinib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("pacritinib", "D", ORAL, "covered with prior authorisation", `${PA} Platelet count below 50,000 documented, per the label.`, { pap: [...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("momelotinib", "D", ORAL, "covered with prior authorisation", `${PA} Myelofibrosis with anaemia documented.`, { pap: [...PAP.gsk, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("midostaurin", "D", `${ORAL} Oral, taken with induction chemotherapy; inpatient doses are bundled into the Part A stay, outpatient supply is Part D.`, "covered with prior authorisation", `${PA} FLT3 mutation by an approved test.`, { pap: [...PAP.novartis, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("gilteritinib", "D", ORAL, "covered with prior authorisation", `${PA} FLT3 mutation by an approved test.`, { pap: [...PAP.astellas, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("quizartinib", "D", `${ORAL} REMS-restricted for QT prolongation.`, "covered with prior authorisation", `${PA} FLT3-ITD by an approved test.`, { pap: [...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("enasidenib", "D", ORAL, "covered with prior authorisation", `${PA} IDH2 mutation by an approved test.`, { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("olutasidenib", "D", ORAL, "covered with prior authorisation", `${PA} IDH1 mutation by an approved test.`, { pap: [...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("revumenib", "D", `${ORAL} FDA-approved November 2024 for KMT2A-rearranged acute leukaemia; NPM1-mutant AML added 2025.`, "covered with prior authorisation", `${PA} KMT2A rearrangement or NPM1 mutation documented.`, { pap: [...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("glasdegib", "D", ORAL, "covered with prior authorisation", PA, { pap: [...PAP.pfizer, ...PAP.charities, ...PAP.lls], oop: CAP_OOP }),
  rec("luspatercept", "B", `${IV} Subcutaneous injection every three weeks by a clinician; HCPCS J0896.`, "covered with prior authorisation", `${PA_IV} Transfusion burden and erythropoiesis-stimulating agent history documented for MDS.`, { pap: [...PAP.bms, ...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("imetelstat", "B", `${IV} Every-four-week infusion for lower-risk MDS (approved June 2024).`, "covered with prior authorisation", `${PA_IV} Transfusion-dependent lower-risk MDS after ESA failure.`, { pap: [...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("ropeginterferon-alfa-2b", "B", "Subcutaneous injection every two weeks; when administered in the clinic it is billed under Part B, and the label permits self-injection after training, in which case Part D plans may cover it. Confirm which benefit the plan applies.", "covered with prior authorisation", `${PA} Polycythaemia vera; some plans require hydroxyurea intolerance or failure first.`, { pap: [...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("tagraxofusp", "B", `${IV} First cycle given inpatient for capillary leak syndrome monitoring (Part A).`, "covered with prior authorisation", PA_IV, { pap: [...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("romidepsin", "B", `${IV} Generic romidepsin is available.`, "covered on label", `${GENERIC} Prior authorisation is uncommon.`, { pap: [...PAP.charities, ...PAP.lls] }),
  rec("belinostat", "B", IV, "covered with prior authorisation", PA_IV, { pap: [...PAP.charities, ...PAP.lls], oop: B_OOP }),
  rec("pralatrexate", "B", `${IV} Generic pralatrexate is available.`, "covered with prior authorisation", PA_IV, { pap: [...PAP.charities, ...PAP.lls], oop: B_OOP }),

  // ---- Radiopharmaceuticals (therapy) ----
  rec("pluvicto", "B", `${IV} Radioligand therapy given in nuclear medicine; HCPCS A9607. Paid separately under the hospital outpatient system; the six-dose course is spread over about eight months, so coinsurance recurs with each dose.`, "covered with prior authorisation", `${PA_IV} PSMA-positive disease on an approved PET scan, and prior androgen receptor pathway inhibitor (taxane no longer required since the 2025 label expansion).`, { pap: [...PAP.novartis, ...PAP.charities], oop: B_OOP }),
  rec("lutathera", "B", `${IV} HCPCS A9513. Four doses eight weeks apart.`, "covered with prior authorisation", `${PA_IV} Somatostatin receptor-positive GEP-NET on an approved PET scan.`, { pap: [...PAP.novartis, ...PAP.charities], oop: B_OOP }),
  rec("radium-223", "B", `${IV} HCPCS A9606. Six monthly injections.`, "covered with prior authorisation", `${PA_IV} Symptomatic bone metastases without visceral disease, per the label.`, { pap: [...PAP.bayer, ...PAP.charities], oop: B_OOP }),
  rec("radioactive-iodine", "B", `${IV} Oral capsule or solution, but administered in nuclear medicine, so it is a Part B radiopharmaceutical rather than a Part D drug. Inpatient isolation for high-dose treatment is Part A.`, "covered on label", "Covered as a standard part of thyroid cancer care; higher doses for remnant ablation may need prior authorisation."),

  // ---- Imaging and surgical agents ----
  rec("ga68-psma-11", "B", `Diagnostic radiopharmaceutical billed with the PET/CT scan under Part B. Since 2025, Medicare's hospital outpatient system pays separately for diagnostic radiopharmaceuticals whose per-day cost exceeds a threshold, which covers PSMA agents. Medicare Administrative Contractors decide PET coverage for prostate cancer; all now cover PSMA PET for initial staging of unfavourable risk disease and biochemical recurrence.`, "covered with prior authorisation", "PSMA PET is covered by most commercial plans for staging and recurrence with prior authorisation for the imaging procedure; radiology benefit managers apply appropriateness criteria.", { sources: [SRC.imaging] }),
  rec("pylarify", "B", "Diagnostic radiopharmaceutical billed with the PET/CT scan under Part B; separately paid in the hospital outpatient system since 2025. Coverage of the scan itself is set by the local Medicare Administrative Contractor.", "covered with prior authorisation", "Commercial plans cover PSMA PET for staging and recurrence with prior authorisation of the imaging procedure.", { sources: [SRC.imaging] }),
  rec("flotufolastat", "B", "Diagnostic radiopharmaceutical billed with the PET/CT scan under Part B; same coverage pathway as other PSMA PET agents.", "covered with prior authorisation", "Commercial plans cover PSMA PET for staging and recurrence with prior authorisation of the imaging procedure.", { sources: [SRC.imaging] }),
  rec("fluciclovine-f18", "B", "Diagnostic radiopharmaceutical billed with the PET/CT scan under Part B for suspected prostate cancer recurrence; PSMA agents have largely displaced it.", "variable", "Covered by many plans for biochemical recurrence, but some now require PSMA PET as the preferred tracer.", { sources: [SRC.imaging] }),
  rec("ga68-dotatate", "B", "Diagnostic radiopharmaceutical billed with the PET/CT scan under Part B for neuroendocrine tumours (Netspot, Detectnet).", "covered with prior authorisation", "Covered for neuroendocrine tumour staging and Lutathera eligibility with prior authorisation of the PET scan.", { sources: [SRC.imaging] }),
  rec("fluoroestradiol-f18", "B", "Diagnostic radiopharmaceutical billed with the PET/CT scan under Part B; Cerianna is approved as an adjunct to biopsy for oestrogen receptor-positive lesions in recurrent or metastatic breast cancer.", "variable", "Newer tracer; many commercial plans still class FES PET as investigational or cover only when biopsy is not feasible.", { sources: [SRC.imaging] }),
  rec("tilmanocept-tc99m", "B", "Radiopharmaceutical for sentinel lymph node mapping, billed with the nuclear medicine procedure under Part B; when used in the operating room it is bundled into the surgical payment.", "covered on label", "Covered as part of the sentinel node procedure for breast cancer, melanoma and oral cancer; no separate authorisation.", { sources: [SRC.imaging] }),
  rec("pafolacianine", "B", "Intraoperative imaging agent given before surgery; bundled into the hospital procedure payment (Part A inpatient or Part B outpatient) rather than paid as a drug. CMS granted temporary pass-through payment in the outpatient setting after approval.", "variable", "Bundled into the surgical claim; coverage follows the surgery. Some plans class it as investigational.", { sources: [SRC.inpatient] }),
  rec("pegulicianine", "B", "Intraoperative imaging agent for breast lumpectomy margin assessment, bundled into the surgical payment; hospital outpatient use had a pass-through payment code after approval.", "variable", "Bundled into the surgical claim; some plans consider it investigational.", { sources: [SRC.inpatient] }),
  rec("aminolevulinic-acid-gleolan", "B", "Oral solution given two to four hours before glioma surgery in the hospital, so it is a surgical supply bundled into the Part A inpatient stay rather than a pharmacy benefit.", "covered on label", "Bundled into the craniotomy claim; no separate authorisation is typical.", { sources: [SRC.inpatient] }),

  // ---- Devices and tests ----
  rec("optune", "B", "Tumour treating fields is durable medical equipment under Part B: covered under the DME MAC local coverage determination for tumour treatment field therapy for newly diagnosed glioblastoma after chemoradiation with temozolomide, and for recurrent glioblastoma. Rental is monthly; the patient owes 20% coinsurance.", "variable", "Many commercial plans cover Optune for newly diagnosed glioblastoma with prior authorisation; some still exclude it as investigational, and pleural mesothelioma (Optune Lua) coverage is patchier. Novocure's nCompass programme handles appeals.", { url: SRC.mcd.url, sources: [SRC.dme, SRC.mcd], pap: PAP.novocure, oop: "Monthly DME rental with 20% coinsurance in Original Medicare; Medigap covers it. Novocure has a financial assistance programme for eligible patients." }),
  rec("foundationone-cdx", "B", "Covered nationally under NCD 90.2 as an FDA-approved companion diagnostic NGS test for patients with recurrent, relapsed, refractory, metastatic or advanced stage III/IV cancer who have not previously had the same test for the same primary cancer. Laboratory tests under Part B have no coinsurance.", "variable", "Most large commercial plans cover comprehensive genomic profiling for advanced NSCLC and increasingly for other advanced solid tumours, with prior authorisation; some limit panel size or require a specific lab.", { ncd: "90.2", url: SRC.ngs.url, sources: [SRC.ngs, SRC.labs], pap: [{ program: "Foundation Medicine financial assistance", url: "https://www.foundationmedicine.com/" }], oop: "No Part B coinsurance on clinical laboratory tests. Foundation Medicine offers a patient assistance programme for out-of-pocket costs." }),
  rec("shield", "B", "Medicare covers a blood-based colorectal cancer screening test every three years for people aged 45 to 85 at average risk when the test is FDA-approved and meets the sensitivity and specificity thresholds in NCD 210.3; Shield qualified in 2024. As a screening test it has no deductible or coinsurance.", "variable", "Blood-based screening is not yet in the USPSTF recommendation, so the ACA $0 preventive mandate does not apply; some commercial plans cover Shield, others do not, and the patient may pay the cash price.", { ncd: "210.3", url: SRC.mcd.url, sources: [SRC.crcScreen, SRC.mcd], pap: [{ program: "Guardant Shield financial assistance", url: "https://shieldcancerscreen.com/" }] }),
  rec("artera-ai-prostate", "B", "Digital pathology prognostic test covered by Medicare for localised prostate cancer through the MolDX programme (Palmetto GBA local coverage) since 2023; billed as a laboratory test under Part B with no coinsurance.", "variable", "Commercial coverage is limited and case by case; the lab often bills the patient after a coverage denial or offers a financial assistance programme.", { url: SRC.mcd.url, sources: [SRC.labs, SRC.mcd] }),
  rec("artera-ai-breast", "unknown", "Newer test; no Medicare coverage determination had been published at the time of writing. Check the MolDX programme for a current decision.", "unknown", "Commercial coverage not yet established.", { sources: [SRC.mcd] }),
  rec("gardasil-9", "D", "Medicare Part D covers ACIP-recommended vaccines, including HPV vaccine for eligible adults through age 45, at no cost since 2023 under the Inflation Reduction Act; Part B does not cover it. Most Medicare beneficiaries are outside the recommended age range.", "covered on label", "ACA-compliant commercial plans cover ACIP-recommended vaccines with no cost sharing in network, including HPV vaccination through age 26 and shared decision-making for 27 to 45. Medicaid and the Vaccines for Children programme cover children and adolescents.", { sources: [SRC.vaccines, { label: "HealthCare.gov: Preventive care benefits for adults", url: "https://www.healthcare.gov/preventive-care-adults/" }] }),
];

/** Fail loudly at import time if a drug id is recorded twice. */
const seen = new Set<string>();
for (const r of RECORDS) {
  if (seen.has(r.drugId)) throw new Error(`coverage-us: duplicate record for ${r.drugId}`);
  seen.add(r.drugId);
}

export const coverageUs: Record<string, UsCoverage> = Object.fromEntries(RECORDS.map((r) => [r.drugId, r]));

/** System-level explainers: how paying for cancer care works in the United States. Plain first, detail second. */
export const US_SYSTEM: Array<{ id: string; title: string; plain: string; detail: string; links: Array<{ label: string; url: string }> }> = [
  {
    id: "medicare-a-b",
    title: "Medicare Parts A and B (Original Medicare)",
    plain: "Medicare is the federal programme for people 65 and over and some younger people with disabilities. Part A pays for hospital stays. Part B pays for doctors, outpatient care and the cancer drugs a clinician gives you by infusion or injection. You pay 20% of the Part B bill, and there is no ceiling on that 20% unless you buy a Medigap policy.",
    detail: "Part A covers inpatient admissions (including inpatient chemotherapy, stem-cell transplant and CAR-T stays, paid by diagnosis-related group) after a per-benefit-period deductible. Part B covers physician services, hospital outpatient care, radiation therapy, imaging, laboratory tests (no coinsurance), durable medical equipment and drugs that are not usually self-administered, which in oncology means most infused and injected products. Part B pays physicians average sales price plus 6% (about 4.3% after sequestration) for drugs; hospital outpatient departments are paid under the outpatient prospective payment system, or at a reduced rate for 340B hospitals in some years. The beneficiary owes an annual deductible then 20% coinsurance with no out-of-pocket maximum. Medigap plans G and N, employer retiree coverage or Medicaid (for dual eligibles) cover that 20%; roughly one in five Original Medicare beneficiaries has none of these and is fully exposed.",
    links: [
      { label: "Medicare.gov: Parts of Medicare", url: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/parts-of-medicare" },
      { label: "Medicare.gov: Chemotherapy", url: SRC.chemo.url },
      { label: "Medicare.gov: Medigap (Medicare Supplement Insurance)", url: "https://www.medicare.gov/health-drug-plans/medigap" },
    ],
  },
  {
    id: "medicare-d",
    title: "Medicare Part D: pills you take at home",
    plain: "Part D is separate drug insurance you buy from a private plan. It covers the cancer pills and self-injections you take at home. Since 2025 there is a hard limit on what you pay each year for Part D drugs: $2,000 in 2025, $2,100 in 2026. Before that, people on oral cancer drugs could pay $10,000 or more a year.",
    detail: "Part D plans (stand-alone or inside Medicare Advantage) must cover substantially all drugs in six protected classes, one of which is antineoplastics, so every oral cancer drug is on every formulary, although plans can apply prior authorisation and quantity limits. Oral oncology drugs sit on the specialty tier, typically 25 to 33% coinsurance. The Inflation Reduction Act removed the 5% catastrophic coinsurance in 2024 and capped out-of-pocket spending at $2,000 in 2025 (indexed: $2,100 in 2026). The Medicare Prescription Payment Plan lets beneficiaries spread the cap in monthly instalments rather than paying it in January. Manufacturers pay 20% of the cost of brand drugs in the catastrophic phase, which has led some plans to push utilisation management harder. Manufacturer co-pay coupons cannot be used by Medicare beneficiaries under the anti-kickback statute; Extra Help (the low-income subsidy) and independent charity funds are the routes to lower cost sharing.",
    links: [
      { label: "Medicare.gov: Drug coverage (Part D)", url: SRC.partD.url },
      { label: "Medicare.gov: Costs for Medicare drug coverage", url: SRC.partDCosts.url },
      { label: "Medicare.gov: Medicare Prescription Payment Plan", url: "https://www.medicare.gov/prescription-payment-plan" },
      { label: "Social Security: Extra Help with Part D costs", url: "https://www.ssa.gov/medicare/part-d-extra-help" },
    ],
  },
  {
    id: "part-b-vs-d",
    title: "Part B or Part D? Why the route of administration decides your bill",
    plain: "The same cancer can be treated with an infusion (Part B, 20% of a large bill with no cap) or a pill (Part D, capped at about $2,000 a year). Two drugs for the same disease can therefore cost a patient very different amounts. A handful of oral chemotherapy drugs that also come as injections (capecitabine, temozolomide, cyclophosphamide, methotrexate, etoposide, topotecan, melphalan) are covered by Part B too.",
    detail: "Part B pays for drugs 'not usually self-administered' that are furnished incident to a physician's service, plus specific statutory categories: oral anticancer drugs with an injectable equivalent used for the same indication, oral anti-emetics used within 48 hours of chemotherapy as a full replacement for IV anti-emetics, immunosuppressants after a Medicare-covered transplant, and drugs infused through durable medical equipment such as an ambulatory pump (home 5-FU). Everything else self-administered falls to Part D. Local Medicare contractors publish self-administered drug exclusion lists. Since 2019 Medicare Advantage plans may apply step therapy to Part B drugs, and most do for biosimilars and checkpoint inhibitors. A subcutaneous formulation given by a nurse (Darzalex Faspro, Phesgo, Opdivo Qvantig, Keytruda Qlex) stays in Part B; an oral drug that replaces an infusion (relugolix replacing leuprolide) moves the patient into Part D.",
    links: [
      { label: "Medicare.gov: Prescription drugs (outpatient)", url: SRC.outpatientDrugs.url },
      { label: "Medicare.gov: Chemotherapy", url: SRC.chemo.url },
    ],
  },
  {
    id: "medicare-advantage",
    title: "Medicare Advantage (Part C)",
    plain: "About half of people on Medicare choose a private Medicare Advantage plan instead of Original Medicare. These plans cap your yearly spending on medical care, which Original Medicare does not, but they use networks, prior authorisation and step therapy. Check that your cancer centre is in network before you enrol, because switching back to Original Medicare later can leave you unable to buy a Medigap policy.",
    detail: "Medicare Advantage plans must cover everything Parts A and B cover and usually bundle Part D. In 2025 the maximum in-network out-of-pocket limit for medical (not drug) spending was $9,350, with many plans lower. In exchange, plans manage utilisation: prior authorisation is nearly universal for Part B oncology drugs, step therapy on Part B drugs has been permitted since 2019, and networks may exclude NCI-designated centres. Prior authorisation denials in Medicare Advantage are overturned on appeal most of the time, and CMS rules from 2024 require plans to follow Medicare coverage criteria and to honour approved authorisations for at least 90 days after a plan switch. Disenrolling back to Original Medicare is possible each autumn, but Medigap insurers in most states may underwrite or refuse applicants with a cancer history after the first year of Medicare eligibility.",
    links: [
      { label: "Medicare.gov: Medicare Advantage plans", url: "https://www.medicare.gov/health-drug-plans/health-plans" },
      { label: "KFF: Medicare Advantage in 2025 enrollment update", url: "https://www.kff.org/medicare/issue-brief/medicare-advantage-in-2025-enrollment-update-and-key-trends/" },
      { label: "Medicare.gov: Appeals", url: "https://www.medicare.gov/claims-appeals/how-do-i-file-an-appeal" },
    ],
  },
  {
    id: "medicaid",
    title: "Medicaid and CHIP",
    plain: "Medicaid is the state-run programme for people with low incomes; CHIP covers children. Rules differ by state, and ten states have not expanded Medicaid to all low-income adults, so a working-age adult with cancer and no children may have no route to coverage there. Where you qualify, Medicaid covers cancer drugs with little or no copay.",
    detail: "Medicaid covers all FDA-approved drugs from manufacturers in the federal rebate programme, so every approved cancer drug is coverable, subject to prior authorisation and state preferred drug lists. Copays are nominal and capped as a share of income. Eligibility in expansion states is 138% of the federal poverty level; in the ten non-expansion states (in 2025: Alabama, Florida, Georgia, Kansas, Mississippi, South Carolina, Tennessee, Texas, Wisconsin, Wyoming), childless adults generally qualify only through disability. The Breast and Cervical Cancer Prevention and Treatment Act gives a Medicaid pathway to people diagnosed through the CDC screening programme. Dual eligibles (Medicare plus Medicaid) have their Part B coinsurance and Part D cost sharing covered. The 2025 federal budget law introduced work requirements and more frequent eligibility checks for expansion adults from 2027, which cancer advocacy groups expect to cause coverage churn during treatment; medically frail exemptions apply but must be documented.",
    links: [
      { label: "Medicaid.gov", url: "https://www.medicaid.gov/" },
      { label: "HealthCare.gov: Medicaid and CHIP", url: "https://www.healthcare.gov/medicaid-chip/" },
      { label: "KFF: Status of state Medicaid expansion decisions", url: "https://www.kff.org/status-of-state-medicaid-expansion-decisions/" },
      { label: "CDC: National Breast and Cervical Cancer Early Detection Program", url: "https://www.cdc.gov/breast-cervical-cancer-screening/about/index.html" },
    ],
  },
  {
    id: "commercial",
    title: "Commercial insurance and prior authorisation",
    plain: "Most Americans under 65 are insured through work. Employer and marketplace plans cover approved cancer drugs, but nearly every branded cancer drug needs prior authorisation: your oncologist's office must show the plan that the drug matches your diagnosis, biomarker results and previous treatments. Infusions go through the medical benefit; pills go through a specialty pharmacy under the pharmacy benefit, often with a coinsurance of 20 to 40% until you hit your plan's out-of-pocket maximum.",
    detail: "Commercial plans split drugs between the medical benefit (physician-administered, billed by the clinic, often with site-of-care steering away from hospital outpatient departments) and the pharmacy benefit run by a PBM (oral and self-injected, dispensed by the PBM's specialty pharmacy). Coverage criteria track the FDA label and NCCN compendia (most states require insurers to cover compendia-listed off-label uses). The ACA caps annual in-network out-of-pocket spending ($9,200 individual in 2025) but high-deductible plans front-load that cost into the first weeks of treatment. Co-pay accumulator and maximiser programmes may stop manufacturer co-pay cards from counting towards the deductible; several states have banned this. Employer self-funded plans (ERISA) are exempt from state mandates, including step-therapy and accumulator bans. Oncology pathway programmes and clinical-pathway vendors increasingly attach preferred regimens to authorisation.",
    links: [
      { label: "HealthCare.gov: Out-of-pocket maximum", url: "https://www.healthcare.gov/glossary/out-of-pocket-maximum-limit/" },
      { label: "American Medical Association: Prior authorization", url: "https://www.ama-assn.org/practice-management/prior-authorization" },
      { label: "KFF: Employer Health Benefits Survey", url: "https://www.kff.org/health-costs/report/employer-health-benefits-survey/" },
    ],
  },
  {
    id: "aca",
    title: "The Affordable Care Act and pre-existing conditions",
    plain: "Since 2014, insurers cannot refuse to cover you, charge you more or cap your lifetime benefits because you have or had cancer. Marketplace plans must cover prescription drugs and cancer screening, and you can buy one even mid-treatment during open enrolment or after losing job coverage.",
    detail: "The ACA bans pre-existing condition exclusions, medical underwriting and annual or lifetime dollar limits on essential health benefits, which include prescription drugs, hospitalisation, laboratory services and preventive care (USPSTF A/B screening such as mammography, colonoscopy, lung CT and cervical screening at $0). Marketplace subsidies are income-based; the enhanced subsidies enacted in 2021 expired at the end of 2025, raising premiums for many enrollees in 2026. Losing employer coverage triggers a special enrolment period; COBRA continuation is an alternative but costs the full premium. Short-term and some association plans are not ACA-compliant and may still exclude cancer. Section 2709 of the Public Health Service Act requires non-grandfathered plans to cover routine patient costs in approved clinical trials.",
    links: [
      { label: "HealthCare.gov: Coverage for pre-existing conditions", url: "https://www.healthcare.gov/coverage/pre-existing-conditions/" },
      { label: "HealthCare.gov: What Marketplace plans cover", url: "https://www.healthcare.gov/coverage/what-marketplace-plans-cover/" },
      { label: "HealthCare.gov: Preventive care benefits", url: "https://www.healthcare.gov/preventive-care-adults/" },
    ],
  },
  {
    id: "ira",
    title: "The Inflation Reduction Act: the $2,000 cap and Medicare price negotiation",
    plain: "A 2022 law made three changes that matter for cancer. Medicare drug-plan spending is now capped ($2,000 in 2025, $2,100 in 2026). Medicare now negotiates prices for its most expensive drugs, and the first list included the leukaemia and lymphoma pill Imbruvica, whose Medicare price fell 38% from January 2026. And drug makers must pay rebates if they raise prices faster than inflation.",
    detail: "Negotiation: CMS selected ten Part D drugs in 2023 (prices effective 1 January 2026), including ibrutinib (Imbruvica: list $14,934 per 30 days in 2023, maximum fair price $9,319). Fifteen more were selected in January 2025 for 2027, including palbociclib (Ibrance), enzalutamide (Xtandi), pomalidomide (Pomalyst) and acalabrutinib (Calquence). The third cycle, selected in January 2026 for 2028, adds Part B (physician-administered) drugs for the first time. Negotiated prices apply to Medicare only, though they anchor commercial negotiations. Other provisions: Part B coinsurance on biosimilars is calculated against the reference product's price; manufacturers owe inflation rebates on Part B and Part D drugs whose prices rise faster than CPI-U; the coverage gap and the 5% catastrophic coinsurance were eliminated; Part D vaccines are free; Extra Help was expanded to 150% of poverty. Litigation by manufacturers against the negotiation programme has so far failed in the courts.",
    links: [
      { label: "CMS: Medicare Drug Price Negotiation Program", url: SRC.negotiation.url },
      { label: "CMS fact sheet: negotiated prices for 2026", url: SRC.negotiated2026.url },
      { label: "CMS: Inflation Reduction Act and Medicare", url: "https://www.cms.gov/inflation-reduction-act-and-medicare" },
      { label: "Medicare.gov: Costs for Medicare drug coverage", url: SRC.partDCosts.url },
    ],
  },
  {
    id: "340b",
    title: "The 340B programme",
    plain: "Hospitals that serve many low-income patients can buy outpatient drugs at steep discounts from manufacturers. The discount goes to the hospital, not automatically to you; whether it lowers your bill depends on the hospital's charity policy.",
    detail: "Section 340B of the Public Health Service Act requires manufacturers participating in Medicaid to sell covered outpatient drugs to eligible hospitals and clinics (disproportionate share hospitals, children's hospitals, cancer hospitals, federally qualified health centres) at a ceiling price, roughly 25 to 50% below list. Insurers, including Medicare, still pay the hospital the normal rate, so the spread funds the hospital. Oncology drugs account for a large share of 340B purchases and have driven the shift of infusion from physician offices to hospital outpatient departments. Disputes over contract pharmacies, manufacturer restrictions and Medicare's 2018 to 2022 payment cut (struck down by the Supreme Court in 2022, with remedy payments made in 2024) continue. Patients can ask whether a 340B hospital passes discounts on through its financial assistance policy.",
    links: [
      { label: "HRSA: 340B Drug Pricing Program", url: "https://www.hrsa.gov/opa" },
      { label: "MedPAC: 340B in Medicare Part B", url: "https://www.medpac.gov/" },
    ],
  },
  {
    id: "eom",
    title: "Payment reform: from the Oncology Care Model to the Enhancing Oncology Model",
    plain: "Medicare has been testing ways to pay oncology practices for keeping patients well and out of hospital rather than for the volume of drugs they give. If your practice takes part, you should get 24/7 access to a clinician, a written care plan and help navigating costs, at no extra charge.",
    detail: "The Oncology Care Model (2016 to 2022) paid about 200 practices a monthly enhanced-services fee per patient on chemotherapy and offered performance payments for reducing total episode cost; evaluations found modest savings concentrated in high-risk episodes and improved processes but no reduction in overall Medicare spending after the fees. The Enhancing Oncology Model began in July 2023 for seven cancer types, added a mandatory downside risk, a lower monthly fee, requirements for health-related social needs screening and electronic patient-reported outcomes, and new participants in 2025. Commercial payers run parallel episode and pathway programmes. Payment models influence which regimens are offered when cost is a tie-breaker, and they fund the navigation and financial counselling services described below.",
    links: [
      { label: "CMS Innovation Center: Enhancing Oncology Model", url: "https://www.cms.gov/priorities/innovation/innovation-models/enhancing-oncology-model" },
      { label: "CMS Innovation Center: Oncology Care Model (archived)", url: "https://www.cms.gov/priorities/innovation/innovation-models/oncology-care" },
    ],
  },
  {
    id: "financial-toxicity",
    title: "Financial toxicity and financial navigation",
    plain: "Cancer is one of the most common causes of medical debt and bankruptcy in the United States, even for insured people. Ask your cancer centre for a financial navigator or oncology social worker early: they can find assistance programmes, appeal denials, set up payment plans and apply for hospital charity care on your behalf.",
    detail: "Around 40% of US cancer patients report material financial hardship; those who file for bankruptcy after diagnosis have a measurably higher mortality. Drivers include cost sharing on drugs, lost income, travel and caregiving, and denials or delays. The NCI, ASCO and NCCN now treat financial toxicity as an adverse event to be screened for (the COST measure). Financial navigation programmes at cancer centres, funded partly through the Enhancing Oncology Model and philanthropy, secure manufacturer free drug, charity co-pay grants, Medicaid or Marketplace enrolment, disability benefits and charity care. Non-profit hospitals must publish a financial assistance policy under IRS section 501(r) and offer discounts before pursuing collections; many states set income thresholds for free care. Medical debt under $500 or less than a year old no longer appears on major credit reports.",
    links: [
      { label: "NCI PDQ: Financial toxicity of cancer treatment", url: "https://www.cancer.gov/about-cancer/managing-care/track-care-costs/financial-toxicity-pdq" },
      { label: "IRS: Hospital financial assistance policies (section 501(r))", url: "https://www.irs.gov/charities-non-profits/financial-assistance-policy-and-emergency-medical-care-policy-section-501r4" },
      { label: "Association of Cancer Care Centers: Financial advocacy", url: "https://www.accc-cancer.org/home/learn/financial-advocacy" },
    ],
  },
  {
    id: "trials",
    title: "Clinical trial coverage",
    plain: "Joining a clinical trial should not cost you more than standard care. Medicare, Medicaid (since 2022) and ACA-compliant private plans must pay for the routine care you would have had anyway, such as visits, scans and standard drugs, while the trial sponsor pays for the experimental treatment and research-only tests.",
    detail: "Medicare NCD 310.1 (2000, revised 2007) covers routine costs in qualifying clinical trials, including items and services needed to administer the investigational agent and to manage complications; the investigational drug itself and research-only procedures are excluded, and sponsors usually supply the drug free. The CLINICAL TREATMENT Act, enacted in the Consolidated Appropriations Act 2021 and effective 1 January 2022, extends the same requirement to all state Medicaid programmes for serious or life-threatening conditions. Section 2709 of the Public Health Service Act (added by the ACA) requires non-grandfathered private plans to cover routine costs in approved trials and bars them from denying participation, although plans may require in-network providers where an equivalent trial exists. Out-of-network trial sites, travel and lodging remain common gaps; some sponsors and charities (Lazarex Cancer Foundation, NCI Community Oncology Research Program sites) help with travel.",
    links: [
      { label: "Medicare.gov: Clinical research studies", url: "https://www.medicare.gov/coverage/clinical-research-studies" },
      { label: "CMS NCD 310.1: Routine costs in clinical trials", url: "https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?ncdid=1" },
      { label: "Congress.gov: CLINICAL TREATMENT Act (H.R. 913, 116th Congress)", url: "https://www.congress.gov/bill/116th-congress/house-bill/913" },
      { label: "NCI: Paying for clinical trials", url: "https://www.cancer.gov/research/participate/clinical-trials/paying" },
    ],
  },
  {
    id: "assistance",
    title: "Manufacturer and charity assistance programmes",
    plain: "Every large cancer drug maker runs a programme that gives its drug free to uninsured or underinsured patients below an income limit, and a co-pay card that covers most of the out-of-pocket cost for people with commercial insurance. Medicare patients cannot use co-pay cards, but independent charities run disease-specific funds that pay Medicare cost sharing. The funds open and close through the year, so check often.",
    detail: "Manufacturer patient assistance programmes (PAPs) provide free product to patients typically below 400 to 600% of the federal poverty level with no insurance or after a coverage denial; each requires a physician form and proof of income and takes days to weeks. Manufacturer co-pay programmes are lawful only for commercially insured patients; the anti-kickback statute bars them for Medicare and Medicaid. Independent charities (PAN Foundation, HealthWell, CancerCare Co-Payment Assistance Foundation, Patient Advocate Foundation Co-Pay Relief, Leukemia & Lymphoma Society, Good Days) receive manufacturer donations under Office of Inspector General guidance and pay Medicare cost sharing within disease funds that have income caps (usually 400 to 500% FPL). Several manufacturers settled kickback cases over charity steering in 2018 to 2020, making today's funds strictly disease-based rather than drug-based. Hospitals also run replacement programmes that recover free drug from manufacturers on behalf of uninsured patients.",
    links: [
      { label: "PAN Foundation", url: "https://www.panfoundation.org/" },
      { label: "HealthWell Foundation", url: "https://www.healthwellfoundation.org/" },
      { label: "CancerCare Co-Payment Assistance Foundation", url: "https://www.cancercarecopay.org/" },
      { label: "Medicine Assistance Tool (PhRMA)", url: "https://medicineassistancetool.org/" },
      { label: "NeedyMeds", url: "https://www.needymeds.org/" },
    ],
  },
  {
    id: "biosimilars",
    title: "Biosimilars and step therapy",
    plain: "Biosimilars are near-identical copies of biologic drugs such as trastuzumab (Herceptin), bevacizumab (Avastin) and rituximab (Rituxan). They cost 15 to 35% less and work the same way. Most insurers now require a biosimilar before they will pay for the original brand, and in Medicare your coinsurance on a biosimilar is usually lower.",
    detail: "FDA has approved biosimilars for trastuzumab, bevacizumab, rituximab, filgrastim, pegfilgrastim, epoetin and denosumab; oncology biosimilars reached 80%+ share for bevacizumab and trastuzumab within four years of launch, faster than in other therapy areas, because they are buy-and-bill Part B products where practices earn a margin. Medicare pays biosimilars at their own average sales price plus 8% of the reference product's ASP (a permanent incentive under the IRA), and the IRA bases beneficiary coinsurance for biosimilars on the reference price. Commercial plans and Medicare Advantage use step therapy (preferred biosimilar first) and formulary exclusions; step therapy on Part B drugs has been permitted in Medicare Advantage since 2019, applies only to new starts and must have an exception process within 72 hours (24 hours if expedited). Interchangeability designations allow pharmacy-level substitution for pharmacy-benefit biologics but matter little for infused oncology drugs.",
    links: [
      { label: "FDA: Biosimilars", url: SRC.biosimilars.url },
      { label: "FDA: Biosimilar product information (Purple Book)", url: "https://purplebooksearch.fda.gov/" },
      { label: "Medicare.gov: Prescription drugs (outpatient)", url: SRC.outpatientDrugs.url },
    ],
  },
  {
    id: "help",
    title: "Where to get help",
    plain: "You do not have to work this out alone. Free, expert help exists for choosing a plan, appealing a denial, finding co-pay funds and dealing with work and disability questions.",
    detail: "State Health Insurance Assistance Programs (SHIPs) give free, unbiased Medicare counselling in every state. Triage Cancer runs a legal and financial navigation helpline and publishes state-by-state guides on insurance, disability, employment and appeals. CancerCare provides oncology social workers, limited financial grants and the co-payment foundation. The PAN Foundation and HealthWell Foundation pay cost sharing for specific diagnoses. Patient Advocate Foundation offers case management for insurance disputes. The Leukemia & Lymphoma Society runs co-pay and travel assistance for blood cancers. The American Cancer Society's helpline (1-800-227-2345) and Hope Lodge programme cover lodging near treatment. For denials: request the plan's clinical criteria in writing, ask the oncology practice to file a peer-to-peer review, use the internal appeal, then the external (independent) review that ACA plans and Medicare must offer.",
    links: [
      { label: "Triage Cancer", url: "https://triagecancer.org/" },
      { label: "CancerCare: Financial assistance", url: "https://www.cancercare.org/financial" },
      { label: "PAN Foundation", url: "https://www.panfoundation.org/" },
      { label: "HealthWell Foundation", url: "https://www.healthwellfoundation.org/" },
      { label: "Patient Advocate Foundation", url: "https://www.patientadvocate.org/" },
      { label: "State Health Insurance Assistance Programs (SHIP)", url: "https://www.shiphelp.org/" },
      { label: "American Cancer Society: Financial and insurance matters", url: "https://www.cancer.org/cancer/financial-insurance-matters.html" },
    ],
  },
];
