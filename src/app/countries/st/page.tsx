import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ST_DIVE } from "@/data/country-st";

export const metadata: Metadata = pageMeta({ title: ST_DIVE.title, description: ST_DIVE.description, path: "/countries/st/" });

export default function SaoTomePage() {
  return <CountryDeepDive dive={ST_DIVE} />;
}
