import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GA_DIVE } from "@/data/country-ga";

export const metadata: Metadata = pageMeta({ title: GA_DIVE.title, description: GA_DIVE.description, path: "/countries/ga/" });

export default function GabonPage() {
  return <CountryDeepDive dive={GA_DIVE} />;
}
