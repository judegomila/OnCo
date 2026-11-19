import { protocol } from "./helpers";

/*
 * Swelling (oedema) and effusions on targeted drugs: puffy eyelids and swollen legs on imatinib, avapritinib and the
 * MET inhibitors (capmatinib, tepotinib, amivantamab), and pleural effusion on dasatinib.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - European LeukemiaNet recommendations for the management and avoidance of adverse events of treatment in chronic
 *   myeloid leukaemia (Steegmann et al., Leukemia 2016): full text, Europe PMC full-text XML (PMC4991363). Expert
 *   recommendations without grades. No funding statement for the paper was found in the text; its authors declare
 *   honoraria and research funding from the makers of the drugs discussed.
 * - European LeukemiaNet 2020 recommendations for treating chronic myeloid leukemia (Hochhaus et al., Leukemia 2020):
 *   full text, Europe PMC full-text XML (PMC7214240). Only its passages on pleural effusion were used.
 * - Nishio et al., "Management of Peripheral Edema in Patients with MET Exon 14-Mutated Non-small Cell Lung Cancer
 *   Treated with Small Molecule MET Inhibitors" (Targeted Oncology 2022): full text, Europe PMC full-text XML
 *   (PMC9512730). A review by four Japanese oncologists. Its funding statement reads: "Assistance with the preparation
 *   of this manuscript was funded by Novartis, Japan", and medical writers paid by Novartis wrote the outline and first
 *   draft. Novartis markets capmatinib.
 * - Six United States labels, each the current DailyMed SPL XML stripped to text: imatinib (Gleevec), dasatinib
 *   (Sprycel), avapritinib (Ayvakit), capmatinib (Tabrecta), tepotinib (Tepmetko) and amivantamab (Rybrevant).
 * - Not read: the ESMO guidelines on chronic myeloid leukaemia (2017) and on gastrointestinal stromal tumours (2022),
 *   neither of which Europe PMC holds as open full text (the publisher pages were not tried after the same publisher
 *   returned 403 for other papers); a 2025 narrative review of MET inhibitor oedema (Transl Lung Cancer Res), which
 *   was downloaded, had its medical writing provided by an affiliate of Merck KGaA and was not used.
 *
 * Second reading, 17 November 2026. Every source above was fetched again as raw text (the three papers as Europe PMC
 * full-text XML, the six labels as the current DailyMed SPL XML, tags stripped by script) and each claim was compared
 * with it. All quotes matched. Corrected: orders written where the sources hedge (a diuretic is something to
 * "consider"; the tests for other causes "may also help"); a "same week" limit, a baseline weight, a "same day" call
 * and skin-care details that no source states; low albumin listed as a cause with no source; grade 4 permanent
 * discontinuation given for tepotinib only when the capmatinib label says the same; the amivantamab grade 4 row left
 * out; an amivantamab quote that did not carry its claim; the amivantamab label year (revised November 2025). Added:
 * the 2025 European LeukemiaNet recommendations (Apperley et al., Leukemia 2025, Europe PMC full-text XML,
 * PMC12310532), which replace the 2020 edition and list recurrent pleural effusions despite dose reductions among the
 * side effects that call for a change of drug. The DOIs were resolved again through Crossref. The two ESMO
 * guidelines were tried again and still do not read (subscription only in Europe PMC).
 *
 * Extended 18 November 2026. Three products were added, each from its current US label (DailyMed SPL XML fetched
 * with curl and stripped to text by script) and, where the product is authorised in the EU, the EMA product
 * information PDF (pdftotext -layout): vimseltinib (Romvimza; US SPL version 3 dated 26 June 2026; EU text listed by
 * the EMA as last updated 11 February 2026), telisotuzumab vedotin (Emrelis; US SPL version 3 dated 25 May 2025; the
 * EMA medicine page and product-information address both returned 404, so no EU text was read) and loncastuximab
 * tesirine (Zynlonta; US label revised November 2026; EU text listed by the EMA as last updated 14 September 2026).
 * Loncastuximab tesirine is a CD19-directed antibody-drug conjugate, neither a kinase inhibitor nor MET-targeted: it
 * is here because both its labels carry a warning and a dose row written for oedema and effusion, and `population`
 * says so; the name and id were left alone. Added: four steps, one variant, six grade rows, five sources, sentences
 * in `population`, `summary` and `bestInClass`, and four gaps; two older gaps were narrowed to stay true. Nothing
 * else was changed and the older sources were not fetched again.
 *
 * Second reader of the extension, 18 November 2026. A second agent, which did not write the extension, fetched the
 * five new sources again with curl (DailyMed SPL XML for loncastuximab tesirine, telisotuzumab vedotin and
 * vimseltinib, stripped to text by its own script; the EMA PDFs for loncastuximab tesirine and vimseltinib,
 * pdftotext -layout). All five files were byte-identical to the writer's, each US label was the newest version in
 * DailyMed's history list, and the EMA pages gave the dates stated. Every added quote was checked by script and
 * every added figure, grade and verb was read against the text: none was wrong. One removal: loncastuximab tesirine
 * and everything resting on it (two steps, three grade rows, its parts of the variant, `summary`, `population` and
 * `bestInClass`, and the id `zynlonta` in `drugs`). It is a CD19-directed antibody-drug conjugate on a page named
 * for kinase inhibitors and MET-targeted drugs; its US warning joins capillary leak syndrome, which this page says
 * it does not cover, to oedema and effusion; and its US patient text says to get emergency help right away where
 * this page's `tldr` says to tell the team promptly. The page could not hold it honestly without a new name, so a
 * gap says what was read and why it is not here; its two sources stay in `sources` because that gap rests on them.
 * Telisotuzumab vedotin stays (a c-Met-directed conjugate whose US label has a dose row for peripheral oedema) and
 * so does vimseltinib (a kinase inhibitor with no oedema rule, which the step says, with the general rule and the
 * figures both labels give). The EMA medicine page for Emrelis returned 404 again. After the removal: 17 steps, 1
 * practice step, 16 grade rows. The older content was not re-read.
 *
 * DOIs were resolved through Europe PMC and the titles checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed, and were checked by script. US sources spell "edema" and "dyspnea"; quotes keep it.
 */
export const fluidRetentionAndEffusionsOnKinaseInhibitors = protocol({
  id: "fluid-retention-and-effusions-on-kinase-inhibitors",
  name: "Fluid retention, swelling and pleural effusion on kinase inhibitors and MET-targeted drugs",
  aka: [
    "oedema on targeted therapy",
    "edema on TKIs",
    "periorbital oedema on imatinib",
    "puffy eyes on imatinib",
    "swollen legs on capmatinib",
    "MET inhibitor oedema",
    "dasatinib pleural effusion",
    "fluid retention on imatinib",
  ],
  domain: "symptom-management",
  tldr: "Some targeted cancer drugs make the body hold on to fluid: puffy eyelids, swollen ankles or, with dasatinib, fluid around the lungs. Swelling is managed with raised legs, support stockings, less salt, sometimes water tablets, and a lower dose if needed. Tell your cancer team promptly about rapid weight gain, new breathlessness, a dry cough, chest pain or one swollen, painful leg.",
  simple: "Some cancer tablets cause swelling of the eyelids or legs. Weighing yourself helps to spot it. Raising your legs, stockings and sometimes water tablets help. Tell your cancer team promptly if you gain weight quickly, get short of breath or one leg swells. Your own team's plan comes first.",
  summary: "Fluid retention is among the commonest side effects of imatinib, avapritinib (oedema in 72% of people with GIST in its label, 2% grade 3 or higher) and the MET inhibitors (with tepotinib, oedema led to a dose interruption in 28%, a reduction in 22% and permanent stopping in 8%), and pleural effusion is the characteristic problem of dasatinib (28% at 5 years in first-line use, ELN 2016). The guidance is thin: expert recommendations from the European LeukemiaNet without grades, a Novartis-funded review for MET inhibitors, and general dose-modification rows in the labels. The reader's own team's protocol comes first.\n\nWatching: the imatinib label asks for regular weighing and for unexpected rapid weight gain to be investigated. In the CML studies oedema on imatinib was more likely at higher doses and over 65. Before blaming the drug, other causes are sought: the MET inhibitor review suggests a history, examination of the legs, and tests of kidney, liver and thyroid function or a marker of heart failure. Checking for a clot when one leg swells is ordinary practice that no source read here states.\n\nSupportive care: leg elevation, compression stockings, exercise, less salt, skin and foot care, and a diuretic, which the MET inhibitor review says to consider when swelling interferes with quality of life. The evidence is experience, not trials: ELN says fluid retention on CML drugs is normally manageable and reversible with diuretics but that diuretics have limited benefit for periorbital oedema; the MET inhibitor review says management is empiric, and that in its authors' experience such measures are often only temporarily effective.\n\nLabel rules. Imatinib: withhold for severe fluid retention until resolved. Capmatinib and tepotinib: keep the dose at grade 2, and if it is intolerable consider withholding and resuming at a reduced dose; at grade 3 withhold until resolved and resume at a reduced dose; at grade 4 stop permanently. Amivantamab: withhold at grade 3 or 4 until grade 1 or baseline. Avapritinib: withhold at grade 3 or 4 until grade 2 or less. Dasatinib (adults): withhold for a severe reaction until it has resolved or improved, then resume as appropriate at a reduced dose. Apart from imatinib's, these are each label's general rule for adverse reactions.\n\nDasatinib pleural effusion: cough, breathlessness or chest pain prompt a chest X-ray. Management is interrupting or reducing the dose, with or without diuretics and short courses of steroids, and drainage when severe. ELN 2016 says the drug could be resumed at the same dose after a first episode has resolved, that the next lower dose is advisable after a second, and that switching is preferred if a relapse is symptomatic; recurrence occurs in roughly 70% of cases. ELN 2025 lists recurrent pleural effusions despite dose reductions among the side effects that call for a change of drug. Breathlessness or fainting not explained by an effusion should raise suspicion of pulmonary arterial hypertension.\n\nTwo products read on 18 November 2026. Telisotuzumab vedotin (US label only): withhold for grade 2 or higher peripheral oedema until grade 1 or less, resuming at the same dose after a first occurrence and at the next lower dose after a later one. Vimseltinib: periorbital oedema in 60% in the US label (3.6% at grade 3 or 4), with no rule written for it in either label; the US label gives dose reductions to 20 mg and then 14 mg twice weekly, and the EU SmPC says to withhold temporarily when the dose is not tolerated and restart at a reduced dose.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage", "acute-oncology-service", "community"],
  },
  population: "Adults taking imatinib, dasatinib, avapritinib, capmatinib, tepotinib or amivantamab, whose US labels were read, and two products added on 18 November 2026: vimseltinib, a kinase inhibitor, and telisotuzumab vedotin, an antibody-drug conjugate directed at c-Met. The sources are narrower than that list: the European LeukemiaNet papers concern chronic myeloid leukaemia, and the MET inhibitor review concerns capmatinib, tepotinib, crizotinib and savolitinib in lung cancer. Not covered: other drugs that cause oedema; lymphoedema after surgery or radiotherapy, which is a different condition with its own page; effusions caused by the cancer itself; capillary leak syndrome; differentiation syndrome; children.",
  trigger: "Starting one of these drugs (teaching, and regular weighing), new swelling of the eyelids, face, legs or abdomen, rapid weight gain, or new cough, breathlessness or chest pain.",
  steps: [
    {
      action: "Before starting, tell the person that swelling is likely and check for conditions that make it more likely",
      why: "Swelling is common in people with cancer and is not always caused by the treatment; the review notes that cancer treatment might make an existing condition worse.",
      source: "met-oedema-2022",
      quote: "Before initiating MET inhibitor treatment, patients should be advised of the likelihood of edema development and assessed for any underlying conditions that might predispose them to developing edema",
    },
    {
      action: "Weigh the person regularly through treatment and watch for signs of fluid retention",
      why: "The imatinib label says the drug is often associated with oedema and occasionally with serious fluid retention, and asks for regular weighing.",
      source: "label-imatinib",
      quote: "Weigh and monitor patients regularly for signs and symptoms of fluid retention.",
    },
    {
      action: "Investigate unexpected rapid weight gain carefully and treat what is found",
      why: "The label lists rapid weight gain, with or without visible swelling, among fluid retention reactions that also include fluid around the lungs and in the abdomen.",
      source: "label-imatinib",
      quote: "Investigate unexpected rapid weight gain carefully and provide appropriate treatment.",
    },
    {
      action: "When swelling appears, look for another cause: consider examining the legs and testing kidney, liver and thyroid function or a marker of heart failure",
      why: "Swelling is common in people with cancer and may not be caused by the treatment. The review says these checks may help to find the cause.",
      source: "met-oedema-2022",
      quote: "Lower extremity examination, tests for renal, hepatic, or thyroid function, or markers of heart failure, such as B-type natriuretic peptide, may also help to elucidate the underlying cause",
    },
    {
      action: "Treat swelling of one leg, particularly with pain, warmth or redness, as a possible clot until a scan shows otherwise",
      why: "A clot in a leg vein needs its own treatment and is not managed as drug swelling.",
      practice: "No source read for this page states it as a step. The oedema guidance read asks for other causes to be looked for without naming a clot, and the amivantamab label carries a separate warning on venous thromboembolism that applies to its use with lazertinib. It is standard practice in the assessment of leg swelling.",
    },
    {
      action: "Use simple measures: raise the legs several times a day when sitting and while sleeping, wear compression stockings, exercise and cut down on salt",
      why: "The review lists these as possible approaches and says management is empiric, because how these drugs cause swelling is unclear.",
      source: "met-oedema-2022",
      quote: "Multiple approaches may be used, including compression stockings, and lifestyle and dietary changes (Table 2).",
    },
    {
      action: "Consider a diuretic (water tablet) when swelling interferes with quality of life",
      why: "The European LeukemiaNet says fluid retention on CML drugs is normally manageable and reversible with diuretics; the MET inhibitor review's authors find such measures often only temporarily effective.",
      source: "met-oedema-2022",
      quote: "Consider use if edema is interfering with quality of life",
    },
    {
      action: "Do not rely on diuretics for puffy eyelids; if the swelling is troublesome, the dose is adjusted or the drug changed",
      why: "Swelling around the eyes on imatinib responds poorly to water tablets.",
      source: "eln-ae-2016",
      quote: "Diuretic therapy has limited benefit in periorbital oedema, and its management includes dose modification and ultimately changing to an alternative TKI as necessary.",
    },
    {
      action: "Advise on skin and foot care for swollen legs",
      why: "The review gives the aim as preventing cellulitis, a skin infection. It does not say what the care should consist of.",
      source: "met-oedema-2022",
      quote: "Patients should also be advised about appropriate skin and foot care to prevent secondary cellulitis",
    },
    {
      action: "On capmatinib or tepotinib, keep the dose for grade 2 swelling and, if it is intolerable, consider withholding and resuming at a lower dose; for grade 3 withhold until it resolves and restart at a lower dose",
      why: "The review's authors find that stopping the drug is frequently the only thing that fully clears this swelling. This is each label's general rule for adverse reactions, which the review applies to oedema; it is not a rule written for oedema.",
      source: "label-capmatinib",
      quote: "Maintain dose level. If intolerable, consider withholding TABRECTA until resolved, then resume TABRECTA at a reduced dose.",
    },
    {
      action: "On imatinib, withhold the drug for severe fluid retention until it has resolved",
      why: "The label says fluid retention reactions may be serious or life threatening; its examples of severe ones are fluid around the lungs, around the heart and in the abdomen.",
      source: "label-imatinib",
      quote: "If a severe non-hematologic adverse reaction develops (such as severe hepatotoxicity or severe fluid retention), Gleevec should be withheld until the event has resolved.",
    },
    {
      action: "On dasatinib, arrange a chest X-ray promptly for a new cough, breathlessness or chest pain",
      why: "The European LeukemiaNet (2020) notes that effusions on dasatinib may occur even after years of previously uncomplicated treatment.",
      source: "label-dasatinib",
      quote: "Evaluate patients who develop symptoms of pleural effusion or other fluid retention, such as new or worsened dyspnea on exertion or at rest, pleuritic chest pain, or dry cough, promptly with a chest x-ray or additional diagnostic imaging as appropriate.",
    },
    {
      action: "For a dasatinib pleural effusion, interrupt or reduce the dose, with or without diuretics and steroids; a severe effusion may need drainage",
      why: "ELN says these effusions are potentially reversible after stopping dasatinib and giving steroids and diuretics, and that drainage is needed in rare instances, usually of grade 3 or 4.",
      source: "eln-ae-2016",
      quote: "Management of dasatinib-related pleural effusions includes treatment suspension or reduction of the dose, with or without steroids and diuretics.",
    },
    {
      action: "After a first effusion has resolved the same dose could be restarted; after a second, reduce to the next lower dose; if a relapse causes symptoms, switching to another drug is preferred",
      why: "ELN 2016 reports that effusions recur in roughly 70% of cases. ELN 2025 lists recurrent effusions despite dose reductions among the side effects that call for a change of drug.",
      source: "eln-ae-2016",
      quote: "If the relapse is symptomatic, even if during the first occurrence of an effusion, switching is the preferred option.",
    },
    {
      action: "If breathlessness or fainting on dasatinib is not explained by an effusion, suspect pulmonary arterial hypertension and refer to a suitable specialist",
      why: "ELN calls raised pressure in the lung arteries rare on dasatinib but potentially fatal, and says prompt withdrawal of the drug may totally or partially reverse it. The label says to stop dasatinib if it is confirmed.",
      source: "eln-ae-2016",
      quote: "The presence of dyspnoea and syncope not explained by pleural effusion should prompt the suspicion of PAH.",
    },
    {
      action: "On telisotuzumab vedotin, withhold the drug for grade 2 or higher peripheral oedema until it is grade 1 or less; resume at the same dose after a first occurrence and at the next lower dose after a later one",
      why: "This is the US label's row for peripheral oedema, which it records in 22% of 168 patients (1.8% at grade 3 or 4). The label has no warning section on oedema and gives no reason for the rule. No EU product information was found.",
      source: "label-telisotuzumab-vedotin",
      quote: "Withhold EMRELIS until recovery to Grade ≤1.",
    },
    {
      action: "On vimseltinib, where swelling around the eyes or elsewhere means the dose is not tolerated, the EU SmPC withholds the drug temporarily and restarts at a reduced dose once the person has improved",
      why: "Neither label has a rule written for oedema, and neither sets a grade at which to act. The US label gives the same dose steps (20 mg, then 14 mg, twice weekly) without the sentence on withholding, and both stop the drug in people who cannot tolerate 14 mg. In the EU SmPC periorbital oedema led to a dose reduction or interruption in 18% and to permanent discontinuation in 2%.",
      source: "smpc-vimseltinib",
      quote: "If patients are unable to tolerate a 30 mg dose of ROMVIMZA, treatment with ROMVIMZA should be temporarily withheld.",
    },
  ],
  bestInClass: {
    statement: "Regular weighing, a search for other causes when swelling appears, simple physical measures and a diuretic considered when swelling interferes with quality of life, then a dose change by the label; on dasatinib, a prompt chest X-ray for chest symptoms and interruption or dose reduction for an effusion. None of this is graded and none rests on a randomised trial. The sources differ on how well diuretics work: the European LeukemiaNet (2016) says fluid retention on CML drugs is normally manageable and reversible with diuretics, but of limited benefit around the eyes; the MET inhibitor review (Nishio and colleagues 2022, written with Novartis-funded medical writers) says diuretics are given first in practice, yet in its authors' experience such measures are often only temporarily effective and stopping the drug is frequently the only complete answer. Labels differ on when to hold: capmatinib and tepotinib at grade 3 (and to be considered at intolerable grade 2), amivantamab and avapritinib at grade 3 or 4, imatinib and dasatinib when 'severe'. For recurrent dasatinib effusions, ELN 2016 offers stepwise dose reduction or a switch, and ELN 2025 says recurrence despite dose reductions calls for a change of drug. Of the two labels added on 18 November 2026, telisotuzumab vedotin (US) holds earlier, at grade 2 or higher peripheral oedema; vimseltinib has no rule written for oedema in either label.",
    sources: ["eln-ae-2016", "eln-2025", "met-oedema-2022", "label-imatinib", "label-dasatinib", "label-capmatinib", "label-tepotinib", "label-amivantamab", "label-avapritinib", "label-telisotuzumab-vedotin", "label-vimseltinib", "smpc-vimseltinib"],
  },
  variants: [
    {
      name: "Hold and reduce rules, label by label",
      differs: "Imatinib: withhold for severe fluid retention until resolved, then resume as appropriate to the severity. Dasatinib (adults): withhold for a severe non-haematological reaction until resolved or improved, then resume as appropriate at a reduced dose depending on severity and recurrence; its fluid retention warning says to consider dose reduction or treatment interruption. Capmatinib and tepotinib (the general row for other adverse reactions): grade 2, maintain the dose, and if intolerable consider withholding and resuming at a reduced dose; grade 3, withhold until resolved and resume at a reduced dose; grade 4, permanently discontinue (both labels). Amivantamab (other adverse reactions): grade 3, withhold until grade 1 or baseline, resuming at the same dose if recovery is within 1 week, at a reduced dose if after 1 week but within 4 weeks, and stopping permanently if recovery takes longer than 4 weeks; grade 4, withhold until grade 1 or baseline, resume at a reduced dose if recovery is within 4 weeks, and stop permanently if it is not or if a grade 4 reaction recurs. Avapritinib (other adverse reactions): grade 3 or 4, withhold until grade 2 or less, then the same or a reduced dose.",
      evidence: "Regulatory labels. None of the six labels has a dose-modification row written for oedema itself; imatinib and dasatinib have a fluid retention warning, and the other four apply their general rule for adverse reactions.",
      sources: ["label-imatinib", "label-dasatinib", "label-capmatinib", "label-tepotinib", "label-amivantamab", "label-avapritinib"],
    },
    {
      name: "Measuring limb volume before and during a MET inhibitor",
      differs: "One lymphoedema clinic, described in the MET inhibitor review, measures limb volume before treatment and again if swelling develops: a change of 5 to 10% means close monitoring and more than 10% means starting compression. It also uses lymphatic massage and stretching exercises.",
      evidence: "One centre's practice as reported in a review (funded by Novartis); the review notes that in some patients these methods improved the swelling and in others it resolved only when capmatinib was stopped.",
      sources: ["met-oedema-2022"],
    },
    {
      name: "Restarting dasatinib after an effusion",
      differs: "ELN 2016: the same dose after a first episode has resolved, the next lower dose after a second (for example 80 mg from 100 mg a day), then stepwise down to 50 mg a day or a switch to another drug; switching is preferred if a relapse is symptomatic. ELN 2025 does not repeat that scheme: it says adverse events in responding patients can be managed by dose reduction, but that recurrent pleural effusions despite dose reductions and pulmonary hypertension require a change of drug. The dasatinib label says only to consider dose reduction or treatment interruption.",
      evidence: "Expert recommendation without a grade. ELN 2016 reports recurrence in roughly 70% of cases and grade 3 or 4 effusions in 4%. ELN 2020 gives a 5-year cumulative incidence of 37% and lists older age, twice-daily dosing, cardiac or autoimmune disease, hypertension, high cholesterol and advanced-phase disease as risk factors. ELN 2025, a consensus panel aiming for 75% agreement, gives no incidence figure; its side-effect table marks pleural effusion as frequent on dasatinib and notes that it can occur late.",
      sources: ["eln-ae-2016", "eln-2020", "eln-2025", "label-dasatinib"],
    },
    {
      name: "Telisotuzumab vedotin and vimseltinib: the US label against the EU SmPC",
      differs: "Telisotuzumab vedotin (US label; no EU text found): peripheral oedema of grade 2 or higher, withhold until grade 1 or less, then the same dose after a first occurrence and the next lower dose after a later one. Vimseltinib: no oedema rule in either label. The US label gives a table of dose reductions (20 mg, then 14 mg, twice weekly) and permanent discontinuation for those unable to tolerate 14 mg; the EU SmPC adds that treatment should be temporarily withheld when 30 mg is not tolerated and restarted at a reduced dose when the clinical condition improves.",
      evidence: "Regulatory labels; no trial compares the rules. Telisotuzumab vedotin: peripheral oedema in 22% of 168 patients, 1.8% at grade 3 or 4 (US label). Vimseltinib: periorbital oedema in 60%, peripheral oedema in 33% and face oedema in 31% (US label); periorbital oedema in 63% (EU SmPC); both labels report that higher exposure to the drug went with more oedema.",
      sources: ["label-telisotuzumab-vedotin", "label-vimseltinib", "smpc-vimseltinib"],
    },
  ],
  grades: [
    { claim: "Peripheral oedema may be a sign of heart dysfunction, and treatment should follow the cause", grade: "Expert recommendation; not graded", source: "eln-ae-2016", quote: "Peripheral oedema could be a sign of cardiac dysfunction, and treatment must be aetiologically based." },
    { claim: "Diuretics have limited benefit for periorbital oedema", grade: "Expert recommendation; not graded", source: "eln-ae-2016", quote: "Diuretic therapy has limited benefit in periorbital oedema, and its management includes dose modification and ultimately changing to an alternative TKI as necessary." },
    { claim: "Management of MET inhibitor oedema is empiric", grade: "Review by four clinicians; not graded (manuscript preparation funded by Novartis)", source: "met-oedema-2022", quote: "Since the exact mechanism by which MET inhibitors induce edema is unclear, management is empiric" },
    { claim: "Diuretics are given first in practice for MET inhibitor oedema, with leg elevation", grade: "Review by four clinicians; not graded (manuscript preparation funded by Novartis)", source: "met-oedema-2022", quote: "In clinical practice, diuretic therapy is administered as first-line treatment and patients are advised to raise their legs to reduce lower limb edema." },
    { claim: "Supportive measures are often only temporarily effective for MET inhibitor oedema", grade: "Authors' clinical experience; not graded (manuscript preparation funded by Novartis)", source: "met-oedema-2022", quote: "The authors’ clinical experience is that such measures are often only temporarily effective, and that discontinuation of MET inhibitor therapy is frequently the only approach to completely resolving drug-induced peripheral edema." },
    { claim: "Dasatinib effusions: typical supportive care, and severe effusions may need drainage and oxygen", grade: "Regulatory label; not graded", source: "label-dasatinib", quote: "Fluid retention events were typically managed by supportive care measures that may include diuretics or short courses of steroids. Severe pleural effusion may require thoracentesis and oxygen therapy." },
    { claim: "After a second dasatinib effusion, it is advisable to reduce to the next lower dose", grade: "Expert recommendation; not graded", source: "eln-ae-2016", quote: "in the case of a second episode it is advisable to reduce the dose to the" },
    { claim: "Pleural effusion on dasatinib: 5-year cumulative incidence of 37%", grade: "Expert panel recommendations; this statement is not graded", source: "eln-2020", quote: "Pleural effusion is primarily associated with dasatinib, with a 5-year cumulative incidence of 37%." },
    { claim: "Recurrent pleural effusions despite dose reductions call for a change of drug, not a further dose reduction", grade: "Consensus panel recommendations; this statement is not graded", source: "eln-2025", quote: "These include recurrent pleural effusions despite dose reductions, pulmonary hypertension, venous or arterial occlusive events (VOE or AOE), enterocolitis, serious neurologic conditions (e.g. dementia, Parkinsonism) and immune-mediated myocarditis, hepatitis or nephritis." },
    { claim: "Tepotinib: withhold at grade 3 and resume at a reduced dose", grade: "Regulatory label; not graded", source: "label-tepotinib", quote: "Withhold TEPMETKO until resolved, then resume TEPMETKO at a reduced dose." },
    { claim: "Amivantamab: withhold at grade 3 until grade 1 or baseline", grade: "Regulatory label; not graded", source: "label-amivantamab", quote: "Withhold RYBREVANT until recovery to ≤ Grade 1 or baseline." },
    { claim: "Avapritinib: withhold at grade 3 or 4 until grade 2 or less", grade: "Regulatory label; not graded", source: "label-avapritinib", quote: "Withhold AYVAKIT until improvement to less than or equal to Grade 2. Resume at same dose or reduced dose, as clinically appropriate." },
    { claim: "Imatinib: oedema is usually periorbital or in the legs and was managed with diuretics, supportive measures or a lower dose", grade: "Regulatory label; not graded", source: "label-imatinib", quote: "Edema was most frequently periorbital or in lower limbs and was managed with diuretics, other supportive measures, or by reducing the dose of Gleevec" },
    { claim: "Telisotuzumab vedotin (US label): after a later occurrence of peripheral oedema, resume at the next lower dose", grade: "Regulatory label; not graded", source: "label-telisotuzumab-vedotin", quote: "Resume EMRELIS at the next lower dose level." },
    { claim: "Vimseltinib (US label): stop for good in people unable to tolerate 14 mg twice weekly", grade: "Regulatory label; not graded", source: "label-vimseltinib", quote: "Permanently discontinue ROMVIMZA in patients who are unable to tolerate 14 mg orally twice weekly." },
    { claim: "Vimseltinib (EU SmPC): periorbital oedema is among the commonest reasons for a dose reduction or interruption", grade: "Regulatory label; not graded", source: "smpc-vimseltinib", quote: "frequently observed adverse reactions leading to dose reductions or interruptions were rash (21%), periorbital oedema (18%), increased creatine phosphokinase (CPK) (17%), pruritus (10%), face oedema (7%), generalised oedema (7%), fatigue (6%) and peripheral oedema (5%)." },
  ],
  sources: [
    {
      key: "eln-ae-2016",
      label: "European LeukemiaNet recommendations for the management and avoidance of adverse events of treatment in chronic myeloid leukaemia",
      publisher: "Leukemia (Steegmann et al., for the European LeukemiaNet; authors declare honoraria and research funding from the makers of the drugs discussed)",
      year: 2016,
      url: "https://doi.org/10.1038/leu.2016.104",
      doi: "10.1038/leu.2016.104",
      gradingScheme: "Expert panel recommendations from a literature review; no levels of evidence or grades are printed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eln-2020",
      label: "European LeukemiaNet 2020 recommendations for treating chronic myeloid leukemia",
      publisher: "Leukemia (Hochhaus et al., for the European LeukemiaNet; panel members declare research support and honoraria from the makers of the drugs discussed)",
      year: 2020,
      url: "https://doi.org/10.1038/s41375-020-0776-2",
      doi: "10.1038/s41375-020-0776-2",
      gradingScheme: "Consensus recommendations of a 34-member expert panel; the passages used here carry no grade. Replaced by the 2025 edition.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "eln-2025",
      label: "2025 European LeukemiaNet recommendations for the management of chronic myeloid leukemia",
      publisher: "Leukemia (Apperley et al., for the European LeukemiaNet; meetings funded by the ELN with no commercial funding; panel members declare honoraria and research support from the makers of the drugs discussed)",
      year: 2025,
      url: "https://doi.org/10.1038/s41375-025-02664-w",
      doi: "10.1038/s41375-025-02664-w",
      gradingScheme: "Consensus recommendations of a 38-member panel with a target of at least 75% concordance; no levels of evidence or grades are printed for the passages used here.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "met-oedema-2022",
      label: "Management of Peripheral Edema in Patients with MET Exon 14-Mutated Non-small Cell Lung Cancer Treated with Small Molecule MET Inhibitors (manuscript preparation funded by Novartis)",
      publisher: "Targeted Oncology (Nishio et al.; outline and first draft written by medical writers funded by Novartis, Japan)",
      year: 2022,
      url: "https://doi.org/10.1007/s11523-022-00912-y",
      doi: "10.1007/s11523-022-00912-y",
      gradingScheme: "A narrative review with the authors' clinical experience; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    { key: "label-imatinib", label: "Gleevec (imatinib mesylate) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=211ef2da-2868-4a77-8055-1cb2cd78e24b", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-dasatinib", label: "Sprycel (dasatinib) tablets: US prescribing information", publisher: "Bristol Myers Squibb (E.R. Squibb & Sons), on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4764f37b-c9e6-4ede-bcc2-8a03b7c521df", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-avapritinib", label: "Ayvakit (avapritinib) tablets: US prescribing information", publisher: "Blueprint Medicines, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=645c887c-8cd4-4623-8da9-ac223d71a8b9", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-capmatinib", label: "Tabrecta (capmatinib) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=455892c3-d144-4ba8-9ab4-79cabff9876d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-tepotinib", label: "Tepmetko (tepotinib) tablets: US prescribing information", publisher: "EMD Serono, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=80a0f1b9-071a-47f5-9e67-32d638a669dc", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-amivantamab", label: "Rybrevant (amivantamab-vmjw) injection: US prescribing information", publisher: "Janssen Biotech, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1466c070-9f97-4fa4-a955-6a6b59981fb8", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-loncastuximab-tesirine", label: "Zynlonta (loncastuximab tesirine-lpyl) for injection: US prescribing information (revised November 2026)", publisher: "ADC Therapeutics, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=af54af12-3edf-4301-8bc5-0446bc813c1d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-loncastuximab-tesirine", label: "Zynlonta (loncastuximab tesirine): EU summary of product characteristics and package leaflet (listed by the EMA as last updated 14 September 2026)", publisher: "Swedish Orphan Biovitrum, on the European Medicines Agency website", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/zynlonta-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-telisotuzumab-vedotin", label: "Emrelis (telisotuzumab vedotin-tllv) for injection: US prescribing information (SPL version 3, 25 May 2025)", publisher: "AbbVie, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bc04f980-3957-4e35-ab81-8ec2ffe87215", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-vimseltinib", label: "Romvimza (vimseltinib) capsules: US prescribing information (SPL version 3, 26 June 2026)", publisher: "Deciphera Pharmaceuticals, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f73c7a62-9601-4df0-810f-100f515d79ea", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-vimseltinib", label: "Romvimza (vimseltinib): EU summary of product characteristics and package leaflet (listed by the EMA as last updated 11 February 2026)", publisher: "Deciphera Pharmaceuticals (Netherlands), on the European Medicines Agency website", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/romvimza-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
  ],
  drugs: ["imatinib", "dasatinib", "avapritinib", "capmatinib", "tepotinib", "amivantamab", "vimseltinib", "telisotuzumab-vedotin"],
  terms: ["ctcae-grading", "vte"],
  related: ["cardio-oncology-risk-assessment-and-cardiac-surveillance", "lymphoedema-risk-reduction-surveillance-and-treatment", "capillary-leak-syndrome-on-anticancer-drugs", "differentiation-syndrome-recognition-and-treatment"],
  upgrades: [],
  gaps: [
    "No graded guideline on drug-induced oedema from kinase inhibitors was read. The CML adverse event recommendations are ungraded expert opinion from 2016 and no newer edition of them was found on 17 November 2026; the 2025 European LeukemiaNet recommendations replace the 2020 edition, say that describing every side effect in detail is beyond their scope, and give no stepwise plan for an effusion; for MET inhibitors the only management paper read is a review whose outline and first draft were written by medical writers funded by Novartis, the maker of capmatinib, and which itself calls management empiric.",
    "No randomised trial of diuretics, compression, salt restriction or any other measure for this kind of swelling was cited by any source read. Which diuretic, at what dose and for how long is not stated by any of them.",
    "How often to weigh is not stated: the imatinib label says 'regularly'. No source read sets a weight gain that should trigger action, or a time limit for investigating it.",
    "How quickly a patient should call: the dasatinib label says to seek medical attention promptly for swelling, weight gain, dry cough, chest pain on breathing or shortness of breath, and the imatinib label says to contact the healthcare provider about unexpected rapid weight gain. On 17 November 2026 no source read gave a time limit such as the same day, so the page says promptly.",
    "The MET inhibitor review asks for skin and foot care to prevent cellulitis without saying what it consists of.",
    "For avapritinib, capmatinib, tepotinib and amivantamab the labels have no rule written for oedema; the rule given here is each label's general row for other adverse reactions, which is silent below grade 3 for amivantamab and avapritinib. The dasatinib rule quoted is the one for adults; the label has separate rows for children.",
    "Amivantamab oedema: only the label was read. It lists oedema among the common reactions and among reasons for interrupting or stopping treatment, alongside low albumin, when given with lazertinib; no management guidance specific to amivantamab was found.",
    "The ESMO guidelines on chronic myeloid leukaemia (2017) and on gastrointestinal stromal tumours (2022) were not read. On 17 November 2026 Europe PMC still listed both as subscription only with no open copy, and the DOI of the leukaemia guideline led to a redirect page with no text, so what they say on imatinib and avapritinib oedema is not given here. European product information was read only for vimseltinib (on 18 November 2026); for the six products read earlier it was not read, and none was found for telisotuzumab vedotin.",
    "Checking for a clot when one leg swells is given as practice: no source read for this page states it.",
    "Other products that record oedema in this corpus (adagrasib, belzutifan, lorlatinib, selpercatinib, zidesamtinib) were not read and are not listed among this protocol's drugs. Nilotinib and bosutinib are discussed by ELN 2016 but their labels were not read.",
    "Loncastuximab tesirine (Zynlonta) is not on this page. On 18 November 2026 its US label (revised November 2026) and its EU product information were read: both carry a warning on effusion and oedema, ask for monitoring and for imaging to be considered when symptoms of pleural or pericardial effusion appear, and withhold the drug at grade 2 or higher until grade 1 or less; the US label also has a row for pericardial effusion, joins capillary leak syndrome to the warning and tells patients to get emergency help right away. It was left out because it is a CD19-directed antibody-drug conjugate, neither a kinase inhibitor nor MET-targeted, because this page does not manage capillary leak syndrome, and because the advice here to tell the team promptly is weaker than that label's words. No protocol page in OnCo gave its oedema rule on that day.",
    "Vimseltinib: neither label has a warning, a monitoring instruction or a dose row for oedema, although periorbital oedema is among its commonest side effects, and neither sets a grade at which to withhold or reduce. No guidance paper on swelling from vimseltinib was read. Whether what the European LeukemiaNet says of periorbital oedema on imatinib holds for vimseltinib is not stated by any source read.",
    "Telisotuzumab vedotin was read in its US label only: on 18 November 2026 the EMA's medicine page and product-information address for Emrelis both returned 404. The label gives a dose row for peripheral oedema with no warning text, no monitoring instruction and no advice on supportive care.",
    "When to call, for the two products added on 18 November 2026: the vimseltinib and telisotuzumab vedotin patient texts list swelling among the most common side effects and give no instruction on when to report it.",
  ],
});
