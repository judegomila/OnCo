import type { Cancer } from "./schema";
import { graph } from "./graph";
import { questions as handwritten, type Question } from "@/data/questions";

/**
 * Questions to ask your oncologist. Hand-written sets win; every cancer also gets a generic
 * set generated from its own standard-of-care settings, biomarkers, pipeline, and open problems.
 */
export function generateQuestions(c: Cancer): Question[] {
  const g = graph();
  const out: Question[] = [];

  out.push({ setting: "Newly diagnosed", question: "What is my exact diagnosis, stage, and grade, and which tests established them?", why: "Everything else follows from an accurate stage and subtype." });
  if (c.biomarkers.length) {
    const named = c.biomarkers.slice(0, 5).map((b) => b.replace(/\s*\(.*?\)\s*/g, "").trim()).join(", ");
    out.push({ setting: "Newly diagnosed", question: `Which biomarkers have been tested on my tumour (for example ${named}), and what were the results?`, why: "These results decide eligibility for targeted therapy, immunotherapy, and trials." });
  }
  if (c.subtypes.length) {
    out.push({ setting: "Newly diagnosed", question: "Which subtype is my cancer, and does that change the recommended treatment?", why: `Recognised subtypes for this cancer include ${c.subtypes.slice(0, 3).map((s) => s.replace(/\s*\(.*?\)\s*/g, "").trim()).join(", ")}.` });
  }
  out.push({ setting: "Newly diagnosed", question: "Is germline (inherited) genetic testing recommended for me or my family?", why: "Inherited variants can change treatment and matter for relatives." });

  for (const row of c.standardOfCare) {
    const drugs = row.refs.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e && e.kind === "drug").map((e) => e.name);
    const trials = row.refs.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e && e.kind === "trial").map((e) => e.name);
    out.push({ setting: row.setting, question: `For my situation (${row.setting.toLowerCase()}), which of the standard options do you recommend and why?`, why: `Guideline options include: ${row.approach}` });
    if (drugs.length) out.push({ setting: row.setting, question: `Am I a candidate for ${drugs.slice(0, 3).join(", ")}${drugs.length > 3 ? " or related drugs" : ""}, and what side effects should I expect?`, why: "Knowing the expected toxicities helps you plan work, family, and supportive care." });
    if (trials.length) out.push({ setting: row.setting, question: `How do the results of ${trials.slice(0, 2).join(" and ")} apply to someone like me?`, why: "Trial populations differ from individual patients; ask how closely you match." });
  }

  if (c.pipeline.length) {
    const names = c.pipeline.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e).slice(0, 4).map((e) => e.name);
    out.push({ setting: "Any stage", question: `Are there clinical trials I could join, for example of ${names.join(", ")}?`, why: "Trials are how the next standard of care is set; asking early keeps options open." });
  }
  out.push({ setting: "Any stage", question: "Would a second opinion at a high-volume centre change anything, and can you help arrange it?", why: "Rare or high-stakes decisions benefit from a centre that treats many similar patients." });
  out.push({ setting: "Any stage", question: "What supportive care (symptom control, nutrition, exercise, mental health, financial help) is available from the start?", why: "Supportive care improves quality of life and helps patients complete treatment." });
  for (const p of c.openProblems.slice(0, 2)) {
    out.push({ setting: "Any stage", question: `I read that “${p.replace(/\.$/, "")}”. How does that affect my plan?`, why: "Open problems are where trials and second opinions matter most." });
  }
  return out;
}

export function questionsFor(c: Cancer): { source: "handwritten" | "generated"; items: Question[] } {
  const hand = handwritten[c.id];
  if (hand && hand.length) return { source: "handwritten", items: hand };
  return { source: "generated", items: generateQuestions(c) };
}
