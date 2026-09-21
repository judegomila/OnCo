import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { SignupForm } from "@/components/SignupForm";

export const metadata: Metadata = pageMeta({ title: "Stay in the loop", description: "Leave your email and OnCo will write when something big changes in cancer research: approvals, failed trials, guideline changes. No spam, one click to unsubscribe.", path: "/signup/" });

/** The newsletter page. Accounts are not made here: sign in and sign up live on the separate signed-in site, me.onco.cc. */
export default function SignupPage() {
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Stay in the loop" lede="Leave your email and OnCo will write when something big changes in cancer research: new approvals, trials that read out or fail, guideline changes. One message when it matters, no spam, one click to unsubscribe." />
      <Container className="pb-16 max-w-xl space-y-6">
        <SignupForm />
        <div className="text-sm text-muted space-y-2">
          <p>What we store: only the email address you type here, and it goes from your browser straight to the mailing-list provider, never to OnCo. Nothing else on onco.cc is personal: your <Link className="underline" href="/saved/">watchlist and saved views</Link> and your cancer choice stay in this browser and are never sent anywhere. The site sets no advertising trackers; Google Analytics counts visits, as the <Link className="underline" href="/privacy/">privacy policy</Link> says.</p>
          <p>Looking for an account? Accounts live on the signed-in site, <a className="underline" href="https://me.onco.cc/">me.onco.cc</a>, under its own <a className="underline" href="https://me.onco.cc/privacy/">privacy notice</a>. Use <em>Sign in/up</em> in the header to go there and come back to the page you were on.</p>
        </div>
      </Container>
    </>
  );
}
