import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import type { Entity } from "@/lib/schema";
import { ChipList, Container, EntityCard, EntityLink, GroupKicker, PageHeader, Section } from "@/components/ui";
import { CHINA_FACTS } from "@/data/china";
import { countryExtras } from "@/data/country-extras";
import { deals, DEAL_TYPE_LABEL } from "@/data/deals";
import { regionalApprovals } from "@/data/regional-approvals";
import data from "../../../../public/openalex/countries.json";

export const metadata: Metadata = pageMeta({
  title: "China: the second engine of cancer drug development",
  description: "China in oncology: the cancer burden and what is being done about it, the NMPA and CDE reforms, NRDL price negotiation, Healthy China 2030, hepatitis B vaccination, the domestic PD-1s, ADCs, bispecifics, CAR-Ts and KRAS inhibitors approved by the NMPA, the companies and out-licensing deals, the institutions and the people, every fact with a primary source.",
  path: "/countries/china/",
});

type Raw = { years: number[]; countries: Record<string, { name: string; works: Record<string, number>; total: number; trials?: number }> };

/** Chinese-origin companies headquartered elsewhere (BeOne in Basel, Legend in Somerset NJ) belong on this page too. */
const CHINESE_ORIGIN_COMPANIES = new Set(["beone", "legend-biotech", "systimmune"]);
/** Sponsor names that identify a Chinese registration trial when the record is not tagged. */
const CHINESE_SPONSOR = /akeso|beigene|beone|hengrui|innovent|junshi|henlius|legend|carsgen|kelun|remegen|hutchmed|hansoh|cstone|allist|sino biopharm|chia tai|zelgen|iaso|jw therapeutics|sun yat-sen|fudan|chinese academy/i;

const fmt = (n: number) => n.toLocaleString("en-GB");

function Src({ s }: { s: { label: string; url: string } }) {
  return <a href={s.url} rel="noopener" className="underline decoration-dotted text-muted hover:text-foreground">{s.label}</a>;
}

function Pair({ problem, doing, sources }: { problem: React.ReactNode; doing: React.ReactNode; sources: Array<{ label: string; url: string }> }) {
  return (
    <div className="card p-4 grid gap-3 md:grid-cols-2">
      <div><div className="kicker mb-1">The problem</div><p className="text-[15px] leading-relaxed">{problem}</p></div>
      <div><div className="kicker mb-1">What is being done</div><p className="text-[15px] leading-relaxed">{doing}</p></div>
      <div className="md:col-span-2 text-xs text-muted">Sources: {sources.map((s, i) => <span key={s.url}>{i > 0 ? "; " : ""}<Src s={s} /></span>)}</div>
    </div>
  );
}

export default function ChinaPage() {
  const g = graph();
  const raw = data as Raw;
  const cn = raw.countries.CN;
  const y0 = raw.years[0], y1 = raw.years[raw.years.length - 1];
  const extra = countryExtras.CN;
  const F = CHINA_FACTS;

  const institutions = g.kind("institution").filter((e) => e.country === "CN");
  const institutionIds = new Set(institutions.map((e) => e.id));
  const companies = g.kind("company").filter((e) => e.country === "CN" || CHINESE_ORIGIN_COMPANIES.has(e.id));
  const companyIds = new Set(companies.map((e) => e.id));
  const people = g.kind("person").filter((e) => (e.institutionId && institutionIds.has(e.institutionId)) || e.tags.includes("china") || e.companies.some((c) => companyIds.has(c)));
  const drugs = g.kind("drug").filter((e) => e.approvals.some((a) => /^(China|CN)$/i.test(a.region)) || (e.companies.some((c) => companyIds.has(c)) && e.tags.includes("china")));
  const trials = g.kind("trial").filter((e) => e.tags.includes("china") || (e.sponsor && CHINESE_SPONSOR.test(e.sponsor)) || e.companies.some((c) => companyIds.has(c)))
    .sort((a, b) => (b.yearReported ?? 0) - (a.yearReported ?? 0));
  const regulators = ["nmpa-cde", "nhsa", "ncc-china", "csco", "caca", "ctong"].map((id) => g.get(id)).filter((e): e is Entity => !!e);
  const cnApprovals = Object.entries(regionalApprovals).filter(([, row]) => row.CN?.status === "approved" || row.CN?.status === "conditional");
  const chinaDeals = deals.filter((d) => d.from.country === "CN" || (d.from.id && companyIds.has(d.from.id)) || (d.to.id && companyIds.has(d.to.id))).sort((a, b) => b.date.localeCompare(a.date));

  const byModality = (re: RegExp) => drugs.filter((d) => re.test(d.modality)).sort((a, b) => a.name.localeCompare(b.name));
  const groups: Array<[string, Entity[]]> = [
    ["PD-1 and PD-L1 antibodies", byModality(/PD-1|PD-L1/i).filter((d) => !/bispecific/i.test(d.modality))],
    ["Bispecific antibodies", byModality(/bispecific/i).filter((d) => !/ADC/i.test(d.modality))],
    ["Antibody-drug conjugates", byModality(/ADC/i)],
    ["Cell therapies", byModality(/cell therapy|CAR-T/i)],
    ["Kinase inhibitors and other small molecules", byModality(/small.molecule|TKI|kinase|inhibitor/i).filter((d) => !/ADC|antibody/i.test(d.modality))],
  ];
  const grouped = new Set(groups.flatMap(([, list]) => list.map((d) => d.id)));
  groups.push(["Other products approved in China", drugs.filter((d) => !grouped.has(d.id)).sort((a, b) => a.name.localeCompare(b.name))]);

  const growth = cn.works[String(y0)] ? Math.round(((cn.works[String(y1)] - cn.works[String(y0)]) / cn.works[String(y0)]) * 100) : undefined;

  return (
    <>
      <PageHeader kicker={<GroupKicker id="who"><span className="text-muted"> · </span><Link href="/countries/" className="kicker hover:text-foreground">Countries</Link></GroupKicker>}
        title="China: the second engine of cancer drug development"
        lede={`About ${F.cancerStats.newCases.replace("about ", "")} and ${F.cancerStats.deaths.replace("about ", "")}; ${fmt(cn.works[String(y1)])} oncology papers in ${y1} (up ${growth ?? "n/a"}% since ${y0}) and ${fmt(cn.trials ?? 0)} registered trials with a Chinese site. In one decade China went from importing every new cancer drug to approving its own PD-1 antibodies, ADCs, bispecifics, CAR-Ts and KRAS inhibitors and licensing them to Western pharma. This page pairs each problem with what is being done about it, and links every number to its source.`} />
      <Container className="pb-16">
        {/* ---------- Numbers ---------- */}
        <Section title="The numbers" aside={<span className="text-xs text-muted">National Cancer Center report on 2022; OpenAlex and ClinicalTrials.gov via the countries table</span>}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["New cases, 2022", F.cancerStats.newCases.replace("about ", "≈ ").replace(" new cancer cases in 2022", ""), F.cancerStats.source],
              ["Deaths, 2022", F.cancerStats.deaths.replace("about ", "≈ ").replace(" cancer deaths in 2022", ""), F.cancerStats.source],
              ["Age-standardised incidence", "201.61 per 100,000", F.cancerStats.source],
              ["Age-standardised mortality", "96.47 per 100,000", F.cancerStats.source],
              [`Oncology papers, ${y1}`, fmt(cn.works[String(y1)]), F.research.source],
              [`Growth ${y0} to ${y1}`, growth === undefined ? "n/a" : `+${growth}%`, F.research.source],
              ["Registered trials with a site in China", fmt(cn.trials ?? 0), F.research.source],
              ["Population", `${extra.population} million`, { label: "World Bank", url: "https://data.worldbank.org/indicator/SP.POP.TOTL" }],
            ].map(([label, value, src]) => (
              <div key={label as string} className="card p-4">
                <div className="text-xs text-muted">{label as string}</div>
                <div className="text-2xl font-semibold tabular-nums mt-1">{value as string}</div>
                <div className="text-[11px] mt-1"><Src s={src as { label: string; url: string }} /></div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted mt-3 max-w-4xl">The National Cancer Center&apos;s 2024 report: {F.cancerStats.topFive}; {F.cancerStats.trends}. Figures are {F.cancerStats.registries}. GLOBOCAN 2022 gives an age-standardised incidence of {extra.incidence} and mortality of {extra.mortality} per 100,000 for China on a different population standard (<a className="underline" href={extra.gcoUrl} rel="noopener">IARC fact sheet</a>).</p>
        </Section>

        {/* ---------- Problems paired with responses ---------- */}
        <Section title="Problems, and what is being done about them">
          <div className="grid gap-4">
            <Pair
              problem={<>Digestive cancers dominate. Stomach, liver and oesophageal cancer sit in the top five by deaths, driven by chronic hepatitis B, Helicobacter pylori, salted and pickled food, hot beverages and alcohol, and concentrated in rural high-incidence belts (Taihang mountains, Huai river basin, Qidong). Most are diagnosed late, where five-year survival is low.</>}
              doing={<>Universal newborn hepatitis B vaccination since 1992 (free since 2005) is already cutting liver cancer: the Qidong cluster-randomised trial showed {F.hbv.text}. The National Cancer Center runs endoscopic screening for oesophageal and stomach cancer in high-incidence rural counties and liver ultrasound plus AFP screening in HBV carriers. Chemo-immunotherapy from five Chinese PD-1 trials (<EntityLink e={g.get("jupiter-06")!} />, <EntityLink e={g.get("escort-1st")!} />, <EntityLink e={g.get("rationale-306")!} />, <EntityLink e={g.get("orient-16")!} />, <EntityLink e={g.get("cares-310")!} />) is now first-line standard in oesophageal, gastric and liver cancer, and the first Claudin 18.2 CAR-T (<EntityLink e={g.get("satricabtagene-autoleucel")!} />) was approved for gastric cancer in 2025.</>}
              sources={[F.hbv.source, F.cancerStats.source, { label: "National Cancer Center", url: "https://www.chinancpcn.org.cn/" }]} />
            <Pair
              problem={<>Survival lags rich countries. Age-standardised five-year relative survival for all cancers was {F.survival.text.split(" improved from ")[1]?.split(" to 43.7%")[0] ?? "30.9% in 2003 to 2005"} and remains well below the roughly two-thirds seen in the US, Japan and Western Europe, with wide urban-rural and east-west gaps in stage at diagnosis and access to specialist care.</>}
              doing={<>The Healthy China 2030 outline (2016) set a national target to {F.healthyChina2030.target}; the Healthy China Action (2019) made cancer one of fifteen special actions with screening, early diagnosis and standardised treatment goals. Survival has {F.survival.text.split("survival for all cancers ")[1]}. National quality-control centres, tumour boards and CSCO and CACA guidelines aim to standardise treatment across provinces.</>}
              sources={[F.healthyChina2030.source, F.survival.source, F.healthyChina2030.secondary]} />
            <Pair
              problem={<>Paying for innovation. Until 2017 most new targeted drugs and all PD-1 antibodies were self-pay, out of reach for the majority; catastrophic spending on cancer drugs was common, and a listed drug could still be unavailable if hospitals declined to stock it because of budget caps.</>}
              doing={<>The National Healthcare Security Administration (<EntityLink e={g.get("nhsa")!} />) now negotiates the National Reimbursement Drug List every year: {F.nrdl.text2017}; {F.nrdl.text2018}; since 2019 dozens of oncology drugs join each round at discounts usually above half, and {F.nrdl.textTrend}. Renewal rules cap further cuts for drugs already listed ({F.nrdl.textRenewal}), a dual-channel policy (2021) lets designated pharmacies dispense listed drugs when hospitals do not, and provincial supplementary insurance (huiminbao) covers some drugs still off the list. The trade-off: prices so low that some Western drugs are not launched in China, and cell therapies (list prices above CN¥ 1 million) remain unlisted.</>}
              sources={[F.nrdl.source2017, F.nrdl.source2018, F.nrdl.sourceTrend, F.nrdl.sourceRenewal, F.nrdl.nhsa]} />
            <Pair
              problem={<>China-only evidence travels badly. Registration trials run entirely in China with chemotherapy comparators (sintilimab&apos;s ORIENT-11) were rejected by the FDA in 2022, and camrelizumab plus rivoceranib has drawn three complete response letters over inspections and trial conduct, so Chinese PD-1s reached Western patients years late or not at all.</>}
              doing={<>The NMPA and CDE reforms since 2015 (backlog cleared, ICH membership 2017, acceptance of overseas data, breakthrough and conditional pathways) made Chinese trials faster; companies now run multiregional confirmatory studies (<EntityLink e={g.get("rationale-302")!} /> for tislelizumab, <EntityLink e={g.get("harmoni-3")!} /> for ivonescimab, ASTRIDE for serplulimab, FRESCO-2 for fruquintinib) and license Western rights to partners who run them. Tislelizumab, toripalimab, penpulimab, fruquintinib, zanubrutinib, ensartinib and ciltacabtagene autoleucel now hold FDA approvals.</>}
              sources={[{ label: "FDA ODAC, 10 February 2022 (sintilimab)", url: "https://www.fda.gov/advisory-committees/advisory-committee-calendar/february-10-2022-meeting-oncologic-drugs-advisory-committee-meeting-announcement-02102022" }, { label: "CDE", url: "https://www.cde.org.cn" }, { label: "NMPA", url: "https://www.nmpa.gov.cn" }]} />
            <Pair
              problem={<>Quantity over differentiation. More than a dozen PD-1 and PD-L1 antibodies are approved in China, many for the same indications, and the resulting price war has left most of them unprofitable; me-too kinase inhibitors crowd the EGFR, ALK and BTK classes.</>}
              doing={<>The next wave is differentiated: PD-1 x VEGF and PD-1 x CTLA-4 bispecifics (<EntityLink e={g.get("ivonescimab")!} />, <EntityLink e={g.get("cadonilimab")!} />), topoisomerase-payload ADCs (<EntityLink e={g.get("sacituzumab-tirumotecan")!} />, <EntityLink e={g.get("trastuzumab-rezetecan")!} />, <EntityLink e={g.get("izalontamab-brengitecan")!} />), fully human BCMA CAR-Ts and solid-tumour CAR-Ts, and BTK degraders. Western pharma is buying it: the deals below total tens of billions of dollars in headline value, most signed since 2023.</>}
              sources={[{ label: "Deals table below, each with the announcing company's newsroom", url: "#deals" }]} />
            <Pair
              problem={<>Nasopharyngeal carcinoma is endemic in Guangdong, Guangxi and Hong Kong, tied to Epstein-Barr virus, and until 2018 had no approved immunotherapy anywhere.</>}
              doing={<>Sun Yat-sen University Cancer Center trials under Jun Ma and colleagues set induction chemotherapy and EBV DNA-guided treatment; <EntityLink e={g.get("jupiter-02")!} /> made toripalimab the first PD-1 antibody approved for nasopharyngeal cancer in China (2021) and the US (2023), with penpulimab following in 2025. {F.npc.text.charAt(0).toUpperCase() + F.npc.text.slice(1)}, pointing to a screening route for endemic regions.</>}
              sources={[F.npc.source, { label: "JUPITER-02 (Nature Medicine 2021)", url: "https://doi.org/10.1038/s41591-021-01444-0" }]} />
          </div>
        </Section>

        {/* ---------- Regulators, payers, societies ---------- */}
        <Section title="Regulator, payer and the bodies that set practice">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{regulators.map((e) => <EntityCard key={e.id} e={e} />)}</div>
        </Section>

        {/* ---------- Approved products ---------- */}
        <Section title={`Products with an NMPA approval in the corpus (${drugs.length})`} aside={<Link href="/regulatory/regions/" className="text-sm underline">All regions</Link>}>
          <p className="text-sm text-muted mb-3 max-w-4xl">Domestic innovative products and the imports China approved, grouped by modality. Each product page lists the indication and year; the regional approvals table has {cnApprovals.length} products with an NMPA approval or conditional approval on record.</p>
          <div className="grid gap-4 lg:grid-cols-2">
            {groups.filter(([, list]) => list.length).map(([label, list]) => (
              <div key={label} className="card p-4">
                <div className="font-medium mb-2">{label} <span className="text-muted text-sm">({list.length})</span></div>
                <ChipList items={list} />
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- Trials ---------- */}
        <Section title={`Key trials (${trials.length})`}>
          <p className="text-sm text-muted mb-3 max-w-4xl">Registration trials of Chinese drugs, newest first. The ORIENT, RATIONALE, CameL, JUPITER, HARMONi, CAPSTONE and GEMSTONE programmes reproduced the Western PD-(L)1 results in Chinese populations; LEGEND-2 is where Carvykti began; FURLONG and AENEAS are the head-to-head EGFR trials.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-muted border-b"><th className="py-2 pr-3">Trial</th><th className="py-2 pr-3 hidden md:table-cell">Setting</th><th className="py-2 pr-3">Result</th><th className="py-2">Year</th></tr></thead>
              <tbody>
                {trials.map((t) => (
                  <tr key={t.id} className="border-b border-foreground/10 align-top">
                    <td className="py-2 pr-3 whitespace-nowrap"><EntityLink e={t} /></td>
                    <td className="py-2 pr-3 hidden md:table-cell text-muted max-w-md">{t.setting}</td>
                    <td className="py-2 pr-3">{t.result ?? t.tldr}</td>
                    <td className="py-2 tabular-nums text-muted">{t.yearReported ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ---------- Companies and deals ---------- */}
        <Section title={`Companies (${companies.length})`} aside={<Link href="/companies/" className="text-sm underline">All companies</Link>}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{companies.sort((a, b) => a.name.localeCompare(b.name)).map((e) => <EntityCard key={e.id} e={e} compact />)}</div>
        </Section>

        <Section id="deals" title={`Out-licensing and acquisitions (${chinaDeals.length})`} aside={<Link href="/deals/" className="text-sm underline">Deal map</Link>}>
          <p className="text-sm text-muted mb-3 max-w-4xl">Terms as announced by the parties: upfront is cash at signing, total is the headline figure including milestones. Where a number is not public the cell is empty.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-muted border-b"><th className="py-2 pr-3">Date</th><th className="py-2 pr-3">From</th><th className="py-2 pr-3">To</th><th className="py-2 pr-3">Asset</th><th className="py-2 pr-3">Upfront</th><th className="py-2 pr-3">Total</th><th className="py-2">Type</th></tr></thead>
              <tbody>
                {chinaDeals.map((d) => {
                  const from = d.from.id ? g.get(d.from.id) : undefined, to = d.to.id ? g.get(d.to.id) : undefined;
                  return (
                    <tr key={d.id} className="border-b border-foreground/10 align-top">
                      <td className="py-2 pr-3 whitespace-nowrap tabular-nums text-muted">{d.date}</td>
                      <td className="py-2 pr-3">{from ? <EntityLink e={from} /> : d.from.name}</td>
                      <td className="py-2 pr-3">{to ? <EntityLink e={to} /> : d.to.name}</td>
                      <td className="py-2 pr-3 max-w-sm"><a href={d.source} rel="noopener" className="underline decoration-dotted">{d.assetText}</a>{d.status === "terminated" ? <span className="ml-1 text-xs text-rose-600">terminated</span> : null}</td>
                      <td className="py-2 pr-3 whitespace-nowrap">{d.upfront ?? ""}</td>
                      <td className="py-2 pr-3 whitespace-nowrap">{d.total ?? ""}</td>
                      <td className="py-2 text-muted">{DEAL_TYPE_LABEL[d.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ---------- Institutions and people ---------- */}
        <Section title={`Institutions (${institutions.length})`} aside={<Link href="/institutions/" className="text-sm underline">Map and ranking</Link>}>
          <ChipList items={institutions.sort((a, b) => a.name.localeCompare(b.name))} />
        </Section>
        <Section title={`People (${people.length})`} aside={<Link href="/people/" className="text-sm underline">All people</Link>}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{people.sort((a, b) => a.name.localeCompare(b.name)).map((e) => <EntityCard key={e.id} e={e} compact />)}</div>
        </Section>

        {/* ---------- Sources ---------- */}
        <Section title="Sources and caveats">
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted max-w-4xl">
            <li><Src s={F.cancerStats.source} />: the National Cancer Center&apos;s official estimate for 2022; numbers are model projections from registry data, not counts.</li>
            <li><Src s={F.survival.source} />; <Src s={F.healthyChina2030.source} /> (Chinese); <Src s={F.healthyChina2030.secondary} />.</li>
            <li><Src s={F.hbv.source} />: cluster-randomised, Qidong, 1985 to 1990 birth cohorts, followed to 2013.</li>
            <li>NRDL: <Src s={F.nrdl.source2017} />; <Src s={F.nrdl.source2018} />; <Src s={F.nrdl.sourceTrend} />; <Src s={F.nrdl.sourceRenewal} />; <Src s={F.nrdl.nhsa} /> (official notices in Chinese).</li>
            <li><Src s={F.npc.source} />.</li>
            <li>Approvals: <a className="underline" href="https://www.nmpa.gov.cn" rel="noopener">NMPA</a> and <a className="underline" href="https://www.cde.org.cn" rel="noopener">CDE</a> notices (Chinese), with the company announcement and primary publication linked on each product and trial page. Research output: OpenAlex whole counting, which under-represents Chinese-language journals; trials: ClinicalTrials.gov sites, which misses studies registered only on ChiCTR.</li>
            <li>Deal terms are as announced by the parties and link to the announcing company&apos;s newsroom; Chinese company names follow their English filings.</li>
          </ul>
        </Section>
      </Container>
    </>
  );
}
