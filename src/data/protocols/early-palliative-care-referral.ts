import { protocol } from "./helpers";

/*
 * Referral to specialist palliative care alongside cancer treatment: who should be referred, on what criteria, and
 * within what time of a diagnosis of advanced cancer. The technology record `palliative-care` describes what early
 * integrated palliative care is; this record carries the referral steps and shows the two guideline positions side by
 * side: referral by time for everyone with advanced cancer, and referral by need against criteria.
 *
 * What was read, and how (first on 16 November 2026; every source re-fetched raw with curl and re-read as text in the
 * second accuracy pass on 17 November 2026, every DOI resolved again through Europe PMC and its title checked, and
 * every quote checked by script against the saved text):
 * - ASCO guideline update 2024, Palliative Care for Patients With Cancer (Sanders et al., J Clin Oncol 2024): abstract
 *   only, Europe PMC. ascopubs.org returned 403 to a script again on 17 November and Europe PMC holds no full text. The
 *   abstract gives the recommendations without their evidence ratings and says referral should begin "early in the
 *   course of the disease". Crossref and Europe PMC show no later edition.
 * - Hui et al., Referral criteria for outpatient specialty palliative cancer care: an international consensus (Lancet
 *   Oncol 2016): FULL TEXT on 17 November, from the published PDF in the University of Milan's open repository, which
 *   Europe PMC lists as the free copy (pdftotext). The first pass had the abstract only. Table 2 gives the 11 major
 *   criteria with the panel's agreement and the symptom scores that count as severe; the 36 minor criteria are in
 *   Table 1 and are not listed on this page.
 * - Hui, Heung and Bruera, Timely Palliative Care: Personalizing the Process of Referral (Cancers 2022): full text,
 *   Europe PMC XML (PMC8870673). A narrative review by authors of the consensus, not a guideline.
 * - NICE NG142, End of life care for adults: service delivery (2019): recommendations page, full text; its update page
 *   records one change, a link added in October 2021. NICE's evidence review B on the timing of referral, not read in
 *   the first pass, was read in full as a PDF on 17 November.
 * - ESMO position paper on supportive and palliative care (Jordan et al., Ann Oncol 2018): abstract only
 *   (annalsofoncology.org returned 403). The Lancet Oncology Commission on integration of oncology and palliative care
 *   (Kaasa et al., 2018): abstract, with one passage on the Temel 2010 trial read in the authors' accepted manuscript
 *   in King's College London's repository.
 * - Trials and reviews, all as abstracts from Europe PMC: Temel 2010 (N Engl J Med), Zimmermann 2014 (Lancet), Bakitas
 *   2015 (ENABLE III, J Clin Oncol), Temel 2017 (J Clin Oncol), Vanbutsele 2018 (Lancet Oncol), Groenvold 2017 (DanPaCT,
 *   Palliat Med; patient numbers also checked in the accepted manuscript), Zimmermann 2021 (STEP, J Natl Compr Canc
 *   Netw), Temel 2024 (stepped palliative care, JAMA) and the Cochrane review of Haun et al. 2017 (no later version in
 *   Crossref or Europe PMC).
 *
 * What the second pass changed: the reasons given under most steps said more than the cited text and were reworded to
 * what the sources say; "offer" carers a referral became "consider", as ASCO says clinicians "may" refer; the consensus
 * paper says one major criterion "could be sufficient", and that wording is now used; "one US centre" for Temel 2010
 * and "Toronto" for STEP were in no text read and came out; the score that counts as a severe symptom (7 to 10 on a
 * ten-point scale) and the NICE committee's conclusion on timing were added from texts newly read.
 *
 * Not read, and nothing rests on them:
 * - ASCO guideline update 2017, Integration of Palliative Care Into Standard Oncology Care (Ferrell et al.), the
 *   edition the 2024 update replaces: ascopubs.org returned 403 to a script. Its abstract, read through Europe PMC,
 *   gives no number of weeks, so no time from diagnosis is stated on this page.
 * - GMC, Treatment and care towards the end of life: gmc-uk.org returned 403 to a script, again on 17 November.
 *   (An earlier draft of this file used Internet Archive copies of both; that is a way round a block, so every step,
 *   grade row and sentence that rested on them was removed or re-sourced on the lead's ruling.)
 * - A current ESMO clinical practice guideline on when to refer to palliative care was not found (the position paper is
 *   the ESMO text read); the NCCN palliative care guideline sits behind a registration wall.
 *
 * Quotes are copied from the raw text with line breaks joined and nothing else changed.
 */
export const earlyPalliativeCareReferral = protocol({
  id: "early-palliative-care-referral",
  name: "Early palliative care alongside cancer treatment: referral criteria and timing",
  aka: ["early palliative care", "palliative care referral", "integrated palliative care", "timely palliative care", "concurrent palliative care", "supportive and palliative care referral", "specialist palliative care referral", "when to refer to palliative care"],
  domain: "palliative",
  tldr: "Palliative care is specialist help with symptoms, worries and decisions, and can be given alongside cancer treatment, not only near the end of life. Guidelines agree on early referral in advanced cancer but differ on how: one approach refers everyone early in the illness, another refers when a person has severe symptoms, distress or decisions to make. You can also ask for a referral yourself.",
  simple: "A palliative care team helps with pain, other symptoms, worries and planning. Seeing them does not mean treatment is stopping. American guidance says people with advanced cancer should be referred early, and you can ask for a referral.",
  summary: "This page explains when a referral to specialist palliative care is recommended, so that patients and families know what to ask for; your own team's pathway and local services come first. ASCO (2024 update, read as an abstract) says oncology clinicians should refer patients with advanced solid tumours and haematological malignancies to specialised interdisciplinary palliative care teams early in the course of the disease, alongside active treatment, and that cancer programmes should provide specialist palliative care for patients with unaddressed physical, psychosocial or spiritual distress. ESMO's 2018 position paper says supportive and palliative care should start at diagnosis. Neither text, as read, gives a number of weeks; the full ASCO guidelines could not be read. The second position refers by need. An international Delphi panel of 60 experts (Hui 2016) agreed 11 major criteria, any one of which could be enough to trigger a referral; nine are needs and two are times (within 3 months of an advanced cancer diagnosis where median survival is a year or less, and progression despite second-line treatment). A severe symptom in these criteria is one scored 7 to 10 on a ten-point scale. NICE NG142 sets no time: it asks services to identify adults approaching the end of life and to assess their holistic needs, and its committee concluded that the evidence on early referral was not sufficient for a recommendation on timing. The trials: in Temel 2010 (151 patients, metastatic non-small-cell lung cancer, one specialised centre) early palliative care improved quality of life and depressive symptoms at 12 weeks, and median survival was 11.6 against 8.9 months; a median is the middle of a group, so half of each group lived longer than its figure. A Cochrane review (2017, seven trials, 1,614 participants) found a small improvement in quality of life on low-certainty evidence and no clear difference in survival. A Danish trial that referred by screened need (DanPaCT, 297 patients) found no effect on its primary outcome. A US trial of stepped palliative care (507 patients with advanced lung cancer) found quality of life no worse with visits stepped up by need than with visits every 4 weeks, with a mean of 2.4 visits against 4.7.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "chemotherapy-day-unit", "community", "home"],
  },
  population: "Adults with advanced cancer (metastatic or otherwise incurable solid tumours, and haematological malignancies in the ASCO 2024 update) who are having, or could have, anticancer treatment. ASCO is an American society; the consensus criteria come from an international panel and were written for referral to outpatient palliative care at secondary or tertiary hospitals that have a palliative care team; NICE NG142 covers adults in England approaching the end of life (the final weeks and months, or for some conditions years), not only those with cancer. A review by authors of the consensus says the randomised trials of early palliative care typically enrolled people within 2 to 3 months of a diagnosis of advanced disease, with a performance status of 2 or less; Temel 2010, Temel 2017 and the stepped care trial enrolled only people with lung or gastrointestinal cancers. Children and young people, and care in the last days of life, are covered elsewhere. What is available differs between hospitals and between countries, and your own team's referral pathway comes first.",
  trigger: "A new diagnosis of advanced cancer, or at any later point a severe symptom, emotional or spiritual distress, a need for help with decisions or planning, progression on treatment, or a request from the patient.",
  steps: [
    {
      action: "Refer people with advanced cancer to a specialist interdisciplinary palliative care team early, while cancer treatment continues",
      why: "In several randomised trials, people who saw a palliative care team from soon after diagnosis reported better quality of life than those given standard cancer care; the trials are set out below.",
      source: "asco-2024",
      quote: "Oncology clinicians should refer patients with advanced solid tumors and hematologic malignancies to specialized interdisciplinary palliative care teams that provide outpatient and inpatient care beginning early in the course of the disease, alongside active treatment of their cancer.",
      grade: "Recommendation (rating not given in the abstract)",
    },
    {
      action: "Explain that palliative care is given alongside treatment and is not only care at the end of life",
      why: "The Commission lists this belief among the barriers to bringing palliative care into cancer care, and a review by authors of the consensus criteria calls the stigma attached to palliative care a major reason referrals are delayed.",
      source: "lancet-oncology-commission-2018",
      quote: "Other barriers include the common misconception that palliative care is end-of-life care only, stigmatisation of death and dying, and insufficient infrastructure and funding.",
      grade: "Commission report (not graded)",
    },
    {
      action: "Needs-based approach: treat any one of the consensus major criteria as enough to trigger a referral, such as severe physical or emotional symptoms (scored 7 to 10 on a ten-point scale), spiritual or existential crisis, a need for help with decisions or care planning, delirium, spinal cord compression, or brain or leptomeningeal metastases",
      why: "The panel wrote that, to make the best use of scarce palliative care resources, patients need to be referred at the right time for the right reasons. It also wrote that the criteria should add to clinical judgement and not replace it.",
      source: "hui-delphi-2016",
      quote: "Panellists reached consensus on 11 major criteria for referral: severe physical symptoms, severe emotional symptoms, request for hastened death, spiritual or existential crisis, assistance with decision making or care planning, patient request for referral, delirium, spinal cord compression, brain or leptomeningeal metastases, within 3 months of advanced cancer diagnosis for patients with median survival of 1 year or less, and progressive disease despite second-line therapy.",
      grade: "International Delphi consensus (60 experts; agreement of 70% or more)",
    },
    {
      action: "Treat a request from the patient as a reason to refer in its own right",
      why: "Patient request is one of the 11 major criteria (55 of the panellists who answered, 95 per cent, agreed), and the authors say any one criterion would be reason enough.",
      source: "hui-timely-2022",
      quote: "Panelists reached consensus on 11 major criteria for referral (Table 2)—the presence of any criterion would be sufficient reason for a patient to be referred.",
      grade: "Narrative review reporting the Delphi consensus",
    },
    {
      action: "Screen symptoms and supportive care needs routinely in the oncology clinic, and have a way for a positive screen to trigger the referral",
      why: "The review says many symptoms remain under-reported and under-diagnosed, and that referral often happens haphazardly, with some patients not referred at all and many others too late.",
      source: "hui-timely-2022",
      quote: "It requires four components: (1) routine screening of supportive care needs at the oncology clinics, (2) establishment of institution-specific consensual criteria for referral, (3) having a system in place to trigger a referral when patients meet criteria, and (4) availability of outpatient palliative care resources to provide timely access (Figure 1).",
      grade: "Narrative review (not a guideline)",
    },
    {
      action: "Cancer programmes: provide dedicated specialist palliative care for people with cancer whose physical, psychosocial or spiritual distress is not being addressed, alongside existing supportive care",
      why: "ASCO addresses this to cancer care programmes, so that specialist help exists for distress that is going unaddressed; its abstract gives no further reason.",
      source: "asco-2024",
      quote: "For patients with cancer with unaddressed physical, psychosocial, or spiritual distress, cancer care programs should provide dedicated specialist palliative care services complementing existing or emerging supportive care interventions.",
      grade: "Recommendation (rating not given in the abstract)",
    },
    {
      action: "When someone is thought to be approaching the end of life, carry out and record a holistic needs assessment",
      why: "NICE says this will enable the right support to be provided when it is needed. It describes the assessment as one that considers all aspects of a person's wellbeing, and their spiritual, health and social care needs.",
      source: "nice-ng142",
      quote: "If it is thought that an adult is approaching the end of their life, carry out an initial holistic needs assessment with the person and document this.",
      grade: "Not graded (NICE NG142 1.2.1)",
    },
    {
      action: "Consider referring the family or friends who are caring for the person to the palliative care team for support of their own",
      why: "ASCO says clinicians may do this to give carers additional support. A review by authors of the consensus criteria says family carers benefit from a lasting relationship with the palliative care team, which can give them education, psychological care and resources.",
      source: "asco-2024",
      quote: "Oncology clinicians from across the interdisciplinary cancer care team may refer the caregivers (eg, family, chosen family, and friends) of patients with cancer to palliative care teams for additional support.",
      grade: "Recommendation (rating not given in the abstract)",
    },
    {
      action: "Consider referral for people with solid tumours taking part in phase 1 trials",
      why: "The 2024 update names this group and says clinicians may refer them. Its abstract gives no reason, and the full text could not be read.",
      source: "asco-2024",
      quote: "Clinicians caring for patients with solid tumors on phase I cancer trials may also refer them to specialist palliative care.",
      grade: "Recommendation (rating not given in the abstract)",
    },
  ],
  bestInClass: {
    statement: "Every source read agrees that specialist palliative care belongs alongside cancer treatment for people with advanced cancer and should start early rather than at the end. They disagree on what triggers the referral, and both positions are shown here. Position one, by time and for everyone: ASCO's 2024 update, read as an abstract, says oncology clinicians should refer patients with advanced solid tumours and haematological malignancies to specialist teams beginning early in the course of the disease, alongside active treatment; ESMO's 2018 position paper says supportive and palliative care should start at the time of diagnosis. Neither gives a number of weeks in the text that could be read, and the full ASCO guidelines of 2017 and 2024, which might set one, were not reachable. The trials behind this position enrolled people soon after diagnosis: within 12 weeks of a new primary tumour or a diagnosis of progression in Vanbutsele 2018, and newly diagnosed in Temel 2010 and Temel 2017. Position two, by need: the international Delphi consensus (Hui 2016, 60 experts) defines 11 major criteria, nine of them needs and two of them times, says the presence of any one could be sufficient to trigger a referral, and its authors argue that there are not enough specialist teams to see everyone from diagnosis. NICE NG142 sets no time and asks for systematic identification of adults approaching the end of life and a holistic needs assessment; its committee, having reviewed studies of early against late referral, concluded that the evidence was not sufficient to recommend a time. The 2024 ASCO abstract carries both ideas, suggesting early involvement especially for patients with uncontrolled symptoms and quality of life concerns. The evidence for referral by time: Temel 2010 (151 patients, at what the Lancet Oncology Commission calls a highly specialised institution) found better quality of life (98.0 against 91.5 on a 0 to 136 scale), fewer patients with depressive symptoms (16 against 38 per cent) and longer median survival (11.6 against 8.9 months; half of each group lived longer than its median). Zimmermann 2014 (461 patients, 24 clinics) missed its primary quality of life endpoint at 3 months (p = 0.07) and found differences favouring palliative care at 4 months on all but one of its measures. Temel 2017 (350 patients) found improvement at 24 weeks but not at 12. Vanbutsele 2018 (186 patients, Belgium) found better quality of life at 12 weeks. ENABLE III (207 patients) compared starting at once with starting 3 months later: patient-reported outcomes did not differ, and one-year survival was 63 against 48 per cent. The Cochrane review (2017) rated the quality of life benefit small and of low certainty and found no clear survival difference (hazard ratio 0.85, 95% CI 0.56 to 1.28, very low certainty). The evidence for referral by need: DanPaCT (297 patients screened for need) found no effect on the primary outcome; a phase 2 study of symptom screening with triggered referral (STEP, 116 patients) found it feasible; and stepped palliative care (507 patients with advanced lung cancer) was non-inferior to visits every 4 weeks for quality of life at 24 weeks with 2.4 against 4.7 visits, though non-inferiority was not shown for days in hospice (19.5 against 34.6). No trial read compares referral for everyone at diagnosis with referral against the consensus criteria.",
    sources: ["asco-2024", "esmo-position-2018", "lancet-oncology-commission-2018", "hui-delphi-2016", "hui-timely-2022", "nice-ng142", "nice-ng142-review-b", "temel-2010", "zimmermann-2014", "temel-2017", "vanbutsele-2018", "bakitas-enable-iii-2015", "haun-cochrane-2017", "groenvold-danpact-2017", "zimmermann-step-2021", "temel-stepped-2024"],
  },
  variants: [
    {
      name: "Stepped palliative care",
      differs: "One palliative care visit within 4 weeks of enrolment, then visits only at a change of cancer treatment or after a hospital admission, with quality of life measured every 6 weeks; a fall of 10 points or more from the starting score steps the patient up to visits every 4 weeks. Tested in people diagnosed with advanced lung cancer within the previous 12 weeks.",
      evidence: "Randomised non-inferiority trial, 507 patients, three US academic centres: quality of life at week 24 non-inferior (adjusted mean 100.6 with stepped care against 97.8 with early palliative care), mean visits 2.4 against 4.7, end-of-life care communication non-inferior, and \"noninferiority was not demonstrated for days in hospice (adjusted mean, 19.5 with stepped palliative care vs 34.6 with early palliative care; P = .91)\".",
      sources: ["temel-stepped-2024"],
    },
    {
      name: "Symptom screening that triggers the referral",
      differs: "Symptoms are scored at each oncology visit; a moderate to severe score sends an email to a palliative care nurse, who telephones the patient and offers early palliative care (STEP). In DanPaCT (Denmark) consecutive patients were screened with a quality of life questionnaire and those above a threshold were randomised to referral or standard care.",
      evidence: "STEP phase 2 (116 patients; the comparison is between people who accepted and received palliative care and people who did not): 70 screened positive and 39 of them received early palliative care during the 6-month study; mood and symptom control improved over time in those who received it and worsened in those who did not, with no difference in quality of life or satisfaction with care. DanPaCT (145 against 152 patients): no effect on the primary outcome (-4.9 points, 95% CI -11.3 to +1.5, p = 0.14); the authors wrote \"We did not observe beneficial or harmful effects of early specialist palliative care, but important beneficial effects cannot be excluded.\"",
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
      evidence: "NICE does not grade its recommendations. Its evidence review on the timing of referral compared early with late referral; the committee found more benefits for early referral than late but judged the evidence too limited to recommend a time, noting that all the studies were in people with cancer and that several came from health systems unlike the UK's. It recommended a holistic needs assessment instead.",
      sources: ["nice-ng142", "nice-ng142-review-b"],
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
    { claim: "Eleven major referral criteria and 36 minor criteria, agreed by consensus", grade: "International Delphi consensus (60 experts; agreement of 70% or more)", source: "hui-delphi-2016", quote: "Consensus was defined by an a-priori agreement of 70% or more." },
    { claim: "Any one major criterion could be enough to trigger a referral", grade: "International Delphi consensus (authors' statement)", source: "hui-delphi-2016", quote: "The presence of any major criterion alone could be sufficient to trigger an outpatient palliative-care referral." },
    { claim: "Minor criteria support a referral together and may not be enough singly", grade: "International Delphi consensus (authors' statement)", source: "hui-delphi-2016", quote: "The panellists also identified 36 minor criteria, which might be used to support referral in aggregate, but might not individually be adequate to trigger a referral in the absence of other factors." },
    { claim: "The criteria guide and do not replace clinical judgement", grade: "International Delphi consensus (authors' statement)", source: "hui-delphi-2016", quote: "Importantly, these criteria should serve as guiding principles, and should augment rather than replace clinical judgment." },
    { claim: "Most of the major criteria are needs rather than times", grade: "Narrative review reporting the Delphi consensus", source: "hui-timely-2022", quote: "Importantly, 9 of these 11 criteria were needs-based instead of time-based." },
    { claim: "Early palliative care for everyone from diagnosis is not possible with present resources (the authors' argument for referral by need)", grade: "Narrative review (authors' view)", source: "hui-timely-2022", quote: "Due to the scarcity of palliative care resources, it is not possible to provide early palliative care for all patients with advanced disease from around the time of diagnosis" },
    { claim: "Identify adults approaching the end of life with a systematic approach", grade: "Not graded (NICE NG142 1.1.1)", source: "nice-ng142", quote: "People managing and delivering services should develop systems to identify adults who are likely to be approaching the end of their life (for example, using tools such as the Gold Standards Framework, the Amber Care Bundle or the Supportive and Palliative Care Indicators Tool [SPICT])." },
    { claim: "The evidence on early referral in the last year of life was not sufficient for a NICE recommendation on timing", grade: "Not graded (NICE committee's conclusion, evidence review B)", source: "nice-ng142-review-b", quote: "The Committee concluded that the evidence on benefit of early referral (or provision of) palliative care services for people in the last year of life was not sufficient to formulate a recommendation." },
    { claim: "Early palliative care in metastatic non-small-cell lung cancer: quality of life, mood and survival (151 patients)", grade: "Randomised trial", source: "temel-2010", quote: "Despite the fact that fewer patients in the early palliative care group than in the standard care group received aggressive end-of-life care (33% vs. 54%, P=0.05), median survival was longer among patients receiving early palliative care (11.6 months vs. 8.9 months, P=0.02)." },
    { claim: "Early palliative care across tumour types: primary endpoint at 3 months not met (461 patients)", grade: "Cluster-randomised trial", source: "zimmermann-2014", quote: "Although the difference in quality of life was non-significant at the primary endpoint, this trial shows promising findings that support early palliative care for patients with advanced cancer." },
    { claim: "Early palliative care improves quality of life by a small amount; effect on survival uncertain (7 trials, 1,614 participants)", grade: "evidence of low certainty (quality of life); evidence of very low certainty (survival)", source: "haun-cochrane-2017", quote: "Data on survival, available from four studies enrolling a total of 800 participants, did not indicate differences in efficacy (death hazard ratio 0.85, 95% CI 0.56 to 1.28; evidence of very low certainty)." },
    { claim: "Early against delayed start: one-year survival (207 patients)", grade: "Randomised trial", source: "bakitas-enable-iii-2015", quote: "Kaplan-Meier 1-year survival rates were 63% in the early group and 48% in the delayed group (difference, 15%; P = .038)." },
    { claim: "Stepped palliative care non-inferior to visits every 4 weeks for quality of life at 24 weeks (507 patients)", grade: "Randomised non-inferiority trial", source: "temel-stepped-2024", quote: "FACT-L scores at week 24 for the stepped palliative care group were noninferior to scores among those receiving early palliative care (adjusted FACT-L mean score, 100.6 vs 97.8, respectively; difference, 2.9; lower 1-sided 95% confidence limit, -0.1; P < .001 for noninferiority)." },
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
      accessed: "2026-11-17",
    },
    {
      key: "asco-2017",
      label: "Integration of Palliative Care Into Standard Oncology Care: American Society of Clinical Oncology Clinical Practice Guideline Update (the edition replaced by the 2024 update)",
      publisher: "American Society of Clinical Oncology (Journal of Clinical Oncology, Ferrell et al.)",
      year: 2017,
      url: "https://doi.org/10.1200/JCO.2016.70.1474",
      doi: "10.1200/JCO.2016.70.1474",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "hui-delphi-2016",
      label: "Referral criteria for outpatient specialty palliative cancer care: an international consensus",
      publisher: "The Lancet Oncology (Hui et al.)",
      year: 2016,
      url: "https://doi.org/10.1016/S1470-2045(16)30577-0",
      doi: "10.1016/S1470-2045(16)30577-0",
      gradingScheme: "Delphi consensus: 60 experts rated 39 needs-based and 22 time-based criteria over three rounds; consensus was agreement of 70% or more.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "hui-timely-2022",
      label: "Timely Palliative Care: Personalizing the Process of Referral (narrative review)",
      publisher: "Cancers (Hui, Heung and Bruera)",
      year: 2022,
      url: "https://doi.org/10.3390/cancers14041047",
      doi: "10.3390/cancers14041047",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng142",
      label: "End of life care for adults: service delivery (NG142), recommendations",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/ng142/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; the wording shows their strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng142-review-b",
      label: "End of life care for adults: service delivery (NG142). Evidence review B: timing of referral to palliative care services",
      publisher: "NICE (developed by the National Guideline Centre)",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/ng142/evidence/b-timing-of-referral-to-palliative-care-services-pdf-6955526991",
      gradingScheme: "An evidence review; the committee's discussion is not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gmc-end-of-life-care",
      label: "Treatment and care towards the end of life: good practice in decision making",
      publisher: "General Medical Council",
      year: 2024,
      url: "https://www.gmc-uk.org/professional-standards/the-professional-standards/treatment-and-care-towards-the-end-of-life",
      read: "not-reachable",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "lancet-oncology-commission-2018",
      label: "Integration of oncology and palliative care: a Lancet Oncology Commission",
      publisher: "The Lancet Oncology (Kaasa et al.)",
      year: 2018,
      url: "https://doi.org/10.1016/S1470-2045(18)30415-7",
      doi: "10.1016/S1470-2045(18)30415-7",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "temel-2010",
      label: "Early palliative care for patients with metastatic non-small-cell lung cancer",
      publisher: "New England Journal of Medicine (Temel et al.)",
      year: 2010,
      url: "https://doi.org/10.1056/NEJMoa1000678",
      doi: "10.1056/NEJMoa1000678",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "zimmermann-2014",
      label: "Early palliative care for patients with advanced cancer: a cluster-randomised controlled trial",
      publisher: "The Lancet (Zimmermann et al.)",
      year: 2014,
      url: "https://doi.org/10.1016/S0140-6736(13)62416-2",
      doi: "10.1016/S0140-6736(13)62416-2",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "bakitas-enable-iii-2015",
      label: "Early Versus Delayed Initiation of Concurrent Palliative Oncology Care: Patient Outcomes in the ENABLE III Randomized Controlled Trial",
      publisher: "Journal of Clinical Oncology (Bakitas et al.)",
      year: 2015,
      url: "https://doi.org/10.1200/JCO.2014.58.6362",
      doi: "10.1200/JCO.2014.58.6362",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "temel-2017",
      label: "Effects of Early Integrated Palliative Care in Patients With Lung and GI Cancer: A Randomized Clinical Trial",
      publisher: "Journal of Clinical Oncology (Temel et al.)",
      year: 2017,
      url: "https://doi.org/10.1200/JCO.2016.70.5046",
      doi: "10.1200/JCO.2016.70.5046",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "vanbutsele-2018",
      label: "Effect of early and systematic integration of palliative care in patients with advanced cancer: a randomised controlled trial",
      publisher: "The Lancet Oncology (Vanbutsele et al.)",
      year: 2018,
      url: "https://doi.org/10.1016/S1470-2045(18)30060-3",
      doi: "10.1016/S1470-2045(18)30060-3",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "groenvold-danpact-2017",
      label: "Randomised clinical trial of early specialist palliative care plus standard care versus standard care alone in patients with advanced cancer: The Danish Palliative Care Trial",
      publisher: "Palliative Medicine (Groenvold et al.)",
      year: 2017,
      url: "https://doi.org/10.1177/0269216317705100",
      doi: "10.1177/0269216317705100",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "zimmermann-step-2021",
      label: "Phase II Trial of Symptom Screening With Targeted Early Palliative Care for Patients With Advanced Cancer",
      publisher: "Journal of the National Comprehensive Cancer Network (Zimmermann et al.)",
      year: 2021,
      url: "https://doi.org/10.6004/jnccn.2020.7803",
      doi: "10.6004/jnccn.2020.7803",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "temel-stepped-2024",
      label: "Stepped Palliative Care for Patients With Advanced Lung Cancer: A Randomized Clinical Trial",
      publisher: "JAMA (Temel et al.)",
      year: 2024,
      url: "https://doi.org/10.1001/jama.2024.10398",
      doi: "10.1001/jama.2024.10398",
      read: "abstract",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
  ],
  technologies: ["palliative-care"],
  terms: ["advance-care-planning", "gold-standards-framework", "prognostic-evaluation-advanced-cancer", "performance-status", "quality-of-life"],
  keyPapers: ["paper-temel-early-palliative-care-nejm-2010"],
  related: ["advance-care-planning-for-adults-with-cancer", "respect-and-dnacpr-decisions", "care-in-the-last-days-of-life", "palliative-sedation-for-refractory-suffering", "strong-opioids-for-cancer-pain", "distress-screening-and-referral", "consent-and-education-before-anticancer-treatment", "hospice-end-of-life", "epro-symptom-monitoring", "idea-acc-automatic-early-palliative-triggers"],
  upgrades: ["idea-upgrade-stepped-palliative-care-for-advanced-cancer"],
  gaps: [
    "The full text of the ASCO 2024 update could not be read (on 17 November 2026 ascopubs.org again returned 403 to a script and Europe PMC holds no full text), so the ratings of its recommendations, and any time from diagnosis it sets, are not stated here. The readable time-based position is the wording of its abstract: referral beginning early in the course of the disease.",
    "The ASCO 2017 guideline update, the edition the 2024 update replaces (the 2024 abstract calls it the 2016 guideline), could not be read in full for the same reason, and its abstract gives no number of weeks. A figure for how soon after a diagnosis of advanced cancer the first palliative care contact should be is therefore not stated on this page.",
    "The GMC guidance Treatment and care towards the end of life could not be read (gmc-uk.org returned 403 to a script, again on 17 November 2026), so the UK regulator's statement on when palliative care can be given is not quoted here, and the year shown for it in the source list could not be confirmed.",
    "No trial read compares referring everyone with advanced cancer at diagnosis with referring against the consensus criteria. The two positions rest on different trials with different patients and outcomes.",
    "The consensus paper was read in full on 17 November 2026. Its 36 minor criteria are not listed on this page. The authors say the criteria still needed validation, that they would need to be adapted by each institution to its resources and local health-care culture, and that the panel was asked to assume a palliative care team was already in place.",
    "Every trial was read as an abstract, so details an abstract leaves out (where the STEP study was run, how many centres Temel 2010 had) are not stated here. The survival difference in Temel 2010 came from 151 patients and was not the primary outcome; the Cochrane review found no clear survival difference across four trials.",
    "No current ESMO clinical practice guideline on the timing of palliative care referral was found; the ESMO text read is the 2018 position paper, as an abstract (annalsofoncology.org returned 403 to a script on 17 November 2026). The NCCN palliative care guideline sits behind a registration wall and was not read.",
    "NICE has no recommendation that sets a time from diagnosis of advanced cancer to palliative care referral. Its evidence review on timing, read on 17 November 2026, says the committee found the evidence on early referral too limited to recommend a time.",
    "The trials whose abstracts name a place were run in the United States, Canada, Belgium and Denmark. How far the results carry to hospitals with few specialist staff is not established, and the consensus authors give that shortage as their reason for referring by need.",
  ],
});
