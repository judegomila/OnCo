import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Skin reactions caused by immune checkpoint inhibitors, from itch and rash to blistering and severe erosive disease.
 *
 * What was read, and how: see ./irae-sources.ts for SITC 2021 (full text, dermatological review and recommendations),
 * ASCO 2021 (abstract) and ESMO 2022 (not reachable). In addition, the 2024 consensus definitions of dermatologic
 * immune-related adverse events (D-irAEs; Journal for ImmunoTherapy of Cancer, open access, full text from Europe PMC,
 * PMC11015215). DOIs resolved through Crossref. Quotes checked by script.
 */
export const iraeSkin = protocol({
  id: "irae-skin",
  name: "Immune-related skin reactions from checkpoint inhibitors, including blistering and severe erosive rashes",
  aka: ["checkpoint inhibitor rash", "immunotherapy skin toxicity", "ICI bullous pemphigoid", "ICI SJS/TEN", "dermatologic irAE", "D-irAE"],
  domain: "immunotherapy-toxicity",
  tldr: "Rash and itching are among the commonest and earliest side effects of immunotherapy, usually a few weeks in, and most are mild. Blisters, peeling skin, sore skin, or sores in the mouth, eyes or genitals are different: they can be serious and need the cancer team the same day.",
  simple: "Immunotherapy often causes an itchy rash, which creams usually settle. Blisters, painful or peeling skin, or mouth sores need a same-day call to your cancer team.",
  summary: "Rash occurs in 23% on anti-CTLA-4 (1% grade 3 or more), 10% on anti-PD-(L)1 and 41% on combinations (5% grade 3 or more), on average 3 to 4 weeks after starting (SITC 2021). Rare severe forms include bullous pemphigoid (about 1% on anti-PD-(L)1), pemphigus, lichenoid eruptions and SJS/TEN, which has mucosal involvement and can arise suddenly or evolve from a lichenoid rash that fails treatment.\n\nSITC 2021: for itch without rash, high-potency topical steroids and GABA agonists may be considered (LE: 4). Work up rash with blood count, metabolic panel, percentage of body surface affected, special features (blisters, mucosal involvement) and allergy history; consider dermatology referral, and for grade 3 or more refer and consider biopsy. Blisters or mucosal involvement trigger biopsy with direct immunofluorescence and serology for pemphigus and pemphigoid. Interrupt the checkpoint inhibitor until resolution or significant improvement. Refer to dermatology if topical or oral steroids fail, the rash is grade 3 or more, or intolerable. For rashes that recur on taper, a steroid-sparing drug matched to the diagnosis: rituximab for pemphigus (LE: 1) or bullous pemphigoid (LE: 4), dupilumab for eczema (LE: 1), infliximab for lichenoid rash, omalizumab for urticaria or itch (LE: 1). Re-challenge after grade 3 rash is possible. A rash not responding to immunosuppression may be infected.\n\nThe 2024 D-irAE consensus separates ICI-erosive mucocutaneous disease, including an SJS/TEN-like acute form, from classic SJS/TEN and says it usually means at least holding and often permanently stopping the checkpoint inhibitor. ESMO 2022 could not be read.",
  asOf: "2026-11-11",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["telephone-triage", "outpatient-clinic", "acute-oncology-service", "ward"],
  },
  population: "Adults treated with an immune checkpoint inhibitor who develop itch, rash, blistering or mucosal sores. Rashes from other drugs given at the same time (for example antibiotics or chemotherapy) are a differential diagnosis. Children are not addressed.",
  trigger: "New itch or rash during or after checkpoint inhibitor treatment, and urgently any blistering, skin pain, peeling or sores in the mouth, eyes or genitals.",
  steps: [
    {
      action: "For itch without a rash, consider a high-potency topical steroid and a GABA agonist",
      why: "Itch alone often responds to treatment on the skin and a nerve-calming tablet.",
      source: "sitc-2021",
      quote: "For patients with pruritus without rash, treatment with high-potency topical corticosteroids and GABA agonists may be considered",
      grade: "LE: 4",
    },
    {
      action: "For a rash, check blood count and metabolic panel, estimate the body surface area involved, look for blisters or mucosal involvement, and ask about allergy",
      why: "Body surface area sets the grade, and blisters or mucosal sores point to rarer, more serious diagnoses.",
      source: "sitc-2021",
      quote: "Workup for patients with potential ICI-related rash (grade <3) should include CBC with differential, CMP, assessment of the percentage body surface area involved by the rash, assessment of special features (eg, bullous formation, mucosal involvement), and patient history of allergy or atopy.",
    },
    {
      action: "For grade 3 or more, refer to a dermatologist and consider a skin biopsy",
      why: "Severe rashes need a firm diagnosis to choose the right treatment.",
      source: "sitc-2021",
      quote: "Workup for patients with potential ICI-related rash (grade ≥3) should also include referral to a dermatologist and possible skin biopsy.",
    },
    {
      action: "If there are blisters or mucosal sores, suspect pemphigoid, pemphigus, lichenoid rash or SJS/TEN and arrange biopsy with immunofluorescence and antibody tests",
      why: "These conditions look alike but are treated differently, and SJS/TEN can be life-threatening.",
      source: "sitc-2021",
      quote: "Rash with blisters, mucosal involvement, or bullous formation should trigger suspicion of lichenoid rash, pemphigus, pemphigoid, or SJS/TEN and follow-up testing, including skin biopsy with direct immunofluorescence studies and serum antibodies to desmogleins 1 and 3, bullous pemphigoid antigens 1 and 2, and indirect immunofluorescence studies in salt-split skin.",
    },
    {
      action: "Interrupt the checkpoint inhibitor until the rash has resolved or improved significantly",
      why: "Pausing the drug lets the skin settle; for most rashes it can be restarted.",
      source: "sitc-2021",
      quote: "ICI therapy should be interrupted until resolution or significant improvement of symptoms.",
    },
    {
      action: "Ask for a dermatology opinion if the rash does not respond to topical or oral steroids, is grade 3 or more, or is intolerable",
      why: "Specialist diagnosis opens up targeted treatments and avoids long courses of steroids.",
      source: "sitc-2021",
      quote: "If ICI-related rash does not respond to topical or oral corticosteroids, is grade ≥3, or is intolerable, a dermatological consultation is recommended.",
    },
    {
      action: "If a grade 2 or higher rash comes back as steroids are tapered, use a steroid-sparing drug matched to the diagnosis",
      why: "Rituximab for pemphigus or pemphigoid, dupilumab for eczema, infliximab for lichenoid rash and omalizumab for urticaria or itch avoid repeated steroid courses.",
      source: "sitc-2021",
      quote: "Grade ≥2 dermatological events (rash, pruritus) may recur after steroid taper. Therefore, a dermatological consultation or use of a steroid-sparing agent is recommended (rituximab for pemphigus",
      grade: "LE: 1 (rituximab for pemphigus, dupilumab, omalizumab); LE: 4 (rituximab for pemphigoid)",
    },
    {
      action: "If a rash does not respond to immune suppression, take cultures for infection",
      why: "Steroid-treated skin can become infected, which looks like a worsening rash.",
      source: "sitc-2021",
      quote: "Rash that does not respond to immunosuppressive therapy should underscore the possibility of an infection and corresponding cultures should be obtained.",
    },
    {
      action: "Treat erosive mucocutaneous disease, including the SJS/TEN-like form, as an emergency that usually means holding and often permanently stopping the checkpoint inhibitor",
      why: "Skin pain, erosions and a positive Nikolsky sign coming on within two weeks signal a severe reaction that usually needs systemic immune suppression.",
      source: "dirae-2024",
      quote: "This presentation, given its severity, usually necessitates at least holding of the ICI, and often permanent discontinuation of ICI therapy.",
    },
    {
      action: "After a grade 3 rash that has settled, consider re-challenge",
      why: "Most skin reactions do not rule out further immunotherapy.",
      source: "sitc-2021",
      quote: "Patients who have experienced grade 3 ICI-related rash may be re-challenged with ICIs.",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 is the most detailed guideline read: assess body surface area and special features, interrupt the checkpoint inhibitor until improvement, refer to dermatology for grade 3 or more or for treatment failure, biopsy blistering or mucosal rashes, and use steroid-sparing drugs matched to the diagnosis when rashes recur on taper (rituximab for pemphigus, LE: 1; dupilumab for eczema, LE: 1; omalizumab for urticaria or itch, LE: 1). The 2024 D-irAE consensus adds diagnostic definitions, separating ICI-erosive mucocutaneous disease, with an acute SJS/TEN-like subtype and an indolent erosive lichen planus-like subtype, and states that it usually means holding and often permanently stopping the checkpoint inhibitor. ASCO 2021's general frame applies (continue at grade 1, hold at grade 2, high-dose steroids and suspension at grade 3, permanent stop at grade 4); its skin table and ESMO 2022 were not read.",
    sources: ["sitc-2021", "dirae-2024", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "Consensus disease definitions for skin irAEs (D-irAE, 2024)",
      differs: "Defines specific dermatologic irAEs by expert panel adjudication, including ICI-erosive mucocutaneous disease with an acute SJS/TEN-like subtype (onset over at most 2 weeks without a preceding rash, erosive plaques, positive Nikolsky sign) and an indolent erosive lichen planus-like subtype.",
      evidence: "Consensus definitions for diagnosis and research, not treatment recommendations.",
      sources: ["dirae-2024"],
    },
  ],
  grades: [
    { claim: "High-potency topical steroids and GABA agonists for itch without rash", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Rituximab for pemphigus", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Rituximab for bullous pemphigoid", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Dupilumab for eczema; omalizumab for urticaria or itch", grade: "LE: 1", source: "sitc-2021" },
    { claim: "General rule: grade 3 toxicities warrant suspension and high-dose corticosteroids", grade: "expert consensus", source: "asco-2021", quote: "Grade 3 toxicities generally warrant suspension of ICPis and the initiation of high-dose corticosteroids." },
  ],
  sources: [
    SITC_ICI_2021,
    { key: "dirae-2024", label: "Defining D-irAEs: consensus-based disease definitions for the diagnosis of dermatologic adverse events from immune checkpoint inhibitor therapy", publisher: "Journal for ImmunoTherapy of Cancer (international expert panel)", year: 2024, url: "https://europepmc.org/article/PMC/PMC11015215", doi: "10.1136/jitc-2023-007675", gradingScheme: "Expert panel adjudication with median scores (1 to 9) for each element of a definition; definitions, not graded recommendations.", read: "full-text", accessed: "2026-11-11" },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "SITC gives no steroid doses specific to severe skin reactions, and none of the sources read sets out burns-unit or intensive care management of SJS/TEN; those steps are not written here.",
    "The 2024 Chinese expert consensus on checkpoint inhibitor skin reactions is listed in Europe PMC without open full text and was not read.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "rituximab", "infliximab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  related: ["irae-colitis", "checkpoint-inhibitor-baseline-and-monitoring"],
  tags: ["protocol", "irae", "dermatology"],
});
