import { protocol } from "./helpers";

/*
 * Bone health during hormone therapy for breast and prostate cancer: fracture risk assessment, bone density scans,
 * lifestyle, and bone-protective drugs on aromatase inhibitors, ovarian suppression and androgen deprivation therapy.
 *
 * First written on 11 November 2026 from NICE NG101, NICE NG131 and two ASCO abstracts.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched raw (curl, pdftotext, the Europe PMC REST API,
 * the DailyMed web service) into a scratch directory and read as text; every quote below was checked verbatim by
 * script against that text.
 * - NICE NG101 (published 18 July 2018, last updated 14 April 2025), recommendations page, full text: bone health
 *   1.14.26 to 1.14.28, adjuvant bisphosphonates 1.12.1 to 1.12.3, men with breast cancer 1.11.13. The copy read was
 *   saved from nice.org.uk on 17 November 2026 by the checker of the dental assessment protocol and re-used.
 * - NICE NG131 (published 9 May 2019, last updated 15 December 2021), recommendations page, full text: 1.4.12 to
 *   1.4.15. Its link to "the NICE guideline on osteoporosis: risk assessment" now points to NG259.
 * - NICE NG259, Osteoporosis: risk assessment (published 29 July 2026, replaces CG146 of 2012): the chapters on
 *   fragility fracture risk assessment, deciding whether pharmacological treatment is appropriate, follow-up for
 *   people not having treatment, and update information, full text. New to this page.
 * - The 2008 UK expert group position statement on breast cancer treatment-induced bone loss (Reid et al.), which
 *   the first pass could not locate: NG101 links to the full PDF, which read with pdftotext. New to this page. Its
 *   two algorithm figures do not come out of the PDF as readable text; the thresholds here are from its prose.
 * - The UK expert group statement on prostate cancer treatment-induced bone loss (Brown et al., J Bone Oncol 2020),
 *   the 2024 UK osteoporosis guideline of the National Osteoporosis Guideline Group (Arch Osteoporos 2025) and the
 *   2025 updated joint position statement on aromatase inhibitor-associated bone loss (Hadji et al., J Bone Oncol
 *   2025): open-access full text from Europe PMC. New to this page. Figures in them are images and were not read.
 * - Prolia (denosumab 60 mg) US prescribing information, DailyMed version 186, label dated 26 June 2026: full text.
 * - EBCTCG meta-analysis of adjuvant bisphosphonates (Lancet 2015): abstract only, from Europe PMC.
 * - ASCO osteoporosis guideline (Shapiro et al., J Clin Oncol 2019) and ASCO's endorsement of the Cancer Care Ontario
 *   prostate bone health guideline (2020): abstracts only, from Europe PMC. ascopubs.org answered a sibling checker
 *   with a bot check on 17 November 2026 and was not tried again.
 * - ESMO Bone health in cancer (Coleman et al., Ann Oncol 2020): Europe PMC holds no abstract and no full text, and
 *   annalsofoncology.org answered a sibling checker with a bot check on 17 November 2026. Not read.
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text
 * with nothing changed.
 */
export const boneHealthOnHormoneTherapy = protocol({
  id: "bone-health-on-hormone-therapy",
  name: "Bone health on aromatase inhibitors, ovarian suppression and androgen deprivation therapy",
  aka: ["bone density scan on aromatase inhibitor", "DEXA on hormone therapy", "cancer treatment-induced bone loss", "osteoporosis on androgen deprivation therapy", "bone protection on letrozole or anastrozole"],
  domain: "survivorship",
  tldr: "Some hormone treatments for breast and prostate cancer thin the bones and raise the chance of a fracture. Your team checks your fracture risk, often with a bone density scan, when treatment starts. Exercise, enough calcium and vitamin D and not smoking help, and bone medicine is offered if the bones are thin. If you have denosumab injections, do not stop them without a plan from your team.",
  simple: "Some hormone treatments make bones weaker. Your team may check your bones with a scan. Exercise and good food help. Some people need medicine to protect their bones.",
  summary: "Aromatase inhibitors, treatment-induced menopause, ovarian suppression and androgen deprivation therapy (ADT) are associated with accelerated bone loss. NICE NG101 offers a baseline DEXA scan to women with invasive breast cancer not receiving adjuvant bisphosphonates who start an aromatase inhibitor, have treatment-induced menopause or start ovarian suppression, and not to people on tamoxifen alone; bisphosphonates are offered to those identified by the 2008 UK expert group algorithms, which treat at a T-score below -2 (below -1 for ovarian suppression with an aromatase inhibitor) and give calcium and vitamin D with a repeat scan at 24 months for a T-score between -1 and -2. NICE's osteoporosis guideline NG259 (July 2026) suggests considering drug treatment at a T-score of -1.5 or less in people aged 50 and over, and women after menopause, who take an aromatase inhibitor or ADT. The 2025 international joint position statement starts denosumab or a bisphosphonate at a T-score below -2.0 or with any two risk factors. Separately, adjuvant bisphosphonates are offered to postmenopausal women with node-positive disease to reduce recurrence.\n\nFor prostate cancer on ADT, NICE NG131 advises against routine bisphosphonates to prevent osteoporosis, suggests considering fracture risk assessment in line with NICE's osteoporosis guidance, offers bisphosphonates to those with osteoporosis and suggests denosumab if bisphosphonates are not suitable. The UK National Osteoporosis Guideline Group (NOGG, 2024) goes further: all men starting ADT should have a FRAX assessment, with bone density where available. For bone loss, denosumab is 60 mg under the skin every 6 months, not the higher dose used for bone metastases, and after it stops fracture risk rises, so another bone drug should follow. Before starting a bone-modifying drug, see the protocol on dental assessment and jaw osteonecrosis.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults with non-metastatic breast cancer starting an aromatase inhibitor, ovarian suppression or with treatment-induced menopause, and adults with prostate cancer on androgen deprivation therapy. Bone-modifying drugs for bone metastases, given at higher doses, are a different use and not covered here.",
  trigger: "Starting an aromatase inhibitor, ovarian suppression or androgen deprivation therapy, or treatment causing early menopause.",
  steps: [
    {
      action: "When hormone therapy starts, assess fracture risk with an established tool",
      why: "People may be at risk of fracture from their own baseline risks or from the added risk of their cancer treatment. NICE (NG259) names FRAX and QFracture as the tools and asks for a full clinical assessment alongside, because neither tool includes every risk factor; its committee gives aromatase inhibitors and ADT as examples.",
      source: "asco-2019",
      quote: "Clinicians are advised to assess fracture risk using established tools.",
    },
    {
      action: "Offer a baseline DEXA bone density scan to women with breast cancer starting an aromatase inhibitor or ovarian suppression, or with treatment-induced menopause, unless they are having adjuvant bisphosphonates",
      why: "NICE links aromatase inhibitors with bone density loss; a baseline scan shows who needs protection. The UK expert group asks for the scan within 3 months of starting, and says it need not come before treatment starts.",
      source: "nice-ng101",
      quote: "Offer a baseline dual-energy X-ray absorptiometry (DEXA) scan to assess bone mineral density in women with invasive breast cancer who are not receiving bisphosphonates as adjuvant therapy and who:",
    },
    {
      action: "Do not offer a DEXA scan to people on tamoxifen alone",
      why: "NICE advises against a scan for people taking tamoxifen on its own. It notes elsewhere that tamoxifen may be linked to bone density loss in premenopausal women.",
      source: "nice-ng101",
      quote: "Do not offer a DEXA scan to people with invasive breast cancer who are receiving tamoxifen alone.",
    },
    {
      action: "Assess bone density in men with breast cancer starting testicular function suppression with an aromatase inhibitor",
      why: "NICE's committee asked for this because aromatase inhibitors are associated with bone density loss, and so that men are assessed as women are.",
      source: "nice-ng101",
      quote: "On starting testicular function suppression in combination with an aromatase inhibitor, assess bone mineral density in people with ER-positive invasive breast cancer who have male reproductive organs",
    },
    {
      action: "Offer a bisphosphonate to women with breast cancer whom the UK expert group algorithms identify",
      why: "NICE does not set its own bone density threshold for these women; it points to the 2008 UK expert group statement, which it notes is not NICE-accredited.",
      source: "nice-ng101",
      quote: "Offer bisphosphonates to women identified by algorithms 1 and 2 in the guidance for the management of breast cancer treatment-induced bone loss: a consensus position statement from a UK expert group (2008; this guidance is not NICE-accredited).",
    },
    {
      action: "Under those algorithms, treat at a T-score below -2 at the spine or hip, or below -1 for ovarian suppression with an aromatase inhibitor",
      why: "The group chose a more cautious level than the usual osteoporosis threshold of -2.5 because bone is lost quickly on these treatments. It also treats, whatever the scan shows, women over 75 on an aromatase inhibitor with one or more major risk factors, and women with premature menopause who have had a vertebral fragility fracture or a low trauma hip fracture.",
      source: "uk-expert-2008",
      quote: "In postmenopausal women we recommend intervention when the T-score falls below –2 or if the rate of bone loss in women with pre-existing osteopaenia exceeds 4% per year.",
    },
    {
      action: "For a T-score between -1 and -2, give lifestyle advice with calcium and vitamin D, and repeat the scan at 24 months",
      why: "The UK expert group gives calcium 1 g a day and vitamin D 400 to 800 IU unless diet and blood vitamin D are already adequate, and starts a bisphosphonate if the T-score falls below -2 or bone density falls by more than 4% a year. With a T-score above -1 it asks for lifestyle advice only and no repeat scan, except on ovarian suppression with an aromatase inhibitor, where monitoring continues.",
      source: "uk-expert-2008",
      quote: "lifestyle advice plus calcium (1 g/day) and vitamin D (400–800 IU) supplementation are recommended",
    },
    {
      action: "In people aged 50 and over, and women after menopause, consider drug treatment at a T-score of -1.5 or less when they take an aromatase inhibitor or ADT",
      why: "NICE's 2026 osteoporosis guideline lists a T-score of -2.5 or less, or -1.5 or less together with a medicine known to speed bone loss, among its criteria for considering treatment. The decision is shared with the person and also weighs the fracture risk score, previous fractures and other risk factors.",
      source: "nice-ng259",
      quote: "taking medicines or having other factors known to be associated with accelerated bone loss (for example, aromatase inhibitors or androgen deprivation therapy, or having primary hyperparathyroidism not treated with surgery).",
    },
    {
      action: "For men on androgen deprivation therapy, consider a fracture risk assessment in line with NICE's osteoporosis guidance",
      why: "NICE's osteoporosis guideline (NG259) lists treatment with ADT among the factors associated with a higher risk of fragility fracture.",
      source: "nice-ng131",
      quote: "Consider assessing fracture risk in people with prostate cancer who are having androgen deprivation therapy, in line with the NICE guideline on osteoporosis: risk assessment.",
    },
    {
      action: "Under the UK osteoporosis guideline group, assess every man starting ADT with FRAX, with bone density where available",
      why: "NOGG makes this a strong recommendation, where NICE says to consider it. NOGG and the UK prostate expert group repeat FRAX with bone density after 12 to 18 months in men whose risk is near to but below the treatment threshold.",
      source: "nogg-2024",
      quote: "All men starting androgen deprivation therapy (ADT) should have their fracture risk assessed using FRAX, considering ADT use as a secondary cause of osteoporosis, with BMD measured where available",
      grade: "Strong recommendation",
    },
    {
      action: "Make sure everyone has advice on exercise and enough calcium and vitamin D, whatever their fracture risk",
      why: "ASCO says the bone health of all patients may benefit from attention to nutrition, exercise and lifestyle. The UK expert group's lifestyle advice is diet, weight-bearing exercise, less alcohol and stopping smoking.",
      source: "joint-2025",
      quote: "Regardless of fracture risk, preventative measures such as exercise and optimal calcium and vitamin D intake need to be ensured.",
    },
    {
      action: "Do not routinely offer bisphosphonates to prevent osteoporosis in men on ADT; offer them to those who have osteoporosis",
      why: "NICE's prostate guideline keeps bisphosphonates for men on ADT who have osteoporosis.",
      source: "nice-ng131",
      quote: "Offer bisphosphonates to people who are having androgen deprivation therapy and have osteoporosis.",
    },
    {
      action: "If bisphosphonates are contraindicated or not tolerated in men on ADT with osteoporosis, consider denosumab",
      why: "Denosumab is a different bone-strengthening medicine, given as an injection under the skin.",
      source: "nice-ng131",
      quote: "Consider denosumab for people who are having androgen deprivation therapy and have osteoporosis if bisphosphonates are contraindicated or not tolerated.",
    },
    {
      action: "Where a drug is needed, use a bisphosphonate or denosumab at the osteoporosis dose",
      why: "The doses used for bone metastases are higher. The UK prostate expert group gives them as zoledronic acid 4 mg or denosumab 120 mg every 4 weeks and reports more jaw osteonecrosis at those doses.",
      source: "asco-2019",
      quote: "When a pharmacologic agent is indicated, bisphosphonates or denosumab at osteoporosis-indicated dosages are the preferred interventions.",
    },
    {
      action: "Choose the bisphosphonate by local protocol: alendronate 70 mg or risedronate 35 mg by mouth weekly, ibandronate 150 mg by mouth monthly or 3 mg into a vein every 3 months, or zoledronic acid 4 mg into a vein every 6 months",
      why: "These are the doses the UK breast expert group lists; it adds that zoledronic acid 5 mg once a year, the osteoporosis dose, may be used instead. The UK prostate expert group says most men receive the same weekly tablets, although the doses licensed for men are alendronate 10 mg or risedronate 5 mg daily, and gives zoledronic acid as 5 mg once yearly. The breast group says bisphosphonates are contraindicated with a glomerular filtration rate below 30 ml/min/1.73 m² or low blood calcium.",
      source: "uk-expert-2008",
      quote: "Weekly oral alendronate 70 mg or risedronate 35 mg, monthly oral ibandronate 150 mg, 3-monthly intravenous ibandronate 3 mg, or 6-monthly intravenous zoledronic acid 4 mg are all considered appropriate.",
    },
    {
      action: "Give denosumab for bone loss as 60 mg under the skin once every 6 months, with calcium and vitamin D",
      why: "This is the licensed dose for bone loss on an aromatase inhibitor or ADT (US label). The label asks for calcium 1000 mg and at least 400 IU of vitamin D daily, and for low blood calcium to be corrected before the first dose.",
      source: "prolia-label",
      quote: "The recommended dose of Prolia is 60 mg administered as a single subcutaneous injection once every 6 months.",
    },
    {
      action: "Do not stop denosumab without moving to another bone-protecting drug",
      why: "After denosumab stops, fracture risk rises, including the risk of several spinal fractures at once. The 2025 joint position statement starts another drug, preferably zoledronate or a bisphosphonate tablet for at least a year, within 6 months of the last injection; the UK prostate expert group says denosumab should not be stopped without review by a specialist bone service.",
      source: "prolia-label",
      quote: "If Prolia treatment is discontinued, patients should be transitioned to an alternative antiresorptive therapy",
    },
    {
      action: "Before a bisphosphonate, discuss its benefits and risks, including osteonecrosis of the jaw",
      why: "NICE writes this for women offered adjuvant bisphosphonates and names three risks: osteonecrosis of the jaw, atypical thigh bone fractures and osteonecrosis of the ear canal.",
      source: "nice-ng101",
      quote: "Discuss the benefits and risks of bisphosphonate treatment with women, particularly the risk of osteonecrosis of the jaw, atypical femoral fractures and osteonecrosis of the external auditory canal.",
    },
    {
      action: "Before denosumab, examine the mouth, and arrange a dental examination for people with risk factors for jaw osteonecrosis",
      why: "The label recommends a dental examination with preventive dentistry before treatment for people with risk factors, among which it lists a diagnosis of cancer, and good oral hygiene during treatment.",
      source: "prolia-label",
      quote: "A routine oral exam should be performed by the prescriber prior to initiation of Prolia treatment.",
    },
  ],
  bestInClass: {
    statement: "Every body read assesses fracture risk in people on bone-thinning hormone therapy, though with different strength, and uses bisphosphonates or denosumab where a drug is needed. They differ on how to assess and when to treat. For women on aromatase inhibitors, NICE NG101 (last updated 2025) offers a baseline DEXA scan and points to the 2008 UK expert group, which treats at a T-score below -2; NICE NG259 (2026) suggests considering treatment at -1.5 or less; the 2025 joint position statement treats at below -2.0 or with any two risk factors; NOGG (2024) uses FRAX with bone density where practical, as a strong recommendation. For men on ADT, NOGG strongly recommends a FRAX assessment for all, where NICE NG131 says to consider it. ASCO (2019), read as an abstract, starts with a risk tool and asks for a bone density test where the risk is substantial. The ESMO 2020 guideline could not be read.",
    sources: ["nice-ng101", "nice-ng259", "uk-expert-2008", "joint-2025", "nogg-2024", "nice-ng131", "asco-2019", "esmo-2020"],
  },
  variants: [
    {
      name: "Risk tool first, bone density at substantial risk (ASCO 2019)",
      differs: "Asks clinicians to use an established fracture risk tool and to obtain a bone density test for those at substantial risk, rather than a baseline scan for all women starting an aromatase inhibitor. The 2025 joint position statement's summary table gives ASCO's treatment criteria as osteoporosis on the scan, or a 10-year FRAX probability (US version) of 20% for a major osteoporotic fracture or 3% for a hip fracture.",
      evidence: "ASCO based many recommendations on the 2018 US Preventive Services Task Force review in people without cancer, with 61 additional studies; read as an abstract, so its grades are not given, and the thresholds are second-hand.",
      sources: ["asco-2019", "joint-2025"],
    },
    {
      name: "T-score below -2.0 or any two risk factors (international joint position statement, 2025)",
      differs: "Starts denosumab or a bisphosphonate in women on an aromatase inhibitor with a T-score below -2.0, or with any two of a set of risk factors listed in a figure that could not be read as text; others have exercise, vitamin D and calcium, with risk and bone density checked every 1 to 2 years. Bone density is checked every two years on treatment. Its vitamin D figure is 800 to 2000 IU a day, with calcium 1000 mg a day if the diet is low in calcium. Its 2017 edition also treated at below -1.5 with one additional risk factor.",
      evidence: "A position statement of seven societies (IOF, CABS, ECTS, IEG, ESCEO, IMS, SIOG). It rates denosumab and intravenous bisphosphonates as Level I evidence and oral bisphosphonates as Level II.",
      sources: ["joint-2025"],
    },
    {
      name: "ESMO 2020, as summarised by the 2025 joint position statement",
      differs: "The joint statement's table gives ESMO's criteria as postmenopausal women on an aromatase inhibitor for more than 6 months with a T-score below -2, or two or more risk factors for fracture, or confirmed annual bone loss above 5%, with denosumab 60 mg every 6 months as first-line therapy and bone density monitored every 2 years.",
      evidence: "Second-hand: the ESMO guideline itself could not be read, so its own wording and grades are not given.",
      sources: ["joint-2025", "esmo-2020"],
    },
    {
      name: "FRAX for everyone starting an aromatase inhibitor or ADT (NOGG 2024 and the UK prostate expert group 2020)",
      differs: "Assesses all women starting an aromatase inhibitor and all men starting ADT with FRAX, entering the treatment as a secondary cause of osteoporosis, with bone density where practical, and treats at the NOGG intervention threshold. Repeats FRAX with bone density 12 to 24 months after starting an aromatase inhibitor, or 12 to 18 months after starting ADT, in those near to but below the threshold. The prostate group cites NOGG for a daily calcium intake of 700 to 1200 mg and vitamin D 800 IU daily, and reassesses all men who have had 5 years of ADT.",
      evidence: "NOGG grades the two assessment recommendations and drug treatment for women at high risk as strong, and the repeat assessments as conditional. The NOGG threshold chart is an image and was not read. NICE NG259 says its own criteria are a change from NOGG-based practice.",
      sources: ["nogg-2024", "uk-prostate-2020", "nice-ng259"],
    },
    {
      name: "Adjuvant bisphosphonates to reduce recurrence in postmenopausal women (NICE NG101, EBCTCG)",
      differs: "A separate use from bone protection. NICE offers zoledronic acid or sodium clodronate as adjuvant therapy to postmenopausal women with node-positive invasive breast cancer and considers them in node-negative disease at high risk of recurrence; its baseline DEXA recommendation is written for women not receiving them. The 2025 joint position statement says denosumab cannot be recommended for preventing recurrence.",
      evidence: "NICE recommendations [2018]; the use was off-label in March 2025, as NICE notes. In the EBCTCG meta-analysis of 18,766 women, among the 11,767 who were postmenopausal bisphosphonates reduced recurrence (rate ratio 0.86, 95% CI 0.78 to 0.94), bone recurrence (0.72, 0.60 to 0.86) and breast cancer mortality (0.82, 0.73 to 0.93), with no apparent effect in premenopausal women; fractures were reduced overall (0.85, 0.75 to 0.97). Read as an abstract.",
      sources: ["nice-ng101", "ebctcg-2015", "joint-2025"],
    },
    {
      name: "Cancer Care Ontario guideline endorsed by ASCO for prostate cancer (2020)",
      differs: "A prostate-specific bone health guideline, released by Cancer Care Ontario in 2017, covering fracture risk in non-metastatic disease through to castration-resistant disease in bone, wholly endorsed by ASCO.",
      evidence: "Read as an abstract; its individual recommendations are not given here.",
      sources: ["asco-cco-prostate-2020"],
    },
  ],
  grades: [
    { claim: "Baseline DEXA for women starting an aromatase inhibitor, ovarian suppression or with treatment-induced menopause, not on adjuvant bisphosphonates", grade: "not graded (NICE); dated [2009, amended 2018]", source: "nice-ng101" },
    { claim: "No DEXA scan for people on tamoxifen alone", grade: "not graded (NICE); dated [2009, amended 2023]", source: "nice-ng101" },
    { claim: "Bisphosphonates for women identified by the UK expert group algorithms", grade: "not graded (NICE); dated [2009]", source: "nice-ng101" },
    { claim: "No routine bisphosphonates to prevent osteoporosis on ADT", grade: "not graded (NICE); dated [2008]", source: "nice-ng131", quote: "Do not routinely offer bisphosphonates to prevent osteoporosis in people with prostate cancer having androgen deprivation therapy." },
    { claim: "Fracture risk assessment, bisphosphonates and denosumab for people on ADT with osteoporosis", grade: "not graded (NICE); each dated [2014]", source: "nice-ng131" },
    { claim: "FRAX assessment for all women starting an aromatase inhibitor", grade: "Strong recommendation", source: "nogg-2024", quote: "All women starting aromatase inhibitor (AI) therapy should have their fracture risk assessed using FRAX, considering AI use as a secondary cause of osteoporosis, including BMD measurement where practical (Strong recommendation)." },
    { claim: "Bisphosphonates or denosumab for women on an aromatase inhibitor at high fracture risk", grade: "Strong recommendation", source: "nogg-2024", quote: "Women with high fracture risk should be commenced on drug treatment to prevent osteoporosis and fracture, with bisphosphonates or denosumab (Strong recommendation)." },
    { claim: "Repeat FRAX with bone density 12 to 18 months after starting ADT in men near the threshold", grade: "Conditional recommendation", source: "nogg-2024", quote: "should have FRAX with BMD reassessed 12–18 months after starting ADT (Conditional recommendation)." },
  ],
  sources: [
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider', 'do not') and each is dated. Published July 2018, last updated April 2025.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng131", label: "Prostate cancer: diagnosis and management (NG131), recommendations", publisher: "NICE", year: 2019, url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; each is dated, for example [2014]. Published May 2019, last updated December 2021.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng259", label: "Osteoporosis: risk assessment (NG259)", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ng259", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'consider'). Published July 2026; it updates and replaces CG146 (August 2012).", read: "full-text", accessed: "2026-11-17" },
    { key: "uk-expert-2008", label: "Guidance for the management of breast cancer treatment-induced bone loss: a consensus position statement from a UK Expert Group (full version, July 2008)", publisher: "UK Expert Group (Reid et al.); abridged version in Cancer Treatment Reviews 2008;34:S1-S18", year: 2008, url: "https://strwebprdmedia.blob.core.windows.net/media/uuunj31y/management-of-breast-cancer-treatment-induced-bone-loss.pdf", doi: "10.1016/j.ctrv.2008.03.007", gradingScheme: "A consensus statement; its two treatment algorithms carry no grades.", read: "full-text", accessed: "2026-11-17" },
    { key: "uk-prostate-2020", label: "Guidance for the assessment and management of prostate cancer treatment-induced bone loss. A consensus position statement from an expert group", publisher: "Journal of Bone Oncology", year: 2020, url: "https://europepmc.org/article/PMC/PMC7516275", doi: "10.1016/j.jbo.2020.100311", read: "full-text", accessed: "2026-11-17" },
    { key: "nogg-2024", label: "The 2024 UK clinical guideline for the prevention and treatment of osteoporosis", publisher: "National Osteoporosis Guideline Group, Archives of Osteoporosis", year: 2025, url: "https://europepmc.org/article/PMC/PMC12417299", doi: "10.1007/s11657-025-01588-3", gradingScheme: "Recommendations follow the GRADE binary classification, strong or conditional; evidence statements carry levels such as Ia, Ic, IIa and IV.", read: "full-text", accessed: "2026-11-17" },
    { key: "joint-2025", label: "Management of aromatase inhibitor-associated bone loss (AIBL) in women with hormone-sensitive breast cancer: An updated joint position statement of the IOF, CABS, ECTS, IEG, ESCEO, IMS, and SIOG", publisher: "Journal of Bone Oncology", year: 2025, url: "https://europepmc.org/article/PMC/PMC12301826", doi: "10.1016/j.jbo.2025.100694", gradingScheme: "Levels of evidence I to IV for each drug class, printed in section headings.", read: "full-text", accessed: "2026-11-17" },
    { key: "prolia-label", label: "Prolia (denosumab) injection, US prescribing information", publisher: "Amgen; DailyMed, US National Library of Medicine", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=49e5afe9-a0c7-40c4-af9f-f287a80c5c88", read: "full-text", accessed: "2026-11-17" },
    { key: "ebctcg-2015", label: "Adjuvant bisphosphonate treatment in early breast cancer: meta-analyses of individual patient data from randomised trials", publisher: "Early Breast Cancer Trialists' Collaborative Group, The Lancet", year: 2015, url: "https://europepmc.org/abstract/MED/26211824", doi: "10.1016/S0140-6736(15)60908-4", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-2019", label: "Management of Osteoporosis in Survivors of Adult Cancers With Nonmetastatic Disease: ASCO Clinical Practice Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2019, url: "https://europepmc.org/abstract/MED/31532726", doi: "10.1200/JCO.19.01696", read: "abstract", accessed: "2026-11-17" },
    { key: "asco-cco-prostate-2020", label: "Bone Health and Bone-Targeted Therapies for Prostate Cancer: ASCO Endorsement of a Cancer Care Ontario Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/31990618", doi: "10.1200/JCO.19.03148", read: "abstract", accessed: "2026-11-17" },
    { key: "esmo-2020", label: "Bone health in cancer: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.07.019", doi: "10.1016/j.annonc.2020.07.019", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the ESMO 2020 bone health guideline still could not be read: Europe PMC holds no abstract or full text and the publisher's site answered a script with a bot check. What this page says of ESMO's thresholds comes second-hand from the summary table in the 2025 joint position statement, and ESMO's grades are not given. No newer ESMO edition was found in Europe PMC.",
    "On 17 November 2026 ASCO 2019 was again read only as an abstract; the publisher's site refuses a script. Which tool it prefers, its own wording of the bone density and FRAX thresholds, its grades and how often it repeats the scan are not given here; the thresholds shown are second-hand from the 2025 joint position statement. No newer ASCO osteoporosis guideline was found in Europe PMC or Crossref.",
    "The 2008 UK expert group statement that NICE NG101 still points to predates denosumab and has no later edition that NICE cites. Its two algorithm figures, and the figures in the 2025 joint position statement, the UK prostate statement and the NOGG guideline (including the NOGG intervention threshold chart), are images that were not read; nothing on this page is taken from them.",
    "The sources disagree on when to treat a woman on an aromatase inhibitor (a T-score below -2 in the UK expert group and the joint position statement, -1.5 or less in NICE NG259) and none says which should prevail. NG259 covers assessment and treatment criteria only; NICE says its recommendations on drug treatment, exercise, calcium and vitamin D, and on treatment monitoring, will come in a later update.",
    "The sources give different calcium and vitamin D figures: calcium 1 g and vitamin D 400 to 800 IU a day (UK expert group, 2008), calcium 1000 mg and at least 400 IU a day with denosumab (US label), vitamin D 800 to 2000 IU a day with calcium 1000 mg if the diet is low (2025 joint position statement), and a daily calcium intake of 700 to 1200 mg with vitamin D 800 IU (NOGG, as cited by the UK prostate expert group). No source read gives an exercise prescription for bone.",
    "Repeat scan intervals differ: 24 months (UK expert group), every 1 to 2 years (2025 joint position statement), 12 to 24 months on an aromatase inhibitor and 12 to 18 months on ADT for those near the threshold (NOGG). NICE NG259 says not to repeat a DEXA scan routinely within 2 years unless there are exceptional circumstances.",
    "The denosumab dose, calcium and vitamin D figures and the warning about stopping are from the US label. The UK product information was not read.",
    "The EBCTCG meta-analysis and the ASCO endorsement of the Cancer Care Ontario prostate guideline were read as abstracts only.",
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
