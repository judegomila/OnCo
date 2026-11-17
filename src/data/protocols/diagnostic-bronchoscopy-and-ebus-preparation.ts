import { protocol } from "./helpers";

/*
 * Preparing for a diagnostic flexible bronchoscopy or EBUS in adults (often to diagnose or stage lung cancer):
 * fasting, blood thinners, sedation, monitoring and aftercare.
 *
 * First written 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text and each claim, quote and grade was re-read against it; quotes were checked by script.
 * - BTS Guideline for diagnostic flexible bronchoscopy in adults (Du Rand et al., Thorax 2013;68 Suppl 1, accredited
 *   by NICE): full text, the PDF served by the British Thoracic Society document library, read with pdftotext. The
 *   summary of recommendations, the evidence statements and the body text behind each step were read. Appendix 5
 *   (safety checklist), appendix 7 (warfarin and clopidogrel algorithm) and appendix 13 (patient leaflet) are images
 *   or links in the PDF and were not read. The guideline says it "will be reviewed within 5 years from the date of
 *   publication (2018)"; no newer edition is listed by BTS, Crossref or Europe PMC.
 * - BTS Quality Standards for Flexible Bronchoscopy (December 2014): full text, BTS document library PDF.
 * - Cancer Research UK, Bronchoscopy (patient page, last reviewed 30 May 2025): the page, fetched with curl and
 *   stripped of tags. Added on 17 November 2026 as the source for which symptoms to report after the test.
 * - German Respiratory Society S2k guideline, Safety of diagnostic flexible bronchoscopy in adults (Pneumologie 2026,
 *   10.1055/a-2669-9409): English abstract only, from Europe PMC (the article is in German and behind a subscription;
 *   the abstract states scope, not recommendations).
 * - Expert Consensus Statement on Anesthesia Care for Advanced Diagnostic Bronchoscopy (Anesthesia & Analgesia 2026,
 *   10.1213/ane.0000000000008366) and the ESGE/ERS/ESTS endosonography guideline (2015, 10.1183/09031936.00064515):
 *   titles resolved in Crossref and Europe PMC; subscription only, no abstract; not read.
 *
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined.
 */
export const diagnosticBronchoscopyAndEbusPreparation = protocol({
  id: "diagnostic-bronchoscopy-and-ebus-preparation",
  name: "Diagnostic flexible bronchoscopy and EBUS: preparation, sedation and aftercare",
  aka: ["bronchoscopy", "flexible bronchoscopy", "EBUS", "EBUS-TBNA", "endobronchial ultrasound", "camera test into the lungs", "bronchoscopy sedation", "bronchoscopy fasting", "transbronchial biopsy"],
  domain: "screening-diagnostics",
  tldr: "A bronchoscopy passes a thin camera into the airways to look and take samples; EBUS adds an ultrasound probe to sample lymph nodes, often to diagnose or stage lung cancer. UK guidance says no food for 4 hours and clear fluids until 2 hours before is enough. You have a numbing spray and are offered sedation, and should not drive for 24 hours after sedation. Tell the team about blood thinners.",
  simple: "A thin camera goes into your lungs to take samples. UK guidance says no food for 4 hours before, and clear drinks until 2 hours before. Follow the instructions your own unit gives you. You get a numbing spray and are offered medicine to make you sleepy. Do not drive for a day after that medicine. Tell the team if you take blood thinners. At home, contact a doctor or the hospital advice line straight away if you become short of breath or have chest pain, and contact the advice line if blood in your spit does not go away or gets worse.",
  summary: "BTS 2013 (graded A to D, with good practice points) is the most recent UK guideline for diagnostic flexible bronchoscopy found; BTS planned to review it in 2018. Before: verbal and written information (Grade C); a chest CT before bronchoscopy for suspected lung cancer (Grade D; the 2014 BTS quality standards ask for a staging CT); no food for 4 hours and clear fluids until 2 hours is sufficient (Grade D); coagulation studies, platelet count and haemoglobin when there are clinical risk factors for abnormal coagulation (Grade D); lavage can be done with a platelet count above 20,000 per microlitre, with haematology advice on platelet transfusion if a biopsy is planned (Grade D); clopidogrel stopped 7 days before endobronchial or transbronchial biopsy while low-dose aspirin alone continues (Grade C), anticoagulants managed by the published guidance in the guideline's appendix 7 (good practice point); asthma (Grade C) and COPD (Grade D) optimised; ideally a 4-week wait after myocardial infarction (Grade D). Anticholinergic premedication is not routinely used (Grade A), and antibiotic prophylaxis is not warranted (Grade B).\n\nDuring: intravenous sedation is offered unless contraindicated (Grade B), titrated (Grade B) so verbal contact is possible at all times (Grade D), with midazolam the preferred drug (Grade B), no more than 5 mg drawn up initially under 70 years and 2 mg over 70 (Grade D), and only 1 mg/mL midazolam stocked (Grade D); combining it with an opioid should be considered (Grade B), using a short-acting opioid such as fentanyl or alfentanil, given first (Grade D). Topical lidocaine (Grade A), as 1% solution for spray-as-you-go (Grade A), at the lowest dose that prevents excessive coughing (Grade D) with the total recorded (good practice point); the recommendations set no fixed maximum, and the evidence statement notes symptoms of toxicity in studies using 9.6 mg/kg or more. Heart rate, respiratory rate, blood pressure and oxygen saturation recorded before, during and after (Grade D), continuous pulse oximetry (Grade C), oxygen when desaturation is significant (a change of more than 4%, or below 90%) and lasts more than 1 minute (Grade D), intravenous access until discharge (good practice point), and a safety checklist for every procedure (BTS Quality Standard 2b).\n\nAfter: written information on post-bronchoscopy fever (Grade C) and, after transbronchial biopsy, on delayed complications (Grade D), with a chest X-ray if the person has symptoms or a pneumothorax is suspected (Grade D); no driving, legal documents or machinery for 24 hours after sedation (good practice point). For EBUS, BTS quality standards set a staging sensitivity of at least 88% and complication rates audited to be below 1%.",
  asOf: "2026-11-17",
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
      action: "Make sure a chest CT has been done before bronchoscopy for suspected lung cancer",
      why: "The BTS quality standards say the scan directs where to sample and helps decide whether EBUS should be the first test.",
      source: "bts-2013",
      quote: "A chest CT scan should be performed prior to a diagnostic bronchoscopy in patients with suspected lung cancer.",
      grade: "Grade D",
    },
    {
      action: "Ask the person to have no food for 4 hours and clear fluids only until 2 hours before",
      why: "The guideline found no evidence of more harm with these times and none to support a longer fast.",
      source: "bts-2013",
      quote: "It is sufﬁcient for patients to have no food by mouth for 4 h and to allow clear ﬂuids by mouth up to 2 h before bronchoscopy.",
      grade: "Grade D",
    },
    {
      action: "Check clotting, platelets and haemoglobin when there are clinical risk factors for abnormal clotting",
      why: "Done routinely, these tests do not predict who will bleed or how much.",
      source: "bts-2013",
      quote: "Perform coagulation studies, platelet count and haemoglobin concentration when there are clinical risk factors for abnormal coagulation.",
      grade: "Grade D",
    },
    {
      action: "If biopsies are planned, stop clopidogrel 7 days before; low-dose aspirin alone can continue; plan anticoagulants by published guidance",
      why: "Clopidogrel caused bleeding, from mild to severe, when lung biopsies were taken through the bronchoscope.",
      source: "bts-2013",
      quote: "Discontinue clopidogrel 7 days prior to consideration of EBB and TBLB. Low-dose aspirin alone can be continued.",
      grade: "Grade C",
    },
    {
      action: "Do not give routine antibiotics or anticholinergic premedication",
      why: "Antibiotics do not prevent fever or pneumonia after the test; anticholinergics show no clinical benefit and may affect the circulation.",
      source: "bts-2013",
      quote: "Antibiotic prophylaxis is not warranted before bronchoscopy for the prevention of endocarditis, fever or pneumonia.",
      grade: "Grade B (antibiotics); Grade A (anticholinergics)",
    },
    {
      action: "Offer intravenous sedation unless there is a reason not to, and respect a preference to go without",
      why: "Patients and doctors usually prefer sedation, and people offered it tolerate the test better; some manage well without.",
      source: "bts-2013",
      quote: "Intravenous sedation should be offered to patients undergoing bronchoscopy, provided there are no contraindications.",
      grade: "Grade B",
    },
    {
      action: "Use midazolam as the preferred sedative, titrated so the person can always talk; draw up no more than 5 mg at first for people under 70 (2 mg over 70) and stock only the 1 mg/mL strength",
      why: "These limits are there to prevent accidental oversedation; a 2008 national safety report described harm and deaths from excessive doses of midazolam.",
      source: "bts-2013",
      quote: "Intravenous midazolam is the preferred drug for sedation, having a rapid onset of action, being titratable to provide the required depth of sedation, and being reversible.",
      grade: "Grade B (midazolam preferred, titration); Grade D (depth of sedation, 5 mg and 2 mg limit, 1 mg/mL strength)",
    },
    {
      action: "Numb the airways with lidocaine at the lowest dose that prevents excessive coughing, and record the total given",
      why: "Lidocaine keeps coughing down and the person comfortable; high doses can cause toxicity, and people absorb it very differently.",
      source: "bts-2013",
      quote: "Lidocaine should be used for topical anaesthesia during bronchoscopy, unless contraindicated.",
      grade: "Grade A (use of lidocaine); Grade D (lowest dose); good practice point (recording the total)",
    },
    {
      action: "Monitor oxygen saturation continuously, record heart rate, breathing rate and blood pressure before, during and after, and keep intravenous access until discharge",
      why: "Falls in oxygen level are common during the test, starting when sedation is given.",
      source: "bts-2013",
      quote: "Patients should be monitored by continuous pulse oximetry during bronchoscopy.",
      grade: "Grade C (continuous oximetry); Grade D (recording vital signs); good practice point (intravenous access)",
    },
    {
      action: "Apply the unit's safety checklist for every procedure",
      why: "The checklist makes the safety checks a standard part of every bronchoscopy and aims to reduce avoidable complications.",
      source: "bts-qs-2014",
      quote: "All units have a clearly defined safety checklist which is applied for each procedure.",
      grade: "Quality statement (ungraded)",
    },
    {
      action: "Give written advice about fever after bronchoscopy and, after a lung biopsy, about delayed complications such as a collapsed lung; arrange a chest X-ray if there are symptoms or a collapsed lung is suspected",
      why: "Fever after the test is common, usually starts after going home and is mostly not an infection; a collapsed lung after a lung biopsy can show itself late.",
      source: "bts-2013",
      quote: "Patients should be advised of the potential for delayed complications following TBLB and provided with written information regarding likely symptoms and action required.",
      grade: "Grade D (delayed complications, chest X-ray); Grade C (written information on fever)",
    },
    {
      action: "After sedation, advise no driving, no legal documents and no machinery for 24 hours",
      why: "The effects of sedation can outlast the test, and may last longer in older people.",
      source: "bts-2013",
      quote: "Patients who had sedation should be advised not to drive, sign legally binding documents or operate machinery for 24 h after the procedure.",
      grade: "Good practice point",
    },
    {
      action: "Tell the person who to contact afterwards, and to do so straight away if they become short of breath or have chest pain at home",
      why: "Cancer Research UK gives these as the signs to report at once, and asks people to ring if blood in the spit does not go away or gets worse.",
      source: "cruk-bronchoscopy",
      quote: "Contact a doctor or your hospital 24 hour advice line straight away if you become short of breath or have chest pain when you are at home.",
      grade: "Patient information (ungraded)",
    },
  ],
  bestInClass: {
    statement: "BTS 2013, the most recent UK guideline found: information beforehand (Grade C), a chest CT first in suspected lung cancer (Grade D), 4 hours without food and clear fluids to 2 hours (Grade D), clopidogrel stopped 7 days before biopsy with low-dose aspirin alone continued (Grade C), no antibiotic prophylaxis (Grade B) or routine anticholinergic premedication (Grade A), offered intravenous sedation (Grade B) with titrated midazolam (Grade B) in the 1 mg/mL strength (Grade D) and topical lidocaine (Grade A), continuous oximetry (Grade C), written aftercare advice (Grade C and D) and 24 hours without driving after sedation (good practice point). BTS quality standards (2014) add a safety checklist for each procedure and, for EBUS, staging sensitivity of at least 88% with complication rates audited to be below 1%. The 2013 guideline is now old: BTS planned to review it in 2018, its anticoagulant appendix is titled for warfarin and clopidogrel only, and it leaves EBUS to a separate 2011 BTS guideline. A German guideline (2026) and a United States consensus on anaesthesia for advanced diagnostic bronchoscopy (2026) are newer but could not be read here.",
    sources: ["bts-2013", "bts-qs-2014", "dgp-s2k-2026", "anesthesia-consensus-2026"],
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
      differs: "Propofol sedation or general anaesthesia given by an anaesthetist or another practitioner formally trained in it, instead of midazolam with or without an opioid.",
      evidence: "BTS 2013: propofol has similar efficacy to midazolam but should be used only when given by practitioners formally trained in it, such as anaesthetists, because of its narrow therapeutic window (Grade B). A 2026 multisociety United States consensus on anaesthesia for advanced diagnostic bronchoscopy exists but is behind a subscription with no abstract, and was not read.",
      sources: ["bts-2013", "anesthesia-consensus-2026"],
    },
    {
      name: "German Respiratory Society S2k guideline (2026)",
      differs: "Covers indications, preparation, execution, hygiene and aftercare for Germany, Austria and Switzerland.",
      evidence: "Only the abstract, which states scope and not recommendations, was reachable; the guideline is consensus-based (S2k) and written in German.",
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
      accessed: "2026-11-17",
    },
    {
      key: "bts-qs-2014",
      label: "BTS Quality Standards for Flexible Bronchoscopy (December 2014)",
      publisher: "British Thoracic Society",
      year: 2014,
      url: "https://www.brit-thoracic.org.uk/document-library/quality-standards/flexible-bronchoscopy/bts-quality-standards-for-flexible-bronchoscopy/",
      gradingScheme: "Quality statements with measures; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-bronchoscopy",
      label: "Bronchoscopy (patient information, last reviewed 30 May 2025)",
      publisher: "Cancer Research UK",
      year: 2025,
      url: "https://www.cancerresearchuk.org/about-cancer/tests-and-scans/bronchoscopy",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "dgp-s2k-2026",
      label: "Safety of diagnostic flexible bronchoscopy in adults: S2k guideline of the German Respiratory Society",
      publisher: "German Respiratory Society (Deutsche Gesellschaft für Pneumologie und Beatmungsmedizin), Pneumologie",
      year: 2026,
      url: "https://doi.org/10.1055/a-2669-9409",
      doi: "10.1055/a-2669-9409",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "anesthesia-consensus-2026",
      label: "Expert Consensus Statement on Anesthesia Care for Advanced Diagnostic Bronchoscopy (Society for Airway Management, Society for Head and Neck Anesthesia, Society for Ambulatory Anesthesia, American Association for Bronchology and Interventional Pulmonology)",
      publisher: "Anesthesia & Analgesia",
      year: 2026,
      url: "https://doi.org/10.1213/ane.0000000000008366",
      doi: "10.1213/ane.0000000000008366",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["robotic-bronchoscopy"],
  drugs: ["midazolam", "propofol", "lidocaine", "glycopyrronium"],
  cancers: ["lung-cancer"],
  terms: ["bronchoscopy", "ebus-tbna"],
  related: ["anticoagulants-and-antiplatelets-before-endoscopy"],
  upgrades: [],
  gaps: [
    "The BTS diagnostic bronchoscopy guideline dates from 2013, said it would be reviewed by 2018, and is no longer listed on the BTS guidelines page, though the BTS document library still serves it; on 17 November 2026 no newer UK guideline was found on the BTS site, in Crossref or in Europe PMC. Its anticoagulant appendix is titled for warfarin and clopidogrel only and is an image that could not be read as text, so no interval for stopping an anticoagulant is given here (see the endoscopy anticoagulant protocol).",
    "The German S2k guideline (2026) was read as an abstract only, and the 2026 United States anaesthesia consensus and the 2015 ESGE/ERS/ESTS endosonography guideline are behind subscriptions with no abstract; on 17 November 2026 none had an open copy, and their recommendations are not on this page.",
    "EBUS-specific preparation (sedation depth, number of needle passes, rapid on-site evaluation) is drawn here only from the BTS quality standards; the BTS 2011 advanced bronchoscopy guideline was not read for this page.",
    "The fasting interval is a Grade D recommendation: the guideline says there is insufficient evidence to support a specific time and kept the 2001 figures. Local units may ask for a longer fast; no source read compared them.",
    "BTS gives no fixed maximum dose of lidocaine in its recommendations, and its sedation appendix was not used for doses here; the midazolam figures on this page are limits on what is drawn up into a syringe, not doses to give.",
    "The BTS guideline says written advice should cover likely symptoms and the action required but does not list them in the text read (its patient leaflet is a separate download). The symptoms to report on this page come from Cancer Research UK's patient page, which gives no clock beyond \"straight away\".",
  ],
});
