import Link from "next/link";
import type { Protocol, ProtocolSource } from "@/lib/schema";
import { PROTOCOL_ACTOR_LABEL, PROTOCOL_DOMAIN_LABEL, PROTOCOL_PLACE_LABEL, routeFor, type ProtocolDomain } from "@/lib/kinds";
import { graph } from "@/lib/graph";
import type { ProtocolMember } from "@/lib/members";
import { KindIcon } from "./KindIcon";
import { TL } from "./T";

/**
 * A care protocol's page body (docs/PROTOCOLS.md) and the list other record pages borrow. Server-rendered: the steps
 * are an ordered list, so the browser numbers them and no "step 3 of 9" label sits over them
 * (docs/INFORMATION-ARCHITECTURE.md, item 4). Each step carries its reason and the source it was read from, with the
 * grade quoted as the source prints it.
 */

const pill = "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-sm hover:border-accent hover:bg-accent-soft";

export const protocolDomainHref = (d: ProtocolDomain) => `/protocols/?domain=${encodeURIComponent(PROTOCOL_DOMAIN_LABEL[d])}`;

function Kicker({ text }: { text: string }) { return <div className="kicker mb-2"><TL text={text} /></div>; }

const sourceOf = (p: Protocol, key?: string): ProtocolSource | undefined => (key ? p.sources.find((s) => s.key === key) : undefined);
/** "ESMO 2015": how a step names its source in one glance; the full entry is in the Sources list. */
const shortSource = (s: ProtocolSource) => `${s.publisher} ${s.year}`;

/** Domain, who and where as filter links into /protocols/, then who it applies to and when it starts. */
function SettingStrip({ p }: { p: Protocol }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2" aria-label="Domain, who carries it out and where">
        <Link href={protocolDomainHref(p.domain)} className={pill}><KindIcon kind="protocol" className="h-4 w-4 shrink-0 text-accent" /><span>{PROTOCOL_DOMAIN_LABEL[p.domain]}</span></Link>
        {p.setting.who.map((w) => <Link key={w} href={`/protocols/?who=${encodeURIComponent(PROTOCOL_ACTOR_LABEL[w])}`} className={pill}>{PROTOCOL_ACTOR_LABEL[w]}</Link>)}
        {p.setting.where.map((w) => <Link key={w} href={`/protocols/?where=${encodeURIComponent(PROTOCOL_PLACE_LABEL[w])}`} className={`${pill} text-muted`}>{PROTOCOL_PLACE_LABEL[w]}</Link>)}
      </div>
      <dl className="grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-[max-content_1fr]">
        <dt className="text-muted"><TL text="Who it applies to" /></dt><dd lang="en">{p.population}</dd>
        {p.trigger && <><dt className="text-muted"><TL text="When to start" /></dt><dd lang="en">{p.trigger}</dd></>}
      </dl>
    </div>
  );
}

/** The steps, numbered by the list itself; each with why, its source and grade, and the source's own words where quoted. */
export function ProtocolSteps({ p }: { p: Protocol }) {
  return (
    <section id="steps" className="scroll-mt-28">
      <h2 className="text-lg font-semibold tracking-tight mb-3"><TL text="Steps" /></h2>
      <ol className="space-y-4 list-decimal ps-6 marker:font-semibold marker:text-accent" lang="en">
        {p.steps.map((s, i) => {
          const src = sourceOf(p, s.source);
          return (
            <li key={i} className="ps-1">
              <div className="text-[15px] font-medium leading-relaxed">{s.action}</div>
              {s.why && <p className="text-sm text-foreground/80 mt-1"><span className="text-muted">Why: </span>{s.why}</p>}
              {s.quote && <blockquote className="mt-1.5 border-s-2 border-accent/40 ps-3 text-sm text-muted">“{s.quote}”</blockquote>}
              <p className="text-xs text-muted mt-1">
                {src ? <a className="underline" href={src.url} rel="noopener" title={src.label}>{shortSource(src)}</a> : <span title={s.practice}>Common practice: {s.practice}</span>}
                {s.grade && <> · <span className="chip bg-foreground/5" title={src?.gradingScheme ?? "Grade as the source prints it"}>{s.grade}</span></>}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** The overview body: setting strip and the steps. */
export function ProtocolOverview({ p }: { p: Protocol }) {
  return (
    <div className="mt-8 space-y-8">
      <SettingStrip p={p} />
      <ProtocolSteps p={p} />
      <p className="text-xs text-muted max-w-3xl">How care is usually carried out, read from the guidelines and standards cited. Your own team&apos;s protocol and their judgement come first; this page is for understanding it, not for doing it yourself.</p>
    </div>
  );
}

/** Best in class beside the variants in use, and the proposals that would change the protocol. */
export function ProtocolBestInClass({ p }: { p: Protocol }) {
  const g = graph();
  const cite = (keys: string[]) => keys.map((k) => sourceOf(p, k)).filter((s): s is ProtocolSource => !!s);
  const upgrades = p.upgrades.map((id) => g.get(id)).filter((x) => !!x);
  return (
    <div className="space-y-8" lang="en">
      <section className="card p-4 bg-accent-soft/60 border-accent/20">
        <Kicker text="Best supported now" />
        <p className="text-[15px] leading-relaxed max-w-3xl">{p.bestInClass.statement}</p>
        <p className="text-xs text-muted mt-2">{cite(p.bestInClass.sources).map((s, i) => <span key={s.key}>{i > 0 && " · "}<a className="underline" href={s.url} rel="noopener" title={s.label}>{shortSource(s)}</a></span>)}</p>
      </section>
      {p.variants.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold tracking-tight mb-3"><TL text="Variants in use" /></h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {p.variants.map((v, i) => (
              <li key={i} className="card p-4 min-w-0">
                <div className="font-medium">{v.name}</div>
                <p className="text-[15px] mt-1"><span className="text-muted">Where it differs: </span>{v.differs}</p>
                <p className="text-sm text-foreground/80 mt-1"><span className="text-muted">Evidence: </span>{v.evidence}</p>
                {v.sources.length > 0 && <p className="text-xs text-muted mt-2">{cite(v.sources).map((s, j) => <span key={s.key}>{j > 0 && " · "}<a className="underline" href={s.url} rel="noopener" title={s.label}>{shortSource(s)}</a></span>)}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
      {upgrades.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold tracking-tight mb-3"><TL text="Proposals to change it" /></h2>
          <ul className="space-y-2">{upgrades.map((u) => <li key={u!.id}><Link className="font-medium hover:underline" href={routeFor(u!)}>{u!.name}</Link><p className="text-sm text-muted">{u!.tldr}</p></li>)}</ul>
        </section>
      )}
    </div>
  );
}

/** The grades table, what the sources leave open, and every source with its year, link and how much of it was read. */
export function ProtocolEvidence({ p }: { p: Protocol }) {
  const READ: Record<ProtocolSource["read"], string> = { "full-text": "Full text read", abstract: "Abstract only", "public-summary": "Public summary only", "not-reachable": "Could not be read" };
  return (
    <div className="space-y-8" lang="en">
      {p.grades.length > 0 && (
        <section id="grades" className="scroll-mt-28">
          <h2 className="text-lg font-semibold tracking-tight mb-3"><TL text="Grades" /></h2>
          <div className="overflow-x-auto"><table className="onco">
            <thead><tr><th>Recommendation</th><th>Grade, as printed</th><th>Source</th></tr></thead>
            <tbody>{p.grades.map((r, i) => { const s = sourceOf(p, r.source); return (
              <tr key={i}><td>{r.claim}{r.quote && <div className="text-xs text-muted mt-1">“{r.quote}”</div>}</td><td className="whitespace-nowrap" title={s?.gradingScheme}>{r.grade}</td><td>{s ? <a className="underline" href={s.url} rel="noopener" title={s.label}>{shortSource(s)}</a> : r.source}</td></tr>
            ); })}</tbody>
          </table></div>
        </section>
      )}
      {p.gaps.length > 0 && (
        <section id="gaps" className="scroll-mt-28">
          <h2 className="text-lg font-semibold tracking-tight mb-3"><TL text="What the sources do not settle" /></h2>
          <ul className="list-disc ps-5 space-y-1 text-[15px]">{p.gaps.map((x, i) => <li key={i}>{x}</li>)}</ul>
        </section>
      )}
      <section id="protocol-sources" className="scroll-mt-28">
        <h2 className="text-lg font-semibold tracking-tight mb-3"><TL text="Guidelines and standards" /></h2>
        <ol className="space-y-3">
          {p.sources.map((s) => (
            <li key={s.key} id={`source-${s.key}`} className="text-sm">
              <a className="font-medium underline" href={s.url} rel="noopener">{s.label}</a>
              <div className="text-muted">{s.publisher}, {s.year}{s.doi && <> · DOI <a className="underline" href={`https://doi.org/${s.doi}`} rel="noopener">{s.doi}</a></>} · <span className={s.read === "not-reachable" ? "text-amber-700 dark:text-amber-300" : undefined}>{READ[s.read]}</span>, {s.accessed}</div>
              {s.gradingScheme && <div className="text-xs text-muted mt-0.5">Grading: {s.gradingScheme}</div>}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

/**
 * The protocols another record page lists (src/lib/members.ts `protocolsFor`): grouped by domain, each a link with
 * its TL;DR. On a cancer page the protocols reached through a treatment the record lists follow, one line per
 * treatment with its protocols as plain links: once the fill rounds took the corpus to 190 protocols the prostate
 * page reached 58, and a card with a TL;DR for each put its treatment section at 140 KB of markup against a 120 KB
 * line (src/lib/record-sections.test.ts). The ones naming the cancer keep their cards.
 */
export function ProtocolList({ members }: { members: ProtocolMember[] }) {
  if (!members.length) return null;
  const named = members.filter((m) => !m.via);
  const domains = [...new Set(named.map((m) => m.protocol.domain))];
  const byVia = new Map<string, { via: NonNullable<ProtocolMember["via"]>; list: Protocol[] }>();
  for (const { protocol: p, via } of members) if (via) {
    const row = byVia.get(via.id) ?? { via, list: [] };
    row.list.push(p);
    byVia.set(via.id, row);
  }
  return (
    <div className="space-y-5" data-protocol-list>
      {domains.map((d) => (
        <div key={d}>
          <div className="kicker mb-2"><Link className="hover:underline" href={protocolDomainHref(d)}>{PROTOCOL_DOMAIN_LABEL[d]}</Link></div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {named.filter((m) => m.protocol.domain === d).map(({ protocol: p }) => (
              <li key={p.id} className="min-w-0">
                <Link href={routeFor(p)} className="card block h-full p-3 hover:shadow-md transition">
                  <span className="flex items-start gap-2"><KindIcon kind="protocol" className="h-4 w-4 mt-0.5 shrink-0 text-accent" /><span className="font-medium leading-snug">{p.name}</span></span>
                  <span className="block text-sm text-muted mt-1 line-clamp-2">{p.tldr}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {byVia.size > 0 && (
        <div data-protocol-via>
          <div className="kicker mb-2">Through the treatments this cancer&apos;s record lists</div>
          <ul className="space-y-1.5 text-sm">
            {[...byVia.values()].map(({ via, list }) => (
              <li key={via.id} className="min-w-0"><Link className="font-medium hover:underline" href={routeFor(via)}>{via.name}</Link>: {list.map((p, i) => <span key={p.id}>{i > 0 && ", "}<Link className="underline decoration-foreground/20 hover:decoration-foreground" href={routeFor(p)}>{p.name}</Link></span>)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
