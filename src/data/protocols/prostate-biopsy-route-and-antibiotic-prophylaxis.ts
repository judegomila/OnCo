import { protocol } from "./helpers";

/*
 * Prostate biopsy: which route (through the skin behind the scrotum, or through the back passage), antibiotics, and
 * what to expect afterwards.
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was fetched again as raw text
 * (curl, tags stripped by script) and every claim re-read against it; all quotes were checked verbatim by script.
 * - EAU Guidelines on Prostate Cancer, 2026 edition (EAU Annual Congress, London 2026), chapter 5 Diagnostic
 *   evaluation and chapter 2 Methods, from uroweb.org: full text (HTML). Sections 5.3.1, 5.6 to 5.6.5 and the
 *   recommendations table with strength ratings were re-read. It is the current edition; the methods chapter says
 *   the next is the 2027 edition.
 * - NICE NG131, Prostate cancer: diagnosis and management (published 9 May 2019, last updated 15 December 2021),
 *   recommendations page: full text (HTML, a copy saved the same day by a sibling checker of this pass), with box 1
 *   on the harms of biopsy; the overview page was fetched for update information (last reviewed 13 August 2025, an
 *   update is in development).
 * - Hu et al., PREVENT randomised trial (European Urology 2024, PMID 38212178): the author manuscript in PubMed
 *   Central (PMC11976521) read in full through the NCBI E-utilities API; Europe PMC's full-text endpoint returned 500.
 * - Bryant et al., TRANSLATE randomised trial (Lancet Oncology 2025, PMID 40139210): abstract, Europe PMC.
 * - Stangl et al., systematic review and meta-analysis of infectious complications after transrectal versus
 *   transperineal biopsy (European Urology Focus 2026, PMID 40774844): abstract, Europe PMC.
 * - AUA/SUO Early Detection of Prostate Cancer guideline: the 2026 amendment (J Urol, PMID 41744286) abstract only; the
 *   guideline page on auanet.org again returned 404 to a script, so its biopsy-technique statements were not read.
 * - Cancer Research UK (transperineal biopsy) and Prostate Cancer UK (prostate biopsy) patient pages: full text
 *   (HTML), added in this pass as the source for which symptoms need urgent help, which the first version stated
 *   without one.
 *
 * Corrected in this pass: reasons in several "why" lines that no source states (how skin cleaning or rectal cleansing
 * works, that targeted or augmented antibiotics prevent more infections) now say what EAU says; "do not stop aspirin"
 * and "plan other blood thinners" went beyond EAU's one sentence; the exceptions to omitting antibiotics named two
 * trial exclusions as if EAU named them; NICE was said to have found no evidence separating the routes, where it
 * says there was a gap in the evidence; a sentence on what many centres do had no source.
 *
 * Every DOI and PubMed id was resolved through Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined; bracketed reference numbers in the EAU text are left out by ending the quote before them.
 */
export const prostateBiopsyRouteAndAntibioticProphylaxis = protocol({
  id: "prostate-biopsy-route-and-antibiotic-prophylaxis",
  name: "Prostate biopsy: transperineal or transrectal route, antibiotic prophylaxis and aftercare",
  aka: ["prostate biopsy", "transperineal biopsy", "LATP", "local anaesthetic transperineal biopsy", "TRUS biopsy", "transrectal ultrasound-guided biopsy", "antibiotics before prostate biopsy", "MRI-targeted prostate biopsy", "post-biopsy sepsis"],
  domain: "screening-diagnostics",
  tldr: "If MRI suggests prostate cancer, needle samples are taken. The European urology guideline recommends going through the skin between the scrotum and the back passage (transperineal), not through the back passage, because infections are rarer, and says men with no extra infection risk need no antibiotics this way. Blood in urine and semen is common afterwards; fever or shivering needs urgent help.",
  simple: "A prostate biopsy takes tiny samples with a needle. It can be done awake with a numbing injection. The needle can go through the skin behind the scrotum or through the back passage. Through the skin causes fewer infections. A little blood in your pee or poo for about two weeks, and in your semen for longer, is common. If you get a high temperature or feel shivery, contact the hospital team straight away or go to A&E.",
  summary: "Biopsy follows a multiparametric MRI in suspected clinically localised prostate cancer and is offered when the MRI score is 3 or more (NICE NG131 1.2.2 to 1.2.4 [2019]). The EAU 2026 guideline recommends the transperineal route (Strong), with surgical disinfection of the perineal skin (Strong), and omitting antibiotic prophylaxis for transperineal biopsy in men without risk factors for infection such as diabetes or a history of urinary retention (Weak). Where transrectal biopsy is done, it recommends povidone-iodine rectal cleansing (Strong) and either targeted prophylaxis from a rectal swab or stool culture or augmented prophylaxis with two or more antibiotic classes (Strong), and gives a Strong rating to avoiding fluoroquinolones because of their legal position in Europe, where the indication for prophylaxis before prostate biopsy is suspended. EAU notes that most studies of targeted and augmented prophylaxis used fluoroquinolones, so how far they apply to other antibiotics is unclear. Both routes can be done under local anaesthetic; EAU recommends an ultrasound-guided periprostatic block.\n\nThe evidence: EAU reports eight randomised trials (1,596 men) with more infectious complications after transrectal biopsy (48 of 789 against 22 of 807, RR 2.48); a review of 165 studies gave sepsis rates of 0.1% transperineal and 0.9% transrectal. Two later trials found no significant difference against transrectal biopsy with antibiotic prophylaxis (PREVENT, targeted prophylaxis: 0 against 4 infections in 658 men, p = 0.059; ProBE-PC: 2.7% against 2.6%). TRANSLATE (1,126 men, 10 UK hospitals) found more grade group 2 or higher cancer with local anaesthetic transperineal biopsy (60% against 54%) and 2 against 9 admissions for infection, while more men reported the biopsy as immediately painful and embarrassing (38% against 27%). A 2026 meta-analysis of 10 trials (4,188 biopsies) found lower odds of admission for infection with transperineal biopsy (OR 0.23, seven trials) and no statistically significant difference with or without antibiotics for transperineal biopsy; its authors note a high risk of bias and few eligible trials. NICE (2019) says \"prostate biopsy\" without choosing a route, records a gap in the evidence on transperineal (non-mapping) biopsy, and advises against mapping transperineal template biopsy as an initial test; NICE reviewed NG131 in 2025 and an update is in development. Low-dose aspirin is not an absolute contraindication (EAU). The harm figures NICE gives (sepsis in a bit fewer than 1 in 100, blood in the semen in 90 in 100) come from transrectal biopsy. For symptoms that need urgent help this page follows UK patient information (Cancer Research UK, Prostate Cancer UK); the guidelines read do not set these out.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer"],
    where: ["outpatient-clinic"],
  },
  population: "Adults with suspected clinically localised prostate cancer having an MRI-directed or systematic prostate biopsy. EAU limits omitting antibiotics to men without risk factors for infectious complications and gives diabetes and a history of urinary retention as examples; TRANSLATE excluded men with symptoms of a current or recent urinary infection, a history of immunocompromise or a need for enhanced antibiotic prophylaxis. Template mapping biopsy under general anaesthetic and biopsy after treatment are not covered.",
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
      action: "Explain the common after-effects and the rare serious ones (sepsis, acute retention of urine, severe bleeding in the urine or from the rectum) before the decision to biopsy",
      why: "NICE asks for the risks and benefits to be discussed. Its figures, which come from transrectal biopsy, show that most people have some bleeding afterwards and that the serious complications are rare.",
      source: "nice-ng131",
      quote: "The most serious is sepsis, which develops in a bit fewer than 1 out of 100 people.",
      grade: "[2019]",
    },
    {
      action: "Do the biopsy through the perineum (transperineal) rather than through the rectum where it can be done",
      why: "EAU gives two reasons: a low risk of infectious complications and less need for antibiotics. It prefers this route despite possible logistical challenges.",
      source: "eau-2026",
      quote: "Perform prostate biopsy using the transperineal approach due to the low risk of infectious complications and better antibiotic stewardship.",
      grade: "Strong",
    },
    {
      action: "Give local anaesthetic into the perineal skin and around the prostate; the biopsy can be done without a general anaesthetic",
      why: "EAU says local anaesthetic can be used effectively for transperineal biopsy, though a review of three studies found more pain than with the transrectal route.",
      source: "eau-2026",
      quote: "Local anaesthesia can also be used effectively for MRI-targeted and systematic transperineal biopsy",
      grade: "Text statement (no strength rating)",
    },
    {
      action: "Disinfect the perineal skin as for surgery before a transperineal biopsy",
      why: "EAU says the quality of the data is low, but the clinical benefit is high and the step is simple to apply.",
      source: "eau-2026",
      quote: "Use routine surgical disinfection of the perineal skin for transperineal biopsy.",
      grade: "Strong",
    },
    {
      action: "For a transperineal biopsy in a man without risk factors for infection, do not give routine antibiotics",
      why: "Reviews and two randomised trials found comparably low infection rates with and without them, and using fewer antibiotics is part of antibiotic stewardship.",
      source: "eau-2026",
      quote: "Omit perioperative antibiotic prophylaxis in transperineal biopsy in patients without risk factors for infectious complications.",
      grade: "Weak",
    },
    {
      action: "If the biopsy is done through the rectum, clean the rectum with povidone-iodine first",
      why: "In pooled randomised trials, povidone-iodine rectal preparation added to antibiotics gave a significantly lower rate of infectious complications (RR 0.47).",
      source: "eau-2026",
      quote: "Use rectal cleansing with povidone-iodine prior to transrectal prostate biopsy.",
      grade: "Strong",
    },
    {
      action: "For a transrectal biopsy, give antibiotics targeted to a rectal swab or stool culture as the first option, or augmented prophylaxis with two or more classes as the second; in Europe, avoid fluoroquinolones",
      why: "Resistance to fluoroquinolones, the traditional choice, has risen and their use for this purpose is suspended in Europe. EAU notes that most studies of these two options used fluoroquinolones, so how well they work with other antibiotics is unclear.",
      source: "eau-2026",
      quote: "First option: Targeted prophylaxis based on rectal swab or stool culture. Second option: Augmented prophylaxis (using two or more different classes of antibiotics).",
      grade: "Strong",
    },
    {
      action: "Send cores from different sites separately to the laboratory",
      why: "The laboratory processes cores from each site separately, as the person doing the biopsy delivers them, and reports them by site.",
      source: "eau-2026",
      quote: "Ensure that prostate core biopsies from different sites are submitted separately for processing and pathology reporting.",
      grade: "Strong",
    },
    {
      action: "Do not treat low-dose aspirin as an absolute bar to biopsy",
      why: "EAU says low-dose aspirin on its own does not rule out a biopsy. The sources read say nothing about other blood thinners.",
      source: "eau-2026",
      quote: "Low-dose aspirin is not an absolute contra-indication",
      grade: "Text statement (no strength rating)",
    },
    {
      action: "Tell the man that blood in the urine, stool and especially semen is common and can last two weeks or more",
      why: "After transrectal biopsy NICE counts blood in the urine in 66 of 100 people, in bowel movements in 37 and in semen in 90; it has no equivalent figures for other routes.",
      source: "nice-ng131",
      quote: "90 out of 100 people have blood in their semen; in 60 of them, it will last for at least 2 weeks; 25 will consider it a moderate or serious problem.",
      grade: "[2019]",
    },
    {
      action: "Tell the man to contact the hospital team straight away, or go to A&E, with a high temperature, shivering or shaking, difficulty passing urine or being unable to, or heavy bleeding",
      why: "UK patient information lists these as signs of infection, sepsis, urine retention or serious bleeding after a biopsy, and says an infection needs antibiotics straight away.",
      source: "pcuk-biopsy",
      quote: "If you have symptoms of sepsis, go to your nearest hospital A&E department straight away.",
      grade: "Patient information (not graded)",
    },
  ],
  bestInClass: {
    statement: "Transperineal biopsy under local anaesthetic, with surgical skin disinfection and without routine antibiotics in men without risk factors (EAU 2026: route Strong, skin disinfection Strong, omitting antibiotics Weak). The route recommendation rests on fewer infections in pooled randomised trials and large cohorts, a higher detection of significant cancer in TRANSLATE, and antibiotic stewardship; EAU notes the certainty for the infection benefit is low but rates it strong for its clinical significance. Where transrectal biopsy is used, povidone-iodine rectal cleansing and targeted or augmented prophylaxis without fluoroquinolones (EAU Strong). NICE NG131 (2019) does not choose a route: its committee identified a gap in the evidence on transperineal (non-mapping) biopsy, and it predates PREVENT, ProBE-PC and TRANSLATE. The two later trials EAU cites comparing transperineal biopsy with transrectal biopsy under antibiotics did not show a significant difference in infection, so the size of the advantage over well-protected transrectal biopsy is uncertain.",
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
      differs: "NICE NG131 refers to \"prostate biopsy\" in its recommendations and recommends against mapping transperineal template biopsy as part of an initial assessment unless in a trial (1.2.5 [2019]); it does not recommend one route of non-mapping biopsy over the other, and its box 1 harms figures come from transrectal biopsy in PROMIS and ProtecT.",
      evidence: "The 2019 committee identified a gap in the evidence on the performance of transperineal (non-mapping) biopsy and made a research recommendation on it. NICE says there is no data equivalent to box 1 for other types of biopsy.",
      sources: ["nice-ng131"],
    },
    {
      name: "Antibiotic prophylaxis for transperineal biopsy",
      differs: "Antibiotic prophylaxis is given before transperineal biopsy, as it was for 29,880 of the men in one review EAU cites, against 4,772 who had none.",
      evidence: "EAU summarises meta-analyses of non-randomised cohorts and two randomised trials showing comparable infection rates with and without prophylaxis (for example 1.35% of 29,880 with against 1.22% of 4,772 without); the 2026 meta-analysis of randomised trials found no statistically significant difference. EAU's recommendation to omit prophylaxis covers only men without risk factors, of which it gives diabetes and a history of urinary retention as examples.",
      sources: ["eau-2026", "euf-meta-2026"],
    },
    {
      name: "AUA/SUO Early Detection of Prostate Cancer guideline (2026 amendment)",
      differs: "The United States guideline was reviewed in 2025 and its amendment published in 2026, with updated statements that include biopsy technique. Its statements could not be read for this page.",
      evidence: "Only the abstract was reachable; it reports revised strength of evidence on the use of MRI in biopsy-naive patients and on biopsy techniques without stating them.",
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
    { claim: "Go to A&E straight away with symptoms of sepsis after a biopsy", grade: "Patient information (not graded)", source: "pcuk-biopsy" },
  ],
  sources: [
    {
      key: "eau-2026",
      label: "EAU Guidelines on Prostate Cancer, chapter 5: Diagnostic evaluation (2026 edition, EAU Annual Congress, London 2026)",
      publisher: "European Association of Urology (EAU)",
      year: 2026,
      url: "https://uroweb.org/guidelines/prostate-cancer/chapter/diagnostic-evaluation",
      gradingScheme: "Each summary of evidence carries a level of evidence (1a and 2 in this section); each recommendation is rated Strong or Weak, weighing the quality of the evidence, the balance of benefit and harm, and patient values and preferences.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng131",
      label: "Prostate cancer: diagnosis and management (NG131), recommendations (last updated 15 December 2021)",
      publisher: "NICE",
      year: 2021,
      url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written or amended.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "prevent-2024",
      label: "Transperineal Versus Transrectal Magnetic Resonance Imaging-targeted and Systematic Prostate Biopsy to Prevent Infectious Complications: The PREVENT Randomized Trial",
      publisher: "Hu et al., European Urology",
      year: 2024,
      url: "https://doi.org/10.1016/j.eururo.2023.12.015",
      doi: "10.1016/j.eururo.2023.12.015",
      gradingScheme: "Randomised trial; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "translate-2025",
      label: "Local anaesthetic transperineal biopsy versus transrectal prostate biopsy in prostate cancer detection (TRANSLATE): a multicentre, randomised, controlled trial",
      publisher: "Bryant et al., Lancet Oncology",
      year: 2025,
      url: "https://doi.org/10.1016/s1470-2045(25)00100-7",
      doi: "10.1016/s1470-2045(25)00100-7",
      gradingScheme: "Randomised trial; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "euf-meta-2026",
      label: "Infectious Complications After Transrectal Versus Transperineal Prostate Biopsy: A Systematic Review and Meta-analysis",
      publisher: "Stangl et al., European Urology Focus",
      year: 2026,
      url: "https://doi.org/10.1016/j.euf.2025.07.005",
      doi: "10.1016/j.euf.2025.07.005",
      gradingScheme: "Systematic review and meta-analysis of randomised trials (RoB 2); not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "aua-2026",
      label: "Updates to Early Detection of Prostate Cancer: AUA/SUO Guideline (2026)",
      publisher: "American Urological Association and Society of Urologic Oncology (Journal of Urology)",
      year: 2026,
      url: "https://doi.org/10.1097/ju.0000000000004995",
      doi: "10.1097/ju.0000000000004995",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "pcuk-biopsy",
      label: "Prostate biopsy (patient information, updated June 2025)",
      publisher: "Prostate Cancer UK",
      year: 2025,
      url: "https://prostatecanceruk.org/prostate-information-and-support/prostate-tests/prostate-biopsy",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-transperineal-biopsy",
      label: "Transperineal biopsy (patient information, last reviewed 15 May 2025)",
      publisher: "Cancer Research UK",
      year: 2025,
      url: "https://www.cancerresearchuk.org/about-cancer/tests-and-scans/transperineal-biopsy",
      gradingScheme: "Patient information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["transperineal-prostate-biopsy-devices", "mri", "ultrasound"],
  cancers: ["prostate"],
  terms: ["biopsy", "template-mapping-biopsy"],
  institutions: ["nice"],
  related: [],
  upgrades: [],
  gaps: [
    "The AUA/SUO guideline statements on biopsy route and antibiotics were not read: on 17 November 2026 the guideline page again returned 404 to a script and only the abstract of the 2026 amendment was available.",
    "TRANSLATE and the 2026 meta-analysis were read as abstracts only; PREVENT was read in full as its author manuscript. Figures on this page are those the abstracts and the EAU text state. ProBE-PC and the reviews EAU cites were not read themselves.",
    "Which risk factors should keep antibiotics for transperineal biopsy is not settled: EAU names diabetes and a history of urinary retention as examples, and TRANSLATE excluded men with immunocompromise or a need for enhanced prophylaxis.",
    "No antibiotic, dose or timing is named on this page because EAU's recommendation names none: it says no standard augmented combination without fluoroquinolones has been established, that there are no randomised trials of targeted prophylaxis with other antibiotics, and that the fluoroquinolone restriction is a European one. Its text adds that, where fluoroquinolones are suspended, cephalosporins or aminoglycosides can be used as individual agents, and that urologists should check local guidance on fosfomycin trometamol.",
    "Management of anticoagulants and of antiplatelet drugs other than low-dose aspirin before prostate biopsy is not addressed by the sources read.",
    "NICE NG131 has not been updated on biopsy route since 2019 and its harm figures describe transrectal biopsy only. NICE reviewed the guideline in May and August 2025 and an update is in development; its scope names localised and locally advanced prostate cancer, with further areas identified during scoping.",
    "Neither EAU nor NICE sets out which symptoms after a biopsy need urgent help or how fast. The step on this rests on UK patient information from Prostate Cancer UK and Cancer Research UK, read on 17 November 2026, which names the hospital team, the GP and A&E as where to go; the Prostate Cancer UK page carries a review date of June 2026 that had passed when it was read.",
  ],
});
