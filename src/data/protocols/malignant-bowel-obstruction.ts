import { protocol } from "./helpers";

/*
 * Malignant bowel obstruction (MBO) in advanced cancer: diagnosis, goals of care, medicines, decompression, stents and
 * surgery, and nutrition and hydration.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - MASCC multidisciplinary evidence-based recommendations (Supportive Care in Cancer 2022): open access, full text
 *   from Europe PMC (PMC9046338). Systematic review to March 2021; 25 suggestions and recommendations.
 * - MASCC 2021 update on medical management of nausea and vomiting in MBO: abstract from Europe PMC.
 * - North American multidisciplinary Delphi consensus (Annals of Surgical Oncology, October 2026): abstract only;
 *   its 49 statements were not read.
 * - WSES-PSOGI-SICO 2026 guidelines on surgical emergencies in peritoneal surface malignancy were found (open access)
 *   but not read for this protocol.
 * Every DOI was resolved through Crossref and its title checked. Quotes checked by script against the raw text.
 */
export const malignantBowelObstruction = protocol({
  id: "malignant-bowel-obstruction",
  name: "Malignant bowel obstruction in advanced cancer: medicines, decompression, stents, surgery and nutrition",
  aka: ["MBO", "bowel obstruction in advanced cancer", "inoperable bowel obstruction", "octreotide for bowel obstruction", "venting gastrostomy"],
  domain: "emergencies",
  tldr: "Advanced bowel, ovarian or other abdominal cancer can block the bowel. Cramping pain, a swollen tummy, being sick and not passing wind or stools need urgent assessment; a CT scan confirms it. Treatment depends on what you want from care and how well you are: some people have a stent or an operation, many have medicines for sickness and pain, sometimes with a tube to drain the stomach.",
  simple: "If you have cancer and get bad tummy cramps, a swollen tummy and keep being sick, ring your cancer team or go to hospital the same day.",
  summary: "MASCC 2022 is the most complete recent guideline: a systematic review to March 2021 producing 25 graded suggestions and recommendations (MASCC levels I to V and grades A to D). MBO is a clinical diagnosis confirmed by contrast CT, which is more valuable than plain X-ray. Decisions are framed by goals of care, prognosis, performance status and where care is given, and a surgical opinion should be considered at diagnosis.\n\nMedicines: a somatostatin analogue (octreotide, lanreotide) is the only recommendation at level I, grade A (to reduce vomiting); MASCC 2021 calls octreotide the drug of choice in non-operable MBO. Haloperidol is suggested, particularly in complete obstruction (IV, B); metoclopramide or domperidone in partial obstruction only, avoided in complete obstruction because of perforation risk (III, B); steroids for short-term benefit (III, B), dexamethasone 4 to 16 mg daily, with discontinuation considered after 3 to 5 days without benefit; hyoscine butylbromide is probably inferior to octreotide for vomiting (III, D); opioids are standard for pain without trial evidence (V, D); osmotic laxatives only in partial obstruction.\n\nDecompression and procedures: nasogastric tube for temporary decompression (V, D); endoscopic or percutaneous venting gastrostomy (IV, B); self-expanding metal stents preferred for single-level large bowel obstruction without perforation (II, B); palliative surgery for multi-level obstruction only in highly selected people (IV, B), given high complication rates. Nutrition: nil by mouth at first, then a slow, symptom-led reintroduction of a low-fibre diet (IV, B); parenteral hydration does not relieve thirst or dry mouth and is not started routinely in the last days of life (III, B); home parenteral nutrition only for a very selected group (IV, D).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "surgical-team", "multidisciplinary-team", "pharmacist"],
    where: ["emergency-department", "acute-oncology-service", "ward", "home"],
  },
  population: "Adults with advanced cancer, most often colorectal, ovarian or other intra-abdominal cancer, with mechanical obstruction of the small or large bowel by the cancer. MASCC excludes the use of stents as a bridge to curative surgery. Children are not covered.",
  trigger: "Colicky abdominal pain, distension, nausea and vomiting, and absent or reduced passage of wind or stool in a person with advanced intra-abdominal cancer.",
  steps: [
    {
      action: "Confirm suspected bowel obstruction with contrast CT rather than a plain abdominal X-ray",
      why: "CT shows where and why the bowel is blocked, and whether there is a complication such as perforation.",
      source: "mascc-2022",
      quote: "Contrast computed tomography (CT) is more valuable as it provides diagnostic precision [4].",
    },
    {
      action: "Before offering any intervention, discuss goals of care, and weigh prognosis, performance status, other illnesses and where care will be given",
      why: "The choices range from surgery to comfort care, and the right one depends on what the person wants and how well they are.",
      source: "mascc-2022",
      quote: "Before offering interventions for MBO management, clinicians should take into consideration the risks associated with the interventions in addition to the patient’s estimated prognosis, performance status, comorbidities, location of care and ease of further assessment and support (e.g., home parenteral nutrition programs may not be universally available).",
    },
    {
      action: "Ask for a surgical opinion at diagnosis",
      why: "A stent, stoma or bypass may be possible and should be considered early, before the person becomes too unwell.",
      source: "mascc-2022",
      quote: "Obtaining a surgical opinion should be considered at the time of MBO diagnosis.",
    },
    {
      action: "Make the person nil by mouth at first, and give medicines subcutaneously or intravenously in complete obstruction",
      why: "Food and tablets cannot pass a complete blockage and make vomiting worse.",
      source: "mascc-2022",
      quote: "In complete MBO, medication should be administered intravenously or subcutaneously if available.",
    },
    {
      action: "Give a somatostatin analogue such as octreotide to reduce vomiting",
      why: "It reduces the fluid the gut produces, which is what fills the blocked bowel and causes vomiting.",
      source: "mascc-2022",
      quote: "Recommendation: Somatostatin analog (octreotide, lanreotide) may reduce vomiting in MBO (levels of evidence: I; grade A).",
      grade: "Level I; grade A",
    },
    {
      action: "For nausea, use haloperidol, particularly in complete obstruction; use metoclopramide only in partial obstruction",
      why: "Metoclopramide pushes the bowel to contract and may risk perforation when it is completely blocked.",
      source: "mascc-2022",
      quote: "Due to the potential increased risk of bowel perforation, it likely should be avoided in complete MBO.",
      grade: "Level III; grade B",
    },
    {
      action: "Consider a short course of dexamethasone (4 to 16 mg daily), and consider stopping it if there is no improvement within 3 to 5 days",
      why: "Steroids may reduce swelling of the bowel wall and help the obstruction settle, but the evidence is limited.",
      source: "mascc-2022",
      quote: "Suggestion: The use of steroids may help with the acute symptoms of MBO and can be used for short-term benefit (level of evidence: III; grade: B).",
      grade: "Level III; grade B",
    },
    {
      action: "Treat pain with parenteral or transdermal opioids, and use hyoscine butylbromide for colic",
      why: "Most people with obstruction have pain, and tablets may not be absorbed.",
      source: "mascc-2022",
      quote: "Suggestion: Opioids are commonly used to treat pain associated with MBO, but there is no evidence to support their use (level of evidence: V; grade D).",
      grade: "Level V; grade D",
    },
    {
      action: "Use a nasogastric tube for temporary decompression; consider an endoscopic or percutaneous venting gastrostomy for longer-term decompression",
      why: "Draining the stomach relieves vomiting; a gastrostomy avoids a tube in the nose for weeks.",
      source: "mascc-2022",
      quote: "Suggestion: Endoscopic or percutaneous gastrostomy tube may be used for gastric decompression in MBO (level of evidence: IV; grade B evidence).",
      grade: "Level IV; grade B",
    },
    {
      action: "For a single blockage of the large bowel without perforation, prefer a self-expanding metal stent where technically feasible",
      why: "A stent can reopen the bowel without an operation, with lower early death rates than emergency surgery.",
      source: "mascc-2022",
      quote: "Self-expanding metallic stents are the preferred alternative for the management of single-level large bowel obstruction when technically feasible and in the absence of colonic perforation (level of evidence: II; grade: B).",
      grade: "Level II; grade B",
    },
    {
      action: "Keep palliative surgery for highly selected people, preferring the least invasive operation",
      why: "Surgery for obstruction in advanced cancer has high complication and re-obstruction rates.",
      source: "mascc-2022",
      quote: "Patients with advanced cancer that undergo palliative surgery for MBO are at high risk of surgical complications, and less invasive surgical interventions should be considered (level of evidence: IV; grade: B).",
      grade: "Level IV; grade B",
    },
    {
      action: "Do not start intravenous or subcutaneous fluids routinely in the last days of life",
      why: "Drip fluids do not ease thirst or a dry mouth at this stage and can cause swelling and breathlessness; mouth care helps more.",
      source: "mascc-2022",
      quote: "Parenteral hydration should not be initiated routinely in the last days of life (level of evidence: III; grade: B).",
      grade: "Level III; grade B",
    },
  ],
  bestInClass: {
    statement: "MASCC 2022 is the most recent graded, multidisciplinary guideline that could be read in full; its strongest recommendation is a somatostatin analogue to reduce vomiting (level I, grade A), consistent with the MASCC 2021 medical update, which calls octreotide the drug of choice in non-operable MBO. Its next strongest is self-expanding metal stents for single-level large bowel obstruction (II, B). Almost everything else (haloperidol, steroids, venting gastrostomy, limits on surgery and on parenteral hydration) rests on level III to V evidence. The North American Delphi consensus (Annals of Surgical Oncology, October 2026) is newer, with 49 statements on assessment, medical, surgical and palliative management, but was read only as an abstract, so where it differs from MASCC is not known.",
    sources: ["mascc-2022", "mascc-2021", "delphi-2026"],
  },
  variants: [
    {
      name: "Hyoscine butylbromide instead of octreotide as the antisecretory",
      differs: "Uses hyoscine butylbromide, cheaper and widely available, as the first drug to reduce secretions and vomiting.",
      evidence: "MASCC 2022 suggests it may be inferior to octreotide for vomiting (III, D); MASCC 2021 found it inferior to octreotide at the doses compared.",
      sources: ["mascc-2022", "mascc-2021"],
    },
    {
      name: "Home parenteral nutrition for selected people",
      differs: "Feeds intravenously at home, through a central line, for someone with inoperable obstruction who is otherwise well enough to live for months.",
      evidence: "MASCC 2022: may help quality of life in a very selected group (IV, D); central access preferred (III, B); stop, or do not start, at the end of life (V, D).",
      sources: ["mascc-2022"],
    },
  ],
  grades: [
    { claim: "Somatostatin analogue to reduce vomiting", grade: "Level I; grade A", source: "mascc-2022" },
    { claim: "Octreotide in non-operable MBO", grade: "recommendation (MASCC level and category not given in the abstract)", source: "mascc-2021", quote: "The panel recommends octreotide in non-operable MBO." },
    { claim: "Haloperidol, particularly in complete MBO", grade: "Level IV; grade B", source: "mascc-2022", quote: "Suggestion: Haloperidol, a butyrophenone antipsychotic, may be an effective anti-emetic in MBO, particularly for complete MBO (level of evidence: IV; grade: B)," },
    { claim: "Nasogastric tube for temporary decompression", grade: "Level V; grade D", source: "mascc-2022", quote: "Suggestion: Nasogastric tube may be used for temporary decompression in acute MBO (level of evidence: V; grade: D)." },
    { claim: "Self-expanding metal stent for single-level large bowel obstruction", grade: "Level II; grade B", source: "mascc-2022" },
    { claim: "Nil by mouth, then slow symptom-led reintroduction of diet", grade: "Level IV; grade B", source: "mascc-2022" },
  ],
  sources: [
    { key: "mascc-2022", label: "MASCC multidisciplinary evidence-based recommendations for the management of malignant bowel obstruction in advanced cancer", publisher: "MASCC, Supportive Care in Cancer", year: 2022, url: "https://europepmc.org/article/PMC/PMC9046338", doi: "10.1007/s00520-022-06889-8", gradingScheme: "MASCC 2018 policy: level of evidence I (meta-analysis or high-powered randomised trials) to V (case reports), and grade A (type I evidence or consistent findings) to D (little or no systematic evidence). Each item is printed as a 'Recommendation' or a 'Suggestion' with its level and grade.", read: "full-text", accessed: "2026-11-11" },
    { key: "mascc-2021", label: "Medical management of malignant bowel obstruction in patients with advanced cancer: 2021 MASCC guideline update", publisher: "MASCC, Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34390398", doi: "10.1007/s00520-021-06438-9", gradingScheme: "MASCC levels and categories of evidence; only randomised trials were admitted. The abstract does not print the grade for each recommendation.", read: "abstract", accessed: "2026-11-11" },
    { key: "delphi-2026", label: "Recommendations for the Multimodal Management of Malignant Bowel Obstructions: Results of a North American Multidisciplinary Delphi Consensus", publisher: "Annals of Surgical Oncology", year: 2026, url: "https://europepmc.org/abstract/MED/42926303", doi: "10.1245/s10434-026-20614-3", gradingScheme: "Modified Delphi consensus with an 80% agreement threshold; statements are not graded in the abstract.", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: [],
  gaps: [
    "The North American Delphi consensus (October 2026) was read only as its abstract: its 49 statements on steroid timing, surgery contraindications, gastrostomy and fluids at the end of life are not compared with MASCC here.",
    "The WSES-PSOGI-SICO 2026 guidelines on surgical emergencies in peritoneal surface malignancy were found but not read.",
    "Only one MASCC 2022 item (somatostatin analogues for vomiting) rests on level I evidence; most of the rest are suggestions on level III to V evidence.",
    "No randomised trial has shown that surgery helps people with malignant bowel obstruction from gynaecological or colorectal cancer; a Cochrane review of 43 mostly retrospective studies could not conclude.",
    "No UK national guideline on malignant bowel obstruction was read.",
  ],
  drugs: ["octreotide-lanreotide", "dexamethasone", "haloperidol", "metoclopramide", "hyoscine"],
  technologies: ["enteral-parenteral-nutrition", "palliative-care", "ct", "self-expanding-metal-stents"],
  cancers: ["colorectal", "ovarian"],
  institutions: ["mascc"],
  terms: ["colorectal-palliation-obstruction-pain", "feeding-tube"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "palliative"],
});
