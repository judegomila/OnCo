import Link from "next/link";
import type { ReactNode } from "react";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { GLOBOCAN, type CountrySite } from "@/lib/globocan";
import { QUEUE_URL, type AutoCountry, type MethodNote } from "@/lib/country-pages";
import { REGION_META, REGIONS } from "@/lib/region-meta";
import { ChipList, Container, EntityCard, GroupKicker, PageHeader } from "./ui";
import { CountryTrialsBody, countryTrialsAside } from "./TrialsHere";
import { GeoGlyphIcon, type GeoGlyphName } from "./GeoGlyph";

/**
 * An automatic country page (/countries/<iso2>/) for a GLOBOCAN country with no deep dive. Every sentence is built
 * from a field: IARC's estimates and method codes, the trial captures, the records that name the country, and the
 * country-extras row. Nothing here is written by hand about the country, so the page states what it holds and,
 * in "What OnCo does not yet hold", what it does not. src/lib/country-pages.ts gathers the data.
 */
const n0 = (n: number | null | undefined) => (n == null ? "n/a" : n.toLocaleString("en-GB"));
const n1 = (n: number | null | undefined) => (n == null ? "n/a" : n.toLocaleString("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 }));
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}`);
const plural = (n: number, one: string, many = `${one}s`) => `${n.toLocaleString("en-GB")} ${n === 1 ? one : many}`;
const lowerSite = (s: string) => (/^(Non-Hodgkin|Hodgkin|Kaposi)/.test(s) ? s : s.toLowerCase());

function H2({ id, glyph, title, aside }: { id: string; glyph: GeoGlyphName; title: string; aside?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
      <h2 id={id} className="text-lg font-semibold tracking-tight inline-flex items-center gap-2 scroll-mt-20"><GeoGlyphIcon name={glyph} className="h-4 w-4 text-muted" />{title}</h2>
      {aside}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card p-3">
      <div className="text-xs text-muted">{label}</div>
      <div className="text-xl font-semibold tabular-nums mt-0.5">{value}</div>
      {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
    </div>
  );
}

function SiteTable({ sites, sortBy }: { sites: CountrySite[]; sortBy: "cases" | "deaths" }) {
  const g = graph();
  return (
    <div className="overflow-x-auto">
      <table className="onco text-sm">
        <thead><tr><th>Site</th><th className="text-right">{sortBy === "cases" ? "New cases" : "Deaths"}</th><th className="text-right">Rate</th><th className="hidden sm:table-cell">OnCo page</th></tr></thead>
        <tbody>
          {sites.map((s) => {
            const pages = s.oncoIds.map((id) => g.get(id)).filter((e): e is NonNullable<typeof e> => !!e);
            return (
              <tr key={s.code}>
                <td>{s.label}</td>
                <td className="text-right tabular-nums">{n0(sortBy === "cases" ? s.cases : s.deaths)}</td>
                <td className="text-right tabular-nums text-muted">{n1(sortBy === "cases" ? s.incAsr : s.mortAsr)}</td>
                <td className="hidden sm:table-cell">{pages.map((e, i) => <span key={e.id}>{i > 0 ? ", " : ""}<Link href={routeFor(e)} className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground">{e.name}</Link></span>)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Method({ label, m }: { label: string; m: MethodNote }) {
  return <li><strong className="font-medium">{label}</strong>: {m.code ? <>method {m.code}, {m.meaning ?? "see GLOBOCAN"}.</> : <>IARC gives no method code.</>}</li>;
}

export function CountryAuto({ c }: { c: AutoCountry }) {
  const all = c.all;
  const topThree = c.byIncidence.slice(0, 3).map((s) => lowerSite(s.label));
  const neighbours = c.methodInc.neighbours || c.methodMort.neighbours;
  const regionsLabel = list(REGIONS.map((r) => REGION_META[r].label));
  const holds = [
    c.trials.length ? plural(c.trials.length, "trial") + " with a site there" : null,
    c.institutions.length ? plural(c.institutions.length, "institution") : null,
    c.companies.length ? plural(c.companies.length, "company", "companies") : null,
    c.people.length ? plural(c.people.length, "person", "people") : null,
    c.programmes.length + c.laws.length ? plural(c.programmes.length + c.laws.length, "programme or law", "programmes and laws") : null,
  ].filter((x): x is string => !!x);

  const lede = `IARC estimates ${n0(all?.[0])} new cancer cases and ${n0(all?.[2])} cancer deaths in ${c.name} in ${GLOBOCAN.year}${topThree.length ? `; the commonest new cancers are ${list(topThree)}` : ""}. This page is assembled automatically from OnCo's data${holds.length ? `: ${list(holds)}` : ""}, and says what OnCo does not yet hold.`;

  const nav: Array<[string, string]> = [["figures", "Figures"], ["trials", "Trials"], ["who", "Institutions and people"], ...(c.programmes.length + c.laws.length ? [["programmes", "Programmes and laws"] as [string, string]] : []), ["approvals", "Approvals"], ["gaps", "Not yet held"], ["sources", "Sources"]];

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title={`Cancer in ${c.name}`}
        seed={`country-${c.iso2}`}
        lede={lede}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {nav.map(([h, l]) => <a key={h} href={`#${h}`} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <section className="mt-8" aria-labelledby="figures">
          <H2 id="figures" glyph="incidence" title={`Cancer figures, GLOBOCAN ${GLOBOCAN.year}`} aside={<Link href={`/cases/?country=${c.iso3}`} className="text-sm underline">Compare countries →</Link>} />
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <Stat label="New cases" value={n0(all?.[0])} sub="all cancers" />
            <Stat label="Deaths" value={n0(all?.[2])} sub="all cancers" />
            <Stat label="Incidence rate" value={n1(all?.[1])} sub="per 100,000, age-standardised" />
            <Stat label="Mortality rate" value={n1(all?.[3])} sub="per 100,000, age-standardised" />
            <Stat label="Cumulative risk" value={all?.[4] == null ? "n/a" : `${n1(all[4])}%`} sub="of a cancer by age 74" />
            <Stat label="Population" value={n0(c.pop)} sub={`IARC, ${GLOBOCAN.year}`} />
          </div>
          {neighbours && (
            <p className="mt-4 card p-4 text-sm border-amber-300/60 dark:border-amber-700/50">
              <strong className="font-medium">Built partly from other countries&apos; data.</strong> IARC&apos;s method code for {c.name}&apos;s {c.methodInc.neighbours && c.methodMort.neighbours ? "incidence and mortality" : c.methodInc.neighbours ? "incidence" : "mortality"} estimate is {c.methodInc.neighbours ? c.methodInc.code : c.methodMort.code}: {(c.methodInc.neighbours ? c.methodInc.meaning : c.methodMort.meaning) ?? "see GLOBOCAN"}. Read the figures as a regional estimate, not a count.
            </p>
          )}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Most new cases</h3>
              {c.byIncidence.length ? <SiteTable sites={c.byIncidence} sortBy="cases" /> : <p className="text-sm text-muted">IARC reports no site with new cases.</p>}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Most deaths</h3>
              {c.byMortality.length ? <SiteTable sites={c.byMortality} sortBy="deaths" /> : <p className="text-sm text-muted">IARC reports no site with deaths.</p>}
            </div>
          </div>
          <ul className="mt-4 text-xs text-muted space-y-1 list-disc ps-5">
            <Method label="Incidence" m={c.methodInc} />
            <Method label="Mortality" m={c.methodMort} />
            <li>Rates are age-standardised per 100,000 (World standard population), both sexes, all ages. Non-melanoma skin cancer is left out of the site lists, as on the deep dives. IARC lists the country as &ldquo;{c.globocanName}&rdquo;, in {c.area} ({c.region}){c.hdi ? `, ${c.hdi}` : ""}{c.income ? `, ${c.income.toLowerCase()}` : ""}.</li>
            <li>Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>, read through the IARC API on {GLOBOCAN.fetched}.</li>
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="trials">
          <H2 id="trials" glyph="list" title="Trials recruiting here" aside={<span className="text-sm text-muted">{countryTrialsAside(c.iso2)}</span>} />
          <CountryTrialsBody iso2={c.iso2} />
        </section>

        <section className="mt-10" aria-labelledby="who">
          <H2 id="who" glyph="people" title="Institutions, companies and people" />
          {c.institutions.length + c.companies.length + c.people.length === 0 ? (
            <p className="text-sm">OnCo holds no institution, company or person in {c.name}.</p>
          ) : (
            <div className="space-y-4">
              {c.institutions.length > 0 && <div><h3 className="font-semibold mb-2">{plural(c.institutions.length, "institution")}</h3><ChipList items={c.institutions} /></div>}
              {c.companies.length > 0 && <div><h3 className="font-semibold mb-2">{plural(c.companies.length, "company", "companies")}</h3><ChipList items={c.companies} /></div>}
              {c.people.length > 0 && <div><h3 className="font-semibold mb-2">{plural(c.people.length, "person", "people")}</h3><p className="text-xs text-muted mb-2">People whose main affiliation in OnCo is an institution or company in {c.name}.</p><ChipList items={c.people} /></div>}
            </div>
          )}
        </section>

        {c.programmes.length + c.laws.length > 0 && (
          <section className="mt-10" aria-labelledby="programmes">
            <H2 id="programmes" glyph="registry" title="Screening, vaccination and law" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[...c.programmes, ...c.laws].map((e) => <EntityCard key={e.id} e={e} />)}</div>
          </section>
        )}

        <section className="mt-10" aria-labelledby="approvals">
          <H2 id="approvals" glyph="flag" title="Approvals" />
          {c.euApproved !== null ? (
            <p className="text-sm max-w-3xl">{c.name} is an EU member state, so an EU centralised authorisation covers it: {plural(c.euApproved, "product")} in OnCo carry a sourced EU row that is approved or conditional. See the <Link href="/regulatory/regions/" className="underline">approvals by region</Link> matrix. National procedures and reimbursement are not recorded.</p>
          ) : (
            <p className="text-sm max-w-3xl">OnCo records approvals for {regionsLabel}. {c.name} is not one of them, so no approval in OnCo speaks for it. See the <Link href="/regulatory/regions/" className="underline">approvals by region</Link> matrix for what is held.</p>
          )}
          {c.extras && (c.extras.funder || c.extras.programmes?.length) && (
            <div className="mt-4 card p-4 text-sm max-w-3xl">
              <h3 className="font-semibold mb-1">From the country research ranking</h3>
              <ul className="space-y-1 list-disc ps-5">
                {c.extras.funder && <li>Research funders: {c.extras.funder}{c.extras.budget ? `; ${c.extras.budget}` : ""}{c.extras.budgetSource ? <> (<a href={c.extras.budgetSource} className="underline" rel="noopener">source</a>)</> : null}.</li>}
                {c.extras.programmes?.length ? <li>Named in the ranking: {list(c.extras.programmes)}.</li> : null}
              </ul>
              <p className="mt-2 text-xs text-muted">From <Link href="/countries/" className="underline">the country ranking</Link>&apos;s hand-curated row; follow its source before relying on a figure.</p>
            </div>
          )}
        </section>

        <section className="mt-10" aria-labelledby="gaps">
          <div className="card p-5 border-dashed">
            <H2 id="gaps" glyph="gap" title="What OnCo does not yet hold" />
            <ul className="text-sm list-disc ps-5 space-y-1.5 max-w-3xl">
              <li>No registry figures. The figures above are IARC&apos;s estimates; OnCo has not read {c.name}&apos;s own cancer registry, its survival figures or its stage at diagnosis.</li>
              <li>No payer detail: who pays for cancer care in {c.name}, what a patient pays, and which medicines are reimbursed.</li>
              <li>No regulator detail: {c.euApproved !== null ? "the national medicines agency's own procedures, beyond EU centralised authorisations" : `the national medicines regulator, its approval routes and its decisions`}.</li>
              <li>No national cancer plan, guideline, screening schedule or treatment-centre list read from {c.name}&apos;s own sources{c.programmes.length ? ", beyond the programme records above" : ""}.</li>
              {c.trials.length === 0 && <li>No trial with a site in {c.name}.</li>}
            </ul>
            <p className="mt-3 text-sm max-w-3xl">
              {c.queueRank !== null
                ? <>A deep dive for {c.name} is ranked {c.queueRank} of {c.queueSize} in the <a href={QUEUE_URL} className="underline" rel="noopener">country coverage queue</a> (November 2026), which ranks countries without a page by cases, deaths, research output and population.</>
                : <>{c.name} is not among the {c.queueSize} countries ranked in the <a href={QUEUE_URL} className="underline" rel="noopener">country coverage queue</a> (November 2026), which ranks countries without a page by cases, deaths, research output and population.</>}
              {" "}Know a source? <Link href="/suggest/" className="underline">Suggest an edit</Link>.
            </p>
          </div>
        </section>

        <section className="mt-10 text-sm text-muted max-w-4xl" aria-labelledby="sources">
          <H2 id="sources" glyph="json" title="Sources and machine-readable data" />
          <ul className="list-disc ps-5 space-y-1">
            <li>IARC Global Cancer Observatory, GLOBOCAN {GLOBOCAN.year}: <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">Cancer Today</a>{c.extras?.gcoUrl && !c.extras.gcoUrl.includes("undefined") ? <>; <a href={c.extras.gcoUrl} className="underline" rel="noopener">{c.name} fact sheet</a></> : null}.</li>
            <li>ClinicalTrials.gov study records, courtesy of the US National Library of Medicine, as captured in each trial record.</li>
            <li>OnCo records: each chip and card opens a record with its own sources.</li>
            <li>This page as JSON: <a href={`/api/v1/countries/${c.iso2.toLowerCase()}.json`} className="underline" type="application/json">/api/v1/countries/{c.iso2.toLowerCase()}.json</a>; every country: <a href="/api/v1/countries.json" className="underline" type="application/json">/api/v1/countries.json</a>.</li>
          </ul>
        </section>
      </Container>
    </>
  );
}
