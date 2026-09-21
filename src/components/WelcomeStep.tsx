"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FacetSelect } from "./filters/FacetSelect";
import { CancerIcon } from "./CancerIcon";
import { useT, type UiKey } from "@/lib/i18n/ui";
import { startSignIn } from "@/lib/account";
import { ACCOUNT_ROLES, ROLE_MODE, saveAccountProfile, useProfile, type AccountRole } from "@/lib/profile";
import { pickMyCancer, useMyCancer } from "@/lib/use-my-cancer";
import { useMyCancerList } from "@/lib/use-my-cancer-list";
import { REGION_META, REGION_ORDER, useRegion } from "@/lib/region";
import { LEVELS, useLayer, type Level } from "@/lib/layer";
import { readPreferences } from "@/lib/preferences";
import { welcomeHref } from "@/lib/after-sign-in";

export { safeReturnPath } from "@/lib/after-sign-in";

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

/** Line icons for the three data views: technical (full page of lines), plain (two lines), simple (one line and a dot). */
export function LevelIcon({ level, className = "h-4 w-4" }: { level: Level; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {level === "technical" && <><path d="M4 6h16" /><path d="M4 10h16" /><path d="M4 14h11" /><path d="M4 18h8" /></>}
      {level === "plain" && <><path d="M4 8h16" /><path d="M4 13h11" /><circle cx="5" cy="18" r="1" /></>}
      {level === "simple" && <><path d="M4 10h13" /><circle cx="5" cy="15.5" r="1" /><path d="M9 15.5h6" /></>}
    </svg>
  );
}

const PILL = "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition";
const pillClass = (on: boolean) => `${PILL} ${on ? "border-accent bg-accent-soft text-accent" : "border-border bg-card hover:border-border-strong hover:bg-foreground/5"}`;

/**
 * The welcome step, the whole content of /welcome/ (src/components/WelcomePage.tsx mounts it once the session
 * is known). Four role pills, an optional cancer chooser that writes the same browser preference For me and the
 * hubs read, two optional preference rows (country, data view) prefilled from the header toggles' stores, a consent
 * sentence, Continue and a quiet Skip. The role and a copy of the preferences go to the per-user account profile
 * (written here, then pushed to the account's Supabase row by src/lib/cloud-sync.ts when the cloud is configured),
 * the cancer to the browser profile. The chooser's list (id, name, route, hub group) is fetched from
 * /api/v1/my-cancers.json when this step mounts.
 *
 * Without a `userId` (signed out, or the session not yet read) the step shows a short note and the sign-in control
 * in place of Continue; the pills still work because the cancer, country and view are browser preferences.
 */
export function WelcomeStep({ userId, back, initialRole, onDone }: { userId?: string; back: string; initialRole?: AccountRole; onDone?: () => void }) {
  const { t } = useT();
  const router = useRouter();
  const [role, setRole] = useState<AccountRole | undefined>(initialRole);
  const my = useMyCancer();
  const cancers = useMyCancerList();
  const [, updateProfile] = useProfile();
  const { region, setRegion } = useRegion();
  const [layer, updateLayer] = useLayer();
  const mine = pickMyCancer(cancers, my.id);
  const options = useMemo(() => cancers.map((c) => ({ value: c.id, label: c.name, group: c.group ? c.group[0].toUpperCase() + c.group.slice(1) : undefined, icon: <CancerIcon cancerId={c.id} className="h-4 w-4" /> })), [cancers]);

  const finish = () => {
    if (!role || !userId) return;
    saveAccountProfile(userId, { role, cancer: my.id, consentAt: new Date().toISOString(), ...readPreferences() });
    updateProfile({ mode: ROLE_MODE[role] });
    onDone?.();
    router.push(back);
  };

  return (
    <section className="space-y-7" aria-label={t("account.welcome.title")}>
      <div className="space-y-3">
        <div role="group" aria-label={t("account.welcome.title")} className="flex flex-wrap gap-2">
          {ACCOUNT_ROLES.map((r) => {
            const on = role === r;
            return (
              <button key={r} type="button" onClick={() => setRole(r)} aria-pressed={on} title={t(`account.welcome.hint.${r}`)} className={pillClass(on)}>
                <RoleIcon role={r} className="h-4 w-4 shrink-0" />{t(`account.welcome.role.${r}`)}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted" aria-live="polite">{role ? t(`account.welcome.hint.${role}`) : t("account.welcome.pickFirst")}</p>
      </div>

      <div className="space-y-1.5">
        <div className="text-sm font-medium">{t("account.welcome.cancer")}</div>
        <div className="flex flex-wrap items-center gap-2">
          <FacetSelect label="Cancer" options={options} value={my.id ?? null} onChange={(v) => my.set(typeof v === "string" && v ? v : undefined)} allLabel={t("account.welcome.cancerNone")} width="w-full sm:w-72" />
          {mine && <Link href={mine.route} className="chip border border-accent/40 bg-accent-soft text-accent" title={mine.name}><CancerIcon cancerId={mine.id} className="h-3.5 w-3.5" />{mine.name}</Link>}
        </div>
        <p className="text-xs text-muted">{t("account.welcome.cancerHint")}</p>
      </div>

      <div className="space-y-1.5">
        <div className="text-sm font-medium">{t("account.welcome.region")}</div>
        <div role="group" aria-label={t("account.welcome.region")} className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setRegion(null)} aria-pressed={region === null} title={t("region.globalBlurb")} className={pillClass(region === null)}>
            <span aria-hidden className="text-base leading-none">🌐</span>{t("region.global")}
          </button>
          {REGION_ORDER.map((r) => {
            const on = region === r;
            return (
              <button key={r} type="button" onClick={() => setRegion(r)} aria-pressed={on} title={REGION_META[r].regulator} className={pillClass(on)}>
                <span aria-hidden className="text-base leading-none">{REGION_META[r].flag}</span>{t(`country.${r}` as UiKey)}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted">{t("account.welcome.regionHint")}</p>
      </div>

      <div className="space-y-1.5">
        <div className="text-sm font-medium">{t("account.welcome.view")}</div>
        <div role="group" aria-label={t("account.welcome.view")} className="flex flex-wrap gap-2">
          {LEVELS.map((l) => {
            const on = layer.level === l.code;
            return (
              <button key={l.code} type="button" onClick={() => updateLayer({ level: l.code })} aria-pressed={on} title={t(`level.${l.code}.blurb` as UiKey)} className={pillClass(on)}>
                <LevelIcon level={l.code} className="h-4 w-4 shrink-0" />{t(`level.${l.code}` as UiKey)}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted">{t("account.welcome.viewHint")}</p>
      </div>

      <p className="text-sm text-muted">{t("account.welcome.consent")}</p>

      {userId ? (
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={finish} disabled={!role} className="btn btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50" title={role ? t("account.welcome.continueHint") : t("account.welcome.pickFirst")}>{t("account.welcome.continue")}</button>
          <Link href={back} onClick={() => onDone?.()} className="text-center text-sm text-muted underline-offset-2 hover:text-foreground hover:underline sm:text-start" title={t("account.welcome.skipHint")}>{t("account.welcome.skip")}</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center" data-testid="welcome-signed-out">
          <button type="button" onClick={() => startSignIn(welcomeHref(back))} className="btn btn-primary w-full sm:w-auto" title={t("account.signInCta")}>{t("account.signInCta")}</button>
          <p className="text-sm text-muted">{t("account.welcome.signedOut")}</p>
        </div>
      )}
    </section>
  );
}
