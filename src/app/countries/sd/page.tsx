import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SD_DIVE } from "@/data/country-sd";

export const metadata: Metadata = pageMeta({ title: SD_DIVE.title, description: SD_DIVE.description, path: "/countries/sd/" });

export default function SudanPage() {
  return <CountryDeepDive dive={SD_DIVE} />;
}
