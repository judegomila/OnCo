import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { graph } from "@/lib/graph";
import { CancerIcon } from "@/components/CancerIcon";
import { FrontIcon } from "@/components/FrontIcon";
import { benchmark } from "@/data/benchmark";

export const metadata: Metadata = pageMeta({ title: "Teaching packs", description: "A slide deck and quiz for every cancer and every front of the war on cancer, generated from the corpus: TL;DR, standard of care, history, pipeline, key trials, sources in the speaker notes. Print to PDF.", path: "/teach/" });

export default function TeachIndex() {
  const g = graph();
  const cancers = g.kind("cancer");
  const fronts = [...g.kind("section")].sort((a, b) => a.order - b.order);
  const groups = [...new Set(cancers.map((c) => c.group))].sort();
  const quizFor = (id: string) => benchmark.filter((q) => q.entities.includes(id)).length;

  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Teaching packs"
        lede={`${cancers.length} cancers and ${fronts.length} fronts, each as a slide deck built from its page: what it is, standard of care by setting, how we got here, what is coming, the key trials, open problems, a quiz drawn from the open benchmark, and speaker notes that cite the sources. Open a deck, press Print, and you have a handout.`} />
      <Container className="pb-16">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Cancers</h2>
          {groups.map((grp) => (
            <div key={grp} className="mb-6">
              <div className="kicker mb-2">{grp}</div>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {cancers.filter((c) => c.group === grp).map((c) => {
                  const q = quizFor(c.id);
                  return (
                    <li key={c.id}>
                      <Link href={`/teach/${c.id}/`} className="card flex items-center gap-3 p-3 hover:bg-foreground/[0.03]">
                        <CancerIcon cancerId={c.id} className="h-8 w-8 shrink-0" />
                        <div className="min-w-0">
                          <div className="font-medium leading-snug">{c.name}</div>
                          <div className="text-xs text-muted">{c.standardOfCare.length} settings · {c.history.length} events · {c.pipeline.length} in pipeline{q ? ` · ${q} quiz question${q === 1 ? "" : "s"}` : ""}</div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Fronts</h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {fronts.map((s) => {
              const techs = (g.incoming(s.id).get("technology") ?? []).length;
              const q = quizFor(s.id);
              return (
                <li key={s.id}>
                  <Link href={`/teach/${s.id}/`} className="card flex items-center gap-3 p-3 hover:bg-foreground/[0.03]">
                    <FrontIcon id={s.id} className="h-8 w-8 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium leading-snug">{s.name}</div>
                      <div className="text-xs text-muted">{techs} technolog{techs === 1 ? "y" : "ies"}{q ? ` · ${q} quiz question${q === 1 ? "" : "s"}` : ""}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-12 max-w-3xl text-sm text-muted space-y-2">
          <h2 className="text-xl font-semibold text-foreground mb-1">How to use a pack</h2>
          <p>Each deck is the page, re-cut for a room: one idea per slide, the technical detail in the speaker notes, every claim traceable to the record and its sources. Toggle <em>speaker notes</em> to see what to say and what to cite; toggle <em>quiz answers</em> before or after the class. <em>Print / save PDF</em> gives one slide per page, with notes if they are showing.</p>
          <p>Decks are generated at build time from the corpus, so they are as current, and as incomplete, as the page. Spotted an error? Fix it once through <Link className="underline" href="/suggest/">Suggest an edit</Link> and the deck updates with the page. Slides are CC BY-NC 4.0: reuse them with attribution to OnCo.</p>
        </section>
      </Container>
    </>
  );
}
