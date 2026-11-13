import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LV_DIVE } from "@/data/country-lv";

export const metadata: Metadata = pageMeta({ title: LV_DIVE.title, description: LV_DIVE.description, path: "/countries/lv/" });

export default function LatviaPage() {
  return <CountryDeepDive dive={LV_DIVE} />;
}
