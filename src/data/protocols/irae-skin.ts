import { protocol } from "./helpers";
import { ASCO_GAP, ASCO_ICI_2021, ESMO_GAP, ESMO_ICI_2022, SITC_ICI_2021 } from "./irae-sources";

/*
 * Skin reactions caused by immune checkpoint inhibitors, from itch and rash to blistering and severe erosive disease.
 *
 * First written 11 November 2026 from SITC 2021 (full text), the ASCO 2021 abstract and the 2024 consensus definitions
 * of dermatologic immune-related adverse events (D-irAEs).
 *
 * Second accuracy pass, 17 November 2026. Every claim was re-read against raw text and every quote checked by script
 * (whitespace joined, XML and HTML tags stripped, citation numbers removed; nothing else):
 * - SITC 2021: full-text XML from Europe PMC (PMC8237720), the copy a sibling checker saved on 16 November, re-used.
 * - D-irAE 2024: full-text XML from Europe PMC (PMC11015215), fetched 17 November. DOI resolved through Crossref.
 * - ASCO 2021: abstract only (Europe PMC record saved by a sibling checker on 16 November, re-used).
 * - New source, MASCC 2020 recommendations on severe dermatological toxicities: author manuscript in PubMed Central
 *   (PMC8996262), read as HTML with tags stripped; the Europe PMC XML endpoint returned 500. DOI resolved through
 *   Crossref. Its figure 2 is an image and was not read.
 * - New source, CTCAE version 5.0: the National Cancer Institute spreadsheet a sibling checker saved on 17 November.
 * - New source, Macmillan's pembrolizumab page (reviewed 1 August 2026), saved by a sibling checker on 17 November.
 * - Not readable: ESMO 2022 (403), the ASCO 2021 full text (403), the EADV 2022 position statement (Wiley, 403) and
 *   the 2024 Chinese consensus (subscription; abstract only).
 * Main corrections: SITC's instruction to interrupt treatment belongs to rashes with blisters or mucosal involvement,
 * not to every rash; the steroid doses and the rules for stopping for good in severe reactions now come from MASCC 2020;
 * the patient warning signs now follow Macmillan's wording.
 */
export const iraeSkin = protocol({
  id: "irae-skin",
  name: "Immune-related skin reactions from checkpoint inhibitors, including blistering and severe erosive rashes",
  aka: ["checkpoint inhibitor rash", "immunotherapy skin toxicity", "ICI bullous pemphigoid", "ICI SJS/TEN", "dermatologic irAE", "D-irAE"],
  domain: "immunotherapy-toxicity",
  tldr: "Rash and itching are among the commonest and earliest side effects of immunotherapy and are usually mild. Tell your cancer team about any skin change. Ring the hospital's 24-hour number straight away for a rash that is spreading, or for swollen, blistering or peeling skin. Skin pain and sores in the mouth, eyes or genitals are also signs doctors treat as serious.",
  simple: "Immunotherapy often causes an itchy rash, which is usually mild and can be treated. A spreading rash, or swollen, blistering or peeling skin, needs a call to the hospital's 24-hour number straight away.",
  summary: "Skin reactions are among the commonest immune-related side effects and among the earliest, on average 3 to 4 weeks after starting (SITC 2021). Rash occurs in 23% on anti-CTLA-4 (1% grade 3 or more), 10% on anti-PD-(L)1 (under 1%) and 41% on combinations (5%), typically from 2 to 5 weeks after the first dose; itch in 15%, 25% and 34% on anti-PD-(L)1, anti-CTLA-4 and combinations. Uncommon, potentially severe forms include pemphigoid (an estimated 1% on anti-PD-(L)1), pemphigus, lichenoid rash and SJS/TEN, which has mucosal involvement and may be rapid or may evolve from a less severe reaction such as a lichenoid eruption that fails to respond to typical treatment. SITC grades by CTCAE version 5.0. There, maculopapular rash covering under 10% of body surface area is grade 1; 10 to 30%, or over 30% with no more than mild symptoms, is grade 2; over 30% with moderate or severe symptoms is grade 3. Blisters covering under 10% are grade 1, 10 to 30% or painful blisters grade 2, over 30% grade 3, and over 30% with fluid or electrolyte abnormalities grade 4. SJS with skin sloughing under 10% is grade 3 and 10 to 30% grade 4; toxic epidermal necrolysis (30% or more) is grade 4.\n\nSITC 2021: for itch without rash, high-potency topical steroids and GABA agonists may be considered (LE: 4). Work up a rash below grade 3 with blood count, metabolic panel, percentage of body surface affected, special features (blisters, mucosal involvement) and allergy history, and consider dermatology referral; for grade 3 or more also refer and consider biopsy. Under SITC's general rules, which apply unless a section says otherwise, treatment may continue with monitoring at grade 1 and is temporarily withheld at grade 2, with corticosteroids depending on the toxicity. Blisters or mucosal involvement should trigger biopsy with direct immunofluorescence and serology for pemphigus and pemphigoid, and the checkpoint inhibitor should be interrupted until resolution or significant improvement. A dermatological consultation is recommended if topical or oral steroids fail, the rash is grade 3 or more, or it is intolerable. Because grade 2 or higher rash or itch may recur after a steroid taper, SITC recommends a dermatological consultation or a steroid-sparing drug: rituximab for pemphigus (LE: 1) or bullous pemphigoid (LE: 4), dupilumab for eczema (LE: 1), infliximab for lichenoid rash, omalizumab for urticaria or itch (LE: 1). Patients who have had a grade 3 rash may be re-challenged; SITC's general rule is that re-challenge after grade 3 or 4 toxicity is risk-adjusted (LE: 3). A rash not responding to immunosuppression should raise the possibility of infection. SITC gives no steroid dose for skin reactions.\n\nMASCC 2020 covers severe reactions and does not grade its recommendations. Grade 3 rash: withhold, refer to dermatology, give oral prednisone or intravenous methylprednisolone 1 mg/kg daily tapering over 4 weeks or longer, and consider 2 mg/kg daily if there is no improvement within 5 days. Its grade 4 rash (over 30% with symptoms and unresponsive, rapidly progressing or intolerable): discontinue, refer urgently, admit, give intravenous methylprednisolone 1 to 2 mg/kg daily, decide with dermatology whether to resume once prednisone is 10 mg daily or less, and stop for good if the rash does not resolve to grade 1 or less. Grade 3 blistering: withhold, refer urgently, consider admission, methylprednisolone 1 to 2 mg/kg daily then prednisone 0.5 to 1 mg/kg daily tapering over at least 4 weeks; for bullous pemphigoid consider rituximab or omalizumab. Severe cutaneous adverse reactions (SJS, TEN, acute generalised exanthematous pustulosis, DRESS): at grade 3 withhold and give the same steroid course; at grade 4 permanently discontinue, admit immediately to intensive care or a burns unit, and if steroids fail consider intravenous immunoglobulin or ciclosporin; re-challenge is generally to be avoided. Grade 3 itch: dermatology referral, prednisone 0.5 to 1 mg/kg/day tapered over 2 to 4 weeks, and a non-steroid drug such as gabapentin.\n\nThe 2024 D-irAE consensus defines ICI-erosive mucocutaneous disease, with an acute SJS/TEN-like subtype, and says it usually necessitates at least holding and often permanently stopping the checkpoint inhibitor. The ASCO 2021 abstract says that, in general, permanent discontinuation is recommended at grade 4. ESMO 2022, the ASCO skin table and the EADV 2022 position statement could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["patient-or-carer", "nurse", "doctor", "pharmacist"],
    where: ["telephone-triage", "outpatient-clinic", "acute-oncology-service", "ward"],
  },
  population: "People treated with an immune checkpoint inhibitor who develop itch, rash, blistering or mucosal sores. Other causes are to be ruled out first, including infection, a side effect of another drug and an unrelated skin disorder (MASCC 2020). The D-irAE consensus counts a skin reaction as immune-related only if it begins within 12 months of the last infusion. None of the sources read gives advice specific to children.",
  trigger: "New itch or rash during or after checkpoint inhibitor treatment. A spreading rash, swollen, blistering or peeling skin, skin pain, or sores in the mouth, eyes or genitals are the warning signs of a serious reaction.",
  steps: [
    {
      action: "Tell the cancer team about any skin change, and ring the hospital's 24-hour number straight away for a spreading rash or swollen, blistering or peeling skin",
      why: "Macmillan's advice for pembrolizumab is that skin inflammation is usually mild but can become serious if it is not treated. It lists a rash that is spreading, swollen, blistering or peeling skin, and flu-like symptoms as the serious skin symptoms.",
      source: "macmillan-pembrolizumab",
      quote: "Contact the hospital straight away on the 24-hour number if you have any of these serious skin symptoms:",
    },
    {
      action: "Grade the reaction by CTCAE version 5.0",
      why: "The steps below depend on the grade. For the commonest rash, under 10% of the body surface is grade 1, 10 to 30% is grade 2, and over 30% with moderate or severe symptoms is grade 3. Blistering and skin sloughing have their own scales, where less skin counts for more.",
      source: "sitc-2021",
      quote: "Grades of AEs are defined as in the CTCAE v5.0.",
    },
    {
      action: "For itch without a rash, consider a high-potency topical steroid and a GABA agonist",
      why: "SITC says both may be considered. It cites one retrospective study in which most cases of itch improved on pregabalin or gabapentin.",
      source: "sitc-2021",
      quote: "For patients with pruritus without rash, treatment with high-potency topical corticosteroids and GABA agonists may be considered",
      grade: "LE: 4",
    },
    {
      action: "For a rash below grade 3, check blood count and metabolic panel, estimate the body surface area involved, look for blisters or mucosal involvement, ask about allergy, and consider a dermatology referral",
      why: "The area of skin involved is part of the grade, and blisters or mucosal sores point to less common, more serious diagnoses.",
      source: "sitc-2021",
      quote: "Workup for patients with potential ICI-related rash (grade <3) should include CBC with differential, CMP, assessment of the percentage body surface area involved by the rash, assessment of special features (eg, bullous formation, mucosal involvement), and patient history of allergy or atopy.",
    },
    {
      action: "At grade 1, continue the checkpoint inhibitor and monitor for worsening",
      why: "This is SITC's general rule for all immune-related side effects, and its skin section states no exception for a rash without blisters or mucosal involvement.",
      source: "sitc-2021",
      quote: "Unless otherwise specified, patients experiencing grade 1 irAEs should be monitored for worsening symptoms, but may continue ICI therapy.",
    },
    {
      action: "At grade 2, withhold the checkpoint inhibitor temporarily and treat with corticosteroids as the reaction requires",
      why: "This is also SITC's general rule. SITC does not give a steroid dose or potency for a grade 2 rash, and no source read here does.",
      source: "sitc-2021",
      quote: "Unless otherwise specified, patients experiencing grade 2 irAEs should have ICI therapy temporarily withheld and be treated with corticosteroids depending on the toxicity in question.",
    },
    {
      action: "For grade 3 or more, refer to a dermatologist and consider a skin biopsy",
      why: "An accurate diagnosis of the type of rash guides which treatment is used.",
      source: "sitc-2021",
      quote: "Workup for patients with potential ICI-related rash (grade ≥3) should also include referral to a dermatologist and possible skin biopsy.",
    },
    {
      action: "For a grade 3 rash, withhold the checkpoint inhibitor and start oral prednisone or intravenous methylprednisolone 1 mg/kg daily, tapering over 4 weeks or longer",
      why: "This is the MASCC 2020 dose. MASCC adds that a quick response allows a 2-week taper, that 2 mg/kg daily can be considered if there is no improvement within 5 days, and that treatment may be resumed with close monitoring once the rash is grade 1 or mild grade 2.",
      source: "mascc-2020",
      quote: "Initiate oral prednisone or intravenous methylprednisolone (or equivalent) 1 mg/kg daily, tapering over 4 weeks or longer if needed",
    },
    {
      action: "If there are blisters or mucosal sores, suspect pemphigoid, pemphigus, lichenoid rash or SJS/TEN and arrange biopsy with immunofluorescence and antibody tests",
      why: "Telling these conditions apart may need special tests on a skin sample, and SJS/TEN can be life-threatening.",
      source: "sitc-2021",
      quote: "Rash with blisters, mucosal involvement, or bullous formation should trigger suspicion of lichenoid rash, pemphigus, pemphigoid, or SJS/TEN and follow-up testing, including skin biopsy with direct immunofluorescence studies and serum antibodies to desmogleins 1 and 3, bullous pemphigoid antigens 1 and 2, and indirect immunofluorescence studies in salt-split skin.",
    },
    {
      action: "With a blistering or mucosal rash, interrupt the checkpoint inhibitor until it has resolved or improved significantly",
      why: "SITC prints this instruction in its recommendation on rashes with blisters or mucosal involvement, whatever the area of skin involved.",
      source: "sitc-2021",
      quote: "ICI therapy should be interrupted until resolution or significant improvement of symptoms.",
    },
    {
      action: "For grade 3 blistering, refer urgently to dermatology, consider admission, and start intravenous methylprednisolone 1 to 2 mg/kg daily, then prednisone 0.5 to 1 mg/kg daily tapered over at least 4 weeks",
      why: "MASCC defines this as blisters over more than 30% of the body with skin sloughing. For bullous pemphigoid it says to consider rituximab or omalizumab after the first high-dose steroids, to avoid long-term steroid treatment.",
      source: "mascc-2020",
      quote: "Initiate IV methylprednisolone (or equivalent) 1-2 mg/kg daily until improvement is achieved, then transition to prednisone (or equivalent) 0.5-1 mg/kg daily, tapering over at least 4 weeks",
    },
    {
      action: "If a severe cutaneous reaction (SJS, TEN or DRESS) is possible, examine all the skin and every mucous membrane and ask about skin pain, fever and soreness of the eyes, mouth, genitals and anus",
      why: "MASCC lists these as concerning signs. It says a skin biopsy is indicated, and that significant mucosal involvement or blistering should prompt consideration of hospital admission.",
      source: "mascc-2020",
      quote: "Skin examination should include examination of all areas, including all mucous membranes (eyes, nares, oropharynx, genitals, perianal area)",
    },
    {
      action: "For grade 4 SJS, DRESS or toxic epidermal necrolysis, stop the checkpoint inhibitor permanently and admit immediately to intensive care or a burns unit",
      why: "MASCC's grade 4 is skin sloughing over 10 to 30% of the body, or redness over 30% or more with systemic symptoms and abnormal blood tests suggesting DRESS; sloughing over 30% or more defines toxic epidermal necrolysis. At grade 3 (sloughing under 10%) MASCC says to withhold treatment, refer to dermatology and consider admission.",
      source: "mascc-2020",
      quote: "Admit patient immediately to intensive care unit or burn unit for supportive care in wound care and fluid/electrolyte management",
    },
    {
      action: "In a severe cutaneous reaction, start intravenous methylprednisolone 1 to 2 mg/kg daily, and if there is no response consider intravenous immunoglobulin or ciclosporin",
      why: "MASCC gives the same steroid course at grades 3 and 4, moving to prednisone 0.5 to 1 mg/kg daily and tapering over at least 4 weeks once the reaction resolves. Its examples are immunoglobulin 1 g/kg/day for 3 days or ciclosporin 3 to 6 mg/kg/day.",
      source: "mascc-2020",
      quote: "If no response or resolution with systemic corticosteroids, consider intravenous immunoglobulin (IVIG) (e.g.. 1 gm/kg/day x 3 days) or cyclosporine (e.g. 3-6 mg/kg/day) with slow taper over 4-6 weeks after toxicity has resolved",
    },
    {
      action: "Expect erosive mucocutaneous disease, including the SJS/TEN-like form, to mean at least holding and often permanently stopping the checkpoint inhibitor",
      why: "The consensus describes skin pain and erosive plaques with a positive Nikolsky sign, coming on over at most two weeks in the SJS/TEN-like form, and says systemic immune suppression is often required. It defines the condition and leaves treatment decisions outside its scope.",
      source: "dirae-2024",
      quote: "This presentation, given its severity, usually necessitates at least holding of the ICI, and often permanent discontinuation of ICI therapy.",
    },
    {
      action: "For grade 3 itch, refer to dermatology and start oral prednisone 0.5 to 1 mg/kg/day tapered over 2 to 4 weeks, with a non-steroid drug such as gabapentin",
      why: "MASCC defines grade 3 itch as widespread and constant, limiting self-care or sleep. Its other examples are pregabalin, naltrexone, aprepitant and doxepin. It also says severe or unremitting itch should prompt a search for hidden bullous pemphigoid.",
      source: "mascc-2020",
      quote: "Initiate oral corticosteroids such as prednisone (or equivalent) 0.5-1 mg/kg/day tapered over 2-4 weeks",
    },
    {
      action: "Ask for a dermatology opinion if the rash does not respond to topical or oral steroids, is grade 3 or more, or is intolerable",
      why: "A specific diagnosis can often be treated in a targeted way.",
      source: "sitc-2021",
      quote: "If ICI-related rash does not respond to topical or oral corticosteroids, is grade ≥3, or is intolerable, a dermatological consultation is recommended.",
    },
    {
      action: "Because a grade 2 or higher rash or itch may return after a steroid taper, ask dermatology or use a steroid-sparing drug matched to the diagnosis",
      why: "SITC names rituximab for pemphigus or bullous pemphigoid, dupilumab for eczema, infliximab for lichenoid rash and omalizumab for urticaria or itch.",
      source: "sitc-2021",
      quote: "Grade ≥2 dermatological events (rash, pruritus) may recur after steroid taper. Therefore, a dermatological consultation or use of a steroid-sparing agent is recommended (rituximab for pemphigus",
      grade: "LE: 1 (rituximab for pemphigus, dupilumab, omalizumab); LE: 4 (rituximab for pemphigoid); no LE printed for infliximab",
    },
    {
      action: "If a rash does not respond to immune suppression, take cultures for infection",
      why: "SITC says a rash that is not responding should raise the possibility of an infection.",
      source: "sitc-2021",
      quote: "Rash that does not respond to immunosuppressive therapy should underscore the possibility of an infection and corresponding cultures should be obtained.",
    },
    {
      action: "After a grade 3 rash, weigh re-challenge against the risk of the reaction returning",
      why: "SITC says people who have had a grade 3 rash may be re-challenged, and its general rule is that the decision after any grade 3 or 4 reaction is risk-adjusted (LE: 3).",
      source: "sitc-2021",
      quote: "Patients who have experienced grade 3 ICI-related rash may be re-challenged with ICIs.",
    },
    {
      action: "After SJS, toxic epidermal necrolysis or DRESS, avoid re-challenge as a general rule",
      why: "MASCC says avoiding re-challenge is generally recommended, because a second reaction can be more severe or fatal. After DRESS it suggests considering continued monitoring for at least 6 months, since other organs can be affected later.",
      source: "mascc-2020",
      quote: "In a patient who has experienced a SCAR, such as SJS/TEN or DIHS/DRESS, it is generally recommended to avoid re-challenge with the offending drug since re-challenge can result in a SCAR of even higher severity or death.",
    },
  ],
  bestInClass: {
    statement: "No single guideline read covers the whole range. SITC 2021 is the most recent general guideline read in full: assess body surface area and special features, apply its general rules at grades 1 and 2, refer to dermatology for grade 3 or more or for treatment failure, biopsy blistering or mucosal rashes and interrupt the checkpoint inhibitor for them, and use dermatology or a steroid-sparing drug matched to the diagnosis because rashes may recur on taper (rituximab for pemphigus, LE: 1; dupilumab for eczema, LE: 1; omalizumab for urticaria or itch, LE: 1). It gives no steroid dose for the skin. MASCC 2020, older and ungraded, is the only source read that gives doses and stopping rules for severe reactions: 1 mg/kg daily for a grade 3 rash, 1 to 2 mg/kg daily of intravenous methylprednisolone for severe blistering and for SJS, TEN and DRESS, with permanent discontinuation and intensive care or burns unit admission at grade 4. The two grade a widespread rash differently (see the variants). The 2024 D-irAE consensus adds diagnostic definitions, including ICI-erosive mucocutaneous disease with an acute SJS/TEN-like subtype and an indolent erosive lichen planus-like subtype. The ASCO 2021 abstract gives general rules only, with their hedges (in general continue at grade 1, may suspend for most grade 2, grade 3 generally warrants suspension and high-dose steroids, in general stop for good at grade 4); its skin table, ESMO 2022 and the EADV 2022 position statement were not read.",
    sources: ["sitc-2021", "mascc-2020", "dirae-2024", "asco-2021", "esmo-2022"],
  },
  variants: [
    {
      name: "Consensus disease definitions for skin irAEs (D-irAE, 2024)",
      differs: "Defines 10 core dermatologic irAEs by a modified Delphi process among 34 experts, including ICI-erosive mucocutaneous disease with an acute SJS/TEN-like subtype (onset over at most 2 weeks without a preceding rash, erosive plaques, positive Nikolsky sign) and an indolent erosive lichen planus-like subtype. It notes that CTCAE can grade erosive or blistering reactions relatively low because little body surface is affected.",
      evidence: "Consensus definitions for diagnosis and research, not treatment recommendations; the paper says treatment of each subtype is beyond its scope.",
      sources: ["dirae-2024"],
    },
    {
      name: "MASCC 2020 grading of rash",
      differs: "MASCC counts a rash over more than 30% of body surface as grade 3 with or without symptoms, and also a grade 2 rash not responding to treatment; it adds a grade 4 (over 30% with symptoms and unresponsive, rapidly progressing or intolerable) for which the checkpoint inhibitor is discontinued and the patient admitted. CTCAE version 5.0, which SITC uses, has no grade 4 for maculopapular rash and makes over 30% with no more than mild symptoms grade 2.",
      evidence: "MASCC's own definitions, ungraded; its evidence is mainly observational reviews, consensus guidelines, case series and case reports.",
      sources: ["mascc-2020", "ctcae-v5"],
    },
  ],
  grades: [
    { claim: "High-potency topical steroids and GABA agonists for itch without rash", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Rituximab for pemphigus", grade: "LE: 1", source: "sitc-2021" },
    { claim: "Rituximab for bullous pemphigoid", grade: "LE: 4", source: "sitc-2021" },
    { claim: "Dupilumab for eczema; omalizumab for urticaria or itch", grade: "LE: 1", source: "sitc-2021" },
    { claim: "General rule: re-challenge after a grade 3 or 4 reaction is risk-adjusted", grade: "LE: 3", source: "sitc-2021", quote: "The decision to re-challenge a patient who has experienced grade 3 or 4 irAEs should be risk-adjusted based on anticipated benefit with therapy versus the potential for toxicity" },
    { claim: "General rule: grade 3 toxicities generally warrant suspension and high-dose corticosteroids", grade: "expert consensus", source: "asco-2021", quote: "Grade 3 toxicities generally warrant suspension of ICPis and the initiation of high-dose corticosteroids." },
    { claim: "General rule: in general, permanent discontinuation at grade 4", grade: "expert consensus", source: "asco-2021", quote: "In general, permanent discontinuation of ICPis is recommended with grade 4 toxicities, except for endocrinopathies that have been controlled by hormone replacement." },
  ],
  sources: [
    { ...SITC_ICI_2021, accessed: "2026-11-17" },
    { key: "mascc-2020", label: "Multinational Association of Supportive Care in Cancer (MASCC) 2020 clinical practice recommendations for the management of severe dermatological toxicities from checkpoint inhibitors", publisher: "MASCC, Supportive Care in Cancer", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8996262/", doi: "10.1007/s00520-020-05706-4", gradingScheme: "Recommendations are not graded. The paper says its evidence is mainly systematic reviews of observational data, consensus guidelines, case series and case reports, from a literature search to May 2019.", read: "full-text", accessed: "2026-11-17" },
    { key: "dirae-2024", label: "Defining D-irAEs: consensus-based disease definitions for the diagnosis of dermatologic adverse events from immune checkpoint inhibitor therapy", publisher: "Journal for ImmunoTherapy of Cancer (international expert panel)", year: 2024, url: "https://europepmc.org/article/PMC/PMC11015215", doi: "10.1136/jitc-2023-007675", gradingScheme: "Modified Delphi consensus by the RAND/UCLA Appropriateness Method: panellists rated each element of a definition from 1 to 9 and the paper prints the median and range. Definitions, not graded recommendations.", read: "full-text", accessed: "2026-11-17" },
    { key: "ctcae-v5", label: "Common Terminology Criteria for Adverse Events (CTCAE) version 5.0", publisher: "US National Cancer Institute, Cancer Therapy Evaluation Program", year: 2017, url: "https://dctd.cancer.gov/research/ctep-trials/trial-development", gradingScheme: "Not an evidence grade: a severity scale for each adverse event term, from grade 1 to grade 5 (death).", read: "full-text", accessed: "2026-11-17" },
    { key: "macmillan-pembrolizumab", label: "Pembrolizumab (patient information; reviewed 1 August 2026)", publisher: "Macmillan Cancer Support", year: 2026, url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/pembrolizumab", gradingScheme: "Patient information, not graded.", read: "full-text", accessed: "2026-11-17" },
    { ...ASCO_ICI_2021, accessed: "2026-11-17" },
    ESMO_ICI_2022,
  ],
  upgrades: [],
  gaps: [
    ESMO_GAP,
    ASCO_GAP,
    "No source read gives a steroid dose, a topical steroid potency or a body surface area rule for treating a grade 1 or grade 2 rash. SITC names high-potency topical steroids only for itch without rash and otherwise says topical or oral corticosteroids without a dose; MASCC 2020 starts at grade 3. Those steps are not written here. They are likely to be in the ASCO skin table and in ESMO 2022, which could not be read.",
    "MASCC 2020 was read on 17 November 2026 as the author manuscript held by PubMed Central, not the publisher's final version. Its recommendations are ungraded, its literature search ended in May 2019, its summary figure is an image and was not read, and its section on blistering gives management for grade 3 only. No newer MASCC edition was found in Europe PMC.",
    "SITC grades by CTCAE version 5.0 (2017) and does not print the definitions; the body surface area thresholds here were read from the National Cancer Institute's spreadsheet. The Institute has since published version 6.0 (2025), which rewrites the maculopapular rash scale (its grade 3 reads over 50% of body surface with moderate or severe symptoms, and it adds a grade 4). No guideline read here grades by version 6.0.",
    "The warning signs for patients follow Macmillan's pembrolizumab page, which is about one drug; no patient page covering every checkpoint inhibitor was read. No source read sets a time limit in hours for reporting a skin reaction: Macmillan says straight away for the serious symptoms and as soon as possible for any skin change.",
    "The European Academy of Dermatology and Venereology task force position statement on these reactions (2022, doi 10.1111/jdv.17855) could not be read: on 17 November 2026 the publisher's free PDF link refused a script. The 2024 Chinese expert consensus on checkpoint inhibitor skin reactions is listed in Europe PMC with an abstract only and its full text needs a subscription. Neither was used.",
    "The D-irAE consensus was read in full, but its supplementary tables, which hold the detailed criteria for each diagnosis, were not.",
  ],
  drugs: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "tremelimumab", "avelumab", "dostarlimab", "rituximab", "infliximab"],
  technologies: ["checkpoint-inhibitor"],
  institutions: ["sitc", "asco", "esmo", "mascc"],
  terms: ["irae"],
  related: ["irae-colitis", "checkpoint-inhibitor-baseline-and-monitoring"],
  tags: ["protocol", "irae", "dermatology"],
});
