import { protocol } from "./helpers";

/*
 * Hot flushes and night sweats caused by endocrine therapy for breast cancer and by androgen deprivation for prostate
 * cancer: what to offer when hormone replacement is ruled out or unwanted, and where the guidelines disagree.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl, the DailyMed API or the Europe PMC REST API
 * into a scratch directory and read as text):
 * - NICE NG101, Early and locally advanced breast cancer (last updated 14 April 2025): recommendations page, raw HTML.
 * - NICE NG131, Prostate cancer (last updated 15 December 2021): recommendations page, raw HTML.
 * - NICE NG23, Menopause (last updated 15 April 2026): recommendations page, raw HTML.
 * - NICE TA1143, Fezolinetant (2026): recommendations and committee discussion pages, raw HTML.
 * - Cancer Care Ontario guideline on sexual problems in people with cancer (Curr Oncol 2017), which includes
 *   vasomotor symptoms: full text from the PubMed Central article page.
 * - ASCO adaptation of the CCO guideline (J Clin Oncol 2018): abstract.
 * - The North American Menopause Society 2023 nonhormone therapy position statement (Menopause 2023): abstract only;
 *   the full statement was not read.
 * - American College of Physicians guideline on drugs for menopausal vasomotor symptoms (Ann Intern Med 2026):
 *   abstract only.
 * - OASIS-4 trial of elinzanetant (N Engl J Med 2025): abstract.
 * - Review of neurokinin antagonists in breast cancer (Breast 2026): full text from PubMed Central (PMC13213637).
 * - LYNKUET (elinzanetant) US prescribing information, DailyMed version published 4 August 2026: full label text.
 * The EMA product page for elinzanetant refused a script (HTTP 429) and was not read.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const hotFlushesOnEndocrineTherapyNonHormonalOptions = protocol({
  id: "hot-flushes-on-endocrine-therapy-non-hormonal-options",
  name: "Hot flushes on breast cancer endocrine therapy and prostate cancer hormone therapy: non-hormonal options",
  aka: ["hot flashes on tamoxifen", "hot flushes on aromatase inhibitors", "vasomotor symptoms on endocrine therapy", "hot flushes on androgen deprivation therapy", "night sweats on hormone therapy", "elinzanetant for hot flushes", "fezolinetant after breast cancer"],
  domain: "symptom-management",
  tldr: "Hormone treatments for breast and prostate cancer often cause hot flushes, sometimes for years. After breast cancer, hormone replacement therapy is usually ruled out. Options include cognitive behavioural therapy, hypnosis, venlafaxine, some SSRIs (not with tamoxifen), gabapentin and, in a large trial, elinzanetant. For men, NICE suggests medroxyprogesterone first. Herbal remedies are not advised.",
  simple: "Hormone treatment for cancer can cause hot flushes. Talking therapy and some medicines help. Ask your team before taking herbal remedies.",
  summary: "Breast cancer. NICE NG101 asks teams to tell women about early menopause and menopausal symptoms, not to offer HRT routinely after breast cancer (it is contraindicated and off-label; in exceptional circumstances, after discussion of the risks, for severe symptoms), to consider SSRIs for hot flushes but not with tamoxifen, and not to offer soy, red clover, black cohosh, vitamin E or magnetic devices. NICE NG23 (2024) adds menopause-specific cognitive behavioural therapy for vasomotor symptoms where HRT is contraindicated or not wanted. CCO (2016) lists paroxetine, venlafaxine, gabapentin and clonidine as alternatives to hormone therapy and warns against paroxetine and fluoxetine with tamoxifen because they inhibit CYP2D6; ASCO (2018) recommends cognitive behavioural therapy, slow breathing, hypnosis, venlafaxine and gabapentin for women and men. NAMS (2023) grades CBT, clinical hypnosis, SSRIs and SNRIs, gabapentin and fezolinetant as Level I, oxybutynin Levels I to II, and does not recommend paced respiration, cooling techniques, acupuncture, supplements or clonidine.\n\nThe neurokinin antagonists. In OASIS-4 (474 women on endocrine therapy for HR-positive breast cancer or its prevention), elinzanetant 120 mg reduced moderate to severe hot flushes by 3.4 more episodes a day than placebo at 12 weeks. The US label (August 2026) is for vasomotor symptoms due to menopause, requires liver tests before starting and at three months, and restricts use with CYP3A4 inhibitors and inducers. Fezolinetant is recommended by NICE (TA1143, 2026) when HRT is unsuitable, but people having treatment for breast cancer or other oestrogen-dependent cancers are outside its marketing authorisation, and after treatment its use should rest on an individual risk assessment. ACP (2026, general menopause) places the neurokinin antagonists third line.\n\nProstate cancer. NICE NG131 offers medroxyprogesterone 20 mg a day for 10 weeks for troublesome hot flushes from long-term androgen suppression, then cyproterone acetate if that fails, and tells men there is no good-quality evidence for complementary therapies. CCO lists venlafaxine, medroxyprogesterone, cyproterone or gabapentin, and says acupuncture might be a suitable alternative.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "Adults with hot flushes or night sweats caused by endocrine therapy for breast cancer (tamoxifen, aromatase inhibitors, ovarian suppression) or by androgen deprivation for prostate cancer. NG23 and the ACP and NAMS statements are written for menopause in general; their use here is noted where it applies. Women with non-hormone-sensitive cancers who have an early menopause from treatment are a different group: CCO advises considering hormone therapy until about 51.",
  trigger: "Starting endocrine therapy or androgen deprivation, and whenever troublesome hot flushes or night sweats are reported.",
  steps: [
    {
      action: "Before and during treatment, tell women about the possibility of early menopause and menopausal symptoms",
      why: "Knowing what to expect, and that help exists, makes it easier to cope and to stay on treatment.",
      source: "nice-ng101",
      quote: "Offer women information and counselling about the possibility of early menopause and menopausal symptoms associated with breast cancer treatment.",
    },
    {
      action: "Do not routinely offer HRT after breast cancer; consider it only in exceptional circumstances for severe symptoms, after discussing the risks",
      why: "Hormone replacement could feed a hormone-sensitive cancer; it is contraindicated after breast cancer.",
      source: "nice-ng101",
      quote: "Do not routinely offer HRT (including oestrogen/progestogen combination) to women with menopausal symptoms and a history of breast cancer.",
    },
    {
      action: "Offer menopause-specific cognitive behavioural therapy for hot flushes when HRT is ruled out or not wanted",
      why: "These have good evidence, no drug interactions and no effect on the cancer treatment.",
      source: "nice-ng23",
      quote: "Consider menopause-specific cognitive behavioural therapy (CBT) as an option for vasomotor symptoms associated with menopause: in addition to HRT or for people for whom HRT is contraindicated or for those who prefer not to take HRT.",
    },
    {
      action: "Where medicine is wanted, consider venlafaxine, an SSRI or gabapentin; with tamoxifen, avoid paroxetine and fluoxetine",
      why: "These reduce hot flushes; paroxetine and fluoxetine can block the enzyme that turns tamoxifen into its active form.",
      source: "cco-2017",
      quote: "Women with breast cancer taking tamoxifen should not be offered paroxetine or fluoxetine because those agents inhibit CYP2D6 activity, which transforms tamoxifen into its active metabolites.",
    },
    {
      action: "Consider elinzanetant for moderate to severe hot flushes on endocrine therapy, with liver blood tests before starting and three months after",
      why: "In a large trial it cut hot flushes in women on endocrine therapy; the label asks for liver monitoring.",
      source: "oasis4-2025",
      quote: "Elinzanetant led to a significantly lower frequency of vasomotor symptoms associated with endocrine therapy than placebo.",
    },
    {
      action: "Do not use fezolinetant during breast cancer treatment; after treatment, decide on an individual risk assessment",
      why: "People having treatment for oestrogen-dependent cancers are outside the drug's licence in the UK.",
      source: "nice-ta1143",
      quote: "For people who have had breast cancer or other oestrogen-dependent cancers and are no longer having treatment, any decision to use fezolinetant should be based on an individual risk assessment.",
    },
    {
      action: "Advise against soy, red clover, black cohosh, vitamin E and magnetic devices for hot flushes after breast cancer",
      why: "They have not been shown to work, and some may interact with cancer treatment.",
      source: "nice-ng101",
      quote: "Do not offer soy (isoflavone), red clover, black cohosh, vitamin E or magnetic devices to treat vasomotor symptoms in women with breast cancer.",
    },
    {
      action: "For men with troublesome hot flushes on long-term androgen deprivation, offer medroxyprogesterone 20 mg a day for 10 weeks and review",
      why: "It is the first-line medicine NICE recommends for hot flushes from prostate cancer hormone therapy.",
      source: "nice-ng131",
      quote: "Offer medroxyprogesterone (20 mg per day), initially for 10 weeks, to manage troublesome hot flushes caused by long-term androgen suppression. Evaluate the effect at the end of the treatment period.",
    },
    {
      action: "If that fails or is not tolerated, consider cyproterone acetate; tell men there is no good-quality evidence for complementary therapies",
      why: "A second hormonal option exists; complementary treatments have not been shown to help.",
      source: "nice-ng131",
      quote: "Consider cyproterone acetate (50 mg twice a day for 4 weeks) to treat troublesome hot flushes if medroxyprogesterone is not effective or not tolerated.",
    },
  ],
  bestInClass: {
    statement: "For women on breast cancer endocrine therapy: information, no routine HRT, CBT (NICE NG23; NAMS Level I; ASCO 2018), then non-hormonal medicines such as venlafaxine, gabapentin or an SSRI that does not interact with tamoxifen (NICE NG101; CCO; ASCO), and now elinzanetant, the only neurokinin antagonist with a phase 3 trial in this population (OASIS-4); fezolinetant is outside its UK licence during treatment for oestrogen-dependent cancer. For men on androgen deprivation: medroxyprogesterone first, then cyproterone (NICE NG131), with venlafaxine and gabapentin as non-hormonal alternatives (CCO; ASCO). The guidelines disagree on breathing and acupuncture: ASCO recommends slow breathing and CCO calls acupuncture a possible alternative for men, while NAMS does not recommend paced respiration or acupuncture and NICE tells men there is no good-quality evidence for complementary therapies.",
    sources: ["nice-ng101", "nice-ng23", "nice-ng131", "nice-ta1143", "cco-2017", "asco-2018", "nams-2023", "oasis4-2025", "lynkuet-label-2026"],
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
      differs: "Puts oestrogen first for women without contraindications, SNRIs (desvenlafaxine or venlafaxine) second, and SSRIs, gabapentin or the neurokinin antagonists elinzanetant or fezolinetant third.",
      evidence: "GRADE-based; SNRIs conditional with moderate-certainty evidence; neurokinin antagonists conditional with moderate-certainty evidence. Not written for people with cancer. Read as an abstract.",
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
      differs: "For premenopausal women whose cancer is not hormone-sensitive and who develop hot flushes from treatment, hormone therapy until about 51 rather than non-hormonal options.",
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
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations 1.14.20 to 1.14.25", publisher: "NICE", year: 2025, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals the strength.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ng23", label: "Menopause: identification and management (NG23), recommendation 1.5.2", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ng23/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals the strength.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ng131", label: "Prostate cancer: diagnosis and management (NG131), recommendations 1.4.3 to 1.4.5", publisher: "NICE", year: 2021, url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'consider', 'do not offer') signals the strength.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-ta1143", label: "Fezolinetant for treating moderate to severe vasomotor symptoms associated with menopause (TA1143)", publisher: "NICE", year: 2026, url: "https://www.nice.org.uk/guidance/ta1143", read: "full-text", accessed: "2026-11-11" },
    { key: "cco-2017", label: "Interventions to address sexual problems in people with cancer (Cancer Care Ontario guideline), vasomotor symptom recommendations", publisher: "Cancer Care Ontario, Current Oncology", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5486385/", doi: "10.3747/co.24.3583", gradingScheme: "Recommendations are not graded; each states the number and quality of the publications behind it.", read: "full-text", accessed: "2026-11-11" },
    { key: "asco-2018", label: "Interventions to Address Sexual Problems in People With Cancer: ASCO Clinical Practice Guideline Adaptation of Cancer Care Ontario Guideline", publisher: "ASCO, Journal of Clinical Oncology", year: 2018, url: "https://europepmc.org/abstract/MED/29227723", doi: "10.1200/JCO.2017.75.8995", read: "abstract", accessed: "2026-11-11" },
    { key: "nams-2023", label: "The 2023 nonhormone therapy position statement of The North American Menopause Society", publisher: "The North American Menopause Society, Menopause", year: 2023, url: "https://europepmc.org/abstract/MED/37252752", doi: "10.1097/GME.0000000000002200", gradingScheme: "Level I (good and consistent scientific evidence), Level II (limited or inconsistent), Level III (consensus and expert opinion).", read: "abstract", accessed: "2026-11-11" },
    { key: "acp-2026", label: "Pharmacologic Treatments for Females With Menopausal Vasomotor Symptoms: A Clinical Guideline From the American College of Physicians", publisher: "American College of Physicians, Annals of Internal Medicine", year: 2026, url: "https://europepmc.org/abstract/MED/42832802", doi: "10.7326/ANNALS-26-01205", gradingScheme: "GRADE: strong or conditional recommendation; high, moderate or low certainty of evidence.", read: "abstract", accessed: "2026-11-11" },
    { key: "oasis4-2025", label: "Elinzanetant for Vasomotor Symptoms from Endocrine Therapy for Breast Cancer (OASIS-4)", publisher: "New England Journal of Medicine", year: 2025, url: "https://europepmc.org/abstract/MED/40454634", doi: "10.1056/NEJMoa2415566", read: "abstract", accessed: "2026-11-11" },
    { key: "nk-review-2026", label: "Neurokinin pathway antagonists for vasomotor symptoms in women with breast cancer: focus on elinzanetant and fezolinetant", publisher: "The Breast", year: 2026, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13213637/", doi: "10.1016/j.breast.2026.104812", read: "full-text", accessed: "2026-11-11" },
    { key: "lynkuet-label-2026", label: "LYNKUET (elinzanetant) capsules, US prescribing information (DailyMed, version of 4 August 2026)", publisher: "Bayer HealthCare Pharmaceuticals, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f42884ff-7dff-419c-8a0c-affe2ed73818", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The regulatory status of elinzanetant specifically for hot flushes caused by endocrine therapy is not settled by the sources read: the US label read (August 2026) is indicated for vasomotor symptoms due to menopause and does not mention breast cancer, while a 2026 review lists its status in breast cancer as approved without saying by which agency or for which wording. The EMA product page refused a script.",
    "Elinzanetant and fezolinetant have not been compared head to head with venlafaxine, gabapentin or CBT in people with cancer; NICE notes that fezolinetant has not been compared directly with non-hormonal treatments.",
    "Fezolinetant trials in women on endocrine therapy (HIGHLIGHT, FLASH-Breast and VENT, listed in the 2026 review) had not reported.",
    "The NAMS 2023 statement and the ACP 2026 guideline were read only as abstracts, and both are written for menopause in general, not for people with cancer.",
    "The SIO guideline on integrative therapies during and after breast cancer, endorsed by ASCO in 2018, was read only as an abstract, which does not mention hot flushes.",
    "Which SSRIs or SNRIs are safest with tamoxifen beyond paroxetine and fluoxetine, and the effect of neurokinin antagonists with CDK4/6 inhibitors, are raised in the 2026 review but not settled by a guideline read.",
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
