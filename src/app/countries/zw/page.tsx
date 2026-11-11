import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ZW_DIVE } from "@/data/country-zw";

export const metadata: Metadata = pageMeta({ title: ZW_DIVE.title, description: ZW_DIVE.description, path: "/countries/zw/" });

export default function ZimbabwePage() {
  return <CountryDeepDive dive={ZW_DIVE} />;
}
