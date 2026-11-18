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
 *
 * Second accuracy pass, 17 November 2026: every source was fetched again as raw text and each claim checked against it;
 * every quote was checked verbatim by script (whitespace and XML tags only).
 * - Re-read in full from Europe PMC XML: MASCC 2024 (PMC10850412), APTA 2020 (PMC7412854), APTA diagnosis 2017
 *   (PMC5803775) and the evidence map (PMC11486782).
 * - Newly read in full: PREVENT (Europe PMC XML, PMC9810346), which gives the trial's triggers; and Ferguson 2016
 *   (PubMed Central HTML, PMC4872021), which shows that blood pressure readings WERE associated with arm volume on
 *   univariate analysis (P = .034) and not on multivariate analysis. The page had said flatly "not associated".
 * - Newly added: NICE NG101 (lymphoedema recommendations 1.14.1 to 1.14.11, updated 14 April 2025; a copy saved the
 *   same day by the bone health checker was re-used) and the NHS lymphoedema prevention page (plain curl). NICE differs
 *   from MASCC and APTA on prophylactic compression and on clinic surveillance, and both positions are now on the page.
 * - Still abstract only: the PREVENT timing analysis, PAL, the 2025 surveillance and exercise trial, and the ACS/LANA
 *   consensus (the Springer page answered a script with a browser check).
 * - Still not read: the 2018 APTA bioimpedance update (the publisher's PDF returned 403) and the ASBrS panel papers.
 * - Corrected: reasons in "why" that no source states (a sleeve tested against no sleeve, "most" swelling by nine
 *   months, symptoms coming before measurable change), "both arms", the APTA 2020 grading scheme (it has no Grade D),
 *   the ASBrS label (the DOI is Part 1 only), and cancer types named beyond what the ACS/LANA abstract lists.
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
  tldr: "After armpit node surgery or radiotherapy, the arm can swell (lymphoedema). Measuring the arm before surgery and at check-ups can find swelling early, so a compression sleeve can be started. Exercise, including weights, has not been shown to cause it. Skin infection is linked to swelling; bans on blood pressure, needles or flying are not well supported. Report swelling, heaviness, redness or heat.",
  simple: "Your arm can swell after breast cancer treatment. Ask how your arm will be checked: some guidelines advise measuring it before surgery and at check-ups for at least two years, and NICE in England asks teams to teach you to check it yourself. Tell your team about swelling, heaviness or tightness in the arm. Contact your GP or team as soon as possible about redness or a feeling of heat in the skin, which may be infection. NICE says there is no sign that physical activity causes lymphoedema or makes it worse.",
  summary: "MASCC 2024 (Delphi, 55 experts, statements based on randomised trials and systematic reviews): the panel ranked axillary node dissection, post-operative radiotherapy, an early rise in arm volume, the number of nodes removed and high BMI as the most important risk factors and, where resources are limited, prioritises people with a BMI of 30 or more, 15 or more axillary nodes removed, or axillary radiotherapy. It recommends prospective surveillance where feasible and resources allow (93.8% agreement), with a pre-surgical baseline, starting within 3 months of surgery, every 3 to 4 months in year 1 then every 6 to 12 months for at least 24 months. A bioimpedance L-Dex rise of 6.5 or more, a 5 to under 10% volume increase, or any arm symptom triggers treatment, for which compression sleeves are suggested for at least 4 to 6 weeks; an L-Dex rise above 10 or a volume increase of 10% or more indicates more intensive treatment. Prophylactic compression sleeves are offered as an option, and axillary reverse mapping and prophylactic lymphatic reconstruction are options where expertise and resources allow. MASCC treats bioimpedance as an option, not a standard of care.\n\nThe APTA interventions guideline (2020) says early identification of subclinical lymphoedema in high-risk groups through prospective surveillance may improve outcomes (Grade C): monitoring may begin with a preoperative measurement by bioimpedance spectroscopy or volume, repeated every 3 months for the first year and twice a year for up to 5 years. Subclinical (ISL stage 0) lymphoedema may be treated with education, self-massage and compression garments (Grade C), and complete decongestive therapy (CDT) may help if it persists or progresses (Grade C). For early (stage I) lymphoedema, an individually fitted compression garment, an exercise programme and education are first-line (Grade A); CDT is used for moderate and late lymphoedema (stages II and III, Grade B), followed by home care with self-massage, a fitted garment and exercise (Grade B). Supervised progressive resistance training from at least one month after surgery is safe (Grade A) and aerobic exercise should be provided (Grade A); therapist manual lymphatic drainage may not reduce risk (Grade C), and a fitted compression garment for high-risk patients with exercise may reduce it (Grade B). PAL (n=154): slowly progressive weight lifting did not increase lymphoedema.\n\nNICE guideline NG101 (England; lymphoedema recommendations updated April 2025) differs on two points. It asks teams to give information on early signs, self-monitoring and how to collect baseline limb measurements, and does not recommend scheduled clinic measurement, which its committee judged difficult to implement. It also says compression therapy should not be offered as a risk-reducing measure. For people who develop lymphoedema NICE asks for referral to a specialist lymphoedema service as soon as possible and offers compression therapy as the first stage of management.\n\nIn the PREVENT trial (963 randomised, 879 analysed), the trigger was an L-Dex rise of 6.5 or more (10 or more at the start of the trial) in the bioimpedance arm and a volume change of 5 to under 10% in the tape arm. Surveillance by bioimpedance spectroscopy triggered a four-week compression sleeve less often than tape measurement (20.1 against 27.5 per cent), and fewer of those treated progressed to chronic lymphoedema needing CDT (7.9 against 19.2 per cent, relative risk 0.41). Everyone who crossed the trigger wore the sleeve, so the trial compared two ways of measuring, not a sleeve against no sleeve. MASCC notes that the bioimpedance arm had more stage I disease and fewer axillary dissections. New cases kept appearing in years two and three, so the authors advise monitoring for at least three years. The APTA diagnosis guideline (2017) set bioimpedance cut-offs of an L-Dex above 7.1 without a baseline or more than 10 above baseline (Grade B); its authors updated the bioimpedance advice in 2018, which was not read.\n\nOn the traditional precautions, in a cohort of 632 patients and 3,041 measurements, one or more blood draws, injections or flights showed no significant association with arm volume increase; blood pressure readings on that arm were associated on univariate analysis (P = .034) and not on multivariate analysis, while cellulitis, axillary dissection, regional node radiotherapy and a BMI of 25 or more were. The authors conclude that these exposures 'may not be associated' with arm volume increases. A 2024 evidence map prepared for the American Cancer Society and Lymphology Association of North America summit found the evidence sufficient to refute many of the previously claimed risk factors, kept wound infection as a risk, and said a 'just in case' approach to education may not be appropriate. NICE (2025) says there is no consistent evidence of increased risk from medical procedures on the treated side or from air travel, and asks for a shared decision on using that arm. The NHS lymphoedema page (reviewed March 2023) still advises not having injections or blood pressure readings in the affected area whenever possible.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community", "home"],
  },
  population: "People treated for breast cancer who are at risk of arm lymphoedema: PREVENT enrolled people having mastectomy or partial mastectomy, axillary treatment (dissection, a sentinel node biopsy removing more than 6 nodes, or radiotherapy), chest wall, breast or supraclavicular radiotherapy, or taxane chemotherapy. The guidelines read are limited to breast cancer-related lymphoedema of the arm. The ACS/LANA 2024 consensus says more evidence is needed before risk-reduction recommendations can be made for other cancers such as gynaecological cancers, melanoma and head and neck cancer, so the breast steps should not be assumed to transfer without the team's advice.",
  trigger: "A plan for breast or axillary surgery or radiotherapy (baseline), then follow-up for at least 24 months (MASCC) or at least three years (the PREVENT authors); and whenever arm, hand or chest swelling, heaviness or tightness is reported.",
  steps: [
    {
      action: "Identify who is at highest risk: axillary node dissection, axillary radiotherapy, an early increase in arm volume, many nodes removed, and a high body mass index",
      why: "Prevention and surveillance can be concentrated on the people most likely to develop swelling.",
      source: "mascc-2024",
      quote: "Axillary lymph node dissection, use of post-operative radiotherapy, relative within-arm volume increase one month after surgery, greater number of lymph nodes dissected, and high body mass index were recommended as the most important risk factors to guide selection of patients for interventions to prevent BCRAL.",
      grade: "Delphi consensus (MASCC)",
    },
    {
      action: "Take a baseline measurement before surgery, with bioimpedance spectroscopy or limb volume",
      why: "MASCC says a pre-surgical assessment is required so that later measurements can be compared with it; APTA says monitoring may begin with a preoperative assessment.",
      source: "apta-2020",
      quote: "Monitoring with bioelectric impedance spectroscopy or volume measures may begin with a preoperative assessment, repeated every 3 months for the first year postoperatively, and then biannually for up to 5 years. (Grade C)",
      grade: "Grade C",
    },
    {
      action: "Repeat the measurement at set intervals through follow-up, most often in the first year, for at least 2 to 3 years, using the same method each time",
      why: "In PREVENT more than half of the people with early swelling were found within nine months, and new cases kept appearing in years two and three. APTA suggests every 3 months in the first year, then twice a year for up to 5 years (Grade C); MASCC every 3 to 4 months, then every 6 to 12 months, for at least 24 months. The APTA diagnosis guideline says volume methods are not interchangeable (Grade A).",
      source: "prevent-timing-2024",
      quote: "Patients should continue to be monitored for a minimum of 3 years following completion of cancer treatment. Specifically, careful targeted monitoring over the initial 9-month period is important.",
    },
    {
      action: "Measure with bioimpedance spectroscopy where available, or arm circumference or volume where it is not",
      why: "MASCC calls bioimpedance one of the more commonly used methods and an option, not a standard of care, and accepts arm circumference or volume where it is not available; teams choose by cost, availability and experience.",
      source: "mascc-2024",
      quote: "2.3 In a prospective surveillance program, arm circumference (or volumetric) or lymphangiography/lymphoscintigraphy measurement is an alternative method to identify patients with subclinical/early stage lymphoedema for early treatment when bioimpedance spectroscopy is not available or there are resource limitations Consensus achieved in round 1 82.8% (53/64)",
      grade: "Consensus 82.8% (alternatives); 89.8% (bioimpedance as an option)",
    },
    {
      action: "Ask at each visit about swelling, heaviness and numbness in the arm, and investigate them",
      why: "The APTA diagnosis guideline says these symptoms should be investigated for early diagnosis, and MASCC says any arm symptom the person reports should trigger treatment.",
      source: "apta-dx-2017",
      quote: "Self-reported symptoms of swelling, heaviness, and numbness should be investigated for early diagnosis (Grade B)",
      grade: "Grade B",
    },
    {
      action: "Start treatment when L-Dex rises by 6.5 or more from the pre-surgery value, arm volume rises by 5 to under 10%, or the person reports arm symptoms such as swelling, heaviness, tightness or numbness; a compression sleeve is suggested for at least 4 to 6 weeks",
      why: "MASCC's panel recommends a compression garment as the first treatment when early or subclinical lymphoedema is found on surveillance; a longer course can be considered on the therapist's judgement.",
      source: "mascc-2024",
      quote: "2.17 When subclinical/early stage lymphoedema is detected in a prospective surveillance program, compression sleeves are suggested to be prescribed for at least 4–6 weeks. A longer duration can be considered depending on clinical response and the individual judgement of the treating therapist. Consensus achieved in round 2 96.2% (50/52)",
      grade: "Consensus 96.2% (sleeve duration); 91.9% (L-Dex trigger), 88.6% (volume trigger), 81.3% (symptom trigger)",
    },
    {
      action: "For subclinical swelling found on surveillance, use a compression sleeve with a gauntlet (in PREVENT, 12 hours a day for 4 weeks); consider adding education and self-massage, and complete decongestive therapy if the swelling persists or progresses",
      why: "PREVENT gave this sleeve course to everyone whose measurement crossed the trigger, however they were measured; it did not test a sleeve against no sleeve. APTA says treatment for subclinical lymphoedema may include education, self-massage and compression garments, and that more intensive treatment may help if it persists (both Grade C).",
      source: "prevent-2022",
      quote: "S-BCRL detection triggered a 4-week, 12-hour per day, compression sleeve, and gauntlet intervention.",
    },
    {
      action: "Move to more intensive treatment such as complete decongestive therapy when arm volume has risen by 10% or more, or L-Dex by more than 10, from the pre-surgery value",
      why: "MASCC's panel judged that a change of this size indicates more intensive treatment (94.9% agreement for the L-Dex threshold). NICE asks that people who develop lymphoedema are referred to a specialist lymphoedema service as soon as possible.",
      source: "mascc-2024",
      quote: "2.8 In a prospective surveillance program, more intensive treatment (e.g., congestive decompressive therapy) is indicated when a difference in volume measurements is ≥ 10% compared to pre-surgery values Consensus achieved in round 2 91.7% (44/48)",
      grade: "Consensus 91.7%",
    },
    {
      action: "For early visible lymphoedema, fit a compression garment individually, teach an exercise programme and give education as first-line treatment",
      why: "APTA grades this first-line combination A. NICE also offers compression therapy as the first stage of lymphoedema management, with a shared decision on the form of compression.",
      source: "apta-2020",
      quote: "If early signs and/or symptoms of lymphedema are noted, the patient should be individually fitted with a compression garment, instructed in an exercise program, and provided education as first-line treatment. (Grade A)",
      grade: "Grade A",
    },
    {
      action: "For moderate or late lymphoedema, give complete decongestive therapy with compression bandaging and exercise, then a home programme of self-massage, a fitted garment, night compression if needed, and exercise",
      why: "APTA uses decongestive therapy to reduce limb volume, and recommends the home programme once a stable reduction has been reached.",
      source: "apta-2020",
      quote: "CDT should be used to reduce limb volume in those diagnosed with moderate and late BCRL. (Grade B) Compression bandaging and exercise are key components of CDT and should be used. (Grade A)",
      grade: "Grade B (CDT); Grade A (bandaging and exercise within CDT); Grade B (home programme)",
    },
    {
      action: "Encourage aerobic exercise and supervised, progressive resistance training from at least one month after surgery, with weekly checks at first",
      why: "APTA rates supervised, gradually progressed resistance training as safe, and in the PAL trial slowly progressive weight lifting did not increase new lymphoedema. NICE says there is no indication that physical activity causes or worsens lymphoedema.",
      source: "apta-2020",
      quote: "Progressive resistance training is safe when an individualized program is supervised beginning at least 1 month postsurgery. (Grade A) Individualized aerobic exercise programs should be provided. (Grade A) Monitoring for exercise tolerance and adverse effects should initially occur at least weekly and then taper according to clinical presentation. (Grade A)",
      grade: "Grade A",
    },
    {
      action: "Before treatment starts, give information on skin care, ways to reduce the risk of infection, the early signs of swelling and infection, and who to contact",
      why: "Cellulitis in the at-risk arm was linked to arm swelling in a large cohort (Ferguson 2016). The NHS advises contacting a GP as soon as possible about symptoms of a possible skin infection, which may include redness or a feeling of heat in the skin.",
      source: "nice-ng101",
      quote: "risk reduction strategies, such as maintaining a healthy body weight, ways to reduce their risk of infection, and advice on skincare (for example, use of moisturiser and sunscreen) and physical activity",
      grade: "NICE recommendation 1.14.1 [2018, amended 2025]; NICE does not grade",
    },
    {
      action: "Give risk-reduction advice that matches the evidence, and decide together whether to use the treated arm for a procedure, instead of forbidding all blood pressure readings, blood tests or flights by rule",
      why: "The evidence map found the evidence sufficient to refute many of the claimed risk factors and kept wound infection as a risk; it notes concern that such warnings may cause fear and avoidance. NICE (2025) finds no consistent evidence of increased risk from medical procedures on the treated side or from air travel, and asks for a shared decision. The NHS lymphoedema page still advises avoiding injections and blood pressure readings in the affected area whenever possible.",
      source: "precautions-2024",
      quote: "Patient education about precautionary risks needs to be concordant with what is currently evidenced in the literature.",
    },
  ],
  bestInClass: {
    statement: "Prospective surveillance from a preoperative baseline, with a compression sleeve when subclinical change appears, is the approach the two specialist guidelines support: MASCC 2024 recommends it by consensus where feasible and resources allow (93.8% agreement, on a systematic review of surveillance programmes) and APTA 2020 says it may improve outcomes (Grade C). In the PREVENT randomised trial (2022) fewer people progressed to chronic lymphoedema after bioimpedance-triggered compression than after tape-measure-triggered compression; MASCC points to an imbalance of risk factors between the arms and treats bioimpedance as an option, not a standard of care. NICE NG101 (England, updated 2025) does not recommend scheduled clinic measurement: its committee judged regular hospital monitoring difficult to implement and asks instead for information on self-monitoring and baseline limb measurements. Exercise, including progressive resistance training, is safe (APTA Grade A; NICE agrees). Treatment of established lymphoedema follows APTA 2020 by stage (Grade A for garment, exercise and education in early disease; Grade B for CDT later), and NICE offers compression therapy as the first stage. On the arm precautions, the 2024 summit evidence map and NICE 2025 move away from blanket prohibitions: in the largest cohort blood draws, injections and air travel were not associated with arm volume increase and blood pressure readings were not on multivariate analysis, whereas infection was. The NHS public page (reviewed 2023) still lists avoiding injections and blood pressure readings in the affected area. The 2017 ASBrS panel, which also addressed the precautions, could not be read. The guidelines disagree on prophylactic sleeves: MASCC offers them as an option to people at risk (80% agreement), APTA grades a fitted garment for high-risk patients, paired with exercise, at B, and NICE says compression therapy should not be offered as a risk-reducing measure.",
    sources: ["mascc-2024", "apta-2020", "nice-ng101", "prevent-2022", "prevent-timing-2024", "apta-dx-2017", "precautions-2024", "summit-consensus-2024", "ferguson-2016", "nhs-lymphoedema-prevention", "asbrs-2017"],
  },
  variants: [
    {
      name: "Traditional arm precautions (no blood pressure, blood draws, injections or cannulas in the at-risk arm; compression for flights)",
      differs: "Teaches every person at risk to avoid any procedure or exposure on the treated side, for life.",
      evidence: "The NHS lymphoedema prevention page (reviewed March 2023) advises not having injections or blood pressure readings in the affected area whenever possible. In the Ferguson cohort, blood draws, injections and flying were not associated with arm volume increase; blood pressure readings were associated on univariate analysis (P = .034) and not on multivariate analysis. The 2024 evidence map (37 studies, 2008 to 2023) found evidence sufficient to refute many previously claimed risk factors for developing lymphoedema, and scant evidence on progression once it exists. NICE (2025) says there is no consistent evidence of increased risk from medical procedures on the treated side, air travel, travel to hot countries or hot tub use, and asks for a shared decision on using the treated arm. The 2024 ACS/LANA consensus updated recommendations on blood pressure, skin puncture, blood draws, air travel and heat; its specific wording could not be read (abstract only).",
      sources: ["nhs-lymphoedema-prevention", "ferguson-2016", "precautions-2024", "nice-ng101", "summit-consensus-2024"],
    },
    {
      name: "Tape-measure surveillance instead of bioimpedance",
      differs: "Circumference measured with a tape at set points, converted to volume, instead of a bioimpedance device.",
      evidence: "In PREVENT, tape measurement triggered intervention more often (27.5 against 20.1 per cent) and more of those treated progressed (19.2 against 7.9 per cent). MASCC notes that the bioimpedance arm had more stage I disease and fewer axillary dissections, treats bioimpedance as an option, not a standard of care, and accepts arm circumference or volume measurement where bioimpedance is not available.",
      sources: ["prevent-2022", "mascc-2024"],
    },
    {
      name: "MASCC surveillance schedule",
      differs: "Starts within 3 months of surgery, measures every 3 to 4 months in the first year, then every 6 to 12 months, for at least 24 months (APTA: every 3 months in the first year, then twice a year for up to 5 years).",
      evidence: "MASCC 2024 Delphi consensus: 85.9% (interval), 82.8% (start within 3 months), 89.1% (at least 24 months). PREVENT's timing analysis advises at least 3 years.",
      sources: ["mascc-2024", "apta-2020", "prevent-timing-2024"],
    },
    {
      name: "NICE (England): information and self-monitoring, with no scheduled clinic measurement",
      differs: "Gives people information before treatment on early signs, how to self-monitor and how to collect baseline measurements of the limb, and who to contact, without a schedule of clinic measurements.",
      evidence: "NICE NG101 recommendation 1.14.1 (amended 2025; NICE does not grade). The committee saw some evidence that early intervention leads to better outcomes but agreed that regular hospital monitoring with recorded baselines would be difficult to implement in practice.",
      sources: ["nice-ng101"],
    },
    {
      name: "Prospective surveillance plus a supervised exercise programme",
      differs: "Adds a 12-week supervised multimodal exercise programme to surveillance in high-risk women having adjuvant chemotherapy.",
      evidence: "Single-centre randomised trial of 116 women: the combination reduced arm volume and improved grip strength, walking distance and quality of life over surveillance alone. Read as an abstract.",
      sources: ["apmr-2025"],
    },
    {
      name: "Prophylactic compression sleeve for everyone at high risk",
      differs: "Fits a sleeve from the first day after surgery until 3 months after the end of adjuvant treatment (hormone treatment not counted), at least 8 hours a day.",
      evidence: "Offered as an option by MASCC 2024 (80% agreement, on a single randomised trial; experts who disagreed said one trial should not set routine practice); APTA 2020 Grade B for a fitted garment with exercise in high-risk patients. NICE (2025) says compression therapy should not be offered as a risk-reducing measure, finding the evidence insufficient and inconsistent.",
      sources: ["mascc-2024", "apta-2020", "nice-ng101"],
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
      evidence: "MASCC 2024: an option where expertise is available and resources allow; reverse mapping not for people at high risk of axillary recurrence. NICE (2025) makes no recommendation of its own and points to its interventional procedures guidance on lymphovenous anastomosis, which sets special arrangements for governance, consent and audit or research.",
      sources: ["mascc-2024", "nice-ng101"],
    },
  ],
  grades: [
    { claim: "Prospective surveillance is recommended where feasible", grade: "Consensus 93.8% (MASCC)", source: "mascc-2024", quote: "2.1 A prospective surveillance program is recommended to reduce risks of chronic lymphoedema after breast cancer surgery where feasible and resources allow Consensus achieved in round 1 93.8% (60/64)" },
    { claim: "Prospective surveillance in high-risk groups", grade: "Grade C", source: "apta-2020", quote: "Early identification of subclinical lymphedema in high-risk groups through prospective surveillance may improve outcomes. (Grade C)" },
    { claim: "A pre-surgical baseline is required for surveillance", grade: "Consensus 89.1% (MASCC)", source: "mascc-2024", quote: "2.11 Pre-surgical assessment of lymphoedema is required in a prospective surveillance program for better comparison of measurements after surgery Consensus achieved in round 1 89.1% (57/64)" },
    { claim: "Surveillance every 3 to 4 months in year 1, then every 6 to 12 months", grade: "Consensus 85.9% (MASCC)", source: "mascc-2024", quote: "2.12 The surveillance interval for a prospective surveillance program is recommended to be every 3–4 months in the first year then every 6–12 months thereafter where feasible and resources allow Consensus achieved in round 1 85.9% (55/64)" },
    { claim: "Bioimpedance cut-offs for diagnosis", grade: "Grade B", source: "apta-dx-2017", quote: "Cutpoint of >7.1 L-Dex score should be used for diagnosis of breast cancer–related lymphedema when preoperative baseline measures are not available (Grade B) – Cutpoint of >10 L-Dex score above preoperative baseline should be used for diagnosis of breast cancer–related lymphedema (Grade B)" },
    { claim: "Bioimpedance-triggered compression reduced progression against tape measure", grade: "randomised trial, P = 0.016", source: "prevent-2022", quote: "Overall, 14.4% (n = 30) progressed post-intervention, with reduced likelihood for BIS patients than TM patients (7.9%, n = 7 vs. 19.2%, n = 23; relative risk = 0.41; 95% CI, 0.13-0.81; absolute reduction 11.3%; 95% CI, 2.3-20.3; p = 0.016)." },
    { claim: "Prophylactic sleeves offered as an option", grade: "Consensus 80% (MASCC)", source: "mascc-2024", quote: "3.1 Prophylactic compression sleeves should be offered as an option to prevent breast cancer- related arm lymphoedema Consensus achieved in round 2 80% (40/50)" },
    { claim: "Fitted compression garment with exercise for high-risk patients", grade: "Grade B (APTA)", source: "apta-2020", quote: "Provision of a fitted compression garment to patients at high risk of developing lymphedema, when paired with upper extremity exercise and diaphragmatic breathing, may reduce development of lymphedema. (Grade B)" },
    { claim: "Manual lymphatic drainage after axillary dissection does not clearly prevent lymphoedema", grade: "Grade C", source: "apta-2020", quote: "The addition of therapist-provided manual lymphatic drainage (MLD) to the postoperative care plan may not reduce the risk of developing BCRL. (Grade C)" },
    { claim: "Weight lifting does not increase lymphoedema", grade: "Randomised equivalence trial, n=154 (PAL)", source: "pal-2010", quote: "In breast cancer survivors at risk for lymphedema, a program of slowly progressive weight lifting compared with no exercise did not result in increased incidence of lymphedema." },
    { claim: "Cellulitis raises the risk; blood draws, injections, blood pressure readings and air travel may not", grade: "Prospective cohort (not a guideline grade)", source: "ferguson-2016", quote: "This study suggests that although cellulitis increases risk of lymphedema, ipsilateral blood draws, injections, blood pressure readings, and air travel may not be associated with arm volume increases." },
    { claim: "Compression is not offered to prevent lymphoedema (NICE)", grade: "NICE recommendation 1.14.4 [2025]; NICE does not grade", source: "nice-ng101", quote: "Do not offer compression therapy as a risk-reducing measure to people who are at risk of breast-cancer-related lymphoedema. [2025]" },
    { claim: "Medical procedures on the treated side: no consistent evidence of risk (NICE)", grade: "NICE recommendation 1.14.1 [2018, amended 2025]; NICE does not grade", source: "nice-ng101", quote: "that there is no consistent evidence of increased risk of lymphoedema associated with medical procedures (for example, blood tests, injections, intravenous medicines and blood pressure measurement) on the treated side" },
    { claim: "Compression is the first stage of managing lymphoedema (NICE)", grade: "NICE recommendation 1.14.9 [2025]; NICE does not grade", source: "nice-ng101", quote: "Offer compression therapy as the first stage of lymphoedema management. Make a shared decision with the person about the form of compression that is best for them. [2025]" },
    { claim: "When to contact a GP about possible skin infection (NHS)", grade: "NHS public information; not graded", source: "nhs-lymphoedema-prevention", quote: "Contact a GP as soon as possible if you develop symptoms of a possible skin infection. These symptoms may include redness or a feeling of heat in the skin." },
    { claim: "Evidence too thin for other cancers", grade: "Consensus statement (ACS/LANA)", source: "summit-consensus-2024", quote: "More high-quality evidence is required to allow the development of risk reduction recommendations for other cancer types such as gynecological, melanoma, and head and neck." },
  ],
  sources: [
    { key: "mascc-2024", label: "Wong et al., MASCC clinical practice guidance for the prevention of breast cancer-related arm lymphoedema: international Delphi consensus-based recommendations (eClinicalMedicine 2024)", publisher: "Multinational Association of Supportive Care in Cancer", year: 2024, url: "https://doi.org/10.1016/j.eclinm.2024.102441", doi: "10.1016/j.eclinm.2024.102441", gradingScheme: "Modified Delphi; each statement printed with the round and percentage agreement (consensus at 75% or more).", read: "full-text", accessed: "2026-11-17" },
    { key: "apta-2020", label: "Interventions for Breast Cancer-Related Lymphedema: Clinical Practice Guideline From the Academy of Oncologic Physical Therapy of APTA", publisher: "APTA Academy of Oncologic Physical Therapy, Physical Therapy", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7412854/", doi: "10.1093/ptj/pzaa087", gradingScheme: "Grade A (strong), B (moderate) and C (weak), plus Best Practice statements based on current clinical norms or expert opinion.", read: "full-text", accessed: "2026-11-17" },
    { key: "apta-dx-2017", label: "Diagnosis of Upper Quadrant Lymphedema Secondary to Cancer: Clinical Practice Guideline From the Oncology Section of the American Physical Therapy Association", publisher: "APTA Oncology Section, Physical Therapy", year: 2017, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5803775/", doi: "10.1093/ptj/pzx050", gradingScheme: "Grade A (strong), B (moderate), C (weak), D (theoretical or foundational), plus Expert Opinion.", read: "full-text", accessed: "2026-11-17" },
    { key: "prevent-2022", label: "A Comparison of Bioimpedance Spectroscopy or Tape Measure Triggered Compression Intervention in Chronic Breast Cancer Lymphedema Prevention (PREVENT)", publisher: "Lymphatic Research and Biology", year: 2022, url: "https://europepmc.org/abstract/MED/35099283", doi: "10.1089/lrb.2021.0084", gradingScheme: "Randomised trial; no recommendation grade.", read: "full-text", accessed: "2026-11-17" },
    { key: "prevent-timing-2024", label: "Timing of Breast Cancer Related Lymphedema Development Over 3 Years: Observations from a Large, Prospective Randomized Screening Trial Comparing Bioimpedance Spectroscopy Versus Tape Measure", publisher: "Annals of Surgical Oncology", year: 2024, url: "https://europepmc.org/abstract/MED/38965099", doi: "10.1245/s10434-024-15706-x", read: "abstract", accessed: "2026-11-17" },
    { key: "precautions-2024", label: "Current evidence on patient precautions for reducing breast cancer-related lymphedema manifestation and progression risks", publisher: "Medical Oncology (2023 ACS/LANA Lymphedema Summit)", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11486782/", doi: "10.1007/s12032-024-02408-3", gradingScheme: "Evidence map of 37 studies; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "summit-consensus-2024", label: "Evidence-based recommendations regarding risk reduction practices for people at risk of or with breast cancer-related lymphedema: consensus from an expert panel", publisher: "Medical Oncology (2023 ACS/LANA Lymphedema Summit)", year: 2024, url: "https://europepmc.org/abstract/MED/39438352", doi: "10.1007/s12032-024-02510-6", gradingScheme: "Expert consensus on the evidence; grades not visible in the abstract.", read: "abstract", accessed: "2026-11-17" },
    { key: "ferguson-2016", label: "Ferguson et al., Impact of Ipsilateral Blood Draws, Injections, Blood Pressure Measurements, and Air Travel on the Risk of Lymphedema for Patients Treated for Breast Cancer (J Clin Oncol 2016)", publisher: "Journal of Clinical Oncology", year: 2016, url: "https://doi.org/10.1200/JCO.2015.61.5948", doi: "10.1200/JCO.2015.61.5948", gradingScheme: "Prospective cohort; no recommendation grade.", read: "full-text", accessed: "2026-11-17" },
    { key: "pal-2010", label: "Schmitz et al., Weight Lifting for Women at Risk for Breast Cancer-Related Lymphedema: a randomized trial (JAMA 2010)", publisher: "JAMA", year: 2010, url: "https://doi.org/10.1001/jama.2010.1837", doi: "10.1001/jama.2010.1837", gradingScheme: "Randomised controlled equivalence trial; no recommendation grade.", read: "abstract", accessed: "2026-11-17" },
    { key: "apmr-2025", label: "Randomized Trial Assessing Prospective Surveillance and Exercise for Preventing Breast Cancer-Related Lymphedema in High-Risk Patients", publisher: "Archives of Physical Medicine and Rehabilitation", year: 2025, url: "https://europepmc.org/abstract/MED/40081785", doi: "10.1016/j.apmr.2025.03.002", read: "abstract", accessed: "2026-11-17" },
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management. NICE guideline NG101, recommendations 1.14.1 to 1.14.11 on lymphoedema (published 18 July 2018, last updated 14 April 2025)", publisher: "National Institute for Health and Care Excellence", year: 2025, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider, do not offer) carries the strength, and each is dated in square brackets.", read: "full-text", accessed: "2026-11-17" },
    { key: "nhs-lymphoedema-prevention", label: "Lymphoedema: prevention (NHS, page last reviewed 29 March 2023)", publisher: "NHS", year: 2023, url: "https://www.nhs.uk/conditions/lymphoedema/prevention/", gradingScheme: "Public information page; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "asbrs-2017", label: "Considerations for Clinicians in the Diagnosis, Prevention, and Treatment of Breast Cancer-Related Lymphedema: Recommendations from a Multidisciplinary Expert ASBrS Panel, Part 1: Definitions, Assessments, Education, and Future Directions", publisher: "American Society of Breast Surgeons, Annals of Surgical Oncology", year: 2017, url: "https://doi.org/10.1245/s10434-017-5982-4", doi: "10.1245/s10434-017-5982-4", read: "not-reachable", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-acc-lymphoedema-prospective-surveillance", "idea-upgrade-evidence-based-arm-precautions-after-breast-cancer"],
  gaps: [
    "The 2018 update to the APTA bioimpedance recommendations was not read: on 17 November 2026 Europe PMC held only its title and the publisher's PDF returned 403. The L-Dex cut-offs given from APTA are therefore the 2017 ones and may have been revised; MASCC's 2024 trigger of an L-Dex rise of 6.5 or more differs from them.",
    "The ACS/LANA 2024 risk-reduction consensus was read only as an abstract (on 17 November 2026 the publisher's page answered a script with a browser check); its specific wording on blood pressure, blood draws, injections, air travel, heat and saunas is not given here.",
    "The ASBrS 2017 expert panel recommendations (Parts 1 and 2) could not be read: Europe PMC holds no abstract.",
    "The PREVENT timing analysis, the PAL trial and the 2025 surveillance and exercise trial were read only as abstracts.",
    "Guidelines disagree on whether clinics should measure on a schedule and on prophylactic sleeves: MASCC and APTA support surveillance and allow a preventive garment, while NICE (2025) asks for self-monitoring and says compression should not be offered to reduce risk. No source read settles this.",
    "Which surveillance method is best (bioimpedance or measurement) and the right threshold are not fully settled; MASCC accepts both and calls for more study, while PREVENT favoured bioimpedance.",
    "Whether prophylactic sleeves help everyone at risk rests on one randomised trial with one year of follow-up (MASCC 2024).",
    "Public advice has not caught up everywhere: the NHS lymphoedema prevention page, last reviewed in March 2023 and due for review in March 2026, still advises avoiding injections and blood pressure readings in the affected area, which NICE's 2025 update and the 2024 evidence map do not support as a rule.",
    "No source read gives a time limit for reporting new arm swelling; the NHS says to see a GP, and to contact a GP as soon as possible about possible skin infection. NICE asks that people are told who to contact and names cellulitis and deep vein thrombosis as complications needing urgent medical attention.",
    "No British Lymphology Society guidance and no NCCN survivorship guideline was read. The International Society of Lymphology 2023 consensus was read only as an abstract.",
    "The ACS/LANA 2024 consensus says more high-quality evidence is needed before risk-reduction recommendations can be made for other cancers such as gynaecological cancers, melanoma and head and neck cancer; this page has no steps for them.",
  ],
  technologies: ["lymphoedema-decongestive-therapy", "lymphoedema-surgery-and-early-detection", "rejuv-measure-lymphoedema", "pneumatic-compression-lymphoedema", "sentinel-node"],
  cancers: ["breast-cancer"],
  terms: ["breast-cancer-related-lymphoedema", "lymphoedema-after-breast-cancer"],
  related: ["exercise-during-and-after-cancer-treatment", "breast-cancer-follow-up-after-treatment", "sentinel-node-tracers-and-blue-dye-safety"],
  sections: ["supportive-care"],
  tags: ["protocol", "lymphoedema", "survivorship", "breast-cancer"],
});
