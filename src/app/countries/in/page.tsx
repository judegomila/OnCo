import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity, type Kind } from "@/lib/schema";
import { Container, EntityCard, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GLOBOCAN, sitesForCountry } from "@/lib/globocan";
import { countryExtras } from "@/data/country-extras";
import { regionalApprovals, REGION_META } from "@/data/regional-approvals";
import { IN_ASOF, IN_COMPANIES, IN_DOING, IN_DRUGS, IN_INSTITUTIONS, IN_PAPERS, IN_PAYING, IN_PEOPLE, IN_PROFILE, IN_REGULATOR, IN_TRIALS, type CountryCard } from "@/data/country-in";

export const metadata: Metadata = pageMeta({
  title: "India: what India is up to in cancer",
  description: "India deep dive: the cancer profile (oral, cervical, breast, gallbladder), how care is paid for (PM-JAY, Tata Memorial, pooled procurement), the regulator (CDSCO), research institutions, companies from Biocon to ImmunoACT, the low-cost trials that changed practice, and the people doing the work.",
  path: "/countries/in/",
});

const fmt = (n: number | null) => (n === null ? "n/a" : n.toLocaleString("en-GB"));
const fmt1 = (n: number | null) => (n === null ? "n/a" : n.toFixed(1));

function Cards({ cards }: { cards: CountryCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((s) => (
        <article key={s.id} id={s.id} className="card p-5 flex flex-col">
          <h3 className="font-semibold leading-snug text-balance">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed">{s.plain}</p>
          <details className="mt-3 group">
            <summary className="cursor-pointer text-sm text-muted hover:text-foreground select-none">More detail</summary>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.detail}</p>
          </details>
          <ul className="mt-auto pt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {s.links.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</a></li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

function Grid({ items, compact = true }: { items: Entity[]; compact?: boolean }) {
  if (!items.length) return <p className="text-sm text-muted">Nothing recorded yet.</p>;
  return <div className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>{items.map((e) => <EntityCard key={e.id} e={e} compact={compact} />)}</div>;
}

export default function IndiaPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(IN_INSTITUTIONS, "institution");
  const companies = pick(IN_COMPANIES, "company");
  const drugs = pick(IN_DRUGS, "drug");
  const trials = pick(IN_TRIALS, "trial");
  const papers = pick(IN_PAPERS, "paper");
  const people = pick(IN_PEOPLE, "person");

  const allInstitutions = g.kind("institution").filter((i) => i.country === "IN").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "IN").length;
  const inApproved = g.kind("drug").filter((d) => { const r = regionalApprovals[d.id]?.IN; return r && (r.status === "approved" || r.status === "conditional"); });

  const profile = sitesForCountry(GLOBOCAN, "IND");
  const all = profile ? GLOBOCAN.countries.IND?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null && s.label !== "Non-melanoma skin cancer").slice(0, 12) : [];
  const extra = countryExtras.IN;
  const meta = REGION_META.IN;

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title={`${meta.flag} India: what India is up to in cancer`}
        lede={`A country of about ${extra.population.toLocaleString("en-GB")} million people with roughly a third of the West's cancer rate per person, a very different mix of cancers, and a habit of answering questions rich countries do not ask: what is the cheapest way to get the same benefit? This page gathers ${institutions.length} institutions, ${companies.length} companies, ${trials.length} trials, ${papers.length} key papers and ${people.length} people from the corpus, with the health system, the regulator and the burden figures around them. Facts checked ${IN_ASOF}; every card links its sources.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#paying", "Paying for care"], ["#regulator", "Regulator"], ["#institutions", "Institutions"], ["#companies", "Companies"], ["#trials", "Trials and papers"], ["#people", "People"], ["#doing", "What is being done"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile: what is different about cancer in India" aside={<span className="text-sm text-muted">GLOBOCAN {GLOBOCAN.year} estimates, rendered from the corpus data file</span>}>
          <Cards cards={IN_PROFILE} />
          {profile && all && (
            <div className="mt-6 card p-5 overflow-x-auto">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in India, {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers excluding non-melanoma skin: {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="text-left text-xs text-muted"><th className="py-1 pr-3">Site</th><th className="py-1 pr-3 text-right">New cases</th><th className="py-1 pr-3 text-right">Deaths</th><th className="py-1 pr-3 text-right">Incidence ASR</th><th className="py-1 pr-3 text-right">Mortality ASR</th><th className="py-1">OnCo cancer page</th></tr></thead>
                <tbody>
                  {topSites.map((s) => (
                    <tr key={s.code} className="border-t border-border">
                      <td className="py-1.5 pr-3">{s.label}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{fmt(s.cases)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{fmt(s.deaths)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{fmt1(s.incAsr)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{fmt1(s.mortAsr)}</td>
                      <td className="py-1.5">{s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e, i) => <span key={e.id}>{i > 0 && ", "}<Link href={routeFor(e)} className="underline">{e.name}</Link></span>)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). Estimates, not registry counts; see the registry card for how India counts cancer. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="paying" title="Health system and paying for care">
          <Cards cards={IN_PAYING} />
          <p className="mt-3 text-sm text-muted">Practical help: <Link href="/assistance/" className="underline">Financial help</Link> lists PM-JAY and Tata Memorial&apos;s subsidised category with the steps to use them; <Link href="/second-opinion/" className="underline">Second opinion</Link> explains how referral works in India.</p>
        </Section>

        <Section id="regulator" title={`Regulator: ${meta.regulator}`} aside={<a href={meta.url} className="text-sm underline" rel="noopener">CDSCO approved new drugs</a>}>
          <Cards cards={IN_REGULATOR} />
          <div className="mt-4 card p-5">
            <h3 className="font-semibold">Indian approvals recorded in OnCo ({inApproved.length})</h3>
            <p className="mt-1 text-sm text-muted">Products with a sourced India row in the <Link href="/regulatory/regions/" className="underline">approvals by region</Link> matrix. Absent means not yet researched, not &ldquo;not approved&rdquo;.</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
              {inApproved.map((d) => { const r = regionalApprovals[d.id].IN!; return <li key={d.id} className="flex flex-col"><span><Link href={routeFor(d)} className="font-medium underline">{d.name}</Link>{d.brand ? <span className="text-muted"> ({d.brand})</span> : null}{r.year ? <span className="text-muted"> · {r.year}</span> : null}</span>{(r.indication || r.note) && <span className="text-xs text-muted">{[r.indication, r.note].filter(Boolean).join(". ")}</span>}</li>; })}
            </ul>
          </div>
          {drugs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">India-first products</h3>
              <Grid items={drugs} />
            </div>
          )}
        </Section>

        <Section id="institutions" title="Research institutions and cancer centres" aside={<span className="text-sm text-muted">{allInstitutions} Indian institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></span>}>
          <Grid items={institutions} />
        </Section>

        <Section id="companies" title="Companies: generics, biosimilars, cell therapy and discovery" aside={<span className="text-sm text-muted">{allCompanies} Indian companies in the corpus · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <Grid items={companies} />
        </Section>

        <Section id="trials" title="Notable trials and key papers">
          <h3 className="font-semibold mb-2">Trials</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers</h3>
          <Grid items={papers} />
        </Section>

        <Section id="people" title="People">
          <Grid items={people} />
        </Section>

        <Section id="doing" title="What is being done: solution first">
          <Cards cards={IN_DOING} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {IN_ASOF}. The entity lists are pulled live from the corpus by id, so a new Indian trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-in.ts</code>. Burden figures come from the GLOBOCAN {GLOBOCAN.year} data file used across the site; national registry figures differ and are quoted with their own source. Where a date or figure could not be verified against a primary page it is described in words rather than numbers.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>Approvals, PM-JAY packages and prices change often. Check the <a href={meta.url} className="underline" rel="noopener">CDSCO approved drugs list</a>, the <a href="https://nha.gov.in/PM-JAY" className="underline" rel="noopener">National Health Authority</a> and the treating hospital before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
