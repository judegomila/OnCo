import { protocol } from "./helpers";

/*
 * Preventing blood clots (venous thromboembolism) around and after cancer surgery, including extended prophylaxis to 28
 * days after major abdominal or pelvic cancer surgery.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG89, Venous thromboembolism in over 16s (published March 2018, last updated August 2019): recommendations
 *   page, full text. Each recommendation carries the year it was written ([2010], [2018], [2018, amended 2021]).
 * - ASCO guideline update, VTE prophylaxis and treatment in patients with cancer (Key et al., J Clin Oncol 2023):
 *   abstract only (the publisher served a bot challenge to a script).
 * - Cochrane review CD004318.pub5 (Felder et al., 2019), prolonged LMWH after abdominal or pelvic surgery: abstract
 *   (Europe PMC); the full review was not read.
 * - ESMO Clinical Practice Guideline, VTE in cancer patients (Falanga et al., Ann Oncol 2023): not reachable (no abstract
 *   in Europe PMC, the publisher refused a script). No step rests on it.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const vteProphylaxisAfterCancerSurgery = protocol({
  id: "vte-prophylaxis-after-cancer-surgery",
  name: "Blood clot prevention around cancer surgery, including extended prophylaxis after major abdominal and pelvic operations",
  aka: ["VTE prophylaxis", "thromboprophylaxis", "extended thromboprophylaxis", "28 days of heparin injections after surgery", "DVT prevention after cancer surgery", "blood thinner injections after surgery", "anti-embolism stockings"],
  domain: "surgery-perioperative",
  tldr: "Cancer and major surgery both raise the risk of blood clots in the legs and lungs. Before the operation the team should assess your risk of clots and of bleeding, use stockings or leg pumps, and usually give blood-thinning injections. After major cancer surgery in the abdomen or pelvis these are often continued at home for four weeks, because many clots happen after discharge.",
  simple: "After a big cancer operation you may be asked to keep giving yourself a small blood-thinning injection each day for about four weeks. It lowers the chance of a clot. Tell your team about calf pain or swelling, sudden breathlessness or chest pain, or any unusual bleeding.",
  summary: "NICE NG89 (2018, updated 2019) asks for every surgical patient's VTE and bleeding risk to be assessed on admission with a published tool and reassessed at consultant review or when their condition changes. For abdominal (gastrointestinal, gynaecological, urological) surgery at increased risk, mechanical prophylaxis (anti-embolism stockings or intermittent pneumatic compression) starts on admission and continues until mobility returns, and LMWH or fondaparinux is added for at least 7 days where clot risk outweighs bleeding risk. NICE says to consider extending pharmacological prophylaxis to 28 days after major cancer surgery in the abdomen. For thoracic surgery the same pattern is 'consider'. ASCO (2023 update) added apixaban and rivaroxaban as options for extended prophylaxis after cancer surgery, with a weak recommendation. The Cochrane review (2019; 7 RCTs, 1728 participants, benign and malignant disease) found extended LMWH reduced VTE after major abdominal or pelvic surgery from 13.2% to 5.3% (OR 0.38, 95% CI 0.26 to 0.54, moderate-quality evidence), mostly clots found by scanning, with no difference in bleeding or mortality. Before discharge, people should be shown how to inject and dispose of needles, told how long to continue, and told the signs of DVT, pulmonary embolism and bleeding.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "pharmacist", "patient-or-carer"],
    where: ["ward", "theatre", "home"],
  },
  population: "Adults and young people aged 16 and over having surgery for cancer, as NICE NG89 scopes it; the extended 28-day course applies to major cancer surgery in the abdomen (NICE) or abdomen and pelvis (Cochrane, ASCO). Thoracic, head and neck, orthopaedic and neurosurgical operations have their own sections in NG89; children under 16 are outside it. People already on anticoagulants need a bridging plan instead.",
  trigger: "Admission for cancer surgery.",
  steps: [
    {
      action: "Assess every surgical patient's risk of VTE and of bleeding on admission or by the first consultant review, using a published tool",
      why: "Prevention is only worth its bleeding risk in people whose clot risk is high enough, and a structured tool means nobody is missed.",
      source: "nice-ng89",
      quote: "Assess all surgical and trauma patients to identify the risk of VTE and bleeding:",
      grade: "[2018, amended 2021]",
    },
    {
      action: "Explain the risk of clots, why prevention is offered and its side effects, how to use stockings or leg pumps, and how to lower risk by drinking enough and moving",
      why: "People who understand why they need the injections and stockings are more likely to keep using them.",
      source: "nice-ng89",
      quote: "For people admitted to hospital who are at increased risk of VTE, give them and their family members or carers (as appropriate) verbal and written information on the following before offering VTE prophylaxis:",
      grade: "[2018]",
    },
    {
      action: "Start mechanical prophylaxis, anti-embolism stockings or intermittent pneumatic compression, on admission and continue until mobility is back to normal",
      why: "Squeezing the legs keeps blood moving while you are less active, without any bleeding risk.",
      source: "nice-ng89",
      quote: "Start mechanical VTE prophylaxis on admission for people undergoing abdominal surgery. Choose either:",
      grade: "[2018]",
    },
    {
      action: "Do not use anti-embolism stockings where they could damage the skin or circulation; measure the legs, fit the right size and check the skin daily",
      why: "Badly fitting stockings can cause pressure sores, and they are unsafe with some skin and arterial conditions.",
      source: "nice-ng89",
      quote: "Ensure that people who need anti-embolism stockings have their legs measured and that they are provided with the correct size of stocking. Anti-embolism stockings should be fitted and patients shown how to use them by staff trained in their use.",
      grade: "[2010]",
    },
    {
      action: "Add LMWH or fondaparinux for at least 7 days after abdominal surgery when clot risk outweighs bleeding risk",
      why: "Blood-thinning injections reduce clots after major surgery more than stockings alone.",
      source: "nice-ng89",
      quote: "Add pharmacological VTE prophylaxis for a minimum of 7 days for people undergoing abdominal surgery whose risk of VTE outweighs their risk of bleeding, taking into account individual patient factors and according to clinical judgement.",
      grade: "[2018]",
    },
    {
      action: "If regional anaesthesia such as an epidural is used, time the anticoagulant doses to keep the risk of a spinal bleed low",
      why: "A blood thinner given too close to placing or removing an epidural catheter can cause bleeding around the spinal cord.",
      source: "nice-ng89",
      quote: "If regional anaesthesia is used, plan the timing of pharmacological VTE prophylaxis to minimise the risk of epidural haematoma.",
      grade: "[2010]",
    },
    {
      action: "After major cancer surgery in the abdomen or pelvis, consider continuing pharmacological prophylaxis for 28 days after the operation",
      why: "Cancer keeps clot risk high for weeks after surgery, and many clots appear after people have gone home.",
      source: "nice-ng89",
      quote: "Consider extending pharmacological VTE prophylaxis to 28 days postoperatively for people who have had major cancer surgery in the abdomen.",
      grade: "[2018]",
    },
    {
      action: "Reassess clot and bleeding risk at consultant review and whenever the person's condition changes",
      why: "A new bleed, a return to theatre or a fall in platelets can change whether blood thinners are still safe.",
      source: "nice-ng89",
      quote: "Reassess all medical, surgical and trauma patients for risk of VTE and bleeding at the point of consultant review or if their clinical condition changes.",
      grade: "[2018]",
    },
    {
      action: "Before discharge on prophylaxis, teach how to give the injections and dispose of needles, how long to continue, the side effects to watch for, and whom to contact",
      why: "Four weeks of daily injections at home only work if people know how to do them and why to finish the course.",
      source: "nice-ng89",
      quote: "Give people discharged with VTE prophylaxis and their family members or carers (as appropriate) verbal and written information on:",
      grade: "[2018]",
    },
    {
      action: "Tell everyone going home the signs of a deep vein thrombosis and a pulmonary embolism, and to seek help at once if they appear",
      why: "Calf pain or swelling, sudden breathlessness or chest pain need urgent treatment.",
      source: "nice-ng89",
      quote: "the importance of seeking help if DVT, pulmonary embolism or other adverse events are suspected.",
      grade: "[2018]",
    },
  ],
  bestInClass: {
    statement: "Risk assessment for VTE and bleeding on admission, mechanical prophylaxis from admission, LMWH or fondaparinux for at least 7 days after abdominal surgery, and extended pharmacological prophylaxis to 28 days after major abdominal or pelvic cancer surgery (NICE NG89 'consider' [2018]; Cochrane 2019, moderate-quality evidence that it reduces VTE without increasing bleeding or mortality). ASCO 2023 adds apixaban or rivaroxaban tablets as options for the extended course, with a weak recommendation, where NICE names only LMWH or fondaparinux. Most of the reduction in the trials is in clots found by scanning; symptomatic VTE fell from 1.0% to 0.1%, a difference that did not reach significance.",
    sources: ["nice-ng89", "cochrane-extended-lmwh-2019", "asco-vte-2023"],
  },
  variants: [
    {
      name: "Apixaban or rivaroxaban tablets for the extended course",
      differs: "Replaces four weeks of daily injections with an oral factor Xa inhibitor after cancer surgery.",
      evidence: "ASCO 2023 added both as options with a weak strength of recommendation, on two randomised trials that its abstract describes as having important limitations but suggesting safety and effectiveness. NICE NG89 does not list them for abdominal surgery.",
      sources: ["asco-vte-2023", "nice-ng89"],
    },
  ],
  grades: [
    { claim: "Offer VTE prophylaxis for abdominal surgery at increased risk", grade: "[2018] (NICE does not grade)", source: "nice-ng89", quote: "Offer VTE prophylaxis to people undergoing abdominal (gastrointestinal, gynaecological, urological) surgery who are at increased risk of VTE." },
    { claim: "Consider extending pharmacological prophylaxis to 28 days after major abdominal cancer surgery", grade: "[2018] (NICE does not grade)", source: "nice-ng89" },
    { claim: "Extended LMWH reduced VTE from 13.2% to 5.3% after major abdominal or pelvic surgery", grade: "moderate-quality evidence", source: "cochrane-extended-lmwh-2019" },
    { claim: "Apixaban and rivaroxaban as options for extended prophylaxis after cancer surgery", grade: "weak strength of recommendation", source: "asco-vte-2023", quote: "Apixaban and rivaroxaban were added as options for extended pharmacologic thromboprophylaxis after cancer surgery, with a weak strength of recommendation." },
    { claim: "Consider prophylaxis for thoracic surgery at increased risk", grade: "[2018] (NICE does not grade)", source: "nice-ng89", quote: "Consider VTE prophylaxis for people undergoing thoracic surgery who are at increased risk of VTE." },
  ],
  sources: [
    {
      key: "nice-ng89",
      label: "Venous thromboembolism in over 16s: reducing the risk of hospital-acquired deep vein thrombosis or pulmonary embolism (NG89), recommendations",
      publisher: "NICE",
      year: 2018,
      url: "https://www.nice.org.uk/guidance/ng89/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended. Published March 2018, last updated August 2019.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "asco-vte-2023",
      label: "Venous Thromboembolism Prophylaxis and Treatment in Patients With Cancer: ASCO Guideline Update",
      publisher: "ASCO (Journal of Clinical Oncology)",
      year: 2023,
      url: "https://doi.org/10.1200/JCO.23.00294",
      doi: "10.1200/JCO.23.00294",
      gradingScheme: "ASCO: strength of recommendation (strong or weak) and quality of evidence (high, intermediate, low).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "cochrane-extended-lmwh-2019",
      label: "Prolonged thromboprophylaxis with low molecular weight heparin for abdominal or pelvic surgery",
      publisher: "Cochrane Database of Systematic Reviews",
      year: 2019,
      url: "https://doi.org/10.1002/14651858.CD004318.pub5",
      doi: "10.1002/14651858.CD004318.pub5",
      gradingScheme: "GRADE quality of evidence: high, moderate, low or very low.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-vte-2023",
      label: "Venous thromboembolism in cancer patients: ESMO Clinical Practice Guideline",
      publisher: "ESMO (Annals of Oncology)",
      year: 2023,
      url: "https://doi.org/10.1016/j.annonc.2022.12.014",
      doi: "10.1016/j.annonc.2022.12.014",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["colorectal", "ovarian", "endometrial", "gastric", "pancreatic"],
  drugs: ["apixaban", "rivaroxaban"],
  technologies: ["cancer-associated-thrombosis"],
  terms: ["vte"],
  related: [],
  upgrades: ["idea-pu-extended-clot-prevention-after-surgery"],
  gaps: [
    "The ESMO 2023 VTE guideline could not be read (no abstract in Europe PMC, the publisher refused a script), and the ASCO 2023 update and the Cochrane review were read as abstracts only. What ASCO and ESMO define as the high-risk features that call for extended prophylaxis is not on this page.",
    "NICE NG89 (2018, updated 2019) names LMWH or fondaparinux; whether it will add oral factor Xa inhibitors for surgical prophylaxis is not known.",
    "The Cochrane review counted clots confirmed by objective tests, including scans, and ran a sensitivity analysis limited to open surgery. Whether the benefit holds for symptomatic clots, and after laparoscopic or robotic surgery with enhanced recovery, is not settled in the sources read; some centres stop prophylaxis at discharge after minimally invasive surgery, but no source read states that as policy.",
    "Doses of LMWH and adjustments for kidney function and body weight come from the product information and local policy and are not given here.",
    "Use is low where it has been measured: the linked upgrade idea cites a US claims study in which 4.7% of eligible older patients received extended prophylaxis after colorectal cancer resection.",
  ],
});
