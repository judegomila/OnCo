import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { SavedViews } from "@/components/SavedViews";

export const metadata: Metadata = pageMeta({ title: "Saved", description: "Your saved table views and watched pages, with what changed since you last looked. Stored in your browser only.", path: "/saved/", noindex: true });

export default function SavedPage() {
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Saved" lede="Tables you saved and pages you watch, with what changed since you last looked. Everything here lives in this browser; nothing is sent anywhere, and there is no account." />
      <Container className="pb-16">
        <p className="text-sm text-muted mb-6 max-w-3xl">Two lists live here. <strong className="text-foreground">Watched pages</strong>: press <em>Watch</em> in the sidebar of any object page and it is listed below with the date it last changed, so you can see at a glance what moved since your last visit. <strong className="text-foreground">Saved views</strong>: every table keeps its filters, search and sort in the address bar, and <em>Save view</em> stores that address under a name so you can come back to exactly the same table. Both lists can be exported as a file and imported in another browser. Good places to start: <Link className="underline" href="/explore/">Explore</Link>, the <Link className="underline" href="/pipeline/">pipeline</Link>, or any <Link className="underline" href="/cancers/">cancer page</Link>.</p>
        <SavedViews />
      </Container>
    </>
  );
}
