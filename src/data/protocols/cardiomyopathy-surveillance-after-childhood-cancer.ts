import { protocol } from "./helpers";

/*
 * Heart muscle (cardiomyopathy) surveillance for survivors of childhood, adolescent and young adult cancer treated with
 * anthracyclines, mitoxantrone or radiotherapy that reached the heart. The adult record
 * `cardio-oncology-risk-assessment-and-cardiac-surveillance` covers assessment before and during treatment and adult
 * survivors; this record does not repeat it.
 *
 * First written on 16 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again raw with
 * curl (PDFs through pdftotext, with and without -layout; XML and HTML with tags stripped by script) and every claim was
 * re-read against it. Every quote was checked by script, normalising only whitespace and line-break hyphenation.
 *
 * What was read on 17 November 2026, and how:
 * - International Late Effects of Childhood Cancer Guideline Harmonization Group (IGHG), cardiomyopathy surveillance
 *   recommendations 2022: the group's own recommendations document (PDF on ighg.org), in full. This is the LATEST
 *   edition: it replaces the 2015 recommendations and was published as Ehrhardt et al., Lancet Oncol 2023;24:e108. The
 *   IGHG cardiomyopathy page lists no later version.
 * - IGHG, "Modifications to the cardiomyopathy surveillance recommendations formulated in 2015 versus 2022" (PDF on
 *   ighg.org), in full: the source for what the first edition said.
 * - Ehrhardt et al., Lancet Oncol 2023: ABSTRACT ONLY (Europe PMC, found by title; the DOI query returned nothing). The
 *   article is not in PubMed Central and the one repository record found holds the abstract only, so the evidence
 *   review, the definitions of the risk groups and the appendices were not read. Steps rest on the recommendations
 *   document above, which prints each recommendation with its grade.
 * - Children's Oncology Group Long-Term Follow-Up Guidelines, Version 6.0, October 2023 (the current version: the COG
 *   survivorship page lists versions 1.0 to 5.0 as archive): public PDF from childrensoncologygroup.org; the preface,
 *   the instructions for use, the "New to Version 6.0" note and sections 34 (anthracyclines) and 77 (radiation with
 *   potential impact to the heart) were read. Tables come out of the PDF with their cells interleaved, so the
 *   echocardiogram table is described in prose and only whole sentences are quoted.
 * - 2022 ESC Guidelines on cardio-oncology (Lyon et al., Eur Heart J 2022): NOW READ. academic.oup.com still refuses a
 *   script, but the published PDF is held openly by a university repository (iris.unisr.it); the text another checker
 *   saved from it on this pass was re-used. Section 8.1.1 and Recommendation Table 40 (adults who are childhood and
 *   adolescent cancer survivors) were read. It is a variant; no step rests on it. Its Table 11 (risk categories by
 *   mean heart dose) comes out with its cells interleaved and no number is taken from it.
 * - IGHG recommendations for anthracycline and anthraquinone cardiac dysfunction equivalence ratios, 2025 (the group's
 *   recommendations document, PDF on ighg.org), in full; published as Kouwenberg et al., JACC CardioOncol 2025, whose
 *   full text (Europe PMC) was read as well and agrees.
 * - Ehrhardt et al., J Clin Oncol 2020, cost-effectiveness of the IGHG screening intervals: full text, now read from
 *   PubMed Central as HTML (one plain request). The first pass had the abstract only and named this variant "longer
 *   intervals for high-risk survivors"; the paper supports the opposite, a 2-year interval, and the variant was rewritten.
 * - SIGN 132, Long term follow up of survivors of childhood cancer (March 2013): full guideline PDF from sign.ac.uk.
 *   SIGN's page says "Some recommendations may be out of date"; it appears as a variant only.
 *
 * What the second pass changed: steps that IGHG words as "is reasonable" or "may be reasonable" (cardiac MRI, the
 * moderate-risk schedule, lifelong continuation, both pregnancy steps) had been written as orders and now carry the
 * hedge; reasons in `why` that no source read states (mechanisms, what a cardiologist does, why the panel dropped
 * low-risk scans) were replaced with what the sources say; one grade row said "lower end of normal" where the source
 * prints "upper limit of normal".
 *
 * A discrepancy between two IGHG documents is recorded in `gaps`: the recommendations document grades the pregnancy
 * recommendations "moderate-quality evidence" and the modifications document grades the same sentences "low-quality
 * evidence". The journal article, which would settle it, was not read.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text with
 * line breaks joined and nothing else changed; "CAYA" in a quote is the source's abbreviation for childhood, adolescent
 * and young adult, and "chest RT" for chest-directed radiotherapy. The sources print the 2 of mg/m2 as a superscript,
 * which the raw text flattens; the prose writes mg/m².
 */
export const cardiomyopathySurveillanceAfterChildhoodCancer = protocol({
  id: "cardiomyopathy-surveillance-after-childhood-cancer",
  name: "Heart scans after anthracyclines or chest radiotherapy for cancer in childhood, adolescence or young adulthood",
  aka: ["cardiomyopathy surveillance in childhood cancer survivors", "IGHG cardiomyopathy surveillance", "echocardiogram after doxorubicin in childhood", "late effects heart screening", "COG echocardiogram schedule", "anthracycline cardiomyopathy screening in survivors", "echo every 2 years or every 5 years after childhood cancer"],
  domain: "survivorship",
  tldr: "Some childhood cancer medicines, such as doxorubicin and daunorubicin, and radiotherapy that reached the heart can weaken the heart muscle years later, often with no symptoms at first. International guidance sorts survivors by dose: a heart ultrasound scan every 2 years after higher doses, every 5 years after middle doses, and none after low doses. Carrying on for life is thought reasonable.",
  simple: "Some cancer treatments in childhood can affect the heart many years later. How often you need a heart scan depends on how much of the treatment you had: every 2 years, every 5 years, or not at all. Ask your follow-up clinic which group you are in, and tell a doctor about breathlessness, chest pain or a racing heart.",
  summary: "The IGHG 2022 recommendations (published 2023) replace the 2015 edition; COG Version 6.0 (October 2023) uses the same dose bands and intervals. Exposure is the cumulative anthracycline dose in doxorubicin equivalents (mitoxantrone included) and the chest radiotherapy dose. Surveillance is recommended after 250 mg/m² or more of anthracycline, 30 Gy or more of chest radiotherapy, or 100 mg/m² or more combined with 15 Gy or more (strong); it is reasonable after 100 to under 250 mg/m² or 15 to under 30 Gy (moderate); it is not recommended below 100 mg/m² or below 15 Gy (strong), which is a change from 2015. The test is left ventricular ejection fraction by 2D or 3D echocardiography, with cardiac MRI where echo windows are inadequate; blood biomarkers are not recommended as the only strategy. For high-risk survivors surveillance is recommended to start no later than 2 years after the end of cardiotoxic treatment and to repeat every 2 years (strong); for moderate-risk survivors it is reasonable to start no later than 2 years after treatment, repeat at 5 years from diagnosis and then every 5 years (moderate); lifelong surveillance is reasonable in both groups (expert opinion). An echocardiogram before pregnancy or in the first trimester is reasonable for every woman treated with anthracyclines or chest radiotherapy. Asymptomatic systolic or diastolic dysfunction is referred to cardiology, and a symptomless ejection fraction under 40 per cent is treated with heart failure medicines as in the general population.\n\nWhere the guidelines differ: COG counts radiation to the chest, abdomen, thoracic or whole spine and total body irradiation as dose with potential impact to the heart, adds a baseline ECG and a yearly history and examination, restricts pregnancy cardiology evaluation to higher exposures, and converts anthracyclines with different factors from the IGHG 2025 ratios. SIGN 132 (2013) individualises the interval up to 5 years below 250 mg/m² and 2 to 3 years above it. The ESC 2022 cardio-oncology guideline, for adults who are childhood and adolescent survivors, recommends follow-up according to IGHG and says echocardiography should be considered every 2 years (high risk) and every 5 years (moderate risk), Class IIa, Level B. This page describes guidance so that survivors and families can follow their care; the schedule set by a person's own follow-up team comes first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "community"],
  },
  population: "People who have finished treatment for a cancer in childhood, adolescence or young adulthood and who received anthracyclines (doxorubicin, daunorubicin, epirubicin, idarubicin), mitoxantrone, or radiotherapy in which the heart was exposed, and who have no heart symptoms. IGHG writes for childhood, adolescent and young adult survivors; COG for survivors two or more years after the end of treatment. Not covered: heart checks before and during treatment and adults treated for adult cancers (see the adult cardio-oncology protocol), surveillance for coronary artery disease after radiotherapy, which has its own IGHG guideline, valve disease, and anyone with symptoms, who needs assessment now rather than a screening interval. A survivor's own long-term follow-up team sets the schedule, and it comes first.",
  trigger: "Treatment has ended and the survivor enters long-term follow-up; again whenever care moves to a new team, and before or early in a pregnancy.",
  steps: [
    {
      action: "Find out from the treatment summary the total anthracycline dose and any radiotherapy dose to a field that included the heart",
      why: "The whole schedule depends on these two numbers. COG lists the cumulative anthracycline dose, and the total radiation dose to each field, among the least a treatment summary must hold before its guidelines can be applied.",
      source: "cog-ltfu-v6",
      quote: "Cumulative dose of all anthracycline chemotherapy received (i.e., doxorubicin, daunorubicin, idarubicin, mitoxantrone and epirubicin)",
    },
    {
      action: "Convert each anthracycline to its doxorubicin equivalent before adding the doses together",
      why: "The drugs differ in how much they affect the heart for each milligram: mitoxantrone counts for about ten times its dose and daunorubicin for less than its dose. The guidelines use slightly different conversion factors (see variants).",
      source: "ighg-equivalence-2025",
      quote: "It is reasonable to use a ratio of approximately 10.5 to calculate the mitoxantrone-to-doxorubicin equivalent dose with respect to CTRCD risk (low-quality evidence, moderate recommendation).",
      grade: "low-quality evidence, moderate recommendation",
    },
    {
      action: "Tell the survivor, and make sure the health professionals who look after them know, that these treatments carry a risk of heart muscle disease (cardiomyopathy)",
      why: "IGHG says both survivors and their health care providers should be aware of the risk. This is its general recommendation and it names no dose threshold.",
      source: "ighg-2022",
      quote: "CAYA cancer survivors treated with anthracyclines, chest RT, or both (high-quality evidence), and their health care providers should be aware of the risk of cardiomyopathy (strong recommendation).",
      grade: "high-quality evidence, strong recommendation",
    },
    {
      action: "Offer heart surveillance to survivors who had 250 mg/m² or more of anthracycline, 30 Gy or more of chest radiotherapy, or 100 mg/m² or more together with 15 Gy or more (the high-risk group)",
      why: "IGHG makes its strong recommendation at these doses. Its published abstract says heart muscle disease with symptoms is typically preceded by gradual changes without symptoms that treatment can improve.",
      source: "ighg-2022",
      quote: "Cardiomyopathy surveillance is recommended for CAYA cancer survivors treated with high dose (≥250 mg/m2) anthracyclines (high-quality evidence, strong recommendation)",
      grade: "high-quality evidence, strong recommendation",
    },
    {
      action: "Consider surveillance reasonable for survivors who had 100 to under 250 mg/m² of anthracycline, or 15 to under 30 Gy of chest radiotherapy (the moderate-risk group)",
      why: "IGHG words this as reasonable, not recommended: a moderate recommendation, which it uses where there is more uncertainty. The scans are also spaced further apart (see the moderate-risk schedule below).",
      source: "ighg-2022",
      quote: "Cardiomyopathy surveillance is reasonable for CAYA cancer survivors treated with moderate dose (≥100 to <250 mg/m2) anthracyclines (high-quality evidence, moderate recommendation).",
      grade: "high-quality evidence, moderate recommendation",
    },
    {
      action: "Do not schedule routine heart scans for survivors who had under 100 mg/m² of anthracycline and under 15 Gy of chest radiotherapy",
      why: "IGHG recommends against routine surveillance at these doses. This is a change from the 2015 edition, under which scans every 5 years were reasonable for this group. The documents read do not print the panel's reasons.",
      source: "ighg-2022",
      quote: "Cardiomyopathy surveillance is not recommended for survivors treated with low dose (<100 mg/m2) anthracyclines (high-quality evidence, strong recommendation).",
      grade: "high-quality evidence, strong recommendation",
    },
    {
      action: "Use an echocardiogram (heart ultrasound) measuring left ventricular ejection fraction as the surveillance test",
      why: "The ejection fraction measures how well the main pumping chamber squeezes, and IGHG names it, measured by ultrasound, as the main test.",
      source: "ighg-2022",
      quote: "Left-ventricular ejection fraction measured with 2D or 3D echocardiography is recommended as the primary cardiomyopathy surveillance modality for assessment of left-ventricular systolic function in CAYA cancer survivors treated with anthracyclines or chest RT (moderate-quality evidence, strong recommendation).",
      grade: "moderate-quality evidence, strong recommendation",
    },
    {
      action: "Consider cardiac MRI where an echocardiogram cannot be done or does not give good enough pictures",
      why: "IGHG says MRI may be reasonable in that situation. This rests on expert opinion.",
      source: "ighg-2022",
      quote: "Cardiac magnetic resonance imaging may be reasonable for cardiomyopathy surveillance in at-risk CAYA cancer survivors for whom echocardiography is not technically feasible or optimal (expert opinion, moderate recommendation).",
      grade: "expert opinion, moderate recommendation",
    },
    {
      action: "Do not rely on blood tests alone (natriuretic peptides, troponin) to screen the heart",
      why: "IGHG recommends against blood tests as the only strategy. It says they may be reasonable together with a scan when heart muscle disease with symptoms is strongly suspected or heart function is borderline.",
      source: "ighg-2022",
      quote: "Assessment of cardiac blood biomarkers (e.g., natriuretic peptides and troponins) is not recommended as the only strategy for cardiomyopathy surveillance in at-risk CAYA survivors (low- to moderate-quality evidence, strong recommendation).",
      grade: "low- to moderate-quality evidence, strong recommendation",
    },
    {
      action: "In the high-risk group, do the first scan no later than 2 years after the end of treatment and repeat it every 2 years",
      why: "IGHG recommends this schedule strongly, on moderate-quality evidence. The 2015 edition said every 5 years, with more frequent scans reasonable.",
      source: "ighg-2022",
      quote: "Cardiomyopathy surveillance is recommended for high-risk CAYA cancer survivors to begin no later than 2 years after completion of cardiotoxic therapy and continued every 2 years thereafter (moderate-quality evidence, strong recommendation).",
      grade: "moderate-quality evidence, strong recommendation",
    },
    {
      action: "In the moderate-risk group, consider a first scan no later than 2 years after the end of treatment, another 5 years after diagnosis, and then one every 5 years",
      why: "IGHG calls this schedule reasonable, not recommended: a moderate recommendation on low-quality evidence.",
      source: "ighg-2022",
      quote: "Cardiomyopathy surveillance is reasonable for moderate-risk CAYA survivors to begin no later than 2 years after completion of cardiotoxic therapy, repeated at 5 years after diagnosis, and continue every 5 years thereafter (low-quality evidence, moderate recommendation).",
      grade: "low-quality evidence, moderate recommendation",
    },
    {
      action: "Consider continuing the scans for life in both groups rather than stopping at a set age",
      why: "IGHG calls lifelong surveillance reasonable in both the high-risk and the moderate-risk group. It grades this as expert opinion, not as the result of studies.",
      source: "ighg-2022",
      quote: "Lifelong cardiomyopathy surveillance is reasonable for high-risk CAYA cancer survivors (expert opinion, moderate recommendation).",
      grade: "expert opinion, moderate recommendation",
    },
    {
      action: "Each year ask about breathlessness, including on exertion and when lying flat, chest pain and palpitations, and in people under 25 about nausea and vomiting as well",
      why: "COG notes that in younger patients tummy symptoms may be seen more often than breathlessness on exertion or chest pain.",
      source: "cog-ltfu-v6",
      quote: "Abdominal symptoms (nausea, emesis) may be seen more frequently than exertional dyspnea or chest pain in younger patients.",
    },
    {
      action: "Check and treat blood pressure, diabetes, cholesterol and weight, and give help to stop smoking and limit alcohol, in everyone who had these treatments, including the low-risk group",
      why: "IGHG recommends this to help avert heart muscle disease with symptoms. COG says these traditional risk factors significantly increase a survivor's risk of cardiomyopathy.",
      source: "ighg-2022",
      quote: "Screening for and management of modifiable cardiovascular risk factors (hypertension, diabetes, dyslipidemia, obesity, smoking, alcohol intake) is recommended for all CAYA survivors treated with anthracyclines or chest RT to help avert the risk of symptomatic cardiomyopathy (evidence-based guidelines, strong recommendation).",
      grade: "evidence-based guidelines, strong recommendation",
    },
    {
      action: "Consider an echocardiogram before a planned pregnancy, or in the first three months, for every woman who had anthracyclines or chest radiotherapy",
      why: "IGHG calls a heart check at this point reasonable for all women who had these treatments. COG says women whose pumping is reduced before or early in pregnancy, or was in the past, are at highest risk of pregnancy-associated cardiomyopathy.",
      source: "ighg-2022",
      quote: "Cardiomyopathy surveillance is reasonable before pregnancy or in the first trimester for all female CAYA survivors treated with anthracyclines or chest RT (moderate-quality evidence, moderate recommendation).",
      grade: "moderate-quality evidence, moderate recommendation",
    },
    {
      action: "Consider further scans through pregnancy where the heart's pumping was ever reduced, even if it has recovered and the early-pregnancy scan is normal",
      why: "IGHG calls this reasonable. COG says women with a history of reduced pumping should be monitored periodically during pregnancy, labour and delivery because of an increased risk of heart failure.",
      source: "ighg-2022",
      quote: "Continuing cardiomyopathy surveillance is reasonable during pregnancy for female CAYA survivors treated with anthracyclines or chest RT who had a history of prior left ventricular systolic dysfunction that has resolved even in the presence of a normal baseline ejection fraction in the first trimester (moderate-quality evidence, moderate recommendation).",
      grade: "moderate-quality evidence, moderate recommendation",
    },
    {
      action: "Refer to a cardiologist any survivor whose scan shows reduced pumping or impaired relaxation of the heart, even with no symptoms",
      why: "IGHG recommends a cardiology consultation for these findings even without symptoms. The recommendation is strong and rests on expert opinion.",
      source: "ighg-2022",
      quote: "Cardiology consultation is recommended for CAYA survivors with asymptomatic left-ventricular systolic or diastolic dysfunction** following treatment with anthracyclines or chest RT (expert opinion, strong recommendations).",
      grade: "expert opinion, strong recommendations",
    },
    {
      action: "Start heart failure medicines when the ejection fraction is under 40 per cent, even without symptoms, following the guidelines used for everyone else",
      why: "IGHG applies the guidelines written for the general population, and grades the evidence as evidence from the general population.",
      source: "ighg-2022",
      quote: "Treatment with heart failure medications (e.g. ACE inhibitors, ARBs, beta-blockers) is recommended in CAYA cancer survivors with asymptomatic left-ventricular ejection fraction <40%, according to guidelines from the general population (low- to high-quality evidence in the general population, strong recommendation).",
      grade: "low- to high-quality evidence in the general population, strong recommendation",
    },
    {
      action: "Encourage ordinary exercise when heart function is normal, and ask a cardiologist to set limits for anyone with a weakened heart",
      why: "COG says exercise is generally safe and encouraged when the heart's pumping is normal. COG and IGHG both send survivors with symptomless cardiomyopathy to a cardiologist to define limits, and suggest the same be considered for high-risk survivors planning intensive exercise.",
      source: "cog-ltfu-v6",
      quote: "Exercise is generally safe and encouraged for patients with normal LV systolic function",
      grade: "SCORE = 1",
    },
  ],
  bestInClass: {
    statement: "The IGHG 2022 recommendations (Lancet Oncology 2023) are the most recent harmonised international guideline, and COG Version 6.0 uses the same dose bands and intervals. The two agree on the core: sort survivors by cumulative doxorubicin-equivalent anthracycline dose and heart radiation dose; echocardiography every 2 years for high risk and every 5 years for moderate risk; attention to blood pressure, diabetes, lipids and weight for all. IGHG grades the high-risk schedule as a strong recommendation on moderate-quality evidence and the moderate-risk schedule as a moderate recommendation on low-quality evidence; lifelong continuation is expert opinion. COG states that no randomised trials of screening exist in this population and scores its sections by expert consensus.\n\nThe sources read differ in five places, and none is settled by a trial. (1) Low risk: IGHG 2022 and COG 6.0 recommend no echocardiographic screening below 100 mg/m² and below 15 Gy; IGHG 2015 and SIGN 132 (2013) scanned this group at up to 5-year intervals. (2) Radiation dose: IGHG states a chest radiotherapy dose (15 and 30 Gy); COG counts chest, abdomen, thoracic or whole spine and total body irradiation; ESC 2022 sorts adult survivors by mean heart dose. (3) Dose conversion: IGHG 2025 gives daunorubicin about 0.6 and mitoxantrone about 10.5 and makes no recommendation for a ratio other than 1 for epirubicin or any ratio for idarubicin; COG 6.0 uses daunorubicin 0.5, epirubicin 0.67, idarubicin 5 and mitoxantrone 10. (4) Pregnancy: IGHG finds an echocardiogram reasonable for all women treated with anthracyclines or chest radiotherapy; COG indicates cardiology evaluation after 250 mg/m² or more, 30 Gy or more, or any anthracycline with 15 Gy or more; SIGN says no repeat scan is needed if one was normal in the previous three years. (5) Extras: COG adds a baseline ECG with QTc and a yearly history and examination; IGHG makes no ECG recommendation in the document read.\n\nESC 2022, written for adults who are childhood and adolescent cancer survivors, recommends follow-up according to IGHG and grades the two echocardiography intervals Class IIa, Level B (should be considered).",
    sources: ["ighg-2022", "cog-ltfu-v6", "ighg-equivalence-2025", "sign-132", "ighg-2022-modifications", "esc-2022"],
  },
  variants: [
    {
      name: "Children's Oncology Group Long-Term Follow-Up Guidelines, Version 6.0 (sections 34 and 77)",
      differs: "Uses the same dose bands and the same 2-year and 5-year intervals as IGHG 2022, set out as a table of anthracycline dose against radiation dose, and adds four things. The radiation dose is \"Based on radiation dose with potential impact to heart (radiation to chest, abdomen, spine [thoracic, whole], TBI).\" An ECG is added: \"EKG (include evaluation of QTc interval) Baseline at entry into long-term follow-up, repeat as clinically indicated\". History and examination with blood pressure are yearly (in the radiation section, where the dose was 15 Gy or more, which is also where that section asks for the ECG). For pregnancy, additional cardiology evaluation is indicated after 250 mg/m² or more of anthracycline, 30 Gy or more of chest radiation, or any dose of anthracycline with 15 Gy or more, and \"Evaluation should include a baseline echo (pre- or early-pregnancy).\" Doses are converted with doxorubicin 1.0, daunorubicin 0.5, epirubicin 0.67, idarubicin 5.0 and mitoxantrone 10.0. It also says a cardiology consultation 5 to 10 years after radiation may be reasonable to evaluate coronary artery disease risk after 30 Gy or more of chest radiation alone or 15 Gy or more with an anthracycline.",
      evidence: "Expert consensus scored 1 on COG's scale (high-level evidence for the link between exposure and late effect, uniform consensus on the screening). Version 6.0 states the change from Version 5.0: \"Echocardiogram screening is not recommended for individuals with both <15Gy radiation dose (with potential impact to heart) and a cumulative doxorubicin equivalent anthracycline dose <100 mg/m2\", and that the mitoxantrone conversion changed from 4 to 10. COG's preface says there are no randomised trials on which to base screening recommendations in this population.",
      sources: ["cog-ltfu-v6"],
    },
    {
      name: "SIGN 132 (Scotland, 2013): interval individualised, with fractional shortening as well as ejection fraction",
      differs: "Recommends long-term echocardiographic monitoring for everyone who had anthracyclines or radiation to a field that includes the heart, measuring fractional shortening and ejection fraction, with \"a maximum interval of five years for those at low risk who received cumulative anthracycline doses less than 250 mg/m2\" and screening every two to three years above 250 mg/m² or with heart radiotherapy. On pregnancy: \"Women who are pregnant or planning a pregnancy do not require repeat echocardiograph if they have had a normal test result in the previous three years.\"",
      evidence: "The monitoring recommendation is grade D on SIGN's scale and the interval statements are good practice points. The guideline dates from March 2013, before either IGHG edition, and SIGN's own page says some recommendations may be out of date. It has no group that is not scanned.",
      sources: ["sign-132"],
    },
    {
      name: "IGHG 2015 (first edition, now replaced)",
      differs: "Scanned all three risk groups every 5 years, with more frequent scans reasonable for high risk and \"may be reasonable\" for moderate and low risk; set the radiotherapy bands at 15 to under 35 Gy and 35 Gy or more; and for low-dose anthracyclines (under 100 mg/m²) said surveillance may be reasonable. Radionuclide angiography was an alternative to echocardiography; the 2022 edition names cardiac MRI only.",
      evidence: "Read from IGHG's own side-by-side document of the 2015 and 2022 wording. A survivor given a schedule before 2023, or by a clinic still using the first edition, may be on these intervals.",
      sources: ["ighg-2022-modifications"],
    },
    {
      name: "The cost-effectiveness model: scans every 2 years for high-risk survivors and none for low-risk survivors",
      differs: "A simulation model compared echocardiograms every 1, 2, 5 and 10 years with no screening in each risk group of the 2015 edition, when high-risk survivors were scanned every 5 years and low-risk survivors were still scanned. It favoured a 2-year interval for high-risk survivors and no screening for low-risk survivors, which is where the 2022 edition went.",
      evidence: "Ehrhardt 2020 (full text; model built on the Childhood Cancer Survivor Study and St Jude Lifetime Cohort): modelled lifetime risk of heart failure without screening was 36.7 per cent in the high-risk group, 24.7 per cent in the moderate-risk group and 16.9 per cent in the low-risk group as then defined, and routine screening reduced that risk by 4 to 11 per cent depending on frequency. \"Screening every 2, 5, and 10 years was cost-effective for high-risk survivors, and every 5 and 10 years for moderate-risk survivors.\" In high-risk survivors the 2-year interval gave the greatest gain and was the strategy most often preferred in the simulations; the authors called the best strategy for moderate-risk survivors uncertain. For low-risk survivors every strategy cost more than 175,000 dollars for each quality-adjusted life-year gained, against a threshold of 100,000, so none counted as cost-effective. These are model estimates, not trial results, costed on United States Medicare rates, and the risk groups were those of the 2015 edition (35 Gy, not 30 Gy, as the upper radiation band).",
      sources: ["ehrhardt-2020"],
    },
    {
      name: "Changing the schedule for survivors who had dexrazoxane, or who carry a genetic variant",
      differs: "Some clinics scan less often after dexrazoxane, a medicine given with anthracyclines to protect the heart, or adjust for genetic test results.",
      evidence: "IGHG 2022 found the evidence too thin to support either: \"No recommendation can be formulated to change cardiomyopathy surveillance in CAYA cancer survivors who received dexrazoxane cardioprotection with anthracycline administration (low-quality evidence).\" The same wording is used for genetic variants that raise or lower risk.",
      sources: ["ighg-2022"],
    },
    {
      name: "ESC 2022 cardio-oncology guideline: adults who are childhood and adolescent cancer survivors",
      differs: "Written by cardiologists for adult survivors. It recommends follow-up according to IGHG and words the intervals more cautiously than IGHG does for the high-risk group: \"A CV review should be considered every 5 years for moderate-risk childhood and adolescent adult CS and every 2 years for high-risk childhood and adolescent adult CS.\" It asks for screening for modifiable cardiovascular risk factors every year, and recommends a cardiovascular assessment before pregnancy or in the first trimester for female survivors, which its footnote spells out as blood pressure, lipids, fasting glucose, HbA1c, an ECG and an echocardiogram. Its risk table sorts survivors by mean heart dose, not chest dose, and adds a very-high-risk category; the table does not read reliably as text, so its numbers are not given here.",
      evidence: "Recommendation Table 40: education of survivors and their healthcare providers is Class I, Level B; annual screening for modifiable risk factors is Class I, Level C; cardiovascular assessment before or early in pregnancy is Class I, Level C; echocardiography every 2 years in high-risk and every 5 years in moderate-risk survivors is Class IIa, Level B in each case. The text adds that lifelong surveillance for high-risk survivors is recommended. The guideline dates from 2022 and cites the first IGHG edition; in the section read it does not say whether low-risk survivors should be scanned.",
      sources: ["esc-2022"],
    },
  ],
  grades: [
    { claim: "Surveillance after 30 Gy or more of chest radiotherapy", grade: "high-quality evidence, strong recommendation", source: "ighg-2022", quote: "Cardiomyopathy surveillance is recommended for CAYA cancer survivors treated with high dose (≥30 Gy) chest RT (high-quality evidence, strong recommendation)." },
    { claim: "Surveillance after 15 to under 30 Gy of chest radiotherapy", grade: "high-quality evidence, moderate recommendation", source: "ighg-2022", quote: "Cardiomyopathy surveillance is reasonable for CAYA cancer survivors treated with moderate dose (≥15 to <30 Gy) chest RT (high-quality evidence, moderate recommendation)." },
    { claim: "No surveillance after under 15 Gy of conventionally fractionated chest radiotherapy", grade: "high-quality evidence, strong recommendation", source: "ighg-2022", quote: "Cardiomyopathy surveillance is not recommended for CAYA cancer survivors treated with low dose (<15 Gy) chest RT with conventional fractionation (high-quality evidence, strong recommendation)." },
    { claim: "Surveillance after 100 mg/m² or more of anthracycline combined with 15 Gy or more of chest radiotherapy", grade: "high-quality evidence, strong recommendation", source: "ighg-2022", quote: "Cardiomyopathy surveillance is recommended for CAYA cancer survivors treated with moderate to high dose anthracyclines (≥100 mg/m2) and moderate to high dose chest RT (≥15 Gy) (high-quality evidence, strong recommendation)." },
    { claim: "Lifelong surveillance in the moderate-risk group", grade: "expert opinion, moderate recommendation", source: "ighg-2022", quote: "Lifelong cardiomyopathy surveillance is reasonable for moderate-risk CAYA cancer survivors (expert opinion, moderate recommendation)." },
    { claim: "Natriuretic peptides alongside imaging when symptoms are suspected or function is borderline", grade: "expert opinion, moderate recommendation", source: "ighg-2022", quote: "Assessment of cardiac blood biomarkers (e.g., natriuretic peptides) in conjunction with imaging studies may be reasonable in instances where symptomatic cardiomyopathy is strongly suspected or in CAYA cancer survivors who have borderline cardiac function during primary surveillance (expert opinion, moderate recommendation)." },
    { claim: "No recommendation on heart failure medicines for symptomless borderline heart function (the source prints \"between 40% and the upper limit of normal\")", grade: "no studies in CAYA cancer survivors, no evidence in the general population", source: "ighg-2022", quote: "No recommendations can be formulated about treatment with heart failure medications in CAYA cancer survivors with asymptomatic borderline cardiac function (left-ventricular ejection fraction between 40% and the upper limit of normal) (no studies in CAYA cancer survivors, no evidence in the general population)." },
    { claim: "Cardiology advice on exercise limits for survivors with asymptomatic cardiomyopathy", grade: "expert opinion, strong recommendation", source: "ighg-2022", quote: "Cardiology consultation is recommended for CAYA survivors with asymptomatic cardiomyopathy to define limits and precautions for exercise (expert opinion, strong recommendation)." },
    { claim: "Cardiology advice for high-risk survivors planning high-intensity exercise", grade: "expert opinion, moderate recommendation", source: "ighg-2022", quote: "Cardiology consultation is reasonable for high-risk CAYA survivors who plan to participate in high intensity exercise to define limits and precautions for physical activity (expert opinion, moderate recommendation)." },
    { claim: "Daunorubicin counts for about 0.6 of its dose in doxorubicin equivalents", grade: "low-quality evidence, moderate recommendation", source: "ighg-equivalence-2025", quote: "It is reasonable to use a ratio of approximately 0.6 to calculate the daunorubicin-to-doxorubicin equivalent dose with respect to CTRCD risk (low-quality evidence, moderate recommendation)." },
    { claim: "No ratio other than 1 can be recommended for epirubicin", grade: "low-quality evidence", source: "ighg-equivalence-2025", quote: "No recommendation can be made to use a ratio other than 1 when estimating CTRCD risk of epirubicin compared with doxorubicin (low-quality evidence).‡" },
    { claim: "No ratio can be recommended for idarubicin", grade: "no eligible studies", source: "ighg-equivalence-2025", quote: "No recommendation can be made for an idarubicin-to-doxorubicin equivalence ratio with respect to CTRCD risk, as no eligible studies were identified." },
    { claim: "COG: counsel on blood pressure, body mass index, lipids and glucose", grade: "SCORE = 1", source: "cog-ltfu-v6", quote: "Counsel regarding the importance of maintaining blood pressure, BMI, lipids, and glucose levels within goal ranges per general population guidelines." },
    { claim: "COG: cardiac MRI when echocardiogram images are suboptimal", grade: "SCORE = 1", source: "cog-ltfu-v6", quote: "Cardiac MRI as an adjunct imaging modality when echo images are suboptimal." },
    { claim: "ESC: echocardiography every 5 years (moderate risk) and every 2 years (high risk) in adult survivors", grade: "IIa, B", source: "esc-2022", quote: "A CV review should be considered every 5 years for moderate-risk childhood and adolescent adult CS and every 2 years for high-risk childhood and adolescent adult CS." },
    { claim: "SIGN: long-term echocardiographic monitoring after anthracyclines or heart radiation", grade: "D", source: "sign-132", quote: "Survivors of childhood cancer who have had anthracyclines or radiation to a field that includes the heart should have long term monitoring for cardiac dysfunction using echocardiography to determine fractional shortening and ejection fraction." },
  ],
  sources: [
    { key: "ighg-2022", label: "Cardiomyopathy surveillance recommendations 2022 (the recommendations document for the updated IGHG guideline)", publisher: "International Late Effects of Childhood Cancer Guideline Harmonization Group (IGHG)", year: 2022, url: "https://www.ighg.org/wp-content/uploads/2023/06/IGHG-Cardiomyopathy-surveillance-recommendations_2022.pdf", gradingScheme: "Each recommendation carries a quality of evidence (high, moderate, low, or expert opinion) and a strength: strong (\"is recommended\", low degree of uncertainty), moderate (\"is reasonable\" or \"may be reasonable\", higher uncertainty), or a strong recommendation not to do (\"is not recommended\").", read: "full-text", accessed: "2026-11-17" },
    { key: "ighg-2023-lancet-oncol", label: "Systematic review and updated recommendations for cardiomyopathy surveillance for survivors of childhood, adolescent, and young adult cancer from the International Late Effects of Childhood Cancer Guideline Harmonization Group (Ehrhardt et al.)", publisher: "IGHG, The Lancet Oncology", year: 2023, url: "https://doi.org/10.1016/S1470-2045(23)00012-8", doi: "10.1016/S1470-2045(23)00012-8", gradingScheme: "As the recommendations document above.", read: "abstract", accessed: "2026-11-17" },
    { key: "ighg-2022-modifications", label: "Modifications to the cardiomyopathy surveillance recommendations formulated in 2015 versus 2022", publisher: "IGHG", year: 2022, url: "https://www.ighg.org/wp-content/uploads/2023/06/Modifications-to-the-cardiomyopathy-surveillance-recommendations-formulated-in-2015-versus-2022.pdf", gradingScheme: "As the recommendations document above; the 2015 wording is printed without grades.", read: "full-text", accessed: "2026-11-17" },
    { key: "cog-ltfu-v6", label: "Long-Term Follow-Up Guidelines for Survivors of Childhood, Adolescent, and Young Adult Cancers, Version 6.0, October 2023 (sections 34 and 77)", publisher: "Children's Oncology Group", year: 2023, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_LTFU_Guidelines_Only_v6.pdf", gradingScheme: "Score per section, a modified NCCN category of consensus: 1 (high-level evidence linking the late effect to the exposure and uniform panel consensus that the screening is appropriate), 2A (lower-level evidence, uniform consensus), 2B (lower-level evidence, non-uniform consensus). The score rates the link between exposure and late effect, not a trial of screening.", read: "full-text", accessed: "2026-11-17" },
    { key: "esc-2022", label: "2022 ESC Guidelines on cardio-oncology developed in collaboration with the European Hematology Association (EHA), the European Society for Therapeutic Radiology and Oncology (ESTRO) and the International Cardio-Oncology Society (IC-OS) (section 8.1.1 and Recommendation Table 40)", publisher: "European Society of Cardiology, European Heart Journal", year: 2022, url: "https://doi.org/10.1093/eurheartj/ehac244", doi: "10.1093/eurheartj/ehac244", gradingScheme: "Class of recommendation (I is recommended or is indicated; IIa should be considered; IIb may be considered; III is not recommended) with a level of evidence (A, B or C).", read: "full-text", accessed: "2026-11-17" },
    { key: "ighg-equivalence-2025", label: "IGHG Recommendations for cardiac dysfunction risk equivalence ratios for anthracycline and anthraquinone agents after childhood cancer, 2025 (recommendations document; published as Kouwenberg et al., JACC: CardioOncology 2025)", publisher: "IGHG", year: 2025, url: "https://www.ighg.org/wp-content/uploads/2025/08/IGHG-Antrhacycline-cardiotoxicity-equivalence-ratio-2025.pdf", doi: "10.1016/j.jaccao.2025.05.009", gradingScheme: "Quality of evidence (high, moderate, low) and strength of recommendation (strong, moderate), as other IGHG guidelines.", read: "full-text", accessed: "2026-11-17" },
    { key: "ehrhardt-2020", label: "Cost-Effectiveness of the International Late Effects of Childhood Cancer Guideline Harmonization Group Screening Guidelines to Prevent Heart Failure in Survivors of Childhood Cancer (Ehrhardt et al.)", publisher: "Journal of Clinical Oncology", year: 2020, url: "https://doi.org/10.1200/JCO.20.00418", doi: "10.1200/JCO.20.00418", gradingScheme: "A simulation model; not a graded guideline.", read: "full-text", accessed: "2026-11-17" },
    { key: "sign-132", label: "SIGN 132: Long term follow up of survivors of childhood cancer (March 2013; SIGN notes that some recommendations may be out of date)", publisher: "Scottish Intercollegiate Guidelines Network", year: 2013, url: "https://www.sign.ac.uk/media/1070/sign132.pdf", gradingScheme: "Grades A to D by the strength of the supporting evidence (D rests on non-analytic studies, expert opinion or extrapolation), with ungraded good practice points from the guideline group's clinical experience.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "The Lancet Oncology article behind the 2022 recommendations was read only as an abstract: it is not in PubMed Central. The recommendations themselves were read in full from IGHG's own document, but the evidence review, the appendix that defines systolic and diastolic dysfunction, and any statement on strain imaging or ECG were not.",
    "IGHG's two documents disagree on one grade. The recommendations document gives the two pregnancy recommendations as moderate-quality evidence; the document comparing 2015 with 2022 gives the same sentences as low-quality evidence. The quotes here follow the recommendations document.",
    "The recommendations document names high-risk, moderate-risk and low-risk groups in its frequency section without defining them in one sentence. The groups given here are the dose bands of its 'who needs surveillance' section, which match the table in COG Version 6.0.",
    "The European Society of Cardiology guideline on cardio-oncology (2022) could not be read on the first pass. On 17 November 2026 it was read from the published copy held by a university repository, and its section on adults who are childhood and adolescent survivors is now a variant. Its risk table (by mean heart dose) comes out of the PDF with its cells out of order, so its dose bands are not given here and are not compared with the IGHG bands.",
    "On 17 November 2026 the full text of the cost-effectiveness model (Ehrhardt 2020) was read; the first pass had only its abstract and described it as supporting longer intervals for high-risk survivors, which it does not.",
    "The reasons the IGHG panel gave for ending surveillance in the low-risk group, and for each interval, are in the journal article, which was not read; the page therefore states the recommendations and their grades without the panel's reasoning.",
    "No randomised trial has tested whether scanning survivors with no symptoms prevents heart failure or death; COG says so in its preface, and the intervals rest on cohort data, modelling and expert opinion.",
    "No source read gives a recommendation for survivors with an ejection fraction between 40 per cent and normal, for survivors who had dexrazoxane, or for those with a genetic variant; IGHG says no recommendation can be formulated.",
    "Newer cancer medicines that can affect the heart (for example kinase inhibitors and immunotherapy given in childhood) are listed in a footnote of the IGHG comparison document but have no surveillance recommendation in the documents read.",
    "No current United Kingdom guideline for this surveillance could be read. SIGN 132 dates from 2013, and the Children's Cancer and Leukaemia Group follow-up practice statement was not found on the group's public guidelines page.",
  ],
  cancers: ["childhood-cancers", "aya-cancers"],
  technologies: ["rejuv-paed-heart", "cardio-oncology"],
  terms: ["late-effects", "cardiotoxicity", "anthracycline"],
  related: ["cardio-oncology-risk-assessment-and-cardiac-surveillance", "long-term-follow-up-after-childhood-cancer", "breast-screening-after-chest-radiotherapy-at-a-young-age", "ighg", "rejuv-paed-cog-ltfu-guidelines", "doxorubicin", "daunorubicin", "epirubicin", "idarubicin", "mitoxantrone", "dexrazoxane"],
  companies: ["childrens-oncology-group"],
  sections: ["supportive-care"],
  bottlenecks: ["b-survivorship"],
});
