import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TN_DIVE } from "@/data/country-tn";

export const metadata: Metadata = pageMeta({ title: TN_DIVE.title, description: TN_DIVE.description, path: "/countries/tn/" });

export default function TunisiaPage() {
  return <CountryDeepDive dive={TN_DIVE} />;
}
