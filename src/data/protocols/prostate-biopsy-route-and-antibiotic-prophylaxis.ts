import { protocol } from "./helpers";

/*
 * Prostate biopsy: which route (through the skin behind the scrotum, or through the back passage), antibiotics, and
 * what to expect afterwards.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - EAU Guidelines on Prostate Cancer, 2026 edition (presented at the EAU Annual Congress, London 2026), chapter 5
 *   Diagnostic evaluation, from uroweb.org: full text of the chapter (HTML). Sections 5.5 to 5.6.5 and the
 *   recommendations table with strength ratings were read.
 * - NICE NG131, Prostate cancer: diagnosis and management (published May 2019, last updated 15 December 2021),
 *   recommendations page: full text (HTML), including box 1 on the harms of biopsy.
 * - Hu et al., PREVENT randomised trial (European Urology 2024): abstract, Europe PMC (PMID 38212178).
 * - Bryant et al., TRANSLATE randomised trial (Lancet Oncology 2025): abstract, Europe PMC (PMID 40139210).
 * - Systematic review and meta-analysis of infectious complications after transrectal versus transperineal biopsy
 *   (European Urology Focus 2026, PMID 40774844): abstract, Europe PMC.
 * - AUA/SUO Early Detection of Prostate Cancer guideline: the 2026 amendment (J Urol, PMID 41744286) abstract only; the
 *   guideline page on auanet.org returned 404 to a script and the 2023 Part II full text was not available from Europe
 *   PMC, so its biopsy-technique statements were not read.
 *
 * Every DOI and PubMed id was resolved through Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined; bracketed reference numbers in the EAU text are left out by ending the quote before them.
 */
export const prostateBiopsyRouteAndAntibioticProphylaxis = protocol({
  id: "prostate-biopsy-route-and-antibiotic-prophylaxis",
  name: "Prostate biopsy: transperineal or transrectal route, antibiotic prophylaxis and aftercare",
  aka: ["prostate biopsy", "transperineal biopsy", "LATP", "local anaesthetic transperineal biopsy", "TRUS biopsy", "transrectal ultrasound-guided biopsy", "antibiotics before prostate biopsy", "MRI-targeted prostate biopsy", "post-biopsy sepsis"],
  domain: "screening-diagnostics",
  tldr: "If an MRI suggests prostate cancer, needle samples are taken. The European urology guideline now recommends going through the skin between the scrotum and the back passage (transperineal) rather than through the back passage, because infections are rarer, and says most men having it this way need no antibiotics. Blood in urine and semen afterwards is common; fever or shivering needs urgent help.",
  simple: "A prostate biopsy takes tiny samples with a needle. It is usually done awake with a numbing injection. The needle can go through the skin behind the scrotum or through the back passage. Through the skin causes fewer infections. Blood in your pee or semen for a few weeks is common. If you get a fever or feel shivery and unwell, get help straight away.",
  summary: "Biopsy follows a multiparametric MRI in suspected clinically localised prostate cancer and is offered when the MRI score is 3 or more (NICE NG131 1.2.2 to 1.2.4 [2019]). The EAU 2026 guideline recommends the transperineal route (Strong), with surgical disinfection of the perineal skin (Strong), and omitting antibiotic prophylaxis for transperineal biopsy in men without risk factors for infection such as diabetes or a history of urinary retention (Weak). Where transrectal biopsy is done, it recommends povidone-iodine rectal cleansing (Strong) and either targeted prophylaxis from a rectal swab or stool culture or augmented prophylaxis with two or more antibiotic classes (Strong), and avoiding fluoroquinolones (Strong, because of European restrictions). Both routes can be done under local anaesthetic; a periprostatic block is the standard for transrectal biopsy.\n\nThe evidence: EAU pooled eight randomised trials (1,596 men) with more infections after transrectal biopsy (48 of 789 against 22 of 807, RR 2.48); a review of 165 studies gave sepsis rates of 0.1% transperineal and 0.9% transrectal. Two later trials found no significant difference against transrectal biopsy with targeted or standard prophylaxis (PREVENT: 0 against 4 infections in 658 men, p = 0.059; ProBE-PC: 2.7% against 2.6%). TRANSLATE (1,126 men, 10 UK hospitals) found more grade group 2 or higher cancer with local anaesthetic transperineal biopsy (60% against 54%) and 2 against 9 admissions for infection, at the cost of more immediate pain and embarrassment (38% against 27%). A 2026 meta-analysis of 10 trials (4,188 biopsies) found lower odds of admission for infection with transperineal biopsy (OR 0.23) and no difference with or without antibiotics for transperineal biopsy. NICE (2019) found no evidence to separate the two routes and says \"prostate biopsy\" throughout; it advises against mapping transperineal template biopsy as an initial test. Low-dose aspirin is not an absolute contraindication (EAU).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic"],
  },
  population: "Adults with suspected clinically localised prostate cancer having a first or repeat MRI-directed or systematic prostate biopsy. Men with risk factors for infection (diabetes, a history of urinary retention, immunosuppression, a recent urinary infection) are named as exceptions to omitting antibiotics. Template mapping biopsy under general anaesthetic and biopsy after treatment are not covered.",
  trigger: "An MRI or clinical findings lead to a decision to biopsy the prostate.",
  steps: [
    {
      action: "Use multiparametric MRI first, and offer an MRI-influenced biopsy when the Likert score is 3 or more",
      why: "The MRI shows where to aim the needle and lets some men with a reassuring scan avoid a biopsy.",
      source: "nice-ng131",
      quote: "Offer multiparametric MRI-influenced prostate biopsy to people whose Likert score is 3 or more.",
      grade: "[2019]",
    },
    {
      action: "Explain the common after-effects and the rare serious ones (infection and sepsis, retention of urine, heavy bleeding) before consent",
      why: "Most men get some bleeding afterwards and knowing what is normal makes it easier to spot what is not.",
      source: "nice-ng131",
      quote: "The most serious is sepsis, which develops in a bit fewer than 1 out of 100 people.",
      grade: "[2019]",
    },
    {
      action: "Do the biopsy through the perineum (transperineal) rather than through the rectum where it can be done",
      why: "Going through skin that can be cleaned, rather than through the bowel, leads to fewer infections.",
      source: "eau-2026",
      quote: "Perform prostate biopsy using the transperineal approach due to the low risk of infectious complications and better antibiotic stewardship.",
      grade: "Strong",
    },
    {
      action: "Give local anaesthetic into the perineal skin and around the prostate; the biopsy does not need a general anaesthetic",
      why: "Numbing the area makes the procedure tolerable as a clinic appointment.",
      source: "eau-2026",
      quote: "Local anaesthesia can also be used effectively for MRI-targeted and systematic transperineal biopsy",
      grade: "Summary of evidence (no strength rating)",
    },
    {
      action: "Disinfect the perineal skin as for surgery before a transperineal biopsy",
      why: "Clean skin keeps skin bacteria from being carried in by the needle.",
      source: "eau-2026",
      quote: "Use routine surgical disinfection of the perineal skin for transperineal biopsy.",
      grade: "Strong",
    },
    {
      action: "For a transperineal biopsy in a man without risk factors for infection, do not give routine antibiotics",
      why: "Trials and reviews found infection rates just as low without them, and unnecessary antibiotics breed resistant bacteria.",
      source: "eau-2026",
      quote: "Omit perioperative antibiotic prophylaxis in transperineal biopsy in patients without risk factors for infectious complications.",
      grade: "Weak",
    },
    {
      action: "If the biopsy is done through the rectum, clean the rectum with povidone-iodine first",
      why: "Reducing the bacteria in the bowel lowers the chance the needle carries them into the prostate.",
      source: "eau-2026",
      quote: "Use rectal cleansing with povidone-iodine prior to transrectal prostate biopsy.",
      grade: "Strong",
    },
    {
      action: "For a transrectal biopsy, give antibiotics targeted to a rectal swab or stool culture, or augmented prophylaxis with two or more classes; avoid fluoroquinolones",
      why: "Bowel bacteria are often resistant to the old standard antibiotic, and choosing by culture or covering more widely prevents more infections.",
      source: "eau-2026",
      quote: "First option: Targeted prophylaxis based on rectal swab or stool culture. Second option: Augmented prophylaxis (using two or more different classes of antibiotics).",
      grade: "Strong",
    },
    {
      action: "Send cores from different sites separately to the laboratory",
      why: "Knowing where each sample came from tells the team where the cancer is and how much there is.",
      source: "eau-2026",
      quote: "Ensure that prostate core biopsies from different sites are submitted separately for processing and pathology reporting.",
      grade: "Strong",
    },
    {
      action: "Do not stop low-dose aspirin as a matter of routine; plan other blood thinners with the team",
      why: "Aspirin on its own does not rule out a biopsy; stronger blood thinners need an individual plan.",
      source: "eau-2026",
      quote: "Low-dose aspirin is not an absolute contra-indication",
      grade: "Text statement (no strength rating)",
    },
    {
      action: "Tell the man that blood in the urine, stool and especially semen is common and can last weeks, and that fever, shivering or being unable to pass urine needs urgent care",
      why: "Bleeding is expected and settles; infection and urinary retention are the after-effects that need treatment quickly.",
      source: "nice-ng131",
      quote: "90 out of 100 people have blood in their semen; in 60 of them, it will last for at least 2 weeks; 25 will consider it a moderate or serious problem.",
      grade: "[2019]",
    },
  ],
  bestInClass: {
    statement: "Transperineal biopsy under local anaesthetic, with surgical skin disinfection and without routine antibiotics in men without risk factors (EAU 2026: route Strong, skin disinfection Strong, omitting antibiotics Weak). The route recommendation rests on fewer infections in pooled randomised trials and large cohorts, a higher detection of significant cancer in TRANSLATE, and antibiotic stewardship; EAU notes the certainty for the infection benefit is low but rates it strong for its clinical significance. Where transrectal biopsy is used, povidone-iodine rectal cleansing and targeted or augmented prophylaxis without fluoroquinolones (EAU Strong). NICE NG131 (2019) does not choose a route: its committee found no evidence to separate them, and it predates PREVENT, ProBE-PC and TRANSLATE. The two later trials comparing transperineal biopsy with transrectal biopsy under antibiotics did not show a significant difference in infection, so the size of the advantage over well-protected transrectal biopsy is uncertain.",
    sources: ["eau-2026", "nice-ng131", "translate-2025", "prevent-2024", "euf-meta-2026"],
  },
  variants: [
    {
      name: "Transrectal biopsy with targeted prophylaxis (PREVENT comparator)",
      differs: "Rectal culture screening for fluoroquinolone-resistant bacteria and antibiotics chosen from the culture, then transrectal biopsy, instead of transperineal biopsy without antibiotics.",
      evidence: "PREVENT (658 men): 4 infections (1.4%) after transrectal biopsy with targeted prophylaxis against none after transperineal biopsy, p = 0.059; cancer detection similar (53% against 50%). The authors say it achieves similar infection rates but needs rectal cultures and careful antibiotic selection.",
      sources: ["prevent-2024", "eau-2026"],
    },
    {
      name: "NICE: no preference of route",
      differs: "NICE NG131 refers to \"prostate biopsy\" throughout and recommends against mapping transperineal template biopsy as part of an initial assessment unless in a trial (1.2.5 [2019]); it does not recommend one route of non-mapping biopsy over the other, and its box 1 harms figures come from transrectal biopsy in PROMIS and ProtecT.",
      evidence: "The 2019 committee found no evidence to separate transperineal (non-mapping) and transrectal biopsy and made a research recommendation on the transperineal route.",
      sources: ["nice-ng131"],
    },
    {
      name: "Antibiotic prophylaxis for transperineal biopsy",
      differs: "Many centres still give a single antibiotic dose before transperineal biopsy.",
      evidence: "EAU summarises meta-analyses of non-randomised cohorts and two randomised trials showing comparable infection rates with and without prophylaxis (for example 1.35% of 29,880 with against 1.22% of 4,772 without); the 2026 meta-analysis of randomised trials found no significant difference. EAU keeps prophylaxis for men with risk factors such as diabetes or a history of urinary retention.",
      sources: ["eau-2026", "euf-meta-2026"],
    },
    {
      name: "AUA/SUO Early Detection of Prostate Cancer guideline (2026 amendment)",
      differs: "The United States guideline was amended in 2025 to 2026 with revised statements on biopsy technique. Its statements could not be read for this page.",
      evidence: "Only the abstract was reachable; it reports revised strength of evidence on biopsy techniques without stating them.",
      sources: ["aua-2026"],
    },
  ],
  grades: [
    { claim: "Transperineal route", grade: "Strong", source: "eau-2026", quote: "Although data showing the lower risk of infection via the transperineal approach is low in certainty, its statistical and clinical significance warrants its strong rating." },
    { claim: "Omit antibiotics for transperineal biopsy in men without risk factors", grade: "Weak", source: "eau-2026" },
    { claim: "Surgical disinfection of perineal skin", grade: "Strong", source: "eau-2026" },
    { claim: "Povidone-iodine rectal cleansing before transrectal biopsy", grade: "Strong", source: "eau-2026" },
    { claim: "Targeted or augmented antibiotic prophylaxis for transrectal biopsy", grade: "Strong", source: "eau-2026" },
    { claim: "Avoid fluoroquinolones for prostate biopsy", grade: "Strong", source: "eau-2026", quote: "A ‘Strong’ rating is given for avoiding fluoroquinolones in prostate biopsy due to its legal implications in Europe." },
    { claim: "Offer MRI-influenced biopsy when the Likert score is 3 or more", grade: "[2019]", source: "nice-ng131" },
    { claim: "Do not offer mapping transperineal template biopsy at initial assessment, unless in a trial", grade: "[2019]", source: "nice-ng131", quote: "Do not offer mapping transperineal template biopsy as part of an initial assessment, unless as part of a clinical trial." },
  ],
  sources: [
    {
      key: "eau-2026",
      label: "EAU Guidelines on Prostate Cancer, chapter 5: Diagnostic evaluation (2026 edition, presented at the EAU Annual Congress, London 2026)",
      publisher: "European Association of Urology (EAU)",
      year: 2026,
      url: "https://uroweb.org/guidelines/prostate-cancer/chapter/diagnostic-evaluation",
      gradingScheme: "Levels of evidence 1a to 4 (modified Oxford) for each summary of evidence; recommendations rated Strong or Weak (modified GRADE).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng131",
      label: "Prostate cancer: diagnosis and management (NG131), recommendations (last updated 15 December 2021)",
      publisher: "NICE",
      year: 2021,
      url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "prevent-2024",
      label: "Transperineal Versus Transrectal Magnetic Resonance Imaging-targeted and Systematic Prostate Biopsy to Prevent Infectious Complications: The PREVENT Randomized Trial",
      publisher: "Hu et al., European Urology",
      year: 2024,
      url: "https://doi.org/10.1016/j.eururo.2023.12.015",
      doi: "10.1016/j.eururo.2023.12.015",
      gradingScheme: "Randomised trial; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "translate-2025",
      label: "Local anaesthetic transperineal biopsy versus transrectal prostate biopsy in prostate cancer detection (TRANSLATE): a multicentre, randomised, controlled trial",
      publisher: "Lancet Oncology",
      year: 2025,
      url: "https://doi.org/10.1016/s1470-2045(25)00100-7",
      doi: "10.1016/s1470-2045(25)00100-7",
      gradingScheme: "Randomised trial; not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "euf-meta-2026",
      label: "Infectious Complications After Transrectal Versus Transperineal Prostate Biopsy: A Systematic Review and Meta-analysis",
      publisher: "European Urology Focus",
      year: 2026,
      url: "https://doi.org/10.1016/j.euf.2025.07.005",
      doi: "10.1016/j.euf.2025.07.005",
      gradingScheme: "Systematic review and meta-analysis of randomised trials (RoB 2); not graded.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "aua-2026",
      label: "Updates to Early Detection of Prostate Cancer: AUA/SUO Guideline (2026)",
      publisher: "American Urological Association and Society of Urologic Oncology (Journal of Urology)",
      year: 2026,
      url: "https://doi.org/10.1097/ju.0000000000004995",
      doi: "10.1097/ju.0000000000004995",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["transperineal-prostate-biopsy-devices", "mri", "ultrasound"],
  cancers: ["prostate"],
  terms: ["biopsy", "template-mapping-biopsy"],
  institutions: ["nice"],
  related: [],
  upgrades: [],
  gaps: [
    "The AUA/SUO guideline statements on biopsy route and antibiotics were not read: the guideline page returned 404 to a script and only the abstract of the 2026 amendment was available.",
    "PREVENT, TRANSLATE and the 2026 meta-analysis were read as abstracts only; figures on this page are those the abstracts and the EAU text state.",
    "Which risk factors should keep antibiotics for transperineal biopsy is not settled: EAU names diabetes and a history of urinary retention as examples, and the trials excluded men with immunocompromise or a need for enhanced prophylaxis.",
    "Management of anticoagulants other than low-dose aspirin before prostate biopsy is not addressed by the sources read.",
    "NICE NG131 has not been updated on biopsy route since 2019 and its harm figures describe transrectal biopsy only.",
  ],
});
