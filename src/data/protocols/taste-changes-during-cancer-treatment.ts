import { protocol } from "./helpers";

/*
 * Taste changes (dysgeusia) during cancer treatment in adults: what is asked, what is checked, what can be offered,
 * and the label rules for the two T-cell engagers whose labels name taste change.
 *
 * Written 18 November 2026. Every source was fetched with curl on that day and read as raw text; every quote was
 * checked by script against the saved text (whitespace normalised, nothing else).
 *
 * What was read, and how:
 * - MASCC/ISOO Clinical Practice Statement: management of oral complications of immunotherapy (Support Care Cancer
 *   2025): full text, Europe PMC full-text XML (PMC12433365). It has a section on dysgeusia and lists talquetamab and
 *   tarlatamab among the CD3-targeted bispecific antibodies it covers. It is expert opinion and prints no grades.
 * - TALVEY (talquetamab-tgvs) US prescribing information and Medication Guide, revised 10/2025: DailyMed SPL XML
 *   (set id 9001355e-003d-4d4e-b4ce-337e0fd14952).
 * - Talvey EU product information (SmPC and package leaflet): the EMA PDF through pdftotext -layout. Its "date of
 *   revision of the text" field is blank, as in every EMA copy; the PDF was created on 20 October 2025 and the EMA
 *   server gave 8 October 2026 as its last-modified date.
 * - IMDELLTRA (tarlatamab-dlle) US prescribing information and Medication Guide, revised 09/2026: DailyMed SPL XML
 *   (set id 1e7b6163-5d83-42ea-82c9-cf7620cdc782). Imdylltra EU product information: the EMA PDF (created 16 April
 *   2026) through pdftotext -layout.
 * - PYLARIFY (piflufolastat F-18) US prescribing information: DailyMed SPL XML (set id
 *   a00e5cbc-4fd5-4280-82ec-cd3498df4553, effective 18 February 2026). It lists dysgeusia as an adverse reaction and
 *   gives no advice on it. The EU label of the same tracer was not read.
 * - Alves et al., Support Care Cancer 2026 (review of talquetamab oral toxicity), Fleischer et al., Support Care
 *   Cancer 2026 (mixed-methods study and proposed workflow) and Naqvi et al., EJHaem 2024 (17 patients): full text,
 *   Europe PMC full-text XML (PMC13004741, PMC13275594, PMC11327703).
 * - Lyckholm et al., J Pain Palliat Care Pharmacother 2012 (zinc trial): full text, the PubMed Central page
 *   (PMC4042409) fetched with curl after the Europe PMC XML endpoint returned an error.
 * - NCI PDQ health professional summaries "Oral Complications of Cancer Therapies" (updated 16 February 2024) and
 *   "Nutrition in Cancer Care" (updated 20 September 2024), and the NCI patient pages "Mouth and Throat Problems and
 *   Cancer Treatment" (reviewed 24 September 2021) and "Nutrition During Cancer" (posted 15 October 2024): the
 *   cancer.gov pages, stripped to text.
 * - Cancer Research UK "Tips for diet problems" (last reviewed 2 November 2023) and the Macmillan booklet "Eating
 *   problems and cancer" (4th edition, August 2020, MAC13613): the public page and PDF.
 *
 * Read as abstracts only (Europe PMC; the publishers serve no full text to a script):
 * - Hovan et al., the MASCC/ISOO systematic review of dysgeusia (Support Care Cancer 2010). A Europe PMC title search
 *   on 18 November 2026 found no later MASCC/ISOO review of dysgeusia.
 * - Halyard et al. 2007 (zinc trial N01C4), Chi et al. 2020 (zinc meta-analysis), Braud et al. 2024 (systematic
 *   review of drugs and supplements), Laheij et al. 2023 (taste testing on talquetamab), the MASCC/ISOO statement on
 *   targeted therapy (2024), and Chari et al. 2024 (talquetamab management; its authors include Janssen employees).
 *
 * Not readable:
 * - Chari et al. 2024 in full: the journal page serves no text to a script, and a request to the publisher's
 *   text-mining address was refused by this session's permission system and not retried.
 * - ESPEN practical guideline, clinical nutrition in cancer (2021): abstract only, which does not mention taste; the
 *   ESPEN site returned 403 for the PDF. ESMO cachexia guideline (2021): the Europe PMC XML held no body text.
 * - The IMWG (2024) and European Myeloma Network (2023) consensus papers on bispecific antibodies: abstracts only,
 *   neither of which mentions taste. Not cited.
 * - The published correction to Naqvi et al. (EJHaem 2025, PMC12086638): Europe PMC returned 503.
 *
 * Products in the corpus that record dysgeusia: talquetamab and tarlatamab are in `drugs` because their labels name
 * taste change. Piflufolastat F-18 is a diagnostic tracer given once, and nemtabrutinib is investigational with no
 * label; no source read gives advice for either, so neither is in `drugs`.
 *
 * Every DOI was resolved through Europe PMC and its title checked.
 *
 * Second reader, 18 November 2026. An independent reader re-fetched with curl, into a separate folder, the TALVEY and
 * IMDELLTRA DailyMed SPL XML, the Talvey and Imdylltra EMA PDFs (pdftotext -layout; both byte-identical in text to
 * the writer's copies), the MASCC/ISOO 2025 statement (Europe PMC full-text XML), Lyckholm 2012 (the PubMed Central
 * page), the NCI and Cancer Research UK patient pages, and the Europe PMC core records of all twelve DOIs (titles,
 * abstracts, affiliations). The other sources (the two NCI PDQ summaries, the Macmillan booklet, PYLARIFY, Alves,
 * Fleischer, Naqvi) were read from the writer's saved texts of the same day. The Naqvi correction still returned
 * 503. 171 claims were checked: 3 wrong, 16 unsupported or overstated, 1 unverifiable; all 30 quotes are verbatim.
 * Changed: the NCI nutrition page is dated (posted 15 October 2024; the record had said undated and carried the
 * access year); the EU SmPC's 72% for dysgeusia is a grouped term by its own footnote, the same grouping as the US
 * table's 70%, which the page had called unstated; each MASCC/ISOO step now says it is ungraded expert opinion
 * written for immunotherapy; the zinc step no longer orders what no source asks; the tarlatamab step now quotes the
 * US label's general withhold instruction and its limits; the mouth-care quote is placed in the NCI list it comes
 * from (loss of appetite); Cancer Research UK's advice against very cold or hot foods is shown beside the NCI's
 * advice to try cold foods; Laheij 2023 is now used on the page; one Naqvi author's Janssen honoraria are named.
 */
export const tasteChangesDuringCancerTreatment = protocol({
  id: "taste-changes-during-cancer-treatment",
  name: "Taste changes (dysgeusia) during cancer treatment",
  aka: ["dysgeusia", "ageusia", "loss of taste", "metallic taste", "taste alteration", "food tastes different on chemotherapy", "talquetamab taste changes", "GPRC5D oral toxicity"],
  domain: "symptom-management",
  tldr: "Many cancer treatments change how food tastes: bland, metallic, bitter or too sweet. It often improves after treatment ends, but not always, and no medicine reliably prevents or reverses it. What helps is practical: trying different foods, mouth care, and a dietitian if you eat less or lose weight. On talquetamab or tarlatamab, tell your team promptly. Your own team's advice comes first.",
  simple: "Cancer treatment can make food taste strange or of nothing at all. Tell your team. Try different foods, keep your mouth clean, and try foods again after a few weeks. If you are eating less or losing weight, ask to see a dietitian. No pill is proven to bring taste back. If you are on talquetamab or tarlatamab, report taste changes straight away.",
  summary: "No source read gives a graded recommendation for taste change. The MASCC/ISOO systematic review (Hovan 2010, read as an abstract) found a weighted prevalence of 56 to 76% depending on the type of cancer treatment and concluded that there does not appear to be a predictable way of preventing or treating dysgeusia. The NCI PDQ summary says that taste change with chemotherapy is generally reversible, with taste returning to normal in the ensuing months.\n\nThe MASCC/ISOO clinical practice statement on immunotherapy (2025, expert opinion, ungraded) asks clinicians to exclude a concurrent drug or oral hygiene product, to rule out a nutritional deficit with a blood count, iron panel, folic acid, zinc and vitamin B tests, and to check thyroid function. It says a short empirical course of a topical antifungal or antimicrobial may be a strategy to exclude oral infection, that zinc may be a treatment option (on the basis of studies in the general population), and that the response to any treatment may be slow and unpredictable. On zinc the evidence disagrees: two placebo-controlled trials found no benefit (Halyard 2007, 169 patients having head and neck radiotherapy; Lyckholm 2012, 58 patients on chemotherapy), a 2020 meta-analysis of three radiotherapy studies found a lower incidence of dysgeusia with zinc (risk ratio 0.72, 95% CI 0.67 to 0.92) and no faster recovery, and a 2024 systematic review of 12 articles called zinc promising. The rest is practical advice from NCI, Cancer Research UK and Macmillan, with referral to a dietitian.\n\nTalquetamab is the one product with a label rule. US label (revised 10/2025): oral toxicity in 80% of patients, not resolved to baseline in 65%; dysgeusia cannot be graded above 2 under CTCAE v4.03; Grade 1 to 2 oral toxicity or weight loss, provide supportive care and consider withholding if not responsive; Grade 3, withhold until Grade 1 or better; Grade 4, permanently discontinue. EU SmPC: for toxicity not responding to supportive care, interrupt until stabilisation or improvement and consider restarting less often (0.4 mg/kg weekly to every two weeks; 0.8 mg/kg every two weeks to every four weeks); its oral toxicity row has no grades. Both ask for weight to be monitored regularly. The US tarlatamab label counts dysgeusia (34%) among neurologic toxicities and its Medication Guide asks patients to report changes in taste right away. Its general instruction is to withhold at the first sign of neurologic toxicity, including ICANS, and consider neurology evaluation; its dose table is graded for ICANS only, and it does not say how the instruction applies to taste change alone. The EU product information lists it as a very common side effect only.",
  asOf: "2026-11-18",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults whose sense of taste changes during chemotherapy, targeted therapy, immunotherapy or radiotherapy. The clinical checks come from a MASCC/ISOO statement written for immunotherapy (checkpoint inhibitors and CD3-targeted bispecific antibodies) and are applied here to taste change in general, which the statement itself does not claim. The dose rules apply to talquetamab only. Dry mouth, a sore mouth (mucositis), difficulty swallowing and weight loss have their own protocols and are covered here only where they bear on taste. Children are not covered. The zinc trials cited were in head and neck radiotherapy and in chemotherapy; nothing here is a recommendation for or against zinc.",
  trigger: "A person on cancer treatment reports that food tastes different, of nothing, or unpleasant; or treatment with talquetamab or tarlatamab is about to start.",
  steps: [
    {
      action: "Ask early about changes in taste and smell, along with the other side effects that get in the way of eating",
      why: "The NCI summary lists alterations in taste and smell among the side effects that get in the way of eating, and says these should be identified and anticipated early. It does not say how often to ask.",
      source: "nci-pdq-nutrition-hp",
      quote: "It is important to identify and anticipate malnutrition and other nutrition impact symptoms early.",
    },
    {
      action: "Before talquetamab starts, discuss the signs of mouth side effects, taste change among them, and that weight may fall",
      why: "The US label reports mouth side effects in 80% of patients in its trial, starting a median of 15 days in, and asks prescribers to counsel patients to seek medical attention if they occur and to report weight loss. The EU SmPC also says patients should be counselled to seek medical attention if signs or symptoms of oral toxicity occur.",
      source: "talvey-us-label",
      quote: "Discuss the signs and symptoms of oral toxicities including dysgeusia, dry mouth, dysphagia, and stomatitis.",
    },
    {
      action: "Exclude another medicine or a mouth-care product as the cause of the taste change or as something making it worse",
      why: "This is the first check in the MASCC/ISOO 2025 statement, which is ungraded expert opinion written for people on immunotherapy. It gives no list of medicines or products.",
      source: "mascc-immunotherapy-2025",
      quote: "Healthcare professionals should exclude the possibility of a concurrent drug or oral hygiene product that may cause or aggravate taste change.",
    },
    {
      action: "Look for a mouth infection, and consider a short trial of a topical antifungal or antimicrobial to exclude it",
      why: "The MASCC/ISOO 2025 statement (ungraded expert opinion, written for people on immunotherapy) says fungal and bacterial infections may contribute to taste change and describes a short empirical course as something that may be done, not something that must be.",
      source: "mascc-immunotherapy-2025",
      quote: "Fungal and bacterial infections may contribute to dysgeusia, and a short empirical course of topical antifungal or topical antimicrobial agents may be a strategy to exclude oral infection as the cause of taste disorder.",
    },
    {
      action: "Rule out a nutritional deficit with a blood count, iron panel, folic acid, zinc and vitamin B tests, and check thyroid function",
      why: "The MASCC/ISOO 2025 statement (ungraded expert opinion, written for people on immunotherapy) says a deficit should be ruled out as a cause and that thyroid function should be examined to rule out undiagnosed or uncontrolled thyroid disease. If a deficiency is found it advises the patient to see their primary care doctor about whether further gut tests are needed.",
      source: "mascc-immunotherapy-2025",
      quote: "A nutritional deficit should be ruled out as a cause by performing the following tests: hemogram/blood count, iron panel, folic acid, zinc, and vitamin B tests.",
    },
    {
      action: "Check for a dry mouth and manage it under its own protocol",
      why: "The NCI tells patients that having less saliva can change the way food tastes. On talquetamab both are frequent: the US label lists dry mouth in 34% of patients and dysgeusia in 49%.",
      source: "nci-nutrition-patient",
      quote: "Dry mouth can also change the way food tastes.",
    },
    {
      action: "Suggest trying different foods to find what tastes best, and trying a food again after a few weeks",
      why: "The NCI and Macmillan both tell patients to try different foods. Cancer Research UK says to avoid foods that taste strange but to try them again every few weeks, because taste may have gone back to normal, and Macmillan says the same. On temperature they differ: the NCI says trying cold foods may help and Macmillan that some people find cold foods taste better than hot, while Cancer Research UK's list says to avoid very cold or hot foods. None of the three cites a trial.",
      source: "nci-mouth-throat",
      quote: "If you have taste changes it may help to try different foods to find ones that taste best to you.",
    },
    {
      action: "For a metallic taste, suggest plastic cutlery and avoiding food and drink from cans",
      why: "Cancer Research UK says this can help reduce the metallic taste. The NCI and Macmillan give the same advice about cutlery.",
      source: "cruk-diet-tips",
      quote: "If your food tastes metallic use plastic utensils and avoid food and drinks from cans.",
    },
    {
      action: "Encourage frequent mouth care, including brushing the teeth and rinsing the mouth before eating",
      why: "The NCI summary gives this in its list of suggestions for loss of appetite and weight loss, just after telling patients to report changes in how foods taste and smell. Cancer Research UK tells patients to keep the mouth clean, brush the teeth well and rinse with water before eating; Macmillan says to brush before meals.",
      source: "nci-pdq-nutrition-hp",
      quote: "Perform frequent mouth care to relieve symptoms and decrease aftertastes.",
    },
    {
      action: "Explain that no treatment is known to prevent or reverse taste change reliably, and that it often improves after treatment",
      why: "The MASCC/ISOO systematic review reached this conclusion in 2010 and reported that zinc sulfate and amifostine had been of limited benefit as prevention. The NCI summary says taste change with chemotherapy is generally reversible over the following months; Macmillan says it is usually temporary but can sometimes be permanent.",
      source: "hovan-2010",
      quote: "From the current literature, there does not appear to be a predictable way of preventing or treating dysgeusia.",
    },
    {
      action: "Treat zinc as an option at most, with the trial results in view: no source read recommends it or a dose",
      why: "The MASCC/ISOO 2025 statement (ungraded expert opinion, written for people on immunotherapy) says zinc may be a treatment option, basing this on studies in the general population, and adds that the response to any treatment may be slow and the outcome unpredictable. Two placebo-controlled trials found no benefit: one in 58 people on chemotherapy (zinc sulfate 220 mg twice daily over three months) and one in 169 people having head and neck radiotherapy. A meta-analysis of three radiotherapy studies found fewer cases with zinc. The Zinc supplements entry below gives the figures.",
      source: "mascc-immunotherapy-2025",
      quote: "Based on previous literature on dysgeusia in the general population, zinc supplements may be a treatment option, even if the zinc level is within the normal range",
    },
    {
      action: "Refer to a dietitian when taste change comes with eating less, a problem with diet, or weight loss",
      why: "Cancer Research UK tells patients that the healthcare team can refer them to the hospital dietitian. Both talquetamab labels name consultation with a nutritionist as part of supportive care. Screening for malnutrition and what to offer are in the nutrition protocol.",
      source: "cruk-diet-tips",
      quote: "Speak to your healthcare team if you have a problem with diet, digestion or weight loss. They can refer you to the hospital dietitian for help.",
    },
    {
      action: "On talquetamab, monitor weight regularly and evaluate clinically significant weight loss further",
      why: "The US label reports weight loss in 62% of patients in its trial, whether or not they had mouth side effects, including 29% with Grade 2 weight loss (10% or greater) and 2.7% with Grade 3 (20% or greater). The EU SmPC asks for the same monitoring.",
      source: "talvey-us-label",
      quote: "Monitor weight regularly during therapy. Evaluate clinically significant weight loss further.",
    },
    {
      action: "On talquetamab, provide supportive care for Grade 1 to 2 mouth side effects or weight loss, and consider withholding the drug if they do not respond (US label)",
      why: "This is the US label's rule. For Grade 3 it says to withhold until Grade 1 or better, and for Grade 4 to permanently discontinue; it also notes that taste change itself cannot be graded above 2. The EU SmPC's rule for oral toxicity has no grades: where toxicity does not respond to supportive care it says to interrupt treatment until stabilisation or improvement and to consider restarting on a less frequent schedule.",
      source: "talvey-us-label",
      quote: "Consider withholding TALVEY if not responsive to supportive care.",
    },
    {
      action: "On tarlatamab, monitor closely for neurological symptoms, and ask the patient to report a change in taste right away (US label)",
      why: "The US label counts taste change as the most frequent neurologic toxicity of tarlatamab (34% of patients), and its Medication Guide lists changes in taste among the signs to tell the healthcare provider about right away. Its general instruction is to withhold the drug at the first sign of neurologic toxicity, including ICANS, and to consider neurology evaluation; its dose table is graded for ICANS, a different problem, and the label does not say how the instruction applies to a change in taste on its own. That is for the prescriber to judge. The EU product information lists a bad taste in the mouth as a very common side effect and does not put it in its neurological warning.",
      source: "imdelltra-us-label",
      quote: "Closely monitor patients for signs and symptoms of neurologic toxicity and ICANS during treatment with IMDELLTRA.",
    },
    {
      action: "Ask the patient to call the team if pain in the mouth, lips or throat makes it difficult to eat, drink or sleep, or if they have a fever of 38 °C or higher",
      why: "The NCI tells patients that mouth problems are more serious if they interfere with eating and drinking, because they can lead to dehydration and malnutrition.",
      source: "nci-mouth-throat",
      quote: "It’s important to call your doctor or nurse if you have pain in your mouth, lips, or throat that makes it difficult to eat, drink, or sleep or if you have a fever of 100.5 °F (38 °C) or higher.",
    },
  ],
  bestInClass: {
    statement: "No guideline read grades a recommendation for taste change, so the best supported version is modest. Ask about taste early (NCI PDQ). Exclude another medicine, a mouth-care product, a mouth infection, a nutritional deficit and thyroid disease (MASCC/ISOO 2025, ungraded expert opinion, written for immunotherapy and applied here to taste change in general). Give practical food and mouth-care advice (NCI, Cancer Research UK, Macmillan; no trial cited by any of them) and refer to a dietitian when eating or weight suffers. Be plain that nothing is known to prevent or reverse it reliably (MASCC/ISOO systematic review, 2010). On zinc the sources disagree and both positions are shown: MASCC/ISOO 2025 says it may be a treatment option and a 2024 systematic review calls it promising, while the two placebo-controlled trials read (Halyard 2007, Lyckholm 2012) found no benefit and a 2020 meta-analysis found fewer cases with zinc during radiotherapy but no faster recovery. For talquetamab the US label and the EU SmPC differ and both are shown: the US label acts by grade (supportive care and consider withholding at Grade 1 to 2, withhold at Grade 3, permanently discontinue at Grade 4), and the EU SmPC acts on toxicity that does not respond to supportive care (interrupt, then consider less frequent dosing).",
    sources: ["nci-pdq-nutrition-hp", "mascc-immunotherapy-2025", "hovan-2010", "nci-mouth-throat", "cruk-diet-tips", "macmillan-eating-problems", "halyard-2007", "lyckholm-2012", "chi-2020", "braud-2024", "talvey-us-label", "talvey-eu-smpc"],
  },
  variants: [
    {
      name: "Talquetamab: US label by grade, EU SmPC by response to supportive care",
      differs: "US label (revised 10/2025): Grade 1 to 2 oral toxicity or weight loss, provide supportive care and consider withholding if not responsive; Grade 3, withhold until resolution to Grade 1 or better and provide supportive care; Grade 4, permanently discontinue. EU SmPC: for oral toxicity, including weight loss, not responding to supportive care, interrupt until stabilisation or improvement and consider restarting on a modified schedule (0.4 mg/kg every week becomes every two weeks; 0.8 mg/kg every two weeks becomes every four weeks). The EU SmPC names what supportive care may include: saliva stimulating agents, steroid mouth wash, or consultation with a nutritionist. The US label says supportive care as per current clinical practice, including consultation with a nutritionist.",
      evidence: "Both rest on the MonumenTAL-1 trial. US label: oral toxicity in 80% of patients (Grade 3 in 2.1%), the most frequent being dysgeusia (49%), dry mouth (34%), dysphagia (23%) and ageusia (18%); median onset 15 days; not resolved to baseline in 65%; weight loss in 62%. Its adverse reaction table groups ageusia, dysgeusia, hypogeusia and taste disorder at 70% and notes that under CTCAE v4.03 the maximum grade for dysgeusia is 2. EU SmPC (N=339): dysgeusia 72%, which a footnote says includes ageusia, dysgeusia, hypogeusia and taste disorder, so it is the counterpart of the US table's 70% and not of the US figure of 49%; weight decreased 40%; and weight decreased among the most frequent reasons for stopping treatment (0.9%). The EU table carries the same note that dysgeusia cannot be graded above 2. The EU dose table also has a row for other non-haematologic adverse reactions of Grade 3 to 4 (withhold until Grade 1 or baseline); its oral toxicity row is separate and has no grades. A study of eight patients (Laheij 2023, abstract only) measured taste before and eight weeks after starting talquetamab: the objective taste score fell from 8.8 to 4.9, all eight reported moderate to severe taste changes, and they had severe dry mouth with no change in measured salivary flow.",
      sources: ["talvey-us-label", "talvey-eu-smpc", "laheij-2023"],
    },
    {
      name: "Zinc supplements",
      differs: "Zinc by mouth has been tried both to prevent and to treat taste change. MASCC/ISOO 2025 (ungraded expert opinion, for people on immunotherapy) says zinc may be a treatment option even when the zinc level is normal. The NCI patient page lists zinc as a question for people having head and neck radiotherapy to ask their team, not as advice.",
      evidence: "Against: the MASCC/ISOO systematic review (2010, abstract) found prophylactic zinc sulfate or amifostine of limited benefit. Halyard 2007 (abstract; 169 evaluable patients having head and neck radiotherapy, zinc sulfate 45 mg three times daily against placebo): taste alterations in the first two months in 73% with zinc and 84% with placebo (p = 0.16), and no favourable effect on the interval to taste recovery; the authors concluded zinc did not prevent taste alterations. Lyckholm 2012 (full text; 29 patients in each group on chemotherapy, 220 mg twice daily for three months): no statistically significant improvement; the authors report no conflicts of interest. For: Chi 2020 (abstract; meta-analysis of three studies in head and neck radiotherapy): zinc reduced the incidence of dysgeusia (risk ratio 0.72, 95% CI 0.67 to 0.92) but did not speed recovery of taste. Braud 2024 (abstract; systematic review of 12 articles in chemotherapy) reported efficacy for zinc at 50 to 220 mg a day, called zinc and delta-9-tetrahydrocannabinol the most promising of the strategies it found and asked for more studies. Which trials it counted was not readable from the abstract, so whether it weighed the negative chemotherapy trial above is not known.",
      sources: ["mascc-immunotherapy-2025", "hovan-2010", "halyard-2007", "lyckholm-2012", "chi-2020", "braud-2024", "nci-mouth-throat"],
    },
    {
      name: "Mouthwashes, supplements and longer dose intervals for talquetamab taste change",
      differs: "Centres have used corticosteroid or antifungal rinses, zinc or vitamin supplements, saliva stimulants, hydration and dietary changes, and have lengthened the interval between doses. A review describes dexamethasone and nystatin mouthwashes, zinc and B vitamins and local cooling as preventive approaches used in practice.",
      evidence: "Alves 2026 (review of 8 studies; authors declare no competing interests) says the effectiveness of the supportive measures appears variable, that no prospective study has evaluated a standardised approach, and that dose modification has been the most consistently reported strategy for severe dysgeusia. The manufacturer-authored management paper (Chari 2024, abstract only; authors include Janssen employees) says that, based on investigator experience, dose modification may be effective for controlling oral events. Naqvi 2024 (17 patients, one centre, no funding) found dysgeusia in 14 and a median weight loss of 6.1%, and reports another analysis, of MonumenTAL-1 patients who switched to less frequent or reduced dosing, in which adverse events generally improved over time but weight loss did not. One of its authors reports honoraria from Janssen. A randomised phase 2 trial of preventive measures (TALISMAN, NCT06500884: dexamethasone mouthwash, pregabalin, clonazepam) had no results available when Alves 2026 was written.",
      sources: ["alves-2026", "chari-2024", "naqvi-2024", "talvey-eu-smpc"],
    },
    {
      name: "Structured taste screening at every cycle, with tiers",
      differs: "One German myeloma centre proposes brief screening of every patient on talquetamab at each cycle, structured advice for those at low risk, dietitian referral for those at moderate risk, and urgent multidisciplinary review for red flags such as clinically relevant weight loss, dysphagia, aspiration risk, mucositis, dehydration or severely reduced oral intake.",
      evidence: "Fleischer 2026: a single-centre mixed-methods study of 25 patients with new taste change on talquetamab, with the workflow drawn up in interprofessional focus groups. The authors state that it is a proposal for future validation and should not be interpreted as a validated clinical tool. Funding was from foundations; five authors report honoraria or consultancy from Janssen or Johnson & Johnson among other companies.",
      sources: ["fleischer-2026"],
    },
    {
      name: "Photobiomodulation and medicines for nerve pain",
      differs: "Low-level light therapy to the mouth, or medicines used for chronic neuropathic pain, tried for taste change.",
      evidence: "MASCC/ISOO 2025 says some studies suggested that drugs for chronic neuropathic pain may relieve dysgeusia, and that photobiomodulation is an emerging approach for taste disorder after COVID with limited data in people with cancer. Alves 2026 says photobiomodulation has shown benefit in isolated cases of talquetamab-related dysgeusia and requires further validation in controlled studies. The MASCC/ISOO statement on targeted therapy (2024, abstract only) says treatment of taste change primarily revolves around symptom management.",
      sources: ["mascc-immunotherapy-2025", "alves-2026", "mascc-targeted-2024"],
    },
    {
      name: "Tarlatamab: a neurologic toxicity in the US label, a common side effect in the EU",
      differs: "The US label (revised 09/2026) lists dysgeusia first among the most frequent neurologic toxicities (34% in a pooled population of 473 patients) and its Medication Guide puts changes in taste among the signs of neurologic problems to report right away. The EU SmPC lists dysgeusia as a very common adverse reaction (31.3%) under nervous system disorders, and the EU leaflet lists a bad taste in the mouth among very common side effects, not among those to report at once.",
      evidence: "Neither label gives a treatment for taste change or a dose rule specific to it. The US label says to withhold at the first sign of neurologic toxicity, including ICANS, and consider neurology evaluation; its dose-modification table for neurologic toxicity is graded by ICANS, and it does not say how the instruction applies to taste change alone. The EU SmPC's neurological warning and table concern ICANS.",
      sources: ["imdelltra-us-label", "imdylltra-eu-smpc"],
    },
  ],
  grades: [
    { claim: "No predictable way of preventing or treating dysgeusia (systematic review of 26 papers)", grade: "Ungraded conclusion of a systematic review", source: "hovan-2010", quote: "Attempts to prevent dysgeusia through the prophylactic use of zinc sulfate or amifostine have been of limited benefit." },
    { claim: "Exclude a concurrent drug or oral hygiene product", grade: "Ungraded (expert-opinion clinical practice statement)", source: "mascc-immunotherapy-2025" },
    { claim: "A short empirical course of a topical antifungal or antimicrobial may be a strategy to exclude infection", grade: "Ungraded (expert-opinion clinical practice statement)", source: "mascc-immunotherapy-2025" },
    { claim: "Rule out a nutritional deficit; examine thyroid function", grade: "Ungraded (expert-opinion clinical practice statement)", source: "mascc-immunotherapy-2025", quote: "Moreover, thyroid function should be examined to rule out undiagnosed or uncontrolled thyroid diseases." },
    { claim: "Zinc may be a treatment option; response to any treatment may be slow and unpredictable", grade: "Ungraded (expert-opinion clinical practice statement)", source: "mascc-immunotherapy-2025", quote: "However, the response to any of these treatments may be slow, and the treatment outcome is unpredictable." },
    { claim: "Zinc sulfate did not prevent taste alterations during radiotherapy to the oral cavity (phase 3, placebo-controlled)", grade: "Trial result, not a recommendation", source: "halyard-2007", quote: "Zinc sulfate, as prescribed in this trial, did not prevent taste alterations in cancer patients who were undergoing RT to the oral pharynx." },
    { claim: "Zinc did not benefit taste or smell during chemotherapy (randomised, placebo-controlled)", grade: "Trial result, not a recommendation", source: "lyckholm-2012", quote: "Zinc at standard doses did not provide significant benefit to taste or smell in patients receiving chemotherapy." },
    { claim: "Zinc reduced the incidence of radiation-induced dysgeusia but had minimal effect on dysgeusia already present (meta-analysis of three studies)", grade: "Meta-analysis result, not a recommendation", source: "chi-2020", quote: "Our findings indicate that zinc-based therapy reduces the incidence of RID but has a minimal effect on ongoing RID." },
    { claim: "Taste change with chemotherapy is generally reversible", grade: "Ungraded statement in an evidence summary", source: "nci-pdq-oral-hp", quote: "This symptom is generally reversible, and taste sensation returns to normal in the ensuing months." },
    { claim: "Talquetamab, US label: monitor, counsel, supportive care including a nutritionist", grade: "Label instruction", source: "talvey-us-label", quote: "Counsel patients to seek medical attention should signs or symptoms of oral toxicity occur and provide supportive care as per current clinical practice including consultation with a nutritionist." },
    { claim: "Talquetamab, US label: Grade 3 oral toxicity or weight loss", grade: "Label instruction", source: "talvey-us-label", quote: "Withhold TALVEY until resolution to Grade 1 or better and provide supportive care." },
    { claim: "Talquetamab, US label: dysgeusia cannot be graded above 2", grade: "Label footnote", source: "talvey-us-label", quote: "Per CTCAE v4.03, maximum toxicity grade for dysgeusia is 2 and maximum toxicity grade for dry mouth is 3." },
    { claim: "Talquetamab, EU SmPC: interrupt or dose less often", grade: "Label instruction", source: "talvey-eu-smpc", quote: "TALVEY should be interrupted or less frequent dosing should be considered (see section 4.2)." },
    { claim: "Talquetamab, EU SmPC: what supportive care may include", grade: "Label instruction", source: "talvey-eu-smpc", quote: "Supportive care may include saliva stimulating agents, steroid mouth wash, or consultation with a nutritionist." },
    { claim: "Talquetamab: effectiveness of supportive measures appears variable", grade: "Narrative review, ungraded", source: "alves-2026", quote: "Supportive care measures, such as topical corticosteroid or antifungal rinses, zinc or vitamin supplementation, saliva stimulants, hydration, and dietary modifications, have been used to alleviate dysgeusia, although their effectiveness appears variable." },
    { claim: "Tarlatamab, US label: dysgeusia is the most frequent neurologic toxicity", grade: "Label statement", source: "imdelltra-us-label", quote: "The most frequent neurologic toxicities were dysgeusia (34%), headache (17%), peripheral neuropathy (9%), dizziness (9%), and insomnia (8%)." },
  ],
  sources: [
    {
      key: "mascc-immunotherapy-2025",
      label: "MASCC/ISOO Clinical Practice Statement: management of oral complications of immunotherapy",
      publisher: "MASCC/ISOO Oral Care Study Group (Supportive Care in Cancer)",
      year: 2025,
      url: "https://doi.org/10.1007/s00520-025-09806-x",
      doi: "10.1007/s00520-025-09806-x",
      gradingScheme: "No grades: a compilation of expert opinion supported by a literature review, written for use where high-quality evidence is lacking.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "hovan-2010",
      label: "A systematic review of dysgeusia induced by cancer therapies",
      publisher: "MASCC/ISOO Oral Care Study Group, Dysgeusia Section (Supportive Care in Cancer; Hovan et al.)",
      year: 2010,
      url: "https://doi.org/10.1007/s00520-010-0902-1",
      doi: "10.1007/s00520-010-0902-1",
      gradingScheme: "The abstract prints no grades; it says studies were weighted by the quality of their design.",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "mascc-targeted-2024",
      label: "MASCC/ISOO Clinical Practice Statement: Management of oral complications of targeted therapy",
      publisher: "MASCC/ISOO Oral Care Study Group (Supportive Care in Cancer)",
      year: 2024,
      url: "https://doi.org/10.1007/s00520-024-08689-8",
      doi: "10.1007/s00520-024-08689-8",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "talvey-us-label",
      label: "TALVEY (talquetamab-tgvs) injection: US prescribing information and Medication Guide, revised 10/2025",
      publisher: "Janssen Biotech (DailyMed, US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9001355e-003d-4d4e-b4ce-337e0fd14952",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "talvey-eu-smpc",
      label: "Talvey (talquetamab): EU summary of product characteristics and package leaflet (EMA copy; PDF created 20 October 2025)",
      publisher: "European Medicines Agency (marketing authorisation holder Janssen-Cilag International)",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/talvey-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "imdelltra-us-label",
      label: "IMDELLTRA (tarlatamab-dlle): US prescribing information and Medication Guide, revised 09/2026",
      publisher: "Amgen (DailyMed, US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1e7b6163-5d83-42ea-82c9-cf7620cdc782",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "imdylltra-eu-smpc",
      label: "Imdylltra (tarlatamab): EU summary of product characteristics and package leaflet (EMA copy; PDF created 16 April 2026)",
      publisher: "European Medicines Agency (marketing authorisation holder Amgen)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/imdylltra-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "pylarify-us-label",
      label: "PYLARIFY (piflufolastat F-18) injection: US prescribing information (SPL effective 18 February 2026)",
      publisher: "Progenics Pharmaceuticals (DailyMed, US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a00e5cbc-4fd5-4280-82ec-cd3498df4553",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "alves-2026",
      label: "On-target, off-tumor oral toxicities of talquetamab in heavily pretreated multiple myeloma (review)",
      publisher: "Supportive Care in Cancer (Alves et al.; authors declare no competing interests)",
      year: 2026,
      url: "https://doi.org/10.1007/s00520-026-10583-4",
      doi: "10.1007/s00520-026-10583-4",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "fleischer-2026",
      label: "Supportive care for talquetamab-related dysgeusia in multiple myeloma: mixed-methods evidence, nutrition-focused flowchart, and digital companion concept",
      publisher: "Supportive Care in Cancer (Fleischer et al.; foundation funding; five authors report honoraria or consultancy from Janssen or Johnson & Johnson)",
      year: 2026,
      url: "https://doi.org/10.1007/s00520-026-10863-z",
      doi: "10.1007/s00520-026-10863-z",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "naqvi-2024",
      label: "Weight loss and dysgeusia in relapsed/refractory multiple myeloma patients treated with talquetamab",
      publisher: "EJHaem (Naqvi et al.; no funding received; one author reports honoraria from Janssen, Sanofi and Pfizer)",
      year: 2024,
      url: "https://doi.org/10.1002/jha2.971",
      doi: "10.1002/jha2.971",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "chari-2024",
      label: "Clinical Management of Patients With Relapsed/Refractory Multiple Myeloma Treated With Talquetamab (authors include employees of Janssen, the maker of talquetamab; funding statement not read)",
      publisher: "Clinical Lymphoma, Myeloma & Leukemia (Chari et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.clml.2024.05.003",
      doi: "10.1016/j.clml.2024.05.003",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "laheij-2023",
      label: "Characterization of dysgeusia and xerostomia in patients with multiple myeloma treated with the T-cell redirecting GPRC5D bispecific antibody talquetamab",
      publisher: "Supportive Care in Cancer (Laheij et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s00520-023-08233-0",
      doi: "10.1007/s00520-023-08233-0",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "lyckholm-2012",
      label: "A Randomized, Placebo Controlled Trial of Oral Zinc for Chemotherapy-Related Taste and Smell Disorders",
      publisher: "Journal of Pain & Palliative Care Pharmacotherapy (Lyckholm et al.; authors report no conflicts of interest)",
      year: 2012,
      url: "https://doi.org/10.3109/15360288.2012.676618",
      doi: "10.3109/15360288.2012.676618",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "halyard-2007",
      label: "Does zinc sulfate prevent therapy-induced taste alterations in head and neck cancer patients? Results of phase III double-blind, placebo-controlled trial from the North Central Cancer Treatment Group (N01C4)",
      publisher: "International Journal of Radiation Oncology, Biology, Physics (Halyard et al.; US National Cancer Institute grants)",
      year: 2007,
      url: "https://doi.org/10.1016/j.ijrobp.2006.10.046",
      doi: "10.1016/j.ijrobp.2006.10.046",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "chi-2020",
      label: "The effects of zinc on radiation-induced dysgeusia: a systematic review and meta-analysis",
      publisher: "Supportive Care in Cancer (Chi et al.)",
      year: 2020,
      url: "https://doi.org/10.1007/s00520-020-05578-8",
      doi: "10.1007/s00520-020-05578-8",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "braud-2024",
      label: "Pharmacological strategies and nutritional supplements for managing dysgeusia among chemotherapy patients: A systematic review",
      publisher: "Clinical Nutrition ESPEN",
      year: 2024,
      url: "https://doi.org/10.1016/j.clnesp.2024.05.026",
      doi: "10.1016/j.clnesp.2024.05.026",
      gradingScheme: "The abstract says certainty was assessed with the Oxford OCEBM method; it prints no levels.",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "nci-pdq-oral-hp",
      label: "Oral Complications of Cancer Therapies (PDQ), Health Professional Version (updated 16 February 2024)",
      publisher: "US National Cancer Institute",
      year: 2024,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat/oral-complications-hp-pdq",
      gradingScheme: "An evidence summary, not a guideline: it says it does not provide formal recommendations. Some citations carry an NCI level-of-evidence designation; none is attached to the sentences used here.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nci-pdq-nutrition-hp",
      label: "Nutrition in Cancer Care (PDQ), Health Professional Version (updated 20 September 2024)",
      publisher: "US National Cancer Institute",
      year: 2024,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/appetite-loss/nutrition-hp-pdq",
      gradingScheme: "An evidence summary, not a guideline. Some citations carry an NCI level-of-evidence designation; none is attached to the sentences used here.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nci-mouth-throat",
      label: "Mouth and Throat Problems and Cancer Treatment (patient information, reviewed 24 September 2021)",
      publisher: "US National Cancer Institute",
      year: 2021,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nci-nutrition-patient",
      label: "Nutrition During Cancer (patient information, posted 15 October 2024)",
      publisher: "US National Cancer Institute",
      year: 2024,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "cruk-diet-tips",
      label: "Tips for diet problems (patient information, last reviewed 2 November 2023)",
      publisher: "Cancer Research UK",
      year: 2023,
      url: "https://www.cancerresearchuk.org/about-cancer/coping/physically/diet-problems/managing/tips-for-diet-problems",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "macmillan-eating-problems",
      label: "Eating problems and cancer (booklet MAC13613, 4th edition, August 2020)",
      publisher: "Macmillan Cancer Support",
      year: 2020,
      url: "https://www.macmillan.org.uk/dfsmedia/1a6f23537f7f4519bb0cf14c45b2a629/20444-10061/MAC13613_E04_R_eating_problems_and_cancer_20250319",
      read: "full-text",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["talquetamab", "tarlatamab"],
  targets: ["gprc5d"],
  terms: [],
  related: ["nutrition-screening-and-support-during-cancer-treatment", "oral-mucositis-prevention-and-oral-care", "bispecific-step-up-dosing", "dry-mouth-teeth-after-head-neck-radiotherapy"],
  upgrades: [],
  gaps: [
    "No guideline read gives a graded recommendation for taste change during cancer treatment. The MASCC/ISOO clinical practice statement used for the clinical checks is expert opinion, is written for immunotherapy, and says of dysgeusia that how long it lasts and how long taste takes to recover after immunotherapy is stopped remain unclear.",
    "The MASCC/ISOO systematic review of dysgeusia dates from 2010 and was read as an abstract only; a Europe PMC title search on 18 November 2026 found no later MASCC/ISOO review of the subject. The MASCC/ISOO statement on targeted therapy (2024) was also read as an abstract only.",
    "The zinc evidence conflicts and is thin: two placebo-controlled trials with no benefit (one read as an abstract), a meta-analysis of three radiotherapy studies and a systematic review of 12 articles (both abstracts). The meta-analysis prints a risk ratio of 0.72 with a 95% confidence interval of 0.67 to 0.92, given here as printed. The MASCC/ISOO statement that zinc may be an option rests, by its own account, on studies in the general population and is written for immunotherapy. No zinc dose is recommended by any source read; the doses on this page are those the trials used.",
    "The practical food advice (trying different foods, cold foods, plastic cutlery, sharp flavours, marinades) comes from patient information by the NCI, Cancer Research UK and Macmillan. None cites a trial for it. The Cancer Research UK page was due for review on 2 November 2026 and says so; the Macmillan booklet (August 2020) passed its planned review in August 2023 and says its content is being reviewed; the NCI page on mouth and throat problems was reviewed in 2021, and the NCI page on nutrition during cancer was posted on 15 October 2024. On cold food the three do not agree: the NCI and Macmillan suggest it and Cancer Research UK's list says to avoid very cold or hot foods.",
    "Talquetamab: no prospective study has tested a standard approach to its taste change, and the TALISMAN trial of preventive mouthwash and medicines had not reported when the 2026 review was written. The manufacturer-authored management paper (Chari 2024) was read as an abstract only, and the page takes from it one sentence of that abstract (that, on investigator experience, dose modification may be effective for oral events): the journal serves no text to a script and a request to the publisher's text-mining address was refused by this session's permission system. A published correction to Naqvi 2024 could not be read (Europe PMC returned 503, again on a second attempt on 18 November 2026), so that study's figures are as first published.",
    "The talquetamab EU SmPC's date of revision is blank in the EMA copy; the PDF read was created on 20 October 2025. The EU figure of 72% for dysgeusia is a grouped term (ageusia, dysgeusia, hypogeusia and taste disorder, by the SmPC's own footnote), as is the US table's 70%; the US warning's 49% is for dysgeusia as a single term. Neither label explains the two-point difference between 70% and 72%; the EU table is of 339 patients.",
    "Tarlatamab: neither label gives a treatment or a dose rule for taste change. The US label's instruction to withhold at the first sign of neurologic toxicity, including ICANS, sits beside a dose table graded only for ICANS, and the label does not say how it applies to taste change alone; this page therefore gives the monitoring and reporting the label asks for and leaves the dose decision to the prescriber.",
    "Piflufolastat F-18 (a PET tracer given once) lists dysgeusia in 10 of 593 patients (2%) in its US label, with no advice. Nemtabrutinib is investigational and has no label. No source read gives guidance for either, and neither is linked to this protocol. The EU label of piflufolastat F-18 was not read.",
    "ESPEN's practical guideline on clinical nutrition in cancer (2021) could be read only as an abstract, which does not mention taste, and the ESMO cachexia guideline (2021) could not be read in full; whether either addresses taste change is not known from this reading. The CTCAE definitions of the dysgeusia grades were not read; the page gives only what the talquetamab US label says about them.",
    "When to call: for talquetamab the US Medication Guide tells patients to tell their healthcare provider or get medical help right away for changes in sense of taste, and the EU leaflet to tell the doctor or nurse right away; the tarlatamab US Medication Guide says right away for changes in taste. For taste change on other treatments no source read states an urgent threshold; the nearest is the NCI's advice to call about mouth pain that makes it difficult to eat, drink or sleep, or a fever.",
    "Children, and taste loss after head and neck radiotherapy as a long-term effect, are not covered.",
  ],
});
