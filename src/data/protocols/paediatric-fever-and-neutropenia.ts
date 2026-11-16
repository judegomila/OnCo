import { protocol } from "./helpers";

/*
 * Fever and neutropenia in children and young people with cancer or after haematopoietic cell transplant.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - International Pediatric Fever and Neutropenia Guideline Panel, 2023 update (Lehrnbecher et al., J Clin Oncol
 *   2023), open access, full text from Europe PMC (PMC10022858, full-text XML). A Europe PMC title search for a later
 *   paediatric fever and neutropenia guideline (2023 to 2026) found none; this is the current edition.
 * - Children's Oncology Group endorsement document for that guideline (version date 14 July 2023), public PDF from
 *   the COG supportive care page (pdftotext, full text), and the COG page itself, which lists the July 2022 version as
 *   archived.
 * - NICE CG151 recommendations page (HTML, full text), which applies to people of any age and marks its child-specific
 *   recommendations.
 * The DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const paediatricFeverAndNeutropenia = protocol({
  id: "paediatric-fever-and-neutropenia",
  name: "Fever and neutropenia in children with cancer or after stem cell transplant",
  aka: ["paediatric febrile neutropenia", "pediatric fever and neutropenia", "neutropenic fever in children", "paediatric neutropenic sepsis", "FN in children"],
  domain: "paediatric",
  tldr: "A child having cancer treatment who gets a fever, or seems unwell, needs to be seen in hospital straight away, using the team's number. There blood cultures are taken from every channel of the central line and one strong antibiotic is started through a drip. Children at low risk may finish at home or by mouth, and antibiotics can often stop after two days if cultures stay clear.",
  simple: "Cancer treatment can leave a child with few white blood cells to fight germs. A fever during treatment is an emergency. Ring the cancer team's number and go to hospital. The child will have blood tests and an antibiotic quickly.",
  summary: "The International Pediatric Fever and Neutropenia Guideline Panel's 2023 update (79 randomised trials, GRADE) covers patients aged 0 to 18 receiving chemotherapy for cancer and recipients of haematopoietic cell transplant, and is endorsed by the Children's Oncology Group. Adopt a validated paediatric risk stratification rule (strong, low). Take blood cultures from all lumens of a central venous catheter at onset (strong, low); a peripheral culture alongside is conditional, because it adds 12% of bacteraemias but causes pain and contaminants. Urine where a clean-catch specimen is readily available (conditional); chest radiograph only with respiratory signs (strong, moderate).\n\nHigh-risk episodes get monotherapy with an antipseudomonal beta-lactam, a fourth-generation cephalosporin or a carbapenem (strong, high); a second anti-Gram-negative agent or a glycopeptide is reserved for instability, suspected resistance or high-resistance centres. A new good practice statement asks for therapy as soon as possible in the clinically unstable child, ideally much sooner than an hour after presentation; the panel could not agree a time target for well, low-risk children. Low-risk episodes may be managed as outpatients or with oral antibiotics where the infrastructure allows (conditional). Antibiotics stop at 48 hours with negative cultures once the child has been well and afebrile for 24 hours, with marrow recovery (strong) or, new in 2023, without it in low-risk FN (conditional). For fever lasting 96 hours or more in children at high risk of invasive fungal disease: CT chest (strong), consider abdominal ultrasound, do not use beta-D-glucan or fungal PCR, and start caspofungin or liposomal amphotericin B (strong, high) unless a pre-emptive approach is chosen. NICE CG151, for any age, recommends piperacillin with tazobactam alone first and names the modified Alexander rule for children under 18.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "emergency-team"],
    where: ["home", "telephone-triage", "emergency-department", "ward", "outpatient-clinic"],
  },
  population: "Children and young people aged 0 to 18 receiving chemotherapy for cancer, and recipients of haematopoietic cell transplant, as the 2023 international guideline scopes it. Adults are covered by the adult first-hour protocol.",
  trigger: "A child having chemotherapy or after a stem cell transplant has a fever, or becomes unwell, while neutropenic or likely to be.",
  steps: [
    {
      action: "Before treatment starts, give the family written and spoken information on infection during treatment and the 24-hour number to ring",
      why: "Most fevers start at home, so parents need to know what to look for and whom to call before it happens.",
      source: "nice-cg151",
      quote: "Provide patients having anticancer treatment and their carers with written and oral information, both before starting and throughout their anticancer treatment, on:",
    },
    {
      action: "If the child is unstable, start the guideline's empiric antibiotic as soon as possible while other measures to stabilise them are taken",
      why: "A child with a serious infection and few white cells can get worse within hours, and early antibiotics are what improve survival.",
      source: "ipfn-2023",
      quote: "For febrile patients who are clinically unstable, initiate FN CPG-consistent empiric antibacterial therapy as soon as possible.",
      grade: "Good practice statement",
    },
    {
      action: "Stratify the episode as high or low risk with a validated paediatric rule, and use it to decide the rest of the care",
      why: "Risk decides who needs intravenous antibiotics in hospital and who can be treated more lightly, at home or by mouth.",
      source: "ipfn-2023",
      quote: "Adopt a validated risk stratification strategy and incorporate it into routine clinical management",
      grade: "strong recommendation, low-quality evidence",
    },
    {
      action: "Take blood cultures from every lumen of the central venous catheter at the onset of the fever",
      why: "Germs can sit in one channel of the line and not another; sampling all of them finds more infections.",
      source: "ipfn-2023",
      quote: "Obtain blood cultures at the onset of FN from all lumens of central venous catheters",
      grade: "strong recommendation, low-quality evidence",
    },
    {
      action: "Consider a peripheral blood culture as well as the line cultures",
      why: "In the panel's review, 12% of true bloodstream infections were found only in the peripheral culture; it is conditional because it hurts and it is not known whether finding them changes the outcome.",
      source: "ipfn-2023",
      quote: "Consider obtaining peripheral blood cultures concurrent with central venous catheter cultures",
      grade: "conditional recommendation, moderate-quality evidence",
    },
    {
      action: "Consider urinalysis and urine culture where a clean-catch, mid-stream sample is easy to get, without delaying the antibiotic",
      why: "Urine infections in these children often cause no symptoms; NICE asks for urinalysis in all children under 5.",
      source: "ipfn-2023",
      quote: "Consider urinalysis and urine culture in patients where a clean-catch, mid-stream specimen is readily available",
      grade: "conditional recommendation, low-quality evidence",
    },
    {
      action: "Take a chest X-ray only if the child has breathing signs or symptoms",
      why: "Pneumonia is very rare without chest symptoms, and leaving out the X-ray in those children did no harm.",
      source: "ipfn-2023",
      quote: "Obtain chest radiography only in patients with respiratory signs or symptoms",
      grade: "strong recommendation, moderate-quality evidence",
    },
    {
      action: "In high-risk fever and neutropenia, give one antipseudomonal beta-lactam, fourth-generation cephalosporin or carbapenem on its own, chosen by local resistance patterns",
      why: "Twelve trials found adding an aminoglycoside did not reduce treatment failure or deaths, so one drug is enough for most children.",
      source: "ipfn-2023",
      quote: "Use monotherapy with an antipseudomonal β-lactam, a fourth-generation cephalosporin or a carbapenem as empiric antibacterial therapy in pediatric high-risk FN",
      grade: "strong recommendation, high-quality evidence",
    },
    {
      action: "Add a second anti-Gram-negative drug or a glycopeptide only for a child who is unstable, a suspected resistant infection, or a centre with high resistance",
      why: "Extra antibiotics add side effects and resistance without helping the stable child.",
      source: "ipfn-2023",
      quote: "Reserve addition of a second anti-Gram-negative agent or a glycopeptide for patients who are clinically unstable, when a resistant infection is suspected, or for centers with a high rate of resistant pathogens",
      grade: "strong recommendation, moderate-quality evidence",
    },
    {
      action: "In low-risk fever and neutropenia, consider treatment at home or a step down to home, where careful monitoring and follow-up are in place",
      why: "Five trials found no difference in failure or death and almost four fewer days in hospital, provided the family can reach the team and come back quickly.",
      source: "ipfn-2023",
      quote: "Consider initial or step-down outpatient management if the infrastructure is in place to ensure careful monitoring and follow-up",
      grade: "conditional recommendation, moderate-quality evidence",
    },
    {
      action: "Consider oral antibiotics for a low-risk child who can reliably take them by mouth",
      why: "Oral treatment worked as well as intravenous in the trials, but readmission was more common, so it is offered rather than required.",
      source: "ipfn-2023",
      quote: "Consider oral antibacterial therapy administration if the patient is able to tolerate this route of administration reliably",
      grade: "conditional recommendation, moderate-quality evidence",
    },
    {
      action: "Do not broaden the antibiotics for persistent fever alone in a child who is clinically stable; escalate if the child becomes unstable",
      why: "Fever on its own often settles; changing drugs adds harm. Instability is the signal to widen cover.",
      source: "ipfn-2023",
      quote: "Do not broaden the initial empiric antibacterial regimen based solely on persistent fever in patients who are clinically stable",
      grade: "strong recommendation, low-quality evidence",
    },
    {
      action: "Stop the antibiotics once the child has been well and without fever for 24 hours, the blood cultures are negative at 48 hours, and the marrow is recovering",
      why: "The risk of the fever coming back is very low at this point, and every extra day of antibiotics has costs.",
      source: "ipfn-2023",
      quote: "In both high-risk and low-risk FN patients who have been clinically well and afebrile for at least 24 hours, discontinue empiric antibacterial therapy if blood cultures remain negative at 48 hours if there is evidence of marrow recovery",
      grade: "strong recommendation, low-quality evidence",
    },
    {
      action: "In low-risk episodes, consider stopping at 48 hours on the same terms even before the marrow recovers",
      why: "New in 2023: trials showed stopping was as safe as continuing in low-risk children, moving the point from 72 to 48 hours.",
      source: "ipfn-2023",
      quote: "In patients with low-risk FN who have been clinically well and afebrile for at least 24 hours, consider discontinuation of empiric antibacterial therapy if blood cultures remain negative at 48 hours despite no evidence of marrow recovery",
      grade: "conditional recommendation, moderate-quality evidence",
    },
    {
      action: "If fever lasts 96 hours or more in a child at high risk of fungal infection, do a CT of the lungs",
      why: "The lungs are the commonest site of fungal infection, and CT shows the typical signs.",
      source: "ipfn-2023",
      quote: "Perform computed tomography (CT) of lungs",
      grade: "strong recommendation, low-quality evidence",
    },
    {
      action: "Do not use beta-D-glucan or fungal PCR in blood to guide antifungal treatment at this point",
      why: "These tests gave wrong positive results too often (positive predictive values of 49% and 17%) to be useful.",
      source: "ipfn-2023",
      quote: "Do not use fungal polymerase chain reaction testing in blood",
      grade: "strong recommendation, moderate-quality evidence",
    },
    {
      action: "For high-risk children with fever of 96 hours or more despite broad antibiotics, start caspofungin or liposomal amphotericin B, unless a pre-emptive approach is chosen",
      why: "These two worked equally well in trials, and liposomal amphotericin harms the kidneys less than the older form.",
      source: "ipfn-2023",
      quote: "In IFD high-risk patients with prolonged (≥ 96 hours) FN unresponsive to broad-spectrum antibacterial therapy, initiate caspofungin or liposomal amphotericin B for empiric antifungal therapy unless a pre-emptive antifungal therapy approach is chosen",
      grade: "strong recommendation, high-quality evidence",
    },
  ],
  bestInClass: {
    statement: "The International Pediatric Fever and Neutropenia Guideline Panel's 2023 update, endorsed by the Children's Oncology Group in May 2023, is the only current guideline built on paediatric trials alone and is the standard to follow: validated risk stratification, cultures from every lumen, single-agent antipseudomonal therapy for high-risk episodes, outpatient or oral options for low-risk ones, and stopping at 48 hours once well and afebrile for 24 hours. On the first drug, NICE CG151 (written for any age) is narrower and names piperacillin with tazobactam alone, while the international panel allows any antipseudomonal beta-lactam, fourth-generation cephalosporin or carbapenem by local epidemiology; both advise against a routine aminoglycoside or glycopeptide. On timing, NICE says immediately with no clock, the international panel says as soon as possible for the unstable child (ideally well inside an hour) and could not agree a target for well, low-risk children, some preferring to wait for the neutrophil count. NICE asks for urinalysis in every child under 5; the panel makes urine conditional on an easy clean-catch sample.",
    sources: ["ipfn-2023", "cog-fn-2023", "nice-cg151"],
  },
  variants: [
    {
      name: "Piperacillin with tazobactam as the single first antibiotic (NICE CG151, all ages)",
      differs: "Names one drug, piperacillin with tazobactam, as the first empiric antibiotic, asks for urinalysis in all children aged under 5, and names the modified Alexander rule as an example of a risk score for children under 18. NICE noted at publication that piperacillin with tazobactam had no UK marketing authorisation for children under 2.",
      evidence: "NICE does not grade recommendations; its evidence review for monotherapy is in the adult protocol. The international panel's broader choice rests on 12 paediatric trials of monotherapy against combination therapy.",
      sources: ["nice-cg151", "ipfn-2023"],
    },
    {
      name: "Waiting for the neutrophil count in well, low-risk children",
      differs: "Some centres give the first antibiotic only once the count confirms neutropenia, in children who look well and are at low risk; others give it before the count. The international panel was split and made no statement, asking institutions to speed up the count.",
      evidence: "No graded recommendation either way; the panel names it as needing more research.",
      sources: ["ipfn-2023"],
    },
    {
      name: "Pre-emptive rather than empiric antifungal therapy",
      differs: "In non-transplant children at high risk of fungal infection who are not on mould-active prophylaxis, antifungal treatment for prolonged fever is held until tests or imaging suggest fungal infection, instead of being started on fever alone.",
      evidence: "Conditional recommendation, moderate-quality evidence, from one trial in which pre-emptive therapy shortened antifungal use (median 6 against 11 days) with no difference in fungal infection; it excluded transplant recipients and children on voriconazole or posaconazole.",
      sources: ["ipfn-2023"],
    },
  ],
  grades: [
    { claim: "Validated risk stratification in routine care", grade: "strong recommendation, low-quality evidence", source: "ipfn-2023" },
    { claim: "Blood cultures from all lumens of a central venous catheter", grade: "strong recommendation, low-quality evidence", source: "ipfn-2023" },
    { claim: "Monotherapy for high-risk fever and neutropenia", grade: "strong recommendation, high-quality evidence", source: "ipfn-2023" },
    { claim: "Outpatient or step-down management in low-risk fever and neutropenia", grade: "conditional recommendation, moderate-quality evidence", source: "ipfn-2023" },
    { claim: "Stopping antibiotics at 48 hours in low-risk fever and neutropenia without marrow recovery", grade: "conditional recommendation, moderate-quality evidence", source: "ipfn-2023" },
    { claim: "Caspofungin or liposomal amphotericin B for prolonged fever in high-risk children", grade: "strong recommendation, high-quality evidence", source: "ipfn-2023" },
    { claim: "Do not use beta-D-glucan to guide empiric antifungal management", grade: "strong recommendation, low-quality evidence", source: "ipfn-2023", quote: "Do not use β-D-glucan (strong recommendation, low-quality evidence)." },
    { claim: "Antibiotics as soon as possible in the clinically unstable child", grade: "Good practice statement", source: "ipfn-2023" },
  ],
  sources: [
    { key: "ipfn-2023", label: "Guideline for the Management of Fever and Neutropenia in Pediatric Patients With Cancer and Hematopoietic Cell Transplantation Recipients: 2023 Update", publisher: "International Pediatric Fever and Neutropenia Guideline Panel, Journal of Clinical Oncology", year: 2023, url: "https://europepmc.org/article/PMC/PMC10022858", doi: "10.1200/jco.22.02224", gradingScheme: "GRADE: recommendations strong or conditional, evidence high, moderate, low or very low, printed together after each recommendation; good practice statements are ungraded.", read: "full-text", accessed: "2026-11-11" },
    { key: "cog-fn-2023", label: "Guideline for the Management of Fever and Neutropenia in Children with Cancer and/or Undergoing Hematopoietic Stem-Cell Transplantation (COG endorsement, version date 14 July 2023)", publisher: "Children's Oncology Group", year: 2023, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_FN_Guideline_Document-14JULY2023-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality for each recommendation.", read: "full-text", accessed: "2026-11-11" },
    { key: "nice-cg151", label: "Neutropenic sepsis: prevention and management in people with cancer (CG151), recommendations", publisher: "NICE", year: 2012, url: "https://www.nice.org.uk/guidance/cg151/chapter/Recommendations", gradingScheme: "NICE does not grade recommendations; the strength is in the wording ('offer', 'do not offer', 'consider').", read: "full-text", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The guideline does not define the fever or neutrophil thresholds that start the pathway; those come from local or national protocols and differ between countries.",
    "The guideline's Data Supplement, which lists the validated risk rules and trial details, was not read.",
    "No time-to-antibiotic target is set for clinically well children; the panel was divided on whether to wait for the neutrophil count in low-risk children.",
    "The safety of stopping antibiotics early in high-risk children with a respiratory virus is named by the panel as a knowledge gap.",
    "It is uncertain whether a child already on mould-active prophylaxis who develops prolonged fever should switch antifungal or continue the same one.",
    "NICE NG254 (suspected sepsis in under 16s) was not read for this protocol.",
  ],
  institutions: ["nice"],
  companies: ["childrens-oncology-group"],
  cancers: ["childhood-cancers", "all-leukemia", "aml"],
  drugs: ["piperacillin-tazobactam"],
  technologies: ["allogeneic-hsct", "implanted-ports"],
  terms: ["febrile-neutropenia", "neutropenia", "central-venous-access"],
  related: ["febrile-neutropenia-first-hour"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "neutropenic-sepsis"],
});
