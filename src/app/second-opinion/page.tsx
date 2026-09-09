import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Cancer, type Institution } from "@/lib/schema";
import { trialLeadership } from "@/lib/trial-leadership";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { SecondOpinion, type SoCancer, type SoCentre, type SoCountry, type SoPerson } from "@/components/SecondOpinion";
import { referralRoutes } from "@/data/referral-routes";

export const metadata: Metadata = pageMeta({ title: "Second-opinion finder", description: "Choose your cancer and country: the expert centres OnCo links to that cancer, the people who work on it, and how to get referred for a second opinion where you live, with sources.", path: "/second-opinion/" });

const countryName = (() => {
  const dn = new Intl.DisplayNames(["en-GB"], { type: "region" });
  return (code: string) => { try { return dn.of(code) ?? code; } catch { return code; } };
})();

/** Same selection as ExpertCentres: institutions linked to the cancer directly or via its pipeline, trials, guideline refs and history. */
function centresFor(c: Cancer, rank: Map<string, number>): SoCentre[] {
  const g = graph();
  const found = new Map<string, { inst: Institution; via: Set<string> }>();
  const add = (inst: Institution, via: string) => {
    const cur = found.get(inst.id) ?? { inst, via: new Set<string>() };
    cur.via.add(via);
    found.set(inst.id, cur);
  };
  for (const inst of g.forCancer(c.id).get("institution") ?? []) if (inst.kind === "institution") add(inst, "this cancer");
  const relatedIds = [...c.pipeline, ...c.trials, ...c.standardOfCare.flatMap((s) => s.refs), ...c.history.flatMap((h) => h.refs)];
  for (const id of new Set(relatedIds)) {
    const e = g.get(id);
    if (!e) continue;
    for (const inst of g.neighbours(id).get("institution") ?? []) if (inst.kind === "institution") add(inst, e.name);
  }
  return [...found.values()]
    .sort((a, b) => (a.inst.newsweekOncology2026 ?? 999) - (b.inst.newsweekOncology2026 ?? 999) || b.via.size - a.via.size || a.inst.name.localeCompare(b.inst.name))
    .map(({ inst, via }) => ({ id: inst.id, name: inst.name, route: routeFor(inst), city: inst.city, country: inst.country, newsweek: inst.newsweekOncology2026, nci: inst.nci, leadershipRank: rank.get(inst.id), via: [...via] }));
}

function peopleFor(c: Cancer): SoPerson[] {
  const g = graph();
  const base = c.name.replace(/\s*\(.*?\)\s*$/, "").toLowerCase();
  const needles = [base, ...c.aka.map((a) => a.toLowerCase())].filter((s) => s.length >= 4);
  const linked = new Set((g.neighbours(c.id).get("person") ?? []).map((p) => p.id));
  return g.kind("person")
    .filter((p) => linked.has(p.id) || p.specialisms.some((s) => needles.some((n) => s.toLowerCase().includes(n))))
    .sort((a, b) => Number(linked.has(b.id)) - Number(linked.has(a.id)) || a.name.localeCompare(b.name))
    .map((p) => { const inst = p.institutionId ? g.get(p.institutionId) : undefined; return { id: p.id, name: p.name, role: p.role, route: routeFor(p), institutionId: p.institutionId, institutionName: inst?.name, specialisms: p.specialisms }; });
}

export default function SecondOpinionPage() {
  const g = graph();
  const rank = new Map(trialLeadership().map((r) => [r.institution.id, r.rank]));
  const cancers: SoCancer[] = g.kind("cancer").map((c) => ({ id: c.id, name: c.name, group: c.group, route: routeFor(c), centres: centresFor(c, rank), people: peopleFor(c) }));
  const counts = new Map<string, number>();
  for (const i of g.kind("institution")) counts.set(i.country, (counts.get(i.country) ?? 0) + 1);
  const countries: SoCountry[] = [...counts.entries()].map(([code, n]) => ({ code, label: countryName(code), n })).sort((a, b) => b.n - a.n || a.label.localeCompare(b.label));

  return (
    <>
      <PageHeader kicker={<GroupKicker id="who" />} title="Second-opinion finder"
        lede="Who to ask, where they are, and how to get referred. Pick your cancer and country to see the centres OnCo links to that cancer (yours first), the clinicians and scientists who work on it, and a plain-language guide to how second opinions work in your health system: who refers, what records to send, remote review services, cost and timing, with sources." />
      <Container className="pb-16">
        <SecondOpinion cancers={cancers} routes={referralRoutes} countries={countries} />
      </Container>
    </>
  );
}
