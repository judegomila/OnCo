import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LK_DIVE } from "@/data/country-lk";

export const metadata: Metadata = pageMeta({ title: LK_DIVE.title, description: LK_DIVE.description, path: "/countries/lk/" });

export default function SriLankaPage() {
  return <CountryDeepDive dive={LK_DIVE} />;
}
