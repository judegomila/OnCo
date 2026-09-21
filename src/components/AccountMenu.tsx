"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { accountEnabled, captureSession, displayName, loadSession, onAccountChange, provider, pushWatchlist, sendMagicLink, signOut, startSignIn, syncWatchlist, type Session } from "@/lib/account";
import { welcomeHref } from "@/lib/after-sign-in";
import { deleteAccountData, useCloudSync } from "@/lib/cloud-sync";
import { useT, type UiKey } from "@/lib/i18n/ui";
import { clearAccountProfile, useAccountProfile, useProfile, type AccountRole } from "@/lib/profile";
import { pickMyCancer, shortCancerName } from "@/lib/use-my-cancer";
import { useMyCancerList } from "@/lib/use-my-cancer-list";
import { REGION_META, useRegion } from "@/lib/region";
import { LANGS, useLayer } from "@/lib/layer";
import { useTheme } from "@/lib/theme";
import { CancerIcon } from "./CancerIcon";
import { LevelIcon, RoleIcon } from "./WelcomeStep";
import { THEME_ICON } from "./ThemeToggle";

/**
 * The profile control in the header. With accounts configured (lib/account.ts) it signs in through WorkOS (or by
 * magic link with Supabase) and keeps the watchlist across devices; otherwise it captures an email for updates
 * through NEXT_PUBLIC_SIGNUP_ACTION (a Buttondown or Listmonk form endpoint). `inline` is the fuller card used on
 * /saved/; the default is the compact header control.
 *
 * Signed out: the primary pill "Sign in/up". Signed in: a pill in the same 40px box with an initial circle
 * and a green dot, the person's first name and, once a role is stored, the role as a quiet chip ("Jude · Patient");
 * below sm only the circle and dot remain. It opens a small menu: who you are (role chip and cancer), the four
 * preferences as chips that press the matching header toggle, "Change who you are" (/welcome/), "Clear my
 * choices", "Delete my account data" and "Sign out", plus a quiet status line: "Synced" when the cloud copy of the
 * profile (src/lib/cloud-sync.ts, Supabase under the WorkOS token) is up to date, "Saved on this device only" when
 * the last write failed, nothing when the cloud is not configured. The remembered cancer is named by resolving its
 * id against the list useMyCancerList fetches once a cancer is set (nothing is fetched otherwise).
 */
const SIGNUP_ACTION = process.env.NEXT_PUBLIC_SIGNUP_ACTION ?? "";
const SIGNUP_LIST = process.env.NEXT_PUBLIC_SIGNUP_LIST ?? "";
/** The signed-out header pill: the shared 40px control box in the accent with white text, a square on phones. */
const CTA_CLASS = "ctl btn-primary w-10 px-0 sm:w-auto sm:px-2.5 gap-1.5 text-sm font-medium";

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
function CloudGlyph({ className = "h-3 w-3" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 18a4 4 0 0 1-.6-7.95A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7Z" /></svg>;
}
function DeviceGlyph({ className = "h-3 w-3" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M10 18h4" /></svg>;
}
function GlobeGlyph({ className = "h-3 w-3" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" /></svg>;
}

/** Where "Change who you are" sends the reader: the welcome page, coming back here after. */
function changeHref(): string {
  if (typeof window === "undefined") return welcomeHref("/");
  return welcomeHref(window.location.pathname + window.location.search);
}

/** Press one of the header toggles (data-onco-toggle) from a chip in the menu: the region list, the layer dialog or the theme cycle. */
function pressToggle(name: "region" | "layer" | "theme") {
  const el = document.querySelector<HTMLElement>(`[data-onco-toggle="${name}"]`);
  if (!el) return;
  el.focus();
  el.click();
}

/**
 * The signed-in header pill: initial circle with a green dot, first name and, when stored, the role as a quiet chip.
 * Exported without state so the header test can render it with a session (a session never exists on the server).
 */
export function SignedInPill({ session, role, open, onToggle }: { session: Session; role?: AccountRole; open: boolean; onToggle: () => void }) {
  const { t } = useT();
  const first = displayName(session.user);
  const roleLabel = role ? t(`account.welcome.role.${role}`) : undefined;
  return (
    <button type="button" onClick={onToggle} aria-haspopup="menu" aria-expanded={open} title={t("account.hello", { email: session.user.email })} aria-label={t("account.welcome.menu", { email: session.user.email })} className="ctl gap-2 px-1.5 sm:px-2.5" data-testid="signed-in-pill">
      <span aria-hidden className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white text-[11px] font-semibold">
        {(first[0] ?? session.user.email[0] ?? "?").toUpperCase()}
        <span className="absolute -bottom-0.5 -end-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
      </span>
      <span className="hidden sm:inline text-[13px] font-medium leading-none">{first}</span>
      {roleLabel && <span aria-hidden className="hidden sm:inline text-muted">·</span>}
      {roleLabel && role && <span className="chip hidden sm:inline-flex border border-accent/40 bg-accent-soft text-accent"><RoleIcon role={role} className="h-3 w-3" />{roleLabel}</span>}
    </button>
  );
}

/** The signed-in reader's role and remembered cancer as chips: the role opens the welcome page, the cancer opens its page. */
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

/** Country, data view, language and theme as chips reading the toggles' own stores; each presses the matching header toggle. */
function PreferenceChips({ onPress }: { onPress?: () => void }) {
  const { t } = useT();
  const { region } = useRegion();
  const [layer] = useLayer();
  const [theme] = useTheme();
  const chip = "chip border border-border bg-card hover:bg-foreground/5";
  const press = (name: "region" | "layer" | "theme") => { onPress?.(); pressToggle(name); };
  const regionLabel = region ? t(`country.${region}` as UiKey) : t("region.global");
  const langLabel = LANGS.find((l) => l.code === layer.lang)?.native ?? layer.lang;
  const themeLabel = t(`theme.${theme}` as UiKey);
  const levelLabel = t(`level.${layer.level}` as UiKey);
  return (
    <span className="flex flex-wrap items-center gap-1.5" data-testid="preference-chips">
      <button type="button" onClick={() => press("region")} className={chip} title={t("account.welcome.prefChip", { name: t("account.welcome.pref.region"), value: regionLabel })}>{region ? <span aria-hidden className="text-[11px] leading-none">{REGION_META[region].flag}</span> : <GlobeGlyph />}{regionLabel}</button>
      <button type="button" onClick={() => press("layer")} className={chip} title={t("account.welcome.prefChip", { name: t("account.welcome.pref.view"), value: levelLabel })}><LevelIcon level={layer.level} className="h-3 w-3" />{levelLabel}</button>
      <button type="button" onClick={() => press("layer")} className={chip} lang={layer.lang} title={t("account.welcome.prefChip", { name: t("account.welcome.pref.language"), value: langLabel })}><span aria-hidden className="text-[10px] font-semibold leading-none">Aa</span>{langLabel}</button>
      <button type="button" onClick={() => press("theme")} className={chip} title={t("account.welcome.prefChip", { name: t("account.welcome.pref.theme"), value: themeLabel })}><span className="inline-flex [&>svg]:h-3 [&>svg]:w-3">{THEME_ICON[theme]}</span>{themeLabel}</button>
    </span>
  );
}

/** The quiet cloud status line: "Synced" or "Saved on this device only"; nothing while the cloud is off or has not answered yet. */
function SyncNote({ className = "" }: { className?: string }) {
  const { t } = useT();
  const cloud = useCloudSync();
  if (cloud !== "synced" && cloud !== "local") return null;
  return (
    <span role="status" data-testid="cloud-sync" data-state={cloud} className={`inline-flex items-center gap-1 text-xs text-muted ${className}`}>
      {cloud === "synced" ? <CloudGlyph className="h-3 w-3 text-accent" /> : <DeviceGlyph />}{cloud === "synced" ? t("account.cloud.synced") : t("account.cloud.local")}
    </span>
  );
}

export function AccountMenu({ inline = false, className = "" }: { inline?: boolean; className?: string }) {
  const { t } = useT();
  const [session, setSession] = useState<Session | null>(null);
  const [deleted, setDeleted] = useState<"idle" | "busy" | "done" | "failed">("idle");
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [synced, setSynced] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const wrap = useRef<HTMLSpanElement>(null);
  const [, updateProfile] = useProfile();
  const [account] = useAccountProfile(session?.user.id);

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
  /** Forget the role and preferences (per-user store) and the remembered cancer and reading mode (browser profile). The emptied profile is pushed to the cloud by the sync listener, so the account row is cleared as well. */
  const clearChoices = () => {
    if (session) clearAccountProfile(session.user.id);
    updateProfile({ cancerId: undefined, mode: "patient" });
    setMenu(false);
  };
  /** Delete the account's cloud rows (profile and saved items) and then every local copy; the sign-in itself stays with WorkOS. */
  const deleteData = async () => {
    if (!session || deleted === "busy") return;
    if (!window.confirm(t("account.cloud.deleteConfirm"))) return;
    setDeleted("busy");
    setDeleted((await deleteAccountData(session)) ? "done" : "failed");
  };
  const deletedNote = deleted === "done" ? <p role="status" className="text-xs text-muted">{t("account.cloud.deleted")}</p> : deleted === "failed" ? <p role="status" className="text-xs text-muted">{t("account.cloud.deleteFailed")}</p> : null;

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
              <span className="inline-flex flex-wrap items-center gap-2">{provider === "workos" ? <SyncNote /> : <span><span className="text-accent" aria-hidden>●</span> {t("account.synced")}{synced !== null ? ` · ${synced}` : ""}</span>} <span className="text-muted">· {session.user.email}</span></span>
              <button type="button" onClick={() => signOut()} className="chip border border-border bg-card hover:bg-foreground/5"><ExitGlyph className="h-3 w-3" />{t("account.signOut")}</button>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <ProfileChips session={session} />
              <PreferenceChips />
              <Link href={changeHref()} className="chip border border-border bg-card hover:bg-foreground/5" title={t("account.welcome.change")}><SwapGlyph className="h-3 w-3" />{t("account.welcome.change")}</Link>
              <button type="button" onClick={clearChoices} className="chip border border-border bg-card hover:bg-foreground/5 text-muted" title={t("account.welcome.clearHint")}><EraseGlyph className="h-3 w-3" />{t("account.welcome.clear")}</button>
              <button type="button" onClick={deleteData} disabled={deleted === "busy"} className="chip border border-border bg-card hover:bg-foreground/5 text-muted disabled:opacity-50" title={t("account.cloud.deleteHint")}><EraseGlyph className="h-3 w-3" />{t("account.cloud.delete")}</button>
            </div>
            {deletedNote}
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
          <SignedInPill session={session} role={account.role} open={menu} onToggle={() => setMenu((m) => !m)} />
          {menu && (
            <div role="menu" aria-label={t("account.welcome.menu", { email: session.user.email })} className="absolute end-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-1rem)] space-y-3 rounded-xl border border-border bg-card p-3 text-sm shadow-lg">
              <div className="min-w-0">
                <div className="truncate font-medium">{session.user.name ?? session.user.email}</div>
                {session.user.name && <div className="truncate text-xs text-muted">{session.user.email}</div>}
              </div>
              <ProfileChips session={session} />
              <PreferenceChips onPress={() => setMenu(false)} />
              <SyncNote />
              {deletedNote}
              <div className="flex flex-col border-t border-border pt-2">
                <Link role="menuitem" href={changeHref()} onClick={() => setMenu(false)} className={item} title={t("account.welcome.change")}><SwapGlyph className="h-4 w-4 text-muted" />{t("account.welcome.change")}</Link>
                <button role="menuitem" type="button" onClick={clearChoices} className={item} title={t("account.welcome.clearHint")}><EraseGlyph className="h-4 w-4 text-muted" />{t("account.welcome.clear")}</button>
                <button role="menuitem" type="button" onClick={deleteData} disabled={deleted === "busy"} className={`${item} disabled:opacity-50`} title={t("account.cloud.deleteHint")}><EraseGlyph className="h-4 w-4 text-muted" />{t("account.cloud.delete")}</button>
                <button role="menuitem" type="button" onClick={() => { setMenu(false); signOut(); }} className={item} title={t("account.signOut")}><ExitGlyph className="h-4 w-4 text-muted" />{t("account.signOut")}</button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Signed out: the primary pill, "Sign in/up". Icon only below sm (a 40px square), icon and label from sm up.
           Rendered as a link to /signup/ so a click works before the script has attached (slow connections showed a seven second window); once hydrated the click starts the PKCE flow in place. */
        provider === "workos"
          ? <Link href="/signup/" onClick={(e) => { e.preventDefault(); startSignIn(); }} className={CTA_CLASS} title={t("account.signInCta")} aria-label={t("account.signInCta")}><ProfileIcon /><span className="hidden sm:inline">{t("account.signInCta")}</span></Link>
          : <Link href="/signup/" className={CTA_CLASS} title={t("account.signInCta")} aria-label={t("account.signInCta")}><ProfileIcon /><span className="hidden sm:inline">{t("account.signInCta")}</span></Link>
      )}
      {accountEnabled ? dialogEl : captureEl}
    </span>
  );
}
