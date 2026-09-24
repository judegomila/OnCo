import type { Answers, DecisionTool, ToolCard, ToolSource } from "@/lib/decision-tools";

/**
 * GALLBLADDER POLYP DECISION AID. Implements the 2022 joint guideline of ESGAR, EAES, EFISDS and ESGE (Foley et al.,
 * European Radiology 2022, doi 10.1007/s00330-021-08384-w), read in full from Europe PMC (PMC9038818) on
 * 24 September 2026. Every card quotes the recommendation it implements word for word, with the grade the authors
 * attached (strength, quality of evidence, percentage agreement). The eight recommendations, in the guideline's order:
 *
 *   1  ultrasound is the primary investigation
 *   2  cholecystectomy for polyps of 10 mm or more
 *   3  cholecystectomy suggested for symptomatic polyps with no other cause
 *   4  cholecystectomy for 6 to 9 mm polyps with a risk factor (age over 60, PSC, Asian ethnicity, sessile)
 *   5  follow-up ultrasound at 6 months, 1 year and 2 years for 6 to 9 mm without risk factors, or 5 mm or less with one
 *   6  no follow-up for 5 mm or less without risk factors
 *   7  growth: cholecystectomy at 10 mm; growth of 2 mm or more prompts a size-and-risk-factor review
 *   8  a polyp that disappears ends monitoring
 *
 * The risk factors are named exactly as the guideline names them ("Asian ethnicity"); the explanatory text records
 * that the group extended the earlier "Indian ethnicity" factor to all Asian populations on Babu et al.'s review.
 * Nothing here goes beyond the eight statements: the aid does not grade risk, and the multidisciplinary-team clauses
 * are quoted, not resolved.
 */
const asOf = "2026-09-24";

const FOLEY: ToolSource = { label: "Foley et al., Management and follow-up of gallbladder polyps: updated joint guidelines between the ESGAR, EAES, EFISDS and ESGE, European Radiology 2022", url: "https://doi.org/10.1007/s00330-021-08384-w" };
const FOLEY_PMC: ToolSource = { label: "Full text of the 2022 joint guideline on Europe PMC (PMC9038818)", url: "https://europepmc.org/article/PMC/PMC9038818" };

const q = (text: string, grade?: string) => ({ text, source: FOLEY, grade });

const LINKS = {
  polyp: { label: "Gallbladder polyp (glossary)", href: "/terms/gallbladder-polyp/" },
  cancer: { label: "Gallbladder cancer", href: "/cancers/gallbladder/" },
  chole: { label: "Simple cholecystectomy", href: "/terms/simple-cholecystectomy/" },
  psc: { label: "Carcinoma in situ and dysplasia (the PSC section)", href: "/cancers/gallbladder-carcinoma-in-situ-and-dysplasia/" },
  ultrasound: { label: "Ultrasound", href: "/technologies/ultrasound/" },
  screening: { label: "Screening and prevention on the cancer page", href: "/cancers/gallbladder/#overview" },
};

const cards: ToolCard[] = [
  { id: "gone", title: "The polyp is no longer seen: monitoring can stop", tone: "stop",
    quotes: [q("If during follow-up the gallbladder polypoid lesion disappears, then monitoring can be discontinued.", "Strong recommendation, moderate-quality evidence, 89% agreement")],
    meaning: "The guideline treats a polyp that has vanished on ultrasound as one that no longer needs watching; the authors note that ultrasound misses few real polyps, so a disappearance is trusted.",
    questions: ["Was the scan that showed no polyp done by the same method as the earlier ones?"],
    links: [LINKS.polyp, LINKS.ultrasound] },

  { id: "surgery-10mm", title: "10 mm or more: cholecystectomy is recommended", tone: "surgery",
    quotes: [q("Cholecystectomy is recommended in patients with polypoid lesions of the gallbladder measuring 10 mm or more, providing the patient is fit for, and accepts, surgery. Multidisciplinary discussion may be employed to assess perceived individual risk of malignancy.", "Strong recommendation, low-quality evidence, 100% agreement")],
    meaning: "At this size the guideline recommends removing the gallbladder, for anyone fit enough for the operation who wants it. The recommendation rests on low-quality evidence: the authors record that half of polyps in one national pathology series were 10 mm or larger and that the threshold sorts neoplastic from harmless polyps only moderately well.",
    questions: ["Is this a true polyp rather than a stone or a fold, and was the largest one measured?", "What does the team think the chance of cancer is in my case, and would they discuss it at a multidisciplinary meeting?", "What are the risks of the operation for me?"],
    links: [LINKS.chole, LINKS.polyp, LINKS.cancer] },

  { id: "reached-10", title: "It reached 10 mm during follow-up: cholecystectomy is advised", tone: "surgery",
    quotes: [q("If during follow-up the gallbladder polypoid lesion reaches 10 mm, then cholecystectomy is advised.", "Moderate strength recommendation, moderate-quality evidence, 78% agreement")],
    meaning: "Growth to 10 mm ends the watching period; the guideline's own evidence review adds that in the largest cohort, growth to 10 mm was not itself associated with a higher cancer rate, which is why this statement carries a moderate rather than strong grade.",
    links: [LINKS.chole, LINKS.polyp] },

  { id: "surgery-6-9-risk", title: "6 to 9 mm with a risk factor: cholecystectomy is recommended", tone: "surgery",
    quotes: [q("If the patient has a 6–9 mm polypoid lesion of the gallbladder and one or more risk factors for malignancy, cholecystectomy is recommended if the patient is fit for, and accepts, surgery. These risk factors are: Age more than 60 years; History of primary sclerosing cholangitis (PSC); Asian ethnicity; Sessile polypoid lesion (including focal gallbladder wall thickening > 4 mm).", "Strong recommendation, low–moderate quality evidence, 100% agreement")],
    meaning: "A mid-sized polyp plus any one of the four named factors puts you in the group the guideline says should be offered the operation. The factors are the guideline's, not OnCo's: the authors raised the age threshold to 60 on a 2016 systematic review and widened the ethnicity factor from Indian to Asian populations on a 2020 review.",
    questions: ["Which of the four risk factors applies to me, and how sure is the report that the polyp is sessile rather than adenomyomatosis?", "If I have only one factor, does the team still advise surgery, or would they discuss watching?"],
    links: [LINKS.chole, LINKS.polyp, LINKS.cancer] },

  { id: "follow-up", title: "Follow-up ultrasound at 6 months, 1 year and 2 years", tone: "watch",
    quotes: [q("If the patient has either: No risk factors for malignancy and a gallbladder polypoid lesion of 6–9 mm or Risk factors for malignancy and a gallbladder polypoid lesion 5 mm or less. Follow-up ultrasound of the gallbladder is recommended at 6 months, 1 year and 2 years. Follow-up should be discontinued after 2 years in the absence of growth.", "Moderate strength recommendation, moderate-quality evidence, 89% agreement")],
    meaning: "Three scans over two years, then stop if nothing has grown. The guideline adds that monitoring is meant for people who would be fit for surgery if the polyp changed.",
    questions: ["Will the same department measure the polyp each time, so growth of 2 mm can be judged?", "If nothing changes by two years, is that the end of scans?"],
    links: [LINKS.ultrasound, LINKS.polyp] },

  { id: "no-follow-up", title: "5 mm or less with no risk factor: no follow-up is required", tone: "stop",
    quotes: [q("If the patient has no risk factors for malignancy, and a gallbladder polypoid lesion of 5 mm or less, follow-up is not required.", "Strong recommendation, moderate-quality evidence, 100% agreement")],
    meaning: "The guideline says a tiny polyp with none of the four risk factors can be left alone. Its evidence review cites a cohort of more than 600,000 people in which the cancer rate was no higher in those with a polyp on the first scan than in those without, and estimates that tens of thousands of scans would be needed to find one cancer in this group.",
    questions: ["Has the report checked the four risk factors the guideline names, especially whether the polyp is sessile?"],
    links: [LINKS.polyp, LINKS.screening] },

  { id: "grew-2mm", title: "Grew by 2 mm or more: size and risk factors are reviewed together", tone: "discuss",
    quotes: [q("If the polypoid lesion grows by 2 mm or more within the 2-year follow-up period, then the current size of the polypoid lesion should be considered along with patient risk factors. Multidisciplinary discussion may be employed to decide whether continuation of monitoring, or cholecystectomy, is necessary.", "Moderate strength recommendation, moderate-quality evidence, 78% agreement")],
    meaning: "Growth of 2 mm does not by itself decide anything: the guideline asks the team to look at the polyp's present size and your risk factors, which is what the card below does, and allows a multidisciplinary meeting to settle it. Its evidence review notes that slow growth is part of the natural history of these polyps.",
    questions: ["Was the growth measured by the same method, and could it be measurement variation?", "Would the team take my case to a multidisciplinary meeting?"],
    links: [LINKS.polyp] },

  { id: "symptoms", title: "Symptoms that could come from the gallbladder: cholecystectomy is suggested", tone: "surgery",
    quotes: [q("Cholecystectomy is suggested if no alternative cause for the patient’s symptoms is demonstrated and the patient is fit for, and accepts, surgery. The patient should be counselled about the benefit of cholecystectomy versus the risk of persistent symptoms.", "Strong recommendation, low-quality evidence, 100% agreement")],
    meaning: "When pain or other symptoms seem to come from the gallbladder and nothing else explains them, the guideline suggests the operation whatever the polyp's size, with a warning: in one series cited, six in ten people still had pain afterwards. The polyp itself is unlikely to be the cause of pain.",
    questions: ["What else could be causing my symptoms, and has it been ruled out?", "How likely is it that my symptoms continue after the gallbladder is removed?"],
    links: [LINKS.chole] },

  { id: "ultrasound", title: "Ultrasound is the primary test", tone: "info",
    quotes: [q("Primary investigation of polypoid lesions of the gallbladder should be with abdominal ultrasound. Routine use of other imaging modalities is not recommended presently, but further research is needed. In centres with appropriate expertise and resources, alternative imaging modalities (such as contrast-enhanced and endoscopic ultrasound) may be useful to aid decision-making in difficult cases.", "Strong recommendation, low–moderate quality evidence, 100% agreement")],
    meaning: "The rules above are written for ordinary abdominal ultrasound. Where several polyps are present, the guideline says the largest is measured and decides management; contrast or endoscopic ultrasound is for expert centres in difficult cases.",
    links: [LINKS.ultrasound, LINKS.polyp] },
];

function decide(a: Answers): string[] {
  const risk = a.age === "gt60" || a.psc === "yes" || a.asian === "yes" || a.shape === "sessile";
  if (a.course === "gone") return ["gone", "ultrasound"];
  const out: string[] = [];
  if (a.course === "grew" && a.size !== "ge10") out.push("grew-2mm");
  if (a.size === "ge10") { out.push("surgery-10mm"); if (a.course !== "first") out.push("reached-10"); }
  else if (a.size === "6to9" && risk) out.push("surgery-6-9-risk");
  else if (a.size === "6to9") out.push("follow-up");
  else if (risk) out.push("follow-up");
  else out.push("no-follow-up");
  if (a.symptoms === "yes") out.push("symptoms");
  out.push("ultrasound");
  return out;
}

export const gallbladderPolypTool: DecisionTool = {
  id: "gallbladder-polyp",
  cancerId: "gallbladder",
  entityIds: ["gallbladder", "gallbladder-polyp", "gallbladder-carcinoma-in-situ-and-dysplasia", "gallbladder-papillary-carcinoma"],
  title: "Gallbladder polyp: what the European guideline says for your findings",
  short: "Polyp decision aid",
  lede: "Enter the polyp's size and shape, what earlier scans showed, and the risk factors the guideline names, and read the recommendation that applies, quoted word for word from the 2022 joint guideline of the European radiology, endoscopic surgery, digestive surgery and endoscopy societies. An educational aid to prepare for the conversation with your surgeon, not advice. Nothing you enter leaves this page.",
  icon: "polyp",
  guideline: FOLEY,
  sources: [FOLEY, FOLEY_PMC],
  asOf,
  inputs: [
    { id: "size", label: "Largest polyp on the latest ultrasound", hint: "The guideline measures the largest polyp when there are several.", icon: "ruler",
      options: [{ value: "le5", label: "5 mm or less" }, { value: "6to9", label: "6 to 9 mm" }, { value: "ge10", label: "10 mm or more" }] },
    { id: "course", label: "Compared with earlier scans", icon: "trend",
      options: [{ value: "first", label: "First scan, or no earlier measurement" }, { value: "stable", label: "No growth" }, { value: "grew", label: "Grew by 2 mm or more" }, { value: "gone", label: "No longer seen" }] },
    { id: "shape", label: "Shape on the report", hint: "Sessile means flat-based; the guideline counts focal wall thickening over 4 mm with it.", icon: "shape",
      options: [{ value: "pedunculated", label: "On a stalk (pedunculated)" }, { value: "sessile", label: "Sessile, or focal wall thickening over 4 mm" }, { value: "unknown", label: "Not described" }] },
    { id: "age", label: "Age", icon: "age",
      options: [{ value: "le60", label: "60 or under" }, { value: "gt60", label: "Over 60" }] },
    { id: "psc", label: "Primary sclerosing cholangitis", hint: "A chronic bile duct disease; the guideline lists it as a risk factor at any polyp size.", icon: "liver",
      options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
    { id: "asian", label: "Asian ethnicity (the guideline's wording)", hint: "The authors widened an earlier 'Indian ethnicity' factor to all Asian populations on a 2020 systematic review.", icon: "globe",
      options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
    { id: "symptoms", label: "Symptoms that could come from the gallbladder", hint: "Pain under the right ribs or after meals, with no other cause found.", icon: "pain",
      options: [{ value: "no", label: "No, or another cause was found" }, { value: "yes", label: "Yes, and no other cause found" }] },
  ],
  cards,
  decide,
  questions: [
    "Is the finding a true polyp, or could it be a stone, sludge or a fold? The guideline says a polyp does not move and casts no shadow on ultrasound.",
    "Which of the guideline's four risk factors apply to me, and do they change what you advise?",
    "If surgery is advised, would it be keyhole, and would the gallbladder be sent for full examination?",
  ],
  notes: [
    "The aid implements the eight statements of the 2022 European guideline and nothing else. Other bodies use other thresholds: the guideline itself notes that the American College of Radiology and the Canadian Association of Radiologists do not follow polyps under 7 mm.",
    "Every recommendation assumes the person is fit for, and accepts, surgery; the guideline says monitoring is for people who would be candidates for an operation if the polyp changed.",
    "The guideline's authors planned an update in or before 2025; check the linked page for a newer version.",
  ],
  links: [LINKS.polyp, LINKS.cancer, LINKS.chole, { label: "Incidental gallbladder cancer aid", href: "/tools/incidental-gallbladder-cancer/" }, { label: "Gallbladder cancer decisions", href: "/cancers/gallbladder/decisions/" }],
};
