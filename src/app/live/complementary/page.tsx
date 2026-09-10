import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { ComplementaryBrowser, type ComplementaryRow } from "@/components/ComplementaryBrowser";
import { EvidenceGradeLegend } from "@/components/EvidenceGradeChip";
import { WhatIsBeingDone } from "@/components/WhatIsBeingDone";
import { COMPLEMENTARY_INDEX } from "@/data/complementary";
import { EVIDENCE_GRADES, GRADE_META } from "@/lib/complementary";

export const metadata: Metadata = pageMeta({
  title: "Complementary and supportive approaches",
  description: "Acupuncture, mindfulness, yoga, exercise, herbs, diets, cannabis, cold caps and alternative therapies: what the randomised trials and guidelines show, graded honestly from strong evidence to evidence of harm, with sources.",
  path: "/live/complementary/",
});

export default function ComplementaryPage() {
  const g = graph();
  const rows: ComplementaryRow[] = COMPLEMENTARY_INDEX.map((c) => {
    const e = g.must(c.id);
    return { id: e.id, name: e.name, route: routeFor(e), tldr: e.tldr, grade: c.grade, uses: c.uses, line: c.line, guideline: c.guideline, status: e.status };
  });
  const counts = Object.fromEntries(EVIDENCE_GRADES.map((gr) => [gr, rows.filter((r) => r.grade === gr).length])) as Record<string, number>;
  const johnson = g.get("paper-johnson-alternative-medicine-jnci-2018");
  const instead = g.get("alternative-medicine-instead-of-treatment");
  const integrative = g.get("integrative-oncology");
  const supplements = g.get("dietary-supplements-treatment-interactions");

  return (
    <>
      <PageHeader kicker={<GroupKicker id="live" />} title="Complementary and supportive approaches"
        lede={`Most people with cancer try something alongside their treatment: acupuncture, a class, a supplement, a diet. Some of it has good randomised evidence and belongs in the cancer centre; some is harmless comfort; some interacts with treatment or is sold as a cure. This page grades ${rows.length} approaches by the evidence for the purpose they are used for, from the trials and guidelines that exist, and links each to its own page with sources. Solution first: ${counts.strong} have strong evidence and ${counts.moderate} some evidence for a symptom that matters.`} />
      <Container className="pb-16">
        <div className="grid gap-4 lg:grid-cols-[1fr_320px] mb-8">
          <div className="card p-5">
            <div className="kicker mb-2">Alongside, never instead</div>
            <p className="text-sm leading-relaxed">
              The single most important finding in this area is not about any one therapy. In a matched analysis of the US National Cancer Database, people with curable breast, lung or bowel cancer who chose alternative medicine instead of surgery, chemotherapy, radiotherapy or hormone therapy were two and a half times as likely to die during follow-up, and more than five times as likely with breast cancer{johnson && <> (<Link className="underline" href={routeFor(johnson)}>Johnson et al., JNCI 2018</Link>)</>}. Complementary approaches used with treatment did not carry that risk once treatment refusal was accounted for. Everything below is graded on that basis: as an addition to standard care, for the symptom it is used for.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-3">
              {instead && <Link className="underline" href={routeFor(instead)}>Alternative medicine instead of treatment</Link>}
              {integrative && <Link className="underline" href={routeFor(integrative)}>Evidence-based integrative oncology</Link>}
              {supplements && <Link className="underline" href={routeFor(supplements)}>Supplement interactions</Link>}
              <Link className="underline" href="/interactions/">Drug interaction checker</Link>
            </div>
          </div>
          <div className="card p-5">
            <div className="kicker mb-2">How the grades work</div>
            <ul className="text-sm space-y-1.5">
              {EVIDENCE_GRADES.map((gr) => <li key={gr} className="flex items-center justify-between gap-2"><span className={`chip ${GRADE_META[gr].tone}`}>{GRADE_META[gr].label}</span><span className="tabular-nums text-muted">{counts[gr]}</span></li>)}
            </ul>
            <p className="text-[11px] text-muted mt-3">A grade says how much and what kind of evidence exists for the stated purpose, not how large the benefit is. Full definitions below the list.</p>
          </div>
        </div>

        <ComplementaryBrowser rows={rows} />

        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold tracking-tight mb-3">What the grades mean</h2>
          <EvidenceGradeLegend />
        </section>

        <section className="mt-10 max-w-3xl text-sm text-muted space-y-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground mb-1">How to use this with your team</h2>
          <p>Tell your oncology team everything you take or do, including teas, capsules and clinics abroad; the useful reaction is a conversation, not a lecture. The approaches graded strong or some evidence are what evidence-based integrative oncology services offer inside cancer centres, and asking whether yours has one is reasonable. Anything graded harm should be stopped or never started during treatment; anything graded insufficient is a personal choice with money and time, as long as it is not a substitute.</p>
          <p>Sources are the SIO-ASCO guidelines (pain 2022, anxiety and depression 2023, fatigue 2024), the SIO 2017 breast cancer guideline endorsed by ASCO in 2018, the ASCO 2024 cannabis guideline, MASCC/ISOO mucositis guidelines 2020, Cochrane reviews, NCI PDQ integrative medicine summaries, Memorial Sloan Kettering&apos;s About Herbs database and the primary trials named on each page. Numbers appear only where the linked source states them. OnCo is orientation, not medical advice.</p>
          <p>Related: <Link className="underline" href="/live/hair/">hair loss prevention and regrowth</Link> · <Link className="underline" href="/fronts/nutrition-lifestyle/">diet, exercise and lifestyle</Link> · <Link className="underline" href="/fronts/supportive-care/">supportive care</Link> · <Link className="underline" href="/side-effects/">side effects, symptom first</Link>.</p>
        </section>

        <div className="mt-10"><WhatIsBeingDone topic="side-effects" /></div>
      </Container>
    </>
  );
}
