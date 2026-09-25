import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity, type Kind } from "@/lib/schema";
import { Container, EntityCard, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GLOBOCAN, sitesForCountry } from "@/lib/globocan";
import { countryExtras } from "@/data/country-extras";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import { IL_ASOF, IL_BASKET, IL_COMPANIES, IL_DOING, IL_DRUGS, IL_GAPS, IL_GENETICS, IL_INSTITUTIONS, IL_PAPERS, IL_PAYING, IL_PEOPLE, IL_PROFILE, IL_REGULATOR, IL_TRIALS, type CountryCard } from "@/data/country-il";
import openalex from "../../../../public/openalex/countries.json";

export const metadata: Metadata = pageMeta({
  title: "Cancer in Israel",
  description:
    "Israel deep dive: the health basket committee that decides in public which new cancer medicines the state will fund each year, the four health funds and what a patient pays, the National Cancer Registry and what it does not publish, founder variants and the national BRCA testing programme, and the trial, diagnostics and device industry.",
  path: "/countries/il/",
});

const fmt = (n: number | null) => (n === null ? "n/a" : n.toLocaleString("en-GB"));
const fmt1 = (n: number | null) => (n === null ? "n/a" : n.toFixed(1));

const SITE_COLUMNS: StaticColumn[] = [
  { key: "site", label: "Site" },
  { key: "cases", label: "New cases", sortable: true, numeric: true, className: "text-right" },
  { key: "deaths", label: "Deaths", sortable: true, numeric: true, className: "text-right" },
  { key: "incAsr", label: "Incidence ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "mortAsr", label: "Mortality ASR", sortable: true, numeric: true, className: "text-right" },
  { key: "pages", label: "OnCo cancer page" },
];
const num = (n: number | null, d = 0) => (n === null ? { text: "n/a", v: -1, muted: true } : { text: d ? n.toFixed(d) : n.toLocaleString("en-GB"), v: n });

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

type OpenAlex = { built: string; years: number[]; source: string; countries: Record<string, { name: string; works: Record<string, number>; total: number; citedHigh: number; oa: number; trials?: number }> };

/**
 * Output per head, computed here rather than asserted: works in the latest OpenAlex year and registered trials with a
 * site in the country, both divided by the population in millions from src/data/country-extras.ts, ranked across the
 * countries that carry a population row. The caveats on whole counting, topic assignment and the trial query are the
 * ones set out on /countries/.
 */
function perHead(raw: OpenAlex, year: number) {
  const rows = Object.entries(countryExtras)
    .map(([code, extra]) => {
      const c = raw.countries[code];
      if (!c || !extra.population) return null;
      return { code, name: extra.name, works: c.works[String(year)] ?? 0, worksPer: (c.works[String(year)] ?? 0) / extra.population, trials: c.trials ?? 0, trialsPer: (c.trials ?? 0) / extra.population };
    })
    .filter((r): r is NonNullable<typeof r> => !!r);
  const byWorks = [...rows].sort((a, b) => b.worksPer - a.worksPer);
  const byTrials = [...rows].filter((r) => r.trials > 0).sort((a, b) => b.trialsPer - a.trialsPer);
  return {
    total: rows.length,
    works: byWorks.find((r) => r.code === "IL"),
    worksRank: byWorks.findIndex((r) => r.code === "IL") + 1,
    trialsRank: byTrials.findIndex((r) => r.code === "IL") + 1,
    trialsTotal: byTrials.length,
    trialsTop: byTrials.slice(0, 8),
    volumeRank: Object.entries(raw.countries).sort((a, b) => (b[1].works[String(year)] ?? 0) - (a[1].works[String(year)] ?? 0)).findIndex(([code]) => code === "IL") + 1,
    volumeTotal: Object.keys(raw.countries).length,
  };
}

export default function IsraelPage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(IL_INSTITUTIONS, "institution");
  const companies = pick(IL_COMPANIES, "company");
  const drugs = pick(IL_DRUGS, "drug");
  const trials = pick(IL_TRIALS, "trial");
  const papers = pick(IL_PAPERS, "paper");
  const people = pick(IL_PEOPLE, "person");

  const allInstitutions = g.kind("institution").filter((i) => i.country === "IL").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "IL").length;

  const raw = openalex as OpenAlex;
  const year = raw.years[raw.years.length - 1];
  const head = perHead(raw, year);

  const profile = sitesForCountry(GLOBOCAN, "ISR");
  const all = profile ? GLOBOCAN.countries.ISR?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null && s.label !== "Non-melanoma skin cancer").slice(0, 12) : [];
  const extra = countryExtras.IL;

  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" })),
  }));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title="🇮🇱 Cancer in Israel"
        lede={`A country of about ${extra.population} million people that answers the question every health system faces, which new medicines the state will pay for, in a way no other country does: a public committee argues it out in the open every year inside a fixed budget, and publishes what got in and what did not. This page gathers that mechanism, the four health funds a patient actually deals with, the registry and what it leaves out, the founder variants behind the world's first national population screening programme for inherited cancer risk, and ${institutions.length} institutions, ${companies.length} companies, ${trials.length} trials, ${papers.length} papers and ${people.length} people from the corpus. Facts checked ${IL_ASOF}; every card links its sources.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#basket", "The health basket"], ["#paying", "Who pays"], ["#regulator", "Regulator"], ["#genetics", "Founder genetics"], ["#doing", "What Israel does"], ["#institutions", "Institutions"], ["#companies", "Companies"], ["#trials", "Trials and papers"], ["#people", "People"], ["#gaps", "Gaps"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">GLOBOCAN {GLOBOCAN.year} estimates, rendered from the corpus data file</span>}>
          <Cards cards={IL_PROFILE} />
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in Israel, {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers excluding non-melanoma skin: {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are modelled estimates, not registry counts; the Israel National Cancer Registry publishes its own figures, which differ, and the registry card says how. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="basket" title="The health basket: deciding in public, inside a fixed budget" aside={<span className="text-sm text-muted">The mechanism this page exists to explain</span>}>
          <Cards cards={IL_BASKET} />
          <p className="mt-3 text-sm text-muted">For the same question answered elsewhere, see <Link href="/coverage/rankings/#international" className="underline">how other countries pay for cancer drugs</Link>, the <Link href="/coverage/uk/" className="underline">NICE and Cancer Drugs Fund route in the UK</Link> and the <Link href="/countries/cn/" className="underline">annual reimbursement negotiation in China</Link>.</p>
        </Section>

        <Section id="paying" title="Who pays, and what a patient pays">
          <Cards cards={IL_PAYING} />
          <p className="mt-3 text-sm text-muted">Practical help: <Link href="/assistance/" className="underline">Financial help</Link> and <Link href="/free/" className="underline">Free in oncology</Link> list what costs nothing and who provides it.</p>
        </Section>

        <Section id="regulator" title="Registering a medicine, and why registration is not funding">
          <Cards cards={IL_REGULATOR} />
          {drugs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Products with Israeli origins</h3>
              <Grid items={drugs} />
            </div>
          )}
        </Section>

        <Section id="genetics" title="Founder variants and the national testing programme">
          <Cards cards={IL_GENETICS} />
          <p className="mt-3 text-sm text-muted">Background: <Link href="/terms/founder-variant/" className="underline">what a founder variant is</Link>, <Link href="/targets/brca/" className="underline">BRCA</Link> and <Link href="/technologies/germline-testing/" className="underline">germline testing</Link>.</p>
        </Section>

        <Section id="doing" title="What Israel does that other countries do not" aside={<span className="text-sm text-muted">Output per head, computed from the corpus</span>}>
          <Cards cards={IL_DOING} />
          {head.works && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Small country, dense trial base</h3>
                <span className="text-xs text-muted">OpenAlex oncology works {year}; ClinicalTrials.gov studies with a site in the country</span>
              </div>
              <p className="text-[15px] leading-relaxed">Israel published {head.works.works.toLocaleString("en-GB")} oncology works in {year}, {head.volumeRank}th of {head.volumeTotal} countries by volume but {head.worksRank}th of {head.total} per million people. On registered trials with a site in the country it ranks {head.trialsRank} of {head.trialsTotal}, at {Math.round(head.works.trialsPer).toLocaleString("en-GB")} studies per million people.</p>
              <ol className="mt-3 grid gap-1 sm:grid-cols-2 text-sm">
                {head.trialsTop.map((r, i) => (
                  <li key={r.code} className={`flex items-baseline justify-between gap-2 rounded px-2 py-1 ${r.code === "IL" ? "bg-accent-soft font-medium" : ""}`}>
                    <span><span className="tabular-nums text-muted text-xs me-2">{i + 1}</span><Link href={`/countries/?country=${r.code}`} className="hover:underline">{r.name}</Link></span>
                    <span className="tabular-nums">{Math.round(r.trialsPer).toLocaleString("en-GB")}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-muted">Both counts carry the caveats set out on the <Link href="/countries/" className="underline">country ranking</Link>: OpenAlex credits a work to every country among its authors, so collaborative countries are flattered; the trial count is every registered study with a site in the country, all conditions and all statuses, not cancer trials alone. Population from the World Bank rows in <code>src/data/country-extras.ts</code>. Data built {raw.built}.</p>
            </div>
          )}
        </Section>

        <Section id="institutions" title="Institutions" aside={<span className="text-sm text-muted">{allInstitutions} Israeli institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></span>}>
          <Grid items={institutions} />
        </Section>

        <Section id="companies" title="Companies" aside={<span className="text-sm text-muted">{allCompanies} Israeli companies in the corpus · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <Grid items={companies} />
        </Section>

        <Section id="trials" title="Trials and key papers">
          <h3 className="font-semibold mb-2">Trials</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers</h3>
          <Grid items={papers} />
        </Section>

        <Section id="people" title="People">
          <Grid items={people} />
        </Section>

        <Section id="gaps" title="What is missing, here and there">
          <Cards cards={IL_GAPS} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {IL_ASOF}, read from Israeli originals (the Ministry of Health, the National Cancer Registry, the Israel Center for Disease Control, the health funds and the basket committee&apos;s own published decisions) rather than from summaries of them. The entity lists are pulled live from the corpus by id, so a new Israeli trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-il.ts</code>. Burden figures come from the GLOBOCAN {GLOBOCAN.year} data file used across the site; registry figures differ and are quoted with their own source. Where a figure could not be verified against a primary page it is described in words rather than numbers, and the gaps section names what could not be sourced at all.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>The basket changes every January, co-payment ceilings change with the consumer price index, and eligibility for genetic testing is set by circulars that are revised. Check the <a href="https://www.gov.il/en/departments/ministry_of_health" className="underline" rel="noopener">Ministry of Health</a>, your health fund and the treating centre before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
