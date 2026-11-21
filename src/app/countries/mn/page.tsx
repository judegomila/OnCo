import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MN_DIVE } from "@/data/country-mn";

export const metadata: Metadata = pageMeta({ title: MN_DIVE.title, description: MN_DIVE.description, path: "/countries/mn/" });

export default function MongoliaPage() {
  return <CountryDeepDive dive={MN_DIVE} />;
}
