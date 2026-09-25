import { graph } from "./graph";
import type { Company, CompanyType, FundingRound, Stage } from "./schema";

/**
 * The startup and investor layer of the company graph.
 *
 * Companies carry `stage`, `ycBatch`, `investors` and `funding`; investors are companies with
 * `companyType: "investor"`. Everything an investor page shows (its portfolio, how active it is) is derived
 * here from the backlinks, so a funding relationship is declared once, on the startup.
 */

export const COMPANY_TYPE_LABEL: Record<CompanyType, string> = {
  pharma: "Large pharma", biotech: "Biotech", diagnostics: "Diagnostics", imaging: "Imaging equipment", devices: "Devices & RT hardware",
  "ai-software": "AI & software", radiopharma: "Radiopharmaceuticals", "cell-therapy": "Cell therapy", "cro-services": "Services", nonprofit: "Nonprofit", investor: "Investor",
  "cooperative-group": "Cooperative group",
};

/** One-line tooltip for the company types that need one on a record page; the others read plainly from the label. */
export const COMPANY_TYPE_TIP: Partial<Record<CompanyType, string>> = {
  "cooperative-group": "An academic clinical trials group or public trial sponsor: it designs and runs trials of other makers' products, often the phase 3 trials that set the standard of care, and has no products of its own.",
  investor: "A venture fund, corporate venture arm or disease foundation that finances companies; its portfolio is derived from the companies that name it.",
};

/** Glyph paths (24 by 24, 2 px stroke) for the company types shown as a pill on the record page. Three linked people for a cooperative group. */
export const COMPANY_TYPE_GLYPH: Partial<Record<CompanyType, string>> = {
  "cooperative-group": "M12 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M19 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M12 7v4m0 0l-5 4m5-4l5 4M7.5 17.5h9",
};

/** The /companies/ browser filtered to one type, the facet value being the label. */
export const companyTypeHref = (t: CompanyType) => `/companies/?type=${encodeURIComponent(COMPANY_TYPE_LABEL[t])}`;

export const STAGE_ORDER: readonly Stage[] = ["startup", "growth", "public", "private-large", "acquired", "defunct"];

export const STAGE_LABEL: Record<Stage, string> = {
  startup: "Startup", growth: "Growth stage", public: "Public", "private-large": "Large private", acquired: "Acquired", defunct: "Wound down",
};

export const STAGE_TIP: Record<Stage, string> = {
  startup: "Venture-backed and early: seed to Series B, or a Y Combinator company that has not yet raised a large round.",
  growth: "Later-stage private company: Series C or beyond, or a crossover round ahead of a listing.",
  public: "Listed on a stock exchange.",
  "private-large": "Large privately held or family-owned company.",
  acquired: "Bought by another company; the record stays so the history is traceable.",
  defunct: "No longer operating, or inactive according to its accelerator or last public filing.",
};

/** Stage as recorded, else derived: a company with a ticker is public. */
export function stageOf(c: Company): Stage | undefined {
  return c.stage ?? (c.ticker ? "public" : undefined);
}

const BATCH_SEASON: Record<string, string> = { W: "Winter", S: "Summer", X: "Spring", F: "Fall" };

/** "W21" -> "Winter 2021". Unknown shapes are returned unchanged. */
export function ycBatchLabel(batch: string): string {
  const m = /^([WSXF])(\d{2})$/.exec(batch);
  if (!m) return batch;
  return `${BATCH_SEASON[m[1]]} 20${m[2]}`;
}

/** Year of a YC batch code, for sorting. */
export function ycBatchYear(batch: string): number {
  const m = /^[WSXF](\d{2})$/.exec(batch);
  return m ? 2000 + Number(m[1]) : 0;
}

/** Sort key: year, then Winter, Spring, Summer, Fall within a year. */
export function ycBatchSortKey(batch: string): number {
  const order: Record<string, number> = { W: 0, X: 1, S: 2, F: 3 };
  return ycBatchYear(batch) * 10 + (order[batch[0]] ?? 9);
}

/** Companies that name `investorId` in their `investors` field, alphabetically. */
export function portfolioOf(investorId: string): Company[] {
  const g = graph();
  return (g.incoming(investorId).get("company") ?? []).filter((c): c is Company => c.kind === "company" && c.investors.includes(investorId));
}

/**
 * True when the company belongs on the startups page: an early or growth-stage private company, a Y Combinator
 * company, or any venture-backed company with recorded investors or rounds (including ones that have since
 * listed, been bought or wound down). Large pharma and investors themselves are excluded.
 */
export function isStartup(c: Company): boolean {
  if (c.companyType === "investor" || c.companyType === "pharma") return false;
  const s = stageOf(c);
  if (s === "startup" || s === "growth") return true;
  if (c.ycBatch) return true;
  if (s === "private-large") return false;
  return c.investors.length > 0 || c.funding.length > 0;
}

export function startups(): Company[] {
  return graph().kind("company").filter(isStartup);
}

export function investors(): Company[] {
  return graph().kind("company").filter((c) => c.companyType === "investor");
}

export function ycCompanies(): Company[] {
  return graph().kind("company").filter((c) => !!c.ycBatch).sort((a, b) => ycBatchSortKey(b.ycBatch!) - ycBatchSortKey(a.ycBatch!) || a.name.localeCompare(b.name));
}

/** Investors ranked by the number of OnCo companies that name them. */
export function mostActiveInvestors(): Array<{ investor: Company; portfolio: Company[] }> {
  return investors()
    .map((investor) => ({ investor, portfolio: portfolioOf(investor.id) }))
    .filter((x) => x.portfolio.length > 0)
    .sort((a, b) => b.portfolio.length - a.portfolio.length || a.investor.name.localeCompare(b.investor.name));
}

/** Every sourced financing round in the corpus, newest first. Acquisitions are recorded as rounds for traceability but are not money raised, so they are left out here. */
export function recentlyFunded(limit = 30): Array<{ company: Company; round: FundingRound }> {
  const rows: Array<{ company: Company; round: FundingRound }> = [];
  for (const c of graph().kind("company")) for (const round of c.funding) if (!/^acquisition$/i.test(round.round)) rows.push({ company: c, round });
  rows.sort((a, b) => b.round.year - a.round.year || (b.round.amountUsd ?? 0) - (a.round.amountUsd ?? 0) || a.company.name.localeCompare(b.company.name));
  return rows.slice(0, limit);
}

/** "$120M", "$1.2B"; undefined when the source gave no figure. */
export function fmtUsd(n?: number): string | undefined {
  if (n === undefined) return undefined;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1)}B`;
  if (n >= 1e6) return `$${Math.round(n / 1e6)}M`;
  return `$${Math.round(n / 1e3)}K`;
}

/** The most recent round, for a "latest round" column. */
export function latestRound(c: Company): FundingRound | undefined {
  return [...c.funding].sort((a, b) => b.year - a.year)[0];
}
