"use client";

import { useEffect, useState } from "react";
import { accountEnabled, loadSession, onAccountChange, type Session } from "@/lib/account";
import { backFromSearch } from "@/lib/after-sign-in";
import { getAccountProfile } from "@/lib/profile";
import { WelcomeStep } from "./WelcomeStep";

/**
 * The body of /welcome/: the welcome step for whoever is signed in. The session and the `back` parameter are read
 * after mount (a session never exists on the server), so the exported HTML is the step without a user, which is
 * also what a signed-out visitor sees: the pills plus a note and the sign-in control. Once a session is known the
 * step is keyed to the user so a stored role preselects its pill and can be changed.
 */
export function WelcomePage() {
  const [state, setState] = useState<{ session: Session | null; back: string } | null>(null);
  useEffect(() => {
    const back = backFromSearch(window.location.search);
    const raf = requestAnimationFrame(() => setState({ session: accountEnabled ? loadSession() : null, back }));
    if (!accountEnabled) return () => cancelAnimationFrame(raf);
    const off = onAccountChange((s) => setState({ session: s, back }));
    return () => { cancelAnimationFrame(raf); off(); };
  }, []);
  const user = state?.session?.user;
  // Client-only branch: the stored role is read directly so the pill is pressed on the first render of the keyed step.
  if (user) return <WelcomeStep key={user.id} userId={user.id} back={state?.back ?? "/"} initialRole={getAccountProfile(user.id).role} />;
  return <WelcomeStep key="anonymous" back={state?.back ?? "/"} />;
}
