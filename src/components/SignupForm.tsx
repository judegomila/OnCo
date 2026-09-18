"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { accountEnabled, captureSession, loadSession, onAccountChange, provider, sendMagicLink, signInPending, signOut, startSignIn, takeReturnPath, type Session } from "@/lib/account";
import { afterSignInPath, welcomeHref } from "@/lib/after-sign-in";
import { useT } from "@/lib/i18n/ui";
import { getAccountProfile, useAccountProfile } from "@/lib/profile";
import { RoleIcon } from "./WelcomeStep";

const ACTION = process.env.NEXT_PUBLIC_SIGNUP_ACTION ?? "";
const LIST = process.env.NEXT_PUBLIC_SIGNUP_LIST ?? "";

/**
 * Account sign-up. With WorkOS configured one button opens AuthKit (email code, password, Google or passkey) and the
 * user is recorded there; with Supabase it sends a magic link; otherwise it posts the address to the list provider
 * named in NEXT_PUBLIC_SIGNUP_ACTION. If nothing is configured the form says so instead of pretending to save the address.
 *
 * WorkOS returns to this page with `?code=`. While that code is being exchanged the form shows "Signing you in";
 * as soon as the session arrives it leaves: a reader with no stored role goes to /welcome/?back=<the page they
 * started from>, a reader with one goes straight back to that page (src/lib/after-sign-in.ts). The newsletter
 * box is never shown to someone who has just signed in. A reader who is already signed in and opens this page
 * sees the hello card with their role chip, which links to /welcome/.
 */
export function SignupForm() {
  const { t } = useT();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [session, setSession] = useState<Session | null>(null);
  const [completing, setCompleting] = useState(false);
  const [account] = useAccountProfile(session?.user.id);
  useEffect(() => {
    if (!accountEnabled) return;
    let alive = true;
    // A `?code=` in the address bar means WorkOS has just returned: show "Signing you in" rather than the sign-in card while the code is exchanged.
    const raf = requestAnimationFrame(() => { if (alive && signInPending()) setCompleting(true); });
    const arrive = (s: Session | null) => {
      if (!alive) return;
      setSession(s);
      if (!s) { setCompleting(false); return; }
      const returned = takeReturnPath();
      if (returned === null) { setCompleting(false); return; }
      // A sign-in has just completed: decide once, before any newsletter box, and leave this page.
      setCompleting(true);
      router.replace(afterSignInPath({ hasRole: !!getAccountProfile(s.user.id).role, back: returned }));
    };
    captureSession().then((s) => arrive(s ?? loadSession()));
    const off = onAccountChange(arrive);
    return () => { alive = false; cancelAnimationFrame(raf); off(); };
  }, [router]);
  const configured = accountEnabled || !!ACTION;
  const send = async (e: React.FormEvent) => {
    if (provider === "supabase") { e.preventDefault(); if (!email.includes("@")) return; setState("sending"); setState((await sendMagicLink(email.trim())) ? "sent" : "error"); return; }
    setState("sent");
  };
  if (completing) return (
    <div className="card p-5 flex items-center gap-3 text-sm" role="status" aria-live="polite">
      <span aria-hidden className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
      <span>{t("account.welcome.completing")}</span>
    </div>
  );
  if (session) return (
    <div className="card p-5 flex flex-wrap items-center justify-between gap-3 text-sm">
      <span><span className="text-accent" aria-hidden>●</span> {t("account.hello", { email: session.user.name ? `${session.user.name} (${session.user.email})` : session.user.email })}</span>
      <span className="flex flex-wrap items-center gap-1.5">
        <Link href={welcomeHref("/signup/")} className={`chip border ${account.role ? "border-accent/40 bg-accent-soft text-accent" : "border-border bg-card"} hover:opacity-90`} title={account.role ? t("account.welcome.roleChip", { role: t(`account.welcome.role.${account.role}`) }) : t("account.welcome.noRoleHint")}>
          {account.role ? <><RoleIcon role={account.role} className="h-3 w-3" />{t(`account.welcome.role.${account.role}`)}</> : t("account.welcome.noRole")}
        </Link>
        <button type="button" onClick={() => signOut()} className="chip border border-border bg-card hover:bg-foreground/5">{t("account.signOut")}</button>
      </span>
    </div>
  );
  if (provider === "workos") return (
    <div className="card p-5 space-y-3">
      <button type="button" onClick={() => startSignIn("/saved/")} className="btn btn-primary w-full justify-center">{t("account.continue")}</button>
      <p className="text-xs text-muted">{t("account.providerNote")}</p>
    </div>
  );
  if (state === "sent") return <p className="rounded-lg border border-accent/40 bg-accent-soft text-accent px-4 py-3">{accountEnabled ? t("account.sent") : t("signup.done")}</p>;
  if (!configured) return (
    <div className="card p-5 space-y-2 text-sm">
      <p>{t("signup.soon")}</p>
    </div>
  );
  return (
    <form action={accountEnabled ? undefined : ACTION} method="post" target={accountEnabled ? undefined : "_blank"} onSubmit={send} className="card p-5 space-y-3">
      <label className="block text-sm"><span className="text-muted">{t("account.email")}</span><input name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2" /></label>
      {!accountEnabled && LIST && <input type="hidden" name="l" value={LIST} />}
      {!accountEnabled && <input type="hidden" name="tag" value="onco.cc" />}
      <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full justify-center">{accountEnabled ? t("account.send") : t("signup.button")}</button>
      {state === "error" && <p className="text-sm text-muted">{t("account.error")}</p>}
      <p className="text-xs text-muted">{t("signup.why")}</p>
    </form>
  );
}
