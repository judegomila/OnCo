import { protocol } from "./helpers";

/*
 * Joint pain, muscle pain, muscle cramps and a raised creatine kinase caused by anticancer drugs in adults:
 * aromatase inhibitor joint pain, the aches that follow paclitaxel, joint pain on ibrutinib and on the BRAF
 * inhibitors, muscle cramps on imatinib, and the creatine kinase rules of the MEK inhibitors.
 *
 * Written 18 November 2026. Everything below was fetched that day with curl into a scratch directory and read as
 * raw text (HTML and SPL XML stripped of tags by script, PDFs through pdftotext -layout). Nothing was read through
 * a summarising tool.
 *
 * Read in full text:
 * - Cochrane reviews CD012988.pub2 (exercise, 2020) and CD013167.pub2 (systemic therapies, 2022) on aromatase
 *   inhibitor-induced musculoskeletal symptoms: PMC HTML (PMC6987034, PMC8743877). Crossref has no pub3 of either.
 * - SWOG S1202, duloxetine against placebo (Henry et al., J Clin Oncol 2018): PMC5805479. Funded by the US
 *   National Cancer Institute "and in part by Lilly USA", the maker of duloxetine.
 * - SWOG S1200, acupuncture (Hershman et al., JAMA 2018): PMC6583520, with its PubMed abstract appended to the
 *   same text file. Funded by the US National Institutes of Health.
 * - The ELPh switching analysis (Henry et al., J Clin Oncol 2012): PMC3341106. Its support statement includes
 *   grants from Pfizer and Novartis Pharma AG, the makers of the two drugs compared.
 * - NCCTG N08C1, the natural history of the paclitaxel acute pain syndrome (Loprinzi et al., J Clin Oncol 2011):
 *   PMC3082985. Public Health Service grants.
 * - Lipsky and Lamanna, "Managing toxicities of Bruton tyrosine kinase inhibitors" (Hematology Am Soc Hematol Educ
 *   Program 2020): PMC7727553. Stephens and Byrd, "How I manage ibrutinib intolerance and complications in
 *   patients with chronic lymphocytic leukemia" (Blood 2019): PMC6428663. Rhodes et al., ibrutinib-associated
 *   arthralgias/myalgias (Clin Lymphoma Myeloma Leuk 2020): PMC7305967. None was funded by a manufacturer; authors
 *   of all three declare research funding or advisory roles with the makers of BTK inhibitors.
 * - European LeukemiaNet recommendations on adverse events of treatment in chronic myeloid leukaemia (Steegmann et
 *   al., Leukemia 2016): Europe PMC full-text XML (PMC4991363). No newer edition was found by the earlier round
 *   that cites it in the fluid retention protocol, and none was looked for again here.
 * - NCI PDQ Cancer Pain, health professional version (page dated 24 April 2025): cancer.gov HTML.
 * - Macmillan Cancer Support "Letrozole" (reviewed 1 January 2025), NHS "Side effects of letrozole" (reviewed 24
 *   November 2023) and "Side effects of anastrozole" (reviewed 6 March 2024), Cancer Research UK "Paclitaxel"
 *   (reviewed 30 July 2025): the public pages.
 * - US labels, each the current DailyMed SPL XML (version date in brackets): ibrutinib (21 October 2025),
 *   letrozole (11 June 2026), anastrozole (2 March 2026), exemestane (24 December 2025), paclitaxel, Hospira (2
 *   July 2026), nab-paclitaxel (31 October 2022), vemurafenib (28 August 2026), encorafenib (26 February 2026),
 *   binimetinib (20 March 2025), cobimetinib (29 July 2026), avutometinib with defactinib (1 May 2025),
 *   vimseltinib (26 June 2026), gilteritinib (1 October 2026). The imatinib, fulvestrant and acalabrutinib labels
 *   were also read and are not cited: none has a rule for joint or muscle symptoms.
 * - EU product information, each the EMA PDF as served on 18 November 2026 (PDF date in brackets; the documents
 *   print no revision date): Imbruvica (28 July 2026), Mektovi (1 November 2026), Cotellic (13 June 2025),
 *   Romvimza (30 January 2026), Xospata (14 May 2024), Braftovi (3 November 2026), Zelboraf (13 June 2025).
 *
 * Read as abstract only (PubMed, through the NCBI E-utilities):
 * - The SIO-ASCO guideline on integrative medicine for pain (Mao et al., J Clin Oncol 2022). ascopubs.org answered
 *   a script with a bot check (HTTP 403) and Europe PMC holds no full text.
 * - The HOPE exercise trial (Irwin et al., J Clin Oncol 2015): PMC answered a bot check on repeated tries and Europe PMC's full-text service returned an error.
 * - The ATOLL switching study (Briot et al., Breast Cancer Res Treat 2010).
 *
 * Not read, and no step rests on them: the ASCO guideline on chronic pain in survivors (2016), the ASCO guideline
 * on chemotherapy-induced peripheral neuropathy (2020) and the ACS/ASCO breast cancer survivorship guideline
 * (2016), whose abstracts say nothing on this subject and whose full texts sit behind the same bot check; the ESMO
 * early breast cancer guideline (Loibl et al., Ann Oncol 2024), not held open by Europe PMC (its Pan-Asian
 * adaptation, PMC11145753, was fetched and a search of its text for arthralgia, musculoskeletal, joint pain,
 * duloxetine and acupuncture found nothing); European product information for the
 * aromatase inhibitors and paclitaxel, which are nationally authorised and have no EMA document; any EU document
 * for avutometinib with defactinib (the EMA address returned 404).
 *
 * Second reader, 18 November 2026. Every quote (36) was re-checked by script against the saved raw texts, and every
 * step, grade row, dose, threshold and summary figure was read against its passage. Re-fetched independently
 * with curl: the US labels of binimetinib, cobimetinib and avutometinib with defactinib (DailyMed SPL XML) and the
 * EU product information of Mektovi and Cotellic (EMA PDFs, pdftotext -layout); all five were byte-identical to
 * the writer's text after the same conversion, and every creatine kinase figure was confirmed. The other sources
 * were read from the writer's texts saved the same day. Europe PMC was asked again for the SIO-ASCO guideline
 * (subscription only, no PMC copy) and for HOPE (its full-text XML again failed); both stay abstract only.
 * Changed: the "rule out other causes" step is now scoped to BTK inhibitors; the Macmillan step to letrozole; the
 * creatine kinase monitoring step to cobimetinib (with binimetinib), not "a MEK inhibitor"; the paclitaxel step
 * to what the nab-paclitaxel label says, with the NCI's lower frequency shown beside the label's; the cobimetinib
 * US and EU hold rules are no longer said to differ on threshold; an inconsistency inside Rhodes 2020 is named.
 * Counts: 153 claims checked, 0 wrong, 7 unsupported and reworded, 4 unverifiable (the guideline grade behind
 * the abstract, the currency of the labels not re-fetched, the ELN edition and ten DOI titles not re-resolved). All 14 drug ids were kept:
 * each is named for this problem by a source read, and the thin ones are listed in gaps.
 *
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed, and were checked by script. US sources spell "favor"; quotes keep it.
 */
export const jointAndMusclePainOnAnticancerDrugs = protocol({
  id: "joint-and-muscle-pain-on-anticancer-drugs",
  name: "Joint pain, muscle pain, cramps and raised creatine kinase on anticancer drugs",
  aka: [
    "aromatase inhibitor arthralgia",
    "aromatase inhibitor musculoskeletal symptoms",
    "AIMSS",
    "joint pain on letrozole",
    "joint pain on anastrozole",
    "arthralgia on ibrutinib",
    "paclitaxel acute pain syndrome",
    "taxane aches",
    "myalgia on chemotherapy",
    "muscle cramps on imatinib",
    "raised CK on a MEK inhibitor",
    "raised CPK on cancer treatment",
  ],
  domain: "symptom-management",
  tldr: "Many cancer drugs cause aching joints or muscles: hormone tablets for breast cancer, paclitaxel, ibrutinib and others. Tell your team rather than putting up with it. Exercise, painkillers, acupuncture or a change of drug or dose may help. On some targeted drugs, muscle pain with weakness or dark urine needs a call to your team straight away.",
  simple: "Some cancer medicines make joints or muscles ache. Tell your doctor or nurse. Keeping active, painkillers and sometimes acupuncture may help, and the dose or the drug can be changed. On a few targeted drugs, muscle pain with weakness or dark urine needs a call straight away. Your own team's plan comes first.",
  summary: "Joint and muscle symptoms are among the commonest side effects of several unrelated drug groups, and the guidance is thin and differs by drug. The reader's own team's protocol comes first.\n\nAromatase inhibitors. In the US letrozole label arthralgia was reported by 25.2% on letrozole against 20.4% on tamoxifen, and in the US exemestane label by 15% against 9%; the duloxetine trial's authors say about half of patients develop bothersome symptoms and 20% to 30% stop treatment early. SIO-ASCO (2022, read as an abstract) says acupuncture should be recommended. The two Cochrane reviews are less confident: the exercise review (seven studies, 400 women) found no clear evidence of benefit for these symptoms but says exercise needs to be part of routine care, and the systemic therapy review (17 studies, 2034 women) could make no definitive recommendation. Single trials: exercise (HOPE; worst joint pain fell by 1.6 points against a 0.2-point rise at 12 months), duloxetine (SWOG S1202, part-funded by Lilly; average pain 0.82 points lower than placebo by 12 weeks, with more side effects) and acupuncture (SWOG S1200; a significant reduction of uncertain clinical importance). After a switch to a second aromatase inhibitor, 38.6% of 83 women stayed on it in one study and 71.5% of 179 at 6 months in another.\n\nPaclitaxel and nab-paclitaxel. Aches come two or three days after a dose and resolve within a few days (US paclitaxel label: 60% of patients, 8% severe; the NCI summary says 10% to 20%, starting after 1 to 2 days and lasting a median of 4 to 5 days). No preventive or treatment standard exists; simple painkillers, then opioids as needed, were used in the cohort study.\n\nIbrutinib. Two expert papers differ: one favours observation and supportive care for grade 1 to 2, considering a dose reduction when daily activities are affected and holding for grade 3; the other suggests paracetamol or short pulses of prednisone while ibrutinib continues at the full dose, avoiding ibuprofen-type drugs if possible because of bleeding, and holding for up to a week then reducing one level if the pain cannot be tolerated. Both mention a change to another BTK inhibitor.\n\nImatinib cramps: monitor and correct electrolytes; otherwise symptomatic relief only (ELN 2016).\n\nCreatine kinase. Binimetinib, cobimetinib and avutometinib with defactinib carry rhabdomyolysis warnings with CK monitoring and hold rules. For binimetinib the US and EU documents differ on when to withhold; for cobimetinib they differ mainly on how often to test and on the terms for restarting; no EU document was found for avutometinib with defactinib. They are set out under variants. Encorafenib and vemurafenib joint pain falls under each label's general rule for adverse reactions. Rhabdomyolysis itself, and muscle or joint inflammation from checkpoint inhibitors, are outside this page.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage", "chemotherapy-day-unit", "community"],
  },
  population: "Adults taking an aromatase inhibitor (letrozole, anastrozole, exemestane) for early breast cancer; adults having paclitaxel or nab-paclitaxel; adults taking ibrutinib (the papers read concern chronic lymphocytic leukaemia), imatinib (the recommendations read concern chronic myeloid leukaemia), vemurafenib or encorafenib; and adults on binimetinib, cobimetinib, avutometinib with defactinib, vimseltinib or gilteritinib, whose labels ask for creatine kinase to be watched. Not covered: joint and muscle inflammation from checkpoint inhibitors, which has its own page; rhabdomyolysis once diagnosed; bone pain from growth factor injections or bisphosphonates; pain from the cancer itself; bone loss on hormone therapy, which has its own page; children.",
  trigger: "Starting one of these drugs (teaching, and baseline creatine kinase where the label asks for it), or new or worse joint pain, stiffness, muscle pain, cramps or weakness during treatment.",
  steps: [
    {
      action: "On ibrutinib or another BTK inhibitor, rule out other causes of joint pain before putting it down to the drug",
      why: "The review that says this is about BTK inhibitors, and it does not list the other causes. No source read states this step for the other drugs on this page, so it is given here for BTK inhibitors only.",
      source: "btk-tox-2020",
      quote: "Rule out other causes of arthralgia.",
    },
    {
      action: "On letrozole, tell the doctor or nurse about muscle or joint pain; if it does not get better, tell them again, and they may talk about changing to a different hormonal drug",
      why: "This is Macmillan's wording for patients on its letrozole page; its pages for the other aromatase inhibitors were not read. Macmillan says the team can give advice and painkillers or other drugs. The duloxetine trial's authors report that 20% to 30% of patients stop these tablets early because they cannot tolerate them, mostly because of joint and muscle symptoms. In the ELPh study 38.6% of 83 women who switched to the other aromatase inhibitor stayed on it, and in the ATOLL study 71.5% of 179 women who moved from anastrozole to letrozole were still taking it at 6 months; neither study had a comparison group.",
      source: "macmillan-letrozole",
      quote: "If the pain does not get better, tell your doctor or nurse. They may talk to you about changing to a different hormonal drug.",
    },
    {
      action: "Keep exercise as part of routine care for women with breast cancer; being physically active and keeping to a healthy weight may help the pain",
      why: "Macmillan says activity can keep joints flexible and reduce stress on them. The Cochrane review found no clear evidence that exercise helps these symptoms (seven studies, 400 women, very low certainty) and asks for it anyway because of its other benefits. In the HOPE trial of 121 previously inactive women, 150 minutes a week of aerobic exercise with supervised strength training twice a week lowered worst joint pain by 1.6 points at 12 months, against a rise of 0.2 points with usual care.",
      source: "cochrane-exercise-2020",
      quote: "Despite these inconclusive findings, exercise still needs to be part of routine care for women with breast cancer.",
    },
    {
      action: "Recommend acupuncture for aromatase inhibitor joint pain",
      why: "Only the guideline's abstract was read. It gives one summary grade for four recommendations together, of which this is one, and says the benefit outweighs the risk; the grade printed for this recommendation alone was not seen. In the SWOG S1200 trial, 12 sessions over 6 weeks and then one a week for 6 weeks reduced joint pain more than sham acupuncture or a waiting list at 6 weeks; its authors call the improvement of uncertain clinical importance.",
      source: "sio-asco-2022",
      quote: "Among adult patients, acupuncture should be recommended for aromatase inhibitor-related joint pain.",
      grade: "intermediate level of evidence, benefit outweighing risk, and with moderate strength of recommendation",
    },
    {
      action: "For mild aches in muscles or bones on letrozole or anastrozole, ask a pharmacist to recommend a suitable painkiller; if the pain does not go away, ask the doctor for advice (NHS, for England)",
      why: "The NHS gives no reason. The duloxetine trial's authors say this pain is usually treated empirically with paracetamol (acetaminophen), anti-inflammatory painkillers or opioids.",
      source: "nhs-letrozole-anastrozole",
      quote: "Ask a pharmacist to recommend a suitable painkiller. If the pain does not go away ask your doctor for advice.",
    },
    {
      action: "On letrozole or anastrozole, ask a doctor for advice urgently about a sudden attack of pain in a joint (NHS, for England)",
      why: "The NHS follows this with the statement that these tablets can make bones weaker, with an increased risk of osteoporosis or bone injuries.",
      source: "nhs-letrozole-anastrozole",
      quote: "If you have a sudden attack of pain in a joint ask a doctor for advice urgently.",
    },
    {
      action: "Explain to people having nab-paclitaxel that muscle and joint aches occur frequently (US label); the US paclitaxel label reports the same symptoms without this instruction",
      why: "The US paclitaxel label says the symptoms were usually transient, came two or three days after a dose and resolved within a few days; 60% of patients had them and 8% had severe symptoms. The NCI summary gives different figures: a syndrome of diffuse joint and muscle pain in 10% to 20% of patients, starting 1 to 2 days after the infusion and lasting a median of 4 to 5 days. The quote is from the patient counselling section of the US nab-paclitaxel label; the EU documents were not read.",
      source: "label-nab-paclitaxel",
      quote: "Explain to patients that alopecia, fatigue/asthenia, and myalgia/arthralgia occur frequently with ABRAXANE.",
    },
    {
      action: "For aches after paclitaxel, speak to the doctor or nurse about which painkillers can be taken",
      why: "No treatment is established as standard. In the NCCTG cohort study people were told to use paracetamol or anti-inflammatory painkillers first, with opioids as needed; non-prescription medicines were used by 30% to 41% of patients each week and opioids by 12% to 20%. The NCI summary says steroids may reduce the tendency to develop these aches.",
      source: "cruk-paclitaxel",
      quote: "You might feel some pain from your muscles and joints. Speak to your doctor or nurse about what painkillers you can take to help with this.",
    },
    {
      action: "On ibrutinib, favour observation and supportive care for grade 1 to 2 joint pain; consider a dose reduction when it affects daily activities; hold the dose for grade 3 or higher and restart at a lower dose if the symptoms resolve",
      why: "This is the authors' own practice. They report joint and muscle pain in 11% to 36% of people on ibrutinib and say the migratory joint pains can be debilitating. In the Pennsylvania cohort, 36% of 214 patients developed it and 62% of those with grade 3 pain ultimately stopped ibrutinib.",
      source: "btk-tox-2020",
      quote: "When grade 1-2, we favor observation and supportive care. Consider dosage reduction when symptoms affect ADLs, with dose holds for grade ≥3 AEs (affecting self-care ADLs) and rechallenge at lower doses if resolution of symptoms.",
    },
    {
      action: "On ibrutinib, avoid anti-inflammatory painkillers that affect platelets, such as ibuprofen, if possible; paracetamol or short pulses of prednisone are suggested instead",
      why: "The authors give the reason as the risk of bleeding when such painkillers are taken with ibrutinib. The other review says steroids should be a short course at low dose because of the risk of fungal infection, and that anti-inflammatory drugs must be used cautiously.",
      source: "stephens-byrd-2019",
      quote: "When managing ibrutinib-associated arthralgia, the use of anti-inflammatory agents with antiplatelet adverse events, such as ibuprofen, should be avoided if possible secondary to bleeding risk when used concurrently with ibrutinib.",
    },
    {
      action: "If the person cannot tolerate the joint pain on ibrutinib, the same authors suggest holding it for up to a week and restarting one dose level lower",
      why: "The hold is to let the symptoms resolve. The authors add that in some cases a change to another BTK inhibitor such as acalabrutinib can lessen or resolve the problem. The US and EU labels have no rule for joint pain; both set a general rule for grade 3 or 4 non-blood side effects, which is to interrupt and restart at a lower dose after recovery.",
      source: "stephens-byrd-2019",
      quote: "If the patient cannot tolerate the arthralgia, then we suggest holding the dose of ibrutinib for up to a week to allow symptoms to resolve and reduction of the dose by 1 dose level (for example, 420 mg to 280 mg).",
    },
    {
      action: "For muscle cramps on imatinib, monitor serum electrolytes and correct them if necessary",
      why: "The European LeukemiaNet says that, other than symptomatic relief, there is no definitive treatment, and that some patients find relief with drinks containing quinine. It says the cause of the cramps is unknown, although they have been linked with low adjusted calcium levels, and that they interfere with quality of life.",
      source: "eln-ae-2016",
      quote: "Serum electrolyte levels should be monitored and corrected, if necessary.",
    },
    {
      action: "On cobimetinib, measure creatine kinase and creatinine before starting, periodically during treatment and as clinically indicated; if creatine kinase is raised, evaluate for signs and symptoms of rhabdomyolysis or other causes (US label)",
      why: "The label says rhabdomyolysis (muscle breakdown) can occur with cobimetinib. The US binimetinib label asks for the same tests at the same times. How often to test differs by document: the EU cobimetinib and binimetinib documents say monthly (binimetinib for the first 6 months, and as clinically indicated); the US label for avutometinib with defactinib says before each cycle and on day 15 of the first four cycles. The labels of other MEK inhibitors, trametinib and selumetinib among them, were not read.",
      source: "label-cobimetinib",
      quote: "Obtain baseline serum CPK and creatinine levels prior to initiating COTELLIC, periodically during treatment, and as clinically indicated. If CPK is elevated, evaluate for signs and symptoms of rhabdomyolysis or other causes.",
    },
    {
      action: "On binimetinib, withhold the drug for up to 4 weeks for a grade 4 creatine kinase rise without symptoms, or a rise of any grade with symptoms or with kidney impairment (US label); resume at a reduced dose if it improves to grade 0 to 1, and stop for good if it has not resolved within 4 weeks",
      why: "The label gives no reason beyond its rhabdomyolysis warning. The EU document differs: with symptoms or kidney impairment it acts only from grade 3; for a grade 3 rise without symptoms it keeps the dose and asks that the person is adequately hydrated; and it advises an adequate fluid intake throughout treatment. Both documents leave the encorafenib dose unchanged for a creatine kinase rise.",
      source: "label-binimetinib",
      quote: "Withhold MEKTOVI dose for up to 4 weeks.",
    },
    {
      action: "On avutometinib with defactinib, withhold both for a grade 3 or 4 creatine kinase rise; stop for good if the rise lasts longer than three weeks, or at any grade with rhabdomyolysis or another event related to the rise (US label)",
      why: "The label reports a raised creatine kinase in 75% of patients, grade 3 to 4 in 18%, and rhabdomyolysis in one patient in a clinical trial. If a grade 3 rise improves to grade 1 or less within three weeks the same dose is resumed; after grade 4, a reduced dose. No EU document was found.",
      source: "label-avutometinib-defactinib",
      quote: "Permanently discontinue AVMAPKI FAKZYNJA CO-PACK for CPK elevation longer than three weeks.",
    },
    {
      action: "Ask people on binimetinib or cobimetinib to tell their healthcare provider right away about weakness, muscle aches or pain, or dark, reddish urine (US Medication Guides)",
      why: "The US Medication Guides say these drugs can cause muscle problems that can be severe; the quote is the binimetinib guide, and the cobimetinib guide uses the same words for muscle aches or pain, muscle spasms and weakness, and dark, reddish urine. The EU binimetinib leaflet says to talk to the doctor immediately about muscle pain, cramps, stiffness, spasm or dark urine, and that muscle breakdown can lead to kidney damage and can be fatal.",
      source: "label-binimetinib",
      quote: "Tell your healthcare provider right away if you develop any of these symptoms:",
    },
  ],
  bestInClass: {
    statement: "No single guideline covers this ground, and the sources disagree in places. For aromatase inhibitor joint pain, the only graded recommendation read is SIO-ASCO 2022 (acupuncture should be recommended; moderate strength), read as an abstract whose one grade covers four recommendations. The Cochrane reviews are more cautious than the single trials they include: no clear evidence of benefit for exercise, which they still want as part of routine care, and no definitive recommendation for any systemic therapy, duloxetine included, although the duloxetine trial (part-funded by Lilly) and the HOPE exercise trial each met their primary end point. Switching to a second aromatase inhibitor rests on two studies without a comparison group, one supported by grants from Pfizer and Novartis. For the aches after paclitaxel, no prevention or treatment is established. For ibrutinib, two expert papers give their own practice and differ on steroids, on anti-inflammatory painkillers and on when to hold. For imatinib cramps the European LeukemiaNet offers electrolyte correction and symptomatic relief only. For a raised creatine kinase the labels are the source, and the US and EU documents differ on the threshold for withholding binimetinib, on the terms for restarting cobimetinib and on how often to test.",
    sources: ["sio-asco-2022", "cochrane-exercise-2020", "cochrane-systemic-2022", "swog-s1202-2018", "hope-2015", "henry-2012", "atoll-2010", "btk-tox-2020", "stephens-byrd-2019", "eln-ae-2016", "label-binimetinib", "smpc-binimetinib", "label-cobimetinib", "smpc-cobimetinib"],
  },
  variants: [
    {
      name: "Duloxetine for aromatase inhibitor joint pain (SWOG S1202)",
      differs: "Duloxetine 30 mg daily for 1 week, then two capsules daily for 11 weeks, then one capsule daily for 1 week, in postmenopausal women with early breast cancer whose average joint pain was 4 or more out of 10 and had developed or worsened since starting an aromatase inhibitor.",
      evidence: "One randomised, double-blind, placebo-controlled trial (299 enrolled; funded by the US National Cancer Institute and in part by Lilly USA). By 12 weeks average joint pain was 0.82 points lower with duloxetine than with placebo; no difference was seen at week 24, 12 weeks after the full dose ended. Side effects of any grade were more frequent with duloxetine (78% against 50%). The Cochrane review of systemic therapies lists duloxetine among the treatments whose effect did not include a minimal clinically important difference and makes no definitive recommendation for any systemic therapy. No guideline read recommends it for this use.",
      sources: ["swog-s1202-2018", "cochrane-systemic-2022"],
    },
    {
      name: "Switching to a second aromatase inhibitor",
      differs: "After stopping one aromatase inhibitor for intolerable symptoms, starting another: exemestane to letrozole or the reverse after a 2 to 8 week washout (ELPh), or anastrozole to letrozole after 1 month (ATOLL).",
      evidence: "ELPh (503 women; supported in part by grants from Pfizer and Novartis): 32.4% stopped the first drug within 2 years because of side effects, 24.3% because of musculoskeletal symptoms; of 83 who chose to switch, 38.6% continued the second drug for a median of 13.7 months, and 61.4% stopped it. ATOLL (abstract only; 179 women, not randomised): 71.5% continued letrozole at 6 months and 28.5% stopped because of severe joint pain. Neither study had a group that stayed on the first drug. Macmillan tells patients the team may talk about changing to a different hormonal drug.",
      sources: ["henry-2012", "atoll-2010", "macmillan-letrozole"],
    },
    {
      name: "Ibrutinib joint pain: two expert practices",
      differs: "Lipsky and Lamanna (2020): observation and supportive care at grade 1 to 2, a dose reduction considered when daily activities are affected, a hold at grade 3 or higher; magnesium and quinine-containing tonic water as anecdotal additions; a short course of low-dose steroids and cautious anti-inflammatory drugs for severe pain. Stephens and Byrd (2019): paracetamol or short pulses of prednisone while continuing the full dose, ibuprofen-type drugs avoided if possible (the authors say one can be started once the pain has abated, which they find happens after 6 months or more of treatment), and a hold of up to a week with a one-level dose reduction if the pain cannot be tolerated. Both mention a change to another BTK inhibitor such as acalabrutinib.",
      evidence: "Expert opinion; Lipsky and Lamanna say the evidence for specific drugs is anecdotal. In the Pennsylvania cohort (Rhodes 2020, 214 patients) a dose reduction alone relieved symptoms in 60% (9 of 15) and a hold alone in 14% (1 of 7), as the results text gives them; the paper's table prints 40% beside the same 1 of 7, and its abstract says holds were the more successful. The authors say supportive measures were not used often enough to evaluate. The US label and the EU product information have no rule for joint pain: for grade 3 or 4 non-blood side effects both interrupt treatment and lower the dose on restarting, but the steps differ (US, for the 420 mg dose: 280 mg after the first occurrence, 140 mg after the second, discontinue after the third; EU, for the 420 mg dose: 420 mg after the first, 280 mg after the second, 140 mg after the third, discontinue after the fourth).",
      sources: ["btk-tox-2020", "stephens-byrd-2019", "rhodes-2020", "label-ibrutinib", "smpc-ibrutinib"],
    },
    {
      name: "Creatine kinase rules, document by document",
      differs: "Binimetinib, US: withhold for up to 4 weeks for grade 4 without symptoms or any grade with symptoms or kidney impairment; resume reduced at grade 0 to 1; stop for good if not resolved within 4 weeks. Binimetinib, EU: grade 3 without symptoms, keep the dose and ensure hydration; grade 4 without symptoms, withhold until grade 0 or 1; grade 3 or 4 with muscle symptoms or kidney impairment, withhold until grade 0 or 1, then resume reduced if resolved within 4 weeks or stop for good. Cobimetinib, US: withhold for up to 4 weeks for grade 4, or any rise with myalgia; resume at the next lower dose if improved to grade 3 or lower; stop for good if not improved within 4 weeks. Cobimetinib, EU: interrupt for rhabdomyolysis or a symptomatic rise, restart at a dose reduced by 20 mg if clinically indicated once the severity has improved by at least one grade within 4 weeks, and stop for good if it has not; interrupt for grade 4 without symptoms, with the same restart once it is grade 3 or lower within 4 weeks; no change at grade 3 or lower without symptoms once rhabdomyolysis is ruled out. Avutometinib with defactinib, US: withhold at grade 3 or 4, resume at the same dose after grade 3 and a reduced dose after grade 4 if it improves to grade 1 or less within three weeks, stop for good after three weeks or with rhabdomyolysis. Gilteritinib: creatine kinase is part of the blood chemistry checks (US: before starting, at least weekly for the first month, every other week for the second, then monthly; EU: before starting, on day 15 and monthly), with no rule of its own; both documents interrupt for other grade 3 or higher toxicity until it resolves or improves to grade 1. Vimseltinib: neither document has a creatine kinase rule; the EU text says dose interruptions or reductions may be required based on individual safety and tolerability.",
      evidence: "Regulatory documents. Binimetinib US label: raised creatine kinase in 58% of patients in the COLUMBUS trial, with rhabdomyolysis in 1 patient (0.1%) of 690. Cobimetinib US label: grade 3 or 4 rises in 14% with vemurafenib against 0.5% on vemurafenib alone, first appearing at a median of 16 days. Gilteritinib: muscle or joint pain in 50% of 319 patients, grade 3 or higher in 7% (US label); a raised creatine kinase in 53.9% (EU text). Vimseltinib EU text: a rise was seen in all 66 patients in the phase 1/2 study, is described as consistent with the mechanism of action, and had not led to rhabdomyolysis in clinical studies; a raised creatine kinase led to a dose reduction or interruption in 17%.",
      sources: ["label-binimetinib", "smpc-binimetinib", "label-cobimetinib", "smpc-cobimetinib", "label-avutometinib-defactinib", "label-gilteritinib", "smpc-gilteritinib", "label-vimseltinib", "smpc-vimseltinib"],
    },
    {
      name: "Joint pain on vemurafenib and encorafenib: the labels' general rule",
      differs: "Neither drug has a rule written for joint pain. Vemurafenib, US: withhold for an intolerable grade 2 or greater adverse reaction and restart at 720 mg twice daily on recovery to grade 0 to 1 (480 mg after a second appearance). Vemurafenib, EU: the same doses, with the dose kept at grade 1 or tolerable grade 2 and treatment stopped for good at a third occurrence. Encorafenib, US and EU: withhold for up to 4 weeks for recurrent grade 2 or a first grade 3 reaction (the EU text adds intolerable grade 2), resume at a reduced dose if it improves to grade 0 to 1 or baseline, and stop for good if it does not.",
      evidence: "Regulatory documents. Arthralgia was reported by 53% of patients on vemurafenib in its trial in previously untreated melanoma (US label), and by 44% on encorafenib alone against 26% when given with binimetinib (US label). No management guidance specific to this joint pain was read.",
      sources: ["label-vemurafenib", "smpc-vemurafenib", "label-encorafenib", "smpc-encorafenib"],
    },
  ],
  grades: [
    { claim: "Acupuncture should be recommended for aromatase inhibitor joint pain", grade: "intermediate level of evidence, benefit outweighing risk, and with moderate strength of recommendation", source: "sio-asco-2022", quote: "These recommendations are based on an intermediate level of evidence, benefit outweighing risk, and with moderate strength of recommendation." },
    { claim: "Exercise for aromatase inhibitor musculoskeletal symptoms: no clear evidence of benefit", grade: "Cochrane review; very low-certainty evidence (GRADE)", source: "cochrane-exercise-2020", quote: "There was insufficient evidence to assess the use of exercise in the prevention of AIMSS." },
    { claim: "Systemic therapies for aromatase inhibitor musculoskeletal symptoms: no definitive recommendation", grade: "Cochrane review; very low-certainty evidence (GRADE)", source: "cochrane-systemic-2022", quote: "no definitive recommendations for systemic therapies for either prevention or treatment of AIMSS on the basis of this review can be made." },
    { claim: "Duloxetine lowered average joint pain more than placebo by 12 weeks", grade: "Randomised phase III trial; not a graded recommendation (funded in part by Lilly USA)", source: "swog-s1202-2018", quote: "By 12 weeks, the average joint pain score was 0.82 points lower for patients who received duloxetine compared with those who received placebo" },
    { claim: "Exercise improved aromatase inhibitor joint pain in previously inactive women", grade: "Randomised trial; not a graded recommendation", source: "hope-2015", quote: "Exercise led to improvement in AI-induced arthralgia in previously inactive breast cancer survivors." },
    { claim: "Acupuncture reduced joint pain at 6 weeks; clinical importance uncertain", grade: "Randomised trial; not a graded recommendation", source: "hershman-2018", quote: "resulted in a statistically significant reduction in joint pain at 6 weeks, although the observed improvement was of uncertain clinical importance." },
    { claim: "More than one third of women who switch may tolerate a second aromatase inhibitor", grade: "Exploratory analysis of a randomised trial; not graded (supported in part by Pfizer and Novartis grants)", source: "henry-2012", quote: "Of the 83 patients who chose to switch to the second AI, 38.6% continued the alternate AI for a median of 13.7 months." },
    { claim: "Paclitaxel aches are usually transient", grade: "Regulatory label; not graded", source: "label-paclitaxel", quote: "The symptoms were usually transient, occurred two or three days after paclitaxel administration, and resolved within a few days." },
    { claim: "Steroids may reduce the tendency to develop paclitaxel aches", grade: "NCI PDQ summary; this statement is not graded", source: "pdq-pain", quote: "Steroids may reduce the tendency to develop myalgia and arthralgias." },
    { claim: "No standard prevention or treatment for the paclitaxel acute pain syndrome", grade: "Cohort study; authors' statement, not graded", source: "loprinzi-2011", quote: "have not yielded enough evidence to establish a standard practice." },
    { claim: "Drug treatment of ibrutinib joint pain is anecdotal", grade: "Expert review; not graded", source: "btk-tox-2020", quote: "Arthralgias can be adjunctively treated with pharmacotherapy, although evidence is anecdotal." },
    { claim: "Ibrutinib cohort: a dose reduction alone relieved symptoms more often than a hold alone", grade: "Retrospective single-centre cohort; not graded", source: "rhodes-2020", quote: "Dose hold without dose reduction was successful in 14% (1/7) of patients, while dose reduction alone alleviated symptoms in 60% (9/15)." },
    { claim: "Imatinib cramps: no definitive treatment", grade: "Expert recommendation; not graded", source: "eln-ae-2016", quote: "Other than symptomatic relief, there is no definitive treatment." },
    { claim: "Binimetinib, EU: keep the dose for a grade 3 rise without symptoms and ensure hydration", grade: "Regulatory document; not graded", source: "smpc-binimetinib", quote: "Binimetinib dose should be maintained and it should be" },
    { claim: "Binimetinib, EU: monthly creatine kinase and creatinine for the first 6 months", grade: "Regulatory document; not graded", source: "smpc-binimetinib", quote: "CK and creatinine levels should be monitored monthly during the first 6 months of treatment and as clinically indicated." },
    { claim: "Cobimetinib, EU: no dose change at grade 3 or lower without symptoms", grade: "Regulatory document; not graded", source: "smpc-cobimetinib", quote: "After rhabdomyolysis has been ruled out, Cotellic dosing does not need to be modified." },
    { claim: "Avutometinib with defactinib: monitoring schedule", grade: "Regulatory label; not graded", source: "label-avutometinib-defactinib", quote: "Monitor CPK prior to the start of each cycle, on day 15 of the first four cycles, and as clinically indicated." },
    { claim: "Vimseltinib, EU: rises in creatine kinase had not led to rhabdomyolysis in clinical studies, which is not excluded", grade: "Regulatory document; not graded", source: "smpc-vimseltinib", quote: "Although currently these elevations did not result in any cases of liver injury or rhabdomyolysis in clinical studies, this is not excluded since experience in this rare clinical condition is very limited." },
    { claim: "Vemurafenib, US: withhold for intolerable grade 2 or greater adverse reactions", grade: "Regulatory label; not graded", source: "label-vemurafenib", quote: "Withhold ZELBORAF for NCI-CTCAE (v4.0) intolerable Grade 2 or greater adverse reactions." },
    { claim: "Encorafenib, US: its dose is not modified for a creatine kinase rise", grade: "Regulatory label; not graded", source: "label-encorafenib", quote: "Dose modification of BRAFTOVI when administered with binimetinib or with cetuximab is not recommended for new primary cutaneous malignancies; ocular events other than uveitis, iritis, and iridocyclitis; interstitial lung disease/pneumonitis; creatine phosphokinase (CPK) elevation; rhabdomyolysis; and venous thromboembolism." },
  ],
  sources: [
    { key: "sio-asco-2022", label: "Integrative Medicine for Pain Management in Oncology: Society for Integrative Oncology-ASCO Guideline", publisher: "Journal of Clinical Oncology (Mao et al.)", year: 2022, url: "https://doi.org/10.1200/JCO.22.01357", doi: "10.1200/JCO.22.01357", gradingScheme: "ASCO format: type of recommendation, evidence quality and strength of recommendation; the abstract gives one summary grade for its four recommendations.", read: "abstract", accessed: "2026-11-18" },
    { key: "cochrane-exercise-2020", label: "Exercise therapies for preventing or treating aromatase inhibitor-induced musculoskeletal symptoms in early breast cancer", publisher: "Cochrane Database of Systematic Reviews (Roberts et al.)", year: 2020, url: "https://doi.org/10.1002/14651858.CD012988.pub2", doi: "10.1002/14651858.CD012988.pub2", gradingScheme: "Cochrane systematic review; certainty of evidence by GRADE (high, moderate, low, very low).", read: "full-text", accessed: "2026-11-18" },
    { key: "cochrane-systemic-2022", label: "Systemic therapies for preventing or treating aromatase inhibitor-induced musculoskeletal symptoms in early breast cancer", publisher: "Cochrane Database of Systematic Reviews (Roberts et al.)", year: 2022, url: "https://doi.org/10.1002/14651858.CD013167.pub2", doi: "10.1002/14651858.CD013167.pub2", gradingScheme: "Cochrane systematic review; certainty of evidence by GRADE (high, moderate, low, very low).", read: "full-text", accessed: "2026-11-18" },
    { key: "swog-s1202-2018", label: "Randomized, Multicenter, Placebo-Controlled Clinical Trial of Duloxetine Versus Placebo for Aromatase Inhibitor-Associated Arthralgias in Early-Stage Breast Cancer: SWOG S1202 (funded in part by Lilly USA)", publisher: "Journal of Clinical Oncology (Henry et al.; supported by the US National Cancer Institute and in part by Lilly USA, the maker of duloxetine)", year: 2018, url: "https://doi.org/10.1200/JCO.2017.74.6651", doi: "10.1200/JCO.2017.74.6651", gradingScheme: "A randomised trial; not a guideline and not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "hope-2015", label: "Randomized Exercise Trial of Aromatase Inhibitor-Induced Arthralgia in Breast Cancer Survivors (the HOPE trial)", publisher: "Journal of Clinical Oncology (Irwin et al.)", year: 2015, url: "https://doi.org/10.1200/JCO.2014.57.1547", doi: "10.1200/JCO.2014.57.1547", gradingScheme: "A randomised trial; not a guideline and not graded.", read: "abstract", accessed: "2026-11-18" },
    { key: "hershman-2018", label: "Effect of Acupuncture vs Sham Acupuncture or Waitlist Control on Joint Pain Related to Aromatase Inhibitors Among Women With Early-Stage Breast Cancer: A Randomized Clinical Trial (SWOG S1200)", publisher: "JAMA (Hershman et al.; funded by the US National Institutes of Health)", year: 2018, url: "https://doi.org/10.1001/jama.2018.8907", doi: "10.1001/jama.2018.8907", gradingScheme: "A randomised trial; not a guideline and not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "henry-2012", label: "Predictors of Aromatase Inhibitor Discontinuation as a Result of Treatment-Emergent Symptoms in Early-Stage Breast Cancer (the ELPh trial; supported in part by grants from Pfizer and Novartis)", publisher: "Journal of Clinical Oncology (Henry et al.; supported by US National Institutes of Health grants and by grants from Pfizer and Novartis Pharma AG, the makers of exemestane and letrozole)", year: 2012, url: "https://doi.org/10.1200/JCO.2011.38.0261", doi: "10.1200/JCO.2011.38.0261", gradingScheme: "An exploratory analysis of a randomised trial; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "atoll-2010", label: "Effect of a switch of aromatase inhibitors on musculoskeletal symptoms in postmenopausal women with hormone-receptor-positive breast cancer: the ATOLL (articular tolerance of letrozole) study", publisher: "Breast Cancer Research and Treatment (Briot et al.; funding not stated in the abstract)", year: 2010, url: "https://doi.org/10.1007/s10549-009-0692-7", doi: "10.1007/s10549-009-0692-7", gradingScheme: "A prospective study without randomisation; not graded.", read: "abstract", accessed: "2026-11-18" },
    { key: "macmillan-letrozole", label: "Letrozole (reviewed 1 January 2025)", publisher: "Macmillan Cancer Support", year: 2025, url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/letrozole", gradingScheme: "Patient information; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "nhs-letrozole-anastrozole", label: "Side effects of letrozole (reviewed 24 November 2023) and Side effects of anastrozole (reviewed 6 March 2024)", publisher: "NHS (England)", year: 2024, url: "https://www.nhs.uk/medicines/letrozole/side-effects-of-letrozole/", gradingScheme: "Patient information; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "pdq-pain", label: "Cancer Pain (PDQ), Health Professional Version (updated 24 April 2025)", publisher: "US National Cancer Institute", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/pain/pain-hp-pdq", gradingScheme: "An evidence summary by an editorial board; the statements used here carry no grade.", read: "full-text", accessed: "2026-11-18" },
    { key: "loprinzi-2011", label: "Natural History of Paclitaxel-Associated Acute Pain Syndrome: Prospective Cohort Study NCCTG N08C1", publisher: "Journal of Clinical Oncology (Loprinzi et al.; supported in part by US Public Health Service grants)", year: 2011, url: "https://doi.org/10.1200/JCO.2010.33.0308", doi: "10.1200/JCO.2010.33.0308", gradingScheme: "A prospective cohort study; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "cruk-paclitaxel", label: "Paclitaxel (reviewed 30 July 2025)", publisher: "Cancer Research UK", year: 2025, url: "https://www.cancerresearchuk.org/about-cancer/treatment/drugs/paclitaxel", gradingScheme: "Patient information; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "btk-tox-2020", label: "Managing toxicities of Bruton tyrosine kinase inhibitors", publisher: "Hematology, American Society of Hematology Education Program (Lipsky and Lamanna; one author declares advisory roles and research support from makers of BTK inhibitors)", year: 2020, url: "https://doi.org/10.1182/hematology.2020000118", doi: "10.1182/hematology.2020000118", gradingScheme: "An expert review with the authors' practice; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "stephens-byrd-2019", label: "How I manage ibrutinib intolerance and complications in patients with chronic lymphocytic leukemia", publisher: "Blood (Stephens and Byrd; supported by foundations and the US National Cancer Institute; both authors declare research funding from makers of BTK inhibitors)", year: 2019, url: "https://doi.org/10.1182/blood-2018-11-846808", doi: "10.1182/blood-2018-11-846808", gradingScheme: "The authors' own practice; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "rhodes-2020", label: "Ibrutinib-associated Arthralgias/Myalgias in Patients With Chronic Lymphocytic Leukemia: Incidence and Impact on Clinical Outcomes", publisher: "Clinical Lymphoma, Myeloma and Leukemia (Rhodes et al.; supported by a US training grant and a Conquer Cancer Foundation award; several authors declare consultancy or research funding from makers of BTK inhibitors)", year: 2020, url: "https://doi.org/10.1016/j.clml.2020.02.001", doi: "10.1016/j.clml.2020.02.001", gradingScheme: "A retrospective single-centre cohort; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "eln-ae-2016", label: "European LeukemiaNet recommendations for the management and avoidance of adverse events of treatment in chronic myeloid leukaemia", publisher: "Leukemia (Steegmann et al., for the European LeukemiaNet; authors declare honoraria and research funding from the makers of the drugs discussed)", year: 2016, url: "https://doi.org/10.1038/leu.2016.104", doi: "10.1038/leu.2016.104", gradingScheme: "Expert panel recommendations from a literature review; no levels of evidence or grades are printed.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-letrozole", label: "Femara (letrozole) tablets: US prescribing information", publisher: "Novartis, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=82b77d74-085f-45ac-a7dd-1f5c038bf406", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-anastrozole", label: "Arimidex (anastrozole) tablets: US prescribing information", publisher: "ANI Pharmaceuticals, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=acbfaaa9-503c-4691-9828-76a7146ed6de", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-exemestane", label: "Aromasin (exemestane) tablets: US prescribing information", publisher: "Pfizer (Pharmacia & Upjohn), on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cf066b7a-032a-416c-8d40-15ba581423e3", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-paclitaxel", label: "Paclitaxel injection: US prescribing information", publisher: "Hospira, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ea28753a-8631-460a-bfdc-b101eb8ac84a", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-nab-paclitaxel", label: "Abraxane (paclitaxel protein-bound particles): US prescribing information", publisher: "Abraxis BioScience (Bristol Myers Squibb), on DailyMed (US National Library of Medicine)", year: 2022, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=24d10449-2936-4cd3-b7db-a7683db721e4", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-ibrutinib", label: "Imbruvica (ibrutinib): US prescribing information", publisher: "Pharmacyclics and Janssen, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0dfd0279-ff17-4ea9-89be-9803c71bab44", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-ibrutinib", label: "Imbruvica (ibrutinib): EU product information", publisher: "Janssen-Cilag International, on the European Medicines Agency website", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/imbruvica-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-binimetinib", label: "Mektovi (binimetinib) tablets: US prescribing information and Medication Guide", publisher: "Array BioPharma (Pfizer), on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6c3408ac-d401-4925-8a03-26591afbc240", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-binimetinib", label: "Mektovi (binimetinib): EU product information and package leaflet", publisher: "Pierre Fabre Médicament, on the European Medicines Agency website", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/mektovi-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-cobimetinib", label: "Cotellic (cobimetinib) tablets: US prescribing information and Medication Guide", publisher: "Genentech, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c387579e-cee0-4334-bd1e-73f93ac1bde6", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-cobimetinib", label: "Cotellic (cobimetinib): EU product information", publisher: "Roche Registration, on the European Medicines Agency website", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/cotellic-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-avutometinib-defactinib", label: "Avmapki Fakzynja Co-Pack (avutometinib capsules; defactinib tablets): US prescribing information", publisher: "Verastem, on DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=65889527-1406-45df-8a85-e2690dcf427d", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-vimseltinib", label: "Romvimza (vimseltinib) capsules: US prescribing information", publisher: "Deciphera Pharmaceuticals, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f73c7a62-9601-4df0-810f-100f515d79ea", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-vimseltinib", label: "Romvimza (vimseltinib): EU product information", publisher: "Deciphera Pharmaceuticals (Netherlands), on the European Medicines Agency website", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/romvimza-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-gilteritinib", label: "Xospata (gilteritinib) tablets: US prescribing information", publisher: "Astellas Pharma US, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5ff59aa-9c0d-49a8-9053-1f179b482383", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-gilteritinib", label: "Xospata (gilteritinib): EU product information", publisher: "Astellas Pharma Europe, on the European Medicines Agency website", year: 2024, url: "https://www.ema.europa.eu/en/documents/product-information/xospata-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-vemurafenib", label: "Zelboraf (vemurafenib) tablets: US prescribing information", publisher: "Genentech, on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38eea320-7e0c-485a-bc30-98c3c45e2763", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-vemurafenib", label: "Zelboraf (vemurafenib): EU product information", publisher: "Roche Registration, on the European Medicines Agency website", year: 2025, url: "https://www.ema.europa.eu/en/documents/product-information/zelboraf-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "label-encorafenib", label: "Braftovi (encorafenib) capsules: US prescribing information", publisher: "Array BioPharma (Pfizer), on DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=235dfc38-0f0b-4037-b501-7a9f4294740c", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
    { key: "smpc-encorafenib", label: "Braftovi (encorafenib): EU product information", publisher: "Pierre Fabre Médicament, on the European Medicines Agency website", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/braftovi-epar-product-information_en.pdf", gradingScheme: "Regulatory label; not graded.", read: "full-text", accessed: "2026-11-18" },
  ],
  drugs: ["letrozole", "anastrozole", "exemestane", "paclitaxel", "nab-paclitaxel", "ibrutinib", "imatinib", "binimetinib", "cobimetinib", "avutometinib-defactinib", "vimseltinib", "gilteritinib", "vemurafenib", "encorafenib"],
  terms: ["aromatase-inhibitor", "ctcae-grading", "taxane"],
  technologies: ["acupuncture-aromatase-inhibitor-arthralgia"],
  related: ["chronic-pain-in-cancer-survivors", "irae-rheumatological", "bone-health-on-hormone-therapy", "chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention", "atrial-fibrillation-and-bleeding-on-btk-inhibitors", "fluid-retention-and-effusions-on-kinase-inhibitors", "duloxetine", "exercise-oncology"],
  upgrades: [],
  gaps: [
    "No guideline read covers drug-induced joint and muscle pain as a whole. The one graded recommendation on this page (SIO-ASCO 2022, acupuncture) was read as an abstract only: the journal's site answered a script with a bot check on 18 November 2026 and Europe PMC holds no full text, so the evidence table behind the grade was not seen, and the grade given is the abstract's one summary grade for four recommendations. A second reader tried again the same day: Europe PMC lists the article as subscription only, with no PubMed Central copy. The HOPE exercise trial and the ATOLL switching study were also read as abstracts only.",
    "The ESMO early breast cancer guideline (2024), the ASCO guidelines on chronic pain in survivors (2016) and on chemotherapy-induced peripheral neuropathy (2020), and the ACS/ASCO breast cancer survivorship guideline (2016) were not read in full, so what they say about aromatase inhibitor joint pain or the aches after a taxane is not given here.",
    "Duloxetine and a switch to a second aromatase inhibitor are given as variants and not as steps: no guideline read recommends either. The duloxetine trial was funded in part by the drug's maker and the Cochrane review makes no recommendation from it. No study read compared switching with staying on the first drug, or with a change to tamoxifen.",
    "For ordinary painkillers in aromatase inhibitor joint pain, no trial was read: the NHS advice to ask a pharmacist is written for mild aches, and no source read says which painkiller, at what dose or for how long.",
    "Paclitaxel: no source read establishes a way to prevent or treat the aches. The NCI summary says steroids may reduce the tendency to develop them without giving a regimen. Whether nab-paclitaxel differs from paclitaxel was not examined; a 2025 meta-analysis on that question was found and not read. EU product information for paclitaxel and nab-paclitaxel was not read.",
    "Ibrutinib: both management papers are the authors' own practice in chronic lymphocytic leukaemia and predate much of the experience with newer BTK inhibitors; no later consensus statement was found in a Europe PMC search on 18 November 2026. The Pennsylvania cohort's abstract says dose holds were more successful than dose reductions, while its results give the reverse (a hold alone helped 1 of 7, a reduction alone 9 of 15); this page reports the figures in the results text, and the paper's table prints 40% beside the same 1 of 7, so the paper is not consistent with itself. Whether the steps apply to acalabrutinib or zanubrutinib is not stated by the sources.",
    "Imatinib cramps: the European LeukemiaNet names quinine-containing drinks as something some patients find helpful, not as a recommendation, and gives no dose. Its 2016 recommendations are ungraded. The US and EU imatinib documents were read and have no rule for cramps; magnesium or calcium supplements are not mentioned by any source read.",
    "Creatine kinase: no source read sets a rule for a raised level on vimseltinib or gilteritinib. The US vimseltinib label lists increased creatine kinase among reasons for dose reductions and interruptions without a threshold, and the EU text says the frequency could not be determined in its main trial because no baseline was taken. No EU document for avutometinib with defactinib was found (the EMA address returned 404 on 18 November 2026). Trametinib and selumetinib were not read, so the creatine kinase step is written for cobimetinib and binimetinib and not for MEK inhibitors as a group.",
    "Rhabdomyolysis once diagnosed (fluids, kidney protection, admission) is outside this page; the labels read say only to evaluate for it and to withhold or stop the drug.",
    "Thin entries among this protocol's drugs, kept because a source read names each for this problem: anastrozole (the NHS page gives the same two pieces of advice as for letrozole; its US label only lists joint pain among common reactions), exemestane (the ELPh switching study and a label figure; no patient advice specific to it was read), vimseltinib (a raised creatine kinase is expected and no document sets a threshold) and gilteritinib (creatine kinase is part of routine blood chemistry and the only rule is the general one for grade 3 toxicity). The Macmillan advice quoted is from its letrozole page only.",
    "The US paclitaxel label and the NCI summary give different frequencies for the aches after paclitaxel (60% against 10% to 20%); neither explains the difference and this page does not choose between them.",
    "The European LeukemiaNet recommendations (2016) were not checked for a newer edition by either reader.",
    "Vemurafenib and encorafenib: no guidance specific to their joint pain was read; the rule given is each document's general row for adverse reactions. Dupuytren's contracture and plantar fascial fibromatosis on vemurafenib, which its label manages by dose reduction, interruption or discontinuation, are not covered.",
    "Not read, and not among this protocol's drugs although they record joint or muscle symptoms in this corpus: fulvestrant (its US label was read and lists arthralgia with no rule), elacestrant, vepdegestrant, adagrasib, sotorasib, amivantamab, trastuzumab emtansine, vorasidenib, zenocutuzumab, the T-cell engagers, intismeran autogene and ivermectin.",
    "How quickly to call: the US Medication Guides for binimetinib and cobimetinib say 'right away' for muscle symptoms, the EU binimetinib leaflet says 'immediately', the US guide for avutometinib with defactinib says only to tell the healthcare provider, and the NHS says to ask a doctor for advice 'urgently' about a sudden attack of pain in a joint on letrozole or anastrozole. No patient-facing source read gives an urgent threshold for joint or muscle pain on paclitaxel, ibrutinib or imatinib.",
  ],
});
