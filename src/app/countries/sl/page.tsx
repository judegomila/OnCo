import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SL_DIVE } from "@/data/country-sl";

export const metadata: Metadata = pageMeta({ title: SL_DIVE.title, description: SL_DIVE.description, path: "/countries/sl/" });

export default function SierraLeonePage() {
  return <CountryDeepDive dive={SL_DIVE} />;
}
