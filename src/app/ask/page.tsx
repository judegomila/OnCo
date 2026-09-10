import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMeta } from "@/lib/seo";
import { benchmark } from "@/data/benchmark";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { AskOnco, type AskExample } from "@/components/AskOnco";

export const metadata: Metadata = pageMeta({ title: "Ask OnCo", description: "Ask a question in plain words and get an answer assembled from OnCo records, every sentence cited and linked to its page. No language model, nothing invented.", path: "/ask/" });

export default function AskPage() {
  // A spread of benchmark questions as starting points: two per audience, easiest first.
  const examples: AskExample[] = (["patient", "clinician", "analyst"] as const).flatMap((aud) =>
    benchmark.filter((q) => q.audience === aud).sort((a, b) => a.difficulty - b.difficulty).slice(0, 2).map((q) => ({ question: q.question, audience: aud }))
  );
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Ask OnCo" lede="Ask in plain words. The answer is built only from sentences already on OnCo record pages, each one numbered and linked, so you can check every claim at its source. Nothing is generated and nothing leaves your browser." />
      <Container className="pb-16">
        <Suspense><AskOnco examples={examples} /></Suspense>
      </Container>
    </>
  );
}
