import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GW_DIVE } from "@/data/country-gw";

export const metadata: Metadata = pageMeta({ title: GW_DIVE.title, description: GW_DIVE.description, path: "/countries/gw/" });

export default function GuineaBissauPage() {
  return <CountryDeepDive dive={GW_DIVE} />;
}
