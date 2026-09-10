/**
 * Setting shares for the addressable population estimator (/market/).
 *
 * Two editorial ranges per cancer, each a deliberately wide [low, high] fraction with a source:
 *
 *  - `subtypeShare`: the fraction of the GLOBOCAN site total that this OnCo cancer represents, needed
 *    because GLOBOCAN reports by organ site (all breast cancer, all lung cancer, all leukaemia). Omitted
 *    when the OnCo cancer is the whole site.
 *  - `settings`: the fraction of newly diagnosed patients who reach a treatment setting in their disease
 *    course. "Advanced or metastatic" combines patients with distant disease at diagnosis (SEER stage
 *    distribution) with those who relapse after treatment for earlier-stage disease; the range brackets
 *    both. Haematological cancers have no stage and are treated systemically at diagnosis, so the
 *    "systemic therapy at diagnosis" setting is near 1.
 *
 * These are ranges, not point estimates, and they are US-derived (SEER) where a stage distribution is
 * cited; stage at diagnosis is later in most of the world, so the true share is higher outside high-income
 * countries. Anything more precise needs a registry study for the specific cancer and country.
 */
export type Setting = { id: string; label: string; share: [number, number]; source: { label: string; url: string }; note?: string };
export type SettingShares = { cancerId: string; subtypeShare?: { share: [number, number]; source: { label: string; url: string }; note?: string }; settings: Setting[] };

const seer = (slug: string, site: string) => ({ label: `SEER Cancer Stat Facts: ${site} (stage at diagnosis)`, url: `https://seer.cancer.gov/statfacts/html/${slug}.html` });
const acs = { label: "American Cancer Society, Cancer Facts & Figures", url: "https://www.cancer.org/research/cancer-facts-statistics.html" };
const map = { label: "OnCo GLOBOCAN site mapping notes (src/data/globocan-map.ts)", url: "https://github.com/judegomila/OnCo/blob/main/src/data/globocan-map.ts" };

const adv = (share: [number, number], source: Setting["source"], note?: string): Setting => ({ id: "advanced", label: "Advanced or metastatic (de novo plus relapsed)", share, source, note });
const systemic = (source: Setting["source"], note?: string): Setting => ({ id: "systemic", label: "Systemic therapy at diagnosis", share: [0.85, 1.0], source, note });
const relapsed = (share: [number, number], source: Setting["source"], note?: string): Setting => ({ id: "relapsed", label: "Relapsed or refractory after first-line therapy", share, source, note });

export const settingShares: SettingShares[] = [
  { cancerId: "tnbc", subtypeShare: { share: [0.10, 0.15], source: acs, note: "Triple-negative share of all breast cancer" }, settings: [adv([0.25, 0.40], seer("breast", "Female breast"), "About 6% of breast cancer is metastatic at diagnosis; TNBC relapses more often and earlier than other subtypes.")] },
  { cancerId: "breast-hr-positive", subtypeShare: { share: [0.65, 0.75], source: acs, note: "HR-positive HER2-negative share of all breast cancer" }, settings: [adv([0.15, 0.30], seer("breast", "Female breast"), "About 6% metastatic at diagnosis plus late relapses over 20 years.")] },
  { cancerId: "breast-her2-positive", subtypeShare: { share: [0.15, 0.20], source: acs, note: "HER2-positive share of all breast cancer" }, settings: [adv([0.20, 0.35], seer("breast", "Female breast"))] },
  { cancerId: "nsclc", subtypeShare: { share: [0.80, 0.85], source: acs, note: "NSCLC share of lung cancer" }, settings: [adv([0.60, 0.75], seer("lungb", "Lung and bronchus"), "Roughly half of lung cancer is distant at diagnosis; most regional disease also recurs.")] },
  { cancerId: "sclc", subtypeShare: { share: [0.13, 0.15], source: acs, note: "SCLC share of lung cancer" }, settings: [adv([0.80, 0.95], seer("lungb", "Lung and bronchus"), "About two thirds present with extensive stage; most limited-stage disease relapses.")] },
  { cancerId: "colorectal", settings: [adv([0.35, 0.50], seer("colorect", "Colorectal"), "About a fifth distant at diagnosis, plus recurrence after stage II and III surgery.")] },
  { cancerId: "pancreatic", settings: [adv([0.80, 0.95], seer("pancreas", "Pancreas"), "Half distant at diagnosis; most resected patients relapse.")] },
  { cancerId: "gastric", settings: [adv([0.55, 0.75], seer("stomach", "Stomach"))] },
  { cancerId: "esophageal", settings: [adv([0.60, 0.80], seer("esoph", "Oesophagus"))] },
  { cancerId: "hcc", subtypeShare: { share: [0.75, 0.85], source: map, note: "HCC share of the liver and intrahepatic bile duct site (C22)" }, settings: [adv([0.50, 0.70], seer("livibd", "Liver and intrahepatic bile duct"))] },
  { cancerId: "prostate", settings: [adv([0.15, 0.30], seer("prost", "Prostate"), "Under a tenth distant at diagnosis; a minority of localised disease progresses to metastatic castration-resistant cancer.")] },
  { cancerId: "urothelial", settings: [adv([0.15, 0.30], seer("urinb", "Urinary bladder"), "Most bladder cancer is non-muscle-invasive; only a minority reaches the metastatic setting.")] },
  { cancerId: "rcc", settings: [adv([0.25, 0.40], seer("kidrp", "Kidney and renal pelvis"))] },
  { cancerId: "ovarian", settings: [adv([0.70, 0.85], seer("ovary", "Ovary"), "Over half distant at diagnosis; most advanced disease relapses after platinum.")] },
  { cancerId: "endometrial", settings: [adv([0.15, 0.30], seer("corp", "Uterine corpus"))] },
  { cancerId: "cervical", settings: [adv([0.25, 0.45], seer("cervix", "Cervix uteri"))] },
  { cancerId: "melanoma", settings: [adv([0.10, 0.20], seer("melan", "Melanoma of the skin"), "Most melanoma is localised at diagnosis and cured surgically.")] },
  { cancerId: "glioblastoma", subtypeShare: { share: [0.40, 0.55], source: map, note: "Glioblastoma share of malignant brain and CNS tumours" }, settings: [systemic(seer("brain", "Brain and other nervous system"), "Essentially all patients receive chemoradiation after surgery."), relapsed([0.80, 0.95], seer("brain", "Brain and other nervous system"), "Nearly all glioblastoma recurs.")] },
  { cancerId: "head-and-neck", settings: [adv([0.30, 0.50], seer("oralcav", "Oral cavity and pharynx"), "Most present with regional disease; a large minority recur or metastasise.")] },
  { cancerId: "thyroid", settings: [adv([0.03, 0.10], seer("thyro", "Thyroid"), "Only radioiodine-refractory advanced disease needs systemic therapy.")] },
  { cancerId: "mesothelioma", settings: [adv([0.80, 0.95], acs, "Almost all mesothelioma is treated as advanced disease.")] },
  { cancerId: "aml", subtypeShare: { share: [0.20, 0.30], source: map, note: "AML share of all leukaemia" }, settings: [systemic(seer("amyl", "Acute myeloid leukaemia")), relapsed([0.50, 0.70], seer("amyl", "Acute myeloid leukaemia"))] },
  { cancerId: "all-leukemia", subtypeShare: { share: [0.10, 0.20], source: map, note: "ALL share of all leukaemia" }, settings: [systemic(seer("alyl", "Acute lymphocytic leukaemia")), relapsed([0.15, 0.50], seer("alyl", "Acute lymphocytic leukaemia"), "Relapse is uncommon in children and common in adults.")] },
  { cancerId: "cll", subtypeShare: { share: [0.20, 0.35], source: map, note: "CLL share of all leukaemia in Western countries; far lower in East Asia" }, settings: [{ id: "treated", label: "Ever requires treatment", share: [0.50, 0.70], source: seer("clyl", "Chronic lymphocytic leukaemia"), note: "A large minority of CLL is watched and never treated." }] },
  { cancerId: "dlbcl", subtypeShare: { share: [0.30, 0.40], source: map, note: "DLBCL share of non-Hodgkin lymphoma" }, settings: [systemic(seer("dlbcl", "Diffuse large B-cell lymphoma")), relapsed([0.30, 0.40], seer("dlbcl", "Diffuse large B-cell lymphoma"), "Roughly a third relapse or are refractory after R-CHOP.")] },
  { cancerId: "hodgkin-lymphoma", settings: [systemic(seer("hodg", "Hodgkin lymphoma")), relapsed([0.10, 0.25], seer("hodg", "Hodgkin lymphoma"))] },
  { cancerId: "multiple-myeloma", settings: [systemic(seer("mulmy", "Myeloma"), "Smouldering myeloma is watched; symptomatic myeloma is treated."), relapsed([0.80, 0.95], seer("mulmy", "Myeloma"), "Myeloma is not cured; nearly all patients relapse.")] },
];

export const settingSharesFor = (cancerId: string) => settingShares.find((s) => s.cancerId === cancerId);
