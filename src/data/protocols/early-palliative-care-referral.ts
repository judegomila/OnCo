import { protocol } from "./helpers";

/*
 * Referral to specialist palliative care alongside cancer treatment: who should be referred, on what criteria, and
 * within what time of a diagnosis of advanced cancer. The technology record `palliative-care` describes what early
 * integrated palliative care is; this record carries the referral steps and shows the two guideline positions side by
 * side: referral by time for everyone with advanced cancer, and referral by need against criteria.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ASCO guideline update 2024, Palliative Care for Patients With Cancer (Sanders et al., J Clin Oncol 2024): abstract
 *   only, Europe PMC. ascopubs.org returned 403 to a script and Europe PMC holds no full text. The abstract gives the
 *   recommendations without their evidence ratings and says referral should begin "early in the course of the
 *   disease".
 * - Hui et al., Referral criteria for outpatient specialty palliative cancer care: an international consensus (Lancet
 *   Oncol 2016): abstract only, Europe PMC. The 11 major criteria are listed in the abstract; the 36 minor criteria
 *   are behind a paywall and were not read.
 * - Hui, Heung and Bruera, Timely Palliative Care: Personalizing the Process of Referral (Cancers 2022): full text,
 *   Europe PMC XML (PMC8870673). A narrative review by authors of the consensus, not a guideline.
 * - NICE NG142, End of life care for adults: service delivery (2019): recommendations page, full text.
 * - ESMO position paper on supportive and palliative care (Jordan et al., Ann Oncol 2018) and the Lancet Oncology
 *   Commission on integration of oncology and palliative care (Kaasa et al., 2018): abstracts only.
 * - Trials and reviews, all as abstracts from Europe PMC: Temel 2010 (N Engl J Med), Zimmermann 2014 (Lancet), Bakitas
 *   2015 (ENABLE III, J Clin Oncol), Temel 2017 (J Clin Oncol), Vanbutsele 2018 (Lancet Oncol), Groenvold 2017 (DanPaCT,
 *   Palliat Med), Zimmermann 2021 (STEP, J Natl Compr Canc Netw), Temel 2024 (stepped palliative care, JAMA) and the
 *   Cochrane review of Haun et al. 2017.
 *
 * Not read, and nothing rests on them:
 * - ASCO guideline update 2017, Integration of Palliative Care Into Standard Oncology Care (Ferrell et al.), the
 *   edition the 2024 update replaces: ascopubs.org returned 403 to a script. Its abstract, read through Europe PMC,
 *   gives no number of weeks, so no time from diagnosis is stated on this page.
 * - GMC, Treatment and care towards the end of life: gmc-uk.org returned 403 to a script.
 *   (An earlier draft of this file used Internet Archive copies of both; that is a way round a block, so every step,
 *   grade row and sentence that rested on them was removed or re-sourced on the lead's ruling.)
 * - A current ESMO clinical practice guideline on when to refer to palliative care was not found (the position paper is
 *   the ESMO text read); the NCCN palliative care guideline sits behind a registration wall; NICE's evidence review B
 *   on the timing of referral, which NG142 names, was not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const earlyPalliativeCareReferral = protocol({
  id: "early-palliative-care-referral",
  name: "Early palliative care alongside cancer treatment: referral criteria and timing",
  aka: ["early palliative care", "palliative care referral", "integrated palliative care", "timely palliative care", "concurrent palliative care", "supportive and palliative care referral", "specialist palliative care referral", "when to refer to palliative care"],
  domain: "palliative",
  tldr: "Palliative care is specialist help with symptoms, worries and decisions, and can be given alongside cancer treatment, not only near the end of life. Guidelines agree on early referral in advanced cancer but differ on how: one approach refers everyone early in the illness, another refers when a person has severe symptoms, distress or decisions to make. You can also ask for a referral yourself.",
  simple: "A palliative care team helps with pain, other symptoms, worries and planning. Seeing them does not mean treatment is stopping. If your cancer is advanced, your team should offer a referral early, and you can ask for one.",
  summary: "This page explains when a referral to specialist palliative care is recommended, so that patients and families know what to ask for; your own team's pathway and local services come first. ASCO (2024 update, read as an abstract) says oncology clinicians should refer patients with advanced solid tumours and haematological malignancies to specialised interdisciplinary palliative care teams early in the course of the disease, alongside active treatment, and that cancer programmes should provide specialist palliative care for patients with unaddressed physical, psychosocial or spiritual distress. ESMO's 2018 position paper says supportive and palliative care should start at diagnosis. Neither text, as read, gives a number of weeks; the full ASCO guidelines could not be read. The second position refers by need. An international Delphi panel of 60 experts (Hui 2016) agreed 11 major criteria, any one of which is reason to refer; nine are needs and two are times (within 3 months of an advanced cancer diagnosis where median survival is a year or less, and progression despite second-line treatment). NICE NG142 sets no time: it asks services to identify adults approaching the end of life and to assess their holistic needs. The trials: in Temel 2010 (151 patients, metastatic non-small-cell lung cancer, one US centre) early palliative care improved quality of life and depressive symptoms at 12 weeks, and median survival was 11.6 against 8.9 months; a median is the middle of a group, so half of each group lived longer than its figure. A Cochrane review (2017, seven trials, 1,614 participants) found a small improvement in quality of life on low-certainty evidence and no clear difference in survival. A Danish trial that referred by screened need (DanPaCT, 297 patients) found no effect on its primary outcome. A US trial of stepped palliative care (507 patients with advanced lung cancer) found quality of life no worse with visits stepped up by need than with monthly visits, with about half the visits.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit", "community", "home"],
  },
  population: "Adults with advanced cancer (metastatic or otherwise incurable solid tumours, and haematological malignancies in the ASCO 2024 update) who are having, or could have, anticancer treatment. ASCO's guidance is written for the United States; the consensus criteria come from an international panel and were written for outpatient clinics at secondary or tertiary hospitals; NICE NG142 covers adults in England approaching the end of life with any condition. Most trials enrolled people with a performance status of 0 to 2 at large centres, many of them with lung or gastrointestinal cancers. Children and young people, and care in the last days of life, are covered elsewhere. What is available differs between hospitals and between countries, and your own team's referral pathway comes first.",
  trigger: "A new diagnosis of advanced cancer, or at any later point a severe symptom, emotional or spiritual distress, a need for help with decisions or planning, progression on treatment, or a request from the patient or family.",
  steps: [
    {
      action: "Refer people with advanced cancer to a specialist interdisciplinary palliative care team early, while cancer treatment continues",
      why: "In trials, people seen by a palliative care team from early on reported better quality of life than those seen only when problems became severe.",
      source: "asco-2024",
      quote: "Oncology clinicians should refer patients with advanced solid tumors and hematologic malignancies to specialized interdisciplinary palliative care teams that provide outpatient and inpatient care beginning early in the course of the disease, alongside active treatment of their cancer.",
      grade: "Recommendation (rating not given in the abstract)",
    },
    {
      action: "Explain that palliative care is given alongside treatment and is not only care at the end of life",
      why: "Many people take the words to mean care in the last days only, and that belief delays help that could have come sooner.",
      source: "lancet-oncology-commission-2018",
      quote: "Other barriers include the common misconception that palliative care is end-of-life care only, stigmatisation of death and dying, and insufficient infrastructure and funding.",
      grade: "Commission report (not graded)",
    },
    {
      action: "Needs-based approach: refer when any one of the consensus major criteria is met, such as severe physical or emotional symptoms, spiritual or existential crisis, a need for help with decisions or care planning, delirium, spinal cord compression, or brain or leptomeningeal metastases",
      why: "Specialist teams are scarce, and referring by need directs them to the people most likely to benefit at the time they need it.",
      source: "hui-delphi-2016",
      quote: "Panellists reached consensus on 11 major criteria for referral: severe physical symptoms, severe emotional symptoms, request for hastened death, spiritual or existential crisis, assistance with decision making or care planning, patient request for referral, delirium, spinal cord compression, brain or leptomeningeal metastases, within 3 months of advanced cancer diagnosis for patients with median survival of 1 year or less, and progressive disease despite second-line therapy.",
      grade: "International Delphi consensus (60 experts; agreement of 70% or more)",
    },
    {
      action: "Treat a request from the patient as a reason to refer in its own right",
      why: "The person living with the illness is often the first to know that symptoms or worries have gone beyond what the clinic visit can address.",
      source: "hui-timely-2022",
      quote: "Panelists reached consensus on 11 major criteria for referral (Table 2)—the presence of any criterion would be sufficient reason for a patient to be referred.",
      grade: "Narrative review reporting the Delphi consensus",
    },
    {
      action: "Screen symptoms and supportive care needs routinely in the oncology clinic, and have a way for a positive screen to trigger the referral",
      why: "Needs that are not asked about are not found, and a referral that depends on someone remembering is often late.",
      source: "hui-timely-2022",
      quote: "It requires four components: (1) routine screening of supportive care needs at the oncology clinics, (2) establishment of institution-specific consensual criteria for referral, (3) having a system in place to trigger a referral when patients meet criteria, and (4) availability of outpatient palliative care resources to provide timely access (Figure 1).",
      grade: "Narrative review (not a guideline)",
    },
    {
      action: "Provide specialist palliative care for people with physical, psychosocial or spiritual distress that existing supportive care has not resolved",
      why: "Distress that continues despite the usual measures is the clearest sign that more specialised help is needed.",
      source: "asco-2024",
      quote: "For patients with cancer with unaddressed physical, psychosocial, or spiritual distress, cancer care programs should provide dedicated specialist palliative care services complementing existing or emerging supportive care interventions.",
      grade: "Recommendation (rating not given in the abstract)",
    },
    {
      action: "When someone is thought to be approaching the end of life, carry out and record a holistic needs assessment",
      why: "Looking at physical, emotional, social and spiritual needs together shows what support is needed and when.",
      source: "nice-ng142",
      quote: "If it is thought that an adult is approaching the end of their life, carry out an initial holistic needs assessment with the person and document this.",
      grade: "Not graded (NICE NG142 1.2.1)",
    },
    {
      action: "Offer the family or friends who are caring for the person a referral for support of their own",
      why: "Carers carry much of the work of advanced illness, and their own health and coping affect the patient's.",
      source: "asco-2024",
      quote: "Oncology clinicians from across the interdisciplinary cancer care team may refer the caregivers (eg, family, chosen family, and friends) of patients with cancer to palliative care teams for additional support.",
      grade: "Recommendation (rating not given in the abstract)",
    },
    {
      action: "Consider referral for people with solid tumours taking part in phase 1 trials",
      why: "People in early trials often have advanced disease and a heavy symptom load, and palliative care does not conflict with taking part.",
      source: "asco-2024",
      quote: "Clinicians caring for patients with solid tumors on phase I cancer trials may also refer them to specialist palliative care.",
      grade: "Recommendation (rating not given in the abstract)",
    },
  ],
  bestInClass: {
    statement: "Every source read agrees that specialist palliative care belongs alongside cancer treatment for people with advanced cancer and should start early rather than at the end. They disagree on what triggers the referral, and both positions are shown here. Position one, by time and for everyone: ASCO's 2024 update, read as an abstract, says oncology clinicians should refer patients with advanced solid tumours and haematological malignancies to specialist teams beginning early in the course of the disease, alongside active treatment; ESMO's 2018 position paper says supportive and palliative care should start at the time of diagnosis. Neither gives a number of weeks in the text that could be read, and the full ASCO guidelines of 2017 and 2024, which might set one, were not reachable. The trials behind this position enrolled people soon after diagnosis: within 12 weeks of a new primary tumour or a diagnosis of progression in Vanbutsele 2018, and newly diagnosed in Temel 2010 and Temel 2017. Position two, by need: the international Delphi consensus (Hui 2016, 60 experts) defines 11 major criteria, nine of them needs and two of them times, and its authors argue that there are not enough specialist teams to see everyone from diagnosis. NICE NG142 sets no time and asks for systematic identification of adults approaching the end of life and a holistic needs assessment. The 2024 ASCO abstract carries both ideas, suggesting early involvement especially for patients with uncontrolled symptoms and quality of life concerns. The evidence for referral by time: Temel 2010 (151 patients, one centre) found better quality of life (98.0 against 91.5 on a 0 to 136 scale), fewer patients with depressive symptoms (16 against 38 per cent) and longer median survival (11.6 against 8.9 months; half of each group lived longer than its median). Zimmermann 2014 (461 patients, 24 clinics) missed its primary quality of life endpoint at 3 months (p = 0.07) and found differences favouring palliative care at 4 months. Temel 2017 (350 patients) found improvement at 24 weeks but not at 12. Vanbutsele 2018 (186 patients, Belgium) found better quality of life at 12 weeks. ENABLE III (207 patients) compared starting at once with starting 3 months later: patient-reported outcomes did not differ, and one-year survival was 63 against 48 per cent. The Cochrane review (2017) rated the quality of life benefit small and of low certainty and found no clear survival difference (hazard ratio 0.85, 95% CI 0.56 to 1.28, very low certainty). The evidence for referral by need: DanPaCT (297 patients screened for need) found no effect on the primary outcome; a phase 2 study of symptom screening with triggered referral (STEP, 116 patients) found it feasible; and stepped palliative care (507 patients with advanced lung cancer) was non-inferior to monthly visits for quality of life at 24 weeks with 2.4 against 4.7 visits, though non-inferiority was not shown for days in hospice (19.5 against 34.6). No trial read compares referral for everyone at diagnosis with referral against the consensus criteria.",
    sources: ["asco-2024", "esmo-position-2018", "hui-delphi-2016", "hui-timely-2022", "nice-ng142", "temel-2010", "zimmermann-2014", "temel-2017", "vanbutsele-2018", "bakitas-enable-iii-2015", "haun-cochrane-2017", "groenvold-danpact-2017", "zimmermann-step-2021", "temel-stepped-2024"],
  },
  variants: [
    {
      name: "Stepped palliative care",
      differs: "One palliative care visit within 4 weeks of enrolment, then visits only at a change of cancer treatment or after a hospital admission, with quality of life measured every 6 weeks; a fall of 10 points or more steps the patient up to visits every 4 weeks. Tested in people diagnosed with advanced lung cancer within the previous 12 weeks.",
      evidence: "Randomised non-inferiority trial, 507 patients, three US academic centres: quality of life at week 24 non-inferior (adjusted mean 100.6 with stepped care against 97.8 with early palliative care), mean visits 2.4 against 4.7, end-of-life care communication non-inferior, and \"noninferiority was not demonstrated for days in hospice (adjusted mean, 19.5 with stepped palliative care vs 34.6 with early palliative care; P = .91)\".",
      sources: ["temel-stepped-2024"],
    },
    {
      name: "Symptom screening that triggers the referral",
      differs: "Symptoms are scored at each oncology visit; a moderate to severe score sends a message to a palliative care nurse, who telephones the patient and offers a visit (STEP, Toronto). In DanPaCT (Denmark) consecutive patients were screened with a quality of life questionnaire and those above a threshold were randomised to referral or standard care.",
      evidence: "STEP phase 2 (116 patients, not randomised between receiving and not receiving palliative care): 70 screened positive and 39 of them received early palliative care within 6 months; mood and symptom control improved over time in those who received it and worsened in those who did not, with no difference in quality of life. DanPaCT (145 against 152 patients): no effect on the primary outcome (-4.9 points, 95% CI -11.3 to +1.5, p = 0.14); the authors wrote \"We did not observe beneficial or harmful effects of early specialist palliative care, but important beneficial effects cannot be excluded.\"",
      sources: ["zimmermann-step-2021", "groenvold-danpact-2017"],
    },
    {
      name: "Starting at once or three months later, by telephone coaching",
      differs: "ENABLE III gave an in-person palliative care consultation, six weekly structured telephone coaching sessions with a nurse and monthly follow-up, started either early after enrolment or 3 months later, at a US cancer centre, a veterans' hospital and community outreach clinics.",
      evidence: "207 patients: patient-reported quality of life, symptom impact and mood did not differ between the groups; one-year survival was 63 per cent in the early group and 48 per cent in the delayed group (p = 0.038). The authors call the mechanism of any survival effect an open research question.",
      sources: ["bakitas-enable-iii-2015"],
    },
    {
      name: "England: identification tools rather than a referral clock",
      differs: "NICE NG142 asks services for systems to identify adults likely to be approaching the end of life, naming the Gold Standards Framework, the Amber Care Bundle and the Supportive and Palliative Care Indicators Tool as examples, followed by a holistic needs assessment and care from a team with the skills to meet the needs found. It gives no number of weeks from diagnosis.",
      evidence: "NICE does not grade its recommendations. NG142 lists an evidence review on the timing of referral to palliative care services among its sources; that review was not read.",
      sources: ["nice-ng142"],
    },
    {
      name: "Palliative care in a setting that already provides psychosocial support",
      differs: "In Belgium, where psychologists, social workers, dieticians and specialist nurses are part of standard oncology care, Vanbutsele 2018 added early and systematic palliative care to that standard.",
      evidence: "186 patients: overall quality of life at 12 weeks was 61.98 with early palliative care against 54.39 with standard care (difference 7.60, 95% CI 0.59 to 14.60, p = 0.03). The authors concluded that systematic integration was \"more beneficial for patients with advanced cancer than palliative care consultations offered on demand, even when psychosocial support has already been offered\".",
      sources: ["vanbutsele-2018"],
    },
  ],
  grades: [
    { claim: "Refer patients with advanced solid tumours and haematological malignancies early in the course of the disease, alongside active treatment (2024 update)", grade: "Recommendation (rating not given in the abstract)", source: "asco-2024" },
    { claim: "Early palliative care involvement, especially for patients with uncontrolled symptoms and quality of life concerns (2024 update)", grade: "Expert Panel suggestion (rating not given in the abstract)", source: "asco-2024", quote: "The Expert Panel suggests early palliative care involvement, especially for patients with uncontrolled symptoms and QOL concerns." },
    { claim: "Supportive and palliative care should start at diagnosis", grade: "Position paper (not graded)", source: "esmo-position-2018", quote: "They should start at the time of diagnosis and continue through to end-of-life or survivorship." },
    { claim: "Early specialist palliative care alongside tumour-directed treatment promotes patient-centred care", grade: "Commission report (not graded)", source: "lancet-oncology-commission-2018", quote: "Early delivery of patient-directed care by specialist palliative care teams alongside tumour-directed treatment promotes patient-centred care." },
    { claim: "Eleven major referral criteria, any one sufficient; 36 minor criteria", grade: "International Delphi consensus (60 experts; agreement of 70% or more)", source: "hui-delphi-2016", quote: "Consensus was defined by an a-priori agreement of 70% or more." },
    { claim: "Most of the major criteria are needs rather than times", grade: "Narrative review reporting the Delphi consensus", source: "hui-timely-2022", quote: "Importantly, 9 of these 11 criteria were needs-based instead of time-based." },
    { claim: "Early palliative care for everyone from diagnosis is not possible with present resources (the authors' argument for referral by need)", grade: "Narrative review (authors' view)", source: "hui-timely-2022", quote: "Due to the scarcity of palliative care resources, it is not possible to provide early palliative care for all patients with advanced disease from around the time of diagnosis" },
    { claim: "Identify adults approaching the end of life with a systematic approach", grade: "Not graded (NICE NG142 1.1.1)", source: "nice-ng142", quote: "People managing and delivering services should develop systems to identify adults who are likely to be approaching the end of their life (for example, using tools such as the Gold Standards Framework, the Amber Care Bundle or the Supportive and Palliative Care Indicators Tool [SPICT])." },
    { claim: "Early palliative care in metastatic non-small-cell lung cancer: quality of life, mood and survival (151 patients, one centre)", grade: "Randomised trial", source: "temel-2010", quote: "Despite the fact that fewer patients in the early palliative care group than in the standard care group received aggressive end-of-life care (33% vs. 54%, P=0.05), median survival was longer among patients receiving early palliative care (11.6 months vs. 8.9 months, P=0.02)." },
    { claim: "Early palliative care across tumour types: primary endpoint at 3 months not met (461 patients)", grade: "Cluster-randomised trial", source: "zimmermann-2014", quote: "Although the difference in quality of life was non-significant at the primary endpoint, this trial shows promising findings that support early palliative care for patients with advanced cancer." },
    { claim: "Early palliative care improves quality of life by a small amount; effect on survival uncertain (7 trials, 1,614 participants)", grade: "evidence of low certainty (quality of life); evidence of very low certainty (survival)", source: "haun-cochrane-2017", quote: "Data on survival, available from four studies enrolling a total of 800 participants, did not indicate differences in efficacy (death hazard ratio 0.85, 95% CI 0.56 to 1.28; evidence of very low certainty)." },
    { claim: "Early against delayed start: one-year survival (207 patients)", grade: "Randomised trial", source: "bakitas-enable-iii-2015", quote: "Kaplan-Meier 1-year survival rates were 63% in the early group and 48% in the delayed group (difference, 15%; P = .038)." },
    { claim: "Stepped palliative care non-inferior to monthly visits for quality of life at 24 weeks (507 patients)", grade: "Randomised non-inferiority trial", source: "temel-stepped-2024", quote: "FACT-L scores at week 24 for the stepped palliative care group were noninferior to scores among those receiving early palliative care (adjusted FACT-L mean score, 100.6 vs 97.8, respectively; difference, 2.9; lower 1-sided 95% confidence limit, -0.1; P < .001 for noninferiority)." },
    { claim: "Referral by screened need: no effect on the primary outcome (297 patients)", grade: "Randomised trial", source: "groenvold-danpact-2017", quote: "Early specialist palliative care showed no effect on the primary outcome of change in primary need (-4.9 points (95% confidence interval -11.3 to +1.5 points); p = 0.14)." },
  ],
  sources: [
    {
      key: "asco-2024",
      label: "Palliative Care for Patients With Cancer: ASCO Guideline Update",
      publisher: "American Society of Clinical Oncology (Journal of Clinical Oncology, Sanders et al.)",
      year: 2024,
      url: "https://doi.org/10.1200/JCO.24.00542",
      doi: "10.1200/JCO.24.00542",
      gradingScheme: "ASCO rates each recommendation by type, evidence quality and strength of recommendation; the abstract, which is all that could be read, gives the recommendations without their ratings.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "asco-2017",
      label: "Integration of Palliative Care Into Standard Oncology Care: American Society of Clinical Oncology Clinical Practice Guideline Update (the edition replaced by the 2024 update)",
      publisher: "American Society of Clinical Oncology (Journal of Clinical Oncology, Ferrell et al.)",
      year: 2017,
      url: "https://doi.org/10.1200/JCO.2016.70.1474",
      doi: "10.1200/JCO.2016.70.1474",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    {
      key: "hui-delphi-2016",
      label: "Referral criteria for outpatient specialty palliative cancer care: an international consensus",
      publisher: "The Lancet Oncology (Hui et al.)",
      year: 2016,
      url: "https://doi.org/10.1016/S1470-2045(16)30577-0",
      doi: "10.1016/S1470-2045(16)30577-0",
      gradingScheme: "Delphi consensus: 60 experts rated 39 needs-based and 22 time-based criteria over three rounds; consensus was agreement of 70% or more.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "hui-timely-2022",
      label: "Timely Palliative Care: Personalizing the Process of Referral (narrative review)",
      publisher: "Cancers (Hui, Heung and Bruera)",
      year: 2022,
      url: "https://doi.org/10.3390/cancers14041047",
      doi: "10.3390/cancers14041047",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "nice-ng142",
      label: "End of life care for adults: service delivery (NG142), recommendations",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/ng142/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording shows their strength.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "gmc-end-of-life-care",
      label: "Treatment and care towards the end of life: good practice in decision making",
      publisher: "General Medical Council",
      year: 2024,
      url: "https://www.gmc-uk.org/professional-standards/the-professional-standards/treatment-and-care-towards-the-end-of-life",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    {
      key: "esmo-position-2018",
      label: "European Society for Medical Oncology (ESMO) position paper on supportive and palliative care",
      publisher: "ESMO (Annals of Oncology, Jordan et al.)",
      year: 2018,
      url: "https://doi.org/10.1093/annonc/mdx757",
      doi: "10.1093/annonc/mdx757",
      gradingScheme: "A position paper, not a graded guideline.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "lancet-oncology-commission-2018",
      label: "Integration of oncology and palliative care: a Lancet Oncology Commission",
      publisher: "The Lancet Oncology (Kaasa et al.)",
      year: 2018,
      url: "https://doi.org/10.1016/S1470-2045(18)30415-7",
      doi: "10.1016/S1470-2045(18)30415-7",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "temel-2010",
      label: "Early palliative care for patients with metastatic non-small-cell lung cancer",
      publisher: "New England Journal of Medicine (Temel et al.)",
      year: 2010,
      url: "https://doi.org/10.1056/NEJMoa1000678",
      doi: "10.1056/NEJMoa1000678",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "zimmermann-2014",
      label: "Early palliative care for patients with advanced cancer: a cluster-randomised controlled trial",
      publisher: "The Lancet (Zimmermann et al.)",
      year: 2014,
      url: "https://doi.org/10.1016/S0140-6736(13)62416-2",
      doi: "10.1016/S0140-6736(13)62416-2",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "bakitas-enable-iii-2015",
      label: "Early Versus Delayed Initiation of Concurrent Palliative Oncology Care: Patient Outcomes in the ENABLE III Randomized Controlled Trial",
      publisher: "Journal of Clinical Oncology (Bakitas et al.)",
      year: 2015,
      url: "https://doi.org/10.1200/JCO.2014.58.6362",
      doi: "10.1200/JCO.2014.58.6362",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "temel-2017",
      label: "Effects of Early Integrated Palliative Care in Patients With Lung and GI Cancer: A Randomized Clinical Trial",
      publisher: "Journal of Clinical Oncology (Temel et al.)",
      year: 2017,
      url: "https://doi.org/10.1200/JCO.2016.70.5046",
      doi: "10.1200/JCO.2016.70.5046",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "vanbutsele-2018",
      label: "Effect of early and systematic integration of palliative care in patients with advanced cancer: a randomised controlled trial",
      publisher: "The Lancet Oncology (Vanbutsele et al.)",
      year: 2018,
      url: "https://doi.org/10.1016/S1470-2045(18)30060-3",
      doi: "10.1016/S1470-2045(18)30060-3",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "groenvold-danpact-2017",
      label: "Randomised clinical trial of early specialist palliative care plus standard care versus standard care alone in patients with advanced cancer: The Danish Palliative Care Trial",
      publisher: "Palliative Medicine (Groenvold et al.)",
      year: 2017,
      url: "https://doi.org/10.1177/0269216317705100",
      doi: "10.1177/0269216317705100",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "zimmermann-step-2021",
      label: "Phase II Trial of Symptom Screening With Targeted Early Palliative Care for Patients With Advanced Cancer",
      publisher: "Journal of the National Comprehensive Cancer Network (Zimmermann et al.)",
      year: 2021,
      url: "https://doi.org/10.6004/jnccn.2020.7803",
      doi: "10.6004/jnccn.2020.7803",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "temel-stepped-2024",
      label: "Stepped Palliative Care for Patients With Advanced Lung Cancer: A Randomized Clinical Trial",
      publisher: "JAMA (Temel et al.)",
      year: 2024,
      url: "https://doi.org/10.1001/jama.2024.10398",
      doi: "10.1001/jama.2024.10398",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "haun-cochrane-2017",
      label: "Early palliative care for adults with advanced cancer",
      publisher: "Cochrane Database of Systematic Reviews (Haun et al.)",
      year: 2017,
      url: "https://doi.org/10.1002/14651858.CD011129.pub2",
      doi: "10.1002/14651858.CD011129.pub2",
      gradingScheme: "GRADE certainty of evidence: high, moderate, low or very low.",
      read: "abstract",
      accessed: "2026-11-16",
    },
  ],
  technologies: ["palliative-care"],
  terms: ["advance-care-planning", "gold-standards-framework", "prognostic-evaluation-advanced-cancer", "performance-status", "quality-of-life"],
  keyPapers: ["paper-temel-early-palliative-care-nejm-2010"],
  related: ["advance-care-planning-for-adults-with-cancer", "respect-and-dnacpr-decisions", "care-in-the-last-days-of-life", "palliative-sedation-for-refractory-suffering", "strong-opioids-for-cancer-pain", "distress-screening-and-referral", "consent-and-education-before-anticancer-treatment", "hospice-end-of-life", "epro-symptom-monitoring", "idea-acc-automatic-early-palliative-triggers"],
  upgrades: ["idea-upgrade-stepped-palliative-care-for-advanced-cancer"],
  gaps: [
    "The full text of the ASCO 2024 update could not be read (ascopubs.org returned 403 to a script and Europe PMC holds no full text), so the ratings of its recommendations, and any time from diagnosis it sets, are not stated here. The readable time-based position is the wording of its abstract: referral beginning early in the course of the disease.",
    "The ASCO 2017 guideline update, the edition the 2024 update replaces, could not be read in full for the same reason, and its abstract gives no number of weeks. A figure for how soon after a diagnosis of advanced cancer the first palliative care contact should be is therefore not stated on this page.",
    "The GMC guidance Treatment and care towards the end of life could not be read (gmc-uk.org returned 403 to a script), so the UK regulator's statement on when palliative care can be given is not quoted here.",
    "No trial read compares referring everyone with advanced cancer at diagnosis with referring against the consensus criteria. The two positions rest on different trials with different patients and outcomes.",
    "The consensus criteria were read from the abstract and from a review by their authors; the 36 minor criteria and the thresholds behind each major criterion were not read in the original paper. The abstract says the criteria still needed validation.",
    "Every trial was read as an abstract. The survival difference in Temel 2010 came from one centre and 151 patients and was not the primary outcome; the Cochrane review found no clear survival difference across four trials.",
    "No current ESMO clinical practice guideline on the timing of palliative care referral was found; the ESMO text read is the 2018 position paper, as an abstract. The NCCN palliative care guideline sits behind a registration wall and was not read.",
    "NICE has no recommendation that sets a time from diagnosis of advanced cancer to palliative care referral. Its evidence review on timing, named in NG142, was not read.",
    "Most trials were run at large centres in North America and Europe with established palliative care clinics. How far the results carry to hospitals with few specialist staff is not established, and that shortage is the reason the needs-based position exists.",
  ],
});
