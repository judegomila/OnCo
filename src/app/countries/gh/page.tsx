import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GH_DIVE } from "@/data/country-gh";

export const metadata: Metadata = pageMeta({ title: GH_DIVE.title, description: GH_DIVE.description, path: "/countries/gh/" });

export default function GhanaPage() {
  return <CountryDeepDive dive={GH_DIVE} />;
}
