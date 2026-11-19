import { protocol } from "./helpers";

/*
 * Raised cholesterol and triglycerides on lorlatinib, bexarotene and elacestrant, and weight gain on lorlatinib:
 * the blood tests, when a lipid-lowering medicine is started, which ones the sources name, and when the cancer
 * medicine is paused or reduced. The cognitive and mood effects of lorlatinib are a separate record
 * (cognitive-and-mood-effects-on-lorlatinib-and-avapritinib), written in the same round; neither file links the
 * other in `related` because neither was registered when they were checked. The coordinator adds the two links.
 *
 * What was read, and how (all on 18 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Lorlatinib: the US label (Lorbrena, DailyMed SPL XML, set id 2b34d62d-e02a-4af3-bc0d-1571dd4ee76d, SPL version
 *   dated 26 June 2026, patient information revised January 2026) and the EU product information (Lorviqua, EMA PDF
 *   created 28 April 2026, pdftotext -layout; the PDF prints no revision date).
 * - Bexarotene: the US label (Targretin capsules, DailyMed SPL XML, set id 1d056725-0576-4338-8089-6336e768ccdc,
 *   the version current on DailyMed, listed there 20 July 2026; its SPL effective date is 30 April 2020) and the EU product information (Targretin, EMA PDF created 7 August 2025).
 * - Elacestrant: the US label (Orserdu, DailyMed SPL XML, set id aa66ae5c-2bd2-4444-8178-b55651e054ef, SPL version 9,
 *   document date 24 June 2026, listed on DailyMed 13 July 2026) and the EU product information (Orserdu, EMA PDF created 16 July 2026).
 * - Bauer et al., "Clinical Management of Adverse Events Associated with Lorlatinib" (The Oncologist 2019): full
 *   text from the PubMed Central article page (PMC6693708; the Europe PMC full-text XML returned HTTP 500 twice).
 *   Its tables are images on that page and were not read. Three authors are Pfizer employees; medical writing was
 *   "funded by Pfizer Inc."
 * - Blais et al., "Evaluation and Management of Dyslipidemia in Patients Treated with Lorlatinib" (Current Oncology
 *   2021): Europe PMC full-text XML (PMC7985771). "Funded through an unrestricted grant from Pfizer Canada Inc."
 * - Arriola et al., "Expert Consensus on the Management of Adverse Events of Lorlatinib..." (Clinical Drug
 *   Investigation 2024, a Spanish panel): Europe PMC full-text XML (PMC11338981). "This project was developed with
 *   funding from Pfizer"; medical writing funded by Pfizer. Its figures (the treatment algorithms) are images.
 * - Liu et al., "Kinetics and management of adverse events associated with lorlatinib after 5 years of follow-up in
 *   the CROWN study" (The Oncologist 2025): Europe PMC full-text XML (PMC12557321). "This study was sponsored by
 *   Pfizer"; the first draft was prepared with Pfizer's AI writing tool and medical writing was funded by Pfizer.
 * - Ardizzoni et al., "Lorlatinib atypical safety profile in ALK-positive aNSCLC: tips for management from an Italian
 *   expert panel" (Future Oncology 2026): Europe PMC full-text XML (PMC12867354). Funded by Pfizer; two authors
 *   were Pfizer employees and the other four were paid consultants to Pfizer for the manuscript.
 * - Corrales et al., "Expert recommendations on the management of major and minor toxicities associated with the use
 *   of lorlatinib in Latin America" (Frontiers in Oncology 2026): Europe PMC full-text XML (PMC13746836). "The
 *   consensus was supported by Pfizer, which had no involvement in its content or conclusions."
 * - NICE guideline NG238 (cardiovascular disease: risk assessment and reduction, including lipid modification),
 *   recommendations chapter, HTML stripped to text. General guidance for England, not written for people on cancer
 *   medicines; used only for what it says about very high triglycerides.
 * - A megestrol acetate tablet label (DailyMed SPL XML, set id 2c755c6b-32e9-4029-8b70-855007f7375b), read to see
 *   whether it says what to do about weight gain. It does not, so progestins are in `gaps` and not in `drugs`.
 * - Downloaded and not used: Reed et al., Advances in Therapy 2020 (PMC7467446; advisory board convened by Pfizer,
 *   two Pfizer employees among the authors), which repeats the 2019 paper's scheme.
 * - Not read: Liu et al., "A pragmatic guide for management of adverse events associated with lorlatinib" (Lung
 *   Cancer 2024), not open access in Europe PMC; the 2025 Chinese primary-hospital consensus (in Chinese, not open);
 *   the ESC/EAS dyslipidaemia guideline. Every lorlatinib management paper read was paid for by the drug's maker.
 *
 * Editions checked: the DOIs and titles were confirmed through the Europe PMC search API. A Europe PMC title search
 * for lorlatinib management or consensus papers on 18 November 2026 found the 2026 Italian and Latin American papers
 * as the newest. Quotes are copied from the raw text with line breaks joined and nothing else changed, and were
 * checked by script. US sources spell "hyperlipidemia"; quotes keep it.
 *
 * Second reader, 18 November 2026. An independent reader re-fetched the six labels (the three DailyMed SPL XML files
 * and the three EMA PDFs), the five Europe PMC full texts and the PubMed Central page of the 2019 paper with curl;
 * each converted file was byte-identical to the writer's saved text. The NICE chapter and the megestrol label were
 * read from the writer's copies saved the same day, and the NICE overview page was fetched to confirm the guideline
 * is still the edition published 14 December 2023. The Lorviqua PDF was converted with and without -layout: Table 1
 * reads the same both ways (mild or moderate: introduce or modify lipid-lowering therapy, same dose; severe: same
 * dose without interruption; life-threatening: withhold), so every EU figure on the page stays. DailyMed history
 * confirmed the SPL versions as current (Lorbrena 13, Targretin 16, Orserdu 9) and Crossref confirmed the six DOIs
 * and titles, with no correction or newer edition. 165 claims were checked (2 wrong, 10 unsupported, none unverifiable) and all 38 quotes verified
 * by script. The statements reworded: the patient warning said "bad" pain "with" sickness where the leaflets
 * list the symptoms separately and without a severity; two "do not" orders on gemfibrozil became the sources'
 * "avoid" and "not recommended"; "ask about" pancreatitis symptoms became the leaflet's instruction to report
 * them; "to reduce the risk of pancreatitis" became the labels' "clinical sequelae"; the US label is no longer
 * credited with the EU SmPC's 11.4 mmol/L figure; "names no statin" became "no particular statin" because the EU
 * SmPC lists the class; the Pfizer label was added to the one step that lacked it; and the megestrol quotation now
 * says why it is there. No figure, dose or threshold was found wrong.
 */
export const raisedLipidsAndWeightGainOnLorlatinibBexaroteneAndElacestrant = protocol({
  id: "raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant",
  name: "Raised cholesterol and triglycerides, and weight gain, on lorlatinib, bexarotene and elacestrant",
  aka: [
    "hyperlipidaemia on lorlatinib",
    "hyperlipidemia on lorlatinib",
    "high cholesterol on lorlatinib",
    "high triglycerides on lorlatinib",
    "hypertriglyceridaemia on bexarotene",
    "statins with lorlatinib",
    "weight gain on lorlatinib",
    "dyslipidaemia on elacestrant",
  ],
  domain: "symptom-management",
  tldr: "Lorlatinib raises cholesterol and triglycerides (blood fats) in most people, often within weeks, and about three in ten gain weight. Bexarotene raises triglycerides sharply; elacestrant less often. Blood tests come before and during treatment, and a statin or similar medicine is often added. On lorlatinib or bexarotene, tell your team straight away about tummy or back pain, or being sick.",
  simple: "Some cancer medicines raise the fats in your blood. You cannot feel this, so you have blood tests before you start and while you take the medicine. Most people on lorlatinib need a cholesterol tablet as well. Lorlatinib may also make you hungrier, so weight can go up. On lorlatinib or bexarotene, tummy or back pain, or feeling or being sick, needs a call to your team straight away, because these can be signs of an inflamed pancreas. Your own team's plan comes first.",
  summary: "Lorlatinib: in the US label, grade 3 or 4 rises in total cholesterol occurred in 18% and in triglycerides in 19% of 476 patients, with a median onset of 15 days, and 83% needed a lipid-lowering medicine started (median 17 days); the EU SmPC reports hypercholesterolaemia in 79.0% and hypertriglyceridaemia in 67.5%. Weight gain is listed in 31% (US) and 29.8% (EU). The reader's own team's protocol comes first.\n\nMonitoring differs by label. US label: cholesterol and triglycerides before starting, at 1 and 2 months, then periodically. EU SmPC: before starting, at 2, 4 and 8 weeks, then regularly. Both say to start or increase lipid-lowering treatment; neither names a particular statin (the EU SmPC lists statins only as a class). The US label withholds lorlatinib only at grade 4 (until grade 2 or less, then the same dose; a reduced dose if severe hyperlipidaemia recurs). The EU SmPC prints the thresholds: lorlatinib continues at the same dose up to cholesterol 500 mg/dL (12.92 mmol/L) and triglycerides 1,000 mg/dL (11.4 mmol/L), and is withheld above them.\n\nWhich statin, and when, comes only from expert papers that Pfizer, the maker of lorlatinib, paid for. They prefer pitavastatin, pravastatin or rosuvastatin because of low involvement with CYP3A4, which lorlatinib induces. They disagree on when to start: at the first rise above normal (Bauer 2019, the Italian panel 2026) or by LDL cholesterol of 3.5 mmol/L or more and cardiovascular risk (the Canadian panel, Blais 2021).\n\nBexarotene: fasting lipids before treatment and weekly until the response is established (usually 2 to 4 weeks), then every 8 weeks (US label) or at least monthly (EU SmPC); keep triglycerides below 400 mg/dL (US) or 4.52 mmol/L (EU) to reduce the risk of what both labels call clinical sequelae (the US label points to its pancreatitis warning); both labels advise against gemfibrozil. The EU SmPC contraindicates bexarotene with a history of pancreatitis or uncontrolled lipids; the US label does not list those as contraindications.\n\nElacestrant: the US label asks for a lipid profile before and periodically during treatment (hypercholesterolaemia 30%, hypertriglyceridaemia 27%); the EU SmPC lists the rises as adverse reactions and has no monitoring instruction.\n\nWeight gain on lorlatinib is managed with counselling at the start, diet and exercise, and referral to a nutritionist; the papers differ on dose changes and on GLP-1 medicines, for which they report no or limited data.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage", "community"],
  },
  population: "Adults taking lorlatinib (for ALK-positive lung cancer), bexarotene capsules (for cutaneous T-cell lymphoma) or elacestrant (for breast cancer), whose US and EU labels were read. The expert papers concern lorlatinib only. Not covered: raised lipids on other medicines (for example mTOR inhibitors, hormone treatments, or steroids); weight gain on progestins such as megestrol, for which no instruction was found; swelling from fluid, which has its own page; the cognitive and mood effects of lorlatinib, which have their own page; children.",
  trigger: "Starting one of these medicines (baseline blood lipids, and for lorlatinib a conversation about lipids, appetite and weight), then each scheduled blood test; a raised cholesterol or triglyceride result; weight gain; or abdominal or back pain, nausea or vomiting, which the lorlatinib EU leaflet and the bexarotene US label list as possible signs of pancreatitis.",
  steps: [
    {
      action: "Before lorlatinib starts, tell the person that cholesterol and triglycerides will be checked through treatment and that a lipid-lowering medicine may need to be started or increased",
      why: "The US label says increases in cholesterol and triglycerides can occur, with a median onset of 15 days, and that 83% of patients in its trials needed a lipid-lowering medicine started.",
      source: "us-lorbrena",
      quote: "Inform patients that serum cholesterol and triglycerides will be monitored during treatment. Advise patients that initiation or an increase in the dose of lipid-lowering agents may be required",
    },
    {
      action: "Measure cholesterol and triglycerides before lorlatinib, then on the label's schedule: at 1 and 2 months and periodically (US label), or at 2, 4 and 8 weeks and regularly (EU SmPC)",
      why: "The two labels set different schedules and neither gives a reason for its choice of weeks. The US label gives a median time to onset of 15 days. The Canadian panel (funded by Pfizer Canada) asks for 1, 2 and 3 months and then every 3 months; the Spanish panel (funded by Pfizer) says 2, 4 and 8 weeks and then every 3 to 6 months should be considered.",
      source: "us-lorbrena",
      quote: "Monitor serum cholesterol and triglycerides before initiating LORBRENA, 1 and 2 months after initiating LORBRENA, and periodically thereafter.",
    },
    {
      action: "When lipids rise on lorlatinib, start a lipid-lowering medicine or increase the dose of the one already taken",
      why: "This is the instruction of both labels. The US label does not say at what level. The EU SmPC says to introduce or modify lipid-lowering therapy from mild hypercholesterolaemia (above the upper limit of normal) or mild hypertriglyceridaemia (150 to 300 mg/dL, 1.71 to 3.42 mmol/L), and lists the kinds of medicine it means: an HMG CoA reductase inhibitor (a statin), nicotinic acid, fibric acid derivatives or ethyl esters of omega-3 fatty acids.",
      source: "us-lorbrena",
      quote: "Initiate or increase the dose of lipid-lowering agents in patients with hyperlipidemia.",
    },
    {
      action: "When choosing a statin for someone on lorlatinib, consider pitavastatin, pravastatin or rosuvastatin first",
      why: "The reason the paper gives is that these three have low involvement with the liver enzymes that can interact with lorlatinib, such as CYP3A4. The US label says lorlatinib is a moderate CYP3A inducer and lowers the concentration of CYP3A substrates. The labels themselves name no particular statin. This paper was written with Pfizer employees and Pfizer-funded medical writing.",
      source: "bauer-2019",
      quote: "Pitavastatin, pravastatin, or rosuvastatin should initially be considered based on their low involvement with specific CYP450 enzymes that can interact with lorlatinib (e.g., CYP3A4)",
    },
    {
      action: "If triglycerides stay high on a statin, consider adding a fibrate (the papers name fenofibrate) or fish oils; the papers do not recommend gemfibrozil with a statin",
      why: "The 2019 paper says fenofibrate can be given first because it has the least involvement with the same enzymes. The Spanish panel suggests adding fenofibrate when triglycerides are above 200 mg/dL on a statin, says the combination should be used with caution because of the risk of rhabdomyolysis, and does not recommend gemfibrozil with statins; the 2019 paper says gemfibrozil is not recommended with some statins. Both papers were funded by Pfizer.",
      source: "bauer-2019",
      quote: "The addition of fibrates or fish oils is considered effective in lowering triglyceride levels if treatment beyond statins is required",
    },
    {
      action: "Keep lorlatinib at the same dose for most raised lipid results, and treat the lipids",
      why: "The EU SmPC keeps lorlatinib at the same dose, without interruption, up to and including severe rises (cholesterol 401 to 500 mg/dL, triglycerides 501 to 1,000 mg/dL), while lipid-lowering treatment is started, increased or changed. The US label has a dose rule only for grade 4. The Canadian panel (funded by Pfizer Canada) says the same in the sentence quoted.",
      source: "blais-2021",
      quote: "Lorlatinib dosage should not be modified for most patients who experience hyperlipidemia secondary to treatment.",
    },
    {
      action: "For grade 4 hypercholesterolaemia or hypertriglyceridaemia, withhold lorlatinib until it recovers to grade 2 or less, then resume at the same dose; if severe hyperlipidaemia recurs, resume at a reduced dose",
      why: "This is the US label's rule; it gives no reason and prints no cholesterol or triglyceride figure. The EU SmPC's rule is worded by severity and prints the levels: life-threatening means cholesterol over 500 mg/dL (12.92 mmol/L) or triglycerides over 1,000 mg/dL (11.4 mmol/L); lorlatinib is withheld until the level is moderate or mild, restarted at the same dose while lipid-lowering treatment is maximised, and reduced by one dose level if a severe rise recurs despite maximal treatment. The dose levels are 75 mg and then 50 mg once daily in both labels.",
      source: "us-lorbrena",
      quote: "Withhold LORBRENA until recovery of hypercholesterolemia and/or hypertriglyceridemia to less than or equal to Grade 2. Resume LORBRENA at the same dose.",
    },
    {
      action: "On lorlatinib, keep pancreatitis in mind: check lipase and amylase before treatment and regularly as clinically indicated (EU SmPC), and tell the person to report back or abdominal pain, yellowing of the skin or eyes, nausea or vomiting straight away (EU leaflet)",
      why: "The EU SmPC says the risk of pancreatitis should be considered because of the raised triglycerides and possibly an effect of the medicine itself. Its patient leaflet tells people to tell their doctor immediately about pain in the back or abdomen, yellowing of the skin and eyes, nausea or vomiting. The US label has no pancreatitis warning; it lists raised lipase and amylase among laboratory abnormalities.",
      source: "ema-lorviqua",
      quote: "Risk of pancreatitis should be considered in patients receiving lorlatinib due to concomitant hypertriglyceridemia and/or a potential intrinsic mechanism.",
    },
    {
      action: "If lipid targets are not met on an optimised statin dose, consider referral to a lipid specialist",
      why: "The Canadian panel (funded by Pfizer Canada) offers a second medicine such as ezetimibe or fenofibrate as the alternative to referral. The Italian panel (funded by Pfizer) recommends referral to a cardiovascular or lipid specialist for statin intolerance or an insufficient response to maximal treatment.",
      source: "blais-2021",
      quote: "If lipid targets are not met with an optimized dose of statin therapy, referral to a lipid specialist should be considered.",
    },
    {
      action: "On bexarotene, measure fasting lipids before treatment, weekly until the lipid response is established, then every 8 weeks (US label) or at least monthly (EU SmPC)",
      why: "The US label says bexarotene induces substantial rises in lipids in most patients, and that the response is usually established within 2 to 4 weeks. Both labels say fasting triglycerides should be normal, or brought to normal, before treatment starts.",
      source: "us-targretin",
      quote: "Perform fasting blood lipid determinations before TARGRETIN therapy is initiated and weekly until the lipid response to TARGRETIN is established, which usually occurs within 2 to 4 weeks, and monitor at 8-week intervals thereafter.",
    },
    {
      action: "On bexarotene, if fasting triglycerides are or become raised, start lipid-lowering treatment and, if necessary, reduce or interrupt the dose",
      why: "The US label says to keep triglycerides below 400 mg/dL to reduce the risk of clinical consequences, pointing to its pancreatitis warning; the EU SmPC gives the same limit as 4.52 mmol/L and says every attempt should be made to stay below it. The EU SmPC gives the dose steps (300 to 200 and, if necessary, 100 mg per square metre a day) or stopping treatment.",
      source: "us-targretin",
      quote: "If fasting triglycerides are elevated or become elevated during treatment, institute antilipemic therapy, and if necessary, reduce or interrupt the dose of TARGRETIN.",
    },
    {
      action: "Avoid gemfibrozil with bexarotene",
      why: "Both labels say gemfibrozil raised the blood level of bexarotene. The US label says to avoid it in its warning and that the combination is not recommended in its interactions section; the EU SmPC says the combination is not recommended. The US label adds that atorvastatin did not change bexarotene levels, and that bexarotene halved the exposure to atorvastatin.",
      source: "us-targretin",
      quote: "Because of a potential drug-drug interaction, avoid gemfibrozil use with TARGRETIN",
    },
    {
      action: "On bexarotene, if pancreatitis is suspected, interrupt bexarotene and evaluate",
      why: "The US label reports acute pancreatitis, including a fatal case, associated with marked rises in fasting triglycerides, the lowest being 770 mg/dL. It tells patients to contact their healthcare provider immediately about nausea, vomiting and abdominal or back pain. The EU SmPC goes further at the start: a history of pancreatitis and uncontrolled raised cholesterol or triglycerides are contraindications.",
      source: "us-targretin",
      quote: "Interrupt TARGRETIN and evaluate if pancreatitis is suspected.",
    },
    {
      action: "On elacestrant, check a lipid profile before starting and periodically during treatment (US label)",
      why: "The US label reports hypercholesterolaemia in 30% and hypertriglyceridaemia in 27% of patients, with grade 3 and 4 in 0.9% and 2.2%. It does not say how often to test or what to do with a raised result. The EU SmPC lists raised triglycerides and cholesterol among the most common adverse reactions and has no monitoring instruction.",
      source: "us-orserdu",
      quote: "Monitor lipid profile prior to starting and periodically while taking ORSERDU.",
    },
    {
      action: "When lorlatinib starts, tell the person and those who care for them that weight gain is possible and that the medicine appears to stimulate appetite",
      why: "The paper says it is difficult to lose weight in the face of appetite stimulation, and recommends a preventive approach with food intake counselling, dietary advice and exercise. In the CROWN trial weight gain occurred in 44% of patients over 5 years and was grade 3 in 23%. The paper was sponsored by Pfizer.",
      source: "crown-ae-2025",
      quote: "Patients and care partners should be counseled at lorlatinib initiation about the possibility of weight gain as an AE and that lorlatinib appears to stimulate appetite.",
    },
    {
      action: "If diet and exercise are not enough for weight gain on lorlatinib, consider referral to a nutritionist or weight clinic; where there is swelling as well, manage the swelling first",
      why: "The Spanish panel (funded by Pfizer) says there is no specific medical treatment for this weight gain, recommends exercise and restriction of food intake, and says that if weight gain is associated with oedema the oedema should be managed first. It says interrupting or reducing lorlatinib is not usually needed. The sentence quoted is from the CROWN paper, which Pfizer sponsored.",
      source: "crown-ae-2025",
      quote: "For patients in whom lifestyle modification does not appear to be sufficient, consider referral to a nutritionist or weight clinic for added patient support.",
    },
  ],
  bestInClass: {
    statement: "No guideline with graded recommendations covers this. The firmest rules are the labels': baseline and scheduled lipid tests, lipid-lowering treatment started or increased when lipids rise, and lorlatinib withheld only at grade 4 in the US label, which the EU SmPC calls life-threatening and prints as cholesterol over 500 mg/dL or triglycerides over 1,000 mg/dL; for bexarotene, weekly fasting lipids at the start, triglycerides kept below 400 mg/dL (US) or 4.52 mmol/L (EU), gemfibrozil avoided, and, in the US label, interruption if pancreatitis is suspected. Everything about which statin to use with lorlatinib, when to start it and how to manage weight comes from expert papers that Pfizer, the maker of lorlatinib, funded, and they do not agree. On starting: the 2019 investigators' paper and the 2026 Italian panel say at the first rise above normal; the 2021 Canadian panel says total cholesterol is not a criterion and uses LDL cholesterol of 3.5 mmol/L or more, non-HDL cholesterol of 4.3 mmol/L or more, or triglycerides above 5.7 mmol/L. On the statin: pitavastatin, pravastatin or rosuvastatin (2019 paper, Spanish and Italian panels), rosuvastatin or pravastatin (Canadian panel), rosuvastatin (Latin American panel, where the other two are often unavailable); the CROWN paper lists pravastatin among the recommended statins and in the next sentences says it should be used with caution. Both positions are shown; this page does not choose.",
    sources: ["us-lorbrena", "ema-lorviqua", "us-targretin", "ema-targretin", "us-orserdu", "ema-orserdu", "bauer-2019", "blais-2021", "arriola-2024", "crown-ae-2025", "italy-2026", "latam-2026"],
  },
  variants: [
    {
      name: "Lorlatinib lipid testing schedule: US label, EU SmPC and the expert panels",
      differs: "US label: before starting, at 1 and 2 months, then periodically. EU SmPC: before starting, at 2, 4 and 8 weeks, then regularly. Canadian panel (Blais 2021): a complete lipid profile at baseline, at 1, 2 and 3 months, then every 3 months; fasting is not needed unless triglycerides are above 4.5 mmol/L. Spanish panel (Arriola 2024): 2, 4 and 8 weeks and every 3 to 6 months should be considered.",
      evidence: "Regulatory labels, and expert opinion in papers funded by Pfizer. None gives trial evidence for one schedule over another. The EU SmPC notes that severe rises come later than first rises: a median of 201 days for cholesterol and 127 days for triglycerides.",
      sources: ["us-lorbrena", "ema-lorviqua", "blais-2021", "arriola-2024"],
    },
    {
      name: "When to start a statin on lorlatinib",
      differs: "Bauer 2019: a statin is recommended at the first sign of raised cholesterol or triglycerides. Italian panel 2026: statins should be started as soon as lipids reach grade 1 (total cholesterol above the upper limit of normal, or triglycerides at or above 150 mg/dL). Canadian panel 2021: total cholesterol is not recommended as a criterion; start for LDL cholesterol of 3.5 mmol/L or more, non-HDL cholesterol of 4.3 mmol/L or more, or triglycerides above 5.7 mmol/L, and treat everyone with a statin-indicated condition (stroke, heart attack, diabetes and others). Latin American panel 2026: start, or modify, lipid-lowering treatment for mild or moderate rises, as the EU SmPC does.",
      evidence: "Expert opinion, all in Pfizer-funded papers. The Canadian panel bases its thresholds on the Canadian Cardiovascular Society guideline for the general population and argues that people with ALK-positive lung cancer live long enough to be treated as people without cancer are.",
      sources: ["bauer-2019", "italy-2026", "blais-2021", "latam-2026", "ema-lorviqua"],
    },
    {
      name: "Which statin with lorlatinib",
      differs: "Bauer 2019, the Spanish panel and the Italian panel: pitavastatin, pravastatin or rosuvastatin. Canadian panel: rosuvastatin or pravastatin first line (pravastatin 20 mg or rosuvastatin 5 mg once daily for primary prevention; pravastatin 40 mg or rosuvastatin 20 to 40 mg for secondary prevention), with people already on another statin switched to an equivalent dose. Latin American panel: rosuvastatin, because pitavastatin and pravastatin are not available in many of its countries. CROWN paper: pitavastatin, pravastatin and rosuvastatin are the recommended statins, but it also says that pitavastatin and rosuvastatin could be used in the trial without dose adjustment, that pravastatin, fluvastatin and atorvastatin should be used with caution and may need dose adjustment, and that lovastatin and simvastatin are not recommended. In CROWN itself the commonest lipid medicines were rosuvastatin (55%), atorvastatin (19%) and fenofibrate (11%).",
      evidence: "A reasoned choice from how each statin is metabolised, not from a trial comparing statins in people on lorlatinib. All papers were funded by Pfizer. Neither label names a particular statin.",
      sources: ["bauer-2019", "arriola-2024", "italy-2026", "blais-2021", "latam-2026", "crown-ae-2025"],
    },
    {
      name: "When lorlatinib is paused for lipids, and when it restarts",
      differs: "US label: withhold at grade 4 until grade 2 or less; same dose; reduced dose if severe hyperlipidaemia recurs. EU SmPC: withhold above cholesterol 500 mg/dL or triglycerides 1,000 mg/dL until moderate or mild; same dose with maximal lipid-lowering treatment; one dose level lower if a severe rise recurs despite it. Canadian panel: clinicians may consider withholding at grade 4, and may consider a dose reduction if it recurs despite optimal treatment. CROWN paper: for severely raised lipids, pause lorlatinib until total cholesterol is below 400 mg/dL and triglycerides below 500 mg/dL, then resume at the same dose.",
      evidence: "Regulatory labels and expert opinion. In the US label's trials about 4% and 7% of patients needed a temporary stop, and 1% and 3% a dose reduction, for cholesterol and triglycerides.",
      sources: ["us-lorbrena", "ema-lorviqua", "blais-2021", "crown-ae-2025"],
    },
    {
      name: "Bexarotene: US label against EU SmPC",
      differs: "Testing after the lipid response is established: every 8 weeks (US) or at intervals no less than monthly (EU). Triglyceride ceiling: 400 mg/dL (US) or 4.52 mmol/L (EU). Contraindications: the EU SmPC lists a history of pancreatitis, uncontrolled hypercholesterolaemia and uncontrolled hypertriglyceridaemia; the US label does not, and instead says people with risk factors for pancreatitis may be at greater risk. The EU SmPC says people with CTCL who have risk factors for pancreatitis should not be treated unless the potential benefit outweighs the risk, and that raised cholesterol should be managed according to current medical practice. Gemfibrozil: the US label says to avoid it in its hyperlipidaemia warning and that it is not recommended in its interactions section; the EU SmPC says it is not recommended. Pancreatitis: the US label says to interrupt bexarotene and evaluate if it is suspected; the EU SmPC has no matching sentence.",
      evidence: "Regulatory labels. The US label reports that in the 300 mg per square metre group 60% of patients were given lipid-lowering medicines and that atorvastatin was used in 48% of patients with CTCL.",
      sources: ["us-targretin", "ema-targretin"],
    },
    {
      name: "Elacestrant: US label against EU SmPC",
      differs: "The US label has a dyslipidaemia warning and asks for a lipid profile before and periodically during treatment. The EU SmPC has no such warning or instruction; it lists raised triglycerides and cholesterol among the most common adverse reactions. Neither has a dose rule written for lipids: each has a general table by grade. On rosuvastatin, the EU SmPC reports that elacestrant raised its exposure (45% for peak level, 23% for overall exposure) and says the dose of medicines carried by BCRP should be reduced according to their own product information; the US label says to reduce such medicines when small changes in level may lead to serious reactions.",
      evidence: "Regulatory labels; no management paper for elacestrant lipid changes was looked for beyond them.",
      sources: ["us-orserdu", "ema-orserdu"],
    },
    {
      name: "Weight gain on lorlatinib: dose changes and GLP-1 medicines",
      differs: "Dose: Bauer 2019 says dose modifications should be applied in more severe cases of weight gain; the Spanish panel says interruption or reduction is not usually needed; the Italian panel says a gain of 20% or more may warrant management and that dose reduction is generally not advised unless lifestyle changes fail to relieve weight-related discomfort; the Latin American panel says temporary interruption may be considered for progressive, clinically significant gain (for example more than 20%). GLP-1 medicines: the Spanish panel says there are no data on semaglutide or other incretins for lorlatinib weight gain; the CROWN paper says data are limited; the Italian panel says they may be used upon expert approval with monitoring; the Latin American panel says they may be contemplated, with referral to an endocrinologist advised.",
      evidence: "Expert opinion in Pfizer-funded papers. In CROWN, 95% of grade 2 or 3 weight gain events had no dose change or medicine, and of the 52 patients with no medical intervention 35% had resolution and 49% no resolution.",
      sources: ["bauer-2019", "arriola-2024", "italy-2026", "latam-2026", "crown-ae-2025"],
    },
    {
      name: "Very high triglycerides in general (not oncology) guidance for England",
      differs: "NICE NG238, written for the general population and not for people on cancer medicines, says to refer for urgent specialist review when triglycerides are above 20 mmol/L and not explained by alcohol or poor diabetic control, and for 10 to 20 mmol/L to repeat a fasting test (after 5 days, within 2 weeks) and seek specialist advice if the level stays above 10 mmol/L. The EU SmPC for lorlatinib acts on a different figure (11.4 mmol/L) and by pausing the cancer medicine; the US label prints no figure.",
      evidence: "NICE recommendations dated 2014 within the 2023 guideline; NICE does not grade its recommendations.",
      sources: ["nice-ng238", "ema-lorviqua"],
    },
  ],
  grades: [
    { claim: "Lorlatinib, EU SmPC: lipids before starting, at 2, 4 and 8 weeks, and regularly", grade: "Regulatory label; not graded", source: "ema-lorviqua", quote: "cholesterol and triglycerides should be monitored before initiation of lorlatinib; 2, 4 and 8 weeks after initiating lorlatinib; and regularly thereafter." },
    { claim: "Lorlatinib, EU SmPC: what counts as lipid-lowering therapy", grade: "Regulatory label; not graded", source: "ema-lorviqua", quote: "Lipid-lowering therapy may include: HMG CoA reductase inhibitor, nicotinic acid, fibric acid derivatives, or ethyl esters of omega-3 fatty acids." },
    { claim: "Lorlatinib, US label: 83% needed a lipid-lowering medicine started", grade: "Regulatory label; not graded", source: "us-lorbrena", quote: "Eighty-three percent of patients required initiation of lipid-lowering medications, with a median time to onset of start of such medications of 17 days." },
    { claim: "Lorlatinib, US label: reduced dose if severe hyperlipidaemia recurs", grade: "Regulatory label; not graded", source: "us-lorbrena", quote: "If severe hypercholesterolemia and/or hypertriglyceridemia recurs, resume LORBRENA at a reduced dose." },
    { claim: "Lorlatinib induces CYP3A, lowering levels of medicines that CYP3A clears", grade: "Regulatory label; not graded", source: "us-lorbrena", quote: "LORBRENA is a moderate CYP3A inducer. Concomitant use of LORBRENA decreases the concentration of CYP3A substrates" },
    { claim: "Canadian panel: rosuvastatin and pravastatin first line", grade: "Expert panel algorithm; not graded (funded by an unrestricted grant from Pfizer Canada)", source: "blais-2021", quote: "rosuvastatin and pravastatin are recommended as first-line lipid-lowering therapy in patients treated with lorlatinib" },
    { claim: "Canadian panel: total cholesterol is not a criterion for starting", grade: "Expert panel algorithm; not graded (funded by an unrestricted grant from Pfizer Canada)", source: "blais-2021", quote: "TC itself is not recommended as a criterion for the initiation of a lipid-lowering therapy according to the CCS and other current guidelines" },
    { claim: "Canadian panel: withholding at grade 4 is something clinicians may consider", grade: "Expert panel algorithm; not graded (funded by an unrestricted grant from Pfizer Canada)", source: "blais-2021", quote: "Clinicians may consider temporarily withholding lorlatinib therapy in patients who experience grade 4 hyperlipidemia" },
    { claim: "Spanish panel: statins whose metabolism lorlatinib does not affect", grade: "Expert consensus; not graded (funded by Pfizer)", source: "arriola-2024", quote: "the statins pitavastatin, pravastatin, and rosuvastatin have a very low risk of interaction with the cytochrome P450 (CYP) enzymes involved in the metabolism of lorlatinib" },
    { claim: "Spanish panel: gemfibrozil with statins is not recommended", grade: "Expert consensus; not graded (funded by Pfizer)", source: "arriola-2024", quote: "The use of gemfibrozil in combination with statins is not recommended due to the risk of hepatic and renal toxicity" },
    { claim: "Spanish panel: no specific medical treatment for lorlatinib weight gain; exercise and restriction of food intake", grade: "Expert consensus; not graded (funded by Pfizer)", source: "arriola-2024", quote: "Although there is no specific medical treatment for this weight gain, physical exercise and restriction of food intake are recommended" },
    { claim: "Spanish panel: manage oedema first when it accompanies weight gain", grade: "Expert consensus; not graded (funded by Pfizer)", source: "arriola-2024", quote: "If weight gain is associated with edema, treatment of the edema should be managed first." },
    { claim: "Italian panel: start statins at grade 1", grade: "Expert panel; not graded (funded by Pfizer; two authors Pfizer employees)", source: "italy-2026", quote: "Treatment with statins should be started as soon as lipid levels reach grade 1 toxicity" },
    { claim: "Italian panel: dose reduction for weight gain is generally not advised", grade: "Expert panel; not graded (funded by Pfizer; two authors Pfizer employees)", source: "italy-2026", quote: "Lorlatinib dose reduction is generally not advised unless lifestyle changes fail to alleviate weight-related discomfort." },
    { claim: "CROWN paper: pravastatin, fluvastatin and atorvastatin with caution", grade: "Trial report with expert commentary; not graded (sponsored by Pfizer)", source: "crown-ae-2025", quote: "Pravastatin, fluvastatin, and atorvastatin should be used with caution during lorlatinib treatment, and dose adjustment of these statins may be necessary." },
    { claim: "Latin American panel: rosuvastatin first line", grade: "Delphi consensus; not graded (supported by Pfizer)", source: "latam-2026", quote: "Patients with hyperlipidemia should be treated with rosuvastatin as a first-line therapy (pitavastatin and pravastatin are not available in many Latinoamerican countries)." },
    { claim: "Bexarotene, EU SmPC: triglycerides below 4.52 mmol/l", grade: "Regulatory label; not graded", source: "ema-targretin", quote: "Every attempt should be made to maintain triglyceride levels below 4.52 mmol/l in order to reduce the risk of clinical sequelae." },
    { claim: "Bexarotene, US label: triglycerides below 400 mg/dL", grade: "Regulatory label; not graded", source: "us-targretin", quote: "Maintain triglyceride levels below 400 mg/dL to reduce the risk of clinical sequelae" },
    { claim: "Bexarotene, EU SmPC: gemfibrozil is not recommended", grade: "Regulatory label; not graded", source: "ema-targretin", quote: "concomitant administration of gemfibrozil with bexarotene is not recommended (see section 4.5)." },
    { claim: "Elacestrant, EU SmPC: reduce the dose of medicines carried by BCRP, such as rosuvastatin", grade: "Regulatory label; not graded", source: "ema-orserdu", quote: "BCRP substrates should be reduced according to their Summary of Product Characteristics." },
    { claim: "General guidance for England: urgent specialist review above 20 mmol/L", grade: "NICE does not grade recommendations", source: "nice-ng238", quote: "Refer for urgent specialist review if a person has a triglyceride level of more than 20 mmol per litre that is not a result of excess alcohol intake or poor glycaemic control." },
    { claim: "Megestrol tablets, which are not one of this page's medicines: the label was read to see whether weight gain on progestins could be covered here. It says weight gain is frequent and gives no instruction for it, so progestins are left out", grade: "Regulatory label; not graded", source: "us-megestrol-tablet", quote: "Weight gain is a frequent side effect of megestrol. This gain has been associated with increased appetite and is not necessarily associated with fluid retention." },
  ],
  sources: [
    { key: "us-lorbrena", label: "Lorbrena (lorlatinib) tablets: US prescribing information and patient information", publisher: "Pfizer, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2b34d62d-e02a-4af3-bc0d-1571dd4ee76d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-lorviqua", label: "Lorviqua (lorlatinib): EU summary of product characteristics and package leaflet", publisher: "European Medicines Agency (marketing authorisation holder Pfizer)", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/lorviqua-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-targretin", label: "Targretin (bexarotene) capsules: US prescribing information and patient information", publisher: "Bausch Health US, on DailyMed (US National Library of Medicine); SPL effective date 30 April 2020, current on DailyMed in November 2026", year: 2020, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1d056725-0576-4338-8089-6336e768ccdc", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-targretin", label: "Targretin (bexarotene): EU summary of product characteristics and package leaflet", publisher: "European Medicines Agency", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/targretin-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-orserdu", label: "Orserdu (elacestrant) tablets: US prescribing information", publisher: "Stemline Therapeutics, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aa66ae5c-2bd2-4444-8178-b55651e054ef", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "ema-orserdu", label: "Orserdu (elacestrant): EU summary of product characteristics and package leaflet", publisher: "European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/orserdu-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    {
      key: "bauer-2019",
      label: "Clinical Management of Adverse Events Associated with Lorlatinib (written with Pfizer employees; medical writing funded by Pfizer)",
      publisher: "The Oncologist (Bauer et al.; phase I investigators with three Pfizer employees among the authors; medical writing funded by Pfizer Inc.)",
      year: 2019,
      url: "https://doi.org/10.1634/theoncologist.2018-0380",
      doi: "10.1634/theoncologist.2018-0380",
      gradingScheme: "Expert consensus opinion of trial investigators; no levels of evidence or grades are printed.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "blais-2021",
      label: "Evaluation and Management of Dyslipidemia in Patients Treated with Lorlatinib (funded by Pfizer Canada)",
      publisher: "Current Oncology (Blais et al.; a Canadian advisory committee; funded through an unrestricted grant from Pfizer Canada Inc.)",
      year: 2021,
      url: "https://doi.org/10.3390/curroncol28010029",
      doi: "10.3390/curroncol28010029",
      gradingScheme: "An expert panel's algorithm aligned with the Canadian Cardiovascular Society guideline; no grades are printed.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "arriola-2024",
      label: "Expert Consensus on the Management of Adverse Events of Lorlatinib in the Treatment of ALK+ Advanced Non-small Cell Lung Cancer (funded by Pfizer)",
      publisher: "Clinical Drug Investigation (Arriola et al.; a Spanish multidisciplinary panel; project and medical writing funded by Pfizer)",
      year: 2024,
      url: "https://doi.org/10.1007/s40261-024-01379-7",
      doi: "10.1007/s40261-024-01379-7",
      gradingScheme: "Expert consensus from clinical experience; no levels of evidence or grades are printed.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "crown-ae-2025",
      label: "Kinetics and management of adverse events associated with lorlatinib after 5 years of follow-up in the CROWN study (sponsored by Pfizer)",
      publisher: "The Oncologist (Liu et al.; study sponsored by Pfizer; first draft prepared with Pfizer's AI writing tool; medical writing funded by Pfizer)",
      year: 2025,
      url: "https://doi.org/10.1093/oncolo/oyaf287",
      doi: "10.1093/oncolo/oyaf287",
      gradingScheme: "Post hoc safety analysis of a randomised trial with the authors' management advice; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "italy-2026",
      label: "Lorlatinib atypical safety profile in ALK-positive aNSCLC: tips for management from an Italian expert panel (funded by Pfizer)",
      publisher: "Future Oncology (Ardizzoni et al.; funded by Pfizer; two authors Pfizer employees, the other four paid consultants to Pfizer for the manuscript)",
      year: 2026,
      url: "https://doi.org/10.1080/14796694.2025.2612605",
      doi: "10.1080/14796694.2025.2612605",
      gradingScheme: "Narrative review with an expert panel's advice; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "latam-2026",
      label: "Expert recommendations on the management of major and minor toxicities associated with the use of lorlatinib in Latin America (supported by Pfizer)",
      publisher: "Frontiers in Oncology (Corrales et al.; consensus supported by Pfizer, which the paper says had no involvement in its content or conclusions)",
      year: 2026,
      url: "https://doi.org/10.3389/fonc.2026.1740218",
      doi: "10.3389/fonc.2026.1740218",
      gradingScheme: "Delphi consensus of an expert panel; no levels of evidence or grades are printed.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    { key: "nice-ng238", label: "Cardiovascular disease: risk assessment and reduction, including lipid modification (NG238), recommendations", publisher: "National Institute for Health and Care Excellence (general guidance for England; not oncology guidance)", year: 2023, url: "https://www.nice.org.uk/guidance/ng238/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording (offer, consider) carries the strength.", read: "full-text", accessed: "2026-11-18" },
    { key: "us-megestrol-tablet", label: "Megestrol acetate tablets: US prescribing information", publisher: "Major Pharmaceuticals, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2c755c6b-32e9-4029-8b70-855007f7375b", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
  ],
  drugs: ["lorlatinib", "bexarotene", "elacestrant"],
  terms: ["ctcae-grading", "dose-modification"],
  related: [
    "fluid-retention-and-effusions-on-kinase-inhibitors",
    "diet-alcohol-and-weight-during-cancer-treatment",
    "hyperglycaemia-on-pi3k-akt-mtor-inhibitors",
    "anticancer-drug-interaction-review",
    "cardio-oncology-risk-assessment-and-cardiac-surveillance",
    "cognitive-and-mood-effects-on-lorlatinib-and-avapritinib",
  ],
  upgrades: [],
  gaps: [
    "No graded guideline on raised lipids from lorlatinib, bexarotene or elacestrant was found. Every lorlatinib management paper read on 18 November 2026 was funded by Pfizer, the maker of lorlatinib, and several were written with Pfizer employees or Pfizer-funded medical writers. No independent guidance on which statin to use, or when to start, was found.",
    "No trial comparing statins, or comparing a start at the first raised result with a start by LDL cholesterol and cardiovascular risk, in people taking lorlatinib was cited by any source read. Whether treating these lipid rises prevents heart attacks or strokes in this group is not shown: the CROWN paper reports no increase in cardiovascular events against crizotinib at 5 years and suggests, without proof, that close management may explain it.",
    "The tables of the 2019 paper and the treatment algorithms of the Spanish panel are images and were not read; only the running text of those papers is used here, and nothing on this page rests on a table or figure of either.",
    "Not read: the 2024 'pragmatic guide' to lorlatinib adverse events (Liu et al., Lung Cancer), which the CROWN paper leans on and for which Europe PMC still listed no open copy on 18 November 2026; the 2025 Chinese primary-hospital consensus; the 2022 Chinese expert consensus (in Chinese); the 2021 Portuguese position paper (Drug Safety, not open); two open reviews, in the Journal of the Advanced Practitioner in Oncology (2025) and OncoTargets and Therapy (2023), which were found in a Europe PMC search on 18 November 2026 and not read; the ESC/EAS dyslipidaemia guideline. NICE NG238 is general guidance for England and says nothing about cancer medicines.",
    "How often 'periodically' or 'regularly' means for lorlatinib after the first two months, and for elacestrant at any time, is not stated by the labels. The elacestrant labels say nothing on what to do with a raised result, and no management paper for elacestrant was read.",
    "Bexarotene: only the two labels were read. The UK cutaneous lymphoma consensus on prescribing bexarotene, and any guidance on giving a fibrate or statin before the first dose, were not read, so the page does not say whether lipid-lowering treatment should be started in advance.",
    "Weight gain on lorlatinib: no label gives an instruction. The advice here is expert opinion from Pfizer-funded papers, which report no data (Spanish panel) or limited data (CROWN paper) on semaglutide and similar medicines for this weight gain. No source read sets how often to weigh.",
    "Weight gain on progestins (megestrol acetate, medroxyprogesterone, the levonorgestrel intrauterine system): the megestrol tablet label read says weight gain is frequent and associated with increased appetite, and gives no instruction. The medroxyprogesterone and levonorgestrel labels were not read. Progestins are therefore not among this protocol's drugs.",
    "When a patient should call: the EU leaflet for lorlatinib says to tell the doctor immediately about back or abdominal pain, jaundice, nausea or vomiting as possible signs of pancreatitis, and the US bexarotene patient information says to tell the healthcare provider right away about signs of pancreatitis. The US lorlatinib patient information has no pancreatitis warning. No patient-facing source read gives an urgent threshold for raised lipids themselves, or for weight gain, or for elacestrant.",
    "Lorlatinib also raises blood sugar and blood pressure; those are outside this page.",
  ],
});
