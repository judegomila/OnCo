import type { Metadata } from "next";
import Link from "next/link";
import { Portrait } from "@/components/Portrait";
import { graph } from "@/lib/graph";
import { routeFor, type Person } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Heroes and heroines",
  description: "The people whose lives, cases or campaigns changed cancer: patients who said yes to the first trial, families who built funds, advocates who changed the rules, and scientists who refused the odds.",
};

const SUGGEST_URL = "https://github.com/judegomila/OnCo/issues/new?template=suggest-edit.yml&title=hero";

type Role = "patient" | "carer" | "advocate" | "pioneer";
type Group = { id: string; title: string; lede: string; roles: Role[] };

/** Each hero appears once, placed by their primary role: the first role tag on the record after "hero". */
const GROUPS: Group[] = [
  { id: "patients", title: "Patients and families", lede: "People whose own illness, or a child's or a partner's, became a turning point: the first to take a new drug, the first to say so in public, the ones who turned a diagnosis into a fund or a campaign.", roles: ["patient", "carer"] },
  { id: "advocates", title: "Advocates and builders", lede: "People who built the institutions, coalitions and movements that moved money, changed rules and put patients in the room.", roles: ["advocate"] },
  { id: "pioneers", title: "Pioneers", lede: "Scientists and clinicians who saw something the field did not accept, and kept going until it did.", roles: ["pioneer"] },
];
const ROLES: Role[] = ["patient", "carer", "advocate", "pioneer"];
const ROLE_LABEL: Record<Role, string> = { patient: "Patient", carer: "Family", advocate: "Advocate", pioneer: "Pioneer" };

const primaryRole = (p: Person): Role => (p.tags.find((t): t is Role => (ROLES as string[]).includes(t)) ?? "pioneer");
const surname = (name: string) => name.replace(/^(Dame|Sir|Dr\.?)\s+/, "").replace(/"[^"]*"\s*/g, "").trim().split(/\s+/).pop() ?? name;

export default function Heroes() {
  const g = graph();
  const heroes = g.kind("person").filter((p) => p.tags.includes("hero"));
  const sections = GROUPS.map((grp) => ({ ...grp, members: heroes.filter((p) => grp.roles.includes(primaryRole(p))).sort((a, b) => surname(a.name).localeCompare(surname(b.name))) }));
  const counts = { patient: heroes.filter((p) => p.tags.includes("patient")).length, carer: heroes.filter((p) => p.tags.includes("carer")).length, advocate: heroes.filter((p) => p.tags.includes("advocate")).length, pioneer: heroes.filter((p) => p.tags.includes("pioneer")).length };

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="who" />}
        title="Heroes and heroines"
        lede="Cancer advances were carried by people. Patients who said yes to the first trial when nothing else had worked. Families who built funds from a lemonade stand, a radio broadcast, a marathon on one leg. Advocates who refused to be operated on without being asked. Scientists who kept going through decades of rejection. This page names some of them and links each to the drugs, trials and ideas their lives touched."
        right={<div className="flex gap-2"><Link href="/people/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">All people</Link><Link href="/bottlenecks/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium">Bottlenecks</Link></div>}
      />
      <Container className="pb-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted mb-2">
          <span>{heroes.length} people</span>
          <span aria-hidden>·</span>
          <span>{counts.patient} patients</span>
          <span>{counts.carer} carers and family</span>
          <span>{counts.advocate} advocates</span>
          <span>{counts.pioneer} pioneers</span>
          <span aria-hidden>·</span>
          <span>Public record only. Each record carries the date it was last checked.</span>
        </div>

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="mt-10">
            <div className="max-w-3xl mb-4">
              <h2 className="text-xl font-semibold tracking-tight leading-snug">{s.title}</h2>
              <p className="mt-1 text-[15px] text-muted leading-relaxed">{s.lede}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {s.members.map((p) => <HeroCard key={p.id} p={p} />)}
            </div>
          </section>
        ))}

        <section id="missing" className="mt-12 grid gap-4 lg:grid-cols-3">
          <a href={SUGGEST_URL} rel="noopener" className="card block p-5 lg:col-span-2">
            <div className="kicker mb-1">Tell us who is missing</div>
            <h2 className="text-lg font-semibold tracking-tight">Suggest a hero or heroine</h2>
            <p className="mt-1.5 text-[15px] text-muted leading-relaxed">
              Every entry here rests on a public source: a foundation page, an obituary, a published account. If someone changed cancer through their case, their campaign or their work and is not listed, open an issue with a link and a sentence on what changed because of them. Living private individuals are added only with their own public account.
            </p>
            <p className="mt-3 text-[13px] text-muted leading-relaxed border-l-2 border-border pl-3">
              <span className="font-medium text-foreground">Editor&rsquo;s note.</span> Two names were suggested for this page, recorded as &ldquo;Sid&rdquo; and &ldquo;Diana&rdquo;, the latter in connection with Jason Laster&rsquo;s wife&rsquo;s case. We could not identify either from public sources and have not added them, rather than guess. If you know who they are, please send a link.
            </p>
            <span className="mt-3 inline-block rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-medium">Open a suggestion on GitHub →</span>
          </a>
          <div className="card p-5">
            <div className="kicker mb-1">Why this matters</div>
            <p className="text-[15px] text-muted leading-relaxed">
              Almost every drug on this site exists because someone agreed to be the first to take it, and almost every screening programme fills up when a person, not a leaflet, tells their story. Yet patients still lack understanding, navigation and agency in their own care. The people on this page show what changes when they have it. See the bottleneck{" "}
              <Link href="/bottlenecks/b-patient-voice/" className="underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground text-foreground">Patients lack understanding, navigation and agency</Link>
              {" "}and the ideas attached to it.
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}

function HeroCard({ p }: { p: Person }) {
  const kind = ROLE_LABEL[primaryRole(p)];
  return (
    <Link href={routeFor(p)} className="card flex gap-4 p-4">
      <Portrait id={p.id} name={p.name} size={56} />
      <span className="min-w-0">
        <span className="kicker block">{kind}</span>
        <span className="block font-semibold leading-snug text-balance mt-0.5">{p.name}</span>
        <span className="block text-[13px] text-muted mt-0.5 leading-snug">{p.role}</span>
        <span className="block text-sm text-foreground/85 mt-2 leading-relaxed line-clamp-4">{p.tldr}</span>
      </span>
    </Link>
  );
}
