import { protocol } from "./helpers";

/*
 * Preventing, monitoring and treating high blood sugar caused by PI3K, AKT and mTOR inhibitors (alpelisib,
 * inavolisib, gedatolisib, capivasertib, everolimus, temsirolimus).
 *
 * What was read, and how. Written on 16 November 2026; every source was read again by an independent second reader
 * on 17 November 2026 (fetched raw with curl, tags stripped, read and searched as text; the Afinitor and Padcev label
 * files were re-used from copies other checkers fetched from DailyMed the same day):
 * - US prescribing information from DailyMed (SPL XML, full text, the current version served for each setid): Piqray
 *   (alpelisib, setid b20b4e18, version 14, effective 28 October 2026), Truqap (capivasertib, d698c106, version 14,
 *   16 September 2026), Itovebi (inavolisib, 5de59f5b, version 10, 21 April 2026), Revtorpyk (gedatolisib, 959d73ef,
 *   version 2, 19 August 2026), Afinitor (everolimus, 2150f73a, version 67, 1 June 2026), Torisel (temsirolimus,
 *   95b7dc92, version 39, 26 December 2025) and, for the variant only, Padcev (enfortumab vedotin, b5631d3e,
 *   version 18, 4 August 2026).
 * - UK Chemotherapy Board and Joint British Diabetes Societies for Inpatient Care, "The Management of Glycaemic Control
 *   in People with Cancer" (JBDS 17, January 2023): full text, the PDF from abcd.care read with pdftotext.
 * - Gallagher et al., npj Breast Cancer 2024, modified Delphi consensus on alpelisib hyperglycaemia and rash: full
 *   text, Europe PMC XML (PMC10831089). Its funding statement reads: "This study and medical editorial assistance
 *   were funded by Novartis Pharmaceuticals Corporation." Novartis makes alpelisib.
 * - Iyengar et al., npj Breast Cancer 2025, expert opinion on capivasertib monitoring and management: full text,
 *   Europe PMC XML (PMC12820357). Medical writing "funded by AstraZeneca", which makes capivasertib.
 * - Tankova et al., Cancers 2022, review of management strategies for alpelisib hyperglycaemia: full text, Europe PMC
 *   XML (PMC8997133). "Novartis provided financial support for medical writing of the manuscript."
 * - Goncalves and Farooki, Integrative Cancer Therapies 2022, review of PI3K inhibitor hyperglycaemia: full text,
 *   Europe PMC XML (PMC8793384). Financial support and medical editorial assistance from Novartis.
 * - Gambardella et al., ESMO Open 2025, safety and management of inavolisib in the phase 1 study GO39374: full text,
 *   Europe PMC XML (PMC12205636). The study "was funded by Genentech, Inc.", which makes inavolisib.
 *
 * Not found: a search of Europe PMC titles found no ESMO, ASCO, MASCC, Endocrine Society or American Diabetes
 * Association guideline on hyperglycaemia from these medicines. Every published management paper read was funded,
 * or its writing was funded, by the maker of the medicine it concerns; each is labelled so below. The UK guideline
 * (JBDS 17) is independent of manufacturers but is written for all anticancer treatment and steroids, not for this
 * drug class, and its first medicine (gliclazide) is one the manufacturer-funded papers advise against. Both are shown.
 *
 * Second reading, 17 November 2026: all 34 quotes matched their sources by script (whitespace normalised only). The
 * steps were re-scoped to the medicine whose label or paper states them, orders were softened where the source says
 * "consider", reasons no source states were replaced with what the sources say, and the gedatolisib label was
 * separated from the other three where it differs (no 3-monthly HbA1c, conditional withholding above 250 mg/dL).
 * JBDS 17 (January 2023) is still the edition on the ABCD site; Crossref lists no correction to any of the papers.
 *
 * Every DOI was resolved through Europe PMC, and again through Crossref on 17 November 2026, and its title checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed; they keep the sources' US spelling and units.
 */
export const hyperglycaemiaOnPi3kAktMtorInhibitors = protocol({
  id: "hyperglycaemia-on-pi3k-akt-mtor-inhibitors",
  name: "High blood sugar on PI3K, AKT and mTOR inhibitors: prevention, monitoring and treatment",
  aka: ["alpelisib hyperglycaemia", "capivasertib hyperglycaemia", "inavolisib hyperglycaemia", "everolimus hyperglycaemia", "PI3K inhibitor hyperglycemia", "high blood sugar on Piqray", "high blood sugar on Truqap", "high blood sugar on Itovebi", "treatment-induced hyperglycaemia", "drug-induced diabetes on targeted therapy"],
  domain: "symptom-management",
  tldr: "Medicines that block PI3K, AKT or mTOR commonly raise blood sugar, often in the first weeks. Blood sugar and HbA1c are checked before and during treatment. Metformin is usually the first treatment, and the cancer medicine may be paused or its dose lowered. Tell your team at once about great thirst, passing a lot of urine, vomiting, confusion or trouble breathing. Your own team's plan comes first.",
  simple: "These cancer medicines can push your blood sugar up. Your team tests your blood sugar before you start and often in the first weeks. If it goes up you may be given a tablet called metformin, and your cancer medicine may be stopped for a while. Tell your team straight away if you are very thirsty, passing lots of urine, being sick, confused or finding it hard to breathe.",
  summary: "Hyperglycaemia is an on-target effect of blocking insulin signalling through PI3K and AKT, and a labelled metabolic effect of mTOR inhibitors. The US labels report hyperglycaemia in 65% of patients on alpelisib (grade 3 in 33%, grade 4 in 3.9%), and raised fasting glucose in 85% on inavolisib, 37% on capivasertib with fulvestrant and 69% on capivasertib with abiraterone. The median time to onset was 15 days on alpelisib (events of grade 2 or higher), 15 days on capivasertib with fulvestrant, 71 days on capivasertib with abiraterone and 7 days on inavolisib. Ketoacidosis, including fatal cases, is in the alpelisib, capivasertib and inavolisib labels.\n\nThe alpelisib, capivasertib, inavolisib and gedatolisib labels ask for fasting glucose and HbA1c before starting, with glucose optimised first. The first three repeat HbA1c every 3 months; the gedatolisib label says at regular intervals and asks for glucose control before each infusion. Fasting glucose schedules differ by drug: alpelisib at least weekly for 2 weeks then at least every 4 weeks; inavolisib every 3 days in week 1, weekly to day 28, every 2 weeks for 8 weeks, then every 4 weeks; capivasertib on day 3 or 4 of the dosing week in weeks 1, 2, 4, 6 and 8, then monthly; everolimus before starting and annually in people without diabetes. The dose tables are written on fasting glucose: no change up to 160 mg/dL (8.9 mmol/L); above 160 to 250 mg/dL (8.9 to 13.9 mmol/L) capivasertib and inavolisib are withheld while alpelisib and gedatolisib continue; above 250 mg/dL (13.9 mmol/L) alpelisib, capivasertib and inavolisib are interrupted, and gedatolisib is withheld if a retest after hydration stays above 250 mg/dL; above 500 mg/dL (27.8 mmol/L) the drug is withheld and stopped for good if the value is confirmed on a recheck within 24 hours (alpelisib), if it persists at 24 hours or there are life-threatening effects (capivasertib), if it recurs within 30 days (inavolisib) or if it recurs (gedatolisib).\n\nThe labels do not set an order of glucose-lowering medicines, though the alpelisib label prints the metformin schedule used in SOLAR-1. Manufacturer-funded expert consensus (Gallagher 2024 for alpelisib, funded by Novartis; Iyengar 2025 for capivasertib, writing funded by AstraZeneca) puts metformin first and an SGLT2 inhibitor or a thiazolidinedione such as pioglitazone next. Iyengar advises ketone checks on an SGLT2 inhibitor; the Gallagher panel did not require them. Gallagher rates insulin and sulfonylureas as generally not appropriate first or second, noting a potential risk that insulin stimulates the PI3K pathway; the reviews by Tankova and by Goncalves and Farooki cite preclinical models in which insulin partly reactivated it; Iyengar advises avoiding insulin secretagogues because of hypoglycaemia. The UK JBDS and UK Chemotherapy Board guideline (2023), which is independent and covers all anticancer treatment, instead advises considering gliclazide 40 mg daily when plasma glucose is 12 mmol/L or more on two occasions and ruling out DKA or HHS at 20 mmol/L or more. No ESMO, ASCO or diabetes society guideline specific to these drugs was found.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage", "acute-oncology-service", "emergency-department"],
  },
  population: "Adults starting or taking a PI3K inhibitor (alpelisib, inavolisib, gedatolisib), the AKT inhibitor capivasertib, or an mTOR inhibitor (everolimus, temsirolimus) for cancer. The registration trials excluded people with type 1 diabetes, and people with type 2 diabetes that was uncontrolled (alpelisib, gedatolisib), uncontrolled or needing insulin (capivasertib), or needing any ongoing glucose-lowering treatment (inavolisib); the labels say safety in those groups has not been established or has not been studied. Checkpoint-inhibitor diabetes and steroid-induced hyperglycaemia are different problems with their own protocols. Children are not covered.",
  trigger: "One of these medicines is about to be started, or a person taking one has a raised fasting glucose or symptoms of high blood sugar.",
  steps: [
    {
      action: "Before the first dose, measure fasting glucose and HbA1c, and bring blood sugar under control first",
      why: "The labels ask for blood sugar to be optimised before the first dose. A raised fasting glucose or an HbA1c at the upper limit of normal or above is among the risk factors the alpelisib label names for high blood sugar on treatment.",
      source: "label-alpelisib",
      quote: "Before initiating treatment with PIQRAY, test fasting plasma glucose (FPG), HbA1c, and optimize blood glucose.",
    },
    {
      action: "Note who is at higher risk on alpelisib (obesity with a BMI of 30 or more, a raised fasting glucose, an HbA1c at the upper limit of normal or above, steroid treatment, or age 75 or over) and check their fasting glucose more often in the first few weeks",
      why: "The alpelisib label names these as risk factors. In SOLAR-1, grade 3 to 4 hyperglycaemia was reported in 56% of people aged 75 or over against 36% of younger people.",
      source: "label-alpelisib",
      quote: "Monitor fasting glucose more frequently for the first few weeks during treatment with PIQRAY in patients with risk factors for hyperglycemia, such as obesity (BMI ≥ 30), elevated FPG, HbA1c at the upper limit of normal or above, use of concomitant systemic corticosteroids, or age ≥ 75",
    },
    {
      action: "Ask a diabetes specialist to see anyone with type 2 diabetes, or an HbA1c from 6.5% to under 8%, before alpelisib is started",
      why: "The alpelisib panel (funded by Novartis) rated starting without this consultation as inappropriate, and the label says people with a history of diabetes may need more intensive glucose-lowering treatment.",
      source: "gallagher-2024",
      quote: "For all patients with type 2 diabetes mellitus and/or HbA1c 6.5% to <8.0%, it is inappropriate to consider alpelisib treatment without a pre-treatment endocrinology consultation.",
    },
    {
      action: "Encourage a low-carbohydrate, high-fibre diet and regular physical activity from the start, fitted to the person's needs",
      why: "The capivasertib expert group (writing funded by AstraZeneca) says dietary change plays an important role in preventing and managing high blood sugar, and that the advice should be tailored to the person, including whether they are overweight or losing weight from cancer. The alpelisib panel adds a dietitian as needed.",
      source: "iyengar-2025",
      quote: "Patients should be encouraged to follow a low-carbohydrate, high-fiber diet, engage in regular physical activity, avoid substantial weight gain, and limit alcohol consumption.",
    },
    {
      action: "Consider starting metformin before alpelisib in people at higher risk, weighing it against how well their gut is likely to tolerate it",
      why: "In one study, metformin started a week before alpelisib appeared to lower the number and severity of high blood sugar events, but nausea, vomiting and diarrhoea were more frequent and more severe. The capivasertib expert group (writing funded by AstraZeneca) also suggests considering metformin beforehand for people at raised risk.",
      source: "label-alpelisib",
      quote: "Consider premedication with metformin prior to the initiation of PIQRAY in combination with fulvestrant based on patient risk factors for hyperglycemia, gastrointestinal tolerability, and clinical situation",
    },
    {
      action: "Check fasting glucose on the schedule in that medicine's label, most often in the first weeks; for alpelisib, at least weekly for 2 weeks and then at least every 4 weeks",
      why: "In the trials the median time to the first rise was 15 days on alpelisib (grade 2 or higher) and 7 days on inavolisib.",
      source: "label-alpelisib",
      quote: "After initiating treatment with PIQRAY, monitor fasting glucose (FPG or fasting blood glucose) at least once every week for the first 2 weeks, then at least once every 4 weeks, and as clinically indicated.",
    },
    {
      action: "Repeat HbA1c every 3 months on alpelisib, capivasertib or inavolisib",
      why: "These three labels all set this interval, alongside the more frequent fasting glucose checks. The gedatolisib label says only at regular intervals.",
      source: "label-inavolisib",
      quote: "Monitor HbA1C every 3 months and as clinically indicated.",
    },
    {
      action: "Advise patients of the signs of high blood sugar, and consider fasting glucose monitoring at home for people with risk factors or whose blood sugar has risen",
      why: "The label says to advise patients of the signs and to consider home monitoring. Its patient leaflet lists thirst, a dry mouth, passing more urine, blurred vision, confusion, nausea, vomiting, fruity-smelling breath and difficulty breathing among the symptoms to tell the team about right away.",
      source: "label-capivasertib",
      quote: "Consider consultation with a healthcare practitioner with expertise in the treatment of hyperglycemia and initiation of fasting glucose monitoring at home for patients who have risk factors for hyperglycemia or who experience hyperglycemia.",
    },
    {
      action: "When fasting glucose rises on alpelisib, start or increase metformin first, building the dose up as tolerated if kidney function allows",
      why: "The panel (funded by Novartis) preferred metformin, up to 2,000 mg a day provided the GFR is above 45 mL/minute/1.73 m². The alpelisib label prints the SOLAR-1 schedule: 500 mg once daily, raised as tolerated to 500 mg twice daily, then 500 mg with breakfast and 1,000 mg with dinner, then 1,000 mg twice daily if needed.",
      source: "gallagher-2024",
      quote: "For patients who developed hyperglycemia while on alpelisib, metformin (short-acting or extended-release) is the preferred first-line anti-hyperglycemic agent.",
    },
    {
      action: "If metformin is not enough or not tolerated, the next choice is an SGLT2 inhibitor or a thiazolidinedione such as pioglitazone",
      why: "The alpelisib panel (funded by Novartis) rated either as an appropriate second or third medicine. The expert papers prefer medicines that do not act on the PI3K pathway.",
      source: "gallagher-2024",
      quote: "Either an SGLT2i or a TZD is an appropriate second- or third-line agent, or first-line therapy in metformin-intolerant patients.",
    },
    {
      action: "On an SGLT2 inhibitor, monitor for ketoacidosis with urine or blood ketone checks, and advise urgent care if symptoms of ketoacidosis appear",
      why: "The Goncalves and Farooki review (supported by Novartis) says the symptoms include nausea, vomiting and fatigue, can be mistaken for side effects of alpelisib, and can come with a normal blood sugar. The experts differ: the alpelisib panel did not require ketone monitoring and left it to the clinician.",
      source: "iyengar-2025",
      quote: "Monitor for euglycemic DKA (checking urine or blood ketone levels) in patients receiving SGLT2i, and advise urgent care if DKA symptoms appear",
    },
    {
      action: "As a rule, do not use insulin or a sulfonylurea (such as gliclazide) as the first or second glucose-lowering medicine with alpelisib; keep them as rescue treatment, unless your local guideline says otherwise",
      why: "These raise insulin in the blood. In laboratory studies insulin partly switched the PI3K pathway back on in tumour cells, and the panel warns that insulin given while alpelisib is held may cause low blood sugar. This is a caution from laboratory work and expert opinion, not from a trial in patients. The alpelisib label allows insulin for 1 to 2 days until high blood sugar resolves, the Tankova review says insulin is required for ketoacidosis, and the UK guideline for all cancer treatments uses gliclazide first (see variants).",
      source: "gallagher-2024",
      quote: "Insulin, sulfonylureas, and dipeptidyl peptidase-4 inhibitors (DPP4i) are generally not appropriate first- or second-line agents.",
    },
    {
      action: "Use fasting glucose values only when deciding whether to pause or reduce the cancer medicine, and follow the table in that medicine's label",
      why: "The alpelisib label says so in these words, and the capivasertib, inavolisib and gedatolisib tables are also written on fasting glucose.",
      source: "label-alpelisib",
      quote: "Dose modifications and management should only be based on fasting glucose values (FPG or fasting blood glucose).",
    },
    {
      action: "At a fasting glucose above 250 mg/dL (13.9 mmol/L) on alpelisib, interrupt alpelisib, add another glucose-lowering medicine to metformin, give intravenous fluids as the label directs, and ask for an endocrinology consultation",
      why: "The label and the panel (funded by Novartis) agree on holding alpelisib at this level. Capivasertib and inavolisib are also withheld; gedatolisib is withheld only if a retest stays above 250 mg/dL (see variants). In the alpelisib and inavolisib trials the median time to an improvement of at least one grade was 8 days.",
      source: "gallagher-2024",
      quote: "For patients with FBG > 250 mg/dL (first episode), the panel recommended holding alpelisib, adding another anti-hyperglycemic agent to metformin, and an endocrinology consult.",
    },
    {
      action: "At a fasting glucose above 500 mg/dL (27.8 mmol/L) on alpelisib, interrupt it, start or step up glucose-lowering treatment with intravenous hydration, recheck fasting glucose within 24 hours, and stop alpelisib for good if the value is confirmed",
      why: "This is grade 4, the top row of the label's table. The other labels differ on what follows (see variants); the inavolisib label adds an assessment for volume depletion and ketosis.",
      source: "label-alpelisib",
      quote: "If fasting glucose is confirmed at > 500 mg/dL or 27.8 mmol/L, permanently discontinue PIQRAY treatment.",
    },
    {
      action: "When ketoacidosis is suspected on capivasertib, withhold it immediately and arrange urgent assessment; stop it for good if ketoacidosis is confirmed",
      why: "The capivasertib patient leaflet says ketoacidosis needs treatment in a hospital and can lead to death, and fatal ketoacidosis is also in the alpelisib and inavolisib labels. The capivasertib expert group (writing funded by AstraZeneca) says confusion, difficulty breathing, nausea, vomiting or fruity-smelling breath need immediate medical evaluation. The UK guideline says to rule out DKA or HHS when plasma glucose is 20 mmol/L or more or there are suggestive symptoms.",
      source: "label-capivasertib",
      quote: "Withhold TRUQAP immediately when ketoacidosis is suspected. If ketoacidosis is confirmed, permanently discontinue TRUQAP.",
    },
    {
      action: "Withhold capivasertib during a suspected serious infection or other acute illness, and ask patients to tell their team before the next dose if they develop a fever, an infection or a new illness",
      why: "The label names these as situations known to raise the risk of severe high blood sugar or ketoacidosis, and its patient leaflet gives the same instruction to patients.",
      source: "label-capivasertib",
      quote: "Withhold TRUQAP in clinical situations known to increase the risk of severe hyperglycemia or ketoacidosis (e.g., suspected serious infection or acute illness).",
    },
    {
      action: "After high blood sugar on alpelisib, check fasting glucose at least twice a week until it is back to normal; while on glucose-lowering treatment, check at least weekly for 8 weeks and then every 2 weeks",
      why: "This is the alpelisib label's schedule. The capivasertib label is similar (twice weekly until back to baseline, weekly for 2 months, then every 2 weeks), and the inavolisib label restarts its starting schedule.",
      source: "label-alpelisib",
      quote: "If a patient experiences hyperglycemia after initiating treatment with PIQRAY, monitor fasting glucose as clinically indicated, and at least twice weekly until fasting glucose decreases to normal levels.",
    },
  ],
  bestInClass: {
    statement: "Two layers of guidance exist and they do not fully agree. The labels, which are the right source for monitoring and dose rules, agree on fasting glucose and HbA1c before starting with glucose optimised first, and on dose tables written on fasting glucose. The alpelisib, capivasertib and inavolisib labels set fasting glucose checks that are most frequent in the first weeks, HbA1c every 3 months, and interruption above 250 mg/dL (13.9 mmol/L); each has its own rule for stopping the medicine for good above 500 mg/dL (27.8 mmol/L), and the capivasertib label also stops it for confirmed ketoacidosis. They differ on the schedule and on grade 2: capivasertib and inavolisib are withheld above 160 mg/dL (8.9 mmol/L), alpelisib and gedatolisib are not. The gedatolisib label is lighter: HbA1c at regular intervals, glucose control before each infusion, and withholding above 250 mg/dL only if a retest stays above it. On which glucose-lowering medicine to use there is no independent, graded guideline. Expert consensus funded by the manufacturers (Gallagher 2024, funded by Novartis; Iyengar 2025, writing funded by AstraZeneca; the reviews by Tankova 2022 and Goncalves and Farooki 2022, supported by Novartis) puts metformin first, then an SGLT2 inhibitor or a thiazolidinedione such as pioglitazone, and keeps insulin and sulfonylureas out of the first lines: the alpelisib papers because raised insulin may blunt the cancer medicine, a concern that rests on preclinical models, and the capivasertib paper because insulin secretagogues can cause hypoglycaemia. The independent UK guideline for all anticancer treatment (JBDS and UK Chemotherapy Board, 2023) checks HbA1c and random glucose at baseline and random glucose at each visit, advises considering the sulfonylurea gliclazide 40 mg daily at 12 mmol/L or more on two occasions, and rules out DKA or HHS at 20 mmol/L or more; it does not address the insulin concern. Both are shown here; neither is graded.",
    sources: ["label-alpelisib", "label-capivasertib", "label-inavolisib", "label-gedatolisib", "label-everolimus", "gallagher-2024", "iyengar-2025", "tankova-2022", "goncalves-farooki-2022", "jbds-ukcb-2023"],
  },
  variants: [
    {
      name: "Capivasertib (Truqap) label schedule and dose rules",
      differs: "Fasting glucose on day 3 or 4 of the dosing week in weeks 1, 2, 4, 6 and 8, then monthly; HbA1c every 3 months. Withhold at a fasting glucose of 161 to 250 mg/dL (9 to 13.9 mmol/L) until it is 160 mg/dL or less: restart at the same dose if that takes 28 days or fewer, one dose lower if longer. At 251 to 500 mg/dL (14 to 27.8 mmol/L): withhold until it is 160 mg/dL or less; restart one dose lower if recovery takes 28 days or fewer, stop for good if longer. Above 500 mg/dL, or life-threatening effects of hyperglycaemia at any level: withhold; stop for good for life-threatening effects or if it persists at 500 mg/dL or more after 24 hours. Withhold at once when ketoacidosis is suspected and stop for good if it is confirmed.",
      evidence: "US prescribing information. In CAPItello-291 fasting glucose rose in 37% (grade 3 in 2%, grade 4 in 1.1%), with ketoacidosis in 0.3%; in CAPItello-281 with abiraterone it rose in 69% (grade 3 in 12%, grade 4 in 1.2%) and ketoacidosis occurred in 1.2%.",
      sources: ["label-capivasertib"],
    },
    {
      name: "Inavolisib (Itovebi) label schedule and dose rules",
      differs: "Fasting glucose every 3 days in the first week, weekly for the next 3 weeks, every 2 weeks for the next 8 weeks, then every 4 weeks; HbA1c every 3 months. Above 160 to 250 mg/dL (8.9 to 13.9 mmol/L): withhold until it is 160 mg/dL or less, then restart at the same dose. Above 250 to 500 mg/dL: withhold; same dose if it falls to 160 mg/dL or less within 7 days, one dose lower if that takes 8 days or more or if it recurs within 30 days. Above 500 mg/dL: withhold, assess for volume depletion and ketosis, restart one dose lower once it is 160 mg/dL or less, and stop for good if it recurs within 30 days.",
      evidence: "US prescribing information. In INAVO120 fasting glucose rose in 85% (grade 3 in 12%, grade 4 in 0.6%); 46% were treated with oral glucose-lowering medicines and 7% with insulin; median onset 7 days. The trial required an HbA1c below 6% and a fasting glucose below 126 mg/dL. In the phase 1 study (funded by Genentech) hyperglycaemia remained frequent in people with risk factors despite early metformin treatment.",
      sources: ["label-inavolisib", "gambardella-2025"],
    },
    {
      name: "Alpelisib (Piqray) label dose rules",
      differs: "No dose change up to 250 mg/dL (13.9 mmol/L); reduce by one level if a value above 160 mg/dL has not come down within 21 days of treatment. Above 250 to 500 mg/dL: interrupt; restart one dose lower if it falls to 160 mg/dL or less within 3 to 5 days; stop for good if it has not within 21 days. Above 500 mg/dL: interrupt, recheck within 24 hours, and stop for good if confirmed. The label says insulin may be used for 1 to 2 days until the hyperglycaemia resolves.",
      evidence: "US prescribing information, based on SOLAR-1: hyperglycaemia in 65%, grade 3 in 33%, grade 4 in 3.9%, ketoacidosis in 0.7%; 87% of those affected were given glucose-lowering medicines, 76% metformin. In METALLICA, metformin started 7 days before alpelisib gave grade 3 to 4 hyperglycaemia in 2.1% of people with normal blood sugar and 15% of those with impaired blood sugar, with more nausea, vomiting and diarrhoea.",
      sources: ["label-alpelisib"],
    },
    {
      name: "Gedatolisib (Revtorpyk) label dose rules",
      differs: "Given by infusion; glucose control is to be achieved before each infusion, and home monitoring started for an HbA1c above 6.4%. No dose change up to 250 mg/dL (13.9 mmol/L). At 251 to 500 mg/dL: hydrate and retest; withhold if it remains above 250 mg/dL. Above 500 mg/dL: withhold, restart one dose lower once below 250 mg/dL, and stop for good if it recurs.",
      evidence: "US prescribing information. In VIKTORIA-1 fasting glucose rose in 46% with fulvestrant and palbociclib and 57% with fulvestrant, grade 3 in 0.9% and 1.8%. The trial excluded an HbA1c above 6.4%.",
      sources: ["label-gedatolisib"],
    },
    {
      name: "mTOR inhibitors (everolimus, temsirolimus)",
      differs: "Lighter monitoring and no glucose-specific dose table. Everolimus: fasting glucose before starting and annually in people without diabetes, more often in people with diabetes; withhold for a grade 3 metabolic event until it improves to grade 2 or less and restart at half the dose, and stop for good for grade 4; the label's table gives no step for grade 1 or 2. Temsirolimus: test serum glucose before and during treatment; an increase in, or start of, insulin or oral glucose-lowering treatment may be needed.",
      evidence: "US prescribing information. Everolimus: hyperglycaemia as a laboratory finding in up to 75%; the label gives grade 3 and grade 4 rates of up to 15% and up to 0.4% for hyperglycaemia, raised cholesterol and raised triglycerides together. Temsirolimus: 89% had at least one raised glucose and 26% reported hyperglycaemia as an adverse event. The consensus papers on choice of glucose-lowering medicine were written for alpelisib and capivasertib, not for mTOR inhibitors.",
      sources: ["label-everolimus", "label-temsirolimus"],
    },
    {
      name: "UK pathway for all anticancer treatment: random glucose at each visit and gliclazide first",
      differs: "Baseline HbA1c and random plasma glucose for everyone starting anticancer treatment, random glucose at each visit, a blood glucose meter for those at high risk, gliclazide 40 mg in the morning when glucose is 12 mmol/L or more on two occasions (its summary says 'consider commencing'; the dose may be increased in 40 mg steps), and exclusion of DKA or HHS at 20 mmol/L or more or with suggestive symptoms. It lists everolimus, temsirolimus and alpelisib among the medicines that raise blood sugar but has no pathway specific to them, and does not discuss insulin-raising medicines and PI3K inhibitors.",
      evidence: "Consensus expert opinion of a UK Chemotherapy Board and JBDS working party (January 2023), independent of manufacturers and ungraded. Its gliclazide recommendation was developed from steroid-induced hyperglycaemia guidance.",
      sources: ["jbds-ukcb-2023"],
    },
    {
      name: "Very low carbohydrate (ketogenic) diet or fasting before each dose",
      differs: "Carbohydrate under 50 g a day, or more than 12 hours without food before each dose, in place of a low-carbohydrate diet of 60 to 130 g a day.",
      evidence: "The alpelisib Delphi panel (funded by Novartis) rated a low-carbohydrate diet as appropriate for all patients and said a ketogenic diet or pre-dose fasting 'may also be appropriate'; the capivasertib expert opinion suggests a ketogenic diet 'if needed'. The Tankova review (writing funded by Novartis) advises against it until there are safety data, noting that urine ketones on such a diet may be mistaken for ketoacidosis. No completed randomised trial was read.",
      sources: ["gallagher-2024", "iyengar-2025", "tankova-2022"],
    },
    {
      name: "Enfortumab vedotin (a different medicine and mechanism)",
      differs: "The antibody-drug conjugate enfortumab vedotin also causes hyperglycaemia and ketoacidosis, in people with and without diabetes. Its label has one rule: withhold when blood glucose is above 250 mg/dL and restart at the same dose once it is 250 mg/dL or less, with close glucose monitoring in people with or at risk of diabetes. The advice above on metformin first and on avoiding insulin was not written for it; in its trials 5% of patients needed insulin.",
      evidence: "US prescribing information: hyperglycaemia in 17% of 720 patients on single-agent treatment, grade 3 to 4 in 7%, with one death from hyperglycaemia and one from ketoacidosis.",
      sources: ["label-enfortumab-vedotin"],
    },
  ],
  grades: [
    { claim: "Fasting glucose and HbA1c before starting, with blood sugar optimised (alpelisib, capivasertib, inavolisib, gedatolisib labels)", grade: "Regulatory label; not graded", source: "label-inavolisib", quote: "Before initiating treatment with ITOVEBI, test fasting glucose levels (FPG or FBG), HbA1C levels, and optimize fasting glucose." },
    { claim: "Capivasertib monitoring schedule", grade: "Regulatory label; not graded", source: "label-capivasertib", quote: "After initiating treatment with TRUQAP, monitor or self-monitor fasting glucose levels on Day 3 or 4 of the dosing week during weeks 1, 2, 4, 6 and 8; then monthly while on treatment with TRUQAP; and as clinically indicated." },
    { claim: "Inavolisib monitoring schedule", grade: "Regulatory label; not graded", source: "label-inavolisib", quote: "monitor or self-monitor fasting glucose levels once every 3 days for the first week (Day 1 to 7), then once every week for the next 3 weeks (Day 8 to 28), then once every 2 weeks for the next 8 weeks, then once every 4 weeks thereafter, and as clinically indicated." },
    { claim: "Everolimus monitoring: fasting glucose before starting and annually in people without diabetes", grade: "Regulatory label; not graded", source: "label-everolimus", quote: "In non-diabetic patients, monitor fasting serum glucose prior to starting AFINITOR/AFINITOR DISPERZ and annually thereafter." },
    { claim: "Temsirolimus: glucose before and during treatment", grade: "Regulatory label; not graded", source: "label-temsirolimus", quote: "Serum glucose should be tested before and during treatment with TORISEL." },
    { claim: "Gedatolisib: glucose controlled before each infusion", grade: "Regulatory label; not graded", source: "label-gedatolisib", quote: "Achieve optimal glucose control before starting each REVTORPYK infusion" },
    { claim: "Metformin beforehand appeared to lower hyperglycaemia and raised gut side effects (alpelisib)", grade: "Regulatory label; not graded", source: "label-alpelisib", quote: "In the METALLICA study, use of metformin starting 7 days prior to the initiation of PIQRAY appeared to decrease the incidence and severity of hyperglycemia events, but increased the incidence and severity of nausea, vomiting, and diarrhea adverse reactions" },
    { claim: "Prophylactic metformin for a baseline HbA1c of 5.7 to 6.4% (alpelisib)", grade: "Expert consensus (modified Delphi, funded by Novartis): recommended; not otherwise graded", source: "gallagher-2024", quote: "Prophylactic metformin (short-acting or extended-release) is recommended for all patients with baseline HbA1c of 5.7–6.4%, and it may be appropriate for patients with HbA1c < 5.7%." },
    { claim: "Metformin first line for alpelisib hyperglycaemia", grade: "Expert consensus (modified Delphi, funded by Novartis): preferred; not otherwise graded", source: "gallagher-2024" },
    { claim: "Insulin and sulfonylureas not first or second line with alpelisib", grade: "Expert consensus (modified Delphi, funded by Novartis): generally not appropriate", source: "gallagher-2024" },
    { claim: "Insulin last line with PI3K inhibitors, because of pathway reactivation in cell lines", grade: "Narrative review (supported by Novartis); not graded", source: "goncalves-farooki-2022", quote: "In PI3Ki-associated hyperglycemia, insulin should only be recommended as a last-line antihyperglycemic agent." },
    { claim: "Sulfonylureas avoided as primary treatment; insulin or sulfonylureas acceptable as rescue", grade: "Narrative review (writing funded by Novartis); not graded", source: "tankova-2022", quote: "Insulin therapy, and/or subsequent sulfonylureas, are acceptable as rescue therapy, but only after treatment with more suitable hypoglycemic agents has proven insufficient." },
    { claim: "Avoid insulin secretagogues with capivasertib; consider metformin beforehand for those at raised risk", grade: "Expert opinion (writing funded by AstraZeneca); not graded", source: "iyengar-2025", quote: "start metformin or escalate existing dose and add other agents to treat hyperglycemia, as needed, while avoiding insulin secretagogues, which can cause hypoglycemia." },
    { claim: "Gliclazide 40 mg when glucose is 12 mmol/L or more on two occasions, for people starting any anticancer treatment", grade: "Consensus expert opinion (JBDS and UK Chemotherapy Board); not graded", source: "jbds-ukcb-2023", quote: "Consider commencing gliclazide 40 mg daily if plasma glucose ≥12 mmol/L on 2 occasions." },
    { claim: "Baseline HbA1c and random glucose for all people starting anticancer treatment", grade: "Consensus expert opinion (JBDS and UK Chemotherapy Board); not graded", source: "jbds-ukcb-2023", quote: "All oncology patients should have a baseline HbA1c and random plasma glucose checked prior to commencing anti-cancer therapy or steroids." },
    { claim: "Ketoacidosis can occur with a near-normal glucose", grade: "Consensus expert opinion (JBDS and UK Chemotherapy Board); not graded", source: "jbds-ukcb-2023", quote: "It is important to be aware that DKA can occur with relatively low glucose concentrations so-called euglycemic DKA (euDKA)" },
    { claim: "A ketogenic diet should not be recommended yet", grade: "Narrative review (writing funded by Novartis); not graded", source: "tankova-2022", quote: "Therefore, it should not be recommended for people before more data on the safety of such an approach are available." },
    { claim: "Enfortumab vedotin: withhold above 250 mg/dL", grade: "Regulatory label; not graded", source: "label-enfortumab-vedotin", quote: "Withhold until elevated blood glucose has improved to ≤250 mg/dL, then resume treatment at the same dose level." },
  ],
  sources: [
    {
      key: "label-alpelisib",
      label: "Piqray (alpelisib) tablets: US prescribing information, sections 2.3, 5.3 and 6.1",
      publisher: "Novartis, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b20b4e18-7a4b-4500-a08f-06c6dab0ee5b",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-capivasertib",
      label: "Truqap (capivasertib) tablets: US prescribing information, sections 2.5 and 5.1",
      publisher: "AstraZeneca, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d698c106-2322-401e-b738-cbd83c843ecf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-inavolisib",
      label: "Itovebi (inavolisib) tablets: US prescribing information, sections 2.4 and 5.1",
      publisher: "Genentech, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5de59f5b-e5db-410f-b692-658686ef4107",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-gedatolisib",
      label: "Revtorpyk (gedatolisib) for injection: US prescribing information, sections 2.4 and 5.3",
      publisher: "Celcuity, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=959d73ef-831f-4005-956c-210702270bda",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-everolimus",
      label: "Afinitor and Afinitor Disperz (everolimus): US prescribing information, sections 2.9 and 5.9",
      publisher: "Novartis, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2150f73a-179b-4afc-b8ce-67c85cc72f04",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-temsirolimus",
      label: "Torisel (temsirolimus) injection: US prescribing information, section 5.3",
      publisher: "Wyeth (Pfizer), via DailyMed (US National Library of Medicine)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=95b7dc92-2180-42f1-8699-3c28f609e674",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "label-enfortumab-vedotin",
      label: "Padcev (enfortumab vedotin-ejfv) for injection: US prescribing information, sections 2.2 and 5.2",
      publisher: "Seagen, via DailyMed (US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5631d3e-4604-4363-8f20-11dfc5a4a8ed",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "jbds-ukcb-2023",
      label: "The Management of Glycaemic Control in People with Cancer: guidance for the oncology and diabetes multidisciplinary team (JBDS 17)",
      publisher: "UK Chemotherapy Board and Joint British Diabetes Societies for Inpatient Care",
      year: 2023,
      url: "https://abcd.care/sites/default/files/site_uploads/JBDS_Guidelines_Current/JBDS_17_Oncology_Guideline_with_QR_code_January_2023.pdf",
      gradingScheme: "Not graded: the guideline describes its recommendations as based on consensus expert opinion.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gallagher-2024",
      label: "Managing hyperglycemia and rash associated with alpelisib: expert consensus recommendations using the Delphi technique (study and medical editorial assistance funded by Novartis)",
      publisher: "npj Breast Cancer (Gallagher et al.); funded by Novartis Pharmaceuticals Corporation",
      year: 2024,
      url: "https://doi.org/10.1038/s41523-024-00613-x",
      doi: "10.1038/s41523-024-00613-x",
      gradingScheme: "Modified Delphi: a ten-member US panel (four oncologists, four endocrinologists, a clinical pharmacist and a patient advocate) rated each intervention 1 to 9; a median of 7 to 9 is 'appropriate', 4 to 6 'may or may not be appropriate', 1 to 3 'inappropriate', with disagreement recorded separately. No evidence levels.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "iyengar-2025",
      label: "Optimizing clinical monitoring and management guidelines for capivasertib in HR-positive/HER2-negative advanced breast cancer: expert opinion (medical writing funded by AstraZeneca)",
      publisher: "npj Breast Cancer (Iyengar et al.); medical writing and editorial assistance funded by AstraZeneca",
      year: 2025,
      url: "https://doi.org/10.1038/s41523-025-00864-2",
      doi: "10.1038/s41523-025-00864-2",
      gradingScheme: "Expert opinion; recommendations are numbered, not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "tankova-2022",
      label: "Management Strategies for Hyperglycemia Associated with the α-Selective PI3K Inhibitor Alpelisib for the Treatment of Breast Cancer (medical writing funded by Novartis)",
      publisher: "Cancers (Tankova et al.); medical writing and publication charge funded by Novartis",
      year: 2022,
      url: "https://doi.org/10.3390/cancers14071598",
      doi: "10.3390/cancers14071598",
      gradingScheme: "Narrative review by an expert group; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "goncalves-farooki-2022",
      label: "Management of Phosphatidylinositol-3-Kinase Inhibitor-Associated Hyperglycemia (financial support and medical editorial assistance from Novartis)",
      publisher: "Integrative Cancer Therapies (Goncalves and Farooki); supported by Novartis Pharmaceuticals Corporation",
      year: 2022,
      url: "https://doi.org/10.1177/15347354211073163",
      doi: "10.1177/15347354211073163",
      gradingScheme: "Narrative review; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "gambardella-2025",
      label: "Safety overview and management of inavolisib alone and in combination therapies in PIK3CA-mutated, HR-positive, HER2-negative advanced breast cancer (GO39374) (study funded by Genentech)",
      publisher: "ESMO Open (Gambardella et al.); study funded by Genentech",
      year: 2025,
      url: "https://doi.org/10.1016/j.esmoop.2025.105303",
      doi: "10.1016/j.esmoop.2025.105303",
      gradingScheme: "Phase 1 trial safety report; not a guideline and not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["alpelisib", "inavolisib", "gedatolisib", "capivasertib", "everolimus", "temsirolimus"],
  targets: ["pik3ca", "akt", "mtor"],
  terms: ["hyperglycaemia"],
  related: ["irae-diabetes", "enfortumab-vedotin", "iodinated-contrast-kidney-and-metformin"],
  gaps: [
    "No ESMO, ASCO, MASCC, Endocrine Society or American Diabetes Association guideline specific to hyperglycaemia from PI3K, AKT or mTOR inhibitors was found. Every management paper read was funded, or its writing was funded, by the maker of the medicine it concerns.",
    "The advice to keep insulin and sulfonylureas for later rests on preclinical models in which raised insulin partly reactivated the PI3K pathway, and on expert opinion. No trial read shows that the choice of glucose-lowering medicine changes how well the cancer treatment works. The independent UK guideline starts a sulfonylurea first and does not discuss the question.",
    "No randomised trial of an SGLT2 inhibitor, pioglitazone or a ketogenic diet for this problem was read. The Gallagher paper names an ongoing trial (TIFA, NCT05090358) of ketogenic diet, low-carbohydrate diet or an SGLT2 inhibitor; its results were not looked for.",
    "The experts disagree on ketone checks with an SGLT2 inhibitor: the alpelisib Delphi panel did not require them, while the capivasertib expert opinion and the Goncalves and Farooki review advise them.",
    "The gedatolisib label sets no interval for fasting glucose or HbA1c during treatment beyond 'at regular intervals' and glucose control before each infusion, and no label read gives a time limit in hours for acting on symptoms: the alpelisib, capivasertib, inavolisib and gedatolisib labels say to contact the healthcare provider immediately.",
    "On 17 November 2026 every source was read again as raw text and no newer edition of the UK guideline or of any of the five papers was found; Crossref lists no correction to any of them. The label figures are from the versions DailyMed served that day.",
    "Only US labels were read. The European product information (EMA) may set different monitoring schedules and was not read, and the label thresholds are printed in mg/dL with mmol/L conversions as the labels give them.",
    "The trials excluded people with type 1 diabetes and with uncontrolled or insulin-treated type 2 diabetes, and the inavolisib and gedatolisib trials excluded most people with any raised HbA1c, so there is little evidence for the people most at risk. The Delphi panel left out any recommendation for an HbA1c of 8% or more.",
    "The mTOR inhibitor labels give little detail (everolimus: annual fasting glucose in people without diabetes; temsirolimus: test before and during treatment), and the consensus papers do not cover them. A French expert proposal on everolimus metabolic effects in neuroendocrine tumours (Lombard-Bohas et al., Bull Cancer 2014) was found by title only and not read.",
    "The UK guideline lists idelalisib and several other targeted medicines as raising blood sugar; they are not covered here because no label was read for them.",
    "Rugo et al., Ann Oncol 2020 (time course and management of adverse events in SOLAR-1) was not read; the SOLAR-1 figures here are from the alpelisib label.",
  ],
});
