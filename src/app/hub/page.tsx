import type { Metadata } from "next";
import { hubIdeas } from "@/data/hub-ideas";
import { Container, PageHeader } from "@/components/ui";
import { statusClass } from "@/lib/text";

export const metadata: Metadata = { title: "50 ideas for the hub", description: "Product and community ideas for making OnCo the central hub for the war on cancer, with status." };

export default function Hub() {
  const themes = [...new Set(hubIdeas.map((h) => h.theme))];
  const tone: Record<string, string> = { shipped: "approved", building: "phase-2", planned: "phase-1", proposed: "concept" };
  const counts = ["shipped", "building", "planned", "proposed"].map((s) => ({ s, n: hubIdeas.filter((h) => h.status === s).length }));
  return (
    <>
      <PageHeader kicker={<span className="kicker">Project</span>} title="Fifty ideas for making OnCo the central hub for the war on cancer"
        lede="Product, data, and community ideas, distinct from the scientific ideas in the corpus. Each has a status. Argue with them in the repo." />
      <Container className="pb-16">
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
      </Container>
    </>
  );
}
