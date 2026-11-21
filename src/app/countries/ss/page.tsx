import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SS_DIVE } from "@/data/country-ss";

export const metadata: Metadata = pageMeta({ title: SS_DIVE.title, description: SS_DIVE.description, path: "/countries/ss/" });

export default function SouthSudanPage() {
  return <CountryDeepDive dive={SS_DIVE} />;
}
