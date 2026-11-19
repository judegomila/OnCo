import { protocol } from "./helpers";

/*
 * Bladder symptoms and infection after treatment put into the bladder (intravesical BCG, nadofaragene firadenovec,
 * nogapendekin alfa inbakicept with BCG, the gemcitabine intravesical system) for non-muscle-invasive bladder cancer.
 *
 * Written 18 November 2026. No existing protocol covered the subject (grep for "intravesical" and "BCG" in
 * src/data/protocols found none). Ifosfamide's haemorrhagic cystitis is a different problem and is not covered here.
 *
 * What was read on 18 November 2026, and how (raw text saved under /tmp/se-protocols-2/bladder/text/<key>.txt):
 * - EAU Guidelines on Non-muscle-invasive Bladder Cancer, 2026 edition (uroweb.org, the Disease Management, Methods and
 *   Introduction chapters as HTML, tags stripped): section 7.4.3.c "BCG toxicity", Table 7.1 "Management options for
 *   side effects associated with intravesical BCG" (its local rows are marked "modified from IBCG") and the
 *   recommendations in section 7.10. The introduction says the 2026 guidelines are a complete update of the 2025
 *   publication. Table 7.1 carries no strength ratings; only two of the statements used here are rated.
 * - Canadian Urological Association guideline on NMIBC, full text (Bhindi et al., Can Urol Assoc J 2021): the PMC page
 *   for PMC8418246 with plain curl (the Europe PMC full-text endpoint returned 500). Section 6.2.3 and Table 6. A
 *   Europe PMC search found no later CUA NMIBC guideline. Its authors declare advisory, honoraria and trial
 *   relationships with manufacturers including Ferring, Janssen and Merck; no funding statement was found in the text.
 * - SITC clinical practice guideline on immunotherapy for urothelial cancer (Galsky et al., J Immunother Cancer 2021):
 *   Europe PMC full-text XML (PMC8286774). It states that SITC alone funded it and no commercial funding was received.
 * - NICE NG2 Bladder cancer: diagnosis and management, recommendations page (HTML; published 25 February 2015).
 * - TICE BCG US label (DailyMed SPL XML, setid c9b74876-e665-442b-87ad-b7333bc9a67a; "Revised: 2/2026").
 * - OncoTICE UK Summary of Product Characteristics and package leaflet (medicines.org.uk, product 1049; SmPC text
 *   revised 30 December 2025, leaflet last revised August 2025).
 * - Adstiladrin (nadofaragene firadenovec): US label (DailyMed SPL XML, 03/2026) and EU product information (EMA PDF
 *   through pdftotext -layout; the PDF is dated 22 April 2026 and its revision-date field is blank).
 * - Anktiva (nogapendekin alfa inbakicept): US label (DailyMed SPL XML, 10/2026) and EU product information (EMA PDF,
 *   dated 1 June 2026, revision-date field blank).
 * - Inlexzo (gemcitabine intravesical system, TAR-200): US label (DailyMed SPL XML, effective 26 October 2026). The
 *   EMA product-information address for Inlexzo returned 404, so no EU text was read.
 * - Pérez-Jacoiste Asín et al., Medicine (Baltimore) 2014: Europe PMC full-text XML (PMC4602419), a single-centre
 *   series and pooled review of BCG infection. Publicly funded researchers; no manufacturer funding declared.
 * - Cancer Research UK "BCG into the bladder" (last reviewed 14 July 2025) and Macmillan "BCG treatment for bladder
 *   cancer" (reviewed 1 November 2022, marked as being reviewed): the public pages, fetched raw and stripped to text.
 *
 * Not readable on 18 November 2026:
 * - AUA/SUO guideline on NMIBC (published 2016; amended 2020, 2024, 2026). The auanet.org page shows the purpose and
 *   key takeaways and then asks for a login; the unabridged PDF address returned 404 and the Internet Archive refused
 *   the one scripted request made (403). Only the abstract of the 2026 update (J Urol, Europe PMC) was read, and it
 *   states no recommendation on side effects. No step rests on it, so the EAU position is set beside the Canadian
 *   guideline, SITC, NICE and the labels instead of beside AUA.
 * - The IBCG paper from which EAU Table 7.1 is modified, a BCG-medac SmPC, and the BAUS patient leaflet: not read.
 * - No NCI or NHS page on BCG side effects was found (the cancer.gov address tried returned 404; the NHS bladder
 *   cancer treatment page links to Cancer Research UK for BCG).
 *
 * DOIs were resolved through Europe PMC and the titles checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed, and were checked by script.
 *
 * Second reader, 18 November 2026. An independent reader re-fetched with plain curl the EAU 2026 disease-management
 * and introduction chapters, the TICE BCG US label, the OncoTICE UK SmPC and leaflet, the Adstiladrin, Anktiva and
 * Inlexzo US labels (DailyMed SPL XML), the Adstiladrin and Anktiva EU product information (EMA PDFs, pdftotext
 * -layout), the Canadian guideline (PMC HTML) and the Cancer Research UK page; each converted text was byte-identical
 * to the writer's saved copy. NICE NG2, SITC, Macmillan and Pérez-Jacoiste Asín were read from the writer's copies
 * saved the same day. The four DOIs were resolved through Crossref and the titles matched. All 20 steps were read
 * against the source passages: 172 claims checked, 0 wrong, 12 unsupported (reworded or removed), 2 unverifiable (the
 * AUA/SUO guideline, on which nothing rests); 29 quotes checked by script, all verbatim. What changed: an inferred
 * "reassess" was taken out of the step on short-lived fever; "stop BCG" in the sepsis step is now worded as the EAU
 * option it is; the US label says BCG "should be discontinued" and is no longer said to stop it "for good"; the
 * nadofaragene step now gives the reason the EU SmPC prints for anticholinergic premedication; the nogapendekin alfa
 * sentence is identified as prescriber counselling (section 17), not patient text; the Canadian guideline is no longer
 * said to stop BCG definitively "only" for sepsis (its table also considers discontinuation for a persistent allergic
 * reaction). Cretostimogene was removed from `drugs`: EAU names it once, in an efficacy sentence, and no source read
 * gives management. Canadian Table 6 as served by PubMed Central defines "LUTS" in its key and has no row using it,
 * so a row may be missing; no step rests on one. NICE's overview page says NG2 was last reviewed on 6 May 2026 and
 * that a number of recommendations will be updated. The AUA page was tried once more: it still asks for a login and
 * says the PDF is free to members and sold to others; Europe PMC lists the 2026 update as subscription only. The EMA
 * address for Inlexzo returned 404 again.
 */
export const bladderSymptomsAndInfectionAfterIntravesicalTherapy = protocol({
  id: "bladder-symptoms-and-infection-after-intravesical-therapy",
  name: "Bladder symptoms and BCG infection after intravesical therapy for non-muscle-invasive bladder cancer",
  aka: ["BCG cystitis", "BCG side effects", "BCG toxicity management", "BCG sepsis", "BCGosis", "systemic BCG infection", "bladder irritation after BCG", "side effects of bladder instillations", "intravesical therapy side effects", "bladder spasm after nadofaragene", "TAR-200 urinary side effects"],
  domain: "symptom-management",
  tldr: "Treatments put into the bladder for early bladder cancer, such as BCG, often irritate it: burning, passing urine often or urgently, and some blood in the urine. After BCG this usually settles within 1 to 3 days. Rarely the BCG bacteria cause a serious infection. A high temperature for more than 48 hours, or feeling very unwell, means contacting your doctor immediately.",
  simple: "Medicine put into the bladder often makes it sore for a day or two. Tell your nurse or doctor if it does not settle. If you have had BCG and get a high temperature that lasts, chills, a cough, a rash or painful joints, contact your doctor immediately and say you have had BCG. Your own team's advice comes first.",
  summary: "This page sets out what the guidelines and labels read say; a unit's own protocol comes first. Local irritation is expected after BCG: the US TICE BCG label reports bladder irritability in approximately 60% of patients, starting 4 to 6 hours after instillation and lasting 24 to 72 hours, and the UK OncoTICE SmPC says approximately 90% develop local irritative symptoms that in most cases disappear within two days. EAU 2026 lists as absolute contraindications to an instillation the first two weeks after TURBT, visible haematuria, traumatic catheterisation and symptomatic urinary tract infection (Strong). The US label waits 7 to 14 days after biopsy, resection or traumatic catheterisation; the UK SmPC starts 10 to 15 days after resection and delays until mucosal damage has healed.\n\nFor cystitis symptoms EAU Table 7.1 (management options, unrated, modified from IBCG) gives phenazopyridine, mirabegron or NSAIDs; if symptoms persist or worsen, postpone the instillation, culture the urine and start empirical antibiotics; then quinolones for a negative culture, and anti-tuberculosis drugs with corticosteroids if symptoms still persist. NICE (England, 2015) says not to offer primary prophylaxis against BCG bladder toxicity outside a trial, and to seek specialist multidisciplinary advice when antispasmodics or non-opiate analgesia fail and cystoscopy has excluded other causes. EAU rates quinolones for BCG side effects Weak ('cautiously offer'). The labels disagree on isoniazid for local symptoms: the US label says antituberculosis drugs should not be used to prevent or treat them, the UK SmPC allows isoniazid 300 mg daily with analgesics for severe symptoms during maintenance.\n\nFever with malaise generally resolves within 48 hours (EAU). The threshold for suspecting BCG infection differs: above 38.5°C for more than 48 hours (EAU, and the Canadian guideline at 38.5°C or more for 48 hours or more); 38.5°C or more persisting longer than 2 to 3 days, flu-like symptoms beyond 72 hours or 103°F or more (US label); above 39°C not resolving within 12 hours despite antipyretics (UK SmPC). EAU's options are then permanent discontinuation of BCG, immediate evaluation (urine culture, blood tests, chest X-ray), prompt treatment with more than two antimicrobial agents and consultation with an infectious disease specialist; the Canadian guideline suspends BCG until resolved or considers dose reduction and starts at least 2 empirical antimicrobials. For BCG sepsis both list stopping BCG, high-dose quinolones, isoniazid with rifampicin and ethambutol for six months, and high-dose corticosteroids (early in EAU, if persistent in the Canadian guideline); the Canadian guideline says it requires hospitalisation (LE 3, strong recommendation). EAU puts systemic BCG infection at 1 to 2%.\n\nThe newer agents' labels give little management. Nadofaragene: anticholinergic premedication is recommended (US and EU); the EU SmPC alone says to exclude urinary tract infection before each instillation and interrupt treatment for one. Gemcitabine intravesical system: prophylactic antibiotics may be used at insertion and removal at the clinician's discretion (US label; urinary tract infection 44%). Nogapendekin alfa with BCG: patients are advised to report prolonged irritable bladder symptoms or prolonged red urine immediately, and BCG's own label applies. The AUA/SUO guideline could not be read.",
  asOf: "2026-11-18",
  setting: {
    who: ["nurse", "doctor", "patient-or-carer"],
    where: ["outpatient-clinic", "home", "telephone-triage", "emergency-department", "ward"],
  },
  population: "Adults with non-muscle-invasive bladder cancer having treatment put into the bladder: BCG, nadofaragene firadenovec, nogapendekin alfa inbakicept given with BCG, or the gemcitabine intravesical system (TAR-200). The guideline recommendations read (EAU 2026, the Canadian guideline of 2021, NICE NG2, SITC 2021) are written for BCG; for the newer agents the only sources are their labels. Cretostimogene grenadenorepvec is investigational: EAU 2026 reports predominantly mild bladder toxicity in an interim analysis and no source read gives management rules for it. Intravesical chemotherapy (mitomycin, epirubicin, plain gemcitabine instillations), bleeding from the bladder caused by ifosfamide or cyclophosphamide, and children are not covered. The UK SmPC lists impaired immune response, positive HIV serology, pregnancy and lactation among the contraindications to BCG.",
  trigger: "Before each instillation, and whenever a person having intravesical treatment reports burning, frequency, urgency, bladder spasm, blood in the urine, a painful or swollen testicle, fever, chills, joint pain, cough or rash.",
  steps: [
    {
      action: "Do not give BCG in the first two weeks after TURBT, to a person with visible haematuria, after a traumatic catheterisation, or to a person with a symptomatic urinary tract infection",
      why: "EAU says major complications can appear after systemic absorption of BCG, which is why its contraindications should be respected. It adds that leukocyturia, non-visible haematuria and asymptomatic bacteriuria are not contraindications. The UK SmPC starts BCG 10 to 15 days after resection, once mucosal lesions have healed, and interrupts it for a urinary tract infection until the urine culture is negative and antibiotics have stopped.",
      source: "eau-nmibc-2026",
      quote: "Absolute contraindications of BCG intravesical instillation are: during the first two weeks after TURBT; in patients with visible haematuria; after traumatic catheterisation; and in patients with symptomatic urinary tract infection.",
      grade: "Strong",
    },
    {
      action: "If the catheter goes in traumatically, do not instil BCG that day: the US label says 7 to 14 days should elapse after a biopsy, a resection or a traumatic catheterisation",
      why: "The US label warns that instilling BCG onto an actively bleeding lining may promote systemic BCG infection; its warnings section words the wait as at least 1 week. The UK SmPC gives no number of days after a traumatic catheterisation and delays BCG until the mucosal damage has healed.",
      source: "tice-bcg-us-label",
      quote: "Seven to 14 days should elapse before BCG is administered following biopsy, TUR, or traumatic catheterization.",
    },
    {
      action: "Do not offer medicines to prevent BCG bladder toxicity before it happens, except as part of a clinical trial (NICE, for England)",
      why: "NICE gives no reason on its recommendations page. EAU says antibiotic prophylaxis is not necessary for asymptomatic bacteriuria, and reports trials in which quinolones given with each instillation reduced side effects. The Canadian guideline says further studies are needed before antibiotics are used routinely for this. The US label and the UK SmPC postpone BCG during antibiotic treatment because antibiotics may interfere with its effect.",
      source: "nice-ng2",
      quote: "Do not offer primary prophylaxis to prevent BCG‑related bladder toxicity except as part of a clinical trial.",
    },
    {
      action: "Tell the person what to expect after BCG and what to report: bladder irritation typically begins 4 to 6 hours after the instillation and lasts 24 to 72 hours",
      why: "The US label reports bladder irritability in approximately 60% of patients, usually from the third instillation and tending to increase with each one. It asks that the physician be notified of severe urinary side effects, such as burning or pain on urination, urgency, frequency or blood in the urine, and of joint pain, cough or skin rash.",
      source: "tice-bcg-us-label",
      quote: "The symptoms typically begin 4 to 6 hours after instillation and last 24 to 72 hours.",
    },
    {
      action: "For cystitis symptoms after BCG, the EAU options are phenazopyridine, mirabegron or an NSAID; if symptoms improve within a few days, continue the instillations",
      why: "These are EAU's management options and carry no strength rating. The US label says the irritative effects can usually be managed symptomatically, naming phenazopyridine (Pyridium), propantheline, oxybutynin and paracetamol (acetaminophen). NICE names antispasmodics or non-opiate analgesia. The UK SmPC says that in most cases the symptoms disappear within two days and the cystitis does not require treatment.",
      source: "eau-nmibc-2026",
      quote: "Phenazopyridine, mirabegrone or NSAIDs. If symptoms improve within a few days: continue instillations.",
    },
    {
      action: "If cystitis symptoms persist or worsen, the EAU options are to postpone the instillation, send a urine culture and start empirical antibiotic treatment",
      why: "The Canadian guideline also says a urine culture should be performed to rule out urinary tract infection when cystitis-like symptoms develop. SITC notes that these symptoms overlap with urinary tract infection, sensitivity related to catheterisation and overactive bladder.",
      source: "eau-nmibc-2026",
      quote: "If symptoms persist or worsen: a. Postpone the instillation b. Perform a urine culture c. Start empirical antibiotic treatment.",
    },
    {
      action: "If symptoms persist despite antibiotics, the EAU options are: adjust the antibiotic to a positive culture; for a negative culture, a quinolone and potentially analgesic anti-inflammatory instillations once daily for five days; and if symptoms still persist, anti-tuberculosis drugs with corticosteroids",
      why: "EAU's footnote says persistent severe cystitis symptoms with BCG carry a high risk of an underlying complicated urinary tract infection even without a positive culture, which is why the European restriction on quinolones does not apply here. The labels differ on the last option: the US label says antituberculosis drugs should not be used to prevent or treat the local irritative effects, and the UK SmPC says isoniazid 300 mg daily and analgesics can be given for severe symptoms during maintenance.",
      source: "eau-nmibc-2026",
      quote: "If symptoms persist even with antibiotic treatment: a. With positive culture: adjust antibiotic treatment according to sensitivity. b. With negative culture: quinolones* and potentially analgesic anti-inflammatory instillations once daily for five days (repeat cycle if necessary). **If symptoms persist: anti-TB drugs + corticosteroids.",
    },
    {
      action: "Seek advice from a specialist urology multidisciplinary team if bladder symptoms after BCG cannot be controlled with antispasmodics or non-opiate analgesia and cystoscopy has excluded other causes (NICE, for England)",
      why: "NICE gives no reason on its recommendations page. EAU notes that symptoms may come from the BCG or from the bladder disease itself (widespread carcinoma in situ).",
      source: "nice-ng2",
      quote: "Seek advice from a specialist urology multidisciplinary team if symptoms of bladder toxicity after BCG cannot be controlled with antispasmodics or non‑opiate analgesia and other causes have been excluded by cystoscopy.",
    },
    {
      action: "For visible blood in the urine after BCG, the EAU options are a urine culture to exclude haemorrhagic cystitis if there are other symptoms, and a cystoscopy if the bleeding persists",
      why: "EAU's cystoscopy is to look for a bladder tumour. The Canadian guideline suspends BCG until the haematuria has resolved and gives culture-directed antibiotics if a urinary tract infection is present; the US label and the UK SmPC also postpone BCG for gross haematuria.",
      source: "eau-nmibc-2026",
      quote: "Perform urine culture to exclude haemorrhagic cystitis if other symptoms present. If haematuria persists, perform cystoscopy to evaluate presence of bladder tumour.",
    },
    {
      action: "Expect general malaise and fever after BCG generally to resolve within 48 hours, with or without an antipyretic",
      why: "EAU lists a high fever that lasts longer as a separate problem, which is the next step. The US label says systemic effects of 1 to 2 days such as malaise, fever and chills often reflect hypersensitivity reactions, which can be treated symptomatically. The UK SmPC says these symptoms usually appear within 4 hours and last 24 to 48 hours, and that it is frequently not possible to tell an uncomplicated febrile reaction from early systemic BCG infection.",
      source: "eau-nmibc-2026",
      quote: "Generally resolve within 48 hours, with or without antipyretics.",
    },
    {
      action: "For a persistent high-grade fever (EAU: above 38.5°C for more than 48 hours), the EAU options are to stop BCG for good, evaluate immediately with urine culture, blood tests and a chest X-ray, treat promptly with more than two antimicrobial agents while the evaluation is under way, and consult an infectious disease specialist",
      why: "The thresholds differ by source. The US label takes fever of 38.5°C or more persisting longer than 2 to 3 days as suggesting active infection; the UK SmPC says fever above 39°C that does not resolve within 12 hours despite antipyretics must be considered systemic BCG infection. The Canadian guideline, at 38.5°C or more for 48 hours or more, suspends BCG until resolved or considers dose reduction, where EAU stops BCG permanently.",
      source: "eau-nmibc-2026",
      quote: "Immediate evaluation: urine culture, blood tests, chest X-ray. Prompt treatment with more than two antimicrobial agents while diagnostic evaluation is conducted. Consultation with an infectious disease specialist.",
    },
    {
      action: "When persistent fever or an acute febrile illness is consistent with BCG infection, the US label says 2 or more antimycobacterial agents should be administered while cultures and other tests are done, and BCG should be discontinued",
      why: "The label states that negative cultures do not necessarily rule out infection, that TICE BCG is sensitive to isoniazid, rifampicin and ethambutol and is not sensitive to pyrazinamide, and that deaths have been reported from systemic BCG infection and sepsis. The pooled review by Pérez-Jacoiste Asín put the diagnostic performance of conventional culture at 40.9%.",
      source: "tice-bcg-us-label",
      quote: "In patients who develop persistent fever or experience an acute febrile illness consistent with BCG infection, 2 or more antimycobacterial agents should be administered while diagnostic evaluation, including cultures, is conducted. BCG treatment should be discontinued. Negative cultures do not necessarily rule out infection.",
    },
    {
      action: "Admit a person with BCG sepsis to hospital and treat actively (Canadian guideline)",
      why: "The Canadian guideline gives no reason beyond the recommendation. The US label says the most serious infectious complication of BCG is disseminated sepsis with associated mortality.",
      source: "cua-nmibc-2021",
      quote: "BCG sepsis requires hospitalization and active treatment (LE 3, strong recommendation)",
      grade: "LE 3, strong recommendation",
    },
    {
      action: "For BCG sepsis, the EAU options are cessation of BCG and, for severe infection, high-dose quinolones, or isoniazid, rifampicin and ethambutol 1.2 g daily for six months, with early high-dose corticosteroids for as long as symptoms persist; consider an empirical non-specific antibiotic to cover Gram-negative bacteria and Enterococcus",
      why: "EAU gives no reason in the table. The Canadian table is close to it: stop BCG definitively, start empirical antibiotics such as high-dose quinolones, give isoniazid 300 mg, rifampicin 600 mg and ethambutol 1200 mg a day for 6 months, and add high-dose corticosteroids (for example prednisolone 40 mg a day) if persistent. The UK SmPC says systemic BCG infection should be treated with anti-tuberculosis drugs on the schedules used for tuberculosis, and that further BCG is then contraindicated.",
      source: "eau-nmibc-2026",
      quote: "High-dose quinolones or isoniazid, rifampicin, and ethambutol 1.2 g daily for six months. Early, high-dose corticosteroids as long as symptoms persist. Consider an empirical non-specific antibiotic to cover Gram-negative bacteria and/or Enterococcus.",
    },
    {
      action: "For a painful swollen testicle or epididymis after BCG (epididymo-orchitis), the EAU options are a urine culture and quinolones, and cessation of intravesical therapy",
      why: "The US label says epididymitis, prostatitis or orchitis lasting more than 2 to 3 days may suggest active infection, and that some such infections resisted multiple-drug antituberculous therapy and needed removal of the testicle. EAU lists orchidectomy for an abscess or no response to treatment, and for symptomatic granulomatous prostatitis adds isoniazid 300 mg a day and rifampicin 600 mg a day for three months if quinolones are not effective.",
      source: "eau-nmibc-2026",
      quote: "Perform urine culture and administer quinolones. Cessation of intravesical therapy. Orchidectomy if abscess or no response to treatment.",
    },
    {
      action: "Before each instillation of nadofaragene firadenovec, premedication with an anticholinergic is recommended (US label and EU SmPC)",
      why: "The EU SmPC says the premedication is to reduce potential bladder irritation and to prevent premature voiding of the bladder, and recommends it unless contraindicated; the US label gives no reason. The US label reports bladder spasm in 20% and micturition urgency in 19% of 157 patients, and says that if the patient has bladder cramping or passes urine early during the 1-hour dwell, repositioning may be adjusted or discontinued. Dosage interruptions for an adverse reaction occurred in 34% of patients.",
      source: "adstiladrin-us-label",
      quote: "Premedication with an anticholinergic before each instillation of ADSTILADRIN is recommended.",
    },
    {
      action: "Exclude a urinary tract infection before each nadofaragene instillation, and if one is diagnosed during treatment interrupt it until the person has no symptoms and the antibiotics are finished (EU SmPC)",
      why: "The EU SmPC says inflammation of the bladder lining may increase the risk of the product spreading through the blood. The US label read contains no equivalent instruction.",
      source: "adstiladrin-eu-smpc",
      quote: "Urinary tract infection should be excluded before each bladder instillation (bladder mucous membrane inflammation may increase the risk of haematological dissemination of ADSTILADRIN). If a urinary tract infection is diagnosed during therapy, the therapy should be interrupted until the patient is asymptomatic and treatment with antibiotics is completed.",
    },
    {
      action: "With the gemcitabine intravesical system (TAR-200), prophylactic antibiotics may be used at each insertion and removal, at the treating clinician's discretion (US label)",
      why: "The label gives no reason. It reports urinary tract infection in 44% of patients (6% grade 3 or 4), urinary frequency in 48% and dysuria in 42%, and dosage interruptions for an adverse reaction in 41%. It sets no rule for when to remove the system early for urinary symptoms, and says not to insert it into a perforated bladder or one whose lining is compromised until bladder integrity has been restored.",
      source: "inlexzo-us-label",
      quote: "Prophylactic antibiotics may be used at the discretion of the treating healthcare provider with each INLEXZO insertion and removal.",
    },
    {
      action: "Advise people having nogapendekin alfa inbakicept with BCG to report prolonged irritable bladder symptoms or prolonged red urine immediately (US label)",
      why: "This sentence is in the US label's counselling section, which is written for the prescriber. The same section says to inform patients that irritable bladder symptoms may occur during and after the instillation and that red-tinged urine may occur in the first 24 hours; it does not say how long counts as prolonged. It sends the reader to the BCG prescribing information for further counselling, and the EU SmPC to the SmPC of the BCG used for severe systemic BCG infection. The EU package leaflet tells patients to tell their doctor or nurse right away if bladder irritation or blood in the urine is severe or lasts a long time. In the US trial urinary tract infection (10%), dysuria (8%), haematuria (6%) and bladder irritation (6%) were the adverse reactions that most often interrupted treatment.",
      source: "anktiva-us-label",
      quote: "Advise patients to immediately report prolonged irritable bladder symptoms or prolonged passage of red-colored urine to their healthcare provider.",
    },
    {
      action: "Tell the person to contact their doctor immediately, and not to wait for the next appointment, for fever and chills, joint or muscle pain, feeling sick or vomiting, cough, a skin rash or extreme tiredness after BCG, or a high temperature for more than 48 hours, and to say they have had BCG",
      why: "Cancer Research UK explains that there is a very small chance of BCG getting into the system and causing an infection similar to TB that needs treatment, during treatment or some months after it. Macmillan lists a continuing high temperature, vomiting, a skin rash, a cough and painful joints, and says these, or feeling generally unwell, could be a sign of a more serious infection due to BCG that needs treatment straight away. The OncoTICE leaflet sets its own threshold: a fever above 39°C lasting more than 12 hours even after paracetamol.",
      source: "cruk-bcg",
      quote: "Contact your doctor immediately if you have any of these symptoms or have a high temperature for more than 48 hours. Do not wait until your next appointment.",
    },
  ],
  bestInClass: {
    statement: "For BCG, the most recent guideline that could be read is EAU 2026. Only two of its statements used here carry a rating: the absolute contraindications to an instillation (first two weeks after TURBT, visible haematuria, traumatic catheterisation, symptomatic urinary tract infection; Strong) and cautiously offering quinolones to treat BCG-related side effects (Weak). Its stepwise Table 7.1 is headed management options, is modified from the International Bladder Cancer Group for local side effects, and is unrated. The Canadian guideline (2021) rates one statement: BCG sepsis requires hospitalisation and active treatment (LE 3, strong recommendation). NICE NG2 (England, 2015, ungraded) says not to offer primary prophylaxis outside a trial; NICE says it will update a number of NG2's recommendations. The sources disagree in four places, and all positions are shown: the fever that should be treated as BCG infection (above 38.5°C for more than 48 hours in EAU; 38.5°C or more beyond 2 to 3 days in the US label; above 39°C for more than 12 hours despite antipyretics in the UK SmPC); whether BCG stops after such a fever (permanent discontinuation is among EAU's options; the US label says BCG should be discontinued) or is suspended with dose reduction considered (Canadian guideline); whether antituberculosis drugs have any place in local symptoms (US label no; UK SmPC and EAU's last step yes); and whether a reduced dose lowers toxicity. For nadofaragene, nogapendekin alfa and the gemcitabine intravesical system no guideline read gives management, and the labels are the only source. The AUA/SUO guideline, 2026 amendment, could not be read, so EAU is not compared with it here.",
    sources: ["eau-nmibc-2026", "cua-nmibc-2021", "nice-ng2", "tice-bcg-us-label", "oncotice-uk-smpc", "sitc-urothelial-2021", "adstiladrin-us-label", "adstiladrin-eu-smpc", "anktiva-us-label", "inlexzo-us-label", "aua-suo-nmibc-2026"],
  },
  variants: [
    {
      name: "Antibiotics with BCG: prevention and treatment",
      differs: "NICE (England) says not to offer primary prophylaxis against BCG bladder toxicity except in a clinical trial. EAU says antibiotic prophylaxis is not necessary for leukocyturia, non-visible haematuria or asymptomatic bacteriuria, and recommends cautiously offering quinolones to treat BCG-related side effects (Weak), noting the European restriction on quinolones. SITC says BCG may be given to people with asymptomatic bacteriuria but not with active infection or gross haematuria. The US label and UK SmPC postpone BCG while a person is on antibiotics.",
      evidence: "EAU cites three RCTs and one meta-analysis showing reduced side effects with quinolones given with BCG; in one, two doses of levofloxacin with each instillation reduced high-grade local and systemic side effects without improving completion of maintenance or the risk of severe BCG-related adverse events. The Canadian guideline reports one ofloxacin study in which local adverse effects fell from 83.3% to 61.1% and systemic ones from 75.9% to 54.4%, and says further studies are needed to validate the systematic use of antibiotics.",
      sources: ["nice-ng2", "eau-nmibc-2026", "cua-nmibc-2021", "sitc-urothelial-2021", "tice-bcg-us-label", "oncotice-uk-smpc"],
    },
    {
      name: "Antituberculosis drugs for local bladder symptoms",
      differs: "The US TICE BCG label says antituberculosis drugs such as isoniazid should not be used to prevent or treat the local irritative effects. The UK OncoTICE SmPC says that when cystitis symptoms are severe during maintenance, isoniazid 300 mg daily and analgesics can be given until the symptoms disappear. EAU keeps anti-tuberculosis drugs with corticosteroids as the last option when symptoms persist after antibiotics and quinolones.",
      evidence: "The US label says there are no data to suggest that the acute local toxicity is due to mycobacterial infection, and no evidence that dose reduction or antituberculous therapy can prevent or lessen it. The Canadian guideline cites a trial of BCG against epirubicin that was unable to show a role for prophylactic isoniazid in reducing side effects. The UK SmPC and EAU give no evidence for their position in the text read.",
      sources: ["tice-bcg-us-label", "oncotice-uk-smpc", "eau-nmibc-2026", "cua-nmibc-2021"],
    },
    {
      name: "The fever that counts as possible BCG infection",
      differs: "EAU: above 38.5°C for more than 48 hours. Canadian guideline: 38.5°C or more for 48 hours or more. US label: fever of 38.5°C (101.3°F) or more persisting longer than 2 to 3 days; elsewhere it lists febrile episodes with flu-like symptoms lasting more than 72 hours, fever of 103°F or more, systemic symptoms growing with repeated instillations, or persistently abnormal liver tests. UK SmPC: fever above 39°C that does not resolve within 12 hours despite antipyretic therapy. For patients, Cancer Research UK says a high temperature for more than 48 hours and the OncoTICE leaflet a fever above 39°C lasting more than 12 hours even after paracetamol.",
      evidence: "No source read gives evidence for its threshold. EAU puts systemic BCG infection at 1 to 2% and cites a Swedish national database with a cumulative incidence of a reported tuberculosis diagnosis of 1.1% at five years in 5,033 people exposed to BCG. A single-centre series (Pérez-Jacoiste Asín 2014) found systemic BCG infection in 11 of 256 patients (4.3%).",
      sources: ["eau-nmibc-2026", "cua-nmibc-2021", "tice-bcg-us-label", "oncotice-uk-smpc", "oncotice-uk-pil", "cruk-bcg", "perez-jacoiste-2014"],
    },
    {
      name: "Stopping BCG for good, suspending it, or lowering the dose",
      differs: "After a persistent high-grade fever EAU lists permanent discontinuation of BCG, and the US label says BCG should be discontinued. The Canadian guideline suspends BCG until the fever resolves or considers dose reduction, stops it definitively for BCG sepsis, and for a persistent allergic reaction suspends it and considers discontinuing. The UK SmPC makes further BCG contraindicated after a systemic BCG infection. For allergic reactions EAU delays treatment for a mild local reaction and discontinues for a moderate or severe systemic one. For people who tolerate BCG poorly, the Canadian guideline mentions decreasing the dose or the dwell time; the US label says there is no evidence that dose reduction prevents or lessens the irritative effects.",
      evidence: "EAU: the EORTC trial found no difference in toxicity between one-third and full dose, with a higher recurrence rate on one-third dose, especially when given for only one year; a meta-analysis of nine RCTs found fewer adverse events but more recurrence with less than half the standard dose. SITC: one prospective trial of 499 patients found significantly less grade 3 or higher toxicity with a reduced dose, and EORTC-30962 found no difference. In the pooled review by Pérez-Jacoiste Asín, BCG was resumed after a BCG infection in 2 of 36 patients with data, uneventfully.",
      sources: ["eau-nmibc-2026", "cua-nmibc-2021", "tice-bcg-us-label", "oncotice-uk-smpc", "sitc-urothelial-2021", "perez-jacoiste-2014"],
    },
    {
      name: "Waiting time after resection or a traumatic catheterisation",
      differs: "EAU: no BCG during the first two weeks after TURBT, and for preventing BCG sepsis, starting at least two weeks after TURBT if there are no signs and symptoms of haematuria. US label: 7 to 14 days after biopsy, resection or traumatic catheterisation in one section, at least 1 week in another. UK SmPC: start between 10 and 15 days after resection, not until mucosal lesions have healed, and after a traumatic catheterisation delay until the mucosal damage has healed.",
      evidence: "No source read cites a comparison of waiting times. In the single-centre series of Pérez-Jacoiste Asín, the interval between resection and the first instillation did not differ significantly between patients with and without BCG infection.",
      sources: ["eau-nmibc-2026", "tice-bcg-us-label", "oncotice-uk-smpc", "perez-jacoiste-2014"],
    },
    {
      name: "Newer intravesical agents: what the US and EU labels say",
      differs: "Nadofaragene firadenovec: both labels recommend anticholinergic premedication; only the EU SmPC says to exclude urinary tract infection before each instillation and to interrupt treatment for one; the EU package leaflet lists cloudy or bloody urine, pain or burning, fever, cramping in the lower belly or back and a strong frequent need to urinate as signs to tell the doctor about. Nogapendekin alfa inbakicept with BCG: neither label sets a rule for withholding a dose for bladder symptoms; the US label says dose reductions of nogapendekin alfa were not permitted in the trial while the BCG dose could be reduced, and both refer to the BCG product's own information. Gemcitabine intravesical system: US label only (no EU product information was found at the EMA); prophylactic antibiotics at the clinician's discretion.",
      evidence: "Rates from single-arm trials in the labels. Nadofaragene: bladder spasm 20% and micturition urgency 19% of 157 patients (US label); 19.7% and 18.5%, with urinary tract infection 14.6% (EU SmPC). Nogapendekin alfa with BCG: dysuria 32%, haematuria 32%, urinary frequency 27% and urinary tract infection 24% of 88 patients (US label); dysuria 35%, haematuria 35%, pollakiuria 32% and urinary tract infection 24% (EU SmPC, whose table covers 180 patients). Gemcitabine intravesical system: urinary frequency 48%, urinary tract infection 44%, dysuria 42%, micturition urgency 34% (US label). Cretostimogene has no label; EAU reports predominantly mild bladder toxicity in an interim analysis of 45 patients.",
      sources: ["adstiladrin-us-label", "adstiladrin-eu-smpc", "anktiva-us-label", "anktiva-eu-smpc", "inlexzo-us-label", "eau-nmibc-2026"],
    },
  ],
  grades: [
    { claim: "No BCG in the first two weeks after TURBT, with visible haematuria, after traumatic catheterisation or with symptomatic urinary tract infection", grade: "Strong", source: "eau-nmibc-2026" },
    { claim: "Quinolones to treat BCG-related side effects, offered cautiously", grade: "Weak", source: "eau-nmibc-2026", quote: "Cautiously offer quinolones to treat BCG-related side effects*." },
    { claim: "EAU's stepwise options for cystitis, haematuria, fever and BCG sepsis (Table 7.1)", grade: "Not rated (management options)", source: "eau-nmibc-2026", quote: "Management options for side effects associated with intravesical BCG" },
    { claim: "BCG sepsis requires hospitalisation and active treatment", grade: "LE 3, strong recommendation", source: "cua-nmibc-2021" },
    { claim: "A persistent fever (more than 48 hours) of 38.5°C or more should prompt a complete workup for infection", grade: "Not graded (text of section 6.2.3)", source: "cua-nmibc-2021", quote: "should prompt a complete workup for infection" },
    { claim: "No primary prophylaxis against BCG-related bladder toxicity except in a clinical trial", grade: "Not graded (NICE NG2 1.3.13)", source: "nice-ng2" },
    { claim: "Specialist multidisciplinary advice when antispasmodics or non-opiate analgesia fail and cystoscopy has excluded other causes", grade: "Not graded (NICE NG2 1.3.14)", source: "nice-ng2" },
    { claim: "BCG should not be given with active infection or gross haematuria, and may be given with asymptomatic bacteriuria", grade: "Not graded (panel recommendation without a level of evidence)", source: "sitc-urothelial-2021", quote: "BCG should not be administered to patients with active infection or gross hematuria, but BCG may be administered to patients experiencing asymptomatic bacteriuria." },
    { claim: "Antituberculosis drugs should not be used to prevent or treat the local irritative effects of BCG (US label)", grade: "Regulatory label; not graded", source: "tice-bcg-us-label", quote: "antituberculosis drugs (e.g., isoniazid) should not be used to prevent or treat the local, irritative toxicities of TICE BCG" },
    { claim: "Isoniazid 300 mg daily and analgesics can be given for severe cystitis symptoms during maintenance (UK SmPC)", grade: "Regulatory label; not graded", source: "oncotice-uk-smpc", quote: "In these cases, when severe symptoms are present, isoniazid (300 mg daily) and analgesics can be given until disappearance of symptoms." },
    { claim: "After a traumatic catheterisation, delay BCG until the mucosal damage has healed (UK SmPC)", grade: "Regulatory label; not graded", source: "oncotice-uk-smpc", quote: "Traumatic catheterisation or other injuries to the urethra or bladder mucosa can promote systemic BCG infection. Administration of OncoTICE should be delayed in such patients until mucosal damage has healed." },
    { claim: "Anticholinergic premedication before each nadofaragene instillation (EU SmPC)", grade: "Regulatory label; not graded", source: "adstiladrin-eu-smpc", quote: "Premedication with a single dose of an anticholinergic medicinal product before each instillation is recommended (see section 4.4)." },
    { claim: "Severe systemic BCG infection should be considered before BCG is started with nogapendekin alfa (EU SmPC)", grade: "Regulatory label; not graded", source: "anktiva-eu-smpc", quote: "The possibility of severe systemic BCG-infections with the necessity of anti-tuberculosis therapy should be considered before initiating the BCG-therapy." },
  ],
  sources: [
    {
      key: "eau-nmibc-2026",
      label: "EAU Guidelines on Non-muscle-invasive Bladder Cancer, 2026 edition: Disease Management (section 7.4.3.c, Table 7.1, section 7.10)",
      publisher: "European Association of Urology",
      year: 2026,
      url: "https://uroweb.org/guidelines/non-muscle-invasive-bladder-cancer/chapter/disease-management",
      gradingScheme: "Each recommendation carries a strength rating, Strong or Weak, set by the panel from the quality of the evidence, the balance of benefit and harm and patient preferences. Table 7.1 lists management options and carries no ratings.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "cua-nmibc-2021",
      label: "Canadian Urological Association guideline on the management of non-muscle-invasive bladder cancer, full text (authors declare advisory and honoraria relationships with manufacturers including Ferring, Janssen and Merck)",
      publisher: "Canadian Urological Association Journal (Bhindi et al.)",
      year: 2021,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8418246/",
      doi: "10.5489/cuaj.7367",
      gradingScheme: "Level of evidence (LE) 1 to 4 on a modified 2009 Oxford Centre for Evidence-based Medicine scale, with each recommendation strong or weak by a modified GRADE approach. Table 6 is headed suggested management and its rows are not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "nice-ng2",
      label: "Bladder cancer: diagnosis and management (NG2), recommendations 1.3.13, 1.3.14 and 1.4.1",
      publisher: "NICE",
      year: 2015,
      url: "https://www.nice.org.uk/guidance/ng2/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations. Published 25 February 2015; last reviewed 6 May 2026, with an update to a number of recommendations planned.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "sitc-urothelial-2021",
      label: "Society for Immunotherapy of Cancer (SITC) clinical practice guideline on immunotherapy for the treatment of urothelial cancer",
      publisher: "Journal for ImmunoTherapy of Cancer (Galsky et al.)",
      year: 2021,
      url: "https://doi.org/10.1136/jitc-2021-002552",
      doi: "10.1136/jitc-2021-002552",
      gradingScheme: "Level of evidence (LE) on the Oxford Centre for Evidence-Based Medicine Levels of Evidence 2 (2016 version); recommendations without an LE were based on expert consensus.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "tice-bcg-us-label",
      label: "TICE BCG (BCG live, for intravesical use), US prescribing information, revised 2/2026",
      publisher: "Merck Sharp & Dohme (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=c9b74876-e665-442b-87ad-b7333bc9a67a",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "oncotice-uk-smpc",
      label: "OncoTICE powder for instillation fluid for intravesical use, UK Summary of Product Characteristics, text revised 30 December 2025",
      publisher: "Merck Sharp & Dohme (UK) (electronic medicines compendium)",
      year: 2025,
      url: "https://www.medicines.org.uk/emc/product/1049/smpc",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "oncotice-uk-pil",
      label: "OncoTICE package leaflet: information for the user, last revised August 2025",
      publisher: "Merck Sharp & Dohme (UK) (electronic medicines compendium)",
      year: 2025,
      url: "https://www.medicines.org.uk/emc/product/1049/pil",
      gradingScheme: "Regulatory patient leaflet; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "adstiladrin-us-label",
      label: "Adstiladrin (nadofaragene firadenovec-vncg), US prescribing information, 03/2026",
      publisher: "Ferring Pharmaceuticals (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5ca20ed4-da4f-463c-ac2a-ccd6ab3774fa",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "adstiladrin-eu-smpc",
      label: "Adstiladrin (nadofaragene firadenovec), EU product information (conditional marketing authorisation; PDF dated 22 April 2026)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/adstiladrin-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "anktiva-us-label",
      label: "Anktiva (nogapendekin alfa inbakicept-pmln), US prescribing information, 10/2026",
      publisher: "Altor BioScience, a subsidiary of ImmunityBio (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=eae31db8-3e7a-d9e0-708d-74419d1b50ff",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "anktiva-eu-smpc",
      label: "Anktiva (nogapendekin alfa inbakicept), EU product information (conditional marketing authorisation; PDF dated 1 June 2026)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/documents/product-information/anktiva-epar-product-information_en.pdf",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "inlexzo-us-label",
      label: "Inlexzo (gemcitabine intravesical system), US prescribing information, version effective 26 October 2026",
      publisher: "Janssen Biotech (DailyMed)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=3aef8dbc-34d0-4150-89f0-3b16cf0fbfdb",
      gradingScheme: "Regulatory label; not graded.",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "perez-jacoiste-2014",
      label: "Bacillus Calmette-Guérin (BCG) infection following intravesical BCG administration as adjunctive therapy for bladder cancer: incidence, risk factors, and outcome in a single-institution series and review of the literature",
      publisher: "Medicine (Baltimore) (Pérez-Jacoiste Asín et al.)",
      year: 2014,
      url: "https://doi.org/10.1097/MD.0000000000000119",
      doi: "10.1097/MD.0000000000000119",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "cruk-bcg",
      label: "BCG into the bladder for non muscle invasive bladder cancer (patient information, last reviewed 14 July 2025)",
      publisher: "Cancer Research UK",
      year: 2025,
      url: "https://www.cancerresearchuk.org/about-cancer/bladder-cancer/treatment/early/bcg",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "macmillan-bcg",
      label: "BCG treatment for bladder cancer (patient information, reviewed 1 November 2022; marked as being reviewed)",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/bcg-treatment-for-bladder-cancer",
      read: "full-text",
      accessed: "2026-11-18",
    },
    {
      key: "aua-suo-nmibc-2026",
      label: "Diagnosis and Treatment of Non-Muscle Invasive Bladder Cancer: AUA/SUO Guideline (published 2016; amended 2020, 2024, 2026); abstract of the 2026 update only",
      publisher: "American Urological Association and Society of Urologic Oncology (Journal of Urology)",
      year: 2026,
      url: "https://www.auanet.org/guidelines-and-quality/guidelines/bladder-cancer-non-muscle-invasive-guideline",
      doi: "10.1097/JU.0000000000005280",
      read: "abstract",
      accessed: "2026-11-18",
    },
  ],
  drugs: ["bcg-intravesical", "nadofaragene-firadenovec", "nogapendekin-alfa", "tar-200"],
  cancers: ["non-muscle-invasive-bladder-cancer"],
  terms: ["intravesical-therapy", "bcg-unresponsive", "turbt"],
  related: ["levofloxacin"],
  upgrades: [],
  gaps: [
    "The AUA/SUO guideline on non-muscle-invasive bladder cancer (amended 2026) could not be read: the society's page asks for a login after the key takeaways, the PDF address returned 404 and the Internet Archive refused a scripted request. A second attempt on 18 November 2026 found the same login wall (the page says the PDF is free to members and sold to others), and Europe PMC lists the 2026 update as subscription only. Only the abstract of the 2026 update was read, and it states no recommendation on side effects. Whether AUA/SUO differs from EAU on antibiotics, dose reduction or when to stop BCG is therefore not shown on this page.",
    "EAU Table 7.1 is a list of management options modified from the International Bladder Cancer Group and carries no strength ratings; the original IBCG paper was not read. Apart from the contraindications (Strong) and quinolones (Weak), the steps taken from EAU are options, not rated recommendations.",
    "The sources do not agree on the fever that should be treated as possible BCG infection (above 38.5°C for more than 48 hours, 38.5°C or more beyond 2 to 3 days, or above 39°C for more than 12 hours despite antipyretics), and none gives evidence for its threshold.",
    "No guideline read gives management of bladder symptoms or urinary infection on nadofaragene firadenovec, nogapendekin alfa inbakicept or the gemcitabine intravesical system; the labels are the only source, and they set no rule for withholding a dose, or removing the gemcitabine system early, for urinary symptoms. No EU product information for the gemcitabine intravesical system was found at the EMA on 18 November 2026.",
    "Cretostimogene grenadenorepvec is investigational and has no label. The only statement read is EAU's report of predominantly mild bladder toxicity in an interim analysis of 45 patients; nothing read says how its bladder side effects should be managed, and the steps on this page were not written for it. For that reason cretostimogene is not among the medicines this page is filed under.",
    "The Canadian guideline's Table 6, as PubMed Central served it on 18 November 2026, defines the abbreviation LUTS (lower urinary tract symptoms) in its key and has no row that uses it, so a row on bladder symptoms may be missing from the copy read. Nothing on this page rests on such a row: what is said here about cystitis symptoms in the Canadian guideline comes from its running text.",
    "The EAU text spells mirabegron as 'mirabegrone'; the quotation keeps the source's spelling. EAU does not give doses for phenazopyridine, mirabegron, NSAIDs or quinolones, and does not say what the analgesic anti-inflammatory instillations contain.",
    "Only the TICE strain's labels were read (US label and UK SmPC). A BCG-medac SmPC was not read, and other strains' product information may differ.",
    "NICE's overview page for NG2 says the guideline was last reviewed on 6 May 2026 and that NICE will be updating a number of recommendations; it does not say there which ones, so the two NICE recommendations used here may change. NICE NG2 dates from February 2015 and the Canadian guideline from 2021; a Europe PMC search found no later Canadian guideline on non-muscle-invasive disease. The Macmillan page was reviewed in November 2022, its next review was due in November 2025, and it says it is being reviewed.",
    "Patient advice on when to call comes from Cancer Research UK, Macmillan, the OncoTICE leaflet and the US labels. No NHS or NCI page on BCG side effects was found. No source read tells patients when to go to an emergency department as distinct from contacting their doctor. For the gemcitabine intravesical system and for cretostimogene no source read states an urgent threshold for patients: the US label of the gemcitabine system says only to tell the healthcare provider about any side effect that bothers the person or does not go away.",
    "How BCG infection is confirmed is unsettled: EAU says the diagnostic performance of acid-fast staining, mycobacterial culture and PCR on urine during BCG treatment is uncertain, and the pooled review of 282 cases put their diagnostic performance at 25.3%, 40.9% and 41.8%.",
  ],
});
