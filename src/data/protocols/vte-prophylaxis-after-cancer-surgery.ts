import { protocol } from "./helpers";

/*
 * Preventing blood clots (venous thromboembolism) around and after cancer surgery, including extended prophylaxis to 28
 * days after major abdominal or pelvic cancer surgery.
 *
 * First written on 11 November 2026 from NICE NG89 and two abstracts. Re-read claim by claim on 17 November 2026 in the
 * second accuracy pass; every source was fetched raw with curl and read as text, and every quote checked by script:
 * - NICE NG89, Venous thromboembolism in over 16s (published 21 March 2018, last updated 13 August 2019, with wording
 *   clarifications in December 2019, January 2021 and May 2021; last reviewed 18 September 2024, when NICE decided not
 *   to update it): recommendations and overview pages (copies another checker saved from nice.org.uk the same day,
 *   re-used) and the update information page.
 * - ITAC 2022 international guidelines (Lancet Oncology 2022): full text, Europe PMC XML for PMC9236567 (copy saved by
 *   another checker the same day, re-used). Added in this pass.
 * - ASH 2021 guidelines, prevention and treatment in patients with cancer (Blood Advances 2021): full text, PubMed
 *   Central page for PMC7903232 (copy saved by another checker the same day, re-used). Added in this pass. An erratum
 *   exists (10.1182/bloodadvances.2021004734); the PubMed Central copy is marked as corrected, and the text of the
 *   erratum itself did not come back from the NCBI API.
 * - ASCO guideline update (Key et al., J Clin Oncol 2023): full text of the update, from the Internet Archive's capture
 *   of ascopubs.org/doi/10.1200/JCO.23.00294 dated 11 July 2025 (copy saved by another checker the same day, re-used).
 *   The update prints only the new recommendation 3.7; recommendations 3.1 to 3.6 are carried over from the 2019
 *   guideline, whose archived copy was a refusal page, so they were not read.
 * - Cochrane review CD004318.pub5 (Felder et al., 2019): full text, PubMed Central page for PMC6709764 (Europe PMC's
 *   XML endpoint answered 500 and the NCBI API withholds this publisher's XML). No later version is registered.
 * - NHS, DVT (deep vein thrombosis), page last reviewed 30 April 2026: the public page, for the symptoms and for how
 *   quickly to seek help. Added in this pass.
 * - ESMO Clinical Practice Guideline, VTE in cancer patients (Ann Oncol 2023): still not readable. The publisher
 *   answered a browser check, the Internet Archive holds only that check, and Europe PMC has no abstract. No step
 *   rests on it.
 * Every DOI was resolved through Crossref or Europe PMC and its title checked.
 */
export const vteProphylaxisAfterCancerSurgery = protocol({
  id: "vte-prophylaxis-after-cancer-surgery",
  name: "Blood clot prevention around cancer surgery, including extended prophylaxis after major abdominal and pelvic operations",
  aka: ["VTE prophylaxis", "thromboprophylaxis", "extended thromboprophylaxis", "28 days of heparin injections after surgery", "DVT prevention after cancer surgery", "blood thinner injections after surgery", "anti-embolism stockings"],
  domain: "surgery-perioperative",
  tldr: "Cancer and major surgery both raise the risk of blood clots in the legs and lungs. Your team should assess your risk of clots and of bleeding, use stockings or leg pumps, and add blood-thinning injections when clot risk outweighs bleeding risk. After major cancer surgery in the abdomen or pelvis the injections may continue at home for four weeks, because the risk stays raised after discharge.",
  simple: "After a big cancer operation you may be asked to keep giving yourself a small blood-thinning injection each day for about four weeks. It lowers the chance of a clot. The NHS says to ask for an urgent GP appointment or call 111 if you think you have a clot in a leg (throbbing pain or swelling in one leg), and to call 999 or go to A&E if you also feel short of breath or have chest pain. Tell your team about any bleeding.",
  summary: "NICE NG89 (2018, last updated 2019) asks for every surgical patient's VTE and bleeding risk to be assessed as soon as possible after admission or by the first consultant review, with a published tool, and reassessed at consultant review or when their condition changes. For abdominal (gastrointestinal, gynaecological, urological) surgery at increased risk, mechanical prophylaxis (anti-embolism stockings or intermittent pneumatic compression) starts on admission and continues until mobility returns, and LMWH or fondaparinux is added for a minimum of 7 days where clot risk outweighs bleeding risk. NICE says to consider extending pharmacological prophylaxis to 28 days after major cancer surgery in the abdomen. For thoracic surgery NICE says to consider prophylaxis, with LMWH first and fondaparinux if LMWH is contraindicated. For renal impairment (which NICE defines as an eGFR below 30 ml/min/1.73 m²) NICE says to choose LMWH or unfractionated heparin (UFH) and reduce the dose if needed on senior advice or a local protocol.\n\nThe cancer guidelines differ from NICE and from each other. ITAC (2022) recommends once-daily LMWH (when creatinine clearance is 30 mL/min or more) or low-dose UFH three times a day, started 2 to 12 hours before the operation and continued for at least 7 to 10 days, at the highest prophylactic dose of LMWH (all grade 1A), and four weeks of LMWH after major abdominal or pelvic surgery, by laparotomy or laparoscopy, in people not at high risk of bleeding (grade 1A); it does not recommend mechanical methods alone unless drugs are contraindicated (grade 2A). ASH (2021) suggests LMWH or fondaparinux rather than UFH, starting after rather than before the operation, combining mechanical and drug methods for people at high risk of thrombosis, and continuing after discharge following major abdominal or pelvic surgery (all conditional recommendations, on low or very low certainty). ASCO (2023 update) says candidates for extended prophylaxis may be offered LMWH (strong recommendation, high-quality evidence) or, after an initial period of LMWH or UFH, rivaroxaban or apixaban (weak recommendation, low-quality evidence).\n\nThe Cochrane review (2019; 7 RCTs, 1728 participants, benign and malignant disease, five of the seven trials in cancer patients only) found that LMWH for at least 14 days after major abdominal or pelvic surgery reduced VTE within 30 days from 13.2% to 5.3% (OR 0.38, 95% CI 0.26 to 0.54, moderate-quality evidence), mostly clots found by scanning, with no difference in bleeding (2.8% against 3.4%) or mortality (3.8% against 3.9%). Before discharge, NICE asks that people are told how to use and dispose of the injections, how long to continue, the signs of DVT, pulmonary embolism and adverse events, and whom to contact, and that the GP is notified.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "pharmacist", "patient-or-carer"],
    where: ["ward", "theatre", "home"],
  },
  population: "Adults and young people aged 16 and over having surgery for cancer, as NICE NG89 scopes it; ITAC, ASH and ASCO address patients with cancer having surgery. The extended course of about four weeks applies to major cancer surgery in the abdomen (NICE) or the abdomen or pelvis (ITAC, ASH, Cochrane); ASH says its recommendation should not be extended to other operations. Thoracic, head and neck, orthopaedic, spinal and cranial operations have their own sections in NG89; children under 16 are outside it. For people at increased risk of VTE who are interrupting anticoagulant therapy, NICE says to consider prophylaxis; their plan is not covered here.",
  trigger: "Admission for cancer surgery.",
  steps: [
    {
      action: "Assess every surgical patient's risk of VTE and of bleeding as soon as possible after admission or by the first consultant review, using a published tool",
      why: "NICE asks for the risk of a clot to be weighed against the risk of bleeding for each person before blood-thinning drugs are offered.",
      source: "nice-ng89",
      quote: "Assess all surgical and trauma patients to identify the risk of VTE and bleeding:",
      grade: "[2018, amended 2021]",
    },
    {
      action: "Explain the risk of clots, why prevention is offered and its side effects, how to use stockings or leg pumps, and how to lower risk by drinking enough and moving",
      why: "NICE asks for this to be given by word of mouth and in writing before prophylaxis is offered, so that people can use it correctly.",
      source: "nice-ng89",
      quote: "For people admitted to hospital who are at increased risk of VTE, give them and their family members or carers (as appropriate) verbal and written information on the following before offering VTE prophylaxis:",
      grade: "[2018]",
    },
    {
      action: "Start mechanical prophylaxis, anti-embolism stockings or intermittent pneumatic compression, on admission and continue until mobility is no longer significantly reduced",
      why: "Leg pumps are designed to improve blood flow in the leg veins while you are less mobile. ITAC and ASH give mechanical methods a smaller part than NICE does; see the variants.",
      source: "nice-ng89",
      quote: "Start mechanical VTE prophylaxis on admission for people undergoing abdominal surgery. Choose either:",
      grade: "[2018]",
    },
    {
      action: "Do not offer anti-embolism stockings where they could damage the skin or circulation; measure the legs, fit the right size and remove them daily to check the skin",
      why: "NICE lists conditions in which stockings should not be offered, among them peripheral arterial disease, fragile skin and severe leg swelling, and says to stop them if the skin marks, blisters or changes colour.",
      source: "nice-ng89",
      quote: "Ensure that people who need anti-embolism stockings have their legs measured and that they are provided with the correct size of stocking. Anti-embolism stockings should be fitted and patients shown how to use them by staff trained in their use.",
      grade: "[2010]",
    },
    {
      action: "Add LMWH or fondaparinux for a minimum of 7 days after abdominal surgery when clot risk outweighs bleeding risk",
      why: "NICE asks for the injections to be added only where the risk of a clot outweighs the risk of bleeding. ITAC recommends at least 7 to 10 days, with once-daily LMWH or low-dose unfractionated heparin three times a day.",
      source: "nice-ng89",
      quote: "Add pharmacological VTE prophylaxis for a minimum of 7 days for people undergoing abdominal surgery whose risk of VTE outweighs their risk of bleeding, taking into account individual patient factors and according to clinical judgement.",
      grade: "[2018]",
    },
    {
      action: "Agree whether the first dose is given before or after the operation: ITAC recommends starting 2 to 12 hours before it, and ASH suggests starting after it",
      why: "The guidelines disagree. ASH saw no large advantage in a dose before surgery and took a cautious line because of bleeding and the practicalities of spinal or epidural anaesthesia.",
      source: "itac-2022",
      quote: "Use of low-molecular-weight-heparin (LMWH) once per day (when creatinine clearance is ≥30 mL/min) or low-dose unfractionated heparin three times per day is recommended to prevent postoperative VTE in patients with cancer; pharmacological prophylaxis should be started 2–12 h preoperatively and continued for at least 7–10 days; there are no data allowing conclusions regarding the superiority of one type of LMWH over another (grade 1A).",
      grade: "grade 1A",
    },
    {
      action: "If regional anaesthesia such as an epidural is used, plan the timing of anticoagulant doses to minimise the risk of epidural haematoma, following each drug's summary of product characteristics",
      why: "An epidural haematoma is bleeding around the spinal cord. NICE gives no intervals of its own and refers to the product information for the safe timing.",
      source: "nice-ng89",
      quote: "If regional anaesthesia is used, plan the timing of pharmacological VTE prophylaxis to minimise the risk of epidural haematoma.",
      grade: "[2010]",
    },
    {
      action: "For people with renal impairment, choose LMWH or unfractionated heparin and reduce the dose if needed, on multidisciplinary or senior opinion or a locally agreed protocol",
      why: "NICE defines renal impairment here as an eGFR below 30 ml/min/1.73 m². ASH says unfractionated heparin is generally preferred over LMWH when creatinine clearance is below 30 mL/min, and ITAC recommends LMWH when it is 30 mL/min or more.",
      source: "nice-ng89",
      quote: "If needed, reduce the dose of LMWH and UFH for people with renal impairment. Base the decision on multidisciplinary or senior opinion, or locally agreed protocols.",
      grade: "[2018]",
    },
    {
      action: "After major cancer surgery in the abdomen, consider continuing pharmacological prophylaxis to 28 days after the operation",
      why: "The Cochrane review reports that the risk of a clot stays raised for four to six weeks after surgery and that up to a third of clots occur after discharge. ITAC recommends four weeks after major abdominal or pelvic cancer surgery where bleeding risk is not high.",
      source: "nice-ng89",
      quote: "Consider extending pharmacological VTE prophylaxis to 28 days postoperatively for people who have had major cancer surgery in the abdomen.",
      grade: "[2018]",
    },
    {
      action: "Reassess clot and bleeding risk at consultant review and whenever the person's condition changes",
      why: "The balance between the risk of a clot and the risk of bleeding can shift during a hospital stay, so NICE asks for both to be looked at again.",
      source: "nice-ng89",
      quote: "Reassess all medical, surgical and trauma patients for risk of VTE and bleeding at the point of consultant review or if their clinical condition changes.",
      grade: "[2018]",
    },
    {
      action: "Before discharge on prophylaxis, teach how to give the injections and dispose of them, how long to continue, the signs of adverse events, and whom to contact",
      why: "A course that continues at home depends on the person, or someone helping them, being able to give it. ASH also asks for teaching in hospital, including how to self-inject.",
      source: "nice-ng89",
      quote: "Give people discharged with VTE prophylaxis and their family members or carers (as appropriate) verbal and written information on:",
      grade: "[2018]",
    },
    {
      action: "Tell everyone going home the signs and symptoms of a deep vein thrombosis and a pulmonary embolism, and the importance of seeking help if one is suspected",
      why: "NICE makes this part of the discharge plan for patients and their families or carers, in words and in writing.",
      source: "nice-ng89",
      quote: "the importance of seeking help if DVT, pulmonary embolism or other adverse events are suspected.",
      grade: "[2018]",
    },
    {
      action: "If a clot is suspected at home, get medical help as soon as possible: an urgent GP appointment or NHS 111 for a suspected DVT, and 999 or A&E if there is also breathlessness or chest pain",
      why: "A clot in the leg can travel to the lungs. The NHS lists throbbing pain or swelling in one leg, usually in the calf or thigh, among the symptoms of a DVT. Use the contact your own team gave you if they gave one.",
      source: "nhs-dvt",
      quote: "A pulmonary embolism can be life-threatening and needs treatment straight away.",
    },
  ],
  bestInClass: {
    statement: "Risk assessment for VTE and bleeding on admission, mechanical prophylaxis from admission, LMWH or fondaparinux for a minimum of 7 days after abdominal surgery where clot risk outweighs bleeding risk (NICE NG89 [2018]; ITAC 2022 says at least 7 to 10 days, grade 1A), and about four weeks of LMWH after major abdominal or pelvic cancer surgery. On that last point the guidelines agree in direction and differ in strength: ITAC 2022 recommends it at grade 1A for people not at high risk of bleeding, after laparotomy or laparoscopy; ASCO 2023 gives LMWH a strong recommendation for people who are candidates; NICE says 'consider' and names surgery in the abdomen; ASH 2021 suggests it as a conditional recommendation on very low certainty. Cochrane 2019 found moderate-quality evidence that it reduces VTE without increasing bleeding or mortality; most of the reduction is in clots found by scanning, and symptomatic VTE fell from 1.0% to 0.1%, a difference that approached but did not reach significance (OR 0.30, 95% CI 0.08 to 1.11). They disagree on when the first dose is given, on tablets, and on mechanical methods; see the variants.",
    sources: ["nice-ng89", "itac-2022", "asco-vte-2023", "ash-2021", "cochrane-extended-lmwh-2019"],
  },
  variants: [
    {
      name: "Apixaban or rivaroxaban tablets for the extended course",
      differs: "Replaces the later weeks of daily injections with an oral factor Xa inhibitor, after an initial period of LMWH or unfractionated heparin.",
      evidence: "ASCO 2023 added both as options with a weak recommendation on low-quality evidence, from two randomised trials it describes as having important limitations. In PROLAPS-II (582 patients after laparoscopic surgery for colorectal cancer, all given LMWH until study treatment began about 7 days after surgery, then rivaroxaban or placebo for 3 weeks) the composite outcome occurred in 1% against 3.9% and major bleeding in 0.7% against none. In a trial of 400 patients having surgery for suspected or confirmed gynaecological cancer (apixaban against enoxaparin for 28 days) major bleeding occurred in one patient in each arm and VTE in 1% against 1.5%. ITAC 2022, published the year before, judged the evidence insufficient to support direct oral anticoagulants (grade 2B) or fondaparinux (grade 2C) in place of LMWH; ITAC reports the doses in the gynaecological trial as apixaban 2.5 mg twice daily and enoxaparin 40 mg daily. ASH 2021 made no recommendation on them because it found no studies. NICE NG89 does not list them for abdominal surgery.",
      sources: ["asco-vte-2023", "itac-2022", "ash-2021", "nice-ng89"],
    },
    {
      name: "First dose before the operation, or after it",
      differs: "Starts the heparin 2 to 12 hours before surgery (ITAC), or only after surgery (ASH).",
      evidence: "ITAC 2022 recommends starting 2 to 12 hours preoperatively (grade 1A) and cites a meta-analysis of 12 mostly retrospective studies (14,273 patients) in gynaecological surgery in which a preoperative dose was associated with fewer clots (OR 0.59, 95% CI 0.39 to 0.89). ASH 2021 suggests postoperative over preoperative prophylaxis (conditional recommendation, low certainty), defining preoperative as a dose 12 hours or the evening before the procedure. NICE says to start as soon as possible and within 14 hours of the decision to admit unless its section for that operation says otherwise, and to plan timing around regional anaesthesia. ASH's own text says ASCO advises a preoperative start; ASCO's recommendation on this was not read.",
      sources: ["itac-2022", "ash-2021", "nice-ng89"],
    },
    {
      name: "Mechanical methods alone, or combined with injections",
      differs: "Uses stockings or leg pumps for everyone from admission (NICE), only with drugs or when drugs are contraindicated (ITAC), or according to bleeding and thrombosis risk (ASH).",
      evidence: "NICE NG89 starts mechanical prophylaxis on admission for abdominal surgery and adds a drug where clot risk outweighs bleeding risk. ITAC 2022 does not recommend mechanical methods as monotherapy except when pharmacological methods are contraindicated (grade 2A). ASH 2021 suggests pharmacological rather than mechanical prophylaxis at lower bleeding risk, mechanical rather than pharmacological at high bleeding risk, and a combination for people at high risk of thrombosis who are not at high risk of bleeding (conditional recommendations, low or very low certainty).",
      sources: ["nice-ng89", "itac-2022", "ash-2021"],
    },
    {
      name: "Which injection: LMWH, fondaparinux or unfractionated heparin",
      differs: "Names different alternatives to LMWH.",
      evidence: "NICE NG89 offers LMWH or fondaparinux for abdominal surgery. ASH 2021 suggests LMWH or fondaparinux rather than unfractionated heparin (conditional recommendation, low certainty), and LMWH if the course will continue at home. ITAC 2022 recommends once-daily LMWH or low-dose unfractionated heparin three times a day (grade 1A), the highest prophylactic dose of LMWH (grade 1A), and finds insufficient evidence for fondaparinux as an alternative (grade 2C); as guidance without a grade it says a higher dose of LMWH should be considered for cancer surgery in people who are obese.",
      sources: ["nice-ng89", "ash-2021", "itac-2022"],
    },
  ],
  grades: [
    { claim: "Offer VTE prophylaxis for abdominal surgery at increased risk", grade: "[2018] (NICE does not grade)", source: "nice-ng89", quote: "Offer VTE prophylaxis to people undergoing abdominal (gastrointestinal, gynaecological, urological) surgery who are at increased risk of VTE." },
    { claim: "Consider extending pharmacological prophylaxis to 28 days after major cancer surgery in the abdomen", grade: "[2018] (NICE does not grade)", source: "nice-ng89", quote: "Consider extending pharmacological VTE prophylaxis to 28 days postoperatively for people who have had major cancer surgery in the abdomen." },
    { claim: "Four weeks of LMWH after major abdominal or pelvic surgery in people with cancer not at high risk of bleeding", grade: "grade 1A", source: "itac-2022", quote: "Extended prophylaxis (4 weeks) with LMWH to prevent postoperative VTE after major abdominal or pelvic surgery (either laparotomy or laparoscopy) is recommended in patients with cancer who do not have a high risk of bleeding (grade 1A)." },
    { claim: "Continue pharmacological prophylaxis after discharge following major abdominal or pelvic surgery", grade: "conditional recommendation, very low certainty in the evidence of effects", source: "ash-2021", quote: "For patients with cancer who had undergone a major abdominal/pelvic surgical procedure, the ASH guideline panel suggests continuing pharmacological thromboprophylaxis postdischarge rather than discontinuing at the time of hospital discharge (conditional recommendation, very low certainty in the evidence of effects ⊕◯◯◯)." },
    { claim: "LMWH for the extended course in people who are candidates for it", grade: "Evidence quality: High; Strength of recommendation: Strong", source: "asco-vte-2023", quote: "Patients who are candidates for extended pharmacologic thromboprophylaxis after surgery may be offered prophylactic doses of low molecular weight heparin (LMWH) (Type: Evidence based; Evidence quality: High; Strength of recommendation: Strong)." },
    { claim: "Rivaroxaban or apixaban for the extended course, after an initial period of LMWH or UFH", grade: "Evidence quality: Low; Strength of recommendation: Weak", source: "asco-vte-2023", quote: "Alternatively, patients may be offered prophylactic doses of rivaroxaban or apixaban after an initial period of LMWH or unfractionated heparin (UFH) (Type: Evidence based; Evidence quality: Low; Strength of recommendation: Weak)." },
    { claim: "Fondaparinux or direct oral anticoagulants as an alternative to LMWH after cancer surgery: insufficient evidence", grade: "grade 2C (fondaparinux); grade 2B (direct oral anticoagulants)", source: "itac-2022", quote: "There is insufficient evidence to support fondaparinux (grade 2C) or direct oral anticoagulants (grade 2B) as an alternative to LMWH for the prophylaxis of postoperative VTE in patients with cancer." },
    { claim: "Start after rather than before the operation", grade: "conditional recommendation, low certainty in the evidence of effects", source: "ash-2021", quote: "For patients with cancer undergoing a surgical procedure, the ASH guideline panel suggests using postoperative thromboprophylaxis over preoperative thromboprophylaxis (conditional recommendation, low certainty in the evidence of effects ⊕⊕◯◯)." },
    { claim: "LMWH or fondaparinux rather than unfractionated heparin", grade: "conditional recommendation, low certainty in the evidence of effects", source: "ash-2021", quote: "For patients with cancer undergoing a surgical procedure, the ASH guideline panel suggests using LMWH or fondaparinux for thromboprophylaxis rather than UFH (conditional recommendation, low certainty in the evidence of effects ⊕⊕◯◯)." },
    { claim: "Mechanical methods not as the only method unless drugs are contraindicated", grade: "grade 2A", source: "itac-2022", quote: "Mechanical methods are not recommended as monotherapy except when pharmacological methods are contraindicated (grade 2A)." },
    { claim: "Highest prophylactic dose of LMWH after cancer surgery", grade: "grade 1A", source: "itac-2022", quote: "Use of the highest prophylactic dose of LMWH to prevent postoperative VTE in patients with cancer is recommended (grade 1A)." },
    { claim: "LMWH for at least 14 days reduced VTE from 13.2% to 5.3% after major abdominal or pelvic surgery (7 trials, 1728 participants)", grade: "moderate-quality evidence", source: "cochrane-extended-lmwh-2019", quote: "Prolonged thromboprophylaxis with LMWH significantly reduces the risk of VTE compared to thromboprophylaxis during hospital admittance only, without increasing bleeding complications or mortality after major abdominal or pelvic surgery." },
    { claim: "Consider prophylaxis for thoracic surgery at increased risk", grade: "[2018] (NICE does not grade)", source: "nice-ng89", quote: "Consider VTE prophylaxis for people undergoing thoracic surgery who are at increased risk of VTE." },
  ],
  sources: [
    {
      key: "nice-ng89",
      label: "Venous thromboembolism in over 16s: reducing the risk of hospital-acquired deep vein thrombosis or pulmonary embolism (NG89), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng89/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended. Published March 2018, last updated August 2019, with wording clarifications to January and May 2021; reviewed in September 2024, when NICE decided not to update it.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "itac-2022",
      label: "2022 international clinical practice guidelines for the treatment and prophylaxis of venous thromboembolism in patients with cancer, including patients with COVID-19",
      publisher: "International Initiative on Thrombosis and Cancer (The Lancet Oncology)",
      year: 2022,
      url: "https://doi.org/10.1016/S1470-2045(22)00160-7",
      doi: "10.1016/S1470-2045(22)00160-7",
      gradingScheme: "GRADE: strong (grade 1) or weak (grade 2) recommendation, with evidence high (A), moderate (B), low (C) or very low (D); 'guidance' marks best clinical practice by expert consensus where evidence is lacking.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "ash-2021",
      label: "American Society of Hematology 2021 guidelines for management of venous thromboembolism: prevention and treatment in patients with cancer",
      publisher: "American Society of Hematology (Blood Advances)",
      year: 2021,
      url: "https://doi.org/10.1182/bloodadvances.2020003442",
      doi: "10.1182/bloodadvances.2020003442",
      gradingScheme: "GRADE: strong ('the guideline panel recommends') or conditional ('the guideline panel suggests') recommendations, each with the certainty in the evidence of effects (high, moderate, low or very low).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "asco-vte-2023",
      label: "Venous Thromboembolism Prophylaxis and Treatment in Patients With Cancer: ASCO Guideline Update",
      publisher: "ASCO (Journal of Clinical Oncology)",
      year: 2023,
      url: "https://doi.org/10.1200/JCO.23.00294",
      doi: "10.1200/JCO.23.00294",
      gradingScheme: "ASCO: type of recommendation, evidence quality (high, intermediate, low or insufficient) and strength of recommendation (strong, moderate or weak), printed after each recommendation.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cochrane-extended-lmwh-2019",
      label: "Prolonged thromboprophylaxis with low molecular weight heparin for abdominal or pelvic surgery",
      publisher: "Cochrane Database of Systematic Reviews",
      year: 2019,
      url: "https://doi.org/10.1002/14651858.CD004318.pub5",
      doi: "10.1002/14651858.CD004318.pub5",
      gradingScheme: "GRADE quality of evidence: high, moderate, low or very low.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-dvt",
      label: "DVT (deep vein thrombosis)",
      publisher: "NHS",
      year: 2026,
      url: "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-vte-2023",
      label: "Venous thromboembolism in cancer patients: ESMO Clinical Practice Guideline",
      publisher: "ESMO (Annals of Oncology)",
      year: 2023,
      url: "https://doi.org/10.1016/j.annonc.2022.12.014",
      doi: "10.1016/j.annonc.2022.12.014",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["colorectal", "ovarian", "endometrial", "gastric", "pancreatic"],
  drugs: ["apixaban", "rivaroxaban"],
  technologies: ["cancer-associated-thrombosis"],
  terms: ["vte"],
  related: [],
  upgrades: ["idea-pu-extended-clot-prevention-after-surgery"],
  gaps: [
    "The ESMO 2023 VTE guideline could not be read: on 17 November 2026 the publisher answered a script with a browser check, the Internet Archive held only that check, and Europe PMC has no abstract. Its position on surgical prophylaxis is not represented here.",
    "On 17 November 2026 only the 2023 ASCO update was read. It prints the new recommendation 3.7; recommendations 3.1 to 3.6, carried over from the 2019 guideline, include who counts as a candidate for the extended course and when ASCO starts prophylaxis, and the archived copy of the 2019 guideline was a refusal page. The 2023 update describes itself as pending a full update; no later ASCO edition was found.",
    "No source read gives prophylactic doses of LMWH, fondaparinux or unfractionated heparin in milligrams or units, or the interval in hours between a dose and placing or removing an epidural catheter. NICE refers to each drug's summary of product characteristics, ITAC says only 'the highest prophylactic dose', and adjustments for kidney function and body weight are left to senior opinion and local protocols. The apixaban and enoxaparin doses on this page are those ITAC reports from one trial, not a recommendation.",
    "NICE NG89 (2018, last updated 2019) names LMWH or fondaparinux. NICE reviewed the guideline in September 2024 and decided not to update it; it does not list oral factor Xa inhibitors for abdominal surgery.",
    "The Cochrane review counted clots confirmed by objective tests, including scans. Only one of its seven trials was in laparoscopic surgery, and the result held when that trial was left out (13.8% against 6.0%, 6 trials, 1503 participants); the review says the laparoscopic trial was too small to compare open with minimally invasive surgery and calls for trials under enhanced recovery. ITAC nonetheless extends its grade 1A recommendation to laparoscopy, citing a later meta-analysis (18 studies, 7495 patients) in which symptomatic VTE was 1.0% against 2.0% (RR 0.48, 95% CI 0.31 to 0.74).",
    "An erratum to the ASH 2021 guideline exists (10.1182/bloodadvances.2021004734). The PubMed Central copy read is marked as corrected; the text of the erratum did not come back from the NCBI API on 17 November 2026, so what it changed was not checked.",
    "The NHS page gives the symptoms of a clot and how quickly to seek help for the general public. No source read gives a symptom list or time limit specific to people sent home on injections after cancer surgery, or a list of bleeding signs to report; NICE asks only that people are told the signs of adverse events and whom to contact.",
    "Use is low where it has been measured: the linked upgrade idea cites a US study of 23,527 Medicare patients over 64 having colorectal cancer resection in 2016 and 2017, of whom 4.7% received extended prophylaxis.",
  ],
});
