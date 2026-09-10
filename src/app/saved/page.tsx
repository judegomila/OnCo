import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { SavedViews } from "@/components/SavedViews";

export const metadata: Metadata = pageMeta({ title: "Saved views and watchlist", description: "Your saved table views and watched pages, with what changed since you last looked. Stored in your browser only.", path: "/saved/", noindex: true });

export default function SavedPage() {
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Saved" lede="Tables you saved and pages you watch, with what changed since you last looked. Everything here lives in this browser; nothing is sent anywhere, and there is no account." />
      <Container className="pb-16">
        <SavedViews />
      </Container>
    </>
  );
}
