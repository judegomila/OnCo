import { protocol } from "./helpers";

/*
 * Stoma care around cancer surgery: preparation and siting before the operation, teaching and pouch care after it,
 * and watching output and hydration with a new ileostomy.
 *
 * The owner's rule for this record: steps rest only on sources stronger than industry-funded consensus. One such
 * guideline was read in full directly from its publisher (ASCRS 2022, no funding received), with NICE NG151, an
 * independent meta-analysis and the NHS patient page on ileostomy complications; every step rests on those.
 * Industry-funded work appears only as labelled variants.
 *
 * Second accuracy pass, 17 November 2026: every source was fetched again as raw text (curl; Europe PMC XML) and every
 * claim, figure and quote re-read against it; quotes were checked by script. What was read, and how:
 * - ASCRS Clinical Practice Guidelines for Ostomy Surgery (Davis et al., Dis Colon Rectum 2022): full text, the free
 *   article HTML served by journals.lww.com through the DOI, stripped to text. It is the current edition (it is based
 *   on the 2015 guideline and updates it; no later one is indexed in Europe PMC, and the guideline says each ASCRS
 *   guideline is in general updated every 5 years). It states: "No funding was received for preparing this
 *   guideline, and the authors have declared no competing interests related to this material." GRADE, quoted as printed.
 *   It also states that nursing ostomy care (skin care, appliances) is beyond its scope.
 * - NICE NG151, Colorectal cancer (published 29 January 2020, last updated 15 December 2021; the overview page says
 *   it was last reviewed on 29 April 2026, when links to technology appraisals were added with no change in
 *   practice): recommendations page, HTML, full text. Its recommendations carry no grade.
 * - Vogel et al., Tech Coloproctol 2022, systematic review of readmission after ileostomy (71 studies): full text,
 *   Europe PMC XML (PMC9018644). The authors declare no conflict of interest. Its abstract gives dehydration
 *   readmission as 6% within 30 days; the conclusion at the end of the full text says "one-third", which does not
 *   match its own results, so the abstract's sentence is the one quoted.
 * - NHS, Complications of an ileostomy (nhs.uk, page last reviewed 13 March 2023, next review printed as due
 *   13 March 2026): HTML, full text. Added in this pass as the source for the signs of dehydration and when to seek
 *   help, which the first version had left as a gap.
 * - ERAS Society colorectal recommendations 2025 (Gustafsson et al., Surgery 2025): now read in full. The journal
 *   site refuses a script; the published open-access PDF (CC BY) deposited in the University of Melbourne's
 *   repository was saved on 17 November 2026 by the checker of the colorectal enhanced recovery protocol, and that
 *   text was re-used. It makes no recommendation on stoma siting, pouch care or ileostomy output; no step rests on it.
 * - Lederhuber et al., Tech Coloproctol 2023, systematic review of high-output stoma management: abstract only.
 * - Migdanis et al., Dis Colon Rectum 2018, randomised trial of an oral hydration solution: abstract only. The ASCRS
 *   guideline describes this trial with different figures (79 patients, 29% against 10%) from the trial's own abstract
 *   (39 and 41 patients, 24% against none); the abstract's figures are the ones used here.
 * - Industry-funded, variants only: the CSCRS and NSWOCC position statement on stoma site marking (Can J Surg 2022,
 *   full text, PMC9202823; "Educational grants were obtained from B. Braun, Coloplast, Hollister and Nightingale
 *   Medical Supplies") and the high-output stoma consensus of Carr et al. (J Wound Ostomy Continence Nurs 2025, full
 *   text, PMC12479063; "Hollister Incorporated provided funding for the meeting").
 * - Still not readable on 17 November 2026: the RNAO best practice guideline, Supporting Adults Who Anticipate or
 *   Live with an Ostomy (second edition, 2019): rnao.ca again returned 403 to a script. An Internet Archive copy was
 *   read in an earlier draft of this file and has been taken out, because a site that refuses a script is not to be
 *   got round; nothing here rests on it, and this pass removed a description of its contents that could not be
 *   re-read. Also not readable: the WOCN Society Clinical Guideline on the adult with a faecal or urinary ostomy (the
 *   2018 executive summary gives only its abstract to a script; the full guideline is sold by the society); the WOCN,
 *   AUA and ASCRS position statement on site marking (2021, doi 10.1097/won.0000000000000820; no abstract indexed,
 *   journal page served no text). The ASCN UK National Clinical Guidelines were not re-checked in this pass.
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
  tldr: "A stoma is an opening on the tummy, made in some bowel cancer operations, through which waste passes into a bag. American surgical guidance asks for teaching from a specialist such as a stoma nurse before and after a planned operation, the site marked beforehand, and follow-up afterwards. With a new ileostomy, about 6 in 100 people return to hospital with dehydration within 30 days.",
  simple: "A stoma lets waste leave the body into a bag on your tummy. A specialist such as a stoma nurse should teach you about it before and after a planned operation, and the best spot for it should be marked beforehand. An ileostomy makes it harder to stay hydrated. The NHS names tiredness, a dry mouth or a lot of output from the stoma as signs of dehydration: speak to your stoma nurse, and ask your team how much to drink.",
  summary: "One independent guideline was read in full: the ASCRS ostomy surgery guideline (2022, GRADE, no funding received). For elective stoma creation it recommends preoperative and postoperative education by a specialised provider such as a wound, ostomy and continence nurse (1B); it also recommends preoperative site marking by a trained provider when possible (1B), a stoma fashioned to protrude above the skin when possible (1C), and states that patients benefit from follow-up for teaching, care and support (1C). For a new ileostomy it says a perioperative care pathway may decrease readmission, a weak recommendation (2B) downgraded from strong in the 2015 edition because studies disagree. NICE NG151 asks that people with colorectal cancer are advised of the likelihood of a stoma and that, if relevant, a trained stoma professional gives information on its care. A meta-analysis of 71 studies put readmission for dehydration within 30 days of a new ileostomy at 6 per cent. The NHS patient page on ileostomy complications names signs of dehydration (fatigue, a dry mouth, a lot of output) and says when to seek help in England. The RNAO nursing guideline (2019) could not be read because its site refused a script, and the WOCN guideline is sold; so no independent guideline read here states pouch-fitting or skin-care technique, how much to drink, or a volume that defines high output. Those are named in the gaps. The reader's own stoma team's instructions come first: this page explains the care, it does not replace it.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "surgical-team", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "ward", "home", "community", "telephone-triage"],
  },
  population: "Adults having a colostomy or ileostomy formed, planned or as an emergency, during cancer surgery, most often for bowel cancer. The ASCRS guideline covers the surgical care of people who need an ostomy and puts urostomies, continent ileostomies, stomas in children and a full review of nursing ostomy care beyond its scope; its recommendation on teaching is written for elective stoma creation. NICE NG151 covers colorectal cancer in people aged 18 and over. The NHS page cited is written for people in England. Urostomy after bladder removal has its own technique and is not covered in detail here. Where these steps read as instructions, your own stoma nurse's and surgical team's protocol comes first.",
  trigger: "An operation that may end with a stoma is being planned, or a stoma has been formed.",
  steps: [
    {
      action: "Advise the person with colorectal cancer that the treatment plan may change during care, including how likely a stoma is, why it might be needed and for how long",
      why: "NICE lists the likelihood of a stoma among the possible changes to a treatment plan that people with colorectal cancer should be advised of.",
      source: "nice-ng151",
      quote: "the likelihood of having a stoma, why it might be necessary and for how long it might be needed.",
      grade: "Not graded (NICE NG151, recommendation 1.2.2)",
    },
    {
      action: "Before a planned stoma, arrange teaching before and after the operation from a specialised provider such as a stoma nurse",
      why: "The guideline says teaching around the time of surgery has been shown to shorten hospital stay, to reduce anxiety and complications around the stoma, and to improve quality of life as patients report it.",
      source: "ascrs-2022",
      quote: "Patients undergoing elective stoma creation should receive preoperative and postoperative ostomy education by a specialized provider such as a wound ostomy and continence nurse.",
      grade: "strong recommendation based on moderate-quality evidence, 1B",
    },
    {
      action: "Have a trained provider mark the possible stoma sites on the skin before the operation, when possible",
      why: "The guideline says marking beforehand is associated with fewer stoma and skin complications and with better self-care. It names the principles: looking at the person in several positions, avoiding folds and scars, considering the beltline, and placing the stoma within the rectus muscle. A certified ostomy nurse is described as ideal, but other trained providers may mark the site, especially in an emergency.",
      source: "ascrs-2022",
      quote: "Appropriate potential ostomy sites should be marked preoperatively by a trained provider, when possible.",
      grade: "strong recommendation based on moderate-quality evidence, 1B",
    },
    {
      action: "At surgery, fashion the stoma so that it stands out above the skin where possible",
      why: "The guideline says most studies find that the less a stoma protrudes, the more likely it is to be a problem stoma, and that surgeons should avoid making a stoma flush with the skin when that is technically possible.",
      source: "ascrs-2022",
      quote: "When possible, both ileostomies and colostomies should be fashioned to protrude above the skin surface.",
      grade: "strong recommendation based on low-quality evidence, 1C",
    },
    {
      action: "Contact the stoma nurse or GP about a problem with the stoma or with the skin around it",
      why: "The NHS says skin damage around the stoma can be helped with products such as sprays or wipes and by measuring the stoma regularly so that the bag fits well. ASCRS, which puts nursing ostomy care beyond its scope, reports a study of 743 long-term ostomy patients in which 61% had skin problems around the stoma and 28% had frequent leakage; leakage fell and skin condition improved after two visits to a specialist nurse.",
      source: "nhs-ileostomy-complications",
      grade: "Not graded (NHS patient information, written for England)",
    },
    {
      action: "After surgery for colorectal cancer, if relevant, have a trained stoma professional give information on caring for the stoma and on learning to live with it",
      why: "NICE asks for this as part of the discussion of possible side effects after surgery, which also covers changes in bowel, urinary and sexual function.",
      source: "nice-ng151",
      quote: "If relevant, have a trained stoma professional provide information on the care and management of stomas and on learning to live with a stoma.",
      grade: "Not graded (NICE NG151, recommendation 1.2.4)",
    },
    {
      action: "Consider managing a new ileostomy on a perioperative care pathway. One pathway the guideline describes combined teaching before surgery, the person managing their own stoma under observation in hospital, and tracking of intake and output after discharge with help from a visiting nurse",
      why: "The guideline says dehydration is the most common cause of illness after a new ileostomy and often leads to readmission. Some pathways reduced readmission and other studies found no reduction, so the recommendation is a weak one and is worded as \"may\".",
      source: "ascrs-2022",
      quote: "Managing patients with a new ileostomy with a perioperative clinical care pathway may decrease the risk of hospital readmission.",
      grade: "weak recommendation based on moderate-quality evidence, 2B",
    },
    {
      action: "With a new ileostomy, monitor for dehydration, make the person aware of it, and take preventive measures",
      why: "In this review dehydration was the leading cause of readmission within 30 days of a new ileostomy, in 6% of all patients, and the authors note that dehydration raises the risk of acute kidney failure. They call for these measures without saying which ones work.",
      source: "vogel-2022",
      quote: "Better monitoring, patient awareness and preventive measures are required.",
      grade: "Systematic review and meta-analysis of 71 studies (authors' conclusion; not graded)",
    },
    {
      action: "Teach the signs of dehydration and whom to contact. The NHS names fatigue, a dry mouth or a lot of output from the stoma, and says to speak to the stoma nurse or another healthcare professional",
      why: "The NHS says an ileostomy makes it harder to stay hydrated. For people in England the same page advises an urgent GP appointment or NHS 111 for signs of dehydration, a very high temperature or feeling hot, cold or shivery, a lot of blood from inside the stoma or in the bag, a stoma that is not active for more than 12 hours, or severe cramps, nausea and vomiting. Other countries have their own routes, and the person's own team may give different contact details.",
      source: "nhs-ileostomy-complications",
      quote: "If you notice signs of dehydration such as fatigue, dry mouth or lots of poo coming out of your stoma, speak to your stoma nurse or another healthcare professional to get advice.",
      grade: "Not graded (NHS patient information, written for England)",
    },
    {
      action: "Arrange stoma nurse follow-up after discharge, at home, in clinic or by telephone, and keep it available in the long term",
      why: "The guideline says people with a permanent stoma may go on having untreated problems over time. In the study it reports, people who saw a specialist nurse again had less leakage and a small improvement in quality of life.",
      source: "ascrs-2022",
      quote: "Patients benefit from follow-up for ostomy teaching, care, and support.",
      grade: "strong recommendation based on low-quality evidence, 1C",
    },
  ],
  bestInClass: {
    statement: "Teaching by a specialised provider before and after elective stoma surgery and preoperative site marking by a trained provider when possible (ASCRS 2022, both strong, 1B), a stoma that protrudes above the skin when possible (1C) and follow-up for teaching, care and support (1C), with NICE NG151 asking that, if relevant, a trained stoma professional gives information on stoma care to people who have had surgery for colorectal cancer. On the new ileostomy, ASCRS gives a perioperative care pathway a weak recommendation (2B) and says it downgraded it from strong because a randomised trial of 100 patients found no fewer readmissions and more outpatient intravenous fluids with an education and monitoring programme, while a retrospective comparison found readmission for dehydration in 3.9% against 15.5%. The NHS patient page names the signs of dehydration to watch for and when to seek help in England. The RNAO nursing guideline could not be read, so its position cannot be set beside this one. No independent guideline that could be read sets a volume that defines high output or a technique for fitting the bag.",
    sources: ["ascrs-2022", "nice-ng151", "vogel-2022", "nhs-ileostomy-complications"],
  },
  variants: [
    {
      name: "A daily oral rehydration drink for everyone with a new ileostomy",
      differs: "Gives an oral isotonic glucose and sodium drink for 40 days after discharge to people with a new diverting ileostomy, rather than no preventive drink.",
      evidence: "One single-centre randomised trial in people having planned rectosigmoid resection (Migdanis 2018, abstract): 39 given the drink for 40 days after discharge and 41 given no intervention. Readmission for fluid and electrolyte problems was 24% without the drink and none with it (p = 0.001). ASCRS cites the trial among the pathway evidence, describing the drink as 1 litre a day, but does not recommend the drink itself. A proposal to test it at scale is linked under upgrades.",
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
      differs: "The Canadian Society of Colon and Rectal Surgeons and Nurses Specialized in Wound, Ostomy and Continence Canada set out 17 steps for marking, including checking the site lying, sitting and standing, avoiding the beltline, and marking within the rectus muscle. It states: \"Stoma site selection and marking must be undertaken only by qualified practitioners within their scope of practice who possess the knowledge, skill and judgment to perform stoma site marking\", and recommends a surgeon or a nurse specialised in wound, ostomy and continence. The statement was paid for by educational grants from stoma product makers (B. Braun, Coloplast, Hollister and Nightingale Medical Supplies).",
      evidence: "The statement says of its own evidence that much of the literature is retrospective, observational or expert opinion, and that siting within the rectus muscle rests on expert opinion. ASCRS, which is not industry-funded, names the same principles (several positions, avoiding folds and scars, the beltline, the rectus muscle) without grading them separately from its 1B recommendation to mark the site.",
      sources: ["cscrs-nswocc-2022", "ascrs-2022"],
    },
    {
      name: "High output defined as a syndrome rather than a volume (industry-funded consensus)",
      differs: "A consensus panel says current definitions focus on output volume and reports that no single volume is agreed: some sources cite more than 1000 ml a day, others more than 1500 ml and others more than 2000 ml. The panel, convened and funded by Hollister, a stoma product maker, proposes instead a syndrome judged on the whole clinical picture, stating: \"High-output stoma syndrome cannot be defined by volume of ostomy output alone.\"",
      evidence: "Consensus of an international forum of ostomy care nurses at a meeting funded by Hollister; one author is a Hollister employee and shareholder, and the panellists and authors received sponsorship or payment from Hollister. The readmission review by Vogel counted 1500 ml or more in 24 hours as high output for its own analysis. Independently, a systematic review of 32 studies (768 patients) found no difference in output between controls and somatostatin analogues, loperamide or omeprazole in meta-analysis, and judged the evidence weak because of inconsistent definitions and risk of bias (Lederhuber 2023, abstract).",
      sources: ["carr-hoss-2025", "lederhuber-2023", "vogel-2022"],
    },
  ],
  grades: [
    { claim: "Preoperative and postoperative ostomy education by a specialised provider for elective stoma creation", grade: "strong recommendation based on moderate-quality evidence, 1B", source: "ascrs-2022" },
    { claim: "Preoperative marking of potential ostomy sites by a trained provider", grade: "strong recommendation based on moderate-quality evidence, 1B", source: "ascrs-2022", quote: "Given the cumulative evidence and, in particular, the 2 large systematic reviews published in 2020 and 2021, the grade of this recommendation was changed from 1C in 2015 to 1B." },
    { claim: "Follow-up for ostomy teaching, care and support", grade: "strong recommendation based on low-quality evidence, 1C", source: "ascrs-2022" },
    { claim: "A perioperative care pathway for a new ileostomy may reduce readmission", grade: "weak recommendation based on moderate-quality evidence, 2B", source: "ascrs-2022" },
    { claim: "Stomas fashioned to protrude above the skin", grade: "strong recommendation based on low-quality evidence, 1C", source: "ascrs-2022" },
    { claim: "Routine prophylactic mesh at stoma creation to prevent parastomal hernia is not recommended", grade: "weak recommendation based on high-quality evidence, 2A", source: "ascrs-2022", quote: "The routine use of prophylactic mesh to prevent parastomal hernia at the time of ostomy creation is not recommended." },
    { claim: "Readmission for dehydration within 30 days of a new ileostomy: 6 per cent pooled across studies", grade: "Systematic review and meta-analysis of 71 studies (not graded)", source: "vogel-2022", quote: "Dehydration is the leading cause for these readmissions, occurring in 6% of all patients within 30 days." },
    { claim: "Information on stoma care from a trained stoma professional, if relevant, for people who have had surgery for colorectal cancer", grade: "Not graded (NICE NG151, recommendation 1.2.4)", source: "nice-ng151" },
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
      accessed: "2026-11-17",
    },
    {
      key: "rnao-2019",
      label: "Supporting Adults Who Anticipate or Live with an Ostomy, second edition (best practice guideline); rnao.ca refused a script, so it was not read",
      publisher: "Registered Nurses' Association of Ontario",
      year: 2019,
      url: "https://rnao.ca/bpg/guidelines/ostomy",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng151",
      label: "Colorectal cancer (NG151), recommendations (published January 2020, last updated December 2021, last reviewed April 2026)",
      publisher: "NICE",
      year: 2020,
      url: "https://www.nice.org.uk/guidance/ng151/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "vogel-2022",
      label: "Overall readmissions and readmissions related to dehydration after creation of an ileostomy: a systematic review and meta-analysis",
      publisher: "Techniques in Coloproctology (Vogel et al.)",
      year: 2022,
      url: "https://doi.org/10.1007/s10151-022-02580-6",
      doi: "10.1007/s10151-022-02580-6",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nhs-ileostomy-complications",
      label: "Complications of an ileostomy (page last reviewed 13 March 2023; written for people in England)",
      publisher: "NHS (nhs.uk)",
      year: 2023,
      url: "https://www.nhs.uk/tests-and-treatments/ileostomy/complications/",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "migdanis-2018",
      label: "Administration of an Oral Hydration Solution Prevents Electrolyte and Fluid Disturbances and Reduces Readmissions in Patients With a Diverting Ileostomy After Colorectal Surgery: A Prospective, Randomized, Controlled Trial",
      publisher: "Diseases of the Colon and Rectum (Migdanis et al.)",
      year: 2018,
      url: "https://doi.org/10.1097/dcr.0000000000001082",
      doi: "10.1097/dcr.0000000000001082",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "lederhuber-2023",
      label: "Clinical management of high-output stoma: a systematic literature review and meta-analysis",
      publisher: "Techniques in Coloproctology (Lederhuber et al.)",
      year: 2023,
      url: "https://doi.org/10.1007/s10151-023-02830-1",
      doi: "10.1007/s10151-023-02830-1",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "cscrs-nswocc-2022",
      label: "Preoperative stoma site marking for fecal diversions (ileostomy and colostomy): position statement of the Canadian Society of Colon and Rectal Surgeons and Nurses Specialized in Wound, Ostomy and Continence Canada (industry-funded: educational grants from B. Braun, Coloplast, Hollister and Nightingale Medical Supplies)",
      publisher: "Canadian Journal of Surgery (Zwiep et al.); industry-funded",
      year: 2022,
      url: "https://doi.org/10.1503/cjs.022320",
      doi: "10.1503/cjs.022320",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "carr-hoss-2025",
      label: "Redefining the High-Output Stoma and Its Bearing on Clinical Practice: Results of an International Consensus Panel (industry-funded: meeting funded by Hollister Incorporated)",
      publisher: "Journal of Wound, Ostomy and Continence Nursing (Carr et al.); industry-funded",
      year: 2025,
      url: "https://doi.org/10.1097/won.0000000000001207",
      doi: "10.1097/won.0000000000001207",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "wocn-2018",
      label: "WOCN Society Clinical Guideline: Management of the Adult Patient With a Fecal or Urinary Ostomy, An Executive Summary",
      publisher: "Wound, Ostomy and Continence Nurses Society (Journal of Wound, Ostomy and Continence Nursing)",
      year: 2018,
      url: "https://doi.org/10.1097/won.0000000000000396",
      doi: "10.1097/won.0000000000000396",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "eras-colorectal-2025",
      label: "Guidelines for perioperative care in elective colorectal surgery: Enhanced Recovery After Surgery (ERAS) Society recommendations 2025",
      publisher: "ERAS Society (Surgery; Gustafsson et al.)",
      year: 2025,
      url: "https://doi.org/10.1016/j.surg.2025.109397",
      doi: "10.1016/j.surg.2025.109397",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["colorectal"],
  technologies: ["ostomy-appliances", "ostomy-skin-care-products"],
  terms: ["stoma", "living-with-a-stoma-bowel-cancer"],
  related: ["enhanced-recovery-after-colorectal-surgery", "enhanced-recovery-after-radical-cystectomy", "surgical-site-infection-prevention", "nutrition-screening-and-support-during-cancer-treatment", "colostomy-irrigation", "ostomy-support-garments", "rejuv-recon-stoma-reversal"],
  upgrades: ["idea-upgrade-daily-oral-rehydration-drink-after-new-ileostomy"],
  gaps: [
    "The RNAO best practice guideline, Supporting Adults Who Anticipate or Live with an Ostomy (second edition, 2019), could not be read: on 17 November 2026 rnao.ca again returned 403 to a script. An earlier version of this page described what it covers; that description could not be re-read and has been removed. The Canadian position statement cited here reports that it includes a strong recommendation, on GRADE, for preoperative stoma site marking. Nothing on this page rests on it.",
    "The signs of dehydration and when to seek help come from an NHS patient page written for England (last reviewed 13 March 2023, with its next review printed as due 13 March 2026); no guideline that could be read states them, and other countries have their own routes. How much to drink is not stated by any source read; the person's own stoma team will say.",
    "No independent guideline that could be read states how to fit and change a bag, how often to change it, or how to care for the skin around a stoma. ASCRS puts nursing ostomy care beyond its scope. The WOCN Society guideline (2018), which covers pouching systems, skin and stoma complications, is sold by the society and only the abstract of its executive summary could be read; no step rests on it.",
    "No independent guideline read sets a daily volume that defines a high-output stoma, says at what volume to act, or recommends a drug or a fluid restriction for it. The figures in use (more than 1000, 1500 or 2000 ml a day) are reported by an industry-funded consensus, and a 2023 systematic review, read as an abstract, found no difference in output between controls and somatostatin analogues, loperamide or omeprazole and judged the evidence weak with inconsistent definitions. No drug dose is given on this page for that reason.",
    "The ASCN UK National Stoma Care Clinical Guidelines were reported in the first version of this page as shown to paying members only; that was not re-checked on 17 November 2026, so their recommendations, edition date and funding remain unchecked and they are not listed among the sources.",
    "The ERAS Society colorectal recommendations 2025 were read in full on 17 November 2026 from the open-access copy in a university repository. They recommend preadmission education for all patients and mention one trial of enhanced recovery and stoma teaching before surgery, but make no recommendation on stoma siting, pouch care or ileostomy output. A corrigendum (Surgery 2026) exists and could not be read.",
    "The WOCN Society, AUA and ASCRS position statement on preoperative stoma site marking (2021) could not be read on 17 November 2026: no abstract is indexed and the journal page gave a script no text. The detailed marking steps on this page come from an industry-funded Canadian statement and are shown as a variant.",
    "The ileostomy pathway evidence conflicts: ASCRS downgraded its recommendation from strong to weak, citing heterogeneous outcomes, among them a randomised trial of 100 patients that found no reduction in readmission. Which parts of a pathway matter is not settled.",
    "The ASCRS guideline describes the oral hydration trial with figures (79 patients; readmission 29% against 10%) that differ from the trial's own abstract (39 and 41 patients; 24% against none). The abstract's figures are used here; the trial's full text was not read.",
    "The readmission review (Vogel 2022) gives dehydration readmission as 6% within 30 days in its abstract and results, pooled from studies that differed widely, while the closing conclusion of its full text says one-third; the 6% figure is the one its results support and is used here.",
    "ASCRS says its guidelines are in general updated every 5 years; no edition later than 2022 was indexed on 17 November 2026.",
    "Urostomy care after bladder removal is outside the ASCRS guideline and NICE NG151 and is not set out here.",
  ],
});
