import { protocol } from "./helpers";

/*
 * Headache as a side effect of anticancer drug treatment in adults: acalabrutinib, blinatumomab, trastuzumab
 * emtansine and talazoparib, with the general assessment of a new headache that NICE states.
 *
 * Written 18 November 2026. The evidence is thin and the record says so: no oncology society guideline on
 * drug-related headache was found. What exists is a general headache guideline (NICE CG150), one line in the UK
 * triage toolkit, three narrative papers on BTK inhibitors (one written with manufacturer-funded support) and the
 * drugs' own labels. Label wording is given as label wording, not as a guideline.
 *
 * What was read on 18 November 2026, and how (raw text, saved under /tmp/se-protocols-2/headache/text):
 * - NICE CG150, Headaches in over 12s (published 19 September 2012, last updated 3 June 2025; a minor change, links
 *   to technology appraisals, is dated September 2026): the recommendations page and the update information page,
 *   curl then tags stripped. The update page was read to check the edition.
 * - UKONS 24-Hour Triage Toolkit, 3rd edition (December 2024): full text, re-used from the copy a checker of
 *   `acute-oncology-telephone-triage` fetched from ukons.org on 16 November 2026 (pdftotext). Headache appears once,
 *   in the pain row.
 * - Calquence (acalabrutinib) tablets, US prescribing information and patient information: DailyMed SPL XML, set id
 *   b1409184-3267-4d8c-8f17-4e01f69828b1, version 9, effective 19 February 2026 (patient information revised 2/2026).
 * - Calquence EU product information (SmPC and package leaflet): the EMA PDF through pdftotext -layout. The PDF
 *   prints no revision date; its file date is 20 July 2026.
 * - Blincyto (blinatumomab) US prescribing information and Medication Guide: DailyMed SPL XML, set id
 *   38b482a8-960b-4591-9857-5031ecb830aa, version 42, effective 14 April 2026.
 * - Blincyto EU product information: EMA PDF, pdftotext -layout, file date 15 August 2026.
 * - Kadcyla (ado-trastuzumab emtansine) US prescribing information: DailyMed SPL XML, set id
 *   23f3c1f4-0fc8-4804-a9e3-04cf25dd302e, version 35, effective 1 April 2026. Kadcyla EU product information: EMA
 *   PDF, file date 11 May 2026.
 * - Talzenna (talazoparib) US prescribing information: DailyMed SPL XML, set id f2423edd-6d24-495c-aec1-c2f457f08d9a,
 *   version 20, effective 28 October 2026. Talzenna EU product information: EMA PDF, file date 11 July 2025.
 * - Voranigo (vorasidenib) US prescribing information (DailyMed, set id 31405fee-55b7-4857-987e-2724ee76be84, version
 *   9, effective 20 June 2026) and EU product information (EMA PDF, file date 7 July 2026): read to decide scope. The
 *   US label names headache among the most common adverse reactions in its highlights and patient information, but
 *   its adverse reaction table has no headache row, and the EU SmPC does not list headache. Vorasidenib is left out
 *   of `drugs` and named in `gaps`.
 * - O'Brien et al., Front Oncol 2021 (DOI 10.3389/fonc.2021.720704, PMC8630614): full text, Europe PMC XML. A
 *   narrative review; its acknowledgements say medical writing support was funded by AstraZeneca, the maker of
 *   acalabrutinib. Labelled as such wherever the page leans on it.
 * - Lipsky and Lamanna, Hematology (ASH Education Program) 2020 (DOI 10.1182/hematology.2020000118, PMC7727553):
 *   full text from pmc.ncbi.nlm.nih.gov with plain curl (the Europe PMC full-text endpoint returned 500). No funding
 *   statement; one author declares advisory roles and research support from several manufacturers including
 *   AstraZeneca.
 * - Song et al., Chinese expert consensus on BTK inhibitors, Exp Hematol Oncol 2023 (DOI 10.1186/s40164-023-00448-5,
 *   PMC10578030): full text, Europe PMC XML. States no funding and no competing interests. Its headache paragraph is
 *   in the narrative adverse event section, carries no recommendation category, and follows O'Brien 2021 closely.
 * - Macmillan Cancer Support, Acalabrutinib (reviewed 1 June 2025), Cancer Research UK, Acalabrutinib (last reviewed
 *   5 June 2024) and Blinatumomab (last reviewed 3 November 2026), NHS, Headaches (page last reviewed 17 April 2024):
 *   the public pages, curl then tags stripped.
 *
 * Checked and not used: the ANZ 2025 and Awan 2022 BTK inhibitor consensus statements (cardiovascular; neither
 * mentions headache). NICE NG12 and NG99 were read for a headache rule in people with cancer; NG12 has none for
 * adults beyond its brain MRI recommendation for progressive loss of central neurological function, so CG150, which
 * points to NG12, is the source used.
 *
 * Not read: the ESMO 2024 CLL guideline (the publisher refuses a script, as recorded in
 * `atrial-fibrillation-and-bleeding-on-btk-inhibitors`), the NCCN CLL guideline (login), and any label for
 * intismeran autogene (investigational, none exists), ivermectin as an anticancer add-on (not licensed for it) or
 * Optune (a device; its instructions for use were not sought). Pylarify, an imaging agent given once, was read
 * (DailyMed) and is outside a protocol about drug treatment.
 *
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 *
 * Second reader, 18 November 2026. An independent reader re-fetched eleven sources as raw text (the four DailyMed SPL
 * XML files for Calquence, Blincyto, Kadcyla and Talzenna, the four EMA product information PDFs for the same
 * medicines through pdftotext -layout, the NICE CG150 recommendations and update pages, and the Macmillan
 * acalabrutinib page); each converted file was byte-identical to the writer's saved text, and each SPL is still the
 * version named above. The other sources were read from the writer's texts saved the same day. The three DOIs were
 * resolved again through Crossref. The UKONS resources page was fetched and still lists version 3 of the toolkit; the
 * PDF itself was not fetched again. The acalabrutinib headache percentages were re-read from the SPL XML tables with
 * their column headers and are right (ASCEND 22/0.6, ELEVATE-TN 40/1.1 and 39/1.1, ECHO 31/1.7, LY-004 39/1.6,
 * AMPLIFY 35/1.4); the ECHO and AMPLIFY columns are headed grade 3 or 4, not grade 3 or higher, and the page now says
 * so. 118 claims checked: 1 wrong, 7 unsupported, 1 not readable (the ESMO CLL interim update, tried once more).
 * Changed: the trastuzumab emtansine step rested on the labels' caution about anticoagulants, which neither label
 * connects to headache, and is replaced by the one sentence that does name headache (the EU package leaflet on
 * driving); the claim that three papers advise avoiding NSAIDs is now two, since Lipsky and Lamanna do not mention
 * NSAIDs; the US acalabrutinib label is no longer said to report fatal central nervous system bleeding as such; the
 * two dose steps now say in the action itself that they apply the labels' general rule; the medication overuse step no
 * longer gives a reason of the writer's own; "early sign" on blinatumomab is now "sign"; vorasidenib's 28% is given.
 * All 23 quotes verified by script against the saved texts.
 */
export const headacheOnAnticancerDrugs = protocol({
  id: "headache-on-anticancer-drugs",
  name: "Headache on anticancer drugs: assessment, acalabrutinib headache and when it signals something else",
  aka: ["acalabrutinib headache", "Calquence headache", "BTK inhibitor headache", "headache during cancer treatment", "headache on blinatumomab", "headache on Kadcyla", "headache on talazoparib", "drug-related headache in cancer"],
  domain: "symptom-management",
  tldr: "Headache is a common side effect of some cancer medicines. On acalabrutinib it mostly comes in the first weeks, is mild and eases. On blinatumomab it can be a sign of a reaction that your team needs to know about. A sudden severe headache, or one with weakness, confusion, a fit or trouble speaking, is an emergency. Your own team's advice comes first.",
  simple: "Some cancer medicines cause headaches. Often they are mild and pass. Tell your team about any new headache, and ask which painkiller is safe for you. Get help straight away for a sudden, very bad headache, or a headache with weakness, confusion, a fit or trouble speaking.",
  summary: "No oncology guideline on drug-related headache was found; this page joins a general headache guideline to what the labels and three narrative papers say, and the local protocol comes first. Assessment: NICE CG150 (England, over 12s) lists the features that call for evaluation and consideration of investigation or referral (1.1.1 [2012]), and separately a new-onset headache with compromised immunity, a history of malignancy known to metastasise to the brain, or vomiting without other obvious cause (1.1.2 [2012]). The UKONS triage tool (v3) asks about headache in its pain row and says to consider ICANS or CRS.\n\nAcalabrutinib: headache is in 22% to 40% of patients across the trials in the US label (0.6% to 1.7% at grade 3 or above; two of the five tables print grade 3 or 4) and 36.5% on monotherapy in the EU SmPC (grade 3 or higher 1.2%). Three narrative papers, none graded, describe it as early and mild or grade 1 or 2. Two suggest paracetamol or caffeine, avoiding NSAIDs if possible (O'Brien 2021, written with AstraZeneca-funded support, and the Chinese consensus 2023, which follows it); Lipsky and Lamanna 2020 say paracetamol with or without caffeine is often effective and do not mention NSAIDs. Grade 3 or greater non-haematological toxicity is an interruption in both labels (monotherapy or with obinutuzumab): resume at the same dose the first and second time, 100 mg once daily the third, discontinue at the fourth. Both labels warn of serious and fatal bleeding (the EU SmPC names central nervous system haemorrhage; the US label counts any central nervous system bleeding as major haemorrhage); the US patient information lists a headache that lasts a long time among the signs of bleeding to report right away, and the EU leaflet's list does not name headache.\n\nBlinatumomab: the US label gives headache and tremor as the most common manifestations of neurological toxicity, marks headache in its tables as possibly representing ICANS, and lists it among the manifestations of CRS; the EU SmPC recommends a neurological examination before starting. Grading and treatment of ICANS and CRS are in their own protocols. Trastuzumab emtansine (headache 28% in both US label trials) and talazoparib (33% in EMBRACA in the US label, 19.0% in the EU pooled data) list headache with no rule for managing it; talazoparib's labels withhold for grade 3 or 4 non-haematological reactions. For trastuzumab emtansine the only wording that names headache is in the EU texts: the package leaflet says not to drive, cycle or use tools or machines until a headache stops. Both trastuzumab emtansine labels warn of central nervous system haemorrhage and do not connect it to headache.",
  asOf: "2026-11-18",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["telephone-triage", "outpatient-clinic", "home", "acute-oncology-service", "ward"],
  },
  population: "Adults taking acalabrutinib, blinatumomab, trastuzumab emtansine or talazoparib who develop a headache, and the general assessment of a new headache in an adult with cancer as NICE CG150 states it (CG150 is written for people over 12 with headache in general, in England, not for people with cancer in particular). The three papers on acalabrutinib headache were written for chronic lymphocytic leukaemia and other B-cell cancers. Not covered: the grading and treatment of ICANS and cytokine release syndrome, raised pressure in the head from a tumour, bleeding or metastases, headache after a lumbar puncture or intrathecal chemotherapy, immune-related inflammation of the pituitary or brain on checkpoint inhibitors, and children. Each has its own protocol where one exists.",
  trigger: "A person on one of these medicines reports a new or changed headache, or is about to start acalabrutinib or blinatumomab.",
  steps: [
    {
      action: "At triage, ask whether the pain is a headache, and consider ICANS or cytokine release syndrome",
      why: "The UKONS triage tool puts this question in its pain row, beside asking whether the pain is new, how long it has lasted and whether painkillers have been taken. It gives no reason and does not say for which treatments. The blinatumomab label reports both ICANS and cytokine release syndrome with that medicine.",
      source: "ukons-toolkit-v3",
      quote: "Do you have a headache? consider ICANS/CRS",
    },
    {
      action: "Evaluate a headache that comes with any of NICE's listed features, and consider the need for further investigations or referral: worsening headache with fever, sudden onset reaching its worst within 5 minutes, a new neurological deficit, new cognitive dysfunction, a change in personality, impaired consciousness, recent head trauma, a headache triggered by cough, Valsalva (trying to breathe out with nose and mouth blocked), sneeze or exercise, or one that changes with posture",
      why: "This is NICE's list for anyone over 12 presenting with headache; the list also includes symptoms of giant cell arteritis, signs of acute narrow angle glaucoma and a substantial change in the character of the headache. NICE points to its suspected cancer guideline for suspected brain tumours. For people on acalabrutinib, the EU SmPC separately asks doctors to consider PML, a brain infection, when there are new or worsening neurological, cognitive or behavioural signs.",
      source: "nice-cg150",
      quote: "Evaluate people who present with headache and any of the following features, and consider the need for further investigations and/or referral:",
      grade: "[2012]",
    },
    {
      action: "Consider further investigations or referral for a new-onset headache in a person with compromised immunity, a history of a cancer known to spread to the brain, or vomiting without another obvious cause",
      why: "NICE lists these three, with age under 20 and a history of malignancy as a fourth, and gives immunosuppressive drugs as an example of a cause of compromised immunity. It states no reason in the recommendation. Headache from raised pressure in the head has its own protocol on this site.",
      source: "nice-cg150",
      quote: "a history of malignancy known to metastasise to the brain",
      grade: "[2012]",
    },
    {
      action: "Before blinatumomab is started, carry out a neurological examination, and monitor clinically for signs and symptoms of neurological events during treatment (the EU SmPC's recommendation)",
      why: "The EU SmPC recommends both and gives a writing test as an example of monitoring. It says that among patients who had a neurological event the median time to the first was within the first 2 weeks of treatment.",
      source: "smpc-blincyto",
      quote: "It is recommended that a neurological examination be performed in patients prior to starting BLINCYTO therapy and that patients be clinically monitored for signs and symptoms of neurologic events including ICANS",
    },
    {
      action: "On blinatumomab, monitor for signs and symptoms of neurological toxicities, including ICANS, and advise outpatients to contact their healthcare professional if they develop any; a headache counts as one",
      why: "The US label says the most common manifestations of neurological toxicity were headache and tremor, marks headache in its side-effect tables with the note that it may represent ICANS, and lists headache among the manifestations of cytokine release syndrome. It says management may require interrupting or discontinuing blinatumomab or corticosteroids, as set out in the ICANS and cytokine release protocols.",
      source: "label-blincyto",
      quote: "Monitor patients receiving BLINCYTO for signs and symptoms of neurological toxicities, including ICANS.",
    },
    {
      action: "On acalabrutinib, monitor for signs of bleeding, and ask the person to report a headache that lasts a long time right away",
      why: "Both labels report serious and fatal bleeding on acalabrutinib. The EU SmPC names central nervous system haemorrhage among the major events, and the US label counts any central nervous system bleeding as major haemorrhage. The US patient information lists a headache that lasts a long time, with dizziness, weakness, confusion and changes in speech, among the signs of bleeding to tell the healthcare provider about right away. The EU leaflet's list of bleeding symptoms does not name headache. The US label says antithrombotic medicines may further increase the risk.",
      source: "label-calquence",
      quote: "Monitor patients for signs of bleeding.",
    },
    {
      action: "On trastuzumab emtansine, advise a person who gets a headache not to drive, cycle or use tools or machines until it stops (the EU package leaflet's wording)",
      why: "This is the only instruction about headache in the trastuzumab emtansine texts read, and it is in the EU package leaflet, which lists headache beside blurred vision, tiredness and dizziness. The EU SmPC says the significance of headache for driving is unknown. The US label reports headache in 28% of patients in each of its two trials and gives no instruction about it. Both labels warn of bleeding, including in the central nervous system, and neither connects that warning to headache.",
      source: "smpc-kadcyla",
      quote: "If you experience flushing, shivering fits, fever, trouble breathing, low blood pressure or a rapid heartbeat (infusion-related reaction), blurred vision, tiredness, headache, or dizziness, do not drive, cycle, use tools or machines until these reactions stop.",
    },
    {
      action: "Before acalabrutinib is started, advise the person that headaches should abate quickly, are easily managed and are not a long-term consequence of treatment",
      why: "A review written with manufacturer-funded support says that telling people beforehand reassures them, that these headaches usually come early in treatment, are mild and of limited duration, and should abate over a period of up to 4 weeks. It is a narrative review, not a graded guideline.",
      source: "obrien-2021",
      quote: "Prior to treatment initiation: advise patients that headaches should abate quickly, are easily managed, and are not a long-term consequence of treatment",
    },
    {
      action: "For a headache on acalabrutinib with none of the features above, paracetamol or caffeine can be used, avoiding NSAIDs such as ibuprofen if possible",
      why: "Two narrative papers say this in nearly the same words (O'Brien 2021, written with manufacturer-funded support, and the Chinese consensus 2023), and say that many of these headaches need no medical intervention. A third, Lipsky and Lamanna 2020, says paracetamol with or without caffeine is often effective and does not mention NSAIDs. Neither of the two gives a reason for avoiding NSAIDs in this passage, none of the three is graded, and no trial of any treatment for this headache was found.",
      source: "chinese-btk-consensus-2023",
      quote: "These headaches can be managed mostly without any medical interventions, or can be effectively treated using acetaminophen or caffeine, while avoiding the use of nonsteroidal anti-inflammatory drugs, if possible.",
    },
    {
      action: "Ask the person to tell the team if the headache does not get better, or gets worse",
      why: "This is what Macmillan tells people taking acalabrutinib, adding that the doctor, nurse or pharmacist can advise on painkillers that may help. Cancer Research UK asks people to let their doctor or nurse know about headaches and names paracetamol.",
      source: "macmillan-acalabrutinib",
      quote: "Tell them if the headache does not get better, or gets worse.",
    },
    {
      action: "Be alert to medication overuse headache where the headache developed or worsened while painkillers were being taken for 3 months or more: paracetamol, aspirin or an NSAID on 15 days a month or more, or triptans, opioids, ergots or combination painkillers on 10 days a month or more",
      why: "NICE's recommendation, for anyone over 12 with headache in England; NICE gives no reason in the recommendation. It was not written for people on anticancer medicines, and no source read applies it to a headache caused by one. It is here only because the painkillers the other steps name are on NICE's list.",
      source: "nice-cg150",
      quote: "Be alert to the possibility of medication overuse headache in people whose headache developed or worsened while they were taking the following drugs for 3 months or more:",
      grade: "[2012]",
    },
    {
      action: "Treat a grade 3 or greater headache on acalabrutinib (alone or with obinutuzumab) under the labels' general rule for non-haematological toxicity: interrupt acalabrutinib; once the headache is back to grade 1 or baseline it may be resumed at the same dose the first and second time, at 100 mg once daily the third time, and it is discontinued at the fourth",
      why: "This is the labels' rule for any grade 3 or greater non-haematological toxicity, not a rule written for headache; neither label says how to manage a headache. The US label and the EU SmPC give the same steps; the SmPC names CTCAE version 5.0 for the grading. The US label has separate tables for acalabrutinib with bendamustine and rituximab and with venetoclax; the EU SmPC applies this table to the venetoclax combination as well and has a separate one for bendamustine and rituximab.",
      source: "label-calquence",
      quote: "Once toxicity has resolved to Grade 1 or baseline level, CALQUENCE may be resumed at 100 mg approximately every 12 hours.",
    },
    {
      action: "Treat a grade 3 or 4 headache on talazoparib under the labels' general rule for non-haematological adverse reactions: withhold talazoparib until the headache is grade 1 or less, then consider resuming at a reduced dose or discontinuing",
      why: "This is the labels' rule for any grade 3 or 4 non-haematological adverse reaction, not one written for headache; neither label says how to manage a headache. The US label says a reduced dose and the EU SmPC the next lower dose. The US label reports headache in 33% of patients in the EMBRACA trial, 2% at grade 3, and the EU SmPC in 19.0% of 1 088 patients across 8 studies.",
      source: "label-talzenna",
      quote: "Consider resuming TALZENNA at a reduced dose or discontinue",
    },
    {
      action: "Tell the person on acalabrutinib that a severe headache, weakness or numbness down one side, difficulty speaking, confusion, blurred vision or unsteadiness means contacting the hospital straight away on the 24-hour number, or going to hospital straight away or calling 999",
      why: "Macmillan lists these as the sudden symptoms of a stroke from bleeding on the brain, which it says this treatment can make more likely, and tells people not to drive themselves to hospital. The NHS page for the general public says to call 999 or go to A&E for a headache that started suddenly and is extremely painful, or one with a fit, numbness or weakness, drowsiness or confusion, or loss of vision.",
      source: "macmillan-acalabrutinib",
      quote: "contact the hospital straight away on the 24-hour number",
    },
  ],
  bestInClass: {
    statement: "There is no graded oncology guideline for headache caused by an anticancer medicine, so no version can be called best supported. The strongest material read is general: NICE CG150's two lists of features that call for evaluation and for considering investigation or referral ([2012], ungraded, England), which include compromised immunity and a history of a cancer known to spread to the brain. For acalabrutinib, three narrative papers agree that the headache comes early and is mild or grade 1 or 2, and that paracetamol, with or without caffeine, helps. Two of them add avoiding NSAIDs if possible: one was written with AstraZeneca-funded medical writing support, and the Chinese consensus repeats it in a section that carries no recommendation category. No trial of any treatment for this headache was found. For blinatumomab, the US label and the UKONS triage tool both treat headache as a possible sign of ICANS or cytokine release syndrome. Dose rules are the labels' general rules for grade 3 or worse non-haematological toxicity, the same in the US and EU for acalabrutinib and for talazoparib.",
    sources: ["nice-cg150", "ukons-toolkit-v3", "obrien-2021", "chinese-btk-consensus-2023", "lipsky-lamanna-2020", "label-blincyto", "label-calquence", "smpc-calquence", "label-talzenna", "smpc-talzenna"],
  },
  variants: [
    {
      name: "Which painkiller for acalabrutinib headache",
      differs: "O'Brien 2021 and the Chinese consensus 2023 say paracetamol or caffeine, avoiding NSAIDs if possible. Lipsky and Lamanna 2020 say paracetamol with or without caffeine is often effective, and that the headache is often responsive to caffeine. Macmillan says the team can advise on painkillers and Cancer Research UK names paracetamol; neither mentions caffeine or NSAIDs. The NHS page for the general public suggests paracetamol or ibuprofen for an ordinary headache; it was not written for people on a medicine that raises the risk of bleeding.",
      evidence: "Narrative statements only. None of the three papers reports a trial or a dose of caffeine. The two that say to avoid NSAIDs give no reason in their headache passages, and Lipsky and Lamanna do not mention NSAIDs. O'Brien 2021 was written with medical writing support funded by AstraZeneca.",
      sources: ["obrien-2021", "chinese-btk-consensus-2023", "lipsky-lamanna-2020", "macmillan-acalabrutinib", "cruk-acalabrutinib", "nhs-headaches"],
    },
    {
      name: "How often acalabrutinib causes headache, by source",
      differs: "The US label gives 22% (ASCEND) to 40% (ELEVATE-TN) across its trial tables, with 0.6% to 1.7% at grade 3 or above (the ECHO and AMPLIFY tables print grade 3 or 4). The EU SmPC gives 36.5% of 1 478 patients on monotherapy, 1.2% at grade 3 or higher. O'Brien 2021 gives 22% to 51%, says these headaches typically occur within 30 minutes of dosing, and that only 1% lead to treatment discontinuation. Lipsky and Lamanna 2020 say nearly 70% of patients in pivotal studies had grade 1 or 2 headaches, most often in weeks 1 to 3.",
      evidence: "The label figures are from registration trials with different populations and follow-up; the review figures are the authors' summaries of trials and were not checked against the trial reports here.",
      sources: ["label-calquence", "smpc-calquence", "obrien-2021", "lipsky-lamanna-2020"],
    },
    {
      name: "Headache as a warning sign of bleeding on acalabrutinib: US and EU patient wording",
      differs: "The US patient information lists \"headache that lasts a long time\" among the signs of bleeding to tell the healthcare provider about right away. The EU package leaflet tells people to stop taking Calquence and contact a doctor or go to the nearest emergency department immediately for bleeding symptoms, and its list (black or bloody stools, pink or brown urine, nosebleeds, bruising, unexpected bleeding, vomiting or coughing up blood, dizziness, weakness, confusion) does not name headache; it lists headache as a very common other side effect. Macmillan names a severe headache as a stroke symptom (hospital straight away or 999); Cancer Research UK lists headache among the symptoms of bleeding in the brain.",
      evidence: "Regulatory patient texts and charity pages; none gives a figure for how often a headache on acalabrutinib is a bleed. The EU SmPC reports intracranial haemorrhage in 0.1% on monotherapy; the US label reports major haemorrhage, which counts any central nervous system bleeding, in 4.7% of 2,055 patients.",
      sources: ["label-calquence", "smpc-calquence", "macmillan-acalabrutinib", "cruk-acalabrutinib"],
    },
    {
      name: "Headache on blinatumomab: US and EU wording",
      differs: "The US Medication Guide lists headache among the symptoms of both cytokine release syndrome and neurologic problems, under an instruction to call the healthcare provider or get emergency medical help right away. The EU leaflet lists headache, with sleeplessness and shaking, as a very common side effect that may be a symptom of ICANS; its list of things to tell the doctor about immediately names shaking, confusion, encephalopathy, difficulty communicating and seizure, and not headache. The EU SmPC recommends a neurological examination before treatment; the US label asks for monitoring and for outpatients to be advised to make contact. Cancer Research UK lists headaches among the symptoms of ICANS, under the words to tell the doctor or call 999 straight away.",
      evidence: "Regulatory labels. The US label reports neurological toxicities in approximately 65% of patients in trials and signs and symptoms consistent with ICANS in 7.5%; the EU SmPC reports headache in 32.7%.",
      sources: ["label-blincyto", "smpc-blincyto", "cruk-blinatumomab"],
    },
  ],
  grades: [
    { claim: "Evaluate, and consider investigation or referral for, headache with any of the listed features (NICE 1.1.1)", grade: "[2012]", source: "nice-cg150", quote: "Evaluate people who present with headache and any of the following features, and consider the need for further investigations and/or referral:" },
    { claim: "Consider investigation or referral for new-onset headache with compromised immunity, caused for example by immunosuppressive drugs (NICE 1.1.2)", grade: "[2012]", source: "nice-cg150", quote: "compromised immunity, caused, for example, by HIV or immunosuppressive drugs" },
    { claim: "Consider investigation or referral for new-onset headache with a history of malignancy known to metastasise to the brain (NICE 1.1.2)", grade: "[2012]", source: "nice-cg150", quote: "a history of malignancy known to metastasise to the brain" },
    { claim: "Be alert to medication overuse headache (NICE)", grade: "[2012]", source: "nice-cg150", quote: "paracetamol, aspirin or an NSAID, either alone or in any combination, on 15 days per month or more. [2012]" },
    { claim: "Ask about headache at telephone triage and consider ICANS or CRS", grade: "not graded (toolkit guidance)", source: "ukons-toolkit-v3", quote: "Do you have a headache? consider ICANS/CRS" },
    { claim: "After acalabrutinib is started, recommend paracetamol or caffeine and avoid NSAIDs if possible", grade: "not graded (narrative review, written with AstraZeneca-funded support)", source: "obrien-2021", quote: "After treatment initiation: recommend the use of acetaminophen or caffeine and avoid NSAIDs if possible" },
    { claim: "Acalabrutinib headache resolves with extended treatment; paracetamol with or without caffeine is often effective", grade: "not graded (narrative review)", source: "lipsky-lamanna-2020", quote: "Headache has been reported to resolve with extended treatment, and the administration of acetaminophen with or without caffeine is often effective for symptomatic relief." },
    { claim: "Acalabrutinib headache can be managed mostly without intervention, or with paracetamol or caffeine, avoiding NSAIDs if possible", grade: "not graded (narrative section of a consensus; no recommendation category attached)", source: "chinese-btk-consensus-2023" },
    { claim: "Headache on blinatumomab may represent ICANS (table footnote)", grade: "not graded (regulatory label)", source: "label-blincyto", quote: "May represent ICANS." },
    { claim: "Neurological examination before blinatumomab and clinical monitoring during it", grade: "not graded (regulatory label)", source: "smpc-blincyto" },
    { claim: "Acalabrutinib: interrupt for grade 3 or greater non-haematological toxicity; discontinue at the fourth occurrence", grade: "not graded (regulatory label)", source: "smpc-calquence", quote: "Discontinue Calquence." },
    { claim: "Talazoparib: after withholding for a grade 3 or 4 non-haematological reaction, consider resuming at the next lower dose or discontinue (EU wording)", grade: "not graded (regulatory label)", source: "smpc-talzenna" },
  ],
  sources: [
    {
      key: "nice-cg150",
      label: "Headaches in over 12s: diagnosis and management (CG150), recommendations (published 19 September 2012, last updated 3 June 2025)",
      publisher: "NICE",
      year: 2025,
      url: "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2012], [2015], [2012, amended 2025]). \"Consider\" marks a weaker recommendation than \"offer\".",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ukons-toolkit-v3",
      label: "Oncology/Haemato-oncology 24-Hour Triage Toolkit: Information and Instruction Manual, 3rd edition (December 2024)",
      publisher: "UK Oncology Nursing Society (UKONS)",
      year: 2024,
      url: "https://ukons.org/resources/publicly-available-resources",
      gradingScheme: "A national toolkit built and revised by review and consultation groups; its recommendations are not graded. The link is the UKONS page that lists the PDF.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "label-calquence",
      label: "Calquence (acalabrutinib) tablets, US prescribing information and patient information (SPL version 9, effective 19 February 2026)",
      publisher: "AstraZeneca Pharmaceuticals / US FDA (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b1409184-3267-4d8c-8f17-4e01f69828b1",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-calquence",
      label: "Calquence summary of product characteristics and package leaflet (EMA EPAR product information; the PDF prints no revision date and its file date is 20 July 2026)",
      publisher: "AstraZeneca / European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/calquence-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-blincyto",
      label: "Blincyto (blinatumomab) US prescribing information and Medication Guide (SPL version 42, effective 14 April 2026)",
      publisher: "Amgen / US FDA (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38b482a8-960b-4591-9857-5031ecb830aa",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-blincyto",
      label: "Blincyto summary of product characteristics and package leaflet (EMA EPAR product information; file date 15 August 2026)",
      publisher: "Amgen / European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/blincyto-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-kadcyla",
      label: "Kadcyla (ado-trastuzumab emtansine) US prescribing information (SPL version 35, effective 1 April 2026)",
      publisher: "Genentech / US FDA (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3c1f4-0fc8-4804-a9e3-04cf25dd302e",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-kadcyla",
      label: "Kadcyla summary of product characteristics and package leaflet (EMA EPAR product information; file date 11 May 2026)",
      publisher: "Roche / European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/kadcyla-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-talzenna",
      label: "Talzenna (talazoparib) capsules, US prescribing information (SPL version 20, effective 28 October 2026)",
      publisher: "Pfizer / US FDA (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f2423edd-6d24-495c-aec1-c2f457f08d9a",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-talzenna",
      label: "Talzenna summary of product characteristics and package leaflet (EMA EPAR product information; file date 11 July 2025)",
      publisher: "Pfizer / European Medicines Agency",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/talzenna-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "label-voranigo",
      label: "Voranigo (vorasidenib) US prescribing information (SPL version 9, effective 20 June 2026); read for scope, no step rests on it",
      publisher: "Servier Pharmaceuticals / US FDA (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=31405fee-55b7-4857-987e-2724ee76be84",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "smpc-voranigo",
      label: "Voranigo summary of product characteristics (EMA EPAR product information; file date 7 July 2026); read for scope, no step rests on it",
      publisher: "Servier / European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/voranigo-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "obrien-2021",
      label: "Monitoring and Managing BTK Inhibitor Treatment-Related Adverse Events in Clinical Practice (narrative review; medical writing support funded by AstraZeneca)",
      publisher: "Frontiers in Oncology (O'Brien, Brown, Byrd, Furman et al.; medical writing funded by AstraZeneca, several authors declare AstraZeneca or Acerta ties)",
      year: 2021,
      url: "https://doi.org/10.3389/fonc.2021.720704",
      doi: "10.3389/fonc.2021.720704",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "lipsky-lamanna-2020",
      label: "Managing toxicities of Bruton tyrosine kinase inhibitors",
      publisher: "Hematology, American Society of Hematology Education Program (Lipsky and Lamanna; one author declares advisory roles and research support from manufacturers including AstraZeneca)",
      year: 2020,
      url: "https://doi.org/10.1182/hematology.2020000118",
      doi: "10.1182/hematology.2020000118",
      gradingScheme: "Educational review; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "chinese-btk-consensus-2023",
      label: "Chinese expert consensus on Bruton tyrosine kinase inhibitors in the treatment of B-cell malignancies",
      publisher: "Experimental Hematology & Oncology (Song et al.; states no funding and no competing interests)",
      year: 2023,
      url: "https://doi.org/10.1186/s40164-023-00448-5",
      doi: "10.1186/s40164-023-00448-5",
      gradingScheme: "Categories 1, 2A, 2B and 3 by level of evidence and share of the panel's vote, for its treatment recommendations. The adverse event section, where headache is, carries no category.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "macmillan-acalabrutinib",
      label: "Acalabrutinib (patient information, reviewed 1 June 2025)",
      publisher: "Macmillan Cancer Support",
      year: 2025,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/acalabrutinib",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "cruk-acalabrutinib",
      label: "Acalabrutinib (patient information, last reviewed 5 June 2024)",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/drugs/acalabrutinib",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "cruk-blinatumomab",
      label: "Blinatumomab (patient information, last reviewed 3 November 2026)",
      publisher: "Cancer Research UK",
      year: 2026,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/drugs/blinatumomab",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nhs-headaches",
      label: "Headaches (public information, page last reviewed 17 April 2024)",
      publisher: "NHS",
      year: 2024,
      url: "https://www.nhs.uk/conditions/headaches/",
      read: "full-text",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["acalabrutinib", "blinatumomab", "trastuzumab-emtansine", "talazoparib"],
  terms: ["icans", "crs", "ctcae-grading"],
  related: [
    "icans-grading-and-management",
    "crs-grading-and-management",
    "bispecific-step-up-dosing",
    "raised-intracranial-pressure",
    "acute-oncology-telephone-triage",
    "atrial-fibrillation-and-bleeding-on-btk-inhibitors",
    "bleeding-precautions-when-platelets-are-low",
    "oral-anticancer-medicines-at-home",
  ],
  upgrades: [],
  gaps: [
    "No oncology society guideline on headache caused by an anticancer medicine was found (searches of Europe PMC on 18 November 2026). The assessment steps come from NICE CG150, a general headache guideline for England that was not written for people with cancer, and from one line of the UKONS triage tool.",
    "The advice on acalabrutinib headache (reassurance beforehand, paracetamol or caffeine, NSAIDs avoided if possible) rests on three narrative papers. O'Brien 2021 was written with medical writing support funded by AstraZeneca; the Chinese consensus 2023 repeats its wording in a section with no recommendation category; Lipsky and Lamanna 2020 is an educational review that names paracetamol and caffeine and does not mention NSAIDs. No trial of any treatment for this headache was found, no source gives a dose or amount of caffeine, and neither paper that says to avoid NSAIDs gives its reason in the headache passage.",
    "Neither acalabrutinib label says how to manage headache. The dose rule in the steps is the labels' general rule for grade 3 or greater non-haematological toxicity. The same is true of talazoparib. The trastuzumab emtansine labels give no rule for managing headache; the one sentence that names it is the EU package leaflet's advice not to drive, cycle or use tools or machines until it stops. Their caution about anticoagulants and antiplatelet medicines belongs to the bleeding warning and is not connected to headache in either label, so it is not a step here.",
    "No source read says how often a headache on acalabrutinib or trastuzumab emtansine turns out to be bleeding in the head, or which headaches on these medicines should be scanned. The US and EU patient texts for acalabrutinib differ on whether headache is named as a sign of bleeding.",
    "For blinatumomab this page covers only the recognition of headache as a possible sign of neurological toxicity or cytokine release syndrome. Grading, steroid treatment and the labels' interruption rules are in the ICANS and cytokine release syndrome protocols and are not repeated here. The US label also covers children; this page is about adults.",
    "Other products on this site record headache as a side effect and are not covered. Vorasidenib: the US label names headache among the most common adverse reactions in its highlights and patient information, and gives 28% in its pooled safety population of 244 patients, but the adverse reaction table for its main trial has no headache row and the EU SmPC does not list headache; a new or worse headache in a person with a glioma belongs with the raised intracranial pressure protocol. Intismeran autogene is investigational and has no label. Ivermectin is not licensed as a cancer treatment. Optune is a device and its instructions for use were not read. Piflufolastat F-18 is an imaging agent given once.",
    "The ESMO 2024 CLL guideline and the NCCN CLL guideline could not be read (publisher refusal and login; on 18 November 2026 one further plain request for the ESMO interim update, DOI 10.1016/j.annonc.2024.06.016, returned only the publisher's redirect page and Europe PMC lists no open copy), so whether either addresses acalabrutinib headache is not known. Other BTK inhibitors (ibrutinib, zanubrutinib, pirtobrutinib) are not covered: Lipsky and Lamanna describe headache as seen uniquely with acalabrutinib, and their labels were not read for headache.",
    "The EMA product information PDFs print no revision date; the dates given are the files' own. The CTCAE definition of each headache grade was not read from the CTCAE itself and is not given here.",
    "CG150's assessment recommendations date from 2012 and have not been re-reviewed; its update page, read on 18 November 2026, lists changes to treatment recommendations only (latest June 2025, with a minor change in September 2026).",
  ],
});
