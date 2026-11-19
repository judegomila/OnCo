/**
 * Does a trial's wording still agree with a new status?
 *
 * src/data/trial-status-text.test.ts forbids a status chip that contradicts the words beside it: on 19 October 2026,
 * 104 TL;DRs said "now recruiting" on trials the registry had closed. The merge in src/lib/registry-status.ts rewrites
 * the stock phrase at the end of an ingested trial's TL;DR when the status changes. It does not reach three other
 * places: a TL;DR that ends in a different stock phrase, the plain-language sentence (src/data/simple), and the
 * Chinese TL;DR (src/data/i18n/zh.ts). Those are sentences in data files, and rewriting a sentence is not a mechanical
 * update.
 *
 * So the weekly re-check asks, for every status change the generator proposes, whether the words would contradict the
 * new chip. Where they would, the change is held back (the page keeps saying what it said, consistently) and the trial
 * is listed for a person or an agent to rewrite the sentences and the status together.
 *
 * The patterns are that test's own, copied; scripts/recheck/status-words.test.ts fails if the two drift apart.
 */
export const LIFECYCLE = ["recruiting", "active", "planned", "completed", "withdrawn"] as const;
export type Lifecycle = (typeof LIFECYCLE)[number];
export type Rules = Array<[RegExp, Lifecycle]>;

export const TLDR_END: Rules = [
  [/(?:, |reports that it is )now recruiting\.$|reports that it is recruiting\.$|the registry reported that it is recruiting\.$/, "recruiting"],
  [/(?:, |reports that it is )not yet recruiting\.$/, "planned"],
  [/, active and no longer recruiting\.$/, "active"],
  [/, now completed\.$/, "completed"],
  [/, (?:stopped early|withdrawn before enrolling anyone)\.$/, "withdrawn"],
];
export const SIMPLE_END: Rules = [
  [/(?:,? and (?:it|the trial) is (?:now |still )?recruiting(?: now)?|; it is still recruiting)\.$/, "recruiting"],
  [/(?:,? and (?:it|the trial|the study) is (?:still )?(?:active|running) but no longer recruiting|,? and (?:it|the trial) is no longer recruiting|, no longer recruiting)\.$/, "active"],
  [/,? and it has completed\.$/, "completed"],
  [/,? and it was (?:stopped early|withdrawn before anyone joined)\.$/, "withdrawn"],
];
export const ZH_END: Rules = [
  [/，正在招募。$/, "recruiting"],
  [/，尚未开始招募。$/, "planned"],
  [/，已停止招募。$/, "active"],
  [/，已完成。$/, "completed"],
  [/，(?:已提前终止|已撤回，未入组任何患者)。$/, "withdrawn"],
];

export const said = (text: string | undefined, rules: Rules): Lifecycle | undefined => rules.find(([re]) => re.test((text ?? "").trim()))?.[1];

/** True when the words are compatible with the chip. A result status allows only words for a finished trial. */
export function agrees(words: Lifecycle, status: string | undefined): boolean {
  if (!status) return true;
  if ((LIFECYCLE as readonly string[]).includes(status)) return words === status;
  return words === "completed" || words === "withdrawn" || words === "active";
}

export type Contradiction = { where: "TL;DR" | "plain-language sentence" | "Chinese TL;DR"; says: Lifecycle; ending: string };

/** The places where a trial's words would say a different lifecycle from `status`. `tldr` is the TL;DR as the merge would leave it. */
export function contradictions(status: string, words: { tldr?: string; simple?: string; zh?: string }): Contradiction[] {
  const out: Contradiction[] = [];
  const check = (where: Contradiction["where"], text: string | undefined, rules: Rules) => {
    const w = said(text, rules);
    if (w && !agrees(w, status)) out.push({ where, says: w, ending: (text ?? "").trim().slice(-60) });
  };
  check("TL;DR", words.tldr, TLDR_END);
  check("plain-language sentence", words.simple, SIMPLE_END);
  check("Chinese TL;DR", words.zh, ZH_END);
  return out;
}
