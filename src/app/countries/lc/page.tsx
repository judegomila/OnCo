import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LC_DIVE } from "@/data/country-lc";

export const metadata: Metadata = pageMeta({ title: LC_DIVE.title, description: LC_DIVE.description, path: "/countries/lc/" });

export default function SaintLuciaPage() {
  return <CountryDeepDive dive={LC_DIVE} />;
}
