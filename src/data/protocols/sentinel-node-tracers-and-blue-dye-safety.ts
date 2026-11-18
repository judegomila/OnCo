import { protocol } from "./helpers";

/*
 * Injecting the tracers that find the sentinel lymph node (radioisotope, blue dye, and the alternatives), and being
 * ready for the rare severe allergic reaction to blue dye.
 *
 * What was read, and how (first on 11 November 2026, fetched raw into a scratch directory and read as text):
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
 *
 * Second accuracy pass, 17 November 2026. Every readable source was fetched again as raw text and each claim re-read
 * against it: the NICE NG101 recommendations page (plain curl; last updated 14 April 2025, 1.4.10 still dated 2009),
 * both DailyMed labels (SPL XML from the DailyMed web service; isosulfan blue version 2, published 25 May 2026 and
 * revised 12/2025; Lymphoseek version 8, published 2 September 2026), the two NAP6 abstracts (Europe PMC REST), and
 * the three meta-analyses (Europe PMC full-text XML). Every quote was checked by script after stripping tags and
 * normalising whitespace only. Two quotes had their dashes and spacing restored to the source's own characters and
 * one was replaced with the label sentence that names case series. Changed: the 60-minute watch, the pulse oximetry
 * times and the syringe rule are now scoped to isosulfan blue and the US label, the late onset is attributed to
 * NAP6 (Patent Blue) rather than the label, the blood gas is "may be needed" as the label says, and reasons no
 * source gives were removed. Retried once each and still not readable: the EANM/SNMMI 2013 guideline (the
 * publisher answers with a browser challenge and the society's site has no copy at the address tried), the NAP6
 * report site (403) and the emc search page (no product text).
 */
export const sentinelNodeTracersAndBlueDyeSafety = protocol({
  id: "sentinel-node-tracers-and-blue-dye-safety",
  name: "Sentinel node tracers and blue dye: injection, allergic reaction readiness and aftercare",
  aka: ["sentinel lymph node mapping tracer", "blue dye anaphylaxis", "isosulfan blue reaction", "patent blue anaphylaxis", "dual technique sentinel node biopsy", "lymphatic mapping dye safety"],
  domain: "surgery-perioperative",
  tldr: "To find the sentinel lymph node, a radioactive tracer and often a blue dye are injected. Severe allergic reactions to the blue dye are rare (about 2 in 1,000 in a pooled study of 19,183 patients) but can come on late, so the team asks about allergies first and watches you closely afterwards. Your urine may be blue for a day and the skin can stay blue-stained for a long time.",
  simple: "Tell the team about any allergy, asthma, or reaction to a medicine, a dye or dextran. After the blue dye you are watched closely; the US label for isosulfan blue says for at least 60 minutes. Blue urine for a day is expected.",
  summary: "NICE NG101 tells UK breast teams to perform SLNB 'using the dual technique with isotope and blue dye' (2009 recommendation, unchanged in the guideline last updated in April 2025). In a systematic review of 24 prospective studies, adding blue dye to isotope raised the identification rate (OR 2.03) but did not lower the false-negative rate. Isosulfan blue (US label): hypersensitivity in about 2%, with life-threatening anaphylaxis possible; reactions are more likely with asthma, allergies, drug reactions or a previous reaction to triphenylmethane dyes; monitor closely for at least 60 minutes with trained staff available for emergency care including resuscitation; do not mix with lidocaine in the same syringe; pulse oximetry can read falsely low (maximal at 30 minutes, generally minimal by 4 hours). A 2025 meta-analysis (8 studies, 19,183 breast patients) found 11.65 adverse events per 1,000 and 1.86 per 1,000 needing vasopressors, with no deaths; intraparenchymal injection had more events than peritumoral. NAP6 (UK, 266 severe perioperative anaphylaxis cases) identified Patent Blue as the culprit in 9 of 199, with delayed onset compared with antibiotics and neuromuscular blockers. Technetium tilmanocept (US label): ask about dextran reactions and have resuscitation equipment and trained staff immediately available. Indocyanine green fluorescence was equivalent to isotope and superior to dual isotope and blue dye for identification in a 2020 meta-analysis.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "radiographer", "nurse", "patient-or-carer"],
    where: ["theatre", "outpatient-clinic", "ward"],
  },
  population: "People having sentinel lymph node biopsy. The guideline and the three reviews read are about breast cancer. The US tilmanocept label also covers melanoma and squamous cell cancer of the mouth, and lymphatic mapping of other solid tumours from one month of age; the US isosulfan blue label says safety and effectiveness in children have not been established. Tracer choice and injection site are set by the team.",
  trigger: "A planned sentinel lymph node biopsy.",
  steps: [
    {
      action: "For early breast cancer, use the dual technique: radioisotope plus blue dye (UK, NICE)",
      why: "NICE gives no reason beside the recommendation. A separate review of 24 studies found that the two tracers together identified the sentinel node more often than isotope alone.",
      source: "nice-ng101",
      quote: "Perform SLNB using the dual technique with isotope and blue dye. [2009]",
      grade: "Not graded (NICE NG101 1.4.10, 'perform', 2009)",
    },
    {
      action: "Before injecting isosulfan blue, ask about asthma, allergies, previous drug reactions and any earlier reaction to a triphenylmethane (blue) dye",
      why: "Allergic reactions to the dye are more likely in these people, and the label rules the dye out for anyone known to be hypersensitive to this family of dyes.",
      source: "isosulfan-us",
      quote: "Reactions are more likely to occur in patients with a history of bronchial asthma, allergies, drug reactions or previous reactions to tri-phenylmethane dyes.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Before a tilmanocept (Lymphoseek) injection, ask about earlier reactions to medicines, especially dextran or modified forms of it such as iron dextran",
      why: "The label says this tracer may carry a risk of allergic reactions because it is chemically similar to dextran, which has been linked to serious ones.",
      source: "lymphoseek-us",
      quote: "Before administering Lymphoseek, ask patients about prior hypersensitivity reactions to drugs, especially to dextran and modified forms of dextran.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Have resuscitation equipment and staff trained to use it immediately available when tilmanocept is injected",
      why: "The tilmanocept label asks for this because of the possible allergic reaction. The isosulfan blue label likewise says trained staff should be available to give emergency care including resuscitation.",
      source: "lymphoseek-us",
      quote: "Have resuscitation equipment and trained personnel immediately available at the time of Lymphoseek administration.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Draw up isosulfan blue in its own syringe, never mixed with a local anaesthetic such as lidocaine",
      why: "Mixed in one syringe, part of the dye comes out of solution at once.",
      source: "isosulfan-us",
      quote: "The admixture of isosulfan blue injection 1% (with local anesthetics (i.e. lidocaine)) in the same syringe results in an immediate precipitation of 4% to 9% drug complex. Use a separate syringe to administer a local anesthetic.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Watch the patient closely for at least 60 minutes after isosulfan blue (US label)",
      why: "Life-threatening allergic reactions have happened after this dye. The UK audit NAP6 found that reactions to Patent Blue dye came on later than reactions to antibiotics or muscle relaxants.",
      source: "isosulfan-us",
      quote: "Monitor patients closely for at least 60 minutes after administration of isosulfan blue injection 1%. Trained personnel should be available to administer emergency care including resuscitation.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Expect pulse oximetry to read falsely low after isosulfan blue; an arterial blood gas may be needed to check a low reading",
      why: "The dye interferes with the oxygen reading from the probe, most at 30 minutes and generally little by 4 hours.",
      source: "isosulfan-us",
      quote: "Isosulfan blue injection 1% interferes with measurements of oxygen saturation in peripheral blood by pulse oximetry and can cause falsely low readings. The interference effect is maximal at 30 minutes and minimal generally by 4 hours after administration.",
      grade: "Label warning (no grade)",
    },
    {
      action: "Tell the patient their urine may be blue for 24 hours and that the skin can be stained blue",
      why: "Knowing in advance prevents alarm; the label lists skin colouring that is short-lived or long-term, like a tattoo.",
      source: "isosulfan-us",
      quote: "Inform patients that urine color may be blue for 24 hours following administration of isosulfan blue injection 1%.",
      grade: "Label instruction (no grade)",
    },
  ],
  bestInClass: {
    statement: "In the UK, NICE NG101 sets the dual technique (isotope plus blue dye) for breast cancer. The evidence for blue dye is a higher identification rate without a lower false-negative rate (BMC Cancer 2016), at the cost of rare severe allergic reactions (1.86 per 1,000 needing vasopressors in the 2025 meta-analysis of isosulfan blue; Patent Blue was 9 of 199 identified culprit agents in NAP6). Safety readiness comes from the US product labels: ask about risk factors, have resuscitation ready, observe closely for at least 60 minutes after isosulfan blue and allow for false pulse oximetry readings; NAP6 adds that onset with Patent Blue was delayed. The EANM/SNMMI procedure guideline, which sets injection technique and imaging, could not be read.",
    sources: ["nice-ng101", "blue-dye-meta-2016", "isosulfan-meta-2025", "nap6-epidemiology", "isosulfan-us", "lymphoseek-us"],
  },
  variants: [
    {
      name: "Indocyanine green (ICG) fluorescence instead of blue dye",
      differs: "Uses a fluorescent dye and fluorescence imaging to find the node. The review lists allergic reactions and skin tattooing among the complications of the conventional methods.",
      evidence: "Meta-analysis of 10 studies: ICG equivalent to isotope, superior to blue dye, and superior to dual isotope and blue dye for identification; NICE NG101 still recommends the dual technique.",
      sources: ["icg-meta-2020"],
    },
    {
      name: "Isotope alone",
      differs: "Omits blue dye, which avoids dye reactions and staining.",
      evidence: "Dual tracers' advantage was not significant in studies with a high proportion of positive lymphoscintigraphy (OR 1.41, not significant) or after neoadjuvant chemotherapy (OR 1.64, not significant), and dual tracers did not lower the false-negative rate.",
      sources: ["blue-dye-meta-2016"],
    },
    {
      name: "Peritumoral rather than intraparenchymal blue dye injection",
      differs: "Gives isosulfan blue by the route the review calls peritumoral rather than the one it calls intraparenchymal.",
      evidence: "Fewer adverse events (7.04 vs 15.16 per 1,000, p=0.02) in a meta-analysis of eight studies; no significant association between the volume of dye and adverse events.",
      sources: ["isosulfan-meta-2025"],
    },
  ],
  grades: [
    { claim: "Isosulfan blue hypersensitivity rate", grade: "Case series reported in the label", source: "isosulfan-us", quote: "Hypersensitivity Reactions: Case series report an overall incidence of hypersensitivity reactions in approximately 2% of patients." },
    { claim: "Severe reactions to isosulfan blue are uncommon", grade: "Meta-analysis of 8 studies, 19,183 patients", source: "isosulfan-meta-2025", quote: "The rate of Grade I reactions was 7.96 per 1,000 (95% CI 4.08-15.46); Grade II 0.08 per 1,000 (95% CI 0.00–1.31), Grade III 1.86 per 1,000 (95% CI 0.94–3.66), with no reported mortalities." },
    { claim: "Patent Blue is a recognised cause of perioperative anaphylaxis, with delayed onset", grade: "National audit, 266 reports (NAP6)", source: "nap6-epidemiology", quote: "Onset was rapid for neuromuscular blocking agents and antibiotics, but delayed with chlorhexidine and Patent Blue dye." },
    { claim: "Adding blue dye raises identification but not the false-negative rate", grade: "Systematic review of 24 prospective studies", source: "blue-dye-meta-2016", quote: "Dual tracers did not significantly lower the false-negative rate compared with radioisotope alone (OR = 0.76, 95 % CI 0.44–1.29, P > 0.05)." },
    { claim: "Management of perioperative anaphylaxis could be better", grade: "National audit (NAP6)", source: "nap6-management", quote: "Management of perioperative anaphylaxis could be improved, especially with respect to administration of epinephrine, cardiac compressions, and i.v. fluid." },
  ],
  sources: [
    { key: "nice-ng101", label: "Early and locally advanced breast cancer: diagnosis and management (NG101), recommendations (published 2018, last updated 14 April 2025)", publisher: "NICE", year: 2018, url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the wording ('offer', 'perform', 'consider') signals strength, and the year in brackets is when each was written.", read: "full-text", accessed: "2026-11-17" },
    { key: "isosulfan-us", label: "Isosulfan blue injection 1% US prescribing information, DailyMed (Mylan Institutional, version of 25 May 2026)", publisher: "US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0391e544-3633-48df-9f3a-ed16183125b1", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "lymphoseek-us", label: "Lymphoseek (technetium Tc 99m tilmanocept) US prescribing information, DailyMed (version of 2 September 2026)", publisher: "US FDA (DailyMed)", year: 2026, url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=72f31b09-4d7b-475c-b37a-9daf2ad80240", gradingScheme: "Regulatory label; no grading.", read: "full-text", accessed: "2026-11-17" },
    { key: "nap6-epidemiology", label: "Harper et al., Anaesthesia, surgery, and life-threatening allergic reactions: epidemiology and clinical features of perioperative anaphylaxis in the 6th National Audit Project (NAP6) (Br J Anaesth 2018)", publisher: "Royal College of Anaesthetists (British Journal of Anaesthesia)", year: 2018, url: "https://doi.org/10.1016/j.bja.2018.04.014", doi: "10.1016/j.bja.2018.04.014", gradingScheme: "National audit; no recommendation grade.", read: "abstract", accessed: "2026-11-17" },
    { key: "nap6-management", label: "Harper et al., Anaesthesia, surgery, and life-threatening allergic reactions: management and outcomes in the 6th National Audit Project (NAP6) (Br J Anaesth 2018)", publisher: "Royal College of Anaesthetists (British Journal of Anaesthesia)", year: 2018, url: "https://doi.org/10.1016/j.bja.2018.04.015", doi: "10.1016/j.bja.2018.04.015", gradingScheme: "National audit; no recommendation grade.", read: "abstract", accessed: "2026-11-17" },
    { key: "isosulfan-meta-2025", label: "Adverse Effects of Intraparenchymal and Peritumoral Application of Isosulfan Blue Dye in Sentinel Lymph Node Mapping in Breast Cancer: a systematic review and meta-analysis (Eur J Breast Health 2025)", publisher: "European Journal of Breast Health", year: 2025, url: "https://doi.org/10.4274/ejbh.galenos.2024.2024-8-1", doi: "10.4274/ejbh.galenos.2024.2024-8-1", gradingScheme: "Meta-analysis; no recommendation grade.", read: "full-text", accessed: "2026-11-17" },
    { key: "blue-dye-meta-2016", label: "The combination of blue dye and radioisotope versus radioisotope alone during sentinel lymph node biopsy for breast cancer: a systematic review (BMC Cancer 2016)", publisher: "BMC Cancer", year: 2016, url: "https://doi.org/10.1186/s12885-016-2137-0", doi: "10.1186/s12885-016-2137-0", gradingScheme: "Systematic review; no recommendation grade.", read: "full-text", accessed: "2026-11-17" },
    { key: "icg-meta-2020", label: "Meta-analysis Comparing Fluorescence Imaging with Radioisotope and Blue Dye-Guided Sentinel Node Identification for Breast Cancer Surgery (Ann Surg Oncol, published online 2020, in the July 2021 issue)", publisher: "Annals of Surgical Oncology", year: 2020, url: "https://doi.org/10.1245/s10434-020-09288-7", doi: "10.1245/s10434-020-09288-7", gradingScheme: "Meta-analysis; no recommendation grade.", read: "full-text", accessed: "2026-11-17" },
    { key: "eanm-snmmi-2013", label: "The EANM and SNMMI practice guideline for lymphoscintigraphy and sentinel node localization in breast cancer (Eur J Nucl Med Mol Imaging 2013)", publisher: "EANM and SNMMI", year: 2013, url: "https://doi.org/10.1007/s00259-013-2544-2", doi: "10.1007/s00259-013-2544-2", read: "not-reachable", accessed: "2026-11-17" },
  ],
  cancers: [],
  drugs: ["isosulfan-blue", "tilmanocept-tc99m", "technetium-sulfur-colloid", "lidocaine"],
  technologies: ["sentinel-node", "magnetic-sentinel-node-tracer"],
  terms: ["sentinel-lymph-node-biopsy"],
  related: ["surgical-site-infection-prevention"],
  upgrades: ["idea-pu-sentinel-node-without-blue-dye"],
  gaps: [
    "The EANM/SNMMI procedure guideline (2013), which sets tracer dose, injection site and imaging timing, could not be read; injection technique is therefore not given step by step here. On 17 November 2026 it was tried again: the publisher answered with a browser challenge, and no open copy was found.",
    "The UK product information for Patent Blue V, the blue dye named in the UK audit NAP6, was not reachable (tried again on 17 November 2026). The 60-minute watch, the pulse oximetry times and the separate-syringe rule here come from the US isosulfan blue label and are that label's rules for that dye; no source read says whether the same figures apply to Patent Blue.",
    "The late onset of reactions to Patent Blue rests on the NAP6 abstract, which gives no time in minutes; the full NAP6 report could not be read (403 again on 17 November 2026).",
    "How to treat anaphylaxis once it starts (adrenaline dose and route, fluids, referral for allergy testing) follows resuscitation and anaesthetic guidance not read here.",
    "Methylene blue is used as a dye in some centres; its safety relative to isosulfan and patent blue rests on a paper whose abstract could not be read here.",
    "Whether ICG or magnetic tracers should replace blue dye in the UK standard has not been settled by NICE in the sources read.",
    "The sources read are about breast cancer, apart from the tilmanocept label. Tracer practice for melanoma and for vulval, cervical, endometrial and penile cancers was not read.",
  ],
});
