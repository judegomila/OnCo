import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CU_DIVE } from "@/data/country-cu";

export const metadata: Metadata = pageMeta({ title: CU_DIVE.title, description: CU_DIVE.description, path: "/countries/cu/" });

export default function CubaPage() {
  return <CountryDeepDive dive={CU_DIVE} />;
}
