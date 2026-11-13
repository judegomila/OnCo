import { protocol } from "./helpers";

/*
 * Lymphoedema after breast cancer: who is at highest risk, prospective surveillance with a baseline measurement, early
 * compression for subclinical swelling, exercise, decongestive therapy for established lymphoedema, preventive options,
 * and what the evidence now says about the traditional arm precautions (no blood pressure cuff, no blood tests, no
 * injections in the at-risk arm).
 *
 * This record joins two fill rounds written in parallel on 11 November 2026: one on risk reduction and early
 * surveillance after node surgery (formerly lymphoedema-risk-reduction-after-node-surgery) and one on surveillance and
 * treatment. Every step, source, variant and gap from both is kept; where two steps said the same thing from different
 * sources, one is a step and the other's quote is kept under grades.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - MASCC clinical practice guidance for the prevention of breast cancer-related arm lymphoedema (Wong et al.,
 *   eClinicalMedicine 2024): full text, Europe PMC XML (PMC10850412). Delphi consensus statements with the percentage
 *   agreement printed after each.
 * - APTA Academy of Oncologic Physical Therapy guideline on interventions for breast cancer-related lymphoedema
 *   (Davies et al., Phys Ther 2020): full text from Europe PMC (PMC7412854), including Table 1 of graded
 *   recommendations.
 * - APTA Oncology Section guideline on diagnosis of upper quadrant lymphoedema (Levenhagen et al., Phys Ther 2017):
 *   full text from Europe PMC (PMC5803775). The authors published an update on bioimpedance in 2018 (Phys Ther,
 *   10.1093/ptj/pzy096); Europe PMC holds only its title, so it was not read.
 * - PREVENT randomised trial, bioimpedance spectroscopy against tape measure (Ridner et al., Lymphat Res Biol 2022):
 *   abstract from Europe PMC; and its secondary analysis on timing (Ann Surg Oncol 2024): abstract.
 * - Evidence map on patient precautions (Med Oncol 2024, prepared for the 2023 ACS/LANA Lymphedema Summit): full text
 *   from Europe PMC (PMC11486782).
 * - ACS/LANA Summit expert consensus on risk reduction practices (Med Oncol 2024): abstract only; no full text open.
 * - Ferguson et al., blood draws, injections, blood pressure and air travel and arm volume (J Clin Oncol 2016) and the
 *   PAL weight lifting trial (Schmitz et al., JAMA 2010): abstracts (the PMC full text of the first could not be
 *   downloaded).
 * - Martinez-Jaimez et al., international Delphi consensus on BCRL prevention (Eur J Cancer Care 2022): abstract only;
 *   no step rests on it.
 * - ASBrS expert panel recommendations, parts 1 and 2 (Ann Surg Oncol 2017): Europe PMC holds no abstract; not read.
 * - International Society of Lymphology 2023 consensus document (Lymphology 2023): abstract read; it gives no
 *   recommendation that a step here rests on.
 * - Not read: the NCCN survivorship guideline and British Lymphology Society guidance (no open text fetched).
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * unchanged.
 */
export const lymphoedemaRiskReductionSurveillanceAndTreatment = protocol({
  id: "lymphoedema-risk-reduction-surveillance-and-treatment",
  name: "Lymphoedema after breast cancer: risk reduction, surveillance, early compression and treatment",
  aka: [
    "breast cancer-related lymphoedema",
    "BCRL",
    "BCRL prevention",
    "breast cancer-related lymphoedema prevention",
    "lymphedema risk reduction",
    "lymphoedema precautions",
    "prospective surveillance for lymphoedema",
    "bioimpedance spectroscopy",
    "L-Dex",
    "arm precautions after lymph node surgery",
    "arm care after axillary surgery",
    "complete decongestive therapy",
  ],
  domain: "survivorship",
  tldr: "After surgery or radiotherapy to the armpit nodes, the arm can swell (lymphoedema). Measuring the arm before surgery and at check-ups can find swelling early, when a compression sleeve may stop it becoming permanent. Exercise, including weights, is safe. Infection raises the risk; the old bans on blood pressure, needles or flying are not well supported. Report arm swelling, heaviness or redness.",
  simple: "Your arm can swell after breast cancer treatment. Ask to have both arms measured before surgery and at check-ups for at least two years; regular measuring finds swelling early, and a sleeve can help. Tell your team at once about swelling, heaviness or tightness in the arm, or redness and heat that could be infection. Keep exercising: it is safe.",
  summary: "MASCC 2024 (Delphi, 55 experts, statements based on randomised trials and systematic reviews): prioritise people with axillary node dissection, axillary radiotherapy, early relative arm volume increase, many nodes removed and BMI of 30 or more; run prospective surveillance where resources allow (93.8% agreement), with a pre-surgical baseline, starting within 3 months of surgery, every 3 to 4 months in year 1 then every 6 to 12 months for at least 24 months; bioimpedance spectroscopy (L-Dex rise of 6.5 or more) or a 5 to under 10% volume increase or any arm symptom triggers a compression sleeve for at least 4 to 6 weeks; 10% or more triggers more intensive treatment; prophylactic compression sleeves, axillary reverse mapping and prophylactic lymphatic reconstruction are options where expertise and resources allow.\n\nThe APTA interventions guideline (2020) recommends prospective surveillance in high-risk groups (Grade C): a preoperative measurement with bioimpedance spectroscopy or volume, then every 3 months for the first year and twice a year for up to 5 years. Subclinical (ISL stage 0) lymphoedema may be treated with education, self-massage and compression garments (Grade C), escalating to complete decongestive therapy (CDT) if it persists. For early (stage I) lymphoedema, an individually fitted compression garment, an exercise programme and education are first-line (Grade A); CDT is used for moderate and late lymphoedema (stages II and III, Grade B), followed by home care with self-massage, a fitted garment and exercise (Grade B). Supervised progressive resistance training from at least one month after surgery is safe (Grade A) and aerobic exercise should be provided (Grade A); therapist manual lymphatic drainage may not reduce risk (Grade C), and a fitted compression garment for high-risk patients with exercise may reduce it (Grade B). PAL (n=154): slowly progressive weight lifting did not increase lymphoedema.\n\nIn the PREVENT trial (963 randomised, 879 analysed), surveillance by bioimpedance spectroscopy triggered a four-week compression sleeve less often than tape measurement (20.1 against 27.5 per cent), and fewer of those treated progressed to chronic lymphoedema needing CDT (7.9 against 19.2 per cent, relative risk 0.41). New cases kept appearing in years two and three, so the authors advise monitoring for at least three years. The APTA diagnosis guideline (2017) set bioimpedance cut-offs of an L-Dex above 7.1 without a baseline or more than 10 above baseline (Grade B); its authors updated the bioimpedance advice in 2018, which was not read.\n\nOn the traditional precautions, in a 3,041-measurement cohort blood draws, injections, blood pressure readings and flights were not associated with arm volume increase, while cellulitis was a risk; a 2024 evidence map prepared for the American Cancer Society and Lymphology Association of North America summit found the evidence sufficient to refute many of the previously claimed risk factors, and called a 'just in case' approach to education possibly inappropriate.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "People treated for breast cancer with surgery, axillary node surgery (sentinel node biopsy or axillary dissection) or axillary radiotherapy, or taxane chemotherapy, as in MASCC, PREVENT and the APTA guidelines. The guidelines read are limited to upper-limb breast cancer-related lymphoedema; leg lymphoedema after groin node surgery for vulval, cervical, endometrial, penile cancer or melanoma, and lymphoedema after head and neck and other cancers, have too little evidence for their own recommendations (ACS/LANA 2024), and the breast steps should not be assumed to transfer without the team's advice.",
  trigger: "A plan for breast or axillary surgery or radiotherapy (baseline), then follow-up for at least three years; and whenever arm, hand or chest swelling, heaviness or tightness is reported.",
  steps: [
    {
      action: "Identify who is at highest risk: axillary node dissection, axillary radiotherapy, an early increase in arm volume, many nodes removed, and a high body mass index",
      why: "Prevention and surveillance can be concentrated on the people most likely to develop swelling.",
      source: "mascc-2024",
      quote: "Axillary lymph node dissection, use of post-operative radiotherapy, relative within-arm volume increase one month after surgery, greater number of lymph nodes dissected, and high body mass index were recommended as the most important risk factors to guide selection of patients for interventions to prevent BCRAL.",
      grade: "Delphi consensus (MASCC)",
    },
    {
      action: "Measure both arms before surgery, with bioimpedance spectroscopy or limb volume, as a baseline",
      why: "Small changes are only meaningful against the person's own starting point.",
      source: "apta-2020",
      quote: "Monitoring with bioelectric impedance spectroscopy or volume measures may begin with a preoperative assessment, repeated every 3 months for the first year postoperatively, and then biannually for up to 5 years. (Grade C)",
      grade: "Grade C",
    },
    {
      action: "Repeat the measurement every 3 months for the first year after surgery, then every 6 months, for at least 3 and up to 5 years, using the same method each time",
      why: "Most early swelling appears within the first nine months, but new cases keep appearing in years two and three; changing methods makes readings incomparable.",
      source: "prevent-timing-2024",
      quote: "Patients should continue to be monitored for a minimum of 3 years following completion of cancer treatment. Specifically, careful targeted monitoring over the initial 9-month period is important.",
    },
    {
      action: "Measure with bioimpedance spectroscopy where available, or arm circumference or volume where it is not",
      why: "Bioimpedance detects fluid build-up before the arm looks swollen; a tape measure still works when a machine is not available.",
      source: "mascc-2024",
      quote: "2.3 In a prospective surveillance program, arm circumference (or volumetric) or lymphangiography/lymphoscintigraphy measurement is an alternative method to identify patients with subclinical/early stage lymphoedema for early treatment when bioimpedance spectroscopy is not available or there are resource limitations Consensus achieved in round 1 82.8% (53/64)",
      grade: "Consensus 82.8% (alternatives); 89.8% (bioimpedance as an option)",
    },
    {
      action: "Ask at each visit about swelling, heaviness and numbness in the arm, and investigate them",
      why: "What the person feels often comes before a measurable change.",
      source: "apta-dx-2017",
      quote: "Self-reported symptoms of swelling, heaviness, and numbness should be investigated for early diagnosis (Grade B)",
      grade: "Grade B",
    },
    {
      action: "Start treatment when L-Dex rises by 6.5 or more, arm volume rises by 5 to under 10%, or the person reports swelling, heaviness, tightness or numbness: a fitted compression sleeve for at least 4 to 6 weeks",
      why: "A sleeve worn early reduced progression to lasting lymphoedema in a randomised trial.",
      source: "mascc-2024",
      quote: "2.17 When subclinical/early stage lymphoedema is detected in a prospective surveillance program, compression sleeves are suggested to be prescribed for at least 4–6 weeks. A longer duration can be considered depending on clinical response and the individual judgement of the treating therapist. Consensus achieved in round 2 96.2% (50/52)",
      grade: "Consensus 96.2%",
    },
    {
      action: "For subclinical swelling found on surveillance, wear the compression sleeve with a gauntlet (in PREVENT, 12 hours a day for 4 weeks), with education and self-massage; escalate to decongestive therapy if it persists or progresses",
      why: "Treating swelling before it is visible lowered the chance of it becoming long-lasting in a randomised trial.",
      source: "prevent-2022",
      quote: "S-BCRL detection triggered a 4-week, 12-hour per day, compression sleeve, and gauntlet intervention.",
    },
    {
      action: "Refer for more intensive treatment such as complete decongestive therapy when arm volume has risen by 10% or more",
      why: "Larger swelling needs specialist lymphoedema treatment rather than a sleeve alone.",
      source: "mascc-2024",
      quote: "2.8 In a prospective surveillance program, more intensive treatment (e.g., congestive decompressive therapy) is indicated when a difference in volume measurements is ≥ 10% compared to pre-surgery values Consensus achieved in round 2 91.7% (44/48)",
      grade: "Consensus 91.7%",
    },
    {
      action: "For early visible lymphoedema, fit a compression garment individually, teach an exercise programme and give education as first-line treatment",
      why: "A well-fitted garment with exercise controls early swelling for most people.",
      source: "apta-2020",
      quote: "If early signs and/or symptoms of lymphedema are noted, the patient should be individually fitted with a compression garment, instructed in an exercise program, and provided education as first-line treatment. (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For moderate or late lymphoedema, give complete decongestive therapy with compression bandaging and exercise, then a home programme of self-massage, a fitted garment, night compression if needed, and exercise",
      why: "Bandaging reduces the swelling; the home programme keeps it down.",
      source: "apta-2020",
      quote: "CDT should be used to reduce limb volume in those diagnosed with moderate and late BCRL. (Grade B) • Compression bandaging and exercise are key components of CDT and should be used. (Grade A)",
      grade: "Grade B (CDT); Grade A (bandaging and exercise within CDT)",
    },
    {
      action: "Encourage aerobic exercise and supervised, progressive resistance training from at least one month after surgery, with weekly checks at first",
      why: "Lifting weights, built up gradually, does not cause or worsen lymphoedema and improves strength.",
      source: "apta-2020",
      quote: "Progressive resistance training is safe when an individualized program is supervised beginning at least 1 month postsurgery. (Grade A) Individualized aerobic exercise programs should be provided. (Grade A) Monitoring for exercise tolerance and adverse effects should initially occur at least weekly and then taper according to clinical presentation. (Grade A)",
      grade: "Grade A",
    },
    {
      action: "Teach the person to look after the skin of the arm and to seek treatment quickly for redness, heat or other signs of infection",
      why: "Cellulitis in the at-risk arm was linked to arm swelling in a large cohort.",
      source: "ferguson-2016",
      quote: "This study suggests that although cellulitis increases risk of lymphedema, ipsilateral blood draws, injections, blood pressure readings, and air travel may not be associated with arm volume increases.",
      grade: "Prospective cohort (not a guideline grade)",
    },
    {
      action: "Give risk-reduction advice that matches the evidence: protect the skin and treat infection promptly, rather than forbidding all blood pressure readings, blood tests or flights by rule",
      why: "Skin infection (cellulitis) is a proven risk; many of the traditional prohibitions are not supported by research and can make people anxious.",
      source: "precautions-2024",
      quote: "Patient education about precautionary risks needs to be concordant with what is currently evidenced in the literature.",
    },
  ],
  bestInClass: {
    statement: "Prospective surveillance from a preoperative baseline, with a compression sleeve when subclinical change appears, is the best-supported approach: MASCC 2024 recommends it by consensus on trial evidence (93.8% agreement), APTA 2020 recommends it (Grade C, because the evidence then was mostly observational) and the PREVENT randomised trial (2022) showed bioimpedance-triggered compression reduced progression to chronic lymphoedema against tape-measure-triggered compression. Exercise, including progressive resistance training, is safe (APTA Grade A). Treatment of established lymphoedema follows APTA 2020 by stage (Grade A for garment, exercise and education in early disease; Grade B for CDT later). On the arm precautions, the 2024 summit evidence map and consensus move away from blanket prohibitions on the same evidence: blood draws, injections, blood pressure readings and air travel were not associated with arm volume increase in the largest cohort, whereas infection was. The 2017 ASBrS panel, which also addressed them, could not be read, so the two cannot be set side by side here. MASCC and APTA differ on prophylactic sleeves: MASCC offers them as an option to anyone at risk, while APTA grades a fitted garment for high-risk patients, paired with exercise, at B.",
    sources: ["mascc-2024", "apta-2020", "prevent-2022", "prevent-timing-2024", "apta-dx-2017", "precautions-2024", "summit-consensus-2024", "ferguson-2016", "asbrs-2017"],
  },
  variants: [
    {
      name: "Traditional arm precautions (no blood pressure, blood draws, injections or cannulas in the at-risk arm; compression for flights)",
      differs: "Teaches every person at risk to avoid any procedure or exposure on the treated side, for life.",
      evidence: "Common practice. In the Ferguson cohort none of blood draws, injections, blood pressure readings or flying was associated with arm volume increase. The 2024 evidence map (37 studies, 2008 to 2023) found evidence sufficient to refute many previously claimed risk factors for developing lymphoedema, and little evidence either way on progression once it exists. The 2024 ACS/LANA consensus updated recommendations on blood pressure, skin puncture, blood draws, air travel and heat; its specific wording could not be read (abstract only).",
      sources: ["ferguson-2016", "precautions-2024", "summit-consensus-2024"],
    },
    {
      name: "Tape-measure surveillance instead of bioimpedance",
      differs: "Circumference measured with a tape at set points, converted to volume, instead of a bioimpedance device.",
      evidence: "In PREVENT, tape measurement triggered intervention more often (27.5 against 20.1 per cent) and more of those treated progressed (19.2 against 7.9 per cent). Tape measurement needs no device and is widely available, and MASCC accepts it where bioimpedance is not available.",
      sources: ["prevent-2022", "mascc-2024"],
    },
    {
      name: "MASCC surveillance schedule",
      differs: "Starts within 3 months of surgery, measures every 3 to 4 months in the first year, then every 6 to 12 months, for at least 24 months (APTA: every 3 months in the first year, then twice a year for up to 5 years).",
      evidence: "MASCC 2024 Delphi consensus: 85.9% (interval), 82.8% (start within 3 months), 89.1% (at least 24 months). PREVENT's timing analysis advises at least 3 years.",
      sources: ["mascc-2024", "apta-2020", "prevent-timing-2024"],
    },
    {
      name: "Prospective surveillance plus a supervised exercise programme",
      differs: "Adds a 12-week supervised multimodal exercise programme to surveillance in high-risk women having adjuvant chemotherapy.",
      evidence: "Single-centre randomised trial of 116 women: the combination reduced arm volume and improved grip strength, walking distance and quality of life over surveillance alone. Read as an abstract.",
      sources: ["apmr-2025"],
    },
    {
      name: "Prophylactic compression sleeve for everyone at high risk",
      differs: "Fits a sleeve from the first day after surgery until 3 months after the end of chemotherapy or radiotherapy (not hormone therapy), at least 8 hours a day.",
      evidence: "Offered as an option by MASCC 2024 (80% agreement, on a single randomised trial; experts who disagreed said one trial should not set routine practice); APTA 2020 Grade B for a fitted garment with exercise in high-risk patients.",
      sources: ["mascc-2024", "apta-2020"],
    },
    {
      name: "Preventive manual lymphatic drainage",
      differs: "Adds therapist-delivered lymphatic drainage massage after surgery to prevent lymphoedema.",
      evidence: "APTA 2020: may not reduce the risk (Grade C).",
      sources: ["apta-2020"],
    },
    {
      name: "Surgical prevention: axillary reverse mapping and prophylactic lymphatic reconstruction",
      differs: "Spares the arm's lymphatics during dissection, or joins divided lymphatics to a vein at the time of dissection.",
      evidence: "MASCC 2024: an option where expertise is available and resources allow; reverse mapping not for people at high risk of axillary recurrence.",
      sources: ["mascc-2024"],
    },
  ],
  grades: [
    { claim: "Prospective surveillance is recommended where feasible", grade: "Consensus 93.8% (MASCC)", source: "mascc-2024", quote: "2.1 A prospective surveillance program is recommended to reduce risks of chronic lymphoedema after breast cancer surgery where feasible and resources allow Consensus achieved in round 1 93.8% (60/64)" },
    { claim: "Prospective surveillance in high-risk groups", grade: "Grade C", source: "apta-2020", quote: "Early identification of subclinical lymphedema in high-risk groups through prospective surveillance may improve outcomes. (Grade C)" },
    { claim: "A pre-surgical baseline is required for surveillance", grade: "Consensus 89.1% (MASCC)", source: "mascc-2024", quote: "2.11 Pre-surgical assessment of lymphoedema is required in a prospective surveillance program for better comparison of measurements after surgery Consensus achieved in round 1 89.1% (57/64)" },
    { claim: "Surveillance every 3 to 4 months in year 1, then every 6 to 12 months", grade: "Consensus 85.9% (MASCC)", source: "mascc-2024", quote: "2.12 The surveillance interval for a prospective surveillance program is recommended to be every 3–4 months in the first year then every 6–12 months thereafter where feasible and resources allow Consensus achieved in round 1 85.9% (55/64)" },
    { claim: "Bioimpedance cut-offs for diagnosis", grade: "Grade B", source: "apta-dx-2017", quote: "Cutpoint of >7.1 L-Dex score should be used for diagnosis of breast cancer–related lymphedema when preoperative baseline measures are not available (Grade B) – Cutpoint of >10 L-Dex score above preoperative baseline should be used for diagnosis of breast cancer–related lymphedema (Grade B)" },
    { claim: "Bioimpedance-triggered compression reduced progression against tape measure", grade: "randomised trial, P = 0.016", source: "prevent-2022", quote: "Overall, 14.4% ( n = 30) progressed post-intervention, with reduced likelihood for BIS patients than TM patients (7.9%, n  = 7 vs. 19.2%, n  = 23; relative risk = 0.41; 95% CI, 0.13-0.81; absolute reduction 11.3%; 95% CI, 2.3-20.3; p  = 0.016)." },
    { claim: "Prophylactic sleeves offered as an option", grade: "Consensus 80% (MASCC)", source: "mascc-2024", quote: "3.1 Prophylactic compression sleeves should be offered as an option to prevent breast cancer- related arm lymphoedema Consensus achieved in round 2 80% (40/50)" },
    { claim: "Fitted compression garment with exercise for high-risk patients", grade: "Grade B (APTA)", source: "apta-2020", quote: "Provision of a fitted compression garment to patients at high risk of developing lymphedema, when paired with upper extremity exercise and diaphragmatic breathing, may reduce development of lymphedema. (Grade B)" },
    { claim: "Manual lymphatic drainage after axillary dissection does not clearly prevent lymphoedema", grade: "Grade C", source: "apta-2020", quote: "The addition of therapist-provided manual lymphatic drainage (MLD) to the postoperative care plan may not reduce the risk of developing BCRL. (Grade C)" },
    { claim: "Weight lifting does not increase lymphoedema", grade: "Randomised equivalence trial, n=154 (PAL)", source: "pal-2010", quote: "In breast cancer survivors at risk for lymphedema, a program of slowly progressive weight lifting compared with no exercise did not result in increased incidence of lymphedema." },
    { claim: "Evidence too thin for other cancers", grade: "Consensus statement (ACS/LANA)", source: "summit-consensus-2024", quote: "More high-quality evidence is required to allow the development of risk reduction recommendations for other cancer types such as gynecological, melanoma, and head and neck." },
  ],
  sources: [
    { key: "mascc-2024", label: "Wong et al., MASCC clinical practice guidance for the prevention of breast cancer-related arm lymphoedema: international Delphi consensus-based recommendations (eClinicalMedicine 2024)", publisher: "Multinational Association of Supportive Care in Cancer", year: 2024, url: "https://doi.org/10.1016/j.eclinm.2024.102441", doi: "10.1016/j.eclinm.2024.102441", gradingScheme: "Modified Delphi; each statement printed with the round and percentage agreement (consensus at 75% or more).", read: "full-text", accessed: "2026-11-11" },
    { key: "apta-2020", label: "Interventions for Breast Cancer-Related Lymphedema: Clinical Practice Guideline From the Academy of Oncologic Physical Therapy of APTA", publisher: "APTA Academy of Oncologic Physical Therapy, Physical Therapy", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7412854/", doi: "10.1093/ptj/pzaa087", gradingScheme: "Grade A (strong) to D (theoretical), plus Best Practice and Expert Opinion statements.", read: "full-text", accessed: "2026-11-11" },
    { key: "apta-dx-2017", label: "Diagnosis of Upper Quadrant Lymphedema Secondary to Cancer: Clinical Practice Guideline From the Oncology Section of the American Physical Therapy Association", publisher: "APTA Oncology Section, Physical Therapy", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5803775/", doi: "10.1093/ptj/pzx050", gradingScheme: "Grade A (strong: Level I studies) to D (theoretical), plus Expert Opinion.", read: "full-text", accessed: "2026-11-11" },
    { key: "prevent-2022", label: "A Comparison of Bioimpedance Spectroscopy or Tape Measure Triggered Compression Intervention in Chronic Breast Cancer Lymphedema Prevention (PREVENT)", publisher: "Lymphatic Research and Biology", year: 2022, url: "https://europepmc.org/abstract/MED/35099283", doi: "10.1089/lrb.2021.0084", read: "abstract", accessed: "2026-11-11" },
    { key: "prevent-timing-2024", label: "Timing of Breast Cancer Related Lymphedema Development Over 3 Years: Observations from a Large, Prospective Randomized Screening Trial Comparing Bioimpedance Spectroscopy Versus Tape Measure", publisher: "Annals of Surgical Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38965099", doi: "10.1245/s10434-024-15706-x", read: "abstract", accessed: "2026-11-11" },
    { key: "precautions-2024", label: "Current evidence on patient precautions for reducing breast cancer-related lymphedema manifestation and progression risks", publisher: "Medical Oncology (2023 ACS/LANA Lymphedema Summit)", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11486782/", doi: "10.1007/s12032-024-02408-3", gradingScheme: "Evidence map of 37 studies; not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "summit-consensus-2024", label: "Evidence-based recommendations regarding risk reduction practices for people at risk of or with breast cancer-related lymphedema: consensus from an expert panel", publisher: "Medical Oncology (2023 ACS/LANA Lymphedema Summit)", year: 2024, url: "https://europepmc.org/abstract/MED/39438352", doi: "10.1007/s12032-024-02510-6", gradingScheme: "Expert consensus on the evidence; grades not visible in the abstract.", read: "abstract", accessed: "2026-11-11" },
    { key: "ferguson-2016", label: "Ferguson et al., Impact of Ipsilateral Blood Draws, Injections, Blood Pressure Measurements, and Air Travel on the Risk of Lymphedema for Patients Treated for Breast Cancer (J Clin Oncol 2016)", publisher: "Journal of Clinical Oncology", year: 2016, url: "https://doi.org/10.1200/JCO.2015.61.5948", doi: "10.1200/JCO.2015.61.5948", gradingScheme: "Prospective cohort; no recommendation grade.", read: "abstract", accessed: "2026-11-11" },
    { key: "pal-2010", label: "Schmitz et al., Weight Lifting for Women at Risk for Breast Cancer-Related Lymphedema: a randomized trial (JAMA 2010)", publisher: "JAMA", year: 2010, url: "https://doi.org/10.1001/jama.2010.1837", doi: "10.1001/jama.2010.1837", gradingScheme: "Randomised controlled equivalence trial; no recommendation grade.", read: "abstract", accessed: "2026-11-11" },
    { key: "apmr-2025", label: "Randomized Trial Assessing Prospective Surveillance and Exercise for Preventing Breast Cancer-Related Lymphedema in High-Risk Patients", publisher: "Archives of Physical Medicine and Rehabilitation", year: 2025, url: "https://europepmc.org/abstract/MED/40081785", doi: "10.1016/j.apmr.2025.03.002", read: "abstract", accessed: "2026-11-11" },
    { key: "asbrs-2017", label: "Considerations for Clinicians in the Diagnosis, Prevention, and Treatment of Breast Cancer-Related Lymphedema: Recommendations from a Multidisciplinary Expert ASBrS Panel, Parts 1 and 2", publisher: "American Society of Breast Surgeons, Annals of Surgical Oncology", year: 2017, url: "https://doi.org/10.1245/s10434-017-5982-4", doi: "10.1245/s10434-017-5982-4", read: "not-reachable", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-acc-lymphoedema-prospective-surveillance", "idea-upgrade-evidence-based-arm-precautions-after-breast-cancer"],
  gaps: [
    "The 2018 update to the APTA bioimpedance recommendations was not read (Europe PMC holds only the title), so the L-Dex cut-offs given here are the 2017 ones and may have been revised; MASCC's 2024 trigger of an L-Dex rise of 6.5 or more differs from them.",
    "The ACS/LANA 2024 risk-reduction consensus was read only as an abstract; its specific wording on blood pressure, blood draws, injections, air travel, heat and saunas is not given here.",
    "The ASBrS 2017 expert panel recommendations could not be read: Europe PMC holds no abstract.",
    "PREVENT was read only as abstracts; its exact measurement thresholds for triggering compression are not given here.",
    "Which surveillance method is best (bioimpedance or measurement) and the right threshold are not fully settled; MASCC accepts both, while PREVENT favoured bioimpedance.",
    "Whether prophylactic sleeves help everyone at risk rests on one randomised trial with one year of follow-up (MASCC 2024).",
    "No UK guideline (British Lymphology Society, NICE) and no NCCN survivorship guideline was read; NICE breast cancer guidance was not checked for lymphoedema surveillance in this round. The International Society of Lymphology 2023 consensus was read only as an abstract.",
    "There is too little evidence for leg lymphoedema after groin node surgery (vulval, cervical, endometrial, penile cancer, melanoma), or for lymphoedema after head and neck cancers, to set out their own steps (ACS/LANA 2024).",
  ],
  technologies: ["lymphoedema-decongestive-therapy", "lymphoedema-surgery-and-early-detection", "rejuv-measure-lymphoedema", "pneumatic-compression-lymphoedema", "sentinel-node"],
  cancers: ["breast-cancer"],
  terms: ["breast-cancer-related-lymphoedema", "lymphoedema-after-breast-cancer"],
  related: ["exercise-during-and-after-cancer-treatment", "breast-cancer-follow-up-after-treatment", "sentinel-node-tracers-and-blue-dye-safety"],
  sections: ["supportive-care"],
  tags: ["protocol", "lymphoedema", "survivorship", "breast-cancer"],
});
