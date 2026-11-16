import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SY_DIVE } from "@/data/country-sy";

export const metadata: Metadata = pageMeta({ title: SY_DIVE.title, description: SY_DIVE.description, path: "/countries/sy/" });

export default function SyriaPage() {
  return <CountryDeepDive dive={SY_DIVE} />;
}
