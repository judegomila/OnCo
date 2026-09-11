import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor, type Company } from "@/lib/schema";
import { Section } from "./ui";
import { StageIcon } from "./StageIcon";
import { fmtUsd, portfolioOf, STAGE_LABEL, STAGE_TIP, stageOf, ycBatchLabel } from "@/lib/startups";
import { Tip } from "./Tip";

/**
 * Server-rendered panels for the startup layer of company pages. Each returns null when there is nothing to
 * show, so EntityDetail can drop them in unconditionally.
 */

/** Stage chip with an icon and a hover explanation. */
export function StageChip({ company, className = "" }: { company: Company; className?: string }) {
  const s = stageOf(company);
  if (!s) return null;
  return (
    <Tip text={STAGE_TIP[s]}>
      <span className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-medium ${className}`}>
        <StageIcon stage={s} className="h-3.5 w-3.5 text-accent" />{STAGE_LABEL[s]}
      </span>
    </Tip>
  );
}

/** Company pages: sourced financing rounds and the investors behind them. */
export function FundingPanel({ id }: { id: string }) {
  const g = graph();
  const c = g.get(id);
  if (!c || c.kind !== "company") return null;
  const rounds = [...c.funding].sort((a, b) => b.year - a.year);
  const investors = c.investors.map((i) => g.get(i)).filter((x): x is Company => !!x && x.kind === "company");
  const acquirer = c.acquiredBy ? g.get(c.acquiredBy) : undefined;
  if (!rounds.length && !investors.length && !c.ycBatch && !acquirer) return null;
  return (
    <Section title="Funding" aside={<Link href="/startups/" className="text-sm underline text-muted">All startups</Link>}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-4 text-sm space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <StageChip company={c} />
            {c.ycBatch && <Link href={`/startups/?yc=${encodeURIComponent(c.ycBatch)}`} className="inline-flex items-center rounded-full bg-accent-soft text-accent px-2.5 py-0.5 text-xs font-medium hover:underline" title={`Y Combinator, ${ycBatchLabel(c.ycBatch)} batch`}>YC {c.ycBatch}</Link>}
            {acquirer && <span className="text-xs text-muted">Acquired by <Link href={routeFor(acquirer)} className="underline">{acquirer.name}</Link></span>}
          </div>
          {investors.length > 0 && (
            <div>
              <div className="kicker mb-1">Investors</div>
              <div className="flex flex-wrap gap-1.5">{investors.map((i) => <Link key={i.id} href={routeFor(i)} className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs hover:underline" title={i.tldr}>{i.name}</Link>)}</div>
            </div>
          )}
          {!investors.length && rounds.length > 0 && <p className="text-xs text-muted">Investors not recorded; see the round sources.</p>}
        </div>
        {rounds.length > 0 && (
          <div className="card p-4 text-sm">
            <div className="kicker mb-2">Rounds on record</div>
            <div className="overflow-x-auto">
            <table className="onco text-sm">
              <thead><tr><th>Round</th><th>Year</th><th className="text-right">Amount</th><th>Source</th></tr></thead>
              <tbody>{rounds.map((r, i) => (
                <tr key={i}>
                  <td>{r.round}{r.note && <span className="text-muted"> · {r.note}</span>}</td>
                  <td className="tabular-nums">{r.year}</td>
                  <td className="tabular-nums text-right">{fmtUsd(r.amountUsd) ?? <span className="text-muted">undisclosed</span>}</td>
                  <td><a href={r.source} rel="noopener" className="underline text-muted">{new URL(r.source).hostname.replace(/^www\./, "")}</a></td>
                </tr>
              ))}</tbody>
            </table>
            </div>
            <p className="text-xs text-muted mt-2">Amounts only where the cited source states them. Rounds without a public source are not listed.</p>
          </div>
        )}
      </div>
    </Section>
  );
}

/** Investor pages: the companies in OnCo that name this investor, derived from backlinks. */
export function PortfolioPanel({ id }: { id: string }) {
  const g = graph();
  const inv = g.get(id);
  if (!inv || inv.kind !== "company" || inv.companyType !== "investor") return null;
  const portfolio = portfolioOf(id);
  return (
    <Section title={`Portfolio in OnCo (${portfolio.length})`} aside={<Link href={`/startups/?investor=${encodeURIComponent(inv.name)}`} className="text-sm underline text-muted">Filter the startups table</Link>}>
      {portfolio.length === 0 ? (
        <p className="text-sm text-muted">No OnCo company names this investor yet. Portfolio links are declared on the startup record (`investors`), so adding one there lists it here.</p>
      ) : (
        <div className="overflow-x-auto card">
          <table className="onco text-sm">
            <thead><tr><th>Company</th><th>Stage</th><th className="hidden sm:table-cell">Type</th><th className="hidden md:table-cell">Cancers</th><th className="hidden lg:table-cell">Latest round</th></tr></thead>
            <tbody>{portfolio.map((c) => {
              const latest = [...c.funding].sort((a, b) => b.year - a.year)[0];
              return (
                <tr key={c.id}>
                  <td><Link href={routeFor(c)} className="font-medium hover:underline">{c.name}</Link><div className="text-xs text-muted">{c.hq}, {c.country}{c.ycBatch ? ` · YC ${c.ycBatch}` : ""}</div></td>
                  <td><StageChip company={c} /></td>
                  <td className="hidden sm:table-cell capitalize">{c.companyType.replace("-", " ")}</td>
                  <td className="hidden md:table-cell text-xs">{c.cancers.map((id) => g.get(id)).filter((x) => !!x).map((x) => <Link key={x.id} href={routeFor(x)} className="underline mr-2">{x.name}</Link>)}</td>
                  <td className="hidden lg:table-cell text-xs tabular-nums">{latest ? `${latest.round} ${latest.year}${fmtUsd(latest.amountUsd) ? `, ${fmtUsd(latest.amountUsd)}` : ""}` : <span className="text-muted">none on record</span>}</td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
