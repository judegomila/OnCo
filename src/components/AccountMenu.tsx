"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { accountEnabled, captureSession, loadSession, onAccountChange, provider, pushWatchlist, sendMagicLink, signOut, startSignIn, syncWatchlist, type Session } from "@/lib/account";
import { useT } from "@/lib/i18n/ui";
import { clearAccountProfile, useAccountProfile, useProfile } from "@/lib/profile";
import { pickMyCancer, shortCancerName } from "@/lib/use-my-cancer";
import { useMyCancerList } from "@/lib/use-my-cancer-list";
import { CancerIcon } from "./CancerIcon";
import { RoleIcon } from "./WelcomeStep";

/**
 * The profile icon in the header. With accounts configured (lib/account.ts) it signs in by magic link and keeps the
 * watchlist across devices; otherwise it captures an email for updates through NEXT_PUBLIC_SIGNUP_ACTION (a Buttondown
 * or Listmonk form endpoint). `inline` is the fuller card used on /saved/; the default is the compact header control.
 * Signed in, the avatar opens a small menu: who you are (role chip and cancer, both browser-only), "Change who you
 * are" (reopens the welcome step on /signup/), "Clear my choices" and "Sign out". The remembered cancer is named by
 * resolving its id against the list useMyCancerList fetches once a cancer is set (nothing is fetched otherwise).
 */
const SIGNUP_ACTION = process.env.NEXT_PUBLIC_SIGNUP_ACTION ?? "";
const SIGNUP_LIST = process.env.NEXT_PUBLIC_SIGNUP_LIST ?? "";

function ProfileIcon({ size = 18 }: { size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></svg>;
}
function SwapGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" /></svg>;
}
function EraseGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></svg>;
}
function ExitGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M10 4H5v16h5" /><path d="M14 8l4 4-4 4" /><path d="M9 12h9" /></svg>;
}

/** Where "Change who you are" sends the reader: the signup page with the welcome step open, coming back here after. */
function changeHref(): string {
  if (typeof window === "undefined") return "/signup/?welcome=1";
  const here = window.location.pathname + window.location.search;
  return here.startsWith("/signup/") ? "/signup/?welcome=1" : `/signup/?welcome=1&back=${encodeURIComponent(here)}`;
}

/** The signed-in reader's role and remembered cancer as chips: the role reopens the welcome step, the cancer opens its page. */
function ProfileChips({ session, className = "" }: { session: Session; className?: string }) {
  const { t } = useT();
  const [account] = useAccountProfile(session.user.id);
  const [profile] = useProfile();
  const mine = pickMyCancer(useMyCancerList(!!profile.cancerId), profile.cancerId);
  const roleLabel = account.role ? t(`account.welcome.role.${account.role}`) : undefined;
  return (
    <span className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <Link href={changeHref()} className={`chip border ${account.role ? "border-accent/40 bg-accent-soft text-accent hover:border-accent" : "border-border bg-card text-muted hover:text-foreground"}`} title={roleLabel ? t("account.welcome.roleChip", { role: roleLabel }) : t("account.welcome.noRoleHint")}>
        {account.role ? <RoleIcon role={account.role} className="h-3 w-3" /> : <ProfileIcon size={12} />}{roleLabel ?? t("account.welcome.noRole")}
      </Link>
      {mine && <Link href={mine.route} className="chip border border-border bg-card hover:bg-foreground/5" title={mine.name}><CancerIcon cancerId={mine.id} className="h-3 w-3" />{shortCancerName(mine.name)}</Link>}
    </span>
  );
}

export function AccountMenu({ inline = false, className = "" }: { inline?: boolean; className?: string }) {
  const { t } = useT();
  const [session, setSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [synced, setSynced] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const wrap = useRef<HTMLSpanElement>(null);
  const [, updateProfile] = useProfile();

  useEffect(() => {
    if (!accountEnabled) return;
    let alive = true;
    (async () => {
      const s = (await captureSession()) ?? loadSession();
      if (!alive) return;
      setSession(s);
      if (s) { const r = await syncWatchlist(); if (alive && r.ok) setSynced(r.count); }
    })();
    const off = onAccountChange((s) => setSession(s));
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onList = () => { if (!loadSession()) return; clearTimeout(timer); timer = setTimeout(() => { pushWatchlist().then((ok) => { if (ok) setSynced((n) => (n ?? 0)); }); }, 800); };
    window.addEventListener("onco:watchlist", onList);
    return () => { alive = false; off(); window.removeEventListener("onco:watchlist", onList); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const d = dialog.current; if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // The signed-in menu closes on Escape or a click outside it.
  useEffect(() => {
    if (!menu) return;
    const onDoc = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setMenu(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [menu]);

  if (!accountEnabled && inline) return null;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("sending");
    setState((await sendMagicLink(email.trim())) ? "sent" : "error");
  };
  /** Forget the role (per-user store) and the remembered cancer and reading mode (browser profile). Nothing to undo server-side: none of it left the browser. */
  const clearChoices = () => {
    if (session) clearAccountProfile(session.user.id);
    updateProfile({ cancerId: undefined, mode: "patient" });
    setMenu(false);
  };

  const dialogEl = (
    <dialog ref={dialog} onClose={() => setOpen(false)} className="backdrop:bg-black/50 bg-card text-foreground rounded-xl border border-border p-0 w-[min(94vw,26rem)]">
      <form onSubmit={send} className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3"><h2 className="text-base font-semibold">{t("account.title")}</h2><button type="button" onClick={() => setOpen(false)} className="rounded border border-border px-2 py-0.5 text-sm hover:bg-foreground/5" aria-label="Close">×</button></div>
        <p className="text-sm text-muted">{t("account.why")}</p>
        {state === "sent" ? <p className="text-sm rounded-lg border border-accent/40 bg-accent-soft text-accent px-3 py-2">{t("account.sent")}</p> : (
          <>
            <label className="block text-sm"><span className="text-muted">{t("account.email")}</span><input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" /></label>
            <button type="submit" disabled={state === "sending"} className="btn w-full justify-center">{t("account.send")}</button>
            {state === "error" && <p className="text-sm text-muted">{t("account.error")}</p>}
          </>
        )}
      </form>
    </dialog>
  );
  const captureEl = (
    <dialog ref={dialog} onClose={() => setOpen(false)} className="backdrop:bg-black/50 bg-card text-foreground rounded-xl border border-border p-0 w-[min(94vw,26rem)]">
      <form action={SIGNUP_ACTION || undefined} method="post" target="_blank" onSubmit={() => { if (SIGNUP_ACTION) setState("sent"); }} className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3"><h2 className="text-base font-semibold">{t("signup.title")}</h2><button type="button" onClick={() => setOpen(false)} className="rounded border border-border px-2 py-0.5 text-sm hover:bg-foreground/5" aria-label="Close">×</button></div>
        <p className="text-sm text-muted">{t("signup.why")}</p>
        {state === "sent" ? <p className="text-sm rounded-lg border border-accent/40 bg-accent-soft text-accent px-3 py-2">{t("signup.done")}</p> : SIGNUP_ACTION ? (
          <>
            <label className="block text-sm"><span className="text-muted">{t("account.email")}</span><input name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2" /></label>
            {SIGNUP_LIST && <input type="hidden" name="l" value={SIGNUP_LIST} />}
            <input type="hidden" name="tag" value="onco.cc" />
            <button type="submit" className="btn btn-primary w-full justify-center">{t("signup.button")}</button>
          </>
        ) : <p className="text-sm text-muted">{t("signup.soon")}</p>}
      </form>
    </dialog>
  );

  if (inline) {
    return (
      <div className={`card p-4 text-sm ${className}`}>
        {session ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span><span className="text-accent" aria-hidden>●</span> {t("account.synced")}{synced !== null ? ` · ${synced}` : ""} <span className="text-muted">· {session.user.email}</span></span>
              <button type="button" onClick={() => signOut()} className="chip border border-border bg-card hover:bg-foreground/5"><ExitGlyph className="h-3 w-3" />{t("account.signOut")}</button>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <ProfileChips session={session} />
              <Link href={changeHref()} className="chip border border-border bg-card hover:bg-foreground/5" title={t("account.welcome.change")}><SwapGlyph className="h-3 w-3" />{t("account.welcome.change")}</Link>
              <button type="button" onClick={clearChoices} className="chip border border-border bg-card hover:bg-foreground/5 text-muted" title={t("account.welcome.clearHint")}><EraseGlyph className="h-3 w-3" />{t("account.welcome.clear")}</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-muted">{t("account.why")}</span>
            <button type="button" onClick={() => (provider === "workos" ? startSignIn() : setOpen(true))} className="btn">{t("account.signIn")}</button>
          </div>
        )}
        {dialogEl}
      </div>
    );
  }

  const item = "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-start hover:bg-foreground/5";
  return (
    <span ref={wrap} className={`relative ${className}`}>
      {session ? (
        <>
          <button type="button" onClick={() => setMenu((m) => !m)} aria-haspopup="menu" aria-expanded={menu} title={t("account.welcome.menu", { email: session.user.email })} aria-label={t("account.welcome.menu", { email: session.user.email })} className="ctl ctl-icon">
            <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-[11px] font-semibold">{(session.user.email[0] ?? "?").toUpperCase()}</span>
          </button>
          {menu && (
            <div role="menu" aria-label={t("account.welcome.menu", { email: session.user.email })} className="absolute end-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-1rem)] space-y-3 rounded-xl border border-border bg-card p-3 text-sm shadow-lg">
              <div className="min-w-0">
                <div className="truncate font-medium">{session.user.name ?? session.user.email}</div>
                {session.user.name && <div className="truncate text-xs text-muted">{session.user.email}</div>}
              </div>
              <ProfileChips session={session} />
              <div className="flex flex-col border-t border-border pt-2">
                <Link role="menuitem" href={changeHref()} onClick={() => setMenu(false)} className={item} title={t("account.welcome.change")}><SwapGlyph className="h-4 w-4 text-muted" />{t("account.welcome.change")}</Link>
                <button role="menuitem" type="button" onClick={clearChoices} className={item} title={t("account.welcome.clearHint")}><EraseGlyph className="h-4 w-4 text-muted" />{t("account.welcome.clear")}</button>
                <button role="menuitem" type="button" onClick={() => { setMenu(false); signOut(); }} className={item} title={t("account.signOut")}><ExitGlyph className="h-4 w-4 text-muted" />{t("account.signOut")}</button>
              </div>
            </div>
          )}
        </>
      ) : (
        provider === "workos" ? <button type="button" onClick={() => startSignIn()} className="ctl ctl-icon" title={t("account.signIn")} aria-label={t("account.signIn")}><ProfileIcon /></button> : <Link href="/signup/" className="ctl ctl-icon" title={accountEnabled ? t("account.title") : t("signup.title")} aria-label={t("signup.icon")}><ProfileIcon /></Link>
      )}
      {accountEnabled ? dialogEl : captureEl}
    </span>
  );
}
