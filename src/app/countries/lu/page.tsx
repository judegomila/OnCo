import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LU_DIVE } from "@/data/country-lu";

export const metadata: Metadata = pageMeta({ title: LU_DIVE.title, description: LU_DIVE.description, path: "/countries/lu/" });

export default function LuxembourgPage() {
  return <CountryDeepDive dive={LU_DIVE} />;
}
