import { protocol } from "./helpers";

/*
 * Sexual health after a cancer diagnosis: who raises it, when, and the interventions with evidence for women and for
 * men. Hot flushes appear here only as the guideline places them; they have their own protocol
 * (`hot-flushes-on-endocrine-therapy-non-hormonal-options`).
 *
 * What was read, and how (first on 11 November 2026; every source re-read as raw text on 17 November 2026 in a
 * second accuracy pass, and each quote checked against the saved text by script):
 * - Cancer Care Ontario guideline, Interventions to address sexual problems in people with cancer (Barbera et al.,
 *   Curr Oncol 2017): full text from the PubMed Central article page (one plain request; the Europe PMC full-text
 *   endpoint returned an error and the journal's own PDF refused a script), including Table I and every
 *   recommendation with its evidence base.
 * - ASCO adaptation of the CCO guideline (J Clin Oncol 2018): abstract only, from the Europe PMC REST API; the full
 *   text is subscription only.
 * - NICE NG23, Menopause (last updated 15 April 2026): recommendations page, raw HTML (recommendations 1.5.14 to
 *   1.5.19, genitourinary symptoms after breast cancer, dated 2024).
 * - Comparison of the 2024 SOGC, 2024 NCCN, 2022 ESO-ESMO and 2018 ASCO guidelines for women (Support Care Cancer
 *   2025): abstract, from the Europe PMC REST API.
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied from the raw text with nothing
 * changed. The second pass corrected two quotes that carried a stray space inside "pde5i", took out reasons the
 * sources do not give, restored the sources' hedges ("can be of benefit", "may be tried", "may also be considered in
 * some cases"), and narrowed the evidence base to breast and prostate cancer as the guideline states it. The page
 * prints no drug dose, because none of the sources read prints one.
 */
export const sexualHealthAssessmentAndInterventions = protocol({
  id: "sexual-health-assessment-and-interventions",
  name: "Sexual health after cancer: assessment and interventions for women and men",
  aka: ["sexual dysfunction after cancer", "sexual problems in people with cancer", "vaginal dryness after cancer treatment", "erectile dysfunction after cancer", "psychosexual counselling", "vaginal dilators", "penile rehabilitation"],
  domain: "survivorship",
  tldr: "Cancer and its treatment often change sex, desire, body image and relationships, for women and men. Guidelines say your team should raise it so you do not have to. Help includes counselling, alone or as a couple; moisturisers and lubricants, then sometimes low-dose vaginal oestrogen, for dryness; dilators and pelvic floor physiotherapy; and tablets, devices or injections for erection problems.",
  simple: "Cancer can change your sex life. Your team should ask about it. There are treatments and counselling that help.",
  summary: "The Cancer Care Ontario guideline (2016, published 2017), adapted by ASCO in 2018 with added statements, makes one overarching recommendation: a member of the healthcare team should start a discussion about sexual health and dysfunction caused by the cancer or its treatment, ideally including a partner, at diagnosis and periodically through follow-up. The ASCO abstract states that medical and treatable contributing factors should be identified and addressed first, and that psychosocial or psychosexual counselling should be offered to all patients with cancer.\n\nFor women, CCO recommends psychosocial counselling for problems with sexual response, body image, intimacy and overall function (for body image and intimacy it found couples-based counselling effective, compared with usual care, where a woman is partnered), with exercise or pelvic floor physiotherapy as possible additions; vaginal moisturisers or lubricants, which can be tried, for vaginal atrophy; vaginal oestrogen for those who do not respond or whose symptoms are more severe at presentation, which CCO says can be used safely with few exceptions, can be considered after a discussion in hormone-positive breast cancer when conservative measures fail, and is of uncertain safety with aromatase inhibitors; vaginal dilators, which can be of benefit for vaginismus or stenosis and have a role in preventing stenosis after radiation for cervical cancer; and pelvic floor physiotherapy for pain or other pelvic floor problems. CCO states that hormone-sensitive breast cancer is a contraindication to systemic hormone therapy. The ASCO abstract words the vaginal steps more cautiously: lubricants in addition to moisturisers may be tried as a first option, and low-dose vaginal oestrogen, lidocaine and dehydroepiandrosterone may also be considered in some cases. None of the sources read prints a dose for any of these. For men, CCO recommends PDE5 inhibitors first for erectile dysfunction regardless of type of surgery (nitrates in any form are a contraindication), then consideration of a vacuum device, urethral medication or intracavernosal injection; counselling combined with PDE5 inhibitors, ideally directed toward the couple; and daily vacuum device use to prevent loss of penile length. The ASCO abstract says PDE5 inhibitors may be beneficial and that surgery remains an option where symptoms or treatment complications do not respond to medical management. CCO says its data were often of moderate quality at best.\n\nA 2025 comparison of ASCO 2018, ESO-ESMO 2022, NCCN 2024 and SOGC 2024 for women found consensus on non-hormonal moisturisers and lubricants first and low-dose vaginal oestrogen second, and on multidisciplinary and psychological care; ESO-ESMO alone did not include recommendations on drugs for low desire, for which the data are limited.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adult men and women of all sexual orientations living with cancer of any type, and their partners, as the CCO guideline scopes it. The guideline says its evidence primarily concerned breast or prostate cancer. Adults previously treated for a childhood cancer are not included. Fertility is not covered here and has its own protocol.",
  trigger: "At diagnosis, and periodically throughout follow-up.",
  steps: [
    {
      action: "Raise sexual health with every patient at diagnosis and periodically through follow-up, ideally with the partner if the patient has one",
      why: "The panel called this recommendation vital: none of the others can be used unless someone has taken the initiative to ask.",
      source: "cco-2017",
      quote: "The issue should be raised at the time of diagnosis and should continue to be reassessed periodically throughout follow-up.",
    },
    {
      action: "Find and address medical and treatable contributing causes first",
      why: "ASCO says these come first. Its abstract, the only part read, does not list them.",
      source: "asco-2018",
      quote: "Medical and treatable contributing factors should be identified and addressed first.",
    },
    {
      action: "Offer psychosocial or psychosexual counselling to all patients",
      why: "It aims to improve sexual response, body image, intimacy and relationships, and overall sexual function. The CCO guideline adds that couples-based counselling was effective for partnered women compared with usual care, and that counselling for partnered men is ideally directed toward the couple.",
      source: "asco-2018",
      quote: "Psychosocial and/or psychosexual counseling should be offered to all patients with cancer, aiming to improve sexual response, body image, intimacy and relationship issues, and overall sexual functioning and satisfaction.",
    },
    {
      action: "For vaginal dryness, try vaginal moisturisers for daily comfort, lubricants for sex, or both, first",
      why: "The panel says women with cancer should be managed in the same way as women without cancer, and that vaginal health matters for examination and follow-up as well as for sex.",
      source: "cco-2017",
      quote: "Women with symptoms from vaginal atrophy should be managed in the same way as women without cancer: vaginal moisturizers for daily comfort or lubricants with sexual activity, or both.",
    },
    {
      action: "If symptoms do not respond or are more severe at the start, consider vaginal oestrogen; in hormone-positive breast cancer consider it only after conservative measures have failed and after a discussion",
      why: "CCO says vaginal oestrogen can be used safely with few exceptions, but that whether it is safe with aromatase inhibitors is uncertain because the data are limited. ASCO's abstract says low-dose vaginal oestrogen, lidocaine and dehydroepiandrosterone may also be considered in some cases, without saying which.",
      source: "cco-2017",
      quote: "For women with hormone-positive breast cancer who are symptomatic and not responding to conservative measures, vaginal estrogen can be considered after a discussion. Whether vaginal estrogen can be used safely in women with breast cancer on aromatase inhibitors is uncertain because of limited data.",
    },
    {
      action: "Consider vaginal dilators for vaginismus or vaginal stenosis, and to prevent stenosis after radiotherapy for cervical cancer; offer pelvic floor physiotherapy for pain or other pelvic floor problems",
      why: "The panel says dilators can be of benefit and saw a role for them in preventing narrowing after radiation for cervical cancer. It felt pelvic floor physiotherapy should also be offered to women with pain.",
      source: "cco-2017",
      quote: "Vaginal dilators can be of benefit in the management of vaginismus or vaginal stenosis. The expert panel felt that there was a role for vaginal dilators in the prevention of stenosis for patients with cervical cancer treated with radiation.",
    },
    {
      action: "For erectile dysfunction, use a PDE5 inhibitor first, whatever the type of surgery, unless the man takes nitrates in any form",
      why: "The panel says these tablets can be used whatever the type of cancer treatment, though they might work best after nerve-sparing surgery. It lists the use of nitrates in any form as a contraindication.",
      source: "cco-2017",
      quote: "And although pde5i medications might be most effective for men whose radical prostatectomy used a nerve-sparing approach, it is recommended that those agents be used as a first-line approach regardless of the type of surgery.",
    },
    {
      action: "If tablets do not work, consider a vacuum erection device, urethral medication or penile injections; use a vacuum device daily to prevent loss of penile length",
      why: "The panel names these as the alternatives and recommends daily use of a vacuum device to prevent loss of length. It says there could be some benefit in starting them earlier after cancer treatment rather than later.",
      source: "cco-2017",
      quote: "For men who do not respond to pde5i medications, alternative interventions such as a vacuum erectile device, a medicated urethral system for erection, or intracavernosal injection should be considered.",
    },
  ],
  bestInClass: {
    statement: "The CCO guideline (2016), adapted by ASCO (2018), remains the most complete cancer-specific guideline read: raise the subject routinely, treat contributing causes, offer counselling to all, and use the women's and men's interventions above. Later guidelines for women (ESO-ESMO 2022, NCCN 2024, SOGC 2024), as compared in 2025, agree on moisturisers and lubricants first and low-dose vaginal oestrogen second and on counselling; they differ on drugs for low desire, which all but ESO-ESMO include despite limited data, and on dilators and pelvic physiotherapy, recommended by ASCO, NCCN and SOGC. Those three later guidelines were not read directly.",
    sources: ["cco-2017", "asco-2018", "nice-ng23", "compare-2025"],
  },
  variants: [
    {
      name: "NICE NG23 (England, 2024 recommendations): vaginal oestrogen after breast cancer, with specialist input on aromatase inhibitors",
      differs: "For menopause-associated genitourinary symptoms in people with a personal history of breast cancer, sets the same order as CCO: offer non-hormonal moisturisers or lubricants, then consider vaginal oestrogen if symptoms have continued. For people currently having adjuvant aromatase inhibitors it asks the team to work with a breast cancer specialist to identify treatment options.",
      evidence: "NICE evidence reviews on genitourinary symptoms and breast cancer recurrence; NICE says it is unknown whether vaginal oestrogen affects the risk of recurrence, that systemic absorption is minimal compared with HRT, and that it is likely to be safe after oestrogen receptor-negative breast cancer. After oestrogen receptor-positive breast cancer NICE says it is unknown whether absorbed oestrogen could increase the risk of recurrence, and that adjuvant drugs that block oestrogen receptors, such as tamoxifen, would reduce any such impact. NICE notes that in November 2024 this was an off-label use of vaginal oestrogen.",
      sources: ["nice-ng23"],
    },
    {
      name: "Regular self-stimulation to improve sexual response (CCO and ASCO)",
      differs: "Adds regular stimulation, including masturbation, as advice for both women and men.",
      evidence: "Expert opinion of the CCO working group. The 2025 comparison reports that ASCO recommends any kind of stimulation, including masturbation, and that NCCN and SOGC recommend sexual aids such as vibrators to enhance arousal.",
      sources: ["cco-2017", "compare-2025"],
    },
    {
      name: "Drugs for low sexual desire in women (ASCO 2018, NCCN 2024, SOGC 2024)",
      differs: "Includes recommendations for androgens, bupropion, flibanserin, bremelanotide and buspirone for low sex drive.",
      evidence: "The 2025 comparison, read as an abstract, says all the guidelines except ESO-ESMO include these and that there is limited data; it does not say how strongly each recommends them. CCO made no recommendation for drugs to improve women's sexual response.",
      sources: ["compare-2025", "cco-2017"],
    },
    {
      name: "Daily against on-demand PDE5 inhibitor",
      differs: "A daily dose instead of tablets taken before sex.",
      evidence: "CCO: whether effectiveness differs can depend on the type of PDE5 inhibitor, but it seems that compliance and side effects might be better with daily use. CCO prints no dose for either.",
      sources: ["cco-2017"],
    },
  ],
  grades: [
    { claim: "PDE5 inhibitors, the alternatives to them, and counselling for men's sexual response", grade: "39 publications of low-to-moderate quality (CCO)", source: "cco-2017", quote: "The evidence base for these recommendations consists of thirty-nine publications of low-to-moderate quality" },
    { claim: "Daily vacuum device to prevent loss of penile length", grade: "three publications of moderate quality (CCO)", source: "cco-2017", quote: "The evidence base for these recommendations consists of three publications of moderate quality" },
    { claim: "Vaginal oestrogen after breast cancer when non-hormonal treatment fails", grade: "NICE does not grade recommendations ('consider')", source: "nice-ng23", quote: "Consider vaginal oestrogen for people with a personal history of breast cancer and genitourinary symptoms that have continued despite trying non-hormonal treatments" },
    { claim: "Counselling for overall sexual function in women", grade: "16 publications of moderate quality and four systematic reviews (CCO)", source: "cco-2017", quote: "The evidence base for this recommendation consists of sixteen publications of moderate quality" },
  ],
  sources: [
    { key: "cco-2017", label: "Interventions to address sexual problems in people with cancer (Cancer Care Ontario guideline)", publisher: "Cancer Care Ontario, Current Oncology", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5486385/", doi: "10.3747/co.24.3583", gradingScheme: "Recommendations are not graded; each states the number and quality of the publications behind it (low, moderate or high).", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2018", label: "Interventions to Address Sexual Problems in People With Cancer: American Society of Clinical Oncology Clinical Practice Guideline Adaptation of Cancer Care Ontario Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29227723", doi: "10.1200/JCO.2017.75.8995", read: "abstract", accessed: "2026-11-17" },
    { key: "nice-ng23", label: "Menopause: identification and management (NG23), recommendations 1.5.14 to 1.5.19", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ng23/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals the strength.", read: "full-text", accessed: "2026-11-17" },
    { key: "compare-2025", label: "2024 SOGC, 2024 NCCN, 2022 ESO-ESMO, and 2018 ASCO: a comparison of female cancer survivorship guidelines for the management of sexual health concerns", publisher: "Supportive Care in Cancer", year: 2025, url: "https://europepmc.org/abstract/MED/40518469", doi: "10.1007/s00520-025-09640-1", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The ASCO 2018 adaptation was read only as an abstract (the full text is subscription only), so its added statements beyond those in the abstract are not given here. The abstract says low-dose vaginal oestrogen, lidocaine and dehydroepiandrosterone may be considered in some cases, and does not say which cases, at what dose or for how long.",
    "No source read prints a dose for vaginal oestrogen, dehydroepiandrosterone, lidocaine, ospemifene or a PDE5 inhibitor, so none is given on this page; a dose belongs to the product's label and the prescriber.",
    "The ESO-ESMO 2022, NCCN 2024 and SOGC 2024 guidelines were not read directly; their positions are as reported in a 2025 comparison, read as an abstract. Whether any of them has a later edition was not checked.",
    "On 17 November 2026 a Europe PMC title search and Crossref showed no update or replacement of the CCO 2017 or ASCO 2018 papers. Ontario Health's own page for the guideline refused a script, so whether Ontario Health has since reviewed, endorsed or archived guideline 19-6 could not be confirmed.",
    "The safety of vaginal oestrogen with aromatase inhibitors is uncertain in the CCO guideline; OnCo's `vaginal-oestrogen-after-breast-cancer` page sets out the later evidence.",
    "NICE NG23 is guidance for England, and its recommendations here cover menopause-associated genitourinary symptoms after breast cancer only, not other cancers or other sexual problems.",
    "The CCO guideline says its evidence primarily concerned breast or prostate cancer, with a paucity of data for other cancer types and for special populations or conditions. It applies to people of all sexual orientations but the sources read give no recommendation specific to LGBTQ+ people.",
  ],
  institutions: ["ontario-health-cancer-care-ontario", "asco", "esmo"],
  technologies: ["sexual-function-after-cancer", "vaginal-oestrogen-after-breast-cancer", "menopause-after-cancer-treatment"],
  terms: ["erectile-dysfunction-after-prostate-cancer", "sex-fertility-after-bowel-cancer", "quality-of-life", "late-effects"],
  sections: ["supportive-care"],
  related: ["fertility-preservation-before-cancer-treatment", "hot-flushes-on-endocrine-therapy-non-hormonal-options"],
  tags: ["protocol", "survivorship", "sexual-health"],
});
