import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GR_DIVE } from "@/data/country-gr";

export const metadata: Metadata = pageMeta({ title: GR_DIVE.title, description: GR_DIVE.description, path: "/countries/gr/" });

export default function GreecePage() {
  return <CountryDeepDive dive={GR_DIVE} />;
}
