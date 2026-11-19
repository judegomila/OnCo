import { protocol } from "./helpers";

/*
 * Ifosfamide: protecting the bladder with mesna and fluids, and recognising and managing ifosfamide encephalopathy.
 *
 * Written 18 November 2026. No existing protocol covered the subject (grep for "mesna" and "ifosfamide" in
 * src/data/protocols found only passing mentions). Three neighbours are linked, not repeated:
 * `hct-conditioning-and-engraftment-care` (mesna and hydration with high-dose cyclophosphamide in transplant),
 * `bladder-symptoms-and-infection-after-intravesical-therapy` (a different cause of bladder symptoms) and
 * `icans-grading-and-management` (a different syndrome, after CAR T cells and T-cell engagers).
 *
 * What was read on 18 November 2026, and how (raw text saved under /tmp/se-protocols-2/ifosfamide/text/<key>.txt):
 * - Ifex (ifosfamide) US label: DailyMed SPL XML, setid b7241707-7538-4d1a-91e7-3a25a91e0b9a, tags stripped. The
 *   label's recent-changes line reads "Warnings and Precautions (5.8) 10/2026". This revision is much shorter than
 *   older Ifex labels: section 5.3 holds the urinalysis and withholding rule, section 5.2 the encephalopathy text.
 * - Mesnex (mesna) tablets and injection US label: DailyMed SPL XML, setid 4a51ffdb-f59f-4e02-b3c4-f3457ab7b514
 *   ("Revised: 12 2018" on its patient information).
 * - Ifosfamide Injection 1 g, UK Summary of Product Characteristics (Baxter; medicines.org.uk product 1834; text
 *   revised 26 November 2024) and its package leaflet (last revised 02/2026). The writer found no EMA product
 *   information for ifosfamide (not re-checked by the second reader); the UK text stands for the European wording.
 * - Mesna Injection and Mesna Tablets 400 mg, UK SmPCs (Baxter; medicines.org.uk products 1838 and 1837; both
 *   revised October 2014), saved one after the other in one text file.
 * - Torchia et al., Front Pharmacol 2025, a narrative review of ifosfamide-induced encephalopathy from a EURACAN
 *   sarcoma reference centre: Europe PMC full-text XML (PMC11885513). Funded by the Italian Ministry of Health
 *   ("Ricerca Corrente"); the authors declare no commercial or financial relationships.
 * - Pelgrims et al., Br J Cancer 2000 (methylene blue, 12 cases and a literature review): Europe PMC full-text XML
 *   (PMC2363270). No funding statement was found in the text.
 * - Lee Brink, Bowe and Dains, J Adv Pract Oncol 2020 (risk factors, an integrative review of seven studies):
 *   Europe PMC full-text XML (PMC7863121). The authors state no conflicts of interest.
 * - Gloucestershire Hospitals NHS Foundation Trust treatment guideline, methylthioninium chloride (Proveblue) for
 *   the treatment and prophylaxis of "Ifosfamide Induced Encephalitis" (its title): the public PDF through pdftotext -layout.
 *   Approved January 2018; its review date of January 2021 has passed. A local policy, shown as a variant only.
 * - Macmillan Cancer Support "Ifosfamide" (reviewed 1 July 2025) and Cancer Research UK "Ifosfamide" (last
 *   reviewed 23 April 2025): the public pages, fetched raw and stripped to text.
 *
 * Not readable on 18 November 2026:
 * - ASCO 2008 clinical practice guideline update on chemotherapy and radiation therapy protectants (Hensley et al.,
 *   J Clin Oncol 2009). ascopubs.org returned 403 to a script, Europe PMC holds the abstract only, the old journal
 *   host did not answer, and a request to the Internet Archive was refused by this session's permission system and
 *   was not retried. The abstract was read: on mesna it says only that no published randomised trials were
 *   identified since 2002, and its recommendations paragraph does not mention mesna. No step rests on it and no
 *   ASCO grade is on the page. A Europe PMC title search found the 1999, 2002 and 2008 editions and no later one.
 * - EBMT Handbook chapter 51 (haemorrhagic cystitis in transplant): the NCBI Bookshelf page answered with a browser
 *   check. It is not cited here; the transplant protocol linked above read it on an earlier day.
 *
 * Cyclophosphamide: the UK mesna SmPC covers ifosfamide and cyclophosphamide together ("oxazaphosphorine"); the US
 * mesna label is indicated for ifosfamide only. Cyclophosphamide is linked in `related` and is not in `drugs`,
 * because no cyclophosphamide label was read for this record and most cyclophosphamide regimens do not use mesna.
 *
 * Second reader, 18 November 2026. Every source was fetched again into a separate folder with curl and converted
 * with the same tag-stripping scripts; eleven of the twelve texts were byte-identical to the writer's copies and the
 * twelfth (Macmillan) differed only in navigation markup. DailyMed's history service shows the Ifex text read is the
 * current version (version 21, published 5 November 2026, effective 7 October 2026) and the Mesnex text is the
 * current version (version 17, published 23 July 2026); every US figure on the page is in those texts. The
 * electronic medicines compendium still shows the October 2014 mesna texts as current (last updated there 1 April
 * 2015); its search lists three mesna products, all Baxter (injection, 400 mg and 600 mg tablets), and the 600 mg
 * tablet text was not used. ascopubs.org again returned 403 (a browser check) for the ASCO guideline. The open
 * summary of that guideline in the Journal of Oncology Practice (PMC2793910) was read as HTML from PubMed Central
 * (the Europe PMC XML endpoint returned 500) and added as a source: it says only that the mesna recommendations
 * were unchanged. 149 claims were checked: 0 wrong, 2 unsupported, 1 unverifiable (that ifosfamide has no EMA
 * product information, which was not re-checked and is now worded as not found); all 30 quotes verbatim by script.
 * Changed: the page had said the ASCO guideline holds graded mesna recommendations, which the abstract read does
 * not say; three steps that give one country's rule now name it; the encephalopathy step and summary now show
 * that the US label's section 5.2 is softer than its boxed warning and that a local policy and a case series
 * continued ifosfamide.
 *
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed; US spelling inside a quote is the source's.
 */
export const ifosfamideBladderProtectionAndEncephalopathy = protocol({
  id: "ifosfamide-bladder-protection-and-encephalopathy",
  name: "Ifosfamide: bladder protection with mesna and fluids, and ifosfamide encephalopathy",
  aka: ["ifosfamide haemorrhagic cystitis", "ifosfamide hemorrhagic cystitis", "mesna with ifosfamide", "mesna dosing", "ifosfamide encephalopathy", "ifosfamide-induced encephalopathy", "ifosfamide neurotoxicity", "ifosfamide confusion", "methylene blue for ifosfamide encephalopathy", "blood in urine on ifosfamide"],
  domain: "supportive-care",
  tldr: "Ifosfamide can irritate the bladder and make it bleed, and it can affect the brain, causing confusion or unusual sleepiness. To protect the bladder you are given a drug called mesna and plenty of fluid, and your urine is tested. Tell your team straight away about blood in your urine, stinging when you pee, confusion or drowsiness. Your own team's protocol comes first.",
  simple: "Ifosfamide is a chemotherapy drug that can hurt the bladder and, in some people, the brain. You get another medicine (mesna) and lots of fluid to protect the bladder, and nurses test your urine. If your pee looks pink or red, or it stings, or you or your family notice you are confused or very sleepy, contact the hospital straight away. Your hospital's own instructions come first.",
  summary: "Bladder. Both labels require mesna and fluids with ifosfamide and differ in detail. The US label (Ifex, revised October 2026) asks for at least 2 litres of oral or intravenous fluid a day, a urinalysis before each dose, and ifosfamide withheld until complete resolution if there are more than 10 red cells per high power field; it reports haematuria in 44% without mesna and 21% with it, and visible haematuria in 11% and 5%. The UK SmPC (Baxter, November 2024) sets no red cell threshold: it asks for laboratory urine analysis before and at the end of each course, checks for blood and protein at regular intervals (4-hourly if possible), at least 2 litres of fluid in 24 hours on the intermittent regimen, and lists cystitis and impaired renal function as contraindications. Mesna is dosed as a percentage of the ifosfamide dose by weight. US label (Mesnex): 20% intravenously at 0, 4 and 8 hours (60% in total), or 20% intravenously at 0 hours then 40% by mouth at 2 and 6 hours (100% in total), a ratio not established for ifosfamide above 2 g/m2 a day. UK SmPC: the same standard schedule, 40% at 0, 3, 6 and 9 hours (160%) for children and for people whose urothelium may already be damaged or who are not protected by the standard dose, and with a 24-hour ifosfamide infusion a 20% bolus, 100% with the infusion and 60% over the next 12 hours (180%). The US and UK mesna texts both say mesna does not prevent haemorrhagic cystitis in all patients.\n\nBrain. The US label reports central nervous system toxicity in 15% (154 of 1,001) and names as risk factors high dose, hypoalbuminaemia, impaired renal function, poor performance status, bulky abdominal or pelvic disease, nephrotoxic treatment including cisplatin, CNS-active drugs and alcohol. A 2020 review of seven studies found performance status 2 to 4, several risk factors together, renal insufficiency and hypoalbuminaemia appear to be risk factors, and insufficient evidence for most of the others. Both labels say to monitor for encephalopathy and to discontinue ifosfamide if it develops (the UK SmPC and the US boxed warning; section 5.2 of the US label says dose interruption or permanent discontinuation may be required); the UK SmPC says most cases resolve within 48 to 72 hours of stopping. On methylene blue the wording is weak in both: \"Consider\" for treatment (US), \"may be considered\" for treatment and prophylaxis (UK). The evidence is case reports and retrospective series with no prospective randomised trial; a 2025 narrative review says management is essentially discontinuation and hydration and that no drug has been proven to be effective, while saying methylene blue and thiamine can still be used, as they are in more serious cases. Neither label mentions thiamine. This is not ICANS, which follows CAR T cells and T-cell engagers and has its own protocol. Each unit's own ifosfamide protocol comes first.",
  asOf: "2026-11-18",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["ward", "chemotherapy-day-unit", "telephone-triage"],
  },
  population: "People having intravenous ifosfamide for cancer. The US label's indication is in adults; the UK SmPC also describes use in children, who are given more mesna and more fluid under their own protocols and are not otherwise covered here. Ifosfamide overdose, transplant conditioning with high-dose cyclophosphamide (see the linked transplant protocol), and haematuria from a low platelet count or from another cause are outside this protocol: the US mesna label says mesna is not indicated to reduce the risk of haematuria due to other conditions such as thrombocytopenia.",
  trigger: "Ifosfamide is prescribed, or a person having ifosfamide (or who had it in the last few days) has blood in the urine, pain or stinging on passing urine, confusion, unusual sleepiness, hallucinations or a seizure.",
  steps: [
    {
      action: "Evaluate kidney function, glomerular and tubular, before treatment, during it and as clinically indicated, with serum and urine chemistries including phosphorus and potassium, and exclude or correct any obstruction to the flow of urine before starting",
      why: "The US label says ifosfamide can cause severe or fatal kidney and urinary tract damage, that the risk of kidney damage is higher in people with renal impairment or reduced nephron reserve, and that tubular damage may occur up to years after treatment. Urinary outflow obstruction is a contraindication on both labels. The UK SmPC goes further and lists impaired renal function, cystitis and hepatic impairment as contraindications.",
      source: "us-ifex-label",
      quote: "Evaluate glomerular and tubular kidney function before treatment with IFEX, during IFEX treatment, and as clinically indicated.",
    },
    {
      action: "Before treatment, note who is at higher risk of encephalopathy (a low albumin, impaired kidney function, poor performance status, bulky abdominal or pelvic disease, nephrotoxic treatment including cisplatin, a high dose) and monitor those people most closely",
      why: "Both labels list these risk factors, and the UK SmPC asks for close monitoring in particular of patients at increased risk. A 2020 review of seven studies found that performance status 2 to 4, having several risk factors, renal insufficiency and hypoalbuminaemia appear to be risk factors, and that the evidence was insufficient for pelvic disease, cisplatin exposure, dose and most others.",
      source: "us-ifex-label",
      quote: "Risk factors include high ifosfamide dosage, hypoalbuminemia, impaired renal function, poor performance status, bulky abdominal-pelvic disease, nephrotoxic treatments including cisplatin, CNS active drugs, or alcohol use.",
    },
    {
      action: "Obtain a urinalysis before each dose of ifosfamide (US label); under the UK SmPC, send urine for laboratory analysis before and at the end of each course and check urine output and test for blood and protein at regular intervals during treatment",
      why: "Neither label gives a reason for its timing. The US label ties the test to two rules: avoid ifosfamide with an active urinary tract infection, and withhold it for microscopic haematuria. The UK SmPC asks for checks at regular intervals, 4-hourly if possible. Both mesna labels warn that mesna can give a false positive dipstick result for ketones.",
      source: "us-ifex-label",
      quote: "Obtain a urinalysis prior to each dose of IFEX.",
    },
    {
      action: "Give mesna with ifosfamide",
      why: "The US label says mesna reduces how often and how badly the bladder bleeds: it reports haematuria in 44% of patients without mesna and 21% with it, and visible haematuria in 11% and 5%. The UK SmPC says that for prophylaxis of haemorrhagic cystitis ifosfamide should be used in combination with mesna.",
      source: "us-ifex-label",
      quote: "Administer IFEX with mesna to reduce the incidence or severity of hemorrhagic cystitis",
    },
    {
      action: "Dose mesna as a percentage of the ifosfamide dose by weight and keep that ratio when the ifosfamide dose changes: on the US label, 20% intravenously at the time of ifosfamide and again 4 and 8 hours later",
      why: "The US label's intravenous schedule gives 60% of the ifosfamide dose in total. The UK SmPC gives the same standard schedule and says the dose can be increased to 40% at 0, 3, 6 and 9 hours (160% in total), which it recommends in children, in people whose urothelium may be damaged by earlier treatment or pelvic irradiation, and in those not adequately protected by the standard dose.",
      source: "us-mesnex-label",
      quote: "MESNEX injection is given as intravenous bolus injections in a dosage equal to 20% of the ifosfamide dosage weight by weight (w/w) at the time of ifosfamide administration and 4 and 8 hours after each dose of ifosfamide.",
    },
    {
      action: "Where mesna tablets follow the first intravenous dose, give 40% of the ifosfamide dose by mouth 2 and 6 hours after the ifosfamide, and if the person vomits within two hours of a tablet dose repeat the dose or give mesna intravenously (US label)",
      why: "The US label says this schedule gives 100% of the ifosfamide dose in total and has not been established for daily ifosfamide doses above 2 g/m2. The UK SmPC states that about half as much mesna reaches the urine after an oral dose as after an intravenous one, and that it starts to arrive up to 2 hours later. The UK tablet SmPC also allows a first oral dose 2 hours before the ifosfamide in place of the intravenous one.",
      source: "us-mesnex-label",
      quote: "Patients who vomit within two hours of taking oral MESNEX should repeat the dose or receive intravenous MESNEX.",
    },
    {
      action: "Continue mesna after the ifosfamide has finished, for as long as its breakdown products in the urine take to fall to non-toxic levels (UK SmPC)",
      why: "The UK mesna SmPC says this usually takes 8 to 12 hours after the end of treatment and may vary with the schedule. For a 24-hour ifosfamide infusion it gives a 20% bolus, 100% of the ifosfamide dose alongside the infusion and a further 60% over the next 12 hours, which may be replaced by boluses or by oral mesna. The US mesna label describes only the 0, 4 and 8 hour and the 0, 2 and 6 hour schedules.",
      source: "uk-mesna-smpc",
      quote: "The duration of mesna treatment should equal that of the oxazaphosphorine treatment plus the time taken for the urinary concentration of oxazaphosphorine metabolites to fall to non-toxic levels.",
    },
    {
      action: "Give at least 2 litres of fluid a day, by mouth or into a vein, with ifosfamide",
      why: "The US label says the fluid reduces how often and how badly the bladder is affected. The UK SmPC asks for at least 2 litres in 24 hours on the intermittent regimen and adds that, because ifosfamide may reduce urine production, a diuretic may be necessary to ensure an adequate urinary output; the UK mesna SmPC says urinary output should be maintained at 100 ml an hour.",
      source: "us-ifex-label",
      quote: "Administer IFEX with extensive hydration consisting of at least 2 liters of oral or intravenous fluid per day to reduce the incidence or severity of bladder toxicity.",
    },
    {
      action: "Advise the patient to drink more, to empty the bladder often, and to report pink or red urine and any stinging or discomfort on passing urine",
      why: "The US ifosfamide label asks for more fluid and frequent voiding to prevent accumulation in the bladder, and the mesna label says mesna does not protect everyone and asks patients to report urine that has turned pink or red. Macmillan tells patients to contact the hospital straight away on the 24-hour number for discomfort, stinging or blood when they pee.",
      source: "us-mesnex-label",
      quote: "MESNEX does not prevent hemorrhagic cystitis in all patients nor does it prevent or alleviate any of the other adverse reactions or toxicities associated with ifosfamide.",
    },
    {
      action: "If the urinalysis shows microscopic haematuria of more than 10 red cells per high power field, withhold ifosfamide until it has completely resolved, and give further ifosfamide with vigorous oral or intravenous hydration (US label)",
      why: "This is the US label's rule; it also says to avoid ifosfamide in people with an active urinary tract infection. The UK SmPC sets no red cell count: it says there should be no signs or symptoms of urothelial toxicity before each course starts, and that ifosfamide should be avoided in patients with cystitis from any cause until it has been treated.",
      source: "us-ifex-label",
      quote: "If microscopic hematuria (greater than 10 RBCs per high power field) is present, then withhold administration of IFEX until complete resolution.",
    },
    {
      action: "If severe haematuria develops although mesna was given as recommended, review the ifosfamide: a dose reduction or discontinuation may be required (US mesna label)",
      why: "The US mesna label says so, and the US ifosfamide label says haemorrhagic cystitis from ifosfamide has required blood transfusion. The UK mesna SmPC offers the larger mesna dose for people not adequately protected by the standard one. Neither label read describes how to treat established bleeding from the bladder.",
      source: "us-mesnex-label",
      quote: "If severe hematuria develops when MESNEX is given according to the recommended dosage schedule, dosage reductions or discontinuation of ifosfamide therapy may be required.",
    },
    {
      action: "Monitor for encephalopathy during and after each course: confusion, sleepiness, hallucinations, blurred vision, psychotic behaviour, abnormal movements, loss of bladder control, seizures or coma",
      why: "The US label lists these signs, says they may occur or recur within hours to days of a dose, and says encephalopathy can be fatal. The UK leaflet tells patients that people on ifosfamide sometimes do not realise they have been affected, and that friends and relatives may notice the change.",
      source: "us-ifex-label",
      quote: "Monitor for signs and symptoms of encephalopathy during and after IFEX treatment.",
    },
    {
      action: "If encephalopathy develops, discontinue ifosfamide",
      why: "Both labels say so: the US boxed warning says to discontinue treatment for encephalopathy, and its section 5.2 says dose interruption or permanent discontinuation may be required based on individual safety and tolerability. The UK SmPC says most cases resolve within 48 to 72 hours of discontinuation, that symptoms may persist for longer, that recovery has occasionally been incomplete and that deaths have been reported. Practice differs from the labels in two sources shown under variants: one hospital's policy stops ifosfamide only for severe signs or worsening, and in a 2000 case series the infusion was not stopped in any of the 12 patients. This step follows the labels.",
      source: "uk-ifosfamide-smpc",
      quote: "If CNS toxicity develops, administration of ifosfamide should be discontinued.",
    },
    {
      action: "Continue supportive care until every sign has resolved, and use medicines that act on the brain (antiemetics, sedatives, opioids, antihistamines) with particular caution or, if necessary, discontinue them",
      why: "The UK SmPC gives the reason: their effects may add to those of ifosfamide on the brain. The US label asks for supportive care to continue until the signs and symptoms have completely resolved, and a 2025 review says management rests essentially on stopping treatment and hydration.",
      source: "uk-ifosfamide-smpc",
      quote: "Due to the potential for additive effects, drugs acting on the CNS (such as antiemetics, sedatives, narcotics, or antihistamines) or substances (such as alcohol) acting on the CNS must be used with particular caution or, if necessary, be discontinued in case of ifosfamide induced encephalopathy.",
    },
    {
      action: "Consider methylene blue (methylthioninium chloride) to treat encephalopathy",
      why: "Both labels use the word consider and neither gives a dose: the US label says to consider it for treatment, the UK SmPC that it may be considered for treatment and prophylaxis. The evidence is case reports and retrospective series. A 2025 review found no prospective randomised trial and named rare but potentially severe reactions (anaphylactic shock, a haemolytic anaemia and serotonin syndrome), while concluding that its use can still be recommended given the lack of established alternatives.",
      source: "uk-ifosfamide-smpc",
      quote: "The use of methylene blue may be considered for the treatment and prophylaxis of ifosfamide-associated encephalopathies.",
    },
    {
      action: "Intravenous thiamine is another option a review describes; neither label mentions it",
      why: "The 2025 review says the data supporting thiamine come from case reports, as for methylene blue, and that no drug has been proven to be effective. A 2020 review says the same of thiamine and reports one retrospective analysis in which prophylaxis with methylene blue, thiamine and albumin, alone or in combination, did not reduce the incidence of encephalopathy.",
      source: "torchia-2025",
      quote: "Thiamine is another therapeutic option in the treatment of IIE, administered intravenously at the dosage of 100 mg every 4 h until symptoms resolution.",
    },
    {
      action: "If ifosfamide is continued after an episode of encephalopathy, consider prophylaxis before the next course",
      why: "The 2025 review says prophylaxis should be considered and that the agents most used are methylene blue and thiamine, on limited evidence that other retrospective studies contradict. The US label says ifosfamide has been reintroduced after neurotoxicity: some patients had no recurrence, and others had recurrent events, some fatal.",
      source: "torchia-2025",
      quote: "Prophylaxis should be considered in patients with an episode of IIE who continued the treatment with IFO.",
    },
    {
      action: "Tell the patient and the people around them what to look for and to contact the hospital straight away for drowsiness, confusion, blurred vision, problems moving or speaking, or a fit, and not to drive or operate machinery if affected",
      why: "Macmillan tells patients that effects on the brain and nerves are not common but can become serious if they are not treated quickly, and to contact the hospital straight away on the 24-hour number or go to the hospital straight away. The US label asks that patients be told ifosfamide may impair the ability to drive or use heavy machinery.",
      source: "macmillan-ifosfamide",
      quote: "If you have these side effects, it is important not to drive or operate machinery.",
    },
  ],
  bestInClass: {
    statement: "No graded guideline recommendation could be read for either problem, so the labels carry the page. For the bladder, the best-supported version is mesna with every dose of ifosfamide, dosed as a percentage of the ifosfamide dose, with at least 2 litres of fluid a day and urine testing: the US mesna label describes two randomised studies in which haematuria fell from 31 to 100% of patients to less than 7% at higher ifosfamide doses, and the US ifosfamide label reports haematuria in 44% without mesna and 21% with it. The labels differ on the detail and both are shown: the US label tests urine before each dose and withholds ifosfamide above 10 red cells per high power field; the UK SmPC sets no count, tests at regular intervals and allows larger and longer mesna schedules (160% and 180% of the ifosfamide dose against 60% or 100% in the US). ASCO's protectants guideline (2008 update) could not be read in full: its abstract says no published randomised trials of mesna were identified since 2002, and its open summary says only that there were no changes to the recommendations regarding mesna, without restating them. For encephalopathy, both labels say to monitor for it and to discontinue ifosfamide if it develops, and both only allow methylene blue to be considered (US: for treatment; UK: for treatment and prophylaxis). The reviews read agree that the evidence for methylene blue and thiamine is case reports and retrospective series with no prospective randomised trial, and that stopping the drug and hydration are the basis of care.",
    sources: ["us-ifex-label", "us-mesnex-label", "uk-ifosfamide-smpc", "uk-mesna-smpc", "torchia-2025", "brink-2020", "asco-protectants-2008", "asco-protectants-2008-summary"],
  },
  variants: [
    {
      name: "US and UK mesna schedules side by side",
      differs: "US label (Mesnex, indicated for ifosfamide only): 20% of the ifosfamide dose intravenously at 0, 4 and 8 hours (60% in total), or 20% intravenously at 0 hours then 40% as tablets at 2 and 6 hours (100% in total), with patients advised to drink 1 to 2 litres of fluid each day. UK SmPCs (indicated for ifosfamide and cyclophosphamide in doses considered urotoxic): the same 60% intravenous schedule; 40% at 0, 3, 6 and 9 hours (160%) for children, for urothelium that may be damaged by earlier oxazaphosphorine treatment or pelvic irradiation, or where the standard dose has not protected; with a 24-hour ifosfamide infusion, a 20% bolus, 100% with the infusion and 60% over the following 12 hours (180%); oral doses of 40% at 2 hours before and 2 and 6 hours after, rounded down to the nearest whole tablet; urinary output maintained at 100 ml an hour. The UK ifosfamide SmPC, in its section on children, calls uroprotection with mesna mandatory at 80 to 120% of the ifosfamide dose with hyperhydration of at least 3000 ml/m2.",
      evidence: "Regulatory texts, not graded. The US label states that the intravenous and oral ratio has not been established for daily ifosfamide doses above 2 g/m2. The UK mesna SmPCs were last revised in October 2014.",
      sources: ["us-mesnex-label", "uk-mesna-smpc", "uk-ifosfamide-smpc"],
    },
    {
      name: "Urine testing and when to withhold: US label against UK SmPC",
      differs: "US label: a urinalysis before each dose; withhold ifosfamide for more than 10 red cells per high power field until complete resolution; avoid ifosfamide with an active urinary tract infection. UK SmPC: urine sent for laboratory analysis before and at the end of each course; output, proteinuria and haematuria monitored at regular intervals (4-hourly if possible); no signs or symptoms of urothelial toxicity before each course; ifosfamide avoided in cystitis from any cause until treated, with cystitis and impaired renal function listed as contraindications; used with caution, if at all, in active urinary tract infection.",
      evidence: "Regulatory texts, not graded. Neither gives a reason for its interval or, in the US label, for the count of 10 red cells.",
      sources: ["us-ifex-label", "uk-ifosfamide-smpc"],
    },
    {
      name: "A local policy stepped by severity, with methylthioninium chloride doses (Gloucestershire Hospitals)",
      differs: "For mild somnolence or agitation: neurological observations and an ifosfamide infusion running no faster than 1 g/m2 an hour. For moderate somnolence or agitation: in addition, methylthioninium chloride 50 mg intravenously 4-hourly until all signs have resolved, prophylaxis considered with the next cycle, and ifosfamide stopped if neurotoxicity worsens. For severe somnolence, agitation, confusion, disorientation, hallucinations, coma, seizures or toxic psychosis: stop ifosfamide and continue mesna, the same methylthioninium chloride dose, consider an intensive care review, and further ifosfamide should be avoided. Prophylaxis (50 mg intravenously 6-hourly) is to be considered after previous encephalopathy, with a serum creatinine above 150 micromol/L or a serum albumin below 30. G6PD status is checked first in people at high risk, because deficiency contraindicates the drug. So this policy does not stop ifosfamide for mild or moderate signs, where the UK SmPC and the US boxed warning say to discontinue it for encephalopathy. It is shown as one hospital's practice, not as a recommendation.",
      evidence: "A local policy approved in January 2018 whose review date (January 2021) has passed. It states that methylthioninium chloride is not licensed for this use and that its mechanism is unclear. It cites a 2006 review, a 1986 prediction nomogram and a London network guideline that were not read here.",
      sources: ["glos-methylene-blue"],
    },
    {
      name: "Methylene blue doses in the published series",
      differs: "Pelgrims and colleagues (Antwerp, 2000) advise 50 mg intravenously six times a day for treatment and 50 mg four times a day, intravenously or by mouth, for secondary prophylaxis. In their series the ifosfamide infusion was not stopped in any of the 12 patients with encephalopathy, where the UK SmPC and the US boxed warning say to discontinue it. The 2025 EURACAN review describes 50 mg up to 6 times a day for treatment and, for prophylaxis, 50 mg up to every 6 hours from the day before ifosfamide.",
      evidence: "A retrospective single-centre series: of 52 patients, 12 developed encephalopathy; 8 had methylene blue, of whom 4 recovered fully within 24 hours, 2 by 48 hours and 2 only after 72 hours; the 4 who had none all recovered after 48 hours. The authors note that the numbers were small and the study was not randomised. The 2020 review reports other retrospective studies that showed no benefit of methylene blue for prevention.",
      sources: ["pelgrims-2000", "torchia-2025", "brink-2020"],
    },
    {
      name: "Dialysis for severe encephalopathy",
      differs: "The 2025 review says dialysis has been used successfully, particularly in patients with a severe presentation who did not respond to methylene blue and thiamine and who also had kidney toxicity. Both labels say ifosfamide and its metabolites are dialysable; the UK SmPC says to consider haemodialysis in severe overdose presenting early, particularly with renal impairment, and makes no statement about dialysis for encephalopathy at ordinary doses.",
      evidence: "Case reports cited by the review; not graded.",
      sources: ["torchia-2025", "uk-ifosfamide-smpc", "us-ifex-label"],
    },
  ],
  grades: [
    { claim: "Mesna with ifosfamide to reduce the incidence or severity of haemorrhagic cystitis (US label)", grade: "Regulatory label; not graded", source: "us-ifex-label" },
    { claim: "Mesna with ifosfamide for prophylaxis of haemorrhagic cystitis (UK SmPC)", grade: "Regulatory label; not graded", source: "uk-ifosfamide-smpc", quote: "For prophylaxis of haemorrhagic cystitis, ifosfamide should be used in combination with mesna." },
    { claim: "Haematuria at higher ifosfamide doses fell to less than 7% with mesna in two randomised studies described in the US mesna label", grade: "Regulatory label; not graded", source: "us-mesnex-label", quote: "When MESNEX was administered together with these doses of ifosfamide, the incidence of hematuria was less than 7%." },
    { claim: "Mesna does not protect every patient (UK SmPC)", grade: "Regulatory label; not graded", source: "uk-mesna-smpc", quote: "Mesna does not prevent hemorrhagic cystitis in all patients." },
    { claim: "Withhold ifosfamide for more than 10 red cells per high power field until complete resolution (US label)", grade: "Regulatory label; not graded", source: "us-ifex-label" },
    { claim: "ASCO 2008 update: no published randomised trials of mesna identified since 2002 (abstract only; its recommendations paragraph does not mention mesna)", grade: "Not read", source: "asco-protectants-2008", quote: "mesna, no published randomized trials identified since 2002" },
    { claim: "ASCO 2008 update: mesna recommendations unchanged (open summary; the recommendations themselves are not restated and were not read)", grade: "Not read", source: "asco-protectants-2008-summary", quote: "There were no changes to recommendations regarding Mesna." },
    { claim: "Discontinue ifosfamide for encephalopathy (US boxed warning)", grade: "Regulatory label; not graded", source: "us-ifex-label", quote: "Monitor for CNS toxicity and discontinue treatment for encephalopathy" },
    { claim: "Methylene blue for treatment of encephalopathy (US label)", grade: "Regulatory label; not graded", source: "us-ifex-label", quote: "Consider methylene blue for treatment of encephalopathy." },
    { claim: "Methylene blue for treatment and prophylaxis (UK SmPC)", grade: "Regulatory label; not graded", source: "uk-ifosfamide-smpc" },
    { claim: "Methylene blue and thiamine: the quality of the evidence, as a 2025 review describes it", grade: "Narrative review; not graded", source: "torchia-2025", quote: "Most of the data about their use in this setting comes from retrospective series and case reports and there are no prospective randomized clinical trials investigating their efficacy and safety." },
    { claim: "No drug proven effective; management is interruption and hydration", grade: "Narrative review; not graded", source: "torchia-2025", quote: "The management of IIE is based on treatment interruption and hydration and no drug has been proven to be effective." },
    { claim: "Methylene blue: the evidence as a 2020 review describes it", grade: "Integrative review; not graded", source: "brink-2020", quote: "Data supporting the use of MB for treatment and prophylaxis of IRE are limited to case studies" },
    { claim: "Risk factors for encephalopathy that the 2020 review accepts", grade: "Integrative review of seven studies; not graded", source: "brink-2020", quote: "A PS of 2 to 4, having multiple risk factors, renal insufficiency, and hypoalbuminemia appear to be risk factors for the development of IRE." },
    { claim: "The methylene blue case series: its authors' own caution", grade: "Retrospective single-centre case series", source: "pelgrims-2000", quote: "However, the numbers were small and the study was not randomized." },
  ],
  sources: [
    {
      key: "us-ifex-label",
      label: "IFEX (ifosfamide) for injection: US prescribing information (revised October 2026)",
      publisher: "Baxter Healthcare Corporation (DailyMed, US National Library of Medicine)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b7241707-7538-4d1a-91e7-3a25a91e0b9a",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "us-mesnex-label",
      label: "MESNEX (mesna) tablets and injection: US prescribing information (patient information revised December 2018; current DailyMed version, published July 2026)",
      publisher: "Baxter Healthcare Corporation (DailyMed, US National Library of Medicine)",
      year: 2018,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4a51ffdb-f59f-4e02-b3c4-f3457ab7b514",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "uk-ifosfamide-smpc",
      label: "Ifosfamide Injection 1 g: UK Summary of Product Characteristics (text revised 26 November 2024)",
      publisher: "Baxter Healthcare Ltd (electronic medicines compendium)",
      year: 2024,
      url: "https://www.medicines.org.uk/emc/product/1834/smpc",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "uk-mesna-smpc",
      label: "Mesna Injection and Mesna Tablets 400 mg: UK Summaries of Product Characteristics (texts revised October 2014)",
      publisher: "Baxter Healthcare Ltd (electronic medicines compendium)",
      year: 2014,
      url: "https://www.medicines.org.uk/emc/product/1838/smpc",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "uk-ifosfamide-pil",
      label: "Ifosfamide Injection 1 g: UK package leaflet (last revised February 2026)",
      publisher: "Baxter Healthcare Ltd (electronic medicines compendium)",
      year: 2026,
      url: "https://www.medicines.org.uk/emc/product/1834/pil",
      gradingScheme: "Regulatory patient leaflet; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "torchia-2025",
      label: "A narrative review on diagnosis and treatment of ifosfamide-induced encephalopathy, the perspective of a EURACAN reference center for sarcomas",
      publisher: "Frontiers in Pharmacology (Torchia et al.; funded by the Italian Ministry of Health)",
      year: 2025,
      url: "https://doi.org/10.3389/fphar.2025.1512966",
      doi: "10.3389/fphar.2025.1512966",
      gradingScheme: "Narrative review; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "brink-2020",
      label: "Risk Factors for Ifosfamide-Related Encephalopathy in Adult Cancer Patients: An Integrative Review",
      publisher: "Journal of the Advanced Practitioner in Oncology (Lee Brink, Bowe and Dains)",
      year: 2020,
      url: "https://doi.org/10.6004/jadpro.2020.11.4.4",
      doi: "10.6004/jadpro.2020.11.4.4",
      gradingScheme: "Integrative review of seven studies published 2008 to 2018; each factor is classed as a risk factor, not a risk factor, or insufficient data.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "pelgrims-2000",
      label: "Methylene blue in the treatment and prevention of ifosfamide-induced encephalopathy: report of 12 cases and a review of the literature",
      publisher: "British Journal of Cancer (Pelgrims et al.)",
      year: 2000,
      url: "https://doi.org/10.1054/bjoc.1999.0917",
      doi: "10.1054/bjoc.1999.0917",
      gradingScheme: "Retrospective case series; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "glos-methylene-blue",
      label: "Methylthioninium Chloride (Proveblue) for the Treatment and Prophylaxis of Ifosfamide Induced Encephalitis: treatment guideline (approved January 2018, review date January 2021)",
      publisher: "Gloucestershire Hospitals NHS Foundation Trust",
      year: 2018,
      url: "https://www.gloshospitals.nhs.uk/documents/2056/MethylthioniniumChlorideProveblue.pdf",
      gradingScheme: "Local hospital policy; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "macmillan-ifosfamide",
      label: "Ifosfamide (patient information, reviewed 1 July 2025)",
      publisher: "Macmillan Cancer Support",
      year: 2025,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/ifosfamide",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "cruk-ifosfamide",
      label: "Ifosfamide (patient information, last reviewed 23 April 2025)",
      publisher: "Cancer Research UK",
      year: 2025,
      url: "https://www.cancerresearchuk.org/about-cancer/treatment/drugs/ifosfamide",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "asco-protectants-2008",
      label: "American Society of Clinical Oncology 2008 Clinical Practice Guideline Update: Use of Chemotherapy and Radiation Therapy Protectants",
      publisher: "ASCO (Journal of Clinical Oncology, Hensley et al.)",
      year: 2009,
      url: "https://doi.org/10.1200/JCO.2008.17.2627",
      doi: "10.1200/JCO.2008.17.2627",
      read: "abstract",
      accessed: "2026-11-18",
    },
    {
      key: "asco-protectants-2008-summary",
      label: "American Society of Clinical Oncology 2008 Clinical Practice Guideline Update Summary: Use of Chemotherapy and Radiation Therapy Protectants",
      publisher: "ASCO (Journal of Oncology Practice)",
      year: 2008,
      url: "https://doi.org/10.1200/JOP.0868502",
      doi: "10.1200/JOP.0868502",
      gradingScheme: "A summary that describes only the recommendations that changed; no grades are printed for mesna.",
      read: "full-text",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["ifosfamide"],
  terms: ["alkylating-agent"],
  related: ["mesna", "cyclophosphamide", "renal-dose-adjustment-of-anticancer-drugs", "low-potassium-and-low-phosphate-on-anticancer-drugs", "hct-conditioning-and-engraftment-care", "bladder-symptoms-and-infection-after-intravesical-therapy", "icans-grading-and-management", "acute-oncology-telephone-triage"],
  upgrades: [],
  gaps: [
    "ASCO's guideline on chemotherapy and radiotherapy protectants (2008 update, published 2009) could not be read in full: on 18 November 2026 the publisher twice returned 403 to a script, Europe PMC holds only the abstract, and a request to the Internet Archive was refused by this session's permission system and not retried. Two things from it are used: the abstract's statement that no published randomised trials of mesna were identified since 2002, and the open summary's statement that there were no changes to the recommendations regarding mesna. The summary does not restate those recommendations, and the 2002 text that holds them was not read, so no ASCO mesna recommendation or grade is on this page. A Europe PMC search found no edition later than 2008.",
    "No graded guideline on ifosfamide encephalopathy was found. The steps rest on two labels, one narrative review, one integrative review and a case series; the only stepwise scheme with doses is a single hospital's policy, past its review date, and is shown as a variant.",
    "Methylene blue and thiamine have no prospective randomised trial for treatment or prevention. The labels say only that methylene blue may be considered and give no dose; the doses on this page come from a case series, a review and a local policy. Neither label mentions thiamine.",
    "The US label and the UK SmPC disagree on how urine is tested and when ifosfamide is withheld (before each dose with a threshold of 10 red cells per high power field, against before and after each course with regular checks and no threshold), and on mesna totals (60% or 100% of the ifosfamide dose in the US; up to 160% or 180% in the UK). Neither gives a reason, and no source read compares the schedules.",
    "Neither label read says how established haemorrhagic cystitis is treated once bleeding has started (bladder irrigation, transfusion thresholds, urology referral). That is not covered here.",
    "The UK mesna SmPCs on the electronic medicines compendium were last revised in October 2014 and were still the versions shown there on 18 November 2026. The compendium lists three mesna products, all from Baxter (injection, 400 mg tablets and 600 mg tablets); the 600 mg tablet text was not used. No EMA product information for ifosfamide was found, and other national European texts were not read.",
    "Cyclophosphamide: the UK mesna SmPC covers it, the US mesna label does not, and no cyclophosphamide label was read for this record. Mesna and hydration with high-dose cyclophosphamide in transplant are in the linked transplant protocol. The EBMT Handbook chapter on haemorrhagic cystitis could not be fetched on 18 November 2026 (the NCBI Bookshelf page returned a browser check).",
    "Kidney damage from ifosfamide (including Fanconi syndrome) is covered only as far as the labels' monitoring goes. Long-term kidney follow-up after ifosfamide, especially in children, is not covered.",
    "Children: the UK SmPC gives larger mesna and fluid figures in its paediatric section, and paediatric protocols were not read.",
    "Risk factors for encephalopathy differ between sources. The labels list pelvic disease, cisplatin and high dose; the 2020 review found the evidence for those insufficient, and found that age and aprepitant do not appear to be risk factors. The US label warns that CYP3A4 inducers may increase formation of a neurotoxic metabolite.",
    "What patients are asked to report comes from Macmillan (contact the hospital straight away), Cancer Research UK (tell your nurse or doctor straight away about any problems passing urine) and the UK package leaflet (tell your doctor immediately). None sets a threshold in hours.",
  ],
});
