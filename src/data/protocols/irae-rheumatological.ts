import { protocol } from "./helpers";
import { ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Rheumatic and musculoskeletal immune-related adverse events of checkpoint inhibitors: inflammatory arthritis,
 * polymyalgia-like syndromes, sicca syndrome, vasculitis and myositis.
 *
 * What was read, and how: SITC 2021 (full text, general and musculoskeletal sections and recommendations), as
 * described in ./irae-sources.ts; the EULAR points to consider (Ann Rheum Dis, open access, full text from Europe
 * PMC, PMC7788064). ASCO 2021 abstract only; ESMO 2022 not reachable. DOIs resolved through Europe PMC. Quotes
 * checked by script against the raw text on 11 November 2026.
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text. EULAR: full-text XML fetched
 * again from the Europe PMC REST API (PMC7788064), tags and citation numbers stripped by script; its DOI resolved
 * through Crossref and Europe PMC, and Europe PMC searched for a newer edition (none found). Its two supplementary
 * tables were not read. SITC 2021: the full-text XML saved on 16 November 2026 by the irae-myocarditis checker
 * (Europe PMC, PMC8237720) was re-used. Macmillan Cancer Support's pembrolizumab page was fetched with curl and
 * added as the source for what a patient is asked to report. ASCO 2021 and ESMO 2022 were not re-read by this
 * checker; no step rests on either. Every quote in the file was checked verbatim by script against these texts.
 */
export const iraeRheumatological = protocol({
  id: "irae-rheumatological",
  name: "Joint, muscle and other rheumatic side effects of checkpoint inhibitors",
  aka: ["checkpoint inhibitor arthritis", "ICI inflammatory arthritis", "rheumatic irAEs", "immune-related polymyalgia rheumatica", "checkpoint inhibitor myositis", "immune-related sicca syndrome", "musculoskeletal irAEs"],
  domain: "immunotherapy-toxicity",
  tldr: "Immunotherapy can cause joint pain and swelling, stiffness in the shoulders and hips, a dry mouth and eyes or, rarely, muscle inflammation. Some people need only painkillers or anti-inflammatories; others need steroids and a rheumatologist. Ring your hospital's 24-hour number about new aches, stiff or swollen joints or weak muscles, and straight away if you are breathless or have palpitations.",
  simple: "Immunotherapy can cause painful, stiff or swollen joints. Tell your team: there are treatments, and many people with joint problems are able to carry on with immunotherapy. Muscle weakness with trouble swallowing, breathlessness or palpitations can be serious, so contact the hospital straight away.",
  summary: "Inflammatory arthritis affects 1 to 7% of trial participants, and myositis about 1% of people on PD-(L)1 inhibitors; SITC 2021 calls vasculitis rare and says the frequency of polymyalgia is hard to assess. Myositis is the dangerous one: it clusters with myocarditis and myasthenia gravis and can involve the breathing muscles, so suspicion of one should prompt evaluation for all three.\n\nSITC 2021: refer events of grade 2 or higher, or persistent ones, to a rheumatologist; for possible arthritis, ESR, CRP, rheumatoid factor, anti-CCP, ANA, a joint count and imaging where appropriate; prednisone may start at 10 to 20 mg/day for grade 2, and 40 to 60 mg/day may be required for grade 3 or more (LE: 1); TNF inhibitors, methotrexate, leflunomide, hydroxychloroquine, sulfasalazine or IL-6 receptor inhibitors may be used when steroids fail or long-term treatment is needed (LE: 1). Under its general rule, grade 2 events mean withholding the checkpoint inhibitor for a time. Myositis of any grade: creatine kinase, aldolase, troponin, ECG, myasthenia antibodies and nerve and muscle studies. Grade 3 myositis: hold the checkpoint inhibitor and start prednisone 1 mg/kg, with any myocardial involvement meaning permanent discontinuation; intravenous methylprednisolone 1 to 2 mg/kg, plasmapheresis or IVIG may be considered for severe weakness, heart or breathing involvement or dysphagia (LE: 3).\n\nEULAR, the rheumatologists' statement, differs in emphasis: prompt rheumatology assessment whatever the grade; NSAIDs or analgesics first for mild to moderate symptoms; glucocorticoids considered when these fail, tapered to the lowest effective dose; no methylprednisolone pulses or high-dose oral steroids outside life-threatening disease and myositis, because of concern for the anti-tumour response; a conventional DMARD considered when more than 10 mg/day prednisone is needed; TNF or IL-6 inhibitors preferred for severe or refractory arthritis; holding immunotherapy as a shared decision; and withdrawal always for life-threatening myositis.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "patient-or-carer", "multidisciplinary-team"],
    where: ["outpatient-clinic", "acute-oncology-service", "ward"],
  },
  population: "Adults receiving or who have received an immune checkpoint inhibitor who develop joint, muscle, salivary or vessel inflammation, including those with pre-existing autoimmune rheumatic disease, many of whom may have a flare. Neither guideline gives advice for children.",
  trigger: "New joint pain, swelling or stiffness, shoulder and hip girdle pain, dry mouth or eyes, muscle pain or weakness, or a raised creatine kinase during or after checkpoint inhibitor treatment.",
  steps: [
    {
      action: "Consider cancer spread, paraneoplastic syndromes and unrelated joint disease, and look for objective evidence of inflammation in the affected organ",
      why: "New pain in someone with advanced cancer may be the cancer itself, not the immunotherapy.",
      source: "eular-2021",
      quote: "Metastases, paraneoplastic syndromes and unrelated rheumatic diseases should be considered as a potential differential diagnosis of rheumatic immune-related events.",
      grade: "LoE 4; GoR C; LoA 9.5",
    },
    {
      action: "For possible inflammatory arthritis, check ESR, CRP, rheumatoid factor, anti-CCP and ANA, count the affected joints and image them where appropriate, in consultation with a rheumatologist",
      why: "The aim of the tests and scans is to show whether the joints are truly inflamed.",
      source: "sitc-2021",
      quote: "Initial diagnostic evaluation for patients with possible inflammatory arthritis should include ESR, CRP, rheumatoid factor, anti-CCP and ANA, and joint count and radiological investigation of the affected joint(s) where appropriate (with X-ray, MRI, or ultrasound) in consultation with a rheumatologist.",
    },
    {
      action: "Refer rheumatic side effects of grade 2 or higher, or that persist, to a rheumatologist",
      why: "The rheumatologist chooses and interprets the tests and advises on treatment. EULAR asks for prompt assessment whatever the grade, ideally before steroids are started.",
      source: "sitc-2021",
      quote: "Patients with grade ≥2 (or persistent) rheumatological irAEs such as inflammatory arthritis, PMR/GCA, vasculitis, myositis, or sicca syndrome should be referred to a rheumatologist for choice and interpretation of diagnostic testing as well as management recommendations.",
    },
    {
      action: "Ask the patient to ring the hospital's 24-hour number about new or worsening aches or pains, new or worsening joint stiffness, swollen joints or muscle weakness, during treatment or after it ends",
      why: "Side effects can start during treatment or months after it ends, and can become serious if they are not treated.",
      source: "macmillan-pembrolizumab",
      quote: "This treatment can cause sore or weak muscles. Your joints may also be stiff, sore or swollen.",
    },
    {
      action: "Start with NSAIDs or simple painkillers for mild to moderate symptoms if there is no reason not to",
      why: "Their anti-inflammatory effect can be expected within hours or a few days. For one or a few inflamed joints, EULAR says a steroid injection into the joint should also be considered.",
      source: "eular-2021",
      quote: "In the absence of contraindications, symptomatic treatment including non-steroidal anti-inflammatory drugs and/or analgesics should be the initial treatment for mild-to-moderate rheumatic manifestations.",
    },
    {
      action: "If that is not enough, consider steroids: for arthritis or polymyalgia, SITC says prednisone may start at 10 to 20 mg/day for grade 2, and that 40 to 60 mg/day may be required for grade 3 or more",
      why: "Steroids calm the inflammation, and the dose rises with severity. EULAR prefers to keep doses low and leaves the dose to the condition and how active it is.",
      source: "sitc-2021",
      quote: "Corticosteroid dosing for inflammatory arthritis and PMR may start at 10–20 mg/day of prednisone equivalents for grade 2 symptoms. For grade ≥3 symptoms, higher dosages of 40–60 mg/day of prednisone equivalents may be required",
      grade: "LE: 1",
    },
    {
      action: "Once symptoms improve, taper steroids to the lowest dose that controls them",
      why: "Steroids carry their own harms and there is concern that they blunt the immunotherapy. EULAR regards 10 mg/day of prednisone or less as an acceptable target.",
      source: "eular-2021",
      quote: "When improvement is achieved, systemic glucocorticoids should be tapered to the lowest effective dose to control the symptoms",
      grade: "LoE 4; GoR C; LoA 9.4",
    },
    {
      action: "Consider a conventional DMARD when steroids are not enough or more than 10 mg/day prednisone is needed; methotrexate was the most often used for arthritis, then hydroxychloroquine, then sulfasalazine",
      why: "These drugs let the steroid dose come down. EULAR advises caution with sulfasalazine, which caused more hypersensitivity reactions in this setting.",
      source: "eular-2021",
      quote: "csDMARD should be considered in patients with insufficient response to acceptable dose of glucocorticoids or requiring glucocorticoid-sparing",
      grade: "LoE 4; GoR C; LoA 9",
    },
    {
      action: "For severe or DMARD-refractory disease, consider a biological DMARD, preferring a TNF or IL-6 inhibitor for inflammatory arthritis",
      why: "In one study with a median follow-up of 9 months, TNF inhibitors did not harm the response of the cancer, though EULAR says more data are needed. Tocilizumab rests on reports of individual patients.",
      source: "eular-2021",
      quote: "For patients experiencing severe rheumatic and systemic immune-related adverse events or with insufficient response to csDMARD, bDMARD may be considered, with TNF or IL-6 inhibitors being the preferred options for inflammatory arthritis",
      grade: "LoE 4; GoR C; LoA 8.8",
    },
    {
      action: "Decide with the patient whether to hold or continue immunotherapy, weighing severity, the treatment needed, how well and how long the cancer has responded, and the future treatment plan",
      why: "No randomised trial guides the choice. In the reports EULAR reviewed, the checkpoint inhibitor was stopped in 25% of people with inflammatory arthritis. SITC's general rule is to withhold it for a time at grade 2.",
      source: "eular-2021",
      quote: "The decision to hold or to continue the cancer immunotherapy should be based on the severity of rheumatic immune-related adverse events, the extent of required immunosuppressive regimen, the tumour response and its duration, as well as the future oncology treatment plan, in a shared decision with the patient",
      grade: "LoE 5; GoR D; LoA 9.4",
    },
    {
      action: "For myositis of any grade, refer to a specialist and test creatine kinase, aldolase, troponin, ESR, CRP and the myasthenia antibodies, with an ECG and nerve conduction and muscle studies",
      why: "Myositis, myocarditis and myasthenia gravis are often seen in the same person and look alike, so suspicion of one should prompt a check for all three. Creatine kinase can be normal in someone with symptoms.",
      source: "sitc-2021",
      quote: "Should have testing including erythrocyte sedimentation rate (ESR), C reactive protein (CRP), creatine kinase (CK), antibody tests (acetylcholine, muscle-specific kinase (MusK), striational), aldolase, troponin, EKG, nerve conduction, and electromyography (EMG).",
    },
    {
      action: "For grade 3 myositis, hold the checkpoint inhibitor until the myositis is grade 1 or less off immunosuppression, and start prednisone 1 mg/kg; stop the checkpoint inhibitor permanently if there is any evidence the heart is involved",
      why: "Deaths in myositis may come from myocarditis or from weakness of the breathing muscles.",
      source: "sitc-2021",
      quote: "For patients with grade 3 myositis, ICIs should be held until myositis is grade ≤1 while off immune suppression and permanently discontinued if there is any evidence of myocardial involvement. Prednisone should be initiated at 1 mg/kg or equivalent.",
    },
    {
      action: "If myositis symptoms and creatine kinase do not improve, or worsen, after 4 to 6 weeks, consider another immunosuppressant such as methotrexate, azathioprine or mycophenolate mofetil",
      why: "A second drug is the next option when steroids have not settled the muscle inflammation.",
      source: "sitc-2021",
      quote: "If symptoms of myositis and CK levels do not improve or worsen after 4–6 weeks, other immunosuppressant therapy, such as methotrexate, azathioprine, or mycophenolate mofetil may be considered",
      grade: "LE: 3",
    },
    {
      action: "For life-threatening myositis (swallowing or speech problems, breathlessness or myocarditis), withdraw immunotherapy and consider high-dose steroids, IVIG and/or plasma exchange",
      why: "Severe myositis can affect the swallowing and breathing muscles and the heart. EULAR describes high-dose steroids, usually 1 to 2 mg/kg/day, as the first-line treatment.",
      source: "eular-2021",
      quote: "In the presence of life-threatening manifestations (bulbar symptoms (dysphagia, dysarthria, dysphonia), dyspnoea and myocarditis), high dose of glucocorticoids, IVIg and/or plasma exchange should be considered; immunotherapy withdrawal is always necessary",
      grade: "LoE 4; GoR C; LoA 8.9",
    },
  ],
  bestInClass: {
    statement: "SITC 2021 and EULAR agree on involving a rheumatologist early, on considering cancer and other causes, on steroid-sparing drugs when steroids are not enough, and on high-dose steroids with the option of IVIG or plasma exchange for myositis that affects swallowing, breathing or the heart. They differ in three places. Referral: SITC refers at grade 2 or higher, or when symptoms persist; EULAR chose not to use CTCAE grades and asks for prompt assessment, ideally before steroids are started. Steroids for arthritis: SITC says 40 to 60 mg/day prednisone may be required for grade 3 or more (LE: 1, citing systematic reviews of rheumatoid arthritis and polymyalgia rheumatica outside immunotherapy); EULAR starts with NSAIDs or analgesics, did not recommend methylprednisolone pulses or high-dose oral steroids outside life-threatening disease and myositis because of concern for the anti-tumour response, and says a conventional DMARD should be considered once more than 10 mg/day prednisone is needed. The checkpoint inhibitor: SITC's general rule withholds it for a time at grade 2 unless otherwise specified, holds it for grade 3 myositis and stops it permanently with any myocardial involvement; EULAR makes holding or continuing a shared decision (LoE 5) and says withdrawal is always necessary in life-threatening myositis. EULAR is the specialist rheumatology statement, first published online in April 2020 from a literature search to December 2018; SITC, published in June 2021, is the later of the two. EULAR describes its own statements as based almost entirely on low levels of evidence and expert opinion.",
    sources: ["sitc-2021", "eular-2021"],
  },
  variants: [
    {
      name: "Steroid-sparing first (EULAR 2021)",
      differs: "Prompt rheumatology assessment whatever the CTCAE grade; NSAIDs or analgesics first; intra-articular steroid considered for one or a few joints; systemic steroids considered when these fail, tapered within weeks or as soon as improvement is achieved; no pulses or high-dose oral steroids outside life-threatening complications and myositis; conventional DMARD considered above 10 mg/day prednisone; holding immunotherapy a shared decision.",
      evidence: "LoE 4 to 5 and grade of recommendation C to D; task force level of agreement 8.8 to 9.5 out of 10.",
      sources: ["eular-2021"],
    },
    {
      name: "Dose by CTCAE grade (SITC 2021)",
      differs: "Prednisone may start at 10 to 20 mg/day for grade 2, and 40 to 60 mg/day may be required for grade 3 or more; sicca syndrome of grade 2 or more may be treated with 20 to 40 mg/day tapered over 4 to 6 weeks. Under the general rule, the checkpoint inhibitor is withheld for a time at grade 2 and may be restarted once symptoms have resolved or are controlled on 10 mg/day prednisone or less; restarting after grade 3 or 4 is risk-adjusted.",
      evidence: "LE: 1 for both dosing recommendations; LE: 3 for both restarting recommendations; the grade 2 withholding rule carries no LE.",
      sources: ["sitc-2021"],
    },
  ],
  grades: [
    { claim: "Prednisone may start at 10 to 20 mg/day for grade 2, and 40 to 60 mg/day may be required for grade 3 or more arthritis or polymyalgia", grade: "LE: 1", source: "sitc-2021" },
    { claim: "TNF inhibitors, methotrexate, leflunomide, hydroxychloroquine, sulfasalazine or IL-6 receptor inhibitors may be used for arthritis that does not respond to steroids or needs long-term treatment", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Grade 2 or more sicca syndrome may be treated with prednisone 20 to 40 mg/day tapered over 4 to 6 weeks", grade: "LE: 1", source: "sitc-2021", quote: "Patients with grade ≥2 sicca syndrome may be treated with 20–40 mg/day of prednisone equivalents, subsequently tapered over 4–6 weeks" },
    { claim: "Grade 3 myositis with weakness severely limiting mobility, heart or breathing involvement, or dysphagia: intravenous methylprednisolone 1 to 2 mg/kg or a higher-dose bolus, plasmapheresis or IVIG may be considered", grade: "LE: 3", source: "sitc-2021", quote: "For patients with grade 3 myositis and muscle weakness severely limiting mobility, cardiac or respiratory involvement, or dysphagia, 1–2 mg/kg of methylprednisolone IV or higher-dose bolus may be considered as well as plasmapheresis or intravenous immunoglobulin (IVIG)" },
    { claim: "Grade 1 myositis with a raised creatine kinase and muscle weakness is managed as grade 2", grade: "expert consensus (no LE printed)", source: "sitc-2021", quote: "Grade 1 myositis that presents with elevated CK and muscle weakness should be managed as grade 2." },
    { claim: "General rule: after a grade 2 event the checkpoint inhibitor may be restarted once signs and symptoms have resolved or are controlled on 10 mg/day prednisone or less", grade: "LE: 3", source: "sitc-2021", quote: "Unless otherwise specified, patients who have experienced grade 2 irAEs may be re-challenged with ICI therapy if their signs and symptoms have resolved or are controlled with ≤10 mg of prednisone (or equivalent) per day" },
    { claim: "No methylprednisolone pulses or high-dose oral steroids outside life-threatening complications and myositis", grade: "task force text (not a numbered point)", source: "eular-2021", quote: "Because of concerns of glucocorticoids on antitumour responses, the task force did not recommend using methylprednisolone pulses or high-dose oral glucocorticoids in the absence of life-threatening complications and myositis, even in severe presentations, and favoured the concept of glucocorticoid sparing where rheumatologists have extensive experience with alternative options." },
    { claim: "Any patient with myositis or suspected myositis has a cardiac evaluation with troponin and an ECG, and cardiac MRI if these or the symptoms suggest myocarditis", grade: "task force text (not a numbered point)", source: "eular-2021", quote: "Therefore, cardiac evaluation must be systematic for any patient with myositis or suspected myositis." },
    { claim: "Pre-existing autoimmune rheumatic disease does not preclude immunotherapy; keep baseline prednisone below 10 mg/day if possible", grade: "LoE 4; GoR C; LoA 9", source: "eular-2021", quote: "A pre-existing autoimmune rheumatic and/or systemic disease should not preclude the use of cancer immunotherapy." },
    { claim: "No routine autoantibody testing before immunotherapy", grade: "LoE 5; GoR D; LoA 9", source: "eular-2021", quote: "Before initiation of cancer immunotherapy, there is no indication to test every patient for the presence of autoantibodies." },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    {
      key: "eular-2021",
      label: "EULAR points to consider for the diagnosis and management of rheumatic immune-related adverse events due to cancer immunotherapy with checkpoint inhibitors",
      publisher: "European League Against Rheumatism (EULAR), Annals of the Rheumatic Diseases",
      year: 2021,
      url: "https://europepmc.org/article/PMC/PMC7788064",
      doi: "10.1136/annrheumdis-2020-217139",
      gradingScheme: "Oxford Centre for Evidence-Based Medicine levels of evidence (March 2009), printed as LoE 1 to 5 (na where not applicable) with a grade of recommendation (GoR) A to D, and the task force's mean level of agreement (LoA) on a 0 to 10 scale.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "macmillan-pembrolizumab",
      label: "Pembrolizumab (Keytruda): side effects and when to contact the hospital",
      publisher: "Macmillan Cancer Support",
      year: 2026,
      url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/pembrolizumab",
      gradingScheme: "Patient information; not graded. The page gives its review date as 1 August 2026.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    ASCO_ICI_2021,
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    "The ASCO 2021 guideline was read only as its abstract and its musculoskeletal table is not compared here.",
    "The guidelines differ on steroid dose for severe arthritis. EULAR notes that no randomised trial guides the choice between holding the checkpoint inhibitor and adding immunosuppression, and lists the best steroid dose and duration as a research question.",
    "Long-term TNF inhibitor use for arthritis, unlike one or two infliximab doses for colitis, is of unclear significance for the cancer, as EULAR notes.",
    "The EULAR statement appeared online in April 2020 (in print in January 2021) and its literature search ended in December 2018. On 17 November 2026 a search of Europe PMC found no update of it. Its two supplementary tables were not read.",
    "SITC gives no separate rule for holding the checkpoint inhibitor in arthritis, polymyalgia or sicca syndrome, so its general rules are what is stated here. Its myositis section prints a steroid dose for grade 3 only.",
    "What a patient should report, and how fast, comes from Macmillan's page on pembrolizumab, one checkpoint inhibitor: the 24-hour number for new aches, joint stiffness or swelling, or muscle weakness, and straight away for breathlessness or palpitations. On 17 November 2026 no source read set a time limit for trouble swallowing; EULAR lists it among the life-threatening signs of myositis, which is why this page treats it as urgent.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "prednisone", "methotrexate", "tocilizumab", "human-normal-immunoglobulin"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo"],
  terms: ["irae"],
  keyPapers: ["paper-asco-irae-guideline-jco-2021"],
  related: ["irae-myocarditis", "irae-neurological", "idea-bio2-steroid-sparing-irae"],
  tags: ["protocol", "irae", "rheumatology"],
});
