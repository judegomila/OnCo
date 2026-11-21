import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GU_DIVE } from "@/data/country-gu";

export const metadata: Metadata = pageMeta({ title: GU_DIVE.title, description: GU_DIVE.description, path: "/countries/gu/" });

export default function GuamPage() {
  return <CountryDeepDive dive={GU_DIVE} />;
}
