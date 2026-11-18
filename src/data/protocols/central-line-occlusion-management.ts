import { protocol } from "./helpers";

/*
 * Assessing and clearing a blocked central venous access device (PICC, tunnelled line or port) in adults with cancer.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every claim was re-read against raw
 * source text fetched that day, and every quote checked verbatim by script, where the source could be read.
 * - US prescribing information for Cathflo Activase (alteplase, Genentech; DailyMed set id
 *   91ecdef2-95ff-42dd-a31c-c8a09cab3ad9, label version 18, effective 20 January 2026, the latest in DailyMed's
 *   history; its own text is marked revised 02/2019): full text, SPL XML, tags stripped. Every dose, volume, weight
 *   band, dwell time, repeat dose and maximum on the page was checked against it.
 * - UK Summary of Product Characteristics for Actilyse Cathflo 2 mg (alteplase, Boehringer Ingelheim; electronic
 *   medicines compendium, text revised September 2024): full text, HTML, tags stripped. Added in this pass. It gives
 *   the same doses and timings, and adds the advice to consider catheter replacement after a failed second dose.
 * - Cochrane review, Interventions for restoring patency of occluded central venous catheter lumens (van Miert et al.,
 *   2012, DOI 10.1002/14651858.CD007119.pub2): abstract from the Europe PMC REST API and, new in this pass, the full
 *   text from the PubMed Central HTML (PMC6516836), tags stripped. No later version exists in Crossref.
 * - Macmillan Cancer Support, PICC lines (patient page, reviewed 1 March 2022): HTML, tags stripped (the copy the
 *   checker of the catheter-related thrombosis protocol saved on 17 November 2026, re-used). Added in this pass for
 *   the symptoms a patient is asked to report.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Ann Oncol 2015, DOI 10.1093/annonc/mdv296):
 *   read in full on 11 November 2026 from the Internet Archive's capture of academic.oup.com. NOT re-read on
 *   17 November 2026: the publisher returned 403 with a bot check, the Internet Archive had already answered 429 to
 *   sibling checkers, and Europe PMC holds no open copy and no abstract. Its four quotes and two grades stand as
 *   recorded on 11 November and are named in `gaps`; the step on considering other causes now rests on the label.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): not reachable (it refuses a script; not retried
 *   in this pass after sibling checkers' failed attempts the same day). NCCN guidelines need an account and were not
 *   read.
 *
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied with line breaks
 * joined only.
 */
export const centralLineOcclusionManagement = protocol({
  id: "central-line-occlusion-management",
  name: "Blocked central line or port: assessment and clearing with a thrombolytic",
  aka: ["blocked PICC", "blocked port", "CVAD occlusion", "line will not bleed back", "withdrawal occlusion", "Cathflo", "alteplase line lock", "urokinase lock", "persistent withdrawal occlusion"],
  domain: "vascular-access",
  tldr: "If your line or port will not give blood back or will not flush, the nurse first looks for simple causes such as a kink or a port needle that has slipped. If a clot is the likely cause, a small dose of clot-dissolving medicine can be left in the line and checked after half an hour and again after two hours. Strong pressure or suction should not be used on a blocked line.",
  simple: "If your line or port is blocked, the nurse checks for simple causes first, then may put a clot-dissolving medicine in it for a while. Contact your hospital team if your arm, hand, chest area or neck swells on the side of the line.",
  summary: "The Cochrane review (2012) defines a withdrawal occlusion (fluid goes in but blood will not come back), a partial occlusion and a total occlusion. ESMO (2015; read on 11 November 2026 and not re-read on 17 November 2026) groups causes as mechanical (a kink, a tight suture, a dislodged or blocked port needle, the tip against the vein wall, pinch-off between the first rib and clavicle), thrombotic (fibrin sheath, clot in the lumen, mural or venous thrombosis) and drug-related (precipitates from incompatible drugs or parenteral nutrition). The US label (Cathflo Activase) and the UK SmPC (Actilyse Cathflo) for alteplase both list malposition, mechanical failure, suture constriction and lipid deposits or drug precipitates as causes other than a clot, and the US label says these should be considered before treatment. Both warn against vigorous suction when testing the line (risk of damage to the vessel wall or collapse of a soft-walled catheter) and against excessive pressure when instilling the drug (risk of catheter rupture or of expelling the clot into the circulation). Both advise caution in people at risk of bleeding, and both warn that alteplase in an infected catheter can release infection into the circulation. Where thrombosis of the vein is suspected, ESMO says Doppler ultrasound is usually carried out [III, A].\n\nFor a suspected clot in the lumen, both labels give alteplase at 1 mg/ml: 2 mg in 2 ml for people of 30 kg or more (the UK SmPC says up to 2 mg), and 110% of the catheter's internal lumen volume, not exceeding 2 mg, for people under 30 kg. Function is checked after 30 minutes and again after 120 minutes, and a second dose of equal amount may be instilled if function has not returned at 120 minutes. The US label says total doses above 4 mg (two 2 mg doses) have not been studied; the UK SmPC allows up to two doses for each occlusion and says to consider catheter replacement if the second fails. In the US label's open-label trial of 995 patients, 52% had function restored 30 minutes after the first dose, 75% at 120 minutes and 85% after up to two doses; in its placebo-controlled trial, function returned after one dose in 67% of 76 patients given alteplase and 16% of 74 given placebo. Of 346 successfully treated patients followed for 30 days, 26% had catheter dysfunction again. Once function is restored, 4 to 5 ml of blood (3 ml in a patient under 10 kg) is aspirated to remove the drug and residual clot before gentle irrigation with 0.9% sodium chloride. The UK SmPC does not recommend instilling heparin together with alteplase. The Cochrane review (2012) found low-quality evidence that urokinase restores patency better than placebo (RR 2.09; number needed to treat 4) and very low-quality evidence for alteplase, and found too little evidence to draw strong conclusions on safety. ESMO recommends routine flushing with saline after any infusion or blood sampling [II, B].",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "community"],
  },
  population: "Adults with cancer who have a PICC, tunnelled central catheter or implanted port that will not aspirate or flush. Both alteplase labels dose people under 30 kg by the catheter's lumen volume, and the UK SmPC says children follow the same scheme. The US label's trials excluded haemodialysis catheters, while the UK SmPC's indication includes them; this page does not cover dialysis catheters.",
  trigger: "Blood cannot be withdrawn, or the line or port is sluggish or will not flush.",
  steps: [
    {
      action: "Before treating for a clot, consider other causes: a catheter out of position, mechanical failure, a suture constricting the catheter, or lipid deposits or drug precipitates in the lumen",
      why: "Alteplase is for a line blocked by a clot. Both alteplase labels list these other causes, and the US label says they should be considered before treatment.",
      source: "alteplase-label",
      quote: "Catheter dysfunction may be caused by a variety of conditions other than thrombus formation, such as catheter malposition, mechanical failure, constriction by a suture, and lipid deposits or drug precipitates within the catheter lumen.",
    },
    {
      action: "Look for the mechanical causes ESMO lists: a kink, a tight suture, a port needle that has slipped or blocked, the tip against the vein wall, or the catheter pinched between the first rib and the collarbone",
      why: "This is ESMO's list of mechanical causes of a blockage. The sentence was read on 11 November 2026 and could not be re-read on 17 November 2026.",
      source: "esmo-2015",
      quote: "Several mechanical causes can lead to a blockage: kink in catheter, tight suture, huber needle dislodge or occlusion, the catheter tip being blocked by the vessel wall and pinch-off syndrome (compression of the catheter, caused by its passage through the narrow angle between the first rib and the lateral portion of the clavicle).",
    },
    {
      action: "Consider a drug or nutrition precipitate where the line has carried mixtures that can precipitate",
      why: "ESMO lists calcium phosphate, lipid emulsion and concentrated nutrition formulas among the mixtures that can precipitate in the lumen. No source read here gives a way to clear a precipitate. The sentence was read on 11 November 2026 and could not be re-read on 17 November 2026.",
      source: "esmo-2015",
      quote: "Inappropriate concentration or inadequate mixture can cause the precipitation of medications in the catheter lumen (low or high pH, calcium phosphate precipitate, lipid emulsion, high-osmolarity and high-protein nutrition formulas) [ 109 ].",
    },
    {
      action: "Do not apply vigorous suction when testing the line, and avoid excessive pressure when instilling the drug",
      why: "The US label warns that vigorous suction can damage the vein wall or collapse a soft-walled catheter, and that excessive pressure could rupture the catheter or expel the clot into the circulation. The UK SmPC says the same.",
      source: "alteplase-label",
      quote: "Because of the risk of damage to the vascular wall or collapse of soft‑walled catheters, vigorous suction should not be applied during attempts to determine catheter occlusion.",
    },
    {
      action: "Where a clot in the vein is suspected, arrange imaging; ESMO says Doppler ultrasound is the test usually carried out",
      why: "Both alteplase labels advise caution in people at high risk of embolic complications and give venous thrombosis in the region of the catheter as the example. The ESMO sentence and its grade were read on 11 November 2026 and could not be re-read on 17 November 2026.",
      source: "esmo-2015",
      quote: "Although venography is considered the gold standard for the diagnosis of CRT, Doppler ultrasound is usually carried out [III, A]",
      grade: "[III, A]",
    },
    {
      action: "Before instilling alteplase, check for bleeding risk and for known or suspected infection in the catheter",
      why: "The US label advises caution with active internal bleeding, with surgery, obstetric delivery, a deep biopsy or puncture of a non-compressible vessel within the previous 48 hours, and with thrombocytopenia or other clotting defects. It also says that alteplase in an infected catheter may release a localised infection into the circulation. It sets no platelet threshold.",
      source: "alteplase-label",
      quote: "Cathflo Activase should be used with caution in the presence of known or suspected infection in the catheter.",
    },
    {
      action: "For a suspected clot in the lumen, instil alteplase at 1 mg/ml: 2 mg in 2 ml for people weighing 30 kg or more; under 30 kg, 110% of the catheter's internal lumen volume, not exceeding 2 mg in 2 ml",
      why: "In the US label's open-label trial of 995 patients, one dose restored function in 52% by 30 minutes and in 75% by 120 minutes. The UK SmPC gives the same doses, worded as up to 2 mg.",
      source: "alteplase-label",
      quote: "Patients weighing ≥30 kg: 2 mg in 2 mL",
    },
    {
      action: "Try to aspirate after 30 minutes of dwell time and, if still blocked, after 120 minutes; if function has not returned at 120 minutes, a second dose of equal amount may be instilled",
      why: "In the same trial 209 patients had a second dose, and 46% of them had function restored 120 minutes after it. The US label says total doses above 4 mg (two 2 mg doses) have not been studied.",
      source: "alteplase-label",
      quote: "If catheter function is not restored at 120 minutes after 1 dose of Cathflo Activase, a second dose may be instilled",
    },
    {
      action: "Once the line works, withdraw 4 to 5 ml of blood (3 ml in a patient under 10 kg) to remove the drug and residual clot, then irrigate gently with 0.9% sodium chloride",
      why: "Both labels give this step so that the alteplase and what is left of the clot are drawn out before the line is flushed.",
      source: "alteplase-label",
      quote: "If catheter function has been restored, aspirate 4–5 mL of blood in patients ≥10 kg or 3 mL in patients <10 kg to remove Cathflo Activase and residual clot, and gently irrigate the catheter with 0.9% Sodium Chloride Injection, USP",
    },
    {
      action: "If the line still does not work after a second dose, consider replacing the catheter",
      why: "The UK SmPC says to consider replacement at this point, and the US label says that giving more than two doses has not been studied.",
      source: "alteplase-smpc-uk",
      quote: "If after a second dose of alteplase the catheter functionality has not been restored consider catheter replacement.",
    },
    {
      action: "Flush with saline after every infusion and every blood sample",
      why: "Macmillan tells patients that a PICC line is flushed to stop it becoming blocked. The ESMO sentence and its grade were read on 11 November 2026 and could not be re-read on 17 November 2026.",
      source: "esmo-2015",
      quote: "Routine flushing with saline, after the completion of any infusion or blood sampling, is recommended [II, B]",
      grade: "[II, B]",
    },
  ],
  bestInClass: {
    statement: "No graded oncology guideline sets out an occlusion algorithm that could be read. The best-supported sequence combines the two alteplase labels, which agree (consider causes other than a clot; no vigorous suction or excessive pressure; caution with bleeding risk and infection; 2 mg in 2 ml at 30 kg or more; check at 30 and 120 minutes; a second dose of equal amount if needed; aspirate before irrigating; the UK SmPC adds considering catheter replacement if two doses fail), with ESMO 2015 as read on 11 November 2026 (mechanical and precipitate causes; Doppler ultrasound usually carried out for suspected thrombosis [III, A]; saline flushing after every use [II, B]). The trial evidence for thrombolytics is weak: the Cochrane review (2012) rated urokinase low quality and alteplase very low quality for efficacy, and found too little evidence to draw strong conclusions on safety.",
    sources: ["alteplase-label", "alteplase-smpc-uk", "esmo-2015", "cochrane-patency-2012"],
  },
  variants: [
    {
      name: "UK product (Actilyse Cathflo)",
      differs: "The UK SmPC words the dose as up to 2 mg, up to two times for each occlusion, and its indication includes haemodialysis catheters. For a lumen volume greater than 2 ml it allows further dilution with 0.9% sodium chloride to the desired volume (its example is 2.0 mg in 2.5 ml), down to a minimum concentration of 0.2 mg/ml. It does not recommend instilling heparin together with alteplase.",
      evidence: "A product licence, not a graded recommendation. Weight bands, dwell times, the second dose and the aspiration volumes are the same as in the US label.",
      sources: ["alteplase-smpc-uk", "alteplase-label"],
    },
    {
      name: "Urokinase instead of alteplase",
      differs: "Uses urokinase as the catheter thrombolytic.",
      evidence: "Cochrane 2012: low-quality evidence from two studies that urokinase restores patency better than placebo (RR 2.09, 95% CI 1.47 to 2.95; number needed to treat 4), with insufficient evidence on safety. One study of 50 participants compared urokinase 10,000 IU with alteplase 2 mg and favoured alteplase (RR 1.51, 95% CI 1.04 to 2.19), which the review rated very low quality. Doses vary by product and country and were not read from a label here.",
      sources: ["cochrane-patency-2012"],
    },
  ],
  grades: [
    { claim: "Urokinase more effective than placebo for restoring patency", grade: "Low-quality evidence", source: "cochrane-patency-2012", quote: "There was low quality evidence from a meta-analysis of two studies suggesting that urokinase (various strengths) was more effective than placebo for restoring patency to occluded CVC lumens in adults and children with underlying medical conditions (relative risk (RR) 2.09, 95% confidence interval (CI) 1.47 to 2.95), with a number needed to treat of 4 (95% CI 2 to 8)." },
  ],
  sources: [
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "alteplase-label",
      label: "Cathflo Activase (alteplase) for catheter clearance, US prescribing information",
      publisher: "US National Library of Medicine, DailyMed (Genentech)",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=91ecdef2-95ff-42dd-a31c-c8a09cab3ad9",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "alteplase-smpc-uk",
      label: "Actilyse Cathflo 2 mg powder for solution for injection and infusion, Summary of Product Characteristics",
      publisher: "Boehringer Ingelheim (electronic medicines compendium)",
      year: 2024,
      url: "https://www.medicines.org.uk/emc/product/4617/smpc",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cochrane-patency-2012",
      label: "Interventions for restoring patency of occluded central venous catheter lumens",
      publisher: "Cochrane Database of Systematic Reviews (van Miert et al.)",
      year: 2012,
      url: "https://doi.org/10.1002/14651858.CD007119.pub2",
      doi: "10.1002/14651858.CD007119.pub2",
      gradingScheme: "GRADE quality of evidence: high, moderate, low or very low.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-picc",
      label: "PICC lines",
      publisher: "Macmillan Cancer Support",
      year: 2022,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatment/types-of-treatment/cancer-drug-treatments/picc-lines",
      gradingScheme: "Patient information page; not graded. Reviewed 1 March 2022; the page is marked as being reviewed.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ins-2024",
      label: "Infusion Therapy Standards of Practice, 9th Edition",
      publisher: "Infusion Nurses Society (Journal of Infusion Nursing)",
      year: 2024,
      url: "https://doi.org/10.1097/NAN.0000000000000532",
      doi: "10.1097/NAN.0000000000000532",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  drugs: ["alteplase", "urokinase"],
  technologies: ["picc-lines", "implanted-ports", "catheter-lock-solutions", "huber-needles-port-access"],
  terms: ["central-venous-access", "vte"],
  related: ["catheter-related-thrombosis-in-cancer", "picc-and-tunnelled-line-care", "implanted-port-access-and-care"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the ESMO 2015 guideline could not be re-read: the publisher returned 403 with a bot check and no open copy exists. What rests on ESMO alone was read on 11 November 2026 and is not re-verified: its list of mechanical causes, its sentence on precipitates, its grouping of thrombotic causes, the sentence on Doppler ultrasound with its grade [III, A], the sentence on saline flushing with its grade [II, B], and its grading scheme. No dose or time limit on this page rests on ESMO.",
    "No graded national or international guideline on occlusion could be read; the INS Standards (2024), which address it in detail, were not reachable, and NCCN guidelines need an account and were not read.",
    "The Cochrane review dates from 2012 (searches to September 2011) and has no later version. Two later reviews were found and read as abstracts only, and no step rests on them: a 2019 meta-analysis in children with cancer (da Costa et al., Pediatrics, DOI 10.1542/peds.2018-3789), which reported an overall restoration rate of 88% for alteplase across six studies, and a 2025 umbrella review of eleven articles (Elliott et al., Journal of Vascular Access, DOI 10.1177/11297298241246092).",
    "Management of drug or lipid precipitates (for example with acid or ethanol) is not covered: no source read gives a regimen.",
    "No source read says what imaging to do when two doses of alteplase fail; the UK SmPC says only to consider catheter replacement. The first version of this page told the team to get imaging of the catheter at that point, and that advice was removed on 17 November 2026.",
    "The alteplase labels give no platelet count or clotting result below which the drug should not be used; they advise caution and leave the decision to the clinician.",
    "The symptoms a patient is asked to report are from Macmillan's page on PICC lines (swelling, redness or tenderness in the arm, chest area or neck, a swollen hand, shortness of breath, tightness in the chest). Macmillan says to contact the hospital doctor or nurse and gives no time limit; no source read here gives one, and no patient page on ports or tunnelled lines was read for this.",
    "Urokinase doses were not read from a product label, so none is given.",
  ],
});
