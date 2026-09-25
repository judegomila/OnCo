import { gallbladderPolypTool } from "@/data/decision-tools/gallbladder-polyp";
import { incidentalGallbladderCancerTool } from "@/data/decision-tools/incidental-gallbladder-cancer";
import { tnbcAfterChemotherapyTool } from "@/data/decision-tools/tnbc-after-chemotherapy";
import { pancreaticFirstTreatmentTool } from "@/data/decision-tools/pancreatic-first-treatment";
import { colorectalAdjuvantChemotherapyTool } from "@/data/decision-tools/colorectal-adjuvant-chemotherapy";
import { lungEarlyStageTool } from "@/data/decision-tools/lung-early-stage";
import { prostateLocalisedTool } from "@/data/decision-tools/prostate-localised";
import { breastSurgeryChoiceTool } from "@/data/decision-tools/breast-surgery-choice";
import { bccLowRiskTreatmentTool } from "@/data/decision-tools/bcc-low-risk-treatment";

/**
 * Decision aids (/tools/<id>/): a handful of questions, and for the answers given, the guideline statement that
 * applies, quoted word for word with the page it was read from. Each tool is data: its inputs, every card it can
 * show (each card carries one or more verbatim quotes with an https source), and a small pure function that maps
 * a complete set of answers to the cards in order. Nothing is inferred beyond that mapping; where a guideline is
 * silent the card says so and points at the multidisciplinary team.
 *
 * Tools are written in src/data/decision-tools/<id>.ts and registered in DECISION_TOOLS. The page renders any
 * registered tool; the cancer, subtype and term pages named in `entityIds` show a pill to it; the sitemap and the
 * mobile audit pick the routes up from here. Tests (src/lib/decision-tools.test.ts) walk every combination of
 * answers and check that every quote has an https URL and every card is reachable.
 */

export type ToolSource = { label: string; url: string };

/** A verbatim statement, with where it was read and (for guidelines) the grade the authors attached to it. */
export type ToolQuote = { text: string; source: ToolSource; grade?: string };

export type ToolOption = { value: string; label: string; hint?: string };

export type ToolIcon = "ruler" | "trend" | "shape" | "age" | "liver" | "globe" | "pain" | "layers" | "margin" | "vessel" | "bag" | "scalpel" | "watch" | "stop" | "talk" | "refer" | "info" | "scan" | "clock" | "flag" | "compass" | "polyp" | "question";

export type ToolInput = { id: string; label: string; hint?: string; icon: ToolIcon; options: ToolOption[] };

/** The colour and glyph of a card: what kind of statement it is. */
export type ToolTone = "surgery" | "watch" | "stop" | "discuss" | "refer" | "info";

export type ToolLink = { label: string; href: string };

export type ToolCard = {
  id: string;
  title: string;
  tone: ToolTone;
  /** The statements this card implements, word for word. At least one. */
  quotes: ToolQuote[];
  /** One plain line: what the statement means for the reader. */
  meaning: string;
  /** Questions this card adds to the list for the surgeon. */
  questions?: string[];
  /** Pages on OnCo that explain the words in the card. */
  links?: ToolLink[];
};

export type Answers = Record<string, string>;

export type DecisionTool = {
  id: string;
  cancerId: string;
  /** Records whose pages show a pill to this tool: the cancer, its subtypes, the terms it decides about. */
  entityIds: string[];
  title: string;
  /** For pills and the tools index. */
  short: string;
  lede: string;
  icon: ToolIcon;
  /** The guideline or consensus the tool implements. */
  guideline: ToolSource;
  /** Every source quoted anywhere in the tool, for the sources line. */
  sources: ToolSource[];
  inputs: ToolInput[];
  cards: ToolCard[];
  /** Card ids to show for a complete set of answers; the first is the headline. Pure. */
  decide: (a: Answers) => string[];
  /** Questions worth asking whatever the answers. */
  questions: string[];
  /** Caveats shown under every result. */
  notes: string[];
  links: ToolLink[];
  asOf: string;
};

export const DECISION_TOOLS: DecisionTool[] = [gallbladderPolypTool, incidentalGallbladderCancerTool, tnbcAfterChemotherapyTool, pancreaticFirstTreatmentTool, colorectalAdjuvantChemotherapyTool, lungEarlyStageTool, prostateLocalisedTool, breastSurgeryChoiceTool, bccLowRiskTreatmentTool];

export const toolRoute = (id: string) => `/tools/${id}/`;

export function toolById(id: string): DecisionTool | undefined {
  return DECISION_TOOLS.find((t) => t.id === id);
}

/** Tools that name this record (cancer, subtype or term) among the pages they belong to. */
export function toolsFor(entityId: string): DecisionTool[] {
  return DECISION_TOOLS.filter((t) => t.entityIds.includes(entityId));
}

export function toolCard(tool: DecisionTool, id: string): ToolCard | undefined {
  return tool.cards.find((c) => c.id === id);
}

export function isComplete(tool: DecisionTool, a: Answers): boolean {
  return tool.inputs.every((i) => i.options.some((o) => o.value === a[i.id]));
}

/** Every complete set of answers, for tests and for the printed algorithm. */
export function enumerateAnswers(tool: DecisionTool): Answers[] {
  let out: Answers[] = [{}];
  for (const i of tool.inputs) out = out.flatMap((a) => i.options.map((o) => ({ ...a, [i.id]: o.value })));
  return out;
}

/** Every https URL a tool cites, deduplicated. */
export function toolUrls(tool: DecisionTool): string[] {
  const urls = new Set<string>();
  urls.add(tool.guideline.url);
  for (const s of tool.sources) urls.add(s.url);
  for (const c of tool.cards) for (const q of c.quotes) urls.add(q.source.url);
  return [...urls];
}

export const TONE_LABEL: Record<ToolTone, string> = {
  surgery: "Operation recommended",
  watch: "Follow-up scans",
  stop: "No follow-up needed",
  discuss: "For discussion",
  refer: "Specialist referral",
  info: "Context",
};

export const TONE_ICON: Record<ToolTone, ToolIcon> = { surgery: "scalpel", watch: "watch", stop: "stop", discuss: "talk", refer: "refer", info: "info" };

/** Light-theme card and pill classes for each tone (accent pink for the operative decisions). */
export const TONE_CLASS: Record<ToolTone, { card: string; pill: string }> = {
  surgery: { card: "border-accent/40 bg-accent-soft/40", pill: "bg-accent-soft text-accent border-accent/40" },
  watch: { card: "border-amber-200 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20", pill: "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-900" },
  stop: { card: "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20", pill: "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-900" },
  discuss: { card: "border-sky-200 bg-sky-50/60 dark:border-sky-900 dark:bg-sky-950/20", pill: "bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-900" },
  refer: { card: "border-violet-200 bg-violet-50/60 dark:border-violet-900 dark:bg-violet-950/20", pill: "bg-violet-100 text-violet-900 border-violet-200 dark:bg-violet-900/40 dark:text-violet-100 dark:border-violet-900" },
  info: { card: "border-border bg-card", pill: "bg-foreground/5 text-muted border-border" },
};
