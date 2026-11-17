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
  tldr: "Some targeted cancer drugs make the body hold on to fluid: puffy eyelids, swollen ankles or, with dasatinib, fluid around the lungs. Most swelling is mild and is managed with raised legs, support stockings, less salt, sometimes water tablets, and a lower dose if needed. Sudden weight gain, new breathlessness, chest pain or one swollen, painful leg need a call to your cancer team the same day.",
  simple: "Some cancer tablets cause swelling of the eyelids or legs. Weighing yourself helps to spot it. Raising your legs, stockings and sometimes water tablets help. Ring your cancer helpline if you gain weight quickly, get short of breath or one leg swells. Your own team's plan comes first.",
  summary: "Fluid retention is among the commonest side effects of imatinib, avapritinib (oedema in 72% of people with GIST in its label, 2% grade 3 or higher) and the MET inhibitors (with tepotinib, oedema led to a dose interruption in 28%, a reduction in 22% and permanent stopping in 8%), and pleural effusion is the characteristic problem of dasatinib (28% at 5 years in first-line use, ELN 2016). The guidance is thin: expert recommendations from the European LeukemiaNet without grades, a Novartis-funded review for MET inhibitors, and general dose-modification rows in the labels. The reader's own team's protocol comes first.\n\nWatching: the imatinib label asks for regular weighing and for unexpected rapid weight gain to be investigated. Oedema on imatinib is commoner at higher doses and over 65. Before blaming the drug, other causes are sought: heart failure, kidney, liver or thyroid disease, low albumin, and a clot when one leg swells.\n\nSupportive care: leg elevation, compression stockings, exercise, less salt, skin and foot care, and a diuretic when swelling interferes with daily life. The evidence is experience, not trials: ELN says fluid retention on CML drugs is normally manageable and reversible with diuretics but that diuretics have limited benefit for periorbital oedema; the MET inhibitor review says management is empiric, and that in its authors' experience such measures are often only temporarily effective.\n\nLabel rules. Imatinib: withhold for severe fluid retention until resolved. Capmatinib and tepotinib: keep the dose at grade 2 unless intolerable; at grade 3 withhold until resolved and resume at a reduced dose. Amivantamab: withhold at grade 3 until grade 1 or baseline. Avapritinib: withhold at grade 3 or 4 until grade 2 or less. Dasatinib: withhold for a severe reaction and resume at a reduced dose.\n\nDasatinib pleural effusion: cough, breathlessness or chest pain prompt a chest X-ray. Management is interrupting or reducing the dose, with or without diuretics and short courses of steroids, and drainage when severe. ELN 2016 says the drug can be resumed at the same dose after a first episode, at the next lower dose after a second, and that switching is preferred if a relapse is symptomatic; recurrence occurs in roughly 70%. Breathlessness or fainting not explained by an effusion should raise suspicion of pulmonary arterial hypertension.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage", "acute-oncology-service", "community"],
  },
  population: "Adults taking imatinib, dasatinib, avapritinib, capmatinib, tepotinib or amivantamab, whose US labels were read, and by the same principles other kinase inhibitors that cause oedema. Not covered: lymphoedema after surgery or radiotherapy, which is a different condition with its own page; effusions caused by the cancer itself; capillary leak syndrome; differentiation syndrome; children.",
  trigger: "Starting one of these drugs (baseline weight and teaching), new swelling of the eyelids, face, legs or abdomen, rapid weight gain, or new cough, breathlessness or chest pain.",
  steps: [
    {
      action: "Before starting, tell the person that swelling is likely and check for conditions that make it more likely",
      why: "People who expect it report it early, and heart, kidney or liver problems make swelling worse and harder to read.",
      source: "met-oedema-2022",
      quote: "Before initiating MET inhibitor treatment, patients should be advised of the likelihood of edema development and assessed for any underlying conditions that might predispose them to developing edema",
    },
    {
      action: "Record a baseline weight and weigh regularly through treatment",
      why: "Weight rises before swelling is obvious, so the scales give the earliest warning.",
      source: "label-imatinib",
      quote: "Weigh and monitor patients regularly for signs and symptoms of fluid retention.",
    },
    {
      action: "Investigate unexpected rapid weight gain the same week; do not put it down to eating more",
      why: "Rapid gain can mean fluid collecting around the lungs, the heart or in the abdomen, where it cannot be seen.",
      source: "label-imatinib",
      quote: "Investigate unexpected rapid weight gain carefully and provide appropriate treatment.",
    },
    {
      action: "When swelling appears, look for another cause: examine the legs and check kidney, liver and thyroid function and a marker of heart failure",
      why: "Swelling is common in people with cancer for many reasons, and each cause has its own treatment.",
      source: "met-oedema-2022",
      quote: "Lower extremity examination, tests for renal, hepatic, or thyroid function, or markers of heart failure, such as B-type natriuretic peptide, may also help to elucidate the underlying cause",
    },
    {
      action: "Treat swelling of one leg, particularly with pain, warmth or redness, as a possible clot until a scan shows otherwise",
      why: "Drug swelling is usually in both legs; a clot in a leg vein is common in cancer and is dangerous if missed.",
      practice: "No source read for this page states it as a step. The oedema guidance read assumes that other causes have been excluded, and the amivantamab label carries a separate warning on venous thromboembolism. It is standard practice in the assessment of leg swelling.",
    },
    {
      action: "Start with simple measures: raise the legs when sitting and in bed, wear compression stockings, stay active and cut down on salt",
      why: "These help fluid drain from the legs and carry little risk.",
      source: "met-oedema-2022",
      quote: "Multiple approaches may be used, including compression stockings, and lifestyle and dietary changes (Table 2).",
    },
    {
      action: "Add a diuretic (water tablet) when swelling interferes with daily life",
      why: "A diuretic makes the kidneys pass more fluid; it often helps leg swelling, though not always for long.",
      source: "eln-ae-2016",
      quote: "However, in most cases fluid retention is not associated with cardiac dysfunction, and is normally manageable and reversible with diuretics.",
    },
    {
      action: "Do not rely on diuretics for puffy eyelids; if the swelling is troublesome, the dose is adjusted or the drug changed",
      why: "Swelling around the eyes on imatinib responds poorly to water tablets.",
      source: "eln-ae-2016",
      quote: "Diuretic therapy has limited benefit in periorbital oedema, and its management includes dose modification and ultimately changing to an alternative TKI as necessary.",
    },
    {
      action: "Look after swollen skin: moisturise, protect the feet and report any redness, heat or broken skin",
      why: "Stretched, swollen skin breaks down easily and can become infected.",
      source: "met-oedema-2022",
      quote: "Patients should also be advised about appropriate skin and foot care to prevent secondary cellulitis",
    },
    {
      action: "On a MET inhibitor, keep the dose for moderate swelling unless it is intolerable; for severe swelling withhold until it settles and restart at a lower dose",
      why: "Stopping the drug is often the only thing that fully clears this swelling, so the dose is the main lever once simple measures fail.",
      source: "label-capmatinib",
      quote: "Maintain dose level. If intolerable, consider withholding TABRECTA until resolved, then resume TABRECTA at a reduced dose.",
    },
    {
      action: "On imatinib, withhold the drug for severe fluid retention until it has resolved",
      why: "Severe fluid retention can involve the lungs, the sac around the heart or the abdomen and can be life-threatening.",
      source: "label-imatinib",
      quote: "If a severe non-hematologic adverse reaction develops (such as severe hepatotoxicity or severe fluid retention), Gleevec should be withheld until the event has resolved.",
    },
    {
      action: "On dasatinib, arrange a chest X-ray promptly for a new cough, breathlessness or chest pain",
      why: "Fluid around the lung is common on dasatinib and can appear after years of trouble-free treatment.",
      source: "label-dasatinib",
      quote: "Evaluate patients who develop symptoms of pleural effusion or other fluid retention, such as new or worsened dyspnea on exertion or at rest, pleuritic chest pain, or dry cough, promptly with a chest x-ray or additional diagnostic imaging as appropriate.",
    },
    {
      action: "For a dasatinib pleural effusion, interrupt or reduce the dose, with or without a diuretic and a short course of steroids; drain the fluid if it is large",
      why: "Most effusions shrink once the drug is paused; drainage relieves breathlessness when the collection is large.",
      source: "eln-ae-2016",
      quote: "Management of dasatinib-related pleural effusions includes treatment suspension or reduction of the dose, with or without steroids and diuretics.",
    },
    {
      action: "If the effusion comes back, restart at the next lower dose, and consider changing to another drug if it keeps returning or causes symptoms",
      why: "Effusions return in most people who restart, and a lower dose or a different drug usually controls the leukaemia as well.",
      source: "eln-ae-2016",
      quote: "If the relapse is symptomatic, even if during the first occurrence of an effusion, switching is the preferred option.",
    },
    {
      action: "If breathlessness or fainting on dasatinib is not explained by an effusion, investigate for pulmonary arterial hypertension",
      why: "Raised pressure in the lung arteries is rare on dasatinib but can be fatal, and stopping the drug may reverse it.",
      source: "eln-ae-2016",
      quote: "The presence of dyspnoea and syncope not explained by pleural effusion should prompt the suspicion of PAH.",
    },
  ],
  bestInClass: {
    statement: "Regular weighing, a search for other causes when swelling appears, simple physical measures and a diuretic when needed, then a dose change by the label; on dasatinib, a prompt chest X-ray for chest symptoms and interruption or dose reduction for an effusion. None of this is graded and none rests on a randomised trial. The sources differ on how well diuretics work: the European LeukemiaNet (2016) says fluid retention on CML drugs is normally manageable and reversible with diuretics, but of limited benefit around the eyes; the MET inhibitor review (Nishio and colleagues 2022, written with Novartis-funded medical writers) says diuretics are given first in practice, yet in its authors' experience such measures are often only temporarily effective and stopping the drug is frequently the only complete answer. Labels differ on when to hold: capmatinib and tepotinib at grade 3 (or intolerable grade 2), amivantamab at grade 3, avapritinib at grade 3 or 4, imatinib and dasatinib when 'severe'.",
    sources: ["eln-ae-2016", "met-oedema-2022", "label-imatinib", "label-dasatinib", "label-capmatinib", "label-tepotinib", "label-amivantamab", "label-avapritinib"],
  },
  variants: [
    {
      name: "Hold and reduce rules, label by label",
      differs: "Imatinib: withhold for severe fluid retention until resolved, then resume as appropriate to the severity. Dasatinib: withhold for a severe non-haematological reaction until resolved or improved, then resume at a reduced dose depending on severity and recurrence. Capmatinib and tepotinib (the general row for other adverse reactions): grade 2, maintain the dose, and if intolerable consider withholding and resuming at a reduced dose; grade 3, withhold until resolved and resume at a reduced dose; grade 4, permanently discontinue (tepotinib). Amivantamab (other adverse reactions): grade 3, withhold until grade 1 or baseline, resuming at the same dose if recovery is within 1 week, at a reduced dose if within 4 weeks, and stopping if it takes longer. Avapritinib (other adverse reactions): grade 3 or 4, withhold until grade 2 or less, then the same or a reduced dose.",
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
      differs: "ELN 2016: the same dose after a first episode has resolved, the next lower dose after a second (for example 80 mg from 100 mg a day), then stepwise down to 50 mg a day or a switch to another drug; switching is preferred if a relapse is symptomatic. The dasatinib label says only to consider dose reduction or treatment interruption.",
      evidence: "Expert recommendation without a grade. ELN 2016 reports recurrence in roughly 70% of cases and grade 3 or 4 effusions in 4%. ELN 2020 gives a 5-year cumulative incidence of 37% and lists older age, twice-daily dosing, cardiac or autoimmune disease, hypertension, high cholesterol and advanced-phase disease as risk factors.",
      sources: ["eln-ae-2016", "eln-2020", "label-dasatinib"],
    },
  ],
  grades: [
    { claim: "Peripheral oedema may be a sign of heart dysfunction, and treatment should follow the cause", grade: "Expert recommendation; not graded", source: "eln-ae-2016", quote: "Peripheral oedema could be a sign of cardiac dysfunction, and treatment must be aetiologically based." },
    { claim: "Diuretics have limited benefit for periorbital oedema", grade: "Expert recommendation; not graded", source: "eln-ae-2016", quote: "Diuretic therapy has limited benefit in periorbital oedema, and its management includes dose modification and ultimately changing to an alternative TKI as necessary." },
    { claim: "Management of MET inhibitor oedema is empiric", grade: "Review by four clinicians; not graded (manuscript preparation funded by Novartis)", source: "met-oedema-2022", quote: "Since the exact mechanism by which MET inhibitors induce edema is unclear, management is empiric" },
    { claim: "Diuretics are given first in practice for MET inhibitor oedema, with leg elevation", grade: "Review by four clinicians; not graded (manuscript preparation funded by Novartis)", source: "met-oedema-2022", quote: "In clinical practice, diuretic therapy is administered as first-line treatment and patients are advised to raise their legs to reduce lower limb edema." },
    { claim: "Supportive measures are often only temporarily effective for MET inhibitor oedema", grade: "Authors' clinical experience; not graded (manuscript preparation funded by Novartis)", source: "met-oedema-2022", quote: "The authors’ clinical experience is that such measures are often only temporarily effective, and that discontinuation of MET inhibitor therapy is frequently the only approach to completely resolving drug-induced peripheral edema." },
    { claim: "Dasatinib effusions: typical supportive care, and drainage when severe", grade: "Regulatory label; not graded", source: "label-dasatinib", quote: "Fluid retention events were typically managed by supportive care measures that may include diuretics or short courses of steroids. Severe pleural effusion may require thoracentesis and oxygen therapy." },
    { claim: "After a second dasatinib effusion, reduce to the next lower dose", grade: "Expert recommendation; not graded", source: "eln-ae-2016", quote: "in the case of a second episode it is advisable to reduce the dose to the" },
    { claim: "Pleural effusion on dasatinib: 5-year cumulative incidence of 37%", grade: "Expert panel recommendations; this statement is not graded", source: "eln-2020", quote: "Pleural effusion is primarily associated with dasatinib, with a 5-year cumulative incidence of 37%." },
    { claim: "Tepotinib: withhold at grade 3 and resume at a reduced dose", grade: "Regulatory label; not graded", source: "label-tepotinib", quote: "Withhold TEPMETKO until resolved, then resume TEPMETKO at a reduced dose." },
    { claim: "Amivantamab: withhold at grade 3 until grade 1 or baseline", grade: "Regulatory label; not graded", source: "label-amivantamab", quote: "Resume at reduced dose if recovery occurs after 1 week but within 4 weeks." },
    { claim: "Avapritinib: withhold at grade 3 or 4 until grade 2 or less", grade: "Regulatory label; not graded", source: "label-avapritinib", quote: "Withhold AYVAKIT until improvement to less than or equal to Grade 2. Resume at same dose or reduced dose, as clinically appropriate." },
    { claim: "Imatinib: oedema is usually periorbital or in the legs and was managed with diuretics, supportive measures or a lower dose", grade: "Regulatory label; not graded", source: "label-imatinib", quote: "Edema was most frequently periorbital or in lower limbs and was managed with diuretics, other supportive measures, or by reducing the dose of Gleevec" },
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
      accessed: "2026-11-16",
    },
    {
      key: "eln-2020",
      label: "European LeukemiaNet 2020 recommendations for treating chronic myeloid leukemia",
      publisher: "Leukemia (Hochhaus et al., for the European LeukemiaNet; panel members declare research support and honoraria from the makers of the drugs discussed)",
      year: 2020,
      url: "https://doi.org/10.1038/s41375-020-0776-2",
      doi: "10.1038/s41375-020-0776-2",
      gradingScheme: "Consensus recommendations of a 34-member expert panel; the passages used here carry no grade.",
      read: "full-text",
      accessed: "2026-11-16",
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
      accessed: "2026-11-16",
    },
    { key: "label-imatinib", label: "Gleevec (imatinib mesylate) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=211ef2da-2868-4a77-8055-1cb2cd78e24b", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-dasatinib", label: "Sprycel (dasatinib) tablets: US prescribing information", publisher: "Bristol Myers Squibb (E.R. Squibb & Sons), on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4764f37b-c9e6-4ede-bcc2-8a03b7c521df", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-avapritinib", label: "Ayvakit (avapritinib) tablets: US prescribing information", publisher: "Blueprint Medicines, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=645c887c-8cd4-4623-8da9-ac223d71a8b9", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-capmatinib", label: "Tabrecta (capmatinib) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=455892c3-d144-4ba8-9ab4-79cabff9876d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-tepotinib", label: "Tepmetko (tepotinib) tablets: US prescribing information", publisher: "EMD Serono, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=80a0f1b9-071a-47f5-9e67-32d638a669dc", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "label-amivantamab", label: "Rybrevant (amivantamab-vmjw) injection: US prescribing information", publisher: "Janssen Biotech, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1466c070-9f97-4fa4-a955-6a6b59981fb8", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-16" },
  ],
  drugs: ["imatinib", "dasatinib", "avapritinib", "capmatinib", "tepotinib", "amivantamab"],
  terms: ["ctcae-grading", "vte"],
  related: ["cardio-oncology-risk-assessment-and-cardiac-surveillance", "lymphoedema-risk-reduction-surveillance-and-treatment", "capillary-leak-syndrome-on-anticancer-drugs", "differentiation-syndrome-recognition-and-treatment"],
  upgrades: [],
  gaps: [
    "No graded guideline on drug-induced oedema from kinase inhibitors was read. The CML recommendations are ungraded expert opinion from 2016; for MET inhibitors the only management paper read is a review whose outline and first draft were written by medical writers funded by Novartis, the maker of capmatinib, and which itself calls management empiric.",
    "No randomised trial of diuretics, compression, salt restriction or any other measure for this kind of swelling was cited by any source read. Which diuretic, at what dose and for how long is not stated by any of them.",
    "How often to weigh is not stated: the imatinib label says 'regularly'. No source read sets a weight gain that should trigger action.",
    "For avapritinib, capmatinib, tepotinib and amivantamab the labels have no rule written for oedema; the rule given here is each label's general row for other adverse reactions, which is silent below grade 3 for amivantamab and avapritinib.",
    "Amivantamab oedema: only the label was read. It lists oedema among the common reactions and among reasons for interrupting or stopping treatment, with low albumin; no management guidance specific to amivantamab was found.",
    "The ESMO guidelines on chronic myeloid leukaemia and on gastrointestinal stromal tumours were not read (no open full text in Europe PMC), so what they say on imatinib and avapritinib oedema is not given here. European product information was not read.",
    "Checking for a clot when one leg swells is given as practice: no source read for this page states it.",
    "Other products that record oedema in this corpus (adagrasib, belzutifan, lorlatinib, selpercatinib, vimseltinib, zidesamtinib, loncastuximab tesirine, telisotuzumab vedotin) were not read and are not listed among this protocol's drugs. Nilotinib and bosutinib are discussed by ELN 2016 but their labels were not read.",
  ],
});
