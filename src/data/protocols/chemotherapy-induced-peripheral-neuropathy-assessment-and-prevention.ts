import { protocol } from "./helpers";

/*
 * Chemotherapy-induced peripheral neuropathy (CIPN): assessment at each cycle, dose modification, duloxetine for
 * painful neuropathy, and hand and foot cooling or compression during taxanes. One record for two census rows (CIPN
 * assessment and dose modification; frozen gloves and compression), because the prevention evidence is read against
 * the same guideline.
 *
 * What was read, and how. First read on 11 November 2026. Second accuracy pass on 17 November 2026: every source
 * was fetched again raw (curl, the Europe PMC REST API, or the PubMed Central page with its tags stripped by script)
 * and read as text, and every quote was checked against the saved text by script.
 * - ASCO CIPN guideline update (Loprinzi et al., J Clin Oncol 2020): abstract only, from Europe PMC; ascopubs.org
 *   answered 403 to a script. No later ASCO update was found in Europe PMC or Crossref.
 * - ESMO-EONS-EANO 2020 guideline on neurotoxicity of systemic anticancer therapy (Ann Oncol 2020): Europe PMC holds no
 *   abstract and the publisher answered 403. Not read.
 * - Australian CIPN clinical pathway Delphi consensus (Mizrahi et al., Support Care Cancer 2022): full text from Europe
 *   PMC (PMC9135801), including the table of statements. The pathway diagram itself is a figure and was not read.
 * - POLAR randomised trial of hand cooling and compression (JAMA Oncol 2025): full text from PubMed Central
 *   (PMC11886872). Its supplements were not read.
 * - CryoPac randomised trial of frozen gloves and socks (Ann Oncol 2026): abstract, from Europe PMC.
 * - Macmillan Cancer Support, Peripheral neuropathy (patient information): full page, added on 17 November 2026 for
 *   the advice to patients, the named drugs and the reason given for cooling.
 * Every DOI was resolved through Europe PMC and Crossref and its title checked. Quotes are copied from the raw text
 * with nothing changed.
 * The second pass softened steps written as orders where the sources hedge, removed reasons no source gives, and
 * corrected two statements about the trials (see the corrections log).
 */
export const chemotherapyInducedPeripheralNeuropathyAssessmentAndPrevention = protocol({
  id: "chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention",
  name: "Chemotherapy nerve damage (peripheral neuropathy): assessment, dose changes and prevention",
  aka: ["CIPN assessment", "chemotherapy-induced peripheral neuropathy", "frozen gloves during paclitaxel", "surgical glove compression during taxanes", "cryotherapy for neuropathy", "duloxetine for chemotherapy neuropathy"],
  domain: "symptom-management",
  tldr: "Some chemotherapy drugs, such as paclitaxel, docetaxel, oxaliplatin, vincristine and bortezomib, can damage the nerves in the hands and feet, causing tingling, numbness or pain. Tell your team about new or worsening symptoms: they may lower the dose or stop the drug. No medicine is proven to prevent it; cooling or compressing the hands is being tested. Duloxetine can help painful nerve damage.",
  simple: "Some chemotherapy can hurt the nerves in hands and feet. Tell your team about tingling or numbness each time. They may change the dose.",
  summary: "ASCO (2020) found that no agent is recommended to prevent CIPN and says acetyl-L-carnitine should be discouraged. Clinicians should assess whether dose delay, dose reduction, substitution or stopping chemotherapy is appropriate in people who develop intolerable neuropathy or loss of function; duloxetine is the only agent with appropriate evidence for established painful CIPN, and its benefit is limited. The abstract read prints no dose. Assessment rests on asking at every cycle: an Australian Delphi consensus (2022) agreed on education before treatment, a history to find risk factors, considering a neurological assessment before treatment or closer monitoring for people with existing neuropathy or at high risk, screening with a short patient-reported questionnaire at every treatment cycle and at follow-up, and encouraging physical activity.\n\nOn prevention by cooling or compression, randomised evidence has grown since ASCO 2020. In POLAR (2025, 122 women with breast cancer on weekly paclitaxel or nab-paclitaxel randomised, 101 analysed, the dominant hand treated and the other as control), a frozen glove or two surgical gloves one size smaller than the tight-fitting size, worn from 30 minutes before to 30 minutes after the infusion, each reduced grade 2 or higher sensory CIPN in the treated hand (cooling 29 against 50 per cent; compression 24 against 38 per cent). In CryoPac (2026, 268 randomised, 217 analysed, frozen gloves and socks), cryotherapy did not significantly reduce CIPN at the end of treatment (74 against 84 per cent, P = 0.071) and made no difference to grade 2 or higher CIPN on the clinician scale POLAR used (P = 0.2), but reduced patient-reported tingling and numbness, with 67 per cent compliance. No guideline read has yet graded these trials.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Adults having neurotoxic chemotherapy: platinum drugs, taxanes, vinca alkaloids, thalidomide, bortezomib and others. POLAR was in women with breast cancer on weekly paclitaxel or nab-paclitaxel, and excluded people with previous chemotherapy, existing neuropathy, conditions linked with neuropathy such as diabetes, or drugs that could mask symptoms. CryoPac was in people having taxane chemotherapy with no symptoms of neuropathy at the start; its abstract does not name the cancer.",
  trigger: "A neurotoxic chemotherapy regimen is planned, and at every cycle.",
  steps: [
    {
      action: "Before treatment, explain nerve damage from chemotherapy and its symptoms",
      why: "The Australian consensus put education before treatment. Macmillan asks people to tell their team about new or worsening symptoms, because nerve damage is better found as early as possible.",
      source: "cipn-path-2022",
      quote: "Patients should receive education about CIPN prior to treatment",
    },
    {
      action: "Take a history for risk factors, and consider a neurological assessment before treatment or closer monitoring for people who already have neuropathy or are at high risk",
      why: "Some people are at higher risk of nerve damage; the consensus was to look for them before treatment starts.",
      source: "cipn-path-2022",
      quote: "Patients with preexisting peripheral neuropathy or who are at high risk should be considered for pretreatment neurological assessment or closer monitoring",
    },
    {
      action: "Screen for neuropathy at every treatment cycle, using a short patient-reported questionnaire, and continue at follow-up",
      why: "The clinician-graded scale in common use may under-report nerve damage compared with what people report themselves; finding symptoms early may allow closer monitoring.",
      source: "cipn-path-2022",
      quote: "Screening for CIPN should occur at every treatment cycle",
    },
    {
      action: "When neuropathy becomes intolerable or affects function, assess whether to delay, reduce, substitute or stop the chemotherapy",
      why: "ASCO asks clinicians to weigh a change of dose or drug at this point. Macmillan tells patients that for some people nerve damage is permanent.",
      source: "asco-2020",
      quote: "Furthermore, clinicians should assess the appropriateness of dose delaying, dose reduction, substitutions, or stopping chemotherapy in patients who develop intolerable neuropathy and/or functional impairment.",
    },
    {
      action: "Do not rely on a drug to prevent neuropathy, and discourage acetyl-L-carnitine for this purpose",
      why: "ASCO recommends no agent for prevention and says the use of acetyl-L-carnitine should be discouraged.",
      source: "asco-2020",
      quote: "The identified data reconfirmed that no agents are recommended for the prevention of CIPN. The use of acetyl-l-carnitine for the prevention of CIPN in patients with cancer should be discouraged.",
    },
    {
      action: "For established painful neuropathy, consider duloxetine and explain that the benefit is limited",
      why: "ASCO found it the only agent with appropriate evidence for established painful CIPN, and says the amount of benefit is limited. The abstract read gives no dose.",
      source: "asco-2020",
      quote: "Duloxetine is the only agent that has appropriate evidence to support its use for patients with established painful CIPN. Nonetheless, the amount of benefit from duloxetine is limited.",
    },
    {
      action: "Encourage physical activity during treatment, and consider closer monitoring, further tests or referral for nerve pain, balance problems, a risk of falls or disturbed sleep",
      why: "The consensus was that activity is encouraged to limit loss of physical function, and that these symptoms may warrant more than routine review.",
      source: "cipn-path-2022",
      quote: "All patients should be encouraged to be physically active during treatment to minimise impairments to physical function",
    },
    {
      action: "During weekly paclitaxel or nab-paclitaxel, discuss hand cooling or compression as an option tested in one trial, not a guideline recommendation: a frozen glove, or two surgical gloves one size smaller than a tight fit, worn from 30 minutes before to 30 minutes after the infusion",
      why: "In one randomised trial both lowered grade 2 or higher sensory nerve damage in the treated hand. Macmillan says cooling can reduce the amount of drug that reaches the hands and feet, and that more research is needed. In the trial the frozen gloves were changed every 30 minutes; six people withdrew because they could not tolerate cooling and one could not tolerate compression.",
      source: "polar-2025",
      quote: "Cooling was performed with a frozen glove and compression was applied by 2 surgical gloves (1 size smaller than the tight-fitting size) 30 minutes before, after, and during taxane administration.",
    },
  ],
  bestInClass: {
    statement: "ASCO 2020 is the latest guideline read, and only as an abstract: no agent is recommended to prevent CIPN, clinicians should assess whether to delay, reduce, substitute or stop chemotherapy when neuropathy is intolerable or limits function, and duloxetine is the only agent with appropriate evidence for established painful CIPN, with limited benefit. Assessment at every cycle with a short patient-reported questionnaire is consensus practice in Australia (CIPN-path, 2022). On cooling and compression the evidence has moved since ASCO 2020 and is mixed: POLAR (2025) found that both a frozen glove and surgical-glove compression reduced grade 2 or higher sensory CIPN in the treated hand, while CryoPac (2026) found that frozen gloves and socks did not significantly reduce CIPN on its primary measure but reduced sensory symptoms. POLAR's authors conclude that compression could have an important role in clinical practice; neither method is a guideline recommendation in any source read, and Macmillan tells patients that more research is needed. The ESMO-EONS-EANO 2020 guideline could not be read.",
    sources: ["asco-2020", "cipn-path-2022", "polar-2025", "cryopac-2026", "macmillan-neuropathy", "esmo-eons-eano-2020"],
  },
  variants: [
    {
      name: "Frozen gloves and socks during all taxane infusions (CryoPac)",
      differs: "Cools hands and feet with frozen gloves and socks during each taxane treatment, rather than one hand as in POLAR.",
      evidence: "Randomised trial of 268 people, 217 analysed: CIPN at end of treatment (total neuropathy score of 2 or more) 74 per cent with cryotherapy against 84 per cent with usual care, not significant (P = 0.071); no difference in grade 2 or higher CIPN on the clinician scale (P = 0.2); less hand tingling, hand numbness and foot numbness on patient report; compliance 67 per cent; no effect on dose modifications. Read as an abstract.",
      sources: ["cryopac-2026"],
    },
    {
      name: "Compression with surgical gloves instead of cooling (POLAR)",
      differs: "Two latex-free surgical gloves one size smaller than the tight-fitting size, worn on one hand from 30 minutes before to 30 minutes after the taxane infusion, with no cooling.",
      evidence: "In POLAR compression lowered grade 2 or higher sensory CIPN from 38 to 24 per cent in the compressed hand against the untreated hand (P = .008); cooling lowered it from 50 to 29 per cent (P = .002). People were randomised to one method or the other, and each was measured against the person's untreated hand; the trial found no significant difference between the two methods. Its authors call compression accessible, cost-effective and well tolerated.",
      sources: ["polar-2025"],
    },
  ],
  grades: [
    { claim: "Hand cooling reduced grade 2 or higher sensory CIPN in POLAR", grade: "not graded: single-centre randomised trial with the other hand as control, P = .002", source: "polar-2025", quote: "Both interventions significantly reduced the incidence of grade 2 or higher CIPN (cooling: 15 participants experiencing high-grade CIPN in the cooling arm [29%] vs 26 in the control arm [50%]; P = .002;" },
    { claim: "Frozen gloves and socks did not significantly reduce CIPN incidence at end of treatment in CryoPac", grade: "not graded: single randomised trial, P = 0.071", source: "cryopac-2026", quote: "Cryotherapy did not significantly reduce CIPN incidence (TNS ≥ 2) at EoT but cryotherapy-treated patients reported fewer sensory symptoms and demonstrated reduced tactile disturbance." },
  ],
  sources: [
    { key: "asco-2020", label: "Prevention and Management of Chemotherapy-Induced Peripheral Neuropathy in Survivors of Adult Cancers: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/32663120", doi: "10.1200/JCO.20.01399", read: "abstract", accessed: "2026-11-17" },
    { key: "cipn-path-2022", label: "Development and consensus process for a clinical pathway for the assessment and management of chemotherapy-induced peripheral neuropathy", publisher: "Supportive Care in Cancer", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9135801/", doi: "10.1007/s00520-022-07024-3", gradingScheme: "Two-stage Delphi of 70 Australian respondents (68 health professionals and 2 consumers; 48 completed the second stage); consensus defined as 80 per cent or more agreeing; statements are not graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "polar-2025", label: "Efficacy of Hand Cooling and Compression in Preventing Taxane-Induced Neuropathy: The POLAR Randomized Clinical Trial", publisher: "JAMA Oncology", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11886872/", doi: "10.1001/jamaoncol.2025.0001", gradingScheme: "A single trial, not a guideline; nothing in it is graded.", read: "full-text", accessed: "2026-11-17" },
    { key: "cryopac-2026", label: "Efficacy of cryotherapy in preventing taxane-induced neuropathy: the CryoPac randomised controlled trial", publisher: "Annals of Oncology", year: 2026, url: "https://europepmc.org/abstract/MED/42838271", doi: "10.1016/j.annonc.2026.09.014", gradingScheme: "A single trial, not a guideline; nothing in it is graded.", read: "abstract", accessed: "2026-11-17" },
    { key: "macmillan-neuropathy", label: "Peripheral neuropathy", publisher: "Macmillan Cancer Support", year: 2026, url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/peripheral-neuropathy", gradingScheme: "Patient information page; not graded. The page prints 1 March 2028 as both its reviewed date and its next review date, so the year it was last reviewed could not be established; the year given is the year it was read.", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-eons-eano-2020", label: "Systemic anticancer therapy-induced peripheral and central neurotoxicity: ESMO-EONS-EANO Clinical Practice Guidelines for diagnosis, prevention, treatment and follow-up", publisher: "ESMO, EONS and EANO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.07.003", doi: "10.1016/j.annonc.2020.07.003", read: "not-reachable", accessed: "2026-11-17" },
  ],
  related: ["idea-moon-neuropathy-prevention-programme"],
  upgrades: ["idea-upgrade-hand-foot-cooling-compression-during-taxanes", "idea-mach-cold-or-compression-by-adherence"],
  gaps: [
    "ASCO 2020 was read only as an abstract; its grades, its position on cryotherapy, compression and exercise, and its dose-modification detail by drug are not given here. On 17 November 2026 ascopubs.org again refused a script, and no later ASCO update was found.",
    "No dose of duloxetine is given on this page: the ASCO abstract prints none, and the full guideline could not be read.",
    "The ESMO-EONS-EANO 2020 guideline could not be read: on 17 November 2026 Europe PMC still held no abstract and the publisher refused a script. No newer edition was found.",
    "No guideline read has graded POLAR (2025) or CryoPac (2026), and the two trials point in somewhat different directions: POLAR found fewer cases of grade 2 or higher CIPN in the treated hand, CryoPac found no difference on that scale or on its primary measure.",
    "No source read sets dose-reduction rules by drug and grade; these come from each regimen's protocol and product information.",
    "Who should not be offered cooling (for example people with Raynaud's phenomenon or cold intolerance) is not stated in the POLAR paper or the CryoPac abstract. POLAR's supplements were not read.",
    "The evidence behind ASCO's advice against acetyl-L-carnitine is not in the abstract read.",
    "The CIPN-path consensus is Australian, 70 of 260 people invited answered, and the pathway diagram is a figure that was not read; its statements are agreement among respondents, not graded recommendations.",
    "The Macmillan page prints 1 March 2028 as both its reviewed date and its next review date, so when it was last reviewed could not be established.",
  ],
  institutions: ["asco"],
  technologies: ["frozen-gloves-compression-taxane", "limb-cryocompression-devices"],
  drugs: ["paclitaxel", "nab-paclitaxel", "docetaxel", "oxaliplatin", "vincristine", "bortezomib", "duloxetine"],
  terms: ["peripheral-neuropathy"],
  sections: ["supportive-care"],
  tags: ["protocol", "neuropathy", "supportive-care"],
});
