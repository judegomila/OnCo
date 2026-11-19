import { protocol } from "./helpers";

/*
 * Dry mouth (xerostomia, salivary gland hypofunction) caused by cancer treatment other than external-beam
 * radiotherapy to the head and neck: radioactive iodine, PSMA radioligand therapy, and the two kinase inhibitors
 * whose records list it (futibatinib, selpercatinib). Written 18 November 2026. Taste changes are left to
 * `taste-changes-during-cancer-treatment`; mouth care during chemotherapy and dry mouth after head and neck
 * radiotherapy have their own protocols and are linked, not repeated.
 *
 * What was read on 18 November 2026, and how (raw text only; no summarising tool was used for any fact):
 * - ISOO/MASCC/ASCO guideline, Mercadante et al., J Clin Oncol 2021;39:2825: full text. ascopubs.org returned 403
 *   to curl and Europe PMC holds no full text, so the published PDF held in UCL Discovery (University College London's
 *   open repository, discovery.ucl.ac.uk/10132425) was read through pdftotext, with and without -layout
 *   (the text file holds both conversions). Crossref lists no update or erratum. The PDF prints "fi" and "fl" as
 *   ligature characters, so quotes are whole sentences or spans that contain none.
 * - MASCC/ISOO Clinical Practice Statement on management of salivary gland hypofunction and xerostomia, Hong et
 *   al., Support Care Cancer 2024 (PMC11550240): full text, Europe PMC XML. An expert-opinion statement, ungraded.
 *   The correction notice (10.1007/s00520-024-08988-0) concerns the open access licence.
 * - Joint EANM/SNMMI procedure guideline for 177Lu-PSMA radioligand therapy, Kratochwil et al., Eur J Nucl Med Mol
 *   Imaging 2023 (PMC10317889): full text, Europe PMC XML. A Europe PMC title search found no later edition. It
 *   says nothing about cooling the salivary glands.
 * - 2025 American Thyroid Association guidelines for adults with differentiated thyroid cancer, Ringel et al.,
 *   Thyroid 2025 (PMC13090833): full text, the PubMed Central page fetched with curl and stripped (the Europe PMC
 *   XML endpoint returned 500). This edition updates the 2015 guideline.
 * - SNMMI procedure standard / EANM practice guideline for differentiated thyroid cancer, abbreviated version,
 *   J Nucl Med 2022;63(6):15N: the journal page, fetched and stripped. It refers the reader to "the complete
 *   online version" for radioiodine side effects; that version was not found and is named in `gaps`.
 * - US labels (DailyMed SPL XML): Pluvicto (SPL effective 12 August 2026), Lytgobi (revised 10/2026), Retevmo (SPL
 *   effective 11 September 2026), Hicon sodium iodide I 131 (revised November 2021).
 * - EU product information (EMA PDFs through pdftotext -layout): Pluvicto (PDF dated 16 June 2026), Lytgobi (PDF
 *   dated 3 October 2025), Retsevmo (PDF dated 22 April 2026). The PDFs print no revision date in the text.
 * - Mahajan et al., Transl Oncol 2022 (PMC9079342), van Kalmthout et al., EJNMMI Res 2018 (PMC6029992),
 *   Auttara-atthakorn et al., Front Endocrinol 2022 (PMC9465079), the 2026 review of sialagogue timing in Endocrine
 *   (PMC13433636), and Ma et al., Front Oncol 2022 (PMC8852230): full text, Europe PMC XML.
 * - Al-Ibraheem et al., Eur J Nucl Med Mol Imaging 2025, and the American Head and Neck Society consensus statement
 *   on salivary and lacrimal dysfunction after radioactive iodine (Singer et al., Head Neck 2020): abstracts only,
 *   Europe PMC. No step rests on either.
 * - CTCAE version 6.0 (NCI PDF, pdftotext). The dry mouth row is worded the same in version 5.0, also read.
 * - NHS "Dry mouth" (reviewed 29 November 2023), Macmillan "Mouth problems" (reviewed 1 April 2025), NCI "Mouth and
 *   throat problems" (reviewed 24 September 2021), Cancer Research UK "Radioactive iodine therapy" (reviewed 19 December 2023): the public pages,
 *   fetched raw and stripped to text.
 *
 * Not readable or not read:
 * - The complete version of the SNMMI/EANM thyroid cancer guideline (above).
 * - The full text of the AHNS consensus statement and of the 2025 actinium-225 meta-analysis (subscription).
 * - A request to the Internet Archive for the ASCO page was refused by the tool permission system and was not
 *   retried; the UCL copy made it unnecessary.
 * - There is no centrally authorised EU sodium iodide (I-131) product at the EMA; no national SmPC was read.
 *
 * Scope, checked recommendation by recommendation: the ISOO/MASCC/ASCO guideline includes radioactive iodine,
 * chemotherapy and targeted therapies in its target population, but says most of its recommendations focus on
 * head and neck radiotherapy. Recommendation 2.1 (lubricants, saliva substitutes) is worded for xerostomia induced
 * by nonsurgical cancer therapies; 2.2 (gum and lozenges) names no treatment and sits under the same clinical
 * question, which is about nonsurgical cancer therapies; 2.3 to 2.5 (pilocarpine, cevimeline, acupuncture,
 * electrostimulation) are worded for head and neck radiotherapy only and are not presented here as covering
 * anything else.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed.
 *
 * Second reader, 18 November 2026. An independent reader re-fetched ten sources as raw text (curl, the writer's
 * tag-stripping script, pdftotext): the four US labels from DailyMed (Pluvicto, Lytgobi, Retevmo, Hicon), the three
 * EMA product information PDFs, the ATA guideline page on PubMed Central, the EANM/SNMMI guideline from Europe PMC
 * and the NHS page. Each converted text was byte-identical to the writer's saved copy. The ISOO/MASCC/ASCO PDF was
 * fetched again from UCL Discovery and Recommendations 2.1 to 2.6 read in both conversions. The other sources were
 * checked against the writer's saved texts of the same day. The ATA corrigendum (PMC13521431, Thyroid 2025;35:1350)
 * was read: it corrects two affiliations, an author's initial and a row heading in Table 8, and does not touch
 * Recommendation 40. The link the abbreviated SNMMI/EANM thyroid guideline prints for its complete version was
 * tried once and redirects to a general SNMMI page. 141 claims were checked: none wrong, nine unsupported and
 * reworded or moved, none unverifiable; all 26 quotes are verbatim by script. What changed: Recommendation 2.2 is no longer
 * described as worded for all nonsurgical cancer therapies (it names no treatment); the US label's general rule
 * for a delay of more than 4 weeks ("consider" stopping) now stands beside the EU rule ("must" stop); botulinum
 * toxin is attributed to the review that names it, not the guideline; three variant sentences that no source
 * states were reworded to what the sources say; and `lu177-radioligand-therapy` moved from `technologies` to
 * `related`, because that record also covers lutetium-177 dotatate for neuroendocrine tumours, on which no source
 * read here says anything. `ac225-psma` stays in `drugs`: the meta-analysis read in full names actinium-225
 * PSMA-617 for this problem, and the page says only what it reports.
 */
export const dryMouthFromCancerDrugsAndRadionuclideTherapy = protocol({
  id: "dry-mouth-from-cancer-drugs-and-radionuclide-therapy",
  name: "Dry mouth from radioactive iodine, PSMA radioligand therapy and cancer drugs",
  aka: ["xerostomia", "salivary gland hypofunction", "dry mouth on Pluvicto", "dry mouth after radioiodine", "radioiodine sialadenitis", "swollen salivary glands after radioactive iodine", "dry mouth on selpercatinib", "dry mouth on futibatinib", "hyposalivation"],
  domain: "symptom-management",
  tldr: "Some cancer treatments reduce saliva: radioactive iodine, lutetium-177 PSMA therapy and some tablets. Sips of water, sugar-free gum and saliva sprays or gels can ease it, and less saliva means more tooth decay, so dental care matters. Tell your team if it is hard to eat or talk, or your mouth is sore or has white patches. Your own team's advice comes first.",
  simple: "Some cancer treatments make your mouth dry. Sip water often, chew sugar-free gum, and ask about sprays or gels that wet the mouth. Look after your teeth and see a dentist regularly. Tell your team if eating or talking is hard, or if your mouth is sore, bleeding or has white patches. Follow your own hospital's advice first.",
  summary: "This page covers dry mouth from radioactive iodine (I-131), PSMA radioligand therapy, futibatinib and selpercatinib. It is for understanding care; the treating team's own protocol comes first. Frequency, from the labels: lutetium-177 vipivotide tetraxetan 46% in the pooled US safety population (N = 1320; 61% in PSMAfore, 39% in VISION) and 39.3% in the EU SmPC (VISION); futibatinib 35% (US label, 103 patients, no grade 3) and 31.0% (EU SmPC); selpercatinib 44%, 39% and 32% across LIBRETTO-001, -431 and -531 (US label), very common in the EU SmPC. The US sodium iodide I 131 label lists sialadenitis and xerostomia as radiation toxicities; the ATA (2025) cites acute salivary side effects in 39% of 262 patients in the first year after ablation.\n\nPrevention. For radioiodine the ATA recommends counselling and general measures including hydration (both Good Practice Statements) and calls the role of sour sweets and other sialagogues uncertain, with evidence insufficient to recommend for or against hydration, sour candies, amifostine or cholinergic agents as gland protection. The US label, by contrast, advises good hydration for one week and a sialagogue. A 2026 systematic review of sialagogue timing (three observational studies, 818 adults) could make no definitive recommendation. For lutetium-177 PSMA therapy the EANM/SNMMI guideline (2023) gives no general recommendation on drugs to reduce salivary uptake; a full-text review and the one ice-pack study read found cooling of limited or doubtful value.\n\nDose rules. Only lutetium-177 vipivotide tetraxetan has a dry mouth rule, and the labels differ: the US label withholds at grade 2 or 3 and stops for good if grade 3 recurs after one reduction; the EU SmPC lists a 20% reduction at grade 3 only. Futibatinib and selpercatinib fall under each label's general rule for other grade 3 or 4 reactions.\n\nRelief. The ISOO/MASCC/ASCO guideline (2021) says topical lubricants or saliva substitutes may be offered for xerostomia from nonsurgical cancer therapies (evidence quality intermediate, strength strong), and sugar-free lozenges or gum (intermediate, moderate). Its pilocarpine and cevimeline recommendation is for dry mouth after head and neck radiotherapy only. For PSMA therapy the EANM/SNMMI guideline says pilocarpine must be weighed for the individual because benefits and risks could be closely balanced, and that sialendoscopy may help unacceptable xerostomia (weak). The MASCC/ISOO statement (2024, expert opinion) adds a medicines review, dental care two to four times a year, fluoride, and antifungal treatment for clinical oral candidiasis. No guideline read addresses dry mouth from kinase inhibitors, or from actinium-225 PSMA agents, which are investigational.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage", "community"],
  },
  population: "Adults with dry mouth, or painful or swollen salivary glands, during or after radioactive iodine (I-131) for differentiated thyroid cancer, lutetium-177 PSMA radioligand therapy for prostate cancer, or treatment with futibatinib or selpercatinib. The ISOO/MASCC/ASCO guideline covers adults having any nonsurgical cancer therapy, including radioactive iodine, chemotherapy and targeted therapies, but says that most of its recommendations focus on radiotherapy for head and neck cancer and that it found no eligible randomised trials for immunotherapies. The ATA guideline covers adults with differentiated thyroid cancer; the EANM/SNMMI guideline covers lutetium-177 PSMA therapy only. Actinium-225 PSMA agents are investigational and no guideline read covers them. Not covered here: dry mouth after external-beam radiotherapy to the head and neck, oral graft-versus-host disease, children, and taste changes, which have their own pages.",
  trigger: "Before a treatment whose label or guideline lists dry mouth or salivary gland damage, and whenever a person on or after one reports a dry mouth, thick saliva, or pain or swelling in front of the ear or under the jaw.",
  steps: [
    {
      action: "Before radioactive iodine, counsel the person that it may affect the salivary glands, both soon after treatment and in the long term",
      why: "The ATA explains that salivary gland cells take up iodine, and that swelling, pain and dryness of the mouth can occur in the weeks after treatment. It says that, rarely, the effects become chronic and severe, with dry mouth, more tooth decay and interference with taste.",
      source: "ata-dtc-2025",
      quote: "Patients should be counseled that RAI treatment may be associated with (acute and chronic) salivary gland morbidity, lacrimal duct stenosis, and potential risk of secondary malignancies.",
      grade: "Good Practice Statement",
    },
    {
      action: "Tell people starting lutetium-177 vipivotide tetraxetan, futibatinib or selpercatinib that their labels list dry mouth among the most common side effects",
      why: "The labels give the figures. Lutetium-177 vipivotide tetraxetan: 46% in the pooled US safety population and 39.3% in the EU SmPC. Futibatinib: 35% in the US label and 31.0% in the EU SmPC, with no grade 3 dry mouth in the US table. Selpercatinib: 44%, 39% and 32% in the three studies in the US label; the EU SmPC lists it as very common. The US label for lutetium-177 vipivotide tetraxetan has no counselling point on dry mouth; the EU leaflet lists it as a very common side effect.",
      source: "lytgobi-us-label",
      quote: "The most common (≥20%) adverse reactions were nail toxicity, musculoskeletal pain, constipation, diarrhea, fatigue, dry mouth, alopecia, stomatitis",
    },
    {
      action: "After radioactive iodine, advise general measures including good hydration",
      why: "The ATA recommends general measures including hydration to prevent salivary side effects. The US label for sodium iodide I 131 advises good hydration for one week after the dose to reduce radiation exposure to the salivary glands. How much to drink is for the treating centre to say.",
      source: "ata-dtc-2025",
      quote: "For prevention of salivary gland side effects after RAI, general measures including hydration are recommended.",
      grade: "Good Practice Statement",
    },
    {
      action: "Treat sour sweets, lemon juice, vitamin C and gum after radioactive iodine as unsettled, tell the person that sources differ, and follow the treating centre's own instruction on whether and when to start them",
      why: "The US label advises stimulating saliva with a sialagogue, giving sugar-free candy or gum, pilocarpine and ascorbic acid as examples. The ATA says some centres suggest sour lozenges and other groups consider them harmful, cites one study in which sour candy within one hour of treatment may have increased gland damage compared with starting 24 hours later, and finds the evidence insufficient to recommend for or against them. A 2026 systematic review of three observational studies found the evidence on timing inconsistent.",
      source: "ata-dtc-2025",
      quote: "Hence, the role of sour candies to increase salivary secretion after RAI is uncertain.",
    },
    {
      action: "For painful swelling of the salivary glands after radioactive iodine, consider a non-steroidal anti-inflammatory drug, and ice on the gland for pain",
      why: "The ATA says most people with this radiation sialadenitis respond well to non-steroidal anti-inflammatory drugs, that a short course of steroids is occasionally required for severe symptoms, and that local application of ice may relieve the pain. These are statements in the guideline's text, not graded recommendations.",
      source: "ata-dtc-2025",
      quote: "For salivary gland pain and swelling (radiation-induced sialadenitis), most patients respond well to nonsteroidal anti-inflammatory drugs, but occasionally a short course of steroids is required for severe symptoms.",
    },
    {
      action: "Treat measures meant to protect the salivary glands during lutetium-177 PSMA therapy (glutamate, atropine, botulinum toxin, ice packs on the cheeks) as unproven options, not routine care",
      why: "The EANM/SNMMI guideline says no general recommendation can be given on drug interventions, and warns that they may also change the uptake ratios used to select patients. It does not mention cooling or botulinum toxin; the 2022 review names botulinum toxin as a possible method that warrants further studies. The one ice-pack study read (PSMA PET scans, not treatment) concluded that ice packs in lutetium-177 PSMA therapy should remain optional and most likely do not reduce dry mouth, and a 2022 review concluded that external cooling has shown a limited role with temporary effects.",
      source: "eanm-snmmi-psma-2023",
      quote: "Several drug interventions (e.g., oral glutamate, atropine injections, pre-dosing with unlabeled PSMA ligands) to reduce off-target uptake of PSMA ligands in salivary glands or kidneys have been suggested [103]. Due to the limited evidence available, at this point, no general recommendation can be given.",
    },
    {
      action: "During treatment with lutetium-177 vipivotide tetraxetan, grade the dry mouth and apply the label's rule. Under the US label, withhold for grade 2 or grade 3 until it improves or returns to baseline, consider a 20% dose reduction after grade 2, reduce by 20% after grade 3, and stop for good if grade 3 recurs after one dose reduction. The EU SmPC lists only a 20% reduction for grade 3",
      why: "Both labels grade by the most current CTCAE. In CTCAE version 6.0, grade 2 is moderate symptoms with changes to oral intake such as copious water, other lubricants or a diet limited to purees or soft, moist foods, and grade 3 is being unable to take adequate food by mouth, so that tube feeding or intravenous nutrition is indicated. The reduced dose is 5.9 GBq (5 900 MBq in the EU text). Both texts say the dose may be reduced once and should not be raised again. If a delay for an adverse reaction lasts more than 4 weeks, the US label says to consider stopping for good and the EU SmPC says treatment must be discontinued.",
      source: "pluvicto-us-label",
      quote: "Grade 2 Withhold PLUVICTO until improvement or return to baseline. Consider reducing PLUVICTO dose by 20% to 5.9 GBq (160 mCi). Grade 3 Withhold PLUVICTO until improvement or return to baseline. Reduce PLUVICTO dose by 20% to 5.9 GBq (160 mCi). Recurrent Grade 3 dry mouth after one dose reduction Permanently discontinue PLUVICTO.",
    },
    {
      action: "For futibatinib or selpercatinib, apply the label's general rule for other adverse reactions if dry mouth reaches grade 3: withhold until it recovers, then resume at a reduced dose",
      why: "Neither label has a rule written for dry mouth. For futibatinib the US label and the EU SmPC say the same: withhold for grade 3 until it resolves to grade 1 or baseline, resume at the next lower dose, and stop for good for grade 4. For selpercatinib the US label withholds for grade 3 or 4 until recovery to baseline or grade 0 or 1 and resumes at a reduced dose; the EU SmPC suspends until recovery to baseline, resumes at a reduced dose, and discontinues permanently if grade 4 events recur after dose modification.",
      source: "lytgobi-us-label",
      quote: "Withhold LYTGOBI until toxicity resolves to Grade 1 or baseline, then resume LYTGOBI",
    },
    {
      action: "Consider offering a saliva substitute or a mouth-moistening gel or spray",
      why: "This recommendation is worded for dry mouth from nonsurgical cancer therapies, although the four trials the guideline describes for it were in people who had radiotherapy. For lutetium-177 PSMA therapy the EANM/SNMMI guideline says mild dry mouth can be alleviated with water, sprays of artificial saliva or xylitol lozenges. The MASCC/ISOO statement says products containing mucin are generally preferred over those containing carboxymethylcellulose, and that the relief is short-lived.",
      source: "isoo-mascc-asco-2021",
      quote: "Topical mucosal lubricants or saliva substitutes (agents directed at ameliorating xerostomia and other salivary gland hypofunction-related symptoms) may be offered to improve xerostomia induced by nonsurgical cancer therapies",
      grade: "type: evidence-based; evidence quality: intermediate; strength of recommendation: strong",
    },
    {
      action: "Consider offering sugar-free gum or sugar-free lozenges to stimulate saliva where the glands still work",
      why: "This recommendation names no treatment; the one trial of gum the guideline describes was after radiotherapy for head and neck cancer. The guideline says these give a temporary rise in saliva and temporary relief by stimulating whatever gland tissue still works, and that sugar-free matters because less saliva raises the risk of tooth decay. The NHS tells people with their own teeth not to use acidic artificial saliva products. In the first day after radioactive iodine, whether to stimulate saliva at all is unsettled (see the step on sour sweets).",
      source: "isoo-mascc-asco-2021",
      quote: "sugar-free lozenges, acidic (nonerosive and sugar-free special preparation if dentate patients) candies, or sugar-free, nonacidic chewing gum may be offered to produce transitory increased saliva",
      grade: "type: evidence-based; evidence quality: intermediate; strength of recommendation: moderate",
    },
    {
      action: "Advise frequent sips of water, moist food, lip balm, and avoiding alcohol and smoking",
      why: "This is what Macmillan, the NHS and the NCI tell patients. The NCI says to drink plenty of liquids because a dry mouth can increase the risk of tooth decay and mouth infections; Macmillan says alcohol and smoking can irritate the mouth.",
      source: "macmillan-mouth-problems",
      quote: "Take frequent sips of water or a sugar-free drink. Keep a glass of water by your bed and carry a drink with you when you go out.",
    },
    {
      action: "Consider reviewing the person's other medicines for ones that dry the mouth",
      why: "The MASCC/ISOO statement says that opioids and anticholinergic medicines are common causes of dry mouth in people with cancer. The NHS tells patients not to stop a prescribed medicine without medical advice.",
      source: "mascc-isoo-cps-2024",
      quote: "If appropriate, a review and adjustment of the patient’s concomitant medications (i.e., number, dosage, formulation) to alleviate salivary gland hypofunction or xerostomia may be explored [4].",
    },
    {
      action: "Before prescribing pilocarpine (or cevimeline where it is available), weigh its side effects and contraindications for the individual",
      why: "The EANM/SNMMI guideline says this for dry mouth after lutetium-177 PSMA therapy. The ISOO/MASCC/ASCO recommendation for pilocarpine and cevimeline is written only for dry mouth after head and neck radiotherapy. For long-term dry mouth after radioactive iodine the ATA says cholinergic agents may increase saliva, without grading it. No source read addresses these medicines for dry mouth from futibatinib or selpercatinib. The MASCC/ISOO statement lists acute or uncontrolled asthma, acute iritis and narrow angle glaucoma as contraindications, and says a response to pilocarpine may take 12 weeks.",
      source: "eanm-snmmi-psma-2023",
      quote: "Due to its own side effects and contra-indications, the use of parasympathomimetics (e.g., the FDA and EMA approved pilocarpine) must consider patient’s individual situation because benefits and risks could be closely balanced [103].",
    },
    {
      action: "Advise that people with reduced saliva should have regular professional dental care, use a high-concentration, pH-neutral fluoride product every day and avoid highly sugary and acidic foods",
      why: "The MASCC/ISOO statement says people with reduced saliva are at increased risk of tooth decay and should have dental care two to four times a year. The ATA says people with dry mouth after radioactive iodine should discuss preventive strategies with their dental health professional (Good Practice Statement).",
      source: "mascc-isoo-cps-2024",
      quote: "As such, all patients should have regular professional dental care two to four times a year.",
    },
    {
      action: "Start antifungal treatment when there are clinical signs of oral thrush, and consider it when symptoms suggest a hidden infection",
      why: "The MASCC/ISOO statement says people with reduced saliva are at risk of opportunistic oral candidiasis. The NHS lists sore white patches in the mouth among the reasons to see a doctor.",
      source: "mascc-isoo-cps-2024",
      quote: "Antifungal therapy should be initiated when there are clinical signs of oral candidiasis, and considered when there are non-specific symptoms suggesting subclinical infection.",
    },
    {
      action: "Ask the person to tell the team if dry mouth makes eating or talking difficult, if the mouth becomes painful, red, swollen or bleeding, or if sore white patches appear",
      why: "These are the NHS's reasons to see a doctor about a dry mouth, which it files under non-urgent advice. Macmillan adds that someone who coughs when drinking and feels unwell should tell their doctor or nurse as soon as possible. The EU leaflet for lutetium-177 vipivotide tetraxetan asks patients to tell their nuclear medicine doctor if side effects such as dry mouth become severe.",
      source: "nhs-dry-mouth",
      quote: "your mouth is painful, red, swollen or bleeding",
    },
    {
      action: "For dry mouth or gland swelling that stays unacceptable despite these measures, consider referral to a salivary gland specialist to discuss sialendoscopy",
      why: "Sialendoscopy passes a fine scope into the salivary duct to wash it out. The EANM/SNMMI guideline says it may improve unacceptable dry mouth after PSMA therapy, on the evidence of a single cohort study, which was in people having actinium-225 PSMA-617. The ATA says several small studies have shown it to be effective for radioiodine sialadenitis that does not respond to medical treatment.",
      source: "eanm-snmmi-psma-2023",
      quote: "“Unacceptable” xerostomia may eventually be improved by retrograde sialendoscopy and flushing with steroids (weak recommendation based on a single cohort study [102]).",
      grade: "weak recommendation based on a single cohort study",
    },
    {
      action: "Before actinium-225 PSMA therapy, which is investigational, discuss that dry mouth has been its most common side effect in published series",
      why: "A 2022 meta-analysis of six retrospective studies of actinium-225 PSMA-617 (201 patients) reported dry mouth of any degree in 77.1% and grade III in 3.0%. A 2025 meta-analysis of 20 studies, read as an abstract, pooled any-grade dry mouth at 84% for actinium-225 PSMA given alone, grade 3 at 13%, and stopping treatment because of it at 5%.",
      practice: "No guideline or label read covers actinium-225 PSMA agents, so no source states this step. It restates the published rates so that the discussion can happen; the two meta-analyses rest on small and mostly retrospective series.",
    },
  ],
  bestInClass: {
    statement: "No guideline read was written for dry mouth from kinase inhibitors or from actinium-225 agents, and the guidelines that cover radionuclide therapy rest on low or indirect evidence. What is best supported: counselling before radioactive iodine and general measures including hydration (ATA 2025, both Good Practice Statements); lubricants or saliva substitutes (ISOO/MASCC/ASCO 2021, evidence quality intermediate, strength strong) and sugar-free gum or lozenges (intermediate, moderate), the first worded for xerostomia from nonsurgical cancer therapies and the second naming no treatment, under a clinical question about nonsurgical cancer therapies; dental care and fluoride (MASCC/ISOO 2024, expert opinion; ATA Good Practice Statement). For lutetium-177 vipivotide tetraxetan the dose rule differs by label: the US label withholds at grade 2 or 3 and stops for good if grade 3 recurs after one reduction, the EU SmPC lists a 20% reduction at grade 3 only. The sources disagree on sialagogues after radioactive iodine: the US label advises one, the ATA finds the evidence insufficient to recommend for or against and the role of sour candies uncertain, and a 2026 systematic review could make no definitive recommendation on timing. Pilocarpine and cevimeline carry a strong recommendation only after head and neck radiotherapy; for PSMA therapy the EANM/SNMMI guideline asks for an individual weighing of benefit and risk.",
    sources: ["ata-dtc-2025", "isoo-mascc-asco-2021", "mascc-isoo-cps-2024", "eanm-snmmi-psma-2023", "pluvicto-us-label", "pluvicto-eu-smpc", "hicon-us-label", "sialagogue-timing-sr-2026"],
  },
  variants: [
    {
      name: "A sialagogue after radioactive iodine (US label) against no recommendation either way (ATA)",
      differs: "The US label for sodium iodide I 131 (Hicon, revised November 2021) says to advise good hydration for one week and to stimulate salivary flow with a sialagogue, giving sugar-free candy or gum, pilocarpine and ascorbic acid as examples, to reduce radiation exposure to the salivary glands. The ATA (2025) recommends general measures including hydration, and says of hydration, sour candies, amifostine and cholinergic agents as gland protection that the evidence is insufficient to recommend for or against them.",
      evidence: "The ATA cites one study suggesting sour candy may increase gland damage when given within one hour of treatment compared with starting 24 hours later, a study in which lemon slices within 20 minutes of iodine-123 increased the absorbed dose to the glands, and others suggesting that early and repeated lemon juice transiently decreased exposure of the parotid glands. A 2026 systematic review (three observational studies, 818 adults) found two earlier studies with more acute sialadenitis after early stimulation (54.7 to 63.8% against 34.4 to 36.8%) and a more recent propensity-matched study with fewer events after early stimulation (4.78% against 15.22%), and made no definitive recommendation. A 2022 systematic review of 12 randomised trials (667 participants) found that vitamin C showed no significant effect, that pilocarpine did not protect the parotid glands, and that massage of the parotid gland, aromatherapy, vitamin E, selenium, amifostine and bethanechol may have benefits, in small trials needing confirmation.",
      sources: ["hicon-us-label", "ata-dtc-2025", "sialagogue-timing-sr-2026", "rai-prevention-sr-2022"],
    },
    {
      name: "Dry mouth dose rule for lutetium-177 vipivotide tetraxetan: US label against EU SmPC",
      differs: "US label (SPL effective 12 August 2026): grade 2, withhold until improvement or return to baseline and consider reducing the dose by 20% to 5.9 GBq; grade 3, withhold until improvement or return to baseline and reduce by 20%; recurrent grade 3 after one dose reduction, permanently discontinue. EU SmPC (EMA PDF dated 16 June 2026): grade 3, reduce the dose by 20% to 5 900 MBq; no entry for grade 2 and no instruction to withhold for dry mouth. Both texts say the dose may be reduced once and should not be re-escalated. For a delay of more than 4 weeks because of an adverse reaction, the US label says to consider permanent discontinuation and the EU SmPC says treatment must be discontinued; the EU SmPC also says it must be discontinued if a further reduction would be required.",
      evidence: "Regulatory labels, not graded. In the US label dry mouth led to permanent discontinuation in 1.3% of patients in PSMAfore and was the most frequent reaction leading to a dose reduction in PSMAddition (1.1%) and PSMAfore (0.9%). The EANM/SNMMI guideline gives no dose rule specific to dry mouth; it says to discontinue for any toxicity the patient considers unacceptable.",
      sources: ["pluvicto-us-label", "pluvicto-eu-smpc", "eanm-snmmi-psma-2023"],
    },
    {
      name: "Ice packs on the cheeks during PSMA radioligand therapy",
      differs: "A 2022 review describes frozen ice packs applied on both cheeks from 30 minutes before treatment until up to 4 hours after it, replaced at intervals. The EANM/SNMMI guideline does not mention the practice.",
      evidence: "A study using PSMA PET scans (not treatment) found that ice packs seemed to reduce tracer uptake in the parotid glands only, and concluded that their routine use in lutetium-177 PSMA therapy should remain optional and most likely does not contribute to a reduction of dry mouth. A 2022 review reported an absolute reduction of about 14% in parotid uptake with a one-sided ice pack in 24 patients and no significant difference with ice packs on both sides in 20, and concluded that external cooling has shown a limited role with temporary effects.",
      sources: ["icepack-2018", "mahajan-2022", "eanm-snmmi-psma-2023"],
    },
    {
      name: "Pilocarpine or cevimeline outside head and neck radiotherapy",
      differs: "The ISOO/MASCC/ASCO recommendation (2.3) is for dry mouth after radiotherapy for head and neck cancer. The EANM/SNMMI guideline and the ATA discuss such medicines after radionuclide therapy without recommending them (see the evidence). The MASCC/ISOO statement gives doses for cancer patients in general: pilocarpine 5 mg, 7.5 mg or 10 mg three to four times a day to a maximum of 30 mg a day, and cevimeline 30 mg three times a day; it says they suit people with some remaining gland function.",
      evidence: "For PSMA therapy the EANM/SNMMI guideline says the use of pilocarpine must consider the individual because benefits and risks could be closely balanced. For radioactive iodine the ATA says cholinergic agents may increase saliva in chronic dry mouth, ungraded; a 2022 systematic review found pilocarpine did not protect the parotid glands when given to prevent damage. The ISOO/MASCC/ASCO guideline lists sweating, headache, increased urinary frequency, dyspepsia, lacrimation and nausea as expected side effects of pilocarpine, and says cevimeline is available only in selected countries. No source read tested either medicine in dry mouth from kinase inhibitors.",
      sources: ["isoo-mascc-asco-2021", "mascc-isoo-cps-2024", "eanm-snmmi-psma-2023", "ata-dtc-2025", "rai-prevention-sr-2022"],
    },
    {
      name: "Actinium-225 PSMA therapy (investigational)",
      differs: "Not a licensed treatment. The pooled rates of dry mouth below are higher than the figures in the labels for lutetium-177 vipivotide tetraxetan, though they come from retrospective series and not from the same kind of study. Some series give actinium-225 together with lutetium-177 (tandem therapy).",
      evidence: "Meta-analysis of six retrospective studies of actinium-225 PSMA-617 (201 patients, 2022): dry mouth of any degree in 77.1%, grade III in 3.0%. Meta-analysis of 20 studies (1207 patients, 2025, abstract only): pooled any-grade dry mouth 84% with actinium-225 PSMA alone, grade 3 in 13%, treatment stopped because of it in 5%; a lower pooled rate with tandem therapy, with significant heterogeneity and publication bias. The single cohort study behind the EANM/SNMMI statement on sialendoscopy was in people having actinium-225 PSMA-617.",
      sources: ["ac225-meta-2022", "ac225-xerostomia-meta-2025", "eanm-snmmi-psma-2023"],
    },
  ],
  grades: [
    { claim: "Counsel before radioactive iodine about acute and chronic salivary gland morbidity", grade: "Good Practice Statement", source: "ata-dtc-2025" },
    { claim: "General measures including hydration to prevent salivary side effects after radioactive iodine", grade: "Good Practice Statement", source: "ata-dtc-2025" },
    { claim: "People with dry mouth after radioactive iodine are at increased risk of tooth decay and should discuss prevention with their dental professional", grade: "Good Practice Statement", source: "ata-dtc-2025", quote: "Patients with xerostomia are at increased risk of dental caries and should discuss preventive strategies with their dental health professional." },
    { claim: "Hydration, sour candies, amifostine and cholinergic agents to prevent salivary gland damage from radioactive iodine", grade: "evidence is insufficient to recommend for or against (text, not a numbered recommendation)", source: "ata-dtc-2025" },
    { claim: "The US label for sodium iodide I 131 advises hydration for one week and a sialagogue", grade: "Regulatory label; not graded", source: "hicon-us-label", quote: "Advise good hydration for one week following sodium iodide I 131 administration and stimulate salivary flow via a sialagogue (e.g. sugar-free candy or gum, pilocarpine, and ascorbic acid) to reduce radiation exposure to the salivary glands." },
    { claim: "Topical mucosal lubricants or saliva substitutes may be offered for xerostomia induced by nonsurgical cancer therapies (Recommendation 2.1)", grade: "type: evidence-based; evidence quality: intermediate; strength of recommendation: strong", source: "isoo-mascc-asco-2021" },
    { claim: "Sugar-free lozenges, acidic candies (non-erosive and sugar-free for people with teeth) or sugar-free, non-acidic gum may be offered (Recommendation 2.2)", grade: "type: evidence-based; evidence quality: intermediate; strength of recommendation: moderate", source: "isoo-mascc-asco-2021" },
    { claim: "Oral pilocarpine, and cevimeline where available, may be offered after radiotherapy for head and neck cancer (Recommendation 2.3; not written for other treatments)", grade: "type: evidence-based; evidence quality: high; strength of recommendation: strong", source: "isoo-mascc-asco-2021", quote: "Oral pilocarpine, and cevimeline where available, may be offered after radiation therapy in patients with head and neck cancer for transitory improvement of xerostomia and salivary gland hypofunction by stimulating residual capacity of salivary gland tissue." },
    { claim: "Most of the ISOO/MASCC/ASCO recommendations focus on radiotherapy for head and neck cancer", grade: "Scope statement; not graded", source: "isoo-mascc-asco-2021", quote: "majority of the recommendations focus on patients who receive radiation therapy for head and neck cancer." },
    { claim: "Mild dry mouth after lutetium-177 PSMA therapy: water, artificial saliva sprays or xylitol lozenges", grade: "moderate strong recommendation", source: "eanm-snmmi-psma-2023", quote: "Mild cases of xerostomia can be alleviated with coping water or sprays with artificial salivary supplements or xylitol lozenges; moderate strong recommendation." },
    { claim: "Sialendoscopy with steroid flushing for unacceptable dry mouth after PSMA therapy", grade: "weak recommendation based on a single cohort study", source: "eanm-snmmi-psma-2023" },
    { claim: "Drug interventions to reduce salivary gland uptake of PSMA ligands", grade: "no general recommendation can be given", source: "eanm-snmmi-psma-2023" },
    { claim: "EU SmPC dose rule for dry mouth on lutetium-177 vipivotide tetraxetan: grade 3 only", grade: "Regulatory label; not graded", source: "pluvicto-eu-smpc", quote: "Reduce Pluvicto dose by 20% to 5 900 MBq." },
    { claim: "Dry mouth as defined in CTCAE version 6.0, the scale the labels grade by", grade: "Grading scale; not a recommendation", source: "ctcae-v6", quote: "Definition: A disorder characterized by reduced salivary flow in the oral cavity." },
    { claim: "Ice packs during lutetium-177 PSMA therapy", grade: "Single study; not graded", source: "icepack-2018", quote: "structural application of icepacks in patients undergoing 177Lu-PSMA therapy in advanced prostate cancer should remain optional, but most likely does not contribute to reduction of xerostomia." },
    { claim: "Timing of sialagogues after radioactive iodine", grade: "Systematic review of three observational studies; not graded", source: "sialagogue-timing-sr-2026", quote: "Given the scarce and observational nature of available evidence, no definitive recommendation can be made." },
  ],
  sources: [
    {
      key: "isoo-mascc-asco-2021",
      label: "Salivary Gland Hypofunction and/or Xerostomia Induced by Nonsurgical Cancer Therapies: ISOO/MASCC/ASCO Guideline",
      publisher: "Journal of Clinical Oncology (Mercadante et al.); administration funded by MASCC/ISOO and ASCO",
      year: 2021,
      url: "https://doi.org/10.1200/JCO.21.01208",
      doi: "10.1200/JCO.21.01208",
      gradingScheme: "ASCO: type of recommendation (evidence-based or informal consensus), evidence quality (high, intermediate, low or insufficient) and strength of recommendation (strong, moderate or weak), printed after each recommendation.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "mascc-isoo-cps-2024",
      label: "MASCC/ISOO Clinical Practice Statement: Management of salivary gland hypofunction and xerostomia in cancer patients",
      publisher: "Supportive Care in Cancer (Hong et al.)",
      year: 2024,
      url: "https://doi.org/10.1007/s00520-024-08688-9",
      doi: "10.1007/s00520-024-08688-9",
      gradingScheme: "Expert-opinion clinical practice statement; its statements are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "eanm-snmmi-psma-2023",
      label: "Joint EANM/SNMMI procedure guideline for the use of 177Lu-labeled PSMA-targeted radioligand-therapy (177Lu-PSMA-RLT)",
      publisher: "European Journal of Nuclear Medicine and Molecular Imaging (Kratochwil et al.); several authors declare inventorship of PSMA-617 or consultancy for its manufacturer",
      year: 2023,
      url: "https://doi.org/10.1007/s00259-023-06255-8",
      doi: "10.1007/s00259-023-06255-8",
      gradingScheme: "Strong (multicentre randomised trials with low risk of bias), moderate-strong (meta-analyses and systematic reviews of case-control or cohort studies, or trials with moderate risk of bias) or weak (case-control or cohort studies, indirect evidence, case reports and expert opinion).",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ata-dtc-2025",
      label: "2025 American Thyroid Association Management Guidelines for Adult Patients with Differentiated Thyroid Cancer",
      publisher: "Thyroid (Ringel et al.); funded by the American Thyroid Association without commercial support",
      year: 2025,
      url: "https://doi.org/10.1177/10507256251363120",
      doi: "10.1177/10507256251363120",
      gradingScheme: "GRADE strength and certainty for graded recommendations; a Good Practice Statement is not graded and is used where evidence is low or insufficient but the benefit is judged obvious. Statements in the explanatory text carry no grade.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "snmmi-eanm-dtc-2022",
      label: "SNMMI Procedure Standard/EANM Practice Guideline for Nuclear Medicine Evaluation and Therapy of Differentiated Thyroid Cancer: Abbreviated Version",
      publisher: "Journal of Nuclear Medicine (Avram et al.)",
      year: 2022,
      url: "https://jnm.snmjournals.org/content/63/6/15N",
      gradingScheme: "Procedure standard; not graded. The abbreviated version defers radioiodine side effects to the complete online version, which was not read.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "pluvicto-us-label",
      label: "Pluvicto (lutetium Lu 177 vipivotide tetraxetan) US prescribing information, SPL effective 12 August 2026",
      publisher: "Novartis, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14908037-2892-4d98-a053-253ce35afb1a",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "pluvicto-eu-smpc",
      label: "Pluvicto EU summary of product characteristics and package leaflet (EMA product information, PDF dated 16 June 2026)",
      publisher: "Novartis, via the European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/pluvicto-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "lytgobi-us-label",
      label: "Lytgobi (futibatinib) US prescribing information, revised 10/2026",
      publisher: "Taiho, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0b1332a1-0581-4707-9bf6-1eccfa39bef4",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "lytgobi-eu-smpc",
      label: "Lytgobi EU summary of product characteristics and package leaflet (EMA product information, PDF dated 3 October 2025)",
      publisher: "Taiho, via the European Medicines Agency",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/lytgobi-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "retevmo-us-label",
      label: "Retevmo (selpercatinib) US prescribing information, SPL effective 11 September 2026",
      publisher: "Eli Lilly, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7fa848ba-a59c-4144-9f52-64d090f4d828",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "retsevmo-eu-smpc",
      label: "Retsevmo (selpercatinib) EU summary of product characteristics and package leaflet (EMA product information, PDF dated 22 April 2026)",
      publisher: "Eli Lilly, via the European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/retsevmo-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "hicon-us-label",
      label: "Hicon (sodium iodide I 131 solution) US prescribing information, revised November 2021",
      publisher: "Jubilant Radiopharma, via DailyMed (US National Library of Medicine)",
      year: 2021,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=524a0dac-6e2b-2c0c-04b4-76d85dba63c5",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ctcae-v6",
      label: "Common Terminology Criteria for Adverse Events (CTCAE) version 6.0",
      publisher: "US National Cancer Institute",
      year: 2025,
      url: "https://dctd.cancer.gov/research/ctep-trials/for-sites/adverse-events/ctcae-v6.pdf",
      gradingScheme: "Severity grades 1 to 5 for each adverse event; a grading scale, not a guideline.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "mahajan-2022",
      label: "Assessment of salivary gland function after 177Lu-PSMA radioligand therapy: Current concepts in imaging and management",
      publisher: "Translational Oncology (Mahajan et al.); no funding declared",
      year: 2022,
      url: "https://doi.org/10.1016/j.tranon.2022.101445",
      doi: "10.1016/j.tranon.2022.101445",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "icepack-2018",
      label: "Impact of external cooling with icepacks on 68Ga-PSMA uptake in salivary glands",
      publisher: "EJNMMI Research (van Kalmthout et al.)",
      year: 2018,
      url: "https://doi.org/10.1186/s13550-018-0408-2",
      doi: "10.1186/s13550-018-0408-2",
      gradingScheme: "Single-centre imaging study; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "rai-prevention-sr-2022",
      label: "Prevention of salivary gland dysfunction in patients treated with radioiodine for differentiated thyroid cancer: A systematic review of randomized controlled trials",
      publisher: "Frontiers in Endocrinology (Auttara-atthakorn et al.)",
      year: 2022,
      url: "https://doi.org/10.3389/fendo.2022.960265",
      doi: "10.3389/fendo.2022.960265",
      gradingScheme: "Systematic review of randomised trials; no recommendation grades.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "sialagogue-timing-sr-2026",
      label: "Early versus delayed oral sialagogues for the prevention of salivary gland dysfunction after radioiodine therapy in differentiated thyroid cancer: a systematic review",
      publisher: "Endocrine",
      year: 2026,
      url: "https://doi.org/10.1007/s12020-026-04727-z",
      doi: "10.1007/s12020-026-04727-z",
      gradingScheme: "Systematic review of observational studies, risk of bias by ROBINS-I; no recommendation grades.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ac225-meta-2022",
      label: "Efficacy and Safety of 225Ac-PSMA-617-Targeted Alpha Therapy in Metastatic Castration-Resistant Prostate Cancer: A Systematic Review and Meta-Analysis",
      publisher: "Frontiers in Oncology (Ma et al.)",
      year: 2022,
      url: "https://doi.org/10.3389/fonc.2022.796657",
      doi: "10.3389/fonc.2022.796657",
      gradingScheme: "Meta-analysis of retrospective studies; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ac225-xerostomia-meta-2025",
      label: "Evaluating Xerostomia as a side effect of [225Ac]Ac-PSMA therapy in prostate cancer: a systematic review and meta-analysis",
      publisher: "European Journal of Nuclear Medicine and Molecular Imaging (Al-Ibraheem et al.)",
      year: 2025,
      url: "https://doi.org/10.1007/s00259-025-07168-4",
      doi: "10.1007/s00259-025-07168-4",
      gradingScheme: "Meta-analysis; not graded.",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "ahns-rai-consensus-2020",
      label: "Salivary and lacrimal dysfunction after radioactive iodine for differentiated thyroid cancer: American Head and Neck Society Endocrine Surgery Section and Salivary Gland Section joint multidisciplinary clinical consensus statement",
      publisher: "Head & Neck (Singer et al.)",
      year: 2020,
      url: "https://doi.org/10.1002/hed.26417",
      doi: "10.1002/hed.26417",
      gradingScheme: "Consensus statement with six recommendations; their wording is not in the abstract.",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "nhs-dry-mouth",
      label: "Dry mouth (page last reviewed 29 November 2023)",
      publisher: "NHS",
      year: 2023,
      url: "https://www.nhs.uk/symptoms/dry-mouth/",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "macmillan-mouth-problems",
      label: "Mouth problems caused by cancer treatment (patient information, reviewed 1 April 2025)",
      publisher: "Macmillan Cancer Support",
      year: 2025,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/mouth-problems",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nci-mouth-throat",
      label: "Mouth and throat problems: cancer treatment side effects (patient information, reviewed 24 September 2021)",
      publisher: "US National Cancer Institute",
      year: 2021,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "cruk-radioactive-iodine",
      label: "Radioactive iodine therapy (patient information, last reviewed 19 December 2023)",
      publisher: "Cancer Research UK",
      year: 2023,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/radioisotopes/radioactive-iodine-therapy",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["pluvicto", "radioactive-iodine", "futibatinib", "selpercatinib", "ac225-psma"],
  technologies: ["radioiodine-therapy"],
  terms: ["radioiodine-term"],
  related: [
    "oral-mucositis-prevention-and-oral-care",
    "head-and-neck-radiotherapy-oral-mucositis",
    "head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis",
    "radioiodine-therapy-home-radiation-safety",
    "lutetium-177-therapy-home-radiation-safety",
    "taste-changes-during-cancer-treatment",
    "dry-mouth-teeth-after-head-neck-radiotherapy",
    "pilocarpine",
    "lu177-radioligand-therapy",
  ],
  upgrades: [],
  gaps: [
    "No guideline read addresses dry mouth caused by futibatinib, selpercatinib or any other kinase inhibitor. Their labels report how often it happens and give no advice on managing it beyond the general dose rule for other grade 3 or 4 reactions. The relief measures on this page are carried over from ISOO/MASCC/ASCO Recommendations 2.1 (worded for nonsurgical cancer therapies) and 2.2 (which names no treatment), whose trials were in people who had radiotherapy.",
    "The ISOO/MASCC/ASCO guideline (2021) says that, because of the limits of the evidence, most of its recommendations focus on radiotherapy for head and neck cancer, and that it found no eligible randomised trials for immunotherapies. Its recommendations on pilocarpine, cevimeline, acupuncture and electrostimulation are written for head and neck radiotherapy and are not presented here as covering radionuclide therapy or drugs.",
    "Whether sour sweets, lemon juice, vitamin C or gum protect the salivary glands after radioactive iodine, and when to start them, is unsettled: the US label advises a sialagogue, the ATA (2025) finds the evidence insufficient to recommend for or against, and a 2026 systematic review found three observational studies with inconsistent results.",
    "The SNMMI/EANM guideline on differentiated thyroid cancer (2022) was read only in its abbreviated version, which defers the discussion of radioiodine side effects to a complete online version that was not found; on 18 November 2026 the link it prints for that version led only to a general SNMMI page. What EANM or SNMMI recommend on salivary protection with radioactive iodine is therefore not on this page.",
    "The American Head and Neck Society consensus statement on salivary and lacrimal dysfunction after radioactive iodine (2020) was read as an abstract only; its six recommendations are not in the abstract and nothing rests on it.",
    "No EU product information for sodium iodide (I-131) was read: there is no centrally authorised product at the EMA, and no national SmPC was fetched. The comparison for radioactive iodine is therefore the US label against the ATA guideline, not US against EU.",
    "The EANM/SNMMI guideline for lutetium-177 PSMA therapy says nothing about cooling the salivary glands. The evidence read on ice packs is one imaging study with PSMA PET tracers and a narrative review; neither measured dry mouth after treatment.",
    "Actinium-225 PSMA agents are investigational. No guideline or label read covers them; the rates given come from one meta-analysis of six retrospective studies and from the abstract of a second, which reports significant heterogeneity and publication bias. The full text of the second was not read.",
    "The EU product information PDFs print no revision date in their text; the dates given are those of the PDF files as served by the EMA on 18 November 2026. The label figures for dry mouth come from different studies and populations in the US and EU texts and are not directly comparable.",
    "No source read sets an urgent threshold for dry mouth itself. The NHS files its reasons to see a doctor under non-urgent advice, the EU leaflet for lutetium-177 vipivotide tetraxetan asks patients to tell their nuclear medicine doctor if such side effects become severe, and the US label for lutetium-177 vipivotide tetraxetan has no patient counselling point on dry mouth. Macmillan's \"as soon as possible\" is about coughing when drinking while feeling unwell, in its section on swallowing, and the NCI's advice to call a doctor or nurse is about mouth pain that makes it difficult to eat, drink or sleep, or a fever; neither is about dry mouth itself. The patient information for futibatinib and selpercatinib lists dry mouth among common side effects with no instruction on when to call.",
    "The technology record for lutetium-177 radioligand therapy also covers lutetium-177 dotatate for neuroendocrine tumours. No source read here says anything about dry mouth with that treatment, so this page is linked to the technology as related reading and is not offered as a protocol for it.",
    "A correction to the 2025 ATA guideline (Thyroid 2025;35:1350) was read on 18 November 2026: it corrects affiliations, an author's name and a table heading, and does not change Recommendation 40.",
    "How much to drink after radioactive iodine or lutetium-177 PSMA therapy is not stated as a figure for salivary protection in any source read; the hydration advice in the labels and in the EANM/SNMMI guideline is written mainly for the kidneys and bladder.",
    "The ISOO/MASCC/ASCO guideline could not be fetched from the publisher (403 to a script). The published PDF held in UCL Discovery, University College London's open repository, was read instead. Crossref lists no update; the 2024 MASCC/ISOO clinical practice statement is a later companion, not a revision.",
  ],
});
