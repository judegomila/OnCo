import { protocol } from "./helpers";

/*
 * Preparing for a diagnostic flexible bronchoscopy or EBUS in adults (often to diagnose or stage lung cancer):
 * fasting, blood thinners, sedation, monitoring and aftercare.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - BTS Guideline for diagnostic flexible bronchoscopy in adults (Du Rand et al., Thorax 2013;68 Suppl 1, accredited
 *   by NICE): full text, the PDF served by the British Thoracic Society document library, read with pdftotext. The
 *   summary of recommendations with grades was read in full; the two-column layout interleaves some body text, so
 *   quotes are taken only from the summary where they read unbroken.
 * - BTS Quality Standards for Flexible Bronchoscopy (December 2014): full text, BTS document library PDF.
 * - German Respiratory Society S2k guideline, Safety of diagnostic flexible bronchoscopy in adults (Pneumologie 2026,
 *   10.1055/a-2669-9409): abstract only (in German journal; abstract states scope, not recommendations).
 * - Expert Consensus Statement on Anesthesia Care for Advanced Diagnostic Bronchoscopy (Anesthesia & Analgesia 2026,
 *   10.1213/ane.0000000000008366) and the ESGE/ERS/ESTS endosonography guideline (2015, 10.1183/09031936.00064515):
 *   titles resolved in Europe PMC; no abstract available; not read.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined.
 */
export const diagnosticBronchoscopyAndEbusPreparation = protocol({
  id: "diagnostic-bronchoscopy-and-ebus-preparation",
  name: "Diagnostic flexible bronchoscopy and EBUS: preparation, sedation and aftercare",
  aka: ["bronchoscopy", "flexible bronchoscopy", "EBUS", "EBUS-TBNA", "endobronchial ultrasound", "camera test into the lungs", "bronchoscopy sedation", "bronchoscopy fasting", "transbronchial biopsy"],
  domain: "screening-diagnostics",
  tldr: "A bronchoscopy passes a thin flexible camera into the airways to look and take samples; EBUS adds an ultrasound probe to sample lymph nodes in the chest, often to diagnose or stage lung cancer. You usually stop eating 4 hours before and clear fluids 2 hours before, have a numbing spray and usually sedation, and must not drive for 24 hours. Tell the team about blood thinners.",
  simple: "A thin camera goes into your lungs to take samples. Do not eat for 4 hours before. You can drink water until 2 hours before. You get a numbing spray and usually medicine to make you sleepy. Do not drive for a day afterwards. Tell the team if you take blood thinners. Get help if you are short of breath or cough up a lot of blood.",
  summary: "BTS 2013 (graded A to D, with good practice points) remains the most recent national guideline for diagnostic flexible bronchoscopy in the UK. Before: verbal and written information (Grade C); a staging chest CT before bronchoscopy for suspected lung cancer (Grade D); no food for 4 hours and clear fluids until 2 hours (Grade D); coagulation tests only when there are clinical risk factors (Grade D); clopidogrel stopped 7 days before endobronchial or transbronchial biopsy while low-dose aspirin continues (Grade C), anticoagulants per published guidance; asthma and COPD optimised; ideally a 4-week wait after myocardial infarction. Anticholinergic premedication is not used (Grade A), and antibiotic prophylaxis is not warranted (Grade B).\n\nDuring: intravenous sedation is offered unless contraindicated (Grade B), titrated so verbal contact is possible at all times, with midazolam the preferred drug (Grade B), no more than 5 mg drawn up initially under 70 years and 2 mg over 70, and only 1 mg/ml midazolam stocked; a short-acting opioid such as fentanyl may be added, given first (Grade B for combination). Topical lidocaine (Grade A), at the lowest effective dose with the total recorded. Continuous pulse oximetry (Grade C), oxygen for significant prolonged desaturation (Grade D), intravenous access until discharge, and a safety checklist for every procedure (BTS Quality Standard 2b).\n\nAfter: written information on post-bronchoscopy fever (Grade C) and, after transbronchial biopsy, on delayed complications such as pneumothorax (Grade D), with a chest X-ray if symptoms suggest one; no driving, legal documents or machinery for 24 hours after sedation. For EBUS, BTS quality standards set a staging sensitivity of at least 88% and complications below 1%.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic", "ward"],
  },
  population: "Adults having a diagnostic flexible bronchoscopy, with or without endobronchial or transbronchial biopsy, and EBUS-TBNA, usually as a day case under conscious sedation. Intensive care bronchoscopy, rigid and therapeutic bronchoscopy, children, and general anaesthesia for robotic or navigational bronchoscopy are outside scope.",
  trigger: "A bronchoscopy or EBUS is booked, for example to diagnose or stage suspected lung cancer.",
  steps: [
    {
      action: "Give spoken and written information about why the test is done, what happens and possible complications",
      why: "People who know what to expect tolerate the test better.",
      source: "bts-2013",
      quote: "Verbal and written patient information explaining indications and what to expect during the procedure, and potential complications should be provided to improve patient tolerance.",
      grade: "Grade C",
    },
    {
      action: "Make sure a staging chest CT has been done before bronchoscopy for suspected lung cancer",
      why: "The scan shows where to sample and whether an EBUS of chest lymph nodes is needed at the same visit.",
      source: "bts-2013",
      quote: "A chest CT scan should be performed prior to a diagnostic bronchoscopy in patients with suspected lung cancer.",
      grade: "Grade D",
    },
    {
      action: "Ask the person to have no food for 4 hours and clear fluids only until 2 hours before",
      why: "An empty stomach reduces the risk of vomiting into the lungs under sedation, without the harm of a long fast.",
      source: "bts-2013",
      quote: "It is sufﬁcient for patients to have no food by mouth for 4 h and to allow clear ﬂuids by mouth up to 2 h before bronchoscopy.",
      grade: "Grade D",
    },
    {
      action: "Check clotting, platelets and haemoglobin only when there are clinical risk factors for abnormal clotting",
      why: "Routine blood tests in people without risk factors do not change what happens.",
      source: "bts-2013",
      quote: "Perform coagulation studies, platelet count and haemoglobin concentration when there are clinical risk factors for abnormal coagulation.",
      grade: "Grade D",
    },
    {
      action: "If biopsies are planned, stop clopidogrel 7 days before; low-dose aspirin alone can continue; plan anticoagulants by published guidance",
      why: "Clopidogrel raises bleeding after biopsy of the airway; aspirin on its own adds little.",
      source: "bts-2013",
      quote: "Discontinue clopidogrel 7 days prior to consideration of EBB and TBLB. Low-dose aspirin alone can be continued.",
      grade: "Grade C",
    },
    {
      action: "Do not give routine antibiotics or anticholinergic premedication",
      why: "Neither prevents complications, and anticholinergics may upset heart rate and blood pressure.",
      source: "bts-2013",
      quote: "Antibiotic prophylaxis is not warranted before bronchoscopy for the prevention of endocarditis, fever or pneumonia.",
      grade: "Grade B",
    },
    {
      action: "Offer intravenous sedation unless there is a reason not to, and respect a preference to go without",
      why: "Sedation makes the test easier for most people; some prefer to stay fully awake and manage well.",
      source: "bts-2013",
      quote: "Intravenous sedation should be offered to patients undergoing bronchoscopy, provided there are no contraindications.",
      grade: "Grade B",
    },
    {
      action: "Use midazolam titrated so the person can always talk; draw up no more than 5 mg at first (2 mg over 70) and stock only 1 mg/ml strength",
      why: "Small, measured doses avoid accidental oversedation, which has caused deaths.",
      source: "bts-2013",
      quote: "Intravenous midazolam is the preferred drug for sedation, having a rapid onset of action, being titratable to provide the required depth of sedation, and being reversible.",
      grade: "Grade B",
    },
    {
      action: "Spray the throat and airways with lidocaine at the lowest dose that controls coughing, and record the total given",
      why: "Numbing the airway stops coughing; too much lidocaine can be toxic.",
      source: "bts-2013",
      quote: "Lidocaine should be used for topical anaesthesia during bronchoscopy, unless contraindicated.",
      grade: "Grade A",
    },
    {
      action: "Monitor oxygen saturation continuously, record heart rate, breathing rate and blood pressure before, during and after, and keep intravenous access until discharge",
      why: "Oxygen levels often dip during the test and sedation can slow breathing, so problems are caught early.",
      source: "bts-2013",
      quote: "Patients should be monitored by continuous pulse oximetry during bronchoscopy.",
      grade: "Grade C",
    },
    {
      action: "Apply the unit's safety checklist for every procedure",
      why: "A checklist catches the wrong patient, missing consent or a missed allergy before the test starts.",
      source: "bts-qs-2014",
      quote: "All units have a clearly defined safety checklist which is applied for each procedure.",
      grade: "Quality statement (ungraded)",
    },
    {
      action: "Give written advice about fever after bronchoscopy and, after a lung biopsy, about delayed complications such as a collapsed lung; X-ray if symptoms suggest it",
      why: "A short fever is common and settles; breathlessness or chest pain after a biopsy can mean air has leaked and needs checking.",
      source: "bts-2013",
      quote: "Patients should be advised of the potential for delayed complications following TBLB and provided with written information regarding likely symptoms and action required.",
      grade: "Grade D",
    },
    {
      action: "After sedation, advise no driving, no legal documents and no machinery for 24 hours",
      why: "Sedatives slow reactions and judgement for longer than people feel.",
      source: "bts-2013",
      quote: "Patients who had sedation should be advised not to drive, sign legally binding documents or operate machinery for 24 h after the procedure.",
      grade: "Good practice point",
    },
  ],
  bestInClass: {
    statement: "BTS 2013, the most recent national guideline read: information beforehand (Grade C), staging CT first in suspected lung cancer (Grade D), 4 hours without food and clear fluids to 2 hours (Grade D), clopidogrel stopped 7 days before biopsy with aspirin continued (Grade C), no antibiotic (Grade B) or anticholinergic (Grade A) premedication, offered intravenous sedation (Grade B) with titrated low-strength midazolam (Grade B) and topical lidocaine (Grade A), continuous oximetry (Grade C), written aftercare advice and 24 hours without driving after sedation. BTS quality standards (2014) add a safety checklist for each procedure and, for EBUS, staging sensitivity of at least 88% with complications below 1%. The 2013 guideline is now old: its anticoagulant appendix predates current endoscopy guidance on direct oral anticoagulants, and propofol and general anaesthesia are increasingly used for EBUS and robotic bronchoscopy, which newer German (2026) and United States anaesthesia (2026) statements address but could not be read here.",
    sources: ["bts-2013", "bts-qs-2014"],
  },
  variants: [
    {
      name: "Unsedated bronchoscopy",
      differs: "Topical anaesthesia only, without intravenous sedation.",
      evidence: "BTS: some patients tolerate unsedated bronchoscopy well and their preference should be sought (Grade B).",
      sources: ["bts-2013"],
    },
    {
      name: "Propofol or general anaesthesia (advanced bronchoscopy, EBUS, robotic bronchoscopy)",
      differs: "Deeper sedation or general anaesthesia given by an anaesthetist instead of midazolam with an opioid.",
      evidence: "BTS 2013: propofol has similar efficacy to midazolam but should be given only by practitioners trained in it, such as anaesthetists, because of its narrow therapeutic window (Grade B). A 2026 multisociety United States consensus on anaesthesia for advanced diagnostic bronchoscopy exists but had no abstract available.",
      sources: ["bts-2013", "anesthesia-consensus-2026"],
    },
    {
      name: "German Respiratory Society S2k guideline (2026)",
      differs: "Covers indications, preparation, execution, hygiene and aftercare for Germany, Austria and Switzerland.",
      evidence: "Only the abstract, which states scope and not recommendations, was reachable.",
      sources: ["dgp-s2k-2026"],
    },
  ],
  grades: [
    { claim: "Anticholinergic premedication not routinely used", grade: "Grade A", source: "bts-2013", quote: "Anticholinergics (glycopyrrolate or atropine) should not routinely be used prior to bronchoscopy due to a lack of clinical beneﬁt and a possible increased risk of haemodynamic changes." },
    { claim: "Oxygen when desaturation is significant and prolonged", grade: "Grade D", source: "bts-2013", quote: "Oxygen supplementation should be used when desaturation is signiﬁcant (pulse oximeter oxygen saturation (SpO2)>4% change, or SpO2<90%) and prolonged (>1 min) to reduce the risk of hypoxaemia-related complications." },
    { claim: "Limit midazolam drawn up before the procedure", grade: "Grade D", source: "bts-2013", quote: "No more than 5 mg midazolam should be initially drawn up into any syringe prior to bronchoscopy for patients under the age of 70 (2 mg midazolam for patients over 70) to prevent potential inadvertent oversedation associated with the practice of routinely drawing up 10 mg midazolam." },
    { claim: "Combination opioid and midazolam sedation", grade: "Grade B", source: "bts-2013", quote: "Combination opioid and midazolam sedation should be considered in patients to improve bronchoscopic tolerance." },
    { claim: "Written information on post-bronchoscopy fever", grade: "Grade C", source: "bts-2013", quote: "Patients should receive written information regarding post-bronchoscopy fever (PBF) and appropriate management advice." },
    { claim: "Delay bronchoscopy for 4 weeks after a heart attack where possible", grade: "Grade D", source: "bts-2013", quote: "FB should ideally be delayed for 4 weeks after MI." },
    { claim: "EBUS-TBNA complications recorded and below 1%", grade: "Quality statement (ungraded)", source: "bts-qs-2014", quote: "EBUS-TBNA Complication rates be recorded and audited to be <1%" },
  ],
  sources: [
    {
      key: "bts-2013",
      label: "British Thoracic Society guideline for diagnostic flexible bronchoscopy in adults (accredited by NICE)",
      publisher: "British Thoracic Society (Du Rand et al., Thorax 2013;68 Suppl 1)",
      year: 2013,
      url: "https://www.brit-thoracic.org.uk/document-library/guidelines/bronchoscopy/bts-guideline-for-diagnostic-flexible-bronchoscopy-in-adults/",
      doi: "10.1136/thoraxjnl-2013-203618",
      gradingScheme: "SIGN-based: evidence levels 1++ to 4; recommendations Grade A to D, and good practice points (√) for best practice without evidence.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "bts-qs-2014",
      label: "BTS Quality Standards for Flexible Bronchoscopy (December 2014)",
      publisher: "British Thoracic Society",
      year: 2014,
      url: "https://www.brit-thoracic.org.uk/document-library/quality-standards/flexible-bronchoscopy/bts-quality-standards-for-flexible-bronchoscopy/",
      gradingScheme: "Quality statements with measures; not graded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "dgp-s2k-2026",
      label: "Safety of diagnostic flexible bronchoscopy in adults: S2k guideline of the German Respiratory Society",
      publisher: "German Respiratory Society (Deutsche Gesellschaft für Pneumologie und Beatmungsmedizin), Pneumologie",
      year: 2026,
      url: "https://doi.org/10.1055/a-2669-9409",
      doi: "10.1055/a-2669-9409",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "anesthesia-consensus-2026",
      label: "Expert Consensus Statement on Anesthesia Care for Advanced Diagnostic Bronchoscopy (Society for Airway Management, Society for Head and Neck Anesthesia, Society for Ambulatory Anesthesia, American Association for Bronchology and Interventional Pulmonology)",
      publisher: "Anesthesia & Analgesia",
      year: 2026,
      url: "https://doi.org/10.1213/ane.0000000000008366",
      doi: "10.1213/ane.0000000000008366",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["robotic-bronchoscopy"],
  drugs: ["midazolam", "propofol", "lidocaine", "glycopyrronium"],
  cancers: ["lung-cancer"],
  terms: ["bronchoscopy", "ebus-tbna"],
  related: ["anticoagulants-and-antiplatelets-before-endoscopy"],
  upgrades: [],
  gaps: [
    "The BTS diagnostic bronchoscopy guideline dates from 2013 and is no longer listed on the BTS guidelines page, though the BTS document library still serves it; no newer UK guideline was found. Its anticoagulant appendix predates current guidance on direct oral anticoagulants (see the endoscopy anticoagulant protocol).",
    "The German S2k guideline (2026) was read as an abstract only, and the 2026 United States anaesthesia consensus and the 2015 ESGE/ERS/ESTS endosonography guideline had no abstract available; their recommendations are not on this page.",
    "EBUS-specific preparation (sedation depth, number of needle passes, rapid on-site evaluation) is drawn here only from the BTS quality standards; the BTS 2011 advanced bronchoscopy guideline was downloaded but not read for this page.",
    "The fasting interval of 4 hours for food is a Grade D recommendation, shorter than many units' local policies of 6 hours; no source read compared them.",
  ],
});
