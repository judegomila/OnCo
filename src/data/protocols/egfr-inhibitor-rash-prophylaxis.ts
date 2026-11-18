import { protocol } from "./helpers";

/*
 * Pre-emptive skin care for the acne-like (papulopustular) rash of EGFR inhibitors: an oral tetracycline, moisturiser,
 * sunscreen and a mild topical steroid from the first day, then dose changes by grade. Covers the EGFR antibodies
 * (cetuximab, panitumumab), the bispecific amivantamab, and the EGFR tyrosine kinase inhibitors.
 *
 * Second accuracy pass, 17 November 2026. Every source was fetched again as raw text into a scratch directory and each
 * claim, dose and quote was checked against it; quotes were checked by script (whitespace normalised, tags stripped):
 * - MASCC Skin Toxicity Study Group guideline (Lacouture et al., Support Care Cancer 2011): full text XML from the
 *   Europe PMC REST endpoint (PMC3128700), including Tables 1 to 3 and 10. DOI resolved through Crossref, which lists
 *   no update. No later MASCC edition on EGFR inhibitor rash was found in Europe PMC (the MASCC 2020 skin paper is
 *   about checkpoint inhibitors).
 * - ESMO 2021 guideline on dermatological toxicities (Ann Oncol 2021): still not readable. annalsofoncology.org
 *   returned 403 to one request, Europe PMC holds no abstract or full text, and the guideline page on esmo.org carries
 *   no text a script can read. Crossref lists no update or replacement for its DOI.
 * - US labels as DailyMed SPL XML through the DailyMed web service: RYBREVANT (SPL version 17, published 13 July
 *   2026, text revised November 2025), VECTIBIX (version 161, published 26 June 2026), ERBITUX (version 58, effective
 *   16 April 2026), LAZCLUZE (version 6, revised April 2026), GILOTRIF (version 20, published 19 November 2025), IRESSA
 *   (version 19, published 18 August 2025), TAGRISSO (version 37, revised September 2026) and generic erlotinib
 *   (Alembic, version 3, June 2024, text revised September 2020; DailyMed still lists no TARCEVA brand label other than
 *   a repackager's from 2012).
 * - Erbitux EU product information from ema.europa.eu (PDF dated 17 June 2026, read with pdftotext), section 4.4 and
 *   the package leaflet.
 * - Trials and the meta-analysis, as abstracts from the Europe PMC REST API (no open full text exists for any): STEPP,
 *   J-STEPP, COCOON, the Valentino post hoc analysis and the 2022 meta-analysis.
 * - Added in this pass: a 2025 European and US Delphi position paper on EGFR inhibitor acneiform rash (J Eur Acad
 *   Dermatol Venereol, full text XML from Europe PMC, PMC11934016, DOI resolved through Crossref), and the NHS
 *   medicines page on doxycycline (last reviewed 5 September 2025) for the pregnancy and sunlight cautions.
 *
 * What the pass changed: minocycline is no longer given MASCC's 6 weeks (its supporting study ran 8 weeks); mechanism
 * and frequency claims no source states were removed from the "why" lines; the tetracycline cautions now rest on a
 * source; the panitumumab and lazertinib rules were completed; the US cetuximab quotes were replaced because the
 * label prints the dose unit with a superscript that does not survive as text; and the Delphi paper is shown where
 * it differs from MASCC.
 *
 * First written 11 November 2026; label dose rules added 16 November 2026.
 */
export const egfrInhibitorRashProphylaxis = protocol({
  id: "egfr-inhibitor-rash-prophylaxis",
  name: "EGFR inhibitor rash: pre-emptive skin care, antibiotics and dose changes",
  aka: ["EGFR inhibitor rash prophylaxis", "acneiform rash", "papulopustular rash", "pre-emptive doxycycline", "pre-emptive skin treatment", "cetuximab rash", "panitumumab rash", "amivantamab skin care", "COCOON regimen", "STEPP regimen"],
  domain: "symptom-management",
  tldr: "Drugs that block EGFR, such as cetuximab, panitumumab, amivantamab and EGFR tablets for lung cancer, very often cause an acne-like rash. Starting skin care on day one makes a bad rash less likely: doxycycline or minocycline for the first weeks, moisturiser, sunscreen, and often a mild steroid cream. Tell your team promptly about any skin reaction, and at once if skin blisters or peels.",
  simple: "Some cancer drugs cause a spotty rash. Starting antibiotic tablets, moisturiser and sunscreen on day one helps. Tell your team if the rash gets bad.",
  summary: "The MASCC Skin Toxicity Study Group (2011) recommends preventive management for EGFR inhibitor rash because it is frequent and appears in the first 2 to 4 weeks: hydrocortisone 1 per cent with moisturiser and sunscreen twice daily, plus doxycycline 100 mg twice daily for the first 6 weeks, on randomised data. Its table also lists minocycline 100 mg daily, which one study found effective over the first 8 weeks. In STEPP (panitumumab, 95 people), protocol-specified grade 2 or worse skin toxicity in 6 weeks was 29 per cent with pre-emptive treatment against 62 per cent with reactive treatment; J-STEPP repeated the result in Japanese patients (21.3 against 62.5 per cent). A 2022 meta-analysis found oral antibiotics reduced grade 2 or worse rash by 40 per cent; topical antibiotics, vitamin K1 cream and sunscreen were not significant. A 2025 European and US expert consensus (Delphi) also backs pre-emptive doxycycline, at 100 or 200 mg a day for at least 6 weeks, but favours a medium-potency steroid cream and did not reach consensus on hydrocortisone 1 per cent. For amivantamab, the current US label recommends at initiation a regimen matching the one tested in the COCOON trial, which it does not name: doxycycline or minocycline 100 mg twice daily for 12 weeks, then clindamycin 1 per cent lotion to the scalp once daily for the next 9 months, a non-comedogenic moisturiser, a daily 4 per cent chlorhexidine wash for hands and feet, and sun protection. In COCOON (amivantamab with lazertinib, 201 people) grade 2 or worse dermatologic events by week 12 were 42 per cent with the regimen against 75 per cent with standard care. Doubts remain: in a post hoc analysis of the Valentino trial of first-line panitumumab, doxycycline prophylaxis did not significantly lower rash. Dose rules come from labels: panitumumab is withheld for 1 to 2 doses at grade 3 and restarted at 100, 80 then 60 per cent by occurrence, and stopped at the fourth occurrence, at grade 4, or if a grade 3 reaction does not recover. Cetuximab is paused at grade 3 or worse and continued at 250, then 200, then 150 mg/m² (weekly figures) by occurrence and stopped at the fourth; the US label delays 1 to 2 weeks and continues if the reaction improves, while the EU product information allows restarting only once it has settled to grade 2 and adds two-weekly figures (400 then 300 mg/m²). Amivantamab is withheld at grade 3 and resumed at a reduced dose; with lazertinib the amivantamab dose is reduced first. Afatinib is withheld for prolonged or intolerable grade 2 or grade 3 and restarted 10 mg lower; gefitinib is withheld for up to 14 days at grade 3; erlotinib is withheld for severe rash not responding to treatment and restarted 50 mg lower; the osimertinib label has no rash-specific rule. The ESMO 2021 guideline could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["outpatient-clinic", "chemotherapy-day-unit", "home"],
  },
  population: "Adults starting an EGFR-targeted drug: cetuximab (colorectal and head and neck cancer), panitumumab (colorectal cancer), amivantamab with or without lazertinib, and EGFR tyrosine kinase inhibitors (erlotinib, gefitinib, afatinib, osimertinib) in lung cancer. STEPP and J-STEPP were in metastatic colorectal cancer on panitumumab; COCOON in previously untreated EGFR-mutant lung cancer on amivantamab with lazertinib. The NHS says doxycycline is not usually used in pregnancy or while breastfeeding, though a doctor may recommend it if the benefits outweigh the risks, and that it may not be suitable after an allergic reaction to an antibiotic. MASCC makes its recommendation \"unless there are contraindications\" and does not list them; the sources read do not give the contraindications of minocycline.",
  trigger: "An EGFR-targeted drug is planned; prophylaxis starts on the first day of treatment.",
  steps: [
    {
      action: "Start preventive skin care when the EGFR inhibitor starts, rather than waiting for the rash, unless there is a contraindication",
      why: "The rash is frequent and usually comes within the first 2 to 4 weeks, so the guideline recommends acting before it appears.",
      source: "mascc-2011",
      quote: "Based on the high frequency of rash in EGFRI-treated patients and the consistent presentation within the first 2–4 weeks of therapy, preventive/prophylactic management is recommended unless there are contraindications based on patient and/or health care provider factors",
      grade: "No grade on this sentence; Table 3 gives the preventive oral antibiotics level II, grade A and the preventive creams level II, grade C",
    },
    {
      action: "Prescribe doxycycline 100 mg twice daily for the first 6 weeks, with hydrocortisone 1 per cent cream, a moisturiser and sunscreen twice daily; minocycline 100 mg daily is the listed alternative, studied over the first 8 weeks",
      why: "In the STEPP trial a regimen of this kind lowered grade 2 or worse skin toxicity in the first 6 weeks from 62 to 29 per cent. MASCC prefers doxycycline in kidney impairment and notes that minocycline is less likely to cause sun sensitivity.",
      source: "mascc-2011",
      quote: "Hydrocortisone 1% combined with moisturizer, sunscreen, and doxycycline 100 mg bid for the first 6 weeks is recommended based on randomized data.",
      grade: "Level II, grade A (minocycline 100 mg daily, doxycycline 100 mg bid); Level II, grade C (hydrocortisone 1% cream with moisturizer and sunscreen twice daily)",
    },
    {
      action: "With amivantamab, follow the label regimen from day 1: doxycycline or minocycline 100 mg by mouth twice daily for the first 12 weeks, then clindamycin 1 per cent lotion on the scalp once daily for the next 9 months",
      why: "The label recommends these medicines to reduce the risk and severity of skin reactions. In the COCOON trial a regimen of this kind lowered grade 2 or worse skin events by week 12 from 75 to 42 per cent.",
      source: "rybrevant-label",
      quote: "Administer an oral antibiotic (doxycycline or minocycline, 100 mg orally twice daily) starting on Day 1 for the first 12 weeks of treatment.",
      grade: "US prescribing information (section 2.6)",
    },
    {
      action: "With amivantamab, add a non-comedogenic moisturiser on the face and whole body except the scalp, and a 4 per cent chlorhexidine wash for the hands and feet once daily",
      why: "Both are part of the regimen the label recommends to reduce the risk and severity of skin reactions; the label does not give a separate reason for each item.",
      source: "rybrevant-label",
      quote: "Wash hands and feet with 4% chlorhexidine solution once daily.",
      grade: "US prescribing information (section 2.6)",
    },
    {
      action: "Advise limiting sun exposure during treatment and for 2 months after the last dose, with sunscreen and a hat; the amivantamab label adds protective clothing and a broad-spectrum sunscreen",
      why: "The panitumumab label says sunlight can make the skin reaction worse. The NHS lists skin that is more sensitive to the sun as a side effect of doxycycline.",
      source: "vectibix-label",
      quote: "Advise patients to limit sun exposure (use sunscreen, wear hats) while receiving Vectibix and for 2 months after the last dose of Vectibix therapy",
      grade: "US prescribing information (section 17)",
    },
    {
      action: "Ask the patient to report skin changes promptly, and to seek medical help immediately for blistering or peeling skin",
      why: "The dose or the gap between treatments may need to change, and blistering or peeling can be a sign of a severe reaction that needs urgent care.",
      source: "erbitux-smpc",
      quote: "If you notice other extensive skin alterations, please inform your doctor as soon as possible because the Erbitux dose or the time between infusions may need to be changed.",
      grade: "EU package leaflet, section 4",
    },
    {
      action: "If rash develops, treat with a medium- to high-potency topical steroid; MASCC's treatment table also lists oral doxycycline 100 mg twice daily or minocycline 100 mg daily",
      why: "MASCC bases this on laboratory studies showing inflammatory signals released after EGFR inhibitors. A 2025 expert consensus advises against irritating products of the kind used for ordinary acne.",
      source: "mascc-2011",
      quote: "Reactive use of medium- to high-potency topical corticosteroids is recommended based on studies showing in vitro release of inflammatory chemokines after EGFRI therapy.",
      grade: "Level IV, grade C",
    },
    {
      action: "Panitumumab: at a first grade 3 skin reaction, withhold 1 to 2 doses and restart at the original dose once it is below grade 3; restart at 80 per cent after the second occurrence and 60 per cent after the third; stop at the fourth occurrence, at grade 4, or if a grade 3 reaction does not recover after withholding 1 or 2 doses",
      why: "A pause lets the skin settle while keeping the treatment going; repeated severe rashes need a lower dose.",
      source: "vectibix-label",
      quote: "Upon first occurrence of a Grade 3 (NCI-CTC/CTCAE) dermatologic reaction, withhold 1 to 2 doses of Vectibix. If the reaction improves to < Grade 3, reinitiate Vectibix at the original dose.",
      grade: "US prescribing information (section 2.3)",
    },
    {
      action: "Cetuximab (US label): at a grade 3 or 4 skin reaction, delay the infusion for 1 to 2 weeks; if it improves, continue at 250 mg/m² after the first occurrence, 200 mg/m² after the second and 150 mg/m² after the third; stop cetuximab if it does not improve, or at the fourth occurrence",
      why: "A short pause lets a severe rash settle, and the label lowers the dose after a repeat while treatment continues.",
      source: "erbitux-label",
      quote: "Withhold, reduce dose or permanently discontinue ERBITUX based on severity of acneiform rash or mucocutaneous disease",
      grade: "US prescribing information (section 5.4; the figures are in Table 1, section 2.5)",
    },
    {
      action: "Cetuximab (EU product information): interrupt at grade 3 or worse and resume only once the reaction has settled to grade 2; same dose after the first occurrence, 20 per cent lower after the second (200 mg/m² weekly or 400 mg/m² every two weeks), 40 per cent lower after the third (150 mg/m² weekly or 300 mg/m² every two weeks); stop at the fourth, or if it does not settle to grade 2",
      why: "The European text ties restarting to how far the rash has settled rather than to a set number of weeks, and gives figures for the two-weekly schedule as well.",
      source: "erbitux-smpc",
      quote: "If the reaction has resolved to grade 2 treatment may only be resumed with a dose reduction of 20% (200 mg/m² BSA in the weekly dosing regimen, 400 mg/m² BSA in the biweekly dosing regimen) after the second occurrence and with a dose reduction of 40% (150 mg/m² BSA in the weekly dosing regimen, 300 mg/m² BSA in the biweekly dosing regimen) after the third occurrence.",
      grade: "EU summary of product characteristics, section 4.4",
    },
    {
      action: "Amivantamab: at grade 1 or 2, start supportive skin care and reassess after 2 weeks, considering a dose reduction if the rash has not improved; at grade 3, withhold, and resume at a reduced dose once it is grade 2 or better, stopping if there is no improvement within 2 weeks; stop permanently for grade 4 or severe blistering or peeling skin conditions",
      why: "The label names topical steroids and topical or oral antibiotics as supportive care, adds oral steroids and a dermatology opinion to consider at grade 3, and asks for prompt referral to a dermatologist if a rash is severe, unusual or not improving within 2 weeks.",
      source: "rybrevant-label",
      quote: "Upon recovery to ≤ Grade 2, resume RYBREVANT at reduced dose.",
      grade: "US prescribing information (Table 7, Grade 3)",
    },
    {
      action: "Lazertinib with amivantamab: for a grade 2 skin reaction that has not improved after 2 weeks of skin care, reduce the amivantamab dose and keep lazertinib the same, then reassess every 2 weeks and reduce lazertinib if there is still no improvement; at grade 3 withhold both, resume amivantamab at a reduced dose once it is grade 2 or better, and stop both if there is no improvement within 2 weeks; at grade 4 stop amivantamab permanently and withhold lazertinib",
      why: "The label lowers the amivantamab dose first, and the lazertinib dose only if the rash still has not improved.",
      source: "lazcluze-label",
      quote: "If there is no improvement after 2 weeks, reduce amivantamab dose and continue LAZCLUZE at the same dose.",
      grade: "US prescribing information (Table 2, Grade 2)",
    },
    {
      action: "Afatinib: withhold for a grade 2 skin reaction that lasts more than 7 days or is intolerable, or for grade 3; restart once it is grade 1 or better at 10 mg a day less; stop permanently for life-threatening blistering or peeling skin lesions",
      why: "The label pauses afatinib until the skin has settled and then restarts it at a lower daily dose.",
      source: "gilotrif-label",
      quote: "For patients who develop prolonged Grade 2 cutaneous adverse reactions lasting more than 7 days, intolerable Grade 2 cutaneous reactions, or Grade 3 cutaneous reactions, withhold GILOTRIF until the adverse reaction resolves to Grade 1 or less and resume GILOTRIF with appropriate dose reduction",
      grade: "US prescribing information (section 5.2; section 2.3 gives the 10 mg step)",
    },
    {
      action: "Gefitinib: withhold for up to 14 days for a grade 3 or worse skin reaction and restart when it has resolved or improved to grade 1; the label gives no lower dose",
      why: "The label lists gefitinib in one tablet strength, 250 mg, so the rule is a pause rather than a dose reduction.",
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
    statement: "Pre-emptive treatment from the start with an oral tetracycline, moisturiser, sunscreen and a topical steroid is the best-supported approach for EGFR antibodies, on the MASCC 2011 guideline (preventive doxycycline or minocycline: level II, grade A; hydrocortisone 1 per cent with moisturiser and sunscreen: level II, grade C) and two randomised trials (STEPP, J-STEPP), and oral antibiotics are the only preventive measure significant in the 2022 meta-analysis. A 2025 European and US Delphi consensus agrees that pre-emptive treatment should be offered to everyone due to start an EGFR inhibitor, and differs on the cream: it favours a medium-potency steroid twice daily and did not reach consensus on hydrocortisone 1 per cent. For amivantamab the US label recommends a 12-week antibiotic regimen with scalp, moisturiser and chlorhexidine steps, matching the regimen that lowered skin events in the randomised COCOON trial. The evidence is not uniform: a post hoc analysis of first-line panitumumab in the Valentino trial found no significant reduction in rash with doxycycline. The ESMO 2021 dermatological toxicity guideline, the most recent from ESMO in any source found, could not be read, and MASCC has not updated its 2011 guideline in any source found.",
    sources: ["mascc-2011", "stepp-2010", "j-stepp-2015", "egfr-ma-2022", "delphi-2025", "rybrevant-label", "cocoon-2025", "valentino-2021", "esmo-derm-2021"],
  },
  variants: [
    {
      name: "COCOON enhanced dermatologic management (amivantamab with lazertinib)",
      differs: "Twelve weeks of oral doxycycline or minocycline 100 mg twice daily (rather than 6), then clindamycin 1 per cent on the scalp daily from week 13 to week 52, chlorhexidine 4 per cent on fingernails and toenails daily, and ceramide-based moisturiser on the body and face at least daily. The label words two items differently: clindamycin for the next 9 months, and chlorhexidine as a wash for the hands and feet.",
      evidence: "Randomised phase 2 trial of 201 people: grade 2 or worse dermatologic adverse events of interest by week 12 in 42 per cent against 75 per cent with standard care (odds ratio 0.24); patient-reported outcomes favoured the regimen. The same components are in the US amivantamab label, which does not name the trial.",
      sources: ["cocoon-2025", "rybrevant-label"],
    },
    {
      name: "The 2025 European and US Delphi consensus: a different cream and a range of doxycycline doses",
      differs: "Doxycycline pre-emptively at 100 or 200 mg a day (the panel could not agree on one dose), for at least 6 weeks, stopping after 6 to 8 weeks if no rash has developed and continuing beyond 8 weeks if one has. A medium-potency steroid cream twice daily rather than hydrocortisone 1 per cent, on which the panel did not reach consensus. Minocycline rather than doxycycline for people with a history of photosensitivity or where the UV index is high. Sunscreen of SPF above 30 and a daily emollient for everyone. Once a rash appears: doxycycline 200 mg a day for grade 2 or 3 but not grade 1, and no topical antibiotics.",
      evidence: "A two-round Delphi survey of 32 experts led by members of a European Academy of Dermatology and Venereology task force; consensus means 75 per cent or more agreeing, which is expert opinion and not an evidence grade. 76.25 per cent agreed that pre-emptive treatment should be offered to everyone due to receive an EGFR inhibitor. MASCC 2011, by contrast, recommends hydrocortisone 1 per cent (level II, grade C) and lists doxycycline at 100 mg twice daily only.",
      sources: ["delphi-2025", "mascc-2011"],
    },
    {
      name: "Reactive treatment only (first-line panitumumab, Valentino analysis)",
      differs: "Treating rash when it appears rather than with routine prophylaxis.",
      evidence: "Post hoc, non-randomised comparison within the Valentino trial (226 people): any-grade rash 81 per cent with doxycycline prophylaxis against 90 per cent without (P = 0.085), grade 3 or 4 rash 27 against 25 per cent; no significant difference in treatment duration, delays, dose reductions or survival.",
      sources: ["valentino-2021"],
    },
    {
      name: "Cetuximab after a severe skin reaction: the US label and the EU product information side by side",
      differs: "Both pause cetuximab at grade 3 or worse, keep the dose after a first occurrence, lower it after the second and third, and stop at the fourth. They differ in when to restart and in what they state. The US label delays the infusion 1 to 2 weeks and continues if the condition improves, grades by NCI Common Toxicity Criteria version 2.0, and gives the lower doses only as 200 and 150 mg/m², the weekly figures. The EU text says: \"Treatment may only be resumed if the reaction has resolved to grade 2.\" It sets no number of weeks, grades by CTCAE, and gives the lower doses for the two-weekly schedule as well (400 then 300 mg/m²).",
      evidence: "Regulatory labelling on each side; neither is graded and no trial comparing the two restart rules was read. The US label also approves a 500 mg/m² two-weekly schedule but its dose modification table states the reduced doses in weekly figures only.",
      sources: ["erbitux-label", "erbitux-smpc"],
    },
    {
      name: "Prophylaxis as the cetuximab EU product information words it",
      differs: "Six to eight weeks of oral tetracycline rather than the six weeks MASCC 2011 gives for doxycycline. The EU text: \"According to clinical practice guidelines prophylactic use of oral tetracyclines (6 - 8 weeks) and topical application of 1% hydrocortisone cream with moisturiser should be considered.\"",
      evidence: "The product information does not name the guidelines it refers to. The US cetuximab label read gives no prophylactic regimen; it asks for monitoring and limited sun exposure.",
      sources: ["erbitux-smpc", "erbitux-label", "mascc-2011"],
    },
    {
      name: "Osimertinib: no dose rule for ordinary rash in the label",
      differs: "The US osimertinib dose modification table has no row for acne-like rash. Its skin row is for severe reactions reported after marketing: \"Withhold TAGRISSO if EMM, SJS, or TEN is suspected and permanently discontinue if confirmed.\" (erythema multiforme major, Stevens-Johnson syndrome and toxic epidermal necrolysis), and a warning asks for osimertinib to be withheld if inflammation of the skin's blood vessels is suspected. A rash is otherwise covered by the general rule for any grade 3 or worse reaction: withhold for up to 3 weeks, then resume at 80 mg or 40 mg daily if it has improved to grade 2 or better, or stop if it has not.",
      evidence: "US prescribing information; no step is written for it because the rule is not specific to skin.",
      sources: ["tagrisso-label"],
    },
  ],
  grades: [
    { claim: "Pre-emptive skin treatment more than halved grade 2 or worse skin toxicity with panitumumab (STEPP)", grade: "randomised phase 2 open-label trial, n = 95", source: "stepp-2010", quote: "The incidence of protocol-specified >or= grade 2 skin toxicities during the 6-week skin treatment period was 29% and 62% for the pre-emptive and reactive groups, respectively." },
    { claim: "The result was repeated in Japanese patients (J-STEPP)", grade: "randomised open-label trial, n = 95, p < 0.001", source: "j-stepp-2015", quote: "The primary end point was achieved (21.3 and 62.5% [risk ratio: 0.34; p < 0.001], for pre-emptive and reactive treatment, respectively)." },
    { claim: "Oral antibiotics reduced grade 2 or worse acneiform rash by 40 per cent", grade: "systematic review and meta-analysis", source: "egfr-ma-2022", quote: "Oral antibiotics had the greatest efficacy in preventing grade 2 or higher acneiform eruptions with a relative risk reduction of 40% (RR = .6, 95% CI .46-.79, p < .01)." },
    { claim: "The COCOON regimen reduced grade 2 or worse dermatologic events with amivantamab and lazertinib", grade: "randomised phase 2 trial, n = 201, p < 0.0001", source: "cocoon-2025", quote: "At a median follow-up of 7.1 months, COCOON DM demonstrated significant reduction in the primary end point versus SoC DM (42% versus 75%; OR, 0.24; 95% confidence interval, 0.13-0.45; p < 0.0001)." },
    { claim: "Minocycline 100 mg daily: the supporting study covered the first 8 weeks", grade: "Level II, grade A (Table 3, preventive, systemic)", source: "mascc-2011", quote: "Another study revealed that prophylactic minocycline 100 mg daily is an effective agent in reducing the number of lesions during the first 8 weeks." },
    { claim: "Delphi consensus: pre-emptive doxycycline at 100 or 200 mg a day", grade: "consensus recommendation (Table 2); the level of agreement for this item is in a supplementary table that was not read", source: "delphi-2025", quote: "Use of 100 or 200 mg/d of doxycycline" },
    { claim: "Panitumumab: stop at grade 4, or at a grade 3 reaction that does not recover", grade: "US prescribing information (section 2.3)", source: "vectibix-label", quote: "Permanently discontinue Vectibix following the occurrence of a Grade 4 dermatologic reaction or for a Grade 3 (NCI-CTC/CTCAE) dermatologic reaction that does not recover after withholding 1 or 2 doses." },
    { claim: "Cetuximab, US label: stop if the reaction does not improve after the delay (the reduced doses of 200 and 150 mg/m² are in the same table)", grade: "US prescribing information (Table 1)", source: "erbitux-label", quote: "If no improvement, discontinue ERBITUX." },
    { claim: "Cetuximab, EU: treatment must be interrupted at grade 3 or worse", grade: "EU summary of product characteristics, section 4.4", source: "erbitux-smpc", quote: "If a patient experiences an intolerable or severe skin reaction (≥ grade 3; Common Terminology Criteria for Adverse Events, CTCAE), cetuximab therapy must be interrupted." },
    { claim: "Cetuximab, EU: same dose after a first severe skin reaction", grade: "EU summary of product characteristics, section 4.4", source: "erbitux-smpc", quote: "If the severe skin reaction occurred for the first time, treatment may be resumed without any change in dose level." },
    { claim: "Cetuximab, EU: permanent discontinuation at a fourth occurrence or if the reaction does not settle to grade 2", grade: "EU summary of product characteristics, section 4.4", source: "erbitux-smpc", quote: "If severe skin reactions occur a fourth time or do not resolve to grade 2 during interruption of treatment, permanent discontinuation of cetuximab treatment is required." },
    { claim: "Amivantamab: stop if a grade 3 skin reaction has not improved within 2 weeks", grade: "US prescribing information (Table 7)", source: "rybrevant-label", quote: "If no improvement within 2 weeks, permanently discontinue treatment." },
    { claim: "Afatinib: restart at 10 mg a day less", grade: "US prescribing information (section 2.3)", source: "gilotrif-label", quote: "Reinstitute GILOTRIF at a reduced dose, i.e., 10 mg per day less than the dose at which the adverse reaction occurred." },
    { claim: "Gefitinib: interrupt or stop for severe blistering or peeling conditions", grade: "US prescribing information (section 5.6)", source: "iressa-label", quote: "IRESSA treatment should be interrupted or discontinued if the patient develops severe bullous, blistering or exfoliating conditions." },
    { claim: "Doxycycline is not usually used in pregnancy", grade: "NHS medicines information, not graded", source: "nhs-doxycycline", quote: "Tell your doctor if you're pregnant. Doxycycline is not usually used during pregnancy because it can affect how your baby’s teeth develop." },
  ],
  sources: [
    { key: "mascc-2011", label: "Clinical practice guidelines for the prevention and treatment of EGFR inhibitor-associated dermatologic toxicities", publisher: "MASCC Skin Toxicity Study Group, Supportive Care in Cancer", year: 2011, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3128700/", doi: "10.1007/s00520-011-1197-6", gradingScheme: "Levels of evidence I (meta-analyses or high-powered randomised trials) to V (case reports); recommendation grades A (level I or consistent multiple studies) to D (little or no evidence).", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-derm-2021", label: "Prevention and management of dermatological toxicities related to anticancer agents: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2021, url: "https://doi.org/10.1016/j.annonc.2020.11.005", doi: "10.1016/j.annonc.2020.11.005", read: "not-reachable", accessed: "2026-11-17" },
    { key: "delphi-2025", label: "Management of human epidermal growth factor receptor inhibitors-related acneiform rash: a position paper based on the first Europe/USA Delphi consensus process", publisher: "European Academy of Dermatology and Venereology Task Force Dermatology for Cancer Patients, Journal of the European Academy of Dermatology and Venereology", year: 2025, url: "https://europepmc.org/article/PMC/PMC11934016", doi: "10.1111/jdv.20391", gradingScheme: "Delphi survey: strong consensus is 75 per cent or more of respondents agreeing (or disagreeing), moderate consensus 50 to 74 per cent. Expert agreement, not a grade of evidence.", read: "full-text", accessed: "2026-11-17" },
    { key: "rybrevant-label", label: "RYBREVANT (amivantamab-vmjw) prescribing information (text revised November 2025)", publisher: "Janssen Biotech, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1466c070-9f97-4fa4-a955-6a6b59981fb8", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "vectibix-label", label: "VECTIBIX (panitumumab) prescribing information, including boxed warning", publisher: "Amgen, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e0fa4bca-f245-4d92-ae29-b0c630a315c2", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "stepp-2010", label: "Skin toxicity evaluation protocol with panitumumab (STEPP), a phase II, open-label, randomized trial evaluating the impact of a pre-emptive skin treatment regimen on skin toxicities and quality of life in patients with metastatic colorectal cancer", publisher: "Journal of Clinical Oncology", year: 2010, url: "https://europepmc.org/abstract/MED/20142600", doi: "10.1200/JCO.2008.21.7828", read: "abstract", accessed: "2026-11-17" },
    { key: "j-stepp-2015", label: "Randomized controlled trial on the skin toxicity of panitumumab in Japanese patients with metastatic colorectal cancer: HGCSG1001 study; J-STEPP", publisher: "Future Oncology", year: 2015, url: "https://europepmc.org/abstract/MED/25686117", doi: "10.2217/fon.14.251", read: "abstract", accessed: "2026-11-17" },
    { key: "cocoon-2025", label: "Enhanced Versus Standard Dermatologic Management With Amivantamab-Lazertinib in EGFR-Mutated Advanced NSCLC: The COCOON Global Randomized Controlled Trial", publisher: "Journal of Thoracic Oncology", year: 2025, url: "https://europepmc.org/abstract/MED/40923969", doi: "10.1016/j.jtho.2025.07.117", read: "abstract", accessed: "2026-11-17" },
    { key: "valentino-2021", label: "Systemic doxycycline for pre-emptive treatment of anti-EGFR-related skin toxicity in patients with metastatic colorectal cancer receiving first-line panitumumab-based therapy: a post hoc analysis of the Valentino study", publisher: "Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/33392769", doi: "10.1007/s00520-020-05972-2", read: "abstract", accessed: "2026-11-17" },
    { key: "egfr-ma-2022", label: "Prevention and management of acneiform rash associated with EGFR inhibitor therapy: a systematic review and meta-analysis", publisher: "Asia-Pacific Journal of Clinical Oncology", year: 2022, url: "https://europepmc.org/abstract/MED/35352492", doi: "10.1111/ajco.13740", read: "abstract", accessed: "2026-11-17" },
    { key: "erbitux-label", label: "ERBITUX (cetuximab) prescribing information", publisher: "ImClone, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8bc6397e-4bd8-4d37-a007-a327e4da34d9", gradingScheme: "US prescribing information: regulatory labelling written by the manufacturer and approved by the FDA, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "erbitux-smpc", label: "Erbitux (cetuximab) EU product information: summary of product characteristics and package leaflet", publisher: "Merck Europe, via the European Medicines Agency", year: 2026, url: "https://www.ema.europa.eu/en/documents/product-information/erbitux-epar-product-information_en.pdf", gradingScheme: "EU summary of product characteristics: regulatory labelling written by the manufacturer and approved through the EMA, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "lazcluze-label", label: "LAZCLUZE (lazertinib) prescribing information", publisher: "Janssen Biotech, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c417f9ee-2027-4ed5-92ad-3c19266de16c", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "gilotrif-label", label: "GILOTRIF (afatinib) prescribing information", publisher: "Boehringer Ingelheim, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fd638e5e-8032-e7ca-0179-95e96ab5d387", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "iressa-label", label: "IRESSA (gefitinib) prescribing information", publisher: "AstraZeneca, via DailyMed (US National Library of Medicine)", year: 2025, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=827d60e8-7e07-41b7-c28b-49ef1c4a5a41", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "erlotinib-label", label: "Erlotinib tablets prescribing information (generic; the TARCEVA brand label was not found current on DailyMed)", publisher: "Alembic Pharmaceuticals, via DailyMed (US National Library of Medicine)", year: 2024, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ab6f3cb3-34a8-4492-a5d7-fb6b055a2d6b", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "tagrisso-label", label: "TAGRISSO (osimertinib) prescribing information", publisher: "AstraZeneca, via DailyMed (US National Library of Medicine)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5e81b4a7-b971-45e1-9c31-29cea8c87ce7", gradingScheme: "US prescribing information: regulatory labelling, not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "nhs-doxycycline", label: "Doxycycline (NHS medicines information, page last reviewed 5 September 2025)", publisher: "NHS", year: 2025, url: "https://www.nhs.uk/medicines/doxycycline/", gradingScheme: "NHS patient information: not graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  gaps: [
    "The ESMO 2021 dermatological toxicity guideline could not be read. On 17 November 2026 the publisher again refused a script (403), Europe PMC held no abstract or full text, and the guideline page on esmo.org carried no readable text, so its grades and any changes it made to the MASCC 2011 regimen are not given here. Crossref lists no update or replacement for it.",
    "MASCC's guideline is from 2011; no later MASCC edition on this rash was found on 17 November 2026. Its recommendations predate amivantamab and osimertinib. No ASCO guideline on EGFR inhibitor rash was found.",
    "The 2025 Delphi position paper is expert consensus, not a guideline graded on evidence. Its item-by-item agreement figures for the second round are in a supplementary table that was not read, and its summary figure is an image.",
    "The trials and the meta-analysis were read as abstracts only, so the exact creams, doses and denominators of each arm beyond those the abstracts print are not given. STEPP's abstract names doxycycline, a topical steroid, moisturisers and sunscreen without doses.",
    "Tetracycline cautions come from the NHS page on doxycycline only: pregnancy, breastfeeding, antibiotic allergy and sun sensitivity. The contraindications, side effects and interactions of minocycline were not read. The NHS page says doxycycline may not be suitable for people with a kidney condition, while MASCC prefers doxycycline to minocycline in kidney impairment; neither gives a threshold.",
    "No source read defines the rash grades. The labels grade by NCI Common Toxicity Criteria or CTCAE (the US cetuximab label by version 2.0), and the definitions are not reproduced here.",
    "Prophylaxis evidence is strongest for EGFR antibodies; for EGFR tyrosine kinase inhibitors such as osimertinib, no randomised trial of prophylaxis was read.",
    "The EU product information was read for cetuximab only; for the other drugs only the US label was read, and European texts may differ as they do for cetuximab.",
    "No guideline position could be set beside the label dose rules: MASCC 2011 recommends skin treatments by evidence level and gives no dose modification schedule, the 2025 Delphi paper says only that changes should be guided by the severity of the rash, and the ESMO 2021 guideline could not be read.",
    "The US cetuximab label states its reduced doses after a severe skin reaction as weekly figures (200 and 150 mg/m²) although it also approves 500 mg/m² every two weeks; only the EU text gives two-weekly figures (400 and 300 mg/m²). The US table prints the unit with a superscript, so its dose rows are stated in prose and not quoted.",
    "The erlotinib rule was read from a generic label (text revised September 2020) because no current TARCEVA label was found on DailyMed; the amivantamab dose reduction levels depend on body weight and regimen and are in the label's own table, not reproduced here. The subcutaneous amivantamab label (RYBREVANT FASPRO) was not read.",
    "The osimertinib label has no dose rule specific to acne-like rash (see variants), and dacomitinib and other EGFR tablets the record does not name were not read.",
    "Paronychia (nail fold inflammation) and scalp problems are covered only in part: MASCC says its paronychia recommendations are based on expert opinion and anecdotal reports.",
    "The advice to report skin changes promptly, and blistering or peeling immediately, is taken from the cetuximab EU package leaflet; the amivantamab, lazertinib and erlotinib US labels give similar advice. No source read sets a number of hours or days.",
  ],
  drugs: ["cetuximab", "panitumumab", "amivantamab", "lazertinib", "erlotinib", "gefitinib", "afatinib", "osimertinib", "hydrocortisone", "doxycycline", "minocycline"],
  cancers: ["colorectal", "egfr-mutant-nsclc"],
  terms: ["rash-skin-toxicity", "chemotherapy-side-effects-colorectal"],
  sections: ["supportive-care"],
  tags: ["protocol", "skin-toxicity", "egfr-inhibitor", "supportive-care"],
});
