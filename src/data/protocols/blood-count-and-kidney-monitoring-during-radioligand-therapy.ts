import { protocol } from "./helpers";

/*
 * Blood count, kidney and liver monitoring during radioligand therapy with lutetium-177 dotatate (Lutathera) and
 * lutetium-177 vipivotide tetraxetan (Pluvicto): the tests before each dose, the amino acid infusion given with
 * lutetium-177 dotatate, and the rules for delaying, reducing or stopping treatment.
 *
 * Written 18 November 2026. What was read, and how (every source as raw text; saved copies and a per-source list are
 * in /tmp/se-protocols-2/radioligand/text and SOURCES.md):
 * - Lutathera US prescribing information: DailyMed SPL XML, set id 72d1a024-00b7-418a-b36e-b2cb48f2ab55, SPL version
 *   12 published 16 January 2026 (the label's own "recent major changes" are dated 4/2024). Copy fetched the same day
 *   from DailyMed by the writer of second-cancers-after-anticancer-drug-treatment, re-used; DailyMed's history
 *   endpoint was checked on 18 November 2026 and version 12 is the latest.
 * - Lutathera EU product information (SmPC and package leaflet): EMA PDF through pdftotext -layout; the PDF prints no
 *   revision date, the file is dated August 2026. Same-day copy from the same writer, re-used.
 * - Pluvicto US prescribing information: DailyMed SPL XML, set id 14908037-2892-4d98-a053-253ce35afb1a, SPL version 5
 *   published 13 August 2026 (history endpoint checked; latest). Same-day copy from the writer of
 *   dry-mouth-from-cancer-drugs-and-radionuclide-therapy, re-used.
 * - Pluvicto EU product information (SmPC and package leaflet): EMA PDF through pdftotext -layout; no revision date
 *   printed, PDF created 16 June 2026, modified 16 July 2026. Same-day copy from the dry mouth writer, re-used.
 * - NANETS/SNMMI procedure standard for 177Lu-DOTATATE (Hope et al., J Nucl Med 2019): full text. The journal HTML
 *   copy saved the same day by the second-cancers writer was re-used; it lacks the tables, so the PubMed Central page
 *   (PMC12079155) was fetched as well and appended to the same text file under a marker line. Europe PMC's full-text
 *   endpoint returned 500 for this article. No funding or disclosure statement is in either text.
 * - Joint IAEA, EANM and SNMMI practical guidance on PRRNT (Bodei et al., EJNMMI 2013): full text, Europe PMC
 *   full-text XML (PMC3622744). An erratum exists (PMC4079671; read by the second reader). No later joint edition was found by a
 *   Europe PMC title search on 18 November 2026. Compiled "under the auspices and support of the IAEA".
 * - Joint EANM/SNMMI procedure guideline for 177Lu-PSMA therapy (Kratochwil et al., EJNMMI 2023): full text, Europe
 *   PMC full-text XML (PMC10317889), same-day copy from the dry mouth writer re-used. Several authors declare
 *   inventorship of PSMA-617 or consultancy for its manufacturer; the source's publisher field says so.
 * - Galician (GGNET) Delphi consensus on PRRT (Martinez-Lago et al., Clin Transl Oncol 2026): full text, Europe PMC
 *   full-text XML (PMC13499722). Its funding statement says Novartis Pharmaceuticals, the maker of both products,
 *   "provided financial support for this work by facilitating the meeting of the authors"; the page labels it so
 *   wherever it is used, and no step rests on it.
 *
 * Not read:
 * - ENETS consensus guideline on PRRT (Hicks et al., Neuroendocrinology 2017, doi 10.1159/000475526, title checked
 *   through Crossref): Karger answered 403 to a script and Europe PMC lists it as subscription only. Named in
 *   sources as not reachable; nothing rests on it.
 *
 * Actinium-225 agents are investigational. No label or procedure guideline read gives a monitoring or dose rule for
 * them, so they are not in `drugs`; `gaps` says so.
 *
 * Second reader, 18 November 2026. Every source but the unreachable ENETS guideline was fetched again into
 * /tmp/se-protocols-2/reader-blood-count-and-kidney-monitoring-during-radioligand-therapy: both US labels as DailyMed
 * SPL XML (history endpoint: Lutathera version 12 and Pluvicto version 5 are still the latest), both EU PDFs from the
 * EMA (byte-identical text to the writer's copies) converted with pdftotext -layout and plain pdftotext, the three
 * society documents and the Delphi paper from Europe PMC full-text XML, the NANETS/SNMMI tables from the PubMed
 * Central page, and the 2013 erratum (author order and one name only). All 36 quotes verified by script against the
 * re-fetched texts. Both EU dose tables were read in both conversions and every figure placed in its row. Changed: the
 * Pluvicto kidney row no longer joins the creatinine rise and the clearance figure with "or" (neither label prints a
 * conjunction); the EU supportive-care wording is tied to its grade 2 row; the 2013 platelet and white cell figures are
 * shown as that document's contraindication values; the 2013 grade row now quotes the blood count sentence; "at least"
 * restored to the EANM/SNMMI timing; smaller wording fixes in two variants, population and gaps. The US Lutathera
 * sections 2 and 5 were read in full and hold no potassium instruction.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed. Sentences holding superscripts that the PDF text flattens (the
 * platelet and neutrophil counts printed as "x 109/L") are not quoted; those figures are given in prose.
 */
export const bloodCountAndKidneyMonitoringDuringRadioligandTherapy = protocol({
  id: "blood-count-and-kidney-monitoring-during-radioligand-therapy",
  name: "Blood count, kidney and liver monitoring during lutetium-177 radioligand therapy",
  aka: [
    "blood tests before Lutathera",
    "blood tests before Pluvicto",
    "low blood counts on Lutathera",
    "low blood counts on Pluvicto",
    "myelosuppression on radioligand therapy",
    "lymphopenia on lutetium-177",
    "kidney protection with amino acids during PRRT",
    "lysine and arginine infusion",
    "Lutathera dose reduction",
    "Pluvicto dose reduction",
    "renal toxicity of lutetium-177",
    "hyperkalaemia with the amino acid infusion",
  ],
  domain: "supportive-care",
  tldr: "Lutetium-177 treatments (Lutathera, Pluvicto) can lower blood counts and affect the kidneys and liver. Blood is tested before every dose, and a dose may be delayed, reduced or stopped if results fall too far. With Lutathera, an amino acid drip protects the kidneys. Tell your team right away about bleeding, bruising, fever or passing much less urine. Your own team's plan comes first.",
  simple: "These treatments can lower your blood cells and strain your kidneys. You have blood tests before each dose. If a result is too low, the next dose may wait, be made smaller, or not be given. With Lutathera you also have a drip that protects your kidneys. Drink plenty and pass urine often. Tell your team right away if you bleed or bruise easily, get a fever, or pass much less urine.",
  summary: "This page sets the US labels beside the EU product information for two radioligand medicines, with the nuclear medicine societies' procedure documents. It is for understanding care; the treating team's own protocol comes first. Lutetium-177 dotatate: the EU SmPC lists minimum tests before each infusion (haemoglobin, white cells with differential, platelets; serum creatinine and Cockcroft-Gault clearance; ALT, AST, albumin, INR, bilirubin), once in the 2 to 4 weeks before and shortly before, then every 4 weeks for at least 3 months after the last infusion and every 6 months thereafter; the US label says to monitor the same things and gives no schedule. The dose table is the same in both: thrombocytopenia from grade 2, anaemia or neutropenia from grade 3, creatinine clearance below 40 mL/min or a 40% change from baseline, and bilirubin above 3 times the upper limit of normal or albumin below 30 g/L with INR above 1.5 each mean withholding, resuming at 3.7 GBq, returning to 7.4 GBq if tolerated, and stopping for good on recurrence or if the interval would pass 16 weeks. Lymphopenia alone needs no dose change. An infusion of L-lysine and L-arginine starts 30 minutes before the dose; only the EU text requires serum potassium to be tested before it. Lutetium-177 vipivotide tetraxetan: grade 2 myelosuppression withholds; grade 3 or higher withholds and reduces by 20% to 5.9 GBq, once, with no return to full dose. The clearance threshold for withholding is below 30 mL/min in the US label and below 50 mL/min in the EU SmPC. The EANM/SNMMI guideline words several of these rules differently.",
  asOf: "2026-11-18",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home", "telephone-triage"],
  },
  population: "People having lutetium-177 dotatate (Lutathera) for somatostatin receptor-positive gastroenteropancreatic neuroendocrine tumours, or lutetium-177 vipivotide tetraxetan (Pluvicto) for PSMA-positive metastatic prostate cancer. The US label for lutetium-177 dotatate includes patients aged 12 years and older; the EU SmPC says safety and efficacy below 18 years have not been established and makes no dosing recommendation. None of the four texts has studied severe kidney impairment (creatinine clearance below 30 mL/min) or end-stage kidney disease, and the EU SmPC for lutetium-177 vipivotide tetraxetan has not studied a baseline clearance below 50 mL/min. The rules here are those of the two licensed products: they do not cover actinium-225 agents, other lutetium-177 products, radium-223 or radioactive iodine.",
  trigger: "Before the first dose, before every later dose, between doses, and in the months after the last dose; and whenever a person on treatment reports bleeding, bruising, signs of infection, unusual tiredness or breathlessness, or passing much less urine.",
  steps: [
    {
      action: "Before each lutetium-177 dotatate infusion, check a blood count with differential, serum creatinine with creatinine clearance, and ALT, AST, albumin, INR and bilirubin",
      why: "The EU SmPC calls these the minimum laboratory tests needed before each infusion, used to adapt the dose, the interval or the number of infusions. The US label says to monitor blood cell counts, creatinine and creatinine clearance, and transaminases, bilirubin, albumin and INR, without stating when. The NANETS/SNMMI standard says typically 2 weeks before each cycle.",
      source: "lutathera-eu-smpc",
      quote: "These laboratory tests should be performed at least once in the 2 to 4 weeks prior to administration, and shortly before administration.",
    },
    {
      action: "Before and during lutetium-177 vipivotide tetraxetan, check a blood count and kidney function; the EU SmPC lists liver tests as well",
      why: "The EU SmPC lists haemoglobin, white cell, neutrophil and platelet counts, serum creatinine with calculated creatinine clearance, and ALT, AST, alkaline phosphatase, albumin and bilirubin, and says dosing may need to be modified on the results. The US label asks for complete blood counts and kidney function tests before and during treatment and does not list liver tests. Neither says how often. The EANM/SNMMI guideline asks for results no older than 5 days before each cycle.",
      source: "pluvicto-eu-smpc",
      quote: "Laboratory tests should be performed before and during treatment with Pluvicto.",
    },
    {
      action: "Check the results against the starting limits of the product information in force where the patient is treated, because the US and EU texts differ",
      why: "For lutetium-177 dotatate the EU SmPC contraindicates treatment when creatinine clearance is below 30 mL/min, does not recommend it below 40 mL/min, and does not recommend it with haemoglobin below 8 g/dL, platelets below 75 x 10^9/L or leukocytes below 2 x 10^9/L unless this is solely due to lymphopenia. The US label lists no contraindications and says no dose adjustment is recommended for mild to moderate kidney impairment. For lutetium-177 vipivotide tetraxetan the EU SmPC does not recommend treatment when baseline clearance is below 50 mL/min, because such patients have not been studied; the US label recommends no dose adjustment for clearance of 30 to 89 mL/min.",
      source: "lutathera-eu-smpc",
      quote: "Treatment with Lutathera in patients with baseline creatinine clearance <40 mL/min (using Cockcroft-Gault formula) is not recommended.",
    },
    {
      action: "Under the EU SmPC, test serum potassium before each amino acid infusion given with lutetium-177 dotatate, and correct a high level before the infusion starts",
      why: "The EU SmPC says potassium may rise for a time in people given arginine and lysine, usually returning to normal within 24 hours from the start of the infusion, and that people with reduced creatinine clearance may be at increased risk. Where there was clinically significant hyperkalaemia beforehand, it requires a second test to confirm it has been corrected. The US label read contains no instruction to test potassium.",
      source: "lutathera-eu-smpc",
      quote: "Serum potassium levels must be tested before each administration of amino acid solution.",
    },
    {
      action: "With lutetium-177 dotatate, start the L-lysine and L-arginine infusion 30 minutes before the dose, after an antiemetic, and do not lower the amino acid dose when the lutetium dose is reduced",
      why: "Both labels say the amino acids decrease reabsorption of the medicine through the proximal tubules and so the radiation dose to the kidneys; the EU SmPC reports a mean reduction in kidney radiation exposure of about 47% when the infusion runs over 4 hours. The US label continues it during the dose and for at least 3 hours after; the EU SmPC gives it over 4 hours. Both specify 18 to 25 g each of L-lysine hydrochloride and L-arginine hydrochloride in 1 to 2 L with osmolality below 1200 mOsmol/kg, and both say not to decrease it when the lutetium dose is reduced. The EU SmPC prefers a compounded solution of the two amino acids alone, for its lower volume and osmolality.",
      source: "lutathera-us-label",
      quote: "Initiate an intravenous infusion of a sterile amino acid solution containing L-lysine and L-arginine (Table 1) 30 minutes before the start of the LUTATHERA infusion.",
    },
    {
      action: "Monitor vital signs during the amino acid infusion and watch for symptoms of high potassium; where potassium was significantly raised beforehand, the EU SmPC asks for an ECG before discharge",
      why: "The EU SmPC names breathlessness, weakness, numbness, chest pain and heart rhythm changes as signs of hyperkalaemia. If symptoms develop during the infusion it says appropriate corrective measures must be taken, and that for severe symptomatic hyperkalaemia stopping the amino acid infusion should be considered, weighing kidney protection against the acute risk. It also asks for care in severe heart failure (NYHA class III or IV) because of the volume infused.",
      source: "lutathera-eu-smpc",
      quote: "Vital signs should be monitored during the infusion regardless of baseline serum potassium levels.",
    },
    {
      action: "Advise the person to drink plenty and pass urine often before, on the day of and the day after each dose",
      why: "The US label for lutetium-177 dotatate gives this advice in its kidney toxicity warning; the EU SmPC suggests, for example, one glass of water every hour and says this also helps clear excess potassium. Both texts for lutetium-177 vipivotide tetraxetan advise staying well hydrated and urinating frequently before and after the dose. The EANM/SNMMI guideline says hydration should be ensured by intravenous saline around the dose, or by mouth in compliant patients, and that less hydration or diuretics may be needed depending on the person's heart condition.",
      source: "lutathera-us-label",
      quote: "Advise patients to hydrate and to urinate frequently before, on the day of, and the day after administration of LUTATHERA.",
    },
    {
      action: "Lutetium-177 dotatate and low platelets: at a first grade 2, 3 or 4 thrombocytopenia, withhold the dose until it recovers to grade 0 or 1, then resume at 3.7 GBq",
      why: "The US label and the EU SmPC give the same rule. If the reduced dose does not bring back grade 2 to 4 thrombocytopenia, the next dose is the full 7.4 GBq. Treatment is stopped for good if grade 2 to 4 thrombocytopenia recurs, or if it would need an interval beyond 16 weeks. The EU SmPC prints grade 2 as platelets below 75 down to 50 x 10^9/L. In NETTER-1 the US label reports the platelet low point at a median of 5.1 months after the first dose and a median of 2 months to recovery.",
      source: "lutathera-us-label",
      quote: "Permanently discontinue LUTATHERA for Grade 2 or higher thrombocytopenia requiring a dosing interval beyond 16 weeks.",
    },
    {
      action: "Lutetium-177 dotatate and low red cells or neutrophils: at a first grade 3 or 4 anaemia or neutropenia, withhold the dose until it recovers to grade 0, 1 or 2, then resume at 3.7 GBq",
      why: "The US label and the EU SmPC give the same rule, and the same return to 7.4 GBq if the reduced dose is tolerated. Treatment is stopped for good if grade 3 or 4 anaemia or neutropenia recurs or would need an interval beyond 16 weeks. The EU SmPC prints grade 3 anaemia as haemoglobin below 8.0 g/dL with transfusion indicated. The threshold is one grade higher than for platelets.",
      source: "lutathera-us-label",
      quote: "Permanently discontinue LUTATHERA for Grade 3 or higher anemia or neutropenia requiring a dosing interval beyond 16 weeks.",
    },
    {
      action: "Do not change the lutetium-177 dotatate dose for a low lymphocyte count on its own, even at grade 3 or 4",
      why: "Both labels say so in a footnote to the dose table. Grade 3 or 4 lymphopenia was reported in 44% of patients given lutetium-177 dotatate in NETTER-1 (US label). The NANETS/SNMMI standard says it is rarely of clinical significance since opportunistic infections are not observed with this treatment. Neither label for lutetium-177 vipivotide tetraxetan gives a rule for lymphocytes alone: its myelosuppression rule names anaemia, thrombocytopenia, leukopenia and neutropenia (and pancytopenia in the EU text).",
      source: "lutathera-us-label",
      quote: "No dose modification required for hematological toxicities Grade 3 or Grade 4 solely due to lymphopenia.",
    },
    {
      action: "Lutetium-177 dotatate and the kidneys: withhold the dose if creatinine clearance falls below 40 mL/min, serum creatinine rises 40% from baseline or clearance falls 40% from baseline; resume at 3.7 GBq after resolution or return to baseline",
      why: "The US label and the EU SmPC give the same rule, with clearance calculated by the Cockcroft-Gault formula using actual body weight. The full dose returns if the reduced dose causes no kidney toxicity; treatment is stopped for good if kidney toxicity recurs or would need an interval beyond 16 weeks. The US label reports kidney failure in fewer than 1% of patients in the ERASMUS study, 3 to 36 months after treatment.",
      source: "lutathera-us-label",
      quote: "Permanently discontinue LUTATHERA for renal toxicity requiring a dosing interval beyond 16 weeks.",
    },
    {
      action: "Lutetium-177 dotatate and the liver: monitor liver tests during treatment, and withhold the dose if bilirubin exceeds 3 times the upper limit of normal, or albumin is below 30 g/L with INR above 1.5",
      why: "Both labels give this rule, with the same half dose on resuming and the same reasons to stop for good as for the kidneys. They say people with liver metastases may be at increased risk of liver toxicity from radiation. Raised GGT, AST or ALT has no row of its own in the dose table; a grade 3 or 4 result falls under the row for any other grade 3 or 4 reaction, which withholds the dose until grade 0 to 2. Grade 3 or 4 increased GGT was reported in 20% of patients in NETTER-1 (US label).",
      source: "lutathera-us-label",
      quote: "Monitor transaminases, bilirubin, serum albumin, and international normalized ratio (INR) during treatment.",
    },
    {
      action: "Lutetium-177 vipivotide tetraxetan and low counts: at grade 2 anaemia, thrombocytopenia, leukopenia or neutropenia, withhold until grade 1 or baseline; at grade 3 or higher, withhold and then reduce the dose by 20% to 5.9 GBq",
      why: "Both labels give these two rules. The US label adds a row: recurrent grade 3 or higher myelosuppression after one dose reduction means stopping for good. The EU table has no such row, but its text says treatment must be discontinued if a further reaction would need a second reduction. In its grade 2 row the EU SmPC also says to manage as deemed appropriate: growth factors are permitted but should be discontinued once counts improve to grade 1 or baseline, checking iron, B12 and folate and supplementing is advocated, and transfusions may be given as clinically indicated. The US table has no such wording. The US label says this medicine can cause severe and life-threatening myelosuppression.",
      source: "pluvicto-us-label",
      quote: "Withhold PLUVICTO until improvement to Grade 1 or baseline.",
    },
    {
      action: "Lutetium-177 vipivotide tetraxetan and the kidneys: withhold for kidney toxicity, which the labels define by a confirmed grade 2 or higher rise in serum creatinine and a confirmed creatinine clearance below 30 mL/min (US label) or below 50 mL/min (EU SmPC)",
      why: "The two texts differ on the clearance figure. Both tables list the creatinine rise and the clearance figure as two items under a heading that reads Defined as, with no joining word printed between them, so whether one alone is enough is for the treating team to read from the label in force. Both add that a confirmed rise of 40% or more in creatinine together with a fall of more than 40% in clearance from baseline means withholding until improvement or return to baseline and reducing the dose by 20%. The US label stops treatment for good for grade 3 or higher kidney toxicity and for kidney toxicity recurring after one reduction; the EU SmPC words its stopping row as recurrent renal toxicity (grade 3 or higher). The US label reports grade 3 or 4 acute kidney injury in 3.4% of patients in the VISION study.",
      source: "pluvicto-us-label",
      quote: "Confirmed CLcr < 30 mL/min; calculate using Cockcroft-Gault with actual body weight",
    },
    {
      action: "Reduce lutetium-177 vipivotide tetraxetan only once and do not return to the full dose; a delay of more than 4 weeks for a side effect is a reason to stop",
      why: "This is unlike lutetium-177 dotatate, where the full dose returns if the half dose is tolerated. Both texts say treatment must be discontinued if a further reaction would need a second reduction. On delay, the US text says to consider permanent discontinuation when a delay for an adverse reaction lasts more than 4 weeks, while its table says to permanently discontinue for any adverse reaction requiring such a delay; the EU SmPC says treatment must be discontinued.",
      source: "pluvicto-us-label",
      quote: "The dose of PLUVICTO may be reduced by 20% to 5.9 GBq (160 mCi) once; do not re-escalate dose.",
    },
    {
      action: "After the last lutetium-177 dotatate infusion, repeat the blood count, kidney and liver tests every 4 weeks for at least 3 months and every 6 months after that (EU SmPC)",
      why: "The EU SmPC recommends this to detect possible delayed adverse reactions, and says kidney function must be assessed for at least the first year after treatment. The US label gives no schedule after treatment. The NANETS/SNMMI standard says roughly 1, 3, 6 and 12 months after treatment, then a blood count and creatinine at least yearly if all are normal. The second cancers protocol covers the late blood cancers these tests may bring to light.",
      source: "lutathera-eu-smpc",
      quote: "It is also recommended to perform these tests every 4 weeks for at least 3 months after the last infusion of Lutathera and every 6 months thereafter, in order to be able to detect possible delayed adverse reactions (see section 4.8).",
    },
    {
      action: "With lutetium-177 PSMA therapy, check the blood count and creatinine at least 2 to 3 weeks after each cycle and 4 to 6 weeks after the last one (EANM/SNMMI guideline)",
      why: "The guideline times the test between cycles to the anticipated low point of the counts. Neither label for lutetium-177 vipivotide tetraxetan sets a timetable: both say only before and during treatment.",
      source: "eanm-snmmi-psma-2023",
      quote: "Blood cell counts and creatinine should be checked at least 2–3 weeks after each cycle (anticipated nadir) and 4–6 weeks after the last treatment cycle",
    },
    {
      action: "Test kidney function more often in people who start with mild or moderate kidney impairment",
      why: "The US label for lutetium-177 dotatate says these patients may be at greater risk of toxicity, including kidney toxicity, because of increased radiation exposure; the US label for lutetium-177 vipivotide tetraxetan says to monitor kidney function and adverse reactions frequently in them. The EU SmPC for lutetium-177 dotatate also recommends more frequent monitoring for people with bone metastasis, previous treatment with iodine-131 compounds or other unshielded radioactive sources, or another cancer not in remission for at least 5 years, and advises close follow-up of people aged 70 or over, in whom an increased risk of blood toxicity has been described.",
      source: "lutathera-us-label",
      quote: "Perform more frequent assessments of renal function in patients with baseline mild to moderate impairment.",
    },
    {
      action: "Tell the person which symptoms to report: tiredness, weakness, pale skin, breathlessness, bleeding or bruising more easily, signs of infection such as fever, and passing urine less often or in smaller amounts",
      why: "Both US labels ask the team to advise patients to contact their healthcare provider for signs of myelosuppression and of kidney toxicity. The EU package leaflets for both medicines list these among serious side effects to tell the doctor about right away. A fever with a low neutrophil count is handled under the febrile neutropenia protocol.",
      source: "pluvicto-us-label",
      quote: "Advise patients to contact their healthcare provider for any signs or symptoms of myelosuppression, such as tiredness, weakness, pale skin, shortness of breath, bleeding or bruising more easily than normal or difficulty to stop bleeding, or frequent infections with signs, such as fever, chills, sore throat or mouth ulcers",
    },
  ],
  bestInClass: {
    statement: "The dose rules that bind are those of the product information in force where the patient is treated, and no source read grades them. For lutetium-177 dotatate the US and EU dose tables are the same; the EU SmPC is the more specific text on monitoring, with a named list of tests, a timetable before each infusion and after the last, starting limits for blood counts and kidney function, and a required potassium test before the amino acid infusion, none of which the US label states. For lutetium-177 vipivotide tetraxetan the two texts agree on the blood count rule and differ on the kidney threshold (creatinine clearance below 30 mL/min in the US label, below 50 mL/min in the EU SmPC), on whether a delay beyond 4 weeks must end treatment, and on a stopping rule for raised liver enzymes that only the EU text has. Only the society documents give a timetable for tests between cycles, and they do not agree with one another: the EANM/SNMMI guideline for PSMA therapy says 2 to 3 weeks after each cycle, the 2013 IAEA, EANM and SNMMI guidance says a blood count every 2 to 4 weeks, and the NANETS/SNMMI standard gives no between-cycle interval beyond tests about 2 weeks before each cycle. These are expert procedure documents without graded recommendations for these points.",
    sources: ["lutathera-us-label", "lutathera-eu-smpc", "pluvicto-us-label", "pluvicto-eu-smpc", "eanm-snmmi-psma-2023", "nanets-snmmi-2019", "iaea-eanm-snmmi-2013"],
  },
  variants: [
    {
      name: "Tests and timetable for lutetium-177 dotatate: US label, EU SmPC and the society documents",
      differs: "US label (DailyMed version of January 2026): monitor blood cell counts, serum creatinine with calculated clearance, and transaminases, bilirubin, albumin and INR, with no timetable. EU SmPC: the same tests named as a minimum before each infusion, at least once in the 2 to 4 weeks before and shortly before; every 4 weeks for at least 3 months after the last infusion and every 6 months thereafter; kidney function for at least the first year. NANETS/SNMMI (2019): tests typically 2 weeks before each cycle, adding blood urea nitrogen and alkaline phosphatase; afterwards at roughly 1, 3, 6 and 12 months. IAEA, EANM and SNMMI (2013): a blood count every 2 to 4 weeks between cycles, with kidney and liver tests available before the next cycle is confirmed; afterwards every 8 to 12 weeks for the first 12 months and then twice a year if clinically indicated. Galician Delphi consensus (2026, meeting funded by Novartis): 2 weeks before the first cycle, at 4 and 6 weeks after each cycle, and at 3, 6 and 12 months after treatment.",
      evidence: "Regulatory texts and expert consensus; none grades its timetable. In the Delphi consensus 9 of 10 panellists strongly agreed with the statement and 1 agreed. The 2013 guidance predates the licensed product and also covers yttrium-90 peptides.",
      sources: ["lutathera-us-label", "lutathera-eu-smpc", "nanets-snmmi-2019", "iaea-eanm-snmmi-2013", "delphi-prrt-2026"],
    },
    {
      name: "Starting limits for lutetium-177 dotatate",
      differs: "EU SmPC: contraindicated in kidney failure with creatinine clearance below 30 mL/min; not recommended with baseline clearance below 40 mL/min; not recommended with haemoglobin below 8 g/dL, platelets below 75 x 10^9/L or leukocytes below 2 x 10^9/L unless solely due to lymphopenia; a careful benefit-risk assessment where bilirubin is above 3 times the upper limit of normal or albumin is below 30 g/L with INR above 1.5. US label: no contraindications; no dose adjustment for mild to moderate kidney impairment (clearance 30 to 89 mL/min) with more frequent kidney tests; severe impairment not studied. NANETS/SNMMI table of acceptable values before a first treatment: haemoglobin above 8 g/dL, white cells above 2K/mm3, platelets above 70K/mm3, estimated GFR above 50 mL/min, bilirubin up to 3 times the upper limit of normal, albumin above 3.0 g/dL, offered as general eligibility guidelines. IAEA, EANM and SNMMI (2013), under severely compromised bone marrow in its list of contraindications, as what it calls suggested reference values: white cells below 3,000 per microlitre with neutrophils below 1,000 per microlitre, platelets below 75,000 per microlitre for lutetium-177 dotatate, red cells below 3,000,000 per microlitre.",
      evidence: "Regulatory texts and expert consensus, not graded. The limits are not the same across the documents: the kidney limit is 30 or 40 mL/min by clearance in the EU SmPC and 50 mL/min by estimated GFR in the NANETS/SNMMI table, and the platelet limit is 75 in two documents and 70 in the third.",
      sources: ["lutathera-eu-smpc", "lutathera-us-label", "nanets-snmmi-2019", "iaea-eanm-snmmi-2013"],
    },
    {
      name: "The amino acid solution: labels against the NANETS/SNMMI standard and the 2013 guidance",
      differs: "Both labels: 18 to 25 g each of L-lysine hydrochloride and L-arginine hydrochloride in 1 to 2 L, osmolality below 1200 mOsmol/kg, starting 30 minutes before the dose. The EU SmPC prefers a compounded solution of 25 g of each in 1 L and says the infusion runs over 4 hours, preferably through a separate vein in the other arm. NANETS/SNMMI (2019) content requirements: 18 to 24 g of each, 1.5 to 2.2 L for a commercial solution and 1.0 L for a compounded one, osmolarity below 1,050 mOsmol; it says the commercial solutions hold other amino acids that raise osmolality and are associated with significant nausea and vomiting, and that the compounded two-amino-acid solution should be considered where available. IAEA, EANM and SNMMI (2013): start 30 to 60 minutes before and maintain over 4 hours, and it describes longer regimens with lysine on the second and third days.",
      evidence: "The EU SmPC reports a mean reduction in kidney radiation exposure of about 47% with the 4-hour infusion. The 2013 guidance reports a reduction in kidney absorbed dose ranging from 9% to 53% with amino acids, and warns that hyperosmotic solutions can induce dangerous electrolyte imbalances. Neither label for lutetium-177 vipivotide tetraxetan calls for an amino acid infusion.",
      sources: ["lutathera-us-label", "lutathera-eu-smpc", "nanets-snmmi-2019", "iaea-eanm-snmmi-2013"],
    },
    {
      name: "Potassium and the amino acid infusion: EU SmPC against the US label",
      differs: "EU SmPC: serum potassium must be tested before each amino acid infusion; hyperkalaemia must be corrected before starting; a second test must confirm correction where it was clinically significant, with close monitoring for symptoms and an ECG before discharge; vital signs are monitored during the infusion whatever the starting potassium; for creatinine clearance below 50 mL/min an increased risk of transient hyperkalaemia should be taken into consideration. US label: no instruction on potassium was found in the text read.",
      evidence: "Regulatory text, not graded. The EU SmPC says the rise is transient, usually returning to normal within 24 hours from the start of the infusion. The 2013 guidance says particular attention should be given to avoiding electrolyte imbalance (hyperkalaemia and hypernatraemia) and the consequent metabolic acidosis.",
      sources: ["lutathera-eu-smpc", "lutathera-us-label", "iaea-eanm-snmmi-2013"],
    },
    {
      name: "Low blood counts on lutetium-177 PSMA therapy: the labels against the EANM/SNMMI guideline",
      differs: "Labels for lutetium-177 vipivotide tetraxetan: grade 2, withhold until grade 1 or baseline; grade 3 or higher, withhold and reduce by 20%, once. EANM/SNMMI (2023), written for lutetium-177 PSMA therapy in general: grade 3 or 4 toxicity found at a test between two cycles means the next cycle should be postponed by 2 weeks and might then be cancelled if there is no recovery; toxicity of grade 2 or higher on the planned treatment date means the activity is reduced by 20% or the cycle postponed. It permits G-CSF for neutropenia until grade 1, with at least 2 weeks between G-CSF and the next dose, and says transfusion or erythropoietin may be given for anaemia as clinically indicated. Its relative contraindications include white cells below 2.5 per nanolitre, neutrophils below 1.5 and platelets below 75, with a note that more compromised patients can reasonably be treated in selected cases under close monitoring (printed as a weak recommendation).",
      evidence: "Labels are not graded and the guideline prints no grade for its side effect rules. Several of the guideline's authors declare inventorship of PSMA-617 or consultancy for its manufacturer. The 2013 guidance on PRRT says growth factor support can be considered not earlier than 10 days after treatment.",
      sources: ["pluvicto-us-label", "pluvicto-eu-smpc", "eanm-snmmi-psma-2023", "iaea-eanm-snmmi-2013"],
    },
    {
      name: "Kidney rules for lutetium-177 vipivotide tetraxetan: US label, EU SmPC and EANM/SNMMI",
      differs: "US label (DailyMed version of August 2026): withhold for kidney toxicity defined by a confirmed grade 2 or higher creatinine rise and confirmed creatinine clearance below 30 mL/min (listed as two items, with no joining word printed between them); stop for good for grade 3 or higher kidney toxicity; no dose adjustment for baseline clearance of 30 to 89 mL/min, with frequent monitoring. EU SmPC: the same row with confirmed clearance below 50 mL/min; treatment not recommended where baseline clearance is below 50 mL/min; the same thresholds apply to baseline values when treatment starts. EANM/SNMMI (2023): an acute loss of estimated GFR of more than 40% that stays above 30 mL/min means reducing the activity by 20%; a fall below 30 mL/min means discontinuing. It says experience with a GFR of 30 to 50 mL/min is still limited.",
      evidence: "Regulatory texts and an expert guideline, not graded on this point. The EU SmPC gives as its reason that the pharmacokinetic profile and safety have not been studied in patients with baseline clearance below 50 mL/min.",
      sources: ["pluvicto-us-label", "pluvicto-eu-smpc", "eanm-snmmi-psma-2023"],
    },
    {
      name: "Raised liver enzymes on lutetium-177 vipivotide tetraxetan: EU SmPC only",
      differs: "The EU SmPC stops treatment for good where AST or ALT is above 5 times the upper limit of normal in the absence of liver metastases. The US dose table has no row for liver enzymes; its general row for other non-haematologic toxicity says to permanently discontinue for any unacceptable toxicity and gives no figure. The EANM/SNMMI guideline says to discontinue for unexpected liver toxicity with AST or ALT above 5 times the upper limit of normal.",
      evidence: "Regulatory texts, not graded.",
      sources: ["pluvicto-eu-smpc", "pluvicto-us-label", "eanm-snmmi-psma-2023"],
    },
    {
      name: "Half dose or a longer gap for lutetium-177 dotatate (NANETS/SNMMI)",
      differs: "The labels resume at 3.7 GBq after a dose-modifying toxicity. The NANETS/SNMMI standard says that with myelosuppression greater than grade 1 one can delay treatment, give 3.7 GBq at the next treatment, or permanently stop, and that because of reimbursement in the United States it may be difficult to give half the normal activity, so it may only be feasible to prolong the delay.",
      evidence: "Expert consensus, not graded. It says thrombocytopenia will often resolve with a delay.",
      sources: ["nanets-snmmi-2019", "lutathera-us-label"],
    },
  ],
  grades: [
    { claim: "Lutetium-177 dotatate dose rule for low platelets (same in the EU SmPC)", grade: "Regulatory label; not graded", source: "lutathera-us-label", quote: "Withhold dose until complete or partial resolution (Grade 0 to 1)." },
    { claim: "Amino acid infusion with lutetium-177 dotatate, and why", grade: "Regulatory label; not graded", source: "lutathera-us-label", quote: "Administer the recommended amino acid solution before, during and after LUTATHERA [see Dosage and Administration (2.3)] to decrease the reabsorption of lutetium Lu 177 dotatate through the proximal tubules and decrease the radiation dose to the kidneys." },
    { claim: "Do not lower the amino acid dose when the lutetium-177 dotatate dose is reduced", grade: "Regulatory label; not graded", source: "lutathera-us-label", quote: "Do not decrease the dose of the amino acid solution if a reduced dose of LUTATHERA is administered" },
    { claim: "EU rule: correct hyperkalaemia before the amino acid infusion", grade: "Regulatory label; not graded", source: "lutathera-eu-smpc", quote: "Hyperkalaemia must be corrected accordingly before starting the infusion." },
    { claim: "EU rule: ECG before discharge where hyperkalaemia was clinically significant beforehand", grade: "Regulatory label; not graded", source: "lutathera-eu-smpc", quote: "An electrocardiogram (ECG) should be performed prior to discharging the patient." },
    { claim: "EU contraindication for lutetium-177 dotatate in kidney failure", grade: "Regulatory label; not graded", source: "lutathera-eu-smpc", quote: "Kidney failure with creatinine clearance <30 mL/min." },
    { claim: "US label: tests before and during lutetium-177 vipivotide tetraxetan", grade: "Regulatory label; not graded", source: "pluvicto-us-label", quote: "Perform kidney function laboratory tests, including serum creatinine and calculated creatinine clearance (CLcr), before and during treatment with PLUVICTO." },
    { claim: "EU SmPC: a delay beyond 4 weeks ends treatment with lutetium-177 vipivotide tetraxetan", grade: "Regulatory label; not graded", source: "pluvicto-eu-smpc", quote: "If a treatment delay due to an adverse reaction persists for >4 weeks, treatment with Pluvicto must be discontinued." },
    { claim: "US label: a delay beyond 4 weeks is a reason to consider ending treatment (its table says permanently discontinue)", grade: "Regulatory label; not graded", source: "pluvicto-us-label", quote: "If a treatment delay due to an adverse reaction persists for > 4 weeks, consider permanent discontinuation of PLUVICTO." },
    { claim: "EANM/SNMMI: tests before each cycle of lutetium-177 PSMA therapy", grade: "No grade printed for this statement", source: "eanm-snmmi-psma-2023", quote: "Lab tests not older than 5 days are obtained in advance of each treatment cycle: blood cell count, creatinine, eGFR, AST/GOT, ALT/GPT, total bilirubin, albumin, AP/ALP, LD/LDH, PSA, and CRP." },
    { claim: "EANM/SNMMI: grade 2 or higher blood toxicity on the treatment date", grade: "No grade printed for this statement", source: "eanm-snmmi-psma-2023", quote: "Treatment activity is reduced by 20% or postponed." },
    { claim: "EANM/SNMMI: treating people whose counts are below its relative contraindication limits", grade: "weak recommendation, best-available-evidence are case reports and expert opinion", source: "eanm-snmmi-psma-2023", quote: "but then close monitoring of blood cell count is mandatory" },
    { claim: "NANETS/SNMMI: tests before each cycle of lutetium-177 dotatate", grade: "Consensus procedure standard; not graded", source: "nanets-snmmi-2019", quote: "Laboratory values should be checked shortly before the treatment is ordered (typically 2 wk before each cycle)." },
    { claim: "NANETS/SNMMI: tests after treatment", grade: "Consensus procedure standard; not graded", source: "nanets-snmmi-2019", quote: "If all blood tests are within normal limits, a complete blood count and serum creatinine should be monitored at least yearly or sooner if clinically indicated or per primary team." },
    { claim: "NANETS/SNMMI: lymphopenia after lutetium-177 dotatate", grade: "Consensus procedure standard; not graded", source: "nanets-snmmi-2019", quote: "Grade 3 and 4 lymphopenia is more common but is rarely of clinical significance since opportunistic infections are not observed in association with 177Lu-DOTATATE." },
    { claim: "IAEA, EANM and SNMMI (2013): blood count between cycles of PRRT", grade: "Expert guidance; not graded", source: "iaea-eanm-snmmi-2013", quote: "A complete blood cell count should be performed every 2–4 weeks." },
    { claim: "Galician Delphi consensus (meeting funded by Novartis): timetable of tests", grade: "Statement 14: 90% strongly agree, 10% agree (10 panellists; consensus defined as 70% agreement)", source: "delphi-prrt-2026", quote: "Laboratory tests (including at least CBC, kidney and liver function) should be performed 2 weeks before the first cycle, at 4 and 6 weeks after each cycle, and at 3, 6 and 12 months after completion of treatment" },
  ],
  sources: [
    {
      key: "lutathera-us-label",
      label: "LUTATHERA (lutetium Lu 177 dotatate) injection: US prescribing information (DailyMed version of January 2026)",
      publisher: "Novartis (FDA label, DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=72d1a024-00b7-418a-b36e-b2cb48f2ab55",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "lutathera-eu-smpc",
      label: "Lutathera (lutetium (177Lu) oxodotreotide): EU product information, SmPC and package leaflet (EMA file dated August 2026)",
      publisher: "European Medicines Agency (product information; marketing authorisation holder Novartis)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/lutathera-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "pluvicto-us-label",
      label: "PLUVICTO (lutetium Lu 177 vipivotide tetraxetan) injection: US prescribing information (DailyMed version of August 2026)",
      publisher: "Novartis (FDA label, DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14908037-2892-4d98-a053-253ce35afb1a",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "pluvicto-eu-smpc",
      label: "Pluvicto (lutetium (177Lu) vipivotide tetraxetan): EU product information, SmPC and package leaflet (EMA PDF created June 2026, modified July 2026)",
      publisher: "European Medicines Agency (product information; marketing authorisation holder Novartis)",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/pluvicto-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nanets-snmmi-2019",
      label: "NANETS/SNMMI Procedure Standard for Somatostatin Receptor-Based Peptide Receptor Radionuclide Therapy with 177Lu-DOTATATE",
      publisher: "Journal of Nuclear Medicine (Hope et al.); no funding or disclosure statement in the text read",
      year: 2019,
      url: "https://doi.org/10.2967/jnumed.118.230607",
      doi: "10.2967/jnumed.118.230607",
      gradingScheme: "Consensus procedure standard of two societies; its statements are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "iaea-eanm-snmmi-2013",
      label: "The joint IAEA, EANM, and SNMMI practical guidance on peptide receptor radionuclide therapy (PRRNT) in neuroendocrine tumours",
      publisher: "European Journal of Nuclear Medicine and Molecular Imaging (Bodei et al.); compiled under the auspices and support of the IAEA",
      year: 2013,
      url: "https://doi.org/10.1007/s00259-012-2330-6",
      doi: "10.1007/s00259-012-2330-6",
      gradingScheme: "Expert practical guidance; its statements are not graded. It predates the licensed product and also covers yttrium-90 peptides.",
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
      gradingScheme: "Strong (multicentre randomised trials with low risk of bias), moderate-strong (meta-analyses and systematic reviews of case-control or cohort studies, or trials with moderate risk of bias) or weak (case-control or cohort studies, indirect evidence, case reports and expert opinion). Most procedural statements carry no printed grade.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "delphi-prrt-2026",
      label: "Recommendations for selection, treatment, and follow-up in peptide receptor radionuclide therapy (PRRT) for neuroendocrine tumors: a Delphi consensus from the Galician Multidisciplinary Group on Neuroendocrine and Endocrine Tumors (GGNET) (authors' meeting funded by Novartis)",
      publisher: "Clinical and Translational Oncology (Martinez-Lago et al.); Novartis Pharmaceuticals provided financial support by facilitating the meeting of the authors",
      year: 2026,
      url: "https://doi.org/10.1007/s12094-026-04226-7",
      doi: "10.1007/s12094-026-04226-7",
      gradingScheme: "Single-round Delphi of 10 experts from one region of Spain on a 4-point scale; consensus defined as at least 70% rating agree or strongly agree; the share at each level is printed per statement.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "enets-prrt-2017",
      label: "ENETS Consensus Guidelines for the Standards of Care in Neuroendocrine Neoplasms: Peptide Receptor Radionuclide Therapy with Radiolabelled Somatostatin Analogues",
      publisher: "Neuroendocrinology (Hicks et al.), Karger",
      year: 2017,
      url: "https://doi.org/10.1159/000475526",
      doi: "10.1159/000475526",
      gradingScheme: "Not read.",
      read: "not-reachable",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["lutathera", "pluvicto"],
  technologies: [],
  terms: ["prrt-term", "thrombocytopenia", "anaemia", "neutropenia"],
  related: [
    "lutetium-177-therapy-home-radiation-safety",
    "radionuclide-therapy-patient-release-criteria",
    "second-cancers-after-anticancer-drug-treatment",
    "dry-mouth-from-cancer-drugs-and-radionuclide-therapy",
    "low-potassium-and-low-phosphate-on-anticancer-drugs",
    "red-cell-and-platelet-transfusion-thresholds",
    "renal-dose-adjustment-of-anticancer-drugs",
    "febrile-neutropenia-first-hour",
    "lu177-radioligand-therapy",
  ],
  upgrades: [],
  gaps: [
    "Actinium-225 agents (actinium-225 PSMA agents, actinium-225 DOTATATE) are investigational. No label exists for them and no procedure guideline read gives a monitoring timetable or a dose rule for low counts or kidney toxicity with them; the EANM/SNMMI guideline only names actinium-225 PSMA ligands as under clinical evaluation. Their trial protocols were not read. Nothing on this page should be applied to them.",
    "No label sets a timetable for blood tests in the weeks after a dose, other than the tests before the next one, and the US labels set none after treatment. The intervals on this page come from the EU SmPC for lutetium-177 dotatate and from society documents that disagree with one another; no trial read compares timetables.",
    "No source read gives a dose rule for a low lymphocyte count on lutetium-177 vipivotide tetraxetan. Its labels report it (grade 3 or 4 decreased lymphocytes in 47% of patients in the VISION study, US label) and name only anaemia, thrombocytopenia, leukopenia and neutropenia (and pancytopenia in the EU text) in the myelosuppression rule. No source read recommends preventive anti-infective medicines for lymphopenia on either product.",
    "Raised GGT on lutetium-177 dotatate has no rule of its own: the labels list it as a laboratory abnormality and name bilirubin, albumin and INR in the liver row of the dose table. How a centre acts on an isolated GGT rise is not stated in any source read.",
    "The US label for lutetium-177 dotatate contains no instruction to test potassium before the amino acid infusion; hyperkalaemia appears in it only as a laboratory finding. Whether US centres test it routinely is not stated in the sources read. Neither the EU SmPC nor any other source read gives a potassium figure above which the infusion should not start.",
    "The ENETS consensus guideline on PRRT (2017) could not be read: the publisher refused a script and no open copy was found. Nothing rests on it. A newer ENETS document on this subject was not found by a Europe PMC title search on 18 November 2026, which is not proof that none exists.",
    "The 2013 IAEA, EANM and SNMMI guidance predates both licensed products. Its erratum (doi 10.1007/s00259-013-2454-3) was read on 18 November 2026: it corrects the order of the authors and the spelling of one name and touches nothing used here. The NANETS/SNMMI standard says its guidelines are reviewed on their fifth anniversary; no revised edition was found on 18 November 2026.",
    "The Galician Delphi consensus is a regional document from ten experts whose meeting was funded by Novartis, which makes both medicines. It is shown as a variant only.",
    "The EU product information PDFs print no revision date in their text; the dates given are those inside the PDF files as served by the EMA. The EU dose tables are laid out in columns that text extraction interleaves. On 18 November 2026 a second reader converted both PDFs two ways (with and without layout) and could place every figure used here in its row and column; the EU rules are still stated in prose from the table and quoted only from running text.",
    "Dosimetry (measuring the radiation dose each kidney and the bone marrow receives, and adjusting treatment to it) is outside this page. The labels' rules rest on blood tests alone.",
    "Urgent thresholds for patients come from the EU package leaflets, which ask people to tell their doctor right away about signs of low blood cells or kidney problems; the US labels have no patient leaflet and say only to contact the healthcare provider. No source read gives patients a temperature or a count at which to call.",
  ],
});
