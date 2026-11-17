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
 *
 * Second accuracy pass, 16 November 2026 (every source fetched again with curl and read as raw text):
 * - MASCC 2022: full text XML from Europe PMC (PMC9046338), tags stripped by script. Every quote, grade, dose and
 *   figure re-read against it. Reworded where the page said more than the source: the stent step claimed lower early
 *   death rates than surgery (one of two meta-analyses; the randomised one found no difference); "mouth care helps
 *   more", "cheaper", "for weeks" and "well enough to live for months" are not in the source and were removed; the
 *   population was narrowed to mechanical obstruction although MASCC covers functional obstruction as well.
 * - MASCC 2021 and the North American Delphi consensus: abstracts again from Europe PMC. The publisher's pages
 *   (link.springer.com) answered a script with a bot check, so both remain abstract only.
 * - WSES-PSOGI-SICO 2026 (World Journal of Emergency Surgery, 24 July 2026): now read in full from Europe PMC
 *   (PMC13718148) and added as a source, a variant and two graded statements. "evidence-infomed" in its title is the
 *   publisher's spelling.
 * - No newer MASCC edition was found in Europe PMC or in the Crossref records of the three DOIs.
 */
export const malignantBowelObstruction = protocol({
  id: "malignant-bowel-obstruction",
  name: "Malignant bowel obstruction in advanced cancer: medicines, decompression, stents, surgery and nutrition",
  aka: ["MBO", "bowel obstruction in advanced cancer", "inoperable bowel obstruction", "octreotide for bowel obstruction", "venting gastrostomy"],
  domain: "emergencies",
  tldr: "Advanced bowel, ovarian or other abdominal cancer can block the bowel. Cramping pain, a swollen tummy, being sick and not passing wind or stools need urgent assessment; a CT scan confirms it. Treatment depends on what you want from care and how well you are: some people have a stent or an operation, many have medicines for sickness and pain, sometimes with a tube to drain the stomach.",
  simple: "If you have cancer and get bad tummy cramps, a swollen tummy and keep being sick, ring your cancer team straight away or go to hospital.",
  summary: "MASCC 2022 is the most complete recent guideline: a systematic review to March 2021 producing 25 graded suggestions and recommendations (MASCC levels I to V and grades A to D). MBO is a clinical diagnosis confirmed by imaging; contrast CT is more valuable than plain X-ray. Decisions are framed by goals of care, prognosis, performance status and where care is given, and a surgical opinion should be considered at diagnosis.\n\nMedicines: a somatostatin analogue (octreotide, lanreotide) is the only recommendation at level I, grade A (to reduce vomiting); MASCC 2021 calls octreotide the drug of choice in managing MBO and recommends it in non-operable MBO. Haloperidol is suggested, particularly in complete obstruction (IV, B); metoclopramide or domperidone in partial obstruction, and they likely should be avoided in complete obstruction because of a potential increased risk of perforation (III, B); steroids for short-term benefit (III, B), the best dose is not established, dexamethasone 4 to 16 mg daily may be considered, and stopping should be considered if symptoms have not improved in 3 to 5 days; hyoscine butylbromide may be inferior to octreotide for vomiting (III, D) and may reduce abdominal pain (III, D); opioids are commonly used for pain although no study of them in MBO was found (V, D); oral osmotic laxatives should be considered in partial obstruction and avoided in complete obstruction (V, D).\n\nDecompression and procedures: nasogastric tube for temporary decompression (V, D); endoscopic or percutaneous venting gastrostomy (IV, B); self-expanding metal stents preferred for single-level large bowel obstruction without perforation (II, B); palliative surgery for multi-level obstruction may be considered in a highly selected population (IV, B), and because complications are common, less invasive operations should be considered (IV, B). For obstruction from peritoneal surface malignancy, WSES-PSOGI-SICO 2026 suggests an initial attempt at non-operative management when there is no perforation, ischaemia or shock, and bypass or a stoma in preference to resection when urgent surgery is needed (both weak, on low or very low certainty evidence). Nutrition: nil by mouth at first, then a slow, symptom-led reintroduction of a low-fibre diet (IV, B); parenteral hydration does not prevent or improve thirst or dry mouth (III, B) and should not be started routinely in the last days of life (III, B); home parenteral nutrition may help a very selected group (IV, D).",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "surgical-team", "multidisciplinary-team", "pharmacist"],
    where: ["emergency-department", "acute-oncology-service", "ward", "home"],
  },
  population: "Adults with advanced cancer, most often colorectal, ovarian or other intra-abdominal cancer, with obstruction of the small or large bowel, beyond the ligament of Treitz, caused by the cancer; MASCC covers mechanical blockage and functional obstruction (the bowel not moving because cancer has infiltrated its nerves or mesentery). MASCC excludes the use of stents as a bridge to curative surgery and anticancer treatment of the obstruction, and its search was restricted to adults. The WSES-PSOGI-SICO statements apply only to obstruction caused by peritoneal surface malignancy.",
  trigger: "Colicky abdominal pain, distension, nausea and vomiting, and absent or reduced passage of wind or stool in a person with advanced intra-abdominal cancer.",
  steps: [
    {
      action: "Confirm suspected bowel obstruction with contrast CT rather than a plain abdominal X-ray",
      why: "A plain X-ray is poor at showing the exact site, the cause or the complications of a blockage; CT is more precise.",
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
      action: "Consider asking for a surgical opinion at diagnosis",
      why: "A stent, a stoma or a bypass operation may be possible for a blockage at a single level, and a surgeon can say whether one is.",
      source: "mascc-2022",
      quote: "Obtaining a surgical opinion should be considered at the time of MBO diagnosis.",
    },
    {
      action: "Make the person nil by mouth at first, and give medicines subcutaneously or intravenously in complete obstruction",
      why: "Vomiting and a bowel that is not working stop medicines taken by mouth from being absorbed, and resting the gut is part of controlling sickness. MASCC grades nil by mouth at first level IV, grade B.",
      source: "mascc-2022",
      quote: "In complete MBO, medication should be administered intravenously or subcutaneously if available.",
    },
    {
      action: "Consider a somatostatin analogue such as octreotide to reduce vomiting",
      why: "It reduces the fluid the gut and pancreas produce, which builds up in the blocked bowel and adds to sickness.",
      source: "mascc-2022",
      quote: "Recommendation: Somatostatin analog (octreotide, lanreotide) may reduce vomiting in MBO (levels of evidence: I; grade A).",
      grade: "Level I; grade A",
    },
    {
      action: "Keep metoclopramide or domperidone for partial obstruction and avoid them in complete obstruction, where haloperidol is the suggested anti-sickness medicine",
      why: "These medicines make the stomach and gut push harder, which may raise the risk of perforation when the bowel is completely blocked. The grade shown is for this statement; haloperidol is suggested at level IV, grade B.",
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
      action: "Treat pain with opioids, considering the subcutaneous, intravenous or transdermal route; hyoscine butylbromide may be used for abdominal pain",
      why: "Pain affects 70 to 90% of people with obstruction, and tablets may not be swallowed or absorbed. MASCC found no study of opioids in bowel obstruction, and suggests hyoscine butylbromide for abdominal pain at level III, grade D.",
      source: "mascc-2022",
      quote: "Suggestion: Opioids are commonly used to treat pain associated with MBO, but there is no evidence to support their use (level of evidence: V; grade D).",
      grade: "Level V; grade D",
    },
    {
      action: "Use a nasogastric tube for temporary decompression; consider an endoscopic or percutaneous venting gastrostomy for longer-term decompression",
      why: "Draining the stomach may improve symptoms. A tube through the nose is not well tolerated for long, and a gastrostomy is a more permanent drain. MASCC grades the nasogastric tube level V, grade D; the grade shown is for the gastrostomy.",
      source: "mascc-2022",
      quote: "Suggestion: Endoscopic or percutaneous gastrostomy tube may be used for gastric decompression in MBO (level of evidence: IV; grade B evidence).",
      grade: "Level IV; grade B",
    },
    {
      action: "For a single blockage of the large bowel without perforation, prefer a self-expanding metal stent where technically feasible",
      why: "A stent can reopen the bowel without an operation. One pooled analysis found fewer deaths within 30 days than after emergency surgery; another, of randomised trials only, found no difference in deaths and a shorter hospital stay. The blockage returns more often after a stent.",
      source: "mascc-2022",
      quote: "Self-expanding metallic stents are the preferred alternative for the management of single-level large bowel obstruction when technically feasible and in the absence of colonic perforation (level of evidence: II; grade: B).",
      grade: "Level II; grade B",
    },
    {
      action: "Keep palliative surgery for multi-level obstruction for highly selected people, and consider the less invasive operations",
      why: "In the studies MASCC reviewed, complications followed 22 to 87% of operations, and the bowel blocked again in 10 to 63% where this was reported.",
      source: "mascc-2022",
      quote: "Patients with advanced cancer that undergo palliative surgery for MBO are at high risk of surgical complications, and less invasive surgical interventions should be considered (level of evidence: IV; grade: B).",
      grade: "Level IV; grade B",
    },
    {
      action: "Do not start intravenous or subcutaneous fluids routinely in the last days of life",
      why: "Fluids by drip do not prevent or ease thirst or a dry mouth, and too much can cause swelling and fluid on the lungs.",
      source: "mascc-2022",
      quote: "Parenteral hydration should not be initiated routinely in the last days of life (level of evidence: III; grade: B).",
      grade: "Level III; grade B",
    },
  ],
  bestInClass: {
    statement: "MASCC 2022 is the most recent graded, multidisciplinary guideline that could be read in full; its strongest recommendation is a somatostatin analogue to reduce vomiting (level I, grade A), consistent with the MASCC 2021 medical update, which calls octreotide the drug of choice in managing MBO and recommends it in non-operable MBO. Its next strongest is self-expanding metal stents for single-level large bowel obstruction (II, B). Almost everything else (haloperidol, steroids, venting gastrostomy, limits on surgery and on parenteral hydration) rests on level III to V evidence. The North American Delphi consensus (Annals of Surgical Oncology, October 2026) is newer, with 49 statements on assessment, medical, surgical and palliative management, but was read only as an abstract, so where it differs from MASCC is not known. WSES-PSOGI-SICO 2026 (search to June 2025) covers only obstruction from peritoneal surface malignancy, in five statements that are all weak suggestions on low or very low certainty evidence.",
    sources: ["mascc-2022", "mascc-2021", "delphi-2026", "wses-2026"],
  },
  variants: [
    {
      name: "Hyoscine butylbromide instead of octreotide as the antisecretory",
      differs: "Uses hyoscine butylbromide, which MASCC 2022 says is commonly recommended for inoperable obstruction on scarce evidence, as the first drug to reduce secretions and vomiting.",
      evidence: "MASCC 2022 suggests it may be inferior to octreotide for vomiting (III, D); MASCC 2021 found it inferior to octreotide at the doses compared.",
      sources: ["mascc-2022", "mascc-2021"],
    },
    {
      name: "Home parenteral nutrition for selected people",
      differs: "Feeds intravenously at home, through a central line, for someone with inoperable obstruction. MASCC 2022 lists possible signs of benefit: a slow-growing or chemotherapy-sensitive cancer, ECOG performance status below 2, and no fluid retention, anaemia or low albumin.",
      evidence: "MASCC 2022: may help quality of life in a very selected group (IV, D); central access preferred (III, B); stop, or do not start, at the end of life (V, D).",
      sources: ["mascc-2022"],
    },
    {
      name: "Obstruction from peritoneal surface malignancy: the WSES-PSOGI-SICO 2026 emergency statements",
      differs: "For obstruction caused by cancer on the peritoneum: CT with intravenous contrast as the first cross-sectional imaging; an initial attempt at non-operative medical management unless there is perforation, ischaemia or shock; after that fails, surgery for people with good performance status and reasonable life expectancy, and endoscopic treatment for those with poor performance status or limited life expectancy; bypass or a stoma in preference to resection when urgent surgery is needed. The panel adds, as an operational rule and not a graded statement, that non-operative management should be limited to 72 hours with explicit failure criteria.",
      evidence: "Five statements, each a weak suggestion on low or very low certainty evidence rated with GRADE (moderate only for length of stay in statement 3.2), each with 100% agreement of the voting panel. Corticosteroids were not graded separately. MASCC 2022, for all advanced cancer, prefers a stent for single-level large bowel obstruction (II, B) and keeps surgery for selected people.",
      sources: ["wses-2026", "mascc-2022"],
    },
  ],
  grades: [
    { claim: "Somatostatin analogue to reduce vomiting", grade: "Level I; grade A", source: "mascc-2022" },
    { claim: "Octreotide in non-operable MBO", grade: "recommendation (MASCC level and category not given in the abstract)", source: "mascc-2021", quote: "The panel recommends octreotide in non-operable MBO." },
    { claim: "Haloperidol, particularly in complete MBO", grade: "Level IV; grade B", source: "mascc-2022", quote: "Suggestion: Haloperidol, a butyrophenone antipsychotic, may be an effective anti-emetic in MBO, particularly for complete MBO (level of evidence: IV; grade: B)," },
    { claim: "Nasogastric tube for temporary decompression", grade: "Level V; grade D", source: "mascc-2022", quote: "Suggestion: Nasogastric tube may be used for temporary decompression in acute MBO (level of evidence: V; grade: D)." },
    { claim: "Self-expanding metal stent for single-level large bowel obstruction", grade: "Level II; grade B", source: "mascc-2022" },
    { claim: "Nil by mouth, then slow symptom-led reintroduction of diet", grade: "Level IV; grade B", source: "mascc-2022" },
    { claim: "Hyoscine butylbromide to reduce abdominal pain", grade: "Level III; grade D", source: "mascc-2022", quote: "Suggestion: The benefit of anticholinergics (hyoscine butylbromide) may be effective to reduce abdominal pain in MBO (level of evidence: III; grade: D)." },
    { claim: "Initial attempt at non-operative medical management in obstruction from peritoneal surface malignancy, without urgent surgical indications", grade: "LoE: Low/Very low, SoR: Weak in favor", source: "wses-2026", quote: "In patients with MBO due to PSM, and in the absence of urgent surgical indications (perforation, ischemia, shock), we suggest an initial attempt at nonoperative medical management, as it seems to be feasible and not associated with an increased risk of complications." },
    { claim: "Bypass or ostomy over resection when urgent surgery is needed in peritoneal surface malignancy", grade: "LoE: Very low, SoR: Weak", source: "wses-2026", quote: "In patients with MBO due to PSM who require urgent surgical intervention (and are not in the terminal phase of disease), as well as in patients undergoing urgent surgery for bowel obstruction in whom peritoneal disease is unexpectedly found, we suggest preferring bypass or ostomy over resection, when technically feasible, given a signal toward lower perioperative mortality." },
  ],
  sources: [
    { key: "mascc-2022", label: "MASCC multidisciplinary evidence-based recommendations for the management of malignant bowel obstruction in advanced cancer", publisher: "MASCC, Supportive Care in Cancer", year: 2022, url: "https://europepmc.org/article/PMC/PMC9046338", doi: "10.1007/s00520-022-06889-8", gradingScheme: "MASCC 2018 policy: level of evidence I (meta-analysis or high-powered randomised trials) to V (case reports), and grade A (type I evidence or consistent findings) to D (little or no systematic evidence). 'Recommendation' is kept for statements on level I or II evidence and 'Suggestion' for those on level III to V; each is printed with its level and grade.", read: "full-text", accessed: "2026-11-16" },
    { key: "mascc-2021", label: "Medical management of malignant bowel obstruction in patients with advanced cancer: 2021 MASCC guideline update", publisher: "MASCC, Supportive Care in Cancer", year: 2021, url: "https://europepmc.org/abstract/MED/34390398", doi: "10.1007/s00520-021-06438-9", gradingScheme: "MASCC levels and categories of evidence; only randomised trials were admitted. The abstract does not print the grade for each recommendation.", read: "abstract", accessed: "2026-11-16" },
    { key: "delphi-2026", label: "Recommendations for the Multimodal Management of Malignant Bowel Obstructions: Results of a North American Multidisciplinary Delphi Consensus", publisher: "Annals of Surgical Oncology", year: 2026, url: "https://europepmc.org/abstract/MED/42926303", doi: "10.1245/s10434-026-20614-3", gradingScheme: "Modified Delphi consensus with an 80% agreement threshold; statements are not graded in the abstract.", read: "abstract", accessed: "2026-11-16" },
    { key: "wses-2026", label: "WSES-PSOGI-SICO evidence-infomed guidelines on surgical emergencies in patients with peritoneal surface malignancies: a systematic review, meta-analysis, and structured expert consensus", publisher: "World Society of Emergency Surgery, Peritoneal Surface Oncology Group International and Italian Society of Surgical Oncology; World Journal of Emergency Surgery", year: 2026, url: "https://europepmc.org/article/PMC/PMC13718148", doi: "10.1186/s13017-026-00718-7", gradingScheme: "Each statement prints a level of evidence (LoE), the certainty rated with GRADE from very low to moderate, a strength of recommendation (SoR, here always weak) and the panel's level of agreement.", read: "full-text", accessed: "2026-11-16" },
  ],
  upgrades: [],
  gaps: [
    "The North American Delphi consensus (October 2026) was read only as its abstract: its 49 statements on steroid timing, surgery contraindications, gastrostomy and fluids at the end of life are not compared with MASCC here. On 16 November 2026 the publisher's page again refused a script with a bot check, and Europe PMC lists no open copy.",
    "The MASCC 2021 update was read only as its abstract, for the same reason on 16 November 2026, so the level and category it gives octreotide are not shown.",
    "The WSES-PSOGI-SICO 2026 guidelines were read in full on 16 November 2026. Their five statements cover only obstruction from peritoneal surface malignancy, all are weak, and they do not grade any individual medicine.",
    "MASCC 2022 says the best dose of corticosteroid is not well established, and gives no dose for octreotide, haloperidol, metoclopramide or hyoscine butylbromide in its recommendations; this page gives none either.",
    "No source read here says how quickly a person with these symptoms should be seen; the advice on this page to seek help straight away is general safety advice, not a quoted recommendation.",
    "Only one MASCC 2022 item (somatostatin analogues for vomiting) rests on level I evidence; most of the rest are suggestions on level III to V evidence.",
    "The Cochrane review MASCC 2022 cites, of 43 mostly retrospective studies with 4,265 participants in advanced gynaecological or colorectal cancer, could not conclude whether surgery helps, and MASCC found no randomised trial published after it.",
    "No UK national guideline on malignant bowel obstruction was read.",
  ],
  drugs: ["octreotide-lanreotide", "dexamethasone", "haloperidol", "metoclopramide", "hyoscine"],
  technologies: ["enteral-parenteral-nutrition", "palliative-care", "ct", "self-expanding-metal-stents"],
  cancers: ["colorectal", "ovarian"],
  institutions: ["mascc"],
  terms: ["colorectal-palliation-obstruction-pain", "feeding-tube"],
  tags: ["protocol", "acute-oncology", "oncological-emergency", "palliative"],
});
