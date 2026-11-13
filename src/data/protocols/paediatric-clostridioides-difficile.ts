import { protocol } from "./helpers";

/*
 * Preventing and treating Clostridioides difficile infection in children with cancer and after haematopoietic cell
 * transplant.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - Patel et al., Guideline for the management of Clostridioides difficile infection in pediatric patients with cancer
 *   and hematopoietic cell transplantation recipients: 2024 update (eClinicalMedicine 2024), open access, full text
 *   from Europe PMC (PMC11046252, full-text XML). It replaces the 2018 guideline, which COG lists as archived in
 *   August 2024.
 * - Children's Oncology Group endorsement document (version date 10 September 2024; endorsed August 2024), public PDF
 *   from the COG supportive care page (pdftotext, full text).
 * - IDSA and SHEA 2021 focused update on C. difficile in adults: abstract only, from Europe PMC; the abstract does not
 *   state the recommendations, so no step or variant rests on it.
 * The DOIs were resolved through Europe PMC and their titles checked. Quotes are copied from the raw text with line
 * breaks joined and nothing else changed.
 */
export const paediatricClostridioidesDifficile = protocol({
  id: "paediatric-clostridioides-difficile",
  name: "Clostridioides difficile infection in children with cancer or after stem cell transplant",
  aka: ["C. difficile in children with cancer", "C diff paediatric oncology", "CDI children", "Clostridium difficile children cancer"],
  domain: "paediatric",
  tldr: "C. difficile is a gut germ that can cause bad diarrhoea, often after antibiotics. In children having cancer treatment it is treated with an antibiotic by mouth, chosen by how severe it is. Children with it are kept apart from others to stop it spreading, and probiotics and faecal transplants are not used routinely during treatment.",
  simple: "Antibiotics can let a gut germ called C. difficile cause diarrhoea. The child gets a medicine by mouth and is kept in a single room. Teams try not to give antibiotics the child does not need.",
  summary: "The 2024 update from an international panel led by the Pediatric Oncology Group of Ontario (96 randomised trials in any population, GRADE), endorsed by the Children's Oncology Group in August 2024, covers children and adolescents aged 1 to 18 with cancer or undergoing haematopoietic cell transplant; infants under 1 are excluded because C. difficile in them is usually colonisation. Treat non-severe infection with oral metronidazole or oral vancomycin (strong, low) and severe infection (colitis, pneumatosis, pseudomembranous colitis, ileus or surgery) with oral vancomycin or, new in 2024, oral fidaxomicin (strong, low), after a trial including children with cancer showed higher cure at follow-up and fewer recurrences with fidaxomicin. Consider fidaxomicin for recurrence (conditional, moderate). Do not use faecal microbiota transplantation routinely (strong, low), though it may be reasonable once treatment is over and the child is no longer immunosuppressed. Do not use probiotics routinely for prevention or treatment (conditional, low), because of documented invasive infections from probiotics in children with cancer, nor bezlotoxumab (conditional, moderate). Two new good practice statements: isolate according to local policy, and minimise systemic antibiotics, especially after a previous episode.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["ward", "outpatient-clinic"],
  },
  population: "Children and adolescents aged 1 to 18 with cancer and those undergoing haematopoietic cell transplant. Infants under 1 year are excluded by the guideline. Adults are not covered.",
  trigger: "A child having cancer treatment or a transplant has diarrhoea and C. difficile toxin is detected, or is at risk because of antibiotics.",
  steps: [
    {
      action: "Isolate a child with C. difficile infection and follow the local infection control policy",
      why: "Isolation limits spread of C. difficile to other children; the exact rules differ by country and hospital.",
      source: "patel-cdi-2024",
      quote: "In pediatric patients with cancer and HCT recipients experiencing CDI, follow infection control practices including isolation according to jurisdictional policies.",
      grade: "Good practice statement",
    },
    {
      action: "Keep systemic antibiotics to those the child needs, especially after a previous episode",
      why: "Exposure to antibiotics is a known risk factor for C. difficile in children with cancer.",
      source: "patel-cdi-2024",
      quote: "In pediatric patients with cancer and HCT recipients, especially those who have experienced CDI, minimize systemic antibacterial administration where feasible.",
      grade: "Good practice statement",
    },
    {
      action: "Do not give probiotics routinely to prevent C. difficile",
      why: "There are no trials in children having cancer treatment, and probiotics have caused bloodstream and fungal infections in such children.",
      source: "patel-cdi-2024",
      quote: "We suggest that probiotics not be used routinely for the prevention of CDI in pediatric patients with cancer and HCT recipients",
      grade: "conditional recommendation, low quality evidence",
    },
    {
      action: "Treat non-severe infection with oral metronidazole or oral vancomycin",
      why: "The trials found similar cure and relapse rates with the two.",
      source: "patel-cdi-2024",
      quote: "Use either oral metronidazole or oral vancomycin for the treatment of non-severe CDI in pediatric patients with cancer and HCT recipients",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Treat severe infection with oral vancomycin or oral fidaxomicin",
      why: "Vancomycin cured more severe cases than metronidazole; fidaxomicin, tested in a trial that included children with cancer, cured more at follow-up and halved relapses compared with vancomycin.",
      source: "patel-cdi-2024",
      quote: "Use either oral vancomycin or oral fidaxomicin for the treatment of severe CDI in pediatric patients with cancer and HCT recipients",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Consider fidaxomicin for a recurrence",
      why: "Fidaxomicin reduces further relapses, though it has not been tested specifically in recurrent infection.",
      source: "patel-cdi-2024",
      quote: "Consider fidaxomicin for the treatment of recurrent CDI in pediatric patients with cancer and HCT recipients",
      grade: "conditional recommendation, moderate quality evidence",
    },
    {
      action: "Do not use faecal microbiota transplantation routinely during treatment",
      why: "Its benefit in children is uncertain, the products vary, and the safety concern is highest while the child is neutropenic or immunosuppressed.",
      source: "patel-cdi-2024",
      quote: "Do not use FMT routinely for the treatment of CDI in pediatric patients with cancer and HCT recipients",
      grade: "strong recommendation, low quality evidence",
    },
    {
      action: "Do not use bezlotoxumab or probiotics routinely as treatment",
      why: "Bezlotoxumab did not help in the trial of children with cancer and needs a drip; probiotics carry the infection risk above.",
      source: "patel-cdi-2024",
      quote: "We suggest that monoclonal antibodies not be used routinely for the treatment of CDI in pediatric patients with cancer and HCT recipients",
      grade: "conditional recommendation, moderate quality evidence",
    },
  ],
  bestInClass: {
    statement: "The 2024 international paediatric guideline (Patel et al.), endorsed by the Children's Oncology Group, is the only guideline written for children with cancer and transplant recipients: oral metronidazole or vancomycin for non-severe infection, oral vancomycin or fidaxomicin for severe infection, fidaxomicin considered for recurrence, isolation and antibiotic stewardship, and no routine probiotics, faecal transplant or bezlotoxumab. Its evidence is mostly from adult trials, which is why most grades are low; adult guidelines (IDSA and SHEA 2021) were not read here beyond their abstract, so no comparison with them is made on this page.",
    sources: ["patel-cdi-2024", "cog-cdi-2024"],
  },
  variants: [
    {
      name: "Faecal microbiota transplantation after treatment ends",
      differs: "Uses faecal transplant for recurrent infection once the child has finished cancer treatment and is no longer immunosuppressed.",
      evidence: "The guideline's strong recommendation is against routine use during treatment; its rationale says faecal transplant may be a reasonable option once patients have completed therapy and are no longer immunosuppressed. No paediatric oncology trial supports it.",
      sources: ["patel-cdi-2024"],
    },
  ],
  grades: [
    { claim: "Oral metronidazole or vancomycin for non-severe infection", grade: "strong recommendation, low quality evidence", source: "patel-cdi-2024" },
    { claim: "Oral vancomycin or fidaxomicin for severe infection", grade: "strong recommendation, low quality evidence", source: "patel-cdi-2024" },
    { claim: "Fidaxomicin for recurrence", grade: "conditional recommendation, moderate quality evidence", source: "patel-cdi-2024" },
    { claim: "No routine faecal microbiota transplantation", grade: "strong recommendation, low quality evidence", source: "patel-cdi-2024" },
    { claim: "No routine probiotics for prevention", grade: "conditional recommendation, low quality evidence", source: "patel-cdi-2024" },
    { claim: "No routine probiotics for treatment", grade: "conditional recommendation, low quality evidence", source: "patel-cdi-2024", quote: "We suggest that probiotics not be used routinely for the treatment of CDI in pediatric patients with cancer and HCT recipients" },
    { claim: "No routine monoclonal antibodies (bezlotoxumab)", grade: "conditional recommendation, moderate quality evidence", source: "patel-cdi-2024" },
  ],
  sources: [
    { key: "patel-cdi-2024", label: "Guideline for the management of Clostridioides difficile infection in pediatric patients with cancer and hematopoietic cell transplantation recipients: 2024 update", publisher: "International panel (Pediatric Oncology Group of Ontario), eClinicalMedicine", year: 2024, url: "https://europepmc.org/article/PMC/PMC11046252", doi: "10.1016/j.eclinm.2024.102604", gradingScheme: "GRADE: recommendations strong or conditional, evidence high, moderate, low or very low, printed after each recommendation; good practice statements are ungraded.", read: "full-text", accessed: "2026-11-11" },
    { key: "cog-cdi-2024", label: "Guideline for the Management of Clostridioides difficile Infection in Pediatric Patients with Cancer and Hematopoietic Cell Transplantation Recipients (COG endorsement, version date 10 September 2024)", publisher: "Children's Oncology Group", year: 2024, url: "https://childrensoncologygroup.org/wp-content/uploads/2026/05/COG_SC_C_diff_Guideline_Document_10SEPT2024-new-logo.pdf", gradingScheme: "Reprints the source guideline's GRADE strength and quality for each recommendation.", read: "full-text", accessed: "2026-11-11" },
    { key: "idsa-shea-2021", label: "Clinical Practice Guideline by IDSA and SHEA: 2021 Focused Update Guidelines on Management of Clostridioides difficile Infection in Adults", publisher: "IDSA and SHEA, Clinical Infectious Diseases", year: 2021, url: "https://europepmc.org/abstract/MED/34164674", doi: "10.1093/cid/ciab549", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The guideline sets no paediatric criteria for diagnosing C. difficile infection (which test, and which symptoms); the panel names this as needed.",
    "Doses and treatment length are not given in the guideline and come from local formularies.",
    "Most evidence is from adult trials; few trials include neutropenic children.",
    "The adult IDSA and SHEA 2021 focused update was read only as an abstract, which does not state its recommendations, so how adult and paediatric advice differ on fidaxomicin and metronidazole is not set out here.",
  ],
  cancers: ["childhood-cancers"],
  technologies: ["allogeneic-hsct"],
  companies: ["childrens-oncology-group"],
  related: ["paediatric-fever-and-neutropenia"],
  sections: ["supportive-care"],
  tags: ["protocol", "paediatric", "infection"],
});
