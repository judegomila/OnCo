import { protocol } from "./helpers";

/*
 * Suspected infection of a central venous catheter (port, PICC, tunnelled or non-tunnelled line) in a person with
 * cancer: cultures, early antibiotics, and whether the line can be kept.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - IDSA clinical practice guidelines for the diagnosis and management of intravascular catheter-related infection,
 *   2009 update (Mermel et al., Clin Infect Dis 2009, PMC4039170): full text from the PMC XML. No newer IDSA edition was
 *   found; it is still the IDSA guideline. Grades quoted as printed (A-I to C-III).
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015): full text, read
 *   from the Internet Archive's capture of academic.oup.com, as for the implanted port protocol.
 *
 * Quotes are copied from the raw text with line breaks joined; where a sentence carries an inline reference, the quote
 * stops before it.
 */
export const suspectedCentralLineInfection = protocol({
  id: "suspected-central-line-infection",
  name: "Suspected central line infection in a person with cancer: paired blood cultures, first antibiotics and line removal or salvage",
  aka: ["CRBSI", "catheter-related bloodstream infection", "line infection", "port infection", "PICC infection", "Hickman line infection", "tunnel infection", "port pocket infection", "differential time to positivity", "line salvage", "antibiotic lock"],
  domain: "vascular-access",
  tldr: "A fever, shivering, or redness, pain or pus where a central line goes in can mean the line is infected. Blood is taken from the line and from an arm vein before antibiotics start, and antibiotics should not wait for the results. Some line infections can be cleared with the line left in; others, such as a serious infection or certain germs, mean the line has to come out.",
  simple: "If you have a fever, shivers after your line is flushed, or redness or pus at your line, call your chemotherapy helpline straight away. Blood tests are taken from the line and your arm, then antibiotics start.",
  summary: "IDSA (2009, the current edition) and ESMO (2015) agree on the core. Take paired blood cultures, one through the catheter and one from a peripheral vein, before antibiotics, labelled by site (IDSA A-II; ESMO [II, A]); if no peripheral sample is possible, take at least two through different lumens (IDSA B-III; ESMO [III, B]). Clean the hub or skin with alcohol, iodine tincture or alcoholic chlorhexidine above 0.5% and let it dry (A-I). Swab any exit-site exudate (B-III). Growth from the catheter sample at least 2 hours before the peripheral sample (differential time to positivity) supports catheter-related bloodstream infection (A-II).\n\nStart empirical antibiotics without waiting for cultures (ESMO): vancomycin where MRSA is common (IDSA A-II; ESMO [II, A]), with Gram-negative cover chosen from local susceptibility data, and combination cover for resistant Gram-negative bacilli such as Pseudomonas when the patient is neutropenic or septic (IDSA A-II). Suspect candidaemia in septic patients with haematological cancer, transplant or parenteral nutrition (B-II).\n\nRemove a long-term catheter for severe sepsis, suppurative thrombophlebitis, endocarditis, bacteraemia persisting beyond 72 hours of appropriate antibiotics, or infection with S. aureus, P. aeruginosa, fungi or mycobacteria (IDSA A-II); ESMO adds tunnel infection and port abscess. Otherwise salvage can be tried with systemic antibiotics plus an antibiotic lock (B-II), with repeat cultures and removal if they are still positive at 72 hours (B-II). A single positive culture for coagulase-negative staphylococci should be repeated, paired, before treatment or removal (A-II).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse"],
    where: ["acute-oncology-service", "emergency-department", "ward", "chemotherapy-day-unit"],
  },
  population: "Adults with cancer and a central venous catheter. A person with a temperature during chemotherapy is first managed as possible neutropenic sepsis (see the febrile neutropenia protocol), within which these steps apply. IDSA covers adults and children; haemodialysis catheters and paediatric specifics are not covered here.",
  trigger: "Fever, rigors (especially just after the line is flushed), low blood pressure or sepsis in a person with a central line, or redness, tenderness, swelling or pus at the exit site, along the tunnel or over the port.",
  steps: [
    {
      action: "Suspect line infection with fever, chills or low blood pressure after the line is used, or redness, pain, hardness or discharge at the site",
      why: "Line infections can start suddenly and become serious quickly, especially when white cells are low.",
      source: "esmo-2015",
      quote: "Clinical manifestations of CVC infection may include: fever, inflammation or purulence at the insertion site (erythema, tenderness, pain, induration and drainage), catheter dysfunction, hypotension, chills and signs of sepsis of sudden onset, after catheter use.",
    },
    {
      action: "Clean the catheter hub, or the skin for the vein sample, with alcohol, iodine tincture or alcoholic chlorhexidine above 0.5%, and let it dry",
      why: "Germs on the skin or hub can contaminate the bottle and give a false result.",
      source: "idsa-2009",
      quote: "If a blood sample is obtained through a catheter, clean the catheter hub with either alcohol or tincture of iodine or alcoholic chlorhexidine (>0.5%) and allow adequate drying time to mitigate blood culture contamination (A-I).",
      grade: "A-I",
    },
    {
      action: "Before antibiotics, take paired blood cultures, one through the line and one from an arm vein, and label each bottle with where it came from",
      why: "Comparing the two shows whether the line is the source of the infection, which decides whether it must come out.",
      source: "idsa-2009",
      quote: "For suspected CRBSI, paired blood samples drawn from the catheter and from a peripheral vein should be cultured before initiation of antimicrobial therapy, and the bottles should be appropriately marked to reflect the site from which the cultures were obtained (A-II).",
      grade: "A-II",
    },
    {
      action: "If no vein sample can be taken, take at least two samples through different lumens",
      why: "Two samples still allow a comparison.",
      source: "idsa-2009",
      quote: "If a blood sample for culture cannot be drawn from a peripheral vein, it is recommended that ≥2 blood samples should be obtained through different catheter lumens (B-III).",
      grade: "B-III",
    },
    {
      action: "If there is discharge at the exit site, swab it for culture and Gram stain",
      why: "It can identify the germ before the blood cultures grow.",
      source: "idsa-2009",
      quote: "When catheter-related infection is suspected and there is a catheter exit site exudate, swab the drainage to obtain samples for culture and Gram staining (B-III).",
      grade: "B-III",
    },
    {
      action: "Start empirical antibiotics at once; do not wait for culture results",
      why: "Delay increases the risk of sepsis becoming life-threatening.",
      source: "esmo-2015",
      quote: "Antibiotic therapy onset should not be delayed for blood culture results to be available.",
    },
    {
      action: "Cover staphylococci with vancomycin where MRSA is common, and add Gram-negative cover chosen from local resistance data, with combination cover for resistant organisms if the patient is neutropenic or septic",
      why: "Skin staphylococci are the commonest cause; people with low white cells or sepsis can also be infected by more dangerous bowel organisms.",
      source: "idsa-2009",
      quote: "Empirical combination antibiotic coverage for multi-drug-resistant (MDR) gram-negative bacilli, such as Pseudomonas aeruginosa, should be used when CRBSI is suspected in neutropenic patients, severely ill patients with sepsis, or patients known to be colonized with such pathogens, until the culture and susceptibility data are available and deescalation of the antibiotic regimen can be done (A-II).",
      grade: "A-II",
    },
    {
      action: "Read the cultures together: growth from the line sample at least 2 hours before the vein sample points to the line",
      why: "Germs living in the line reach detectable levels sooner in blood drawn through it.",
      source: "idsa-2009",
      quote: "For DTP, growth of microbes from blood drawn from a catheter hub at least 2 h before microbial growth is detected in blood samples obtained from a peripheral vein best defines CRBSI (A-II).",
      grade: "A-II",
    },
    {
      action: "If a single culture grows coagulase-negative staphylococci, repeat paired cultures before treating or removing the line",
      why: "These skin germs often contaminate a sample without causing infection.",
      source: "idsa-2009",
      quote: "If a catheterized patient has a single positive blood culture that grows coagulase-negative Staphylococcus species, then additional cultures of blood samples obtained through the suspected catheter and from a peripheral vein should be performed before the initiation of antimicrobial therapy and/or catheter removal to be certain that the patient has true bloodstream infection and that the catheter is the likely source (A-II).",
      grade: "A-II",
    },
    {
      action: "Remove the line for severe sepsis, infected clot, endocarditis, bacteraemia lasting more than 72 hours on the right antibiotics, or infection with S. aureus, Pseudomonas, fungi or mycobacteria",
      why: "These infections rarely clear with the line in place and can spread to the heart valves or bones.",
      source: "idsa-2009",
      quote: "Long-term catheters should be removed from patients with CRBSI associated with any of the following conditions: severe sepsis; suppurative thrombophlebitis; endocarditis; bloodstream infection that continues despite >72 h of antimicrobial therapy to which the infecting microbes are susceptible; or infections due to S. aureus, P. aeruginosa, fungi, or mycobacteria (A-II).",
      grade: "A-II",
    },
    {
      action: "Remove the line for a tunnel infection or a port pocket abscess",
      why: "Pus in the tunnel or around the port cannot be cleared by antibiotics while the device is there.",
      source: "esmo-2015",
      quote: "Indications to remove the CVC are: severe sepsis, suppurative (septic) thrombophlebitis, endocarditis, tunnel infection, port abscess",
    },
    {
      action: "Otherwise, consider keeping the line, with systemic antibiotics plus an antibiotic lock",
      why: "People with cancer may need the line for months, and replacing it has its own risks.",
      source: "idsa-2009",
      quote: "Antibiotic lock therapy should be used for catheter salvage (B-II); however, if antibiotic lock therapy cannot be used in this situation, systemic antibiotics should be administered through the colonized catheter (C-III).",
      grade: "B-II",
    },
    {
      action: "If the line is kept, repeat blood cultures and remove it if they are still positive 72 hours into appropriate treatment",
      why: "Persistent positive cultures mean the line is still seeding the blood.",
      source: "idsa-2009",
      quote: "For patients with CRBSI for whom catheter salvage is attempted, additional blood cultures should be obtained, and the catheter should be removed if blood culture results (e.g., 2 sets of blood cultures obtained on a given day; 1 set of blood cultures is acceptable for neonates) remain positive when blood samples are obtained 72 h after the initiation of appropriate therapy (B-II).",
      grade: "B-II",
    },
    {
      action: "If a port is removed, send the reservoir contents and the catheter tip for culture",
      why: "The material inside the port is more likely to grow the germ than the tip alone.",
      source: "idsa-2009",
      quote: "If a venous access subcutaneous port is removed because of suspected CRBSI, send the port to the microbiology laboratory for qualitative culture of the port reservoir contents, in addition to the catheter tip (B-II).",
      grade: "B-II",
    },
  ],
  bestInClass: {
    statement: "Paired, labelled blood cultures from the line and a peripheral vein before antibiotics (IDSA A-II; ESMO [II, A]) after hub and skin antisepsis allowed to dry (A-I); empirical antibiotics without delay, vancomycin where MRSA is common (A-II) and Gram-negative cover by local data, combination cover in neutropenia or sepsis (A-II); removal of a long-term line for severe sepsis, suppurative thrombophlebitis, endocarditis, persistent bacteraemia beyond 72 hours, S. aureus, P. aeruginosa, fungi or mycobacteria (IDSA A-II), and for tunnel infection or port abscess (ESMO); otherwise salvage with antibiotic lock (B-II) and repeat cultures. IDSA (2009) and ESMO (2015) agree on these points; both are old, and no newer edition of either was found.",
    sources: ["idsa-2009", "esmo-2015"],
  },
  variants: [
    {
      name: "Salvage of an uncomplicated infection in a line that is hard to replace",
      differs: "Keeps a long-term catheter infected with organisms other than S. aureus, Pseudomonas, Bacillus, Micrococcus, Propionibacteria, fungi or mycobacteria, treating with systemic antibiotics and an antibiotic lock.",
      evidence: "IDSA B-II, framed for patients with limited access sites; ESMO's algorithm (Figure 1) follows the same logic. No randomised trial of salvage against removal in cancer was cited.",
      sources: ["idsa-2009", "esmo-2015"],
    },
  ],
  grades: [
    { claim: "Blood cultures before antibiotics", grade: "[I, A]", source: "esmo-2015", quote: "In the diagnostic assessment, blood cultures are indicated before starting antibiotic treatment [I, A]" },
    { claim: "Paired cultures, catheter and peripheral vein, labelled", grade: "A-II", source: "idsa-2009" },
    { claim: "Vancomycin empirically where MRSA is prevalent", grade: "A-II", source: "idsa-2009", quote: "Vancomycin is recommended for empirical therapy in heath care settings with an elevated prevalence of methicillin-resistant Staphylococcus aureus (MRSA)" },
    { claim: "Vancomycin as empirical treatment", grade: "[II, A]", source: "esmo-2015", quote: "Since the most frequent infectious agents are Staphylococcus coagulase-negative and S. aureus methicillin-resistant (MRSA), the recommended treatment is vancomycin [II, A]" },
    { claim: "Linezolid not for empirical therapy", grade: "AI", source: "idsa-2009", quote: "Linezolid should not be used for empirical therapy (i.e., for patients suspected but not proven to have bacteremia) (AI)." },
    { claim: "Removal of long-term catheters for complicated infection or high-risk organisms", grade: "A-II", source: "idsa-2009" },
    { claim: "Thrombolytics not recommended as adjunctive therapy", grade: "B-I", source: "idsa-2009", quote: "Urokinase and other thrombolytic agents are not recommended as adjunctive therapy for patients with CRBSI (B-I)." },
  ],
  sources: [
    {
      key: "idsa-2009",
      label: "Clinical Practice Guidelines for the Diagnosis and Management of Intravascular Catheter-Related Infection: 2009 Update by the Infectious Diseases Society of America",
      publisher: "IDSA (Clinical Infectious Diseases, Mermel et al.)",
      year: 2009,
      url: "https://doi.org/10.1086/599376",
      doi: "10.1086/599376",
      gradingScheme: "Strength A (good evidence) to C (poor evidence); quality I (at least one randomised trial), II (non-randomised trials, cohort or case-control studies) or III (expert opinion), from the Canadian Task Force scheme.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology, Sousa et al.)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      gradingScheme: "[level, grade]: levels I (large good-quality RCT or meta-analysis) to V (no control group, case reports, expert opinion); grades A (strongly recommended) to E (never recommended), adapted from the IDSA/USPHS system.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  drugs: ["urokinase"],
  technologies: ["implanted-ports", "picc-lines", "catheter-lock-solutions"],
  terms: ["central-venous-access", "febrile-neutropenia"],
  related: ["febrile-neutropenia-first-hour", "implanted-port-access-and-care", "catheter-related-thrombosis-in-cancer"],
  upgrades: [],
  gaps: [
    "Both guidelines are old: IDSA 2009 and ESMO 2015. No newer edition of either was found, and IDSA notes its diagnostic definition differs from surveillance definitions of central line-associated bloodstream infection.",
    "Antibiotic choices depend on local resistance; the guideline examples (vancomycin, daptomycin, fourth-generation cephalosporins, carbapenems) are not a substitute for local policy.",
    "The ECIL and other haematology-specific guidance on line infections in neutropenic patients was not read.",
    "Duration of antibiotics by organism is set out in IDSA's figures and pathogen sections, which are not reproduced here.",
  ],
});
