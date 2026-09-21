"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/ui";

const ACTION = process.env.NEXT_PUBLIC_SIGNUP_ACTION ?? "";
const LIST = process.env.NEXT_PUBLIC_SIGNUP_LIST ?? "";

/**
 * The newsletter box on /signup/. It posts the address from the browser straight to the list provider named in
 * NEXT_PUBLIC_SIGNUP_ACTION (a Buttondown or Listmonk form endpoint; NEXT_PUBLIC_SIGNUP_LIST is Listmonk's list id),
 * tagged onco.cc, in a new tab; OnCo itself never receives it. With no provider configured the box says so instead
 * of pretending to save the address. Accounts are not here: they live on the signed-in site, me.onco.cc.
 */
export function SignupForm() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (sent) return <p className="rounded-lg border border-accent/40 bg-accent-soft text-accent px-4 py-3">{t("signup.done")}</p>;
  if (!ACTION) return (
    <div className="card p-5 space-y-2 text-sm">
      <p>{t("signup.soon")}</p>
    </div>
  );
  return (
    <form action={ACTION} method="post" target="_blank" onSubmit={() => setSent(true)} className="card p-5 space-y-3">
      <label className="block text-sm"><span className="text-muted">{t("account.email")}</span><input name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2" /></label>
      {LIST && <input type="hidden" name="l" value={LIST} />}
      <input type="hidden" name="tag" value="onco.cc" />
      <button type="submit" className="btn btn-primary w-full justify-center">{t("signup.button")}</button>
      <p className="text-xs text-muted">{t("signup.why")}</p>
    </form>
  );
}
