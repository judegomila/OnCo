import { protocol } from "./helpers";

/*
 * Needle biopsy of a lung nodule or mass through the chest wall, guided by CT or ultrasound (percutaneous
 * transthoracic needle biopsy): preparation, the procedure, a collapsed lung (pneumothorax), coughing up blood
 * (haemoptysis) and observation afterwards. Breast and liver biopsy are in
 * image-guided-core-biopsy-preparation-and-aftercare, and bronchoscopic sampling in
 * diagnostic-bronchoscopy-and-ebus-preparation; neither is repeated here.
 *
 * What was read, and how. First read on 16 November 2026; every source was fetched again and every claim re-read
 * against it in a second accuracy pass on 17 November 2026 (raw text by curl, tags stripped by script, quotes
 * matched by script).
 * - Korean Society of Thoracic Radiology, 2020 Clinical Practice Guideline for Percutaneous Transthoracic Needle
 *   Biopsy of Pulmonary Lesions (Yoon et al., Korean J Radiol 2021): full text, Europe PMC XML (PMC7817630),
 *   including Table 1, which defines the evidence levels and recommendation grades. An adaptation of earlier
 *   guidelines with a Delphi consensus, funded by the society. Every clinical step on this page rests on it. It cites
 *   the SIR 2012 and 2019 documents for its thresholds, which is how those figures reach this page.
 * - Chinese multidisciplinary expert consensus on percutaneous transthoracic needle biopsy (Guo et al., Thoracic
 *   Cancer 2018): full text, Europe PMC XML (PMC6209790). Ungraded consensus; the authors report no conflict of
 *   interest. Used for variants only.
 * - Heerink et al., Complication rates of CT-guided transthoracic lung biopsy: meta-analysis (Eur Radiol 2017;
 *   online 2016): full text, Europe PMC XML (PMC5127875).
 * - Cancer Research UK, Lung biopsy (last reviewed 24 September 2025): the public page, fetched raw on 17 November
 *   2026. Added in the second pass as the source for what a patient should report afterwards.
 * - Not reachable, tried again once each on 17 November 2026: British Thoracic Society, Guidelines for
 *   radiologically guided lung biopsy (Manhire et al., Thorax 2003): thorax.bmj.com and the Europe PMC PDF returned
 *   403 to a script and PubMed Central holds only a scan with no text; the block was not bypassed. CIRSE Guidelines
 *   on Percutaneous Needle Biopsy (Veltri et al., Cardiovasc Intervent Radiol 2017): the publisher answered a script
 *   with a bot check and Europe PMC holds no full text. The SIR 2019 consensus on periprocedural thrombotic and
 *   bleeding risk (Patel et al.): jvir.org returned 403; no abstract in Europe PMC. The SIR Quality Improvement
 *   Standards on Percutaneous Needle Biopsy (Sheth et al., J Vasc Interv Radiol 2020): paywalled, not retried. The
 *   ACR, SIR and SPR practice parameter: a challenge page on 16 November, not retried. All are named in sources or
 *   gaps; no step, grade or figure rests on them.
 *
 * Second pass, 17 November 2026: all 30 quotes matched their source. Corrected: the guideline's Table 1 is in the
 * text (the page had said it was not); the INR and platelet thresholds are cited by the guideline to the SIR 2012
 * and 2019 documents together, not to 2019 alone; ultrasound guidance and the lung function test were written as
 * orders where the guideline says "can be considered" and "we suggest"; reasons in several why lines that the
 * guideline does not give were reworded to what it says; the patient advice on when to call was unsourced and now
 * follows the Cancer Research UK page; "one in four" and "one in eighteen" were our own arithmetic and are now the
 * printed percentages.
 *
 * Every DOI was resolved through Crossref and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed; where a sentence ends in a reference marker, the quote stops before it. No source
 * is funded by industry.
 */
export const imageGuidedLungBiopsyPreparationAndAftercare = protocol({
  id: "image-guided-lung-biopsy-preparation-and-aftercare",
  name: "CT-guided and ultrasound-guided needle biopsy of the lung: preparation, pneumothorax, haemoptysis and observation",
  aka: ["CT-guided lung biopsy", "percutaneous lung biopsy", "transthoracic needle biopsy", "percutaneous transthoracic needle biopsy", "PTNB", "lung needle biopsy", "ultrasound-guided lung biopsy", "pneumothorax after lung biopsy", "collapsed lung after biopsy", "coughing blood after lung biopsy", "lung biopsy aftercare"],
  domain: "screening-diagnostics",
  tldr: "A lung biopsy through the chest wall uses a needle, guided by CT or ultrasound, to sample a lung nodule or mass. In a pooled analysis of 8,133 CT-guided core biopsies, air leaked around the lung in 25.3% and needed treatment in 5.6%. You are checked with a chest X-ray or scan afterwards. Contact a doctor if you become short of breath, have chest pain or cough up a lot of blood.",
  simple: "A doctor uses a scanner to guide a thin needle into the lung to take a tiny sample. Tell the team about any blood thinners you take; they will say whether to stop them. Afterwards you are checked for an air leak around the lung with an X-ray or scan. A little blood in your spit for a few days can happen. Contact a doctor if you get short of breath or have chest pain, or if there is a lot of blood or it does not stop.",
  summary: "Source. Every clinical step rests on the Korean Society of Thoracic Radiology guideline (KSTR 2020; 39 graded recommendations adapted from earlier guidelines, Delphi consensus; grades A to D, evidence levels I, high, to IV, very low). The British Thoracic Society guideline (2003), CIRSE 2017 and the SIR 2019 and 2020 documents could not be read, so this page is one society's guideline with two comparators and a patient information page, not a survey of the field.\n\nBefore. Multidisciplinary discussion of the need for and site of biopsy (A, III); informed consent, without which biopsy is contraindicated, as it is for vascular lesions (A, III). Careful multidisciplinary risk-benefit assessment for respiratory failure or predicted FEV1 below 35%, mechanical ventilation, bleeding tendency or coagulopathy, pulmonary hypertension, a single lung, or an uncooperative patient (B, III). Check haematocrit, PT, APTT and platelets (A, II) and withhold anticoagulants (A, II). In its commentary KSTR notes that SIR rated lung biopsy a moderate bleeding risk procedure in 2012 and a high risk one in 2019 and, citing both documents, gives an INR below 1.5, a minimum platelet count of 70,000 per microlitre and the last one or two doses of low molecular weight heparin withheld; citing the 2019 document alone, it says clopidogrel may be withheld for five days and aspirin may not need to be. Neither SIR document could be read. The Chinese consensus (2018, ungraded) accepts platelets above 50 × 10⁹/L and INR below 1.5 but stops aspirin and clopidogrel for at least 7 days and replaces warfarin with low molecular weight heparin a week before. Where severe COPD is suspected: multidisciplinary discussion (A, III) and a lung function test (B, III). Planning CT of sufficient quality (A, II).\n\nDuring. Fluoroscopic or CT-based guidance as the primary modality (A, II); ultrasound can be considered as the primary modality for subpleural lesions abutting the chest wall (A, II). The patient must hold a stable position and follow breathing instructions.\n\nRates. Meta-analysis of CT-guided core biopsy (Heerink 2017, 32 articles, 8,133 procedures): pneumothorax 25.3%, pneumothorax needing intervention 5.6%, pulmonary haemorrhage 18.0%, haemoptysis 4.1%; major complications 5.7% (95% CI 4.4 to 7.4). KSTR cites national surveys with pneumothorax in 15.0 to 35.0% and tube drainage in 3.1 to 6.6%.\n\nAfter. Check for pneumothorax on a chest radiograph or the guidance modality (A, II); KSTR's commentary asks for an upright radiograph within a few hours and notes that more than 90% of pneumothoraces appear within 3 to 4 hours and most delayed ones within 24 hours. Chest tube according to the patient's status, the size of the pneumothorax and what is available (A, II). Haemoptysis: monitor vital signs, saturation and volume (A, II); biopsy side down for mild bleeding (A, II); oxygen and consideration of intubation for massive bleeding (A, II). Air embolism: oxygen at the highest concentration, hyperbaric if available (A, III). Large haemothorax: conservative management with surgical and interventional radiology input (A, III). KSTR sets no criteria for discharge; the Chinese consensus says low-risk outpatients may leave after four hours without abnormality once a chest radiograph has been reviewed, and follows up for at least 24 hours. For patients, Cancer Research UK (reviewed 2025) says a little blood in the spit for a few days can happen, and to contact the healthcare team if it does not go away or there is a lot, and a doctor for shortness of breath or chest pain.\n\nThe team doing your biopsy follows its own protocol, and that comes first.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "radiographer", "nurse", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "ward", "home"],
  },
  population: "Adults having a percutaneous needle biopsy of a lung nodule, mass or persistent shadow under CT, fluoroscopic or ultrasound guidance, most often to diagnose or characterise suspected lung cancer or a deposit in the lung from another cancer. The guideline the steps rest on was written for practice in Korea; hospitals elsewhere follow their own national and local guidance, some of which could not be read for this page. Children are not addressed by any source read. Biopsy of the breast and liver, and bronchoscopy and EBUS, have their own protocols. The steps describe what the guideline asks of the hospital team: they are for understanding the procedure, and the instructions your own team gives you, above all about blood thinners and about when you can go home, come first.",
  trigger: "A scan shows a lung nodule or mass that needs a tissue diagnosis, and a needle biopsy through the chest wall is being considered.",
  steps: [
    {
      action: "Discuss in a multidisciplinary team whether a biopsy is needed and where to take it from",
      why: "Some nodules are better watched, sampled through the airways or removed. The team weighs what a biopsy would change against its risks for this person.",
      source: "kstr-2020",
      quote: "We recommend a multidisciplinary discussion to determine the necessity and site of the biopsy.",
      grade: "recommendation grade A, evidence level III",
    },
    {
      action: "Explain the benefits and the possible risks fully, and obtain informed consent; do not go ahead without it",
      why: "The guideline puts the overall complication rate at around 25% or higher and says most complications can be managed conservatively. The person having the biopsy decides whether the answer is worth that.",
      source: "kstr-2020",
      quote: "It is mandatory to obtain informed consent from the patient with a sufficient explanation of the benefits and potential risks of the procedure",
    },
    {
      action: "Weigh the conditions that raise the risk: very poor lung function, a ventilator, a bleeding tendency, high pressure in the lung's blood vessels, a single working lung, or being unable to cooperate",
      why: "The guideline says people with severe lung disease are more vulnerable to respiratory failure if a pneumothorax or bleeding occurs, and that a ventilator raises the risk of pneumothorax and air embolism, so the decision is made case by case.",
      source: "kstr-2020",
      quote: "We suggest that PTNB should be carefully considered in the following circumstances based on a multidisciplinary risk-benefit assessment.",
      grade: "recommendation grade B, evidence level III",
    },
    {
      action: "Check the haematocrit, the clotting tests (prothrombin time and activated partial thromboplastin time) and the platelet count before the biopsy",
      why: "A biopsy can bleed into the lung or along the needle track, so the blood's ability to clot is checked beforehand.",
      source: "kstr-2020",
      quote: "We recommend checking hematocrit, prothrombin time, activated partial thromboplastin time, and platelet count before performing the biopsy.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "Plan each anticoagulant in advance and withhold it before the biopsy, balancing the risk of bleeding against the risk of a clot",
      why: "The guideline lists dual antiplatelet therapy among the risk factors for coughing up blood, and reports the SIR 2019 emphasis on weighing the risk of bleeding against the risk of a clot. Sources differ on the details (see variants).",
      source: "kstr-2020",
      quote: "We recommend withholding anticoagulants before performing the biopsy.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "Correct a moderate or higher bleeding tendency or clotting abnormality before the procedure",
      why: "The guideline asks for clotting and the platelet count to be corrected as far as possible when its thresholds are not met.",
      source: "kstr-2020",
      quote: "A moderate or higher risk of bleeding tendency and coagulation abnormalities should be corrected before the procedure",
    },
    {
      action: "Where severe chronic obstructive pulmonary disease is suspected, discuss the biopsy in the multidisciplinary team first; a lung function test beforehand is suggested, on a weaker grade (B, evidence level III)",
      why: "The guideline says people with severe COPD find it hard to hold their breath during the biopsy and are more vulnerable to respiratory failure if a pneumothorax or bleeding occurs.",
      source: "kstr-2020",
      quote: "We recommend a multidisciplinary discussion before performing PTNB in patients suspected of having severe chronic obstructive pulmonary disease.",
      grade: "recommendation grade A, evidence level III",
    },
    {
      action: "Plan the needle route on a chest CT of sufficient quality, with contrast where it helps",
      why: "The scan shows the lesion, the airways and blood vessels around it, and the fissures and bullae to avoid, so the safest needle path can be planned. Contrast can show blood vessels within the lesion.",
      source: "kstr-2020",
      quote: "We recommend obtaining chest CT images of sufficient quality for planning the biopsy, possibly with contrast enhancement.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "Consider ultrasound as the main guidance when the lesion lies just under the lining of the lung against the chest wall; use CT or fluoroscopy as the main guidance otherwise",
      why: "In the studies the guideline cites, ultrasound guidance had a lower complication rate and a shorter procedure than CT, with similar accuracy and no radiation.",
      source: "kstr-2020",
      quote: "We recommend that ultrasonography can be considered as the primary guidance modality for subpleural pulmonary lesions abutting the chest wall.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "Make sure the patient can keep a stable position and follow breathing instructions during the procedure",
      why: "The guideline says the safety and success of the biopsy rely on the patient's cooperation.",
      source: "kstr-2020",
      quote: "the patient must maintain a stable position and comply with breathing instructions during the procedure.",
    },
    {
      action: "Assess the risk of a pneumothorax beforehand and take steps to lower it during the procedure",
      why: "The guideline reports more air leaks with emphysema, small or deep lesions and more passes through the lining of the lung, and asks for the number of punctures and the length of lung crossed to be kept to a minimum.",
      source: "kstr-2020",
      quote: "We recommend assessing the risk of pneumothorax before performing a biopsy and minimizing the risk of pneumothorax during the procedure.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "Check for a pneumothorax after the biopsy, with a chest X-ray or the scanner used for guidance, read by the radiologist",
      why: "A pneumothorax is the most frequent complication of a lung biopsy and may need draining, so it is looked for.",
      source: "kstr-2020",
      quote: "We recommend evaluating the occurrence of pneumothorax using chest radiographs or the guidance modality by an interventionist after performing the biopsy.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "Take an upright chest X-ray within a few hours of the biopsy",
      why: "In the studies the guideline cites, more than nine in ten pneumothoraces had appeared within three to four hours.",
      source: "kstr-2020",
      quote: "An upright chest radiograph should be obtained within a few hours after the biopsy to identify potential complications",
    },
    {
      action: "Tell the patient that a pneumothorax can appear later",
      why: "In the studies the guideline cites, most delayed air leaks appeared within 24 hours of the biopsy.",
      source: "kstr-2020",
      quote: "Patients should be informed of the risks of delayed pneumothorax after PTNB",
    },
    {
      action: "Tell the patient who to contact afterwards, and to contact a doctor if they become short of breath or have chest pain",
      why: "This is the advice Cancer Research UK gives patients about a collapsed lung after a biopsy. The Chinese consensus also asks that outpatients be reminded to return without delay if they have any symptoms.",
      source: "cruk-lung-biopsy",
      quote: "Contact a doctor if you become short of breath or have chest pain.",
    },
    {
      action: "If there is a pneumothorax, choose between watching it, drawing the air off and placing a chest tube according to its size, the patient's condition and symptoms",
      why: "The guideline names watching, drawing the air off and a chest tube as the options, and says the choice depends on the size of the leak, the patient's condition, such as underlying COPD, and their symptoms.",
      source: "kstr-2020",
      quote: "We recommend determining the necessity of chest tube insertion by considering the status of the patient, amount of pneumothorax, and medical availability.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "If the patient coughs up blood, monitor pulse, blood pressure and oxygen level and judge how much blood there is",
      why: "The guideline says coughing up blood after a biopsy usually stops by itself but that heavy bleeding can develop, and that its severity is judged from the rate of bleeding and the patient's condition as well as the volume.",
      source: "kstr-2020",
      quote: "When hemoptysis occurs, we recommend monitoring vital signs and blood oxygen saturation levels, along with assessing the amount of hemoptysis.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "For mild bleeding, lie the patient on the side that was biopsied and reassure them",
      why: "Lying with the biopsied side down protects the other lung from the blood.",
      source: "kstr-2020",
      quote: "In cases of mild hemoptysis, we recommend conservative management with biopsy-site-down positioning.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "For heavy bleeding, give oxygen to keep up the oxygen level and protect the airway; consider a breathing tube placed to isolate the unaffected lung",
      why: "The guideline says it is crucial to protect the airway and to keep the unaffected lung clear of blood.",
      source: "kstr-2020",
      quote: "When massive hemoptysis occurs, we recommend supplying oxygen to maintain blood oxygen saturation, along with considering single-lumen endotracheal tube insertion.",
      grade: "recommendation grade A, evidence level II",
    },
    {
      action: "If air enters the circulation (systemic air embolism), give oxygen at as high a concentration as possible, including hyperbaric oxygen, and anticonvulsants if needed",
      why: "The guideline calls oxygen at as high a concentration as possible the most important step: it relieves the lack of oxygen and helps clear the air.",
      source: "kstr-2020",
      quote: "When systemic air embolism occurs, we recommend supplying oxygen at as high a concentration as possible, including hyperbaric oxygen therapy, and anticonvulsants, if needed.",
      grade: "recommendation grade A, evidence level III",
    },
    {
      action: "If a large amount of blood collects around the lung, manage conservatively, follow it on repeat X-rays while correcting any clotting problem, and contact the thoracic or general surgeons and interventional radiologists",
      why: "The guideline reports haemothorax in 0.09 to 0.57% of biopsies. Where it is large or growing, it names CT angiography to look for an injured chest wall artery and embolisation as the first treatment for one.",
      source: "kstr-2020",
      quote: "When a large amount of hemothorax occurs, we recommend conservative management, while contacting clinicians such as thoracic or general surgeons and interventional radiologists.",
      grade: "recommendation grade A, evidence level III",
    },
  ],
  bestInClass: {
    statement: "Of the guidelines that could be read, the Korean Society of Thoracic Radiology guideline (2020) is the most recent and the only one that grades its recommendations: a multidisciplinary decision, informed consent, clotting tests and a platelet count, anticoagulants withheld, CT planning, ultrasound guidance considered for lesions against the chest wall, a check for pneumothorax afterwards, a chest tube decided by the patient's condition and the size of the leak, and biopsy side down for haemoptysis. None of those is graded above evidence level II (moderate), and the guideline is an adaptation of earlier ones. Where the Chinese expert consensus (2018, ungraded) differs, both are shown. Thresholds: KSTR, citing the SIR 2012 and 2019 documents together, gives an INR below 1.5 and a minimum platelet count of 70,000 per microlitre; the Chinese consensus accepts platelets above 50 × 10⁹/L with the same INR. Antiplatelets: KSTR reports from SIR 2019 that clopidogrel may be withheld for five days and that aspirin may not need to be; the Chinese consensus stops both for at least 7 days. Observation: KSTR asks for a radiograph or a check on the guidance modality, with an upright radiograph within a few hours; the Chinese consensus scans immediately, says low-risk outpatients may leave after four hours without abnormality and recommends a radiograph within 24 hours. The British Thoracic Society guideline (2003), the CIRSE 2017 guideline, the SIR 2012 and 2019 documents themselves and the SIR 2020 quality standards could not be read, so this is not a full comparison: their positions are absent, or appear only as KSTR reports them.",
    sources: ["kstr-2020", "csio-2018"],
  },
  variants: [
    {
      name: "Clotting thresholds and which blood thinners to stop",
      differs: "KSTR 2020 notes that SIR rated lung biopsy a moderate bleeding risk procedure in 2012 and a high risk one in 2019. Citing both documents it gives an INR below 1.5, a minimum platelet count of 70,000 per microlitre, and \"Regarding low-molecular weight-heparin, the last 1 or 2 doses need to be withheld\". Citing the 2019 document it reports that clopidogrel may be withheld for five days and that aspirin may not need to be. Chinese consensus 2018: warfarin replaced by low molecular weight heparin a week before, with the heparin stopped 24 hours before; aspirin and clopidogrel stopped for at least 7 days; biopsy only with platelets above 50 × 10⁹/L and INR below 1.5; and bevacizumab, as an example of an anti-angiogenic drug, stopped 6 weeks before.",
      evidence: "KSTR grades withholding anticoagulants A, evidence level II, but takes the numbers from SIR without grading them (the SIR documents were not read, so whether the 2019 edition prints the same figures as the 2012 one is not confirmed here), and lists dual antiplatelet therapy among the reported risk factors for haemoptysis. The Chinese consensus is ungraded. Neither addresses the direct oral anticoagulants by name in the text read; those timings are in the perioperative protocols linked from this page.",
      sources: ["kstr-2020", "csio-2018"],
    },
    {
      name: "How long to observe, and when an outpatient may leave",
      differs: "KSTR recommends a check for pneumothorax on a radiograph or the guidance modality and, in its commentary, an upright radiograph within a few hours; it sets no observation time and no criteria for discharge. Chinese consensus: a full chest CT immediately after the biopsy; for people judged low risk beforehand, biopsy as an outpatient may be considered, and they may leave after four hours without abnormality once a chest radiograph has been reviewed; a radiograph within 24 hours and follow-up for at least 24 hours.",
      evidence: "KSTR: \"More than 90% of all pneumothoraces appeared within 3 to 4 hours of the PTNB, and most of the delayed pneumothoraces occurred within 24 hours after the procedure\". KSTR's recommendation is grade A, evidence level II; the Chinese consensus is ungraded. No randomised comparison of observation times is cited in either text.",
      sources: ["kstr-2020", "csio-2018"],
    },
    {
      name: "Lying biopsy side down, rapid rollover and sealing the needle track to prevent pneumothorax",
      differs: "The measures studied are rolling the patient onto the biopsied side as the needle comes out, and sealing the track with saline, a plug or the patient's own blood. KSTR reports the studies in its commentary without making a graded recommendation on them, and adds that one study found fewer pneumothoraces with the patient positioned biopsy side down. The Chinese consensus says it is not known whether sealing the track with gel, gelatin sponge or saline reduces pneumothorax.",
      evidence: "KSTR: \"A recent meta-analysis reported that normal saline tract sealant, a rapid needle-out patient-rollover approach (74), and the use of a tract plug or blood patch reduced the likelihood of pneumothorax requiring tube drainage (75).\" The studies behind that sentence were not read for this page.",
      sources: ["kstr-2020", "csio-2018"],
    },
    {
      name: "When a pneumothorax needs a chest tube",
      differs: "KSTR sets no size threshold: the need for a chest tube is decided from the patient's status, the amount of pneumothorax and what is available. The Chinese consensus says a small, asymptomatic, stable pneumothorax needs no special treatment, and that a chest tube should be inserted if the pneumothorax exceeds 30%, keeps growing or causes severe symptoms.",
      evidence: "KSTR's recommendation is grade A, evidence level II. The Chinese consensus is ungraded and cites no comparison for its 30% figure in the passage read.",
      sources: ["kstr-2020", "csio-2018"],
    },
    {
      name: "Core needle or fine needle",
      differs: "A cutting (core) needle gives a strip of tissue for histology and molecular testing; fine needle aspiration gives cells. KSTR leaves the choice to the operator, by the availability of a cytopathologist, the risk of malignancy, the lesion size, the tissue needed and the operator's experience (grade A, evidence level II), and recommends biopsy to obtain tissue for molecular profiling of lung cancer (grade A, evidence level I).",
      evidence: "Heerink 2017 pooled overall complication rates of 38.8% (95% CI 34.3 to 43.5%) for core biopsy and 24.0% (95% CI 18.2 to 30.8%) for fine needle aspiration, and major complication rates of 5.7% (95% CI 4.4 to 7.4%) and 4.4% (95% CI 2.7 to 7.0%). Most of the difference was in minor complications: pneumothorax not needing treatment, bleeding seen only on the scan, and brief haemoptysis.",
      sources: ["heerink-2017", "kstr-2020"],
    },
  ],
  grades: [
    { claim: "Assess the risks and benefits of a biopsy before performing it", grade: "recommendation grade A, evidence level II", source: "kstr-2020", quote: "We recommend assessing the risks and benefits of a biopsy procedure before performing the biopsy." },
    { claim: "Absolute contraindications: no informed consent, or a vascular lesion of the lung", grade: "recommendation grade A, evidence level III", source: "kstr-2020", quote: "We recommend not performing a biopsy in the following circumstances, which are absolute contraindications." },
    { claim: "Withhold anticoagulants before biopsy", grade: "recommendation grade A, evidence level II", source: "kstr-2020" },
    { claim: "Lung function test before biopsy where severe COPD is suspected", grade: "recommendation grade B, evidence level III", source: "kstr-2020", quote: "We suggest performing a pre-procedural pulmonary function test in patients suspected of having severe chronic obstructive pulmonary disease." },
    { claim: "Fluoroscopic or CT-based guidance as the primary modality", grade: "recommendation grade A, evidence level II", source: "kstr-2020", quote: "We recommend primary utilization of fluoroscopic or CT-based guidance modalities for the biopsy, including cone-beam CT and CT fluoroscopy." },
    { claim: "Biopsy to obtain tissue for molecular profiling of lung cancer or intrathoracic metastasis", grade: "recommendation grade A, evidence level I", source: "kstr-2020", quote: "We recommend performing a biopsy to acquire a tumor specimen for molecular profiling of lung cancer or intrathoracic metastasis." },
    { claim: "Sensitivity above 85% and specificity above 90% for malignancy as the standard a unit should reach", grade: "recommendation grade A, evidence level II", source: "kstr-2020", quote: "We recommend that the sensitivity and specificity of the biopsy for malignancy should be higher than 85% and 90%, respectively." },
    { claim: "Check for pneumothorax after the biopsy on a radiograph or the guidance modality", grade: "recommendation grade A, evidence level II", source: "kstr-2020" },
    { claim: "Chest tube decided by the patient's status, the amount of pneumothorax and availability", grade: "recommendation grade A, evidence level II", source: "kstr-2020" },
    { claim: "Biopsy side down for mild haemoptysis", grade: "recommendation grade A, evidence level II", source: "kstr-2020" },
    { claim: "High-concentration oxygen, including hyperbaric oxygen, for systemic air embolism", grade: "recommendation grade A, evidence level III", source: "kstr-2020" },
    { claim: "Pooled rates for CT-guided core biopsy: pneumothorax 25.3%, pneumothorax needing intervention 5.6%, pulmonary haemorrhage 18.0%, haemoptysis 4.1%", grade: "Meta-analysis of observational studies (not graded)", source: "heerink-2017", quote: "For CT-guided core biopsy the pooled rate of pneumothorax was 25.3 %, of pneumothorax requiring intervention 5.6 %, of pulmonary haemorrhage 18.0 %, and of hemoptysis 4.1 %." },
  ],
  sources: [
    {
      key: "kstr-2020",
      label: "2020 Clinical Practice Guideline for Percutaneous Transthoracic Needle Biopsy of Pulmonary Lesions: A Consensus Statement and Recommendations of the Korean Society of Thoracic Radiology",
      publisher: "Korean Society of Thoracic Radiology (Korean Journal of Radiology; Yoon et al.)",
      year: 2021,
      url: "https://doi.org/10.3348/kjr.2020.0137",
      doi: "10.3348/kjr.2020.0137",
      gradingScheme: "Each recommendation carries a recommendation grade and an evidence level, by the criteria of the Korean Clinical Imaging Guidelines (the guideline's Table 1). Grades: A, enough evidence of the desired effect, recommended; B, intermediate to enough evidence, can be provided selectively on expert judgement; C, not recommended; D, not enough evidence either way. Evidence levels: I high, II moderate, III low, IV very low, by study design and risk of bias. Only A and B, worded 'we recommend' and 'we suggest', and levels I to III appear. Sentences in the commentary carry no grade.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "csio-2018",
      label: "Chinese multidisciplinary expert consensus: Guidelines on percutaneous transthoracic needle biopsy",
      publisher: "Chinese Society of Interventional Oncology, Chinese Anti-Cancer Association (Thoracic Cancer; Guo et al.)",
      year: 2018,
      url: "https://doi.org/10.1111/1759-7714.12849",
      doi: "10.1111/1759-7714.12849",
      gradingScheme: "Expert consensus; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "heerink-2017",
      label: "Complication rates of CT-guided transthoracic lung biopsy: meta-analysis",
      publisher: "European Radiology (Heerink et al.)",
      year: 2017,
      url: "https://doi.org/10.1007/s00330-016-4357-8",
      doi: "10.1007/s00330-016-4357-8",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bts-2003",
      label: "Guidelines for radiologically guided lung biopsy",
      publisher: "British Thoracic Society (Thorax; Manhire et al.)",
      year: 2003,
      url: "https://doi.org/10.1136/thorax.58.11.920",
      doi: "10.1136/thorax.58.11.920",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "cirse-pnb-2017",
      label: "CIRSE Guidelines on Percutaneous Needle Biopsy (PNB)",
      publisher: "Cardiovascular and Interventional Radiological Society of Europe (Cardiovasc Intervent Radiol; Veltri et al.)",
      year: 2017,
      url: "https://doi.org/10.1007/s00270-017-1658-5",
      doi: "10.1007/s00270-017-1658-5",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "sir-qi-2020",
      label: "Society of Interventional Radiology Quality Improvement Standards on Percutaneous Needle Biopsy in Adult and Pediatric Patients",
      publisher: "Society of Interventional Radiology (J Vasc Interv Radiol; Sheth et al.)",
      year: 2020,
      url: "https://doi.org/10.1016/j.jvir.2020.07.012",
      doi: "10.1016/j.jvir.2020.07.012",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    {
      key: "sir-2019",
      label: "Society of Interventional Radiology Consensus Guidelines for the Periprocedural Management of Thrombotic and Bleeding Risk in Patients Undergoing Percutaneous Image-Guided Interventions, Part II: Recommendations",
      publisher: "Society of Interventional Radiology (J Vasc Interv Radiol; Patel et al.)",
      year: 2019,
      url: "https://doi.org/10.1016/j.jvir.2019.04.017",
      doi: "10.1016/j.jvir.2019.04.017",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-lung-biopsy",
      label: "Lung biopsy (patient information; last reviewed 24 September 2025)",
      publisher: "Cancer Research UK",
      year: 2025,
      url: "https://www.cancerresearchuk.org/about-cancer/tests-and-scans/lung-biopsy",
      gradingScheme: "Patient information; nothing is graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["lung-cancer"],
  terms: ["core-needle-biopsy", "pulmonary-nodule", "haemoptysis", "biopsy"],
  related: ["image-guided-core-biopsy-preparation-and-aftercare", "diagnostic-bronchoscopy-and-ebus-preparation", "antithrombotic-interruption-around-surgery", "anticoagulants-and-antiplatelets-before-endoscopy", "ct", "ultrasound"],
  upgrades: [],
  gaps: [
    "The British Thoracic Society's Guidelines for radiologically guided lung biopsy (Thorax 2003), the UK guideline for this procedure, could not be read: on 17 November 2026 thorax.bmj.com and the Europe PMC copy again returned 403 to a script, and PubMed Central holds only a scan with no text. So this page carries no UK position on clotting thresholds, lung function testing, sedation, how long to observe, day case criteria or flying afterwards. Ask the team doing the biopsy.",
    "No source read sets criteria for going home the same day (how far from a hospital, who should be at home) or says when it is safe to fly after a lung biopsy; Cancer Research UK says only to tell the doctor if a flight is due soon. The Korean guideline sets no discharge criteria; the four-hour figure in the variants is from an ungraded consensus.",
    "The advice on when a patient should call comes from the Cancer Research UK page, which covers surgical as well as needle biopsy. It gives no time limit, and no guideline read lists the symptoms to report. Cancer Research UK calls a collapsed lung rare; the pooled analysis above found a pneumothorax in 25.3% of core biopsies and one needing intervention in 5.6%.",
    "The SIR 2019 consensus on periprocedural thrombotic and bleeding risk could not be read: on 17 November 2026 jvir.org returned 403 to a script and Europe PMC holds no abstract. Its figures appear here only as the Korean guideline reports them, and the Korean guideline cites the SIR 2012 and 2019 documents together for the INR below 1.5 and the platelet count of 70,000 per microlitre, so this page cannot confirm that the 2019 edition itself prints those two figures. Europe PMC also lists a 2022 appendix to the SIR consensus (DOI 10.1016/j.jvir.2022.07.006) and 2026 Canadian practice guidelines on periprocedural bleeding risk (CAR/CAIR, DOI 10.1177/08465371261433905); neither was read. Units may work to different thresholds from those shown here.",
    "The CIRSE 2017 guideline on percutaneous needle biopsy, the SIR 2020 quality improvement standards and the ACR, SIR and SPR practice parameter could not be read (a bot check again on 17 November 2026, a paywall, and a challenge page in place of the PDF). Whether they differ from the Korean guideline is not known.",
    "No source read gives a holding time for apixaban, rivaroxaban, edoxaban or dabigatran before lung biopsy. The perioperative protocols linked from this page carry those timings for surgery and endoscopy; whether lung biopsy should follow the high bleeding risk timings there is a decision for the local team.",
    "The Korean guideline is an adaptation of earlier guidelines for practice in Korea, says it could not reflect patients' opinions and did not search recent studies systematically, and grades no step on this page above evidence level II (moderate); its one level I recommendation is biopsy to obtain tissue for molecular profiling.",
    "Whether lying biopsy side down, rapid rollover, or sealing the needle track with saline, a plug or the patient's own blood should be routine is not settled: the Korean guideline reports a meta-analysis in favour of sealing and rollover, and one study in favour of positioning, without grading a recommendation, and the Chinese consensus calls the benefit of sealing unknown. Those studies were not read here.",
    "The Heerink meta-analysis could not estimate rates of haemothorax (too few of the included studies reported it), air embolism, needle track seeding or death (none reported them); it cites other studies giving 0.02% to 0.4% for air embolism, 0.012% to 0.061% for needle track seeding and 0.16% for death. The Korean guideline reports air embolism in 0.02 to 0.18% of biopsies.",
    "Children are not addressed by any source read.",
  ],
});
