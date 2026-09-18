"use client";

import { useEffect, useState } from "react";
import { accountEnabled, captureSession, loadSession, onAccountChange, provider, sendMagicLink, signOut, startSignIn, takeReturnPath, type Session } from "@/lib/account";
import { useT } from "@/lib/i18n/ui";
import { getAccountProfile, useAccountProfile } from "@/lib/profile";
import { RoleIcon, safeReturnPath, WelcomeStep } from "./WelcomeStep";

const ACTION = process.env.NEXT_PUBLIC_SIGNUP_ACTION ?? "";
const LIST = process.env.NEXT_PUBLIC_SIGNUP_LIST ?? "";

/**
 * Account sign-up. With WorkOS configured one button opens AuthKit (email code, password, Google or passkey) and the
 * user is recorded there; with Supabase it sends a magic link; otherwise it posts the address to the list provider
 * named in NEXT_PUBLIC_SIGNUP_ACTION. If nothing is configured the form says so instead of pretending to save the address.
 *
 * After a fresh sign-in (captureSession leaves the return path behind) a reader with no stored role sees the
 * WelcomeStep; the account menu reopens it with `/signup/?welcome=1&back=<path>`.
 */
export function SignupForm() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [session, setSession] = useState<Session | null>(null);
  const [welcome, setWelcome] = useState<{ back: string } | null>(null);
  const [account] = useAccountProfile(session?.user.id);
  useEffect(() => {
    if (!accountEnabled) return;
    let alive = true;
    const arrive = (s: Session | null) => {
      setSession(s);
      if (!s) return;
      const p = new URLSearchParams(window.location.search);
      const reopened = p.get("welcome") === "1";
      const returned = takeReturnPath();
      if (returned === null && !reopened) return;
      if (reopened || !getAccountProfile(s.user.id).role) setWelcome({ back: safeReturnPath(reopened ? p.get("back") : returned) });
    };
    captureSession().then((s) => { if (alive) arrive(s ?? loadSession()); });
    const off = onAccountChange((s) => { if (alive) arrive(s); });
    return () => { alive = false; off(); };
  }, []);
  const configured = accountEnabled || !!ACTION;
  const send = async (e: React.FormEvent) => {
    if (provider === "supabase") { e.preventDefault(); if (!email.includes("@")) return; setState("sending"); setState((await sendMagicLink(email.trim())) ? "sent" : "error"); return; }
    setState("sent");
  };
  // Client-only branch (a session never exists on the server), so the stored role can be read directly to preselect the pill.
  if (session && welcome) return <WelcomeStep key={session.user.id} userId={session.user.id} back={welcome.back} initialRole={account.role ?? getAccountProfile(session.user.id).role} onDone={() => setWelcome(null)} />;
  if (session) return (
    <div className="card p-5 flex flex-wrap items-center justify-between gap-3 text-sm">
      <span><span className="text-accent" aria-hidden>●</span> {t("account.hello", { email: session.user.name ? `${session.user.name} (${session.user.email})` : session.user.email })}</span>
      <span className="flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={() => setWelcome({ back: "/signup/" })} className={`chip border ${account.role ? "border-accent/40 bg-accent-soft text-accent" : "border-border bg-card"} hover:opacity-90`} title={account.role ? t("account.welcome.roleChip", { role: t(`account.welcome.role.${account.role}`) }) : t("account.welcome.noRoleHint")}>
          {account.role ? <><RoleIcon role={account.role} className="h-3 w-3" />{t(`account.welcome.role.${account.role}`)}</> : t("account.welcome.noRole")}
        </button>
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
