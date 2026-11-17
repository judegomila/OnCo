import { protocol } from "./helpers";

/*
 * Looking after a closed suction wound drain at home after cancer surgery (breast, armpit, neck, abdomen): going home
 * with it, emptying and measuring, the exit site, antibiotics, when it comes out and when to call.
 *
 * The evidence is thin and this record says so. Only two guideline bodies that could be read say anything about a
 * wound drain after it is placed: WHO (antibiotics and timing of removal, both conditional) and NICE (wound care and
 * information in general, not drains by name). Nearly all the trial evidence is from breast and armpit surgery. No
 * guideline read states how often to empty a drain, a volume at which it should come out, or when to shower with one
 * in; those appear as variants from a hospital leaflet, not as sourced steps.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - WHO Global guidelines for the prevention of surgical site infection, second edition (2018, the current edition):
 *   full text, PDF from iris.who.int with pdftotext; section 4.26 on drains read in full. GRADE, quoted as printed.
 * - NICE NG125, Surgical site infections: prevention and treatment (published 11 April 2019, last updated 19 August
 *   2020): recommendations page, HTML, full text. Each recommendation carries its year tag. It does not mention
 *   wound drains left in after surgery.
 * - American Society of Breast Surgeons, Consensus Guideline on Preoperative Antibiotics and Surgical Site Infection
 *   in Breast Surgery (approved 22 June 2017, copyright 2018): full text, PDF from breastsurgeons.org. Ungraded.
 * - Wells et al., Br J Cancer 2004, randomised trial of nurse-led early discharge with drains in place: full text,
 *   Europe PMC XML (PMC2364768).
 * - Taha et al., Cureus 2023, meta-analysis of antiseptic treatment of drains: full text, Europe PMC XML (PMC10407596).
 * - Abstracts only (Europe PMC): Cochrane CD006823.pub2 (2013, drains after axillary dissection; the full-text XML
 *   returned an error), Cochrane CD007258.pub3 (2015, drains after plastic and reconstructive breast surgery), Thomson
 *   2016 and Shima 2021 (meta-analyses of when to remove a drain), Degnim 2013 and Rivera-Buendia 2019 (trials of
 *   antiseptic at the drain), Sattar 2023 (trial of antibiotics while drains are in), Sethia 2021 (drain removal at
 *   home after head and neck surgery).
 * - Leaflet, variant only: Memorial Sloan Kettering Cancer Center, Caring for Your Jackson-Pratt Drain (last updated
 *   6 November 2026), HTML, full text.
 * - Not readable or not found: the CDC guideline for the prevention of surgical site infection (2017; jamanetwork.com
 *   returned 403). The ERAS Society breast reconstruction review does not grade drain management, as the neighbouring
 *   OnCo protocol records. No guideline on drains after abdominal or head and neck cancer surgery was found to read.
 *   No step rests on any of these.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed.
 */
export const surgicalDrainCareAtHomeAfterCancerSurgery = protocol({
  id: "surgical-drain-care-at-home-after-cancer-surgery",
  name: "Surgical drain care at home after cancer surgery: emptying, measuring, site care and removal",
  aka: ["wound drain care", "going home with a drain", "Jackson-Pratt drain care", "JP drain", "drain bulb", "Redivac drain", "closed suction drain", "drain after mastectomy", "axillary drain", "neck drain", "drain removal"],
  domain: "surgery-perioperative",
  tldr: "A wound drain is a thin tube that carries fluid from under the wound into a small bottle or bulb, and many people go home with one after cancer surgery. You are taught to empty it, record the amount, keep the skin clean and know whom to call. Guidelines set no day or amount for removal: trials show earlier removal means more fluid collecting afterwards but no more infections.",
  simple: "A drain is a small tube that takes fluid away from your wound into a bottle. At home you empty it, measure the fluid and write it down. Your team decides when it comes out. Call them if the skin around the tube gets red, hot, swollen or leaks pus, or if you have a fever.",
  summary: "Evidence is limited and mostly from breast and axillary surgery. A randomised trial in 108 women (Wells 2004) found nurse-led discharge within 36 hours of axillary clearance with drains in place safe, with fewer wound infections at two weeks than a conventional stay. WHO (2018) makes two conditional recommendations: do not continue antibiotic prophylaxis because a drain is present (low quality evidence), and remove the drain when clinically indicated, with no optimal timing identified (very low quality). The American Society of Breast Surgeons consensus (2018) reproduces plastic surgery guidance that leaves antibiotics with a drain beside an implant to physician preference, so the two differ for implant reconstruction. Meta-analyses (Thomson 2016, Shima 2021) find more seroma with early or time-limited removal and no difference in infection. NICE NG125 covers wound care information, aseptic dressing changes and how to recognise infection, without naming drains. How often to empty, a removal volume (commonly 30 to 50 ml in 24 hours), milking the tubing and showering with a drain in place rest on local leaflets and are shown as variants. Antiseptic dressings at the exit site reduce bacterial colonisation in small trials and are not in guidelines. The reader's own surgical team's drain instructions come first.",
  asOf: "2026-11-16",
  setting: {
    who: ["patient-or-carer", "nurse", "surgical-team"],
    where: ["home", "community", "ward", "outpatient-clinic", "telephone-triage"],
  },
  population: "Adults going home with a closed suction wound drain after cancer surgery. The trial and review evidence is almost all from breast and axillary surgery; WHO notes that its evidence on drain removal came from breast and orthopaedic surgery only. For drains after head and neck surgery one case series was read, and for abdominal drains nothing specific could be read, so those rest on the general recommendations alone. Chest drains, drains into the abdomen for ascites, indwelling pleural catheters and biliary drains are different devices with their own protocols. Your own surgical team's instructions for your drain come first.",
  trigger: "A person is to be discharged with a wound drain still in place after cancer surgery.",
  steps: [
    {
      action: "Before discharge, teach the person and a carer to manage the drain, and arrange nurse contact at home",
      why: "In a randomised trial, women who went home within 36 hours with their drains in, supported by nurses, did as well as those who stayed in hospital until the drains came out, and most would choose it again.",
      source: "wells-2004",
      quote: "Nurse-led early discharge had no adverse effects on quality of life or patient satisfaction, had little effect on carer burden, improved communication between primary and secondary care, reduced cancellations and was safely implemented in a mixed rural/urban setting.",
      grade: "Randomised controlled trial, 108 patients (not graded)",
    },
    {
      action: "Give written information on caring for the wound and the drain site at home",
      why: "People remember little of what they are told on the day they leave hospital, and a carer may be the one doing the care.",
      source: "nice-ng125",
      quote: "Offer patients and carers information and advice on how to care for their wound after discharge.",
      grade: "[2008]",
    },
    {
      action: "Empty the drain as taught, measure the fluid each time, write down the amount, and restore the suction before closing it",
      why: "The daily amount is what the team uses to decide when the drain can come out, and the drain only works while its bulb or bottle is under suction.",
      practice: "No guideline or trial that could be read states how often to empty a drain or how to record it; every source assumes it, since removal decisions in the trials rest on measured daily volume. Hospital leaflets give the detail (Memorial Sloan Kettering: twice a day, with a written log; see variants).",
    },
    {
      action: "Use an aseptic non-touch technique whenever the dressing at the drain site is changed",
      why: "The tube passes through the skin into the wound, so the exit site is a route for germs.",
      source: "nice-ng125",
      quote: "Use an aseptic non-touch technique for changing or removing surgical wound dressings.",
      grade: "[2008]",
    },
    {
      action: "Do not continue antibiotics after the operation only because a drain is in place",
      why: "Trials found that longer antibiotics did not reduce wound infection while a drain was in, and antibiotics carry their own harms, including resistant infections.",
      source: "who-ssi-2018",
      quote: "The panel suggests that perioperative antibiotic prophylaxis should not be continued to the presence of a wound drain for the purpose of preventing SSI.",
      grade: "Conditional recommendation, low quality of evidence",
    },
    {
      action: "Make sure the person knows the signs of wound infection and whom to contact: spreading redness, heat, swelling, pus or fever",
      why: "An infection around a drain is easier to treat when it is caught early, and people at home need a number to ring.",
      source: "nice-ng125",
      quote: "Offer patients and carers information and advice about how to recognise a surgical site infection and who to contact if they are concerned.",
      grade: "[2008]",
    },
    {
      action: "Remove the drain when it is clinically indicated, as judged by the surgical team, rather than on a fixed day for everyone",
      why: "No trial has shown a best day or amount for taking a drain out, so the decision is made for each person.",
      source: "who-ssi-2018",
      quote: "The panel suggests removing the wound drain when clinically indicated. No evidence was found to recommend an optimal timing of wound drain removal for the purpose of preventing SSI.",
      grade: "Conditional recommendation, very low quality of evidence",
    },
    {
      action: "When discussing removal, explain the trade-off: an earlier removal means the drain is out sooner but fluid is more likely to collect and need drawing off",
      why: "Pooled trials after breast surgery found more fluid collections (seromas) with early removal and no more infections, so the choice depends on what matters most to the person.",
      source: "shima-2021",
      quote: "Seroma formation was significantly higher in patients who had early drain removal.",
      grade: "Systematic review and meta-analysis of 11 studies (not graded)",
    },
  ],
  bestInClass: {
    statement: "Going home with the drain in place after teaching and with nurse support (one randomised trial after axillary clearance, Wells 2004), written wound care information and advice on recognising infection (NICE NG125), aseptic non-touch dressing changes (NICE NG125), and removal when clinically indicated, with no best timing established (WHO 2018, conditional, very low quality). On antibiotics the bodies differ. WHO suggests that prophylaxis should not be continued because a drain is present (conditional, low quality; seven trials). The American Society of Breast Surgeons consensus (2018) reproduces American Society of Plastic Surgeons guidance that, with a drain near a breast implant, the role of antibiotics is less clear and is left to physician preference, while also reporting a trial in which 24 hours of antibiotics did no worse than antibiotics until drain removal. A later placebo-controlled trial after mastectomy without reconstruction (369 patients, Sattar 2023) found no benefit from continuing antibiotics while drains were in. Both positions are shown. Nothing that could be read sets how often to empty a drain, a removal volume, or showering rules.",
    sources: ["who-ssi-2018", "nice-ng125", "wells-2004", "asbrs-2018", "sattar-2023"],
  },
  variants: [
    {
      name: "Removal at a set daily volume (hospital leaflet)",
      differs: "Many units take the drain out once the amount falls below a set volume in 24 hours. Memorial Sloan Kettering's leaflet says: \"Call your care team if your drainage is 30 milliliters (mL) or less in a 24-hour period.\" In the trials WHO reviewed, late removal was defined as a volume below 30 or 50 ml a day, or as a day between 2 and 10.",
      evidence: "No guideline read sets a volume. WHO found very low quality evidence from 11 trials that early removal neither helps nor harms infection rates and identified no optimal time. A meta-analysis of six studies after axillary surgery (Thomson 2016) compared removal before five days with volume rules of under 20 to under 50 ml in 24 hours: seroma was 2.54 times more likely with early removal and infection no different. A proposal to test removal rules on outcomes that matter to patients is linked under upgrades.",
      sources: ["mskcc-jackson-pratt", "who-ssi-2018", "thomson-2016"],
    },
    {
      name: "Antibiotics continued until the drain is out",
      differs: "Some surgeons, most often after implant reconstruction, prescribe antibiotics for as long as a drain stays in. The American Society of Breast Surgeons consensus reproduces plastic surgery guidance: \"if a drain is present, the role of antibiotics is less clear and should be left to physician preference.\"",
      evidence: "WHO suggests against it (conditional, low quality evidence from seven trials). The breast surgeons' consensus reports a non-inferiority trial of 112 patients having implant reconstruction in which infection was 19.4% with 24 hours of antibiotics and 22.0% with antibiotics until drain removal (p = 0.82). After mastectomy without reconstruction, a placebo-controlled trial in 369 patients found no reduction in infection at 30 or 90 days from continuing cephalexin while drains were in (Sattar 2023, abstract).",
      sources: ["asbrs-2018", "who-ssi-2018", "sattar-2023"],
    },
    {
      name: "Antiseptic dressing or disc at the drain exit site",
      differs: "Places a chlorhexidine disc or chlorhexidine dressing where the tube leaves the skin, sometimes with antiseptic rinsing of the bulb, instead of a plain dressing.",
      evidence: "A trial in 100 patients after mastectomy or axillary dissection (Degnim 2013) cut positive bulb fluid cultures at one week from 66% to 21%; infection was diagnosed in 5 control patients against 1 (p = 0.06). A trial in 104 patients (Rivera-Buendia 2019) found fewer positive cultures with a chlorhexidine dressing, and infection in 15.4% with standard care against 5.8% (p = 0.11). A meta-analysis of four studies (Taha 2023) found fewer infections with antiseptic treatment (p = 0.02). No guideline read recommends it. A proposal is linked under upgrades.",
      sources: ["degnim-2013", "rivera-buendia-2019", "taha-2023"],
    },
    {
      name: "Emptying twice a day, milking the tubing and a drainage log (hospital leaflet)",
      differs: "Memorial Sloan Kettering asks patients to empty the drain twice a day, to milk the tubing to move clots before emptying, and to record the amount and colour in a log. Its leaflet states: \"Milk your tubing before you open the stopper to empty and measure your drainage.\" It asks people to call if the amount suddenly drops or rises by 100 ml over 24 hours, or with a fever of 38.3 °C or higher.",
      evidence: "A hospital's patient leaflet (last updated 6 November 2026). No guideline or trial read tests emptying frequency, milking or these call thresholds.",
      sources: ["mskcc-jackson-pratt"],
    },
    {
      name: "Showering with a drain in place",
      differs: "Advice varies between hospitals, from showering with the drain in after a day or two to keeping the site dry until the drain is out.",
      evidence: "NICE NG125 says of surgical wounds in general that patients may shower safely 48 hours after surgery [2008] and does not mention drains. The Memorial Sloan Kettering leaflet gives showering instructions for after the drain is removed and says not to soak in a bath or pool. No trial of showering with a drain in place was found.",
      sources: ["nice-ng125", "mskcc-jackson-pratt"],
    },
    {
      name: "The patient removes the drain at home",
      differs: "After teaching, the patient or a carer takes the drain out at home when it meets the criteria given, instead of returning to clinic.",
      evidence: "A single-centre series of 100 patients after head and neck surgery (Sethia 2021, abstract): 110 of 123 drains (89.4%) were removed at home, with one seroma, two haematomas and two drain site infections, none attributed to home removal. The authors grade it level of evidence 4. No comparison group.",
      sources: ["sethia-2021"],
    },
    {
      name: "No drain at all",
      differs: "The surgeon closes without a drain, sometimes stitching the skin flaps down, so there is nothing to manage at home.",
      evidence: "Cochrane (2013; seven trials, 960 participants, low quality): after axillary dissection a drain reduced seroma (odds ratio 0.46) and the number of aspirations, with no significant difference in infection and a hospital stay 1.47 days longer. Cochrane (2015): three trials, all in breast reduction, showed no significant benefit from drains, and there were no trials in breast reconstruction.",
      sources: ["cochrane-axillary-drain-2013", "cochrane-breast-reconstruction-drain-2015"],
    },
  ],
  grades: [
    { claim: "Antibiotic prophylaxis should not be continued because a wound drain is present", grade: "Conditional recommendation, low quality of evidence", source: "who-ssi-2018" },
    { claim: "Remove the wound drain when clinically indicated; no optimal timing identified", grade: "Conditional recommendation, very low quality of evidence", source: "who-ssi-2018", quote: "Definitions for the early removal of drains varied across the studies from 12 hours to 5 days postoperatively." },
    { claim: "Information on wound care after discharge, and on recognising infection and whom to contact", grade: "[2008]", source: "nice-ng125" },
    { claim: "Aseptic non-touch technique for changing or removing surgical wound dressings", grade: "[2008]", source: "nice-ng125" },
    { claim: "Showering is safe 48 hours after surgery (surgical wounds in general; drains not mentioned)", grade: "[2008]", source: "nice-ng125", quote: "Advise patients that they may shower safely 48 hours after surgery." },
    { claim: "Early or time-limited drain removal after axillary surgery: more seroma, no difference in infection", grade: "Meta-analysis of 6 studies (not graded)", source: "thomson-2016", quote: "Development of a seroma is 2.54 times more likely with early drain removal" },
    { claim: "A drain after axillary dissection reduces seroma and aspirations at the cost of a longer hospital stay", grade: "Cochrane review; the authors call the evidence limited quality", source: "cochrane-axillary-drain-2013", quote: "There is limited quality evidence that insertion of a drain following axillary lymphadenectomy reduced the odds of developing a seroma and reduced the number of post-operative seroma aspirations." },
    { claim: "Fewer wound infections at two weeks with nurse-led early discharge than with conventional stay (4% against 18.4%, p = 0.019); no difference at four weeks", grade: "Randomised controlled trial, 108 patients (not graded)", source: "wells-2004" },
    { claim: "Continuing antibiotics while drains are in after mastectomy without reconstruction gives no reduction in infection", grade: "Randomised placebo-controlled trial, 369 patients (not graded)", source: "sattar-2023", quote: "Continuing antibiotic prophylaxis for the duration of indwelling drains after mastectomy without immediate reconstruction offers no additional benefit in terms of SSI reduction." },
  ],
  sources: [
    {
      key: "who-ssi-2018",
      label: "Global guidelines for the prevention of surgical site infection, second edition (section 4.26, drains)",
      publisher: "World Health Organization",
      year: 2018,
      url: "https://iris.who.int/handle/10665/277399",
      gradingScheme: "GRADE: strong or conditional recommendation, with quality of evidence high, moderate, low or very low.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "nice-ng125",
      label: "Surgical site infections: prevention and treatment (NG125), recommendations (published April 2019, last updated August 2020)",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/ng125/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended ([2008], [2019]).",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "asbrs-2018",
      label: "Consensus Guideline on Preoperative Antibiotics and Surgical Site Infection in Breast Surgery",
      publisher: "The American Society of Breast Surgeons",
      year: 2018,
      url: "https://www.breastsurgeons.org/docs/statements/asbrs-preoperative-antibiotics-and-surgical-site-infection.pdf",
      gradingScheme: "Consensus document reviewed and approved by the society's board; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "wells-2004",
      label: "Patient, carer and health service outcomes of nurse-led early discharge after breast cancer surgery: a randomised controlled trial",
      publisher: "British Journal of Cancer (Wells et al.)",
      year: 2004,
      url: "https://doi.org/10.1038/sj.bjc.6601998",
      doi: "10.1038/sj.bjc.6601998",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "shima-2021",
      label: "An Optimal Timing for Removing a Drain After Breast Surgery: A Systematic Review and Meta-Analysis",
      publisher: "Journal of Surgical Research (Shima et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/j.jss.2021.05.031",
      doi: "10.1016/j.jss.2021.05.031",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "thomson-2016",
      label: "When should axillary drains be removed? A meta-analysis of time-limited versus volume controlled strategies for timing of drain removal following axillary lymphadenectomy",
      publisher: "Journal of Plastic, Reconstructive and Aesthetic Surgery (Thomson et al.)",
      year: 2016,
      url: "https://doi.org/10.1016/j.bjps.2016.09.027",
      doi: "10.1016/j.bjps.2016.09.027",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "cochrane-axillary-drain-2013",
      label: "Wound drainage after axillary dissection for carcinoma of the breast",
      publisher: "Cochrane Database of Systematic Reviews (Thomson et al.)",
      year: 2013,
      url: "https://doi.org/10.1002/14651858.CD006823.pub2",
      doi: "10.1002/14651858.CD006823.pub2",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "cochrane-breast-reconstruction-drain-2015",
      label: "Wound drainage after plastic and reconstructive surgery of the breast",
      publisher: "Cochrane Database of Systematic Reviews (Khan et al.)",
      year: 2015,
      url: "https://doi.org/10.1002/14651858.CD007258.pub3",
      doi: "10.1002/14651858.CD007258.pub3",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "sattar-2023",
      label: "Impact of Postoperative Antibiotic Prophylaxis on Surgical Site Infections Rates After Mastectomy with Drains but Without Immediate Reconstruction: a multicentre randomised trial",
      publisher: "Annals of Surgical Oncology (Sattar et al.)",
      year: 2023,
      url: "https://doi.org/10.1245/s10434-023-13887-5",
      doi: "10.1245/s10434-023-13887-5",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "degnim-2013",
      label: "Randomized controlled trial to reduce bacterial colonization of surgical drains after breast and axillary operations",
      publisher: "Annals of Surgery (Degnim et al.)",
      year: 2013,
      url: "https://doi.org/10.1097/SLA.0b013e31828c0b85",
      doi: "10.1097/SLA.0b013e31828c0b85",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "rivera-buendia-2019",
      label: "Randomized Controlled Trial to Reduce Bacterial Colonization of Surgical Drains with the Use of Chlorhexidine-Coated Dressings After Breast Cancer Surgery",
      publisher: "Annals of Surgical Oncology (Rivera-Buendia et al.)",
      year: 2019,
      url: "https://doi.org/10.1245/s10434-019-07631-1",
      doi: "10.1245/s10434-019-07631-1",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "taha-2023",
      label: "The Efficacy of Antiseptic Treatment of Surgical Drains on Bacterial Colonisation and Surgical Site Infection Post Breast Surgery: A Systematic Review and Meta-Analysis",
      publisher: "Cureus (Taha et al.)",
      year: 2023,
      url: "https://doi.org/10.7759/cureus.41585",
      doi: "10.7759/cureus.41585",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "sethia-2021",
      label: "Patient-Directed Home Drain Removal in Head and Neck Surgery",
      publisher: "The Laryngoscope (Sethia et al.)",
      year: 2021,
      url: "https://doi.org/10.1002/lary.29556",
      doi: "10.1002/lary.29556",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "mskcc-jackson-pratt",
      label: "Caring for Your Jackson-Pratt Drain (patient leaflet, last updated 6 November 2026)",
      publisher: "Memorial Sloan Kettering Cancer Center",
      year: 2026,
      url: "https://www.mskcc.org/cancer-care/patient-education/caring-your-jackson-pratt-drain",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "cdc-ssi-2017",
      label: "Centers for Disease Control and Prevention Guideline for the Prevention of Surgical Site Infection, 2017",
      publisher: "CDC/HICPAC (JAMA Surgery; Berrios-Torres et al.)",
      year: 2017,
      url: "https://doi.org/10.1001/jamasurg.2017.0904",
      doi: "10.1001/jamasurg.2017.0904",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  cancers: ["breast-cancer"],
  terms: ["seroma-after-breast-surgery", "mastectomy"],
  related: ["surgical-site-infection-prevention", "enhanced-recovery-after-breast-reconstruction", "enhanced-recovery-after-head-and-neck-free-flap-surgery", "lymphoedema-risk-reduction-surveillance-and-treatment", "indwelling-pleural-catheter-drainage-at-home"],
  upgrades: ["idea-upgrade-antiseptic-dressing-at-the-wound-drain-exit-site", "idea-upgrade-drain-removal-rule-tested-on-patient-outcomes"],
  gaps: [
    "No guideline that could be read says how often to empty a wound drain, how to record output, whether to milk the tubing, or what volume or day should trigger removal. These rest on local leaflets and are shown as variants. WHO states that the evidence identifies no optimal time for removal.",
    "Showering with a drain in place is not addressed by any guideline or trial read. NICE NG125's advice that people may shower 48 hours after surgery is about surgical wounds in general and does not mention drains.",
    "Almost all the evidence is from breast and axillary surgery. For neck drains only an uncontrolled series of home removal was read (abstract), and nothing specific to abdominal drains at home could be found to read. Applying breast evidence to other sites is an assumption.",
    "The CDC guideline for the prevention of surgical site infection (2017) could not be read (the journal page returned 403). Nothing rests on it.",
    "On antibiotics while a drain is in beside a breast implant, WHO and the American Society of Breast Surgeons consensus differ: WHO suggests stopping, the consensus leaves it to the surgeon. The consensus dates from 2018 and predates the 2023 placebo-controlled trial, which did not include reconstruction.",
    "Antiseptic dressings at the drain exit site reduced bacterial colonisation in small trials; none was large enough to show a clear effect on infection on its own, and no guideline read recommends them.",
    "Both Cochrane reviews, both removal-timing meta-analyses and the trials of antiseptics and antibiotics were read as abstracts only; the Cochrane full-text record returned an error on the day.",
    "The early discharge trial (Wells 2004) is over twenty years old and enrolled the 40% of eligible women who agreed to take part; those who declined were older and more often lived alone, so its findings may not hold for everyone.",
  ],
});
