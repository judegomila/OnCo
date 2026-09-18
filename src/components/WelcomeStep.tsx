"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FacetSelect } from "./filters/FacetSelect";
import { CancerIcon } from "./CancerIcon";
import { useT } from "@/lib/i18n/ui";
import { ACCOUNT_ROLES, ROLE_MODE, saveAccountProfile, useProfile, type AccountRole } from "@/lib/profile";
import { pickMyCancer, useMyCancer } from "@/lib/use-my-cancer";
import { useMyCancerList } from "@/lib/use-my-cancer-list";

/** Line icons for the four roles, drawn like the other header glyphs (24 grid, 1.6 stroke). */
export function RoleIcon({ role, className = "h-4 w-4" }: { role: AccountRole; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {role === "patient" && <><circle cx="12" cy="7.5" r="3.5" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></>}
      {role === "caregiver" && <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><circle cx="17" cy="9.5" r="2.4" /><path d="M16.5 20c0-2.3 1.4-4 3.5-4.4" /></>}
      {role === "researcher" && <><path d="M9 4.5 13 3l3 7-4 1.5z" /><path d="M12.5 11.5 10 16" /><path d="M7 16.5h7" /><path d="M6 21h12" /><path d="M15.5 12.5a5.5 5.5 0 0 1-2 8.5" /></>}
      {role === "provider" && <><path d="M7 3v6a5 5 0 0 0 10 0V3" /><path d="M12 14v1.5a4.5 4.5 0 0 0 9 0v-2" /><circle cx="19.5" cy="11.5" r="2" /></>}
    </svg>
  );
}

/** A same-origin, absolute return path (never protocol-relative); anything else falls back to the signup page. */
export function safeReturnPath(p: string | null | undefined): string {
  return p && p.startsWith("/") && !p.startsWith("//") ? p : "/signup/";
}

/**
 * First sign-in welcome step (shown on /signup/ once a session has just been captured and no role is stored yet,
 * or reopened from the account menu with `?welcome=1`). Four role pills, an optional cancer chooser that writes the
 * same browser preference For me and the hubs read, a consent sentence, Continue and a quiet Skip. Everything stays
 * in this browser: the role goes to the per-user account profile, the cancer to the browser profile, nothing to a server.
 * The chooser's list (id, name, route, hub group) is fetched from /api/v1/my-cancers.json when this step mounts.
 */
export function WelcomeStep({ userId, back, initialRole, onDone }: { userId: string; back: string; initialRole?: AccountRole; onDone?: () => void }) {
  const { t } = useT();
  const router = useRouter();
  const [role, setRole] = useState<AccountRole | undefined>(initialRole);
  const my = useMyCancer();
  const cancers = useMyCancerList();
  const [, updateProfile] = useProfile();
  const mine = pickMyCancer(cancers, my.id);
  const options = useMemo(() => cancers.map((c) => ({ value: c.id, label: c.name, group: c.group ? c.group[0].toUpperCase() + c.group.slice(1) : undefined, icon: <CancerIcon cancerId={c.id} className="h-4 w-4" /> })), [cancers]);

  const finish = () => {
    if (!role) return;
    saveAccountProfile(userId, { role, cancer: my.id, consentAt: new Date().toISOString() });
    updateProfile({ mode: ROLE_MODE[role] });
    onDone?.();
    router.push(back);
  };

  return (
    <section className="card p-5 sm:p-6 space-y-5" aria-labelledby="welcome-title">
      <div className="space-y-1">
        <h2 id="welcome-title" className="text-lg font-semibold tracking-tight">{t("account.welcome.title")}</h2>
        <p className="text-sm text-muted">{t("account.welcome.lede")}</p>
      </div>
      <div role="group" aria-labelledby="welcome-title" className="flex flex-wrap gap-2">
        {ACCOUNT_ROLES.map((r) => {
          const on = role === r;
          return (
            <button key={r} type="button" onClick={() => setRole(r)} aria-pressed={on} title={t(`account.welcome.hint.${r}`)} className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition ${on ? "border-accent bg-accent-soft text-accent" : "border-border bg-card hover:border-border-strong hover:bg-foreground/5"}`}>
              <RoleIcon role={r} className="h-4 w-4 shrink-0" />{t(`account.welcome.role.${r}`)}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted" aria-live="polite">{role ? t(`account.welcome.hint.${role}`) : t("account.welcome.pickFirst")}</p>
      <div className="space-y-1.5">
        <div className="text-sm font-medium">{t("account.welcome.cancer")}</div>
        <div className="flex flex-wrap items-center gap-2">
          <FacetSelect label="Cancer" options={options} value={my.id ?? null} onChange={(v) => my.set(typeof v === "string" && v ? v : undefined)} allLabel={t("account.welcome.cancerNone")} width="w-full sm:w-72" />
          {mine && <Link href={mine.route} className="chip border border-accent/40 bg-accent-soft text-accent" title={mine.name}><CancerIcon cancerId={mine.id} className="h-3.5 w-3.5" />{mine.name}</Link>}
        </div>
        <p className="text-xs text-muted">{t("account.welcome.cancerHint")}</p>
      </div>
      <p className="text-sm text-muted">{t("account.welcome.consent")}</p>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={finish} disabled={!role} className="btn btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50" title={role ? t("account.welcome.continueHint") : t("account.welcome.pickFirst")}>{t("account.welcome.continue")}</button>
        <Link href={back} onClick={() => onDone?.()} className="text-center text-sm text-muted underline-offset-2 hover:text-foreground hover:underline sm:text-start" title={t("account.welcome.skipHint")}>{t("account.welcome.skip")}</Link>
      </div>
    </section>
  );
}
