import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MU_DIVE } from "@/data/country-mu";

export const metadata: Metadata = pageMeta({ title: MU_DIVE.title, description: MU_DIVE.description, path: "/countries/mu/" });

export default function MauritiusPage() {
  return <CountryDeepDive dive={MU_DIVE} />;
}
