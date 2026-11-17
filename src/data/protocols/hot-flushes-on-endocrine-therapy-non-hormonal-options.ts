import { protocol } from "./helpers";

/*
 * Hot flushes and night sweats caused by endocrine therapy for breast cancer and by androgen deprivation for prostate
 * cancer: what to offer when hormone replacement is ruled out or unwanted, and where the guidelines disagree.
 *
 * First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, the DailyMed API or the Europe PMC REST API) and every claim re-read against it; every quote was checked
 * verbatim by script.
 * - NICE NG101, Early and locally advanced breast cancer (last updated 14 April 2025): recommendations page, raw HTML
 *   (a copy another checker of this pass fetched from nice.org.uk the same day was re-used).
 * - NICE NG131, Prostate cancer (last updated 15 December 2021): recommendations page, raw HTML (re-used likewise).
 * - NICE NG23, Menopause (last updated 15 April 2026): recommendations page, raw HTML.
 * - NICE TA1143, Fezolinetant (published 31 March 2026): recommendation and committee discussion pages, raw HTML.
 * - Cancer Care Ontario guideline on sexual problems in people with cancer (Curr Oncol 2017), which includes
 *   vasomotor symptoms: full text from the PubMed Central article page (the Europe PMC full-text endpoint returned
 *   HTTP 500 and the E-utilities record holds the abstract only).
 * - ASCO adaptation of the CCO guideline (J Clin Oncol 2018): abstract.
 * - The North American Menopause Society 2023 nonhormone therapy position statement (Menopause 2023): abstract only;
 *   the full statement was not read.
 * - American College of Physicians guideline on drugs for menopausal vasomotor symptoms (Ann Intern Med 2026):
 *   abstract only.
 * - OASIS-4 trial of elinzanetant (N Engl J Med 2025): abstract.
 * - Review of neurokinin antagonists in breast cancer (Breast 2026): full text XML from Europe PMC (PMC13213637).
 * - LYNKUET (elinzanetant) US prescribing information, DailyMed version 10 published 4 August 2026, still the
 *   current version: full label text.
 * - The EMA medicine page for Lynkuet, which refused a script on 11 November, answered on 17 November and was read
 *   as raw HTML (the overview page only, not the product information PDF).
 * What the second pass changed: orders softened to the sources' own strength (CBT is "consider" in NICE; elinzanetant
 * is a trial result and a label, not a guideline recommendation here; NICE makes no recommendation on fezolinetant
 * during cancer treatment rather than forbidding it), the NICE and CCO positions on SSRIs with tamoxifen stated
 * separately, unsourced reasons removed from the `why` lines, the cyproterone dose and the elinzanetant dose added
 * from their sources, and the EU authorisation recorded.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const hotFlushesOnEndocrineTherapyNonHormonalOptions = protocol({
  id: "hot-flushes-on-endocrine-therapy-non-hormonal-options",
  name: "Hot flushes on breast cancer endocrine therapy and prostate cancer hormone therapy: non-hormonal options",
  aka: ["hot flashes on tamoxifen", "hot flushes on aromatase inhibitors", "vasomotor symptoms on endocrine therapy", "hot flushes on androgen deprivation therapy", "night sweats on hormone therapy", "elinzanetant for hot flushes", "fezolinetant after breast cancer"],
  domain: "symptom-management",
  tldr: "Hormone treatments for breast and prostate cancer can cause hot flushes and night sweats. After breast cancer, HRT is not routinely offered. Options include cognitive behavioural therapy, hypnosis, venlafaxine, gabapentin, SSRIs (NICE says not with tamoxifen) and, in a large trial, elinzanetant. For men, NICE offers medroxyprogesterone first. Soy, red clover and black cohosh are not advised.",
  simple: "Hormone treatment for cancer can cause hot flushes. Talking therapy and some medicines help. Ask your team before taking herbal remedies.",
  summary: "Breast cancer. NICE NG101 asks teams to offer women information and counselling about early menopause and menopausal symptoms, to stop systemic HRT at diagnosis, not to offer HRT routinely after breast cancer (it is contraindicated and off-label; in exceptional circumstances, after discussion of the risks, for severe symptoms), to consider SSRIs for hot flushes but not for women taking tamoxifen, and not to offer soy, red clover, black cohosh, vitamin E or magnetic devices. NICE NG23 (2024 recommendation) says to consider menopause-specific cognitive behavioural therapy for vasomotor symptoms where HRT is contraindicated or not wanted; written for menopause in general, with HRT first, it also says not to offer SSRIs, SNRIs or clonidine routinely as first-line treatment for vasomotor symptoms alone. CCO (2016) lists paroxetine, venlafaxine, gabapentin and clonidine as alternatives to hormone therapy and says women taking tamoxifen should not be offered paroxetine or fluoxetine because they inhibit CYP2D6; ASCO (2018) says women and men should be offered cognitive behavioural therapy, slow breathing, hypnosis, venlafaxine and gabapentin. NAMS (2023) grades CBT, clinical hypnosis, SSRIs and SNRIs, gabapentin and fezolinetant as Level I, oxybutynin Levels I to II, and does not recommend paced respiration, cooling techniques, acupuncture, supplements or clonidine.\n\nThe neurokinin antagonists. In OASIS-4 (474 women on endocrine therapy for HR-positive breast cancer or its prevention), elinzanetant 120 mg once a day reduced moderate to severe hot flushes by 3.4 more episodes a day than placebo at 12 weeks; the elinzanetant group started at a mean of 11.4 a day. The EMA lists elinzanetant for moderate to severe vasomotor symptoms associated with menopause or caused by adjuvant endocrine therapy for breast cancer. The US label (August 2026) is for vasomotor symptoms due to menopause only; it gives 120 mg once daily at bedtime, requires liver tests before starting and three months after, and says to avoid strong CYP3A4 inhibitors, grapefruit juice and strong or moderate CYP3A4 inducers and to reduce the dose to 60 mg once daily with moderate CYP3A4 inhibitors. Fezolinetant is recommended by NICE (TA1143, 2026) when HRT is unsuitable, but people having treatment for breast cancer or other oestrogen-dependent cancers are not included in its marketing authorisation, and after treatment its use should rest on an individual risk assessment. ACP (2026, general menopause) places the neurokinin antagonists third line.\n\nProstate cancer. NICE NG131 offers medroxyprogesterone 20 mg a day, initially for 10 weeks, for troublesome hot flushes from long-term androgen suppression (an off-label use), then says to consider cyproterone acetate 50 mg twice a day for 4 weeks if that is not effective or not tolerated, and to tell people there is no good-quality evidence for complementary therapies. CCO says men should be offered venlafaxine, medroxyprogesterone, cyproterone or gabapentin, and that acupuncture might be a suitable alternative.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults with hot flushes or night sweats caused by endocrine therapy for breast cancer (tamoxifen, aromatase inhibitors, ovarian suppression) or by androgen deprivation for prostate cancer. NICE writes for the NHS in England, CCO for Ontario, and ASCO, NAMS and ACP for the United States. NG23 and the ACP and NAMS statements are written for menopause in general; their use here is noted where it applies. Women with non-hormone-sensitive cancers who have an early menopause from treatment are a different group: CCO advises counselling them to consider hormone therapy until about 51.",
  trigger: "Starting endocrine therapy or androgen deprivation, and whenever troublesome hot flushes or night sweats are reported.",
  steps: [
    {
      action: "Offer women information and counselling about the possibility of early menopause and menopausal symptoms from breast cancer treatment",
      why: "NICE recommends this for women having breast cancer treatment; the same part of its guideline sets out what can and cannot be offered for the symptoms.",
      source: "nice-ng101",
      quote: "Offer women information and counselling about the possibility of early menopause and menopausal symptoms associated with breast cancer treatment.",
    },
    {
      action: "Do not routinely offer HRT after breast cancer; NICE allows it only in exceptional circumstances, for severe symptoms, after a discussion of the risks",
      why: "NICE states that HRT is contraindicated in women with a history of breast cancer and that using it there is off-label. CCO likewise calls hormone-sensitive breast cancer a contraindication to systemic hormone therapy.",
      source: "nice-ng101",
      quote: "Do not routinely offer HRT (including oestrogen/progestogen combination) to women with menopausal symptoms and a history of breast cancer.",
    },
    {
      action: "Consider menopause-specific cognitive behavioural therapy for hot flushes when HRT is contraindicated or not wanted",
      why: "NICE added this in 2024, for menopausal hot flushes in general. ASCO also names cognitive behavioural therapy for women and men with hot flushes after cancer, and NAMS grades it Level I.",
      source: "nice-ng23",
      quote: "Consider menopause-specific cognitive behavioural therapy (CBT) as an option for vasomotor symptoms associated with menopause: in addition to HRT or for people for whom HRT is contraindicated or for those who prefer not to take HRT.",
    },
    {
      action: "Where medicine is wanted, consider an SSRI, venlafaxine or gabapentin; for women taking tamoxifen, do not offer paroxetine or fluoxetine (CCO), and NICE says not to use SSRIs at all",
      why: "CCO lists paroxetine, venlafaxine, gabapentin and clonidine as alternatives to hormone therapy, and ASCO names venlafaxine and gabapentin. CCO says paroxetine and fluoxetine inhibit CYP2D6, which turns tamoxifen into its active forms. NICE NG101 says to consider SSRIs, but not for women taking tamoxifen, and does not name individual SSRIs. None of these sources gives a dose.",
      source: "cco-2017",
      quote: "Women with breast cancer taking tamoxifen should not be offered paroxetine or fluoxetine because those agents inhibit CYP2D6 activity, which transforms tamoxifen into its active metabolites.",
    },
    {
      action: "Discuss elinzanetant as an option tested in women on endocrine therapy (120 mg once a day in OASIS-4); where it is prescribed, the US label asks for liver blood tests before starting and three months after",
      why: "In a phase 3 trial it reduced moderate to severe hot flushes in women on endocrine therapy for breast cancer or its prevention. The EU authorisation includes hot flushes caused by adjuvant endocrine therapy; the US label read covers menopause only. The US label tells patients to stop the capsules and seek medical attention for signs that may suggest liver injury, such as new tiredness, loss of appetite, nausea, vomiting, itching, jaundice, pale stools, dark urine or abdominal pain. No guideline read recommends it specifically for people with cancer.",
      source: "oasis4-2025",
      quote: "Elinzanetant led to a significantly lower frequency of vasomotor symptoms associated with endocrine therapy than placebo.",
    },
    {
      action: "Treat fezolinetant as outside its UK marketing authorisation during treatment for breast cancer; after treatment, base any decision to use it on an individual risk assessment",
      why: "NICE says people having treatment for breast cancer or other oestrogen-dependent cancers are not included in fezolinetant's marketing authorisation, because there are no trial data on its safety or effectiveness in these groups, and that it could not make a recommendation for them.",
      source: "nice-ta1143",
      quote: "For people who have had breast cancer or other oestrogen-dependent cancers and are no longer having treatment, any decision to use fezolinetant should be based on an individual risk assessment.",
    },
    {
      action: "Do not offer soy (isoflavone), red clover, black cohosh, vitamin E or magnetic devices for hot flushes in women with breast cancer",
      why: "NICE says not to offer them to women with breast cancer. Its menopause guideline adds that the safety of isoflavone and black cohosh preparations is uncertain and that interactions with other medicines have been reported.",
      source: "nice-ng101",
      quote: "Do not offer soy (isoflavone), red clover, black cohosh, vitamin E or magnetic devices to treat vasomotor symptoms in women with breast cancer.",
    },
    {
      action: "For troublesome hot flushes caused by long-term androgen suppression, offer medroxyprogesterone 20 mg a day, initially for 10 weeks, and evaluate the effect at the end",
      why: "It is the medicine NICE says to offer first for hot flushes from prostate cancer hormone therapy. NICE notes that this is an off-label use of medroxyprogesterone.",
      source: "nice-ng131",
      quote: "Offer medroxyprogesterone (20 mg per day), initially for 10 weeks, to manage troublesome hot flushes caused by long-term androgen suppression. Evaluate the effect at the end of the treatment period.",
    },
    {
      action: "If medroxyprogesterone is not effective or not tolerated, consider cyproterone acetate 50 mg twice a day for 4 weeks; tell people there is no good-quality evidence for complementary therapies",
      why: "NICE names cyproterone as the next option, and asks teams to say plainly that there is no good-quality evidence for complementary therapies for these hot flushes.",
      source: "nice-ng131",
      quote: "Consider cyproterone acetate (50 mg twice a day for 4 weeks) to treat troublesome hot flushes if medroxyprogesterone is not effective or not tolerated.",
    },
  ],
  bestInClass: {
    statement: "For women on breast cancer endocrine therapy: information and counselling, no routine HRT (NICE NG101), CBT (NICE NG23 'consider'; NAMS Level I; ASCO 2018), then non-hormonal medicines: venlafaxine or gabapentin (CCO; ASCO) or an SSRI (NICE NG101; CCO), where NICE says no SSRI for women taking tamoxifen and CCO rules out paroxetine and fluoxetine with it. Elinzanetant is, in the 2026 review, the first neurokinin antagonist with phase 3 results in this population (OASIS-4), and its EU authorisation includes hot flushes caused by adjuvant endocrine therapy; fezolinetant is outside its UK marketing authorisation during treatment for oestrogen-dependent cancer. For men on androgen deprivation: medroxyprogesterone first, then cyproterone (NICE NG131), with venlafaxine and gabapentin as non-hormonal options (CCO; ASCO). The guidelines disagree on breathing and acupuncture: ASCO recommends slow breathing and CCO calls acupuncture a possible alternative for men, while NAMS does not recommend paced respiration or acupuncture and NICE tells people there is no good-quality evidence for complementary therapies.",
    sources: ["nice-ng101", "nice-ng23", "nice-ng131", "nice-ta1143", "cco-2017", "asco-2018", "nams-2023", "oasis4-2025", "nk-review-2026", "ema-lynkuet-2025", "lynkuet-label-2026"],
  },
  variants: [
    {
      name: "NAMS 2023 nonhormone therapy position statement (general menopause)",
      differs: "Grades options by level: recommends CBT, clinical hypnosis, SSRIs and SNRIs, gabapentin and fezolinetant (Level I), oxybutynin (Levels I to II), weight loss and stellate ganglion block (Levels II to III); does not recommend paced respiration, cooling, trigger avoidance, exercise, yoga, acupuncture, supplements, clonidine or pregabalin.",
      evidence: "Position statement from a literature review by an advisory panel; read as an abstract. It names oestrogen-dependent cancers as a reason a woman may not be a candidate for hormone therapy.",
      sources: ["nams-2023"],
    },
    {
      name: "ACP 2026 guideline (general menopause)",
      differs: "Puts oestrogen first, SNRIs (desvenlafaxine or venlafaxine) second for those who have contraindications to it or do not tolerate it, and SSRIs (escitalopram or paroxetine), gabapentin or the neurokinin antagonists elinzanetant or fezolinetant third.",
      evidence: "GRADE-based; oestrogen strong with high-certainty evidence; SNRIs conditional with moderate-certainty evidence; SSRIs and gabapentin conditional with low-certainty evidence; neurokinin antagonists conditional with moderate-certainty evidence. Not written for people with cancer. Read as an abstract.",
      sources: ["acp-2026"],
    },
    {
      name: "Acupuncture for men's hot flushes on androgen deprivation (CCO)",
      differs: "Uses acupuncture instead of medicine.",
      evidence: "CCO says acupuncture might be a suitable alternative, on eleven publications of low quality; NICE NG131 says there is no good-quality evidence for complementary therapies, and NAMS (for women) does not recommend acupuncture.",
      sources: ["cco-2017", "nice-ng131", "nams-2023"],
    },
    {
      name: "Hormone therapy until average menopause age after non-hormone-sensitive cancers (CCO)",
      differs: "For premenopausal women whose cancer is not hormone-sensitive and who develop hot flushes from treatment, counselling to consider hormone therapy until about 51 rather than non-hormonal options.",
      evidence: "CCO expert panel, resting mainly on high-quality guidelines for the general population; it states that hormone-sensitive breast cancer is a contraindication to systemic hormone therapy.",
      sources: ["cco-2017"],
    },
  ],
  grades: [
    { claim: "Elinzanetant reduced hot flush frequency at 12 weeks in OASIS-4", grade: "phase 3 randomised trial, P<0.001", source: "oasis4-2025", quote: "At week 12, the mean change was -7.8 episodes (95% CI, -8.5 to -7.1) among those receiving elinzanetant and -4.2 episodes (95% CI, -5.2 to -3.2) among those receiving placebo (least-squares mean difference, -3.4 episodes; 95% CI, -4.2 to -2.5; P<0.001)." },
    { claim: "Neurokinin antagonists as third-line treatment in general menopause", grade: "conditional recommendation; moderate-certainty evidence (ACP)", source: "acp-2026", quote: "or neurokinin receptor antagonists, either elinzanetant or fezolinetant (moderate-certainty evidence)." },
    { claim: "Medicines for men's hot flushes", grade: "eleven publications of low quality (CCO)", source: "cco-2017", quote: "The evidence base for these recommendations consists of eleven publications of low quality" },
    { claim: "NICE breast cancer recommendations on menopausal symptoms", grade: "NICE does not grade recommendations", source: "nice-ng101", quote: "Consider selective serotonin reuptake inhibitor (SSRI) antidepressants for women with breast cancer for relieving menopausal symptoms, particularly hot flushes, but not for those taking tamoxifen." },
  ],
  sources: [
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations 1.14.20 to 1.14.25", publisher: "NICE", year: 2025, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals the strength.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng23", label: "Menopause: identification and management (NG23), recommendations 1.4.7 and 1.5.2 to 1.5.4", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ng23/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals the strength.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ng131", label: "Prostate cancer: diagnosis and management (NG131), recommendations 1.4.3 to 1.4.5", publisher: "NICE", year: 2021, url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals the strength.", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-ta1143", label: "Fezolinetant for treating moderate to severe vasomotor symptoms associated with menopause (TA1143)", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ta1143", read: "full-text", accessed: "2026-11-17" },
    { key: "cco-2017", label: "Interventions to address sexual problems in people with cancer (Cancer Care Ontario guideline), vasomotor symptom recommendations", publisher: "Cancer Care Ontario, Current Oncology", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5486385/", doi: "10.3747/co.24.3583", gradingScheme: "Recommendations are not graded; each states the number and quality of the publications behind it.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2018", label: "Interventions to Address Sexual Problems in People With Cancer: ASCO Clinical Practice Guideline Adaptation of Cancer Care Ontario Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29227723", doi: "10.1200/JCO.2017.75.8995", read: "abstract", accessed: "2026-11-17" },
    { key: "nams-2023", label: "The 2023 nonhormone therapy position statement of The North American Menopause Society", publisher: "The North American Menopause Society, Menopause", year: 2023, url: "https://europepmc.org/abstract/MED/37252752", doi: "10.1097/GME.0000000000002200", gradingScheme: "Level I (good and consistent scientific evidence), Level II (limited or inconsistent), Level III (consensus and expert opinion).", read: "abstract", accessed: "2026-11-17" },
    { key: "acp-2026", label: "Pharmacologic Treatments for Females With Menopausal Vasomotor Symptoms: A Clinical Guideline From the American College of Physicians", publisher: "American College of Physicians, Annals of Internal Medicine", year: 2026, url: "https://europepmc.org/abstract/MED/42832802", doi: "10.7326/ANNALS-26-01205", gradingScheme: "GRADE: strong or conditional recommendation; high, moderate or low certainty of evidence.", read: "abstract", accessed: "2026-11-17" },
    { key: "oasis4-2025", label: "Elinzanetant for Vasomotor Symptoms from Endocrine Therapy for Breast Cancer (OASIS-4)", publisher: "New England Journal of Medicine", year: 2025, url: "https://europepmc.org/abstract/MED/40454634", doi: "10.1056/NEJMoa2415566", read: "abstract", accessed: "2026-11-17" },
    { key: "nk-review-2026", label: "Neurokinin pathway antagonists for vasomotor symptoms in women with breast cancer: focus on elinzanetant and fezolinetant", publisher: "The Breast", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13213637/", doi: "10.1016/j.breast.2026.104812", read: "full-text", accessed: "2026-11-17" },
    { key: "ema-lynkuet-2025", label: "Lynkuet (elinzanetant): EMA medicine overview (EU marketing authorisation issued 17 November 2025)", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/medicines/human/EPAR/lynkuet", read: "public-summary", accessed: "2026-11-17" },
    { key: "lynkuet-label-2026", label: "LYNKUET (elinzanetant) capsules, US prescribing information (DailyMed, version of 4 August 2026)", publisher: "Bayer HealthCare Pharmaceuticals, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f42884ff-7dff-419c-8a0c-affe2ed73818", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The regulatory status of elinzanetant for hot flushes caused by endocrine therapy differs by region in the sources read. On 17 November 2026 the EMA medicine page, which had refused a script on 11 November, was read: it lists Lynkuet for moderate to severe vasomotor symptoms associated with menopause or caused by adjuvant endocrine therapy for breast cancer. The US label read (version of 4 August 2026) is indicated for vasomotor symptoms due to menopause and does not mention breast cancer, although the 2026 review says both agencies registered it for symptoms including those induced by adjuvant endocrine therapy. The EU product information PDF was not read, so the EU monitoring requirements are not stated here, and no UK regulatory source for elinzanetant was read.",
    "Elinzanetant and fezolinetant have not been compared head to head with venlafaxine, gabapentin or CBT in people with cancer; NICE notes that fezolinetant has not been compared directly with non-hormonal treatments.",
    "Fezolinetant trials in women on endocrine therapy (HIGHLIGHT, FLASH-Breast and VENT) were listed as ongoing in the 2026 review.",
    "The NAMS 2023 statement and the ACP 2026 guideline were read only as abstracts, and both are written for menopause in general, not for people with cancer. OASIS-4 and the ASCO 2018 adaptation were also read only as abstracts. On 17 November 2026 a Europe PMC search found no later edition of the NAMS statement, the ASCO adaptation or the CCO guideline.",
    "No source read gives a dose of venlafaxine, gabapentin or an SSRI for hot flushes, so none is stated here.",
    "The SIO guideline on integrative therapies during and after breast cancer, endorsed by ASCO in 2018, was read only as an abstract, which does not mention hot flushes.",
    "NICE NG101 says SSRIs are not for women taking tamoxifen, while CCO rules out only paroxetine and fluoxetine. Which SSRIs or SNRIs are safest with tamoxifen, and the effect of neurokinin antagonists with CDK4/6 inhibitors, are raised in the 2026 review but not settled by a guideline read.",
    "NICE NG131's hot flush recommendations date from 2014; no later NICE review of non-hormonal options for men was found.",
  ],
  institutions: ["nice", "asco", "ontario-health-cancer-care-ontario"],
  technologies: ["endocrine-therapy", "androgen-deprivation", "menopause-after-cancer-treatment", "acupuncture-hot-flushes", "hypnosis-cancer-care"],
  drugs: ["elinzanetant", "tamoxifen", "letrozole", "anastrozole", "exemestane", "goserelin", "leuprolide", "megestrol-progestins", "venlafaxine", "gabapentin", "cyproterone"],
  cancers: ["breast-hr-positive", "prostate"],
  terms: ["hot-flushes-on-hormone-therapy", "aromatase-inhibitor", "adt", "menopause-after-chemotherapy-breast"],
  sections: ["supportive-care"],
  related: ["bone-health-on-hormone-therapy", "sexual-health-assessment-and-interventions", "black-cohosh"],
  tags: ["protocol", "symptom-management", "hot-flushes"],
});
