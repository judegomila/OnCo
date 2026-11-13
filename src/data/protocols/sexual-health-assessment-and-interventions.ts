import { protocol } from "./helpers";

/*
 * Sexual health after a cancer diagnosis: who raises it, when, and the interventions with evidence for women and for
 * men. Hot flushes appear here only as the guideline places them; they have their own protocol
 * (`hot-flushes-on-endocrine-therapy-non-hormonal-options`).
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - Cancer Care Ontario guideline, Interventions to address sexual problems in people with cancer (Barbera et al.,
 *   Curr Oncol 2017): full text from the PubMed Central article page, including Table 1 and every recommendation with
 *   its evidence base.
 * - ASCO adaptation of the CCO guideline (J Clin Oncol 2018): abstract only; the publisher refused a script.
 * - NICE NG23, Menopause (last updated 15 April 2026): recommendations page, raw HTML (genitourinary symptoms after
 *   breast cancer, 2024 recommendations).
 * - Comparison of the 2024 SOGC, 2024 NCCN, 2022 ESO-ESMO and 2018 ASCO guidelines for women (Support Care Cancer
 *   2025): abstract.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const sexualHealthAssessmentAndInterventions = protocol({
  id: "sexual-health-assessment-and-interventions",
  name: "Sexual health after cancer: assessment and interventions for women and men",
  aka: ["sexual dysfunction after cancer", "sexual problems in people with cancer", "vaginal dryness after cancer treatment", "erectile dysfunction after cancer", "psychosexual counselling", "vaginal dilators", "penile rehabilitation"],
  domain: "survivorship",
  tldr: "Cancer and its treatment often change sex, desire, body image and relationships, for women and men. Guidelines say your team should raise it so you do not have to. Help includes counselling, alone or as a couple; moisturisers, lubricants and then low-dose vaginal oestrogen for dryness; dilators and pelvic floor physiotherapy; and tablets, devices or injections for erection problems.",
  simple: "Cancer can change your sex life. Your team should ask about it. There are treatments and counselling that help.",
  summary: "The Cancer Care Ontario guideline (2016, published 2017), adapted by ASCO in 2018 with added statements, makes one overarching recommendation: a member of the healthcare team should start a discussion about sexual health and dysfunction caused by the cancer or its treatment, ideally including a partner, at diagnosis and periodically through follow-up. ASCO adds that medical and treatable contributing factors should be found and addressed first, and that psychosocial or psychosexual counselling should be offered to all patients.\n\nFor women, CCO recommends psychosocial counselling for problems with sexual response, body image, intimacy and overall function (couples-based where partnered), with exercise or pelvic floor physiotherapy as possible additions; vaginal moisturisers and lubricants first for vaginal atrophy, then vaginal oestrogen, which can be considered after discussion in hormone-receptor-positive breast cancer when conservative measures fail and is of uncertain safety with aromatase inhibitors; vaginal dilators for vaginismus or stenosis, and to prevent stenosis after radiotherapy for cervical cancer; and pelvic floor physiotherapy for pain. For men, PDE5 inhibitors first for erectile dysfunction regardless of type of surgery, then a vacuum device, urethral medication or intracavernosal injection; counselling combined with PDE5 inhibitors, ideally for the couple; and daily vacuum device use to prevent loss of penile length. The evidence is mostly low to moderate quality.\n\nA 2025 comparison of ASCO 2018, ESO-ESMO 2022, NCCN 2024 and SOGC 2024 for women found consensus on non-hormonal moisturisers and lubricants first and low-dose vaginal oestrogen second, and on multidisciplinary and psychological care; ESO-ESMO alone did not include recommendations on drugs for low desire, for which the data are limited.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults with any cancer, during and after treatment, and their partners. The guideline's evidence is mostly from breast, gynaecological and prostate cancer. Children and adolescents, and fertility questions, are outside it (fertility has its own protocol).",
  trigger: "At diagnosis, and periodically through treatment and follow-up.",
  steps: [
    {
      action: "Raise sexual health with every patient at diagnosis and periodically through follow-up, including the partner where the patient wishes",
      why: "Many people never mention sexual problems unless asked; nothing else can help until someone opens the conversation.",
      source: "cco-2017",
      quote: "The issue should be raised at the time of diagnosis and should continue to be reassessed periodically throughout follow-up.",
    },
    {
      action: "Find and treat medical and treatable contributing causes first",
      why: "Some problems have a direct physical cause that can be treated.",
      source: "asco-2018",
      quote: "Medical and treatable contributing factors should be identified and addressed first.",
    },
    {
      action: "Offer psychosocial or psychosexual counselling to all patients, as a couple where they are partnered",
      why: "Counselling improved sexual response, body image and intimacy in the studies reviewed, and helps couples adapt.",
      source: "asco-2018",
      quote: "Psychosocial and/or psychosexual counseling should be offered to all patients with cancer, aiming to improve sexual response, body image, intimacy and relationship issues, and overall sexual functioning and satisfaction.",
    },
    {
      action: "For vaginal dryness, start with vaginal moisturisers for daily comfort and lubricants for sex",
      why: "These are safe, need no prescription in most countries, and help many women.",
      source: "cco-2017",
      quote: "Women with symptoms from vaginal atrophy should be managed in the same way as women without cancer: vaginal moisturizers for daily comfort or lubricants with sexual activity, or both.",
    },
    {
      action: "If dryness persists or is severe, consider low-dose vaginal oestrogen; in hormone-receptor-positive breast cancer only after discussion of the uncertainty",
      why: "Vaginal oestrogen works well, but whether it is safe with aromatase inhibitors is not known from the data available.",
      source: "cco-2017",
      quote: "For women with hormone-positive breast cancer who are symptomatic and not responding to conservative measures, vaginal estrogen can be considered after a discussion. Whether vaginal estrogen can be used safely in women with breast cancer on aromatase inhibitors is uncertain because of limited data.",
    },
    {
      action: "Offer vaginal dilators for vaginismus or narrowing, including after pelvic radiotherapy for cervical cancer, and pelvic floor physiotherapy for pain",
      why: "Radiotherapy and surgery can narrow the vagina and cause pain; dilators and physiotherapy can prevent or ease this.",
      source: "cco-2017",
      quote: "Vaginal dilators can be of benefit in the management of vaginismus or vaginal stenosis. The expert panel felt that there was a role for vaginal dilators in the prevention of stenosis for patients with cervical cancer treated with radiation.",
    },
    {
      action: "For erectile dysfunction, offer a PDE5 inhibitor first, whatever the type of surgery, unless the man takes nitrates",
      why: "These tablets help many men after cancer treatment; they must not be combined with nitrate heart medicines.",
      source: "cco-2017",
      quote: "And although pde 5i medications might be most effective for men whose radical prostatectomy used a nerve-sparing approach, it is recommended that those agents be used as a first-line approach regardless of the type of surgery.",
    },
    {
      action: "If tablets do not work, consider a vacuum erection device, urethral medication or penile injections, and a daily vacuum device to prevent loss of penile length",
      why: "Other treatments work where tablets do not, and starting early may give a better result.",
      source: "cco-2017",
      quote: "For men who do not respond to pde 5i medications, alternative interventions such as a vacuum erectile device, a medicated urethral system for erection, or intracavernosal injection should be considered.",
    },
  ],
  bestInClass: {
    statement: "The CCO guideline (2016), adapted by ASCO (2018), remains the most complete cancer-specific guideline read: raise the subject routinely, treat contributing causes, offer counselling to all, and use the women's and men's interventions above. Later guidelines for women (ESO-ESMO 2022, NCCN 2024, SOGC 2024), as compared in 2025, agree on moisturisers and lubricants first and low-dose vaginal oestrogen second and on counselling; they differ on drugs for low desire, which all but ESO-ESMO include despite limited data, and on dilators and pelvic physiotherapy, recommended by ASCO, NCCN and SOGC. Those three later guidelines were not read directly.",
    sources: ["cco-2017", "asco-2018", "nice-ng23", "compare-2025"],
  },
  variants: [
    {
      name: "NICE NG23 (2024): vaginal oestrogen after breast cancer, with specialist input on aromatase inhibitors",
      differs: "Sets the same order as CCO (non-hormonal moisturisers or lubricants first, then vaginal oestrogen if symptoms continue) for anyone with a personal history of breast cancer, and for people currently on adjuvant aromatase inhibitors asks the team to work with a breast cancer specialist rather than prescribe directly.",
      evidence: "NICE evidence reviews on genitourinary symptoms and breast cancer recurrence; NICE says it is unknown whether vaginal oestrogen affects the risk of recurrence, that systemic absorption is minimal compared with HRT, and that it is likely to be safe after oestrogen receptor-negative breast cancer. Vaginal oestrogen after breast cancer was off-label in November 2024.",
      sources: ["nice-ng23"],
    },
    {
      name: "Regular self-stimulation to improve sexual response (CCO and ASCO)",
      differs: "Adds regular stimulation, including masturbation, as advice for both women and men.",
      evidence: "Expert opinion of the CCO working group; ASCO includes it; NCCN and SOGC recommend sexual aids such as vibrators, per the 2025 comparison.",
      sources: ["cco-2017", "compare-2025"],
    },
    {
      name: "Drugs for low sexual desire in women (NCCN 2024, SOGC 2024)",
      differs: "Includes androgens, bupropion, flibanserin, bremelanotide or buspirone for low desire.",
      evidence: "Included by ASCO, NCCN and SOGC and not by ESO-ESMO; the 2025 comparison notes limited data. CCO made no recommendation for drugs to improve women's sexual response.",
      sources: ["compare-2025", "cco-2017"],
    },
    {
      name: "Daily against on-demand PDE5 inhibitor",
      differs: "A daily dose instead of tablets taken before sex.",
      evidence: "CCO: whether effectiveness differs may depend on the drug, but compliance and side effects may be better with daily use.",
      sources: ["cco-2017"],
    },
  ],
  grades: [
    { claim: "PDE5 inhibitors and counselling for men's sexual response", grade: "39 publications of low-to-moderate quality (CCO)", source: "cco-2017", quote: "The evidence base for these recommendations consists of thirty-nine publications of low-to-moderate quality" },
    { claim: "Daily vacuum device to prevent loss of penile length", grade: "three publications of moderate quality (CCO)", source: "cco-2017", quote: "The evidence base for these recommendations consists of three publications of moderate quality" },
    { claim: "Vaginal oestrogen after breast cancer when non-hormonal treatment fails", grade: "NICE does not grade recommendations ('consider')", source: "nice-ng23", quote: "Consider vaginal oestrogen for people with a personal history of breast cancer and genitourinary symptoms that have continued despite trying non-hormonal treatments" },
    { claim: "Counselling for overall sexual function in women", grade: "16 publications of moderate quality and four systematic reviews (CCO)", source: "cco-2017", quote: "The evidence base for this recommendation consists of sixteen publications of moderate quality" },
  ],
  sources: [
    { key: "cco-2017", label: "Interventions to address sexual problems in people with cancer (Cancer Care Ontario guideline)", publisher: "Cancer Care Ontario, Current Oncology", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5486385/", doi: "10.3747/co.24.3583", gradingScheme: "Recommendations are not graded; each states the number and quality of the publications behind it (low, moderate or high).", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2018", label: "Interventions to Address Sexual Problems in People With Cancer: American Society of Clinical Oncology Clinical Practice Guideline Adaptation of Cancer Care Ontario Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29227723", doi: "10.1200/JCO.2017.75.8995", read: "abstract", accessed: "2026-11-11" },
    { key: "nice-ng23", label: "Menopause: identification and management (NG23), recommendations 1.5.14 to 1.5.19", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ng23/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals the strength.", read: "full-text", accessed: "2026-11-11" },
    { key: "compare-2025", label: "2024 SOGC, 2024 NCCN, 2022 ESO-ESMO, and 2018 ASCO: a comparison of female cancer survivorship guidelines for the management of sexual health concerns", publisher: "Supportive Care in Cancer", year: 2025, url: "https://europepmc.org/abstract/MED/40518469", doi: "10.1007/s00520-025-09640-1", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The ASCO 2018 adaptation was read only as an abstract, so its added statements beyond those in the abstract are not given here.",
    "The ESO-ESMO 2022, NCCN 2024 and SOGC 2024 guidelines were not read directly; their positions are as reported in a 2025 comparison, read as an abstract.",
    "No updated CCO or Ontario Health edition after 2016 was found; whether one is in progress was not checked.",
    "The safety of vaginal oestrogen with aromatase inhibitors is uncertain in the CCO guideline; OnCo's `vaginal-oestrogen-after-breast-cancer` page sets out the later evidence.",
    "The evidence is mostly in breast, gynaecological and prostate cancer and in heterosexual couples; sexual health for LGBTQ+ people with cancer, and after head and neck or colorectal cancer, is thinly covered by the sources read.",
  ],
  institutions: ["ontario-health-cancer-care-ontario", "asco", "esmo"],
  technologies: ["sexual-function-after-cancer", "vaginal-oestrogen-after-breast-cancer", "menopause-after-cancer-treatment"],
  terms: ["erectile-dysfunction-after-prostate-cancer", "sex-fertility-after-bowel-cancer", "quality-of-life", "late-effects"],
  sections: ["supportive-care"],
  related: ["fertility-preservation-before-cancer-treatment", "hot-flushes-on-endocrine-therapy-non-hormonal-options"],
  tags: ["protocol", "survivorship", "sexual-health"],
});
