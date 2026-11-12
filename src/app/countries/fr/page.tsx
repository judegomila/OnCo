import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Entity, type Kind } from "@/lib/schema";
import { CountryTrialsSection } from "@/components/TrialsHere";
import { Container, EntityCard, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GLOBOCAN, sitesForCountry } from "@/lib/globocan";
import { countryExtras } from "@/data/country-extras";
import { StaticTable, type StaticColumn, type StaticRow } from "@/components/filters/StaticTable";
import { CountryParts } from "@/components/CountryParts";
import {
  FR_ASOF, FR_ASSESSMENT, FR_COMPANIES, FR_DOING, FR_DRUGS, FR_GAPS, FR_INSTITUTIONS, FR_PAPERS, FR_PAYING, FR_PEOPLE, FR_PROFILE,
  FR_REGISTRY, FR_REGULATOR, FR_RESEARCH, FR_SCREENING, FR_SCREENING_PROGRAMMES, FR_TRIALS, type CountryCard,
} from "@/data/country-fr";

export const metadata: Metadata = pageMeta({
  title: "Cancer in France",
  description: "France deep dive read from French sources: INCa's national estimates and the new national cancer registry, full health insurance cover for cancer as a long-term condition, the HAS ratings and the absence of a cost-per-QALY threshold, early access before a price is agreed, licensed cancer hospitals and tumour boards, the right to be forgotten, national genome sequencing, and the Unicancer centres.",
  path: "/countries/fr/",
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

const SCREENING_COLUMNS: StaticColumn[] = [
  { key: "cancer", label: "Programme" },
  { key: "who", label: "Who is invited" },
  { key: "test", label: "Test" },
  { key: "interval", label: "How often" },
  { key: "participation", label: "Participation" },
  { key: "period", label: "Period" },
];

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
          {s.links.length > 0 && (
            <ul className="mt-auto pt-2 flex flex-wrap gap-x-3 text-xs">
              {s.links.map((l) => (
                l.url.startsWith("/")
                  ? <li key={l.url}><Link href={l.url} className="inline-block py-1 underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</Link></li>
                  : <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-block py-1 underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-muted hover:text-foreground">{l.label}</a></li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

function Grid({ items, compact = true }: { items: Entity[]; compact?: boolean }) {
  if (!items.length) return <p className="text-sm text-muted">Nothing recorded yet.</p>;
  return <div className={`grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>{items.map((e) => <EntityCard key={e.id} e={e} compact={compact} />)}</div>;
}

export default function FrancePage() {
  const g = graph();
  const pick = (ids: string[], kind?: Kind): Entity[] => ids.map((id) => g.get(id)).filter((e): e is Entity => !!e && (!kind || e.kind === kind));
  const institutions = pick(FR_INSTITUTIONS, "institution");
  const companies = pick(FR_COMPANIES, "company");
  const drugs = pick(FR_DRUGS, "drug");
  const trials = pick(FR_TRIALS, "trial");
  const papers = pick(FR_PAPERS, "paper");
  const people = pick(FR_PEOPLE, "person");

  const allInstitutions = g.kind("institution").filter((i) => i.country === "FR").length;
  const allCompanies = g.kind("company").filter((c) => c.country === "FR").length;

  const profile = sitesForCountry(GLOBOCAN, "FRA");
  const all = profile ? GLOBOCAN.countries.FRA?.data?.["39"] : undefined;
  const topSites = profile ? profile.sites.filter((s) => s.cases !== null).slice(0, 14) : [];
  const extra = countryExtras.FR;
  const siteRows: StaticRow[] = topSites.map((s) => ({
    id: String(s.code),
    site: s.label,
    cases: num(s.cases), deaths: num(s.deaths), incAsr: num(s.incAsr, 1), mortAsr: num(s.mortAsr, 1),
    pages: s.oncoIds.map((id) => g.get(id)).filter((e): e is Entity => !!e).map((e) => ({ text: e.name, href: routeFor(e), className: "underline" })),
  }));
  const screeningRows: StaticRow[] = FR_SCREENING_PROGRAMMES.map((r) => ({
    id: r.id, cancer: r.cancer, who: r.who, test: r.test, interval: r.interval, participation: r.participation, period: r.period,
  }));

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who"><span className="kicker">·</span><Link href="/countries/" className="kicker hover:underline">Countries</Link></GroupKicker>}
        title="🇫🇷 Cancer in France"
        lede={`A country of about ${extra.population.toLocaleString("en-GB")} million people where cancer is the first cause of death in men, where the health insurance pays for cancer care in full as a long-term condition, where a promising medicine can be paid for before its price is agreed, and where every hospital that treats cancer must be licensed for it. This page was written from French sources in French: INCa's national figures, the HAS's and the ANSM's own pages, the health insurance rules, Unicancer, and the papers that describe how France counts its cancers. Facts checked ${FR_ASOF}; every card links its sources, and what could not be read is listed at the end.`}
      />
      <Container className="pb-16">
        <nav aria-label="Sections" className="flex flex-wrap gap-2 text-sm">
          {[["#profile", "Cancer profile"], ["#registry", "How France counts"], ["#overseas", "Overseas departments"], ["#screening", "Screening"], ["#paying", "Paying for care"], ["#assessment", "Assessment and price"], ["#regulator", "Licensing and early access"], ["#doing", "What France does differently"], ["#research", "Research and trials"], ["#recruiting", "Recruiting here"], ["#institutions", "Institutions"], ["#corpus", "In the corpus"], ["#gaps", "Gaps"]].map(([h, l]) => <a key={h} href={h} className="chip hover:bg-surface">{l}</a>)}
        </nav>

        <Section id="profile" title="Cancer profile" aside={<span className="text-sm text-muted">French national figures in the cards; GLOBOCAN {GLOBOCAN.year} estimates in the table</span>}>
          <Cards cards={FR_PROFILE} />
          {profile && all && (
            <div className="mt-6 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="font-semibold">Leading cancers in metropolitan France, GLOBOCAN {GLOBOCAN.year}</h3>
                <span className="text-xs text-muted">All cancers, C00-97: {fmt(all[0])} new cases, {fmt(all[2])} deaths; age-standardised incidence {fmt1(all[1])} and mortality {fmt1(all[3])} per 100,000; cumulative risk to 74: {fmt1(all[4])}%.</span>
              </div>
              <StaticTable rows={siteRows} columns={SITE_COLUMNS} noun="sites" defaultSort={{ key: "cases", dir: -1 }} />
              <p className="mt-3 text-xs text-muted">Source: {GLOBOCAN.citation} <a href={GLOBOCAN.sourceUrl} className="underline" rel="noopener">{GLOBOCAN.sourceUrl}</a>. ASR = age-standardised rate per 100,000 (World standard). These are modelled estimates for {GLOBOCAN.year}, not the French national estimate: France&apos;s own figure for 2023 is 433,136 new cancers, which excludes skin cancers other than melanoma where GLOBOCAN&apos;s all-cancers total includes them. Read the registry cards below before comparing this table with another country&apos;s. Compare countries on the <Link href="/cases/" className="underline">cases by country</Link> page.</p>
            </div>
          )}
        </Section>

        <Section id="registry" title="How France counts its cancers">
          <Cards cards={FR_REGISTRY} />
        </Section>

        <Section id="overseas" title="The overseas departments" aside={<span className="text-sm text-muted">GLOBOCAN {GLOBOCAN.year}, reported by IARC apart from metropolitan France</span>}>
          <p className="text-[15px] leading-relaxed max-w-3xl mb-4">IARC reports French Guiana, Guadeloupe, Martinique and La Réunion separately from metropolitan France, so the table above does not include them. As French departments they share France&apos;s health system described on this page: the national health insurance (Assurance Maladie), full cover for cancer as a long-term condition (ALD 30), and the HAS assessments that decide what is reimbursed. Their figures are IARC&apos;s estimates, with the method code IARC gives for each.</p>
          <CountryParts parent="FR" />
        </Section>

        <Section id="screening" title="Organised screening">
          <Cards cards={FR_SCREENING} />
          <div className="mt-6 card p-5">
            <h3 className="font-semibold mb-3">The national programmes</h3>
            <StaticTable rows={screeningRows} columns={SCREENING_COLUMNS} noun="programmes" />
            <p className="mt-3 text-xs text-muted">Source: INCa, Panorama des cancers en France 2026, and INCa&apos;s cervical screening page. Participation periods differ by programme. Breast participation excludes the further 11 per cent of women screened outside the programme.</p>
          </div>
        </Section>

        <Section id="paying" title="Who pays: cancer as a long-term condition">
          <Cards cards={FR_PAYING} />
        </Section>

        <Section id="assessment" title="Assessment and price: the HAS and the CEPS">
          <Cards cards={FR_ASSESSMENT} />
        </Section>

        <Section id="regulator" title="Licensing, early access and compassionate access">
          <Cards cards={FR_REGULATOR} />
        </Section>

        <Section id="doing" title="What France does that others do not">
          <Cards cards={FR_DOING} />
        </Section>

        <Section id="research" title="Research and trials">
          <Cards cards={FR_RESEARCH} />
          {drugs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Medicines the corpus links to French companies</h3>
              <Grid items={drugs} />
            </div>
          )}
        </Section>

        <CountryTrialsSection iso2="FR" />

        <Section id="institutions" title="The institutions">
          <Grid items={institutions} />
          <p className="mt-3 text-sm text-muted">{allInstitutions} French institutions in the corpus · <Link href="/institutions/" className="underline">map and ranking</Link></p>
        </Section>

        <Section id="corpus" title="Companies, groups, trials, papers and people in the corpus" aside={<span className="text-sm text-muted">{allCompanies} French companies and groups · <Link href="/companies/" className="underline">all companies</Link></span>}>
          <h3 className="font-semibold mb-2">Cooperative groups, companies and investors</h3>
          <Grid items={companies} />
          <h3 className="font-semibold mt-6 mb-2">Trials</h3>
          <Grid items={trials} />
          <h3 className="font-semibold mt-6 mb-2">Key papers</h3>
          <Grid items={papers} />
          <h3 className="font-semibold mt-6 mb-2">People</h3>
          <Grid items={people} />
        </Section>

        <Section id="gaps" title="Gaps, named">
          <Cards cards={FR_GAPS} />
        </Section>

        <section className="mt-10 grid md:grid-cols-2 gap-6 text-sm">
          <div className="card p-5 space-y-2">
            <h2 className="font-semibold text-base">How this page is built</h2>
            <p>The cards are hand-written from the linked sources and dated {FR_ASOF}. French-language sources are cited by their French titles, because that is how a reader will find them again. The entity lists are pulled live from the corpus by id, so a new French trial, company or person added anywhere in OnCo appears here once listed in <code>src/data/country-fr.ts</code>. Burden figures in the table come from the GLOBOCAN {GLOBOCAN.year} data file used across the site; the French national estimates differ and are quoted with their year and their source.</p>
          </div>
          <div className="card p-5 space-y-2 border-amber-300/60 dark:border-amber-700/50">
            <h2 className="font-semibold text-base">Verify before relying on it</h2>
            <p>Reimbursement, early-access decisions and screening rules change. Check the <a href="https://www.has-sante.fr/jcms/r_1500918/fr/acces-precoce-a-un-medicament" className="underline" rel="noopener">HAS early-access decisions</a>, the <a href="https://ansm.sante.fr/documents/reference/medicaments-en-acces-derogatoires" className="underline" rel="noopener">ANSM list of medicines under exceptional access</a>, <a href="https://www.cancer.fr" className="underline" rel="noopener">cancer.fr</a> and the treating hospital before acting on anything here. Corrections are welcome through the <Link href="/suggest/" className="underline">suggest an edit</Link> form.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
