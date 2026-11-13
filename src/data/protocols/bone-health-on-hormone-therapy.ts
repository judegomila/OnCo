import { protocol } from "./helpers";

/*
 * Bone health during hormone therapy for breast and prostate cancer: fracture risk assessment, bone density scans,
 * lifestyle, and bone-protective drugs on aromatase inhibitors, ovarian suppression and androgen deprivation therapy.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - NICE NG101, Early and locally advanced breast cancer (published July 2018, last updated April 2025),
 *   recommendations page (HTML, full text): bone health 1.14.26 to 1.14.28, adjuvant bisphosphonates 1.12 and 1.11.13.
 * - NICE NG131, Prostate cancer: diagnosis and management (published May 2019, last updated December 2021),
 *   recommendations page (HTML, full text): osteoporosis 1.4.12 to 1.4.15.
 * - ASCO guideline on the management of osteoporosis in survivors of adult cancers with non-metastatic disease
 *   (Shapiro et al., J Clin Oncol 2019) and ASCO's endorsement of the Cancer Care Ontario guideline on bone health in
 *   prostate cancer (2020): abstracts only, from Europe PMC; ascopubs.org refused a script.
 * - ESMO Bone health in cancer (Coleman et al., Ann Oncol 2020): Europe PMC holds no abstract and the publisher refused
 *   a script. Not read.
 * - The 2008 UK expert group position statement on cancer treatment-induced bone loss, whose algorithms NG101 points
 *   to, was not located and not read.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const boneHealthOnHormoneTherapy = protocol({
  id: "bone-health-on-hormone-therapy",
  name: "Bone health on aromatase inhibitors, ovarian suppression and androgen deprivation therapy",
  aka: ["bone density scan on aromatase inhibitor", "DEXA on hormone therapy", "cancer treatment-induced bone loss", "osteoporosis on androgen deprivation therapy", "bone protection on letrozole or anastrozole"],
  domain: "survivorship",
  tldr: "Some hormone treatments for breast and prostate cancer thin the bones and raise the chance of a fracture. When you start an aromatase inhibitor or treatment that stops the ovaries working, a bone density scan is offered; on prostate hormone therapy your fracture risk may be checked. Exercise, a good diet and not smoking help, and bone-strengthening medicine is offered if the bones are thin.",
  simple: "Some hormone treatments make bones weaker. Your team may check your bones with a scan. Exercise and good food help. Some people need medicine to protect their bones.",
  summary: "Aromatase inhibitors, treatment-induced menopause, ovarian suppression and androgen deprivation therapy (ADT) accelerate bone loss. NICE NG101 offers a baseline DEXA scan to women with invasive breast cancer not receiving adjuvant bisphosphonates who start an aromatase inhibitor, have treatment-induced menopause or start ovarian suppression, and not to those on tamoxifen alone; bisphosphonates are offered to those identified by the 2008 UK expert group algorithms. Men with breast cancer starting testicular suppression with an aromatase inhibitor also have bone density assessed (NG101, 2025). Separately, adjuvant bisphosphonates for postmenopausal women with node-positive disease are offered to reduce recurrence, and also protect bone.\n\nFor prostate cancer on ADT, NICE NG131 advises against routine bisphosphonates to prevent osteoporosis, suggests considering fracture risk assessment in line with NICE's osteoporosis guidance, offers bisphosphonates to those with osteoporosis and suggests denosumab if bisphosphonates are not suitable. ASCO (2019) asks clinicians to assess fracture risk with established tools, to measure bone density where the risk is substantial, to advise nutrition, exercise and lifestyle for everyone, and, where a drug is needed, to use bisphosphonates or denosumab at osteoporosis doses. Before starting a bone-modifying drug, see the protocol on dental assessment and jaw osteonecrosis.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults with non-metastatic breast cancer starting an aromatase inhibitor, ovarian suppression or with treatment-induced menopause, and adults with prostate cancer on androgen deprivation therapy. Bone-modifying drugs for bone metastases, given at higher doses to prevent skeletal events, are a different use and not covered here.",
  trigger: "Starting an aromatase inhibitor, ovarian suppression or androgen deprivation therapy, or treatment causing early menopause.",
  steps: [
    {
      action: "When hormone therapy starts, assess fracture risk with an established tool",
      why: "Treatment adds to the person's own risk from age, previous fractures, steroids, smoking and family history; a tool puts these together.",
      source: "asco-2019",
      quote: "Clinicians are advised to assess fracture risk using established tools.",
    },
    {
      action: "Offer a baseline DEXA bone density scan to women with breast cancer starting an aromatase inhibitor or ovarian suppression, or with treatment-induced menopause, unless they are having adjuvant bisphosphonates",
      why: "These treatments lower oestrogen, which speeds bone loss; a baseline scan shows who needs protection.",
      source: "nice-ng101",
      quote: "Offer a baseline dual-energy X-ray absorptiometry (DEXA) scan to assess bone mineral density in women with invasive breast cancer who are not receiving bisphosphonates as adjuvant therapy and who:",
    },
    {
      action: "Do not offer a DEXA scan to people on tamoxifen alone",
      why: "NICE found no need for a routine scan in people taking tamoxifen on its own.",
      source: "nice-ng101",
      quote: "Do not offer a DEXA scan to people with invasive breast cancer who are receiving tamoxifen alone.",
    },
    {
      action: "Assess bone density in men with breast cancer starting testicular function suppression with an aromatase inhibitor",
      why: "The combination lowers sex hormones and puts bone at risk in the same way.",
      source: "nice-ng101",
      quote: "On starting testicular function suppression in combination with an aromatase inhibitor, assess bone mineral density in people with ER-positive invasive breast cancer who have male reproductive organs",
    },
    {
      action: "For men on androgen deprivation therapy, consider a fracture risk assessment in line with NICE's osteoporosis guidance",
      why: "ADT lowers testosterone, which speeds bone loss over years of treatment.",
      source: "nice-ng131",
      quote: "Consider assessing fracture risk in people with prostate cancer who are having androgen deprivation therapy, in line with the NICE guideline on osteoporosis: risk assessment .",
    },
    {
      action: "Advise everyone on diet, exercise and lifestyle for bone health",
      why: "These help bone in everyone and cost little.",
      source: "asco-2019",
      quote: "The bone health of all patients may benefit from optimizing nutrition, exercise, and lifestyle.",
    },
    {
      action: "Do not give bisphosphonates routinely to every man on ADT; offer them to those with osteoporosis",
      why: "Treatment is aimed at people whose bones are already thin, where it prevents fractures.",
      source: "nice-ng131",
      quote: "Offer bisphosphonates to people who are having androgen deprivation therapy and have osteoporosis.",
    },
    {
      action: "If bisphosphonates are not suitable or not tolerated in men on ADT with osteoporosis, consider denosumab",
      why: "Denosumab is an injection that strengthens bone by another route.",
      source: "nice-ng131",
      quote: "Consider denosumab for people who are having androgen deprivation therapy and have osteoporosis if bisphosphonates are contraindicated or not tolerated.",
    },
    {
      action: "Where a drug is needed, use a bisphosphonate or denosumab at the osteoporosis dose",
      why: "These are the drugs with evidence for preventing fractures; the doses used for bone metastases are higher and carry more risk.",
      source: "asco-2019",
      quote: "When a pharmacologic agent is indicated, bisphosphonates or denosumab at osteoporosis-indicated dosages are the preferred interventions.",
    },
    {
      action: "Before a bisphosphonate or denosumab, discuss the risk of jaw osteonecrosis and arrange a dental check",
      why: "These drugs rarely cause bone in the jaw to break down; a dental check before starting is part of preventing it.",
      source: "nice-ng101",
      quote: "Discuss the benefits and risks of bisphosphonate treatment with women, particularly the risk of osteonecrosis of the jaw, atypical femoral fractures and osteonecrosis of the external auditory canal.",
    },
  ],
  bestInClass: {
    statement: "NICE (NG101 for breast, last updated 2025; NG131 for prostate) and ASCO (2019) agree on assessing risk when bone-thinning hormone therapy starts, on lifestyle measures for all, and on bisphosphonates or denosumab when the bones are thin. They differ in how the risk is measured: NICE offers a baseline DEXA scan to every woman starting an aromatase inhibitor or ovarian suppression who is not already on adjuvant bisphosphonates, whereas ASCO starts with a fracture risk tool and measures bone density only where the risk is substantial; for men on ADT, NICE suggests a fracture risk assessment rather than a routine scan and advises against routine bisphosphonates. The ESMO 2020 bone health guideline could not be read.",
    sources: ["nice-ng101", "nice-ng131", "asco-2019", "esmo-2020"],
  },
  variants: [
    {
      name: "Risk tool first, bone density only at substantial risk (ASCO 2019)",
      differs: "Uses an established fracture risk tool for everyone and orders a bone density test only for those at substantial risk, rather than a baseline scan for all women starting an aromatase inhibitor.",
      evidence: "ASCO built its recommendations on the US Preventive Services Task Force review in the general population plus 61 studies in people with cancer; read as an abstract, so grades are not given.",
      sources: ["asco-2019"],
    },
    {
      name: "Adjuvant bisphosphonates for postmenopausal women with node-positive breast cancer (NICE NG101)",
      differs: "Offers zoledronic acid or sodium clodronate after surgery to reduce recurrence in postmenopausal women with node-positive disease, and considers them in node-negative disease at high risk; women on these do not need the baseline DEXA scan.",
      evidence: "NICE recommendation [2018]; the use was off-label in March 2025, as NICE notes.",
      sources: ["nice-ng101"],
    },
    {
      name: "Cancer Care Ontario guideline endorsed by ASCO for prostate cancer (2020)",
      differs: "A prostate-specific bone health guideline covering fracture risk on ADT through to bone metastases, endorsed in full by ASCO.",
      evidence: "Read as an abstract; its individual recommendations are not given here.",
      sources: ["asco-cco-prostate-2020"],
    },
  ],
  grades: [
    { claim: "Baseline DEXA for women starting an aromatase inhibitor, ovarian suppression or with treatment-induced menopause, not on adjuvant bisphosphonates", grade: "not graded (NICE); dated [2009, amended 2018]", source: "nice-ng101" },
    { claim: "No routine bisphosphonates to prevent osteoporosis on ADT", grade: "not graded (NICE); dated [2008]", source: "nice-ng131", quote: "Do not routinely offer bisphosphonates to prevent osteoporosis in people with prostate cancer having androgen deprivation therapy." },
    { claim: "Bisphosphonates for people on ADT with osteoporosis", grade: "not graded (NICE); dated [2014]", source: "nice-ng131" },
  ],
  sources: [
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider', 'do not') and each is dated. Published July 2018, last updated April 2025.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ng131", label: "Prostate cancer: diagnosis and management (NG131), recommendations", publisher: "NICE", year: 2019, url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; each is dated, for example [2014]. Published May 2019, last updated December 2021.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2019", label: "Management of Osteoporosis in Survivors of Adult Cancers With Nonmetastatic Disease: ASCO Clinical Practice Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2019, url: "https://europepmc.org/abstract/MED/31532726", doi: "10.1200/JCO.19.01696", read: "abstract", accessed: "2026-11-11" },
    { key: "asco-cco-prostate-2020", label: "Bone Health and Bone-Targeted Therapies for Prostate Cancer: ASCO Endorsement of a Cancer Care Ontario Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/31990618", doi: "10.1200/JCO.19.03148", read: "abstract", accessed: "2026-11-11" },
    { key: "esmo-2020", label: "Bone health in cancer: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.07.019", doi: "10.1016/j.annonc.2020.07.019", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The ESMO 2020 bone health guideline could not be read: Europe PMC holds no abstract and the publisher refused a script. Its thresholds for starting bone protection are not given here.",
    "NG101 refers to the algorithms of a 2008 UK expert group position statement for deciding who gets bisphosphonates; that statement was not read, so its T-score thresholds are not given here.",
    "ASCO 2019 was read only as an abstract; which tool, which bone density threshold and how often to repeat the scan are not given here.",
    "No source read sets how often to repeat a DEXA scan during an aromatase inhibitor or ADT.",
    "No source read gives calcium or vitamin D doses or an exercise prescription; the step on lifestyle rests on ASCO's general statement.",
  ],
  institutions: ["nice", "asco"],
  technologies: ["bone-modifying-agents", "androgen-deprivation"],
  drugs: ["zoledronic-acid", "denosumab"],
  terms: ["treatment-induced-bone-loss", "aromatase-inhibitor", "adt"],
  cancers: ["breast-cancer", "prostate"],
  related: ["letrozole", "anastrozole", "exemestane", "goserelin"],
  sections: ["supportive-care"],
  tags: ["protocol", "bone-health", "survivorship"],
});
