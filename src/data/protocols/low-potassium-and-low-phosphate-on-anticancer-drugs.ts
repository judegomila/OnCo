import { protocol } from "./helpers";

/*
 * Low potassium (hypokalaemia) and low phosphate (hypophosphataemia) on anticancer drugs: who is checked, how a low
 * level is corrected, and when each product's label holds the medicine.
 *
 * Written 18 November 2026. Every source was fetched that day with curl and read as raw text; every quote was checked
 * by script (whitespace and line-break hyphenation normalised, nothing else).
 *
 * What was read, and how:
 * - Ten product documents, five medicines, US and EU for each. US labels are the DailyMed SPL XML stripped to text:
 *   VANFLYTA (quizartinib; SPL version dated 16 April 2026, Medication Guide issued 7/2023), OGSIVEO (nirogacestat;
 *   revised 08/2026), UNITUXIN (dinutuximab; SPL version dated 6 July 2026), LUTATHERA (lutetium Lu 177 dotatate; SPL
 *   version dated 15 January 2026) and ZYTIGA (abiraterone acetate; revised 11/2024, SPL version dated 28 March 2025).
 *   EU product information is the EMA PDF through pdftotext -layout: Vanflyta (PDF dated 28 April 2026), Ogsiveo
 *   (21 August 2026), Qarziba (dinutuximab beta; October 2026), Lutathera (July/August 2026) and Zytiga (31 July
 *   2024). The EMA files print no revision date in section 10, so the PDF date is given.
 * - LIFYORLI (relacorilant) US label, SPL version dated 26 March 2026: read in full. It contains no statement on
 *   potassium or electrolytes, so relacorilant is not in `drugs`. EMA returned 429 for a Lifyorli product information
 *   file and it was not requested again.
 * - NHS Specialist Pharmacy Service, "Treating acute hypokalaemia in adults" (published 14 August 2024): the public
 *   page, HTML stripped to text.
 * - NHS Grampian, guideline for acute hypokalaemia in adults, version 5 (approved May 2025): the public PDF.
 * - KDIGO Controversies Conference report on potassium (Clase et al., Kidney Int 2020): full text, the PDF on
 *   kdigo.org through pdftotext in reading order (the two-column layout interleaves under -layout). The report says
 *   emergency management of hypokalaemia was not addressed at the conference. The conference was supported in part by
 *   unrestricted educational grants from six companies, which the source label says.
 * - SEOM guidelines on hydroelectrolytic disorders (De las Penas et al., Clin Transl Oncol 2014): full text, Europe
 *   PMC XML (PMC4239780). A Europe PMC title search found no later SEOM guideline on the subject. It covers sodium,
 *   calcium, magnesium and potassium, not phosphate.
 * - UK Medicines Information Q&A, "How is acute hypophosphataemia treated in adults?" (prepared 20 July 2017): the
 *   PDF as hosted by Gloucestershire Hospitals. It is nine years old; the SPS site returned 404 for a current page.
 * - Netzer et al., BMC Medicine 2025, umbrella review of reviews and guidelines on hypophosphataemia: full text,
 *   Europe PMC XML (PMC12560374).
 * - Adhikari et al., Clin Kidney J 2021, "Hypophosphatemia in cancer patients": full text, Europe PMC XML
 *   (PMC8572986). A narrative review, not a guideline.
 * - Verzicco et al., Front Oncol 2020, "Electrolyte Disorders Induced by Antineoplastic Drugs": full text, Europe PMC
 *   XML (PMC7248368). A narrative review.
 * - CTCAE v5.0 (27 November 2017) and v6.0 (published 22 July 2025): the NCI PDFs. The definitions of hypokalaemia
 *   and hypophosphataemia are the same in both. They are tables, so the grades are stated in prose and not quoted.
 *
 * Not read:
 * - No oncology or nephrology society guideline on low phosphate from cancer medicines was found. The UK Q&A and the
 *   umbrella review both say there is no agreed guidance on phosphate replacement.
 * - The European Resuscitation Council guidance on life-threatening hypokalaemia and the BNF were not read.
 * - The 2022 ESC cardio-oncology guideline was not re-read here; its potassium target for people on QT-prolonging
 *   medicines is on the QT protocol (`qt-prolongation-monitoring-on-anticancer-drugs`), which also holds the ECG
 *   schedule and QTcF dose rules for quizartinib. This record holds only quizartinib's potassium rule.
 *
 * DOIs resolved through Crossref (10.1016/j.kint.2019.09.018, 10.1093/ckj/sfab078, 10.3389/fonc.2020.00779) or Europe
 * PMC (10.1007/s12094-014-1234-2, 10.1186/s12916-025-04415-1) and the titles checked.
 *
 * Second reader, 18 November 2026. An independent reader re-fetched eleven of the sources with curl (the US labels
 * for quizartinib, nirogacestat, abiraterone and lutetium-177 dotatate as DailyMed SPL XML; the EMA PDFs for Vanflyta
 * and Ogsiveo; NHS SPS; NHS Grampian; the KDIGO PDF; the UK phosphate Q&A; the SEOM full text from Europe PMC),
 * converted them the same way and found each byte-identical to the writer's saved text. The other sources were read
 * from the writer's copies saved the same day. All five DOIs were resolved again through Crossref. 162 claims were
 * checked: 0 wrong, 9 unsupported or overstated and reworded or removed, 0 unverifiable; all 35 quotes verified by script.
 * Changes: lutetium-177 dotatate was taken out of `drugs` and its step and grade row removed, because both labels only
 * list low potassium and the one potassium rule (EU SmPC) is about a HIGH potassium from the amino acid infusion; the
 * oral phosphate step was an order where the UK Q&A says "should be considered"; the SEOM guideline was cited for
 * "in hospital" and "symptomatic", which are NHS SPS wording, and its overlapping bands (moderate 2 to 3, severe below
 * 2.5 mmol/L) and its "20 Eq/h (100-150 mEq/day)" are now stated as printed; the two nirogacestat labels do not use
 * "the same words"; the EU nirogacestat Grade 3 figure is given as the SmPC prints it; a CTCAE definition was
 * attributed to the US label. The EMA address tried for a Lifyorli file returned 404 on this pass.
 */
export const lowPotassiumAndLowPhosphateOnAnticancerDrugs = protocol({
  id: "low-potassium-and-low-phosphate-on-anticancer-drugs",
  name: "Low potassium and low phosphate on anticancer drugs: monitoring, replacement and dose holds",
  aka: ["hypokalaemia on cancer treatment", "hypokalemia", "hypophosphataemia on cancer treatment", "hypophosphatemia", "low potassium on abiraterone", "low phosphate on nirogacestat", "potassium on quizartinib", "electrolytes on dinutuximab", "potassium replacement", "phosphate replacement"],
  domain: "symptom-management",
  tldr: "Some cancer medicines lower the potassium or phosphate in the blood. A mild fall usually causes no symptoms, so it is found on blood tests and treated with tablets or a drip. The medicine is paused only when a low level is severe or does not respond. Tell your team about muscle weakness, cramps or pain, palpitations, or diarrhoea or vomiting. Your own team's plan comes first.",
  simple: "Potassium and phosphate are salts in the blood that muscles and the heart need. Some cancer medicines make them drop. Blood tests pick this up, and the salts are replaced by mouth or through a drip. Tell your team if your muscles feel weak or sore, if your heart is thumping or uneven, or if you have diarrhoea or are being sick. Follow your own team's advice first.",
  summary: "Four medicines are covered from their own labels, US and EU side by side (dinutuximab in the US, dinutuximab beta in the EU); the general correction steps come from UK and society sources written for adults in general. Local protocols come first.\n\nQuizartinib: the potassium rule is tied to the QT interval. Both labels ask for hypokalaemia and hypomagnesaemia to be monitored and corrected before and during treatment, more often with diarrhoea or vomiting. The US label alone contraindicates quizartinib in severe hypokalaemia and has a row for Grade 3 or 4 hypokalaemia (below 3 mmol/L): interrupt, correct according to institutional guidelines, and restart at the previous dose at Grade 2 or less without symptoms. The EU SmPC has neither; it reports two cardiac arrests, both in the setting of severe hypokalaemia. ECG and QTcF rules are on the QT protocol.\n\nNirogacestat: monitor phosphate and potassium regularly and supplement as necessary (both labels). Withhold, then restart at 100 mg twice daily once Grade 1 or less or baseline: in the US for Grade 3 or 4 hypophosphataemia persisting for 3 days or more despite maximal replacement, in the EU for Grade 3 persisting for 7 days or more; for hypokalaemia despite maximal replacement, Grades 3 or 4 in the US and Grade 3 of any duration in the EU.\n\nDinutuximab: the US label asks for serum electrolytes daily during therapy (severe hypokalaemia in 37% in its trial); the EU SmPC for dinutuximab beta recommends regular monitoring. Neither gives a potassium dose rule.\n\nAbiraterone: correct hypokalaemia before and during treatment and check potassium at least monthly (US), or monthly and every 2 weeks for 3 months in people at significant risk of congestive heart failure (EU). Only the EU SmPC says to consider keeping potassium at 4.0 mM or above in people with hypokalaemia and to withhold for Grade 3 or higher.\n\nLutetium-177 dotatate is not covered: both labels list hypokalaemia and neither gives a rule for it. The one potassium rule, in the EU SmPC, concerns a high potassium from the amino acid infusion (see gaps).\n\nReplacement: oral potassium for mild or moderate hypokalaemia and intravenous potassium chloride in hospital for severe or symptomatic hypokalaemia (NHS SPS, England); the 2014 SEOM guideline likewise gives potassium by mouth for mild and moderate and into a vein for severe hypokalaemia (level IV, grade D). The KDIGO conference participants think an ECG and magnesium should be checked. Sources differ on infusion rates. For phosphate there is no agreed guidance: the UK Q&A replaces below 0.3 mmol/L and considers it at 0.3 to 0.6 mmol/L, while a nephrology review says to correct low phosphate in people with cancer when it is first recognised.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "ward"],
  },
  population: "People taking quizartinib, nirogacestat, dinutuximab or dinutuximab beta, or abiraterone, as their labels scope them: nirogacestat and quizartinib are for adults; dinutuximab (US) is for paediatric patients and dinutuximab beta (EU) for patients aged 12 months and above. The general replacement sources are written for adults: NHS SPS and NHS Grampian for acute hypokalaemia in adults (Grampian excludes people under 16), the UK Q&A for acute hypophosphataemia in adults, and it excludes chronic hypophosphataemia, complex medical problems, renal impairment and refeeding syndrome. No source read gives potassium or phosphate doses for children, so replacement in a child on dinutuximab follows the paediatric unit's own protocol. Low sodium, low magnesium on EGFR antibodies, high phosphate on FGFR inhibitors, tumour lysis syndrome, capillary leak with low albumin, and the ECG rules for quizartinib have their own protocols.",
  trigger: "Before starting one of these medicines, at each scheduled blood test during treatment, and whenever a potassium result is below 3.5 mmol/L or a phosphate result is below the laboratory's normal range.",
  steps: [
    {
      action: "Before quizartinib, check potassium and magnesium and correct any low value before the first dose",
      why: "Both the US label and the EU SmPC ask for this, because quizartinib lengthens the QT interval. Both also ask for electrolytes and ECGs to be checked more often in people who have diarrhoea or vomiting. The abiraterone labels likewise ask for low potassium to be corrected before treatment starts.",
      source: "label-vanflyta",
      quote: "Perform an ECG and correct electrolyte abnormalities prior to initiation of treatment with VANFLYTA.",
    },
    {
      action: "Do not give quizartinib to a person with severe hypokalaemia or severe hypomagnesaemia (US label)",
      why: "This is a contraindication in the US label. The EU SmPC does not list it among its contraindications, but reports that two patients had a cardiac arrest with ventricular fibrillation, one fatal, both in the setting of severe hypokalaemia.",
      source: "label-vanflyta",
      quote: "VANFLYTA is contraindicated in patients with severe hypokalemia, severe hypomagnesemia, long QT syndrome, or in patients with a history of ventricular arrhythmias or torsades de pointes",
    },
    {
      action: "During dinutuximab, measure serum electrolytes every day (US label)",
      why: "In the label's main trial, severe low potassium occurred in 37% of patients given dinutuximab against 2% of those not given it, and severe low sodium in 23% against 4%. The EU SmPC for dinutuximab beta says only that regular monitoring of electrolytes is recommended. Neither gives a dose rule for low potassium.",
      source: "label-unituxin",
      quote: "Monitor serum electrolytes daily during therapy with Unituxin.",
    },
    {
      action: "On nirogacestat, check phosphate and potassium regularly and supplement as necessary",
      why: "Both labels say this in nearly the same words and neither gives an interval. The US label reports decreased phosphate in 65% and decreased potassium in 22% of people on nirogacestat in its trial; the EU SmPC reports a median of 15 days to the first low phosphate or low potassium.",
      source: "label-ogsiveo",
      quote: "Monitor phosphate and potassium levels regularly and supplement as necessary.",
    },
    {
      action: "On abiraterone, check potassium, blood pressure and fluid retention at least once a month",
      why: "The US label explains that abiraterone can cause high blood pressure, low potassium and fluid retention through raised mineralocorticoid levels, and that QT prolongation and torsades de pointes have been seen in people who became hypokalaemic on it. The EU SmPC says monthly, and every 2 weeks for the first 3 months in people at significant risk of congestive heart failure.",
      source: "label-zytiga",
      quote: "Monitor patients for hypertension, hypokalemia, and fluid retention at least once a month.",
    },
    {
      action: "When potassium is below 3.5 mmol/L, check an ECG and the magnesium level, and identify and treat the cause",
      why: "The KDIGO conference lists these as what its participants think a management protocol should include; it is a conference view, not a graded recommendation. NHS SPS says to identify and treat the underlying causes and names magnesium depletion, diarrhoea and medicines among them. NHS Grampian notes that potassium can be difficult to correct until magnesium is normal.",
      source: "kdigo-potassium-2020",
      quote: "ECG and magnesium should be checked.",
    },
    {
      action: "For mild or moderate low potassium (2.5 to 3.5 mmol/L), use potassium by mouth",
      why: "This is NHS SPS guidance for adults in England, which gives 24 mmol up to 2 to 3 times a day for mild and 24 to 36 mmol up to 3 to 4 times a day for moderate hypokalaemia, with lower doses possibly needed in renal impairment. The KDIGO report says oral supplements are safe and generally preferred to intravenous replacement in noncritical scenarios.",
      source: "sps-hypokalaemia",
      quote: "Use oral potassium replacement.",
    },
    {
      action: "For severe (below 2.5 mmol/L) or symptomatic low potassium, give potassium chloride into a vein in hospital, at a controlled rate with monitoring",
      why: "NHS SPS says potassium overdose can be fatal and that intravenous potassium should be given where appropriate monitoring is available. It gives an initial 40 mmol/L, a rate that should not normally exceed 10 mmol an hour, and cardiac monitoring above 20 mmol an hour. Other sources allow different rates (see variants).",
      source: "sps-hypokalaemia",
      quote: "IV potassium chloride should be given in a hospital setting.",
    },
    {
      action: "On quizartinib, interrupt the medicine for Grade 3 or 4 hypokalaemia (below 3 mmol/L), correct it, and restart at the previous dose once it is Grade 2 or less without symptoms (US label)",
      why: "This row is in the US label only, and the label leaves the method of correction to institutional guidelines. The EU SmPC has no row for hypokalaemia: it asks for monitoring and correction, and its general row for Grade 3 or 4 non-haematological reactions interrupts quizartinib.",
      source: "label-vanflyta",
      quote: "Interrupt VANFLYTA. Correct hypokalemia and hypomagnesemia according to institutional guidelines. VANFLYTA may be restarted at the previous dose when the adverse reaction improves to Grade 2 or less without symptoms.",
    },
    {
      action: "On nirogacestat, withhold the medicine for Grade 3 or 4 low phosphate that persists for 3 days or more despite maximal replacement (US label; the EU SmPC says Grade 3 for 7 days or more), then restart at 100 mg twice daily once it is Grade 1 or less or back to baseline",
      why: "The two labels set different waiting times and neither gives a reason. The US label notes that CTCAE version 5.0 has no numeric thresholds for grading low phosphate. In CTCAE itself, Grade 3 is severe or medically significant but not immediately life-threatening, with hospitalisation indicated.",
      source: "label-ogsiveo",
      quote: "Withhold OGSIVEO until resolved to Grade ≤ 1 or baseline, then restart at a dosage of 100 mg twice daily.",
    },
    {
      action: "On nirogacestat, withhold the medicine for Grade 3 low potassium despite maximal replacement, whatever its duration (EU SmPC; the US label says Grades 3 or 4), then restart at 100 mg twice daily once it is Grade 1 or less or back to baseline",
      why: "Both labels hold the medicine only after maximal replacement has failed. CTCAE Grade 3 hypokalaemia is potassium below 3.0 down to 2.5 mmol/L with hospitalisation indicated.",
      source: "smpc-ogsiveo",
      quote: "For Grade 3 hypokalaemia of any duration, despite maximal replacement therapy, nirogacestat should be withheld until resolved to Grade ≤ 1 or baseline, then it should be restarted at a dose of 100 mg twice daily",
    },
    {
      action: "When phosphate is low, look for and treat the cause, and consider involving a kidney specialist if it is severe or does not respond",
      why: "This is the approach of a nephrology review of low phosphate in people with cancer, which names antacids and diarrhoea as examples of causes that can be dealt with. The same review says low phosphate, unless recurrent and life-threatening, should not be regarded as a reason to discontinue active cancer therapy. It is a review, not a guideline.",
      source: "adhikari-2021",
      quote: "The general approach to hypophosphatemia should be to treat the underlying cause.",
    },
    {
      action: "For moderate low phosphate (0.3 to 0.6 mmol/L) without symptoms, consider phosphate by mouth if a change of diet is unsuitable; consider phosphate into a vein for severe low phosphate (below 0.3 mmol/L), for symptoms, or when the oral route is not appropriate",
      why: "This is the UK Medicines Information answer for adults, based on one hospital trust's practice; it says there are no national guidelines and practice varies. It replaces phosphate below 0.3 mmol/L and considers it at 0.3 to 0.6 mmol/L if the person has symptoms or after weighing risks and benefits; its main text says intravenous therapy is indicated for severe or symptomatic low phosphate, and its summary says it may be considered. The 2025 umbrella review found the general consensus is to treat severe or moderate symptomatic low phosphate, with differing recommendations on dose.",
      source: "ukmi-hypophosphataemia-2017",
      quote: "In severe hypophosphataemia, in symptomatic patients and when the oral route is not appropriate, intravenous phosphate therapy may be considered.",
    },
    {
      action: "Before replacing phosphate, check calcium and kidney function: correct a low calcium first and use phosphate with caution in renal impairment",
      why: "The UK answer says calcium may fall further when phosphate is replaced, and that phosphate is cleared by the kidneys.",
      source: "ukmi-hypophosphataemia-2017",
      quote: "Patients with hypocalcaemia should have their calcium corrected before replacing phosphate to prevent further hypocalcaemia.",
    },
    {
      action: "On abiraterone, withhold treatment for Grade 3 or higher hypokalaemia until it is back to Grade 1 or baseline, and in anyone whose potassium is or becomes low consider keeping it at 4.0 mmol/L or above (EU SmPC)",
      why: "Both points are in the EU SmPC only. The US label says to correct hypokalaemia before and during treatment and gives no level and no hold. A review of electrolyte disorders says the low potassium is managed by the low-dose prednisone given with abiraterone, potassium chloride supplements and/or a mineralocorticoid antagonist.",
      source: "smpc-zytiga",
      quote: "For patients who develop Grade ≥ 3 toxicities including hypertension, hypokalaemia, oedema and other non-mineralocorticoid toxicities, treatment should be withheld and appropriate medical management should be instituted.",
    },
    {
      action: "Tell the patient and carers that potassium and phosphate will be checked, and ask them to report muscle pain or weakness",
      why: "This is the counselling the US nirogacestat label asks for. The dinutuximab label asks carers to report seizures, heart palpitations and muscle cramping; the US abiraterone patient information lists dizziness, fast or irregular heartbeats, feeling faint or lightheaded and muscle weakness, among other symptoms; the quizartinib Medication Guide adds diarrhoea or vomiting.",
      source: "label-ogsiveo",
      quote: "Advise patients that they will be monitored for these and to contact their healthcare provider if they experience muscle pain or weakness",
    },
  ],
  bestInClass: {
    statement: "No graded guideline covers low potassium or low phosphate caused by these medicines. The product labels are the source for monitoring and dose holds, and the US and EU texts differ for quizartinib (a contraindication and a hypokalaemia row in the US only), nirogacestat (low phosphate persisting for 3 days or more at Grades 3 or 4 in the US, for 7 days or more at Grade 3 in the EU) and abiraterone (a hold for Grade 3 or higher and a potassium level of 4.0 mM or above to consider, in the EU only). For correcting low potassium, the only graded source read is the 2014 SEOM guideline, which gives all its potassium recommendations level of evidence IV and grade of recommendation D. NHS SPS (2024) is the current national guidance for adults in England and is ungraded. The KDIGO conference report (2020, supported in part by unrestricted educational grants from six companies) says oral supplements are generally preferred in noncritical scenarios, that treatment thresholds have not been defined, and that it did not address emergency management. For low phosphate there is no agreed guidance: the UK Medicines Information answer (2017) and a 2025 umbrella review of 33 publications both say so. The UK answer treats below 0.3 mmol/L and considers treatment at 0.3 to 0.6 mmol/L; a 2021 nephrology review says low phosphate in people with cancer should be corrected when it is first recognised. Both positions are shown.",
    sources: ["label-vanflyta", "smpc-vanflyta", "label-ogsiveo", "smpc-ogsiveo", "label-zytiga", "smpc-zytiga", "seom-2014", "sps-hypokalaemia", "kdigo-potassium-2020", "ukmi-hypophosphataemia-2017", "umbrella-2025", "adhikari-2021"],
  },
  variants: [
    {
      name: "Quizartinib: US label against EU SmPC",
      differs: "The US label contraindicates quizartinib in severe hypokalaemia or severe hypomagnesaemia and has a dose-modification row for Grade 3 or 4 hypokalaemia (below 3 mmol/L) or hypomagnesaemia: interrupt, correct according to institutional guidelines, restart at the previous dose at Grade 2 or less without symptoms. The EU SmPC lists hypersensitivity, congenital long QT syndrome and breast-feeding as contraindications and has no hypokalaemia row; it says electrolytes should be maintained in the normal range and that monitoring and correction of hypokalaemia and hypomagnesaemia should be performed prior to and during treatment.",
      evidence: "Regulatory labels. The US label reports potassium decreased in 59% of people on quizartinib with chemotherapy (Grade 3 or 4 in 22%) and 56% on placebo with chemotherapy (18%). The EU SmPC reports two cardiac arrests with ventricular fibrillation, one fatal, both in the setting of severe hypokalaemia.",
      sources: ["label-vanflyta", "smpc-vanflyta"],
    },
    {
      name: "Nirogacestat: US label against EU SmPC",
      differs: "Low phosphate: the US label withholds for Grades 3 or 4 persisting for 3 days or more despite maximal replacement therapy; the EU SmPC for Grade 3 persisting for 7 days or more. Low potassium: the US label withholds for Grades 3 or 4 despite maximal replacement therapy; the EU SmPC for Grade 3 of any duration despite maximal replacement therapy. Both restart at 100 mg twice daily after recovery to Grade 1 or less or baseline.",
      evidence: "Regulatory labels, both from the DeFi trial. The US label reports decreased phosphate in 65% on nirogacestat and 11% on placebo, phosphate below 2 mg/dL in 20%, decreased potassium in 22% and 4.2%, and Grade 3 decreased potassium in 1.4%. The EU SmPC reports hypophosphataemia in 43% and hypokalaemia in 12%, against 7% and 1% on placebo, and Grade 3 events of hypophosphataemia and hypokalaemia in 3% (printed as one figure for the two).",
      sources: ["label-ogsiveo", "smpc-ogsiveo"],
    },
    {
      name: "Abiraterone: US label against EU SmPC",
      differs: "The US label asks for monitoring at least once a month and for hypokalaemia to be corrected before and during treatment. The EU SmPC asks for monthly monitoring, every 2 weeks for the first three months in people at significant risk of congestive heart failure, says to consider maintaining potassium at 4.0 mM or above in people with pre-existing or new hypokalaemia, and withholds treatment for Grade 3 or higher toxicities including hypokalaemia until they resolve to Grade 1 or baseline.",
      evidence: "Regulatory labels. The US label reports grades 3 to 4 hypokalaemia in 4% on abiraterone and 2% on placebo in four pooled trials using prednisone 5 mg twice daily, and in 10% and 1% in LATITUDE, which used prednisone 5 mg daily. The EU patient leaflet tells patients to stop abiraterone and see a doctor immediately for muscle weakness, muscle twitches or palpitations.",
      sources: ["label-zytiga", "smpc-zytiga"],
    },
    {
      name: "How fast and how concentrated intravenous potassium may be",
      differs: "NHS SPS (England, 2024): the rate should not normally exceed 10 mmol an hour, rates above 20 mmol an hour require cardiac monitoring, and no more than 40 mmol/L through a peripheral line. NHS Grampian (local policy, version 5, 2025): a maximum of 10 mmol an hour for potassium of 2.5 to 3.5 mmol/L and 20 mmol an hour below 2.5 mmol/L, with continuous ECG monitoring mandatory at 20 mmol an hour and at concentrations of 40 mmol in 500 mL or higher. KDIGO conference report (2020): intravenous potassium chloride at a rate up to 20 mmol an hour can be a safe alternative in severe hypokalaemia and when oral intake is not possible. SEOM (Spain, 2014): for severe hypokalaemia the rate should not exceed 20 an hour (printed as \"20 Eq/h\", with 100 to 150 mEq a day in brackets; the unit is as printed and is read here as mEq, which for potassium equals mmol) and the concentration 30 mEq in each 500 cc.",
      evidence: "SEOM grades its potassium recommendations level of evidence IV, grade of recommendation D. SPS, NHS Grampian and the KDIGO report are ungraded. The KDIGO report notes that high concentrations given peripherally can cause pain or sclerosis.",
      sources: ["sps-hypokalaemia", "nhs-grampian-hypokalaemia", "kdigo-potassium-2020", "seom-2014"],
    },
    {
      name: "Oral potassium doses",
      differs: "NHS SPS: 24 mmol up to 2 to 3 times a day for mild hypokalaemia (3.0 to 3.5 mmol/L) and 24 to 36 mmol up to 3 to 4 times a day for moderate (2.5 to 2.9 mmol/L). NHS Grampian: two effervescent tablets three times a day (72 mmol a day) at 3.0 to 3.4 mmol/L, three tablets three times a day (108 mmol a day) at 2.5 to 2.9 mmol/L, and says intravenous supplementation is usually required below 3 mmol/L. SEOM: foods rich in potassium or 40 to 100 mmol a day by mouth for mild hypokalaemia (3 to 3.5 mmol/L) and oral potassium for moderate hypokalaemia, which it prints as 2 to 3 mmol/L although its severe band, treated intravenously, is below 2.5 mmol/L; the two bands overlap and the guideline does not resolve it.",
      evidence: "National guidance (SPS), a local policy (NHS Grampian) and a society guideline (SEOM, level IV, grade D). None is specific to cancer medicines.",
      sources: ["sps-hypokalaemia", "nhs-grampian-hypokalaemia", "seom-2014"],
    },
    {
      name: "When to replace phosphate",
      differs: "UK Medicines Information Q&A (2017, reflecting practice at Leeds Teaching Hospitals): replace below 0.3 mmol/L; at 0.3 to 0.6 mmol/L consider replacement if the person has symptoms or after weighing risks and benefits; oral phosphate 1 to 2 effervescent tablets three times a day; intravenous regimens of 0.2 to 0.5 mmol/kg a day up to a maximum of 50 mmol. Adhikari 2021 (nephrology review): low phosphate in people with cancer should be corrected when it is first recognised, with diet first, then oral phosphate, and parenteral replacement where the gut cannot be used. Umbrella review 2025: no clear consensus on when and how to supplement.",
      evidence: "No graded recommendation. The umbrella review included 33 publications (11 guidelines, 19 reviews, 3 consensus statements), and it found no recommendations on when to test for low phosphate with tyrosine kinase inhibitors.",
      sources: ["ukmi-hypophosphataemia-2017", "adhikari-2021", "umbrella-2025"],
    },
  ],
  grades: [
    { claim: "Quizartinib: monitor and correct hypokalaemia and hypomagnesaemia before and during treatment, more often with diarrhoea or vomiting (US)", grade: "Regulatory label; not graded", source: "label-vanflyta", quote: "Monitor and correct hypokalemia and hypomagnesemia prior to and during treatment with VANFLYTA. Maintain electrolytes in the normal range. Monitor electrolytes and ECGs more frequently in patients who experience diarrhea or vomiting." },
    { claim: "Quizartinib: the same monitoring in the EU SmPC", grade: "Regulatory label; not graded", source: "smpc-vanflyta", quote: "Monitoring and correction of hypokalaemia and hypomagnesaemia should be performed prior to and during treatment with VANFLYTA." },
    { claim: "Quizartinib: cardiac arrests in the setting of severe hypokalaemia (EU SmPC)", grade: "Regulatory label; not graded", source: "smpc-vanflyta", quote: "experienced cardiac arrest with recorded ventricular fibrillation, one with a fatal outcome, both in the setting of severe hypokalaemia" },
    { claim: "Nirogacestat: Grade 3 low phosphate for 7 days or more despite maximal replacement, withhold (EU SmPC)", grade: "Regulatory label; not graded", source: "smpc-ogsiveo", quote: "For Grade 3 hypophosphataemia persisting for ≥ 7 days despite maximal replacement therapy, nirogacestat should be withheld until resolved to Grade ≤ 1 or baseline, then it should be restarted at a dose of 100 mg twice daily" },
    { claim: "Nirogacestat: Grades 3 or 4 low phosphate for 3 days or more despite maximal replacement, withhold (US label)", grade: "Regulatory label; not graded", source: "label-ogsiveo", quote: "Hypophosphatemia persisting for ≥ 3 days despite maximal replacement therapy" },
    { claim: "Nirogacestat: how low phosphate was graded in the US label", grade: "Regulatory label; not graded", source: "label-ogsiveo", quote: "CTCAE Version 5.0 does not include numeric thresholds for grading of hypophosphatemia; all grades represent patients with lab value < Lower Limit of Normal (LLN)." },
    { claim: "Dinutuximab beta: regular electrolyte monitoring (EU SmPC)", grade: "Regulatory label; not graded", source: "smpc-qarziba", quote: "Regular monitoring of liver function and electrolytes is recommended." },
    { claim: "Abiraterone: correct hypokalaemia before and during treatment (US label)", grade: "Regulatory label; not graded", source: "label-zytiga", quote: "Control hypertension and correct hypokalemia before and during treatment with ZYTIGA." },
    { claim: "Abiraterone: potassium level to consider maintaining in people with hypokalaemia (EU SmPC)", grade: "Regulatory label; not graded", source: "smpc-zytiga", quote: "consider maintaining the patient’s potassium level at ≥ 4.0 mM" },
    { claim: "Potassium management in people with cancer: all recommendations", grade: "level of evidence IV and grade of recommendation D", source: "seom-2014", quote: "all the recommendations about potassium disorders have level of evidence IV and grade of recommendation D" },
    { claim: "Severe hypokalaemia (below 2.5 mmol/L): potassium intravenously, with a limit on the rate", grade: "level of evidence IV and grade of recommendation D", source: "seom-2014", quote: "In cases of severe hypokalemia (K+ <2.5 mmol/l), potassium is given intravenously, but the rate of potassium administration should not exceed 20 Eq/h (100–150 mEq/day)." },
    { claim: "Oral potassium preferred outside critical situations", grade: "Conference report; not graded", source: "kdigo-potassium-2020", quote: "Oral supplements are safe and generally preferred to intravenous replacement in noncritical scenarios" },
    { claim: "Intravenous potassium chloride at up to 20 mmol an hour in severe hypokalaemia or when oral intake is not possible", grade: "Conference report; not graded", source: "kdigo-potassium-2020", quote: "Intravenous potassium chloride at a rate up to 20 mmol/h can be a safe alternative in persons with severe hypokalemia and when oral intake is not possible" },
    { claim: "Low magnesium to be addressed when correcting low potassium", grade: "Conference report; not graded", source: "kdigo-potassium-2020", quote: "Concomitant hypomagnesemia is likely underrecognized yet important to address when correcting hypokalemia" },
    { claim: "Rate of intravenous potassium (England)", grade: "National guidance; not graded", source: "sps-hypokalaemia", quote: "The rate of IV potassium should not normally exceed 10mmol/hour. Administration rates above 20mmol/hour require cardiac monitoring due to the risk of arrhythmias." },
    { claim: "No national guideline for acute hypophosphataemia in the UK", grade: "Medicines information Q&A; not graded", source: "ukmi-hypophosphataemia-2017", quote: "There are no national guidelines for the treatment of acute hypophosphataemia and practice varies widely across hospital Trusts." },
    { claim: "Which low phosphate to treat: consensus across reviews and guidelines", grade: "Umbrella review; not graded", source: "umbrella-2025", quote: "the general consensus seems to be to treat severe or moderate symptomatic hypophosphatemia, with differing recommendations for dosing and monitoring" },
    { claim: "Low phosphate in people with cancer: correct when first recognised", grade: "Narrative review; not graded", source: "adhikari-2021", quote: "Hypophosphatemia in cancer patients should be corrected when it is first recognized and can be addressed by any member of the oncology team." },
    { claim: "Low phosphate is not a reason to discontinue cancer therapy unless recurrent and life-threatening", grade: "Narrative review; not graded", source: "adhikari-2021", quote: "hypophosphatemia, unless recurrent and life-threatening, should not be regarded as a reason to discontinue active cancer therapy" },
    { claim: "CTCAE hypokalaemia: Grade 3 is below 3.0 down to 2.5 mmol/L with hospitalisation indicated; Grade 4 is below 2.5 mmol/L with life-threatening consequences (the same in v5.0 and v6.0)", grade: "Severity scale; not a recommendation", source: "ctcae-v6" },
    { claim: "CTCAE hypophosphataemia: Grade 2 is oral replacement therapy indicated; Grade 3 is severe or medically significant but not immediately life-threatening, with hospitalisation or prolongation of hospitalisation indicated; no numeric thresholds (the same in v5.0 and v6.0)", grade: "Severity scale; not a recommendation", source: "ctcae-v6" },
  ],
  sources: [
    {
      key: "label-vanflyta",
      label: "VANFLYTA (quizartinib) tablets: US prescribing information and Medication Guide (DailyMed version of April 2026)",
      publisher: "Daiichi Sankyo (FDA label, DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=29cdbcfe-497d-4e78-bb7b-2d4acafe8e86",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-vanflyta",
      label: "Vanflyta (quizartinib): EU product information (EMA file dated April 2026)",
      publisher: "European Medicines Agency (product information)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/vanflyta-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-ogsiveo",
      label: "OGSIVEO (nirogacestat) tablets: US prescribing information and Patient Information (revised 08/2026)",
      publisher: "SpringWorks Therapeutics (FDA label, DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f172e6ff-3190-41b0-b95a-58a7ef9e9e1e",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-ogsiveo",
      label: "Ogsiveo (nirogacestat): EU product information (EMA file dated August 2026)",
      publisher: "European Medicines Agency (product information; marketing authorisation holder Merck Europe B.V.)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/ogsiveo-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-unituxin",
      label: "UNITUXIN (dinutuximab) injection: US prescribing information (DailyMed version of July 2026)",
      publisher: "United Therapeutics (FDA label, DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d66bdf0d-9d65-45de-ae5b-a58617c27492",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-qarziba",
      label: "Qarziba (dinutuximab beta): EU product information (EMA file dated October 2026)",
      publisher: "European Medicines Agency (product information)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/qarziba-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-lutathera",
      label: "LUTATHERA (lutetium Lu 177 dotatate) injection: US prescribing information (DailyMed version of January 2026)",
      publisher: "Novartis (FDA label, DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=72d1a024-00b7-418a-b36e-b2cb48f2ab55",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-lutathera",
      label: "Lutathera (lutetium (177Lu) oxodotreotide): EU product information (EMA file dated August 2026)",
      publisher: "European Medicines Agency (product information)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/lutathera-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-zytiga",
      label: "ZYTIGA (abiraterone acetate) tablets: US prescribing information and Patient Information (revised 11/2024)",
      publisher: "Janssen (FDA label, DailyMed)",
      year: 2024,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4e338e89-3cf2-48eb-b6e2-a06c608c6513",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-zytiga",
      label: "Zytiga (abiraterone acetate): EU product information and package leaflet (EMA file dated July 2024)",
      publisher: "European Medicines Agency (product information)",
      year: 2024,
      url: "https://www.ema.europa.eu/en/documents/product-information/zytiga-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-lifyorli",
      label: "LIFYORLI (relacorilant): US prescribing information (DailyMed version of March 2026), read to check for a potassium rule; it has none",
      publisher: "Corcept Therapeutics (FDA label, DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6fcebfb5-19d6-4f63-b852-999d68a13729",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "sps-hypokalaemia",
      label: "Treating acute hypokalaemia in adults (published 14 August 2024)",
      publisher: "NHS Specialist Pharmacy Service (England)",
      year: 2024,
      url: "https://www.sps.nhs.uk/articles/hypokalaemia/",
      gradingScheme: "National medicines guidance for the NHS in England; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nhs-grampian-hypokalaemia",
      label: "Guideline for the Management of Acute Hypokalaemia in Adults, version 5 (approved May 2025, review May 2028)",
      publisher: "NHS Grampian (local policy)",
      year: 2025,
      url: "https://nhsgrampian.org/globalassets/services/medicines-management/policies/guid_hypokalaemia.pdf",
      gradingScheme: "Local policy; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "kdigo-potassium-2020",
      label: "Potassium homeostasis and management of dyskalemia in kidney diseases: conclusions from a KDIGO Controversies Conference (conference supported in part by unrestricted educational grants from AstraZeneca, Bayer HealthCare, Boehringer Ingelheim, Fresenius Medical Care, Relypsa and Vifor Fresenius Medical Care Renal Pharma)",
      publisher: "KDIGO (Kidney International; Clase et al.)",
      year: 2020,
      url: "https://kdigo.org/wp-content/uploads/2018/04/KDIGO-Potassium-Management-Final-publication.pdf",
      doi: "10.1016/j.kint.2019.09.018",
      gradingScheme: "Conference report; statements are not graded and are set out as what is known, what the participants think, and future research.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "seom-2014",
      label: "SEOM guidelines on hydroelectrolytic disorders",
      publisher: "Sociedad Española de Oncología Médica (Clinical and Translational Oncology; De las Peñas et al.; two authors declare being scientific advisors of Otsuka, Spain)",
      year: 2014,
      url: "https://doi.org/10.1007/s12094-014-1234-2",
      doi: "10.1007/s12094-014-1234-2",
      gradingScheme: "Level of evidence and grade of recommendation, printed after each recommendation; all potassium recommendations are level of evidence IV (expert committee documents or opinion, clinical experience of authorities), grade of recommendation D.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ukmi-hypophosphataemia-2017",
      label: "Medicines Q&As: How is acute hypophosphataemia treated in adults? (prepared 20 July 2017)",
      publisher: "UK Medicines Information (NHS), copy hosted by Gloucestershire Hospitals NHS Foundation Trust",
      year: 2017,
      url: "https://www.gloshospitals.nhs.uk/documents/15009/Hypophosphataemia.pdf",
      gradingScheme: "Medicines information Q&A reflecting practice at Leeds Teaching Hospitals NHS Trust; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "umbrella-2025",
      label: "Indications for the evaluation and supplementation of hypophosphatemia: an umbrella systematic review of reviews and guidelines",
      publisher: "BMC Medicine (Netzer et al.; funded by the University of Bern and its hospital, with a Swiss National Foundation grant to one author, no competing interests declared)",
      year: 2025,
      url: "https://doi.org/10.1186/s12916-025-04415-1",
      doi: "10.1186/s12916-025-04415-1",
      gradingScheme: "Systematic review; included publications were appraised with AGREE II; it makes no graded recommendations of its own.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "adhikari-2021",
      label: "Hypophosphatemia in cancer patients",
      publisher: "Clinical Kidney Journal (Adhikari et al.; narrative review, no conflict of interest declared)",
      year: 2021,
      url: "https://doi.org/10.1093/ckj/sfab078",
      doi: "10.1093/ckj/sfab078",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "verzicco-2020",
      label: "Electrolyte Disorders Induced by Antineoplastic Drugs",
      publisher: "Frontiers in Oncology (Verzicco et al.; narrative review funded by the University of Parma)",
      year: 2020,
      url: "https://doi.org/10.3389/fonc.2020.00779",
      doi: "10.3389/fonc.2020.00779",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ctcae-v5",
      label: "Common Terminology Criteria for Adverse Events (CTCAE) version 5.0 (27 November 2017), the version the nirogacestat US label cites",
      publisher: "US National Cancer Institute",
      year: 2017,
      url: "https://dctd.cancer.gov/research/ctep-trials/for-sites/adverse-events/ctcae-v5-8x11.pdf",
      gradingScheme: "Severity grades 1 to 5 for adverse events; a reporting scale, not a recommendation.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ctcae-v6",
      label: "Common Terminology Criteria for Adverse Events (CTCAE) version 6.0 (published 22 July 2025)",
      publisher: "US National Cancer Institute",
      year: 2025,
      url: "https://dctd.cancer.gov/research/ctep-trials/for-sites/adverse-events/ctcae-v6.pdf",
      gradingScheme: "Severity grades 1 to 5 for adverse events; a reporting scale, not a recommendation.",
      read: "full-text",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["quizartinib", "nirogacestat", "dinutuximab", "abiraterone"],
  technologies: [],
  terms: ["qt-prolongation", "ctcae-grading"],
  related: ["qt-prolongation-monitoring-on-anticancer-drugs", "hypomagnesaemia-on-egfr-antibodies", "hyperphosphataemia-on-fgfr-inhibitors", "hyponatraemia-siadh", "tumour-lysis-syndrome-prevention-and-treatment", "capillary-leak-syndrome-on-anticancer-drugs", "treatment-induced-diarrhoea-grading-and-management"],
  upgrades: [],
  gaps: [
    "No graded guideline on low potassium or low phosphate caused by cancer medicines was found. The dose holds on this page are label rules; the replacement steps come from sources written for adults in general (NHS SPS, NHS Grampian, the KDIGO conference report, a UK Medicines Information Q&A) or from a 2014 oncology society guideline whose potassium recommendations are all level IV, grade D.",
    "Children: dinutuximab is a paediatric medicine and its US label asks for daily electrolytes, but no source read gives potassium or phosphate replacement doses for children. NHS SPS, NHS Grampian and the UK Q&A are for adults only.",
    "Dinutuximab and dinutuximab beta: neither label gives a threshold, a hold or a dose change for low potassium. The US label stops dinutuximab for good only for Grade 4 low sodium despite appropriate fluid management.",
    "Lutetium-177 dotatate is not covered by this page and is not among its linked medicines. Both labels list low potassium as a side effect (Grade 3 to 4 in 4% in the US label's NETTER-1 data) and neither says how to monitor or correct it. The only potassium rule is in the EU SmPC and concerns a high potassium: serum potassium must be tested before each amino acid infusion, which may raise potassium for a time, and hyperkalaemia must be corrected before the infusion starts. The US label read does not ask for potassium to be tested. No source read says how a low potassium found before treatment should be handled given that the amino acids may raise it.",
    "Relacorilant: OnCo's record listed hypokalaemia among its side effects until 18 November 2026, when the row was removed because the label's side-effect tables do not list it. The US label read (DailyMed version of March 2026) contains no statement on potassium or electrolytes, so it is not covered here. An EU product information file could not be read: the EMA site returned 429 on the first attempt, and on 18 November 2026 a second reader's single request to the same address returned 404, so no EU text was read.",
    "Low phosphate: the UK Q&A dates from 2017, reflects one trust's practice and says there are no national guidelines; no current NHS SPS page on phosphate was found. It excludes chronic hypophosphataemia, renal impairment and refeeding syndrome, and a person on nirogacestat for months may fit none of its categories. Neither nirogacestat label defines maximal replacement therapy.",
    "CTCAE version 5.0 and 6.0 grade low phosphate by the treatment needed, not by a number, so the labels' Grade 3 has no numeric threshold. The US nirogacestat label reports a level (below 2 mg/dL in 20%) but does not use it as a rule.",
    "Quizartinib: the US row gives below 3 mmol/L for Grade 3 or 4 hypokalaemia and leaves correction to institutional guidelines; neither label gives a potassium target beyond the normal range. The 2022 ESC cardio-oncology guideline, which sets a potassium target for people on QT-prolonging medicines, was not re-read for this page and is on the QT protocol.",
    "The SEOM guideline prints its rate limit as \"20 Eq/h\" and gives overlapping bands (oral potassium for moderate hypokalaemia of 2 to 3 mmol/L, intravenous potassium for severe hypokalaemia below 2.5 mmol/L). The page reports both as printed and does not choose between them.",
    "Intravenous potassium rates differ between sources (not normally above 10 mmol an hour in NHS SPS; up to 20 mmol an hour in the KDIGO report and SEOM) and none of them tested the rates in people on these medicines. The KDIGO conference did not address emergency management of hypokalaemia, and the resuscitation guidance on life-threatening hypokalaemia was not read.",
    "The mineralocorticoid antagonist for abiraterone-related low potassium is named in one narrative review only; neither abiraterone label read names a drug or a dose for it.",
    "The Zytiga texts read are the reference product's (US revised 11/2024; EMA file of July 2024). Generic abiraterone labels and the micronised product were not read.",
    "Patient warnings: the US nirogacestat and abiraterone patient information say to tell the healthcare provider about symptoms without a time limit; the EU abiraterone leaflet says to stop the medicine and see a doctor immediately; the quizartinib Medication Guide says right away. No patient-facing text with an urgency was found for low potassium on dinutuximab, dinutuximab beta or lutetium-177 dotatate.",
    "Other cancer medicines whose labels carry low potassium or low phosphate (the review literature names ifosfamide, cisplatin, imatinib, mTOR inhibitors and others) were not read label by label and are not covered.",
  ],
});
