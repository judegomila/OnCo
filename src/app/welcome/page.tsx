import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { WebPageJsonLd } from "@/components/JsonLd";
import { T } from "@/components/T";
import { WelcomePage } from "@/components/WelcomePage";

/**
 * The first-sign-in step as its own page. The signup form sends a freshly signed-in reader here when no role is
 * stored (`/welcome/?back=<path>`, src/lib/after-sign-in.ts); the account menu's "Change who you are" comes here
 * too. Continue and Skip return to the validated `back` path, else the home page. Personal, so not indexed.
 */
const TITLE = "Tell us two things";
const DESCRIPTION = "Who you are (patient, caregiver, researcher or medical provider) and, if you like, your cancer, plus your country and data view. Kept in your browser with your signed-in account, never sent anywhere.";
export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/welcome/", noindex: true });

export default function WelcomeRoute() {
  return (
    <>
      <WebPageJsonLd path="/welcome/" name={`${TITLE} · OnCo`} description={DESCRIPTION} />
      <PageHeader kicker={<GroupKicker id="learn" />} title={<T k="account.welcome.title" fallback={TITLE} />} seed="welcome" ledeNode={<T k="account.welcome.lede" />} />
      <Container className="pb-16 max-w-3xl space-y-8">
        <WelcomePage />
        <p className="text-sm text-muted">What is stored and where is set out in the <Link className="underline" href="/privacy/">privacy policy</Link>; your watchlist and saved views are on the <Link className="underline" href="/saved/">Saved</Link> page.</p>
      </Container>
    </>
  );
}
