import { protocol } from "./helpers";

/*
 * Assessing and clearing a blocked central venous access device (PICC, tunnelled line or port) in adults with cancer.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Ann Oncol 2015, DOI 10.1093/annonc/mdv296):
 *   full text, from the Internet Archive's capture of academic.oup.com (port exemplar agent's copy). Its occlusion
 *   section describes causes; its Table 3 compares other guidelines, including an NCCN line on 2 mg t-PA.
 * - US prescribing information for Cathflo Activase (alteplase, Genentech; DailyMed set id
 *   91ecdef2-95ff-42dd-a31c-c8a09cab3ad9, effective 20 January 2026): full text, SPL XML.
 * - Cochrane review, Interventions for restoring patency of occluded central venous catheter lumens (van Miert et al.,
 *   2012, DOI 10.1002/14651858.CD007119.pub2): abstract only, Europe PMC. No later version was found.
 * - INS Infusion Therapy Standards of Practice, 9th edition (2024): not reachable. No national or international
 *   oncology guideline with a graded occlusion algorithm could be read; NCCN guidelines need an account and were not
 *   read directly.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied with line breaks joined only.
 */
export const centralLineOcclusionManagement = protocol({
  id: "central-line-occlusion-management",
  name: "Blocked central line or port: assessment and clearing with a thrombolytic",
  aka: ["blocked PICC", "blocked port", "CVAD occlusion", "line will not bleed back", "withdrawal occlusion", "Cathflo", "alteplase line lock", "urokinase lock", "persistent withdrawal occlusion"],
  domain: "vascular-access",
  tldr: "If your line or port will not give blood back or will not flush, the nurse first checks for simple causes such as a kink, a closed clamp or a needle that has slipped. If a clot is the likely cause, a small dose of clot-dissolving medicine can be left in the line for half an hour to two hours. It should never be forced.",
  simple: "If your line or port is blocked, the nurse checks for kinks and clamps first, then may put a clot-dissolving medicine in it for a while. Tell the team if your arm, neck or face swells.",
  summary: "Occlusion is partial (fluid goes in but blood will not come back) or complete. ESMO (2015) groups causes as mechanical (a kink, a tight suture, a dislodged or blocked port needle, the tip against the vein wall, pinch-off between the first rib and clavicle), thrombotic (fibrin sheath, clot in the lumen, mural or venous thrombosis) and drug-related (precipitates from incompatible drugs or parenteral nutrition). The alteplase label asks that malposition, mechanical failure, suture constriction and precipitates be considered first, and warns against vigorous suction or excessive pressure, which can damage the catheter or push a clot into the circulation. If thrombosis of the vein is suspected (swelling, pain), ESMO recommends Doppler ultrasound [III, A].\n\nFor a suspected clot in the lumen, alteplase 2 mg in 2 ml (for people of 30 kg or more) is instilled and left; function is checked at 30 minutes and again at 120 minutes, and a second dose may be given if function has not returned at 120 minutes. In the label's trials, 75% of 995 patients had function restored 120 minutes after the first dose and 85% overall after up to two doses. Once restored, 4 to 5 ml of blood is aspirated to remove the drug and clot before a saline flush. The Cochrane review (2012) found low-quality evidence that urokinase restores patency better than placebo (RR 2.09; number needed to treat 4) and very low-quality evidence for alteplase, and could not judge safety. Regular saline flushing after every use is the main prevention (ESMO [II, B]).",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic", "community"],
  },
  population: "Adults with cancer who have a PICC, tunnelled central catheter or implanted port that will not aspirate or flush. Children are dosed by lumen volume (alteplase label). Dialysis catheters were excluded from the alteplase trials and are not covered.",
  trigger: "Blood cannot be withdrawn, or the line or port is sluggish or will not flush.",
  steps: [
    {
      action: "Look for mechanical causes first: a closed clamp, a kink, a tight suture, a port needle that has slipped, the tip against the vein wall or the catheter pinched under the collarbone",
      why: "Many blocked lines are not clotted, and a clot-dissolving drug will not fix a kink or a misplaced needle.",
      source: "esmo-2015",
      quote: "Several mechanical causes can lead to a blockage: kink in catheter, tight suture, huber needle dislodge or occlusion, the catheter tip being blocked by the vessel wall and pinch-off syndrome (compression of the catheter, caused by its passage through the narrow angle between the first rib and the lateral portion of the clavicle).",
    },
    {
      action: "Consider a drug or nutrition precipitate if the blockage followed incompatible infusions or parenteral nutrition",
      why: "Precipitates need a different solution from clots.",
      source: "esmo-2015",
      quote: "Inappropriate concentration or inadequate mixture can cause the precipitation of medications in the catheter lumen (low or high pH, calcium phosphate precipitate, lipid emulsion, high-osmolarity and high-protein nutrition formulas) [ 109 ].",
    },
    {
      action: "Never force a flush or pull hard on the syringe",
      why: "Force can split the catheter or push a clot into the lungs.",
      source: "alteplase-label",
      quote: "Because of the risk of damage to the vascular wall or collapse of soft‑walled catheters, vigorous suction should not be applied during attempts to determine catheter occlusion.",
    },
    {
      action: "If the arm, neck or face is swollen or painful, arrange a Doppler ultrasound for thrombosis",
      why: "A clot in the vein around the catheter needs anticoagulant treatment, not just clearing of the line.",
      source: "esmo-2015",
      quote: "Although venography is considered the gold standard for the diagnosis of CRT, Doppler ultrasound is usually carried out [III, A]",
      grade: "[III, A]",
    },
    {
      action: "For a suspected clot in the lumen, instil alteplase 1 mg/ml: 2 mg in 2 ml for people weighing 30 kg or more, without excessive pressure",
      why: "A small dose left in the catheter dissolves the clot in most cases.",
      source: "alteplase-label",
      quote: "Patients weighing ≥30 kg: 2 mg in 2 mL",
    },
    {
      action: "Try to aspirate after 30 minutes and, if still blocked, after 120 minutes; if function has not returned at 120 minutes, a second dose may be instilled",
      why: "Most clots clear within two hours; a second dose clears some of the rest.",
      source: "alteplase-label",
      quote: "If catheter function is not restored at 120 minutes after 1 dose of Cathflo Activase, a second dose may be instilled",
    },
    {
      action: "Once the line works, withdraw 4 to 5 ml of blood to remove the drug and clot, then flush gently with saline",
      why: "The drug and the loosened clot should come out rather than be pushed into the bloodstream.",
      source: "alteplase-label",
      quote: "If catheter function has been restored, aspirate 4–5 mL of blood in patients ≥10 kg or 3 mL in patients <10 kg to remove Cathflo Activase and residual clot, and gently irrigate the catheter with 0.9% Sodium Chloride Injection, USP",
    },
    {
      action: "If two doses fail, do not keep trying: get imaging of the catheter and decide with the team whether to reposition, exchange or remove it",
      why: "A line that still will not work after two doses is likely misplaced, damaged or sheathed, and further doses have not been studied.",
      practice: "The alteplase label gives no safety or efficacy data beyond two 2 mg doses, and ESMO's comparison table lists removal of a non-functional catheter among the options in other guidelines; no guideline read sets out the imaging step.",
    },
    {
      action: "Prevent recurrence by flushing with saline after every infusion and every blood sample",
      why: "Leaving blood or drug in the catheter is the commonest cause of clotting and precipitate.",
      source: "esmo-2015",
      quote: "Routine flushing with saline, after the completion of any infusion or blood sampling, is recommended [II, B]",
      grade: "[II, B]",
    },
  ],
  bestInClass: {
    statement: "No graded oncology guideline sets out an occlusion algorithm that could be read. The best-supported sequence combines ESMO 2015 (rule out mechanical and precipitate causes; Doppler ultrasound for suspected thrombosis [III, A]; saline flushing after every use [II, B]) with the alteplase label (2 mg in 2 ml, check at 30 and 120 minutes, a second dose if needed, aspirate before flushing, no force). The evidence for thrombolytics is weak: the Cochrane review (2012) rated urokinase low quality and alteplase very low quality for efficacy, and could not judge safety.",
    sources: ["esmo-2015", "alteplase-label", "cochrane-patency-2012"],
  },
  variants: [
    {
      name: "Urokinase instead of alteplase",
      differs: "Uses urokinase as the catheter thrombolytic, as some countries do where alteplase for catheters is not licensed.",
      evidence: "Cochrane 2012: low-quality evidence from two studies that urokinase restores patency better than placebo (RR 2.09, 95% CI 1.47 to 2.95; number needed to treat 4), with insufficient evidence on safety. Doses vary by product and country and were not read from a label here.",
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
      accessed: "2026-11-11",
    },
    {
      key: "cochrane-patency-2012",
      label: "Interventions for restoring patency of occluded central venous catheter lumens",
      publisher: "Cochrane Database of Systematic Reviews (van Miert et al.)",
      year: 2012,
      url: "https://doi.org/10.1002/14651858.CD007119.pub2",
      doi: "10.1002/14651858.CD007119.pub2",
      gradingScheme: "GRADE quality of evidence: high, moderate, low or very low.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "ins-2024",
      label: "Infusion Therapy Standards of Practice, 9th Edition",
      publisher: "Infusion Nurses Society (Journal of Infusion Nursing)",
      year: 2024,
      url: "https://doi.org/10.1097/NAN.0000000000000532",
      doi: "10.1097/NAN.0000000000000532",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["alteplase", "urokinase"],
  technologies: ["picc-lines", "implanted-ports", "catheter-lock-solutions", "huber-needles-port-access"],
  terms: ["central-venous-access", "vte"],
  related: ["catheter-related-thrombosis-in-cancer", "picc-and-tunnelled-line-care", "implanted-port-access-and-care"],
  upgrades: [],
  gaps: [
    "No graded national or international guideline on occlusion could be read; the INS Standards (2024), which address it in detail, were not reachable, and NCCN is cited only through ESMO's 2015 comparison table.",
    "The Cochrane review dates from 2012 (searches to 2011) and was read as an abstract; no newer systematic review of thrombolytics for catheter occlusion was found.",
    "Management of drug or lipid precipitates (for example with acid or ethanol) is not covered: no source read gives a regimen.",
    "There is no OnCo drug record for alteplase, so the drug is named here without a link.",
  ],
});
