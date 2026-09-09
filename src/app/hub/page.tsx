import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { hubIdeas, hubIdeas2, hubIdeas3 } from "@/data/hub-ideas";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { statusClass } from "@/lib/text";

export const metadata: Metadata = pageMeta({ title: "Roadmap", description: "What OnCo is building, in waves, with the status of every idea.", path: "/hub/" });

export default function Hub() {
  const themes = [...new Set(hubIdeas.map((h) => h.theme))];
  const tone: Record<string, string> = { shipped: "approved", building: "phase-2", planned: "phase-1", proposed: "concept" };
  const counts = ["shipped", "building", "planned", "proposed"].map((s) => ({ s, n: hubIdeas.filter((h) => h.status === s).length }));
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Roadmap"
        lede="Product, data, and community ideas, distinct from the scientific ideas in the corpus. Each has a status. Argue with them in the repo." />
      <Container className="pb-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Wave one: the hub</h2>
        <div className="flex flex-wrap gap-2 mb-8 text-sm">{counts.map(({ s, n }) => <span key={s} className={`chip ${statusClass(tone[s])}`}>{n} {s}</span>)}</div>
        {themes.map((t) => (
          <section key={t} className="mt-8">
            <h2 className="text-lg font-semibold mb-3">{t}</h2>
            <ol className="card divide-y divide-border">
              {hubIdeas.filter((h) => h.theme === t).map((h) => (
                <li key={h.n} className="p-4 grid sm:grid-cols-[3rem_1fr_auto] gap-3">
                  <span className="font-mono text-muted tabular-nums">{String(h.n).padStart(2, "0")}</span>
                  <div><div className="font-medium">{h.title}</div><p className="text-sm text-muted mt-0.5">{h.why}</p></div>
                  <span className={`chip self-start ${statusClass(tone[h.status])}`}>{h.status}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
        <h2 className="text-2xl font-semibold tracking-tight mt-16 mb-2">Wave two: deeper, more useful, more powerful</h2>
        <p className="text-muted text-sm mb-6">Ideas proposed and largely built in the second wave.</p>
        <div className="flex flex-wrap gap-2 mb-8 text-sm">{["shipped", "building", "planned", "proposed"].map((s) => <span key={s} className={`chip ${statusClass(tone[s])}`}>{hubIdeas2.filter((h) => h.status === s).length} {s}</span>)}</div>
        {[...new Set(hubIdeas2.map((h) => h.theme))].map((t) => (
          <section key={t} className="mt-8">
            <h3 className="text-lg font-semibold mb-3">{t}</h3>
            <ol className="card divide-y divide-border">
              {hubIdeas2.filter((h) => h.theme === t).map((h) => (
                <li key={h.n} className="p-4 grid sm:grid-cols-[3rem_1fr_auto] gap-3">
                  <span className="font-mono text-muted tabular-nums">{String(h.n).padStart(2, "0")}</span>
                  <div><div className="font-medium">{h.title}</div><p className="text-sm text-muted mt-0.5">{h.why}</p></div>
                  <span className={`chip self-start ${statusClass(tone[h.status])}`}>{h.status}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
        <h2 className="text-2xl font-semibold tracking-tight mt-16 mb-2">Wave three: total information dominance</h2>
        <p className="text-muted text-sm mb-6">Bottlenecks, a thousand ideas, people, regions, countries, the live literature, and a design pass.</p>
        <div className="flex flex-wrap gap-2 mb-8 text-sm">{["shipped", "building", "planned", "proposed"].map((s) => <span key={s} className={`chip ${statusClass(tone[s])}`}>{hubIdeas3.filter((h) => h.status === s).length} {s}</span>)}</div>
        {[...new Set(hubIdeas3.map((h) => h.theme))].map((t) => (
          <section key={`w3-${t}`} className="mt-8">
            <h3 className="text-lg font-semibold mb-3">{t}</h3>
            <ol className="card divide-y divide-border">
              {hubIdeas3.filter((h) => h.theme === t).map((h) => (
                <li key={h.n} className="p-4 grid sm:grid-cols-[3rem_1fr_auto] gap-3">
                  <span className="font-mono text-muted tabular-nums">{String(h.n).padStart(2, "0")}</span>
                  <div><div className="font-medium">{h.title}</div><p className="text-sm text-muted mt-0.5">{h.why}</p></div>
                  <span className={`chip self-start ${statusClass(tone[h.status])}`}>{h.status}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </Container>
    </>
  );
}
