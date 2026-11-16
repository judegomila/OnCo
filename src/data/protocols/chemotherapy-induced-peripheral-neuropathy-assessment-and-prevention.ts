import { protocol } from "./helpers";

/*
 * Chemotherapy-induced peripheral neuropathy (CIPN): assessment at each cycle, dose modification, duloxetine for
 * painful neuropathy, and hand and foot cooling or compression during taxanes. One record for two census rows (CIPN
 * assessment and dose modification; frozen gloves and compression), because the prevention evidence is read against
 * the same guideline.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl or the Europe PMC REST API into a scratch
 * directory and read as text):
 * - ASCO CIPN guideline update (Loprinzi et al., J Clin Oncol 2020): abstract only, from Europe PMC; ascopubs.org
 *   refused a script. No later ASCO update was found.
 * - ESMO-EONS-EANO 2020 guideline on neurotoxicity of systemic anticancer therapy (Ann Oncol 2020): Europe PMC holds no
 *   abstract and the publisher refused a script. Not read.
 * - Australian CIPN clinical pathway Delphi consensus (Mizrahi et al., Support Care Cancer 2022): full text from PubMed
 *   Central (PMC9135801), including the table of statements and agreement.
 * - POLAR randomised trial of hand cooling and compression (JAMA Oncol 2025): full text from PubMed Central
 *   (PMC11886872).
 * - CryoPac randomised trial of frozen gloves and socks (Ann Oncol 2026): abstract, from Europe PMC.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with nothing
 * changed.
 */
export const chemotherapyInducedPeripheralNeuropathyAssessmentAndPrevention = protocol({
  id: "chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention",
  name: "Chemotherapy nerve damage (peripheral neuropathy): assessment, dose changes and prevention",
  aka: ["CIPN assessment", "chemotherapy-induced peripheral neuropathy", "frozen gloves during paclitaxel", "surgical glove compression during taxanes", "cryotherapy for neuropathy", "duloxetine for chemotherapy neuropathy"],
  domain: "symptom-management",
  tldr: "Some chemotherapy drugs, such as paclitaxel, docetaxel, oxaliplatin, vincristine and bortezomib, can damage the nerves in the hands and feet, causing tingling, numbness or pain. Tell your team at every visit: the dose can be lowered or delayed before the damage lasts. No medicine is proven to prevent it; cooling or compressing the hands is being tested. Duloxetine can help painful nerve damage.",
  simple: "Some chemotherapy can hurt the nerves in hands and feet. Tell your team about tingling or numbness each time. They may change the dose.",
  summary: "ASCO (2020) found that no agent is recommended to prevent CIPN and discourages acetyl-L-carnitine. Clinicians should consider dose delay, dose reduction, substitution or stopping the drug in people who develop intolerable neuropathy or loss of function; duloxetine is the only drug with appropriate evidence for established painful CIPN, and its benefit is limited. Assessment rests on asking at every cycle: an Australian Delphi consensus (2022) agreed on education before treatment, a history to find risk factors, closer monitoring or a baseline neurological assessment for people with existing neuropathy, screening with a short patient-reported questionnaire at every treatment cycle and at follow-up, and encouraging physical activity.\n\nOn prevention by cooling or compression, randomised evidence has grown since ASCO 2020. In POLAR (2025, 122 women on weekly paclitaxel or nab-paclitaxel, one hand treated and the other as control), a frozen glove or two surgical gloves one size too small, worn from 30 minutes before to 30 minutes after the infusion, each reduced grade 2 or higher sensory CIPN (cooling 29 against 50 per cent; compression 24 against 38 per cent). In CryoPac (2026, 268 randomised, frozen gloves and socks), cryotherapy did not significantly reduce CIPN at the end of treatment (74 against 84 per cent) but reduced patient-reported tingling and numbness, with 67 per cent compliance. No guideline read has yet graded these trials.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "outpatient-clinic"],
  },
  population: "Adults having neurotoxic chemotherapy: taxanes, platinum drugs (above all oxaliplatin), vinca alkaloids, bortezomib and others. The cooling and compression trials were in women with breast cancer on weekly paclitaxel or nab-paclitaxel (POLAR) or taxane chemotherapy (CryoPac). POLAR excluded people with previous chemotherapy, existing neuropathy or conditions linked with neuropathy.",
  trigger: "A neurotoxic chemotherapy regimen is planned, and at every cycle.",
  steps: [
    {
      action: "Before treatment, explain the symptoms of nerve damage and ask the person to report them",
      why: "Tingling and numbness are easy to dismiss; people who know to report them help the team act early.",
      source: "cipn-path-2022",
      quote: "Patients should receive education about CIPN prior to treatment",
    },
    {
      action: "Take a history for risk factors, and plan closer monitoring or a neurological assessment for people who already have neuropathy",
      why: "Diabetes, existing neuropathy and some other conditions make nerve damage more likely or worse.",
      source: "cipn-path-2022",
      quote: "Patients with preexisting peripheral neuropathy or who are at high risk should be considered for pretreatment neurological assessment or closer monitoring",
    },
    {
      action: "Screen for neuropathy at every treatment cycle, using a short patient-reported questionnaire, and continue at follow-up",
      why: "Doctors' grading alone misses symptoms that the person notices; asking every cycle catches them early.",
      source: "cipn-path-2022",
      quote: "Screening for CIPN should occur at every treatment cycle",
    },
    {
      action: "When neuropathy becomes intolerable or affects function, consider delaying, reducing, substituting or stopping the drug",
      why: "Nerve damage can become permanent; changing the dose in time can prevent lasting harm.",
      source: "asco-2020",
      quote: "Furthermore, clinicians should assess the appropriateness of dose delaying, dose reduction, substitutions, or stopping chemotherapy in patients who develop intolerable neuropathy and/or functional impairment.",
    },
    {
      action: "Do not offer a drug to prevent neuropathy; in particular, do not use acetyl-L-carnitine",
      why: "No drug has been shown to prevent it, and ASCO specifically discourages acetyl-L-carnitine.",
      source: "asco-2020",
      quote: "The identified data reconfirmed that no agents are recommended for the prevention of CIPN. The use of acetyl-l-carnitine for the prevention of CIPN in patients with cancer should be discouraged.",
    },
    {
      action: "For painful established neuropathy, offer duloxetine and explain that the benefit is modest",
      why: "It is the only drug with good evidence for nerve pain after chemotherapy.",
      source: "asco-2020",
      quote: "Duloxetine is the only agent that has appropriate evidence to support its use for patients with established painful CIPN. Nonetheless, the amount of benefit from duloxetine is limited.",
    },
    {
      action: "Encourage physical activity during treatment, and refer people with pain, balance problems or falls for further help",
      why: "Staying active helps keep physical function; balance problems from nerve damage raise the risk of falls.",
      source: "cipn-path-2022",
      quote: "All patients should be encouraged to be physically active during treatment to minimise impairments to physical function",
    },
    {
      action: "During weekly paclitaxel or nab-paclitaxel, consider a frozen glove or tight surgical gloves on the hands from 30 minutes before to 30 minutes after the infusion",
      why: "Cooling or squeezing the hands during the drip is thought to reduce how much drug reaches the small nerves; in one randomised trial both lowered moderate or worse nerve damage.",
      source: "polar-2025",
      quote: "Cooling was performed with a frozen glove and compression was applied by 2 surgical gloves (1 size smaller than the tight-fitting size) 30 minutes before, after, and during taxane administration.",
    },
  ],
  bestInClass: {
    statement: "ASCO 2020 remains the latest graded guideline read: no drug prevents CIPN, dose modification is the main tool, and duloxetine is the only treatment with adequate evidence for painful CIPN. Assessment at every cycle with patient-reported tools is consensus practice (Australian CIPN-path, 2022). On cooling and compression the evidence has moved since ASCO 2020 and is mixed: POLAR (2025) found that both a frozen glove and surgical-glove compression reduced grade 2 or higher sensory CIPN, while CryoPac (2026) found that frozen gloves and socks did not significantly reduce CIPN on its primary measure but reduced sensory symptoms. Offering them during weekly taxanes is reasonable where tolerated, and is not yet a guideline recommendation in any source read. The ESMO-EONS-EANO 2020 guideline could not be read.",
    sources: ["asco-2020", "cipn-path-2022", "polar-2025", "cryopac-2026", "esmo-eons-eano-2020"],
  },
  variants: [
    {
      name: "Frozen gloves and socks during all taxane infusions (CryoPac)",
      differs: "Cools both hands and feet during each taxane infusion, rather than one hand as in POLAR.",
      evidence: "Randomised trial of 268 people: CIPN at end of treatment 74 per cent with cryotherapy against 84 per cent with usual care, not significant (P = 0.071); fewer hand tingling and numbness and foot numbness on patient report; compliance 67 per cent; no effect on dose modifications. Read as an abstract.",
      sources: ["cryopac-2026"],
    },
    {
      name: "Compression with surgical gloves instead of cooling (POLAR)",
      differs: "Two surgical gloves one size smaller than a tight fit, worn from 30 minutes before to 30 minutes after the taxane infusion, with no cooling.",
      evidence: "In POLAR compression lowered grade 2 or higher sensory CIPN from 38 to 24 per cent in the compressed hand against the untreated hand (P = .008); cooling lowered it from 50 to 29 per cent (P = .002). The trial compared each method with the person's other hand, not the two methods with each other.",
      sources: ["polar-2025"],
    },
  ],
  grades: [
    { claim: "Hand cooling reduced grade 2 or higher sensory CIPN in POLAR", grade: "single randomised trial (within-patient control), P = .002", source: "polar-2025", quote: "Both interventions significantly reduced the incidence of grade 2 or higher CIPN (cooling: 15 participants experiencing high-grade CIPN in the cooling arm [29%] vs 26 in the control arm [50%]; P = .002;" },
    { claim: "Frozen gloves and socks did not significantly reduce CIPN incidence at end of treatment in CryoPac", grade: "single randomised trial, P = 0.071", source: "cryopac-2026", quote: "Cryotherapy did not significantly reduce CIPN incidence (TNS ≥ 2) at EoT but cryotherapy-treated patients reported fewer sensory symptoms and demonstrated reduced tactile disturbance." },
  ],
  sources: [
    { key: "asco-2020", label: "Prevention and Management of Chemotherapy-Induced Peripheral Neuropathy in Survivors of Adult Cancers: ASCO Guideline Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://europepmc.org/abstract/MED/32663120", doi: "10.1200/JCO.20.01399", read: "abstract", accessed: "2026-11-11" },
    { key: "cipn-path-2022", label: "Development and consensus process for a clinical pathway for the assessment and management of chemotherapy-induced peripheral neuropathy", publisher: "Supportive Care in Cancer", year: 2022, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9135801/", doi: "10.1007/s00520-022-07024-3", gradingScheme: "Two-stage Delphi of 70 Australian respondents; consensus defined as 80 per cent or more agreeing; statements are not graded.", read: "full-text", accessed: "2026-11-11" },
    { key: "polar-2025", label: "Efficacy of Hand Cooling and Compression in Preventing Taxane-Induced Neuropathy: The POLAR Randomized Clinical Trial", publisher: "JAMA Oncology", year: 2025, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11886872/", doi: "10.1001/jamaoncol.2025.0001", read: "full-text", accessed: "2026-11-11" },
    { key: "cryopac-2026", label: "Efficacy of cryotherapy in preventing taxane-induced neuropathy: the CryoPac randomised controlled trial", publisher: "Annals of Oncology", year: 2026, url: "https://europepmc.org/abstract/MED/42838271", doi: "10.1016/j.annonc.2026.09.014", read: "abstract", accessed: "2026-11-11" },
    { key: "esmo-eons-eano-2020", label: "Systemic anticancer therapy-induced peripheral and central neurotoxicity: ESMO-EONS-EANO Clinical Practice Guidelines for diagnosis, prevention, treatment and follow-up", publisher: "ESMO, EONS and EANO, Annals of Oncology", year: 2020, url: "https://doi.org/10.1016/j.annonc.2020.07.003", doi: "10.1016/j.annonc.2020.07.003", read: "not-reachable", accessed: "2026-11-11" },
  ],
  related: ["idea-moon-neuropathy-prevention-programme"],
  upgrades: ["idea-upgrade-hand-foot-cooling-compression-during-taxanes", "idea-mach-cold-or-compression-by-adherence"],
  gaps: [
    "ASCO 2020 was read only as an abstract; its grades, its position on cryotherapy, compression and exercise, and its dose-modification detail by drug are not given here.",
    "The ESMO-EONS-EANO 2020 guideline could not be read: Europe PMC holds no abstract and the publisher refused a script.",
    "No guideline read has graded POLAR (2025) or CryoPac (2026), and the two trials point in somewhat different directions on the main measure.",
    "No source read sets dose-reduction rules by drug and grade; these come from each regimen's protocol and product information.",
    "Who should be excluded from cooling (for example people with Raynaud's phenomenon or cold intolerance) is not stated in the parts of the trials read.",
    "The evidence behind ASCO's advice against acetyl-L-carnitine is not in the abstract read.",
  ],
  institutions: ["asco"],
  technologies: ["frozen-gloves-compression-taxane", "limb-cryocompression-devices"],
  drugs: ["paclitaxel", "nab-paclitaxel", "docetaxel", "oxaliplatin", "vincristine", "bortezomib", "duloxetine"],
  terms: ["peripheral-neuropathy"],
  sections: ["supportive-care"],
  tags: ["protocol", "neuropathy", "supportive-care"],
});
