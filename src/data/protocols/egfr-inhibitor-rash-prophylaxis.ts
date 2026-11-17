import { protocol } from "./helpers";

/*
 * Pre-emptive skin care for the acne-like (papulopustular) rash of EGFR inhibitors: an oral tetracycline, moisturiser,
 * sunscreen and a mild topical steroid from the first day, then dose changes by grade. Covers the EGFR antibodies
 * (cetuximab, panitumumab), the bispecific amivantamab, and the EGFR tyrosine kinase inhibitors.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl, the DailyMed SPL web service or the Europe
 * PMC REST API into a scratch directory and read as text):
 * - MASCC Skin Toxicity Study Group guideline on EGFR inhibitor dermatologic toxicities (Lacouture et al., Support Care
 *   Cancer 2011): full text from PubMed Central (PMC3128700), including the evidence and grade tables. No later MASCC
 *   edition was found in Europe PMC.
 * - ESMO 2021 guideline on dermatological toxicities (Ann Oncol 2021): not reachable (no abstract in Europe PMC;
 *   annalsofoncology.org returned 403).
 * - RYBREVANT (amivantamab) US prescribing information, DailyMed version of 13 July 2026, section 2.6 (prophylactic
 *   and concomitant medicines), and VECTIBIX (panitumumab), DailyMed version of 26 June 2026, boxed warning, section
 *   2.3 and sun advice. Full text.
 * - Trials and reviews, as abstracts from Europe PMC: STEPP (J Clin Oncol 2010), J-STEPP (Future Oncol 2015), COCOON
 *   (J Thorac Oncol 2025), the Valentino post hoc analysis (Support Care Cancer 2021) and a 2022 systematic review and
 *   meta-analysis (Asia Pac J Clin Oncol).
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text unchanged.
 *
 * Added on 16 November 2026 (label dose rules for skin reactions; each read as raw text, DailyMed SPL XML through the
 * DailyMed web service or the EMA product information PDF with pdftotext, nothing from memory):
 * - ERBITUX (cetuximab) US prescribing information, DailyMed SPL version 58 (effective 16 April 2026), section 2.5,
 *   Table 1; and the Erbitux EU summary of product characteristics from ema.europa.eu (PDF dated 17 June 2026),
 *   section 4.4. The two differ and are shown side by side.
 * - RYBREVANT (amivantamab), DailyMed version of 13 July 2026, Table 7 (the dermatologic row); LAZCLUZE (lazertinib),
 *   SPL version 6 (revised April 2026), Table 2; GILOTRIF (afatinib), SPL version 20, sections 2.3 and 5.2; IRESSA
 *   (gefitinib), SPL version 19, section 2.4; TAGRISSO (osimertinib), SPL version 37 (revised September 2026), Table 3
 *   and sections 5.5 and 5.6.
 * - Erlotinib: the only TARCEVA label a DailyMed brand search returned was a repackager's from 2012, so a current
 *   generic label carrying the reference text was read (Alembic, DailyMed SPL of June 2024, text revised September
 *   2020), section 2.4.
 * - The MASCC 2011 full text was fetched again (PMC3128700) to check its position on dose changes: it gives no dose
 *   modification schedule. The ESMO 2021 guideline was tried again (Europe PMC holds no abstract or full text, and the
 *   Internet Archive holds no capture of the article page) and remains unread.
 */
export const egfrInhibitorRashProphylaxis = protocol({
  id: "egfr-inhibitor-rash-prophylaxis",
  name: "EGFR inhibitor rash: pre-emptive skin care, antibiotics and dose changes",
  aka: ["EGFR inhibitor rash prophylaxis", "acneiform rash", "papulopustular rash", "pre-emptive doxycycline", "pre-emptive skin treatment", "cetuximab rash", "panitumumab rash", "amivantamab skin care", "COCOON regimen", "STEPP regimen"],
  domain: "symptom-management",
  tldr: "Drugs that block EGFR, such as cetuximab, panitumumab, amivantamab and EGFR tablets for lung cancer, very often cause an acne-like rash. Starting skin care on day one makes a bad rash much less likely: doxycycline or minocycline for the first weeks, moisturiser, sunscreen, and sometimes a mild steroid cream. Tell your team early if it spreads or hurts: a pause or lower dose may help.",
  simple: "Some cancer drugs cause a spotty rash. Starting antibiotic tablets, moisturiser and sunscreen on day one helps. Tell your team if the rash gets bad.",
  summary: "The MASCC Skin Toxicity Study Group (2011) recommends pre-emptive management for EGFR inhibitor rash because it is frequent and appears in the first 2 to 4 weeks: hydrocortisone 1 per cent with moisturiser and sunscreen twice daily, plus doxycycline 100 mg twice daily (or minocycline 100 mg daily) for the first 6 weeks, based on the randomised STEPP trial. In STEPP (panitumumab, 95 people), protocol-specified grade 2 or worse skin toxicity in 6 weeks fell from 62 to 29 per cent; J-STEPP repeated the result in Japanese patients (62.5 to 21.3 per cent). A 2022 meta-analysis found oral antibiotics reduced grade 2 or worse rash by 40 per cent; topical antibiotics, vitamin K1 cream and sunscreen alone were not significant. For amivantamab, the 2026 US label now recommends the COCOON regimen at initiation: doxycycline or minocycline 100 mg twice daily for 12 weeks, then clindamycin 1 per cent lotion to the scalp for 9 months, a non-comedogenic moisturiser, daily 4 per cent chlorhexidine for hands and feet, and sun protection; in the COCOON trial (amivantamab with lazertinib, 201 people) it reduced grade 2 or worse dermatologic events by week 12 from 75 to 42 per cent. Doubts remain: in a post hoc analysis of the Valentino trial of first-line panitumumab, doxycycline prophylaxis did not significantly lower rash. Dose rules come from labels: panitumumab is withheld for 1 to 2 doses at grade 3 and restarted at 100, 80 then 60 per cent by occurrence. Cetuximab is paused at grade 3 or worse and continued at 250, then 200, then 150 mg/m2 (weekly figures) by occurrence and stopped at the fourth; the US label delays 1 to 2 weeks and continues if the reaction improves, while the EU product information allows restarting only once it has settled to grade 2 and adds two-weekly figures (400 then 300 mg/m2). Amivantamab is withheld at grade 3 and resumed at a reduced dose; with lazertinib the amivantamab dose is reduced first. Afatinib is withheld for prolonged or intolerable grade 2 or grade 3 and restarted 10 mg lower; gefitinib is withheld for up to 14 days at grade 3; erlotinib is withheld for severe rash not responding to treatment and restarted 50 mg lower; the osimertinib label has no rash-specific rule. The ESMO 2021 guideline could not be read.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults starting an EGFR-targeted drug: cetuximab or panitumumab (colorectal and head and neck cancer), amivantamab with or without lazertinib, and EGFR tyrosine kinase inhibitors (erlotinib, gefitinib, afatinib, osimertinib) in lung cancer. STEPP and J-STEPP were in metastatic colorectal cancer on panitumumab; COCOON in untreated EGFR-mutant lung cancer on amivantamab with lazertinib. Tetracyclines are not suitable in pregnancy or for some people with drug allergies; the sources read do not list contraindications in full.",
  trigger: "An EGFR-targeted drug is planned; prophylaxis starts on the first day of treatment.",
  steps: [
    {
      action: "Start pre-emptive skin care on the first day of an EGFR inhibitor, rather than waiting for the rash",
      why: "The rash is very common and comes in the first weeks; treating early prevents most of the severe cases.",
      source: "mascc-2011",
      quote: "Based on the high frequency of rash in EGFRI-treated patients and the consistent presentation within the first 2–4 weeks of therapy, preventive/prophylactic management is recommended unless there are contraindications based on patient and/or health care provider factors",
      grade: "Level II, grade A (systemic tetracycline)",
    },
    {
      action: "Prescribe doxycycline 100 mg twice daily (or minocycline 100 mg daily) for the first 6 weeks, with hydrocortisone 1 per cent cream, a moisturiser and sunscreen twice daily",
      why: "The antibiotic is used for its anti-inflammatory effect on the skin, not for infection; with gentle skin care it halved moderate rash in the trial behind this advice.",
      source: "mascc-2011",
      quote: "Hydrocortisone 1% combined with moisturizer, sunscreen, and doxycycline 100 mg bid for the first 6 weeks is recommended based on randomized data.",
      grade: "Level II, grade A (tetracycline); Level II, grade C (topical hydrocortisone with moisturiser and sunscreen)",
    },
    {
      action: "With amivantamab, follow the label regimen from day 1: doxycycline or minocycline 100 mg twice daily for 12 weeks, then clindamycin 1 per cent lotion on the scalp once daily for 9 months",
      why: "Amivantamab causes rash, scalp and nail problems over many months; a longer regimen covering the scalp reduced moderate skin problems in a randomised trial.",
      source: "rybrevant-label",
      quote: "Administer an oral antibiotic (doxycycline or minocycline, 100 mg orally twice daily) starting on Day 1 for the first 12 weeks of treatment.",
      grade: "US prescribing information",
    },
    {
      action: "With amivantamab, add a non-comedogenic moisturiser on the face and body and a daily 4 per cent chlorhexidine wash for the hands and feet",
      why: "Moisturiser protects dry skin; the antiseptic wash aims to prevent infection around the nails (paronychia).",
      source: "rybrevant-label",
      quote: "Wash hands and feet with 4% chlorhexidine solution once daily.",
      grade: "US prescribing information",
    },
    {
      action: "Advise sun protection during treatment and for 2 months after: sunscreen, hats and protective clothing, and limiting time in strong sun",
      why: "Sunlight makes the rash worse, and some of the tetracyclines make skin more sensitive to sun.",
      source: "vectibix-label",
      quote: "Advise patients to limit sun exposure (use sunscreen, wear hats) while receiving Vectibix and for 2 months after the last dose of Vectibix therapy",
      grade: "US prescribing information",
    },
    {
      action: "If rash develops despite prophylaxis, treat with a medium- to high-potency topical steroid and continue or start the oral tetracycline",
      why: "The rash is inflammatory rather than true acne, so anti-inflammatory creams help; acne creams that dry the skin can make it worse.",
      source: "mascc-2011",
      quote: "Reactive use of medium- to high-potency topical corticosteroids is recommended based on studies showing in vitro release of inflammatory chemokines after EGFRI therapy.",
      grade: "Level IV, grade C",
    },
    {
      action: "Panitumumab: at a first grade 3 skin reaction, withhold 1 to 2 doses and restart at the original dose once it is below grade 3; reduce to 80 then 60 per cent on later occurrences and stop on the fourth",
      why: "A pause lets the skin settle while keeping the treatment going; repeated severe rashes need a lower dose.",
      source: "vectibix-label",
      quote: "Upon first occurrence of a Grade 3 (NCI-CTC/CTCAE) dermatologic reaction, withhold 1 to 2 doses of Vectibix. If the reaction improves to < Grade 3, reinitiate Vectibix at the original dose.",
      grade: "US prescribing information",
    },
    {
      action: "Cetuximab (US label): at a grade 3 or 4 skin reaction, delay the infusion for 1 to 2 weeks; if it improves, continue at 250 mg/m2 after the first occurrence, 200 mg/m2 after the second and 150 mg/m2 after the third; stop cetuximab if it does not improve, or at the fourth occurrence",
      why: "A short pause lets a severe rash settle, and a lower dose after a repeat makes another severe rash less likely while treatment continues.",
      source: "erbitux-label",
      quote: "Delay infusion 1 to 2 weeks; if condition improves, continue at 250 mg/m2.",
      grade: "US prescribing information (Table 1, first occurrence, Grade 3 or 4)",
    },
    {
      action: "Cetuximab (EU product information): interrupt at grade 3 or worse and resume only once the reaction has settled to grade 2; same dose after the first occurrence, 20 per cent lower after the second (200 mg/m2 weekly or 400 mg/m2 every two weeks), 40 per cent lower after the third (150 mg/m2 weekly or 300 mg/m2 every two weeks); stop at the fourth, or if it does not settle to grade 2",
      why: "The European text ties restarting to how far the rash has settled rather than to a set number of weeks, and gives figures for the two-weekly schedule as well.",
      source: "erbitux-smpc",
      quote: "If the reaction has resolved to grade 2 treatment may only be resumed with a dose reduction of 20% (200 mg/m² BSA in the weekly dosing regimen, 400 mg/m² BSA in the biweekly dosing regimen) after the second occurrence and with a dose reduction of 40% (150 mg/m² BSA in the weekly dosing regimen, 300 mg/m² BSA in the biweekly dosing regimen) after the third occurrence.",
      grade: "EU summary of product characteristics, section 4.4",
    },
    {
      action: "Amivantamab: at grade 1 or 2, start supportive skin care and reassess after 2 weeks; at grade 3, withhold, and resume at a reduced dose once it is grade 2 or better, stopping if there is no improvement within 2 weeks; stop permanently for grade 4 or severe blistering or peeling skin conditions",
      why: "Most rashes can be managed while treatment continues; a severe one needs a pause and a lower dose, and blistering or peeling skin can be dangerous.",
      source: "rybrevant-label",
      quote: "Upon recovery to ≤ Grade 2, resume RYBREVANT at reduced dose.",
      grade: "US prescribing information (Table 7, Grade 3)",
    },
    {
      action: "Lazertinib with amivantamab: for a grade 2 skin reaction that has not improved after 2 weeks of skin care, reduce the amivantamab dose first and keep lazertinib the same; at grade 3 withhold both, and stop both if there is no improvement within 2 weeks",
      why: "The label lowers the amivantamab dose first, so that the lazertinib tablet can stay at the same dose where possible.",
      source: "lazcluze-label",
      quote: "If there is no improvement after 2 weeks, reduce amivantamab dose and continue LAZCLUZE at the same dose.",
      grade: "US prescribing information (Table 2, Grade 2)",
    },
    {
      action: "Afatinib: withhold for a grade 2 skin reaction that lasts more than 7 days or is intolerable, or for grade 3; restart once it is grade 1 or better at 10 mg a day less; stop permanently for life-threatening blistering or peeling skin lesions",
      why: "A lower daily dose usually allows afatinib to continue after a troublesome rash.",
      source: "gilotrif-label",
      quote: "For patients who develop prolonged Grade 2 cutaneous adverse reactions lasting more than 7 days, intolerable Grade 2 cutaneous reactions, or Grade 3 cutaneous reactions, withhold GILOTRIF until the adverse reaction resolves to Grade 1 or less and resume GILOTRIF with appropriate dose reduction",
      grade: "US prescribing information (section 5.2; section 2.3 gives the 10 mg step)",
    },
    {
      action: "Gefitinib: withhold for up to 14 days for a grade 3 or worse skin reaction and restart when it has resolved or improved to grade 1; the label gives no lower dose",
      why: "Gefitinib comes in one strength, so the rule is a pause rather than a dose reduction.",
      source: "iressa-label",
      quote: "Resume treatment with IRESSA when the adverse reaction fully resolves or improves to NCI CTCAE Grade 1.",
      grade: "US prescribing information (section 2.4)",
    },
    {
      action: "Erlotinib: withhold for a severe rash that does not respond to medical management, and restart 50 mg lower once it has resolved to baseline or grade 1; stop for severe blistering or peeling skin conditions",
      why: "The erlotinib label asks for skin treatment first and a pause only if that fails.",
      source: "erlotinib-label",
      quote: "Reduce erlotinib tablets by 50 mg decrements when restarting therapy following withholding treatment for a dose-limiting toxicity that has resolved to baseline or grade ≤ 1.",
      grade: "US prescribing information for generic erlotinib (section 2.4, table footnote)",
    },
  ],
  bestInClass: {
    statement: "Pre-emptive treatment from day 1 with an oral tetracycline, moisturiser, sunscreen and a mild topical steroid is the best-supported approach for EGFR antibodies, on the MASCC 2011 guideline (systemic tetracycline Level II, grade A) and two randomised trials (STEPP, J-STEPP), and oral antibiotics are the only preventive measure significant in the 2022 meta-analysis. For amivantamab the US label now builds the COCOON regimen into dosing, on the strength of a randomised trial. The evidence is not uniform: a post hoc analysis of first-line panitumumab in the Valentino trial found no significant reduction in rash with doxycycline. The ESMO 2021 dermatological toxicity guideline, the most recent international guideline, could not be read, and MASCC has not updated its 2011 guideline in any source found.",
    sources: ["mascc-2011", "stepp-2010", "j-stepp-2015", "egfr-ma-2022", "rybrevant-label", "cocoon-2025", "valentino-2021", "esmo-derm-2021"],
  },
  variants: [
    {
      name: "COCOON enhanced dermatologic management (amivantamab with lazertinib)",
      differs: "Twelve weeks of oral doxycycline or minocycline (rather than 6), then 9 months of clindamycin 1 per cent on the scalp, chlorhexidine 4 per cent on fingernails and toenails, and ceramide-based moisturiser at least daily.",
      evidence: "Randomised phase 2 trial of 201 people: grade 2 or worse dermatologic adverse events of interest by week 12 in 42 per cent against 75 per cent with standard care (odds ratio 0.24); patient-reported quality of life favoured the regimen. Now in the US amivantamab label.",
      sources: ["cocoon-2025", "rybrevant-label"],
    },
    {
      name: "Reactive treatment only (first-line panitumumab, Valentino analysis)",
      differs: "Treating rash when it appears rather than with routine prophylaxis.",
      evidence: "Post hoc, non-randomised comparison within the Valentino trial (226 people): any-grade rash 81 per cent with doxycycline prophylaxis against 90 per cent without (P = 0.085), grade 3 or 4 rash 27 against 25 per cent; no difference in dose delays, reductions or survival.",
      sources: ["valentino-2021"],
    },
    {
      name: "Cetuximab after a severe skin reaction: the US label and the EU product information side by side",
      differs: "Both pause cetuximab at grade 3 or worse, keep the dose after a first occurrence, lower it after the second and third, and stop at the fourth. They differ in when to restart and in what they state. The US label delays the infusion 1 to 2 weeks and continues if the condition improves, grades by NCI Common Toxicity Criteria version 2.0, and gives the lower doses only as 200 and 150 mg/m2, the weekly figures. The EU text says: \"Treatment may only be resumed if the reaction has resolved to grade 2.\" It sets no number of weeks, grades by CTCAE, and gives the lower doses for the two-weekly schedule as well (400 then 300 mg/m2).",
      evidence: "Regulatory labelling on each side; neither is graded and no trial comparing the two restart rules was read. The US label also approves a 500 mg/m2 two-weekly schedule but its dose modification table states the reduced doses in weekly figures only.",
      sources: ["erbitux-label", "erbitux-smpc"],
    },
    {
      name: "Prophylaxis as the cetuximab EU product information words it",
      differs: "Six to eight weeks of oral tetracycline rather than the six weeks of MASCC 2011. The EU text: \"According to clinical practice guidelines prophylactic use of oral tetracyclines (6 - 8 weeks) and topical application of 1% hydrocortisone cream with moisturiser should be considered.\"",
      evidence: "The product information does not name the guidelines it refers to. The US cetuximab label read gives no prophylactic regimen; it asks for monitoring and limited sun exposure.",
      sources: ["erbitux-smpc", "erbitux-label", "mascc-2011"],
    },
    {
      name: "Osimertinib: no dose rule for ordinary rash in the label",
      differs: "The US osimertinib dose modification table has no row for acne-like rash. Its skin rows are for rare severe reactions: \"Withhold TAGRISSO if EMM, SJS, or TEN is suspected and permanently discontinue if confirmed.\" (erythema multiforme major, Stevens-Johnson syndrome and toxic epidermal necrolysis), and a warning to withhold if inflammation of the skin's blood vessels is suspected. A rash is otherwise covered by the general rule for any grade 3 or worse reaction: withhold for up to 3 weeks, then resume at 80 mg or 40 mg daily if it has improved to grade 2 or better, or stop if it has not.",
      evidence: "US prescribing information; no step is written for it because the rule is not specific to skin.",
      sources: ["tagrisso-label"],
    },
  ],
  grades: [
    { claim: "Pre-emptive skin treatment halved grade 2 or worse skin toxicity with panitumumab (STEPP)", grade: "randomised phase 2 open-label trial, n = 95", source: "stepp-2010", quote: "The incidence of protocol-specified >or= grade 2 skin toxicities during the 6-week skin treatment period was 29% and 62% for the pre-emptive and reactive groups, respectively." },
    { claim: "The result was repeated in Japanese patients (J-STEPP)", grade: "randomised open-label trial, n = 95, P < 0.001", source: "j-stepp-2015", quote: "The primary end point was achieved (21.3 and 62.5% [risk ratio: 0.34; p < 0.001], for pre-emptive and reactive treatment, respectively)." },
    { claim: "Oral antibiotics reduced grade 2 or worse acneiform rash by 40 per cent", grade: "systematic review and meta-analysis", source: "egfr-ma-2022", quote: "Oral antibiotics had the greatest efficacy in preventing grade 2 or higher acneiform eruptions with a relative risk reduction of 40% (RR = .6, 95% CI .46-.79, p < .01)." },
    { claim: "The COCOON regimen reduced grade 2 or worse dermatologic events with amivantamab and lazertinib", grade: "randomised phase 2 trial, n = 201, p < 0.0001", source: "cocoon-2025", quote: "At a median follow-up of 7.1 months, COCOON DM demonstrated significant reduction in the primary end point versus SoC DM (42% versus 75%; OR, 0.24; 95% confidence interval, 0.13-0.45; p < 0.0001)." },
    { claim: "Cetuximab, US label: 200 mg/m2 after a second grade 3 or 4 skin reaction", grade: "US prescribing information (Table 1)", source: "erbitux-label", quote: "Delay infusion 1 to 2 weeks; if condition improves, continue at 200 mg/m2." },
    { claim: "Cetuximab, US label: 150 mg/m2 after a third grade 3 or 4 skin reaction", grade: "US prescribing information (Table 1)", source: "erbitux-label", quote: "Delay infusion 1 to 2 weeks; if condition improves, continue at 150 mg/m2." },
    { claim: "Cetuximab, EU: treatment must be interrupted at grade 3 or worse", grade: "EU summary of product characteristics, section 4.4", source: "erbitux-smpc", quote: "If a patient experiences an intolerable or severe skin reaction (≥ grade 3; Common Terminology Criteria for Adverse Events, CTCAE), cetuximab therapy must be interrupted." },
    { claim: "Cetuximab, EU: same dose after a first severe skin reaction", grade: "EU summary of product characteristics, section 4.4", source: "erbitux-smpc", quote: "If the severe skin reaction occurred for the first time, treatment may be resumed without any change in dose level." },
    { claim: "Cetuximab, EU: permanent discontinuation at a fourth occurrence or if the reaction does not settle to grade 2", grade: "EU summary of product characteristics, section 4.4", source: "erbitux-smpc", quote: "If severe skin reactions occur a fourth time or do not resolve to grade 2 during interruption of treatment, permanent discontinuation of cetuximab treatment is required." },
    { claim: "Amivantamab: stop if a grade 3 skin reaction has not improved within 2 weeks", grade: "US prescribing information (Table 7)", source: "rybrevant-label", quote: "If no improvement within 2 weeks, permanently discontinue treatment." },
    { claim: "Afatinib: restart at 10 mg a day less", grade: "US prescribing information (section 2.3)", source: "gilotrif-label", quote: "Reinstitute GILOTRIF at a reduced dose, i.e., 10 mg per day less than the dose at which the adverse reaction occurred." },
    { claim: "Gefitinib: interrupt or stop for severe blistering or peeling conditions", grade: "US prescribing information (section 5.6)", source: "iressa-label", quote: "IRESSA treatment should be interrupted or discontinued if the patient develops severe bullous, blistering or exfoliating conditions." },
  ],
  sources: [
    { key: "mascc-2011", label: "Clinical practice guidelines for the prevention and treatment of EGFR inhibitor-associated dermatologic toxicities", publisher: "MASCC Skin Toxicity Study Group, Supportive Care in Cancer", year: 2011, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3128700/", doi: "10.1007/s00520-011-1197-6", gradingScheme: "Levels of evidence I (meta-analyses or high-powered randomised trials) to V (case reports); recommendation grades A (level I or consistent multiple studies) to D (little or no evidence).", read: "full-text", accessed: "2026-11-11" },
    { key: "esmo-derm-2021", label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2021, url: "https://doi.org/10.1016/j.annonc.2020.11.005", doi: "10.1016/j.annonc.2020.11.005", read: "not-reachable", accessed: "2026-11-11" },
    { key: "rybrevant-label", label: "RYBREVANT (amivantamab-vmjw) prescribing information", publisher: "Janssen Biotech, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1466c070-9f97-4fa4-a955-6a6b59981fb8", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "vectibix-label", label: "VECTIBIX (panitumumab) prescribing information, including boxed warning", publisher: "Amgen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e0fa4bca-f245-4d92-ae29-b0c630a315c2", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "stepp-2010", label: "Skin toxicity evaluation protocol with panitumumab (STEPP), a phase II, open-label, randomized trial evaluating the impact of a pre-emptive skin treatment regimen on skin toxicities and quality of life in patients with metastatic colorectal cancer", publisher: "Journal of Clinical Oncology", year: 2010, url: "https://europepmc.org/abstract/MED/20142600", doi: "10.1200/JCO.2008.21.7828", read: "abstract", accessed: "2026-11-11" },
    { key: "j-stepp-2015", label: "Randomized controlled trial on the skin toxicity of panitumumab in Japanese patients with metastatic colorectal cancer: HGCSG1001 study; J-STEPP", publisher: "Future Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/25686117", doi: "10.2217/fon.14.251", read: "abstract", accessed: "2026-11-11" },
    { key: "cocoon-2025", label: "Enhanced Versus Standard Dermatologic Management With Amivantamab-Lazertinib in EGFR-Mutated Advanced NSCLC: The COCOON Global Randomized Controlled Trial", publisher: "Journal of Thoracic Oncology", year: 2025, url: "https://europepmc.org/abstract/MED/40923969", doi: "10.1016/j.jtho.2025.07.117", read: "abstract", accessed: "2026-11-11" },
    { key: "valentino-2021", label: "Systemic doxycycline for pre-emptive treatment of anti-EGFR-related skin toxicity in patients with metastatic colorectal cancer receiving first-line panitumumab-based therapy: a post hoc analysis of the Valentino study", publisher: "Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/33392769", doi: "10.1007/s00520-020-05972-2", read: "abstract", accessed: "2026-11-11" },
    { key: "egfr-ma-2022", label: "Prevention and management of acneiform rash associated with EGFR inhibitor therapy: a systematic review and meta-analysis", publisher: "Asia-Pacific Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/35352492", doi: "10.1111/ajco.13740", read: "abstract", accessed: "2026-11-11" },
    { key: "erbitux-label", label: "ERBITUX (cetuximab) prescribing information", publisher: "ImClone, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8bc6397e-4bd8-4d37-a007-a327e4da34d9", gradingScheme: "US prescribing information: regulatory labelling written by the manufacturer and approved by the FDA, not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "erbitux-smpc", label: "Erbitux (cetuximab) EU product information: summary of product characteristics", publisher: "Merck Europe, via the European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/erbitux-epar-product-information_en.pdf", gradingScheme: "EU summary of product characteristics: regulatory labelling written by the manufacturer and approved through the EMA, not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "lazcluze-label", label: "LAZCLUZE (lazertinib) prescribing information", publisher: "Janssen Biotech, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c417f9ee-2027-4ed5-92ad-3c19266de16c", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "gilotrif-label", label: "GILOTRIF (afatinib) prescribing information", publisher: "Boehringer Ingelheim, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fd638e5e-8032-e7ca-0179-95e96ab5d387", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "iressa-label", label: "IRESSA (gefitinib) prescribing information", publisher: "AstraZeneca, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=827d60e8-7e07-41b7-c28b-49ef1c4a5a41", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "erlotinib-label", label: "Erlotinib tablets prescribing information (generic; the TARCEVA brand label was not found current on DailyMed)", publisher: "Alembic Pharmaceuticals, via DailyMed (US National Library of Medicine)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ab6f3cb3-34a8-4492-a5d7-fb6b055a2d6b", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-16" },
    { key: "tagrisso-label", label: "TAGRISSO (osimertinib) prescribing information", publisher: "AstraZeneca, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5e81b4a7-b971-45e1-9c31-29cea8c87ce7", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-16" },
  ],
  gaps: [
    "The ESMO 2021 dermatological toxicity guideline could not be read (no abstract in Europe PMC; the publisher refused a script), so its grades and any changes it made to the MASCC 2011 regimen are not given here.",
    "MASCC's guideline is from 2011; no later MASCC edition was found. Its recommendations predate amivantamab and osimertinib.",
    "The trials and the meta-analysis were read as abstracts only; tetracycline contraindications, side effects and interactions are not covered by the sources read.",
    "Prophylaxis evidence is strongest for EGFR antibodies; for EGFR tyrosine kinase inhibitors such as osimertinib, which cause milder rash, no randomised trial of prophylaxis was read.",
    "Dose rules for cetuximab, amivantamab, lazertinib, afatinib, gefitinib and erlotinib were added on 16 November 2026 from each label. The EU product information was read for cetuximab only; for the other drugs only the US label was read, and European texts may differ as they do for cetuximab.",
    "No guideline position could be set beside the label dose rules: MASCC 2011 recommends skin treatments by evidence level and gives no dose modification schedule, and the ESMO 2021 guideline, which is the one expected to give one, could not be read.",
    "The US cetuximab label states its reduced doses after a severe skin reaction as weekly figures (200 and 150 mg/m2) although it also approves 500 mg/m2 every two weeks; only the EU text gives two-weekly figures (400 and 300 mg/m2).",
    "The erlotinib rule was read from a generic label (text revised September 2020) because no current TARCEVA label was found on DailyMed; the amivantamab dose reduction levels depend on body weight and regimen and are in the label's own table, not reproduced here. The subcutaneous amivantamab label (RYBREVANT FASPRO) was not read.",
    "The osimertinib label has no dose rule specific to acne-like rash (see variants), and dacomitinib and other EGFR tablets the record does not name were not read.",
    "Paronychia (nail fold inflammation) and scalp problems, which last longer than the rash, are covered only in part: the MASCC guideline's paronychia recommendations rest on expert opinion.",
  ],
  drugs: ["cetuximab", "panitumumab", "amivantamab", "lazertinib", "erlotinib", "gefitinib", "afatinib", "osimertinib", "hydrocortisone", "doxycycline", "minocycline"],
  cancers: ["colorectal", "egfr-mutant-nsclc"],
  terms: ["rash-skin-toxicity", "chemotherapy-side-effects-colorectal"],
  sections: ["supportive-care"],
  tags: ["protocol", "skin-toxicity", "egfr-inhibitor", "supportive-care"],
});
