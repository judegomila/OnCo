import { protocol } from "./helpers";

/*
 * Raised liver enzymes and drug-induced liver injury on targeted and other non-immunotherapy anticancer drugs:
 * baseline tests, the monitoring schedule each label sets, what to exclude, and the hold, reduce and stop rules.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - EASL Clinical Practice Guidelines, drug-induced liver injury (J Hepatol 2019): full text. The journal page
 *   returned 403 to a script and Europe PMC holds no full text; the PDF was read from EASL's own site
 *   (easl.eu/wp-content/uploads/2019/04/EASL-CPG-Drug-induced-liver-injury-2019-04.pdf) with pdftotext. The PDF's
 *   multiplication signs and "fi" ligatures do not survive conversion, so no quote here contains either; thresholds
 *   from it are stated in prose.
 * - AASLD practice guidance on drug, herbal and dietary supplement induced liver injury (Hepatology 2023): full text,
 *   Europe PMC full-text XML (PMC9936988).
 * - FDA Guidance for Industry, Drug-Induced Liver Injury: Premarketing Clinical Evaluation (July 2009): full text, the
 *   PDF from fda.gov/media/116737/download with pdftotext. It is written for clinical trials, not for routine care.
 * - ACG Clinical Guideline, idiosyncratic drug-induced liver injury (Am J Gastroenterol 2021): abstract only, from
 *   Europe PMC. journals.lww.com returned 403 to a script and no open full text was found. No step rests on it.
 * - Twelve United States labels, each the current DailyMed SPL XML (services/v2/spls/<setid>.xml) stripped to text:
 *   ribociclib (Kisqali), pazopanib (Votrient), sotorasib (Lumakras), tucatinib (Tukysa), abemaciclib (Verzenio),
 *   vorasidenib (Voranigo), adagrasib (Krazati), trastuzumab emtansine (Kadcyla), lapatinib (Tykerb), ponatinib
 *   (Iclusig), selpercatinib (Retevmo) and trabectedin (Yondelis). For the last six only the liver warning, the
 *   monitoring sentence and the dose-modification rows were read.
 * - Not read: any ESMO guidance on liver injury from targeted drugs (none was found to read), the European SmPCs
 *   (which can set different schedules from the US labels), and the labels of the other products that record raised
 *   liver enzymes.
 *
 * DOIs were resolved through Europe PMC and the titles checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed, and were checked by script.
 *
 * Second accuracy pass, 17 November 2026 (an independent second reader). Re-fetched raw with curl and read as text:
 * the EASL PDF from easl.eu (pdftotext, in layout and in reading order, because recommendations sit in a second
 * column), the FDA guidance PDF and its fda.gov guidance page (still listed as the final guidance of July 2009), the
 * ACG abstract from Europe PMC, and all twelve DailyMed SPL XML files (current versions, dated 16 December 2025 for
 * pazopanib and between January and November 2026 for the rest). The AASLD full-text XML was re-used from a copy a
 * sibling checker saved from Europe PMC in the same pass. The three DOIs were resolved through Crossref; a Europe
 * PMC title search found no newer EASL, AASLD or ACG edition. All 35 quotes were re-checked by script and are
 * verbatim. Corrected: orders softened to the sources' own "consider", "as appropriate" and "may require"; reasons
 * in `why` lines that no source states replaced with what the cited passage says; "the same day" changed to the
 * labels' "right away"; the 30% figure scoped to where AASLD prints it; the trastuzumab emtansine stop rule
 * given its qualifier; "all add as clinically indicated" corrected.
 */
export const raisedLiverEnzymesOnTargetedAnticancerDrugs = protocol({
  id: "raised-liver-enzymes-on-targeted-anticancer-drugs",
  name: "Raised liver enzymes on targeted anticancer drugs: monitoring, hold and stop rules",
  aka: [
    "drug-induced liver injury on cancer drugs",
    "DILI on kinase inhibitors",
    "raised ALT on targeted therapy",
    "raised AST on targeted therapy",
    "transaminitis on TKIs",
    "hepatotoxicity monitoring",
    "liver function tests on CDK4/6 inhibitors",
    "Hy's law",
  ],
  domain: "symptom-management",
  tldr: "Many cancer tablets and some infusions can irritate the liver, sometimes with no symptoms, so liver blood tests are taken before treatment and at set intervals after. A mild rise is watched, a larger one means a pause and often a lower dose, and a rise with jaundice usually means stopping. Yellow skin or eyes, dark urine or itching need a call to your cancer team straight away.",
  simple: "Some cancer medicines can upset the liver. You may feel nothing, so blood tests look for it. If the tests go up, your team may pause the medicine or lower the dose. Ring your cancer helpline straight away if your skin or eyes turn yellow or your urine turns dark. Your own team's plan comes first.",
  summary: "Liver injury from kinase inhibitors, CDK4/6 inhibitors, KRAS and IDH inhibitors and some antibody-drug conjugates can be silent and is then found only on blood tests. Each label sets its own schedule and its own thresholds, and the label of the drug being taken is the rule; the reader's own team's protocol comes first.\n\nMonitoring schedules in the US labels read, after a baseline test: ribociclib every 2 weeks for the first 2 cycles, then at the start of each of the next 4 cycles; abemaciclib every 2 weeks for 2 months, then monthly for 2 months; tucatinib every 2 weeks for 2 months, then every 3 weeks throughout; pazopanib at weeks 3, 5, 7 and 9 and at months 3 and 4; sotorasib every 3 weeks for 3 months, then monthly; adagrasib monthly for 3 months; selpercatinib every 2 weeks for 3 months, then monthly; vorasidenib every 2 weeks for 2 months, then monthly for the first 2 years; ponatinib at least monthly; lapatinib every 4 to 6 weeks; trastuzumab emtansine and trabectedin before each dose. All except the trastuzumab emtansine sentence add 'as clinically indicated'.\n\nWhen ALT or AST is confirmed above 3 times the upper limit of normal (ULN), the FDA guidance (written for trials) advises close observation at once: repeat tests two or three times a week, a history of other medicines, supplements and alcohol, and exclusion of viral hepatitis A to E, autoimmune and alcoholic hepatitis, fatty liver disease, ischaemia and biliary disease. AASLD 2023 recommends viral serology and liver imaging for all suspected cases. In its section on checkpoint inhibitors it adds that recent studies suggest drug injury accounts for only 30% of demonstrable liver injury in advanced cancer, the rest being metastases, sepsis and other causes.\n\nHold thresholds differ by label. Pazopanib continues through an isolated ALT of 3 to 8 times ULN with weekly tests and is withheld above 8 times. Abemaciclib is withheld for persistent or recurrent grade 2 or for grade 3 (more than 5 to 20 times ULN). Ribociclib is interrupted from grade 2 if the baseline was below grade 2. Sotorasib is withheld above 5 times ULN, or above 3 and up to 5 times with symptoms. Vorasidenib is withheld from grade 2. Grade 4 (more than 20 times ULN) ends treatment in the ribociclib, abemaciclib, tucatinib and vorasidenib labels.\n\nALT or AST above 3 times ULN with bilirubin above 2 times ULN and no cholestasis or other cause (a Hy's law case) is the stop signal: the FDA guidance puts the risk of death or transplant at roughly one tenth of such cases. Ribociclib, abemaciclib, tucatinib and pazopanib are stopped permanently; sotorasib and adagrasib are stopped if no other cause is found, and the trastuzumab emtansine dose table says the same (its warning section gives the stop without that condition); the vorasidenib label alone allows a reduced dose after recovery from a first occurrence.\n\nCorticosteroids are not routine: EASL 2019 says routine use 'may not be substantiated' (Grade C) and AASLD 2023 says they may be of benefit in selected patients, including those with severe hypersensitivity features or autoimmune features on biopsy. The sotorasib label is an exception: it says to consider systemic corticosteroids, and records hepatotoxicity in 40% of patients who had immunotherapy in the 3 months before starting against 17% of those never given it. On restarting, EASL considers controlled rechallenge justified in oncology (Grade B; 38% of 103 rechallenged pazopanib patients had a recurrence, none severe), AASLD says rechallenge should generally be avoided unless the benefit is high, and the tucatinib label warns of severe and fatal injury after rechallenge.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "acute-oncology-service", "telephone-triage", "home"],
  },
  population: "Adults taking a targeted or other non-immunotherapy anticancer drug whose label warns of raised liver enzymes or liver injury: the twelve products whose US labels were read (ribociclib, abemaciclib, tucatinib, lapatinib, pazopanib, ponatinib, selpercatinib, sotorasib, adagrasib, vorasidenib, trastuzumab emtansine and trabectedin) and, by the same principles, others. Not covered: hepatitis from checkpoint inhibitors, which is treated with steroids and has its own page; choosing a starting dose when the liver is already impaired; veno-occlusive disease; reactivation of hepatitis B; children.",
  trigger: "Starting one of these drugs (baseline and scheduled tests), a rise in ALT, AST or bilirubin on a scheduled test, or symptoms such as jaundice, dark urine, itching, pain under the right ribs, nausea or unusual tiredness.",
  steps: [
    {
      action: "Take liver blood tests (ALT, AST, alkaline phosphatase and total bilirubin) before the first dose",
      why: "Every label read asks for a test before treatment starts, and some (sotorasib, ribociclib) set their rules against the starting value when it was already raised.",
      source: "label-sotorasib",
      quote: "Monitor liver function tests (ALT, AST, alkaline phosphatase and total bilirubin) prior to the start of LUMAKRAS, every 3 weeks for the first 3 months of treatment, then once a month or as clinically indicated, with more frequent testing in patients who develop transaminase and/or bilirubin elevations.",
    },
    {
      action: "Repeat the tests on the schedule the drug's own label sets, which is most frequent in the first two to three months",
      why: "Each label sets its own timetable. The abemaciclib label gives a median time to a grade 3 or higher ALT rise of 57 to 87 days across four trials.",
      source: "label-abemaciclib",
      quote: "Monitor liver function tests (LFTs) prior to the start of VERZENIO therapy, every 2 weeks for the first 2 months, monthly for the next 2 months, and as clinically indicated.",
    },
    {
      action: "Tell the person which signs of liver trouble to report straight away: yellow skin or eyes, dark urine, pain on the right side of the abdomen, nausea or vomiting, tiredness, loss of appetite or easy bruising",
      why: "These are the signs the pazopanib patient information lists, with the words right away. The tucatinib, lapatinib and trastuzumab emtansine labels also list itching.",
      source: "label-pazopanib",
      quote: "Advise patients to report signs and symptoms of liver dysfunction to their healthcare provider right away",
    },
    {
      action: "When ALT or AST is confirmed above 3 times the upper limit of normal, start close observation at once and do not wait for the next scheduled test",
      why: "The FDA guidance, written for trials, calls this threshold reasonable because smaller rises are common and non-specific. It adds that results can go on worsening for days or weeks after the drug is stopped.",
      source: "fda-dili-2009",
      quote: "It is critical to initiate close observation immediately upon detection and confirmation of early signals of possible DILI, and not to wait until the next scheduled visit or monitoring interval.",
    },
    {
      action: "Repeat the liver tests two or three times a week, easing to weekly or less once they stabilise, and add clotting (INR) and direct bilirubin as appropriate",
      why: "Repeat tests show whether the abnormality is improving or worsening, and the guidance treats a rising bilirubin or INR as a sign of substantial liver injury.",
      source: "fda-dili-2009",
      quote: "Repeating liver enzyme and serum bilirubin tests two or three times weekly.",
    },
    {
      action: "Ask about every other medicine, including those bought without prescription, herbal products and supplements, and about alcohol",
      why: "The history looks for another cause. Some combinations also add risk: the pazopanib label records more ALT rises when simvastatin is taken with it.",
      source: "fda-dili-2009",
      quote: "Obtaining a history of concomitant drug use (including nonprescription medications and herbal and dietary supplement preparations), alcohol use, recreational drug use, and special diets.",
    },
    {
      action: "Test for viral hepatitis",
      why: "AASLD recommends this for everyone with suspected drug injury, so that an acute viral hepatitis is not mistaken for it.",
      source: "aasld-2023",
      quote: "Testing for acute viral hepatitis is recommended for all patients with suspected DILI including hepatitis A IgM, HBsAg, anti–hepatitis B core antibody IgM, and HCV RNA to exclude acute hepatitis C infection",
    },
    {
      action: "Image the liver, typically starting with ultrasound, to look for cirrhosis, a blocked bile duct or other focal changes",
      why: "In its section on checkpoint inhibitors, AASLD says recent studies suggest drug injury explains only 30% of demonstrable liver injury in advanced cancer; metastases, sepsis and other causes explain the rest.",
      source: "aasld-2023",
      quote: "All patients with suspected DILI should undergo some type of liver imaging, typically starting with an abdominal ultrasound to assess for presence of cirrhosis, biliary obstruction, or other focal liver changes.",
    },
    {
      action: "Grade the rise and apply the drug's own label: for a mild, isolated rise several labels allow treatment to continue, pazopanib and vorasidenib with weekly tests",
      why: "The pazopanib label continues treatment through an isolated ALT of 3 to 8 times normal. The FDA guidance says that in most people the liver appears able to adapt to a drug.",
      source: "label-pazopanib",
      quote: "Continue and monitor liver function weekly until ALT returns to Grade 1 or baseline.",
    },
    {
      action: "Withhold the drug for a larger or persistent rise, as the label sets out, and wait for recovery before restarting at a lower dose",
      why: "The abemaciclib label withholds the drug until the rise is back to baseline or grade 1 and then resumes at the next lower dose; other labels set their own points.",
      source: "label-abemaciclib",
      quote: "Dose interruption, dose reduction, dose discontinuation, or delay in starting treatment cycles is recommended for patients who develop persistent or recurrent Grade 2, or any Grade 3 or Grade 4 hepatic transaminase elevation",
    },
    {
      action: "Stop the drug if ALT or AST is above 3 times normal together with bilirubin above 2 times normal and no blockage or other cause explains it (a Hy's law case)",
      why: "Enzymes and bilirubin rising together signal a more serious injury. The FDA guidance cites studies in which about 10% of people with drug injury and jaundice died or needed a liver transplant.",
      source: "label-ribociclib",
      quote: "If patients develop ALT and/or AST > 3 x ULN along with total bilirubin > 2 x ULN irrespective of baseline grade, discontinue KISQALI.",
    },
    {
      action: "On pazopanib, before treating a raised bilirubin as a stop signal, check whether it is the mild indirect kind seen in Gilbert's syndrome",
      why: "Pazopanib blocks the enzyme that clears bilirubin (UGT1A1), so indirect bilirubin can rise in people with Gilbert's syndrome. Its label then applies the rules for an isolated ALT rise.",
      source: "label-pazopanib",
      quote: "Patients with only a mild, indirect (unconjugated) hyperbilirubinemia, known as Gilbert’s syndrome, and ALT elevations > 3 × ULN should be managed per the recommendations outlined for isolated ALT elevations.",
    },
    {
      action: "Do not treat steroids as routine; they can be tried where there are marked allergic features such as rash and fever, or where autoimmune hepatitis is possible",
      why: "EASL finds routine steroid use unsupported (Grade C) and says steroids can be tried with marked hypersensitivity features or possible autoimmune hepatitis. AASLD says they may be of benefit in selected patients.",
      source: "easl-2019",
      quote: "In idiosyncratic DILI, routine use of corticosteroid treatment may not be substantiated.",
      grade: "Grade C",
    },
    {
      action: "On sotorasib, consider systemic steroids for liver injury, as its label says",
      why: "In the label's pooled lung cancer data, 64% of patients whose liver injury needed a dose change were given steroids. Liver injury occurred in 40% of those given immunotherapy in the 3 months before starting and in 17% of those never given it.",
      source: "label-sotorasib",
      quote: "Consider administering systemic corticosteroids for the management of hepatotoxicity.",
    },
    {
      action: "If the drug is restarted after a hold, use the reduced dose its label gives (for pazopanib, no more than 400 mg once daily) and test weekly at first",
      why: "The pazopanib label asks for weekly tests for 8 weeks after a restart and a permanent stop if ALT passes 3 times normal again. The tucatinib label also asks for weekly tests after a restart.",
      source: "label-pazopanib",
      quote: "If the potential benefit for resuming treatment with VOTRIENT is considered to outweigh the risk for hepatotoxicity, then resume at a reduced dose of no more than 400 mg once daily and measure serum liver tests weekly for 8 weeks.",
    },
    {
      action: "Consider admission if clotting is abnormal or there is any confusion, and arrange early transfer to a liver transplant centre if acute liver failure develops",
      why: "AASLD says people with abnormal clotting or mental status changes may require hospitalisation, and puts survival without a transplant in drug-related acute liver failure at only 25%.",
      source: "aasld-2023",
      quote: "Because of the low likelihood of spontaneous survival in idiosyncratic DILI-related ALF of only 25%, early transfer of these individuals to a liver transplant center is recommended.",
    },
  ],
  bestInClass: {
    statement: "A baseline test, then tests on the label's own schedule; from ALT or AST above 3 times ULN, close observation with repeat tests two or three times a week, a medicines, supplement and alcohol history, viral serology and liver imaging (FDA guidance 2009, AASLD 2023, EASL 2019 Grade B for ultrasound in all suspected cases); hold, reduce and stop by the product label; permanent stop for a Hy's law case with no other cause. Where the sources differ they are all shown. Hold thresholds: pazopanib continues to 8 times ULN, ribociclib and vorasidenib are interrupted from grade 2, abemaciclib for persistent or recurrent grade 2 or for grade 3, tucatinib from grade 3, sotorasib above 5 times ULN or above 3 and up to 5 times with symptoms; the FDA trial guidance suggests considering a stop above 8 times ULN, or above 5 times for more than 2 weeks. A Hy's law pattern: permanent stop in most labels, but a reduced dose after a first occurrence in the vorasidenib label. Steroids: not routine (EASL Grade C; AASLD for selected cases; ACG calls their role controversial), but to be considered on sotorasib (label). Rechallenge: justified in oncology under control (EASL Grade B), generally to be avoided unless the benefit is high (AASLD), not above 5 times ULN in trials (FDA), never after severe changes on lapatinib (label).",
    sources: ["easl-2019", "aasld-2023", "fda-dili-2009", "acg-2021", "label-ribociclib", "label-pazopanib", "label-sotorasib", "label-tucatinib", "label-abemaciclib", "label-vorasidenib", "label-lapatinib"],
  },
  variants: [
    {
      name: "Monitoring schedules, label by label",
      differs: "After a baseline test: ribociclib every 2 weeks for the first 2 cycles, then at the start of each of the next 4 cycles. Abemaciclib every 2 weeks for 2 months, then monthly for 2 months. Tucatinib every 2 weeks for 2 months, then every 3 weeks during treatment. Pazopanib at weeks 3, 5, 7 and 9, at month 3 and month 4, then periodically. Sotorasib every 3 weeks for 3 months, then monthly. Adagrasib monthly for 3 months. Selpercatinib every 2 weeks for 3 months, then monthly. Vorasidenib every 2 weeks for 2 months, then monthly for the first 2 years. Ponatinib at least monthly. Lapatinib every 4 to 6 weeks. Trastuzumab emtansine and trabectedin before each dose.",
      evidence: "No label read compares one schedule with another; each records when rises were seen in its own trials. The pazopanib label records that 92% of transaminase rises of any grade came in the first 18 weeks; the ribociclib label gives a median onset of grade 3 or higher rises of 92 days in advanced breast cancer; the vorasidenib label a median first onset of 57 days with a range of 1 to 1049 days.",
      sources: ["label-ribociclib", "label-abemaciclib", "label-tucatinib", "label-pazopanib", "label-sotorasib", "label-adagrasib", "label-selpercatinib", "label-vorasidenib", "label-ponatinib", "label-lapatinib", "label-trastuzumab-emtansine", "label-trabectedin"],
    },
    {
      name: "Where the hold begins",
      differs: "Pazopanib: continue with weekly tests for an isolated ALT between 3 and 8 times ULN; withhold above 8 times. Ribociclib: no change at grade 1; at grade 2 (more than 3 to 5 times ULN) interrupt if the baseline was below grade 2; at grade 3 interrupt and resume one dose level lower, and stop if grade 3 recurs. Abemaciclib: no change at grade 1 or a first grade 2; withhold for persistent or recurrent grade 2 or for grade 3. Tucatinib: hold at grade 3 and repeat tests within 48 to 72 hours, then consider a permanent stop or resume one dose level lower after recovery. Sotorasib: withhold above 5 times ULN, or above 3 and up to 5 times with symptoms, with the thresholds counted from baseline if the baseline was abnormal. Vorasidenib: weekly tests at grade 1; withhold at grade 2, resuming at the same dose if recovery takes 28 days or less.",
      evidence: "Regulatory labels, from each drug's own trials; no trial compares thresholds. The FDA's guidance for trials offers a general guide (consider stopping above 8 times ULN, above 5 times for more than 2 weeks, or above 3 times with symptoms or with bilirubin above 2 times ULN or INR above 1.5) and says it has not been tested prospectively.",
      sources: ["label-pazopanib", "label-ribociclib", "label-abemaciclib", "label-tucatinib", "label-sotorasib", "label-vorasidenib", "fda-dili-2009"],
    },
    {
      name: "A Hy's law pattern that is not a permanent stop",
      differs: "For ALT or AST above 3 to 20 times ULN with total bilirubin above 2 times ULN, the vorasidenib label withholds the drug until recovery and resumes at a reduced dose on a first occurrence, stopping permanently only on recurrence. The sotorasib and adagrasib labels stop permanently only if no alternative cause is found; if another cause is identified, sotorasib is not resumed until the tests are back to baseline. The trastuzumab emtansine dose table stops permanently in the absence of another likely cause, such as liver metastasis or another medicine. Ribociclib, abemaciclib, tucatinib and pazopanib are stopped permanently.",
      evidence: "Regulatory labels. The vorasidenib label reports two patients who met the laboratory criteria for Hy's law, with autoimmune hepatitis and hepatic failure. AASLD's table defines Hy's law with a bilirubin above 2.5 mg/dl rather than 2 times ULN and gives it a positive predictive value of 8% to 20% for transplant or death.",
      sources: ["label-vorasidenib", "label-sotorasib", "label-adagrasib", "label-ribociclib", "label-abemaciclib", "label-tucatinib", "label-pazopanib", "label-trastuzumab-emtansine", "aasld-2023"],
    },
    {
      name: "Steroids for sotorasib liver injury",
      differs: "The sotorasib label says to consider systemic corticosteroids; no other label read does.",
      evidence: "In the label's pooled lung cancer population, 64% of patients whose hepatotoxicity needed a dose change were given corticosteroids, and 94% of events improved or resolved with dose changes, with or without steroids. Hepatotoxicity occurred in 40% of those given immunotherapy within 3 months before starting, 18% of those starting later and 17% of those never given it. The label gives no steroid dose and reports no controlled comparison.",
      sources: ["label-sotorasib"],
    },
    {
      name: "Restarting the same drug (rechallenge)",
      differs: "EASL considers controlled rechallenge justified in oncology; AASLD says it should generally be avoided unless the expected benefit is high for a severe or life-threatening condition; the FDA trial guidance says generally not after rises above 5 times ULN; the lapatinib label says not to restart after severe changes; the tucatinib label carries a warning of severe and fatal hepatotoxicity, particularly after rechallenge.",
      evidence: "EASL cites a pooled analysis of pazopanib trials: of 103 patients rechallenged, 62 (60%) adapted and 39 (38%) had a recurrence, none severe. The tucatinib label reports five confirmed Hy's law cases in HER2CLIMB-05, one fatal, all after rechallenge.",
      sources: ["easl-2019", "aasld-2023", "fda-dili-2009", "label-lapatinib", "label-tucatinib"],
    },
  ],
  grades: [
    { claim: "Routine corticosteroids are not supported in idiosyncratic drug-induced liver injury", grade: "Grade C", source: "easl-2019", quote: "In idiosyncratic DILI, routine use of corticosteroid treatment may not be substantiated." },
    { claim: "Corticosteroids may help selected patients, such as those with severe hypersensitivity or autoimmune features", grade: "Guidance statement (consensus, not graded)", source: "aasld-2023", quote: "Corticosteroids given for 1–3 months may be of benefit in selected patients with idiosyncratic DILI, including those with severe hypersensitivity features, DRESS, and autoimmune features on liver biopsy." },
    { claim: "The role of systemic corticosteroids is controversial", grade: "Not stated in the abstract", source: "acg-2021", quote: "The role of systemic corticosteroids is controversial, but they may be administered when a liver injury event cannot be distinguished between autoimmune hepatitis or DILI or when a DILI event presents with prominent autoimmune hepatitis features." },
    { claim: "Controlled rechallenge is considered justified in oncology", grade: "Grade B", source: "easl-2019", quote: "as they generally do not result in severe recurrence of hepatotoxicity. Grade B." },
    { claim: "Rechallenge should generally be avoided unless the expected benefit is high", grade: "Guidance statement (consensus, not graded)", source: "aasld-2023", quote: "Rechallenge with the suspect drug should generally be avoided unless the anticipated benefit is high for a severe or life-threatening condition." },
    { claim: "Rechallenge after rises above 5 times ULN should generally not be attempted (trials)", grade: "Nonbinding recommendation", source: "fda-dili-2009", quote: "Generally, rechallenge of subjects with significant AT elevations (>5xULN) should not be" },
    { claim: "Abdominal ultrasound in everyone with suspected drug-induced liver injury", grade: "Grade B", source: "easl-2019", quote: "An abdominal ultrasound should be undertaken in all" },
    { claim: "Stopping the suspect drug and supportive care are the mainstay of management", grade: "Guidance statement (consensus, not graded)", source: "aasld-2023", quote: "Discontinuation of the suspect drug along with supportive care of antiemetics, antipruritics, and hydration are the mainstay of idiosyncratic DILI management." },
    { claim: "Other causes, and a blocked bile duct, must be ruled out before a case counts under Hy's law", grade: "Nonbinding recommendation", source: "fda-dili-2009", quote: "It is critical to rule out other causes of injury (e.g., other drugs or viral hepatitis) and to rule out an obstructive basis for the elevated bilirubin, so that alkaline phosphatase (ALP) should not be substantially elevated." },
    { claim: "Stop tucatinib permanently for grade 4 enzymes or bilirubin; hold at grade 3 and retest in 48 to 72 hours", grade: "Regulatory label; not graded", source: "label-tucatinib", quote: "Hold TUKYSA and repeat testing within 48-72 hours to determine if worsening." },
    { claim: "Lapatinib is not restarted after severe liver test changes", grade: "Regulatory label; not graded", source: "label-lapatinib", quote: "If changes in liver function are severe, therapy with TYKERB should be discontinued and patients should not be retreated with TYKERB" },
    { claim: "Trastuzumab emtansine: tests before every dose", grade: "Regulatory label; not graded", source: "label-trastuzumab-emtansine", quote: "Monitor serum transaminases and bilirubin prior to initiation of KADCYLA treatment and prior to each KADCYLA dose." },
    { claim: "Ponatinib: tests at baseline and at least monthly", grade: "Regulatory label; not graded", source: "label-ponatinib", quote: "Monitor liver function tests at baseline, then at least monthly or as clinically indicated." },
    { claim: "Selpercatinib: every 2 weeks for 3 months, then monthly", grade: "Regulatory label; not graded", source: "label-selpercatinib", quote: "Monitor ALT and AST prior to initiating RETEVMO, every 2 weeks during the first 3 months, then monthly thereafter and as clinically indicated." },
    { claim: "Adagrasib: monthly for 3 months", grade: "Regulatory label; not graded", source: "label-adagrasib", quote: "Monitor liver laboratory tests (AST, ALT, alkaline phosphatase and total bilirubin) prior to the start of KRAZATI and monthly for 3 months or as clinically indicated, with more frequent testing in patients who develop transaminase elevations." },
    { claim: "Trabectedin: tests before each administration", grade: "Regulatory label; not graded", source: "label-trabectedin", quote: "Assess LFTs prior to each administration of YONDELIS and as clinically indicated based on underlying severity of pre-existing hepatic impairment." },
    { claim: "Ribociclib: every 2 weeks for the first 2 cycles, then at the start of each of the next 4 cycles", grade: "Regulatory label; not graded", source: "label-ribociclib", quote: "Monitor LFTs every 2 weeks for first 2 cycles, at the beginning of each of the subsequent 4 cycles, and as clinically indicated" },
    { claim: "Vorasidenib: every 2 weeks for 2 months, then monthly for the first 2 years", grade: "Regulatory label; not graded", source: "label-vorasidenib", quote: "Monitor liver laboratory tests (AST, ALT, GGT, total bilirubin and alkaline phosphatase) prior to the start of VORANIGO, every 2 weeks during the first 2 months of treatment, then monthly for the first 2 years of treatment, and as clinically indicated, with more frequent testing in patients who develop transaminase elevations." },
    { claim: "Pazopanib: weeks 3, 5, 7 and 9, months 3 and 4, then periodically", grade: "Regulatory label; not graded", source: "label-pazopanib", quote: "Monitor liver tests at baseline; at Weeks 3, 5, 7, and 9; at Month 3 and Month 4; and then periodically as clinically indicated." },
  ],
  sources: [
    {
      key: "easl-2019",
      label: "EASL Clinical Practice Guidelines: Drug-induced liver injury",
      publisher: "European Association for the Study of the Liver (Journal of Hepatology)",
      year: 2019,
      url: "https://doi.org/10.1016/j.jhep.2019.02.014",
      doi: "10.1016/j.jhep.2019.02.014",
      gradingScheme: "A grade of recommendation with the Oxford Centre for Evidence-based Medicine level of evidence printed beside each statement. Grades B, C and D are the ones printed in the text; the tables defining the scheme are in a supplement that was not read.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aasld-2023",
      label: "AASLD practice guidance on drug, herbal, and dietary supplement-induced liver injury",
      publisher: "American Association for the Study of Liver Diseases (Hepatology)",
      year: 2023,
      url: "https://doi.org/10.1002/hep.32689",
      doi: "10.1002/hep.32689",
      gradingScheme: "A practice guidance, not a guideline: numbered guidance statements agreed by an expert panel, with no grades, because of the lack of randomised trials.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "fda-dili-2009",
      label: "Guidance for Industry. Drug-Induced Liver Injury: Premarketing Clinical Evaluation",
      publisher: "US Food and Drug Administration (CDER, CBER)",
      year: 2009,
      url: "https://www.fda.gov/media/116737/download",
      gradingScheme: "Nonbinding recommendations for clinical trials; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "acg-2021",
      label: "ACG Clinical Guideline: Diagnosis and Management of Idiosyncratic Drug-Induced Liver Injury",
      publisher: "American College of Gastroenterology (American Journal of Gastroenterology)",
      year: 2021,
      url: "https://doi.org/10.14309/ajg.0000000000001259",
      doi: "10.14309/ajg.0000000000001259",
      gradingScheme: "The abstract prints no grades; the full guideline was not read.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    { key: "label-ribociclib", label: "Kisqali (ribociclib) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aaeaef94-f3f5-4367-8ea2-b181d7be2da8", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-pazopanib", label: "Votrient (pazopanib) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eeaaaf38-fb86-4d9f-a19d-0f61daac2fd7", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-sotorasib", label: "Lumakras (sotorasib) tablets: US prescribing information", publisher: "Amgen, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c80a362c-7ac3-4894-a076-0691e68ef8c1", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-tucatinib", label: "Tukysa (tucatinib) tablets: US prescribing information", publisher: "Seagen, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f27eb1b9-b7fc-424e-988f-84dd7bb195a3", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-abemaciclib", label: "Verzenio (abemaciclib) tablets: US prescribing information", publisher: "Eli Lilly, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=be4bc0de-0fdc-4d46-8d25-be43c79e6a06", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-vorasidenib", label: "Voranigo (vorasidenib) tablets: US prescribing information", publisher: "Servier, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=31405fee-55b7-4857-987e-2724ee76be84", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-adagrasib", label: "Krazati (adagrasib) tablets: US prescribing information", publisher: "Mirati Therapeutics, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0b8bf078-34c2-4f45-9012-38a8ac082b01", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-trastuzumab-emtansine", label: "Kadcyla (ado-trastuzumab emtansine) for injection: US prescribing information", publisher: "Genentech, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-lapatinib", label: "Tykerb (lapatinib) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eee37f88-ec6a-4c30-b8aa-e2c71f93088c", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-ponatinib", label: "Iclusig (ponatinib) tablets: US prescribing information", publisher: "Takeda, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=16d804b6-4957-43ee-b18c-3b36ec37c5ac", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-selpercatinib", label: "Retevmo (selpercatinib) capsules and tablets: US prescribing information", publisher: "Eli Lilly, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7fa848ba-a59c-4144-9f52-64d090f4d828", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "label-trabectedin", label: "Yondelis (trabectedin) for injection: US prescribing information", publisher: "Janssen, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=472bd78e-be17-4b9d-90f4-9482c3aec9ff", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  drugs: ["ribociclib", "abemaciclib", "tucatinib", "lapatinib", "pazopanib", "ponatinib", "selpercatinib", "sotorasib", "adagrasib", "vorasidenib", "trastuzumab-emtansine", "trabectedin"],
  terms: ["hepatotoxicity", "ctcae-grading"],
  related: ["irae-hepatitis", "hepatic-dose-adjustment-of-anticancer-drugs", "hepatic-veno-occlusive-disease-after-transplant"],
  upgrades: [],
  gaps: [
    "No guideline read sets a monitoring schedule or hold thresholds for targeted anticancer drugs as a class. EASL 2019 and AASLD 2023 cover drug-induced liver injury in general; the schedules and thresholds here come from each drug's own US label, and no trial compares one schedule with another.",
    "The thresholds for close observation and for stopping come from an FDA guidance written for clinical trials of new drugs, which says they have not been tested prospectively. EASL repeats them and says they may be adapted to the individual balance of risk and benefit.",
    "Steroids for sotorasib liver injury rest on the label's instruction to consider them and on uncontrolled trial experience; the label gives no dose and no duration. No source read says whether steroids help liver injury on adagrasib or other drugs started soon after a checkpoint inhibitor.",
    "People with liver metastases or raised enzymes at the start: only some labels set thresholds against an abnormal baseline (sotorasib does; ribociclib grades from baseline). EASL suggests a doubling of the baseline value as a threshold for close observation; no source read gives a tested rule.",
    "The ACG 2021 guideline was read as an abstract only: the journal site returned 403 to a script and no open full text was found. No step rests on it.",
    "No ESMO guidance on liver injury from targeted drugs was found to read. European product information was not read and may set different schedules from the US labels.",
    "Twelve labels were read out of the larger set of products that record raised liver enzymes; for six of them (adagrasib, trastuzumab emtansine, lapatinib, ponatinib, selpercatinib, trabectedin) only the liver warning, the monitoring sentence and the dose-modification rows were read. Gilteritinib, olutasidenib, lurbinectedin, mirvetuximab soravtansine, enasidenib and others are not covered product by product.",
    "Veno-occlusive disease on inotuzumab ozogamicin and gemtuzumab ozogamicin, and nodular regenerative hyperplasia on trastuzumab emtansine, are different injuries and are not covered here.",
    "The EASL guideline dates from 2019 and predates most of these drugs; what it says on cancer drugs concerns checkpoint inhibitors and the pazopanib rechallenge analysis.",
    "On 17 November 2026 every source was fetched again and re-read. No newer edition of the EASL, AASLD or ACG documents was found in Crossref or Europe PMC, and the FDA still lists its July 2009 guidance as final. The ACG full text still could not be read.",
    "No source read sets a time limit such as 'the same day' for reporting symptoms. The labels' patient sections say 'right away' or 'immediately', and their symptom lists differ: itching is in the tucatinib, lapatinib and trastuzumab emtansine labels and not in the pazopanib list.",
    "The 30% figure for drug injury among causes of liver injury in advanced cancer comes from a sentence in AASLD's section on checkpoint inhibitors. No source read gives the share for people on targeted drugs.",
  ],
});
