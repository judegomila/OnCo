import { protocol } from "./helpers";

/*
 * Injecting the tracers that find the sentinel lymph node (radioisotope, blue dye, and the alternatives), and being
 * ready for the rare severe allergic reaction to blue dye.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - NICE NG101, Early and locally advanced breast cancer: recommendations page, full text (recommendation 1.4.10,
 *   dual technique, dated 2009 within the current guideline).
 * - US prescribing information, DailyMed SPL XML, current on that date: isosulfan blue injection 1% (Mylan
 *   Institutional) and Lymphoseek (technetium Tc 99m tilmanocept): full text.
 * - NAP6, the Royal College of Anaesthetists' 6th National Audit Project on perioperative anaphylaxis (Harper et al.,
 *   Br J Anaesth 2018, two papers): abstracts only. The NAP6 report site refused a script (403).
 * - Meta-analyses, Europe PMC full text: isosulfan blue adverse events (Eur J Breast Health 2025, PMC11706119); blue
 *   dye plus isotope versus isotope alone (BMC Cancer 2016, PMC4754824); indocyanine green fluorescence versus isotope
 *   and blue dye (Ann Surg Oncol 2020, PMC8184731). Quotes are from their abstracts.
 * - Not reachable: the EANM/SNMMI practice guideline for lymphoscintigraphy and sentinel node localisation in breast
 *   cancer (2013) and the 2024 German procedure guideline (no open copy; the publisher shows a bot check), the ASCO
 *   breast (2017) and ASCO/SSO melanoma (2018) sentinel node guidelines (no open full text), the UK patent blue V
 *   summary of product characteristics (emc search page returned no product text to a script), and the census paper
 *   on methylene blue (Acta Oncol 2011; no abstract in Europe PMC).
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const sentinelNodeTracersAndBlueDyeSafety = protocol({
  id: "sentinel-node-tracers-and-blue-dye-safety",
  name: "Sentinel node tracers and blue dye: injection, allergic reaction readiness and aftercare",
  aka: ["sentinel lymph node mapping tracer", "blue dye anaphylaxis", "isosulfan blue reaction", "patent blue anaphylaxis", "dual technique sentinel node biopsy", "lymphatic mapping dye safety"],
  domain: "surgery-perioperative",
  tldr: "To find the sentinel lymph node, a radioactive tracer and often a blue dye are injected near the tumour. Severe allergic reactions to the blue dye are rare (about 2 in 1,000 in the largest pooled study) but can come late, so the team asks about allergies beforehand and watches you closely for at least an hour. Your urine may be blue for a day and the skin can stay blue-stained for a while.",
  simple: "Tell the team about any allergy, asthma, or reaction to a dye or to dextran. After the blue dye, you will be watched for at least an hour. Blue or green urine for a day is expected.",
  summary: "NICE NG101 tells UK breast teams to perform SLNB 'using the dual technique with isotope and blue dye' (2009 recommendation, unchanged in the current guideline). In a systematic review of 24 prospective studies, adding blue dye to isotope raised the identification rate (OR 2.03) but did not lower the false-negative rate. Isosulfan blue: hypersensitivity in about 2% (label), with life-threatening anaphylaxis possible; risk is higher with asthma, allergies, drug reactions or a previous reaction to triphenylmethane dyes; monitor for at least 60 minutes with trained staff and resuscitation available; do not mix with lidocaine in the same syringe; pulse oximetry reads falsely low (maximal at 30 minutes). A 2025 meta-analysis (8 studies, 19,183 breast patients) found 11.65 adverse events per 1,000 and 1.86 per 1,000 needing vasopressors, with no deaths; intraparenchymal injection had more events than peritumoral. NAP6 (UK, 266 severe perioperative anaphylaxis cases) identified Patent Blue as the culprit in 9 of 199, with delayed onset compared with antibiotics and neuromuscular blockers. Technetium tilmanocept: ask about dextran reactions and have resuscitation ready. Indocyanine green fluorescence was equivalent to isotope and superior to dual isotope and blue dye for identification in a 2020 meta-analysis.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "radiographer", "nurse", "patient-or-carer"],
    where: ["theatre", "outpatient-clinic", "ward"],
  },
  population: "Adults having sentinel lymph node biopsy, chiefly for early breast cancer and melanoma, also vulval, cervical, endometrial, penile and oral cancers where the operation is offered. The sources read are mainly about breast cancer; tracer choice and injection site differ by cancer and are set by the team.",
  trigger: "A planned sentinel lymph node biopsy.",
  steps: [
    {
      action: "For early breast cancer, use the dual technique: radioisotope plus blue dye (UK, NICE)",
      why: "Using two tracers finds the sentinel node more often than isotope alone.",
      source: "nice-ng101",
      quote: "Perform SLNB using the dual technique with isotope and blue dye. [2009]",
      grade: "Not graded (NICE NG101 1.4.10, 'perform', 2009)",
    },
    {
      action: "Before injecting blue dye, ask about asthma, allergies, previous drug reactions and any earlier reaction to a blue dye",
      why: "Allergic reactions to the dye are more likely in these people, and the team can plan for that or choose another tracer.",
      source: "isosulfan-us",
      quote: "Reactions are more likely to occur in patients with a history of bronchial asthma, allergies, drug reactions or previous reactions to tri-phenylmethane dyes.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Before a tilmanocept (Lymphoseek) injection, ask about reactions to dextran or iron dextran",
      why: "This tracer is chemically similar to dextran, which can cause serious allergic reactions.",
      source: "lymphoseek-us",
      quote: "Before administering Lymphoseek, ask patients about prior hypersensitivity reactions to drugs, especially to dextran and modified forms of dextran.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Have resuscitation equipment and staff trained to use it immediately available when any tracer is injected",
      why: "A severe allergic reaction needs treatment within minutes.",
      source: "lymphoseek-us",
      quote: "Have resuscitation equipment and trained personnel immediately available at the time of Lymphoseek administration.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Draw up isosulfan blue in its own syringe, never mixed with lidocaine",
      why: "Mixed in one syringe, the two form a solid deposit at once.",
      source: "isosulfan-us",
      quote: "The admixture of isosulfan blue injection 1% (with local anesthetics (i.e. lidocaine)) in the same syringe results in an immediate precipitation of 4% to 9% drug complex. Use a separate syringe to administer a local anesthetic.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Watch the patient closely for at least 60 minutes after blue dye, remembering that reactions to it can start late",
      why: "Unlike reactions to antibiotics, reactions to blue dye often appear well after the injection, sometimes after surgery has moved on.",
      source: "isosulfan-us",
      quote: "Monitor patients closely for at least 60 minutes after administration of isosulfan blue injection 1%. Trained personnel should be available to administer emergency care including resuscitation.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Expect pulse oximetry to read falsely low after blue dye; confirm a low reading with an arterial blood gas",
      why: "The blue colour in the blood fools the finger probe for up to a few hours.",
      source: "isosulfan-us",
      quote: "Isosulfan blue injection 1% interferes with measurements of oxygen saturation in peripheral blood by pulse oximetry and can cause falsely low readings. The interference effect is maximal at 30 minutes and minimal generally by 4 hours after administration.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Tell the patient their urine may be blue for 24 hours and the skin at the injection site may stay blue",
      why: "Knowing in advance prevents alarm; the skin staining can last a long time.",
      source: "isosulfan-us",
      quote: "Inform patients that urine color may be blue for 24 hours following administration of isosulfan blue injection 1%.",
      grade: "Label instruction (no grade)",
    },
  ],
  bestInClass: {
    statement: "In the UK, NICE NG101 sets the dual technique (isotope plus blue dye) for breast cancer. The evidence for blue dye is a higher identification rate without a lower false-negative rate (BMC Cancer 2016), at the cost of rare severe allergic reactions (1.86 per 1,000 needing vasopressors in the 2025 meta-analysis; 9 of 199 culprit agents in NAP6). Safety readiness comes from the product labels: ask about risk factors, have resuscitation ready, observe for at least 60 minutes, and allow for late onset and false pulse oximetry readings. The EANM/SNMMI procedure guideline, which sets injection technique and imaging, could not be read.",
    sources: ["nice-ng101", "blue-dye-meta-2016", "isosulfan-meta-2025", "nap6-epidemiology", "isosulfan-us", "lymphoseek-us"],
  },
  variants: [
    {
      name: "Indocyanine green (ICG) fluorescence instead of blue dye",
      differs: "Uses a fluorescent dye seen with a near-infrared camera, alone or with isotope, avoiding blue dye's allergy risk and tattooing.",
      evidence: "Meta-analysis of 10 studies: ICG equivalent to isotope and superior to dual isotope and blue dye for identification; not yet the NICE standard.",
      sources: ["icg-meta-2020"],
    },
    {
      name: "Isotope alone",
      differs: "Omits blue dye where lymphoscintigraphy shows a node, to avoid dye reactions and staining.",
      evidence: "Dual tracers' advantage was not significant in studies with a high proportion of positive lymphoscintigraphy (OR 1.41, not significant), and dual tracers did not lower the false-negative rate.",
      sources: ["blue-dye-meta-2016"],
    },
    {
      name: "Peritumoral rather than intraparenchymal blue dye injection",
      differs: "Injects isosulfan blue around the tumour rather than into the breast tissue.",
      evidence: "Fewer adverse events (7.04 vs 15.16 per 1,000, p=0.02) in a meta-analysis of observational studies; no dose-response with volume.",
      sources: ["isosulfan-meta-2025"],
    },
  ],
  grades: [
    { claim: "Isosulfan blue hypersensitivity rate", grade: "Case series reported in the label", source: "isosulfan-us", quote: "Hypersensitivity Reactions: Hypersensitivity reactions occur in approximately 2% of patients and include life threatening anaphylactic reactions with respiratory distress, shock, angioedema, urticaria, pruritus." },
    { claim: "Severe reactions to isosulfan blue are uncommon", grade: "Meta-analysis of 8 observational studies, 19,183 patients", source: "isosulfan-meta-2025", quote: "The rate of Grade I reactions was 7.96 per 1,000 (95% CI 4.08-15.46); Grade II 0.08 per 1,000 (95% CI 0.00-1.31), Grade III 1.86 per 1,000 (95% CI 0.94-3.66), with no reported mortalities." },
    { claim: "Patent Blue is a recognised cause of perioperative anaphylaxis, with delayed onset", grade: "National audit, 266 reports (NAP6)", source: "nap6-epidemiology", quote: "Onset was rapid for neuromuscular blocking agents and antibiotics, but delayed with chlorhexidine and Patent Blue dye." },
    { claim: "Adding blue dye raises identification but not the false-negative rate", grade: "Systematic review of 24 prospective studies", source: "blue-dye-meta-2016", quote: "Dual tracers did not significantly lower the false-negative rate compared with radioisotope alone (OR = 0.76, 95% CI 0.44-1.29, P > 0.05)." },
    { claim: "Management of perioperative anaphylaxis could be better", grade: "National audit (NAP6)", source: "nap6-management", quote: "Management of perioperative anaphylaxis could be improved, especially with respect to administration of epinephrine, cardiac compressions, and i.v. fluid." },
  ],
  sources: [
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'perform', 'consider') signals strength, and the year in brackets is when each was written.", read: "full-text", accessed: "2026-11-11" },
    { key: "isosulfan-us", label: "Isosulfan blue injection 1% US prescribing information, DailyMed (Mylan Institutional, version of 25 May 2026)", publisher: "US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0391e544-3633-48df-9f3a-ed16183125b1", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "lymphoseek-us", label: "Lymphoseek (technetium Tc 99m tilmanocept) US prescribing information, DailyMed (version of 2 September 2026)", publisher: "US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=72f31b09-4d7b-475c-b37a-9daf2ad80240", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-11" },
    { key: "nap6-epidemiology", label: "Harper et al., Anaesthesia, surgery, and life-threatening allergic reactions: epidemiology and clinical features of perioperative anaphylaxis in the 6th National Audit Project (NAP6) (Br J Anaesth 2018)", publisher: "Royal College of Anaesthetists (British Journal of Anaesthesia)", year: 2018, url: "https://doi.org/10.1016/j.bja.2018.04.014", doi: "10.1016/j.bja.2018.04.014", gradingScheme: "National audit; no recommendation grade.", read: "abstract", accessed: "2026-11-11" },
    { key: "nap6-management", label: "Harper et al., Anaesthesia, surgery, and life-threatening allergic reactions: management and outcomes in the 6th National Audit Project (NAP6) (Br J Anaesth 2018)", publisher: "Royal College of Anaesthetists (British Journal of Anaesthesia)", year: 2018, url: "https://doi.org/10.1016/j.bja.2018.04.015", doi: "10.1016/j.bja.2018.04.015", gradingScheme: "National audit; no recommendation grade.", read: "abstract", accessed: "2026-11-11" },
    { key: "isosulfan-meta-2025", label: "Adverse Effects of Intraparenchymal and Peritumoral Application of Isosulfan Blue Dye in Sentinel Lymph Node Mapping in Breast Cancer: a systematic review and meta-analysis (Eur J Breast Health 2025)", publisher: "European Journal of Breast Health", year: 2025, url: "https://doi.org/10.4274/ejbh.galenos.2024.2024-8-1", doi: "10.4274/ejbh.galenos.2024.2024-8-1", gradingScheme: "Meta-analysis; no recommendation grade.", read: "full-text", accessed: "2026-11-11" },
    { key: "blue-dye-meta-2016", label: "The combination of blue dye and radioisotope versus radioisotope alone during sentinel lymph node biopsy for breast cancer: a systematic review (BMC Cancer 2016)", publisher: "BMC Cancer", year: 2016, url: "https://doi.org/10.1186/s12885-016-2137-0", doi: "10.1186/s12885-016-2137-0", gradingScheme: "Systematic review; no recommendation grade.", read: "full-text", accessed: "2026-11-11" },
    { key: "icg-meta-2020", label: "Meta-analysis Comparing Fluorescence Imaging with Radioisotope and Blue Dye-Guided Sentinel Node Identification for Breast Cancer Surgery (Ann Surg Oncol 2020)", publisher: "Annals of Surgical Oncology", year: 2020, url: "https://doi.org/10.1245/s10434-020-09288-7", doi: "10.1245/s10434-020-09288-7", gradingScheme: "Meta-analysis; no recommendation grade.", read: "full-text", accessed: "2026-11-11" },
    { key: "eanm-snmmi-2013", label: "The EANM and SNMMI practice guideline for lymphoscintigraphy and sentinel node localization in breast cancer (Eur J Nucl Med Mol Imaging 2013)", publisher: "EANM and SNMMI", year: 2013, url: "https://doi.org/10.1007/s00259-013-2544-2", doi: "10.1007/s00259-013-2544-2", read: "not-reachable", accessed: "2026-11-11" },
  ],
  cancers: [],
  drugs: ["isosulfan-blue", "tilmanocept-tc99m", "technetium-sulfur-colloid", "lidocaine"],
  technologies: ["sentinel-node", "magnetic-sentinel-node-tracer"],
  terms: ["sentinel-lymph-node-biopsy"],
  related: ["surgical-site-infection-prevention"],
  upgrades: ["idea-pu-sentinel-node-without-blue-dye"],
  gaps: [
    "The EANM/SNMMI procedure guideline (2013), which sets tracer dose, injection site and imaging timing, could not be read; injection technique is therefore not given step by step here.",
    "The UK product information for Patent Blue V, the blue dye used in the UK, was not reachable; the safety steps here come from the US isosulfan blue label, a closely related triphenylmethane dye, and from NAP6.",
    "How to treat anaphylaxis once it starts (adrenaline dose and route, fluids, referral for allergy testing) follows resuscitation and anaesthetic guidance not read here.",
    "Methylene blue is used as a cheaper dye in some countries; its safety relative to isosulfan and patent blue rests on a paper whose abstract could not be read here.",
    "Whether ICG or magnetic tracers should replace blue dye in the UK standard has not been settled by NICE in the sources read.",
  ],
});
