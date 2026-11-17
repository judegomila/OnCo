import { protocol } from "./helpers";

/*
 * Stoma care around cancer surgery: preparation and siting before the operation, teaching and pouch care after it,
 * and watching output and hydration with a new ileostomy.
 *
 * The owner's rule for this record: steps rest only on sources stronger than industry-funded consensus. One such
 * guideline was read in full directly from its publisher (ASCRS 2022, no funding received), with NICE NG151 and an
 * independent meta-analysis; every step rests on those. Industry-funded work appears only as labelled variants.
 *
 * What was read, and how (all on 16 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ASCRS Clinical Practice Guidelines for Ostomy Surgery (Davis et al., Dis Colon Rectum 2022): full text, the free
 *   article HTML served by journals.lww.com through the DOI, stripped to text. It is the current edition (it replaces
 *   the 2015 guideline; no later one is indexed in Europe PMC). It states: "No funding was received for preparing this
 *   guideline, and the authors have declared no competing interests related to this material." GRADE, quoted as printed.
 *   It also states that nursing ostomy care (skin care, appliances) is outside its scope.
 * - NICE NG151, Colorectal cancer (published 29 January 2020, last updated 15 December 2021): recommendations page,
 *   HTML, full text. Its recommendations carry no grade and no year tag on the page.
 * - Vogel et al., Tech Coloproctol 2022, systematic review of readmission after ileostomy (71 studies): full text,
 *   Europe PMC XML (PMC9018644). The authors declare no conflict of interest.
 * - Lederhuber et al., Tech Coloproctol 2023, systematic review of high-output stoma management: abstract only.
 * - Migdanis et al., Dis Colon Rectum 2018, randomised trial of an oral hydration solution: abstract only. The ASCRS
 *   guideline describes this trial with different figures (79 patients, 29% against 10%) from the trial's own abstract
 *   (39 and 41 patients, 24% against none); the abstract's figures are the ones used here.
 * - Industry-funded, variants only: the CSCRS and NSWOCC position statement on stoma site marking (Can J Surg 2022,
 *   full text, PMC9202823; "Educational grants were obtained from B. Braun, Coloplast, Hollister and Nightingale
 *   Medical Supplies") and the high-output stoma consensus of Carr et al. (J Wound Ostomy Continence Nurs 2025, full
 *   text, PMC12479063; "Hollister Incorporated provided funding for the meeting").
 * - Not readable: the RNAO best practice guideline, Supporting Adults Who Anticipate or Live with an Ostomy (second
 *   edition, 2019): rnao.ca returned 403 to a script. An Internet Archive copy was read in an earlier draft of this
 *   file and has been taken out, because a site that refuses a script is not to be got round; nothing here rests on
 *   it. Also not readable: the WOCN Society Clinical Guideline on the adult with a faecal or urinary ostomy (the 2018 executive
 *   summary gave only its abstract to a script; the full guideline is sold by the society); the WOCN, AUA and ASCRS
 *   position statement on site marking (2021; no abstract indexed, journal page served no text); the ASCN UK National
 *   Clinical Guidelines (ascnuk.org shows them to paying members only, so neither their text nor their funding could be
 *   checked); the ERAS Society colorectal recommendations 2025 (no abstract indexed; sciencedirect.com returned 403).
 *   None was got round and no step rests on any of them.
 *
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed.
 */
export const stomaCareAfterCancerSurgery = protocol({
  id: "stoma-care-after-cancer-surgery",
  name: "Stoma care after cancer surgery: siting, teaching, pouch care and ileostomy output",
  aka: ["stoma care", "ostomy care", "colostomy care", "ileostomy care", "stoma siting", "stoma site marking", "new ileostomy dehydration", "high-output stoma", "stoma nurse follow-up", "changing a stoma bag"],
  domain: "surgery-perioperative",
  tldr: "A stoma is an opening on the tummy, made in some bowel cancer operations, through which waste passes into a bag. American surgical guidance asks that a specialist stoma nurse teaches you before and after the operation, that the site is marked beforehand, and that support continues at home. With a new ileostomy, about 6 in 100 people return to hospital with dehydration in the first month.",
  simple: "A stoma lets waste leave the body into a bag on your tummy. A stoma nurse should teach you about it before and after your operation and choose the best spot for it. If your stoma is an ileostomy, losing too much fluid is the main early risk, so ask your team how much to drink and when to call them.",
  summary: "One independent guideline was read in full: the ASCRS ostomy surgery guideline (2022, GRADE, no funding received). It recommends preoperative and postoperative education by a specialised provider (1B), preoperative site marking by a trained provider (1B), a stoma fashioned to protrude above the skin (1C) and follow-up for teaching, care and support (1C). For a new ileostomy it gives a perioperative care pathway a weak recommendation (2B), downgraded from strong in 2015 because trials disagree. NICE NG151 asks that people with colorectal cancer are told the likelihood of a stoma and that a trained stoma professional gives information on its care. A meta-analysis of 71 studies put readmission for dehydration within 30 days of a new ileostomy at 6 per cent. The RNAO nursing guideline (2019), which addresses dehydration teaching, readiness-based discharge, follow-up in the first weeks, hernia prevention and quality of life, could not be read because its site refused a script, and the WOCN guideline is sold; so no independent source read here states pouch-fitting or skin-care technique, the signs of dehydration to teach, or a volume that defines high output. Those are named in the gaps. The reader's own stoma team's instructions come first: this page explains the care, it does not replace it.",
  asOf: "2026-11-16",
  setting: {
    who: ["nurse", "surgical-team", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "ward", "home", "community", "telephone-triage"],
  },
  population: "Adults having a colostomy or ileostomy formed, planned or as an emergency, during cancer surgery, most often for bowel cancer. The ASCRS guideline covers adult intestinal stomas and leaves out urostomies, continent ileostomies, children and the detail of nursing ostomy care; NICE NG151 covers colorectal cancer. Urostomy after bladder removal has its own technique and is not covered in detail here. Where these steps read as instructions, your own stoma nurse's and surgical team's protocol comes first.",
  trigger: "An operation that may end with a stoma is being planned, or a stoma has been formed.",
  steps: [
    {
      action: "Before surgery, tell the person how likely a stoma is, why it might be needed and for how long",
      why: "A stoma is easier to accept and to manage when it is expected, and some are temporary while others are permanent.",
      source: "nice-ng151",
      quote: "the likelihood of having a stoma, why it might be necessary and for how long it might be needed.",
      grade: "Not graded (NICE NG151, recommendation 1.2.2)",
    },
    {
      action: "Arrange teaching from a specialist stoma nurse both before and after the operation",
      why: "In the studies the guideline reviewed, teaching before surgery shortened hospital stay, reduced anxiety and skin problems, and helped people manage the bag sooner.",
      source: "ascrs-2022",
      quote: "Patients undergoing elective stoma creation should receive preoperative and postoperative ostomy education by a specialized provider such as a wound ostomy and continence nurse.",
      grade: "strong recommendation based on moderate-quality evidence, 1B",
    },
    {
      action: "Have a trained provider mark the possible stoma sites on the skin before the operation",
      why: "A stoma placed where the person can see and reach it, away from folds, scars and the beltline, leaks less and causes fewer skin problems.",
      source: "ascrs-2022",
      quote: "Appropriate potential ostomy sites should be marked preoperatively by a trained provider, when possible.",
      grade: "strong recommendation based on moderate-quality evidence, 1B",
    },
    {
      action: "At surgery, fashion the stoma so that it stands out above the skin where possible",
      why: "A stoma that sits flat or below the skin lets waste run under the bag's seal, which causes leaks and sore skin.",
      source: "ascrs-2022",
      quote: "When possible, both ileostomies and colostomies should be fashioned to protrude above the skin surface.",
      grade: "strong recommendation based on low-quality evidence, 1C",
    },
    {
      action: "Look at the skin around the stoma at each bag change, and report soreness, broken skin or repeated leaks to the stoma nurse",
      why: "Sore skin and leaks feed each other: a leak damages the skin, and damaged skin stops the bag sticking. A nurse can usually fix the fit.",
      practice: "No independent guideline that could be read states bag-fitting or skin-care technique. ASCRS places nursing ostomy care (skin care, appliances) outside its scope; the RNAO nursing guideline could not be read because its site refused a script; the WOCN Society guideline, which covers pouching systems and skin complications, is sold and could not be read. ASCRS reports a study of 743 long-term ostomy patients in which 61% had skin problems around the stoma and 28% frequent leakage, and both fell after two visits to a specialist nurse.",
    },
    {
      action: "Have a trained stoma professional give information on caring for the stoma and on living with it",
      why: "Questions about food, work, travel, sex and body image are part of stoma care, and a specialist is best placed to answer them.",
      source: "nice-ng151",
      quote: "If relevant, have a trained stoma professional provide information on the care and management of stomas and on learning to live with a stoma.",
      grade: "Not graded (NICE NG151, recommendation 1.2.4)",
    },
    {
      action: "Manage a new ileostomy on a care pathway: teaching before surgery, the person managing their own stoma under observation in hospital, and tracking of intake and output at home with a visiting nurse",
      why: "Dehydration is the commonest reason people with a new ileostomy return to hospital, and several pathways have reduced it, though not every trial agrees.",
      source: "ascrs-2022",
      quote: "Managing patients with a new ileostomy with a perioperative clinical care pathway may decrease the risk of hospital readmission.",
      grade: "weak recommendation based on moderate-quality evidence, 2B",
    },
    {
      action: "With a new ileostomy, make sure the person knows that dehydration is the main early risk, that output and fluids are being watched, and whom to call",
      why: "Dehydration is the leading reason people with a new ileostomy go back into hospital, and it can injure the kidneys; it is treated more simply when it is caught early.",
      source: "vogel-2022",
      quote: "Better monitoring, patient awareness and preventive measures are required.",
      grade: "Systematic review and meta-analysis of 71 studies (authors' conclusion; not graded)",
    },
    {
      action: "Arrange stoma nurse follow-up after discharge, at home, in clinic or by telephone, and keep it available in the long term",
      why: "Problems continue for years in many people with a stoma, and those who see a specialist nurse again have fewer leaks and better quality of life.",
      source: "ascrs-2022",
      quote: "Patients benefit from follow-up for ostomy teaching, care, and support.",
      grade: "strong recommendation based on low-quality evidence, 1C",
    },
  ],
  bestInClass: {
    statement: "Teaching by a specialist provider before and after surgery and preoperative site marking by a trained provider (ASCRS 2022, both strong, 1B), a stoma that protrudes above the skin (1C) and follow-up for teaching, care and support (1C), with NICE NG151 asking that a trained stoma professional gives information on stoma care to people with colorectal cancer. On the new ileostomy, ASCRS gives a perioperative care pathway a weak recommendation (2B) and says it downgraded it from strong because a randomised trial of 100 patients found no fewer readmissions and more outpatient intravenous fluids with an education and monitoring programme, while a retrospective comparison found readmission for dehydration in 3.9% against 15.5%. The RNAO nursing guideline, which covers the same ground from the nursing side, could not be read, so its position cannot be set beside this one. No independent guideline that could be read sets a volume that defines high output or a technique for fitting the bag.",
    sources: ["ascrs-2022", "nice-ng151", "vogel-2022"],
  },
  variants: [
    {
      name: "A daily oral rehydration drink for everyone with a new ileostomy",
      differs: "Gives an isotonic glucose and sodium drink every day for about six weeks after discharge to all people with a new diverting ileostomy, rather than advising fluids and treating dehydration when it appears.",
      evidence: "One single-centre randomised trial (Migdanis 2018): 39 people given the drink for 40 days after discharge and 41 given nothing. Readmission for fluid and electrolyte problems was 24% without the drink and none with it (p = 0.001). ASCRS cites the trial among the pathway evidence but does not recommend the drink itself. A proposal to test it at scale is linked under upgrades.",
      sources: ["migdanis-2018", "ascrs-2022"],
    },
    {
      name: "No formal ileostomy pathway",
      differs: "Gives routine postoperative care and ordinary discharge advice without structured intake and output tracking or scheduled nurse contact.",
      evidence: "ASCRS reports the evidence both ways. A retrospective comparison of 232 people on a pathway and 161 without found readmission for high output or dehydration in 3.9% against 15.5%. A randomised trial of 100 people found no difference in readmission overall (20.4% against 19.6%) or for dehydration (8.2% against 5.9%), and more outpatient intravenous fluids in the programme group (25% against 6%). ASCRS therefore states: \"this recommendation was downgraded from strong to weak based on moderate-quality evidence from the previous CPG.\"",
      sources: ["ascrs-2022"],
    },
    {
      name: "A seventeen-step site-marking procedure (industry-funded position statement)",
      differs: "The Canadian Society of Colon and Rectal Surgeons and Nurses Specialized in Wound, Ostomy and Continence Canada set out 17 steps for marking, including checking the site lying, sitting and standing, avoiding the beltline, and marking within the rectus muscle. It states: \"Stoma site selection and marking must be undertaken only by qualified practitioners within their scope of practice who possess the knowledge, skill and judgment to perform stoma site marking\". The statement was paid for by educational grants from stoma product makers (B. Braun, Coloplast, Hollister and Nightingale Medical Supplies).",
      evidence: "The statement says of its own evidence that much of the literature is retrospective, observational or expert opinion, and that siting within the rectus muscle rests on expert opinion. ASCRS, which is not industry-funded, names the same principles (several positions, avoiding folds and scars, the beltline, the rectus muscle) without grading them separately from its 1B recommendation to mark the site.",
      sources: ["cscrs-nswocc-2022", "ascrs-2022"],
    },
    {
      name: "High output defined as a syndrome rather than a volume (industry-funded consensus)",
      differs: "Many hospitals act on a daily volume, and a consensus panel reports that sources use more than 1000 ml, more than 1500 ml or more than 2000 ml a day. The panel, convened and funded by Hollister, a stoma product maker, proposes instead a syndrome judged on the whole clinical picture, stating: \"High-output stoma syndrome cannot be defined by volume of ostomy output alone.\"",
      evidence: "Consensus of nurses at a meeting funded by Hollister; one author is a Hollister employee. Independently, a systematic review of 32 studies (768 patients) found no difference in output between controls and somatostatin analogues, loperamide or omeprazole in meta-analysis, and judged the evidence weak because of inconsistent definitions and risk of bias (Lederhuber 2023, abstract).",
      sources: ["carr-hoss-2025", "lederhuber-2023"],
    },
  ],
  grades: [
    { claim: "Preoperative and postoperative ostomy education by a specialised provider", grade: "strong recommendation based on moderate-quality evidence, 1B", source: "ascrs-2022" },
    { claim: "Preoperative marking of potential ostomy sites by a trained provider", grade: "strong recommendation based on moderate-quality evidence, 1B", source: "ascrs-2022", quote: "Given the cumulative evidence and, in particular, the 2 large systematic reviews published in 2020 and 2021, the grade of this recommendation was changed from 1C in 2015 to 1B." },
    { claim: "Follow-up for ostomy teaching, care and support", grade: "strong recommendation based on low-quality evidence, 1C", source: "ascrs-2022" },
    { claim: "A perioperative care pathway for a new ileostomy may reduce readmission", grade: "weak recommendation based on moderate-quality evidence, 2B", source: "ascrs-2022" },
    { claim: "Stomas fashioned to protrude above the skin", grade: "strong recommendation based on low-quality evidence, 1C", source: "ascrs-2022" },
    { claim: "Routine prophylactic mesh at stoma creation to prevent parastomal hernia is not recommended", grade: "weak recommendation based on high-quality evidence, 2A", source: "ascrs-2022", quote: "The routine use of prophylactic mesh to prevent parastomal hernia at the time of ostomy creation is not recommended." },
    { claim: "Readmission for dehydration within 30 days of a new ileostomy: 6 per cent pooled across studies", grade: "Systematic review and meta-analysis of 71 studies (not graded)", source: "vogel-2022", quote: "Dehydration is the leading cause for these readmissions, occurring in 6% of all patients within 30 days." },
    { claim: "Information on stoma care from a trained stoma professional for people with colorectal cancer", grade: "Not graded (NICE NG151, recommendation 1.2.4)", source: "nice-ng151" },
  ],
  sources: [
    {
      key: "ascrs-2022",
      label: "The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for Ostomy Surgery",
      publisher: "ASCRS (Diseases of the Colon and Rectum; Davis et al.); no funding received",
      year: 2022,
      url: "https://doi.org/10.1097/dcr.0000000000002498",
      doi: "10.1097/dcr.0000000000002498",
      gradingScheme: "GRADE: 1 (strong) or 2 (weak) recommendation, on A (high), B (moderate) or C (low or very low) quality evidence.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "rnao-2019",
      label: "Supporting Adults Who Anticipate or Live with an Ostomy, second edition (best practice guideline); rnao.ca refused a script, so it was not read",
      publisher: "Registered Nurses' Association of Ontario",
      year: 2019,
      url: "https://rnao.ca/bpg/guidelines/ostomy",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
    {
      key: "nice-ng151",
      label: "Colorectal cancer (NG151), recommendations (published January 2020, last updated December 2021)",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng151/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations, and this page prints no year tag beside them.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "vogel-2022",
      label: "Overall readmissions and readmissions related to dehydration after creation of an ileostomy: a systematic review and meta-analysis",
      publisher: "Techniques in Coloproctology (Vogel et al.)",
      year: 2022,
      url: "https://doi.org/10.1007/s10151-022-02580-6",
      doi: "10.1007/s10151-022-02580-6",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "migdanis-2018",
      label: "Administration of an Oral Hydration Solution Prevents Electrolyte and Fluid Disturbances and Reduces Readmissions in Patients With a Diverting Ileostomy After Colorectal Surgery: A Prospective, Randomized, Controlled Trial",
      publisher: "Diseases of the Colon and Rectum (Migdanis et al.)",
      year: 2018,
      url: "https://doi.org/10.1097/dcr.0000000000001082",
      doi: "10.1097/dcr.0000000000001082",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "lederhuber-2023",
      label: "Clinical management of high-output stoma: a systematic literature review and meta-analysis",
      publisher: "Techniques in Coloproctology (Lederhuber et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s10151-023-02830-1",
      doi: "10.1007/s10151-023-02830-1",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "cscrs-nswocc-2022",
      label: "Preoperative stoma site marking for fecal diversions (ileostomy and colostomy): position statement of the Canadian Society of Colon and Rectal Surgeons and Nurses Specialized in Wound, Ostomy and Continence Canada (industry-funded: educational grants from B. Braun, Coloplast, Hollister and Nightingale Medical Supplies)",
      publisher: "Canadian Journal of Surgery (Zwiep et al.); industry-funded",
      year: 2022,
      url: "https://doi.org/10.1503/cjs.022320",
      doi: "10.1503/cjs.022320",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "carr-hoss-2025",
      label: "Redefining the High-Output Stoma and Its Bearing on Clinical Practice: Results of an International Consensus Panel (industry-funded: meeting funded by Hollister Incorporated)",
      publisher: "Journal of Wound, Ostomy and Continence Nursing (Carr et al.); industry-funded",
      year: 2025,
      url: "https://doi.org/10.1097/won.0000000000001207",
      doi: "10.1097/won.0000000000001207",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "wocn-2018",
      label: "WOCN Society Clinical Guideline: Management of the Adult Patient With a Fecal or Urinary Ostomy, An Executive Summary",
      publisher: "Wound, Ostomy and Continence Nurses Society (Journal of Wound, Ostomy and Continence Nursing)",
      year: 2018,
      url: "https://doi.org/10.1097/won.0000000000000396",
      doi: "10.1097/won.0000000000000396",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "eras-colorectal-2025",
      label: "Guidelines for perioperative care in elective colorectal surgery: Enhanced Recovery After Surgery (ERAS) Society recommendations 2025",
      publisher: "ERAS Society (Surgery; Gustafsson et al.)",
      year: 2025,
      url: "https://doi.org/10.1016/j.surg.2025.109397",
      doi: "10.1016/j.surg.2025.109397",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  cancers: ["colorectal"],
  technologies: ["ostomy-appliances", "ostomy-skin-care-products"],
  terms: ["stoma", "living-with-a-stoma-bowel-cancer"],
  related: ["enhanced-recovery-after-colorectal-surgery", "enhanced-recovery-after-radical-cystectomy", "surgical-site-infection-prevention", "nutrition-screening-and-support-during-cancer-treatment", "colostomy-irrigation", "ostomy-support-garments", "rejuv-recon-stoma-reversal"],
  upgrades: ["idea-upgrade-daily-oral-rehydration-drink-after-new-ileostomy"],
  gaps: [
    "The RNAO best practice guideline, Supporting Adults Who Anticipate or Live with an Ostomy (second edition, 2019), could not be read: rnao.ca returned 403 to a script. It is the nursing guideline that addresses teaching the signs of dehydration, discharge against readiness criteria, follow-up in the first four weeks at home, prevention of a hernia beside the stoma and quality of life. None of those is a step here for that reason, and nothing on this page rests on it.",
    "Which signs of dehydration to teach, how much to drink and when to call are not stated by any source that could be read; the person's own stoma team will give these.",
    "No independent guideline that could be read states how to fit and change a bag or care for the skin around a stoma. ASCRS puts nursing ostomy care outside its scope. The WOCN Society guideline (2018), which covers pouching systems, skin and stoma complications, is sold by the society and only the abstract of its executive summary could be read; no step rests on it.",
    "No independent guideline read sets a daily volume that defines a high-output stoma or says at what volume to act. The figures in use (more than 1000, 1500 or 2000 ml a day) are reported by an industry-funded consensus, and a 2023 systematic review found the drug evidence weak with inconsistent definitions.",
    "The ASCN UK National Stoma Care Clinical Guidelines are shown to paying members only, so neither their recommendations, their edition date nor their funding could be checked; they are not listed among the sources for that reason.",
    "The ERAS Society colorectal recommendations 2025 could not be read (no abstract indexed, publisher page refused a script), so whether they address stoma teaching or ileostomy output is not known here.",
    "The WOCN Society, AUA and ASCRS position statement on preoperative stoma site marking (2021) could not be read. The detailed marking steps on this page come from an industry-funded Canadian statement and are shown as a variant.",
    "The ileostomy pathway evidence conflicts: ASCRS downgraded its recommendation from strong to weak because a randomised trial of 100 patients found no reduction in readmission. Which parts of a pathway matter is not settled.",
    "The ASCRS guideline describes the oral hydration trial with figures (79 patients; readmission 29% against 10%) that differ from the trial's own abstract (39 and 41 patients; 24% against none). The abstract's figures are used here; the trial's full text was not read.",
    "Urostomy care after bladder removal is outside the ASCRS guideline and NICE NG151 and is not set out here.",
  ],
});
