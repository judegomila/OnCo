import { protocol } from "./helpers";

/*
 * Preventing surgical site (wound) infection before, during and after an operation, as it applies to cancer surgery.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - NICE NG125, Surgical site infections: prevention and treatment (published April 2019, last updated August 2020):
 *   recommendations page, full text. Each recommendation carries the year it was written ([2008], [2019]).
 * - WHO Global guidelines for the prevention of surgical site infection, second edition (2018): full text, PDF from
 *   iris.who.int read with pdftotext. Recommendations and their GRADE strength and quality quoted as printed.
 * - WHO's preoperative recommendations summary in Lancet Infect Dis (Allegranzi et al., 2016): abstract only; the
 *   full 2018 guideline supersedes it and is what the steps rest on.
 * - CDC guideline for the prevention of SSI (2017) and the ERAS Society guidelines were not read here (cdc.gov refuses
 *   scripts; ERAS colorectal 2025 is behind a bot check). No step rests on them.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked.
 */
export const surgicalSiteInfectionPrevention = protocol({
  id: "surgical-site-infection-prevention",
  name: "Surgical site infection prevention: skin preparation, antibiotic timing, warming and wound care",
  aka: ["SSI prevention", "SSI bundle", "wound infection prevention", "surgical antibiotic prophylaxis", "chlorhexidine skin prep", "preoperative shower", "hair clipping before surgery"],
  domain: "surgery-perioperative",
  tldr: "Wound infections after an operation are common and mostly preventable. Before surgery you shower, hair is clipped rather than shaved if it has to go, a single dose of antibiotic is given shortly before the cut when the operation needs it, and the skin is cleaned with chlorhexidine in alcohol. You are kept warm during the operation, and the wound is covered and cared for cleanly afterwards.",
  simple: "To stop the wound getting infected: shower before surgery, do not shave the area yourself, and keep the dressing on as advised. You can usually shower two days after surgery. Tell your team if the wound gets red, hot, swollen, leaks pus, or you get a fever.",
  summary: "NICE NG125 (2019, updated 2020) and the WHO global guidelines (2nd edition, 2018) agree on the core. Shower or bathe with soap before surgery (WHO conditional, moderate quality: plain or antimicrobial soap). Do not remove hair routinely; if needed, use clippers, never razors (WHO strong, moderate). Give antibiotic prophylaxis for clean-contaminated and contaminated operations and implants, before incision (WHO strong, low quality) and within 120 minutes of it (WHO strong, moderate), repeating it if the operation outlasts the drug's half-life; do not continue it after the operation (WHO strong, moderate) or because a drain is in place (WHO conditional, low). Prepare the skin with alcohol-based chlorhexidine (WHO strong, low to moderate; NICE first choice unless next to a mucous membrane). Keep the patient warm, consider triclosan-coated sutures (both), and cover the wound at the end of the operation; shower after 48 hours (NICE).\n\nThey differ in places. On oxygen, WHO suggests 80% inspired oxygen during and for 2 to 6 hours after intubated general anaesthesia (conditional, moderate), while NICE asks for enough oxygen to keep saturation above 95%. For elective colorectal surgery, WHO suggests oral antibiotics combined with mechanical bowel preparation (conditional, moderate) and recommends against bowel preparation alone (strong, moderate); NICE says not to use mechanical bowel preparation routinely and does not address oral antibiotics. On wound irrigation, NICE says do not irrigate, while WHO suggests considering aqueous povidone-iodine irrigation (conditional, low). WHO suggests prophylactic negative pressure dressings on high-risk closed wounds (conditional, low); NICE NG125's recommendations do not mention them. Nasal mupirocin for Staphylococcus aureus carriers is recommended by WHO for cardiothoracic and orthopaedic surgery (strong) and suggested for others; NICE leaves it to local decision.",
  asOf: "2026-11-11",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "patient-or-carer"],
    where: ["ward", "theatre", "home"],
  },
  population: "People having surgery that involves a cut through the skin, including cancer surgery. NICE NG125 covers adults, young people and children; several WHO recommendations are stated for adults only (oxygen, bowel preparation, negative pressure dressings). Not specific to cancer: no source read gives separate SSI rules for people with cancer, though chemotherapy, steroids, malnutrition and previous radiotherapy all raise risk.",
  trigger: "A planned operation.",
  steps: [
    {
      action: "Tell the patient the risk of wound infection, what is being done to reduce it, how to care for the wound at home and whom to call",
      why: "People who know the signs of infection come back early, when it is easier to treat.",
      source: "nice-ng125",
      quote: "Offer patients and carers information and advice about how to recognise a surgical site infection and who to contact if they are concerned.",
      grade: "[2008]",
    },
    {
      action: "Shower or bathe with soap the day before or on the day of surgery",
      why: "Washing lowers the number of germs on the skin; plain soap works as well as antiseptic soap in the trials WHO reviewed.",
      source: "who-ssi-2018",
      quote: "It is good clinical practice for patients to bathe or shower prior to surgery. The panel suggests that either a plain or antimicrobial soap may be used for this purpose.",
      grade: "Conditional recommendation, moderate quality of evidence",
    },
    {
      action: "Do not remove hair unless necessary; if it must go, use clippers on the day of surgery, never a razor",
      why: "Shaving makes tiny cuts in the skin where germs grow.",
      source: "who-ssi-2018",
      quote: "The panel recommends that in patients undergoing any surgical procedure, hair should either not be removed or, if absolutely necessary, it should be removed only with a clipper. Shaving is strongly discouraged at all times, whether preoperatively or in the operating room (OR).",
      grade: "Strong recommendation, moderate quality of evidence",
    },
    {
      action: "Give antibiotic prophylaxis when the operation calls for it (clean-contaminated or contaminated surgery, or an implant), before the incision and within 120 minutes of it, allowing for the drug's half-life",
      why: "The antibiotic needs to be in the tissues when the skin is cut; given too early or after the cut, it protects less.",
      source: "who-ssi-2018",
      quote: "The panel recommends the administration of SAP within 120 minutes before incision, while considering the half-life of the antibiotic.",
      grade: "Strong recommendation, moderate quality of evidence",
    },
    {
      action: "Repeat the antibiotic dose if the operation lasts longer than the drug's half-life",
      why: "A long operation can outlast the protection of one dose.",
      source: "nice-ng125",
      quote: "Give a repeat dose of antibiotic prophylaxis when the operation is longer than the half-life of the antibiotic given.",
      grade: "[2008]",
    },
    {
      action: "Clean the operation site immediately before incision with an alcohol-based chlorhexidine solution, unless contraindicated or next to a mucous membrane, and let it dry fully if diathermy will be used",
      why: "Chlorhexidine in alcohol kills skin germs best; alcohol left pooled or wet can catch fire with diathermy.",
      source: "who-ssi-2018",
      quote: "The panel recommends alcohol-based antiseptic solutions based on CHG for surgical site skin preparation in patients undergoing surgical procedures.",
      grade: "Strong recommendation, low to moderate quality of evidence",
    },
    {
      action: "Keep the patient warm during the operation",
      why: "Even mild cooling reduces blood flow to the wound and the body's defences against infection.",
      source: "who-ssi-2018",
      quote: "The panel suggests the use of warming devices in the operating room and during the surgical procedure for patient body warming with the purpose of reducing SSI.",
      grade: "Conditional recommendation, moderate quality of evidence",
    },
    {
      action: "Consider triclosan-coated sutures",
      why: "Sutures coated with an antiseptic reduce infection a little across many types of surgery.",
      source: "who-ssi-2018",
      quote: "The panel suggests the use of triclosan-coated sutures for the purpose of reducing the risk of SSI, independent of the type of surgery.",
      grade: "Conditional recommendation, moderate quality of evidence",
    },
    {
      action: "Cover the incision with a suitable dressing at the end of the operation, and change dressings with aseptic non-touch technique",
      why: "A clean covering protects the wound while it seals over in the first days.",
      source: "nice-ng125",
      quote: "Cover surgical incisions with an appropriate interactive dressing at the end of the operation.",
      grade: "[2008]",
    },
    {
      action: "Stop prophylactic antibiotics when the operation ends, including when a drain is left in",
      why: "Continuing antibiotics does not prevent more infections and adds side effects and resistance.",
      source: "who-ssi-2018",
      quote: "The panel recommends against the prolongation of SAP administration after completion of the operation for the purpose of preventing SSI.",
      grade: "Strong recommendation/moderate quality of evidence",
    },
    {
      action: "Clean the wound with sterile saline for the first 48 hours, then tell the patient they can shower",
      why: "After two days a closed wound is sealed enough to get wet.",
      source: "nice-ng125",
      quote: "Advise patients that they may shower safely 48 hours after surgery.",
      grade: "[2008]",
    },
    {
      action: "If infection is suspected from spreading redness, give an antibiotic that covers the likely organisms, guided by local resistance and microbiology",
      why: "Early treatment stops a wound infection spreading or opening the wound.",
      source: "nice-ng125",
      quote: "When surgical site infection is suspected by the presence of cellulitis, either by a new infection or an infection caused by treatment failure, give the patient an antibiotic that covers the likely causative organisms.",
      grade: "[2008]",
    },
  ],
  bestInClass: {
    statement: "Soap shower, no shaving (clippers if needed), timed single-dose antibiotic prophylaxis before incision and within 120 minutes, alcohol-based chlorhexidine skin preparation, active warming, triclosan-coated sutures considered, no prophylaxis after the operation ends, a dressing at closure and showering from 48 hours (WHO 2018 and NICE NG125 agree; WHO grades as listed). Where they disagree, both are shown: inspired oxygen 80% (WHO, conditional, moderate) against saturation above 95% (NICE); oral antibiotics with bowel preparation before elective colorectal surgery (WHO, conditional, moderate) against no routine bowel preparation (NICE, which does not address oral antibiotics); povidone-iodine wound irrigation considered (WHO, conditional, low) against no irrigation (NICE); prophylactic negative pressure dressings on high-risk wounds (WHO, conditional, low), which NICE NG125's recommendations do not mention.",
    sources: ["who-ssi-2018", "nice-ng125"],
  },
  variants: [
    {
      name: "High inspired oxygen (80%) during and after anaesthesia",
      differs: "Gives 80% oxygen through the breathing tube during surgery and, where feasible, for 2 to 6 hours afterwards, rather than enough to keep saturation above 95%.",
      evidence: "WHO conditional recommendation, moderate quality of evidence. NICE asks only for saturation above 95% during major surgery and recovery.",
      sources: ["who-ssi-2018", "nice-ng125"],
    },
    {
      name: "Oral antibiotics with mechanical bowel preparation before elective colorectal surgery",
      differs: "Gives oral antibiotics together with bowel preparation the day before elective colorectal cancer surgery.",
      evidence: "WHO suggests the combination (conditional, moderate quality) and recommends against bowel preparation alone (strong, moderate). NICE NG125 (2008 wording) says not to use mechanical bowel preparation routinely and does not mention oral antibiotics.",
      sources: ["who-ssi-2018", "nice-ng125"],
    },
    {
      name: "Povidone-iodine wound irrigation before closure",
      differs: "Washes the incision with aqueous povidone-iodine before closing, particularly in clean and clean-contaminated wounds.",
      evidence: "WHO conditional, low quality of evidence; WHO found insufficient evidence for or against saline irrigation and suggests against antibiotic irrigation. NICE says not to use wound irrigation to reduce SSI, and to apply antiseptics or antibiotics to the wound before closure only within a trial.",
      sources: ["who-ssi-2018", "nice-ng125"],
    },
    {
      name: "Prophylactic negative pressure wound therapy",
      differs: "Puts a negative pressure (vacuum) dressing on a closed high-risk incision.",
      evidence: "WHO conditional, low quality of evidence, taking resources into account. NICE NG125's recommendations do not mention it.",
      sources: ["who-ssi-2018"],
    },
    {
      name: "Nasal mupirocin and chlorhexidine wash for Staphylococcus aureus carriers",
      differs: "Treats known nasal carriers of S. aureus with mupirocin ointment, with or without a chlorhexidine body wash, around surgery.",
      evidence: "WHO recommends it for cardiothoracic and orthopaedic surgery (strong, moderate) and suggests considering it for other surgery (conditional, moderate). NICE says consider it where S. aureus is a likely cause, decided locally, with resistance surveillance.",
      sources: ["who-ssi-2018", "nice-ng125"],
    },
  ],
  grades: [
    { claim: "Antibiotic prophylaxis before incision when indicated", grade: "Strong recommendation, low quality of evidence", source: "who-ssi-2018", quote: "The panel recommends the administration of SAP prior to the surgical incision when indicated (depending on the type of operation)." },
    { claim: "Antibiotic prophylaxis within 120 minutes before incision", grade: "Strong recommendation, moderate quality of evidence", source: "who-ssi-2018" },
    { claim: "Alcohol-based chlorhexidine for skin preparation", grade: "Strong recommendation, low to moderate quality of evidence", source: "who-ssi-2018" },
    { claim: "No shaving; clippers only if hair must be removed", grade: "Strong recommendation, moderate quality of evidence", source: "who-ssi-2018" },
    { claim: "No prolongation of prophylaxis after the operation", grade: "Strong recommendation/moderate quality of evidence", source: "who-ssi-2018" },
    { claim: "Prophylaxis not continued because a drain is present", grade: "Conditional recommendation, low quality of evidence", source: "who-ssi-2018", quote: "The panel suggests that perioperative antibiotic prophylaxis should not be continued to the presence of a wound drain for the purpose of preventing SSI." },
    { claim: "80% inspired oxygen during intubated general anaesthesia and 2 to 6 hours after", grade: "Conditional recommendation, moderate quality of evidence", source: "who-ssi-2018", quote: "The panel suggests that adult patients undergoing general anaesthesia with tracheal intubation for surgical procedures should receive an 80% fraction of inspired oxygen (FiO2) intraoperatively and, if feasible, in the immediate postoperative period for 2-6 hours to reduce the risk of SSI." },
    { claim: "Oral antibiotics with mechanical bowel preparation in elective colorectal surgery", grade: "Conditional recommendation, moderate quality evidence", source: "who-ssi-2018", quote: "The panel suggests that preoperative oral antibiotics combined with mechanical bowel preparation (MBP) should be used to reduce the risk of SSI in adult patients undergoing elective colorectal surgery." },
    { claim: "No mechanical bowel preparation alone in elective colorectal surgery", grade: "Strong recommendation, moderate quality evidence", source: "who-ssi-2018", quote: "The panel recommends that MBP alone (without administration of oral antibiotics) should not be used for the purpose of reducing SSI in adult patients undergoing elective colorectal surgery." },
    { claim: "Prophylactic negative pressure wound therapy on high-risk closed incisions", grade: "Conditional recommendation, low quality of evidence", source: "who-ssi-2018", quote: "The panel suggests the use of prophylactic negative pressure wound therapy (pNPWT) in adult patients on primarily closed surgical incisions in high-risk wounds, for the purpose of the prevention of SSI, while taking resources into account." },
    { claim: "Do not use wound irrigation to reduce SSI", grade: "[2008] (NICE does not grade)", source: "nice-ng125", quote: "Do not use wound irrigation to reduce the risk of surgical site infection." },
    { claim: "Maintain oxygen saturation above 95% during major surgery and recovery", grade: "[2008] (NICE does not grade)", source: "nice-ng125", quote: "Maintain optimal oxygenation during surgery. In particular, give patients sufficient oxygen during major surgery and in the recovery period to ensure that a haemoglobin saturation of more than 95% is maintained." },
  ],
  sources: [
    {
      key: "who-ssi-2018",
      label: "Global guidelines for the prevention of surgical site infection, second edition",
      publisher: "World Health Organization",
      year: 2018,
      url: "https://iris.who.int/handle/10665/277399",
      gradingScheme: "GRADE: strong or conditional recommendations, with quality of evidence high, moderate, low or very low.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng125",
      label: "Surgical site infections: prevention and treatment (NG125), recommendations",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/ng125/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended. Published April 2019, last updated August 2020.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "who-lancet-2016",
      label: "New WHO recommendations on preoperative measures for surgical site infection prevention: an evidence-based global perspective",
      publisher: "The Lancet Infectious Diseases (Allegranzi et al.)",
      year: 2016,
      url: "https://doi.org/10.1016/S1473-3099(16)30398-X",
      doi: "10.1016/S1473-3099(16)30398-X",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  technologies: [],
  terms: [],
  related: ["vte-prophylaxis-after-cancer-surgery"],
  upgrades: [],
  gaps: [
    "The CDC/HICPAC 2017 SSI guideline could not be read (cdc.gov refuses scripts) and is not cited. The ERAS Society colorectal guideline (2025), which also covers bowel preparation and oral antibiotics, could not be read (bot check on the publisher's site).",
    "The choice of antibiotic, dose and redosing interval come from local formularies and are not given here.",
    "No source read gives SSI measures specific to people with cancer, for example after radiotherapy to the operative field or during chemotherapy or immunotherapy.",
    "Most of NICE NG125's recommendations date from 2008; the WHO guideline is from 2018. No newer edition of either was found.",
  ],
});
