import { protocol } from "./helpers";

/*
 * Liver toxicity and veno-occlusive disease of the liver (sinusoidal obstruction syndrome, VOD or SOS) on the two
 * calicheamicin antibody-drug conjugates, inotuzumab ozogamicin (Besponsa) and gemtuzumab ozogamicin (Mylotarg):
 * who should not start, how the risk is lowered, what is monitored, the hold and stop rules of each label, and what is
 * done when the syndrome is suspected. It complements `hepatic-veno-occlusive-disease-after-transplant`, which covers
 * diagnosis, severity grading and defibrotide after a transplant; those are pointed to here, not repeated.
 *
 * What was read, and how (all on 18 November 2026, fetched raw with curl into a scratch directory and read as text;
 * every quote checked by script against the saved text):
 * - BESPONSA US prescribing information (Wyeth/Pfizer, industry): full text, the DailyMed SPL XML (set id
 *   cc7014b1-c775-411d-b374-8113248b4077, version 8, effective 6 February 2026).
 * - Besponsa EU product information (SmPC and package leaflet): full text, the EMA PDF through pdftotext. The text
 *   prints no revision date; the EMA medicine page gives the product information as last updated 18 May 2026.
 * - MYLOTARG US prescribing information (Wyeth/Pfizer, industry): full text, the DailyMed SPL XML (set id
 *   32fd2bb2-1cfa-4250-feb8-d7956c794e05, version 19, effective 19 December 2025).
 * - Mylotarg EU product information (SmPC and package leaflet): full text, the EMA PDF through pdftotext; the EMA
 *   medicine page gives the product information as last updated 17 September 2025.
 * - Kebriaei et al., Bone Marrow Transplantation 2018, the expert panel review on inotuzumab ozogamicin: full text,
 *   Europe PMC full-text XML (PMC5897380). Editorial support was funded by Pfizer, the maker, and all ten authors
 *   declared advisory board or consultancy roles for Pfizer. Its recommendations are not graded. It refers management
 *   to the EBMT position statement of 2015 and diagnosis to the revised EBMT criteria of 2016. A Europe PMC title
 *   search found no later edition of the panel review.
 * - Position statement on prevention and treatment in adults (Mohty et al. 2020; first online October 2019): full
 *   text, Europe PMC (PMC7051913). It calls itself "a position statement from an international expert group" and says
 *   its task force was "Commissioned by the EBMT"; it presents itself as the step after the 2016 criteria and does
 *   not say it replaces the 2015 statement. An unrestricted educational grant from Jazz Pharmaceuticals, the maker of
 *   defibrotide, and all authors declared honoraria or research support from Jazz. Read here only for what it says
 *   about these two drugs and about ursodeoxycholic acid.
 * - EBMT refined adult criteria (Mohty et al. 2023): full text, the publisher's free PDF (nature.com) through
 *   pdftotext. Read here only for its scope and its risk factor table.
 * - The EBMT Handbook, 8th edition (2024), chapter 49 (Hepatic Complications) and chapter 72 (Acute Lymphoblastic
 *   Leukemia in Adults): full text, re-used from the copy of NCBI's open-access package that an earlier round saved
 *   (the files are dated 8 November 2026), converted again and re-read on 18 November 2026; `accessed` is therefore
 *   8 November. Expert chapters, not graded.
 * - BCSH/BSBMT guideline (Dignan et al. 2013): abstract only, Europe PMC. It names prior gemtuzumab ozogamicin as a
 *   risk factor in its defibrotide prophylaxis recommendations and does not name inotuzumab ozogamicin.
 * - Giglio et al., Front Oncol 2022 (seven adults): full text, Europe PMC (PMC9240310); no commercial ties declared.
 * - Paolino et al., Blood Advances 2026 (children and young adults, one centre): full text, Europe PMC (PMC13631587);
 *   the abstract, the methods on prophylaxis, the results on incidence and the conclusion were read. One author
 *   declared honoraria from Jazz.
 * - Iannicelli et al., HemaSphere 2026 (the ITCC-059 paediatric trial): full text, Europe PMC (PMC13495561); the
 *   results on incidence, interval and prophylaxis, the conclusion and the disclosures were read. Funded by Pfizer.
 * - Richardson and Corbacioglu, Blood Cancer Journal 2020 (defibrotide after gemtuzumab ozogamicin, a literature
 *   analysis): full text, Europe PMC (PMC7055222). Supported by Jazz, with Jazz-funded medical writing.
 * - Balaguer-Rosello et al., Transplant Cell Ther 2026; Mosallam et al., J Oncol Pharm Pract 2026 (first online
 *   January 2025); Sabatino et al., J Oncol Pharm Pract 2023 (first online March 2022): abstracts only, Europe PMC.
 *   Funding is not stated in the abstracts.
 * - Macmillan Cancer Support, "Inotuzumab ozogamicin (Besponsa)": the public page, fetched raw and stripped to text.
 *
 * Not readable on 18 November 2026:
 * - ELN recommendations on the management of ALL in adults (Gokbuget et al., Blood 2024) and the ESMO interim update
 *   on targeted therapy in ALL (Hoelzer et al., Ann Oncol 2024): the publishers returned 403 to a script and Europe
 *   PMC holds no full text. The ELN abstract does not mention inotuzumab ozogamicin; the ESMO record has no abstract.
 *   Both are named in sources; no step rests on them.
 * - The ELN 2022 and ESMO 2020 guidelines on AML: the same refusal; their abstracts do not mention gemtuzumab
 *   ozogamicin or the liver. Not cited.
 * - The defibrotide labels were not re-read for this page; the linked transplant protocol sets out their indications.
 *
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed. Multiplication signs in the label thresholds survived conversion and are quoted.
 *
 * Second reader, 18 November 2026. An independent reader re-fetched the four labels (both DailyMed SPL XML files and
 * both EMA PDFs) and the expert panel review (Europe PMC XML) with curl; the converted texts were byte-identical to
 * the writer's copies, and the SPL versions and EMA dates above were confirmed. The BCSH/BSBMT abstract was fetched
 * again from Europe PMC, and the Balaguer DOI, which had no saved Crossref record, was resolved through Crossref. The
 * other sources were read from the writer's texts saved the same day. A fresh fetch of the two Handbook chapters was
 * tried once: link.springer.com and NCBI Bookshelf both answered with a bot check, which was not bypassed. A Europe
 * PMC title search found no British guideline on veno-occlusive disease later than 2013. 172 claims were checked: 5
 * wrong, 16 unsupported or worded more strongly than the source, 1 unverifiable; all 36 quotes in the final file match
 * by script. Changed: the ursodiol studies are reported with their one positive finding (fewer grade 3 AST rises) and
 * without crediting the second with a result on veno-occlusive disease it does not report; daily weighing and the
 * fluid-balance step are worded as the panel's; the page no longer points to defibrotide as if it were licensed for
 * the syndrome without a transplant; the 2020 statement is described as its text describes it; a grade row carried
 * the neighbouring sentence as its quote; the Mylotarg US counselling section does not tell patients to seek advice
 * at once; the source years of the two ursodiol studies are the journal years; `allogeneic-hsct` moved from
 * `technologies` to `related` because the page is about two drugs, not about transplant for everyone.
 */
export const venoOcclusiveDiseaseOnInotuzumabAndGemtuzumabOzogamicin = protocol({
  id: "veno-occlusive-disease-on-inotuzumab-and-gemtuzumab-ozogamicin",
  name: "Liver toxicity and veno-occlusive disease on inotuzumab ozogamicin and gemtuzumab ozogamicin: risk reduction, monitoring, hold and stop rules",
  aka: [
    "VOD on inotuzumab",
    "SOS on inotuzumab ozogamicin",
    "veno-occlusive disease on Besponsa",
    "veno-occlusive disease on Mylotarg",
    "sinusoidal obstruction syndrome on gemtuzumab ozogamicin",
    "calicheamicin liver toxicity",
    "raised liver enzymes on inotuzumab ozogamicin",
    "inotuzumab cycles before transplant",
    "hepatotoxicity on gemtuzumab ozogamicin",
  ],
  domain: "symptom-management",
  tldr: "Inotuzumab ozogamicin and gemtuzumab ozogamicin can harm the liver and can block its small blood vessels (veno-occlusive disease), more often when a transplant follows. Liver blood tests are taken around each dose, a dose is delayed if they rise, and the drug is stopped if the blockage occurs. Fast weight gain, a swollen or painful tummy or yellow skin need a call to your team at once.",
  simple: "These two leukaemia medicines can hurt the liver. Sometimes the tiny blood vessels in the liver get blocked, more often in people who have a transplant. Your team checks your liver with blood tests around every dose. Tell them straight away if you put on weight quickly, your tummy swells or hurts on the right side, or your skin or eyes turn yellow. Your own team's plan comes first.",
  summary: "The reader's own unit's policy comes first. Both drugs carry calicheamicin and both US labels carry a boxed warning for hepatotoxicity including veno-occlusive disease (VOD). The figures come from the labels. Inotuzumab ozogamicin, adults (INO-VATE): VOD in 23 of 164 (14%), in 18 of the 79 who went on to a transplant (23%) and in 5 of 164 (3%) with no transplant in between, up to 56 days after the last dose; a median of 15 days after transplant. Children (ITCC-059): 8 of 53 (15%). Gemtuzumab ozogamicin with chemotherapy (ALFA-0701): 6 of 131 (5% in the US label, 4.6% in the EU SmPC), a median of 9 days after a dose (range 2 to 298); the US label counts 3 of the 6 as fatal and the EU SmPC 2.\n\nBefore inotuzumab ozogamicin: the EU SmPC contraindicates it after confirmed severe or ongoing VOD and in serious ongoing liver disease, and asks for people with a history of liver disease to be evaluated first; the US label has no contraindication and names the same groups as at increased risk. For people going on to a transplant both labels recommend 2 cycles, and a third may be considered for those without complete remission and MRD negativity after 2. The EU SmPC says conditioning with 2 alkylating agents should be avoided (VOD in 6 of 11 against 9 of 53 with one) and that transplant with bilirubin at or above the upper limit of normal (ULN) needs careful consideration (7 of 12 against 11 of 67); the US label reports both as risk factors without that instruction. A company-funded expert panel (2018) adds early transplant referral and a preventive medicine such as ursodiol for everyone exposed; neither label mentions ursodiol, and of two small retrospective studies (abstracts only) neither found a significant fall in liver toxicity overall, though one found fewer grade 3 AST rises with ursodiol and no fewer cases of VOD.\n\nMonitoring: ALT, AST, total bilirubin and alkaline phosphatase before and after each dose of inotuzumab ozogamicin and before each dose of gemtuzumab ozogamicin, with a watch for rising bilirubin, a large or painful liver, rapid weight gain and ascites. Bilirubin alone may miss cases (both Mylotarg labels, Besponsa EU SmPC).\n\nHold rules. Inotuzumab ozogamicin (both labels): interrupt when bilirubin is above 1.5 times ULN and AST or ALT above 2.5 times ULN, until both recover, unless due to Gilbert's syndrome or haemolysis; stop for good if they do not recover. An interruption of 7 days or more omits the next dose, 14 days or more cuts the next cycle's total dose by 25%, and beyond 28 days stopping is considered. Gemtuzumab ozogamicin: the US label delays for bilirubin above 2 times ULN or AST or ALT above 2.5 times ULN and omits a dose delayed more than 2 days; the EU SmPC joins the two thresholds with 'and' and says to consider omitting.\n\nIf VOD occurs both drugs are stopped (inotuzumab ozogamicin permanently) and the syndrome is treated according to standard medical practice, which the labels do not define: the transplant protocol sets out diagnosis, grading, supportive care and defibrotide after a transplant. No diagnostic criteria read were written for VOD on these drugs without a transplant, and no source read for this page says defibrotide is licensed for it.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team", "patient-or-carer"],
    where: ["ward", "chemotherapy-day-unit", "outpatient-clinic", "home"],
  },
  population: "People with acute lymphoblastic leukaemia given inotuzumab ozogamicin and people with acute myeloid leukaemia given gemtuzumab ozogamicin, during treatment and afterwards, including those who go on to a stem cell transplant. The US labels cover adults and children (inotuzumab ozogamicin from 1 year; gemtuzumab ozogamicin from 1 month when newly diagnosed and from 2 years when relapsed or refractory). The EU licences are narrower for gemtuzumab ozogamicin (from 15 years, with daunorubicin and cytarabine, in previously untreated disease). The expert panel review cited is about inotuzumab ozogamicin in adults only. Not covered: the diagnosis, severity grading and defibrotide treatment of veno-occlusive disease, which are on the transplant page; raised liver enzymes on other anticancer drugs; choosing a starting dose when the liver is already impaired. This page explains care that a leukaemia team delivers; the reader's own team's protocol comes first.",
  trigger: "Inotuzumab ozogamicin or gemtuzumab ozogamicin is planned or being given; a liver blood test rises around a dose; or weight goes up quickly, the liver enlarges or becomes painful, fluid collects in the abdomen or bilirubin rises, during treatment, in the weeks after the last dose or after a later transplant.",
  steps: [
    {
      action: "Before inotuzumab ozogamicin, ask about earlier veno-occlusive disease and serious ongoing liver disease, and carefully evaluate anyone with a history of liver disease (for example with an ultrasound scan and viral hepatitis tests), as the EU SmPC asks",
      why: "The EU SmPC contraindicates the drug after confirmed severe or ongoing veno-occlusive disease and in serious ongoing liver disease such as cirrhosis or active hepatitis, and asks for the evaluation to exclude it. The US label lists no contraindication; it says these people are at increased risk of their liver disease worsening and asks that they consider the benefit and risk carefully.",
      source: "besponsa-eu-smpc",
      quote: "Patients with a history of liver disease should be carefully evaluated (e.g., ultrasound scan, viral hepatitis testing) prior to treatment with BESPONSA to exclude serious ongoing hepatic disease (see section 4.3).",
    },
    {
      action: "Refer for a transplant evaluation as soon as inotuzumab ozogamicin is decided on (2018 expert panel)",
      why: "The 2018 expert panel asks for this so that the number of cycles and the conditioning can be planned around the transplant. The panel's editorial support was funded by Pfizer, the maker, and its recommendations are not graded. Neither label says when to refer.",
      source: "kebriaei-2018",
      quote: "As soon as it is decided that a patient will be initiating InO treatment, the patient should be referred for HCT evaluation.",
    },
    {
      action: "For a person going on to a transplant, plan 2 cycles of inotuzumab ozogamicin; a third cycle may be considered for those who do not reach complete remission and MRD negativity after 2",
      why: "Both labels give the risk of veno-occlusive disease as the reason. The expert panel reports the syndrome after transplant in 8% of people given 1 cycle, 19% given 2 and 29% given more than 2. For people not going on to a transplant both labels allow up to 6 cycles.",
      source: "besponsa-us-label",
      quote: "For patients proceeding to hematopoietic stem cell transplant (HSCT), the recommended duration of treatment with BESPONSA is 2 cycles. A third cycle may be considered for those patients who do not achieve CR or CRi and minimal residual disease (MRD) negativity after 2 cycles",
    },
    {
      action: "After inotuzumab ozogamicin, avoid transplant conditioning that contains 2 alkylating agents (EU SmPC)",
      why: "This is the EU SmPC's instruction: it reports veno-occlusive disease in 6 of 11 people conditioned with 2 alkylating agents against 9 of 53 with one, and asks for benefit and risk to be weighed before the drug is given at all where such conditioning is likely to be unavoidable. The US label reports the same association (naming busulfan with other alkylating agents) without telling prescribers to avoid it. The expert panel's text says dual alkylating agents should be avoided if possible; its table lists dual alkylating agents, thiotepa, or both.",
      source: "besponsa-eu-smpc",
      quote: "The use of HSCT conditioning regimens containing 2 alkylating agents should be avoided.",
    },
    {
      action: "If bilirubin is at or above the upper limit of normal before the transplant, go ahead only after careful consideration of benefit and risk, and monitor closely for veno-occlusive disease (EU SmPC)",
      why: "This is the EU SmPC's instruction; it reports the syndrome in 7 of 12 people with bilirubin at or above the upper limit before transplant against 11 of 67 below it. The US label names the same finding as a risk factor without this instruction.",
      source: "besponsa-eu-smpc",
      quote: "In patients in whom the serum bilirubin is ≥ ULN prior to HSCT, HSCT post BESPONSA treatment should only be undertaken after careful consideration of the benefit/risk.",
    },
    {
      action: "Use a preventive medicine such as ursodeoxycholic acid (ursodiol) in people given inotuzumab ozogamicin where the team follows the 2018 expert panel; neither label asks for it",
      why: "The panel gives no reason or study for this beyond preventing the syndrome, and it is ungraded opinion from a company-funded panel. Of two small retrospective studies of ursodiol with these two drugs, read as abstracts, neither found a significant fall in liver toxicity overall; one found fewer grade 3 AST rises with ursodiol and no fewer cases of veno-occlusive disease (see variants). The panel also recommends avoiding liver-toxic medicines such as azoles with high-dose alkylator conditioning, when possible.",
      source: "kebriaei-2018",
      quote: "Finally, it is recommended that pharmacologic agents (e.g., ursodiol) be given to all patients exposed to InO to prevent VOD.",
    },
    {
      action: "With inotuzumab ozogamicin, check ALT, AST, total bilirubin and alkaline phosphatase before and after each dose",
      why: "Both labels ask for this in all patients, because a rise may mean the dose has to be withheld, reduced or stopped. The EU SmPC gives the median time to raised transaminases as 29 days and to raised bilirubin as 73 days.",
      source: "besponsa-us-label",
      quote: "In all patients, monitor liver tests, including ALT, AST, total bilirubin, and alkaline phosphatase, prior to and following each dose of BESPONSA.",
    },
    {
      action: "With gemtuzumab ozogamicin, check ALT, AST, total bilirubin and alkaline phosphatase before each dose",
      why: "Both labels ask for the four tests before each dose. The US label gives the median time from a dose to veno-occlusive disease as 9 days, with a range of 2 to 298 days.",
      source: "mylotarg-us-label",
      quote: "Assess ALT, AST, total bilirubin, and alkaline phosphatase prior to each dose of MYLOTARG.",
    },
    {
      action: "During and after treatment with either drug, look for rising liver tests, a large or painful liver, rapid weight gain and fluid in the abdomen; do not rely on bilirubin alone, and test and examine more often once liver tests are abnormal",
      why: "The labels list these as the signs of veno-occlusive disease. Both Mylotarg labels and the Besponsa EU SmPC say that monitoring only bilirubin may not identify everyone at risk; the Besponsa US label does not carry that sentence. With inotuzumab ozogamicin the syndrome was reported up to 56 days after the last dose in people who had no transplant in between.",
      source: "mylotarg-us-label",
      quote: "Monitoring only total bilirubin may not identify all patients at risk of VOD. For patients who develop abnormal liver tests, more frequent monitoring of liver tests and clinical signs and symptoms of hepatotoxicity is recommended.",
    },
    {
      action: "During inotuzumab ozogamicin, monitor weight for fluid retention: daily in the 2018 expert panel's table, and at a minimum before each cycle in its text",
      why: "The expert panel says weight gain from the kidneys holding on to water and salt is one of the earliest signs of the syndrome. The two frequencies are both the panel's own, and it is an ungraded panel whose editorial support was funded by Pfizer. The labels ask for rapid weight gain to be watched for and set no schedule.",
      source: "kebriaei-2018",
      quote: "Monitor patient weight for fluid retention daily",
    },
    {
      action: "Interrupt inotuzumab ozogamicin when total bilirubin is above 1.5 times the upper limit of normal and AST or ALT is above 2.5 times it, until both recover, unless the cause is Gilbert's syndrome or haemolysis; stop for good if they do not recover",
      why: "The US label and the EU SmPC give the same thresholds and neither states a reason beyond the liver warning. A general row of the same table interrupts treatment for any non-haematological toxicity of grade 2 or higher until it is back to grade 1 or the pre-treatment grade. A dose that has been reduced for toxicity must not be raised again.",
      source: "besponsa-us-label",
      quote: "Interrupt dosing until recovery of total bilirubin to less than or equal to 1.5 × ULN and AST/ALT to less than or equal to 2.5 × ULN prior to each dose unless due to Gilbert's syndrome or hemolysis. Permanently discontinue treatment if total bilirubin does not recover to less than or equal to 1.5 × ULN or AST/ALT does not recover to less than or equal to 2.5 × ULN",
    },
    {
      action: "After an interruption of inotuzumab ozogamicin for toxicity, follow the label's rule for its length: under 7 days, delay the next dose keeping at least 6 days between doses; 7 days or more, omit the next dose in the cycle; 14 days or more, cut the next cycle's total dose by 25% once recovered; more than 28 days, consider stopping for good",
      why: "The US label and the EU SmPC print the same table. If a further change is needed after the 25% cut, the number of doses falls to 2 a cycle, and if that is not tolerated the drug is stopped for good. Neither label gives a reason for the steps.",
      source: "besponsa-us-label",
      quote: "Once adequate recovery is achieved, decrease the total dose by 25% for the subsequent cycle. If further dose modification is required, then reduce the number of doses to 2 per cycle for subsequent cycles.",
    },
    {
      action: "Delay gemtuzumab ozogamicin until total bilirubin is at or below 2 times the upper limit of normal and AST and ALT are at or below 2.5 times it; under the US label, omit a scheduled dose that is delayed more than 2 days between sequential infusions",
      why: "The two labels differ. The US label delays when bilirubin is above 2 times the limit or AST or ALT is above 2.5 times it, and says to omit the delayed dose. The EU SmPC's table joins the two thresholds with 'and' and says to consider omitting the dose. Neither gives a reason beyond the liver warning.",
      source: "mylotarg-us-label",
      quote: "Delay treatment with MYLOTARG until recovery of total bilirubin to less than or equal to 2 × ULN and AST and ALT to less than or equal to 2.5 × ULN prior to each dose.",
    },
    {
      action: "Treat an unexpected change in weight or in liver tests as possible veno-occlusive disease, and investigate before any further inotuzumab ozogamicin is given (2018 expert panel)",
      why: "The expert panel regards everyone given inotuzumab ozogamicin as at high risk and asks for close monitoring to allow early diagnosis and treatment. It leaves further tests such as abdominal ultrasound, hepatic venous pressure measurement and transjugular liver biopsy to the physician's discretion. The diagnostic criteria themselves are on the transplant page.",
      source: "kebriaei-2018",
      quote: "Unexpected weight changes and/or changes in liver function should alert the physician to the possibility of VOD and should lead to further diagnostic workup before further treatment with InO.",
    },
    {
      action: "If veno-occlusive disease occurs on inotuzumab ozogamicin, stop the drug for good",
      why: "Both labels say so; the US label says it in its boxed warning. Its dose table gives the same instruction for other severe liver toxicity. Of the 18 cases after transplant in INO-VATE, 5 were fatal.",
      source: "besponsa-us-label",
      quote: "Permanently discontinue treatment if VOD occurs. If severe VOD occurs, treat according to standard medical practice",
    },
    {
      action: "If veno-occlusive disease occurs on gemtuzumab ozogamicin, discontinue the drug and treat the syndrome according to standard medical practice",
      why: "Both labels say so, in almost the same words. Neither label says what standard practice is, and neither mentions defibrotide; the transplant page sets out supportive care and defibrotide for the syndrome after a transplant.",
      source: "mylotarg-us-label",
      quote: "In patients who experience VOD, discontinue MYLOTARG and treat according to standard medical practice.",
    },
    {
      action: "Once the syndrome is diagnosed, pay careful attention to fluid balance whatever the severity, and follow the unit's veno-occlusive disease protocol for supportive care (2018 expert panel); whether defibrotide is used is for the treating unit",
      why: "The expert panel says this in the paragraph where it follows the EBMT position statement of 2015, which it says makes supportive care the first step. The panel adds that mild disease should be followed closely because the severity grade can change rapidly. It describes defibrotide as the only agent approved in the United States and European Union for veno-occlusive disease with renal or pulmonary compromise, and does not say whether that covers the syndrome arising without a transplant; the labels of these two drugs do not mention defibrotide, and no source read for this page says it is licensed outside a transplant. The transplant page gives the defibrotide labels' indications. A task force commissioned by EBMT published a separate position statement on prevention and treatment in adults in 2020, written for the syndrome after a transplant.",
      source: "kebriaei-2018",
      quote: "Careful attention to fluid balance is recommended for all patients regardless of VOD severity.",
    },
    {
      action: "After a transplant that follows inotuzumab ozogamicin, check liver tests at least weekly for the first month, then less often according to standard practice (US label)",
      why: "The US label gives the median time from transplant to the syndrome as 15 days, with a range of 3 to 57 days. The EU SmPC says 'closely' during the first month and gives no interval. For gemtuzumab ozogamicin the US label says to monitor liver tests frequently after a transplant, as appropriate.",
      source: "besponsa-us-label",
      quote: "For patients who proceed to HSCT, monitor liver tests at least weekly during the first month post-HSCT, then less frequently thereafter, according to standard medical practice.",
    },
    {
      action: "Tell the person and their carers to seek medical advice immediately for rapid weight gain, a swollen or painful abdomen or yellowing of the skin or eyes",
      why: "The Besponsa US label asks prescribers to tell patients this; the Mylotarg US label asks them to tell patients that the signs of liver toxicity should be monitored regularly, without the words on seeking advice. The EU package leaflets say to tell the doctor immediately (Besponsa) or right away (Mylotarg) and add pain in the upper right side of the abdomen. Macmillan tells people on inotuzumab ozogamicin to contact the hospital straight away on the 24-hour number.",
      source: "besponsa-us-label",
      quote: "Inform patients that they should seek immediate medical advice if they experience symptoms of VOD, which may include elevated bilirubin, rapid weight gain, and abdominal swelling that may be painful.",
    },
  ],
  bestInClass: {
    statement: "The dose rules are the labels', and for each drug the US and EU labels are shown side by side because they are not identical. For inotuzumab ozogamicin they agree on the tests (before and after each dose), the hold thresholds (bilirubin above 1.5 times and AST or ALT above 2.5 times the upper limit of normal), stopping for good if veno-occlusive disease occurs, and 2 cycles before a transplant with a third to be considered. They differ in that only the EU SmPC contraindicates the drug after severe or ongoing veno-occlusive disease and in serious liver disease, says dual-alkylator conditioning should be avoided, and asks for careful consideration before a transplant with raised bilirubin; only the US label sets weekly liver tests for the first month after transplant. For gemtuzumab ozogamicin they agree on tests before each dose and on discontinuing for veno-occlusive disease; the US label delays for a bilirubin or a transaminase rise and omits a dose delayed over 2 days, where the EU SmPC's table joins the thresholds with 'and' and says to consider omitting. No graded guideline that could be read addresses the liver risk of these two drugs outside a transplant. The fullest management advice is a 2018 expert panel review whose editorial support was funded by Pfizer; it is ungraded, covers inotuzumab ozogamicin only, and adds early transplant referral, daily weights, avoiding thiotepa (in its table) and liver-toxic drugs with conditioning, and ursodiol for everyone exposed. Ursodiol is unproven with these drugs: of two small retrospective studies, read as abstracts, neither found a significant fall in liver toxicity overall, though one found fewer grade 3 AST rises with it and no fewer cases of veno-occlusive disease. Defibrotide to prevent the syndrome after these drugs is also unsettled (variants). The ELN 2024 and ESMO 2024 guidance on ALL could not be read.",
    sources: ["besponsa-us-label", "besponsa-eu-smpc", "mylotarg-us-label", "mylotarg-eu-smpc", "kebriaei-2018", "mosallam-2026", "sabatino-2023"],
  },
  variants: [
    {
      name: "US label against EU SmPC: inotuzumab ozogamicin",
      differs: "Contraindications: the EU SmPC lists prior confirmed severe or ongoing veno-occlusive disease and serious ongoing hepatic disease (for example cirrhosis, nodular regenerative hyperplasia, active hepatitis); the US label says \"None\". Conditioning: the EU SmPC says regimens with 2 alkylating agents should be avoided; the US label reports them as significantly associated with the syndrome. Bilirubin at or above the upper limit before transplant: the EU SmPC asks for careful consideration of benefit and risk; the US label lists it as a risk factor. Monitoring after transplant: the US label says liver tests at least weekly in the first month; the EU SmPC says closely. Bilirubin alone: only the EU SmPC warns that it may not identify all patients at risk. Age: the EU SmPC lists age 65 or over among the subgroups in which veno-occlusive disease after transplant was reported in half or more, and age 55 or over as an associated factor; the US label says increased age. Earlier transplant: the EU SmPC asks for careful consideration before the drug is given to someone who has had a transplant.",
      evidence: "Both rest on the INO-VATE trial (164 adults given the drug) and, for children, the ITCC-059 study (53 children). Same in both: 2 cycles before a transplant with a third to be considered; liver tests before and after each dose; the hold thresholds; permanent discontinuation for veno-occlusive disease or other severe liver toxicity; the table of dose changes by length of interruption. The US text read is version 8 on DailyMed (effective 6 February 2026); the EU product information is the version the EMA lists as last updated 18 May 2026.",
      sources: ["besponsa-us-label", "besponsa-eu-smpc"],
    },
    {
      name: "US label against EU SmPC: gemtuzumab ozogamicin",
      differs: "Hold threshold: the US table reads total bilirubin above 2 times the upper limit, or AST and/or ALT above 2.5 times it; the EU table reads total bilirubin above 2 times and AST and/or ALT above 2.5 times. Delayed dose: the US label says to omit a scheduled dose delayed more than 2 days between sequential infusions; the EU SmPC says to consider omitting it. Deaths from veno-occlusive disease in ALFA-0701: the US label says three of the 6 events were fatal, the EU SmPC that 2 were. Who is treated: the US label covers newly diagnosed disease from 1 month of age and relapsed or refractory disease from 2 years; the EU licence is for previously untreated disease from 15 years, with daunorubicin and cytarabine.",
      evidence: "Same in both: liver tests before each dose; discontinuation for veno-occlusive disease, treated according to standard medical practice; the statement that bilirubin alone may not identify all patients at risk; and the risk analysis in adults given the drug alone at higher doses (8.7 times the risk with moderate or severe liver impairment beforehand, 2.6 times with a transplant before the drug, 2.9 times with a transplant after it). The US text read is version 19 on DailyMed (effective 19 December 2025); the EU product information is the version the EMA lists as last updated 17 September 2025.",
      sources: ["mylotarg-us-label", "mylotarg-eu-smpc"],
    },
    {
      name: "Ursodeoxycholic acid (ursodiol) to prevent liver toxicity on these two drugs",
      differs: "The 2018 expert panel recommends a preventive medicine such as ursodiol for everyone exposed to inotuzumab ozogamicin, and says people who develop the syndrome should continue it. Neither drug's US label or EU SmPC mentions ursodiol. The position statement of the task force commissioned by EBMT (2020) recommends ursodeoxycholic acid from the start of conditioning to day 90 after a transplant in adults, and the British guideline (2013) suggests it for prophylaxis (2C); both are written for transplants, not for these drugs given without one.",
      evidence: "The panel cites no study for the recommendation, and its editorial support was funded by Pfizer. Two retrospective studies have looked at it with these drugs, both read as abstracts only. In 82 adults given either drug outside a transplant (Mosallam 2026, first online January 2025), 87.8% had ursodiol; the authors concluded it \"is not associated with lower incidences of hepatotoxicity, SOS/VOD, or time to Grade 3 AST transaminitis, but is associated with decreased incidence of AST elevations\"; grade 3 AST rises were 20.8% with ursodiol against 60% without (p = 0.015), and the syndrome occurred in 3 patients, all given ursodiol (4.2% against 0%, not significant). The study excluded people who went on to a transplant. In 49 patients (Sabatino 2023, first online March 2022), liver toxicity occurred in 2 of 14 (14%) with ursodiol and 15 of 35 (43%) without (p=0.10), and after adjustment ursodiol did not significantly reduce it; the abstract does not report veno-occlusive disease. No randomised trial was found.",
      sources: ["kebriaei-2018", "mosallam-2026", "sabatino-2023", "ebmt-position-2020", "bsh-bsbmt-2013", "besponsa-us-label", "mylotarg-us-label"],
    },
    {
      name: "Defibrotide to prevent veno-occlusive disease at a transplant after these drugs",
      differs: "Gives defibrotide from conditioning in people who have had one of these drugs. The British guideline (2013) names prior gemtuzumab ozogamicin among the risk factors for which it recommends defibrotide prophylaxis in children (1A) and suggests it in adults (2B) having an allogeneic transplant; it does not name inotuzumab ozogamicin. The EBMT-commissioned task force (2020) says prophylaxis can be considered in adults at very high risk, defined by at least two major risk factors, of which previous gemtuzumab ozogamicin or inotuzumab ozogamicin is one. Neither drug's label mentions defibrotide.",
      evidence: "EBMT's Handbook (2024) reports that a randomised trial in 372 children and adults at high risk found no significant difference in survival free of the syndrome at day 30 (67% with defibrotide, 73% with best supportive care). The same chapter reports an earlier randomised trial in 360 high-risk children in which defibrotide cut the incidence from 20% to 12% (p = 0.049), and says the evidence on prophylaxis \"seems to be contradictory\". After inotuzumab ozogamicin the evidence is small and retrospective. In seven adults given defibrotide and ursodeoxycholic acid (Giglio 2022), the syndrome occurred in 3 and was fatal in all 3; all three had a second alkylating agent in their conditioning. In one children's centre (Paolino 2026), it occurred in 4 of 26 (15%) given defibrotide prophylaxis after inotuzumab ozogamicin and 3 of 6 (50%) not given it; one author declared honoraria from the maker of defibrotide. In the ITCC-059 paediatric trial (Iannicelli 2026, funded by Pfizer), where prophylaxis followed each centre's own guidelines, it \"did not appear to reduce SOS incidence\". The EBMT statement had an educational grant from the maker of defibrotide. The transplant page gives the regulators' position.",
      sources: ["bsh-bsbmt-2013", "ebmt-position-2020", "ebmt-handbook-2024", "giglio-2022", "paolino-2026", "iannicelli-2026"],
    },
    {
      name: "How long to leave between the last dose and a transplant",
      differs: "No label sets an interval as its own rule. Both Mylotarg labels report that the ALFA-0701 study recommended 2 months between the last dose and a transplant, although no relationship (US label; \"no definitive relationship\" in the EU SmPC) was found between the timing of a transplant and the syndrome in the analysis of higher single-agent doses. For inotuzumab ozogamicin the labels give no interval. The EBMT Handbook's chapter on adult ALL says the transplant should be scheduled ideally within 6 to 8 weeks after the start of salvage therapy. The ITCC-059 authors suggest an interval of 35 days or more from the last dose when disease control permits.",
      evidence: "ITCC-059 (children; 60 transplanted within 6 months of the last dose, 14 cases): a transplant within 35 days of the last dose was associated with more veno-occlusive disease (odds ratio 3.6, 95% CI 1.02 to 13.08), borderline in the exploratory multivariable model; the authors ask for confirmation in larger cohorts. A Spanish retrospective study of 107 adolescents and adults (abstract only) found an interval of 50 days or less independently associated with the syndrome (hazard ratio 3.15). The 2020 task force statement says a specific warning is recommended when a transplant is planned shortly after inotuzumab ozogamicin.",
      sources: ["mylotarg-us-label", "mylotarg-eu-smpc", "ebmt-handbook-all-2024", "iannicelli-2026", "balaguer-2026", "ebmt-position-2020"],
    },
    {
      name: "Conditioning after inotuzumab ozogamicin: how strongly each source words it",
      differs: "US label: conditioning with 2 alkylating agents is significantly associated with an increased risk (no instruction). EU SmPC: such regimens \"should be avoided\". Expert panel (2018): regimens containing dual alkylating agents \"should be avoided if possible\" in its text; its table says to avoid regimens containing dual alkylating agents, thiotepa, or both. EBMT Handbook, adult ALL chapter (2024): conditioning associated with significant toxicities such as veno-occlusive disease \"must be avoided\" after inotuzumab ozogamicin.",
      evidence: "INO-VATE, as the EU SmPC reports it: the syndrome in 6 of 11 (55%) people conditioned with 2 alkylating agents and 9 of 53 (17%) with one. The panel says dual alkylators were a risk factor on multivariate analysis in that trial. In ITCC-059 conditioning did not reach statistical significance as a risk factor, which its authors put down to the small number of events.",
      sources: ["besponsa-us-label", "besponsa-eu-smpc", "kebriaei-2018", "ebmt-handbook-all-2024", "iannicelli-2026"],
    },
    {
      name: "Defibrotide to treat veno-occlusive disease after gemtuzumab ozogamicin",
      differs: "The labels of both drugs say only to treat according to standard medical practice. The expert panel on inotuzumab ozogamicin refers to the EBMT position statement of 2015 and describes defibrotide as the only agent approved in the United States and European Union for the syndrome with renal or pulmonary compromise; it does not say whether that covers the syndrome arising without a transplant, and no source read for this page says defibrotide is licensed for it. A literature analysis looked at defibrotide in people who developed the syndrome after gemtuzumab ozogamicin.",
      evidence: "Richardson and Corbacioglu (2020): across the studies found, 27 of 248 people (11%) exposed to gemtuzumab ozogamicin developed the syndrome and were given defibrotide, and treatment was called successful (survival, response or both, as each study defined it) in 17 of 27 (63%); 20 of the 27 came from one dose-finding study after transplant, in which 10 (50%) were alive at day 100 after the transplant. The work was supported by Jazz Pharmaceuticals, the maker of defibrotide, which also paid for medical writing, and both authors declared ties to it. Doses, the licensed indications and bleeding precautions are on the transplant page.",
      sources: ["richardson-2020", "kebriaei-2018", "besponsa-us-label", "mylotarg-us-label"],
    },
  ],
  grades: [
    { claim: "Inotuzumab ozogamicin: 2 cycles for people going on to a transplant; a third may be considered", grade: "Regulatory label; not graded", source: "besponsa-eu-smpc", quote: "Due to the risk of VOD/SOS, for patients proceeding to HSCT, the recommended duration of treatment with inotuzumab ozogamicin is 2 cycles; a third cycle may be considered for those patients who do not achieve a CR or CRi and MRD negativity after 2 cycles (see section 4.2)." },
    { claim: "Inotuzumab ozogamicin is contraindicated in the EU after confirmed severe or ongoing veno-occlusive disease", grade: "Regulatory label (EU SmPC section 4.3); not graded", source: "besponsa-eu-smpc", quote: "Patients who have experienced prior confirmed severe or ongoing venoocclusive liver disease/sinusoidal obstruction syndrome (VOD/SOS)." },
    { claim: "Inotuzumab ozogamicin: veno-occlusive disease or other severe liver toxicity ends treatment", grade: "Regulatory label; not graded", source: "besponsa-eu-smpc", quote: "Treatment should be permanently discontinued if VOD/SOS occurs (see section 4.2)." },
    { claim: "Inotuzumab ozogamicin: the US label reports dual-alkylator conditioning and bilirubin at or above the upper limit before transplant as risk factors, without an instruction to avoid", grade: "Regulatory label (boxed warning); not graded", source: "besponsa-us-label", quote: "The risk of VOD was greater in patients who underwent HSCT after BESPONSA treatment; use of HSCT conditioning regimens containing 2 alkylating agents and last total bilirubin level ≥ upper limit of normal (ULN) before HSCT were significantly associated with an increased risk of VOD." },
    { claim: "Gemtuzumab ozogamicin: monitor frequently for veno-occlusive disease after treatment", grade: "Regulatory label (boxed warning); not graded", source: "mylotarg-us-label", quote: "Monitor frequently for signs and symptoms of VOD after treatment with MYLOTARG." },
    { claim: "Gemtuzumab ozogamicin: the EU SmPC says to consider omitting a dose delayed more than 2 days, where the US label says to omit it", grade: "Regulatory label; not graded", source: "mylotarg-eu-smpc", quote: "Consider omitting scheduled dose if delayed more than 2 days between sequential infusions." },
    { claim: "Gemtuzumab ozogamicin: the ALFA-0701 study's 2-month interval before transplant is reported, not adopted as a rule", grade: "Regulatory label; not graded", source: "mylotarg-eu-smpc", quote: "No definitive relationship was found between VOD and time of HSCT relative to higher MYLOTARG monotherapy doses, however, the ALFA-0701 study recommended an interval of 2 months between the last dose of MYLOTARG and HSCT." },
    { claim: "Limit inotuzumab ozogamicin to 2 cycles, if feasible, when a transplant is considered", grade: "Expert panel opinion (ungraded; editorial support funded by Pfizer)", source: "kebriaei-2018", quote: "In patients for whom HCT is considered, the number of InO cycles should be limited to 2, if feasible, because the rate of VOD increases with increasing cycles of InO" },
    { claim: "Avoid dual-alkylator conditioning after inotuzumab ozogamicin if possible", grade: "Expert panel opinion (ungraded; editorial support funded by Pfizer)", source: "kebriaei-2018", quote: "In addition, conditioning regimens containing dual alkylating agents (e.g., thiotepa and melphalan) should be avoided if possible, because the use of dual alkylator regimens was identified as a risk factor for developing VOD based on multivariate analysis findings in the INO-VATE study" },
    { claim: "Ursodiol or another preventive medicine for everyone exposed to inotuzumab ozogamicin", grade: "Expert panel opinion (ungraded; editorial support funded by Pfizer)", source: "kebriaei-2018", quote: "Finally, it is recommended that pharmacologic agents (e.g., ursodiol) be given to all patients exposed to InO to prevent VOD." },
    { claim: "Ursodeoxycholic acid for prophylaxis of veno-occlusive disease (written for transplants; these drugs are not named)", grade: "2C", source: "bsh-bsbmt-2013", quote: "Ursodeoxycholic acid is suggested for use in the prophylaxis of VOD (SOS) (2C)." },
    { claim: "Defibrotide prophylaxis in children having an allogeneic transplant with risk factors that include prior gemtuzumab ozogamicin", grade: "1A", source: "bsh-bsbmt-2013", quote: "Defibrotide is recommended at a dose of 6.25 mg/kg intravenously four times daily for the prevention of VOD (SOS) in children undergoing allogeneic stem cell transplantation with the following risk factors: pre-existing hepatic disease, second myeloablative transplant, allogeneic transplant for leukaemia beyond second relapse, conditioning with busulfan-containing regimens, prior treatment with gemtuzumab ozogamicin, diagnosis of primary haemophagocytic lymphohistiocytosis, adrenoleucodystrophy or osteopetrosis (1A)." },
    { claim: "Defibrotide prophylaxis in adults having an allogeneic transplant with the same risk factors, including prior gemtuzumab ozogamicin", grade: "2B", source: "bsh-bsbmt-2013", quote: "Defibrotide is suggested at a dose of 6.25 mg/kg intravenously four times daily for the prevention of VOD (SOS) in adults undergoing allogeneic stem cell transplantation with the following risk factors: pre-existing hepatic disease, second myeloablative transplant, allogeneic transplant for leukaemia beyond second relapse, conditioning with busulfan-containing regimens, prior treatment with gemtuzumab ozogamicin, diagnosis of primary haemophagocytic lymphohistiocytosis, adrenoleucodystrophy or osteopetrosis (2B)." },
    { claim: "Defibrotide prophylaxis can be considered in adults at very high risk, where previous gemtuzumab or inotuzumab ozogamicin counts as one major risk factor", grade: "Expert position of a task force commissioned by EBMT (ungraded; educational grant from Jazz Pharmaceuticals)", source: "ebmt-position-2020", quote: "DF prophylaxis can be considered in adult patients at very high risk of SOS/VOD." },
    { claim: "A specific warning when an allogeneic transplant is planned shortly after inotuzumab ozogamicin", grade: "Expert position of a task force commissioned by EBMT (ungraded; educational grant from Jazz Pharmaceuticals)", source: "ebmt-position-2020", quote: "In particular, specific warning is recommended when allo-HCT is planned shortly after inotuzumab ozogamicin salvage treatment for relapsed ALL." },
    { claim: "After inotuzumab ozogamicin, conditioning associated with veno-occlusive disease must be avoided", grade: "Handbook chapter (ungraded)", source: "ebmt-handbook-all-2024", quote: "Moreover, conditioning therapies associated with significant toxicities (e.g., SOS/VOD for patients treated with inotuzumab ozogamicin) must be avoided." },
    { claim: "Ursodiol with these two drugs outside a transplant was not associated with less liver toxicity or veno-occlusive disease, but was associated with fewer AST rises", grade: "Retrospective cohort, 82 adults (abstract)", source: "mosallam-2026", quote: "In our cohort, ursodiol prophylaxis in adults receiving GO/InO is not associated with lower incidences of hepatotoxicity, SOS/VOD, or time to Grade 3 AST transaminitis, but is associated with decreased incidence of AST elevations." },
  ],
  sources: [
    {
      key: "besponsa-us-label",
      label: "BESPONSA (inotuzumab ozogamicin) for injection: US prescribing information (manufacturer's label; SPL version 8, effective 6 February 2026)",
      publisher: "Wyeth Pharmaceuticals, a subsidiary of Pfizer (industry), on DailyMed, US National Library of Medicine",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cc7014b1-c775-411d-b374-8113248b4077",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "besponsa-eu-smpc",
      label: "Besponsa (inotuzumab ozogamicin): European product information, summary of product characteristics and package leaflet (listed by the EMA as last updated 18 May 2026)",
      publisher: "European Medicines Agency; marketing authorisation holder Pfizer (industry)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/besponsa-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "mylotarg-us-label",
      label: "MYLOTARG (gemtuzumab ozogamicin) for injection: US prescribing information (manufacturer's label; SPL version 19, effective 19 December 2025)",
      publisher: "Wyeth Pharmaceuticals, a subsidiary of Pfizer (industry), on DailyMed, US National Library of Medicine",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32fd2bb2-1cfa-4250-feb8-d7956c794e05",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "mylotarg-eu-smpc",
      label: "Mylotarg (gemtuzumab ozogamicin): European product information, summary of product characteristics and package leaflet (listed by the EMA as last updated 17 September 2025)",
      publisher: "European Medicines Agency; marketing authorisation holder Pfizer (industry)",
      year: 2025,
      url: "https://www.ema.europa.eu/en/documents/product-information/mylotarg-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "kebriaei-2018",
      label: "Management of important adverse events associated with inotuzumab ozogamicin: expert panel review (editorial support funded by Pfizer; all authors declared Pfizer advisory or consultancy roles)",
      publisher: "Bone Marrow Transplantation (Kebriaei et al.). Industry-funded: editorial support paid for by Pfizer, the maker of inotuzumab ozogamicin",
      year: 2018,
      url: "https://doi.org/10.1038/s41409-017-0019-y",
      doi: "10.1038/s41409-017-0019-y",
      gradingScheme: "Expert panel consensus from one meeting (21 February 2017); recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ebmt-position-2020",
      label: "Prophylactic, preemptive, and curative treatment for sinusoidal obstruction syndrome/veno-occlusive disease in adult patients: a position statement from an international expert group",
      publisher: "A global task force commissioned by EBMT (Bone Marrow Transplantation, Mohty et al.; 2020, first online October 2019). Supported by an unrestricted educational grant from Jazz Pharmaceuticals (industry) to the association that funded the work; all authors declared honoraria or research support from Jazz",
      year: 2020,
      url: "https://doi.org/10.1038/s41409-019-0705-z",
      doi: "10.1038/s41409-019-0705-z",
      gradingScheme: "Expert position statement; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ebmt-adult-criteria-2023",
      label: "Diagnosis and severity criteria for sinusoidal obstruction syndrome/veno-occlusive disease in adult patients: a refined classification from the European society for blood and marrow transplantation (EBMT)",
      publisher: "EBMT (Bone Marrow Transplantation, Mohty et al.). All authors declared honoraria or research support from Jazz Pharmaceuticals (industry)",
      year: 2023,
      url: "https://doi.org/10.1038/s41409-023-01992-8",
      doi: "10.1038/s41409-023-01992-8",
      gradingScheme: "Expert classification; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "ebmt-handbook-2024",
      label: "The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition, chapter 49 (Hepatic Complications)",
      publisher: "EBMT (Springer; Sureda, Corbacioglu, Greco, Kröger and Carreras, editors). A handbook of expert chapters, not a graded guideline",
      year: 2024,
      url: "https://doi.org/10.1007/978-3-031-44080-9_49",
      doi: "10.1007/978-3-031-44080-9_49",
      gradingScheme: "None: the chapter gives its authors' advice and cites the studies behind it.",
      read: "full-text",
      accessed: "2026-11-08",
    },
    {
      key: "ebmt-handbook-all-2024",
      label: "The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition, chapter 72 (Acute Lymphoblastic Leukemia in Adults)",
      publisher: "EBMT (Springer; Sureda, Corbacioglu, Greco, Kröger and Carreras, editors). A handbook of expert chapters, not a graded guideline",
      year: 2024,
      url: "https://doi.org/10.1007/978-3-031-44080-9_72",
      doi: "10.1007/978-3-031-44080-9_72",
      gradingScheme: "None: the chapter gives its authors' advice and cites the studies behind it.",
      read: "full-text",
      accessed: "2026-11-08",
    },
    {
      key: "bsh-bsbmt-2013",
      label: "BCSH/BSBMT guideline: diagnosis and management of veno-occlusive disease (sinusoidal obstruction syndrome) following haematopoietic stem cell transplantation",
      publisher: "British Committee for Standards in Haematology and British Society for Blood and Marrow Transplantation (British Journal of Haematology, Dignan et al.)",
      year: 2013,
      url: "https://doi.org/10.1111/bjh.12558",
      doi: "10.1111/bjh.12558",
      gradingScheme: "Each recommendation is printed with a number (1 or 2) and a letter (A to C), for example (1A), (2B), (2C); the abstract read does not define the scheme.",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "giglio-2022",
      label: "Defibrotide Prophylaxis of Sinusoidal Obstruction Syndrome in Adults Treated With Inotuzumab Ozogamicin Prior to Hematopoietic Stem Cell Transplantation",
      publisher: "Frontiers in Oncology (Giglio et al.). A single-centre series of seven adults; no commercial ties declared",
      year: 2022,
      url: "https://doi.org/10.3389/fonc.2022.933317",
      doi: "10.3389/fonc.2022.933317",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "paolino-2026",
      label: "Allogeneic HSCT outcomes and impact of defibrotide prophylaxis on SOS after inotuzumab in pediatric B-ALL",
      publisher: "Blood Advances (Paolino et al.). Single-centre retrospective study; one author declared honoraria from Jazz Pharmaceuticals (industry)",
      year: 2026,
      url: "https://doi.org/10.1182/bloodadvances.2026020336",
      doi: "10.1182/bloodadvances.2026020336",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "iannicelli-2026",
      label: "Sinusoidal obstruction syndrome in children with B-acute lymphoblastic leukemia (B-ALL) treated with inotuzumab ozogamicin: Results from the ITCC-059 trial (funded by Pfizer)",
      publisher: "HemaSphere (Iannicelli et al.). Sponsored by Erasmus MC and funded by Pfizer (industry)",
      year: 2026,
      url: "https://doi.org/10.1002/hem3.70448",
      doi: "10.1002/hem3.70448",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "balaguer-2026",
      label: "Timing of Allogeneic Hematopoietic Cell Transplantation after Inotuzumab Ozogamicin Influences Sinusoidal Obstruction Syndrome and Survival in Relapsed/Refractory B-Cell Acute Lymphoblastic Leukemia",
      publisher: "Transplantation and Cellular Therapy (Balaguer-Roselló et al., for the Spanish transplant group GETH-TC)",
      year: 2026,
      url: "https://doi.org/10.1016/j.jtct.2026.08.026",
      doi: "10.1016/j.jtct.2026.08.026",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "richardson-2020",
      label: "Veno-occlusive disease/sinusoidal obstruction syndrome in patients with prior gemtuzumab ozogamicin: literature analysis of survival after defibrotide treatment (supported by Jazz Pharmaceuticals)",
      publisher: "Blood Cancer Journal (Richardson and Corbacioglu). Supported by Jazz Pharmaceuticals (industry), which also funded medical writing",
      year: 2020,
      url: "https://doi.org/10.1038/s41408-020-0286-5",
      doi: "10.1038/s41408-020-0286-5",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "mosallam-2026",
      label: "Utility of ursodiol prophylaxis against sinusoidal obstruction syndrome (SOS)/veno-occlusive disease (VOD) in acute leukemia patients receiving gemtuzumab-ozogamicin (GO) or inotuzumab-ozogamicin (InO)",
      publisher: "Journal of Oncology Pharmacy Practice (Mosallam et al.; 2026, volume 32, issue 5; first online January 2025)",
      year: 2026,
      url: "https://doi.org/10.1177/10781552241313473",
      doi: "10.1177/10781552241313473",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "sabatino-2023",
      label: "Evaluation of the efficacy of ursodiol for prevention of hepatotoxicity in patients receiving gemtuzumab ozogamicin and inotuzumab ozogamicin",
      publisher: "Journal of Oncology Pharmacy Practice (Sabatino et al.; 2023, volume 29, issue 4; first online March 2022)",
      year: 2023,
      url: "https://doi.org/10.1177/10781552221084000",
      doi: "10.1177/10781552221084000",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "macmillan-inotuzumab",
      label: "Inotuzumab ozogamicin (Besponsa) (patient information, reviewed 1 October 2023)",
      publisher: "Macmillan Cancer Support",
      year: 2023,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/inotuzumab-ozogamicin",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "eln-all-2024",
      label: "Management of ALL in adults: 2024 ELN recommendations from a European expert panel",
      publisher: "European LeukemiaNet (Blood, Gökbuget et al.)",
      year: 2024,
      url: "https://doi.org/10.1182/blood.2023023568",
      doi: "10.1182/blood.2023023568",
      read: "not-reachable",
      accessed: "2026-11-18",
    },
    {
      key: "esmo-all-2024",
      label: "ESMO Clinical Practice Guideline interim update on the use of targeted therapy in acute lymphoblastic leukaemia",
      publisher: "ESMO (Annals of Oncology, Hoelzer et al.)",
      year: 2024,
      url: "https://doi.org/10.1016/j.annonc.2023.09.3112",
      doi: "10.1016/j.annonc.2023.09.3112",
      read: "not-reachable",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["inotuzumab-ozogamicin", "gemtuzumab-ozogamicin"],
  technologies: [],
  terms: ["hepatotoxicity", "conditioning-regimen", "dose-modification"],
  related: [
    "hepatic-veno-occlusive-disease-after-transplant",
    "raised-liver-enzymes-on-targeted-anticancer-drugs",
    "inotuzumab-then-transplant-caution",
    "hct-conditioning-and-engraftment-care",
    "hepatic-dose-adjustment-of-anticancer-drugs",
    "defibrotide",
    "allogeneic-hsct",
  ],
  upgrades: [],
  gaps: [
    "No graded guideline that could be read addresses liver toxicity or veno-occlusive disease on these two drugs outside a transplant. The dose rules here are the labels' and the management advice is a 2018 expert panel review on inotuzumab ozogamicin whose editorial support was funded by Pfizer and whose authors all declared Pfizer advisory or consultancy roles. No equivalent consensus for gemtuzumab ozogamicin was found.",
    "The ELN 2024 recommendations on the management of ALL in adults and the ESMO 2024 interim update on targeted therapy in ALL could not be read: the publishers returned 403 to a script and Europe PMC holds no full text. Whether either limits cycles or advises ursodeoxycholic acid with inotuzumab ozogamicin is not known here. The ELN 2022 and ESMO 2020 guidelines on AML could not be read either, so what they say about gemtuzumab ozogamicin and the liver is not on this page.",
    "Ursodeoxycholic acid with these drugs is unproven. The expert panel recommends it for everyone given inotuzumab ozogamicin without citing a study; no label mentions it; of the two retrospective studies found (82 and 49 patients, read as abstracts only) neither reported a significant fall in liver toxicity overall, one reported fewer grade 3 AST rises with it, and the one that counted veno-occlusive disease found 3 cases, all in people given ursodiol; no randomised trial was found. The EBMT task force and British recommendations for ursodeoxycholic acid are written for transplants.",
    "Defibrotide to prevent the syndrome at a transplant after these drugs is unsettled: the British guideline of 2013 (abstract only) grades it 1A in children and 2B in adults with risk factors that include prior gemtuzumab ozogamicin, the EBMT-commissioned task force (2020) says it can be considered in adults at very high risk, a later randomised trial in high-risk children and adults found no significant difference in survival free of the syndrome at day 30, and the small series after inotuzumab ozogamicin point different ways. The defibrotide labels were not re-read for this page; the transplant page sets out their indications and the European regulator's communication on prophylaxis. The British guideline is from 2013; on 18 November 2026 a Europe PMC title search found no later British guideline on veno-occlusive disease, and the British Society for Haematology's own guideline list could not be read by script.",
    "Whether defibrotide is licensed for veno-occlusive disease that arises on these drugs without a transplant is not stated by any source read for this page. The labels of the two drugs say only to treat according to standard medical practice, and the 2018 expert panel calls defibrotide the only agent approved in the United States and European Union for the syndrome with renal or pulmonary compromise without saying whether a transplant is required. The transplant page quotes the defibrotide labels.",
    "No diagnostic or severity criteria read were written for veno-occlusive disease arising on these drugs without a transplant. EBMT's refined adult criteria (2023) are written for the syndrome after haematopoietic cell transplantation and list previous use of either drug as a risk factor; the expert panel applies EBMT's approach to inotuzumab ozogamicin, citing the 2015 position statement and the revised criteria of 2016. Since then a task force commissioned by EBMT has published a position statement on prevention and treatment in adults (2020), which the 2023 paper describes as following the 2016 criteria; neither says it replaces the 2015 statement, and all are written for the syndrome after a transplant.",
    "The labels do not say how to manage a rise in transaminases alone on inotuzumab ozogamicin: the liver row of the dose table needs both bilirubin above 1.5 times and AST or ALT above 2.5 times the upper limit of normal, and the only other rule is the general one for any non-haematological toxicity of grade 2 or higher. The US label's section on hepatic impairment words the same thresholds with 'and/or' when describing limited safety information before dosing.",
    "For gemtuzumab ozogamicin the US and EU dose tables differ on whether a bilirubin rise or a transaminase rise alone delays a dose (the US table says 'or', the EU table 'and') and on whether a delayed dose is omitted or omission is considered. The two labels also give different counts of fatal veno-occlusive disease in ALFA-0701 (3 of 6 in the US label, 2 of 6 in the EU SmPC); the trial report was not read to settle it.",
    "No label sets an interval between the last dose of either drug and a transplant. The 2-month figure for gemtuzumab ozogamicin is one study's recommendation, reported by the labels alongside the finding of no definitive relationship; the 35-day and 50-day figures for inotuzumab ozogamicin come from one paediatric trial analysis with 14 events and one retrospective study read as an abstract.",
    "How often to weigh a person on inotuzumab ozogamicin is not settled even within the expert panel review: its table says daily and its text says, at a minimum, before each cycle. The labels set no schedule, and no source read gives one for gemtuzumab ozogamicin.",
    "The EBMT Handbook chapters were re-used from a copy of NCBI's open-access package saved on 8 November 2026. A fresh fetch was tried once on 18 November 2026: the publisher's chapter pages and NCBI Bookshelf both answered with a bot check, which was not bypassed, so the saved copy could not be compared with a new one. The EU product information PDFs print no revision date, so the dates given are those on the EMA medicine pages. The INO-VATE and ALFA-0701 trial reports were not read; their figures are as the labels and the expert panel give them.",
    "The patient warning rests on the Besponsa US label's counselling section (the Mylotarg US label's counselling section lists the signs without telling patients to seek advice at once), the two EU package leaflets and Macmillan's page on inotuzumab ozogamicin (reviewed October 2023, next review due October 2025, marked as being reviewed). No Macmillan or Cancer Research UK page for gemtuzumab ozogamicin was found at the addresses tried.",
  ],
});
