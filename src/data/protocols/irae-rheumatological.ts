import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Rheumatic and musculoskeletal immune-related adverse events of checkpoint inhibitors: inflammatory arthritis,
 * polymyalgia-like syndromes, sicca syndrome, vasculitis and myositis.
 *
 * What was read, and how: SITC 2021 (full text, musculoskeletal section and recommendations), as described in
 * ./irae-sources.ts; the EULAR 2021 points to consider (Ann Rheum Dis, open access, full text from Europe PMC,
 * PMC7788064). ASCO 2021 abstract only; ESMO 2022 not reachable. DOIs resolved through Europe PMC. Quotes checked by
 * script against the raw text on 11 November 2026.
 */
export const iraeRheumatological = protocol({
  id: "irae-rheumatological",
  name: "Joint, muscle and other rheumatic side effects of checkpoint inhibitors",
  aka: ["checkpoint inhibitor arthritis", "ICI inflammatory arthritis", "rheumatic irAEs", "immune-related polymyalgia rheumatica", "checkpoint inhibitor myositis", "immune-related sicca syndrome", "musculoskeletal irAEs"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can cause joint pain and swelling, stiffness in the shoulders and hips, a dry mouth and eyes, or, rarely, muscle inflammation. Mild cases are treated with painkillers or anti-inflammatories; others need steroids and a rheumatologist, and immunotherapy often continues. Muscle weakness, trouble swallowing or breathlessness is urgent, because muscle inflammation can affect the heart.",
  simple: "Immunotherapy can cause painful, stiff or swollen joints. Tell your team, as there are treatments that let many people carry on with immunotherapy. New muscle weakness or difficulty swallowing needs urgent help.",
  summary: "Inflammatory arthritis affects 1 to 7% of trial participants; polymyalgia-like syndromes, sicca syndrome, vasculitis and myositis are less common (SITC 2021). Myositis (about 1% on PD-(L)1 inhibitors) is the dangerous one: it overlaps with myocarditis and myasthenia gravis and can involve the breathing muscles.\n\nSITC 2021: refer grade 2 or persistent events to a rheumatologist; for arthritis, ESR, CRP, rheumatoid factor, anti-CCP, ANA, a joint count and imaging; prednisone 10 to 20 mg/day for grade 2 and 40 to 60 mg/day for grade 3 or more (LE: 1); TNF inhibitors, methotrexate, leflunomide, hydroxychloroquine, sulfasalazine or IL-6 receptor inhibitors when steroids fail or long-term treatment is needed (LE: 1). Myositis: grade 3 holds the checkpoint inhibitor and starts prednisone 1 mg/kg, with any myocardial involvement meaning permanent discontinuation.\n\nEULAR 2021, the rheumatologists' statement, differs in emphasis: NSAIDs or analgesics first for mild to moderate symptoms; glucocorticoids only when these fail, tapered to the lowest effective dose; no methylprednisolone pulses or high-dose oral steroids outside life-threatening disease and myositis, because of concern for the anti-tumour response; a conventional DMARD when more than 10 mg/day prednisone is needed; TNF or IL-6 inhibitors preferred for refractory arthritis; holding immunotherapy as a shared decision; and withdrawal always for life-threatening myositis.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "acute-oncology-service", "ward"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor who develop joint, muscle, salivary or vessel inflammation, including those with pre-existing autoimmune rheumatic disease, who are at risk of a flare. Children are not addressed by these sources.",
  trigger: "New joint pain, swelling or stiffness, shoulder and hip girdle pain, dry mouth or eyes, muscle pain or weakness, or a raised creatine kinase during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Consider cancer spread, paraneoplastic syndromes and unrelated joint disease, and look for objective evidence of inflammation in the affected organ",
      why: "New pain in someone with advanced cancer may be the cancer itself, not the immunotherapy.",
      source: "eular-2021",
      quote: "Metastases, paraneoplastic syndromes and unrelated rheumatic diseases should be considered as a potential differential diagnosis of rheumatic immune-related events.",
      grade: "LoE 4; LoA 9.5",
    },
    {
      action: "For possible inflammatory arthritis, check ESR, CRP, rheumatoid factor, anti-CCP and ANA, count the swollen joints and image them where useful",
      why: "These tests and scans confirm inflammation and help choose treatment.",
      source: "sitc-2021",
      quote: "Initial diagnostic evaluation for patients with possible inflammatory arthritis should include ESR, CRP, rheumatoid factor, anti-CCP and ANA, and joint count and radiological investigation of the affected joint(s) where appropriate (with X-ray, MRI, or ultrasound) in consultation with a rheumatologist.",
    },
    {
      action: "Refer grade 2 or persistent rheumatic side effects to a rheumatologist",
      why: "A rheumatologist can choose treatments that control symptoms while keeping immunotherapy going.",
      source: "sitc-2021",
      quote: "Patients with grade ≥2 (or persistent) rheumatological irAEs such as inflammatory arthritis, PMR/GCA, vasculitis, myositis, or sicca syndrome should be referred to a rheumatologist for choice and interpretation of diagnostic testing as well as management recommendations.",
    },
    {
      action: "Start with NSAIDs or simple painkillers for mild to moderate symptoms if there is no reason not to",
      why: "Many mild cases settle without steroids.",
      source: "eular-2021",
      quote: "In the absence of contraindications, symptomatic treatment including non-steroidal anti-inflammatory drugs and/or analgesics should be the initial treatment for mild-to-moderate rheumatic manifestations.",
    },
    {
      action: "If that is not enough, give steroids: prednisone 10 to 20 mg/day for grade 2 arthritis or polymyalgia, and 40 to 60 mg/day for grade 3 or more",
      why: "Steroids calm joint inflammation; the dose rises with severity.",
      source: "sitc-2021",
      quote: "Corticosteroid dosing for inflammatory arthritis and PMR may start at 10–20 mg/day of prednisone equivalents for grade 2 symptoms. For grade ≥3 symptoms, higher dosages of 40–60 mg/day of prednisone equivalents may be required",
      grade: "LE: 1",
    },
    {
      action: "Once symptoms improve, taper steroids to the lowest dose that controls them",
      why: "Long or high steroid doses carry their own harms and may blunt the immunotherapy.",
      source: "eular-2021",
      quote: "When improvement is achieved, systemic glucocorticoids should be tapered to the lowest effective dose to control the symptoms",
      grade: "LoE 4; LoA 9.4",
    },
    {
      action: "Add a conventional DMARD, such as methotrexate, hydroxychloroquine or sulfasalazine, when steroids are not enough or more than 10 mg/day prednisone is needed",
      why: "These drugs let the steroid dose come down.",
      source: "eular-2021",
      quote: "csDMARD should be considered in patients with insufficient response to acceptable dose of glucocorticoids or requiring glucocorticoid-sparing",
      grade: "LoE 4; LoA 9",
    },
    {
      action: "For severe or DMARD-refractory disease, consider a biological DMARD, preferring a TNF or IL-6 inhibitor for inflammatory arthritis",
      why: "These have been used in refractory immune-related arthritis without clear harm to the cancer response.",
      source: "eular-2021",
      quote: "For patients experiencing severe rheumatic and systemic immune-related adverse events or with insufficient response to csDMARD, bDMARD may be considered, with TNF or IL-6 inhibitors being the preferred options for inflammatory arthritis",
      grade: "LoE 4; LoA 8.8",
    },
    {
      action: "Decide with the patient whether to hold or continue immunotherapy, weighing severity, the treatment needed and how well the cancer is responding",
      why: "Most arthritis can be treated while immunotherapy carries on; the choice depends on the person's cancer and goals.",
      source: "eular-2021",
      quote: "The decision to hold or to continue the cancer immunotherapy should be based on the severity of rheumatic immune-related adverse events, the extent of required immunosuppressive regimen, the tumour response and its duration, as well as the future oncology treatment plan, in a shared decision with the patient",
      grade: "LoE 5; LoA 9.4",
    },
    {
      action: "For myositis, check the heart and the nerve-muscle junction, and for grade 3 hold the checkpoint inhibitor and give prednisone 1 mg/kg; stop it permanently if the heart is involved",
      why: "Muscle inflammation often comes with myocarditis or myasthenia, which can be fatal.",
      source: "sitc-2021",
      quote: "For patients with grade 3 myositis, ICIs should be held until myositis is grade ≤1 while off immune suppression and permanently discontinued if there is any evidence of myocardial involvement. Prednisone should be initiated at 1 mg/kg or equivalent.",
    },
    {
      action: "For life-threatening myositis (swallowing or speech problems, breathlessness or myocarditis), give high-dose steroids and consider IVIG or plasma exchange, and withdraw immunotherapy",
      why: "Severe myositis can stop the breathing and swallowing muscles working.",
      source: "eular-2021",
      quote: "In the presence of life-threatening manifestations (bulbar symptoms (dysphagia, dysarthria, dysphonia), dyspnoea and myocarditis), high dose of glucocorticoids, IVIg and/or plasma exchange should be considered; immunotherapy withdrawal is always necessary",
      grade: "LoE 4; LoA 8.9",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 and EULAR 2021 agree on early rheumatology referral, excluding cancer and other causes, steroid-sparing drugs when steroids fail, and full-strength treatment with withdrawal of immunotherapy for life-threatening myositis. They differ on how hard to treat arthritis with steroids. SITC allows 40 to 60 mg/day prednisone for grade 3 or more (LE: 1, with the grade resting on evidence from rheumatic disease outside immunotherapy). EULAR starts with NSAIDs or analgesics, did not recommend methylprednisolone pulses or high-dose oral steroids outside life-threatening disease and myositis because of concern for the anti-tumour response, and adds a conventional DMARD once more than 10 mg/day prednisone is needed. EULAR is the specialist rheumatology statement and the more recent of the two on this question; both rest on case series and expert opinion, with no randomised trials.",
    sources: ["sitc-2021", "eular-2021"],
  },
  variants: [
    {
      name: "Steroid-sparing first (EULAR 2021)",
      differs: "NSAIDs or analgesics first; intra-articular steroid for one or a few joints; systemic steroids only when these fail, tapered within weeks; no pulses or high-dose oral steroids outside life-threatening complications and myositis; conventional DMARD above 10 mg/day prednisone.",
      evidence: "LoE 4 to 5; task force level of agreement 8.8 to 9.5 out of 10.",
      sources: ["eular-2021"],
    },
    {
      name: "Dose by CTCAE grade (SITC 2021)",
      differs: "Prednisone 10 to 20 mg/day for grade 2 and 40 to 60 mg/day for grade 3 or more, with sicca syndrome of grade 2 or more treated with 20 to 40 mg/day tapered over 4 to 6 weeks.",
      evidence: "LE: 1 for both dosing recommendations.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Prednisone 10 to 20 mg/day for grade 2 and 40 to 60 mg/day for grade 3 or more arthritis or polymyalgia", grade: "LE: 1", source: "sitc-2021" },
    { claim: "TNF inhibitors, methotrexate, leflunomide, hydroxychloroquine, sulfasalazine or IL-6 receptor inhibitors for refractory or long-term arthritis", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Grade 2 or more sicca syndrome: prednisone 20 to 40 mg/day tapered over 4 to 6 weeks", grade: "LE: 1", source: "sitc-2021", quote: "Patients with grade ≥2 sicca syndrome may be treated with 20–40 mg/day of prednisone equivalents, subsequently tapered over 4–6 weeks" },
    { claim: "No methylprednisolone pulses or high-dose oral steroids outside life-threatening complications and myositis", grade: "task force text (not a numbered point)", source: "eular-2021", quote: "Because of concerns of glucocorticoids on antitumour responses, the task force did not recommend using methylprednisolone pulses or high-dose oral glucocorticoids in the absence of life-threatening complications and myositis, even in severe presentations, and favoured the concept of glucocorticoid sparing where rheumatologists have extensive experience with alternative options." },
    { claim: "Pre-existing autoimmune rheumatic disease does not preclude immunotherapy; keep baseline prednisone below 10 mg/day if possible", grade: "LoE 4; LoA 9", source: "eular-2021", quote: "A pre-existing autoimmune rheumatic and/or systemic disease should not preclude the use of cancer immunotherapy." },
    { claim: "No routine autoantibody testing before immunotherapy", grade: "LoE 5; LoA 9", source: "eular-2021", quote: "Before initiation of cancer immunotherapy, there is no indication to test every patient for the presence of autoantibodies." },
  ],
  sources: [
    SITC_ICI_2021,
    {
      key: "eular-2021",
      label: "EULAR points to consider for the diagnosis and management of rheumatic immune-related adverse events due to cancer immunotherapy with checkpoint inhibitors",
      publisher: "European Alliance of Associations for Rheumatology (EULAR), Annals of the Rheumatic Diseases",
      year: 2021,
      url: "https://europepmc.org/article/PMC/PMC7788064",
      doi: "10.1136/annrheumdis-2020-217139",
      gradingScheme: "Oxford Centre for Evidence-Based Medicine levels of evidence (2009), printed as LoE 1 to 5 (na where not applicable), with the task force's mean level of agreement (LoA) on a 0 to 10 scale.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract and its musculoskeletal table is not compared here.",
    "The guidelines disagree on steroid dose for severe arthritis, and no trial has tested whether a steroid-sparing approach protects the anti-tumour response.",
    "Long-term TNF inhibitor use for arthritis, unlike one or two infliximab doses for colitis, is of unclear significance for the cancer, as EULAR notes.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "prednisone", "methotrexate", "tocilizumab", "human-normal-immunoglobulin"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-myocarditis", "irae-neurological", "idea-bio2-steroid-sparing-irae"],
  tags: ["protocol", "irae", "rheumatology"],
});
