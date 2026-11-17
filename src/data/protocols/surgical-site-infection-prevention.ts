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
 *
 * Second accuracy pass, 17 November 2026. Re-read as raw text: the NICE NG125 recommendations page, its overview and
 * its information for the public (curl, tags stripped by script), and the WHO second edition PDF (fetched from the
 * iris.who.int file API, read with pdftotext). All 22 quotes were checked verbatim by script and every WHO grade was
 * checked against the grade printed after that recommendation. Corrected: reasons in `why` that neither source gives
 * (WHO says it is unclear how warming reduces infection), NICE details that had been attributed to WHO (the day of
 * showering and of clipping, the operations that need prophylaxis, the mucous membrane exception), "agree" where only
 * NICE speaks (dressing, showering at 48 hours), the unsourced list of cancer risk factors, and the patient warning
 * signs, now worded to NICE's definition. Added: the difference between the two on dressings. The Lancet 2016 DOI
 * was resolved again through Crossref. The CDC page still answers 403 and its 2017 guideline (JAMA Surgery) and the
 * ERAS 2025 colorectal guideline have no open copy in Europe PMC; no step rests on them.
 */
export const surgicalSiteInfectionPrevention = protocol({
  id: "surgical-site-infection-prevention",
  name: "Surgical site infection prevention: skin preparation, antibiotic timing, warming and wound care",
  aka: ["SSI prevention", "SSI bundle", "wound infection prevention", "surgical antibiotic prophylaxis", "chlorhexidine skin prep", "preoperative shower", "hair clipping before surgery"],
  domain: "surgery-perioperative",
  tldr: "Wound infections after an operation are among the most preventable infections picked up in hospital. Before surgery you shower, hair is clipped rather than shaved if it has to go, an antibiotic is given before the cut when the operation needs it, and the skin is cleaned with an antiseptic, usually chlorhexidine in alcohol. You are kept warm in theatre, and the wound is covered afterwards.",
  simple: "To lower the chance of a wound infection: shower or bathe with soap before surgery, do not shave the area with a razor, and look after the wound the way your team shows you. NICE says you can shower safely 48 hours after surgery. Contact the team named on your discharge advice if the wound becomes hot, red, painful or swollen, or you get a fever.",
  summary: "NICE NG125 (2019, updated 2020) and the WHO global guidelines (2nd edition, 2018) agree on the core. Shower or bathe with soap before surgery (WHO conditional, moderate quality: plain or antimicrobial soap). Do not remove hair routinely; if needed, use clippers, never razors (WHO strong, moderate). Give antibiotic prophylaxis when the operation calls for it (NICE: clean-contaminated and contaminated surgery, and clean surgery with a prosthesis or implant; WHO leaves the list of operations to other guidelines), before incision (WHO strong, low quality) and within 120 minutes of it (WHO strong, moderate), repeating it if the operation outlasts the drug's half-life (NICE); do not continue it after the operation (WHO strong, moderate) or because a drain is in place (WHO conditional, low). Prepare the skin with alcohol-based chlorhexidine (WHO strong, low to moderate; in NICE's table of options, first choice unless contraindicated or next to a mucous membrane). NICE adds a caution about skin antiseptics in babies, in particular chemical injury from chlorhexidine in preterm babies. Keep the patient warm (WHO conditional, moderate; NICE refers to its hypothermia guideline) and consider triclosan-coated sutures (both). NICE alone says to cover the wound with an interactive dressing at the end of the operation and that patients may shower 48 hours after surgery.\n\nThey differ in places. On oxygen, WHO suggests 80% inspired oxygen for adults during intubated general anaesthesia and, if feasible, for 2 to 6 hours afterwards (conditional, moderate), while NICE asks for enough oxygen to keep saturation above 95%. For elective colorectal surgery, WHO suggests oral antibiotics combined with mechanical bowel preparation (conditional, moderate) and recommends against bowel preparation alone (strong, moderate); NICE says not to use mechanical bowel preparation routinely and does not address oral antibiotics. On wound irrigation, NICE says do not irrigate, while WHO suggests considering aqueous povidone-iodine irrigation (conditional, low). WHO suggests prophylactic negative pressure dressings on high-risk closed wounds (conditional, low); NICE NG125's recommendations do not mention them. On dressings, NICE asks for an appropriate interactive dressing, while WHO suggests not using advanced dressings (hydrocolloid, hydroactive, silver-containing or PHMB in the trials) in place of standard dry absorbent ones (conditional, low). Nasal mupirocin for known Staphylococcus aureus carriers is recommended by WHO for cardiothoracic and orthopaedic surgery (strong, moderate) and suggested for consideration in other surgery (conditional, moderate); NICE says to consider it, with a chlorhexidine body wash, before procedures where S. aureus is a likely cause, decided locally.",
  asOf: "2026-11-17",
  setting: {
    who: ["surgical-team", "anaesthetist", "nurse", "patient-or-carer"],
    where: ["ward", "theatre", "home"],
  },
  population: "People having surgery that involves a cut through the skin, including cancer surgery. NICE NG125 covers adults, young people and children; several WHO recommendations are stated for adults only (oxygen, bowel preparation, negative pressure dressings). Not specific to cancer: no source read gives separate SSI rules for people with cancer.",
  trigger: "A planned operation.",
  steps: [
    {
      action: "Tell the patient the risk of wound infection, what is being done to reduce it, how to care for the wound at home and whom to call",
      why: "NICE asks that patients and carers are told how to recognise a wound infection and whom to contact, so that a concern reaches the team.",
      source: "nice-ng125",
      quote: "Offer patients and carers information and advice about how to recognise a surgical site infection and who to contact if they are concerned.",
      grade: "[2008]",
    },
    {
      action: "Shower or bathe with soap before surgery (NICE: the day before or on the day)",
      why: "WHO calls this good practice to make the skin as clean as possible and lower the number of bacteria at the incision site; in the trials it reviewed, chlorhexidine soap did not reduce wound infections compared with plain soap.",
      source: "who-ssi-2018",
      quote: "It is good clinical practice for patients to bathe or shower prior to surgery. The panel suggests that either a plain or antimicrobial soap may be used for this purpose.",
      grade: "Conditional recommendation, moderate quality of evidence",
    },
    {
      action: "Do not remove hair unless necessary; if it must go, use clippers, never a razor (NICE: electric clippers with a single-use head on the day of surgery)",
      why: "A razor blade is drawn directly over the skin, and shaving is thought to cause microscopic skin injury; trials reviewed by WHO found fewer wound infections with clipping or no hair removal than with shaving. WHO makes no recommendation on the timing of hair removal.",
      source: "who-ssi-2018",
      quote: "The panel recommends that in patients undergoing any surgical procedure, hair should either not be removed or, if absolutely necessary, it should be removed only with a clipper. Shaving is strongly discouraged at all times, whether preoperatively or in the operating room (OR).",
      grade: "Strong recommendation, moderate quality of evidence",
    },
    {
      action: "Give antibiotic prophylaxis when the operation calls for it (NICE: clean-contaminated or contaminated surgery, or clean surgery with a prosthesis or implant), before the incision and within 120 minutes of it, allowing for the drug's half-life",
      why: "In the studies WHO reviewed, wound infections were more frequent when the antibiotic was given after the cut, or more than 120 minutes before it. A drug with a short half-life may need to be given closer to the incision.",
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
      action: "Clean the operation site immediately before incision with an antiseptic: an alcohol-based chlorhexidine solution unless it is contraindicated or the site is next to a mucous membrane (NICE's first choice); if diathermy will be used, let it dry by evaporation and avoid pooling",
      why: "In the trials WHO reviewed, alcohol-based antiseptics prevented more wound infections than water-based ones, and alcohol-based chlorhexidine more than alcohol-based povidone-iodine (low quality evidence). Alcohol is flammable and may ignite with diathermy unless it has dried.",
      source: "who-ssi-2018",
      quote: "The panel recommends alcohol-based antiseptic solutions based on CHG for surgical site skin preparation in patients undergoing surgical procedures.",
      grade: "Strong recommendation, low to moderate quality of evidence",
    },
    {
      action: "Keep the patient warm during the operation",
      why: "Two randomised trials reviewed by WHO found fewer wound infections when normal body temperature was maintained. WHO says it is unclear how warming does this.",
      source: "who-ssi-2018",
      quote: "The panel suggests the use of warming devices in the operating room and during the surgical procedure for patient body warming with the purpose of reducing SSI.",
      grade: "Conditional recommendation, moderate quality of evidence",
    },
    {
      action: "Consider triclosan-coated sutures",
      why: "In the trials WHO reviewed, triclosan-coated sutures reduced wound infections compared with uncoated ones, whatever the type of suture or operation. NICE says to consider them, especially in children's surgery.",
      source: "who-ssi-2018",
      quote: "The panel suggests the use of triclosan-coated sutures for the purpose of reducing the risk of SSI, independent of the type of surgery.",
      grade: "Conditional recommendation, moderate quality of evidence",
    },
    {
      action: "Cover the incision with a suitable dressing at the end of the operation, and change dressings with aseptic non-touch technique",
      why: "WHO describes a dressing as a physical barrier that protects the wound from contamination until it becomes impermeable to microorganisms. WHO suggests a standard dressing rather than an advanced one for preventing infection.",
      source: "nice-ng125",
      quote: "Cover surgical incisions with an appropriate interactive dressing at the end of the operation.",
      grade: "[2008]",
    },
    {
      action: "Do not continue prophylactic antibiotics after the operation ends, including because a drain is left in",
      why: "Trials reviewed by WHO found no fewer infections with continued antibiotics than with a single dose, and continuing carries possible side effects and a risk of antimicrobial resistance. WHO noted low to very low quality evidence of possible benefit in cardiac, vascular and orthognathic surgery and still recommends against. The drain statement is a separate, conditional recommendation on low quality evidence.",
      source: "who-ssi-2018",
      quote: "The panel recommends against the prolongation of SAP administration after completion of the operation for the purpose of preventing SSI.",
      grade: "Strong recommendation/moderate quality of evidence",
    },
    {
      action: "Use sterile saline for wound cleansing up to 48 hours after surgery, and tell the patient they may shower from 48 hours",
      why: "NICE advises that showering is safe 48 hours after surgery; it gives no reason in the recommendation.",
      source: "nice-ng125",
      quote: "Advise patients that they may shower safely 48 hours after surgery.",
      grade: "[2008]",
    },
    {
      action: "If infection is suspected from spreading redness, give an antibiotic that covers the likely organisms, guided by local resistance and microbiology",
      why: "NICE notes that infection in a surgical wound may prevent healing, cause the wound edges to separate, or form an abscess in the deeper tissues.",
      source: "nice-ng125",
      quote: "When surgical site infection is suspected by the presence of cellulitis, either by a new infection or an infection caused by treatment failure, give the patient an antibiotic that covers the likely causative organisms.",
      grade: "[2008]",
    },
  ],
  bestInClass: {
    statement: "Soap shower or bath, no shaving (clippers if needed), antibiotic prophylaxis where indicated before incision (WHO: within 120 minutes of it; NICE: consider a single intravenous dose on starting anaesthesia), alcohol-based chlorhexidine skin preparation, warming, and triclosan-coated sutures considered (WHO 2018 and NICE NG125 agree; WHO grades as listed). WHO recommends against prophylaxis after the operation ends (strong, moderate); NICE says to repeat the dose when the operation outlasts the drug's half-life. A dressing at closure and showering from 48 hours are NICE recommendations. Where they disagree, both are shown: inspired oxygen 80% (WHO, conditional, moderate) against saturation above 95% (NICE); oral antibiotics with bowel preparation before elective colorectal surgery (WHO, conditional, moderate) against no routine bowel preparation (NICE, which does not address oral antibiotics); povidone-iodine wound irrigation considered (WHO, conditional, low) against no irrigation (NICE); prophylactic negative pressure dressings on high-risk wounds (WHO, conditional, low), which NICE NG125's recommendations do not mention; an appropriate interactive dressing (NICE) against no advanced dressing in place of a standard one (WHO, conditional, low).",
    sources: ["who-ssi-2018", "nice-ng125"],
  },
  variants: [
    {
      name: "High inspired oxygen (80%) during and after anaesthesia",
      differs: "Gives adults 80% inspired oxygen during general anaesthesia with a breathing tube and, where feasible, for 2 to 6 hours afterwards, rather than enough to keep saturation above 95%.",
      evidence: "WHO conditional recommendation, moderate quality of evidence. NICE asks only for saturation above 95% during major surgery and recovery.",
      sources: ["who-ssi-2018", "nice-ng125"],
    },
    {
      name: "Oral antibiotics with mechanical bowel preparation before elective colorectal surgery",
      differs: "Gives adults oral antibiotics together with mechanical bowel preparation before elective colorectal surgery. WHO does not name the drugs or the timing.",
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
      differs: "Puts a negative pressure (vacuum) dressing on a closed high-risk incision in adults.",
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
    { claim: "Consider aqueous povidone-iodine irrigation of the incision before closure", grade: "Conditional recommendations/low quality of evidence", source: "who-ssi-2018", quote: "The panel suggests considering the use of irrigation of the incisional wound with an aqueous PVP-I solution before closure for the purpose of preventing SSI, particularly in clean and clean-contaminated wounds." },
    { claim: "No advanced dressing in place of a standard dressing on primarily closed wounds", grade: "Conditional recommendation/low quality of evidence", source: "who-ssi-2018", quote: "The panel suggests not using any type of advanced dressing over a standard dressing on primarily closed surgical wounds for the purpose of preventing SSI." },
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
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng125",
      label: "Surgical site infections: prevention and treatment (NG125), recommendations",
      publisher: "NICE",
      year: 2019,
      url: "https://www.nice.org.uk/guidance/ng125/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended. Published 11 April 2019, last updated 19 August 2020, last reviewed 31 May 2023.",
      read: "full-text",
      accessed: "2026-11-17",
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
    "The CDC/HICPAC 2017 SSI guideline could not be read and is not cited: on 17 November 2026 cdc.gov still answered 403 to a script and Europe PMC lists the JAMA Surgery paper as subscription only. The ERAS Society colorectal guideline (2025), which also covers bowel preparation and oral antibiotics, has no open copy in Europe PMC and was not read. No step rests on either.",
    "The choice of antibiotic, dose and redosing interval come from local formularies and are not given here.",
    "No source read gives SSI measures specific to people with cancer, for example after radiotherapy to the operative field or during chemotherapy or immunotherapy.",
    "Most of NICE NG125's recommendations date from 2008; the WHO guideline is from 2018. On 17 November 2026 no newer edition of either was found: NICE's page gives 19 August 2020 as the last update and 31 May 2023 as the last review, and says the update recommended by its surveillance report will not go ahead as planned; a Europe PMC title search found no third WHO edition, and the WHO repository refused a search by script.",
    "WHO says it is outside its scope to say which operations need antibiotic prophylaxis; the list in the step is NICE's.",
    "Neither source read gives patients a list of warning signs or a time limit for reporting them. The signs in the plain summary are those in NICE's definition of a surgical site infection (heat, redness, pain, swelling and, in more serious cases, fever). NICE's information for the public points to a Public Health England leaflet on monitoring surgical wounds, which was not read.",
    "The 2016 Lancet Infectious Diseases summary's abstract was not re-read on 17 November 2026; its DOI and title were checked again through Crossref, and no step rests on it.",
  ],
});
