import { protocol } from "./helpers";

/*
 * Cancer-related fatigue: screening, looking for treatable causes, and management by phase of illness (during
 * treatment, after treatment, advanced cancer or end of life), with exercise and psychological treatments first.
 *
 * What was read, and how (first on 11 November 2026; re-read on 17 November 2026 in a second accuracy pass, every
 * source fetched again as raw text and every quote checked by script against it):
 * - ASCO-SIO guideline update on fatigue in adult survivors of cancer (Bower et al., J Clin Oncol 2024): full text of
 *   the author manuscript in PubMed Central (PMC12082589), fetched as XML through the NCBI E-utilities service (the
 *   Europe PMC full-text endpoint returned an error), including Tables 3, 4 and 5 with every recommendation, its
 *   evidence quality and its strength.
 * - ASCO 2014 guideline adaptation on screening, assessment and management of fatigue (Bower et al., J Clin Oncol
 *   2014): abstract only. PubMed Central holds the record (PMC4039870) but serves no body text through E-utilities or
 *   Europe PMC. The 2024 update says its screening and assessment recommendations are still relevant.
 * - APTA Academy of Oncologic Physical Therapy guideline on screening and assessment of cancer-related fatigue (Fisher
 *   et al., Phys Ther 2022): full text XML from Europe PMC (PMC9525018). Its 2024 correction (10.1093/ptj/pzae126) was
 *   read too and only corrects an author's name.
 * - ESMO Clinical Practice Guideline on cancer-related fatigue (Fabi et al., Ann Oncol 2020): still not reachable.
 *   Europe PMC holds no abstract and the publisher returned 403 to a script.
 * - MASCC endorsement of the ASCO-SIO guideline (Support Care Cancer 2026): Europe PMC holds the title only and the
 *   publisher answered with a browser check; not read.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked; neither lists a newer edition of any
 * of them. Quotes are copied from the raw text unchanged.
 * Changed on 17 November 2026: tai chi or qigong during treatment is a strong recommendation, not a "may"; the trial
 * evidence is not mostly from breast cancer (about 36% of studies were breast cancer only); thyroid problems are named
 * by the source only as an immunotherapy side effect; the APTA grade letters P and R were described wrongly; several
 * reasons the sources do not give were reworded to what they say.
 */
export const cancerRelatedFatigueScreeningAndManagement = protocol({
  id: "cancer-related-fatigue-screening-and-management",
  name: "Cancer-related fatigue: screening, treatable causes and management",
  aka: ["cancer-related fatigue", "CRF management", "fatigue during chemotherapy", "tiredness after cancer treatment", "exercise for cancer fatigue", "CBT for cancer fatigue"],
  domain: "symptom-management",
  tldr: "Tiredness that rest does not fix is one of the commonest effects of cancer and its treatment, and can last months or years. Your team should ask about it and look for treatable causes such as anaemia, pain, poor sleep, low mood or a medicine. What helps most is exercise suited to you, cognitive behavioural therapy and mindfulness. Modafinil is not recommended, nor methylphenidate routinely.",
  simple: "Feeling very tired is common with cancer. Tell your team. Exercise that suits you and talking therapies help most.",
  summary: "The ASCO-SIO guideline update (2024) covers adults from diagnosis onward and sorts recommendations by phase. During treatment, clinicians should recommend exercise (aerobic, resistance or both), CBT, mindfulness-based programmes and tai chi or qigong (each moderate evidence, strong recommendation); psychoeducation and American ginseng 2,000 mg daily may be recommended (conditional). After treatment, exercise, CBT and mindfulness-based programmes are strong recommendations, and yoga, acupressure and moxibustion conditional. In advanced cancer or at the end of life, CBT and corticosteroids may be offered (low evidence, conditional). In every phase, wakefulness agents (modafinil, armodafinil) should not be recommended, and psychostimulants (methylphenidate) should not be used routinely; during treatment, L-carnitine and antidepressants such as paroxetine are also recommended against.\n\nScreening and assessment were not re-examined in 2024; the panel referred readers to the 2014 ASCO adaptation, which recommends that everyone be evaluated for fatigue after primary treatment and that those with moderate to severe fatigue have a comprehensive assessment with medical and treatable contributing factors addressed. The APTA guideline (2022) says fatigue should be screened at each encounter and grades the tools: the EORTC QLQ-C30 is the only screening tool graded A, and the Piper Fatigue Scale-Revised, FACIT-Fatigue and PROMIS Fatigue short forms are graded A for fuller assessment. The ESMO 2020 guideline could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "community", "home"],
  },
  population: "Adults with cancer from diagnosis onward, during and after treatment and in advanced disease (ASCO-SIO 2024). The sources read cover adults only. The 2024 recommendations were built from 113 randomised trials, many in mixed cancer types; about 36% of the studies were in breast cancer only, and the trials did not include people on immunotherapy.",
  trigger: "At each visit with a health professional (APTA 2022, following NCCN) and after primary treatment ends (ASCO 2014).",
  steps: [
    {
      action: "Ask everyone about fatigue after primary treatment ends, and give information and strategies for managing it",
      why: "Patients, carers and even staff often wrongly take fatigue to be an unavoidable part of cancer and its treatment (ASCO-SIO 2024). The APTA guideline goes further than the 2014 one and says fatigue should be screened at each encounter.",
      source: "asco-2014",
      quote: "It is recommended that all patients with cancer be evaluated for the presence of fatigue after completion of primary treatment and be offered specific information and strategies for fatigue management.",
    },
    {
      action: "Screen with a validated tool: the EORTC QLQ-C30 (graded A) or the MD Anderson Symptom Inventory (graded B); refer a positive screen for a fuller assessment",
      why: "Both are general symptom questionnaires; a positive answer to their fatigue questions prompts a fuller assessment, because neither covers fatigue in depth.",
      source: "apta-2022",
      quote: "Only 1 screening tool rises to the level of grade A evidence for screening CRF. The EORTC-QLQ-C30 is a general symptom inventory that can be used to screen for fatigue and other problems those with cancer may have. The MDASI, also a general symptom inventory in which the individual with cancer assesses their present symptom burden, is graded B.",
      grade: "A (EORTC QLQ-C30); B (MDASI)",
    },
    {
      action: "Look for and treat the conditions that contribute to fatigue: pain, low mood, anxiety, poor sleep, poor nutrition, inactivity, anaemia and side effects of medicines",
      why: "These problems can set fatigue off, come with it and keep it going, and the guideline calls dealing with them critical. The 2014 guideline asks for a comprehensive assessment when fatigue is moderate to severe.",
      source: "asco-sio-2024",
      quote: "patients experiencing fatigue should also be evaluated and treated for contributing comorbid conditions that commonly cluster with fatigue, including pain, depression, anxiety, and sleep disturbance, as well as nutritional deficit, activity level, anemia, medication adverse effects.",
    },
    {
      action: "On immune checkpoint inhibitors, when fatigue is new or worse, check for other immune side effects (thyroid, adrenal and pituitary problems among them) before treating it as cancer-related fatigue",
      why: "Fatigue can be a symptom of another immunotherapy side effect. ASCO-SIO reports that the Society for Immunotherapy of Cancer asks for a blood count, a metabolic panel, thyroid tests, morning cortisol and ACTH; if other organ problems are ruled out, the fatigue is managed like other cancer-related fatigue.",
      source: "asco-sio-2024",
      quote: "Fatigue can also be a symptom of other forms of immunotherapy toxicity, including adrenal insufficiency, hypothyroidism, hypophysitis, hepatitis, renal insufficiency, pneumonitis, neurologic toxicities, and anemia.",
    },
    {
      action: "Recommend exercise (aerobic, resistance or both), tailored to the person and supervised or not, during and after treatment",
      why: "The panel found compelling evidence that a variety of exercise programmes reduce fatigue during and after treatment. It found no single best type, dose, intensity or duration.",
      source: "asco-sio-2024",
      quote: "1.1. Clinicians should recommend exercise (aerobic, resistance, or a combination) to reduce the severity of fatigue during cancer treatment. Exercise should be tailored according to the individual patient’s abilities and may be either supervised or unsupervised Moderate Strong",
      grade: "Evidence quality moderate; recommendation strong",
    },
    {
      action: "Recommend cognitive behavioural therapy and mindfulness-based programmes, during and after treatment; after treatment either may be given in person or online",
      why: "Both improved fatigue in randomised trials during and after treatment, and after treatment they have shown efficacy for moderate to severe fatigue.",
      source: "asco-sio-2024",
      quote: "2.2. Clinicians should recommend cognitive behavioral therapy (CBT) to manage symptoms of cancer-related fatigue in adults who have completed cancer treatment. CBT may be delivered in person or via a web-based program Moderate Strong",
      grade: "Evidence quality moderate; recommendation strong",
    },
    {
      action: "During treatment, also recommend tai chi or qigong at low to moderate intensity",
      why: "These movement practices reduced fatigue in four of five trials in people on treatment. After treatment the panel found the evidence insufficient to recommend for or against them.",
      source: "asco-sio-2024",
      quote: "1.4. Clinicians should recommend tai chi or qigong, practiced at a low to moderate intensity, to reduce the severity of cancer-related fatigue in adults undergoing cancer treatment Moderate Strong",
      grade: "Evidence quality moderate; recommendation strong",
    },
    {
      action: "Do not recommend modafinil or armodafinil for fatigue, and do not routinely recommend methylphenidate",
      why: "In the trials reviewed these drugs did not reduce fatigue more than placebo, and their long-term safety in people with cancer is unclear.",
      source: "asco-sio-2024",
      quote: "1.7. Clinicians should not recommend wakefulness agents, such as modafinil or armodafinil, to manage symptoms of cancer-related fatigue in adults undergoing cancer treatment Moderate Strong",
      grade: "Evidence quality moderate; recommendation strong (against), for wakefulness agents during treatment. After treatment and in advanced cancer it is moderate; conditional (against), as it is for psychostimulants in every phase",
    },
    {
      action: "In advanced cancer consider CBT, and at the end of life consider corticosteroids where there is no contraindication, reviewing the balance of benefit and harm over time",
      why: "In a trial in advanced cancer a steroid improved fatigue more than placebo, and short-term use was considered safe in earlier studies. The guideline asks that risk and benefit be reassessed over time.",
      source: "asco-sio-2024",
      quote: "3.2. Clinicians may recommend corticosteroids to manage symptoms of cancer-related fatigue in patients at the end of life where no contraindications exist. The risk-benefit ratio of corticosteroid use should be assessed over time Low Conditional",
      grade: "Evidence quality low; recommendation conditional",
    },
  ],
  bestInClass: {
    statement: "ASCO-SIO 2024 is the most recent graded guideline read, and MASCC endorsed it in 2026 (endorsement not read). It puts exercise, CBT and mindfulness-based programmes first in every phase before and after the end of treatment (moderate evidence, strong recommendation), adds tai chi or qigong during treatment, and recommends against wakefulness agents and routine psychostimulants. For screening and choosing a tool, the 2014 ASCO adaptation (screen everyone; assess and correct causes in moderate to severe fatigue) and the APTA 2022 tool grades are the sources read. Where these differ from ESMO 2020 cannot be said, because the ESMO guideline could not be read.",
    sources: ["asco-sio-2024", "asco-2014", "apta-2022", "esmo-2020", "mascc-2026"],
  },
  variants: [
    {
      name: "American ginseng during treatment",
      differs: "Adds a supplement, Panax quinquefolius 2,000 mg a day, for fatigue during treatment.",
      evidence: "ASCO-SIO 2024 grades the evidence low and the recommendation conditional; after treatment it found the evidence on ginseng insufficient to recommend for or against. It says there is no conclusive evidence on the best schedule and that twice-daily dosing, preferably in the morning and before noon to avoid disturbing sleep, may be considered. It notes reports of possible drug interactions and a case report of possible liver toxicity, and advises avoiding methanol-extracted ginseng in hormone receptor-positive cancers out of caution.",
      sources: ["asco-sio-2024"],
    },
    {
      name: "Yoga, acupressure or moxibustion after treatment",
      differs: "Mind-body or traditional Chinese medicine approaches offered after treatment instead of or alongside exercise and CBT.",
      evidence: "Each conditional on low-quality evidence in ASCO-SIO 2024 after treatment (yoga especially in women with breast cancer). During treatment, the panel found the evidence on yoga and acupressure insufficient.",
      sources: ["asco-sio-2024"],
    },
  ],
  grades: [
    { claim: "Mindfulness-based programmes reduce fatigue after treatment", grade: "Moderate; Strong", source: "asco-sio-2024", quote: "2.3. Clinicians should recommend mindfulness-based programs to reduce the severity of fatigue in adults who have completed cancer treatment." },
    { claim: "Psychostimulants are not recommended routinely during treatment", grade: "Moderate; Conditional (against)", source: "asco-sio-2024", quote: "1.9. Clinicians should not routinely recommend psychostimulants, such as methylphenidate, to manage symptoms of cancer-related fatigue in adults undergoing cancer treatment Moderate Conditional" },
    { claim: "Antidepressants are not recommended for fatigue during treatment", grade: "Moderate; Conditional (against)", source: "asco-sio-2024", quote: "1.10. Clinicians should not recommend antidepressants, such as paroxetine, to manage symptoms of cancer-related fatigue in adults undergoing cancer treatment Moderate Conditional" },
    { claim: "Exercise in advanced cancer or at the end of life", grade: "Insufficient; no recommendation", source: "asco-sio-2024", quote: "There is insufficient evidence to make recommendations for or against collaborative care intervention, exercise, melatonin, or protocolized patient-tailored treatment to manage symptoms of cancer-related fatigue among adults with advanced cancer or at the end of life" },
    { claim: "Multidimensional assessment tools", grade: "A", source: "apta-2022", quote: "Grade A scales of the PFS-R, the FACIT–Fatigue, and the PROMIS Fatigue–Short Forms." },
  ],
  sources: [
    { key: "asco-sio-2024", label: "Management of Fatigue in Adult Survivors of Cancer: ASCO-Society for Integrative Oncology Guideline Update", publisher: "ASCO and SIO, Journal of Clinical Oncology", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12082589/", doi: "10.1200/JCO.24.00541", gradingScheme: "Evidence quality high, moderate, low, very low or insufficient; strength of recommendation strong or conditional (weak), for or against.", read: "full-text", accessed: "2026-11-17" },
    { key: "asco-2014", label: "Screening, Assessment, and Management of Fatigue in Adult Survivors of Cancer: an ASCO Clinical Practice Guideline Adaptation", publisher: "ASCO, Journal of Clinical Oncology", year: 2014, url: "https://europepmc.org/abstract/MED/24733803", doi: "10.1200/JCO.2013.53.4495", read: "abstract", accessed: "2026-11-17" },
    { key: "apta-2022", label: "Screening and Assessment of Cancer-Related Fatigue: A Clinical Practice Guideline for Health Care Providers", publisher: "Academy of Oncologic Physical Therapy of APTA, Physical Therapy", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9525018/", doi: "10.1093/ptj/pzac120", gradingScheme: "Tools graded A (strong obligation, should be used), B (moderate obligation, may be used), C (weak obligation, may be used), P (best practice, may be used) or R (research, unable to recommend).", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-2020", label: "Cancer-related fatigue: ESMO Clinical Practice Guidelines for diagnosis and treatment", publisher: "ESMO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.02.016", doi: "10.1016/j.annonc.2020.02.016", read: "not-reachable", accessed: "2026-11-17" },
    { key: "mascc-2026", label: "MASCC endorsement and global perspectives on implementation of the ASCO-SIO fatigue in adult cancer survivors guideline", publisher: "MASCC, Supportive Care in Cancer", year: 2026, url: "https://doi.org/10.1007/s00520-026-10855-z", doi: "10.1007/s00520-026-10855-z", read: "not-reachable", accessed: "2026-11-17" },
  ],
  gaps: [
    "The ESMO 2020 cancer-related fatigue guideline could not be read (no abstract in Europe PMC; the publisher refused a script, again on 17 November 2026), so where ESMO differs from ASCO-SIO is not shown.",
    "The 2014 ASCO adaptation was read only as an abstract (PubMed Central still serves no body text on 17 November 2026): its screening intervals, the 0 to 10 cut-offs it uses for moderate and severe fatigue, and its list of laboratory tests are not given here.",
    "The MASCC 2026 endorsement was not read; Europe PMC holds only its title and the publisher answered a script with a browser check.",
    "NCCN's cancer-related fatigue guideline was not read. The APTA guideline reports that NCCN recommends screening at every visit; the 2014 ASCO abstract speaks only of evaluation after primary treatment.",
    "About 36% of the 113 trials behind the 2024 guideline were in breast cancer only, and none included people on immunotherapy; the guideline gives the checkpoint inhibitor advice as a report of another society's recommendation, not as a graded recommendation of its own.",
    "None of the sources read covers children or adolescents, and no paediatric guideline was read.",
  ],
  institutions: ["asco", "mascc", "esmo"],
  technologies: ["cancer-related-fatigue-management", "exercise-oncology", "exercise-during-chemotherapy", "cbt-fatigue-distress", "mindfulness-based-interventions", "tai-chi-qigong", "american-ginseng-fatigue", "yoga-cancer"],
  terms: ["cancer-related-fatigue"],
  related: ["exercise-during-and-after-cancer-treatment", "dexamethasone"],
  sections: ["supportive-care"],
  tags: ["protocol", "fatigue", "supportive-care", "survivorship"],
});
