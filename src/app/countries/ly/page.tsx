import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LY_DIVE } from "@/data/country-ly";

export const metadata: Metadata = pageMeta({ title: LY_DIVE.title, description: LY_DIVE.description, path: "/countries/ly/" });

export default function LibyaPage() {
  return <CountryDeepDive dive={LY_DIVE} />;
}
